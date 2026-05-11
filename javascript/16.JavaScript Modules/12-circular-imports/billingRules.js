// Goal:
// Show a circular import that works because reading is delayed until function call time.

import { createDiscountText } from './discountRules.js';

export const billingLabel = 'Billing';

export function createBillingText() {
  return `${billingLabel} with ${createDiscountText()}`;
}
