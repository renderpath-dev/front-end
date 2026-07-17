// Goal:
// Separate per-instance state from shared prototype methods.

// Expected output:
// true
// false
// true
// true

const productMethods = {
  getLabel() {
    return `${this.title}: ${this.priceCents}`;
  },
};

function createProduct(title, priceCents) {
  const product = Object.create(productMethods);
  product.title = title;
  product.priceCents = priceCents;
  return product;
}

const keyboard = createProduct("Keyboard", 9900);
const mouse = createProduct("Mouse", 2500);

console.log(Object.hasOwn(keyboard, "title"));
console.log(Object.hasOwn(keyboard, "getLabel"));
console.log("getLabel" in keyboard);
console.log(keyboard.getLabel === mouse.getLabel);
