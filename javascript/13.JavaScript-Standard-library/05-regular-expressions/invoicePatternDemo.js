// Goal:
// Extract year and month from an invoice code with RegExp.

const invoicePattern = /^INV-(\d{4})-(0[1-9]|1[0-2])$/;
const invoiceCandidateText = 'INV-2026-05';
const invoiceMatchResult = invoicePattern.exec(invoiceCandidateText);

if (invoiceMatchResult !== null) {
  const invoiceYearText = invoiceMatchResult[1];
  const invoiceMonthText = invoiceMatchResult[2];

  console.log(invoiceYearText);
  console.log(invoiceMonthText);
}
