// Goal:
// Verify that non-enumerable properties are hidden from Object.keys.

const reportRecord = {
  title: 'Revenue',
};

Object.defineProperty(reportRecord, 'internalCode', {
  value: 'R-2026',
  enumerable: false,
  writable: true,
  configurable: true,
});

console.log(reportRecord.internalCode);
console.log(Object.keys(reportRecord));
console.log('internalCode' in reportRecord);
