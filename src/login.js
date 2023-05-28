const USERNAME_KEY = "username";
const HIDDEN_CLASSNAME = "hidden";

const loginForm = document.getElementById("login-form");
const loginInput = document.getElementById("login-input");

function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  // TODO: username길이가 0일경우 초기화 할 수 있도록~
  localStorage.setItem(USERNAME_KEY, username);
  updateLoginFormUI(true);
  updateGreetingMessages(username);
}

function updateGreetingMessages(username) {
  const greeting = document.getElementById("greeting");
  greeting.innerText = `Hello ${username}! ✨`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

function updateLoginFormUI(isHidden) {
  if (isHidden) {
    loginForm.classList.add(HIDDEN_CLASSNAME);
  } else {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
  }
}

function loadUserNameAndDisplay() {
  const localSavedUserName = localStorage.getItem(USERNAME_KEY);
  if (localSavedUserName === null) {
    updateLoginFormUI(false);
    loginInput.placeholder = 'Please enter your name 😃';
    loginForm.addEventListener("submit", onLoginSubmit);
  } else {
    updateGreetingMessages(localSavedUserName);
  }
}

loadUserNameAndDisplay();
