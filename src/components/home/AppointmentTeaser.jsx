import { Link } from "react-router-dom";
import SectionTitle from "../shared/SectionTitle";

const AppointmentTeaser = () => (
  <section className="ftco-section">
    <div className="container">
      <SectionTitle
        eyebrow="Appointments"
        title="Book easily across every department"
        description="Choose your speciality, select a time that works for you, and our coordinators will confirm the visit—whether it’s medicine, surgery, or emergency care."
      />
      <div className="appointment-banner row g-0">
        <div className="col-lg-7 p-4 p-lg-5">
          <h3 className="fw-bold mb-4">Multi-speciality appointments, one trusted address</h3>
          <p className="text-muted mb-4">
            Naman Hospital streamlines your journey from registration to discharge. Our triage desk
            coordinates with every department so patients receive timely consultations and follow-up.
          </p>
          <div className="row g-4">
            <div className="col-md-6">
              <h5 className="fw-semibold text-primary">Real-time availability</h5>
              <p className="text-muted small mb-0">
                View available slots across medicine, orthopedics, paediatrics, and more before you
                arrive at the hospital.
              </p>
            </div>
            <div className="col-md-6">
              <h5 className="fw-semibold text-primary">Automated reminders</h5>
              <p className="text-muted small mb-0">
                SMS updates ensure you never miss follow-ups, physiotherapy sessions, or vaccination
                schedules.
              </p>
            </div>
            <div className="col-md-6">
              <h5 className="fw-semibold text-primary">Integrated billing</h5>
              <p className="text-muted small mb-0">
                Affordable packages, transparent estimates, and cashless insurance assistance at the
                billing desk.
              </p>
            </div>
            <div className="col-md-6">
              <h5 className="fw-semibold text-primary">Connected follow-ups</h5>
              <p className="text-muted small mb-0">
                Coordinated rehabilitation, diet counselling, and post-surgery reviews tailored to
                every patient.
              </p>
            </div>
          </div>
          <div className="mt-4 d-flex flex-wrap gap-3">
            <Link to="/track-appointment" className="btn btn-mediplus-primary px-4">
              Schedule a visit
            </Link>
            <Link to="/contact" className="btn btn-outline-mediplus px-4">
              Call our helpdesk
            </Link>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="media h-100" style={{ backgroundImage: "url(/mediplus-images/bg_2.jpg)" }}>
            <div className="media-content">
              <h3 className="fw-semibold mb-3">Need urgent support?</h3>
              <p className="text-light opacity-75 mb-4">
                Our 24×7 emergency and trauma team is equipped with ventilators, ICU beds, and rapid
                diagnostics to stabilise critical cases.
              </p>
              <ul className="text-light-50 list-unstyled d-grid gap-3 mb-4">
                <li>• Dedicated emergency entrance with on-call specialists</li>
                <li>• In-house pharmacy, diagnostics, and blood bank</li>
                <li>• Ambulance coordination across Darbhanga district</li>
              </ul>
              <Link to="/track-appointment" className="btn btn-light text-primary fw-semibold px-4">
                Contact Emergency Desk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AppointmentTeaser;

