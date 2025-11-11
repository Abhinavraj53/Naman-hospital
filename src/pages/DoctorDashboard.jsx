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
    const result = dispatch(updateAppointmentStatus({ id: appointment.id, status }));
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
            <div className="col-md-6 col-lg-4" key={appointment.id}>
              <AppointmentCard
                appointment={appointment}
                onAction={handleAppointmentAction}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorDashboard;

