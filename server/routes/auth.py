from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from utils.authUtil import generate_token
from pymongo import MongoClient
from dotenv import dotenv_values

config = dotenv_values(".env")
MONGO_URI = config.get("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["dialect_translation"]
users_collection = db["users"]

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not all([name, email, password]):
        return jsonify({"error": "Name, email, and password are required."}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already registered."}), 400

    hashed_password = generate_password_hash(password)
    users_collection.insert_one({"name": name, "email": email, "password": hashed_password})

    return jsonify({"message": "Registration successful."}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"error": "Email and password are required."}), 400

    user = users_collection.find_one({"email": email})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid credentials."}), 401

    token = generate_token({"user_id": str(user["_id"]), "email": user["email"]})
    print(token)
    return jsonify({"token": token, "name": user.get("name"), "email": user.get("email")}), 200
