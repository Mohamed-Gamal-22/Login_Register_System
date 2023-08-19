// register elements
let signUpUserName = document.querySelector("#signUpUserName");
let signUpEmail = document.querySelector("#signUpEmail");
let signUpPassword = document.querySelector("#signUpPassword");
let registerBtn = document.querySelector(".register");

// login elements
let loginEmail = document.querySelector("#loginEmail");
let loginPassword = document.querySelector("#loginPassword");
let loginBtn = document.querySelector(".login");

// span to change between login and register
let spanGoToLogin = document.querySelector(".signup .last span");
let spanGoToLRegister = document.querySelector(".signin .last span");

// invalid username
let userNameRegWarning = document.getElementById("userNameRegWarning");

let logout = document.querySelector(".logout button");

let users = [];
configureStorage();

registerBtn.addEventListener("click", addUser);
loginBtn.addEventListener("click", function () {
  if (validLoginEmail() == true && loginPassValid() == true) {
    checkForLogin();
  } else {
    swal({
      title: "Error!",
      text: "Not Valid Email Or Password!",
      type: "error",
      confirmButtonText: "Cool",
    });
  }
});

function addUser() {
  if (validEmail() == true && validName() == true && validPassword() == true) {
    if (checkForRegister() == true) {
      let user = {
        username: signUpUserName.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
      };

      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      swal("Good job!", "You are Registerd!, go to login now", "success");
      clear();
      document.querySelector(".signin").classList.replace("d-none", "d-flex");
      document.querySelector(".signup").classList.replace("d-flex", "d-none");
    }
  } else {
    swal({
      title: "Error!",
      text: "Not Valid Email Or Password!",
      type: "error",
      confirmButtonText: "Okay",
    });
  }
}

///////// start validation ////////////
// sign up validation
signUpUserName.addEventListener("blur", validName);
function validName() {
  let regUserName = /^[a-zA-Z0-9]{3,10}$/;
  // let regEmail = /^[\w.+\-]+@gmail\.com$/;

  if (regUserName.test(signUpUserName.value) == true) {
    signUpUserName.classList.add("is-valid");
    signUpUserName.classList.remove("is-invalid");
    userNameRegWarning.classList.replace("d-flex", "d-none");
    return true;
  } else {
    signUpUserName.classList.add("is-invalid");
    signUpUserName.classList.remove("is-valid");
    userNameRegWarning.classList.replace("d-none", "d-flex");
    return false;
  }
}

signUpEmail.addEventListener("blur", validEmail);
function validEmail() {
  let regEmail = /^[\w.+\-]+@gmail\.com$/;

  if (regEmail.test(signUpEmail.value) == true) {
    signUpEmail.classList.add("is-valid");
    signUpEmail.classList.remove("is-invalid");
    return true;
  } else {
    signUpEmail.classList.add("is-invalid");
    signUpEmail.classList.remove("is-valid");
    return false;
  }
}

signUpPassword.addEventListener("blur", validPassword);
function validPassword() {
  let myVal = signUpPassword.value;

  if (myVal != "") {
    signUpPassword.classList.add("is-valid");
    signUpPassword.classList.remove("is-invalid");
    return true;
  } else {
    signUpPassword.classList.add("is-invalid");
    signUpPassword.classList.remove("is-valid");
    return false;
  }
}

///////////////////////////////////////////////////////
// login validation
loginEmail.addEventListener("blur", validLoginEmail);
function validLoginEmail() {
  let regEmail = /^[\w.+\-]+@gmail\.com$/;

  if (regEmail.test(loginEmail.value) == true) {
    loginEmail.classList.add("is-valid");
    loginEmail.classList.remove("is-invalid");
    return true;
  } else {
    loginEmail.classList.add("is-invalid");
    loginEmail.classList.remove("is-valid");

    return false;
  }
}

loginPassword.addEventListener("blur", loginPassValid);
function loginPassValid() {
  let myVal = loginPassword.value;

  if (myVal != "") {
    loginPassword.classList.add("is-valid");
    loginPassword.classList.remove("is-invalid");
    return true;
  } else {
    loginPassword.classList.add("is-invalid");
    loginPassword.classList.remove("is-valid");
    return false;
  }
}

///////// end validation ////////////

function configureStorage() {
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
}

spanGoToLogin.addEventListener("click", function () {
  document.querySelector(".signup").classList.replace("d-flex", "d-none");
  document.querySelector(".signin").classList.replace("d-none", "d-flex");
});

spanGoToLRegister.addEventListener("click", function () {
  document.querySelector(".signup").classList.replace("d-none", "d-flex");
  document.querySelector(".signin").classList.replace("d-flex", "d-none");
});

logout.addEventListener("click", function () {
  showLogin();
  clear();
  swal("You Loged Out!", "Good Bye!", "success");
});

function checkForRegister() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == signUpEmail.value) {
      swal({
        title: "Error!",
        text: "Email Is Already Exist! Try Another One",
        type: "error",
        confirmButtonText: "Okay",
      });
      clear();
      return false;
    }
  }
  return true;
}

function checkForLogin() {
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email == loginEmail.value &&
      users[i].password == loginPassword.value
    ) {
      localStorage.setItem("name", JSON.stringify(users[i].name));
      showHome();
      document.querySelector(
        ".home h1"
      ).innerHTML = `welcome ${users[i].username}`;
      swal("Good job!", "You are loged in now!", "success");
      clear();
      return true;
    }
  }
  swal({
    title: "Error!",
    text: "Not Valid Email Or Password!",
    type: "error",
    confirmButtonText: "Okay",
  });
  return false;
}

function clear() {
  signUpUserName.value = ``;
  signUpEmail.value = ``;
  signUpPassword.value = ``;
  loginEmail.value = ``;
  loginPassword.value = ``;
}

// move between pages
function showLogin() {
  document.querySelector(".signup").classList.replace("d-flex", "d-none");
  document.querySelector(".signin").classList.replace("d-none", "d-flex");
  document.querySelector(".home").classList.replace("d-flex", "d-none");
  document.querySelector(".logout").classList.replace("d-flex", "d-none");
}

function showSignUp() {
  document.querySelector(".signup").classList.replace("d-none", "d-flex");
  document.querySelector(".signin").classList.replace("d-flex", "d-none");
  document.querySelector(".home").classList.replace("d-flex", "d-none");
  document.querySelector(".logout").classList.replace("d-flex", "d-none");
}

function showHome() {
  document.querySelector(".signup").classList.replace("d-flex", "d-none");
  document.querySelector(".signin").classList.replace("d-flex", "d-none");
  document.querySelector(".home").classList.replace("d-none", "d-flex");
  document.querySelector(".logout").classList.replace("d-none", "d-flex");
}
