import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { db } from "firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  increment,
} from "firebase/firestore";

const ApplicationForm = ({ open, onClose, hub }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validateFields = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Enter a valid name!";
    if (!formData.age || isNaN(formData.age) || formData.age < 1)
      tempErrors.age = "Enter a valid age!";
    if (!formData.location.trim()) tempErrors.location = "Enter your location!";
    if (!formData.experience.trim())
      tempErrors.experience = "Enter your experience or interest!";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    const dataToSend = {
      ...formData,
      hub: hub.name,
      role: hub.role,
      timestamp: new Date().toISOString(),
    };

    try {
      // Save applicant to 'employees' collection
      await addDoc(collection(db, "employees"), dataToSend);

      // Increment totalEmployees in corresponding regionalHubs doc
      const hubRef = doc(db, "regionalHubs", hub.name);
      await setDoc(
        hubRef,
        { totalEmployees: increment(1) },
        { merge: true }
      );

      // Reset form and show thank you
      setFormData({ name: "", age: "", location: "", experience: "" });
      setErrors({});
      setShowThankYou(true);

      // Auto-close dialog after 2 seconds
      setTimeout(() => {
        setShowThankYou(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        📝 Apply for {hub.role} - {hub.name}
      </DialogTitle>

      <DialogContent>
        {showThankYou ? (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" gutterBottom>
              🎉 Thank you for applying!
            </Typography>
            <Typography variant="body2">
              We'll get in touch with you shortly.
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="body2" color="textSecondary" mb={2}>
              Our team will review your application and reach out shortly.
            </Typography>

            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name}
              />

              <TextField
                name="age"
                label="Age"
                value={formData.age}
                onChange={handleChange}
                type="number"
                fullWidth
                required
                error={!!errors.age}
                helperText={errors.age}
              />

              <TextField
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.location}
                helperText={errors.location}
              />

              <TextField
                name="experience"
                label="Experience / Interest"
                value={formData.experience}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={2}
                error={!!errors.experience}
                helperText={errors.experience}
              />

              <Typography variant="body2" color="textSecondary" mt={1}>
                📍 Applying for: <strong>{hub.role}</strong> at{" "}
                <strong>{hub.name}</strong>
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions>
        {!showThankYou && (
          <>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationForm;
