// Goal:
// Show string literals and template literals.

// Expected output:
// Product: Keyboard
// Keyboard
// Keyboard is available

const singleQuotedTitle = 'Keyboard';
const doubleQuotedTitle = "Keyboard";
const templateMessage = `Product: ${singleQuotedTitle}`;
const multilineMessage = `Keyboard is
available`;

console.log(templateMessage);
console.log(doubleQuotedTitle);
console.log(multilineMessage.replace("\n", " "));
