// Goal:
// Write, read, append, and inspect a file.

import { appendFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const reportDirectory = 'generated-reports';
const reportFilePath = path.join(reportDirectory, 'summary.txt');

await mkdir(reportDirectory, { recursive: true });
await writeFile(reportFilePath, 'status:ok\n', 'utf8');
await appendFile(reportFilePath, 'count:3\n', 'utf8');

const reportBuffer = await readFile(reportFilePath);
const reportText = await readFile(reportFilePath, 'utf8');
const reportStats = await stat(reportFilePath);

console.log(Buffer.isBuffer(reportBuffer));
console.log(reportText.includes('status:ok'));
console.log(reportStats.isFile());
console.log(reportStats.size === reportBuffer.length);
