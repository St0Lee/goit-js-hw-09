function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const bodyEl = document.querySelector("body");
const btnStart = document.querySelector(`[data-start]`);
const btnStop = document.querySelector(`[data-stop]`);
btnStop.disabled = true;
let intervalId = null;


btnStart.addEventListener("click", startChangingColor);
btnStop.addEventListener("click", stopChangingColor);

function startChangingColor() {
  btnStop.disabled = false;
  btnStart.disabled = true;
  intervalId = setInterval(changeColor, 1000);
};

function changeColor (){
    const currentColor = getRandomHexColor();
    bodyEl.style.backgroundColor = currentColor;
};

function stopChangingColor(){
  btnStop.disabled = true;
  btnStart.disabled = false;
  clearInterval(intervalId);
};