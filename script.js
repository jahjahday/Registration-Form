const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const errorHandler = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
};

const successHandler = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    successHandler(input);
  } else {
    errorHandler(input, "Email is not valid");
  }
}

//CHECK REQUIRED FIELDS
const checkRequired = (inputArr) => {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      errorHandler(input, `${getFieldName(input)} is required`);
    } else {
      successHandler(input);
    }
  });
};

//CHECK INPUT LENGTH
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    errorHandler(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    errorHandler(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    successHandler(input);
  }
};

//CHECK PASSWORD MATCH
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    errorHandler(input2, "Passwords do not match");
  }
}

//GET FIELDNAME
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// EVENT LISTENERs

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 5, 15);
  checkLength(password, 6, 15);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
