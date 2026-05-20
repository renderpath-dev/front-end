// Goal:
// Show a risky circular import shape.

import { riskyDiscountText } from './riskyDiscountRules.js';

export const riskyBillingLabel = 'Risky Billing';

export function createRiskyBillingText() {
  return `${riskyBillingLabel} with ${riskyDiscountText}`;
}
