import { Link } from "react-router-dom";

const CTASection = () => (
  <section className="cta-section py-5">
    <div className="container">
      <div className="card border-0 shadow-lg overflow-hidden text-center text-md-start">
        <div className="row g-0 align-items-center">
          <div className="col-md-8 p-5 bg-primary text-light">
            <h2 className="h1 mb-3">Need care at Naman Hospital?</h2>
            <p className="mb-4 text-light-50">
              Book consultations across medicine, surgery, orthopedics, paediatrics, and more.
              Emergency support is available round the clock with dedicated coordinators.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/track-appointment" className="btn btn-light btn-lg text-primary">
                Book Appointment
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-lg">
                View Departments
              </Link>
            </div>
          </div>
          <div className="col-md-4 bg-light p-5">
            <h5 className="text-primary mb-3">Emergency Helpline</h5>
            <ul className="list-unstyled text-muted d-grid gap-2">
              <li>• Call +91 6272 245 911 (24×7)</li>
              <li>• Ambulance dispatch across Darbhanga, Madhubani, Samastipur</li>
              <li>• Immediate ICU, OT, and critical care availability</li>
            </ul>
            <Link to="/contact" className="btn btn-outline-primary">
              Contact Reception
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;

