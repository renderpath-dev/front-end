// Goal:
// Show that duplicate let declarations in the same scope are syntax errors.

try {
  Function("let status = 'ready'; let status = 'done';");
} catch (error) {
  console.log(error.name);
}
