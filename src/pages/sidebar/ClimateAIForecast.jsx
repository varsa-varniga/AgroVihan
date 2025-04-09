import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
  styled,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SpeedIcon from "@mui/icons-material/Speed";

const DarkCard = styled(Card)(() => ({
  backgroundColor: "#203e2e",
  color: "white",
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
}));

const ClimateAIForecast = () => {
  const weekForecast = [
    { day: "Sat", temp: "37°C", icon: <WbSunnyIcon /> },
    { day: "Sun", temp: "36°C", icon: <WbSunnyIcon /> },
    { day: "Mon", temp: "34°C", icon: <WbSunnyIcon /> },
    { day: "Tue", temp: "34°C", icon: <WbSunnyIcon /> },
    { day: "Wed", temp: "34°C", icon: <WbSunnyIcon /> },
    { day: "Thu", temp: "32°C", icon: <WbSunnyIcon /> },
  ];

  const overviewCards = [
    {
      title: "Air Quality Index",
      value: "60 (Good)",
      icon: <SpeedIcon />,
      description: "Air quality is satisfactory",
    },
    {
      title: "UV Index",
      value: "5.5 h",
      icon: <WbSunnyIcon />,
      description: "Moderate",
    },
    {
      title: "Humidity",
      value: "82%",
      icon: <OpacityIcon />,
      description: "Dew point: 27°C",
    },
    {
      title: "Wind Status",
      value: "6.5 km/h",
      icon: <AirIcon />,
      description: "7:50 AM",
    },
    {
      title: "Visibility",
      value: "10.0 km",
      icon: <VisibilityIcon />,
      description: "No haze affecting visibility",
    },
    {
      title: "Feels Like",
      value: "38°C",
      icon: <ThermostatIcon />,
      description: "",
    },
  ];

  return (
    <Box sx={{ p: 2, backgroundColor: "#142d1b", minHeight: "100vh", color: "white" }}>
      <Grid container spacing={2}>
        {/* LEFT COLUMN */}
        <Grid item xs={12} md={4}>
          <DarkCard>
            <CardContent>
              <Typography variant="h6">Prakash Kumar</Typography>
              <Typography variant="body2" color="#ccc">
                Tamil Nadu, India
              </Typography>

              <Box mt={4} display="flex" alignItems="center" gap={2}>
                <WbSunnyIcon fontSize="large" />
                <Typography variant="h3">34°C</Typography>
              </Box>
              <Typography>Sunny</Typography>

              <Box mt={4}>
                <Typography variant="body2">Temperature</Typography>
                <Box height={50} bgcolor="#2c4b34" borderRadius={2} mt={1} />
              </Box>

              <Box mt={4}>
                <DarkCard sx={{ backgroundColor: "#2c4b34" }}>
                  <CardContent>
                    <Typography gutterBottom>
                      Empower global farming with AI-powered Insights
                    </Typography>
                    <Button variant="contained" sx={{ backgroundColor: "#8fcf3c" }}>
                      Smart Advice
                    </Button>
                  </CardContent>
                </DarkCard>
              </Box>
            </CardContent>
          </DarkCard>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item xs={12} md={8}>
        // PLACE THIS INSIDE THE RIGHT COLUMN Grid item (xs={12})
<Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
  <Box>
    <Typography variant="h6">May 2023</Typography>
    <Typography variant="body2">Friday, May 19, 2028</Typography>
  </Box>
  <CalendarMonthIcon />
</Box>

// ✅ WEEKLY FORECAST: FULL WIDTH
<Box mb={3}>
  <Grid container spacing={1}>
    {weekForecast.map((item, index) => (
      <Grid item xs={12} sm={2} key={index}>
        <DarkCard sx={{ textAlign: "center" }}>
          <CardContent>
            {item.icon}
            <Typography>{item.day}</Typography>
            <Typography>{item.temp}</Typography>
          </CardContent>
        </DarkCard>
      </Grid>
    ))}
  </Grid>
</Box>

// ✅ TODAY'S OVERVIEW in 3 COLUMNS × 2 ROWS
<Typography variant="h6" mb={2}>
  Today’s overview
</Typography>
<Grid container spacing={2}>
  {overviewCards.map((card, idx) => (
    <Grid item xs={12} sm={6} md={4} key={idx}>
      <DarkCard>
        <CardContent>
          <Typography variant="subtitle1">{card.title}</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            {card.icon}
            <Typography>{card.value}</Typography>
          </Box>
          {card.description && (
            <Typography variant="body2">{card.description}</Typography>
          )}
        </CardContent>
      </DarkCard>
    </Grid>
  ))}
</Grid>

        </Grid>
      </Grid>
    </Box>
  );
};

export default ClimateAIForecast;
