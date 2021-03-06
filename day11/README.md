![](https://javascript30.com/images/JS3-social-share.png)

# ๐Day 11 - Custom HTML5 Video Player

JavaScript 30์ Day 11 ํ๋ก์ ํธ๋ HTML, CSS, JavaScript๋ง์ ์ด์ฉํด์ ๋๋ง์ ๋น๋์ค ํ๋ ์ด์ด๋ฅผ ๋ง๋ค์ด๋ณด๋ ํ๋ก์ ํธ์ด๋ค.

## ๐ค๐์ฝ๋ ๋ชจ์๋ณด๊ธฐ

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Video Player</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="player">
      <video class="player__video viewer" src="652333414.mp4"></video>

      <div class="player__controls">
        <div class="progress">
          <div class="progress__filled"></div>
        </div>
        <button class="player__button toggle" title="Toggle Play">โบ</button>
        <button class="player__button volume" title="Toggle Volume">๐</button>
        <input
          type="range"
          name="volume"
          class="player__slider"
          min="0"
          max="1"
          step="0.05"
          value="1"
        />
        <input
          type="range"
          name="playbackRate"
          class="player__slider"
          min="0.5"
          max="2"
          step="0.1"
          value="1"
        />
        <button data-skip="-10" class="player__button">ยซ 10s</button>
        <button data-skip="10" class="player__button">10s ยป</button>
        <button class="player__button full-screen">๐ณ</button>
      </div>
    </div>

    <script src="main.js"></script>
  </body>
</html>
```

_**CSS**_

```
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  display: flex;
  background: #7a419b;
  min-height: 100vh;
  background: linear-gradient(135deg, #7c1599 0%, #921099 48%, #7e4ae8 100%);
  background-size: cover;
  align-items: center;
  justify-content: center;
}

.player {
  max-width: 750px;
  border: 5px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
  font-size: 0;
  overflow: hidden;
}

/* This css is only applied when fullscreen is active. */
.player:fullscreen {
  max-width: none;
  width: 100%;
}

.player:-webkit-full-screen {
  max-width: none;
  width: 100%;
}

.player__video {
  width: 100%;
}

.player__button {
  background: none;
  border: 0;
  line-height: 1;
  color: white;
  text-align: center;
  outline: 0;
  padding: 0;
  cursor: pointer;
  max-width: 50px;
}

.player__button:focus {
  border-color: #ffc600;
}

.player__slider {
  width: 10px;
  height: 30px;
}

.player__controls {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: translateY(100%) translateY(-5px);
  transition: all 0.3s;
  flex-wrap: wrap;
  background: rgba(0, 0, 0, 0.1);
}

.player:hover .player__controls {
  transform: translateY(0);
}

.player:hover .progress {
  height: 15px;
}

.player__controls > * {
  flex: 1;
}

.progress {
  flex: 10;
  position: relative;
  display: flex;
  flex-basis: 100%;
  height: 5px;
  transition: height 0.3s;
  background: rgba(0, 0, 0, 0.5);
  cursor: ew-resize;
}

.progress__filled {
  width: 50%;
  background: #ffc600;
  flex: 0;
  flex-basis: 50%;
}

/* unholy css to style input type="range" */

input[type="range"] {
  -webkit-appearance: none;
  background: transparent;
  width: 100%;
  margin: 0 5px;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1.3px;
  border: 0.2px solid rgba(1, 1, 1, 0);
}

input[type="range"]::-webkit-slider-thumb {
  height: 15px;
  width: 15px;
  border-radius: 50px;
  background: #ffc600;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3.5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #bada55;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
  background: #ffffff;
  border-radius: 1.3px;
  border: 0.2px solid rgba(1, 1, 1, 0);
}

input[type="range"]::-moz-range-thumb {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
  height: 15px;
  width: 15px;
  border-radius: 50px;
  background: #ffc600;
  cursor: pointer;
}
```

_**JavaScript**_

```
/* Get our Elements */

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const volume = player.querySelector(".volume");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const screen = player.querySelector(".full-screen");

/* Build out functions */

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function toggleVolume() {
  const mute = video.muted ? "๐" : "๐";
  video.muted = !video.muted;
  volume.textContent = mute;
}

function updateToggle() {
  const icon = this.paused ? "โถ๏ธ" : "โโ";
  toggle.textContent = icon;
}

function skip(e) {
  video.currentTime += parseInt(e.dataset.skip);
}

function handleKeyboard(e) {
  if (e.key === "ArrowRight") {
    skip(skipButtons[1]);
  } else if (e.key === "ArrowLeft") {
    skip(skipButtons[0]);
  } else if (e.key === " ") {
    togglePlay();
  } else if (e.key === "m") {
    toggleVolume();
  }
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleScreen() {
  video.requestFullscreen();
}

/* Hook up the event listners */

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateToggle);
video.addEventListener("pause", updateToggle);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
volume.addEventListener("click", toggleVolume);

window.addEventListener("keydown", handleKeyboard);
skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousedown", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

screen.addEventListener("click", handleScreen);
```

## ๐์ฝ๋ ์ค๋ช

1.  ๊ฐ์ฅ ๋จผ์ , `querySelector`๋ฅผ ์ด์ฉํด์ ํ์ํ element๋ค์ ์ป์ ์ ์๊ฒ ์ธํํด์ค๋ค. ์ด์  ํ์ํ ๊ธฐ๋ฅ๋ค์ ํ๋์ฉ ๊ตฌํํ  ์ฐจ๋ก๋ค. ์ฒซ๋ฒ์งธ๋ก, ์ฌ์ ๋ฐ ์ผ์์ ์ง ๊ธฐ๋ฅ์ด๋ค. togglePlay๋ผ๋ ํจ์๋ฅผ ๋ง๋ค๊ณ  `<video>`์ `paused` ์์ฑ์ ์ด์ฉํด ํ์ฌ ์ผ์์ ์ง ๋์ด์๋ค๋ฉด 'play' ์ฌ์์ค์ด๋ผ๋ฉด 'pause'๋ฅผ method๋ผ๋ ๋ณ์์ ๋ฃ์ด์ค๋ค. ์ดํ์ `play()` ํน์ `pause()` ๋ฉ์๋๋ก ์์์ ์ฌ์ / ์ผ์์ ์ง ์์ผ์ค๋ค. ์๊ฐ์  ํจ๊ณผ๋ฅผ ์ํด ์ฐ๋ฆฌ๊ฐ ์๋ ์ฌ์ ๋ฐ ์ผ์์ ์ง๋ฒํผ์ผ๋ก ์๋ฐ์ดํธ ํด์ฃผ๋ updateToggle ์ด๋ผ๋ ํจ์๋ ๊ฐ์ด ๋ง๋ค์ด์ฃผ๋๋ฐ `video`์ `play`, `pause` ์ด๋ฒคํธ์ ๋ฐ๋ผ ๋ฒํผ์ ์๋ฐ์ดํธ ํด์ค๋ค.

#

2.  ๋๋ฒ์งธ๋ก, ์์์ ์คํต ๊ธฐ๋ฅ์ด๋ค. ์์์ ๋๊ธฐ๊ธฐ ์ํด์ `currentTime`์ด๋ผ๋ ์์ฑ์ ์ด์ฉํ๋๋ฐ `skipButtons`์์ forEach๋ฌธ์ ์ด์ฉํด `click`์ด๋ฒคํธ๊ฐ ๋ฐ์ํ๋ฉด skip์ด๋ผ๋ ํจ์๋ฅผ ์คํ์ํจ๋ค. skip์ด๋ผ๋ ํจ์๋ `video.currentTime`์ ํด๋น ์ด๋ฒคํธ๊ฐ ๋ฒ์ด์ง ๋ฒํผ์ ๋ฐ์ดํฐ ์์ฑ์ ์ด์ฉํ๋ค. ์์ ์ ์์๋ดค๋ฏ์ด JavaScript์์ ์ ๊ทผํ ๋๋ `data-*` ํํ์์ ๋ท๋ถ๋ถ์ธ \* ๋ง์ ์ด์ฉํด ์ ๊ทผํ๋ค. ๊ฒฐ๊ณผ์ ์ผ๋ก ์ด๋ฒคํธ ๊ฐ์ฒด `e`์ dataset์์ฑ์ ํตํด ๋ฌธ์์ด์ ๊ฐ์ ธ์ค๊ณ  parseInt๋ก type์ ๋ฐ๊ฟ์ค๋ค.

#

3.  ์ธ๋ฒ์งธ๋ก, ๋ณผ๋ฅจ๊ณผ ๋ฐฐ์์ ์กฐ์ ํ๋ ๊ธฐ๋ฅ์ด๋ค. ranges๋ผ๋ ๋ณ์์ player\_\_slider๋ผ๋ ํด๋์ค์ ์์๋ค์ ๋ฐ์์คฌ๊ธฐ ๋๋ฌธ์ ๊ทธ๊ฑธ ์ด์ฉํ๋ค. `change`์ `mousemove`์ด๋ฒคํธ์ handleRangeUpdate๋ผ๋ ํจ์๋ฅผ ์คํ์ํค๋๋ฐ ์ด ํจ์๋ html์ `name` element๋ฅผ ์ด์ฉํด value๋ฅผ ์์ ํ๋ค.

#

4.  ๋ง์ง๋ง์ผ๋ก, ๊ฐ์ฅ ๊น๋ค๋ก์ด ์ฌ์ ์งํ ๋ฐ ๊ธฐ๋ฅ์ด๋ค. ํ์ฌ ์ฌ์ ์งํ๋ฅ ์ ๋ฐ๋ผ ์ฌ์ ๋ฐ๋ฅผ ๋ณด์ฌ์ฃผ๋ handleProgress ํจ์์ ํน์  ์ง์ ์ ๋ง์ฐ์ค๋ฅผ ๋์์ ๋ ์์์ ํน์  ์๊ฐ์ผ๋ก ์ด๋์ํค๋ scrubํจ์๋ฅผ ๊ตฌํํ๋ค. ๋จผ์ , handleProgress ํจ์๋ `<video>`์ `currentTime`๊ณผ `duration`์ด๋ผ๋ ๋ฉ์๋๋ฅผ ์ด์ฉํ๋ค. `๋น๋์ค์ ํ์ฌ ์ฌ์ ์๊ฐ / ์ ์ฒด ์์ ์๊ฐ`์ ํผ์ผํธ๋ฅผ percent๋ผ๋ ๋ณ์์ ๋ฃ์ด์ฃผ๊ณ  felx-basis๋ฅผ percent๋งํผ ๋ฐ๊ฟ์ฃผ๋ฉด ์ํ๋ ๊ธฐ๋ฅ์ด ์คํ๋๋ค. scrubํจ์๋ progress์ ์ ์ฒด ๊ธธ์ด(`progress.offsetWidth`)์์ ์ด๋ฒคํธ ๊ฐ์ฒด e์ x์ขํ(`e.offsetX`)๊ฐ ์ด๋ ์๊ฐ์ ๋ํ๋ด๋์ง ๊ตฌํ๋ฉด ๋๋ค. ์๋ฅผ ๋ค๋ฉด, 1๋ถ ์ง๋ฆฌ ์์์์ ์  ๊ฐ์ด๋ฐ(50%)๋ฅผ ํด๋ฆญํ๋ฉด ์์์ ํ์ฌ ์ฌ์์๊ฐ์ด 30์ด๋ก ๋ฐ๋๋ฉด ๋๋ค. ์ด๋ฅผ ์ํด์ ํน์  ์์ ์ x์ขํ์์ ์ ์ฒด ๊ธธ์ด๋ฅผ ๋๋ ๊ฐ์ ์ ์ฒด ์ฌ์์๊ฐ์ ๊ณฑํด์ฃผ๋ฉด ์ํ๋ ์๊ฐ์ ์ป์ ์ ์๋ค. ๊ทธ๋ ๊ฒ ์ป์ ์๊ฐ์ `video.currentTime`์ ๋ฃ์ด์ฃผ๋ฉด ๋์ด๋ค.

#

5.  ์ถ๊ฐ๋ก, ์์์ ์ ์ฒด ํ๋ฉด์ผ๋ก ์ฌ์ํ๋ ๊ธฐ๋ฅ๊ณผ ํค๋ณด๋์ ์คํ์ด์ค ๋ฐ๋ฅผ ํตํ ์ฌ์ ๋ฐ ์ผ์์ ์ง๊ธฐ๋ฅ, ๋ฐฉํฅํค๋ก ์คํตํ  ์ ์๋ ๊ธฐ๋ฅ, m์ ๋๋ฅด๋ฉด ์์๊ฑฐ๊ฐ ๊บผ์ก๋ค ์ผ์ง๋ ๊ธฐ๋ฅ๋ฑ์ ์ถ๊ฐ๋ก ๊ตฌํํด๋ณด์๋ค. ์ ์ฒดํ๋ฉด์ผ๋ก ์ ํํด์ฃผ๋ ๊ฒ์ ๊ตฌ๊ธ๋ง์ ํด๋ณด๋ ๋ธ๋ผ์ฐ์ ๋ง๋ค ๋ฉ์๋๋ช์ด ๋ฌ๋๋๋ฐ ๋๋ ํฌ๋กฌ์ ์ด์ฉํ๊ธฐ ๋๋ฌธ์ ํฌ๋กฌ์์๋ง ๊ตฌํ๋  ์ ์๋๋ก ํ๋ค. ํค๋ณด๋๋ฅผ ์ด์ฉํ๋ ๊ธฐ๋ฅ์ handleKeyboard๋ผ๋ ํจ์๋ฅผ ๋ง๋ค์ด ํด๋น ํค๊ฐ ์๋ ฅ๋  ๊ฒฝ์ฐ ํ์ํ ๊ธฐ๋ฅ์ ์ํํ  ์ ์๋๋ก ํด๋ณด์๋ค.

## ๐TIL(Today I Learned)

- ๋์ค์ ๋ณด๋ฉด ์ ๋ง ์์ข์ ์ฝ๋์ผ ์ ์์ง๋ง, ์ง๊ธ๊น์ง ๋ด๊ฐ ์๋ ๋ฐฉ๋ฒ + ๊ตฌ๊ธ๋ง์ ํตํด ์ถ๊ฐ์ ์ธ ๊ธฐ๋ฅ์ ๊ตฌํํ๋ฉด์ customizing ํด๋ดค๋๋ฐ, ์์ผ๋ก ์์ ํ๋ก์ ํธ๋ ์ด๋ฌํ ์์์ ํตํด ์๋ฐ์คํฌ๋ฆฝํธ์ ๋ ๊ฐ๊น์์ ธ์ผ๊ฒ ๋ค.
- `dataset`, `offsetX`, `offsetWidth`, `video(HTML)`

[JavaScript 30 ํ๋ก์ ํธ ๊ฒฐ๊ณผ๋ฌผ](https://mjn9ine.github.io/javascript-30days/)
