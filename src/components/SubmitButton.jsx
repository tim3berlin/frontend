import React from "react";
import { Button } from "@mui/material";

const SubmitButton = ({ onClick, text = "Submit", width = "100%" }) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        marginTop: "24px",
        backgroundColor: "#0078AA",
        color: "#FFFFFF",
        width: width,
      }}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
