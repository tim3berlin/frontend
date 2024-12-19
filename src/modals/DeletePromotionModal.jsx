import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  styled,
} from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: "10px",
  width: "80px",
  backgroundColor: "#0078AA",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#005f8b",
  },
}));

const DeletePromotionModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ marginBottom: "-10px" }}>
        Are you sure you want to delete this promotion?
      </DialogTitle>
      <DialogActions sx={{ justifyContent: "center" }}>
        <StyledButton onClick={onClose}>No</StyledButton>
        <StyledButton onClick={onConfirm}>Yes</StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePromotionModal;
