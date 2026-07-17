// Goal:
// Show globalThis and global built-in values.

// Expected output:
// true
// true
// true
// true

console.log(globalThis.Number === Number);
console.log(globalThis.Math === Math);
console.log(globalThis.JSON === JSON);
console.log(globalThis.console === console);
