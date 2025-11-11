const Footer = () => (
  <footer className="footer py-5 text-light">
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-4">
          <h5 className="text-white">Naman Hospital</h5>
          <p className="mb-0">
            Darbhanga का भरोसेमंद मल्टी-स्पेशियलिटी हॉस्पिटल—जहाँ अनुभवी डॉक्टर, आधुनिक सुविधा और
            समर्पित देखभाल हर मरीज के साथ है।
          </p>
        </div>
        <div className="col-lg-4">
          <h6 className="text-white mb-3">Quick Links</h6>
          <ul className="list-unstyled d-grid gap-2">
            <li>
              <a href="/services" className="link-light">
                Services
              </a>
            </li>
            <li>
              <a href="/doctors" className="link-light">
                Doctors
              </a>
            </li>
            <li>
              <a href="/blog" className="link-light">
                Blog
              </a>
            </li>
            <li>
              <a href="/pricing" className="link-light">
                Pricing
              </a>
            </li>
            <li>
              <a href="/contact" className="link-light">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-4">
          <h6 className="text-white mb-3">Contact</h6>
          <ul className="list-unstyled d-grid gap-2">
            <li>Email: care@namanhospital.com</li>
            <li>Phone: +91 6272 245 911 / +91 9431 123 456</li>
            <li>Address: Laheriasarai Main Road, Darbhanga, Bihar 846001</li>
          </ul>
        </div>
      </div>
      <hr className="border-top border-light opacity-25 my-4" />
      <div className="d-flex justify-content-between flex-wrap align-items-center text-light-50 gap-3">
        <small>© {new Date().getFullYear()} Naman Hospital, Darbhanga. All rights reserved.</small>
        <div className="d-flex gap-3">
          <a href="/" className="link-light">
            Privacy
          </a>
          <a href="/" className="link-light">
            Terms
          </a>
          <a href="/" className="link-light">
            Support
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

