// Goal:
// Show why integer cents are safer than decimal money values.

// Expected output:
// 0.30000000000000004
// 30
// 0.3

const decimalTotal = 0.1 + 0.2;
const firstPaymentCents = 10;
const secondPaymentCents = 20;
const totalCents = firstPaymentCents + secondPaymentCents;

console.log(decimalTotal);
console.log(totalCents);
console.log(totalCents / 100);
