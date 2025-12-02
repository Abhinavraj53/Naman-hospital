import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { fetchAdminStats } from "../store/adminSlice";
import Spinner from "../components/shared/Spinner";
import {
  FaUsers,
  FaCalendarAlt,
  FaFileAlt,
  FaEnvelope,
  FaArrowRight,
  FaChartLine
} from "react-icons/fa";
import AdminLayout from "../components/admin/AdminLayout";
import adminApi from "../api/adminApi";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector(state => state.admin);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentLoading, setRecentLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  useEffect(() => {
    const loadRecent = async () => {
      setRecentLoading(true);
      try {
        const response = await adminApi.getAllAppointments({ limit: 5 });
        setRecentAppointments(response.appointments || []);
      } catch (error) {
        console.error("Unable to load recent appointments", error);
      } finally {
        setRecentLoading(false);
      }
    };
    loadRecent();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats?.users?.total || 0,
      icon: <FaUsers />,
      link: "/admin/users",
      trend: "+12 onboarded this week",
      subItems: [
        { label: "Patients", value: stats?.users?.patients || 0 },
        { label: "Doctors", value: stats?.users?.doctors || 0 },
        { label: "Admins", value: stats?.users?.admins || 0 }
      ]
    },
    {
      title: "Appointments",
      value: stats?.appointments?.total || 0,
      icon: <FaCalendarAlt />,
      link: "/admin/appointments",
      trend: `${stats?.appointments?.today || 0} sessions today`,
      subItems: [
        { label: "Today", value: stats?.appointments?.today || 0 },
        { label: "This Week", value: stats?.appointments?.thisWeek || 0 },
        { label: "This Month", value: stats?.appointments?.thisMonth || 0 }
      ]
    },
    {
      title: "Blog Posts",
      value: stats?.content?.blogs || 0,
      icon: <FaFileAlt />,
      link: "/admin/blog",
      trend: "Editorial calendar on track"
    },
    {
      title: "Contact Messages",
      value: stats?.content?.contacts || 0,
      icon: <FaEnvelope />,
      link: "/admin/contacts",
      trend: `${stats?.content?.pendingContacts || 0} awaiting reply`,
      badge: stats?.content?.pendingContacts || 0
    }
  ];

  const quickVitals = [
    {
      label: "Bed readiness",
      value: "18 / 22 wards ready",
      note: "+2 versus yesterday"
    },
    {
      label: "OPD efficiency",
      value: `${stats?.appointments?.today || 0} same-day visits`,
      note: "Slots balanced with radiology"
    },
    {
      label: "Patient delight",
      value: "4.8 / 5 rating",
      note: "Latest 50 discharge surveys"
    }
  ];

  const renderStatCards = () =>
    statCards.map(card => (
      <Link to={card.link} key={card.title} className="text-decoration-none">
        <div className="admin-stat-card">
          <div className="stat-icon">{card.icon}</div>
          <h3>{card.value}</h3>
          <p>{card.title}</p>
          {card.trend && <span className="stat-trend text-success">{card.trend}</span>}
          {card.subItems && (
            <div className="mt-3 pt-3 border-top">
              {card.subItems.map(item => (
                <div key={item.label} className="d-flex justify-content-between small text-muted">
                  <span>{item.label}</span>
                  <span className="fw-semibold text-dark">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Link>
    ));

  const renderRecentAppointments = () => {
    if (recentLoading) {
      return <Spinner label="Syncing appointments..." />;
    }
    if (recentAppointments.length === 0) {
      return (
        <div className="admin-empty-state">
          <strong>No new bookings</strong>
          <p className="mb-0">Fresh appointments will appear here instantly.</p>
        </div>
      );
    }
    return recentAppointments.map(appointment => {
      const doctorName =
        appointment.doctorId?.name ||
        appointment.doctorName ||
        appointment.doctorSpecialty ||
        "Doctor";
      const patientName = appointment.patientId?.name || appointment.patientName || "Patient";
      const initials = doctorName
        .split(" ")
        .slice(0, 2)
        .map(part => part[0])
        .join("")
        .toUpperCase();
      const dateLabel = appointment.date ? format(new Date(appointment.date), "d MMM, h:mm a") : "TBD";

      return (
        <div className="latest-appointment-row" key={appointment.id || appointment._id}>
          <div className="appointment-avatar">{initials}</div>
          <div className="appointment-meta">
            <p>{doctorName}</p>
            <small>
              {patientName} • {dateLabel}
            </small>
          </div>
          <button className="icon-button" type="button">
            <FaArrowRight />
          </button>
        </div>
      );
    });
  };

  return (
    <AdminLayout
      title="Hospital command center"
      subtitle="Monitor occupancy, rosters, and patient touchpoints at a glance."
      actions={
        <Link to="/admin/analytics" className="btn btn-outline-primary">
          <FaChartLine className="me-2" />
          View analytics
        </Link>
      }
    >
      {loading ? (
        <Spinner label="Loading dashboard..." />
      ) : (
        <>
          <div className="admin-stat-grid">{renderStatCards()}</div>

          <div className="admin-panels-grid">
            <div className="admin-panel-card">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Latest appointments</h5>
                <Link to="/admin/appointments" className="text-decoration-none small fw-semibold">
                  View all
                </Link>
              </div>
              <div className="latest-appointments">{renderRecentAppointments()}</div>
            </div>
            <div className="admin-panel-card">
              <h5>Operations radar</h5>
              <div className="care-score-list">
                {quickVitals.map(item => (
                  <div key={item.label} className="care-score-item">
                    <div>
                      <span>{item.label}</span>
                      <p className="mb-0 small">{item.note}</p>
                    </div>
                    <span className="score-pill">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;

