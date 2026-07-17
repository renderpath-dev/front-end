// Goal:
// Compare common path module methods.

import path from 'node:path';

const reportFilePath = path.join('reports', 'daily', 'summary.json');
const absoluteReportFilePath = path.resolve('reports', 'daily', 'summary.json');
const reportDirectoryPath = path.dirname(reportFilePath);
const reportFileName = path.basename(reportFilePath);
const reportFileExtension = path.extname(reportFilePath);
const parsedReportPath = path.parse(reportFilePath);

console.log(reportFilePath);
console.log(absoluteReportFilePath.endsWith(reportFilePath));
console.log(reportDirectoryPath);
console.log(reportFileName);
console.log(reportFileExtension);
console.log(parsedReportPath.name);
console.log(parsedReportPath.ext);
