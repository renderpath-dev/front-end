// Goal:
// Use a class expression as a value.

// Expected output:
// DigitalProduct
// true

const Product = class DigitalProduct {
  constructor(title) {
    this.title = title;
  }

  getKind() {
    return DigitalProduct.name;
  }
};

const download = new Product("Ebook");

console.log(download.getKind());
console.log(typeof Product === "function");
