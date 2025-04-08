import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import AirIcon from "@mui/icons-material/Air";
import VisibilityIcon from "@mui/icons-material/Visibility";
import OpacityIcon from "@mui/icons-material/Opacity";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

const cardsData = [
  {
    title: "Wind Status",
    value: "7.50 km/h",
    subText: "6:20 AM",
    icon: <AirIcon sx={{ color: "#f5b342" }} />,
  },
  {
    title: "UV Index",
    value: "5.50 uv",
    subText: "Moderate",
    icon: <WbSunnyIcon sx={{ color: "#f5b342" }} />,
  },
  {
    title: "Sunrise and Sunset",
    value: "Sunrise: 6:32 AM",
    subText: "Sunset: 5:42 PM",
    icon: (
      <Box>
        <WbSunnyIcon sx={{ color: "#f5b342", mr: 1 }} />
        <NightsStayIcon sx={{ color: "#f5b342" }} />
      </Box>
    ),
  },
  {
    title: "Humidity",
    value: "84%",
    subText: "Dew point is 27°",
    icon: <OpacityIcon sx={{ color: "#f5b342" }} />,
  },
  {
    title: "Visibility",
    value: "04 km",
    subText: "Haze is affecting visibility",
    icon: <VisibilityIcon sx={{ color: "#f5b342" }} />,
  },
  {
    title: "Feels Like",
    value: "42°",
    subText: "Humidity makes it feel hotter",
    icon: <DeviceThermostatIcon sx={{ color: "#f5b342" }} />,
  },
];

export default function TodayOverview() {
  return (
    <Box sx={{ p: 3, backgroundColor: "#121212", color: "#fff" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Today’s overview
      </Typography>

      <Grid container spacing={2}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#1e1e1e",
                borderRadius: 3,
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {card.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h6">{card.value}</Typography>
                    <Typography variant="body2" sx={{ color: "#aaa" }}>
                      {card.subText}
                    </Typography>
                  </Box>
                  {card.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
