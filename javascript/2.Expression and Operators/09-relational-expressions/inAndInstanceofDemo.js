// Goal:
// Compare in, Object.hasOwn, and instanceof.

function Product(title) {
  this.title = title;
}

Product.prototype.describe = function () {
  return this.title;
};

const product = new Product("Desk");

console.log("title" in product);
console.log("describe" in product);
console.log(Object.hasOwn(product, "describe"));
console.log(product instanceof Product);
