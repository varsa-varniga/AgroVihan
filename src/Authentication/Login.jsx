import {
  Box,
  Button,
  TextField,
  Typography,
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
  };

  return (
    <Box
      sx={{
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
        </Box>
      </Box>
    </Box>
  );
}
