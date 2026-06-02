# JavaScript 第 3 章“类型、值和变量”Cheatsheet v1

> 用途：这是第三章完成练习后的快速复习表，不替代学习指导文件。  
> 规则：正文使用中文；代码片段、变量名和代码注释不使用中文字符。

---

## 1. 核心类型总览

| 分类 | 类型 | `typeof` 结果 | 是否原始值 | 是否可修改 | 记忆句 |
|---|---|---|---|---|---|
| Undefined | `undefined` | `"undefined"` | 是 | 否 | 默认缺失值。 |
| Null | `null` | `"object"` | 是 | 否 | 明确空对象值；`typeof` 是历史坑。 |
| Boolean | `true` / `false` | `"boolean"` | 是 | 否 | 条件判断的最终结果。 |
| Number | `1`, `0.1`, `NaN`, `Infinity` | `"number"` | 是 | 否 | 双精度浮点数。 |
| BigInt | `1n` | `"bigint"` | 是 | 否 | 任意精度整数。 |
| String | `"text"` | `"string"` | 是 | 否 | 不可修改文本序列。 |
| Symbol | `Symbol("id")` | `"symbol"` | 是 | 否 | 唯一值。 |
| Object | `{}`, `[]`, function | `"object"` 或 `"function"` | 否 | 是 | 属性集合，通过引用访问。 |

---

## 2. `typeof` 结果速查

| 表达式 | 输出 | 说明 |
|---|---|---|
| `typeof undefined` | `"undefined"` | 未定义值。 |
| `typeof null` | `"object"` | 历史遗留，不代表 null 是对象。 |
| `typeof true` | `"boolean"` | 布尔值。 |
| `typeof 123` | `"number"` | 常规数值。 |
| `typeof NaN` | `"number"` | NaN 仍属于 number 类型。 |
| `typeof 123n` | `"bigint"` | BigInt。 |
| `typeof "abc"` | `"string"` | 字符串。 |
| `typeof Symbol("x")` | `"symbol"` | Symbol。 |
| `typeof {}` | `"object"` | 普通对象。 |
| `typeof []` | `"object"` | 数组也是对象。 |
| `typeof function () {}` | `"function"` | 函数对象的特殊返回值。 |

### 关键记忆句

```txt
typeof is useful, but typeof null is the classic exception.
```

---

## 3. Falsy 值完整表

| 值 | 类型 | `Boolean(value)` |
|---|---|---|
| `false` | boolean | `false` |
| `0` | number | `false` |
| `-0` | number | `false` |
| `0n` | bigint | `false` |
| `""` | string | `false` |
| `null` | null | `false` |
| `undefined` | undefined | `false` |
| `NaN` | number | `false` |

除上表外，其他值通常都是 truthy，包括：

```js
// Goal:
// Show truthy object values.

console.log(Boolean([]));
console.log(Boolean({}));
console.log(Boolean("false"));
```

### 关键记忆句

```txt
Falsy is not the same as missing.
```

---

## 4. Number 速查

| API / 属性 | 所属对象 | 签名 | 返回值 | 常见坑 |
|---|---|---|---|---|
| `Number()` | `Number` | `Number(value)` | number | 失败返回 `NaN`。 |
| `Number.isNaN()` | `Number` | `Number.isNaN(value)` | boolean | 不会先转换参数。 |
| `Number.isFinite()` | `Number` | `Number.isFinite(value)` | boolean | 只接受真正 finite number。 |
| `Number.isInteger()` | `Number` | `Number.isInteger(value)` | boolean | `1.0` 也是整数。 |
| `Number.isSafeInteger()` | `Number` | `Number.isSafeInteger(value)` | boolean | 检查整数精度安全。 |
| `Number.MAX_SAFE_INTEGER` | `Number` | property | number | `2 ** 53 - 1`。 |
| `Number.MIN_SAFE_INTEGER` | `Number` | property | number | `-(2 ** 53 - 1)`。 |
| `Number.EPSILON` | `Number` | property | number | 浮点误差比较参考。 |

### 特殊值

| 值 | 类型 | 说明 |
|---|---|---|
| `NaN` | number | Not a Number，不等于自身。 |
| `Infinity` | number | 正无穷。 |
| `-Infinity` | number | 负无穷。 |
| `-0` | number | 大多数场景等同于 `0`，但 `Object.is(0, -0)` 为 false。 |

### 关键记忆句

```txt
NaN is a number value, but NaN is not equal to itself.
```

---

## 5. BigInt 速查

| 语法 / API | 签名 | 返回值 | 常见坑 |
|---|---|---|---|
| BigInt literal | `123n` | bigint | 不能写小数。 |
| `BigInt()` | `BigInt(value)` | bigint | 小数、非法字符串会抛错。 |

### 对比

| 场景 | 推荐类型 |
|---|---|
| 普通价格、评分、分页 | number |
| 超大整数计算 | bigint |
| 超大业务 ID 展示和传输 | string |
| JSON 中传输 BigInt | string 或自定义序列化 |

### 关键记忆句

```txt
BigInt is for integer precision, not decimal math.
```

---

## 6. String 速查

| API / 属性 | 所属对象 | 签名 | 返回值 | 是否修改原值 |
|---|---|---|---|---|
| `String()` | `String` | `String(value)` | string | 否 |
| `length` | string wrapper | `text.length` | number | 否 |
| index access | string wrapper | `text[index]` | string 或 undefined | 否 |
| `includes()` | `String.prototype` | `text.includes(searchString)` | boolean | 否 |
| `startsWith()` | `String.prototype` | `text.startsWith(searchString)` | boolean | 否 |
| `endsWith()` | `String.prototype` | `text.endsWith(searchString)` | boolean | 否 |
| `indexOf()` | `String.prototype` | `text.indexOf(searchString)` | number | 否 |
| `slice()` | `String.prototype` | `text.slice(start, end)` | string | 否 |
| `trim()` | `String.prototype` | `text.trim()` | string | 否 |
| `toLowerCase()` | `String.prototype` | `text.toLowerCase()` | string | 否 |
| `toUpperCase()` | `String.prototype` | `text.toUpperCase()` | string | 否 |

### 关键记忆句

```txt
String methods return new strings because strings are immutable.
```

---

## 7. Boolean 与默认值

| 写法 | 判断规则 | 常见坑 |
|---|---|---|
| `Boolean(value)` | ToBoolean | `Boolean("false")` 是 true。 |
| `!!value` | ToBoolean | 简短但语义不如 `Boolean(value)` 明确。 |
| `value || fallback` | falsy 时用 fallback | 会覆盖 `0`、`""`、`false`。 |
| `value ?? fallback` | null 或 undefined 时用 fallback | 保留合法 falsy 值。 |

### 对比

```js
// Goal:
// Compare || and ??.

console.log(0 || 10);
console.log(0 ?? 10);
console.log("" || "fallback");
console.log("" ?? "fallback");
```

### 关键记忆句

```txt
Use ?? when zero, empty string, or false are valid values.
```

---

## 8. null vs undefined

| 值 | 常见来源 | 推荐语义 |
|---|---|---|
| `undefined` | 变量未初始化、不存在属性、函数无返回值 | 默认缺失。 |
| `null` | API、数据库、手动赋值 | 明确为空。 |

| 判断 | 含义 |
|---|---|
| `value === undefined` | 只判断 undefined。 |
| `value === null` | 只判断 null。 |
| `value == null` | 同时判断 null 和 undefined。 |
| `value ?? fallback` | nullish 默认值。 |

### 关键记忆句

```txt
Use == null intentionally when you want to catch both null and undefined.
```

---

## 9. Symbol 速查

| API / 属性 | 所属对象 | 签名 | 返回值 | 说明 |
|---|---|---|---|---|
| `Symbol()` | `Symbol` | `Symbol(description)` | symbol | 每次创建唯一值。 |
| `Symbol.for()` | `Symbol` | `Symbol.for(key)` | symbol | 使用全局注册表。 |
| `Symbol.keyFor()` | `Symbol` | `Symbol.keyFor(symbol)` | string 或 undefined | 查询全局注册表 key。 |
| `Symbol.toPrimitive` | `Symbol` | well-known symbol | symbol | 自定义对象转原始值。 |
| `Symbol.iterator` | `Symbol` | well-known symbol | symbol | 定义可迭代协议。 |

### 关键记忆句

```txt
Symbol("x") !== Symbol("x") because description is not identity.
```

---

## 10. 对象引用与 const

| 写法 | 发生了什么 |
|---|---|
| `let count = 1` | 绑定指向 number 原始值。 |
| `let copy = count` | 复制原始值。 |
| `const cart = { total: 1 }` | 绑定指向对象引用。 |
| `const sameCart = cart` | 复制对象引用。 |
| `sameCart.total = 2` | 修改同一个对象。 |
| `cart = { total: 3 }` | 如果 cart 是 const，会报错。 |

### 关键记忆句

```txt
const protects the binding, not the object.
```

---

## 11. 显式转换 API

| API | 签名 | 返回值 | 失败行为 |
|---|---|---|---|
| `Number()` | `Number(value)` | number | 失败返回 `NaN`。 |
| `String()` | `String(value)` | string | 大多数值可转；Symbol 必须显式转。 |
| `Boolean()` | `Boolean(value)` | boolean | 按 truthiness 转。 |
| `BigInt()` | `BigInt(value)` | bigint | 非整数语义会抛错。 |
| `parseInt()` | `parseInt(string, radix)` | number | 开头无法解析返回 `NaN`。 |
| `parseFloat()` | `parseFloat(string)` | number | 开头无法解析返回 `NaN`。 |

### 同名 / 相似对比

| 写法 | 差异 |
|---|---|
| `Number("42px")` | 返回 `NaN`。 |
| `parseInt("42px", 10)` | 返回 `42`。 |
| `Number("")` | 返回 `0`。 |
| `parseInt("", 10)` | 返回 `NaN`。 |
| `Boolean("false")` | 返回 `true`。 |
| `value === "true"` | 明确解析字符串布尔值。 |

### 关键记忆句

```txt
Conversion is not validation.
```

---

## 12. 隐式转换常见结果

| 表达式 | 结果 | 机制 |
|---|---|---|
| `"10" + 2` | `"102"` | `+` 遇到 string 执行拼接。 |
| `"10" - 2` | `8` | `-` 执行数值转换。 |
| `[] + []` | `""` | 数组转字符串后拼接。 |
| `[] == false` | `true` | 宽松相等触发转换。 |
| `null == undefined` | `true` | 宽松相等特殊规则。 |
| `null === undefined` | `false` | 严格相等不转换。 |

### 对象到原始值顺序

| hint | 常见触发 | 默认倾向 |
|---|---|---|
| `"string"` | 模板字面量、属性键 | 倾向字符串。 |
| `"number"` | 一元 `+`、数值比较 | 倾向数值。 |
| `"default"` | `+`、`==` | 取决于对象类型。 |

相关方法：

```txt
object[Symbol.toPrimitive](hint)
object.valueOf()
object.toString()
```

### 关键记忆句

```txt
Implicit conversion follows rules, not intuition.
```

---

## 13. 相等比较

| 写法 | 是否转换类型 | 何时使用 |
|---|---|---|
| `a === b` | 否 | 默认使用。 |
| `a !== b` | 否 | 默认使用。 |
| `a == b` | 是 | 只在明确需要 nullish 简写时使用。 |
| `a != b` | 是 | 避免。 |
| `Object.is(a, b)` | 否 | 处理 `NaN`、`0`、`-0` 特殊语义。 |

### 特殊对比

| 表达式 | 结果 |
|---|---|
| `NaN === NaN` | `false` |
| `Object.is(NaN, NaN)` | `true` |
| `0 === -0` | `true` |
| `Object.is(0, -0)` | `false` |
| `{ id: 1 } === { id: 1 }` | `false` |

### 关键记忆句

```txt
Objects are equal by reference, not by matching properties.
```

---

## 14. 变量声明速查

| 声明 | 作用域 | 可重新赋值 | 是否必须初始化 | 声明前访问 | 建议 |
|---|---|---|---|---|---|
| `const` | block | 否 | 是 | ReferenceError | 默认优先。 |
| `let` | block | 是 | 否 | ReferenceError | 需要重新赋值时用。 |
| `var` | function/global | 是 | 否 | `undefined` | 避免新代码使用。 |

### 关键记忆句

```txt
Variables are bindings, not boxes with permanent types.
```

---

## 15. 常见错误快速定位

| 现象 | 原因 | 修正 |
|---|---|---|
| `Number("abc")` 得到 `NaN` | 转换失败不抛错 | 用 `Number.isNaN()` 检查。 |
| `Boolean("false")` 是 true | 非空字符串 truthy | 明确比较字符串内容。 |
| `0 || 10` 得到 10 | `||` 看 falsy | 用 `??`。 |
| `0.1 + 0.2` 不等于 `0.3` | 浮点误差 | 用整数分或误差比较。 |
| `10n + 1` 报错 | BigInt 和 number 混用 | 统一类型。 |
| `typeof null` 是 object | 历史遗留 | 单独判断 null。 |
| 两个对象内容一样但不相等 | 比较引用 | 比较属性值。 |
| `const obj` 还能改属性 | const 保护绑定 | 需要不可变时创建新对象。 |
| `let` 声明前访问报错 | temporal dead zone | 声明后访问。 |

---

## 16. MDN 官方文档链接

- [JavaScript data types and data structures - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
- [Primitive - MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
- [Number - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [Number.MAX_SAFE_INTEGER - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)
- [BigInt - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- [String - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Boolean - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- [Falsy - MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
- [Object - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Object.prototype.toString() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
- [Symbol.toPrimitive - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)
- [Type coercion - MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)
- [`let` - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [`const` - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [`var` - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)

---

## 17. 最终压缩记忆模型

```txt
Value has type.
Variable has binding.
Primitive is immutable.
Object is mutable through reference.
const protects binding.
Number is floating point.
BigInt is integer precision.
String methods return new strings.
Falsy is not missing.
Conversion is not validation.
Use === by default.
Normalize external input explicitly.
```
