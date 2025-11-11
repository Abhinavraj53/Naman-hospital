import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPhoneAlt, FaPaperPlane } from "react-icons/fa";
import { logout } from "../../store/authSlice";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/doctors", label: "Doctors" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/track-appointment", label: "Track" },
  { to: "/contact", label: "Contact" }
];

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  const toggle = () => setExpanded(prev => !prev);
  const close = () => setExpanded(false);

  const handleLogout = () => {
    dispatch(logout());
    close();
  };

  return (
    <>
      <div className="topbar py-2">
        <div className="container d-flex flex-column flex-lg-row justify-content-lg-between align-items-center gap-2">
          <div>
            <span className="contact-item">
              <FaPhoneAlt aria-hidden="true" /> +91 6272 245 911
            </span>
            <span className="contact-item">
              <FaPaperPlane aria-hidden="true" /> care@namanhospital.com
            </span>
          </div>
          <div>
            {user ? (
              <span className="contact-item">
                Welcome back, <strong>{user.name}</strong>
              </span>
            ) : (
              <span className="contact-item">
                Serving Darbhanga with compassion since 2005
              </span>
            )}
          </div>
        </div>
      </div>
      <header className="navbar navbar-expand-lg mediplus-navbar sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Naman Hospital
          </Link>
          <button
            className="navbar-toggler text-white border-0"
            type="button"
            aria-controls="mainNav"
            aria-expanded={expanded}
            aria-label="Toggle navigation"
            onClick={toggle}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <nav className={`collapse navbar-collapse ${expanded ? "show" : ""}`} id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {navItems.map(item => (
                <li className="nav-item" key={item.to}>
                  <NavLink className="nav-link" to={item.to} onClick={close} end={item.end}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="d-flex align-items-center ms-lg-4 gap-2">
              {user ? (
                <>
                  <NavLink
                    className="btn btn-outline-light"
                    to={user.role === "DOCTOR" ? "/dashboard/doctor" : "/dashboard/patient"}
                  >
                    Dashboard
                  </NavLink>
                  <button className="btn btn-mediplus-primary" type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink className="btn btn-outline-light" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="btn btn-mediplus-primary" to="/register">
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;

