const obj = {
  x: 10,

  normal() {
    return this.x;
  },

  arrow: () => {
    return this.x;
  },
};

console.log(obj.normal()); // 10
console.log(obj.arrow()); // usually undefined in module / strict-like contexts

const obj2 = {
  x: 10,
  normal() {
    const inner = () => this.x;
    return inner();
  }
};

console.log(obj2.normal()); // 10
