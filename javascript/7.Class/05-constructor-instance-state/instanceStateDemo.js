// Goal:
// Store different state on different instances.

// Expected output:
// Keyboard
// Mouse
// false
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

const keyboard = new Product("p1", "Keyboard");
const mouse = new Product("p2", "Mouse");

console.log(keyboard.getLabel());
console.log(mouse.getLabel());
console.log(keyboard.title === mouse.title);
console.log(keyboard.getLabel === mouse.getLabel);
