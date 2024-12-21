import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Switch,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteProductModal from "../modals/DeleteProductModal";
import apiClient from "../axios.js";
import Cookies from "js-cookie";

const StyledSelect = styled(Select)({
  backgroundColor: "#EDF8FF",
  borderRadius: "4px",
  width: "50%",
  marginLeft: "8px",
  height: "40px",
});

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "10px",
  backgroundColor: "#0078AA",
  color: "#FFFFFF",
}));

const ListProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedPromotions, setSelectedPromotions] = useState({});
  const [enabledDropdowns, setEnabledDropdowns] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await apiClient.get("/seller/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.products || []);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response || error.message
        );
      }
    };
    const fetchPromotions = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await apiClient.get("/promotions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPromotions(response.data.promotions || []);
      } catch (error) {
        console.error(
          "Error fetching promotions:",
          error.response || error.message
        );
      }
    };

    fetchProducts();
    fetchPromotions();
  }, [location.state?.refresh]);

  const handleEdit = (productId) => {
    navigate(`/editproduct/${productId}`, { state: { refresh: true } });
  };

  const handleDelete = (productId) => {
    setProductToDelete(productId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = async () => {
    try {
      const token = Cookies.get("accessToken");
      await apiClient.delete(`/seller/products/${productToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter((product) => product.id !== productToDelete));

      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting product:", error.response || error.message);
    }
  };

  const handlePromotionChange = (productId, promotionId) => {
    setSelectedPromotions((prev) => ({
      ...prev,
      [productId]: promotionId,
    }));
  };

  const handleSwitchChange = (productId) => {
    setEnabledDropdowns((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
    if (enabledDropdowns[productId]) {
      setSelectedPromotions((prev) => ({
        ...prev,
        [productId]: null,
      }));
    }
  };

  const getDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  return (
    <Box sx={{ padding: "20px" }}>
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
        Product List
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#F5F5F5",
          padding: "10px",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        <Typography sx={{ width: "25%", textAlign: "center" }}>
          Product Name
        </Typography>
        <Typography sx={{ width: "15%", textAlign: "center" }}>
          Price
        </Typography>
        <Typography sx={{ width: "10%", textAlign: "center" }}>
          Stock
        </Typography>
        <Typography sx={{ width: "35%", textAlign: "center" }}>
          Add Promotion
        </Typography>
        <Typography sx={{ width: "15%", textAlign: "center" }}>
          Actions
        </Typography>
      </Box>

      {products.length > 0 ? (
        products.map((product) => {
          const promotionId = selectedPromotions[product.id];
          const promotion = promotions.find(
            (promo) => promo.id === promotionId
          );
          const discountedPrice = promotion
            ? getDiscountedPrice(product.harga, promotion.discount)
            : null;
          const formattedPrice = product.harga
            ? product.harga.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            : "N/A";
          const formattedDiscountedPrice = discountedPrice
            ? discountedPrice.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            : null;

          return (
            <Box
              key={product.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #ddd",
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: "25%", textAlign: "center" }}>
                {product.nama_produk}
              </Typography>
              <Typography sx={{ width: "15%", textAlign: "center" }}>
                {enabledDropdowns[product.id] && promotion ? (
                  <>
                    <span
                      style={{ textDecoration: "line-through", color: "red" }}
                    >
                      {formattedPrice}
                    </span>
                    &nbsp;&nbsp;<span>{formattedDiscountedPrice}</span>
                  </>
                ) : (
                  formattedPrice
                )}
              </Typography>
              <Typography
                sx={{ width: "10%", textAlign: "center", color: "black" }}
              >
                {product.stok}
              </Typography>
              <Box
                sx={{
                  width: "35%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Switch
                  checked={!!enabledDropdowns[product.id]}
                  onChange={() => handleSwitchChange(product.id)}
                />
                <StyledSelect
                  value={selectedPromotions[product.id] || ""}
                  onChange={(e) =>
                    handlePromotionChange(product.id, e.target.value)
                  }
                  disabled={!enabledDropdowns[product.id]}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Promotion
                  </MenuItem>
                  {promotions.map((promotion) => (
                    <MenuItem key={promotion.id} value={promotion.id}>
                      {promotion.promotion_name} - {promotion.discount}%
                    </MenuItem>
                  ))}
                </StyledSelect>
              </Box>
              <Box
                sx={{ width: "15%", display: "flex", justifyContent: "center" }}
              >
                <StyledButton onClick={() => handleEdit(product.id)}>
                  Edit
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  sx={{ height: "90%" }}
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </StyledButton>
              </Box>
            </Box>
          );
        })
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No products found.
        </Typography>
      )}

      {productToDelete && (
        <DeleteProductModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteProduct}
        />
      )}
    </Box>
  );
};

export default ListProductPage;
