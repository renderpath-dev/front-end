// Goal:
// Build a cart summary text from calculation helpers and config.

import {
  calculateCartSubtotal,
  calculateCartItemCount,
} from './cartMathTools.js';

import { defaultCurrencySymbol } from '../../config/defaultRuntimeConfig.js';

export function createCartSummaryText(cartItems) {
  const subtotalAmount = calculateCartSubtotal(cartItems);
  const itemCount = calculateCartItemCount(cartItems);

  return `${itemCount} items: ${defaultCurrencySymbol}${subtotalAmount}`;
}
