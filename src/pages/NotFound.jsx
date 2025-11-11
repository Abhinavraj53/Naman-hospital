import { Link } from "react-router-dom";

const NotFound = () => (
  <section className="py-5">
    <div className="container text-center">
      <h1 className="display-3 fw-bold text-primary mb-3">404</h1>
      <h2 className="h4 mb-3">We couldn’t find that page</h2>
      <p className="text-muted mb-4">
        The page you’re looking for may have moved or no longer exists. Let’s get you back on track.
      </p>
      <Link to="/" className="btn btn-primary">
        Return home
      </Link>
    </div>
  </section>
);

export default NotFound;

