const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
  burger.classList.toggle("toggle");
});

const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel img");
let index = 0;

function showNextImage() {
  index++;
  if (index >= images.length) {
    index = 0;
  }
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(showNextImage, 10000);
