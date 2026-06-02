// Goal:
// Inspect structured data and timing with console APIs.

const orderRows = [
  { sku: 'KB-01', quantity: 2, price: 80 },
  { sku: 'MS-02', quantity: 1, price: 40 },
];

console.group('Order inspection');
console.table(orderRows);
console.time('order-total');

const orderTotalValue = orderRows.reduce((runningTotal, orderRow) => {
  return runningTotal + orderRow.quantity * orderRow.price;
}, 0);

console.timeEnd('order-total');
console.log(orderTotalValue);
console.groupEnd();
