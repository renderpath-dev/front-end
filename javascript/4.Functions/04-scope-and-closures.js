"use strict";

/** Function declarations and expressions can be nested, which forms a scope chain. **/
function addSquares(a, b) {
  function square(x) {
    return x * x;
  }

  return square(a) + square(b);
}

console.log(addSquares(3, 4));

/** Function scopes and closures **/
const num1 = 20;
const num2 = 3;
const name1 = "Sunny";

function multiply(num1, num2) {
  return num1 * num2;
}

console.log(multiply(num1, num2));

function getScore() {
  const num1 = 2;
  const num2 = 3;

  function add() {
    return `${name1} scored ${num1 + num2}`;
  }

  return add();
}

console.log(getScore());

function makeCounter(start) {
  let n = start;

  return function step(delta = 1) {
    n += delta;
    return n;
  };
}

const counter = makeCounter(10);
console.log(counter());
console.log(counter(5));
console.log(counter());

function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1500);
console.log(account.deposit(50));
console.log(account.withdraw(300));
console.log(account.getBalance());
console.log(account.balance);

/** Functions as Namespaces **/
const uniqueInteger = (function () {
  let counter = 0;

  return function () {
    return counter++;
  };
})();

console.log(uniqueInteger());
console.log(uniqueInteger());
console.log(uniqueInteger());

/**
 * Closure pitfall with var.
 */
const varFunctions = [];

for (var i = 0; i < 3; i++) {
  varFunctions.push(function () {
    return i;
  });
}

console.log(varFunctions[0]());
console.log(varFunctions[1]());
console.log(varFunctions[2]());

/**
 * let creates a new binding for each loop iteration.
 */
const letFunctions = [];

for (let j = 0; j < 3; j++) {
  letFunctions.push(function () {
    return j;
  });
}

console.log(letFunctions[0]());
console.log(letFunctions[1]());
console.log(letFunctions[2]());
