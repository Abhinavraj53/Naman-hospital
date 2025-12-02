import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearTrackedAppointment, trackAppointment } from "../store/appointmentSlice";
import AppointmentCard from "../components/shared/AppointmentCard";
import Spinner from "../components/shared/Spinner";
import { fetchAllDoctors } from "../store/doctorSlice";
import { Link } from "react-router-dom";
import appointmentApi from "../api/appointmentApi";
import paymentApi from "../api/paymentApi";

const AppointmentTracking = () => {
  const {
    register: registerTracking,
    handleSubmit: handleTrackSubmit,
    reset: resetTracking
  } = useForm();
  const {
    register: registerBooking,
    handleSubmit: handleBookingSubmit,
    reset: resetBooking,
    watch: watchBooking
  } = useForm();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { trackedAppointment, loading, error } = useSelector(state => state.appointments);
  const { allDoctors, loading: doctorsLoading } = useSelector(state => state.doctors);
  const [activeTab, setActiveTab] = useState("book");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [pendingPaymentOrder, setPendingPaymentOrder] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(null);

  const selectedDoctor = watchBooking("doctorId");
  const selectedDate = watchBooking("date");
  const paymentMethod = watchBooking("paymentMethod") || "online";

  const selectedDoctorDetails = useMemo(() => {
    if (!selectedDoctor) return null;
    return (
      allDoctors.find(doc => {
        const candidateId =
          doc._id || doc.id || doc.userId?._id || (typeof doc.userId === "string" ? doc.userId : null);
        return candidateId?.toString() === selectedDoctor;
      }) || null
    );
  }, [selectedDoctor, allDoctors]);

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

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

  useEffect(() => {
    const doctorId = selectedDoctor;
    const date = selectedDate;
    if (!doctorId || !date || !user) {
      setAvailableSlots([]);
      setSlotsError(null);
      return;
    }
    const fetchSlots = async () => {
      setSlotsLoading(true);
      setSlotsError(null);
      try {
        const response = await appointmentApi.getAvailability(doctorId, date);
        const slots = Array.isArray(response.slots) ? response.slots : [];
        setAvailableSlots(slots);
        if (slots.length === 0 || !slots.some(slot => slot.available)) {
          toast.error("All slots are booked for the selected date. Please choose another day.");
        }
      } catch (err) {
        const message = err?.response?.data?.message || "Unable to fetch available slots";
        setAvailableSlots([]);
        setSlotsError(message);
        toast.error(message);
      } finally {
        setSlotsLoading(false);
      }
    };
    fetchSlots();
  }, [selectedDoctor, selectedDate, user]);

  const submitTracking = data => {
    if (!data.trackingId.trim()) {
      toast.error("Enter a tracking ID");
      return;
    }
    dispatch(trackAppointment(data.trackingId));
    resetTracking();
  };

  const submitBooking = async data => {
    if (!user) {
      toast.error("Please login to book an appointment");
      return;
    }
    if (!data.doctorId) {
      toast.error("Select a doctor");
      return;
    }
    if (!data.timeSlot) {
      toast.error("Select an available time slot");
      return;
    }
    if (!data.paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    const slotIsAvailable = availableSlots.find(slot => slot.value === data.timeSlot && slot.available);
    if (!slotIsAvailable) {
      toast.error("Selected slot is no longer available. Please choose another slot.");
      return;
    }
    try {
      setBookingLoading(true);
      const bookingPayload = {
        doctorId: data.doctorId,
        date: data.date,
        timeSlot: data.timeSlot,
        notes: data.notes
      };

      if (data.paymentMethod === "cod") {
        // Handle COD booking
        const result = await paymentApi.createCODOrder(bookingPayload);
        toast.success(result.message || "Appointment confirmed! Please bring cash payment when you arrive.");
        resetBooking();
        setAvailableSlots(prev =>
          prev.map(slot => (slot.value === data.timeSlot ? { ...slot, available: false } : slot))
        );
        // Clear any pending payment order
        setPendingPaymentOrder(null);
      } else {
        // Handle online payment
        const order = await paymentApi.createCashfreeOrder(bookingPayload);
        const paymentWindow = window.open(order.paymentLink, "_blank", "noopener,noreferrer");
        if (!paymentWindow) {
          window.location.href = order.paymentLink;
        }
        toast.success("Complete the Cashfree payment to confirm your appointment.");
        setPendingPaymentOrder({
          orderId: order.orderId,
          amount: order.amount,
          currency: order.currency || "INR",
          doctorName: order.doctor?.name || "Selected doctor"
        });
        resetBooking();
        setAvailableSlots(prev =>
          prev.map(slot => (slot.value === data.timeSlot ? { ...slot, available: false } : slot))
        );
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Unable to book appointment");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="booking-hero mb-4">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <div>
              <p className="text-uppercase small mb-2">Hospital access desk</p>
              <h1 className="mb-2">Plan your next consultation with confidence</h1>
              <p className="mb-0">
                Book directly with Naman Hospital or track existing visits. Slots sync with doctor rosters,
                diagnostics, and billing so every touchpoint is predictable.
              </p>
            </div>
            <div className="notes-card bg-white text-dark">
              <strong className="d-block mb-1">What to keep handy</strong>
              <ul className="mb-0 small ps-3">
                <li>Preferred doctor / speciality</li>
                <li>Recent reports for quick triage</li>
                <li>Tracking ID for follow ups</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mb-4">
          <div className="booking-tabs">
            <button className={activeTab === "book" ? "active" : ""} type="button" onClick={() => setActiveTab("book")}>
              Book appointment
            </button>
            <button className={activeTab === "track" ? "active" : ""} type="button" onClick={() => setActiveTab("track")}>
              Track appointment
            </button>
          </div>
        </div>

        {activeTab === "book" && (
          <div className="booking-grid mb-4">
            <div className="booking-card">
              <h3 className="mb-3">Book an appointment</h3>
              {!user ? (
                <div className="alert alert-warning">
                  Please <Link to="/login">login</Link> or <Link to="/register">create an account</Link> to book an appointment.
                </div>
              ) : (
                <form className="row g-3" onSubmit={handleBookingSubmit(submitBooking)}>
                  <div className="col-md-6">
                    <label className="form-label">Select Doctor</label>
                    <select className="form-select" {...registerBooking("doctorId")} required>
                      <option value="">Choose doctor</option>
                      {doctorsLoading ? (
                        <option>Loading...</option>
                      ) : allDoctors.length === 0 ? (
                        <option value="">No doctors available</option>
                      ) : (
                        allDoctors.map(doc => {
                          const doctorDocId = (
                            doc._id ||
                            doc.id ||
                            doc.userId?._id ||
                            (typeof doc.userId === "string" ? doc.userId : null)
                          )?.toString();

                          if (!doctorDocId) {
                            return null;
                          }
                          return (
                            <option key={doctorDocId} value={doctorDocId}>
                              {doc.name} – {doc.specialty}
                            </option>
                          );
                        })
                      )}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" {...registerBooking("date")} required />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Available slot</label>
                    <select
                      className="form-select"
                      {...registerBooking("timeSlot")}
                      disabled={!selectedDoctor || !selectedDate || slotsLoading || availableSlots.length === 0}
                      required
                    >
                      <option value="">
                        {slotsLoading
                          ? "Checking slots..."
                          : availableSlots.length === 0
                          ? "No slots available"
                          : "Select slot"}
                      </option>
                      {availableSlots.map(slot => (
                        <option key={slot.value} value={slot.value} disabled={!slot.available}>
                          {slot.label} {slot.available ? "" : "(Booked)"}
                        </option>
                      ))}
                    </select>
                    {slotsError && <small className="text-danger">{slotsError}</small>}
                  </div>
                  {selectedDoctorDetails && (
                    <div className="col-12">
                      <div className="alert alert-info mb-0">
                        Consultation fee for <strong>{selectedDoctorDetails.name}</strong> is{" "}
                        <strong>₹{selectedDoctorDetails.consultationFee || 500}</strong>.
                      </div>
                    </div>
                  )}
                  <div className="col-12">
                    <label className="form-label">Payment Method</label>
                    <select className="form-select" {...registerBooking("paymentMethod")} required defaultValue="online">
                      <option value="online">Online Payment (Pay Now)</option>
                      <option value="cod">Cash on Delivery (Pay at Hospital)</option>
                    </select>
                    <small className="text-muted">
                      {paymentMethod === "cod" 
                        ? "You will pay the consultation fee in cash when you arrive at the hospital."
                        : "Payment will be processed securely through Cashfree payment gateway."}
                    </small>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Notes / Reason</label>
                    <textarea className="form-control" rows="3" {...registerBooking("notes")} />
                  </div>
                  <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-mediplus-primary" type="submit" disabled={bookingLoading}>
                      {bookingLoading 
                        ? (paymentMethod === "cod" ? "Confirming appointment..." : "Redirecting to payment...")
                        : (paymentMethod === "cod" ? "Confirm Appointment (COD)" : "Pay & Confirm Appointment")}
                    </button>
                  </div>
                </form>
              )}
            </div>
            <aside className="booking-sidebar">
              <div className="sidebar-card">
                <h5>Available doctors today</h5>
                <div className="availability-list">
                  {(allDoctors || [])
                    .slice(0, 3)
                    .map(doc => (
                      <div key={doc._id || doc.id} className="availability-item">
                        <span>{doc.name}</span>
                        <span className="time-chip">{doc.consultationFee ? `₹${doc.consultationFee}` : "₹500"}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="sidebar-card">
                <h5>Fast-track slots</h5>
                <div className="d-flex flex-wrap gap-2">
                  {["08:30 AM", "10:45 AM", "12:15 PM", "04:00 PM"].map(slot => (
                    <span key={slot} className="time-chip">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
              <div className="sidebar-card">
                <p className="mb-1 fw-semibold">Need urgent care?</p>
                <small className="text-muted d-block">Call our command center: +91 9234277007</small>
              </div>
            </aside>
          </div>
        )}

        {pendingPaymentOrder && (
          <div className="alert alert-info">
            Payment initiated for <strong>{pendingPaymentOrder.doctorName}</strong> (Amount:{" "}
            <strong>
              ₹{pendingPaymentOrder.amount} {pendingPaymentOrder.currency}
            </strong>
            ). Complete the payment in the opened tab. You can{" "}
            <Link to={`/payment-status?order_id=${pendingPaymentOrder.orderId}`}>check payment status</Link> anytime.
          </div>
        )}

        {activeTab === "track" && (
          <div className="booking-card">
            <h3 className="mb-3 text-center">Track appointment</h3>
            <p className="text-muted text-center mb-4">
              Enter the tracking ID from your confirmation email to view live updates on your appointment.
            </p>
            <form className="d-flex flex-column flex-sm-row gap-3" onSubmit={handleTrackSubmit(submitTracking)}>
              <input
                type="text"
                placeholder="Tracking ID (e.g. NAM-1234)"
                className="form-control"
                {...registerTracking("trackingId")}
              />
              <button className="btn btn-mediplus-primary" type="submit" disabled={loading}>
                {loading ? "Searching..." : "Track"}
              </button>
            </form>
            {loading && <Spinner label="Fetching appointment..." />}
            {trackedAppointment && (
              <div className="mt-4">
                <AppointmentCard appointment={trackedAppointment} view="track" />
              </div>
            )}
            {!loading && !trackedAppointment && !error && (
              <p className="text-muted small mt-4 text-center">
                Have your tracking ID ready. It usually starts with <strong>NAM-</strong>.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AppointmentTracking;
