// Goal:
// Export calculation functions for Jest tests.

function calculateCartSubtotal(cartItems) {
  return cartItems.reduce((runningTotal, cartItem) => {
    return runningTotal + cartItem.priceAmount * cartItem.quantityCount;
  }, 0);
}

module.exports = {
  calculateCartSubtotal,
};
