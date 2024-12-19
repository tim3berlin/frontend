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
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const token = Cookies.get("accessToken");
        console.log("Token from cookies:", token);

        const response = await apiClient.get("/promotions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setPromotions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching promotions:", error);
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const handleEditPromotion = (promotionId) => {
    navigate(`/editpromotion/${promotionId}`);
  };

  const handleDeletePromotion = (promotionId) => {
    setPromotionToDelete(promotionId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setPromotionToDelete(null);
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
            key={promotion.id}
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
              {`${promotion.start_date} - ${promotion.end_date}`}
            </Typography>
            <Typography sx={{ width: "20%", textAlign: "center" }}>
              {promotion.discount}%
            </Typography>
            <Box
              sx={{
                width: "15%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <StyledButton
                variant="contained"
                onClick={() => handleEditPromotion(promotion.id)}
              >
                Edit
              </StyledButton>
              <StyledButton
                variant="outlined"
                sx={{ height: "90%" }}
                onClick={() => handleDeletePromotion(promotion.id)}
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
          promotionId={promotionToDelete}
        />
      )}
    </Box>
  );
};

export default ListPromotionPage;
