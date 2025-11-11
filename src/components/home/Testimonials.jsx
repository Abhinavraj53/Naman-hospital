import SectionTitle from "../shared/SectionTitle";

const testimonials = [
  {
    quote:
      "My father’s chest infection was treated with utmost care. The pulmonology team explained every step and kept us informed throughout his stay.",
    name: "Rakesh Jha",
    role: "Family Member • Darbhanga",
    avatar: "/mediplus-images/person_1.jpg"
  },
  {
    quote:
      "From pregnancy check-ups to delivery, the gynaecology unit ensured my wife felt safe and supported. We are grateful to Dr. N.K. Suman and the nursing staff.",
    name: "Shivani & Amit Kumar",
    role: "New Parents • Madhubani",
    avatar: "/mediplus-images/person_2.jpg"
  },
  {
    quote:
      "Affordable packages, clean wards, and friendly staff. The orthopaedic department ensured my fracture healed quickly with proper physiotherapy.",
    name: "Meena Devi",
    role: "Patient • Samastipur",
    avatar: "/mediplus-images/person_3.jpg"
  }
];

const Testimonials = () => (
  <section
    className="ftco-section"
    style={{ backgroundImage: "url(/mediplus-images/bg_1.jpg)", backgroundSize: "cover" }}
  >
    <div className="container">
      <SectionTitle
        eyebrow="Testimonials"
        title="Families of Mithilanchal trust Naman Hospital"
        description="Stories from patients and caregivers who experience our compassionate treatment, clear communication, and dedicated follow-ups."
        alignment="center"
      />
      <div className="row g-4">
        {testimonials.map(testimonial => (
          <div className="col-md-6 col-lg-4" key={testimonial.name}>
            <div className="card testimonial-card h-100">
              <div className="card-body p-4 d-flex flex-column">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="rounded-circle"
                    width={60}
                    height={60}
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="mb-0">{testimonial.name}</h6>
                    <small className="text-muted">{testimonial.role}</small>
                  </div>
                </div>
                <p className="text-muted flex-grow-1">“{testimonial.quote}”</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;

