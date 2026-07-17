// Goal:
// Inspect process arguments, environment variables, and current working directory.

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const entryFilePath = process.argv[1];
const userArguments = process.argv.slice(2);
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = dirname(currentFilePath);
const currentWorkingDirectory = process.cwd();

const portText = process.env.PORT ?? '3000';
const portNumber = Number(portText);

console.log(process.argv[0].length > 0);
console.log(entryFilePath.endsWith('processBasics.js'));
console.log(userArguments);
console.log(Number.isInteger(portNumber));
console.log(currentFilePath.endsWith('processBasics.js'));
console.log(currentDirectoryPath.length > 0);
console.log(currentWorkingDirectory.length > 0);
console.log(globalThis.process === process);
