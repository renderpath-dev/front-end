// Goal:
// Compare class syntax with the prototype object it creates.

// Expected output:
// function
// false
// true
// Keyboard

class Product {
  constructor(title) {
    this.title = title;
  }

  getLabel() {
    return this.title;
  }
}

const keyboard = new Product("Keyboard");

console.log(typeof Product);
console.log(Object.hasOwn(keyboard, "getLabel"));
console.log(Object.getPrototypeOf(keyboard) === Product.prototype);
console.log(Product.prototype.getLabel.call(keyboard));
