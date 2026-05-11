// Goal:
// Export a shipping calculation function and keep the fee rate private.

const feePerKilogram = 5;

export function calculateShippingFee(weightAmount) {
  return weightAmount * feePerKilogram;
}
