import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Paper,
  Divider,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
} from "@mui/material";
import {
  Close as CloseIcon,
  MonetizationOn as MonetizationOnIcon,
  AutoGraph as AutoGraphIcon,
  CalendarToday as CalendarTodayIcon,
  Receipt as ReceiptIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";

const Dashboard = ({ onClose }) => {
  // Sample data - replace with actual data from your backend
  const carbonData = {
    totalCredits: 45,
    transactions: [
      { id: 1, date: "2023-05-15", credits: 10, type: "Earned" },
      { id: 2, date: "2023-05-10", credits: 5, type: "Earned" },
      { id: 3, date: "2023-05-05", credits: 15, type: "Earned" },
      { id: 4, date: "2023-05-01", credits: 15, type: "Earned" },
    ],
    creditValue: 4.5, // $ value per credit
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "background.paper",
        zIndex: 1300,
        overflowY: "auto",
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton
            onClick={onClose}
            size="large"
            sx={{ color: "text.primary" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          <AutoGraphIcon sx={{ verticalAlign: "middle", mr: 1 }} />
          Carbon Credits Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Total Credits Card */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Your Carbon Credits
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "success.main",
                    width: 60,
                    height: 60,
                    mr: 3,
                  }}
                >
                  <MonetizationOnIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                    {carbonData.totalCredits}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Farmer Credits (FC)
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
                Estimated value: $
                {(carbonData.totalCredits * carbonData.creditValue).toFixed(2)}
              </Typography>
            </Paper>
          </Grid>

          {/* Recent Transactions */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Recent Transactions
              </Typography>
              <List>
                {carbonData.transactions.map((tx) => (
                  <ListItem key={tx.id}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <ReceiptIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${tx.credits} FC ${tx.type}`}
                      secondary={tx.date}
                    />
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<BarChartIcon />}
                    >
                      Details
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Additional Dashboard Sections */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Credit History
              </Typography>
              <Box sx={{ height: 300, textAlign: "center", pt: 10 }}>
                <Typography color="text.secondary">
                  Chart visualization would go here
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onClose}
            sx={{ px: 6, borderRadius: 5 }}
          >
            Back to Calculator
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
