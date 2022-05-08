const fullName = document.querySelector("#name");
const validName = document.querySelector("#valid-name");
const invalidName = document.querySelector("#invalid-name");
const errorName = document.querySelector("#error-name");

const email = document.querySelector("#email");
const validEmail = document.querySelector("#valid-email");
const invalidEmail = document.querySelector("#invalid-email");
const errorEmail = document.querySelector("#error-email");

const subject = document.querySelector("#subject");
const validSubject = document.querySelector("#valid-subject");
const invalidSubject = document.querySelector("#invalid-subject");
const errorSubject = document.querySelector("#error-subject");

const message = document.querySelector("#message");
const validMessage = document.querySelector("#valid-message");
const invalidMessage = document.querySelector("#invalid-message");
const errorMessage = document.querySelector("#error-message");

fullName.addEventListener("blur", validateName);

function validateName(event) {
  event.preventDefault();
  if (checkLength(fullName.value, 5)) {
    validName.style.display = "block";
    invalidName.style.display = "none";
    errorName.style.display = "none";
  } else {
    validName.style.display = "none";
    invalidName.style.display = "block";
    errorName.style.display = "block";
  }
}

email.addEventListener("blur", validateEmail);

function validateEmail(event) {
  event.preventDefault();
  if (checkEmail(email.value)) {
    validEmail.style.display = "block";
    invalidEmail.style.display = "none";
    errorEmail.style.display = "none";
  } else {
    validEmail.style.display = "none";
    invalidEmail.style.display = "block";
    errorEmail.style.display = "block";
  }
}

subject.addEventListener("blur", validateSubject);

function validateSubject(event) {
  event.preventDefault();
  if (checkLength(subject.value, 15)) {
    validSubject.style.display = "block";
    invalidSubject.style.display = "none";
    errorSubject.style.display = "none";
  } else {
    validSubject.style.display = "none";
    invalidSubject.style.display = "block";
    errorSubject.style.display = "block";
  }
}

message.addEventListener("blur", validateMessage);

function validateMessage(event) {
  event.preventDefault();
  if (checkLength(message.value, 15)) {
    validMessage.style.display = "block";
    invalidMessage.style.display = "none";
    errorMessage.style.display = "none";
  } else {
    validMessage.style.display = "none";
    invalidMessage.style.display = "block";
    errorMessage.style.display = "block";
  }
}

function checkEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatch = regEx.test(email);
  return patternMatch;
}

function checkLength(value, length) {
  if (value.trim().length >= length) {
    return true;
  } else {
    return false;
  }
}
