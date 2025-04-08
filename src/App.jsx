import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoogleLogin from "./Authentication/GoogleLogin.jsx";
import Navbar from "./Components/Navbar.jsx";
import Login from './Authentication/Login.jsx';
import AboutUs from './pages/AboutUs.jsx';
import HeroPage from './pages/Heropage.jsx';
import './index.css';
import Footer from './Components/Footer.jsx';
import Welcome from './pages/Welcome.jsx';
import WeatherDashboard from './Weatherpredict/WeatherDashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/feature" element={<Welcome />} />
        <WeatherDashboard/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;