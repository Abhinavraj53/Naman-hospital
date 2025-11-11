import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchBlogPost, clearSelectedPost } from "../store/blogSlice";
import Spinner from "../components/shared/Spinner";

const BlogDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { selectedPost, loading, error } = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogPost(slug));
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch, slug]);

  if (loading) {
    return (
      <section className="py-5">
        <div className="container">
          <Spinner label="Loading article..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <p className="text-danger">{error}</p>
          <Link to="/blog" className="btn btn-primary mt-3">
            Back to blog
          </Link>
        </div>
      </section>
    );
  }

  if (!selectedPost) {
    return null;
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="mb-4">
          <Link to="/blog" className="btn btn-outline-primary">
            Back to blog
          </Link>
        </div>
        <article className="card border-0 shadow-sm">
          {selectedPost.coverImage && (
            <img src={selectedPost.coverImage} className="card-img-top" alt={selectedPost.title} />
          )}
          <div className="card-body p-4 p-md-5">
            <span className="text-primary fw-semibold small text-uppercase mb-2 d-block">
              {selectedPost.category}
            </span>
            <h1 className="mb-3">{selectedPost.title}</h1>
            <div className="text-muted mb-4 d-flex flex-wrap gap-3">
              <span>By {selectedPost.author || "DoctorOnCall Team"}</span>
              <span>{new Date(selectedPost.publishedAt || Date.now()).toLocaleDateString()}</span>
            </div>
            <div
              className="blog-content text-muted"
              dangerouslySetInnerHTML={{ __html: selectedPost.content || "<p>Content coming soon.</p>" }}
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogDetails;

