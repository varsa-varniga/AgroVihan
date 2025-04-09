import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Morning", temp: 14 },
  { name: "Afternoon", temp: 15 },
  { name: "Evening", temp: 14 },
  { name: "Night", temp: 12 },
];

export default function WeatherCard() {
  return (
    <Card
      sx={{
        backgroundColor: "#1e1e1e",
        color: "#fff",
        borderRadius: 4,
        p: 2,
        width: 300,
      }}
    >
      <CardContent>
        {/* Location and Icon */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Clayton Walter
        </Typography>
        <Typography variant="body2" color="#aaa" mb={2}>
          Alaska, Croatia
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <WbCloudyIcon sx={{ fontSize: 40, color: "#f5c842", mr: 1 }} />
          <Typography variant="h3" sx={{ fontWeight: "medium" }}>
            14°
          </Typography>
          <Typography variant="h5" sx={{ ml: 1 }}>
            C
          </Typography>
        </Box>

        <Typography variant="subtitle1" color="#ccc" mb={3}>
          Dramatic cloudy
        </Typography>

        {/* Temperature Line Chart */}
        <Box
          sx={{
            backgroundColor: "#121212",
            borderRadius: 3,
            p: 2,
          }}
        >
          <Typography variant="subtitle2" mb={1}>
            Temperature
          </Typography>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#aaa" />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", border: "none" }}
                labelStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#f5c842"
                strokeWidth={2}
                dot={{ fill: "#f5c842" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
