// Goal:
// Verify that expressions evaluate to values and some expressions also create side effects.

let subtotalAmount = 80;
const shippingAmount = 12;
const discountRate = 0.1;

const finalAmount = subtotalAmount + shippingAmount - subtotalAmount * discountRate;
console.log(finalAmount);

const assignmentValue = (subtotalAmount = 120);
console.log(assignmentValue);
console.log(subtotalAmount);

const reportMessage = `amount:${finalAmount}`;
console.log(reportMessage);
