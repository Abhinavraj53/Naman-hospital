import axiosClient from "./axiosClient";

const mockAppointments = [
  {
    id: "apt-1",
    trackingId: "NAM-2415",
    patientName: "Ankit Kumar",
    doctorSpecialty: "Medicine",
    date: new Date().toISOString(),
    timeSlot: "10:00 AM - 10:30 AM",
    status: "CONFIRMED",
    notes: "डॉ. एन.के. सुमन के साथ शुगर और बीपी फॉलो-अप।"
  },
  {
    id: "apt-2",
    trackingId: "NAM-2416",
    patientName: "Shalini Mishra",
    doctorSpecialty: "Obstetrics & Gynaecology",
    date: new Date(Date.now() + 86400000).toISOString(),
    timeSlot: "02:00 PM - 02:20 PM",
    status: "PENDING",
    notes: "एन्टीनेटल चेकअप और अल्ट्रासाउंड रिपोर्ट चर्चा।"
  },
  {
    id: "apt-3",
    trackingId: "NAM-2318",
    patientName: "Rohan Thakur",
    doctorSpecialty: "Orthopedics",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    timeSlot: "11:30 AM - 11:50 AM",
    status: "COMPLETED",
    notes: "फ्रैक्चर फॉलो-अप और फिजियोथेरेपी प्रगति समीक्षा।"
  }
];

const appointmentApi = {
  async getDoctorAppointments() {
    try {
      return await axiosClient.get("/appointments/doctor");
    } catch (error) {
      return { appointments: mockAppointments };
    }
  },
  async getPatientAppointments() {
    try {
      return await axiosClient.get("/appointments/patient");
    } catch (error) {
      return { appointments: mockAppointments };
    }
  },
  getAvailability: (doctorId, date) =>
    axiosClient.get("/appointments/availability", { params: { doctorId, date } }),
  updateStatus: (id, status) => axiosClient.patch(`/appointments/${id}`, { status }),
  async trackAppointment(trackingId) {
    try {
      return await axiosClient.get(`/appointments/track/${trackingId}`);
    } catch (error) {
      const appointment = mockAppointments.find(item => item.trackingId === trackingId);
      if (appointment) {
        return { appointment };
      }
      throw error;
    }
  }
};

export default appointmentApi;

