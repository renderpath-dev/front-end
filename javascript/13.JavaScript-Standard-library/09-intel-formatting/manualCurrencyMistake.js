// Goal:
// Show why manual currency formatting is incomplete.

const rawPaymentAmount = 99.9;
const badPaymentLabel = '$' + rawPaymentAmount;

const betterPaymentFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

console.log(badPaymentLabel);
console.log(betterPaymentFormatter.format(rawPaymentAmount));