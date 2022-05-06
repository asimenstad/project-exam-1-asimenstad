const recipesUrl =
  "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/recipes?acf_format=standard&per_page=100&orderby=date";

const loader = document.querySelector(".loader");

const newRecipes = document.querySelector(".new-recipes-container");
const previousSlideButton = document.querySelector(".previous-slide");
const nextSlideButton = document.querySelector(".next-slide");

const weeklyRecipe = document.querySelector(".weekly-recipe");

async function fetchAPI() {
  try {
    const response = await fetch(recipesUrl);
    const json = await response.json();
    createCarousel(json);
    createWeeklyRecipe(json);
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
          <img src="${recipes[i].acf.image}" alt"" class="recipe-image">
              </div></a>`;

    const firstSlide = newRecipes.firstChild;
    firstSlide.classList.add(".active-slide");
    console.log(firstSlide);

    const allSlides = document.querySelectorAll(".recipe");
    const slideWidth = allSlides[0].getBoundingClientRect().width + 10;

    nextSlideButton.addEventListener("click", nextSlide);

    function nextSlide() {
      previousSlideButton.style.visibility = "visible";
      for (i = 0; i < allSlides.length; i++) {
        allSlides[i].style.transform += `translateX(-${slideWidth}px)`;
      }
    }

    previousSlideButton.addEventListener("click", previousSlide);

    function previousSlide() {
      for (i = 0; i < allSlides.length; i++) {
        allSlides[i].style.transform += `translateX(${slideWidth}px)`;
      }
    }
  }
}

/// Weekly recipe

function createWeeklyRecipe(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    if (recipes.length < 1) {
      break;
    }
    console.log(recipes[i]);
    if (recipes[i].acf.featured) {
      weeklyRecipe.innerHTML = `<div class="weekly-recipe-info">
      <h2>Recipe of the week</h2>
      <h3>${recipes[i].acf.title}</h3>
      <p>${recipes[i].excerpt.rendered}</p>
      <a href="specific-recipe.html?id=${recipes[i].id}" class="cta">View recipe</a>
      </div>
      <div class="weekly-recipe-img">
      <img src="${recipes[i].acf.image}">
      </div>`;
    }
  }
}
