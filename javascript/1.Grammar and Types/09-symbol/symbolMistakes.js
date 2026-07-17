// Goal:
// Show that Symbol cannot be implicitly converted to string.

// Expected output:
// TypeError
// Token: Symbol(product)

const productToken = Symbol("product");

try {
  console.log("Token: " + productToken);
} catch (error) {
  console.log(error.constructor.name);
}

console.log(`Token: ${String(productToken)}`);
