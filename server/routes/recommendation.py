from flask import Blueprint, request, jsonify
from utils.helper import search_youtube, fetch_google_search

recommendation_bp = Blueprint("recommendation", __name__)

@recommendation_bp.route("/search", methods=["GET"])
def recommend_videos():
    combined_results = []
    queries = [
        "Marathi dialects explained",
        "Goan Marathi dialect",
        "Kolhapuri Marathi dialect",
        "Khandeshi Marathi language",
        "Varhadi Marathi dialect",
        "Marathi to Hindi translation tutorial",
        "Marathi to English translation",
        "Marathi regional language comparison",
        "Learn Marathi for beginners"
    ]

    for query in queries:
        videos = search_youtube(query=query, max_results=1)
        combined_results.extend(videos)

    return jsonify({
        "total": len(combined_results),
        "videos": combined_results
    })

@recommendation_bp.route("/recommend", methods=["GET"])
def recommend_blogs():
    topic = request.args.get("q", "Dialects and translation")
    results = fetch_google_search(topic)

    if results:
        return jsonify({"query": topic, "results": results})
    else:
        return jsonify({"error": "Gemini response error"}), 500
