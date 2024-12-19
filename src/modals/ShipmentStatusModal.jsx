import React from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ModalWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 24,
  padding: theme.spacing(4),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#0078AA",
  color: "#FFFFFF",
}));

export default function ShipmentStatusModal({
  open,
  onClose,
  onSubmit,
  order,
}) {
  const [status, setStatus] = React.useState(order.status);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(status);
    onClose();
  };

  const formatRupiah = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalWrapper>
        <Typography variant="h6" align="center" fontWeight="bold">
          Update Shipment Status
        </Typography>
        <Divider sx={{ margin: "10px 0" }} />
        <Box>
          {order.products.map((product, index) => (
            <Box key={index} display="flex" justifyContent="space-between">
              <Typography>{product.name}</Typography>
              <Typography>
                {product.quantity} x {formatRupiah(product.price)}
              </Typography>
            </Box>
          ))}
          <Typography
            variant="body1"
            fontWeight="bold"
            textAlign="right"
            sx={{ marginTop: "5px" }}
          >
            Total: {formatRupiah(order.total)}
          </Typography>
        </Box>
        <Divider sx={{ margin: "10px 0" }} />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Shipment Status</InputLabel>
          <Select
            value={status}
            onChange={handleChange}
            label="Shipment Status"
          >
            <MenuItem value="Pending Shipment">Pending Shipment</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="center" width="100%">
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </Box>
      </ModalWrapper>
    </Modal>
  );
}
