// Goal:
// Verify that class methods live on the prototype and use call-site this.

// Expected output:
// Keyboard: 9900
// false
// true

class Product {
  constructor(title, priceCents) {
    this.title = title;
    this.priceCents = priceCents;
  }

  getLabel() {
    return `${this.title}: ${this.priceCents}`;
  }
}

const keyboard = new Product("Keyboard", 9900);

console.log(keyboard.getLabel());
console.log(Object.hasOwn(keyboard, "getLabel"));
console.log(Object.getPrototypeOf(keyboard).getLabel === Product.prototype.getLabel);
