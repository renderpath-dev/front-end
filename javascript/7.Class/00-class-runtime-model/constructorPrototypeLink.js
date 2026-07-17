// Goal:
// Verify how new links an instance to Constructor.prototype.

// Expected output:
// true
// true
// true
// Keyboard

function Product(title) {
  this.title = title;
}

Product.prototype.getLabel = function getLabel() {
  return this.title;
};

const keyboard = new Product("Keyboard");

console.log(Object.getPrototypeOf(keyboard) === Product.prototype);
console.log(Product.prototype.constructor === Product);
console.log(keyboard.constructor === Product);
console.log(keyboard.getLabel());
