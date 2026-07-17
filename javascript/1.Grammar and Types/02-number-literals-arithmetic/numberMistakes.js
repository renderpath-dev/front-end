// Goal:
// Show why NaN cannot be compared with itself.

// Expected output:
// false
// true

const invalidQuantity = Number("not-a-number");

console.log(invalidQuantity === NaN);
console.log(Number.isNaN(invalidQuantity));
