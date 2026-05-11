# JavaScript 模块缺失知识点补充清单

这份文件用于补充 `javascript-modules-learning-notes-complete.md` 中容易被一句话带过的细节。不是替代原笔记，而是把模块学习中必须掌握的边界点单独列出来。

## 1. 没有省略的知识点范围

模块这一章需要覆盖下面这些知识点：

```txt
旧式普通脚本模块模式
ES Module 基本语法
命名导出
默认导出
重命名导入
命名空间导入
模块顶层代码
模块副作用
模块作用域
模块公开 API
live binding
模块只执行一次
静态导入
动态导入
CommonJS
module.exports
exports
require
.js / .mjs / .cjs
浏览器 type="module"
Node package.json type 字段
循环导入
实际项目模块边界设计
```

---

## 2. 旧式模块模式必须补的细节

旧式模块模式不是语言级模块系统。它靠全局对象、对象命名空间、闭包和 IIFE 模拟模块。

```js
globalThis.orderNamespace = {
  createOrderLabel(orderCode) {
    return `Order: ${orderCode}`;
  },
};
```

这个对象减少了全局变量数量，但它没有真正隐藏内部属性。外部仍然可以改：

```js
globalThis.orderNamespace.createOrderLabel = function createChangedLabel() {
  return 'changed';
};
```

如果要隐藏内部状态，需要闭包：

```js
globalThis.orderCounterModule = (() => {
  let nextOrderNumber = 1000;

  function createOrderCode() {
    nextOrderNumber += 1;
    return `ORD-${nextOrderNumber}`;
  }

  return {
    createOrderCode,
  };
})();
```

`nextOrderNumber` 没有挂到全局对象上，所以外部不能直接访问。`createOrderCode` 能访问它，是因为函数保留了外层词法环境。

---

## 3. ES Module 的顶层规则

静态 `import` 和静态 `export` 必须写在模块顶层。

正确：

```js
import { createUserLabel } from './userLabelTools.js';

export function renderUserLabel(userName) {
  return createUserLabel(userName);
}
```

错误：

```js
if (true) {
  import { createUserLabel } from './userLabelTools.js';
}
```

错误：

```js
function loadTools() {
  export function createUserLabel(userName) {
    return `User: ${userName}`;
  }
}
```

原因：ES Module 要在执行前建立依赖图和导出表。如果 `import` / `export` 可以写进条件或函数，运行环境就无法在执行前确定模块结构。

---

## 4. 默认导出不是“文件只能有一个函数”

一个模块可以有很多内部函数，但只默认暴露一个主出口。

```js
const invoicePrefix = 'Invoice';

function normalizeInvoiceNumber(invoiceNumber) {
  return String(invoiceNumber).trim();
}

function normalizeCustomerName(customerName) {
  return String(customerName).trim();
}

export default function createInvoiceLabel(invoiceNumber, customerName) {
  return `${invoicePrefix} ${normalizeInvoiceNumber(invoiceNumber)} for ${normalizeCustomerName(customerName)}`;
}
```

外部只能导入默认出口：

```js
import createInvoiceLabel from './createInvoiceLabel.js';

console.log(createInvoiceLabel('INV-001', 'Ada'));
```

`normalizeInvoiceNumber` 和 `normalizeCustomerName` 是内部实现，不应该被外部依赖。

---

## 5. 命名空间导入不是对象解构

```js
import * as CurrencyFormatter from './currencyFormatter.js';
```

这句只创建一个本地绑定：

```txt
CurrencyFormatter
```

所以必须通过点号访问：

```js
console.log(CurrencyFormatter.formatCurrencyAmount(20));
```

它不会直接创建：

```txt
formatCurrencyAmount
formatCurrencyCodeLabel
defaultCurrencyCode
```

如果要直接调用函数，需要命名导入：

```js
import { formatCurrencyAmount } from './currencyFormatter.js';

console.log(formatCurrencyAmount(20));
```

---

## 6. 模块顶层代码不需要导出也会执行

```js
console.log('settings module loaded');

export const defaultThemeMode = 'dark';
```

只要另一个文件导入这个模块：

```js
import { defaultThemeMode } from './settings.js';

console.log(defaultThemeMode);
```

模块顶层的 `console.log` 会执行。

原因：

```txt
import 触发模块加载和执行。
export 只决定哪些绑定可以被外部导入。
```

---

## 7. live binding 不是复制值

```js
export let requestCount = 0;

export function increaseRequestCount() {
  requestCount += 1;
}
```

导入方看到的是导出模块中 `requestCount` 的当前值：

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

导入绑定不能被导入方重新赋值：

```js
requestCount = 99;
```

这会报错。

---

## 8. CommonJS 的 require 返回的是 module.exports

```js
function createReportTitle(reportName) {
  return `Report: ${reportName}`;
}

module.exports = {
  createReportTitle,
};
```

导入：

```js
const reportTools = require('./reportTools.cjs');

console.log(reportTools.createReportTitle('Revenue'));
```

`reportTools` 不是导出名，它只是当前文件自己的本地变量名。

下面也可以：

```js
const anything = require('./reportTools.cjs');

console.log(anything.createReportTitle('Revenue'));
```

CommonJS 的关键是：

```txt
require(...) 返回目标模块最终的 module.exports。
左边 const 的名字由当前文件自己决定。
```

---

## 9. exports 不能整体替换 module.exports

错误写法：

```js
exports = function createBrokenReportTitle() {
  return 'Broken Report';
};
```

这不会真正导出函数，因为它只是让局部变量 `exports` 指向新函数。

正确写法：

```js
module.exports = function createFixedReportTitle() {
  return 'Fixed Report';
};
```

或者只给默认导出对象添加属性：

```js
exports.createReportTitle = function createReportTitle() {
  return 'Report';
};
```

---

## 10. 动态导入的最小模型

```js
const reportModule = await import('./heavyReportFormatter.js');

console.log(reportModule.createHeavyReportText('Quarterly Revenue'));
```

`import()` 返回 Promise，不是直接返回模块对象。

所以不能这样写：

```js
const reportModule = import('./heavyReportFormatter.js');

console.log(reportModule.createHeavyReportText('Quarterly Revenue'));
```

因为此时 `reportModule` 是 Promise。

正确理解：

```txt
import() 开始加载模块。
Promise 表示未来加载完成后的结果。
await 等待 Promise 完成。
完成后拿到模块命名空间对象。
```

---

## 11. 循环导入需要看读取时机

循环导入不是绝对错误。真正危险的是在模块初始化期间读取对方尚未初始化的绑定。

危险写法：

```js
import { discountLabel } from './discountRules.js';

export const billingLabel = `Billing with ${discountLabel}`;
```

更安全的写法：

```js
import { discountLabel } from './discountRules.js';

export function createBillingLabel() {
  return `Billing with ${discountLabel}`;
}
```

第二种写法把读取延迟到函数调用时，能减少初始化顺序问题。

---

## 12. 真实项目中的模块划分

模块划分不是按“文件数量”来做，而是按职责边界来做。

```txt
utils：纯工具函数，不依赖 UI。
components：组件模块，负责界面结构。
services：请求、存储、外部 API 调用。
config：配置常量。
stores：共享状态。
features：按业务能力组织一组模块。
```

判断一个函数要不要导出：

```txt
外部是否真的需要直接调用它？
它是不是稳定接口？
它是不是当前模块的内部实现细节？
```

只导出稳定公开 API，内部辅助函数不要轻易导出。
