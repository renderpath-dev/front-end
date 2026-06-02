// Goal:
// Import named exports and call them in the entry file.

import {
  calculateSubtotal,
  calculateSalesTax,
  calculateGrandTotal,
} from './priceCalculator.js';

const subtotalAmount = calculateSubtotal(50, 2);
const taxAmount = calculateSalesTax(subtotalAmount);
const grandTotalAmount = calculateGrandTotal(50, 2);

console.log(subtotalAmount);
console.log(taxAmount);
console.log(grandTotalAmount);
