// Goal:
// Compare private state with ordinary public properties.

// Expected output:
// 1
// 0
// undefined

class Counter {
  #count = 0;

  increment() {
    this.#count += 1;
    return this.#count;
  }

  get count() {
    return this.#count;
  }
}

const counter = new Counter();

console.log(counter.increment());
console.log(Object.keys(counter).length);
console.log(counter["#count"]);
