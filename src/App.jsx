import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GoogleLogin from "./Authentication/GoogleLogin.jsx";
import Navbar from "./Components/Navbar.jsx";
import Login from './Authentication/Login.jsx';
import AboutUs from './pages/AboutUs.jsx';
import HeroPage from './pages/Heropage.jsx';
import Footer from './Components/Footer.jsx';
import Welcome from './pages/Welcome.jsx';
import WeatherDashboard from './Weatherpredict/WeatherDashboard.jsx';
import Sidebar from './Components/Sidebar.jsx'; // Add your Sidebar path

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HeroPage />} />
        <Route path="/feature" element={<Welcome />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/google-login" element={<GoogleLogin onLogin={handleLogin} />} />

        {/* Protected Route */}
        <Route
          path="/dashboard/*"
          element={
            isLoggedIn ? (
              <Sidebar onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Weather Route (Optional) */}
        <Route path="/weather" element={<WeatherDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
