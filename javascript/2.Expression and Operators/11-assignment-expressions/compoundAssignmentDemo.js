// Goal:
// Verify assignment values, compound assignment, and destructuring assignment.

let availableStock = 10;
let reservedStock = 0;
const inventoryRecord = { sku: "A100", count: 5 };

const assignedValue = (reservedStock = 3);
availableStock -= reservedStock;
inventoryRecord.count += 2;

let firstSku;
let secondSku;
[firstSku, secondSku] = ["A100", "B200"];

console.log(assignedValue);
console.log(reservedStock);
console.log(availableStock);
console.log(inventoryRecord.count);
console.log(firstSku);
console.log(secondSku);
