// Goal:
// Compare dot access and bracket access for static and dynamic property names.

const productMetric = {
  sku: "KB-501",
  "stock-count": 14,
  restockDate: "2026-06-10",
};

const selectedField = "restockDate";

console.log(productMetric.sku);
console.log(productMetric["stock-count"]);
console.log(productMetric[selectedField]);
console.log(productMetric.selectedField);
