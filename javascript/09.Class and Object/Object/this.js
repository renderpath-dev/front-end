'use strict';

// this.js

/** Using this for object references **/
const manager = {
  name: 'Karina',
  age: 27,
  job: 'Software Engineer',
};

const intern = {
  name: 'Tyrone',
  age: 21,
  job: 'Software Engineer Intern',
};

function sayHello() {
  console.log(`Hello, my name is ${this.name}!`);
}

manager.sayHello = sayHello;
intern.sayHello = sayHello;

manager.sayHello(); // this === manager
intern.sayHello(); // this === intern

// FIX: add the detached-call case, because this is where learners usually get confused
const detached = manager.sayHello;

try {
  detached(); // in strict mode, this is undefined in a plain function call
} catch (error) {
  console.log('detached() error:', error.message);
}

/** IMPROVEMENT: explicit this binding **/
sayHello.call(manager);
sayHello.apply(intern);

const boundHello = sayHello.bind(manager);
boundHello();

/** Defining getters and setters **/
const myObj = {
  a: 7,

  get b() {
    return this.a + 1;
  },

  set c(x) {
    this.a = x / 2;
  },
};

console.log(myObj.a); // 7
console.log(myObj.b); // 8
myObj.c = 50;
console.log(myObj.a); // 25

// FIX: getter/setter are accessor properties, not normal methods
// myObj.b();    // BAD EXAMPLE
// myObj.c(50);  // BAD EXAMPLE

const setObj = { s: 7 };

Object.defineProperties(setObj, {
  b: {
    get() {
      return this.s + 1;
    },
  },
  c: {
    set(x) {
      this.s = x / 2;
    },
  },
});

console.log(setObj.s); // 7
setObj.c = 20;
console.log(setObj.s); // 10
console.log(setObj.b); // 11

// IMPROVEMENT: inspect accessor descriptors
console.log(Object.getOwnPropertyDescriptor(setObj, 'b'));
console.log(Object.getOwnPropertyDescriptor(setObj, 'c'));

// IMPROVEMENT: properties created with defineProperties are non-enumerable by default
console.log(Object.keys(setObj)); // likely ["s"]

/** Comparing objects **/
// FIX: object comparison is by reference identity, not by property content
const fruit = { name: 'apple' };
const anotherFruit = { name: 'apple' };

console.log(fruit == anotherFruit); // false
console.log(fruit === anotherFruit); // false

// FIX: use lowercase for ordinary objects
const weather = { name: 'hurricane' };
const anotherWeather = weather;

console.log(weather == anotherWeather); // true
console.log(weather === anotherWeather); // true

weather.name = 'Shower';
console.log(anotherWeather); // same object, so mutation is visible here

/** IMPROVEMENT: copy vs shared reference **/
const copiedWeather = { ...weather };
console.log(copiedWeather === weather); // false
