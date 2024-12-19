import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import ShipmentStatusModal from "../modals/ShipmentStatusModal";
import CompleteOrderModal from "../modals/CompleteOrderModal";
import { styled } from "@mui/material/styles";

const Column = styled(Box)(({ theme }) => ({
  flex: 1,
  margin: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: "85vh",
  borderRadius: "8px",
  boxShadow: theme.shadows[2],
  textAlign: "center",
}));

const CardStyled = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  cursor: "pointer",
  textAlign: "center",
  padding: theme.spacing(0),
  border: `2px solid #0078AA`,
  borderRadius: "10px",

  boxShadow: theme.shadows[2],
}));

const initialOrders = [
  {
    id: 1,
    title: "Order 1",
    status: "Pending Shipment",
    products: [
      { name: "Product 1", quantity: 1, price: 20000 },
      { name: "Product 2", quantity: 2, price: 30000 },
    ],
    total: 80000,
  },
  {
    id: 2,
    title: "Order 2",
    status: "Pending Shipment",
    products: [
      { name: "Product 3", quantity: 1, price: 75000 },
      { name: "Product 4", quantity: 3, price: 20000 },
    ],
    total: 135000,
  },
  {
    id: 3,
    title: "Order 3",
    status: "Shipped",
    products: [{ name: "Product 5", quantity: 1, price: 60000 }],
    total: 60000,
  },
];

const formatRupiah = (amount) => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const OrderCard = ({ order, onClick }) => (
  <CardStyled onClick={onClick}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "10px" }}>
        {order.title}
      </Typography>
      <Divider />
      <Typography
        variant="body1"
        sx={{
          marginTop: "10px",
          marginBottom: order.products.length > 1 ? 0 : "10px",
        }}
      >
        {order.products[0].name}
      </Typography>
      {order.products.length > 1 && (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginBottom: "10px" }}
        >
          with {order.products.length - 1} other product
          {order.products.length > 2 ? "s" : ""}
        </Typography>
      )}
      <Divider />
      <Typography
        variant="body1"
        sx={{ marginTop: "15px", marginBottom: "-5px" }}
      >
        Total: {formatRupiah(order.total)}
      </Typography>
    </CardContent>
  </CardStyled>
);

const OrderColumn = ({ titleComponent, orders, onCardClick }) => (
  <Column>
    {titleComponent}
    <Divider sx={{ marginBottom: 3, display: "block" }} />
    {orders.map((order) => (
      <OrderCard
        key={order.id}
        order={order}
        onClick={() => onCardClick(order)}
      />
    ))}
  </Column>
);

export default function StoreAnalyticsPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isShipmentModalOpen, setShipmentModalOpen] = useState(false);
  const [isCompleteModalOpen, setCompleteModalOpen] = useState(false);

  const handleOpenShipmentModal = (order) => {
    setSelectedOrder(order);
    setShipmentModalOpen(true);
  };

  const handleOpenCompleteModal = (order) => {
    setSelectedOrder(order);
    setCompleteModalOpen(true);
  };

  const handleShipmentSubmit = (status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status } : order
      )
    );
    setShipmentModalOpen(false);
  };

  const handleCompleteSubmit = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, status: "Completed Orders" }
          : order
      )
    );
    setCompleteModalOpen(false);
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <OrderColumn
        titleComponent={
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ marginBottom: "15px" }}
          >
            Pending Shipment
          </Typography>
        }
        orders={orders.filter((order) => order.status === "Pending Shipment")}
        onCardClick={handleOpenShipmentModal}
      />
      <OrderColumn
        titleComponent={
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ marginBottom: "15px" }}
          >
            Shipped
          </Typography>
        }
        orders={orders.filter((order) => order.status === "Shipped")}
        onCardClick={handleOpenCompleteModal}
      />
      <OrderColumn
        titleComponent={
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ marginBottom: "15px" }}
          >
            Completed Orders
          </Typography>
        }
        orders={orders.filter((order) => order.status === "Completed Orders")}
      />
      {selectedOrder && (
        <ShipmentStatusModal
          open={isShipmentModalOpen}
          onClose={() => setShipmentModalOpen(false)}
          onSubmit={handleShipmentSubmit}
          order={selectedOrder}
        />
      )}
      {selectedOrder && (
        <CompleteOrderModal
          open={isCompleteModalOpen}
          onClose={() => setCompleteModalOpen(false)}
          onSubmit={handleCompleteSubmit}
          order={selectedOrder}
        />
      )}
    </Box>
  );
}
