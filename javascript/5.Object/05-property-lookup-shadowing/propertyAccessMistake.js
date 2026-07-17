// Goal:
// Verify why accessing a property of undefined throws a TypeError.

const orderRecord = {
  id: "ORD-1001",
};

try {
  console.log(orderRecord.customer.name);
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(error.name);
}

console.log(orderRecord.customer?.name);
