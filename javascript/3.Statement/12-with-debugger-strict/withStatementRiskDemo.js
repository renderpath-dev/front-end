// Goal:
// Show why explicit property access is safer than with.

const invoiceContext = {
  taxRate: 0.08,
  subtotal: 100,
};

const total = invoiceContext.subtotal * (1 + invoiceContext.taxRate);

console.log(total);
