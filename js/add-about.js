aboutUrl = "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/about?acf_format=standard";
aboutTextContainer = document.querySelector(".about-text");
aboutImageContainer = document.querySelector(".about-image");

async function fetchAbout() {
  try {
    const response = await fetch(aboutUrl);
    const json = await response.json();
    console.log(json);
    aboutTextContainer.innerHTML = `<h2>${json[0].title.rendered}</h2><p>${json[0].content.rendered}</p>`;
    aboutImageContainer.innerHTML = `<img src="${json[0].acf.image}" alt="">`;
  } catch (error) {
    console.log("error");
  }
}
fetchAbout();
