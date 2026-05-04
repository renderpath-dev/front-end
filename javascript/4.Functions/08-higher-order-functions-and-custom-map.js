"use strict";

function map(f, a) {
  const result = new Array(a.length);

  for (let i = 0; i < a.length; i++) {
    result[i] = f(a[i]);
  }

  return result;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const cubedNumbers = map(function (x) {
  return x * x * x;
}, numbers);

console.log(cubedNumbers);

const smallerNumbers = [0, 1, 2, 5, 10];
const smallerCubedNumbers = map(function (x) {
  return x * x * x;
}, smallerNumbers);

console.log(smallerCubedNumbers);

/**
 * Array.prototype.map returns a new array and does not modify the original array.
 */
const doubledNumbers = smallerNumbers.map(function (value, index, array) {
  console.log(value);
  console.log(index);
  console.log(array === smallerNumbers);
  return value * 2;
});

console.log(smallerNumbers);
console.log(doubledNumbers);

// Functions as Values
function calculate(a, b, operation) {
  return operation(a, b);
}

function add(a, b) {
  return a + b;
}

function multiplies(a, b) {
  return a * b;
}

console.log(calculate(2, 3, add));
console.log(calculate(2, 3, multiplies));
