import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctors } from "../store/doctorSlice";
import DoctorCard from "../components/shared/DoctorCard";
import Spinner from "../components/shared/Spinner";

const Doctors = () => {
  const dispatch = useDispatch();
  const { allDoctors, loading, error } = useSelector(state => state.doctors);

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-soft-primary text-primary fw-semibold text-uppercase">
            Meet Our Doctors
          </span>
          <h1 className="display-6 fw-bold mt-3">नामन हॉस्पिटल की अनुभवी विशेषज्ञ टीम</h1>
          <p className="text-muted lead">
            Dr. N.K. Suman के नेतृत्व में हमारी मल्टी-स्पेशियलिटी टीम—मेडिसिन, चेस्ट डिज़ीज़,
            स्त्री एवं शिशु रोग, सर्जरी, आर्थोपेडिक्स और प्लास्टिक सर्जरी में उत्कृष्ट सेवा
            प्रदान करती है।
          </p>
        </div>

        {loading && <Spinner label="Loading doctors..." />}
        {error && <p className="text-danger text-center">{error}</p>}

        {!loading && !error && (
          <div className="row g-4">
            {allDoctors.map(doctor => (
              <div className="col-sm-6 col-lg-3" key={doctor.id}>
                <DoctorCard doctor={doctor} />
              </div>
            ))}
            {allDoctors.length === 0 && (
              <div className="col-12 text-center text-muted">
                Profiles will appear here once doctors are onboarded.
              </div>
            )}
          </div>
        )}

        <div className="row g-4 mt-5">
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
              <h4 className="fw-semibold">Qualified & compassionate</h4>
              <p className="text-muted">
                एमबीबीएस, एमडी, एमएस और सुपर-स्पेशियलिटी डॉक्टर नियमित प्रशिक्षण और सतत चिकित्सा
                शिक्षा के साथ अद्यतन रहते हैं।
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
              <h4 className="fw-semibold">Continuing education</h4>
              <p className="text-muted">
                चिकित्सक एवं नर्सिंग स्टाफ वर्कशॉप, केस चर्चा और राष्ट्रीय सम्मेलनों में नियमित
                सहभागिता करते हैं।
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
              <h4 className="fw-semibold">Patient-first approach</h4>
              <p className="text-muted">
                मरीजों की भाषा और सांस्कृतिक आवश्यकताओं को समझते हुए हम स्पष्ट संवाद और परिवार-समर्थित
                निर्णयों पर ध्यान देते हैं।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;

