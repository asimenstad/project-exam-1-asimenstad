const recipesUrl =
  "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/recipes?acf_format=standard&per_page=100&orderby=date";

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
