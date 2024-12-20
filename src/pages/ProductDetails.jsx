import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import Cookies from "js-cookie";
import apiClient from "../axios.js"; // Pastikan apiClient sudah di-import
import FavoriteIcon from "@mui/icons-material/Favorite"; // Import ikon hati untuk wishlist
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"; // Import ikon keranjang untuk cart

const ProductDetail = ({
  onAddCart,
  onRemoveCart,
  cart = [],
  wishlist = [],
  onUpdateWishlist,
}) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await apiClient.get(`products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details.");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Memperbarui status cart
  useEffect(() => {
    if (product && Array.isArray(cart)) {
      setInCart(cart.includes(product.id)); // Mengecek apakah produk ada di cart
    }
  }, [product, cart]);

  // Memperbarui status wishlist
  useEffect(() => {
    if (product && Array.isArray(wishlist)) {
      setIsInWishlist(wishlist.includes(product.id)); // Mengecek apakah produk ada di wishlist
    }
  }, [product, wishlist]);

  // Menambahkan produk ke wishlist
  const addToWishlist = async (productId) => {
    try {
      const token = Cookies.get("accessToken");
      await apiClient.post(
        "/wishlist/add",
        { product_id: productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdateWishlist(productId); // Update wishlist di komponen induk
    } catch (err) {
      console.error("Failed to add product to wishlist", err);
    }
  };

  // Menghapus produk dari wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const token = Cookies.get("accessToken");
      await apiClient.delete(`/wishlist/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdateWishlist(productId); // Update wishlist di komponen induk
    } catch (err) {
      console.error("Failed to remove product from wishlist", err);
    }
  };

  // Menambah produk ke keranjang atau menghapusnya
  const handleAddToCart = () => {
    if (inCart) {
      onRemoveCart(product.id);
    } else {
      onAddCart(product.id);
    }
  };

  // Menampilkan tampilan loading
  if (loading)
    return (
      <Container maxWidth="lg" sx={{ paddingY: 4, paddingTop: 17 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            sx={{ borderRadius: 2 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              flex: 1,
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Skeleton variant="text" width="80%" height={30} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={48}
                sx={{ borderRadius: 2 }}
              />
            </Box>
          </Box>
        </Card>
      </Container>
    );

  // Menampilkan error jika ada
  if (error) return <div>{error}</div>;

  return (
    product && (
      <Container maxWidth="lg" sx={{ paddingY: 4, paddingTop: 17 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CardMedia
            component="img"
            image={product.images[0]?.url}
            alt={product.nama_produk}
            sx={{
              width: { xs: "100%", md: 400 },
              height: { xs: 300, md: "auto" },
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              flex: 1,
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}
              >
                {product.nama_produk}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                {product.deskripsi}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}
              >
                ${product.harga.toFixed(2)}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                color={isInWishlist ? "error" : "primary"}
                onClick={() => {
                  if (isInWishlist) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist(product.id);
                  }
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  padding: "8px 16px",
                  fontSize: "14px",
                }}
              >
                <FavoriteIcon fontSize="small" />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>

              <Button
                variant="contained"
                color={inCart ? "error" : "primary"}
                onClick={handleAddToCart}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  padding: "8px 16px",
                  fontSize: "14px",
                }}
              >
                <AddShoppingCartIcon fontSize="small" />
                {inCart ? "Remove From Cart" : "Add To Cart"}
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
    )
  );
};

export default ProductDetail;
