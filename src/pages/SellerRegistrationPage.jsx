import React from "react";
import { Box, Typography } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  height: "100vh",
  minHeight: "100vh",
  width: "100%",
  position: "relative",
  backgroundImage: "url('/Images/Background Image (3).jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
}));

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: "50%",
  width: "50%",
  height: "100%",
  boxShadow: theme.shadows[5],
  paddingTop: "40px",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "60px",
  fontWeight: "bold",
  textAlign: "center",
  marginTop: "90px",
  marginBottom: theme.spacing(3),
}));

const LogoText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "20px",
  left: "20px",
  fontSize: "36px",
  fontWeight: "bold",
  color: "#FFFFFF",
}));

export default function SimpleSellerRegistrationPage() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <LogoText>PAWMART</LogoText>
        <FormBox></FormBox>
      </Wrapper>
    </ThemeProvider>
  );
}
