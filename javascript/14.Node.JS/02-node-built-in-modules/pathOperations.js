// Goal:
// Import a Node.js built-in module with the node: prefix.

import path from 'node:path';

const reportFilePath = path.join('reports', 'daily', 'summary.json');
const reportFileExtension = path.extname(reportFilePath);

console.log(reportFilePath);
console.log(reportFileExtension);
