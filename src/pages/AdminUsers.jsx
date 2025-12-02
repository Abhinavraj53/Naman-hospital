import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchAllUsers } from "../store/adminSlice";
import Spinner from "../components/shared/Spinner";
import { FaEdit, FaTrash, FaUser, FaUserMd, FaUserShield } from "react-icons/fa";
import adminApi from "../api/adminApi";
import AdminLayout from "../components/admin/AdminLayout";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.admin);
  const [filter, setFilter] = useState("all");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "PATIENT",
    phone: "",
    isActive: true,
    password: ""
  });

  useEffect(() => {
    dispatch(fetchAllUsers({ role: filter !== "all" ? filter : undefined }));
  }, [dispatch, filter]);

  const getId = user => user.id || user._id;

  const getRoleIcon = role => {
    switch (role) {
      case "DOCTOR":
        return <FaUserMd className="text-primary" />;
      case "ADMIN":
        return <FaUserShield className="text-danger" />;
      default:
        return <FaUser className="text-success" />;
    }
  };

  const getRoleBadge = role => {
    const colors = {
      PATIENT: "success",
      DOCTOR: "primary",
      ADMIN: "danger"
    };
    return <span className={`badge bg-${colors[role] || "secondary"}`}>{role}</span>;
  };

  const startEdit = user => {
    setEditingUser(user);
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "PATIENT",
      phone: user.phone || "",
      isActive: user.isActive !== false,
      password: ""
    });
  };

  const handleEditChange = event => {
    const { name, value, type, checked } = event.target;
    setEditForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const submitEdit = async event => {
    event.preventDefault();
    if (!editingUser) return;
    try {
      const payload = { ...editForm };
      if (!payload.password) {
        delete payload.password;
      }
      await adminApi.updateUser(getId(editingUser), payload);
      toast.success("User updated successfully");
      setEditingUser(null);
      setEditForm({ name: "", email: "", role: "PATIENT", phone: "", isActive: true, password: "" });
      dispatch(fetchAllUsers({ role: filter !== "all" ? filter : undefined }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update user");
    }
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditForm({ name: "", email: "", role: "PATIENT", phone: "", isActive: true, password: "" });
  };

  const handleDelete = async user => {
    if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) {
      return;
    }
    try {
      await adminApi.deleteUser(getId(user));
      toast.success("User deleted");
      dispatch(fetchAllUsers({ role: filter !== "all" ? filter : undefined }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete user");
    }
  };

  return (
    <AdminLayout
      title="User Management"
      subtitle="Govern every role, roster, and credential from a single surface."
      actions={
        <div className="d-flex gap-2 flex-wrap">
          <select className="form-select" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Users</option>
            <option value="PATIENT">Patients</option>
            <option value="DOCTOR">Doctors</option>
            <option value="ADMIN">Admins</option>
          </select>
          <Link to="/admin/users/add" className="btn btn-mediplus-primary">
            Add User
          </Link>
        </div>
      }
    >
      {editingUser && (
        <div className="admin-form-card">
          <h5 className="mb-3">Editing {editingUser.name}</h5>
          <form className="row g-3" onSubmit={submitEdit}>
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select className="form-select" name="role" value={editForm.role} onChange={handleEditChange}>
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" name="phone" value={editForm.phone} onChange={handleEditChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Temporary Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={editForm.password}
                onChange={handleEditChange}
                placeholder="Leave blank to keep"
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={editForm.isActive}
                  onChange={handleEditChange}
                />
                <label className="form-check-label" htmlFor="isActive">
                  Active account
                </label>
              </div>
            </div>
            <div className="col-12 d-flex gap-2 justify-content-end">
              <button className="btn btn-mediplus-primary" type="submit">
                Save Changes
              </button>
              <button className="btn btn-outline-secondary" type="button" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && <Spinner label="Loading users..." />}

      {!loading && (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={getId(user)}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {getRoleIcon(user.role)}
                          <span className="fw-semibold">{user.name}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone || "-"}</td>
                      <td>{getRoleBadge(user.role)}</td>
                      <td>
                        <span className={`badge ${user.isActive ? "bg-success" : "bg-secondary"}`}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(user)}>
                            <FaEdit />
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(user)}>
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
