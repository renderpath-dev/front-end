// Goal:
// Show that path.join only creates a string.

import path from 'node:path';

const filePath = path.join('folder-that-may-not-exist', 'notes.txt');

console.log(filePath);
console.log(typeof filePath);
