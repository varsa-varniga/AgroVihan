import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoogleLogin from "./Authentication/GoogleLogin.jsx";
import Navbar from "./Components/Navbar.jsx";
import Login from './Authentication/Login.jsx';
import AboutUs from './pages/AboutUs.jsx'
import HeroPage from './pages/Heropage.jsx';
import './index.css'; // ✅ THIS is correct
import Footer from './Components/Footer.jsx';
import Welcome from './pages/Welcome.jsx'



function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        {/* Add more routes if needed */}
      </Routes>
      <HeroPage/>
      <Welcome/>
      <AboutUs/>
      <Footer/>

      
    </BrowserRouter>
  );
}

export default App;
