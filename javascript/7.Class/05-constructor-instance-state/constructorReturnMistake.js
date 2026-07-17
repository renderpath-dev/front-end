// Goal:
// Show why returning a different object from a base constructor is confusing.

// Expected output:
// Replacement
// false

class Product {
  constructor(title) {
    this.title = title;
    return { title: "Replacement" };
  }
}

const item = new Product("Keyboard");

console.log(item.title);
console.log(item instanceof Product);
