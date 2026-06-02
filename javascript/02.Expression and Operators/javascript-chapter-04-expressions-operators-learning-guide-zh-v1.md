# JavaScript 第 4 章“表达式与操作符”学习指导文件 v1

> 定位：这是《JavaScript 权威指南》第 4 章“表达式与操作符”的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建目录、写 `.js` / `.mjs` 文件、运行 Node、观察输出和错误，再把每节整理成正式学习笔记。  
> 参考范围：《JavaScript: The Definitive Guide, Seventh Edition》第 4 章、MDN JavaScript Guide / Reference 中的 Expressions and operators、Operator precedence、Optional chaining、Nullish coalescing、function expression、conditional operator、comma operator、void、delete、typeof、eval 等文档。  
> 语言规则：正文使用中文；必要技术术语保留英文括号。  
> 代码规则：代码命名和代码注释统一英文；代码和代码注释不使用中文字符。  
> 学习原则：第四章不要学成“操作符背诵表”。你要建立的是表达式求值模型：表达式如何产生值、操作数何时求值、操作符如何组合值、哪里会触发类型转换、哪里会短路、哪里会产生副作用。

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
11. [最终小项目](#10-最终小项目购物车报价表达式构建器)
12. [额外 cheatsheet](#11-额外-cheatsheet)
13. [最终文件清单](#12-最终文件清单)
14. [最终学习笔记转换要求](#13-最终学习笔记转换要求)
15. [本章最终记忆模型](#14-本章最终记忆模型)
16. [官方文档阅读清单](#15-官方文档阅读清单)
17. [生成前自检清单](#16-生成前自检清单)

---

## 0. 文件定位

### 结论

本文件是训练型指导文件。它的作用不是替你总结第四章，而是规定你应该创建哪些练习文件、运行哪些代码、观察哪些输出、刻意制造哪些错误，并理解每个表达式为什么得到那个值。

第四章的核心问题是：

```txt
When JavaScript sees an expression, what value does it produce, and what side effects happen during evaluation?
```

### 你要完成的动作

1. 在项目中创建第四章目录。
2. 按照推荐目录结构创建每个训练子目录。
3. 逐个写入 `.js` 或 `.mjs` 文件。
4. 使用 Node 运行每个文件。
5. 对照预期输出。
6. 阅读每节“执行过程”。
7. 改写错误示例，亲自观察错误。
8. 完成最终小项目。
9. 打开额外 cheatsheet 做复习。
10. 把本文件转换成你自己的最终学习笔记。

---

## 1. 本章学习目标

### 结论

学完第四章，你必须能清楚回答六个问题：

```txt
1. What is an expression?
2. What value does this expression produce?
3. Which subexpression is evaluated first?
4. Does this expression trigger type conversion?
5. Does this expression short-circuit?
6. Does this expression create a side effect?
```

### 技术意义

第四章直接影响真实前端代码：表单字符串为什么和数字相加会拼接，`count || 10` 为什么会错误覆盖 `0`，`handler` 和 `handler()` 为什么不是一回事，`object.method` 拆出来后为什么 `this` 变了。这些都不是“语法糖问题”，而是运行时求值规则。

---

## 2. 本章学习顺序

```txt
expression value model
  -> primary expressions
  -> object and array initializers
  -> function expressions
  -> property access expressions
  -> invocation expressions
  -> object creation expressions
  -> operator overview
  -> arithmetic expressions
  -> relational expressions
  -> logical expressions
  -> assignment expressions
  -> eval expressions
  -> other operators
  -> debugging expression errors
  -> mini project
```

先学“表达式产生值”，再学“如何访问值”，再学“如何调用函数”，最后才学“操作符如何组合值”。如果一上来背操作符优先级，你会知道表格，却不知道每个操作符在运行时到底拿到了什么值。

---

## 3. 本章核心术语表

| 中文术语 | English term | 解释 |
|---|---|---|
| 表达式 | expression | 可以求值并产生一个值的 JavaScript 代码片段。 |
| 操作符 | operator | 组合一个或多个操作数并产生结果的语法符号。 |
| 操作数 | operand | 提供给操作符的输入表达式。 |
| 优先级 | precedence | 决定操作符如何分组的规则。 |
| 结合性 | associativity | 同优先级操作符如何分组的方向。 |
| 求值顺序 | evaluation order | 子表达式实际被求值的先后顺序。 |
| 副作用 | side effect | 表达式求值时改变外部状态，例如赋值、函数调用、属性删除。 |
| 主表达式 | primary expression | 最小表达式单位，例如字面量、变量引用、`this`。 |
| 初始化程序 | initializer | 创建数组或对象的表达式。 |
| 属性访问 | property access | 通过点语法或方括号语法读取属性。 |
| 调用表达式 | call expression | 调用函数并得到返回值的表达式。 |
| 方法调用 | method call | 通过对象属性调用函数，并影响 `this` 绑定。 |
| 对象创建表达式 | object creation expression | 使用 `new` 创建对象的表达式。 |
| 短路求值 | short-circuit evaluation | 左侧操作数已经决定结果时，右侧不再求值。 |
| 严格相等 | strict equality | `===`，不执行类型转换。 |
| 宽松相等 | loose equality | `==`，会执行复杂类型转换。 |
| 空值合并 | nullish coalescing | `??`，只在 `null` 或 `undefined` 时使用右侧值。 |
| 可选链 | optional chaining | `?.`，左侧为空值时短路为 `undefined`。 |

---

## 4. 本章底层模型

### 结论

第四章可以压缩成一个模型：

```txt
source expression
  -> parse into syntax tree
  -> evaluate subexpressions
  -> apply operator or expression rule
  -> produce value
  -> maybe create side effect
```

### 表达式求值总图

```txt
primary expression
  -> direct value or binding lookup

member expression
  -> evaluate object
  -> compute property key
  -> read property value

call expression
  -> evaluate function value
  -> evaluate argument values
  -> bind parameters and this
  -> execute function body
  -> produce return value

operator expression
  -> evaluate operands
  -> maybe convert values
  -> apply operator rule
  -> produce result

assignment expression
  -> evaluate right side
  -> write to left reference
  -> produce assigned value
```

### 本章最重要的区分

| 容易混的概念 | 必须区分 |
|---|---|
| 表达式 vs 语句 | 表达式产生值；语句执行动作。表达式也可能通过副作用改变状态。 |
| 函数引用 vs 函数调用 | `handler` 是函数值；`handler()` 会执行函数。 |
| 属性名 vs 变量名 | `obj.key` 的 `key` 是固定属性名；`obj[key]` 的 `key` 是变量引用。 |
| `||` vs `??` | `||` 处理所有 falsy；`??` 只处理 `null` / `undefined`。 |
| `in` vs `Object.hasOwn()` | `in` 查原型链；`Object.hasOwn()` 只查自有属性。 |
| `==` vs `===` | `==` 转换类型；`===` 不转换类型。 |
| 结合性 vs 求值顺序 | 结合性决定分组；操作数通常仍从左到右求值。 |

---

## 5. 推荐目录结构

```txt
javascript/
  chapter-04-expressions-operators/
    javascript-chapter-04-expressions-operators-learning-guide-zh-v1.md
    javascript-chapter-04-expressions-operators-cheatsheet-zh-v1.md
    README.md

    00-expression-value-model/
      expressionValuePipeline.js
      expressionStatementMistake.js

    01-primary-expressions/
      primaryExpressionDemo.js
      missingIdentifierReferenceError.js

    02-array-object-initializers/
      initializerEvaluationDemo.js
      sparseArrayMistake.js
      objectLiteralPropertyDemo.js

    03-function-expressions/
      functionExpressionDemo.js
      functionExpressionCallMistake.js
      arrowExpressionThisPreview.js

    04-property-access/
      dotBracketAccess.js
      optionalChainingAccess.js
      nullPropertyAccessMistake.js

    05-invocation-expressions/
      functionVsMethodCall.js
      thisBindingInCall.js
      optionalCallDemo.js

    06-object-creation/
      newExpressionDemo.js
      constructorReturnMistake.js
      classPreviewNew.js

    07-operator-overview/
      precedenceAssociativityDemo.js
      evaluationOrderDemo.js
      sideEffectOrderMistake.js

    08-arithmetic-expressions/
      numericArithmeticDemo.js
      plusConversionDemo.js
      incrementDecrementDemo.js
      bitwiseIntegerCoercion.js

    09-relational-expressions/
      equalityComparisonDemo.js
      relationalConversionDemo.js
      inAndInstanceofDemo.js
      looseEqualityMistake.js

    10-logical-expressions/
      shortCircuitDemo.js
      nullishCoalescingDemo.js
      logicalAssignmentDemo.js
      falsyDefaultMistake.js

    11-assignment-expressions/
      compoundAssignmentDemo.js
      destructuringAssignmentPreview.js
      assignmentReturnsValue.js

    12-eval-expressions/
      directEvalRisk.js
      indirectEvalDifference.js
      saferPropertyLookup.js

    13-other-operators/
      conditionalOperatorDemo.js
      typeofDeleteVoidCommaDemo.js
      awaitOperatorPreview.mjs

    14-expression-debugging/
      ideWarningPatterns.js
      syntaxRuntimeDifference.js

    15-mini-project/
      cartQuoteBuilder.js
      cartQuoteBuilderMistakes.js
      cartQuoteBuilderChecklist.md
```

---

## 6. 运行方式

### 环境要求

建议使用 Node.js 20 LTS 或更新版本。`awaitOperatorPreview.mjs` 必须使用 `.mjs` 或者 ES module 环境运行。

### 批量运行清单

在 `javascript/chapter-04-expressions-operators/` 目录下运行：

```bash
node 00-expression-value-model/expressionValuePipeline.js
node 00-expression-value-model/expressionStatementMistake.js
node 01-primary-expressions/primaryExpressionDemo.js
node 01-primary-expressions/missingIdentifierReferenceError.js
node 02-array-object-initializers/initializerEvaluationDemo.js
node 02-array-object-initializers/sparseArrayMistake.js
node 02-array-object-initializers/objectLiteralPropertyDemo.js
node 03-function-expressions/functionExpressionDemo.js
node 03-function-expressions/functionExpressionCallMistake.js
node 03-function-expressions/arrowExpressionThisPreview.js
node 04-property-access/dotBracketAccess.js
node 04-property-access/optionalChainingAccess.js
node 04-property-access/nullPropertyAccessMistake.js
node 05-invocation-expressions/functionVsMethodCall.js
node 05-invocation-expressions/thisBindingInCall.js
node 05-invocation-expressions/optionalCallDemo.js
node 06-object-creation/newExpressionDemo.js
node 06-object-creation/constructorReturnMistake.js
node 06-object-creation/classPreviewNew.js
node 07-operator-overview/precedenceAssociativityDemo.js
node 07-operator-overview/evaluationOrderDemo.js
node 07-operator-overview/sideEffectOrderMistake.js
node 08-arithmetic-expressions/numericArithmeticDemo.js
node 08-arithmetic-expressions/plusConversionDemo.js
node 08-arithmetic-expressions/incrementDecrementDemo.js
node 08-arithmetic-expressions/bitwiseIntegerCoercion.js
node 09-relational-expressions/equalityComparisonDemo.js
node 09-relational-expressions/relationalConversionDemo.js
node 09-relational-expressions/inAndInstanceofDemo.js
node 09-relational-expressions/looseEqualityMistake.js
node 10-logical-expressions/shortCircuitDemo.js
node 10-logical-expressions/nullishCoalescingDemo.js
node 10-logical-expressions/logicalAssignmentDemo.js
node 10-logical-expressions/falsyDefaultMistake.js
node 11-assignment-expressions/compoundAssignmentDemo.js
node 11-assignment-expressions/destructuringAssignmentPreview.js
node 11-assignment-expressions/assignmentReturnsValue.js
node 12-eval-expressions/directEvalRisk.js
node 12-eval-expressions/indirectEvalDifference.js
node 12-eval-expressions/saferPropertyLookup.js
node 13-other-operators/conditionalOperatorDemo.js
node 13-other-operators/typeofDeleteVoidCommaDemo.js
node 13-other-operators/awaitOperatorPreview.mjs
node 14-expression-debugging/ideWarningPatterns.js
node 14-expression-debugging/syntaxRuntimeDifference.js
node 15-mini-project/cartQuoteBuilder.js
node 15-mini-project/cartQuoteBuilderMistakes.js
```

### 运行时观察重点

```txt
1. expression value
2. operand evaluation order
3. implicit conversion
4. short-circuit behavior
5. side effect
6. thrown error type
```

---

## 7. 分节训练内容


## 00：表达式的值模型

### 结论

表达式会求值为一个结果；有些表达式还会产生副作用。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
00-expression-value-model/
  expressionValuePipeline.js
  expressionStatementMistake.js
```

### 示例代码

#### 文件名：`00-expression-value-model/expressionValuePipeline.js`

```js
// Goal:
// Verify that expressions evaluate to values and some expressions also create side effects.

let subtotalAmount = 80;
const shippingAmount = 12;
const discountRate = 0.1;

const finalAmount = subtotalAmount + shippingAmount - subtotalAmount * discountRate;
console.log(finalAmount);

const assignmentValue = (subtotalAmount = 120);
console.log(assignmentValue);
console.log(subtotalAmount);

const reportMessage = `amount:${finalAmount}`;
console.log(reportMessage);
```

### 运行方式

```bash
node 00-expression-value-model/expressionValuePipeline.js
```

### 示例代码

#### 文件名：`00-expression-value-model/expressionStatementMistake.js`

```js
// Goal:
// Show that a pure expression statement loses its calculated value.

let productPrice = 100;
productPrice * 0.9;
console.log(productPrice);

productPrice = productPrice * 0.9;
console.log(productPrice);
```

### 运行方式

```bash
node 00-expression-value-model/expressionStatementMistake.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 01：主表达式

### 结论

主表达式是字面量、标识符、this 等最小求值单位。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
01-primary-expressions/
  primaryExpressionDemo.js
  missingIdentifierReferenceError.js
```

### 示例代码

#### 文件名：`01-primary-expressions/primaryExpressionDemo.js`

```js
// Goal:
// Verify primary expressions and identifier lookup.

const productName = "Keyboard";
const productPrice = 89;
const isAvailable = true;
const missingValue = null;

console.log(productName);
console.log(productPrice);
console.log(isAvailable);
console.log(missingValue);
console.log(typeof undefined);
```

### 运行方式

```bash
node 01-primary-expressions/primaryExpressionDemo.js
```

### 示例代码

#### 文件名：`01-primary-expressions/missingIdentifierReferenceError.js`

```js
// Goal:
// Verify that an undeclared identifier lookup throws ReferenceError.

try {
  console.log(missingProductName);
} catch (error) {
  console.log(error.name);
}

const declaredProductName = "Desk";
console.log(declaredProductName);
```

### 运行方式

```bash
node 01-primary-expressions/missingIdentifierReferenceError.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 02：对象和数组初始化程序

### 结论

对象字面量和数组字面量每次求值都会创建新引用。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
02-array-object-initializers/
  initializerEvaluationDemo.js
  sparseArrayMistake.js
  objectLiteralPropertyDemo.js
```

### 示例代码

#### 文件名：`02-array-object-initializers/initializerEvaluationDemo.js`

```js
// Goal:
// Verify that array and object initializers are evaluated at runtime.

let sequenceNumber = 0;

const orderIds = [++sequenceNumber, ++sequenceNumber, ++sequenceNumber];
const customerName = "Mira";
const dynamicKey = "tier";

const customerProfile = {
  customerName,
  [dynamicKey]: "gold",
  orderCount: orderIds.length,
};

const sparseList = ["first", , "third"];

console.log(orderIds);
console.log(customerProfile);
console.log(sparseList.length);
console.log(sparseList[1]);
console.log(Object.hasOwn(sparseList, 1));
```

### 运行方式

```bash
node 02-array-object-initializers/initializerEvaluationDemo.js
```

### 示例代码

#### 文件名：`02-array-object-initializers/sparseArrayMistake.js`

```js
// Goal:
// Verify that an array hole is not the same as an explicit undefined element.

const sparseList = ["first", , "third"];
const explicitList = ["first", undefined, "third"];

console.log(sparseList[1]);
console.log(1 in sparseList);
console.log(1 in explicitList);
console.log(Object.keys(sparseList).join(","));
console.log(Object.keys(explicitList).join(","));
```

### 运行方式

```bash
node 02-array-object-initializers/sparseArrayMistake.js
```

### 示例代码

#### 文件名：`02-array-object-initializers/objectLiteralPropertyDemo.js`

```js
// Goal:
// Verify shorthand properties and computed property names.

const productName = "Monitor";
const statusKey = "availability";

const productRecord = {
  productName,
  [statusKey]: "in-stock",
  "stock-count": 12,
};

console.log(productRecord.productName);
console.log(productRecord.availability);
console.log(productRecord["stock-count"]);
```

### 运行方式

```bash
node 02-array-object-initializers/objectLiteralPropertyDemo.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 03：函数定义表达式

### 结论

函数表达式创建函数对象；调用表达式才执行函数体。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
03-function-expressions/
  functionExpressionDemo.js
  functionExpressionCallMistake.js
  arrowExpressionThisPreview.js
```

### 示例代码

#### 文件名：`03-function-expressions/functionExpressionDemo.js`

```js
// Goal:
// Verify that function expressions create callable values.

const formatCartLine = function (productName, quantity) {
  return `${productName} x ${quantity}`;
};

const calculateLineTotal = (unitPrice, quantity) => unitPrice * quantity;

const formatterReference = formatCartLine;

console.log(formatterReference("Mouse", 2));
console.log(calculateLineTotal(25, 2));
console.log(typeof formatCartLine);
console.log(formatCartLine === formatterReference);
```

### 运行方式

```bash
node 03-function-expressions/functionExpressionDemo.js
```

### 示例代码

#### 文件名：`03-function-expressions/functionExpressionCallMistake.js`

```js
// Goal:
// Show the difference between a function reference and a function call result.

function createHandler() {
  console.log("handler created");
  return "handler-result";
}

const calledValue = createHandler();
const functionReference = createHandler;

console.log(calledValue);
console.log(typeof functionReference);
```

### 运行方式

```bash
node 03-function-expressions/functionExpressionCallMistake.js
```

### 示例代码

#### 文件名：`03-function-expressions/arrowExpressionThisPreview.js`

```js
// Goal:
// Preview why arrow functions should not be used as object methods needing this.

const invoiceRecord = {
  total: 120,
  describeWithMethod() {
    return `total:${this.total}`;
  },
  describeWithArrow: () => `total:${this.total}`,
};

console.log(invoiceRecord.describeWithMethod());
console.log(invoiceRecord.describeWithArrow());
```

### 运行方式

```bash
node 03-function-expressions/arrowExpressionThisPreview.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 04：属性访问表达式

### 结论

点访问使用固定属性名，方括号访问使用运行时计算出的属性名。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
04-property-access/
  dotBracketAccess.js
  optionalChainingAccess.js
  nullPropertyAccessMistake.js
```

### 示例代码

#### 文件名：`04-property-access/dotBracketAccess.js`

```js
// Goal:
// Compare dot access, bracket access, array index access, and optional chaining.

const productRecord = {
  productName: "Monitor",
  "stock-count": 12,
  warehouse: {
    code: "A1",
  },
};

const stockKey = "stock-count";
const featuredProducts = ["Monitor", "Keyboard"];

console.log(productRecord.productName);
console.log(productRecord[stockKey]);
console.log(featuredProducts[0]);
console.log(productRecord.warehouse?.code);
console.log(productRecord.supplier?.name);
```

### 运行方式

```bash
node 04-property-access/dotBracketAccess.js
```

### 示例代码

#### 文件名：`04-property-access/optionalChainingAccess.js`

```js
// Goal:
// Verify optional chaining and nullish fallback during property access.

const apiResponse = {
  payload: null,
  meta: { count: 0 },
};

console.log(apiResponse.payload?.title);
console.log(apiResponse.meta?.count ?? 10);
console.log(apiResponse.missing?.count ?? "none");
```

### 运行方式

```bash
node 04-property-access/optionalChainingAccess.js
```

### 示例代码

#### 文件名：`04-property-access/nullPropertyAccessMistake.js`

```js
// Goal:
// Verify why accessing a property on null throws TypeError.

const selectedCustomer = null;

try {
  console.log(selectedCustomer.name);
} catch (error) {
  console.log(error.name);
}

console.log(selectedCustomer?.name);
```

### 运行方式

```bash
node 04-property-access/nullPropertyAccessMistake.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 05：调用表达式

### 结论

调用表达式执行函数；方法调用会决定 this 绑定。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
05-invocation-expressions/
  functionVsMethodCall.js
  thisBindingInCall.js
  optionalCallDemo.js
```

### 示例代码

#### 文件名：`05-invocation-expressions/functionVsMethodCall.js`

```js
// Goal:
// Compare function calls and method calls.

"use strict";

function describeOwner(label) {
  return `${label}:${this?.ownerName}`;
}

const storeAccount = {
  ownerName: "Nora",
  describeOwner,
};

const detachedDescribeOwner = storeAccount.describeOwner;

console.log(storeAccount.describeOwner("method"));
console.log(detachedDescribeOwner("function"));
console.log(storeAccount.missingHandler?.("test"));
```

### 运行方式

```bash
node 05-invocation-expressions/functionVsMethodCall.js
```

### 示例代码

#### 文件名：`05-invocation-expressions/thisBindingInCall.js`

```js
// Goal:
// Verify explicit this binding with call and apply.

function formatAccount(prefix, suffix) {
  return `${prefix}:${this.owner}:${suffix}`;
}

const accountContext = { owner: "Ava" };

console.log(formatAccount.call(accountContext, "call", "done"));
console.log(formatAccount.apply(accountContext, ["apply", "done"]));
```

### 运行方式

```bash
node 05-invocation-expressions/thisBindingInCall.js
```

### 示例代码

#### 文件名：`05-invocation-expressions/optionalCallDemo.js`

```js
// Goal:
// Verify optional call when a callback may be missing.

function runTask(taskName, onComplete) {
  console.log(`run:${taskName}`);
  const callbackResult = onComplete?.(taskName);
  console.log(callbackResult ?? "no-callback");
}

runTask("sync", (name) => `done:${name}`);
runTask("backup");
```

### 运行方式

```bash
node 05-invocation-expressions/optionalCallDemo.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 06：对象创建表达式

### 结论

new 会创建对象、连接原型、绑定 this 并执行构造函数。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
06-object-creation/
  newExpressionDemo.js
  constructorReturnMistake.js
  classPreviewNew.js
```

### 示例代码

#### 文件名：`06-object-creation/newExpressionDemo.js`

```js
// Goal:
// Verify how new creates an object and binds this.

function CartItem(productName, unitPrice) {
  this.productName = productName;
  this.unitPrice = unitPrice;
}

CartItem.prototype.describe = function () {
  return `${this.productName}:${this.unitPrice}`;
};

const cartItem = new CartItem("Desk", 240);

console.log(cartItem.productName);
console.log(cartItem.describe());
console.log(cartItem instanceof CartItem);
console.log(Object.getPrototypeOf(cartItem) === CartItem.prototype);
```

### 运行方式

```bash
node 06-object-creation/newExpressionDemo.js
```

### 示例代码

#### 文件名：`06-object-creation/constructorReturnMistake.js`

```js
// Goal:
// Verify constructor return behavior with primitive and object return values.

function PrimitiveReturnProduct() {
  this.name = "inside";
  return "outside";
}

function ObjectReturnProduct() {
  this.name = "inside";
  return { name: "outside" };
}

console.log(new PrimitiveReturnProduct().name);
console.log(new ObjectReturnProduct().name);
```

### 运行方式

```bash
node 06-object-creation/constructorReturnMistake.js
```

### 示例代码

#### 文件名：`06-object-creation/classPreviewNew.js`

```js
// Goal:
// Preview class construction with new.

class ProductCard {
  constructor(title) {
    this.title = title;
  }

  getLabel() {
    return `product:${this.title}`;
  }
}

const card = new ProductCard("Chair");
console.log(card.getLabel());
console.log(card instanceof ProductCard);
```

### 运行方式

```bash
node 06-object-creation/classPreviewNew.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 07：操作符概述

### 结论

优先级决定分组，结合性决定同级分组方向，操作数通常从左到右求值。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
07-operator-overview/
  precedenceAssociativityDemo.js
  evaluationOrderDemo.js
  sideEffectOrderMistake.js
```

### 示例代码

#### 文件名：`07-operator-overview/precedenceAssociativityDemo.js`

```js
// Goal:
// Verify precedence, associativity, and evaluation order.

let traceText = "";

function readValue(label, value) {
  traceText += label;
  return value;
}

const arithmeticResult = 3 + 4 * 5;
const groupedResult = (3 + 4) * 5;
const assignmentTarget = { count: 0 };
let assignmentResult;

assignmentResult = assignmentTarget.count = readValue("A", 7);
const orderResult = readValue("B", 2) + readValue("C", 3) * readValue("D", 4);

console.log(arithmeticResult);
console.log(groupedResult);
console.log(assignmentResult);
console.log(assignmentTarget.count);
console.log(orderResult);
console.log(traceText);
```

### 运行方式

```bash
node 07-operator-overview/precedenceAssociativityDemo.js
```

### 示例代码

#### 文件名：`07-operator-overview/evaluationOrderDemo.js`

```js
// Goal:
// Verify left-to-right operand evaluation with nested operator grouping.

let traceText = "";

function mark(label, value) {
  traceText += label;
  return value;
}

const result = mark("A", 1) + mark("B", 2) * mark("C", 3);

console.log(result);
console.log(traceText);
```

### 运行方式

```bash
node 07-operator-overview/evaluationOrderDemo.js
```

### 示例代码

#### 文件名：`07-operator-overview/sideEffectOrderMistake.js`

```js
// Goal:
// Show why mixing update side effects in one expression is hard to read.

let counter = 1;
const mixedResult = counter++ + counter++;

console.log(mixedResult);
console.log(counter);
```

### 运行方式

```bash
node 07-operator-overview/sideEffectOrderMistake.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 08：算术表达式

### 结论

+ 可能做加法也可能做拼接；多数算术操作会触发数值转换。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
08-arithmetic-expressions/
  numericArithmeticDemo.js
  plusConversionDemo.js
  incrementDecrementDemo.js
  bitwiseIntegerCoercion.js
```

### 示例代码

#### 文件名：`08-arithmetic-expressions/numericArithmeticDemo.js`

```js
// Goal:
// Compare numeric arithmetic, string concatenation, increment, and BigInt arithmetic.

let pageIndex = 1;
const inputQuantity = "3";
const unitPrice = 20;

console.log(unitPrice * inputQuantity);
console.log(unitPrice + inputQuantity);
console.log(unitPrice + Number(inputQuantity));
console.log(2 ** 3);
console.log(7 % 3);
console.log(pageIndex++);
console.log(pageIndex);
console.log(1n + 2n);
```

### 运行方式

```bash
node 08-arithmetic-expressions/numericArithmeticDemo.js
```

### 示例代码

#### 文件名：`08-arithmetic-expressions/plusConversionDemo.js`

```js
// Goal:
// Verify how plus chooses numeric addition or string concatenation.

console.log(10 + 2);
console.log("10" + 2);
console.log(10 + "2");
console.log(Number("10") + 2);
console.log("10" - 2);
```

### 运行方式

```bash
node 08-arithmetic-expressions/plusConversionDemo.js
```

### 示例代码

#### 文件名：`08-arithmetic-expressions/incrementDecrementDemo.js`

```js
// Goal:
// Compare prefix and postfix increment results.

let firstCounter = 1;
let secondCounter = 1;

console.log(firstCounter++);
console.log(firstCounter);
console.log(++secondCounter);
console.log(secondCounter);
```

### 运行方式

```bash
node 08-arithmetic-expressions/incrementDecrementDemo.js
```

### 示例代码

#### 文件名：`08-arithmetic-expressions/bitwiseIntegerCoercion.js`

```js
// Goal:
// Verify that bitwise operators coerce Number values to 32-bit integers.

console.log(5.9 | 0);
console.log(-5.9 | 0);
console.log(8 & 3);
console.log(8 | 3);
console.log(~0);
```

### 运行方式

```bash
node 08-arithmetic-expressions/bitwiseIntegerCoercion.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 09：关系表达式

### 结论

关系表达式包含比较、属性存在性检测和原型链检测。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
09-relational-expressions/
  equalityComparisonDemo.js
  relationalConversionDemo.js
  inAndInstanceofDemo.js
  looseEqualityMistake.js
```

### 示例代码

#### 文件名：`09-relational-expressions/equalityComparisonDemo.js`

```js
// Goal:
// Compare strict equality, loose equality, relational comparison, in, and instanceof.

const quantityText = "5";
const quantityNumber = 5;
const productRecord = { name: "Lamp", stock: 0 };
const productList = ["Lamp"];

console.log(quantityText === quantityNumber);
console.log(quantityText == quantityNumber);
console.log("12" < "3");
console.log(Number("12") < Number("3"));
console.log("stock" in productRecord);
console.log("toString" in productRecord);
console.log(Object.hasOwn(productRecord, "toString"));
console.log(productList instanceof Array);
```

### 运行方式

```bash
node 09-relational-expressions/equalityComparisonDemo.js
```

### 示例代码

#### 文件名：`09-relational-expressions/relationalConversionDemo.js`

```js
// Goal:
// Compare string comparison and numeric comparison.

const firstPage = "12";
const secondPage = "3";

console.log(firstPage < secondPage);
console.log(Number(firstPage) < Number(secondPage));
console.log("apple" < "banana");
console.log("2" < 10);
```

### 运行方式

```bash
node 09-relational-expressions/relationalConversionDemo.js
```

### 示例代码

#### 文件名：`09-relational-expressions/inAndInstanceofDemo.js`

```js
// Goal:
// Compare in, Object.hasOwn, and instanceof.

function Product(title) {
  this.title = title;
}

Product.prototype.describe = function () {
  return this.title;
};

const product = new Product("Desk");

console.log("title" in product);
console.log("describe" in product);
console.log(Object.hasOwn(product, "describe"));
console.log(product instanceof Product);
```

### 运行方式

```bash
node 09-relational-expressions/inAndInstanceofDemo.js
```

### 示例代码

#### 文件名：`09-relational-expressions/looseEqualityMistake.js`

```js
// Goal:
// Show why loose equality can hide conversion rules.

console.log(0 == false);
console.log("" == false);
console.log([] == false);
console.log(null == undefined);
console.log(null === undefined);
```

### 运行方式

```bash
node 09-relational-expressions/looseEqualityMistake.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 10：逻辑表达式

### 结论

逻辑操作符会短路，并返回某个原始操作数值。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
10-logical-expressions/
  shortCircuitDemo.js
  nullishCoalescingDemo.js
  logicalAssignmentDemo.js
  falsyDefaultMistake.js
```

### 示例代码

#### 文件名：`10-logical-expressions/shortCircuitDemo.js`

```js
// Goal:
// Compare short-circuit behavior, || defaults, ?? defaults, and logical assignment.

const requestedPage = 0;
const missingPage = null;
let cacheConfig = { timeout: 0, retries: undefined };

function createFallbackPage() {
  console.log("fallback created");
  return 1;
}

console.log(requestedPage || createFallbackPage());
console.log(requestedPage ?? createFallbackPage());
console.log(missingPage ?? createFallbackPage());

cacheConfig.timeout ||= 30;
cacheConfig.retries ??= 3;

console.log(cacheConfig.timeout);
console.log(cacheConfig.retries);
console.log(false && createFallbackPage());
```

### 运行方式

```bash
node 10-logical-expressions/shortCircuitDemo.js
```

### 示例代码

#### 文件名：`10-logical-expressions/nullishCoalescingDemo.js`

```js
// Goal:
// Compare nullish coalescing with logical OR defaults.

const zeroCount = 0;
const emptyLabel = "";
const missingValue = undefined;

console.log(zeroCount || 10);
console.log(zeroCount ?? 10);
console.log(emptyLabel || "fallback");
console.log(emptyLabel ?? "fallback");
console.log(missingValue ?? "fallback");
```

### 运行方式

```bash
node 10-logical-expressions/nullishCoalescingDemo.js
```

### 示例代码

#### 文件名：`10-logical-expressions/logicalAssignmentDemo.js`

```js
// Goal:
// Verify ||=, &&=, and ??= assignment behavior.

const settings = {
  retries: 0,
  enabled: true,
  label: undefined,
};

settings.retries ||= 3;
settings.enabled &&= "active";
settings.label ??= "default";

console.log(settings.retries);
console.log(settings.enabled);
console.log(settings.label);
```

### 运行方式

```bash
node 10-logical-expressions/logicalAssignmentDemo.js
```

### 示例代码

#### 文件名：`10-logical-expressions/falsyDefaultMistake.js`

```js
// Goal:
// Show how || can incorrectly replace valid falsy values.

const productStock = 0;
const searchTerm = "";

console.log(productStock || 100);
console.log(productStock ?? 100);
console.log(searchTerm || "all");
console.log(searchTerm ?? "all");
```

### 运行方式

```bash
node 10-logical-expressions/falsyDefaultMistake.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 11：赋值表达式

### 结论

赋值会写入目标，并且表达式结果就是写入的值。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
11-assignment-expressions/
  compoundAssignmentDemo.js
  destructuringAssignmentPreview.js
  assignmentReturnsValue.js
```

### 示例代码

#### 文件名：`11-assignment-expressions/compoundAssignmentDemo.js`

```js
// Goal:
// Verify assignment values, compound assignment, and destructuring assignment.

let availableStock = 10;
let reservedStock = 0;
const inventoryRecord = { sku: "A100", count: 5 };

const assignedValue = (reservedStock = 3);
availableStock -= reservedStock;
inventoryRecord.count += 2;

let firstSku;
let secondSku;
[firstSku, secondSku] = ["A100", "B200"];

console.log(assignedValue);
console.log(reservedStock);
console.log(availableStock);
console.log(inventoryRecord.count);
console.log(firstSku);
console.log(secondSku);
```

### 运行方式

```bash
node 11-assignment-expressions/compoundAssignmentDemo.js
```

### 示例代码

#### 文件名：`11-assignment-expressions/destructuringAssignmentPreview.js`

```js
// Goal:
// Preview destructuring assignment for arrays and objects.

let firstItem;
let secondItem;
[firstItem, secondItem] = ["keyboard", "mouse"];

let productTitle;
({ title: productTitle } = { title: "Monitor" });

console.log(firstItem);
console.log(secondItem);
console.log(productTitle);
```

### 运行方式

```bash
node 11-assignment-expressions/destructuringAssignmentPreview.js
```

### 示例代码

#### 文件名：`11-assignment-expressions/assignmentReturnsValue.js`

```js
// Goal:
// Verify that assignment expressions evaluate to the written value.

let statusLabel;
const result = (statusLabel = "ready");

console.log(result);
console.log(statusLabel);

if ((statusLabel = "done")) {
  console.log(statusLabel);
}
```

### 运行方式

```bash
node 11-assignment-expressions/assignmentReturnsValue.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 12：eval 表达式

### 结论

eval 会执行字符串代码，工程中应默认避免。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
12-eval-expressions/
  directEvalRisk.js
  indirectEvalDifference.js
  saferPropertyLookup.js
```

### 示例代码

#### 文件名：`12-eval-expressions/directEvalRisk.js`

```js
// Goal:
// Show direct eval behavior without using untrusted input.

const localValue = 10;
const result = eval("localValue + 5");

console.log(result);
```

### 运行方式

```bash
node 12-eval-expressions/directEvalRisk.js
```

### 示例代码

#### 文件名：`12-eval-expressions/indirectEvalDifference.js`

```js
// Goal:
// Compare direct eval and indirect eval scope behavior.

globalThis.sharedEvalValue = 3;
const localValue = 7;

console.log(eval("localValue"));

try {
  console.log((0, eval)("localValue"));
} catch (error) {
  console.log(error.name);
}

console.log((0, eval)("globalThis.sharedEvalValue"));
```

### 运行方式

```bash
node 12-eval-expressions/indirectEvalDifference.js
```

### 示例代码

#### 文件名：`12-eval-expressions/saferPropertyLookup.js`

```js
// Goal:
// Show why object lookup is safer than eval for dynamic behavior.

const operationTable = {
  add(leftValue, rightValue) {
    return leftValue + rightValue;
  },
  multiply(leftValue, rightValue) {
    return leftValue * rightValue;
  },
};

const operationName = "multiply";
const selectedOperation = operationTable[operationName];

if (typeof selectedOperation !== "function") {
  throw new Error("Unknown operation");
}

console.log(selectedOperation(6, 7));
```

### 运行方式

```bash
node 12-eval-expressions/saferPropertyLookup.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 13：其他操作符

### 结论

条件、typeof、delete、void、逗号、await 都有明确返回值和副作用规则。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
13-other-operators/
  conditionalOperatorDemo.js
  typeofDeleteVoidCommaDemo.js
  awaitOperatorPreview.mjs
```

### 示例代码

#### 文件名：`13-other-operators/conditionalOperatorDemo.js`

```js
// Goal:
// Verify conditional, typeof, delete, void, and comma operators.

const permissionLevel = 2;
const accountRecord = { name: "Ava", temporaryToken: "token-1" };

const label = permissionLevel >= 2 ? "editor" : "viewer";
const deleteResult = delete accountRecord.temporaryToken;
const voidResult = void console.log("side effect from void");
const commaResult = (permissionLevel + 1, permissionLevel + 2, permissionLevel + 3);

console.log(label);
console.log(deleteResult);
console.log(accountRecord.temporaryToken);
console.log(voidResult);
console.log(commaResult);
console.log(typeof missingGlobalName);
```

### 运行方式

```bash
node 13-other-operators/conditionalOperatorDemo.js
```

### 示例代码

#### 文件名：`13-other-operators/typeofDeleteVoidCommaDemo.js`

```js
// Goal:
// Compare typeof, delete, void, and comma operator results.

const record = { token: "abc", count: 2 };

console.log(typeof record);
console.log(delete record.token);
console.log("token" in record);
console.log(void record.count);
console.log((record.count += 1, record.count += 1, record.count));
```

### 运行方式

```bash
node 13-other-operators/typeofDeleteVoidCommaDemo.js
```

### 示例代码

#### 文件名：`13-other-operators/awaitOperatorPreview.mjs`

```mjs
// Goal:
// Preview await as an expression in an ES module.

const resolvedValue = await Promise.resolve(42);

console.log(resolvedValue);
```

### 运行方式

```bash
node 13-other-operators/awaitOperatorPreview.mjs
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 14：表达式调试

### 结论

先区分语法错误、运行时错误和静态检查警告。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
14-expression-debugging/
  ideWarningPatterns.js
  syntaxRuntimeDifference.js
```

### 示例代码

#### 文件名：`14-expression-debugging/ideWarningPatterns.js`

```js
// Goal:
// Compare safe expression debugging patterns.

const apiResponse = {
  payload: null,
};

try {
  console.log(apiResponse.payload.title);
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(error.name);
}

console.log(apiResponse.payload?.title);
console.log(typeof missingRuntimeName);
```

### 运行方式

```bash
node 14-expression-debugging/ideWarningPatterns.js
```

### 示例代码

#### 文件名：`14-expression-debugging/syntaxRuntimeDifference.js`

```js
// Goal:
// Compare runtime SyntaxError from JSON.parse and runtime TypeError from property access.

try {
  JSON.parse("{bad json");
} catch (error) {
  console.log(error.name);
}

try {
  console.log(null.name);
} catch (error) {
  console.log(error.name);
}
```

### 运行方式

```bash
node 14-expression-debugging/syntaxRuntimeDifference.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 15：最终小项目：购物车报价表达式构建器

### 结论

用本章表达式和操作符构建一个纯数据报价器。

### 技术意义

这一节的训练目标是把第四章的表层语法落实到可运行文件中。你不要只看代码，要观察表达式求值结果、是否修改外部状态、是否触发类型转换，以及错误发生在语法阶段还是运行时阶段。

### 底层机制

运行时先求值子表达式，再根据对应表达式或操作符规则产生结果。若表达式包含赋值、函数调用、`delete`、`++`、对象属性写入等行为，它还会产生副作用。

### API / 语法规范

本节涉及的语法或 API 已在代码中直接演示。每个文件都可以独立运行，用来验证一个具体机制或常见错误。

### 文件结构

```txt
15-mini-project/
  cartQuoteBuilder.js
  cartQuoteBuilderMistakes.js
  cartQuoteBuilderChecklist.md
```

### 示例代码

#### 文件名：`15-mini-project/cartQuoteBuilder.js`

```js
// Goal:
// Build a cart quote by combining expressions and operators.

const cartRequest = {
  customer: {
    name: "Iris",
    tier: "gold",
  },
  items: [
    { sku: "K100", title: "Keyboard", unitPrice: 80, quantity: 1 },
    { sku: "M200", title: "Mouse", unitPrice: 25, quantity: 2 },
  ],
  coupon: {
    code: "SAVE10",
    discountRate: 0.1,
  },
  options: {
    taxRate: 0.0825,
    freeShippingThreshold: 100,
    shippingAmount: 12,
  },
};

const calculateSubtotal = function (items) {
  let subtotalAmount = 0;

  for (const cartItem of items) {
    subtotalAmount += cartItem.unitPrice * cartItem.quantity;
  }

  return subtotalAmount;
};

const buildQuote = function (request) {
  const items = request.items ?? [];
  const subtotalAmount = calculateSubtotal(items);
  const discountRate = request.coupon?.discountRate ?? 0;
  const discountAmount = subtotalAmount * discountRate;
  const taxableAmount = subtotalAmount - discountAmount;
  const taxRate = request.options?.taxRate ?? 0;
  const taxAmount = taxableAmount * taxRate;
  const threshold = request.options?.freeShippingThreshold ?? Infinity;
  const baseShipping = request.options?.shippingAmount ?? 0;
  const isGoldCustomer = request.customer?.tier === "gold";
  const shippingAmount = taxableAmount >= threshold || isGoldCustomer ? 0 : baseShipping;

  const quoteRecord = {
    customerName: request.customer?.name ?? "Guest",
    subtotalAmount,
    discountAmount,
    taxAmount,
    shippingAmount,
    totalAmount: taxableAmount + taxAmount + shippingAmount,
    createdAt: new Date("2026-05-29T09:00:00.000Z"),
    temporaryDebugValue: `${items.length}:${discountRate}`,
  };

  delete quoteRecord.temporaryDebugValue;

  return quoteRecord;
};

const quoteRecord = buildQuote(cartRequest);

console.log(quoteRecord.customerName);
console.log(quoteRecord.subtotalAmount);
console.log(quoteRecord.discountAmount);
console.log(quoteRecord.taxAmount);
console.log(quoteRecord.shippingAmount);
console.log(quoteRecord.totalAmount);
console.log(quoteRecord.createdAt.toISOString());
console.log("temporaryDebugValue" in quoteRecord);
```

### 运行方式

```bash
node 15-mini-project/cartQuoteBuilder.js
```

### 示例代码

#### 文件名：`15-mini-project/cartQuoteBuilderMistakes.js`

```js
// Goal:
// Show common expression and operator mistakes in a cart quote.

const brokenRequest = {
  customer: null,
  items: [{ unitPrice: "80", quantity: "2" }],
  options: {
    shippingAmount: 0,
  },
};

try {
  console.log(brokenRequest.customer.name);
} catch (error) {
  console.log(error.name);
}

const wrongShipping = brokenRequest.options.shippingAmount || 12;
const correctShipping = brokenRequest.options.shippingAmount ?? 12;

console.log(wrongShipping);
console.log(correctShipping);
console.log(brokenRequest.items[0].unitPrice + brokenRequest.items[0].quantity);
console.log(Number(brokenRequest.items[0].unitPrice) + Number(brokenRequest.items[0].quantity));
```

### 运行方式

```bash
node 15-mini-project/cartQuoteBuilderMistakes.js
```

### 执行过程

运行本节文件时，先确认每个表达式产生的值，再判断是否有副作用。对于名字包含 `Mistake`、`Risk`、`Difference` 的文件，要重点记录为什么代码虽然能运行，但表达式模型不适合真实项目。

### 和实际项目的关系

这些训练会直接迁移到 React JSX 表达式、事件处理器、props 默认值、表单值转换、API 响应读取、购物车价格计算、配置对象合并等场景。

### 常见错误

常见错误不是“不知道某个符号叫什么”，而是没有判断表达式的求值时机、返回值、类型转换和副作用。

### 最终记忆模型

```txt
expression syntax -> runtime evaluation -> value + optional side effect
```


## 8. 本章 API / 语法完整索引

| 类别 | 语法 / API | 返回值 | 关键机制 |
|---|---|---|---|
| 主表达式 | `literal`, `identifier`, `this` | 对应值 | 标识符需要环境查找。 |
| 数组初始化 | `[a, b]` | 新数组 | 每次求值创建新引用。 |
| 对象初始化 | `{ key: value }` | 新对象 | 属性值表达式会先求值。 |
| 函数表达式 | `function () {}`, `() => {}` | 函数对象 | 不调用就不执行函数体。 |
| 属性访问 | `obj.key`, `obj[key]`, `obj?.key` | 属性值或 `undefined` | 左侧为 `null` / `undefined` 时普通访问抛错。 |
| 调用表达式 | `fn(args)`, `obj.method(args)` | 返回值 | 方法调用影响 `this`。 |
| 对象创建 | `new Ctor(args)` | 新对象 | 创建对象、链接原型、绑定 `this`。 |
| 算术 | `+`, `-`, `*`, `/`, `%`, `**` | number / string / bigint | `+` 同时支持拼接。 |
| 关系 | `===`, `==`, `<`, `in`, `instanceof` | boolean | `==` 会转换，`in` 查原型链。 |
| 逻辑 | `&&`, `||`, `??`, `!` | 操作数或 boolean | 会短路；不一定返回 boolean。 |
| 赋值 | `=`, `+=`, `&&=`, `??=` | 写入值 | 赋值表达式有副作用。 |
| 其他 | `typeof`, `delete`, `void`, `,`, `await` | 各自规则 | 每个都有精确返回值。 |

---

## 9. 本章常见错误总表

| 错误 | 错误类型 | 违反的规则 | 正确判断方式 |
|---|---|---|---|
| `user.name`，但 `user` 是 `null` | 运行时错误 | 不能访问 `null` / `undefined` 的属性 | 先判断或用 `user?.name`。 |
| `price + input.value` 得到拼接 | 运行时逻辑错误 | `+` 遇到字符串可能拼接 | 用 `Number(input.value)` 并校验。 |
| `count || 10` 覆盖 `0` | 逻辑错误 | `||` 对所有 falsy 值生效 | 用 `count ?? 10`。 |
| `if (status = "ready")` | 逻辑错误 / IDE 警告 | 赋值表达式返回写入值 | 比较写 `status === "ready"`。 |
| `object.method` 拆出来调用丢 `this` | 运行时逻辑错误 | 方法调用的 `this` 来自调用形式 | 使用绑定、箭头包装或显式传对象。 |
| `["a", , "c"]` 当成显式 `undefined` | 结构理解错误 | 空位不是自有属性 | 用 `Object.hasOwn(array, index)` 检查。 |
| `"12" < "3"` 当数字比较 | 逻辑错误 | 两边都是字符串时按字符串比较 | 先显式转换。 |
| `"key" in object` 当自有属性检查 | 逻辑错误 | `in` 会查原型链 | 用 `Object.hasOwn()`。 |
| `eval(userInput)` | 安全错误 | 执行不可信字符串代码 | 用映射表或解析器。 |
| `a ?? b || c` 不加括号 | 语法错误 | `??` 不能直接和 `||` / `&&` 混写 | 写 `(a ?? b) || c`。 |

---

## 10. 最终小项目：购物车报价表达式构建器

### 项目目标

用第四章的表达式与操作符完成一个小型报价器。输入是模拟购物车请求对象，输出是报价对象。这个项目训练属性访问、可选链、空值合并、算术表达式、关系表达式、逻辑表达式、条件操作符、赋值表达式、对象初始化程序、函数表达式、`new` 表达式和 `delete` 操作符。

### 推荐文件结构

```txt
15-mini-project/
  cartQuoteBuilder.js
  cartQuoteBuilderMistakes.js
  cartQuoteBuilderChecklist.md
```

主文件和错误对比文件已经在 `15-mini-project` 小节给出。`cartQuoteBuilderChecklist.md` 应该记录：每个表达式的返回值、默认值规则、是否使用 `||` 或 `??`、金额是否经过显式转换、是否删除临时字段。

---

## 11. 额外 cheatsheet

本章必须配套单独 cheatsheet 文件：

```txt
javascript-chapter-04-expressions-operators-cheatsheet-zh-v1.md
```

它不是替代正文的学习材料，而是完成练习后的快速复习表。必须包含表达式类型速查、操作符签名、优先级和结合性记忆规则、常见错误和 MDN 官方文档链接。

---

## 12. 最终文件清单

```txt
javascript/
  chapter-04-expressions-operators/
    javascript-chapter-04-expressions-operators-learning-guide-zh-v1.md
    javascript-chapter-04-expressions-operators-cheatsheet-zh-v1.md
    README.md

    00-expression-value-model/
      expressionValuePipeline.js
      expressionStatementMistake.js

    01-primary-expressions/
      primaryExpressionDemo.js
      missingIdentifierReferenceError.js

    02-array-object-initializers/
      initializerEvaluationDemo.js
      sparseArrayMistake.js
      objectLiteralPropertyDemo.js

    03-function-expressions/
      functionExpressionDemo.js
      functionExpressionCallMistake.js
      arrowExpressionThisPreview.js

    04-property-access/
      dotBracketAccess.js
      optionalChainingAccess.js
      nullPropertyAccessMistake.js

    05-invocation-expressions/
      functionVsMethodCall.js
      thisBindingInCall.js
      optionalCallDemo.js

    06-object-creation/
      newExpressionDemo.js
      constructorReturnMistake.js
      classPreviewNew.js

    07-operator-overview/
      precedenceAssociativityDemo.js
      evaluationOrderDemo.js
      sideEffectOrderMistake.js

    08-arithmetic-expressions/
      numericArithmeticDemo.js
      plusConversionDemo.js
      incrementDecrementDemo.js
      bitwiseIntegerCoercion.js

    09-relational-expressions/
      equalityComparisonDemo.js
      relationalConversionDemo.js
      inAndInstanceofDemo.js
      looseEqualityMistake.js

    10-logical-expressions/
      shortCircuitDemo.js
      nullishCoalescingDemo.js
      logicalAssignmentDemo.js
      falsyDefaultMistake.js

    11-assignment-expressions/
      compoundAssignmentDemo.js
      destructuringAssignmentPreview.js
      assignmentReturnsValue.js

    12-eval-expressions/
      directEvalRisk.js
      indirectEvalDifference.js
      saferPropertyLookup.js

    13-other-operators/
      conditionalOperatorDemo.js
      typeofDeleteVoidCommaDemo.js
      awaitOperatorPreview.mjs

    14-expression-debugging/
      ideWarningPatterns.js
      syntaxRuntimeDifference.js

    15-mini-project/
      cartQuoteBuilder.js
      cartQuoteBuilderMistakes.js
      cartQuoteBuilderChecklist.md
```

### 最低完成标准

```txt
[x] 1 个学习指导文件
[x] 1 个 cheatsheet 文件
[x] 15 个训练目录
[x] 47 个可运行 .js / .mjs 文件
[x] 每个真实代码块上方都有对应文件名
[x] 1 个最终小项目目录
[x] 1 个小项目主文件
[x] 1 个小项目错误对比文件
[x] 1 个小项目检查清单
```

---

## 13. 最终学习笔记转换要求

把本指导文件整理成正式笔记时，不要照抄全部示例。最终笔记应该分成四层：

```txt
1. 表达式是什么：expression evaluates to value.
2. 操作符怎么工作：operand evaluation, precedence, associativity, side effects.
3. 哪些地方会隐式转换：+, arithmetic, relational, loose equality, logical defaults.
4. 工程上怎么避免错误：explicit conversion, strict equality, nullish defaults, optional access with validation.
```

每个主题至少保留一个正确代码片段、一个错误代码片段、一个执行过程和一个真实项目判断规则。不要把正式笔记写成操作符列表，操作符列表只放在附录或 cheatsheet。

---

## 14. 本章最终记忆模型

```txt
expression
  -> a JavaScript phrase that evaluates to a value

complex expression
  -> built from smaller expressions

operator
  -> combines operand values according to exact rules

property access
  -> evaluate object, compute key, read value

function call
  -> evaluate callee, evaluate arguments, execute body

method call
  -> function call plus this binding from base object

assignment
  -> write value and evaluate to written value

logical operators
  -> return operands and may short-circuit

safe project code
  -> explicit conversion, strict comparison, nullish defaults, clear grouping
```

第四章最终要形成一句话：

```txt
Every JavaScript expression has a value, a timing, and sometimes a side effect.
```

---

## 15. 官方文档阅读清单

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

## 16. 生成前自检清单

```txt
[x] 文件名保持不变
[x] 文档包含 ## 目录
[x] 推荐目录结构完整
[x] 运行清单包含全部代码文件
[x] 正文每个真实代码块上方都有文件名
[x] 正文代码块、目录树、运行清单、最终文件清单一致
[x] 最终小项目完整
[x] 额外 cheatsheet 已说明
[x] 代码注释全英文
[x] 代码变量名、函数名、类名全英文
[x] 没有把代码块写成中文注释
```
