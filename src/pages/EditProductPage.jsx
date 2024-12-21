import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputAdornment,
  Grid,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import apiClient from "../axios.js";

const theme = createTheme();

const EditProductContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  width: "90%",
  margin: "auto",
  marginTop: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

const FormSection = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  padding: theme.spacing(3),
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(4),
  paddingLeft: "45px",
  paddingRight: "45px",
  paddingTop: "35px",
  width: "95%",
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
    height: "35px",
    lineHeight: "normal",
    padding: "10px",
    display: "flex",
    alignItems: "center",
  },
}));

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    animalCategory: "",
    weight: "",
    photos: [],
  });

  const [formattedPrice, setFormattedPrice] = useState("");
  const token = Cookies.get("accessToken");

  const handlePhotoChange = (e, index) => {
    const newPhotos = [...product.photos];
    newPhotos[index] = e.target.files[0];
    setProduct({ ...product, photos: newPhotos });
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^\d]/g, "");
    const formattedValue = formatPrice(value);
    setProduct({ ...product, price: parseInt(numericValue, 10) });
    setFormattedPrice(formattedValue);
  };

  useEffect(() => {
    apiClient
      .get(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedProduct = response.data.product;
        setProduct({
          name: fetchedProduct.nama_produk || "",
          description: fetchedProduct.deskripsi || "",
          price: fetchedProduct.harga || "",
          stock: fetchedProduct.stok || "",
          category: fetchedProduct.kategori || "",
          animalCategory: fetchedProduct.jenis_hewan || "",
          weight: fetchedProduct.berat || "",
          photos: fetchedProduct.images || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [productId, token]);

  const storeDomain = Cookies.get("storeDomain");

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("nama_produk", product.name);
    formData.append("deskripsi", product.description);
    formData.append("harga", product.price);
    formData.append("stok", product.stock);
    formData.append("kategori", product.category);
    formData.append("jenis_hewan", product.animalCategory);
    formData.append("berat", product.weight);

    product.photos.forEach((photo, index) => {
      formData.append(`images[${index}]`, photo);
    });

    apiClient
      .put(`/seller/products/${productId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product updated:", response.data);
        navigate(`/dashboardseller/${storeDomain}/productlist`, {
          state: { updatedProduct: response.data.product },
        });
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleDiscard = () => {
    navigate(`/dashboardseller/${storeDomain}/productlist`);
  };

  return (
    <ThemeProvider theme={theme}>
      <EditProductContainer>
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
          Edit Product
        </Typography>

        <FormSection>
          <SectionTitle>Product Information</SectionTitle>

          <FormRow>
            <Box sx={{ width: "30%" }}>
              <FormLabel>Product Name</FormLabel>
              <FormDescription>
                <Typography sx={{ fontSize: "14px" }}>
                  Enter a product name with at least 25 characters. Include the
                  brand, product type, color, material, or model. Avoid
                  excessive use of capital letters.
                </Typography>
              </FormDescription>
            </Box>
            <Box sx={{ width: "80%", marginLeft: "180px" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
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
            <Box sx={{ width: "30%" }}>
              <FormLabel>Animal Category</FormLabel>
              <FormDescription>
                <Typography sx={{ fontSize: "14px" }}>
                  Select the animal category that best fits your product.
                </Typography>
              </FormDescription>
            </Box>
            <Box sx={{ width: "65%" }}>
              <FormControl fullWidth>
                <StyledSelect
                  variant="outlined"
                  value={product.animalCategory}
                  onChange={(e) =>
                    setProduct({ ...product, animalCategory: e.target.value })
                  }
                  sx={{ width: "100%", marginLeft: "10px", height: "55px" }}
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
            <Box sx={{ width: "30%" }}>
              <FormLabel>Category</FormLabel>
              <FormDescription>
                <Typography sx={{ fontSize: "14px" }}>
                  Select the most relevant category for your product.
                </Typography>
              </FormDescription>
            </Box>
            <Box sx={{ width: "65%" }}>
              <FormControl fullWidth>
                <StyledSelect
                  variant="outlined"
                  value={product.category}
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                  sx={{ width: "100%", marginLeft: "10px", height: "55px" }}
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
            <Box sx={{ width: "30%" }}>
              <FormLabel>Product Photo</FormLabel>
              <FormDescription>
                <Typography sx={{ fontSize: "14px" }}>
                  Upload a product photo in .jpg, .jpeg, or .png format.
                </Typography>
              </FormDescription>
            </Box>
            <Box sx={{ width: "65%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {product.photos[0] ? (
                  <img
                    src={`/images/${product.photos[0]}`}
                    alt="Product"
                    style={{
                      width: "100%",
                      maxHeight: "150px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      document.getElementById("photo-upload").click()
                    }
                  />
                ) : (
                  <Typography>No photo available</Typography>
                )}
                <input
                  id="photo-upload"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  style={{ display: "none" }}
                  onChange={handlePhotoChange}
                />
              </Box>
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
              sx={{ width: "65%", height: "90%", backgroundColor: "#EDF8FF" }}
            >
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
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
            <Box sx={{ width: "65%" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={product.price}
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
            <Box sx={{ width: "65%" }}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: e.target.value })
                }
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
            <Box sx={{ width: "65%" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={product.weight}
                onChange={(e) =>
                  setProduct({ ...product, weight: e.target.value })
                }
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
            alignItems: "right",
            justifyContent: "right",
            gap: "20px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleDiscard();
            }}
          >
            Discard Changes
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSubmit();
              console.log("Save product changes", product);
            }}
          >
            Save Changes
          </Button>
        </Box>
      </EditProductContainer>
    </ThemeProvider>
  );
};

export default EditProductPage;
