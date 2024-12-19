import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  LogInPage,
  PinUserPage,
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
import ProtectedRoute from "./hooks/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<InputEmailPage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/pin" element={<PinUserPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/registerseller" element={<SellerRegistrationPage />} />
          <Route
            path="/dashboardseller"
            element={
              <ProtectedRoute>
                <SellerDashboardPage />
              </ProtectedRoute>
            }
          >
            <Route path="addproduct" element={<AddProductPage />} />
            <Route path="productlist" element={<ListProductPage />} />
            <Route path="addpromotion" element={<AddPromotionPage />} />
            <Route path="promotionlist" element={<ListPromotionPage />} />
            <Route path="storeanalytics" element={<StoreAnalyticsPage />} />
          </Route>
          <Route
            path="/editproduct/:productId"
            element={
              <ProtectedRoute>
                <EditProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editpromotion/:promotionId"
            element={
              <ProtectedRoute>
                <EditPromotionPage />
              </ProtectedRoute>
            }
          />{" "}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
