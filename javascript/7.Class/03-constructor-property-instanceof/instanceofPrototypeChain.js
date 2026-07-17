// Goal:
// Verify that instanceof checks the prototype chain.

// Expected output:
// true
// true
// true

function Product(title) {
  this.title = title;
}

const keyboard = new Product("Keyboard");

console.log(keyboard instanceof Product);
console.log(Product.prototype.isPrototypeOf(keyboard));
console.log(Object.prototype.isPrototypeOf(keyboard));
