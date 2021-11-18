![](https://javascript30.com/images/JS3-social-share.png)

# 📖Day 5 - Flex Panels Image Gallery

JavaScript 30의 Day 5 프로젝트는 Flexbox를 이용해 Image Gallery를 만드는 프로젝트이다.

## 🤓📄코드 모아보기

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Flex Panels 💪</title>
    <link
      href="https://fonts.googleapis.com/css?family=Amatic+SC"
      rel="stylesheet"
      type="text/css"
    />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="panels">
      <div class="panel panel1">
        <p>
          Your time is limited, so don't waste it living someone else's life.
        </p>
        <p>Just</p>
        <p>Steve Jobs</p>
      </div>
      <div class="panel panel2">
        <p>Action is the foundational key to all success.</p>
        <p>Do</p>
        <p>Pablo Picasso</p>
      </div>
      <div class="panel panel3">
        <p>Anyone who has never made a mistake has never tried anything new.</p>
        <p>It</p>
        <p>Albert Einstein</p>
      </div>
      <div class="panel panel4">
        <p>The way get started is to quit talking and begin doing.</p>
        <p>Be</p>
        <p>Walt Disney</p>
      </div>
      <div class="panel panel5">
        <p>life is not fair get used to it.</p>
        <p>Brave</p>
        <p>Bill Gates</p>
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
  background: #ffc600;
  font-family: "helvetica neue";
  font-size: 20px;
  font-weight: 200;
}

body {
  margin: 0;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.panels {
  min-height: 100vh;
  overflow: hidden;
  display: flex;
}

.panel {
  background: #6b0f9c;
  box-shadow: inset 0 0 0 5px rgba(255, 255, 255, 0.1);
  color: white;
  text-align: center;
  /* Safari transitionend event.propertyName === flex */
  /* Chrome + FF transitionend event.propertyName === flex-grow */
  transition: font-size 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11),
    flex 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11), background 0.2s;
  font-size: 20px;
  background-size: cover;
  background-position: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.panel1 {
  background-image: url(./images/just.jpg);
}
.panel2 {
  background-image: url(./images/do.jpg);
}
.panel3 {
  background-image: url(./images/it.jpg);
}
.panel4 {
  background-image: url(./images/be.jpg);
}
.panel5 {
  background-image: url(./images/brave.jpg);
}

/* Flex Children */
.panel > * {
  margin: 0;
  width: 100%;
  transition: transform 0.5s;
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.panel > *:first-child {
  transform: translateY(-100%);
}

.panel.open-active > *:first-child {
  transform: translateY(0);
}

.panel > *:last-child {
  transform: translateY(100%);
}

.panel.open-active > *:last-child {
  transform: translateY(0);
}

.panel p {
  text-transform: uppercase;
  font-family: "Amatic SC", cursive;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
  font-size: 1em;
}

.panel p:first-child,
.panel p:last-child {
  font-style: italic;
}

.panel p:nth-child(2) {
  font-size: 4em;
}

.panel.open {
  flex: 4;
  font-size: 40px;
}
```

_**JavaScript**_

```
const panels = document.querySelectorAll(".panel");

function toggleOpen() {
  this.classList.toggle("open");
}

function toggleActive(e) {
  if (e.propertyName.includes("flex-grow")) {
    this.classList.toggle("open-active");
  }
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
panels.forEach((panel) =>
  panel.addEventListener("transitionend", toggleActive)
);
```

## 🔎코드 설명

1.  이번 프로젝트는 CSS의 flexbox를 이용하는 프로젝트이다. 먼저, `panels`라는 container를 `display: flex`를 통해 flexbox로 만들어준다. 그러면 각 panel들이 flex의 default 방향인 row방향으로 이루어진다. 이 때, flexbox의 여백이 남게 되는데 이는 `panel` 클래스에 `flex: 1`을 주면서 해결할 수 있다.

#

2.  이제 그렇게 각 panel을 다시 한번 flex container로 만들어주면서 `flex-direction: column`을 통해 글씨들을 원하는 방향(세로)으로 조정한다. 그렇게 또 한번 각 `p`태그를 flex container로 만들고, 가로와 세로를 가운데로 맞춰준다. 이러면 우리가 원하는 디자인 포맷이 완성된다.

#

3.  마지막으로 JavaScript에서 `addEventListener`를 이용해 모든 `panel`들 중 클릭된 `panel`에 `toggleOpen`이라는 리스너를 실행시켜 `open`이라는 클래스를 추가해준다. 해당 panel에 `open` 클래스가 추가되면 `flex: 4`를 해준다. 기존에 모든 panel이 `flex: 1`로 같은 너비를 가지고 있었던 반면 클릭된 panel이 `flex: 4`로 바뀌면서 여백을 나눠갖는 비율이 달라진다. 그리고 모든 transition이 종료되면 toggleActive라는 함수가 실행되고 마찬가지로 `open-active`라는 클래스를 추가해준다.

## 🚀TIL(Today I Learned)

- CSS의 flex에 대해서 한번 더 알아볼 수 있는 프로젝트였다. 추후에 CSS의 flex와 grid를 블로그에 정리해보면서 정복해야겠다.
- `tokenList.toggle()`, `display: flex(CSS)`, `flex-direction(CSS)`, `flex: {flex-grow} {flex-shrink} {flex-basis}`

[JavaScript 30 프로젝트 결과물](https://mjn9ine.github.io/javascript-30days/)
