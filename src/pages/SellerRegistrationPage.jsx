import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import apiClient from "../axios.js";

const theme = createTheme();

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  height: "100vh",
  width: "100%",
  position: "relative",
  backgroundImage: "url('/assets/background_image_3.jpg')",
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
  height: "852px",
  boxShadow: theme.shadows[5],
  paddingTop: "40px",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "60px",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: theme.spacing(3),
}));

export default function SellerRegistrationPage() {
  const [formData, setFormData] = useState({
    storeName: "",
    address: "",
    storeDomain: "",
    storeDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = Cookies.get("accessToken");
    console.log("Message:", formData);

    try {
      const response = await apiClient.post(
        "/seller/register",
        {
          nama_toko: formData.storeName,
          nama_domain: formData.storeDomain,
          alamat_lengkap: formData.address,
          deskripsi_toko: formData.storeDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Message:", response);

      setMessage("Registration successful!");
      navigate(`/dashboardseller/${formData.storeDomain}`);
    } catch (error) {
      setMessage(<Typography>User already has a registered store.</Typography>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <FormBox>
          <Box sx={{ marginTop: "150px", width: "85%" }}>
            <Title>Seller Registration</Title>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <TextField
                name="storeName"
                label="Store Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.storeName}
                onChange={handleChange}
                required
              />
              <TextField
                name="address"
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <TextField
                name="storeDomain"
                label="Store Domain (e.g. /my-store)"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.storeDomain}
                onChange={handleChange}
                required
              />
              <TextField
                name="storeDescription"
                label="Store Description"
                variant="outlined"
                fullWidth
                multiline
                minRows={4}
                margin="normal"
                value={formData.storeDescription}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Register"}
              </Button>
            </form>
            {message && (
              <Typography
                color={
                  typeof message === "string" && message.includes("failed")
                    ? "error"
                    : "primary"
                }
                sx={{ marginTop: 2, textAlign: "center" }}
              >
                {message}
              </Typography>
            )}
          </Box>
        </FormBox>
      </Wrapper>
    </ThemeProvider>
  );
}
