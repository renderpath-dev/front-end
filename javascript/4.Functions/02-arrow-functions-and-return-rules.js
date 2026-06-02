"use strict";

/** Arrow Functions **/
const subtract = (x, y) => {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new TypeError("subtract expects two numbers");
  }

  return x - y;
};

try {
  console.log(subtract(10, "5"));
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}

try {
  console.log(subtract(10, 5));
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}

/**
 * One simple parameter can omit parentheses.
 */
const double = x => x * 2;
console.log(double(5));

/**
 * Zero parameters require parentheses.
 */
const getNumber = () => 100;
console.log(getNumber());

/**
 * Multiple parameters require parentheses.
 */
const add = (a, b) => a + b;
console.log(add(2, 3));

/**
 * Expression body returns automatically.
 */
const squareExpressionBody = x => x * x;
console.log(squareExpressionBody(5));

/**
 * Block body requires an explicit return.
 */
const squareBlockBody = x => {
  return x * x;
};
console.log(squareBlockBody(5));

/**
 * Returning an object literal from an arrow expression body requires parentheses.
 */
const createUser = name => ({ name: name });
console.log(createUser("Ada"));

/**
 * Arrow functions do not have their own this.
 * Do not use an arrow function as an object method when the method needs this.
 */
const wrongUser = {
  name: "Ada",
  say: () => {
    return this;
  }
};

console.log(wrongUser.say() === undefined);

const correctUser = {
  name: "Ada",
  say() {
    return this.name;
  }
};

console.log(correctUser.say());
