// Goal:
// Add a method to an existing custom class prototype.

// Expected output:
// Keyboard: 9900

class Product {
  constructor(title, priceCents) {
    this.title = title;
    this.priceCents = priceCents;
  }
}

Object.defineProperty(Product.prototype, "getLabel", {
  value() {
    return `${this.title}: ${this.priceCents}`;
  },
  enumerable: false,
  writable: true,
  configurable: true,
});

const keyboard = new Product("Keyboard", 9900);
console.log(keyboard.getLabel());
