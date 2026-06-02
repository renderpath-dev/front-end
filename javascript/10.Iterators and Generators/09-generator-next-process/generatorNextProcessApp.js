// Goal:
// Trace how next moves through yield points.

function* createWorkflowGenerator() {
  const firstStep = 'login';
  yield firstStep;

  const secondStep = 'load-dashboard';
  yield secondStep;

  const thirdStep = 'render-widgets';
  yield thirdStep;
}

const workflowGenerator = createWorkflowGenerator();

const firstResult = workflowGenerator.next();
const secondResult = workflowGenerator.next();
const thirdResult = workflowGenerator.next();
const fourthResult = workflowGenerator.next();

console.log(firstResult.value, firstResult.done);
console.log(secondResult.value, secondResult.done);
console.log(thirdResult.value, thirdResult.done);
console.log(fourthResult.value, fourthResult.done);
