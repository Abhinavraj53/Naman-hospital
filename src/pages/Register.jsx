import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearError, register as registerUser } from "../store/authSlice";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      toast.success("Account created successfully!");
      navigate("/verify-email", { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = data => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
      })
    );
  };

  return (
    <section className="auth-section py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow border-0">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 text-center">Create your DoctorOnCall account</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="d-grid gap-3">
                  <div>
                    <label className="form-label">Full name</label>
                    <input type="text" className="form-control" placeholder="Dr. Jane Smith" required {...register("name")} />
                  </div>
                  <div>
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="name@example.com" required {...register("email")} />
                  </div>
                  <div>
                    <label className="form-label">Account type</label>
                    <select className="form-select" {...register("role")} defaultValue="PATIENT">
                      <option value="PATIENT">Patient</option>
                      <option value="DOCTOR">Doctor</option>
                    </select>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Password</label>
                      <input type="password" className="form-control" placeholder="••••••••" required {...register("password")} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Confirm password</label>
                      <input type="password" className="form-control" placeholder="••••••••" required {...register("confirmPassword")} />
                    </div>
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={loading || isSubmitting}>
                    {(loading || isSubmitting) ? "Creating account…" : "Sign Up"}
                  </button>
                </form>
                <div className="text-center mt-3">
                  Already have an account? <Link to="/login">Log in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

