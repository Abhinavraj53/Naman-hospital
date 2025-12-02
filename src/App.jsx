import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={isAdminRoute ? "admin-main-wrapper" : ""}>
        <AppRouter />
      </main>
      {!isAdminRoute && <Footer />}
      <Toaster position="top-right" />
    </>
  );
}

export default App;

