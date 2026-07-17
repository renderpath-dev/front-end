// Goal:
// Show the difference between a literal property name and a computed property name.

const fieldName = "stock";
const productRecord = {
  sku: "KB-501",
  stock: 14,
};

console.log(productRecord.fieldName);
console.log(productRecord[fieldName]);
