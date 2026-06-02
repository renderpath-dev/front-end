"use strict";

// Enumerating Properties.js

const myTesla = {
  color: "black",
  model: "Model-Y",
  year: 2026,
};

/** for...in + Object.hasOwn **/
function showProps(obj, objName) {
  let result = "";

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      result += `${objName}.${key} = ${obj[key]}\n`;
    }
  }

  console.log(result);
}

/** Object.keys **/
function displayProps(obj, objName) {
  let result = "";

  Object.keys(obj).forEach((key) => {
    result += `${objName}.${key} = ${obj[key]}\n`;
  });

  console.log(result);
}

showProps(myTesla, "myTesla");
displayProps(myTesla, "myTesla");

/** List all own property names across the prototype chain **/
function listAllProperties(obj) {
  let objectToInspect = obj;
  const result = [];

  while (objectToInspect !== null) {
    result.push(...Object.getOwnPropertyNames(objectToInspect));
    objectToInspect = Object.getPrototypeOf(objectToInspect);
  }

  return result;
}

// FIX: print the returned result, otherwise the function call demonstrates nothing
console.log(listAllProperties(myTesla));

// IMPROVEMENT: deduplicate names if you want a cleaner list
function listUniqueProperties(obj) {
  return [...new Set(listAllProperties(obj))];
}

console.log(listUniqueProperties(myTesla));

/** Deleting properties **/
const weather = {
  highPressure: 38,
  shower: 15,
  hurricane: 21,
  hail: -10,
};

delete weather.highPressure;
console.log("highPressure" in weather); // false

// IMPROVEMENT: compare "in" vs Object.hasOwn
console.log("toString" in weather); // true, inherited from Object.prototype
console.log(Object.hasOwn(weather, "toString")); // false

const testEnumElement = {
  testElement1: 10,
  testElement2: 15,
  testElement3: 16,
};
console.log(testEnumElement.propertyIsEnumerable("toString")); // => false
for (let p in testEnumElement) {
  if (!testEnumElement.hasOwnProperty(p)) continue;
  if (typeof testEnumElement[p] === "function") continue;
  console.log(p);
}


/** Object Merging / Property Copying / Extending Objects **/
const target = {target : 1};
const source = {source : 100,source1 : 200};
Object.assign(target, source);
console.log(target);

const color1 = {blue:"#4287f5"}
const color2 = { yellow: '#f5da42' };
const result = Object.assign(color1, color2);

console.log(color1);
console.log(result);
console.log(color1 === result)

//multiple object
const final = {finalProp:15};
const initial = {initialProp:30,initialValue:100};
const start = {startProp:80,startValue:60};

Object.assign(final,initial,start);
console.log(final);


const defaults = { color: "black", size: "M" };
const o = { size: "L" };

const finalResult = Object.assign({}, defaults, o);

console.log(finalResult); // { color: "black", size: "L" }


/** getter/setter **/
const source1 = {
  get x() {
    console.log('source getter runs');
    return 99;
  },
};

const target1 = {
  set x(value) {
    console.log('target setter runs:', value);
  },
};

Object.assign(target1, source1);
console.log(Object.getOwnPropertyDescriptor(source1, 'x'));
console.log(Object.getOwnPropertyDescriptor(target1, 'x'));

//Object.assign() -> Copies values
//Object.getOwnPropertyDescriptors + Object.defineProperties() -> Copies property definitions
const source2 = {
  get x() {
    return 42;
  },
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source2));

console.log(Object.getOwnPropertyDescriptor(target2, 'x'));


//shallowCopy
const user = {
  name: 'Alice',
  profile: {
    age: 20,
  },
};
const copy = Object.assign({}, user);
console.log(copy === user); // false
console.log(copy.profile === user.profile); // true
copy.profile.age = 30;
console.log(user.profile.age); // 30


//deepCopy
const user1 = {
  name: "Alice",
  profile: {
    age: 20,
    city: "Beijing"
  }
};
const deepCopy = structuredClone(user1);
console.log(deepCopy === user1); // false
console.log(deepCopy.profile === user1.profile); // false
deepCopy.profile.age = 30;
console.log(user.profile.age); // 20
console.log(deepCopy.profile.age); // 30

//Object Merging
const shopData = {color:"white", size:"XL"};
const userOptions = {size:"4XL"};

const orderDetails = Object.assign({}, shopData, userOptions);
console.log(orderDetails);

const state = {
  user: {
    profile: {
      age : 20
    }
  }
};
const nextState = {...state};
nextState.user.profile.age = 30;
console.log(state.user.profile.age); //30


function merge(target,...sources){
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      if (!Object.hasOwn(target, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
Object.assign({x:1},{x:2,y:2},{y:3,z:4});
console.log(merge({x:1},{x:2,y:2},{y:3,z:4}));

/** shallowCopy & deepCopy Comparison **/
//shallowCopy
const obj = {
  a: 1,
  nested: { b: 2 }
};

const copyFrom = { ...obj };

copyFrom.nested.b = 100;

console.log(obj.nested.b); // 100


//deepCopy
const obj2 = {
  a: 1,
  nested: { b: 2 }
};

const copy2 = structuredClone(obj2);

copy2.nested.b = 100;

console.log(obj2.nested.b); // 2





