// Goal:
// Preview await as an expression in an ES module.

const resolvedValue = await Promise.resolve(42);

console.log(resolvedValue);
