import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const WeatherData = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const lat = 11.0168;
  const lon = 76.9558;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat,
            lon,
            units: 'metric',
            appid: API_KEY,
          },
        });
        setWeather(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    fetchWeather();
  }, [API_KEY]);

  if (loading) return <CircularProgress />;

  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        🌤️ Weather Info - Today
      </Typography>
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6">Temperature: {weather.main.temp}°C</Typography>
              <Typography variant="h6">Humidity: {weather.main.humidity}%</Typography>
              <Typography variant="h6">Wind Speed: {weather.wind.speed} m/s</Typography>
              <Typography variant="h6">Visibility: {weather.visibility / 1000} km</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">
                Sunrise: {formatTime(weather.sys.sunrise)}
              </Typography>
              <Typography variant="h6">
                Sunset: {formatTime(weather.sys.sunset)}
              </Typography>
              <Typography variant="h6">
                Condition: {weather.weather[0].main}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherData;
