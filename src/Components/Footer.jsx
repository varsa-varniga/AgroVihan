import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
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
