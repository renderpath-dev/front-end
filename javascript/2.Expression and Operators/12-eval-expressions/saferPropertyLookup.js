// Goal:
// Show why object lookup is safer than eval for dynamic behavior.

const operationTable = {
  add(leftValue, rightValue) {
    return leftValue + rightValue;
  },
  multiply(leftValue, rightValue) {
    return leftValue * rightValue;
  },
};

const operationName = "multiply";
const selectedOperation = operationTable[operationName];

if (typeof selectedOperation !== "function") {
  throw new Error("Unknown operation");
}

console.log(selectedOperation(6, 7));
