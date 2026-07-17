// Goal:
// Show that break outside a valid target is a syntax error.

try {
  Function("break;");
} catch (error) {
  console.log(error.name);
}
