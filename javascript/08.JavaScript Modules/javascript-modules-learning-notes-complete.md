# JavaScript 模块学习笔记完整补充版

> 定位：这是第 10 章“模块”的最终学习笔记。它不是练习清单，而是把练习过程中的机制、错误、边界和项目用法整理成一份可复习的笔记。

## 1. 结论

JavaScript 模块化解决的核心问题不是“把代码拆成多个文件”，而是：

```txt
每个文件有独立作用域。
模块只暴露明确的公开 API。
导入方必须显式声明依赖。
运行环境根据模块系统决定加载、执行和缓存规则。
```

本章最终要区分四组关系：

```txt
普通脚本 vs ES Module
CommonJS vs ES Module
静态导入 vs 动态导入
模块内部实现 vs 模块公开 API
```

---

## 2. 还需要补齐的知识点

你已经练到了 `import`、`export`、默认导出、命名导出、命名空间导入、模块只执行一次、CommonJS、`.js` / `.mjs` / `.cjs`、浏览器模块和 mini project。还需要特别补齐这些点：

1. 旧式模块模式和 ES Module 的边界：`globalThis`、对象命名空间、闭包、IIFE、script 加载顺序。
2. 模块顶层代码和导出 API 的区别：没有 `export` 的顶层语句也会执行，但外部不能直接导入它。
3. 导入绑定和对象属性的区别：`import { name }` 是模块绑定，`object.name` 是属性访问。
4. 命名空间导入的机制：`import * as Namespace` 只创建一个命名空间对象，不会把所有名字直接放到当前作用域。
5. live binding：ES Module 导入的是实时绑定，不是复制值。
6. 模块执行缓存：同一个模块在同一个模块图里只执行一次。
7. CommonJS 的 `exports` 和 `module.exports` 区别。
8. Node 对 `.js`、`.mjs`、`.cjs` 的解释规则。
9. 动态导入 `import()` 返回 Promise，和静态 `import` 不是同一类语法。
10. 循环导入不是绝对错误，真正危险的是初始化阶段读取未完成初始化的绑定。
11. 副作用模块需要谨慎，导入模块会执行顶层代码。
12. 项目设计上要控制导出边界，不要把内部辅助函数全部导出。

---

## 3. 技术意义

模块化让代码组织从“全局脚本堆叠”进入“文件级依赖管理”。

没有模块时，多个脚本通过全局对象共享内容，依赖顺序靠 HTML 的 `<script>` 排列维护。ES Module 出现后，依赖关系写在 JS 文件内部：

```js
import { calculateCartSubtotal } from './cartMathTools.js';
```

这行代码不仅是语法，它表达了三件事：

```txt
当前模块依赖 cartMathTools.js。
当前模块只需要 calculateCartSubtotal 这个公开 API。
运行环境可以在执行前建立模块依赖图。
```

---

## 4. 旧式模块模式

### 4.1 结论

旧式模块模式不是语言级模块系统，它靠对象、函数作用域和闭包模拟模块。

常见形式：

```txt
对象命名空间：减少全局变量数量，但不能隐藏内部状态。
闭包模块：用函数作用域隐藏内部变量。
IIFE：立即执行函数，创建私有作用域。
```

### 4.2 globalThis

`globalThis` 不是方法，它是内置全局属性，指向当前运行环境的全局对象。

```js
globalThis.checkoutTools = {
  calculateSubtotal(unitPrice, quantityCount) {
    return unitPrice * quantityCount;
  },
};
```

在浏览器中它通常对应 `window`，在 Node 中通常对应 `global`。

旧式脚本没有 `import` / `export`，所以公共 API 经常挂到 `globalThis` 上。

### 4.3 IIFE 和闭包

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

执行过程：

```txt
IIFE 立即执行。
创建私有变量 nextTicketNumber。
返回包含 createTicketCode 的对象。
外部不能直接访问 nextTicketNumber。
createTicketCode 仍然能访问它，因为函数形成闭包。
```

关键结论：

```txt
闭包不是一种函数写法。
闭包是函数保留并访问外层词法环境的运行时机制。
```

### 4.4 旧式脚本为什么要按顺序加载

普通 `<script>` 不会自动分析依赖：

```html
<script src="./namespaceObjectPattern.js"></script>
<script src="./closureCounterModule.js"></script>
<script src="./iifeSettingsModule.js"></script>
<script src="./legacyModulePatternApp.js"></script>
```

排序规则：

```txt
先加载创建全局 API 的文件。
再加载使用这些 API 的入口文件。
入口文件通常放最后。
```

如果入口文件先执行，就会出现：

```txt
globalThis.checkoutNamespaceTools is undefined
```

这正是旧式模块的缺点：依赖关系靠加载顺序，不靠语言级声明。

---

## 5. ES Module 基础模型

### 5.1 模块作用域

ES Module 中，每个文件都有自己的模块作用域。没有导出的变量、函数、类默认只在当前文件内部可见。

```js
const internalStockLimit = 100;

export function checkStockLevel(stockCount) {
  return stockCount <= internalStockLimit;
}
```

外部可以导入 `checkStockLevel`，不能导入 `internalStockLimit`。

### 5.2 export 的意义

`export` 决定一个顶层绑定是否进入模块导出表。

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

模块公开 API 只有：

```txt
createDateLabel
```

`privateSeparator` 和 `normalizeDatePart` 是内部实现。

---

## 6. 命名导出和默认导出

### 6.1 命名导出

命名导出适合多个并列能力：

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

### 6.2 默认导出

默认导出适合一个文件有明确主出口：

```js
export default function createInvoiceLabel(invoiceNumber, customerName) {
  return `Invoice ${invoiceNumber} for ${customerName}`;
}
```

导入时不写花括号：

```js
import createInvoiceLabel from './createInvoiceLabel.js';
```

默认导入的本地名字可以自己取，这是优点也是风险。项目里如果使用 default export，最好让导入名和文件名、导出名保持一致。

### 6.3 选择规则

```txt
工具函数集合：优先 named export。
组件、页面、主配置对象：可以 default export。
需要强约束导入名：优先 named export。
一个文件多个并列能力：不要强行 default export。
```

---

## 7. 导入形式

### 7.1 命名导入

```js
import { formatCurrencyAmount } from './currencyFormatter.js';
```

从模块的命名导出表中导入同名绑定。

### 7.2 重命名导入

```js
import { formatCurrencyAmount as createMoneyText } from './currencyFormatter.js';
```

`createMoneyText` 是当前模块里的本地名字，原模块导出的名字仍然是 `formatCurrencyAmount`。

### 7.3 命名空间导入

```js
import * as CurrencyFormatter from './currencyFormatter.js';

console.log(CurrencyFormatter.formatCurrencyCodeLabel());
```

`*` 表示把模块所有导出收集成一个模块命名空间对象。

注意：

```txt
import * as CurrencyFormatter 不会直接创建 formatCurrencyCodeLabel 变量。
它只创建 CurrencyFormatter 这个本地绑定。
所以要通过 CurrencyFormatter.formatCurrencyCodeLabel() 调用。
```

---

## 8. 顶层代码、模块执行和副作用

### 8.1 顶层代码会执行

```js
console.log('auditLogger module executed');

let logCount = 0;

export function writeAuditLog(messageText) {
  logCount += 1;
  return `${logCount}: ${messageText}`;
}
```

`console.log` 没有导出也会执行，因为 `export` 只决定名字能不能被外部导入，不决定代码会不会运行。

模块被导入时，整个模块的顶层代码会执行一次。

### 8.2 模块只执行一次

如果两个模块都导入同一个模块：

```txt
firstDashboard.js -> auditLogger.js
secondDashboard.js -> auditLogger.js
```

`auditLogger.js` 顶层代码只执行一次，内部状态 `logCount` 也只有一份。

所以输出会连续累加：

```txt
1: first dashboard
2: second dashboard
```

### 8.3 副作用模块

```js
import './consoleSetup.js';
```

这种导入不拿任何导出值，只是为了执行模块顶层代码。它常用于 polyfill、全局注册、初始化 SDK，但项目中要谨慎使用。

---

## 9. live binding

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

导入方不能重新赋值导入绑定：

```js
activeSessionCount = 100;
```

这会报错，因为导入绑定对导入方是只读的。

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
适合程序开始就需要的模块。
```

不能写在 `if` 或函数内部。

### 10.2 动态导入

```js
const reportModule = await import('./heavyReportFormatter.js');

console.log(reportModule.createHeavyReportText('Quarterly Revenue'));
```

`import()` 是运行时表达式，返回 Promise。`await` 等待 Promise 完成后拿到模块命名空间对象。

当前阶段只需要记住：

```txt
import './file.js' 是静态导入。
import('./file.js') 是动态导入。
动态导入返回 Promise。
await 用来等待 Promise 完成。
```

---

## 11. CommonJS

### 11.1 基础规则

CommonJS 是 Node 传统模块系统：

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

### 11.2 本地变量名不需要匹配导出名

```js
const firstCounterModule = require('./requestCounter.cjs');
const secondCounterModule = require('./requestCounter.cjs');
```

`firstCounterModule` 和 `secondCounterModule` 只是当前文件里的本地变量名，不需要原模块导出这两个名字。

### 11.3 exports 和 module.exports

正确添加属性：

```js
exports.createReportTitle = function createReportTitle() {
  return 'Report';
};
```

错误替换导出：

```js
exports = function createBrokenReportTitle() {
  return 'Broken Report';
};
```

原因：`exports` 初始只是指向 `module.exports` 的快捷变量。重新给 `exports` 赋值，只是改变局部变量指向，不会替换真正的 `module.exports`。

整体替换必须写：

```js
module.exports = function createFixedReportTitle() {
  return 'Fixed Report';
};
```

---

## 12. .js、.mjs、.cjs

Node 判断模块系统时，先记这张表：

| 文件或配置 | Node 解释方式 |
| --- | --- |
| `.mjs` | ES Module |
| `.cjs` | CommonJS |
| `.js` + `package.json` 中 `"type": "module"` | ES Module |
| `.js` + `package.json` 中 `"type": "commonjs"` 或无 `type` | CommonJS |

所以：

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

## 13. 循环导入

循环导入是：

```txt
moduleA imports moduleB
moduleB imports moduleA
```

它不是绝对错误。危险点在于：模块初始化阶段读取对方尚未完成初始化的绑定。

安全一些的做法是把读取延迟到函数调用时：

```js
import { billingLabel } from './billingRules.js';

export function createDiscountText() {
  return `discount for ${billingLabel}`;
}
```

更危险的做法是在顶层直接计算：

```js
import { billingLabel } from './billingRules.js';

export const discountText = `discount for ${billingLabel}`;
```

项目中遇到循环依赖时，优先：

```txt
提取共享模块。
重新划分职责。
把顶层读取改成函数内延迟读取。
```

---

## 14. mini project 中的模块边界

mini project 中至少有三类模块：

```txt
features/cart/cartMathTools.js：纯计算工具模块。
features/cart/cartSummaryView.js：组合计算结果和配置，生成展示文本。
features/profile/profileHeadingView.js：默认导出一个主渲染函数。
config/defaultRuntimeConfig.js：导出共享配置常量。
main.js：浏览器入口模块，组合各功能模块。
```

这体现了真实项目模块划分：

```txt
计算逻辑和视图拼接分开。
配置单独放在 config。
入口文件只做组合，不写复杂业务细节。
```

注意 `cartItem.priceAmount` 和 `cartItem.quantityCount` 是对象属性，不是独立变量。真正定义的是 `cartItem` 参数，属性来自传入数组中的对象。

---

## 15. 常见错误汇总

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

---

## 17. 后续学习建议

这一章结束后，不要急着背更多语法。下一步重点是把模块化迁移到真实前端项目组织里：

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
如果我以后重构内部实现，外部文件会不会被迫修改？
```

只导出稳定公开 API，隐藏内部实现，这是模块化最重要的工程能力。
