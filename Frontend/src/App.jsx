import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./pages/authentication/Register";
import LoginPage from "./pages/authentication/Login";
import FooterSection from "./components/FooterSection";
import NavbarSection from "./components/NavbarSection";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ServicePage from "./pages/ServicePage";
import PredictionPage from "./pages/prediction/PredictionPage";
import OnlyUserPrivateRoute from "./components/OnlyUserPrivateRoute";
import MyPredictionsPage from "./pages/prediction/MyPredictionsPage";
import PredictionDetailsPage from "./pages/prediction/PredictionDetailsPage";
import ProfilePage from "./pages/prediction/ProfilePage";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavbarSection />
      <Routes>
        <Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route element={<OnlyUserPrivateRoute />}>
            <Route path="/upload-image" element={<PredictionPage />} />
            <Route path="/my-predictions" element={<MyPredictionsPage />} />
            <Route
              path="/my-predictions/:id"
              element={<PredictionDetailsPage />}
            />
            <Route path="/get_profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
      <FooterSection />
    </BrowserRouter>
  );
};

export default App;
