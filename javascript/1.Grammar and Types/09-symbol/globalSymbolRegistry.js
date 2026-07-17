// Goal:
// Compare Symbol() with Symbol.for().

// Expected output:
// false
// true
// shared.product

const firstLocal = Symbol("shared.product");
const secondLocal = Symbol("shared.product");
const firstGlobal = Symbol.for("shared.product");
const secondGlobal = Symbol.for("shared.product");

console.log(firstLocal === secondLocal);
console.log(firstGlobal === secondGlobal);
console.log(Symbol.keyFor(firstGlobal));
