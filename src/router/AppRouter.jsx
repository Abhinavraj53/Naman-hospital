import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Doctors from "../pages/Doctors";
import Pricing from "../pages/Pricing";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyEmail from "../pages/VerifyEmail";
import DoctorDashboard from "../pages/DoctorDashboard";
import PatientDashboard from "../pages/PatientDashboard";
import AppointmentTracking from "../pages/AppointmentTracking";
import BlogListing from "../pages/BlogListing";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/shared/ProtectedRoute";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/doctors" element={<Doctors />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/verify-email" element={<VerifyEmail />} />
    <Route
      path="/dashboard/doctor"
      element={
        <ProtectedRoute role="DOCTOR">
          <DoctorDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/patient"
      element={
        <ProtectedRoute role="PATIENT">
          <PatientDashboard />
        </ProtectedRoute>
      }
    />
    <Route path="/track-appointment" element={<AppointmentTracking />} />
    <Route path="/blog" element={<BlogListing />} />
    <Route path="/blog/:slug" element={<BlogDetails />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;

