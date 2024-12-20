import React from "react";
import Carousel from "../components/Carousel";
import Animal from "../components/Animal";
import Categories from "../components/Categotires";
import Bestseller from "../components/Bestseller";
import Product from "../components/Product";
import Footer from "../components/Footer";

const Home = ({ onAddCart, onRemoveCart, cart }) => {
  return (
    <div>
      <Carousel />
      <Animal />
      <Categories />
      <Bestseller onAddCart={onAddCart} onRemoveCart={onRemoveCart} cart={cart} />
      <Product onAddCart={onAddCart} onRemoveCart={onRemoveCart} cart={cart} />
      <Footer />
    </div>
  );
};

export default Home;
