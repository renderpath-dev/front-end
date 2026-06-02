# JavaScript 第 6 章“对象”Cheatsheet v1

> 定位：这是第 6 章学完后的快速复习表，不替代学习指导文件。  
> 规则：正文中文；代码和代码注释不使用中文字符。

---

## 1. 核心记忆句

```txt
JavaScript object = own property table + prototype link.
```

```txt
Read searches the object and then the prototype chain.
Write usually creates or updates an own property on the receiver.
Enumeration and copying depend on ownership and enumerability.
```

---

## 2. 对象创建方式速查

| 方式 | 示例 | 原型 | 返回值 | 常见坑 |
|---|---|---|---|---|
| 对象字面量 | `{ sku: "A" }` | `Object.prototype` | 新对象 | 每次求值都是新对象。 |
| `new Object()` | `new Object()` | `Object.prototype` | 新对象 | 通常不如 `{}` 简洁。 |
| 自定义构造函数 | `new Product("A")` | `Product.prototype` | 新对象 | 忘记 `new` 会改变 `this` 行为。 |
| `Object.create(proto)` | `Object.create(defaults)` | `proto` | 新对象 | 属性可能是继承来的。 |
| `Object.create(null)` | `Object.create(null)` | `null` | 新对象 | 没有 `toString()` / `hasOwnProperty()`。 |

---

## 3. 属性访问速查

| 写法 | 属性名来源 | 适合场景 | 失败行为 |
|---|---|---|---|
| `object.key` | 源码中的固定标识符 `key` | 固定字段 | 找不到返回 `undefined`；对象为 `null` / `undefined` 抛错 |
| `object["key"]` | 字符串字面量 | 特殊字符字段 | 同上 |
| `object[fieldName]` | 运行时变量或表达式 | 动态字段 | 同上 |
| `object?.key` | 固定字段 | 左侧可能为空 | 左侧为 `null` / `undefined` 时返回 `undefined` |

### 关键区别

```txt
object.fieldName
  -> reads the property literally named "fieldName"

object[fieldName]
  -> evaluates the variable fieldName first
  -> reads the property with that resulting name
```

---

## 4. 属性测试 API 对比

| API / 语法 | 所属对象 | 检查范围 | 包含继承属性 | 返回值 | 常见坑 |
|---|---|---|---:|---|---|
| `key in object` | 操作符 | 自有 + 继承 | 是 | boolean | 不能判断属性是不是对象自己的。 |
| `Object.hasOwn(object, key)` | `Object` | 自有 | 否 | boolean | 推荐优先使用。 |
| `object.hasOwnProperty(key)` | `Object.prototype` | 自有 | 否 | boolean | null-prototype 对象没有这个方法。 |
| `object.propertyIsEnumerable(key)` | `Object.prototype` | 自有且可枚举 | 否 | boolean | 不可枚举自有属性返回 `false`。 |
| `object.key !== undefined` | 表达式 | 读取值 | 取决于查询结果 | boolean | 无法区分缺失和存在但值为 `undefined`。 |

---

## 5. 枚举 API 对比

| API / 语法 | 自有 | 继承 | 可枚举 | 不可枚举 | 字符串键 | 符号键 |
|---|---:|---:|---:|---:|---:|---:|
| `for...in` | 是 | 是 | 是 | 否 | 是 | 否 |
| `Object.keys(object)` | 是 | 否 | 是 | 否 | 是 | 否 |
| `Object.values(object)` | 是 | 否 | 是 | 否 | 是 | 否 |
| `Object.entries(object)` | 是 | 否 | 是 | 否 | 是 | 否 |
| `Object.getOwnPropertyNames(object)` | 是 | 否 | 是 | 是 | 是 | 否 |
| `Object.getOwnPropertySymbols(object)` | 是 | 否 | 是 | 是 | 否 | 是 |
| `Reflect.ownKeys(object)` | 是 | 否 | 是 | 是 | 是 | 是 |

### 枚举顺序

```txt
1. non-negative integer-like string keys in numeric order
2. other string keys in insertion order
3. symbol keys in insertion order
```

---

## 6. 复制和扩展速查

| API / 语法 | 签名 | 返回值 | 修改目标 | 复制范围 | 深拷贝 |
|---|---|---|---:|---|---:|
| `Object.assign()` | `Object.assign(target, ...sources)` | `target` | 是 | 来源对象的可枚举自有属性 | 否 |
| 对象展开 | `{ ...source }` | 新对象 | 否 | 来源对象的可枚举自有属性 | 否 |

### 覆盖规则

```js
const result = {
  ...defaults,
  ...overrides,
};
```

后面的同名属性覆盖前面的同名属性。

### 浅拷贝规则

```txt
outer object is copied
nested object references are shared
```

---

## 7. delete 速查

| 写法 | 作用 | 返回值 | 注意点 |
|---|---|---|---|
| `delete object.key` | 删除自有属性 | boolean | 不删除继承属性。 |
| `delete object[key]` | 删除动态属性名对应的自有属性 | boolean | key 表达式先求值。 |
| `object.key = undefined` | 把属性值设为 `undefined` | `undefined` | 属性仍然存在。 |

### delete vs undefined

```txt
delete object.key
  -> property may no longer exist

object.key = undefined
  -> property still exists, value is undefined
```

---

## 8. JSON 序列化规则

| 值 / 属性 | `JSON.stringify()` 行为 |
|---|---|
| 可枚举自有字符串属性 | 会被访问并序列化 |
| 继承属性 | 不序列化 |
| 不可枚举属性 | 不序列化 |
| 符号键属性 | 不序列化 |
| `undefined` 对象属性 | 跳过 |
| 函数属性 | 跳过 |
| `NaN` / `Infinity` | 序列化为 `null` |
| `Date` | 通过 `toJSON()` 变成 ISO 字符串 |
| 循环引用 | 抛出 `TypeError` |
| 自定义 `toJSON()` | 先调用，再序列化返回值 |

---

## 9. 对象转换方法

| 方法 | 所属位置 | 触发场景 | 返回值 | 注意点 |
|---|---|---|---|---|
| `toString()` | 对象或原型 | 字符串上下文 | string | 普通对象默认常是 `[object Object]`。 |
| `toLocaleString()` | 对象或原型 | 本地化字符串上下文 | string | 默认通常调用 `toString()`。 |
| `valueOf()` | 对象或原型 | 数值 / 原始值上下文 | primitive | Date 等内置对象会重写。 |
| `toJSON()` | 对象或原型 | `JSON.stringify()` | serializable value | 不在 `Object.prototype` 上。 |

---

## 10. 对象字面量扩展语法

| 语法 | 含义 | 等价理解 | 常见坑 |
|---|---|---|---|
| `{ sku }` | 属性简写 | `{ sku: sku }` | 变量必须已存在。 |
| `{ [fieldName]: value }` | 计算属性名 | 先求 `fieldName` 的值 | 忘记 `[]` 会创建字面属性名。 |
| `{ [symbolKey]: value }` | 符号键属性 | 用 symbol 作为 key | JSON 和 Object.keys 不会列出。 |
| `{ method() {} }` | 方法简写 | 函数值属性 | `this` 由调用方式决定。 |
| `{ get x() {} }` | getter | 读取时调用函数 | getter 无参数。 |
| `{ set x(value) {} }` | setter | 写入时调用函数 | setter 返回值被忽略。 |

---

## 11. Getter / Setter 速查

```js
const priceModel = {
  base: 100,
  rate: 0.2,
  get final() {
    return this.base * (1 - this.rate);
  },
  set final(value) {
    this.rate = 1 - value / this.base;
  },
};
```

| 操作 | 实际机制 |
|---|---|
| `priceModel.final` | 调用 getter，返回 getter 的返回值。 |
| `priceModel.final = 90` | 调用 setter，把 `90` 作为参数传入。 |
| setter 内部 `return` | 被忽略。 |

---

## 12. 同名 API / 相似概念对比

| 概念 A | 概念 B | 区别 |
|---|---|---|
| 自有属性 | 继承属性 | 自有属性在对象自己身上；继承属性来自原型链。 |
| `in` | `Object.hasOwn()` | `in` 包含继承；`Object.hasOwn()` 只看自有。 |
| `delete obj.key` | `obj.key = undefined` | 前者删除属性；后者保留属性但值为空。 |
| `Object.assign()` | 对象展开 | 前者修改目标；后者创建新对象字面量。 |
| 浅拷贝 | 深拷贝 | 浅拷贝共享嵌套引用；深拷贝递归复制。 |
| JSON 文本 | JavaScript 对象 | JSON 是字符串数据格式；对象是运行时值。 |
| 数据属性 | 访问器属性 | 数据属性保存值；访问器属性通过函数读写。 |
| `Object.keys()` | `Reflect.ownKeys()` | 前者只列自有可枚举字符串键；后者列所有自有字符串键和符号键。 |
| 普通对象字典 | `Map` | 对象键主要是字符串 / 符号；Map 键可以是任意值。 |

---

## 13. 常见错误快速定位

| 现象 | 常见原因 | 修正方向 |
|---|---|---|
| 修改副本影响原对象 | 只是复制引用或浅拷贝 | 创建新对象并复制嵌套层。 |
| `obj.fieldName` 得到 `undefined` | 读取了字面属性名 | 改成 `obj[fieldName]`。 |
| `for...in` 多出奇怪字段 | 遍历到继承可枚举属性 | 用 `Object.keys()` 或 `Object.hasOwn()` 过滤。 |
| `JSON.stringify()` 丢字段 | 字段值是函数、`undefined`、符号键或不可枚举 | 转成可序列化数据。 |
| Date 解析后不能调用 Date 方法 | JSON.parse 后是字符串 | 手动用 `new Date(value)` 恢复。 |
| `obj.hasOwnProperty is not a function` | null-prototype 对象 | 用 `Object.hasOwn(obj, key)`。 |
| setter 赋值结果不是 setter return | setter 返回值被忽略 | 不依赖 setter return。 |

---

## 14. 官方文档链接

| 主题 | 链接 |
|---|---|
| Working with objects | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects |
| Object | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object |
| Enumerability and ownership | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties |
| Inheritance and prototype chain | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain |
| Object initializer | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer |
| Spread syntax | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax |
| Object.assign | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign |
| Object.keys | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys |
| Object.entries | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries |
| get | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get |
| set | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set |
| JSON.stringify | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify |
| JSON.parse | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse |

---

## 15. 最终压缩模型

```txt
create object
  -> choose prototype
  -> define own properties

read property
  -> own first
  -> prototype chain next

write property
  -> own update or own creation when allowed
  -> inherited setter can intercept

test property
  -> choose own-only or own-plus-inherited API

enumerate property
  -> choose API by ownership, enumerability, string key, symbol key

copy object
  -> enumerable own properties only
  -> shallow copy

serialize object
  -> JSON-safe enumerable own string-keyed data only
```
