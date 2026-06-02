// Goal:
// Build a custom iterable object without generator syntax.

const priorityQueueObject = {
  items: ['critical', 'normal', 'low'],

  [Symbol.iterator]() {
    let nextIndex = 0;
    const sourceItems = this.items;

    return {
      next() {
        if (nextIndex < sourceItems.length) {
          const currentValue = sourceItems[nextIndex];
          nextIndex += 1;

          return { value: currentValue, done: false };
        }

        return { value: undefined, done: true };
      },
    };
  },
};

for (const priorityLabel of priorityQueueObject) {
  console.log(priorityLabel);
}
