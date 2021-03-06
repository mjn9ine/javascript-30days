![](https://javascript30.com/images/JS3-social-share.png)

# ðDay 9 - 14 Must Know Dev Tools Tricks

JavaScript 30ì Day 9 íë¡ì í¸ë ê°ë°ì ëêµ¬ì ë¤ìí ê¸°ë¥ë¤ì ììë³´ë íë¡ì í¸ì´ë¤.

## ð¤ðì½ë ëª¨ìë³´ê¸°

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Console Tricks!</title>
  </head>
  <body>
    <p onClick="makeGreen()">ÃBREAKÃDOWNÃ</p>

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

console.log("Hello I am a %s string!", "ð");
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

## ðì½ë ì¤ëª

### _`console.log()`_

`log()`ë©ìëë console ì¤ë¸ì í¸ìì ê°ì¥ ìì£¼ ì°ë ë©ìëë¡ ()ìì ë©ìì§ë¥¼ ì¶ë ¥í´ì¤ë¤.

### _`console.warn()`_

`warn()`ë©ìëë ì½ìì ê²½ê³  ë©ìì§ë¥¼ ì¶ë ¥í´ì¤ë¤.

### _`console.error()`_

`error()`ë©ìëë ì½ìì ìë¬ ë©ìì§ë¥¼ ì¶ë ¥í´ì¤ë¤.

### _`console.info()`_

`info()`ë©ìëë ì½ìì ì ë³´ ë©ìì§ë¥¼ ì¶ë ¥í´ì¤ë¤.

### _`console.assert()`_

`assert()`ë©ìëë ì£¼ì´ì§ ê°ì ì´ ê±°ì§ì¸ ê²½ì°ì ì½ìì ì¤ë¥ ë©ìì§ë¥¼ ì¶ë ¥íë¤. ì°¸ì¸ ê²½ì°ìë ìë¬´ê²ë íì§ ìëë¤.

### _`console.clear()`_

`clear()`ë©ìëë ì½ìì ê¸°ë¡ë ë©ìì§ë¥¼ ëª¨ë ì§ìì¤ë¤.

### _`console.dir()`_

`dir()`ë©ìëë ì½ìì ì£¼ì´ì§ ê°ì²´ì ìì± ëª©ë¡ì ì¶ë ¥í´ì¤ë¤. `log()`ì ë¤ë¥¸ ì ì `log()`ë HTML ííë¡ í¸ë¦¬ êµ¬ì¡°(íê·¸ ë´ì©)ë¥¼ ì¶ë ¥íê³ , `dir()`ì JSON ííë¡ í¸ë¦¬ êµ¬ì¡°(ê°ì²´ì ìì±)ë¥¼ ì¶ë ¥íë¤.

### _`console.count()`_

`count()`ë©ìëë ()ìì ì¸ìê° ê°ì ê²ì í¸ì¶ íìë¥¼ ì¶ë ¥í´ì¤ë¤.

### _`console.group(), console.groupEnd()`_

`group()`ë©ìëë ì½ìì ìë¡ì´ ì¸ë¼ì¸ ê·¸ë£¹ì ë§ë¤ì´ì¤ë¤. `console.groupEnd()`ê° í¸ì¶ë  ëê¹ì§ ì¶ê° ë ë²¨ë¡ ë¤ì ì½ì ë©ìì§ë¥¼ ë¤ì¬ ì´ë¤.

### _`console.time(), console.timeEnd()`_

`time()`ë©ìëë ììì´ ì¼ë§ë ê±¸ë¦¬ëì§ ì¶ì í  ì ìë¤. ê° íì´ë¨¸ìê² ê³ ì í ì´ë¦ì ì¤ ì ìê³ , `console.timeEnd()`ê° í¸ì¶ë  ëê¹ì§ì ìê°ì ì¶ë ¥íë¤.

### _`console.table()`_

`table()`ë©ìëë ë°ì´í°ë¥¼ íì ííë¡ ì½ìì ì¶ë ¥í´ì¤ë¤.

## ðTIL(Today I Learned)

- ê°ë°ì ëêµ¬, í¹í consoleì ë¤ìí ë©ìëë¤ì ììë³¼ ì ììë¤. í¹í `dir()`ê³¼ `log()` ë©ìëì ì°¨ì´ë¥¼ ì ííê² ì ì ììë¤.
- `log()`, `warn()`, `error()`, `info()`, `assert()`, `clear()`, `dir()`, `count()`, `group() <-> groupEnd()`, `time() <-> timeEnd()`, `table()`

[JavaScript 30 íë¡ì í¸ ê²°ê³¼ë¬¼](https://mjn9ine.github.io/javascript-30days/)
