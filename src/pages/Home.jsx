import Hero from "../components/layout/Hero";
import ServicesGrid from "../components/home/ServicesGrid";
import AppointmentTeaser from "../components/home/AppointmentTeaser";
import FeaturedDoctors from "../components/home/FeaturedDoctors";
import Testimonials from "../components/home/Testimonials";
import BlogPreview from "../components/home/BlogPreview";
import CTASection from "../components/layout/CTASection";
import ContactSection from "../components/home/ContactSection";

const Home = () => (
  <>
    <Hero />
    <ServicesGrid />
    <AppointmentTeaser />
    <FeaturedDoctors />
    <Testimonials />
    <BlogPreview />
    <CTASection />
    <ContactSection />
  </>
);

export default Home;

