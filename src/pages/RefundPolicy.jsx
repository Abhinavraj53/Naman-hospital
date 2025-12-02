const rules = [
  {
    title: "1. Eligibility",
    body:
      "Refunds apply to prepaid consultations booked through our website or payment links generated via Cashfree. Packages or in-patient services follow separate agreements shared at the hospital desk."
  },
  {
    title: "2. Cancellation window",
    body:
      "You may cancel or reschedule up to 12 hours before the appointment start time for a full refund. Requests inside the 12-hour window are reviewed case-by-case (doctor unavailability, emergencies, duplicate transactions, etc.)."
  },
  {
    title: "3. How to request",
    body:
      "Email care@namanhospital.com with the patient name, Cashfree order ID, appointment date, and reason for the refund. You can also raise the request from the Payment Status page."
  },
  {
    title: "4. Processing timeline",
    body:
      "Approved refunds are initiated within 3–5 working days. Cashfree may take an additional 5–7 working days to credit the amount back to your original payment method (UPI, card, or net banking)."
  },
  {
    title: "5. Non-refundable scenarios",
    body:
      "No-shows without prior intimation, service already delivered, or refunds requested beyond 30 days from the transaction date are usually not eligible."
  },
  {
    title: "6. Partial refunds",
    body:
      "If a consultation is completed but a diagnostic add-on is unavailable, we refund only the undelivered component. Taxes, payment gateway fees, or currency conversion charges are refunded only if Cashfree returns them to us."
  },
  {
    title: "7. Contact",
    body:
      "Have questions about your refund? Call +91 9234277007 or email care@namanhospital.com with your order ID."
  }
];

const RefundPolicy = () => (
  <section className="py-5 bg-light">
    <div className="container">
      <header className="mb-4">
        <p className="text-uppercase text-muted small mb-1">Updated: {new Date().toLocaleDateString()}</p>
        <h1 className="mb-3">Refund & Cancellation Policy</h1>
        <p className="lead mb-0">
          We follow RBI-compliant digital payment norms and Cashfree’s settlement timelines. This page explains when you
          can cancel, how refunds are issued, and what information we need to process your request quickly.
        </p>
      </header>
      <div className="d-grid gap-4">
        {rules.map(rule => (
          <article key={rule.title} className="p-4 bg-white shadow-sm rounded-3">
            <h5 className="mb-2">{rule.title}</h5>
            <p className="mb-0 text-muted">{rule.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default RefundPolicy;


