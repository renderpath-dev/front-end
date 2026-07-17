// Goal:
// Verify how getter and setter functions run during property reads and writes.

const productPrice = {
  basePrice: 100,
  discountRate: 0.2,
  get finalPrice() {
    return this.basePrice * (1 - this.discountRate);
  },
  set finalPrice(newFinalPrice) {
    this.discountRate = 1 - newFinalPrice / this.basePrice;
  },
};

console.log(productPrice.finalPrice);
productPrice.finalPrice = 90;
console.log(productPrice.discountRate.toFixed(2));
console.log(productPrice.finalPrice);
