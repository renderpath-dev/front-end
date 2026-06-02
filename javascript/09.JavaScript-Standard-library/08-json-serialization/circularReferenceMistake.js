// Goal:
// Verify that JSON.stringify cannot serialize circular references.

const circularOwnerRecord = { name: 'root' };
circularOwnerRecord.self = circularOwnerRecord;

JSON.stringify(circularOwnerRecord);
