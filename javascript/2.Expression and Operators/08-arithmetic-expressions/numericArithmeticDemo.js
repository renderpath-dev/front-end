// Goal:
// Compare numeric arithmetic, string concatenation, increment, and BigInt arithmetic.

let pageIndex = 1;
const inputQuantity = "3";
const unitPrice = 20;

console.log(unitPrice * inputQuantity);
console.log(unitPrice + inputQuantity);
console.log(unitPrice + Number(inputQuantity));
console.log(2 ** 3);
console.log(7 % 3);
console.log(pageIndex++);
console.log(pageIndex);
console.log(1n + 2n);
