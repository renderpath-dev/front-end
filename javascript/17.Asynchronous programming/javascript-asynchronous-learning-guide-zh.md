# JavaScript 异步编程学习指导文件

> 定位：这是第 13 章“异步 JavaScript（Asynchronous JavaScript）”的学习指导文件，不是最终学习笔记。  
> 范围：《JavaScript 权威指南》第 13 章，结合 MDN 对 callback、Promise、async function、await、event loop、for await...of、Symbol.asyncIterator 等内容的参考说明。  
> 目标：你按照这份文件创建练习目录、写代码、运行代码、观察输出，再把每节整理成最终学习笔记。  
> 语言规则：正文统一中文；重要技术术语必须写中文和英文，例如“期约（Promise）”。  
> 代码规则：代码命名和代码注释统一英文；代码和代码注释不使用中文字符。  
> 学习原则：异步这一章不能只背语法。必须解释：任务什么时候开始、当前调用栈什么时候结束、回调什么时候进入队列、Promise 状态如何变化、`await` 暂停的是哪一段代码、错误如何传播。

---

## 目录

1. [本文件怎么用](#1-本文件怎么用)
2. [第 13 章异步 JavaScript 的完整学习顺序](#2-第-13-章异步-javascript-的完整学习顺序)
3. [本章先要建立的底层模型](#3-本章先要建立的底层模型)
4. [00：同步代码和异步代码的区别](#4-00同步代码和异步代码的区别)
5. [01：回调函数基础](#5-01回调函数基础)
6. [02：异步回调和执行顺序](#6-02异步回调和执行顺序)
7. [03：错误优先回调](#7-03错误优先回调)
8. [04：回调嵌套和控制流问题](#8-04回调嵌套和控制流问题)
9. [05：Promise 的状态模型](#9-05promise-的状态模型)
10. [06：Promise 构造函数和 executor](#10-06promise-构造函数和-executor)
11. [07：then、catch、finally 链式调用](#11-07thencatchfinally-链式调用)
12. [08：Promise 的错误传播](#12-08promise-的错误传播)
13. [09：Promise.all、allSettled、race、any](#13-09promiseallallsettledraceany)
14. [10：把回调 API 包装成 Promise](#14-10把回调-api-包装成-promise)
15. [11：async function 的返回值](#15-11async-function-的返回值)
16. [12：await 的真正机制](#16-12await-的真正机制)
17. [13：try/catch 处理 async/await 错误](#17-13trycatch-处理-asyncawait-错误)
18. [14：串行 await 和并行 Promise](#18-14串行-await-和并行-promise)
19. [15：顶层 await](#19-15顶层-await)
20. [16：异步迭代 for await...of](#20-16异步迭代-for-awaitof)
21. [17：异步生成器 async function*](#21-17异步生成器-async-function)
22. [18：手写异步可迭代对象](#22-18手写异步可迭代对象)
23. [19：小项目整合](#23-19小项目整合)
24. [最终文件清单](#24-最终文件清单)
25. [最终学习笔记转换要求](#25-最终学习笔记转换要求)
26. [本章最终要能回答的问题](#26-本章最终要能回答的问题)
27. [MDN 阅读清单](#27-mdn-阅读清单)
28. [最终记忆模型](#28-最终记忆模型)

---

## 1. 本文件怎么用

### 结论

这不是一份“看完就算学过”的文档。异步 JavaScript 必须通过运行代码观察输出顺序来学。

你每学一节，都要完成：

```txt
1. 创建对应目录。
2. 创建示例文件。
3. 运行入口文件。
4. 写出真实输出。
5. 按执行顺序解释每一步。
6. 故意写一个错误版本。
7. 把本节整理进最终学习笔记。
```

### 技术意义

异步编程（asynchronous programming）解决的是：某些操作需要等待外部结果，例如计时器、网络请求、文件读取、用户事件。JavaScript 不能让主线程一直卡住等待这些操作，所以需要把“现在执行的代码”和“未来执行的代码”分开管理。

### 本章学习重点

你要重点追问：

```txt
这行代码是同步执行，还是注册未来工作？
这个回调什么时候进入队列？
Promise 当前是 pending、fulfilled 还是 rejected？
then/catch 返回的新 Promise 状态由什么决定？
await 等待的是哪个 Promise？
await 后面的代码什么时候继续？
for await...of 每一轮等待的是什么？
```

### 代码注释模板

每个 JS 文件顶部都写英文注释：

```js
// Goal:
// Verify how this asynchronous example works.

// Expected output:
// Replace this block with the output from the entry file.
```

---

## 2. 第 13 章异步 JavaScript 的完整学习顺序

### 结论

本章按这个顺序学：

```txt
同步 vs 异步
  -> 回调函数
  -> 异步回调执行顺序
  -> 错误优先回调
  -> 回调嵌套问题
  -> Promise 状态模型
  -> Promise 构造函数
  -> then/catch/finally
  -> Promise 错误传播
  -> Promise 并发组合
  -> 回调包装成 Promise
  -> async function
  -> await
  -> async/await 错误处理
  -> 串行和并行
  -> 顶层 await
  -> 异步迭代
  -> 异步生成器
  -> 手写异步可迭代对象
  -> 小项目整合
```

### 技术意义

书上第 13 章的主线是：先理解回调（callback），再进入期约（Promise），再用 `async` / `await` 改善 Promise 代码结构，最后理解异步迭代（asynchronous iteration）。

### 本章不是简单语法

异步章节的难点不是 `async` 和 `await` 怎么写，而是：

```txt
JavaScript 单线程为什么还能处理异步任务。
回调为什么不会立刻执行。
Promise 为什么有状态。
await 为什么不会阻塞整个程序。
错误为什么能沿 Promise 链传播。
并发和并行为什么不是一回事。
异步迭代为什么需要 Promise 包装 iterator result object。
```

---

## 3. 本章先要建立的底层模型

### 结论

异步 JavaScript 的底层模型是：

```txt
调用栈（call stack）执行当前同步代码。
宿主环境（host environment）处理外部异步操作。
任务队列（task queue）保存未来要执行的任务。
微任务队列（microtask queue）优先处理 Promise reaction。
事件循环（event loop）负责调度下一段代码。
```

### 关键术语先解释

| 中文术语 | English term | 解释 |
|---|---|---|
| 同步 | synchronous | 当前代码按顺序立即执行。 |
| 异步 | asynchronous | 当前代码不等待结果，未来再执行后续逻辑。 |
| 回调函数 | callback function | 作为参数传入，稍后由其他代码调用的函数。 |
| 事件循环 | event loop | JavaScript 运行环境调度任务的机制。 |
| 调用栈 | call stack | 当前正在执行的函数调用结构。 |
| 任务队列 | task queue / macrotask queue | 计时器、事件等回调等待执行的队列。 |
| 微任务队列 | microtask queue / job queue | Promise reaction 等任务使用的高优先级队列。 |
| 期约 | Promise | 表示未来完成或失败的异步结果对象。 |
| 待定 | pending | Promise 初始状态，结果还没产生。 |
| 已兑现 | fulfilled | Promise 成功完成。 |
| 已拒绝 | rejected | Promise 失败。 |
| 解决 | resolve | 让 Promise 采用某个成功值或另一个 Promise 的状态。 |
| 拒绝 | reject | 让 Promise 进入失败状态。 |
| 处理器 | handler | 传给 `then()`、`catch()`、`finally()` 的函数。 |
| 异步函数 | async function | 调用后总是返回 Promise 的函数。 |
| 等待 | await | 暂停当前 async 函数后续执行，等待 Promise 完成。 |
| 异步迭代器 | async iterator | `next()` 返回 Promise 的迭代器。 |
| 异步可迭代对象 | async iterable | 实现 `[Symbol.asyncIterator]()` 的对象。 |
| 异步生成器 | async generator | `async function*` 创建的生成器。 |

### 底层机制总图

```txt
script starts
  -> synchronous code runs on call stack
  -> timer or I/O is registered in host environment
  -> Promise reactions enter microtask queue
  -> current call stack becomes empty
  -> microtasks run
  -> next task runs
```

### 和你前面学习内容的关系

你已经学过函数、模块、迭代器和生成器。本章把它们连接起来：

```txt
函数 -> callback
对象 -> Promise object
模块 -> top-level await
迭代器 -> async iterator
生成器 -> async generator
```

---

## 4. 00：同步代码和异步代码的区别

### 结论

同步代码（synchronous code）会立即按顺序执行；异步代码（asynchronous code）通常是先注册未来工作，然后让当前同步代码继续执行。

### 新关键字和新概念

#### `setTimeout()`

`setTimeout()` 是宿主环境提供的计时器 API。它不是 ECMAScript 核心语法。它会注册一个未来执行的回调，而不是暂停当前代码。

#### 调用栈（call stack）

调用栈保存当前正在执行的函数。同步代码必须先执行完，异步回调才有机会执行。

### 文件结构

```txt
00-sync-vs-async/
  syncVsAsyncOrder.js
```

### `syncVsAsyncOrder.js`

```js
// Goal:
// Verify that a timer callback runs after synchronous code.

console.log('start');

setTimeout(() => {
  console.log('timer callback');
}, 0);

console.log('end');
```

### 运行方式

```bash
node syncVsAsyncOrder.js
```

### 预期输出

```txt
start
end
timer callback
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 执行 `console.log('start')`。 |
| 2 | 调用 `setTimeout()`，注册计时器回调。 |
| 3 | `setTimeout()` 立即返回，不阻塞当前代码。 |
| 4 | 执行 `console.log('end')`。 |
| 5 | 当前调用栈清空后，计时器回调才进入可执行阶段。 |
| 6 | 执行回调，输出 `timer callback`。 |

### 常见错误

不要以为 `setTimeout(callback, 0)` 表示“马上执行”。它表示“最早在当前同步代码结束之后安排执行”。

### 和项目开发的关系

浏览器事件、计时器、网络请求都不会阻塞整个页面脚本。理解这个顺序是以后理解 React 状态更新、请求 loading、事件处理的基础。

---

## 5. 01：回调函数基础

### 结论

回调函数（callback function）是作为参数传入另一个函数，并由另一个函数在合适时机调用的函数。

### 新关键字和新概念

#### 高阶函数（higher-order function）

接收函数作为参数，或返回函数的函数，叫高阶函数。

#### 回调（callback）

回调不是异步专属概念。同步代码也可以使用回调。

### 文件结构

```txt
01-callback-basics/
  synchronousCallbackDemo.js
```

### `synchronousCallbackDemo.js`

```js
// Goal:
// Verify how a synchronous callback is called by another function.

function formatOrderLabel(orderId, labelBuilder) {
  const labelText = labelBuilder(orderId);
  return `Order: ${labelText}`;
}

function createShortOrderLabel(orderId) {
  return `#${orderId}`;
}

const orderLabel = formatOrderLabel(42, createShortOrderLabel);

console.log(orderLabel);
```

### 运行方式

```bash
node synchronousCallbackDemo.js
```

### 预期输出

```txt
Order: #42
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `createShortOrderLabel` 作为函数值传给 `formatOrderLabel`。 |
| 2 | 参数 `labelBuilder` 引用这个函数。 |
| 3 | `labelBuilder(orderId)` 调用回调函数。 |
| 4 | 回调返回 `#42`。 |
| 5 | 外层函数拼接并返回最终文本。 |

### 常见错误

不要把“函数调用结果”和“函数本身”混淆。

错误：

```js
formatOrderLabel(42, createShortOrderLabel(42));
```

这里传进去的是字符串，不是函数。

正确：

```js
formatOrderLabel(42, createShortOrderLabel);
```

### 和项目开发的关系

数组方法、事件处理、计时器、Promise 链都依赖回调思想。回调是异步章节的入口，不是过时概念。

---

## 6. 02：异步回调和执行顺序

### 结论

异步回调（asynchronous callback）不会在注册时执行，而是在未来某个条件满足后执行。

### 新关键字和新概念

#### 注册回调（register a callback）

把函数交给宿主环境或另一个 API 保存起来，等待未来调用。

#### 任务（task）

异步操作完成后，回调会作为任务进入队列等待执行。

### 文件结构

```txt
02-async-callback-order/
  asyncCallbackOrder.js
```

### `asyncCallbackOrder.js`

```js
// Goal:
// Verify that registering a callback is not the same as calling it.

function scheduleReportRender(reportTitle) {
  setTimeout(() => {
    console.log(`render: ${reportTitle}`);
  }, 10);

  console.log('render scheduled');
}

scheduleReportRender('Revenue');
console.log('script finished');
```

### 运行方式

```bash
node asyncCallbackOrder.js
```

### 预期输出

```txt
render scheduled
script finished
render: Revenue
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 调用 `scheduleReportRender('Revenue')`。 |
| 2 | `setTimeout()` 注册未来回调。 |
| 3 | 继续执行函数内同步代码，输出 `render scheduled`。 |
| 4 | 函数返回。 |
| 5 | 执行全局同步代码，输出 `script finished`。 |
| 6 | 计时器到期后，回调输出 `render: Revenue`。 |

### 常见错误

不要把“注册回调”理解成“调用回调”。

```txt
setTimeout(callback, delay)
```

这句的主要动作是注册，而不是立刻调用 `callback`。

### 和项目开发的关系

用户点击事件、网络请求完成、动画结束、计时器到期，都是“未来调用回调”的结构。

---

## 7. 03：错误优先回调

### 结论

错误优先回调（error-first callback）是一种 Node 风格约定：回调第一个参数表示错误，第二个参数表示成功结果。

### 新关键字和新概念

#### 错误优先回调（error-first callback）

形状通常是：

```txt
callback(error, result)
```

如果 `error` 不是 `null`，说明失败；如果 `error` 是 `null`，说明成功。

### 文件结构

```txt
03-error-first-callback/
  errorFirstCallbackDemo.js
```

### `errorFirstCallbackDemo.js`

```js
// Goal:
// Verify the error-first callback convention.

function readUserRecord(userId, callback) {
  setTimeout(() => {
    if (userId <= 0) {
      callback(new Error('Invalid user id'), null);
      return;
    }

    callback(null, { id: userId, name: 'Ada' });
  }, 10);
}

readUserRecord(7, (readError, userRecord) => {
  if (readError !== null) {
    console.error(readError.message);
    return;
  }

  console.log(userRecord.name);
});
```

### 运行方式

```bash
node errorFirstCallbackDemo.js
```

### 预期输出

```txt
Ada
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 调用 `readUserRecord(7, callback)`。 |
| 2 | 注册计时器回调。 |
| 3 | 计时器到期后检查 `userId`。 |
| 4 | `userId` 合法，调用 `callback(null, userRecord)`。 |
| 5 | 外部回调发现 `readError === null`。 |
| 6 | 输出 `userRecord.name`。 |

### 常见错误

不要忽略第一个错误参数。

错误：

```js
readUserRecord(-1, (readError, userRecord) => {
  console.log(userRecord.name);
});
```

失败时 `userRecord` 是 `null`，直接访问 `.name` 会报错。

### 和项目开发的关系

很多旧 Node API、第三方库、浏览器历史 API 都有回调风格。即使现代代码多用 Promise，也要能读懂这种形状。

---

## 8. 04：回调嵌套和控制流问题

### 结论

回调可以表达异步操作，但多层依赖会导致嵌套过深、错误处理分散、执行流程难追踪。

### 新关键字和新概念

#### 回调地狱（callback hell）

当多个异步操作互相依赖，代码不断向右嵌套，难以维护，这种结构常被称为 callback hell。

### 文件结构

```txt
04-callback-nesting/
  callbackNestingDemo.js
```

### `callbackNestingDemo.js`

```js
// Goal:
// Show why nested callbacks become hard to maintain.

function loadAccount(callback) {
  setTimeout(() => {
    callback(null, { id: 1, plan: 'pro' });
  }, 10);
}

function loadInvoices(accountId, callback) {
  setTimeout(() => {
    callback(null, [{ id: 101, total: 300 }]);
  }, 10);
}

function loadPaymentStatus(invoiceId, callback) {
  setTimeout(() => {
    callback(null, { invoiceId, paid: true });
  }, 10);
}

loadAccount((accountError, accountRecord) => {
  if (accountError !== null) {
    console.error(accountError.message);
    return;
  }

  loadInvoices(accountRecord.id, (invoiceError, invoiceList) => {
    if (invoiceError !== null) {
      console.error(invoiceError.message);
      return;
    }

    loadPaymentStatus(invoiceList[0].id, (paymentError, paymentStatus) => {
      if (paymentError !== null) {
        console.error(paymentError.message);
        return;
      }

      console.log(paymentStatus.paid);
    });
  });
});
```

### 运行方式

```bash
node callbackNestingDemo.js
```

### 预期输出

```txt
true
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 先加载账号。 |
| 2 | 账号成功后，才加载发票。 |
| 3 | 发票成功后，才加载支付状态。 |
| 4 | 每一层都要单独判断错误。 |
| 5 | 最内层输出最终结果。 |

### 常见错误

不要以为回调嵌套只是格式丑。真正问题是控制流、错误流和数据流混在一起。

### 和项目开发的关系

Promise 和 `async` / `await` 不是为了“显得新”，而是为了让异步控制流更清楚。

---

## 9. 05：Promise 的状态模型

### 结论

期约（Promise）是一个表示未来结果的对象。它有三种状态：待定（pending）、已兑现（fulfilled）、已拒绝（rejected）。

### 新关键字和新概念

#### Promise

Promise 是 JavaScript 标准对象。它不是异步操作本身，而是异步操作结果的表示。

#### settled

Promise 一旦从 pending 变成 fulfilled 或 rejected，就叫 settled。

### 文件结构

```txt
05-promise-state/
  promiseStateDemo.js
```

### `promiseStateDemo.js`

```js
// Goal:
// Verify that a promise represents a future result.

const profilePromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve({ id: 1, name: 'Ada' });
  }, 10);
});

console.log(profilePromise instanceof Promise);

profilePromise.then((profileRecord) => {
  console.log(profileRecord.name);
});

console.log('promise handler registered');
```

### 运行方式

```bash
node promiseStateDemo.js
```

### 预期输出

```txt
true
promise handler registered
Ada
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 创建 `profilePromise`。 |
| 2 | Promise executor 同步执行，注册计时器。 |
| 3 | 输出 `true`。 |
| 4 | `then()` 注册 fulfilled handler。 |
| 5 | 输出 `promise handler registered`。 |
| 6 | 计时器到期后调用 `resolve()`。 |
| 7 | Promise 变成 fulfilled。 |
| 8 | `then()` 处理器执行，输出 `Ada`。 |

### 常见错误

不要以为 Promise 里面的异步结果可以立刻作为普通值返回。

错误：

```js
const profileRecord = profilePromise;
console.log(profileRecord.name);
```

`profileRecord` 是 Promise，不是成功值。

### 和项目开发的关系

网络请求、文件读取、数据库操作、动态导入，现代 API 通常返回 Promise。你必须分清“Promise 对象”和“Promise 的完成值”。

---

## 10. 06：Promise 构造函数和 executor

### 结论

`new Promise(executor)` 会立即同步调用 executor。executor 接收 `resolve` 和 `reject` 两个函数，用来决定 Promise 的最终状态。

### 新关键字和新概念

#### executor

Promise 构造函数接收的函数叫 executor。它负责启动异步工作，并在成功或失败时调用 `resolve` 或 `reject`。

#### `resolve()`

让 Promise 成功完成，或者采用另一个 Promise 的状态。

#### `reject()`

让 Promise 失败。

### 文件结构

```txt
06-promise-constructor/
  promiseExecutorDemo.js
```

### `promiseExecutorDemo.js`

```js
// Goal:
// Verify that the Promise executor runs synchronously.

const orderPromise = new Promise((resolve) => {
  console.log('executor start');

  setTimeout(() => {
    resolve('order ready');
  }, 10);

  console.log('executor end');
});

orderPromise.then((orderStatus) => {
  console.log(orderStatus);
});

console.log('script end');
```

### 运行方式

```bash
node promiseExecutorDemo.js
```

### 预期输出

```txt
executor start
executor end
script end
order ready
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 创建 Promise。 |
| 2 | executor 立即同步执行。 |
| 3 | 输出 `executor start`。 |
| 4 | 注册计时器。 |
| 5 | 输出 `executor end`。 |
| 6 | `then()` 注册处理器。 |
| 7 | 输出 `script end`。 |
| 8 | 计时器到期后调用 `resolve()`。 |
| 9 | `then()` 处理器输出 `order ready`。 |

### 常见错误

不要把 executor 当成“未来才运行”的函数。executor 是同步运行的，异步的是你在里面注册的工作。

### 和项目开发的关系

封装旧 API 时会经常手写 `new Promise()`。但在已经返回 Promise 的 API 外面重复包一层，通常是不必要的。

---

## 11. 07：then、catch、finally 链式调用

### 结论

`then()`、`catch()`、`finally()` 都会返回新的 Promise，所以可以链式调用。

### 新关键字和新概念

#### `then()`

注册成功处理器，也可以注册失败处理器。常见用法是只传成功处理器。

#### `catch()`

注册失败处理器，本质上类似 `then(undefined, onRejected)`。

#### `finally()`

无论成功还是失败都会执行，通常用于清理工作。

### 文件结构

```txt
07-promise-chain/
  promiseChainDemo.js
```

### `promiseChainDemo.js`

```js
// Goal:
// Verify how then, catch, and finally form a promise chain.

function loadCartTotal() {
  return Promise.resolve(120);
}

loadCartTotal()
  .then((totalAmount) => {
    console.log(`total: ${totalAmount}`);
    return totalAmount * 0.1;
  })
  .then((discountAmount) => {
    console.log(`discount: ${discountAmount}`);
    return discountAmount;
  })
  .catch((loadError) => {
    console.error(loadError.message);
  })
  .finally(() => {
    console.log('cleanup');
  });
```

### 运行方式

```bash
node promiseChainDemo.js
```

### 预期输出

```txt
total: 120
discount: 12
cleanup
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `loadCartTotal()` 返回 fulfilled Promise。 |
| 2 | 第一个 `then()` 收到 `120`。 |
| 3 | 第一个 `then()` 返回 `12`。 |
| 4 | 第二个 `then()` 收到 `12`。 |
| 5 | 没有错误，`catch()` 不执行。 |
| 6 | `finally()` 执行清理逻辑。 |

### 常见错误

不要忘记从 `then()` 返回下一个值。

错误：

```js
Promise.resolve(10)
  .then((amountValue) => {
    amountValue * 2;
  })
  .then((nextValue) => {
    console.log(nextValue);
  });
```

输出是 `undefined`，因为第一个 `then()` 没有 `return`。

### 和项目开发的关系

Promise 链本质上是数据管道。每一个 `then()` 的返回值都会影响下一个 `then()` 接收到的值。

---

## 12. 08：Promise 的错误传播

### 结论

Promise 链中的错误会向后传播，直到遇到能处理 rejected 状态的 `catch()` 或失败处理器。

### 新关键字和新概念

#### 错误传播（error propagation）

一个阶段抛出的错误，会让后续 Promise 进入 rejected 状态。

#### unhandled rejection

Promise 被拒绝但没有处理器捕获时，会形成未处理拒绝。

### 文件结构

```txt
08-promise-error-flow/
  promiseErrorFlowDemo.js
```

### `promiseErrorFlowDemo.js`

```js
// Goal:
// Verify how errors propagate through a promise chain.

Promise.resolve('raw payload')
  .then((payloadText) => {
    console.log(payloadText);
    throw new Error('Parse failed');
  })
  .then((parsedRecord) => {
    console.log(parsedRecord);
  })
  .catch((parseError) => {
    console.error(parseError.message);
    return { fallback: true };
  })
  .then((safeRecord) => {
    console.log(safeRecord.fallback);
  });
```

### 运行方式

```bash
node promiseErrorFlowDemo.js
```

### 预期输出

```txt
raw payload
Parse failed
true
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 初始 Promise fulfilled，值是 `raw payload`。 |
| 2 | 第一个 `then()` 输出文本。 |
| 3 | 第一个 `then()` 抛出 Error。 |
| 4 | 链上的下一个 `then()` 被跳过。 |
| 5 | `catch()` 捕获错误。 |
| 6 | `catch()` 返回 fallback 对象。 |
| 7 | 后面的 `then()` 收到恢复后的值。 |

### 常见错误

不要以为 `try/catch` 可以直接捕获未来异步回调中的错误。

错误：

```js
try {
  setTimeout(() => {
    throw new Error('Timer failed');
  }, 10);
} catch (timerError) {
  console.error(timerError.message);
}
```

外层 `try/catch` 只能包住当前同步执行阶段，不能包住未来才执行的回调。

### 和项目开发的关系

请求失败、解析失败、权限失败都应该有明确的错误传播路径。Promise 链和 `async` / `await` 都要处理 rejected 状态。

---

## 13. 09：Promise.all、allSettled、race、any

### 结论

Promise 静态组合方法用于组织多个异步任务：

```txt
Promise.all()         -> 全部成功才成功，一个失败就失败
Promise.allSettled()  -> 等全部结束，保留每个结果
Promise.race()        -> 第一个 settled 的结果决定最终结果
Promise.any()         -> 第一个 fulfilled 的结果决定最终结果，全部失败才失败
```

### 新关键字和新概念

#### 并发（concurrency）

多个异步任务在重叠时间段内推进，不等于一定多线程并行。

#### settled

fulfilled 或 rejected 都算 settled。

### 文件结构

```txt
09-promise-combinators/
  promiseAllDemo.js
  promiseAllSettledDemo.js
  promiseRaceAnyDemo.js
```

### `promiseAllDemo.js`

```js
// Goal:
// Verify that Promise.all waits for all fulfillments.

function loadMetric(labelText, valueNumber) {
  return Promise.resolve({ label: labelText, value: valueNumber });
}

Promise.all([
  loadMetric('views', 100),
  loadMetric('orders', 12),
  loadMetric('refunds', 1),
]).then((metricList) => {
  console.log(metricList.map((metricRecord) => metricRecord.label).join(','));
});
```

### 预期输出

```txt
views,orders,refunds
```

### `promiseAllSettledDemo.js`

```js
// Goal:
// Verify that Promise.allSettled keeps both success and failure results.

const successfulTask = Promise.resolve('cache ready');
const failedTask = Promise.reject(new Error('network failed'));

Promise.allSettled([successfulTask, failedTask]).then((taskResults) => {
  console.log(taskResults[0].status);
  console.log(taskResults[1].status);
});
```

### 预期输出

```txt
fulfilled
rejected
```

### `promiseRaceAnyDemo.js`

```js
// Goal:
// Compare Promise.race and Promise.any.

const slowSuccess = new Promise((resolve) => {
  setTimeout(() => resolve('slow success'), 20);
});

const fastFailure = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('fast failure')), 10);
});

Promise.race([slowSuccess, fastFailure]).catch((raceError) => {
  console.log(`race: ${raceError.message}`);
});

Promise.any([slowSuccess, fastFailure]).then((firstSuccess) => {
  console.log(`any: ${firstSuccess}`);
});
```

### 预期输出

```txt
race: fast failure
any: slow success
```

### 执行过程

| 方法 | 决定结果的条件 |
|---|---|
| `Promise.all()` | 所有输入都 fulfilled。 |
| `Promise.allSettled()` | 所有输入都 settled。 |
| `Promise.race()` | 第一个 settled 的 Promise。 |
| `Promise.any()` | 第一个 fulfilled 的 Promise。 |

### 常见错误

不要把 `Promise.race()` 和 `Promise.any()` 混在一起。

```txt
race 看谁最先结束，不管成功失败。
any 看谁最先成功，失败的会继续等其他成功结果。
```

### 和项目开发的关系

页面初始化经常需要同时发多个请求。你要根据业务决定：一个失败是否整体失败，还是收集所有结果。

---

## 14. 10：把回调 API 包装成 Promise

### 结论

如果一个旧 API 使用回调，可以用 `new Promise()` 把它包装成返回 Promise 的函数。

### 新关键字和新概念

#### Promise wrapper

Promise wrapper 是把回调风格 API 转成 Promise 风格 API 的封装函数。

### 文件结构

```txt
10-promisify-callback/
  callbackToPromiseDemo.js
```

### `callbackToPromiseDemo.js`

```js
// Goal:
// Convert an error-first callback API into a promise API.

function readSettings(callback) {
  setTimeout(() => {
    callback(null, { theme: 'dark', pageSize: 20 });
  }, 10);
}

function readSettingsAsync() {
  return new Promise((resolve, reject) => {
    readSettings((settingsError, settingsRecord) => {
      if (settingsError !== null) {
        reject(settingsError);
        return;
      }

      resolve(settingsRecord);
    });
  });
}

readSettingsAsync().then((settingsRecord) => {
  console.log(settingsRecord.theme);
});
```

### 运行方式

```bash
node callbackToPromiseDemo.js
```

### 预期输出

```txt
dark
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `readSettingsAsync()` 创建并返回 Promise。 |
| 2 | executor 调用旧的 `readSettings()`。 |
| 3 | 旧 API 完成后调用 error-first callback。 |
| 4 | 如果有错误，调用 `reject()`。 |
| 5 | 如果成功，调用 `resolve(settingsRecord)`。 |
| 6 | 外部使用 `then()` 读取结果。 |

### 常见错误

不要在已经返回 Promise 的 API 外面重复包 Promise。

错误：

```js
function loadValueAgain() {
  return new Promise((resolve, reject) => {
    Promise.resolve(10).then(resolve).catch(reject);
  });
}
```

如果 API 已经返回 Promise，直接返回它。

### 和项目开发的关系

真实项目里你会遇到旧库、旧 SDK、浏览器事件 API。把回调包装成 Promise，是迁移到 `async` / `await` 的桥梁。

---

## 15. 11：async function 的返回值

### 结论

异步函数（async function）调用后一定返回 Promise。函数体里 `return value`，外部拿到的是 fulfilled Promise，不是直接的 value。

### 新关键字和新概念

#### `async`

`async` 是函数声明语法的一部分。它让函数返回 Promise，并允许函数体内部使用 `await`。

### 文件结构

```txt
11-async-function-return/
  asyncFunctionReturnDemo.js
```

### `asyncFunctionReturnDemo.js`

```js
// Goal:
// Verify that an async function always returns a promise.

async function loadProfileName() {
  return 'Ada';
}

const profileNamePromise = loadProfileName();

console.log(profileNamePromise instanceof Promise);

profileNamePromise.then((profileName) => {
  console.log(profileName);
});
```

### 运行方式

```bash
node asyncFunctionReturnDemo.js
```

### 预期输出

```txt
true
Ada
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 调用 `loadProfileName()`。 |
| 2 | 因为函数是 async，返回 Promise。 |
| 3 | 函数体返回字符串 `Ada`。 |
| 4 | 返回的 Promise 以 `Ada` 兑现。 |
| 5 | `then()` 读取 fulfilled value。 |

### 常见错误

错误：

```js
const profileName = loadProfileName();
console.log(profileName.toUpperCase());
```

`profileName` 是 Promise，不是字符串。

### 和项目开发的关系

在 React、Node、Next.js、请求函数里，只要函数标了 `async`，调用者就必须按 Promise 处理。

---

## 16. 12：await 的真正机制

### 结论

`await` 会等待 Promise 完成，并把 fulfilled value 作为表达式结果。它暂停的是当前 async 函数的后续执行，不是阻塞整个 JavaScript 程序。

### 新关键字和新概念

#### `await`

`await` 是操作符（operator），只能在 async 函数内部或模块顶层使用。

#### fulfilled value

Promise 成功完成后传给后续逻辑的值。

### 文件结构

```txt
12-await-mechanism/
  awaitOrderDemo.js
```

### `awaitOrderDemo.js`

```js
// Goal:
// Verify that await pauses only the current async function.

function loadOrderStatus() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('ready');
    }, 10);
  });
}

async function printOrderStatus() {
  console.log('before await');

  const orderStatus = await loadOrderStatus();

  console.log(orderStatus);
  console.log('after await');
}

printOrderStatus();
console.log('outside async function');
```

### 运行方式

```bash
node awaitOrderDemo.js
```

### 预期输出

```txt
before await
outside async function
ready
after await
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 调用 `printOrderStatus()`。 |
| 2 | 输出 `before await`。 |
| 3 | 调用 `loadOrderStatus()`，得到 Promise。 |
| 4 | `await` 暂停 `printOrderStatus()` 后续代码。 |
| 5 | 函数外部同步代码继续执行，输出 `outside async function`。 |
| 6 | Promise fulfilled，值是 `ready`。 |
| 7 | async 函数继续执行，`orderStatus` 得到 `ready`。 |
| 8 | 输出 `ready` 和 `after await`。 |

### 常见错误

不要说 `await` 会“阻塞 JavaScript”。更准确：

```txt
await pauses the current async function continuation.
```

它不阻塞整个事件循环。

### 和项目开发的关系

这解释了为什么请求还没回来时页面不会卡死，也解释了为什么 `await` 后面的代码会晚于外部同步代码执行。

---

## 17. 13：try/catch 处理 async/await 错误

### 结论

在 async 函数里，`await` 一个 rejected Promise 会像抛出异常一样进入 `catch`。

### 新关键字和新概念

#### rejection as throw

`await` 遇到 rejected Promise 时，会把 rejection reason 当作异常抛出。

### 文件结构

```txt
13-async-await-error/
  asyncAwaitErrorDemo.js
```

### `asyncAwaitErrorDemo.js`

```js
// Goal:
// Verify how try/catch handles rejected promises with await.

function loadBillingRecord() {
  return Promise.reject(new Error('Billing service failed'));
}

async function renderBillingPanel() {
  try {
    const billingRecord = await loadBillingRecord();
    console.log(billingRecord);
  } catch (billingError) {
    console.error(billingError.message);
  }
}

renderBillingPanel();
```

### 运行方式

```bash
node asyncAwaitErrorDemo.js
```

### 预期输出

```txt
Billing service failed
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 调用 `renderBillingPanel()`。 |
| 2 | 执行 `await loadBillingRecord()`。 |
| 3 | `loadBillingRecord()` 返回 rejected Promise。 |
| 4 | `await` 把 rejection reason 抛出。 |
| 5 | `catch` 捕获错误。 |
| 6 | 输出错误消息。 |

### 常见错误

不要忘记 `await`。

错误：

```js
try {
  const billingPromise = loadBillingRecord();
} catch (billingError) {
  console.error(billingError.message);
}
```

这里 `try/catch` 不会捕获 Promise 未来的 rejection，因为你没有 `await`。

### 和项目开发的关系

请求函数、数据库函数、文件函数都可能失败。`try/catch` 是 `async` / `await` 风格下集中处理错误的主要方式。

---

## 18. 14：串行 await 和并行 Promise

### 结论

连续写多个 `await` 通常是串行（serial）。如果任务之间没有依赖，应该先启动多个 Promise，再用 `Promise.all()` 并发等待。

### 新关键字和新概念

#### 串行（serial）

一个任务完成后才启动下一个任务。

#### 并发（concurrent）

多个任务先启动，之后一起等待结果。

### 文件结构

```txt
14-serial-vs-concurrent/
  serialAwaitDemo.js
  concurrentPromiseDemo.js
```

### `serialAwaitDemo.js`

```js
// Goal:
// Verify serial await execution.

function loadMetric(labelText) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(labelText);
    }, 10);
  });
}

async function loadMetricsSerially() {
  const firstMetric = await loadMetric('views');
  const secondMetric = await loadMetric('orders');

  console.log(firstMetric);
  console.log(secondMetric);
}

loadMetricsSerially();
```

### `concurrentPromiseDemo.js`

```js
// Goal:
// Verify concurrent promise startup with Promise.all.

function loadMetric(labelText) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(labelText);
    }, 10);
  });
}

async function loadMetricsConcurrently() {
  const firstMetricPromise = loadMetric('views');
  const secondMetricPromise = loadMetric('orders');

  const metricList = await Promise.all([
    firstMetricPromise,
    secondMetricPromise,
  ]);

  console.log(metricList.join(','));
}

loadMetricsConcurrently();
```

### 运行方式

```bash
node serialAwaitDemo.js
node concurrentPromiseDemo.js
```

### 预期输出

`serialAwaitDemo.js`：

```txt
views
orders
```

`concurrentPromiseDemo.js`：

```txt
views,orders
```

### 执行过程

| 写法 | 执行模型 |
|---|---|
| `await loadA(); await loadB();` | A 完成后才开始 B。 |
| `const a = loadA(); const b = loadB(); await Promise.all([a, b]);` | A 和 B 先启动，再一起等待。 |

### 常见错误

不要在 `map()` 里面写 `async` 后忘记 `Promise.all()`。

错误：

```js
const resultList = itemList.map(async (itemRecord) => {
  return loadMetric(itemRecord.label);
});
```

`resultList` 是 Promise 数组，不是最终值数组。

正确：

```js
const resultList = await Promise.all(
  itemList.map((itemRecord) => {
    return loadMetric(itemRecord.label);
  }),
);
```

### 和项目开发的关系

接口请求经常可以并发。错误地串行等待会让页面变慢。

---

## 19. 15：顶层 await

### 结论

顶层 await（top-level await）允许 ES Module 在模块顶层等待 Promise。导入这个模块的其他模块会等待它完成初始化。

### 新关键字和新概念

#### 顶层 await（top-level await）

不在函数内部，直接写在模块顶层的 `await`。

#### 模块初始化（module initialization）

模块导入、执行顶层代码、建立导出绑定的阶段。

### 文件结构

```txt
15-top-level-await/
  runtimeConfig.mjs
  app.mjs
```

### `runtimeConfig.mjs`

```js
// Goal:
// Export a value initialized by top-level await.

const configPromise = Promise.resolve({
  apiBaseUrl: 'https://example.com',
  retryCount: 2,
});

export const runtimeConfig = await configPromise;
```

### `app.mjs`

```js
// Goal:
// Import a value from a module that uses top-level await.

import { runtimeConfig } from './runtimeConfig.mjs';

console.log(runtimeConfig.apiBaseUrl);
console.log(runtimeConfig.retryCount);
```

### 运行方式

```bash
node app.mjs
```

### 预期输出

```txt
https://example.com
2
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `app.mjs` 导入 `runtimeConfig.mjs`。 |
| 2 | `runtimeConfig.mjs` 执行到顶层 `await`。 |
| 3 | 模块等待 `configPromise` fulfilled。 |
| 4 | `runtimeConfig` 完成初始化。 |
| 5 | `app.mjs` 继续执行。 |

### 常见错误

不要在基础工具模块中滥用顶层 await。它会让依赖该模块的模块都等待初始化完成。

### 和项目开发的关系

顶层 await 常用于模块启动配置、动态资源加载。但在大型项目中要谨慎，因为它会影响整个模块依赖图。

---

## 20. 16：异步迭代 for await...of

### 结论

`for await...of` 用于遍历异步可迭代对象（async iterable）。每一轮循环会等待异步迭代器的 `next()` Promise 完成。

### 新关键字和新概念

#### `for await...of`

异步循环语句。它可以遍历 async iterable，也可以遍历普通 sync iterable，但核心用途是 async iterable。

#### `Symbol.asyncIterator`

一个公认符号（well-known symbol）。对象如果有 `[Symbol.asyncIterator]()` 方法，就可以成为 async iterable。

### 文件结构

```txt
16-for-await-of/
  asyncIterableLoopDemo.mjs
```

### `asyncIterableLoopDemo.mjs`

```js
// Goal:
// Verify how for await...of consumes async values.

async function runAsyncLoop() {
  const reportChunkPromises = [
    Promise.resolve('header'),
    Promise.resolve('body'),
    Promise.resolve('footer'),
  ];

  for await (const reportChunk of reportChunkPromises) {
    console.log(reportChunk);
  }
}

runAsyncLoop();
```

### 运行方式

```bash
node asyncIterableLoopDemo.mjs
```

### 预期输出

```txt
header
body
footer
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 数组本身是同步可迭代对象。 |
| 2 | 数组元素是 Promise。 |
| 3 | `for await...of` 每一轮等待当前 Promise。 |
| 4 | Promise fulfilled 后，把值交给 `reportChunk`。 |
| 5 | 循环体输出值。 |

### 常见错误

不要在普通函数里写 `for await...of`。

错误：

```js
function runLoop() {
  for await (const itemValue of itemList) {
    console.log(itemValue);
  }
}
```

`for await...of` 只能在可以使用 `await` 的上下文中使用，例如 async function 或 ES Module 顶层。

### 和项目开发的关系

流式数据、分页数据、日志数据、Web stream、Node readable stream 都可能用异步迭代消费。

---

## 21. 17：异步生成器 async function*

### 结论

异步生成器（async generator）用 `async function*` 定义。它既可以 `await`，也可以 `yield`，每次产出的值会通过异步迭代协议交给消费者。

### 新关键字和新概念

#### `async function*`

组合了 async function 和 generator function 的语法。

#### `yield`

在生成器中产出一个值，并暂停生成器。

### 文件结构

```txt
17-async-generator/
  asyncGeneratorDemo.mjs
```

### `asyncGeneratorDemo.mjs`

```js
// Goal:
// Verify how an async generator yields values over time.

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function* createStatusStream() {
  await delay(10);
  yield 'queued';

  await delay(10);
  yield 'running';

  await delay(10);
  yield 'done';
}

for await (const statusText of createStatusStream()) {
  console.log(statusText);
}
```

### 运行方式

```bash
node asyncGeneratorDemo.mjs
```

### 预期输出

```txt
queued
running
done
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 调用 `createStatusStream()`，得到 async generator object。 |
| 2 | `for await...of` 请求第一项。 |
| 3 | 生成器内部 `await delay(10)`。 |
| 4 | `yield 'queued'` 产出第一项。 |
| 5 | 后续两轮重复等待和产出。 |

### 常见错误

不要把 `async function*` 和 `async function` 混为一谈。

```txt
async function     -> returns Promise
async function*    -> returns async generator object
```

### 和项目开发的关系

异步生成器适合表达“随着时间逐步产生的异步数据序列”，比手写回调更清楚。

---

## 22. 18：手写异步可迭代对象

### 结论

手写异步可迭代对象，需要实现 `[Symbol.asyncIterator]()`，并返回包含 `next()` 方法的异步迭代器。`next()` 返回 Promise，Promise fulfilled 后得到 `{ value, done }`。

### 新关键字和新概念

#### 异步迭代器协议（async iterator protocol）

异步迭代器的 `next()` 返回 Promise。Promise 的完成值是 iterator result object。

#### iterator result object

形状是：

```txt
{ value: someValue, done: false }
{ value: undefined, done: true }
```

### 文件结构

```txt
18-manual-async-iterable/
  manualAsyncIterableDemo.mjs
```

### `manualAsyncIterableDemo.mjs`

```js
// Goal:
// Manually implement an async iterable object.

function createAsyncNumberRange(startNumber, endNumber) {
  let currentNumber = startNumber;

  return {
    [Symbol.asyncIterator]() {
      return {
        async next() {
          if (currentNumber > endNumber) {
            return {
              value: undefined,
              done: true,
            };
          }

          const valueNumber = currentNumber;
          currentNumber += 1;

          return {
            value: valueNumber,
            done: false,
          };
        },
      };
    },
  };
}

for await (const numberValue of createAsyncNumberRange(1, 3)) {
  console.log(numberValue);
}
```

### 运行方式

```bash
node manualAsyncIterableDemo.mjs
```

### 预期输出

```txt
1
2
3
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `createAsyncNumberRange(1, 3)` 返回 async iterable。 |
| 2 | `for await...of` 调用 `[Symbol.asyncIterator]()`。 |
| 3 | 得到 async iterator。 |
| 4 | 每一轮调用 `next()`。 |
| 5 | `next()` 返回 Promise，因为它是 async method。 |
| 6 | Promise fulfilled 后得到 `{ value, done }`。 |
| 7 | `done: true` 时循环结束。 |

### 常见错误

不要让 async iterator 的 `next()` 直接返回普通值。

虽然 `async next()` 会自动包装返回值，但如果你写普通 `next()`，就必须自己返回 Promise。

### 和项目开发的关系

理解手写 async iterable 后，再看 Web Stream、Node Stream、分页 API、异步数据源会更容易。

---

## 23. 19：小项目整合

### 结论

最后用一个小项目把 Promise、async/await、并发请求、错误处理、异步生成器整合起来。

### 文件结构

```txt
19-mini-practice-project/
  package.json
  main.mjs
  services/profileService.mjs
  services/metricService.mjs
  streams/statusStream.mjs
  views/dashboardView.mjs
```

### `package.json`

```json
{
  "type": "module"
}
```

### `services/profileService.mjs`

```js
// Goal:
// Export an async profile loading function.

export async function loadProfileRecord() {
  return {
    id: 1,
    name: 'Ada',
    plan: 'pro',
  };
}
```

### `services/metricService.mjs`

```js
// Goal:
// Export async metric loading functions.

function delay(value, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

export function loadVisitMetric() {
  return delay({ label: 'visits', value: 120 }, 10);
}

export function loadOrderMetric() {
  return delay({ label: 'orders', value: 14 }, 10);
}
```

### `streams/statusStream.mjs`

```js
// Goal:
// Export an async generator that yields dashboard status values.

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function* createDashboardStatusStream() {
  await delay(5);
  yield 'loading profile';

  await delay(5);
  yield 'loading metrics';

  await delay(5);
  yield 'ready';
}
```

### `views/dashboardView.mjs`

```js
// Goal:
// Build a dashboard summary string.

export function createDashboardSummary(profileRecord, metricList) {
  const metricText = metricList
    .map((metricRecord) => `${metricRecord.label}:${metricRecord.value}`)
    .join(',');

  return `${profileRecord.name} ${profileRecord.plan} ${metricText}`;
}
```

### `main.mjs`

```js
// Goal:
// Compose async modules into one dashboard flow.

import { loadProfileRecord } from './services/profileService.mjs';
import {
  loadVisitMetric,
  loadOrderMetric,
} from './services/metricService.mjs';
import { createDashboardStatusStream } from './streams/statusStream.mjs';
import { createDashboardSummary } from './views/dashboardView.mjs';

for await (const statusText of createDashboardStatusStream()) {
  console.log(statusText);
}

const profilePromise = loadProfileRecord();
const metricPromise = Promise.all([
  loadVisitMetric(),
  loadOrderMetric(),
]);

try {
  const profileRecord = await profilePromise;
  const metricList = await metricPromise;

  console.log(createDashboardSummary(profileRecord, metricList));
} catch (dashboardError) {
  console.error(dashboardError.message);
}
```

### 运行方式

```bash
node main.mjs
```

### 预期输出

```txt
loading profile
loading metrics
ready
Ada pro visits:120,orders:14
```

### 项目意义

这个小项目整合了：

```txt
ES Module
async function
Promise.all
await
try/catch
async generator
for await...of
模块化异步流程
```

---

## 24. 最终文件清单

```txt
javascript-asynchronous-learning/
  00-sync-vs-async/
    syncVsAsyncOrder.js

  01-callback-basics/
    synchronousCallbackDemo.js

  02-async-callback-order/
    asyncCallbackOrder.js

  03-error-first-callback/
    errorFirstCallbackDemo.js

  04-callback-nesting/
    callbackNestingDemo.js

  05-promise-state/
    promiseStateDemo.js

  06-promise-constructor/
    promiseExecutorDemo.js

  07-promise-chain/
    promiseChainDemo.js

  08-promise-error-flow/
    promiseErrorFlowDemo.js

  09-promise-combinators/
    promiseAllDemo.js
    promiseAllSettledDemo.js
    promiseRaceAnyDemo.js

  10-promisify-callback/
    callbackToPromiseDemo.js

  11-async-function-return/
    asyncFunctionReturnDemo.js

  12-await-mechanism/
    awaitOrderDemo.js

  13-async-await-error/
    asyncAwaitErrorDemo.js

  14-serial-vs-concurrent/
    serialAwaitDemo.js
    concurrentPromiseDemo.js

  15-top-level-await/
    runtimeConfig.mjs
    app.mjs

  16-for-await-of/
    asyncIterableLoopDemo.mjs

  17-async-generator/
    asyncGeneratorDemo.mjs

  18-manual-async-iterable/
    manualAsyncIterableDemo.mjs

  19-mini-practice-project/
    package.json
    main.mjs
    services/profileService.mjs
    services/metricService.mjs
    streams/statusStream.mjs
    views/dashboardView.mjs

  javascript-asynchronous-learning-notes.md
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
最终记忆模型
```

### 语言要求

```txt
正文说明：中文。
重要术语：中文后面补英文。
代码命名：英文。
代码注释：英文。
代码和代码注释：不要出现中文字符。
```

### 执行过程要求

异步章节的执行过程必须写清楚：

```txt
同步代码先执行了哪些行。
哪些函数只是注册了未来工作。
Promise 是什么时候创建的。
Promise 是什么时候 fulfilled 或 rejected 的。
then/catch/finally 是什么时候注册的。
await 暂停了哪个 async 函数。
循环什么时候进入下一轮。
```

---

## 26. 本章最终要能回答的问题

学完第 13 章，你应该能回答：

```txt
1. 同步代码和异步代码的区别是什么？
2. 回调函数是什么？callback function 为什么不一定是异步？
3. setTimeout(callback, 0) 为什么不是立刻执行？
4. 调用栈、任务队列、微任务队列、事件循环分别是什么？
5. 错误优先回调的参数顺序是什么？
6. 回调嵌套真正的问题是什么？
7. Promise 表示异步操作本身，还是异步结果？
8. Promise 有哪三种状态？
9. new Promise(executor) 中 executor 什么时候执行？
10. resolve 和 reject 分别改变什么？
11. then 为什么会返回新的 Promise？
12. catch 如何捕获前面链条中的错误？
13. finally 适合做什么？
14. Promise.all 失败规则是什么？
15. Promise.allSettled 和 Promise.all 区别是什么？
16. Promise.race 和 Promise.any 区别是什么？
17. 如何把 error-first callback 包装成 Promise？
18. async function 为什么总是返回 Promise？
19. await 等待的是什么？
20. await 暂停的是整个程序还是当前 async 函数？
21. try/catch 捕获 async 错误的前提是什么？
22. 串行 await 和并发 Promise 的区别是什么？
23. 顶层 await 会怎样影响模块依赖图？
24. for await...of 每一轮等待的是什么？
25. Symbol.asyncIterator 是什么？
26. async function* 和 async function 有什么区别？
27. 手写 async iterable 需要实现什么方法？
28. 异步 JavaScript 和真实前端请求、事件、状态更新有什么关系？
```

---

## 27. MDN 阅读清单

先完成本文件练习，再查 MDN 细节：

```txt
Callback function:
https://developer.mozilla.org/en-US/docs/Glossary/Callback_function

JavaScript execution model:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model

Using promises:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

Promise:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

Promise constructor:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise

Promise.prototype.then:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

Promise.prototype.catch:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch

Promise.prototype.finally:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally

Promise.all:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

Promise.allSettled:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

Promise.any:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any

Promise.race:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race

async function:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

await:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

for await...of:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

Symbol.asyncIterator:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator
```

---

## 28. 最终记忆模型

第 13 章不是语法糖集合，而是异步控制流模型：

```txt
callback:
把未来要执行的函数交给另一个 API。

Promise:
把未来成功或失败的结果对象化。

then/catch/finally:
给 Promise 注册成功、失败、清理处理器，并返回新的 Promise。

async function:
把函数返回值自动包装成 Promise。

await:
等待 Promise，并暂停当前 async 函数后续执行。

Promise.all:
并发等待多个 Promise 全部成功。

Promise.allSettled:
并发等待多个 Promise 全部结束。

Promise.race:
谁先结束就采用谁的结果。

Promise.any:
谁先成功就采用谁的结果。

for await...of:
循环等待异步迭代器每一次 next() 的 Promise。

async function*:
随着时间逐步 yield 异步数据序列。
```

最关键的一句话：

```txt
异步不是让 JavaScript 同时执行所有代码，而是把当前代码、未来结果、后续处理逻辑分开调度。
```
