// Goal:
// Verify how importing a module for side effects runs its top-level code.

console.log('console setup module executed');

globalThis.applicationLabel = 'Module Demo';
