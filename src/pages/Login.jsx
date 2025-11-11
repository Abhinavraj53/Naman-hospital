import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { clearError, login } from "../store/authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    return () => {
      dispatch(clearError());
    };
  }, [error, dispatch]);

  useEffect(() => {
    if (user) {
      const redirect = location.state?.from?.pathname || (user.role === "DOCTOR" ? "/dashboard/doctor" : "/dashboard/patient");
      navigate(redirect, { replace: true });
      toast.success("Welcome back!");
    }
  }, [user, navigate, location.state]);

  const onSubmit = data => {
    dispatch(login(data));
  };

  return (
    <section className="auth-section py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow border-0">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 text-center">Sign in to DoctorOnCall</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="d-grid gap-3">
                  <div>
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="name@example.com" required {...register("email")} />
                  </div>
                  <div>
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="••••••••" required {...register("password")} />
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={loading || isSubmitting}>
                    {(loading || isSubmitting) ? "Signing in…" : "Login"}
                  </button>
                </form>
                <div className="d-flex justify-content-between mt-3">
                  <Link to="/forgot-password">Forgot password?</Link>
                  <Link to="/register">Create account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

