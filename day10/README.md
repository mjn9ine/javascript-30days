![](https://javascript30.com/images/JS3-social-share.png)

# 📖Day 10 - Hold Shift to Check Multiple Checkboxes

JavaScript 30의 Day 10 프로젝트는 여러 개의 체크박스 중에서 `shift`키를 누른 상태로 체크한 박스와 기존의 체크 되어있던 박스 사이의 체크박스들이 모두 체크되어지는 기능을 구현하는 프로젝트이다.

## 🤓📄코드 모아보기

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
    <title>Hold Shift to Check Multiple Checkboxes</title>
  </head>
  <body>
    <div class="inbox">
      <div class="item">
        <input type="checkbox" />
        <p>This is an inbox layout.</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Check one item</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Hold down your Shift key</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Check a lower item</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Everything in between should also be set to checked</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Try to do it without any libraries</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Just regular JavaScript</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Good Luck!</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Don't forget to tweet your result!</p>
      </div>
    </div>

    <script src="main.js"></script>
  </body>
</html>
```

_**CSS**_

```
html {
  font-family: sans-serif;
  background: #ffc600;
}

.inbox {
  max-width: 400px;
  margin: 50px auto;
  background: white;
  border-radius: 5px;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.1);
}

.item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}

.item:last-child {
  border-bottom: 0;
}

input:checked + p {
  background: #f9f9f9;
  text-decoration: line-through;
}

input[type="checkbox"] {
  margin: 20px;
}

p {
  margin: 0;
  padding: 20px;
  transition: background 0.2s;
  flex: 1;
  font-family: "helvetica neue";
  font-size: 20px;
  font-weight: 200;
  border-left: 1px solid #d1e2ff;
}
```

_**JavaScript**_

```
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

function handleCheck(e) {
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    checkboxes.forEach((checkbox, idx) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  lastChecked = this;
}

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", handleCheck)
);
```

## 🔎코드 설명

1.  가장 먼저, `querySelectorAll`을 이용해서 inbox 클래스의 input들 중 type이 checkbox인 element들을 checkboxes에 할당한다. 다음으로 checkboxes에서 `forEach`문을 통해 각 checkbox에서 `addEventListener`의 `click` 이벤트를 받아준다. callback 함수로는 handleClick을 실행시킨다.

#

2.  이제 `handleClick`함수를 완성시켜줘야 한다. 먼저, inBetween이라는 플래그 변수를 만들어주고 초기값은 false로 설정한다. `handleCheck`의 인자로 e를 받아주는데, `e.shiftKey`를 통해 shift가 눌린상태일 때만 원하는 기능을 구현할 수 있도록 한다. 이제 조건을 만족하여 `forEach`문이 실행되는데 각 checkbox들에 대해 우리가 최근에 shift키와 함께 선택한 checkbox이거나 그 전에 가장 최근에 선택했던 checkbox라면 `inBetween != inBetween;`에 의해서 inBetween이라는 플래그가 false에서 true로 바뀐다.

#

3.  그리고 다음의 조건문 `if (inBetween)`을 만나는데 inBetween 변수가 true일때는 `checkbox.checked = true;`를 통해 checkbox를 선택한 것으로 해준다. 즉, 사이에 낀 checkbox들을 모두 check해주는 작업이다. 이 작업을 반복하다보면 다시 `if(checkbox === this || checkbox === lastChecked)`의 조건에 부합하게 된다. 따라서 inBetween이 true에서 false로 바뀌고, 더 이상 inBetween이 true가 아니므로 아래의 조건문은 실행되지 않는다.

#

4.  이러한 로직으로 가장 최근에 클릭한 checkbox부터 shift키를 누른 상태에서 클릭한 checkbox까지의 모든 checkbox들이 모두 check된 상태로 바뀌게 된다.

## 🚀TIL(Today I Learned)

- 이번 프로젝트는 간단하다고 생각했는데 생각보다 쉽지 않았다. 천천히 꾸준하게 계속 도전해야겠다.
- `querySelector('input[type=""]') => type으로도 해당 element를 찾을 수 있다.`

[JavaScript 30 프로젝트 결과물](https://mjn9ine.github.io/javascript-30days/)
