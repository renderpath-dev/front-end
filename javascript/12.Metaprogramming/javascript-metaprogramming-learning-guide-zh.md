# JavaScript 元编程学习指导文件

> 定位：这是第 14 章“元编程（Metaprogramming）”的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建练习目录、写代码、运行代码、观察输出，再把每节整理成最终学习笔记。  
> 参考范围：JavaScript: The Definitive Guide 第 14 章，加上 MDN 参考文档。  
> 语言规则：正文统一中文；重要技术术语必须写中文和 English term。  
> 代码规则：代码命名和代码注释统一英文；代码和代码注释不使用中文字符。  
> 学习原则：任何没学过的关键字、对象、语法形式，第一次出现时必须解释它是什么、属于语法还是运行时对象、为什么要用、常见误区是什么。

---

## 目录

1. [本文件怎么用](#1-本文件怎么用)
2. [第 14 章元编程的完整学习顺序](#2-第-14-章元编程的完整学习顺序)
3. [本章先要建立的底层模型](#3-本章先要建立的底层模型)
4. [00：什么是元编程](#4-00什么是元编程)
5. [01：属性描述符](#5-01属性描述符)
6. [02：数据属性和访问器属性](#6-02数据属性和访问器属性)
7. [03：可枚举、可写、可配置](#7-03可枚举可写可配置)
8. [04：对象可扩展能力](#8-04对象可扩展能力)
9. [05：prototype 特性](#9-05prototype-特性)
10. [06：符号和全局符号注册表](#10-06符号和全局符号注册表)
11. [07：公认符号](#11-07公认符号)
12. [08：模板标签](#12-08模板标签)
13. [09：Reflect 反射 API](#13-09reflect-反射-api)
14. [10：Proxy 基础](#14-10proxy-基础)
15. [11：Proxy 和 Reflect 配合](#15-11proxy-和-reflect-配合)
16. [12：Proxy 不变量](#16-12proxy-不变量)
17. [13：可撤销代理](#17-13可撤销代理)
18. [14：小项目整合](#18-14小项目整合)
19. [最终文件清单](#19-最终文件清单)
20. [最终学习笔记转换要求](#20-最终学习笔记转换要求)
21. [MDN 阅读清单](#21-mdn-阅读清单)
22. [本章最终要能回答的问题](#22-本章最终要能回答的问题)

---

## 1. 本文件怎么用

### 结论

这不是一份“看完就算学过”的文档。它是一个写代码的训练指导。元编程（metaprogramming）不能只背 API 名字，因为这一章真正训练的是：你能不能理解 JavaScript 对象系统（object system）的底层操作。

### 每节固定学习步骤

每一节都按这个顺序做：

```txt
1. Read the conclusion.
2. Read the new terms.
3. Create the file structure.
4. Write the code example.
5. Run the entry file.
6. Compare the expected output.
7. Explain every runtime step.
8. Write one intentional mistake.
9. Convert the section into final notes.
```

### 代码注释模板

每个 JS 文件顶部都写英文注释：

```js
// Goal:
// Verify how this metaprogramming example works.

// Expected output:
// Replace this block with the output from the entry file.
```

---

## 2. 第 14 章元编程的完整学习顺序

### 结论

本章按这个顺序学：

```txt
property descriptor
  -> data property and accessor property
  -> writable, enumerable, configurable
  -> object extensibility
  -> prototype attribute
  -> symbols
  -> well-known symbols
  -> tagged templates
  -> Reflect
  -> Proxy
  -> Proxy invariants
  -> revocable proxy
  -> mini integration project
```

### 技术意义

第 14 章不是普通业务 API 章节，而是进入 JavaScript 语言对象模型的“控制层”。前面你学的是怎么使用对象；这一章学的是怎么检查、修改、拦截、模拟对象的底层行为。

### 本章不是简单语法

元编程的难点不是会不会写：

```js
Object.defineProperty(targetObject, 'name', {
  value: 'Ada',
});
```

真正难点是你要知道：

```txt
A property is not only a key-value pair.
A property also has attributes.
A prototype is not just a normal property.
A symbol can customize language-level behavior.
A proxy can intercept object internal operations.
Reflect can forward internal operations safely.
```

---

## 3. 本章先要建立的底层模型

### 结论

元编程（metaprogramming）就是“写代码去观察、修改或拦截代码运行机制本身”。

### 关键术语先解释

| 中文术语 | English term | 解释 |
|---|---|---|
| 元编程 | metaprogramming | 编写操作语言机制本身的代码。 |
| 属性描述符 | property descriptor | 描述对象某个自有属性配置的对象。 |
| 数据属性 | data property | 拥有 `value` 和 `writable` 的属性。 |
| 访问器属性 | accessor property | 拥有 `get` 和/或 `set` 的属性。 |
| 可写 | writable | 控制数据属性的值能否被重新赋值。 |
| 可枚举 | enumerable | 控制属性是否出现在 `Object.keys()`、`for...in` 等枚举中。 |
| 可配置 | configurable | 控制属性能否删除、能否重新定义关键特性。 |
| 可扩展对象 | extensible object | 可以添加新自有属性的对象。 |
| 原型 | prototype | 对象用于继承属性的另一个对象。 |
| 符号 | symbol | 唯一的原始值，可用作属性键。 |
| 公认符号 | well-known symbol | 语言预定义的 symbol，用来定制内置行为。 |
| 模板标签 | tagged template | 用函数处理模板字面量的语法。 |
| 反射 | reflection | 通过 API 调用语言内部操作。 |
| 代理 | proxy | 包装目标对象并拦截底层操作的对象。 |
| 捕获器 | trap | Proxy handler 中拦截某种操作的方法。 |
| 目标对象 | target object | 被 Proxy 包装的原始对象。 |
| 处理器对象 | handler object | 定义 trap 的对象。 |
| 不变量 | invariant | 即使经过 Proxy 也不能违反的语言规则。 |

### 底层机制总图

```txt
normal object operation
  -> internal method
  -> ordinary object behavior

proxy object operation
  -> proxy trap
  -> custom behavior
  -> Reflect forwarding
  -> target object behavior
```

普通对象操作直接走默认内部方法；代理对象操作会先进入 trap，trap 可以自定义行为，也可以用 `Reflect` 转发给默认行为。

---

## 4. 00：什么是元编程

### 结论

元编程（metaprogramming）不是普通业务逻辑，而是让代码检查、修改、拦截语言层面的行为。

### 新关键字和新概念

#### 元编程（metaprogramming）

元编程是“操作程序本身的程序”。在 JavaScript 里，它通常体现为：

```txt
inspect property descriptors
control property attributes
control object extensibility
customize prototype behavior
use symbols to customize built-in protocols
use tagged templates to process syntax-like text
use Reflect to invoke internal operations
use Proxy to intercept internal operations
```

### 文件结构

```txt
00-metaprogramming-overview/
  languageLevelOperationDemo.js
```

### `languageLevelOperationDemo.js`

```js
// Goal:
// Compare normal property access with descriptor inspection.

const profileRecord = {
  username: 'ada',
};

console.log(profileRecord.username);
console.log(Object.getOwnPropertyDescriptor(profileRecord, 'username'));
```

### 运行方式

```bash
node languageLevelOperationDemo.js
```

### 预期输出

```txt
ada
{ value: 'ada', writable: true, enumerable: true, configurable: true }
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 对象字面量创建 `profileRecord`。 |
| 2 | `username` 被创建为普通数据属性。 |
| 3 | 点语法读取属性值。 |
| 4 | `Object.getOwnPropertyDescriptor()` 读取属性的底层描述符。 |

### 常见错误

不要以为对象属性只有 key 和 value。普通对象属性还有 `writable`、`enumerable`、`configurable` 这些属性特性（property attributes）。

### 和项目开发的关系

真实项目中你不常直接写元编程代码，但框架、ORM、响应式系统、校验库、状态管理库、测试 mock 工具都会用这些机制。

---

## 5. 01：属性描述符

### 结论

属性描述符（property descriptor）是描述一个自有属性（own property）底层配置的对象。

### 新关键字和新概念

#### `Object.getOwnPropertyDescriptor()`

`Object.getOwnPropertyDescriptor()` 是静态方法（static method），用来读取对象某个自有属性的描述符。

#### 自有属性（own property）

自有属性是对象自己拥有的属性，不是从原型链（prototype chain）继承来的属性。

### 文件结构

```txt
01-property-descriptors/
  descriptorReader.js
  inheritedDescriptorMistake.js
```

### `descriptorReader.js`

```js
// Goal:
// Read the descriptor of an own property.

const accountRecord = {
  email: 'user@example.com',
};

const emailDescriptor = Object.getOwnPropertyDescriptor(accountRecord, 'email');

console.log(emailDescriptor.value);
console.log(emailDescriptor.writable);
console.log(emailDescriptor.enumerable);
console.log(emailDescriptor.configurable);
```

### 运行方式

```bash
node descriptorReader.js
```

### 预期输出

```txt
user@example.com
true
true
true
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 对象字面量创建 `email` 属性。 |
| 2 | 普通对象字面量属性默认 `writable: true`。 |
| 3 | 普通对象字面量属性默认 `enumerable: true`。 |
| 4 | 普通对象字面量属性默认 `configurable: true`。 |
| 5 | `Object.getOwnPropertyDescriptor()` 返回描述符对象。 |

### `inheritedDescriptorMistake.js`

```js
// Goal:
// Verify that getOwnPropertyDescriptor does not inspect the prototype chain.

const baseProfileRecord = {
  role: 'admin',
};

const childProfileRecord = Object.create(baseProfileRecord);
childProfileRecord.username = 'ada';

console.log(Object.getOwnPropertyDescriptor(childProfileRecord, 'username'));
console.log(Object.getOwnPropertyDescriptor(childProfileRecord, 'role'));
console.log(childProfileRecord.role);
```

### 预期输出

```txt
{ value: 'ada', writable: true, enumerable: true, configurable: true }
undefined
admin
```

### 常见错误

`Object.getOwnPropertyDescriptor()` 只检查自有属性，不检查继承属性。属性读取表达式会查原型链，但 descriptor API 不会自动沿原型链查找。

### 和项目开发的关系

当你调试某个属性为什么不能赋值、为什么不能删除、为什么不出现在 `Object.keys()` 里时，第一步就是看 descriptor。

---

## 6. 02：数据属性和访问器属性

### 结论

JavaScript 属性分两大类：数据属性（data property）和访问器属性（accessor property）。两者的描述符字段不同，不能混用。

### 新关键字和新概念

#### 数据属性（data property）

数据属性有：

```txt
value
writable
enumerable
configurable
```

#### 访问器属性（accessor property）

访问器属性有：

```txt
get
set
enumerable
configurable
```

#### `Object.defineProperty()`

`Object.defineProperty()` 是静态方法，用来精确定义新属性或修改已有属性。

### 文件结构

```txt
02-data-and-accessor-properties/
  dataPropertyDemo.js
  accessorPropertyDemo.js
  descriptorShapeMistake.js
```

### `dataPropertyDemo.js`

```js
// Goal:
// Define a data property with Object.defineProperty.

const productRecord = {};

Object.defineProperty(productRecord, 'sku', {
  value: 'KB-001',
  writable: false,
  enumerable: true,
  configurable: true,
});

productRecord.sku = 'KB-999';

console.log(productRecord.sku);
console.log(Object.keys(productRecord));
```

### 运行方式

```bash
node dataPropertyDemo.js
```

### 预期输出

```txt
KB-001
[ 'sku' ]
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 创建空对象。 |
| 2 | `Object.defineProperty()` 添加 `sku` 数据属性。 |
| 3 | `writable: false` 使赋值不能改变属性值。 |
| 4 | 非严格模式下赋值失败但不抛错。 |
| 5 | `enumerable: true` 使 `sku` 出现在 `Object.keys()` 里。 |

### `accessorPropertyDemo.js`

```js
// Goal:
// Define an accessor property with get and set.

const cartState = {
  itemCount: 0,
};

Object.defineProperty(cartState, 'summary', {
  get() {
    return `items:${this.itemCount}`;
  },
  set(nextSummaryText) {
    const countText = nextSummaryText.split(':')[1];
    this.itemCount = Number(countText);
  },
  enumerable: true,
  configurable: true,
});

console.log(cartState.summary);
cartState.summary = 'items:5';
console.log(cartState.itemCount);
console.log(cartState.summary);
```

### 预期输出

```txt
items:0
5
items:5
```

### `descriptorShapeMistake.js`

```js
// Goal:
// Show that data descriptor fields and accessor descriptor fields cannot be mixed.

const settingsRecord = {};

Object.defineProperty(settingsRecord, 'theme', {
  value: 'dark',
  get() {
    return 'light';
  },
});
```

### 预期结果

```txt
TypeError
```

### 常见错误

不要在同一个 descriptor 里同时写 `value` 和 `get`。数据属性和访问器属性是两种不同形状的 descriptor。

### 和项目开发的关系

Vue 2 的响应式系统就依赖访问器属性思路；很多库会用 getter/setter 追踪读取和写入。

---

## 7. 03：可枚举、可写、可配置

### 结论

`writable` 控制能不能改值，`enumerable` 控制能不能被枚举，`configurable` 控制能不能删除和重定义关键特性。

### 新关键字和新概念

#### 可写（writable）

只适用于数据属性。`writable: false` 使属性值不能通过赋值改掉。

#### 可枚举（enumerable）

控制属性是否出现在 `Object.keys()` 和 `for...in` 等枚举操作中。

#### 可配置（configurable）

控制属性能否被 `delete` 删除，能否重新定义描述符的关键配置。

### 文件结构

```txt
03-property-attributes/
  enumerableHiddenProperty.js
  configurableLockDemo.js
  strictWritableMistake.js
```

### `enumerableHiddenProperty.js`

```js
// Goal:
// Verify that non-enumerable properties are hidden from Object.keys.

const reportRecord = {
  title: 'Revenue',
};

Object.defineProperty(reportRecord, 'internalCode', {
  value: 'R-2026',
  enumerable: false,
  writable: true,
  configurable: true,
});

console.log(reportRecord.internalCode);
console.log(Object.keys(reportRecord));
console.log('internalCode' in reportRecord);
```

### 预期输出

```txt
R-2026
[ 'title' ]
true
```

### `configurableLockDemo.js`

```js
// Goal:
// Verify that a non-configurable property cannot be deleted.

'use strict';

const auditRecord = {};

Object.defineProperty(auditRecord, 'createdAt', {
  value: '2026-05-13',
  writable: true,
  enumerable: true,
  configurable: false,
});

console.log(delete auditRecord.createdAt);
```

### 预期结果

```txt
TypeError
```

### `strictWritableMistake.js`

```js
// Goal:
// Verify that writing to a non-writable property throws in strict mode.

'use strict';

const lockedConfig = {};

Object.defineProperty(lockedConfig, 'mode', {
  value: 'production',
  writable: false,
  enumerable: true,
  configurable: true,
});

lockedConfig.mode = 'development';
```

### 预期结果

```txt
TypeError
```

### 执行过程

| 操作 | 受哪个 attribute 控制 |
|---|---|
| 重新赋值 | `writable` |
| `Object.keys()` 是否出现 | `enumerable` |
| `delete` 是否成功 | `configurable` |
| 能否改成 accessor property | `configurable` |

### 常见错误

不要把 `enumerable: false` 理解成“属性不存在”。它只是不能被常规枚举列出来，仍然能通过点语法或方括号访问。

### 和项目开发的关系

库作者经常把内部标记属性设成 non-enumerable，避免它污染 `Object.keys()`、JSON 序列化前处理、调试输出。

---

## 8. 04：对象可扩展能力

### 结论

对象可扩展能力（object extensibility）控制对象能不能添加新自有属性。`preventExtensions()`、`seal()`、`freeze()` 是三个不同级别。

### 新关键字和新概念

| API | English term | 效果 |
|---|---|---|
| `Object.preventExtensions()` | prevent extensions | 禁止添加新属性。 |
| `Object.seal()` | seal object | 禁止添加属性，禁止删除属性，现有属性变成 non-configurable。 |
| `Object.freeze()` | freeze object | 禁止添加属性，禁止删除属性，数据属性变成 non-writable 和 non-configurable。 |
| `Object.isExtensible()` | extensibility check | 检查对象是否可扩展。 |
| `Object.isSealed()` | sealed check | 检查对象是否 sealed。 |
| `Object.isFrozen()` | frozen check | 检查对象是否 frozen。 |

### 文件结构

```txt
04-object-extensibility/
  preventExtensionsDemo.js
  sealDemo.js
  freezeDemo.js
  shallowFreezeMistake.js
```

### `preventExtensionsDemo.js`

```js
// Goal:
// Verify that preventExtensions blocks new properties.

'use strict';

const runtimeConfig = {
  theme: 'dark',
};

Object.preventExtensions(runtimeConfig);

console.log(Object.isExtensible(runtimeConfig));
runtimeConfig.pageSize = 20;
```

### 预期输出和结果

```txt
false
TypeError
```

### `sealDemo.js`

```js
// Goal:
// Verify that seal blocks deletion but allows writable value updates.

'use strict';

const featureConfig = {
  enabled: true,
};

Object.seal(featureConfig);
featureConfig.enabled = false;

console.log(featureConfig.enabled);
console.log(Object.isSealed(featureConfig));

delete featureConfig.enabled;
```

### 预期输出和结果

```txt
false
true
TypeError
```

### `freezeDemo.js`

```js
// Goal:
// Verify that freeze blocks value updates for data properties.

'use strict';

const paymentConfig = {
  currency: 'USD',
};

Object.freeze(paymentConfig);

console.log(Object.isFrozen(paymentConfig));
paymentConfig.currency = 'EUR';
```

### 预期输出和结果

```txt
true
TypeError
```

### `shallowFreezeMistake.js`

```js
// Goal:
// Verify that Object.freeze is shallow.

const dashboardConfig = {
  layout: {
    columns: 3,
  },
};

Object.freeze(dashboardConfig);
dashboardConfig.layout.columns = 4;

console.log(dashboardConfig.layout.columns);
```

### 预期输出

```txt
4
```

### 常见错误

`Object.freeze()` 是浅冻结（shallow freeze）。它冻结对象本身的属性，不会自动递归冻结嵌套对象。

### 和项目开发的关系

冻结配置对象可以防止运行时被误改，但不要把它误认为深度不可变数据结构。

---

## 9. 05：prototype 特性

### 结论

每个普通对象都有内部 `[[Prototype]]`，它决定属性查找失败后要去哪里继续找。

### 新关键字和新概念

#### 原型特性（prototype attribute）

这里说的 prototype 特性不是函数的 `.prototype` 属性，而是对象内部的 `[[Prototype]]` 链接。

#### `Object.getPrototypeOf()`

读取对象的内部原型。

#### `Object.setPrototypeOf()`

修改对象的内部原型。学习机制时可以用，真实项目中要少用，因为它可能影响性能和可维护性。

### 文件结构

```txt
05-prototype-attribute/
  prototypeLookupDemo.js
  prototypeMutationDemo.js
  noPrototypeDictionary.js
```

### `prototypeLookupDemo.js`

```js
// Goal:
// Verify how prototype lookup works.

const sharedMethods = {
  createLabel() {
    return `profile:${this.username}`;
  },
};

const profileRecord = Object.create(sharedMethods);
profileRecord.username = 'ada';

console.log(profileRecord.createLabel());
console.log(Object.hasOwn(profileRecord, 'createLabel'));
console.log(Object.getPrototypeOf(profileRecord) === sharedMethods);
```

### 预期输出

```txt
profile:ada
false
true
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `Object.create(sharedMethods)` 创建一个对象。 |
| 2 | 新对象的 `[[Prototype]]` 指向 `sharedMethods`。 |
| 3 | 读取 `createLabel` 时对象自己没有这个属性。 |
| 4 | 引擎沿原型链找到 `sharedMethods.createLabel`。 |
| 5 | 方法调用时 `this` 指向 `profileRecord`。 |

### `prototypeMutationDemo.js`

```js
// Goal:
// Verify that setPrototypeOf changes lookup behavior.

const firstBehavior = {
  createStatusText() {
    return 'first';
  },
};

const secondBehavior = {
  createStatusText() {
    return 'second';
  },
};

const taskRecord = Object.create(firstBehavior);

console.log(taskRecord.createStatusText());
Object.setPrototypeOf(taskRecord, secondBehavior);
console.log(taskRecord.createStatusText());
```

### 预期输出

```txt
first
second
```

### `noPrototypeDictionary.js`

```js
// Goal:
// Create an object with no prototype for dictionary-like storage.

const dictionaryRecord = Object.create(null);

dictionaryRecord.toString = 'custom value';

console.log(dictionaryRecord.toString);
console.log(Object.getPrototypeOf(dictionaryRecord));
```

### 预期输出

```txt
custom value
null
```

### 常见错误

不要混淆：

```txt
function.prototype
object [[Prototype]]
```

函数的 `.prototype` 是构造函数给实例使用的对象；普通对象的内部 `[[Prototype]]` 是属性查找链路。

### 和项目开发的关系

class、继承、方法共享、对象字典、安全对象创建都和 prototype 有关。元编程让你直接观察和修改这条链。

---

## 10. 06：符号和全局符号注册表

### 结论

符号（symbol）是唯一的原始值，可以作为对象属性键。`Symbol()` 每次创建新 symbol；`Symbol.for()` 使用全局符号注册表（global symbol registry）。

### 新关键字和新概念

#### 非注册符号（non-registered symbol）

通过 `Symbol()` 创建的 symbol。即使描述相同，也不是同一个值。

#### 注册符号（registered symbol）

通过 `Symbol.for()` 创建或取得的 symbol。相同 key 会返回同一个 symbol。

#### `Symbol.keyFor()`

从全局符号注册表查找某个 registered symbol 的 key。

### 文件结构

```txt
06-symbol-registry/
  localSymbolDemo.js
  globalSymbolRegistryDemo.js
  symbolPropertyKeyDemo.js
```

### `localSymbolDemo.js`

```js
// Goal:
// Verify that Symbol creates a unique symbol every time.

const firstMetadataKey = Symbol('metadata');
const secondMetadataKey = Symbol('metadata');

console.log(firstMetadataKey === secondMetadataKey);
console.log(firstMetadataKey.description);
```

### 预期输出

```txt
false
metadata
```

### `globalSymbolRegistryDemo.js`

```js
// Goal:
// Verify how Symbol.for and Symbol.keyFor use the global symbol registry.

const firstSharedKey = Symbol.for('app.metadata');
const secondSharedKey = Symbol.for('app.metadata');
const localKey = Symbol('app.metadata');

console.log(firstSharedKey === secondSharedKey);
console.log(Symbol.keyFor(firstSharedKey));
console.log(Symbol.keyFor(localKey));
```

### 预期输出

```txt
true
app.metadata
undefined
```

### `symbolPropertyKeyDemo.js`

```js
// Goal:
// Store metadata with a symbol property key.

const internalStateKey = Symbol('internalState');

const widgetRecord = {
  id: 'search-box',
  [internalStateKey]: {
    focused: false,
  },
};

console.log(widgetRecord.id);
console.log(widgetRecord[internalStateKey].focused);
console.log(Object.keys(widgetRecord));
console.log(Object.getOwnPropertySymbols(widgetRecord).length);
```

### 预期输出

```txt
search-box
false
[ 'id' ]
1
```

### 常见错误

不要以为 symbol 描述（description）决定相等性。`Symbol('x') !== Symbol('x')`。

### 和项目开发的关系

symbol 适合定义不容易和字符串属性冲突的内部键。它不是绝对私有，但能降低命名冲突。

---

## 11. 07：公认符号

### 结论

公认符号（well-known symbol）是语言内置的 symbol，用来让对象接入或定制某些语言级协议。

### 新关键字和新概念

| 公认符号 | English term | 作用 |
|---|---|---|
| `Symbol.iterator` | iterable protocol hook | 让对象可以被 `for...of`、展开语法等消费。 |
| `Symbol.toStringTag` | string tag hook | 定制 `Object.prototype.toString.call(value)` 的标签。 |
| `Symbol.hasInstance` | instanceof hook | 定制 `instanceof` 判断。 |
| `Symbol.toPrimitive` | primitive conversion hook | 定制对象转原始值。 |

### 文件结构

```txt
07-well-known-symbols/
  iteratorSymbolDemo.js
  toStringTagDemo.js
  hasInstanceDemo.js
  toPrimitiveDemo.js
```

### `iteratorSymbolDemo.js`

```js
// Goal:
// Make a custom object iterable with Symbol.iterator.

const playlistRecord = {
  tracks: ['intro', 'main', 'outro'],
  *[Symbol.iterator]() {
    for (const trackName of this.tracks) {
      yield trackName;
    }
  },
};

for (const trackName of playlistRecord) {
  console.log(trackName);
}
```

### 预期输出

```txt
intro
main
outro
```

### `toStringTagDemo.js`

```js
// Goal:
// Customize Object.prototype.toString output.

class ValidationReport {
  get [Symbol.toStringTag]() {
    return 'ValidationReport';
  }
}

const reportInstance = new ValidationReport();

console.log(Object.prototype.toString.call(reportInstance));
```

### 预期输出

```txt
[object ValidationReport]
```

### `hasInstanceDemo.js`

```js
// Goal:
// Customize instanceof with Symbol.hasInstance.

class PositiveNumberRecord {
  static [Symbol.hasInstance](candidateValue) {
    return typeof candidateValue === 'number' && candidateValue > 0;
  }
}

console.log(10 instanceof PositiveNumberRecord);
console.log(-5 instanceof PositiveNumberRecord);
console.log('10' instanceof PositiveNumberRecord);
```

### 预期输出

```txt
true
false
false
```

### `toPrimitiveDemo.js`

```js
// Goal:
// Customize object-to-primitive conversion.

const invoiceRecord = {
  id: 'INV-001',
  amount: 120,
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return this.amount;
    }

    return this.id;
  },
};

console.log(Number(invoiceRecord));
console.log(String(invoiceRecord));
console.log(`${invoiceRecord}`);
```

### 预期输出

```txt
120
INV-001
INV-001
```

### 常见错误

不要把公认符号当普通私有字段。它们的意义由语言内置操作读取。例如 `for...of` 会找 `[Symbol.iterator]()`；`instanceof` 会找 `[Symbol.hasInstance]()`。

### 和项目开发的关系

框架和库可以通过公认符号让对象接入内置语法，比如可迭代对象、自定义类型标签、自定义实例判断。

---

## 12. 08：模板标签

### 结论

模板标签（tagged template）让你用函数接管模板字面量的处理过程。它不一定返回字符串。

### 新关键字和新概念

#### 模板字面量（template literal）

用反引号创建的字符串语法，支持 `${expression}` 插值。

#### 模板标签（tagged template）

写在模板字面量前面的函数。这个函数会收到字符串片段数组和表达式值。

### 文件结构

```txt
08-tagged-templates/
  tagArgumentDemo.js
  htmlEscapeTagDemo.js
  queryBuilderTagDemo.js
```

### `tagArgumentDemo.js`

```js
// Goal:
// Inspect arguments passed into a tagged template function.

function inspectTemplateParts(stringParts, ...expressionValues) {
  console.log(stringParts);
  console.log(expressionValues);
  return 'done';
}

const customerName = 'Ada';
const itemCount = 3;

const resultText = inspectTemplateParts`Customer ${customerName} has ${itemCount} items.`;

console.log(resultText);
```

### 预期输出

```txt
[ 'Customer ', ' has ', ' items.' ]
[ 'Ada', 3 ]
done
```

### `htmlEscapeTagDemo.js`

```js
// Goal:
// Escape inserted values with a tagged template.

function escapeHtmlValue(rawValue) {
  return String(rawValue)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function htmlSafe(stringParts, ...expressionValues) {
  let outputText = stringParts[0];

  for (let index = 0; index < expressionValues.length; index += 1) {
    outputText += escapeHtmlValue(expressionValues[index]);
    outputText += stringParts[index + 1];
  }

  return outputText;
}

const unsafeName = '<script>alert(1)</script>';
const safeMarkup = htmlSafe`<p>${unsafeName}</p>`;

console.log(safeMarkup);
```

### 预期输出

```txt
<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>
```

### `queryBuilderTagDemo.js`

```js
// Goal:
// Return a structured value from a tagged template.

function sqlParts(stringParts, ...expressionValues) {
  return {
    text: stringParts.join('?'),
    values: expressionValues,
  };
}

const userId = 42;
const statusValue = 'active';

const queryRecord = sqlParts`select * from users where id = ${userId} and status = ${statusValue}`;

console.log(queryRecord.text);
console.log(queryRecord.values);
```

### 预期输出

```txt
select * from users where id = ? and status = ?
[ 42, 'active' ]
```

### 常见错误

不要以为 tagged template 的返回值必须是字符串。tag function 可以返回对象、数组、函数或任何值。

### 和项目开发的关系

样式库、SQL 构造器、国际化工具、HTML 转义工具都会使用 tagged template 的思想。

---

## 13. 09：Reflect 反射 API

### 结论

Reflect 是反射 API（reflection API）命名空间对象，提供与对象内部操作对应的静态方法，特别适合在 Proxy trap 里转发默认行为。

### 新关键字和新概念

#### 反射（reflection）

反射是通过 API 调用语言内部操作。例如 `Reflect.get()` 对应属性读取，`Reflect.set()` 对应属性设置。

#### `Reflect` 不是构造函数

`Reflect` 不能 `new Reflect()`，它类似 `Math`，只提供静态方法。

### 文件结构

```txt
09-reflect-api/
  reflectGetSetDemo.js
  reflectDefinePropertyDemo.js
  reflectOwnKeysDemo.js
```

### `reflectGetSetDemo.js`

```js
// Goal:
// Use Reflect.get and Reflect.set for property operations.

const profileRecord = {
  username: 'ada',
};

console.log(Reflect.get(profileRecord, 'username'));
console.log(Reflect.set(profileRecord, 'username', 'grace'));
console.log(profileRecord.username);
```

### 预期输出

```txt
ada
true
grace
```

### `reflectDefinePropertyDemo.js`

```js
// Goal:
// Compare Reflect.defineProperty return value with object mutation.

const settingsRecord = {};

const defineResult = Reflect.defineProperty(settingsRecord, 'theme', {
  value: 'dark',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log(defineResult);
console.log(settingsRecord.theme);
```

### 预期输出

```txt
true
dark
```

### `reflectOwnKeysDemo.js`

```js
// Goal:
// Read string keys and symbol keys with Reflect.ownKeys.

const secretKey = Symbol('secret');

const recordStore = {
  visible: true,
  [secretKey]: 'hidden',
};

console.log(Reflect.ownKeys(recordStore));
```

### 预期输出

```txt
[ 'visible', Symbol(secret) ]
```

### 常见错误

不要把 `Reflect` 当成替代所有对象语法的日常工具。它的主要价值在元编程场景，尤其是 Proxy trap 里保持默认语义。

### 和项目开发的关系

当你写 Proxy 时，`Reflect` 是最安全的转发方式。它避免你手动写 `target[propertyName]` 时丢掉 receiver、返回值、内部语义等细节。

---

## 14. 10：Proxy 基础

### 结论

Proxy 是代理对象（proxy object），可以拦截对目标对象（target object）的底层操作。

### 新关键字和新概念

#### `new Proxy(target, handler)`

创建代理对象。

```txt
target  -> target object
handler -> handler object
trap    -> method inside handler
```

#### trap

trap 是 handler 里的方法，用来拦截某种操作。常见 trap：

```txt
get
set
has
deleteProperty
ownKeys
defineProperty
getPrototypeOf
setPrototypeOf
apply
construct
```

### 文件结构

```txt
10-proxy-basics/
  proxyGetDemo.js
  proxySetValidationDemo.js
  proxyHasDemo.js
  proxyDeleteDemo.js
```

### `proxyGetDemo.js`

```js
// Goal:
// Intercept property reads with a get trap.

const profileRecord = {
  username: 'ada',
};

const profileProxy = new Proxy(profileRecord, {
  get(targetObject, propertyName, receiverObject) {
    if (propertyName in targetObject) {
      return Reflect.get(targetObject, propertyName, receiverObject);
    }

    return 'missing';
  },
});

console.log(profileProxy.username);
console.log(profileProxy.email);
```

### 预期输出

```txt
ada
missing
```

### `proxySetValidationDemo.js`

```js
// Goal:
// Intercept property writes with a set trap.

const productRecord = {
  price: 10,
};

const productProxy = new Proxy(productRecord, {
  set(targetObject, propertyName, nextValue, receiverObject) {
    if (propertyName === 'price' && nextValue < 0) {
      throw new RangeError('Price must be non-negative');
    }

    return Reflect.set(targetObject, propertyName, nextValue, receiverObject);
  },
});

productProxy.price = 20;
console.log(productRecord.price);
productProxy.price = -1;
```

### 预期输出和结果

```txt
20
RangeError
```

### `proxyHasDemo.js`

```js
// Goal:
// Intercept the in operator with a has trap.

const permissionRecord = {
  read: true,
  write: false,
};

const permissionProxy = new Proxy(permissionRecord, {
  has(targetObject, propertyName) {
    if (propertyName === 'admin') {
      return false;
    }

    return Reflect.has(targetObject, propertyName);
  },
});

console.log('read' in permissionProxy);
console.log('admin' in permissionProxy);
```

### 预期输出

```txt
true
false
```

### `proxyDeleteDemo.js`

```js
// Goal:
// Intercept delete operations with deleteProperty.

const sessionRecord = {
  token: 'abc',
  temporaryNote: 'draft',
};

const sessionProxy = new Proxy(sessionRecord, {
  deleteProperty(targetObject, propertyName) {
    if (propertyName === 'token') {
      return false;
    }

    return Reflect.deleteProperty(targetObject, propertyName);
  },
});

console.log(delete sessionProxy.temporaryNote);
console.log(delete sessionProxy.token);
console.log(sessionRecord);
```

### 预期输出

```txt
true
false
{ token: 'abc' }
```

### 常见错误

Proxy 拦截的是对 proxy 的操作，不是对 target 的直接操作。如果你直接访问 `profileRecord.email`，不会触发 `profileProxy` 的 trap。

### 和项目开发的关系

Proxy 可以用于数据校验、日志记录、响应式系统、虚拟对象、权限控制、API mock。

---

## 15. 11：Proxy 和 Reflect 配合

### 结论

Proxy trap 里优先用 Reflect 转发默认行为。这样能保留语言原本的内部语义。

### 新关键字和新概念

#### receiver

`receiver` 是属性访问或设置时的接收者，和 getter/setter、继承、Proxy 组合时很重要。

### 文件结构

```txt
11-proxy-reflect-forwarding/
  getForwardingDemo.js
  setForwardingDemo.js
  receiverGetterDemo.js
```

### `getForwardingDemo.js`

```js
// Goal:
// Add logging while preserving default get behavior.

const settingsRecord = {
  theme: 'dark',
};

const settingsProxy = new Proxy(settingsRecord, {
  get(targetObject, propertyName, receiverObject) {
    console.log(`read:${String(propertyName)}`);
    return Reflect.get(targetObject, propertyName, receiverObject);
  },
});

console.log(settingsProxy.theme);
```

### 预期输出

```txt
read:theme
dark
```

### `setForwardingDemo.js`

```js
// Goal:
// Add logging while preserving default set behavior.

const settingsRecord = {
  theme: 'dark',
};

const settingsProxy = new Proxy(settingsRecord, {
  set(targetObject, propertyName, nextValue, receiverObject) {
    console.log(`write:${String(propertyName)}=${nextValue}`);
    return Reflect.set(targetObject, propertyName, nextValue, receiverObject);
  },
});

settingsProxy.theme = 'light';
console.log(settingsRecord.theme);
```

### 预期输出

```txt
write:theme=light
light
```

### `receiverGetterDemo.js`

```js
// Goal:
// Preserve getter this binding with Reflect.get receiver.

const baseRecord = {
  get label() {
    return `label:${this.name}`;
  },
};

const childRecord = {
  name: 'child',
};

Object.setPrototypeOf(childRecord, baseRecord);

const childProxy = new Proxy(childRecord, {
  get(targetObject, propertyName, receiverObject) {
    return Reflect.get(targetObject, propertyName, receiverObject);
  },
});

console.log(childProxy.label);
```

### 预期输出

```txt
label:child
```

### 常见错误

不要在 trap 里随手写：

```js
return targetObject[propertyName];
```

这种写法在简单对象上看起来没问题，但遇到 getter、继承、receiver 时可能改变语义。

### 和项目开发的关系

现代框架的响应式系统需要在读取和写入时做额外工作，同时保留原对象语义。Proxy + Reflect 是这类设计的核心模型。

---

## 16. 12：Proxy 不变量

### 结论

Proxy 可以拦截操作，但不能违反 JavaScript 的不变量（invariants）。例如：不能把 non-configurable 属性伪装成不存在。

### 新关键字和新概念

#### 不变量（invariant）

不变量是语言必须保持成立的规则。Proxy trap 的返回值如果违反对象真实状态，运行时会抛 TypeError。

### 文件结构

```txt
12-proxy-invariants/
  nonConfigurableOwnKeysMistake.js
  nonWritableGetMistake.js
```

### `nonConfigurableOwnKeysMistake.js`

```js
// Goal:
// Show that ownKeys cannot hide a non-configurable property.

const targetRecord = {};

Object.defineProperty(targetRecord, 'fixedKey', {
  value: 1,
  configurable: false,
  enumerable: true,
});

const targetProxy = new Proxy(targetRecord, {
  ownKeys() {
    return [];
  },
});

console.log(Reflect.ownKeys(targetProxy));
```

### 预期结果

```txt
TypeError
```

### `nonWritableGetMistake.js`

```js
// Goal:
// Show that get cannot lie about a fixed data property.

const targetRecord = {};

Object.defineProperty(targetRecord, 'fixedValue', {
  value: 100,
  writable: false,
  configurable: false,
});

const targetProxy = new Proxy(targetRecord, {
  get() {
    return 200;
  },
});

console.log(targetProxy.fixedValue);
```

### 预期结果

```txt
TypeError
```

### 常见错误

不要把 Proxy 理解成“可以随便骗过语言规则”。Proxy 能自定义行为，但必须尊重 target 的不可配置属性、不可扩展状态、不可写固定值等底层约束。

### 和项目开发的关系

写库时如果 Proxy trap 违反不变量，会出现很难调试的 TypeError。学习不变量能防止你写出表面聪明、运行时脆弱的抽象。

---

## 17. 13：可撤销代理

### 结论

可撤销代理（revocable proxy）可以在某个时间点被禁用。撤销后，任何使用 proxy 的操作都会抛 TypeError。

### 新关键字和新概念

#### `Proxy.revocable()`

返回一个对象：

```txt
proxy
revoke
```

`proxy` 是代理对象；`revoke` 是撤销函数。

### 文件结构

```txt
13-revocable-proxy/
  revocableProxyDemo.js
```

### `revocableProxyDemo.js`

```js
// Goal:
// Create a proxy that can be revoked.

const tokenRecord = {
  value: 'secret-token',
};

const revocableRecord = Proxy.revocable(tokenRecord, {
  get(targetObject, propertyName, receiverObject) {
    return Reflect.get(targetObject, propertyName, receiverObject);
  },
});

console.log(revocableRecord.proxy.value);
revocableRecord.revoke();
console.log(revocableRecord.proxy.value);
```

### 预期输出和结果

```txt
secret-token
TypeError
```

### 常见错误

撤销的是 proxy，不是 target。撤销后，`tokenRecord.value` 仍然可以直接读取；只是 `revocableRecord.proxy.value` 不能再使用。

### 和项目开发的关系

可撤销代理适合临时权限、生命周期受控的对象访问、测试隔离等场景。

---

## 18. 14：小项目整合

### 结论

最后用一个小项目把 descriptor、symbol、Reflect、Proxy、tagged template 串起来：做一个可校验配置对象。

### 文件结构

```txt
14-mini-practice-project/
  package.json
  metadataKeys.js
  configTemplate.js
  configValidator.js
  app.js
```

### `package.json`

```json
{
  "type": "module"
}
```

### `metadataKeys.js`

```js
// Goal:
// Export symbol keys for internal metadata.

export const validationStateKey = Symbol('validationState');
```

### `configTemplate.js`

```js
// Goal:
// Build a normalized config label with a tagged template.

export function configLabel(stringParts, ...expressionValues) {
  let outputText = stringParts[0];

  for (let index = 0; index < expressionValues.length; index += 1) {
    outputText += String(expressionValues[index]).trim().toLowerCase();
    outputText += stringParts[index + 1];
  }

  return outputText;
}
```

### `configValidator.js`

```js
// Goal:
// Create a validated config object with Proxy and Reflect.

import { validationStateKey } from './metadataKeys.js';

export function createValidatedConfig(initialConfigRecord) {
  const targetConfig = { ...initialConfigRecord };

  Object.defineProperty(targetConfig, validationStateKey, {
    value: {
      writeCount: 0,
    },
    enumerable: false,
    writable: true,
    configurable: false,
  });

  return new Proxy(targetConfig, {
    set(targetObject, propertyName, nextValue, receiverObject) {
      if (propertyName === 'pageSize' && nextValue <= 0) {
        throw new RangeError('pageSize must be positive');
      }

      targetObject[validationStateKey].writeCount += 1;

      return Reflect.set(targetObject, propertyName, nextValue, receiverObject);
    },
    get(targetObject, propertyName, receiverObject) {
      if (propertyName === 'writeCount') {
        return targetObject[validationStateKey].writeCount;
      }

      return Reflect.get(targetObject, propertyName, receiverObject);
    },
  });
}
```

### `app.js`

```js
// Goal:
// Compose symbols, descriptors, tagged templates, Proxy, and Reflect.

import { configLabel } from './configTemplate.js';
import { createValidatedConfig } from './configValidator.js';
import { validationStateKey } from './metadataKeys.js';

const dashboardConfig = createValidatedConfig({
  theme: 'dark',
  pageSize: 20,
});

const labelText = configLabel`Feature ${' Dashboard '} Mode ${dashboardConfig.theme}`;

console.log(labelText);
console.log(Object.keys(dashboardConfig));
console.log(Object.getOwnPropertySymbols(dashboardConfig).includes(validationStateKey));

console.log(dashboardConfig.writeCount);
dashboardConfig.pageSize = 30;
console.log(dashboardConfig.writeCount);
console.log(dashboardConfig.pageSize);
```

### 运行方式

```bash
node app.js
```

### 预期输出

```txt
Feature dashboard Mode dark
[ 'theme', 'pageSize' ]
true
0
1
30
```

### 项目意义

这组文件把本章关键机制串起来：

```txt
symbol key for internal metadata
non-enumerable descriptor
Proxy set validation
Reflect forwarding
tagged template normalization
module-based organization
```

---

## 19. 最终文件清单

```txt
javascript-metaprogramming-learning/
  00-metaprogramming-overview/
    languageLevelOperationDemo.js

  01-property-descriptors/
    descriptorReader.js
    inheritedDescriptorMistake.js

  02-data-and-accessor-properties/
    dataPropertyDemo.js
    accessorPropertyDemo.js
    descriptorShapeMistake.js

  03-property-attributes/
    enumerableHiddenProperty.js
    configurableLockDemo.js
    strictWritableMistake.js

  04-object-extensibility/
    preventExtensionsDemo.js
    sealDemo.js
    freezeDemo.js
    shallowFreezeMistake.js

  05-prototype-attribute/
    prototypeLookupDemo.js
    prototypeMutationDemo.js
    noPrototypeDictionary.js

  06-symbol-registry/
    localSymbolDemo.js
    globalSymbolRegistryDemo.js
    symbolPropertyKeyDemo.js

  07-well-known-symbols/
    iteratorSymbolDemo.js
    toStringTagDemo.js
    hasInstanceDemo.js
    toPrimitiveDemo.js

  08-tagged-templates/
    tagArgumentDemo.js
    htmlEscapeTagDemo.js
    queryBuilderTagDemo.js

  09-reflect-api/
    reflectGetSetDemo.js
    reflectDefinePropertyDemo.js
    reflectOwnKeysDemo.js

  10-proxy-basics/
    proxyGetDemo.js
    proxySetValidationDemo.js
    proxyHasDemo.js
    proxyDeleteDemo.js

  11-proxy-reflect-forwarding/
    getForwardingDemo.js
    setForwardingDemo.js
    receiverGetterDemo.js

  12-proxy-invariants/
    nonConfigurableOwnKeysMistake.js
    nonWritableGetMistake.js

  13-revocable-proxy/
    revocableProxyDemo.js

  14-mini-practice-project/
    package.json
    metadataKeys.js
    configTemplate.js
    configValidator.js
    app.js

  javascript-metaprogramming-learning-notes.md
```

---

## 20. 最终学习笔记转换要求

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
重要术语：中文后面必须补 English term。
代码命名：英文。
代码注释：英文。
代码和代码注释：不出现中文字符。
MDN 链接：使用普通 Markdown 链接，不放进 txt 代码块。
```

### 代码命名要求

```txt
Avoid generic names such as fn, obj, data, and user.
Use domain-specific names for each example.
Avoid repeating function names across sections.
```

---

## 21. MDN 阅读清单

读 MDN 的顺序要跟练习同步。先写代码，再查 MDN 细节。

- [MDN: Meta programming](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Meta_programming)
- [MDN: Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
- [MDN: Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [MDN: Object.preventExtensions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
- [MDN: Object.seal()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
- [MDN: Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
- [MDN: Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
- [MDN: Object.setPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
- [MDN: Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [MDN: Symbol.for()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for)
- [MDN: Symbol.keyFor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/keyFor)
- [MDN: Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)
- [MDN: Symbol.toStringTag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)
- [MDN: Symbol.hasInstance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance)
- [MDN: Symbol.toPrimitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)
- [MDN: Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [MDN: Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- [MDN: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [MDN: Proxy.revocable()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable)

---

## 22. 本章最终要能回答的问题

学完第 14 章，你应该能回答：

```txt
1. What is metaprogramming?
2. What is a property descriptor?
3. What is the difference between a data property and an accessor property?
4. What does writable control?
5. What does enumerable control?
6. What does configurable control?
7. Why does defineProperty create non-enumerable properties by default?
8. What is an own property?
9. Why does getOwnPropertyDescriptor not inspect the prototype chain?
10. What does preventExtensions block?
11. What does seal block?
12. What does freeze block?
13. Why is Object.freeze shallow?
14. What is [[Prototype]]?
15. What is the difference between function.prototype and object [[Prototype]]?
16. What is a symbol?
17. What is the difference between Symbol() and Symbol.for()?
18. What is the global symbol registry?
19. What is a well-known symbol?
20. How does Symbol.iterator connect objects to for...of?
21. How does Symbol.toStringTag affect Object.prototype.toString.call()?
22. How does Symbol.hasInstance affect instanceof?
23. How does Symbol.toPrimitive affect type conversion?
24. What does a tagged template receive as arguments?
25. Why can a tagged template return a non-string value?
26. What is Reflect?
27. Why is Reflect useful inside Proxy traps?
28. What is a Proxy target?
29. What is a Proxy handler?
30. What is a Proxy trap?
31. Why does Proxy only intercept operations through the proxy object?
32. What is a Proxy invariant?
33. Why can ownKeys not hide non-configurable properties?
34. What does Proxy.revocable() do?
35. How do descriptor, symbol, Reflect, and Proxy appear in real framework design?
```

最后记住这个模型：

```txt
Object property is not only key-value.
Property descriptor controls property behavior.
Object extensibility controls whether new properties can be added.
Prototype controls fallback property lookup.
Symbol customizes property keys and language hooks.
Tagged template lets a function process template literal parts.
Reflect invokes internal object operations through functions.
Proxy intercepts internal object operations.
Proxy traps must obey invariants.
```
