# JavaScript 模块学习笔记完整补充版

## 1. 结论

JavaScript 模块化解决的不是简单的文件拆分问题，而是代码边界、依赖关系、作用域隔离和执行顺序问题。

核心模型：

```txt
每个模块都有独立作用域。
模块内部默认私有。
export 决定公开 API。
import 建立显式依赖。
运行环境会根据模块系统加载、执行和缓存模块。
```

需要重点区分：

```txt
普通脚本 vs ES Module
CommonJS vs ES Module
静态导入 vs 动态导入
模块内部实现 vs 模块公开 API
```

---

## 2. 本章需要补齐的知识点

当前模块学习除了基础的 `import` 和 `export` 以外，还需要补齐这些内容：

1. 旧式模块模式：`globalThis`、对象命名空间、IIFE、闭包、script 加载顺序。
2. 模块顶层代码和导出 API 的区别。
3. 命名导出、默认导出、重命名导入、命名空间导入的机制差异。
4. ES Module 的 live binding。
5. 模块只执行一次和模块缓存。
6. 副作用模块。
7. 动态导入 `import()`。
8. CommonJS 的 `require()`、`module.exports`、`exports`。
9. `.js`、`.mjs`、`.cjs` 在 Node 中的区别。
10. 循环导入的风险和处理方式。
11. 实际项目中的模块边界设计。

---

## 3. 旧式模块模式

ES Module 出现以前，JavaScript 常用对象、函数作用域和闭包模拟模块。

### 3.1 globalThis

`globalThis` 不是方法，而是内置全局属性。它指向当前运行环境的全局对象。

```js
globalThis.checkoutTools = {
  calculateSubtotal(unitPrice, quantityCount) {
    return unitPrice * quantityCount;
  },
};
```

这段代码把 `checkoutTools` 挂到全局对象上。其他普通脚本只要加载顺序正确，就可以访问：

```js
const subtotalAmount = globalThis.checkoutTools.calculateSubtotal(25, 4);

console.log(subtotalAmount);
```

缺点是：依赖关系不明显，名字容易冲突，内部实现不容易隐藏。

### 3.2 IIFE 和闭包

IIFE 是立即执行函数表达式，用来创建局部作用域。

```js
globalThis.ticketCounterModule = (() => {
  let nextTicketNumber = 3000;

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
外层箭头函数立即执行。
nextTicketNumber 保存在外层函数的词法环境里。
返回的 createTicketCode 仍然可以访问 nextTicketNumber。
外部不能直接读取 nextTicketNumber。
```

这就是闭包：函数保留并访问外层词法环境的运行时机制。

### 3.3 普通 script 为什么要按顺序

普通脚本不会自动分析依赖。

```html
<script src="./checkoutTools.js"></script>
<script src="./ticketCounterModule.js"></script>
<script src="./legacyApp.js"></script>
```

入口文件通常放最后，因为它依赖前面的全局 API。顺序反了，就会出现 `undefined` 或 `ReferenceError`。

---

## 4. ES Module 的基础模型

ES Module 是语言级模块系统。每个文件天然有模块作用域。

```js
const internalStockLimit = 100;

export function checkStockLevel(stockCount) {
  return stockCount <= internalStockLimit;
}
```

外部只能导入被 `export` 暴露的名字：

```js
import { checkStockLevel } from './stockChecker.js';

console.log(checkStockLevel(80));
```

`internalStockLimit` 没有导出，所以它是模块内部实现。

---

## 5. export 的技术意义

`export` 不是让代码执行，而是把某个顶层绑定加入模块的导出表。

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

公开 API 是：

```txt
createDateLabel
```

内部实现是：

```txt
privateSeparator
normalizeDatePart
```

外部模块不应该依赖内部实现。

---

## 6. 命名导出和默认导出

### 6.1 命名导出

命名导出适合一个模块暴露多个并列能力。

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

### 6.2 默认导出

默认导出适合一个文件有明确主出口。

```js
export default function createInvoiceLabel(invoiceNumber, customerName) {
  return `Invoice ${invoiceNumber} for ${customerName}`;
}
```

导入默认导出时不写花括号：

```js
import createInvoiceLabel from './createInvoiceLabel.js';
```

默认导入的本地名字可以自己取。这个特性很灵活，但项目中容易造成命名混乱，所以最好让导入名、文件名和默认导出函数名保持一致。

### 6.3 选择规则

```txt
工具函数集合：优先 named export。
一个文件一个主能力：可以 default export。
需要强约束导入名：优先 named export。
多个并列能力：不要强行 default export。
```

---

## 7. 导入形式

### 7.1 命名导入

```js
import { formatCurrencyAmount } from './currencyFormatter.js';
```

这会从目标模块的命名导出表中导入同名绑定。

### 7.2 重命名导入

```js
import { formatCurrencyAmount as createMoneyText } from './currencyFormatter.js';
```

`createMoneyText` 是当前模块里的本地名字。原模块导出的名字仍然是 `formatCurrencyAmount`。

### 7.3 命名空间导入

```js
import * as CurrencyFormatter from './currencyFormatter.js';

console.log(CurrencyFormatter.formatCurrencyCodeLabel('USD'));
```

`*` 表示把目标模块的所有导出收集成一个模块命名空间对象。

注意：

```txt
import * as CurrencyFormatter 只创建 CurrencyFormatter 这个本地绑定。
它不会直接创建 formatCurrencyCodeLabel 变量。
所以调用时要写 CurrencyFormatter.formatCurrencyCodeLabel()。
```

---

## 8. 顶层代码和副作用

模块中的顶层代码会在模块执行时运行，即使它没有被导出。

```js
console.log('auditLogger module executed');

let logCount = 0;

export function writeAuditLog(messageText) {
  logCount += 1;
  return `${logCount}: ${messageText}`;
}
```

`console.log` 没有导出，但只要这个模块被导入，它就会执行。

原因：

```txt
export 控制外部能不能导入某个绑定。
export 不控制模块代码是否执行。
模块被加载后，顶层代码会按模块执行规则运行。
```

副作用导入：

```js
import './consoleSetup.js';
```

这种写法不拿任何导出值，只是为了执行目标模块的顶层代码。真实项目里常见于 polyfill、全局样式、初始化 SDK，但要谨慎使用。

---

## 9. 模块只执行一次

同一个模块在同一个模块图中通常只执行一次。

如果两个模块都导入 `auditLogger.js`：

```txt
firstDashboard.js -> auditLogger.js
secondDashboard.js -> auditLogger.js
```

`auditLogger.js` 的顶层代码只执行一次，内部状态也只有一份。

这就是为什么多个导入方共享同一个模块状态。

---

## 10. live binding

ES Module 导入的是实时绑定，不是复制值。

```js
export let activeSessionCount = 0;

export function increaseActiveSessionCount() {
  activeSessionCount += 1;
}
```

导入方：

```js
import {
  activeSessionCount,
  increaseActiveSessionCount,
} from './sessionCounterStore.js';

console.log(activeSessionCount);
increaseActiveSessionCount();
console.log(activeSessionCount);
```

输出：

```txt
0
1
```

但是导入方不能重新给导入绑定赋值：

```js
activeSessionCount = 100;
```

这会报错，因为导入绑定对导入方是只读的。

---

## 11. 静态导入和动态导入

### 11.1 静态导入

```js
import { createReportText } from './reportFormatter.js';
```

特点：

```txt
必须写在模块顶层。
执行前建立依赖图。
适合程序启动时就需要的模块。
```

### 11.2 动态导入

```js
const reportModule = await import('./heavyReportFormatter.js');

console.log(reportModule.createHeavyReportText('Quarterly Revenue'));
```

`import()` 是运行时表达式，返回 Promise。`await` 等待 Promise 完成后拿到模块命名空间对象。

当前阶段只需要先记住：

```txt
import './file.js' 是静态导入。
import('./file.js') 是动态导入。
动态导入返回 Promise。
await 用来等待 Promise 完成。
```

---

## 12. CommonJS

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

### 12.1 本地变量名不需要匹配导出名

```js
const firstCounterModule = require('./requestCounter.cjs');
const secondCounterModule = require('./requestCounter.cjs');
```

`firstCounterModule` 和 `secondCounterModule` 只是当前文件里的本地变量名，不需要原模块导出这两个名字。

### 12.2 exports 和 module.exports

正确添加导出属性：

```js
exports.createReportTitle = function createReportTitle() {
  return 'Report';
};
```

错误替换导出对象：

```js
exports = function createBrokenReportTitle() {
  return 'Broken Report';
};
```

原因：`exports` 初始只是指向 `module.exports` 的快捷变量。重新给 `exports` 赋值，只是改变当前模块内局部变量的指向，不会替换真正的 `module.exports`。

整体替换必须写：

```js
module.exports = function createFixedReportTitle() {
  return 'Fixed Report';
};
```

---

## 13. .js、.mjs、.cjs

Node 判断模块系统时可以按这张表记：

| 文件或配置 | Node 解释方式 |
| --- | --- |
| `.mjs` | ES Module |
| `.cjs` | CommonJS |
| `.js` + `package.json` 中 `"type": "module"` | ES Module |
| `.js` + `package.json` 中 `"type": "commonjs"` 或无 `type` | CommonJS |

结论：

```txt
.mjs 明确是 ES Module。
.cjs 明确是 CommonJS。
.js 取决于 package.json 的 type 字段。
```

浏览器中重点不是扩展名，而是 HTML：

```html
<script type="module" src="./main.js"></script>
```

---

## 14. 循环导入

循环导入是：

```txt
moduleA imports moduleB
moduleB imports moduleA
```

循环导入不是绝对错误，真正危险的是在模块初始化阶段读取对方尚未完成初始化的绑定。

更安全的方式是把读取延迟到函数调用时：

```js
import { billingLabel } from './billingRules.js';

export function createDiscountText() {
  return `discount for ${billingLabel}`;
}
```

更危险的方式是在顶层直接计算：

```js
import { billingLabel } from './billingRules.js';

export const discountText = `discount for ${billingLabel}`;
```

遇到循环依赖时，优先处理方式：

```txt
提取共享模块。
重新划分职责。
把顶层读取改成函数内延迟读取。
```

---

## 15. mini project 中的模块边界

一个小型前端项目中，模块可以这样划分：

```txt
features/cart/cartMathTools.js：纯计算工具模块。
features/cart/cartSummaryView.js：组合计算结果并生成展示文本。
features/profile/profileHeadingView.js：默认导出一个主渲染函数。
config/defaultRuntimeConfig.js：导出共享配置常量。
main.js：浏览器入口模块，负责组合各功能模块。
```

这体现了真实项目模块设计：

```txt
计算逻辑和视图拼接分开。
配置单独放到 config。
入口文件只做组合，不写复杂业务细节。
```

注意：

```js
cartItem.priceAmount
cartItem.quantityCount
```

这里的 `priceAmount` 和 `quantityCount` 是对象属性，不是独立变量。真正需要定义的是 `cartItem` 参数。

---

## 16. 常见错误

### 16.1 以为只有 export 的代码才执行

错误。模块被导入时，顶层代码都会执行。`export` 只控制外部能不能导入某个名字。

### 16.2 以为命名空间导入会创建所有本地变量

错误。`import * as CurrencyFormatter` 只创建 `CurrencyFormatter` 这个命名空间对象。

### 16.3 以为 default export 表示文件里只能有一个函数

错误。文件可以有很多内部函数，只是对外默认暴露一个主出口。

### 16.4 以为 CommonJS 的本地变量名要匹配导出名

错误。CommonJS 的 `require()` 返回一个值，本地变量名由当前文件自己取。

### 16.5 以为对象属性没定义就一定 ReferenceError

错误。`cartItem.priceAmount` 是属性访问；`priceAmount` 单独出现才是变量查找。

### 16.6 reduce 求和忘记初始值

数字累计通常要给初始值：

```js
export function calculateCartItemCount(cartItems) {
  return cartItems.reduce((runningCount, cartItem) => {
    return runningCount + cartItem.quantityCount;
  }, 0);
}
```

---

## 17. 最终记忆模型

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

---

## 18. 后续学习建议

模块化学完以后，下一步要把它迁移到真实前端目录组织中：

```txt
components：组件模块。
hooks：可复用状态逻辑模块。
utils：纯工具函数模块。
services：请求和外部接口模块。
stores：共享状态模块。
config：配置模块。
```

判断一个文件该导出什么时，问三个问题：

```txt
外部真的需要依赖它吗？
它是不是稳定 API？
以后重构内部实现时，外部文件会不会被迫修改？
```

只导出稳定公开 API，隐藏内部实现，这是模块化最重要的工程能力。
