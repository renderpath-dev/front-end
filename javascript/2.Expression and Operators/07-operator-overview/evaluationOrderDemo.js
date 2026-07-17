// Goal:
// Verify left-to-right operand evaluation with nested operator grouping.

let traceText = "";

function mark(label, value) {
  traceText += label;
  return value;
}

const result = mark("A", 1) + mark("B", 2) * mark("C", 3);

console.log(result);
console.log(traceText);
