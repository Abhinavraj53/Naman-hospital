import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "../components/admin/AdminLayout";
import adminApi from "../api/adminApi";
import doctorApi from "../api/doctorApi";

const specialties = [
  "Medicine",
  "Chest Disease",
  "Skin Disease",
  "Gynaecology & Obstetrics",
  "Pediatrics",
  "General Surgery",
  "Orthopedics",
  "Plastic Surgery",
  "General Physician",
  "ENT",
  "Ophthalmology",
  "Psychiatry"
];

const experienceOptions = [1, 3, 5, 7, 10, 12, 15, 20, 25];
const feePresets = [200, 300, 400, 500, 800];

const AdminDoctorCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialty: specialties[0],
    experience: "",
    fees: "",
    education: "",
    address1: "",
    address2: "",
    about: ""
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const fileToBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      let uploadedPhoto = "";
      if (photoFile) {
        const base64 = await fileToBase64(photoFile);
        const uploadResponse = await doctorApi.uploadPhoto({ file: base64 });
        uploadedPhoto = uploadResponse.url;
      }

      const educationList = formData.education
        ? formData.education
            .split(/\n|,/)
            .map(entry => entry.trim())
            .filter(Boolean)
        : [];

      await adminApi.createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "DOCTOR",
        phone: formData.phone,
        specialty: formData.specialty,
        hospital: formData.address1 || "नमन हॉस्पिटल दरभंगा (Naman Hospital, Darbhanga)",
        photoUrl: uploadedPhoto,
        experience: formData.experience ? Number(formData.experience) : 0,
        bio: formData.about,
        consultationFee: formData.fees ? Number(formData.fees) : undefined,
        addressLine1: formData.address1,
        addressLine2: formData.address2,
        education: educationList,
        tags: [formData.specialty]
      });

      toast.success("Doctor profile created");
      navigate("/admin/doctors");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      title="Add doctor"
      subtitle="Onboard a specialist, capture credentials, and publish instantly."
    >
      <div className="admin-form-card">
        <form className="row g-4" onSubmit={handleSubmit}>
          <div className="col-lg-4">
            <div className="photo-upload">
              {photoPreview ? (
                <img src={photoPreview} alt={formData.name || "Doctor"} />
              ) : (
                <img src="/mediplus-images/doc-1.jpg" alt="Placeholder doctor" />
              )}
              <p className="mb-3 text-muted small">
                Upload a square photo for best listing quality (max 2MB).
              </p>
              <label className="upload-label">
                Upload photo
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
              </label>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="doctor-form-grid">
              <div>
                <label className="form-label">Doctor name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="form-label">Speciality</label>
                <select
                  className="form-select"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                >
                  {specialties.map(speciality => (
                    <option key={speciality} value={speciality}>
                      {speciality}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Doctor email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="form-label">Doctor password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  minLength={6}
                  required
                />
              </div>
              <div>
                <label className="form-label">Phone number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="form-label">Experience</label>
                <select
                  className="form-select"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select years</option>
                  {experienceOptions.map(year => (
                    <option key={year} value={year}>
                      {year}+ yrs
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Consultation fees (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  name="fees"
                  value={formData.fees}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="Enter custom amount"
                />
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {feePresets.map(amount => (
                    <button
                      type="button"
                      key={amount}
                      className={`btn btn-sm ${
                        Number(formData.fees) === amount ? "btn-mediplus-primary" : "btn-outline-secondary"
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, fees: amount.toString() }))}
                    >
                      ₹{amount}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`btn btn-sm ${formData.fees === "" ? "btn-mediplus-primary" : "btn-outline-secondary"}`}
                    onClick={() => setFormData(prev => ({ ...prev, fees: "" }))}
                  >
                    Custom
                  </button>
                </div>
              </div>
              <div>
                <label className="form-label">Education</label>
                <textarea
                  className="form-control"
                  rows="2"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="e.g. MBBS - AIIMS, 2012"
                />
              </div>
              <div>
                <label className="form-label">Address line 1</label>
                <input
                  type="text"
                  className="form-control"
                  name="address1"
                  value={formData.address1}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="form-label">Address line 2</label>
                <input
                  type="text"
                  className="form-control"
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="form-label">About doctor</label>
              <textarea
                className="form-control"
                rows="4"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Write about the doctor's expertise, awards, and care philosophy."
              />
            </div>
            <div className="mt-4 d-flex justify-content-end">
              <button className="btn btn-mediplus-primary px-4" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Add doctor"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminDoctorCreate;

