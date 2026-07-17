// Goal:
// Show why nested callbacks become hard to maintain.

function loadAccount(callback) {
  setTimeout(() => {
    callback(null, { id: 1, plan: 'pro' });
  }, 10);
}

function loadInvoices(accountId, callback) {
  setTimeout(() => {
    callback(null, [{ id: 101, total: 300 }]);
  }, 10);
}

function loadPaymentStatus(invoiceId, callback) {
  setTimeout(() => {
    callback(null, { invoiceId, paid: true });
  }, 10);
}

loadAccount((accountError, accountRecord) => {
  if (accountError !== null) {
    console.error(accountError.message);
    return;
  }

  loadInvoices(accountRecord.id, (invoiceError, invoiceList) => {
    if (invoiceError !== null) {
      console.error(invoiceError.message);
      return;
    }

    loadPaymentStatus(invoiceList[0].id, (paymentError, paymentStatus) => {
      if (paymentError !== null) {
        console.error(paymentError.message);
        return;
      }

      console.log(paymentStatus.paid);
    });
  });
});
