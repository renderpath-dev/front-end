// Goal:
// Verify how Map entries() returns key-value pairs for iteration.

const pageVisitCounter = new Map();

pageVisitCounter.set('/home', 2);
pageVisitCounter.set('/docs', 1);
pageVisitCounter.set('/pricing', 3);

const entryIterator = pageVisitCounter.entries();

console.log(entryIterator.next().value);
console.log(entryIterator.next().value);
console.log(entryIterator.next().value);
console.log(entryIterator.next().done);

for (const [pagePathText, visitTotal] of pageVisitCounter.entries()) {
  console.log(`${pagePathText}: ${visitTotal}`);
}
