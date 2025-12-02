import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = data => {
    toast.success(`धन्यवाद ${data.name}, नमन हॉस्पिटल की टीम शीघ्र ही आपसे संपर्क करेगी।`);
    reset();
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row g-4 mb-5 align-items-center">
          <div className="col-lg-6">
            <span className="badge bg-soft-primary text-primary fw-semibold text-uppercase">
              Contact Naman Hospital
            </span>
            <h1 className="display-6 fw-bold mt-3">
              Compassionate care in the heart of Darbhanga
            </h1>
            <p className="text-muted lead">
              अपॉइंटमेंट बुकिंग, एम्बुलेंस सहायता, मेडिकल रिकॉर्ड या पैकेज संबंधी जानकारी के लिए हमारी
              टीम से संपर्क करें। 24×7 इमरजेंसी एवं हेल्पडेस्क सेवा उपलब्ध है।
            </p>
            <ul className="list-unstyled text-muted d-grid gap-2 mt-4">
              <li>• Email: care@namanhospital.com</li>
              <li>• Phone: +91 9234277007</li>
              <li>• Address: अल्लपट्टी गुमती, दरभंगा (Allapatti Gumti, Darbhanga)</li>
              <li>• Support hours: OPD 8am–8pm · Emergency 24×7</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-lg-5">
                <h3 className="fw-semibold mb-3">Share your requirement</h3>
                <form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label className="form-label">Full name</label>
                    <input className="form-control" required {...register("name")} />
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Work email</label>
                      <input type="email" className="form-control" required {...register("email")} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone number</label>
                      <input type="tel" className="form-control" {...register("phone")} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">City / Locality</label>
                    <input className="form-control" required {...register("locality")} />
                  </div>
                  <div>
                    <label className="form-label">How can we help?</label>
                    <select className="form-select" {...register("topic")}>
                      <option value="appointment">Appointment booking</option>
                      <option value="emergency">Emergency & ambulance</option>
                      <option value="insurance">Insurance & billing</option>
                      <option value="other">Other query</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="4" {...register("message")} />
                  </div>
                  <button className="btn btn-mediplus-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending…" : "Submit enquiry"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">
            <div className="row g-4">
              <div className="col-md-4">
                <h5 className="fw-semibold">Patient Services</h5>
                <p className="text-muted mb-1">care@namanhospital.com</p>
                <small className="text-muted">Appointments, billing, medical records</small>
              </div>
              <div className="col-md-4">
                <h5 className="fw-semibold">Emergency Desk</h5>
                <p className="text-muted mb-1">+91 9234277007</p>
                <small className="text-muted">Ambulance & trauma coordination</small>
              </div>
              <div className="col-md-4">
                <h5 className="fw-semibold">Administration</h5>
                <p className="text-muted mb-1">admin@namanhospital.com</p>
                <small className="text-muted">Partnerships, corporate tie-ups, CSR</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

