// Goal:
// Verify what happens when a class has no explicit constructor.

// Expected output:
// true
// true
// function

class EmptyProduct {}

const item = new EmptyProduct();

console.log(item instanceof EmptyProduct);
console.log(Object.getPrototypeOf(item) === EmptyProduct.prototype);
console.log(typeof EmptyProduct.prototype.constructor);
