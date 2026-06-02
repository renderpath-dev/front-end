// Goal:
// Compare yielded values with generator return value.

function* createReportSectionGenerator() {
  yield 'summary';
  yield 'details';
  return 'report-complete';
}

const reportSectionGenerator = createReportSectionGenerator();

console.log(reportSectionGenerator.next());
console.log(reportSectionGenerator.next());
console.log(reportSectionGenerator.next());

for (const sectionName of createReportSectionGenerator()) {
  console.log(sectionName);
}
