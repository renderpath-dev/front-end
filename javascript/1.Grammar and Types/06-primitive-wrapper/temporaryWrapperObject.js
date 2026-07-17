// Goal:
// Show temporary wrapper behavior for primitive strings.

// Expected output:
// KEYBOARD
// undefined

const productTitle = "Keyboard";

const temporaryWrapperResult = Function(`
  const productTitle = "Keyboard";
  productTitle.category = "input-device";
  return productTitle.category;
`)();

console.log(productTitle.toUpperCase());
console.log(temporaryWrapperResult);
