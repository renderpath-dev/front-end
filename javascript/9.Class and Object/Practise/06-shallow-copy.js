const original = {
  name: 'A',
  nested: {
    count: 1,
  },
};

const copy1 = Object.assign({}, original);
const copy2 = { ...original };

console.log(copy1 === original); // false
console.log(copy1.nested === original.nested); // true
console.log(copy2.nested === original.nested); // true

copy1.nested.count = 99;
console.log(original.nested.count); // 99
