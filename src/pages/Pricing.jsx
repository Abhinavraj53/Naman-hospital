const plans = [
  {
    name: "OPD Consultation",
    price: "₹300",
    cadence: "per visit",
    description: "General medicine, paediatrics, dermatology, chest disease, orthopaedics, and gynaecology consultations.",
    features: [
      "डॉक्टर परामर्श एवं फॉलो-अप गाइड",
      "ई-प्रिस्क्रिप्शन एवं फाइल रिकॉर्डिंग",
      "लैब/रेडियोलॉजी डिस्काउंट कूपन",
      "प्राथमिक चिकित्सा एवं स्वास्थ्य शिक्षा"
    ]
  },
  {
    name: "Day Care & Minor Procedures",
    badge: "Popular Choice",
    price: "₹2,500",
    cadence: "starting",
    description: "ड्रेसिंग, नेबुलाइजेशन, एंडोस्कोपी, डे-केयर सर्जरी एवं अल्पकालिक ऑब्ज़र्वेशन।",
    features: [
      "डे-केयर बेड एवं मॉनिटरिंग",
      "दवाइयाँ एवं सपोर्टिव केयर",
      "लघु सर्जिकल प्रक्रियाएँ",
      "बीमा एवं टीपीए सहायता"
    ]
  },
  {
    name: "In-Patient & Surgical Packages",
    price: "₹12,000",
    cadence: "starting",
    description: "इलेक्ट्रिव एवं इमरजेंसी सर्जरी, प्रसूति, आर्थोपेडिक एवं क्रिटिकल केयर सुविधा।",
    features: [
      "आईसीयू एवं मॉनिटरिंग",
      "विशेषज्ञ सर्जन एवं एनस्थीसिया टीम",
      "कैशलेस इंश्योरेंस और टीपीए समर्थन",
      "डाइट, फिजियो एवं पोस्ट-डिस्चार्ज फॉलो-अप"
    ]
  }
];

const Pricing = () => (
  <section className="py-5">
    <div className="container">
      <div className="text-center mb-5">
        <span className="badge bg-soft-primary text-primary fw-semibold text-uppercase">
          Packages
        </span>
        <h1 className="display-6 fw-bold mt-3">सुलभ एवं पारदर्शी उपचार योजनाएँ</h1>
        <p className="text-muted lead">
          नामन हॉस्पिटल में हर मरीज की आवश्यकता के अनुसार किफायती पैकेज और कैशलेस बीमा की सुविधा
          उपलब्ध है।
        </p>
      </div>

      <div className="row g-4">
        {plans.map(plan => (
          <div className="col-md-4" key={plan.name}>
            <div className={`card pricing-card h-100 border-0 shadow-lg ${plan.badge ? "plan-featured" : ""}`}>
              <div className="card-body p-4 d-flex flex-column">
                {plan.badge && (
                  <span className="badge bg-primary text-light align-self-start mb-3">
                    {plan.badge}
                  </span>
                )}
                <h3 className="fw-semibold">{plan.name}</h3>
                <div className="display-5 fw-bold text-primary mt-2 mb-1">{plan.price}</div>
                <small className="text-muted mb-3">{plan.cadence}</small>
                <p className="text-muted flex-grow-1">{plan.description}</p>
                <ul className="text-muted d-grid gap-2 mt-3 mb-4">
                  {plan.features.map(feature => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
                <button className={`btn ${plan.badge ? "btn-primary" : "btn-outline-primary"} w-100 mt-auto`}>
                  {plan.name === "Enterprise" ? "Contact sales" : "Start free trial"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm mt-5">
        <div className="card-body p-4 p-lg-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-8">
              <h3 className="fw-semibold mb-3">Looking for a customised medical package?</h3>
              <p className="text-muted mb-0">
                प्रसूति, हड्डी रोग, हृदय रोग या प्लास्टिक सर्जरी के लिए व्यक्तिगत उपचार योजना बनवाने
                हेतु हमारे प्रशासक से संपर्क करें। बीमा कैशलेस एवं ईएमआई विकल्प उपलब्ध हैं।
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <a className="btn btn-outline-primary btn-lg" href="/contact">
                Speak with admissions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Pricing;

