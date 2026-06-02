# JavaScript 第 4 章“表达式与操作符”Cheatsheet v1

> 用途：这是第四章完成练习后的快速复习表，不替代学习指导文件。  
> 规则：正文使用中文；代码片段、变量名和代码注释不使用中文字符。

---

## 1. 核心记忆句

```txt
Every JavaScript expression has a value, a timing, and sometimes a side effect.
```

```txt
Do not ask only what the operator looks like.
Ask what values it receives, whether it converts them, and whether it short-circuits.
```

---

## 2. 表达式类型速查

| 表达式 | 语法 | 求值结果 | 副作用 | 常见坑 |
|---|---|---|---|---|
| 主表达式 | `42`, `"text"`, `true`, `null`, `name`, `this` | 直接值或查找结果 | 通常无 | 未声明标识符会抛 `ReferenceError`。 |
| 数组初始化 | `[a, b, c]` | 新数组 | 子表达式可能有 | 每次求值都是新数组。 |
| 对象初始化 | `{ key: value }` | 新对象 | 子表达式可能有 | `{} !== {}`。 |
| 函数表达式 | `function () {}` / `() => {}` | 函数对象 | 创建时通常无 | 不调用就不执行。 |
| 属性访问 | `obj.key`, `obj[key]` | 属性值 | getter 可能有 | `null.key` 抛 `TypeError`。 |
| 调用表达式 | `fn(args)` | 返回值 | 通常有 | `fn` 与 `fn()` 不同。 |
| 方法调用 | `obj.method()` | 返回值 | 通常有 | `this` 来自调用形式。 |
| 对象创建 | `new Ctor(args)` | 新对象 | 构造函数可能有 | 忘记 `new`。 |
| 赋值表达式 | `target = value` | 写入值 | 有 | 条件中误写赋值。 |

---

## 3. 操作符速查表

| 操作符 | 名称 | 返回值 | 是否短路 | 关键规则 |
|---|---|---|---|---|
| `+` | 加法 / 拼接 | Number / String / BigInt | 否 | 有字符串时可能拼接。 |
| `-` | 减法 | Number / BigInt | 否 | 通常触发数值转换。 |
| `*` | 乘法 | Number / BigInt | 否 | 非数值可能得到 `NaN`。 |
| `/` | 除法 | Number | 否 | 除以零不是异常。 |
| `%` | 余数 | Number / BigInt | 否 | 不是严格数学 modulo。 |
| `**` | 取幂 | Number / BigInt | 否 | `(-2) ** 2` 要加括号。 |
| `++` | 自增 | Number / BigInt | 否 | 后置返回旧值，前置返回新值。 |
| `--` | 自减 | Number / BigInt | 否 | 会写回引用。 |
| `===` | 严格相等 | Boolean | 否 | 不做类型转换。 |
| `==` | 宽松相等 | Boolean | 否 | 会做复杂类型转换，少用。 |
| `<` | 小于 | Boolean | 否 | 字符串可能按字典序比较。 |
| `in` | 属性存在性 | Boolean | 否 | 查自有属性和原型链属性。 |
| `instanceof` | 原型链检测 | Boolean | 否 | 检查构造函数原型是否在对象原型链上。 |
| `!` | 逻辑非 | Boolean | 否 | 先转 Boolean。 |
| `&&` | 逻辑与 | 某个操作数 | 是 | 左侧 falsy 直接返回左侧。 |
| `||` | 逻辑或 | 某个操作数 | 是 | 左侧 truthy 直接返回左侧。 |
| `??` | 空值合并 | 某个操作数 | 是 | 只把 `null` / `undefined` 当缺失。 |
| `?:` | 条件操作符 | 分支值 | 是 | 只求值一个分支。 |
| `typeof` | 类型检查 | String | 否 | `typeof null` 是 `"object"`。 |
| `delete` | 删除属性 | Boolean | 否 | 主要用于对象属性。 |
| `void` | 丢弃表达式值 | `undefined` | 否 | 内部表达式仍执行。 |
| `,` | 逗号操作符 | 最后一个表达式值 | 否 | 从左到右求值。 |
| `?.` | 可选链 | 属性值或 `undefined` | 是 | 只对 `null` / `undefined` 短路。 |
| `await` | 等待 Promise | resolved value | 是 | 只能在允许的 async 上下文中使用。 |

---

## 4. 赋值操作符速查

| 操作符 | 模型 | 返回值 | 常见坑 |
|---|---|---|---|
| `=` | 写入右侧值 | 写入值 | `if (x = y)` 通常是误写。 |
| `+=` | 读旧值，加或拼接，写回 | 新值 | 字符串拼接。 |
| `-=` | 读旧值，减，写回 | 新值 | 隐式转换。 |
| `*=` | 读旧值，乘，写回 | 新值 | `NaN` 传播。 |
| `/=` | 读旧值，除，写回 | 新值 | `Infinity`。 |
| `%=` | 读旧值，求余，写回 | 新值 | 负数余数。 |
| `**=` | 读旧值，取幂，写回 | 新值 | 可读性差时加括号。 |
| `&&=` | 左侧 truthy 时写回 | 最终左侧值 | falsy 时不执行右侧。 |
| `||=` | 左侧 falsy 时写回 | 最终左侧值 | 会覆盖 `0` 和 `""`。 |
| `??=` | 左侧 nullish 时写回 | 最终左侧值 | 保留 `0` 和 `""`。 |

---

## 5. 最容易混的对比

### `handler` vs `handler()`

| 写法 | 含义 |
|---|---|
| `handler` | 函数值本身。 |
| `handler()` | 立刻调用函数，并得到返回值。 |

```js
// Goal:
// Compare a function reference and a function call.

function reportClick() {
  return "clicked";
}

const referenceValue = reportClick;
const callValue = reportClick();

console.log(typeof referenceValue);
console.log(callValue);
```

### `obj.key` vs `obj[key]`

| 写法 | 属性名来源 |
|---|---|
| `obj.key` | 固定属性名 `key`。 |
| `obj[key]` | 先求值变量 `key`，再把结果当属性名。 |

```js
// Goal:
// Compare dot access and bracket access.

const fieldName = "price";
const productRecord = { price: 99 };

console.log(productRecord.price);
console.log(productRecord[fieldName]);
```

### `||` vs `??`

| 左侧值 | `value || "fallback"` | `value ?? "fallback"` |
|---|---|---|
| `0` | fallback | `0` |
| `""` | fallback | `""` |
| `false` | fallback | `false` |
| `null` | fallback | fallback |
| `undefined` | fallback | fallback |

```js
// Goal:
// Preserve valid falsy values with nullish coalescing.

const pageIndex = 0;

console.log(pageIndex || 1);
console.log(pageIndex ?? 1);
```

### `in` vs `Object.hasOwn()`

| 写法 | 检查范围 |
|---|---|
| `"key" in object` | 自有属性 + 原型链属性。 |
| `Object.hasOwn(object, "key")` | 只检查自有属性。 |

```js
// Goal:
// Compare property existence checks.

const productRecord = { title: "Chair" };

console.log("title" in productRecord);
console.log("toString" in productRecord);
console.log(Object.hasOwn(productRecord, "toString"));
```

---

## 6. 常见错误速查

| 错误写法 | 错误原因 | 改法 |
|---|---|---|
| `price + inputValue` | `inputValue` 是字符串时会拼接 | `price + Number(inputValue)` |
| `count || 10` | `0` 会被覆盖 | `count ?? 10` |
| `user.name` | `user` 可能是 `null` | `user?.name` 后再处理缺失 |
| `if (ready = true)` | 写成赋值 | `if (ready === true)` |
| `methodReference()` | 方法拆出后丢 `this` | `object.method()` 或绑定 |
| `"x" in object` 判断自有属性 | `in` 会查原型链 | `Object.hasOwn(object, "x")` |
| `eval(input)` | 执行不可信代码 | 映射表、解析器、JSON.parse |
| `a ?? b || c` | 语法不允许直接混写 | `(a ?? b) || c` |

---

## 7. 优先级记忆规则

不要死背完整表，先记这些高频规则：

```txt
member access and call bind very tightly:
  obj.method()[index]

unary before arithmetic:
  !value, typeof value

multiplication before addition:
  a + b * c

comparison before logical:
  count > 0 && enabled

&& before ||:
  a || b && c

assignment is low precedence and right-associative:
  a = b = c

comma is very low precedence:
  a, b, c
```

工程建议：只要读者需要想优先级，就加括号。

---

## 8. 调试判断表

| 现象 | 阶段 | 例子 |
|---|---|---|
| 文件完全跑不起来 | 语法解析阶段 | `const 1x = 1` |
| 跑到某行崩溃 | 运行时阶段 | `null.name` |
| 代码运行但值错 | 业务逻辑阶段 | `"8" + 2` 得到 `"82"` |
| IDE 标黄但可运行 | 静态检查阶段 | `if (x = y)` |

---

## 9. 官方文档链接

- [MDN JavaScript Guide: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
- [MDN JavaScript Reference: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)
- [MDN Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)
- [MDN Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [MDN Nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
- [MDN Function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)
- [MDN Conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator)
- [MDN Comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator)
- [MDN void operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void)
- [MDN delete operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)
- [MDN typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- [MDN eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)


---

## 10. 最终记忆模型

```txt
Expression:
  evaluates to a value.

Operator:
  receives operand values and applies exact rules.

Short-circuit operator:
  may skip evaluating the right side.

Assignment:
  writes a value and evaluates to the written value.

Safe frontend code:
  explicit conversion, strict equality, nullish defaults, clear grouping.
```
