// Goal:
// Show a classic loose equality conversion trap.

// Expected output:
// true
// true
// false

console.log([] == false);
console.log(Number([]) === 0);
console.log(Boolean([]));
