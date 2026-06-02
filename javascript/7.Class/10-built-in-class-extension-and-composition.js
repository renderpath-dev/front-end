'use strict';

// Goal:
// Show when extending built-in classes is useful and when composition is cleaner.

class ScoreCollectionList extends Array {
  calculateScoreTotal() {
    return this.reduce(
      (totalScore, currentScore) => totalScore + currentScore,
      0,
    );
  }

  calculateScoreAverage() {
    return this.calculateScoreTotal() / this.length;
  }
}

const scoreCollectionList = new ScoreCollectionList(80, 90, 100);

console.log(scoreCollectionList.calculateScoreTotal());
console.log(scoreCollectionList.calculateScoreAverage());
console.log(scoreCollectionList instanceof Array);
console.log(scoreCollectionList instanceof ScoreCollectionList);

// Array methods may preserve the subclass type.
const curvedScoreCollectionList = scoreCollectionList.map(
  (scoreValue) => scoreValue + 5,
);

console.log(curvedScoreCollectionList instanceof ScoreCollectionList);
console.log(curvedScoreCollectionList instanceof Array);

// Symbol.species can force derived array methods to return plain arrays.
class PlainArrayScoreList extends Array {
  static get [Symbol.species]() {
    return Array;
  }

  calculatePlainTotal() {
    return this.reduce(
      (totalScore, currentScore) => totalScore + currentScore,
      0,
    );
  }
}

const plainArrayScoreList = new PlainArrayScoreList(10, 20, 30);
const mappedPlainScoreArray = plainArrayScoreList.map((scoreValue) => scoreValue * 2);

console.log(mappedPlainScoreArray instanceof PlainArrayScoreList);
console.log(mappedPlainScoreArray instanceof Array);

// Composition: the object owns an array instead of being an array.
class ShoppingCartBundle {
  constructor(cartItems) {
    this.cartItems = cartItems;
  }

  calculateCartTotal() {
    return this.cartItems.reduce((runningTotal, cartItem) => {
      return runningTotal + cartItem.priceAmount * cartItem.quantityCount;
    }, 0);
  }
}

const shoppingCartBundle = new ShoppingCartBundle([
  { priceAmount: 30, quantityCount: 2 },
  { priceAmount: 15, quantityCount: 4 },
]);

console.log(shoppingCartBundle.calculateCartTotal());

// Custom Error types are a common practical use of built-in inheritance.
class ApiResponseError extends Error {
  constructor(statusCode, responseMessage) {
    super(responseMessage);

    this.name = 'ApiResponseError';
    this.statusCode = statusCode;
  }

  createLogText() {
    return `${this.name} ${this.statusCode}: ${this.message}`;
  }
}

function fetchProductDetail() {
  throw new ApiResponseError(404, 'Resource not found');
}

try {
  fetchProductDetail();
} catch (caughtError) {
  console.log(caughtError instanceof Error);
  console.log(caughtError instanceof ApiResponseError);
  console.log(caughtError.createLogText());
}

// Extending Map is possible, but it exposes the whole Map API.
class FeatureFlagStore extends Map {
  isEnabled(flagName) {
    return this.get(flagName) === true;
  }
}

const checkoutFlagStore = new FeatureFlagStore();

checkoutFlagStore.set('newCheckout', true);

console.log(checkoutFlagStore.isEnabled('newCheckout'));
console.log(checkoutFlagStore instanceof Map);

// Composition gives you more control over the public API.
class FeatureToggleRegistry {
  constructor(flagEntries) {
    this.flagMap = new Map(flagEntries);
  }

  isFeatureEnabled(flagName) {
    return this.flagMap.get(flagName) === true;
  }

  updateFeatureFlag(flagName, enabledValue) {
    this.flagMap.set(flagName, enabledValue);
  }
}

const paymentToggleRegistry = new FeatureToggleRegistry([
  ['fastPayment', true],
]);

console.log(paymentToggleRegistry.isFeatureEnabled('fastPayment'));

// EventTarget inheritance is useful when an object should behave like an event source.
class UploadProgressEmitter extends EventTarget {
  updateProgress(percentValue) {
    const progressEvent = new Event('progresschange');
    progressEvent.percentValue = percentValue;

    this.dispatchEvent(progressEvent);
  }
}

const avatarUploadEmitter = new UploadProgressEmitter();

avatarUploadEmitter.addEventListener('progresschange', (progressEvent) => {
  console.log(progressEvent.percentValue);
});

avatarUploadEmitter.updateProgress(75);
