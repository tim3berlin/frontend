import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardMedia } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const TableCart = ({ totalPrice = 0, cartItems = [], onClearCart = () => {} }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems, totalPrice } }); // Pass data to checkout
  };

  return (
    <Container>
      <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <CardMedia component="img" alt={item.title} sx={{ height: 100, objectFit: "contain" }} image={item.image} />
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No items in the cart.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {cartItems.length > 0 && (
              <>
                <TableRow>
                  <TableCell />
                  <TableCell colSpan={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Total
                    </Typography>
                  </TableCell>
                  <TableCell>${totalPrice.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    <Button variant="contained" color="error" size="medium" onClick={onClearCart} sx={{ marginRight: 1 }}>
                      Clear Cart
                    </Button>
                    <Button variant="contained" color="primary" size="medium" onClick={handleCheckout}>
                      Checkout
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableCart;
