// Goal:
// Verify that setPrototypeOf changes lookup behavior.

const firstBehavior = {
  createStatusText() {
    return 'first';
  },
};

const secondBehavior = {
  createStatusText() {
    return 'second';
  },
};

const taskRecord = Object.create(firstBehavior);

console.log(taskRecord.createStatusText());
Object.setPrototypeOf(taskRecord, secondBehavior);
console.log(taskRecord.createStatusText());
