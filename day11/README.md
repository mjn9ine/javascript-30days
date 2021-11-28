![](https://javascript30.com/images/JS3-social-share.png)

# 📖Day 11 - Custom HTML5 Video Player

JavaScript 30의 Day 11 프로젝트는 HTML, CSS, JavaScript만을 이용해서 나만의 비디오 플레이어를 만들어보는 프로젝트이다.

## 🤓📄코드 모아보기

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
        <button class="player__button toggle" title="Toggle Play">►</button>
        <button class="player__button volume" title="Toggle Volume">🔊</button>
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
        <button data-skip="-10" class="player__button">« 10s</button>
        <button data-skip="10" class="player__button">10s »</button>
        <button class="player__button full-screen">🔳</button>
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
  const mute = video.muted ? "🔊" : "🔇";
  video.muted = !video.muted;
  volume.textContent = mute;
}

function updateToggle() {
  const icon = this.paused ? "▶️" : "❚❚";
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

## 🔎코드 설명

1.  가장 먼저, `querySelector`를 이용해서 필요한 element들을 얻을 수 있게 세팅해준다. 이제 필요한 기능들을 하나씩 구현할 차례다. 첫번째로, 재생 및 일시정지 기능이다. togglePlay라는 함수를 만들고 `<video>`의 `paused` 속성을 이용해 현재 일시정지 되어있다면 'play' 재생중이라면 'pause'를 method라는 변수에 넣어준다. 이후에 `play()` 혹은 `pause()` 메서드로 영상을 재생 / 일시정지 시켜준다. 시각적 효과를 위해 우리가 아는 재생 및 일시정지버튼으로 업데이트 해주는 updateToggle 이라는 함수도 같이 만들어주는데 `video`의 `play`, `pause` 이벤트에 따라 버튼을 업데이트 해준다.

#

2.  두번째로, 영상의 스킵 기능이다. 영상을 넘기기 위해서 `currentTime`이라는 속성을 이용하는데 `skipButtons`에서 forEach문을 이용해 `click`이벤트가 발생하면 skip이라는 함수를 실행시킨다. skip이라는 함수는 `video.currentTime`에 해당 이벤트가 벌어진 버튼의 데이터 속성을 이용한다. 예전에 알아봤듯이 JavaScript에서 접근할때는 `data-*` 형태에서 뒷부분인 \* 만을 이용해 접근한다. 결과적으로 이벤트 객체 `e`의 dataset속성을 통해 문자열을 가져오고 parseInt로 type을 바꿔준다.

#

3.  세번째로, 볼륨과 배속을 조절하는 기능이다. ranges라는 변수에 player\_\_slider라는 클래스의 요소들을 받아줬기 때문에 그걸 이용한다. `change`와 `mousemove`이벤트에 handleRangeUpdate라는 함수를 실행시키는데 이 함수는 html의 `name` element를 이용해 value를 수정한다.

#

4.  마지막으로, 가장 까다로운 재생 진행 바 기능이다. 현재 재생 진행률에 따라 재생 바를 보여주는 handleProgress 함수와 특정 지점에 마우스를 놓았을 때 영상의 특정 시간으로 이동시키는 scrub함수를 구현한다. 먼저, handleProgress 함수는 `<video>`의 `currentTime`과 `duration`이라는 메서드를 이용한다. `비디오의 현재 재생 시간 / 전체 영상 시간`의 퍼센트를 percent라는 변수에 넣어주고 felx-basis를 percent만큼 바꿔주면 원하는 기능이 실행된다. scrub함수는 progress의 전체 길이(`progress.offsetWidth`)에서 이벤트 객체 e의 x좌표(`e.offsetX`)가 어느 시간을 나타내는지 구하면 된다. 예를 들면, 1분 짜리 영상에서 정 가운데(50%)를 클릭하면 영상의 현재 재생시간이 30초로 바뀌면 된다. 이를 위해서 특정 시점의 x좌표에서 전체 길이를 나눈 값에 전체 재생시간을 곱해주면 원하는 시간을 얻을 수 있다. 그렇게 얻은 시간을 `video.currentTime`에 넣어주면 끝이다.

#

5.  추가로, 영상을 전체 화면으로 재생하는 기능과 키보드의 스페이스 바를 통한 재생 및 일시정지기능, 방향키로 스킵할 수 있는 기능, m을 누르면 음소거가 꺼졌다 켜지는 기능등을 추가로 구현해보았다. 전체화면으로 전환해주는 것은 구글링을 해보니 브라우저마다 메서드명이 달랐는데 나는 크롬을 이용하기 때문에 크롬에서만 구현될 수 있도록 했다. 키보드를 이용하는 기능은 handleKeyboard라는 함수를 만들어 해당 키가 입력될 경우 필요한 기능을 수행할 수 있도록 해보았다.

## 🚀TIL(Today I Learned)

- 나중에 보면 정말 안좋은 코드일 수 있지만, 지금까지 내가 아는 방법 + 구글링을 통해 추가적인 기능을 구현하면서 customizing 해봤는데, 앞으로 있을 프로젝트도 이러한 작업을 통해 자바스크립트와 더 가까워져야겠다.
- `dataset`, `offsetX`, `offsetWidth`, `video(HTML)`

[JavaScript 30 프로젝트 결과물](https://mjn9ine.github.io/javascript-30days/)
