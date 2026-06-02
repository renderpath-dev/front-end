// Goal:
// Verify how Symbol.for and Symbol.keyFor use the global symbol registry.

const firstSharedKey = Symbol.for('app.metadata');
const secondSharedKey = Symbol.for('app.metadata');
const localKey = Symbol('app.metadata');

console.log(firstSharedKey === secondSharedKey);
console.log(Symbol.keyFor(firstSharedKey));
console.log(Symbol.keyFor(localKey));
