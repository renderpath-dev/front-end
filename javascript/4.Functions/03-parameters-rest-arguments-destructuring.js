"use strict";

/**
 * Default parameters are used only when the argument is undefined.
 */
function greet(name = "Guest") {
  return `Hello, ${name}`;
}

console.log(greet("Ada"));
console.log(greet());
console.log(greet(undefined));
console.log(greet(null));

// rest parameters
function sum(...numbers) {
  return numbers.reduce((total, value) => total + value, 0);
}

console.log(sum(1, 2, 3, 4));
console.log(sum());

function logUser(name, ...scores) {
  console.log(name);
  console.log(scores);
}

logUser("Ada", 90, 95, 100);

// arguments
function showArguments() {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments.length);
  console.log(Array.isArray(arguments));
}

showArguments("a", "b");

function showRestArguments(...args) {
  console.log(args[0]);
  console.log(args[1]);
  console.log(args.length);
  console.log(Array.isArray(args));
}

showRestArguments("a", "b");

// Destructuring Parameters
function addVector([x1, y1], [x2, y2]) {
  return [x1 + x2, y1 + y2];
}

console.log(addVector([1, 2], [3, 4]));

// Object Destructuring Parameters
function printUser({ name, age }) {
  return `${name} is ${age}`;
}

console.log(printUser({ name: "John", age: 28 }));

function printUserSafely({ name = "Unknown", age = 0 } = {}) {
  return `${name} is ${age}`;
}

console.log(printUserSafely());
console.log(printUserSafely({ name: "Ada" }));

/**
 * Parameters are local bindings inside the function.
 */
function replaceFirstItem(theArray) {
  theArray[0] = 30;
}

const arr = [45];
console.log(arr[0]);
replaceFirstItem(arr);
console.log(arr[0]);

function updateMake(theObject) {
  theObject.make = "Toyota";
}

const myCar = {
  make: "Honda",
  model: "Accord",
  year: "1998"
};

console.log(myCar.make);
updateMake(myCar);
console.log(myCar.make);
