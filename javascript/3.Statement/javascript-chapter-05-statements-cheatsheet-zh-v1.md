# JavaScript 第 5 章“语句”Cheatsheet v1

> 用途：这是完成第 5 章练习后的快速复习表，不替代学习指导文件。  
> 规则：正文中文；代码和代码注释不使用中文字符。

---

## 1. 核心语法总览

| 语法 | 类别 | 作用 | 返回值 | 常见坑 |
|---|---|---|---|---|
| `expression;` | 表达式语句 | 执行表达式的副作用 | 表达式值被丢弃 | 纯表达式单独写没有意义 |
| `{ statementList }` | 块语句 | 把多条语句组合成一条 | 无 | 块本身不加分号 |
| `;` | 空语句 | 什么也不做 | 无 | `if (...);` 高危 |
| `if (condition) statement` | 条件语句 | 条件为真执行 | 无 | 条件按 truthiness 判断 |
| `if (...) ... else ...` | 条件语句 | 二选一分支 | 无 | `else` 绑定最近的 `if` |
| `switch (value)` | 条件语句 | 多分支入口匹配 | 无 | 漏 `break` 会继续执行 |
| `while (condition)` | 循环语句 | 先判断再循环 | 无 | 忘记更新条件会无限循环 |
| `do ... while (condition)` | 循环语句 | 先执行一次再判断 | 无 | 至少执行一次 |
| `for (init; test; update)` | 循环语句 | 计数循环 | 无 | off-by-one |
| `for (value of iterable)` | 迭代语句 | 遍历值 | 无 | 普通对象默认不可迭代 |
| `for (key in object)` | 枚举语句 | 遍历可枚举属性名 | 无 | 包含继承属性，值不是属性值 |
| `label: statement` | 标签语句 | 给语句命名 | 无 | 滥用降低可读性 |
| `break` | 跳转语句 | 退出循环或 switch | 无 | 不能跨函数边界 |
| `continue` | 跳转语句 | 进入下一轮循环 | 无 | 只能用于循环 |
| `return value;` | 跳转语句 | 结束函数并返回值 | 函数调用得到该值 | 换行触发 ASI |
| `throw value;` | 跳转语句 | 抛出异常 | 不正常返回 | 不推荐抛字符串 |
| `try / catch / finally` | 异常处理 | 捕获错误并清理 | 无 | `finally return` 会覆盖结果 |
| `with (object)` | 其他语句 | 扩展作用域链 | 无 | 严格模式禁止，现代代码避免 |
| `debugger;` | 调试语句 | 调试器暂停点 | 无 | 提交前通常移除 |
| `"use strict";` | 指令 | 启用严格模式 | 无 | 必须在开头 |
| `let` | 声明 | 块作用域可重赋值绑定 | 无 | 暂时性死区 |
| `const` | 声明 | 块作用域不可重赋值绑定 | 无 | 对象属性仍可变 |
| `var` | 声明 | 函数作用域绑定 | 无 | 提升、非块作用域 |
| `function` | 声明 | 创建函数绑定 | 无 | 和函数表达式不同 |
| `class` | 声明 | 创建类绑定 | 无 | 使用前处于 TDZ |
| `import` / `export` | 模块声明 | 模块边界 | 无 | 只能模块顶层 |

---

## 2. 同名 / 相似概念对照

| 对比 | A | B | 关键区别 |
|---|---|---|---|
| 语句 vs 表达式 | statement | expression | 语句执行动作；表达式产生值。 |
| 块 vs 对象字面量 | `{ ... }` | `({ ... })` | 位置不同，含义不同。 |
| 空语句 vs 空块 | `;` | `{}` | 一个是无动作语句，一个是无内容块。 |
| `if` vs 三元表达式 | `if (...) ...` | `condition ? a : b` | `if` 是语句；三元是表达式。 |
| `switch` vs `if...else` | 值匹配入口 | 条件链 | `switch` 匹配后可能 fallthrough。 |
| `while` vs `do...while` | 先判断 | 先执行 | `do...while` 至少执行一次。 |
| `for` vs `for...of` | 控制索引生命周期 | 读取 iterable 值 | 一个管理计数，一个消费迭代器。 |
| `for...of` vs `for...in` | 值迭代 | 属性名枚举 | 数组值用 `for...of`，对象属性名可用 `for...in`。 |
| `break` vs `continue` | 退出循环 | 跳到下一轮 | 跳转目标不同。 |
| `return` vs `throw` | 正常结束函数 | 异常结束流程 | 调用者处理方式不同。 |
| `catch` vs `finally` | 处理错误 | 保证清理 | `finally` 不负责业务恢复。 |
| `let` vs `const` | 可重赋值 | 不可重赋值 | 都是块作用域。 |
| `var` vs `let` | 函数作用域 | 块作用域 | `var` 会提升并初始化为 `undefined`。 |

---

## 3. 参数签名 / 语法签名速查

```txt
if (expression) statement
if (expression) statement else statement

switch (expression) {
  case expression:
    statementList
    break;
  default:
    statementList
}

while (expression) statement

do statement while (expression);

for (initialization; condition; update) statement

for (const value of iterable) statement

for (const propertyName in object) statement

labelName: statement

break;
break labelName;

continue;
continue labelName;

return expression;

throw expression;

try {
  statementList
} catch (binding) {
  statementList
} finally {
  statementList
}

with (object) statement

debugger;

let name = value;
const name = value;
var name = value;
function name(parameters) { statementList }
class Name { classBody }
import binding from "specifier";
export { name };
```

---

## 4. options object 固定属性名

第 5 章核心语句本身没有 options object。涉及对象配置的是你在语句中调用的 API，不属于本章语句语法。

---

## 5. 会修改状态的方法或语句

| 写法 | 修改内容 | 注意 |
|---|---|---|
| `name = value;` | 变量绑定 | 表达式语句，副作用是赋值。 |
| `counter++;` | 变量绑定 | 后置递增先产生旧值，再递增。 |
| `delete object.key;` | 对象属性集合 | 删除属性，不删除变量。 |
| `array.push(value);` | 数组对象 | 方法调用表达式语句。 |
| `throw new Error(...)` | 控制流 | 不修改数据，但改变执行路径。 |
| `return value;` | 控制流 | 结束当前函数。 |
| `break;` | 控制流 | 退出循环或 switch。 |
| `continue;` | 控制流 | 进入下一轮循环。 |

---

## 6. 不会立即输出或不会立即执行的方法 / 语句

| 写法 | 说明 |
|---|---|
| `Math.max(1, 2);` | 计算结果被丢弃，不输出。 |
| `{ 1 + 2; }` | 块语句执行内部语句，但块本身不产生可用值。 |
| `if (false) statement` | `statement` 不执行。 |
| `while (false) statement` | 循环体一次都不执行。 |
| `do statement while (false)` | 循环体执行一次。 |
| `debugger;` | 只有调试器打开时才暂停。 |

---

## 7. 常见 IDE 警告

| 警告 | 类型 | 含义 | 处理方式 |
|---|---|---|---|
| Unreachable code | 静态检查警告 | `return` / `throw` / `break` 后面的语句不可达。 | 删除或调整控制流。 |
| Unused expression | 静态检查警告 | 纯表达式结果被丢弃。 | 保存返回值或删除该行。 |
| Unexpected empty statement | 静态检查警告 | 出现单独分号。 | 删除或加英文注释说明。 |
| Missing break in switch | 静态检查警告 | 可能发生 fallthrough。 | 加 `break` 或明确注释。 |
| Constant condition | 静态检查警告 | 条件恒真或恒假。 | 检查逻辑。 |
| No debugger | Lint 警告 | 代码中存在 `debugger`。 | 提交前删除。 |
| No with | Lint 警告 / 语法错误 | 使用 `with`。 | 改成显式属性访问。 |
| No var | Lint 建议 | 使用 `var`。 | 改用 `let` / `const`。 |

---

## 8. 最终记忆模型

```txt
statement
  -> action
  -> branch
  -> loop
  -> jump
  -> declaration
  -> exception handling

expression
  -> value

expression statement
  -> value is evaluated
  -> side effect is kept
  -> returned value is discarded
```

关键记忆句：

```txt
表达式回答“值是什么”；语句回答“程序下一步做什么”。
```

---

## 9. 官方文档链接

- [Statements and declarations - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)
- [Control flow and error handling - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [Loops and iteration - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [if...else - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
- [switch - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- [while - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
- [do...while - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)
- [for - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
- [for...of - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
- [for...in - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
- [break - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)
- [continue - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)
- [return - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)
- [throw - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)
- [try...catch - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- [debugger - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger)
- [let - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [const - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [var - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
