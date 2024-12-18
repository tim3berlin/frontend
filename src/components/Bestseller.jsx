import React from "react";
import { Box, Grid, Typography, Button, Card, CardMedia, CardContent, Chip, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import ListProduct from "../components/ListProduct";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import useFilterData from "../Context/useFilterData";
import { useParams } from "react-router-dom";

const Bestseller = ({ onAddCart, onRemoveCart, cart = [] }) => {
  const { category } = useParams();
  const { products } = useFilterData(category ?? "");
  return (
    <Box sx={{ margin: "auto", maxWidth: 1100, marginY: 4 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom>
        Produk Terlaris{" "}
        <span role="img" aria-label="paw">
          🐾
        </span>
      </Typography>

      <Grid container spacing={2}>
        {/* Left Banner */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              backgroundColor: "#d8f8a7",
              padding: 3,
              borderRadius: 2,
              display: "flex",
              maxHeight: "100%",
              flexDirection: "column",
              alignItems: "left",
              textAlign: "left",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Kategori Anjing
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Semua kebutuhan Anjing kesayangan
            </Typography>
            <Button variant="contained" color="primary" sx={{ borderRadius: 20, textTransform: "none" }}>
              Beli Sekarang
            </Button>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="error"
              sx={{
                marginTop: 3,
                backgroundColor: "yellow",
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
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  price={product.price}
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
