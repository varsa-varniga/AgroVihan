import {
    Box,
    Typography,
    Grid,
    Link,
    IconButton,
    Container,
    GlobalStyles,
  } from '@mui/material';
  import {
    Facebook,
    Twitter,
    LinkedIn,
    Instagram,
    Pinterest,
  } from '@mui/icons-material';
  import FooterBg from '../assets/Footer_Bg.jpg';
  
  
  export default function Footer() {
    return (
      <>
        {/* Global style to prevent horizontal scroll */}
        <GlobalStyles styles={{ body: { overflowX: 'hidden' } }} />
  
  
        <Box sx={{ bgcolor: '#fff', color: '#333', mt: 8, overflowX: 'hidden' }}>
          <Container maxWidth="xl" sx={{ overflowX: 'hidden' }}>
            <Grid container py={5} spacing={4} alignItems="flex-start">
              {/* Contact Us - Slightly shifted right */}
              <Grid item xs={12} md={3} sx={{ pl: { xs: 4, sm: 8, md: 12 } }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Contact us
                </Typography>
                <Typography variant="body2">
                  <strong>Call us:</strong> Monday - Friday, 9:30 AM - 5:50 PM
                </Typography>
                <Typography variant="body2" fontWeight="bold" mt={1}>
                  Contact No: <br />
                  8888842300, 8888842290,<br />
                  8888842280, 8888842325
                </Typography>
                <Typography variant="body2" mt={1}>
                  Address: <br />
                  E-Commerce Division, MAIDC, Krushi Udyog Bhavan<br />
                  Dinkarrao Desai Marg, Aarey Milk Colony,<br />
                  Goregaon (E), Mumbai - 400065
                </Typography>
                <Typography variant="body2" mt={1}>
                  Email us at: <br />
                  support@mahaagromart.com<br />
                  info@mahaagromart.com
                </Typography>
                <Box mt={2}>
                  {[Facebook, LinkedIn, Twitter, Instagram, Pinterest].map((Icon, index) => (
                    <IconButton key={index} sx={{ color: '#333' }}>
                      <Icon fontSize="small" />
                    </IconButton>
                  ))}
                </Box>
              </Grid>
  
  
              {/* Right Side Sections */}
              <Grid item xs={12} md={9}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  ml={14}
                  gap={16}
                  sx={{ flexWrap: 'wrap' }}
                >
                  {/* Seller Links */}
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      SELLER LINKS
                    </Typography>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Seller List</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Seller Login</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Become A Seller</Link>
                  </Box>
  
  
                  {/* Quick Links */}
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      QUICK LINKS
                    </Typography>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>About us</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Contact</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>FAQ</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Terms & Conditions</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Privacy Policy</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Download our app</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Sell on Mahaagro</Link>
                  </Box>
  
  
                  {/* Account Info */}
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      ACCOUNT & SHIPPING INFO
                    </Typography>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Profile Info</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Wish List</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Track Order</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Refund Policy</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Return Policy</Link>
                    <Link display="block" href="#" sx={{ color: '#000', textDecoration: 'none', '&:hover': { color: '#00008B' } }}>Cancellation Policy</Link>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
  
  
          {/* Footer Background Image with Text */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '300px',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={FooterBg}
              alt="field background"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                px: 4,
                py: 2,
                display: 'flex',
                justifyContent: 'space-between',
                color: 'black',
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
  