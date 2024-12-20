import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";

const images = [
  { imgPath: "https://st3.depositphotos.com/1938399/16420/i/450/depositphotos_164208124-stock-photo-jakarta-cityscape-at-night.jpg" },
  { imgPath: "https://st2.depositphotos.com/7525912/11141/i/450/depositphotos_111416864-stock-photo-jakarta-city-indonesia.jpg" },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "white",
          margin: "auto",
        }}
      ></div>
    ),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {dots}
      </div>
    ),
  };

  return (
    <Box sx={{ maxWidth: 1100, margin: "auto", paddingTop: 12, position: "relative" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index} sx={{ position: "relative", textAlign: "center" }}>
            <img
              src={image.imgPath}
              alt={image.label}
              style={{
                width: "100%",
                height: "20em",
                borderRadius: "8px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                bottom: "50px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                textShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)",
              }}
            >
              {image.label}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
