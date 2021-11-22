![](https://javascript30.com/images/JS3-social-share.png)

# 📖Day 8 - Fun with HTML5 Canvas

JavaScript 30의 Day 8 프로젝트는 HTML의 `canvas` element와 다양한 메서드를 사용하여 낙서해보는 프로젝트이다.

## 🤓📄코드 모아보기

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
    <span class="mode">🖌️ ARTIST MODE</span>
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
    if (eraseMode) document.querySelector(".mode").innerHTML = `⚪ ERASER MODE`;
    else document.querySelector(".mode").innerHTML = `🖌️ ARTIST MODE`;
  }
});
```

## 🔎코드 설명

1.  가장 먼저, `querySelector`를 사용하여 draw라는 id를 가진 canvas element를 canvas에 할당해준다. 그 후에, `getContext` 메서드를 활용해 캔버스의 드로잉 컨텍스트(그려질 대상)을 ctx라는 변수에 받아준다. 이번 프로젝트에는 2d 그림판을 구현하기 때문에 인자로는 '2d'를 넣어준다. 이제 canvas의 넢이와 너비를 window의 높이와 너비로 바꿔주고, ctx의 `strokeStyle`, `lineJoin`, `lineCap`, `lineWidth`를 설정해준다.

#

2.  이제 `draw` 함수를 만들어준다. 이 함수는 마우스가 움직일 때 실행되어야 하므로 addEventListener의 `mousemove` 이벤트를 이용한다. `draw`함수를 완성시키기 위해서 ctx의 `beginPath` 메서드를 통해 새로운 경로를 생성하고 `moveTo` 메서드로 x와 y의 좌표를 옮겨준다. 좌표를 옮겼으면 `lineTo` 메서드를 활용해 선의 마지막 지점을 설정하는데 이 때 MouseEvenet의 `offsetX`, `offsetY`를 통해 현재 마우스의 좌표를 받아준다. 마지막으로 `stroke` 메서드로 선을 그려준다. 정리하면 다음과 같다.

```
ctx.beginPath(); // 새로운 경로 생성
ctx.moveTo(lastX, lastY); // 선의 시작점
ctx.lineTo(e.offsetX, e.offsetY); // 선의 종착점
ctx.stroke(); // 선 긋기
```

#

3.  처음에 lastX와 lastY를 0으로 설정했기 때문에 한 점에서 선이 그어지는 걸 바꾸기 위해서 선을 그린 후에는 `lastX -> e.offsetX`, `lastY -> e.offsetY`로 바꿔준다. 마우스를 클릭한 상태여야만 그림이 그려져야 하기 때문에 isDrawing 이라는 변수를 만들어주고, draw 함수가 실행되기 전에 isDrawing이 false라면 바로 return 하여 더 이상 함수가 실행되지 않도록 한다. 이후에 `mouseup`과 `mouseout` 이벤트가 발생하면 isDrawing을 false로 바꿔준다. 이후에는 디자인을 바꿔주기 위한 코드이다.

#

4. 다른 블로그를 참고해보니 `지우개 모드`를 만들어준 것을 봤다. 강의 외에 추가적인 기능을 만들어보는 것이 이 프로젝트의 묘미라고 생각해 나도 만들어보았다. 기본적으로 ARTIST MODE에서 키보드 `e`를 누르면 ERASER MODE로 바뀌게 했는데, 따로 drawEraseMode라는 함수를 만들어 50의 두께로 흰색으로 칠하여 지우개 효과를 보여줄 수 있었다.

## 🚀TIL(Today I Learned)

- 강의 외에 추가적으로 내가 구현하고 싶은 부분을 구현하다보니 더 재미있는 프로젝트였다. 완성작은 허접하지만 그만큼 발전해야할 필요성을 느낄 수 있었다!!
- `canvas(HTML, JavaScript)`, `HTMLCanvasElement.getContext()`, `다양한 메서드들`

[JavaScript 30 프로젝트 결과물](https://mjn9ine.github.io/javascript-30days/)
