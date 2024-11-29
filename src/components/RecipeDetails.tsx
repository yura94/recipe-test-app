import { useLocation } from "react-router-dom";
import IRecipe from "../IRecipe";

export default function RecipeDetails(){
  const location = useLocation();
  const recipe = location.state;
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>{recipe.strMeal}</h1>
      <h3>
        {recipe.strCategory} | {recipe.strArea}
      </h3>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
      />
      <h2>Ingredients:</h2>
      <ul>
        {Object.keys(recipe)
          .filter((key) => key.startsWith("strIngredient") && recipe[key])
          .map((key, index) => (
            <li key={index}>
              {recipe[`strMeasure${index + 1}`]} {recipe[key]}
            </li>
          ))}
      </ul>

      <h2>Instructions:</h2>
      <p>{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <div style={{ marginTop: "20px" }}>
          <h3>Watch Recipe Video:</h3>
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#007BFF" }}
          >
            {recipe.strMeal} - YouTube Video
          </a>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Recipe Source:</h3>
        <a
          href={recipe.strSource}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "#007BFF" }}
        >
          {recipe.strSource}
        </a>
      </div>
    </div>
  );
};
