const serviceCategories = [
  {
    title: "मेडिसिन विभाग (Medicine)",
    description:
      "डॉ. एन.के. सुमन की निगरानी में मधुमेह, उच्च रक्तचाप, थायरॉइड, संक्रमण और क्रॉनिक बीमारियों का व्यापक इलाज।",
    bullets: [
      "डायग्नोस्टिक लैब एवं डिजिटल एक्स-रे",
      "डे-केयर ऑब्ज़र्वेशन एवं फॉलो-अप काउंसलिंग",
      "डायबिटिक एवं कार्डियक क्लिनिक"
    ]
  },
  {
    title: "छाती रोग (Chest Disease Centre)",
    description:
      "पल्मोनोलॉजिस्ट द्वारा अस्थमा, सीओपीडी, टीबी एवं अन्य श्वसन रोगों के लिए विशेष क्लिनिक।",
    bullets: [
      "स्पाइरोमेट्री एवं नेबुलाइजेशन",
      "इंटेंसिव केयर यूनिट के साथ वेंटिलेटर सपोर्ट",
      "टीबी एवं फेफड़ों के संक्रमण का लंबे समय तक प्रबंधन"
    ]
  },
  {
    title: "प्रसूति एवं स्त्री रोग (Gynaecology & Obstetrics)",
    description:
      "मैटरनिटी विंग, आधुनिक लेबर रूम एवं ऑपरेशन थिएटर के साथ सम्पूर्ण महिला स्वास्थ्य सेवाएँ।",
    bullets: [
      "प्रेग्नेंसी एन्टीनेटल एवं पोस्टनेटल केयर",
      "हाई-रिस्क प्रेग्नेंसी मैनेजमेंट",
      "महिला कैंसर स्क्रीनिंग एवं बाँझपन उपचार"
    ]
  },
  {
    title: "शिशु रोग (Pediatrics & Neonatology)",
    description:
      "नवजात एवं बच्चों की देखभाल के लिए एनआईसीयू, टीकाकरण क्लिनिक और विकासात्मक निगरानी।",
    bullets: [
      "नवजात आईसीयू एवं फ़ोटोथैरेपी",
      "टीकाकरण एवं पोषण काउंसलिंग",
      "शिशु एवं किशोर परामर्श"
    ]
  },
  {
    title: "हड्डी रोग (Orthopedics & Trauma)",
    description:
      "हड्डी और जोड़ों के रोग, स्पोर्ट्स इंजरी तथा ट्रॉमा केस के लिए विशेषज्ञ सर्जन और फिजियोथेरेपी।",
    bullets: [
      "मॉड्यूलर ऑपरेशन थिएटर एवं सी-आर्म",
      "फ्रैक्चर मैनेजमेंट एवं जॉइंट रिप्लेसमेंट",
      "इन-हाउस फिजियोथेरेपी यूनिट"
    ]
  },
  {
    title: "सर्जरी विभाग (General & Laparoscopic Surgery)",
    description:
      "कुशल सर्जन, अत्याधुनिक उपकरणों के साथ सुरक्षित सर्जरी—एपेंडिक्स से लेकर गॉल ब्लैडर तक।",
    bullets: [
      "लेप्रोस्कोपिक, गाइनिक एवं जीआई सर्जरी",
      "डे-केयर सर्जरी एवं पोस्ट-ऑप केयर",
      "24×7 सर्जिकल इमरजेंसी टीम"
    ]
  },
  {
    title: "चर्म एवं प्लास्टिक सर्जरी",
    description:
      "त्वचा रोग, कॉस्मेटिक प्रक्रियाएँ और री-कन्स्ट्रक्टिव सर्जरी के लिए समर्पित विशेषज्ञ टीम।",
    bullets: [
      "लेज़र एवं कॉस्मेटिक उपचार",
      "पोस्ट-बर्न व घाव की पुनर्निर्माण सर्जरी",
      "एलर्जी एवं बाल झड़ने का इलाज"
    ]
  },
  {
    title: "डायग्नोस्टिक्स एवं सपोर्ट सेवाएँ",
    description:
      "इन-हाउस लैब, फार्मेसी, रेडियोलॉजी और 24×7 एम्बुलेंस सेवाओं के साथ पूर्ण चिकित्सा सहायता।",
    bullets: [
      "सीटी, एक्स-रे, अल्ट्रासाउंड",
      "कार्डियक मॉनिटरिंग एवं ईसीजी",
      "कैशलेस इंश्योरेंस सहायता"
    ]
  }
];

const integrationStack = [
  "24×7 फार्मेसी एवं इन-हाउस लैब",
  "डिजिटल एक्स-रे, अल्ट्रासाउंड, ईसीजी",
  "कार्डियक मॉनिटरिंग एवं क्रिटिकल केयर",
  "फिजियोथेरेपी एवं पुनर्वास केंद्र",
  "कैशलेस इंश्योरेंस सहायता डेस्क",
  "एम्बुलेंस और ट्रॉमा रिस्पॉन्स यूनिट"
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
          नामन हॉस्पिटल में अनुभवी डॉक्टरों और आधुनिक तकनीक के साथ मेडिसिन, सर्जरी, स्त्री एवं शिशु
          रोग, हड्डी रोग और प्लास्टिक सर्जरी की सेवाएँ उपलब्ध हैं।
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
    </div>
  </section>
);

export default Services;

