// Goal:
// Compare strict equality and Object.is.

// Expected output:
// false
// true
// true
// false

console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));
console.log(0 === -0);
console.log(Object.is(0, -0));
