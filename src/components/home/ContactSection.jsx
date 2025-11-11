import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ContactSection = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    toast.success(`धन्यवाद ${data.name}, नामन हॉस्पिटल की टीम जल्द ही आपसे संपर्क करेगी!`);
    reset();
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <h2 className="mb-3">Reach Naman Hospital</h2>
            <p className="text-muted">
              Visit us at Laheriasarai, Darbhanga या फ़ोन के ज़रिए एम्बुलेंस, अपॉइंटमेंट और मेडिकल
              सपोर्ट प्राप्त करें। हमारी हेल्पडेस्क प्रतिदिन सेवा में उपस्थित है।
            </p>
            <ul className="list-unstyled text-muted d-grid gap-2 mt-4">
              <li>• Email: care@namanhospital.com</li>
              <li>• Phone: +91 6272 245 911 / +91 9431 123 456</li>
              <li>• Address: Laheriasarai Main Road, Darbhanga, Bihar 846001</li>
              <li>• Timings: OPD 8am–8pm · Emergency 24×7</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm contact-card">
              <div className="card-body p-4">
                <h4 className="mb-3">Write to our helpdesk</h4>
                <form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label className="form-label">Full name</label>
                    <input type="text" className="form-control" required {...register("name")} />
                  </div>
                  <div>
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" required {...register("email")} />
                  </div>
                  <div>
                    <label className="form-label">How can we help?</label>
                    <textarea className="form-control" rows="4" required {...register("message")} />
                  </div>
                  <button type="submit" className="btn btn-mediplus-primary">
                    Send message
                  </button>
                  <a href="/contact" className="btn btn-outline-primary">
                    More ways to connect
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

