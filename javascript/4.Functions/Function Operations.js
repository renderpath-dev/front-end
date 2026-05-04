"use strict"


function addNumber(number1, number2) {
  return number1 + number2;
}
const fn = addNumber;
const list = [addNumber];
const obj = {method:addNumber};

console.log(fn(35,64));
console.log(list[0](37,120));
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

/** Arrow Functions **/
const subtract = (x,y) => {
  if (typeof x !== "number" || y !== "number") {
    throw new TypeError("subtract expects two number");
  }
  return x - y;
};
try {
  console.log(subtract(10,"5"));
}catch (error) {
  console.log(error.name);
  console.log(error.message);
}

/** factorial **/
const factorial = function fac(num) {
  return num < 2 ? 1 : num * fac(num - 1);
};
console.log(factorial(8));

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



//recursion
function Factorial(n) {
  if (n === 1 || n === 0) {
    return 1;
  }
  return n * Factorial(n - 1);
}
console.log(Factorial(5));



function myFunction(theObject) {
  theObject.make = 'Toyota';
}
const myCar = {
  make: 'Honda',
  model: 'Accord',
  year: '1998',
};
console.log(myCar.make);
myFunction(myCar);
console.log(myCar.make);

function MyFunc(theArray) {
  theArray[0] = 30;
}

const arr = [45];
console.log(arr[0]);
MyFunc(arr);
console.log(arr[0]);


function divide(x,y) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new TypeError("divide expects two numbers");
  }
  if (y === 0) {
    throw new RangeError("divisor can't be zero");
  }
  return x / y;
}
try {
  const result = divide(2,0);
  console.log(result);
} catch(error) {
  console.log(error.name);
  console.log(error.message);
}

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
const name1 = 'Sunny';

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


/** Calling Function **/
const user = {
  name:"John",
  say() {
    return this.name;
  }
};
console.log(user.say());

/** detached function call
 "use strict";

 const user = {
 name: "Ada",
 say() {
 return this.name;  // this === undefined
 }
 };

 const fn = user.say;

 console.log(fn());   // TypeError
 **/

/** Constructor Call **/
function Users(name) {
  this.name = name;
}

Users.prototype.say = function () {
  return this.name;
}
const u = new Users("Ada");
console.log(u.name);
console.log(u.say());


/** Indirect Invocation: call()  apply()  bind() **/
function introduce (city,job) {
  return `${this.name} from ${city}, ${job}`;
}
const user1 = {name:"Alex"};
const user2 = {name:"Charlie"};
console.log(introduce.call(user1,"London","engineer"));
console.log(introduce.apply(user2,["San Francisco","Computer Science"]));

function greet (word) {
  return `${word},${this.name}`;
}
const userName = {name:"Chris"};
const boundGreet = greet.bind(userName);
console.log(boundGreet("Hello"));

// rest parameters
function sum(...numbers) {
  return numbers.reduce((total, value) => total + value, 0);
}

console.log(sum(1, 2, 3, 4));


// arguments
function showArguments() {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments.length);
}

showArguments('a', 'b');


// Destructuring Parameters
function addVector([x1,y1],[x2,y2]) {
  return [x1+x2,y1+y2];
}
console.log(addVector([1,2],[3,4]));


// Object Destructuring Parameters
function printUser (name,age) {
  return `${name} is ${age}`;
}
console.log(printUser({name:"John", age:28}));

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


// Functions as Namespaces
const uniqueInteger = (function () {
  let counter = 0;
  return function () {
    return counter++;
  }
})();
console.log(uniqueInteger());
console.log(uniqueInteger());
console.log(uniqueInteger());

