// Goal:
// Track processed objects with WeakSet.

const processedRequestStore = new WeakSet();

function processRequestOnce(requestRecord) {
  if (processedRequestStore.has(requestRecord)) {
    return 'already-processed';
  }

  processedRequestStore.add(requestRecord);
  return 'processed-now';
}

const checkoutRequestRecord = { requestId: 101 };

console.log(processRequestOnce(checkoutRequestRecord));
console.log(processRequestOnce(checkoutRequestRecord));
