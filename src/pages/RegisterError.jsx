import React from "react";
import { Alert } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function RegisterError() {
  return (
    <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
      PIN must be 6 digits!
    </Alert>
  );
}
