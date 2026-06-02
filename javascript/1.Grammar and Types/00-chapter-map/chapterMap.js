// Goal:
// Show the chapter map from value to binding and conversion.

// Expected output:
// number
// string
// object
// true

let inventoryCount = 12;
let inventoryLabel = '12';
const productRecord = { id: 'p1', stock: 12 };

console.log(typeof inventoryCount);
console.log(typeof inventoryLabel);
console.log(typeof productRecord);
console.log(Number(inventoryLabel) === inventoryCount);
