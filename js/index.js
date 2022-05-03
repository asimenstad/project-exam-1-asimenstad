const newRecipes = document.querySelector(".new-recipes-container");

function createCarousel(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    console.log(recipes.length);
    const title = recipes[i].acf.title;
    const text = recipes[i].text;
    const ingredients = recipes[i].acf.ingredients;
    const instructions = recipes[i].acf.instructions;
    const image = recipes[i].acf.image;

    newRecipes.innerHTML += `<div class="carousel-slide">
      <h3>${title}</h3>
          <img src="${image}" alt"" class="carousel-image">
              </div>`;
  }
}
