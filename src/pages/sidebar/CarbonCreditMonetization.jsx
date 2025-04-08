import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Divider,
  Grid,
  Chip,
  Paper,
  IconButton,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  Badge,
  Fade,
  Zoom,
  Slide,
  Grow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Calculate as CalculateIcon,
  AccountCircle as AccountCircleIcon,
  Agriculture as AgricultureIcon,
  WaterDrop as WaterDropIcon,
  Build as BuildIcon,
  Nature as NatureIcon,
  Link as LinkIcon,
  Visibility as VisibilityIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  LocalFlorist as LocalFloristIcon,
  EmojiEvents as EmojiEventsIcon,
  MonetizationOn as MonetizationOnIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Share as ShareIcon,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  AutoGraph as AutoGraphIcon,
  Verified as VerifiedIcon,
  Science as ScienceIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { alpha } from "@mui/material/styles";
import HowItWorks from "../../Components/carboncreditworks"; // Import the HowItWorks component
import FAQ from "../../Components/carboncreditfaq"; // Import the FAQ component
import { useState, useEffect } from "react";

import { db } from "../../carboncreditfirebase/firebaseconfig.my";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

import { auth } from "../../carboncreditfirebase/firebaseconfig.my";
import { onAuthStateChanged } from "firebase/auth";

import CarbonCreditDashboard from "./carboncreditdashboard";

const FarmerCarbonCreditCalculator = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const userEmail = user?.email;
  const username = user?.displayName || "Anonymous";
  const [formData, setFormData] = useState({
    cropType: "",
    fertilizerType: "",
    irrigationType: "",
    equipmentUsed: "",
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedToBlockchain, setSavedToBlockchain] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showDashboard, setShowDashboard] = useState(false);

  const cropTypes = [
    {
      value: "wheat",
      label: "Wheat",
      icon: <AgricultureIcon />,
      impact: 0,
      info: "Traditional wheat farming with moderate carbon impact",
    },
    {
      value: "rice",
      label: "Rice",
      icon: <AgricultureIcon />,
      impact: 0,
      info: "Rice paddies can produce methane, a potent greenhouse gas",
    },
    {
      value: "sugarcane",
      label: "Sugarcane",
      icon: <AgricultureIcon />,
      impact: 0,
      info: "Sugarcane farming often involves burning which releases CO2",
    },
    {
      value: "maize",
      label: "Maize",
      icon: <AgricultureIcon />,
      impact: 0,
      info: "Corn production with standard environmental impact",
    },
    {
      value: "pulses",
      label: "Pulses",
      icon: <AgricultureIcon />,
      impact: +5,
      info: "Legumes fix nitrogen in soil, reducing need for fertilizers",
    },
    {
      value: "cotton",
      label: "Cotton",
      icon: <AgricultureIcon />,
      impact: 0,
      info: "Cotton farming typically requires significant water and pesticides",
    },
    {
      value: "vegetables",
      label: "Vegetables",
      icon: <AgricultureIcon />,
      impact: +3,
      info: "Vegetable farming generally has lower carbon footprint",
    },
    {
      value: "fruits",
      label: "Fruits",
      icon: <AgricultureIcon />,
      impact: +5,
      info: "Perennial fruit trees sequester carbon over time",
    },
  ];

  const fertilizerTypes = [
    {
      value: "organic",
      label: "Organic Fertilizer",
      icon: <NatureIcon />,
      impact: +20,
      info: "Made from natural sources, improves soil health",
    },
    {
      value: "chemical",
      label: "Chemical Fertilizer",
      icon: <BuildIcon />,
      impact: 0,
      info: "Synthetic fertilizers have high production emissions",
    },
    {
      value: "compost",
      label: "Compost",
      icon: <LocalFloristIcon />,
      impact: +15,
      info: "Recycles organic waste, enriches soil microbiome",
    },
    {
      value: "green_manure",
      label: "Green Manure",
      icon: <NatureIcon />,
      impact: +10,
      info: "Cover crops plowed back into soil to add nutrients",
    },
  ];

  const irrigationTypes = [
    {
      value: "drip",
      label: "Drip Irrigation",
      icon: <WaterDropIcon />,
      impact: +15,
      info: "Most efficient method, reduces water usage by 30-60%",
    },
    {
      value: "sprinkler",
      label: "Sprinkler",
      icon: <WaterDropIcon />,
      impact: +10,
      info: "Moderately efficient but can lose water to evaporation",
    },
    {
      value: "flood",
      label: "Flood Irrigation",
      icon: <WaterDropIcon />,
      impact: 0,
      info: "Traditional method with significant water loss",
    },
    {
      value: "rainfed",
      label: "Rainfed",
      icon: <WaterDropIcon />,
      impact: +5,
      info: "No irrigation energy costs but dependent on rainfall",
    },
  ];

  const equipmentUsed = [
    {
      value: "solar_pump",
      label: "Solar Pump",
      icon: <BuildIcon />,
      impact: +25,
      info: "Renewable energy powered, zero emissions",
    },
    {
      value: "electric_tractor",
      label: "Electric Tractor",
      icon: <BuildIcon />,
      impact: +20,
      info: "Clean alternative to diesel, lower maintenance",
    },
    {
      value: "no_tilling",
      label: "No Tillage",
      icon: <BuildIcon />,
      impact: +10,
      info: "Preserves soil structure and carbon content",
    },
    {
      value: "manual_tools",
      label: "Manual Tools",
      icon: <BuildIcon />,
      impact: +5,
      info: "No fuel use but labor intensive",
    },
    {
      value: "diesel_tractor",
      label: "Diesel Tractor",
      icon: <BuildIcon />,
      impact: 0,
      info: "Standard equipment with significant emissions",
    },
  ];

  const saveCarbonData = async (
    email,
    username,
    carbonScore,
    creditsEarned
  ) => {
    try {
      console.log("🚀 Saving data for:", email);

      const userCollection = collection(db, "carbonCalculations");

      // Step 1: Check for existing records
      const q = query(userCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      let totalCredits = creditsEarned;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.creditsEarned) {
          totalCredits += data.creditsEarned;
        }
      });

      console.log("🧮 Total credits after addition:", totalCredits);

      // Step 2: Add new document
      const docRef = await addDoc(userCollection, {
        email,
        username,
        carbonScore,
        creditsEarned,
        timestamp: Timestamp.now(),
        totalCredits,
      });

      console.log("✅ Data saved successfully to Firestore!");
      console.log("📄 Document ID:", docRef.id);
    } catch (error) {
      console.error("❌ Error saving carbon data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showInfo = (info) => {
    setSelectedInfo(info);
    setOpenInfo(true);
  };
  const calculateCredits = async () => {
    setLoading(true);
    setTimeout(async () => {
      const cropImpact =
        cropTypes.find((c) => c.value === formData.cropType)?.impact || 0;
      const fertilizerImpact =
        fertilizerTypes.find((f) => f.value === formData.fertilizerType)
          ?.impact || 0;
      const irrigationImpact =
        irrigationTypes.find((i) => i.value === formData.irrigationType)
          ?.impact || 0;
      const equipmentImpact =
        equipmentUsed.find((e) => e.value === formData.equipmentUsed)?.impact ||
        0;

      const baseScore = 50;
      const score = Math.min(
        baseScore +
          cropImpact +
          fertilizerImpact +
          irrigationImpact +
          equipmentImpact,
        100
      );

      const credits = Math.floor(score / 10);

      setResults({
        score,
        credits,
        timestamp: new Date().toLocaleString(),
        details: {
          cropImpact,
          fertilizerImpact,
          irrigationImpact,
          equipmentImpact,
        },
      });

      // 🔥 Save to Firebase (replace with actual logged-in user data)
      await saveCarbonData(userEmail, username, score, credits);

      setLoading(false);
    }, 1500);
  };

  const saveToBlockchain = () => {
    setLoading(true);
    // Simulate blockchain transaction
    setTimeout(() => {
      setSavedToBlockchain(true);
      setLoading(false);
    }, 2000);
  };

  const viewOnExplorer = () => {
    alert("This would open the blockchain explorer in a real implementation");
  };

  const shareResults = () => {
    alert("Share functionality would be implemented here");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4f5e8 100%)",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        pt: 2,
        pb: 6,
      }}
    >
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            elevation={isMobile ? 0 : 6}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: isMobile ? "none" : "0 15px 30px rgba(0,0,0,0.1)",
              border: isMobile ? "none" : "1px solid rgba(46, 125, 50, 0.1)",
            }}
          >
            {/* Card Header */}
            <Box
              sx={{
                py: 4,
                px: isMobile ? 2 : 4,
                background: "linear-gradient(to right, #388e3c, #2e7d32)",
                textAlign: "center",
                color: "white",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  fontSize: isMobile ? "2rem" : "2.5rem",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                Carbon Credit Calculator
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ opacity: 0.9, fontSize: isMobile ? "0.9rem" : "1rem" }}
              >
                Estimate your environmental impact and earn rewards for
                sustainable farming
              </Typography>

              {/* Animated leaves */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: 20,
                  backgroundImage:
                    "url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'><path d='M0,20 Q25,10 50,20 T100,5 L100,20 Z' fill='%23f5f7fa'/></svg>')",
                  backgroundSize: "100% 100%",
                }}
              />
            </Box>

            <CardContent sx={{ p: isMobile ? 2 : 4 }}>
              {/* Form Section */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Crop Type"
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <AgricultureIcon sx={{ color: "#388e3c", mr: 1 }} />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#81c784",
                        },
                        "&:hover fieldset": {
                          borderColor: "#66bb6a",
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Crop Type</em>
                    </MenuItem>
                    {cropTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: 8 }}>
                              {option.icon}
                            </span>
                            {option.label}
                          </Box>
                          <Box>
                            {option.impact > 0 && (
                              <Chip
                                label={`+${option.impact}`}
                                size="small"
                                sx={{
                                  ml: 1,
                                  backgroundColor: "#e8f5e9",
                                  color: "#2e7d32",
                                  fontWeight: "bold",
                                }}
                              />
                            )}
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                showInfo(option.info);
                              }}
                              sx={{ ml: 1 }}
                            >
                              <InfoIcon fontSize="small" color="action" />
                            </IconButton>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Fertilizer Type"
                    name="fertilizerType"
                    value={formData.fertilizerType}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <ScienceIcon sx={{ color: "#388e3c", mr: 1 }} />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#81c784",
                        },
                        "&:hover fieldset": {
                          borderColor: "#66bb6a",
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Fertilizer Type</em>
                    </MenuItem>
                    {fertilizerTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: 8 }}>
                              {option.icon}
                            </span>
                            {option.label}
                          </Box>
                          <Box>
                            {option.impact > 0 && (
                              <Chip
                                label={`+${option.impact}`}
                                size="small"
                                sx={{
                                  ml: 1,
                                  backgroundColor: "#e8f5e9",
                                  color: "#2e7d32",
                                  fontWeight: "bold",
                                }}
                              />
                            )}
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                showInfo(option.info);
                              }}
                              sx={{ ml: 1 }}
                            >
                              <InfoIcon fontSize="small" color="action" />
                            </IconButton>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Irrigation Type"
                    name="irrigationType"
                    value={formData.irrigationType}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <WaterDropIcon sx={{ color: "#388e3c", mr: 1 }} />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#81c784",
                        },
                        "&:hover fieldset": {
                          borderColor: "#66bb6a",
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Irrigation Type</em>
                    </MenuItem>
                    {irrigationTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: 8 }}>
                              {option.icon}
                            </span>
                            {option.label}
                          </Box>
                          <Box>
                            {option.impact > 0 && (
                              <Chip
                                label={`+${option.impact}`}
                                size="small"
                                sx={{
                                  ml: 1,
                                  backgroundColor: "#e8f5e9",
                                  color: "#2e7d32",
                                  fontWeight: "bold",
                                }}
                              />
                            )}
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                showInfo(option.info);
                              }}
                              sx={{ ml: 1 }}
                            >
                              <InfoIcon fontSize="small" color="action" />
                            </IconButton>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Equipment Used"
                    name="equipmentUsed"
                    value={formData.equipmentUsed}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <BuildIcon sx={{ color: "#388e3c", mr: 1 }} />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#81c784",
                        },
                        "&:hover fieldset": {
                          borderColor: "#66bb6a",
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Equipment Used</em>
                    </MenuItem>
                    {equipmentUsed.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: 8 }}>
                              {option.icon}
                            </span>
                            {option.label}
                          </Box>
                          <Box>
                            {option.impact > 0 && (
                              <Chip
                                label={`+${option.impact}`}
                                size="small"
                                sx={{
                                  ml: 1,
                                  backgroundColor: "#e8f5e9",
                                  color: "#2e7d32",
                                  fontWeight: "bold",
                                }}
                              />
                            )}
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                showInfo(option.info);
                              }}
                              sx={{ ml: 1 }}
                            >
                              <InfoIcon fontSize="small" color="action" />
                            </IconButton>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              {/* Calculate Button */}
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<CalculateIcon />}
                    onClick={calculateCredits}
                    disabled={
                      loading ||
                      !formData.cropType ||
                      !formData.fertilizerType ||
                      !formData.irrigationType ||
                      !formData.equipmentUsed
                    }
                    sx={{
                      py: 2,
                      px: 6,
                      borderRadius: 50,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      boxShadow: "0 4px 8px rgba(46, 125, 50, 0.3)",
                      "&:hover": {
                        boxShadow: "0 6px 12px rgba(46, 125, 50, 0.4)",
                      },
                      background: "linear-gradient(to right, #388e3c, #43a047)",
                      minWidth: isMobile ? "100%" : "auto",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Calculate Carbon Credits"
                    )}
                  </Button>
                </motion.div>
              </Box>

              {/* Results Section */}
              {results && (
                <Fade in={true} timeout={500}>
                  <Box sx={{ mt: 4 }}>
                    <Divider sx={{ mb: 3 }} />
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
                      <EmojiEventsIcon fontSize="large" /> Calculation Results
                    </Typography>

                    <Paper
                      elevation={4}
                      sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: 3,
                        background:
                          "linear-gradient(to bottom right, #e8f5e9, #f1f8e9)",
                        border: "1px solid rgba(46, 125, 50, 0.2)",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: 100,
                          height: 100,
                          background: "rgba(46, 125, 50, 0.05)",
                          borderRadius: "50%",
                          transform: "translate(30%, -30%)",
                        },
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <AutoGraphIcon
                              sx={{ color: "#388e3c", mr: 1, fontSize: "2rem" }}
                            />
                            <Box>
                              <Typography variant="body1">
                                <span style={{ fontWeight: "bold" }}>
                                  Carbon Score:
                                </span>
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mt: 0.5,
                                }}
                              >
                                <Typography
                                  variant="h4"
                                  sx={{ fontWeight: "bold", mr: 1 }}
                                >
                                  {results.score}/100
                                </Typography>
                                <Chip
                                  label={
                                    results.score > 80
                                      ? "Excellent"
                                      : results.score > 60
                                      ? "Good"
                                      : "Needs Improvement"
                                  }
                                  color={
                                    results.score > 80
                                      ? "success"
                                      : results.score > 60
                                      ? "warning"
                                      : "error"
                                  }
                                  size="small"
                                  sx={{ fontWeight: "bold" }}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <MonetizationOnIcon
                              sx={{ color: "#388e3c", mr: 1, fontSize: "2rem" }}
                            />
                            <Box>
                              <Typography variant="body1">
                                <span style={{ fontWeight: "bold" }}>
                                  Credits Earned:
                                </span>
                              </Typography>
                              <Typography
                                variant="h4"
                                sx={{ fontWeight: "bold", mt: 0.5 }}
                              >
                                {results.credits} FC
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <AccessTimeIcon sx={{ color: "#388e3c", mr: 1 }} />
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Calculated on: {results.timestamp}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      {/* Score Breakdown */}
                      <Box
                        sx={{ mt: 3, pt: 2, borderTop: "1px dashed #c8e6c9" }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "text.secondary", mb: 1 }}
                        >
                          SCORE BREAKDOWN
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid item xs={6} sm={3}>
                            <Paper
                              sx={{
                                p: 1,
                                textAlign: "center",
                                backgroundColor: alpha(
                                  theme.palette.success.light,
                                  0.2
                                ),
                              }}
                            >
                              <Typography variant="caption" display="block">
                                Crop
                              </Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {results.details.cropImpact > 0
                                  ? `+${results.details.cropImpact}`
                                  : results.details.cropImpact}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Paper
                              sx={{
                                p: 1,
                                textAlign: "center",
                                backgroundColor: alpha(
                                  theme.palette.success.light,
                                  0.2
                                ),
                              }}
                            >
                              <Typography variant="caption" display="block">
                                Fertilizer
                              </Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {results.details.fertilizerImpact > 0
                                  ? `+${results.details.fertilizerImpact}`
                                  : results.details.fertilizerImpact}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Paper
                              sx={{
                                p: 1,
                                textAlign: "center",
                                backgroundColor: alpha(
                                  theme.palette.success.light,
                                  0.2
                                ),
                              }}
                            >
                              <Typography variant="caption" display="block">
                                Irrigation
                              </Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {results.details.irrigationImpact > 0
                                  ? `+${results.details.irrigationImpact}`
                                  : results.details.irrigationImpact}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Paper
                              sx={{
                                p: 1,
                                textAlign: "center",
                                backgroundColor: alpha(
                                  theme.palette.success.light,
                                  0.2
                                ),
                              }}
                            >
                              <Typography variant="caption" display="block">
                                Equipment
                              </Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {results.details.equipmentImpact > 0
                                  ? `+${results.details.equipmentImpact}`
                                  : results.details.equipmentImpact}
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>

                    {/* Blockchain Actions */}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "text.secondary",
                        mb: 2,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <LinkIcon /> Blockchain Actions
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6} md={4}>
                        <motion.div whileHover={{ y: -2 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={
                              savedToBlockchain ? (
                                <VerifiedIcon />
                              ) : (
                                <LinkIcon />
                              )
                            }
                            onClick={saveToBlockchain}
                            disabled={loading || savedToBlockchain}
                            sx={{
                              py: 1.5,
                              borderRadius: 2,
                              fontWeight: "bold",
                              background: savedToBlockchain
                                ? "linear-gradient(to right, #4caf50, #388e3c)"
                                : "linear-gradient(to right, #1976d2, #1565c0)",
                            }}
                          >
                            {loading ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : savedToBlockchain ? (
                              "Saved to Blockchain"
                            ) : (
                              "Save to Blockchain"
                            )}
                          </Button>
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <motion.div whileHover={{ y: -2 }}>
                          <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            startIcon={<VisibilityIcon />}
                            onClick={viewOnExplorer}
                            sx={{
                              py: 1.5,
                              borderRadius: 2,
                              fontWeight: "bold",
                              borderColor: "#7b1fa2",
                              color: "#7b1fa2",
                              "&:hover": {
                                borderColor: "#6a1b9a",
                                backgroundColor: "rgba(123, 31, 162, 0.04)",
                              },
                            }}
                          >
                            View on Explorer
                          </Button>
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <motion.div whileHover={{ y: -2 }}>
                          <Button
                            fullWidth
                            variant="outlined"
                            color="inherit"
                            startIcon={<ShareIcon />}
                            onClick={shareResults}
                            sx={{
                              py: 1.5,
                              borderRadius: 2,
                              fontWeight: "bold",
                              borderColor: "#757575",
                              color: "#424242",
                              "&:hover": {
                                borderColor: "#616161",
                                backgroundColor: "rgba(117, 117, 117, 0.04)",
                              },
                            }}
                          >
                            Share Results
                          </Button>
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <motion.div whileHover={{ y: -2 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            color="info"
                            startIcon={<AutoGraphIcon />}
                            onClick={() => setShowDashboard(true)}
                            sx={{
                              py: 1.5,
                              borderRadius: 2,
                              fontWeight: "bold",
                              background:
                                "linear-gradient(to right, #00acc1, #00838f)",
                            }}
                          >
                            View Dashboard
                          </Button>
                        </motion.div>
                      </Grid>
                    </Grid>

                    {/* Transaction Info */}
                    {savedToBlockchain && (
                      <Zoom in={savedToBlockchain}>
                        <Box
                          sx={{
                            mt: 3,
                            p: 3,
                            backgroundColor: "#e3f2fd",
                            borderRadius: 2,
                            borderLeft: "4px solid #1976d2",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              opacity: 0.1,
                              "& svg": {
                                fontSize: 100,
                                color: theme.palette.primary.main,
                              },
                            }}
                          >
                            <VerifiedIcon />
                          </Box>
                          <Typography
                            variant="body1"
                            sx={{ color: "#0d47a1", fontWeight: "medium" }}
                          >
                            <VerifiedIcon
                              sx={{ verticalAlign: "middle", mr: 1 }}
                            />
                            Your carbon credits have been securely recorded on
                            the Polygon blockchain.
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#0d47a1",
                              mt: 1,
                              fontFamily: "monospace",
                            }}
                          >
                            Transaction ID: 0x7d3...4f2a
                          </Typography>
                        </Box>
                      </Zoom>
                    )}
                  </Box>
                </Fade>
              )}

              {/* How It Works Section - Using imported component */}
              <HowItWorks isMobile={isMobile} theme={theme} />

              {/* FAQ Section - Using imported component */}
              <FAQ />
            </CardContent>
          </Card>
        </motion.div>
      </Container>
      {showDashboard && (
        <CarbonCreditDashboard onClose={() => setShowDashboard(false)} />
      )}

      {/* Info Dialog */}
      <Dialog
        open={openInfo}
        onClose={() => setOpenInfo(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}>
          <Box display="flex" alignItems="center">
            <InfoIcon sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Information
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography>{selectedInfo}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenInfo(false)}
            color="success"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FarmerCarbonCreditCalculator;
