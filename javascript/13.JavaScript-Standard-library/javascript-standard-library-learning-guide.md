# JavaScript Standard Library Learning Guide

> Scope: JavaScript: The Definitive Guide, Chapter 11, plus MDN reference reading.  
> Goal: learn the standard library as working tools, not as isolated API names.

## 0. Clear conclusion first

JavaScript standard library learning should not start by memorizing every method. The correct learning order is:

1. Understand what kind of value each built-in object represents.
2. Understand what problem it solves compared with plain objects, arrays, strings, and functions.
3. Understand its runtime model: identity, iteration, mutation, serialization, time, encoding, or scheduling.
4. Write small utilities that force you to use the API in a realistic way.
5. Check MDN when you need exact method signatures, edge cases, compatibility, and examples.

This chapter is a bridge between language fundamentals and real front-end engineering. Earlier chapters taught values, objects, arrays, functions, classes, and modules. Chapter 11 teaches the built-in tools you will use to process data, validate text, format output, debug behavior, build URLs, and schedule work.

## 1. What "standard library" means

### Conclusion

The standard library is the set of built-in objects, constructors, namespace objects, and functions that JavaScript code can use without installing packages.

### Technical meaning

In JavaScript, the standard library includes things like `Map`, `Set`, `ArrayBuffer`, typed arrays, `RegExp`, `Date`, `Error`, `JSON`, and `Intl`.

Some APIs discussed in this chapter, such as `console`, `URL`, `URLSearchParams`, `setTimeout`, and `setInterval`, are not all part of the ECMAScript core language in the same strict sense. They are provided by browser or runtime environments and are widely available in both browsers and Node.js, so they are treated as practical JavaScript standard tools.

### Underlying mechanism

A built-in API is still ordinary JavaScript from your perspective:

- A constructor creates an object: `new Map()`, `new Date()`, `new URL()`.
- A namespace object groups static functions: `JSON.parse()`, `JSON.stringify()`, `Intl.NumberFormat`.
- A method operates on an instance: `cacheStore.set()`, `createdDate.getTime()`.
- Some APIs interact with the host environment: `console.log()`, `setTimeout()`.

The important mental shift is this: a built-in object has its own internal data model. A `Map` is not just an object with nicer syntax. A `Date` is not just a formatted string. A `URLSearchParams` object is not just a string after `?`.

### How it works in code

```js
const inventoryLookup = new Map();
inventoryLookup.set("keyboard", 12);
inventoryLookup.set("monitor", 4);

const requestedItemName = "keyboard";
const availableItemCount = inventoryLookup.get(requestedItemName);

console.log(availableItemCount);
```

Line by line:

1. `new Map()` creates a built-in map object with an internal key-value storage model.
2. `set("keyboard", 12)` stores a key-value pair.
3. `set("monitor", 4)` stores another key-value pair.
4. `requestedItemName` stores the lookup key.
5. `get(requestedItemName)` retrieves the value associated with that exact key.
6. `console.log()` sends the result to the debugging console.

### How it relates to your current learning topic

You have already learned modules. In real projects, modules often export functions that internally use standard library APIs. Standard library APIs are the tools inside your module implementation.

### Common mistake

Do not classify APIs only by syntax. `Map`, `Date`, `RegExp`, and `URL` all use object syntax, but their internal models are completely different.

### Final memory model

A standard library API is a built-in abstraction with its own data model and rules. Learn the model first, then memorize methods.

## 2. Learning path for Chapter 11

Study in this order:

1. `Set`, `Map`, `WeakSet`, `WeakMap`
2. `ArrayBuffer`, typed arrays, `DataView`
3. `RegExp` and string pattern methods
4. `Date` and timestamps
5. `Error` and custom error handling
6. `JSON.parse()` and `JSON.stringify()`
7. `Intl` formatting APIs
8. `console` debugging APIs
9. `URL` and `URLSearchParams`
10. `setTimeout()` and `setInterval()`

Why this order works:

- Collections come first because they extend your existing knowledge of arrays and objects.
- Binary data comes next because it shows that JavaScript values can represent raw memory-oriented data.
- Regular expressions and JSON are everyday data-processing tools.
- Date, Intl, URL, and timers connect language knowledge to real front-end use cases.
- console and Error support debugging and maintainability across all other topics.

## 3. Collections: `Set` and `Map`

## 3.1 `Set`

### Conclusion

Use `Set` when the main requirement is uniqueness.

### Technical meaning

A `Set` stores unique values. The values can be primitives or object references. It remembers insertion order during iteration.

### Underlying mechanism

A `Set` does not store values by numeric index like an array. It stores values by membership. The central question is not "what is at position 2?" but "does this collection contain this value?"

For primitives, uniqueness is based on value equality. For objects, uniqueness is based on object reference identity.

### How it works in code

```js
const tagCollection = new Set();

tagCollection.add("javascript");
tagCollection.add("frontend");
tagCollection.add("javascript");

const uniqueTagCount = tagCollection.size;
const hasFrontendTag = tagCollection.has("frontend");

console.log(uniqueTagCount);
console.log(hasFrontendTag);
```

Line by line:

1. `new Set()` creates an empty set.
2. The first `add()` inserts the string.
3. The second `add()` inserts another string.
4. The third `add()` attempts to insert a duplicate. The set still contains only one `"javascript"` value.
5. `size` returns the number of unique values.
6. `has()` checks membership.

### Practice task

Write a function that receives an array of product category strings and returns an array with duplicates removed while preserving first-seen order.

```js
function createUniqueCategoryList(categoryItems) {
  const categorySet = new Set(categoryItems);
  return Array.from(categorySet);
}

const categoryResultList = createUniqueCategoryList([
  "books",
  "games",
  "books",
  "tools",
]);

console.log(categoryResultList);
```

### Common mistake

Do not expect `Set` to remove duplicate objects that only look the same.

```js
const visitorRecordSet = new Set();

visitorRecordSet.add({ id: 1 });
visitorRecordSet.add({ id: 1 });

console.log(visitorRecordSet.size);
```

The output is `2`, because the two object literals create two different object references.

### Final memory model

A `Set` is a membership collection. It answers: "Have I seen this exact value before?"

## 3.2 `Map`

### Conclusion

Use `Map` when keys are data, not property names.

### Technical meaning

A `Map` stores key-value pairs. Unlike ordinary object property names, map keys can be values of any type, including objects, functions, numbers, strings, and symbols.

### Underlying mechanism

A plain object stores properties under property keys. Most property keys are strings or symbols. A `Map` stores entries under actual key values. This difference matters when keys are objects or when keys should not collide with inherited object properties.

### How it works in code

```js
const pageVisitCounter = new Map();

function countPageVisit(pagePathText) {
  const previousVisitTotal = pageVisitCounter.get(pagePathText) ?? 0;
  const nextVisitTotal = previousVisitTotal + 1;
  pageVisitCounter.set(pagePathText, nextVisitTotal);
  return nextVisitTotal;
}

countPageVisit("/home");
countPageVisit("/docs");
countPageVisit("/home");

console.log(pageVisitCounter.get("/home"));
```

Line by line:

1. `pageVisitCounter` stores page path strings as keys and visit counts as values.
2. `get(pagePathText)` reads the old count.
3. `?? 0` uses `0` only when the old value is `null` or `undefined`.
4. The new count is calculated.
5. `set()` writes the updated count back into the map.
6. The function returns the new count.

### Practice task

Build a word-frequency counter using `Map`.

```js
function createWordFrequencyTable(sentenceText) {
  const frequencyTable = new Map();
  const wordTokens = sentenceText.toLowerCase().split(/\s+/);

  for (const wordToken of wordTokens) {
    const currentWordCount = frequencyTable.get(wordToken) ?? 0;
    frequencyTable.set(wordToken, currentWordCount + 1);
  }

  return frequencyTable;
}

const articleWordTable = createWordFrequencyTable("JS modules JS runtime JS");
console.log(articleWordTable.get("js"));
```

### Common mistake

Do not use bracket syntax with `Map`.

```js
const brokenPreferenceMap = new Map();

brokenPreferenceMap["theme"] = "dark";

console.log(brokenPreferenceMap.get("theme"));
```

This prints `undefined` because bracket syntax creates a normal object property on the map object. It does not create a map entry. Use `set()` and `get()`.

### Final memory model

A `Map` is a key-value collection where keys are real values, not converted property names.

## 3.3 `WeakMap` and `WeakSet`

### Conclusion

Use `WeakMap` and `WeakSet` when object association should not prevent garbage collection.

### Technical meaning

`WeakMap` keys must be objects or non-registered symbols. `WeakSet` values must be objects or non-registered symbols. The collection holds those object references weakly, so the collection does not keep an otherwise unreachable object alive.

### Underlying mechanism

A normal `Map` strongly references its keys and values. If a key object is inside a `Map`, the engine must keep it reachable through that map. A `WeakMap` does not expose enumeration because the garbage collector may remove entries at any time after the key becomes unreachable elsewhere.

### How it works in code

```js
const elementMetadataStore = new WeakMap();

function attachElementMetadata(domElementObject, metadataRecord) {
  elementMetadataStore.set(domElementObject, metadataRecord);
}

function readElementMetadata(domElementObject) {
  return elementMetadataStore.get(domElementObject);
}

const simulatedButtonNode = { nodeName: "BUTTON" };
attachElementMetadata(simulatedButtonNode, { role: "submit-control" });

console.log(readElementMetadata(simulatedButtonNode));
```

### Common mistake

Do not try to iterate a `WeakMap`.

```js
const privateStateStore = new WeakMap();

console.log(typeof privateStateStore.keys);
```

There is no `keys()` method because exposing keys would conflict with garbage-collection behavior.

### Final memory model

A `WeakMap` is private object-associated storage that does not keep the object alive by itself.

## 4. Binary data: `ArrayBuffer`, typed arrays, and `DataView`

### Conclusion

Use `ArrayBuffer` for raw bytes, typed arrays for numeric views over those bytes, and `DataView` when you need precise byte-level reading and writing.

### Technical meaning

An `ArrayBuffer` is a fixed-length block of binary memory. You cannot directly read or write its bytes. You need a view: a typed array such as `Uint8Array`, `Int16Array`, `Float32Array`, or a `DataView`.

### Underlying mechanism

The buffer owns bytes. The view decides how to interpret those bytes.

One buffer can have multiple views:

- `Uint8Array` sees each byte as an unsigned 8-bit integer.
- `Int16Array` sees pairs of bytes as signed 16-bit integers.
- `Float32Array` sees four-byte groups as 32-bit floating-point numbers.
- `DataView` lets you choose type, byte offset, and endianness per operation.

### How it works in code

```js
const packetBuffer = new ArrayBuffer(8);
const packetBytesView = new Uint8Array(packetBuffer);
const packetNumberView = new DataView(packetBuffer);

packetBytesView[0] = 255;
packetBytesView[1] = 16;
packetNumberView.setUint16(2, 4096, false);

console.log(packetBytesView[0]);
console.log(packetNumberView.getUint16(2, false));
```

Line by line:

1. `new ArrayBuffer(8)` allocates 8 bytes.
2. `new Uint8Array(packetBuffer)` creates a byte-level numeric view.
3. `new DataView(packetBuffer)` creates a flexible binary view.
4. Writing `255` stores one byte.
5. Writing `16` stores another byte.
6. `setUint16(2, 4096, false)` writes a 16-bit unsigned integer starting at byte offset `2` using big-endian order.
7. `getUint16(2, false)` reads the same two bytes using the same endianness.

### Practice task

Create a binary header with a version byte and a status code.

```js
function createMessageHeader(versionNumber, statusCodeNumber) {
  const headerStorage = new ArrayBuffer(4);
  const headerWriter = new DataView(headerStorage);

  headerWriter.setUint8(0, versionNumber);
  headerWriter.setUint16(1, statusCodeNumber, false);

  return headerStorage;
}

const responseHeaderBuffer = createMessageHeader(2, 201);
const responseHeaderReader = new DataView(responseHeaderBuffer);

console.log(responseHeaderReader.getUint8(0));
console.log(responseHeaderReader.getUint16(1, false));
```

### Common mistake

Do not confuse buffer length with element length.

```js
const coordinateBuffer = new ArrayBuffer(16);
const coordinateFloatView = new Float32Array(coordinateBuffer);

console.log(coordinateBuffer.byteLength);
console.log(coordinateFloatView.length);
```

The buffer has 16 bytes. The `Float32Array` has 4 elements because each `Float32` element uses 4 bytes.

### Final memory model

The buffer is storage. The view is interpretation.

## 5. Regular expressions: `RegExp`

### Conclusion

Use `RegExp` when you need pattern-based text matching, extraction, replacement, or splitting.

### Technical meaning

A regular expression is a pattern object. JavaScript exposes it through literal syntax like `/pattern/flags` and through the `RegExp` constructor.

### Underlying mechanism

A regular expression pattern is compiled into a matcher. The matcher walks through text and tries to match according to tokens, quantifiers, groups, character classes, anchors, and flags.

Important flags:

| Flag | Meaning |
|---|---|
| `g` | global search |
| `i` | ignore case |
| `m` | multiline anchors |
| `s` | dot matches line terminators |
| `u` | Unicode-aware matching |
| `y` | sticky search |
| `d` | match indices |

### How it works in code

```js
const invoicePattern = /^INV-(\d{4})-(\d{2})$/;
const invoiceCandidateText = "INV-2026-05";
const invoiceMatchResult = invoicePattern.exec(invoiceCandidateText);

if (invoiceMatchResult !== null) {
  const invoiceYearText = invoiceMatchResult[1];
  const invoiceMonthText = invoiceMatchResult[2];
  console.log(invoiceYearText);
  console.log(invoiceMonthText);
}
```

Line by line:

1. `^` anchors the pattern to the start of the string.
2. `INV-` matches literal text.
3. `(\d{4})` captures four digits.
4. `-` matches the separator.
5. `(\d{2})` captures two digits.
6. `$` anchors the pattern to the end of the string.
7. `exec()` returns match details or `null`.
8. Capture group results are stored at indexes `1` and `2`.

### Dynamic pattern construction

Use the `RegExp` constructor when the pattern depends on runtime input. Escape user-provided text before placing it inside a regular expression.

```js
const searchKeywordText = "price.plus";
const escapedKeywordText = RegExp.escape(searchKeywordText);
const keywordPattern = new RegExp(escapedKeywordText, "i");

console.log(keywordPattern.test("The field is price.plus"));
```

`RegExp.escape()` is a modern API. Check MDN compatibility before using it in older target environments.

### Common mistake: stateful `g` with `test()`

```js
const repeatedDigitPattern = /\d/g;

console.log(repeatedDigitPattern.test("a1"));
console.log(repeatedDigitPattern.test("a1"));
```

With the `g` flag, the regular expression has a mutable `lastIndex`. Reusing the same regex object can produce alternating-looking results. Remove `g` for simple boolean validation.

### Practice task

Validate a simple product code format: three uppercase letters, a hyphen, and four digits.

```js
function isValidProductCode(productCodeText) {
  const productCodePattern = /^[A-Z]{3}-\d{4}$/;
  return productCodePattern.test(productCodeText);
}

console.log(isValidProductCode("ABC-1234"));
console.log(isValidProductCode("abc-1234"));
```

### Final memory model

A regular expression is a small pattern program for text.

## 6. Dates and time: `Date`

### Conclusion

A `Date` object represents one instant in time internally as a timestamp, not as a calendar string.

### Technical meaning

JavaScript dates are based on milliseconds since the Unix epoch: `1970-01-01T00:00:00.000Z`. The same timestamp can be displayed differently in different time zones.

### Underlying mechanism

A `Date` object stores a numeric timestamp. Methods either read or modify that timestamp. Some methods interpret the timestamp in local time. Other methods interpret it in UTC.

Examples of local-time methods:

- `getFullYear()`
- `getMonth()`
- `getDate()`
- `getHours()`

Examples of UTC methods:

- `getUTCFullYear()`
- `getUTCMonth()`
- `getUTCDate()`
- `getUTCHours()`

### How it works in code

```js
const releaseDate = new Date("2026-05-12T18:30:00Z");
const releaseTimestamp = releaseDate.getTime();
const releaseIsoText = releaseDate.toISOString();

console.log(releaseTimestamp);
console.log(releaseIsoText);
```

Line by line:

1. The string includes `Z`, so it means UTC time.
2. `getTime()` returns milliseconds since the epoch.
3. `toISOString()` returns a UTC ISO string.

### Date mutation

```js
const trialStartDate = new Date("2026-05-01T00:00:00Z");
trialStartDate.setUTCDate(trialStartDate.getUTCDate() + 14);

console.log(trialStartDate.toISOString());
```

`Date` methods with `set` mutate the existing object. This is different from string methods, which usually return a new string.

### Common mistake: month is zero-based

```js
const confusingMonthDate = new Date(2026, 4, 12);

console.log(confusingMonthDate.getMonth());
```

The month argument `4` means May, because month numbers start at `0` for January.

### Common mistake: date parsing ambiguity

Prefer explicit ISO date-time strings with time zone information.

```js
const stableTimestampDate = new Date("2026-05-12T00:00:00Z");

console.log(stableTimestampDate.toISOString());
```

Avoid relying on implementation-specific parsing of informal date strings.

### Final memory model

A `Date` is a timestamp object with local-time and UTC accessor methods.

## 7. Errors: `Error` and subclasses

### Conclusion

Use `Error` objects to represent exceptional failure with a message, a name, optional cause data, and a stack trace when the runtime provides it.

### Technical meaning

JavaScript has built-in error constructors such as `Error`, `TypeError`, `RangeError`, `ReferenceError`, `SyntaxError`, `URIError`, and `AggregateError`.

### Underlying mechanism

Throwing an error interrupts normal control flow. The runtime searches for the nearest matching `catch` block up the call stack. If no handler catches it, the program or task reports an unhandled error.

### How it works in code

```js
function parseRequiredQuantity(quantityText) {
  const parsedQuantity = Number(quantityText);

  if (!Number.isInteger(parsedQuantity)) {
    throw new TypeError("Quantity must be an integer");
  }

  if (parsedQuantity <= 0) {
    throw new RangeError("Quantity must be greater than zero");
  }

  return parsedQuantity;
}

try {
  const acceptedQuantity = parseRequiredQuantity("0");
  console.log(acceptedQuantity);
} catch (caughtQuantityError) {
  console.error(caughtQuantityError.name);
  console.error(caughtQuantityError.message);
}
```

Line by line:

1. `Number(quantityText)` converts input to a number.
2. If it is not an integer, a `TypeError` is thrown.
3. If it is out of allowed range, a `RangeError` is thrown.
4. `try` runs code that may fail.
5. `catch` receives the thrown value.
6. `name` identifies the error class.
7. `message` describes the failure.

### Error cause

Use `cause` when rethrowing a higher-level error while preserving the original failure.

```js
function loadSettingsRecord(settingsText) {
  try {
    return JSON.parse(settingsText);
  } catch (settingsParseError) {
    throw new Error("Settings data could not be parsed", {
      cause: settingsParseError,
    });
  }
}

try {
  loadSettingsRecord("{broken-json");
} catch (settingsLoadError) {
  console.error(settingsLoadError.message);
  console.error(settingsLoadError.cause instanceof SyntaxError);
}
```

### Custom error class

```js
class MissingFieldError extends Error {
  constructor(fieldNameText) {
    super(`Missing field: ${fieldNameText}`);
    this.name = "MissingFieldError";
    this.fieldName = fieldNameText;
  }
}

function requireProfileField(profileRecord, requiredFieldName) {
  if (!(requiredFieldName in profileRecord)) {
    throw new MissingFieldError(requiredFieldName);
  }

  return profileRecord[requiredFieldName];
}

try {
  requireProfileField({ username: "river" }, "email");
} catch (profileFieldError) {
  console.error(profileFieldError.name);
  console.error(profileFieldError.fieldName);
}
```

### Common mistake

Do not throw plain strings in production-quality code.

```js
throw new Error("Request failed");
```

An `Error` object carries structured information. A plain string does not naturally provide the same debugging model.

### Final memory model

An error object is a failure value designed for control flow, debugging, and failure classification.

## 8. JSON serialization and parsing

### Conclusion

Use `JSON.stringify()` to serialize JavaScript data to JSON text, and `JSON.parse()` to parse JSON text into JavaScript values.

### Technical meaning

JSON is a data interchange format. It supports objects, arrays, strings, numbers, booleans, and `null`. It does not support functions, `undefined`, symbols, `BigInt`, `Map`, `Set`, or circular references directly.

### Underlying mechanism

`JSON.stringify()` walks a value tree and produces text. `JSON.parse()` reads text and builds a value tree.

The JSON data model is smaller than the JavaScript value model. That mismatch explains most JSON surprises.

### How it works in code

```js
const userProfileRecord = {
  username: "river",
  active: true,
  score: 42,
  preferences: ["dark-mode", "compact-layout"],
};

const userProfileJsonText = JSON.stringify(userProfileRecord);
const restoredProfileRecord = JSON.parse(userProfileJsonText);

console.log(userProfileJsonText);
console.log(restoredProfileRecord.preferences[0]);
```

Line by line:

1. The object contains JSON-compatible values.
2. `JSON.stringify()` converts it to text.
3. `JSON.parse()` converts the text back to a new JavaScript value.
4. The restored object is not the same object reference as the original.

### Replacer

```js
const accountRecord = {
  id: 7,
  email: "user@example.com",
  passwordHash: "hidden-value",
};

const publicAccountJsonText = JSON.stringify(accountRecord, ["id", "email"]);

console.log(publicAccountJsonText);
```

The replacer array allows only selected properties.

### Reviver

```js
const eventJsonText = '{"name":"launch","createdAt":"2026-05-12T00:00:00.000Z"}';

const eventRecord = JSON.parse(eventJsonText, (propertyName, propertyValue) => {
  if (propertyName === "createdAt") {
    return new Date(propertyValue);
  }

  return propertyValue;
});

console.log(eventRecord.createdAt instanceof Date);
```

The reviver function transforms parsed values before the final object is returned.

### Common mistake: unsupported values

```js
const unsupportedValueRecord = {
  visibleName: "toolbox",
  missingValue: undefined,
  calculateTotal: () => 10,
};

console.log(JSON.stringify(unsupportedValueRecord));
```

Properties with `undefined` and function values are omitted from objects during serialization.

### Common mistake: circular reference

```js
const circularOwnerRecord = { name: "root" };
circularOwnerRecord.self = circularOwnerRecord;

JSON.stringify(circularOwnerRecord);
```

This throws a `TypeError` because ordinary JSON cannot represent circular object graphs.

### Final memory model

JSON is not "JavaScript object as text". JSON is a smaller data format that JavaScript can read and write.

## 9. Internationalization: `Intl`

### Conclusion

Use `Intl` for user-visible formatting and locale-sensitive comparison. Do not manually format currency, dates, or locale-specific strings when `Intl` can do it.

### Technical meaning

The `Intl` namespace exposes constructors for language-sensitive operations, including number formatting, date-time formatting, relative time formatting, plural rules, list formatting, and string collation.

### Underlying mechanism

Internationalization is not only translation. It includes rules for:

- decimal separators
- currency symbols
- percent formatting
- date order
- time zones
- plural categories
- alphabetic sorting

The same value can be displayed differently depending on locale and options.

### Number formatting

```js
const cartTotalAmount = 1299.5;
const usdCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

console.log(usdCurrencyFormatter.format(cartTotalAmount));
```

### Date-time formatting

```js
const webinarStartDate = new Date("2026-05-12T15:00:00Z");
const londonDateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Europe/London",
});

console.log(londonDateFormatter.format(webinarStartDate));
```

### Locale-sensitive comparison

```js
const sortedCityNames = ["Zürich", "Amsterdam", "Ålesund"].sort(
  new Intl.Collator("de-DE").compare,
);

console.log(sortedCityNames);
```

### Common mistake

Do not format currency by concatenating strings.

```js
const rawPaymentAmount = 99.9;
const badPaymentLabel = "$" + rawPaymentAmount;

console.log(badPaymentLabel);
```

This ignores locale, currency rules, rounding behavior, and display conventions.

### Final memory model

`Intl` converts values into user-facing language-aware strings.

## 10. Console API

### Conclusion

Use `console` for debugging and inspection, not for program behavior.

### Technical meaning

The `console` object exposes methods such as `log`, `warn`, `error`, `table`, `group`, `time`, `timeEnd`, and `trace`.

### Underlying mechanism

`console` sends diagnostic information to the runtime's debugging interface. Browser developer tools and Node terminals may display the same console call differently.

### How it works in code

```js
const orderRows = [
  { sku: "KB-01", quantity: 2, price: 80 },
  { sku: "MS-02", quantity: 1, price: 40 },
];

console.group("Order inspection");
console.table(orderRows);
console.time("order-total");

const orderTotalValue = orderRows.reduce((runningTotal, orderRow) => {
  return runningTotal + orderRow.quantity * orderRow.price;
}, 0);

console.timeEnd("order-total");
console.log(orderTotalValue);
console.groupEnd();
```

Line by line:

1. `console.group()` groups related output.
2. `console.table()` displays array-of-object data in tabular form.
3. `console.time()` starts a named timer.
4. `reduce()` calculates a total.
5. `console.timeEnd()` stops the named timer and prints elapsed time.
6. `console.groupEnd()` closes the group.

### Common mistake

Do not use `console.log()` as a substitute for understanding data flow. Use it to inspect a hypothesis.

Bad debugging question:

```js
console.log(everythingRecord);
```

Better debugging question:

```js
console.log("selected-user-id", selectedUserIdValue);
console.log("has-cache-entry", userCacheMap.has(selectedUserIdValue));
```

### Final memory model

The console is an observation tool. It should help you inspect runtime state, not become part of application logic.

## 11. URL and `URLSearchParams`

### Conclusion

Use `URL` and `URLSearchParams` to parse, build, normalize, and encode URLs. Avoid manual string concatenation for query parameters.

### Technical meaning

A URL is structured data: protocol, origin, hostname, path, search parameters, hash, username, password, and port. `URL` exposes those parts as properties. `URLSearchParams` manages the query string.

### Underlying mechanism

When you create a `URL` object, the runtime parses the string into URL components. When you modify a component, the URL object serializes itself back into a valid URL string.

### How it works in code

```js
const productSearchUrl = new URL("https://example.com/products");
productSearchUrl.searchParams.set("category", "books");
productSearchUrl.searchParams.set("sort", "price asc");
productSearchUrl.hash = "results";

console.log(productSearchUrl.toString());
```

Line by line:

1. `new URL()` parses the base URL.
2. `searchParams.set()` adds or replaces a query parameter.
3. Spaces and special characters are encoded correctly.
4. `hash` sets the fragment.
5. `toString()` returns the serialized URL.

### Reading query parameters

```js
const incomingArticleUrl = new URL("https://example.com/read?id=42&mode=print");
const articleIdText = incomingArticleUrl.searchParams.get("id");
const articleModeText = incomingArticleUrl.searchParams.get("mode");

console.log(articleIdText);
console.log(articleModeText);
```

`get()` returns strings or `null`. Convert values manually when you need numbers or booleans.

### Common mistake

Do not build query strings with raw interpolation.

```js
const unsafeSearchText = "front end & JavaScript";
const unsafeSearchUrl = "https://example.com/search?q=" + unsafeSearchText;

console.log(unsafeSearchUrl);
```

This fails to encode `&` correctly as query data. Use `URLSearchParams` instead.

### Final memory model

A URL is structured data. Treat it as structured data, not as a string puzzle.

## 12. Timers: `setTimeout()` and `setInterval()`

### Conclusion

Timers schedule future callback execution. They do not pause the current JavaScript code.

### Technical meaning

`setTimeout()` schedules one callback after a delay. `setInterval()` schedules repeated callbacks. `clearTimeout()` and `clearInterval()` cancel scheduled timer work.

### Underlying mechanism

The host environment owns the timer system. When the delay expires, the callback becomes eligible to run. It does not run while the current call stack is busy. A delay is a minimum scheduling delay, not an exact execution guarantee.

### How it works in code

```js
console.log("sync-start");

const reminderTimerId = setTimeout(() => {
  console.log("timer-callback");
}, 0);

console.log("sync-end");
clearTimeout(reminderTimerId);
```

Line by line:

1. `"sync-start"` logs immediately.
2. `setTimeout()` schedules a callback.
3. The callback does not run before the current synchronous code finishes.
4. `"sync-end"` logs immediately.
5. `clearTimeout()` cancels the timer if it has not already executed.

### Repeated timer

```js
let heartbeatCount = 0;

const heartbeatIntervalId = setInterval(() => {
  heartbeatCount += 1;
  console.log("heartbeat", heartbeatCount);

  if (heartbeatCount === 3) {
    clearInterval(heartbeatIntervalId);
  }
}, 1000);
```

### Safer repeated async pattern

When repeated work may take variable time, recursive `setTimeout()` is often easier to control than `setInterval()`.

```js
let pollingAttemptCount = 0;

function schedulePollingAttempt() {
  pollingAttemptCount += 1;
  console.log("poll", pollingAttemptCount);

  if (pollingAttemptCount < 3) {
    setTimeout(schedulePollingAttempt, 1000);
  }
}

setTimeout(schedulePollingAttempt, 1000);
```

### Common mistake

Do not expect `setTimeout(callback, 0)` to run immediately. It runs only after the current synchronous execution finishes and the runtime gets a chance to process scheduled tasks.

### Final memory model

A timer registers a callback for later. It does not block, sleep, or pause the current code.

## 13. Cross-topic integration example

### Goal

Use multiple Chapter 11 APIs together: `URL`, `URLSearchParams`, `Map`, `JSON`, `Date`, `Intl`, `RegExp`, `Error`, and `console`.

```js
const analyticsUrl = new URL("https://example.com/track?event=purchase&amount=1299.5");
const analyticsEventPattern = /^[a-z]+$/;
const analyticsEventName = analyticsUrl.searchParams.get("event");
const analyticsAmountText = analyticsUrl.searchParams.get("amount");

if (analyticsEventName === null || !analyticsEventPattern.test(analyticsEventName)) {
  throw new Error("Invalid analytics event name");
}

const analyticsAmountValue = Number(analyticsAmountText);

if (!Number.isFinite(analyticsAmountValue)) {
  throw new TypeError("Analytics amount must be numeric");
}

const analyticsPayloadMap = new Map();
analyticsPayloadMap.set("event", analyticsEventName);
analyticsPayloadMap.set("amount", analyticsAmountValue);
analyticsPayloadMap.set("createdAt", new Date().toISOString());

const analyticsFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const analyticsPayloadRecord = Object.fromEntries(analyticsPayloadMap);
const analyticsPayloadJson = JSON.stringify(analyticsPayloadRecord);

console.table([analyticsPayloadRecord]);
console.log(analyticsFormatter.format(analyticsAmountValue));
console.log(analyticsPayloadJson);
```

What this example shows:

1. `URL` parses structured URL data.
2. `URLSearchParams` reads query parameters safely.
3. `RegExp` validates text format.
4. `Error` and `TypeError` classify invalid input.
5. `Number.isFinite()` validates numeric conversion.
6. `Map` stores structured key-value data.
7. `Date` creates a timestamp.
8. `Intl.NumberFormat` formats user-facing currency.
9. `Object.fromEntries()` converts map entries into a plain object.
10. `JSON.stringify()` serializes data.
11. `console.table()` and `console.log()` inspect output.

## 14. Common mistake summary

| Topic | Mistake | Correct model |
|---|---|---|
| `Set` | Expecting duplicate object literals to collapse | Object uniqueness uses reference identity |
| `Map` | Using bracket syntax | Use `set()`, `get()`, `has()`, `delete()` |
| `WeakMap` | Trying to iterate keys | Weak collections are not enumerable |
| Typed arrays | Confusing bytes with elements | Buffer stores bytes; view defines element interpretation |
| `RegExp` | Reusing `g` regex with `test()` carelessly | `g` changes `lastIndex` |
| `Date` | Treating dates as strings | Date stores a timestamp |
| `Date` | Forgetting zero-based months | Month `0` is January |
| `Error` | Throwing strings | Throw `Error` objects |
| `JSON` | Expecting full JavaScript value support | JSON is a smaller data format |
| `Intl` | Manually formatting currency or dates | Use locale-aware formatters |
| `console` | Depending on console output for app behavior | Console is only diagnostic output |
| `URL` | Manually concatenating query strings | Use `URLSearchParams` |
| Timers | Expecting exact timing | Delay is a scheduling minimum |

## 15. Exercises

### Exercise 1: Unique category utility

Write `buildCategorySummary()`:

Input:

```js
const categoryInputList = ["book", "tool", "book", "game", "tool"];
```

Expected output:

```js
{
  uniqueCategories: ["book", "tool", "game"],
  uniqueCount: 3
}
```

Required APIs: `Set`, `Array.from()`.

### Exercise 2: Frequency table

Write `countSearchTerms()` that receives a search query string and returns a `Map` where each lowercase word maps to its occurrence count.

Required APIs: `Map`, `String.prototype.toLowerCase()`, `String.prototype.split()`.

### Exercise 3: Binary header reader

Create an `ArrayBuffer` of 6 bytes. Store:

- byte 0: version
- byte 1: flag
- bytes 2-5: unsigned 32-bit request id

Then read all values back.

Required APIs: `ArrayBuffer`, `DataView`.

### Exercise 4: Product code validation

Validate this format:

- two uppercase letters
- hyphen
- four digits
- hyphen
- one uppercase letter

Valid: `AB-1234-Z`  
Invalid: `ab-1234-z`

Required API: `RegExp`.

### Exercise 5: Date range formatter

Write a function that receives two ISO date strings and returns an object:

```js
{
  startTimestamp: 0,
  endTimestamp: 0,
  durationMs: 0
}
```

Required APIs: `Date`, `getTime()`.

### Exercise 6: Error wrapping

Write `parseConfigJson()` that:

1. Calls `JSON.parse()`.
2. If parsing fails, throws a new `Error` with a useful message and `cause`.

Required APIs: `JSON.parse()`, `Error` with `cause`.

### Exercise 7: Safe JSON output

Write `serializePublicUser()` that removes secret fields before serialization.

Required APIs: `JSON.stringify()` replacer array or replacer function.

### Exercise 8: Currency label

Write `formatCheckoutTotal()` that receives a number, locale, and currency code.

Required API: `Intl.NumberFormat`.

### Exercise 9: API URL builder

Write `createProductApiUrl()` that receives:

```js
{
  category: "keyboard",
  page: 2,
  sort: "price asc"
}
```

It should return a valid URL string with encoded query parameters.

Required APIs: `URL`, `URLSearchParams`.

### Exercise 10: Retry scheduler

Write a function that logs `attempt 1`, `attempt 2`, `attempt 3` with a delay between attempts and then stops.

Required API: recursive `setTimeout()`.

## 16. MDN reading checklist

Use MDN as a reference after you understand the concept. Read these pages while practicing:

- `Map`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
- `Set`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
- Typed arrays guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays
- `ArrayBuffer`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
- `DataView`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
- `RegExp`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
- Regular expressions guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
- `Date`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
- `Error`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
- `JSON`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
- `Intl`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
- `console`: https://developer.mozilla.org/en-US/docs/Web/API/console
- `URL`: https://developer.mozilla.org/en-US/docs/Web/API/URL
- `URLSearchParams`: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
- `setTimeout()`: https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout

## 17. Final memory model for Chapter 11

Chapter 11 is not a list of unrelated APIs. It is a toolbox organized around data problems:

```text
Need uniqueness                 -> Set
Need key-value lookup           -> Map
Need object-private metadata    -> WeakMap
Need raw bytes                  -> ArrayBuffer
Need numeric view over bytes    -> TypedArray
Need precise binary reads       -> DataView
Need text pattern matching      -> RegExp
Need one instant in time        -> Date
Need failure representation     -> Error
Need data interchange text      -> JSON
Need user-facing formatting     -> Intl
Need runtime inspection         -> console
Need structured URL handling    -> URL and URLSearchParams
Need delayed execution          -> setTimeout and setInterval
```

The professional learning target is not "I have seen these names". The target is:

1. I know what problem each API solves.
2. I know what data model each API owns internally.
3. I know how to choose it over arrays, plain objects, strings, and manual formatting.
4. I know the common runtime traps.
5. I can combine these APIs inside modules to build real utilities.
