# JavaScript 迭代器与生成器学习指导文件

> 定位：这是《JavaScript 权威指南》第 12 章 “Iterators and Generators” 的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建练习目录、写代码、运行代码、观察输出，再把每节整理成最终学习笔记。  
> 参考：书上第 12 章、MDN Iterators and generators、MDN Iteration protocols、MDN `function*`、MDN `yield`、MDN `yield*`、MDN `for...of`。  
> 语言规则：正文统一中文；必要技术术语保留英文括号。  
> 代码规则：代码命名和代码注释统一英文；代码和代码注释不使用中文字符。  
> 学习原则：任何没学过的关键字、对象、协议、语法形式，第一次出现时必须解释它是什么、属于语法还是运行时机制、为什么要用、常见误区是什么。

---

## 目录

1. [本文件怎么用](#1-本文件怎么用)
2. [第 12 章完整学习顺序](#2-第-12-章完整学习顺序)
3. [本章先要建立的底层模型](#3-本章先要建立的底层模型)
4. [00：先观察内置可迭代对象](#4-00先观察内置可迭代对象)
5. [01：手动调用迭代器](#5-01手动调用迭代器)
6. [02：迭代协议和可迭代协议](#6-02迭代协议和可迭代协议)
7. [03：自定义可迭代对象](#7-03自定义可迭代对象)
8. [04：把类实现为可迭代对象](#8-04把类实现为可迭代对象)
9. [05：迭代器是有状态的一次性对象](#9-05迭代器是有状态的一次性对象)
10. [06：展开语法、解构、Array.from 和可迭代对象](#10-06展开语法解构arrayfrom-和可迭代对象)
11. [07：惰性 iterable 工具函数](#11-07惰性-iterable-工具函数)
12. [08：生成器函数基础](#12-08生成器函数基础)
13. [09：生成器对象和 next 执行过程](#13-09生成器对象和-next-执行过程)
14. [10：无限序列和 take 生成器](#14-10无限序列和-take-生成器)
15. [11：yield star 和委托迭代](#15-11yield-star-和委托迭代)
16. [12：递归生成器和树遍历](#16-12递归生成器和树遍历)
17. [13：生成器 return 返回值](#17-13生成器-return-返回值)
18. [14：yield 表达式和 next(value)](#18-14yield-表达式和-nextvalue)
19. [15：return()、throw() 和清理逻辑](#19-15returnthrow-和清理逻辑)
20. [16：异步迭代预习](#20-16异步迭代预习)
21. [17：现代 Iterator helpers 预习](#21-17现代-iterator-helpers-预习)
22. [18：小项目整合](#22-18小项目整合)
23. [最终文件清单](#23-最终文件清单)
24. [最终学习笔记转换要求](#24-最终学习笔记转换要求)
25. [本章最终要能回答的问题](#25-本章最终要能回答的问题)
26. [MDN 阅读清单](#26-mdn-阅读清单)
27. [本章最终记忆模型](#27-本章最终记忆模型)

---

## 1. 本文件怎么用

### 结论

这不是一份“看完就算学过”的文档。它是一个写代码的训练指导。你每学一节，都要创建对应目录，写入口文件，运行代码，看输出，再解释为什么这样输出。

迭代器与生成器不能只背定义。它的核心是：

- 数据源如何被逐个取值。
- `for...of` 背后到底调用了什么。
- 一个对象为什么能被展开、解构、传给 `Array.from()`。
- 生成器为什么能暂停执行，又从暂停处恢复。
- 惰性求值为什么适合处理序列、分页、日志、树结构和数据流。

### 每节固定学习步骤

每一节都按这个顺序做：

1. 先读结论。
2. 读清楚新关键字和新概念。
3. 创建文件结构。
4. 按示例写代码。
5. 运行入口文件。
6. 对照预期输出。
7. 按执行过程表格解释每一步。
8. 故意写一个错误版本，观察报错。
9. 把本节整理进最终学习笔记。

### 代码注释模板

每个 JS 文件顶部都写英文注释：

```js
// Goal:
// Verify how this iterator example works.

// Expected output:
// Replace this block with the output from the entry file.
```

### 运行环境建议

本章大部分示例不依赖浏览器 DOM，直接用 Node 运行即可：

```bash
node fileName.js
```

如果某个示例使用 ES Module 的 `import` / `export`，就在对应目录加一个 `package.json`：

```json
{
  "type": "module"
}
```

---

## 2. 第 12 章完整学习顺序

### 结论

本章按这个顺序学：

1. 先观察内置可迭代对象。
2. 手动调用迭代器的 `next()`。
3. 理解迭代协议（iterator protocol）。
4. 理解可迭代协议（iterable protocol）。
5. 实现自定义可迭代对象。
6. 把类实现为可迭代对象。
7. 理解迭代器的状态性和一次性。
8. 理解展开语法、解构、`Array.from()` 为什么能消费可迭代对象。
9. 写惰性 iterable 工具函数。
10. 学生成器函数（generator function）。
11. 理解 `yield` 暂停和恢复。
12. 写无限序列和 `take()`。
13. 学 `yield*` 委托迭代。
14. 用递归生成器遍历树。
15. 理解生成器 `return` 返回值。
16. 理解 `yield` 表达式接收 `next(value)` 传入的值。
17. 理解生成器的 `return()`、`throw()` 和清理逻辑。
18. 预习异步迭代。
19. 预习现代 Iterator helpers。
20. 做一个小项目整合。

### 技术意义

第 12 章不是在教一个孤立语法点，而是在补上 JavaScript 的“统一遍历模型”。数组、字符串、`Map`、`Set`、生成器、自定义类、DOM 集合、某些 Web API 对象，都可以通过同一套迭代协议被 `for...of`、展开语法、解构、`Array.from()` 消费。

### 本章不是简单语法

难点不是会不会写：

```js
for (const itemValue of itemList) {
  console.log(itemValue);
}
```

真正要掌握的是：

- `for...of` 不是“数组专用循环”。
- `for...of` 消费的是 iterable，不是普通对象。
- iterable 必须有 `[Symbol.iterator]()` 方法。
- `[Symbol.iterator]()` 必须返回 iterator。
- iterator 必须有 `next()` 方法。
- `next()` 必须返回 iterator result object。
- generator 是自动帮你创建 iterator 的语法。

---

## 3. 本章先要建立的底层模型

### 结论

迭代器与生成器的底层模型是：

```text
consumer
  calls Symbol.iterator
  gets iterator
  calls next repeatedly
  reads value and done
```

### 关键术语先解释

| 术语 | 解释 |
|---|---|
| 可迭代对象（iterable） | 拥有 `[Symbol.iterator]()` 方法的对象。 |
| 迭代器（iterator） | 拥有 `next()` 方法的对象。 |
| 迭代结果对象（iterator result object） | `next()` 返回的对象，通常包含 `value` 和 `done`。 |
| `Symbol.iterator` | 一个内置符号，作为可迭代协议的标准方法名。 |
| `for...of` | 消费 iterable 的循环语句。 |
| 生成器函数（generator function） | 使用 `function*` 定义、调用后返回 generator object 的函数。 |
| `yield` | 只能出现在生成器函数内部，用来暂停并产出值。 |
| 生成器对象（generator object） | 生成器函数调用后返回的对象，同时是 iterator 和 iterable。 |
| 惰性求值（lazy evaluation） | 值不是一次性全部算出，而是在被请求时才计算下一个。 |
| 委托迭代（delegated iteration） | `yield*` 把当前生成器的产出委托给另一个 iterable。 |

### 底层机制总图

```text
for...of
  -> calls iterable[Symbol.iterator]()
  -> receives iterator
  -> calls iterator.next()
  -> reads result.value
  -> stops when result.done is true
```

### 技术意义

这个模型能解释很多之前看起来无关的语法：

- 为什么数组能 `for...of`。
- 为什么字符串能 `for...of`。
- 为什么普通对象不能直接 `for...of`。
- 为什么 `Map` 迭代出来是键值对。
- 为什么生成器函数调用后不是立刻运行函数体。
- 为什么展开语法可以展开数组、字符串、`Set` 和生成器。

---

## 4. 00：先观察内置可迭代对象

### 结论

数组、字符串、`Map`、`Set` 都是内置可迭代对象。普通对象默认不是可迭代对象。

### 新关键字和新概念

#### `for...of`

`for...of` 是语句，不是方法。它用来从 iterable 中逐个取出值。

#### iterable

iterable 是一种协议能力，不是一种固定类。只要对象有正确的 `[Symbol.iterator]()` 方法，它就是 iterable。

### 文件结构

```text
00-built-in-iterables/
  builtInIterableApp.js
```

### `builtInIterableApp.js`

```js
// Goal:
// Observe built-in iterable values.

const productNameList = ["keyboard", "mouse", "monitor"];
const titleText = "JS";
const statusSet = new Set(["draft", "published"]);
const scoreMap = new Map([
  ["layout", 90],
  ["accessibility", 85],
]);

for (const productName of productNameList) {
  console.log(productName);
}

for (const characterText of titleText) {
  console.log(characterText);
}

for (const statusText of statusSet) {
  console.log(statusText);
}

for (const scoreEntry of scoreMap) {
  console.log(scoreEntry[0], scoreEntry[1]);
}
```

### 运行方式

```bash
node builtInIterableApp.js
```

### 预期输出

```text
keyboard
mouse
monitor
J
S
draft
published
layout 90
accessibility 85
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `for...of` 遇到数组，取得数组的默认 iterator。 |
| 2 | 每次循环读取一个数组元素。 |
| 3 | `for...of` 遇到字符串，取得字符串的默认 iterator。 |
| 4 | 每次循环读取一个字符。 |
| 5 | `Set` 按插入顺序产出成员。 |
| 6 | `Map` 按插入顺序产出 `[key, value]` 数组。 |

### 常见错误

错误：

```js
const profileRecord = { name: "Ada", role: "admin" };

for (const profileValue of profileRecord) {
  console.log(profileValue);
}
```

原因：普通对象默认没有 `[Symbol.iterator]()` 方法，所以不能直接被 `for...of` 消费。

### 和项目开发的关系

前端项目里经常要遍历数组、`Map`、`Set`、字符串和某些浏览器返回的集合。先知道哪些值天然可迭代，可以避免把 `for...of` 和 `for...in` 混用。

---

## 5. 01：手动调用迭代器

### 结论

`for...of` 的底层不是魔法。它本质上就是拿到 iterator，然后反复调用 `next()`。

### 新关键字和新概念

#### `next()`

`next()` 是 iterator 对象必须提供的方法。每调用一次，就请求下一个迭代结果。

#### iterator result object

`next()` 返回的对象叫 iterator result object，通常长这样：

```js
{ value: "keyboard", done: false }
```

当迭代结束时，通常长这样：

```js
{ value: undefined, done: true }
```

### 文件结构

```text
01-manual-iterator/
  manualIteratorApp.js
```

### `manualIteratorApp.js`

```js
// Goal:
// Manually call an iterator returned by Symbol.iterator.

const taskNameList = ["design", "build", "test"];
const taskIterator = taskNameList[Symbol.iterator]();

console.log(taskIterator.next());
console.log(taskIterator.next());
console.log(taskIterator.next());
console.log(taskIterator.next());
```

### 运行方式

```bash
node manualIteratorApp.js
```

### 预期输出

```text
{ value: 'design', done: false }
{ value: 'build', done: false }
{ value: 'test', done: false }
{ value: undefined, done: true }
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `taskNameList[Symbol.iterator]()` 返回数组 iterator。 |
| 2 | 第一次 `next()` 返回第一个元素。 |
| 3 | 第二次 `next()` 返回第二个元素。 |
| 4 | 第三次 `next()` 返回第三个元素。 |
| 5 | 第四次 `next()` 表示迭代结束。 |

### 技术意义

这一步非常关键：你不应该把 `for...of` 理解成“循环数组”。它的真正机制是“消费 iterator”。数组只是刚好实现了 iterable protocol。

### 常见错误

错误理解：

```text
for...of directly reads array indexes.
```

正确理解：

```text
for...of asks the value for an iterator, then calls next.
```

### 和项目开发的关系

很多框架和工具会提供“可迭代”的结果对象。你只要知道它实现了 iterator protocol，就可以用统一方式遍历它，而不用关心它内部是不是数组。

---

## 6. 02：迭代协议和可迭代协议

### 结论

迭代器章节最核心的规则只有两个：

1. iterable 必须有 `[Symbol.iterator]()` 方法。
2. iterator 必须有 `next()` 方法，并返回 `{ value, done }`。

### 新关键字和新概念

#### `Symbol.iterator`

`Symbol.iterator` 是 JavaScript 内置的 well-known symbol。它不是字符串，不是普通属性名。它是语言规定的“默认 iterator 方法名”。

#### well-known symbol

well-known symbol 是 JavaScript 语言预定义的一批特殊符号，用来让对象接入语言级行为。`Symbol.iterator` 让对象接入迭代行为。

### 文件结构

```text
02-iteration-protocols/
  protocolCheckApp.js
```

### `protocolCheckApp.js`

```js
// Goal:
// Check iterable and iterator protocol pieces.

const labelList = ["alpha", "beta"];
const labelIteratorFactory = labelList[Symbol.iterator];
const labelIterator = labelIteratorFactory.call(labelList);

console.log(typeof labelIteratorFactory);
console.log(typeof labelIterator.next);
console.log(labelIterator.next());
console.log(labelIterator.next());
console.log(labelIterator.next());
```

### 运行方式

```bash
node protocolCheckApp.js
```

### 预期输出

```text
function
function
{ value: 'alpha', done: false }
{ value: 'beta', done: false }
{ value: undefined, done: true }
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 数组对象上存在 `[Symbol.iterator]` 方法。 |
| 2 | 这个方法必须以数组作为 `this` 调用。 |
| 3 | 调用后得到 iterator。 |
| 4 | iterator 有 `next()` 方法。 |
| 5 | `next()` 返回迭代结果对象。 |

### 常见错误

错误：

```js
const brokenIteratorSource = {
  next() {
    return { value: "item", done: false };
  },
};

for (const itemValue of brokenIteratorSource) {
  console.log(itemValue);
}
```

原因：这个对象是 iterator-like，但不是 iterable。它没有 `[Symbol.iterator]()` 方法，所以不能被 `for...of` 直接消费。

### 和项目开发的关系

你以后遇到“某个对象不能展开”“某个对象不能 for...of”，第一反应应该是检查它是否实现了 `[Symbol.iterator]()`，而不是盲目转数组。

---

## 7. 03：自定义可迭代对象

### 结论

要让自己的对象支持 `for...of`，就给它定义 `[Symbol.iterator]()` 方法，并让这个方法返回 iterator。

### 文件结构

```text
03-custom-iterable-object/
  customIterableObjectApp.js
```

### `customIterableObjectApp.js`

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

### 运行方式

```bash
node customIterableObjectApp.js
```

### 预期输出

```text
critical
normal
low
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `for...of` 调用 `priorityQueueObject[Symbol.iterator]()`。 |
| 2 | 方法内部创建私有变量 `nextIndex`。 |
| 3 | 返回一个带有 `next()` 的对象。 |
| 4 | 每次循环都调用 `next()`。 |
| 5 | `nextIndex` 通过闭包保存迭代进度。 |
| 6 | 当索引越界时，返回 `done: true`。 |

### 技术意义

这段代码把几个旧知识串起来了：

- 对象方法。
- 计算属性名。
- `Symbol.iterator`。
- 闭包保存状态。
- `for...of` 消费 iterable。

### 常见错误

错误：

```js
const brokenSourceObject = {
  [Symbol.iterator]() {
    return ["a", "b", "c"];
  },
};

for (const itemValue of brokenSourceObject) {
  console.log(itemValue);
}
```

原因：`[Symbol.iterator]()` 必须返回 iterator，而数组本身是 iterable，不是数组 iterator。正确写法是返回数组的 iterator：

```js
const fixedSourceObject = {
  [Symbol.iterator]() {
    return ["a", "b", "c"][Symbol.iterator]();
  },
};
```

### 和项目开发的关系

自定义 iterable 的意义是让你的业务对象可以被语言原生语法消费。比如分页结果、树结构、日志序列、权限链，都可以设计成 iterable。

---

## 8. 04：把类实现为可迭代对象

### 结论

如果一个类表示“一段范围、一组节点、一批记录”，就可以考虑实现 `[Symbol.iterator]()`，让实例支持 `for...of`。

### 新关键字和新概念

#### class instance iterable

类本身不是 iterable，类的实例是否 iterable 取决于实例原型上有没有 `[Symbol.iterator]()` 方法。

### 文件结构

```text
04-iterable-class/
  numberRangeApp.js
```

### `numberRangeApp.js`

```js
// Goal:
// Implement an iterable class without generator syntax.

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

### 运行方式

```bash
node numberRangeApp.js
```

### 预期输出

```text
3
4
5
6
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `new NumberRangeCollection(3, 6)` 创建实例。 |
| 2 | `for...of` 查找实例的 `[Symbol.iterator]()`。 |
| 3 | 该方法返回一个 iterator。 |
| 4 | iterator 内部用 `currentNumber` 保存进度。 |
| 5 | 每次 `next()` 产出一个数字。 |
| 6 | 超出范围后 `done` 变成 `true`。 |

### 常见错误

不要把迭代状态放在实例本身上，除非你明确希望多个迭代共享进度。错误形状：

```js
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
      return { value: this.currentNumber++, done: false };
    }

    return { value: undefined, done: true };
  }
}
```

这个类的实例自己就是 iterator。它能工作，但多个循环会共享同一个 `currentNumber`，容易制造隐藏状态问题。

### 和项目开发的关系

很多业务类可以通过 iterable 提升可组合性。比如：

- 日期范围。
- 分页范围。
- 菜单树节点集合。
- 表格行集合。
- 搜索结果集合。

---

## 9. 05：迭代器是有状态的一次性对象

### 结论

iterator 不是数组。iterator 会记住当前进度。多数 iterator 被消费后不能自动重头再来。

### 文件结构

```text
05-stateful-iterator/
  statefulIteratorApp.js
```

### `statefulIteratorApp.js`

```js
// Goal:
// Verify that an iterator keeps its own progress.

const notificationList = ["email", "sms", "push"];
const notificationIterator = notificationList[Symbol.iterator]();

console.log(notificationIterator.next().value);

for (const notificationType of notificationIterator) {
  console.log(notificationType);
}

console.log(notificationIterator.next());
```

### 运行方式

```bash
node statefulIteratorApp.js
```

### 预期输出

```text
email
sms
push
{ value: undefined, done: true }
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 手动调用一次 `next()`，先消费了 `email`。 |
| 2 | `for...of` 接着消费同一个 iterator。 |
| 3 | 循环从 `sms` 开始，而不是从 `email` 重来。 |
| 4 | 循环结束后，iterator 已经完成。 |
| 5 | 再调用 `next()` 返回 `done: true`。 |

### 常见错误

错误理解：

```text
iterator is a reusable collection.
```

正确理解：

```text
iterator is a cursor over a sequence.
```

### 和项目开发的关系

这能解释为什么某些数据流、读取器、分页游标只能读取一次。它们不是完整集合，而是“当前位置 + 下一个值”的抽象。

---

## 10. 06：展开语法、解构、Array.from 和可迭代对象

### 结论

展开语法、数组解构、`Array.from()` 都会消费 iterable。它们不是数组专属能力。

### 文件结构

```text
06-consuming-iterables/
  consumingIterableApp.js
```

### `consumingIterableApp.js`

```js
// Goal:
// Consume iterable values with spread, destructuring, and Array.from.

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

### 运行方式

```bash
node consumingIterableApp.js
```

### 预期输出

```text
[ 'queued', 'running', 'done' ]
[ 'D', 'E', 'V' ]
quality
95
```

### 执行过程

| 语法 | 背后做什么 |
|---|---|
| `[...statusSet]` | 调用 `statusSet[Symbol.iterator]()` 并收集所有值。 |
| `Array.from(titleText)` | 消费字符串 iterator，创建数组。 |
| `const [[a, b]] = scoreMap` | 先消费 `Map` 的 iterator，再对第一项做数组解构。 |

### 常见错误

不要以为展开语法总是安全的。展开无限 iterable 会导致程序卡死或耗尽内存：

```js
function createInfiniteIterator() {
  let nextNumber = 0;

  return {
    next() {
      nextNumber += 1;
      return { value: nextNumber, done: false };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}

const allNumbers = [...createInfiniteIterator()];
console.log(allNumbers);
```

### 和项目开发的关系

你会经常把 `Set` 转成数组去渲染列表，或者把 `Map` 转成数组去排序。知道这些工具消费 iterable，可以让你写出更通用的数据处理函数。

---

## 11. 07：惰性 iterable 工具函数

### 结论

惰性 iterable 工具函数不会一次性创建完整结果数组，而是在被迭代时逐个计算值。

### 新关键字和新概念

#### lazy evaluation

惰性求值指“需要下一个值时才计算下一个值”。这和 `array.map()` 一次性生成新数组不同。

### 文件结构

```text
07-lazy-iterable-tools/
  lazyIterableToolsApp.js
```

### `lazyIterableToolsApp.js`

```js
// Goal:
// Build lazy map and filter iterable utilities.

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

const rawScoreList = [40, 80, 100, 55];
const passingScoreIterable = createFilteredIterable(rawScoreList, (scoreValue) => {
  return scoreValue >= 60;
});
const labelIterable = createMappedIterable(passingScoreIterable, (scoreValue) => {
  return `score:${scoreValue}`;
});

for (const scoreLabel of labelIterable) {
  console.log(scoreLabel);
}
```

### 运行方式

```bash
node lazyIterableToolsApp.js
```

### 预期输出

```text
score:80
score:100
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `createFilteredIterable()` 返回一个 iterable，不立即过滤。 |
| 2 | `createMappedIterable()` 返回一个 iterable，不立即映射。 |
| 3 | `for...of` 开始消费 `labelIterable`。 |
| 4 | 映射 iterable 请求过滤 iterable 的下一个值。 |
| 5 | 过滤 iterable 请求原始数组的下一个值。 |
| 6 | 找到通过条件的值后返回。 |
| 7 | 映射 iterable 再把它转换成标签。 |

### 技术意义

这段代码是生成器出现前的“手写版本”。生成器可以把这类代码大幅简化，因为生成器自动维护 `next()`、`value`、`done` 和暂停位置。

### 常见错误

不要把惰性 iterable 和数组混淆：

```js
const transformedIterable = createMappedIterable([1, 2, 3], (numberValue) => {
  return numberValue * 2;
});

console.log(transformedIterable.length);
```

这个值是 `undefined`，因为 iterable 不是数组。

### 和项目开发的关系

惰性处理适合大数据、分页、日志、流式处理和“只需要前几项”的场景。它避免在还没有必要时创建完整数组。

---

## 12. 08：生成器函数基础

### 结论

生成器函数使用 `function*` 定义。调用生成器函数不会立即执行函数体，而是返回 generator object。调用 generator object 的 `next()` 才会推进执行。

### 新关键字和新概念

#### `function*`

`function*` 是定义生成器函数的语法。它不是普通函数。

#### `yield`

`yield` 只能直接出现在生成器函数内部。它会暂停生成器执行，并把一个值交给调用方。

#### generator object

生成器函数调用后返回的对象。它既是 iterator，也是 iterable。

### 文件结构

```text
08-generator-basics/
  generatorBasicsApp.js
```

### `generatorBasicsApp.js`

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

### 运行方式

```bash
node generatorBasicsApp.js
```

### 预期输出

```text
before first next
generator started
{ value: 'collect requirements', done: false }
{ value: 'build prototype', done: false }
{ value: 'review result', done: false }
generator ended
{ value: undefined, done: true }
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 调用 `createTaskStepGenerator()`，函数体没有立即执行。 |
| 2 | 返回一个 generator object。 |
| 3 | 第一次 `next()` 才进入函数体。 |
| 4 | 执行到第一个 `yield` 后暂停。 |
| 5 | 第二次 `next()` 从暂停点继续。 |
| 6 | 所有 `yield` 结束后，继续执行剩余代码。 |
| 7 | 函数结束，返回 `done: true`。 |

### 常见错误

错误：

```js
const createBrokenGenerator = *() => {
  yield 1;
};
```

原因：JavaScript 不支持箭头生成器函数。生成器必须用 `function*`、生成器函数表达式、对象方法简写或类方法简写来定义。

### 和项目开发的关系

生成器适合把“手写 iterator 状态机”变成顺序代码。以后学异步、数据流、构建工具、测试工具时，经常会看到类似思想。

---

## 13. 09：生成器对象和 next 执行过程

### 结论

生成器对象的 `next()` 每次推进一次执行。`yield` 产出的值会成为本次 `next()` 返回对象的 `value`。

### 文件结构

```text
09-generator-next-process/
  generatorNextProcessApp.js
```

### `generatorNextProcessApp.js`

```js
// Goal:
// Trace how next moves through yield points.

function* createWorkflowGenerator() {
  const firstStep = "login";
  yield firstStep;

  const secondStep = "load-dashboard";
  yield secondStep;

  const thirdStep = "render-widgets";
  yield thirdStep;
}

const workflowGenerator = createWorkflowGenerator();

const firstResult = workflowGenerator.next();
const secondResult = workflowGenerator.next();
const thirdResult = workflowGenerator.next();
const fourthResult = workflowGenerator.next();

console.log(firstResult.value, firstResult.done);
console.log(secondResult.value, secondResult.done);
console.log(thirdResult.value, thirdResult.done);
console.log(fourthResult.value, fourthResult.done);
```

### 运行方式

```bash
node generatorNextProcessApp.js
```

### 预期输出

```text
login false
load-dashboard false
render-widgets false
undefined true
```

### 执行过程

| `next()` 次数 | 执行范围 | 返回结果 |
|---|---|---|
| 第一次 | 从函数开头到第一个 `yield` | `{ value: "login", done: false }` |
| 第二次 | 从第一个 `yield` 后到第二个 `yield` | `{ value: "load-dashboard", done: false }` |
| 第三次 | 从第二个 `yield` 后到第三个 `yield` | `{ value: "render-widgets", done: false }` |
| 第四次 | 从第三个 `yield` 后到函数结束 | `{ value: undefined, done: true }` |

### 常见错误

不要以为 `yield` 和 `return` 一样会结束函数。`yield` 是暂停，下一次 `next()` 会继续执行。`return` 才会完成生成器。

### 和项目开发的关系

这套机制能表达“分步生产值”。例如表格虚拟滚动、分页读取、按需计算、遍历树结构、测试用例生成，都可以靠生成器减少手写状态变量。

---

## 14. 10：无限序列和 take 生成器

### 结论

生成器可以表示无限序列，因为它不是一次性创建所有值，而是需要时才产出下一个值。

### 文件结构

```text
10-infinite-sequence-and-take/
  infiniteSequenceApp.js
```

### `infiniteSequenceApp.js`

```js
// Goal:
// Use generators to represent an infinite sequence safely.

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

### 运行方式

```bash
node infiniteSequenceApp.js
```

### 预期输出

```text
5000
5001
5002
5003
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `createTicketNumberGenerator(5000)` 创建无限生成器。 |
| 2 | `takeItems(..., 4)` 创建限制数量的生成器。 |
| 3 | `for...of` 消费 `firstTicketNumbers`。 |
| 4 | `takeItems` 从无限生成器请求值。 |
| 5 | 产出 4 个值后 `return` 结束。 |
| 6 | 无限生成器没有被展开成无限数组。 |

### 常见错误

不要对无限生成器使用展开语法：

```js
const allTicketNumbers = [...createTicketNumberGenerator(1)];
console.log(allTicketNumbers);
```

这会无限消费，导致程序无法正常结束。

### 和项目开发的关系

无限序列不只是数学玩具。实际项目里也有类似模型：

- 自增 ID。
- 重试次数。
- 分页游标。
- 持续日志。
- 数据流事件。

---

## 15. 11：yield star 和委托迭代

### 结论

`yield*` 用来把当前生成器的产出委托给另一个 iterable。它不是产出 iterable 本身，而是逐个产出 iterable 里的值。

### 新关键字和新概念

#### `yield*`

`yield* sourceIterable` 会取得 `sourceIterable` 的 iterator，然后逐个 `yield` 其中的值。

### 文件结构

```text
11-yield-star/
  yieldStarApp.js
```

### `yieldStarApp.js`

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

### 运行方式

```bash
node yieldStarApp.js
```

### 预期输出

```text
home
products
pricing
docs
support
contact
```

### 执行过程

| 代码 | 行为 |
|---|---|
| `yield "home"` | 产出一个普通值。 |
| `yield* ["products", "pricing"]` | 逐个产出数组元素。 |
| `yield* new Set(...)` | 逐个产出 `Set` 成员。 |
| `yield "contact"` | 继续产出当前生成器自己的值。 |

### 常见错误

错误：

```js
function* createBrokenMenuGenerator() {
  ["products", "pricing"].forEach((menuItem) => {
    yield menuItem;
  });
}
```

原因：`yield` 只能直接出现在生成器函数内部。这里的 `yield` 位于普通箭头函数内部，不在外层生成器函数的直接函数体中。

### 和项目开发的关系

`yield*` 非常适合组合多个数据源，例如：

- 多个菜单区域组合成一个导航序列。
- 多个分页结果组合成一个结果序列。
- 多个子树遍历结果组合成一个树遍历序列。

---

## 16. 12：递归生成器和树遍历

### 结论

递归生成器适合遍历树结构。`yield*` 可以把子节点的遍历结果委托出去，让代码保持顺序而清晰。

### 文件结构

```text
12-recursive-generator/
  treeTraversalApp.js
```

### `treeTraversalApp.js`

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
      children: [
        { label: "docs", children: [] },
      ],
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

### 运行方式

```bash
node treeTraversalApp.js
```

### 预期输出

```text
root
products
keyboard
monitor
support
docs
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 先产出当前节点 `root`。 |
| 2 | 遍历 `root.children`。 |
| 3 | 遇到 `products`，递归调用 `walkTreePreOrder(products)`。 |
| 4 | `yield*` 把子生成器产出的每个值继续交给外层调用方。 |
| 5 | 依次遍历所有子树。 |

### 常见错误

不要在递归生成器里忘记 `yield*`：

```js
function* walkBrokenTree(treeNode) {
  yield treeNode.label;

  for (const childNode of treeNode.children) {
    walkBrokenTree(childNode);
  }
}
```

这段代码会调用子生成器函数，但没有消费它返回的 generator object，所以子节点不会被产出。

### 和项目开发的关系

树结构在前端里非常常见：

- 路由树。
- 菜单树。
- 评论树。
- 文件树。
- 组件树。
- AST 抽象语法树。

生成器让树遍历可以被当成普通序列使用。

---

## 17. 13：生成器 return 返回值

### 结论

生成器里的 `return` 会结束生成器，并让最后一次手动 `next()` 得到 `{ done: true, value: returnValue }`。但是 `for...of` 会忽略这个最终返回值。

### 文件结构

```text
13-generator-return-value/
  generatorReturnValueApp.js
```

### `generatorReturnValueApp.js`

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

### 运行方式

```bash
node generatorReturnValueApp.js
```

### 预期输出

```text
{ value: 'summary', done: false }
{ value: 'details', done: false }
{ value: 'report-complete', done: true }
summary
details
```

### 执行过程

| 消费方式 | 结果 |
|---|---|
| 手动 `next()` | 可以看到最终 `return` 值。 |
| `for...of` | 只消费 `done: false` 的值，忽略最终 `return` 值。 |

### 常见错误

不要把生成器的 `return` 当成普通迭代值。如果希望某个值被 `for...of` 看到，就必须用 `yield` 产出它。

### 和项目开发的关系

这能避免一个很隐蔽的问题：你在生成器末尾 `return finalValue`，然后期待循环能拿到它。循环不会拿到它。

---

## 18. 14：yield 表达式和 next(value)

### 结论

`yield` 不只是语句，它也是表达式。下一次调用 `next(value)` 传入的值，会成为上一个暂停点处 `yield` 表达式的结果。

### 文件结构

```text
14-yield-expression-next-value/
  yieldExpressionApp.js
```

### `yieldExpressionApp.js`

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

### 运行方式

```bash
node yieldExpressionApp.js
```

### 预期输出

```text
{ value: 'first-score-request', done: false }
{ value: 'second-score-request', done: false }
{ value: 100, done: true }
```

### 执行过程

| 调用 | 发生什么 |
|---|---|
| `scoreGenerator.next()` | 启动生成器，执行到第一个 `yield`，产出请求文本。 |
| `scoreGenerator.next(40)` | 把 `40` 作为第一个 `yield` 表达式的结果，赋给 `firstScore`。 |
| `scoreGenerator.next(60)` | 把 `60` 作为第二个 `yield` 表达式的结果，赋给 `secondScore`，然后返回总和。 |

### 常见错误

第一次 `next(value)` 传入的值通常不会被函数体接收，因为生成器还没有暂停在任何 `yield` 表达式上。

```js
function* createSinglePromptGenerator() {
  const receivedValue = yield "prompt";
  return receivedValue;
}

const promptGenerator = createSinglePromptGenerator();
console.log(promptGenerator.next("ignored"));
console.log(promptGenerator.next("accepted"));
```

### 和项目开发的关系

这个机制很强大，但日常前端开发不建议滥用。它适合理解生成器控制流、测试协程模型、构建高级工具。异步流程在现代 JavaScript 里优先使用 `async` / `await`。

---

## 19. 15：return()、throw() 和清理逻辑

### 结论

生成器对象除了 `next()`，还有 `return()` 和 `throw()`。`return()` 可以提前结束生成器；`throw()` 可以把异常注入到生成器暂停的位置。

### 新关键字和新概念

#### `generator.return(value)`

它会让生成器提前完成，常和 `finally` 配合做清理。

#### `generator.throw(error)`

它会让生成器在暂停点抛出异常。如果生成器内部有 `try...catch`，可以捕获它。

### 文件结构

```text
15-generator-return-throw/
  generatorReturnThrowApp.js
```

### `generatorReturnThrowApp.js`

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

### 运行方式

```bash
node generatorReturnThrowApp.js
```

### 预期输出

```text
{ value: 'line-1', done: false }
cleanup-complete
{ value: 'stopped', done: true }
{ value: undefined, done: true }
{ value: 0, done: false }
{ value: 1, done: false }
{ value: 'reset:manual-reset', done: false }
{ value: 0, done: false }
```

### 执行过程

| 代码 | 发生什么 |
|---|---|
| `fileLineGenerator.return("stopped")` | 提前终止生成器。 |
| `finally` | 在终止前执行清理逻辑。 |
| `counterGenerator.throw(...)` | 在暂停点抛出异常。 |
| `catch` | 捕获异常并重置计数器。 |

### 常见错误

不要把 `throw()` 当成普通函数错误处理的首选工具。它是生成器控制流的高级能力。日常业务异常仍然优先用普通 `throw new Error(...)` 和 `try...catch`。

### 和项目开发的关系

理解 `return()` 和 `finally` 很重要，因为中途停止迭代时，某些 iterator 可能需要释放资源，比如关闭读取器、取消订阅、释放锁。即使你不常手写，也要能读懂工具库代码。

---

## 20. 16：异步迭代预习

### 结论

异步迭代（async iteration）是同步迭代模型的异步版本。它使用 `Symbol.asyncIterator`、`async function*` 和 `for await...of`。这一节只是预习，系统学习放到异步章节。

### 新关键字和新概念

#### `Symbol.asyncIterator`

异步可迭代协议使用的标准方法名。

#### `async function*`

异步生成器函数。它产出的是异步序列，每次 `next()` 返回 Promise。

#### `for await...of`

用来消费 async iterable 的循环语句。它只能出现在允许使用 `await` 的上下文中。

### 文件结构

```text
16-async-iteration-preview/
  asyncIterationPreview.mjs
```

### `asyncIterationPreview.mjs`

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

### 运行方式

```bash
node asyncIterationPreview.mjs
```

### 预期输出

```text
log-1
log-2
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `createAsyncLogGenerator()` 返回 async generator。 |
| 2 | `for await...of` 请求下一个值。 |
| 3 | 生成器内部等待 Promise。 |
| 4 | `yield` 产出异步结果。 |
| 5 | 循环继续请求下一个值。 |

### 常见错误

不要把 `for...of` 和 `for await...of` 混用。同步 iterable 用 `for...of`；async iterable 用 `for await...of`。

### 和项目开发的关系

异步迭代常用于流式数据：

- 网络响应流。
- 文件流。
- WebSocket 消息。
- 分页 API。
- 后端日志流。

---

## 21. 17：现代 Iterator helpers 预习

### 结论

MDN 已经把 `Iterator` 对象和 iterator helper methods 作为现代 JavaScript 内容整理出来。它们让 iterator 可以像数组一样链式调用 `map()`、`filter()`、`take()` 等方法。但这一组能力比较新，学习时先掌握核心协议，再作为现代扩展了解。

### 新关键字和新概念

#### `Iterator`

现代 JavaScript 中的 `Iterator` 是一个全局对象，用来表示 iterator 原型和 helper 方法相关能力。内置 iterator 继承相关原型能力。

#### iterator helper methods

这类方法让 iterator 可以惰性地转换、筛选、截断序列。它们的思想和本章手写的惰性工具函数一致。

### 文件结构

```text
17-iterator-helpers-preview/
  iteratorHelpersPreview.js
```

### `iteratorHelpersPreview.js`

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

### 运行方式

```bash
node iteratorHelpersPreview.js
```

### 可能输出

```text
score:80
score:100
```

或者：

```text
iterator-helpers-not-supported
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `[40, 80, 100, 55].values()` 返回数组 iterator。 |
| 2 | 检查运行环境是否支持 `filter()` helper。 |
| 3 | 支持时，链式创建惰性转换序列。 |
| 4 | 不支持时，输出降级提示。 |

### 常见错误

不要在基础练习阶段依赖 iterator helpers。它们很方便，但核心机制仍然是 iterable、iterator、`next()`、`value`、`done`。

### 和项目开发的关系

iterator helpers 的设计方向说明：JavaScript 正在把“惰性序列处理”变成更标准的能力。你现在手写 `mapIterable()`、`filterIterable()`，不是白学，而是在理解这些新 API 背后的机制。

---

## 22. 18：小项目整合

### 结论

最后用一个小项目把模块、标准库、迭代器、生成器连接起来：实现一个可迭代的分页结果处理器。

### 项目目标

输入一组订单数据，按批次惰性产出，每个批次再格式化为展示文本。这个项目练习：

- ES Module。
- `function*`。
- `yield`。
- `yield*`。
- 自定义 iterable。
- `Map`。
- `Intl.NumberFormat`。
- `for...of`。

### 文件结构

```text
18-mini-practice-project/
  package.json
  data/orderRecords.js
  iterables/batchIterable.js
  iterables/orderFormatterGenerator.js
  app.js
```

### `package.json`

```json
{
  "type": "module"
}
```

### `data/orderRecords.js`

```js
// Goal:
// Export sample order records.

export const orderRecordList = [
  { id: "ORD-001", region: "north", amount: 120 },
  { id: "ORD-002", region: "south", amount: 80 },
  { id: "ORD-003", region: "north", amount: 200 },
  { id: "ORD-004", region: "west", amount: 50 },
  { id: "ORD-005", region: "south", amount: 160 },
];
```

### `iterables/batchIterable.js`

```js
// Goal:
// Export a generator that yields batches from a source list.

export function* createBatchGenerator(sourceList, batchSize) {
  for (let startIndex = 0; startIndex < sourceList.length; startIndex += batchSize) {
    yield sourceList.slice(startIndex, startIndex + batchSize);
  }
}
```

### `iterables/orderFormatterGenerator.js`

```js
// Goal:
// Export generators that format order batches and summaries.

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function* createOrderLineGenerator(orderBatch) {
  for (const orderRecord of orderBatch) {
    yield `${orderRecord.id}:${orderRecord.region}:${currencyFormatter.format(orderRecord.amount)}`;
  }
}

export function* createRegionSummaryGenerator(orderRecords) {
  const regionTotalMap = new Map();

  for (const orderRecord of orderRecords) {
    const previousTotal = regionTotalMap.get(orderRecord.region) ?? 0;
    regionTotalMap.set(orderRecord.region, previousTotal + orderRecord.amount);
  }

  for (const [regionName, totalAmount] of regionTotalMap) {
    yield `${regionName}:${currencyFormatter.format(totalAmount)}`;
  }
}
```

### `app.js`

```js
// Goal:
// Compose modules, generators, and iterable processing.

import { orderRecordList } from "./data/orderRecords.js";
import { createBatchGenerator } from "./iterables/batchIterable.js";
import {
  createOrderLineGenerator,
  createRegionSummaryGenerator,
} from "./iterables/orderFormatterGenerator.js";

for (const orderBatch of createBatchGenerator(orderRecordList, 2)) {
  console.log("batch-start");

  for (const orderLine of createOrderLineGenerator(orderBatch)) {
    console.log(orderLine);
  }
}

console.log("summary-start");

for (const summaryLine of createRegionSummaryGenerator(orderRecordList)) {
  console.log(summaryLine);
}
```

### 运行方式

```bash
node app.js
```

### 预期输出

```text
batch-start
ORD-001:north:$120.00
ORD-002:south:$80.00
batch-start
ORD-003:north:$200.00
ORD-004:west:$50.00
batch-start
ORD-005:south:$160.00
summary-start
north:$320.00
south:$240.00
west:$50.00
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `app.js` 导入订单数据和生成器函数。 |
| 2 | `createBatchGenerator(orderRecordList, 2)` 惰性产出批次。 |
| 3 | 外层 `for...of` 每次拿到一个批次数组。 |
| 4 | `createOrderLineGenerator(orderBatch)` 逐条格式化订单。 |
| 5 | `createRegionSummaryGenerator(orderRecordList)` 用 `Map` 汇总地区金额。 |
| 6 | 最后用 `for...of` 逐条输出汇总文本。 |

### 项目意义

这个小项目把前面章节连接起来：

- 模块负责组织文件。
- 标准库负责格式化和汇总。
- 生成器负责惰性产出数据。
- `for...of` 作为统一消费方式。

---

## 23. 最终文件清单

```text
javascript-iterators-generators-learning/
  00-built-in-iterables/
    builtInIterableApp.js

  01-manual-iterator/
    manualIteratorApp.js

  02-iteration-protocols/
    protocolCheckApp.js

  03-custom-iterable-object/
    customIterableObjectApp.js

  04-iterable-class/
    numberRangeApp.js

  05-stateful-iterator/
    statefulIteratorApp.js

  06-consuming-iterables/
    consumingIterableApp.js

  07-lazy-iterable-tools/
    lazyIterableToolsApp.js

  08-generator-basics/
    generatorBasicsApp.js

  09-generator-next-process/
    generatorNextProcessApp.js

  10-infinite-sequence-and-take/
    infiniteSequenceApp.js

  11-yield-star/
    yieldStarApp.js

  12-recursive-generator/
    treeTraversalApp.js

  13-generator-return-value/
    generatorReturnValueApp.js

  14-yield-expression-next-value/
    yieldExpressionApp.js

  15-generator-return-throw/
    generatorReturnThrowApp.js

  16-async-iteration-preview/
    asyncIterationPreview.mjs

  17-iterator-helpers-preview/
    iteratorHelpersPreview.js

  18-mini-practice-project/
    package.json
    data/orderRecords.js
    iterables/batchIterable.js
    iterables/orderFormatterGenerator.js
    app.js

  javascript-iterators-generators-learning-notes.md
```

---

## 24. 最终学习笔记转换要求

每一节最终整理成学习笔记时，固定使用这个结构：

1. 结论。
2. 技术意义。
3. 关键字解释。
4. 底层机制。
5. 文件结构。
6. 代码示例。
7. 运行方式。
8. 预期输出。
9. 执行过程。
10. 常见错误 / 反例。
11. 和项目开发的关系。
12. 最终记忆模型。

### 语言要求

- 正文说明：中文。
- 技术术语：中文后面补英文。
- 代码命名：英文。
- 代码注释：英文。
- 不要中英文标题混用。

### 代码命名要求

- 不要反复使用 `fn`、`obj`、`data`、`user` 这种泛名。
- 每个例子用有业务含义的命名。
- 不同主题尽量避免重复函数名、变量名、类名。

---

## 25. 本章最终要能回答的问题

学完第 12 章，你应该能回答：

1. iterable 和 iterator 有什么区别？
2. `for...of` 背后到底调用了什么？
3. `Symbol.iterator` 是什么？为什么不用普通字符串属性名？
4. iterator 的 `next()` 必须返回什么？
5. `{ value, done }` 里的 `done` 到底控制什么？
6. 为什么普通对象默认不能 `for...of`？
7. 如何让自己的对象支持 `for...of`？
8. 为什么 iterator 是有状态的？
9. 为什么 iterator 通常只能消费一次？
10. 为什么数组、字符串、`Map`、`Set` 都能被展开？
11. `Array.from()` 和 iterable 有什么关系？
12. 惰性求值解决什么问题？
13. 生成器函数和普通函数有什么不同？
14. 调用生成器函数为什么不会立即执行函数体？
15. `yield` 和 `return` 有什么区别？
16. 生成器对象为什么既是 iterator 又是 iterable？
17. 无限生成器为什么不会立刻卡死？
18. 为什么展开无限生成器会出问题？
19. `yield*` 到底产出什么？
20. 为什么不能在 `forEach()` 的回调里写 `yield`？
21. 递归生成器为什么适合遍历树？
22. 生成器里的 `return` 值为什么会被 `for...of` 忽略？
23. `next(value)` 传入的值会进入哪里？
24. 第一次 `next(value)` 的参数为什么通常会被忽略？
25. `generator.return()` 有什么用？
26. `generator.throw()` 是怎么改变生成器执行流的？
27. 异步迭代和同步迭代的对应关系是什么？
28. Iterator helpers 和手写惰性 iterable 工具有什么关系？
29. 生成器和模块、标准库如何一起用于真实项目？

---

## 26. MDN 阅读清单

先完成本文件的练习，再看 MDN 补完整规则和兼容性。

- Iteration protocols: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
- Iterators and generators: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators
- `for...of`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
- `Symbol.iterator`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
- `function*`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function%2A
- `yield`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
- `yield*`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield%2A
- `Generator`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
- `Generator.prototype.next()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next
- `Generator.prototype.return()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return
- `for await...of`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
- `Symbol.asyncIterator`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator
- `Iterator`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
- `Iterator.from()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/from
- `Iterator.prototype.map()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map

---

## 27. 本章最终记忆模型

最后记住这个模型：

```text
Iterable
  owns Symbol.iterator
  returns Iterator

Iterator
  owns next
  returns IteratorResult

IteratorResult
  has value
  has done

for...of
  consumes Iterable
  repeats next
  stops when done is true

Generator function
  creates Generator object
  does not run immediately
  runs when next is called
  pauses at yield
  resumes after yield

Generator object
  is Iterator
  is Iterable

yield
  sends value out
  pauses execution

next(value)
  resumes execution
  sends value back into yield expression

yield star
  delegates to another Iterable

Lazy sequence
  computes values only when consumed
```

专业学习目标不是“知道有 `function*`”，而是：

1. 我能解释 `for...of` 的运行机制。
2. 我能手写 iterable 和 iterator。
3. 我能判断一个值为什么能或不能被迭代。
4. 我能用生成器简化手写 iterator 状态机。
5. 我能用惰性序列处理数据，而不是无脑创建中间数组。
6. 我能看懂 `yield`、`yield*`、`next(value)`、`return()`、`throw()` 的控制流。
7. 我能把模块、标准库、生成器组合成真实的小工具。
