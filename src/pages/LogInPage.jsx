import React, { useState } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography, Box, Button, TextField, Link } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  height: "100vh",
  width: "100%",
  position: "relative",
  backgroundImage: "url('/Images/Background Image (2).png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "60px",
  fontWeight: "bold",
  textAlign: "center",
  marginTop: "90px",
  marginBottom: theme.spacing(3),
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  marginTop: "20px",
  marginLeft: "-5px",
  width: "100%",
  padding: theme.spacing(2),
  textAlign: "left",
}));

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "400px",
  height: "305px",
  boxShadow: theme.shadows[5],
  paddingTop: "40px",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  backgroundColor: "#0078AA",
  color: "#FFFFFF",
}));

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LogInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const { email, password } = formData;

    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:5000/users",
        data: {
          email,
          password,
        },
      });

      if (response.data.success) {
        localStorage.setItem("accessToken", "dummyAccessToken");
        alert("Login successful! Redirecting...");
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error", error);
      alert("An error occurred during login.");
    }

    setIsSubmitting(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Title>PAWMART</Title>
        <ContentBox>
          <FormBox>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Typography
              variant="body2"
              style={{ fontSize: "17px", marginTop: "10px" }}
            >
              Don't have an account?{" "}
              <Link href="/" variant="body2">
                Sign Up
              </Link>
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  marginBottom: theme.spacing(3),
                  marginTop: theme.spacing(3),
                  backgroundColor: "#EDF8FF",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  backgroundColor: "#EDF8FF",
                  borderRadius: "4px",
                }}
              />
              <SubmitButton type="submit" fullWidth variant="contained">
                Log In
              </SubmitButton>
            </form>
          </FormBox>
        </ContentBox>
      </Wrapper>
    </ThemeProvider>
  );
}
