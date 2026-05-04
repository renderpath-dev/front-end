'use strict';

// length & name
function add(a, b) {
  return a + b;
}

function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(add.length);
console.log(sum.length);
console.log(add.name);
console.log(sum.name);

// prototype
function User(name) {
  this.name = name;
}
console.log(typeof User.prototype);

User.prototype.say = function () {
  return this.name;
};
const user = new User('Alex');
console.log(user.say());
console.log(Object.getPrototypeOf(user) === User.prototype);

const Arrow = () => {};
console.log(Arrow.prototype);

// toString()
function addNumber(a, b) {
  return a + b;
}

console.log(addNumber.toString());
console.log(Math.max.toString());

// Function() Constructor
const addNumbers = new Function('a', 'b', 'return a + b;');

console.log(addNumbers(2, 3));