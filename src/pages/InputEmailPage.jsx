import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import InputEmailAlert from "./InputEmailAlert";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import apiClient from "../axios.js";

const theme = createTheme();

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  height: "100vh",
  width: "100%",
  position: "relative",
  backgroundImage: "url('/assets/background_image.png')",
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
  marginTop: "5px",
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
  marginTop: "-5px",
  marginLeft: "200px",
  width: "400px",
  minHeight: "425px",
  boxShadow: theme.shadows[5],
  transition: "min-height 0.3s ease",
}));

const SubTitleAndUSPBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginRight: theme.spacing(4),
  justifyContent: "center",
  marginTop: "25px",
  maxWidth: "500px",
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
  whiteSpace: "pre-line",
}));

const USPList = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const USPItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const CheckBox = styled("span")(({ theme }) => ({
  width: "45px",
  height: "45px",
  marginRight: theme.spacing(2),
  background: `url('/assets/check_box.png') no-repeat center center`,
  backgroundSize: "contain",
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
  whiteSpace: "pre-line",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  backgroundColor: "#0078AA",
  color: "#FFFFFF",
}));

const emailValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export default function InputEmailPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
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
    console.log("Button clicked");

    try {
      emailValidationSchema.validateSync(formData, { abortEarly: false });

      console.log("Data:", formData);

      const response = await apiClient.post("/auth/register", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      console.log(response);

      if (response.status === 200) {
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("firstName", formData.firstName);
        localStorage.setItem("lastName", formData.lastName);
        localStorage.setItem("email", formData.email);

        setShowAlert(true);
        setTimeout(() => {
          navigate("/verification", { state: { email: formData.email } });
        }, 1500);
      } else {
        setFormErrors({ general: "Registration failed. Please try again." });
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setFormErrors(errors);
      } else {
        setFormErrors({ general: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Title>PAWMART</Title>
        <ContentBox>
          <SubTitleAndUSPBox>
            <SubTitle>Pet's Trusted Partner</SubTitle>
            <USPList>
              <USPItem>
                <CheckBox />
                <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Fast Delivery
                  </span>
                  {"\n"}Get your pet essentials delivered in no time.
                </Typography>
              </USPItem>
              <USPItem>
                <CheckBox />
                <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    100% Service Guarantee:
                  </span>
                  {"\n"}Satisfaction and quality, every time.
                </Typography>
              </USPItem>
            </USPList>
          </SubTitleAndUSPBox>
          <FormBox>
            <Typography component="h1" variant="h5">
              Enter Your Email
            </Typography>
            <Typography
              component="p"
              variant="body2"
              style={{ fontSize: "17px", marginTop: theme.spacing(1) }}
            >
              Already have a PawMart account?{" "}
              <Link href="/login" variant="body2">
                Log In
              </Link>
            </Typography>
            <Form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />
                <TextField
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                />
              </Box>
              <TextField
                margin="dense"
                variant="outlined"
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
              <TextField
                margin="dense"
                variant="outlined"
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
              />
              <SubmitButton type="submit" fullWidth variant="contained">
                Submit
              </SubmitButton>
              <Box style={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  style={({ fontSize: "20px" }, { whiteSpace: "pre-line" })}
                >
                  By signing up, I agree to PawMart’s Terms of Service, Privacy
                  Policy, and consent to the processing of my information.
                </Typography>
              </Box>
            </Form>
          </FormBox>
        </ContentBox>
        {showAlert && (
          <Box
            sx={{
              width: "400px",
              marginTop: theme.spacing(0),
              marginLeft: "1140px",
            }}
          >
            <InputEmailAlert />
          </Box>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}
