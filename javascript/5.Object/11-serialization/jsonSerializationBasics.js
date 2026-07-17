// Goal:
// Verify which object properties are serialized by JSON.stringify.

const transactionRecord = {
  id: "TX-9",
  amount: 99,
  status: undefined,
  approved: true,
  createdAt: new Date("2026-05-01T10:00:00Z"),
  formatter() {
    return `${this.id}:${this.amount}`;
  },
};

const serializedRecord = JSON.stringify(transactionRecord);
const restoredRecord = JSON.parse(serializedRecord);

console.log(serializedRecord);
console.log(restoredRecord.createdAt);
console.log(typeof restoredRecord.createdAt);
console.log("status" in restoredRecord);
