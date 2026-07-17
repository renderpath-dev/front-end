// Goal:
// Verify break and continue inside a loop.

const values = [1, 0, 2, -1, 3];
const accepted = [];

for (const value of values) {
  if (value === 0) {
    continue;
  }

  if (value < 0) {
    break;
  }

  accepted.push(value);
}

console.log(accepted);
