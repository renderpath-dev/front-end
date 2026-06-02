// Goal:
// This top-level read may fail depending on initialization order.

import { riskyBillingLabel } from './riskyBillingRules.js';

export const riskyDiscountText = `discount for ${riskyBillingLabel}`;
