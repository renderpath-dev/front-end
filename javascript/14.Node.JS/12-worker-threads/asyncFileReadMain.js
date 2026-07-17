// Goal:
// Keep ordinary asynchronous I/O on the main event loop.

import { readFile } from 'node:fs/promises';

const fileText = await readFile('input.txt', 'utf8');

console.log(fileText.length > 0);
