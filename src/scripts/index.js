import "../pages/index.css";
import { initSlider } from "./slider.js";
import { validateInput } from "./validation.js";

const playButton = document.querySelector(".play-button");

const slider = document.querySelector(".slider");
let cards = document.querySelectorAll(".card");

function moveCards() {
  slider.style.transition = "transform 3.3s ease";
  slider.style.transform = "translateX(-100%)";

  setTimeout(() => {
    const firstCard = cards[0];
    const clonedCard = firstCard.cloneNode(true);
    slider.appendChild(clonedCard);

    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";

    slider.removeChild(firstCard);

    cards = document.querySelectorAll(".card");
  }, 500);
}

setInterval(moveCards, 3000);

function playVideo() {
  const video = document.getElementById("video");
  const overlay = document.querySelector(".video-preview");
  video.src = "https://www.youtube.com/embed/goSnjnwVtW4?autoplay=1";
  video.style.display = "block";
  overlay.style.display = "none";
  playButton.style.display = "none";
}

function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const arrow = item.querySelector(".faq-question__arrow");

    question.addEventListener("click", () => {
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        arrow.style.transform = "rotate(0deg)";
        question.style.color = "#666666";
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        arrow.style.transform = "rotate(90deg)";
        question.style.color = "#00B7EC";
      }
    });
  });
}

document
  .getElementById("interviewForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
  });

const inputs = document.querySelectorAll(".input-group input");
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    validateInput(input);
  });
});

function validateForm() {
  let isValid = true;
  inputs.forEach((input) => {
    if (!validateInput(input)) {
      isValid = false;
    }
  });

  if (isValid) {
    alert("Форма успешно отправлена!");
  }
}

playButton.addEventListener("click", playVideo);
initSlider();
initializeFAQ();
