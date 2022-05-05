const recipesUrl =
  "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/recipes?acf_format=standard&per_page=100&orderby=date";
const recipesContainer = document.querySelector(".recipes-container");
const moreRecipes = document.querySelector(".more-recipes");

let json = [];

async function fetchAPI() {
  try {
    const response = await fetch(recipesUrl);
    json = await response.json();
    addRecipes(json);
  } catch (error) {
    console.log(error);
  }
}
fetchAPI();

function addRecipes(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    if (i === 10) {
      break;
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
