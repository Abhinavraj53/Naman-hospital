import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import adminApi from "../api/adminApi";
import AdminLayout from "../components/admin/AdminLayout";

const AdminBlogCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "Hospital News",
    coverImage: "",
    excerpt: "",
    content: "",
    isPublished: true
  });
  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await adminApi.createBlog(formData);
      toast.success("Blog post published");
      navigate("/admin/blog");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      title="Create blog post"
      subtitle="Craft patient stories, research updates, and hospital advisories."
    >
      <div className="admin-form-card">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
              <option value="Hospital News">Hospital News</option>
              <option value="Health Tips">Health Tips</option>
              <option value="Women & Child Care">Women & Child Care</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Cover Image URL</label>
            <input
              type="text"
              className="form-control"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>
          <div className="col-12">
            <label className="form-label">Excerpt</label>
            <textarea
              className="form-control"
              rows="2"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Content (HTML allowed)</label>
            <textarea
              className="form-control"
              rows="6"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="isPublished"
                id="publish"
                checked={formData.isPublished}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="publish">
                Publish immediately
              </label>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-mediplus-primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogCreate;
