import React from "react";
import ListProduct from "./ListProduct";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import useFilterData from "../Context/useFilterData";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ProductButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  color: "#fffff",
});
const Product = ({ onAddCart, onRemoveCart, cart = [] }) => {
  const { category } = useParams();
  const { products } = useFilterData(category ?? "");

  return (
    <Box sx={{ py: 4, maxWidth: 1100, mx: "auto", px: 0 }}>
      <Typography variant="h5" gutterBottom>
        Produk Terlaris
        <span role="img" aria-label="paw">
          🐾
        </span>
      </Typography>
      <CssBaseline />
      <Container maxWidth="lg" disableGutters>
        <Grid container spacing={4} py={2}>
          {products.slice(0, 10).map((product) => (
            <Grid item xs={12} sm={6} md={2.4} key={product.id}>
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
      </Container>
      <Box sx={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
        <ProductButton variant="contained" disableRipple>
          <Link href="/Product" underline="none" color="inherit">
            Produk Lainnya
          </Link>
        </ProductButton>
      </Box>
    </Box>
  );
};

export default Product;
