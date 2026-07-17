// Goal:
// Verify that function expressions create callable values.

const formatCartLine = function (productName, quantity) {
  return `${productName} x ${quantity}`;
};

const calculateLineTotal = (unitPrice, quantity) => unitPrice * quantity;

const formatterReference = formatCartLine;

console.log(formatterReference("Mouse", 2));
console.log(calculateLineTotal(25, 2));
console.log(typeof formatCartLine);
console.log(formatCartLine === formatterReference);
