import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInSide from "./pages/SignInSide";
import SignUpSide from "./pages/SignUpSide";
import PinUser from "./pages/PinUser";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";
import AllProduct from "./pages/AllProducts";
import { useState } from "react";

const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (id) => {
    setCart((prevCart) => [...prevCart, id]);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item !== id));
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home onAddCart={handleAddToCart} onRemoveCart={handleRemoveFromCart} cart={cart} />} />
        <Route path="/register" element={<SignUpSide />} />
        <Route path="/pin" element={<PinUser />} />
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/product" element={<AllProduct onAddCart={handleAddToCart} onRemoveCart={handleRemoveFromCart} cart={cart} />} />
        <Route path="/product/:id" element={<ProductDetail onAddCart={handleAddToCart} onRemoveCart={handleRemoveFromCart} cart={cart} />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
