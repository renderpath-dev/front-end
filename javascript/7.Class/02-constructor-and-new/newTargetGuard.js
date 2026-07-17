// Goal:
// Use new.target to support calling a constructor with or without new.

// Expected output:
// Keyboard
// Mouse

function Product(id, title) {
  if (new.target === undefined) {
    return new Product(id, title);
  }

  this.id = id;
  this.title = title;
}

const keyboard = new Product("p1", "Keyboard");
const mouse = Product("p2", "Mouse");

console.log(keyboard.title);
console.log(mouse.title);
