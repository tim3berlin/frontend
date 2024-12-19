import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputAdornment } from "@mui/material";
import Cookies from "js-cookie";
import apiClient from "../axios.js";

const theme = createTheme();

const AddPromotionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  width: "95%",
  margin: "auto",
  marginTop: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

const FormSection = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: theme.spacing(3),
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(4),
  paddingLeft: "45px",
  paddingRight: "45px",
  paddingTop: "35px",
  width: "100%",
  textAlign: "left",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.25rem",
  marginBottom: theme.spacing(2),
}));

const FormLabel = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const FormDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}));

const FormRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
}));

const AddPromotionPage = () => {
  const [promotionName, setPromotionName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [maxQuantity, setMaxQuantity] = useState("");
  const [discount, setDiscount] = useState("");

  const formatTime = (time) => {
    if (!time) return "";
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("accessToken");
      console.log("Token from cookies:", token);

      const payload = {
        promotion_name: promotionName,
        start_date: startDate?.toISOString().split("T")[0],
        end_date: endDate?.toISOString().split("T")[0],
        start_time: formatTime(startTime),
        end_time: formatTime(endTime),
        max_quantity: parseInt(maxQuantity, 10),
        discount: parseFloat(discount),
      };

      const response = await apiClient.post("/promotions/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Payload:", payload);
      console.log("Headers:", {
        Authorization: `Bearer ${token}`,
      });

      console.log("Promotion created successfully:", response.data);
      alert("Promotion created successfully!");
    } catch (error) {
      console.error("Failed to create promotion:", error);
      alert("An error occurred while creating the promotion.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AddPromotionContainer>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          Add Promotion
        </Typography>

        <FormSection>
          <SectionTitle>Promotion Information</SectionTitle>
          <FormRow>
            <Box sx={{ width: "25%" }}>
              <FormLabel>Promotion Name</FormLabel>
              <FormDescription>
                Enter a promotion name with at least 5 characters but no more
                than 25 characters. Avoid excessive use of capital letters.
              </FormDescription>
            </Box>
            <Box sx={{ width: "70%" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={promotionName}
                onChange={(e) => setPromotionName(e.target.value)}
                inputProps={{
                  style: {
                    height: "20px",
                    backgroundColor: "#EDF8FF",
                    color: "black",
                  },
                }}
              />
            </Box>
          </FormRow>
          <FormRow>
            <Box sx={{ width: "25%" }}>
              <FormLabel>Promotion Period</FormLabel>
              <FormDescription>
                Choose the start and end date along with the time for the
                promotion period.
              </FormDescription>
            </Box>
            <Box sx={{ width: "70%" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Start Date"
                    className="datepicker"
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="MMMM d, yyyy"
                    placeholderText="End Date"
                    className="datepicker"
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    placeholderText="Start Time"
                    className="datepicker"
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginLeft: "-350px",
                  }}
                >
                  <DatePicker
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    placeholderText="End Time"
                    className="datepicker"
                  />
                </Grid>
              </Grid>
            </Box>
          </FormRow>
          <FormRow>
            <Box sx={{ width: "25%" }}>
              <FormLabel>Max Purchase Quantity</FormLabel>
              <FormDescription>
                Enter the maximum quantity of items a user can purchase in this
                promotion. Use a number.
              </FormDescription>
            </Box>
            <Box sx={{ width: "70%" }}>
              <TextField
                fullWidth
                type="number"
                value={maxQuantity}
                onChange={(e) => setMaxQuantity(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Qty</InputAdornment>
                  ),
                  style: {
                    height: "50px",
                    backgroundColor: "#EDF8FF",
                    color: "black",
                  },
                }}
              />
            </Box>
          </FormRow>
          <FormRow>
            <Box sx={{ width: "25%" }}>
              <FormLabel>Discount</FormLabel>
              <FormDescription>
                Enter the discount percentage for the promotion. It will be
                applied to the product price.
              </FormDescription>
            </Box>
            <Box sx={{ width: "70%" }}>
              <TextField
                fullWidth
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                  style: {
                    height: "50px",
                    backgroundColor: "#EDF8FF",
                    color: "black",
                  },
                }}
              />
            </Box>
          </FormRow>
        </FormSection>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </AddPromotionContainer>
    </ThemeProvider>
  );
};

export default AddPromotionPage;
