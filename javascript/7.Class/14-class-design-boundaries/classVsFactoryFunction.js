// Goal:
// Compare a class with a factory function for the same behavior.

// Expected output:
// Keyboard: 9900
// Mouse: 2500
// true

class ProductClass {
  constructor(title, priceCents) {
    this.title = title;
    this.priceCents = priceCents;
  }

  getLabel() {
    return `${this.title}: ${this.priceCents}`;
  }
}

function createProductRecord(title, priceCents) {
  return {
    title,
    priceCents,
    getLabel() {
      return `${this.title}: ${this.priceCents}`;
    },
  };
}

const keyboard = new ProductClass("Keyboard", 9900);
const mouse = createProductRecord("Mouse", 2500);

console.log(keyboard.getLabel());
console.log(mouse.getLabel());
console.log(keyboard instanceof ProductClass);
