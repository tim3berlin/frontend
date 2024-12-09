import React from "react";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function InputEmailAlert() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Email registered! Please check your email to verify.
    </Alert>
  );
}
