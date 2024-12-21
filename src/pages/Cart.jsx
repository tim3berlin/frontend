import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiClient from "../axios.js";
import TableCart from "../components/TableCart";

const Cart = ({ cart = [], setCart, onCheckout }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const token = Cookies.get("accessToken");
      const response = await apiClient.get("cart/items", {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.cart || []);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cartItems = Array.isArray(cart) ? products.filter((product) => cart.some((item) => item.product_id === product.id)) : [];

  const totalPrice = cartItems.reduce((total, product) => {
    const item = cart.find((item) => item.product_id === product.id);
    return total + product.price * (item?.quantity || 1);
  }, 0);

  const clearCart = () => {
    if (typeof setCart === "function") {
      setCart([]);
    } else {
      console.error("setCart is not a function");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        width: "100vw",
        position: "fixed",
        top: "100px",
        zIndex: 100,
        backgroundColor: "white",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TableCart cartItems={cartItems} totalPrice={totalPrice} onClearCart={clearCart} onCheckout={onCheckout} />
    </div>
  );
};

export default Cart;
