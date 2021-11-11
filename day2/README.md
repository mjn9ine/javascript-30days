![](https://javascript30.com/images/JS3-social-share.png)

# 📖Day 2 - CSS + JS Clock

JavaScript 30의 Day 2 프로젝트는 '시계 만들기'이다. 화면에 CSS와 JavaScript를 통해 각자의 시계를 만들어보는 프로젝트이다.

## 🤓📄코드 모아보기

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

## 🔎코드 설명

1.  가장 먼저 시계의 시침, 분침, 초침이 돌아가야 한다. 우선, `setDate`함수에서 now라는 변수에 새로운 `Date`객체를 할당한 후에 second, min, hour에 각각 now(현재 시간)의 초, 분, 시를 할당한다. 다음으로, 각 침의 각도를 계산하고 침마다 CSS의 transform rotate를 활용해 침을 회전시켜준다.

#

2.  강의에서는 각 침의 길이가 똑같아서 한 눈에 시간을 알아보기 힘들었다. 시침 -> 분침 -> 초침 순으로 길이를 다르게 했고, 이 과정에서 `hand`클래스의 CSS를 수정했다. `left`속성에 50%를 주고 `transfrom-origin`에는 0%를 줘서 transform rotate의 중심을 왼쪽에 두었다.

#

3.  `setInterval` 함수를 이용해 1초에 한번씩 `setDate`함수가 실행되도록 하면 기본적인 시계는 만들어진다. 시계의 중심부분이 허전해서 새롭게 `center`클래스를 생성해 주었고, 각 침의 `z-index`를 초 -> 분 -> 시 -> 중심 순으로 올려주었다.

#

4.  하지만, 각 침이 0시, 0분, 0초가 되는 순간 270deg에서 -90deg가 되면서 침이 이상한 곳을 가리켰다가 돌아오는데, 이를 해결하기 위해서 각 침의 각도가 -90이 되었을 때는, 애니메이션을 0.001s로 바꾸는 것으로 해결하였다. 추가적으로는 가시성을 높이기 위해서 전자시계처럼 시간을 표시하도록 `display-time`이라는 컨테이너를 만들고 `innerHTML`을 통해 업데이트 될 수 있도록 하였다.

## 🚀TIL(Today I Learned)

- 시계의 중심부분을 만들 때, top 50%, left 50% 만으로는 시계의 정중앙에 만들어지지 않았다. `transform: translate(-50%, -50%);`을 쓰면 박스의 왼쪽상단 꼭지점이 아닌 정중앙부분이 원하는 위치에 위치할 수 있었다. [해당 내용 참고](https://liis.tistory.com/28)
- `setInterval`, `Date`, `transform(CSS)`

[JavaScript 30 프로젝트 결과물](https://mjn9ine.github.io/javascript-30days/)
