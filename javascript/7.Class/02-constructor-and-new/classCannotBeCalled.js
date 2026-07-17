// Goal:
// Verify that class constructors cannot be called without new.

// Expected output:
// TypeError

class Product {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

try {
  Product("p1", "Keyboard");
} catch (error) {
  console.log(error.constructor.name);
}
