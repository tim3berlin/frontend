import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Typography } from "@mui/material";

const itemData = [
  {
    img: require("../assets/anjing.jpg"),
    title: "Anjing",
  },
  {
    img: require("../assets/kucing.jpg"),
    title: "Kucing",
  },
  {
    img: require("../assets/Burung.jpg"),
    title: "Burung",
  },
  {
    img: require("../assets/Kelinci.jpg"),
    title: "Kelinci",
  },
  {
    img: require("../assets/Hamster.jpg"),
    title: "Hamster",
  },
];

function Animal() {
  return (
    <Box sx={{ padding: 4, margin: "auto", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Hewan Peliharaan{" "}
        <span role="img" aria-label="paw">
          🐾
        </span>
      </Typography>
      <ImageList
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
        {itemData.map((item, index) => (
          <ImageListItem
            key={index}
            sx={{
              overflow: "hidden",
              margin: "0 40px",
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default Animal;
