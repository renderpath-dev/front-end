// Goal:
// Load a CommonJS module with require().

const {
  calculateLegacyTax,
  calculateLegacyTotal,
} = require('./legacyTaxCalculator.cjs');
console.log(calculateLegacyTax(100));
console.log(calculateLegacyTotal(100));