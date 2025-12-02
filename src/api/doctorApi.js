import axiosClient from "./axiosClient";

const mockDoctors = [
  {
    id: "mock-1",
    name: "Dr. N.K. Suman",
    specialty: "Medicine",
    hospital: "Naman Hospital, Darbhanga",
    rating: 4.9,
    reviewCount: 284,
    tags: ["Medicine", "Critical Care"],
    photoUrl: "/mediplus-images/doc-1.jpg",
    experience: 15,
    consultationFee: 650,
    bio: "Internal medicine lead with a focus on complex chronic care.",
    addressLine1: "OPD Block A",
    addressLine2: "Darbhanga"
  },
  {
    id: "mock-2",
    name: "Dr. Neelam Mishra",
    specialty: "Chest Disease",
    hospital: "Naman Hospital, Darbhanga",
    rating: 4.8,
    reviewCount: 198,
    tags: ["Pulmonology", "Asthma"],
    photoUrl: "/mediplus-images/doc-2.jpg",
    experience: 11,
    consultationFee: 700,
    bio: "Pulmonologist managing asthma, COPD, and emergency airway cases.",
    addressLine1: "Respiratory sciences",
    addressLine2: "Level 3"
  },
  {
    id: "mock-3",
    name: "Dr. Rashmi Jha",
    specialty: "Gynaecology & Obstetrics",
    hospital: "Naman Hospital, Darbhanga",
    rating: 5,
    reviewCount: 156,
    tags: ["Maternity", "Women's Health"],
    photoUrl: "/mediplus-images/doc-3.jpg",
    experience: 12,
    consultationFee: 900,
    bio: "High-risk pregnancy specialist championing respectful birthing.",
    addressLine1: "Mother & Child Centre",
    addressLine2: "Darbhanga"
  },
  {
    id: "mock-4",
    name: "Dr. Rajeev Thakur",
    specialty: "Orthopedics",
    hospital: "Naman Hospital, Darbhanga",
    rating: 4.7,
    reviewCount: 173,
    tags: ["Bone & Joint", "Sports Injury"],
    photoUrl: "/mediplus-images/doc-4.jpg",
    experience: 14,
    consultationFee: 750,
    bio: "Orthopedic surgeon for complex trauma and advanced joint replacements.",
    addressLine1: "Trauma bay",
    addressLine2: "Level 1"
  }
];

const doctorApi = {
  async getFeatured() {
    try {
      return await axiosClient.get("/doctors/featured");
    } catch (error) {
      return { doctors: mockDoctors };
    }
  },
  async getAll() {
    try {
      return await axiosClient.get("/doctors");
    } catch (error) {
      return { doctors: mockDoctors };
    }
  },
  updateProfile: payload => axiosClient.put("/doctors/profile", payload),
  uploadPhoto: payload => axiosClient.post("/doctors/upload", payload)
};

export default doctorApi;

