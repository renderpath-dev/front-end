// Goal:
// Verify how new uses a constructor function to initialize an object.

function ProductSnapshot(sku, price) {
  this.sku = sku;
  this.price = price;
}

const snapshot = new ProductSnapshot("HD-204", 129);

console.log(snapshot.sku);
console.log(snapshot.price);
console.log(snapshot instanceof ProductSnapshot);
