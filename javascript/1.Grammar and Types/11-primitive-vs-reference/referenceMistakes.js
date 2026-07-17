// Goal:
// Show that object equality compares references.

// Expected output:
// false
// true

const firstProduct = { id: "p1" };
const secondProduct = { id: "p1" };
const sameProductReference = firstProduct;

console.log(firstProduct === secondProduct);
console.log(firstProduct === sameProductReference);
