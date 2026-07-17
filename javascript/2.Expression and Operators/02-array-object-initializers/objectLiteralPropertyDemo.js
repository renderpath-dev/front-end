// Goal:
// Verify shorthand properties and computed property names.

const productName = "Monitor";
const statusKey = "availability";

const productRecord = {
  productName,
  [statusKey]: "in-stock",
  "stock-count": 12,
};

console.log(productRecord.productName);
console.log(productRecord.availability);
console.log(productRecord["stock-count"]);
