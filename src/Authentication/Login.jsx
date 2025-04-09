import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
<<<<<<< HEAD
  Paper,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Login_Bg.jpg';
import sideImage from '../assets/Login_SideCard.jpg';
import GoogleLogin from '../Authentication/GoogleLogin';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
=======
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../Authentication/GoogleLogin";

export default function SignIn({ onLogin }) {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // You can add authentication logic here
    onLogin(); // this updates App state
    navigate("/dashboard"); // this redirects
>>>>>>> fedf46b685f54671eacf78f6a75558652b3f8c4d
  };

  return (
    <Box
      sx={{
<<<<<<< HEAD
        minHeight: '100vh',
        position: 'relative',
        px: 2,
        overflow: 'hidden',
      }}
    >
      {/* Blurred Background Layer */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px)',
          zIndex: 0,
        }}
      />

      {/* Foreground Content */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            maxWidth: 800,
            borderRadius: 3,
            boxShadow: 6,
            overflow: 'hidden',
            bgcolor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Left: Image Card */}
          <Box
            sx={{
              width: '50%',
              backgroundImage: `url(${sideImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Right: Green Form Card with White Text */}
          <Box
            component={Paper}
            elevation={0}
            sx={{
              width: '50%',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              bgcolor: 'green',
              color: 'white',
            }}
          >
            <Typography variant="h5" fontWeight="bold" align="center" mb={2}>
              Welcome Back
            </Typography>

            <Typography
              align="center"
              mb={3}
              sx={{ fontSize: '1.1rem', color: 'white' }}
            >
              Please sign in to your account
            </Typography>

            <TextField
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                mb: 2,
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: '#eee' },
                },
                '& .MuiInputLabel-root': { color: 'white' },
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                mb: 2,
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: '#eee' },
                },
                '& .MuiInputLabel-root': { color: 'white' },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSignIn}
              sx={{
                textTransform: 'none',
                bgcolor: '#ffffff',
                color: 'green',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#e0e0e0' },
                mb: 2,
              }}
            >
              Sign In
            </Button>

            {/* Styled Divider */}
            <Divider
              sx={{
                my: 2,
                color: 'white',
                '&::before, &::after': {
                  borderColor: 'white',
                },
              }}
            >
              or
            </Divider>

            <GoogleLogin />

            <Typography variant="body2" align="center" mt={3}>
              Don’t have an account?{' '}
              <Button
                onClick={() => navigate('/signup')}
                size="small"
                sx={{ color: 'white', textTransform: 'none' }}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
=======
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: 350,
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} align="center">
          Sign In
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={<Checkbox size="small" />}
          label="I agree to the terms and conditions"
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ bgcolor: "#4a148c", textTransform: "none", mb: 2 }}
          onClick={handleSignIn}
        >
          Sign In
        </Button>

        <Divider sx={{ my: 2 }}>or</Divider>

        <Box sx={{ mt: 2 }}>
          <GoogleLogin onLogin={onLogin} />
>>>>>>> fedf46b685f54671eacf78f6a75558652b3f8c4d
        </Box>
      </Box>
    </Box>
  );
<<<<<<< HEAD
};

export default SignIn;
=======
}
>>>>>>> fedf46b685f54671eacf78f6a75558652b3f8c4d
