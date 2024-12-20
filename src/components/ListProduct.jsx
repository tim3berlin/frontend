import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search"; 
import Box from "@mui/material/Box";

const ListProduct = ({
  id,
  title,
  price,
  image,
  onAddCart,
  onRemoveCart,
  inCart,
  oldPrice,
  onAddWishlist,
  inWishlist,
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        position: "relative",
      }}
    >
      <div>
        <CardMedia
          component="img"
          alt={title}
          sx={{
            width: "100%", 
            height: 200,
            objectFit: "cover", 
          }}
          image={image}
        />

        <IconButton
          color={inWishlist ? "secondary" : "default"}
          onClick={onAddWishlist}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 10,
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </div>

      <CardContent>
        <Typography
          gutterBottom
          variant="body2"
          sx={{ fontWeight: "bold" }}
          component="div"
        >
          {title}
        </Typography>
        <Typography variant="body2" color="primary">
          Rp.{price}
          {oldPrice && (
            <Typography
              component="span"
              variant="body2"
              sx={{
                textDecoration: "line-through",
                marginLeft: 1,
                color: "text.secondary",
              }}
            >
              Rp{oldPrice}
            </Typography>
          )}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >

        <Box >
          <IconButton
            color={inCart ? "primary" : "default"}
            onClick={inCart ? onRemoveCart : onAddCart}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Box>

        <Box >
          <IconButton onClick={handleNavigate}>
            <SearchIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ListProduct;
