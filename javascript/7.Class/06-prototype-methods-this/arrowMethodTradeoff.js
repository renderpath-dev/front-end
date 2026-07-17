// Goal:
// Compare a prototype method with an arrow function stored on each instance.

// Expected output:
// false
// true
// 1

class Counter {
  constructor() {
    this.count = 0;
    this.increment = () => {
      this.count += 1;
      return this.count;
    };
  }
}

const firstCounter = new Counter();
const secondCounter = new Counter();

console.log(firstCounter.increment === secondCounter.increment);
console.log(Object.hasOwn(firstCounter, "increment"));

const detachedIncrement = firstCounter.increment;
console.log(detachedIncrement());
