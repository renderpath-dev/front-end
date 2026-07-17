// Goal:
// Verify that this cannot be used before super() in a derived constructor.

// Expected output:
// ReferenceError

class Product {
  constructor(title) {
    this.title = title;
  }
}

class DigitalProduct extends Product {
  constructor(title) {
    try {
      this.fileType = "application/pdf";
    } catch (error) {
      console.log(error.constructor.name);
    }

    super(title);
  }
}

new DigitalProduct("Ebook");
