function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btn = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
console.log(btn);

btn.stop.disabled = true;

btn.start.addEventListener('click', onBtnStart);
btn.stop.addEventListener('click', onBtnStop);

let interval = null;

function onBtnStart() {
  interval = setInterval(() => {
    btn.body.style.background = getRandomHexColor();
  }, 1000);
  btn.start.disabled = true;
  btn.stop.disabled = false;
}
function onBtnStop() {
  clearTimeout(interval);
  btn.start.disabled = false;
  btn.stop.disabled = true;
}
