// Goal:
// Show that class declarations cannot be used before initialization.

// Expected output:
// ReferenceError
// Widget

try {
  console.log(Widget.name);
} catch (error) {
  console.log(error.constructor.name);
}

class Widget {}

console.log(Widget.name);
