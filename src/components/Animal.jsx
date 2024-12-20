import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
];

function Animal() {
  return (
    <>
      <Box sx={{ padding: 4, margin: "auto" }}>
        {/* <Box>
          <Typography variant="h5" gutterBottom alignItems="center" textAlign="center">
            Hewan Peliharaan{" "}
            <span role="img" aria-label="paw">
              🐾
            </span>
          </Typography>
        </Box> */}
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
          cols={5} // Responsif dengan 4 kolom
          gap={100} // Jarak antar gambar
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{
                  borderRadius: "100%", // Tambahkan radius untuk tampilan lebih menarik
                  objectFit: "cover", // Pastikan gambar tetap proporsional
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}

export default Animal;
