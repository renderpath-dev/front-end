// Goal:
// Import multiple APIs from a barrel file.

import { formatOrderDate, formatOrderCurrency } from './formatters/index.js';

console.log(formatOrderDate(2026, 5, 6));
console.log(formatOrderCurrency(120));
