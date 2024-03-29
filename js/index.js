const recipesUrl =
  "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/recipes?acf_format=standard&per_page=100&orderby=date";

let recipes = [];
let slideCounter = 0;

const loader = document.querySelector(".loader");
const recommendedRecipesLoader = document.querySelector(".recommended-recipes .loader");
const newRecipes = document.querySelector(".new-recipes-container");
const previousSlideButton = document.querySelector(".previous-slide");
const nextSlideButton = document.querySelector(".next-slide");
const weeklyRecipe = document.querySelector(".weekly-recipe");
const recommendedRecipes = document.querySelector(".recommended-recipes");

async function fetchAPI() {
  try {
    const response = await fetch(recipesUrl);
    recipes = await response.json();
    createCarousel(recipes);
    createWeeklyRecipe(recipes);
    createRecommendedRecipes(recipes);
  } catch (error) {
    console.log("Error:", error);
  }
}
fetchAPI();

/// New recipes carousel
function createCarousel(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    if (i === 9) {
      break;
    }

    loader.style.display = "none";

    newRecipes.innerHTML += `<a href="specific-recipe.html?id=${recipes[i].id}"><div class="recipe new" >
      <h3 class="recipe-title">${recipes[i].acf.title}</h3>
      <h4 class="recipe-category">${recipes[i].acf.category}</h4>
          <img src="${recipes[i].acf.image}" alt="${recipes[i].acf.alt}" class="recipe-image">
              </div></a>`;
  }
}

const newRecipesWidth = newRecipes.getBoundingClientRect().width;

function nextSlide() {
  const slides = document.querySelectorAll(".recipe.new");
  const slideWidth = slides[0].getBoundingClientRect().width;

  slideCounter++;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.transform += `translateX(-${slideWidth + 10}px)`;
    if (slideCounter > 0) {
      previousSlideButton.style.display = "flex";
    }

    console.log(slideCounter);

    if (newRecipesWidth <= slideWidth * 1 && slideCounter === slides.length - 1) {
      nextSlideButton.style.display = "none";
    }

    if (newRecipesWidth >= slideWidth * 1 && slideCounter === slides.length - 1) {
      nextSlideButton.style.display = "none";
    }
    if (newRecipesWidth >= slideWidth * 2 && slideCounter === slides.length - 2) {
      nextSlideButton.style.display = "none";
    }

    if (newRecipesWidth >= slideWidth * 3 && slideCounter === slides.length - 3) {
      nextSlideButton.style.display = "none";
    }

    if (newRecipesWidth >= slideWidth * 4 && slideCounter === slides.length - 4) {
      nextSlideButton.style.display = "none";
    }
  }
}
nextSlideButton.addEventListener("click", nextSlide);

function previousSlide() {
  const slides = document.querySelectorAll(".recipe.new");
  const slideWidth = slides[0].getBoundingClientRect().width + 10;
  slideCounter--;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.transform += `translateX(${slideWidth}px)`;
    if (slideCounter === 0) {
      previousSlideButton.style.display = "none";
    }

    if (slideCounter < slides.length) {
      nextSlideButton.style.display = "flex";
    }
  }
}
previousSlideButton.addEventListener("click", previousSlide);

/// Weekly recipe
function createWeeklyRecipe(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    if (recipes.length < 1) {
      break;
    }
    if (recipes[i].acf.featured) {
      weeklyRecipe.innerHTML = `<div class="weekly-recipe-info">
      <h2>Recipe of the week</h2>
      <h3>${recipes[i].acf.title}</h3>
      <p>${recipes[i].excerpt.rendered}</p>
      <a href="specific-recipe.html?id=${recipes[i].id}" class="cta">View recipe</a>
      </div>
      <div class="weekly-recipe-img">
      <img src="${recipes[i].acf.image}" alt="${recipes[i].acf.alt}">
      </div>`;
    }
  }
}

/// Recommended recipes
function createRecommendedRecipes() {
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].acf.recommended) {
      recommendedRecipesLoader.style.display = "none";

      recommendedRecipes.innerHTML += `<a href="specific-recipe.html?id=${recipes[i].id}"><div class="recipe" >
      <h3 class="recipe-title">${recipes[i].acf.title}</h3>
      <h4 class="recipe-category">${recipes[i].acf.category}</h4>
          <img src="${recipes[i].acf.image}" alt="${recipes[i].acf.alt}" class="recipe-image">
              </div></a>`;
    }
  }
}
