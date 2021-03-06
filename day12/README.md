![](https://javascript30.com/images/JS3-social-share.png)

# ๐Day 12 - Key Sequence Detection (KONAMI CODE)

JavaScript 30์ Day 12 ํ๋ก์ ํธ๋ ์ง์ ํด๋์ ์ฝ๋๋ฏธ ์ปค๋งจ๋(์นํธ์ฝ๋์ ์ผ์ข์ด๋ผ๊ณ  ํ๋ค.)๋ฅผ ์๋ ฅํ๋ฉด ํ๋ฉด์ ๋๋คํ ์ ๋์ฝ ์ด๋ฏธ์ง๋ฅผ ๋ณด์ฌ์ฃผ๋ ํ๋ก์ ํธ์ด๋ค.

## ๐ค๐์ฝ๋ ๋ชจ์๋ณด๊ธฐ

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Key Detection</title>
    <script
      type="text/javascript"
      src="https://www.cornify.com/js/cornify.js"
    ></script>
  </head>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

_**CSS**_

```
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #f0e9d2 0%,
    #e6ddc4 20%,
    #678983 60%,
    #181d31 100%
  );
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pressedBox {
  width: inherit;
  display: flex;
  justify-content: center;
}

.pressedBox__key {
  width: 8rem;
  height: 8rem;
  font-size: 3rem;
  background: rgba(255, 255, 240, 0.274);
  display: flex;
  justify-content: center;
  align-items: center;
}

.pressedBox__key:first-child {
  opacity: 0.3;
}

.cong {
  transition: all 0.1s ease;
  transform: scale(1.5);
}
```

_**JavaScript**_

```
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
```

## ๐์ฝ๋ ์ค๋ช

1.  ๊ฐ์ฅ ๋จผ์ , ์ฌ์ฉ์๊ฐ ์๋ ฅํ ํค๋ฅผ ๋ฐ์์ค pressed๋ผ๋ ๋ฐฐ์ด์ ๋ง๋ค์ด์ค๋ค. ๊ทธ๋ฆฌ๊ณ  ์ํฌ๋ฆฟ ์ฝ๋๋ฅผ ๋ด ๋ง์๋๋ก ๋ง๋ค์ด์ค๋ค. ์ด์  ํค๋ฅผ ๋๋ฅด๊ณ  ์์ ๋ ์ ๋ ์คํ๋๋ ์ด๋ฒคํธ์ธ `keyup`์ด๋ฒคํธ๋ฅผ ํตํด ์ฌ์ฉ์๊ฐ ์๋ ฅํ๋ ํค๋ฅผ ๋ฐ์ pressed์ pushํด์ค๋ค.

#

2.  ๊ทธ๋ ๊ฒ ๋ฐ์ pressed ๋ฐฐ์ด์ secretCode์ ๋น๊ตํ๊ธฐ ์ํด `splice()` ๋ฉ์๋๋ฅผ ์ด์ฉํ๋ค. ๋ฐฐ์ด์ ๊ธฐ์กด ์์๋ฅผ ์ญ์ ํ๊ฑฐ๋ ๊ต์ฒด, ์ถ๊ฐํ์ฌ ๋ฐฐ์ด์ ๋ด์ฉ์ ๋ณ๊ฒฝํ๋ ๋ฉ์๋์ด๋ค. ๊ทธ๋ ๊ฒ ์ฌ๊ฐ๊ณต๋ pressed ๋ฐฐ์ด์ secretCode๊ฐ ํฌํจ๋์ด ์๋ค๋ฉด `cornify.js`์ `cornify_add()` ๋ฉ์๋๋ฅผ ํตํด ๋๋คํ ์ ๋์ฝ ์ด๋ฏธ์ง๋ฅผ ๋ธ๋ผ์ฐ์  ํ๋ฉด์ ๋ํ๋ธ๋ค.

### _`Array.splice()`_

`splice()`๋ฉ์๋๋ ์ฒซ๋ฒ์งธ ์ธ์๋ก ๋ฐฐ์ด์ ๋ณ๊ฒฝ์ ์์ํ  ์ธ๋ฑ์ค๋ฅผ ๋ฐ๋๋ค. ๋ฐฐ์ด์ ๊ธธ์ด๋ณด๋ค ๊ธธ๋ค๋ฉด ์๋ฌด๊ฒ๋ ์ญ์ ๋์ง ์๋๋ค. ๋๋ฒ์งธ ์ธ์๋ ๋ฐฐ์ด์์ ์ ๊ฑฐํ  element์ ์๋ก, ์๋ตํ  ๊ฒฝ์ฐ ์ฒซ๋ฒ์งธ ์ธ์๋ถํฐ ๋ชจ๋  ์์๋ฅผ ์ ๊ฑฐํ๊ณ , 0 ์ดํ๋ผ๋ฉด ์ด๋ค ์์๋ ์ ๊ฑฐํ์ง ์๋๋ค. ์ธ๋ฒ์งธ ์ธ์๋ ๋ฐฐ์ด์ ์ถ๊ฐํ  ์์๋ก์ ์๋ฌด ์์๋ ์ง์ ํ์ง ์์ผ๋ฉด `splice` ๋ฉ์๋๋ ์์๋ฅผ ์ ๊ฑฐํ๊ธฐ๋ง ํ๋ค.

#

3.  ์ถ๊ฐ์ ์ผ๋ก ์๋ ฅ ๋ฐ์ ๋ฐฐ์ด์ ์๊ฐํํด๋ณด์๋ค. ๊ฐ์์ ์๋ ๊ธฐ๋ฅ์ ํผ์์ ๊ตฌํํ๋ ค๋ ํ๋ค์๋ค.. ์ด๋ฐ ๋ณ๋ณผ์ผ์๋ ๊ธฐ๋ฅ ๊ตฌํํ๋๋ฐ๋ ํ๋ ๊ฑฐ๋ณด๋ฉด ์คํ๋ ค ์ข๋ค. ์ฑ์ฅ๊ฐ๋ฅ์ฑ์ด๋ผ๊ณ  ์๊ฐํ๊ณ  ํ๋ด์ผ๊ฒ ๋ค.

## ๐TIL(Today I Learned)

- ํฌํ์ด 100์ ๊ฐ๊น๋ค. ํ์ฌ ๋ฅ๋ ฅ์ด 0์ ์๋ ดํ๋ค๋ ์๋ฆฌ๋ค๐๐
- `keyup`, `splice`, `createElement`, `appendChild`, `classList.add(remove)`

[JavaScript 30 ํ๋ก์ ํธ ๊ฒฐ๊ณผ๋ฌผ](https://mjn9ine.github.io/javascript-30days/)
