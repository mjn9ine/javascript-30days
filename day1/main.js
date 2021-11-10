function playSound(e) {
  console.log(e.key);
  const audio = document.querySelector(`audio[data-key='${e.key}']`);
  const key = document.querySelector(`.key[data-key='${e.key}']`);

  if (audio) {
    audio.currentTime = 0; // rewind to the start (처음으로 되돌린다.)
    audio.play();
    key.classList.add("playing");
  }
}

function removeTransition(e) {
  if (e.propertyName === "transform") {
    this.classList.remove("playing");
  }
}

window.addEventListener("keydown", playSound);

const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
