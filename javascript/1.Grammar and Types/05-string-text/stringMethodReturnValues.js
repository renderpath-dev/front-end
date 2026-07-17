// Goal:
// Show that string methods return new strings.

// Expected output:
// keyboard
// Keyboard
// true
// Key
// Keyboard

const productTitle = "Keyboard";
const normalizedTitle = productTitle.toLowerCase();

console.log(normalizedTitle);
console.log(productTitle);
console.log(productTitle.includes("board"));
console.log(productTitle.slice(0, 3));
console.log("  Keyboard  ".trim());
