// Goal:
// Verify default import, named import, renamed import, and namespace import.

import createCurrencySummary, {
  defaultCurrencyCode,
  formatCurrencyAmount,
  formatCurrencyAmount as createMoneyText,
} from './currencyFormatter.js';

import * as CurrencyFormatter from './currencyFormatter.js';

console.log(createCurrencySummary(19.5));
console.log(formatCurrencyAmount(19.5));
console.log(createMoneyText(20));
console.log(defaultCurrencyCode);
console.log(CurrencyFormatter.formatCurrencyCodeLabel());
