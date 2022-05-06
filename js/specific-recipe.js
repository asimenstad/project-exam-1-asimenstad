const specificRecipe = document.querySelector(".specific-recipe");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const recipeUrl =
  "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/recipes/" + id + "?acf_format=standard&per_page=100";

const loader = document.querySelector(".loader");

async function fetchSpecificRecipe() {
  try {
    const response = await fetch(recipeUrl);
    const recipe = await response.json();
    console.log(recipe);
    createRecipeHTML(recipe);
  } catch (error) {
    console.log("error");
  }
}
fetchSpecificRecipe();

function createRecipeHTML(recipe) {
  loader.style.display = "none";

  document.title = `${recipe.acf.title} | Miso Hungry`;

  const ingredientsText = recipe.acf.ingredients;
  const ingredientsList = ingredientsText.split("-");
  const ingredients = ingredientsList.join("<br>");
  console.log(ingredients);

  const instructionsText = recipe.acf.instructions;
  const instructionsList = instructionsText.split("-");
  const instructions = instructionsList.join("<br>");

  specificRecipe.innerHTML += `<div class="specific-recipe__section img">
  <img class="specific-img" src="${recipe.acf.image}"></div>
  <div class="specific-recipe__section intro">
  <h1>${recipe.acf.title}</h1><p>${recipe.acf.text}</p></div>
  <div class="specific-recipe__section ingredients">
  <h2>Ingredients</h2><p>${ingredients}</p></div>
  <div class="specific-recipe__section instructions">
  <h2>Instructions</h2><p>${instructions}</p></div> `;
}
