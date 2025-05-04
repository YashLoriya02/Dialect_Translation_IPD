from flask import Blueprint, request, jsonify
from utils.intent import intent_map
from utils.helper import detect_intent, generate_translation, detect_dialect

def translation_bp(df, index, model):
    bp = Blueprint("translation", __name__)

    @bp.route("/translate", methods=["POST"])
    def translate():
        data = request.get_json()
        user_text = data.get("userResponseText")
        text_to_translate = data.get("text_to_translate")

        if not text_to_translate and user_text:
            intent = detect_intent(user_text)
            text_to_translate = intent_map.get(intent, "How are you doing?")
        else:
            intent = "custom"

        detected_dialect = detect_dialect(text_to_translate)

        input_embedding = model.encode([text_to_translate], convert_to_numpy=True)
        _, I = index.search(input_embedding, k=3)
        retrieved = df.iloc[I[0]]
        examples = "\n".join([
            f"{row['query']} => [EN] {row['english']} | [HI] {row['hindi']}" for _, row in retrieved.iterrows()
        ])

        translation = generate_translation(user_text or "", text_to_translate, examples)
        translation["identified_language_dialect"] = detected_dialect

        return jsonify({
            "bot_sentence": text_to_translate,
            "detected_intent": intent,
            "translation": translation
        })

    return bp
