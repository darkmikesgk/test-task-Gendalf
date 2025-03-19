export function validateInput(input) {
  const value = input.value.trim();
  let isValid = false;

  switch (input.id) {
    case "name":
      isValid = /^[a-zA-Zа-яА-ЯёЁ]{2,}$/.test(value);
      break;
    case "phone":
      isValid = /^\+?\d{7,}$/.test(value);
      break;
    case "email":
      isValid = validateEmail(value);
      break;
    case "position":
      isValid = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value);
      break;
    case "questions":
      isValid = value !== "";
      break;
  }

  setValidationIcon(input, isValid);
  return isValid;
}

export function setValidationIcon(input, isValid) {
  const icon = input.nextElementSibling;
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
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
