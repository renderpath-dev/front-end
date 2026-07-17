// Goal:
// Override a superclass method in a subclass.

// Expected output:
// Product: Keyboard
// Digital: Ebook
// true

class Product {
  constructor(title) {
    this.title = title;
  }

  getLabel() {
    return `Product: ${this.title}`;
  }
}

class DigitalProduct extends Product {
  getLabel() {
    return `Digital: ${this.title}`;
  }
}

const keyboard = new Product("Keyboard");
const ebook = new DigitalProduct("Ebook");

console.log(keyboard.getLabel());
console.log(ebook.getLabel());
console.log(Object.getPrototypeOf(DigitalProduct.prototype) === Product.prototype);
