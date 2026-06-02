// Goal:
// Compare primitive values and object values.

// Expected output:
// number
// string
// boolean
// undefined
// object
// symbol
// bigint
// object
// function

const productPrice = 99;
const productTitle = 'Keyboard';
const isAvailable = true;
let selectedVariant;
const emptySelection = null;
const productToken = Symbol('product');
const orderId = 9007199254740993n;
const productRecord = { id: 'p1' };
const calculateTotal = function calculateTotal() {
  return productPrice;
};

console.log(typeof productPrice);
console.log(typeof productTitle);
console.log(typeof isAvailable);
console.log(typeof selectedVariant);
console.log(typeof emptySelection);
console.log(typeof productToken);
console.log(typeof orderId);
console.log(typeof productRecord);
console.log(typeof calculateTotal);
