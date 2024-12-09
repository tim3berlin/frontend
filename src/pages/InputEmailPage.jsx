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
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import InputEmailAlert from "./InputEmailAlert";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  height: "100vh",
  width: "100%",
  position: "relative",
  backgroundImage: "url('/Images/Background Image.png')",
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
  marginLeft: "200px",
  width: "400px",
  height: "365px",
  boxShadow: theme.shadows[5],
  paddingTop: "40px",
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
  background: `url('/Images/Check Box.png') no-repeat center center`,
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
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 8 characters"),
});

export default function InputEmailPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      emailValidationSchema.validateSync({ email, password });
      setError("");

      const response = await axios.post("http://localhost:5000/users", {
        email,
        password,
      });

      if (response.status === 201) {
        const userId = response.data.id;
        localStorage.setItem("userId", userId);

        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        setShowAlert(true);
        setTimeout(() => {
          navigate("/verification");
        }, 1500);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setError(error.message);
      } else {
        console.error(
          "API Error:",
          error.response ? error.response.data : error.message
        );
        setError("An error occurred while submitting your data.");
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
              <TextField
                variant="outlined"
                fullWidth
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error}
                style={{
                  marginBottom: theme.spacing(3),
                  marginTop: theme.spacing(1),
                  backgroundColor: "#EDF8FF",
                  borderRadius: "4px",
                }}
              />
              <TextField
                variant="outlined"
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error}
                helperText={error}
                InputProps={{
                  style: { backgroundColor: "#EDF8FF", borderRadius: "4px" },
                }}
              />
              <SubmitButton
                onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
              >
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
            {showAlert && (
              <Box style={{ marginTop: "65px", width: "400px" }}>
                <InputEmailAlert />
              </Box>
            )}
          </FormBox>
        </ContentBox>
      </Wrapper>
    </ThemeProvider>
  );
}
