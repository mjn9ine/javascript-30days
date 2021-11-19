![](https://javascript30.com/images/JS3-social-share.png)

# 📖Day 6 - Ajax Type Ahead

JavaScript 30의 Day 6 프로젝트는 Fetch API와 정규표현식을 이용해 검색창에 문자를 입력하면 해당 문자가 포함된 도시를 나열하는 프로젝트이다.

## 🤓📄코드 모아보기

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Type Ahead 👀</title>
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

## 🔎코드 설명

1.  가장 먼저 `fetch()`를 통해 endpoint로부터 응답을 JSON 형태로 파싱하고 그렇게 얻은 데이터를 `cities`에 Spread Operator를 사용해 push 해준다.

#

2.  다음으로는 `findMatches()`함수를 통해 cities 배열에 Day 4에서 이용했던 filter 메서드를 이용한다. 사용자가 입력한 단어인 wordToMatch와 비교하여 그 단어가 city나 state에 포함된 경우만 필터링해준다. 여기에서 정규 표현식이 사용된다.

#

3.  이제 `search`클래스의 input이 바뀔 때 마다 도시가 달라져야 하기 때문에 `change`와 `keyup` 동작에 addEventListener를 설정한다. 실행할 함수로는 `displayMatches`로 `findMatches(this.value, cities)`에서 input과 일치하는 도시 array를 `matchArray`에 할당한다. 이후에 map 메서드를 활용하는데 매치되는 단어를 하이라이트 시켜주기 위해서 `replace`를 이용해 `hl`클래스를 가진 태그로 감싸준다.

### _`fetch`_

: 기존의 ajax 통신을 사용할 때 `XMLHttpRequest`, `jQuery.ajax()`와 같은 작업을 수행한다. return type은 `Promise`객체이다.

```
  let promise = fetch(url, [options])
```

options에 아무것도 넘기지 않으면 요청은 `GET` 메서드로 진행되고 `url`로부터 콘텐츠가 다운로드 된다.

### _`promise`_

: JavaScript 비동기 처리에 사용되는 객체이다. 주로 서버에서 받아오는 데이터를 동작에 이용할 때 데이터를 받아오는 작업이 끝나고 나서 동작해야 오류가 발생되지 않으므로 작업이 순차적으로 완료되어야 한다. 이를 보장하기 위해 사용되는 객체가 `promise`이다.  
`promise`객체는 `fetch` 응답을 처리하는 다양한 메서드를 가지고 있다.

- response.text() – 응답을 읽고 텍스트를 반환한다.
- response.json() – 응답을 JSON 형태로 파싱한다.
- response.blob() – 응답을 Blob(타입이 있는 바이너리 데이터) 형태로 반환한다.

### _`정규 표현식 (RegExp 객체)`_

: 정규 표현식은 문자열에 나타나는 특정 문자 조합과 대응시키기 위해 사용되는 패턴이다.  
이번 프로젝트에서 우리는 `RegExp` 객체의 생성자 함수를 호출해 `g`와 `i` flag를 사용한다. 여기서 `g`는 대상 문자열 내에 모든 패턴들을 검색하는 것을 의미하고 `i`는 대상 문자열에 대해서 대/소문자를 구분하지 않는 것을 의미한다.

## 🚀TIL(Today I Learned)

- JavaScript의 비동기 통신에 대해 더 알아봐야 할 필요성을 느낄 수 있었다.
- `fetch`, `promise(객체)`, `RegExp`, `addEventListener(change)`, `addEventListener(keyup)`

[JavaScript 30 프로젝트 결과물](https://mjn9ine.github.io/javascript-30days/)
