# JavaScript 异步编程 Cheatsheet

> 范围：第 13 章 Asynchronous JavaScript。  
> 用途：复习 callback、Promise、async / await、Promise combinators、top-level await、async iteration、async generator。  
> 规则：先判断“当前代码是否同步执行”，再判断“未来结果由谁调度”，最后判断“后续处理逻辑在哪里恢复”。

---

## 目录

1. [总模型](#1-总模型)
2. [同步、异步、事件循环](#2-同步异步事件循环)
3. [Callback](#3-callback)
4. [Error-first callback](#4-error-first-callback)
5. [Promise 状态模型](#5-promise-状态模型)
6. [Promise constructor 和 executor](#6-promise-constructor-和-executor)
7. [then / catch / finally](#7-then--catch--finally)
8. [Promise 错误传播](#8-promise-错误传播)
9. [Promise combinators](#9-promise-combinators)
10. [把 callback API 包装成 Promise](#10-把-callback-api-包装成-promise)
11. [async function](#11-async-function)
12. [await 机制](#12-await-机制)
13. [async / await 错误处理](#13-async--await-错误处理)
14. [串行 await 和并发 Promise](#14-串行-await-和并发-promise)
15. [Top-level await](#15-top-level-await)
16. [for await...of](#16-for-awaitof)
17. [async function\*](#17-async-function)
18. [手写 async iterable](#18-手写-async-iterable)
19. [常见输出顺序判断](#19-常见输出顺序判断)
20. [API 对照表](#20-api-对照表)
21. [常见错误速查](#21-常见错误速查)
22. [项目使用判断](#22-项目使用判断)
23. [最终记忆模型](#23-最终记忆模型)

---

## 1. 总模型

### 结论

异步 JavaScript 不是“多段代码同时跑”。它的核心是：

```txt
current synchronous code
  registers future work
  finishes current call stack
  later resumes continuation through queues
```

也就是：

```txt
当前同步代码先执行。
异步 API 注册未来工作。
Promise reaction 进入 microtask queue。
timer / event callback 进入 task queue。
event loop 在调用栈清空后调度下一段代码。
```

### 最重要的判断顺序

遇到异步代码，按这个顺序判断：

```txt
1. 这行代码现在是否立刻执行？
2. 它是否只是注册未来工作？
3. 如果返回 Promise，它现在是什么状态？
4. then / catch / finally 是注册处理器，还是立即拿到结果？
5. await 暂停的是哪一个 async function？
6. 后续代码进入 microtask queue 还是 task queue？
```

---

## 2. 同步、异步、事件循环

### 核心区别

| 类型 | English term | 执行模型 |
|---|---|---|
| 同步 | synchronous | 当前调用栈内立即按顺序执行 |
| 异步 | asynchronous | 当前代码不等待结果，未来再恢复处理 |
| 调用栈 | call stack | 当前正在执行的函数调用 |
| 宿主环境 | host environment | 处理 timer、I/O、event、network 等外部工作 |
| 任务队列 | task queue / macrotask queue | timer、事件等回调等待执行的位置 |
| 微任务队列 | microtask queue / job queue | Promise reaction、await continuation 等优先级更高的队列 |
| 事件循环 | event loop | 在调用栈清空后调度 microtask 和 task |

### `setTimeout(callback, 0)` 的真正含义

```js
// Goal:
// Verify that zero delay does not mean immediate execution.

console.log('start');

setTimeout(() => {
  console.log('timer');
}, 0);

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('end');
```

常见输出：

```txt
start
end
promise
timer
```

机制：

```txt
1. start 同步输出。
2. setTimeout 注册 timer callback。
3. Promise.then 注册 microtask。
4. end 同步输出。
5. 当前调用栈清空。
6. microtask 先执行，输出 promise。
7. task 再执行，输出 timer。
```

### 关键记忆

```txt
setTimeout does not pause code.
Promise.then handler does not run inside the current synchronous stack.
Microtasks run before the next timer task.
```

---

## 3. Callback

### 结论

回调函数（callback function）是作为值传入另一个函数，并由另一个函数调用的函数。callback 不一定异步。

### 同步 callback

```js
// Goal:
// Pass a function value and call it synchronously.

function formatOrderLabel(orderId, labelBuilder) {
  return `Order: ${labelBuilder(orderId)}`;
}

function createShortOrderLabel(orderId) {
  return `#${orderId}`;
}

console.log(formatOrderLabel(42, createShortOrderLabel));
```

输出：

```txt
Order: #42
```

### 异步 callback

```js
// Goal:
// Register a callback for future execution.

setTimeout(() => {
  console.log('future callback');
}, 10);

console.log('registered');
```

输出：

```txt
registered
future callback
```

### 常见错误

错误：

```js
setTimeout(sendReport(), 1000);
```

含义：

```txt
现在立刻调用 sendReport()。
把 sendReport() 的返回值传给 setTimeout。
```

正确：

```js
setTimeout(sendReport, 1000);
```

或者需要参数时：

```js
setTimeout(() => {
  sendReport('daily');
}, 1000);
```

---

## 4. Error-first callback

### 结论

错误优先回调（error-first callback）是 Node 风格约定：

```txt
callback(error, result)
```

规则：

```txt
error !== null -> 失败
error === null -> 成功，读取 result
```

### 标准形状

```js
// Goal:
// Use the error-first callback convention.

function readProfileRecord(profileId, callback) {
  setTimeout(() => {
    if (profileId <= 0) {
      callback(new Error('Invalid profile id'), null);
      return;
    }

    callback(null, { id: profileId, name: 'Ada' });
  }, 10);
}

readProfileRecord(1, (readError, profileRecord) => {
  if (readError !== null) {
    console.error(readError.message);
    return;
  }

  console.log(profileRecord.name);
});
```

### 必须先判断 error

错误：

```js
readProfileRecord(-1, (readError, profileRecord) => {
  console.log(profileRecord.name);
});
```

原因：

```txt
失败时 profileRecord 是 null。
直接读取 .name 会触发 TypeError。
```

---

## 5. Promise 状态模型

### 结论

期约（Promise）是“未来结果对象”，不是结果本身。

### 三种状态

| 状态 | English term | 含义 |
|---|---|---|
| 待定 | pending | 结果还没产生 |
| 已兑现 | fulfilled | 成功完成，有 fulfilled value |
| 已拒绝 | rejected | 失败，有 rejection reason |

### 状态只能改变一次

```txt
pending -> fulfilled
pending -> rejected
```

一旦 settled，就不会再变。

### Promise 和完成值不是一回事

```js
// Goal:
// Distinguish a Promise object from its fulfilled value.

const profilePromise = Promise.resolve({ name: 'Ada' });

console.log(profilePromise instanceof Promise);

profilePromise.then((profileRecord) => {
  console.log(profileRecord.name);
});
```

输出：

```txt
true
Ada
```

错误：

```js
const profileRecord = profilePromise;
console.log(profileRecord.name);
```

原因：

```txt
profileRecord is a Promise object.
It is not the fulfilled profile object.
```

---

## 6. Promise constructor 和 executor

### 结论

`new Promise(executor)` 会立即同步执行 executor。异步的是 executor 里面注册的未来工作，不是 executor 本身。

### 结构

```txt
new Promise((resolve, reject) => {
  start async work
  call resolve(value) on success
  call reject(error) on failure
})
```

### 执行顺序

```js
// Goal:
// Verify that the Promise executor runs synchronously.

const orderPromise = new Promise((resolve) => {
  console.log('executor start');

  setTimeout(() => {
    resolve('ready');
  }, 10);

  console.log('executor end');
});

orderPromise.then((orderStatus) => {
  console.log(orderStatus);
});

console.log('script end');
```

输出：

```txt
executor start
executor end
script end
ready
```

### `resolve()` 和 `reject()`

| API | 作用 |
|---|---|
| `resolve(value)` | 让 Promise fulfilled，或采用另一个 Promise 的状态 |
| `reject(reason)` | 让 Promise rejected |

### 常见错误

不要在已经返回 Promise 的 API 外面重复包一层 Promise。

错误：

```js
function loadValueAgain() {
  return new Promise((resolve, reject) => {
    Promise.resolve(10).then(resolve).catch(reject);
  });
}
```

更好：

```js
function loadValue() {
  return Promise.resolve(10);
}
```

---

## 7. then / catch / finally

### 结论

`then()`、`catch()`、`finally()` 都会返回新的 Promise，所以 Promise 链是由“一段处理器返回值决定下一段状态”的。

### API 形状

```txt
promise.then(onFulfilled, onRejected?)
promise.catch(onRejected)
promise.finally(onFinally)
```

### 三者职责

| 方法 | 主要作用 | 返回值规则 |
|---|---|---|
| `then()` | 处理 fulfilled，也可处理 rejected | 返回新的 Promise |
| `catch()` | 处理 rejected | 返回新的 Promise |
| `finally()` | 成功失败都执行，做清理 | 通常不改变原值，除非抛错或返回 rejected Promise |

### 链式数据流

```js
// Goal:
// Verify that each then receives the previous return value.

Promise.resolve(120)
  .then((totalAmount) => {
    console.log(`total:${totalAmount}`);
    return totalAmount * 0.1;
  })
  .then((discountAmount) => {
    console.log(`discount:${discountAmount}`);
  })
  .finally(() => {
    console.log('cleanup');
  });
```

输出：

```txt
total:120
discount:12
cleanup
```

### 忘记 `return` 的坑

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

输出：

```txt
undefined
```

原因：

```txt
第一个 then handler 没有 return。
它实际返回 undefined。
下一个 then 收到 undefined。
```

---

## 8. Promise 错误传播

### 结论

Promise 链里的错误会向后传播，直到遇到 `catch()` 或 rejection handler。

### 错误来源

```txt
1. Promise 被 reject。
2. then handler 内部 throw Error。
3. then handler 返回 rejected Promise。
```

### 错误传播示例

```js
// Goal:
// Verify Promise error propagation.

Promise.resolve('raw')
  .then((payloadText) => {
    console.log(payloadText);
    throw new Error('Parse failed');
  })
  .then((parsedRecord) => {
    console.log(parsedRecord);
  })
  .catch((parseError) => {
    console.log(parseError.message);
    return { fallback: true };
  })
  .then((safeRecord) => {
    console.log(safeRecord.fallback);
  });
```

输出：

```txt
raw
Parse failed
true
```

机制：

```txt
throw Error -> 当前 then 返回 rejected Promise
后面的 fulfilled then 被跳过
catch 捕获 rejection
catch return 普通值 -> 链条恢复 fulfilled
最后 then 收到 fallback object
```

### `try/catch` 不能捕获未来 callback 错误

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

原因：

```txt
try/catch 只包住当前同步执行阶段。
timer callback 未来才执行，已经不在这个 try/catch 调用栈里。
```

---

## 9. Promise combinators

### 结论

Promise 静态组合方法用于组织多个异步结果。

| API | 成功条件 | 失败条件 | 适合场景 |
|---|---|---|---|
| `Promise.all(iterable)` | 所有输入 fulfilled | 任意一个 rejected 就整体 rejected | 多个任务必须全部成功 |
| `Promise.allSettled(iterable)` | 所有输入 settled 后 fulfilled | 不会因为单个 rejected 而 rejected | 收集每个任务的成功/失败状态 |
| `Promise.race(iterable)` | 第一个 settled 是 fulfilled | 第一个 settled 是 rejected | 超时、竞速 |
| `Promise.any(iterable)` | 第一个 fulfilled | 全部 rejected 才 rejected，抛 `AggregateError` | 多个来源任选一个成功结果 |

### `Promise.all()`

```js
// Goal:
// Wait for all promises to fulfill.

const profilePromise = Promise.resolve('profile');
const settingsPromise = Promise.resolve('settings');

Promise.all([profilePromise, settingsPromise]).then((resultList) => {
  console.log(resultList.join(','));
});
```

输出：

```txt
profile,settings
```

### `Promise.allSettled()`

```js
// Goal:
// Keep both fulfilled and rejected results.

Promise.allSettled([
  Promise.resolve('cache ready'),
  Promise.reject(new Error('network failed')),
]).then((resultList) => {
  console.log(resultList[0].status);
  console.log(resultList[1].status);
});
```

输出：

```txt
fulfilled
rejected
```

### `Promise.race()` vs `Promise.any()`

```js
// Goal:
// Compare race and any.

const slowSuccess = new Promise((resolve) => {
  setTimeout(() => resolve('slow success'), 20);
});

const fastFailure = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('fast failure')), 10);
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

### 记忆区别

```txt
all:
全部成功才成功。

allSettled:
全部结束后给状态清单。

race:
谁先结束用谁，不管成功失败。

any:
谁先成功用谁，失败的先忽略。
```

---

## 10. 把 callback API 包装成 Promise

### 结论

旧式 error-first callback API 可以包装成 Promise 风格 API，方便后续使用 `then()` 或 `await`。

### 标准包装模式

```js
// Goal:
// Convert an error-first callback API into a Promise API.

function readSettings(callback) {
  setTimeout(() => {
    callback(null, { theme: 'dark' });
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

输出：

```txt
dark
```

### 包装规则

```txt
callback(error, result)

if error !== null:
  reject(error)

else:
  resolve(result)
```

### 什么时候需要手写 `new Promise()`

需要：

```txt
1. 旧 API 只提供 callback。
2. 你要把事件、timer、一次性外部通知包装成 Promise。
```

不需要：

```txt
1. API 已经返回 Promise。
2. async function 里只是为了 return await 再包一层。
```

---

## 11. async function

### 结论

`async function` 调用后一定返回 Promise。函数体里 `return value` 会变成 fulfilled Promise 的 value。

### 规则

```txt
async function returns Promise.
return value -> Promise fulfilled with value.
throw error -> Promise rejected with error.
```

### 示例

```js
// Goal:
// Verify that async function always returns a Promise.

async function loadProfileName() {
  return 'Ada';
}

const profileNamePromise = loadProfileName();

console.log(profileNamePromise instanceof Promise);

profileNamePromise.then((profileName) => {
  console.log(profileName);
});
```

输出：

```txt
true
Ada
```

### `async` 不是让函数体全部异步

```js
// Goal:
// Verify sync part of async function runs immediately.

async function runTask() {
  console.log('inside async');
  return 'done';
}

runTask().then((taskStatus) => {
  console.log(taskStatus);
});

console.log('outside');
```

输出：

```txt
inside async
outside
done
```

机制：

```txt
async 函数被调用后，函数体会开始执行。
遇到 return 后，返回的 Promise fulfilled。
then handler 作为 microtask 执行。
```

---

## 12. await 机制

### 结论

`await` 等待 Promise，并把 fulfilled value 作为表达式结果。它暂停的是当前 async function 的后续执行，不是整个程序。

### 核心规则

```txt
const value = await promise;
```

等价理解：

```txt
暂停当前 async function continuation。
promise fulfilled 后，把 fulfilled value 赋给 value。
如果 promise rejected，把 rejection reason 当异常抛出。
```

### 执行顺序

```js
// Goal:
// Verify that await pauses only the current async function.

function loadStatus() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('ready');
    }, 10);
  });
}

async function printStatus() {
  console.log('before await');

  const statusText = await loadStatus();

  console.log(statusText);
  console.log('after await');
}

printStatus();
console.log('outside');
```

输出：

```txt
before await
outside
ready
after await
```

### 关键解释

```txt
before await:
同步执行。

await loadStatus():
调用 loadStatus，拿到 Promise。
暂停 printStatus 后续代码。

outside:
printStatus 外部的同步代码继续执行。

ready / after await:
Promise fulfilled 后，async function continuation 恢复。
```

### 常见错误

错误说法：

```txt
await blocks JavaScript.
```

正确说法：

```txt
await pauses the current async function continuation.
It does not block the whole event loop.
```

---

## 13. async / await 错误处理

### 结论

在 async function 内，`await` 一个 rejected Promise 会像同步 `throw` 一样进入 `catch`。

### 标准写法

```js
// Goal:
// Handle a rejected Promise with try/catch and await.

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

输出：

```txt
Billing service failed
```

### 必须有 `await`

错误：

```js
try {
  const billingPromise = loadBillingRecord();
} catch (billingError) {
  console.error(billingError.message);
}
```

原因：

```txt
try block 里只是同步创建 rejected Promise。
没有 await，就没有把 rejection 转成当前 async function 内的 throw。
```

### `async function` 内 throw 的效果

```js
async function loadProfileRecord() {
  throw new Error('Profile failed');
}

loadProfileRecord().catch((profileError) => {
  console.log(profileError.message);
});
```

输出：

```txt
Profile failed
```

规则：

```txt
async function 内部 throw -> 返回 rejected Promise
```

---

## 14. 串行 await 和并发 Promise

### 结论

连续写多个依赖相互独立的 `await`，常常会把可以并发的任务写成串行。

### 串行

```js
// Goal:
// Run two async jobs serially.

async function loadMetricsSerially() {
  const firstMetric = await loadMetric('views');
  const secondMetric = await loadMetric('orders');

  return [firstMetric, secondMetric];
}
```

执行模型：

```txt
start views
wait views done
start orders
wait orders done
```

### 并发

```js
// Goal:
// Start two async jobs before awaiting them.

async function loadMetricsConcurrently() {
  const firstMetricPromise = loadMetric('views');
  const secondMetricPromise = loadMetric('orders');

  return Promise.all([
    firstMetricPromise,
    secondMetricPromise,
  ]);
}
```

执行模型：

```txt
start views
start orders
wait both done
```

### 判断规则

| 情况 | 写法 |
|---|---|
| B 依赖 A 的结果 | 串行 await |
| A 和 B 互不依赖 | 先启动 Promise，再 `Promise.all()` |
| 要收集全部成功失败 | `Promise.allSettled()` |
| 任意成功即可 | `Promise.any()` |
| 做超时竞速 | `Promise.race()` |

### `map(async ...)` 的坑

错误：

```js
const metricList = itemList.map(async (itemRecord) => {
  return loadMetric(itemRecord.label);
});
```

结果：

```txt
metricList is Promise[]
```

正确：

```js
const metricList = await Promise.all(
  itemList.map((itemRecord) => {
    return loadMetric(itemRecord.label);
  }),
);
```

---

## 15. Top-level await

### 结论

顶层 await（top-level await）允许 ES Module 在模块顶层等待 Promise。导入它的模块必须等待它初始化完成。

### 形状

```js
// runtimeConfig.mjs
const configPromise = Promise.resolve({
  apiBaseUrl: 'https://example.com',
});

export const runtimeConfig = await configPromise;
```

```js
// app.mjs
import { runtimeConfig } from './runtimeConfig.mjs';

console.log(runtimeConfig.apiBaseUrl);
```

### 机制

```txt
app.mjs imports runtimeConfig.mjs
runtimeConfig.mjs reaches top-level await
module initialization pauses
configPromise fulfilled
runtimeConfig binding initialized
app.mjs continues execution
```

### 使用原则

适合：

```txt
启动配置
一次性初始化资源
模块级动态加载
```

谨慎：

```txt
基础工具模块
共享 constants 模块
大量模块都会导入的底层模块
```

原因：

```txt
一个模块的 top-level await 会影响依赖它的模块初始化。
```

---

## 16. for await...of

### 结论

`for await...of` 用于消费异步可迭代对象（async iterable）。每一轮都会等待 async iterator 的 `next()` Promise 完成。

### 可消费对象

```txt
async iterable:
  object with [Symbol.asyncIterator]()

sync iterable containing promises:
  array of Promise values also works with for await...of
```

### 示例：数组里的 Promise

```js
// Goal:
// Await each Promise value in a loop.

async function runLoop() {
  const chunkPromiseList = [
    Promise.resolve('header'),
    Promise.resolve('body'),
    Promise.resolve('footer'),
  ];

  for await (const chunkText of chunkPromiseList) {
    console.log(chunkText);
  }
}

runLoop();
```

输出：

```txt
header
body
footer
```

### 机制

```txt
1. 数组本身是 sync iterable。
2. 每个元素是 Promise。
3. for await...of 每轮等待当前 Promise。
4. fulfilled value 进入循环变量。
```

### 语法限制

错误：

```js
function runLoop() {
  for await (const itemValue of itemList) {
    console.log(itemValue);
  }
}
```

原因：

```txt
for await...of must be inside async function or top-level module context.
```

---

## 17. async function*

### 结论

异步生成器（async generator）用 `async function*` 定义。它返回 async generator object，不是普通 Promise。

### 对比

| 语法 | 调用结果 | 能不能 `await` | 能不能 `yield` |
|---|---|---|---|
| `function` | 普通返回值 | 否 | 否 |
| `function*` | generator object | 否 | 是 |
| `async function` | Promise | 是 | 否 |
| `async function*` | async generator object | 是 | 是 |

### 示例

```js
// Goal:
// Yield async values over time.

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

输出：

```txt
queued
running
done
```

### 机制

```txt
async function* call -> async generator object
for await...of calls next()
next() returns Promise<IteratorResult>
generator awaits internal delay
yield produces value
loop body runs
```

---

## 18. 手写 async iterable

### 结论

手写异步可迭代对象需要实现 `[Symbol.asyncIterator]()`，它返回 async iterator；async iterator 的 `next()` 返回 Promise，Promise fulfilled 后得到 `{ value, done }`。

### 最小形状

```txt
{
  [Symbol.asyncIterator]() {
    return {
      async next() {
        return { value, done };
      }
    };
  }
}
```

### 示例

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

输出：

```txt
1
2
3
```

### 和同步 iterator 的对比

| 协议 | 方法名 | `next()` 返回 |
|---|---|---|
| sync iterable | `[Symbol.iterator]()` | `{ value, done }` |
| async iterable | `[Symbol.asyncIterator]()` | `Promise<{ value, done }>` |

---

## 19. 常见输出顺序判断

### 例 1：executor 同步，then 异步

```js
console.log('A');

const valuePromise = new Promise((resolve) => {
  console.log('B');
  resolve('C');
});

valuePromise.then((valueText) => {
  console.log(valueText);
});

console.log('D');
```

输出：

```txt
A
B
D
C
```

原因：

```txt
Promise executor 立即同步执行。
then handler 是 Promise reaction，进入 microtask。
```

### 例 2：await 后续晚于外部同步代码

```js
async function runTask() {
  console.log('A');
  await Promise.resolve();
  console.log('B');
}

runTask();
console.log('C');
```

输出：

```txt
A
C
B
```

原因：

```txt
await 暂停 runTask 后续执行。
外部同步代码继续。
Promise resolved 后，await continuation 作为 microtask 恢复。
```

### 例 3：microtask 早于 timer

```js
setTimeout(() => {
  console.log('timer');
}, 0);

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('sync');
```

输出：

```txt
sync
promise
timer
```

原因：

```txt
当前同步代码结束后，先清空 microtask queue，再执行下一个 task。
```

---

## 20. API 对照表

| API / 语法 | 类型 | 返回值 | 核心语义 |
|---|---|---|---|
| `setTimeout(handler, delay)` | host API | timer id | 注册未来 task |
| `new Promise(executor)` | constructor | Promise | 创建未来结果对象，executor 同步执行 |
| `resolve(value)` | executor 参数 | undefined | 让 Promise fulfilled 或采用 thenable 状态 |
| `reject(reason)` | executor 参数 | undefined | 让 Promise rejected |
| `promise.then(onFulfilled)` | instance method | new Promise | 注册成功处理器 |
| `promise.catch(onRejected)` | instance method | new Promise | 注册失败处理器 |
| `promise.finally(onFinally)` | instance method | new Promise | 注册清理处理器 |
| `Promise.resolve(value)` | static method | fulfilled Promise 或 assimilated Promise | 创建成功 Promise / 采用状态 |
| `Promise.reject(reason)` | static method | rejected Promise | 创建失败 Promise |
| `Promise.all(iterable)` | static method | Promise | 全部成功才成功 |
| `Promise.allSettled(iterable)` | static method | Promise | 等全部 settled |
| `Promise.race(iterable)` | static method | Promise | 第一个 settled 决定结果 |
| `Promise.any(iterable)` | static method | Promise | 第一个 fulfilled 决定结果 |
| `async function` | syntax | Promise | 函数结果 Promise 化 |
| `await expression` | operator | fulfilled value | 暂停当前 async continuation |
| `for await...of` | statement | 无 | 消费 async iterable |
| `async function*` | syntax | async generator object | 产出异步序列 |
| `[Symbol.asyncIterator]()` | protocol method | async iterator | 接入 async iteration |

---

## 21. 常见错误速查

| 错误 | 正确模型 |
|---|---|
| `setTimeout(fn, 0)` 立刻执行 | 当前同步代码结束后才有机会执行 |
| Promise 是异步操作本身 | Promise 是异步结果对象 |
| executor 未来才执行 | executor 立即同步执行 |
| `then()` 直接返回最终值 | `then()` 返回新的 Promise |
| 忘记从 `then()` return | 下一个 `then()` 收到 `undefined` |
| 外层 `try/catch` 捕获 timer callback 错误 | 捕获不到未来 callback 的 throw |
| `async function` 返回普通值 | 一定返回 Promise |
| `await` 阻塞整个程序 | 只暂停当前 async function 后续执行 |
| `try/catch` 不加 `await` 就能捕获 Promise rejection | 必须 await，或使用 catch |
| 独立请求连续 await | 会变成串行，应该并发启动 |
| `map(async ...)` 直接得到结果数组 | 得到 Promise 数组，需要 `Promise.all()` |
| `Promise.race()` 等第一个成功 | race 等第一个 settled |
| `Promise.any()` 等第一个结束 | any 等第一个 fulfilled |
| `async function*` 返回 Promise | 返回 async generator object |
| async iterator 的 `next()` 返回普通 iterator result | 返回 Promise 包装的 iterator result |

---

## 22. 项目使用判断

### 用 callback

适合：

```txt
读取旧 API。
事件监听器。
一次性简单回调。
```

但复杂依赖流程不适合大量嵌套 callback。

### 用 Promise 链

适合：

```txt
需要明确的异步数据管道。
要把多个 then/catch 组合起来。
和已有 Promise API 直接衔接。
```

### 用 async / await

适合：

```txt
业务流程有明显步骤。
需要 try/catch 集中处理错误。
希望异步代码看起来像顺序流程。
```

### 用 Promise.all

适合：

```txt
多个互不依赖的请求。
页面初始化同时加载多个资源。
全部成功才继续渲染。
```

### 用 Promise.allSettled

适合：

```txt
多个请求互不影响。
失败也要展示部分成功结果。
批量任务结果汇总。
```

### 用 Promise.race

适合：

```txt
请求超时。
竞速选择最快结束的任务。
```

### 用 Promise.any

适合：

```txt
多个镜像源。
任意一个成功即可。
失败源可以忽略。
```

### 用 async generator / for await...of

适合：

```txt
流式数据。
分页数据。
日志输出。
Web Stream / Node Stream。
随着时间逐步产生的数据。
```

---

## 23. 最终记忆模型

```txt
Callback:
把未来要执行的函数交给另一个 API。

Error-first callback:
callback(error, result)
error first, result second.

Promise:
把未来成功或失败的结果对象化。

Promise state:
pending -> fulfilled
pending -> rejected

Promise executor:
new Promise(executor)
executor runs synchronously.

then:
register fulfilled handler
return new Promise

catch:
register rejected handler
return new Promise

finally:
register cleanup handler
return new Promise

async function:
always returns Promise

await:
waits for Promise
pauses current async function continuation
does not block the whole program

Promise.all:
all fulfilled or reject on first rejection

Promise.allSettled:
wait until every input settled

Promise.race:
first settled wins

Promise.any:
first fulfilled wins

for await...of:
await each async iterator next result

async function*:
create async sequence over time
```

最后一句话：

```txt
异步编程的核心不是语法，而是控制“现在执行、未来完成、后续恢复”这三件事的边界。
```
