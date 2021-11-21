![](https://javascript30.com/images/JS3-social-share.png)

# 📖Day 7 - Array Cardio Day 2

JavaScript 30의 Day 7 프로젝트는 Day 4와 마찬가지로 무언갈 만드는게 아닌 JavaScript의 Array에 대해서 더 알아보는 프로젝트이다. 저번에 배운 것과 다른 method들을 공부해보자.

## 🤓📄코드 모아보기

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Array Cardio 💪💪</title>
  </head>
  <body>
    <p><em>Psst: have a look at the JavaScript Console</em> 💁</p>
    <script src="main.js"></script>
  </body>
</html>
```

_**JavaScript**_

```
// ## Array Cardio Day 2

const people = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?

const isAdult = people.some(function (person) {
  const currentYear = new Date().getFullYear();
  if (currentYear - person.year >= 19) {
    return true;
  }
});

// Arrow function
// const isAdult = people.some(
//   (person) => new Date().getFullYear() - person.year >= 19
// );

console.log({ isAdult });

// Array.prototype.every() // is everyone 19 or older?

const allAdults = people.every(function (person) {
  const currentYear = new Date().getFullYear();
  if (currentYear - person.year >= 19) {
    return true;
  }
});

console.log({ allAdults });

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423

// const comment = comments.find(function (comment) {
//   if (comment.id === 823423) {
//     return true;
//   }
// });

// Arrow function
const comment = comments.find((comment) => comment.id === 823423);

console.log(comment);

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423

const index = comments.findIndex((comment) => comment.id === 823423);
console.log(index);

// comments.splice(index, 1);

const newComments = [...comments.slice(0, index), ...comments.slice(index + 1)];
```

## 🔎코드 설명

### _`Array.some()`_

`some()`메서드는 callback 함수가 참(불린으로 변환했을 때 true가 되는 값)을 반환하는 요소를 찾을 때까지 배열에 있는 각 요소에 대해 한 번씩 callback 함수를 실행한다. 해당하는 요소를 발견한 경우 some은 즉시 true를 반환하고 그렇지 않으면, 즉 모든 값에서 거짓을 반환하면 false를 반환한다. 할당한 값이 있는 배열의 인덱스에서만 callback을 호출하고, 삭제했거나 값을 할당한 적이 없는 인덱스에서는 호출하지 않는다. 즉, 빈 배열에서 호출하면 무조건 false를 반환한다. 마지막으로 `some`은 호출한 배열을 변형하지는 않는다.

```
function isBiggerThan10(element, index, array) {
  return element > 10;
}
[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
```

### _`Array.every()`_

`every()`메서드는 callback 함수가 거짓을 반환하는 요소를 찾을 때까지 배열에 있는 각 요소에 대해 한 번씩 callbackFn 함수를 실행한다. 해당하는 요소를 발견한 경우 every는 즉시 false를 반환하고 그렇지 않으면, 즉 모든 값에서 참을 반환하면 true를 반환한다. `some`과 달리, 빈 배열에서 호출하면 무조건 true를 반환한다. `some`과 같은 점은 `every`역시 호출한 배열을 변형하지는 않는다.

```
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

### _`Array.find()`_

`find()`메서드는 callback 함수가 참을 반환 할 때까지 해당 배열의 각 요소에 대해서 callback 함수를 실행한다. 만약 특정 요소를 찾았다면 find 메서드는 해당 요소의 값을 즉시 반환하고, 그렇지 않았다면 undefined를 반환한다.

```
const inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

function findCherries(fruit) {
    return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }
```

### _`Array.findIndex()`_

`findIndex()`메서드는 callback 함수가 참을 반환 할 때까지 해당 배열의 각 요소에 대해서 callback 함수를 실행한다. 만약 특정 요소를 찾았다면 find 메서드는 해당 요소의 index를 즉시 반환하고, 그렇지 않았다면 -1을 반환한다.

```
function isPrime(element, index, array) {
  let start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2
```

## 🚀TIL(Today I Learned)

- Day 4에 더해서 JavaScript에서 Array의 다양한 method들을 더 알아볼 수 있었다.
- `some()`, `every()`, `fint()`, `findIndex()`

[JavaScript 30 프로젝트 결과물](https://mjn9ine.github.io/javascript-30days/)
