import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Container, Typography, Grid, Card, CardContent, Button, Divider, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([
    { id: 1, title: "Home", details: "375 Subidbazaar, MA 2351\n435 Bristol, MA 2351", phone: "+17804084466" },
    { id: 2, title: "Office", details: "645 Bondorbazaar, MA 2351\n968 Brockton, MA 2351", phone: "+18334271710" },
    { id: 3, title: "Office 2", details: "324 Ambarkhana, MA 2351\n777 Kazi, MA 2351", phone: "+17754739407" },
  ]);

  const [selectedCard, setSelectedCard] = useState(1);
  const [voucher, setVoucher] = useState("");
  const location = useLocation();
  const { cartItems = [], totalPrice = 0 } = location.state || {};
  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          <span style={{ color: "red", fontWeight: "bold" }}>1</span> Delivery Address
        </Typography>
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>

              {cartItems.map((item) => (
                <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "16px",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography sx={{ textAlign: "left" }}>{item.title}</Typography>
                  <Typography>${item.price.toFixed(2)}</Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                <Typography>Total</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Box>

      {/* Delivery Address */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          <span style={{ color: "red", fontWeight: "bold" }}>2</span> Delivery Address
        </Typography>

        <Grid container spacing={2}>
          {addresses.map((address) => (
            <Grid item xs={12} md={4} key={address.id}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                  padding: 2,
                  position: "relative",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {address.title}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {address.details}
                </Typography>
                <Typography variant="caption">{address.phone}</Typography>

                <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} md={4}>
            <Button variant="outlined" fullWidth startIcon={<AddIcon />} sx={{ height: "100%", borderStyle: "dashed" }}>
              Add New Address
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Payment Details */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          <span style={{ color: "red", fontWeight: "bold" }}>3</span> Payment Details
        </Typography>

        <Grid container spacing={2}>
          {["**** **** **** 4765", "**** **** **** 5432", "**** **** **** 4543"].map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                onClick={() => setSelectedCard(index)}
                sx={{
                  cursor: "pointer",
                  border: selectedCard === index ? "2px solid red" : "1px solid lightgray",
                  padding: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {index === 0 ? "AMEX" : index === 1 ? "MasterCard" : "VISA"}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {card}
                </Typography>
                <Typography variant="caption">Jaslynn Land</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <TextField label="Enter voucher code here" variant="outlined" size="small" value={voucher} onChange={(e) => setVoucher(e.target.value)} />
          <Button variant="contained" color="error">
            Apply
          </Button>
        </Box>
      </Box>

      {/* Place Order */}
      <Button variant="contained" color="error" fullWidth sx={{ fontWeight: "bold", fontSize: "1rem", py: 1.5 }} onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </Container>
  );
};

export default CheckoutPage;
