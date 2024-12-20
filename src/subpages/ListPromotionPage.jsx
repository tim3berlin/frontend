import React, { useState, useEffect } from "react";
import { Box, Typography, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeletePromotionModal from "../modals/DeletePromotionModal";
import apiClient from "../axios.js";
import Cookies from "js-cookie";

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "10px",
  backgroundColor: "#0078AA",
  color: "#FFFFFF",
}));

const ListPromotionPage = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("accessToken");
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const token = Cookies.get("accessToken");

        const response = await apiClient.get("/promotions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setPromotions(response.data.promotions || []);
        console.log("Response from API:", response.data.promotions);

        const formattedPromotions = response.data.promotions.map(
          (promotions) => ({
            id: promotions.id || "",
            promotionName: promotions.promotion_name || "",
            periodStart: promotions.promotion_period_start || "",
            periodEnd: promotions.promotion_period_end || "",
            discount: promotions.discount_percent || "",
          })
        );

        setPromotions(formattedPromotions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching promotions:", error);
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [token]);

  const handleDeletePromotion = (promotionId) => {
    setPromotionToDelete(promotionId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setPromotionToDelete(null);
  };

  const handleConfirmDeletePromotion = async () => {
    try {
      await apiClient.delete(`/promotions/${promotionToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setPromotions(
        promotions.filter((promotion) => promotion.id !== promotionToDelete)
      );
      setOpenDeleteModal(false);
      setPromotionToDelete(null);
    } catch (error) {
      console.error("Error deleting promotion:", error);
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading promotions...</Typography>;
  }

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
        Promotion List
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
        <Typography sx={{ width: "30%", textAlign: "center" }}>
          Promotion Name
        </Typography>
        <Typography sx={{ width: "30%", textAlign: "center" }}>
          Period
        </Typography>
        <Typography sx={{ width: "20%", textAlign: "center" }}>
          Discount
        </Typography>
        <Typography sx={{ width: "15%", textAlign: "center" }}>
          Actions
        </Typography>
      </Box>

      {promotions.length > 0 ? (
        promotions.map((promotion) => (
          <Box
            key={promotions.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #ddd",
              alignItems: "center",
            }}
          >
            <Typography sx={{ width: "30%", textAlign: "center" }}>
              {promotion.promotion_name}
            </Typography>
            <Typography sx={{ width: "30%", textAlign: "center" }}>
              {`${promotion.promotion_period_start} - ${promotion.promotion_period_end}`}
            </Typography>
            <Typography sx={{ width: "20%", textAlign: "center" }}>
              {promotion.discount_percent}%{" "}
            </Typography>
            <Box
              sx={{
                width: "15%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <StyledButton
                variant="outlined"
                sx={{ height: "90%" }}
                onClick={() => handleDeletePromotion(promotions.id)}
              >
                Delete
              </StyledButton>
            </Box>
          </Box>
        ))
      ) : (
        <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
          No promotions available
        </Typography>
      )}

      {promotionToDelete && (
        <DeletePromotionModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDeletePromotion}
        />
      )}
    </Box>
  );
};

export default ListPromotionPage;
