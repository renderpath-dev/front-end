// Goal:
// Compare a safer circular import with a risky circular import.

import { createBillingText } from './billingRules.js';

console.log(createBillingText());

// Uncomment this import after running the safe example.
// import { createRiskyBillingText } from './riskyBillingRules.js';
// console.log(createRiskyBillingText());
