import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from 'firebaseConfig'; 

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      alert(`Welcome ${user.displayName}`);
      // Optional: redirect or store user info
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-100 to-lime-200">
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-200"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
