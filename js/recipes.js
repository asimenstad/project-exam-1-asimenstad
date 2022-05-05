const recipesUrl =
  "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/recipes?acf_format=standard&per_page=100&orderby=date";
const recipesContainer = document.querySelector(".recipes-container");

const categoryAll = document.querySelector(".all");
const categoryBreakfast = document.querySelector(".breakfast");
const categoryLunch = document.querySelector(".lunch");
const categoryDinner = document.querySelector(".dinner");
const categoryDessert = document.querySelector(".dessert");
const categorySide = document.querySelector(".side");

const moreRecipes = document.querySelector(".more-recipes");

let recipes = [];

async function fetchAPI() {
  try {
    const response = await fetch(recipesUrl);
    recipes = await response.json();
    addRecipes(recipes);
  } catch (error) {
    console.log(error);
  }
}
fetchAPI();

/// Add all recipes
function addRecipes(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    if (i === 10) {
      break;
    }

    if (recipes.length > 10) {
      moreRecipes.style.display = "block";
    } else {
      moreRecipes.style.display = "none";
    }
    recipesContainer.innerHTML += `<a href="#"><div class="recipe">
          <h3 class="recipe-title">${recipes[i].acf.title}</h3>
          <h4 class="recipe-category">${recipes[i].acf.category}</h4>
              <img src="${recipes[i].acf.image}" alt"" class="recipe-image">
                  </div></a>`;

    moreRecipes.addEventListener("click", loadMore);

    function loadMore() {
      for (let i = 0; i < recipes.length; i++) {
        if (i < 10) {
          continue;
        }

        recipesContainer.innerHTML += `<a href="#"><div class="recipe">
  <h3 class="recipe-title">${recipes[i].acf.title}</h3>
  <h4 class="recipe-category">${recipes[i].acf.category}</h4>
      <img src="${recipes[i].acf.image}" alt"" class="recipe-image">
          </div></a>`;
      }
    }
  }
}

/// Add categories
categoryBreakfast.addEventListener("click", addBreakfast);

function addBreakfast() {
  recipesContainer.innerHTML = "";
  for (let i = 0; i < recipes.length; i++) {
    categoryAll.classList.remove("active");
    categoryBreakfast.classList.add("active");

    if (recipesContainer.childElementCount > 10) {
      moreRecipes.style.display = "block";
    } else {
      moreRecipes.style.display = "none";
    }

    if (recipes[i].acf.category === "breakfast") {
      recipesContainer.innerHTML += `<a href="#"><div class="recipe">
        <h3 class="recipe-title">${recipes[i].acf.title}</h3>
        <h4 class="recipe-category">${recipes[i].acf.category}</h4>
            <img src="${recipes[i].acf.image}" alt"" class="recipe-image">
                </div></a>`;
      console.log((recipes[i].acf.category === "breakfast").length);
    }
  }
}

/// View more recipes
moreRecipes.addEventListener("click", loadMore);

function loadMore() {
  for (let i = 0; i < recipes.length; i++) {
    if (i < 10) {
      continue;
    }

    recipesContainer.innerHTML += `<a href="#"><div class="recipe">
                <h3 class="recipe-title">${recipes[i].acf.title}</h3>
                <h4 class="recipe-category">${recipes[i].acf.category}</h4>
                    <img src="${recipes[i].acf.image}" alt"" class="recipe-image">
                        </div></a>`;

    moreRecipes.style.display = "none";
  }
}
