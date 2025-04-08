import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoogleLogin from "./Authentication/GoogleLogin.jsx";
import Navbar from "./Components/Navbar.jsx";
import Login from './Authentication/Login.jsx';
import MapPage from './regionalhub/MapPage.jsx'; // ✅ NEW



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        {/* Add more routes if needed */}
        <Route path="/regional-hubs" element={<MapPage />} />

      </Routes>
      <MapPage/>

      
    </BrowserRouter>
  );
}

export default App;
