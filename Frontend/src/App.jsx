import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import NavbarPage from "./components/NavbarPage";
import FooterPage from "./components/FooterPage";
import UploadPage from "./pages/UploadPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavbarPage />
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/upload-image" element={<UploadPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
      <FooterPage />
    </BrowserRouter>
  );
}
