// src/components/WeeklyForecast.jsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const days = [
  { day: "Sun", temp: "16°", icon: "☀️" },
  { day: "Mon", temp: "15°", icon: "⛅" },
  { day: "Tue", temp: "14°", icon: "⛈️" },
  { day: "Wed", temp: "12°", icon: "⛈️" },
  { day: "Thu", temp: "15°", icon: "🌩️" },
  { day: "Fri", temp: "16°", icon: "🌧️" },
  { day: "Sat", temp: "16°", icon: "⛅" },
];

export default function WeeklyForecast() {
  return (
    <Box sx={{ backgroundColor: "#0f0f0f", p: 3, borderRadius: 3, color: "#fff" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box>
          <Typography variant="h6">May 2023</Typography>
          <Typography variant="subtitle2" sx={{ color: "gray" }}>
            Friday, May 19, 2023
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton sx={{ color: "#fff" }}>
            <NotificationsNoneIcon />
          </IconButton>
          <Avatar
            alt="User"
            src="https://randomuser.me/api/portraits/men/75.jpg"
            sx={{ width: 40, height: 40 }}
          />
        </Box>
      </Box>

      {/* Weekly Cards */}
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
        {days.map((item, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 80,
              backgroundColor: "#1c1c1c",
              borderRadius: 3,
              textAlign: "center",
              color: "#fff",
              flex: "0 0 auto",
            }}
          >
            <CardContent sx={{ p: 1 }}>
              <Typography variant="body2">{item.day}</Typography>
              <Box sx={{ fontSize: 24 }}>{item.icon}</Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {item.temp}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
