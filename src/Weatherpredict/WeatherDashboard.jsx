import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Grid, Chip, Stack
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { WiDaySunny, WiHumidity, WiStrongWind } from 'react-icons/wi';

const WeatherDashboard = () => {
  const [date, setDate] = useState(dayjs());

  // You can replace this with API fetched data later
  const weatherData = {
    location: 'Coimbatore',
    status: 'Sunny',
    temp: '34°C',
    humidity: '48%',
    windSpeed: '14 km/h',
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, borderRadius: 4, boxShadow: 3 }}>
      <CardContent>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6} textAlign="right">
            <Typography variant="h6">{weatherData.location}</Typography>
          </Grid>

          <Grid item xs={12} textAlign="center">
            <WiDaySunny size={90} color="#fbc02d" />
            <Typography variant="h4">{weatherData.temp}</Typography>
            <Typography variant="subtitle1">{weatherData.status}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Chip
                icon={<WiHumidity size={24} />}
                label={`Humidity: ${weatherData.humidity}`}
                variant="outlined"
              />
              <Chip
                icon={<WiStrongWind size={24} />}
                label={`Wind: ${weatherData.windSpeed}`}
                variant="outlined"
              />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherDashboard;
