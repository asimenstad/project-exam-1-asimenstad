const menuButton = document.querySelector(".menu-button");
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const menu = document.querySelector("nav");

closeMenu.style.display = "none";

function toggleMenu() {
  menu.classList.toggle("open");
  if (menu.classList.contains("open")) {
    openMenu.style.display = "none";
    closeMenu.style.display = "block";
  } else {
    openMenu.style.display = "block";
    closeMenu.style.display = "none";
  }
}

menuButton.addEventListener("click", toggleMenu);
