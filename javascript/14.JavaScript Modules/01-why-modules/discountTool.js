const discountRate = 0.1;

export function calculateDiscountedPrice (priceAmount) {
  return priceAmount * (1 - discountRate);
}