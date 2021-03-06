![](https://javascript30.com/images/JS3-social-share.png)

# πDay 6 - Ajax Type Ahead

JavaScript 30μ Day 6 νλ‘μ νΈλ Fetch APIμ μ κ·ννμμ μ΄μ©ν΄ κ²μμ°½μ λ¬Έμλ₯Ό μλ ₯νλ©΄ ν΄λΉ λ¬Έμκ° ν¬ν¨λ λμλ₯Ό λμ΄νλ νλ‘μ νΈμ΄λ€.

## π€πμ½λ λͺ¨μλ³΄κΈ°

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Type Ahead π</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <form class="search-form">
      <input type="text" class="search" placeholder="City or State" />
      <ul class="suggestions">
        <li>Filter for a city</li>
        <li>or a state</li>
      </ul>
    </form>
    <script src="main.js"></script>
  </body>
</html>
```

_**CSS**_

```
html {
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    #98ddca 0%,
    #d5ecc2 33%,
    #ffd3b4 66%,
    #ffaaa7 100%
  );
  font-family: "helvetica neue";
  font-size: 20px;
  font-weight: 200;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

input {
  width: 100%;
  padding: 20px;
}

.search-form {
  max-width: 400px;
  margin: 50px auto;
}

input.search {
  margin: 0;
  text-align: center;
  outline: 0;
  border: 10px solid #f7f7f7;
  width: 120%;
  left: -10%;
  position: relative;
  top: 10px;
  z-index: 2;
  border-radius: 5px;
  font-size: 40px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.19);
}

.suggestions {
  margin: 0;
  padding: 0;
  position: relative;
  /*perspective: 20px;*/
}

.suggestions li {
  background: white;
  list-style: none;
  border-bottom: 1px solid #d8d8d8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.14);
  margin: 0;
  padding: 20px;
  transition: background 0.2s;
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
}

.suggestions li:nth-child(even) {
  transform: perspective(100px) rotateX(3deg) translateY(2px) scale(1.001);
  background: linear-gradient(to bottom, #ffffff 0%, #efefef 100%);
}

.suggestions li:nth-child(odd) {
  transform: perspective(100px) rotateX(-3deg) translateY(3px);
  background: linear-gradient(to top, #ffffff 0%, #efefef 100%);
}

span.population {
  font-size: 15px;
}

.hl {
  background: #87aaaa;
}
```

_**JavaScript**_

```
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    // gi means global insensitive
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
```

## πμ½λ μ€λͺ

1.  κ°μ₯ λ¨Όμ  `fetch()`λ₯Ό ν΅ν΄ endpointλ‘λΆν° μλ΅μ JSON ννλ‘ νμ±νκ³  κ·Έλ κ² μ»μ λ°μ΄ν°λ₯Ό `cities`μ Spread Operatorλ₯Ό μ¬μ©ν΄ push ν΄μ€λ€.

#

2.  λ€μμΌλ‘λ `findMatches()`ν¨μλ₯Ό ν΅ν΄ cities λ°°μ΄μ Day 4μμ μ΄μ©νλ filter λ©μλλ₯Ό μ΄μ©νλ€. μ¬μ©μκ° μλ ₯ν λ¨μ΄μΈ wordToMatchμ λΉκ΅νμ¬ κ·Έ λ¨μ΄κ° cityλ stateμ ν¬ν¨λ κ²½μ°λ§ νν°λ§ν΄μ€λ€. μ¬κΈ°μμ μ κ· ννμμ΄ μ¬μ©λλ€.

#

3.  μ΄μ  `search`ν΄λμ€μ inputμ΄ λ°λ λ λ§λ€ λμκ° λ¬λΌμ ΈμΌ νκΈ° λλ¬Έμ `change`μ `keyup` λμμ addEventListenerλ₯Ό μ€μ νλ€. μ€νν  ν¨μλ‘λ `displayMatches`λ‘ `findMatches(this.value, cities)`μμ inputκ³Ό μΌμΉνλ λμ arrayλ₯Ό `matchArray`μ ν λΉνλ€. μ΄νμ map λ©μλλ₯Ό νμ©νλλ° λ§€μΉλλ λ¨μ΄λ₯Ό νμ΄λΌμ΄νΈ μμΌμ£ΌκΈ° μν΄μ `replace`λ₯Ό μ΄μ©ν΄ `hl`ν΄λμ€λ₯Ό κ°μ§ νκ·Έλ‘ κ°μΈμ€λ€.

### _`fetch`_

: κΈ°μ‘΄μ ajax ν΅μ μ μ¬μ©ν  λ `XMLHttpRequest`, `jQuery.ajax()`μ κ°μ μμμ μννλ€. return typeμ `Promise`κ°μ²΄μ΄λ€.

```
  let promise = fetch(url, [options])
```

optionsμ μλ¬΄κ²λ λκΈ°μ§ μμΌλ©΄ μμ²­μ `GET` λ©μλλ‘ μ§νλκ³  `url`λ‘λΆν° μ½νμΈ κ° λ€μ΄λ‘λ λλ€.

### _`promise`_

: JavaScript λΉλκΈ° μ²λ¦¬μ μ¬μ©λλ κ°μ²΄μ΄λ€. μ£Όλ‘ μλ²μμ λ°μμ€λ λ°μ΄ν°λ₯Ό λμμ μ΄μ©ν  λ λ°μ΄ν°λ₯Ό λ°μμ€λ μμμ΄ λλκ³  λμ λμν΄μΌ μ€λ₯κ° λ°μλμ§ μμΌλ―λ‘ μμμ΄ μμ°¨μ μΌλ‘ μλ£λμ΄μΌ νλ€. μ΄λ₯Ό λ³΄μ₯νκΈ° μν΄ μ¬μ©λλ κ°μ²΄κ° `promise`μ΄λ€.  
`promise`κ°μ²΄λ `fetch` μλ΅μ μ²λ¦¬νλ λ€μν λ©μλλ₯Ό κ°μ§κ³  μλ€.

- response.text() β μλ΅μ μ½κ³  νμ€νΈλ₯Ό λ°ννλ€.
- response.json() β μλ΅μ JSON ννλ‘ νμ±νλ€.
- response.blob() β μλ΅μ Blob(νμμ΄ μλ λ°μ΄λλ¦¬ λ°μ΄ν°) ννλ‘ λ°ννλ€.

### _`μ κ· ννμ (RegExp κ°μ²΄)`_

: μ κ· ννμμ λ¬Έμμ΄μ λνλλ νΉμ  λ¬Έμ μ‘°ν©κ³Ό λμμν€κΈ° μν΄ μ¬μ©λλ ν¨ν΄μ΄λ€.  
μ΄λ² νλ‘μ νΈμμ μ°λ¦¬λ `RegExp` κ°μ²΄μ μμ±μ ν¨μλ₯Ό νΈμΆν΄ `g`μ `i` flagλ₯Ό μ¬μ©νλ€. μ¬κΈ°μ `g`λ λμ λ¬Έμμ΄ λ΄μ λͺ¨λ  ν¨ν΄λ€μ κ²μνλ κ²μ μλ―Ένκ³  `i`λ λμ λ¬Έμμ΄μ λν΄μ λ/μλ¬Έμλ₯Ό κ΅¬λΆνμ§ μλ κ²μ μλ―Ένλ€.

## πTIL(Today I Learned)

- JavaScriptμ λΉλκΈ° ν΅μ μ λν΄ λ μμλ΄μΌ ν  νμμ±μ λλ μ μμλ€.
- `fetch`, `promise(κ°μ²΄)`, `RegExp`, `addEventListener(change)`, `addEventListener(keyup)`

[JavaScript 30 νλ‘μ νΈ κ²°κ³Όλ¬Ό](https://mjn9ine.github.io/javascript-30days/)
