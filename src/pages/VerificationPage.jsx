import React, { useState, useRef } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import VerificationAlert from "./VerificationAlert";
import VerificationError from "./VerificationError";
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

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: "200px",
  width: "400px",
  height: "250px",
  boxShadow: theme.shadows[5],
  paddingTop: "40px",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0078AA",
  color: "#FFFFFF",
  marginTop: theme.spacing(2),
}));

const VerificationText = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
  textAlign: "center",
  maxWidth: "600px",
  marginBottom: "10px",
}));

const InputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const InputField = styled("input")(({ theme }) => ({
  width: "40px",
  height: "40px",
  textAlign: "center",
  fontSize: "18px",
  marginBottom: theme.spacing(1),
  border: "2px solid #0078AA",
  borderRadius: "8px",
  outline: "none",
  "&:focus": {
    borderColor: "#005f74",
  },
}));

export default function VerificationPage() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    const nextInput = inputRefs.current[index + 1];
    if (nextInput && e.target.value) {
      nextInput.focus();
    }
  };

  const handleSubmit = async () => {
    try {
      const verificationCode = code.join("");
      console.log("Data sent to API:", { email, code: verificationCode });

      const response = await apiClient.post("/auth/verify-otp", {
        email: email,
        otp: verificationCode,
      });

      console.log("Response from API:", response.data);

      if (response.data.status === "success") {
        console.log("Setting alert:", {
          message: "Verification successful!",
          severity: "success",
        });
        setAlertMessage("Verification successful!");
        setAlertSeverity("success");
        setShowAlert(true);

        setTimeout(() => {
          console.log("Navigating to login...");
          navigate("/login");
        }, 1500);
      } else {
        setAlertMessage("Invalid code. Please try again.");
        setAlertSeverity("error");
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error.response || error);

      setAlertMessage("An error occurred. Please try again later.");
      setAlertSeverity("error");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
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
              Enter Verification Code
            </Typography>
            <VerificationText>
              A verification code has been sent to {email}. Please check your
              inbox and enter the code below to verify your account.
            </VerificationText>
            <InputBox>
              {code.map((digit, index) => (
                <InputField
                  key={index}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  maxLength="1"
                  type="text"
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </InputBox>
            <SubmitButton onClick={handleSubmit} variant="contained">
              Submit
            </SubmitButton>
            {showAlert && (
              <>
                {alertSeverity === "success" ? (
                  <Box style={{ width: "415px", marginTop: "55px" }}>
                    <VerificationAlert message={alertMessage} />
                  </Box>
                ) : (
                  <Box style={{ width: "260px", marginTop: "55px" }}>
                    <VerificationError message={alertMessage} />
                  </Box>
                )}
              </>
            )}
          </FormBox>
        </ContentBox>
      </Wrapper>
    </ThemeProvider>
  );
}
