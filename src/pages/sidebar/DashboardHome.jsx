import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  MonetizationOn as MonetizationOnIcon,
  AccountCircle as AccountCircleIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingUp as TrendingUpIcon,
  History as HistoryIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Nature as NatureIcon,
  Link as LinkIcon,
  Visibility as VisibilityIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getBlockExplorerUrl } from "../../utils/blockchainUtils";

const DashboardHome = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "totalCredits",
    direction: "desc",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const DOLLAR_PER_CREDIT = 4.75;

  const purchaseButtonRef = React.useRef(null);

  // Define fetchUserData outside useEffect so it can be referenced elsewhere
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userCollection = collection(db, "carbonCalculations");
      // Always get all user data regardless of who is logged in
      const querySnapshot = await getDocs(userCollection);

      // Process data to get unique users with their total credits
      const userMap = new Map();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const email = data.email;
        const username = data.username || "Anonymous";
        const totalCredits = data.totalCredits || 0;
        const lastCalculation = data.timestamp?.toDate() || new Date();

        // Add blockchain verification data
        // Inside the fetchUserData function, modify:
        const blockchainVerified = Boolean(data.blockchainVerified) || false;
        const txHash = data.txHash || "";
        // Correctly handle blockchainTimestamp
        const blockchainTimestamp = data.blockchainTimestamp
          ? data.blockchainTimestamp.toDate()
          : null;
        const walletAddress = data.walletAddress || "";

        if (userMap.has(email)) {
          const user = userMap.get(email);
          if (totalCredits > user.totalCredits) {
            user.totalCredits = totalCredits;
          }
          if (lastCalculation > user.lastCalculation) {
            user.lastCalculation = lastCalculation;
          }

          // Update blockchain status if present
          if (blockchainVerified) {
            user.blockchainVerified = true;
            user.txHash = txHash;
            user.blockchainTimestamp = blockchainTimestamp;
            user.walletAddress = walletAddress;
          }
        } else {
          userMap.set(email, {
            email,
            username,
            totalCredits,
            lastCalculation,
            carbonScore: data.carbonScore || 0,
            blockchainVerified,
            txHash,
            blockchainTimestamp,
            walletAddress,
          });
        }
      });

      // Convert map to array
      const usersArray = Array.from(userMap.values());
      setUsers(usersArray);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Always fetch all user data, regardless of auth state
      fetchUserData();
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const handlePurchaseClick = (user) => {
    setSelectedUser(user);
    setPurchaseDialogOpen(true);
    setPurchaseAmount(1);
  };

  const handlePurchaseConfirm = () => {
    // In a real application, this would connect to a payment processor
    alert(
      `Purchase confirmed for ${purchaseAmount} credits from ${
        selectedUser.email
      } for $${(purchaseAmount * DOLLAR_PER_CREDIT).toFixed(2)}`
    );
    setPurchaseDialogOpen(false);
  };

  const calculateTotalValue = (credits) => {
    return (credits * DOLLAR_PER_CREDIT).toFixed(2);
  };

  const formatDate = (date) => {
    if (!date) return "N/A"; // Handle null or undefined dates
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4f5e8 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 2,
              background: "linear-gradient(to right, #388e3c, #2e7d32)",
              color: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <NatureIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h4" component="h1" fontWeight="bold">
                  Carbon Credits Marketplace
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: isMobile ? 2 : 0,
                }}
              >
                <Chip
                  icon={<MonetizationOnIcon />}
                  label={`$${DOLLAR_PER_CREDIT}/Credit`}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: "bold",
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
              </Box>
            </Box>
          </Paper>

          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
            }}
          >
            <TextField
              fullWidth={isMobile}
              placeholder="Search by email or username"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                flexGrow: 1,
              }}
            />

            <Paper
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                bgcolor: "white",
                borderRadius: 1,
              }}
            >
              <FilterListIcon sx={{ color: "text.secondary", mr: 1 }} />
              <Typography variant="body2" sx={{ mr: 2 }}>
                Sort by:
              </Typography>

              <Button
                size="small"
                onClick={() => handleSort("totalCredits")}
                startIcon={
                  sortConfig.key === "totalCredits" ? (
                    sortConfig.direction === "asc" ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    )
                  ) : null
                }
                sx={{
                  color:
                    sortConfig.key === "totalCredits"
                      ? "primary.main"
                      : "text.secondary",
                  fontWeight:
                    sortConfig.key === "totalCredits" ? "bold" : "normal",
                }}
              >
                Credits
              </Button>

              <Button
                size="small"
                onClick={() => handleSort("lastCalculation")}
                startIcon={
                  sortConfig.key === "lastCalculation" ? (
                    sortConfig.direction === "asc" ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    )
                  ) : null
                }
                sx={{
                  color:
                    sortConfig.key === "lastCalculation"
                      ? "primary.main"
                      : "text.secondary",
                  fontWeight:
                    sortConfig.key === "lastCalculation" ? "bold" : "normal",
                }}
              >
                Date
              </Button>
            </Paper>
          </Box>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <CircularProgress color="success" />
              <Typography variant="h6" color="text.secondary" sx={{ ml: 2 }}>
                Loading carbon credit data...
              </Typography>
            </Box>
          ) : filteredUsers.length === 0 ? (
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                bgcolor: "white",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No carbon credit data found matching your search
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredUsers.map((user, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={`${user.email}-${index}`}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card
                      elevation={2}
                      sx={{
                        borderRadius: 2,
                        height: "100%",
                        overflow: "hidden",
                        border: user.blockchainVerified
                          ? "1px solid #4caf50"
                          : "1px solid #e0e0e0",
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: "#e8f5e9",
                          p: 2,
                          borderBottom: "1px solid #c8e6c9",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              bgcolor: theme.palette.success.main,
                              color: "white",
                            }}
                          >
                            <AccountCircleIcon />
                          </Avatar>
                          <Box sx={{ ml: 1.5 }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              noWrap
                            >
                              {user.username}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ wordBreak: "break-all" }}
                            >
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          <Chip
                            size="small"
                            label={
                              user.carbonScore > 80
                                ? "Excellent"
                                : user.carbonScore > 60
                                ? "Good"
                                : "Basic"
                            }
                            color={
                              user.carbonScore > 80
                                ? "success"
                                : user.carbonScore > 60
                                ? "warning"
                                : "default"
                            }
                            sx={{ fontWeight: "medium" }}
                          />
                          {console.log(
                            "User blockchain verified:",
                            user.blockchainVerified
                          )}
                          {user.blockchainVerified && (
                            <Chip
                              size="small"
                              icon={<VerifiedIcon />}
                              label="Verified"
                              color="primary"
                              sx={{ fontWeight: "medium" }}
                            />
                          )}
                        </Box>
                      </Box>

                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Available Credits:
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <HistoryIcon
                                fontSize="small"
                                sx={{ color: theme.palette.info.main, mr: 0.5 }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Last update: {formatDate(user.lastCalculation)}
                              </Typography>
                            </Box>
                          </Box>

                          <Typography
                            variant="h4"
                            fontWeight="bold"
                            color={theme.palette.success.dark}
                          >
                            {user.totalCredits}
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                              sx={{ ml: 0.5 }}
                            >
                              credits
                            </Typography>
                          </Typography>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Total Value:
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <MonetizationOnIcon
                                sx={{ color: "#4caf50", mr: 0.5 }}
                              />
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                color="primary"
                              >
                                ${calculateTotalValue(user.totalCredits)}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TrendingUpIcon
                              sx={{
                                color: theme.palette.success.main,
                                mr: 0.5,
                              }}
                            />
                            <Typography
                              variant="body2"
                              color={theme.palette.success.main}
                              fontWeight="medium"
                            >
                              ${DOLLAR_PER_CREDIT}/credit
                            </Typography>
                          </Box>
                        </Box>

                        {/* Add blockchain transaction details if verified */}
                        {user.blockchainVerified && (
                          <Box
                            sx={{
                              mb: 2,
                              pt: 1,
                              pb: 2,
                              borderTop: "1px dashed #c8e6c9",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              gutterBottom
                            >
                              Blockchain Verification:
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <LinkIcon
                                sx={{
                                  color: theme.palette.primary.main,
                                  mr: 0.5,
                                  fontSize: "small",
                                }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ wordBreak: "break-all" }}
                              >
                                TX:{" "}
                                {user.txHash
                                  ? user.txHash.substring(0, 10) + "..."
                                  : "N/A"}
                              </Typography>
                              {user.txHash && (
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    window.open(
                                      getBlockExplorerUrl(user.txHash),
                                      "_blank"
                                    )
                                  }
                                  sx={{ ml: 1, p: 0.5 }}
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              )}
                            </Box>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                            >
                              Verified on:{" "}
                              {formatDate(user.blockchainTimestamp)}
                            </Typography>
                          </Box>
                        )}

                        <Button
                          ref={purchaseButtonRef}
                          fullWidth
                          variant="contained"
                          color="success"
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => handlePurchaseClick(user)}
                          disabled={user.totalCredits <= 0}
                          sx={{
                            borderRadius: 50,
                            py: 1,
                            fontWeight: "bold",
                            background:
                              "linear-gradient(to right, #388e3c, #2e7d32)",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          Buy Credits
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </motion.div>
      </Container>

      {/* Purchase Dialog */}
      <Dialog
        open={purchaseDialogOpen}
        onClose={() => setPurchaseDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        aria-modal="true"
        // Ensure focus management
        disableEnforceFocus={false}
        // Don't restore focus to an element that might be within an aria-hidden container
        disableRestoreFocus={false}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Buy Carbon Credits</Typography>
            <IconButton onClick={() => setPurchaseDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Seller Information
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                    <AccountCircleIcon />
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {selectedUser.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedUser.email}
                    </Typography>
                  </Box>

                  {/* Add blockchain verification badge */}
                  {selectedUser.blockchainVerified && (
                    <Chip
                      size="small"
                      icon={<VerifiedIcon />}
                      label="Blockchain Verified"
                      color="primary"
                      sx={{ ml: "auto", fontWeight: "medium" }}
                    />
                  )}
                </Box>
              </Box>

              {/* Add blockchain verification details if available */}
              {selectedUser.blockchainVerified && (
                <Box sx={{ mb: 3, p: 2, bgcolor: "#f5f9ff", borderRadius: 1 }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="medium"
                    color="primary"
                    gutterBottom
                  >
                    Blockchain Verification Details
                  </Typography>

                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary">
                        Transaction ID:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography
                        variant="caption"
                        sx={{ wordBreak: "break-all" }}
                      >
                        {selectedUser.txHash}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          window.open(
                            getBlockExplorerUrl(selectedUser.txHash),
                            "_blank"
                          )
                        }
                        sx={{ ml: 1, p: 0.5 }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary">
                        Verification Date:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="caption">
                        {selectedUser.blockchainTimestamp
                          ? formatDate(selectedUser.blockchainTimestamp)
                          : "N/A"}
                      </Typography>
                    </Grid>

                    {selectedUser.walletAddress && (
                      <>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary">
                            Wallet Address:
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            variant="caption"
                            sx={{ wordBreak: "break-all" }}
                          >
                            {selectedUser.walletAddress.substring(0, 10)}...
                            {selectedUser.walletAddress.substring(
                              selectedUser.walletAddress.length - 8
                            )}
                          </Typography>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  gutterBottom
                >
                  Credit Details
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Paper
                      sx={{ p: 2, textAlign: "center", bgcolor: "#f1f8e9" }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Available Credits
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="success.dark"
                      >
                        {selectedUser.totalCredits}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      sx={{ p: 2, textAlign: "center", bgcolor: "#e8f5e9" }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Price Per Credit
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="success.dark"
                      >
                        ${DOLLAR_PER_CREDIT}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  gutterBottom
                >
                  Purchase Amount
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  label="Number of Credits"
                  variant="outlined"
                  value={purchaseAmount}
                  onChange={(e) =>
                    setPurchaseAmount(
                      Math.max(
                        1,
                        Math.min(
                          selectedUser.totalCredits,
                          parseInt(e.target.value) || 1
                        )
                      )
                    )
                  }
                  inputProps={{ min: 1, max: selectedUser.totalCredits }}
                  sx={{ mb: 2 }}
                />

                <Paper
                  sx={{
                    p: 2,
                    bgcolor: "#f5f5f5",
                    borderRadius: 2,
                    border: "1px dashed #bdbdbd",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body1">Credits:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {purchaseAmount}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body1">Price per Credit:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      ${DOLLAR_PER_CREDIT}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Total:
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="success.main"
                    >
                      ${(purchaseAmount * DOLLAR_PER_CREDIT).toFixed(2)}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPurchaseDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={handlePurchaseConfirm}
            startIcon={<ShoppingCartIcon />}
          >
            Complete Purchase
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardHome;
