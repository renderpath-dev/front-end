// Goal:
// Verify that statements run in control-flow order.

const executionLog = [];

executionLog.push("start");

const shouldSkip = true;

if (shouldSkip) {
  executionLog.push("if branch");
} else {
  executionLog.push("else branch");
}

for (let stepIndex = 0; stepIndex < 3; stepIndex++) {
  executionLog.push(`loop:${stepIndex}`);
}

executionLog.push("end");

console.log(executionLog.join(" -> "));
