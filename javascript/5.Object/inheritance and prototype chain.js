"use strict";

// inheritance and prototype chain.js

const parent = {
  value: 2,
  method() {
    return this.value + 1;
  },
};

console.log(parent.method());

const child = {
  // IMPROVEMENT: __proto__ is okay for learning, but Object.create is preferred in practice
  __proto__: parent,
};

console.log(child.method()); // inherited method, this === child
child.value = 4;
console.log(child.method());

/** Shared prototype object **/
const boxPrototype = {
  getValue() {
    return this.value;
  },
};

const boxes = [
  { value: 1, __proto__: boxPrototype },
  { value: 2, __proto__: boxPrototype },
  { value: 3, __proto__: boxPrototype },
];

console.log("----- Compare -----");
console.log(boxPrototype.value);       // undefined
console.log(boxes[0].value);           // 1
console.log(boxes[0].getValue());      // 1
console.log(boxPrototype.getValue());  // undefined
console.log("-------------------");

/** Constructor function + prototype **/
function Box(value) {
  this.value = value;
}

Box.prototype.getValue = function () {
  return this.value;
};

const boxList = [new Box(1), new Box(2), new Box(3)];
console.log(boxList[2].getValue());

const box = new Box(10);

// IMPROVEMENT: this shows that changing the prototype method later affects existing instances
Box.prototype.getValue = function () {
  return this.value + 30;
};

console.log(box.getValue());

/** Rewritten with class **/
class NewBox {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}

const boxInstance = new NewBox(1);
console.log(boxInstance.propertyIsEnumerable("value"));           // true
console.log(NewBox.prototype.propertyIsEnumerable("getValue"));   // false

/** Implicit prototypes of literals **/
const object = { A: 1 };
console.log(Object.getPrototypeOf(object) === Object.prototype);

const array = [1, 23, 34];
console.log(Object.getPrototypeOf(array) === Array.prototype);

const regExp = /abc/;
console.log(Object.getPrototypeOf(regExp) === RegExp.prototype);

console.log(Number.prototype + 1);                  // 1
console.log(Array.prototype.map((x) => x + 1));    // []
console.log(String.prototype + "a");               // "a"
console.log(RegExp.prototype.source);              // "(?:)"
console.log(Function.prototype());                 // undefined

/** Building longer inheritance chain **/
function Base() {}
function Derived() {}

Object.setPrototypeOf(Derived.prototype, Base.prototype);

const derivedObj = new Derived();

// FIX: avoid relying on __proto__ for checks when getPrototypeOf is available
console.log(Object.getPrototypeOf(derivedObj) === Derived.prototype);
console.log(Object.getPrototypeOf(Derived.prototype) === Base.prototype);

/** Inspecting prototypes **/
function DoSomething() {}

DoSomething.prototype.foo = "bar";

const doSomeInstancing = new DoSomething();
doSomeInstancing.prop = "some value";

console.log("doSomeInstancing.prop:     ", doSomeInstancing.prop);
console.log("doSomeInstancing.foo:      ", doSomeInstancing.foo);
console.log("DoSomething.prop:          ", DoSomething.prop);
console.log("DoSomething.foo:           ", DoSomething.foo);
console.log("DoSomething.prototype.prop:", DoSomething.prototype.prop);
console.log("DoSomething.prototype.foo: ", DoSomething.prototype.foo);

// Arrow functions do not have their own prototype property
const doSomethingFromArrowFunction = () => new DoSomething();
doSomethingFromArrowFunction.prop = "Some Value";

console.log(doSomethingFromArrowFunction);
console.log(doSomethingFromArrowFunction.prototype); // undefined

/** Different ways of creating prototype chains **/
const o = { a: 1 };

const s = ["yo", "sup", "?"];

function f() {
  return 2;
}

const p = { b: 2, __proto__: o };
console.log(p.a); // inherited from o

/** Constructor function example **/
function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype.addVertex = function (v) {
  this.vertices.push(v);
};

Graph.prototype.addEdge = function (e) {
  this.edges.push(e);
};

const g = new Graph();

console.log(g.hasOwnProperty("vertices")); // true
console.log(Object.hasOwn(g, "vertices")); // true

console.log(g.hasOwnProperty("nope"));     // false
console.log(Object.hasOwn(g, "nope"));     // false

console.log(g.hasOwnProperty("addVertex")); // false
console.log(Object.hasOwn(g, "addVertex")); // false

console.log(Object.getPrototypeOf(g).hasOwnProperty("addVertex")); // true

const a = { a: 1 };

const b = Object.create(a);
console.log(b.a); // inherited

const c = Object.create(b);
console.log(c.a); // inherited through a longer chain

const d = Object.create(null);
console.log(d.hasOwnProperty); // undefined

/** With classes **/
class Rectangle {
  constructor(x, y, width, height) {
    this.name = "Rectangle";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

class FilledRectangle extends Rectangle {
  constructor(x, y, width, height, color) {
    super(x, y, width, height);
    this.name = "FilledRectangle";
    this.color = color;
  }
}

const filledRectangle = new FilledRectangle(15, 10, 7, 11, "skyBlue");
console.log(filledRectangle);

/** With Object.setPrototypeOf **/
const originalObj = { original: 1 };
const anotherObj = { second: 2 };

Object.setPrototypeOf(originalObj, anotherObj);
console.log(originalObj.second);
console.log(Object.getPrototypeOf(originalObj) === anotherObj);

// TODO: for real projects, prefer Object.create(...) at object creation time
// instead of mutating an existing object's prototype later.




