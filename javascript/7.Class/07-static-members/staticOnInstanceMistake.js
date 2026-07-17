// Goal:
// Show that static methods are not instance methods.

// Expected output:
// function
// undefined
// TypeError

class Product {
  static fromRecord(record) {
    return new Product(record.title);
  }

  constructor(title) {
    this.title = title;
  }
}

const keyboard = new Product("Keyboard");

console.log(typeof Product.fromRecord);
console.log(typeof keyboard.fromRecord);

try {
  keyboard.fromRecord({ title: "Mouse" });
} catch (error) {
  console.log(error.constructor.name);
}
