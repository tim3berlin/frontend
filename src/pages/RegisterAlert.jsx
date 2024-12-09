import React from "react";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function RegisterAlert() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Registration complete. Welcome to PawMart!
    </Alert>
  );
}
