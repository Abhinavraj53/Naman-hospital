import axiosClient from "./axiosClient";

const authApi = {
  login: payload => axiosClient.post("/auth/login", payload),
  register: payload => axiosClient.post("/auth/register", payload),
  requestPasswordReset: payload => axiosClient.post("/auth/forgot-password", payload),
  verifyEmail: token => axiosClient.post("/auth/verify-email", { token }),
  logout: () => axiosClient.post("/auth/logout")
};

export default authApi;

