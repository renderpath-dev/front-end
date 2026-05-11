# JavaScript 模块学习指导文件 v4

> 定位：这是第 10 章“模块”的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建练习目录、写代码、运行代码、观察输出，再把每节整理成最终学习笔记。  
> 语言规则：正文统一中文；必要技术术语保留英文括号；代码命名和代码注释统一英文。  
> 代码规则：代码和代码注释不使用中文字符。  
> 学习原则：任何没学过的关键字、对象、语法形式，第一次出现时必须解释它是什么、属于语法还是运行时对象、为什么要用、常见误区是什么。

---

## 目录

1. [本文件怎么用](#1-本文件怎么用)
2. [第 10 章模块的完整学习顺序](#2-第-10-章模块的完整学习顺序)
3. [本章先要建立的底层模型](#3-本章先要建立的底层模型)
4. [00：旧式模块模式](#4-00旧式模块模式)
5. [01：为什么需要模块](#5-01为什么需要模块)
6. [02：模块作用域](#6-02模块作用域)
7. [03：命名导出和命名导入](#7-03命名导出和命名导入)
8. [04：默认导出和默认导入](#8-04默认导出和默认导入)
9. [05：重命名导入、命名空间导入、混合导入](#9-05重命名导入命名空间导入混合导入)
10. [06：再导出和 barrel 文件](#10-06再导出和-barrel-文件)
11. [07：实时绑定](#11-07实时绑定)
12. [08：模块只执行一次](#12-08模块只执行一次)
13. [09：副作用模块](#13-09副作用模块)
14. [10：静态导入规则](#14-10静态导入规则)
15. [11：动态导入](#15-11动态导入)
16. [12：循环导入](#16-12循环导入)
17. [13：浏览器模块](#17-13浏览器模块)
18. [14：CommonJS 基础](#18-14commonjs-基础)
19. [15：CommonJS 缓存和 exports 细节](#19-15commonjs-缓存和-exports-细节)
20. [16：Node ESM](#20-16node-esm)
21. [17：import.meta](#21-17importmeta)
22. [18：顶层 await](#22-18顶层-await)
23. [19：小项目整合](#23-19小项目整合)
24. [最终文件清单](#24-最终文件清单)
25. [最终学习笔记转换要求](#25-最终学习笔记转换要求)
26. [本章最终要能回答的问题](#26-本章最终要能回答的问题)

---

## 1. 本文件怎么用

### 结论

这不是一份“看完就算学过”的文档。它是一个写代码的训练指导。你每学一节，都要创建对应目录，写多个文件，运行入口文件，看输出，再解释为什么这样输出。

模块化不能靠单文件代码学。模块的本质就是：

```txt
一个文件导出。
另一个文件导入。
入口文件组织执行。
运行环境决定加载方式。
```

### 每节固定学习步骤

每一节都按这个顺序做：

```txt
1. 先读结论。
2. 读清楚新关键字解释。
3. 创建文件结构。
4. 按示例写代码。
5. 运行入口文件。
6. 对照预期输出。
7. 按执行过程表格解释每一步。
8. 故意写一个错误版本，观察报错。
9. 把本节整理进最终学习笔记。
```

### 代码注释模板

每个 JS 文件顶部都写英文注释：

```js
// Goal:
// Verify how this module example works.

// Expected output:
// Replace this block with the output from the entry file.
```

---

## 2. 第 10 章模块的完整学习顺序

### 结论

本章按这个顺序学：

```txt
旧式模块模式
  -> 为什么需要模块
  -> 模块作用域
  -> 命名导出
  -> 默认导出
  -> 导入形式
  -> 再导出
  -> 实时绑定
  -> 模块执行缓存
  -> 副作用模块
  -> 静态导入规则
  -> 动态导入
  -> 循环导入
  -> 浏览器模块
  -> CommonJS
  -> Node ESM
  -> import.meta
  -> 顶层 await
  -> 小项目整合
```

### 技术意义

书上第 10 章的主线是：先理解旧式模块思想，再理解 Node 里的 CommonJS，最后进入 ES6 模块。这个顺序合理，因为 ES 模块不是凭空出现的，它是为了解决旧式脚本组织方式、闭包模块、CommonJS 等方案中的问题。

### 本章不是简单语法

模块这一章的难点不是 `import` 和 `export` 怎么写，而是：

```txt
模块如何形成作用域。
模块之间如何建立依赖图。
模块代码什么时候执行。
导入值为什么是实时绑定。
CommonJS 和 ES Module 为什么不是同一套机制。
浏览器和 Node 为什么有不同规则。
```

---

## 3. 本章先要建立的底层模型

### 结论

模块是“文件级作用域 + 明确导入导出 + 受运行环境管理的执行单元”。

### 关键术语先解释

| 术语 | 解释 |
|---|---|
| 模块（module） | 一个拥有自己作用域的代码文件。 |
| 导出（export） | 模块主动暴露给外部使用的值。 |
| 导入（import） | 当前模块声明自己依赖另一个模块的值。 |
| API | 模块暴露给外部使用的接口，不一定是网络接口。 |
| 入口文件（entry file） | 程序最先运行或被页面加载的文件。 |
| 依赖图（dependency graph） | 由 `import` / `require` 连接起来的文件关系图。 |
| 模块作用域（module scope） | 模块内部自己的作用域，未导出的声明默认只在当前文件可见。 |
| 静态导入（static import） | 写在模块顶层的 `import ... from ...`。 |
| 动态导入（dynamic import） | 运行时调用 `import()`，返回 Promise。 |
| CommonJS | Node 传统模块系统，使用 `require()` 和 `module.exports`。 |
| ES Module / ESM | JavaScript 标准模块系统，使用 `import` 和 `export`。 |

### 底层机制总图

```txt
main.js
  imports cartMathTools.js
  imports profileHeadingView.js

cartMathTools.js
  exports calculateCartSubtotal
  exports calculateCartItemCount

profileHeadingView.js
  exports createProfileHeading
```

这不是普通函数调用关系，而是模块依赖关系。JavaScript 运行环境会先知道模块之间的依赖，再决定加载和执行顺序。

---

## 4. 00：旧式模块模式

### 结论

这一节学习 ES 模块出现之前，JavaScript 如何用对象、闭包、立即调用函数表达式模拟模块。

旧式模块不是现代项目首选写法，但它能解释 ES Module 为什么重要。

### 新关键字和新概念

#### `globalThis`

`globalThis` 不是方法。它是 JavaScript 提供的内置全局属性，指向当前运行环境的全局对象。

```js
globalThis.sharedValue = 100;
console.log(globalThis.sharedValue);
```

在浏览器里，`globalThis` 通常指向 `window`；在 Node 里，它指向 Node 的全局对象。使用 `globalThis.xxx = value` 的意思是：把某个值明确暴露到全局对象上，让其他普通脚本也能访问。

#### IIFE

IIFE 是立即调用函数表达式（Immediately Invoked Function Expression）。

```js
(() => {
  console.log('run now');
})();
```

它的意思是：创建一个函数，然后立刻执行。它常用于创建私有函数作用域。

#### 闭包

闭包（closure）是指：函数可以记住它创建时所在的词法作用域。

```js
function createCounter() {
  let countValue = 0;

  return function increaseCount() {
    countValue += 1;
    return countValue;
  };
}

const increaseCount = createCounter();
console.log(increaseCount());
```

`createCounter()` 已经执行结束，但返回出来的 `increaseCount()` 仍然能访问 `countValue`。这就是闭包。

### 文件结构

```txt
00-legacy-module-patterns/
  legacyModulePatternPage.html
  namespaceObjectPattern.js
  closureCounterModule.js
  iifeSettingsModule.js
  legacyModulePatternApp.js
```

### `legacyModulePatternPage.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Legacy Module Pattern Demo</title>
  </head>
  <body>
    <h1>Legacy Module Pattern Demo</h1>

    <script src="./namespaceObjectPattern.js"></script>
    <script src="./closureCounterModule.js"></script>
    <script src="./iifeSettingsModule.js"></script>
    <script src="./legacyModulePatternApp.js"></script>
  </body>
</html>
```

这里没有 `type="module"`，因为这一节专门演示 ES Module 之前的普通脚本模式。

### `namespaceObjectPattern.js`

```js
'use strict';

// Goal:
// Verify how an object namespace groups related functions before ES modules.

globalThis.checkoutNamespaceTools = {
  taxRate: 0.08,

  calculateSubtotal(unitPrice, quantityCount) {
    return unitPrice * quantityCount;
  },

  calculateTaxAmount(subtotalAmount) {
    return subtotalAmount * this.taxRate;
  },

  calculateGrandTotal(unitPrice, quantityCount) {
    const subtotalAmount = this.calculateSubtotal(unitPrice, quantityCount);
    const taxAmount = this.calculateTaxAmount(subtotalAmount);

    return subtotalAmount + taxAmount;
  },
};
```

### 代码解释

| 代码 | 含义 |
|---|---|
| `globalThis.checkoutNamespaceTools = ...` | 在全局对象上暴露一个对象。 |
| `taxRate: 0.08` | 对象的公开属性，外部可以修改。 |
| `calculateSubtotal(...)` | 对象里的方法。 |
| `this.taxRate` | 方法调用时，`this` 指向 `checkoutNamespaceTools`。 |

### `closureCounterModule.js`

```js
'use strict';

// Goal:
// Verify how a closure hides private state and exposes public methods.

globalThis.ticketCounterModule = (() => {
  let nextTicketNumber = 3000;

  function createTicketCode() {
    nextTicketNumber += 1;
    return `TCK-${nextTicketNumber}`;
  }

  function readNextTicketPreview() {
    return `TCK-${nextTicketNumber + 1}`;
  }

  return {
    createTicketCode,
    readNextTicketPreview,
  };
})();
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | IIFE 立即执行。 |
| 2 | 创建局部变量 `nextTicketNumber`。 |
| 3 | 创建两个内部函数。 |
| 4 | 返回一个对象，只暴露两个方法。 |
| 5 | 返回对象被赋值给 `globalThis.ticketCounterModule`。 |
| 6 | 外部不能直接访问 `nextTicketNumber`。 |
| 7 | 暴露出去的方法通过闭包继续访问 `nextTicketNumber`。 |

### `iifeSettingsModule.js`

```js
'use strict';

// Goal:
// Verify how an IIFE creates private state and exposes a controlled API.

(() => {
  const runtimeSettings = {
    themeMode: 'dark',
    pageSize: 20,
  };

  function readSettingValue(settingName) {
    return runtimeSettings[settingName];
  }

  function updateSettingValue(settingName, settingValue) {
    runtimeSettings[settingName] = settingValue;
  }

  function createSettingsSummary() {
    return `${runtimeSettings.themeMode}:${runtimeSettings.pageSize}`;
  }

  globalThis.runtimeSettingsModule = {
    readSettingValue,
    updateSettingValue,
    createSettingsSummary,
  };
})();
```

### `legacyModulePatternApp.js`

```js
'use strict';

// Goal:
// Run all legacy module pattern examples and verify their limitations.

console.log(globalThis.checkoutNamespaceTools.calculateSubtotal(30, 2));
console.log(globalThis.checkoutNamespaceTools.calculateTaxAmount(60));
console.log(globalThis.checkoutNamespaceTools.calculateGrandTotal(30, 2));

globalThis.checkoutNamespaceTools.taxRate = 0.2;

console.log(globalThis.checkoutNamespaceTools.calculateGrandTotal(30, 2));

console.log(globalThis.ticketCounterModule.readNextTicketPreview());
console.log(globalThis.ticketCounterModule.createTicketCode());
console.log(globalThis.ticketCounterModule.createTicketCode());
console.log(globalThis.nextTicketNumber);

console.log(globalThis.runtimeSettingsModule.readSettingValue('themeMode'));
console.log(globalThis.runtimeSettingsModule.createSettingsSummary());

globalThis.runtimeSettingsModule.updateSettingValue('pageSize', 50);

console.log(globalThis.runtimeSettingsModule.createSettingsSummary());
console.log(globalThis.runtimeSettings);
```

### 预期输出

```txt
60
4.8
64.8
72
TCK-3001
TCK-3001
TCK-3002
undefined
dark
dark:20
dark:50
undefined
```

### 常见错误

| 错误 | 原因 |
|---|---|
| 以为 `globalThis` 是方法 | 它是全局对象引用，不是函数。 |
| 以为对象命名空间能隐藏状态 | `taxRate` 是公开属性，外部可以修改。 |
| 以为闭包内部变量能从外部访问 | `nextTicketNumber` 没有挂到 `globalThis` 上。 |
| 把入口脚本放在最前面 | 入口文件执行时，全局模块对象还没创建。 |

---

## 5. 01：为什么需要模块

### 结论

模块解决三个核心问题：命名冲突、代码隐藏、依赖关系表达。

### 新关键字和新概念

#### 普通脚本

普通脚本就是没有使用模块系统的 JS 文件，通常这样加载：

```html
<script src="./someFile.js"></script>
```

它没有 `import` 和 `export`，文件之间的依赖主要靠加载顺序。

#### 模块脚本

模块脚本是按 ES Module 方式运行的脚本，在浏览器里要写：

```html
<script type="module" src="./app.js"></script>
```

模块脚本有自己的模块作用域，可以使用 `import` 和 `export`。

### 文件结构

```txt
01-why-modules/
  discountTool.js
  shippingTool.js
  checkoutPreview.js
```

### `discountTool.js`

```js
// Goal:
// Export a price calculation function and keep the discount rate private.

const discountRate = 0.1;

export function calculateDiscountedPrice(priceAmount) {
  return priceAmount * (1 - discountRate);
}
```

### `shippingTool.js`

```js
// Goal:
// Export a shipping calculation function and keep the fee rate private.

const feePerKilogram = 5;

export function calculateShippingFee(weightAmount) {
  return weightAmount * feePerKilogram;
}
```

### `checkoutPreview.js`

```js
// Goal:
// Import two module APIs and use them together.

import { calculateDiscountedPrice } from './discountTool.js';
import { calculateShippingFee } from './shippingTool.js';

console.log(calculateDiscountedPrice(100));
console.log(calculateShippingFee(3));
```

### 运行方式

在浏览器模块环境中运行，或者在 Node ESM 环境中运行。

如果用 Node，建议进入这个目录后创建：

```json
{
  "type": "module"
}
```

然后运行：

```bash
node checkoutPreview.js
```

### 预期输出

```txt
90
15
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `checkoutPreview.js` 声明依赖两个模块。 |
| 2 | 运行环境加载 `discountTool.js` 和 `shippingTool.js`。 |
| 3 | 两个模块分别创建自己的私有变量。 |
| 4 | 两个模块只导出公开函数。 |
| 5 | 入口文件调用导入函数。 |

### 常见错误

不要在 `checkoutPreview.js` 里访问：

```js
console.log(discountRate);
```

它会报错，因为 `discountRate` 没有被导出。

---

## 6. 02：模块作用域

### 结论

ES Module 里的顶层变量、函数、类默认只属于当前模块。没有 `export` 的内容，外部不能直接访问。

### 新关键字和新概念

#### 作用域

作用域就是一个名字可以被访问的范围。模块作用域就是文件级作用域。

#### `export`

`export` 是 ES Module 的语法关键字，表示把某个声明放进模块的导出表，让别的模块可以导入。

### 文件结构

```txt
02-module-scope/
  inventoryState.js
  dashboardApp.js
```

### `inventoryState.js`

```js
// Goal:
// Verify that non-exported module variables stay private.

const internalStockLimit = 100;

export function checkStockLevel(stockCount) {
  return stockCount <= internalStockLimit;
}
```

### `dashboardApp.js`

```js
// Goal:
// Import only the public API from the inventory state module.

import { checkStockLevel } from './inventoryState.js';

console.log(checkStockLevel(80));
console.log(checkStockLevel(120));
```

### 预期输出

```txt
true
false
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `dashboardApp.js` 导入 `checkStockLevel`。 |
| 2 | `inventoryState.js` 被加载并执行。 |
| 3 | `internalStockLimit` 创建在 `inventoryState.js` 的模块作用域中。 |
| 4 | `checkStockLevel` 被加入导出表。 |
| 5 | `dashboardApp.js` 获得导入绑定并调用它。 |

### 常见错误

错误：

```js
console.log(internalStockLimit);
```

原因：`internalStockLimit` 是模块内部变量，没有 `export`。

---

## 7. 03：命名导出和命名导入

### 结论

命名导出（named export）适合一个模块导出多个明确命名的值。命名导入时，导入名字必须和导出名字匹配。

### 新关键字和新概念

#### 命名导出

```js
export function someFunction() {}
```

这里 `someFunction` 是导出的名字。

#### 命名导入

```js
import { someFunction } from './someModule.js';
```

花括号里的名字必须来自目标模块的导出表。

### 文件结构

```txt
03-named-exports/
  priceCalculator.js
  orderPreview.js
```

### `priceCalculator.js`

```js
// Goal:
// Export multiple named calculation functions.

export function calculateSubtotal(unitPrice, quantityCount) {
  return unitPrice * quantityCount;
}

export function calculateSalesTax(subtotalAmount) {
  return subtotalAmount * 0.08;
}

export function calculateGrandTotal(unitPrice, quantityCount) {
  const subtotalAmount = calculateSubtotal(unitPrice, quantityCount);
  const taxAmount = calculateSalesTax(subtotalAmount);

  return subtotalAmount + taxAmount;
}
```

### `orderPreview.js`

```js
// Goal:
// Import named exports and call them in the entry file.

import {
  calculateSubtotal,
  calculateSalesTax,
  calculateGrandTotal,
} from './priceCalculator.js';

const subtotalAmount = calculateSubtotal(50, 2);
const taxAmount = calculateSalesTax(subtotalAmount);
const grandTotalAmount = calculateGrandTotal(50, 2);

console.log(subtotalAmount);
console.log(taxAmount);
console.log(grandTotalAmount);
```

### 预期输出

```txt
100
8
108
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `priceCalculator.js` 声明三个函数。 |
| 2 | 三个函数都被放进模块导出表。 |
| 3 | `orderPreview.js` 通过花括号导入三个名字。 |
| 4 | 入口文件分别调用三个导入函数。 |

### 常见错误

错误：

```js
import { calculateSubTotal } from './priceCalculator.js';
```

原因：`calculateSubTotal` 和 `calculateSubtotal` 大小写不同，不是同一个导出名字。

---

## 8. 04：默认导出和默认导入

### 结论

默认导出（default export）适合一个模块主要导出一个核心值。默认导入时，本地名字可以自己取。

### 新关键字和新概念

#### `default`

`default` 是 ES Module 的特殊导出槽位。一个模块最多有一个默认导出。

### 文件结构

```txt
04-default-export/
  createInvoiceLabel.js
  invoiceApp.js
```

### `createInvoiceLabel.js`

```js
// Goal:
// Export one main function as the default export.

export default function createInvoiceLabel(invoiceNumber, customerName) {
  return `Invoice ${invoiceNumber} for ${customerName}`;
}
```

### `invoiceApp.js`

```js
// Goal:
// Import a default export with a local semantic name.

import buildInvoiceText from './createInvoiceLabel.js';

console.log(buildInvoiceText('INV-001', 'Ada'));
```

### 预期输出

```txt
Invoice INV-001 for Ada
```

### 底层机制

默认导入：

```js
import buildInvoiceText from './createInvoiceLabel.js';
```

意思是：把目标模块的 `default` 导出绑定到本地名字 `buildInvoiceText`。

### 常见错误

错误：

```js
import { createInvoiceLabel } from './createInvoiceLabel.js';
```

如果目标模块只有默认导出，没有命名导出 `createInvoiceLabel`，这种写法会失败。

---

## 9. 05：重命名导入、命名空间导入、混合导入

### 结论

导入时可以重命名，可以把一个模块所有命名导出收进命名空间对象，也可以同时导入默认导出和命名导出。

### 新关键字和新概念

#### `as`

`as` 用于重命名导入或导出。

#### 命名空间导入

```js
import * as CurrencyFormatter from './currencyFormatter.js';
```

这里 `CurrencyFormatter` 是模块命名空间对象，里面包含目标模块的命名导出。

### 文件结构

```txt
05-import-forms/
  currencyFormatter.js
  paymentDashboard.js
```

### `currencyFormatter.js`

```js
// Goal:
// Provide named exports and one default export from the same module.

export const defaultCurrencyCode = 'USD';

export function formatCurrencyAmount(amountValue) {
  return `$${amountValue.toFixed(2)}`;
}

export function formatCurrencyCodeLabel() {
  return defaultCurrencyCode;
}

export default function createCurrencySummary(amountValue) {
  return `${formatCurrencyAmount(amountValue)} ${defaultCurrencyCode}`;
}
```

### `paymentDashboard.js`

```js
// Goal:
// Verify default import, named import, renamed import, and namespace import.

import createCurrencySummary, {
  defaultCurrencyCode,
  formatCurrencyAmount,
  formatCurrencyAmount as createMoneyText,
} from './currencyFormatter.js';

import * as CurrencyFormatter from './currencyFormatter.js';

console.log(createCurrencySummary(19.5));
console.log(formatCurrencyAmount(19.5));
console.log(createMoneyText(20));
console.log(defaultCurrencyCode);
console.log(CurrencyFormatter.formatCurrencyCodeLabel());
```

### 预期输出

```txt
$19.50 USD
$19.50
$20.00
USD
USD
```

### 常见错误

不要滥用命名空间导入。它方便，但如果到处都写 `SomeModule.someFunction()`，可能让依赖关系不如命名导入清楚。

---

## 10. 06：再导出和 barrel 文件

### 结论

再导出（re-export）用于把多个模块的导出集中到一个入口文件。这个入口文件经常叫 barrel 文件。

### 新关键字和新概念

#### 再导出

```js
export { someName } from './someModule.js';
```

这行代码不先创建本地变量，而是直接把另一个模块的导出继续导出。

#### barrel 文件

通常叫 `index.js`，作为某个目录的统一出口。

### 文件结构

```txt
06-re-export-barrel/
  formatters/
    dateLabelFormatter.js
    currencyLabelFormatter.js
    index.js
  dashboardReport.js
```

### `formatters/dateLabelFormatter.js`

```js
// Goal:
// Export a date label formatter.

export function formatOrderDate(yearValue, monthValue, dayValue) {
  return [yearValue, monthValue, dayValue].join('-');
}
```

### `formatters/currencyLabelFormatter.js`

```js
// Goal:
// Export a currency label formatter.

export function formatOrderCurrency(amountValue) {
  return `$${amountValue.toFixed(2)}`;
}
```

### `formatters/index.js`

```js
// Goal:
// Re-export formatter APIs from one barrel file.

export { formatOrderDate } from './dateLabelFormatter.js';
export { formatOrderCurrency } from './currencyLabelFormatter.js';
```

### `dashboardReport.js`

```js
// Goal:
// Import multiple APIs from a barrel file.

import {
  formatOrderDate,
  formatOrderCurrency,
} from './formatters/index.js';

console.log(formatOrderDate(2026, 5, 6));
console.log(formatOrderCurrency(120));
```

### 预期输出

```txt
2026-5-6
$120.00
```

### 常见错误

不要把所有内部模块都无脑放进 barrel。barrel 应该暴露稳定 API，不应该把内部实现全部公开。

---

## 11. 07：实时绑定

### 结论

ES Module 导入的是实时绑定（live binding），不是普通值复制。

### 新关键字和新概念

#### 实时绑定

导入方拿到的不是某个值的静态副本，而是连接到导出模块变量的只读绑定。导出模块更新变量后，导入方读取时能看到新值。

#### 只读绑定

导入方不能给导入的名字重新赋值。

### 文件结构

```txt
07-live-bindings/
  sessionCounterStore.js
  sessionViewer.js
```

### `sessionCounterStore.js`

```js
// Goal:
// Export mutable module state and functions that update it.

export let activeSessionCount = 0;

export function increaseActiveSessionCount() {
  activeSessionCount += 1;
}

export function resetActiveSessionCount() {
  activeSessionCount = 0;
}
```

### `sessionViewer.js`

```js
// Goal:
// Verify that imported bindings reflect updates from the exporting module.

import {
  activeSessionCount,
  increaseActiveSessionCount,
  resetActiveSessionCount,
} from './sessionCounterStore.js';

console.log(activeSessionCount);

increaseActiveSessionCount();
console.log(activeSessionCount);

increaseActiveSessionCount();
console.log(activeSessionCount);

resetActiveSessionCount();
console.log(activeSessionCount);
```

### 预期输出

```txt
0
1
2
0
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `sessionViewer.js` 导入 `activeSessionCount`。 |
| 2 | `activeSessionCount` 初始值是 `0`。 |
| 3 | 调用 `increaseActiveSessionCount()`。 |
| 4 | 导出模块内部把 `activeSessionCount` 改成 `1`。 |
| 5 | 导入模块再次读取时看到 `1`。 |

### 常见错误

错误：

```js
activeSessionCount = 100;
```

原因：导入绑定对导入方是只读的，不能重新赋值。

---

## 12. 08：模块只执行一次

### 结论

同一个模块在同一个模块图里只执行一次。后续导入复用同一个模块记录。

### 新关键字和新概念

#### 模块记录

运行环境加载一个模块后，会保存这个模块的状态、导出绑定和执行结果。再次导入同一个模块时，不会重新执行顶层代码。

#### 顶层代码

直接写在模块最外层的代码，不在函数或类里面。

### 文件结构

```txt
08-module-executes-once/
  auditLogger.js
  firstDashboard.js
  secondDashboard.js
  app.js
```

### `auditLogger.js`

```js
// Goal:
// Verify that this module runs only once even when imported by multiple modules.

console.log('auditLogger module executed');

let logCount = 0;

export function writeAuditLog(messageText) {
  logCount += 1;
  return `${logCount}: ${messageText}`;
}
```

### `firstDashboard.js`

```js
// Goal:
// Import and use the shared audit logger.

import { writeAuditLog } from './auditLogger.js';

export function renderFirstDashboard() {
  console.log(writeAuditLog('first dashboard'));
}
```

### `secondDashboard.js`

```js
// Goal:
// Import and use the same audit logger module.

import { writeAuditLog } from './auditLogger.js';

export function renderSecondDashboard() {
  console.log(writeAuditLog('second dashboard'));
}
```

### `app.js`

```js
// Goal:
// Verify module execution caching through two different import paths.

import { renderFirstDashboard } from './firstDashboard.js';
import { renderSecondDashboard } from './secondDashboard.js';

renderFirstDashboard();
renderSecondDashboard();
```

### 预期输出

```txt
auditLogger module executed
1: first dashboard
2: second dashboard
```

### 解释

`auditLogger module executed` 只出现一次，说明 `auditLogger.js` 的顶层代码只执行一次。`logCount` 继续累加，说明两个导入方共享同一个模块状态。

---

## 13. 09：副作用模块

### 结论

副作用模块（side-effect module）是不导入具体值，只为了执行模块顶层代码的模块。

### 新关键字和新概念

#### 副作用

副作用是指代码除了返回值之外，还改变了外部环境，例如修改全局对象、注册事件、打印日志、加载样式、初始化 SDK。

### 文件结构

```txt
09-side-effect-module/
  consoleSetup.js
  app.js
```

### `consoleSetup.js`

```js
// Goal:
// Verify how importing a module for side effects runs its top-level code.

console.log('console setup module executed');

globalThis.applicationLabel = 'Module Demo';
```

### `app.js`

```js
// Goal:
// Import a module only for its side effects.

import './consoleSetup.js';

console.log(globalThis.applicationLabel);
```

### 预期输出

```txt
console setup module executed
Module Demo
```

### 常见错误

副作用模块要少用且命名清楚。不要让一个普通工具模块偷偷修改全局状态。

---

## 14. 10：静态导入规则

### 结论

静态导入必须写在模块顶层，不能写在 `if`、函数、循环里面。

### 新关键字和新概念

#### 静态导入

```js
import { valueName } from './moduleFile.js';
```

这种导入在模块执行前就会被解析，用来建立依赖图。

### 文件结构

```txt
10-static-import-rules/
  priceCalculator.js
  invalidStaticImportExample.js
  validStaticImportApp.js
```

### `priceCalculator.js`

```js
// Goal:
// Export a simple function for static import rule examples.

export function calculateSubtotal(unitPrice, quantityCount) {
  return unitPrice * quantityCount;
}
```

### `invalidStaticImportExample.js`

```js
// Goal:
// Intentionally show an invalid static import position.

if (true) {
  import { calculateSubtotal } from './priceCalculator.js';

  console.log(calculateSubtotal(20, 3));
}
```

这个文件是故意错误文件。运行它应该看到语法错误。

### `validStaticImportApp.js`

```js
// Goal:
// Use static import at the top level and use the value later.

import { calculateSubtotal } from './priceCalculator.js';

if (true) {
  console.log(calculateSubtotal(20, 3));
}
```

### 预期输出

```txt
60
```

### 底层机制

静态导入必须在顶层，是为了让引擎在执行模块代码前先完成依赖分析。

```txt
解析模块
  -> 找到所有静态 import
  -> 加载依赖模块
  -> 建立导入导出绑定
  -> 执行模块代码
```

---

## 15. 11：动态导入

### 结论

动态导入（dynamic import）用 `import()`，它返回 Promise，适合按需加载模块。

### 新关键字和新概念

#### `import()`

`import()` 看起来像函数调用，但 `import` 是关键字，不是普通函数。它返回 Promise，Promise 完成后得到模块命名空间对象。

#### Promise

Promise 表示一个未来完成的异步结果。你前面暂时还没有系统学异步，但这里先记住：`await import(...)` 会等待模块加载完成。

### 文件结构

```txt
11-dynamic-import/
  heavyReportFormatter.js
  reportButtonApp.js
```

### `heavyReportFormatter.js`

```js
// Goal:
// Export a module that will be loaded dynamically.

export function createHeavyReportText(reportTitle) {
  return `Heavy report: ${reportTitle}`;
}
```

### `reportButtonApp.js`

```js
// Goal:
// Dynamically load a module at runtime.

async function handleReportButtonClick() {
  const reportModule = await import('./heavyReportFormatter.js');

  console.log(reportModule.createHeavyReportText('Quarterly Revenue'));
}

handleReportButtonClick();
```

### 预期输出

```txt
Heavy report: Quarterly Revenue
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 调用 `handleReportButtonClick()`。 |
| 2 | 执行到 `import()`。 |
| 3 | 异步加载 `heavyReportFormatter.js`。 |
| 4 | 得到模块命名空间对象 `reportModule`。 |
| 5 | 调用 `reportModule.createHeavyReportText(...)`。 |

### 常见错误

错误：

```js
const reportModule = import('./heavyReportFormatter.js');
console.log(reportModule.createHeavyReportText('Quarterly Revenue'));
```

原因：`reportModule` 是 Promise，不是模块对象。

---

## 16. 12：循环导入

### 结论

循环导入不是必然错误，但它会让初始化顺序变复杂。真正危险的是：模块初始化阶段读取尚未初始化完成的绑定。

### 新关键字和新概念

#### 循环导入

```txt
A imports B.
B imports A.
```

这就是循环导入。

#### 初始化阶段

模块顶层代码执行、导出变量建立初始值的阶段。

### 文件结构

```txt
12-circular-imports/
  billingRules.js
  discountRules.js
  riskyBillingRules.js
  riskyDiscountRules.js
  app.js
```

### `billingRules.js`

```js
// Goal:
// Show a circular import that works because reading is delayed until function call time.

import { createDiscountText } from './discountRules.js';

export const billingLabel = 'Billing';

export function createBillingText() {
  return `${billingLabel} with ${createDiscountText()}`;
}
```

### `discountRules.js`

```js
// Goal:
// Import a binding from a module that also imports this module.

import { billingLabel } from './billingRules.js';

export function createDiscountText() {
  return `discount for ${billingLabel}`;
}
```

### `riskyBillingRules.js`

```js
// Goal:
// Show a risky circular import shape.

import { riskyDiscountText } from './riskyDiscountRules.js';

export const riskyBillingLabel = 'Risky Billing';

export function createRiskyBillingText() {
  return `${riskyBillingLabel} with ${riskyDiscountText}`;
}
```

### `riskyDiscountRules.js`

```js
// Goal:
// This top-level read may fail depending on initialization order.

import { riskyBillingLabel } from './riskyBillingRules.js';

export const riskyDiscountText = `discount for ${riskyBillingLabel}`;
```

### `app.js`

```js
// Goal:
// Compare a safer circular import with a risky circular import.

import { createBillingText } from './billingRules.js';

console.log(createBillingText());

// Uncomment this import after running the safe example.
// import { createRiskyBillingText } from './riskyBillingRules.js';
// console.log(createRiskyBillingText());
```

### 预期输出

```txt
Billing with discount for Billing
```

### 常见错误

循环导入能避免就避免。常见解决方式：

```txt
提取第三个共享模块。
把顶层计算改成函数内延迟计算。
重新划分模块职责。
```

---

## 17. 13：浏览器模块

### 结论

浏览器里使用 ES Module，要在 HTML 中写 `<script type="module">`。

### 新关键字和新概念

#### `type="module"`

这是 HTML script 标签的属性，告诉浏览器把这个脚本按 ES Module 处理，而不是普通脚本。

#### 本地服务器

浏览器模块通常不要用 `file://` 直接打开，建议用本地服务器。因为模块加载受到浏览器安全规则影响。

### 文件结构

```txt
13-browser-modules/
  index.html
  productCardRenderer.js
  app.js
```

### `productCardRenderer.js`

```js
// Goal:
// Export a rendering helper for the browser module entry file.

export function renderProductCard(productTitle, priceAmount) {
  return `${productTitle}: $${priceAmount}`;
}
```

### `app.js`

```js
// Goal:
// Import a browser module and write the result into the DOM.

import { renderProductCard } from './productCardRenderer.js';

const outputElement = document.querySelector('#output');

outputElement.textContent = renderProductCard('Keyboard', 99);
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Browser Module Demo</title>
  </head>
  <body>
    <div id="output"></div>
    <script type="module" src="./app.js"></script>
  </body>
</html>
```

### 运行方式

在 `13-browser-modules` 目录打开本地服务器：

```bash
npx serve .
```

或者：

```bash
python3 -m http.server 5173
```

### 常见错误

错误：

```html
<script src="./app.js"></script>
```

如果 `app.js` 里有 `import`，普通脚本无法解析。

---

## 18. 14：CommonJS 基础

### 结论

CommonJS 是 Node 传统模块系统，核心是 `require()`、`module.exports`、`exports`。

### 新关键字和新概念

#### `require()`

CommonJS 里用于加载另一个模块的函数。

#### `module.exports`

当前 CommonJS 模块真正导出的值。

#### `exports`

`module.exports` 的初始快捷引用。可以给它加属性，但不要直接给 `exports` 重新赋值。

### 文件结构

```txt
14-commonjs-basics/
  legacyTaxCalculator.cjs
  legacyOrderApp.cjs
```

### `legacyTaxCalculator.cjs`

```js
// Goal:
// Export multiple functions from a CommonJS module.

function calculateLegacyTax(subtotalAmount) {
  return subtotalAmount * 0.08;
}

function calculateLegacyTotal(subtotalAmount) {
  return subtotalAmount + calculateLegacyTax(subtotalAmount);
}

module.exports = {
  calculateLegacyTax,
  calculateLegacyTotal,
};
```

### `legacyOrderApp.cjs`

```js
// Goal:
// Load a CommonJS module with require().

const {
  calculateLegacyTax,
  calculateLegacyTotal,
} = require('./legacyTaxCalculator.cjs');

console.log(calculateLegacyTax(100));
console.log(calculateLegacyTotal(100));
```

### 预期输出

```txt
8
108
```

### 运行方式

```bash
node legacyOrderApp.cjs
```

### 底层机制

Node 会给 CommonJS 模块提供这些局部变量：

```txt
require
module
exports
__filename
__dirname
```

这些不是浏览器普通 JS 自带的全局变量，它们是 CommonJS 模块环境提供的。

---

## 19. 15：CommonJS 缓存和 exports 细节

### 结论

CommonJS 模块第一次 `require()` 时执行，之后会被缓存。多个 `require()` 拿到的是同一个模块导出对象。

### 文件结构

```txt
15-commonjs-cache-and-exports/
  requestCounter.cjs
  brokenExportsExample.cjs
  fixedModuleExportsExample.cjs
  commonjsCacheApp.cjs
```

### `requestCounter.cjs`

```js
// Goal:
// Verify that CommonJS modules are cached after the first require().

console.log('requestCounter module executed');

let requestCount = 0;

function increaseRequestCount() {
  requestCount += 1;
  return requestCount;
}

module.exports = {
  increaseRequestCount,
};
```

### `brokenExportsExample.cjs`

```js
// Goal:
// Show why assigning exports directly does not replace module.exports.

exports = function createBrokenReportTitle() {
  return 'Broken Report';
};
```

### `fixedModuleExportsExample.cjs`

```js
// Goal:
// Correctly replace module.exports with one exported function.

module.exports = function createFixedReportTitle() {
  return 'Fixed Report';
};
```

### `commonjsCacheApp.cjs`

```js
// Goal:
// Verify CommonJS caching and exports behavior.

const firstCounterModule = require('./requestCounter.cjs');
const secondCounterModule = require('./requestCounter.cjs');

console.log(firstCounterModule.increaseRequestCount());
console.log(secondCounterModule.increaseRequestCount());
console.log(firstCounterModule === secondCounterModule);

const brokenReportModule = require('./brokenExportsExample.cjs');
const createFixedReportTitle = require('./fixedModuleExportsExample.cjs');

console.log(typeof brokenReportModule);
console.log(createFixedReportTitle());
```

### 预期输出

```txt
requestCounter module executed
1
2
true
object
Fixed Report
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 第一次 `require('./requestCounter.cjs')` 执行模块。 |
| 2 | 第二次 `require()` 复用缓存。 |
| 3 | 两个变量指向同一个导出对象。 |
| 4 | `exports = ...` 没有替换 `module.exports`。 |
| 5 | `module.exports = ...` 正确导出单个函数。 |

---

## 20. 16：Node ESM

### 结论

Node 同时支持 CommonJS 和 ES Module。学习阶段用 `.cjs` 表示 CommonJS，用 `type: "module"` 或 `.mjs` 表示 ES Module。

### 新关键字和新概念

#### `package.json`

Node 项目的配置文件。这里最重要的是 `type` 字段。


#### `package.json`

`package.json` 是 Node 项目的配置文件。这里最重要的是 `type` 字段。

#### `"type": "module"`

`"type": "module"` 告诉 Node：这个包范围内的 `.js` 文件默认按 ES Module 处理。

#### `.mjs` / `.cjs`

`.mjs` 明确表示 ES Module。`.cjs` 明确表示 CommonJS。

### 文件结构

```txt
16-node-esm/
  package.json
  subtotalCalculator.js
  orderApp.js
```

### `package.json`

```json
{
  "type": "module"
}
```

### `subtotalCalculator.js`

```js
// Goal:
// Export a function from a Node ES module.

export function calculateSubtotalAmount(unitPrice, quantityCount) {
  return unitPrice * quantityCount;
}
```

### `orderApp.js`

```js
// Goal:
// Import and run a Node ES module.

import { calculateSubtotalAmount } from './subtotalCalculator.js';

console.log(calculateSubtotalAmount(25, 4));
```

### 预期输出

```txt
100
```

### 运行方式

```bash
node orderApp.js
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | Node 读取最近的 `package.json`。 |
| 2 | 发现 `"type": "module"`。 |
| 3 | Node 把 `.js` 文件按 ES Module 处理。 |
| 4 | `orderApp.js` 使用静态 `import` 加载 `subtotalCalculator.js`。 |
| 5 | `subtotalCalculator.js` 导出 `calculateSubtotalAmount`。 |
| 6 | 入口文件调用导入函数并输出 `100`。 |

### 常见错误

不要在 `.cjs` 文件里直接写静态 `import`。不要在 ES Module 里直接使用 CommonJS 的 `require`，除非你明确知道互操作规则。

---

## 21. 17：import.meta

### 结论

`import.meta` 是 ES Module 内部的元信息对象，最常用的是 `import.meta.url`。

### 新关键字和新概念

#### 元信息

元信息就是描述当前模块自身的信息，比如当前模块的 URL。

#### `import.meta.url`

当前模块文件的 URL。浏览器里通常是 `http://...`，Node ESM 里通常是 `file://...`。

### 文件结构

```txt
17-import-meta/
  moduleLocationViewer.mjs
```

### `moduleLocationViewer.mjs`

```js
// Goal:
// Inspect metadata about the current ES module.

console.log(import.meta.url);
```

### 运行方式

```bash
node moduleLocationViewer.mjs
```

### 输出

输出取决于你的本地路径，形状类似：

```txt
file:///your/path/moduleLocationViewer.mjs
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | Node 把 `.mjs` 文件作为 ES Module 执行。 |
| 2 | 模块内部可以访问 `import.meta`。 |
| 3 | `import.meta.url` 返回当前模块的文件 URL。 |

### 常见错误

`import.meta` 只在 ES Module 中有效，不是普通脚本和 CommonJS 的通用对象。

---

## 22. 18：顶层 await

### 结论

ES Module 支持顶层 `await`。如果一个模块使用顶层 `await`，导入它的模块要等它完成后再执行。

### 新关键字和新概念

#### `await`

`await` 会等待一个 Promise 完成。你后面异步章节会系统学习。这里先理解为“暂停当前模块的执行，等异步结果回来”。

#### 顶层 await

不在函数里面，直接写在模块顶层的 `await`。

### 文件结构

```txt
18-top-level-await/
  configLoader.mjs
  app.mjs
```

### `configLoader.mjs`

```js
// Goal:
// Export a value that is initialized with top-level await.

const simulatedConfigPromise = Promise.resolve({
  pageSize: 20,
  layoutMode: 'grid',
});

export const loadedConfig = await simulatedConfigPromise;
```

### `app.mjs`

```js
// Goal:
// Import a value from a module that uses top-level await.

import { loadedConfig } from './configLoader.mjs';

console.log(loadedConfig.pageSize);
console.log(loadedConfig.layoutMode);
```

### 预期输出

```txt
20
grid
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `app.mjs` 依赖 `configLoader.mjs`。 |
| 2 | `configLoader.mjs` 执行到顶层 `await`。 |
| 3 | 模块等待 Promise 完成。 |
| 4 | `loadedConfig` 初始化完成。 |
| 5 | `app.mjs` 继续执行并读取导入值。 |

### 常见错误

不要在基础共享模块里滥用顶层 `await`，否则依赖它的模块都会等待它完成。

---

## 23. 19：小项目整合

### 结论

最后用一个小项目把模块作用域、命名导出、默认导出、配置模块、浏览器模块整合起来。

### 文件结构

```txt
19-mini-practice-project/
  index.html
  main.js
  features/cart/cartMathTools.js
  features/cart/cartSummaryView.js
  features/profile/profileHeadingView.js
  config/defaultRuntimeConfig.js
```

### `config/defaultRuntimeConfig.js`

```js
// Goal:
// Export shared runtime configuration.

export const defaultCurrencySymbol = '$';
export const defaultUserName = 'Ada';
```

### `features/cart/cartMathTools.js`

```js
// Goal:
// Export cart calculation helpers.

export function calculateCartSubtotal(cartItems) {
  return cartItems.reduce((runningTotal, cartItem) => {
    return runningTotal + cartItem.priceAmount * cartItem.quantityCount;
  }, 0);
}

export function calculateCartItemCount(cartItems) {
  return cartItems.reduce((runningCount, cartItem) => {
    return runningCount + cartItem.quantityCount;
  }, 0);
}
```

### `features/cart/cartSummaryView.js`

```js
// Goal:
// Build a cart summary text from calculation helpers and config.

import {
  calculateCartSubtotal,
  calculateCartItemCount,
} from './cartMathTools.js';

import { defaultCurrencySymbol } from '../../config/defaultRuntimeConfig.js';

export function createCartSummaryText(cartItems) {
  const subtotalAmount = calculateCartSubtotal(cartItems);
  const itemCount = calculateCartItemCount(cartItems);

  return `${itemCount} items: ${defaultCurrencySymbol}${subtotalAmount}`;
}
```

### `features/profile/profileHeadingView.js`

```js
// Goal:
// Export a default profile heading renderer.

import { defaultUserName } from '../../config/defaultRuntimeConfig.js';

export default function createProfileHeadingText(displayName = defaultUserName) {
  return `Profile: ${displayName}`;
}
```

### `main.js`

```js
// Goal:
// Compose feature modules in a browser entry file.

import { createCartSummaryText } from './features/cart/cartSummaryView.js';
import createProfileHeadingText from './features/profile/profileHeadingView.js';

const cartItems = [
  { priceAmount: 30, quantityCount: 2 },
  { priceAmount: 15, quantityCount: 4 },
];

const outputElement = document.querySelector('#output');

outputElement.textContent = `${createProfileHeadingText()} | ${createCartSummaryText(cartItems)}`;
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Module Mini Practice Project</title>
  </head>
  <body>
    <div id="output"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

### 浏览器页面结果

```txt
Profile: Ada | 6 items: $120
```

### 项目意义

这组文件把你学到的这些点连起来：

```txt
配置模块
命名导出
默认导出
相对路径导入
浏览器 type="module"
功能目录划分
入口文件组合功能
```

---

## 24. 最终文件清单

```txt
javascript-module-learning/
  00-legacy-module-patterns/
    legacyModulePatternPage.html
    namespaceObjectPattern.js
    closureCounterModule.js
    iifeSettingsModule.js
    legacyModulePatternApp.js

  01-why-modules/
    discountTool.js
    shippingTool.js
    checkoutPreview.js

  02-module-scope/
    inventoryState.js
    dashboardApp.js

  03-named-exports/
    priceCalculator.js
    orderPreview.js

  04-default-export/
    createInvoiceLabel.js
    invoiceApp.js

  05-import-forms/
    currencyFormatter.js
    paymentDashboard.js

  06-re-export-barrel/
    formatters/
      dateLabelFormatter.js
      currencyLabelFormatter.js
      index.js
    dashboardReport.js

  07-live-bindings/
    sessionCounterStore.js
    sessionViewer.js

  08-module-executes-once/
    auditLogger.js
    firstDashboard.js
    secondDashboard.js
    app.js

  09-side-effect-module/
    consoleSetup.js
    app.js

  10-static-import-rules/
    priceCalculator.js
    invalidStaticImportExample.js
    validStaticImportApp.js

  11-dynamic-import/
    heavyReportFormatter.js
    reportButtonApp.js

  12-circular-imports/
    billingRules.js
    discountRules.js
    riskyBillingRules.js
    riskyDiscountRules.js
    app.js

  13-browser-modules/
    index.html
    productCardRenderer.js
    app.js

  14-commonjs-basics/
    legacyTaxCalculator.cjs
    legacyOrderApp.cjs

  15-commonjs-cache-and-exports/
    requestCounter.cjs
    brokenExportsExample.cjs
    fixedModuleExportsExample.cjs
    commonjsCacheApp.cjs

  16-node-esm/
    package.json
    subtotalCalculator.js
    orderApp.js

  17-import-meta/
    moduleLocationViewer.mjs

  18-top-level-await/
    configLoader.mjs
    app.mjs

  19-mini-practice-project/
    index.html
    main.js
    features/cart/cartMathTools.js
    features/cart/cartSummaryView.js
    features/profile/profileHeadingView.js
    config/defaultRuntimeConfig.js

  javascript-modules-learning-notes.md
```

---

## 25. 最终学习笔记转换要求

每一节最终整理成学习笔记时，固定使用这个结构：

```txt
结论
技术意义
关键字解释
底层机制
文件结构
代码示例
运行方式
预期输出
执行过程
常见错误 / 反例
和项目开发的关系
```

### 语言要求

```txt
正文说明：中文。
技术术语：中文后面括号补英文。
代码命名：英文。
代码注释：英文。
不要中英文标题混用。
```

### 代码命名要求

```txt
不要反复使用 fn、obj、data、user 这种泛名。
每个例子用有业务含义的命名。
不同主题尽量避免重复类名、函数名、变量名。
```

---

## 26. 本章最终要能回答的问题

学完第 10 章，你应该能回答：

```txt
1. 普通脚本和模块脚本有什么区别？
2. globalThis 是什么？为什么旧式模块会用它？
3. IIFE 是什么？为什么能创建私有作用域？
4. 闭包为什么能隐藏内部状态？
5. ES Module 为什么比旧式模块更适合工程化？
6. export 到底暴露了什么？
7. import 到底导入了什么？
8. 命名导出和默认导出怎么选？
9. 为什么命名导入必须名字匹配？
10. 为什么默认导入可以自定义本地名字？
11. 命名空间导入得到的是什么？
12. barrel 文件解决什么问题？有什么风险？
13. live binding 是什么？为什么不是值复制？
14. 导入绑定为什么不能重新赋值？
15. 为什么同一个模块只执行一次？
16. 副作用模块是什么？什么时候用？
17. 静态 import 为什么必须在顶层？
18. 动态 import() 为什么返回 Promise？
19. 循环导入为什么危险？
20. 浏览器为什么要写 type="module"？
21. CommonJS 的 require() 做什么？
22. module.exports 和 exports 有什么区别？
23. CommonJS 模块缓存怎么验证？
24. Node 怎么区分 .cjs、.mjs、type: module？
25. import.meta.url 有什么用？
26. 顶层 await 会怎样影响依赖模块？
27. 模块化如何对应真实前端项目目录？
```

最后记住这个模型：

```txt
旧式模块靠对象和函数作用域模拟封装。
ES Module 让文件本身成为语言级模块。
export 决定公开接口。
import 建立静态依赖关系。
模块内部默认私有。
导入绑定是实时绑定。
模块只执行一次。
动态 import() 用于运行时按需加载。
CommonJS 和 ESM 是两套不同机制。
浏览器、Node、打包工具都建立在模块依赖图上。
```
