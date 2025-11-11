import { FaStar, FaStethoscope } from "react-icons/fa";

const DoctorCard = ({ doctor }) => (
  <div className="card doctor-card h-100 border-0">
    <div className="card-body text-center p-4 d-flex flex-column align-items-center">
      <div className="doctor-avatar mb-3">
        <img
          src={doctor.photoUrl || "https://placehold.co/200x200?text=Doctor"}
          alt={doctor.name}
          className="rounded-circle"
          width={128}
          height={128}
          style={{ objectFit: "cover" }}
        />
      </div>
      <h5 className="card-title mb-1">{doctor.name}</h5>
      <p className="text-primary fw-semibold mb-1">{doctor.specialty}</p>
      <p className="text-muted small mb-3">{doctor.hospital}</p>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <FaStar className="text-warning" />
        <span className="fw-semibold">{doctor.rating?.toFixed(1) ?? "5.0"}</span>
        <span className="text-muted small">({doctor.reviewCount ?? "120"} reviews)</span>
      </div>
      <div className="d-flex justify-content-center gap-2 flex-wrap">
        {doctor.tags?.map(tag => (
          <span className="badge" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div className="card-footer bg-transparent border-0 pb-4 text-center">
      <button className="btn btn-mediplus-primary btn-sm px-4">
        <FaStethoscope className="me-2" />
        Book Now
      </button>
    </div>
  </div>
);

export default DoctorCard;

