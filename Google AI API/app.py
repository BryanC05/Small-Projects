
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    payload = {
        "contents": [{"parts": [{"text": user_message}]}]
    }
    headers = {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY
    }
    try:
        response = requests.post(GEMINI_API_URL, headers=headers, json=payload)
        if not response.ok:
            print('Gemini API error:', response.status_code, response.text)
        response.raise_for_status()
        result = response.json()
        ai_reply = result["candidates"][0]["content"]["parts"][0]["text"] if "candidates" in result else "Sorry, no response from Gemini AI."
        return jsonify({"reply": ai_reply})
    except Exception as e:
        import traceback
        print('Exception:', str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
