// Goal:
// Read process and operating system information.

import os from 'node:os';
import process from 'node:process';

console.log(process.platform.length > 0);
console.log(process.pid > 0);
console.log(os.cpus().length > 0);
console.log(os.totalmem() > 0);
