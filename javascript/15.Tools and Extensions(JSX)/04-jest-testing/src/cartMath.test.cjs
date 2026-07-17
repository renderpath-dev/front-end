// Goal:
// Verify cart calculation behavior with Jest.

const { calculateCartSubtotal } = require('./cartMath.cjs');
const {test, expect} = require('@jest/globals');

test('calculates cart subtotal from multiple items', () => {
  const cartItems = [
    { priceAmount: 20, quantityCount: 2 },
    { priceAmount: 15, quantityCount: 3 },
  ];

  expect(calculateCartSubtotal(cartItems)).toBe(85);
});

test('returns zero for an empty cart', () => {
  expect(calculateCartSubtotal([])).toBe(0);
});
