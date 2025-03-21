export function validateInput(input) {
  const value = input.value.trim();
  let isValid = false;

  switch (input.id) {
    case "name":
      isValid = /^[a-zA-Zа-яА-ЯёЁ\s'-]{2,}$/.test(value);
      break;
    case "phone":
      const cleanedPhone = value.replace(/[^\d+]/g, "");
      isValid = /^\+?\d{11,}$/.test(cleanedPhone);
      break;
    case "email":
      isValid = validateEmail(value);
      break;
    case "position":
      isValid = /^[a-zA-Zа-яА-ЯёЁ0-9\s'-]+$/.test(value);
      break;
    case "questions":
      isValid = value.trim() !== "";
      break;
  }

  setValidationIcon(input, isValid);
  return isValid;
}

document.getElementById("phone").addEventListener("input", function (event) {
  event.target.value = event.target.value.replace(/[^\d\s()+\-]/g, "");
});

export function setValidationIcon(input, isValid) {
  const icon = input.parentElement.querySelector(".validation-icon");
  if (isValid) {
    input.classList.add("valid");
    input.classList.remove("invalid");
    icon.classList.add("valid");
    icon.classList.remove("invalid");
  } else {
    input.classList.add("invalid");
    input.classList.remove("valid");
    icon.classList.add("invalid");
    icon.classList.remove("valid");
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(email);
}

export function validateForm() {
  const inputs = document.querySelectorAll(
    ".input-group input, .input-group textarea"
  );
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateInput(input)) {
      isValid = false;
    }
  });

  const employmentSelected = document.querySelector(
    'input[name="employment"]:checked'
  );
  const resumeAttached = document.getElementById("resume").files.length > 0;

  if (!employmentSelected || !resumeAttached) {
    isValid = false;
  }

  return isValid;
}
