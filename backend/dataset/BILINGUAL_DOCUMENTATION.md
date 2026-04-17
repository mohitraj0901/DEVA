# Bilingual Deoghar AI Dataset - Documentation
# द्विभाषी देवघर AI डेटासेट - दस्तावेज़ीकरण

## Overview | सारांश

This comprehensive bilingual dataset contains:
- **120+ Q&A pairs per language** (English & Hindi)
- **Full coverage of 6 domains** with 20 questions each
- **Bilingual entity information** with both languages
- Structure optimized for AI training and QA systems

यह व्यापक द्विभाषी डेटासेट में शामिल है:
- **प्रति भाषा 120+ Q&A जोड़े** (अंग्रेजी और हिंदी)
- **6 डोमेन का पूर्ण कवरेज** प्रत्येक के साथ 20 प्रश्न
- **द्विभाषी इकाई जानकारी** दोनों भाषाओं के साथ
- AI प्रशिक्षण और QA सिस्टम के लिए अनुकूलित संरचना

---

## File Structure | फाइल संरचना

```
deoghar_dataset_bilingual.json
├── metadata (Name, Version, Languages, Domains, Purpose)
│
├── temples
│   ├── en (English temple information)
│   ├── hi (Hindi temple information)
│   └── q_and_a
│       ├── en (20 English Q&A pairs)
│       └── hi (20 Hindi Q&A pairs)
│
├── water_bodies
├── nature_and_peaks
├── logistics
├── facilities
├── general_information
│
└── common_questions
    ├── en (7 general English questions)
    └── hi (7 general Hindi questions)
```

---

## Dataset Statistics | डेटासेट सांख्यिकी

| Domain | Entities | Q&A (EN) | Q&A (HI) | Total |
|--------|----------|----------|----------|-------|
| Temples | 3 | 20 | 20 | 40 |
| Water Bodies | 2 | 20 | 20 | 40 |
| Nature & Peaks | 2 | 20 | 20 | 40 |
| Logistics | 3 | 20 | 20 | 40 |
| Facilities | 4 | 20 | 20 | 40 |
| General Info | 3 | 20 | 20 | 40 |
| Common Q's | - | 7 | 7 | 14 |
| **TOTAL** | **17+** | **127** | **127** | **254** |

---

## Key Features | मुख्य विशेषताएं

### 1. Bilingual Support | द्विभाषी समर्थन
- All questions, answers, and information in English & Hindi
- Maintains cultural and linguistic accuracy
- Easy switching between languages

सभी प्रश्न, उत्तर और जानकारी अंग्रेजी और हिंदी में।
सांस्कृतिक और भाषाई सटीकता बनाए रखता है।
भाषाओं के बीच आसान स्विचिंग।

### 2. Comprehensive Q&A Coverage | व्यापक Q&A कवरेज
- 20 questions per domain (per language)
- Covers basic to advanced topics
- Progressive difficulty levels
- Domain-specific terminology

प्रति डोमेन 20 प्रश्न (प्रति भाषा)।
मूलभूत से उन्नत विषयों को कवर करता है।
प्रगतिशील कठिनाई स्तर।
डोमेन-विशिष्ट शब्दावली।

### 3. Optimized for AI Training | AI प्रशिक्षण के लिए अनुकूलित
- Clean, structured Q&A pairs
- Multiple export formats (CSV, JSONL, Fine-tuning)
- Language-specific training sets
- Domain categorization for filtered learning

स्वच्छ, संरचित Q&A जोड़े।
कई निर्यात प्रारूप (CSV, JSONL, Fine-tuning)।
भाषा-विशिष्ट प्रशिक्षण सेट।
फ़िल्टर्ड लर्निंग के लिए डोमेन वर्गीकरण।

---

## Domain Breakdown | डोमेन विभाजन

### 1. Temples (3 entities, 20 EN Q&A, 20 HI Q&A)
- Baba Baidyanath Temple
- Basukinath Temple
- Tapovan Temple

**Topics covered:**
- History and mythology
- Religious significance
- Visiting information
- Architecture
- Festivals
- Deity worship

### 2. Water Bodies (2 entities, 20 EN Q&A, 20 HI Q&A)
- Shivganga Kund
- Mansarovar Kund

**Topics covered:**
- Religious significance
- Rituals and practices
- Location and accessibility
- Mythological connections
- Water quality and safety
- Bathing traditions

### 3. Nature & Peaks (2 entities, 20 EN Q&A, 20 HI Q&A)
- Trikut Pahar
- Nandan Pahar

**Topics covered:**
- Geological information
- Hiking and trekking
- Flora and fauna
- Height and elevation
- Best season to visit
- Adventure activities
- Scenic views

### 4. Logistics (3 entities, 20 EN Q&A, 20 HI Q&A)
- Airport information
- Railway connections
- Travel agencies
- Transportation services

**Topics covered:**
- Flight and train connectivity
- Distance and travel time
- Booking and reservations
- Vehicle rental
- Local transportation
- Travel packages
- Route planning

### 5. Facilities (4 entities, 20 EN Q&A, 20 HI Q&A)
- Dharamshalas
- Hotels
- Food & Prasad shops
- Public facilities

**Topics covered:**
- Accommodation costs
- Room types and amenities
- Food services
- Booking procedures
- Amenities and facilities
- Accessibility
- Cleanliness standards
- Special services

### 6. General Information (3 topics, 20 EN Q&A, 20 HI Q&A)
- History of Jyotirlingas
- Shravani Mela Details
- Deoghar City Information

**Topics covered:**
- Religious history
- Spiritual significance
- Festival celebrations
- Cultural practices
- Local cuisine
- Climate and geography
- Demographics
- Best visiting times

---

## Sample Q&A Structure | नमूना Q&A संरचना

### English Sample
```json
{
  "question": "What is the significance of Baba Baidyanath Temple?",
  "answer": "Baba Baidyanath Temple is one of the 12 sacred Jyotirlingas of Lord Shiva, making it one of the most important pilgrimage sites for Hindus seeking blessings and spiritual guidance."
}
```

### Hindi Sample
```json
{
  "question": "बाबा बैद्यनाथ मंदिर का महत्व क्या है?",
  "answer": "बाबा बैद्यनाथ मंदिर भगवान शिव के 12 पवित्र ज्योतिर्लिंगों में से एक है, जो इसे हिंदुओं के लिए आशीर्वाद और आध्यात्मिक मार्गदर्शन के लिए सबसे महत्वपूर्ण तीर्थ स्थलों में से एक बनाता है।"
}
```

---

## How to Use the Dataset | डेटासेट का उपयोग कैसे करें

### Method 1: Using the Utility Script | उपयोगिता स्क्रिप्ट का उपयोग करना

```bash
python bilingual_dataset_utility.py
```

This will automatically:
- सांख्यिकी दिखाता है
- नमूना Q&A प्रदर्शित करता है
- सभी प्रारूपों में निर्यात करता है
- अनुकूलन की जांच करता है

### Method 2: Manual JSON Processing | मैनुअल JSON प्रोसेसिंग

```python
import json

with open('deoghar_dataset_bilingual.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Get English temple questions
temple_en_qa = data['temples']['q_and_a']['en']

# Get Hindi water body questions
water_hi_qa = data['water_bodies']['q_and_a']['hi']

# Access entity information
temples_english = data['temples']['en']
temples_hindi = data['temples']['hi']
```

### Method 3: For LLM Fine-tuning | LLM Fine-tuning के लिए

```python
# After running the utility script, use:
# qa_pairs_english_finetuning.jsonl
# qa_pairs_hindi_finetuning.jsonl

# Format for each line:
{"messages": [
  {"role": "user", "content": "Question text"},
  {"role": "assistant", "content": "Answer text"}
]}
```

---

## Export Formats | निर्यात प्रारूप

The utility script generates these files:

| File | Format | Use Case |
|------|--------|----------|
| qa_pairs_english.csv | CSV | Spreadsheet analysis |
| qa_pairs_hindi.csv | CSV | Spreadsheet analysis |
| qa_pairs_english.jsonl | JSONL | Database import |
| qa_pairs_hindi.jsonl | JSONL | Database import |
| qa_pairs_english_finetuning.jsonl | JSONL | OpenAI fine-tuning |
| qa_pairs_hindi_finetuning.jsonl | JSONL | OpenAI fine-tuning |

---

## Integration Examples | एकीकरण उदाहरण

### 1. Question-Answering System | प्रश्नोत्तर प्रणाली

```python
from bilingual_dataset_utility import BilingualDeoghirDatasetUtility

utility = BilingualDeoghirDatasetUtility("deoghar_dataset_bilingual.json")

# Get all temple questions in English
temple_qa_en = utility.get_qa_by_domain('Temples', 'en')

# Get all facility questions in Hindi
facility_qa_hi = utility.get_qa_by_domain('Facilities', 'hi')

# Create a simple QA system
for qa in temple_qa_en:
    print(f"Q: {qa['question']}")
    print(f"A: {qa['answer']}\n")
```

### 2. Multi-language Chatbot | बहुभाषी चैटबॉट

```python
class DeoghirChatbot:
    def __init__(self, dataset_path, language='en'):
        self.utility = BilingualDeoghirDatasetUtility(dataset_path)
        self.language = language
        self.qa_knowledge = {}
        self.load_knowledge()
    
    def load_knowledge(self):
        qa_pairs = self.utility.extract_qa_pairs_bilingual()
        self.qa_knowledge = qa_pairs[self.language]
    
    def switch_language(self, language):
        self.language = language
        self.load_knowledge()
    
    def answer_question(self, question):
        # Simple keyword matching
        for qa in self.qa_knowledge:
            if self.similarity_check(question, qa['question']):
                return qa['answer']
        return "I don't have information about that."
```

### 3. Training Data Preparation | प्रशिक्षण डेटा तैयारी

```python
# For training a multilingual model
utility = BilingualDeoghirDatasetUtility("deoghar_dataset_bilingual.json")

# Get statistics
stats = utility.get_statistics()
print(f"English Q&A pairs: {stats['total_qa_pairs_english']}")
print(f"Hindi Q&A pairs: {stats['total_qa_pairs_hindi']}")

# Export for fine-tuning
utility.export_for_lm_finetuning(
    "en_training.jsonl",
    "hi_training.jsonl"
)
```

---

## Language-Wise Q&A Distribution | भाषा-वार Q&A वितरण

### By Language | भाषा के अनुसार
- **English**: 127 Q&A pairs
- **Hindi**: 127 Q&A pairs
- **Total**: 254 Q&A pairs

### By Domain (Each Language) | डोमेन के अनुसार (प्रत्येक भाषा)
- **Temples**: 20 + 20 = 40 pairs
- **Water Bodies**: 20 + 20 = 40 pairs
- **Nature & Peaks**: 20 + 20 = 40 pairs
- **Logistics**: 20 + 20 = 40 pairs
- **Facilities**: 20 + 20 = 40 pairs
- **General Info**: 20 + 20 = 40 pairs
- **Common**: 7 + 7 = 14 pairs
- **TOTAL**: 127 + 127 = 254 pairs

---

## Running the Utility | उपयोगिता चलाना

### Prerequisites | पूर्वापेक्षाएं
```bash
python 3.7+
No external dependencies required (uses standard library)
```

### Execution | निष्पादन
```bash
# From the DEVA directory
python bilingual_dataset_utility.py

# Or with explicit path
python bilingual_dataset_utility.py --dataset deoghar_dataset_bilingual.json
```

### Output | आउटपुट
The script will:
1. Show comprehensive statistics
2. Display sample Q&A pairs
3. Export 6 different file formats
4. Confirm all operations completed

---

## Hindi Question Examples | हिंदी प्रश्न उदाहरण

### Sample Domain: Temples | नमूना डोमेन: मंदिर

1. **बाबा बैद्यनाथ मंदिर का महत्व क्या है?**
   - What is the significance of Baba Baidyanath Temple?

2. **देवघर के मंदिरों में जाने का सबसे अच्छा समय कौन सा है?**
   - When is the best time to visit Deoghar temples?

3. **देवघर के मंदिरों में प्रवेश शुल्क क्या है?**
   - What is the entry fee for temples in Deoghar?

4. **मंदिरों का दौरा करते समय मुझे कौन सी ड्रेस कोड का पालन करना चाहिए?**
   - What dress code should I follow while visiting temples?

...and 16 more questions per domain!

---

## English Question Examples | अंग्रेजी प्रश्न उदाहरण

### Sample Domain: Water Bodies | नमूना डोमेन: जल निकाय

1. **What is the significance of Shivganga Kund?**
   - शिवगंगा कुंड का महत्व क्या है?

2. **Where is Shivganga Kund located?**
   - शिवगंगा कुंड कहाँ स्थित है?

3. **Can I take a bath in Shivganga Kund?**
   - क्या मैं शिवगंगा कुंड में स्नान कर सकता हूँ?

4. **What is the mythology behind Mansarovar Kund?**
   - मानसरोवर कुंड के पीछे की पौराणिक कथा क्या है?

...and 16 more questions per domain!

---

## Quality Assurance | गुणवत्ता आश्वासन

### Checklist | सूची
- ✓ All 127 English Q&A pairs filled
- ✓ All 127 Hindi Q&A pairs filled
- ✓ 20 questions per domain (per language)
- ✓ Bilingual entity information
- ✓ Proper Unicode encoding for Hindi
- ✓ Domain categorization maintained
- ✓ No duplicate questions
- ✓ Cultural and linguistic accuracy

---

## Troubleshooting | समस्या निवारण

### Issue: Hindi text not displaying correctly
**Solution**: Ensure UTF-8 encoding when opening files
```python
with open('file.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
```

### Issue: Script errors
**Solution**: Verify Python 3.7+ is installed
```bash
python --version
```

### Issue: Export files not created
**Solution**: Check file permissions and disk space

---

## Next Steps | अगले कदम

1. **Review the dataset structure**
   डेटासेट संरचना की समीक्षा करें

2. **Run the utility script for validation**
   सत्यापन के लिए उपयोगिता स्क्रिप्ट चलाएं

3. **Choose your export format**
   अपना निर्यात प्रारूप चुनें

4. **Integrate with your AI system**
   अपनी AI प्रणाली के साथ एकीकृत करें

5. **Fine-tune your LLM**
   अपने LLM को सूक्ष्म-ट्यून करें

---

## Support & Updates | समर्थन और अपडेट

For questions or improvements:
1. Check the sample questions in each domain
2. Verify bilingual consistency
3. Test exports with your systems
4. Report any issues with encoding or content

समस्याओं की रिपोर्ट के लिए:
1. प्रत्येक डोमेन में नमूना प्रश्नों की जांच करें
2. द्विभाषी सामंजस्य सत्यापित करें
3. अपने सिस्टम के साथ निर्यात परीक्षण करें
4. एन्कोडिंग या सामग्री से संबंधित समस्याओं की रिपोर्ट करें

---

## Version Information | संस्करण जानकारी

- **Dataset Version**: 2.0 (Bilingual)
- **Created**: April 9, 2026
- **Languages**: English, Hindi
- **Total Q&A Pairs**: 254
- **Domains**: 6
- **Entities**: 17+

---

**Happy Training! शुभकामनाएं!** 🙏
