import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Button,
  Snackbar,
  Typography,
  Box,
  Select,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ApplicationForm from "./ApplicationForm";
import { db } from "../firebaseConfig"; // ✅ Firestore
import { collection, addDoc } from "firebase/firestore"; // ✅ Firestore

// Static Hubs – You can later move this to Firestore if needed
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
    roles: ["💻 Plant Health Officer", "🛠️ Field Engineer"],
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

// Marker Icon
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
      await addDoc(collection(db, "applications"), data); // ✅ Submit to Firestore
      console.log("✅ Application submitted:", data);
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
    <>
      <Typography
        variant="h5"
        align="center"
        sx={{ mt: 2, mb: 2, fontWeight: 600, color: "#2e7d32" }}
      >
        🌾 Regional Hubs + Youth Employment
      </Typography>

      <MapContainer
        center={[11.1271, 78.6569]}
        zoom={7}
        style={{ height: "85vh", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {hubs.map((hub) => (
          <Marker key={hub.id} position={hub.position} icon={markerIcon}>
            <Popup minWidth={250} maxWidth={250}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  px: 1,
                  py: 0.5,
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  📍 {hub.name}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: "#616161",
                    fontSize: "0.8rem",
                    lineHeight: 1.2,
                  }}
                >
                  {hub.description}
                </Typography>

                <Chip
                  label={`👥 ${hub.youths} youths employed`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />

                <FormControl size="small" fullWidth>
                  <InputLabel>Select role</InputLabel>
                  <Select
                    value={selectedRoles[hub.id] || ""}
                    onChange={(e) => handleRoleChange(hub.id, e.target.value)}
                    label="Select role"
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="" disabled>
                      Select a role
                    </MenuItem>
                    {hub.roles.map((role, idx) => (
                      <MenuItem key={idx} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={() => handleApply(hub)}
                  disabled={!selectedRoles[hub.id]}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    backgroundColor: "#2e7d32",
                    "&:hover": { backgroundColor: "#1b5e20" },
                  }}
                >
                  📝 Apply Now
                </Button>
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
        autoHideDuration={3000}
        onClose={() => setThankYou(false)}
        message="✅ Thank you for applying!"
      />
    </>
  );
};

export default MapPage;
