// Goal:
// Inspect both prototype chains created by extends.

// Expected output:
// true
// true
// true
// true

class Product {}
class DigitalProduct extends Product {}

const ebook = new DigitalProduct();

console.log(Object.getPrototypeOf(ebook) === DigitalProduct.prototype);
console.log(Object.getPrototypeOf(DigitalProduct.prototype) === Product.prototype);
console.log(Object.getPrototypeOf(DigitalProduct) === Product);
console.log(ebook instanceof Product);
