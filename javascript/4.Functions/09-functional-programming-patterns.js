"use strict";

function twice(fn) {
  return function (value) {
    return fn(fn(value));
  };
}

function increment(x) {
  return x + 1;
}

const addTwo = twice(increment);
console.log(addTwo(10));

function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5));

function partialLeft(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function list(a, b, c) {
  return [a, b, c];
}

const withFirst = partialLeft(list, "A");
console.log(withFirst("B", "C"));

/**
 * Pure function example.
 */
function addPure(a, b) {
  return a + b;
}

console.log(addPure(2, 3));

/**
 * Impure function example.
 */
let total = 0;

function addToTotal(value) {
  total += value;
  return total;
}

console.log(addToTotal(5));
console.log(addToTotal(5));
