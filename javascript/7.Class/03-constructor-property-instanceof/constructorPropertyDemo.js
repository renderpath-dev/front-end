// Goal:
// Inspect the default constructor property on a prototype object.

// Expected output:
// true
// true
// false

function Product(title) {
  this.title = title;
}

const keyboard = new Product("Keyboard");

console.log(Product.prototype.constructor === Product);
console.log(keyboard.constructor === Product);
console.log(Object.prototype.propertyIsEnumerable.call(Product.prototype, "constructor"));
