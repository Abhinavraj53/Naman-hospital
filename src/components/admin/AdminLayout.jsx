import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaChartPie,
  FaCalendarCheck,
  FaUserMd,
  FaUserPlus,
  FaUsers,
  FaEnvelopeOpenText,
  FaBars,
  FaRegNewspaper,
  FaSignOutAlt
} from "react-icons/fa";
import { logout } from "../../store/authSlice";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: <FaChartPie />, exact: true },
  { label: "Appointments", to: "/admin/appointments", icon: <FaCalendarCheck /> },
  { label: "Add Doctor", to: "/admin/doctors/add", icon: <FaUserPlus /> },
  { label: "Doctors List", to: "/admin/doctors", icon: <FaUserMd /> },
  { label: "Users", to: "/admin/users", icon: <FaUsers /> },
  { label: "Blog", to: "/admin/blog", icon: <FaRegNewspaper /> },
  { label: "Contacts", to: "/admin/contacts", icon: <FaEnvelopeOpenText /> }
];

const AdminLayout = ({ title, subtitle, actions, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={`admin-shell ${sidebarOpen ? "sidebar-open" : ""}`}>
      <div className="admin-sidebar-backdrop d-lg-none" onClick={() => setSidebarOpen(false)} />
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="brand-dot" />
          <div>
            <p className="text-uppercase small mb-0 text-muted">Naman</p>
            <strong>Care Command</strong>
          </div>
        </div>
        <nav className="admin-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-meta">
          <p className="mb-1 fw-semibold">Shift handover at 7:30 PM</p>
          <p className="mb-0 small">Briefing deck is ready in the war room.</p>
        </div>
        <div className="admin-sidebar-footer">
          {user && (
            <div className="admin-user-info mb-3">
              <p className="mb-1 small text-muted">Logged in as</p>
              <p className="mb-0 fw-semibold">{user.name}</p>
            </div>
          )}
          <button
            type="button"
            className="admin-logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </aside>

      <div className="admin-main-panel">
        <div className="admin-page-header">
          <div className="d-flex align-items-start gap-3 flex-wrap">
            <button
              type="button"
              className="btn btn-outline-primary d-lg-none"
              onClick={() => setSidebarOpen(prev => !prev)}
            >
              <FaBars />
            </button>
            <div className="admin-page-heading">
              <p className="text-uppercase small text-muted mb-1">Admin Control</p>
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>
          <div className="admin-header-actions d-flex align-items-center gap-2">{actions && <div>{actions}</div>}</div>
        </div>

        <div className="admin-page-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;

