// Goal:
// Verify runtime version, module URL, file path, and user arguments.

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = dirname(currentFilePath);
const userArguments = process.argv.slice(2);

console.log(process.version.startsWith('v'));
console.log(import.meta.url.startsWith('file://'));
console.log(currentFilePath.endsWith('runtimeCheck.js'));
console.log(currentDirectoryPath.length > 0);
console.log(userArguments);
