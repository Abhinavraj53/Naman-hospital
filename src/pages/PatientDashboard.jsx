import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { fetchPatientAppointments } from "../store/appointmentSlice";
import AppointmentCard from "../components/shared/AppointmentCard";
import Spinner from "../components/shared/Spinner";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const { patientAppointments, loading, error } = useSelector(state => state.appointments);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchPatientAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const upcoming = patientAppointments.filter(appt => ["PENDING", "CONFIRMED"].includes(appt.status));
  const past = patientAppointments.filter(appt => ["COMPLETED", "CANCELLED"].includes(appt.status));

  return (
    <section className="dashboard-section py-5">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">नमस्ते {user?.name || "मित्र"} 👋</h2>
            <p className="text-muted mb-0">
              अपने अपॉइंटमेंट, प्रिस्क्रिप्शन और बिलिंग अपडेट यहाँ देखें। नामन हॉस्पिटल आपके स्वास्थ्य
              की सतत निगरानी में साथ है।
            </p>
          </div>
          <Link to="/track-appointment" className="btn btn-mediplus-primary">
            नया अपॉइंटमेंट बुक करें
          </Link>
        </div>

        {loading && <Spinner label="Loading your appointments..." />}
        {!loading && patientAppointments.length === 0 && (
          <div className="alert alert-light border text-center">
            अभी कोई अपॉइंटमेंट दर्ज नहीं है।{" "}
            <Link to="/track-appointment" className="fw-semibold">
              पहला अपॉइंटमेंट बुक करें
            </Link>
            .
          </div>
        )}

        {upcoming.length > 0 && (
          <div className="mb-5">
            <h4 className="mb-3">आगामी अपॉइंटमेंट</h4>
            <div className="row g-4">
              {upcoming.map(appointment => (
                <div className="col-md-6 col-lg-4" key={appointment.id || appointment._id || appointment.trackingId}>
                  <AppointmentCard appointment={appointment} view="patient" />
                </div>
              ))}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div>
            <h4 className="mb-3">पूर्व अपॉइंटमेंट</h4>
            <div className="row g-4">
              {past.map(appointment => (
                <div className="col-md-6 col-lg-4" key={appointment.id || appointment._id || appointment.trackingId}>
                  <AppointmentCard appointment={appointment} view="patient" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PatientDashboard;

