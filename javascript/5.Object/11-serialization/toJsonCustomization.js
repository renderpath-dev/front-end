// Goal:
// Verify that JSON.stringify calls toJSON when it exists.

const invoiceRecord = {
  id: "INV-100",
  amount: 320,
  internalCost: 190,
  toJSON() {
    return {
      id: this.id,
      amount: this.amount,
    };
  },
};

console.log(JSON.stringify(invoiceRecord));
