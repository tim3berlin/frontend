import React from "react";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function LogInAlert() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Login successful!
    </Alert>
  );
}
