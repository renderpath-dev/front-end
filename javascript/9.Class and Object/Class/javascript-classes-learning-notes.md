# JavaScript Classes Learning Notes

> Current focus: JavaScript only. TypeScript function and class types are intentionally left out for now.
>
> Core rule: `class` is convenient syntax, but JavaScript still uses the prototype model underneath.

---

## Table of Contents

1. [Class 的核心模型](#1-class-的核心模型)
2. [constructor 和实例属性](#2-constructor-和实例属性)
3. [Prototype 方法和方法查找](#3-prototype-方法和方法查找)
4. [Class fields 和实例函数属性](#4-class-fields-和实例函数属性)
5. [Class 方法里的 this](#5-class-方法里的-this)
6. [Static 方法和静态属性](#6-static-方法和静态属性)
7. [Getter / Setter / Private fields](#7-getter--setter--private-fields)
8. [extends 和原型继承链](#8-extends-和原型继承链)
9. [super 和方法重写](#9-super-和方法重写)
10. [继承内置类和组合](#10-继承内置类和组合)
11. [常见错误总表](#11-常见错误总表)
12. [最终复习清单](#12-最终复习清单)

---

## 1. Class 的核心模型

### 结论

`class` 不是一套脱离原型链的新对象系统。

它是更清晰的语法，用来组织：

- 构造器 `constructor`
- 实例自有属性
- 原型方法
- 静态方法
- 继承关系

底层仍然是：

```txt
instance -> ClassName.prototype -> Object.prototype -> null
```

### 技术意义

在没有 `class` 之前，JavaScript 通常用构造函数和 `prototype` 创建一类对象。

```js
function LegacyCatalogConstructor(titleText, priceAmount) {
  this.titleText = titleText;
  this.priceAmount = priceAmount;
}

LegacyCatalogConstructor.prototype.formatCatalogLine = function () {
  return `${this.titleText}: $${this.priceAmount}`;
};

const legacyCatalogEntry = new LegacyCatalogConstructor("Keyboard", 99);

console.log(legacyCatalogEntry.formatCatalogLine());
```

`class` 把这套写法整理成更集中、更可读的形式。

```js
class CatalogItemRecord {
  constructor(titleText, priceAmount) {
    this.titleText = titleText;
    this.priceAmount = priceAmount;
  }

  getCatalogLabel() {
    return `${this.titleText}: $${this.priceAmount}`;
  }
}

const catalogItemRecord = new CatalogItemRecord("Keyboard", 99);

console.log(catalogItemRecord.getCatalogLabel());
```

输出：

```txt
Keyboard: $99
```

### 底层机制

这段代码：

```js
class CatalogItemRecord {
  constructor(titleText, priceAmount) {
    this.titleText = titleText;
    this.priceAmount = priceAmount;
  }

  getCatalogLabel() {
    return `${this.titleText}: $${this.priceAmount}`;
  }
}
```

大致建立了三类东西：

| 内容 | 位置 | 作用 |
|---|---|---|
| `CatalogItemRecord` | 当前作用域 | 类本身，本质上是构造函数 |
| `constructor` | class 内部专用 | `new` 时初始化实例 |
| `getCatalogLabel` | `CatalogItemRecord.prototype` | 所有实例共享的方法 |

可以验证：

```js
console.log(typeof CatalogItemRecord);
console.log(Object.getPrototypeOf(catalogItemRecord) === CatalogItemRecord.prototype);
console.log(catalogItemRecord.hasOwnProperty("titleText"));
console.log(catalogItemRecord.hasOwnProperty("getCatalogLabel"));
```

输出：

```txt
function
true
true
false
```

解释：

| 表达式 | 结果 | 原因 |
|---|---|---|
| `typeof CatalogItemRecord` | `"function"` | class 本身是构造函数值 |
| `Object.getPrototypeOf(catalogItemRecord) === CatalogItemRecord.prototype` | `true` | 实例连接到类的 prototype |
| `hasOwnProperty("titleText")` | `true` | `titleText` 是实例自有属性 |
| `hasOwnProperty("getCatalogLabel")` | `false` | 方法在 prototype 上，不在实例自身 |

### 代码执行过程

```js
const catalogItemRecord = new CatalogItemRecord("Keyboard", 99);
```

| 步骤 | 发生什么 |
|---|---|
| 1 | JavaScript 创建一个新对象 |
| 2 | 新对象的 `[[Prototype]]` 指向 `CatalogItemRecord.prototype` |
| 3 | 调用 `constructor("Keyboard", 99)` |
| 4 | constructor 内部的 `this` 指向新对象 |
| 5 | 执行 `this.titleText = "Keyboard"` |
| 6 | 执行 `this.priceAmount = 99` |
| 7 | 返回新对象并赋值给 `catalogItemRecord` |

### 常见错误

不要把 `class` 理解成“复制模板”。方法不会复制到每个实例上。

```js
class CatalogItemRecord {
  constructor(titleText, priceAmount) {
    this.titleText = titleText;
    this.priceAmount = priceAmount;
  }

  getCatalogLabel() {
    return `${this.titleText}: $${this.priceAmount}`;
  }
}

const catalogItemRecord = new CatalogItemRecord("Keyboard", 99);

console.log(catalogItemRecord.hasOwnProperty("getCatalogLabel"));
console.log("getCatalogLabel" in catalogItemRecord);
```

输出：

```txt
false
true
```

原因：

- `hasOwnProperty()` 只检查自有属性。
- `in` 会沿原型链检查。
- `getCatalogLabel` 在 `CatalogItemRecord.prototype` 上。

---

## 2. constructor 和实例属性

### 结论

`constructor` 负责初始化实例对象。

写在 `constructor` 里的：

```js
this.someProperty = someValue;
```

通常会成为每个实例自己的属性。

### 技术意义

如果你要创建多个结构相似、数据不同的对象，`constructor` 可以统一初始化它们。

```js
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

const keyboardInventoryEntry = new InventoryProductEntry("KEY-001", 12, 99);
const mouseInventoryEntry = new InventoryProductEntry("MOU-002", 30, 25);

console.log(keyboardInventoryEntry.calculateInventoryValue());
console.log(mouseInventoryEntry.calculateInventoryValue());
```

输出：

```txt
1188
750
```

### 底层机制

两个实例分别有自己的数据：

| 实例 | `productCode` | `stockCount` | `unitPrice` |
|---|---|---:|---:|
| `keyboardInventoryEntry` | `"KEY-001"` | `12` | `99` |
| `mouseInventoryEntry` | `"MOU-002"` | `30` | `25` |

但它们共享同一个方法：

```js
console.log(keyboardInventoryEntry.calculateInventoryValue === mouseInventoryEntry.calculateInventoryValue);
```

输出：

```txt
true
```

因为 `calculateInventoryValue` 在 `InventoryProductEntry.prototype` 上。

### 代码执行过程

```js
const keyboardInventoryEntry = new InventoryProductEntry("KEY-001", 12, 99);
```

| 步骤 | 内容 |
|---|---|
| 1 | 创建新实例对象 |
| 2 | 设置实例原型为 `InventoryProductEntry.prototype` |
| 3 | `this.productCode = "KEY-001"` |
| 4 | `this.stockCount = 12` |
| 5 | `this.unitPrice = 99` |
| 6 | `keyboardInventoryEntry` 保存这个对象引用 |

执行：

```js
keyboardInventoryEntry.calculateInventoryValue()
```

| 步骤 | 内容 |
|---|---|
| 1 | 在实例自身找 `calculateInventoryValue`，没找到 |
| 2 | 去 `InventoryProductEntry.prototype` 找，找到 |
| 3 | 以方法调用形式执行，`this` 指向 `keyboardInventoryEntry` |
| 4 | 读取 `this.stockCount`，得到 `12` |
| 5 | 读取 `this.unitPrice`，得到 `99` |
| 6 | 返回 `12 * 99`，也就是 `1188` |

### 自有属性检查

```js
console.log(Object.keys(keyboardInventoryEntry));
console.log(Object.hasOwn(keyboardInventoryEntry, "productCode"));
console.log(Object.hasOwn(keyboardInventoryEntry, "calculateInventoryValue"));
```

输出：

```txt
["productCode", "stockCount", "unitPrice"]
true
false
```

### 常见错误

错误理解：以为 `constructor` 里的变量自动变成外部可访问变量。

```js
class InventoryProductEntry {
  constructor(productCode, stockCount, unitPrice) {
    const internalNote = "created";
    this.productCode = productCode;
    this.stockCount = stockCount;
    this.unitPrice = unitPrice;
  }
}

const keyboardInventoryEntry = new InventoryProductEntry("KEY-001", 12, 99);

console.log(keyboardInventoryEntry.internalNote);
```

输出：

```txt
undefined
```

原因：

- `internalNote` 是 `constructor` 的局部变量。
- 它不是实例属性。
- 只有写成 `this.internalNote = "created"` 才会成为实例属性。

---

## 3. Prototype 方法和方法查找

### 结论

class 里的普通方法会被放到类的 `prototype` 上。

实例调用方法时，如果实例自身没有这个方法，JavaScript 会沿原型链向上查找。

### 技术意义

原型方法让多个实例共享同一个函数对象，避免每个实例都复制一份方法。

```js
class PriceRuleEngine {
  constructor(basePrice, discountRate) {
    this.basePrice = basePrice;
    this.discountRate = discountRate;
  }

  computeDiscountedPrice() {
    return this.basePrice * (1 - this.discountRate);
  }
}

const winterPriceRuleEngine = new PriceRuleEngine(200, 0.25);
const summerPriceRuleEngine = new PriceRuleEngine(120, 0.1);

console.log(winterPriceRuleEngine.computeDiscountedPrice());
console.log(summerPriceRuleEngine.computeDiscountedPrice());
console.log(winterPriceRuleEngine.computeDiscountedPrice === summerPriceRuleEngine.computeDiscountedPrice);
```

输出：

```txt
150
108
true
```

### 底层机制

原型链结构：

```txt
winterPriceRuleEngine
  ↓
PriceRuleEngine.prototype
  ↓
Object.prototype
  ↓
null
```

方法位置：

```js
console.log(Object.getOwnPropertyNames(PriceRuleEngine.prototype));
```

输出：

```txt
["constructor", "computeDiscountedPrice"]
```

`computeDiscountedPrice` 是 `PriceRuleEngine.prototype` 的自有属性。

### 方法查找过程

执行：

```js
winterPriceRuleEngine.computeDiscountedPrice()
```

| 步骤 | 查找位置 | 结果 |
|---|---|---|
| 1 | `winterPriceRuleEngine` 自身 | 没有 `computeDiscountedPrice` |
| 2 | `PriceRuleEngine.prototype` | 找到 `computeDiscountedPrice` |
| 3 | 调用函数 | `this` 指向 `winterPriceRuleEngine` |
| 4 | 读取 `basePrice` | `200` |
| 5 | 读取 `discountRate` | `0.25` |
| 6 | 返回结果 | `150` |

### class 方法默认不可枚举

```js
console.log(Object.keys(PriceRuleEngine.prototype));
console.log(Object.getOwnPropertyNames(PriceRuleEngine.prototype));
```

输出：

```txt
[]
["constructor", "computeDiscountedPrice"]
```

原因：

- `Object.keys()` 只返回可枚举自有属性。
- class 语法定义的 prototype 方法默认不可枚举。
- `Object.getOwnPropertyNames()` 会返回不可枚举的字符串属性。

### 常见错误

错误理解：以为方法不存在，因为 `Object.keys()` 看不到。

```js
console.log(Object.keys(PriceRuleEngine.prototype));
```

输出空数组不代表没有方法，只代表方法不可枚举。

正确检查：

```js
console.log("computeDiscountedPrice" in PriceRuleEngine.prototype);
console.log(Object.getOwnPropertyNames(PriceRuleEngine.prototype));
```

---

## 4. Class fields 和实例函数属性

### 结论

class field 会创建实例自有属性。

普通方法：

```js
methodName() {}
```

放在 prototype 上。

class field 箭头函数：

```js
methodName = () => {}
```

放在每个实例自身上。

### 技术意义

这两种写法表面都像“方法”，但机制完全不同。

```js
class NotificationPanelState {
  defaultChannel = "email";

  constructor(panelTitle) {
    this.panelTitle = panelTitle;
  }

  formatPanelTitle() {
    return `[${this.defaultChannel}] ${this.panelTitle}`;
  }

  handlePanelClick = () => {
    return `Open ${this.panelTitle}`;
  };
}

const alertNotificationPanelState = new NotificationPanelState("System Alert");
const reportNotificationPanelState = new NotificationPanelState("Daily Report");

console.log(alertNotificationPanelState.formatPanelTitle());
console.log(alertNotificationPanelState.handlePanelClick());
console.log(alertNotificationPanelState.formatPanelTitle === reportNotificationPanelState.formatPanelTitle);
console.log(alertNotificationPanelState.handlePanelClick === reportNotificationPanelState.handlePanelClick);
```

输出：

```txt
[email] System Alert
Open System Alert
true
false
```

### 底层机制

| 成员 | 写法 | 位置 | 是否共享 |
|---|---|---|---|
| `defaultChannel` | class field | 实例自身 | 否 |
| `panelTitle` | constructor assignment | 实例自身 | 否 |
| `formatPanelTitle` | prototype method | prototype | 是 |
| `handlePanelClick` | arrow function field | 实例自身 | 否 |

检查：

```js
console.log(Object.keys(alertNotificationPanelState));
console.log(Object.hasOwn(alertNotificationPanelState, "formatPanelTitle"));
console.log(Object.hasOwn(alertNotificationPanelState, "handlePanelClick"));
```

输出：

```txt
["defaultChannel", "handlePanelClick", "panelTitle"]
false
true
```

### 代码执行过程

创建实例时：

```js
const alertNotificationPanelState = new NotificationPanelState("System Alert");
```

| 步骤 | 内容 |
|---|---|
| 1 | 创建新对象 |
| 2 | 初始化 class field：`defaultChannel = "email"` |
| 3 | 初始化 arrow field：创建 `handlePanelClick` 函数并放到实例自身 |
| 4 | 执行 constructor |
| 5 | `this.panelTitle = "System Alert"` |
| 6 | 返回实例 |

### 常见错误

错误理解：以为箭头函数 class field 和普通 prototype 方法没有区别。

区别很大：

| 写法 | 优点 | 代价 |
|---|---|---|
| `formatPanelTitle() {}` | 所有实例共享，省内存 | 拆出来调用会丢 `this` |
| `handlePanelClick = () => {}` | 捕获实例 `this`，适合回调 | 每个实例创建一份函数 |

---

## 5. Class 方法里的 this

### 结论

class 方法里的 `this` 仍然由调用方式决定。

方法定义在 class 里，不代表 `this` 永远指向实例。

### 技术意义

这是 class 里最容易误解的点。

```js
class ProfileCardView {
  constructor(displayName) {
    this.displayName = displayName;
  }

  renderDisplayText() {
    return `Profile: ${this.displayName}`;
  }
}

const profileCardView = new ProfileCardView("Ada");

console.log(profileCardView.renderDisplayText());
```

输出：

```txt
Profile: Ada
```

调用形式是：

```js
profileCardView.renderDisplayText()
```

点号左边是 `profileCardView`，所以 `this` 指向 `profileCardView`。

### this 丢失

```js
class ProfileCardView {
  constructor(displayName) {
    this.displayName = displayName;
  }

  renderDisplayText() {
    return `Profile: ${this.displayName}`;
  }
}

const profileCardView = new ProfileCardView("Ada");
const detachedProfileRenderer = profileCardView.renderDisplayText;

console.log(detachedProfileRenderer());
```

会报错。

原因：

| 调用形式 | `this` |
|---|---|
| `profileCardView.renderDisplayText()` | `profileCardView` |
| `detachedProfileRenderer()` | `undefined` |

class 体内部默认严格模式，所以普通函数直接调用时 `this` 是 `undefined`。

### 用 bind 修复

```js
class ProfileCardView {
  constructor(displayName) {
    this.displayName = displayName;
  }

  renderDisplayText() {
    return `Profile: ${this.displayName}`;
  }
}

const profileCardView = new ProfileCardView("Ada");
const boundProfileRenderer = profileCardView.renderDisplayText.bind(profileCardView);

console.log(boundProfileRenderer());
```

输出：

```txt
Profile: Ada
```

### 用箭头函数 class field 修复

```js
class ProfileActionPanel {
  constructor(actionLabel) {
    this.actionLabel = actionLabel;
  }

  createActionText = () => {
    return `Action: ${this.actionLabel}`;
  };
}

const profileActionPanel = new ProfileActionPanel("Save");
const detachedActionCreator = profileActionPanel.createActionText;

console.log(detachedActionCreator());
```

输出：

```txt
Action: Save
```

原因：

- `createActionText` 是实例自己的箭头函数属性。
- 箭头函数没有自己的 `this`。
- 它捕获实例初始化时的 `this`。

### 常见错误

错误理解：class 方法等于自动绑定 this。

不是。

```js
const detachedProfileRenderer = profileCardView.renderDisplayText;
```

这行只是取出函数对象，没有保存“它来自哪个实例”。

---

## 6. Static 方法和静态属性

### 结论

`static` 定义的是类本身的属性或方法，不属于实例。

### 技术意义

静态方法适合写：

- 工厂方法
- 格式化工具
- 校验工具
- 和单个实例状态无关的逻辑

```js
class DateLabelFormatter {
  static defaultSeparator = "-";

  static createIsoDateLabel(yearValue, monthValue, dayValue) {
    return [yearValue, monthValue, dayValue].join(DateLabelFormatter.defaultSeparator);
  }
}

console.log(DateLabelFormatter.createIsoDateLabel(2026, 5, 4));
console.log(DateLabelFormatter.defaultSeparator);
```

输出：

```txt
2026-5-4
-
```

### 底层机制

静态成员放在类本身上：

```js
console.log(Object.hasOwn(DateLabelFormatter, "createIsoDateLabel"));
console.log(Object.hasOwn(DateLabelFormatter, "defaultSeparator"));
```

输出：

```txt
true
true
```

实例不能调用静态方法：

```js
const dateLabelFormatter = new DateLabelFormatter();

console.log(dateLabelFormatter.createIsoDateLabel(2026, 5, 4));
```

会报错。

原因：

```txt
createIsoDateLabel is not on the instance.
```

### 静态方法里的 this

```js
class LocaleMessageFactory {
  static fallbackLanguage = "en";

  static buildWelcomeText(displayName) {
    return `${this.fallbackLanguage}: Welcome ${displayName}`;
  }
}

console.log(LocaleMessageFactory.buildWelcomeText("Ada"));
```

输出：

```txt
en: Welcome Ada
```

在静态方法调用中：

```js
LocaleMessageFactory.buildWelcomeText("Ada")
```

`this` 指向 `LocaleMessageFactory` 这个类本身。

### 常见错误

错误：用实例调用静态方法。

```js
const dateLabelFormatter = new DateLabelFormatter();

dateLabelFormatter.createIsoDateLabel(2026, 5, 4);
```

正确：

```js
DateLabelFormatter.createIsoDateLabel(2026, 5, 4);
```

---

## 7. Getter / Setter / Private fields

### 结论

getter 和 setter 是属性访问语法，不是普通方法调用。

私有字段用 `#` 声明，外部不能直接访问。

### 技术意义

它们适合封装内部状态。

```js
class LedgerBalanceBox {
  #currentBalance;

  constructor(openingBalance) {
    this.#currentBalance = openingBalance;
  }

  get availableBalance() {
    return this.#currentBalance;
  }

  set adjustmentAmount(deltaAmount) {
    if (typeof deltaAmount !== "number") {
      throw new TypeError("Adjustment must be a number");
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
```

输出：

```txt
1000
1150
1150
```

### 机制区分

| 写法 | 类型 | 调用方式 |
|---|---|---|
| `get availableBalance()` | getter | `ledgerBalanceBox.availableBalance` |
| `set adjustmentAmount(value)` | setter | `ledgerBalanceBox.adjustmentAmount = value` |
| `depositFunds(paymentAmount)` | 普通方法 | `ledgerBalanceBox.depositFunds(300)` |
| `#currentBalance` | 私有字段 | 只能在 class 内部访问 |

### 代码执行过程

执行：

```js
ledgerBalanceBox.adjustmentAmount = -150;
```

| 步骤 | 内容 |
|---|---|
| 1 | 触发 setter `adjustmentAmount` |
| 2 | `deltaAmount = -150` |
| 3 | 类型检查通过 |
| 4 | 执行 `this.#currentBalance += deltaAmount` |
| 5 | 私有字段从 `1000` 变成 `850` |

执行：

```js
ledgerBalanceBox.depositFunds(300)
```

| 步骤 | 内容 |
|---|---|
| 1 | 方法调用，`this` 是 `ledgerBalanceBox` |
| 2 | `paymentAmount = 300` |
| 3 | 私有字段从 `850` 变成 `1150` |
| 4 | 返回 `1150` |

### 常见错误

错误：把 getter 当普通方法调用。

```js
ledgerBalanceBox.availableBalance();
```

正确：

```js
ledgerBalanceBox.availableBalance;
```

错误：从外部访问私有字段。

```js
ledgerBalanceBox.#currentBalance;
```

这是语法错误。

---

## 8. extends 和原型继承链

### 结论

`extends` 会建立子类和父类之间的原型继承关系。

子类实例可以使用子类方法，也可以通过原型链使用父类方法。

### 技术意义

继承适合表达明确的 `is-a` 关系。

```js
class MediaAssetBase {
  constructor(assetTitle) {
    this.assetTitle = assetTitle;
  }

  renderMediaSummary() {
    return `Media asset: ${this.assetTitle}`;
  }
}

class VideoClipAsset extends MediaAssetBase {
  constructor(assetTitle, durationSeconds) {
    super(assetTitle);
    this.durationSeconds = durationSeconds;
  }

  calculateDurationText() {
    return `${this.durationSeconds} seconds`;
  }
}

const videoClipAsset = new VideoClipAsset("Launch Trailer", 95);

console.log(videoClipAsset.renderMediaSummary());
console.log(videoClipAsset.calculateDurationText());
console.log(videoClipAsset instanceof VideoClipAsset);
console.log(videoClipAsset instanceof MediaAssetBase);
```

输出：

```txt
Media asset: Launch Trailer
95 seconds
true
true
```

### 底层机制

原型链：

```txt
videoClipAsset
  ↓
VideoClipAsset.prototype
  ↓
MediaAssetBase.prototype
  ↓
Object.prototype
  ↓
null
```

验证：

```js
console.log(Object.getPrototypeOf(VideoClipAsset.prototype) === MediaAssetBase.prototype);
console.log(Object.getPrototypeOf(videoClipAsset) === VideoClipAsset.prototype);
```

输出：

```txt
true
true
```

### 方法查找过程

执行：

```js
videoClipAsset.renderMediaSummary()
```

| 步骤 | 查找位置 | 结果 |
|---|---|---|
| 1 | `videoClipAsset` 自身 | 没有 |
| 2 | `VideoClipAsset.prototype` | 没有 |
| 3 | `MediaAssetBase.prototype` | 找到 |
| 4 | 调用方法 | `this` 是 `videoClipAsset` |
| 5 | 读取 `this.assetTitle` | `"Launch Trailer"` |

### 常见错误

不要以为父类方法执行时 `this` 指向父类。

```txt
this still points to the current instance.
```

父类方法只是从父类 prototype 上找到的函数。它被当前实例调用时，`this` 仍然是当前实例。

---

## 9. super 和方法重写

### 结论

`super()` 用来调用父类构造器。

`super.methodName()` 用来调用父类原型方法。

子类如果定义了和父类同名的方法，就会重写父类方法。

### 技术意义

子类可以扩展父类逻辑，而不是完全复制父类代码。

```js
class StandardShippingQuote {
  constructor(destinationRegion, packageWeight) {
    this.destinationRegion = destinationRegion;
    this.packageWeight = packageWeight;
  }

  calculateShippingCost() {
    return this.packageWeight * 5;
  }

  buildShippingSummary() {
    return `${this.destinationRegion}: $${this.calculateShippingCost()}`;
  }
}

class ExpressShippingQuote extends StandardShippingQuote {
  constructor(destinationRegion, packageWeight, speedMultiplier) {
    super(destinationRegion, packageWeight);
    this.speedMultiplier = speedMultiplier;
  }

  calculateExpressCost() {
    return super.calculateShippingCost() * this.speedMultiplier;
  }

  buildExpressSummary() {
    return `${super.buildShippingSummary()} with express total $${this.calculateExpressCost()}`;
  }
}

const expressShippingQuote = new ExpressShippingQuote("West Coast", 4, 2);

console.log(expressShippingQuote.calculateExpressCost());
console.log(expressShippingQuote.buildExpressSummary());
```

输出：

```txt
40
West Coast: $20 with express total $40
```

### `super()` 执行过程

```js
const expressShippingQuote = new ExpressShippingQuote("West Coast", 4, 2);
```

| 步骤 | 内容 |
|---|---|
| 1 | 调用子类构造器 |
| 2 | 执行 `super(destinationRegion, packageWeight)` |
| 3 | 进入父类构造器 |
| 4 | 设置 `destinationRegion = "West Coast"` |
| 5 | 设置 `packageWeight = 4` |
| 6 | 回到子类构造器 |
| 7 | 设置 `speedMultiplier = 2` |
| 8 | 返回实例 |

### `super.methodName()` 执行过程

执行：

```js
super.calculateShippingCost()
```

| 步骤 | 内容 |
|---|---|
| 1 | 从 `StandardShippingQuote.prototype` 找 `calculateShippingCost` |
| 2 | 调用父类方法 |
| 3 | `this` 仍然是 `expressShippingQuote` |
| 4 | 读取 `this.packageWeight`，得到 `4` |
| 5 | 返回 `20` |

### 常见错误

错误：派生类 constructor 中先用 `this` 再调用 `super()`。

```js
class BrokenExpressQuote extends StandardShippingQuote {
  constructor(destinationRegion, packageWeight, speedMultiplier) {
    this.speedMultiplier = speedMultiplier;
    super(destinationRegion, packageWeight);
  }
}
```

这会报错。

正确顺序：

```js
class FixedExpressQuote extends StandardShippingQuote {
  constructor(destinationRegion, packageWeight, speedMultiplier) {
    super(destinationRegion, packageWeight);
    this.speedMultiplier = speedMultiplier;
  }
}
```

规则：

```txt
In a derived class constructor, call super() before using this.
```

---

## 10. 继承内置类和组合

### 结论

JavaScript 可以继承内置类，比如 `Array`。

但现代项目里，不要为了复用一点方法就滥用继承。很多场景更适合组合。

### 继承内置类

```js
class ScoreCollectionList extends Array {
  calculateScoreTotal() {
    return this.reduce((totalScore, currentScore) => totalScore + currentScore, 0);
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
```

输出：

```txt
270
90
true
true
```

这里连接了你之前学过的数组 `reduce()`。

### 组合写法

```js
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
  { priceAmount: 15, quantityCount: 4 }
]);

console.log(shoppingCartBundle.calculateCartTotal());
```

输出：

```txt
120
```

### 技术意义

继承表达：

```txt
A is a B
```

组合表达：

```txt
A has B
```

| 关系 | 更适合 |
|---|---|
| `ScoreCollectionList is an Array` | 继承可以成立 |
| `ShoppingCartBundle has cart items` | 组合更自然 |

### 常见错误

错误：为了复用方法，强行继承。

如果你的对象只是“拥有一组数据”，不一定应该继承数组。

更稳定的项目思路是：

```txt
Prefer composition when the relationship is has-a.
Use inheritance only when the relationship is truly is-a.
```

---

## 11. 常见错误总表

| 错误 | 错误原因 | 正确理解 |
|---|---|---|
| 以为 class 是全新的对象模型 | 忽略原型链 | class 底层仍然基于 prototype |
| 忘记 `new` | class constructor 不能普通调用 | 必须 `new ClassName()` |
| 在 class 声明前实例化 | class 有暂时性死区 | 先声明 class，再使用 |
| 以为方法在实例自身上 | prototype 方法共享 | 普通 class 方法在 prototype 上 |
| 用 `Object.keys()` 看不到方法就以为没有 | class 方法不可枚举 | 用 `Object.getOwnPropertyNames()` 检查 |
| 方法拆出来后 `this` 丢失 | `this` 由调用方式决定 | 用 `bind()` 或 arrow field 修复 |
| 把 static 方法给实例调用 | static 属于类本身 | 用 `ClassName.staticMethod()` |
| 把 getter 当方法调用 | getter 是属性访问 | 写 `instance.property` |
| 外部访问 `#privateField` | 私有字段只能在类内部访问 | 通过公开方法或 getter 访问 |
| 子类 constructor 里先用 `this` | 派生类必须先 `super()` | 先调用 `super()` |
| 以为 `super.method()` 里的 this 是父类 | `this` 仍是当前实例 | super 只是指定从父类 prototype 找方法 |
| 滥用继承 | 把 has-a 当 is-a | 优先考虑组合 |

---

## 12. 最终复习清单

学完第 9 章，你应该能回答这些问题：

1. `class` 和构造函数 / `prototype` 是什么关系？
2. `constructor` 什么时候执行？
3. `this.property = value` 创建的是自有属性还是原型属性？
4. class 普通方法存在哪里？
5. 为什么两个实例的普通方法通常是同一个函数对象？
6. 为什么 class 方法拆出来后 `this` 会丢失？
7. `methodName() {}` 和 `methodName = () => {}` 有什么区别？
8. `static` 方法为什么不能由实例调用？
9. getter / setter 为什么用属性访问语法？
10. `#privateField` 和普通属性有什么区别？
11. `extends` 建立了哪几条原型链？
12. 子类 constructor 里为什么必须先调用 `super()`？
13. `super.method()` 调父类方法时，`this` 到底是谁？
14. 什么是方法重写？
15. 什么时候用继承，什么时候用组合？

最终模型：

```txt
class syntax
  ↓
constructor initializes instance properties
  ↓
prototype stores shared methods
  ↓
this is decided by call-site
  ↓
static belongs to the class itself
  ↓
private fields hide internal state
  ↓
extends connects prototype chains
  ↓
super calls parent constructor or parent prototype method
```

最重要的一句话：

```txt
Class is syntax. Prototype chain is the mechanism.
```
