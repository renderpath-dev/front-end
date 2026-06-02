// Goal:
// Import a binding from a module that also imports this module.

import { billingLabel } from './billingRules.js';

export function createDiscountText() {
  return `discount for ${billingLabel}`;
}
