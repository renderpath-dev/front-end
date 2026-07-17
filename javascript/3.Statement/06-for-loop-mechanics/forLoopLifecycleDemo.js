// Goal:
// Verify for-loop lifecycle.

const productPrices = [12, 18, 25];
let subtotal = 0;

for (let priceIndex = 0; priceIndex < productPrices.length; priceIndex++) {
  const currentPrice = productPrices[priceIndex];
  subtotal += currentPrice;
}

console.log(subtotal);
