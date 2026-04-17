# DEVA 🛕

**Deoghar Exploration & Virtual Assistant**

DEVA is a bilingual (Hindi & English) virtual travel guide designed to assist pilgrims and tourists visiting the holy city of Deoghar, Jharkhand. It provides verified and structured information about temples, rituals, food, and logistics in a fast and user-friendly way.

---

## ✨ Key Features

* **🧠 Intelligent Assistant:**
  Smart keyword-based retrieval engine for instant and relevant answers.

* **🌐 Bilingual Support:**
  Seamless switching between Hindi and English for better accessibility.

* **💬 Floating UI Design:**
  Modern chatbot-style interface with smooth user experience.

* **⚡ Fast Response (Zero Latency):**
  Uses local JSON dataset → no external API delays.

* **📍 Comprehensive Guide:**
  Covers:

  * Temples 🛕
  * Food (Famous Peda 🍬)
  * Transport 🚗
  * Emergency Contacts ☎️

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Python (Flask)
* **Database:** Custom Structured JSON Dataset
* **Logic:** Keyword-based Intent Matching Algorithm

---

## 🚀 Getting Started

### 1️⃣ Backend Setup

```bash
cd backend
python app.py
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```
DEVA/
│
├── backend/            # Flask server + dataset
│   ├── dataset/
│   └── app.py
│
├── frontend/           # React frontend
│   ├── src/
│   └── public/
│
└── README.md
```

---

## 🤝 Credits

* **Data Collection & Curation:** Ayansh Singh
* **Development & Implementation:** Mohit Raj

---

## 📚 Inspiration

This project is inspired by the **VATIKA: Varanasi Tourism Question Answering System (FIRE 2025)**, which focuses on building domain-specific multilingual QA systems for tourism.

DEVA adapts a similar approach for Deoghar by using a structured dataset and efficient retrieval-based techniques to provide accurate and fast responses.

---

## 🙏 Acknowledgement

This project is dedicated to helping devotees and travelers explore the holy city of Deoghar with ease and clarity.

**ॐ जय बाबा बैद्यनाथ 🙏**
