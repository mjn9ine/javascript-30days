function playSound(e) {
  const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
  // const key = document.querySelector(`li[data]`);

  console.log(audio);
}

window.addEventListener("keydown", playSound);
