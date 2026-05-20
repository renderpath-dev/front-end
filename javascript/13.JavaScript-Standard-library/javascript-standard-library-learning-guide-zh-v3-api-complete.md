# JavaScript 标准库学习指导文件 v3（API 细节补全版）

> 定位：这是第 11 章“JavaScript 标准库”的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建练习目录、写代码、运行代码、观察输出，再把每节整理成最终学习笔记。  
> 参考范围：《JavaScript 权威指南》第 11 章，以及 MDN 对应 API 参考页。  
> 语言规则：正文统一中文；必要技术术语保留英文括号。  
> 代码规则：代码命名和代码注释统一英文；代码和代码注释不使用中文字符。  
> 学习原则：先理解每个内置对象的“数据模型”，再记方法名。不要把标准库学成 API 词典。


> v3 修订说明：本版在 v2 基础上补齐此前容易漏掉的 API 参数签名、固定属性名、固定方法名、返回值、是否修改原对象、同名方法区别、IDE 提示和常见误解。尤其补充 `Set` / `Map` / `WeakMap` / `TypedArray` / `DataView` / `RegExp` / `Date` / `Error` / `JSON` / `Intl` / `console` / `URLSearchParams` / `setTimeout` / `setInterval` 的细节。

---

## 目录

1. [本文件怎么用](#1-本文件怎么用)
2. [第 11 章标准库的完整学习顺序](#2-第-11-章标准库的完整学习顺序)
3. [本章先要建立的底层模型](#3-本章先要建立的底层模型)
4. [00：标准库是什么](#4-00标准库是什么)
5. [01：Set](#5-01set)
6. [02：Map](#6-02map)
7. [03：WeakMap 和 WeakSet](#7-03weakmap-和-weakset)
8. [04：ArrayBuffer、定型数组和 DataView](#8-04arraybuffer定型数组和-dataview)
9. [05：RegExp 和字符串模式方法](#9-05regexp-和字符串模式方法)
10. [06：Date 和时间戳](#10-06date-和时间戳)
11. [07：Error 和错误对象](#11-07error-和错误对象)
12. [08：JSON 序列化和解析](#12-08json-序列化和解析)
13. [09：Intl 国际化格式化](#13-09intl-国际化格式化)
14. [10：console 调试 API](#14-10console-调试-api)
15. [11：URL 和 URLSearchParams](#15-11url-和-urlsearchparams)
16. [12：setTimeout 和 setInterval](#16-12settimeout-和-setinterval)
17. [13：小项目整合](#17-13小项目整合)
18. [最终文件清单](#18-最终文件清单)
19. [最终学习笔记转换要求](#19-最终学习笔记转换要求)
20. [本章最终要能回答的问题](#20-本章最终要能回答的问题)
21. [MDN 阅读清单](#21-mdn-阅读清单)
22. [第 11 章最终记忆模型](#22-第-11-章最终记忆模型)

---

## 1. 本文件怎么用

### 结论

这不是一份“看完就算学过”的文档。它是一个写代码的训练指导。你每学一节，都要创建对应目录，写一个或多个 JS 文件，运行入口文件，观察输出，再解释为什么这样输出。

标准库不能靠背方法名学。标准库的本质是：

```txt
某种内置对象
  -> 解决某类数据问题
  -> 拥有自己的内部模型
  -> 暴露一组方法
  -> 和普通对象、数组、字符串、函数形成对比
```

### 每节固定学习步骤

每一节都按这个顺序做：

```txt
1. 先读结论。
2. 读清楚新关键字和新概念。
3. 创建文件结构。
4. 按示例写代码。
5. 运行入口文件。
6. 对照预期输出。
7. 按执行过程表格解释每一步。
8. 故意写一个错误版本，观察报错或错误输出。
9. 把本节整理进最终学习笔记。
```

### 代码注释模板

每个 JS 文件顶部都写英文注释：

```js
// Goal:
// Verify how this standard library example works.

// Expected output:
// Replace this block with the output from the entry file.
```

### 学习要求

每个 API 都不能只记“怎么写”。必须回答：

```txt
它表示什么值？
它解决什么问题？
它的内部数据模型是什么？
它和普通对象、数组、字符串有什么区别？
它会不会修改原对象？
它的相等规则是什么？
它有没有运行时陷阱？
它在真实前端项目里用在哪里？
```

---

## 2. 第 11 章标准库的完整学习顺序

### 结论

本章按这个顺序学：

```txt
标准库是什么
  -> Set
  -> Map
  -> WeakMap / WeakSet
  -> ArrayBuffer / TypedArray / DataView
  -> RegExp
  -> Date
  -> Error
  -> JSON
  -> Intl
  -> console
  -> URL / URLSearchParams
  -> setTimeout / setInterval
  -> 小项目整合
```

### 技术意义

前面你已经学过 JavaScript 的值、对象、数组、函数、类和模块。第 11 章开始进入“工具箱”阶段：你不再只学习语言骨架，而是学习 JavaScript 已经内置好的数据处理工具。

这些工具会出现在真实项目的每一层：

```txt
去重                 -> Set
键值查找             -> Map
对象私有元数据       -> WeakMap
二进制数据           -> ArrayBuffer / TypedArray / DataView
文本验证和提取       -> RegExp
时间表示             -> Date
失败表示             -> Error
数据交换             -> JSON
用户界面格式化       -> Intl
运行时观察           -> console
请求地址构造         -> URL / URLSearchParams
延迟任务             -> setTimeout / setInterval
```

### 本章不是 API 字典

这一章真正难的地方不是方法数量，而是每个对象的内部模型不同：

```txt
Set 的核心是成员关系。
Map 的核心是真实键值映射。
WeakMap 的核心是弱引用和垃圾回收。
ArrayBuffer 的核心是原始字节。
RegExp 的核心是模式匹配状态机。
Date 的核心是时间戳。
Error 的核心是异常控制流和调试信息。
JSON 的核心是比 JavaScript 更小的数据模型。
Intl 的核心是区域规则。
URL 的核心是结构化地址。
Timer 的核心是宿主环境调度。
```

---

## 3. 本章先要建立的底层模型

### 结论

标准库是“语言或运行环境提前提供好的抽象对象”。学习标准库时，重点不是“它长得像对象”，而是“这个对象内部到底按什么规则保存和解释数据”。

### 关键术语先解释

| 术语 | 解释 |
|---|---|
| 标准库（standard library） | 不安装第三方包也可以直接使用的内置工具集合。 |
| 构造函数（constructor） | 用 `new` 创建对象的函数，例如 `new Map()`、`new Date()`。 |
| 命名空间对象（namespace object） | 用来组织静态函数的对象，例如 `JSON`、`Intl`、`Math`。 |
| 实例方法（instance method） | 从某个对象实例上调用的方法，例如 `mapStore.set()`。 |
| 宿主环境（host environment） | 运行 JavaScript 的环境，例如浏览器、Node.js。 |
| ECMAScript 核心 | JavaScript 语言规范定义的核心部分。 |
| Web API | 浏览器提供的 API，例如 `URL`、`console`、`setTimeout()`。 |
| 数据模型（data model） | 某个对象内部如何保存、比较、读取、修改数据的规则。 |
| 可迭代对象（iterable） | 可以被 `for...of` 遍历的对象。 |
| 可变对象（mutable object） | 方法可能修改自身状态的对象。 |

### 标准库对象分类

```txt
构造函数创建对象：
  new Set()
  new Map()
  new Date()
  new URL()
  new ArrayBuffer()
  new DataView()
  new Error()

字面量创建对象：
  /pattern/flags

命名空间对象提供静态方法：
  JSON.parse()
  JSON.stringify()
  Intl.NumberFormat

宿主环境提供工具：
  console.log()
  setTimeout()
  clearTimeout()
```

### 和模块章节的关系

模块章节解决的是“代码如何拆分和连接”。标准库章节解决的是“模块内部如何处理数据”。

真实项目里经常是这样的结构：

```txt
productQueryBuilder.js
  imports nothing
  uses URL and URLSearchParams
  exports createProductApiUrl

checkoutFormatter.js
  imports nothing
  uses Intl.NumberFormat
  exports formatCheckoutTotal

analyticsPayloadBuilder.js
  imports validation helpers
  uses Map, Date, JSON, Error
  exports createAnalyticsPayload
```

---

## 4. 00：标准库是什么

### 结论

标准库（standard library）是 JavaScript 代码无需安装第三方包即可使用的内置对象、构造函数、命名空间对象和函数。

### 技术意义

标准库让你不用从零实现基础数据工具。你不需要自己写哈希表、日期对象、正则匹配器、JSON 解析器、URL 编码器或国际化格式化器。

### 新关键字和新概念

#### 内置对象

内置对象是 JavaScript 或运行环境预先提供的对象。你可以直接使用它们。

```js
const createdDate = new Date();
const requestParams = new URLSearchParams();
const debugTable = console.table;
```

#### 命名空间对象

命名空间对象不是用来表示某条业务数据的对象，而是用来集中放置相关功能。

```js
const profileRecord = JSON.parse('{"name":"Ada"}');
const paymentText = new Intl.NumberFormat('en-US').format(1200);
```

#### ECMAScript 核心和宿主 API

`Map`、`Set`、`Date`、`RegExp`、`Error`、`JSON`、`Intl` 属于核心 JavaScript 学习范围。`console`、`URL`、`URLSearchParams`、`setTimeout()` 在严格分类上和宿主环境有关，但浏览器和 Node.js 都广泛支持，所以本章把它们当作实际开发中必须掌握的标准工具。

### 文件结构

```txt
00-what-standard-library-means/
  builtInApiOverview.js
```

### `builtInApiOverview.js`

```js
// Goal:
// Verify that different built-in APIs have different internal models.

const inventoryLookup = new Map();
inventoryLookup.set('keyboard', 12);
inventoryLookup.set('monitor', 4);

const requestedItemName = 'keyboard';
const availableItemCount = inventoryLookup.get(requestedItemName);

const releaseDate = new Date('2026-05-12T18:30:00Z');
const releaseIsoText = releaseDate.toISOString();

const productSearchUrl = new URL('https://example.com/products');
productSearchUrl.searchParams.set('category', 'books');

console.log(availableItemCount);
console.log(releaseIsoText);
console.log(productSearchUrl.toString());
```

### 运行方式

```bash
node builtInApiOverview.js
```

### 预期输出

```txt
12
2026-05-12T18:30:00.000Z
https://example.com/products?category=books
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `new Map()` 创建一个键值集合。 |
| 2 | `set()` 写入两个键值条目。 |
| 3 | `get()` 按键读取值。 |
| 4 | `new Date(...)` 创建一个表示特定时间点的对象。 |
| 5 | `toISOString()` 把时间点格式化为 UTC ISO 字符串。 |
| 6 | `new URL(...)` 把字符串解析成结构化 URL 对象。 |
| 7 | `searchParams.set()` 正确编码并设置查询参数。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 以为 `Map` 只是对象语法变体 | `Map` 的键是真实值，不是普通对象属性名。 |
| 以为 `Date` 保存的是日期字符串 | `Date` 内部核心是毫秒时间戳。 |
| 以为 `URLSearchParams` 只是字符串拼接 | 它会按 URL 查询参数规则编码和序列化。 |

### 和项目开发的关系

标准库是模块内部最常见的实现工具。你写的工具函数、业务函数、表单校验、接口请求构造、错误处理、展示格式化，大量依赖这一章。

---

## 5. 01：Set

### 结论

当核心需求是“唯一性”时，优先使用 `Set`。

### 技术意义

数组擅长保存有序列表，但数组本身不会阻止重复值。`Set` 专门表示“唯一值集合”。它关注的问题不是“第几个元素是什么”，而是“这个值是否已经存在”。

### 新关键字和新概念

#### `Set`

`Set` 是保存唯一值的集合。它可以保存原始值，也可以保存对象引用。

```js
const tagCollection = new Set();
```

#### `add()`

`add()` 向集合中加入值。如果这个值已经存在，集合不会新增重复项。

#### `has()`

`has()` 判断集合是否包含某个值。

#### `size`

`size` 是集合中唯一值的数量。注意它是属性，不是方法。

#### 插入顺序

`Set` 遍历时会保留值第一次插入的顺序。

### 底层机制

`Set` 的内部模型是“成员关系集合”。

```txt
Array 关注：index -> value
Set 关注：value 是否存在
```

对原始值来说，重复判断接近按值判断。对对象来说，重复判断按引用身份判断。两个看起来一样的对象字面量不是同一个对象引用。

### 文件结构

```txt
01-set-uniqueness/
  tagSetDemo.js
  uniqueCategoryList.js
  objectReferenceSetMistake.js
```

### `tagSetDemo.js`

```js
// Goal:
// Verify that Set keeps unique values and preserves insertion order.

const tagCollection = new Set();

tagCollection.add('javascript');
tagCollection.add('frontend');
tagCollection.add('javascript');

const uniqueTagCount = tagCollection.size;
const hasFrontendTag = tagCollection.has('frontend');

console.log(uniqueTagCount);
console.log(hasFrontendTag);
console.log(Array.from(tagCollection));
```

### 预期输出

```txt
2
true
[ 'javascript', 'frontend' ]
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `new Set()` 创建空集合。 |
| 2 | 第一次 `add('javascript')` 插入成功。 |
| 3 | `add('frontend')` 插入成功。 |
| 4 | 第二次 `add('javascript')` 是重复值，不新增。 |
| 5 | `size` 得到唯一值数量 `2`。 |
| 6 | `has('frontend')` 返回 `true`。 |
| 7 | `Array.from()` 把集合转换成数组。 |

### `uniqueCategoryList.js`

```js
// Goal:
// Remove duplicate category names while preserving first-seen order.

function createUniqueCategoryList(categoryItems) {
  const categorySet = new Set(categoryItems);
  return Array.from(categorySet);
}

const categoryResultList = createUniqueCategoryList([
  'books',
  'games',
  'books',
  'tools',
]);

console.log(categoryResultList);
```

### 预期输出

```txt
[ 'books', 'games', 'tools' ]
```

### `objectReferenceSetMistake.js`

```js
// Goal:
// Verify that Set compares objects by reference identity.

const visitorRecordSet = new Set();

visitorRecordSet.add({ id: 1 });
visitorRecordSet.add({ id: 1 });

const firstVisitorRecord = { id: 2 };
visitorRecordSet.add(firstVisitorRecord);
visitorRecordSet.add(firstVisitorRecord);

console.log(visitorRecordSet.size);
```

### 预期输出

```txt
3
```

### 常见错误 / 反例

错误理解：

```txt
两个对象内容一样，所以 Set 会认为它们重复。
```

实际规则：

```txt
两个对象字面量会创建两个不同对象引用。
Set 不做深度结构比较。
```

### 和项目开发的关系

`Set` 常用于：

```txt
去重标签
去重分类
记录已经访问过的 id
判断某个权限是否存在
从数组构造唯一值列表
```

---

## 6. 02：Map

### 结论

当键本身是数据，而不是普通对象属性名时，优先使用 `Map`。

### 技术意义

普通对象的属性名主要是字符串或符号。`Map` 的键可以是任意值：字符串、数字、对象、函数、符号都可以。

### 新关键字和新概念

#### `Map`

`Map` 是键值集合（key-value collection）。

```js
const pageVisitCounter = new Map();
```

#### `set()`

写入或更新一个键值条目。

#### `get()`

按键读取值。如果没有这个键，返回 `undefined`。

#### `has()`

判断某个键是否存在。

#### `delete()`

删除某个键值条目。

#### `entries()`

返回可迭代的键值对。

### 底层机制

普通对象保存的是属性：

```txt
propertyKey -> propertyValue
```

`Map` 保存的是条目：

```txt
actualKeyValue -> storedValue
```

所以对象键在 `Map` 中不会被强制转换成字符串。

### 文件结构

```txt
02-map-key-value-storage/
  pageVisitCounter.js
  wordFrequencyTable.js
  mapBracketMistake.js
  objectKeyMapDemo.js
  mapDeleteDemo.js
  mapEntriesIterationDemo.js
```

### `pageVisitCounter.js`

```js
// Goal:
// Count page visits with a Map.

const pageVisitCounter = new Map();

function countPageVisit(pagePathText) {
  const previousVisitTotal = pageVisitCounter.get(pagePathText) ?? 0;
  const nextVisitTotal = previousVisitTotal + 1;

  pageVisitCounter.set(pagePathText, nextVisitTotal);

  return nextVisitTotal;
}

countPageVisit('/home');
countPageVisit('/docs');
countPageVisit('/home');

console.log(pageVisitCounter.get('/home'));
console.log(pageVisitCounter.get('/docs'));
```

### 预期输出

```txt
2
1
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `pageVisitCounter` 保存页面路径和访问次数。 |
| 2 | 第一次访问 `/home` 时，旧值是 `undefined`。 |
| 3 | `?? 0` 把缺失值处理为 `0`。 |
| 4 | 新值变成 `1` 并写回 `Map`。 |
| 5 | 第二次访问 `/home` 时，旧值是 `1`。 |
| 6 | 新值变成 `2`。 |

### `wordFrequencyTable.js`

```js
// Goal:
// Build a word-frequency table with Map.

function createWordFrequencyTable(sentenceText) {
  const frequencyTable = new Map();
  const wordTokens = sentenceText.toLowerCase().split(/\s+/);

  for (const wordToken of wordTokens) {
    const currentWordCount = frequencyTable.get(wordToken) ?? 0;
    frequencyTable.set(wordToken, currentWordCount + 1);
  }

  return frequencyTable;
}

const articleWordTable = createWordFrequencyTable('JS modules JS runtime JS');

console.log(articleWordTable.get('js'));
console.log(articleWordTable.get('modules'));
```

### 预期输出

```txt
3
1
```

### `mapBracketMistake.js`

```js
// Goal:
// Verify that bracket syntax does not create Map entries.

const brokenPreferenceMap = new Map();

brokenPreferenceMap['theme'] = 'dark';

console.log(brokenPreferenceMap.get('theme'));
console.log(brokenPreferenceMap.theme);
console.log(brokenPreferenceMap.size);
```

### 预期输出

```txt
undefined
dark
0
```

### `objectKeyMapDemo.js`

```js
// Goal:
// Verify that Map can use object keys without string conversion.

const productRecordA = { sku: 'KB-01' };
const productRecordB = { sku: 'KB-01' };

const productStockMap = new Map();
productStockMap.set(productRecordA, 12);
productStockMap.set(productRecordB, 8);

console.log(productStockMap.get(productRecordA));
console.log(productStockMap.get(productRecordB));
console.log(productStockMap.size);
```

### 预期输出

```txt
12
8
2
```


### `mapDeleteDemo.js`

```js
// Goal:
// Verify how Map delete() removes entries and returns a boolean result.

const preferenceStore = new Map();

preferenceStore.set('theme', 'dark');
preferenceStore.set('density', 'compact');
preferenceStore.set('language', 'en');

const deletedThemeResult = preferenceStore.delete('theme');
const deletedMissingResult = preferenceStore.delete('timezone');

console.log(deletedThemeResult);
console.log(deletedMissingResult);
console.log(preferenceStore.get('theme'));
console.log(preferenceStore.size);
```

### 预期输出

```txt
true
false
undefined
2
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `preferenceStore` 创建一个空的 Map（映射）。 |
| 2 | `set('theme', 'dark')` 添加一个键值条目（entry）。 |
| 3 | `set('density', 'compact')` 添加第二个条目。 |
| 4 | `set('language', 'en')` 添加第三个条目。 |
| 5 | `delete('theme')` 找到 key 为 `'theme'` 的条目并删除。 |
| 6 | 删除成功，所以 `deletedThemeResult` 是 `true`。 |
| 7 | `delete('timezone')` 找不到对应 key。 |
| 8 | 删除失败，所以 `deletedMissingResult` 是 `false`。 |
| 9 | `get('theme')` 返回 `undefined`，因为这个条目已经不存在。 |
| 10 | `size` 从 `3` 变成 `2`。 |

### `delete()` 的技术意义

`delete()` 是 Map 的删除方法（deletion method）。它删除的是 Map 内部的键值条目（key-value entry），不是删除变量，也不是销毁对象本身。

```txt
map.delete(key)
```

它的返回值（return value）是布尔值（boolean）：

```txt
true  -> 找到了这个 key，并删除成功。
false -> 没有找到这个 key，没有东西可删。
```

### `delete()` 的常见错误

| 错误理解 | 正确模型 |
|---|---|
| `delete()` 会删除 key 对象本身 | 它只删除 Map 里的 entry。 |
| 删除不存在的 key 会报错 | 不会报错，返回 `false`。 |
| `delete()` 和 `map[key] = undefined` 一样 | 不一样。前者移除 entry，后者只是普通对象属性赋值。 |
| `set(key, undefined)` 等于删除 | 不等于。key 仍然存在，value 是 `undefined`。 |

对比这两个状态：

```js
const statusStore = new Map();

statusStore.set('task', undefined);
console.log(statusStore.has('task'));
console.log(statusStore.size);

statusStore.delete('task');
console.log(statusStore.has('task'));
console.log(statusStore.size);
```

预期输出：

```txt
true
1
false
0
```

这里的关键是：

```txt
value 是 undefined，不代表 entry 不存在。
delete() 删除 entry，has() 才会变成 false。
```

### `mapEntriesIterationDemo.js`

```js
// Goal:
// Verify how Map entries() returns key-value pairs for iteration.

const pageVisitCounter = new Map();

pageVisitCounter.set('/home', 2);
pageVisitCounter.set('/docs', 1);
pageVisitCounter.set('/pricing', 3);

const entryIterator = pageVisitCounter.entries();

console.log(entryIterator.next().value);
console.log(entryIterator.next().value);
console.log(entryIterator.next().value);
console.log(entryIterator.next().done);

for (const [pagePathText, visitTotal] of pageVisitCounter.entries()) {
  console.log(`${pagePathText}: ${visitTotal}`);
}
```

### 预期输出

```txt
[ '/home', 2 ]
[ '/docs', 1 ]
[ '/pricing', 3 ]
true
/home: 2
/docs: 1
/pricing: 3
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `pageVisitCounter` 保存三个页面路径和访问次数。 |
| 2 | `entries()` 返回一个 Map 迭代器（Map iterator）。 |
| 3 | 第一次 `next()` 返回第一个 entry：`['/home', 2]`。 |
| 4 | 第二次 `next()` 返回第二个 entry：`['/docs', 1]`。 |
| 5 | 第三次 `next()` 返回第三个 entry：`['/pricing', 3]`。 |
| 6 | 第四次 `next().done` 是 `true`，说明迭代结束。 |
| 7 | `for...of` 自动消费 `entries()` 返回的迭代器。 |
| 8 | `[pagePathText, visitTotal]` 使用数组解构（array destructuring）拆开每个 entry。 |

### `entries()` 的技术意义

`entries()` 是条目迭代方法（entry iteration method）。它不会返回普通数组，而是返回一个迭代器（iterator）。这个迭代器每次产出一个键值条目（key-value entry）。

每个 entry 的形状是：

```txt
[key, value]
```

所以：

```js
for (const entryItem of pageVisitCounter.entries()) {
  console.log(entryItem);
}
```

每一轮拿到的是一个二元素数组（two-element array）：

```txt
[ '/home', 2 ]
[ '/docs', 1 ]
[ '/pricing', 3 ]
```

更常见的写法是直接解构：

```js
for (const [pagePathText, visitTotal] of pageVisitCounter.entries()) {
  console.log(pagePathText, visitTotal);
}
```

这里的含义是：

```txt
从每个 entry 里取第 0 位作为 pagePathText。
从每个 entry 里取第 1 位作为 visitTotal。
```

### `entries()` 和默认迭代

Map 的默认迭代器（default iterator）就是 `entries()`。

所以这两段代码等价：

```js
for (const [pagePathText, visitTotal] of pageVisitCounter.entries()) {
  console.log(pagePathText, visitTotal);
}
```

```js
for (const [pagePathText, visitTotal] of pageVisitCounter) {
  console.log(pagePathText, visitTotal);
}
```

第二种能工作，是因为 Map 实现了可迭代协议（iterable protocol），并且它的默认迭代结果就是 entry。

### `entries()` 的常见错误

| 错误理解 | 正确模型 |
|---|---|
| `entries()` 返回数组 | 它返回 iterator，不是数组。 |
| 每个 entry 是对象 | 每个 entry 是 `[key, value]` 二元素数组。 |
| `for...of map` 会只遍历 key | `for...of map` 默认遍历 entry。 |
| `entries()` 会复制整个 Map | 它返回迭代器，按顺序产出条目。 |

如果你真的需要数组，可以显式转换：

```js
const entryList = Array.from(pageVisitCounter.entries());

console.log(entryList);
```

预期输出：

```txt
[ [ '/home', 2 ], [ '/docs', 1 ], [ '/pricing', 3 ] ]
```

### `delete()` 和 `entries()` 的最终记忆模型

```txt
Map.prototype.delete(key):
删除 key 对应的 entry。
删除成功返回 true。
key 不存在返回 false。
size 会随着成功删除而减少。

Map.prototype.entries():
返回 Map iterator。
每次迭代产出 [key, value]。
Map 的默认 for...of 结果就是 entries()。
```

### 常见错误 / 反例

| 错误 | 正确模型 |
|---|---|
| 用 `map[key] = value` 写入 Map | 这只是给 Map 对象加普通属性，不是 Map 条目。 |
| 以为 `get()` 找不到会报错 | 找不到返回 `undefined`。 |
| 以为对象键按内容比较 | 对象键仍然按引用身份比较。 |

### 和项目开发的关系

`Map` 常用于：

```txt
缓存接口结果
统计词频或访问次数
用对象作为元数据键
维护运行时 registry
保存顺序稳定的键值表
```

---

## 7. 03：WeakMap 和 WeakSet

### 结论

当你想把数据关联到对象上，但又不想因为这个关联阻止对象被垃圾回收时，使用 `WeakMap` 或 `WeakSet`。

### 技术意义

普通 `Map` 会强引用键和值。只要对象被放进普通 `Map`，它就仍然可达。`WeakMap` 对键是弱引用：如果某个键对象在其他地方已经不可达，这个键值条目不会阻止垃圾回收。

### 新关键字和新概念

#### `WeakMap`

`WeakMap` 的键必须是对象或非注册符号。它适合保存“对象私有元数据”。

#### `WeakSet`

`WeakSet` 的值必须是对象或非注册符号。它适合记录“某个对象是否已经被处理过”。

#### 弱引用

弱引用不会单独让对象保持存活。垃圾回收器可以在对象不可达后回收它。

#### 不可枚举

`WeakMap` 没有 `keys()`、`values()`、`entries()`、`size`，因为垃圾回收随时可能移除条目，暴露枚举会和弱引用模型冲突。

### 文件结构

```txt
03-weak-collections/
  weakMapMetadataStore.js
  weakSetProcessedObjects.js
  weakMapIterationMistake.js
```

### `weakMapMetadataStore.js`

```js
// Goal:
// Store metadata for object keys without exposing it on the object.

const elementMetadataStore = new WeakMap();

function attachElementMetadata(domElementObject, metadataRecord) {
  elementMetadataStore.set(domElementObject, metadataRecord);
}

function readElementMetadata(domElementObject) {
  return elementMetadataStore.get(domElementObject);
}

const simulatedButtonNode = { nodeName: 'BUTTON' };
attachElementMetadata(simulatedButtonNode, { role: 'submit-control' });

console.log(readElementMetadata(simulatedButtonNode));
```

### 预期输出

```txt
{ role: 'submit-control' }
```

### `weakSetProcessedObjects.js`

```js
// Goal:
// Track processed objects with WeakSet.

const processedRequestStore = new WeakSet();

function processRequestOnce(requestRecord) {
  if (processedRequestStore.has(requestRecord)) {
    return 'already-processed';
  }

  processedRequestStore.add(requestRecord);
  return 'processed-now';
}

const checkoutRequestRecord = { requestId: 101 };

console.log(processRequestOnce(checkoutRequestRecord));
console.log(processRequestOnce(checkoutRequestRecord));
```

### 预期输出

```txt
processed-now
already-processed
```

### `weakMapIterationMistake.js`

```js
// Goal:
// Verify that WeakMap does not expose enumeration methods.

const privateStateStore = new WeakMap();

console.log(typeof privateStateStore.keys);
console.log(typeof privateStateStore.entries);
console.log(privateStateStore.size);
```

### 预期输出

```txt
undefined
undefined
undefined
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `WeakMap` 保存对象到元数据的关联。 |
| 2 | 元数据没有直接挂到原对象上。 |
| 3 | 只有拿到同一个对象引用时，才能读取对应元数据。 |
| 4 | 如果对象以后不可达，`WeakMap` 不会强行让它存活。 |

### 常见错误 / 反例

| 错误 | 正确模型 |
|---|---|
| 想遍历 `WeakMap` | `WeakMap` 不支持枚举。 |
| 想用字符串当 `WeakMap` 键 | `WeakMap` 键必须是对象或非注册符号。 |
| 把 `WeakMap` 当普通缓存表 | 如果需要枚举、统计数量、清空所有项，用普通 `Map`。 |

### 和项目开发的关系

`WeakMap` 常用于：

```txt
DOM 节点元数据
对象私有状态
库内部状态表
防止内存泄漏的对象关联
```

---

## 8. 04：ArrayBuffer、定型数组和 DataView

### 结论

`ArrayBuffer` 表示原始字节存储；定型数组（typed array）表示某种数值视图；`DataView` 用于精确按字节偏移读写不同类型的数值。

### 技术意义

普通数组保存的是 JavaScript 值。二进制 API 处理的是原始字节。网络协议、文件解析、图像数据、音频数据、WebAssembly、Canvas 像素操作都可能用到二进制数据。

### 新关键字和新概念

#### `ArrayBuffer`

固定长度的原始二进制内存块。它本身不能直接按元素读写。

#### 定型数组（typed array）

定型数组是对 `ArrayBuffer` 的数值视图，例如 `Uint8Array`、`Int16Array`、`Float32Array`。

#### `DataView`

`DataView` 是灵活视图，可以在指定字节偏移处读写不同大小和不同字节序的数值。

#### 字节序（endianness）

多字节数值在内存中的字节排列顺序。`false` 通常表示 big-endian，`true` 表示 little-endian。

### 底层机制

```txt
ArrayBuffer owns bytes.
TypedArray interprets bytes as fixed-size numeric elements.
DataView reads and writes bytes with explicit type and byte order.
```

### 文件结构

```txt
04-binary-data/
  arrayBufferViewDemo.js
  messageHeaderBuilder.js
  byteLengthMistake.js
```

### `arrayBufferViewDemo.js`

```js
// Goal:
// Verify that one buffer can be interpreted through different views.

const packetBuffer = new ArrayBuffer(8);
const packetBytesView = new Uint8Array(packetBuffer);
const packetNumberView = new DataView(packetBuffer);

packetBytesView[0] = 255;
packetBytesView[1] = 16;
packetNumberView.setUint16(2, 4096, false);

console.log(packetBytesView[0]);
console.log(packetBytesView[1]);
console.log(packetNumberView.getUint16(2, false));
console.log(packetBuffer.byteLength);
```

### 预期输出

```txt
255
16
4096
8
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `new ArrayBuffer(8)` 分配 8 个字节。 |
| 2 | `Uint8Array` 把每个字节解释为一个 8 位无符号整数。 |
| 3 | `DataView` 可以按指定偏移写入 16 位整数。 |
| 4 | `setUint16(2, 4096, false)` 从字节偏移 `2` 开始写入两个字节。 |
| 5 | `getUint16(2, false)` 用相同字节序读回同一个数。 |

### `messageHeaderBuilder.js`

```js
// Goal:
// Create a binary message header and read it back.

function createMessageHeader(versionNumber, statusCodeNumber) {
  const headerStorage = new ArrayBuffer(4);
  const headerWriter = new DataView(headerStorage);

  headerWriter.setUint8(0, versionNumber);
  headerWriter.setUint16(1, statusCodeNumber, false);

  return headerStorage;
}

const responseHeaderBuffer = createMessageHeader(2, 201);
const responseHeaderReader = new DataView(responseHeaderBuffer);

console.log(responseHeaderReader.getUint8(0));
console.log(responseHeaderReader.getUint16(1, false));
console.log(responseHeaderBuffer.byteLength);
```

### 预期输出

```txt
2
201
4
```

### `byteLengthMistake.js`

```js
// Goal:
// Distinguish buffer byte length from typed array element length.

const coordinateBuffer = new ArrayBuffer(16);
const coordinateFloatView = new Float32Array(coordinateBuffer);

console.log(coordinateBuffer.byteLength);
console.log(coordinateFloatView.length);
console.log(coordinateFloatView.BYTES_PER_ELEMENT);
```

### 预期输出

```txt
16
4
4
```

### 常见错误 / 反例

| 错误 | 正确模型 |
|---|---|
| 以为 `ArrayBuffer` 能直接读写元素 | 必须通过视图读写。 |
| 混淆 `byteLength` 和 `length` | buffer 是字节长度；typed array 是元素个数。 |
| 读写时字节序不一致 | 写入和读取多字节数值时必须使用一致的 endianness。 |

### 和项目开发的关系

这一节不是日常表单开发的高频 API，但它是理解浏览器底层能力的入口：文件上传、图像处理、音频处理、WebSocket 二进制消息、Canvas、WebAssembly 都会遇到它。

---

## 9. 05：RegExp 和字符串模式方法

### 结论

当你需要按模式匹配、验证、提取、替换或切分文本时，使用 `RegExp`。

### 技术意义

字符串方法适合固定文本处理。正则表达式适合“符合某种规则的文本”。例如邮箱格式、商品编码、发票编号、URL 片段、日志行、表单输入验证。

### 新关键字和新概念

#### 正则表达式（regular expression）

正则表达式是一个模式对象。可以用字面量创建：

```js
const invoicePattern = /^INV-(\d{4})-(\d{2})$/;
```

也可以用构造函数创建：

```js
const keywordPattern = new RegExp('javascript', 'i');
```

#### 锚点

`^` 表示字符串开头，`$` 表示字符串结尾。

#### 捕获组

`(...)` 会捕获匹配到的子内容。

#### 标志（flags）

| 标志 | 含义 |
|---|---|
| `g` | 全局搜索。 |
| `i` | 忽略大小写。 |
| `m` | 多行模式。 |
| `s` | 点号匹配换行符。 |
| `u` | Unicode 感知匹配。 |
| `y` | 粘连搜索。 |
| `d` | 返回匹配索引。 |

#### `exec()`

返回匹配详细信息或 `null`。

#### `test()`

返回布尔值，表示是否匹配。

#### `RegExp.escape()`

把用户输入文本转义成可安全放入正则表达式的文本。这个 API 较新，学习时要知道它解决的问题；真实项目中要根据目标环境检查兼容性。

### 底层机制

正则表达式不是普通字符串比较。它会被编译为匹配器，然后在输入文本上按模式规则尝试匹配。带 `g` 或 `y` 的正则对象还有可变的 `lastIndex` 状态。

### 文件结构

```txt
05-regular-expressions/
  invoicePatternDemo.js
  productCodeValidator.js
  dynamicKeywordPattern.js
  globalTestStateMistake.js
```

### `invoicePatternDemo.js`

```js
// Goal:
// Extract year and month from an invoice code with RegExp.

const invoicePattern = /^INV-(\d{4})-(\d{2})$/;
const invoiceCandidateText = 'INV-2026-05';
const invoiceMatchResult = invoicePattern.exec(invoiceCandidateText);

if (invoiceMatchResult !== null) {
  const invoiceYearText = invoiceMatchResult[1];
  const invoiceMonthText = invoiceMatchResult[2];

  console.log(invoiceYearText);
  console.log(invoiceMonthText);
}
```

### 预期输出

```txt
2026
05
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `^` 要求从字符串开头匹配。 |
| 2 | `INV-` 匹配固定文本。 |
| 3 | `(\d{4})` 捕获 4 个数字。 |
| 4 | 第二个 `(\d{2})` 捕获 2 个数字。 |
| 5 | `$` 要求匹配到字符串结尾。 |
| 6 | `exec()` 返回数组式匹配结果。 |
| 7 | 索引 `1` 和 `2` 对应两个捕获组。 |

### `productCodeValidator.js`

```js
// Goal:
// Validate a product code format.

function isValidProductCode(productCodeText) {
  const productCodePattern = /^[A-Z]{3}-\d{4}$/;
  return productCodePattern.test(productCodeText);
}

console.log(isValidProductCode('ABC-1234'));
console.log(isValidProductCode('abc-1234'));
```

### 预期输出

```txt
true
false
```

### `dynamicKeywordPattern.js`

```js
// Goal:
// Build a RegExp from runtime input safely when RegExp.escape is available.

const searchKeywordText = 'price.plus';
const escapedKeywordText = RegExp.escape(searchKeywordText);
const keywordPattern = new RegExp(escapedKeywordText, 'i');

console.log(keywordPattern.test('The field is price.plus'));
```

### 预期输出

```txt
true
```

### `globalTestStateMistake.js`

```js
// Goal:
// Verify that a global RegExp can keep lastIndex state across test calls.

const repeatedDigitPattern = /\d/g;

console.log(repeatedDigitPattern.test('a1'));
console.log(repeatedDigitPattern.test('a1'));
console.log(repeatedDigitPattern.test('a1'));
```

### 可能输出

```txt
true
false
true
```

### 常见错误 / 反例

| 错误 | 正确模型 |
|---|---|
| 表单验证时无脑加 `g` | `g` 会让正则对象维护 `lastIndex` 状态。 |
| 用字符串拼接用户输入构造正则 | 用户输入里的 `.`、`+`、`*` 等字符会被当作正则语法。 |
| 只用 `match()` 不理解捕获组 | 捕获组在 `exec()` 结果中按顺序出现。 |
| 以为正则只是字符串查找 | 正则是模式匹配器，有自己的语法和状态。 |

### 和项目开发的关系

`RegExp` 常用于：

```txt
表单字段验证
从路由或 URL 中提取片段
日志文本解析
搜索关键字匹配
字符串替换和清理
```

---

## 10. 06：Date 和时间戳

### 结论

`Date` 对象内部表示的是一个时间点，本质上是从 Unix epoch 到该时间点的毫秒数，不是一个格式化字符串。

### 技术意义

前端项目里，时间永远不只是“显示一个日期”。你需要区分时间点、时区、格式化、持续时间、用户本地时间、服务器 UTC 时间。

### 新关键字和新概念

#### `Date`

`Date` 是表示一个具体时间点的对象。

#### 时间戳（timestamp）

时间戳通常是从 `1970-01-01T00:00:00.000Z` 到某个时间点的毫秒数。

#### UTC 方法

例如 `getUTCFullYear()`、`getUTCMonth()`、`getUTCDate()`，按 UTC 解释时间戳。

#### 本地时间方法

例如 `getFullYear()`、`getMonth()`、`getDate()`，按当前运行环境的本地时区解释时间戳。

#### `toISOString()`

输出 UTC ISO 字符串。

### 底层机制

同一个 `Date` 时间戳可以在不同时区显示成不同日历时间。

```txt
Date stores one instant.
Local methods display it through local time zone rules.
UTC methods display it through UTC rules.
```

### 文件结构

```txt
06-date-and-time/
  dateTimestampDemo.js
  dateMutationDemo.js
  zeroBasedMonthMistake.js
  stableDateParsingDemo.js
```

### `dateTimestampDemo.js`

```js
// Goal:
// Verify that Date stores an instant and can output a timestamp.

const releaseDate = new Date('2026-05-12T18:30:00Z');
const releaseTimestamp = releaseDate.getTime();
const releaseIsoText = releaseDate.toISOString();

console.log(releaseTimestamp);
console.log(releaseIsoText);
```

### 预期输出形状

```txt
1789151400000
2026-05-12T18:30:00.000Z
```

注意：第一行是毫秒时间戳，具体数值以运行结果为准。

### `dateMutationDemo.js`

```js
// Goal:
// Verify that Date setter methods mutate the existing Date object.

const trialStartDate = new Date('2026-05-01T00:00:00Z');
trialStartDate.setUTCDate(trialStartDate.getUTCDate() + 14);

console.log(trialStartDate.toISOString());
```

### 预期输出

```txt
2026-05-15T00:00:00.000Z
```

### `zeroBasedMonthMistake.js`

```js
// Goal:
// Verify that numeric Date constructor months are zero-based.

const confusingMonthDate = new Date(2026, 4, 12);

console.log(confusingMonthDate.getMonth());
console.log(confusingMonthDate.getFullYear());
```

### 预期输出

```txt
4
2026
```

说明：`4` 表示五月，因为一月是 `0`。

### `stableDateParsingDemo.js`

```js
// Goal:
// Prefer ISO date-time strings with explicit time zone information.

const stableTimestampDate = new Date('2026-05-12T00:00:00Z');

console.log(stableTimestampDate.toISOString());
```

### 预期输出

```txt
2026-05-12T00:00:00.000Z
```

### 常见错误 / 反例

| 错误 | 正确模型 |
|---|---|
| 把 `Date` 当字符串 | `Date` 内部核心是时间戳。 |
| 忘记数字月份从 `0` 开始 | `new Date(2026, 4, 12)` 表示五月。 |
| 依赖非标准日期字符串解析 | 优先使用带时区的 ISO 字符串。 |
| 以为 `setDate()` 返回新对象 | `Date` setter 方法会修改原对象。 |

### 和项目开发的关系

`Date` 常用于：

```txt
保存创建时间
计算过期时间
比较两个时间点
和后端交换 ISO 时间字符串
配合 Intl 做用户界面显示
```

---

## 11. 07：Error 和错误对象

### 结论

使用 `Error` 对象表示异常失败。不要在高质量代码里抛普通字符串。

### 技术意义

错误不是普通返回值。`throw` 会中断当前正常执行路径，运行时会沿调用栈寻找最近的 `catch`。错误对象提供错误名称、消息、原因和栈信息，方便调试和分类处理。

### 新关键字和新概念

#### `Error`

基础错误构造函数。

#### `TypeError`

类型不符合要求时使用。

#### `RangeError`

值的范围不符合要求时使用。

#### `SyntaxError`

语法错误，`JSON.parse()` 解析失败时常见。

#### `cause`

错误原因。包装底层错误时可以保留原始错误。

#### 自定义错误类

通过 `class XxxError extends Error` 创建业务专用错误类型。

### 文件结构

```txt
07-error-objects/
  quantityParser.js
  errorCauseDemo.js
  customErrorClassDemo.js
  throwStringMistake.js
```

### `quantityParser.js`

```js
// Goal:
// Classify invalid quantity input with different Error subclasses.

function parseRequiredQuantity(quantityText) {
  const parsedQuantity = Number(quantityText);

  if (!Number.isInteger(parsedQuantity)) {
    throw new TypeError('Quantity must be an integer');
  }

  if (parsedQuantity <= 0) {
    throw new RangeError('Quantity must be greater than zero');
  }

  return parsedQuantity;
}

try {
  const acceptedQuantity = parseRequiredQuantity('0');
  console.log(acceptedQuantity);
} catch (caughtQuantityError) {
  console.error(caughtQuantityError.name);
  console.error(caughtQuantityError.message);
}
```

### 预期输出

```txt
RangeError
Quantity must be greater than zero
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `Number('0')` 得到数值 `0`。 |
| 2 | `Number.isInteger(0)` 返回 `true`。 |
| 3 | `0 <= 0` 成立。 |
| 4 | 抛出 `RangeError`。 |
| 5 | `catch` 接住错误对象。 |
| 6 | 输出错误名称和错误消息。 |

### `errorCauseDemo.js`

```js
// Goal:
// Wrap a lower-level JSON parse error with a higher-level Error.

function loadSettingsRecord(settingsText) {
  try {
    return JSON.parse(settingsText);
  } catch (settingsParseError) {
    throw new Error('Settings data could not be parsed', {
      cause: settingsParseError,
    });
  }
}

try {
  loadSettingsRecord('{broken-json');
} catch (settingsLoadError) {
  console.error(settingsLoadError.message);
  console.error(settingsLoadError.cause instanceof SyntaxError);
}
```

### 预期输出

```txt
Settings data could not be parsed
true
```

### `customErrorClassDemo.js`

```js
// Goal:
// Create a custom Error subclass for domain-specific failures.

class MissingFieldError extends Error {
  constructor(fieldNameText) {
    super(`Missing field: ${fieldNameText}`);
    this.name = 'MissingFieldError';
    this.fieldName = fieldNameText;
  }
}

function requireProfileField(profileRecord, requiredFieldName) {
  if (!(requiredFieldName in profileRecord)) {
    throw new MissingFieldError(requiredFieldName);
  }

  return profileRecord[requiredFieldName];
}

try {
  requireProfileField({ username: 'river' }, 'email');
} catch (profileFieldError) {
  console.error(profileFieldError.name);
  console.error(profileFieldError.fieldName);
}
```

### 预期输出

```txt
MissingFieldError
email
```

### `throwStringMistake.js`

```js
// Goal:
// Compare throwing an Error object with throwing a plain string.

try {
  throw 'Request failed';
} catch (plainFailureValue) {
  console.log(typeof plainFailureValue);
  console.log(plainFailureValue.message);
}

try {
  throw new Error('Request failed');
} catch (structuredFailureValue) {
  console.log(structuredFailureValue instanceof Error);
  console.log(structuredFailureValue.message);
}
```

### 预期输出

```txt
string
undefined
true
Request failed
```

### 常见错误 / 反例

| 错误 | 正确模型 |
|---|---|
| `throw 'failed'` | 抛 `new Error('failed')`。 |
| 所有错误都用普通 `Error` | 可以按失败类型使用 `TypeError`、`RangeError` 或自定义类。 |
| 包装错误时丢失原始错误 | 使用 `cause` 保存底层错误。 |
| 只看 `message` 不看 `name` | `name` 可以帮助分类错误。 |

### 和项目开发的关系

`Error` 常用于：

```txt
解析配置失败
接口响应不合法
表单数据不满足规则
业务状态不允许操作
封装底层错误并向上抛出
```

---

## 12. 08：JSON 序列化和解析

### 结论

`JSON.stringify()` 把 JavaScript 数据序列化为 JSON 文本；`JSON.parse()` 把 JSON 文本解析为 JavaScript 值。

### 技术意义

JSON 是前后端数据交换最常见的格式之一。但 JSON 不是“JavaScript 对象文本版”。JSON 的数据模型比 JavaScript 小得多。

### 新关键字和新概念

#### `JSON.stringify()`

把可 JSON 表示的数据转换成字符串。

#### `JSON.parse()`

把 JSON 字符串解析成 JavaScript 值。

#### replacer

`JSON.stringify()` 的第二个参数，可以筛选或转换要输出的属性。

#### reviver

`JSON.parse()` 的第二个参数，可以在解析过程中转换值。

### JSON 支持的数据类型

```txt
object
array
string
number
boolean
null
```

### JSON 不直接支持的 JavaScript 值

```txt
undefined
function
symbol
BigInt
Map
Set
circular reference
```

### 文件结构

```txt
08-json-serialization/
  jsonRoundTripDemo.js
  jsonReplacerDemo.js
  jsonReviverDemo.js
  unsupportedValueMistake.js
  circularReferenceMistake.js
```

### `jsonRoundTripDemo.js`

```js
// Goal:
// Serialize a JSON-compatible object and parse it back.

const userProfileRecord = {
  username: 'river',
  active: true,
  score: 42,
  preferences: ['dark-mode', 'compact-layout'],
};

const userProfileJsonText = JSON.stringify(userProfileRecord);
const restoredProfileRecord = JSON.parse(userProfileJsonText);

console.log(userProfileJsonText);
console.log(restoredProfileRecord.preferences[0]);
console.log(restoredProfileRecord === userProfileRecord);
```

### 预期输出

```txt
{"username":"river","active":true,"score":42,"preferences":["dark-mode","compact-layout"]}
dark-mode
false
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 原对象包含 JSON 可表示的值。 |
| 2 | `JSON.stringify()` 生成 JSON 字符串。 |
| 3 | `JSON.parse()` 创建新的 JavaScript 对象。 |
| 4 | 新对象内容相同，但引用不同。 |

### `jsonReplacerDemo.js`

```js
// Goal:
// Use a replacer array to serialize only public fields.

const accountRecord = {
  id: 7,
  email: 'user@example.com',
  passwordHash: 'hidden-value',
};

const publicAccountJsonText = JSON.stringify(accountRecord, ['id', 'email']);

console.log(publicAccountJsonText);
```

### 预期输出

```txt
{"id":7,"email":"user@example.com"}
```

### `jsonReviverDemo.js`

```js
// Goal:
// Use a reviver function to restore a Date value after parsing JSON.

const eventJsonText = '{"name":"launch","createdAt":"2026-05-12T00:00:00.000Z"}';

const eventRecord = JSON.parse(eventJsonText, (propertyName, propertyValue) => {
  if (propertyName === 'createdAt') {
    return new Date(propertyValue);
  }

  return propertyValue;
});

console.log(eventRecord.createdAt instanceof Date);
console.log(eventRecord.createdAt.toISOString());
```

### 预期输出

```txt
true
2026-05-12T00:00:00.000Z
```

### `unsupportedValueMistake.js`

```js
// Goal:
// Verify how unsupported values behave during JSON serialization.

const unsupportedValueRecord = {
  visibleName: 'toolbox',
  missingValue: undefined,
  calculateTotal: () => 10,
};

console.log(JSON.stringify(unsupportedValueRecord));
```

### 预期输出

```txt
{"visibleName":"toolbox"}
```

### `circularReferenceMistake.js`

```js
// Goal:
// Verify that JSON.stringify cannot serialize circular references.

const circularOwnerRecord = { name: 'root' };
circularOwnerRecord.self = circularOwnerRecord;

JSON.stringify(circularOwnerRecord);
```

### 预期结果

```txt
TypeError
```

### 常见错误 / 反例

| 错误 | 正确模型 |
|---|---|
| 以为 JSON 能保存所有 JS 值 | JSON 数据模型比 JavaScript 小。 |
| 以为 parse 后还是同一个对象 | parse 会创建新对象。 |
| 以为 Date 会自动恢复成 Date | JSON 里 Date 通常变成字符串，需要 reviver。 |
| 以为循环引用能直接 stringify | 普通 JSON 不支持循环引用。 |

### 和项目开发的关系

JSON 常用于：

```txt
接口请求体
接口响应体
localStorage 保存结构化数据
配置文件
日志输出
前后端数据交换
```

---

## 13. 09：Intl 国际化格式化

### 结论

用户界面上显示货币、日期、百分比、相对时间、列表、复数和本地排序时，优先使用 `Intl`，不要手写格式化字符串。

### 技术意义

国际化（internationalization）不只是翻译文字。它还包括数字分隔符、货币符号、日期顺序、时区、复数规则、排序规则等。

### 新关键字和新概念

#### `Intl`

`Intl` 是国际化 API 的命名空间对象。

#### `Intl.NumberFormat`

格式化数字、货币、百分比。

#### `Intl.DateTimeFormat`

格式化日期和时间。

#### `Intl.Collator`

做本地化字符串比较和排序。

#### locale

区域设置，例如 `en-US`、`en-GB`、`de-DE`、`zh-CN`。

### 底层机制

同一个数值或时间点，在不同地区应该显示成不同字符串。`Intl` 把“值”转换成“符合地区规则的用户可见文本”。

### 文件结构

```txt
09-intl-formatting/
  numberFormatDemo.js
  dateTimeFormatDemo.js
  collatorSortDemo.js
  manualCurrencyMistake.js
```

### `numberFormatDemo.js`

```js
// Goal:
// Format a currency amount with Intl.NumberFormat.

const cartTotalAmount = 1299.5;
const usdCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

console.log(usdCurrencyFormatter.format(cartTotalAmount));
```

### 预期输出

```txt
$1,299.50
```

### `dateTimeFormatDemo.js`

```js
// Goal:
// Format a Date for a specific locale and time zone.

const webinarStartDate = new Date('2026-05-12T15:00:00Z');
const londonDateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'Europe/London',
});

console.log(londonDateFormatter.format(webinarStartDate));
```

### 预期输出形状

```txt
Tuesday, 12 May 2026 at 16:00
```

不同运行环境的标点和空格可能略有差异。

### `collatorSortDemo.js`

```js
// Goal:
// Sort strings with a locale-aware collator.

const sortedCityNames = ['Zürich', 'Amsterdam', 'Ålesund'].sort(
  new Intl.Collator('de-DE').compare,
);

console.log(sortedCityNames);
```

### 预期输出形状

```txt
[ 'Ålesund', 'Amsterdam', 'Zürich' ]
```

具体排序可能受 locale 和运行环境数据影响。

### `manualCurrencyMistake.js`

```js
// Goal:
// Show why manual currency formatting is incomplete.

const rawPaymentAmount = 99.9;
const badPaymentLabel = '$' + rawPaymentAmount;

const betterPaymentFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

console.log(badPaymentLabel);
console.log(betterPaymentFormatter.format(rawPaymentAmount));
```

### 预期输出

```txt
$99.9
$99.90
```

### 常见错误 / 反例

| 错误 | 正确模型 |
|---|---|
| 用字符串拼接货币符号 | 使用 `Intl.NumberFormat`。 |
| 手写日期格式 | 使用 `Intl.DateTimeFormat`。 |
| 用普通 `<` 排序所有语言文本 | 使用 `Intl.Collator`。 |
| 以为国际化只是中文英文切换 | 国际化还包括数字、日期、货币、排序等规则。 |

### 和项目开发的关系

`Intl` 常用于：

```txt
金额显示
日期显示
百分比显示
用户语言环境适配
本地化排序
仪表盘和报表展示
```

---

## 14. 10：console 调试 API

### 结论

`console` 是运行时观察工具，不应该成为应用程序逻辑的一部分。

### 技术意义

调试不是到处打印。专业调试应该验证具体假设：某个变量是什么、某个分支是否执行、某个缓存是否命中、某段代码耗时多少。

### 新关键字和新概念

#### `console.log()`

打印普通调试信息。

#### `console.warn()`

打印警告信息。

#### `console.error()`

打印错误信息。

#### `console.table()`

以表格形式展示数组或对象数据。

#### `console.group()` / `console.groupEnd()`

分组输出。

#### `console.time()` / `console.timeEnd()`

测量代码耗时。

#### `console.trace()`

输出调用栈信息。

### 底层机制

`console` 把诊断信息发送给运行环境的调试界面。浏览器开发者工具和 Node 终端可能展示形式不同。

### 文件结构

```txt
10-console-debugging/
  orderInspectionConsole.js
  focusedDebuggingDemo.js
```

### `orderInspectionConsole.js`

```js
// Goal:
// Inspect structured data and timing with console APIs.

const orderRows = [
  { sku: 'KB-01', quantity: 2, price: 80 },
  { sku: 'MS-02', quantity: 1, price: 40 },
];

console.group('Order inspection');
console.table(orderRows);
console.time('order-total');

const orderTotalValue = orderRows.reduce((runningTotal, orderRow) => {
  return runningTotal + orderRow.quantity * orderRow.price;
}, 0);

console.timeEnd('order-total');
console.log(orderTotalValue);
console.groupEnd();
```

### 预期输出形状

```txt
Order inspection
(table output)
order-total: ...ms
200
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `console.group()` 开始一组输出。 |
| 2 | `console.table()` 展示数组对象表格。 |
| 3 | `console.time()` 开始计时。 |
| 4 | `reduce()` 计算订单总价。 |
| 5 | `console.timeEnd()` 结束计时并输出耗时。 |
| 6 | `console.groupEnd()` 结束分组。 |

### `focusedDebuggingDemo.js`

```js
// Goal:
// Use console output to test specific runtime assumptions.

const selectedUserIdValue = 'u-102';
const userCacheMap = new Map();

userCacheMap.set('u-101', { name: 'Ada' });

console.log('selected-user-id', selectedUserIdValue);
console.log('has-cache-entry', userCacheMap.has(selectedUserIdValue));
console.log('known-cache-keys', Array.from(userCacheMap.keys()));
```

### 预期输出

```txt
selected-user-id u-102
has-cache-entry false
known-cache-keys [ 'u-101' ]
```

### 常见错误 / 反例

| 错误 | 正确模型 |
|---|---|
| 到处写 `console.log(everything)` | 输出要验证具体假设。 |
| 依赖 console 输出作为业务逻辑 | console 只是诊断工具。 |
| 忘记清理临时调试输出 | 保留必要日志，删除噪声。 |
| 用 console 代替错误处理 | 错误处理应该使用返回值、异常或状态机制。 |

### 和项目开发的关系

`console` 是你排查作用域、模块导入、数据流、异步执行顺序时最直接的观察工具。它帮助你看见运行时状态，但不能替代对机制的理解。

---

## 15. 11：URL 和 URLSearchParams

### 结论

处理 URL 时，把 URL 当作结构化数据，不要把它当作字符串拼接题。

### 技术意义

URL 不只是一个字符串。它包含协议、主机名、路径、查询参数、哈希片段等结构。手写拼接容易破坏编码规则，尤其是查询参数里有空格、`&`、`=`、中文或特殊符号时。

### 新关键字和新概念

#### `URL`

把 URL 字符串解析成结构化对象。

#### `URLSearchParams`

管理查询字符串参数。

#### `searchParams`

`URL` 实例上的查询参数对象。

#### 编码（encoding）

把特殊字符转换成 URL 安全形式。

### 底层机制

创建 `URL` 对象时，运行环境解析字符串。修改属性或查询参数后，URL 对象能重新序列化成有效 URL 字符串。

### 文件结构

```txt
11-url-and-search-params/
  productSearchUrlBuilder.js
  readQueryParamsDemo.js
  unsafeUrlConcatMistake.js
```

### `productSearchUrlBuilder.js`

```js
// Goal:
// Build a URL with encoded query parameters.

const productSearchUrl = new URL('https://example.com/products');
productSearchUrl.searchParams.set('category', 'books');
productSearchUrl.searchParams.set('sort', 'price asc');
productSearchUrl.hash = 'results';

console.log(productSearchUrl.toString());
```

### 预期输出

```txt
https://example.com/products?category=books&sort=price+asc#results
```

不同运行环境可能把空格编码成 `+` 或 `%20`，但都表达“空格”。

### `readQueryParamsDemo.js`

```js
// Goal:
// Read query parameters from a URL object.

const incomingArticleUrl = new URL('https://example.com/read?id=42&mode=print');
const articleIdText = incomingArticleUrl.searchParams.get('id');
const articleModeText = incomingArticleUrl.searchParams.get('mode');
const missingValueText = incomingArticleUrl.searchParams.get('missing');

console.log(articleIdText);
console.log(articleModeText);
console.log(missingValueText);
```

### 预期输出

```txt
42
print
null
```

### `unsafeUrlConcatMistake.js`

```js
// Goal:
// Compare unsafe query string concatenation with URLSearchParams.

const unsafeSearchText = 'front end & JavaScript';
const unsafeSearchUrl = 'https://example.com/search?q=' + unsafeSearchText;

const safeSearchUrl = new URL('https://example.com/search');
safeSearchUrl.searchParams.set('q', unsafeSearchText);

console.log(unsafeSearchUrl);
console.log(safeSearchUrl.toString());
```

### 预期输出形状

```txt
https://example.com/search?q=front end & JavaScript
https://example.com/search?q=front+end+%26+JavaScript
```

### 常见错误 / 反例

| 错误 | 正确模型 |
|---|---|
| 手动拼接查询字符串 | 使用 `URLSearchParams`。 |
| 以为 `get()` 返回数字 | `get()` 返回字符串或 `null`。 |
| 忘记特殊字符需要编码 | `URLSearchParams` 会处理编码。 |
| 把 hash、search、path 混在一起拼 | 用 `URL` 属性分开处理。 |

### 和项目开发的关系

`URL` 和 `URLSearchParams` 常用于：

```txt
构造接口请求地址
读取当前页面查询参数
同步筛选条件到地址栏
生成分享链接
处理分页、排序、搜索参数
```

---

## 16. 12：setTimeout 和 setInterval

### 结论

定时器注册未来要执行的回调函数。它不会暂停当前 JavaScript 代码，也不保证精确时间执行。

### 技术意义

很多初学者把 `setTimeout()` 理解成“睡眠”。这是错的。它只是把回调交给宿主环境的定时系统。当前同步代码一定先继续执行。

### 新关键字和新概念

#### `setTimeout()`

延迟一段时间后执行一次回调。

#### `clearTimeout()`

取消还没有执行的 timeout。

#### `setInterval()`

按间隔重复执行回调。

#### `clearInterval()`

取消 interval。

#### 回调队列

定时器时间到了以后，回调只是变得可以被调度执行；如果调用栈还在忙，它不会立刻执行。

### 底层机制

```txt
当前同步代码执行
  -> 注册 timer
  -> 同步代码继续执行
  -> timer 到期
  -> 回调等待运行机会
  -> 调用栈空闲后执行回调
```

### 文件结构

```txt
12-timers/
  timeoutOrderDemo.js
  intervalHeartbeatDemo.js
  recursiveTimeoutPolling.js
  zeroDelayMistake.js
```

### `timeoutOrderDemo.js`

```js
// Goal:
// Verify that setTimeout does not pause synchronous code.

console.log('sync-start');

const reminderTimerId = setTimeout(() => {
  console.log('timer-callback');
}, 0);

console.log('sync-end');
clearTimeout(reminderTimerId);
```

### 预期输出

```txt
sync-start
sync-end
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 输出 `sync-start`。 |
| 2 | `setTimeout()` 注册回调。 |
| 3 | 回调不会在当前同步代码中立即运行。 |
| 4 | 输出 `sync-end`。 |
| 5 | `clearTimeout()` 取消尚未执行的 timer。 |

### `intervalHeartbeatDemo.js`

```js
// Goal:
// Run a repeated timer and stop it after three runs.

let heartbeatCount = 0;

const heartbeatIntervalId = setInterval(() => {
  heartbeatCount += 1;
  console.log('heartbeat', heartbeatCount);

  if (heartbeatCount === 3) {
    clearInterval(heartbeatIntervalId);
  }
}, 1000);
```

### 预期输出形状

```txt
heartbeat 1
heartbeat 2
heartbeat 3
```

### `recursiveTimeoutPolling.js`

```js
// Goal:
// Use recursive setTimeout to control repeated work.

let pollingAttemptCount = 0;

function schedulePollingAttempt() {
  pollingAttemptCount += 1;
  console.log('poll', pollingAttemptCount);

  if (pollingAttemptCount < 3) {
    setTimeout(schedulePollingAttempt, 1000);
  }
}

setTimeout(schedulePollingAttempt, 1000);
```

### 预期输出形状

```txt
poll 1
poll 2
poll 3
```

### `zeroDelayMistake.js`

```js
// Goal:
// Verify that zero delay does not mean immediate execution.

console.log('first');

setTimeout(() => {
  console.log('third');
}, 0);

console.log('second');
```

### 预期输出

```txt
first
second
third
```

### 常见错误 / 反例

| 错误 | 正确模型 |
|---|---|
| 以为 `setTimeout(fn, 0)` 会立即执行 | 它要等当前同步代码结束后才有机会执行。 |
| 以为 delay 是精确执行时间 | delay 是最小调度延迟，不是精确承诺。 |
| 忘记清除 interval | 不需要重复后要 `clearInterval()`。 |
| 用 `setInterval()` 执行耗时不稳定任务 | 可以考虑递归 `setTimeout()` 控制节奏。 |

### 和项目开发的关系

定时器常用于：

```txt
延迟提示
轮询
防抖节流底层实现
动画前的延迟逻辑
重试调度
会话倒计时
```

---

## 17. 13：小项目整合

### 结论

最后用一个小项目把第 11 章 API 组合起来：`URL`、`URLSearchParams`、`RegExp`、`Error`、`Number.isFinite()`、`Map`、`Date`、`Intl.NumberFormat`、`JSON.stringify()`、`console.table()`。

### 技术意义

真实项目不会孤立使用某一个标准库 API。你通常会先解析 URL，再验证参数，再构造数据，再格式化输出，再序列化成 JSON，再调试检查结果。

### 文件结构

```txt
13-standard-library-mini-project/
  analyticsPayloadBuilder.js
```

### `analyticsPayloadBuilder.js`

```js
// Goal:
// Combine multiple Chapter 11 APIs in one realistic data-processing flow.

const analyticsUrl = new URL('https://example.com/track?event=purchase&amount=1299.5');
const analyticsEventPattern = /^[a-z]+$/;
const analyticsEventName = analyticsUrl.searchParams.get('event');
const analyticsAmountText = analyticsUrl.searchParams.get('amount');

if (analyticsEventName === null || !analyticsEventPattern.test(analyticsEventName)) {
  throw new Error('Invalid analytics event name');
}

const analyticsAmountValue = Number(analyticsAmountText);

if (!Number.isFinite(analyticsAmountValue)) {
  throw new TypeError('Analytics amount must be numeric');
}

const analyticsPayloadMap = new Map();
analyticsPayloadMap.set('event', analyticsEventName);
analyticsPayloadMap.set('amount', analyticsAmountValue);
analyticsPayloadMap.set('createdAt', new Date().toISOString());

const analyticsFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const analyticsPayloadRecord = Object.fromEntries(analyticsPayloadMap);
const analyticsPayloadJson = JSON.stringify(analyticsPayloadRecord);

console.table([analyticsPayloadRecord]);
console.log(analyticsFormatter.format(analyticsAmountValue));
console.log(analyticsPayloadJson);
```

### 预期输出形状

```txt
(table output)
$1,299.50
{"event":"purchase","amount":1299.5,"createdAt":"..."}
```

### 执行过程

| 步骤 | 使用的 API | 作用 |
|---|---|---|
| 1 | `URL` | 解析结构化地址。 |
| 2 | `URLSearchParams` | 安全读取查询参数。 |
| 3 | `RegExp` | 验证事件名称格式。 |
| 4 | `Error` / `TypeError` | 分类非法输入。 |
| 5 | `Number.isFinite()` | 验证数值转换结果。 |
| 6 | `Map` | 暂存结构化键值数据。 |
| 7 | `Date` | 生成创建时间。 |
| 8 | `Intl.NumberFormat` | 格式化用户可见金额。 |
| 9 | `Object.fromEntries()` | 把 Map 条目转成普通对象。 |
| 10 | `JSON.stringify()` | 序列化数据。 |
| 11 | `console.table()` | 调试观察最终对象。 |

### 常见错误 / 反例

| 错误 | 正确模型 |
|---|---|
| 直接相信 URL 参数 | 先验证再使用。 |
| `Number(null)` 后不检查 | 数值转换后要验证是否有效。 |
| 手写金额格式 | 使用 `Intl.NumberFormat`。 |
| 直接 stringify `Map` | 先用 `Object.fromEntries()` 转为普通对象。 |

### 和项目开发的关系

这个小项目对应真实前端里的“数据进入系统”流程：

```txt
外部输入
  -> 解析
  -> 验证
  -> 转换
  -> 结构化
  -> 格式化
  -> 序列化
  -> 调试观察
```

---

## 18. 最终文件清单

```txt
javascript-standard-library-learning/
  00-what-standard-library-means/
    builtInApiOverview.js

  01-set-uniqueness/
    tagSetDemo.js
    uniqueCategoryList.js
    objectReferenceSetMistake.js

  02-map-key-value-storage/
    pageVisitCounter.js
    wordFrequencyTable.js
    mapBracketMistake.js
    objectKeyMapDemo.js
    mapDeleteDemo.js
    mapEntriesIterationDemo.js

  03-weak-collections/
    weakMapMetadataStore.js
    weakSetProcessedObjects.js
    weakMapIterationMistake.js

  04-binary-data/
    arrayBufferViewDemo.js
    messageHeaderBuilder.js
    byteLengthMistake.js

  05-regular-expressions/
    invoicePatternDemo.js
    productCodeValidator.js
    dynamicKeywordPattern.js
    globalTestStateMistake.js

  06-date-and-time/
    dateTimestampDemo.js
    dateMutationDemo.js
    zeroBasedMonthMistake.js
    stableDateParsingDemo.js

  07-error-objects/
    quantityParser.js
    errorCauseDemo.js
    customErrorClassDemo.js
    throwStringMistake.js

  08-json-serialization/
    jsonRoundTripDemo.js
    jsonReplacerDemo.js
    jsonReviverDemo.js
    unsupportedValueMistake.js
    circularReferenceMistake.js

  09-intl-formatting/
    numberFormatDemo.js
    dateTimeFormatDemo.js
    collatorSortDemo.js
    manualCurrencyMistake.js

  10-console-debugging/
    orderInspectionConsole.js
    focusedDebuggingDemo.js

  11-url-and-search-params/
    productSearchUrlBuilder.js
    readQueryParamsDemo.js
    unsafeUrlConcatMistake.js

  12-timers/
    timeoutOrderDemo.js
    intervalHeartbeatDemo.js
    recursiveTimeoutPolling.js
    zeroDelayMistake.js

  13-standard-library-mini-project/
    analyticsPayloadBuilder.js

  javascript-standard-library-learning-notes.md
```

---

## 19. 最终学习笔记转换要求

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
技术术语：中文后面补英文。
代码命名：英文。
代码注释：英文。
不要中英文标题混用。
```

### 代码命名要求

```txt
不要反复使用 fn、obj、data、user 这种泛名。
每个例子用有业务含义的命名。
不同主题尽量避免重复类名、函数名、变量名。
```

### 最终笔记不是本指导文件

指导文件负责告诉你怎么学、怎么创建练习、怎么观察输出。最终学习笔记要更像你自己的总结：

```txt
我学到了什么。
这个 API 解决什么问题。
它底层怎么运作。
我写了什么代码验证。
我踩过什么坑。
我最后怎么记住它。
```

---

## 20. 本章最终要能回答的问题

学完第 11 章，你应该能回答：

```txt
1. 标准库和语法有什么区别？
2. 什么是内置对象？什么是宿主环境 API？
3. 为什么学习标准库不能只背方法名？
4. Set 和 Array 的核心区别是什么？
5. Set 为什么不能按结构去重对象？
6. Map 和普通对象的键有什么区别？
7. 为什么不能用 bracket syntax 写入 Map 条目？
8. WeakMap 为什么不能遍历？
9. WeakMap 和垃圾回收有什么关系？
10. ArrayBuffer 和 TypedArray 是什么关系？
11. DataView 为什么需要字节偏移和字节序？
12. byteLength 和 length 有什么区别？
13. RegExp 字面量和 RegExp 构造函数有什么区别？
14. 捕获组是什么？
15. 为什么带 g 的正则配合 test() 可能有状态陷阱？
16. RegExp.escape() 解决什么问题？
17. Date 内部保存的到底是什么？
18. 为什么 Date 数字月份从 0 开始容易出错？
19. 本地时间方法和 UTC 方法有什么区别？
20. 为什么应该抛 Error 对象而不是字符串？
21. TypeError 和 RangeError 分别适合什么情况？
22. Error cause 解决什么问题？
23. JSON 和 JavaScript 对象有什么关系？有什么区别？
24. JSON.stringify() 遇到 undefined、function、symbol 会怎样？
25. JSON.parse() 的 reviver 有什么用？
26. Intl.NumberFormat 为什么比字符串拼接更可靠？
27. Intl.DateTimeFormat 和时区有什么关系？
28. console.table()、console.time() 分别适合什么调试场景？
29. URL 为什么应该当作结构化数据处理？
30. URLSearchParams 为什么比手动拼接查询字符串更安全？
31. setTimeout() 为什么不是暂停当前代码？
32. setTimeout(fn, 0) 为什么不等于立即执行？
33. setInterval() 和递归 setTimeout() 的控制差异是什么？
34. 如何把第 11 章 API 组合进一个真实模块？
```

---

## 21. MDN 阅读清单

### 结论

MDN 不应该代替你的机制理解。它应该用来查方法签名、边界行为、兼容性和更多示例。

### 阅读方式

每读一个 MDN 页面，按这个顺序看：

```txt
1. 这个 API 属于哪个对象？
2. 它是构造函数、静态方法，还是实例方法？
3. 它会不会修改原对象？
4. 它的返回值是什么？
5. 参数有没有容易误解的地方？
6. 有没有异常情况？
7. 浏览器或 Node 支持情况如何？
```

### 清单

```txt
Map:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

Set:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

Typed arrays guide:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays

ArrayBuffer:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer

DataView:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView

RegExp:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

Regular expressions guide:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions

Date:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

Error:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

JSON:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON

Intl:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

console:
https://developer.mozilla.org/en-US/docs/Web/API/console

URL:
https://developer.mozilla.org/en-US/docs/Web/API/URL

URLSearchParams:
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

setTimeout():
https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
```

---

## 22. 第 11 章最终记忆模型

### 总模型

第 11 章不是一堆互不相关的 API。它是一组围绕“数据问题”的内置工具：

```txt
需要唯一性                         -> Set
需要键值查找                       -> Map
需要对象私有元数据                 -> WeakMap
需要原始字节                       -> ArrayBuffer
需要把字节解释成数值元素           -> TypedArray
需要精确二进制读写                 -> DataView
需要文本模式匹配                   -> RegExp
需要表示一个时间点                 -> Date
需要表示失败                       -> Error
需要数据交换文本                   -> JSON
需要用户可见格式化                 -> Intl
需要运行时观察                     -> console
需要结构化 URL                     -> URL and URLSearchParams
需要延迟或重复执行                 -> setTimeout and setInterval
```

### 专业学习目标

你不是要达到“见过这些名字”的程度，而是要达到：

```txt
1. 我知道每个 API 解决什么问题。
2. 我知道每个 API 内部拥有什么数据模型。
3. 我知道什么时候应该用它，而不是用普通对象、数组、字符串或手写格式化。
4. 我知道它最常见的运行时陷阱。
5. 我能把这些 API 放进模块里，写出真实可用的小工具。
```

### 最后一句话

```txt
标准库不是语法糖。
标准库是 JavaScript 已经为你实现好的数据结构、数据格式、文本处理、时间处理、错误处理、调试工具、URL 工具和调度工具。
```

---

## 23. v3 API 细节补全总规范

### 结论

本节开始是 v3 的 API 细节补全。以后学习标准库时，不能只写 API 名称，必须同时写清楚：

```txt
API belongs to which object.
API is a property, method, constructor, static method, or parameter.
API receives which arguments.
API returns which value.
API mutates existing state or returns a new value.
API has which common traps.
```

中文记忆：先判断“点号左边是谁”，再判断“这个名字到底是属性、方法、参数还是返回值”。

### 必须主动区分的四类名字

| 类型 | English term | 判断方式 | 例子 |
|---|---|---|---|
| 属性 | property | 对象上的数据成员，不一定有括号 | `url.hash`, `map.size`, `buffer.byteLength` |
| 方法 | method | 对象上的函数成员，调用时有括号 | `map.set()`, `params.get()`, `formatter.format()` |
| 参数 | parameter | 函数定义或 API 签名里的形参名 | `handler`, `timeout`, `value`, `replacer`, `space` |
| 实参 | argument | 调用函数时真正传入的值 | `schedulePollingAttempt`, `1000`, `'USD'` |

### 示例：不要把参数名误认为属性名

```js
// Goal:
// Distinguish parameters from object properties.

setTimeout(() => {
  console.log('later');
}, 1000);
```

这里 API 签名可以写成：

```txt
setTimeout(handler, timeout)
```

但 `handler` 和 `timeout` 不是代码里的对象属性。它们只是说明：第一个实参是稍后执行的函数，第二个实参是等待毫秒数。

---

## 24. Set API 细节补全

### 结论

`Set` 表示唯一值集合（unique value collection）。它关注“值是否存在”，不是“键对应什么值”。

### API / 语法规范

```txt
new Set(iterable?)
set.add(value)
set.has(value)
set.delete(value)
set.clear()
set.entries()
set.keys()
set.values()
set.forEach(callbackFn)
set.size
```

### 固定属性名 / 固定方法名 / 参数签名

| API | 类型 | 参数 | 返回值 | 是否修改原 Set | 作用 |
|---|---|---|---|---|---|
| `size` | property | 无 | number | 否 | 唯一值数量 |
| `add(value)` | method | `value` | 当前 Set | 是 | 添加值 |
| `has(value)` | method | `value` | boolean | 否 | 判断值是否存在 |
| `delete(value)` | method | `value` | boolean | 是 | 删除值，成功返回 `true` |
| `clear()` | method | 无 | `undefined` | 是 | 清空 Set |
| `values()` | method | 无 | iterator | 否 | 按插入顺序遍历值 |
| `keys()` | method | 无 | iterator | 否 | 和 `values()` 相同 |
| `entries()` | method | 无 | iterator | 否 | 每项是 `[value, value]` |
| `forEach(callbackFn)` | method | function | `undefined` | 否 | 遍历每个值 |

### 为什么 `entries()` 是 `[value, value]`

`Set` 没有 key-value pair，只有 value。但为了和 `Map` 的迭代接口保持形状兼容，`Set.prototype.entries()` 返回：

```txt
[value, value]
```

### 示例代码

```js
// Goal:
// Verify Set method return values and iteration shapes.

const permissionSet = new Set(['read', 'write']);

const addedResult = permissionSet.add('read');
const hasWritePermission = permissionSet.has('write');
const deletedExecutePermission = permissionSet.delete('execute');
const firstEntry = permissionSet.entries().next().value;

console.log(addedResult === permissionSet);
console.log(hasWritePermission);
console.log(deletedExecutePermission);
console.log(firstEntry);
console.log(permissionSet.size);
```

### 预期输出

```txt
true
true
false
[ 'read', 'read' ]
2
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `size()` | `size` 是属性，不是方法。 |
| `entries()` 返回普通数组 | 返回 iterator。需要 `Array.from()` 才变成数组。 |
| Set 可以按对象内容去重 | 对象按引用身份比较。 |
| `delete()` 找不到值会报错 | 不报错，返回 `false`。 |

---

## 25. Map API 细节补全

### 结论

`Map` 是真实键值映射（key-value mapping）。它的 key 可以是任意值，`set()`、`get()`、`delete()` 都操作 Map 内部的 entry，不是普通对象属性。

### API / 语法规范

```txt
new Map(iterable?)
map.set(key, value)
map.get(key)
map.has(key)
map.delete(key)
map.clear()
map.entries()
map.keys()
map.values()
map.forEach(callbackFn)
map.size
```

### 固定属性名 / 固定方法名 / 参数签名

| API | 类型 | 参数 | 返回值 | 是否修改原 Map | 作用 |
|---|---|---|---|---|---|
| `size` | property | 无 | number | 否 | entry 数量 |
| `set(key, value)` | method | key, value | 当前 Map | 是 | 写入或覆盖 entry |
| `get(key)` | method | key | value 或 `undefined` | 否 | 读取 key 对应值 |
| `has(key)` | method | key | boolean | 否 | 判断 key 是否存在 |
| `delete(key)` | method | key | boolean | 是 | 删除 entry |
| `clear()` | method | 无 | `undefined` | 是 | 清空所有 entry |
| `entries()` | method | 无 | iterator | 否 | 遍历 `[key, value]` |
| `keys()` | method | 无 | iterator | 否 | 遍历 key |
| `values()` | method | 无 | iterator | 否 | 遍历 value |
| `forEach(callbackFn)` | method | function | `undefined` | 否 | 依次处理 entry |

### `Map.set()` 和其他 `set()` 的区别

| 写法 | 所属对象 | 作用 |
|---|---|---|
| `map.set(key, value)` | `Map` | 设置内存中的 key-value entry |
| `url.searchParams.set(name, value)` | `URLSearchParams` | 设置 URL query parameter |
| `headers.set(name, value)` | `Headers` | 设置 HTTP header |
| `formData.set(name, value)` | `FormData` | 设置表单字段 |

判断规则：看点号左边是谁。

### 示例代码

```js
// Goal:
// Verify Map methods and compare missing keys with undefined values.

const runtimeStatusMap = new Map();

runtimeStatusMap.set('ready', true);
runtimeStatusMap.set('error', undefined);

console.log(runtimeStatusMap.get('ready'));
console.log(runtimeStatusMap.get('missing'));
console.log(runtimeStatusMap.has('error'));
console.log(runtimeStatusMap.delete('ready'));
console.log(runtimeStatusMap.size);
console.log(Array.from(runtimeStatusMap.entries()));
```

### 预期输出

```txt
true
undefined
true
true
1
[ [ 'error', undefined ] ]
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `map.key = value` 能写入 Map entry | 这是给 Map 对象加普通属性，不是 Map entry。 |
| `get()` 返回 `undefined` 就说明 key 不存在 | 不一定。key 可能存在，只是 value 是 `undefined`。用 `has()` 判断。 |
| `set(key, undefined)` 等于删除 | 不等于。entry 还在。 |
| `delete` 操作符和 `map.delete()` 一样 | 不一样。`delete object.prop` 删除对象属性；`map.delete(key)` 删除 Map entry。 |

---

## 26. WeakMap 和 WeakSet API 细节补全

### 结论

`WeakMap` 和 `WeakSet` 是弱集合（weak collections）。它们适合把信息关联到对象，但不阻止对象被垃圾回收（garbage collection）。

### API / 语法规范

```txt
new WeakMap(iterable?)
weakMap.set(keyObject, value)
weakMap.get(keyObject)
weakMap.has(keyObject)
weakMap.delete(keyObject)

new WeakSet(iterable?)
weakSet.add(valueObject)
weakSet.has(valueObject)
weakSet.delete(valueObject)
```

### 固定方法名

| API | 参数要求 | 返回值 | 说明 |
|---|---|---|---|
| `weakMap.set(key, value)` | key 必须是对象或非注册符号 | WeakMap | 保存对象关联数据 |
| `weakMap.get(key)` | key 必须是对象或非注册符号 | value 或 `undefined` | 读取关联数据 |
| `weakMap.has(key)` | key 必须是对象或非注册符号 | boolean | 判断是否有关联 |
| `weakMap.delete(key)` | key 必须是对象或非注册符号 | boolean | 删除关联 |
| `weakSet.add(value)` | value 必须是对象或非注册符号 | WeakSet | 记录对象存在 |
| `weakSet.has(value)` | value 必须是对象或非注册符号 | boolean | 判断对象是否被记录 |
| `weakSet.delete(value)` | value 必须是对象或非注册符号 | boolean | 删除记录 |

### 为什么没有 `size` / `keys()` / `entries()`

因为弱引用条目可能随着垃圾回收随时消失。暴露数量和遍历结果会破坏弱集合的语义，所以：

```txt
WeakMap has no size.
WeakMap has no keys().
WeakMap has no values().
WeakMap has no entries().
WeakSet has no size.
WeakSet is not iterable.
```

### 示例代码

```js
// Goal:
// Verify that WeakMap stores metadata by object identity.

const componentStateStore = new WeakMap();
const componentRecord = { id: 'panel-1' };

componentStateStore.set(componentRecord, { expanded: true });

console.log(componentStateStore.has(componentRecord));
console.log(componentStateStore.get(componentRecord).expanded);
console.log(typeof componentStateStore.entries);
console.log(componentStateStore.size);
```

### 预期输出

```txt
true
true
undefined
undefined
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 用字符串当 WeakMap key | WeakMap key 必须是对象或非注册符号。 |
| 想遍历 WeakMap | WeakMap 不能遍历。 |
| 想统计 WeakSet 数量 | WeakSet 没有 `size`。 |
| 把 WeakMap 当普通缓存表 | 如果要枚举缓存，用 Map。 |

---

## 27. ArrayBuffer、TypedArray、DataView API 细节补全

### 结论

二进制 API 的核心区别是：`ArrayBuffer` 拥有字节，`TypedArray` 按固定元素类型解释字节，`DataView` 按指定偏移和字节序精确读写字节。

### API / 属性规范

```txt
new ArrayBuffer(byteLength)
arrayBuffer.byteLength

new Uint8Array(bufferOrLength)
typedArray.length
typedArray.byteLength
typedArray.byteOffset
typedArray.buffer
typedArray.BYTES_PER_ELEMENT
typedArray.set(sourceArray, offset?)
typedArray.subarray(begin?, end?)
typedArray.slice(begin?, end?)

new DataView(buffer, byteOffset?, byteLength?)
dataView.getUint8(byteOffset)
dataView.getUint16(byteOffset, littleEndian?)
dataView.getInt8(byteOffset)
dataView.getInt16(byteOffset, littleEndian?)
dataView.setUint8(byteOffset, value)
dataView.setUint16(byteOffset, value, littleEndian?)
dataView.setInt8(byteOffset, value)
dataView.setInt16(byteOffset, value, littleEndian?)
```

### 固定属性名区别

| 名称 | 所属对象 | 含义 |
|---|---|---|
| `buffer.byteLength` | ArrayBuffer | buffer 总字节数 |
| `typedArray.length` | TypedArray | 元素个数 |
| `typedArray.byteLength` | TypedArray | 当前视图覆盖的字节数 |
| `typedArray.byteOffset` | TypedArray | 当前视图从 buffer 第几个字节开始 |
| `typedArray.buffer` | TypedArray | 背后的 ArrayBuffer |
| `TypedArray.BYTES_PER_ELEMENT` | TypedArray 构造函数或实例 | 每个元素占多少字节 |

### `set()` 在 TypedArray 中是什么意思

`typedArray.set(sourceArray, offset?)` 不是 Map 的 `set()`。它是把一个数组或 typed array 的元素批量复制到当前 typed array 中。

### 示例代码

```js
// Goal:
// Distinguish byteLength, length, BYTES_PER_ELEMENT, and typedArray.set().

const sampleBuffer = new ArrayBuffer(16);
const sampleFloatView = new Float32Array(sampleBuffer);

sampleFloatView.set([1.5, 2.5], 1);

console.log(sampleBuffer.byteLength);
console.log(sampleFloatView.length);
console.log(sampleFloatView.BYTES_PER_ELEMENT);
console.log(sampleFloatView[0]);
console.log(sampleFloatView[1]);
console.log(sampleFloatView[2]);
```

### 预期输出

```txt
16
4
4
0
1.5
2.5
```

### DataView 字节序示例

```js
// Goal:
// Verify DataView endian control when writing and reading a 16-bit value.

const headerBuffer = new ArrayBuffer(2);
const headerView = new DataView(headerBuffer);

headerView.setUint16(0, 258, false);

console.log(headerView.getUint8(0));
console.log(headerView.getUint8(1));
console.log(headerView.getUint16(0, false));
console.log(headerView.getUint16(0, true));
```

### 预期输出

```txt
1
2
258
513
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `ArrayBuffer` 可以直接按索引读写 | 必须通过 view。 |
| `byteLength` 和 `length` 一样 | 一个是字节数，一个是元素数。 |
| `setUint16` 写一个字节 | `Uint16` 写两个字节。 |
| 写入和读取字节序不一致 | 读回的数值会不同。 |
| TypedArray 的 `set()` 和 Map 一样 | TypedArray 的 `set()` 是批量复制元素。 |

---

## 28. RegExp API 细节补全

### 结论

`RegExp` 是模式匹配对象。要同时掌握匹配方法、固定属性、flags 和 `lastIndex` 状态。

### API / 属性规范

```txt
/pattern/flags
new RegExp(pattern, flags?)
regExp.test(text)
regExp.exec(text)
regExp.source
regExp.flags
regExp.global
regExp.ignoreCase
regExp.multiline
regExp.dotAll
regExp.unicode
regExp.sticky
regExp.lastIndex
RegExp.escape(text)
```

### 固定属性名 / 方法名

| API | 类型 | 返回值 | 说明 |
|---|---|---|---|
| `test(text)` | method | boolean | 判断是否匹配 |
| `exec(text)` | method | match array 或 `null` | 返回匹配细节和捕获组 |
| `source` | property | string | 正则源模式文本 |
| `flags` | property | string | flag 字符串 |
| `global` | property | boolean | 是否有 `g` |
| `ignoreCase` | property | boolean | 是否有 `i` |
| `multiline` | property | boolean | 是否有 `m` |
| `dotAll` | property | boolean | 是否有 `s` |
| `unicode` | property | boolean | 是否有 `u` |
| `sticky` | property | boolean | 是否有 `y` |
| `lastIndex` | property | number | 下一次匹配开始位置，`g` / `y` 时尤其重要 |
| `RegExp.escape(text)` | static method | string | 转义用户输入文本 |

### `test()` 和 `exec()` 区别

```txt
test() asks: does it match?
exec() asks: what exactly matched?
```

### 示例代码

```js
// Goal:
// Compare RegExp.test(), exec(), flags, and lastIndex.

const orderCodePattern = /^ORD-(\d{4})$/;
const orderCodeMatch = orderCodePattern.exec('ORD-2026');

console.log(orderCodePattern.test('ORD-2026'));
console.log(orderCodeMatch[0]);
console.log(orderCodeMatch[1]);
console.log(orderCodePattern.source);
console.log(orderCodePattern.flags);

const digitPattern = /\d/g;
console.log(digitPattern.test('a1'));
console.log(digitPattern.lastIndex);
console.log(digitPattern.test('a1'));
console.log(digitPattern.lastIndex);
```

### 预期输出

```txt
true
ORD-2026
2026
^ORD-(\d{4})$

true
2
false
0
```

`flags` 没有 flag 时是空字符串，所以那一行看起来像空行。

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 验证表单时无脑加 `g` | `g` 会让 `test()` 受 `lastIndex` 状态影响。 |
| `exec()` 只返回 true/false | `exec()` 返回数组或 `null`。 |
| `source` 包含 `/.../` 两边斜杠 | `source` 只包含模式文本。 |
| 用户输入可以直接拼进 RegExp | 要先转义，否则 `.`、`+`、`*` 会变成正则语法。 |

---

## 29. Date API 细节补全

### 结论

`Date` 是时间点对象（instant object），内部核心是毫秒时间戳（timestamp in milliseconds）。不同方法只是用不同方式读取或格式化这个时间点。

### API / 语法规范

```txt
new Date()
new Date(dateTimeText)
new Date(year, monthIndex, day?, hours?, minutes?, seconds?, milliseconds?)
Date.now()
date.getTime()
date.toISOString()
date.getFullYear()
date.getMonth()
date.getDate()
date.getDay()
date.getHours()
date.getMinutes()
date.getSeconds()
date.getUTCFullYear()
date.getUTCMonth()
date.getUTCDate()
date.setDate(day)
date.setUTCDate(day)
```

### 固定方法名 / 返回值

| API | 返回值 | 说明 |
|---|---|---|
| `Date.now()` | number | 当前时间戳，毫秒 |
| `date.getTime()` | number | 当前 Date 对象的时间戳，毫秒 |
| `date.toISOString()` | string | UTC ISO 字符串 |
| `date.getFullYear()` | number | 本地时区年份 |
| `date.getMonth()` | number | 本地时区月份索引，0 到 11 |
| `date.getDate()` | number | 本地时区每月第几天，1 到 31 |
| `date.getDay()` | number | 本地时区星期几，0 到 6，0 是 Sunday |
| `date.getHours()` | number | 本地时区小时 |
| `date.getMinutes()` | number | 本地时区分钟 |
| `date.setDate(day)` | number | 修改原 Date，并返回新时间戳 |

### `getTime()`、`Date.now()`、`toISOString()` 区别

```txt
Date.now()
当前时刻 -> timestamp number

someDate.getTime()
某个 Date 对象表示的时刻 -> timestamp number

someDate.toISOString()
某个 Date 对象表示的时刻 -> UTC ISO string
```

### 示例代码

```js
// Goal:
// Compare timestamp, ISO output, and zero-based month.

const subscriptionStartDate = new Date('2026-05-12T18:30:00Z');
const subscriptionLocalMonthIndex = subscriptionStartDate.getMonth();
const subscriptionTimestamp = subscriptionStartDate.getTime();

console.log(typeof subscriptionTimestamp);
console.log(subscriptionStartDate.toISOString());
console.log(subscriptionLocalMonthIndex);
console.log(new Date(2026, 4, 12).getMonth());
```

### 预期输出形状

```txt
number
2026-05-12T18:30:00.000Z
4
4
```

`getMonth()` 的结果取决于本地时区解释，但 `new Date(2026, 4, 12).getMonth()` 一定返回 `4`，因为数字构造函数里的月份是 `monthIndex`。

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `getMonth()` 返回人类月份 1 到 12 | 返回 `monthIndex`，0 到 11。 |
| `getDate()` 是获取 Date 对象 | 它返回“这个月第几天”。 |
| `getTime()` 返回秒 | 返回毫秒。 |
| `Date.now()` 和 `new Date().toISOString()` 一样 | 前者是 number，后者是 string。 |
| `setDate()` 返回新 Date | 它修改原对象，返回时间戳。 |

---

## 30. Error API 细节补全

### 结论

`Error` 是结构化失败对象。`message` 是错误说明，`name` 是错误类型名称，`cause` 保存底层错误，`stack` 保存调用栈信息。

### API / 语法规范

```txt
new Error(message?, options?)
new TypeError(message?, options?)
new RangeError(message?, options?)
new SyntaxError(message?, options?)
error.name
error.message
error.cause
error.stack
class CustomError extends Error
super(message)
```

### 固定属性名

| 属性 | 所属对象 | 说明 |
|---|---|---|
| `message` | Error instance | 当前错误说明 |
| `name` | Error instance / prototype | 错误类型名称 |
| `cause` | Error instance | 被包装的原始错误 |
| `stack` | Error instance | 调用栈，宿主环境提供，不应写业务逻辑依赖 |

### `super()` 和 `this.fieldName`

在自定义错误类里：

```js
// Goal:
// Store structured error details on a custom Error instance.

class RequiredFieldError extends Error {
  constructor(fieldNameText) {
    super(`Required field missing: ${fieldNameText}`);
    this.name = 'RequiredFieldError';
    this.fieldName = fieldNameText;
  }
}
```

```txt
super(message)
调用父类 Error constructor，初始化 message 和错误基础信息。

this.fieldName = fieldNameText
把业务字段名保存到当前错误对象上，方便 catch 以后读取结构化信息。
```

### IDE 警告说明

某些 IDE 可能对：

```js
new Error('Settings failed', { cause: originalError });
```

提示参数数量不对。这通常是 IDE 或类型库没有识别 `ErrorOptions`，不一定是运行时代码错误。判断时要区分：

```txt
runtime support
运行环境是否支持。

static inspection
编辑器是否识别。
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 抛字符串 | 抛 `Error` 对象。 |
| 以为 `super()` 是重写方法 | `super()` 调用父类 constructor。 |
| 以为 catch 变量名必须叫 error | catch 变量名可以自己起。 |
| 只靠 message 解析业务信息 | 用自定义属性保存结构化细节。 |

---

## 31. JSON API 细节补全

### 结论

`JSON.stringify()` 是序列化（serialization），`JSON.parse()` 是解析 / 反序列化（parsing / deserialization）。它们处理的是 JSON 文本和 JavaScript 值之间的转换。

### API / 语法规范

```txt
JSON.stringify(value, replacer?, space?)
JSON.parse(text, reviver?)
object.toJSON()
```

### 参数签名

| API | 参数 | 返回值 | 说明 |
|---|---|---|---|
| `JSON.stringify(value)` | JS value | string 或 `undefined` | 转 JSON 文本 |
| `JSON.stringify(value, replacer)` | function / array / null | string | 过滤或转换属性 |
| `JSON.stringify(value, replacer, space)` | number / string | string | 控制缩进格式 |
| `JSON.parse(text)` | JSON text | JS value | 解析 JSON 字符串 |
| `JSON.parse(text, reviver)` | function | JS value | 恢复或转换解析后的值 |

### `replacer` 和 `reviver` 区别

```txt
replacer belongs to stringify.
It controls what goes out to JSON text.

reviver belongs to parse.
It controls what comes back into JavaScript values.
```

### `space` 是参数，不是属性

`space` 是 `JSON.stringify()` 的第三个参数，用来控制缩进，不是对象属性。

### 示例代码

```js
// Goal:
// Compare replacer, space, and reviver behavior.

const sessionRecord = {
  id: 12,
  token: 'secret-value',
  createdAt: new Date('2026-05-12T00:00:00Z'),
};

const publicSessionJson = JSON.stringify(sessionRecord, ['id', 'createdAt'], 2);
const restoredSessionRecord = JSON.parse(publicSessionJson, (propertyName, propertyValue) => {
  if (propertyName === 'createdAt') {
    return new Date(propertyValue);
  }

  return propertyValue;
});

console.log(publicSessionJson);
console.log(restoredSessionRecord.createdAt instanceof Date);
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| JSON 和对象一样 | JSON 是 text；object 是运行时对象。 |
| `parse()` 之前必须 `stringify()` | 只有手里是 JS 值时才需要 stringify；已有 JSON text 可以直接 parse。 |
| reviver 忘记 `return propertyValue` | 返回 `undefined` 会删除属性。 |
| `space` 是属性 | `space` 是第三个参数。 |
| JSON 能保存循环引用 | 普通 JSON 不支持 circular reference。 |
| `format()` / `stringify()` 返回对象 | 它们返回 string。 |

---

## 32. Intl API 细节补全

### 结论

`Intl` 把原始值转换成符合地区规则的显示字符串。`format()` 返回 string，`compare()` 返回 number，`resolvedOptions()` 返回当前格式化器实际使用的配置对象。

### `Intl.NumberFormat`

```txt
new Intl.NumberFormat(locales?, options?)
numberFormatter.format(number)
numberFormatter.resolvedOptions()
```

常见 options 固定属性名：

| 属性 | 常见值 | 说明 |
|---|---|---|
| `style` | `'decimal'`, `'currency'`, `'percent'`, `'unit'` | 数字格式类型 |
| `currency` | `'USD'`, `'EUR'`, `'CNY'` | 货币代码，`style: 'currency'` 时需要 |
| `currencyDisplay` | `'symbol'`, `'code'`, `'name'`, `'narrowSymbol'` | 货币显示方式 |
| `minimumFractionDigits` | number | 最少小数位 |
| `maximumFractionDigits` | number | 最多小数位 |

### `Intl.DateTimeFormat`

```txt
new Intl.DateTimeFormat(locales?, options?)
dateTimeFormatter.format(date)
dateTimeFormatter.resolvedOptions()
```

常见 options 固定属性名：

| 属性 | 常见值 | 说明 |
|---|---|---|
| `dateStyle` | `'full'`, `'long'`, `'medium'`, `'short'` | 日期格式详细程度 |
| `timeStyle` | `'full'`, `'long'`, `'medium'`, `'short'` | 时间格式详细程度 |
| `timeZone` | IANA time zone name | 显示时区 |
| `year` | `'numeric'`, `'2-digit'` | 年 |
| `month` | `'numeric'`, `'2-digit'`, `'long'`, `'short'`, `'narrow'` | 月 |
| `day` | `'numeric'`, `'2-digit'` | 日 |
| `hour` | `'numeric'`, `'2-digit'` | 小时 |
| `minute` | `'numeric'`, `'2-digit'` | 分钟 |
| `second` | `'numeric'`, `'2-digit'` | 秒 |
| `weekday` | `'long'`, `'short'`, `'narrow'` | 星期 |

### `Intl.Collator`

```txt
new Intl.Collator(locales?, options?)
collator.compare(leftText, rightText)
collator.resolvedOptions()
```

常见 options 固定属性名：

| 属性 | 常见值 | 说明 |
|---|---|---|
| `sensitivity` | `'base'`, `'accent'`, `'case'`, `'variant'` | 比较时是否区分重音、大小写等 |
| `numeric` | boolean | 是否按数字意义比较文本中的数字 |
| `caseFirst` | `'upper'`, `'lower'`, `'false'` | 大小写排序优先级 |

### 示例代码

```js
// Goal:
// Verify Intl format(), compare(), and resolvedOptions().

const checkoutAmountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const cityNameCollator = new Intl.Collator('de-DE', {
  sensitivity: 'base',
});

console.log(checkoutAmountFormatter.format(99.9));
console.log(typeof checkoutAmountFormatter.format(99.9));
console.log(cityNameCollator.compare('Amsterdam', 'Zürich') < 0);
console.log(checkoutAmountFormatter.resolvedOptions().currency);
```

### 预期输出形状

```txt
$99.90
string
true
USD
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `format()` 返回 number | 返回 string。 |
| console 不显示引号，所以不是 string | `console.log()` 打印字符串内容，不打印源码引号。 |
| options 属性名可以随便起 | 必须是 API 规定的固定属性名。 |
| `compare()` 返回排序后的数组 | 它只比较两个字符串，返回 number。 |
| 默认 sort 适合所有语言 | 本地化排序用 `Intl.Collator().compare`。 |

---

## 33. URL 和 URLSearchParams API 细节补全

### 结论

`URL` 是结构化地址对象，`URLSearchParams` 是 query string 管理器。不要手动拼接 `?`、`&`、`=` 和 `#`。

### URL 固定属性名

```txt
url.href
url.origin
url.protocol
url.host
url.hostname
url.port
url.pathname
url.search
url.searchParams
url.hash
url.toString()
```

| 属性 / 方法 | 返回值 | 说明 |
|---|---|---|
| `href` | string | 完整 URL |
| `origin` | string | 协议 + 主机 + 端口 |
| `protocol` | string | 协议，例如 `'https:'` |
| `host` | string | 主机名 + 端口 |
| `hostname` | string | 主机名 |
| `port` | string | 端口，没有则空字符串 |
| `pathname` | string | 路径 |
| `search` | string | `?` 后的查询字符串，包含 `?` |
| `searchParams` | URLSearchParams | 查询参数对象 |
| `hash` | string | `#` 后的片段，读取时通常包含 `#` |
| `toString()` | string | 序列化完整 URL |

### URLSearchParams 固定方法名

```txt
searchParams.get(name)
searchParams.set(name, value)
searchParams.append(name, value)
searchParams.delete(name)
searchParams.has(name)
searchParams.entries()
searchParams.keys()
searchParams.values()
searchParams.toString()
```

| 方法 | 返回值 | 说明 |
|---|---|---|
| `get(name)` | string 或 `null` | 读取第一个同名参数 |
| `set(name, value)` | `undefined` | 设置参数；同名旧值会被替换 |
| `append(name, value)` | `undefined` | 追加参数；允许同名多值 |
| `delete(name)` | `undefined` | 删除同名参数 |
| `has(name)` | boolean | 是否存在参数 |
| `entries()` | iterator | 遍历 `[name, value]` |
| `keys()` | iterator | 遍历参数名 |
| `values()` | iterator | 遍历参数值 |
| `toString()` | string | 生成不带 `?` 的 query string |

### `hash` 是什么属性

`url.hash` 表示 fragment identifier，也就是 URL 中 `#` 后面的部分。它不是密码学哈希，也不是哈希表。

### 示例代码

```js
// Goal:
// Verify URL properties and URLSearchParams methods.

const reportUrl = new URL('https://example.com/reports?page=1');

reportUrl.searchParams.set('sort', 'created desc');
reportUrl.searchParams.append('tag', 'js');
reportUrl.searchParams.append('tag', 'api');
reportUrl.hash = 'summary';

console.log(reportUrl.pathname);
console.log(reportUrl.searchParams.get('page'));
console.log(reportUrl.searchParams.get('missing'));
console.log(Array.from(reportUrl.searchParams.entries()));
console.log(reportUrl.hash);
console.log(reportUrl.toString());
```

### 预期输出形状

```txt
/reports
1
null
[ [ 'page', '1' ], [ 'sort', 'created desc' ], [ 'tag', 'js' ], [ 'tag', 'api' ] ]
#summary
https://example.com/reports?page=1&sort=created+desc&tag=js&tag=api#summary
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `get()` 返回 number | 返回 string 或 `null`。 |
| `Map.get()` 和 `URLSearchParams.get()` 返回缺失值一样 | Map 缺失是 `undefined`；URLSearchParams 缺失是 `null`。 |
| `set()` 和 `append()` 一样 | `set()` 替换；`append()` 追加。 |
| `hash` 是加密 hash | URL 里是 fragment。 |
| `searchParams.toString()` 包含 `?` | 不包含 `?`。 |

---

## 34. console API 细节补全

### 结论

`console` 是观察工具。不同方法有不同展示语义：有些打印内容，有些启动或结束一个控制台状态。

### API / 方法规范

```txt
console.log(...values)
console.info(...values)
console.warn(...values)
console.error(...values)
console.table(data)
console.group(label?)
console.groupEnd()
console.time(label?)
console.timeEnd(label?)
console.trace(...values)
```

### 固定方法名 / 行为

| 方法 | 是否直接打印 | 作用 |
|---|---|---|
| `log()` | 是 | 普通输出 |
| `info()` | 是 | 信息输出 |
| `warn()` | 是 | 警告输出 |
| `error()` | 是 | 错误输出 |
| `table()` | 是 | 表格展示对象或数组 |
| `group(label)` | 是 | 打印分组标题，并开始分组 |
| `groupEnd()` | 否 | 结束当前分组 |
| `time(label)` | 否 | 启动计时器 |
| `timeEnd(label)` | 是 | 结束计时器并打印耗时 |
| `trace()` | 是 | 打印调用栈 |

### 为什么 `time()` 和 `groupEnd()` 没打印

```txt
console.time(label)
只是启动计时器，不输出。

console.timeEnd(label)
才输出耗时。

console.groupEnd()
只是结束分组，不输出。

console.group(label)
才输出分组标题。
```

### 示例代码

```js
// Goal:
// Verify which console methods print and which methods change console state.

console.group('Checkout debug');
console.time('checkout-total');

const checkoutRows = [
  { sku: 'BK-01', quantity: 2, price: 20 },
  { sku: 'PN-02', quantity: 3, price: 5 },
];

const checkoutTotal = checkoutRows.reduce((runningTotal, checkoutRow) => {
  return runningTotal + checkoutRow.quantity * checkoutRow.price;
}, 0);

console.table(checkoutRows);
console.timeEnd('checkout-total');
console.log(checkoutTotal);
console.groupEnd();
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `time()` 会打印开始时间 | 不打印，只启动计时器。 |
| `groupEnd()` 会打印结束标记 | 不打印，只关闭分组。 |
| `table()` 改变数据 | 只展示，不修改数据。 |
| 不同 console 环境显示完全一致 | 浏览器和 Node 终端展示可能不同。 |

---

## 35. Timer API 细节补全

### 结论

定时器 API 的重点不是“等待”，而是“注册未来任务”。`setTimeout()` 执行一次，`setInterval()` 自动重复，递归 `setTimeout()` 每次执行后自己决定是否继续。

### API / 参数签名

```txt
setTimeout(handler, timeout?, ...arguments)
clearTimeout(timeoutId)
setInterval(handler, timeout?, ...arguments)
clearInterval(intervalId)
```

### 参数名说明

| 名称 | 类型 | 说明 |
|---|---|---|
| `handler` | function | 到时间后要执行的 callback function |
| `timeout` | number | 最小等待时间，单位是 milliseconds |
| `timeoutId` | timer id | `setTimeout()` 返回的取消凭证 |
| `intervalId` | timer id | `setInterval()` 返回的取消凭证 |

### `handler` 可以是函数名，不一定要写成箭头函数

```js
// Goal:
// Pass a named function as a timer handler.

function sendStatusPing() {
  console.log('ping');
}

setTimeout(sendStatusPing, 1000);
```

这里的 `handler` 是：

```txt
sendStatusPing
```

不要写成：

```js
setTimeout(sendStatusPing(), 1000);
```

因为 `sendStatusPing()` 会立刻执行函数，并把返回值传给 `setTimeout()`。

### 什么时候需要箭头函数包一层

当你要传参数或执行多行逻辑时，用箭头函数：

```js
// Goal:
// Wrap a timer handler when arguments are needed.

function sendStatusPingWithTarget(targetText) {
  console.log('ping', targetText);
}

setTimeout(() => {
  sendStatusPingWithTarget('/api/health');
}, 1000);
```

### `setInterval()` 和递归 `setTimeout()` 对比

| 方式 | 调度模型 | 适合场景 |
|---|---|---|
| `setInterval(callback, delay)` | 一次注册，自动重复 | 简单固定节奏任务 |
| recursive `setTimeout()` | 每次执行后再安排下一次 | 轮询、重试、需要根据结果决定是否继续 |

### 示例代码

```js
// Goal:
// Compare setInterval with recursive setTimeout.

let intervalTickCount = 0;

const intervalId = setInterval(() => {
  intervalTickCount += 1;
  console.log('interval', intervalTickCount);

  if (intervalTickCount === 2) {
    clearInterval(intervalId);
  }
}, 1000);

let timeoutTickCount = 0;

function scheduleNextTimeoutTick() {
  timeoutTickCount += 1;
  console.log('timeout', timeoutTickCount);

  if (timeoutTickCount < 2) {
    setTimeout(scheduleNextTimeoutTick, 1000);
  }
}

setTimeout(scheduleNextTimeoutTick, 1000);
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `setTimeout(fn, 0)` 立刻执行 | 当前同步代码结束后才有机会执行。 |
| `setTimeout` 会暂停代码 | 不会阻塞同步代码。 |
| `setInterval` 会自动停止 | 不会，必须 `clearInterval()` 或进程结束。 |
| `setTimeout(functionName(), 1000)` | 这是立刻调用。应传 `functionName` 或箭头函数。 |
| `handler` / `timeout` 是对象属性 | 它们是 API 签名里的参数名。 |

---

## 36. 小项目补充 API：Object.fromEntries()、Number.isFinite()、Number()

### 结论

综合项目里还用到了 `Object.fromEntries()`、`Number()` 和 `Number.isFinite()`。它们虽然不属于某一个大分类的主角，但在数据处理链路里很关键。

### API / 语法规范

```txt
Object.fromEntries(iterable)
Number(value)
Number.isFinite(value)
```

### 固定方法名 / 返回值

| API | 所属对象 | 参数 | 返回值 | 作用 |
|---|---|---|---|---|
| `Object.fromEntries(iterable)` | Object | entries iterable | object | 把 `[key, value]` 条目转成普通对象 |
| `Number(value)` | Number function | 任意值 | number | 转成数字 |
| `Number.isFinite(value)` | Number | 任意值 | boolean | 判断值是否是 finite number |

### 示例代码

```js
// Goal:
// Convert Map entries to a plain object and validate numeric conversion.

const paymentEntryMap = new Map();
paymentEntryMap.set('event', 'checkout');
paymentEntryMap.set('amount', Number('1299.5'));

const paymentRecord = Object.fromEntries(paymentEntryMap);

console.log(paymentRecord);
console.log(Number.isFinite(paymentRecord.amount));
console.log(Number.isFinite('1299.5'));
console.log(Number(null));
```

### 预期输出

```txt
{ event: 'checkout', amount: 1299.5 }
true
false
0
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 直接 `JSON.stringify(map)` | 普通 Map 会变成 `{}`，先用 `Object.fromEntries(map)`。 |
| `Number.isFinite('1299.5')` 返回 true | 返回 false，因为参数不是 number。 |
| `Number(null)` 是 NaN | 结果是 `0`，所以缺失参数要先单独检查 `null`。 |
| `Object.fromEntries()` 只能接 Map | 任何 entries iterable 都可以。 |

---

## 37. 标准库同名方法最终对照表

### 结论

JavaScript 里同名方法很多。不要按名字死记，要按“所属对象 + 参数 + 返回值 + 语义”判断。

| 名字 | 所属对象 | 作用 | 找不到 / 失败时 |
|---|---|---|---|
| `Map.get(key)` | Map | 读 Map value | `undefined` |
| `URLSearchParams.get(name)` | URLSearchParams | 读 query parameter | `null` |
| `Map.set(key, value)` | Map | 写 Map entry | 返回 Map |
| `URLSearchParams.set(name, value)` | URLSearchParams | 设置 query parameter | 返回 `undefined` |
| `TypedArray.set(source, offset?)` | TypedArray | 批量复制元素 | 返回 `undefined` |
| `Set.has(value)` | Set | 判断集合值存在 | boolean |
| `Map.has(key)` | Map | 判断 key 存在 | boolean |
| `URLSearchParams.has(name)` | URLSearchParams | 判断 query 参数存在 | boolean |
| `RegExp.test(text)` | RegExp | 判断文本是否匹配 | boolean |
| `Array.prototype.sort(compareFn)` | Array | 排序数组 | 返回原数组 |
| `Intl.Collator.compare(a, b)` | Intl.Collator | 比较两个字符串 | number |
| `Intl.NumberFormat.format(number)` | Intl.NumberFormat | 格式化数字 | string |
| `console.time(label)` | console | 启动计时器 | 不打印 |
| `console.timeEnd(label)` | console | 结束并打印耗时 | 打印 |

### 最终记忆模型

```txt
Same method name does not mean same API.
The object before the dot decides the meaning.
```

中文记忆：同名方法不能脱离点号左边理解。`set()`、`get()`、`has()`、`delete()` 到底是什么意思，必须先看它属于哪个对象。

