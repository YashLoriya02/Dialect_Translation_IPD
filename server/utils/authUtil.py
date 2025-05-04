import jwt
from datetime import datetime, timedelta
from dotenv import dotenv_values

config = dotenv_values(".env")
JWT_SECRET = config.get("JWT_SECRET")

def generate_token(payload):
    expiry = datetime.utcnow() + timedelta(days=30)
    payload.update({"exp": expiry})
    token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
    return token
