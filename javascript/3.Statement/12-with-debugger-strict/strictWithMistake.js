// Goal:
// Show that with is rejected in strict-mode code.

try {
  Function('"use strict"; with ({ value: 1 }) { console.log(value); }');
} catch (error) {
  console.log(error.name);
}
