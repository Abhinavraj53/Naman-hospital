import SectionTitle from "../shared/SectionTitle";
import {
  FaUserMd,
  FaHeartbeat,
  FaStethoscope,
  FaFemale,
  FaChild,
  FaSyringe,
  FaBone,
  FaAirFreshener,
  FaEye,
  FaHeadSideVirus,
  FaBrain
} from "react-icons/fa";

const services = [
  {
    icon: <FaUserMd />,
    title: "मेडिसिन विभाग (Medicine)",
    description: "छाती रोग, डायबिटीज, दिल का बीमारी, पेट का बीमारी, जोड़ो का दर्द - व्यापक उपचार और देखभाल।"
  },
  {
    icon: <FaSyringe />,
    title: "सर्जरी विभाग (Surgery)",
    description: "लेज़र से पाइल्स (बवासीर) का ऑपरेशन बिना चीर-फार, लैप्रोस्कोप से अपेंडिक्स/पथरी, लाइपोमा/सिस्ट का ऑपरेशन।"
  },
  {
    icon: <FaFemale />,
    title: "प्रसूति एवं स्त्री रोग (Gynaecology)",
    description: "प्रसव (प्रसूति) और स्त्री रोग संबंधी पूरी देखभाल - गर्भावस्था से मेनोपॉज़ तक।"
  },
  {
    icon: <FaChild />,
    title: "शिशु रोग (Pediatrics)",
    description: "नवजात शिशुओं, बच्चों और किशोरों के लिए विशेषज्ञ बाल रोग चिकित्सा सेवाएं।"
  },
  {
    icon: <FaStethoscope />,
    title: "चर्म रोग विभाग (Dermatology)",
    description: "लेज़र से टैटू हटाना, चेहरा से काला धब्बा हटाना, जन्म के निशान हटाना, फंगल नेल ट्रीटमेंट, होंठ/भौं का कालापन हटाना, चेहरे पर चमक के लिए लेज़र।"
  },
  {
    icon: <FaHeadSideVirus />,
    title: "कान, नाक, गला रोग (ENT)",
    description: "कान, नाक और गले की सभी बीमारियों का विशेषज्ञ उपचार।"
  },
  {
    icon: <FaEye />,
    title: "आँख का बीमारी (Ophthalmology)",
    description: "आंखों की सभी समस्याओं का निदान और उपचार - मोतियाबिंद, रेटिना, ग्लूकोमा आदि।"
  },
  {
    icon: <FaBrain />,
    title: "मनोचिकित्सा विभाग (Psychiatry)",
    description: "मानसिक स्वास्थ्य देखभाल, मनोवैज्ञानिक परामर्श और उपचार सेवाएं।"
  }
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

const ServicesGrid = () => (
  <section className="ftco-section bg-light" id="services">
    <div className="container">
      <SectionTitle
        eyebrow="Services"
        title="Comprehensive care for patients and providers"
        description="Naman Hospital bridges patients and doctors with streamlined appointment experiences, digital prescriptions, and real-time tracking."
      />
      <div className="row g-4 services-grid">
        {services.map(service => (
          <div className="col-md-6 col-lg-3" key={service.title}>
            <div className="card h-100 border-0">
              <div className="card-body text-center p-4 d-flex flex-column gap-3">
                <div className="service-icon d-inline-flex align-items-center justify-content-center">
                  {service.icon}
                </div>
                <h5 className="fw-semibold">{service.title}</h5>
                <p className="text-muted small mb-0">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-5 pt-4 border-top">
        <h4 className="text-center mb-4">कुछ दिनों में ये सुविधा भी उपलब्ध हो जायेगा (Coming Soon)</h4>
        <div className="row g-3 justify-content-center">
          {comingSoonServices.map((service, index) => (
            <div className="col-auto" key={index}>
              <span className="badge bg-light text-dark border px-3 py-2">{service}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <a href="/services" className="btn btn-mediplus-primary">
          View full service catalogue
        </a>
      </div>
    </div>
  </section>
);

export default ServicesGrid;

