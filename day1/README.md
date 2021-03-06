![](https://javascript30.com/images/JS3-social-share.png)

# πDay 1 - JAVASCRIPT DRUM KIT

JavaScript 30μ Day 1 νλ‘μ νΈλ 'λλΌ ν· λ§λ€κΈ°'μ΄λ€. νλ©΄μ λ§€μΉ­ λ ν€λ³΄λ λ²νΌμ λλ₯΄λ©΄ μ°κ²°λ audio νμΌμ μ¬μνλ νλ‘μ νΈμ΄λ€.

## π€πμ½λ λͺ¨μλ³΄κΈ°

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
    audio.currentTime = 0; // rewind to the start (μ²μμΌλ‘ λλλ¦°λ€.)
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

## πμ½λ μ€λͺ

1. κ°μ₯ λ¨Όμ  ν΄λΉ ν€λ³΄λ λ²νΌμ λλ₯΄λ©΄ audioκ° μ¬μλμ΄μΌ νλ€. κ°μμμλ `KeyboardEvent.keyCode`λ₯Ό μ΄μ©ν΄ μ¬μ©μκ° λλ₯Έ ν€μ κ°μ λ°νλ°μμ§λ§, MDN λ¬Έμλ₯Ό νμΈν΄λ³΄λ Deprecated(λ μ΄μ μ¬μ©λμ§ μλλ€) λΌκ³  λμ΄μμ΄, `KeyboardEvent.key`λ₯Ό μ΄μ©ν΄ μ½λλ₯Ό μμ νλ€. μ΄λ κ² μ»μ κ°μ audioμ data-keyλΌλ νλ‘νΌν°μ κ°κ³Ό λΉκ΅νκ³  λμΌν κ²½μ° ν΄λΉ audio νμΌμ μ¬μνλ€.

#

2. μ΄μ  ν€λ³΄λλ₯Ό λλ μ λ, μλ¦¬λ λμ€μ§λ§ λκ°μ λ²νΌμ μ¬λ¬λ² λλ₯Ό κ²½μ° μ΄μ μ audio νμΌμ΄ λλμ§ μμλ€λ©΄ μλ‘μ΄ μλ¦¬κ° λμ€μ§ μλ κ²μ νμΈν  μ μλ€. μ΄λ₯Ό ν΄κ²°νκΈ° μν΄μ, audioμ `HTMLMediaElement.currentTime`μ 0μΌλ‘ μ€μ ν΄μ€λ€. audio νμΌμ μ²μ(0μ΄)μΌλ‘ λμκ° μ¬μνλ κ²μ μλ―Ένλ€.

#

3. λ€μμΌλ‘λ, λ²νΌμ λλ μ λ μκ°μ μΈ ν¨κ³Όλ₯Ό μ€λ€. `key.classList.add('playing')`μ μ΄μ©ν΄ ν€λ³΄λμ λ²νΌμ ν΄λΉνλ elementμ classμ playingμ μΆκ°ν΄μ€λ€.

#

4. λ§μ§λ§μΌλ‘, ν¨κ³Όκ° μ μ©λ λ²νΌμ μμνλ‘ λλλ €μΌ νλ€. `transitionend` μ΄λ²€νΈλ CSSμ transitionμ΄ μλ£λ μμ μ μ€νλλλ°, keyλΌλ classλ₯Ό κ°μ§ λͺ¨λ  elementμμ playingμ΄λΌλ ν΄λμ€λ₯Ό μ­μ νλλ‘ νλ€.

## πTIL(Today I Learned)

- λ¬΄μΈκ°λ₯Ό λ§λ€μ΄λ³΄λκ±΄ μκ°λ³΄λ€ ν¨μ¬ μ΄λ €μ λ€.
- κ°μλ₯Ό λ€μΌλ©΄μλ μ μ λ κ² λλμ§ λͺ¨λ₯Ό λλ MDNμ νμ©νκ±°λ κ΅¬κΈλ§μ μ κ·Ή νμ©ν΄μΌνλ€.
- `addEventListener`, `querySelector`, `classList`, `KeyboardEvent`, `HTMLMediaElement`
