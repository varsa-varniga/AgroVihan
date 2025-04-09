import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
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
  };

  return (
    <Box
      sx={{
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
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
