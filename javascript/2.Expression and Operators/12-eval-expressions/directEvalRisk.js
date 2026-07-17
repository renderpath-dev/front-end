// Goal:
// Show direct eval behavior without using untrusted input.

const localValue = 10;
const result = eval("localValue + 5");

console.log(result);
