from flask import Blueprint, request, jsonify
import requests
import base64
import io
from dotenv import dotenv_values

config = dotenv_values(".env")
SARVAM_KEY = config.get("SARVAM_API_KEY")

speech_bp = Blueprint("speech", __name__)

@speech_bp.route("/text-to-speech", methods=["POST"])
def text_to_speech():
    data = request.json
    text = data.get("text")
    target_language_code = data.get("target_language_code")

    if not text or not target_language_code:
        return jsonify({"error": "Missing 'text' or 'target_language_code'"}), 400

    try:
        response = requests.post(
            "https://api.sarvam.ai/text-to-speech",
            headers={
                "api-subscription-key": SARVAM_KEY,
                "Content-Type": "application/json",
            },
            json={"target_language_code": target_language_code, "text": text}
        )

        if response.status_code == 200:
            return jsonify({"audios": response.json().get("audios")})
        else:
            return jsonify({"error": "Sarvam API failed", "status": response.status_code, "detail": response.text}), 500

    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


@speech_bp.route("/speech-to-text", methods=["POST"])
def speech_to_text():
    data = request.json
    base64_audio = data.get("audio")

    if not base64_audio:
        return jsonify({"error": "Missing audio"}), 400

    try:
        if "base64," in base64_audio:
            base64_audio = base64_audio.split("base64,")[1]

        audio_bytes = base64.b64decode(base64_audio)
        audio_file = io.BytesIO(audio_bytes)
        audio_file.name = "audio.mp3"

        response = requests.post(
            "https://api.sarvam.ai/speech-to-text",
            headers={"api-subscription-key": SARVAM_KEY},
            files={"file": ("audio.mp3", audio_file, "audio/mpeg")}
        )

        return jsonify(response.json()), response.status_code

    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500
