const recipesUrl =
  "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/recipes?acf_format=standard&per_page=100&orderby=date";

let recipes = [];
let slideCounter = 0;

const loader = document.querySelector(".loader");
const newRecipes = document.querySelector(".new-recipes-container");
const previousSlideButton = document.querySelector(".previous-slide");
const nextSlideButton = document.querySelector(".next-slide");
const weeklyRecipe = document.querySelector(".weekly-recipe");

async function fetchAPI() {
  try {
    const response = await fetch(recipesUrl);
    recipes = await response.json();
    createCarousel(recipes);
    createWeeklyRecipe(recipes);
  } catch (error) {
    console.log(error);
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

    newRecipes.innerHTML += `<a href="specific-recipe.html?id=${recipes[i].id}"><div class="recipe">
      <h3 class="recipe-title">${recipes[i].acf.title}</h3>
      <h4 class="recipe-category">${recipes[i].acf.category}</h4>
          <img src="${recipes[i].acf.image}" alt="${recipes[i].acf.alt}" class="recipe-image">
              </div></a>`;
  }
}

function nextSlide() {
  const slides = document.querySelectorAll(".recipe");
  const slideWidth = slides[0].getBoundingClientRect().width + 10;

  slideCounter++;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.transform += `translateX(-${slideWidth}px)`;
    if (slideCounter > 0) {
      previousSlideButton.style.visibility = "visible";
    }
    if (slideCounter >= slides.length - 1) {
      nextSlideButton.style.visibility = "hidden";
    }
    console.log(slideCounter);
  }
}
nextSlideButton.addEventListener("click", nextSlide);

function previousSlide() {
  const slides = document.querySelectorAll(".recipe");
  const slideWidth = slides[0].getBoundingClientRect().width + 10;
  slideCounter--;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.transform += `translateX(${slideWidth}px)`;
    if (slideCounter === 0) {
      previousSlideButton.style.visibility = "hidden";
    }

    if (slideCounter < slides.length) {
      nextSlideButton.style.visibility = "visible";
    }
    console.log(slideCounter);
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
