VATIKA: Varanasi Tourism QA System (Inspiration)

📌 Overview

VATIKA is a shared task introduced at FIRE 2025 (Forum for Information Retrieval Evaluation).
It focuses on building Question Answering (QA) systems for tourism in Varanasi (Kashi), India.

The goal is to create intelligent systems that can answer real-world tourist queries in natural language, especially in Hindi.

---

🎯 Objective

- Provide accurate answers to tourist queries
- Cover multiple tourism-related domains
- Support multilingual (primarily Hindi) interaction
- Improve travel experience using AI-based systems

---

🧠 Key Features of VATIKA

- Domain-specific QA system (Tourism)
- Covers 10 domains:
  - Temple
  - Ganga Aarti
  - Food
  - Travel
  - Museum
  - Ashram
  - Public facilities
  - and more
- Based on structured JSON dataset
- Focus on Machine Reading Comprehension (MRC)

---

📊 Dataset Structure

VATIKA dataset is organized as:

- Domain → Context → Question-Answer pairs

Example format:

{
  "domain": "kund",
  "contexts": [
    {
      "context": "...",
      "qas": [
        {
          "question": "...",
          "answer": "..."
        }
      ]
    }
  ]
}

---

🧪 Evaluation Metrics

Models are evaluated using:

- F1 Score
- BLEU Score
- ROUGE-L Score

---

🚫 Constraints

- Only open-source models allowed
- No usage of paid APIs like GPT-4, Gemini, etc.

---

🔗 Relevance to DEVA

DEVA follows a similar approach:

- Domain-specific tourism QA
- Structured dataset
- Fast retrieval-based answering
- Focus on real-world usability

While VATIKA focuses on Varanasi, DEVA adapts the concept for Deoghar tourism.

---

🙏 Acknowledgement

Inspired by the research work and shared task:

VATIKA - FIRE 2025