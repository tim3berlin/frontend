import React from "react";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function VerificationAlert() {
  return (
    <Alert
      icon={<CheckIcon fontSize="inherit" />}
      severity="success"
      sx={{ marginTop: 2 }}
    >
      Verification successful! Proceeding to the next step...
    </Alert>
  );
}
