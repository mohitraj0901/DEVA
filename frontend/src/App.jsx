import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [chatInput, setChatInput] = useState('');
  const [isHindi, setIsHindi] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Pranam! 🙏 I am DEVA, your spiritual guide to Deoghar. How can I assist your journey today?", isBot: true },
    { text: "What is the best time to visit Baba Baidyanath Temple?", isBot: false },
    { text: "The best time for Darshan is early morning between 4:00 AM to 5:30 AM (Sarkari Puja) or during the evening Shringar Puja. For a peaceful visit, avoid the peak month of Shravan unless you are coming specifically for the Shravani Mela.", isBot: true }
  ]);

  // Auto-Scroll Reference
  const messagesEndRef = useRef(null);

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Expanded Pool of Suggested Questions
  const suggestionPairs = [
    { en: "Best time to visit?", hi: "घूमने का सबसे अच्छा समय?" },
    { en: "What is Deoghar Peda?", hi: "देवघर का पेड़ा क्या है?" },
    { en: "How to reach Deoghar by train?", hi: "ट्रेन से देवघर कैसे पहुंचे?" },
    { en: "Can pilgrims perform rituals?", hi: "क्या तीर्थयात्री अनुष्ठान कर सकते हैं?" },
    { en: "Significance of Baba Baidyanath?", hi: "बाबा बैद्यनाथ का क्या महत्व है?" },
    { en: "Distance from railway station?", hi: "रेलवे स्टेशन से दूरी कितनी है?" },
    { en: "Are phones allowed inside?", hi: "क्या अंदर फोन की अनुमति है?" },
    { en: "What is Shivganga Kund?", hi: "शिवगंगा कुंड क्या है?" },
    { en: "Who established the temple?", hi: "मंदिर की स्थापना किसने की?" }
  ];

  const [suggestionIndices, setSuggestionIndices] = useState([0, 1, 2]);

  const shuffleSuggestions = () => {
    let newIndices = [];
    while(newIndices.length < 3) {
      let r = Math.floor(Math.random() * suggestionPairs.length);
      if(newIndices.indexOf(r) === -1) newIndices.push(r);
    }
    setSuggestionIndices(newIndices);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { text: text, isBot: false }]);
    shuffleSuggestions(); 
    
    setMessages(prev => [...prev, { text: isHindi ? "DEVA विवरण खोज रहा है... 🕉️" : "DEVA is fetching details... 🕉️", isBot: true }]);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { text: data.reply, isBot: true };
        return newMsgs;
      });
      
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { text: isHindi ? "⚠️ कनेक्शन त्रुटि: कृपया सुनिश्चित करें कि आपका सर्वर चल रहा है!" : "⚠️ Connection Error: Please make sure your Python backend is running!", isBot: true };
        return newMsgs;
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(chatInput);
    setChatInput('');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FFFDF8] text-gray-800 font-sans selection:bg-[#FF7A00] selection:text-white">
      
      {/* ========================================= */}
      {/* LEFT SIDE - WEBSITE CONTENT (EXACTLY 70%) */}
      {/* ========================================= */}
      <div className="w-full lg:w-[70%] lg:h-screen lg:overflow-y-auto scroll-smooth pb-[60vh] lg:pb-0 relative custom-scrollbar">
        
        {/* Temple Background Image - Light Theme */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/3/36/Baidyanath_Jyotirlinga_Temple.jpg')] bg-cover bg-fixed bg-center z-0"></div>

        {/* Sticky Navbar */}
        <nav className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/90 border-b border-[#FF7A00]/20 px-6 py-3 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-3xl drop-shadow-sm">🛕</span>
            <div className="flex flex-col">
              <h1 className="text-2xl font-extrabold text-[#FF7A00] tracking-wide drop-shadow-sm leading-none">DEVA</h1>
              <span className="text-[9px] text-gray-500 font-bold tracking-tighter uppercase mt-0.5">Deoghar Exploration & Virtual Assistant</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-bold tracking-wider text-gray-600">
              <a href="#temples" className="hover:text-[#FF7A00] transition-colors">{isHindi ? 'मंदिर' : 'TEMPLES'}</a>
              <a href="#food" className="hover:text-[#FF7A00] transition-colors">{isHindi ? 'प्रसाद' : 'PRASAD'}</a>
              <a href="#travel" className="hover:text-[#FF7A00] transition-colors">{isHindi ? 'यात्रा' : 'TRAVEL'}</a>
              <a href="#features" className="hover:text-[#FF7A00] transition-colors">{isHindi ? 'सुविधाएँ' : 'FEATURES'}</a>
            </div>
            
            <button 
              onClick={() => setIsHindi(!isHindi)}
              className="px-4 py-1.5 text-xs font-bold border-2 border-[#FF7A00] text-[#FF7A00] rounded-full hover:bg-[#FF7A00] hover:text-white transition-all shadow-sm"
            >
              {isHindi ? 'English' : 'हिंदी'}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="relative z-10 text-center px-6 max-w-3xl">
            {isHindi ? (
              <>
                <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-4">
                  DEVA में स्वागत है
                </h2>
                <p className="text-xl md:text-2xl text-[#FF7A00] mb-3 font-bold">
                  देवघर के लिए आपका आध्यात्मिक गाइड
                </p>
                <p className="text-sm md:text-base text-gray-600 mb-8 font-medium">
                  पवित्र मंदिरों की खोज करें, दिव्य व्यंजन का स्वाद लें, और अपने मार्गदर्शक के साथ अपना पथ खोजें
                </p>
              </>
            ) : (
              <>
                <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-4">
                  Explore Deoghar with <span className="text-[#FF7A00] drop-shadow-sm">DEVA</span>
                </h2>
                <p className="text-lg md:text-2xl text-gray-600 mb-8 font-medium italic">
                  Your spiritual travel companion
                </p>
              </>
            )}
            <button className="px-8 py-3 bg-gradient-to-r from-[#FF7A00] to-[#e65c00] text-white font-bold rounded-full shadow-[0_4px_15px_rgba(255,122,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,122,0,0.4)] transform hover:-translate-y-1 transition-all duration-300">
              {isHindi ? 'अभी पूछें' : 'Ask DEVA Now'}
            </button>
          </div>
        </header>

        {/* Main Content Sections */}
        <main className="relative z-10 px-6 py-12 max-w-5xl mx-auto space-y-24">
          
          <section id="temples">
            <SectionHeading title={isHindi ? "पवित्र मंदिर" : "Sacred Temples"} subtitle={isHindi ? "ईश्वर के आशीर्वाद के स्थान" : "The abodes of the divine"} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title={isHindi ? "बाबा बैद्यनाथ ज्योतिर्लिंग" : "Baba Baidyanath Jyotirlinga"} desc={isHindi ? "12 ज्योतिर्लिंगों में से एक, यह प्राचीन मंदिर देवघर का आध्यात्मिक हृदय है।" : "One of the 12 Jyotirlingas, this ancient temple is the spiritual heart of Deoghar."} image="/Baba_Baidyanath_jyotirlinga.png" />
              <Card title={isHindi ? "नौलखा मंदिर" : "Naulakha Temple"} desc={isHindi ? "रानी चारुशीला द्वारा 9 लाख की लागत से निर्मित, यह खूबसूरत मंदिर बेलूर मठ से प्रेरित है।" : "Built by Rani Charushila at a cost of 9 lakhs, this beautiful temple features architecture inspired by the Ramakrishna Math."} image="/Naulakha_Temple.png" />
            </div>
          </section>

          <section id="food">
            <SectionHeading title={isHindi ? "पवित्र प्रसाद और व्यंजन" : "Holy Prasad & Cuisine"} subtitle={isHindi ? "देवघर के आशीर्वाद का स्वाद लें" : "Taste the blessings of Deoghar"} />
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-md hover:border-[#FF7A00]/30 transition-colors duration-500">
              <h3 className="text-2xl font-bold text-[#FF7A00] mb-3">{isHindi ? "देवघर का पेड़ा" : "Deoghar Peda"}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{isHindi ? "बाबा बैद्यनाथ को चढ़ाया जाने वाला सबसे प्रसिद्ध प्रसाद पेड़ा है। शुद्ध खोया और इलायची से तैयार, यह हर तीर्थयात्री के लिए जरूरी है।" : "The most famous offering to Baba Baidyanath is the rich, caramelized milk sweet known as Peda. Prepared with pure khoya and cardamom, it is a must-have."}</p>
              <div className="flex gap-4">
                <span className="px-4 py-1 rounded-full text-xs font-semibold bg-[#FF7A00]/10 text-[#FF7A00] border border-[#FF7A00]/20">{isHindi ? 'ज़रूर चखें' : 'Must Try'}</span>
                <span className="px-4 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">GI Tag Applied</span>
              </div>
            </div>
          </section>

          <section id="travel">
            <SectionHeading title={isHindi ? "यात्रा गाइड" : "Travel Guide"} subtitle={isHindi ? "अपनी आध्यात्मिक यात्रा को नेविगेट करें" : "Navigating your spiritual journey"} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InfoBox icon="✈️" title={isHindi ? "हवाई मार्ग" : "By Air"} desc={isHindi ? "देवघर हवाई अड्डा (DGH) सीधे दिल्ली, पटना और रांची से जुड़ता है।" : "Deoghar Airport (DGH) connects directly to Delhi, Patna, and Ranchi."} />
              <InfoBox icon="🚆" title={isHindi ? "रेल मार्ग" : "By Train"} desc={isHindi ? "जसीडीह जंक्शन (JSME) निकटतम प्रमुख रेलवे स्टेशन है (8 किमी दूर)।" : "Jasidih Junction (JSME) is the nearest major railway station (8 km away)."} />
              <InfoBox icon="🚌" title={isHindi ? "सड़क मार्ग" : "By Road"} desc={isHindi ? "NH-114A के माध्यम से अच्छी तरह जुड़ा हुआ है। कोलकाता और पटना से नियमित बसें।" : "Well-connected via NH-114A. Regular buses from Kolkata and Patna."} />
            </div>
          </section>

          {/* NEW SECTION: MORE FEATURES */}
          <section id="features">
            <SectionHeading title={isHindi ? "अधिक सुविधाएँ" : "More Features"} subtitle={isHindi ? "मंदिर के परे देवघर का अन्वेषण करें" : "Beyond the Temple - Explore Deoghar"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoBox 
                icon="🏨" 
                title={isHindi ? "होटल और धर्मशालाएं" : "Hotels & Dharamshalas"} 
                desc={isHindi ? "सभी बजटों के लिए आवास विकल्पों की क्यूरेटेड सूची - धर्मशालाओं से लेकर होटल तक।" : "Curated list of nearby accommodation options for all budgets - from dharamshalas to hotels."} 
              />
              <InfoBox 
                icon="🍲" 
                title={isHindi ? "स्थानीय भोजन" : "Local Food"} 
                desc={isHindi ? "मंदिर परिसर के पास सबसे अच्छे ढाबे, थाली रेस्तरां और स्ट्रीट फूड।" : "Best dhabas, thali restaurants, and local street food near the temple complex."} 
              />
              <InfoBox 
                icon="📅" 
                title={isHindi ? "त्यौहार और पूजा का समय" : "Festival & Puja Timings"} 
                desc={isHindi ? "श्रावण कार्यक्रम, महाशिवरात्रि और विशेष आरती का समय।" : "Shravan schedule, Mahashivaratri, special aarti timings, and religious dates."} 
              />
              <InfoBox 
                icon="📞" 
                title={isHindi ? "आपातकालीन संपर्क" : "Emergency Contacts"} 
                desc={isHindi ? "देवघर में निकटतम अस्पताल, पुलिस स्टेशन और मेडिकल हेल्पलाइन।" : "Nearest hospitals, police stations, and medical helplines in Deoghar."} 
              />
            </div>
          </section>

          {/* NEW SECTION: FAQ */}
          <section id="faq">
            <SectionHeading title={isHindi ? "सामान्य प्रश्न (FAQ)" : "Frequently Asked Questions"} subtitle={isHindi ? "तीर्थयात्रियों के लिए त्वरित उत्तर" : "Quick answers for pilgrims"} />
            <div className="space-y-4">
              <FaqRow 
                q={isHindi ? "क्या मुख्य मंदिर के अंदर फोन ले जाने की अनुमति है?" : "Are phones allowed inside the main temple?"} 
                a={isHindi ? "नहीं, मुख्य बाबा बैद्यनाथ मंदिर परिसर के अंदर मोबाइल फोन और कैमरे सख्त वर्जित हैं।" : "No, mobile phones and cameras are strictly prohibited inside the main Baba Baidyanath temple complex."} 
              />
              <FaqRow 
                q={isHindi ? "मैं वीआईपी / शीघ्र दर्शन कैसे बुक करूं?" : "How do I book VIP / Shighra Darshan?"} 
                a={isHindi ? "शीघ्र दर्शन पास मंदिर के प्रवेश द्वार के पास श्राइन बोर्ड कार्यालय परिसर से मामूली शुल्क पर प्राप्त किए जा सकते हैं।" : "Shighra Darshan passes can be obtained from the shrine board office complex near the temple entrance for a nominal fee."} 
              />
              <FaqRow 
                q={isHindi ? "जसीडीह और मंदिर के बीच की दूरी कितनी है?" : "What is the distance between Jasidih and the Temple?"} 
                a={isHindi ? "मंदिर जसीडीह रेलवे स्टेशन से लगभग 8 किमी दूर है। ऑटो-रिक्शा और टैक्सी 24/7 आसानी से उपलब्ध हैं।" : "The temple is approximately 8 km from Jasidih Railway station. Auto-rickshaws and taxis are readily available 24/7."} 
              />
            </div>
          </section>

          {/* MOVED SECTION: ABOUT (Now at the end) */}
          <section id="about">
            <SectionHeading title={isHindi ? "DEVA के बारे में" : "About DEVA"} subtitle={isHindi ? "प्रोजेक्ट की जानकारी" : "Project Information & Architecture"} />
            <div className="relative p-8 rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-md group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/5 to-transparent z-0 pointer-events-none"></div>
              <div className="relative z-10 text-gray-600 leading-relaxed space-y-4">
                <p>{isHindi ? "DEVA (देवघर एक्सप्लोरेशन एंड वर्चुअल असिस्टेंट) एक उन्नत पर्यटन प्लेटफॉर्म है। इसे तीर्थयात्रियों और पर्यटकों को देवघर के बारे में सटीक, स्थानीय और सत्यापित जानकारी प्रदान करने के लिए डिज़ाइन किया गया है।" : "DEVA (Deoghar Exploration & Virtual Assistant) is a specialized tourism platform designed to provide pilgrims and tourists with accurate, localized, and verified information about Deoghar."}</p>
                <div className="flex flex-col gap-3 mt-6 border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[#FF7A00] bg-[#FF7A00]/10 p-2 rounded-lg">⚡</span>
                    <span className="text-gray-700 font-medium">{isHindi ? "फास्ट रिट्रीवल आर्किटेक्चर (बगैर देरी के परिणाम)" : "Fast Retrieval Architecture (Zero Latency)"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#FF7A00] bg-[#FF7A00]/10 p-2 rounded-lg">🌐</span>
                    <span className="text-gray-700 font-medium">{isHindi ? "पूर्ण द्विभाषी समर्थन (हिंदी और अंग्रेजी)" : "Full Bilingual Support (Hindi & English Output)"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#FF7A00] bg-[#FF7A00]/10 p-2 rounded-lg">🗄️</span>
                    <span className="text-gray-700 font-medium">{isHindi ? "100% स्थानीय कस्टम JSON डेटासेट पर आधारित" : "Powered by a 100% Local Custom JSON Dataset"}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* JAI BABA BAIDYANATH FOOTER */}
          <div className="text-center pt-8 pb-16">
            <h2 className="text-2xl font-bold text-[#FF7A00] drop-shadow-sm tracking-widest">ॐ जय बाबा बैद्यनाथ ॐ</h2>
          </div>

        </main>
      </div>

      {/* ======================================================= */}
      {/* RIGHT SIDE - FLOATING WIDGET CHATBOT (EXACTLY 30%)      */}
      {/* ======================================================= */}
      <div className="fixed bottom-0 left-0 lg:left-auto lg:right-0 lg:top-0 w-full lg:w-[30%] h-[60vh] lg:h-screen z-50 pointer-events-none lg:py-6 lg:pr-6 lg:pl-2">
        
        {/* ACTUAL CHATBOT CARD */}
        <div className="w-full h-full bg-white flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-200 rounded-t-3xl lg:rounded-3xl overflow-hidden pointer-events-auto relative">
          
          {/* Chatbot Header */}
          <div className="px-6 py-5 border-b border-gray-100 bg-white flex items-center justify-between shadow-sm z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FFB700] flex items-center justify-center text-xl shadow-[0_2px_10px_rgba(255,122,0,0.3)] text-white">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg leading-tight">{isHindi ? 'DEVA सहायक' : 'DEVA Assistant'}</h3>
                <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {isHindi ? 'ऑनलाइन' : 'Online'}
                </span>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-[#faf8f5] custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.isBot 
                    ? 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm' 
                    : 'bg-gradient-to-r from-[#FF7A00] to-[#e65c00] text-white rounded-tr-sm shadow-[0_2px_10px_rgba(255,122,0,0.2)]'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Area */}
          <div className="px-4 py-3 bg-white border-t border-gray-100 shrink-0">
            <p className="text-[11px] text-gray-400 mb-2 font-medium tracking-wide uppercase">
              {isHindi ? 'सुझाव (क्लिक करें):' : 'Suggested:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestionIndices.map((idx) => {
                const question = isHindi ? suggestionPairs[idx].hi : suggestionPairs[idx].en;
                return (
                  <button 
                    key={idx}
                    onClick={() => sendMessage(question)}
                    className="text-[11px] bg-orange-50 text-[#FF7A00] border border-[#FF7A00]/20 px-3 py-1.5 rounded-full hover:bg-[#FF7A00] hover:text-white transition-all shadow-sm"
                  >
                    {question}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.02)] z-10 shrink-0">
            <form onSubmit={handleFormSubmit} className="relative flex items-center">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={isHindi ? "मंदिरों, भोजन, यात्रा के बारे में पूछें..." : "Ask about temples, food, travel..."} 
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 pl-5 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition-all shadow-inner"
              />
              <button 
                type="submit"
                className="absolute right-2 p-2 rounded-full bg-[#FF7A00] hover:bg-[#e65c00] transition-colors text-white shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
};

/* --- UI Sub-Components --- */

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-10">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h2>
    <div className="w-20 h-1 bg-gradient-to-r from-[#FF7A00] to-[#FFB700] rounded-full mb-3"></div>
    <p className="text-gray-500 font-medium">{subtitle}</p>
  </div>
);

const Card = ({ title, desc, image }) => (
  <div className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-[#FF7A00]/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer shadow-md">
    <div className="h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#FF7A00] transition-colors">{title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">{desc}</p>
    </div>
  </div>
);

const InfoBox = ({ icon, title, desc }) => (
  <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-lg hover:border-[#FF7A00]/20 transition-all text-center group flex flex-col items-center justify-center">
    <div className="text-4xl mb-4 group-hover:-translate-y-2 transition-transform">{icon}</div>
    <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#FF7A00] transition-colors">{title}</h4>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

const FaqRow = ({ q, a }) => (
  <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow mb-4">
    <h4 className="text-lg font-bold text-[#FF7A00] mb-2">{q}</h4>
    <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
  </div>
);

export default App;