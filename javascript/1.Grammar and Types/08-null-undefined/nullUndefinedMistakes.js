// Goal:
// Show why null property access fails and optional chaining short-circuits.

// Expected output:
// TypeError
// undefined

const selectedProduct = null;

try {
  console.log(selectedProduct.title);
} catch (error) {
  console.log(error.constructor.name);
}

console.log(selectedProduct?.title);
