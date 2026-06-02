# JavaScript 元编程 Cheatsheet

> 对应章节：第 14 章“元编程（Metaprogramming）”  
> 用途：复习和查漏补缺。它不是学习指导文件的替代品，而是把本章的底层模型、API、常见误区和项目判断点压缩成一份速查表。  
> 代码规则：代码命名和代码注释使用英文；代码和代码注释不使用中文字符。

---

## 1. 本章总模型

### 结论

元编程（metaprogramming）不是普通业务逻辑，而是用代码观察、修改或拦截 JavaScript 对象系统的底层行为。

一句话记忆：

```txt
Normal programming:
  operate on business data.

Metaprogramming:
  operate on object behavior, property rules, prototype lookup, symbols, and internal operations.
```

### 本章核心链路

```txt
property descriptor
  -> data property / accessor property
  -> writable / enumerable / configurable
  -> object extensibility
  -> prototype attribute
  -> symbol property keys
  -> well-known symbols
  -> tagged templates
  -> Reflect
  -> Proxy
  -> Proxy invariants
  -> revocable proxy
```

### 元编程解决的问题

| 问题 | 对应机制 |
|---|---|
| 这个属性为什么不能改？ | property descriptor / writable |
| 这个属性为什么不出现在 `Object.keys()`？ | enumerable |
| 这个属性为什么不能删除？ | configurable |
| 这个对象为什么不能加新属性？ | extensibility |
| 属性自己没有，为什么还能读到？ | prototype chain |
| 如何避免属性名冲突？ | Symbol |
| 如何接入语言内置协议？ | well-known symbols |
| 如何处理模板字面量插值？ | tagged template |
| 如何用函数形式调用内部操作？ | Reflect |
| 如何拦截属性读取、写入、删除、枚举？ | Proxy |
| 为什么 Proxy 不能随便骗人？ | invariants |

---

## 2. 元编程和普通对象操作的区别

### 普通对象操作

```js
const profileRecord = {
  username: "ada",
};

console.log(profileRecord.username);
profileRecord.username = "grace";
```

你看到的是：

```txt
key -> value
```

### 元编程视角

```js
const descriptor = Object.getOwnPropertyDescriptor(profileRecord, "username");
console.log(descriptor);
```

你看到的是：

```txt
property key
property value
writable
enumerable
configurable
```

### 最终模型

```txt
A property is not only a key-value pair.
A property has attributes that control behavior.
```

---

## 3. 属性描述符总表

### 结论

属性描述符（property descriptor）描述的是对象自有属性（own property）的底层配置。

### 两类属性

| 属性类型 | descriptor 字段 | 含义 |
|---|---|---|
| 数据属性（data property） | `value`, `writable`, `enumerable`, `configurable` | 直接保存一个值 |
| 访问器属性（accessor property） | `get`, `set`, `enumerable`, `configurable` | 读取或赋值时调用函数 |

### API 总表

| API | 作用 | 返回值 |
|---|---|---|
| `Object.getOwnPropertyDescriptor(object, key)` | 读取一个自有属性的 descriptor | descriptor 或 `undefined` |
| `Object.getOwnPropertyDescriptors(object)` | 读取所有自有属性的 descriptors | descriptor map |
| `Object.defineProperty(object, key, descriptor)` | 精确定义一个属性 | 原对象 |
| `Object.defineProperties(object, descriptors)` | 一次定义多个属性 | 原对象 |
| `Object.hasOwn(object, key)` | 判断是否为自有属性 | boolean |

### 字面量属性的默认 descriptor

```js
const accountRecord = {
  email: "user@example.com",
};

console.log(Object.getOwnPropertyDescriptor(accountRecord, "email"));
```

默认是：

```txt
{
  value: "user@example.com",
  writable: true,
  enumerable: true,
  configurable: true
}
```

### `defineProperty()` 的默认 descriptor

```js
const accountRecord = {};

Object.defineProperty(accountRecord, "email", {
  value: "user@example.com",
});

console.log(Object.getOwnPropertyDescriptor(accountRecord, "email"));
```

默认是：

```txt
{
  value: "user@example.com",
  writable: false,
  enumerable: false,
  configurable: false
}
```

### 关键误区

| 错误理解 | 正确模型 |
|---|---|
| 对象属性只有 key 和 value | 属性还有 attributes |
| `getOwnPropertyDescriptor()` 会查原型链 | 它只查自有属性 |
| `defineProperty()` 默认和对象字面量一样 | `defineProperty()` 省略的布尔配置默认是 `false` |
| descriptor 里的字段可以随便混用 | 数据属性字段和访问器属性字段不能混用 |

---

## 4. 数据属性 vs 访问器属性

### 数据属性

数据属性直接保存值。

```txt
data property:
  value
  writable
  enumerable
  configurable
```

```js
const productRecord = {};

Object.defineProperty(productRecord, "sku", {
  value: "KB-001",
  writable: false,
  enumerable: true,
  configurable: true,
});

productRecord.sku = "KB-999";

console.log(productRecord.sku);
```

非严格模式下输出：

```txt
KB-001
```

严格模式下给 non-writable 属性赋值会抛 `TypeError`。

### 访问器属性

访问器属性不直接保存值。读取时调用 getter，赋值时调用 setter。

```txt
accessor property:
  get
  set
  enumerable
  configurable
```

```js
const cartState = {
  itemCount: 0,
};

Object.defineProperty(cartState, "summary", {
  get() {
    return `items:${this.itemCount}`;
  },
  set(nextSummaryText) {
    const countText = nextSummaryText.split(":")[1];
    this.itemCount = Number(countText);
  },
  enumerable: true,
  configurable: true,
});

console.log(cartState.summary);
cartState.summary = "items:5";
console.log(cartState.itemCount);
```

输出：

```txt
items:0
5
```

### 访问器运行机制

```txt
cartState.summary
  -> calls getter
  -> getter this points to cartState

cartState.summary = "items:5"
  -> calls setter
  -> setter receives "items:5"
```

### 不能混用的 descriptor 字段

错误：

```js
const settingsRecord = {};

Object.defineProperty(settingsRecord, "theme", {
  value: "dark",
  get() {
    return "light";
  },
});
```

结果：

```txt
TypeError
```

原因：

```txt
value / writable belong to data descriptors.
get / set belong to accessor descriptors.
One descriptor cannot be both shapes.
```

---

## 5. writable / enumerable / configurable

### 结论

这三个属性特性控制的是三个不同维度，不能混在一起理解。

| attribute | 控制什么 | 只适用于 |
|---|---|---|
| `writable` | 数据属性的值能否被重新赋值 | data property |
| `enumerable` | 属性是否参与常规枚举 | data property 和 accessor property |
| `configurable` | 属性能否删除、能否重定义关键特性 | data property 和 accessor property |

### `writable`

```js
"use strict";

const lockedConfig = {};

Object.defineProperty(lockedConfig, "mode", {
  value: "production",
  writable: false,
  enumerable: true,
  configurable: true,
});

lockedConfig.mode = "development";
```

结果：

```txt
TypeError
```

### `enumerable`

```js
const reportRecord = {
  title: "Revenue",
};

Object.defineProperty(reportRecord, "internalCode", {
  value: "R-2026",
  enumerable: false,
  writable: true,
  configurable: true,
});

console.log(reportRecord.internalCode);
console.log(Object.keys(reportRecord));
console.log("internalCode" in reportRecord);
```

输出：

```txt
R-2026
[ "title" ]
true
```

含义：

```txt
enumerable: false
  does not mean the property is missing.
  It means normal enumeration skips it.
```

### `configurable`

```js
"use strict";

const auditRecord = {};

Object.defineProperty(auditRecord, "createdAt", {
  value: "2026-05-13",
  writable: true,
  enumerable: true,
  configurable: false,
});

delete auditRecord.createdAt;
```

结果：

```txt
TypeError
```

### 枚举相关 API 对照

| 操作 | 是否包含 non-enumerable | 是否包含 inherited | 是否包含 symbol |
|---|---:|---:|---:|
| `Object.keys(object)` | 否 | 否 | 否 |
| `Object.values(object)` | 否 | 否 | 否 |
| `Object.entries(object)` | 否 | 否 | 否 |
| `for...in` | 否 | 是 | 否 |
| `Object.getOwnPropertyNames(object)` | 是 | 否 | 否 |
| `Object.getOwnPropertySymbols(object)` | 是 | 否 | 是 |
| `Reflect.ownKeys(object)` | 是 | 否 | 是 |

### 最终判断模型

```txt
Can I assign a new value?
  -> writable

Can Object.keys show it?
  -> enumerable

Can I delete or redefine it?
  -> configurable
```

---

## 6. 对象可扩展能力

### 结论

对象可扩展能力（object extensibility）控制的是对象能否添加新自有属性。`preventExtensions()`、`seal()`、`freeze()` 是三个递进级别。

### API 对照

| API | 禁止添加新属性 | 禁止删除属性 | 现有属性变 non-configurable | 数据属性变 non-writable |
|---|---:|---:|---:|---:|
| `Object.preventExtensions(object)` | 是 | 否 | 否 | 否 |
| `Object.seal(object)` | 是 | 是 | 是 | 否 |
| `Object.freeze(object)` | 是 | 是 | 是 | 是 |

### 检查 API

| API | 作用 |
|---|---|
| `Object.isExtensible(object)` | 是否还能添加新属性 |
| `Object.isSealed(object)` | 是否 sealed |
| `Object.isFrozen(object)` | 是否 frozen |

### `preventExtensions()`

```js
"use strict";

const runtimeConfig = {
  theme: "dark",
};

Object.preventExtensions(runtimeConfig);

console.log(Object.isExtensible(runtimeConfig));
runtimeConfig.pageSize = 20;
```

结果：

```txt
false
TypeError
```

### `seal()`

```js
"use strict";

const featureConfig = {
  enabled: true,
};

Object.seal(featureConfig);
featureConfig.enabled = false;

console.log(featureConfig.enabled);
delete featureConfig.enabled;
```

结果：

```txt
false
TypeError
```

`seal()` 允许修改 writable 数据属性的值，但不允许删除属性或添加新属性。

### `freeze()`

```js
"use strict";

const paymentConfig = {
  currency: "USD",
};

Object.freeze(paymentConfig);

console.log(Object.isFrozen(paymentConfig));
paymentConfig.currency = "EUR";
```

结果：

```txt
true
TypeError
```

### `Object.freeze()` 是浅冻结

```js
const dashboardConfig = {
  layout: {
    columns: 3,
  },
};

Object.freeze(dashboardConfig);
dashboardConfig.layout.columns = 4;

console.log(dashboardConfig.layout.columns);
```

输出：

```txt
4
```

原因：

```txt
Object.freeze(dashboardConfig)
  freezes dashboardConfig itself.
It does not recursively freeze dashboardConfig.layout.
```

### 常见误区

| 错误理解 | 正确模型 |
|---|---|
| `freeze()` 是深冻结 | 它是浅冻结 |
| `seal()` 不能改任何值 | writable 属性仍可改值 |
| `preventExtensions()` 会锁住已有属性 | 它只禁止添加新属性 |
| 非严格模式下所有失败都会报错 | 有些失败会静默失败 |

---

## 7. prototype 特性

### 结论

对象的内部 `[[Prototype]]` 决定属性查找失败后继续去哪里找。它不是函数对象上的 `.prototype` 属性。

### 两个 prototype 必须区分

| 名称 | 所属对象 | 含义 |
|---|---|---|
| `Function.prototype` / `Constructor.prototype` | 函数对象的普通属性 | `new` 创建实例时使用 |
| `object.[[Prototype]]` | 任意对象的内部链接 | 属性查找链路 |

### 读取和修改原型

| API | 作用 |
|---|---|
| `Object.getPrototypeOf(object)` | 读取对象内部 `[[Prototype]]` |
| `Object.setPrototypeOf(object, prototype)` | 修改对象内部 `[[Prototype]]` |
| `Object.create(prototype)` | 创建指定原型的新对象 |
| `prototypeObject.isPrototypeOf(object)` | 判断是否在原型链上 |

### 属性查找模型

```txt
record.createLabel
  -> check own property on record
  -> if missing, check Object.getPrototypeOf(record)
  -> continue until null
```

### 示例

```js
const sharedMethods = {
  createLabel() {
    return `profile:${this.username}`;
  },
};

const profileRecord = Object.create(sharedMethods);
profileRecord.username = "ada";

console.log(profileRecord.createLabel());
console.log(Object.hasOwn(profileRecord, "createLabel"));
console.log(Object.getPrototypeOf(profileRecord) === sharedMethods);
```

输出：

```txt
profile:ada
false
true
```

### 无原型对象

```js
const dictionaryRecord = Object.create(null);

dictionaryRecord.toString = "custom value";

console.log(dictionaryRecord.toString);
console.log(Object.getPrototypeOf(dictionaryRecord));
```

输出：

```txt
custom value
null
```

用途：

```txt
dictionary-like storage without Object.prototype inherited names.
```

### 常见误区

| 错误理解 | 正确模型 |
|---|---|
| `.prototype` 和 `[[Prototype]]` 是同一个东西 | 不是，一个是函数属性，一个是对象内部链接 |
| `Object.setPrototypeOf()` 是日常推荐写法 | 真实项目里少用，可能影响性能和可维护性 |
| 继承属性也是 own property | 不是 |
| `Object.getOwnPropertyDescriptor()` 会看原型链 | 不会 |

---

## 8. Symbol 和全局符号注册表

### 结论

Symbol 是唯一的原始值（primitive value），常用作对象属性键，避免和字符串属性名冲突。

### API 对照

| API | 作用 |
|---|---|
| `Symbol(description?)` | 创建一个新的非注册 symbol |
| `Symbol.for(key)` | 从全局符号注册表取得或创建 registered symbol |
| `Symbol.keyFor(symbol)` | 读取 registered symbol 的 key |
| `symbol.description` | 读取描述文本 |

### `Symbol()` 每次都唯一

```js
const firstMetadataKey = Symbol("metadata");
const secondMetadataKey = Symbol("metadata");

console.log(firstMetadataKey === secondMetadataKey);
console.log(firstMetadataKey.description);
```

输出：

```txt
false
metadata
```

### `Symbol.for()` 复用全局注册表

```js
const firstSharedKey = Symbol.for("app.metadata");
const secondSharedKey = Symbol.for("app.metadata");
const localKey = Symbol("app.metadata");

console.log(firstSharedKey === secondSharedKey);
console.log(Symbol.keyFor(firstSharedKey));
console.log(Symbol.keyFor(localKey));
```

输出：

```txt
true
app.metadata
undefined
```

### Symbol 属性键

```js
const internalStateKey = Symbol("internalState");

const widgetRecord = {
  id: "search-box",
  [internalStateKey]: {
    focused: false,
  },
};

console.log(widgetRecord.id);
console.log(widgetRecord[internalStateKey].focused);
console.log(Object.keys(widgetRecord));
console.log(Object.getOwnPropertySymbols(widgetRecord).length);
```

输出：

```txt
search-box
false
[ "id" ]
1
```

### Symbol 不是绝对私有

```txt
Symbol-keyed properties:
  not shown by Object.keys()
  not accessed by accidental string key collision
  still discoverable through Object.getOwnPropertySymbols()
  visible through Reflect.ownKeys()
```

### 常见误区

| 错误理解 | 正确模型 |
|---|---|
| `Symbol("x") === Symbol("x")` | false |
| description 决定 symbol 相等性 | description 只用于调试 |
| Symbol 属性完全私有 | 不是，只是不容易冲突 |
| `Symbol.for()` 和 `Symbol()` 一样 | `Symbol.for()` 使用全局注册表 |

---

## 9. 公认符号 Well-known Symbols

### 结论

公认符号（well-known symbols）是语言预定义的 symbol，用来让对象接入或定制语言级行为。

### 常见公认符号

| 符号 | 触发它的语言行为 | 作用 |
|---|---|---|
| `Symbol.iterator` | `for...of`, spread, destructuring, `Array.from()` | 定义默认同步迭代器 |
| `Symbol.asyncIterator` | `for await...of` | 定义默认异步迭代器 |
| `Symbol.toStringTag` | `Object.prototype.toString.call(value)` | 自定义类型标签 |
| `Symbol.hasInstance` | `value instanceof Constructor` | 自定义 `instanceof` 判断 |
| `Symbol.toPrimitive` | 对象转原始值 | 自定义类型转换 |
| `Symbol.match` | `string.match(value)` | 自定义 match 行为 |
| `Symbol.replace` | `string.replace(value, replacement)` | 自定义 replace 行为 |
| `Symbol.search` | `string.search(value)` | 自定义 search 行为 |
| `Symbol.split` | `string.split(value)` | 自定义 split 行为 |
| `Symbol.species` | 某些派生对象创建结果 | 控制派生构造器 |

### `Symbol.iterator`

```js
const playlistRecord = {
  tracks: ["intro", "main", "outro"],
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

输出：

```txt
intro
main
outro
```

### `Symbol.toStringTag`

```js
class ValidationReport {
  get [Symbol.toStringTag]() {
    return "ValidationReport";
  }
}

const reportInstance = new ValidationReport();

console.log(Object.prototype.toString.call(reportInstance));
```

输出：

```txt
[object ValidationReport]
```

### `Symbol.hasInstance`

```js
class PositiveNumberRecord {
  static [Symbol.hasInstance](candidateValue) {
    return typeof candidateValue === "number" && candidateValue > 0;
  }
}

console.log(10 instanceof PositiveNumberRecord);
console.log(-5 instanceof PositiveNumberRecord);
console.log("10" instanceof PositiveNumberRecord);
```

输出：

```txt
true
false
false
```

### `Symbol.toPrimitive`

```js
const invoiceRecord = {
  id: "INV-001",
  amount: 120,
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.amount;
    }

    return this.id;
  },
};

console.log(Number(invoiceRecord));
console.log(String(invoiceRecord));
console.log(`${invoiceRecord}`);
```

输出：

```txt
120
INV-001
INV-001
```

### 常见误区

| 错误理解 | 正确模型 |
|---|---|
| well-known symbol 是私有字段 | 它是语言协议 hook |
| `Symbol.iterator` 只给数组用 | 任意对象都可实现 |
| `instanceof` 永远只查 prototype chain | 右侧有 `Symbol.hasInstance` 时可定制 |
| `Symbol.toPrimitive` 必须返回字符串 | 必须返回 primitive，可以是 string / number / boolean / symbol / bigint |

---

## 10. Tagged Template 模板标签

### 结论

模板标签（tagged template）让函数接管模板字面量的处理过程。它可以返回任何值，不一定返回字符串。

### 调用模型

```js
tagFunction`a ${x} b ${y} c`
```

等价理解为：

```txt
tagFunction(
  ["a ", " b ", " c"],
  x,
  y
)
```

实际第一个参数是模板字符串片段数组，后面是表达式值。

### 参数结构

| 参数 | 含义 |
|---|---|
| `stringParts` | 静态字符串片段数组 |
| `...expressionValues` | 每个 `${...}` 的运行时值 |
| `stringParts.raw` | 未处理转义的原始字符串片段 |

### 检查参数

```js
function inspectTemplateParts(stringParts, ...expressionValues) {
  console.log(stringParts);
  console.log(expressionValues);
  return "done";
}

const customerName = "Ada";
const itemCount = 3;

const resultText = inspectTemplateParts`Customer ${customerName} has ${itemCount} items.`;

console.log(resultText);
```

输出：

```txt
[ "Customer ", " has ", " items." ]
[ "Ada", 3 ]
done
```

### HTML 转义标签

```js
function escapeHtmlValue(rawValue) {
  return String(rawValue)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function htmlSafe(stringParts, ...expressionValues) {
  let outputText = stringParts[0];

  for (let index = 0; index < expressionValues.length; index += 1) {
    outputText += escapeHtmlValue(expressionValues[index]);
    outputText += stringParts[index + 1];
  }

  return outputText;
}

const unsafeName = "<script>alert(1)</script>";
const safeMarkup = htmlSafe`<p>${unsafeName}</p>`;

console.log(safeMarkup);
```

输出：

```txt
<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>
```

### 返回结构化对象

```js
function sqlParts(stringParts, ...expressionValues) {
  return {
    text: stringParts.join("?"),
    values: expressionValues,
  };
}

const userId = 42;
const statusValue = "active";

const queryRecord = sqlParts`select * from users where id = ${userId} and status = ${statusValue}`;

console.log(queryRecord.text);
console.log(queryRecord.values);
```

输出：

```txt
select * from users where id = ? and status = ?
[ 42, "active" ]
```

### 常见用途

| 场景 | 作用 |
|---|---|
| HTML escape | 转义插值内容 |
| SQL builder | 分离 SQL 文本和参数 |
| CSS-in-JS | 处理样式模板 |
| i18n | 处理本地化模板 |
| logging | 结构化日志 |

### 常见误区

| 错误理解 | 正确模型 |
|---|---|
| tagged template 必须返回 string | 可以返回任何值 |
| `${...}` 先拼成完整字符串再传给 tag | 不会，静态片段和表达式值分开传入 |
| tag 是语法糖函数调用而已 | 它保留了模板结构信息 |
| tag 能自动防 XSS | 只有你在 tag 里正确转义才安全 |

---

## 11. Reflect 反射 API

### 结论

`Reflect` 是反射 API 命名空间对象，提供和对象内部操作对应的静态方法，尤其适合在 Proxy trap 中转发默认行为。

### Reflect 的定位

```txt
Reflect:
  not a constructor
  not used with new
  a namespace object for internal object operations
```

### 常用 Reflect 方法

| 方法 | 对应操作 | 返回值 |
|---|---|---|
| `Reflect.get(target, key, receiver?)` | 属性读取 | 属性值 |
| `Reflect.set(target, key, value, receiver?)` | 属性写入 | boolean |
| `Reflect.has(target, key)` | `key in target` | boolean |
| `Reflect.deleteProperty(target, key)` | `delete target[key]` | boolean |
| `Reflect.defineProperty(target, key, descriptor)` | 定义属性 | boolean |
| `Reflect.getOwnPropertyDescriptor(target, key)` | 读取 descriptor | descriptor 或 `undefined` |
| `Reflect.ownKeys(target)` | 读取所有自有 key | string key 和 symbol key 数组 |
| `Reflect.getPrototypeOf(target)` | 读取原型 | object 或 `null` |
| `Reflect.setPrototypeOf(target, proto)` | 设置原型 | boolean |
| `Reflect.isExtensible(target)` | 检查 extensible | boolean |
| `Reflect.preventExtensions(target)` | 禁止扩展 | boolean |
| `Reflect.apply(function, thisArg, args)` | 函数调用 | 函数返回值 |
| `Reflect.construct(constructor, args, newTarget?)` | 构造调用 | 新对象 |

### Reflect 和 Object API 的一个重要差异

| 操作 | `Object.*` 常见行为 | `Reflect.*` 常见行为 |
|---|---|---|
| 定义属性失败 | 可能抛错 | 返回 boolean |
| 删除属性 | `delete` 是操作符 | `Reflect.deleteProperty()` 是函数 |
| 读取 key | 多个 API 分散 | `Reflect.ownKeys()` 同时拿 string 和 symbol key |

### 示例

```js
const profileRecord = {
  username: "ada",
};

console.log(Reflect.get(profileRecord, "username"));
console.log(Reflect.set(profileRecord, "username", "grace"));
console.log(profileRecord.username);
```

输出：

```txt
ada
true
grace
```

### `Reflect.ownKeys()`

```js
const secretKey = Symbol("secret");

const recordStore = {
  visible: true,
  [secretKey]: "hidden",
};

console.log(Reflect.ownKeys(recordStore));
```

输出：

```txt
[ "visible", Symbol(secret) ]
```

### 为什么 Proxy trap 里优先用 Reflect

```txt
Reflect preserves default internal operation semantics.
It handles receiver, return values, and invariants more safely than manual property access.
```

错误倾向：

```js
return targetObject[propertyName];
```

更稳妥：

```js
return Reflect.get(targetObject, propertyName, receiverObject);
```

---

## 12. Proxy 基础模型

### 结论

`Proxy` 创建代理对象，可以拦截对目标对象的底层操作。

### 基本语法

```js
const proxyObject = new Proxy(targetObject, handlerObject);
```

| 名称 | 含义 |
|---|---|
| target object | 被代理的原始对象 |
| handler object | 定义 trap 的对象 |
| trap | 拦截某种内部操作的方法 |
| proxy object | 对外使用的代理对象 |

### 关键原则

```txt
Proxy intercepts operations performed on the proxy.
Proxy does not intercept direct operations on the original target.
```

### 常用 trap 对照

| trap | 拦截的操作 | 推荐默认转发 |
|---|---|---|
| `get(target, key, receiver)` | 读取属性 | `Reflect.get(target, key, receiver)` |
| `set(target, key, value, receiver)` | 写入属性 | `Reflect.set(target, key, value, receiver)` |
| `has(target, key)` | `key in proxy` | `Reflect.has(target, key)` |
| `deleteProperty(target, key)` | `delete proxy[key]` | `Reflect.deleteProperty(target, key)` |
| `ownKeys(target)` | `Object.keys`, `Reflect.ownKeys` 等 | `Reflect.ownKeys(target)` |
| `getOwnPropertyDescriptor(target, key)` | 读取 descriptor | `Reflect.getOwnPropertyDescriptor(target, key)` |
| `defineProperty(target, key, descriptor)` | 定义属性 | `Reflect.defineProperty(target, key, descriptor)` |
| `getPrototypeOf(target)` | 读取原型 | `Reflect.getPrototypeOf(target)` |
| `setPrototypeOf(target, prototype)` | 设置原型 | `Reflect.setPrototypeOf(target, prototype)` |
| `apply(target, thisArg, args)` | 函数调用 | `Reflect.apply(target, thisArg, args)` |
| `construct(target, args, newTarget)` | `new proxy(...)` | `Reflect.construct(target, args, newTarget)` |

### `get` trap

```js
const profileRecord = {
  username: "ada",
};

const profileProxy = new Proxy(profileRecord, {
  get(targetObject, propertyName, receiverObject) {
    if (propertyName in targetObject) {
      return Reflect.get(targetObject, propertyName, receiverObject);
    }

    return "missing";
  },
});

console.log(profileProxy.username);
console.log(profileProxy.email);
```

输出：

```txt
ada
missing
```

### `set` trap

```js
const productRecord = {
  price: 10,
};

const productProxy = new Proxy(productRecord, {
  set(targetObject, propertyName, nextValue, receiverObject) {
    if (propertyName === "price" && nextValue < 0) {
      throw new RangeError("Price must be non-negative");
    }

    return Reflect.set(targetObject, propertyName, nextValue, receiverObject);
  },
});

productProxy.price = 20;
console.log(productRecord.price);
```

输出：

```txt
20
```

### `has` trap

```js
const permissionRecord = {
  read: true,
  write: false,
};

const permissionProxy = new Proxy(permissionRecord, {
  has(targetObject, propertyName) {
    if (propertyName === "admin") {
      return false;
    }

    return Reflect.has(targetObject, propertyName);
  },
});

console.log("read" in permissionProxy);
console.log("admin" in permissionProxy);
```

输出：

```txt
true
false
```

### `deleteProperty` trap

```js
const sessionRecord = {
  token: "abc",
  temporaryNote: "draft",
};

const sessionProxy = new Proxy(sessionRecord, {
  deleteProperty(targetObject, propertyName) {
    if (propertyName === "token") {
      return false;
    }

    return Reflect.deleteProperty(targetObject, propertyName);
  },
});

console.log(delete sessionProxy.temporaryNote);
console.log(delete sessionProxy.token);
console.log(sessionRecord);
```

输出：

```txt
true
false
{ token: "abc" }
```

### 常见误区

| 错误理解 | 正确模型 |
|---|---|
| Proxy 修改 target 本身 | Proxy 是包装层 |
| 直接操作 target 也会触发 trap | 不会 |
| trap 可以随便返回任何东西 | 要符合该 trap 的语义和 invariants |
| set trap 不需要返回值 | 应返回 boolean，严格模式下 false 会导致 TypeError |

---

## 13. Proxy + Reflect 的 receiver 问题

### 结论

`receiver` 是属性访问或设置时的接收者。遇到 getter、setter、继承、Proxy 组合时，`Reflect.get()` / `Reflect.set()` 能保留正确语义。

### 为什么不能总写 `target[key]`

```js
return targetObject[propertyName];
```

问题：

```txt
It directly reads from target.
It can break getter this binding.
It ignores receiver semantics.
```

### 正确转发

```js
return Reflect.get(targetObject, propertyName, receiverObject);
```

### receiver 示例

```js
const baseRecord = {
  get label() {
    return `label:${this.name}`;
  },
};

const childRecord = {
  name: "child",
};

Object.setPrototypeOf(childRecord, baseRecord);

const childProxy = new Proxy(childRecord, {
  get(targetObject, propertyName, receiverObject) {
    return Reflect.get(targetObject, propertyName, receiverObject);
  },
});

console.log(childProxy.label);
```

输出：

```txt
label:child
```

### 最终模型

```txt
target:
  object where the property lookup is forwarded.

receiver:
  object that should become this for getter/setter behavior.
```

---

## 14. Proxy 不变量 Invariants

### 结论

Proxy 可以拦截操作，但不能违反 JavaScript 对象系统的不变量（invariants）。

### 什么是不变量

不变量是语言必须保持成立的底层规则。Proxy trap 的返回结果如果和 target 的真实不可变约束冲突，运行时会抛 `TypeError`。

### 常见不变量

| 场景 | 不允许的 Proxy 谎言 |
|---|---|
| non-configurable own property | `ownKeys()` 不能隐藏它 |
| non-configurable + non-writable data property | `get()` 不能返回不同值 |
| non-extensible target | `ownKeys()` 不能报告不存在的新 key |
| non-configurable property | `getOwnPropertyDescriptor()` 不能伪装它不存在 |
| non-configurable property | `deleteProperty()` 不能报告删除成功 |
| non-extensible target | `setPrototypeOf()` 不能随便换原型 |

### `ownKeys()` 不能隐藏 non-configurable 属性

```js
const targetRecord = {};

Object.defineProperty(targetRecord, "fixedKey", {
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

结果：

```txt
TypeError
```

### `get()` 不能伪造固定数据属性

```js
const targetRecord = {};

Object.defineProperty(targetRecord, "fixedValue", {
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

结果：

```txt
TypeError
```

### 最终模型

```txt
Proxy can customize behavior.
Proxy cannot violate target object's non-configurable, non-writable, or non-extensible facts.
```

### 常见误区

| 错误理解 | 正确模型 |
|---|---|
| Proxy 可以骗过所有对象规则 | 不可以 |
| trap 返回值只影响表层结果 | 返回值必须和 target 底层状态一致 |
| TypeError 是随机的 | 通常是违反 invariant |
| Reflect 可有可无 | Reflect 转发能减少 invariant 错误 |

---

## 15. 可撤销代理 Revocable Proxy

### 结论

`Proxy.revocable()` 创建可以被撤销的代理。撤销后，任何通过 proxy 的操作都会抛 `TypeError`。

### 语法

```js
const revocableRecord = Proxy.revocable(targetObject, handlerObject);
```

返回：

```txt
{
  proxy,
  revoke
}
```

### 示例

```js
const tokenRecord = {
  value: "secret-token",
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

结果：

```txt
secret-token
TypeError
```

### 关键点

```txt
revoke disables the proxy.
revoke does not destroy the target.
```

撤销后：

```js
console.log(tokenRecord.value);
```

仍然可以读取 target。

### 项目用途

| 场景 | 用法 |
|---|---|
| 临时权限对象 | 权限结束后 revoke |
| 测试隔离 | 测试结束后禁止继续访问 mock |
| 生命周期对象 | 组件销毁后撤销访问 |
| 安全包装 | 控制某段时间内的访问窗口 |

---

## 16. 元编程项目判断点

### 什么时候用 descriptor

使用 descriptor 的场景：

```txt
hide internal metadata from Object.keys()
create read-only public constants
define accessor properties
preserve exact property attributes
copy objects with descriptors
```

不要用 descriptor 的场景：

```txt
ordinary business object creation
simple data records
React props and state
plain JSON-compatible values
```

### 什么时候用 Symbol

使用 Symbol 的场景：

```txt
avoid property key collision
store internal metadata
implement well-known symbol protocols
create library-level extension points
```

不要用 Symbol 的场景：

```txt
data that must be serialized to JSON
public API names that users must type
values that must be easy to inspect in logs
```

### 什么时候用 tagged template

使用 tagged template 的场景：

```txt
escape inserted HTML values
build parameterized query objects
normalize template input
create DSL-like APIs
preserve string parts and expression values separately
```

不要用 tagged template 的场景：

```txt
simple string interpolation
ordinary display labels
cases where a function call is clearer
```

### 什么时候用 Reflect

使用 Reflect 的场景：

```txt
inside Proxy traps
calling object internal operations consistently
checking boolean success from operations
working with string and symbol own keys together
```

不要用 Reflect 的场景：

```txt
ordinary property reads in application code
simple assignment
basic object literals
```

### 什么时候用 Proxy

使用 Proxy 的场景：

```txt
validation layer
logging property access
reactive dependency tracking
virtual objects
permission-controlled object access
mocking dynamic APIs
```

慎用 Proxy 的原因：

```txt
can hide ordinary control flow
can make debugging harder
can violate invariants if written carelessly
can have performance cost
does not affect direct target access
```

---

## 17. 小项目整合模型：Validated Config

### 目标

把这些机制串起来：

```txt
symbol key for internal metadata
non-enumerable descriptor
Proxy set validation
Reflect forwarding
tagged template normalization
module-based organization
```

### 核心结构

```txt
metadataKeys.js
  exports validationStateKey symbol

configTemplate.js
  exports tagged template function

configValidator.js
  creates target config
  defines non-enumerable symbol metadata
  returns Proxy with get and set traps

app.js
  uses the validated config
```

### 为什么 metadata 用 Symbol

```txt
validationStateKey avoids collision with normal config keys.
Object.keys(config) does not show symbol metadata.
Object.getOwnPropertySymbols(config) can still inspect it.
```

### 为什么 metadata 用 non-enumerable descriptor

```txt
internal metadata should not pollute Object.keys().
descriptor makes that behavior explicit.
```

### 为什么 set trap 用 Reflect.set

```txt
set trap adds validation and write counting.
Reflect.set preserves default assignment semantics.
```

### 为什么 tagged template 用于 label

```txt
It receives static string parts and dynamic values separately.
It can normalize inserted values before combining them.
```

---

## 18. API 一页总表

### Object descriptor APIs

| API | 记忆 |
|---|---|
| `Object.getOwnPropertyDescriptor(object, key)` | 读一个 own property descriptor |
| `Object.getOwnPropertyDescriptors(object)` | 读所有 own property descriptors |
| `Object.defineProperty(object, key, descriptor)` | 精确定义一个属性 |
| `Object.defineProperties(object, descriptors)` | 精确定义多个属性 |
| `Object.hasOwn(object, key)` | 判断 own property |

### Object extensibility APIs

| API | 记忆 |
|---|---|
| `Object.preventExtensions(object)` | 禁止加新属性 |
| `Object.seal(object)` | 禁止加、删、重新配置 |
| `Object.freeze(object)` | 在 seal 基础上，数据属性也禁止改值 |
| `Object.isExtensible(object)` | 检查可扩展 |
| `Object.isSealed(object)` | 检查 sealed |
| `Object.isFrozen(object)` | 检查 frozen |

### Prototype APIs

| API | 记忆 |
|---|---|
| `Object.create(proto)` | 创建指定原型对象 |
| `Object.getPrototypeOf(object)` | 读取 `[[Prototype]]` |
| `Object.setPrototypeOf(object, proto)` | 修改 `[[Prototype]]` |
| `proto.isPrototypeOf(object)` | 判断 proto 是否在原型链上 |

### Symbol APIs

| API | 记忆 |
|---|---|
| `Symbol(description?)` | 创建唯一 symbol |
| `Symbol.for(key)` | 从全局注册表取得 symbol |
| `Symbol.keyFor(symbol)` | 查 registered symbol 的 key |
| `Object.getOwnPropertySymbols(object)` | 获取 symbol own keys |

### Reflect APIs

| API | 记忆 |
|---|---|
| `Reflect.get()` | 属性读取 |
| `Reflect.set()` | 属性写入 |
| `Reflect.has()` | `in` |
| `Reflect.deleteProperty()` | 删除属性 |
| `Reflect.defineProperty()` | 定义属性 |
| `Reflect.ownKeys()` | 读取 string + symbol own keys |
| `Reflect.getPrototypeOf()` | 读取原型 |
| `Reflect.setPrototypeOf()` | 设置原型 |
| `Reflect.apply()` | 函数调用 |
| `Reflect.construct()` | 构造调用 |

### Proxy APIs

| API | 记忆 |
|---|---|
| `new Proxy(target, handler)` | 创建代理 |
| `Proxy.revocable(target, handler)` | 创建可撤销代理 |

---

## 19. 常见错误总表

| 错误 | 错误原因 | 正确模型 |
|---|---|---|
| 把属性理解成纯 key-value | 忽略 descriptor | 属性还有 attributes |
| 以为 `defineProperty()` 默认可枚举可写可配置 | 省略配置默认 false | 明确写 `writable/enumerable/configurable` |
| 混用 `value` 和 `get` | descriptor 形状冲突 | data descriptor 和 accessor descriptor 分开 |
| 以为 `enumerable: false` 表示属性不存在 | 只是常规枚举跳过 | 点语法和 `in` 仍可访问 |
| 以为 `freeze()` 是深冻结 | 只冻结当前对象 | 嵌套对象要递归处理 |
| 混淆 `.prototype` 和 `[[Prototype]]` | 一个是函数属性，一个是对象内部链接 | 看所属对象 |
| 以为 Symbol 描述决定相等性 | description 只用于调试 | Symbol 值本身唯一 |
| 以为 Symbol 属性绝对私有 | 可通过 symbol API 发现 | 它主要避免命名冲突 |
| 以为 tagged template 先拼字符串 | string parts 和 values 分开传 | tag 可以安全处理插值 |
| 在 Proxy trap 里直接 `target[key]` | 可能破坏 receiver 语义 | 用 `Reflect.get()` |
| set trap 不返回 boolean | 违反 set trap 语义 | 返回 `Reflect.set(...)` |
| 以为 Proxy 拦截 target 直接访问 | 只拦截 proxy 上的操作 | 所有访问必须走 proxy |
| 以为 Proxy 可以违反对象规则 | 违反 invariants 会 TypeError | 尊重 non-configurable / non-writable / non-extensible |
| 以为 revoke 删除 target | revoke 只禁用 proxy | target 仍存在 |

---

## 20. 最终记忆模型

```txt
Metaprogramming means controlling language-level behavior.

Property descriptor:
  tells how an own property behaves.

Data property:
  value + writable.

Accessor property:
  get + set.

Enumerable:
  controls normal enumeration.

Configurable:
  controls deletion and redefinition.

Extensibility:
  controls whether new own properties can be added.

Prototype:
  controls fallback property lookup.

Symbol:
  creates collision-resistant property keys.

Well-known symbol:
  lets objects customize language protocols.

Tagged template:
  lets a function process string parts and expression values.

Reflect:
  calls internal object operations through functions.

Proxy:
  intercepts internal object operations.

Proxy invariant:
  protects the object model from impossible lies.

Revocable proxy:
  creates temporary access to a target object.
```

### 最后一层专业判断

```txt
Do not use metaprogramming to make simple code clever.
Use metaprogramming when you need to control or observe object behavior itself.
```
