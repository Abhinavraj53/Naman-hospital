import { Link } from "react-router-dom";

const Hero = () => (
  <section
    className="hero-wrap"
    style={{ backgroundImage: "url(/mediplus-images/bg_3.jpg)" }}
    data-section="home"
  >
    <div className="container">
      <div className="row align-items-center justify-content-start">
        <div className="col-lg-6 col-md-8">
          <span className="subheading d-inline-block mb-3">
            Darbhanga’s trusted multi-speciality care
          </span>
          <h1>
            Naman Hospital
            <br />
            Caring with compassion
          </h1>
          <p className="lead mb-4">
            From routine consultations to complex surgeries, our expert team delivers personalised
            treatment backed by modern infrastructure and heartfelt service in the heart of Darbhanga.
          </p>
          <div className="hero-buttons d-flex flex-wrap gap-3">
            <Link to="/track-appointment" className="btn btn-mediplus-primary">
              Book an appointment
            </Link>
            <Link to="/about" className="btn btn-outline-mediplus">
              Meet our mission
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;

