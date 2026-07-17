// Goal:
// Demonstrate why changing built-in prototypes can affect all arrays.

// Expected output:
// function
// Keyboard

if (!Array.prototype.firstItem) {
  Object.defineProperty(Array.prototype, "firstItem", {
    value() {
      return this[0];
    },
    enumerable: false,
    writable: true,
    configurable: true,
  });
}

const products = ["Keyboard", "Mouse"];

console.log(typeof [].firstItem);
console.log(products.firstItem());
