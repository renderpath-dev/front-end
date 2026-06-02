// Goal:
// Format a currency amount with Intl.NumberFormat.

const cartTotalAmount = 1299.5;
const usdCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

console.log(usdCurrencyFormatter.format(cartTotalAmount));
