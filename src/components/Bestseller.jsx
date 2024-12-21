import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, Skeleton } from "@mui/material";
import ListProduct from "../components/ListProduct";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import apiClient from "../axios.js";

const Bestseller = ({ onAddCart, onRemoveCart, cart = [] }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const token = Cookies.get("accessToken");
      const response = await apiClient.get("products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error.response || error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <Box sx={{ margin: "auto", maxWidth: 1100, marginY: 4 }}>
        <Typography variant="h5" gutterBottom>
          Produk Terlaris{" "}
          <span role="img" aria-label="paw">
            🐾
          </span>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rectangular" width="100%" height={300} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              {[...Array(6)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <Box sx={{ margin: "auto", maxWidth: 1100, marginY: 4 }}>
      <Typography variant="h5" gutterBottom>
        Produk Terlaris{" "}
        <span role="img" aria-label="paw">
          🐾
        </span>
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              backgroundColor: "#3AB4F2",
              padding: 3,
              borderRadius: 2,
              display: "flex",
              maxHeight: "100%",
              flexDirection: "column",
              alignItems: "left",
              textAlign: "left",
            }}
          >
            <Box sx={{ color: "white" }}>
              <Typography variant="h6" fontWeight="bold">
                Kategori Anjing
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Semua kebutuhan Anjing kesayangan
              </Typography>
            </Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="error"
              sx={{
                marginTop: 3,
                backgroundColor: "#F2DF3A",
                padding: "4px 10px",
                borderRadius: "5px",
              }}
            >
              50% Off
            </Typography>
            <Box component="img" src="https://via.placeholder.com/200" alt="Dog Food Banner" sx={{ width: "100%", marginTop: 2 }} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            {products.slice(0, 6).map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ListProduct
                  id={product.id}
                  title={product.nama_produk}
                  description={product.deskripsi}
                  image={product.images[0]?.url}
                  price={product.harga}
                  onAddCart={() => onAddCart(product.id)}
                  onRemoveCart={() => onRemoveCart(product.id)}
                  inCart={Array.isArray(cart) && cart.includes(product.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Bestseller;
