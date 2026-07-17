# JavaScript 异步编程学习指导文件

> 定位：这是第 13 章“异步 JavaScript（Asynchronous JavaScript）”的教学型学习指导文件，不是最终学习笔记。
> 范围：《JavaScript 权威指南》第 13 章：使用回调的异步编程、期约（Promise）、`async` / `await`、异步迭代（asynchronous iteration）。
> 目标：第一次学习本章时，只靠这份文件，你应该能理解核心概念、写出代码、运行代码、解释输出、定位常见错误，并整理成正式学习笔记。
> 语言规则：正文使用中文；重要技术术语写成“中文术语（English term）”。
> 代码规则：代码命名和代码注释使用英文；代码和代码注释不使用中文字符。
> 说明：本章 `cheatsheet` 已经单独存在，本文不重复生成新的 `cheatsheet` 文件，只说明它应该如何配合本指导文件使用。

---

## 目录

1. [0. 文件定位](#0-文件定位)
2. [1. 本章先解决什么问题](#1-本章先解决什么问题)
3. [2. 学习本章前必须补齐的前置概念](#2-学习本章前必须补齐的前置概念)
4. [3. 本章学习目标](#3-本章学习目标)
5. [4. 本章学习顺序](#4-本章学习顺序)
6. [5. 本章核心术语表](#5-本章核心术语表)
7. [6. 本章底层模型](#6-本章底层模型)
8. [7. 推荐目录结构](#7-推荐目录结构)
9. [8. 运行方式](#8-运行方式)
10. [9. 分节教学与训练内容](#9-分节教学与训练内容)
    - [00：同步代码和异步代码的区别](#00-sync-vs-async)
    - [01：回调函数基础](#01-callback-basics)
    - [02：异步回调和执行顺序](#02-async-callback-order)
    - [03：错误优先回调](#03-error-first-callback)
    - [04：回调嵌套和控制流问题](#04-callback-nesting)
    - [05：Promise 的状态模型](#05-promise-state)
    - [06：Promise 构造函数和 executor](#06-promise-constructor)
    - [07：then、catch、finally 链式调用](#07-promise-chain)
    - [08：Promise 的错误传播](#08-promise-error-flow)
    - [09：Promise.all、allSettled、race、any](#09-promise-combinators)
    - [10：把回调 API 包装成 Promise](#10-promisify-callback)
    - [11：async function 的返回值](#11-async-function-return)
    - [12：await 的真正机制](#12-await-mechanism)
    - [13：try/catch 处理 async/await 错误](#13-async-await-error)
    - [14：串行 await 和并行 Promise](#14-serial-vs-concurrent)
    - [15：顶层 await](#15-top-level-await)
    - [16：异步迭代 for await...of](#16-for-await-of)
    - [17：异步生成器 async function*](#17-async-generator)
    - [18：手写异步可迭代对象](#18-manual-async-iterable)
11. [10. 本章 API / 语法完整索引](#10-本章-api--语法完整索引)
12. [11. 本章常见错误总表](#11-本章常见错误总表)
13. [12. 最终小项目](#12-最终小项目)
14. [13. 已有 cheatsheet 的使用方式](#13-已有-cheatsheet-的使用方式)
15. [14. 最终文件清单](#14-最终文件清单)
16. [15. 最终学习笔记转换要求](#15-最终学习笔记转换要求)
17. [16. 本章最终要能回答的问题](#16-本章最终要能回答的问题)
18. [17. 本章最终记忆模型](#17-本章最终记忆模型)
19. [18. 官方文档阅读清单](#18-官方文档阅读清单)

---

## 0. 文件定位

### 结论

这份文件不是 API 清单，也不是复习提纲。它是第 13 章异步 JavaScript 的教学型学习指导文件。

你使用它时，不是“读一遍”，而是要执行下面这个循环：

```txt
read concept
  -> create file
  -> run code
  -> record output
  -> explain execution order
  -> write wrong version
  -> explain error rule
  -> convert to final notes
```

### 技术意义

异步 JavaScript 不适合只靠背定义学习。因为真正难点不在 `setTimeout()`、`.then()`、`await` 这些表面语法，而在运行时顺序：

```txt
哪些代码现在执行。
哪些代码只是注册未来任务。
Promise 什么时候改变状态。
then 回调什么时候进入微任务队列。
await 暂停的是哪一段代码。
错误为什么能跨 Promise 链传播。
异步迭代为什么每次 next 都返回 Promise。
```

### 本文件和最终学习笔记的关系

本文件提供完整教学、训练路径和错误解释。最终学习笔记应该由你自己整理，不能照抄本文件。最终笔记要写你自己运行后的输出、你实际卡住的点、你如何判断同步和异步边界。

---

## 1. 本章先解决什么问题

### 结论

本章解决的问题是：JavaScript 如何在单线程执行模型下处理未来才完成的工作。

典型未来工作包括：

```txt
timer callback
user event
network request
file operation
stream data
message from worker
```

JavaScript 的同步代码只能按调用栈（call stack）一段一段执行。异步机制把“现在启动任务”和“未来处理结果”拆开：

```txt
start work now
  -> return control to current program
  -> complete work later
  -> schedule continuation
  -> run continuation when stack is clear
```

### 技术意义

没有异步机制，浏览器页面会在网络请求和计时器等待期间卡死；Node 服务会在文件读取、数据库查询、HTTP 请求期间阻塞整个请求处理流程。

异步机制让 JavaScript 能够写出这种代码结构：

```txt
现在发起请求。
现在继续响应用户操作。
未来请求完成后再更新页面。
```

### 和前面章节的关系

本章依赖你已经学过的基础：

```txt
函数是值 -> callback 可以作为参数传递。
对象保存状态 -> Promise 是有内部状态的对象。
数组保存多个任务 -> Promise.all 接收 Promise 数组。
异常会中断当前执行 -> throw 会让 Promise 链进入 rejected 通道。
模块有依赖图 -> top-level await 会影响模块加载顺序。
迭代器有 next() -> async iterator 的 next() 返回 Promise。
生成器可以 yield -> async generator 可以异步 yield。
```

### 不学清楚会导致的问题

如果异步模型没学清楚，后面学 React、Node、Next.js 会出现这些混乱：

```txt
以为 fetch() 直接返回数据对象。
以为 setState 后马上能读到新 UI。
以为 await 会阻塞整个 JavaScript 程序。
以为 try/catch 一定能捕获 timer callback 里的 throw。
以为 Promise.all 是顺序执行任务。
以为 async function 返回普通值。
以为 for await...of 只是 for...of 的语法糖。
```

---

## 2. 学习本章前必须补齐的前置概念

| 前置概念 | 必须理解到什么程度 | 如果不懂会影响什么 |
|---|---|---|
| 函数（function） | 函数是值，可以作为参数、返回值、对象属性 | 会看不懂 callback、handler、executor |
| 形参和实参（parameter and argument） | 调用时按位置绑定，名字不决定值 | 会混淆 `callback`、`resolve`、`profileRecord` |
| 返回值（return value） | 函数调用表达式求值得到返回值 | 会混淆 `then` 返回 Promise 和回调返回值 |
| 异常（exception） | `throw` 会中断当前同步执行，并沿调用栈寻找 `catch` | 会看不懂 Promise rejected 和 async 错误传播 |
| 对象（object） | 对象是属性集合；变量保存对象引用 | 会把 Promise 成功值、结果对象、数组项混在一起 |
| 数组（array） | 数组按索引保存元素，元素类型可以是 Promise | 会看不懂 `Promise.all([...])` |
| 迭代器（iterator） | `next()` 返回 `{ value, done }` | 会看不懂异步迭代器为什么返回 Promise |
| 生成器（generator） | `function*` 可以暂停和继续执行 | 会看不懂 `async function*` |
| 模块（module） | ES module 有模块作用域和依赖图 | 会看不懂顶层 `await` 对模块加载的影响 |

### 前置概念补讲：函数值和函数调用

```js
// Goal:
// Verify the difference between a function value and a function call result.

function createOrderLabel(orderId) {
  return `order:${orderId}`;
}

const labelBuilder = createOrderLabel;
const labelText = createOrderLabel(42);

console.log(typeof labelBuilder);
console.log(labelText);
```

预期输出：

```txt
function
order:42
```

逐行解释：

- `function createOrderLabel(orderId) { ... }` 创建函数对象，并把名字 `createOrderLabel` 绑定到这个函数对象。
- `const labelBuilder = createOrderLabel;` 没有调用函数，只是把函数值赋给另一个变量。
- `const labelText = createOrderLabel(42);` 使用 `()` 调用函数，返回字符串。
- `typeof labelBuilder` 是 `'function'`。
- `labelText` 是字符串，不是函数。

这个区别是理解 callback、executor、`then` handler 的入口。

---

## 3. 本章学习目标

学完本章后，你必须能够做到：

```txt
1. 判断一行代码是立即执行，还是注册未来工作。
2. 解释 callback 为什么不等于异步。
3. 解释 error-first callback 的参数顺序。
4. 解释 Promise 的三种状态和状态不可逆。
5. 解释 Promise.resolve、Promise.reject、new Promise 的区别。
6. 解释 then、catch、finally 返回的新 Promise 由什么决定。
7. 解释 Promise.all、allSettled、race、any 的返回值和失败规则。
8. 把 callback API 包装成 Promise。
9. 解释 async function 为什么总是返回 Promise。
10. 解释 await 暂停当前 async 函数，不阻塞整个程序。
11. 区分串行 await、并发 Promise、并行执行。
12. 解释顶层 await 如何影响模块依赖图。
13. 解释 for await...of、async iterator、async generator 的关系。
14. 写一个小项目把请求、并发、错误处理、异步迭代串起来。
```

---

## 4. 本章学习顺序

```txt
00-sync-vs-async
  -> 01-callback-basics
  -> 02-async-callback-order
  -> 03-error-first-callback
  -> 04-callback-nesting
  -> 05-promise-state
  -> 06-promise-constructor
  -> 07-promise-chain
  -> 08-promise-error-flow
  -> 09-promise-combinators
  -> 10-promisify-callback
  -> 11-async-function-return
  -> 12-await-mechanism
  -> 13-async-await-error
  -> 14-serial-vs-concurrent
  -> 15-top-level-await
  -> 16-for-await-of
  -> 17-async-generator
  -> 18-manual-async-iterable
  -> 19-mini-practice-project
```

学习时不要跳过回调直接学 `async` / `await`。`async` / `await` 是 Promise 的语法层改进；Promise 又是对异步回调控制流的结构化升级。

---

## 5. 本章核心术语表

| 中文术语 | English term | 所属层级 | 技术意义 | 容易混淆点 |
|---|---|---|---|---|
| 同步代码 | synchronous code | runtime behavior | 当前调用栈中立即按顺序执行的代码 | 容易误以为写在外层的都一定先于所有内部代码 |
| 异步代码 | asynchronous code | runtime behavior / platform API | 当前代码不等待未来结果，未来再执行后续逻辑 | 容易误以为只有 `setTimeout` 才是异步 |
| 调用栈 | call stack | runtime mechanism | 保存当前正在执行的函数调用 | 容易和事件循环混淆 |
| 宿主环境 | host environment | platform runtime | 浏览器或 Node 提供计时器、I/O、网络、事件等能力 | 容易误以为所有异步 API 都是 ECMAScript 语法 |
| 任务队列 | task queue / macrotask queue | runtime scheduling | 保存 timer、I/O、event callback 等未来任务 | 容易和微任务队列混淆 |
| 微任务队列 | microtask queue / job queue | runtime scheduling | 保存 Promise reaction、`queueMicrotask` 等高优先级任务 | 容易误以为 `.then` 和 `setTimeout` 同级 |
| 事件循环 | event loop | runtime scheduling | 在调用栈清空后选择队列中的任务执行 | 容易和 `for` / `while` 语句循环混淆 |
| 回调函数 | callback function | language pattern | 作为参数传入，之后由其他函数调用的函数 | 容易误以为 callback 一定异步 |
| 错误优先回调 | error-first callback | Node convention | callback 第一个参数表示错误，第二个参数表示成功值 | 容易把成功值放到第一个参数 |
| 期约 | Promise | runtime object / language API | 表示未来完成或失败的结果对象 | 容易把 Promise 对象当成成功值本身 |
| 待定 | pending | Promise state | Promise 初始状态，尚未完成 | 容易认为 pending 会一直阻塞程序 |
| 已兑现 | fulfilled | Promise state | Promise 成功完成，并保存成功值 | 容易说成 resolved 状态 |
| 已拒绝 | rejected | Promise state | Promise 失败，并保存失败原因 | 容易和 `throw` 机制混淆但二者有关联 |
| 解决函数 | resolve function | Promise executor parameter | 让 Promise 采用一个值或另一个 thenable 的状态 | 形参名可以改，但角色按位置决定 |
| 拒绝函数 | reject function | Promise executor parameter | 让 Promise 进入 rejected 状态 | 形参名可以改，但角色按位置决定 |
| 静态方法 | static method | language API | 直接挂在 `Promise` 构造函数上的方法 | 容易和 executor 形参混淆 |
| 处理器 | handler | Promise callback | 传给 `then`、`catch`、`finally` 的函数 | 容易把 handler 参数当成 `then` 返回值 |
| 异步函数 | async function | syntax / Promise mechanism | 调用后总是返回 Promise 的函数 | 容易认为返回普通值 |
| 等待表达式 | await expression | syntax / runtime mechanism | 暂停当前 async 函数后续执行，等待 Promise 结果 | 容易认为阻塞整个线程 |
| 顶层 await | top-level await | module mechanism | 在 ES module 顶层等待 Promise，影响模块依赖图 | 容易放到普通 script 或 CommonJS 中 |
| 异步迭代器 | async iterator | protocol | `next()` 返回 Promise 的迭代器 | 容易和普通 iterator 混淆 |
| 异步可迭代对象 | async iterable | protocol | 实现 `[Symbol.asyncIterator]()` 的对象 | 容易忘记返回 iterator 对象 |
| 异步生成器 | async generator | syntax / protocol | `async function*` 创建 async iterator | 容易和普通 `async function` 混淆 |

---

## 6. 本章底层模型

### 结论

异步 JavaScript 的底层模型由六个部分组成：

```txt
JavaScript engine
  -> call stack
  -> lexical environments
  -> Promise jobs
  -> host environment
  -> task queues
  -> event loop
```

### 语法、运行时、平台 API 边界

| 内容 | 属于哪一层 | 说明 |
|---|---|---|
| `function`、`() => {}` | syntax / runtime value | 创建函数对象 |
| `throw`、`try/catch` | syntax / runtime control flow | 同步错误控制流，也会影响 Promise 链 |
| `Promise` | ECMAScript built-in object | 核心 JavaScript 标准库对象 |
| `.then()`、`.catch()`、`.finally()` | Promise API | 注册 Promise reaction handler，并返回新 Promise |
| `async`、`await` | syntax / Promise mechanism | 基于 Promise 的语法层机制 |
| `for await...of` | syntax / async iteration protocol | 消费 async iterable |
| `setTimeout()` | host API | 浏览器和 Node 提供，不是 ECMAScript 语法 |
| `fetch()` | Web API / Node runtime API | 返回 Promise 的平台 API |
| file system async API | Node platform API | Node 提供的异步 I/O API |

### 总执行模型

```txt
1. script 或 module 开始执行。
2. 同步代码进入调用栈。
3. 遇到函数调用，创建新的栈帧。
4. 遇到 host API，如 setTimeout，注册未来任务后立即返回。
5. 遇到 Promise.then，注册 reaction handler，返回新 Promise。
6. 当前调用栈清空。
7. 先清空微任务队列。
8. 再取下一个任务队列任务。
9. 每个任务执行完后，再检查微任务队列。
```

### Promise 内部概念模型

一个 Promise 可以用下面的概念模型理解：

```txt
Promise object:
  [[PromiseState]]: pending | fulfilled | rejected
  [[PromiseResult]]: undefined | fulfillment value | rejection reason
  [[PromiseFulfillReactions]]: handlers registered by then
  [[PromiseRejectReactions]]: handlers registered by then/catch
```

这些内部槽不是普通属性，不能这样读取：

```js
// Goal:
// Show that Promise internal state is not exposed as normal properties.

const readyPromise = Promise.resolve('ready');

console.log(readyPromise.status);
console.log(readyPromise.value);
console.log(readyPromise.reason);
```

预期输出：

```txt
undefined
undefined
undefined
```

原因：`status`、`value`、`reason` 不是普通 Promise 实例的标准公开属性；它们是 `Promise.allSettled()` 结果对象的固定属性名。

---

## 7. 推荐目录结构

```txt
javascript-asynchronous/
  README.md
  package.json

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

## 8. 运行方式

### Node 运行普通 `.js` 示例

```bash
node 00-sync-vs-async/syncVsAsyncOrder.js
```

### Node 运行 ES module `.mjs` 示例

```bash
node 15-top-level-await/app.mjs
```

### 推荐 `package.json`

```json
{
  "name": "javascript-asynchronous-practice",
  "version": "1.0.0",
  "type": "commonjs",
  "scripts": {
    "run:sync": "node 00-sync-vs-async/syncVsAsyncOrder.js",
    "run:promise-all": "node 09-promise-combinators/promiseAllDemo.js",
    "run:module": "node 15-top-level-await/app.mjs",
    "run:project": "node 19-mini-practice-project/main.mjs"
  }
}
```

### 运行时记录要求

每次运行都记录：

```txt
command:
actual output:
expected output:
if different, explain why:
```

---

## 9. 分节教学与训练内容

---

<a id="00-sync-vs-async"></a>

## 00：同步代码和异步代码的区别

### 结论

同步代码（synchronous code）立即在当前调用栈中执行。异步代码（asynchronous code）通常先注册未来工作，当前调用栈继续执行。

### 这一节解决什么问题

解决你对“代码写在前面是不是一定先输出”的混淆。异步章节判断顺序时，不看代码缩进，不看是不是写在外层，而看这一行是“执行”还是“注册”。

### 技术意义

`setTimeout()`、DOM event、Node I/O 这类 API 会把工作交给宿主环境（host environment）。JavaScript 主线程不会停在那里等。

### 概念解释

`setTimeout(callback, delay)` 表示：

```txt
register callback with host timer
  -> return immediately
  -> after delay, callback becomes eligible to run
  -> callback waits until call stack is empty
```

### 语法、运行时、对象模型、类型系统边界

本节没有 TypeScript 类型系统内容，重点是运行时调度。`setTimeout()` 不是 ECMAScript 语法，而是宿主环境 API。

### 底层机制

`setTimeout()` 不会把回调立即推入调用栈。它注册一个 timer task。当前 script 执行结束后，事件循环才可能调度 timer callback。

### API / 语法规则

```js
setTimeout(callback, delayMs);
```

- `callback` 必须是函数。
- `delayMs` 是最小延迟，不是精确执行时间。
- `delayMs` 为 `0` 也不会打断当前同步代码。

### 固定属性名 / 固定方法名 / 参数签名

本节固定方法名是 `setTimeout`。回调参数由宿主环境决定。当前示例没有回调参数。

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

### 代码逐行解释

- `console.log('start')` 是同步调用，立即进入调用栈并输出。
- `setTimeout(() => { ... }, 0)` 调用宿主环境计时器 API。
- `() => { console.log('timer callback'); }` 创建一个箭头函数对象，这个函数现在不执行。
- `0` 表示 timer 的最小延迟。
- `setTimeout()` 注册完回调后立即返回。
- `console.log('end')` 继续同步执行。
- 当前 script 执行完，调用栈清空后，timer callback 才可能执行。

### 运行方式

```bash
node 00-sync-vs-async/syncVsAsyncOrder.js
```

### 预期输出

```txt
start
end
timer callback
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | `console.log('start')` | 同步输出 | 输出 `start` |
| 2 | `setTimeout(...)` | 注册 timer callback | callback 未执行 |
| 3 | `console.log('end')` | 同步输出 | 输出 `end` |
| 4 | script 结束 | 调用栈清空 | event loop 可调度任务 |
| 5 | timer callback | 回调进入调用栈 | 输出 `timer callback` |

### 变量和引用变化

本示例没有保存变量。箭头函数对象被 `setTimeout()` 注册到宿主环境计时器中。

### 为什么得到这个输出

因为同步代码先完整跑完，timer callback 只是被注册，并没有在 `setTimeout()` 那一行同步执行。

### 对比写法

```js
// Goal:
// Verify that direct function calls are synchronous.

console.log('start');

function printTimerMessage() {
  console.log('timer callback');
}

printTimerMessage();

console.log('end');
```

输出：

```txt
start
timer callback
end
```

区别：`printTimerMessage()` 是直接函数调用；`setTimeout(printTimerMessage, 0)` 是注册未来任务。

### 常见错误为什么错

错误理解：`setTimeout(callback, 0)` 是立刻执行。
错误原因：`0` 只表示最小延迟，不表示同步调用。它仍然要等当前调用栈清空。

### 和实际项目的关系

React 中的用户事件、网络请求、定时提示、loading 状态都依赖这个“注册未来工作”的模型。

### 和当前学习主线的关系

这是 Promise、`await`、异步迭代之前最基础的调度模型。

### 最终记忆模型

```txt
Direct call:
  run now.

setTimeout callback:
  register now, run later.
```

---

<a id="01-callback-basics"></a>

## 01：回调函数基础

### 结论

回调函数（callback function）是作为参数传入另一个函数，并由那个函数调用的函数。callback 不一定异步。

### 这一节解决什么问题

解决“传函数”和“调用函数”的混淆。

### 技术意义

JavaScript 函数是一等值（first-class value）。它可以像字符串、对象一样被变量保存、作为参数传递、作为返回值返回。

### 概念解释

```txt
function value:
  createShortOrderLabel

function call result:
  createShortOrderLabel(42)
```

前者是函数本身，后者是调用后的返回值。

### 语法、运行时、对象模型、类型系统边界

本节重点是语言机制：函数值传递和函数调用。没有异步调度，也没有 Promise。

### 底层机制

函数调用时，实参按位置绑定给形参。形参名本身不决定值的类型；传入的值决定它是什么。

### API / 语法规则

本节没有新 API，重点是函数作为值。

### 固定属性名 / 固定方法名 / 参数签名

当前示例函数签名：

```txt
formatOrderLabel(orderId, labelBuilder)
```

其中 `labelBuilder` 应该接收一个函数。

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

### 代码逐行解释

- `function formatOrderLabel(orderId, labelBuilder) { ... }` 定义函数，函数体暂时不执行。
- `orderId` 是第一个形参。
- `labelBuilder` 是第二个形参，预期接收一个函数。
- `const labelText = labelBuilder(orderId);` 调用 `labelBuilder` 引用的函数。
- `function createShortOrderLabel(orderId) { ... }` 定义另一个函数。
- `formatOrderLabel(42, createShortOrderLabel)` 调用外层函数。
- `42` 绑定给 `orderId`。
- `createShortOrderLabel` 这个函数值绑定给 `labelBuilder`。
- `labelBuilder(orderId)` 等价于 `createShortOrderLabel(42)`。
- `createShortOrderLabel(42)` 返回 `'#42'`。
- `formatOrderLabel()` 返回 `'Order: #42'`。
- `console.log(orderLabel)` 输出最终字符串。

### 运行方式

```bash
node 01-callback-basics/synchronousCallbackDemo.js
```

### 预期输出

```txt
Order: #42
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | 定义两个函数 | 创建函数对象 | 尚未调用 |
| 2 | 调用 `formatOrderLabel` | 绑定参数 | `orderId = 42` |
| 3 | 传入函数值 | `labelBuilder = createShortOrderLabel` | callback 已绑定 |
| 4 | 调用 `labelBuilder(orderId)` | 执行 callback | 返回 `#42` |
| 5 | 外层函数返回 | 拼接字符串 | `Order: #42` |
| 6 | 输出 | 打印结果 | `Order: #42` |

### 变量和引用变化

`labelBuilder` 和 `createShortOrderLabel` 引用同一个函数对象。

### 为什么得到这个输出

因为 callback 是同步调用的。外层函数执行到 `labelBuilder(orderId)` 时，立刻调用传入函数。

### 对比写法

错误写法：

```js
// Goal:
// Show the mistake of passing a callback call result.

function formatOrderLabel(orderId, labelBuilder) {
  const labelText = labelBuilder(orderId);
  return `Order: ${labelText}`;
}

function createShortOrderLabel(orderId) {
  return `#${orderId}`;
}

const orderLabel = formatOrderLabel(42, createShortOrderLabel(42));

console.log(orderLabel);
```

错误原因：`createShortOrderLabel(42)` 先执行，返回字符串 `'#42'`。于是 `labelBuilder` 变成字符串，不是函数。后面执行 `labelBuilder(orderId)` 会抛出 `TypeError`。

### 常见错误为什么错

错误理解：参数名叫 `callback` 或 `labelBuilder`，它就一定是函数。
正确规则：形参只是变量名；调用时传入函数值，它才是函数。

### 和实际项目的关系

数组方法、事件处理、Node 回调、React 事件 handler 都建立在函数值传递上。

### 和当前学习主线的关系

异步回调、Promise handler、async iterator 都离不开“函数可以被保存并稍后调用”。

### 最终记忆模型

```txt
callback = function value passed into another function.
callback() = calling that function value.
```

---

<a id="02-async-callback-order"></a>

## 02：异步回调和执行顺序

### 结论

异步回调（asynchronous callback）不会在注册时执行，而是在未来某个时间点由宿主环境和事件循环调度执行。

### 这一节解决什么问题

解决“外层代码、内部回调、后续同步代码到底谁先执行”的问题。

### 技术意义

实际前端里，用户点击、输入、网络请求完成、动画结束都是异步回调。判断顺序的关键是：注册回调不等于调用回调。

### 概念解释

```txt
register callback:
  setTimeout(() => {...}, 1000)

call callback:
  event loop later puts callback on call stack
```

### 语法、运行时、对象模型、类型系统边界

本节仍是运行时调度，不涉及 TypeScript。

### 底层机制

`setTimeout` 把回调交给宿主环境计时。计时到期后，回调进入任务队列。调用栈清空后，事件循环把它放入调用栈执行。

### API / 语法规则

```js
setTimeout(callback, delayMs);
setInterval(callback, intervalMs);
clearInterval(intervalId);
```

`setInterval` 也是异步回调，只是会重复调度，直到被清除。

### 固定属性名 / 固定方法名 / 参数签名

本节固定方法名：`setTimeout`、`setInterval`、`clearInterval`。

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
  }, 1000);

  console.log('render scheduled');
}

scheduleReportRender('Revenue');
console.log('script finished');
```

### 代码逐行解释

- `function scheduleReportRender(reportTitle) { ... }` 定义函数。
- `scheduleReportRender('Revenue')` 调用函数，`reportTitle = 'Revenue'`。
- `setTimeout(() => { ... }, 1000)` 创建箭头函数并注册给 timer。
- 箭头函数形成闭包（closure），保存对 `reportTitle` 的访问能力。
- timer callback 不立即执行。
- `console.log('render scheduled')` 在当前函数调用中同步输出。
- `scheduleReportRender` 返回。
- `console.log('script finished')` 继续同步输出。
- 大约 1000ms 后，timer callback 执行，输出 `render: Revenue`。

### 运行方式

```bash
node 02-async-callback-order/asyncCallbackOrder.js
```

### 预期输出

```txt
render scheduled
script finished
render: Revenue
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | 调用 `scheduleReportRender` | 创建函数栈帧 | `reportTitle = 'Revenue'` |
| 2 | 执行 `setTimeout` | 注册 timer callback | callback 未执行 |
| 3 | 输出 scheduled | 同步输出 | `render scheduled` |
| 4 | 函数返回 | 栈帧结束，但闭包保留需要的值 | `reportTitle` 可被 callback 访问 |
| 5 | 输出 finished | 同步输出 | `script finished` |
| 6 | 计时器到期 | callback 进入任务队列 | 等调用栈空 |
| 7 | 执行 callback | 读取闭包中的 `reportTitle` | `render: Revenue` |

### 变量和引用变化

`reportTitle` 是函数调用时的局部绑定。timer callback 闭包保留对它的访问，所以函数返回后 callback 仍可读取它。

### 为什么得到这个输出

因为 `setTimeout` 是注册动作，后面的同步代码不会等 timer callback 完成。

### 对比写法

```js
// Goal:
// Verify that setInterval repeatedly schedules callbacks.

let tickCount = 0;

const intervalId = setInterval(() => {
  tickCount += 1;
  console.log(`tick:${tickCount}`);

  if (tickCount === 3) {
    clearInterval(intervalId);
  }
}, 100);

console.log('interval registered');
```

预期输出：

```txt
interval registered
tick:1
tick:2
tick:3
```

### 常见错误为什么错

错误理解：异步回调就是 `setTimeout`。
正确规则：`setTimeout`、`setInterval`、DOM event、I/O callback 都可以产生异步回调。

### 和实际项目的关系

请求完成后的渲染、定时刷新 dashboard、用户事件响应都依赖异步回调顺序。

### 和当前学习主线的关系

Promise 也是“注册未来处理函数”，但 Promise handler 进入的是微任务队列。

### 最终记忆模型

```txt
register callback now.
run callback later.
```

---

<a id="03-error-first-callback"></a>

## 03：错误优先回调

### 结论

错误优先回调（error-first callback）约定把错误放第一个参数，成功值放第二个参数：

```js
callback(error, data);
```

### 这一节解决什么问题

解决异步操作无法用普通 `return` 直接返回未来结果的问题，以及失败和成功如何通过同一个 callback 传回来。

### 技术意义

Node 早期 API 大量使用 error-first callback。它让调用者固定先判断错误，再使用成功值。

### 概念解释

```txt
failure:
  callback(errorObject, null)

success:
  callback(null, dataObject)
```

顺序不能乱，因为 JavaScript 函数参数按位置绑定。

### 语法、运行时、对象模型、类型系统边界

这是 Node 约定，不是 JavaScript 语法强制。JavaScript 不会自动检查第一个参数是不是错误对象。

### 底层机制

异步操作完成后，内部代码手动调用 callback。callback 的形参根据调用时传入的实参按位置绑定。

### API / 语法规则

```txt
callback(error, data)
```

- 第一个参数表示错误。
- 第二个参数表示成功值。
- 成功时第一个参数通常传 `null`。
- 失败时第二个参数通常传 `null`。

### 固定属性名 / 固定方法名 / 参数签名

`Error` 对象常用属性：

```txt
message
name
stack
```

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

### 代码逐行解释

- `readUserRecord(userId, callback)` 定义函数。
- `callback` 是第二个形参，调用时会接收一个函数值。
- `setTimeout(() => { ... }, 10)` 注册异步 timer callback。
- `if (userId <= 0)` 判断业务输入是否合法。
- `callback(new Error('Invalid user id'), null)` 表示失败。
- `return` 防止失败后继续执行成功分支。
- `callback(null, { id: userId, name: 'Ada' })` 表示成功。
- `readUserRecord(7, (readError, userRecord) => { ... })` 调用时传入 `7` 和一个箭头函数。
- 在成功分支里，`readError = null`，`userRecord = { id: 7, name: 'Ada' }`。
- `readError !== null` 为 `false`。
- `console.log(userRecord.name)` 输出 `Ada`。

### 运行方式

```bash
node 03-error-first-callback/errorFirstCallbackDemo.js
```

### 预期输出

```txt
Ada
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | 调用 `readUserRecord` | 绑定参数 | `userId = 7` |
| 2 | 注册 timer | callback 未执行 | 等待 10ms |
| 3 | timer callback 执行 | 检查 `userId` | `7 <= 0` 是 false |
| 4 | 调用 callback | 传入成功结果 | `readError = null` |
| 5 | 执行用户 callback | 读取成功数据 | `userRecord.name = 'Ada'` |
| 6 | 输出 | 打印名字 | `Ada` |

### 变量和引用变化

`callback` 引用调用时传入的箭头函数。`userRecord` 是 callback 执行时创建的形参绑定，指向成功结果对象。

### 为什么得到这个输出

因为 `userId` 是合法值，异步完成后走成功分支，第二个参数把用户对象传给 `userRecord`。

### 对比写法

错误：

```js
// Goal:
// Show the mistake of omitting return after an error callback.

function readUserRecord(userId, callback) {
  setTimeout(() => {
    if (userId <= 0) {
      callback(new Error('Invalid user id'), null);
    }

    callback(null, { id: userId, name: 'Ada' });
  }, 10);
}

readUserRecord(0, (readError, userRecord) => {
  if (readError !== null) {
    console.error(readError.message);
    return;
  }

  console.log(userRecord.name);
});
```

错误原因：`userId <= 0` 时先调用失败 callback，但没有 `return`，后面又调用成功 callback，导致 callback 被调用两次。

### 常见错误为什么错

错误一：成功时写 `callback(data)`。
原因：调用者的第一个形参会接收 `data`，误以为它是错误。

错误二：把 `callback` 当成功数据。
原因：`callback` 是接收异步结果的函数，成功数据是调用 `callback(null, data)` 时的第二个实参。

### 和实际项目的关系

很多 Node 老 API 和第三方库仍然有 callback 风格。理解它有助于把 callback API 包装成 Promise。

### 和当前学习主线的关系

Promise 的 `resolve(data)` / `reject(error)` 就是把 error-first callback 的两条通道拆开。

### 最终记忆模型

```txt
callback(error, data)

success:
  callback(null, data)

failure:
  callback(error, null)
```

---

<a id="04-callback-nesting"></a>

## 04：回调嵌套和控制流问题

### 结论

回调嵌套（callback nesting）的问题不是“代码难看”这么简单，而是错误处理、执行顺序、结果组合、提前返回都变得难管理。

### 这一节解决什么问题

解决为什么 JavaScript 后来需要 Promise：Promise 不是为了替代函数，而是为了结构化异步控制流。

### 技术意义

当多个异步步骤有依赖关系时，callback 会嵌套多层；当多个异步任务可以并发时，callback 又需要手动计数和收集结果。Promise 提供统一状态和链式传播。

### 概念解释

```txt
callback nesting:
  asyncA(() => {
    asyncB(() => {
      asyncC(() => {
        ...
      });
    });
  });
```

### 语法、运行时、对象模型、类型系统边界

本节没有新语法，重点是控制流结构缺陷。

### 底层机制

每个异步回调都在未来单独执行。外层函数早已返回，不能用普通 `return` 把内层异步结果返回给外层调用者。

### API / 语法规则

本节没有新 API。

### 固定属性名 / 固定方法名 / 参数签名

本节没有固定属性名。

### 文件结构

```txt
04-callback-nesting/
  callbackNestingDemo.js
```

### `callbackNestingDemo.js`

```js
// Goal:
// Verify why nested callbacks make control flow harder to manage.

function loadCustomer(customerId, callback) {
  setTimeout(() => {
    callback(null, { id: customerId, name: 'Ada' });
  }, 10);
}

function loadOrders(customerId, callback) {
  setTimeout(() => {
    callback(null, [{ id: 1, total: 120 }]);
  }, 10);
}

function loadInvoice(orderId, callback) {
  setTimeout(() => {
    callback(null, { orderId, status: 'paid' });
  }, 10);
}

loadCustomer(7, (customerError, customerRecord) => {
  if (customerError !== null) {
    console.error(customerError.message);
    return;
  }

  loadOrders(customerRecord.id, (orderError, orderList) => {
    if (orderError !== null) {
      console.error(orderError.message);
      return;
    }

    loadInvoice(orderList[0].id, (invoiceError, invoiceRecord) => {
      if (invoiceError !== null) {
        console.error(invoiceError.message);
        return;
      }

      console.log(`${customerRecord.name}:${invoiceRecord.status}`);
    });
  });
});
```

### 代码逐行解释

- 三个 `load...` 函数都使用 `setTimeout` 模拟异步操作。
- 每个函数通过 error-first callback 返回结果。
- `loadCustomer(7, ...)` 注册第一个异步任务。
- customer callback 执行后，才能读取 `customerRecord.id`。
- `loadOrders(customerRecord.id, ...)` 在第一个 callback 内部启动。
- order callback 执行后，才能读取 `orderList[0].id`。
- `loadInvoice(orderList[0].id, ...)` 在第二个 callback 内部启动。
- 最内层 callback 执行时，同时依赖 `customerRecord`、`orderList`、`invoiceRecord`。
- 这些变量通过闭包跨异步阶段被访问。

### 运行方式

```bash
node 04-callback-nesting/callbackNestingDemo.js
```

### 预期输出

```txt
Ada:paid
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | 调用 `loadCustomer` | 注册第一个 timer | customer 未加载 |
| 2 | customer callback | 得到客户对象 | `customerRecord.id = 7` |
| 3 | 调用 `loadOrders` | 注册第二个 timer | orders 未加载 |
| 4 | order callback | 得到订单数组 | `orderList[0].id = 1` |
| 5 | 调用 `loadInvoice` | 注册第三个 timer | invoice 未加载 |
| 6 | invoice callback | 得到发票对象 | `status = 'paid'` |
| 7 | 输出 | 拼接客户和发票状态 | `Ada:paid` |

### 变量和引用变化

每层 callback 创建自己的形参绑定。内层 callback 可以访问外层 callback 的局部变量，这是闭包机制。

### 为什么得到这个输出

三个任务是串行依赖：订单依赖客户 ID，发票依赖订单 ID，所以必须等前一个 callback 完成后再启动下一个。

### 对比写法

Promise 链可以把嵌套改成扁平链：

```js
// Goal:
// Show the promise chain shape for dependent async steps.

function loadCustomer(customerId) {
  return Promise.resolve({ id: customerId, name: 'Ada' });
}

function loadOrders(customerId) {
  return Promise.resolve([{ id: 1, total: 120, customerId }]);
}

function loadInvoice(orderId) {
  return Promise.resolve({ orderId, status: 'paid' });
}

loadCustomer(7)
  .then((customerRecord) => {
    return loadOrders(customerRecord.id).then((orderList) => {
      return { customerRecord, orderList };
    });
  })
  .then(({ customerRecord, orderList }) => {
    return loadInvoice(orderList[0].id).then((invoiceRecord) => {
      return { customerRecord, invoiceRecord };
    });
  })
  .then(({ customerRecord, invoiceRecord }) => {
    console.log(`${customerRecord.name}:${invoiceRecord.status}`);
  });
```

### 常见错误为什么错

错误理解：callback 嵌套只是格式不好看。
正确理解：它让错误处理分散在每层，结果传递依赖闭包，多个任务组合困难。

### 和实际项目的关系

真实项目中，登录、加载用户信息、加载权限、加载 dashboard 数据容易形成多层依赖。Promise 和 `async` / `await` 用来组织这种流程。

### 和当前学习主线的关系

下一节开始进入 Promise，它的核心价值就是给异步结果一个对象模型和状态传播规则。

### 最终记忆模型

```txt
callback nesting problem:
  error handling scattered
  result passing indirect
  control flow hard to compose
```

---

<a id="05-promise-state"></a>

## 05：Promise 的状态模型

### 结论

期约（Promise）是表示未来结果的对象。它本身不是结果，而是一个有状态的结果容器。

Promise 有三种状态：

```txt
pending
fulfilled
rejected
```

### 这一节解决什么问题

解决“Promise 是不是异步结果本身”的混淆。

### 技术意义

Promise 把异步结果变成一个可组合对象。你可以把它返回、传参、放进数组、用 `then` 注册成功处理，用 `catch` 注册失败处理。

### 概念解释

```txt
Promise object:
  now: pending
  later: fulfilled with value
  or: rejected with reason
```

### 语法、运行时、对象模型、类型系统边界

Promise 是 ECMAScript 标准内置对象。Promise 状态是运行时内部状态，不是普通可枚举属性。

### 底层机制

Promise 创建后保存状态和 reaction list。`.then()` 不直接取结果，而是注册处理器；状态改变后处理器以微任务执行。

### API / 语法规则

```js
Promise.resolve(value);
Promise.reject(reason);
promise.then(onFulfilled, onRejected);
promise.catch(onRejected);
```

### 固定属性名 / 固定方法名 / 参数签名

Promise 状态名固定是：`pending`、`fulfilled`、`rejected`。但这些不是普通属性。

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
    resolve({ id: 101, name: 'Ada' });
  }, 1000);
});

console.log(profilePromise instanceof Promise);

profilePromise.then((profileRecord) => {
  console.log(profileRecord.name);
});

console.log('promise handler registered');
```

### 代码逐行解释

- `new Promise((resolve) => { ... })` 创建 Promise 对象。
- executor 函数会立即同步执行。
- `resolve` 是 executor 的第一个形参，绑定到 Promise 构造函数提供的成功解决函数。
- `setTimeout(() => { ... }, 1000)` 注册未来任务。
- `resolve({ id: 101, name: 'Ada' })` 在未来调用，把对象作为成功值。
- `profilePromise` 保存 Promise 对象，不保存用户对象本身。
- `profilePromise instanceof Promise` 检查原型链，输出 `true`。
- `profilePromise.then((profileRecord) => { ... })` 注册成功处理器。
- `profileRecord` 是 then 回调的形参，未来绑定到成功值对象。
- `console.log('promise handler registered')` 是同步输出。

### 运行方式

```bash
node 05-promise-state/promiseStateDemo.js
```

### 预期输出

```txt
true
promise handler registered
Ada
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | `new Promise` | 创建 Promise，executor 立即执行 | state = pending |
| 2 | `setTimeout` | 注册 timer | result 未产生 |
| 3 | `instanceof` | 同步检查对象类型 | 输出 `true` |
| 4 | `.then(...)` | 注册 fulfilled handler | handler 未执行 |
| 5 | 同步输出 | 输出注册完成 | `promise handler registered` |
| 6 | timer callback | 调用 `resolve` | result = profile object |
| 7 | Promise fulfilled | then handler 进入微任务 | `profileRecord` 准备绑定 |
| 8 | then handler | 读取 `name` | 输出 `Ada` |

### 变量和引用变化

`profilePromise` 指向 Promise 对象。`profileRecord` 在 then 回调执行时，指向 `resolve()` 传入的成功值对象。

### 为什么得到这个输出

因为 Promise 创建和 then 注册是同步的，但 then handler 要等 Promise fulfilled 后以微任务执行。

### 对比写法

错误写法：

```js
// Goal:
// Show that a Promise object is not the fulfilled value itself.

const profilePromise = Promise.resolve({ id: 101, name: 'Ada' });

console.log(profilePromise.name);
```

输出：

```txt
undefined
```

原因：`name` 是成功值对象的属性，不是 Promise 对象的属性。

### 常见错误为什么错

错误理解：`Promise<{ name: 'Ada' }>` 就是 `{ name: 'Ada' }`。
正确理解：Promise 是包装未来值的对象，要用 `.then` 或 `await` 拿成功值。

### 和实际项目的关系

`fetch()` 返回 Promise，不直接返回 JSON。你必须 `await response.json()` 或 `.then(...)`。

### 和当前学习主线的关系

后面的 `.then()` 返回值、`Promise.all()`、`async function` 全部建立在 Promise 状态模型上。

### 最终记忆模型

```txt
Promise is not the value.
Promise is the container for a future value.
```

---

<a id="06-promise-constructor"></a>

## 06：Promise 构造函数和 executor

### 结论

`new Promise(executor)` 会创建一个 pending Promise，并立即同步执行 executor。executor 的第一个参数是成功解决函数，第二个参数是失败拒绝函数。

### 这一节解决什么问题

解决 `resolve` / `reject` 的来源，以及 `Promise.resolve()` 和 executor 里的 `resolve` 是否一样的问题。

### 技术意义

`new Promise` 适合把 callback、timer、I/O 这类“未来才完成”的操作包装成 Promise。

### 概念解释

```txt
Promise.resolve(value):
  static method on Promise constructor.

resolve inside executor:
  parameter supplied by Promise constructor.
```

### 语法、运行时、对象模型、类型系统边界

`Promise.resolve` 是静态方法名，不能改。executor 里的 `resolve` 是形参名，可以改，但不建议。

### 底层机制

`new Promise(executor)` 内部会创建 `resolveFunction` 和 `rejectFunction`，然后同步调用：

```txt
executor(resolveFunction, rejectFunction)
```

### API / 语法规则

```js
new Promise((resolve, reject) => {
  resolve(value);
  reject(reason);
});

Promise.resolve(value);
Promise.reject(reason);
```

### 固定属性名 / 固定方法名 / 参数签名

- `Promise.resolve` 方法名固定。
- `Promise.reject` 方法名固定。
- executor 的第一个形参名可改，但位置代表成功函数。
- executor 的第二个形参名可改，但位置代表失败函数。

### 文件结构

```txt
06-promise-constructor/
  promiseExecutorDemo.js
```

### `promiseExecutorDemo.js`

```js
// Goal:
// Verify when the Promise executor runs.

const inventoryPromise = new Promise((resolve, reject) => {
  console.log('executor runs');

  const stockCount = 5;

  if (stockCount > 0) {
    resolve({ sku: 'keyboard', stock: stockCount });
    return;
  }

  reject(new Error('Out of stock'));
});

inventoryPromise.then((inventoryRecord) => {
  console.log(inventoryRecord.stock);
});

console.log('handler registered');
```

### 代码逐行解释

- `new Promise((resolve, reject) => { ... })` 创建 Promise，并立即执行 executor。
- `resolve` 和 `reject` 是形参名，分别绑定成功函数和失败函数。
- `console.log('executor runs')` 同步输出。
- `const stockCount = 5` 创建局部变量。
- `if (stockCount > 0)` 判断成功条件。
- `resolve({ sku: 'keyboard', stock: stockCount })` 尝试把 Promise 变成 fulfilled。
- `return` 结束 executor，避免继续执行 `reject`。
- `.then(...)` 注册成功处理器。
- `console.log('handler registered')` 同步输出。
- then handler 在微任务阶段输出库存。

### 运行方式

```bash
node 06-promise-constructor/promiseExecutorDemo.js
```

### 预期输出

```txt
executor runs
handler registered
5
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | `new Promise` | 创建 pending Promise | executor 立即运行 |
| 2 | 输出 executor | 同步输出 | `executor runs` |
| 3 | `resolve(...)` | Promise fulfilled | result = inventory object |
| 4 | `.then(...)` | 注册 handler | handler 进入微任务等待 |
| 5 | 输出 registered | 同步输出 | `handler registered` |
| 6 | then handler | 接收成功值 | 输出 `5` |

### 变量和引用变化

`inventoryPromise` 指向 Promise 对象。成功值对象保存在 Promise 内部结果中，之后传给 `inventoryRecord`。

### 为什么得到这个输出

executor 同步执行，所以先输出 `executor runs`。then handler 异步微任务执行，所以晚于同步的 `handler registered`。

### 对比写法

```js
// Goal:
// Show that executor parameter names can change.

const orderPromise = new Promise((complete, fail) => {
  complete({ id: 1, status: 'paid' });
});

orderPromise.then((orderRecord) => {
  console.log(orderRecord.status);
});
```

输出：

```txt
paid
```

原因：`complete` 是第一个形参，按位置接收成功函数。名字可以改，但标准写法仍建议用 `resolve`。

### 常见错误为什么错

错误一：以为 executor 是异步执行。
错误原因：executor 立即同步执行；异步的是 executor 内部注册的 timer、I/O 或后续 then handler。

错误二：以为 `Promise.complete()` 可以替代 `Promise.resolve()`。
错误原因：`Promise.resolve` 是标准静态方法名，不能随意改。

### 和实际项目的关系

把老 callback API 包装成 Promise 时，需要 `new Promise((resolve, reject) => { ... })`。

### 和当前学习主线的关系

理解 executor 是后面“回调包装成 Promise”的基础。

### 最终记忆模型

```txt
Promise.resolve is a fixed static method.
resolve inside executor is a parameter name.
```

---

<a id="07-promise-chain"></a>

## 07：then、catch、finally 链式调用

### 结论

`.then()`、`.catch()`、`.finally()` 都会返回新的 Promise。新 Promise 的结果由 handler 的 `return`、`throw` 或返回的 Promise 决定。

### 这一节解决什么问题

解决“then 返回什么”和“then 回调参数是谁”的混淆。

### 技术意义

Promise chain 让异步步骤可以像数据管道一样传递结果。

### 概念解释

```txt
previousPromise.then((previousValue) => {
  return nextValue;
})

previousValue:
  from previousPromise fulfilled value.

next Promise:
  returned by then.
  fulfilled with handler return value.
```

### 语法、运行时、对象模型、类型系统边界

这是 Promise API 的运行时机制。TypeScript 中可以表达为：

```txt
Promise<T>.then((value: T) => U) -> Promise<U>
```

但本节用 JavaScript 运行时解释。

### 底层机制

`.then()` 调用时立即返回一个新 Promise。当前 Promise fulfilled 后，handler 以微任务执行。handler 的执行结果决定新 Promise 的状态。

### API / 语法规则

```js
promise.then(onFulfilled, onRejected);
promise.catch(onRejected);
promise.finally(onFinally);
```

### 固定属性名 / 固定方法名 / 参数签名

- `then` 第一个参数处理 fulfilled。
- `then` 第二个参数处理 rejected。
- `catch` 等价于只处理 rejected。
- `finally` 不接收成功值或失败原因，通常用于收尾。

### 文件结构

```txt
07-promise-chain/
  promiseChainDemo.js
```

### `promiseChainDemo.js`

```js
// Goal:
// Verify how then, catch, and finally form a Promise chain.

function loadCartTotal() {
  return Promise.resolve(120);
}

loadCartTotal()
  .then((totalAmount) => {
    console.log(`total:${totalAmount}`);
    return totalAmount * 0.1;
  })
  .then((discountAmount) => {
    console.log(`discount:${discountAmount}`);
    return discountAmount;
  })
  .catch((loadError) => {
    console.error(loadError.message);
  })
  .finally(() => {
    console.log('cart total load finished');
  });
```

### 代码逐行解释

- `loadCartTotal()` 返回 `Promise.resolve(120)`。
- 第一个 `.then(...)` 注册成功 handler，并立即返回新 Promise。
- `totalAmount` 来自前一个 Promise 的成功值 `120`。
- `return totalAmount * 0.1` 返回 `12`。
- 第一个 then 返回的新 Promise fulfilled with `12`。
- 第二个 `.then(...)` 的 `discountAmount` 接收 `12`。
- 第二个 handler 返回 `discountAmount`，即 `12`。
- `.catch(...)` 注册失败处理器；当前链没有失败，所以不执行。
- `.finally(...)` 注册收尾 handler；无论成功失败都会执行。

### 运行方式

```bash
node 07-promise-chain/promiseChainDemo.js
```

### 预期输出

```txt
total:120
discount:12
cart total load finished
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | `loadCartTotal()` | 返回 fulfilled Promise | value = 120 |
| 2 | 第一个 `then` | 注册 handler，返回 Promise B | handler 等待微任务 |
| 3 | 第二个 `then` | 注册到 Promise B | 等待 Promise B |
| 4 | `catch` | 注册错误处理 | 当前未失败 |
| 5 | `finally` | 注册收尾处理 | 等待前序完成 |
| 6 | 第一个 handler | 接收 120，返回 12 | Promise B fulfilled with 12 |
| 7 | 第二个 handler | 接收 12，返回 12 | 后续 Promise fulfilled |
| 8 | `finally` handler | 执行收尾 | 输出 finished |

### 变量和引用变化

`totalAmount` 是第一个 then handler 的形参；`discountAmount` 是第二个 then handler 的形参。它们的值由前一个 Promise 的 fulfilled value 决定。

### 为什么得到这个输出

每个 handler 返回的值会成为下一个 Promise 的成功值，然后传给下一个 `.then()`。

### 对比写法

没有 `return` 的情况：

```js
// Goal:
// Show that a then handler without return fulfills the next Promise with undefined.

Promise.resolve(120)
  .then((totalAmount) => {
    console.log(totalAmount);
  })
  .then((nextValue) => {
    console.log(nextValue);
  });
```

输出：

```txt
120
undefined
```

### 常见错误为什么错

错误理解：`.then()` 返回 handler 的普通返回值。
正确规则：`.then()` 总是返回新的 Promise；handler 的返回值变成这个新 Promise 的 fulfilled value。

### 和实际项目的关系

请求后处理数据、转换结果、统一错误处理、关闭 loading 状态，都是 Promise chain 的常见使用场景。

### 和当前学习主线的关系

这是 `async` / `await` 的底层基础。`await` 后面的代码可以理解为被放进 `.then()`。

### 最终记忆模型

```txt
then parameter:
  previous Promise value.

then return:
  new Promise.

new Promise value:
  handler return value.
```

---

<a id="08-promise-error-flow"></a>

## 08：Promise 的错误传播

### 结论

Promise chain 中，handler 里 `throw` 会让 `.then()` 返回的新 Promise 变成 rejected。后面的普通 `.then()` 会被跳过，直到遇到 `.catch()`。

### 这一节解决什么问题

解决“为什么第二个 then 不执行”和“catch 后为什么还能继续 then”的问题。

### 技术意义

Promise 把同步 `throw` 转换成异步链中的 rejected 状态，让错误可以沿链传播。

### 概念解释

```txt
then handler throws
  -> next Promise rejected
  -> skip fulfilled handlers
  -> catch handles rejection
  -> catch return value recovers chain
```

### 语法、运行时、对象模型、类型系统边界

`throw` 是 JavaScript 语句；在 Promise handler 中抛出的错误会被 Promise 机制捕获，并转换成 returned Promise 的 rejection。

### 底层机制

Promise 调用 handler 时会包一层类似 try/catch 的机制。handler 正常返回就 fulfill 下一个 Promise；handler 抛错就 reject 下一个 Promise。

### API / 语法规则

```js
promise.then(onFulfilled).catch(onRejected);
```

### 固定属性名 / 固定方法名 / 参数签名

`Error` 对象常用 `.message` 属性。

### 文件结构

```txt
08-promise-error-flow/
  promiseErrorFlowDemo.js
```

### `promiseErrorFlowDemo.js`

```js
// Goal:
// Verify how errors propagate through a Promise chain.

const httpStatus = new Promise((resolve) => {
  resolve({ state: 431, reason: 'Request Headers Fields Too Large' });
});

httpStatus
  .then((statusRecord) => {
    console.log(statusRecord.state);
    throw new Error(statusRecord.reason);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((httpStatusError) => {
    console.error(httpStatusError.message);
    return { state: 200, information: 'Request Received Successfully' };
  })
  .then((clientRecord) => {
    console.log(clientRecord.information);
  });
```

### 代码逐行解释

- `httpStatus` 是 fulfilled Promise，成功值是状态对象。
- 第一个 `.then()` 接收 `statusRecord`。
- `console.log(statusRecord.state)` 输出 `431`。
- `throw new Error(statusRecord.reason)` 抛出错误。
- 第一个 `.then()` 返回的新 Promise 变成 rejected。
- 第二个 `.then()` 只有 fulfilled handler，所以被跳过。
- `.catch()` 捕获前面的 rejection。
- `httpStatusError` 绑定到 Error 对象。
- `return { state: 200, information: ... }` 正常返回普通对象。
- `.catch()` 返回的新 Promise 变成 fulfilled。
- 最后一个 `.then()` 接收 `clientRecord` 并输出 `information`。

### 运行方式

```bash
node 08-promise-error-flow/promiseErrorFlowDemo.js
```

### 预期输出

```txt
431
Request Headers Fields Too Large
Request Received Successfully
```

### 执行过程

| 步骤 | 执行内容 | 状态变化 | 输出 |
|---|---|---|---|
| 1 | 创建 `httpStatus` | fulfilled with status object | 无 |
| 2 | 第一个 then | handler 执行 | `431` |
| 3 | `throw` | returned Promise rejected | 无 |
| 4 | 第二个 then | 被跳过 | 无 |
| 5 | catch | 捕获 Error | error message |
| 6 | catch return | chain recovered to fulfilled | 无 |
| 7 | 最后 then | 接收恢复对象 | success message |

### 变量和引用变化

`statusRecord` 指向原始成功对象。`httpStatusError` 指向 `throw` 创建的 Error 对象。`clientRecord` 指向 catch 返回的新对象。

### 为什么得到这个输出

`throw` 把链条切到 rejected 通道；`catch` 返回普通对象又把链条切回 fulfilled 通道。

### 对比写法

如果 `catch` 继续抛错：

```js
// Goal:
// Show that throwing inside catch keeps the chain rejected.

Promise.resolve('start')
  .then(() => {
    throw new Error('first failure');
  })
  .catch((firstError) => {
    console.error(firstError.message);
    throw new Error('recovery failed');
  })
  .then((value) => {
    console.log(value);
  })
  .catch((secondError) => {
    console.error(secondError.message);
  });
```

输出：

```txt
first failure
recovery failed
```

### 常见错误为什么错

错误理解：`resolve({ state: 431 })` 会自动进入 catch。
错误原因：Promise 不理解 HTTP 状态码。只有 `throw` 或 `reject` 才进入 rejected 通道。

### 和实际项目的关系

真实请求中，`fetch()` 收到 404/500 不一定自动 reject，你经常需要自己检查 `response.ok`，然后 `throw`。

### 和当前学习主线的关系

`async` / `await` 中的 `try/catch` 本质上也是处理 Promise rejection。

### 最终记忆模型

```txt
throw in then:
  next Promise rejected.

return in catch:
  chain recovered.
```

---

<a id="09-promise-combinators"></a>

## 09：Promise.all、allSettled、race、any

### 结论

Promise 静态组合方法（Promise combinator methods）用于组织多个 Promise：

```txt
Promise.all         -> all must fulfill
Promise.allSettled  -> wait for every settled result
Promise.race        -> first settled decides
Promise.any         -> first fulfilled decides
```

### 这一节解决什么问题

解决多个异步任务如何组合，以及它们返回的新 Promise 到底什么时候成功、什么时候失败。

### 技术意义

前端页面通常需要同时加载多个数据源。组合方法决定：是否要求全部成功、是否保留失败结果、是否只取最快结果。

### 概念解释

```txt
Array<Promise<T>>
  -> Promise.all
  -> Promise<Array<T>>
```

`Promise.allSettled()` 的结果对象格式固定：

```js
{ status: 'fulfilled', value: successValue }
{ status: 'rejected', reason: failureReason }
```

### 语法、运行时、对象模型、类型系统边界

这些都是 `Promise` 构造函数上的静态方法。方法名不能改。它们都返回新的 Promise。

### 底层机制

组合方法会订阅输入 iterable 中的每个 Promise，根据各自规则决定返回 Promise 的状态。

### API / 语法规则

```js
Promise.all(iterable);
Promise.allSettled(iterable);
Promise.race(iterable);
Promise.any(iterable);
```

### 固定属性名 / 固定方法名 / 参数签名

- `Promise.all`、`Promise.allSettled`、`Promise.race`、`Promise.any` 方法名固定。
- `allSettled` 结果对象属性名固定为 `status`、`value`、`reason`。
- `Promise.any` 全部失败时 rejected reason 是 `AggregateError`。

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

### 代码逐行解释

- `loadMetric()` 返回 fulfilled Promise。
- `Promise.all([...])` 接收一个数组，数组元素是 Promise。
- 外层 `[]` 是数组容器。
- 每个 `loadMetric(...)` 是 Promise。
- `Promise.all([...])` 返回新的 Promise。
- 这个新 Promise 成功后的值是结果数组。
- `.then((metricList) => { ... })` 中的 `metricList` 绑定到结果数组。
- `map()` 提取每个结果对象的 `label`。
- `join(',')` 把标签数组拼成字符串。

### 运行方式

```bash
node 09-promise-combinators/promiseAllDemo.js
```

### 预期输出

```txt
views,orders,refunds
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | 三次 `loadMetric` | 创建三个 fulfilled Promise | 输入数组元素是 Promise |
| 2 | `Promise.all` | 返回新 Promise | 等所有输入 fulfilled |
| 3 | `.then` | 注册 handler | handler 未同步执行 |
| 4 | all fulfilled | 生成结果数组 | `metricList` 准备绑定 |
| 5 | then handler | 读取 labels | 输出字符串 |

### 变量和引用变化

输入数组是 `Array<Promise<MetricRecord>>`。`metricList` 是 `Array<MetricRecord>`。

### 为什么得到这个输出

`Promise.all` 等三个 Promise 都 fulfilled，然后按输入顺序收集成功值。

### 对比写法：Promise.all 失败

```js
// Goal:
// Verify that Promise.all rejects when one input rejects.

Promise.all([
  Promise.resolve('views ready'),
  Promise.reject(new Error('orders failed')),
  Promise.resolve('refunds ready'),
])
  .then((resultList) => {
    console.log(resultList.join(','));
  })
  .catch((loadError) => {
    console.error(loadError.message);
  });
```

输出：

```txt
orders failed
```

### `promiseAllSettledDemo.js`

```js
// Goal:
// Verify that Promise.allSettled keeps both success and failure results.

const successfulTask = Promise.resolve('cache ready');
const failedTask = Promise.reject(new Error('network failed'));

Promise.allSettled([successfulTask, failedTask]).then((taskResults) => {
  console.log(taskResults[0].status);
  console.log(taskResults[0].value);
  console.log(taskResults[1].status);
  console.log(taskResults[1].reason.message);
});
```

输出：

```txt
fulfilled
cache ready
rejected
network failed
```

解释：`taskResults` 是 `allSettled` 生成的结果描述对象数组。成功项有 `value`，失败项有 `reason`。

### `promiseRaceAnyDemo.js`

```js
// Goal:
// Compare Promise.race and Promise.any.

const slowSuccess = new Promise((resolve) => {
  setTimeout(() => {
    resolve('slow success');
  }, 20);
});

const fastFailure = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('fast failure'));
  }, 10);
});

Promise.race([slowSuccess, fastFailure]).catch((raceError) => {
  console.log(`race:${raceError.message}`);
});

Promise.any([slowSuccess, fastFailure]).then((firstSuccess) => {
  console.log(`any:${firstSuccess}`);
});
```

输出：

```txt
race:fast failure
any:slow success
```

解释：`race` 采用第一个 settled 的结果，所以先失败；`any` 忽略失败，等待第一个 fulfilled。

### 对比表

| 方法 | 返回值本身 | fulfilled 条件 | fulfilled value | rejected 条件 | rejected reason |
|---|---|---|---|---|---|
| `Promise.all()` | 新 Promise | 所有输入 fulfilled | 成功值数组 | 任意输入 rejected | 第一个失败原因 |
| `Promise.allSettled()` | 新 Promise | 所有输入 settled | 结果描述对象数组 | 通常不因输入 rejected 而 rejected | 特殊输入错误 |
| `Promise.race()` | 新 Promise | 第一个 settled 是 fulfilled | 第一个 settled 的成功值 | 第一个 settled 是 rejected | 第一个 settled 的失败原因 |
| `Promise.any()` | 新 Promise | 第一个输入 fulfilled | 第一个成功值 | 所有输入 rejected | `AggregateError` |

### 常见错误为什么错

错误一：以为 `Promise.all` 返回数组。
正确规则：它返回 Promise；成功值才是数组。

错误二：以为 `allSettled` 的 `status` 是 Promise 自带属性。
正确规则：`status` 是 `allSettled` 结果对象属性，不是普通 Promise 实例属性。

错误三：以为 `race` 等第一个成功。
正确规则：`race` 等第一个 settled，成功或失败都算。

### 和实际项目的关系

- `Promise.all`：页面必须等用户、权限、配置全部成功。
- `Promise.allSettled`：多个模块独立加载，失败也要展示局部错误。
- `Promise.race`：超时控制、最快响应选择。
- `Promise.any`：多个镜像源，取第一个成功结果。

### 和当前学习主线的关系

这是从单个 Promise 进入多个 Promise 组合的关键节点。

### 最终记忆模型

```txt
all:
  all fulfill or reject fast.

allSettled:
  collect every result.

race:
  first settled wins.

any:
  first fulfilled wins.
```

---

<a id="10-promisify-callback"></a>

## 10：把回调 API 包装成 Promise

### 结论

把回调 API 包装成 Promise，就是在 `new Promise` 里调用旧 callback API，并在 callback 中根据错误或成功值调用 `reject` 或 `resolve`。

### 这一节解决什么问题

解决老式 error-first callback 如何进入 Promise / `async` / `await` 流程。

### 技术意义

很多 Node API、第三方库、旧项目代码仍是 callback 风格。包装成 Promise 后可以用 `.then()`、`.catch()`、`await` 组合。

### 概念解释

```txt
callback(error, data)
  -> if error: reject(error)
  -> else: resolve(data)
```

### 语法、运行时、对象模型、类型系统边界

本节重点是运行时桥接：callback convention 到 Promise 状态模型。

### 底层机制

`new Promise` 的 executor 立即执行，但它内部调用的 callback API 可能未来才完成。完成时调用 `resolve` 或 `reject` 改变 Promise 状态。

### API / 语法规则

```js
new Promise((resolve, reject) => {
  oldApi((error, data) => {
    if (error !== null) {
      reject(error);
      return;
    }

    resolve(data);
  });
});
```

### 固定属性名 / 固定方法名 / 参数签名

- error-first callback 签名：`callback(error, data)`。
- Promise executor 签名：`(resolve, reject) => {}`。

### 文件结构

```txt
10-promisify-callback/
  callbackToPromiseDemo.js
```

### `callbackToPromiseDemo.js`

```js
// Goal:
// Convert an error-first callback API into a Promise API.

function readUserRecord(userId, callback) {
  setTimeout(() => {
    if (userId <= 0) {
      callback(new Error('Invalid user id'), null);
      return;
    }

    callback(null, { id: userId, name: 'Ada' });
  }, 10);
}

function readUserRecordAsync(userId) {
  return new Promise((resolve, reject) => {
    readUserRecord(userId, (readError, userRecord) => {
      if (readError !== null) {
        reject(readError);
        return;
      }

      resolve(userRecord);
    });
  });
}

readUserRecordAsync(7)
  .then((userRecord) => {
    console.log(userRecord.name);
  })
  .catch((readError) => {
    console.error(readError.message);
  });
```

### 代码逐行解释

- `readUserRecord` 是旧 callback API。
- `readUserRecordAsync` 返回一个 Promise。
- `new Promise((resolve, reject) => { ... })` 创建 Promise。
- executor 立即执行，并调用 `readUserRecord`。
- `readUserRecord` 内部注册 timer，未来调用 callback。
- 如果 `readError !== null`，调用 `reject(readError)`。
- 如果成功，调用 `resolve(userRecord)`。
- 外部调用 `.then()` 处理成功，`.catch()` 处理失败。

### 运行方式

```bash
node 10-promisify-callback/callbackToPromiseDemo.js
```

### 预期输出

```txt
Ada
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | 调用 `readUserRecordAsync(7)` | 创建 Promise | state = pending |
| 2 | executor 调用 callback API | 注册 timer | Promise 未完成 |
| 3 | `.then` / `.catch` | 注册 handlers | 等待 Promise |
| 4 | timer callback | 成功调用旧 callback | `userRecord = { id: 7, name: 'Ada' }` |
| 5 | `resolve(userRecord)` | Promise fulfilled | value = user record |
| 6 | then handler | 输出名字 | `Ada` |

### 变量和引用变化

旧 callback 的 `userRecord` 通过 `resolve(userRecord)` 进入 Promise 成功通道，再传给 then handler。

### 为什么得到这个输出

因为 `userId = 7` 合法，旧 API 走成功分支，包装 Promise 被 resolve。

### 对比写法

错误：

```js
// Goal:
// Show the mistake of resolving and rejecting the same Promise path.

function readUserRecordAsync(userId) {
  return new Promise((resolve, reject) => {
    readUserRecord(userId, (readError, userRecord) => {
      if (readError !== null) {
        reject(readError);
      }

      resolve(userRecord);
    });
  });
}
```

错误原因：缺少 `return`。失败时先 `reject`，随后又执行 `resolve`。Promise 状态只会第一次改变，但这种代码表达错误，容易隐藏逻辑 bug。

### 常见错误为什么错

错误理解：包装 Promise 时可以 `return userRecord`。
正确规则：callback 是未来执行的，外层 executor 里的普通 `return` 不能把未来结果返回给 Promise；必须调用 `resolve(userRecord)`。

### 和实际项目的关系

真实项目中可以把旧 Node callback、浏览器 callback、第三方 SDK callback 包装成 Promise。

### 和当前学习主线的关系

这是从 callback 进入 `async` / `await` 的桥梁。

### 最终记忆模型

```txt
callback success:
  resolve(data)

callback failure:
  reject(error)
```

---

<a id="11-async-function-return"></a>

## 11：async function 的返回值

### 结论

异步函数（async function）调用后总是返回 Promise。即使函数体里 `return` 普通值，调用结果也是 fulfilled Promise。

### 这一节解决什么问题

解决“async 函数是不是直接返回普通值”的混淆。

### 技术意义

`async` 让你用更接近同步的写法组织 Promise，但不会改变它基于 Promise 的本质。

### 概念解释

```txt
async function returns value
  -> caller receives Promise fulfilled with value

async function throws error
  -> caller receives Promise rejected with error
```

### 语法、运行时、对象模型、类型系统边界

`async` 是语法关键字。运行时返回 Promise。

### 底层机制

调用 async function 会立即返回 Promise。函数内部正常返回值会 resolve 这个 Promise；内部抛错会 reject 这个 Promise。

### API / 语法规则

```js
async function functionName() {
  return value;
}
```

### 固定属性名 / 固定方法名 / 参数签名

本节没有固定属性名。

### 文件结构

```txt
11-async-function-return/
  asyncFunctionReturnDemo.js
```

### `asyncFunctionReturnDemo.js`

```js
// Goal:
// Verify that an async function always returns a Promise.

async function loadProfileName() {
  return 'Ada';
}

const profileNamePromise = loadProfileName();

console.log(profileNamePromise instanceof Promise);

profileNamePromise.then((profileName) => {
  console.log(profileName);
});
```

### 代码逐行解释

- `async function loadProfileName() { ... }` 定义异步函数。
- `return 'Ada'` 在 async function 内部返回普通字符串。
- `loadProfileName()` 调用后，不直接返回字符串，而是返回 Promise。
- `profileNamePromise instanceof Promise` 输出 `true`。
- `.then((profileName) => { ... })` 接收 Promise 的成功值。
- `profileName = 'Ada'`。

### 运行方式

```bash
node 11-async-function-return/asyncFunctionReturnDemo.js
```

### 预期输出

```txt
true
Ada
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | 调用 async function | 返回 Promise | state 最终 fulfilled |
| 2 | `return 'Ada'` | Promise fulfilled with `'Ada'` | 调用者拿到 Promise |
| 3 | `instanceof` | 同步检查 | 输出 true |
| 4 | then handler | 微任务执行 | 输出 Ada |

### 变量和引用变化

`profileNamePromise` 指向 Promise 对象。`profileName` 是 then handler 执行时绑定到成功值的形参。

### 为什么得到这个输出

因为 async function 会把普通返回值自动包装成 fulfilled Promise。

### 对比写法

```js
// Goal:
// Verify that throwing inside an async function rejects the returned Promise.

async function loadProfileName() {
  throw new Error('Profile missing');
}

loadProfileName().catch((loadError) => {
  console.error(loadError.message);
});
```

输出：

```txt
Profile missing
```

### 常见错误为什么错

错误：

```js
const profileName = loadProfileName();
console.log(profileName.toUpperCase());
```

错误原因：`profileName` 是 Promise，不是字符串。Promise 没有你想要的字符串方法。

### 和实际项目的关系

React 事件里调用 async function、Node route handler 里调用 async service，都要记住返回值是 Promise。

### 和当前学习主线的关系

下一节 `await` 是消费 Promise 的语法；本节先确认 async function 生产 Promise。

### 最终记忆模型

```txt
async function return value:
  Promise fulfilled with value.

async function throw error:
  Promise rejected with error.
```

---

<a id="12-await-mechanism"></a>

## 12：await 的真正机制

### 结论

`await` 等待一个 Promise 的完成，并暂停当前 async function 后续代码；它不会阻塞整个 JavaScript 程序。

### 这一节解决什么问题

解决“await 是不是让整个程序停住”的误解。

### 技术意义

`await` 让异步代码按顺序写，但底层仍是 Promise reaction 和微任务恢复执行。

### 概念解释

```txt
const value = await promise;

means:
  pause current async function
  wait for promise fulfilled
  bind fulfilled value to value
  continue after current stack clears
```

### 语法、运行时、对象模型、类型系统边界

`await` 只能在 async function 或 ES module 顶层使用。

### 底层机制

`await` 会把 async function 后续代码分割成 continuation。Promise fulfilled 后，continuation 进入微任务队列。

### API / 语法规则

```js
const value = await expression;
```

如果 `expression` 不是 Promise，它会被当作 fulfilled Promise 的值处理。

### 固定属性名 / 固定方法名 / 参数签名

本节没有固定属性名。

### 文件结构

```txt
12-await-mechanism/
  awaitOrderDemo.js
```

### `awaitOrderDemo.js`

```js
// Goal:
// Verify that await pauses only the current async function.

function loadProfileRecord() {
  return Promise.resolve({ id: 101, name: 'Ada' });
}

async function renderProfile() {
  console.log('render start');

  const profileRecord = await loadProfileRecord();

  console.log(profileRecord.name);
  console.log('render end');
}

renderProfile();

console.log('script end');
```

### 代码逐行解释

- `loadProfileRecord()` 返回 fulfilled Promise。
- `async function renderProfile()` 定义 async function。
- `renderProfile()` 调用后开始执行函数体，并立即返回 Promise 给调用者。
- `console.log('render start')` 同步输出。
- `await loadProfileRecord()` 调用函数并等待返回的 Promise。
- `await` 暂停 `renderProfile` 后续代码，不暂停外层 script。
- 外层继续执行 `console.log('script end')`。
- Promise fulfilled 后，`profileRecord` 绑定到成功值对象。
- 后续代码恢复执行，输出 `Ada` 和 `render end`。

### 运行方式

```bash
node 12-await-mechanism/awaitOrderDemo.js
```

### 预期输出

```txt
render start
script end
Ada
render end
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | 调用 `renderProfile()` | async function 开始 | 返回 Promise 给外层 |
| 2 | 输出 start | 同步执行 | `render start` |
| 3 | 遇到 `await` | 暂停当前 async function | continuation 注册为微任务 |
| 4 | 外层继续 | 输出 script end | `script end` |
| 5 | await 恢复 | 绑定成功值 | `profileRecord.name = 'Ada'` |
| 6 | 输出后续 | async function 继续 | `Ada`, `render end` |

### 变量和引用变化

`profileRecord` 在 `await` 恢复后才绑定到成功值对象。恢复前这行后面的代码不会执行。

### 为什么得到这个输出

`await` 只暂停 `renderProfile`，外层 script 不等待它，除非外层也 `await renderProfile()`。

### 对比写法

```js
// Goal:
// Verify that await also works with non-Promise values.

async function printValue() {
  const value = await 42;
  console.log(value);
}

printValue();
console.log('after call');
```

输出：

```txt
after call
42
```

原因：`await 42` 等价于等待一个 fulfilled with `42` 的 Promise，恢复仍然异步。

### 常见错误为什么错

错误理解：`await` 会阻塞整个程序。
正确规则：`await` 暂停当前 async function 的后续执行，调用者继续执行，除非调用者也 await。

### 和实际项目的关系

请求数据时可以在 async function 内用同步风格写，但 UI 主线程仍可继续处理其他任务。

### 和当前学习主线的关系

这是理解 async/await 错误处理、串行/并发的核心。

### 最终记忆模型

```txt
await pauses current async function.
It does not pause the whole program.
```

---

<a id="13-async-await-error"></a>

## 13：try/catch 处理 async/await 错误

### 结论

`try/catch` 能捕获 `await` 到的 rejected Promise，前提是你真的 `await` 了那个 Promise。

### 这一节解决什么问题

解决“为什么有些异步错误 try/catch 捕不到”的问题。

### 技术意义

`async` / `await` 让 Promise rejection 可以用类似同步 `try/catch` 的结构处理，但不能跨越没有等待的异步边界。

### 概念解释

```txt
try {
  await rejectedPromise;
} catch (error) {
  handle error;
}
```

### 语法、运行时、对象模型、类型系统边界

`try/catch` 是同步控制流语法；`await` 把 Promise rejection 重新表现为当前 async function 内部的异常。

### 底层机制

`await` 的 Promise rejected 后，async function 的 continuation 会以抛出异常的方式恢复，因此可以被当前 async function 内的 `try/catch` 捕获。

### API / 语法规则

```js
try {
  const value = await promise;
} catch (error) {
  // handle rejection
}
```

### 固定属性名 / 固定方法名 / 参数签名

`Error` 常用 `.message`。

### 文件结构

```txt
13-async-await-error/
  asyncAwaitErrorDemo.js
```

### `asyncAwaitErrorDemo.js`

```js
// Goal:
// Verify that try/catch can handle a rejected Promise when awaited.

function loadPaymentStatus() {
  return Promise.reject(new Error('Payment service unavailable'));
}

async function renderPaymentStatus() {
  try {
    const paymentStatus = await loadPaymentStatus();
    console.log(paymentStatus);
  } catch (loadError) {
    console.error(loadError.message);
  }
}

renderPaymentStatus();
```

### 代码逐行解释

- `loadPaymentStatus()` 返回 rejected Promise。
- `renderPaymentStatus()` 是 async function。
- `try` 包住 `await loadPaymentStatus()`。
- `await` 等到 Promise rejected。
- rejected reason 被当作异常抛回当前 async function。
- `catch (loadError)` 捕获 Error 对象。
- `loadError.message` 输出错误消息。

### 运行方式

```bash
node 13-async-await-error/asyncAwaitErrorDemo.js
```

### 预期输出

```txt
Payment service unavailable
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | 调用 async function | 进入 try | 返回 Promise 给外层 |
| 2 | `await loadPaymentStatus()` | 得到 rejected Promise | 暂停当前函数 |
| 3 | Promise rejected | continuation 恢复为 throw | reason = Error |
| 4 | catch | 捕获错误 | 输出 message |

### 变量和引用变化

`loadError` 指向 rejected reason，也就是 `Error('Payment service unavailable')`。

### 为什么得到这个输出

因为 rejected Promise 被 `await` 了，错误传播回当前 async function 的 `try/catch`。

### 对比写法

错误：

```js
// Goal:
// Show that missing await can bypass local try/catch.

function loadPaymentStatus() {
  return Promise.reject(new Error('Payment service unavailable'));
}

async function renderPaymentStatus() {
  try {
    loadPaymentStatus();
    console.log('request started');
  } catch (loadError) {
    console.error(loadError.message);
  }
}

renderPaymentStatus();
```

问题：`loadPaymentStatus()` 返回 rejected Promise，但没有 `await`，所以 `try/catch` 不会在这里捕获 rejection。

### 常见错误为什么错

错误理解：只要函数调用写在 `try` 里，异步错误就能捕获。
正确规则：Promise rejection 必须被 `await`，或者用 `.catch()` 处理。

### 和实际项目的关系

写 fetch 请求时，`try/catch` 必须包住 `await fetch()` 和 `await response.json()`。

### 和当前学习主线的关系

这是 `async` / `await` 版本的 Promise error flow。

### 最终记忆模型

```txt
try/catch handles awaited rejection.
No await, no local catch.
```

---

<a id="14-serial-vs-concurrent"></a>

## 14：串行 await 和并行 Promise

### 结论

串行 await（serial await）会等前一个完成后才启动下一个；并发 Promise（concurrent Promise）先启动多个任务，再统一等待。

### 这一节解决什么问题

解决“代码写了两个 await，是不是两个任务同时开始”的问题。

### 技术意义

性能优化中最常见的异步问题就是不必要的串行等待。

### 概念解释

```txt
serial:
  await taskA()
  await taskB()

concurrent:
  const promiseA = taskA()
  const promiseB = taskB()
  await Promise.all([promiseA, promiseB])
```

### 语法、运行时、对象模型、类型系统边界

这是运行时执行顺序问题，不是语法本身决定全部并发。

### 底层机制

函数调用才会启动任务。`await taskA()` 会先调用 `taskA`，然后暂停当前 async function，直到 A 完成后才继续调用 `taskB`。

### API / 语法规则

```js
await promise;
Promise.all([promiseA, promiseB]);
```

### 固定属性名 / 固定方法名 / 参数签名

本节使用 `Promise.all`。

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

function delayValue(labelText, delayMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`resolved:${labelText}`);
      resolve(labelText);
    }, delayMs);
  });
}

async function loadDashboardSerially() {
  const profileLabel = await delayValue('profile', 100);
  const metricLabel = await delayValue('metrics', 100);

  console.log(`${profileLabel},${metricLabel}`);
}

loadDashboardSerially();
```

预期输出：

```txt
resolved:profile
resolved:metrics
profile,metrics
```

### `concurrentPromiseDemo.js`

```js
// Goal:
// Verify concurrent Promise startup.

function delayValue(labelText, delayMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`resolved:${labelText}`);
      resolve(labelText);
    }, delayMs);
  });
}

async function loadDashboardConcurrently() {
  const profilePromise = delayValue('profile', 100);
  const metricPromise = delayValue('metrics', 100);

  const resultList = await Promise.all([profilePromise, metricPromise]);

  console.log(resultList.join(','));
}

loadDashboardConcurrently();
```

预期输出：

```txt
resolved:profile
resolved:metrics
profile,metrics
```

两个输出看起来相似，但时间不同：并发版本两个 timer 同时启动，总耗时更短。

### 代码逐行解释

- `delayValue()` 创建 Promise，并注册 timer。
- 串行版本第一个 `await` 暂停函数，第二个任务还没启动。
- 并发版本先调用两个函数，两个 Promise 都开始计时。
- `Promise.all` 等两个 Promise 都完成。
- `resultList` 是两个成功值组成的数组。

### 执行过程

| 版本 | 步骤 | 运行时发生什么 |
|---|---|---|
| 串行 | 1 | 启动 profile |
| 串行 | 2 | 等 profile 完成 |
| 串行 | 3 | 启动 metrics |
| 串行 | 4 | 等 metrics 完成 |
| 并发 | 1 | 启动 profile |
| 并发 | 2 | 立即启动 metrics |
| 并发 | 3 | `Promise.all` 统一等待 |

### 常见错误为什么错

错误理解：只要用了 `Promise.all` 就一定并发。
正确规则：任务是否并发取决于 Promise 是否已经提前创建并启动。

### 和实际项目的关系

互不依赖的接口应该并发请求；有依赖的数据必须串行等待。

### 和当前学习主线的关系

这是使用 async/await 写性能合理代码的关键。

### 最终记忆模型

```txt
await before starting next task:
  serial.

start promises first, await together:
  concurrent.
```

---

<a id="15-top-level-await"></a>

## 15：顶层 await

### 结论

顶层 await（top-level await）允许在 ES module 顶层等待 Promise。它会影响依赖这个模块的其他模块执行顺序。

### 这一节解决什么问题

解决“为什么 await 有时能写在函数外，有时不能”的问题。

### 技术意义

模块初始化可能需要加载配置、初始化数据库连接、读取运行时数据。顶层 await 让模块能在导出值前完成异步准备。

### 概念解释

```txt
ES module top-level await:
  module execution pauses
  dependent modules wait
```

### 语法、运行时、对象模型、类型系统边界

顶层 await 只能在 ES module 中使用。`.mjs` 文件默认是 ES module。

### 底层机制

模块加载器构建依赖图。含顶层 await 的模块执行到 await 时暂停；依赖它的模块必须等它完成后才能继续执行。

### API / 语法规则

```js
const value = await promise;
export { value };
```

### 固定属性名 / 固定方法名 / 参数签名

本节没有固定属性名。

### 文件结构

```txt
15-top-level-await/
  runtimeConfig.mjs
  app.mjs
```

### `runtimeConfig.mjs` 和 `app.mjs`

`runtimeConfig.mjs`：

```js
// Goal:
// Verify top-level await in an ES module.

function loadRuntimeConfig() {
  return Promise.resolve({ mode: 'development', apiBaseUrl: '/api' });
}

export const runtimeConfig = await loadRuntimeConfig();

console.log('config module ready');
```

`app.mjs`：

```js
// Goal:
// Verify that importing module waits for top-level await.

import { runtimeConfig } from './runtimeConfig.mjs';

console.log(runtimeConfig.mode);
console.log('app ready');
```

### 代码逐行解释

- `runtimeConfig.mjs` 是 ES module。
- `loadRuntimeConfig()` 返回 Promise。
- `export const runtimeConfig = await loadRuntimeConfig();` 在模块顶层等待 Promise。
- `runtimeConfig` 绑定到成功值对象。
- `app.mjs` import 这个绑定。
- `app.mjs` 要等 `runtimeConfig.mjs` 完成顶层 await 后才能执行后续代码。

### 运行方式

```bash
node 15-top-level-await/app.mjs
```

### 预期输出

```txt
config module ready
development
app ready
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 |
|---|---|---|
| 1 | 加载 `app.mjs` | 发现依赖 `runtimeConfig.mjs` |
| 2 | 执行 `runtimeConfig.mjs` | 遇到 top-level await |
| 3 | 等待配置 Promise | 模块暂停 |
| 4 | 配置完成 | 导出 `runtimeConfig` |
| 5 | 继续 `app.mjs` | 读取导入绑定 |

### 常见错误为什么错

错误：在 CommonJS `.js` 文件中直接写顶层 await。
原因：顶层 await 是 ES module 机制，不是普通 script 机制。

### 和实际项目的关系

现代构建工具、Node ESM、Next.js 服务端模块初始化都可能涉及模块级异步。

### 和当前学习主线的关系

这是 `await` 从函数内部扩展到模块加载机制的版本。

### 最终记忆模型

```txt
top-level await pauses module execution.
dependent modules wait for it.
```

---

<a id="16-for-await-of"></a>

## 16：异步迭代 for await...of

### 结论

`for await...of` 用来消费异步可迭代对象（async iterable）。每一轮循环都会等待一次异步 `next()` 结果。

### 这一节解决什么问题

解决 Promise 只能表示单次结果，不能表示连续异步数据流的问题。

### 技术意义

流式数据、分页读取、消息队列、Node stream、实时状态更新，都需要处理一连串异步值。

### 概念解释

普通迭代器：

```txt
next() -> { value, done }
```

异步迭代器：

```txt
next() -> Promise<{ value, done }>
```

### 语法、运行时、对象模型、类型系统边界

`for await...of` 是语法；对象必须实现 async iterable protocol。

### 底层机制

每轮循环调用 async iterator 的 `next()`，然后 await 这个 Promise。fulfilled 后读取 `{ value, done }`。

### API / 语法规则

```js
for await (const item of asyncIterable) {
  // use item
}
```

### 固定属性名 / 固定方法名 / 参数签名

异步迭代协议固定方法名：

```js
Symbol.asyncIterator
next
value
done
```

### 文件结构

```txt
16-for-await-of/
  asyncIterableLoopDemo.mjs
```

### `asyncIterableLoopDemo.mjs`

```js
// Goal:
// Verify how for await...of consumes async values.

async function* createStatusStream() {
  yield 'loading';
  yield 'ready';
  yield 'complete';
}

for await (const statusText of createStatusStream()) {
  console.log(statusText);
}
```

### 代码逐行解释

- `async function* createStatusStream()` 定义异步生成器函数。
- 调用 `createStatusStream()` 返回 async generator object。
- async generator object 是 async iterable。
- `for await...of` 获取它的 async iterator。
- 每一轮调用 `next()`，等待返回的 Promise。
- `yield 'loading'` 产生第一个异步值。
- `statusText` 绑定到每轮的 `value`。
- `done: true` 时循环结束。

### 运行方式

```bash
node 16-for-await-of/asyncIterableLoopDemo.mjs
```

### 预期输出

```txt
loading
ready
complete
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | 调用 async generator | 返回 async iterator | 尚未执行函数体 |
| 2 | 第一轮 `next()` | 等待 Promise | value = loading |
| 3 | 循环体执行 | 输出 loading | statusText = loading |
| 4 | 第二轮 `next()` | 等待 Promise | value = ready |
| 5 | 第三轮 `next()` | 等待 Promise | value = complete |
| 6 | 下一轮 `next()` | done = true | 循环结束 |

### 变量和引用变化

`statusText` 每一轮绑定到不同的 `value`。

### 为什么得到这个输出

async generator 依次 yield 三个值，`for await...of` 每次等待一个异步 iterator result object。

### 对比写法

普通 `for...of` 不能直接消费只实现 async iterator 的对象。

### 常见错误为什么错

错误理解：`for await...of` 是把所有值一次性拿到数组里。
正确规则：它是一轮一轮等待 `next()`，适合连续异步值。

### 和实际项目的关系

Node readable stream、分页 API、实时消息流都可以用异步迭代模型理解。

### 和当前学习主线的关系

这是从“单次 Promise 结果”进入“连续异步结果”的关键。

### 最终记忆模型

```txt
for await...of:
  await each async next result.
```

---

<a id="17-async-generator"></a>

## 17：异步生成器 async function*

### 结论

`async function*` 定义异步生成器函数。调用它不会立即执行函数体，而是返回一个 async generator object。

### 这一节解决什么问题

解决如何自己生产一串异步值的问题。

### 技术意义

异步生成器适合封装分页、轮询、流式读取等连续异步数据来源。

### 概念解释

```txt
async function*:
  can await inside
  can yield values over time
  returns async iterator
```

### 语法、运行时、对象模型、类型系统边界

`async function*` 同时结合 async function 和 generator function 的机制。

### 底层机制

每次调用 `next()` 推进函数执行。遇到 `await` 会等待；遇到 `yield` 会把值包装成 Promise fulfilled iterator result。

### API / 语法规则

```js
async function* generatorName() {
  yield value;
}
```

### 固定属性名 / 固定方法名 / 参数签名

async generator object 有 `next()` 方法，并实现 `[Symbol.asyncIterator]()`。

### 文件结构

```txt
17-async-generator/
  asyncGeneratorDemo.mjs
```

### `asyncGeneratorDemo.mjs`

```js
// Goal:
// Verify how an async generator yields values over time.

function wait(delayMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
}

async function* createMetricStream() {
  await wait(10);
  yield { label: 'views', value: 100 };

  await wait(10);
  yield { label: 'orders', value: 12 };
}

for await (const metricRecord of createMetricStream()) {
  console.log(`${metricRecord.label}:${metricRecord.value}`);
}
```

### 代码逐行解释

- `wait(delayMs)` 返回一个指定时间后 fulfilled 的 Promise。
- `async function* createMetricStream()` 定义异步生成器。
- 调用 `createMetricStream()` 返回 async generator object，不立即执行函数体。
- `for await...of` 开始消费它。
- 第一轮 `next()` 推动函数执行到 `await wait(10)`。
- 等待完成后执行 `yield { label: 'views', value: 100 }`。
- `metricRecord` 绑定到 yield 的对象。
- 第二轮重复，产生 `orders` 对象。

### 运行方式

```bash
node 17-async-generator/asyncGeneratorDemo.mjs
```

### 预期输出

```txt
views:100
orders:12
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 |
|---|---|---|
| 1 | 创建 async generator object | 函数体未执行 |
| 2 | 第一轮 `next()` | 执行到第一个 await |
| 3 | wait 完成 | yield views |
| 4 | 循环体输出 | views:100 |
| 5 | 第二轮 `next()` | 执行到第二个 await |
| 6 | wait 完成 | yield orders |
| 7 | 循环体输出 | orders:12 |

### 常见错误为什么错

错误理解：调用 async generator 直接返回 Promise。
正确规则：调用 async generator 返回 async generator object，不是普通 Promise。

### 和实际项目的关系

可用于封装连续分页：每次请求一页，每次 `yield` 一页数据。

### 和当前学习主线的关系

它把 `await` 和 `yield` 组合起来，是异步迭代章节的核心工具。

### 最终记忆模型

```txt
async function*:
  await between values.
  yield values over time.
```

---

<a id="18-manual-async-iterable"></a>

## 18：手写异步可迭代对象

### 结论

手写异步可迭代对象必须实现 `[Symbol.asyncIterator]()`，返回一个带 `next()` 方法的对象；`next()` 必须返回 Promise，Promise 的成功值是 `{ value, done }`。

### 这一节解决什么问题

解决 async iterable protocol 的底层结构，而不是只会用 `async function*`。

### 技术意义

理解协议后，你可以看懂框架、Node stream、SDK 返回的异步数据源为什么能被 `for await...of` 消费。

### 概念解释

```txt
asyncIterable[Symbol.asyncIterator]() -> asyncIterator
asyncIterator.next() -> Promise<{ value, done }>
```

### 语法、运行时、对象模型、类型系统边界

这是对象协议（protocol），不是 class 强制接口。只要对象形状满足就可以。

### 底层机制

`for await...of` 查找对象的 `[Symbol.asyncIterator]` 方法，调用它得到 iterator，然后反复调用 `next()` 并 await 结果。

### API / 语法规则

```js
const asyncIterable = {
  [Symbol.asyncIterator]() {
    return {
      next() {
        return Promise.resolve({ value, done });
      },
    };
  },
};
```

### 固定属性名 / 固定方法名 / 参数签名

- `[Symbol.asyncIterator]`
- `next`
- `value`
- `done`

### 文件结构

```txt
18-manual-async-iterable/
  manualAsyncIterableDemo.mjs
```

### `manualAsyncIterableDemo.mjs`

```js
// Goal:
// Manually implement an async iterable object.

const statusList = ['queued', 'processing', 'complete'];

const statusStream = {
  [Symbol.asyncIterator]() {
    let currentIndex = 0;

    return {
      next() {
        if (currentIndex >= statusList.length) {
          return Promise.resolve({ value: undefined, done: true });
        }

        const statusText = statusList[currentIndex];
        currentIndex += 1;

        return Promise.resolve({ value: statusText, done: false });
      },
    };
  },
};

for await (const statusText of statusStream) {
  console.log(statusText);
}
```

### 代码逐行解释

- `statusList` 是普通数组。
- `statusStream` 是普通对象。
- `[Symbol.asyncIterator]()` 是固定协议方法。
- 方法内部创建 `currentIndex`，用于记录当前迭代位置。
- 返回的对象有 `next()` 方法。
- `next()` 每次返回 Promise。
- 如果索引越界，返回 `{ value: undefined, done: true }`。
- 如果还有值，读取当前状态，索引加一。
- 返回 `{ value: statusText, done: false }`。
- `for await...of` 消费这个对象。

### 运行方式

```bash
node 18-manual-async-iterable/manualAsyncIterableDemo.mjs
```

### 预期输出

```txt
queued
processing
complete
```

### 执行过程

| 步骤 | 执行内容 | 运行时发生什么 | 当前关键值 |
|---|---|---|---|
| 1 | `for await` 开始 | 调用 `[Symbol.asyncIterator]()` | `currentIndex = 0` |
| 2 | 第一轮 `next()` | 返回 Promise result | value = queued |
| 3 | 第二轮 `next()` | 返回 Promise result | value = processing |
| 4 | 第三轮 `next()` | 返回 Promise result | value = complete |
| 5 | 第四轮 `next()` | done = true | 循环结束 |

### 变量和引用变化

`currentIndex` 被闭包保留，每次 `next()` 调用都会修改它。

### 为什么得到这个输出

`for await...of` 按协议一轮一轮等待 `next()` 的 Promise，直到 `done` 为 `true`。

### 对比写法

错误：

```js
// Goal:
// Show the mistake of returning a plain iterator result from async next.

const brokenStream = {
  [Symbol.asyncIterator]() {
    return {
      next() {
        return { value: 'ready', done: false };
      },
    };
  },
};
```

这个写法不符合 async iterator 的核心约定：`next()` 应该返回 Promise。不同运行环境可能会把它包装或报错，但学习时必须按规范模型理解：async iterator 的 `next()` 返回 Promise。

### 常见错误为什么错

错误一：方法名写成 `Symbol.iterator`。
原因：那是同步迭代协议，不是异步迭代协议。

错误二：忘记 `done: true`。
原因：循环无法知道何时结束。

### 和实际项目的关系

可以用这个模型理解分页加载器、日志流、消息流、Node readable stream。

### 和当前学习主线的关系

这是本章从 Promise 单次结果走向异步数据流的最终底层模型。

### 最终记忆模型

```txt
async iterable:
  has Symbol.asyncIterator.

async iterator:
  has next().

next():
  returns Promise<{ value, done }>.
```

---

## 10. 本章 API / 语法完整索引

| API / 语法 | 所属层级 | 返回值 | 核心规则 | 常见错误 |
|---|---|---|---|---|
| `setTimeout(callback, delay)` | host API | timer id | 注册未来任务，不阻塞当前代码 | 以为 `0` 是同步执行 |
| `setInterval(callback, interval)` | host API | interval id | 重复注册任务，直到清除 | 忘记 `clearInterval` |
| `clearInterval(id)` | host API | `undefined` | 停止 interval | id 保存错 |
| `new Promise(executor)` | ECMAScript API | Promise | executor 立即执行 | 以为 executor 异步执行 |
| `Promise.resolve(value)` | static method | fulfilled Promise | 把值包装成 Promise | 以为返回 value 本身 |
| `Promise.reject(reason)` | static method | rejected Promise | 创建失败 Promise | 创建后不处理 rejection |
| `.then(onFulfilled, onRejected)` | Promise method | 新 Promise | handler return 决定新 Promise | 把 handler 参数当 then 返回值 |
| `.catch(onRejected)` | Promise method | 新 Promise | 捕获前面 rejection | catch return 会恢复链条 |
| `.finally(onFinally)` | Promise method | 新 Promise | 成功失败都执行 | 以为只在成功执行 |
| `Promise.all(iterable)` | static combinator | 新 Promise | 全部成功才成功，一个失败就失败 | 以为返回数组 |
| `Promise.allSettled(iterable)` | static combinator | 新 Promise | 等全部 settled，保留结果对象 | 以为结果对象每项都有 value |
| `Promise.race(iterable)` | static combinator | 新 Promise | 第一个 settled 决定 | 以为等第一个成功 |
| `Promise.any(iterable)` | static combinator | 新 Promise | 第一个 fulfilled 决定 | 忘记全部失败是 `AggregateError` |
| `async function` | syntax | Promise | 普通 return 包装成 fulfilled Promise | 以为返回普通值 |
| `await expression` | syntax | fulfilled value | 暂停当前 async function | 以为阻塞整个程序 |
| top-level `await` | module syntax | module execution pause | 只在 ES module 顶层可用 | 放进 CommonJS 或普通 script |
| `for await...of` | syntax | loop control | 每轮 await async iterator result | 以为一次性拿到数组 |
| `async function*` | syntax | async generator object | 可 `await`，可 `yield` | 以为返回普通 Promise |
| `[Symbol.asyncIterator]()` | protocol method | async iterator | 返回带 `next()` 的对象 | 写成 `Symbol.iterator` |

---

## 11. 本章常见错误总表

| 错误类型 | 错误写法 | 违反规则 | 正确判断方式 |
|---|---|---|---|
| 函数值和调用结果混淆 | `formatOrderLabel(42, buildLabel(42))` | 第二个参数需要函数值，不是字符串结果 | 不加 `()` 是传函数值 |
| callback 参数顺序错 | `callback(data, null)` | error-first callback 第一个参数是错误 | 成功写 `callback(null, data)` |
| 失败后不 return | error callback 后继续执行成功 callback | callback 可能被调用两次 | 错误分支后立即 `return` |
| Promise 当结果对象 | `profilePromise.name` | Promise 对象不是成功值 | 用 `.then` 或 `await` 取值 |
| 以为 executor 异步 | `new Promise` 里面的 log 以为晚执行 | executor 立即同步执行 | 区分 executor 和其中注册的异步任务 |
| then 返回值混淆 | 以为 `metricList` 是 then 返回值 | `metricList` 是回调参数 | `.then()` 整体返回新 Promise |
| then 不 return | 下一个 then 收到 `undefined` | handler 没返回值 | 需要传递就 `return value` |
| catch 后误判链条 | 以为 catch 后 then 一定不执行 | catch 正常 return 会恢复 fulfilled | 看 catch 是 return 还是 throw |
| Promise.all 误判 | 以为返回数组 | `Promise.all` 返回 Promise | then 参数才是结果数组 |
| allSettled 属性误用 | 失败项读 `value` | rejected result 只有 `reason` | 先判断 `status` |
| race 规则误判 | 以为等最快成功 | `race` 等最快 settled | 成功失败都可能赢 |
| any 规则误判 | 以为失败先到就 catch | `any` 等第一个 fulfilled | 全失败才 catch |
| try/catch 漏 await | `try { promiseReturningFn(); }` | 没有 await，catch 不捕获 rejection | 写 `await promiseReturningFn()` |
| await 阻塞误解 | 以为 await 阻塞整个程序 | await 只暂停当前 async function | 外层继续执行 |
| 串行并发混淆 | `await taskA(); await taskB();` | B 在 A 完成后才启动 | 先创建 Promise，再 `Promise.all` |
| 顶层 await 环境错 | 在 CommonJS 顶层写 await | top-level await 属于 ES module | 使用 `.mjs` 或 ESM 配置 |
| async iterator 协议错 | 写 `[Symbol.iterator]` | 异步协议方法是 `[Symbol.asyncIterator]` | 区分 sync / async iterator |

---

## 12. 最终小项目

### 项目目标

构建一个命令行版 dashboard 数据加载器：

```txt
1. 加载用户资料。
2. 并发加载多个指标。
3. 使用 Promise.allSettled 保留成功和失败结果。
4. 使用 async/await 组织主流程。
5. 使用 async generator 输出状态流。
6. 统一处理错误并输出 dashboard summary。
```

项目名：

```txt
Async Dashboard Loader
```

### 为什么这个项目适合本章

它串起本章所有核心机制：

```txt
Promise.resolve / Promise.reject
new Promise
async function
await
try/catch
Promise.allSettled
async function*
for await...of
```

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

### 每个文件职责

| 文件 | 职责 |
|---|---|
| `profileService.mjs` | 模拟加载 profile 数据 |
| `metricService.mjs` | 模拟加载多个 metric，其中一个失败 |
| `statusStream.mjs` | 用 async generator 产生状态消息 |
| `dashboardView.mjs` | 格式化最终 dashboard 输出 |
| `main.mjs` | 串联 async 主流程 |

### 完整代码文件

`package.json`：

```json
{
  "name": "async-dashboard-loader",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node main.mjs"
  }
}
```

`services/profileService.mjs`：

```js
// Goal:
// Provide a Promise-based profile loading service.

export function loadProfileRecord(profileId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (profileId <= 0) {
        reject(new Error('Invalid profile id'));
        return;
      }

      resolve({ id: profileId, name: 'Ada' });
    }, 20);
  });
}
```

`services/metricService.mjs`：

```js
// Goal:
// Provide metric loading tasks with mixed outcomes.

function loadMetric(labelText, valueNumber, shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`${labelText} metric failed`));
        return;
      }

      resolve({ label: labelText, value: valueNumber });
    }, 20);
  });
}

export function loadMetricResults() {
  return Promise.allSettled([
    loadMetric('views', 100, false),
    loadMetric('orders', 12, false),
    loadMetric('refunds', 1, true),
  ]);
}
```

`streams/statusStream.mjs`：

```js
// Goal:
// Provide an async status stream.

function wait(delayMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
}

export async function* createStatusStream() {
  await wait(5);
  yield 'booting';

  await wait(5);
  yield 'loading profile';

  await wait(5);
  yield 'loading metrics';

  await wait(5);
  yield 'rendering dashboard';
}
```

`views/dashboardView.mjs`：

```js
// Goal:
// Format dashboard data for console output.

export function renderDashboard(profileRecord, metricResults) {
  const successfulMetricLabels = [];
  const failedMetricMessages = [];

  for (const metricResult of metricResults) {
    if (metricResult.status === 'fulfilled') {
      successfulMetricLabels.push(metricResult.value.label);
      continue;
    }

    failedMetricMessages.push(metricResult.reason.message);
  }

  console.log(`profile:${profileRecord.name}`);
  console.log(`successful metrics:${successfulMetricLabels.join(',')}`);
  console.log(`failed metrics:${failedMetricMessages.join(',')}`);
}
```

`main.mjs`：

```js
// Goal:
// Run the async dashboard loading flow.

import { loadProfileRecord } from './services/profileService.mjs';
import { loadMetricResults } from './services/metricService.mjs';
import { createStatusStream } from './streams/statusStream.mjs';
import { renderDashboard } from './views/dashboardView.mjs';

async function main() {
  try {
    for await (const statusText of createStatusStream()) {
      console.log(`status:${statusText}`);
    }

    const profilePromise = loadProfileRecord(7);
    const metricResultsPromise = loadMetricResults();

    const [profileRecord, metricResults] = await Promise.all([
      profilePromise,
      metricResultsPromise,
    ]);

    renderDashboard(profileRecord, metricResults);
  } catch (applicationError) {
    console.error(`fatal:${applicationError.message}`);
  }
}

main();
```

### 运行方式

```bash
cd 19-mini-practice-project
npm start
```

### 预期输出

```txt
status:booting
status:loading profile
status:loading metrics
status:rendering dashboard
profile:Ada
successful metrics:views,orders
failed metrics:refunds metric failed
```

### 核心执行流程

| 步骤 | 执行内容 | 机制 |
|---|---|---|
| 1 | `main()` 调用 | async function 返回 Promise |
| 2 | `for await...of` 消费状态流 | async generator + async iterator |
| 3 | 创建 `profilePromise` | 启动 profile 异步任务 |
| 4 | 创建 `metricResultsPromise` | 启动 metric 组合任务 |
| 5 | `Promise.all([...])` | 等 profile 和 metricResults 都完成 |
| 6 | `loadMetricResults()` 内部 | `Promise.allSettled` 保留成功和失败 |
| 7 | `renderDashboard()` | 根据 `status` 区分 value / reason |
| 8 | `catch` | 捕获 fatal error |

### 常见错误

| 错误 | 原因 | 修正 |
|---|---|---|
| 把 `metricResultsPromise` 当数组直接循环 | 它是 Promise，不是数组 | `await metricResultsPromise` |
| 失败 metric 导致整个流程失败 | 用了 `Promise.all` 而不是 `allSettled` | 使用 `Promise.allSettled` 保留结果 |
| 读取 rejected result 的 `value` | rejected result 没有 `value` | 判断 `status === 'rejected'` 后读 `reason` |
| 忘记 `await Promise.all` | 得到的是 Promise | 用 `const [a, b] = await Promise.all(...)` |

### 可扩展方向

```txt
1. 给 metric 添加 timeout，用 Promise.race 实现超时。
2. 给多个备用接口添加 Promise.any，取第一个成功数据源。
3. 添加 concurrency limit，限制同时加载的 metric 数量。
4. 把 status stream 改成真实轮询 API。
5. 把项目迁移到 TypeScript，给 allSettled result 做类型收窄。
```

---

## 13. 已有 cheatsheet 的使用方式

### 结论

本章 `cheatsheet` 已经存在，因此本文不重复生成新的 `cheatsheet` 文件。

你应该这样使用已有 `cheatsheet`：

```txt
学习前：不要先背 cheatsheet，先读本指导文件。
写代码时：用 cheatsheet 查 API 和对比表。
出错时：用 cheatsheet 的错误类型表定位错误类别。
复习时：用 cheatsheet 快速回忆核心规则。
```

### 本文件和 cheatsheet 的分工

| 文件 | 作用 |
|---|---|
| 本指导文件 | 讲机制、执行顺序、逐行解释、错误原因、项目串联 |
| 已有 cheatsheet | 快速查 API、对比相似概念、复习错误类型 |

---

## 14. 最终文件清单

```txt
javascript-asynchronous-learning-guide-zh.md
javascript-asynchronous-cheatsheet.md

javascript-asynchronous/
  README.md
  package.json

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

## 15. 最终学习笔记转换要求

### 结论

最终学习笔记不是复制本文件，而是把每节转成你自己的理解。

每节笔记使用：

```txt
结论
技术意义
底层机制
核心代码
逐行解释
执行过程
变量和引用变化
为什么得到这个输出
常见错误
项目使用场景
最终记忆模型
```

### 必须加入自己的运行结果

每节都写：

```txt
command:
actual output:
my explanation:
my mistake:
fix:
```

### 必须加入自我检查

每节最后写：

```txt
现在我能解释：
还不能完全解释：
下次要验证：
```

---

## 16. 本章最终要能回答的问题

学完本章，你必须能回答：

```txt
1. 同步代码和异步代码的区别是什么？
2. callback function 为什么不一定异步？
3. setTimeout(callback, 0) 为什么不是立刻执行？
4. 调用栈、宿主环境、任务队列、微任务队列、事件循环分别负责什么？
5. error-first callback 为什么第一个参数必须是 error？
6. callback 嵌套真正的问题是什么？
7. Promise 是成功值本身，还是未来结果对象？
8. Promise 的 pending、fulfilled、rejected 分别是什么？
9. Promise 状态为什么不可逆？
10. new Promise(executor) 中 executor 什么时候执行？
11. executor 里的 resolve / reject 和 Promise.resolve / Promise.reject 有什么区别？
12. resolve 这个形参名能不能改？Promise.resolve 这个方法名能不能改？
13. then 的回调参数由什么决定？
14. then 返回的新 Promise 由什么决定？
15. catch 如何捕获前面链条中的错误？
16. catch return 普通值为什么会恢复链条？
17. finally 适合做什么？它能不能拿到成功值？
18. Promise.all 返回什么？成功值是什么？失败规则是什么？
19. Promise.allSettled 的 status / value / reason 是谁的属性？
20. Promise.race 和 Promise.any 的核心区别是什么？
21. AggregateError 在什么时候出现？
22. 如何把 error-first callback 包装成 Promise？
23. async function 为什么总是返回 Promise？
24. await 等待的是什么？
25. await 暂停的是整个程序还是当前 async 函数？
26. try/catch 捕获 async 错误的前提是什么？
27. 串行 await 和并发 Promise 的区别是什么？
28. top-level await 为什么会影响模块依赖图？
29. for await...of 每一轮等待的是什么？
30. async iterator 的 next() 返回什么？
31. Symbol.asyncIterator 是什么？
32. async function* 和 async function 有什么区别？
33. 手写 async iterable 需要实现什么？
34. 异步 JavaScript 和 React 数据请求、Node I/O、Next.js server logic 有什么关系？
```

---

## 17. 本章最终记忆模型

```txt
JavaScript synchronous execution:
  call stack runs current code to completion.

Host async work:
  timers, events, I/O, network are handled outside the JS call stack.

Callback:
  function passed now, called later or immediately depending on caller.

Error-first callback:
  callback(error, data).

Promise:
  object representing a future settled result.

Promise states:
  pending -> fulfilled
  pending -> rejected

then:
  consumes previous fulfilled value.
  returns a new Promise.
  new Promise result depends on handler return or throw.

catch:
  consumes previous rejection.
  return recovers.
  throw continues rejection.

finally:
  cleanup after fulfilled or rejected.

Promise combinators:
  all: all fulfill or reject fast.
  allSettled: collect every settled result.
  race: first settled wins.
  any: first fulfilled wins.

async function:
  always returns Promise.

await:
  pauses current async function only.

serial vs concurrent:
  await before starting next task is serial.
  start promises first, await together is concurrent.

top-level await:
  pauses module execution.

async iteration:
  async next returns Promise<{ value, done }>.

for await...of:
  awaits each async next result.

async generator:
  async function* can await and yield over time.
```

---

## 18. 官方文档阅读清单

完成本文件练习后，再查官方文档细节：

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
