![](https://javascript30.com/images/JS3-social-share.png)

# 📖Day 4 - Array Cardio Day 1

JavaScript 30의 Day 4 프로젝트는 무언갈 만드는 프로젝트는 아니고, 자바스크립트의 Array에 대해서 알아보는 시간이다. Array의 다양한 method들을 공부해보자.

## 🤓📄코드 모아보기

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Array Cardio 💪</title>
  </head>
  <body>
    <p><em>Psst: have a look at the JavaScript Console</em> 💁</p>
    <script>
      // Get your shorts on - this is an array workout!
      // ## Array Cardio Day 1

      // Some data we can work with

      const inventors = [
        { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
        { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
        { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
        { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
        { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
        { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
        { first: "Max", last: "Planck", year: 1858, passed: 1947 },
        { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
        { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
        { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
        { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
        { first: "Hanna", last: "Hammarström", year: 1829, passed: 1909 },
      ];

      const people = [
        "Bernhard, Sandra",
        "Bethea, Erin",
        "Becker, Carl",
        "Bentsen, Lloyd",
        "Beckett, Samuel",
        "Blake, William",
        "Berger, Ric",
        "Beddoes, Mick",
        "Beethoven, Ludwig",
        "Belloc, Hilaire",
        "Begin, Menachem",
        "Bellow, Saul",
        "Benchley, Robert",
        "Blair, Robert",
        "Benenson, Peter",
        "Benjamin, Walter",
        "Berlin, Irving",
        "Benn, Tony",
        "Benson, Leana",
        "Bent, Silas",
        "Berle, Milton",
        "Berry, Halle",
        "Biko, Steve",
        "Beck, Glenn",
        "Bergman, Ingmar",
        "Black, Elk",
        "Berio, Luciano",
        "Berne, Eric",
        "Berra, Yogi",
        "Berry, Wendell",
        "Bevan, Aneurin",
        "Ben-Gurion, David",
        "Bevel, Ken",
        "Biden, Joseph",
        "Bennington, Chester",
        "Bierce, Ambrose",
        "Billings, Josh",
        "Birrell, Augustine",
        "Blair, Tony",
        "Beecher, Henry",
        "Biondo, Frank",
      ];

      // Array.prototype.filter()
      // 1. Filter the list of inventors for those who were born in the 1500's

      const fifteen = inventors.filter(function (inventor) {
        if (inventor.year >= 1500 && inventor.year < 1600) {
          return true;
        }
      });

      console.table(fifteen);
      // Array.prototype.map()
      // 2. Give us an array of the inventors first and last names

      const fullNames = inventors.map(function (inventor) {
        return `${inventor.first} ${inventor.last}`;
      });

      console.log(fullNames);
      // Array.prototype.sort()
      // 3. Sort the inventors by birthdate, oldest to youngest

      // const ordered = inventors.sort(function (a, b) {
      //   if (a.year > b.year) {
      //     return 1;
      //   } else {
      //     return -1;
      //   }
      // });

      const ordered = inventors.sort((a, b) => (a.year > b.year ? 1 : -1));

      console.table(ordered);
      // Array.prototype.reduce()
      // 4. How many years did all the inventors live all together?

      const totalYears = inventors.reduce(function (total, inventor) {
        return total + (inventor.passed - inventor.year);
      }, 0);

      console.log(totalYears);
      // 5. Sort the inventors by years lived

      const oldest = inventors.sort(function (a, b) {
        const lastGuy = a.passed - a.yaer;
        const nextGuy = b.passed - b.year;

        // if (lastGuy > nextGuy) {
        //   return -1;
        // } else {
        //   return 1;
        // }

        return lastGuy > nextGuy ? -1 : 1;
      });

      console.table(oldest);
      // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
      // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

      // const category = document.querySelector(".mw-category");
      // const links = [...category.querySelectorAll("a")];

      // const de = links
      //   .map((link) => link.textContent)
      //   .filter((streetName) => streetName.includes("de"));
      // 7. sort Exercise
      // Sort the people alphabetically by last name

      const alpha = people.sort(function (lastOne, nextOne) {
        const [aLast, aFirst] = lastOne.split(", ");
        const [bLast, bFirst] = nextOne.split(", ");

        return aLast > bLast ? 1 : -1;
      });

      console.log(alpha);
      // 8. Reduce Exercise
      // Sum up the instances of each of these
      const data = [
        "car",
        "car",
        "truck",
        "truck",
        "bike",
        "walk",
        "car",
        "van",
        "bike",
        "walk",
        "car",
        "van",
        "car",
        "truck",
      ];

      const transportation = data.reduce(function (obj, item) {
        if (!obj[item]) {
          obj[item] = 0;
        }
        obj[item]++;
        return obj;
      }, {});

      console.log(transportation);
    </script>
  </body>
</html>
```

## 🔎코드 설명

이번 프로젝트에서는 Array의 다양한 method들을 공부한다.

### _`Array.filter()`_

`filter()` 메서드는 배열 내 각 요소에 대해 한 번 제공된 callback 함수를 호출해, callback이 true로 강제하는 값을 반환하는 모든 값이 있는 새로운 배열을 생성한다. callback은 할당된 값이 있는 배열의 인덱스에 대해서만 호출된다. 이 때, 삭제됐거나 값이 할당된 적이 없는 인덱스에 대해서는 호출되지 않는다. callback 테스트를 통과하지 못한 배열 요소는 그냥 건너뛰며 새로운 배열에 포함되지 않는다.

```
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

### _`Array.map()`_

`map()` 메서드는 callback 함수를 각각의 요소에 대해 한번씩 순서대로 불러 그 함수의 반환값으로 새로운 배열을 만든다. callback 함수는 (undefined도 포함해서) 배열 값이 들어있는 인덱스에 대해서만 호출된다. 즉, 값이 삭제되거나 아직 값이 할당/정의되지 않은 인덱스에 대해서는 호출되지 않는다.

```
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

### _`Array.sort([compareFunction])`_

`sort()` 메서드는 compareFunction이 제공되지 않으면 요소를 문자열로 변환하고 유니 코드 코드 포인트 순서로 문자열을 비교하여 정렬된다. compareFunction이 제공되면 배열 요소는 compare 함수의 반환 값에 따라 정렬된다. a와 b가 비교되는 두 요소라면, 다음과 같은 규칙을 따른다.

- compareFunction(a, b)이 0보다 작은 경우 a를 b보다 낮은 인덱스로 정렬한다.
- compareFunction(a, b)이 0보다 큰 경우, b를 a보다 낮은 인덱스로 정렬한다.
- compareFunction(a, b)이 0을 반환하면 a와 b를 서로에 대해 변경하지 않고 모든 다른 요소에 대해 정렬한다.

```
var numbers = [4, 2, 5, 1, 3];

numbers.sort(function(a, b) {
  return a - b;
});

console.log(numbers);

// expected output: Array [1, 2, 3, 4, 5]
```

### _`Array.reduce(callback, [initialValue])`_

`reduce()` 메서드는 는 빈 요소를 제외하고 배열 내에 존재하는 각 요소에 대해 callback 함수를 한 번씩 실행하고, 하나의 결과값을 반환한다. initialValue를 제공하지 않으면, reduce()는 인덱스 1부터 시작해 콜백 함수를 실행하고 첫 번째 인덱스는 건너 뛴다. initialValue를 제공하면 인덱스 0에서 시작한다.

```
[0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, currentIndex, array) {
	return previousValue + currentValue;
})
```

| _previousValue_ | _currentValue_ | _currentIndex_ |     _array_     | _return value_ |
| :-------------: | :------------: | :------------: | :-------------: | :------------: |
|        0        |       1        |       1        | [0, 1, 2, 3, 4] |       1        |
|        1        |       2        |       2        | [0, 1, 2, 3, 4] |       3        |
|        3        |       3        |       3        | [0, 1, 2, 3, 4] |       6        |
|        6        |       4        |       4        | [0, 1, 2, 3, 4] |       10       |

```
[0, 1, 2, 3, 4].reduce((previousValue, currentValue, currentIndex, array) => {
    return previousValue + currentValue;
}, 10)
```

| _previousValue_ | _currentValue_ | _currentIndex_ |     _array_     | _return value_ |
| :-------------: | :------------: | :------------: | :-------------: | :------------: |
|       10        |       0        |       0        | [0, 1, 2, 3, 4] |       10       |
|       10        |       1        |       1        | [0, 1, 2, 3, 4] |       11       |
|       11        |       2        |       2        | [0, 1, 2, 3, 4] |       13       |
|       13        |       3        |       3        | [0, 1, 2, 3, 4] |       16       |
|       16        |       4        |       4        | [0, 1, 2, 3, 4] |       20       |

## 🚀TIL(Today I Learned)

- JavaScript Array의 다양한 method들을 알아볼 수 있었다.
- `filter()`, `map()`, `sort()`, `reduce()`

[JavaScript 30 프로젝트 결과물](https://mjn9ine.github.io/javascript-30days/)
