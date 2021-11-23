![](https://javascript30.com/images/JS3-social-share.png)

# 📖Day 9 - 14 Must Know Dev Tools Tricks

JavaScript 30의 Day 9 프로젝트는 개발자 도구의 다양한 기능들을 알아보는 프로젝트이다.

## 🤓📄코드 모아보기

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Console Tricks!</title>
  </head>
  <body>
    <p onClick="makeGreen()">×BREAK×DOWN×</p>

    <script src="main.js"></script>
  </body>
</html>
```

_**JavaScript**_

```
const dogs = [
  { name: "Snickers", age: 2 },
  { name: "hugo", age: 8 },
];

function makeGreen() {
  const p = document.querySelector("p");
  p.style.color = "#BADA55";
  p.style.fontSize = "50px";
}

// Regular

console.log("Hello");

// Interpolated

console.log("Hello I am a %s string!", "😀");
// console.log(`Hello I am a ${...}`);

// Styled

console.log(
  "%c I am some great text",
  "font-size: 50px; background: tomato; text-shadow: 10px 10px 0 blue"
);

// warning!

console.log("Oh NOOO");

// Error :|

console.error("Shit!");

// Info

console.info("Crocodiles eat 3-4 people per year");

// Testing

const p = document.querySelector("p");
console.assert(p.classList.contains("ouch"), "This is wrong");

// clearing

// console.clear();

// Viewing DOM Elements

console.log(p);
console.dir(p);

// Grouping together

dogs.forEach((dog) => {
  console.group(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years.`);
  console.groupEnd(`${dog.name}`);
});

// counting

console.count("Wes");
console.count("Wes");
console.count("Steve");
console.count("Steve");
console.count("Wes");
console.count("Steve");
console.count("Wes");
console.count("Wes");
console.count("Steve");
console.count("Steve");
console.count("Steve");
console.count("Steve");

// timing

console.time("fetching data");
fetch("https://api.github.com/users/wesbos")
  .then((data) => data.json())
  .then((data) => {
    console.timeEnd("fethcing data");
    console.log(data);
  });

console.table(dogs);
```

## 🔎코드 설명

### _`console.log()`_

`log()`메서드는 console 오브젝트에서 가장 자주 쓰는 메서드로 ()안에 메시지를 출력해준다.

### _`console.warn()`_

`warn()`메서드는 콘솔에 경고 메시지를 출력해준다.

### _`console.error()`_

`error()`메서드는 콘솔에 에러 메시지를 출력해준다.

### _`console.info()`_

`info()`메서드는 콘솔에 정보 메시지를 출력해준다.

### _`console.assert()`_

`assert()`메서드는 주어진 가정이 거짓인 경우에 콘솔에 오류 메시지를 출력한다. 참인 경우에는 아무것도 하지 않는다.

### _`console.clear()`_

`clear()`메서드는 콘솔에 기록된 메시지를 모두 지워준다.

### _`console.dir()`_

`dir()`메서드는 콘솔에 주어진 객체의 속성 목록을 출력해준다. `log()`와 다른 점은 `log()`는 HTML 형태로 트리 구조(태그 내용)를 출력하고, `dir()`은 JSON 형태로 트리 구조(객체의 속성)를 출력한다.

### _`console.count()`_

`count()`메서드는 ()안의 인자가 같은 것의 호출 횟수를 출력해준다.

### _`console.group(), console.groupEnd()`_

`group()`메서드는 콘솔에 새로운 인라인 그룹을 만들어준다. `console.groupEnd()`가 호출될 때까지 추가 레벨로 다음 콘솔 메시지를 들여 쓴다.

### _`console.time(), console.timeEnd()`_

`time()`메서드는 작업이 얼마나 걸리는지 추적할 수 있다. 각 타이머에게 고유한 이름을 줄 수 있고, `console.timeEnd()`가 호출될 때까지의 시간을 출력한다.

### _`console.table()`_

`table()`메서드는 데이터를 표의 형태로 콘솔에 출력해준다.

## 🚀TIL(Today I Learned)

- 개발자 도구, 특히 console의 다양한 메서드들을 알아볼 수 있었다. 특히 `dir()`과 `log()` 메서드의 차이를 정확하게 알 수 있었다.
- `log()`, `warn()`, `error()`, `info()`, `assert()`, `clear()`, `dir()`, `count()`, `group() <-> groupEnd()`, `time() <-> timeEnd()`, `table()`

[JavaScript 30 프로젝트 결과물](https://mjn9ine.github.io/javascript-30days/)
