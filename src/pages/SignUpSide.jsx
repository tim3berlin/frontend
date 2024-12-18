import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      validationSchema.validateSync(formData, { abortEarly: false });
      await axios.post("https://reqres.in/api/users", formData);
      alert("Registration successful! Redirecting to PIN setup...");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      navigate("/pin");
    } catch (error) {
      if (error.name === "ValidationError") {
        setErrors(error.inner.reduce((acc, err) => ({ ...acc, [err.path]: err.message }), {}));
      } else {
        alert("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#F2DF3A" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField name="firstName" required fullWidth id="firstName" label="First Name" autoFocus value={formData.firstName} onChange={handleChange} error={!!errors.firstName} helperText={errors.firstName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="lastName" required fullWidth id="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} error={!!errors.lastName} helperText={errors.lastName} />
              </Grid>
              <Grid item xs={12}>
                <TextField name="email" required fullWidth id="email" label="Email Address" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
              </Grid>
              <Grid item xs={12}>
                <TextField name="password" required fullWidth type="password" id="password" label="Password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#0078AA",
                color: "#FFFFFF",
                "&:hover": { bgcolor: "#005F86" },
              }}
              disabled={isSubmitting}
            >
              Sign Up
            </Button>
            <Box textAlign="center">
              <Link href="/signin" variant="body2">
                Already have an account? Sign In
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
