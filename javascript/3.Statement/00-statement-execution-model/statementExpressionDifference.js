// Goal:
// Compare expressions that produce values with statements that perform actions.

const expressionValue = 1 + 2;
let actionCount = 0;

actionCount += expressionValue;

if (actionCount > 0) {
  actionCount += 1;
}

console.log(expressionValue);
console.log(actionCount);
