// Goal:
// Verify property lookup through the prototype chain and own-property shadowing.

const productDefaults = {
  taxRate: 0.08,
  currency: "USD",
};

const checkoutLine = Object.create(productDefaults);
checkoutLine.unitPrice = 100;

console.log(checkoutLine.taxRate);
console.log(Object.hasOwn(checkoutLine, "taxRate"));

checkoutLine.taxRate = 0.1;

console.log(checkoutLine.taxRate);
console.log(productDefaults.taxRate);
console.log(Object.hasOwn(checkoutLine, "taxRate"));
