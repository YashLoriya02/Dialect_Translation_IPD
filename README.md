# 🌐 Dialect Translator App

A multilingual dialect translation system focused on Marathi and its regional variants like Goan, Kolhapuri, Varhadi, Khandeshi, and code-mixed styles.  
Built with a React + Vite + TypeScript frontend and a Flask backend using modern NLP and LLM integration (Gemini + Sarvam APIs).

## 📁 Project Structure
Client => React + Vite + TypeScript

Server => Flask backend with AI/NLP logic

## 🚀 Getting Started
### 🖥️ Run the Frontend (Client)
```
cd client
npm install
npm run dev
```
This will start the frontend server at http://localhost:8080

### 🖥️ Run the Backend (Server)
```
cd server
pip install -r requirements.txt
python main.py
```
This will start the Flask API Server at http://localhost:5000/.

### ⚙️ Features
- 🌍 Translate Marathi dialects to English and Hindi (and vice versa)
- 🧠 Detect dialect (Goan, Kolhapuri, Varhadi, Khandeshi, etc.)
- 🔊 Text-to-Speech & Speech-to-Text using Sarvam AI
- 🔎 YouTube & Google blog recommendations related to translation and dialects
- 🪪 JWT-based authentication
- 🧵 Intent-based input suggestion and fallback

