const recipesUrl =
  "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/recipes?acf_format=standard&per_page=100&orderby=date";
const newRecipes = document.querySelector(".recipes-container");

async function fetchAPI() {
  try {
    const response = await fetch(recipesUrl);
    const json = await response.json();
    createCarousel(json);
  } catch (error) {
    console.log(error);
  }
}
fetchAPI();

function createCarousel(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    if (i === 9) {
      break;
    }

    newRecipes.innerHTML += `<a href="#"><div class="recipe">
      <h3 class="recipe-title">${recipes[i].acf.title}</h3>
      <h4 class="recipe-category">${recipes[i].acf.category}</h4>
          <img src="${recipes[i].acf.image}" alt"" class="recipe-image">
              </div></a>`;
  }
}
