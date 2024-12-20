import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const itemData = [
  {
    img: "https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?q=80&w=2628&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Dog",
  },
  {
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cat",
  },
  {
    img: "https://images.unsplash.com/photo-1490718720478-364a07a997cd?q=80&w=1839&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bird",
  },
  {
    img: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Hamster",
  },
  {
    img: "https://images.unsplash.com/photo-1478109214826-170faed7985c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Rabbit",
  },
];

function Animal() {
  return (
    <Box sx={{ padding: 4, margin: "auto" }}>
      <ImageList
        sx={{
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: 2,
          width: "100%",
          maxWidth: 1100,
          height: "auto",
          margin: "auto",
        }}
        cols={5}
        gap={100}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                width: "100px",
                height: "100px",
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{ marginRight: "25px", paddingTop: 2 }}
            >
              {item.title}
            </Typography>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default Animal;
