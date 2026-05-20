const proto = { inheritedProp: 1 };

const obj = Object.create(proto);
obj.ownProp = 2;

Object.defineProperty(obj, 'hiddenProp', {
  value: 3,
  enumerable: false,
});

for (const key in obj) {
  console.log('for...in:', key);
}

console.log(Object.keys(obj)); // ["ownProp"]
console.log(Object.hasOwn(obj, 'ownProp')); // true
console.log(Object.hasOwn(obj, 'inheritedProp')); // false
console.log(obj.propertyIsEnumerable('hiddenProp')); // false
