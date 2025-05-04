# app.py
from flask import Flask
from flask_cors import CORS
from routes.translation import translation_bp
from routes.speech import speech_bp
from routes.recommendation import recommendation_bp
from routes.auth import auth_bp
from utils.embedding import init_embeddings
import logging

app = Flask(__name__)
CORS(app, origins=["*"])

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

df, index, model = init_embeddings()

app.register_blueprint(translation_bp(df, index, model))
app.register_blueprint(speech_bp)
app.register_blueprint(recommendation_bp)
app.register_blueprint(auth_bp)

logger.info("✅ Application started and running on port 5000.")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
