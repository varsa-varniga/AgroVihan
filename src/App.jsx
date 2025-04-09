import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import GoogleLogin from "./Authentication/GoogleLogin.jsx";
import Login from './Authentication/Login.jsx';
import AboutUs from './pages/AboutUs.jsx';
import HeroPage from './pages/Heropage.jsx';
import Welcome from './pages/Welcome.jsx';
import WeatherData from "./Test/WeatherData.jsx";
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
    </BrowserRouter>
  );
}

export default App;
