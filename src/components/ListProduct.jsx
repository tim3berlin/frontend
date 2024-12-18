import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const ListProduct = ({ id, title, price, image, onAddCart, onRemoveCart, inCart, oldPrice }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        <div>
          <CardMedia component="img" alt="green iguana" sx={{ height: 100, objectFit: "contain" }} image={image} />
        </div>
        <CardContent>
          <Typography gutterBottom variant="body2" sx={{ fontWeight: "bold" }} component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="primary">
            ${price}
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
        <CardActions>
          <Button onClick={handleNavigate} size="small">
            Details
          </Button>
          <Button size="small" onClick={inCart ? onRemoveCart : onAddCart}>
            {inCart ? "Remove From Cart" : "Add To Cart"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ListProduct;
