const email = document.getElementById("email");
const name = document.getElementById("name");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const password2Msg = document.getElementById("password2-msg");
const nameMsg = document.getElementById("name-msg");
const emailMsg = document.getElementById("email-msg");
const passwordMsg = document.getElementById("password-msg");
const submitMsg = document.getElementById("submit-msg");
const submit = document.getElementById("submit");
const form = document.getElementsByTagName("form")[0];

function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

function validateName(name) {
  if (name.length === 0) {
    return false;
  } else {
    return true;
  }
}

function verifyPassword(password, password2, length) {
  if (validatePassword(password, length)) {
    if (password2 !== password) {
      return false;
    } else {
      return true;
    }
  }
  return false;
}

function validatePassword(password, length) {
  if (password.length < length) {
    return false;
  } else {
    return true;
  }
}

password2.addEventListener("input", function () {
  if (validatePassword(password2.value, 8)) {
    if (!verifyPassword(password.value, password2.value, 8)) {
      password2Msg.style.color = "red";
      password2Msg.innerHTML = "Passwords do not match";
    } else {
      password2Msg.style.color = "green";
      password2Msg.innerHTML = "Password verified";
    }
  } else {
    password2Msg.innerHTML = "";
  }
});

password.addEventListener("focusout", function () {
  if (!validatePassword(password.value, 8)) {
    passwordMsg.style.color = "red";
    passwordMsg.innerHTML = "Password should be 8 characters long";
  }
});

password.addEventListener("input", function () {
  if (password.value.length > 7) {
    passwordMsg.style.color = "black";
    if (password.value.length < 10) {
      passwordMsg.innerHTML =
        'Password strength: <span style="color:red">Weak</span>';
    } else if (password.value.length < 13) {
      passwordMsg.innerHTML =
        'Password strength: <span style="color:orange">Medium</span>';
    } else {
      passwordMsg.innerHTML =
        'Password strength: <span style="color:green">Good</span>';
    }
  }
});

email.addEventListener("focusout", function () {
  if (validateEmail(email.value)) {
    emailMsg.innerHTML = "";
  } else {
    emailMsg.innerHTML = "Invalid Email Id";
  }
});

name.addEventListener("focusout", function () {
  name.value = name.value.trim();
  if (!validateName(name.value)) {
    nameMsg.innerHTML = "Name field cannot be empty";
  } else {
    nameMsg.innerHTML = "";
  }
});

form.addEventListener("input", function () {
  submit.disabled = !(
    validateEmail(email.value) &&
    validateName(name.value) &&
    validatePassword(password.value, 8) &&
    verifyPassword(password.value, password2.value, 8)
  );
});
