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

const shirtDesigns = document.getElementById("design");
const shirtColors = document.getElementById("color");

const shirtColorOptions = document.querySelectorAll("#color option");

const jsPuns = Array.from(shirtColorOptions).slice(1, 4);
const heartJS = Array.from(shirtColorOptions).slice(4);

console.log(heartJS);

shirtColors.style.pointerEvents = "none";

shirtDesigns.addEventListener("change", function () {
  shirtColors.style.pointerEvents = "auto";

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
