import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: "#ffffff", color: "#000" }} elevation={1}>
      <Box sx={{ px: 4 }}>
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "#000" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            AgroVihan
          </Typography>
          <Box>
            <Button sx={{ color: "#000" }} onClick={() => navigate("/")}>
              Home
            </Button>
            <Button sx={{ color: "#000" }} onClick={() => navigate("/about")}>
              About
            </Button>
            <Button sx={{ color: "#000" }} onClick={() => navigate("/features")}>
              Features
            </Button>
            <Button
              onClick={() => navigate("/login")}
              sx={{
                bgcolor: "#000",
                color: "#fff",
                ml: 2,
                "&:hover": { bgcolor: "#333" },
              }}
            >
              Login / Signup
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
