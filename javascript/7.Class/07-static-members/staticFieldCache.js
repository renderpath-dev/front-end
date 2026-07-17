// Goal:
// Store class-level data in a static field.

// Expected output:
// 1
// Keyboard
// true

class ProductRegistry {
  static cache = new Map();

  static add(product) {
    this.cache.set(product.id, product);
  }

  static get(id) {
    return this.cache.get(id);
  }
}

ProductRegistry.add({ id: "p1", title: "Keyboard" });

console.log(ProductRegistry.cache.size);
console.log(ProductRegistry.get("p1").title);
console.log(Object.hasOwn(ProductRegistry, "cache"));
