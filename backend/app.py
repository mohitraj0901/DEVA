from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# ✅ 1. Dataset path (dynamic - production safe)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, 'dataset', 'deoghar_dataset_bilingual.json')

# ✅ 2. Dataset ek baar load karo (fast)
try:
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print("✅ Dataset loaded successfully")
except Exception as e:
    print(f"❌ Error loading dataset: {e}")
    data = {}

@app.route('/api/chat', methods=['POST'])
def chat():
    user_msg = request.json.get('message', '').lower()

    # ✅ 3. Keywords extract karo
    query_words = set([w for w in user_msg.replace('?', '').split() if len(w) > 3])

    best_match_answer = ""
    max_matches = 0

    # ✅ 4. Dataset search
    for category_name, category_data in data.items():
        if category_name == 'metadata':
            continue

        qa_list = []

        # Case 1: structured q_and_a
        if 'q_and_a' in category_data:
            qa_list.extend(category_data['q_and_a'].get('en', []))
            qa_list.extend(category_data['q_and_a'].get('hi', []))

        # Case 2: direct en/hi list
        elif 'en' in category_data and isinstance(category_data['en'], list):
            if len(category_data['en']) > 0 and 'question' in category_data['en'][0]:
                qa_list.extend(category_data.get('en', []))
                qa_list.extend(category_data.get('hi', []))

        # Matching logic
        for qa in qa_list:
            q_text = qa.get('question', '').lower()

            match_count = sum(1 for word in query_words if word in q_text)

            if match_count > max_matches:
                max_matches = match_count
                best_match_answer = qa.get('answer')

    # ✅ 5. Response
    if best_match_answer and max_matches > 0:
        return jsonify({"reply": best_match_answer})
    else:
        return jsonify({
            "reply": "Pranam! 🙏 Please ask something specifically about Deoghar temples, travel, or food. I am still learning!"
        })


# ✅ 6. Health check route (important for deployment)
@app.route('/')
def home():
    return "Backend is running 🚀"


if __name__ == '__main__':
    app.run(port=5000, debug=True)