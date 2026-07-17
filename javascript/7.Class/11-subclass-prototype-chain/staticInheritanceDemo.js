// Goal:
// Verify that subclasses inherit static methods through constructor-side chain.

// Expected output:
// DigitalProduct
// true

class Product {
  static getTypeName() {
    return this.name;
  }
}

class DigitalProduct extends Product {}

console.log(DigitalProduct.getTypeName());
console.log(Object.getPrototypeOf(DigitalProduct) === Product);
