import React from 'react';
import {
  Box,
<<<<<<< HEAD
  Grid,
  Typography,
  Link,
  Stack,
  IconButton
} from '@mui/material';
=======
  Typography,
  Grid,
  Link,
  IconButton,
  Container,
  GlobalStyles,
} from "@mui/material";
>>>>>>> fedf46b685f54671eacf78f6a75558652b3f8c4d
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
<<<<<<< HEAD
  Pinterest
} from '@mui/icons-material';
import footerBg from '../assets/Footer.png';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${footerBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '500px', // Ensures room for all elements including bottom text
        px: { xs: 2, md: 10 },
        pt: 5,
        pb: 5
      }}
    >
      {/* Main Grid */}
      <Grid
        container
        spacing={4}
        justifyContent="space-between"
        sx={{ flexWrap: 'wrap' }}
      >
        {/* CONTACT US */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>Contact us</Typography>
          <Typography variant="body2" color="textSecondary">
            Call us: Monday - Friday, 9:30 AM - 5:50 PM
          </Typography>
          <Typography variant="body1" fontWeight="bold" mt={1}>
            Contact No: 8888842300, 8888842290, <br />
            8888842280, 8888842325
          </Typography>
          <Typography variant="body2" mt={2}>
            Address: <br />
            E-Commerce Division, MAIDC, <br />
            Krushi Udyog Bhavan, <br />
            Dinkarrao Desai Marg, <br />
            Aarey Milk Colony, Goregaon (E), <br />
            Mumbai - 400065
          </Typography>
          <Typography variant="body2" mt={2}>
            Email us at: <br />
            <Link href="mailto:support@mahaagromart.com" underline="hover">
              support@mahaagromart.com
            </Link><br />
            <Link href="mailto:info@mahaagromart.com" underline="hover">
              info@mahaagromart.com
            </Link>
          </Typography>
          <Stack direction="row" spacing={1} mt={2}>
            <IconButton color="inherit"><Facebook /></IconButton>
            <IconButton color="inherit"><LinkedIn /></IconButton>
            <IconButton color="inherit"><Twitter /></IconButton>
            <IconButton color="inherit"><Instagram /></IconButton>
            <IconButton color="inherit"><Pinterest /></IconButton>
          </Stack>
        </Grid>

        {/* SELLER LINKS */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>SELLER LINKS</Typography>
          <Stack spacing={1}>
            <Link href="#" underline="hover">Seller List</Link>
            <Link href="#" underline="hover">Seller Login</Link>
            <Link href="#" underline="hover">Become A Seller</Link>
          </Stack>
        </Grid>

        {/* QUICK LINKS */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>QUICK LINKS</Typography>
          <Stack spacing={1}>
            <Link href="#" underline="hover">About us</Link>
            <Link href="#" underline="hover">Contact</Link>
            <Link href="#" underline="hover">FAQ</Link>
            <Link href="#" underline="hover">Terms & conditions</Link>
            <Link href="#" underline="hover">Privacy Policy</Link>
            <Link href="#" underline="hover">Download our app</Link>
            <Link href="#" underline="hover">Sell on Mahaagro</Link>
          </Stack>
        </Grid>

        {/* ACCOUNT & SHIPPING INFO */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>ACCOUNT & SHIPPING INFO</Typography>
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

      {/* Bottom Text */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 5,
          color: '#fff', // white text
          flexWrap: 'wrap'
        }}
      >
        <Typography variant="body2">
          Designed and Developed by Huda's Technologies ©2023
        </Typography>
        <Typography variant="body2">
          Over 132,505 visits to our website!
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
=======
  Pinterest,
} from "@mui/icons-material";
import FooterBg from "../assets/Footer_Bg.jpg";

export default function Footer() {
  return (
    <>
      {/* Global style to prevent horizontal scroll */}
      <GlobalStyles styles={{ body: { overflowX: "hidden" } }} />

      <Box sx={{ bgcolor: "#fff", color: "#333", mt: 8, overflowX: "hidden" }}>
        <Container maxWidth="xl" sx={{ overflowX: "hidden" }}>
          <Grid container py={5} spacing={4} alignItems="flex-start">
            {/* Contact Us - Slightly shifted right */}
            <Grid columns={12} span={3} sx={{ pl: { xs: 4, sm: 8, md: 12 } }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact us
              </Typography>
              <Typography variant="body2">
                <strong>Call us:</strong> Monday - Friday, 9:30 AM - 5:50 PM
              </Typography>
              <Typography variant="body2" fontWeight="bold" mt={1}>
                Contact No: <br />
                8888842300, 8888842290,
                <br />
                8888842280, 8888842325
              </Typography>
              <Typography variant="body2" mt={1}>
                Address: <br />
                E-Commerce Division, MAIDC, Krushi Udyog Bhavan
                <br />
                Dinkarrao Desai Marg, Aarey Milk Colony,
                <br />
                Goregaon (E), Mumbai - 400065
              </Typography>
              <Typography variant="body2" mt={1}>
                Email us at: <br />
                support@mahaagromart.com
                <br />
                info@mahaagromart.com
              </Typography>
              <Box mt={2}>
                {[Facebook, LinkedIn, Twitter, Instagram, Pinterest].map(
                  (Icon, index) => (
                    <IconButton key={index} sx={{ color: "#333" }}>
                      <Icon fontSize="small" />
                    </IconButton>
                  )
                )}
              </Box>
            </Grid>

            {/* Right Side Sections */}
            <Grid columns={12} span={9}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
                ml={14}
                gap={16}
                sx={{ flexWrap: "wrap" }}
              >
                {/* Seller Links */}
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    SELLER LINKS
                  </Typography>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Seller List
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Seller Login
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Become A Seller
                  </Link>
                </Box>

                {/* Quick Links */}
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    QUICK LINKS
                  </Typography>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    About us
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Contact
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    FAQ
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Download our app
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Sell on Mahaagro
                  </Link>
                </Box>

                {/* Account Info */}
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    ACCOUNT & SHIPPING INFO
                  </Typography>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Profile Info
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Wish List
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Track Order
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Refund Policy
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Return Policy
                  </Link>
                  <Link
                    display="block"
                    href="#"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { color: "#00008B" },
                    }}
                  >
                    Cancellation Policy
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Footer Background Image with Text */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "300px",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={FooterBg}
            alt="field background"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              px: 4,
              py: 2,
              display: "flex",
              justifyContent: "space-between",
              color: "black",
            }}
          >
            <Typography variant="body2">
              Designed and Developed by Huda's Technologies ©2023
            </Typography>
            <Typography variant="body2">
              Over 132,505 visits to our website!
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
>>>>>>> fedf46b685f54671eacf78f6a75558652b3f8c4d
