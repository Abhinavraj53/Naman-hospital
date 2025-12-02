import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchAllDoctors } from "../store/doctorSlice";
import adminApi from "../api/adminApi";
import AdminLayout from "../components/admin/AdminLayout";
import Spinner from "../components/shared/Spinner";

const AdminDoctors = () => {
  const dispatch = useDispatch();
  const { allDoctors, loading } = useSelector(state => state.doctors);

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  const handleToggleFeatured = async doctor => {
    try {
      await adminApi.updateDoctor(doctor.id || doctor._id, {
        isFeatured: !doctor.isFeatured
      });
      toast.success(`Doctor ${!doctor.isFeatured ? "added to" : "removed from"} featured list`);
      dispatch(fetchAllDoctors());
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update doctor");
    }
  };

  const renderDoctors = () => {
    if (loading) {
      return <Spinner label="Loading doctors..." />;
    }
    if (allDoctors.length === 0) {
      return (
        <div className="admin-empty-state">
          <strong>No doctors found</strong>
          <p className="mb-0">Onboard your first specialist using the Add Doctor form.</p>
        </div>
      );
    }
    return (
      <div className="doctor-admin-grid">
        {allDoctors.map(doctor => (
          <article className="doctor-admin-card" key={doctor.id || doctor._id}>
            <header>
              <img src={doctor.photoUrl || "/mediplus-images/doc-1.jpg"} alt={doctor.name} />
              <div>
                <h5>{doctor.name}</h5>
                <span>{doctor.specialty}</span>
                <div className="doctor-meta">
                  {doctor.experience > 0 && <span>{doctor.experience} yrs exp.</span>}
                  {doctor.hospital && <span>{doctor.hospital}</span>}
                </div>
              </div>
              <div className="fee-tag">
                ₹{doctor.consultationFee || 0}
                <small className="d-block text-muted" style={{ fontSize: "0.7rem" }}>
                  per visit
                </small>
              </div>
            </header>
            <p className="text-muted mb-1">{doctor.bio || "No bio shared yet."}</p>
            <div className="d-flex flex-wrap gap-2">
              {(doctor.tags || []).map(tag => (
                <span className="tag-chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <footer>
              <span className={`badge ${doctor.isFeatured ? "bg-success" : "bg-secondary"}`}>
                {doctor.isFeatured ? "Featured" : "Hidden"}
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleToggleFeatured(doctor)}
              >
                {doctor.isFeatured ? "Remove highlight" : "Make featured"}
              </button>
            </footer>
          </article>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout
      title="Doctors roster"
      subtitle="Control coverage, visibility, and onboarding for every speciality."
      actions={
        <div className="d-flex gap-2 flex-wrap">
          <Link to="/admin/doctors/add" className="btn btn-mediplus-primary">
            Add doctor
          </Link>
          <Link to="/admin/users/add" className="btn btn-outline-primary">
            Add user
          </Link>
        </div>
      }
    >
      {renderDoctors()}
    </AdminLayout>
  );
};

export default AdminDoctors;
