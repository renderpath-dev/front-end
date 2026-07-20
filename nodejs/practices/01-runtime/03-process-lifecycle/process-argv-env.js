'use strict';

const process = require('node:process');

const userArguments = process.argv.slice(2);
const learningMode = process.env.NODE_LEARNING_MODE ?? 'default';

console.log('Executable path:', process.argv[0]);
console.log('Entry script path:', process.argv[1]);
console.log('User arguments:', userArguments);
console.log('Learning mode:', learningMode);
