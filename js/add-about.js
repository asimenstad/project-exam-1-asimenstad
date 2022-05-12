const aboutUrl = "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/about?acf_format=standard";
const aboutTextContainer = document.querySelector(".about-text");
const aboutImageContainer = document.querySelector(".about-image");
const loader = document.querySelector(".loader");

async function fetchAbout() {
  try {
    const response = await fetch(aboutUrl);
    const json = await response.json();
    createAboutHtml(json);
  } catch (error) {
    console.log("error");
  }
}
fetchAbout();

function createAboutHtml(about) {
  loader.style.display = "none";
  console.log(about);
  aboutTextContainer.innerHTML = `<h2>${about[0].title.rendered}</h2><p>${about[0].content.rendered}</p>`;
  aboutImageContainer.innerHTML = `<img src="${about[0].acf.image}" alt="${about[0].acf.alt}">`;
}
