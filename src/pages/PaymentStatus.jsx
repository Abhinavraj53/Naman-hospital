import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import paymentApi from "../api/paymentApi";
import Spinner from "../components/shared/Spinner";

const statusCopy = {
  PENDING: {
    badge: "warning",
    title: "Waiting for confirmation",
    message: "We are waiting for the payment gateway to confirm your transaction. This usually takes a few seconds."
  },
  PAID: {
    badge: "success",
    title: "Payment successful",
    message: "Your payment has been received and the appointment is confirmed."
  },
  FAILED: {
    badge: "danger",
    title: "Payment failed",
    message: "The transaction was declined or cancelled. Please try booking again."
  },
  EXPIRED: {
    badge: "secondary",
    title: "Payment expired",
    message: "The payment session timed out before completion. Start a new booking to try again."
  }
};

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id") || searchParams.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldPoll, setShouldPoll] = useState(false);

  const statusMeta = useMemo(() => {
    if (!order?.status) return null;
    return statusCopy[order.status] || {
      badge: "info",
      title: order.status,
      message: "Status received from payment gateway."
    };
  }, [order]);

  const fetchStatus = useCallback(
    async (silent = false) => {
      if (!orderId) return;
      try {
        if (!silent) {
          setLoading(true);
          setError(null);
        }
        const response = await paymentApi.getOrderStatus(orderId);
        const fetchedOrder = response.order;
        setOrder(fetchedOrder);

        const status = fetchedOrder.status;
        if (status === "PAID") {
          setShouldPoll(false);
          if (!silent) {
            toast.success("Payment confirmed. Appointment generated.");
          }
        } else if (status === "FAILED" || status === "EXPIRED") {
          setShouldPoll(false);
          if (!silent) {
            toast.error("Payment was not completed.");
          }
        } else {
          setShouldPoll(true);
        }
      } catch (err) {
        const message = err?.response?.data?.message || "Unable to fetch payment status right now.";
        setError(message);
        setShouldPoll(false);
        if (!silent) {
          toast.error(message);
        }
      } finally {
        if (!silent) {
          setLoading(false);
        }
      }
    },
    [orderId]
  );

  useEffect(() => {
    if (!orderId) return;
    fetchStatus();
  }, [orderId, fetchStatus]);

  useEffect(() => {
    if (!orderId || !shouldPoll) {
      return undefined;
    }
    const interval = setInterval(() => fetchStatus(true), 5000);
    return () => clearInterval(interval);
  }, [orderId, shouldPoll, fetchStatus]);

  if (!orderId) {
    return (
      <section className="py-5 bg-light">
        <div className="container">
          <div className="booking-card">
            <h2 className="mb-3">Payment status</h2>
            <div className="alert alert-warning mb-0">Missing order information. Please use the link from your email.</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="booking-card">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
            <div>
              <p className="text-uppercase small mb-1">Payment tracking</p>
              <h2 className="mb-0">Order #{orderId}</h2>
            </div>
            {statusMeta && (
              <span className={`badge bg-${statusMeta.badge} fs-6 px-3 py-2 text-uppercase`}>
                {order?.status || "PENDING"}
              </span>
            )}
          </div>

          {statusMeta && (
            <div className="mb-4">
              <h5>{statusMeta.title}</h5>
              <p className="text-muted mb-0">{statusMeta.message}</p>
            </div>
          )}

          {loading && (
            <div className="mb-4">
              <Spinner label="Syncing with Cashfree..." />
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {order && (
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="status-card p-3 border rounded">
                  <small className="text-muted d-block">Doctor</small>
                  <strong>{order.doctor?.name || "—"}</strong>
                  <p className="mb-0 text-muted">{order.doctor?.specialty}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="status-card p-3 border rounded">
                  <small className="text-muted d-block">Amount</small>
                  <strong>
                    ₹{order.amount} {order.currency}
                  </strong>
                  <p className="mb-0 text-muted">Paid online</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="status-card p-3 border rounded">
                  <small className="text-muted d-block">Latest status</small>
                  <strong>{order.status}</strong>
                  <p className="mb-0 text-muted">
                    {order.appointment
                      ? `Tracking ID ${order.appointment.trackingId}`
                      : "Appointment will be issued after payment confirmation"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {order?.appointment && (
            <div className="alert alert-success">
              Appointment confirmed! Tracking ID: <strong>{order.appointment.trackingId}</strong>.{" "}
              <Link to={`/track-appointment`}>View appointment timeline</Link>.
            </div>
          )}

          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-mediplus-primary" type="button" onClick={() => fetchStatus()} disabled={loading}>
              Refresh status
            </button>
            <Link className="btn btn-outline-secondary" to="/track-appointment">
              Go to tracking
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentStatus;


