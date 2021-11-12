![](https://javascript30.com/images/JS3-social-share.png)

# 📖Day 3 - Playing with CSS Variables and JS

JavaScript 30의 Day 3 프로젝트는 JavaScript를 이용해 CSS를 조작해 이미지를 업데이트하는 프로젝트이다.

## 🤓📄코드 모아보기

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Scoped CSS Variables and JS</title>
  </head>
  <body>
    <h1>
      ✨Update <span class="point">CSS</span> Variables with
      <span class="point">JS</span>✨
    </h1>

    <section class="controls">
      <label for="spacing">Padding</label>
      <input
        id="spacing"
        type="range"
        name="spacing"
        min="10"
        max="200"
        value="10"
        data-sizing="px"
      />

      <label for="blur">Blur</label>
      <input
        id="blur"
        type="range"
        name="blur"
        min="0"
        max="25"
        value="10"
        data-sizing="px"
      />

      <label for="base">Base Color</label>
      <input id="base" type="color" name="base" value="#364F6B" />
    </section>

    <img src="./sloth.jpg" />

    <script src="main.js"></script>
  </body>
</html>
```

_**CSS**_

```
:root {
  --base: #364f6b;
  --spacing: 10px;
  --blur: 10px;
}

img {
  width: 20rem;
  padding: var(--spacing);
  background: var(--base);
  filter: blur(var(--blur));
}

h1 {
  color: #364f6b;
}

.point {
  color: var(--base);
}

/* misc styles, nothing to do with CSS variables */

body {
  text-align: center;
  background: no-repeat
    linear-gradient(45deg, #e3fdfd 0%, #cbf1f5 33%, #a6e3e9 66%, #71c9ce 100%);
  background-size: auto 150%;
  background-position: center center;
  font-family: "helvetica neue", sans-serif;
}

.controls {
  display: flex;
  font-weight: 600;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
}

.controls label,
.controls input {
  margin-right: 1rem;
}
```

_**JavaScript**_

```
const inputs = document.querySelectorAll(`.controls input`);

function handleUpdate() {
  console.log(this);
  const suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));
```

## 🔎코드 설명

1.  이번 프로젝트는 자바스크립트에서 CSS를 조작하는 원리만 알면 해결할 수 있었다. 먼저 `querySelectorAll`을 통해서 controls클래스의 모든 input element를 inputs에 받아준다. 후에 `forEach`문을 이용해 input에서 `change`와 `mousemove` 이벤트가 발생하면 `handleUpdate`함수를 실행하도록 한다.

#

2.  다음으로는 이벤트가 발생된 객체의 데이터속성을 사용한다. 해당 객체에 `data-sizing`이 존재한다면 그것을, 그렇지 않다면 ''를 suffix 변수에 넣어준다. 이제 document.documentElement 읽기 전용 속성을 통해 문서의 루트 요소를 나타내는 element를 반환한다. HTML 문서를 예로 들면 `<html>`요소를 반환한다.

#

- 데이터 속성(Data attributes)란 html element에 `data-*` 형식으로 추가적인 정보를 저장할 수 있도록 해준다. JavaScript에서는 `dataset` 객체를 통해 데이터 속성을 가져온다. (`~.dataset.*(data-*의 뒷부분만 camelCase로 사용)` 형식으로 받아온다.)

#

3.  이제는 위에서 말한 `document.documentElement` 뒤에 `setProperty()` 함수를 이용해서 CSS 객체의 속성에 새로운 값을 부여한다. CSS 파일에서 `:root`안에 base, spacing, blur라는 CSS 변수를 설정해놨기 때문에 위에서 말한 작업으로 변수의 값들이 바뀌고 적용되어진다.

## 🚀TIL(Today I Learned)

- CSS의 변수를 설정하는 방법은 일반적으로 `--{변수이름}`을 `:root`안에 넣어주는 것이다.
- `dataset`, `documentElement`, `setProperty`, `--{변수이름}(CSS)`

[JavaScript 30 프로젝트 결과물](https://mjn9ine.github.io/javascript-30days/)
