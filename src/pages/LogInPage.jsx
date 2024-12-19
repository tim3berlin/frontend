import React, { useState } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography, Box, Button, TextField, Link } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import apiClient from "../axios.js";
import LogInAlert from "./LogInAlert";
import LogInError from "./LogInError";
import Cookies from "js-cookie";

const theme = createTheme();

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  height: "100vh",
  width: "100%",
  position: "relative",
  backgroundImage: "url('/assets/background_image_2.png')",
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
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
    console.log("Button clicked!");

    try {
      loginValidationSchema.validateSync(formData, { abortEarly: false });

      console.log("Data:", formData);

      const { email, password } = formData;

      const response = await apiClient.post("/auth/login", { email, password });

      console.log(response);

      if (response.data.status === "success") {
        Cookies.set("accessToken", response.data.access_token, {
          expires: 7,
        });
        console.log("Token Set:", Cookies.get("accessToken"));
        Cookies.set("refreshToken", response.data.refresh_token, {
          expires: 7,
        });
        setAlertMessage("Login successful! Redirecting...");
        setAlertSeverity("success");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/dashboardseller");
        }, 1500);
      } else {
        setAlertMessage(response.data.message);
        setAlertSeverity("error");
        setShowAlert(true);
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setFormErrors(errors);
      } else {
        console.error("Login error:", err);
        setAlertMessage("An error occurred during login.");
        setAlertSeverity("error");
        setShowAlert(true);
      }
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
        {showAlert && (
          <>
            {alertSeverity === "success" ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  left: "50%",
                  marginTop: "660px",
                  transform: "translate(-50%, -50%)",
                  width: "200px",
                }}
              >
                <LogInAlert />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  left: "51%",
                  marginTop: "660px",
                  transform: "translate(-50%, -50%)",
                  width: "400px",
                }}
              >
                <LogInError />
              </Box>
            )}
          </>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}
