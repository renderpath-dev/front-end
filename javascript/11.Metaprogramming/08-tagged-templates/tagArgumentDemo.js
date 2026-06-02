// Goal:
// Inspect arguments passed into a tagged template function.

function inspectTemplateParts(stringParts, ...expressionValues) {
  console.log(stringParts);
  console.log(expressionValues);
  return 'done';
}

const customerName = 'Ada';
const itemCount = 3;

const resultText = inspectTemplateParts`Customer ${customerName} has ${itemCount} items.`;

console.log(resultText);
