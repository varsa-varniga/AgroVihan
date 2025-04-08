import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoogleLogin from "./Authentication/GoogleLogin.jsx";
import Navbar from "./Components/Navbar.jsx";
import Login from './Authentication/Login.jsx';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        {/* Add more routes if needed */}
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
