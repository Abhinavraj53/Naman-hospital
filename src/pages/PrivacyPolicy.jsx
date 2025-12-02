const sections = [
  {
    title: "1. About this policy",
    body:
      "Naman Hospital (Darbhanga) operates the website, mobile experience, and appointment desk. This policy explains what data we collect, why we collect it, and how it is protected. By using our services you agree to the practices described below."
  },
  {
    title: "2. Information we collect",
    body:
      "We collect basic identifiers (name, email, phone), demographic details, appointment history, uploaded medical records, payment references, and support conversations. When you complete an online payment we also store Cashfree order IDs, payment method codes, and transaction timestamps."
  },
  {
    title: "3. How we use your data",
    body:
      "Patient records help us schedule consultations, share medical instructions, send reminders, and comply with statutory medical registers. Payment data is used to confirm bookings, issue invoices, and detect fraudulent activity. Aggregated reports help us improve hospital operations without identifying individuals."
  },
  {
    title: "4. Sharing and third parties",
    body:
      "Your data is only shared with treating doctors, on-duty nursing staff, diagnostic partners, and regulated service providers that help us run the platform (for example, Cashfree Payments, Cloudinary, and email/SMS gateways). Each partner is bound by confidentiality and data-processing agreements."
  },
  {
    title: "5. Cashfree compliance",
    body:
      "All online payments are processed through Cashfree (Razorpay Technologies Pvt. Ltd.). Your card or UPI details are submitted directly to Cashfree’s PCI-DSS certified infrastructure. We never store full card numbers, CVV, or UPI PIN on our servers."
  },
  {
    title: "6. Your rights",
    body:
      "You can request copies of your medical or billing records, ask us to correct inaccurate details, and revoke marketing consent at any time by emailing care@namanhospital.com. For security, we may request proof of identity before sharing sensitive information."
  },
  {
    title: "7. Data retention & security",
    body:
      "Medical records are retained for the duration mandated by Indian clinical establishment rules. Payment and invoice data is preserved for a minimum of eight years for taxation and audit compliance. All systems use role-based access, TLS encryption, and regular security reviews."
  },
  {
    title: "8. Contact & grievances",
    body:
      "For questions about this policy or to raise a privacy grievance, email care@namanhospital.com or write to: Privacy Officer, Naman Hospital, Laheriasarai Main Road, Darbhanga, Bihar 846001."
  }
];

const PrivacyPolicy = () => (
  <section className="py-5 bg-light">
    <div className="container">
      <div className="mb-4">
        <p className="text-uppercase text-muted small mb-1">Updated: {new Date().toLocaleDateString()}</p>
        <h1 className="mb-3">Privacy Policy</h1>
        <p className="lead mb-0">
          We are committed to protecting patient confidentiality and complying with the Information Technology Act, 2000,
          applicable medical council guidelines, and Cashfree’s data protection requirements.
        </p>
      </div>
      <div className="d-grid gap-4">
        {sections.map(section => (
          <article key={section.title} className="p-4 bg-white shadow-sm rounded-3">
            <h5 className="mb-2">{section.title}</h5>
            <p className="mb-0 text-muted">{section.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default PrivacyPolicy;


