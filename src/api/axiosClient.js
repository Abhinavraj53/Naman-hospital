import axios from "axios";

const inferBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  if (typeof window !== "undefined") {
    const host = window.location.origin;
    if (host.includes("namanhospital.dailyorganicsstore.com")) {
      return "https://naman-hospital-backend.onrender.com/api";
    }
  }

  return "http://localhost:5001/api";
};

const axiosClient = axios.create({
  baseURL: inferBaseUrl(),
  withCredentials: true
});

axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  response => response.data,
  error => {
    // Preserve error structure for proper error handling
    if (error.response) {
      // Server responded with error
      return Promise.reject({
        response: {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers
        }
      });
    } else if (error.request) {
      // Request was made but no response received
      const errorMessage = error.code === 'ECONNREFUSED' 
        ? "Backend server is not running. Please start the server on port 5001."
        : error.message || "Network error. Please check your connection.";
      return Promise.reject({
        response: {
          data: { message: errorMessage }
        }
      });
    } else {
      // Something else happened
      return Promise.reject({
        response: {
          data: { message: error.message || "An unexpected error occurred" }
        }
      });
    }
  }
);

export default axiosClient;

