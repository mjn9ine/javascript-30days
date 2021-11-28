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
