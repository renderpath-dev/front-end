const s = Symbol('meta');

const proto = { inherited: 'proto value' };

const obj = Object.create(proto);

Object.defineProperty(obj, 'hidden', {
  value: 'secret',
  enumerable: false,
});

obj.name = 'Alice';
obj[s] = { id: 1 };

Object.defineProperty(obj, 'info', {
  get() {
    return `${this.name}-${this[s].id}`;
  },
  enumerable: true,
});

console.log(obj.info); // "Alice-1"
console.log(Object.keys(obj)); // ["name", "info"]

for (const key in obj) {
  console.log('for...in:', key);
}

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(meta)]
console.log(obj.inherited); // "proto value"
