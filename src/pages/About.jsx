import { Link } from "react-router-dom";

const About = () => (
  <section className="py-5 bg-light">
    <div className="container">
      <div className="row g-4 align-items-center mb-5">
        <div className="col-lg-6">
          <span className="badge bg-soft-primary text-primary text-uppercase fw-semibold">
            About Naman Hospital
          </span>
          <h1 className="display-6 fw-bold mt-3">
            Darbhanga’s multi-speciality hospital with a heart for healing
          </h1>
          <p className="text-muted lead">
            Founded by Dr. N.K. Suman, Naman Hospital brings compassionate healthcare, advanced
            technology, and trusted specialists under one roof. We are committed to serving the
            communities of Mithilanchal with integrity and personalised treatment.
          </p>
          <p className="text-muted">
            From preventive medicine and women’s health to complex surgeries and emergency response,
            our hospital combines modern infrastructure with culturally rooted care. Every department
            works together so patients receive timely diagnosis, clear communication, and holistic
            rehabilitation support.
          </p>
          <div className="d-flex flex-wrap gap-3 mt-4">
            <Link to="/services" className="btn btn-mediplus-primary">
              Explore departments
            </Link>
            <Link to="/contact" className="btn btn-outline-primary">
              Book a visit
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h3 className="fw-semibold mb-4">Impact in numbers</h3>
            <div className="row g-4">
              <div className="col-sm-6">
                <div className="stat-tile bg-soft-primary text-primary rounded-4 p-4 h-100">
                  <span className="display-5 fw-bold d-block">18+</span>
                  <small className="text-secondary fw-semibold text-uppercase">
                    years of trusted service
                  </small>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="stat-tile bg-soft-primary text-primary rounded-4 p-4 h-100">
                  <span className="display-5 fw-bold d-block">50+</span>
                  <small className="text-secondary fw-semibold text-uppercase">
                    multi-disciplinary doctors
                  </small>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="stat-tile bg-soft-primary text-primary rounded-4 p-4 h-100">
                  <span className="display-5 fw-bold d-block">24×7</span>
                  <small className="text-secondary fw-semibold text-uppercase">
                    emergency and ICU care
                  </small>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="stat-tile bg-soft-primary text-primary rounded-4 p-4 h-100">
                  <span className="display-5 fw-bold d-block">8</span>
                  <small className="text-secondary fw-semibold text-uppercase">
                    specialised departments
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h4 className="fw-semibold">Advanced infrastructure</h4>
              <p className="text-muted">
                Digital X-ray, ultrasound, ICU, modular OT complex, and in-house diagnostics ensure
                faster reporting and safer procedures for every patient.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h4 className="fw-semibold">Compassionate care</h4>
              <p className="text-muted">
                Bilingual staff, family-friendly wards, and patient education sessions make treatment
                easy to understand and follow, especially for elders and children.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h4 className="fw-semibold">Community commitment</h4>
              <p className="text-muted">
                Regular health camps, vaccination drives, and CSR programmes extend quality care to
                neighbouring villages across Darbhanga district.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;

