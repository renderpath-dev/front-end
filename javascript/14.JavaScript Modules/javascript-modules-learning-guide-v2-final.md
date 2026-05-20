# JavaScript 模块学习指导文件

> 定位：这是第 10 章“模块”的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建练习目录、写代码、运行代码、观察输出，然后再整理最终学习笔记。  
> 语言规则：正文统一中文；必要技术术语保留英文括号；代码命名和代码注释统一英文。

---

## 目录

1. [这一章到底难在哪里](#1-这一章到底难在哪里)
2. [学习顺序总览](#2-学习顺序总览)
3. [模块解决什么问题](#3-模块解决什么问题)
4. [模块作用域](#4-模块作用域)
5. [命名导出和命名导入](#5-命名导出和命名导入)
6. [默认导出和默认导入](#6-默认导出和默认导入)
7. [重命名导入、命名空间导入、混合导入](#7-重命名导入命名空间导入混合导入)
8. [再导出和 barrel 文件](#8-再导出和-barrel-文件)
9. [导入值是实时绑定](#9-导入值是实时绑定)
10. [模块只执行一次](#10-模块只执行一次)
11. [副作用模块](#11-副作用模块)
12. [静态导入的限制](#12-静态导入的限制)
13. [动态导入](#13-动态导入)
14. [循环导入](#14-循环导入)
15. [浏览器模块](#15-浏览器模块)
16. [CommonJS 模块](#16-commonjs-模块)
17. [Node 里的 ESM 和 CommonJS 区分](#17-node-里的-esm-和-commonjs-区分)
18. [`import.meta`](#18-importmeta)
19. [顶层 await](#19-顶层-await)
20. [模块化和前端项目的关系](#20-模块化和前端项目的关系)
21. [学习时必须做的验证](#21-学习时必须做的验证)
22. [最终需要创建的文件清单](#22-最终需要创建的文件清单)

---

## 1. 这一章到底难在哪里

### 结论

模块化这一章不简单。

它的难点不是语法数量，而是：

```txt
一个文件和另一个文件之间如何建立依赖关系。
模块内部变量为什么默认私有。
导出的值为什么不是普通复制。
模块为什么只执行一次。
浏览器和 Node 为什么对模块有不同要求。
CommonJS 和 ES Module 为什么不是同一种机制。
循环导入为什么有时能运行，有时会报错。
```

所以本章不能只背：

```js
export function calculateTotal() {}
import { calculateTotal } from './calculator.js';
```

真正要学的是：

```txt
语法层：import / export 怎么写。
运行时层：模块什么时候加载、什么时候执行、值如何绑定。
工程层：浏览器、Node、打包工具如何组织模块。
```

### 技术意义

前面你已经学了函数、对象、原型、类。那些知识大部分可以在一个文件里学。

模块不同。模块的核心就是：

```txt
把代码拆成多个文件。
让文件之间有明确的公开接口。
避免所有变量都堆在全局作用域里。
```

现代前端项目几乎都是模块组织：

```txt
components/
hooks/
utils/
services/
stores/
routes/
```

React、Next.js、Node、Vite、Webpack、npm 包，全部建立在模块系统上。

### 这一章要避免的错误学习方式

不要这样学：

```txt
看几个 import/export 例子就结束。
```

应该这样学：

```txt
每个主题至少两个文件。
写一个导出文件。
写一个导入文件。
运行入口文件。
观察输出。
解释每个文件什么时候执行。
解释变量到底来自哪里。
解释错误写法为什么错。
```

---

## 2. 学习顺序总览

### 结论

建议按这个顺序学：

```txt
旧式模块思想
  -> 模块作用域
  -> 命名导出
  -> 默认导出
  -> 重命名和命名空间导入
  -> 再导出
  -> 实时绑定
  -> 模块执行缓存
  -> 副作用模块
  -> 静态导入限制
  -> 动态导入
  -> 循环导入
  -> 浏览器模块
  -> CommonJS
  -> Node ESM / CJS 边界
```

### 为什么先讲旧式模块思想

书上第 10 章会先讲基于类、对象、闭包的模块思想，再讲 Node 模块，最后讲 ES6 模块。这个顺序很合理，因为 ES Module 不是凭空来的，它解决的是早期 JavaScript 没有标准模块系统时出现的问题。

早期 JavaScript 经常这样组织代码：

```js
const PriceTools = {
  calculateSubtotal(unitPrice, quantityCount) {
    return unitPrice * quantityCount;
  },

  calculateTax(subtotalAmount) {
    return subtotalAmount * 0.08;
  },
};

console.log(PriceTools.calculateSubtotal(30, 2));
```

这个对象 `PriceTools` 像一个“命名空间”。它减少了全局变量数量，但它不是真正的模块。

问题是：

```txt
PriceTools 仍然是全局变量。
外部可以随便改 PriceTools.calculateSubtotal。
没有真正的文件级私有作用域。
依赖关系不清楚。
```

ES Module 让“文件本身”成为模块，这才是现代写法。

---

## 3. 模块解决什么问题

### 结论

模块解决三个核心问题：

```txt
1. 命名冲突
2. 代码隐藏
3. 依赖关系表达
```

### 技术意义

不使用模块时，多个脚本共享全局作用域，容易冲突。

#### 文件结构

```txt
01-why-modules/
  discountTool.js
  shippingTool.js
  index.html
```

#### `discountTool.js`

```js
const rateValue = 0.1;

function calculateFinalPrice(priceAmount) {
  return priceAmount * (1 - rateValue);
}
```

#### `shippingTool.js`

```js
const rateValue = 5;

function calculateShippingFee(weightAmount) {
  return weightAmount * rateValue;
}
```

#### `index.html`

```html
<script src="./discountTool.js"></script>
<script src="./shippingTool.js"></script>
```

如果这两个文件都作为普通脚本加载，两个文件里的 `rateValue` 都在同一个全局环境里，容易发生重复声明或覆盖问题。

### 模块写法

#### `discountTool.js`

```js
const discountRate = 0.1;

export function calculateDiscountedPrice(priceAmount) {
  return priceAmount * (1 - discountRate);
}
```

#### `shippingTool.js`

```js
const feePerKilogram = 5;

export function calculateShippingFee(weightAmount) {
  return weightAmount * feePerKilogram;
}
```

#### `checkoutPreview.js`

```js
import { calculateDiscountedPrice } from './discountTool.js';
import { calculateShippingFee } from './shippingTool.js';

console.log(calculateDiscountedPrice(100));
console.log(calculateShippingFee(3));
```

### 底层机制

模块把文件变成独立作用域：

```txt
discountTool.js 内部的 discountRate 只属于 discountTool.js。
shippingTool.js 内部的 feePerKilogram 只属于 shippingTool.js。
checkoutPreview.js 只能访问被 export 的内容。
```

### 学习要求

你要能解释：

```txt
为什么 discountRate 不需要暴露出去。
为什么 calculateDiscountedPrice 必须 export。
为什么 checkoutPreview.js 必须 import 才能使用它。
```

---

## 4. 模块作用域

### 结论

ES Module 里，每个文件都有自己的模块作用域。没有导出的变量、函数、类默认只在当前模块内部可见。

### 技术意义

这和你前面学过的函数作用域、块级作用域是同一类问题：变量在哪里生效。

模块作用域可以理解为：

```txt
文件级作用域。
```

### 文件结构

```txt
02-module-scope/
  inventoryState.js
  dashboardApp.js
```

### `inventoryState.js`

```js
const internalStockLimit = 100;

export function checkStockLevel(stockCount) {
  return stockCount <= internalStockLimit;
}
```

### `dashboardApp.js`

```js
import { checkStockLevel } from './inventoryState.js';

console.log(checkStockLevel(80));
console.log(checkStockLevel(120));
```

输出：

```txt
true
false
```

### 代码执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `dashboardApp.js` 发现它依赖 `inventoryState.js` |
| 2 | JavaScript 先加载并执行 `inventoryState.js` |
| 3 | `internalStockLimit` 被创建在 `inventoryState.js` 的模块作用域里 |
| 4 | `checkStockLevel` 被导出 |
| 5 | `dashboardApp.js` 获得 `checkStockLevel` 的导入绑定 |
| 6 | 调用 `checkStockLevel(80)`，返回 `true` |

### 常见错误

错误写法：

```js
import { checkStockLevel } from './inventoryState.js';

console.log(internalStockLimit);
```

这会报错，因为 `internalStockLimit` 没有导出。

### 你要验证

在 `dashboardApp.js` 里尝试访问：

```js
console.log(internalStockLimit);
```

观察报错，然后写下原因：

```txt
internalStockLimit 是 inventoryState.js 的模块内部变量，没有 export。
```

---

## 5. 命名导出和命名导入

### 结论

命名导出（named export）适合一个模块导出多个有明确名字的值。

### 技术意义

如果一个文件提供一组相关工具函数，用命名导出最清晰。

### 文件结构

```txt
03-named-exports/
  priceCalculator.js
  orderPreview.js
```

### `priceCalculator.js`

```js
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

输出：

```txt
100
8
108
```

### 底层机制

`export function calculateSubtotal(...) {}` 同时做了两件事：

```txt
1. 在当前模块作用域里声明函数。
2. 把这个函数名放进模块的导出表。
```

`import { calculateSubtotal } from './priceCalculator.js'` 表示：

```txt
从 priceCalculator.js 的导出表里取名为 calculateSubtotal 的绑定。
```

### 常见错误

错误：导入名字拼错。

```js
import { calculateSubTotal } from './priceCalculator.js';
```

如果导出文件里没有 `calculateSubTotal`，会报错。

注意大小写：

```txt
calculateSubtotal
calculateSubTotal
```

这是两个不同的标识符。

---

## 6. 默认导出和默认导入

### 结论

默认导出（default export）适合一个模块主要导出一个核心值。

### 技术意义

如果一个文件只负责一个主要功能，可以用默认导出。

### 文件结构

```txt
04-default-export/
  createInvoiceLabel.js
  invoiceApp.js
```

### `createInvoiceLabel.js`

```js
export default function createInvoiceLabel(invoiceNumber, customerName) {
  return `Invoice ${invoiceNumber} for ${customerName}`;
}
```

### `invoiceApp.js`

```js
import buildInvoiceText from './createInvoiceLabel.js';

console.log(buildInvoiceText('INV-001', 'Ada'));
```

输出：

```txt
Invoice INV-001 for Ada
```

### 为什么导入时名字可以不同

导出文件里函数名是：

```txt
createInvoiceLabel
```

导入文件里名字是：

```txt
buildInvoiceText
```

这是允许的，因为默认导出导入时不靠原始名字匹配，而是导入这个模块的默认导出。

### 底层机制

可以理解成模块有一个特殊导出槽位：

```txt
default
```

导入时：

```js
import buildInvoiceText from './createInvoiceLabel.js';
```

意思是：

```txt
把 createInvoiceLabel.js 的 default 导出绑定到本地名字 buildInvoiceText。
```

### 常见错误

错误：把默认导出当命名导出导入。

```js
import { createInvoiceLabel } from './createInvoiceLabel.js';
```

如果文件只写了 `export default`，没有命名导出 `createInvoiceLabel`，这种写法不成立。

---

## 7. 重命名导入、命名空间导入、混合导入

### 结论

导入时可以重命名，也可以把一个模块的命名导出整体收进一个对象形态的命名空间里。

### 文件结构

```txt
05-import-forms/
  currencyFormatter.js
  paymentDashboard.js
```

### `currencyFormatter.js`

```js
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

### 普通命名导入

```js
import { formatCurrencyAmount } from './currencyFormatter.js';

console.log(formatCurrencyAmount(19.5));
```

### 重命名导入

```js
import { formatCurrencyAmount as createMoneyText } from './currencyFormatter.js';

console.log(createMoneyText(19.5));
```

### 命名空间导入

```js
import * as CurrencyFormatter from './currencyFormatter.js';

console.log(CurrencyFormatter.defaultCurrencyCode);
console.log(CurrencyFormatter.formatCurrencyAmount(19.5));
```

### 混合导入

```js
import createCurrencySummary, {
  formatCurrencyAmount,
  defaultCurrencyCode,
} from './currencyFormatter.js';

console.log(createCurrencySummary(19.5));
console.log(formatCurrencyAmount(19.5));
console.log(defaultCurrencyCode);
```

### 学习重点

你要能区分：

| 写法 | 含义 |
|---|---|
| `import name from` | 导入 default |
| `import { name } from` | 导入命名导出 |
| `import { name as aliasName } from` | 重命名命名导入 |
| `import * as Namespace from` | 导入所有命名导出到命名空间对象 |

---

## 8. 再导出和 barrel 文件

### 结论

再导出（re-export）用于把多个模块的导出集中到一个入口文件。这个入口文件常被叫做 barrel 文件。

### 技术意义

项目里经常不希望这样写：

```js
import { formatOrderDate } from './formatters/dateFormatter.js';
import { formatOrderCurrency } from './formatters/currencyFormatter.js';
```

可以让 `formatters/index.js` 统一导出。

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
export function formatOrderDate(yearValue, monthValue, dayValue) {
  return [yearValue, monthValue, dayValue].join('-');
}
```

### `formatters/currencyLabelFormatter.js`

```js
export function formatOrderCurrency(amountValue) {
  return `$${amountValue.toFixed(2)}`;
}
```

### `formatters/index.js`

```js
export { formatOrderDate } from './dateLabelFormatter.js';
export { formatOrderCurrency } from './currencyLabelFormatter.js';
```

### `dashboardReport.js`

```js
import {
  formatOrderDate,
  formatOrderCurrency,
} from './formatters/index.js';

console.log(formatOrderDate(2026, 5, 6));
console.log(formatOrderCurrency(120));
```

输出：

```txt
2026-5-6
$120.00
```

### 底层机制

`index.js` 不一定真正使用这些函数。它只是把别的模块的导出继续暴露给外部。

### 常见错误

barrel 文件不要乱导出所有东西。它应该作为稳定入口，而不是把内部实现全部暴露。

---

## 9. 导入值是实时绑定

### 结论

ES Module 导入的是实时绑定（live binding），不是把值复制一份。

### 技术意义

这是模块系统里最容易误解的点。

### 文件结构

```txt
07-live-bindings/
  sessionCounterStore.js
  sessionViewer.js
```

### `sessionCounterStore.js`

```js
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

输出：

```txt
0
1
2
0
```

### 底层机制

`sessionViewer.js` 里的 `activeSessionCount` 不是普通局部变量，也不是 `0` 的复制品。

它是连接到 `sessionCounterStore.js` 里 `activeSessionCount` 的导入绑定。

当导出模块内部修改：

```js
activeSessionCount += 1;
```

导入模块读取：

```js
console.log(activeSessionCount);
```

会看到更新后的值。

### 常见错误

错误：在导入模块里重新给导入值赋值。

```js
import { activeSessionCount } from './sessionCounterStore.js';

activeSessionCount = 100;
```

这会报错。

原因：

```txt
导入绑定对导入方来说是只读绑定。
导出模块可以更新它。
导入模块不能重新赋值它。
```

---

## 10. 模块只执行一次

### 结论

同一个模块被多个地方导入时，模块代码只会执行一次，后续导入复用同一个模块实例。

### 技术意义

这解释了为什么模块可以用来保存共享状态，也解释了为什么模块顶层副作用要谨慎。

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
console.log('auditLogger module executed');

let logCount = 0;

export function writeAuditLog(messageText) {
  logCount += 1;
  return `${logCount}: ${messageText}`;
}
```

### `firstDashboard.js`

```js
import { writeAuditLog } from './auditLogger.js';

export function renderFirstDashboard() {
  console.log(writeAuditLog('first dashboard'));
}
```

### `secondDashboard.js`

```js
import { writeAuditLog } from './auditLogger.js';

export function renderSecondDashboard() {
  console.log(writeAuditLog('second dashboard'));
}
```

### `app.js`

```js
import { renderFirstDashboard } from './firstDashboard.js';
import { renderSecondDashboard } from './secondDashboard.js';

renderFirstDashboard();
renderSecondDashboard();
```

输出：

```txt
auditLogger module executed
1: first dashboard
2: second dashboard
```

### 底层机制

| 步骤 | 发生什么 |
|---|---|
| 1 | `app.js` 依赖 `firstDashboard.js` 和 `secondDashboard.js` |
| 2 | 两个模块都依赖 `auditLogger.js` |
| 3 | `auditLogger.js` 第一次被加载时执行顶层代码 |
| 4 | 第二次遇到同一个模块时，不重新执行顶层代码 |
| 5 | `logCount` 在同一个模块实例中继续累加 |

### 常见错误

不要在模块顶层写不可控副作用，比如自动发请求、自动修改全局对象。

---

## 11. 副作用模块

### 结论

副作用模块（side-effect module）是不导入具体值，只执行模块顶层代码的模块。

### 文件结构

```txt
09-side-effect-module/
  consoleSetup.js
  app.js
```

### `consoleSetup.js`

```js
console.log('console setup module executed');

globalThis.applicationLabel = 'Module Demo';
```

### `app.js`

```js
import './consoleSetup.js';

console.log(globalThis.applicationLabel);
```

输出：

```txt
console setup module executed
Module Demo
```

### 技术意义

这种写法在项目里常见于：

```txt
加载全局样式
注册 polyfill
初始化监控 SDK
注册自定义元素
```

### 常见错误

副作用模块要慎用，因为调用方看不到明确导入了哪个值，但模块仍然会改变环境。

---

## 12. 静态导入的限制

### 结论

静态 `import` 必须写在模块顶层，不能写在 `if`、函数、循环里。

### 错误示例

```js
if (true) {
  import { calculateSubtotal } from './priceCalculator.js';
}
```

这是语法错误。

### 正确写法

```js
import { calculateSubtotal } from './priceCalculator.js';

if (true) {
  console.log(calculateSubtotal(20, 3));
}
```

### 底层机制

静态导入之所以必须在顶层，是因为 JavaScript 引擎要在模块执行前先分析依赖图。

```txt
先解析模块依赖。
再加载依赖模块。
再建立导入导出绑定。
最后执行模块代码。
```

如果 `import` 可以随便写在条件里，引擎就不能在执行前完整确定依赖关系。

### 和动态导入的区别

如果你真的需要根据条件加载模块，用动态 `import()`。

---

## 13. 动态导入

### 结论

动态导入（dynamic import）用 `import()`，它返回一个 Promise，适合按需加载模块。

### 文件结构

```txt
10-dynamic-import/
  heavyReportFormatter.js
  reportButtonApp.js
```

### `heavyReportFormatter.js`

```js
export function createHeavyReportText(reportTitle) {
  return `Heavy report: ${reportTitle}`;
}
```

### `reportButtonApp.js`

```js
async function handleReportButtonClick() {
  const reportModule = await import('./heavyReportFormatter.js');

  console.log(reportModule.createHeavyReportText('Quarterly Revenue'));
}

handleReportButtonClick();
```

输出：

```txt
Heavy report: Quarterly Revenue
```

### 底层机制

执行：

```js
const reportModule = await import('./heavyReportFormatter.js');
```

过程是：

| 步骤 | 发生什么 |
|---|---|
| 1 | 运行到 `import()` 表达式 |
| 2 | 异步加载目标模块 |
| 3 | 如果模块还没执行过，执行模块顶层代码 |
| 4 | Promise resolve 出模块命名空间对象 |
| 5 | `reportModule.createHeavyReportText` 访问导出的函数 |

### 使用场景

```txt
路由懒加载
大型图表库按需加载
后台管理页面按需加载
点击按钮后再加载功能模块
```

### 常见错误

错误：忘记 `await`。

```js
const reportModule = import('./heavyReportFormatter.js');
console.log(reportModule.createHeavyReportText('Quarterly Revenue'));
```

这里 `reportModule` 是 Promise，不是模块对象。

---

## 14. 循环导入

### 结论

循环导入（circular import）不是必然错误，但很容易因为初始化顺序导致问题。

### 文件结构

```txt
11-circular-imports/
  billingRules.js
  discountRules.js
  app.js
```

### `billingRules.js`

```js
import { createDiscountText } from './discountRules.js';

export const billingLabel = 'Billing';

export function createBillingText() {
  return `${billingLabel} with ${createDiscountText()}`;
}
```

### `discountRules.js`

```js
import { billingLabel } from './billingRules.js';

export function createDiscountText() {
  return `discount for ${billingLabel}`;
}
```

### `app.js`

```js
import { createBillingText } from './billingRules.js';

console.log(createBillingText());
```

输出可能正常：

```txt
Billing with discount for Billing
```

### 为什么这个例子能运行

`discountRules.js` 没有在模块顶层立刻读取一个还没初始化完成的值来计算最终结果，它是在函数执行时读取 `billingLabel`。

### 更危险的写法

```js
import { billingLabel } from './billingRules.js';

export const discountText = `discount for ${billingLabel}`;
```

如果初始化顺序不合适，可能遇到暂时性死区相关错误。

### 学习要求

你要能说清楚：

```txt
循环导入的核心问题不是“两个文件互相 import”本身。
真正危险的是在模块初始化阶段读取尚未完成初始化的绑定。
```

### 实际项目建议

尽量避免循环依赖。常见解决方式：

```txt
提取第三个共享模块。
把顶层计算改成函数内延迟计算。
重新划分模块职责。
```

---

## 15. 浏览器模块

### 结论

浏览器里使用 ES Module，需要在 HTML 中写：

```html
<script type="module" src="./app.js"></script>
```

### 文件结构

```txt
12-browser-modules/
  index.html
  productCardRenderer.js
  app.js
```

### `productCardRenderer.js`

```js
export function renderProductCard(productTitle, priceAmount) {
  return `${productTitle}: $${priceAmount}`;
}
```

### `app.js`

```js
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

不要直接双击 HTML 文件。建议开本地服务器。

```bash
npx serve .
```

或者：

```bash
python3 -m http.server 5173
```

### 浏览器模块特点

```txt
模块自动严格模式。
模块有自己的作用域。
模块顶层 this 是 undefined。
模块默认延迟执行，类似 defer。
浏览器模块导入路径通常要写完整相对路径和文件扩展名。
```

### 常见错误

错误：忘记 `type="module"`。

```html
<script src="./app.js"></script>
```

如果 `app.js` 里有 `import`，普通脚本不能解析它。

---

## 16. CommonJS 模块

### 结论

CommonJS 是 Node 早期和长期使用的模块系统，核心语法是：

```txt
require()
module.exports
exports
```

### 文件结构

```txt
13-commonjs-basics/
  legacyTaxCalculator.cjs
  legacyOrderApp.cjs
```

### `legacyTaxCalculator.cjs`

```js
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
const {
  calculateLegacyTax,
  calculateLegacyTotal,
} = require('./legacyTaxCalculator.cjs');

console.log(calculateLegacyTax(100));
console.log(calculateLegacyTotal(100));
```

输出：

```txt
8
108
```

### 底层机制

CommonJS 里每个文件也是一个模块。Node 会给模块包装出类似这些局部变量：

```txt
require
module
exports
__filename
__dirname
```

`module.exports` 是这个模块真正导出的对象。

### `exports` 和 `module.exports` 的关系

可以这样写：

```js
exports.calculateLegacyTax = function calculateLegacyTax(subtotalAmount) {
  return subtotalAmount * 0.08;
};
```

但不要这样替换：

```js
exports = {
  calculateLegacyTax() {
    return 8;
  },
};
```

原因：

```txt
exports 初始只是指向 module.exports 的快捷变量。
重新给 exports 赋值，只是改了局部变量指向，不会替换 module.exports。
```

### 常见错误

如果你要整体导出一个函数或对象，用：

```js
module.exports = createLegacyReport;
```

不要用：

```js
exports = createLegacyReport;
```

---

## 17. Node 里的 ESM 和 CommonJS 区分

### 结论

Node 现在同时支持 CommonJS 和 ES Module，但它们不是同一种模块系统。

### 文件扩展名规则

| 文件 | Node 通常如何处理 |
|---|---|
| `.cjs` | CommonJS |
| `.mjs` | ES Module |
| `.js` | 由最近的 `package.json` 里的 `type` 决定 |

### `package.json`

```json
{
  "type": "module"
}
```

表示同一包作用域里的 `.js` 默认按 ES Module 处理。

```json
{
  "type": "commonjs"
}
```

表示 `.js` 默认按 CommonJS 处理。

### ESM 示例

#### 文件结构

```txt
14-node-esm/
  package.json
  subtotalCalculator.js
  orderApp.js
```

#### `package.json`

```json
{
  "type": "module"
}
```

#### `subtotalCalculator.js`

```js
export function calculateSubtotalAmount(unitPrice, quantityCount) {
  return unitPrice * quantityCount;
}
```

#### `orderApp.js`

```js
import { calculateSubtotalAmount } from './subtotalCalculator.js';

console.log(calculateSubtotalAmount(25, 4));
```

输出：

```txt
100
```

### 学习阶段建议

先不要混用 CJS 和 ESM。分别建立目录：

```txt
commonjs-basics/ 用 .cjs
node-esm/ 用 package.json type module
```

把两个系统分别学清楚，再研究互操作。

---

## 18. `import.meta`

### 结论

`import.meta` 是模块内部的元信息对象。最常用的是 `import.meta.url`。

### 文件结构

```txt
15-import-meta/
  moduleLocationViewer.js
```

### `moduleLocationViewer.js`

```js
console.log(import.meta.url);
```

在浏览器里，它通常是当前模块文件的 URL。  
在 Node ESM 里，它通常是当前模块文件的 `file://` URL。

### 技术意义

`import.meta.url` 可以用于：

```txt
定位当前模块文件
基于当前模块路径构造资源路径
替代 CommonJS 中的部分 __filename / __dirname 场景
```

### 注意

`import.meta` 只在模块里有效。普通脚本里不能用。

---

## 19. 顶层 await

### 结论

ES Module 支持顶层 `await`。这意味着模块顶层可以等待 Promise。

### 文件结构

```txt
16-top-level-await/
  configLoader.js
  app.js
```

### `configLoader.js`

```js
const simulatedConfigPromise = Promise.resolve({
  pageSize: 20,
  layoutMode: 'grid',
});

export const loadedConfig = await simulatedConfigPromise;
```

### `app.js`

```js
import { loadedConfig } from './configLoader.js';

console.log(loadedConfig.pageSize);
console.log(loadedConfig.layoutMode);
```

输出：

```txt
20
grid
```

### 底层机制

如果一个模块使用顶层 `await`，依赖它的模块要等它完成后才能继续执行。

### 常见错误

不要在共享基础模块里滥用顶层 `await`，否则可能拖慢整个依赖链。

---

## 20. 模块化和前端项目的关系

### 结论

模块化是前端工程从“写脚本”进入“组织项目”的关键。

### React 里会遇到

```txt
组件默认导出
hooks 命名导出
utils 命名导出
barrel 文件统一导出
动态导入页面组件
```

### Node 里会遇到

```txt
CommonJS 老项目
ESM 新项目
package.json type
.cjs / .mjs 文件
模块缓存
路径解析
```

### Next.js 里会遇到

```txt
文件路由就是模块组织
server module 和 client module 边界
动态 import
按路由分割代码
```

### 打包工具里会遇到

```txt
依赖图
tree shaking
副作用分析
路径别名
barrel 文件影响打包结果
```

---

## 21. 学习时必须做的验证

这一章学习时，不要只看代码。每个主题都要做这些验证：

```txt
1. 故意导入一个没有 export 的名字，观察错误。
2. 修改导出模块里的 let 变量，观察导入方是否看到更新。
3. 多个模块导入同一个模块，验证它是否只执行一次。
4. 把静态 import 写进 if，观察语法错误。
5. 用 import() 动态加载模块，观察返回 Promise。
6. 制造一个循环导入，观察什么时候报错，什么时候不报错。
7. 浏览器里去掉 type="module"，观察 import 报错。
8. Node 里分别运行 .cjs、.mjs、type module 的 .js 文件。
9. 尝试把默认导出用命名导入方式导入，观察错误。
10. 尝试在导入方重新给 imported binding 赋值，观察错误。
```

---

## 22. 最终需要创建的文件清单和执行要求

### 结论

最终以这一份清单为准。它是在 v2 主线基础上合并了旧式模块模式、CommonJS 缓存与 `exports` 细节，以及最后的小项目整合练习。

```txt
v2 是主版本。
v1 只作为补充来源。
最终执行以本节清单为准。
```

这份清单不是最终学习笔记目录，而是你写代码、跑输出、验证机制的练习目录。等这些文件全部跑通之后，再整理最终学习笔记。

---

### 总目录

```txt
javascript-module-learning/
  00-legacy-module-patterns/
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

### 00-legacy-module-patterns

```txt
00-legacy-module-patterns/
  namespaceObjectPattern.js
  closureCounterModule.js
  iifeSettingsModule.js
  legacyModulePatternApp.js
```

学习目标：理解 ES 模块出现之前，JavaScript 如何用对象命名空间、闭包、立即调用函数表达式（IIFE）模拟模块。

必须验证：

```txt
对象命名空间能减少全局变量数量，但不能真正隐藏内部状态。
闭包可以隐藏内部变量，只暴露返回对象里的公共方法。
IIFE 可以立即创建一个私有作用域。
旧式模块模式是运行时对象模式，不是语言级文件模块系统。
```

---

### 01-why-modules

```txt
01-why-modules/
  discountTool.js
  shippingTool.js
  checkoutPreview.js
```

学习目标：理解模块要解决命名冲突、代码隐藏、依赖表达这三个问题。

必须验证：

```txt
普通脚本容易共享全局作用域。
模块文件内部变量不会自动暴露给其他文件。
需要被外部使用的能力必须显式 export。
使用方必须显式 import。
```

---

### 02-module-scope

```txt
02-module-scope/
  inventoryState.js
  dashboardApp.js
```

学习目标：理解模块作用域。没有导出的变量、函数、类默认只在当前模块内部可见。

必须验证：

```txt
在导入文件里访问没有 export 的变量会报错。
模块内部变量可以被导出的函数间接使用。
模块作用域不是全局作用域。
```

---

### 03-named-exports

```txt
03-named-exports/
  priceCalculator.js
  orderPreview.js
```

学习目标：掌握命名导出（named export）和命名导入（named import）。

必须验证：

```txt
导入名称必须和导出名称匹配。
命名导出适合一个模块导出多个相关能力。
导入时大小写必须一致。
```

---

### 04-default-export

```txt
04-default-export/
  createInvoiceLabel.js
  invoiceApp.js
```

学习目标：掌握默认导出（default export）和默认导入（default import）。

必须验证：

```txt
默认导出适合一个模块主要导出一个核心能力。
默认导入时，本地名称可以自己取。
默认导出不能直接用命名导入形式导入，除非同时提供了对应命名导出。
```

---

### 05-import-forms

```txt
05-import-forms/
  currencyFormatter.js
  paymentDashboard.js
```

学习目标：掌握普通命名导入、重命名导入、命名空间导入、默认导入和混合导入。

必须验证：

```txt
import { name } from './module.js' 导入命名导出。
import defaultName from './module.js' 导入默认导出。
import { name as aliasName } from './module.js' 可以重命名。
import * as Namespace from './module.js' 得到模块命名空间对象。
混合导入可以同时导入默认导出和命名导出。
```

---

### 06-re-export-barrel

```txt
06-re-export-barrel/
  formatters/
    dateLabelFormatter.js
    currencyLabelFormatter.js
    index.js
  dashboardReport.js
```

学习目标：掌握再导出（re-export）和 barrel 文件。

必须验证：

```txt
index.js 可以统一转发多个模块的导出。
调用方可以从统一入口导入多个工具。
barrel 文件本身不一定使用这些工具，它只是重新暴露导出。
barrel 文件不要暴露内部不稳定实现。
```

---

### 07-live-bindings

```txt
07-live-bindings/
  sessionCounterStore.js
  sessionViewer.js
```

学习目标：理解 ES 模块导入的是实时绑定（live binding），不是复制值。

必须验证：

```txt
导出模块内部修改 let 变量后，导入模块再次读取会看到新值。
导入绑定对导入方是只读的，不能在导入模块里重新赋值。
实时绑定不是对象引用的简单别名，而是模块绑定关系。
```

---

### 08-module-executes-once

```txt
08-module-executes-once/
  auditLogger.js
  firstDashboard.js
  secondDashboard.js
  app.js
```

学习目标：验证同一个模块在同一个模块图中只执行一次。

必须验证：

```txt
模块顶层 console.log 只输出一次。
多个导入方共享同一份模块内部状态。
模块缓存会让后续导入复用已有模块记录。
```

---

### 09-side-effect-module

```txt
09-side-effect-module/
  consoleSetup.js
  app.js
```

学习目标：理解副作用模块（side-effect module）。

必须验证：

```txt
import './consoleSetup.js' 不导入具体绑定，只执行模块顶层代码。
副作用模块可以注册全局配置、polyfill、全局监听器、监控 SDK。
副作用模块要命名清楚，不要隐藏重要行为。
```

---

### 10-static-import-rules

```txt
10-static-import-rules/
  priceCalculator.js
  invalidStaticImportExample.js
  validStaticImportApp.js
```

学习目标：理解静态导入（static import）必须写在模块顶层。

必须验证：

```txt
把 import 写进 if / function / loop 会产生语法错误。
静态 import 必须在模块执行前建立依赖图。
如果需要条件加载，应该使用动态 import()。
```

注意：`invalidStaticImportExample.js` 是故意写错的验证文件。它不需要作为正常练习入口运行，只用于观察错误。

---

### 11-dynamic-import

```txt
11-dynamic-import/
  heavyReportFormatter.js
  reportButtonApp.js
```

学习目标：掌握动态导入（dynamic import）。

必须验证：

```txt
import() 返回 Promise。
await import('./module.js') 得到模块命名空间对象。
动态导入适合按钮点击后加载、路由懒加载、大型功能按需加载。
忘记 await 时，拿到的是 Promise，不是模块对象。
```

---

### 12-circular-imports

```txt
12-circular-imports/
  billingRules.js
  discountRules.js
  riskyBillingRules.js
  riskyDiscountRules.js
  app.js
```

学习目标：理解循环导入（circular import）和初始化顺序。

必须验证：

```txt
循环导入本身不一定报错。
危险点是在模块初始化阶段读取尚未初始化完成的绑定。
把读取行为延迟到函数调用阶段，通常更安全。
复杂循环依赖应该通过提取第三个共享模块来解决。
```

---

### 13-browser-modules

```txt
13-browser-modules/
  index.html
  productCardRenderer.js
  app.js
```

学习目标：掌握浏览器模块和 `<script type="module">`。

必须验证：

```txt
HTML 里必须使用 <script type="module" src="./app.js"></script>。
浏览器模块有自己的作用域，自动严格模式。
模块顶层 this 是 undefined。
浏览器模块练习要通过本地服务器运行，不要直接双击 HTML。
```

建议运行方式：

```bash
npx serve .
```

或者：

```bash
python3 -m http.server 5173
```

---

### 14-commonjs-basics

```txt
14-commonjs-basics/
  legacyTaxCalculator.cjs
  legacyOrderApp.cjs
```

学习目标：掌握 CommonJS 基础：`require()`、`module.exports`、`.cjs`。

必须验证：

```txt
.cjs 文件按 CommonJS 处理。
require() 返回目标模块的 module.exports。
CommonJS 文件有自己的模块作用域。
```

---

### 15-commonjs-cache-and-exports

```txt
15-commonjs-cache-and-exports/
  requestCounter.cjs
  brokenExportsExample.cjs
  fixedModuleExportsExample.cjs
  commonjsCacheApp.cjs
```

学习目标：理解 CommonJS 模块缓存，以及 `exports` 和 `module.exports` 的区别。

必须验证：

```txt
同一个 CommonJS 模块被 require 多次，顶层代码通常只执行一次。
module.exports 才是真正导出的对象。
exports 初始只是 module.exports 的快捷引用。
exports.name = value 可以添加导出属性。
exports = value 不能替换真正导出的对象。
module.exports = value 可以整体替换导出结果。
```

---

### 16-node-esm

```txt
16-node-esm/
  package.json
  subtotalCalculator.js
  orderApp.js
```

学习目标：掌握 Node 里的 ES 模块（ESM）基础，以及 `package.json` 的 `type: "module"`。

必须验证：

```txt
package.json 设置 "type": "module" 后，.js 文件按 ESM 处理。
Node ESM 中使用 import / export。
相对导入路径通常要写文件扩展名。
不要在 ESM 中直接使用 CommonJS 的 require。
```

---

### 17-import-meta

```txt
17-import-meta/
  moduleLocationViewer.mjs
```

学习目标：理解 `import.meta`，尤其是 `import.meta.url`。

必须验证：

```txt
import.meta 只在模块中有效。
import.meta.url 表示当前模块的 URL。
在 Node ESM 中通常是 file:// URL。
它可以替代一部分 CommonJS 里 __filename / __dirname 的使用场景。
```

---

### 18-top-level-await

```txt
18-top-level-await/
  configLoader.mjs
  app.mjs
```

学习目标：理解顶层 `await`（top-level await）对模块依赖执行顺序的影响。

必须验证：

```txt
ES 模块顶层可以使用 await。
依赖这个模块的其他模块会等待它完成。
不要在很多基础模块里滥用顶层 await，否则会拖慢依赖链。
```

---

### 19-mini-practice-project

```txt
19-mini-practice-project/
  index.html
  main.js
  features/cart/cartMathTools.js
  features/cart/cartSummaryView.js
  features/profile/profileHeadingView.js
  config/defaultRuntimeConfig.js
```

学习目标：把模块作用域、命名导出、默认导出、再导出、浏览器模块、配置模块、小型功能模块组合到一个小项目里。

必须验证：

```txt
cartMathTools.js 只负责计算购物车数据。
cartSummaryView.js 只负责生成购物车显示文本。
profileHeadingView.js 只负责生成用户标题文本。
defaultRuntimeConfig.js 只负责导出配置。
main.js 作为入口文件组织这些模块。
index.html 只通过 type="module" 加载 main.js。
```

---

### 最终学习笔记文件

```txt
javascript-modules-learning-notes.md
```

最终学习笔记要在完成所有练习之后再写。最终笔记不是简单复制代码，而是把每个知识点整理成固定结构：

```txt
结论
技术意义
底层机制
代码示例
执行过程
和当前学习内容的关系
常见错误 / 反例
项目使用场景
```

---

### 文件命名要求

1. 目录名前面保留编号，方便按学习顺序执行。
2. 文件名统一使用英文语义命名。
3. 示例中不要反复使用 `fn`、`obj`、`data`、`user` 这种泛名。
4. 入口文件可以叫 `app.js`、`main.js`、`orderPreview.js`、`dashboardApp.js`，但同一个目录内部不要重复语义混乱的名字。
5. CommonJS 文件统一使用 `.cjs`。
6. Node ESM 独立练习可以使用 `.mjs`，或者使用 `package.json` 的 `type: "module"` 后使用 `.js`。
7. 浏览器模块使用 `.js`，通过 HTML 的 `<script type="module">` 加载。

---

### 代码注释要求

代码文件里的注释统一使用英文。每个文件顶部至少写清楚：

```js
// Goal:
// Verify how named exports and named imports work in ES modules.

// Expected output:
// 100
// 8
// 108
```

如果某个文件是故意写错的验证文件，也要明确标注：

```js
// Goal:
// Demonstrate why static import cannot be placed inside a block.

// Expected result:
// This file should throw a syntax error when executed.
```

---

### Markdown 写作要求

1. 正文统一中文叙述。
2. 技术术语第一次出现时使用中文 + 英文括号，例如：命名导出（named export）。
3. 不要把标题写成纯英文，例如不要写 `Technical meaning`，要写 `技术意义`。
4. 代码命名和代码注释保持英文。
5. 每一节必须包含执行过程，不要只贴代码。
6. 每一节必须包含至少一个常见错误或反例。
7. 如果涉及浏览器、Node、CommonJS、ESM 差异，必须明确运行环境。

---

### 运行要求

1. 浏览器模块目录通过本地服务器运行。
2. CommonJS 目录通过 Node 运行 `.cjs` 入口文件。
3. Node ESM 目录根据文件扩展名或 `package.json` 的 `type` 运行。
4. 故意写错的文件不要混进正常执行流程。
5. 每个目录跑通后，把输出结果记录到最终学习笔记里。
6. 每个错误验证文件也要记录错误原因，而不是只记录报错文本。

---

## 最后记忆模型

模块化这一章最终要形成这个模型：

```txt
一个文件就是一个模块。
模块内部默认私有。
export 决定公开接口。
import 建立依赖关系。
导入值是实时绑定。
模块只执行一次。
静态 import 用于提前建立依赖图。
动态 import() 用于运行时按需加载。
CommonJS 和 ESM 是两套不同模块系统。
浏览器模块必须用 type="module"。
Node 里要通过扩展名或 package.json type 明确模块系统。
```
