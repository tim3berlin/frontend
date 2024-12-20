import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";

const images = [
  {
    imgPath:
      "https://bhj.com/media/2079/dry_petfood_banner_1.jpg?anchor=center&mode=crop&width=1410&height=500&bgcolor=ffff&autowebp=1",
  },
  {
    imgPath:
      "https://t3.ftcdn.net/jpg/09/58/23/72/240_F_958237227_1BASKnM7JvHQHQ4f3t6Hv5ztz2iRTLIt.jpg",
  },
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
