'use strict';

// Goal:
// Show where prototype methods live and how method lookup works.

class PriceRuleEngine {
  constructor(basePrice, discountRate) {
    this.basePrice = basePrice;
    this.discountRate = discountRate;
  }

  computeDiscountedPrice() {
    return this.basePrice * (1 - this.discountRate);
  }
}

const winterPriceRuleEngine = new PriceRuleEngine(200, 0.25);
const summerPriceRuleEngine = new PriceRuleEngine(120, 0.1);

console.log(winterPriceRuleEngine.computeDiscountedPrice());
console.log(summerPriceRuleEngine.computeDiscountedPrice());
console.log(
  winterPriceRuleEngine.computeDiscountedPrice ===
    summerPriceRuleEngine.computeDiscountedPrice,
);

// Class prototype methods are own properties of the prototype object.
console.log(Object.hasOwn(PriceRuleEngine.prototype, 'computeDiscountedPrice'));
console.log(Object.keys(PriceRuleEngine.prototype));
console.log(Object.getOwnPropertyNames(PriceRuleEngine.prototype));

// Class prototype methods are non-enumerable by default.
console.log(Object.getOwnPropertyDescriptor(PriceRuleEngine.prototype, 'computeDiscountedPrice'));

// The in operator checks the whole prototype chain.
console.log('computeDiscountedPrice' in winterPriceRuleEngine);
console.log(Object.hasOwn(winterPriceRuleEngine, 'computeDiscountedPrice'));

// An own property can shadow a prototype method with the same name.
winterPriceRuleEngine.computeDiscountedPrice = function () {
  return 0;
};

console.log(Object.hasOwn(winterPriceRuleEngine, 'computeDiscountedPrice'));
console.log(winterPriceRuleEngine.computeDiscountedPrice());
console.log(summerPriceRuleEngine.computeDiscountedPrice());
console.log(PriceRuleEngine.prototype.computeDiscountedPrice.call(winterPriceRuleEngine));

// Deleting the own method exposes the prototype method again.
delete winterPriceRuleEngine.computeDiscountedPrice;

console.log(Object.hasOwn(winterPriceRuleEngine, 'computeDiscountedPrice'));
console.log(winterPriceRuleEngine.computeDiscountedPrice());

// isPrototypeOf checks whether one object appears in another object's prototype chain.
console.log(PriceRuleEngine.prototype.isPrototypeOf(winterPriceRuleEngine));
console.log(Object.prototype.isPrototypeOf(winterPriceRuleEngine));
