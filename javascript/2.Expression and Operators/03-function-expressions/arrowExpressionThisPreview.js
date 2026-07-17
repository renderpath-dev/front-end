// Goal:
// Preview why arrow functions should not be used as object methods needing this.

const invoiceRecord = {
  total: 120,
  describeWithMethod() {
    return `total:${this.total}`;
  },
  describeWithArrow: () => `total:${this.total}`,
};

console.log(invoiceRecord.describeWithMethod());

try {
  console.log(invoiceRecord.describeWithArrow());
} catch (error) {
  console.log(error.constructor.name);
}
