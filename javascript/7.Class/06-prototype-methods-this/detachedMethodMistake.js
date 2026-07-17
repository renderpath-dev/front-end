// Goal:
// Verify that extracting a class method loses its receiver.

// Expected output:
// 1
// TypeError
// 2

class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count += 1;
    return this.count;
  }
}

const counter = new Counter();
console.log(counter.increment());

const detachedIncrement = counter.increment;

try {
  detachedIncrement();
} catch (error) {
  console.log(error.constructor.name);
}

const boundIncrement = counter.increment.bind(counter);
console.log(boundIncrement());
