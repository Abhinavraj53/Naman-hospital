import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { clearError, resetPassword } from "../store/authSlice";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const tokenFromQuery = searchParams.get("token") || "";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      token: tokenFromQuery
    }
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (tokenFromQuery) {
      setValue("token", tokenFromQuery);
    }
  }, [tokenFromQuery, setValue]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    return () => {
      dispatch(clearError());
    };
  }, [error, dispatch]);

  const onSubmit = async data => {
    if (!data.token.trim()) {
      toast.error("Verification token is required.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const resultAction = await dispatch(
      resetPassword({
        token: data.token.trim(),
        password: data.password
      })
    );
    if (resetPassword.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload || "Password reset successful. Please log in with your new password.");
      navigate("/login", { replace: true });
    }
  };

  return (
    <section className="auth-section py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow border-0">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-3 text-center">Set a new password</h3>
                <p className="text-muted text-center mb-4">
                  Paste the reset token from your email and choose a new password.
                </p>
                <form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label className="form-label">Reset token</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter reset token"
                      {...register("token")}
                    />
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">New password</label>
                      <input type="password" className="form-control" required {...register("password")} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Confirm password</label>
                      <input type="password" className="form-control" required {...register("confirmPassword")} />
                    </div>
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={loading || isSubmitting}>
                    {(loading || isSubmitting) ? "Updating…" : "Reset Password"}
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

export default ResetPassword;

