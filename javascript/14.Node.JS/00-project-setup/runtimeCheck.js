// Goal:
// Verify the Node.js runtime version and module mode.

console.log(process.version);
console.log(import.meta.url.includes('runtimeCheck.js'));
