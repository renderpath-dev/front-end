// Goal:
// Export cart calculation logic that can be tested and used by JSX components

export function calculateCartSubtotal(cartItems) {
    return cartItems.reduce((runningTotal, cartItem) => {
        return runningTotal + cartItem.priceAmount * cartItem.quantityCount;

    },0);
}