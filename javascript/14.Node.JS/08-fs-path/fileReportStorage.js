// Goal:
// Write, read, and inspect a file with fs/promises and path.

import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const reportDirectory = 'generated-reports';
const reportFilePath = path.join(reportDirectory, 'summary.txt');

await mkdir(reportDirectory, { recursive: true });
await writeFile(reportFilePath, 'status:ok\ncount:3\n', 'utf8');

const reportText = await readFile(reportFilePath, 'utf8');
const reportStats = await stat(reportFilePath);

console.log(reportText.includes('status:ok'));
console.log(reportStats.isFile());
