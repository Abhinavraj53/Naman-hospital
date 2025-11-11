import { format } from "date-fns";

const statusClasses = {
  PENDING: "bg-warning text-dark",
  CONFIRMED: "bg-success",
  COMPLETED: "bg-info text-dark",
  CANCELLED: "bg-danger"
};

const AppointmentCard = ({ appointment, onAction }) => {
  const badgeClass = statusClasses[appointment.status] || "bg-secondary";

  return (
    <div className="card appointment-card border-0 h-100 shadow-sm">
      <div className="card-body d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <h5 className="mb-1">{appointment.patientName}</h5>
            <p className="text-muted mb-1">{appointment.doctorSpecialty}</p>
            <span className={`badge ${badgeClass}`}>{appointment.status}</span>
          </div>
          <div className="text-end">
            <span className="fw-semibold d-block">
              {appointment.date ? format(new Date(appointment.date), "PPPP") : "TBD"}
            </span>
            <small className="text-muted">{appointment.timeSlot || "Flexible time"}</small>
          </div>
        </div>

        <div className="small text-muted">
          Tracking ID: <span className="fw-semibold">{appointment.trackingId}</span>
        </div>

        <p className="text-muted small mb-0">
          {appointment.notes?.slice(0, 110) || "No additional notes provided."}
        </p>

        {onAction && (
          <div className="d-flex flex-wrap gap-2 mt-auto">
            <button
              className="btn btn-sm btn-outline-success"
              type="button"
              onClick={() => onAction("CONFIRMED", appointment)}
            >
              Confirm
            </button>
            <button
              className="btn btn-sm btn-outline-primary"
              type="button"
              onClick={() => onAction("COMPLETED", appointment)}
            >
              Complete
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              onClick={() => onAction("CANCELLED", appointment)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;

