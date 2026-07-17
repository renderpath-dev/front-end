// Goal:
// Show that path methods do not access the file system.

import path from 'node:path';

const reportFilePath = path.join('generated-reports', 'summary.txt');

console.log(path.dirname(reportFilePath));
console.log(path.basename(reportFilePath));
console.log(path.extname(reportFilePath));
