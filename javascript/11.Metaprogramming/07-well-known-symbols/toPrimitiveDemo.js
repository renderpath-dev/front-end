// Goal:
// Customize object-to-primitive conversion.

const invoiceRecord = {
  id: 'INV-001',
  amount: 120,
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return this.amount;
    }

    return this.id;
  },
};

console.log(Number(invoiceRecord));
console.log(String(invoiceRecord));
console.log(`${invoiceRecord}`);
