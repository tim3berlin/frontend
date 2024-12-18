import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export default function PinUser() {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.length === 6) {
      alert("PIN set successfully! Redirecting to login...");
      navigate("/signin");
    } else {
      alert("PIN must be 6 digits!");
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: "center" }}>
      <Typography component="h1" variant="h5" style={{ margin: "20px 0" }}>
        Set Your 6-Digit PIN
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Enter PIN"
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          InputProps={{
            maxLength: 6,
            style: { backgroundColor: "#EDF8FF", borderRadius: "4px" },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{
            marginTop: "20px",
            backgroundColor: "#0078AA",
            color: "#FFFFFF",
          }}
        >
          Submit PIN
        </Button>
      </form>
    </Container>
  );
}
