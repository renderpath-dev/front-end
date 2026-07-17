// Goal:
// Compare floating point values with a tolerance.

// Expected output:
// true

const calculatedTotal = 0.1 + 0.2;
const expectedTotal = 0.3;
const isCloseEnough = Math.abs(calculatedTotal - expectedTotal) < Number.EPSILON;

console.log(isCloseEnough);
