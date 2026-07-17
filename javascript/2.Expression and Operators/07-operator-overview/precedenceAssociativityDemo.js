// Goal:
// Verify precedence, associativity, and evaluation order.

let traceText = "";

function readValue(label, value) {
  traceText += label;
  return value;
}

const arithmeticResult = 3 + 4 * 5;
const groupedResult = (3 + 4) * 5;
const assignmentTarget = { count: 0 };
let assignmentResult;

assignmentResult = assignmentTarget.count = readValue("A", 7);
const orderResult = readValue("B", 2) + readValue("C", 3) * readValue("D", 4);

console.log(arithmeticResult);
console.log(groupedResult);
console.log(assignmentResult);
console.log(assignmentTarget.count);
console.log(orderResult);
console.log(traceText);
