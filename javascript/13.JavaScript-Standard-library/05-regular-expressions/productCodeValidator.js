// Goal:
// Validate a product code format.

function isValidProductCode(productCodeText) {
  const productCodePattern = /^[A-Z]{3}-\d{4}$/;
  return productCodePattern.test(productCodeText);
}

console.log(isValidProductCode('ABC-1234'));
console.log(isValidProductCode('abc-1234'));
