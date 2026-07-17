// Goal:
// Define a class method with a computed symbol key.

// Expected output:
// p1
// p2

class ProductCollection {
  constructor(products) {
    this.products = products;
  }

  *[Symbol.iterator]() {
    for (const product of this.products) {
      yield product.id;
    }
  }
}

const collection = new ProductCollection([{ id: "p1" }, { id: "p2" }]);

for (const id of collection) {
  console.log(id);
}
