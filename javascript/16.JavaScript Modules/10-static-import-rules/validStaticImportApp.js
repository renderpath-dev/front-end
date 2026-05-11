// Goal:
// Use static import at the top level and use the value later.

import { calculateSubtotal } from './priceCalculator.js';

if (true) {
  console.log(calculateSubtotal(20, 3));
}
