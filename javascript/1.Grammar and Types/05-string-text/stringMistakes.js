// Goal:
// Show that strings cannot be mutated by index assignment.

// Expected output:
// Keyboard

const productTitle = Function(`
  let productTitle = "Keyboard";
  productTitle[0] = "k";
  return productTitle;
`)();

console.log(productTitle);
