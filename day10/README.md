![](https://javascript30.com/images/JS3-social-share.png)

# πDay 10 - Hold Shift to Check Multiple Checkboxes

JavaScript 30μ Day 10 νλ‘μ νΈλ μ¬λ¬ κ°μ μ²΄ν¬λ°μ€ μ€μμ `shift`ν€λ₯Ό λλ₯Έ μνλ‘ μ²΄ν¬ν λ°μ€μ κΈ°μ‘΄μ μ²΄ν¬ λμ΄μλ λ°μ€ μ¬μ΄μ μ²΄ν¬λ°μ€λ€μ΄ λͺ¨λ μ²΄ν¬λμ΄μ§λ κΈ°λ₯μ κ΅¬ννλ νλ‘μ νΈμ΄λ€.

## π€πμ½λ λͺ¨μλ³΄κΈ°

_**HTML**_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
    <title>Hold Shift to Check Multiple Checkboxes</title>
  </head>
  <body>
    <div class="inbox">
      <div class="item">
        <input type="checkbox" />
        <p>This is an inbox layout.</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Check one item</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Hold down your Shift key</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Check a lower item</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Everything in between should also be set to checked</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Try to do it without any libraries</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Just regular JavaScript</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Good Luck!</p>
      </div>
      <div class="item">
        <input type="checkbox" />
        <p>Don't forget to tweet your result!</p>
      </div>
    </div>

    <script src="main.js"></script>
  </body>
</html>
```

_**CSS**_

```
html {
  font-family: sans-serif;
  background: #ffc600;
}

.inbox {
  max-width: 400px;
  margin: 50px auto;
  background: white;
  border-radius: 5px;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.1);
}

.item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}

.item:last-child {
  border-bottom: 0;
}

input:checked + p {
  background: #f9f9f9;
  text-decoration: line-through;
}

input[type="checkbox"] {
  margin: 20px;
}

p {
  margin: 0;
  padding: 20px;
  transition: background 0.2s;
  flex: 1;
  font-family: "helvetica neue";
  font-size: 20px;
  font-weight: 200;
  border-left: 1px solid #d1e2ff;
}
```

_**JavaScript**_

```
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

function handleCheck(e) {
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    checkboxes.forEach((checkbox, idx) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  lastChecked = this;
}

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", handleCheck)
);
```

## πμ½λ μ€λͺ

1.  κ°μ₯ λ¨Όμ , `querySelectorAll`μ μ΄μ©ν΄μ inbox ν΄λμ€μ inputλ€ μ€ typeμ΄ checkboxμΈ elementλ€μ checkboxesμ ν λΉνλ€. λ€μμΌλ‘ checkboxesμμ `forEach`λ¬Έμ ν΅ν΄ κ° checkboxμμ `addEventListener`μ `click` μ΄λ²€νΈλ₯Ό λ°μμ€λ€. callback ν¨μλ‘λ handleClickμ μ€νμν¨λ€.

#

2.  μ΄μ  `handleClick`ν¨μλ₯Ό μμ±μμΌμ€μΌ νλ€. λ¨Όμ , inBetweenμ΄λΌλ νλκ·Έ λ³μλ₯Ό λ§λ€μ΄μ£Όκ³  μ΄κΈ°κ°μ falseλ‘ μ€μ νλ€. `handleCheck`μ μΈμλ‘ eλ₯Ό λ°μμ£Όλλ°, `e.shiftKey`λ₯Ό ν΅ν΄ shiftκ° λλ¦°μνμΌ λλ§ μνλ κΈ°λ₯μ κ΅¬νν  μ μλλ‘ νλ€. μ΄μ  μ‘°κ±΄μ λ§μ‘±νμ¬ `forEach`λ¬Έμ΄ μ€νλλλ° κ° checkboxλ€μ λν΄ μ°λ¦¬κ° μ΅κ·Όμ shiftν€μ ν¨κ» μ νν checkboxμ΄κ±°λ κ·Έ μ μ κ°μ₯ μ΅κ·Όμ μ ννλ checkboxλΌλ©΄ `inBetween != inBetween;`μ μν΄μ inBetweenμ΄λΌλ νλκ·Έκ° falseμμ trueλ‘ λ°λλ€.

#

3.  κ·Έλ¦¬κ³  λ€μμ μ‘°κ±΄λ¬Έ `if (inBetween)`μ λ§λλλ° inBetween λ³μκ° trueμΌλλ `checkbox.checked = true;`λ₯Ό ν΅ν΄ checkboxλ₯Ό μ νν κ²μΌλ‘ ν΄μ€λ€. μ¦, μ¬μ΄μ λ checkboxλ€μ λͺ¨λ checkν΄μ£Όλ μμμ΄λ€. μ΄ μμμ λ°λ³΅νλ€λ³΄λ©΄ λ€μ `if(checkbox === this || checkbox === lastChecked)`μ μ‘°κ±΄μ λΆν©νκ² λλ€. λ°λΌμ inBetweenμ΄ trueμμ falseλ‘ λ°λκ³ , λ μ΄μ inBetweenμ΄ trueκ° μλλ―λ‘ μλμ μ‘°κ±΄λ¬Έμ μ€νλμ§ μλλ€.

#

4.  μ΄λ¬ν λ‘μ§μΌλ‘ κ°μ₯ μ΅κ·Όμ ν΄λ¦­ν checkboxλΆν° shiftν€λ₯Ό λλ₯Έ μνμμ ν΄λ¦­ν checkboxκΉμ§μ λͺ¨λ  checkboxλ€μ΄ λͺ¨λ checkλ μνλ‘ λ°λκ² λλ€.

## πTIL(Today I Learned)

- μ΄λ² νλ‘μ νΈλ κ°λ¨νλ€κ³  μκ°νλλ° μκ°λ³΄λ€ μ½μ§ μμλ€. μ²μ²ν κΎΈμ€νκ² κ³μ λμ ν΄μΌκ² λ€.
- `querySelector('input[type=""]') => typeμΌλ‘λ ν΄λΉ elementλ₯Ό μ°Ύμ μ μλ€.`

[JavaScript 30 νλ‘μ νΈ κ²°κ³Όλ¬Ό](https://mjn9ine.github.io/javascript-30days/)
