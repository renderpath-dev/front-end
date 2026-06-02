const s = Symbol('id');

const obj = {
  name: 'Alice',
  [s]: 123,
};

console.log(obj.name); // "Alice"
console.log(obj[s]); // 123

console.log(Object.keys(obj)); // ["name"]
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(id)]
console.log(Reflect.ownKeys(obj)); // ["name", Symbol(id)]
