import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  LogInPage,
  PinUserPage,
  InputEmailPage,
  VerificationPage,
  SellerRegistrationPage,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputEmailPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/pin" element={<PinUserPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/registerseller" element={<SellerRegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
