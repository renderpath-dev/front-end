'use strict';

// Goal:
// Show that class syntax is built on top of the prototype model.
// A class creates a constructor function and a prototype object.

// Legacy constructor function style.
function LegacyCatalogConstructor(titleText, priceAmount) {
  this.titleText = titleText;
  this.priceAmount = priceAmount;
}

// Shared method stored on the constructor function's prototype object.
LegacyCatalogConstructor.prototype.formatCatalogLine = function () {
  return `${this.titleText}: ${this.priceAmount}`;
};

const legacyCatalogEntry = new LegacyCatalogConstructor('Keyboard', 99);

console.log(legacyCatalogEntry.formatCatalogLine());
console.log(Object.getPrototypeOf(legacyCatalogEntry) === LegacyCatalogConstructor.prototype);

// Modern class syntax for the same object model.
class CatalogItemRecord {
  constructor(titleText, priceAmount) {
    this.titleText = titleText;
    this.priceAmount = priceAmount;
  }

  getCatalogLabel() {
    return `${this.titleText}: ${this.priceAmount}`;
  }
}

const catalogItemRecord = new CatalogItemRecord('Keyboard', 50);

console.log(catalogItemRecord.getCatalogLabel());
console.log(typeof CatalogItemRecord);
console.log(Object.getPrototypeOf(catalogItemRecord) === CatalogItemRecord.prototype);
console.log(Object.hasOwn(catalogItemRecord, 'titleText'));
console.log(Object.hasOwn(catalogItemRecord, 'priceAmount'));
console.log(Object.hasOwn(catalogItemRecord, 'getCatalogLabel'));
console.log(Object.hasOwn(CatalogItemRecord.prototype, 'getCatalogLabel'));
console.log(typeof CatalogItemRecord.getCatalogLabel);
console.log(typeof catalogItemRecord.getCatalogLabel);

// Classes must be called with new.
try {
  CatalogItemRecord('Mouse', 25);
} catch (caughtClassCallError) {
  console.log(caughtClassCallError.name);
}

// Class declarations are block-scoped and are not usable before initialization.
try {
  new BlockScopedBadgeRecord('Before declaration');
} catch (caughtTemporalDeadZoneError) {
  console.log(caughtTemporalDeadZoneError.name);
}

class BlockScopedBadgeRecord {
  constructor(badgeText) {
    this.badgeText = badgeText;
  }

  readBadgeText() {
    return this.badgeText;
  }
}

const activeBadgeRecord = new BlockScopedBadgeRecord('Ready');
console.log(activeBadgeRecord.readBadgeText());

// Class expressions are useful when a class value is assigned to a variable.
const InlineMetricRecord = class {
  constructor(metricName, metricValue) {
    this.metricName = metricName;
    this.metricValue = metricValue;
  }

  formatMetricLine() {
    return `${this.metricName}: ${this.metricValue}`;
  }
};

const conversionMetricRecord = new InlineMetricRecord('conversionRate', 0.12);
console.log(conversionMetricRecord.formatMetricLine());
