// Goal:
// Verify cart calculation logic with Jest.

const {calculateCartSubtotal} = require('./cartMath.js');
const { expect, test } = require('@jest/globals');

test('calculateCartSubtotal subtotal from multiple cart items', () => {
  const cartItems = [
    {priceAmount:30, quantityCount:2},
    {priceAmount:15,quantityCount:4},
  ];

  expect(calculateCartSubtotal(cartItems)).toBe(120);
});

test('returns zero for an empty cart',() => {
  expect(calculateCartSubtotal([])).toBe(0);
});