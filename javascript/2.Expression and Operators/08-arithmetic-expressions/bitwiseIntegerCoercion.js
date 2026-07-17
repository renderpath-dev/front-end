// Goal:
// Verify that bitwise operators coerce Number values to 32-bit integers.

console.log(5.9 | 0);
console.log(-5.9 | 0);
console.log(8 & 3);
console.log(8 | 3);
console.log(~0);
