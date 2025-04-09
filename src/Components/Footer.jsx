import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  Container,
  GlobalStyles,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Pinterest,
} from "@mui/icons-material";
import footerBg from "../assets/Footer_Bg.jpg"; // Make sure the correct background is used

const Footer = () => {
  return (
    <>
      {/* Optional: Prevent horizontal scroll */}
      <GlobalStyles styles={{ body: { overflowX: "hidden" } }} />

      <Box
        sx={{
          backgroundImage: `url(${footerBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          color: "#333",
          mt: 8,
          py: 6,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            {/* Contact Us */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact us
              </Typography>
              <Typography variant="body2">
                <strong>Call us:</strong> Mon - Fri, 9:30 AM - 5:50 PM
              </Typography>
              <Typography variant="body2" fontWeight="bold" mt={1}>
                Contact No: <br />
                8888842300, 8888842290,
                <br />
                8888842280, 8888842325
              </Typography>
              <Typography variant="body2" mt={1}>
                Address: <br />
                E-Commerce Division, MAIDC, <br />
                Krushi Udyog Bhavan, Dinkarrao Desai Marg,
                <br />
                Aarey Milk Colony, Goregaon (E), Mumbai - 400065
              </Typography>
              <Typography variant="body2" mt={1}>
                Email us at: <br />
                <Link href="mailto:support@mahaagromart.com" underline="hover">
                  support@mahaagromart.com
                </Link>
                <br />
                <Link href="mailto:info@mahaagromart.com" underline="hover">
                  info@mahaagromart.com
                </Link>
              </Typography>
              <Stack direction="row" spacing={1} mt={2}>
                {[Facebook, LinkedIn, Twitter, Instagram, Pinterest].map(
                  (Icon, idx) => (
                    <IconButton key={idx} sx={{ color: "#333" }}>
                      <Icon fontSize="small" />
                    </IconButton>
                  )
                )}
              </Stack>
            </Grid>

            {/* Seller Links */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                SELLER LINKS
              </Typography>
              <Stack spacing={1}>
                <Link href="#" underline="hover">Seller List</Link>
                <Link href="#" underline="hover">Seller Login</Link>
                <Link href="#" underline="hover">Become A Seller</Link>
              </Stack>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                QUICK LINKS
              </Typography>
              <Stack spacing={1}>
                <Link href="#" underline="hover">About us</Link>
                <Link href="#" underline="hover">Contact</Link>
                <Link href="#" underline="hover">FAQ</Link>
                <Link href="#" underline="hover">Terms & Conditions</Link>
                <Link href="#" underline="hover">Privacy Policy</Link>
                <Link href="#" underline="hover">Download our app</Link>
                <Link href="#" underline="hover">Sell on Mahaagro</Link>
              </Stack>
            </Grid>

            {/* Account & Shipping Info */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                ACCOUNT & SHIPPING INFO
              </Typography>
              <Stack spacing={1}>
                <Link href="#" underline="hover">Profile Info</Link>
                <Link href="#" underline="hover">Wish List</Link>
                <Link href="#" underline="hover">Track Order</Link>
                <Link href="#" underline="hover">Refund Policy</Link>
                <Link href="#" underline="hover">Return Policy</Link>
                <Link href="#" underline="hover">Cancellation Policy</Link>
              </Stack>
            </Grid>
          </Grid>

          {/* Footer Bottom Bar */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            mt={5}
            px={2}
            py={2}
            sx={{
              borderTop: "1px solid #ccc",
              color: "#555",
            }}
          >
            <Typography variant="body2">
              Designed and Developed by Huda's Technologies ©2023
            </Typography>
            <Typography variant="body2">
              Over 132,505 visits to our website!
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
