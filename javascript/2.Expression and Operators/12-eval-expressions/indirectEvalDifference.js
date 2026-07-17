// Goal:
// Compare direct eval and indirect eval scope behavior.

globalThis.sharedEvalValue = 3;
const localValue = 7;

console.log(eval("localValue"));

try {
  console.log((0, eval)("localValue"));
} catch (error) {
  console.log(error.name);
}

console.log((0, eval)("globalThis.sharedEvalValue"));
