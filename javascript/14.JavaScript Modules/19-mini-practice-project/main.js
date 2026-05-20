// Goal:
// Compose feature modules in a browser entry file.

import { createCartSummaryText } from './features/cart/cartSummaryView.js';
import createProfileHeadingText from './features/profile/profileHeadingView.js';

const cartItems = [
  { priceAmount: 30, quantityCount: 2 },
  { priceAmount: 15, quantityCount: 4 },
];

const outputElement = document.querySelector('#output');

outputElement.textContent = `${createProfileHeadingText()} | ${createCartSummaryText(cartItems)}`;
