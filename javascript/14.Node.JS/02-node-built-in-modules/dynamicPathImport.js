// Goal:
// Import a built-in module dynamically.

const pathModule = await import('node:path');

const filePath = pathModule.default.join('reports', 'weekly', 'summary.txt');

console.log(filePath.endsWith('summary.txt'));
