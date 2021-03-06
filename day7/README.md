![](https://javascript30.com/images/JS3-social-share.png)

# ๐Day 7 - Array Cardio Day 2

JavaScript 30์ Day 7 ํ๋ก์ ํธ๋ Day 4์ ๋ง์ฐฌ๊ฐ์ง๋ก ๋ฌด์ธ๊ฐ ๋ง๋๋๊ฒ ์๋ JavaScript์ Array์ ๋ํด์ ๋ ์์๋ณด๋ ํ๋ก์ ํธ์ด๋ค. ์ ๋ฒ์ ๋ฐฐ์ด ๊ฒ๊ณผ ๋ค๋ฅธ method๋ค์ ๊ณต๋ถํด๋ณด์.

## ๐ค๐์ฝ๋ ๋ชจ์๋ณด๊ธฐ

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Array Cardio ๐ช๐ช</title>
  </head>
  <body>
    <p><em>Psst: have a look at the JavaScript Console</em> ๐</p>
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

## ๐์ฝ๋ ์ค๋ช

### _`Array.some()`_

`some()`๋ฉ์๋๋ callback ํจ์๊ฐ ์ฐธ(๋ถ๋ฆฐ์ผ๋ก ๋ณํํ์ ๋ true๊ฐ ๋๋ ๊ฐ)์ ๋ฐํํ๋ ์์๋ฅผ ์ฐพ์ ๋๊น์ง ๋ฐฐ์ด์ ์๋ ๊ฐ ์์์ ๋ํด ํ ๋ฒ์ฉ callback ํจ์๋ฅผ ์คํํ๋ค. ํด๋นํ๋ ์์๋ฅผ ๋ฐ๊ฒฌํ ๊ฒฝ์ฐ some์ ์ฆ์ true๋ฅผ ๋ฐํํ๊ณ  ๊ทธ๋ ์ง ์์ผ๋ฉด, ์ฆ ๋ชจ๋  ๊ฐ์์ ๊ฑฐ์ง์ ๋ฐํํ๋ฉด false๋ฅผ ๋ฐํํ๋ค. ํ ๋นํ ๊ฐ์ด ์๋ ๋ฐฐ์ด์ ์ธ๋ฑ์ค์์๋ง callback์ ํธ์ถํ๊ณ , ์ญ์ ํ๊ฑฐ๋ ๊ฐ์ ํ ๋นํ ์ ์ด ์๋ ์ธ๋ฑ์ค์์๋ ํธ์ถํ์ง ์๋๋ค. ์ฆ, ๋น ๋ฐฐ์ด์์ ํธ์ถํ๋ฉด ๋ฌด์กฐ๊ฑด false๋ฅผ ๋ฐํํ๋ค. ๋ง์ง๋ง์ผ๋ก `some`์ ํธ์ถํ ๋ฐฐ์ด์ ๋ณํํ์ง๋ ์๋๋ค.

```
function isBiggerThan10(element, index, array) {
  return element > 10;
}
[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
```

### _`Array.every()`_

`every()`๋ฉ์๋๋ callback ํจ์๊ฐ ๊ฑฐ์ง์ ๋ฐํํ๋ ์์๋ฅผ ์ฐพ์ ๋๊น์ง ๋ฐฐ์ด์ ์๋ ๊ฐ ์์์ ๋ํด ํ ๋ฒ์ฉ callbackFn ํจ์๋ฅผ ์คํํ๋ค. ํด๋นํ๋ ์์๋ฅผ ๋ฐ๊ฒฌํ ๊ฒฝ์ฐ every๋ ์ฆ์ false๋ฅผ ๋ฐํํ๊ณ  ๊ทธ๋ ์ง ์์ผ๋ฉด, ์ฆ ๋ชจ๋  ๊ฐ์์ ์ฐธ์ ๋ฐํํ๋ฉด true๋ฅผ ๋ฐํํ๋ค. `some`๊ณผ ๋ฌ๋ฆฌ, ๋น ๋ฐฐ์ด์์ ํธ์ถํ๋ฉด ๋ฌด์กฐ๊ฑด true๋ฅผ ๋ฐํํ๋ค. `some`๊ณผ ๊ฐ์ ์ ์ `every`์ญ์ ํธ์ถํ ๋ฐฐ์ด์ ๋ณํํ์ง๋ ์๋๋ค.

```
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

### _`Array.find()`_

`find()`๋ฉ์๋๋ callback ํจ์๊ฐ ์ฐธ์ ๋ฐํ ํ  ๋๊น์ง ํด๋น ๋ฐฐ์ด์ ๊ฐ ์์์ ๋ํด์ callback ํจ์๋ฅผ ์คํํ๋ค. ๋ง์ฝ ํน์  ์์๋ฅผ ์ฐพ์๋ค๋ฉด find ๋ฉ์๋๋ ํด๋น ์์์ ๊ฐ์ ์ฆ์ ๋ฐํํ๊ณ , ๊ทธ๋ ์ง ์์๋ค๋ฉด undefined๋ฅผ ๋ฐํํ๋ค.

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

`findIndex()`๋ฉ์๋๋ callback ํจ์๊ฐ ์ฐธ์ ๋ฐํ ํ  ๋๊น์ง ํด๋น ๋ฐฐ์ด์ ๊ฐ ์์์ ๋ํด์ callback ํจ์๋ฅผ ์คํํ๋ค. ๋ง์ฝ ํน์  ์์๋ฅผ ์ฐพ์๋ค๋ฉด find ๋ฉ์๋๋ ํด๋น ์์์ index๋ฅผ ์ฆ์ ๋ฐํํ๊ณ , ๊ทธ๋ ์ง ์์๋ค๋ฉด -1์ ๋ฐํํ๋ค.

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

## ๐TIL(Today I Learned)

- Day 4์ ๋ํด์ JavaScript์์ Array์ ๋ค์ํ method๋ค์ ๋ ์์๋ณผ ์ ์์๋ค.
- `some()`, `every()`, `fint()`, `findIndex()`

[JavaScript 30 ํ๋ก์ ํธ ๊ฒฐ๊ณผ๋ฌผ](https://mjn9ine.github.io/javascript-30days/)
