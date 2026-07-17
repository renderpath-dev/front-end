// Goal:
// Show how || can incorrectly replace valid falsy values.

const productStock = 0;
const searchTerm = "";

console.log(productStock || 100);
console.log(productStock ?? 100);
console.log(searchTerm || "all");
console.log(searchTerm ?? "all");
