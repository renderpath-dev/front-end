// Goal:
// Compare statement-based preparation with expression-based selection.

const itemCount = 0;
let preparedMessage;

if (itemCount === 0) {
  preparedMessage = "No items";
} else {
  preparedMessage = "Has items";
}

const expressionMessage = itemCount === 0 ? "No items" : "Has items";

console.log(preparedMessage);
console.log(expressionMessage);
