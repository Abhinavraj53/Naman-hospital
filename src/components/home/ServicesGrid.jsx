import SectionTitle from "../shared/SectionTitle";
import {
  FaUserMd,
  FaHeartbeat,
  FaStethoscope,
  FaFemale,
  FaChild,
  FaSyringe,
  FaBone,
  FaAirFreshener
} from "react-icons/fa";

const services = [
  {
    icon: <FaUserMd />,
    title: "मेडिसिन विभाग (Medicine)",
    description: "Acute and chronic illness care with comprehensive diagnostics and follow-up plans."
  },
  {
    icon: <FaHeartbeat />,
    title: "छाती रोग (Chest Disease)",
    description: "Pulmonology experts treating asthma, COPD, TB, and complex respiratory disorders."
  },
  {
    icon: <FaStethoscope />,
    title: "चर्म रोग (Skin Care)",
    description: "Advanced dermatology and cosmetic procedures for all age groups and skin types."
  },
  {
    icon: <FaFemale />,
    title: "प्रसूति एवं स्त्री रोग (Gynaecology)",
    description: "Complete women’s health services from prenatal care to menopause management."
  },
  {
    icon: <FaChild />,
    title: "शिशु रोग (Pediatrics)",
    description: "Compassionate paediatricians caring for newborns, children, and adolescents."
  },
  {
    icon: <FaSyringe />,
    title: "सर्जरी विभाग (General Surgery)",
    description: "Modern OT complex with skilled surgeons for elective and emergency procedures."
  },
  {
    icon: <FaBone />,
    title: "हड्डी रोग (Orthopedics)",
    description: "Bone, joint, and sports injury care with digital X-ray and physiotherapy support."
  },
  {
    icon: <FaAirFreshener />,
    title: "प्लास्टिक सर्जरी (Cosmetic & Reconstructive)",
    description: "Aesthetic and reconstructive surgeries performed by experienced plastic surgeons."
  }
];

const ServicesGrid = () => (
  <section className="ftco-section bg-light" id="services">
    <div className="container">
      <SectionTitle
        eyebrow="Services"
        title="Comprehensive care for patients and providers"
        description="DoctorOnCall bridges patients and doctors with streamlined appointment experiences, digital prescriptions, and real-time tracking."
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
      <div className="text-center mt-4">
        <a href="/services" className="btn btn-mediplus-primary">
          View full service catalogue
        </a>
      </div>
    </div>
  </section>
);

export default ServicesGrid;

