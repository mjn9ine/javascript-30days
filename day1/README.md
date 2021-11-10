![](https://javascript30.com/images/JS3-social-share.png)

# 📖Day 1 - JAVASCRIPT DRUM KIT

JavaScript 30의 Day 1 프로젝트는 '드럼 킷 만들기'이다. 화면에 매칭 된 키보드 버튼을 누르면 연결된 audio 파일을 재생하는 프로젝트이다.

## 🤓📄코드 모아보기

_**HTML**_

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>JS Guitar Kit</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="keys">
      <div class="up-key">
        <div data-key="q" class="key">
          <kbd>Q</kbd>
          <span class="sound">A2A3</span>
        </div>
        <div data-key="w" class="key">
          <kbd>W</kbd>
          <span class="sound">A3</span>
        </div>
        <div data-key="e" class="key">
          <kbd>E</kbd>
          <span class="sound">B2</span>
        </div>
        <div data-key="r" class="key">
          <kbd>R</kbd>
          <span class="sound">B3</span>
        </div>
        <div data-key="u" class="key">
          <kbd>U</kbd>
          <span class="sound">B3B4</span>
        </div>
        <div data-key="i" class="key">
          <kbd>I</kbd>
          <span class="sound">B4</span>
        </div>
        <div data-key="o" class="key">
          <kbd>O</kbd>
          <span class="sound">C#3</span>
        </div>
        <div data-key="p" class="key">
          <kbd>P</kbd>
          <span class="sound">C#3C#4</span>
        </div>
      </div>
      <div class="down-key">
        <div data-key="a" class="key">
          <kbd>A</kbd>
          <span class="sound">C#4</span>
        </div>
        <div data-key="s" class="key">
          <kbd>S</kbd>
          <span class="sound">D#4</span>
        </div>
        <div data-key="d" class="key">
          <kbd>D</kbd>
          <span class="sound">D3</span>
        </div>
        <div data-key="f" class="key">
          <kbd>F</kbd>
          <span class="sound">D5</span>
        </div>
        <div data-key="j" class="key">
          <kbd>J</kbd>
          <span class="sound">E2</span>
        </div>
        <div data-key="k" class="key">
          <kbd>K</kbd>
          <span class="sound">E4</span>
        </div>
        <div data-key="l" class="key">
          <kbd>L</kbd>
          <span class="sound">F2</span>
        </div>
        <div data-key=";" class="key">
          <kbd>:</kbd>
          <span class="sound">F2F3</span>
        </div>
      </div>
    </div>

    <audio data-key="q" src="./sounds/A2A3.wav"></audio>
    <audio data-key="w" src="./sounds/A3.wav"></audio>
    <audio data-key="e" src="./sounds/B2.wav"></audio>
    <audio data-key="r" src="./sounds/B3.wav"></audio>
    <audio data-key="u" src="./sounds/B3B4.wav"></audio>
    <audio data-key="i" src="./sounds/B4.wav"></audio>
    <audio data-key="o" src="./sounds/C_3.wav"></audio>
    <audio data-key="p" src="./sounds/C_3C_4.wav"></audio>
    <audio data-key="a" src="./sounds/C_4.wav"></audio>
    <audio data-key="s" src="./sounds/D_4.wav"></audio>
    <audio data-key="d" src="./sounds/D3.wav"></audio>
    <audio data-key="f" src="./sounds/D5.wav"></audio>
    <audio data-key="j" src="./sounds/E2.wav"></audio>
    <audio data-key="k" src="./sounds/E4.wav"></audio>
    <audio data-key="l" src="./sounds/F2.wav"></audio>
    <audio data-key=";" src="./sounds/F2F3.wav"></audio>

    <script src="main.js"></script>
  </body>
</html>
```

_**CSS**_

```css
html {
  font-size: 10px;
  background: url("./images/background.jpg") center;
  background-size: cover;
}

body,
html {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.keys {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

.up-key,
.down-key {
  display: flex;
}

.key {
  border: 0.4rem solid black;
  border-radius: 0.5rem;
  margin: 1rem;
  font-size: 1.5rem;
  padding: 1rem 0.5rem;
  transition: all 0.07s ease;
  width: 10rem;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  text-shadow: 0 0 0.5rem black;
}

.up-key .key:nth-child(4) {
  margin-right: 25rem;
}

.down-key .key:nth-child(4) {
  margin-right: 10rem;
}

.playing {
  transform: scale(1.1);
  border-color: #ffc600;
  box-shadow: 0 0 1rem #ffc600;
}

kbd {
  display: block;
  font-size: 4rem;
}

.sound {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: #ffc600;
}
```

_**JavaScript**_

```javascript
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
```

## 🔎코드 설명

1. 가장 먼저 해당 키보드 버튼을 누르면 audio가 재생되어야 한다. 강의에서는 `KeyboardEvent.keyCode`를 이용해 사용자가 누른 키의 값을 반환받았지만, MDN 문서를 확인해보니 Deprecated(더 이상 사용되지 않는다) 라고 되어있어, `KeyboardEvent.key`를 이용해 코드를 수정했다. 이렇게 얻은 값을 audio의 data-key라는 프로퍼티의 값과 비교하고 동일한 경우 해당 audio 파일을 재생한다.

#

2. 이제 키보드를 눌렀을 때, 소리는 나오지만 똑같은 버튼을 여러번 누를 경우 이전의 audio 파일이 끝나지 않았다면 새로운 소리가 나오지 않는 것을 확인할 수 있다. 이를 해결하기 위해서, audio의 `HTMLMediaElement.currentTime`을 0으로 설정해준다. audio 파일의 처음(0초)으로 돌아가 재생하는 것을 의미한다.

#

3. 다음으로는, 버튼을 눌렀을 때 시각적인 효과를 준다. `key.classList.add('playing')`을 이용해 키보드의 버튼에 해당하는 element의 class에 playing을 추가해준다.

#

4. 마지막으로, 효과가 적용된 버튼을 원상태로 되돌려야 한다. `transitionend` 이벤트는 CSS의 transition이 완료된 시점에 실행되는데, key라는 class를 가진 모든 element에서 playing이라는 클래스를 삭제하도록 한다.

## 🚀TIL(Today I Learned)

- 무언가를 만들어보는건 생각보다 훨씬 어려웠다.
- 강의를 들으면서도 왜 저렇게 되는지 모를 때는 MDN을 활용하거나 구글링을 적극 활용해야했다.
- `addEventListener`, `querySelector`, `classList`, `KeyboardEvent`, `HTMLMediaElement`
