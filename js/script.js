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
  } else {
    otherJobRoleField.style.display = "none";
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
// reset if the shirt design is changed after a color is selected
const newColorSelection = document.createElement('option');
newColorSelection.textContent = 'Please select again...';
newColorSelection.setAttribute('value', 'reselect');
newColorSelection.setAttribute('hidden', '');
shirtColors.insertBefore(newColorSelection, shirtColors.children[1]);
// disable use of the shirt color dropdown until a design is chosen by the user
shirtColors.disabled = true;
// add event listener to the shirt design element
shirtDesigns.addEventListener("change", function () {
  shirtColors.disabled = false;
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

  if (shirtColors.value !== "") {
    shirtColors.value = "reselect";
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
  const paymentType = event.target.value;
  if (paymentType === "credit-card") {
    creditCard.style.display = "block";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
  } else if (paymentType === "paypal") {
    paypal.style.display = "block";
    creditCard.style.display = "none";
    bitcoin.style.display = "none";
  } else if (paymentType === "bitcoin") {
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
const paymentMethod = paymentSelect.value;

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
  if (!emailValidation) {
    event.preventDefault();
  }

  // activities validation section
  const activitiesValidation = totalCost > 0;
  if (!activitiesValidation) {
    event.preventDefault();
  }

  // Payment method validation section
  const paymentMethod = paymentSelect.value;
  if (paymentMethod === "credit-card") {
    // CC validation section
    const cardNumberValue = cardNumberField.value;
    const zipCodeValue = zipCodeField.value;
    const cvvValue = cvvField.value;

    const cardNumberValidation = /^\d{13,16}$/g.test(cardNumberValue);
    const zipCodeValidation = /^\d{5}$/g.test(zipCodeValue);
    const cvvValidation = /^\d{3}$/g.test(cvvValue);

    if (!cardNumberValidation || !zipCodeValidation || !cvvValidation) {
      event.preventDefault();
    } else {
      // If payment method is not credit-card, skip credit card validation
      removeValidationError(cardNumberField);
      removeValidationError(zipCodeField);
      removeValidationError(cvvField);
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

// add validation error indications for Activities Field
function addValidationErrorActivities(element) {
  activitiesField.firstElementChild.classList.add("not-valid");
  activitiesField.firstElementChild.classList.remove("valid");
  activitiesField.querySelector('.activities-hint').style.display = "block";
}

// remove validation error indications for Activities Field
function removeValidationErrorActivities(element) {
  activitiesField.firstElementChild.classList.add("valid");
  activitiesField.firstElementChild.classList.remove("not-valid");
  activitiesField.querySelector('.activities-hint').style.display = "none";
}

// addEventListener for form submission
form.addEventListener("submit", function (event) {

  const paymentMethod = paymentSelect.value;
  // validate name field
  const nameValue = nameField.value;
  const nameValidation = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(nameValue);
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
    addValidationErrorActivities(activitiesField);
    event.preventDefault();
  } else {
    removeValidationErrorActivities(activitiesField);
  }

 // validate credit card fields only if payment method is "credit-card"
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
} else {
  // If payment method is not credit-card, remove any previous validation errors for credit card fields
  removeValidationError(cardNumberField);
  removeValidationError(zipCodeField);
  removeValidationError(cvvField);
}
}); 