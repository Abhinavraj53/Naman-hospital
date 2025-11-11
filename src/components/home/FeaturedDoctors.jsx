import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../shared/SectionTitle";
import DoctorCard from "../shared/DoctorCard";
import Spinner from "../shared/Spinner";
import { fetchFeaturedDoctors } from "../../store/doctorSlice";

const FeaturedDoctors = () => {
  const dispatch = useDispatch();
  const { featured, loading, error } = useSelector(state => state.doctors);

  useEffect(() => {
    dispatch(fetchFeaturedDoctors());
  }, [dispatch]);

  return (
    <section className="ftco-section" id="doctors">
      <div className="container">
        <SectionTitle
          eyebrow="Our Doctors"
          title="Experienced specialists led by Dr. N.K. Suman"
          description="Our multidisciplinary team brings years of clinical expertise to Darbhanga—delivering compassionate care across medicine, surgery, orthopedics, paediatrics, and women’s health."
        />
        {loading && <Spinner label="Loading doctors..." />}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && !error && (
          <div className="row g-4">
            {featured.slice(0, 4).map(doctor => (
              <div className="col-md-6 col-lg-3" key={doctor.id}>
                <DoctorCard doctor={doctor} />
              </div>
            ))}
            {featured.length === 0 && (
              <div className="col-12 text-center text-muted">
                Doctors will appear here once added to the system.
              </div>
            )}
          </div>
        )}
        <div className="text-center mt-4">
          <a href="/doctors" className="btn btn-mediplus-primary">
            Explore all doctors
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;

