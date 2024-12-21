import React, { useEffect, useState } from "react";
import axios from "axios";
import TableCart from "../components/TableCart";
import Cookies from "js-cookie";
import apiClient from "../axios.js";

const Cart = ({ cart = [], setCart, onCheckout }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const API_URL = "https://objective-maddi-harisafriansyah-03974b59.koyeb.app/cart/items";

  const fetchData = async () => {
    try {
      const token = Cookies.get("accessToken");
      const response = await apiClient.get(`/cart/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(response.data.product);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load products. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cartItems = Array.isArray(cart) ? products.filter((product) => cart.includes(product.id)) : [];
  const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);

  const clearCart = () => {
    if (typeof setCart === "function") {
      setCart([]);
    } else {
      console.error("setCart is not a function");
    }
  };

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
      {error ? <div style={{ color: "red", padding: "10px" }}>{error}</div> : <TableCart cartItems={cartItems} totalPrice={totalPrice} onClearCart={clearCart} onCheckout={onCheckout} />}
    </div>
  );
};

export default Cart;
