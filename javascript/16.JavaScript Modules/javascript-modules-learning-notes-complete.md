# JavaScript 模块学习笔记

## 1. 结论

JavaScript 模块化不是简单地把代码拆成多个文件，而是解决四个问题：

```txt
作用域隔离：每个模块有自己的作用域。
依赖声明：当前文件依赖谁，要用 import 或 require 写清楚。
公开 API：哪些内容能被外部使用，要由 export 或 module.exports 决定。
执行规则：模块什么时候加载、执行几次、是否共享状态，由模块系统决定。
```

本章要真正掌握的是两套模块系统：

```txt
ES Module：import / export
CommonJS：require() / module.exports
```

---

## 2. 普通 script 和旧式模块模式

没有 ES Module 时，多个文件只能通过全局对象共享内容。

```js
globalThis.orderTools = {
  createOrderLabel(orderCode) {
    return `Order: ${orderCode}`;
  },
};

console.log(globalThis.orderTools.createOrderLabel('ORD-001'));
```

这种写法的问题是依赖关系不明显，文件加载顺序必须人工保证，而且全局对象上的属性容易被其他文件覆盖。

如果要隐藏内部状态，可以用 IIFE 和闭包：

```js
globalThis.ticketCounterModule = (() => {
  let nextTicketNumber = 1000;

  function createTicketCode() {
    nextTicketNumber += 1;
    return `TCK-${nextTicketNumber}`;
  }

  return {
    createTicketCode,
  };
})();
```

这里 `nextTicketNumber` 没有暴露到全局对象上，但 `createTicketCode` 仍然能访问它，因为函数保留了外层词法环境。这就是闭包机制。

---

## 3. ES Module 的核心机制

ES Module 中，每个文件都是一个独立模块。模块内部默认私有，只有被 `export` 的顶层绑定才能被其他模块导入。

```js
const internalStockLimit = 100;

export function checkStockLevel(stockCount) {
  return stockCount <= internalStockLimit;
}
```

外部只能导入公开 API：

```js
import { checkStockLevel } from './stockChecker.js';

console.log(checkStockLevel(80));
```

`internalStockLimit` 会在模块内部正常创建，也能被 `checkStockLevel` 使用，但外部不能直接导入它。

---

## 4. 模块 API 和内部实现

`export` 决定一个名字是否进入模块导出表。它不决定代码是否执行。

```js
const privateSeparator = '-';

function normalizeDatePart(partValue) {
  return String(partValue).padStart(2, '0');
}

export function createDateLabel(yearValue, monthValue, dayValue) {
  return [
    yearValue,
    normalizeDatePart(monthValue),
    normalizeDatePart(dayValue),
  ].join(privateSeparator);
}
```

这个模块的公开 API 是 `createDateLabel`。`privateSeparator` 和 `normalizeDatePart` 是内部实现。真实项目里不要把所有辅助函数都导出，只导出稳定、明确、外部确实需要使用的 API。

---

## 5. 命名导出和默认导出

命名导出适合一个模块暴露多个并列能力：

```js
export function calculateSubtotal(unitPrice, quantityCount) {
  return unitPrice * quantityCount;
}

export function calculateTaxAmount(subtotalAmount) {
  return subtotalAmount * 0.08;
}
```

导入时名字必须匹配：

```js
import {
  calculateSubtotal,
  calculateTaxAmount,
} from './priceCalculator.js';
```

默认导出适合一个文件有明确主能力：

```js
export default function createInvoiceLabel(invoiceNumber, customerName) {
  return `Invoice ${invoiceNumber} for ${customerName}`;
}
```

导入默认导出时不写花括号，导入名可以自己取：

```js
import createInvoiceLabel from './createInvoiceLabel.js';
```

默认导入虽然灵活，但容易命名混乱。实际项目里，工具函数集合优先用命名导出；组件、页面、一个文件一个主能力时可以用默认导出。

---

## 6. 命名空间导入

```js
import * as CurrencyFormatter from './currencyFormatter.js';

console.log(CurrencyFormatter.formatCurrencyAmount(20));
```

`import * as CurrencyFormatter` 只创建一个本地绑定 `CurrencyFormatter`。它不会直接创建 `formatCurrencyAmount`、`formatCurrencyCodeLabel` 这些本地变量。

所以如果用命名空间导入，调用时必须通过命名空间对象：

```js
CurrencyFormatter.formatCurrencyAmount(20);
```

如果想直接调用函数，就要命名导入：

```js
import { formatCurrencyAmount } from './currencyFormatter.js';
```

---

## 7. 模块顶层代码和副作用

模块中的顶层代码只要模块被导入就会执行，即使没有被导出。

```js
console.log('auditLogger module executed');

let logCount = 0;

export function writeAuditLog(messageText) {
  logCount += 1;
  return `${logCount}: ${messageText}`;
}
```

`console.log` 没有导出，但模块执行时会运行。`export` 只控制外部能不能导入某个绑定，不控制代码是否执行。

副作用导入只为了执行模块顶层代码：

```js
import './consoleSetup.js';
```

真实项目里，副作用模块常用于 polyfill、样式、全局注册或 SDK 初始化，但要谨慎，因为只要导入就会发生效果。

---

## 8. 模块只执行一次和共享状态

同一个模块在同一个模块图里通常只执行一次。

```txt
firstDashboard.js -> auditLogger.js
secondDashboard.js -> auditLogger.js
```

如果两个模块都导入 `auditLogger.js`，`auditLogger.js` 的顶层代码只执行一次，内部变量 `logCount` 也只有一份。两个导入方共享同一个模块实例。

这也是为什么模块内部状态可能连续变化：

```txt
1: first dashboard
2: second dashboard
```

---

## 9. live binding

ES Module 导入的是实时绑定，不是复制值。

```js
export let requestCount = 0;

export function increaseRequestCount() {
  requestCount += 1;
}
```

导入方：

```js
import {
  requestCount,
  increaseRequestCount,
} from './requestCounter.js';

console.log(requestCount);
increaseRequestCount();
console.log(requestCount);
```

输出：

```txt
0
1
```

导入方能看到导出模块里 `requestCount` 的最新值，但不能重新给导入绑定赋值。

---

## 10. 静态导入和动态导入

静态导入写在模块顶层，运行环境会在执行前建立模块依赖图。

```js
import { createReportText } from './reportFormatter.js';
```

动态导入是运行时表达式，返回 Promise：

```js
const reportModule = await import('./heavyReportFormatter.js');

console.log(reportModule.createHeavyReportText('Quarterly Revenue'));
```

不能把 `import()` 的返回值直接当模块对象使用：

```js
const reportModule = import('./heavyReportFormatter.js');
```

此时 `reportModule` 是 Promise，不是模块命名空间对象。

---

## 11. CommonJS

CommonJS 是 Node 传统模块系统。

```js
function calculateLegacyTotal(subtotalAmount) {
  return subtotalAmount + subtotalAmount * 0.08;
}

module.exports = {
  calculateLegacyTotal,
};
```

导入时用 `require()`：

```js
const legacyTaxCalculator = require('./legacyTaxCalculator.cjs');

console.log(legacyTaxCalculator.calculateLegacyTotal(100));
```

`require()` 返回目标模块最终的 `module.exports`。左边的变量名只是当前文件自己的本地变量名，不需要和导出名匹配。

```js
const firstCounterModule = require('./requestCounter.cjs');
const secondCounterModule = require('./requestCounter.cjs');
```

这两个名字不是目标模块导出的名字，只是接收 `module.exports` 的本地变量。

---

## 12. exports 和 module.exports

`exports` 初始只是指向 `module.exports` 的快捷变量。

可以这样给导出对象添加属性：

```js
exports.createReportTitle = function createReportTitle() {
  return 'Report';
};
```

不能这样整体替换导出：

```js
exports = function createBrokenReportTitle() {
  return 'Broken Report';
};
```

这只是改变局部变量 `exports` 的指向，不会改变真正的 `module.exports`。

整体替换必须写：

```js
module.exports = function createFixedReportTitle() {
  return 'Fixed Report';
};
```

---

## 13. .js、.mjs、.cjs

Node 判断模块系统时可以先记这张表：

| 文件或配置 | Node 解释方式 |
| --- | --- |
| `.mjs` | ES Module |
| `.cjs` | CommonJS |
| `.js` + `package.json` 中 `"type": "module"` | ES Module |
| `.js` + `package.json` 中 `"type": "commonjs"` 或无 `type` | CommonJS |

浏览器里重点不是扩展名，而是入口脚本是否使用：

```html
<script type="module" src="./main.js"></script>
```

---

## 14. 循环导入

循环导入不是绝对错误，危险点是模块初始化阶段读取对方尚未完成初始化的绑定。

```txt
moduleA imports moduleB
moduleB imports moduleA
```

更安全的做法是把读取延迟到函数调用时，而不是在顶层立刻计算结果。

```js
import { billingLabel } from './billingRules.js';

export function createDiscountText() {
  return `discount for ${billingLabel}`;
}
```

真实项目里遇到循环依赖时，优先提取共享模块，重新划分职责，避免顶层互相读取。

---

## 15. 最终记忆模型

```txt
一个文件就是一个模块。
模块内部默认私有。
export 决定公开 API。
import 建立依赖关系。
顶层代码会在模块执行时运行。
同一个模块通常只执行一次。
ES Module 导入的是 live binding。
CommonJS 的 require 返回 module.exports。
静态 import 用于提前建立依赖图。
动态 import() 用于运行时按需加载。
浏览器模块需要 script type="module"。
Node 中 .mjs 是 ESM，.cjs 是 CommonJS，.js 看 package.json type。
```
