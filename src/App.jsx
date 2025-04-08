import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Public Components
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import GoogleLogin from "./Authentication/GoogleLogin.jsx";
import Login from './Authentication/Login.jsx';
import AboutUs from './pages/AboutUs.jsx';
import HeroPage from './pages/Heropage.jsx';
import Welcome from './pages/Welcome.jsx';
import WeatherDashboard from './Weatherpredict/WeatherDashboard.jsx';

// Dashboard (Protected) Layout
import Sidebar from './pages/Sidebar.jsx';
import MapPage from "./regionalhub/MapPage.jsx";

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
      <Routes>

        {/* Public Routes with Navbar and Footer */}
        <Route
          path="/*"
          element={
            <>
              <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
              <Routes>
                <Route path="/" element={<HeroPage />} />
                <Route path="/features" element={<Welcome />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/google-login" element={<GoogleLogin onLogin={handleLogin} />} />
                <Route path="/weather" element={<WeatherDashboard />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* Protected Dashboard Layout - NO Navbar or Footer */}
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

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;