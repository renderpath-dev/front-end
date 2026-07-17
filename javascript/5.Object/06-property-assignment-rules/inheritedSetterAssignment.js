// Goal:
// Verify that assignment can call an inherited setter.

const priceRules = {
  set finalPrice(nextFinalPrice) {
    this.discountedPrice = nextFinalPrice;
  },
};

const productOffer = Object.create(priceRules);
productOffer.basePrice = 100;
productOffer.finalPrice = 80;

console.log(productOffer.discountedPrice);
console.log(Object.hasOwn(productOffer, "discountedPrice"));
