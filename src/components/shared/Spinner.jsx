const Spinner = ({ label = "Loading..." }) => (
  <div className="d-flex flex-column align-items-center justify-content-center py-5">
    <div className="spinner-border text-primary mb-3" role="status" aria-hidden />
    <span className="text-muted">{label}</span>
  </div>
);

export default Spinner;

