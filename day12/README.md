![](https://javascript30.com/images/JS3-social-share.png)

# 📖Day 12 - Key Sequence Detection (KONAMI CODE)

JavaScript 30의 Day 12 프로젝트는 지정해놓은 코나미 커맨드(치트코드의 일종이라고 한다.)를 입력하면 화면에 랜덤한 유니콘 이미지를 보여주는 프로젝트이다.

## 🤓📄코드 모아보기

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Key Detection</title>
    <script
      type="text/javascript"
      src="https://www.cornify.com/js/cornify.js"
    ></script>
  </head>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

_**CSS**_

```
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #f0e9d2 0%,
    #e6ddc4 20%,
    #678983 60%,
    #181d31 100%
  );
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pressedBox {
  width: inherit;
  display: flex;
  justify-content: center;
}

.pressedBox__key {
  width: 8rem;
  height: 8rem;
  font-size: 3rem;
  background: rgba(255, 255, 240, 0.274);
  display: flex;
  justify-content: center;
  align-items: center;
}

.pressedBox__key:first-child {
  opacity: 0.3;
}

.cong {
  transition: all 0.1s ease;
  transform: scale(1.5);
}
```

_**JavaScript**_

```
const pressedBox = document.querySelector(".pressedBox");
const pressed = [];
const secretCode = "mjne";

for (let i = 0; i < secretCode.length + 1; i++) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("pressedBox__key");
  pressedBox.appendChild(newDiv);
}

function findSecretCode() {
  for (let i = 2; i < pressed.length + 1; i++) {
    document
      .querySelector(`.pressedBox__key:nth-child(${i})`)
      .classList.add("cong");
  }
}

window.addEventListener("keyup", (e) => {
  const pressedKey = e.key;
  pressed.push(pressedKey);
  pressed.splice(
    -1 - secretCode.length - 1,
    pressed.length - secretCode.length - 1
  );
  for (let i = 0; i < pressed.length; i++) {
    const nthBox = document.querySelector(
      `.pressedBox__key:nth-child(${
        secretCode.length + 1 - pressed.length + 1 + i
      })`
    );
    nthBox.innerHTML = pressed[i];
  }

  console.log(pressed);
  if (pressed.join("").substring(1) === secretCode) {
    findSecretCode();
    console.log("DING DING!");
    cornify_add();
  }
});

const pressedBox__key = document.querySelectorAll(".pressedBox__key");
pressedBox__key.forEach((box) =>
  box.addEventListener("transitionend", (e) => {
    if (e.propertyName === "transform") {
      e.target.classList.remove("cong");
    }
  })
);
```

## 🔎코드 설명

1.  가장 먼저, 사용자가 입력한 키를 받아줄 pressed라는 배열을 만들어준다. 그리고 시크릿 코드를 내 마음대로 만들어준다. 이제 키를 누르고 손을 땠을 때 실행되는 이벤트인 `keyup`이벤트를 통해 사용자가 입력하는 키를 받아 pressed에 push해준다.

#

2.  그렇게 받은 pressed 배열을 secretCode와 비교하기 위해 `splice()` 메서드를 이용한다. 배열의 기존 요소를 삭제하거나 교체, 추가하여 배열의 내용을 변경하는 메서드이다. 그렇게 재가공된 pressed 배열에 secretCode가 포함되어 있다면 `cornify.js`의 `cornify_add()` 메서드를 통해 랜덤한 유니콘 이미지를 브라우저 화면에 나타낸다.

### _`Array.splice()`_

`splice()`메서드는 첫번째 인자로 배열의 변경을 시작할 인덱스를 받는다. 배열의 길이보다 길다면 아무것도 삭제되지 않는다. 두번째 인자는 배열에서 제거할 element의 수로, 생략할 경우 첫번째 인자부터 모든 요소를 제거하고, 0 이하라면 어떤 요소도 제거하지 않는다. 세번째 인자는 배열에 추가할 요소로서 아무 요소도 지정하지 않으면 `splice` 메서드는 요소를 제거하기만 한다.

#

3.  추가적으로 입력 받은 배열을 시각화해보았다. 강의에 없는 기능을 혼자서 구현하려니 힘들었다.. 이런 별볼일없는 기능 구현하는데도 힘든거보면 오히려 좋다. 성장가능성이라고 생각하고 힘내야겠다.

## 🚀TIL(Today I Learned)

- 포텐이 100에 가깝다. 현재 능력이 0에 수렴한다는 소리다😂😂
- `keyup`, `splice`, `createElement`, `appendChild`, `classList.add(remove)`

[JavaScript 30 프로젝트 결과물](https://mjn9ine.github.io/javascript-30days/)
