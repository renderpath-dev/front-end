# JavaScript 标准库学习指导文件 v1

> 定位：这是第 11 章“JavaScript 标准库”的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建练习目录、写代码、运行代码、观察输出，再把每节整理成最终学习笔记。  
> 参考范围：《JavaScript 权威指南》第 11 章，以及 MDN 对应 API 参考页。  
> 语言规则：正文统一中文；必要技术术语保留英文括号。  
> 代码规则：代码命名和代码注释统一英文；代码和代码注释不使用中文字符。  
> 学习原则：先理解每个内置对象的“数据模型”，再记方法名。不要把标准库学成 API 词典。

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
