# JavaScript 第 10 章“模块”速查表 v1

> 定位：这是第 10 章“模块”的复习速查表，不替代学习指导文件。  
> 使用方式：先完成指导文件里的练习，再用这份文件快速回忆模块作用域、导入导出、执行顺序、live binding、CommonJS / ES Module 差异和项目目录组织。  
> 代码规则：代码、变量名、文件名、目录名和代码注释不使用中文字符。

---

## 0. 一句话总模型

```txt
Module = file-level scope + explicit exports + explicit imports + runtime-managed execution.
```

模块不是“把代码拆成多个文件”这么简单。真正的模块化有四个核心点：

| 核心点 | 含义 |
|---|---|
| 文件级作用域（module scope） | 模块内部声明默认只在当前文件可见。 |
| 明确导出（export） | 当前模块主动声明哪些值允许外部使用。 |
| 明确导入（import） | 当前模块声明自己依赖哪些外部值。 |
| 运行环境管理执行 | 浏览器、Node 或打包工具根据依赖图加载和执行模块。 |

最终记住：

```txt
普通脚本靠加载顺序共享全局变量。
ES Module 靠 import / export 建立依赖图。
CommonJS 靠 require() / module.exports 在 Node 中同步加载模块。
```

---

## 1. 普通脚本 vs 模块脚本

| 对比项 | 普通脚本（classic script） | 模块脚本（module script） |
|---|---|---|
| HTML 写法 | `<script src="./app.js"></script>` | `<script type="module" src="./app.js"></script>` |
| 是否有模块作用域 | 否 | 是 |
| 顶层变量是否自动变全局 | 通常容易污染全局 | 不会自动变成全局属性 |
| 能否使用静态 `import` / `export` | 不能 | 能 |
| 加载依赖方式 | 依赖脚本顺序 | 依赖图 |
| 浏览器执行模式 | 普通脚本规则 | 默认延迟执行，严格模式 |
| 常见用途 | 老代码、简单脚本 | 现代前端项目入口 |

正确模型：

```txt
classic script:
  files share global environment by loading order

module script:
  files communicate only through explicit import/export
```

---

## 2. 旧式模块模式速查

ES Module 出现前，JavaScript 常用对象命名空间、IIFE 和闭包模拟模块。

### 2.1 对象命名空间

```js
globalThis.checkoutTools = {
  calculateSubtotal(unitPrice, quantityCount) {
    return unitPrice * quantityCount;
  },
};
```

| 特点 | 说明 |
|---|---|
| 优点 | 把相关函数挂到一个对象上，减少全局名字数量。 |
| 缺点 | 对象属性是公开的，外部可以随意修改。 |
| 底层机制 | 仍然依赖全局对象。 |
| 现代替代 | ES Module 命名导出。 |

### 2.2 IIFE

```js
const settingsModule = (() => {
  const runtimeMode = "dark";

  function readRuntimeMode() {
    return runtimeMode;
  }

  return {
    readRuntimeMode,
  };
})();
```

| 特点 | 说明 |
|---|---|
| IIFE | Immediately Invoked Function Expression，定义后立即执行。 |
| 作用 | 创建局部函数作用域。 |
| 私有状态 | 内部变量不直接暴露。 |
| 公开 API | 通过返回对象暴露。 |

### 2.3 闭包

```js
function createCounter() {
  let countValue = 0;

  return function increaseCount() {
    countValue += 1;
    return countValue;
  };
}
```

闭包（closure）不是“复制变量值”。闭包是：

```txt
function + reference to outer lexical environment
```

---

## 3. ES Module 基本语法

### 3.1 命名导出（named export）

适合一个模块导出多个明确命名的值。

```js
export function calculateSubtotal(unitPrice, quantityCount) {
  return unitPrice * quantityCount;
}

export const defaultTaxRate = 0.08;
```

导入时必须名字匹配：

```js
import { calculateSubtotal, defaultTaxRate } from "./priceTools.js";
```

### 3.2 默认导出（default export）

适合一个模块主要导出一个核心值。

```js
export default function createInvoiceLabel(invoiceNumber) {
  return `Invoice ${invoiceNumber}`;
}
```

默认导入时，本地名字可以自己取：

```js
import buildLabel from "./createInvoiceLabel.js";
```

### 3.3 混合导出

```js
export const defaultCurrencyCode = "USD";

export function formatCurrencyAmount(amountValue) {
  return `$${amountValue.toFixed(2)}`;
}

export default function createCurrencySummary(amountValue) {
  return `${formatCurrencyAmount(amountValue)} ${defaultCurrencyCode}`;
}
```

导入：

```js
import createCurrencySummary, {
  defaultCurrencyCode,
  formatCurrencyAmount,
} from "./currencyFormatter.js";
```

### 3.4 重命名导入

```js
import { formatCurrencyAmount as createMoneyText } from "./currencyFormatter.js";
```

用途：

```txt
1. 避免本地命名冲突。
2. 让导入名更贴近当前模块语义。
```

### 3.5 命名空间导入

```js
import * as CurrencyFormatter from "./currencyFormatter.js";

console.log(CurrencyFormatter.formatCurrencyAmount(20));
```

命名空间对象（module namespace object）是模块所有命名导出的只读视图。

---

## 4. 命名导出 vs 默认导出

| 选择 | 适合场景 | 导入特点 | 常见风险 |
|---|---|---|---|
| 命名导出 | 一个模块有多个公开 API | 名字必须匹配 | 导出过多会让模块职责发散 |
| 默认导出 | 一个模块主要暴露一个核心值 | 本地名字可自定义 | 导入方可能随意命名，降低一致性 |
| 命名空间导入 | 需要保留模块整体语义 | `ModuleName.apiName` | 滥用会让依赖关系变模糊 |
| 混合导入 | 一个核心默认导出 + 若干辅助导出 | 默认导入和命名导入并存 | 模块 API 设计可能过重 |

实用判断：

```txt
工具集合：named export
单个组件/单个工厂函数/单个类：default export 可以接受
公共库 API：prefer named export for discoverability
```

---

## 5. 再导出和 barrel 文件

### 5.1 再导出

```js
export { formatOrderDate } from "./dateLabelFormatter.js";
export { formatOrderCurrency } from "./currencyLabelFormatter.js";
```

这不是先导入再导出，而是把其他模块的导出继续暴露出去。

### 5.2 barrel 文件

常见文件名：

```txt
index.js
```

典型结构：

```txt
formatters/
  dateLabelFormatter.js
  currencyLabelFormatter.js
  index.js
```

使用：

```js
import {
  formatOrderDate,
  formatOrderCurrency,
} from "./formatters/index.js";
```

### 5.3 barrel 文件判断标准

| 问题 | 判断 |
|---|---|
| 是否暴露稳定公共 API？ | 可以使用 barrel。 |
| 是否只是为了少写路径？ | 谨慎使用。 |
| 是否把内部实现全部导出？ | 不推荐。 |
| 是否造成循环导入更隐蔽？ | 需要拆分职责。 |

---

## 6. 模块作用域和公开边界

### 结论

ES Module 顶层声明默认是模块私有的。外部只能访问被 `export` 的绑定。

```js
const internalStockLimit = 100;

export function checkStockLevel(stockCount) {
  return stockCount <= internalStockLimit;
}
```

外部可以：

```js
import { checkStockLevel } from "./inventoryState.js";
```

外部不可以：

```js
console.log(internalStockLimit);
```

速记：

```txt
No export, no external access.
```

模块 API 的本质：

```txt
export table = this module's public contract
```

---

## 7. 静态 import 的规则

静态导入（static import）必须写在模块顶层。

正确：

```js
import { calculateSubtotal } from "./priceCalculator.js";

if (true) {
  console.log(calculateSubtotal(20, 3));
}
```

错误：

```js
if (true) {
  import { calculateSubtotal } from "./priceCalculator.js";
}
```

原因：

```txt
static import must be analyzable before module execution
```

运行环境需要先建立依赖图：

```txt
parse module
  -> collect static imports
  -> load dependencies
  -> link bindings
  -> execute module body
```

---

## 8. 动态 import()

动态导入（dynamic import）用于运行时按需加载模块。

```js
async function loadReportFormatter() {
  const reportModule = await import("./heavyReportFormatter.js");
  return reportModule.createHeavyReportText("Quarterly Revenue");
}
```

关键点：

| 点 | 说明 |
|---|---|
| `import()` 是什么 | 语法形式，不是普通函数。 |
| 返回值 | Promise。 |
| fulfilled value | 模块命名空间对象。 |
| 典型用途 | 按需加载、代码分割、条件加载。 |

常见错误：

```js
const reportModule = import("./heavyReportFormatter.js");

console.log(reportModule.createHeavyReportText("Quarterly Revenue"));
```

错误原因：

```txt
reportModule is a Promise, not the loaded module namespace object.
```

---

## 9. live binding 实时绑定

### 结论

ES Module 导入的是实时绑定（live binding），不是值复制。

导出模块：

```js
export let activeSessionCount = 0;

export function increaseActiveSessionCount() {
  activeSessionCount += 1;
}
```

导入模块：

```js
import {
  activeSessionCount,
  increaseActiveSessionCount,
} from "./sessionCounterStore.js";

console.log(activeSessionCount);
increaseActiveSessionCount();
console.log(activeSessionCount);
```

输出：

```txt
0
1
```

### 关键规则

| 规则 | 说明 |
|---|---|
| 导入方看到更新 | 导出模块改变绑定后，导入方再次读取会看到新值。 |
| 导入绑定只读 | 导入方不能重新赋值导入名。 |
| 不是普通对象属性复制 | 它是模块链接阶段建立的绑定关系。 |

错误：

```js
activeSessionCount = 100;
```

原因：

```txt
Imported bindings are read-only in the importing module.
```

---

## 10. 模块只执行一次

### 结论

同一个 ES Module 在同一个模块图中只执行一次，后续导入复用同一个模块记录。

模块：

```js
console.log("auditLogger module executed");

let logCount = 0;

export function writeAuditLog(messageText) {
  logCount += 1;
  return `${logCount}: ${messageText}`;
}
```

两个模块导入它，顶层日志只会打印一次，`logCount` 会被共享。

速记：

```txt
module top-level code executes once per module graph
module state is shared by importers
```

注意：

```txt
shared module state can be useful
shared mutable module state can also make tests and debugging harder
```

---

## 11. 副作用模块

副作用模块（side-effect module）不导入具体值，只为了执行模块顶层代码。

```js
import "./consoleSetup.js";
```

副作用包括：

```txt
1. 打印日志
2. 修改 globalThis
3. 注册事件
4. 初始化 SDK
5. 加载 polyfill
6. 修改原型
```

判断标准：

| 问题 | 建议 |
|---|---|
| 模块名是否说明了副作用？ | 必须清楚。 |
| 是否偷偷修改全局状态？ | 避免。 |
| 是否是 polyfill / setup 文件？ | 可以接受。 |
| 是否影响测试隔离？ | 要谨慎。 |

---

## 12. 循环导入

循环导入（circular import）：

```txt
A imports B.
B imports A.
```

不一定错误，但初始化顺序会复杂。

### 安全形态

```js
import { createDiscountText } from "./discountRules.js";

export const billingLabel = "Billing";

export function createBillingText() {
  return `${billingLabel} with ${createDiscountText()}`;
}
```

原因：

```txt
Read imported value later inside a function call.
```

### 危险形态

```js
import { riskyBillingLabel } from "./riskyBillingRules.js";

export const riskyDiscountText = `discount for ${riskyBillingLabel}`;
```

风险：

```txt
Top-level read may happen before the imported binding is initialized.
```

### 解决方式

```txt
1. 提取第三个共享模块。
2. 把顶层计算改成函数内延迟计算。
3. 重新划分模块职责。
4. 避免 barrel 文件隐藏循环关系。
```

---

## 13. 浏览器模块速查

HTML：

```html
<script type="module" src="./app.js"></script>
```

模块文件：

```js
import { renderProductCard } from "./productCardRenderer.js";

const outputElement = document.querySelector("#output");
outputElement.textContent = renderProductCard("Keyboard", 99);
```

浏览器模块注意点：

| 点 | 说明 |
|---|---|
| 必须写扩展名 | 浏览器通常需要明确的 `.js` 路径。 |
| 推荐本地服务器 | 不建议用 `file://` 直接打开。 |
| 默认严格模式 | 模块代码自动是 strict mode。 |
| 有模块作用域 | 顶层声明不会自动挂到 `window`。 |
| 可使用 import/export | 前提是脚本是 `type="module"`。 |

常见运行方式：

```bash
python3 -m http.server 5173
```

---

## 14. CommonJS 基础

CommonJS 是 Node 传统模块系统。

### 14.1 导出对象

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

### 14.2 导入对象

```js
const {
  calculateLegacyTax,
  calculateLegacyTotal,
} = require("./legacyTaxCalculator.cjs");
```

### 14.3 CommonJS 提供的局部变量

```txt
require
module
exports
__filename
__dirname
```

这些是 Node 的 CommonJS 模块包装环境提供的，不是浏览器普通脚本提供的。

---

## 15. module.exports vs exports

### 15.1 正确替换整个导出值

```js
module.exports = function createReportTitle() {
  return "Report";
};
```

### 15.2 正确添加导出属性

```js
exports.createReportTitle = function createReportTitle() {
  return "Report";
};
```

### 15.3 错误写法

```js
exports = function createBrokenReportTitle() {
  return "Broken Report";
};
```

原因：

```txt
exports starts as a reference to module.exports.
Reassigning exports only changes the local variable.
It does not replace module.exports.
```

速记：

```txt
Replace exports object -> use module.exports = value
Add properties -> exports.name = value
Do not reassign exports directly
```

---

## 16. CommonJS 缓存

第一次 `require()` 执行模块，后续 `require()` 复用缓存。

```js
const firstCounterModule = require("./requestCounter.cjs");
const secondCounterModule = require("./requestCounter.cjs");

console.log(firstCounterModule === secondCounterModule);
```

输出：

```txt
true
```

模型：

```txt
first require:
  load file
  execute module
  cache module.exports

second require:
  return cached module.exports
```

和 ES Module 的相似点：

```txt
Both avoid re-executing the same module repeatedly.
```

不同点：

```txt
CommonJS exports values through module.exports object.
ES Module links declarative live bindings.
```

---

## 17. Node ESM 速查

Node 判断模块类型的常见方式：

| 文件 / 配置 | 模块系统 |
|---|---|
| `.cjs` | CommonJS |
| `.mjs` | ES Module |
| `.js` + 最近 `package.json` 中 `"type": "module"` | ES Module |
| `.js` + 最近 `package.json` 中 `"type": "commonjs"` 或默认 | CommonJS |

`package.json`：

```json
{
  "type": "module"
}
```

ESM 文件：

```js
export function calculateSubtotalAmount(unitPrice, quantityCount) {
  return unitPrice * quantityCount;
}
```

导入：

```js
import { calculateSubtotalAmount } from "./subtotalCalculator.js";
```

常见错误：

```txt
1. 在 .cjs 中直接写静态 import。
2. 在 ESM 中直接使用 require。
3. Node ESM 相对路径忘记写文件扩展名。
4. 混用 CommonJS 和 ESM 时不理解互操作规则。
```

---

## 18. import.meta

`import.meta` 是 ES Module 的元信息对象。

最常用：

```js
console.log(import.meta.url);
```

含义：

| 环境 | 形态 |
|---|---|
| 浏览器 ESM | `http://.../module.js` |
| Node ESM | `file:///.../module.mjs` |

用途：

```txt
1. 获取当前模块 URL。
2. 计算相对资源路径。
3. 替代 CommonJS 中的 __filename / __dirname 思路。
```

注意：

```txt
import.meta only exists inside ES modules.
```

---

## 19. 顶层 await

ES Module 支持顶层 `await`。

```js
const simulatedConfigPromise = Promise.resolve({
  pageSize: 20,
  layoutMode: "grid",
});

export const loadedConfig = await simulatedConfigPromise;
```

导入模块：

```js
import { loadedConfig } from "./configLoader.mjs";

console.log(loadedConfig.pageSize);
```

机制：

```txt
If a dependency uses top-level await,
the importing module waits until that dependency finishes evaluation.
```

使用建议：

| 场景 | 建议 |
|---|---|
| 配置加载模块 | 可以谨慎使用。 |
| 基础工具模块 | 不要滥用。 |
| 大量模块都依赖它 | 会放大等待影响。 |
| 需要更清晰控制加载状态 | 封装 async function 更可控。 |

---

## 20. ESM vs CommonJS 总表

| 对比项 | ES Module | CommonJS |
|---|---|---|
| 语法 | `import` / `export` | `require()` / `module.exports` |
| 标准归属 | ECMAScript 标准模块系统 | Node 传统模块系统 |
| 导入分析 | 静态导入可提前分析 | `require()` 是运行时函数调用 |
| 绑定模型 | live binding | 导出对象 / 值 |
| 导入位置 | static import 必须顶层 | `require()` 可以放在条件或函数里 |
| 异步加载 | dynamic `import()` 返回 Promise | `require()` 通常同步 |
| 浏览器原生支持 | 支持 ESM | 不原生支持 CommonJS |
| Node 支持 | 支持 | 支持 |
| 文件扩展 | `.mjs` 或 type module 下 `.js` | `.cjs` 或默认 `.js` |
| 顶层 await | 支持 | 不支持同样语义 |

---

## 21. 项目目录组织速查

模块化目录不要按“文件类型”机械分组，优先按功能边界分组。

推荐：

```txt
features/
  cart/
    cartMathTools.js
    cartSummaryView.js
  profile/
    profileHeadingView.js
config/
  defaultRuntimeConfig.js
main.js
```

不推荐：

```txt
functions/
views/
helpers/
utils/
```

原因：

```txt
feature folder groups related behavior together.
generic folders hide business boundaries.
```

模块设计问题清单：

```txt
1. This module's public API is what?
2. Which values stay private?
3. Does this module have side effects?
4. Is this dependency direction clear?
5. Can this module be tested without the whole app?
6. Does this module depend on browser APIs, Node APIs, or pure JS only?
7. Is a barrel file helping or hiding complexity?
```

---

## 22. 常见错误速查表

| 错误 | 错误原因 | 正确模型 |
|---|---|---|
| 在普通脚本里写 `import` | 普通脚本不按模块解析 | HTML 用 `type="module"` |
| 访问未导出的模块变量 | 模块内部默认私有 | 需要外部使用就显式 `export` |
| 命名导入拼错名字 | named import 必须匹配导出名 | 检查导出表 |
| 默认导出用花括号导入 | default export 不是 named export | 用默认导入语法 |
| 在 `if` 里写静态 import | 静态导入必须顶层 | 条件加载用 `import()` |
| 忘记 `await import()` | `import()` 返回 Promise | `const mod = await import(...)` |
| 给导入绑定重新赋值 | 导入绑定对导入方只读 | 通过导出模块提供函数修改 |
| 以为模块会重复执行 | 同一模块通常只执行一次 | 顶层状态会被共享 |
| 副作用模块命名不清 | 难以判断执行影响 | 使用 setup / polyfill 命名 |
| 循环导入中顶层读值 | 初始化顺序危险 | 延迟读取或拆第三模块 |
| `exports = value` | 只改了局部变量 | 用 `module.exports = value` |
| 混淆 `.cjs` 和 `.mjs` | Node 按扩展名/配置判断模块系统 | 明确使用扩展名 |
| ESM 中直接用 `require` | `require` 是 CommonJS 环境变量 | 使用 `import` 或显式互操作 |
| 浏览器模块路径省略 `.js` | 浏览器不做 Node 式解析 | 写完整相对路径 |

---

## 23. 运行方式速查

### 23.1 浏览器模块

```bash
python3 -m http.server 5173
```

HTML：

```html
<script type="module" src="./app.js"></script>
```

### 23.2 Node ESM：package.json

```json
{
  "type": "module"
}
```

运行：

```bash
node app.js
```

### 23.3 Node ESM：.mjs

```bash
node app.mjs
```

### 23.4 CommonJS：.cjs

```bash
node app.cjs
```

---

## 24. 本章最终要能回答的问题

学完模块后，至少能回答这些问题：

1. 普通脚本和模块脚本有什么区别？
2. 为什么旧式模块会使用 `globalThis`？
3. IIFE 如何创建私有作用域？
4. 闭包如何隐藏内部状态？
5. ES Module 解决了旧式脚本组织的哪些问题？
6. `export` 暴露的是值还是绑定？
7. `import` 导入的是普通值复制还是实时绑定？
8. 命名导出和默认导出如何选择？
9. 为什么命名导入必须名字匹配？
10. 为什么默认导入可以自定义本地名字？
11. 命名空间导入得到的是什么？
12. barrel 文件解决什么问题，又会带来什么风险？
13. live binding 为什么能看到导出模块的更新？
14. 为什么导入绑定不能重新赋值？
15. 为什么同一个模块通常只执行一次？
16. 副作用模块是什么？什么时候应该避免？
17. 静态 `import` 为什么必须在顶层？
18. 动态 `import()` 为什么返回 Promise？
19. 循环导入为什么容易出初始化问题？
20. 浏览器为什么要写 `<script type="module">`？
21. CommonJS 的 `require()` 做了什么？
22. `module.exports` 和 `exports` 的区别是什么？
23. CommonJS 模块缓存如何验证？
24. Node 如何区分 `.cjs`、`.mjs` 和 `"type": "module"`？
25. `import.meta.url` 解决什么问题？
26. 顶层 `await` 如何影响依赖模块执行？
27. 模块化目录如何服务真实前端项目？

---

## 25. 最终记忆模型

```txt
Old script:
  global scope
  loading order
  manual namespace
  IIFE closure

ES Module:
  module scope
  static dependency graph
  explicit export/import
  live binding
  executes once
  dynamic import for lazy loading

CommonJS:
  require()
  module.exports
  exports shortcut
  synchronous loading
  module cache

Project design:
  export stable public APIs
  keep internals private
  avoid hidden side effects
  avoid risky circular imports
  organize files by feature boundaries
```

压缩成一句话：

```txt
模块化的核心不是拆文件，而是用明确的公开接口和依赖图控制作用域、执行顺序和项目边界。
```
