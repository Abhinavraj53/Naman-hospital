const serviceCategories = [
  {
    title: "मेडिसिन विभाग (Medicine)",
    description:
      "छाती रोग, डायबिटीज, दिल का बीमारी, पेट का बीमारी, जोड़ो का दर्द - व्यापक निदान और उपचार सेवाएं।",
    bullets: [
      "छाती रोग (Chest Disease) - अस्थमा, COPD, TB का विशेषज्ञ उपचार",
      "डायबिटीज (Diabetes) - रक्त शर्करा प्रबंधन और जटिलताओं का उपचार",
      "दिल का बीमारी (Heart Disease) - कार्डियक देखभाल और निगरानी",
      "पेट का बीमारी (Gastroenterology) - पाचन तंत्र की समस्याएं",
      "जोड़ो का दर्द (Joint Pain) - संधिशोथ और जोड़ों की बीमारियां"
    ]
  },
  {
    title: "सर्जरी विभाग (Surgery)",
    description:
      "आधुनिक तकनीकों के साथ सुरक्षित सर्जरी - लेज़र और लैप्रोस्कोपिक प्रक्रियाएं।",
    bullets: [
      "लेज़र से पाइल्स (बवासीर) का ऑपरेशन - बिना चीर-फार, तुरंत छुट्टी",
      "लैप्रोस्कोप से अपेंडिक्स, पथरी का ऑपरेशन - 2 दिन में छुट्टी",
      "लाइपोमा, सिस्ट का ऑपरेशन - बिना स्टिच का, तुरंत छुट्टी",
      "आधुनिक OT कॉम्प्लेक्स और कुशल सर्जन"
    ]
  },
  {
    title: "प्रसूति एवं स्त्री रोग (Gynaecology & Obstetrics)",
    description:
      "प्रसव (प्रसूति) और स्त्री रोग संबंधी पूरी देखभाल - गर्भावस्था से मेनोपॉज़ तक।",
    bullets: [
      "प्रेग्नेंसी एन्टीनेटल एवं पोस्टनेटल केयर",
      "हाई-रिस्क प्रेग्नेंसी मैनेजमेंट",
      "महिला कैंसर स्क्रीनिंग एवं बाँझपन उपचार",
      "आधुनिक लेबर रूम और ऑपरेशन थिएटर"
    ]
  },
  {
    title: "शिशु रोग (Pediatrics)",
    description:
      "नवजात शिशुओं, बच्चों और किशोरों के लिए विशेषज्ञ बाल रोग चिकित्सा सेवाएं।",
    bullets: [
      "नवजात आईसीयू एवं फ़ोटोथैरेपी",
      "टीकाकरण एवं पोषण काउंसलिंग",
      "शिशु एवं किशोर परामर्श",
      "बच्चों की सभी बीमारियों का उपचार"
    ]
  },
  {
    title: "चर्म रोग विभाग (Dermatology) - लेज़र ट्रीटमेंट",
    description:
      "लेज़र तकनीक से त्वचा संबंधी सभी समस्याओं का उपचार और कॉस्मेटिक प्रक्रियाएं।",
    bullets: [
      "अलग-अलग रंग के टैटू हटाना",
      "चेहरा से काला धब्बा हटाना",
      "जन्म के निशान को हटाना",
      "फंगल नेल ट्रीटमेंट",
      "होंठ और भौं का कालापन हटाना",
      "चेहरे पे चमक के लिये पूरा चेहरा का लेज़र"
    ]
  },
  {
    title: "कान, नाक, गला रोग (ENT)",
    description:
      "कान, नाक और गले की सभी बीमारियों का विशेषज्ञ निदान और उपचार।",
    bullets: [
      "कान की बीमारियां - संक्रमण, बहरापन, कान का दर्द",
      "नाक की समस्याएं - साइनस, एलर्जी, नाक का बंद होना",
      "गले की बीमारियां - टॉन्सिल, स्वर भंग, स्वर रज्जु समस्याएं"
    ]
  },
  {
    title: "आँख का बीमारी (Ophthalmology)",
    description:
      "आंखों की सभी समस्याओं का निदान और उपचार - मोतियाबिंद से रेटिना तक।",
    bullets: [
      "मोतियाबिंद (Cataract) सर्जरी",
      "रेटिना रोग (Retina) उपचार",
      "ग्लूकोमा (Glaucoma) प्रबंधन",
      "आंखों के संक्रमण और एलर्जी का उपचार"
    ]
  },
  {
    title: "मनोचिकित्सा विभाग (Psychiatry)",
    description:
      "मानसिक स्वास्थ्य देखभाल, मनोवैज्ञानिक परामर्श और उपचार सेवाएं।",
    bullets: [
      "मानसिक रोगों का निदान और उपचार",
      "मनोवैज्ञानिक परामर्श",
      "तनाव और चिंता प्रबंधन",
      "डिप्रेशन और मूड डिसऑर्डर उपचार"
    ]
  }
];

const integrationStack = [
  "24×7 फार्मेसी एवं इन-हाउस लैब",
  "कार्डियक मॉनिटरिंग एवं क्रिटिकल केयर",
  "फिजियोथेरेपी एवं पुनर्वास केंद्र",
  "कैशलेस इंश्योरेंस सहायता डेस्क",
  "एम्बुलेंस और ट्रॉमा रिस्पॉन्स यूनिट",
  "पूछताछ: +91 9234277007"
];

const comingSoonServices = [
  "Ultrasounds",
  "Colonoscopy",
  "Endoscopy",
  "Sigmoidoscopy",
  "ECG",
  "X-Ray",
  "ERCP/MRCP",
  "Bronchoscopy"
];

const Services = () => (
  <section className="py-5">
    <div className="container">
      <div className="text-center mb-5">
        <span className="badge bg-soft-primary text-primary fw-semibold text-uppercase">
          Departments
        </span>
        <h1 className="display-6 fw-bold mt-3">एक ही छत के नीचे सम्पूर्ण चिकित्सा सुविधाएँ</h1>
        <p className="text-muted lead">
          नमन हॉस्पिटल दरभंगा में अनुभवी डॉक्टरों और आधुनिक तकनीक के साथ मेडिसिन, सर्जरी, स्त्री एवं शिशु
          रोग, चर्म रोग, ENT, आँख रोग और मनोचिकित्सा की सेवाएँ उपलब्ध हैं। पता: अल्लपट्टी गुमती, दरभंगा | पूछताछ: 📲 +91 9234277007
        </p>
      </div>

      <div className="row g-4 mb-5">
        {serviceCategories.map(category => (
          <div className="col-lg-6" key={category.title}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="fw-semibold mb-3">{category.title}</h3>
                <p className="text-muted">{category.description}</p>
                <ul className="text-muted small d-grid gap-2 mt-3">
                  {category.bullets.map(bullet => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 align-items-center">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4 p-lg-5">
              <h3 className="fw-semibold mb-3">Supporting services</h3>
              <p className="text-muted">
                विश्वसनीय निदान और सहायक सेवाएँ आपके उपचार को तेज़ और बेहतर बनाती हैं। हमारी
                इन-हाउस सुविधाएँ मरीजों को बार-बार बाहर जाने की ज़रूरत कम करती हैं।
              </p>
              <ul className="text-muted d-grid gap-2 mt-3">
                {integrationStack.map(integration => (
                  <li key={integration}>• {integration}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4 p-lg-5">
              <h3 className="fw-semibold mb-3">Safety & quality assurance</h3>
              <p className="text-muted">
                संक्रमण नियंत्रण, नियमित ऑडिट और प्रशिक्षित स्टाफ हमारी प्राथमिकता है। मरीजों को
                सुरक्षित, स्वच्छ और सम्मानजनक वातावरण उपलब्ध कराया जाता है।
              </p>
              <ul className="text-muted d-grid gap-2 mt-3">
                <li>• नियमित सैनेटाइजेशन एवं संक्रमण नियंत्रण प्रोटोकॉल</li>
                <li>• प्रशिक्षित नर्सिंग एवं पैरामेडिकल स्टाफ</li>
                <li>• 24×7 सुरक्षा एवं सीसीटीवी निगरानी</li>
                <li>• रोगी फीडबैक एवं गुणवत्ता समीक्षा प्रणाली</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-top">
        <h3 className="text-center mb-4">कुछ दिनों में ये सुविधा भी उपलब्ध हो जायेगा (Coming Soon)</h3>
        <div className="row g-3 justify-content-center">
          {comingSoonServices.map((service, index) => (
            <div className="col-auto" key={index}>
              <span className="badge bg-secondary px-3 py-2">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Services;

