// Goal:
// Show Infinity, -Infinity, and NaN.

// Expected output:
// Infinity
// -Infinity
// NaN
// true
// false

console.log(1 / 0);
console.log(-1 / 0);
console.log(0 / 0);
console.log(Number.isNaN(0 / 0));
console.log((0 / 0) === NaN);
