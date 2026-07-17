// Goal:
// Verify that array and object initializers are evaluated at runtime.

let sequenceNumber = 0;

const orderIds = [++sequenceNumber, ++sequenceNumber, ++sequenceNumber];
const customerName = "Mira";
const dynamicKey = "tier";

const customerProfile = {
  customerName,
  [dynamicKey]: "gold",
  orderCount: orderIds.length,
};

const sparseList = ["first", , "third"];

console.log(orderIds);
console.log(customerProfile);
console.log(sparseList.length);
console.log(sparseList[1]);
console.log(Object.hasOwn(sparseList, 1));
