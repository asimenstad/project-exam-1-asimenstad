const recipesUrl =
  "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/recipes?acf_format=standard&per_page=100&orderby=date";
const loader = document.querySelector(".loader");
const recipesContainer = document.querySelector(".recipes-container");
const moreRecipes = document.querySelector(".more-recipes");
const breakfast = document.querySelector(".breakfast");
const lunch = document.querySelector(".lunch");
const dinner = document.querySelector(".dinner");
const dessert = document.querySelector(".dessert");
const side = document.querySelector(".side");
const all = document.querySelector(".all");

let recipes = [];

async function fetchAPI() {
  try {
    const response = await fetch(recipesUrl);
    recipes = await response.json();
    displayAllRecipes(recipes);
  } catch (error) {
    console.log("Error:", error);
  }
}
fetchAPI();

/// Add all recipes
function displayAllRecipes(recipes) {
  recipesContainer.innerHTML = "";

  for (let i = 0; i < recipes.length; i++) {
    loader.style.display = "none";

    if (i === 10) {
      break;
    }

    if (recipes.length > 10) {
      moreRecipes.style.display = "block";
    } else {
      moreRecipes.style.display = "none";
    }

    recipesContainer.innerHTML += `<a href="specific-recipe.html?id=${recipes[i].id}"><div class="recipe">
          <h3 class="recipe-title">${recipes[i].acf.title}</h3>
          <h4 class="recipe-category">${recipes[i].acf.category}</h4>
              <img src="${recipes[i].acf.image}" alt="${recipes[i].acf.alt}" class="recipe-image">
                  </div></a>`;
  }
}

/// Add categories
function displayCategories(recipe) {
  recipesContainer.innerHTML = "";

  for (let i = 0; i < recipe.length; i++) {
    loader.style.display = "none";

    if (i === 10) {
      break;
    }

    if (recipe.length > 10) {
      moreRecipes.style.display = "block";
    } else {
      moreRecipes.style.display = "none";
    }

    recipesContainer.innerHTML += `<a href="specific-recipe.html?id=${recipe[i].id}"><div class="recipe">
          <h3 class="recipe-title">${recipe[i].acf.title}</h3>
          <h4 class="recipe-category">${recipe[i].acf.category}</h4>
              <img src="${recipe[i].acf.image}" alt="${recipe[i].acf.alt}" class="recipe-image">
                  </div></a>`;
  }
}

all.addEventListener("click", displayAll);
breakfast.addEventListener("click", findCategory);
lunch.addEventListener("click", findCategory);
dinner.addEventListener("click", findCategory);
dessert.addEventListener("click", findCategory);
side.addEventListener("click", findCategory);

function findCategory(e) {
  const category = e.target.className;
  const filterCategory = recipes.filter((recipe) => recipe.acf.category === category);

  const active = document.getElementsByClassName("active-category");

  if (e.target.className !== active) {
    active[0].classList.remove("active-category");
    e.target.classList.add("active-category");
  }
  if (filterCategory.length > 0) {
    displayCategories(filterCategory);
  }
}

function displayAll() {
  window.location.reload();
}

/// Search

const searchForm = document.querySelector(".search");
const searchInput = document.querySelector("#search-input");

searchForm.addEventListener("submit", filterSearch);

function filterSearch(e) {
  e.preventDefault();
  recipesContainer.innerHTML = "";
  for (let i = 0; i < recipes.length; i++) {
    const recipeValue = recipes[i].acf.title.toLowerCase();
    const recipeFilter = searchInput.value.toLowerCase();
    const searchResult = recipeValue.includes(recipeFilter);

    if (searchResult) {
      console.log(searchResult);

      recipesContainer.innerHTML += `<a href="specific-recipe.html?id=${recipes[i].id}"><div class="recipe">
      <h3 class="recipe-title">${recipes[i].acf.title}</h3>
      <h4 class="recipe-category">${recipes[i].acf.category}</h4>
          <img src="${recipes[i].acf.image}" alt"${recipes[i].acf.alt}" class="recipe-image">
              </div></a>`;
    }

    moreRecipes.style.display = "none";
  }
}

/// View more recipes
moreRecipes.addEventListener("click", loadMore);

function loadMore() {
  for (let i = 0; i < recipes.length; i++) {
    if (i < 10) {
      continue;
    }

    recipesContainer.innerHTML += `<a href="specific-recipe.html?id=${recipes[i].id}"><div class="recipe">
                <h3 class="recipe-title">${recipes[i].acf.title}</h3>
                <h4 class="recipe-category">${recipes[i].acf.category}</h4>
                    <img src="${recipes[i].acf.image}" alt"${recipes[i].acf.alt}" class="recipe-image">
                        </div></a>`;

    moreRecipes.style.display = "none";
  }
}
