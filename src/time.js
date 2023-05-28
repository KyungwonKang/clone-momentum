const currentTime = document.getElementById("current-time");

function updateTimeText() {
  const now = new Date();
  const hour = now.getHours().toString();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  currentTime.innerText = hour + ":" + minutes;
}

function startUpdateClock() {
  updateTimeText();
  setInterval(updateTimeText, 1000);
}

startUpdateClock();
