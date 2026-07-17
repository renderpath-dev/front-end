// Goal:
// Show common sources of undefined.

// Expected output:
// undefined
// undefined
// undefined

const orderRecord = { id: "o1" };

function saveDraft() {}

console.log(orderRecord.customerName);
console.log(saveDraft());
console.log(void 0);
