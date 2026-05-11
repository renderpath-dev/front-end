// Goal:
// Export a rendering helper for the browser module entry file.

export function renderProductCard(productTitle, priceAmount) {
  return `${productTitle}: $${priceAmount}`;
}
