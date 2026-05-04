# JavaScript Objects and Prototype Chain Learning Notes

> Scope: object basics, property access, property descriptors, getters/setters, enumeration, copying, mutation control, `this`, constructors, prototype chain, symbol keys, and what is still missing from the current notes.
>
> Goal: build an operational model, not just memorize APIs.

---

## Table of Contents

- [1. The Core Mental Model](#1-the-core-mental-model)
- [2. Object Creation](#2-object-creation)
- [3. Property Access](#3-property-access)
- [4. Dynamic Property Names](#4-dynamic-property-names)
- [5. Object References and Equality](#5-object-references-and-equality)
- [6. Deleting Properties](#6-deleting-properties)
- [7. Own Properties vs Inherited Properties](#7-own-properties-vs-inherited-properties)
- [8. Enumerability and Property Listing](#8-enumerability-and-property-listing)
- [9. Property Descriptors](#9-property-descriptors)
- [10. Data Properties vs Accessor Properties](#10-data-properties-vs-accessor-properties)
- [11. Getters and Setters](#11-getters-and-setters)
- [12. Object.assign and Spread](#12-objectassign-and-spread)
- [13. Shallow Copy vs Deep Copy](#13-shallow-copy-vs-deep-copy)
- [14. Object Mutation Control](#14-object-mutation-control)
- [15. Prototype Chain](#15-prototype-chain)
- [16. Object.create](#16-objectcreate)
- [17. Constructor Functions and Prototype Methods](#17-constructor-functions-and-prototype-methods)
- [18. The `new` Operator](#18-the-new-operator)
- [19. `this` Binding](#19-this-binding)
- [20. Arrow Functions and `this`](#20-arrow-functions-and-this)
- [21. call, apply, and bind](#21-call-apply-and-bind)
- [22. Symbol Keys](#22-symbol-keys)
- [23. JSON and toJSON](#23-json-and-tojson)
- [24. Objects as Maps](#24-objects-as-maps)
- [25. Quick API Reference](#25-quick-api-reference)
- [26. What Has Already Been Covered](#26-what-has-already-been-covered)
- [27. What Is Still Missing](#27-what-is-still-missing)
- [28. Practice Checklist](#28-practice-checklist)

---

## 1. The Core Mental Model

An object is a mutable collection of properties.

A property has:

- a property key
- a property value or getter/setter pair
- attributes such as `writable`, `enumerable`, and `configurable`

An object also has an internal prototype link:

```txt
object ---> prototype ---> prototype ---> null
```

When JavaScript reads a property, it first checks the object itself. If the property is not found, it walks up the prototype chain.

```js
const proto = { inheritedProp: 1 };
const obj = Object.create(proto);

obj.ownProp = 2;

console.log(obj.ownProp);       // 2
console.log(obj.inheritedProp); // 1
```

Operational model:

```txt
Read obj.inheritedProp
1. Check obj itself.
2. Not found.
3. Check Object.getPrototypeOf(obj).
4. Found inheritedProp.
5. Return 1.
```

---

## 2. Object Creation

### 2.1 Object literal

```js
const user = {
  name: "Alice",
  age: 20,
};
```

This is the most common way to create ordinary objects.

### 2.2 Object constructor

```js
const obj = new Object();
obj.name = "Alice";
```

This works, but object literals are clearer in normal code.

### 2.3 Object.create

```js
const proto = {
  type: "animal",
};

const dog = Object.create(proto);
dog.name = "Lucky";

console.log(dog.name); // "Lucky"
console.log(dog.type); // "animal"
```

`Object.create(proto)` creates a new object whose prototype is `proto`.

---

## 3. Property Access

There are two main forms:

```js
object.property
object[expression]
```

### Dot notation

```js
const car = {
  color: "red",
  engine: {
    cylinder: 4,
  },
};

console.log(car.color);
console.log(car.engine.cylinder);
```

Use dot notation when the property name is a fixed valid identifier.

### Bracket notation

```js
const key = "color";
const car = { color: "red" };

console.log(car[key]); // "red"
```

Use bracket notation when the property name is computed at runtime.

---

## 4. Dynamic Property Names

Dynamic property access is central to object programming.

```js
const portfolio = {};

function addStock(portfolio, stockName, shares) {
  portfolio[stockName] = shares;
}

addStock(portfolio, "AAPL", 10);
addStock(portfolio, "TSLA", 5);

console.log(portfolio);
```

Output:

```txt
{ AAPL: 10, TSLA: 5 }
```

The key point:

```js
portfolio[stockName]
```

means:

```txt
1. Read the value stored in stockName.
2. Use that value as the property key.
```

It does not mean:

```txt
Access a property literally named "stockName".
```

### Computed property names in object literals

```js
const key1 = "p1";
function key2() {
  return "p2";
}

const obj = {
  [key1]: 1,
  [key2()]: 2,
};

console.log(obj.p1 + obj.p2); // 3
```

---

## 5. Object References and Equality

Objects are compared by reference identity, not by property content.

```js
const a = { x: 1 };
const b = { x: 1 };
const c = a;

console.log(a === b); // false
console.log(a === c); // true
```

`a` and `b` look the same, but they are two different objects in memory.

`c` points to the same object as `a`, so `a === c` is `true`.

### Mutation through shared references

```js
const weather = { name: "hurricane" };
const anotherWeather = weather;

weather.name = "shower";

console.log(anotherWeather.name); // "shower"
```

Both variables point to the same object.

---

## 6. Deleting Properties

`delete` removes an own property from an object.

```js
const book = {
  title: "JavaScript Guide",
  subtitle: "Objects",
};

delete book.subtitle;

console.log(book);
```

Output:

```txt
{ title: "JavaScript Guide" }
```

### Important: delete does not delete inherited properties

```js
const proto = { x: 1 };
const obj = Object.create(proto);

console.log(obj.x); // 1

delete obj.x;

console.log(obj.x); // 1
```

There was no own `x` on `obj`, so `delete obj.x` does not remove `proto.x`.

### `in` vs own property check

```js
const obj = {};

console.log("toString" in obj); // true
console.log(Object.hasOwn(obj, "toString")); // false
```

`in` checks the whole prototype chain.

`Object.hasOwn()` checks only the object itself.

---

## 7. Own Properties vs Inherited Properties

```js
const proto = { inheritedProp: 1 };

const obj = Object.create(proto);
obj.ownProp = 2;

console.log(Object.hasOwn(obj, "ownProp"));       // true
console.log(Object.hasOwn(obj, "inheritedProp")); // false

console.log("inheritedProp" in obj);              // true
```

Key distinction:

```txt
Own property: stored directly on the object.
Inherited property: found through the prototype chain.
```

This distinction matters for:

- enumeration
- copying
- mutation
- debugging unexpected property reads

---

## 8. Enumerability and Property Listing

Properties can be enumerable or non-enumerable.

Enumerable properties are usually the ones you expect to see during ordinary object iteration.

### for...in

```js
const proto = { inheritedProp: 1 };
const obj = Object.create(proto);
obj.ownProp = 2;

for (const key in obj) {
  console.log(key);
}
```

Output:

```txt
ownProp
inheritedProp
```

`for...in` visits enumerable string-keyed properties, including inherited ones.

To keep only own properties:

```js
for (const key in obj) {
  if (Object.hasOwn(obj, key)) {
    console.log(key);
  }
}
```

### Object.keys

```js
const obj = { a: 1, b: 2 };

console.log(Object.keys(obj)); // ["a", "b"]
```

`Object.keys()` returns own enumerable string keys only.

### Object.getOwnPropertyNames

```js
const obj = {};

Object.defineProperty(obj, "hidden", {
  value: 1,
  enumerable: false,
});

console.log(Object.keys(obj));
console.log(Object.getOwnPropertyNames(obj));
```

Output:

```txt
[]
["hidden"]
```

### Object.getOwnPropertySymbols

```js
const s = Symbol("id");
const obj = {
  name: "Alice",
  [s]: 123,
};

console.log(Object.keys(obj));
console.log(Object.getOwnPropertySymbols(obj));
```

Output:

```txt
["name"]
[Symbol(id)]
```

### Reflect.ownKeys

```js
const s = Symbol("id");
const obj = {
  name: "Alice",
  [s]: 123,
};

Object.defineProperty(obj, "hidden", {
  value: "secret",
  enumerable: false,
});

console.log(Reflect.ownKeys(obj));
```

`Reflect.ownKeys()` returns own string keys and symbol keys, including non-enumerable ones.

### Property listing summary

| API | Own only | Inherited | Enumerable only | String keys | Symbol keys |
|---|---:|---:|---:|---:|---:|
| `for...in` | No | Yes | Yes | Yes | No |
| `Object.keys()` | Yes | No | Yes | Yes | No |
| `Object.values()` | Yes | No | Yes | Yes | No |
| `Object.entries()` | Yes | No | Yes | Yes | No |
| `Object.getOwnPropertyNames()` | Yes | No | No | Yes | No |
| `Object.getOwnPropertySymbols()` | Yes | No | No | No | Yes |
| `Reflect.ownKeys()` | Yes | No | No | Yes | Yes |

---

## 9. Property Descriptors

A property descriptor describes how a property behaves.

### Data property descriptor

```js
const obj = {};

Object.defineProperty(obj, "x", {
  value: 10,
  writable: false,
  enumerable: true,
  configurable: false,
});

console.log(obj.x); // 10
```

Descriptor fields:

| Field | Meaning |
|---|---|
| `value` | The stored value |
| `writable` | Whether assignment can change the value |
| `enumerable` | Whether it appears in `Object.keys()` and `for...in` |
| `configurable` | Whether the property can be deleted or reconfigured |

### Writable

```js
const obj = {};

Object.defineProperty(obj, "x", {
  value: 10,
  writable: false,
});

obj.x = 20;

console.log(obj.x); // 10
```

If `writable` is `false`, assignment does not change the value. In strict mode, it can throw a TypeError.

### Enumerable

```js
const obj = {};

Object.defineProperty(obj, "x", {
  value: 10,
  enumerable: false,
});

console.log(Object.keys(obj)); // []
console.log(obj.x);            // 10
```

The property still exists, but normal enumeration skips it.

### Configurable

```js
const obj = {};

Object.defineProperty(obj, "x", {
  value: 10,
  configurable: false,
});

delete obj.x;

console.log(obj.x); // 10
```

If `configurable` is `false`, the property cannot be deleted.

---

## 10. Data Properties vs Accessor Properties

There are two major kinds of properties.

### Data property

A data property stores a value directly.

```js
const obj = {
  dataProp: 5,
};

console.log(obj.dataProp); // 5
```

Descriptor shape:

```js
{
  value: 5,
  writable: true,
  enumerable: true,
  configurable: true
}
```

### Accessor property

An accessor property uses getter/setter functions instead of directly storing a value.

```js
const obj = {
  _value: 10,

  get accessProp() {
    return this._value;
  },

  set accessProp(value) {
    this._value = value;
  },
};

console.log(obj.accessProp); // 10
obj.accessProp = 30;
console.log(obj._value);     // 30
```

Descriptor shape:

```js
{
  get: function,
  set: function,
  enumerable: true,
  configurable: true
}
```

A property cannot be both a data property and an accessor property at the same time.

---

## 11. Getters and Setters

Getters and setters look like property access from the outside, but execute functions internally.

```js
const serialNum = {
  _n: 0,

  get next() {
    return this._n++;
  },

  set next(n) {
    if (n > this._n) {
      this._n = n;
    } else {
      throw new Error("serial number can only be set to a larger value");
    }
  },
};

serialNum.next = 10;

console.log(serialNum.next); // 10
console.log(serialNum.next); // 11
```

Important points:

```txt
serialNum.next reads through the getter.
serialNum.next = 10 writes through the setter.
serialNum._n stores the actual internal state.
```

### Getter/setter are not normal methods

Wrong:

```js
// serialNum.next();
```

Correct:

```js
serialNum.next;
serialNum.next = 20;
```

---

## 12. Object.assign and Spread

### Object.assign

```js
const target = { a: 1 };
const source = { b: 2 };

const result = Object.assign(target, source);

console.log(target);          // { a: 1, b: 2 }
console.log(result === target); // true
```

`Object.assign(target, source)` copies enumerable own properties from source objects into the target object.

It returns the target object.

### Avoid mutating source defaults

```js
const defaults = { color: "black", size: "M" };
const options = { size: "L" };

const result = Object.assign({}, defaults, options);

console.log(result); // { color: "black", size: "L" }
```

Use `{}` as the target when you want a new object.

### Spread syntax

```js
const position = { x: 0, y: 0 };
const dimensions = { width: 100, height: 75 };

const rect = { ...position, ...dimensions };

console.log(rect);
```

Spread is concise and common in React.

### Last source wins

```js
const result = {
  color: "black",
  size: "M",
  size: "L",
};

console.log(result.size); // "L"
```

For `Object.assign()` and object spread, later properties override earlier properties with the same key.

### Important accessor behavior

`Object.assign()` copies values, not property definitions.

```js
const source = {
  get x() {
    return 42;
  },
};

const target = {};

Object.assign(target, source);

console.log(Object.getOwnPropertyDescriptor(target, "x"));
```

The getter runs and its return value is copied as a data property.

To copy descriptors:

```js
const source = {
  get x() {
    return 42;
  },
};

const target = {};

Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));

console.log(Object.getOwnPropertyDescriptor(target, "x"));
```

---

## 13. Shallow Copy vs Deep Copy

### Shallow copy

```js
const original = {
  name: "A",
  nested: {
    count: 1,
  },
};

const copy = { ...original };

console.log(copy === original);              // false
console.log(copy.nested === original.nested); // true

copy.nested.count = 99;

console.log(original.nested.count); // 99
```

The outer object is copied, but nested objects are shared by reference.

### Deep copy with structuredClone

```js
const original = {
  name: "A",
  nested: {
    count: 1,
  },
};

const copy = structuredClone(original);

console.log(copy === original);              // false
console.log(copy.nested === original.nested); // false

copy.nested.count = 99;

console.log(original.nested.count); // 1
```

`structuredClone()` creates a deep copy for many built-in data structures, but it does not clone functions and does not preserve all custom prototype behavior the way an object system clone might.

---

## 14. Object Mutation Control

JavaScript provides methods to restrict object mutation.

### Object.preventExtensions

```js
const obj = { x: 1 };

Object.preventExtensions(obj);

obj.y = 2;

console.log(obj); // { x: 1 }
```

Prevents adding new properties.

Existing properties can still be modified or deleted unless their descriptors prevent that.

### Object.seal

```js
const obj = { x: 1 };

Object.seal(obj);

delete obj.x;
obj.x = 2;

console.log(obj); // { x: 2 }
```

`Object.seal()` prevents adding and deleting properties, but writable properties can still be changed.

### Object.freeze

```js
const obj = { x: 1 };

Object.freeze(obj);

obj.x = 2;

console.log(obj); // { x: 1 }
```

`Object.freeze()` prevents adding, deleting, and changing existing data properties.

Important: `freeze()` is shallow.

```js
const obj = {
  nested: { x: 1 },
};

Object.freeze(obj);

obj.nested.x = 2;

console.log(obj.nested.x); // 2
```

The outer object is frozen, but `nested` is still mutable unless it is also frozen.

---

## 15. Prototype Chain

Every ordinary object has a prototype.

```js
const proto = { protoProp: "from proto" };
const obj = Object.create(proto);

obj.ownProp = "from obj";

console.log(Object.getPrototypeOf(obj) === proto); // true
console.log(proto.isPrototypeOf(obj));             // true
console.log(obj.protoProp);                        // "from proto"
console.log(obj.ownProp);                          // "from obj"
```

Property read model:

```txt
Read obj.protoProp
1. Check obj.
2. Not found.
3. Check proto.
4. Found.
5. Return "from proto".
```

Property write model:

```js
const proto = { x: 1 };
const obj = Object.create(proto);

obj.x = 2;

console.log(obj.x);     // 2
console.log(proto.x);   // 1
console.log(Object.hasOwn(obj, "x")); // true
```

Assignment usually creates or updates an own property on the receiver. It does not normally modify the prototype property.

---

## 16. Object.create

`Object.create(proto)` is the clearest way to create a specific prototype chain manually.

```js
const animalProto = {
  type: "animal",
  displayType() {
    console.log(this.type);
  },
};

const fish = Object.create(animalProto);
fish.type = "fish";

fish.displayType(); // "fish"
```

`fish` does not own `displayType`. It inherits it from `animalProto`.

```js
console.log(Object.hasOwn(fish, "displayType")); // false
console.log("displayType" in fish);              // true
```

---

## 17. Constructor Functions and Prototype Methods

Constructor functions create objects intended to share methods through a prototype.

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

Car.prototype.getInfo = function () {
  return `${this.make} ${this.model} ${this.year}`;
};

const car = new Car("Tesla", "Model-Y", 2025);

console.log(car.getInfo());
```

Operational model:

```txt
new Car(...)
1. Creates a new object.
2. Sets the new object's prototype to Car.prototype.
3. Calls Car with this bound to the new object.
4. Initializes own properties on this.
5. Returns the new object unless the constructor explicitly returns another object.
```

Why methods go on the prototype:

```txt
If every instance gets its own copy of the method, memory is wasted.
If the method is placed on Car.prototype, all instances share one method.
```

---

## 18. The `new` Operator

Given this constructor:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  return this.name;
};

const alice = new Person("Alice");
```

JavaScript does this conceptually:

```js
const temp = Object.create(Person.prototype);
Person.call(temp, "Alice");
const alice = temp;
```

This is why:

```js
console.log(Object.getPrototypeOf(alice) === Person.prototype); // true
console.log(alice.sayName());                                  // "Alice"
```

---

## 19. `this` Binding

`this` is not determined by where a function is defined. For ordinary functions, it is mainly determined by how the function is called.

### Method call

```js
const user = {
  name: "Alice",
  say() {
    return this.name;
  },
};

console.log(user.say()); // "Alice"
```

Call expression:

```js
user.say()
```

makes `this` inside `say` refer to `user`.

### Same function, different receiver

```js
function say() {
  return this.name;
}

const user = { name: "Alice", say };
const admin = { name: "Bob", say };

console.log(user.say());  // "Alice"
console.log(admin.say()); // "Bob"
```

The same function can have different `this` values depending on the call site.

### Detached function call

```js
"use strict";

const user = {
  name: "Alice",
  say() {
    return this.name;
  },
};

const fn = user.say;

console.log(fn());
```

In strict mode, `this` is `undefined` in a plain function call, so this can throw an error.

Reason:

```txt
user.say() preserves the receiver user.
fn() has no receiver object.
```

---

## 20. Arrow Functions and `this`

Arrow functions do not have their own `this`.

```js
const obj = {
  x: 10,

  normal() {
    return this.x;
  },

  arrow: () => {
    return this.x;
  },
};

console.log(obj.normal());
console.log(obj.arrow());
```

`normal()` is a method call, so `this === obj`.

`arrow` does not bind `this` to `obj`; it uses `this` from the surrounding lexical scope.

### Correct use of arrow function inside a method

```js
const obj = {
  x: 10,

  normal() {
    const inner = () => this.x;
    return inner();
  },
};

console.log(obj.normal()); // 10
```

Here the arrow function captures the `this` of `normal()`.

---

## 21. call, apply, and bind

These methods explicitly control `this`.

### call

```js
function show(prefix, suffix) {
  return `${prefix}${this.name}${suffix}`;
}

const user = { name: "Alice" };

console.log(show.call(user, "[", "]")); // "[Alice]"
```

`call(thisArg, arg1, arg2, ...)`

### apply

```js
function show(prefix, suffix) {
  return `${prefix}${this.name}${suffix}`;
}

const user = { name: "Alice" };

console.log(show.apply(user, ["<", ">"])); // "<Alice>"
```

`apply(thisArg, argsArray)`

### bind

```js
function show(prefix, suffix) {
  return `${prefix}${this.name}${suffix}`;
}

const user = { name: "Alice" };

const bound = show.bind(user, "(");

console.log(bound(")")); // "(Alice)"
```

`bind()` does not call the function immediately. It returns a new function with fixed `this` and optionally pre-filled arguments.

---

## 22. Symbol Keys

Symbols can be used as property keys.

```js
const id = Symbol("id");

const user = {
  name: "Alice",
  [id]: 123,
};

console.log(user.name); // "Alice"
console.log(user[id]);  // 123
```

Symbol keys are not returned by `Object.keys()`.

```js
console.log(Object.keys(user));
console.log(Object.getOwnPropertySymbols(user));
console.log(Reflect.ownKeys(user));
```

Output:

```txt
["name"]
[Symbol(id)]
["name", Symbol(id)]
```

Use symbol keys when you need property keys that avoid accidental name collisions.

---

## 23. JSON and toJSON

`JSON.stringify()` checks whether an object has a `toJSON()` method.

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toJSON = function () {
  return `(${this.x}, ${this.y})`;
};

const p = new Point(1, 2);

console.log(JSON.stringify(p));
```

Output:

```txt
"(1, 2)"
```

Key idea:

```txt
JSON.stringify(value) uses value.toJSON() when it exists.
```

This lets an object control how it is serialized.

---

## 24. Objects as Maps

Objects can be used as associative arrays:

```js
const customer = {
  address0: "Street 0",
  address1: "Street 1",
  address2: "Street 2",
  address3: "Street 3",
};

let addressText = "";

for (let i = 0; i < 4; i++) {
  addressText += customer[`address${i}`] + "\n";
}

console.log(addressText);
```

But modern JavaScript also has `Map`, which is often better when keys are not naturally property names.

Use plain objects for records:

```js
const user = {
  id: 1,
  name: "Alice",
};
```

Use `Map` for dictionary-like data with arbitrary keys:

```js
const map = new Map();

map.set("Alice", 3);
map.set("Bob", 2);

console.log(map.get("Alice")); // 3
```

---

## 25. Quick API Reference

### Creation and prototype

| API | Meaning |
|---|---|
| `{}` | Create ordinary object |
| `Object.create(proto)` | Create object with specific prototype |
| `Object.getPrototypeOf(obj)` | Read prototype |
| `Object.setPrototypeOf(obj, proto)` | Change prototype; avoid in performance-sensitive code |
| `proto.isPrototypeOf(obj)` | Check prototype chain |

### Own property checks

| API | Meaning |
|---|---|
| `Object.hasOwn(obj, key)` | Check own property |
| `key in obj` | Check own or inherited property |
| `obj.propertyIsEnumerable(key)` | Check own enumerable property |

### Enumeration

| API | Meaning |
|---|---|
| `Object.keys(obj)` | Own enumerable string keys |
| `Object.values(obj)` | Own enumerable string values |
| `Object.entries(obj)` | Own enumerable string key-value pairs |
| `Object.getOwnPropertyNames(obj)` | Own string keys, including non-enumerable |
| `Object.getOwnPropertySymbols(obj)` | Own symbol keys |
| `Reflect.ownKeys(obj)` | Own string and symbol keys, enumerable or not |
| `for...in` | Enumerable string keys, including inherited |

### Descriptors

| API | Meaning |
|---|---|
| `Object.defineProperty(obj, key, descriptor)` | Define one property with attributes |
| `Object.defineProperties(obj, descriptors)` | Define many properties |
| `Object.getOwnPropertyDescriptor(obj, key)` | Inspect one descriptor |
| `Object.getOwnPropertyDescriptors(obj)` | Inspect all own descriptors |

### Copying and merging

| API | Meaning |
|---|---|
| `Object.assign(target, ...sources)` | Copy enumerable own values into target |
| `{ ...obj }` | Shallow-copy enumerable own properties |
| `structuredClone(obj)` | Deep clone many structured data values |

### Mutation control

| API | Can add? | Can delete? | Can write existing? |
|---|---:|---:|---:|
| `Object.preventExtensions(obj)` | No | Yes | Yes |
| `Object.seal(obj)` | No | No | Yes |
| `Object.freeze(obj)` | No | No | No |

---

## 26. What Has Already Been Covered

Based on the current practice files, these topics have already been touched:

- object literals and nested property access
- dynamic keys with bracket notation
- constructor functions
- methods on `Constructor.prototype`
- `Object.create()`
- simple prototype chain reading
- `Object.getPrototypeOf()` and `isPrototypeOf()`
- `for...in`, `Object.keys()`, `Object.hasOwn()`
- own vs inherited properties
- enumerable vs non-enumerable properties
- property descriptors with `writable`, `enumerable`, `configurable`
- data properties vs accessor properties
- getters and setters
- `Object.assign()`
- spread syntax
- shallow copy vs deep copy
- `structuredClone()`
- `preventExtensions`, `seal`, `freeze`
- symbol keys
- `Reflect.ownKeys()`
- `this` in method calls
- detached method calls
- `call`, `apply`, `bind`
- arrow functions and lexical `this`
- `toJSON()` and `JSON.stringify()`

---

## 27. What Is Still Missing

This is the most important section for your next learning step.

### 27.1 The exact `new` mechanism

You have used constructor functions, but you should still explicitly practice the internal behavior of `new`:

```txt
1. Create an empty object.
2. Link it to Constructor.prototype.
3. Bind this to the new object.
4. Run the constructor body.
5. Return the object unless the constructor returns another object.
```

Practice by writing a manual `new` helper.

```js
function createInstance(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return result !== null && typeof result === "object" ? result : obj;
}
```

### 27.2 `constructor` property

Every normal function has a `prototype` object, and that prototype usually has a `constructor` property.

```js
function User(name) {
  this.name = name;
}

const user = new User("Alice");

console.log(user.constructor === User); // true
```

This works through the prototype chain.

### 27.3 `instanceof`

`instanceof` checks whether a constructor's prototype appears in an object's prototype chain.

```js
function User(name) {
  this.name = name;
}

const user = new User("Alice");

console.log(user instanceof User);   // true
console.log(user instanceof Object); // true
```

Operational model:

```txt
user instanceof User
means:
Is User.prototype somewhere in user's prototype chain?
```

### 27.4 Classes as syntax over prototypes

You should connect constructor functions to `class` syntax.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    return this.name;
  }
}

const user = new User("Alice");

console.log(user.sayName());
```

Mechanism:

```txt
Methods written in the class body are placed on User.prototype.
constructor initializes own properties.
```

### 27.5 Class inheritance and prototype inheritance

```js
class Animal {
  speak() {
    return "sound";
  }
}

class Dog extends Animal {
  speak() {
    return "woof";
  }
}

const dog = new Dog();

console.log(dog.speak());
```

Need to understand:

- `extends`
- `super()`
- method overriding
- prototype chain between classes
- why `super()` is required before using `this` in derived constructors

### 27.6 Property shadowing

```js
const proto = { x: 1 };
const obj = Object.create(proto);

obj.x = 2;

console.log(obj.x);   // 2
console.log(proto.x); // 1
```

The own property `obj.x` shadows the inherited property `proto.x`.

This is essential for understanding method overriding.

### 27.7 Accessor properties on prototypes

You have practiced getters/setters on objects, but you should also test getters/setters inherited from prototypes.

```js
const proto = {
  get value() {
    return this._value;
  },
  set value(v) {
    this._value = v;
  },
};

const obj = Object.create(proto);

obj.value = 10;

console.log(obj.value); // 10
console.log(obj._value); // 10
```

The setter is inherited, but `this` is the receiver object.

### 27.8 Object property order rules

You should still learn property enumeration order:

```txt
1. Integer-like string keys first, in ascending numeric order.
2. Other string keys next, in insertion order.
3. Symbol keys last, in insertion order.
```

Example:

```js
const obj = {
  b: 1,
  2: "two",
  a: 2,
  1: "one",
};

console.log(Object.keys(obj));
```

Expected output:

```txt
["1", "2", "b", "a"]
```

### 27.9 Object.create(null)

Objects normally inherit from `Object.prototype`.

```js
const normal = {};
console.log("toString" in normal); // true
```

A null-prototype object has no inherited `Object.prototype` methods.

```js
const dict = Object.create(null);

dict.name = "Alice";

console.log("toString" in dict); // false
```

This can be useful for dictionary-like objects, but `Map` is often cleaner.

### 27.10 Map vs Object

Objects are good for structured records.

```js
const user = {
  id: 1,
  name: "Alice",
};
```

`Map` is better for dynamic key-value collections.

```js
const scores = new Map();

scores.set("Alice", 100);
scores.set("Bob", 90);

console.log(scores.get("Alice"));
```

Need to compare:

- key types
- iteration behavior
- size tracking
- prototype pollution risk
- JSON serialization

### 27.11 Prototype mutation risk

You should know that changing prototypes after object creation is usually avoided.

```js
const obj = {};
const proto = { x: 1 };

Object.setPrototypeOf(obj, proto);
```

It works, but can hurt performance and make object behavior harder to reason about.

Prefer setting the prototype at creation time:

```js
const obj = Object.create(proto);
```

### 27.12 Prototype pollution awareness

This is more advanced, but important for real projects.

Prototype pollution happens when unsafe object merging lets user-controlled keys modify prototypes.

Dangerous keys include:

```txt
__proto__
constructor
prototype
```

You do not need to deep dive yet, but you should know this exists before writing custom deep merge utilities.

### 27.13 Deep copy limitations

You practiced `structuredClone()`, but still need to know its limits:

- functions cannot be cloned
- DOM nodes are not cloned like ordinary data
- prototype behavior may not match custom class instances as expected
- some values are transferable rather than simply copied

For front-end state data, `structuredClone()` is often useful. For class instances, be careful.

### 27.14 Descriptor-preserving copy

You touched this through `Object.getOwnPropertyDescriptors()` and `Object.defineProperties()`, but it deserves a dedicated exercise.

```js
const source = {};

Object.defineProperty(source, "x", {
  get() {
    return 42;
  },
  enumerable: true,
});

const target = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(source)
);

console.log(Object.getOwnPropertyDescriptor(target, "x"));
```

This copies the accessor definition itself, not just its current value.

### 27.15 Object extensibility checks

After learning mutation control, also learn the query methods:

```js
Object.isExtensible(obj);
Object.isSealed(obj);
Object.isFrozen(obj);
```

These let you inspect object mutation status.

---

## 28. Practice Checklist

Use this as the next exercise sequence.

### Level 1: Object basics

- Create an object with nested properties.
- Access properties with dot notation.
- Access properties with bracket notation.
- Use a computed key.
- Delete an own property.
- Compare `in` and `Object.hasOwn()`.

### Level 2: Enumeration

- Create an inherited property with `Object.create()`.
- Create a non-enumerable property with `Object.defineProperty()`.
- Compare `for...in`, `Object.keys()`, `Object.getOwnPropertyNames()`, and `Reflect.ownKeys()`.

### Level 3: Descriptors

- Create a non-writable property.
- Create a non-enumerable property.
- Create a non-configurable property.
- Inspect all of them with `Object.getOwnPropertyDescriptor()`.

### Level 4: Accessors

- Write a getter that calculates a value.
- Write a setter that validates input.
- Inspect the descriptor of the accessor property.
- Copy it with `Object.assign()` and observe what changes.
- Copy it with descriptors and compare.

### Level 5: Prototype chain

- Create a three-level prototype chain.
- Read an inherited property.
- Shadow an inherited property with an own property.
- Use `Object.getPrototypeOf()` to walk the chain.
- Use `isPrototypeOf()`.

### Level 6: Constructor and new

- Write a constructor function.
- Add methods to `Constructor.prototype`.
- Create two instances.
- Prove both instances share the same method.
- Implement a small `createInstance()` helper to simulate `new`.

### Level 7: this

- Call the same function as a method of two objects.
- Detach a method and call it.
- Use `call()`.
- Use `apply()`.
- Use `bind()`.
- Compare normal methods and arrow functions.

### Level 8: Copying

- Copy an object with spread.
- Copy an object with `Object.assign()`.
- Mutate a nested object and observe shared reference.
- Deep clone with `structuredClone()`.
- Try cloning an object with a function and observe the result.

### Level 9: Mutation control

- Use `preventExtensions()`.
- Use `seal()`.
- Use `freeze()`.
- Inspect with `isExtensible()`, `isSealed()`, and `isFrozen()`.
- Test nested objects to confirm freezing is shallow.

### Level 10: Classes bridge

- Rewrite a constructor function as a class.
- Confirm class methods live on the prototype.
- Use `extends` and `super()`.
- Compare class inheritance with `Object.create()` inheritance.

---

## Final Mental Model

Objects are not just bags of values.

A JavaScript object is:

```txt
own properties
+ property descriptors
+ prototype link
+ dynamic property access
+ this-sensitive methods
+ mutable reference identity
```

When debugging object behavior, always ask:

```txt
1. Is this property own or inherited?
2. Is it enumerable?
3. Is it a data property or accessor property?
4. What is the receiver object for this?
5. Is this copy shallow or deep?
6. Is this object extensible, sealed, or frozen?
7. Which prototype is being searched?
```

If you can answer those questions, object and prototype-chain behavior becomes predictable.
