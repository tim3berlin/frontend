import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputAdornment } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Promotions from "../components/Promotions";

const theme = createTheme();

const EditPromotionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  width: "75%",
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
  width: "93%",
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

const EditPromotionPage = () => {
  const { promotionId } = useParams();
  const navigate = useNavigate();

  const promotion = Promotions.find(
    (promo) => promo.id === parseInt(promotionId)
  );

  const [startDate, setStartDate] = useState(
    promotion ? new Date(promotion.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    promotion ? new Date(promotion.endDate) : new Date()
  );
  const [startTime, setStartTime] = useState(
    promotion
      ? new Date(`${promotion.startDate}T${promotion.startTime}`)
      : new Date()
  );
  const [endTime, setEndTime] = useState(
    promotion
      ? new Date(`${promotion.endDate}T${promotion.endTime}`)
      : new Date()
  );
  const [name, setName] = useState(promotion ? promotion.name : "");
  const [maxPurchaseQuantity, setMaxPurchaseQuantity] = useState(
    promotion ? promotion.maxPurchaseQuantity : 0
  );
  const [discount, setDiscount] = useState(promotion ? promotion.discount : 0);

  if (!promotion) {
    return <Typography variant="h6">Promotion not found!</Typography>;
  }

  const handleDiscard = () => {
    navigate(`/dashboardseller/promotionlist`);
  };

  return (
    <ThemeProvider theme={theme}>
      <EditPromotionContainer>
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
          Edit Promotion
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{
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
              <FormLabel>Promotion Period</FormLabel>
              <FormDescription>
                Choose the start and end date along with the time for the
                promotion period.
              </FormDescription>
            </Box>
            <Box sx={{ width: "70%" }}>
              <Grid container spacing={2}>
                <Grid item xs={2} sx={{ marginRight: "25px" }}>
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
                <Grid item xs={4}>
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
                  xs={2}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginLeft: "-145px",
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
                variant="outlined"
                value={maxPurchaseQuantity}
                onChange={(e) => setMaxPurchaseQuantity(e.target.value)}
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
                variant="outlined"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
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

        <Box
          display="flex"
          justifyContent="flex-end"
          gap={2}
          sx={{ marginRight: "15px" }}
        >
          <Button variant="contained" color="secondary" onClick={handleDiscard}>
            Discard
          </Button>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </EditPromotionContainer>
    </ThemeProvider>
  );
};

export default EditPromotionPage;
