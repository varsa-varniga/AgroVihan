import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ApplicationForm from "./ApplicationForm";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// Helper component to close popup
const ClosePopup = () => {
  const map = useMap();
  map.closePopup();
  return null;
};

const hubs = [
  {
    id: 1,
    name: "Erode",
    position: [11.34, 77.72],
    roles: ["🌾 Crop Advisor", "📦 Warehouse Manager"],
    youths: 15,
    description: "Agri-tech logistics hub",
  },
  {
    id: 2,
    name: "Madurai",
    position: [9.93, 78.12],
    roles: ["💻 Plant Health Officer", "🛠 Field Engineer"],
    youths: 12,
    description: "Smart farming zone",
  },
  {
    id: 3,
    name: "Salem",
    position: [11.6643, 78.146],
    roles: ["🧪 Soil Analyst", "🌱 Nursery Caretaker"],
    youths: 8,
    description: "Soil & nursery hotspot",
  },
];

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [30, 40],
});

const MapPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedHub, setSelectedHub] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [thankYou, setThankYou] = useState(false);

  const handleApply = (hub) => {
    const role = selectedRoles[hub.id];
    if (!role) {
      alert("Please select a role to apply.");
      return;
    }
    setSelectedHub({ ...hub, role });
    setOpenForm(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      await addDoc(collection(db, "applications"), data);
      setThankYou(true);
    } catch (error) {
      console.error("❌ Error submitting application:", error);
      alert("Something went wrong. Please try again.");
    }

    setOpenForm(false);
    setSelectedRoles({});
  };

  const handleRoleChange = (hubId, role) => {
    setSelectedRoles((prev) => ({ ...prev, [hubId]: role }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f5f5f5, #e8f5e9)",
        py: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
          mt: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontFamily: "Poppins, sans-serif",
            color: "#2e7d32",
            letterSpacing: "1px",
          }}
        >
          🌱 Regional Hubs & Youth Employment
        </Typography>
      </Box>

      <MapContainer
        center={[11.1271, 78.6569]}
        zoom={7}
        style={{
          height: "85vh",
          width: "100%",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {openForm && <ClosePopup />}

        {hubs.map((hub) => (
          <Marker key={hub.id} position={hub.position} icon={markerIcon}>
            <Popup minWidth={280} maxWidth={280}>
              <Box
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  backgroundColor: "#fefaf3",
                  overflow: "hidden",
                  border: "2px solid #c5e1a5",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <Box
                  sx={{
                    height: 10,
                    background: "linear-gradient(to right, #8bc34a, #689f38)",
                  }}
                />

                <Box sx={{ px: 2, py: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#4e7938", fontWeight: "bold", mb: 1 }}
                  >
                    📍 {hub.name}
                  </Typography>

                  <Typography variant="body2" sx={{ color: "#555", mb: 1 }}>
                    {hub.description}
                  </Typography>

                  <Chip
                    label={`👥 ${hub.youths} youths working`}
                    size="small"
                    sx={{
                      backgroundColor: "#e6f4ea",
                      color: "#33691e",
                      fontWeight: 500,
                      mb: 1,
                    }}
                  />

                  <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                    <InputLabel>Select Role</InputLabel>
                    <Select
                      value={selectedRoles[hub.id] || ""}
                      onChange={(e) =>
                        handleRoleChange(hub.id, e.target.value)
                      }
                      label="Select Role"
                      sx={{
                        backgroundColor: "#ffffff",
                        "&:hover": { backgroundColor: "#f1f8e9" },
                      }}
                    >
                      {hub.roles.map((role, idx) => (
                        <MenuItem key={idx} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleApply(hub)}
                    disabled={!selectedRoles[hub.id]}
                    sx={{
                      backgroundColor: "#558b2f",
                      fontWeight: "bold",
                      borderRadius: 1,
                      mt: 1,
                      "&:hover": {
                        backgroundColor: "#33691e",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    Apply Now
                  </Button>
                </Box>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedHub && (
        <ApplicationForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          hub={selectedHub}
          onSubmit={handleFormSubmit}
        />
      )}

      <Snackbar
        open={thankYou}
        onClose={() => setThankYou(false)}
        message="✅ Thank you for applying!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => setThankYou(false)}
            sx={{ fontWeight: 600 }}
          >
            CLOSE
          </Button>
        }
      />
    </Box>
  );
};

export default MapPage;
