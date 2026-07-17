// Goal:
// Build a class-like object model without class syntax.

// Expected output:
// true
// 1..5
// true

const rangeMethods = {
  includes(value) {
    return this.from <= value && value <= this.to;
  },
  toString() {
    return `${this.from}..${this.to}`;
  },
};

function createRange(from, to) {
  const range = Object.create(rangeMethods);
  range.from = from;
  range.to = to;
  return range;
}

const firstRange = createRange(1, 5);
const secondRange = createRange(10, 20);

console.log(firstRange.includes(3));
console.log(firstRange.toString());
console.log(Object.getPrototypeOf(firstRange) === Object.getPrototypeOf(secondRange));
