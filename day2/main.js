const secondHand = document.querySelector(`.second-hand`);
const minHand = document.querySelector(`.min-hand`);
const hourHand = document.querySelector(`.hour-hand`);
const displayTime = document.querySelector(`.display-time`);

function setDate() {
  const now = new Date();
  const second = now.getSeconds();
  const secondDegrees = (second / 60) * 360 - 90;

  const min = now.getMinutes();
  const minDegrees = (min / 60) * 360 - 90;

  const hour = now.getHours();
  const hourDegrees = (hour / 12) * 360 - 90;

  if (secondDegrees === -90) {
    secondHand.style.transition = "all 0.001s";
  }
  if (minDegrees === -90) {
    minHand.style.transition = "all 0.001s";
  }
  if (hourDegrees === -90) {
    hourHand.style.transition = "all 0.001s";
  }

  secondHand.style.transform = `rotate(${secondDegrees}deg)`;
  minHand.style.transform = `rotate(${minDegrees}deg)`;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  displayTime.innerHTML = `${hour >= 10 ? hour : `0${hour}`} : ${
    min >= 10 ? min : `0${min}`
  } : ${second >= 10 ? second : `0${second}`}`;
}

setDate();
setInterval(setDate, 1000);
