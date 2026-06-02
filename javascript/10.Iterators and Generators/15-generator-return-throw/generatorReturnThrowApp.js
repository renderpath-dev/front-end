// Goal:
// Verify generator return and cleanup behavior.

function* createFileLineGenerator() {
  try {
    yield 'line-1';
    yield 'line-2';
    yield 'line-3';
  } finally {
    console.log('cleanup-complete');
  }
}

const fileLineGenerator = createFileLineGenerator();

console.log(fileLineGenerator.next());
console.log(fileLineGenerator.return('stopped'));
console.log(fileLineGenerator.next());

function* createResettableCounterGenerator() {
  let currentCount = 0;

  while (true) {
    try {
      yield currentCount;
      currentCount += 1;
    } catch (counterError) {
      currentCount = 0;
      yield `reset:${counterError.message}`;
    }
  }
}

const counterGenerator = createResettableCounterGenerator();

console.log(counterGenerator.next());
console.log(counterGenerator.next());
console.log(counterGenerator.throw(new Error('manual-reset')));
console.log(counterGenerator.next());
