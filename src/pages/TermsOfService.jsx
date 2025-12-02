const clauses = [
  {
    title: "1. Acceptance of terms",
    body:
      "By visiting namanhospital.dailyorganicsstore.com, booking an appointment, or using our dashboards, you confirm that you are at least 18 years old (or acting on behalf of a minor patient) and agree to these Terms of Service."
  },
  {
    title: "2. Scope of services",
    body:
      "We provide appointment scheduling, tele-consult coordination, patient record management, and payment collection for Naman Hospital. Actual medical treatment is delivered by licensed doctors at our facility."
  },
  {
    title: "3. Accounts & verification",
    body:
      "Patients must register with accurate information and verify their email before accessing the portal. Admins may deactivate accounts that provide false information or misuse the system."
  },
  {
    title: "4. Payments & charges",
    body:
      "Consultation fees are displayed before checkout. Online payments are processed via Cashfree. You authorize us to debit the amount shown, including applicable taxes or platform fees. A confirmed payment is required to reserve a slot."
  },
  {
    title: "5. Appointments & cancellations",
    body:
      "You may reschedule or cancel up to 12 hours before the appointment by contacting care@namanhospital.com or using the patient portal. Late cancellations or no-shows may forfeit eligibility for refunds (see Refund Policy)."
  },
  {
    title: "6. Medical content",
    body:
      "Information shared on the website, blog, or messaging tools is for education and coordination only. It should not replace personalized medical advice from our doctors."
  },
  {
    title: "7. Limitation of liability",
    body:
      "To the extent permitted by law, Naman Hospital is not liable for indirect, incidental, or consequential damages arising from portal usage, payment gateway downtime, or third-party integrations."
  },
  {
    title: "8. Changes to terms",
    body:
      "We may update these terms to reflect legal, operational, or security requirements. Significant changes will be notified via email or a site banner. Continued use after updates constitutes acceptance."
  },
  {
    title: "9. Contact",
    body:
      "Questions about these terms? Email care@namanhospital.com or visit Laheriasarai Main Road, Darbhanga, Bihar 846001."
  }
];

const TermsOfService = () => (
  <section className="py-5">
    <div className="container">
      <header className="mb-4">
        <p className="text-uppercase text-muted small mb-1">Updated: {new Date().toLocaleDateString()}</p>
        <h1 className="mb-3">Terms of Service</h1>
        <p className="lead">
          These terms govern how you use the Naman Hospital website, appointment desk, dashboards, and Cashfree-powered
          payment flows. Please read them carefully before booking or logging in.
        </p>
      </header>
      <div className="d-grid gap-4">
        {clauses.map(clause => (
          <article key={clause.title} className="p-4 border rounded-3 bg-white">
            <h5 className="mb-2">{clause.title}</h5>
            <p className="mb-0 text-muted">{clause.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default TermsOfService;


