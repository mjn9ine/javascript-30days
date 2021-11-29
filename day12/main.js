const pressedBox = document.querySelector(".pressedBox");
const pressed = [];
const secretCode = "mjne";

for (let i = 0; i < secretCode.length + 1; i++) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("pressedBox__key");
  pressedBox.appendChild(newDiv);
}

function findSecretCode() {
  for (let i = 2; i < pressed.length + 1; i++) {
    document
      .querySelector(`.pressedBox__key:nth-child(${i})`)
      .classList.add("cong");
  }
}

window.addEventListener("keyup", (e) => {
  const pressedKey = e.key;
  pressed.push(pressedKey);
  pressed.splice(
    -1 - secretCode.length - 1,
    pressed.length - secretCode.length - 1
  );
  for (let i = 0; i < pressed.length; i++) {
    const nthBox = document.querySelector(
      `.pressedBox__key:nth-child(${
        secretCode.length + 1 - pressed.length + 1 + i
      })`
    );
    nthBox.innerHTML = pressed[i];
  }

  console.log(pressed);
  if (pressed.join("").substring(1) === secretCode) {
    findSecretCode();
    console.log("DING DING!");
    cornify_add();
  }
});

const pressedBox__key = document.querySelectorAll(".pressedBox__key");
pressedBox__key.forEach((box) =>
  box.addEventListener("transitionend", (e) => {
    if (e.propertyName === "transform") {
      e.target.classList.remove("cong");
    }
  })
);
