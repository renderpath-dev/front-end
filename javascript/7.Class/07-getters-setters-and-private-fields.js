'use strict';

// Goal:
// Show accessors, private fields, private methods, static private fields,
// and runtime read-only properties in JavaScript.

// 1. Accessors and private instance fields.
class LedgerBalanceBox {
  #currentBalance;

  constructor(openingBalance) {
    this.#currentBalance = openingBalance;
  }

  get availableBalance() {
    return this.#currentBalance;
  }

  set adjustmentAmount(deltaAmount) {
    if (typeof deltaAmount !== 'number') {
      throw new TypeError('Adjustment must be a number');
    }

    this.#currentBalance += deltaAmount;
  }

  depositFunds(paymentAmount) {
    this.#currentBalance += paymentAmount;
    return this.#currentBalance;
  }
}

const ledgerBalanceBox = new LedgerBalanceBox(1000);

console.log(ledgerBalanceBox.availableBalance);
ledgerBalanceBox.adjustmentAmount = -150;
console.log(ledgerBalanceBox.depositFunds(300));
console.log(ledgerBalanceBox.availableBalance);
console.log(ledgerBalanceBox.currentBalance);

// 2. Private instance fields store per-instance private state.
class BankAccountRecord {
  #balanceAmount;

  constructor(initialBalance) {
    this.#balanceAmount = initialBalance;
  }

  getBalanceAmount() {
    return this.#balanceAmount;
  }
}

const checkingAccountRecord = new BankAccountRecord(500);
console.log(checkingAccountRecord.getBalanceAmount());

// 3. Private methods can hide internal helper logic.
class PaymentAmountNormalizer {
  #normalizeAmount(rawAmount) {
    const numericAmount = Number(rawAmount);

    if (!Number.isFinite(numericAmount)) {
      throw new TypeError('Amount must be finite');
    }

    return numericAmount;
  }

  createNormalizedLabel(rawAmount) {
    const normalizedAmount = this.#normalizeAmount(rawAmount);
    return `Amount: ${normalizedAmount}`;
  }
}

const paymentAmountNormalizer = new PaymentAmountNormalizer();
console.log(paymentAmountNormalizer.createNormalizedLabel('42'));

// 4. Static private fields store class-level private state.
class BankPolicyRegistry {
  static #minimumBalanceAmount = 100;

  static getMinimumBalanceAmount() {
    return BankPolicyRegistry.#minimumBalanceAmount;
  }
}

console.log(BankPolicyRegistry.getMinimumBalanceAmount());

class RetryPolicyRegistry {
  static #maxRetryCount = 3;

  static canRetry(attemptCount) {
    return attemptCount < RetryPolicyRegistry.#maxRetryCount;
  }
}

console.log(RetryPolicyRegistry.canRetry(2));
console.log(RetryPolicyRegistry.canRetry(3));

class ProductLabelCache {
  static #labelMap = new Map();

  static getLabel(productCode, displayTitle) {
    if (ProductLabelCache.#labelMap.has(productCode)) {
      return ProductLabelCache.#labelMap.get(productCode);
    }

    const generatedLabel = `${productCode}: ${displayTitle}`;

    ProductLabelCache.#labelMap.set(productCode, generatedLabel);

    return generatedLabel;
  }
}

console.log(ProductLabelCache.getLabel('P-001', 'Keyboard'));
console.log(ProductLabelCache.getLabel('P-001', 'Keyboard'));

class OrderNumberGenerator {
  static #nextSequenceValue = 1000;

  static createOrderNumber() {
    OrderNumberGenerator.#nextSequenceValue += 1;
    return `ORD-${OrderNumberGenerator.#nextSequenceValue}`;
  }
}

console.log(OrderNumberGenerator.createOrderNumber());
console.log(OrderNumberGenerator.createOrderNumber());

// 5. JavaScript has no readonly keyword.
// Use property descriptors for runtime read-only instance properties.
class InvoiceIdentifierRecord {
  constructor(invoiceId) {
    Object.defineProperty(this, 'invoiceId', {
      value: invoiceId,
      writable: false,
      enumerable: true,
      configurable: false,
    });
  }
}

const invoiceIdentifierRecord = new InvoiceIdentifierRecord('INV-001');
console.log(invoiceIdentifierRecord.invoiceId);

// Reflect.set avoids an editor diagnostic while still showing runtime behavior.
const invoiceIdUpdateSucceeded = Reflect.set(
  invoiceIdentifierRecord,
  'invoiceId',
  'INV-002',
);

console.log(invoiceIdUpdateSucceeded);
console.log(invoiceIdentifierRecord.invoiceId);

// 6. Object.freeze creates a shallow read-only object at runtime.
// The binding is const, but the read-only behavior comes from Object.freeze.
const dashboardConfigRecord = Object.freeze({
  layoutMode: 'grid',
  nestedOptions: {
    columnCount: 3,
  },
});

// Direct assignment may be flagged by the editor because Object.freeze returns a read-only type hint.
// Reflect.set shows that the write fails without making the file stop at that line.
const layoutModeUpdateSucceeded = Reflect.set(
  dashboardConfigRecord,
  'layoutMode',
  'list',
);

console.log(layoutModeUpdateSucceeded);

dashboardConfigRecord.nestedOptions.columnCount = 4;

console.log(dashboardConfigRecord.layoutMode);
console.log(dashboardConfigRecord.nestedOptions.columnCount);
