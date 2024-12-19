import React from "react";
import { Alert } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function LogInError() {
  return (
    <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
      Invalid email or password. Please try again.
    </Alert>
  );
}
