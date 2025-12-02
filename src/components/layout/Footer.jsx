import { Link } from "react-router-dom";

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
              <Link to="/services" className="link-light">
                Services
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="link-light">
                Doctors
              </Link>
            </li>
            <li>
              <Link to="/blog" className="link-light">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/track-appointment" className="link-light">
                Track appointment
              </Link>
            </li>
            <li>
              <Link to="/contact" className="link-light">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-2">
          <h6 className="text-white mb-3">Policies</h6>
          <ul className="list-unstyled d-grid gap-2">
            <li>
              <Link to="/privacy-policy" className="link-light">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="link-light">
                Terms of service
              </Link>
            </li>
            <li>
              <Link to="/refund-policy" className="link-light">
                Refund policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-2">
          <h6 className="text-white mb-3">Support</h6>
          <ul className="list-unstyled d-grid gap-2">
            <li>Email: care@namanhospital.com</li>
            <li>Phone: +91 9234277007</li>
            <li>Emergency: +91 9234277007</li>
          </ul>
        </div>
      </div>
      <hr className="border-top border-light opacity-25 my-4" />
      <div className="d-flex justify-content-between flex-wrap align-items-center text-light-50 gap-3">
        <small>© {new Date().getFullYear()} Naman Hospital, Darbhanga. All rights reserved.</small>
        <div className="d-flex gap-3 flex-wrap">
          <Link to="/privacy-policy" className="link-light">
            Privacy policy
          </Link>
          <Link to="/terms-of-service" className="link-light">
            Terms of service
          </Link>
          <Link to="/refund-policy" className="link-light">
            Refund policy
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

