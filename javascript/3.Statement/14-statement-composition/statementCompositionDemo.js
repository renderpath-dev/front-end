// Goal:
// Prepare render-ready values with statements before expression-only usage.

const isLoading = false;
const hasError = true;
let message;

if (isLoading) {
  message = "Loading";
} else if (hasError) {
  message = "Error";
} else {
  message = "Ready";
}

const renderText = hasError ? "Show error panel" : "Show content";

console.log(message);
console.log(renderText);
