import React, { useState, useEffect } from "react";
import ListProduct from "../components/ListProduct";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import useFilterData from "../Context/useFilterData";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";

const AllProduct = ({ onAddCart, onRemoveCart, cart = [] }) => {
  const { category: initialCategory } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "");
  const { products } = useFilterData(selectedCategory);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Typography>Loading categories...</Typography>;
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
            {/* Sidebar */}
            <Grid item xs={12} sm={3} md={2}>
              <Sidebar categories={categories} selectedCategory={selectedCategory} onCategorySelect={(category) => setSelectedCategory(category)} />
            </Grid>

            {/* Main Content */}
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
                {products.map((product) => (
                  <ListProduct
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    image={product.image}
                    price={product.price}
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
