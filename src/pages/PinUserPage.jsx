import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography, Box, Button } from "@mui/material";
import RegisterAlert from "./RegisterAlert";
import RegisterError from "./RegisterError";
import axios from "axios";

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
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: theme.spacing(2),
  position: "absolute",
  marginTop: "350px",
  marginLeft: "-20px",
  textAlign: "left",
}));

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "400px",
  boxShadow: theme.shadows[5],
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
}));

const InputField = styled("input")(({ theme }) => ({
  width: "99%",
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

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0078AA",
  color: "#FFFFFF",
  marginTop: theme.spacing(2),
  width: "101%",
}));

export default function PinUserPage() {
  const [pin, setPin] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (pin.length === 6) {
      try {
        const response = await axios.patch(
          `http://localhost:5000/users/${userId}`,
          { pin }
        );

        if (response.status === 200) {
          setAlertMessage("Registration complete!");
          setAlertSeverity("success");
          setShowAlert(true);
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          setAlertMessage("Pin submission failed.");
          setAlertSeverity("error");
          setShowAlert(true);
        }
      } catch (error) {
        console.error("PIN submission error:", error);
        setAlertMessage("An error occurred during PIN submission.");
        setAlertSeverity("error");
        setShowAlert(true);
      }
    } else {
      setAlertMessage("Pin must be 6 digits!");
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Title>PAWMART</Title>
        <ContentBox>
          <FormBox>
            <Typography
              component="h1"
              variant="h5"
              style={{ marginBottom: "20px" }}
            >
              Set Your 6-Digit PIN
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <InputField
                type="password"
                maxLength="6"
                placeholder="Enter 6-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              <SubmitButton type="submit" variant="contained">
                Submit PIN
              </SubmitButton>
            </form>
          </FormBox>
          {showAlert && (
            <>
              {alertSeverity === "success" ? (
                <Box
                  style={{
                    marginTop: "300px",
                    maxWidth: "470px",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <RegisterAlert message={alertMessage} />
                </Box>
              ) : (
                <Box
                  style={{
                    marginTop: "300px",
                    maxWidth: "470px",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <RegisterError message={alertMessage} />
                </Box>
              )}
            </>
          )}
        </ContentBox>
      </Wrapper>
    </ThemeProvider>
  );
}
