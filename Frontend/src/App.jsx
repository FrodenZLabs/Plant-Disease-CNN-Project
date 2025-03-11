import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import NavbarPage from "./components/NavbarPage";
import FooterPage from "./components/FooterPage";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavbarPage />
      <Routes>
        <Route path="" element={<LandingPage />} />
      </Routes>
      <FooterPage />
    </BrowserRouter>
  );
}
