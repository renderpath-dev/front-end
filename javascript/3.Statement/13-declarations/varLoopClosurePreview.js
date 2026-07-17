// Goal:
// Preview why var in loops can surprise closures.

const handlers = [];

for (var index = 0; index < 3; index++) {
  handlers.push(function readIndex() {
    return index;
  });
}

console.log(handlers[0]());
console.log(handlers[1]());
console.log(handlers[2]());
