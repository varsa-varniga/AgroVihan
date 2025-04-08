import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout,
  Dashboard as DashboardIcon,
  Cloud,
  LocalFlorist,
  Translate,
  Public,
  MonetizationOn,
} from "@mui/icons-material";
import { useState } from "react";

// Import or create these components for each section
import ClimateAIForecast from "./sidebar/ClimateAIForecast";
import PlantDoctor from "./sidebar/PlantDoctor";
import MultilingualAgriBot from "./sidebar/MultilingualAgriBot";
import RegionalResourceHubs from "./sidebar/RegionalResourceHubs";
import CarbonCreditMonetization from "./sidebar/CarbonCreditMonetization";
import DashboardHome from "./sidebar/DashboardHome";
import MapPage from "../regionalhub/MapPage";

const drawerWidth = 240;

function Sidebar({ onLogout, userEmail }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    {
      text: "Climate AI Forecast",
      path: "/dashboard/climate-forecast",
      icon: <Cloud />,
    },
    {
      text: "Plant Doctor",
      path: "/dashboard/plant-doctor",
      icon: <LocalFlorist />,
    },
    {
      text: "Multilingual AgriBot",
      path: "/dashboard/agri-bot",
      icon: <Translate />,
    },
    {
      text: "Regional Resource Hubs",
      path: "/dashboard/resource-hubs",
      icon: <Public />,
    },
    {
      text: "Carbon Credit Monetization",
      path: "/dashboard/carbon-credit",
      icon: <MonetizationOn />,
    },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          AgriTech Portal
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#e3f2fd",
                "&:hover": {
                  backgroundColor: "#bbdefb",
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* 👇 Show logged-in user email here */}
      {userEmail && (
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Logged in as:
          </Typography>
          <Typography variant="subtitle2">{userEmail}</Typography>
        </Box>
      )}
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="climate-forecast" element={<ClimateAIForecast />} />
          <Route path="plant-doctor" element={<PlantDoctor />} />
          <Route path="agri-bot" element={<MultilingualAgriBot />} />
          <Route path="resource-hubs" element={<MapPage />} />
          <Route path="carbon-credit" element={<CarbonCreditMonetization />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Sidebar;
