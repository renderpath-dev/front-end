# JavaScript 模块学习笔记

## 1. 结论

JavaScript 模块化不是简单地把代码拆成多个文件，而是建立清晰的作用域边界、依赖关系、公开 API 和执行规则。

核心模型：

```txt
模块内部默认私有。
export 决定外部能导入什么。
import 声明当前模块依赖什么。
模块顶层代码会在模块加载时执行。
同一个模块在同一个模块图中通常只执行一次。
```

本章必须掌握四组区别：

```txt
普通 script vs ES Module
CommonJS vs ES Module
静态导入 vs 动态导入
模块内部实现 vs 模块公开 API
```

---

## 2. 普通 script 和旧式模块模式

ES Module 出现以前，JavaScript 通常靠全局对象、对象命名空间、IIFE 和闭包模拟模块。

### 2.1 globalThis

`globalThis` 不是方法，而是内置全局属性，指向当前运行环境的全局对象。

```js
globalThis.orderTools = {
  createOrderLabel(orderCode) {
    return `Order: ${orderCode}`;
  },
};
```

普通脚本里没有 `import` 和 `export`。如果另一个文件要使用 `orderTools`，只能依赖全局对象和 script 加载顺序。

```js
console.log(globalThis.orderTools.createOrderLabel('ORD-001'));
```

这种方式的问题：

```txt
依赖关系不明显。
全局名字容易冲突。
外部可以随意修改对象属性。
加载顺序错误会导致 undefined 或 ReferenceError。
```

### 2.2 IIFE 和闭包

IIFE 是立即执行函数表达式，用来创建私有作用域。

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

执行机制：

```txt
外层函数立即执行。
nextTicketNumber 存在于外层函数的词法环境里。
返回的 createTicketCode 保留了对这个词法环境的访问。
外部不能直接访问 nextTicketNumber。
```

闭包不是某一种函数写法，而是函数保留并访问外层词法环境的运行时机制。

---

## 3. ES Module 基础模型

ES Module 是语言级模块系统。每个模块文件都有独立的模块作用域。

```js
const internalStockLimit = 100;

export function checkStockLevel(stockCount) {
  return stockCount <= internalStockLimit;
}
```

外部可以导入 `checkStockLevel`，不能导入 `internalStockLimit`。

```js
import { checkStockLevel } from './stockChecker.js';

console.log(checkStockLevel(80));
```

`internalStockLimit` 仍然会被创建，并且可以被本模块内部函数使用。它只是没有进入导出表。

---

## 4. 模块 API 和模块顶层 API

模块 API 指一个模块通过 `export` 暴露给外部的公开接口。

模块顶层 API 强调这些公开接口来自模块最外层作用域的导出绑定。

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

公开 API：

```txt
createDateLabel
```

内部实现：

```txt
privateSeparator
normalizeDatePart
```

`export` 不要求写在文件开头，只要求写在模块顶层。

```js
function createUserLabel(userName) {
  return `User: ${userName}`;
}

export { createUserLabel };
```

错误写法：

```js
if (true) {
  export function createUserLabel(userName) {
    return `User: ${userName}`;
  }
}
```

原因：静态 `import` 和静态 `export` 要在执行前被分析，不能放进条件、循环或函数内部。

---

## 5. 命名导出和默认导出

### 5.1 命名导出

命名导出适合一个模块暴露多个并列能力。

```js
export function calculateSubtotal(unitPrice, quantityCount) {
  return unitPrice * quantityCount;
}

export function calculateTaxAmount(subtotalAmount) {
  return subtotalAmount * 0.08;
}
```

导入时名字要匹配：

```js
import {
  calculateSubtotal,
  calculateTaxAmount,
} from './priceCalculator.js';
```

### 5.2 默认导出

默认导出适合一个文件有明确主出口。

```js
const invoicePrefix = 'Invoice';

function normalizeInvoiceNumber(invoiceNumber) {
  return String(invoiceNumber).trim();
}

export default function createInvoiceLabel(invoiceNumber, customerName) {
  return `${invoicePrefix} ${normalizeInvoiceNumber(invoiceNumber)} for ${customerName}`;
}
```

导入时不写花括号：

```js
import createInvoiceLabel from './createInvoiceLabel.js';
```

默认导出的本地导入名可以自己取：

```js
import buildInvoiceText from './createInvoiceLabel.js';
```

这很灵活，但容易造成命名混乱。真实项目中最好让默认导入名和文件主能力保持一致。

选择规则：

```txt
多个工具函数：优先 named export。
单个主能力：可以 default export。
需要强约束导入名：优先 named export。
多个并列能力：不要强行 default export。
```

---

## 6. 导入形式

### 6.1 命名导入

```js
import { formatCurrencyAmount } from './currencyFormatter.js';
```

这是从目标模块的命名导出表中导入同名绑定。

### 6.2 重命名导入

```js
import { formatCurrencyAmount as createMoneyText } from './currencyFormatter.js';
```

`createMoneyText` 是当前文件里的本地名字，原模块导出的名字仍然是 `formatCurrencyAmount`。

### 6.3 命名空间导入

```js
import * as CurrencyFormatter from './currencyFormatter.js';

console.log(CurrencyFormatter.formatCurrencyAmount(20));
```

`*` 表示把模块所有导出收集成一个模块命名空间对象。

它只创建一个本地绑定：

```txt
CurrencyFormatter
```

不会直接创建：

```txt
formatCurrencyAmount
formatCurrencyCodeLabel
defaultCurrencyCode
```

所以如果没有单独导入 `formatCurrencyCodeLabel`，调用时必须写：

```js
CurrencyFormatter.formatCurrencyCodeLabel();
```

---

## 7. 顶层代码和副作用

模块中的顶层代码即使没有导出，也会在模块执行时运行。

```js
console.log('auditLogger module executed');

let logCount = 0;

export function writeAuditLog(messageText) {
  logCount += 1;
  return `${logCount}: ${messageText}`;
}
```

`console.log` 没有导出，但只要该模块被导入，它就会执行。

核心区别：

```txt
export 控制外部能否导入某个绑定。
import 触发模块加载和执行。
模块执行时会运行顶层代码。
```

副作用导入：

```js
import './consoleSetup.js';
```

这种写法不接收任何导出，只是为了执行目标模块的顶层代码。真实项目中可用于 polyfill、全局样式、SDK 初始化，但要谨慎使用。

---

## 8. 模块只执行一次

同一个模块在同一个模块图中通常只执行一次。

```txt
firstDashboard.js -> auditLogger.js
secondDashboard.js -> auditLogger.js
```

`auditLogger.js` 的顶层代码只执行一次，内部状态也只有一份。

如果 `writeAuditLog` 内部使用 `logCount` 计数，那么两个导入方共享同一份 `logCount`。

输出可能是：

```txt
auditLogger module executed
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

导入方不能重新给导入绑定赋值：

```js
requestCount = 99;
```

这会报错，因为导入绑定对导入方是只读视图。

---

## 10. 静态导入和动态导入

### 10.1 静态导入

```js
import { createReportText } from './reportFormatter.js';
```

特点：

```txt
必须写在模块顶层。
执行前建立依赖图。
适合程序启动时就需要的模块。
```

### 10.2 动态导入

```js
const reportModule = await import('./heavyReportFormatter.js');

console.log(reportModule.createHeavyReportText('Quarterly Revenue'));
```

`import()` 是运行时表达式，返回 Promise。`await` 等待 Promise 完成后，拿到模块命名空间对象。

错误写法：

```js
const reportModule = import('./heavyReportFormatter.js');

console.log(reportModule.createHeavyReportText('Quarterly Revenue'));
```

原因：此时 `reportModule` 是 Promise，不是模块对象。

当前阶段先记住：

```txt
import './file.js' 是静态导入。
import('./file.js') 是动态导入。
动态导入返回 Promise。
await 用于等待 Promise 完成。
```

---

## 11. CommonJS

CommonJS 是 Node 传统模块系统。

导出：

```js
function calculateLegacyTotal(subtotalAmount) {
  return subtotalAmount + subtotalAmount * 0.08;
}

module.exports = {
  calculateLegacyTotal,
};
```

导入：

```js
const legacyTaxCalculator = require('./legacyTaxCalculator.cjs');

console.log(legacyTaxCalculator.calculateLegacyTotal(100));
```

`require()` 返回目标模块最终的 `module.exports`。

所以本地变量名不需要匹配导出名：

```js
const firstCounterModule = require('./requestCounter.cjs');
const secondCounterModule = require('./requestCounter.cjs');
```

`firstCounterModule` 和 `secondCounterModule` 只是当前文件里的本地变量名。

### 11.1 exports 和 module.exports

正确添加属性：

```js
exports.createReportTitle = function createReportTitle() {
  return 'Report';
};
```

错误整体替换：

```js
exports = function createBrokenReportTitle() {
  return 'Broken Report';
};
```

这不会真正导出函数，因为它只是改变局部变量 `exports` 的指向。

正确整体替换：

```js
module.exports = function createFixedReportTitle() {
  return 'Fixed Report';
};
```

---

## 12. .js、.mjs、.cjs

Node 判断模块系统时可以按这张表记：

| 文件或配置 | Node 解释方式 |
| --- | --- |
| `.mjs` | ES Module |
| `.cjs` | CommonJS |
| `.js` + `package.json` 中 `"type": "module"` | ES Module |
| `.js` + `package.json` 中 `"type": "commonjs"` 或无 `type` | CommonJS |

浏览器中重点不是扩展名，而是 HTML：

```html
<script type="module" src="./main.js"></script>
```

---

## 13. 循环导入

循环导入是：

```txt
moduleA imports moduleB
moduleB imports moduleA
```

循环导入不是绝对错误。危险点是模块初始化期间读取对方尚未完成初始化的绑定。

更安全的方式是把读取延迟到函数调用时：

```js
import { billingLabel } from './billingRules.js';

export function createDiscountText() {
  return `discount for ${billingLabel}`;
}
```

项目中遇到循环依赖时，优先：

```txt
提取共享模块。
重新划分职责。
避免顶层立即读取对方绑定。
```

---

## 14. 项目中的模块边界

一个小型前端项目可以这样划分：

```txt
features/cart/cartMathTools.js：纯计算工具模块。
features/cart/cartSummaryView.js：组合计算结果并生成展示文本。
features/profile/profileHeadingView.js：默认导出一个主渲染函数。
config/defaultRuntimeConfig.js：导出共享配置常量。
main.js：浏览器入口模块，负责组合各功能模块。
```

设计模块 API 时，不要把内部辅助函数都导出。判断标准：

```txt
外部是否真的需要直接调用它？
它是不是稳定接口？
以后重构内部实现时，外部文件会不会被迫修改？
```

---

## 15. 常见错误

### 15.1 以为只有 export 的代码才执行

错误。模块被导入时，顶层代码都会执行。`export` 只控制外部能不能导入某个名字。

### 15.2 以为命名空间导入会创建所有本地变量

错误。`import * as CurrencyFormatter` 只创建 `CurrencyFormatter` 这个命名空间对象。

### 15.3 以为 default export 表示文件里只能有一个函数

错误。文件可以有很多内部函数，只是对外默认暴露一个主出口。

### 15.4 以为 CommonJS 的本地变量名要匹配导出名

错误。CommonJS 的 `require()` 返回一个值，本地变量名由当前文件自己取。

### 15.5 以为对象属性没定义就一定 ReferenceError

错误。`cartItem.priceAmount` 是属性访问；`priceAmount` 单独出现才是变量查找。

### 15.6 reduce 求和忘记初始值

数字累计通常要给初始值：

```js
export function calculateCartItemCount(cartItems) {
  return cartItems.reduce((runningCount, cartItem) => {
    return runningCount + cartItem.quantityCount;
  }, 0);
}
```

---

## 16. 最终记忆模型

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
