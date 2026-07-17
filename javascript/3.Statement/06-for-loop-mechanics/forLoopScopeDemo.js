// Goal:
// Compare let loop scope with an outer binding.

let indexLabel = "outer";
const values = [];

for (let indexLabel = 0; indexLabel < 3; indexLabel++) {
  values.push(indexLabel);
}

console.log(values);
console.log(indexLabel);
