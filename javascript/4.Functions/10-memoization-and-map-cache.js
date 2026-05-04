"use strict";

// memoization
function memoizeOneArg(fn) {
  const cache = new Map();

  return function (arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }

    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

function square(x) {
  console.log("calculate square");
  return x * x;
}

const memoizedSquare = memoizeOneArg(square);

console.log(memoizedSquare(5));
console.log(memoizedSquare(5));

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function add(a, b) {
  console.log("calculate add");
  return a + b;
}

const memoizedAdd = memoize(add);

console.log(memoizedAdd(2, 3));
console.log(memoizedAdd(2, 3));

/**
 * Map stores key-value pairs.
 * Array.prototype.map transforms an array into a new array.
 */
const cache = new Map();
cache.set(5, "number key");
cache.set("5", "string key");

console.log(cache.get(5));
console.log(cache.get("5"));

const values = [1, 2, 3];
const mappedValues = values.map(value => value * 10);

console.log(values);
console.log(mappedValues);
