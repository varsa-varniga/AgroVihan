import {
  Box,
  Typography,
  Grid,
  Avatar,
  Button,
} from "@mui/material";
import {
  WiDaySunny,
  WiNightAltCloudy,
  WiThunderstorm,
  WiRain,
} from "react-icons/wi";
import { FaBell } from "react-icons/fa";

const ClimateAIForecast = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#1c1c1e",
        color: "#fff",
        px: 2,
        py: 2,
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: "#2c2c2e", borderRadius: 4, p: 2 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight={600}>
                Clayton Walter
              </Typography>
              <Typography variant="body2" color="gray">
                Alaska, Croatia
              </Typography>
            </Box>

            <Box
              sx={{ mt: 3, display: "flex", alignItems: "center", gap: 2, justifyContent: "center" }}
            >
              <WiDaySunny size={64} color="#FFD700" />
              <Box>
                <Typography variant="h3" fontWeight={600}>
                  14° C
                </Typography>
                <Typography>Dramatic cloudy</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,
                backgroundColor: "#1c1c1e",
                borderRadius: 3,
                p: 2,
              }}
            >
              <Typography mb={2}>Temperature</Typography>
              <img
                src="https://i.imgur.com/C3tvzvZ.png"
                alt="Temperature Graph"
                style={{ width: "100%", borderRadius: 12 }}
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
              >
                <Typography variant="caption">Morning</Typography>
                <Typography variant="caption">Afternoon</Typography>
                <Typography variant="caption">Evening</Typography>
                <Typography variant="caption">Night</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src="https://i.imgur.com/mcEyzpO.png"
                alt="Explore Map"
                style={{ width: "100%", height: "220px", objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  right: 16,
                  color: "#fff",
                }}
              >
                <Typography fontWeight={600}>
                  Explore global map of wind, weather and ocean condition.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#6c757d",
                    borderRadius: 3,
                    textTransform: "none",
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              px: 2,
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={600}>May 2023</Typography>
              <Typography variant="body2" color="gray">Friday, May 19, 2023</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FaBell color="#fff" size={20} />
              <Avatar src="https://i.pravatar.cc/100" />
            </Box>
          </Box>

          {/* Week Forecast Row */}
          <Box sx={{ mb: 3, px: 2 }}>
            <Grid container spacing={2}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                <Grid item xs={6} sm={4} md={1.7} key={day}>
                  <Box
                    sx={{
                      backgroundColor: "#2c2c2e",
                      borderRadius: 3,
                      textAlign: "center",
                      py: 2,
                    }}
                  >
                    <Typography>{day}</Typography>
                    {index === 0 || index === 6 ? (
                      <WiDaySunny size={32} color="#FFD700" />
                    ) : index === 3 ? (
                      <WiThunderstorm size={32} color="#00BFFF" />
                    ) : index === 5 ? (
                      <WiRain size={32} color="#87CEFA" />
                    ) : (
                      <WiNightAltCloudy size={32} color="#ccc" />
                    )}
                    <Typography>
                      {[16, 15, 14, 12, 15, 16, 16][index]}°
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Overview Cards Section */}
          <Box sx={{ px: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Today's overview</Typography>
            <Grid container spacing={2} alignItems="stretch">
              {["Wind Status", "UV Index", "Sunrise and sunset", "Humidity", "Visibility", "Feels like"].map(
                (title) => (
                  <Grid item xs={12} sm={6} md={4} key={title}>
                    <Box
                      sx={{
                        backgroundColor: "#2c2c2e",
                        borderRadius: 3,
                        p: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography fontWeight={600} mb={1}>{title}</Typography>
                      {title === "Wind Status" && (
                        <Typography>7.50 km/h - 6:20 AM</Typography>
                      )}
                      {title === "UV Index" && (
                        <img
                          src="https://i.imgur.com/kwzM8fR.png"
                          alt="UV gauge"
                          style={{ width: "80%" }}
                        />
                      )}
                      {title === "Sunrise and sunset" && (
                        <Box>
                          <Typography>Sunrise: 6:32 AM</Typography>
                          <Typography>Sunset: 5:42 PM</Typography>
                        </Box>
                      )}
                      {title === "Humidity" && (
                        <Typography>84% - Dew point is 21° right now</Typography>
                      )}
                      {title === "Visibility" && (
                        <Typography>04 km - Haze is affecting visibility</Typography>
                      )}
                      {title === "Feels like" && (
                        <Typography>42° - Humidity makes it feel hotter</Typography>
                      )}
                    </Box>
                  </Grid>
                )
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClimateAIForecast;