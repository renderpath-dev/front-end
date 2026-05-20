const a = { x: 1 };
const b = { x: 1 };
const c = a;

console.log(a === b); // false
console.log(a === c); // true

const obj = {
  nested: { y: 2 },
};

const copy = { ...obj };

console.log(copy === obj); // false
console.log(copy.nested === obj.nested); // true
