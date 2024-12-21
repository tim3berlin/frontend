import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputAdornment,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Cookies from "js-cookie";
import apiClient from "../axios.js";

const theme = createTheme();

const AddProductContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  width: "95%",
  margin: "auto",
  marginTop: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

const FormSection = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: theme.spacing(3),
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(4),
  paddingLeft: "45px",
  paddingRight: "45px",
  paddingTop: "35px",
  width: "100%",
  textAlign: "left",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.25rem",
  marginBottom: theme.spacing(2),
}));

const FormLabel = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const FormDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}));

const FormRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  ".MuiSelect-select": {
    backgroundColor: "#EDF8FF",
    borderRadius: "4px",
    color: "black",
    lineHeight: "normal",
    padding: "15px",
    display: "flex",
    alignItems: "center",
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddProductPage = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [animalCategory, setAnimalCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [images, setImages] = useState([]);
  const [formattedPrice, setFormattedPrice] = useState("");

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^\d]/g, "");
    const formattedValue = formatPrice(value);
    setPrice(parseInt(numericValue, 10));
    setFormattedPrice(formattedValue);
  };

  const handleFileChange = (event) => {
    setImages(event.target.files);
  };

  const token = Cookies.get("accessToken");
  const storeDomain = Cookies.get("store_domain") || "";

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("nama_produk", productName);
    formData.append("deskripsi", description);
    formData.append("harga", price);
    formData.append("stok", stock);
    formData.append("kategori", category);
    formData.append("jenis_hewan", animalCategory);
    formData.append("berat", weight);
    Array.from(images).forEach((file) => formData.append("images", file));

    if (!token || !storeDomain) {
      console.error("Missing token or store domain.");
      return;
    }

    try {
      await apiClient.post("/seller/create-products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Products created successfully!");
      navigate(`/dashboardseller/${storeDomain}`);
    } catch (error) {
      console.error("Failed to add product:", error);

      alert("An error occurred while creating the product.");
    }
  };

  const handleCancel = () => {
    navigate(`/dashboardseller/${storeDomain}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <AddProductContainer>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          Add Product
        </Typography>

        <FormSection>
          <SectionTitle>Product Information</SectionTitle>
          <FormRow>
            <Box sx={{ width: "25%" }}>
              <FormLabel>Product Name</FormLabel>
              <FormDescription>
                <Typography sx={{ fontSize: "14px" }}>
                  Enter a product name with at least 25 characters. Include the
                  brand, product type, color, material, or model. Avoid
                  excessive use of capital letters.
                </Typography>
              </FormDescription>
            </Box>
            <Box sx={{ width: "1015px", marginLeft: "10px" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                inputProps={{
                  style: {
                    width: "100%",
                    height: "20px",
                    backgroundColor: "#EDF8FF",
                    color: "black",
                  },
                }}
              />
            </Box>
          </FormRow>
          <FormRow>
            <Box sx={{ width: "25%" }}>
              <FormLabel>Animal Category</FormLabel>
              <FormDescription>
                <Typography sx={{ fontSize: "14px" }}>
                  Select the animal category that best fits your product.
                </Typography>
              </FormDescription>
            </Box>
            <Box sx={{ width: "70%" }}>
              <FormControl fullWidth>
                <StyledSelect
                  variant="outlined"
                  value={animalCategory}
                  onChange={(e) => setAnimalCategory(e.target.value)}
                  sx={{ width: "99%", marginLeft: "10px", height: "55px" }}
                >
                  <MenuItem value="anjing">Dog</MenuItem>
                  <MenuItem value="kucing">Cat</MenuItem>
                  <MenuItem value="burung">Bird</MenuItem>
                  <MenuItem value="hamster">Hamster</MenuItem>
                  <MenuItem value="kelinci">Rabbit</MenuItem>
                </StyledSelect>
              </FormControl>
            </Box>
          </FormRow>
          <FormRow>
            <Box sx={{ width: "25%" }}>
              <FormLabel>Category</FormLabel>
              <FormDescription>
                <Typography sx={{ fontSize: "14px" }}>
                  Select the most relevant category for your product.
                </Typography>
              </FormDescription>
            </Box>
            <Box sx={{ width: "70%" }}>
              <FormControl fullWidth>
                <StyledSelect
                  variant="outlined"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{ width: "99%", marginLeft: "10px", height: "55px" }}
                >
                  <MenuItem value="makanan">Food and Treats</MenuItem>
                  <MenuItem value="kesehatan">
                    Medicine and Supplements
                  </MenuItem>
                  <MenuItem value="mainan">Toys</MenuItem>
                  <MenuItem value="peralatan">Tools</MenuItem>
                </StyledSelect>
              </FormControl>
            </Box>
          </FormRow>
        </FormSection>

        <FormSection>
          <SectionTitle>Product Details</SectionTitle>
          <FormRow>
            <Box sx={{ width: "25%" }}>
              <FormLabel>Product Photos</FormLabel>
              <FormDescription>
                <Typography sx={{ fontSize: "14px" }}>
                  Upload a product photo in .jpg, .jpeg, or .png format.
                </Typography>
              </FormDescription>
            </Box>
            <Box
              sx={{
                width: "70%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ marginLeft: "10px" }}
              >
                Upload Images
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  multiple
                />
              </Button>
            </Box>
          </FormRow>

          <FormRow>
            <Box sx={{ width: "30%" }}>
              <FormLabel>Product Description</FormLabel>
              <FormDescription>
                <Typography sx={{ fontSize: "14px", maxWidth: "400px" }}>
                  Provide a detailed explanation of your product to make it easy
                  for buyers to understand and find your listing. Do not include
                  links or promotional information.
                </Typography>
              </FormDescription>
            </Box>
            <Box
              sx={{ width: "70%", height: "90%", backgroundColor: "#EDF8FF" }}
            >
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{
                  style: { color: "black" },
                }}
              />
            </Box>
          </FormRow>
        </FormSection>

        <FormSection>
          <SectionTitle>Pricing</SectionTitle>
          <FormRow>
            <Box sx={{ width: "30%" }}>
              <FormLabel>Unit Price</FormLabel>
              <FormDescription>
                <Typography sx={{ fontSize: "14px" }}>
                  Enter the price for a single unit of the product.
                </Typography>
              </FormDescription>
            </Box>
            <Box sx={{ width: "70%" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={formattedPrice}
                onChange={handlePriceChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rp</InputAdornment>
                  ),
                  style: { color: "black", backgroundColor: "#EDF8FF" },
                }}
              />
            </Box>
          </FormRow>
        </FormSection>

        <FormSection>
          <SectionTitle>Product Management</SectionTitle>
          <FormRow>
            <Box sx={{ width: "30%" }}>
              <FormLabel>Stock Quantity</FormLabel>
              <FormDescription>
                <Typography sx={{ fontSize: "14px" }}>
                  Enter the current stock quantity of this product.
                </Typography>
              </FormDescription>
            </Box>
            <Box sx={{ width: "70%" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                inputProps={{
                  style: {
                    height: "20px",
                    backgroundColor: "#EDF8FF",
                    color: "black",
                  },
                }}
              />
            </Box>
          </FormRow>
          <FormRow>
            <Box sx={{ width: "30%" }}>
              <FormLabel>Weight</FormLabel>
              <FormDescription>
                <Typography sx={{ fontSize: "14px" }}>
                  Enter the product's weight.
                </Typography>
              </FormDescription>
            </Box>
            <Box sx={{ width: "70%" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">G</InputAdornment>
                  ),
                  style: { color: "black", backgroundColor: "#EDF8FF" },
                }}
              />
            </Box>
          </FormRow>
        </FormSection>

        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancel}
            sx={{
              height: "40px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{
              height: "40px",
            }}
          >
            Save
          </Button>
        </Box>
      </AddProductContainer>
    </ThemeProvider>
  );
};

export default AddProductPage;
