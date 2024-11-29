import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import IRecipe from "../IRecipe";
import { useLocation } from "react-router-dom";

export default function RecipeCard({recipe}: any) {
  return (
    <Box>
      <Link to={`/recipe/${recipe.idMeal}`} state={recipe}>
        <Card>
          <CardMedia sx={{ height: 140 }} image={recipe.strMealThumb} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {recipe.strMeal}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {recipe.strCategory}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {recipe.strArea}
            </Typography>
            <Button variant="outlined">Add recipe</Button>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
}
