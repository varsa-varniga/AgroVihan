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
  
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Tooltip,
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

// Components
import ClimateAIForecast from "./sidebar/ClimateAIForecast";
import PlantDoctor from "./sidebar/PlantDoctor";
import MultilingualAgriBot from "./sidebar/MultilingualAgriBot";
import RegionalResourceHubs from "./sidebar/RegionalResourceHubs";
import CarbonCreditMonetization from "./sidebar/CarbonCreditMonetization";
import DashboardHome from "./sidebar/DashboardHome";
import MapPage from "../regionalhub/MapPage";

const expandedWidth = 240;
const collapsedWidth = 60;

function Sidebar({ onLogout, userEmail }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "Climate AI Forecast", path: "/dashboard/climate-forecast", icon: <Cloud /> },
    { text: "Plant Doctor", path: "/dashboard/plant-doctor", icon: <LocalFlorist /> },
    { text: "Multilingual AgriBot", path: "/dashboard/agri-bot", icon: <Translate /> },
    { text: "Regional Resource Hubs", path: "/dashboard/resource-hubs", icon: <Public /> },
    { text: "Carbon Credit Monetization", path: "/dashboard/carbon-credit", icon: <MonetizationOn /> },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
      <Typography variant="h6" noWrap fontWeight="bold">
  {isSidebarCollapsed ? "🌿" : "Agrovihan"}
</Typography>

        <IconButton onClick={toggleSidebar} size="small" sx={{ color: "#2e7d32" }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <Tooltip
            key={item.text}
            title={isSidebarCollapsed ? item.text : ""}
            placement="right"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#2e7d32",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 500,
                },
              },
            }}
          >
            <ListItem
              button
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#C8E6C9",
                  "&:hover": { backgroundColor: "#A5D6A7" },
                },
                "&:hover": {
                  backgroundColor: "#DCEDC8",
                },
                justifyContent: isSidebarCollapsed ? "center" : "flex-start",
                borderRadius: 2,
                mx: 1,
                my: 0.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: isSidebarCollapsed ? 0 : 2, color: "#2e7d32" }}>
                {item.icon}
              </ListItemIcon>
              {!isSidebarCollapsed && <ListItemText primary={item.text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
      <Divider />
      {!isSidebarCollapsed && userEmail && (
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Logged in as:
          </Typography>
          <Typography variant="subtitle2">{userEmail}</Typography>
        </Box>
      )}
      <List>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            justifyContent: isSidebarCollapsed ? "center" : "flex-start",
            borderRadius: 2,
            mx: 1,
            my: 0.5,
            "&:hover": {
              backgroundColor: "#FFEBEE",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: isSidebarCollapsed ? 0 : 2, color: "#d32f2f" }}>
            <Logout />
          </ListItemIcon>
          {!isSidebarCollapsed && <ListItemText primary="Logout" />}
        </ListItem>
      </List>
    </div>
  );

  const drawerWidth = isSidebarCollapsed ? collapsedWidth : expandedWidth;

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
 
      {/* Navigation Drawers */}
      <Box component="nav" sx={{ width: drawerWidth, flexShrink: { sm: 0 } }}>
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#E8F5E9",
              color: "#1b5e20",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "#fff",
          minHeight: "100vh",
          borderRadius: "0 16px 16px 0",
        }}
      >
        <Toolbar />
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
