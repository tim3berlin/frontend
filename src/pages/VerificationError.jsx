import React from "react";
import { Alert } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function VerificationError() {
  return (
    <Alert
      icon={<ErrorIcon fontSize="inherit" />}
      severity="error"
      sx={{ marginTop: 2 }}
    >
      Invalid code. Please try again.
    </Alert>
  );
}
