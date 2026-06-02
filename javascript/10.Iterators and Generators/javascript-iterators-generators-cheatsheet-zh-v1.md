# JavaScript 迭代器与生成器 Cheatsheet v1

> 对应学习指导文件：`javascript-iterators-generators-learning-guide-zh.md`  
> 主题范围：《JavaScript 权威指南》第 12 章 Iterators and Generators、MDN Iteration protocols、Iterators and generators、`function*`、`yield`、`yield*`、`for...of`、Generator、async iteration、Iterator helpers。  
> 用法：这份文件是复习速查表，不替代练习指导文件。先写代码、跑输出、解释执行过程，再用它快速回忆机制和常见坑。

---

## 目录

1. [总模型](#1-总模型)
2. [核心术语速查](#2-核心术语速查)
3. [内置可迭代对象速查](#3-内置可迭代对象速查)
4. [迭代协议和可迭代协议](#4-迭代协议和可迭代协议)
5. [`for...of` 的运行机制](#5-forof-的运行机制)
6. [手动调用 iterator](#6-手动调用-iterator)
7. [自定义 iterable 对象](#7-自定义-iterable-对象)
8. [类实例实现 iterable](#8-类实例实现-iterable)
9. [iterator 的状态性和一次性](#9-iterator-的状态性和一次性)
10. [消费 iterable 的语法和 API](#10-消费-iterable-的语法和-api)
11. [惰性 iterable 工具函数](#11-惰性-iterable-工具函数)
12. [生成器函数基础](#12-生成器函数基础)
13. [`yield`、`next()`、暂停与恢复](#13-yieldnext暂停与恢复)
14. [无限序列和 `take()`](#14-无限序列和-take)
15. [`yield*` 委托迭代](#15-yield-委托迭代)
16. [递归生成器和树遍历](#16-递归生成器和树遍历)
17. [生成器 `return` 返回值](#17-生成器-return-返回值)
18. [`yield` 表达式和 `next(value)`](#18-yield-表达式和-nextvalue)
19. [`return()`、`throw()` 和清理逻辑](#19-returnthrow-和清理逻辑)
20. [异步迭代预习](#20-异步迭代预习)
21. [Iterator helpers 预习](#21-iterator-helpers-预习)
22. [项目使用判断](#22-项目使用判断)
23. [高频错误总表](#23-高频错误总表)
24. [最终自检问题](#24-最终自检问题)
25. [最终记忆模型](#25-最终记忆模型)

---

## 1. 总模型

### 结论

迭代器与生成器解决的是 JavaScript 的统一遍历问题：

```txt
consumer
  -> calls iterable[Symbol.iterator]()
  -> gets iterator
  -> calls iterator.next() repeatedly
  -> reads { value, done }
  -> stops when done is true
```

### 技术意义

`for...of`、展开语法、数组解构、`Array.from()`、`yield*` 都建立在同一套协议上。数组只是最常见的 iterable，不是迭代机制的全部。

### 底层机制

```txt
Iterable
  owns [Symbol.iterator]()
  returns Iterator

Iterator
  owns next()
  returns IteratorResult

IteratorResult
  has value
  has done
```

### 和前端学习的关系

| 后续主题 | 依赖的迭代模型 |
|---|---|
| 数组、字符串、Map、Set 遍历 | 内置 iterable |
| DOM 集合遍历 | 浏览器对象实现 iterable |
| 数据流处理 | 惰性 iterator / async iterator |
| 树结构遍历 | 递归 generator |
| 分页、日志、文件流 | 一次性 iterator / cursor model |
| 异步流 | `Symbol.asyncIterator` + `for await...of` |

---

## 2. 核心术语速查

| 术语 | English term | 核心解释 |
|---|---|---|
| 可迭代对象 | iterable | 拥有 `[Symbol.iterator]()` 方法的对象。 |
| 迭代器 | iterator | 拥有 `next()` 方法的对象。 |
| 迭代结果对象 | iterator result object | `next()` 返回的 `{ value, done }` 对象。 |
| `Symbol.iterator` | well-known symbol | 语言规定的默认同步迭代方法名。 |
| `for...of` | iteration statement | 消费 iterable 的语句。 |
| 生成器函数 | generator function | 使用 `function*` 定义，调用后返回 generator object。 |
| 生成器对象 | generator object | 同时是 iterator 和 iterable 的对象。 |
| `yield` | yield operator | 产出值并暂停生成器。 |
| `yield*` | delegated yield | 把产出委托给另一个 iterable。 |
| 惰性求值 | lazy evaluation | 被请求时才计算下一个值。 |
| 异步可迭代对象 | async iterable | 拥有 `[Symbol.asyncIterator]()` 方法的对象。 |
| 异步生成器 | async generator | `async function*` 创建异步序列。 |

### 最容易混的三组

| 容易混淆 | 正确区分 |
|---|---|
| iterable vs iterator | iterable 能“提供 iterator”；iterator 负责“产出下一个值”。 |
| `yield` vs `return` | `yield` 暂停，之后还能继续；`return` 结束生成器。 |
| `for...of` vs `for...in` | `for...of` 遍历 iterable 的值；`for...in` 枚举对象属性名。 |

---

## 3. 内置可迭代对象速查

### 常见内置 iterable

| 值 | `for...of` 每次产出什么 | 默认迭代顺序 |
|---|---|---|
| Array | 元素值 | 数组索引顺序 |
| String | 字符 | 字符串顺序 |
| Set | Set 成员值 | 插入顺序 |
| Map | `[key, value]` 二元素数组 | 插入顺序 |
| TypedArray | 数值元素 | 索引顺序 |
| Generator object | 每次 `yield` 的值 | 生成器执行顺序 |

### 普通对象默认不是 iterable

```js
// Goal:
// Show that plain objects are not iterable by default.

const profileRecord = {
  name: "Ada",
  role: "admin",
};

try {
  for (const profileValue of profileRecord) {
    console.log(profileValue);
  }
} catch (error) {
  console.log(error.constructor.name);
}
```

预期输出：

```txt
TypeError
```

原因：普通对象默认没有 `[Symbol.iterator]()` 方法。

### 普通对象要遍历什么

| 需求 | 正确写法 |
|---|---|
| 遍历 key | `Object.keys(record)` |
| 遍历 value | `Object.values(record)` |
| 遍历 `[key, value]` | `Object.entries(record)` |
| 让对象自己支持 `for...of` | 自定义 `[Symbol.iterator]()` |

---

## 4. 迭代协议和可迭代协议

### 可迭代协议

一个对象满足可迭代协议，需要：

```txt
object[Symbol.iterator]
  -> function
  -> returns iterator
```

### 迭代器协议

一个对象满足迭代器协议，需要：

```txt
iterator.next
  -> function
  -> returns { value, done }
```

### 最小合法结构

```js
// Goal:
// Build a minimal iterable object.

const singleItemIterable = {
  [Symbol.iterator]() {
    let alreadyUsed = false;

    return {
      next() {
        if (alreadyUsed) {
          return { value: undefined, done: true };
        }

        alreadyUsed = true;
        return { value: "ready", done: false };
      },
    };
  },
};

for (const statusText of singleItemIterable) {
  console.log(statusText);
}
```

预期输出：

```txt
ready
```

### `Symbol.iterator` 为什么不用字符串

`Symbol.iterator` 是 well-known symbol。它避免和普通业务属性名冲突，也让语言内部机制能用统一方式查找“默认迭代方法”。

```txt
普通属性名：可能和业务字段冲突。
Symbol.iterator：语言约定的特殊协议键。
```

---

## 5. `for...of` 的运行机制

### 结论

`for...of` 不直接读取数组索引。它消费 iterable。

### 近似执行过程

```txt
const iterator = iterable[Symbol.iterator]();

while (true) {
  const result = iterator.next();

  if (result.done) {
    break;
  }

  const value = result.value;
  run loop body with value;
}
```

### 机制图

```txt
for (const item of source) { ... }

source[Symbol.iterator]()
  -> iterator
iterator.next()
  -> { value: firstValue, done: false }
iterator.next()
  -> { value: secondValue, done: false }
iterator.next()
  -> { value: undefined, done: true }
```

### `for...of` 会自动做什么

| 动作 | 是否自动 |
|---|---:|
| 调用 `[Symbol.iterator]()` | 是 |
| 反复调用 `next()` | 是 |
| 检查 `done` | 是 |
| 读取 `value` | 是 |
| 重新生成已经被消费的 iterator | 否 |

---

## 6. 手动调用 iterator

### 结论

手动调用 `next()` 能看清 iterator 的本质：它是一个有进度的游标（cursor）。

```js
// Goal:
// Manually consume an array iterator.

const taskNameList = ["design", "build", "test"];
const taskIterator = taskNameList[Symbol.iterator]();

console.log(taskIterator.next());
console.log(taskIterator.next());
console.log(taskIterator.next());
console.log(taskIterator.next());
```

预期输出：

```txt
{ value: 'design', done: false }
{ value: 'build', done: false }
{ value: 'test', done: false }
{ value: undefined, done: true }
```

### `next()` 返回值规则

| 状态 | 典型返回值 |
|---|---|
| 还有值 | `{ value: itemValue, done: false }` |
| 已结束 | `{ value: undefined, done: true }` |
| 生成器 `return finalValue` | `{ value: finalValue, done: true }` |

### 常见误解

| 错误理解 | 正确模型 |
|---|---|
| iterator 是数组 | iterator 是游标。 |
| `next()` 返回值本身就是元素 | `next()` 返回 result object，元素在 `.value` 里。 |
| `done: true` 的值也会进入 `for...of` | `for...of` 忽略 `done: true` 的 `value`。 |

---

## 7. 自定义 iterable 对象

### 标准写法

```js
// Goal:
// Build a custom iterable object without generator syntax.

const priorityQueueObject = {
  items: ["critical", "normal", "low"],

  [Symbol.iterator]() {
    let nextIndex = 0;
    const sourceItems = this.items;

    return {
      next() {
        if (nextIndex < sourceItems.length) {
          const currentValue = sourceItems[nextIndex];
          nextIndex += 1;
          return { value: currentValue, done: false };
        }

        return { value: undefined, done: true };
      },
    };
  },
};

for (const priorityLabel of priorityQueueObject) {
  console.log(priorityLabel);
}
```

预期输出：

```txt
critical
normal
low
```

### 底层机制

```txt
priorityQueueObject is iterable.
[Symbol.iterator]() creates a fresh iterator.
nextIndex is private progress state.
next() closes over nextIndex.
```

### 常见错误：返回 iterable 而不是 iterator

错误形状：

```js
// Goal:
// Show an invalid Symbol.iterator return value.

const brokenSourceObject = {
  [Symbol.iterator]() {
    return ["a", "b", "c"];
  },
};
```

原因：数组是 iterable，但这里必须返回 iterator。正确写法：

```js
// Goal:
// Return the array iterator, not the array itself.

const fixedSourceObject = {
  [Symbol.iterator]() {
    return ["a", "b", "c"][Symbol.iterator]();
  },
};
```

---

## 8. 类实例实现 iterable

### 结论

类本身不是 iterable。实例能不能被 `for...of` 消费，取决于实例或其原型链上有没有 `[Symbol.iterator]()`。

```js
// Goal:
// Implement an iterable class.

class NumberRangeCollection {
  constructor(startNumber, endNumber) {
    this.startNumber = startNumber;
    this.endNumber = endNumber;
  }

  [Symbol.iterator]() {
    let currentNumber = this.startNumber;
    const finalNumber = this.endNumber;

    return {
      next() {
        if (currentNumber <= finalNumber) {
          const resultValue = currentNumber;
          currentNumber += 1;
          return { value: resultValue, done: false };
        }

        return { value: undefined, done: true };
      },
    };
  }
}

const pageRange = new NumberRangeCollection(3, 6);

for (const pageNumber of pageRange) {
  console.log(pageNumber);
}
```

预期输出：

```txt
3
4
5
6
```

### 关键设计原则

每次调用 `[Symbol.iterator]()` 最好创建新的 iterator。这样多个循环不会共享进度。

### 反例：实例自己就是 iterator

```js
// Goal:
// Show a state-sharing iterator design.

class BrokenRangeCollection {
  constructor(startNumber, endNumber) {
    this.currentNumber = startNumber;
    this.endNumber = endNumber;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    if (this.currentNumber <= this.endNumber) {
      const resultValue = this.currentNumber;
      this.currentNumber += 1;
      return { value: resultValue, done: false };
    }

    return { value: undefined, done: true };
  }
}
```

这个写法能工作，但实例内部进度会被所有消费方共享，容易出现第二次循环没有内容的问题。

---

## 9. iterator 的状态性和一次性

### 结论

iterator 是有状态对象。它保存当前消费进度。被消费过的 iterator 通常不能自动重头开始。

```js
// Goal:
// Show that an iterator keeps progress.

const notificationList = ["email", "sms", "push"];
const notificationIterator = notificationList[Symbol.iterator]();

console.log(notificationIterator.next().value);

for (const notificationType of notificationIterator) {
  console.log(notificationType);
}

console.log(notificationIterator.next());
```

预期输出：

```txt
email
sms
push
{ value: undefined, done: true }
```

### 技术意义

这解释了数据流、分页游标、文件读取器为什么常常只能读取一次。它们不是集合，而是“当前进度 + 下一个值”的抽象。

### 判断方式

| 对象类型 | 是否通常可重复遍历 | 原因 |
|---|---:|---|
| Array | 是 | 每次 `[Symbol.iterator]()` 产生新 iterator。 |
| Set | 是 | 每次产生新 iterator。 |
| Map | 是 | 每次产生新 iterator。 |
| Array iterator | 否 | iterator 自己保存进度。 |
| Generator object | 否 | generator object 自己保存执行位置。 |

---

## 10. 消费 iterable 的语法和 API

### 结论

展开语法、解构、`Array.from()` 都消费 iterable，不是数组专属能力。

| 消费方式 | 背后机制 | 结果 |
|---|---|---|
| `for...of iterable` | 反复调用 iterator.next() | 逐个运行循环体 |
| `[...iterable]` | 消费全部值 | 新数组 |
| `const [a, b] = iterable` | 消费前几个值 | 变量绑定 |
| `Array.from(iterable)` | 消费全部值 | 新数组 |
| `yield* iterable` | 消费另一个 iterable | 逐个转交产出 |

### 示例

```js
// Goal:
// Consume different iterable values.

const statusSet = new Set(["queued", "running", "done"]);
const statusList = [...statusSet];

const titleText = "DEV";
const characterList = Array.from(titleText);

const scoreMap = new Map([
  ["quality", 95],
  ["speed", 88],
]);

const [[firstMetricName, firstMetricScore]] = scoreMap;

console.log(statusList);
console.log(characterList);
console.log(firstMetricName);
console.log(firstMetricScore);
```

预期输出：

```txt
[ 'queued', 'running', 'done' ]
[ 'D', 'E', 'V' ]
quality
95
```

### 重要警告：不要展开无限 iterable

```js
// Goal:
// This shape is unsafe because it consumes forever.

function* createInfiniteNumberGenerator() {
  let nextNumber = 1;

  while (true) {
    yield nextNumber;
    nextNumber += 1;
  }
}

// Do not do this.
// const numberList = [...createInfiniteNumberGenerator()];
```

展开语法会尝试消费全部值。无限序列没有“全部”。

---

## 11. 惰性 iterable 工具函数

### 结论

惰性 iterable 工具函数不会立刻生成完整数组，而是在消费时逐个计算。

### 对比数组方法

| 写法 | 求值方式 | 是否创建中间数组 |
|---|---|---:|
| `array.filter().map()` | 立即求值 | 是 |
| lazy iterable filter/map | 消费时求值 | 否 |
| iterator helpers | 消费时求值 | 否 |

### 手写 lazy map

```js
// Goal:
// Create a lazy mapped iterable.

function createMappedIterable(sourceIterable, transformItem) {
  return {
    [Symbol.iterator]() {
      const sourceIterator = sourceIterable[Symbol.iterator]();

      return {
        next() {
          const sourceResult = sourceIterator.next();

          if (sourceResult.done) {
            return { value: undefined, done: true };
          }

          return {
            value: transformItem(sourceResult.value),
            done: false,
          };
        },
      };
    },
  };
}
```

### 手写 lazy filter

```js
// Goal:
// Create a lazy filtered iterable.

function createFilteredIterable(sourceIterable, shouldKeepItem) {
  return {
    [Symbol.iterator]() {
      const sourceIterator = sourceIterable[Symbol.iterator]();

      return {
        next() {
          while (true) {
            const sourceResult = sourceIterator.next();

            if (sourceResult.done) {
              return { value: undefined, done: true };
            }

            if (shouldKeepItem(sourceResult.value)) {
              return { value: sourceResult.value, done: false };
            }
          }
        },
      };
    },
  };
}
```

### 项目用途

惰性 iterable 适合：

```txt
大数据列表
分页数据
日志流
树遍历
只取前 N 项
避免不必要的中间数组
```

---

## 12. 生成器函数基础

### 结论

生成器函数是创建 iterator 的语法工具。它把手写 `next()` 状态机改写成顺序代码。

### 语法形式

```txt
function* generatorName() { ... }
function* generatorName(parameters) { yield value; }
const generatorFunction = function* () { ... };
const object = { *methodName() { ... } };
class Example { *methodName() { ... } }
```

JavaScript 不支持箭头生成器函数。

### 基础示例

```js
// Goal:
// Verify basic generator execution.

function* createTaskStepGenerator() {
  console.log("generator started");
  yield "collect requirements";
  yield "build prototype";
  yield "review result";
  console.log("generator ended");
}

const taskStepGenerator = createTaskStepGenerator();

console.log("before first next");
console.log(taskStepGenerator.next());
console.log(taskStepGenerator.next());
console.log(taskStepGenerator.next());
console.log(taskStepGenerator.next());
```

预期输出：

```txt
before first next
generator started
{ value: 'collect requirements', done: false }
{ value: 'build prototype', done: false }
{ value: 'review result', done: false }
generator ended
{ value: undefined, done: true }
```

### 关键机制

| 动作 | 发生什么 |
|---|---|
| 调用生成器函数 | 不执行函数体，只返回 generator object。 |
| 第一次 `next()` | 从函数开头执行到第一个 `yield`。 |
| 后续 `next()` | 从上一次暂停点继续执行。 |
| 遇到 `yield` | 产出值并暂停。 |
| 函数结束 | 返回 `{ value: undefined, done: true }`。 |

---

## 13. `yield`、`next()`、暂停与恢复

### `yield` 的双重角色

```txt
yield value
  sends value out
  pauses generator

const received = yield prompt
  sends prompt out
  waits for next(value)
  next(value) becomes result of yield expression
```

### 执行跟踪

```js
// Goal:
// Trace generator next process.

function* createWorkflowGenerator() {
  const firstStep = "login";
  yield firstStep;

  const secondStep = "load-dashboard";
  yield secondStep;

  const thirdStep = "render-widgets";
  yield thirdStep;
}

const workflowGenerator = createWorkflowGenerator();

console.log(workflowGenerator.next());
console.log(workflowGenerator.next());
console.log(workflowGenerator.next());
console.log(workflowGenerator.next());
```

预期输出：

```txt
{ value: 'login', done: false }
{ value: 'load-dashboard', done: false }
{ value: 'render-widgets', done: false }
{ value: undefined, done: true }
```

### `yield` 不是 `return`

| 语法 | 是否结束生成器 | `for...of` 是否能看到值 |
|---|---:|---:|
| `yield value` | 否 | 是 |
| `return value` | 是 | 否 |

---

## 14. 无限序列和 `take()`

### 结论

生成器可以表示无限序列，因为它只在被消费时计算下一个值。

```js
// Goal:
// Use a generator to represent an infinite sequence safely.

function* createTicketNumberGenerator(startNumber) {
  let nextTicketNumber = startNumber;

  while (true) {
    yield nextTicketNumber;
    nextTicketNumber += 1;
  }
}

function* takeItems(sourceIterable, limitCount) {
  let usedCount = 0;

  for (const sourceItem of sourceIterable) {
    if (usedCount >= limitCount) {
      return;
    }

    yield sourceItem;
    usedCount += 1;
  }
}

const ticketNumberGenerator = createTicketNumberGenerator(5000);
const firstTicketNumbers = takeItems(ticketNumberGenerator, 4);

for (const ticketNumber of firstTicketNumbers) {
  console.log(ticketNumber);
}
```

预期输出：

```txt
5000
5001
5002
5003
```

### 判断规则

| 操作 | 对无限生成器是否安全 |
|---|---:|
| 手动 `next()` 几次 | 安全 |
| `takeItems(generator, n)` | 安全 |
| `for...of` 但内部 `break` | 条件安全 |
| `[...generator]` | 不安全 |
| `Array.from(generator)` | 不安全 |

---

## 15. `yield*` 委托迭代

### 结论

`yield* iterable` 不是产出 iterable 本身，而是逐个产出 iterable 里面的值。

```js
// Goal:
// Delegate iteration with yield star.

function* createCombinedMenuGenerator() {
  yield "home";
  yield* ["products", "pricing"];
  yield* new Set(["docs", "support"]);
  yield "contact";
}

for (const menuItem of createCombinedMenuGenerator()) {
  console.log(menuItem);
}
```

预期输出：

```txt
home
products
pricing
docs
support
contact
```

### `yield` vs `yield*`

| 写法 | 产出结果 |
|---|---|
| `yield ["a", "b"]` | 产出整个数组一个值 |
| `yield* ["a", "b"]` | 依次产出 `"a"`、`"b"` |

### 常见错误：在 callback 里 `yield`

```js
// Goal:
// This is invalid syntax.

function* createBrokenGenerator() {
  ["a", "b"].forEach((itemValue) => {
    // yield itemValue;
  });
}
```

`yield` 必须直接位于生成器函数的函数体内，不能出现在普通 callback 里。

---

## 16. 递归生成器和树遍历

### 结论

递归生成器适合把树结构转换成可顺序消费的序列。

```js
// Goal:
// Traverse a tree with a recursive generator.

const navigationTree = {
  label: "root",
  children: [
    {
      label: "products",
      children: [
        { label: "keyboard", children: [] },
        { label: "monitor", children: [] },
      ],
    },
    {
      label: "support",
      children: [{ label: "docs", children: [] }],
    },
  ],
};

function* walkTreePreOrder(treeNode) {
  yield treeNode.label;

  for (const childNode of treeNode.children) {
    yield* walkTreePreOrder(childNode);
  }
}

for (const nodeLabel of walkTreePreOrder(navigationTree)) {
  console.log(nodeLabel);
}
```

预期输出：

```txt
root
products
keyboard
monitor
support
docs
```

### 常见错误

```js
// Goal:
// This calls the child generator but does not consume it.

function* walkBrokenTree(treeNode) {
  yield treeNode.label;

  for (const childNode of treeNode.children) {
    walkBrokenTree(childNode);
  }
}
```

必须写 `yield* walkTreePreOrder(childNode)`，否则子生成器返回了 generator object，但没有人消费它。

### 项目场景

```txt
路由树
菜单树
评论树
文件树
组件树
AST 抽象语法树
```

---

## 17. 生成器 `return` 返回值

### 结论

生成器里的 `return value` 会结束生成器。手动 `next()` 能看到最终 `value`，但 `for...of` 会忽略它。

```js
// Goal:
// Compare yielded values with generator return value.

function* createReportSectionGenerator() {
  yield "summary";
  yield "details";
  return "report-complete";
}

const reportSectionGenerator = createReportSectionGenerator();

console.log(reportSectionGenerator.next());
console.log(reportSectionGenerator.next());
console.log(reportSectionGenerator.next());

for (const sectionName of createReportSectionGenerator()) {
  console.log(sectionName);
}
```

预期输出：

```txt
{ value: 'summary', done: false }
{ value: 'details', done: false }
{ value: 'report-complete', done: true }
summary
details
```

### 记忆规则

```txt
想让 for...of 看到，用 yield。
想结束生成器，用 return。
```

---

## 18. `yield` 表达式和 `next(value)`

### 结论

`yield` 是表达式。下一次 `next(value)` 传入的值，会成为上一个暂停点处 `yield` 表达式的结果。

```js
// Goal:
// Send values back into a generator with next(value).

function* createInteractiveScoreGenerator() {
  const firstScore = yield "first-score-request";
  const secondScore = yield "second-score-request";
  return firstScore + secondScore;
}

const scoreGenerator = createInteractiveScoreGenerator();

console.log(scoreGenerator.next());
console.log(scoreGenerator.next(40));
console.log(scoreGenerator.next(60));
```

预期输出：

```txt
{ value: 'first-score-request', done: false }
{ value: 'second-score-request', done: false }
{ value: 100, done: true }
```

### 调用和接收关系

| 调用 | 作用 |
|---|---|
| 第一次 `next()` | 启动生成器，运行到第一个 `yield`。 |
| 第二次 `next(40)` | 把 `40` 传回第一个 `yield` 表达式。 |
| 第三次 `next(60)` | 把 `60` 传回第二个 `yield` 表达式。 |

### 第一次 `next(value)` 为什么通常被忽略

生成器刚创建时还没有暂停在任何 `yield` 表达式上，所以第一次 `next(value)` 没有对应的接收位置。

---

## 19. `return()`、`throw()` 和清理逻辑

### `generator.return(value)`

作用：提前结束生成器。若生成器当前在 `try...finally` 中，会先执行 `finally`。

```js
// Goal:
// Verify generator return and cleanup behavior.

function* createFileLineGenerator() {
  try {
    yield "line-1";
    yield "line-2";
    yield "line-3";
  } finally {
    console.log("cleanup-complete");
  }
}

const fileLineGenerator = createFileLineGenerator();

console.log(fileLineGenerator.next());
console.log(fileLineGenerator.return("stopped"));
console.log(fileLineGenerator.next());
```

预期输出：

```txt
{ value: 'line-1', done: false }
cleanup-complete
{ value: 'stopped', done: true }
{ value: undefined, done: true }
```

### `generator.throw(error)`

作用：把异常注入到生成器暂停的位置。如果内部有 `try...catch`，可以捕获。

```js
// Goal:
// Inject an error into a paused generator.

function* createResettableCounterGenerator() {
  let currentCount = 0;

  while (true) {
    try {
      yield currentCount;
      currentCount += 1;
    } catch (counterError) {
      currentCount = 0;
      yield `reset:${counterError.message}`;
    }
  }
}

const counterGenerator = createResettableCounterGenerator();

console.log(counterGenerator.next());
console.log(counterGenerator.next());
console.log(counterGenerator.throw(new Error("manual-reset")));
console.log(counterGenerator.next());
```

预期输出：

```txt
{ value: 0, done: false }
{ value: 1, done: false }
{ value: 'reset:manual-reset', done: false }
{ value: 0, done: false }
```

### 使用判断

| API | 作用 | 常见场景 |
|---|---|---|
| `next()` | 正常推进 | 普通消费 |
| `return()` | 提前结束 | 释放资源、停止读取 |
| `throw()` | 注入异常 | 高级控制流、工具库内部 |

---

## 20. 异步迭代预习

### 结论

异步迭代是同步迭代模型的 Promise 版本。

```txt
sync iterable:
  Symbol.iterator
  iterator.next() returns IteratorResult
  for...of

async iterable:
  Symbol.asyncIterator
  asyncIterator.next() returns Promise<IteratorResult>
  for await...of
```

### 示例

```js
// Goal:
// Preview async generator and for await of.

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function* createAsyncLogGenerator() {
  await delay(10);
  yield "log-1";

  await delay(10);
  yield "log-2";
}

for await (const logMessage of createAsyncLogGenerator()) {
  console.log(logMessage);
}
```

预期输出：

```txt
log-1
log-2
```

### 对照表

| 同步迭代 | 异步迭代 |
|---|---|
| `[Symbol.iterator]()` | `[Symbol.asyncIterator]()` |
| `function*` | `async function*` |
| `for...of` | `for await...of` |
| `next()` 返回 result | `next()` 返回 Promise of result |

### 项目场景

```txt
网络响应流
文件流
WebSocket 消息
分页 API
后端日志流
```

---

## 21. Iterator helpers 预习

### 结论

Iterator helpers 让 iterator 可以像数组一样链式处理，但它们保持惰性。运行环境支持情况需要检查。

### 典型方法

```txt
iterator.map(callback)
iterator.filter(callback)
iterator.take(limit)
iterator.drop(count)
iterator.toArray()
Iterator.from(value)
```

### 预习示例

```js
// Goal:
// Preview iterator helpers if the runtime supports them.

const scoreIterator = [40, 80, 100, 55].values();

if (typeof scoreIterator.filter === "function") {
  const passingScoreLabels = scoreIterator
    .filter((scoreValue) => scoreValue >= 60)
    .map((scoreValue) => `score:${scoreValue}`);

  for (const scoreLabel of passingScoreLabels) {
    console.log(scoreLabel);
  }
} else {
  console.log("iterator-helpers-not-supported");
}
```

可能输出：

```txt
score:80
score:100
```

或者：

```txt
iterator-helpers-not-supported
```

### 和手写 lazy tools 的关系

| 手写工具 | Iterator helper |
|---|---|
| `createMappedIterable(source, transform)` | `iterator.map(transform)` |
| `createFilteredIterable(source, predicate)` | `iterator.filter(predicate)` |
| `takeItems(source, n)` | `iterator.take(n)` |

核心机制仍然是 iterable、iterator、`next()`、`value`、`done`。

---

## 22. 项目使用判断

### 什么时候用普通数组方法

```txt
数据量小。
需要完整结果数组。
需要随机访问 length / index。
转换链路简单。
```

### 什么时候用 iterable / generator

```txt
数据可以逐个产生。
不想提前创建完整数组。
可能只消费前 N 项。
数据源可能很大或无限。
需要表达树遍历、分页、日志、流。
想把复杂状态机写成顺序代码。
```

### 什么时候不要用生成器

```txt
只是普通同步数组转换。
团队不熟悉生成器，代码可读性会下降。
需要频繁随机访问元素。
异步业务流程可以直接用 async / await 更清楚。
```

### 常见真实场景映射

| 场景 | 合适模型 |
|---|---|
| 菜单树展开为列表 | 递归 generator |
| 分页 API 逐页取数据 | async generator |
| 从大日志中取前 100 条匹配项 | lazy filter + take |
| 生成自增 ID | 无限 generator + 手动 next |
| 遍历 Map 汇总结果 | `for...of map` |
| 把 Set 转成渲染列表 | `[...set]` 或 `Array.from(set)` |

---

## 23. 高频错误总表

| 错误 | 原因 | 正确模型 |
|---|---|---|
| 普通对象直接 `for...of` | 普通对象默认不是 iterable | 用 `Object.entries()` 或实现 `[Symbol.iterator]()` |
| `[Symbol.iterator]()` 返回数组 | 必须返回 iterator | 返回 `array[Symbol.iterator]()` |
| 把 iterator 当可重复集合 | iterator 保存进度 | 需要重新调用 iterable 的 `[Symbol.iterator]()` |
| 展开无限生成器 | 展开会消费全部值 | 用 `take()` 或手动 `next()` |
| 以为生成器函数调用会立即执行 | 调用只返回 generator object | 第一次 `next()` 才执行函数体 |
| 把 `yield` 当 `return` | `yield` 暂停，不结束 | `return` 才结束生成器 |
| 期待 `for...of` 读取 generator return value | `for...of` 忽略 `done: true` 的 value | 需要被循环看到就用 `yield` |
| 第一次 `next(value)` 期待被接收 | 还没有暂停点 | 第二次 `next(value)` 才传回第一个 `yield` |
| 在 `forEach()` callback 里写 `yield` | callback 不是生成器函数体 | 用 `for...of` 循环 |
| 忘记递归生成器里的 `yield*` | 调用了子生成器但没消费 | 写 `yield* childGenerator()` |
| 用 `for...of` 消费 async iterable | 协议不同 | 用 `for await...of` |
| 基础代码依赖 iterator helpers | 支持情况不稳定 | 先检查运行环境或手写兼容逻辑 |

---

## 24. 最终自检问题

学完第 12 章，你至少要能直接回答这些问题：

```txt
1. iterable 和 iterator 有什么区别？
2. for...of 背后到底调用了什么？
3. Symbol.iterator 是什么？为什么不用普通字符串属性名？
4. iterator.next() 必须返回什么？
5. { value, done } 里的 done 控制什么？
6. 为什么普通对象默认不能 for...of？
7. 如何让自己的对象支持 for...of？
8. iterator 为什么是有状态的一次性对象？
9. 为什么数组、字符串、Map、Set 都能被展开？
10. Array.from() 和 iterable 有什么关系？
11. 惰性求值解决什么问题？
12. generator function 和普通函数有什么不同？
13. 调用 generator function 为什么不会立即执行函数体？
14. yield 和 return 有什么区别？
15. generator object 为什么既是 iterator 又是 iterable？
16. 无限 generator 为什么不会立刻卡死？
17. 为什么展开无限 generator 会出问题？
18. yield* 到底产出什么？
19. 为什么不能在 forEach() callback 里写 yield？
20. 递归 generator 为什么适合遍历树？
21. generator 的 return value 为什么会被 for...of 忽略？
22. next(value) 传入的值会进入哪里？
23. 第一次 next(value) 的参数为什么通常会被忽略？
24. generator.return() 有什么用？
25. generator.throw() 如何改变执行流？
26. async iteration 和 sync iteration 的对应关系是什么？
27. Iterator helpers 和手写 lazy iterable 工具有什么关系？
28. generator、Map、Intl、ES Module 如何组合进真实小项目？
```

---

## 25. 最终记忆模型

```txt
Iterable:
  has [Symbol.iterator]()
  provides iterator

Iterator:
  has next()
  keeps progress
  returns { value, done }

for...of:
  consumes iterable
  calls next repeatedly
  stops when done is true

Generator function:
  function*
  calling it returns generator object
  body does not run immediately

Generator object:
  iterator + iterable
  next() resumes execution
  yield sends value out and pauses
  return ends generator

next(value):
  sends value back into paused yield expression

yield*:
  delegates to another iterable
  yields that iterable's values one by one

Lazy sequence:
  computes values only when consumed

Async iteration:
  Symbol.asyncIterator
  async function*
  for await...of
```

最后一句话：

```txt
迭代器让 JavaScript 拥有统一的取值协议；生成器让你不用手写复杂状态机，就能创建惰性、可组合、可暂停的序列。
```
