![](https://javascript30.com/images/JS3-social-share.png)

# ๐Day 2 - CSS + JS Clock

JavaScript 30์ Day 2 ํ๋ก์ ํธ๋ '์๊ณ ๋ง๋ค๊ธฐ'์ด๋ค. ํ๋ฉด์ CSS์ JavaScript๋ฅผ ํตํด ๊ฐ์์ ์๊ณ๋ฅผ ๋ง๋ค์ด๋ณด๋ ํ๋ก์ ํธ์ด๋ค.

## ๐ค๐์ฝ๋ ๋ชจ์๋ณด๊ธฐ

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
    <title>JS + CSS Clock</title>
  </head>
  <body>
    <div class="clock">
      <div class="clock-face">
        <div class="center"></div>
        <div class="hand hour-hand"></div>
        <div class="hand min-hand"></div>
        <div class="hand second-hand"></div>
      </div>
    </div>
    <div class="display-time"></div>
    <script src="main.js"></script>
  </body>
</html>
```

_**CSS**_

```
html {
  background: linear-gradient(45deg, #796302 0%, #a79e2c 50%, #006492 100%);
  background-size: cover;
  font-family: "helvetica neue";
  text-align: center;
  font-size: 10px;
}

body {
  margin: 0;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  align-items: center;
}

.clock {
  width: 30rem;
  height: 30rem;
  border: 20px solid #036635;
  border-radius: 50%;
  margin: 50px auto;
  position: relative;
  padding: 2rem;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1), inset 0 0 0 3px #efefef,
    inset 0 0 10px black, 0 0 10px rgba(0, 0, 0, 0.2);
}

.display-time {
  width: 30rem;
  height: 7rem;
  text-align: center;
  color: #efefef;
  font-size: 5rem;
}

.clock-face {
  position: relative;
  width: 100%;
  height: 100%;
}

.hand {
  height: 6px;
  background: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0%;
  transition: all cubic-bezier(0.1, 2.7, 0.58, 1) 0.1s;
}

.hour-hand {
  width: 30%;
  z-index: 3;
  background-color: #02331a;
}

.min-hand {
  width: 40%;
  z-index: 2;
  background-color: #574405;
}

.second-hand {
  width: 50%;
  z-index: 1;
  background-color: #80d1a9;
}

.center {
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #efefef;
  z-index: 4;
}
```

_**JavaScript**_

```
const secondHand = document.querySelector(`.second-hand`);
const minHand = document.querySelector(`.min-hand`);
const hourHand = document.querySelector(`.hour-hand`);
const displayTime = document.querySelector(`.display-time`);

function setDate() {
  const now = new Date();
  const second = now.getSeconds();
  const secondDegrees = (second / 60) * 360 - 90;

  const min = now.getMinutes();
  const minDegrees = (min / 60) * 360 - 90;

  const hour = now.getHours();
  const hourDegrees = (hour / 12) * 360 - 90;

  if (secondDegrees === -90) {
    secondHand.style.transition = "all 0.001s";
  }
  if (minDegrees === -90) {
    minHand.style.transition = "all 0.001s";
  }
  if (hourDegrees === -90) {
    hourHand.style.transition = "all 0.001s";
  }

  secondHand.style.transform = `rotate(${secondDegrees}deg)`;
  minHand.style.transform = `rotate(${minDegrees}deg)`;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  displayTime.innerHTML = `${hour >= 10 ? hour : `0${hour}`} : ${
    min >= 10 ? min : `0${min}`
  } : ${second >= 10 ? second : `0${second}`}`;
}

setDate();
setInterval(setDate, 1000);
```

## ๐์ฝ๋ ์ค๋ช

1.  ๊ฐ์ฅ ๋จผ์  ์๊ณ์ ์์นจ, ๋ถ์นจ, ์ด์นจ์ด ๋์๊ฐ์ผ ํ๋ค. ์ฐ์ , `setDate`ํจ์์์ now๋ผ๋ ๋ณ์์ ์๋ก์ด `Date`๊ฐ์ฒด๋ฅผ ํ ๋นํ ํ์ second, min, hour์ ๊ฐ๊ฐ now(ํ์ฌ ์๊ฐ)์ ์ด, ๋ถ, ์๋ฅผ ํ ๋นํ๋ค. ๋ค์์ผ๋ก, ๊ฐ ์นจ์ ๊ฐ๋๋ฅผ ๊ณ์ฐํ๊ณ  ์นจ๋ง๋ค CSS์ transform rotate๋ฅผ ํ์ฉํด ์นจ์ ํ์ ์์ผ์ค๋ค.

#

2.  ๊ฐ์์์๋ ๊ฐ ์นจ์ ๊ธธ์ด๊ฐ ๋๊ฐ์์ ํ ๋์ ์๊ฐ์ ์์๋ณด๊ธฐ ํ๋ค์๋ค. ์์นจ -> ๋ถ์นจ -> ์ด์นจ ์์ผ๋ก ๊ธธ์ด๋ฅผ ๋ค๋ฅด๊ฒ ํ๊ณ , ์ด ๊ณผ์ ์์ `hand`ํด๋์ค์ CSS๋ฅผ ์์ ํ๋ค. `left`์์ฑ์ 50%๋ฅผ ์ฃผ๊ณ  `transfrom-origin`์๋ 0%๋ฅผ ์ค์ transform rotate์ ์ค์ฌ์ ์ผ์ชฝ์ ๋์๋ค.

#

3.  `setInterval` ํจ์๋ฅผ ์ด์ฉํด 1์ด์ ํ๋ฒ์ฉ `setDate`ํจ์๊ฐ ์คํ๋๋๋ก ํ๋ฉด ๊ธฐ๋ณธ์ ์ธ ์๊ณ๋ ๋ง๋ค์ด์ง๋ค. ์๊ณ์ ์ค์ฌ๋ถ๋ถ์ด ํ์ ํด์ ์๋กญ๊ฒ `center`ํด๋์ค๋ฅผ ์์ฑํด ์ฃผ์๊ณ , ๊ฐ ์นจ์ `z-index`๋ฅผ ์ด -> ๋ถ -> ์ -> ์ค์ฌ ์์ผ๋ก ์ฌ๋ ค์ฃผ์๋ค.

#

4.  ํ์ง๋ง, ๊ฐ ์นจ์ด 0์, 0๋ถ, 0์ด๊ฐ ๋๋ ์๊ฐ 270deg์์ -90deg๊ฐ ๋๋ฉด์ ์นจ์ด ์ด์ํ ๊ณณ์ ๊ฐ๋ฆฌ์ผฐ๋ค๊ฐ ๋์์ค๋๋ฐ, ์ด๋ฅผ ํด๊ฒฐํ๊ธฐ ์ํด์ ๊ฐ ์นจ์ ๊ฐ๋๊ฐ -90์ด ๋์์ ๋๋, ์ ๋๋ฉ์ด์์ 0.001s๋ก ๋ฐ๊พธ๋ ๊ฒ์ผ๋ก ํด๊ฒฐํ์๋ค. ์ถ๊ฐ์ ์ผ๋ก๋ ๊ฐ์์ฑ์ ๋์ด๊ธฐ ์ํด์ ์ ์์๊ณ์ฒ๋ผ ์๊ฐ์ ํ์ํ๋๋ก `display-time`์ด๋ผ๋ ์ปจํ์ด๋๋ฅผ ๋ง๋ค๊ณ  `innerHTML`์ ํตํด ์๋ฐ์ดํธ ๋  ์ ์๋๋ก ํ์๋ค.

## ๐TIL(Today I Learned)

- ์๊ณ์ ์ค์ฌ๋ถ๋ถ์ ๋ง๋ค ๋, top 50%, left 50% ๋ง์ผ๋ก๋ ์๊ณ์ ์ ์ค์์ ๋ง๋ค์ด์ง์ง ์์๋ค. `transform: translate(-50%, -50%);`์ ์ฐ๋ฉด ๋ฐ์ค์ ์ผ์ชฝ์๋จ ๊ผญ์ง์ ์ด ์๋ ์ ์ค์๋ถ๋ถ์ด ์ํ๋ ์์น์ ์์นํ  ์ ์์๋ค. [ํด๋น ๋ด์ฉ ์ฐธ๊ณ ](https://liis.tistory.com/28)
- `setInterval`, `Date`, `transform(CSS)`

[JavaScript 30 ํ๋ก์ ํธ ๊ฒฐ๊ณผ๋ฌผ](https://mjn9ine.github.io/javascript-30days/)
