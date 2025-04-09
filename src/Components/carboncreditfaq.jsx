import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";

const FAQSection = ({ showInfo }) => {
  const faqItems = [
    {
      question: "How are carbon credits calculated?",
      answer:
        "Credits are based on verified reductions in greenhouse gas emissions from your farming practices compared to conventional methods.",
    },
    {
      question: "Can I combine different sustainable practices?",
      answer:
        "Yes! The calculator accounts for multiple sustainable practices and their combined impact.",
    },
    {
      question: "How do I redeem my credits?",
      answer:
        "Credits can be redeemed through our partner network for discounts or sold on our marketplace.",
    },
  ];

  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#2e7d32",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <InfoIcon fontSize="large" /> Frequently Asked Questions
      </Typography>
      <List>
        {faqItems.map((item, index) => (
          <Paper key={index} elevation={0} sx={{ mb: 2, borderRadius: 2 }}>
            <ListItem
              button
              onClick={() => showInfo(item.answer)}
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#eeeeee",
                },
              }}
            >
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={item.question}
                primaryTypographyProps={{ fontWeight: "medium" }}
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default FAQSection;
