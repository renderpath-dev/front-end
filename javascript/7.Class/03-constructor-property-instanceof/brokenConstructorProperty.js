// Goal:
// Show how replacing a prototype object can lose the constructor link.

// Expected output:
// false
// true
// true

function Product(title) {
  this.title = title;
}

Product.prototype = {
  getLabel() {
    return this.title;
  },
};

const keyboard = new Product("Keyboard");

console.log(keyboard.constructor === Product);
console.log(keyboard.constructor === Object);

Object.defineProperty(Product.prototype, "constructor", {
  value: Product,
  enumerable: false,
  writable: true,
  configurable: true,
});

console.log(keyboard.constructor === Product);
