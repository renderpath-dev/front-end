// Goal:
// Use generators to represent an infinite sequence safely.

function* createTicketNumberGenerator(startNumber) {
  let nextTicketNumber = startNumber;

  while (true) {
    yield nextTicketNumber;
    nextTicketNumber += 1;
  }
}

function* takeItems(sourceIterable, limitCount) {
  let usedCount = 0;

  for (const sourceItem of sourceIterable) {
    if (usedCount >= limitCount) {
      return;
    }

    yield sourceItem;
    usedCount += 1;
  }
}

const ticketNumberGenerator = createTicketNumberGenerator(5000);
const firstTicketNumbers = takeItems(ticketNumberGenerator, 4);

for (const ticketNumber of firstTicketNumbers) {
  console.log(ticketNumber);
}
