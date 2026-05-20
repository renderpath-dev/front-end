let variables = 9;
function addVariable(variable) {
  return variable + variables;
}
console.log(variables);
console.log(addVariable(2));

const count = 10;
function newYearCountdown() {
  let newCount = count * 12;
  if (count % 2 === 0) {
    newCount = count + 1;
    return newCount;
  }
}
console.log(newYearCountdown());


