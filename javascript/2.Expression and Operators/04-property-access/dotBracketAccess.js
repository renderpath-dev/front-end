// Goal:
// Compare dot access, bracket access, array index access, and optional chaining.

const productRecord = {
  productName: "Monitor",
  "stock-count": 12,
  warehouse: {
    code: "A1",
  },
};

const stockKey = "stock-count";
const featuredProducts = ["Monitor", "Keyboard"];

console.log(productRecord.productName);
console.log(productRecord[stockKey]);
console.log(featuredProducts[0]);
console.log(productRecord.warehouse?.code);
console.log(productRecord.supplier?.name);
