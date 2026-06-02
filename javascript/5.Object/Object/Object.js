'use strict';

// Object.js

const obj = {
  property1: 'value1',
  2: 'value2',
  propertyN: 3,
};

/** Object and properties **/
const myHonda = {
  color: 'red',
  wheels: 4,
  engine: { cylinder: 4, size: 2 },
};

/** Accessing properties **/
console.log(myHonda.color);
console.log(myHonda.engine.cylinder);

/** Simple prototype chain demo **/
const one = {};
one.property1 = 1;

const two = Object.create(one);
two.property2 = 2;

const three = Object.create(two);
three.property3 = 3;

console.log(three.property1 + three.property2); // inherited + inherited

/** Safe nested property access demo **/
const book = {
  mainTitle: 'JavaScript Guide',
  subtitle: 'Objects',
  author: {
    firstName: 'Anonymous',
    surname: 'Writer',
  },
};

let surname = undefined;

// FIX: book.author must be an object if you want book.author.surname
if (book && book.author) {
  surname = book.author.surname;
}
console.log(surname);

// IMPROVEMENT: modern concise form
const surname2 = book?.author?.surname;
console.log(surname2);

/** Deleting properties **/
delete book.subtitle;
console.log(book);

// FIX: never try to delete Object.prototype in learning code
// delete Object.prototype; // BAD EXAMPLE

// FIX: deleting a global binding is not a normal object-property demo
globalThis.tempValue = 1;
delete globalThis.tempValue;
console.log('tempValue' in globalThis); // false

/** Constructor function **/
function Car(make, model, year, owner = null) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}

// FIX: prototype methods must be defined once, outside the constructor
Car.prototype.getInfo = function () {
  // FIX: owner may be null / undefined
  const ownerText = this.owner ? this.owner.name : 'No owner';
  return `${this.make} ${this.model} ${this.year} ${ownerText}`;
};

const myCar = new Car('Tesla', 'Model-Y', 2025);
console.log(myCar.model);

const alternateCar = new Car('BMW', '3', 2026);
console.log(alternateCar.make);

const randCar = new Car('Nissan', '300ZX', 1992);
const kenCar = new Car('Mazda', 'Miata', 1990);
console.log(kenCar.make);
console.log(randCar.year);

/** Person objects **/
function Person(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
}

const rand = new Person('Rand McKinnon', 33, 'M');
const ken = new Person('Ken Jones', 39, 'M');
console.log(ken.gender);

const car1 = new Car('Eagle', 'Talon TSi', 1993, rand);
const car2 = new Car('Nissan', '300ZX', 1992, ken);
console.log(car1.owner.age);
console.log(car2.owner.name);
console.log(myCar.getInfo());
console.log(car1.getInfo());

/** Object.create() **/
const animalProto = {
  type: 'Invertebrates',
  displayType() {
    console.log(this.type);
  },
};

const animal = Object.create(animalProto);
animal.displayType();

const fish = Object.create(animalProto);
fish.type = 'Fishes';
fish.displayType();

/** Objects as associative arrays **/
const customer = {
  address0: 'Street 0',
  address1: 'Street 1',
  address2: 'Street 2',
  address3: 'Street 3',
};

let addr = '';
for (let i = 0; i < 4; i++) {
  addr += customer[`address${i}`] + '\n';
}
console.log(addr);

/** Dynamic keys **/
function addStock(portfolio, stockName, shares) {
  portfolio[stockName] = shares;
}

// TODO: getQuote is intentionally external; define it before calling computeValue
function getQuote(stock) {
  const prices = {
    AAPL: 180,
    TSLA: 170,
    MSFT: 420,
  };

  return prices[stock] ?? 0;
}
function computeValue(portfolio) {
  let total = 0.0;
  for (const stock in portfolio) {
    const shares = portfolio[stock];
    const price = getQuote(stock);
    // FIX: accumulate total, do not overwrite total each loop
    total += shares * price;
  }
  return total;
}
console.log(computeValue());

//toJSON()
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toJSON = function () {
  return `(${this.x}, ${this.y})`;
};

const p = new Point(1, 2);

console.log(JSON.stringify(p));

const PROPERTY_NAME = "p1";
function computePropertyName() {return "p" + 2}
const propertyName = {
  [PROPERTY_NAME]: 1,
  [computePropertyName()]: 2,
}
console.log(propertyName.p1 + propertyName.p2);

//Symbols as Property Names
const extensions = Symbol("my extension symbol");
const o = {
  [extensions]: {
    /* Extended data is stored in this object. */
  }
};
o[extensions].x = 0;

// ... Spread Operator
const position = {x:0,y:0};
const dimensions = {width:100,height:75};
const rect = {...position,...dimensions};
console.log(rect.x + rect.y + rect.width + rect.height);


//Abbreviation Methods
const METHOD_NAME = "m";
const symbol = Symbol();
const weirdMethods = {
  "method with Spaces"(x) {return x + 10},
  [METHOD_NAME](x) {return x + 12},
  [symbol](x) {return x + 30}
}
console.log(weirdMethods["method with Spaces"](20));
console.log(weirdMethods[METHOD_NAME](15));
console.log(weirdMethods[symbol](100));

/** Methods for Getting and Setting Properties **/
const ordinary = {
  dataProp: 0,
  get accessProp() {
    return this.dataProp + 5;
  },
  set accessProp(value) {
    this.dataProp = value;
  },
};
ordinary.accessProp = 35;
console.log(ordinary.dataProp);
console.log(ordinary.accessProp);

const point = {
  x:10,
  y:20,
  get r() {return Math.hypot(this.x,this.y)},
  set r(newValue) {
    const oldValue = Math.hypot(this.x,this.y);
    const ratio = newValue / oldValue;
    this.x *= ratio;
    this.y *= ratio;
  },

  get theta() {return Math.atan2(this.y, this.x)}
};
console.log(point.r);
console.log(point.theta);


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
  }
};

serialNum.next = 10;
console.log(serialNum.next); // 10
console.log(serialNum.next); // 11




