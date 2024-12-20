import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AllProduct from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";
import {
  LogInPage,
  InputEmailPage,
  VerificationPage,
  SellerRegistrationPage,
  SellerDashboardPage,
  EditProductPage,
  EditPromotionPage,
} from "./pages";
import AddProductPage from "./subpages/AddProductPage";
import AddPromotionPage from "./subpages/AddPromotionPage";
import ListProductPage from "./subpages/ListProductPage";
import ListPromotionPage from "./subpages/ListPromotionPage";
import StoreAnalyticsPage from "./subpages/StoreAnalyticsPage";
import { AuthProvider } from "./hooks/authContext";

const AppContent = () => {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  // Halaman di mana navbar tidak muncul
  const noNavbarPaths = ["/login", "/register", "/verification"];

  const shouldShowNavbar = !noNavbarPaths.includes(location.pathname);

  const handleAddToCart = (id) => {
    setCart((prevCart) => [...prevCart, id]);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item !== id));
  };

  return (
    <>
      {shouldShowNavbar && <Navbar cartCount={cart.length} />}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Home
              onAddCart={handleAddToCart}
              onRemoveCart={handleRemoveFromCart}
              cart={cart}
            />
          }
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route
          path="/product"
          element={
            <AllProduct
              onAddCart={handleAddToCart}
              onRemoveCart={handleRemoveFromCart}
              cart={cart}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              onAddCart={handleAddToCart}
              onRemoveCart={handleRemoveFromCart}
              cart={cart}
            />
          }
        />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/register" element={<InputEmailPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/registerseller" element={<SellerRegistrationPage />} />
        <Route
          path="/dashboardseller/:domain"
          element={<SellerDashboardPage />}
        >
          <Route path="addproduct" element={<AddProductPage />} />
          <Route path="productlist" element={<ListProductPage />} />
          <Route path="addpromotion" element={<AddPromotionPage />} />
          <Route path="promotionlist" element={<ListPromotionPage />} />
          <Route path="storeanalytics" element={<StoreAnalyticsPage />} />
        </Route>
        <Route path="/editproduct/:productId" element={<EditProductPage />} />
        <Route
          path="/editpromotion/:promotionId"
          element={<EditPromotionPage />}
        />
      </Routes>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;

// Dengan Protected Route
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {
//   LogInPage,
//   PinUserPage,
//   InputEmailPage,
//   VerificationPage,
//   SellerRegistrationPage,
//   SellerDashboardPage,
//   EditProductPage,
//   EditPromotionPage,
// } from "./pages";

// import AddProductPage from "./subpages/AddProductPage";
// import AddPromotionPage from "./subpages/AddPromotionPage";
// import ListProductPage from "./subpages/ListProductPage";
// import ListPromotionPage from "./subpages/ListPromotionPage";
// import StoreAnalyticsPage from "./subpages/StoreAnalyticsPage";
// import { AuthProvider } from "./hooks/authContext";
// import ProtectedRoute from "./hooks/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<InputEmailPage />} />
//           <Route path="/verification" element={<VerificationPage />} />
//           <Route path="/pin" element={<PinUserPage />} />
//           <Route path="/login" element={<LogInPage />} />
//           <Route path="/registerseller" element={<SellerRegistrationPage />} />
//           <Route
//             path="/dashboardseller/:storeDomain"
//             element={
//               <ProtectedRoute>
//                 <SellerDashboardPage />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="addproduct" element={<AddProductPage />} />
//             <Route path="productlist" element={<ListProductPage />} />
//             <Route path="addpromotion" element={<AddPromotionPage />} />
//             <Route path="promotionlist" element={<ListPromotionPage />} />
//             <Route path="storeanalytics" element={<StoreAnalyticsPage />} />
//           </Route>
//           <Route
//             path="/editproduct/:productId"
//             element={
//               <ProtectedRoute>
//                 <EditProductPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/editpromotion/:promotionId"
//             element={
//               <ProtectedRoute>
//                 <EditPromotionPage />
//               </ProtectedRoute>
//             }
//           />{" "}
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;
