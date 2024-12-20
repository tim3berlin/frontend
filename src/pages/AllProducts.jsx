import React, { useState, useEffect } from "react";
import ListProduct from "../components/ListProduct";
import Sidebar from "../components/Sidebar";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Skeleton } from "@mui/material";
import Cookies from "js-cookie";
import apiClient from "../axios.js";

const AllProduct = ({ onAddCart, onRemoveCart, cart = [] }) => {
  const { category: initialCategory } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || ""
  );
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const token = Cookies.get("accessToken");
      const response = await apiClient.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products || []);
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response || error.message
      );
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3, margin: "auto", maxWidth: 1100 }}>
        <Typography variant="h5" gutterBottom>
          Produk Terlaris
          <span role="img" aria-label="paw">
            🐾
          </span>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={2}>
            <Skeleton variant="rectangular" width="100%" height={400} />
          </Grid>
          <Grid item xs={12} sm={9} md={10}>
            <Grid container spacing={2}>
              {[...Array(6)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton variant="rectangular" width="100%" height={250} />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div
      style={{
        top: "100px",
        position: "relative",
        zIndex: 100,
        backgroundColor: "white",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ p: 3, margin: "auto", maxWidth: 1100 }}>
        <Container maxWidth="lg" disableGutters>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} md={2}>
              <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={(category) => setSelectedCategory(category)}
              />
            </Grid>
            <Grid item xs={12} sm={9} md={10}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                  gap: 3,
                }}
              >
                {products
                  .filter(
                    (product) =>
                      product.kategori === selectedCategory ||
                      selectedCategory === ""
                  )
                  .map((product) => (
                    <ListProduct
                      key={product.id}
                      id={product.id}
                      title={product.nama_produk}
                      description={product.deskripsi}
                      image={product.images[0]?.url}
                      price={product.harga}
                      onAddCart={() => onAddCart(product.id)}
                      onRemoveCart={() => onRemoveCart(product.id)}
                      inCart={cart.includes(product.id)}
                    />
                  ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default AllProduct;
