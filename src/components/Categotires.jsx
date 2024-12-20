import React from "react";
import { Grid } from "@mui/system";
import { Box, Typography } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone"; // Ganti dengan ikon Anda
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StarIcon from "@mui/icons-material/Star";
import petBowl from "../assets/petBowl.png";
import healthCare from "../assets/healthCare.png";
import dogToy from "../assets/dogToy.png";
import medicalKit from "../assets/medicalKit.png";
const FeatureCard = ({ icon, title }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      margin: "auto",
    }}
  >
    <img src={icon} alt={title} style={{ width: "100px", height: "100px" }} />
    <Typography variant="subtitle1" paddingTop={5}>
      {title}
    </Typography>
  </Box>
);

const Categories = () => {
  return (
    <Box sx={{ paddingY: 4, maxWidth: 1100, margin: "auto", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 4 }}>
        Kategori
      </Typography>
      <Grid container spacing={10} justifyContent="center">
        <Grid item xs={6} sm={3}>
          <FeatureCard icon={petBowl} title="Makanan" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FeatureCard icon={healthCare} title="Kesehatan" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FeatureCard icon={dogToy} title="Mainan" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FeatureCard icon={medicalKit} title="Peralatan" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Categories;
