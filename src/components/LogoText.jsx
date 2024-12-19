import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledLogoText = styled(Typography)(({ theme }) => ({
  position: "relative",
  fontSize: "36px",
  fontWeight: "bold",
  color: "#FFFFFF",
}));

const LogoText = () => {
  return <StyledLogoText>PAWMART</StyledLogoText>;
};

export default LogoText;
