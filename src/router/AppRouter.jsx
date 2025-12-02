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
import ResetPassword from "../pages/ResetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import DoctorDashboard from "../pages/DoctorDashboard";
import PatientDashboard from "../pages/PatientDashboard";
import AppointmentTracking from "../pages/AppointmentTracking";
import BlogListing from "../pages/BlogListing";
import BlogDetails from "../pages/BlogDetails";
import AdminDashboard from "../pages/AdminDashboard";
import AdminUsers from "../pages/AdminUsers";
import AdminAddUser from "../pages/AdminAddUser";
import AdminAppointments from "../pages/AdminAppointments";
import AdminDoctors from "../pages/AdminDoctors";
import AdminDoctorCreate from "../pages/AdminDoctorCreate";
import AdminBlog from "../pages/AdminBlog";
import AdminBlogCreate from "../pages/AdminBlogCreate";
import AdminContacts from "../pages/AdminContacts";
import NotFound from "../pages/NotFound";
import PaymentStatus from "../pages/PaymentStatus";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import RefundPolicy from "../pages/RefundPolicy";

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
    <Route path="/reset-password" element={<ResetPassword />} />
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
    <Route
      path="/payment-status"
      element={
        <ProtectedRoute role="PATIENT">
          <PaymentStatus />
        </ProtectedRoute>
      }
    />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/refund-policy" element={<RefundPolicy />} />
    <Route path="/blog" element={<BlogListing />} />
    <Route path="/blog/:slug" element={<BlogDetails />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminUsers />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users/add"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminAddUser />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/doctors"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminDoctors />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/doctors/add"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminDoctorCreate />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/appointments"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminAppointments />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/blog"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminBlog />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/blog/create"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminBlogCreate />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/contacts"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminContacts />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;

