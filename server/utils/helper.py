import google.generativeai as genai
import json
from dotenv import dotenv_values
from googleapiclient.discovery import build
import requests

config = dotenv_values(".env")
GEMINI_KEY = config.get("GEMINI_API_KEY")
YOUTUBE_KEY = config.get("YOUTUBE_API_KEY")

genai.configure(api_key=GEMINI_KEY)
gmodel = genai.GenerativeModel("gemini-2.0-flash")

# Translation
def generate_translation(user_text, dialect_text, retrieved_examples):
    input_language = detect_language(dialect_text)

    if input_language == "english":
        targets = ["hi-IN", "mr-IN"]
    elif input_language == "hindi":
        targets = ["en-IN", "mr-IN"]
    else:
        targets = ["en-IN", "hi-IN"]

    prompt = f'''
You are a translation assistant. The user sentence is in {input_language}.
Translate the sentence below into:
{", ".join(["English", "Hindi", "Marathi"] if input_language == "other" else [lang.upper() for lang in targets])}.

User input:
{user_text}

Text to translate:
{dialect_text}

Similar examples:
{retrieved_examples}

Respond in JSON like:
{{
  "translated_text_en": "...",
  "translated_text_hi": "...",
  "translated_text_mr": "..."
}}
    '''

    try:
        response = gmodel.generate_content(prompt)
        cleaned_text = response.text.strip().removeprefix("```json").removesuffix("```").strip()
        parsed = json.loads(cleaned_text)
        parsed["input_language"] = input_language
        return parsed
    except Exception:
        translations = {}
        for target in targets:
            res = requests.post(
                "https://api.sarvam.ai/translate",
                headers={
                    "api-subscription-key": "your-sarvam-key",
                    "Content-Type": "application/json"
                },
                json={
                    "input": dialect_text,
                    "source_language_code": "auto",
                    "target_language_code": target
                }
            )
            target_lang = "translated_text_en" if "en" in target else (
                "translated_text_hi" if "hi" in target else "translated_text_mr"
            )
            translations[target_lang] = res.json().get("translated_text", "")

        return translations

def detect_intent(user_text):
    intent_prompt = f'''
You are an intent detection assistant.

Analyze the following user input and classify it into one of the following intent categories:

[
  "greeting", "ask_feeling", "end_convo", "motivate", "ask_location", "offer_help", "check_health", "thank_you",
  "affirmation", "validation", "apology", "joke", "weather", "compliment", "introduction", "curiosity",
  "follow_up", "consoling", "gratitude_accept", "fun_invite"
]

Instructions:
- Choose the **single most appropriate intent** based on tone, emotion, and context.
- Focus on the user's underlying intent even if it's expressed in an informal or code-mixed way (e.g., Marathi-English).

Respond strictly in this JSON format:
{{
  "intent": "<one_of_the_above_labels>"
}}

User input:
{user_text}
'''

    try:
        response = gmodel.generate_content(intent_prompt)
        text = response.text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "").strip()
        if text.startswith("```"):
            text = text.replace("```", "").strip()
        if text.endswith("```"):
            text = text[:-3].strip()

        return json.loads(text).get("intent", "ask_feeling")  # default fallback
    except Exception as e:
        return "ask_feeling"

def detect_dialect(text_to_translate):
    prompt = f'''
You are a dialect detection assistant for Marathi regional variants.

Your task is to identify the dialect used in the sentence below. You must choose from the following dialects:

[
  "Standard Marathi",
  "Goan Marathi",
  "Kolhapuri Marathi",
  "Varhadi Marathi",
  "Khandeshi Marathi",
  "Marathi-English Mix",
  "Hindi-Marathi Mix",
  "Other (Unclear)"
]

Refer to these patterns for help:

- Goan Marathi often uses soft, Konkani-influenced words like "तूं", "किते", "जाल्या"
- Kolhapuri Marathi uses bold rural expressions like "बाप्या", "फडफडत", "चहा घेऊन ये"
- Varhadi Marathi has forms like "केल", "गेल", "झालं", "दमछाक"
- Khandeshi Marathi includes unique rural words like "तै", "न्हाय", "भलताच", "ह्यो"
- Code-mixed Marathi-English may include: “bro”, “full enjoy”, “chill”, etc.

Analyze the following sentence and respond strictly in this JSON format:
{{
  "identified_language": "<chosen dialect from list above>"
}}

Sentence:
{text_to_translate}
'''
    try:
        response = gmodel.generate_content(prompt)
        cleaned = response.text.strip()

        if cleaned.startswith("```json"):
            cleaned = cleaned.replace("```json", "").strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.replace("```", "").strip()
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3].strip()

        return json.loads(cleaned).get("identified_language", "Other (Unclear)")
    except Exception as e:
        return "Other (Unclear)"

def detect_language(text):
    prompt = f"""
    Identify the language of the following sentence:

    Sentence: "{text}"

    Respond with only one word: "english", "hindi", "marathi" or "other"
    """

    try:
        response = gmodel.generate_content(prompt)
        answer = response.text.strip().lower()
        if "english" in answer:
            return "english"
        elif "hindi" in answer:
            return "hindi"
        else:
            return "other"
    except:
        return "other"

# Recommendation
def search_youtube(query, max_results=5):
    youtube = build("youtube", "v3", developerKey=YOUTUBE_KEY)
    request = youtube.search().list(
        q=query,
        part="snippet",
        type="video",
        maxResults=max_results,
        safeSearch="moderate"
    )
    response = request.execute()

    video_details = [
        {
            "title": item["snippet"]["title"],
            "creator": item["snippet"]["channelTitle"],
            "link": f"https://www.youtube.com/watch?v={item['id']['videoId']}"
        }
        for item in response.get("items", [])
    ]
    return video_details

def fetch_google_search(topic):
    prompt = f'''
You are a linguistic assistant helping users explore dialects and translation.

Suggest 6 to 8 useful blog articles, academic papers, websites, or resources that explain or analyze:
- Marathi dialects (like Goan, Kolhapuri, Varhadi, Khandeshi)
- Marathi to Hindi or English translation challenges or techniques

Respond in valid JSON format as a list:
[
  {{
    "title": "<title of the blog/resource>",
    "description": "<short description>",
    "link": "<reliable external link>"
  }},
  ...
]
Only include educational or informative content (not entertainment).
Topic to search for: {topic}
'''

    try:
        response = gmodel.generate_content(prompt)
        content = response.text.strip()
        if content.startswith("```json"):
            content = content.split("```json")[-1].strip("`").strip()
        results = json.loads(content)
        return results
    except:
        return {"error" : "Some error in Gemini API"}
