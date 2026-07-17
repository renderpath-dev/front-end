// Goal:
// Compare runtime SyntaxError from JSON.parse and runtime TypeError from property access.

try {
  JSON.parse("{bad json");
} catch (error) {
  console.log(error.name);
}

try {
  console.log(null.name);
} catch (error) {
  console.log(error.name);
}
