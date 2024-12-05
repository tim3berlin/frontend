import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInSide from "./pages/SignInSide";
import SignUpSide from "./pages/SignUpSide";
import PinUser from "./pages/PinUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpSide />} />
        <Route path="/pin" element={<PinUser />} />
        <Route path="/signin" element={<SignInSide />} />
      </Routes>
    </Router>
  );
}

export default App;
