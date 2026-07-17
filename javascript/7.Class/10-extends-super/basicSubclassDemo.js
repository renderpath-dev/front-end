// Goal:
// Create a subclass that extends a base class.

// Expected output:
// Ebook
// application/pdf
// true
// true

class Product {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }

  getLabel() {
    return this.title;
  }
}

class DigitalProduct extends Product {
  constructor(id, title, fileType) {
    super(id, title);
    this.fileType = fileType;
  }

  getFileType() {
    return this.fileType;
  }
}

const ebook = new DigitalProduct("p1", "Ebook", "application/pdf");

console.log(ebook.getLabel());
console.log(ebook.getFileType());
console.log(ebook instanceof DigitalProduct);
console.log(ebook instanceof Product);
