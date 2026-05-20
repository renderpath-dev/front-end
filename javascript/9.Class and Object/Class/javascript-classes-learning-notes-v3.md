# JavaScript Class 学习笔记：完整整理版

> 当前阶段只讨论 JavaScript 运行时机制，暂时不展开 TypeScript 的 class 类型系统。
>
> 核心模型：`class` 是语法层；对象、原型链、构造函数、`this` 才是运行时机制。

---

## 目录

1. [本版修正了什么](#1-本版修正了什么)
2. [class 的核心模型](#2-class-的核心模型)
3. [constructor 和实例属性](#3-constructor-和实例属性)
4. [prototype 方法和方法查找](#4-prototype-方法和方法查找)
5. [class fields 和实例函数字段](#5-class-fields-和实例函数字段)
6. [class 方法里的 this](#6-class-方法里的-this)
7. [static 静态成员和 static block](#7-static-静态成员和-static-block)
8. [getter / setter / private fields / readonly 替代方案](#8-getter--setter--private-fields--readonly-替代方案)
9. [extends 和原型继承链](#9-extends-和原型继承链)
10. [super 和方法重写](#10-super-和方法重写)
11. [继承内置类和组合](#11-继承内置类和组合)
12. [常见错误总表](#12-常见错误总表)
13. [最终复习清单](#13-最终复习清单)

---

## 1. 本版修正了什么

### 结论

上一版的问题有两个：

1. `07-getters-setters-and-private-fields.js` 里直接给 `Object.freeze()` 返回的对象赋值，IDE 会把它识别成只读对象，从而直接标红。
2. Markdown 总结中英文混用，而且只是“补充索引”，不是完整学习笔记。

本版做了两个修正：

| 问题 | 修正方式 |
|---|---|
| `Object.freeze()` 直接赋值被 IDE 标红 | 改成 `Reflect.set(...)` 展示写入失败，不让文件停在红线处 |
| Markdown 中英文混合 | 正文全部改成中文说明，代码仍保持英文命名和英文注释 |
| 总结过短 | 重新按“结论、技术意义、底层机制、代码执行、常见错误”整理 |
| 缺失知识点 | 补上 TDZ、class expression、constructor return、`new.target`、method shadowing、private method、static block、static `super`、`Symbol.species`、`EventTarget` |

### 为什么 `Object.freeze()` 那段会标红

这段写法：

```js
const dashboardConfigRecord = Object.freeze({
  layoutMode: 'grid',
});

dashboardConfigRecord.layoutMode = 'list';
```

在运行时，`Object.freeze()` 会让对象的第一层属性变成不可写。在严格模式下，直接赋值会抛出 `TypeError`。同时，很多 IDE 会根据 `Object.freeze()` 的类型定义推断这个对象是只读对象，所以编辑器阶段就会标红。

本版改成：

```js
const layoutModeUpdateSucceeded = Reflect.set(
  dashboardConfigRecord,
  'layoutMode',
  'list',
);

console.log(layoutModeUpdateSucceeded);
```

`Reflect.set()` 返回 `false`，表示写入失败，但不会让这一行被 IDE 当成普通只读属性赋值错误。

---

## 2. class 的核心模型

### 结论

`class` 不是一套新的对象系统。它是把“构造函数 + prototype 方法 + 继承关系”写得更清楚的语法。

最终模型是：

```txt
instance
  -> ClassName.prototype
  -> Object.prototype
  -> null
```

### 技术意义

没有 `class` 时，可以用构造函数和 `prototype` 写一类对象：

```js
function LegacyCatalogConstructor(titleText, priceAmount) {
  this.titleText = titleText;
  this.priceAmount = priceAmount;
}

LegacyCatalogConstructor.prototype.formatCatalogLine = function () {
  return `${this.titleText}: ${this.priceAmount}`;
};
```

用 `class` 写法更集中：

```js
class CatalogItemRecord {
  constructor(titleText, priceAmount) {
    this.titleText = titleText;
    this.priceAmount = priceAmount;
  }

  getCatalogLabel() {
    return `${this.titleText}: ${this.priceAmount}`;
  }
}
```

### 底层机制

`class CatalogItemRecord {}` 在运行时创建的是一个构造函数值。

```js
console.log(typeof CatalogItemRecord);
```

输出：

```txt
function
```

普通方法 `getCatalogLabel()` 不会复制到每个实例上，而是放在：

```txt
CatalogItemRecord.prototype
```

### 代码执行过程

```js
const catalogItemRecord = new CatalogItemRecord('Keyboard', 99);
```

执行步骤：

| 步骤 | 发生什么 |
|---|---|
| 1 | 创建一个新对象 |
| 2 | 新对象的原型指向 `CatalogItemRecord.prototype` |
| 3 | 调用 `constructor` |
| 4 | constructor 里的 `this` 指向新对象 |
| 5 | 添加 `titleText` 自有属性 |
| 6 | 添加 `priceAmount` 自有属性 |
| 7 | 返回新实例 |

### 常见错误

错误理解：`class` 方法在每个实例自己身上。

正确理解：普通 class 方法在 `prototype` 上，实例通过原型链找到它。

---

## 3. constructor 和实例属性

### 结论

`constructor` 负责初始化每个实例自己的数据。

```js
class InventoryProductEntry {
  constructor(productCode, stockCount, unitPrice) {
    this.productCode = productCode;
    this.stockCount = stockCount;
    this.unitPrice = unitPrice;
  }
}
```

这里的三个属性都会成为实例自有属性。

### 技术意义

如果一批对象结构相同、数据不同，就适合用 `constructor` 初始化。

```js
const keyboardInventoryEntry = new InventoryProductEntry('KEY-001', 12, 99);
const mouseInventoryEntry = new InventoryProductEntry('MOUSE-002', 30, 25);
```

两个实例的数据不同，但共享同一个原型方法。

### 底层机制

实例属性和原型方法要分开：

| 内容 | 位置 |
|---|---|
| `productCode` | 实例自身 |
| `stockCount` | 实例自身 |
| `unitPrice` | 实例自身 |
| `calculateInventoryValues()` | `InventoryProductEntry.prototype` |

### constructor return 规则

普通情况下，`constructor` 不需要写 `return`，`new` 会自动返回新实例。

如果 constructor 显式返回对象，这个对象会替代原本的新实例：

```js
class ReplacementRecordFactory {
  constructor(recordLabel) {
    this.recordLabel = recordLabel;

    return {
      recordLabel: 'Replacement object',
    };
  }
}

const replacementRecordFactory = new ReplacementRecordFactory('Original object');

console.log(replacementRecordFactory.recordLabel);
```

输出：

```txt
Replacement object
```

如果 constructor 返回原始值，返回值会被忽略：

```js
class PrimitiveReturnRecord {
  constructor(recordLabel) {
    this.recordLabel = recordLabel;
    return 123;
  }
}

const primitiveReturnRecord = new PrimitiveReturnRecord('Kept object');

console.log(primitiveReturnRecord.recordLabel);
```

输出：

```txt
Kept object
```

### `new.target`

`new.target` 表示当前是被哪个构造函数直接调用的。它常用于阻止直接实例化一个“基类模板”。

```js
class AbstractReportTemplate {
  constructor() {
    if (new.target === AbstractReportTemplate) {
      throw new TypeError('AbstractReportTemplate cannot be constructed directly');
    }
  }
}

class SalesReportTemplate extends AbstractReportTemplate {}

const salesReportTemplate = new SalesReportTemplate();

console.log(salesReportTemplate instanceof SalesReportTemplate);
```

输出：

```txt
true
```

### 常见错误

constructor 里的局部变量不是实例属性。

```js
class TokenRecordBox {
  constructor(tokenValue) {
    const creationSource = 'local';
    this.tokenValue = tokenValue;
  }
}

const tokenRecordBox = new TokenRecordBox('abc');

console.log(tokenRecordBox.creationSource);
```

输出：

```txt
undefined
```

---

## 4. prototype 方法和方法查找

### 结论

class 里的普通方法会放在类的 `prototype` 上。

```js
class PriceRuleEngine {
  computeDiscountedPrice() {
    return this.basePrice * (1 - this.discountRate);
  }
}
```

`computeDiscountedPrice()` 是原型方法，不是实例自身属性。

### 技术意义

原型方法可以被所有实例共享，节省内存，也符合 JavaScript 的对象模型。

```js
const winterPriceRuleEngine = new PriceRuleEngine(200, 0.25);
const summerPriceRuleEngine = new PriceRuleEngine(120, 0.1);

console.log(
  winterPriceRuleEngine.computeDiscountedPrice ===
    summerPriceRuleEngine.computeDiscountedPrice,
);
```

输出：

```txt
true
```

### 底层机制

方法查找顺序：

```txt
instance own properties
  -> ClassName.prototype
  -> Object.prototype
  -> null
```

### class 方法默认不可枚举

```js
console.log(Object.keys(PriceRuleEngine.prototype));
console.log(Object.getOwnPropertyNames(PriceRuleEngine.prototype));
```

典型输出：

```txt
[]
[ 'constructor', 'computeDiscountedPrice' ]
```

原因：

| API | 检查范围 |
|---|---|
| `Object.keys()` | 可枚举自有属性 |
| `Object.getOwnPropertyNames()` | 所有字符串自有属性，包括不可枚举属性 |

### method shadowing

如果实例自身有一个和原型方法同名的属性，它会遮蔽原型方法。

```js
winterPriceRuleEngine.computeDiscountedPrice = function () {
  return 0;
};

console.log(winterPriceRuleEngine.computeDiscountedPrice());
```

输出：

```txt
0
```

这不是修改了 `PriceRuleEngine.prototype`，而是在实例自身新增了一个同名属性。

### 常见错误

不要因为 `Object.keys(ClassName.prototype)` 返回空数组，就认为原型方法不存在。

---

## 5. class fields 和实例函数字段

### 结论

class field 会成为实例自有属性。

普通方法放在 prototype 上。箭头函数字段放在实例自身上。

```js
class NotificationPanelState {
  defaultChannel = 'email';

  formatPanelTitle() {
    return `[${this.defaultChannel}] ${this.panelTitle}`;
  }

  handlePanelClick = () => {
    return `Open ${this.panelTitle}`;
  };
}
```

### 技术意义

这三个成员位置不同：

| 成员 | 类型 | 位置 | 是否共享 |
|---|---|---|---|
| `defaultChannel` | 公共实例字段 | 实例自身 | 否 |
| `formatPanelTitle()` | 原型方法 | prototype | 是 |
| `handlePanelClick = () => {}` | 实例字段，值是箭头函数 | 实例自身 | 否 |

### 底层机制

普通方法：

```js
formatPanelTitle() {}
```

近似等于：

```js
NotificationPanelState.prototype.formatPanelTitle = function () {};
```

箭头函数字段：

```js
handlePanelClick = () => {};
```

近似等于在每次创建实例时执行：

```js
this.handlePanelClick = () => {};
```

### 什么时候用普通方法，什么时候用箭头函数字段

| 场景 | 推荐写法 |
|---|---|
| 普通业务计算 | `methodName() {}` |
| 格式化、校验、转换 | `methodName() {}` |
| 需要子类重写 | `methodName() {}` |
| 事件处理函数 | `handlerName = () => {}` |
| 会被当回调传出去且内部用 `this` | `handlerName = () => {}` |

### 常见错误

不要简单说“一个是方法，一个是函数”。更准确是：

```txt
formatPanelTitle 是原型上的方法函数。
handlePanelClick 是实例自身的属性，属性值是箭头函数。
```

---

## 6. class 方法里的 this

### 结论

class 方法里的 `this` 仍然由调用方式决定。

```js
profileCardView.renderDisplayText()
```

这里 `this` 是 `profileCardView`。

```js
const detachedProfileRenderer = profileCardView.renderDisplayText;
detachedProfileRenderer();
```

这里 `this` 会丢失。

### 技术意义

class 不会自动绑定 `this`。方法写在 class 里，不代表它永远记住某个实例。

### 底层机制

| 调用方式 | `this` |
|---|---|
| `object.method()` | 点号左边的对象 |
| `detachedMethod()` | 严格模式下是 `undefined` |
| `method.bind(object)` | 绑定的对象 |
| `arrowField = () => {}` | 捕获实例初始化时的 `this` |

### 回调场景

```js
class DialogActionPanel {
  constructor(dialogTitle) {
    this.dialogTitle = dialogTitle;
  }

  createDialogLabel() {
    return `Dialog: ${this.dialogTitle}`;
  }
}

const dialogActionPanel = new DialogActionPanel('Settings');
const detachedDialogLabelCreator = dialogActionPanel.createDialogLabel;

console.log(detachedDialogLabelCreator());
```

会出错，因为 `this` 不是实例。

修复方式一：

```js
const boundDialogLabelCreator = dialogActionPanel.createDialogLabel.bind(dialogActionPanel);

console.log(boundDialogLabelCreator());
```

修复方式二：用箭头函数字段。

```js
class MenuActionPanel {
  constructor(menuTitle) {
    this.menuTitle = menuTitle;
  }

  createMenuLabel = () => {
    return `Menu: ${this.menuTitle}`;
  };
}
```

### 常见错误

错误理解：class 方法会自动绑定 `this`。

正确理解：`this` 看调用点，不看定义位置。

---

## 7. static 静态成员和 static block

### 结论

`static` 成员属于类本身，不属于实例。

```js
class DateLabelFormatter {
  static defaultSeparator = '-';

  static createIsoDateLabel(yearValue, monthValue, dayValue) {
    return [yearValue, monthValue, dayValue].join(DateLabelFormatter.defaultSeparator);
  }
}
```

调用方式：

```js
DateLabelFormatter.createIsoDateLabel(2026, 5, 4);
```

不是：

```js
new DateLabelFormatter().createIsoDateLabel(2026, 5, 4);
```

### 技术意义

静态成员适合表示类级别能力：

| 场景 | 适合 static 吗 |
|---|---|
| 格式化工具 | 是 |
| 工厂方法 | 是 |
| 类级缓存 | 是 |
| 每个实例自己的数据 | 否 |
| 依赖 `this.instanceProperty` 的方法 | 否 |

### static block

`static {}` 是类级别初始化代码块。

它在 class 定义阶段执行一次，不是每次 `new` 都执行。

```js
class StatusMessageRegistry {
  static messageMap = new Map();
  static defaultStatusCode;

  static {
    StatusMessageRegistry.messageMap.set('success', 'Operation completed');
    StatusMessageRegistry.messageMap.set('error', 'Operation failed');
    StatusMessageRegistry.defaultStatusCode = 'success';
  }
}
```

### 什么时候用 static block

| 情况 | 是否适合 |
|---|---|
| 简单静态常量 | 不需要，用 static field |
| 多个静态字段一起初始化 | 适合 |
| 需要条件判断 | 适合 |
| 需要同步 `try...catch` | 适合 |
| 初始化静态私有字段 | 适合 |
| 异步请求 | 不适合，应该用 static async method |

### static 私有字段

```js
class TokenRuleRegistry {
  static #ruleMap = new Map();

  static getExpirationMinutes(tokenType) {
    return TokenRuleRegistry.#ruleMap.get(tokenType);
  }
}
```

`static #ruleMap` 属于类本身，但只能在类内部访问。

### static `super`

子类静态方法可以用 `super` 调用父类静态方法。

```js
class BaseCodeFactory {
  static createPrefix() {
    return 'BASE';
  }
}

class TrackingCodeFactory extends BaseCodeFactory {
  static createTrackingCode(sequenceValue) {
    return `${super.createPrefix()}-${sequenceValue}`;
  }
}

console.log(TrackingCodeFactory.createTrackingCode(1001));
```

输出：

```txt
BASE-1001
```

### 常见错误

不要在 constructor 里初始化 static 数据。constructor 是实例级初始化，static 是类级数据。

---

## 8. getter / setter / private fields / readonly 替代方案

### 结论

getter/setter 是属性访问语法。`#privateField` 是语言级私有字段。JavaScript 没有 `readonly` 关键字。

### getter 和 setter

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
    this.#currentBalance += deltaAmount;
  }
}
```

使用方式：

```js
ledgerBalanceBox.availableBalance;
ledgerBalanceBox.adjustmentAmount = -150;
```

不是：

```js
ledgerBalanceBox.availableBalance();
```

### private fields

`#currentBalance` 不是字符串属性名，外部不能这样访问：

```js
ledgerBalanceBox.#currentBalance;
```

也不能这样访问：

```js
ledgerBalanceBox['#currentBalance'];
```

第二种不会报语法错，但结果不是私有字段。

### private method

私有方法适合隐藏内部辅助逻辑。

```js
class PaymentAmountNormalizer {
  #normalizeAmount(rawAmount) {
    return Number(rawAmount);
  }

  createNormalizedLabel(rawAmount) {
    const normalizedAmount = this.#normalizeAmount(rawAmount);
    return `Amount: ${normalizedAmount}`;
  }
}
```

### JavaScript 里的 readonly 替代方案

JavaScript 没有 `readonly` 关键字。要做运行时不可写，可以用：

```js
Object.defineProperty(targetObject, 'propertyName', {
  value: 'fixed',
  writable: false,
  enumerable: true,
  configurable: false,
});
```

也可以用：

```js
Object.freeze(targetObject);
```

但 `Object.freeze()` 是浅冻结。

```js
const dashboardConfigRecord = Object.freeze({
  layoutMode: 'grid',
  nestedOptions: {
    columnCount: 3,
  },
});
```

第一层 `layoutMode` 不可改，但嵌套对象仍然可以改：

```js
dashboardConfigRecord.nestedOptions.columnCount = 4;
```

### 为什么本版用 Reflect.set

直接写：

```js
dashboardConfigRecord.layoutMode = 'list';
```

在 IDE 里会被标成只读属性赋值错误，也可能在严格模式下抛出运行时错误。

本版改成：

```js
const layoutModeUpdateSucceeded = Reflect.set(
  dashboardConfigRecord,
  'layoutMode',
  'list',
);
```

返回 `false`，明确表示修改失败，同时不把示例文件卡在红线处。

### 常见错误

错误理解：`const` 让对象内部属性不可改。

正确理解：`const` 只固定变量绑定，不冻结对象内容。

真正让对象第一层属性不可写的是 `Object.freeze()`。

---

## 9. extends 和原型继承链

### 结论

`extends` 会建立子类和父类之间的原型链关系。

```js
class MediaAssetBase {}
class VideoClipAsset extends MediaAssetBase {}
```

实例链：

```txt
videoClipAsset
  -> VideoClipAsset.prototype
  -> MediaAssetBase.prototype
  -> Object.prototype
  -> null
```

### 技术意义

子类实例可以访问：

1. 自己的实例属性。
2. 子类原型方法。
3. 父类原型方法。
4. `Object.prototype` 方法。

### super constructor

如果子类写了自己的 constructor，必须先调用 `super(...)`，才能使用 `this`。

```js
class VideoClipAsset extends MediaAssetBase {
  constructor(assetTitle, durationSeconds) {
    super(assetTitle);
    this.durationSeconds = durationSeconds;
  }
}
```

### 子类没有 constructor 时

如果子类没有写 constructor，JavaScript 会默认把参数转交给父类 constructor。

近似等价于：

```js
constructor(...args) {
  super(...args);
}
```

### instanceof

`instanceof` 不是方法，是运算符。

```js
videoClipAsset instanceof MediaAssetBase;
```

它检查的是：

```txt
videoClipAsset 的原型链上有没有 MediaAssetBase.prototype
```

### isPrototypeOf

```js
MediaAssetBase.prototype.isPrototypeOf(videoClipAsset);
```

这也是直接检查原型链关系。

### 常见错误

不要以为对象属性长得像，就一定是某个类的实例。`instanceof` 看的是原型链，不看属性长相。

---

## 10. super 和方法重写

### 结论

`super(...)` 调用父类 constructor。`super.methodName()` 调用父类原型方法。方法重写是：子类定义了和父类同名的方法。

### 新增方法不等于重写

父类有：

```js
calculateShippingCost() {}
buildShippingSummary() {}
```

子类新增：

```js
calculateExpressCost() {}
buildExpressSummary() {}
```

这不是重写。因为方法名不同。

这属于：

```txt
子类新增能力，并在新增方法里用 super 复用父类逻辑。
```

### 方法重写

父类有：

```js
calculateFreightCost() {}
```

子类也有同名：

```js
calculateFreightCost() {}
```

这才是方法重写。

### super.method() 的 this

`super.methodName()` 只是指定从父类 prototype 开始找方法，但方法里的 `this` 仍然是当前实例。

```txt
super 决定从哪里找方法。
this 决定方法操作哪个对象。
```

### 实际项目什么时候用方法重写

| 场景 | 是否适合重写 |
|---|---|
| 子类要替换父类默认行为 | 适合 |
| 子类要保留父类逻辑再追加 | 适合，用 `super.method()` |
| 父类定义流程，子类改其中一步 | 适合，模板方法模式 |
| 多个子类要提供同一个接口的不同实现 | 适合，多态 |
| 子类只是多一个新能力 | 不叫重写，直接新增方法 |

### 常见错误

在重写方法里写：

```js
return this.calculateFreightCost() * 2;
```

会递归调用自己。

正确写法：

```js
return super.calculateFreightCost() * 2;
```

---

## 11. 继承内置类和组合

### 结论

只有当你的类本质上就是某个内置类型的特殊版本时，才继承内置类。

判断：

```txt
is-a 用继承。
has-a 用组合。
```

### 继承 Array

```js
class ScoreCollectionList extends Array {
  calculateScoreTotal() {
    return this.reduce(
      (totalScore, currentScore) => totalScore + currentScore,
      0,
    );
  }
}
```

`ScoreCollectionList` 是一种特殊数组，所以它能使用 `Array.prototype.reduce()`。

### Symbol.species

继承 `Array` 有一个边界点：某些数组方法可能返回子类实例。

```js
const curvedScoreList = scoreCollectionList.map((scoreValue) => scoreValue + 5);
```

在很多情况下，`curvedScoreList` 可能仍然是 `ScoreCollectionList` 实例。

如果希望数组派生方法返回普通数组，可以使用：

```js
static get [Symbol.species]() {
  return Array;
}
```

### 继承 Error

自定义错误类型适合继承 `Error`。

```js
class ApiResponseError extends Error {
  constructor(statusCode, responseMessage) {
    super(responseMessage);
    this.name = 'ApiResponseError';
    this.statusCode = statusCode;
  }
}
```

适合原因：

| 能力 | 来自 Error |
|---|---|
| `message` | 是 |
| `stack` | 是 |
| `instanceof Error` | 是 |
| 错误语义 | 是 |

### 继承 Map

如果你的类本质上是一种特殊映射表，可以继承 `Map`。但如果只是内部需要保存映射数据，更推荐组合。

```js
class FeatureToggleRegistry {
  constructor(flagEntries) {
    this.flagMap = new Map(flagEntries);
  }
}
```

这里 `FeatureToggleRegistry` 拥有一个 `Map`，它自己不是 `Map`。

### 继承 EventTarget

前端中，如果一个对象本身需要派发和监听事件，可以继承 `EventTarget`。

```js
class UploadProgressEmitter extends EventTarget {
  updateProgress(percentValue) {
    const progressEvent = new CustomEvent('progresschange', {
      detail: { percentValue },
    });

    this.dispatchEvent(progressEvent);
  }
}
```

### 常见错误

不要为了用 `reduce()` 就继承 `Array`。如果只是要计算数组，普通函数或组合对象更清楚。

---

## 12. 常见错误总表

| 错误 | 原因 | 正确理解 |
|---|---|---|
| 把 class 当成全新对象系统 | 忽略 prototype | class 是语法，prototype 是机制 |
| class 声明前就使用 | class 有 TDZ | 先声明，再使用 |
| 忘记 `new` | class constructor 不能普通调用 | 必须 `new ClassName()` |
| 以为普通方法在实例自身上 | 方法在 prototype 上 | 实例通过原型链访问 |
| 用 `Object.keys()` 看不到方法就以为没有 | class 方法不可枚举 | 用 `Object.getOwnPropertyNames()` |
| 方法拆出来后 `this` 丢失 | 调用方式变了 | 用 `bind()` 或箭头函数字段 |
| 把 static 方法给实例调用 | static 属于类本身 | 用 `ClassName.method()` |
| 把 getter 当函数调用 | getter 是属性访问 | 用 `instance.property` |
| 外部访问 `#privateField` | 私有字段只在类内部可访问 | 用公开方法或 getter |
| 子类 constructor 先用 `this` | 派生类必须先 `super()` | 先 `super()`，再 `this.xxx` |
| 以为 `super.method()` 里的 this 是父类 | `this` 仍是当前实例 | super 只改变查找起点 |
| 把新增方法当重写 | 方法名不同 | 同名才叫重写 |
| 为了复用一点方法滥用继承 | 把 has-a 当 is-a | 优先组合 |
| 以为 `const` 会冻结对象 | const 只固定绑定 | 冻结对象用 `Object.freeze()` |

---

## 13. 最终复习清单

学完这一章，你应该能准确回答：

1. `class` 在运行时创建了什么？
2. class 普通方法存在哪里？
3. class field 存在哪里？
4. 为什么两个实例的普通方法是同一个函数对象？
5. 为什么两个实例的箭头函数字段不是同一个函数对象？
6. `constructor` 什么时候执行？
7. constructor 返回对象和返回原始值有什么区别？
8. `new.target` 是什么？
9. 为什么 class 不能不写 `new` 直接调用？
10. 为什么 class 声明不能提前使用？
11. 为什么 `Object.keys(ClassName.prototype)` 看不到普通方法？
12. 什么是 method shadowing？
13. 为什么 class 方法拆出来后 `this` 会丢失？
14. `bind()` 和箭头函数字段分别怎么解决 `this` 问题？
15. `static` 成员属于哪里？
16. `static block` 什么时候执行？
17. `static field` 和 `static #field` 有什么区别？
18. JavaScript 为什么没有 `readonly`？运行时不可写怎么做？
19. `extends` 如何连接原型链？
20. `instanceof` 到底检查什么？
21. 子类 constructor 为什么必须先 `super()`？
22. `super.method()` 调父类方法时，里面的 `this` 是谁？
23. 什么是方法重写？
24. 新增方法和方法重写怎么区分？
25. 什么时候用组合，什么时候用继承？
26. 什么时候可以继承内置类？

最终模型：

```txt
class syntax
  -> constructor initializes instance own properties
  -> normal methods live on prototype
  -> fields live on each instance
  -> static members live on the class itself
  -> private fields hide internal state
  -> extends links prototype chains
  -> super calls parent constructor or parent method
  -> overriding changes the method found first on the child prototype
```

最重要的一句话：

```txt
Class is syntax. Prototype chain is the mechanism.
```
