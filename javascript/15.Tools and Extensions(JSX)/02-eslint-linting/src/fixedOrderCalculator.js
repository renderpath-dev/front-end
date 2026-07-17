// Goal:
// Provide a clean version that ESLint can accept.

export function calculateOrderTotal(priceAmount, quantityCount) {
  const totalAmount = priceAmount * quantityCount;
  return totalAmount;
}
