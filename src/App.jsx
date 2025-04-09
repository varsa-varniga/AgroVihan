import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import GoogleLogin from "./Authentication/GoogleLogin.jsx";
import Login from './Authentication/Login.jsx';
import AboutUs from './pages/AboutUs.jsx';
import HeroPage from './pages/Heropage.jsx';
<<<<<<< HEAD
import './index.css';
import Footer from './Components/Footer.jsx';
import Welcome from './pages/Welcome.jsx';
=======
import Welcome from './pages/Welcome.jsx';
<<<<<<< HEAD
import WeatherData from "./Test/WeatherData.jsx";
=======
import WeatherDashboard from './Weatherpredict/WeatherDashboard.jsx';
>>>>>>> fedf46b685f54671eacf78f6a75558652b3f8c4d

// Dashboard (Protected) Layout
>>>>>>> 88a0ebd5ff0f44e42f2c1e8a8af5283b6c6ffd65
import Sidebar from './pages/Sidebar.jsx';

import Layout from './Components/Layout.jsx'; // Newly added

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
<<<<<<< HEAD
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/features" element={<Welcome />} />
      </Routes>
      <Footer /> {/* ✅ Correctly placed outside <Routes> */}
=======
      <Routes>
        {/* Layout for public routes */}
        <Route element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
          <Route path="/" element={<HeroPage />} />
          <Route path="/features" element={<Welcome />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/google-login" element={<GoogleLogin onLogin={handleLogin} />} />
          
        </Route>
        
        {/* Protected route */}
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
<<<<<<< HEAD
=======
      <WeeklyForecast/>
      <TodayOverview/>
      <WeatherCard/>
>>>>>>> fedf46b685f54671eacf78f6a75558652b3f8c4d
>>>>>>> 88a0ebd5ff0f44e42f2c1e8a8af5283b6c6ffd65
    </BrowserRouter>
  );
}

export default App;
