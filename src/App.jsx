import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GoogleLogin from "./Authentication/GoogleLogin.jsx";
import Navbar from "./Components/Navbar.jsx";
import Login from "./Authentication/Login.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import HeroPage from "./pages/Heropage.jsx";
import "./index.css";
import Footer from "./Components/Footer.jsx";
import Welcome from "./pages/Welcome.jsx";
import Sidebar from "./pages/Sidebar.jsx";
import { useState, useEffect } from "react";

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
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
              <HeroPage />
              <Welcome />
              <AboutUs />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/google-login"
          element={<GoogleLogin onLogin={handleLogin} />}
        />

        {/* Protected routes */}
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
