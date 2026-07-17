// Goal:
// Show that a class declaration creates a constructor function.

// Expected output:
// function
// true
// Keyboard

class Product {
  constructor(title) {
    this.title = title;
  }

  getLabel() {
    return this.title;
  }
}

const keyboard = new Product("Keyboard");

console.log(typeof Product);
console.log(Object.hasOwn(keyboard, "getLabel") === false);
console.log(keyboard.getLabel());
