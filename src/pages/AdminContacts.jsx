import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../store/adminSlice";
import Spinner from "../components/shared/Spinner";
import { FaEnvelope, FaEnvelopeOpen, FaReply } from "react-icons/fa";
import AdminLayout from "../components/admin/AdminLayout";

const AdminContacts = () => {
  const dispatch = useDispatch();
  const { contacts, loading } = useSelector(state => state.admin);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchContacts({ status: statusFilter !== "all" ? statusFilter : undefined }));
  }, [dispatch, statusFilter]);

  const getStatusBadge = status => {
    const badges = {
      NEW: { class: "bg-danger", icon: <FaEnvelope />, text: "New" },
      READ: { class: "bg-warning", icon: <FaEnvelopeOpen />, text: "Read" },
      REPLIED: { class: "bg-success", icon: <FaReply />, text: "Replied" }
    };
    const badge = badges[status] || badges.NEW;
    return (
      <span className={`badge ${badge.class} d-flex align-items-center gap-1`}>
        {badge.icon}
        {badge.text}
      </span>
    );
  };

  const renderContacts = () => {
    if (loading) {
      return <Spinner label="Loading contacts..." />;
    }
    if (!contacts.length) {
      return (
        <div className="admin-empty-state">
          <strong>No messages found</strong>
          <p className="mb-0">Inbound queries from the website will land here automatically.</p>
        </div>
      );
    }
    return (
      <div className="row g-4">
        {contacts.map(contact => (
          <div className="col-md-6" key={contact.id || contact._id}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="mb-1">{contact.name}</h5>
                    <p className="text-muted small mb-0">{contact.email}</p>
                    {contact.phone && <p className="text-muted small mb-0">{contact.phone}</p>}
                  </div>
                  {getStatusBadge(contact.status)}
                </div>
                {contact.subject && <h6 className="mb-2 text-primary">{contact.subject}</h6>}
                <p className="mb-3">{contact.message}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{new Date(contact.createdAt).toLocaleString()}</small>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary">Mark as Read</button>
                    <button className="btn btn-sm btn-outline-success">Reply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout
      title="Contact messages"
      subtitle="Triage helpdesk pings, outreach, and patient escalations."
      actions={
        <select className="form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Messages</option>
          <option value="NEW">New</option>
          <option value="READ">Read</option>
          <option value="REPLIED">Replied</option>
        </select>
      }
    >
      {renderContacts()}
    </AdminLayout>
  );
};

export default AdminContacts;

