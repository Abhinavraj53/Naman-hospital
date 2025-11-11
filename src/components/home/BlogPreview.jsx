import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../shared/SectionTitle";
import Spinner from "../shared/Spinner";
import { fetchBlogPosts } from "../../store/blogSlice";

const BlogPreview = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const previewPosts = posts.slice(0, 3);

  return (
    <section className="py-5">
      <div className="container">
        <SectionTitle
          eyebrow="Resources"
          title="Hospital updates & health tips"
          description="स्वास्थ्य जागरूकता, कैंप घोषणाएँ और नामन हॉस्पिटल की नवीनतम सेवाओं की जानकारी पढ़ें।"
        />
        {loading && <Spinner label="Loading blog posts..." />}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && !error && (
          <div className="row g-4">
            {previewPosts.map(post => (
              <div className="col-md-6 col-lg-4" key={post.id}>
                <div className="card h-100 border-0 shadow-sm blog-card">
                  {post.coverImage && (
                    <img src={post.coverImage} alt={post.title} className="card-img-top" />
                  )}
                  <div className="card-body d-flex flex-column">
                    <span className="text-primary fw-semibold small text-uppercase mb-2">
                      {post.category}
                    </span>
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text text-muted flex-grow-1">
                      {post.excerpt?.slice(0, 140) || "Read more about this topic on the blog."}
                    </p>
                    <Link to={`/blog/${post.slug}`} className="stretched-link fw-semibold">
                      Read Article
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {previewPosts.length === 0 && (
              <div className="col-12 text-center text-muted">
                Blog posts will appear here once published.
              </div>
            )}
          </div>
        )}
        <div className="text-center mt-4">
          <Link to="/blog" className="btn btn-mediplus-primary">
            View all stories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;

