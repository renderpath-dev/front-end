// Goal:
// Verify that Symbol creates a unique symbol every time.

const firstMetadataKey = Symbol('metadata');
const secondMetadataKey = Symbol('metadata');

console.log(firstMetadataKey === secondMetadataKey);
console.log(firstMetadataKey.description);
