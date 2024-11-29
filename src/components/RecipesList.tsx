import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Pagination,
  debounce,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import IRecipe from "../IRecipe";


export default function RecipesList() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState("");
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

        const response = await axios.get(url);
        setRecipes(response.data.meals || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [search, category]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const filteredRecipes = category
    ? recipes.filter((e) => e.strCategory === category)
    : recipes;

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div>
      <TextField
        sx={{ width: "400px", margin: "40px" }}
        label="Search"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
      />

      <FormControl sx={{ width: "400px", margin: "40px" }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value={""}>All Categories</MenuItem>
          <MenuItem value={"Beef"}>Beef</MenuItem>
          <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
          <MenuItem value={"Chicken"}>Chicken</MenuItem>
          <MenuItem value={"Dessert"}>Dessert</MenuItem>
          <MenuItem value={"Goat"}>Goat</MenuItem>
          <MenuItem value={"Lamb"}>Lamb</MenuItem>
          <MenuItem value={"Miscellaneous"}>Miscellaneous</MenuItem>
          <MenuItem value={"Pasta"}>Pasta</MenuItem>
          <MenuItem value={"Pork"}>Pork</MenuItem>
          <MenuItem value={"Seafood"}>Seafood</MenuItem>
          <MenuItem value={"Side"}>Side</MenuItem>
          <MenuItem value={"Starter"}>Starter</MenuItem>
          <MenuItem value={"Vegan"}>Vegan</MenuItem>
          <MenuItem value={"Vegetarian"}>Vegetarian</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          width: "100%",
          boxSizing: "border-box",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching data</div>}
        {paginatedRecipes.length > 0 ? (
          paginatedRecipes.map((meal) => (
            <Box key={meal.idMeal}>
              <RecipeCard
                recipe = {meal}
              />
            </Box>
          ))
        ) : (
          <div>No meals found for this category or search term.</div>
        )}
      </Box>

      <Pagination
        sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  );
}
