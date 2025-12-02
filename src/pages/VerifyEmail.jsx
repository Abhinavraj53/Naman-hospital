import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearError, clearVerification, verifyEmail } from "../store/authSlice";

const VerifyEmail = () => {
  const [manualToken, setManualToken] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, verificationMessage } = useSelector(state => state.auth);
  const emailParam = searchParams.get("email");
  useEffect(() => {
    if (verificationMessage) {
      toast.success(verificationMessage);
      dispatch(clearVerification());
      navigate("/login", { replace: true });
    }
  }, [verificationMessage, dispatch, navigate]);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    return () => {
      dispatch(clearError());
    };
  }, [error, dispatch]);

  const handleSubmit = event => {
    event.preventDefault();
    if (!manualToken.trim()) {
      toast.error("Please enter a verification token");
      return;
    }
    dispatch(verifyEmail(manualToken));
  };

  return (
    <section className="auth-section py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow border-0">
              <div className="card-body p-4 p-md-5 text-center">
                <h3 className="mb-3">Verify your email</h3>
                <p className="text-muted mb-3">
                  {loading
                    ? "Verifying your account..."
                    : "Click the link we sent to your inbox or paste the verification code below."}
                </p>
                {emailParam && (
                  <div className="alert alert-info" role="alert">
                    Verification link has been sent to <strong>{emailParam}</strong>. Please check your inbox and spam
                    folder.
                  </div>
                )}
                <form className="d-grid gap-3" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder="Enter verification token"
                    value={manualToken}
                    onChange={event => setManualToken(event.target.value)}
                  />
                  <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? "Verifying..." : "Verify Email"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;

