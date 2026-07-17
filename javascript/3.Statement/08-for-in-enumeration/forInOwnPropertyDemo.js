// Goal:
// Verify for...in enumerates property names.

const orderSummary = {
  id: "order-7",
  total: 88,
  status: "paid",
};

const entries = [];

for (const propertyName in orderSummary) {
  if (Object.hasOwn(orderSummary, propertyName)) {
    entries.push(`${propertyName}:${orderSummary[propertyName]}`);
  }
}

console.log(entries);
