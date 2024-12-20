import React from "react";
import { Box, Grid, Typography, Link, Button } from "@mui/material";
import { Facebook, Instagram, LinkedIn, YouTube, Telegram } from "@mui/icons-material";
import playnapp from "../assets/playnapp.png";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 4, px: 2 }}>
      <Box sx={{ margin: "auto", maxWidth: 1100 }}>
        <Grid container spacing={4}>
          {/* Section 1 */}
          <Grid item xs={12} md={3}>
            <Typography variant="h4" gutterBottom>
              PawShop
            </Typography>
            <Box variant="contained" sx={{ background: "none", boxShadow: "none", padding: "0" }} href="#">
              <img src={playnapp} style={{ width: "120px", height: "120px" }} />
            </Box>
          </Grid>

          {/* Section 2 */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Hewan Peliharaan
            </Typography>
            <Typography>Anjing</Typography>
            <Typography>Kucing</Typography>
            <Typography>Kelinci</Typography>
            <Typography>Hamster</Typography>
            <Typography>Burung</Typography>
          </Grid>

          {/* Section 3 */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Katrgori
            </Typography>
            <Typography>Makanan</Typography>
            <Typography>Kesehata</Typography>
            <Typography>Mainan</Typography>
            <Typography>Peralatan</Typography>
          </Grid>

          {/* Section 4 */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Terhubung dengan Kami
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link href="#" color="inherit">
                <Facebook />
              </Link>
              <Link href="#" color="inherit">
                <Instagram />
              </Link>
              <Link href="#" color="inherit">
                <LinkedIn />
              </Link>
              <Link href="#" color="inherit">
                <YouTube />
              </Link>
              <Link href="#" color="inherit">
                <Telegram />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
