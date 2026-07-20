'use strict';

const fs = require('node:fs');
const os = require('node:os');
const process = require('node:process');

console.log('Node version:', process.version);
console.log('Platform:', `${process.platform}/${process.arch}`);
console.log('Available parallelism:', os.availableParallelism());
console.log('Current file exists:', fs.existsSync(__filename));
