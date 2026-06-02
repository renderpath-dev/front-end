// Goal:
// Define an accessor property with get and set.

const cartState = {
  itemCount: 0,
};

Object.defineProperty(cartState, 'summary', {
  get() {
    return `items:${this.itemCount}`;
  },
  set(nextSummaryText) {
    const countText = nextSummaryText.split(':')[1];
    this.itemCount = Number(countText);
  },
  enumerable: true,
  configurable: true,
});

console.log(cartState.summary);
cartState.summary = 'items:5';
console.log(cartState.itemCount);
console.log(cartState.summary);
