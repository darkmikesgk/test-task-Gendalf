import "../pages/index.css";
import { initSlider } from "./slider.js";
import { validateInput, validateForm } from "./validation.js";

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

function initFileUpload() {
  const fileInput = document.getElementById("resume");
  const fileList = document.getElementById("fileList");

  fileInput.addEventListener("change", function (event) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];

      const fileItem = document.createElement("div");
      fileItem.className = "file-item";
      fileItem.textContent = file.name;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Удалить";
      deleteButton.addEventListener("click", function () {
        fileList.removeChild(fileItem);
        fileInput.value = "";
        checkFormValidity();
      });

      fileItem.appendChild(deleteButton);
      fileList.appendChild(fileItem);
    }
    checkFormValidity();
  });
}

function checkFormValidity() {
  const employmentSelected = document.querySelector(
    'input[name="employment"]:checked'
  );
  const resumeAttached = document.getElementById("resume").files.length > 0;
  const submitButton = document.querySelector(".submit-button");

  if (employmentSelected && resumeAttached && validateForm()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function initializeFormValidation() {
  const form = document.getElementById("interviewForm");
  const inputs = document.querySelectorAll(
    ".input-group input, .input-group textarea"
  );
  const radioButtons = document.querySelectorAll('input[name="employment"]');

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      validateInput(input);
      checkFormValidity();
    });
  });

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", checkFormValidity);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      alert("Форма успешно отправлена!");
    }
  });
}

playButton.addEventListener("click", playVideo);
initSlider();
initializeFAQ();
initFileUpload();
initializeFormValidation();
