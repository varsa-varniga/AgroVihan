import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from 'firebaseConfig'; 
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

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
    <Button
      onClick={handleGoogleLogin}
      fullWidth
      variant="outlined"
      startIcon={<GoogleIcon />}
      sx={{
        textTransform: 'none',
        borderColor: '#ccc',
        color: '#333',
        '&:hover': {
          borderColor: '#888',
          bgcolor: '#f9f9f9',
        },
      }}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleLogin;
