export function initSlider() {
  let currentIndex = 0;
  const slider = document.querySelector(".life-feed__slider");
  const cards = document.querySelectorAll(".life-feed__card");
  const totalCards = cards.length;
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  function getCardMargin() {
    return parseInt(window.getComputedStyle(cards[0]).marginInlineStart, 10);
  }

  function updateArrows() {
    const cardMargin = getCardMargin();
    const cardWidth = cards[0].offsetWidth + cardMargin;
    const visibleCards = Math.floor(slider.offsetWidth / cardWidth);
    const maxIndex = totalCards - visibleCards;

    if (currentIndex <= 0) {
      leftArrow.disabled = true;
      leftArrow.style.color = "#666666";
    } else {
      leftArrow.disabled = false;
      leftArrow.style.color = "#00B7EC";
    }

    if (currentIndex >= maxIndex) {
      rightArrow.disabled = true;
      rightArrow.style.color = "#666666";
    } else {
      rightArrow.disabled = false;
      rightArrow.style.color = "#00B7EC";
    }
  }

  function scrollSlider(direction) {
    const cardMargin = getCardMargin();
    const cardWidth = cards[0].offsetWidth + cardMargin;
    const visibleCards = Math.floor(slider.offsetWidth / cardWidth);
    const maxIndex = totalCards - visibleCards;

    currentIndex += direction;

    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateArrows();
  }

  leftArrow.addEventListener("click", () => scrollSlider(-1));
  rightArrow.addEventListener("click", () => scrollSlider(1));

  window.addEventListener("resize", updateArrows);
  updateArrows();
}
