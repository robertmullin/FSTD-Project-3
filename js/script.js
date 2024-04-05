// window.onload = function () {};
// variables selecting DOM elements in the form
const nameField = document.getElementById("name");

const jobRole = document.getElementById("title");
const otherOption = document.querySelector('option[value="other"]');
const otherJobRoleField = document.getElementById("other-job-role");

// give the first text field the focus state by default
nameField.focus();

// hide the other job role field unless other job role was selected
// hide otherJobRole
otherJobRoleField.style.display = "none";
// reveal otherJobRole when "other" is selected
jobRole.addEventListener("change", function () {
  if (jobRole.value == "other") {
    otherJobRoleField.style.display = "block";
  }
});

// making T-Shirt section color availability correct for each style
// variables selecting DOM elements in the form
const shirtDesigns = document.getElementById("design");
const shirtColors = document.getElementById("color");
// store the color options as an array
const shirtColorOptions = document.querySelectorAll("#color option");
// slice that array into the two categories
const jsPuns = Array.from(shirtColorOptions).slice(1, 4);
const heartJS = Array.from(shirtColorOptions).slice(4);

// disable use of the shirt color dropdown until a design is chosen by the user
shirtColors.style.pointerEvents = "none";
// DISCLAIMER: this is a terrible way to do this and in production please just add a class to the HTML
// add event listener to the shirt design element
shirtDesigns.addEventListener("change", function () {
  shirtColors.style.pointerEvents = "auto";
  // loop through and display the corresponding colors based on which design was chosen
  if (shirtDesigns.value == "js puns") {
    jsPuns.forEach(function (option) {
      option.style.display = "block";
    });
    heartJS.forEach(function (option) {
      option.style.display = "none";
    });
  } else {
    jsPuns.forEach(function (option) {
      option.style.display = "none";
    });
    heartJS.forEach(function (option) {
      option.style.display = "block";
    });
  }
});

// Activities section

// variables selecting DOM elements in the form
const activitiesField = document.getElementById("activities");
const activitiesCost = document.getElementById("activities-cost");
let totalCost = 0;
// check for events on the activitiesField
activitiesField.addEventListener("change", function (event) {
  // grab the event target
  const activityCheckbox = event.target;
  // grab the value and convert to a number
  let value = +activityCheckbox.getAttribute("data-cost");
  // if statement to check if the checkbox is triggered and account for it being unchecked
  // add or subtract from totalCost
  if (activityCheckbox.checked == true) {
    totalCost += value;
  } else {
    totalCost -= value;
    if (totalCost < 0) totalCost = 0;
  }
  // send the value to the HTML element
  activitiesCost.innerHTML = `Total: $${totalCost}`;
});

// Payment Info section
// variables selecting DOM elements in the form

const paymentSelect = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

// hide paypal and bitcoin sections
paypal.style.display = "none";
bitcoin.style.display = "none";

// set creditcard to default payment method
const paymentSelections = paymentSelect.children;
paymentSelections[0].setAttribute("value", "method");
paymentSelections[1].setAttribute("selected", "");

paymentSelect.addEventListener("change", function (event) {
  const paymentMethod = event.target.value;
  if (paymentMethod === "credit-card") {
    creditCard.style.display = "block";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
  } else if (paymentMethod === "paypal") {
    paypal.style.display = "block";
    creditCard.style.display = "none";
    bitcoin.style.display = "none";
  } else if (paymentMethod === "bitcoin") {
    bitcoin.style.display = "block";
    creditCard.style.display = "none";
    paypal.style.display = "none";
  }
});

// Form Validation section

// variables selecting DOM elements in the form
const emailField = document.getElementById("email");
const cardNumberField = document.getElementById("cc-num");
const zipCodeField = document.getElementById("zip");
const cvvField = document.getElementById("cvv");
const form = document.querySelector("form");

// add event listener to the form for submit event
form.addEventListener("submit", function (event) {
  // make a variable to reference the value of the "Name" field
  const nameValue = nameField.value;

  // make a variable to store the result of testing the name value with regex
  const nameValidation = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(
    nameValue
  );

  // preventing form submission if name validation fails
  if (!nameValidation) {
    event.preventDefault();
  }

  // email validation section
  const emailValue = emailField.value;
  const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(emailValue);
  console.log("Email:", emailValue);
  console.log("Email validation:", emailValidation);
  if (!emailValidation) {
    event.preventDefault();
  }

  // activities validation section
  const activitiesValidation = totalCost > 0;
  console.log("Activities validation:", activitiesValidation);
  if (!activitiesValidation) {
    event.preventDefault();
  }

  // CC validation section
  const paymentMethod = paymentSelect.value;
  if (paymentMethod === "credit-card") {
    const cardNumberValue = cardNumberField.value;
    const zipCodeValue = zipCodeField.value;
    const cvvValue = cvvField.value;

    const cardNumberValidation = /^\d{13,16}$/g.test(cardNumberValue);
    const zipCodeValidation = /^\d{5}$/g.test(zipCodeValue);
    const cvvValidation = /^\d{3}$/g.test(cvvValue);

    if (!cardNumberValidation || !zipCodeValidation || !cvvValidation) {
      event.preventDefault();
    }
  }
});

// Accessibility Features

// reference the activities checkboxes
const activityCheckboxes = document.querySelectorAll(
  "#activities input[type='checkbox']"
);

// loop over the activities checkboxes and add or remove focus
activityCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("focus", function () {
    checkbox.parentElement.classList.add("focus");
  });

  checkbox.addEventListener("blur", function () {
    checkbox.parentElement.classList.remove("focus");
  });
});

// add validation error indications
function addValidationError(element) {
  element.parentElement.classList.add("not-valid");
  element.parentElement.classList.remove("valid");
  element.parentElement.lastElementChild.style.display = "block";
}

// remove validation error indications
function removeValidationError(element) {
  element.parentElement.classList.add("valid");
  element.parentElement.classList.remove("not-valid");
  element.parentElement.lastElementChild.style.display = "none";
}

// addEventListener for form submission
form.addEventListener("submit", function (event) {
  // validate name field
  const nameValue = nameField.value;
  const nameValidation = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(
    nameValue
  );
  if (!nameValidation) {
    addValidationError(nameField);
    event.preventDefault();
  } else {
    removeValidationError(nameField);
  }

  // validate email field
  const emailValue = emailField.value;
  const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(emailValue);
  if (!emailValidation) {
    addValidationError(emailField);
    event.preventDefault();
  } else {
    removeValidationError(emailField);
  }

  // validate activities selection
  const activitiesValidation = totalCost > 0;
  if (!activitiesValidation) {
    addValidationError(activitiesField);
    event.preventDefault();
  } else {
    removeValidationError(activitiesField);
  }

  // validate credit card fields
  if (paymentMethod === "credit-card") {
    const cardNumberValue = cardNumberField.value;
    const cardNumberValidation = /^\d{13,16}$/g.test(cardNumberValue);
    if (!cardNumberValidation) {
      addValidationError(cardNumberField);
      event.preventDefault();
    } else {
      removeValidationError(cardNumberField);
    }

    // validate zip code
    const zipCodeValue = zipCodeField.value;
    const zipCodeValidation = /^\d{5}$/g.test(zipCodeValue);
    if (!zipCodeValidation) {
      addValidationError(zipCodeField);
      event.preventDefault();
    } else {
      removeValidationError(zipCodeField);
    }

    // validate CC CVV
    const cvvValue = cvvField.value;
    const cvvValidation = /^\d{3}$/g.test(cvvValue);
    if (!cvvValidation) {
      addValidationError(cvvField);
      event.preventDefault();
    } else {
      removeValidationError(cvvField);
    }
  }
});
