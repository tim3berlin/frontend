import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Contsant";
import TableCart from "../components/TableCart";

const Cart = ({ cart = [], setCart, onCheckout }) => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      if (!response) {
        throw new Error("Error while fetching data");
      }
      setProducts(response.data);
    } catch (error) {
      console.error(error);
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
      <TableCart cartItems={cartItems} totalPrice={totalPrice} onClearCart={clearCart} onCheckout={onCheckout} />
    </div>
  );
};

export default Cart;
