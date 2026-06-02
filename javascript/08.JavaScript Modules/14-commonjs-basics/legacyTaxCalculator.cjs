// Goal:
// Export multiple functions from a CommonJS module.

function calculateLegacyTax (subtotalAmount) {
  return subtotalAmount * 0.08;
}
function calculateLegacyTotal (subtotalAmount) {
  return subtotalAmount + calculateLegacyTax(subtotalAmount);
}
module.exports = {
  calculateLegacyTax,
  calculateLegacyTotal,
};