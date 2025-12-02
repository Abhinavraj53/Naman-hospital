import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchDoctorAppointments,
  updateAppointmentStatus
} from "../store/appointmentSlice";
import AppointmentCard from "../components/shared/AppointmentCard";
import Spinner from "../components/shared/Spinner";

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const { doctorAppointments, loading, error } = useSelector(state => state.appointments);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleAppointmentAction = (status, appointment) => {
    const appointmentId = appointment.id || appointment._id || appointment.trackingId;
    const currentStatus = appointment.status;

    if (status === "CONFIRMED" && currentStatus === "CANCELLED") {
      toast.error("Cancelled appointments cannot be confirmed");
      return;
    }
    if (status === "CANCELLED" && currentStatus === "COMPLETED") {
      toast.error("Completed appointments cannot be cancelled");
      return;
    }
    if (status === "CONFIRMED" && currentStatus === "COMPLETED") {
      toast.error("Completed appointments cannot be modified");
      return;
    }
    if (status === "COMPLETED" && !["CONFIRMED", "COMPLETED"].includes(currentStatus)) {
      toast.error("Confirm the appointment before marking as completed");
      return;
    }
    if (status === "CANCELLED" && currentStatus === "CANCELLED") {
      toast.error("Appointment is already cancelled");
      return;
    }
    if (status === "COMPLETED" && currentStatus === "COMPLETED") {
      toast.error("Appointment is already completed");
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
      } else if (action.payload) {
        toast.error(action.payload);
      }
    });
  };

  return (
    <section className="dashboard-section py-5">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">स्वागत है, {user?.name || "Doctor"}</h2>
            <p className="text-muted mb-0">
              अपॉइंटमेंट प्रबंधन, प्रिस्क्रिप्शन अपडेट और मरीजों की देखभाल को सुचारू रखें। नमन
              हॉस्पिटल में आपका योगदान हमारे मरीजों की उम्मीद है।
            </p>
          </div>
          <div className="stats-card text-end">
            <span className="display-6 fw-bold text-primary d-block">
              {doctorAppointments.length}
            </span>
            <small className="text-muted">आगामी अपॉइंटमेंट</small>
          </div>
        </div>

        {loading && <Spinner label="Loading appointments..." />}
        {!loading && doctorAppointments.length === 0 && (
          <div className="alert alert-light border text-center">
            अभी कोई अपॉइंटमेंट निर्धारित नहीं है। मरीजों की बुकिंग यहाँ दिखेगी।
          </div>
        )}

        <div className="row g-4">
          {doctorAppointments.map(appointment => (
            <div className="col-md-6 col-lg-4" key={appointment.id || appointment._id || appointment.trackingId}>
              <AppointmentCard
                appointment={appointment}
                onAction={handleAppointmentAction}
                view="doctor"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorDashboard;

