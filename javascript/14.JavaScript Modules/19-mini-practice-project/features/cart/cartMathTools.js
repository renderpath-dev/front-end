// Goal:
// Export cart calculation helpers

export function calculateCartSubtotal(cartItems) {
  return cartItems.reduce((runningTotal, cartItem) => {
    return runningTotal + cartItem.priceAmount * cartItem.quantityCount;
  },0);
}

export function calculateCartItemCount (cartItems) {
  return cartItems.reduce((runningCount, cartItem) => {
    return runningCount + cartItem.quantityCount;
  },0);
}