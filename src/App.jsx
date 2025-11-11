import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <main>
        <AppRouter />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;

