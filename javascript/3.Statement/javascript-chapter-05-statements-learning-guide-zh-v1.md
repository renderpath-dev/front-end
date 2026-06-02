# JavaScript 第 5 章“语句”学习指导文件 v1

> 定位：这是《JavaScript 权威指南》第 5 章“语句”的学习指导文件，不是最终学习笔记。
> 目标：你按照这份文件创建练习目录、写 `.js` 文件、运行 Node、观察输出或错误，再把每节整理成自己的正式笔记。
> 参考范围：《JavaScript 权威指南》第 5 章 5.1 到 5.8，MDN 的 Statements and declarations、Control flow and error handling、Loops and iteration，以及相关语句参考页。
> 语言规则：正文统一中文；必要技术术语保留英文括号。
> 代码规则：代码、变量名、函数名、类名、文件名、目录名、代码注释不使用中文字符。
> 学习原则：第五章不要学成“语句语法表”。你要建立的是控制流模型：哪条语句先执行，什么时候进入分支，什么时候重复，什么时候跳出，什么时候声明绑定。

---

## 官方文档对应关系

| 本文件主题 | 官方文档 |
|---|---|
| 语句和声明总览 | MDN Statements and declarations |
| 控制流与错误处理 | MDN Control flow and error handling |
| 循环和迭代 | MDN Loops and iteration |
| if / else、switch、while、for、for...of、for...in | MDN statement reference pages |
| break、continue、return、throw、try...catch、debugger | MDN jump and exception statement reference pages |
| let、const、var、function、class、import、export | MDN declaration reference pages |

---

## 目录

1. [文件定位](#0-文件定位)
2. [本章学习目标](#1-本章学习目标)
3. [本章学习顺序](#2-本章学习顺序)
4. [本章核心术语表](#3-本章核心术语表)
5. [本章底层模型](#4-本章底层模型)
6. [推荐目录结构](#5-推荐目录结构)
7. [运行方式](#6-运行方式)
8. [分节训练内容](#7-分节训练内容)
9. [本章 API / 语法完整索引](#8-本章-api--语法完整索引)
10. [本章常见错误总表](#9-本章常见错误总表)
11. [最终小项目：Checkout Flow Controller](#10-最终小项目checkout-flow-controller)
12. [额外 cheatsheet](#11-额外-cheatsheet)
13. [最终文件清单](#12-最终文件清单)
14. [最终学习笔记转换要求](#13-最终学习笔记转换要求)
15. [本章最终记忆模型](#14-本章最终记忆模型)
16. [官方文档阅读清单](#15-官方文档阅读清单)
17. [生成前自检清单](#16-生成前自检清单)

---

## 0. 文件定位

### 结论

第五章是 JavaScript 控制流（control flow）的核心训练章。第三章回答“值是什么”，第四章回答“表达式如何求值”，第五章回答“程序接下来执行哪条语句”。

你要学会回答：

```txt
Which statement runs next?
Does this statement branch, loop, jump, declare, or handle an exception?
```

### 你要完成的动作

1. 创建第五章目录。
2. 按推荐目录结构创建全部子目录。
3. 逐个写入 `.js` 文件。
4. 使用 Node 运行每个文件。
5. 记录正确输出、错误输出和异常类型。
6. 完成最终小项目。
7. 把本指导文件转换成自己的正式笔记。

## 1. 本章学习目标

### 结论

学完第五章，你必须能解释 expression statement、block statement、empty statement、if、switch、while、do...while、for、for...of、for...in、label、break、continue、return、throw、try/catch/finally、with、debugger、strict mode 以及各种 declaration 的运行机制。

### 技术意义

真实项目中的表单校验、权限判断、请求重试、列表遍历、错误处理、提前返回、资源清理和模块边界，全部依赖语句控制执行路径。

## 2. 本章学习顺序

```txt
statement execution model
  -> expression statements
  -> block and empty statements
  -> if / else
  -> switch
  -> while and do...while
  -> for
  -> for...of
  -> for...in
  -> break / continue / labels
  -> return / throw
  -> try / catch / finally
  -> with / debugger / strict mode
  -> declarations
  -> statement composition
  -> mini project
```

## 3. 本章核心术语表

| 中文术语 | English term | 解释 |
|---|---|---|
| 语句 | statement | JavaScript 中被执行的命令。 |
| 表达式语句 | expression statement | 把表达式作为语句执行，通常为了副作用。 |
| 副作用 | side effect | 改变绑定、对象、外部环境或调用产生影响的函数。 |
| 语句块 | block statement | 用 `{}` 包住的一组语句，整体作为一条语句。 |
| 空语句 | empty statement | 只包含一个分号，执行时什么也不做。 |
| 控制流 | control flow | 程序中语句被执行的顺序。 |
| 分支 | branch | 根据条件选择执行路径。 |
| 循环 | loop | 重复执行一条语句或一个语句块。 |
| 迭代 | iteration | 循环的一次执行过程。 |
| 跳转语句 | jump statement | 改变默认顺序执行位置的语句。 |
| 标签 | label | 给语句命名，供 break 或 continue 定位。 |
| 异常 | exception | 表示错误或意外状态的控制流信号。 |
| 异常传播 | exception propagation | 异常沿调用栈寻找处理器的过程。 |
| 声明 | declaration | 把名字引入作用域的语法。 |
| 作用域 | scope | 名字可以被访问的代码区域。 |
| 严格模式 | strict mode | 禁用部分旧特性并让错误更早暴露的执行模式。 |

## 4. 本章底层模型

### 结论

第五章可以压缩成这张模型：

```txt
source code
  -> statement list
  -> execute next statement
    -> expression statement: evaluate and keep side effect
    -> block statement: execute inner statement list
    -> conditional statement: choose branch
    -> loop statement: repeat body while condition allows
    -> jump statement: transfer control
    -> declaration: create binding in scope
    -> exception handling: catch or clean up abrupt completion
```

### 和当前学习主题的关系

React 组件函数、Node route handler、表单校验函数和构建脚本，本质上都是语句列表。你必须能判断下一步执行位置，而不是只看代码缩进。

## 5. 推荐目录结构

### 结论

第五章建议建立完整子目录结构。目录树里的每个 `.js` 文件都在第 7 节有对应代码块，最终文件清单也保持一致。

```txt
javascript/
  chapter-05-statements/
    javascript-chapter-05-statements-learning-guide-zh-v1.md
    javascript-chapter-05-statements-cheatsheet-zh-v1.md
    README.md

    00-statement-execution-model/
      statementExecutionPipeline.js
      statementExpressionDifference.js

    01-expression-statements/
      deleteStatementDemo.js
      ignoredPureExpressionMistake.js
      sideEffectStatementDemo.js

    02-block-empty-statements/
      accidentalEmptyStatementMistake.js
      blockStatementScopeDemo.js
      emptyStatementLoopDemo.js

    03-if-else-branching/
      danglingElseDemo.js
      ifElseTruthinessDemo.js
      missingBlockMistake.js

    04-switch-matching/
      missingBreakMistake.js
      switchFallthroughDemo.js
      switchStrictMatchingDemo.js

    05-while-do-while-loops/
      doWhileAtLeastOnceDemo.js
      infiniteLoopGuardMistake.js
      whileLoopStateDemo.js

    06-for-loop-mechanics/
      forLoopLifecycleDemo.js
      forLoopScopeDemo.js
      offByOneMistake.js

    07-for-of-iteration/
      forOfArrayStringDemo.js
      forOfIterableValueDemo.js
      forOfObjectMistake.js

    08-for-in-enumeration/
      forInArrayIndexMistake.js
      forInInheritedPropertyMistake.js
      forInOwnPropertyDemo.js

    09-label-break-continue/
      breakContinueDemo.js
      invalidBreakMistake.js
      labeledBreakDemo.js

    10-return-throw-control-transfer/
      returnLineBreakMistake.js
      returnValueDemo.js
      throwErrorDemo.js

    11-try-catch-finally/
      catchBindingScopeDemo.js
      finallyReturnMistake.js
      tryCatchFinallyDemo.js

    12-with-debugger-strict/
      debuggerStatementDemo.js
      strictWithMistake.js
      withStatementRiskDemo.js

    13-declarations/
      declarationHoistingDemo.js
      duplicateDeclarationMistake.js
      letConstBlockScopeDemo.js
      varLoopClosurePreview.js

    14-statement-composition/
      jsxStatementExpressionPreview.js
      statementCompositionDemo.js

    15-statements-mini-project/
      checkoutFlowController.js
      checkoutFlowControllerChecklist.md
      checkoutFlowControllerMistakes.js
```

## 6. 运行方式

### 环境要求

建议使用 Node.js 20 LTS 或更新版本。本章练习只依赖核心 JavaScript，不需要第三方包。

### 批量运行清单

```bash
cd javascript/chapter-05-statements
node 00-statement-execution-model/statementExecutionPipeline.js
node 00-statement-execution-model/statementExpressionDifference.js
node 01-expression-statements/sideEffectStatementDemo.js
node 01-expression-statements/ignoredPureExpressionMistake.js
node 01-expression-statements/deleteStatementDemo.js
node 02-block-empty-statements/blockStatementScopeDemo.js
node 02-block-empty-statements/emptyStatementLoopDemo.js
node 02-block-empty-statements/accidentalEmptyStatementMistake.js
node 03-if-else-branching/ifElseTruthinessDemo.js
node 03-if-else-branching/danglingElseDemo.js
node 03-if-else-branching/missingBlockMistake.js
node 04-switch-matching/switchStrictMatchingDemo.js
node 04-switch-matching/switchFallthroughDemo.js
node 04-switch-matching/missingBreakMistake.js
node 05-while-do-while-loops/whileLoopStateDemo.js
node 05-while-do-while-loops/doWhileAtLeastOnceDemo.js
node 05-while-do-while-loops/infiniteLoopGuardMistake.js
node 06-for-loop-mechanics/forLoopLifecycleDemo.js
node 06-for-loop-mechanics/forLoopScopeDemo.js
node 06-for-loop-mechanics/offByOneMistake.js
node 07-for-of-iteration/forOfArrayStringDemo.js
node 07-for-of-iteration/forOfIterableValueDemo.js
node 07-for-of-iteration/forOfObjectMistake.js
node 08-for-in-enumeration/forInOwnPropertyDemo.js
node 08-for-in-enumeration/forInInheritedPropertyMistake.js
node 08-for-in-enumeration/forInArrayIndexMistake.js
node 09-label-break-continue/breakContinueDemo.js
node 09-label-break-continue/labeledBreakDemo.js
node 09-label-break-continue/invalidBreakMistake.js
node 10-return-throw-control-transfer/returnValueDemo.js
node 10-return-throw-control-transfer/returnLineBreakMistake.js
node 10-return-throw-control-transfer/throwErrorDemo.js
node 11-try-catch-finally/tryCatchFinallyDemo.js
node 11-try-catch-finally/finallyReturnMistake.js
node 11-try-catch-finally/catchBindingScopeDemo.js
node 12-with-debugger-strict/debuggerStatementDemo.js
node 12-with-debugger-strict/withStatementRiskDemo.js
node 12-with-debugger-strict/strictWithMistake.js
node 13-declarations/declarationHoistingDemo.js
node 13-declarations/letConstBlockScopeDemo.js
node 13-declarations/varLoopClosurePreview.js
node 13-declarations/duplicateDeclarationMistake.js
node 14-statement-composition/statementCompositionDemo.js
node 14-statement-composition/jsxStatementExpressionPreview.js
node 15-statements-mini-project/checkoutFlowController.js
node 15-statements-mini-project/checkoutFlowControllerMistakes.js
```

### 错误示例说明

本文件把语法错误类示例写成可运行的检查文件，例如通过 `Function(...)` 捕获 `SyntaxError`。这样你既能观察错误类型，又能完整跑通本章所有练习。

## 7. 分节训练内容

### 00：语句执行模型

#### 结论

JavaScript 程序是一串按控制流执行的语句。默认从上到下执行，分支、循环、跳转和异常处理会改变下一条语句。

#### 技术意义

这一节训练 `statement execution model`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
statement;
{ statementList }
```

#### 文件结构

```txt
00-statement-execution-model/
  statementExecutionPipeline.js
  statementExpressionDifference.js
```

#### 示例代码

#### 文件名：`00-statement-execution-model/statementExecutionPipeline.js`

```js
// Goal:
// Verify that statements run in control-flow order.

const executionLog = [];

executionLog.push("start");

const shouldSkip = true;

if (shouldSkip) {
  executionLog.push("if branch");
} else {
  executionLog.push("else branch");
}

for (let stepIndex = 0; stepIndex < 3; stepIndex++) {
  executionLog.push(`loop:${stepIndex}`);
}

executionLog.push("end");

console.log(executionLog.join(" -> "));
```

#### 文件名：`00-statement-execution-model/statementExpressionDifference.js`

```js
// Goal:
// Compare expressions that produce values with statements that perform actions.

const expressionValue = 1 + 2;
let actionCount = 0;

actionCount += expressionValue;

if (actionCount > 0) {
  actionCount += 1;
}

console.log(expressionValue);
console.log(actionCount);
```

#### 运行方式

```bash
node 00-statement-execution-model/statementExecutionPipeline.js
node 00-statement-execution-model/statementExpressionDifference.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
statement execution model -> exact control-flow rule, not visual indentation
```

### 01：表达式语句

#### 结论

表达式语句的目的不是保留表达式结果，而是利用求值过程中的副作用。

#### 技术意义

这一节训练 `expression statement`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
assignmentExpression;
callExpression;
delete object.property;
```

#### 文件结构

```txt
01-expression-statements/
  deleteStatementDemo.js
  ignoredPureExpressionMistake.js
  sideEffectStatementDemo.js
```

#### 示例代码

#### 文件名：`01-expression-statements/deleteStatementDemo.js`

```js
// Goal:
// Verify delete as an expression statement with a side effect.

const sessionRecord = {
  userId: "u1",
  token: "secret-token",
};

const deleteResult = delete sessionRecord.token;

console.log(deleteResult);
console.log("token" in sessionRecord);
console.log(sessionRecord.userId);
```

#### 文件名：`01-expression-statements/ignoredPureExpressionMistake.js`

```js
// Goal:
// Show that a pure expression statement does not update state by itself.

let productPrice = 100;

productPrice * 0.9;

console.log(productPrice);

productPrice = productPrice * 0.9;

console.log(productPrice);
```

#### 文件名：`01-expression-statements/sideEffectStatementDemo.js`

```js
// Goal:
// Compare useful expression statements with ignored pure expressions.

let cartTotal = 40;
cartTotal = cartTotal + 8;
cartTotal++;

const customerProfile = {
  name: "Mira",
  temporaryToken: "token-123",
};

delete customerProfile.temporaryToken;

Math.max(10, 20);

console.log(cartTotal);
console.log(customerProfile);
```

#### 运行方式

```bash
node 01-expression-statements/deleteStatementDemo.js
node 01-expression-statements/ignoredPureExpressionMistake.js
node 01-expression-statements/sideEffectStatementDemo.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
expression statement -> exact control-flow rule, not visual indentation
```

### 02：复合语句与空语句

#### 结论

块语句把多条语句包装成一条语句；空语句是一条什么也不做的合法语句。

#### 技术意义

这一节训练 `block statement and empty statement`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
{ statementList }
;
```

#### 文件结构

```txt
02-block-empty-statements/
  accidentalEmptyStatementMistake.js
  blockStatementScopeDemo.js
  emptyStatementLoopDemo.js
```

#### 示例代码

#### 文件名：`02-block-empty-statements/accidentalEmptyStatementMistake.js`

```js
// Goal:
// Show how an accidental empty statement breaks an if statement.

const isAdmin = false;
const permissionLog = [];

if (isAdmin);
{
  permissionLog.push("dangerous action executed");
}

console.log(permissionLog);
```

#### 文件名：`02-block-empty-statements/blockStatementScopeDemo.js`

```js
// Goal:
// Verify that block statements create block scope for let and const.

const statusLabel = "outer";

{
  const statusLabel = "inner";
  let retryCount = 2;
  retryCount += 1;
  console.log(statusLabel);
  console.log(retryCount);
}

console.log(statusLabel);
```

#### 文件名：`02-block-empty-statements/emptyStatementLoopDemo.js`

```js
// Goal:
// Use an intentional empty statement in a compact loop.

let index = 0;

while (++index < 3);

console.log(index);
```

#### 运行方式

```bash
node 02-block-empty-statements/accidentalEmptyStatementMistake.js
node 02-block-empty-statements/blockStatementScopeDemo.js
node 02-block-empty-statements/emptyStatementLoopDemo.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
block statement and empty statement -> exact control-flow rule, not visual indentation
```

### 03：if / else 条件分支

#### 结论

if 先求值条件表达式，再按真值性选择分支；else 绑定最近的未匹配 if。

#### 技术意义

这一节训练 `if / else branching`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
if (expression) statement
if (expression) statement else statement
```

#### 文件结构

```txt
03-if-else-branching/
  danglingElseDemo.js
  ifElseTruthinessDemo.js
  missingBlockMistake.js
```

#### 示例代码

#### 文件名：`03-if-else-branching/danglingElseDemo.js`

```js
// Goal:
// Show that else binds to the nearest unmatched if.

const isSignedIn = true;
const hasPaymentMethod = false;
let message = "";

if (isSignedIn)
  if (hasPaymentMethod)
    message = "ready";
  else
    message = "add payment method";
else
  message = "sign in";

console.log(message);
```

#### 文件名：`03-if-else-branching/ifElseTruthinessDemo.js`

```js
// Goal:
// Verify truthiness and block usage in if statements.

const searchTerm = "";
const itemsInCart = 0;
const customer = { tier: "gold" };

if (searchTerm) {
  console.log("search active");
} else {
  console.log("search empty");
}

if (itemsInCart) {
  console.log("cart has items");
} else {
  console.log("cart empty");
}

if (customer) {
  console.log(customer.tier);
}
```

#### 文件名：`03-if-else-branching/missingBlockMistake.js`

```js
// Goal:
// Show why missing blocks can run a statement unconditionally.

const isValid = false;
let message = "start";

if (isValid)
  message = "valid";
message = "saved";

console.log(message);
```

#### 运行方式

```bash
node 03-if-else-branching/danglingElseDemo.js
node 03-if-else-branching/ifElseTruthinessDemo.js
node 03-if-else-branching/missingBlockMistake.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
if / else branching -> exact control-flow rule, not visual indentation
```

### 04：switch 多分支匹配

#### 结论

switch 先匹配入口，再顺序执行，直到 break、return、throw 或 switch 结束。

#### 技术意义

这一节训练 `switch matching`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
switch (expression) { case valueExpression: statementList }
```

#### 文件结构

```txt
04-switch-matching/
  missingBreakMistake.js
  switchFallthroughDemo.js
  switchStrictMatchingDemo.js
```

#### 示例代码

#### 文件名：`04-switch-matching/missingBreakMistake.js`

```js
// Goal:
// Show how missing break creates accidental fallthrough.

const orderStatus = "paid";
const actions = [];

switch (orderStatus) {
  case "paid":
    actions.push("capture receipt");
  case "cancelled":
    actions.push("notify customer");
    break;
  default:
    actions.push("manual review");
}

console.log(actions);
```

#### 文件名：`04-switch-matching/switchFallthroughDemo.js`

```js
// Goal:
// Use intentional fallthrough to share behavior.

const role = "admin";
const permissions = [];

switch (role) {
  case "admin":
    permissions.push("manage-users");
  case "editor":
    permissions.push("edit-content");
  case "viewer":
    permissions.push("view-content");
    break;
  default:
    permissions.push("no-access");
}

console.log(permissions);
```

#### 文件名：`04-switch-matching/switchStrictMatchingDemo.js`

```js
// Goal:
// Verify strict matching in switch.

const paymentStatus = "paid";
const nextActions = [];

switch (paymentStatus) {
  case "pending":
    nextActions.push("send reminder");
    break;
  case "paid":
    nextActions.push("prepare shipment");
    break;
  case "failed":
    nextActions.push("show retry button");
    break;
  default:
    nextActions.push("manual review");
}

console.log(nextActions);
```

#### 运行方式

```bash
node 04-switch-matching/missingBreakMistake.js
node 04-switch-matching/switchFallthroughDemo.js
node 04-switch-matching/switchStrictMatchingDemo.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
switch matching -> exact control-flow rule, not visual indentation
```

### 05：while 与 do...while 循环

#### 结论

while 先判断再执行；do...while 先执行一次再判断。

#### 技术意义

这一节训练 `while and do...while loops`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
while (expression) statement
do statement while (expression);
```

#### 文件结构

```txt
05-while-do-while-loops/
  doWhileAtLeastOnceDemo.js
  infiniteLoopGuardMistake.js
  whileLoopStateDemo.js
```

#### 示例代码

#### 文件名：`05-while-do-while-loops/doWhileAtLeastOnceDemo.js`

```js
// Goal:
// Verify that do...while executes at least once.

let promptCount = 0;

do {
  promptCount++;
} while (promptCount < 1);

console.log(promptCount);
```

#### 文件名：`05-while-do-while-loops/infiniteLoopGuardMistake.js`

```js
// Goal:
// Use a guard to prevent an accidental infinite loop.

let attempt = 0;
let isReady = false;

while (!isReady) {
  attempt++;

  if (attempt === 3) {
    isReady = true;
  }

  if (attempt > 10) {
    throw new Error("Loop guard triggered");
  }
}

console.log(attempt);
console.log(isReady);
```

#### 文件名：`05-while-do-while-loops/whileLoopStateDemo.js`

```js
// Goal:
// Verify while loop state updates.

let retryCount = 0;
const retryLog = [];

while (retryCount < 3) {
  retryLog.push(`retry:${retryCount}`);
  retryCount++;
}

console.log(retryLog);
```

#### 运行方式

```bash
node 05-while-do-while-loops/doWhileAtLeastOnceDemo.js
node 05-while-do-while-loops/infiniteLoopGuardMistake.js
node 05-while-do-while-loops/whileLoopStateDemo.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
while and do...while loops -> exact control-flow rule, not visual indentation
```

### 06：for 循环机制

#### 结论

for 头部集中写初始化、条件和更新，但执行顺序仍然是初始化、判断、循环体、更新。

#### 技术意义

这一节训练 `for loop mechanics`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
for (initialization; condition; update) statement
```

#### 文件结构

```txt
06-for-loop-mechanics/
  forLoopLifecycleDemo.js
  forLoopScopeDemo.js
  offByOneMistake.js
```

#### 示例代码

#### 文件名：`06-for-loop-mechanics/forLoopLifecycleDemo.js`

```js
// Goal:
// Verify for-loop lifecycle.

const productPrices = [12, 18, 25];
let subtotal = 0;

for (let priceIndex = 0; priceIndex < productPrices.length; priceIndex++) {
  const currentPrice = productPrices[priceIndex];
  subtotal += currentPrice;
}

console.log(subtotal);
```

#### 文件名：`06-for-loop-mechanics/forLoopScopeDemo.js`

```js
// Goal:
// Compare let loop scope with an outer binding.

let indexLabel = "outer";
const values = [];

for (let indexLabel = 0; indexLabel < 3; indexLabel++) {
  values.push(indexLabel);
}

console.log(values);
console.log(indexLabel);
```

#### 文件名：`06-for-loop-mechanics/offByOneMistake.js`

```js
// Goal:
// Show an off-by-one access using a guarded output.

const names = ["Ava", "Ben"];
const collected = [];

for (let index = 0; index <= names.length; index++) {
  collected.push(names[index]);
}

console.log(collected);
console.log(collected.includes(undefined));
```

#### 运行方式

```bash
node 06-for-loop-mechanics/forLoopLifecycleDemo.js
node 06-for-loop-mechanics/forLoopScopeDemo.js
node 06-for-loop-mechanics/offByOneMistake.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
for loop mechanics -> exact control-flow rule, not visual indentation
```

### 07：for...of 值迭代

#### 结论

for...of 读取 iterable 产出的值，不读取普通对象属性名。

#### 技术意义

这一节训练 `for...of iteration`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
for (const value of iterable) statement
```

#### 文件结构

```txt
07-for-of-iteration/
  forOfArrayStringDemo.js
  forOfIterableValueDemo.js
  forOfObjectMistake.js
```

#### 示例代码

#### 文件名：`07-for-of-iteration/forOfArrayStringDemo.js`

```js
// Goal:
// Verify that for...of reads iterable values.

const selectedTags = ["react", "node", "testing"];
const collectedTags = [];

for (const tag of selectedTags) {
  collectedTags.push(tag.toUpperCase());
}

const letters = [];
for (const character of "JS") {
  letters.push(character);
}

console.log(collectedTags);
console.log(letters);
```

#### 文件名：`07-for-of-iteration/forOfIterableValueDemo.js`

```js
// Goal:
// Verify for...of over Set values.

const uniqueRoles = new Set(["admin", "editor", "admin"]);
const roleList = [];

for (const role of uniqueRoles) {
  roleList.push(role);
}

console.log(roleList);
```

#### 文件名：`07-for-of-iteration/forOfObjectMistake.js`

```js
// Goal:
// Show that ordinary objects are not iterable by default.

const userRecord = {
  id: "u1",
  name: "Mira",
};

try {
  for (const value of userRecord) {
    console.log(value);
  }
} catch (error) {
  console.log(error.name);
}

console.log(Object.values(userRecord));
```

#### 运行方式

```bash
node 07-for-of-iteration/forOfArrayStringDemo.js
node 07-for-of-iteration/forOfIterableValueDemo.js
node 07-for-of-iteration/forOfObjectMistake.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
for...of iteration -> exact control-flow rule, not visual indentation
```

### 08：for...in 属性枚举

#### 结论

for...in 遍历可枚举字符串属性名，包括继承来的可枚举属性。

#### 技术意义

这一节训练 `for...in enumeration`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
for (const propertyName in object) statement
```

#### 文件结构

```txt
08-for-in-enumeration/
  forInArrayIndexMistake.js
  forInInheritedPropertyMistake.js
  forInOwnPropertyDemo.js
```

#### 示例代码

#### 文件名：`08-for-in-enumeration/forInArrayIndexMistake.js`

```js
// Goal:
// Show why for...in is not array value iteration.

const items = ["book", "pen"];
items.owner = "Mira";

const visited = [];

for (const key in items) {
  visited.push(`${key}:${items[key]}`);
}

console.log(visited);
```

#### 文件名：`08-for-in-enumeration/forInInheritedPropertyMistake.js`

```js
// Goal:
// Show that for...in can include inherited enumerable properties.

const defaults = {
  currency: "USD",
};

const invoice = Object.create(defaults);
invoice.total = 100;

const allNames = [];
const ownNames = [];

for (const propertyName in invoice) {
  allNames.push(propertyName);

  if (Object.hasOwn(invoice, propertyName)) {
    ownNames.push(propertyName);
  }
}

console.log(allNames);
console.log(ownNames);
```

#### 文件名：`08-for-in-enumeration/forInOwnPropertyDemo.js`

```js
// Goal:
// Verify for...in enumerates property names.

const orderSummary = {
  id: "order-7",
  total: 88,
  status: "paid",
};

const entries = [];

for (const propertyName in orderSummary) {
  if (Object.hasOwn(orderSummary, propertyName)) {
    entries.push(`${propertyName}:${orderSummary[propertyName]}`);
  }
}

console.log(entries);
```

#### 运行方式

```bash
node 08-for-in-enumeration/forInArrayIndexMistake.js
node 08-for-in-enumeration/forInInheritedPropertyMistake.js
node 08-for-in-enumeration/forInOwnPropertyDemo.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
for...in enumeration -> exact control-flow rule, not visual indentation
```

### 09：label、break 与 continue

#### 结论

break 退出目标结构；continue 跳过本轮循环；label 可以指定外层跳转目标。

#### 技术意义

这一节训练 `labels, break, and continue`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
labelName: statement
break;
break labelName;
continue;
continue labelName;
```

#### 文件结构

```txt
09-label-break-continue/
  breakContinueDemo.js
  invalidBreakMistake.js
  labeledBreakDemo.js
```

#### 示例代码

#### 文件名：`09-label-break-continue/breakContinueDemo.js`

```js
// Goal:
// Verify break and continue inside a loop.

const values = [1, 0, 2, -1, 3];
const accepted = [];

for (const value of values) {
  if (value === 0) {
    continue;
  }

  if (value < 0) {
    break;
  }

  accepted.push(value);
}

console.log(accepted);
```

#### 文件名：`09-label-break-continue/invalidBreakMistake.js`

```js
// Goal:
// Show that break outside a valid target is a syntax error.

try {
  Function("break;");
} catch (error) {
  console.log(error.name);
}
```

#### 文件名：`09-label-break-continue/labeledBreakDemo.js`

```js
// Goal:
// Verify labeled break in nested loops.

const rows = [
  ["empty", "empty"],
  ["empty", "target"],
  ["empty", "empty"],
];

let foundPosition = null;

searchGrid: for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
  for (let columnIndex = 0; columnIndex < rows[rowIndex].length; columnIndex++) {
    if (rows[rowIndex][columnIndex] !== "target") {
      continue;
    }

    foundPosition = `${rowIndex},${columnIndex}`;
    break searchGrid;
  }
}

console.log(foundPosition);
```

#### 运行方式

```bash
node 09-label-break-continue/breakContinueDemo.js
node 09-label-break-continue/invalidBreakMistake.js
node 09-label-break-continue/labeledBreakDemo.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
labels, break, and continue -> exact control-flow rule, not visual indentation
```

### 10：return 与 throw 控制转移

#### 结论

return 表示正常完成函数调用；throw 表示异常完成并沿调用栈寻找处理器。

#### 技术意义

这一节训练 `return and throw control transfer`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
return expression;
throw expression;
```

#### 文件结构

```txt
10-return-throw-control-transfer/
  returnLineBreakMistake.js
  returnValueDemo.js
  throwErrorDemo.js
```

#### 示例代码

#### 文件名：`10-return-throw-control-transfer/returnLineBreakMistake.js`

```js
// Goal:
// Show automatic semicolon insertion after return line break.

function buildResultWrong() {
  return
  {
    ok: true
  };
}

function buildResultRight() {
  return {
    ok: true,
  };
}

console.log(buildResultWrong());
console.log(buildResultRight());
```

#### 文件名：`10-return-throw-control-transfer/returnValueDemo.js`

```js
// Goal:
// Verify that return ends function execution and provides a value.

function getShippingLabel(countryCode) {
  if (countryCode === "US") {
    return "domestic";
  }

  return "international";
}

console.log(getShippingLabel("US"));
console.log(getShippingLabel("CA"));
```

#### 文件名：`10-return-throw-control-transfer/throwErrorDemo.js`

```js
// Goal:
// Verify return and throw transfer control differently.

function calculateDiscountRate(customerTier) {
  if (customerTier === "gold") {
    return 0.2;
  }

  if (customerTier === "silver") {
    return 0.1;
  }

  if (customerTier === "blocked") {
    throw new Error("Blocked customer cannot checkout");
  }

  return 0;
}

try {
  console.log(calculateDiscountRate("gold"));
  console.log(calculateDiscountRate("blocked"));
  console.log("after blocked checkout");
} catch (caughtError) {
  console.log(caughtError.message);
}
```

#### 运行方式

```bash
node 10-return-throw-control-transfer/returnLineBreakMistake.js
node 10-return-throw-control-transfer/returnValueDemo.js
node 10-return-throw-control-transfer/throwErrorDemo.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
return and throw control transfer -> exact control-flow rule, not visual indentation
```

### 11：try / catch / finally 异常处理

#### 结论

try 描述可能失败的路径，catch 处理异常，finally 保证清理逻辑执行。

#### 技术意义

这一节训练 `try / catch / finally`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
try { statementList } catch (binding) { statementList } finally { statementList }
```

#### 文件结构

```txt
11-try-catch-finally/
  catchBindingScopeDemo.js
  finallyReturnMistake.js
  tryCatchFinallyDemo.js
```

#### 示例代码

#### 文件名：`11-try-catch-finally/catchBindingScopeDemo.js`

```js
// Goal:
// Verify that catch binding is scoped to the catch block.

try {
  throw new Error("failed");
} catch (caughtError) {
  console.log(caughtError.message);
}

try {
  console.log(caughtError);
} catch (error) {
  console.log(error.name);
}
```

#### 文件名：`11-try-catch-finally/finallyReturnMistake.js`

```js
// Goal:
// Show how return in finally overrides an earlier return.

function getStatusWrong() {
  try {
    return "try result";
  } finally {
    return "finally result";
  }
}

console.log(getStatusWrong());
```

#### 文件名：`11-try-catch-finally/tryCatchFinallyDemo.js`

```js
// Goal:
// Verify try, catch, and finally execution order.

function parsePositiveQuantity(rawQuantity) {
  try {
    const quantity = Number(rawQuantity);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw new Error("Quantity must be positive");
    }

    return quantity;
  } catch (caughtError) {
    console.log(`caught:${caughtError.message}`);
    return 1;
  } finally {
    console.log("cleanup finished");
  }
}

console.log(parsePositiveQuantity("3"));
console.log(parsePositiveQuantity("bad"));
```

#### 运行方式

```bash
node 11-try-catch-finally/catchBindingScopeDemo.js
node 11-try-catch-finally/finallyReturnMistake.js
node 11-try-catch-finally/tryCatchFinallyDemo.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
try / catch / finally -> exact control-flow rule, not visual indentation
```

### 12：with、debugger 与严格模式

#### 结论

debugger 是调试暂停点；with 扩展作用域链，现代代码应避免，严格模式禁止。

#### 技术意义

这一节训练 `with, debugger, and strict mode`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
debugger;
with (object) statement
"use strict";
```

#### 文件结构

```txt
12-with-debugger-strict/
  debuggerStatementDemo.js
  strictWithMistake.js
  withStatementRiskDemo.js
```

#### 示例代码

#### 文件名：`12-with-debugger-strict/debuggerStatementDemo.js`

```js
// Goal:
// Show debugger as a statement that can pause when a debugger is attached.

let step = 1;
debugger;
step += 1;

console.log(step);
```

#### 文件名：`12-with-debugger-strict/strictWithMistake.js`

```js
// Goal:
// Show that with is rejected in strict-mode code.

try {
  Function('"use strict"; with ({ value: 1 }) { console.log(value); }');
} catch (error) {
  console.log(error.name);
}
```

#### 文件名：`12-with-debugger-strict/withStatementRiskDemo.js`

```js
// Goal:
// Show why explicit property access is safer than with.

const invoiceContext = {
  taxRate: 0.08,
  subtotal: 100,
};

const total = invoiceContext.subtotal * (1 + invoiceContext.taxRate);

console.log(total);
```

#### 运行方式

```bash
node 12-with-debugger-strict/debuggerStatementDemo.js
node 12-with-debugger-strict/strictWithMistake.js
node 12-with-debugger-strict/withStatementRiskDemo.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
with, debugger, and strict mode -> exact control-flow rule, not visual indentation
```

### 13：声明语句

#### 结论

声明把名字引入作用域。let、const、var、function、class、import、export 的作用域和提升规则不同。

#### 技术意义

这一节训练 `declarations`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
let name = value;
const name = value;
var name = value;
function name() {}
class Name {}
```

#### 文件结构

```txt
13-declarations/
  declarationHoistingDemo.js
  duplicateDeclarationMistake.js
  letConstBlockScopeDemo.js
  varLoopClosurePreview.js
```

#### 示例代码

#### 文件名：`13-declarations/declarationHoistingDemo.js`

```js
// Goal:
// Compare var hoisting with later initialization.

console.log(varStatus);
var varStatus = "ready";
console.log(varStatus);
```

#### 文件名：`13-declarations/duplicateDeclarationMistake.js`

```js
// Goal:
// Show that duplicate let declarations in the same scope are syntax errors.

try {
  Function("let status = 'ready'; let status = 'done';");
} catch (error) {
  console.log(error.name);
}
```

#### 文件名：`13-declarations/letConstBlockScopeDemo.js`

```js
// Goal:
// Verify let and const block scope.

const outerStatus = "outer";

{
  let innerStatus = "inside block";
  const fixedStatus = "fixed";
  console.log(innerStatus);
  console.log(fixedStatus);
}

console.log(outerStatus);
```

#### 文件名：`13-declarations/varLoopClosurePreview.js`

```js
// Goal:
// Preview why var in loops can surprise closures.

const handlers = [];

for (var index = 0; index < 3; index++) {
  handlers.push(function readIndex() {
    return index;
  });
}

console.log(handlers[0]());
console.log(handlers[1]());
console.log(handlers[2]());
```

#### 运行方式

```bash
node 13-declarations/declarationHoistingDemo.js
node 13-declarations/duplicateDeclarationMistake.js
node 13-declarations/letConstBlockScopeDemo.js
node 13-declarations/varLoopClosurePreview.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
declarations -> exact control-flow rule, not visual indentation
```

### 14：语句组合与 JSX 预告

#### 结论

语句组织执行流程，表达式提供值；JSX 插值位置需要表达式，不接受普通 if 或 for 语句。

#### 技术意义

这一节训练 `statement composition and JSX preview`。不要只背语法，要说清楚它如何改变控制流、作用域或异常路径。

#### 底层机制

解释器执行到这类语句时，会先根据语句规则求值必要的表达式，再决定下一步是继续顺序执行、进入分支、重复循环体、跳出当前结构、返回函数调用，还是传播异常。

#### API / 语法规范

```txt
if (condition) statement
condition ? valueA : valueB
```

#### 文件结构

```txt
14-statement-composition/
  jsxStatementExpressionPreview.js
  statementCompositionDemo.js
```

#### 示例代码

#### 文件名：`14-statement-composition/jsxStatementExpressionPreview.js`

```js
// Goal:
// Compare statement-based preparation with expression-based selection.

const itemCount = 0;
let preparedMessage;

if (itemCount === 0) {
  preparedMessage = "No items";
} else {
  preparedMessage = "Has items";
}

const expressionMessage = itemCount === 0 ? "No items" : "Has items";

console.log(preparedMessage);
console.log(expressionMessage);
```

#### 文件名：`14-statement-composition/statementCompositionDemo.js`

```js
// Goal:
// Prepare render-ready values with statements before expression-only usage.

const isLoading = false;
const hasError = true;
let message;

if (isLoading) {
  message = "Loading";
} else if (hasError) {
  message = "Error";
} else {
  message = "Ready";
}

const renderText = hasError ? "Show error panel" : "Show content";

console.log(message);
console.log(renderText);
```

#### 运行方式

```bash
node 14-statement-composition/jsxStatementExpressionPreview.js
node 14-statement-composition/statementCompositionDemo.js
```

#### 执行过程

运行这些文件时，先观察输出顺序，再反推每一条语句如何改变控制流。遇到 `Mistake` 文件时，不要只看结果错在哪里，还要说明它违反了哪条语句执行规则。

#### 和实际项目的关系

真实前端项目里，这类语句常出现在事件处理器、表单校验、请求流程、状态分支、数据遍历和错误处理代码中。

#### 常见错误

常见错误不是语法不会写，而是无法判断下一条执行路径。例如漏写块、漏写 `break`、把 `for...in` 当值遍历、在 `finally` 中返回业务结果，都会让程序执行路径偏离你的直觉。

#### 最终记忆模型

```txt
statement composition and JSX preview -> exact control-flow rule, not visual indentation
```

## 8. 本章 API / 语法完整索引

| 语法 / API | 类别 | 核心作用 | 常见坑 |
|---|---|---|---|
| expression; | 表达式语句 | 执行表达式并丢弃结果 | 纯表达式单独写没有意义 |
| { ... } | 块语句 | 把多条语句包装成一条 | 块不是对象字面量 |
| ; | 空语句 | 什么也不做 | `if (...);` 是高危错误 |
| if / else | 条件语句 | 按真值性选择分支 | 只控制紧跟的一条语句 |
| switch | 条件语句 | 多分支匹配 | 漏 break 会 fallthrough |
| while | 循环语句 | 先判断再循环 | 忘记更新条件造成无限循环 |
| do...while | 循环语句 | 先执行一次再判断 | 至少执行一次 |
| for | 循环语句 | 初始化、判断、更新集中表达 | off-by-one |
| for...of | 迭代语句 | 遍历 iterable 值 | 普通对象默认不可用 |
| for...in | 枚举语句 | 遍历可枚举属性名 | 包含继承属性 |
| break | 跳转语句 | 退出循环或 switch | 不能跨函数边界 |
| continue | 跳转语句 | 跳到下一轮循环 | 只能用于循环 |
| return | 跳转语句 | 结束函数并返回值 | 换行触发 ASI |
| throw | 跳转语句 | 抛出异常 | throw 后不能换行 |
| try/catch/finally | 异常处理 | 捕获错误并清理 | finally return 覆盖结果 |
| with | 其他语句 | 扩展作用域链 | 严格模式禁止 |
| debugger | 其他语句 | 调试暂停点 | 提交前通常移除 |
| let / const / var | 声明 | 创建绑定 | 作用域和提升规则不同 |

## 9. 本章常见错误总表

| 错误写法 | 错误类型 | 为什么错 | 正确思路 |
|---|---|---|---|
| `if (isValid); { ... }` | 逻辑错误 | if 主体是空语句 | 删除多余分号 |
| `switch` 漏 `break` | 逻辑错误 | 匹配后继续执行后续 case | 每个 case 用 break / return / throw 结束 |
| `i <= array.length` | 逻辑错误 | 多访问一个不存在索引 | 使用 `i < array.length` |
| `for...of` 遍历普通对象 | 运行时错误 | 普通对象默认不是 iterable | 用 Object.entries() 或 for...in |
| `for...in` 遍历数组值 | 逻辑错误 | 得到属性名字符串 | 用 for...of 或数组方法 |
| 循环外写 `break` | 语法错误 | break 没有目标 | 放入循环或 switch |
| `return` 后换行 | ASI 陷阱 | 自动插入分号 | 返回表达式放同一行 |
| `throw` 后换行 | 语法错误 | throw 后必须跟表达式 | 写成 `throw new Error(...)` |
| `finally` 里 return | 逻辑错误 | 覆盖 try/catch 返回或异常 | finally 只做清理 |
| 严格模式使用 with | 语法错误 | 严格模式禁止 with | 显式属性访问 |

## 10. 最终小项目：Checkout Flow Controller

### 项目目标

做一个纯 JavaScript 的结账流程控制器。它不练 UI，而是训练输入校验、状态分支、列表遍历、提前跳出、异常处理和清理逻辑。

### 推荐文件结构

```txt
15-statements-mini-project/
  checkoutFlowController.js
  checkoutFlowControllerMistakes.js
  checkoutFlowControllerChecklist.md
```

#### 文件名：`15-statements-mini-project/checkoutFlowController.js`

```js
// Goal:
// Build a checkout flow controller with JavaScript statements.

function calculateItemTotal(cartItem) {
  if (cartItem.quantity < 0) {
    throw new Error(`Invalid quantity for ${cartItem.sku}`);
  }

  return cartItem.price * cartItem.quantity;
}

function resolveDiscountRate(customerTier) {
  switch (customerTier) {
    case "gold":
      return 0.2;
    case "silver":
      return 0.1;
    case "guest":
      return 0;
    default:
      throw new Error(`Unknown customer tier: ${customerTier}`);
  }
}

function buildCheckoutSummary(orderRequest) {
  const auditLog = [];

  try {
    if (!orderRequest || !Array.isArray(orderRequest.items)) {
      throw new Error("Invalid order request");
    }

    let subtotal = 0;
    let blockedSku = null;

    for (const cartItem of orderRequest.items) {
      if (cartItem.quantity === 0) {
        continue;
      }

      if (cartItem.stock < cartItem.quantity) {
        blockedSku = cartItem.sku;
        break;
      }

      subtotal += calculateItemTotal(cartItem);
    }

    if (blockedSku) {
      throw new Error(`Not enough stock for ${blockedSku}`);
    }

    const discountRate = resolveDiscountRate(orderRequest.customerTier);
    const discountAmount = subtotal * discountRate;
    const finalTotal = subtotal - discountAmount;

    let nextAction;
    switch (orderRequest.status) {
      case "draft":
        nextAction = "show payment form";
        break;
      case "paid":
        nextAction = "prepare shipment";
        break;
      case "cancelled":
        nextAction = "show cancelled message";
        break;
      default:
        nextAction = "manual review";
    }

    return {
      ok: true,
      subtotal,
      discountRate,
      discountAmount,
      finalTotal,
      nextAction,
      auditLog,
    };
  } catch (caughtError) {
    return {
      ok: false,
      errorMessage: caughtError.message,
      auditLog,
    };
  } finally {
    auditLog.push("checkout evaluated");
  }
}

const demoOrder = {
  customerTier: "gold",
  status: "draft",
  items: [
    { sku: "keyboard", price: 80, quantity: 1, stock: 5 },
    { sku: "mouse", price: 30, quantity: 0, stock: 10 },
    { sku: "monitor", price: 200, quantity: 1, stock: 2 },
  ],
};

console.log(buildCheckoutSummary(demoOrder));
```

#### 文件名：`15-statements-mini-project/checkoutFlowControllerMistakes.js`

```js
// Goal:
// Show common statement mistakes in checkout flow code.

function buildBrokenCheckoutSummary(orderRequest) {
  let subtotal = 0;

  if (!orderRequest);
  {
    console.log("This block runs even when the request exists.");
  }

  for (const cartItem of orderRequest.items) {
    switch (cartItem.type) {
      case "physical":
        subtotal += cartItem.price * cartItem.quantity;
      case "digital":
        subtotal += cartItem.price * cartItem.quantity;
        break;
      default:
        subtotal += 0;
    }
  }

  return subtotal;
}

const brokenOrder = {
  items: [
    { type: "physical", price: 10, quantity: 1 },
  ],
};

console.log(buildBrokenCheckoutSummary(brokenOrder));
```

#### 文件名：`15-statements-mini-project/checkoutFlowControllerChecklist.md`

```md
# Checkout Flow Controller Checklist

- Validate request shape before reading nested fields.
- Use if / else for validation branches.
- Use switch when mapping a finite set of status values.
- Use for...of for cart item values.
- Use continue for intentionally skipped items.
- Use break for early termination after a blocking condition.
- Use return for normal function completion.
- Use throw for invalid states that cannot continue.
- Use catch to convert exceptions into structured results.
- Use finally only for cleanup or audit work.
```

### 运行方式

```bash
node 15-statements-mini-project/checkoutFlowController.js
node 15-statements-mini-project/checkoutFlowControllerMistakes.js
```

### 完整执行过程

输入先经过 `if` 校验；购物车用 `for...of` 遍历；数量为 0 的商品用 `continue` 跳过；库存不足用 `break` 提前停止；会员等级和订单状态用 `switch` 映射；正常路径用 `return` 返回结果；失败路径用 `throw` 进入 `catch`；`finally` 写入审计记录。

## 11. 额外 cheatsheet

本章必须配套单独 cheatsheet 文件：

```txt
javascript-chapter-05-statements-cheatsheet-zh-v1.md
```

cheatsheet 用于复习，不替代本指导文件。

## 12. 最终文件清单

最终文件清单必须和第 5 节推荐目录结构一致：

```txt
javascript/
  chapter-05-statements/
    javascript-chapter-05-statements-learning-guide-zh-v1.md
    javascript-chapter-05-statements-cheatsheet-zh-v1.md
    README.md

    00-statement-execution-model/
      statementExecutionPipeline.js
      statementExpressionDifference.js

    01-expression-statements/
      deleteStatementDemo.js
      ignoredPureExpressionMistake.js
      sideEffectStatementDemo.js

    02-block-empty-statements/
      accidentalEmptyStatementMistake.js
      blockStatementScopeDemo.js
      emptyStatementLoopDemo.js

    03-if-else-branching/
      danglingElseDemo.js
      ifElseTruthinessDemo.js
      missingBlockMistake.js

    04-switch-matching/
      missingBreakMistake.js
      switchFallthroughDemo.js
      switchStrictMatchingDemo.js

    05-while-do-while-loops/
      doWhileAtLeastOnceDemo.js
      infiniteLoopGuardMistake.js
      whileLoopStateDemo.js

    06-for-loop-mechanics/
      forLoopLifecycleDemo.js
      forLoopScopeDemo.js
      offByOneMistake.js

    07-for-of-iteration/
      forOfArrayStringDemo.js
      forOfIterableValueDemo.js
      forOfObjectMistake.js

    08-for-in-enumeration/
      forInArrayIndexMistake.js
      forInInheritedPropertyMistake.js
      forInOwnPropertyDemo.js

    09-label-break-continue/
      breakContinueDemo.js
      invalidBreakMistake.js
      labeledBreakDemo.js

    10-return-throw-control-transfer/
      returnLineBreakMistake.js
      returnValueDemo.js
      throwErrorDemo.js

    11-try-catch-finally/
      catchBindingScopeDemo.js
      finallyReturnMistake.js
      tryCatchFinallyDemo.js

    12-with-debugger-strict/
      debuggerStatementDemo.js
      strictWithMistake.js
      withStatementRiskDemo.js

    13-declarations/
      declarationHoistingDemo.js
      duplicateDeclarationMistake.js
      letConstBlockScopeDemo.js
      varLoopClosurePreview.js

    14-statement-composition/
      jsxStatementExpressionPreview.js
      statementCompositionDemo.js

    15-statements-mini-project/
      checkoutFlowController.js
      checkoutFlowControllerChecklist.md
      checkoutFlowControllerMistakes.js
```

## 13. 最终学习笔记转换要求

把本指导文件转换为正式笔记时，不要照抄全部代码。每节至少保留：结论、运行时机制、一个正确示例、一个错误示例、执行过程、常见错误、和 React / Node / TypeScript 的关系。

## 14. 本章最终记忆模型

```txt
statement -> execute action
expression -> produce value
control statement -> choose, repeat, jump, or handle abrupt completion
declaration -> introduce binding into scope
```

压缩成一句话：表达式回答“这个值是什么”；语句回答“程序接下来做什么”。

## 15. 官方文档阅读清单

- Statements and declarations - MDN
- Control flow and error handling - MDN
- Loops and iteration - MDN
- if...else - MDN
- switch - MDN
- while - MDN
- do...while - MDN
- for - MDN
- for...of - MDN
- for...in - MDN
- break - MDN
- continue - MDN
- return - MDN
- throw - MDN
- try...catch - MDN
- debugger - MDN
- let - MDN
- const - MDN
- var - MDN

## 16. 生成前自检清单

| 检查项 | 是否完成 |
|---|---|
| 包含文档目录 | 是 |
| 包含完整子目录结构 | 是 |
| 目录树包含所有练习文件 | 是 |
| 每个真实 js 代码块上方都有文件名 | 是 |
| 运行清单包含所有练习文件 | 是 |
| 最终文件清单和推荐目录结构一致 | 是 |
| 包含最终小项目 | 是 |
| 包含小项目 checklist | 是 |
| 代码注释使用英文 | 是 |
| 代码块内部没有中文字符 | 是 |
| 全部 js 文件可用 Node 执行 | 是 |
