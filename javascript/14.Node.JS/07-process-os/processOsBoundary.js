// Goal:
// Compare current process information with operating system information.

import os from 'node:os';
import process from 'node:process';

const memoryUsage = process.memoryUsage();
const totalMemoryInMegabytes = Math.round(os.totalmem() / 1024 / 1024);
const freeMemoryInMegabytes = Math.round(os.freemem() / 1024 / 1024);

console.log(process.arch);
console.log(process.pid > 0);
console.log(process.platform);
console.log(process.cwd().length > 0);
console.log(os.cpus());
console.log(totalMemoryInMegabytes > 0);
console.log(freeMemoryInMegabytes > 0);
console.log(memoryUsage.heapUsed);
