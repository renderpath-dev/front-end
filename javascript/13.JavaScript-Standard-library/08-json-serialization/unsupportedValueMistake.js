// Goal:
// Verify how unsupported values behave during JSON serialization.

const unsupportedValueRecord = {
  visibleName: 'toolbox',
  missingValue: undefined,
  calculateTotal: () => 10,
};

console.log(JSON.stringify(unsupportedValueRecord));
