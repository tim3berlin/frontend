import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

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
