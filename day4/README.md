![](https://javascript30.com/images/JS3-social-share.png)

# ๐Day 4 - Array Cardio Day 1

JavaScript 30์ Day 4 ํ๋ก์ ํธ๋ ๋ฌด์ธ๊ฐ ๋ง๋๋ ํ๋ก์ ํธ๋ ์๋๊ณ , ์๋ฐ์คํฌ๋ฆฝํธ์ Array์ ๋ํด์ ์์๋ณด๋ ์๊ฐ์ด๋ค. Array์ ๋ค์ํ method๋ค์ ๊ณต๋ถํด๋ณด์.

## ๐ค๐์ฝ๋ ๋ชจ์๋ณด๊ธฐ

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Array Cardio ๐ช</title>
  </head>
  <body>
    <p><em>Psst: have a look at the JavaScript Console</em> ๐</p>
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
        { first: "Hanna", last: "Hammarstrรถm", year: 1829, passed: 1909 },
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

## ๐์ฝ๋ ์ค๋ช

์ด๋ฒ ํ๋ก์ ํธ์์๋ Array์ ๋ค์ํ method๋ค์ ๊ณต๋ถํ๋ค.

### _`Array.filter()`_

`filter()` ๋ฉ์๋๋ ๋ฐฐ์ด ๋ด ๊ฐ ์์์ ๋ํด ํ ๋ฒ ์ ๊ณต๋ callback ํจ์๋ฅผ ํธ์ถํด, callback์ด true๋ก ๊ฐ์ ํ๋ ๊ฐ์ ๋ฐํํ๋ ๋ชจ๋  ๊ฐ์ด ์๋ ์๋ก์ด ๋ฐฐ์ด์ ์์ฑํ๋ค. callback์ ํ ๋น๋ ๊ฐ์ด ์๋ ๋ฐฐ์ด์ ์ธ๋ฑ์ค์ ๋ํด์๋ง ํธ์ถ๋๋ค. ์ด ๋, ์ญ์ ๋๊ฑฐ๋ ๊ฐ์ด ํ ๋น๋ ์ ์ด ์๋ ์ธ๋ฑ์ค์ ๋ํด์๋ ํธ์ถ๋์ง ์๋๋ค. callback ํ์คํธ๋ฅผ ํต๊ณผํ์ง ๋ชปํ ๋ฐฐ์ด ์์๋ ๊ทธ๋ฅ ๊ฑด๋๋ฐ๋ฉฐ ์๋ก์ด ๋ฐฐ์ด์ ํฌํจ๋์ง ์๋๋ค.

```
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

### _`Array.map()`_

`map()` ๋ฉ์๋๋ callback ํจ์๋ฅผ ๊ฐ๊ฐ์ ์์์ ๋ํด ํ๋ฒ์ฉ ์์๋๋ก ๋ถ๋ฌ ๊ทธ ํจ์์ ๋ฐํ๊ฐ์ผ๋ก ์๋ก์ด ๋ฐฐ์ด์ ๋ง๋ ๋ค. callback ํจ์๋ (undefined๋ ํฌํจํด์) ๋ฐฐ์ด ๊ฐ์ด ๋ค์ด์๋ ์ธ๋ฑ์ค์ ๋ํด์๋ง ํธ์ถ๋๋ค. ์ฆ, ๊ฐ์ด ์ญ์ ๋๊ฑฐ๋ ์์ง ๊ฐ์ด ํ ๋น/์ ์๋์ง ์์ ์ธ๋ฑ์ค์ ๋ํด์๋ ํธ์ถ๋์ง ์๋๋ค.

```
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

### _`Array.sort([compareFunction])`_

`sort()` ๋ฉ์๋๋ compareFunction์ด ์ ๊ณต๋์ง ์์ผ๋ฉด ์์๋ฅผ ๋ฌธ์์ด๋ก ๋ณํํ๊ณ  ์ ๋ ์ฝ๋ ์ฝ๋ ํฌ์ธํธ ์์๋ก ๋ฌธ์์ด์ ๋น๊ตํ์ฌ ์ ๋ ฌ๋๋ค. compareFunction์ด ์ ๊ณต๋๋ฉด ๋ฐฐ์ด ์์๋ compare ํจ์์ ๋ฐํ ๊ฐ์ ๋ฐ๋ผ ์ ๋ ฌ๋๋ค. a์ b๊ฐ ๋น๊ต๋๋ ๋ ์์๋ผ๋ฉด, ๋ค์๊ณผ ๊ฐ์ ๊ท์น์ ๋ฐ๋ฅธ๋ค.

- compareFunction(a, b)์ด 0๋ณด๋ค ์์ ๊ฒฝ์ฐ a๋ฅผ b๋ณด๋ค ๋ฎ์ ์ธ๋ฑ์ค๋ก ์ ๋ ฌํ๋ค.
- compareFunction(a, b)์ด 0๋ณด๋ค ํฐ ๊ฒฝ์ฐ, b๋ฅผ a๋ณด๋ค ๋ฎ์ ์ธ๋ฑ์ค๋ก ์ ๋ ฌํ๋ค.
- compareFunction(a, b)์ด 0์ ๋ฐํํ๋ฉด a์ b๋ฅผ ์๋ก์ ๋ํด ๋ณ๊ฒฝํ์ง ์๊ณ  ๋ชจ๋  ๋ค๋ฅธ ์์์ ๋ํด ์ ๋ ฌํ๋ค.

```
var numbers = [4, 2, 5, 1, 3];

numbers.sort(function(a, b) {
  return a - b;
});

console.log(numbers);

// expected output: Array [1, 2, 3, 4, 5]
```

### _`Array.reduce(callback, [initialValue])`_

`reduce()` ๋ฉ์๋๋ ๋ ๋น ์์๋ฅผ ์ ์ธํ๊ณ  ๋ฐฐ์ด ๋ด์ ์กด์ฌํ๋ ๊ฐ ์์์ ๋ํด callback ํจ์๋ฅผ ํ ๋ฒ์ฉ ์คํํ๊ณ , ํ๋์ ๊ฒฐ๊ณผ๊ฐ์ ๋ฐํํ๋ค. initialValue๋ฅผ ์ ๊ณตํ์ง ์์ผ๋ฉด, reduce()๋ ์ธ๋ฑ์ค 1๋ถํฐ ์์ํด ์ฝ๋ฐฑ ํจ์๋ฅผ ์คํํ๊ณ  ์ฒซ ๋ฒ์งธ ์ธ๋ฑ์ค๋ ๊ฑด๋ ๋ด๋ค. initialValue๋ฅผ ์ ๊ณตํ๋ฉด ์ธ๋ฑ์ค 0์์ ์์ํ๋ค.

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

## ๐TIL(Today I Learned)

- JavaScript Array์ ๋ค์ํ method๋ค์ ์์๋ณผ ์ ์์๋ค.
- `filter()`, `map()`, `sort()`, `reduce()`

[JavaScript 30 ํ๋ก์ ํธ ๊ฒฐ๊ณผ๋ฌผ](https://mjn9ine.github.io/javascript-30days/)
