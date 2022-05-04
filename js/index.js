const recipesUrl =
  "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/recipes?acf_format=standard&per_page=100&orderby=date";
const newRecipes = document.querySelector(".new-recipes-container");
const previousSlide = document.querySelector(".previous-slide");
const nextSlide = document.querySelector(".next-slide");

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
    if (i === 3) {
      break;
    }

    newRecipes.innerHTML += `<a href="#"><div class="recipe">
      <h3 class="recipe-title">${recipes[i].acf.title}</h3>
      <h4 class="recipe-category">${recipes[i].acf.category}</h4>
          <img src="${recipes[i].acf.image}" alt"" class="recipe-image">
              </div></a>`;

    const allSlides = document.querySelectorAll(".recipe");
    const slide = document.querySelector(".recipe");
    const slideWidth = allSlides[0].getBoundingClientRect().width + 10;
    nextSlide.addEventListener("click", moveSlide);

    function moveSlide() {
      console.log("moved");
      for (i = 0; i < allSlides.length; i++) {
        allSlides[i].style.transform = `translateX(-${slideWidth}px)`;
      }
    }
  }
}
