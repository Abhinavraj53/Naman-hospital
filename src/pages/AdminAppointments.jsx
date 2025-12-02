import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchAllAppointments } from "../store/adminSlice";
import { updateAppointmentStatus } from "../store/appointmentSlice";
import Spinner from "../components/shared/Spinner";
import AdminLayout from "../components/admin/AdminLayout";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" }
];

const AdminAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector(state => state.admin);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchAllAppointments({ status: statusFilter !== "all" ? statusFilter : undefined }));
  }, [dispatch, statusFilter]);

  const handleAppointmentAction = (status, appointment) => {
    const appointmentId = appointment.id || appointment._id || appointment.trackingId;
    const currentStatus = appointment.status;

    if (status === currentStatus) {
      toast.error(`Appointment is already ${status.toLowerCase()}`);
      return;
    }
    if (status === "COMPLETED" && currentStatus === "PENDING") {
      toast.error("Confirm the appointment before marking as completed");
      return;
    }
    if (status === "COMPLETED" && currentStatus === "CANCELLED") {
      toast.error("Cancelled appointments cannot be completed");
      return;
    }

    const confirmMessage = {
      CONFIRMED: "Mark this appointment as confirmed?",
      COMPLETED: "Mark this appointment as completed?",
      CANCELLED: "Cancel this appointment?"
    }[status];

    if (!window.confirm(confirmMessage || "Proceed?")) {
      return;
    }

    const result = dispatch(updateAppointmentStatus({ id: appointmentId, status }));
    result.then(action => {
      if (updateAppointmentStatus.fulfilled.match(action)) {
        toast.success(`Appointment ${status.toLowerCase()}`);
        dispatch(fetchAllAppointments({ status: statusFilter !== "all" ? statusFilter : undefined }));
      } else if (action.payload) {
        toast.error(action.payload);
      }
    });
  };

  const renderStatusChip = status => {
    const classMap = {
      PENDING: "pending",
      CONFIRMED: "confirmed",
      COMPLETED: "completed",
      CANCELLED: "cancelled"
    };
    return <span className={`pill ${classMap[status] || "pending"}`}>{status}</span>;
  };

  const renderAppointments = () => {
    if (loading) {
      return <Spinner label="Loading appointments..." />;
    }
    if (!appointments.length) {
      return (
        <div className="admin-empty-state">
          <strong>No appointments found</strong>
          <p className="mb-0">Bookings will appear here as soon as patients confirm a slot.</p>
        </div>
      );
    }
    return appointments.map(appointment => {
      const patientName = appointment.patientId?.name || appointment.patientName || "Patient";
      const doctorName =
        appointment.doctorId?.name || appointment.doctorName || appointment.doctorSpecialty || "Doctor";
      return (
      <div className="admin-appointment-row" key={appointment.id || appointment._id}>
        <div className="appointment-person">
          <div className="appointment-avatar">
            {patientName
              .split(" ")
              .map(part => part[0])
              .join("")
              .toUpperCase()}
          </div>
          <div>
            <p className="mb-1 fw-semibold text-dark">{patientName}</p>
            <small className="text-muted">Patient</small>
          </div>
        </div>
        <div>
          <p className="mb-1 fw-semibold text-dark">{doctorName}</p>
          <small className="text-muted">
            {appointment.doctorId?.specialty || appointment.doctorSpecialty || "General"}
          </small>
        </div>
        <div>
          <p className="mb-1 fw-semibold text-dark">
            {appointment.date ? format(new Date(appointment.date), "EEE, d MMM") : "TBD"}
          </p>
          <small className="text-muted">{appointment.timeSlot || "Flexible time"}</small>
        </div>
        <div>{renderStatusChip(appointment.status)}</div>
        <div className="row-actions d-flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-success"
            onClick={() => handleAppointmentAction("CONFIRMED", appointment)}
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => handleAppointmentAction("COMPLETED", appointment)}
          >
            Complete
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleAppointmentAction("CANCELLED", appointment)}
          >
            Cancel
          </button>
          <Link to="/track-appointment" className="btn btn-sm btn-link">
            Details
          </Link>
        </div>
      </div>
    );
    });
  };

  return (
    <AdminLayout
      title="Appointment command desk"
      subtitle="Balance rosters, confirmations, and care handoffs in real time."
      actions={
        <div className="admin-appointment-toolbar">
          {statusOptions.map(option => (
            <button
              type="button"
              key={option.value}
              className={`status-chip ${statusFilter === option.value ? "active" : ""}`}
              onClick={() => setStatusFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      }
    >
      <div className="admin-appointment-list">{renderAppointments()}</div>
    </AdminLayout>
  );
};

export default AdminAppointments;

