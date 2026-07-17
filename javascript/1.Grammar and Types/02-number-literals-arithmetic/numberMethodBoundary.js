// Goal:
// Check finite numbers, integers, and safe integers.

// Expected output:
// true
// false
// true
// false
// true
// false

console.log(Number.isFinite(12));
console.log(Number.isFinite(Infinity));
console.log(Number.isInteger(12));
console.log(Number.isInteger(12.5));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1));
