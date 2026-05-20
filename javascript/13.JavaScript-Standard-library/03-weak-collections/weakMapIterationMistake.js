// Goal:
// Verify that WeakMap does not expose enumeration methods.

const privateStateStore = new WeakMap();

console.log(typeof privateStateStore.keys);
console.log(typeof privateStateStore.entries);
console.log(privateStateStore.size);
