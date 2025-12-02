import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogPosts } from "../store/blogSlice";
import Spinner from "../components/shared/Spinner";

const BlogListing = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="mb-3">Medical insights & platform updates</h1>
          <p className="text-muted">
            Stay informed with health guidance, product releases, and stories from the Naman Hospital community.
          </p>
        </div>

        {loading && <Spinner label="Loading articles..." />}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && !error && (
          <div className="row g-4">
            {posts.map(post => (
              <div className="col-md-6 col-lg-4" key={post.id}>
                <article className="card h-100 border-0 shadow-sm">
                  {post.coverImage && (
                    <img src={post.coverImage} className="card-img-top" alt={post.title} />
                  )}
                  <div className="card-body d-flex flex-column">
                    <span className="text-primary fw-semibold small text-uppercase mb-2">
                      {post.category}
                    </span>
                    <h4 className="card-title">{post.title}</h4>
                    <p className="text-muted flex-grow-1">
                      {post.excerpt?.slice(0, 160) || "Read more on the article page."}
                    </p>
                    <Link to={`/blog/${post.slug}`} className="stretched-link fw-semibold">
                      Read more
                    </Link>
                  </div>
                </article>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="col-12 text-center text-muted">
                Articles will appear here when published.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogListing;

