// Goal:
// Compare map, filter, find, includes, some, every, and reduce.

const orders = [
  { id: 'A100', total: 80, paid: true },
  { id: 'B200', total: 120, paid: false },
  { id: 'C300', total: 220, paid: true },
];

const orderIds = orders.map((order) => order.id);
const paidOrders = orders.filter((order) => order.paid);
const expensiveOrder = orders.find((order) => order.total > 100);
const hasB200 = orderIds.includes('B200');
const hasUnpaidOrder = orders.some((order) => !order.paid);
const allHaveTotals = orders.every((order) => typeof order.total === 'number');
const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

console.log(orderIds);
console.log(paidOrders.length);
console.log(expensiveOrder.id);
console.log(hasB200);
console.log(hasUnpaidOrder);
console.log(allHaveTotals);
console.log(totalRevenue);
