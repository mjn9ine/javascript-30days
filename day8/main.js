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
