// Goal:
// Verify that Set compares objects by reference identity.

const visitorRecordSet = new Set();

visitorRecordSet.add({ id: 1 });
visitorRecordSet.add({ id: 1 });

const firstVisitorRecord = { id: 2 };
visitorRecordSet.add(firstVisitorRecord);
visitorRecordSet.add(firstVisitorRecord);

console.log(visitorRecordSet.size);
