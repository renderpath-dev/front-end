// Goal:
// Prefer a utility function instead of modifying Array.prototype.

// Expected output:
// Keyboard
// undefined

function firstItem(items) {
  return items[0];
}

console.log(firstItem(["Keyboard", "Mouse"]));
console.log(firstItem([]));
