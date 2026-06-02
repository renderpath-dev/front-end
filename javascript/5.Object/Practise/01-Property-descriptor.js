const obj = {};

Object.defineProperty(obj, 'x', {
  value: 10,
  writable: false,
  enumerable: true,
  configurable: false,
});

console.log(obj.x); // 10

obj.x = 20;
console.log(obj.x); // still 10

console.log(Object.keys(obj)); // ["x"]

delete obj.x;
console.log(obj.x); // still 10

console.log(Object.getOwnPropertyDescriptor(obj, 'x'));
