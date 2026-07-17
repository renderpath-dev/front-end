// Goal:
// Compare strict equality, loose equality, relational comparison, in, and instanceof.

const quantityText = "5";
const quantityNumber = 5;
const productRecord = { name: "Lamp", stock: 0 };
const productList = ["Lamp"];

console.log(quantityText === quantityNumber);
console.log(quantityText == quantityNumber);
console.log("12" < "3");
console.log(Number("12") < Number("3"));
console.log("stock" in productRecord);
console.log("toString" in productRecord);
console.log(Object.hasOwn(productRecord, "toString"));
console.log(productList instanceof Array);
