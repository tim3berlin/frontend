import React from "react";
import { TextField, Box } from "@mui/material";

const InputForm = ({
  value,
  setValue,
  label,
  error,
  type = "text",
  width = "100%",
}) => {
  return (
    <Box>
      <TextField
        variant="outlined"
        fullWidth
        label={label || "Enter value"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={!!error}
        helperText={error}
        type={type}
        sx={{
          marginBottom: "16px",
          marginTop: "8px",
          backgroundColor: "#EDF8FF",
          borderRadius: "4px",
          width: width,
        }}
      />
    </Box>
  );
};

export default InputForm;
