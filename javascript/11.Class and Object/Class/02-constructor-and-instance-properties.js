'use strict';

// Goal:
// Show that constructor initializes instance own properties.
// Each instance has its own data, while prototype methods are shared.

class InventoryProductEntry {
  constructor(productCode, stockCount, unitPrice) {
    this.productCode = productCode;
    this.stockCount = stockCount;
    this.unitPrice = unitPrice;
  }

  calculateInventoryValue() {
    return this.stockCount * this.unitPrice;
  }
}

const keyboardInventoryEntry = new InventoryProductEntry('KEY-001', 12, 99);
const mouseInventoryEntry = new InventoryProductEntry('MOUSE-002', 30, 25);

console.log(keyboardInventoryEntry.calculateInventoryValue());
console.log(mouseInventoryEntry.calculateInventoryValue());
console.log(keyboardInventoryEntry.calculateInventoryValue === mouseInventoryEntry.calculateInventoryValue);
console.log(Object.keys(keyboardInventoryEntry));
console.log(Object.hasOwn(keyboardInventoryEntry, 'productCode'));
console.log(Object.hasOwn(keyboardInventoryEntry, 'calculateInventoryValue'));

// Local variables inside constructor are not instance properties.
class SessionTokenEnvelope {
  constructor(tokenValue) {
    const creationSource = 'constructor-local';

    this.tokenValue = tokenValue;
    this.createdAt = Date.now();

    console.log(creationSource);
  }

  readTokenValue() {
    return this.tokenValue;
  }
}

const sessionTokenEnvelope = new SessionTokenEnvelope('token-001');
console.log(sessionTokenEnvelope.readTokenValue());
console.log(sessionTokenEnvelope.creationSource);

// Default constructor parameters behave like normal function parameters.
class RetryLimitConfig {
  constructor(maxRetryCount = 3, retryDelayMs = 500) {
    this.maxRetryCount = maxRetryCount;
    this.retryDelayMs = retryDelayMs;
  }

  createRetryLabel() {
    return `${this.maxRetryCount} retries every ${this.retryDelayMs}ms`;
  }
}

const defaultRetryLimitConfig = new RetryLimitConfig();
const customRetryLimitConfig = new RetryLimitConfig(5, 1000);

console.log(defaultRetryLimitConfig.createRetryLabel());
console.log(customRetryLimitConfig.createRetryLabel());

// Constructor return rule:
// Returning an object replaces the newly created instance.
class ObjectReturningConstructorSample {
  constructor(inputLabel) {
    this.inputLabel = inputLabel;

    return {
      inputLabel: 'override-object',
      sourceType: 'explicit-object-return',
    };
  }
}

const objectReturnSample = new ObjectReturningConstructorSample('original-object');
console.log(objectReturnSample.inputLabel);
console.log(objectReturnSample.sourceType);
console.log(objectReturnSample instanceof ObjectReturningConstructorSample);

// Constructor return rule:
// Returning a primitive value is ignored.
class PrimitiveReturningConstructorSample {
  constructor(inputLabel) {
    this.inputLabel = inputLabel;

    return 123;
  }
}

const primitiveReturnSample = new PrimitiveReturningConstructorSample('original-primitive');
console.log(primitiveReturnSample.inputLabel);
console.log(primitiveReturnSample instanceof PrimitiveReturningConstructorSample);

// new.target identifies the constructor that was directly called with new.
class AbstractShapeTemplate {
  constructor(shapeLabel) {
    if (new.target === AbstractShapeTemplate) {
      throw new TypeError('AbstractShapeTemplate cannot be instantiated directly');
    }

    this.shapeLabel = shapeLabel;
  }
}

class RectangleShapeRecord extends AbstractShapeTemplate {
  constructor(shapeLabel, widthValue, heightValue) {
    super(shapeLabel);
    this.widthValue = widthValue;
    this.heightValue = heightValue;
  }

  calculateAreaValue() {
    return this.widthValue * this.heightValue;
  }
}

try {
  new AbstractShapeTemplate('base-shape');
} catch (caughtAbstractConstructorError) {
  console.log(caughtAbstractConstructorError.message);
}

const rectangleShapeRecord = new RectangleShapeRecord('panel', 10, 4);
console.log(rectangleShapeRecord.calculateAreaValue());
