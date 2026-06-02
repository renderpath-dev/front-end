"use strict";

/**
 * Functions are values.
 * A function can be assigned to a variable, stored in an array,
 * or stored as an object property.
 */
function addNumber(number1, number2) {
  return number1 + number2;
}

const fn = addNumber;
const list = [addNumber];
const obj = { method: addNumber };

console.log(fn(35, 64));
console.log(list[0](37, 120));
console.log(obj.method(321, 98));

/** function Expression**/
const square = function (number) {
  return number * number;
};

console.log(square(5));

/** Named Function Expression **/
const fac = function fact(number) {
  if (number <= 1) return 1;
  return number * fact(number - 1);
};

console.log(fac(6));

/** factorial **/
const factorial = function fac(num) {
  return num < 2 ? 1 : num * fac(num - 1);
};

console.log(factorial(8));

// recursion
function Factorial(n) {
  if (n === 1 || n === 0) {
    return 1;
  }

  return n * Factorial(n - 1);
}

console.log(Factorial(5));

/**
 * Function declarations are initialized before the current scope runs.
 * Function expressions assigned to const are not callable before initialization.
 */
console.log(declaredBeforeCall(2, 3));

function declaredBeforeCall(a, b) {
  return a + b;
}

const expressionAfterInitialization = function (a, b) {
  return a * b;
};

console.log(expressionAfterInitialization(2, 3));

/**
 * A function expression can be defined based on a condition.
 */
let updateCar;
const mode = 0;

if (mode === 0) {
  updateCar = function (theObject) {
    theObject.make = "Toyota";
  };
}

const conditionalCar = {
  make: "Honda",
  model: "Accord"
};

console.log(conditionalCar.make);
updateCar(conditionalCar);
console.log(conditionalCar.make);
