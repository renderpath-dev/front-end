// Goal:
// Count page visits with a Map.

const pageVisitCounter = new Map();

function countPageVisit(pagePathText) {
  const previousVisitTotal = pageVisitCounter.get(pagePathText) ?? 0;
  const nextVisitTotal = previousVisitTotal + 1;

  pageVisitCounter.set(pagePathText, nextVisitTotal);

  return nextVisitTotal;
}

countPageVisit('/home');
countPageVisit('/docs');
countPageVisit('/home');

console.log(pageVisitCounter.get('/home'));
console.log(pageVisitCounter.get('/docs'));
