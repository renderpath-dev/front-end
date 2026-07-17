// Goal:
// Compare for...in, Object.keys, Object.getOwnPropertyNames, Object.getOwnPropertySymbols, and Reflect.ownKeys.

const auditSymbol = Symbol("audit");
const baseRecord = {
  inheritedFlag: true,
};

const paymentRecord = Object.create(baseRecord);
paymentRecord.amount = 80;
paymentRecord.status = "paid";
paymentRecord[auditSymbol] = "A-1";

Object.defineProperty(paymentRecord, "internalNote", {
  value: "manual review",
  enumerable: false,
});

for (const key in paymentRecord) {
  console.log(`for-in:${key}`);
}

console.log(Object.keys(paymentRecord));
console.log(Object.getOwnPropertyNames(paymentRecord));
console.log(Object.getOwnPropertySymbols(paymentRecord).length);
console.log(Reflect.ownKeys(paymentRecord).length);
