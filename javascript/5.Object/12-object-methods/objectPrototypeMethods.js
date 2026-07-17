// Goal:
// Compare toString, toLocaleString, valueOf, and a custom conversion method.

const scorePoint = {
  x: 3,
  y: 4,
  toString() {
    return `(${this.x}, ${this.y})`;
  },
  valueOf() {
    return Math.hypot(this.x, this.y);
  },
};

console.log(String(scorePoint));
console.log(scorePoint > 4);
console.log(scorePoint + 1);
