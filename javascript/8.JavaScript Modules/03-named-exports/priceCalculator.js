// Goal:
// Export multiple named calculation functions

export function calculateSubtotal(unitPrice,quantityCount) {
  return unitPrice * quantityCount;
}

export function calculateSalesTax (subtotalAmount) {
  return subtotalAmount * 0.8;
}

export function calculateGrandTotal (unitPrice,quantityCount) {
  const subtotalAmount = calculateSubtotal(unitPrice,quantityCount);
  const taxAmount = calculateSalesTax(subtotalAmount);

  return subtotalAmount + taxAmount;
}