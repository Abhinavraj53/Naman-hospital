import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogPosts } from "../store/blogSlice";
import Spinner from "../components/shared/Spinner";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import AdminLayout from "../components/admin/AdminLayout";

const AdminBlog = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const renderPosts = () => {
    if (loading) {
      return <Spinner label="Loading blog posts..." />;
    }
    if (posts.length === 0) {
      return (
        <div className="admin-empty-state">
          <strong>No blog posts found</strong>
          <p className="mb-0">Create your first update to keep patients informed.</p>
        </div>
      );
    }
    return (
      <div className="row g-4">
        {posts.map(post => (
          <div className="col-md-6 col-lg-4" key={post.id || post._id}>
            <div className="card border-0 shadow-sm h-100">
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <span className="badge bg-primary mb-2">{post.category}</span>
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text text-muted small flex-grow-1">{post.excerpt?.slice(0, 100)}...</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <small className="text-muted">
                    <FaEye className="me-1" />
                    {post.views || 0} views
                  </small>
                  <div className="d-flex gap-2">
                    <Link to={`/admin/blog/edit/${post.id || post._id}`} className="btn btn-sm btn-outline-primary">
                      <FaEdit />
                    </Link>
                    <button className="btn btn-sm btn-outline-danger">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout
      title="Blog Management"
      subtitle="Share hospital news, community drives, and clinical updates."
      actions={
        <Link to="/admin/blog/create" className="btn btn-mediplus-primary">
          <FaPlus className="me-2" />
          Create New Post
        </Link>
      }
    >
      {renderPosts()}
    </AdminLayout>
  );
};

export default AdminBlog;

