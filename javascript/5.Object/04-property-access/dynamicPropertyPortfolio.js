// Goal:
// Use bracket access when the property name is known only at runtime.

const holdings = {};

function addShares(portfolioRecord, tickerSymbol, shareCount) {
  if (portfolioRecord[tickerSymbol] === undefined) {
    portfolioRecord[tickerSymbol] = 0;
  }

  portfolioRecord[tickerSymbol] += shareCount;
}

addShares(holdings, "AAPL", 12);
addShares(holdings, "MSFT", 5);
addShares(holdings, "AAPL", 3);

console.log(holdings.AAPL);
console.log(holdings.MSFT);
