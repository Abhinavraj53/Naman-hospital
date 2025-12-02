import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import adminApi from "../api/adminApi";
import AdminLayout from "../components/admin/AdminLayout";

const AdminAddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT",
    phone: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await adminApi.createUser(formData);
      toast.success("User created successfully");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      title="Add platform user"
      subtitle="Invite admins, doctors, or patients with secure starter credentials."
    >
      <div className="admin-form-card">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Role</label>
            <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-mediplus-primary" type="submit" disabled={loading}>
              {loading ? "Creating user..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAddUser;
