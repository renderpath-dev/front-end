// Goal:
// Escape inserted values with a tagged template.

function escapeHtmlValue(rawValue) {
  return String(rawValue)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function htmlSafe(stringParts, ...expressionValues) {
  let outputText = stringParts[0];

  for (let index = 0; index < expressionValues.length; index += 1) {
    outputText += escapeHtmlValue(expressionValues[index]);
    outputText += stringParts[index + 1];
  }

  return outputText;
}

const unsafeName = '<script>alert(1)</script>';
const safeMarkup = htmlSafe`<p>${unsafeName}</p>`;

console.log(safeMarkup);
