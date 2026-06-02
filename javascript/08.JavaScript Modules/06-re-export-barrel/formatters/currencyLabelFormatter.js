// Goal:
// Export a currency label formatter.

export function formatOrderCurrency(amountValue) {
  return `$${amountValue.toFixed(2)}`;
}
