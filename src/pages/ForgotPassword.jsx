import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearError, requestPasswordReset } from "../store/authSlice";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    return () => {
      dispatch(clearError());
    };
  }, [error, dispatch]);

  const onSubmit = async data => {
    const resultAction = await dispatch(requestPasswordReset(data));
    if (requestPasswordReset.fulfilled.match(resultAction)) {
      toast.success("Password reset link sent to your email.");
    }
  };

  return (
    <section className="auth-section py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow border-0">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 text-center">Reset your password</h3>
                <p className="text-muted text-center mb-4">
                  Enter the email associated with your account and we'll send a secure reset link.
                </p>
                <form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="name@example.com" required {...register("email")} />
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={loading || isSubmitting}>
                    {(loading || isSubmitting) ? "Sending link…" : "Send reset link"}
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

export default ForgotPassword;

