// Goal:
// Show how a constructor function initializes instance state.

// Expected output:
// Keyboard
// true
// true

function Product(id, title) {
  this.id = id;
  this.title = title;
}

Product.prototype.getLabel = function getLabel() {
  return this.title;
};

const keyboard = new Product("p1", "Keyboard");

console.log(keyboard.getLabel());
console.log(Object.getPrototypeOf(keyboard) === Product.prototype);
console.log(keyboard instanceof Product);
