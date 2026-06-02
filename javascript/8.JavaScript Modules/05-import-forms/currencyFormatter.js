// Goal:
// Provide named exports and one default export from the same module.

export const defaultCurrencyCode = 'USD';

export function formatCurrencyAmount(amountValue) {
  return `$${amountValue.toFixed(2)}`;
}

export function formatCurrencyCodeLabel() {
  return defaultCurrencyCode;
}

export default function createCurrencySummary(amountValue) {
  return `${formatCurrencyAmount(amountValue)} ${defaultCurrencyCode}`;
}
