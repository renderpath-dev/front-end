// Goal:
// Verify basics generator execution.

function* createTaskStepGenerator() {
  console.log('generator Started');

  yield 'collect requirements';
  yield 'build prototype';
  yield 'review result';
  console.log('generator ended');
}

const taskStepGenerator = createTaskStepGenerator();
console.log('before first next');
console.log(taskStepGenerator.next());
console.log(taskStepGenerator.next());
console.log(taskStepGenerator.next());
console.log(taskStepGenerator.next());