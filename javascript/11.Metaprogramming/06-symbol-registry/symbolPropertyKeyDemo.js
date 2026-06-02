// Goal:
// Store metadata with a symbol property key.

const internalStateKey = Symbol('internalState');

const widgetRecord = {
  id: 'search-box',
  [internalStateKey]: {
    focused: false,
  },
};

console.log(widgetRecord.id);
console.log(widgetRecord[internalStateKey].focused);
console.log(Object.keys(widgetRecord));
console.log(Object.getOwnPropertySymbols(widgetRecord).length);
