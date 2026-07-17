// Goal:
// Show why typeof null cannot be used as the only object test.

// Expected output:
// object
// true
// false

const selectedProduct = null;

console.log(typeof selectedProduct);
console.log(selectedProduct === null);
console.log(typeof selectedProduct === "object" && selectedProduct !== null);
