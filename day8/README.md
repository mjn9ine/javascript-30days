![](https://javascript30.com/images/JS3-social-share.png)

# ๐Day 8 - Fun with HTML5 Canvas

JavaScript 30์ Day 8 ํ๋ก์ ํธ๋ HTML์ `canvas` element์ ๋ค์ํ ๋ฉ์๋๋ฅผ ์ฌ์ฉํ์ฌ ๋์ํด๋ณด๋ ํ๋ก์ ํธ์ด๋ค.

## ๐ค๐์ฝ๋ ๋ชจ์๋ณด๊ธฐ

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML5 Canvas</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <canvas id="draw" width="800" height="800"></canvas>
    <span class="mode">๐๏ธ ARTIST MODE</span>
    <script src="main.js"></script>
  </body>
</html>
```

_**CSS**_

```
html,
body {
  margin: 0;
  height: 100vh;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    270deg,
    #f0e9d2 0%,
    #e6ddc4 33%,
    #678983 66%,
    #181d31 100%
  );
}

#draw {
  background-color: white;
}

.mode {
  margin-top: 5%;
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  text-decoration: underline;
  color: #7b113a;
  font-family: sans-serif;
}
```

_**JavaScript**_

```
const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 50;
// ctx.globalCompositeOperation = "multiply";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
let eraseMode = false;

function draw(e) {
  if (!isDrawing) return;
  if (eraseMode) {
    drawEraseMode(e);
  } else {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if (hue >= 360) {
      hue = 0;
    }

    ctx.linewidth++;
    if (ctx.lineWidth >= 80 || ctx.lineWidth <= 1) {
      direction = !direction;
    }

    if (direction) {
      ctx.lineWidth++;
    } else {
      ctx.lineWidth--;
    }
  }
}

function drawEraseMode(e) {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
window.addEventListener("keydown", (e) => {
  if (e.key === "e") {
    eraseMode = !eraseMode;
    if (eraseMode) document.querySelector(".mode").innerHTML = `โช ERASER MODE`;
    else document.querySelector(".mode").innerHTML = `๐๏ธ ARTIST MODE`;
  }
});
```

## ๐์ฝ๋ ์ค๋ช

1.  ๊ฐ์ฅ ๋จผ์ , `querySelector`๋ฅผ ์ฌ์ฉํ์ฌ draw๋ผ๋ id๋ฅผ ๊ฐ์ง canvas element๋ฅผ canvas์ ํ ๋นํด์ค๋ค. ๊ทธ ํ์, `getContext` ๋ฉ์๋๋ฅผ ํ์ฉํด ์บ๋ฒ์ค์ ๋๋ก์ ์ปจํ์คํธ(๊ทธ๋ ค์ง ๋์)์ ctx๋ผ๋ ๋ณ์์ ๋ฐ์์ค๋ค. ์ด๋ฒ ํ๋ก์ ํธ์๋ 2d ๊ทธ๋ฆผํ์ ๊ตฌํํ๊ธฐ ๋๋ฌธ์ ์ธ์๋ก๋ '2d'๋ฅผ ๋ฃ์ด์ค๋ค. ์ด์  canvas์ ๋ข์ด์ ๋๋น๋ฅผ window์ ๋์ด์ ๋๋น๋ก ๋ฐ๊ฟ์ฃผ๊ณ , ctx์ `strokeStyle`, `lineJoin`, `lineCap`, `lineWidth`๋ฅผ ์ค์ ํด์ค๋ค.

#

2.  ์ด์  `draw` ํจ์๋ฅผ ๋ง๋ค์ด์ค๋ค. ์ด ํจ์๋ ๋ง์ฐ์ค๊ฐ ์์ง์ผ ๋ ์คํ๋์ด์ผ ํ๋ฏ๋ก addEventListener์ `mousemove` ์ด๋ฒคํธ๋ฅผ ์ด์ฉํ๋ค. `draw`ํจ์๋ฅผ ์์ฑ์ํค๊ธฐ ์ํด์ ctx์ `beginPath` ๋ฉ์๋๋ฅผ ํตํด ์๋ก์ด ๊ฒฝ๋ก๋ฅผ ์์ฑํ๊ณ  `moveTo` ๋ฉ์๋๋ก x์ y์ ์ขํ๋ฅผ ์ฎ๊ฒจ์ค๋ค. ์ขํ๋ฅผ ์ฎ๊ฒผ์ผ๋ฉด `lineTo` ๋ฉ์๋๋ฅผ ํ์ฉํด ์ ์ ๋ง์ง๋ง ์ง์ ์ ์ค์ ํ๋๋ฐ ์ด ๋ MouseEvenet์ `offsetX`, `offsetY`๋ฅผ ํตํด ํ์ฌ ๋ง์ฐ์ค์ ์ขํ๋ฅผ ๋ฐ์์ค๋ค. ๋ง์ง๋ง์ผ๋ก `stroke` ๋ฉ์๋๋ก ์ ์ ๊ทธ๋ ค์ค๋ค. ์ ๋ฆฌํ๋ฉด ๋ค์๊ณผ ๊ฐ๋ค.

```
ctx.beginPath(); // ์๋ก์ด ๊ฒฝ๋ก ์์ฑ
ctx.moveTo(lastX, lastY); // ์ ์ ์์์ 
ctx.lineTo(e.offsetX, e.offsetY); // ์ ์ ์ข์ฐฉ์ 
ctx.stroke(); // ์  ๊ธ๊ธฐ
```

#

3.  ์ฒ์์ lastX์ lastY๋ฅผ 0์ผ๋ก ์ค์ ํ๊ธฐ ๋๋ฌธ์ ํ ์ ์์ ์ ์ด ๊ทธ์ด์ง๋ ๊ฑธ ๋ฐ๊พธ๊ธฐ ์ํด์ ์ ์ ๊ทธ๋ฆฐ ํ์๋ `lastX -> e.offsetX`, `lastY -> e.offsetY`๋ก ๋ฐ๊ฟ์ค๋ค. ๋ง์ฐ์ค๋ฅผ ํด๋ฆญํ ์ํ์ฌ์ผ๋ง ๊ทธ๋ฆผ์ด ๊ทธ๋ ค์ ธ์ผ ํ๊ธฐ ๋๋ฌธ์ isDrawing ์ด๋ผ๋ ๋ณ์๋ฅผ ๋ง๋ค์ด์ฃผ๊ณ , draw ํจ์๊ฐ ์คํ๋๊ธฐ ์ ์ isDrawing์ด false๋ผ๋ฉด ๋ฐ๋ก return ํ์ฌ ๋ ์ด์ ํจ์๊ฐ ์คํ๋์ง ์๋๋ก ํ๋ค. ์ดํ์ `mouseup`๊ณผ `mouseout` ์ด๋ฒคํธ๊ฐ ๋ฐ์ํ๋ฉด isDrawing์ false๋ก ๋ฐ๊ฟ์ค๋ค. ์ดํ์๋ ๋์์ธ์ ๋ฐ๊ฟ์ฃผ๊ธฐ ์ํ ์ฝ๋์ด๋ค.

#

4. ๋ค๋ฅธ ๋ธ๋ก๊ทธ๋ฅผ ์ฐธ๊ณ ํด๋ณด๋ `์ง์ฐ๊ฐ ๋ชจ๋`๋ฅผ ๋ง๋ค์ด์ค ๊ฒ์ ๋ดค๋ค. ๊ฐ์ ์ธ์ ์ถ๊ฐ์ ์ธ ๊ธฐ๋ฅ์ ๋ง๋ค์ด๋ณด๋ ๊ฒ์ด ์ด ํ๋ก์ ํธ์ ๋ฌ๋ฏธ๋ผ๊ณ  ์๊ฐํด ๋๋ ๋ง๋ค์ด๋ณด์๋ค. ๊ธฐ๋ณธ์ ์ผ๋ก ARTIST MODE์์ ํค๋ณด๋ `e`๋ฅผ ๋๋ฅด๋ฉด ERASER MODE๋ก ๋ฐ๋๊ฒ ํ๋๋ฐ, ๋ฐ๋ก drawEraseMode๋ผ๋ ํจ์๋ฅผ ๋ง๋ค์ด 50์ ๋๊ป๋ก ํฐ์์ผ๋ก ์น ํ์ฌ ์ง์ฐ๊ฐ ํจ๊ณผ๋ฅผ ๋ณด์ฌ์ค ์ ์์๋ค.

## ๐TIL(Today I Learned)

- ๊ฐ์ ์ธ์ ์ถ๊ฐ์ ์ผ๋ก ๋ด๊ฐ ๊ตฌํํ๊ณ  ์ถ์ ๋ถ๋ถ์ ๊ตฌํํ๋ค๋ณด๋ ๋ ์ฌ๋ฏธ์๋ ํ๋ก์ ํธ์๋ค. ์์ฑ์์ ํ์ ํ์ง๋ง ๊ทธ๋งํผ ๋ฐ์ ํด์ผํ  ํ์์ฑ์ ๋๋ ์ ์์๋ค!!
- `canvas(HTML, JavaScript)`, `HTMLCanvasElement.getContext()`, `๋ค์ํ ๋ฉ์๋๋ค`

[JavaScript 30 ํ๋ก์ ํธ ๊ฒฐ๊ณผ๋ฌผ](https://mjn9ine.github.io/javascript-30days/)
