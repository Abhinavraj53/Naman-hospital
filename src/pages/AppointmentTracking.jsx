import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearTrackedAppointment, trackAppointment } from "../store/appointmentSlice";
import AppointmentCard from "../components/shared/AppointmentCard";
import Spinner from "../components/shared/Spinner";

const AppointmentTracking = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { trackedAppointment, loading, error } = useSelector(state => state.appointments);

  useEffect(() => {
    return () => {
      dispatch(clearTrackedAppointment());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = data => {
    if (!data.trackingId.trim()) {
      toast.error("कृपया सही ट्रैकिंग आईडी दर्ज करें।");
      return;
    }
    dispatch(trackAppointment(data.trackingId));
    reset();
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h2 className="mb-3 text-center">अपॉइंटमेंट ट्रैक करें</h2>
                <p className="text-muted text-center mb-4">
                  SMS या पंजीकरण स्लिप पर दिए गए ट्रैकिंग आईडी को दर्ज करें और अपने अपॉइंटमेंट की स्थिति
                  देखें।
                </p>
                <form className="d-flex flex-column flex-sm-row gap-3" onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    placeholder="Tracking ID (e.g. NAM-1234)"
                    className="form-control"
                    {...register("trackingId")}
                  />
                  <button className="btn btn-mediplus-primary" type="submit" disabled={loading}>
                    {loading ? "Searching…" : "Track"}
                  </button>
                </form>
                {loading && <Spinner label="Fetching appointment..." />}
                {trackedAppointment && (
                  <div className="mt-4">
                    <AppointmentCard appointment={trackedAppointment} />
                  </div>
                )}
                {!loading && !trackedAppointment && !error && (
                  <p className="text-muted small mt-4 text-center">
                    कृपया अपना ट्रैकिंग आईडी सुरक्षित रखें। यह सामान्यतः <strong>NAM-</strong> से शुरू होता है।
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentTracking;

