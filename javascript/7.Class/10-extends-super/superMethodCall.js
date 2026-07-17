// Goal:
// Call an overridden superclass method with super.method().

// Expected output:
// Ebook [application/pdf]

class Product {
  constructor(title) {
    this.title = title;
  }

  getLabel() {
    return this.title;
  }
}

class DigitalProduct extends Product {
  constructor(title, fileType) {
    super(title);
    this.fileType = fileType;
  }

  getLabel() {
    return `${super.getLabel()} [${this.fileType}]`;
  }
}

const ebook = new DigitalProduct("Ebook", "application/pdf");
console.log(ebook.getLabel());
