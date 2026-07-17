// Goal:
// Build a normalized config label with a tagged template.

export function configLabel(stringParts, ...expressionValues) {
  let outputText = stringParts[0];

  for (let index = 0; index < expressionValues.length; index += 1) {
    outputText += String(expressionValues[index]).trim().toLowerCase();
    outputText += stringParts[index + 1];
  }

  return outputText;
}
