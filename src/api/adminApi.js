import axiosClient from "./axiosClient";

const adminApi = {
  getStats: () => axiosClient.get("/admin/stats"),
  getAllUsers: (params) => axiosClient.get("/admin/users", { params }),
  getAllAppointments: (params) => axiosClient.get("/admin/appointments", { params }),
  getRevenue: (params) => axiosClient.get("/admin/revenue", { params }),
  getAnalytics: () => axiosClient.get("/admin/analytics"),
  getContacts: (params) => axiosClient.get("/contact", { params }),
  createUser: (payload) => axiosClient.post("/admin/users", payload),
  updateUser: (id, payload) => axiosClient.put(`/admin/users/${id}`, payload),
  deleteUser: (id) => axiosClient.delete(`/admin/users/${id}`),
  getDoctors: () => axiosClient.get("/doctors"),
  updateDoctor: (id, payload) => axiosClient.put(`/doctors/${id}`, payload),
  createBlog: (payload) => axiosClient.post("/blog", payload)
};

export default adminApi;

