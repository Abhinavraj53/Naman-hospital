import axiosClient from "./axiosClient";

const mockDoctors = [
  {
    id: "mock-1",
    name: "Dr. N.K. Suman",
    specialty: "Senior Consultant – Medicine",
    hospital: "Naman Hospital, Darbhanga",
    rating: 4.9,
    reviewCount: 284,
    tags: ["Medicine", "Critical Care"],
    photoUrl: "/mediplus-images/doc-1.jpg"
  },
  {
    id: "mock-2",
    name: "Dr. Neelam Mishra",
    specialty: "Chest & Respiratory Diseases",
    hospital: "Naman Hospital, Darbhanga",
    rating: 4.8,
    reviewCount: 198,
    tags: ["Pulmonology", "Asthma"],
    photoUrl: "/mediplus-images/doc-2.jpg"
  },
  {
    id: "mock-3",
    name: "Dr. Rashmi Jha",
    specialty: "Obstetrics & Gynaecology",
    hospital: "Naman Hospital, Darbhanga",
    rating: 5,
    reviewCount: 156,
    tags: ["Maternity", "Women's Health"],
    photoUrl: "/mediplus-images/doc-3.jpg"
  },
  {
    id: "mock-4",
    name: "Dr. Rajeev Thakur",
    specialty: "Orthopedics & Trauma",
    hospital: "Naman Hospital, Darbhanga",
    rating: 4.7,
    reviewCount: 173,
    tags: ["Bone & Joint", "Sports Injury"],
    photoUrl: "/mediplus-images/doc-4.jpg"
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
  updateProfile: payload => axiosClient.put("/doctors/profile", payload)
};

export default doctorApi;

