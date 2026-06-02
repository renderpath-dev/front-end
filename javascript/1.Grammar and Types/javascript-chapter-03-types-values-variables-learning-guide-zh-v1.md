# JavaScript 第 3 章“类型、值和变量”学习指导文件 v1

> 定位：这是《JavaScript 权威指南》第 3 章“类型、值和变量”的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建目录、写 `.js` 文件、运行 Node、观察输出和错误，再把每节整理成正式学习笔记。  
> 参考范围：《JavaScript: The Definitive Guide, Seventh Edition》第 3 章、MDN JavaScript Guide / Reference 中的数据类型、Number、BigInt、String、Boolean、Symbol、Object、类型转换、`let` / `const` / `var` 文档。  
> 语言规则：正文使用中文；必要技术术语保留英文括号。  
> 代码规则：代码命名和代码注释统一英文；代码和代码注释不使用中文字符。  
> 学习原则：第三章不要学成“类型名称背诵表”。你要建立的是运行时值模型：值有什么类型、变量名如何绑定值、原始值和对象引用如何存储、转换规则如何触发、为什么某些比较和计算结果反直觉。

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
11. [最终小项目](#10-最终小项目checkout-value-normalizer)
12. [额外 cheatsheet](#11-额外-cheatsheet)
13. [最终文件清单](#12-最终文件清单)
14. [最终学习笔记转换要求](#13-最终学习笔记转换要求)
15. [本章最终记忆模型](#14-本章最终记忆模型)
16. [官方文档阅读清单](#15-官方文档阅读清单)
17. [生成前自检清单](#16-生成前自检清单)

---

## 0. 文件定位

### 结论

本文件是训练型指导文件。它的作用不是替你写最终笔记，而是规定你第三章应该创建哪些练习文件、运行哪些代码、观察哪些输出、刻意制造哪些错误，并把运行时机制讲清楚。

第三章的核心问题只有一个：

```txt
When JavaScript code runs, what kind of value is stored, how is it referenced, and when is it converted?
```

### 你要完成的动作

1. 在项目中创建第三章目录。
2. 按照推荐目录结构创建每个训练子目录。
3. 逐个写入 `.js` 文件。
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

学完第三章，你必须能清楚区分五件事：

```txt
value
  -> a runtime piece of data

type
  -> the category of a runtime value

variable binding
  -> a name that refers to a value

primitive value
  -> immutable value stored and compared by value

object reference
  -> mutable object accessed through a reference
```

### 技术意义

前端开发中几乎所有问题都会回到第三章：

- 表单输入为什么永远先是字符串（string）？
- `Number(input.value)` 为什么可能得到 `NaN`？
- React state 里改对象为什么可能不触发你预期的更新？
- `const user = {}` 为什么对象内部还能改？
- API 返回的 JSON 为什么不能直接相信类型？
- `null` 和 `undefined` 为什么要区别处理？
- `0.1 + 0.2` 为什么不是精确的 `0.3`？
- `[] == false` 为什么会产生反直觉结果？

这些不是语法问题，是运行时值模型（runtime value model）问题。

---

## 2. 本章学习顺序

### 结论

本章按这个顺序学：

```txt
chapter map
  -> type taxonomy
  -> number literals and arithmetic
  -> floating point precision
  -> BigInt
  -> string literals and operations
  -> primitive wrapper behavior
  -> boolean and truthiness
  -> null and undefined
  -> Symbol
  -> global object
  -> primitive immutability vs object reference mutability
  -> explicit conversion
  -> implicit conversion
  -> equality and Object.is
  -> let, const, var, assignment
  -> mini project
```

### 为什么这样排

先建立类型分类，再看每个原始类型；先看原始值，再看对象引用；先看显式转换，再看隐式转换；最后才看变量声明，因为变量声明真正绑定的是前面这些运行时值。

---

## 3. 本章核心术语表

| 术语 | 英文 | 本章中的精确定义 |
|---|---|---|
| 值 | value | 程序运行时可以操作的数据本身。 |
| 类型 | type | 值所属的运行时类别。 |
| 原始值 | primitive value | 不可修改（immutable）的非对象值。 |
| 对象 | object | 可修改（mutable）的属性集合，函数和数组也是对象。 |
| 变量 | variable | 通过名字引用某个值的绑定（binding）。 |
| 绑定 | binding | 名字和当前值之间的关联。 |
| 字面量 | literal | 直接写在代码里的值表达形式。 |
| 数值 | number | JavaScript 的双精度浮点数类型。 |
| 大整数 | BigInt | 用来表示任意精度整数的原始类型。 |
| 字符串 | string | 不可修改的文本序列。 |
| 布尔值 | boolean | `true` 或 `false`。 |
| 空值 | null | 表示“这里故意没有对象值”。 |
| 未定义值 | undefined | 表示“这里没有被赋值或没有这个结果”。 |
| 符号 | Symbol | 唯一且不可重复的原始值，常用于属性键。 |
| 类型转换 | type conversion | 把一个类型的值转换成另一个类型的值。 |
| 类型强制转换 | type coercion | JavaScript 自动触发的隐式类型转换。 |
| 真值性 | truthiness | 非布尔值在布尔上下文中被当作 `true` 或 `false` 的行为。 |
| 对象到原始值转换 | object-to-primitive conversion | 对象参与字符串、数值或默认上下文运算时调用的转换机制。 |
| 暂时性死区 | temporal dead zone | `let` / `const` 声明前不能访问该绑定的区域。 |

---

## 4. 本章底层模型

### 结论

JavaScript 程序运行时不是“变量有类型”，而是“值有类型，变量名绑定到值”。

```txt
identifier
  -> binding
  -> runtime value
  -> runtime type
```

### 技术意义

同一个变量绑定可以先指向 number，再重新指向 string。JavaScript 运行时不会阻止这种重新绑定；TypeScript 才会在静态类型层面限制这种变化。

### 底层机制图

```txt
primitive path:
  let amount = 100
  amount binding -> Number value 100
  reassignment changes the binding

object path:
  const cart = { total: 100 }
  cart binding -> reference -> object in memory
  property mutation changes the object, not the binding
```

### 和当前学习主题的关系

你后面学 React、TypeScript、Node、Next.js，都离不开这个模型：React state 更新依赖引用是否变化；TypeScript 类型检查是在运行前分析值的可能形状；Node 接收到的 HTTP 请求 body 是运行时数据；Next.js 页面参数、URL query、表单值都需要从字符串或 unknown 边界转换成业务值。

---

## 5. 推荐目录结构

### 结论

建议把第三章单独放进一个章节目录。不要把练习文件散落到项目根目录。

```txt
javascript/chapter-03-types-values-variables/
  javascript-chapter-03-types-values-variables-learning-guide-zh-v1.md
  javascript-chapter-03-types-values-variables-cheatsheet-zh-v1.md
  README.md

  00-chapter-map/
    chapterMap.js

  01-type-taxonomy/
    primitiveAndObjectTypes.js
    typeofResultTable.js
    typeTaxonomyMistakes.js

  02-number-literals-arithmetic/
    numericLiteralForms.js
    arithmeticSpecialValues.js
    numberMethodBoundary.js
    numberMistakes.js

  03-floating-point-precision/
    floatingPointPrecision.js
    epsilonComparison.js
    moneyPrecisionMistake.js

  04-bigint-integers/
    bigintBasics.js
    safeIntegerBoundary.js
    bigintMixingMistake.js

  05-string-text/
    stringLiteralForms.js
    stringLengthAndIndex.js
    stringMethodReturnValues.js
    stringMistakes.js

  06-primitive-wrapper/
    temporaryWrapperObject.js
    primitivePropertyMistake.js
    wrapperObjectComparison.js

  07-boolean-truthiness/
    booleanConversion.js
    falsyValuesTable.js
    truthyObjectMistake.js

  08-null-undefined/
    nullUndefinedBoundary.js
    missingPropertyAndVoidReturn.js
    nullishCoalescingPreview.js
    nullUndefinedMistakes.js

  09-symbol/
    symbolIdentity.js
    symbolPropertyKey.js
    globalSymbolRegistry.js
    symbolMistakes.js

  10-global-object/
    globalObjectOverview.js
    globalThisDemo.js
    globalVariableMistake.js

  11-primitive-vs-reference/
    primitiveAssignment.js
    objectReferenceAssignment.js
    constBindingObjectMutation.js
    referenceMistakes.js

  12-explicit-conversion/
    numberStringBooleanConversion.js
    parseIntParseFloat.js
    conversionTable.js
    explicitConversionMistakes.js

  13-implicit-conversion/
    plusOperatorConversion.js
    comparisonConversion.js
    objectToPrimitiveConversion.js
    implicitConversionMistakes.js

  14-equality-comparison/
    strictEquality.js
    looseEqualityTrap.js
    objectIsComparison.js
    equalityMistakes.js

  15-variable-declarations/
    letConstVarScope.js
    temporalDeadZone.js
    assignmentAndDestructuringPreview.js
    declarationMistakes.js

  16-mini-project/
    checkoutValueNormalizer.js
    checkoutValueNormalizerMistakes.js
    checkoutValueNormalizerChecklist.md```

---

## 6. 运行方式

### 环境要求

建议使用 Node.js 20 LTS 或更新版本。第三章练习只依赖核心 JavaScript，不需要安装第三方包。

### 单个文件运行

```bash
node 01-type-taxonomy/primitiveAndObjectTypes.js
```

### 批量运行清单

在 `javascript/chapter-03-types-values-variables/` 目录下运行：

```bash
node 00-chapter-map/chapterMap.js
node 01-type-taxonomy/primitiveAndObjectTypes.js
node 01-type-taxonomy/typeofResultTable.js
node 01-type-taxonomy/typeTaxonomyMistakes.js
node 02-number-literals-arithmetic/numericLiteralForms.js
node 02-number-literals-arithmetic/arithmeticSpecialValues.js
node 02-number-literals-arithmetic/numberMethodBoundary.js
node 02-number-literals-arithmetic/numberMistakes.js
node 03-floating-point-precision/floatingPointPrecision.js
node 03-floating-point-precision/epsilonComparison.js
node 03-floating-point-precision/moneyPrecisionMistake.js
node 04-bigint-integers/bigintBasics.js
node 04-bigint-integers/safeIntegerBoundary.js
node 04-bigint-integers/bigintMixingMistake.js
node 05-string-text/stringLiteralForms.js
node 05-string-text/stringLengthAndIndex.js
node 05-string-text/stringMethodReturnValues.js
node 05-string-text/stringMistakes.js
node 06-primitive-wrapper/temporaryWrapperObject.js
node 06-primitive-wrapper/primitivePropertyMistake.js
node 06-primitive-wrapper/wrapperObjectComparison.js
node 07-boolean-truthiness/booleanConversion.js
node 07-boolean-truthiness/falsyValuesTable.js
node 07-boolean-truthiness/truthyObjectMistake.js
node 08-null-undefined/nullUndefinedBoundary.js
node 08-null-undefined/missingPropertyAndVoidReturn.js
node 08-null-undefined/nullishCoalescingPreview.js
node 08-null-undefined/nullUndefinedMistakes.js
node 09-symbol/symbolIdentity.js
node 09-symbol/symbolPropertyKey.js
node 09-symbol/globalSymbolRegistry.js
node 09-symbol/symbolMistakes.js
node 10-global-object/globalObjectOverview.js
node 10-global-object/globalThisDemo.js
node 10-global-object/globalVariableMistake.js
node 11-primitive-vs-reference/primitiveAssignment.js
node 11-primitive-vs-reference/objectReferenceAssignment.js
node 11-primitive-vs-reference/constBindingObjectMutation.js
node 11-primitive-vs-reference/referenceMistakes.js
node 12-explicit-conversion/numberStringBooleanConversion.js
node 12-explicit-conversion/parseIntParseFloat.js
node 12-explicit-conversion/conversionTable.js
node 12-explicit-conversion/explicitConversionMistakes.js
node 13-implicit-conversion/plusOperatorConversion.js
node 13-implicit-conversion/comparisonConversion.js
node 13-implicit-conversion/objectToPrimitiveConversion.js
node 13-implicit-conversion/implicitConversionMistakes.js
node 14-equality-comparison/strictEquality.js
node 14-equality-comparison/looseEqualityTrap.js
node 14-equality-comparison/objectIsComparison.js
node 14-equality-comparison/equalityMistakes.js
node 15-variable-declarations/letConstVarScope.js
node 15-variable-declarations/temporalDeadZone.js
node 15-variable-declarations/assignmentAndDestructuringPreview.js
node 15-variable-declarations/declarationMistakes.js
node 16-mini-project/checkoutValueNormalizer.js
node 16-mini-project/checkoutValueNormalizerMistakes.js```

### 故意错误文件运行方式

名字包含 `Mistake` / `Mistakes` 的文件不是为了“完全正确”，而是为了观察错误模型。多数文件用 `try...catch` 捕获错误，方便你看到错误类型并继续运行。

---

## 7. 分节训练内容

每一节都按同一顺序训练：先读结论，再创建文件，再手写代码，再运行，再解释输出，再把错误模型整理进最终笔记。

## 00：第三章地图

### 结论

第三章研究 JavaScript 的运行时值模型：值、类型、变量绑定和转换规则。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

建立总览：变量名绑定到运行时值，值有类型，转换会在边界处发生。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

无。

### 文件结构

```txt
00-chapter-map/
  chapterMap.js
```

### 示例代码

#### 文件名：`00-chapter-map/chapterMap.js`

```js
// Goal:
// Show the chapter map from value to binding and conversion.

// Expected output:
// number
// string
// object
// true

let inventoryCount = 12;
let inventoryLabel = "12";
const productRecord = { id: "p1", stock: 12 };

console.log(typeof inventoryCount);
console.log(typeof inventoryLabel);
console.log(typeof productRecord);
console.log(Number(inventoryLabel) === inventoryCount);
```

### 运行方式

```bash
node 00-chapter-map/chapterMap.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
建立总览：变量名绑定到运行时值，值有类型，转换会在边界处发生。
```

---

## 01：类型分类

### 结论

JavaScript 的值分为原始类型和对象类型，`typeof` 只能提供第一层检查。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

`typeof null` 是历史遗留特殊结果；函数对象返回 `function`；数组仍然属于对象。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
typeof value
Object.hasOwn(object, propertyKey)
Array.isArray(value)
```

### 文件结构

```txt
01-type-taxonomy/
  primitiveAndObjectTypes.js
  typeofResultTable.js
  typeTaxonomyMistakes.js
```

### 示例代码

#### 文件名：`01-type-taxonomy/primitiveAndObjectTypes.js`

```js
// Goal:
// Compare primitive values and object values.

// Expected output:
// number
// string
// boolean
// undefined
// object
// symbol
// bigint
// object
// function

const productPrice = 99;
const productTitle = "Keyboard";
const isAvailable = true;
let selectedVariant;
const emptySelection = null;
const productToken = Symbol("product");
const orderId = 9007199254740993n;
const productRecord = { id: "p1" };
const calculateTotal = function calculateTotal() {
  return productPrice;
};

console.log(typeof productPrice);
console.log(typeof productTitle);
console.log(typeof isAvailable);
console.log(typeof selectedVariant);
console.log(typeof emptySelection);
console.log(typeof productToken);
console.log(typeof orderId);
console.log(typeof productRecord);
console.log(typeof calculateTotal);
```

#### 文件名：`01-type-taxonomy/typeofResultTable.js`

```js
// Goal:
// Print the important typeof results in one table.

// Expected output:
// See the printed table.

const values = [
  ["undefined", undefined],
  ["null", null],
  ["boolean", true],
  ["number", 42],
  ["bigint", 42n],
  ["string", "text"],
  ["symbol", Symbol("id")],
  ["object", { id: "p1" }],
  ["array", ["p1", "p2"]],
  ["function", function readProduct() {}],
];

for (const [label, value] of values) {
  console.log(`${label}: ${typeof value}`);
}
```

#### 文件名：`01-type-taxonomy/typeTaxonomyMistakes.js`

```js
// Goal:
// Show why typeof null cannot be used as the only object test.

// Expected output:
// object
// true
// false

const selectedProduct = null;

console.log(typeof selectedProduct);
console.log(selectedProduct === null);
console.log(typeof selectedProduct === "object" && selectedProduct !== null);
```

### 运行方式

```bash
node 01-type-taxonomy/primitiveAndObjectTypes.js
node 01-type-taxonomy/typeofResultTable.js
node 01-type-taxonomy/typeTaxonomyMistakes.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
`typeof null` 是历史遗留特殊结果；函数对象返回 `function`；数组仍然属于对象。
```

---

## 02：Number 字面量与算术

### 结论

普通数值使用 number，特殊结果包括 `Infinity`、`-Infinity` 和 `NaN`。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

number 是双精度浮点数；判断 `NaN` 必须用 `Number.isNaN()`。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
Number.isNaN(value)
Number.isFinite(value)
Number.isInteger(value)
Number.isSafeInteger(value)
Number.MAX_SAFE_INTEGER
Number.MIN_SAFE_INTEGER
```

### 文件结构

```txt
02-number-literals-arithmetic/
  numericLiteralForms.js
  arithmeticSpecialValues.js
  numberMethodBoundary.js
  numberMistakes.js
```

### 示例代码

#### 文件名：`02-number-literals-arithmetic/numericLiteralForms.js`

```js
// Goal:
// Show common numeric literal forms.

// Expected output:
// 255
// 10
// 493
// 602000000000000000000000

const hexColorByte = 0xff;
const binaryPermission = 0b1010;
const octalPermission = 0o755;
const avogadroApproximation = 6.02e23;

console.log(hexColorByte);
console.log(binaryPermission);
console.log(octalPermission);
console.log(avogadroApproximation);
```

#### 文件名：`02-number-literals-arithmetic/arithmeticSpecialValues.js`

```js
// Goal:
// Show Infinity, -Infinity, and NaN.

// Expected output:
// Infinity
// -Infinity
// NaN
// true
// false

console.log(1 / 0);
console.log(-1 / 0);
console.log(0 / 0);
console.log(Number.isNaN(0 / 0));
console.log((0 / 0) === NaN);
```

#### 文件名：`02-number-literals-arithmetic/numberMethodBoundary.js`

```js
// Goal:
// Check finite numbers, integers, and safe integers.

// Expected output:
// true
// false
// true
// false
// true
// false

console.log(Number.isFinite(12));
console.log(Number.isFinite(Infinity));
console.log(Number.isInteger(12));
console.log(Number.isInteger(12.5));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1));
```

#### 文件名：`02-number-literals-arithmetic/numberMistakes.js`

```js
// Goal:
// Show why NaN cannot be compared with itself.

// Expected output:
// false
// true

const invalidQuantity = Number("not-a-number");

console.log(invalidQuantity === NaN);
console.log(Number.isNaN(invalidQuantity));
```

### 运行方式

```bash
node 02-number-literals-arithmetic/numericLiteralForms.js
node 02-number-literals-arithmetic/arithmeticSpecialValues.js
node 02-number-literals-arithmetic/numberMethodBoundary.js
node 02-number-literals-arithmetic/numberMistakes.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
number 是双精度浮点数；判断 `NaN` 必须用 `Number.isNaN()`。
```

---

## 03：二进制浮点数与精度

### 结论

小数计算可能出现精度误差，金额应优先用整数分保存。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

浮点比较需要容差；财务金额不要依赖十进制小数精确相加。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
Number.EPSILON
Math.abs(value)
```

### 文件结构

```txt
03-floating-point-precision/
  floatingPointPrecision.js
  epsilonComparison.js
  moneyPrecisionMistake.js
```

### 示例代码

#### 文件名：`03-floating-point-precision/floatingPointPrecision.js`

```js
// Goal:
// Show floating point precision error.

// Expected output:
// 0.30000000000000004
// false

const calculatedTotal = 0.1 + 0.2;
const expectedTotal = 0.3;

console.log(calculatedTotal);
console.log(calculatedTotal === expectedTotal);
```

#### 文件名：`03-floating-point-precision/epsilonComparison.js`

```js
// Goal:
// Compare floating point values with a tolerance.

// Expected output:
// true

const calculatedTotal = 0.1 + 0.2;
const expectedTotal = 0.3;
const isCloseEnough = Math.abs(calculatedTotal - expectedTotal) < Number.EPSILON;

console.log(isCloseEnough);
```

#### 文件名：`03-floating-point-precision/moneyPrecisionMistake.js`

```js
// Goal:
// Show why integer cents are safer than decimal money values.

// Expected output:
// 0.30000000000000004
// 30
// 0.3

const decimalTotal = 0.1 + 0.2;
const firstPaymentCents = 10;
const secondPaymentCents = 20;
const totalCents = firstPaymentCents + secondPaymentCents;

console.log(decimalTotal);
console.log(totalCents);
console.log(totalCents / 100);
```

### 运行方式

```bash
node 03-floating-point-precision/floatingPointPrecision.js
node 03-floating-point-precision/epsilonComparison.js
node 03-floating-point-precision/moneyPrecisionMistake.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
浮点比较需要容差；财务金额不要依赖十进制小数精确相加。
```

---

## 04：BigInt 与安全整数边界

### 结论

BigInt 用于精确大整数，不能和 number 在算术运算中直接混用。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

number 只在安全整数范围内可靠；超大 ID 在前端经常应该保留为 string。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
BigInt(value)
123n
Number.isSafeInteger(value)
```

### 文件结构

```txt
04-bigint-integers/
  bigintBasics.js
  safeIntegerBoundary.js
  bigintMixingMistake.js
```

### 示例代码

#### 文件名：`04-bigint-integers/bigintBasics.js`

```js
// Goal:
// Show BigInt identity and safe integer boundaries.

// Expected output:
// bigint
// 9007199254740993
// false
// true

const unsafeNumberId = 9007199254740993;
const preciseBigIntId = 9007199254740993n;

console.log(typeof preciseBigIntId);
console.log(preciseBigIntId.toString());
console.log(Number.isSafeInteger(unsafeNumberId));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
```

#### 文件名：`04-bigint-integers/safeIntegerBoundary.js`

```js
// Goal:
// Show that numbers beyond the safe integer boundary can lose precision.

// Expected output:
// true
// false
// true

const safeId = Number.MAX_SAFE_INTEGER;
const unsafeId = Number.MAX_SAFE_INTEGER + 1;
const nextUnsafeId = Number.MAX_SAFE_INTEGER + 2;

console.log(Number.isSafeInteger(safeId));
console.log(Number.isSafeInteger(unsafeId));
console.log(unsafeId === nextUnsafeId);
```

#### 文件名：`04-bigint-integers/bigintMixingMistake.js`

```js
// Goal:
// Verify that BigInt and Number cannot be mixed in arithmetic.

// Expected output:
// TypeError
// 12

const stockCount = 10n;
const addedCount = 2;

try {
  console.log(stockCount + addedCount);
} catch (error) {
  console.log(error.constructor.name);
}

console.log(stockCount + BigInt(addedCount));
```

### 运行方式

```bash
node 04-bigint-integers/bigintBasics.js
node 04-bigint-integers/safeIntegerBoundary.js
node 04-bigint-integers/bigintMixingMistake.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
number 只在安全整数范围内可靠；超大 ID 在前端经常应该保留为 string。
```

---

## 05：字符串与文本

### 结论

字符串是不可修改的原始值，字符串方法返回新字符串。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

字符串可以按索引读取，但不能原地修改；`length` 基于 UTF-16 code units。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
string.length
string[index]
string.includes(searchString)
string.slice(start, end)
string.trim()
string.toLowerCase()
string.toUpperCase()
```

### 文件结构

```txt
05-string-text/
  stringLiteralForms.js
  stringLengthAndIndex.js
  stringMethodReturnValues.js
  stringMistakes.js
```

### 示例代码

#### 文件名：`05-string-text/stringLiteralForms.js`

```js
// Goal:
// Show string literals and template literals.

// Expected output:
// Product: Keyboard
// Keyboard
// Keyboard is available

const singleQuotedTitle = 'Keyboard';
const doubleQuotedTitle = "Keyboard";
const templateMessage = `Product: ${singleQuotedTitle}`;
const multilineMessage = `Keyboard is
available`;

console.log(templateMessage);
console.log(doubleQuotedTitle);
console.log(multilineMessage.replace("\n", " "));
```

#### 文件名：`05-string-text/stringLengthAndIndex.js`

```js
// Goal:
// Show string length and index access.

// Expected output:
// 8
// K
// d
// undefined

const productTitle = "Keyboard";

console.log(productTitle.length);
console.log(productTitle[0]);
console.log(productTitle[7]);
console.log(productTitle[8]);
```

#### 文件名：`05-string-text/stringMethodReturnValues.js`

```js
// Goal:
// Show that string methods return new strings.

// Expected output:
// keyboard
// Keyboard
// true
// Key
// Keyboard

const productTitle = "Keyboard";
const normalizedTitle = productTitle.toLowerCase();

console.log(normalizedTitle);
console.log(productTitle);
console.log(productTitle.includes("board"));
console.log(productTitle.slice(0, 3));
console.log("  Keyboard  ".trim());
```

#### 文件名：`05-string-text/stringMistakes.js`

```js
// Goal:
// Show that strings cannot be mutated by index assignment.

// Expected output:
// Keyboard

let productTitle = "Keyboard";
productTitle[0] = "k";

console.log(productTitle);
```

### 运行方式

```bash
node 05-string-text/stringLiteralForms.js
node 05-string-text/stringLengthAndIndex.js
node 05-string-text/stringMethodReturnValues.js
node 05-string-text/stringMistakes.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
字符串可以按索引读取，但不能原地修改；`length` 基于 UTF-16 code units。
```

---

## 06：原始值包装对象

### 结论

原始值能访问方法是因为临时包装对象，不代表原始值可保存属性。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

避免 `new String()`、`new Number()`、`new Boolean()`；它们会制造对象 truthiness 陷阱。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
String(value)
Number(value)
Boolean(value)
new String(value)
new Number(value)
new Boolean(value)
```

### 文件结构

```txt
06-primitive-wrapper/
  temporaryWrapperObject.js
  primitivePropertyMistake.js
  wrapperObjectComparison.js
```

### 示例代码

#### 文件名：`06-primitive-wrapper/temporaryWrapperObject.js`

```js
// Goal:
// Show temporary wrapper behavior for primitive strings.

// Expected output:
// KEYBOARD
// undefined

const productTitle = "Keyboard";

productTitle.category = "input-device";

console.log(productTitle.toUpperCase());
console.log(productTitle.category);
```

#### 文件名：`06-primitive-wrapper/primitivePropertyMistake.js`

```js
// Goal:
// Show that assigning a property to a primitive value is not persistent.

// Expected output:
// undefined
// undefined

const orderCode = "A100";

orderCode.owner = "Mira";

console.log(orderCode.owner);
console.log("A100".owner);
```

#### 文件名：`06-primitive-wrapper/wrapperObjectComparison.js`

```js
// Goal:
// Compare primitive strings with String wrapper objects.

// Expected output:
// string
// object
// false
// true
// entered

const primitiveTitle = "Keyboard";
const wrapperTitle = new String("Keyboard");
const disabledFlag = new Boolean(false);

console.log(typeof primitiveTitle);
console.log(typeof wrapperTitle);
console.log(primitiveTitle === wrapperTitle);
console.log(primitiveTitle == wrapperTitle);

if (disabledFlag) {
  console.log("entered");
}
```

### 运行方式

```bash
node 06-primitive-wrapper/temporaryWrapperObject.js
node 06-primitive-wrapper/primitivePropertyMistake.js
node 06-primitive-wrapper/wrapperObjectComparison.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
避免 `new String()`、`new Number()`、`new Boolean()`；它们会制造对象 truthiness 陷阱。
```

---

## 07：Boolean 与 truthiness

### 结论

条件判断使用 truthiness，不等于业务上的“存在”。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

falsy 包括 `false`、`0`、`-0`、`0n`、`""`、`null`、`undefined`、`NaN`；对象永远 truthy。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
Boolean(value)
!!value
if (condition) statement
```

### 文件结构

```txt
07-boolean-truthiness/
  booleanConversion.js
  falsyValuesTable.js
  truthyObjectMistake.js
```

### 示例代码

#### 文件名：`07-boolean-truthiness/booleanConversion.js`

```js
// Goal:
// Show Boolean conversion for common values.

// Expected output:
// false
// false
// false
// false
// false
// false
// true
// true

console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(-0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean([]));
console.log(Boolean({}));
```

#### 文件名：`07-boolean-truthiness/falsyValuesTable.js`

```js
// Goal:
// Print every common falsy value.

// Expected output:
// false: false
// 0: false
// -0: false
// 0n: false
// empty string: false
// null: false
// undefined: false
// NaN: false

const falsyValues = [
  ["false", false],
  ["0", 0],
  ["-0", -0],
  ["0n", 0n],
  ["empty string", ""],
  ["null", null],
  ["undefined", undefined],
  ["NaN", NaN],
];

for (const [label, value] of falsyValues) {
  console.log(`${label}: ${Boolean(value)}`);
}
```

#### 文件名：`07-boolean-truthiness/truthyObjectMistake.js`

```js
// Goal:
// Show that empty objects and empty arrays are truthy.

// Expected output:
// array entered
// object entered

const emptyList = [];
const emptyRecord = {};

if (emptyList) {
  console.log("array entered");
}

if (emptyRecord) {
  console.log("object entered");
}
```

### 运行方式

```bash
node 07-boolean-truthiness/booleanConversion.js
node 07-boolean-truthiness/falsyValuesTable.js
node 07-boolean-truthiness/truthyObjectMistake.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
falsy 包括 `false`、`0`、`-0`、`0n`、`""`、`null`、`undefined`、`NaN`；对象永远 truthy。
```

---

## 08：null 与 undefined

### 结论

`undefined` 常来自默认缺失，`null` 常表示主动设置为空。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

`??` 只处理 nullish；`||` 会覆盖所有 falsy，包括合法的 `0` 和空字符串。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
undefined
null
value ?? fallback
value == null
value === undefined
value === null
```

### 文件结构

```txt
08-null-undefined/
  nullUndefinedBoundary.js
  missingPropertyAndVoidReturn.js
  nullishCoalescingPreview.js
  nullUndefinedMistakes.js
```

### 示例代码

#### 文件名：`08-null-undefined/nullUndefinedBoundary.js`

```js
// Goal:
// Distinguish undefined from null.

// Expected output:
// undefined
// undefined
// object
// fallback
// 0

let selectedSize;
const productRecord = { title: "Keyboard", discount: null, stock: 0 };

console.log(selectedSize);
console.log(productRecord.missingField);
console.log(typeof productRecord.discount);
console.log(productRecord.discount ?? "fallback");
console.log(productRecord.stock ?? 10);
```

#### 文件名：`08-null-undefined/missingPropertyAndVoidReturn.js`

```js
// Goal:
// Show common sources of undefined.

// Expected output:
// undefined
// undefined
// undefined

const orderRecord = { id: "o1" };

function saveDraft() {}

console.log(orderRecord.customerName);
console.log(saveDraft());
console.log(void 0);
```

#### 文件名：`08-null-undefined/nullishCoalescingPreview.js`

```js
// Goal:
// Compare nullish coalescing with logical OR.

// Expected output:
// 10
// 0
// fallback
// fallback

const stockCount = 0;
const couponCode = "";

console.log(stockCount || 10);
console.log(stockCount ?? 10);
console.log(couponCode || "fallback");
console.log(null ?? "fallback");
```

#### 文件名：`08-null-undefined/nullUndefinedMistakes.js`

```js
// Goal:
// Show why null property access fails and optional chaining short-circuits.

// Expected output:
// TypeError
// undefined

const selectedProduct = null;

try {
  console.log(selectedProduct.title);
} catch (error) {
  console.log(error.constructor.name);
}

console.log(selectedProduct?.title);
```

### 运行方式

```bash
node 08-null-undefined/nullUndefinedBoundary.js
node 08-null-undefined/missingPropertyAndVoidReturn.js
node 08-null-undefined/nullishCoalescingPreview.js
node 08-null-undefined/nullUndefinedMistakes.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
`??` 只处理 nullish；`||` 会覆盖所有 falsy，包括合法的 `0` 和空字符串。
```

---

## 09：Symbol

### 结论

Symbol 是唯一原始值，可作为不冲突的属性键。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

Symbol 描述文本不是身份；隐式字符串拼接 Symbol 会抛错。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
Symbol(description)
Symbol.for(key)
Symbol.keyFor(symbol)
Symbol.toPrimitive
Symbol.iterator
```

### 文件结构

```txt
09-symbol/
  symbolIdentity.js
  symbolPropertyKey.js
  globalSymbolRegistry.js
  symbolMistakes.js
```

### 示例代码

#### 文件名：`09-symbol/symbolIdentity.js`

```js
// Goal:
// Show Symbol identity.

// Expected output:
// false
// symbol
// Symbol(product)

const firstToken = Symbol("product");
const secondToken = Symbol("product");

console.log(firstToken === secondToken);
console.log(typeof firstToken);
console.log(String(firstToken));
```

#### 文件名：`09-symbol/symbolPropertyKey.js`

```js
// Goal:
// Use a Symbol as a property key.

// Expected output:
// Keyboard
// secret
// undefined
// 1

const internalCodeKey = Symbol("internalCode");

const productRecord = {
  title: "Keyboard",
  [internalCodeKey]: "secret",
};

console.log(productRecord.title);
console.log(productRecord[internalCodeKey]);
console.log(productRecord.internalCodeKey);
console.log(Object.getOwnPropertySymbols(productRecord).length);
```

#### 文件名：`09-symbol/globalSymbolRegistry.js`

```js
// Goal:
// Compare Symbol() with Symbol.for().

// Expected output:
// false
// true
// shared.product

const firstLocal = Symbol("shared.product");
const secondLocal = Symbol("shared.product");
const firstGlobal = Symbol.for("shared.product");
const secondGlobal = Symbol.for("shared.product");

console.log(firstLocal === secondLocal);
console.log(firstGlobal === secondGlobal);
console.log(Symbol.keyFor(firstGlobal));
```

#### 文件名：`09-symbol/symbolMistakes.js`

```js
// Goal:
// Show that Symbol cannot be implicitly converted to string.

// Expected output:
// TypeError
// Token: Symbol(product)

const productToken = Symbol("product");

try {
  console.log("Token: " + productToken);
} catch (error) {
  console.log(error.constructor.name);
}

console.log(`Token: ${String(productToken)}`);
```

### 运行方式

```bash
node 09-symbol/symbolIdentity.js
node 09-symbol/symbolPropertyKey.js
node 09-symbol/globalSymbolRegistry.js
node 09-symbol/symbolMistakes.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
Symbol 描述文本不是身份；隐式字符串拼接 Symbol 会抛错。
```

---

## 10：全局对象与 globalThis

### 结论

`globalThis` 是跨环境访问全局对象的统一入口。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

理解全局对象是为了识别宿主环境，不是为了把业务状态挂到全局。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
globalThis
Number
String
Boolean
BigInt
Symbol
Math
JSON
console
```

### 文件结构

```txt
10-global-object/
  globalObjectOverview.js
  globalThisDemo.js
  globalVariableMistake.js
```

### 示例代码

#### 文件名：`10-global-object/globalObjectOverview.js`

```js
// Goal:
// Show important global values and functions.

// Expected output:
// function
// function
// object
// object
// object

console.log(typeof Number);
console.log(typeof String);
console.log(typeof Math);
console.log(typeof JSON);
console.log(typeof console);
```

#### 文件名：`10-global-object/globalThisDemo.js`

```js
// Goal:
// Show globalThis and global built-in values.

// Expected output:
// true
// true
// true
// true

console.log(globalThis.Number === Number);
console.log(globalThis.Math === Math);
console.log(globalThis.JSON === JSON);
console.log(globalThis.console === console);
```

#### 文件名：`10-global-object/globalVariableMistake.js`

```js
// Goal:
// Show why accidental globals are dangerous in sloppy mode.

// Expected output:
// bad-state
// ReferenceError

function createAccidentalGlobal() {
  leakedValue = "bad-state";
}

createAccidentalGlobal();
console.log(globalThis.leakedValue);

delete globalThis.leakedValue;

function createStrictFailure() {
  "use strict";
  strictLeakedValue = "blocked";
}

try {
  createStrictFailure();
} catch (error) {
  console.log(error.constructor.name);
}
```

### 运行方式

```bash
node 10-global-object/globalObjectOverview.js
node 10-global-object/globalThisDemo.js
node 10-global-object/globalVariableMistake.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
理解全局对象是为了识别宿主环境，不是为了把业务状态挂到全局。
```

---

## 11：原始值不可修改，对象引用可修改

### 结论

原始值按值语义处理，对象赋值复制的是引用。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

`const` 保护绑定，不冻结对象内容；对象相等比较的是引用身份。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
let name = value
const name = value
object.property = value
array[index] = value
```

### 文件结构

```txt
11-primitive-vs-reference/
  primitiveAssignment.js
  objectReferenceAssignment.js
  constBindingObjectMutation.js
  referenceMistakes.js
```

### 示例代码

#### 文件名：`11-primitive-vs-reference/primitiveAssignment.js`

```js
// Goal:
// Show primitive assignment copies the primitive value.

// Expected output:
// 10
// 20

let firstCount = 10;
let secondCount = firstCount;

secondCount = 20;

console.log(firstCount);
console.log(secondCount);
```

#### 文件名：`11-primitive-vs-reference/objectReferenceAssignment.js`

```js
// Goal:
// Show object assignment copies the reference.

// Expected output:
// 2
// 2
// true

const firstCart = { itemCount: 1 };
const secondCart = firstCart;

secondCart.itemCount = 2;

console.log(firstCart.itemCount);
console.log(secondCart.itemCount);
console.log(firstCart === secondCart);
```

#### 文件名：`11-primitive-vs-reference/constBindingObjectMutation.js`

```js
// Goal:
// Show that const prevents rebinding, not object mutation.

// Expected output:
// 2
// TypeError

const cartState = { itemCount: 1 };
cartState.itemCount = 2;

console.log(cartState.itemCount);

try {
  cartState = { itemCount: 3 };
} catch (error) {
  console.log(error.constructor.name);
}
```

#### 文件名：`11-primitive-vs-reference/referenceMistakes.js`

```js
// Goal:
// Show that object equality compares references.

// Expected output:
// false
// true

const firstProduct = { id: "p1" };
const secondProduct = { id: "p1" };
const sameProductReference = firstProduct;

console.log(firstProduct === secondProduct);
console.log(firstProduct === sameProductReference);
```

### 运行方式

```bash
node 11-primitive-vs-reference/primitiveAssignment.js
node 11-primitive-vs-reference/objectReferenceAssignment.js
node 11-primitive-vs-reference/constBindingObjectMutation.js
node 11-primitive-vs-reference/referenceMistakes.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
`const` 保护绑定，不冻结对象内容；对象相等比较的是引用身份。
```

---

## 12：显式类型转换

### 结论

显式转换表达意图，但转换后仍然需要验证结果。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

`Number()` 可能得到 `NaN`；`Boolean("false")` 是 `true`；`parseInt()` 建议显式传 radix。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
Number(value)
String(value)
Boolean(value)
BigInt(value)
parseInt(string, radix)
parseFloat(string)
```

### 文件结构

```txt
12-explicit-conversion/
  numberStringBooleanConversion.js
  parseIntParseFloat.js
  conversionTable.js
  explicitConversionMistakes.js
```

### 示例代码

#### 文件名：`12-explicit-conversion/numberStringBooleanConversion.js`

```js
// Goal:
// Show explicit conversion results.

// Expected output:
// 42
// NaN
// 42
// false
// true

console.log(Number("42"));
console.log(Number("keyboard"));
console.log(String(42));
console.log(Boolean(""));
console.log(Boolean("false"));
```

#### 文件名：`12-explicit-conversion/parseIntParseFloat.js`

```js
// Goal:
// Compare parseInt and parseFloat.

// Expected output:
// 42
// 19.99
// 15
// NaN

console.log(parseInt("42px", 10));
console.log(parseFloat("19.99 USD"));
console.log(parseInt("1111", 2));
console.log(parseInt("px42", 10));
```

#### 文件名：`12-explicit-conversion/conversionTable.js`

```js
// Goal:
// Print important explicit conversion results.

// Expected output:
// See the printed table.

const values = ["", "0", "false", "42", "42px", null, undefined, true, false];

for (const value of values) {
  console.log(`${String(value)} -> number:${Number(value)} boolean:${Boolean(value)}`);
}
```

#### 文件名：`12-explicit-conversion/explicitConversionMistakes.js`

```js
// Goal:
// Show why Boolean("false") is true.

// Expected output:
// true
// false

const enabledFromQuery = "false";

console.log(Boolean(enabledFromQuery));
console.log(enabledFromQuery === "true");
```

### 运行方式

```bash
node 12-explicit-conversion/numberStringBooleanConversion.js
node 12-explicit-conversion/parseIntParseFloat.js
node 12-explicit-conversion/conversionTable.js
node 12-explicit-conversion/explicitConversionMistakes.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
`Number()` 可能得到 `NaN`；`Boolean("false")` 是 `true`；`parseInt()` 建议显式传 radix。
```

---

## 13：隐式类型转换与对象到原始值转换

### 结论

隐式转换是确定规则，不是随机行为，但业务代码应避免依赖它。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

`+` 可能拼接也可能加法；对象参与运算会先尝试转成原始值。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
object.valueOf()
object.toString()
object[Symbol.toPrimitive](hint)
```

### 文件结构

```txt
13-implicit-conversion/
  plusOperatorConversion.js
  comparisonConversion.js
  objectToPrimitiveConversion.js
  implicitConversionMistakes.js
```

### 示例代码

#### 文件名：`13-implicit-conversion/plusOperatorConversion.js`

```js
// Goal:
// Show implicit conversion with the plus operator.

// Expected output:
// 12
// 102
// 12
// 2

console.log(10 + 2);
console.log("10" + 2);
console.log(Number("10") + 2);
console.log("10" - 8);
```

#### 文件名：`13-implicit-conversion/comparisonConversion.js`

```js
// Goal:
// Show comparison conversion differences.

// Expected output:
// true
// false
// true
// false

console.log("12" < "3");
console.log(12 < 3);
console.log("12" < 3);
console.log("abc" < 3);
```

#### 文件名：`13-implicit-conversion/objectToPrimitiveConversion.js`

```js
// Goal:
// Show object-to-primitive conversion with Symbol.toPrimitive.

// Expected output:
// string
// Product#p1
// default
// Product#p1
// number
// 101

const productRecord = {
  id: "p1",
  price: 100,
  [Symbol.toPrimitive](hint) {
    console.log(hint);

    if (hint === "number") {
      return this.price;
    }

    return `Product#${this.id}`;
  },
};

console.log(`${productRecord}`);
console.log(productRecord + "");
console.log(+productRecord + 1);
```

#### 文件名：`13-implicit-conversion/implicitConversionMistakes.js`

```js
// Goal:
// Show a classic loose equality conversion trap.

// Expected output:
// true
// true
// false

console.log([] == false);
console.log(Number([]) === 0);
console.log(Boolean([]));
```

### 运行方式

```bash
node 13-implicit-conversion/plusOperatorConversion.js
node 13-implicit-conversion/comparisonConversion.js
node 13-implicit-conversion/objectToPrimitiveConversion.js
node 13-implicit-conversion/implicitConversionMistakes.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
`+` 可能拼接也可能加法；对象参与运算会先尝试转成原始值。
```

---

## 14：相等比较与 Object.is

### 结论

默认使用 `===`，特殊边界才考虑 `Object.is()`。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

`==` 会触发类型转换；对象严格相等比较引用；`Object.is()` 能识别 `NaN` 和 `-0` 边界。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
a === b
a == b
Object.is(value1, value2)
```

### 文件结构

```txt
14-equality-comparison/
  strictEquality.js
  looseEqualityTrap.js
  objectIsComparison.js
  equalityMistakes.js
```

### 示例代码

#### 文件名：`14-equality-comparison/strictEquality.js`

```js
// Goal:
// Show strict equality without type conversion.

// Expected output:
// false
// true
// false
// true

console.log(1 === "1");
console.log(1 === 1);
console.log(null === undefined);
console.log(null == undefined);
```

#### 文件名：`14-equality-comparison/looseEqualityTrap.js`

```js
// Goal:
// Show loose equality traps.

// Expected output:
// true
// true
// true
// false

console.log("" == 0);
console.log("0" == 0);
console.log(false == 0);
console.log(false === 0);
```

#### 文件名：`14-equality-comparison/objectIsComparison.js`

```js
// Goal:
// Compare strict equality and Object.is.

// Expected output:
// false
// true
// true
// false

console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));
console.log(0 === -0);
console.log(Object.is(0, -0));
```

#### 文件名：`14-equality-comparison/equalityMistakes.js`

```js
// Goal:
// Show why object equality compares references.

// Expected output:
// false
// true

const firstProduct = { id: "p1" };
const secondProduct = { id: "p1" };
const sameProductReference = firstProduct;

console.log(firstProduct === secondProduct);
console.log(firstProduct === sameProductReference);
```

### 运行方式

```bash
node 14-equality-comparison/strictEquality.js
node 14-equality-comparison/looseEqualityTrap.js
node 14-equality-comparison/objectIsComparison.js
node 14-equality-comparison/equalityMistakes.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
`==` 会触发类型转换；对象严格相等比较引用；`Object.is()` 能识别 `NaN` 和 `-0` 边界。
```

---

## 15：变量声明与赋值

### 结论

`let` / `const` 创建块级绑定，`var` 是旧的函数级绑定模型。

### 技术意义

这一节训练你把表层写法和运行时行为对应起来。重点不是背名字，而是能解释代码执行后为什么得到这个值。

### 底层机制

变量是绑定，不是类型容器；现代代码默认 `const`，需要重绑定才用 `let`。

### API / 语法规范

本节涉及的固定语法和 API 已写入对应示例文件。运行时重点观察：值的类型、转换结果、引用身份、错误类型和输出顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
let name = value
const name = value
var name = value
```

### 文件结构

```txt
15-variable-declarations/
  letConstVarScope.js
  temporalDeadZone.js
  assignmentAndDestructuringPreview.js
  declarationMistakes.js
```

### 示例代码

#### 文件名：`15-variable-declarations/letConstVarScope.js`

```js
// Goal:
// Compare let, const, and var scope.

// Expected output:
// inner
// outer
// 2

let statusLabel = "outer";

if (true) {
  let statusLabel = "inner";
  var legacyCounter = 2;
  console.log(statusLabel);
}

console.log(statusLabel);
console.log(legacyCounter);
```

#### 文件名：`15-variable-declarations/temporalDeadZone.js`

```js
// Goal:
// Show temporal dead zone for let.

// Expected output:
// ReferenceError
// pending

try {
  console.log(orderStatus);
} catch (error) {
  console.log(error.constructor.name);
}

let orderStatus = "pending";
console.log(orderStatus);
```

#### 文件名：`15-variable-declarations/assignmentAndDestructuringPreview.js`

```js
// Goal:
// Preview assignment and destructuring assignment.

// Expected output:
// 2
// p1
// Keyboard
// 3

let quantity = 1;
quantity = quantity + 1;

const productRecord = { id: "p1", title: "Keyboard" };
const { id: productId, title } = productRecord;
const [firstScore, , thirdScore] = [1, 2, 3];

console.log(quantity);
console.log(productId);
console.log(title);
console.log(thirdScore);
```

#### 文件名：`15-variable-declarations/declarationMistakes.js`

```js
// Goal:
// Compare var hoisting with let and const temporal dead zone.

// Expected output:
// undefined
// ReferenceError
// TypeError

console.log(legacyStatus);
var legacyStatus = "ready";

try {
  console.log(modernStatus);
} catch (error) {
  console.log(error.constructor.name);
}

let modernStatus = "ready";

const lockedStatus = "ready";
try {
  lockedStatus = "changed";
} catch (error) {
  console.log(error.constructor.name);
}
```

### 运行方式

```bash
node 15-variable-declarations/letConstVarScope.js
node 15-variable-declarations/temporalDeadZone.js
node 15-variable-declarations/assignmentAndDestructuringPreview.js
node 15-variable-declarations/declarationMistakes.js
```

### 预期输出

每个文件的预期输出已经写在对应代码文件顶部的英文注释里。运行时以实际 Node 输出为准；不同 Node 版本对大数字和对象打印格式可能略有差异。

### 执行过程

运行代码时按这个顺序解释：先确认每个变量绑定到什么值，再确认值的运行时类型，再确认是否发生转换、比较、引用复制或错误捕获，最后解释 `console.log()` 为什么打印对应结果。

### 和实际项目的关系

这一节的代码对应真实前端边界：表单值、URL query、localStorage、API JSON、组件状态和业务对象。所有外部输入进入业务逻辑前，都要先确认运行时值模型。

### 常见错误

本节的 `Mistake` / `Mistakes` 文件就是故意错误或反直觉示例。不要只看正确文件，必须运行错误文件并记录错误类型、错误原因和正确模型。

### 最终记忆模型

```txt
变量是绑定，不是类型容器；现代代码默认 `const`，需要重绑定才用 `let`。
```

---

## 8. 本章 API / 语法完整索引

### 类型检测与比较

| 名称 | 类型 | 签名 / 语法 | 返回值 | 重点 |
|---|---|---|---|---|
| `typeof` | operator | `typeof value` | string | `typeof null` 返回 `"object"`。 |
| `Object.is()` | function | `Object.is(value1, value2)` | boolean | 处理 `NaN`、`0`、`-0` 边界。 |
| `===` | operator | `a === b` | boolean | 不做类型转换。 |
| `==` | operator | `a == b` | boolean | 会做类型转换，默认避免。 |

### Number / BigInt

| 名称 | 所属对象 | 签名 | 返回值 | 重点 |
|---|---|---|---|---|
| `Number()` | `Number` | `Number(value)` | number | 显式转换。 |
| `Number.isNaN()` | `Number` | `Number.isNaN(value)` | boolean | 只在值本身是 `NaN` 时返回 true。 |
| `Number.isFinite()` | `Number` | `Number.isFinite(value)` | boolean | 不先强制转换。 |
| `Number.isInteger()` | `Number` | `Number.isInteger(value)` | boolean | 判断整数 number。 |
| `Number.isSafeInteger()` | `Number` | `Number.isSafeInteger(value)` | boolean | 判断安全整数。 |
| `Number.EPSILON` | `Number` | property | number | 浮点误差比较参考。 |
| `BigInt()` | `BigInt` | `BigInt(value)` | bigint | 参数必须是整数语义。 |
| BigInt literal | syntax | `123n` | bigint | 不能写小数。 |

### String / Boolean / Symbol

| 名称 | 所属对象 | 签名 | 返回值 | 重点 |
|---|---|---|---|---|
| `String()` | `String` | `String(value)` | string | 显式转字符串。 |
| `text.length` | string wrapper | `text.length` | number | 返回 UTF-16 code unit 数量。 |
| `text.trim()` | `String.prototype` | `text.trim()` | string | 返回新字符串。 |
| `text.toLowerCase()` | `String.prototype` | `text.toLowerCase()` | string | 返回新字符串。 |
| `Boolean()` | `Boolean` | `Boolean(value)` | boolean | 按 truthiness 转换。 |
| `Symbol()` | `Symbol` | `Symbol(description)` | symbol | 每次创建唯一值。 |
| `Symbol.for()` | `Symbol` | `Symbol.for(key)` | symbol | 使用全局 symbol 注册表。 |

### 变量声明

| 语法 | 作用域 | 可重新赋值 | 初始化要求 | 建议 |
|---|---|---|---|---|
| `let name = value` | block | 是 | 可不初始化 | 需要重新赋值时使用。 |
| `const name = value` | block | 否 | 必须初始化 | 默认优先使用。 |
| `var name = value` | function/global | 是 | 可不初始化 | 读旧代码时理解，现代代码避免。 |

---

## 9. 本章常见错误总表

| 错误 | 错误类型 | 错误原因 | 正确模型 |
|---|---|---|---|
| `typeof null === "object"` 后直接访问属性 | runtime error | `null` 不是可访问属性的对象 | 对 object 检查要排除 null。 |
| `value === NaN` | logic error | `NaN` 不等于自身 | 用 `Number.isNaN(value)`。 |
| `Boolean("false") === false` | logic error | 非空字符串是真值 | 字符串内容需要手动解析。 |
| `if (stock)` 判断库存是否存在 | logic error | `0` 是 falsy | 用 nullish 判断或显式业务条件。 |
| `price = 19.99 + 4.99` 用于精确金额 | precision error | number 是二进制浮点 | 金额用整数分。 |
| BigInt 和 number 相加 | runtime error | 两种数值类型不能混用 | 显式统一为 BigInt 或 number。 |
| 给字符串下标赋值 | logic error | string 不可修改 | 创建新字符串。 |
| `const object` 以为对象不可修改 | concept error | const 保护绑定，不冻结对象 | 需要不可变时创建新对象或冻结。 |
| 两个对象内容一样却 `=== false` | concept error | 对象比较引用身份 | 比较属性或使用专门深比较。 |
| 在声明前访问 `let` / `const` | runtime error | 暂时性死区 | 声明并初始化后再访问。 |
| 使用 `var` 造成块级作用域误判 | logic error | `var` 没有块级作用域 | 现代代码用 `let` / `const`。 |

### IDE 警告说明

| 警告 | 分类 | 解释 |
|---|---|---|
| `Condition is always true` | IDE 静态检查 | 例如 `if ({})` 永远 truthy。 |
| `Result of assignment expression is unused` | IDE 静态检查 | 给原始值属性赋值没有实际效果。 |
| `Unresolved variable` | IDE 静态检查 / runtime risk | 访问对象不存在属性，运行时得到 undefined，但 IDE 无法确认。 |
| `Cannot mix BigInt and other types` | runtime / TypeScript error | BigInt 和 number 算术混用会报错。 |
| `Variable is used before being assigned` | IDE 静态检查 | 可能访问 undefined 或 TDZ。 |

---

## 10. 最终小项目：Checkout Value Normalizer

### 项目目标

构建一个纯 JavaScript 的结账数据标准化器。它接收模拟的表单输入和 URL query 数据，把字符串、空值、布尔字段、数字字段转换成稳定的业务对象。

### 使用到的本章知识点

```txt
raw runtime values
  -> inspect type
  -> convert explicitly
  -> validate special values
  -> preserve valid falsy values
  -> build normalized object
```

### 推荐文件结构

```txt
16-mini-project/
  checkoutValueNormalizer.js
  checkoutValueNormalizerMistakes.js
  checkoutValueNormalizerChecklist.md
```

### 主文件代码

#### 文件名：`16-mini-project/checkoutValueNormalizer.js`

```js
// Goal:
// Normalize raw checkout values from form-like input.

// Expected output:
// { productId: 'p100', quantity: 2, giftWrap: false, couponCode: null, priceCents: 1999 }
// { productId: 'p200', quantity: 1, giftWrap: true, couponCode: 'SAVE10', priceCents: 0 }

function parseRequiredString(rawValue, fieldName) {
  if (typeof rawValue !== "string") {
    throw new TypeError(`${fieldName} must be a string`);
  }

  const trimmedValue = rawValue.trim();

  if (trimmedValue.length === 0) {
    throw new RangeError(`${fieldName} cannot be empty`);
  }

  return trimmedValue;
}

function parsePositiveInteger(rawValue, fieldName) {
  const convertedValue = Number(rawValue);

  if (!Number.isSafeInteger(convertedValue) || convertedValue < 1) {
    throw new RangeError(`${fieldName} must be a positive safe integer`);
  }

  return convertedValue;
}

function parseBooleanFlag(rawValue) {
  if (rawValue === true || rawValue === "true") {
    return true;
  }

  if (rawValue === false || rawValue === "false" || rawValue == null) {
    return false;
  }

  throw new TypeError("Boolean flag must be true or false");
}

function parseOptionalCoupon(rawValue) {
  if (rawValue == null) {
    return null;
  }

  if (typeof rawValue !== "string") {
    throw new TypeError("Coupon code must be a string");
  }

  const trimmedValue = rawValue.trim();
  return trimmedValue.length === 0 ? null : trimmedValue.toUpperCase();
}

function parsePriceCents(rawValue) {
  const convertedValue = Number(rawValue);

  if (!Number.isSafeInteger(convertedValue) || convertedValue < 0) {
    throw new RangeError("Price cents must be a non-negative safe integer");
  }

  return convertedValue;
}

function normalizeCheckoutInput(rawInput) {
  if (typeof rawInput !== "object" || rawInput === null) {
    throw new TypeError("Checkout input must be an object");
  }

  return {
    productId: parseRequiredString(rawInput.productId, "productId"),
    quantity: parsePositiveInteger(rawInput.quantity ?? "1", "quantity"),
    giftWrap: parseBooleanFlag(rawInput.giftWrap),
    couponCode: parseOptionalCoupon(rawInput.couponCode),
    priceCents: parsePriceCents(rawInput.priceCents ?? "0"),
  };
}

const firstRawInput = {
  productId: " p100 ",
  quantity: "2",
  giftWrap: "false",
  couponCode: "",
  priceCents: "1999",
};

const secondRawInput = {
  productId: "p200",
  giftWrap: "true",
  couponCode: "save10",
  priceCents: 0,
};

console.log(normalizeCheckoutInput(firstRawInput));
console.log(normalizeCheckoutInput(secondRawInput));```

### 对比 / 错误文件代码

#### 文件名：`16-mini-project/checkoutValueNormalizerMistakes.js`

```js
// Goal:
// Show common normalization mistakes.

// Expected output:
// { quantity: 10, giftWrap: true, priceCents: 1000 }

function normalizeCheckoutInputWrong(rawInput) {
  return {
    quantity: Number(rawInput.quantity || 1),
    giftWrap: Boolean(rawInput.giftWrap),
    priceCents: Number(rawInput.priceCents || 1000),
  };
}

const rawInput = {
  quantity: "10",
  giftWrap: "false",
  priceCents: 0,
};

console.log(normalizeCheckoutInputWrong(rawInput));```

### 小项目 checklist

#### 文件名：`16-mini-project/checkoutValueNormalizerChecklist.md`

```md
# Checkout Value Normalizer Checklist

- Verify required string fields with typeof.
- Use trim() before checking empty user input.
- Convert numeric input with Number().
- Validate numeric results with Number.isSafeInteger().
- Preserve valid zero values with ?? instead of ||.
- Parse string boolean flags explicitly.
- Normalize empty optional strings to null.
- Keep money as integer cents.
- Return a new normalized object.
- Add mistake cases and explain the wrong result.
```

### 运行方式

```bash
node 16-mini-project/checkoutValueNormalizer.js
node 16-mini-project/checkoutValueNormalizerMistakes.js
```

### 完整执行过程

1. `normalizeCheckoutInput()` 先检查 `rawInput` 是否是非 null 对象。
2. `productId` 必须是字符串，经过 `trim()` 后不能为空。
3. `quantity` 使用 `rawInput.quantity ?? "1"`，只在 null 或 undefined 时默认成 `"1"`。
4. `parsePositiveInteger()` 用 `Number()` 显式转换数量。
5. `Number.isSafeInteger()` 防止小数、NaN、Infinity 和不安全整数。
6. `giftWrap` 不用 `Boolean()`，而是明确解析 `true`、`false`、`"true"`、`"false"`。
7. `couponCode` 允许 null、undefined、空字符串；有效字符串统一转大写。
8. `priceCents` 使用整数分，并允许 `0`。
9. 错误文件里 `rawInput.priceCents || 1000` 把合法的 `0` 替换成了 `1000`。
10. 错误文件里 `Boolean("false")` 返回 `true`。

---

## 11. 额外 cheatsheet

### 结论

本章必须单独保留一个 cheatsheet 文件，用于完成训练后的快速复习。

```txt
javascript/chapter-03-types-values-variables/
  javascript-chapter-03-types-values-variables-cheatsheet-zh-v1.md
```

### cheatsheet 必须覆盖

1. 类型分类速查。
2. `typeof` 结果表。
3. falsy 值完整表。
4. Number / BigInt 边界。
5. String 常用方法。
6. 显式转换 API。
7. `==` 与 `===` 对比。
8. `let` / `const` / `var` 对比。
9. 常见错误和关键记忆句。
10. MDN 官方链接。

---

## 12. 最终文件清单

```txt
javascript/chapter-03-types-values-variables/
  javascript-chapter-03-types-values-variables-learning-guide-zh-v1.md
  javascript-chapter-03-types-values-variables-cheatsheet-zh-v1.md
  README.md

  00-chapter-map/
    chapterMap.js

  01-type-taxonomy/
    primitiveAndObjectTypes.js
    typeofResultTable.js
    typeTaxonomyMistakes.js

  02-number-literals-arithmetic/
    numericLiteralForms.js
    arithmeticSpecialValues.js
    numberMethodBoundary.js
    numberMistakes.js

  03-floating-point-precision/
    floatingPointPrecision.js
    epsilonComparison.js
    moneyPrecisionMistake.js

  04-bigint-integers/
    bigintBasics.js
    safeIntegerBoundary.js
    bigintMixingMistake.js

  05-string-text/
    stringLiteralForms.js
    stringLengthAndIndex.js
    stringMethodReturnValues.js
    stringMistakes.js

  06-primitive-wrapper/
    temporaryWrapperObject.js
    primitivePropertyMistake.js
    wrapperObjectComparison.js

  07-boolean-truthiness/
    booleanConversion.js
    falsyValuesTable.js
    truthyObjectMistake.js

  08-null-undefined/
    nullUndefinedBoundary.js
    missingPropertyAndVoidReturn.js
    nullishCoalescingPreview.js
    nullUndefinedMistakes.js

  09-symbol/
    symbolIdentity.js
    symbolPropertyKey.js
    globalSymbolRegistry.js
    symbolMistakes.js

  10-global-object/
    globalObjectOverview.js
    globalThisDemo.js
    globalVariableMistake.js

  11-primitive-vs-reference/
    primitiveAssignment.js
    objectReferenceAssignment.js
    constBindingObjectMutation.js
    referenceMistakes.js

  12-explicit-conversion/
    numberStringBooleanConversion.js
    parseIntParseFloat.js
    conversionTable.js
    explicitConversionMistakes.js

  13-implicit-conversion/
    plusOperatorConversion.js
    comparisonConversion.js
    objectToPrimitiveConversion.js
    implicitConversionMistakes.js

  14-equality-comparison/
    strictEquality.js
    looseEqualityTrap.js
    objectIsComparison.js
    equalityMistakes.js

  15-variable-declarations/
    letConstVarScope.js
    temporalDeadZone.js
    assignmentAndDestructuringPreview.js
    declarationMistakes.js

  16-mini-project/
    checkoutValueNormalizer.js
    checkoutValueNormalizerMistakes.js
    checkoutValueNormalizerChecklist.md```

---

## 13. 最终学习笔记转换要求

### 结论

完成练习后，把本指导文件转换成你自己的正式学习笔记。正式笔记不要照抄本文件，要写出你运行后的观察。

### 每节笔记固定格式

```txt
1. 结论
2. 运行时机制
3. 示例代码
4. 输出解释
5. 常见错误
6. 和项目开发的关系
7. 记忆句
```

### 必须补充你自己的内容

1. 每个示例的实际运行截图或输出记录。
2. 至少 10 个你亲自改坏的错误示例。
3. 至少 5 个“和 React / TypeScript / Node 后续学习有关”的连接点。
4. 一张类型转换表。
5. 一张 `let` / `const` / `var` 对比表。
6. 最终小项目代码和你自己的重构版本。

---

## 14. 本章最终记忆模型

```txt
JavaScript runtime model:

value has type
variable has binding
primitive value is immutable
object value is mutable through reference
const protects binding, not object content
conversion can be explicit or implicit
implicit conversion follows rules, not intuition
strict equality avoids most coercion traps
external input must be normalized before business use
```

压缩成一句话：

```txt
JavaScript variables do not own types; runtime values do.
```

---

## 15. 官方文档阅读清单

### MDN 必读

- [JavaScript data types and data structures - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
- [Primitive - MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
- [Number - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [Number.MAX_SAFE_INTEGER - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)
- [BigInt - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- [String - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Boolean - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- [Falsy - MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
- [Object - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Symbol.toPrimitive - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)
- [Type coercion - MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)
- [`let` - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [`const` - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [`var` - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)

### 阅读顺序

1. 先读 data types。
2. 再读 Number / BigInt / String / Boolean。
3. 再读 Falsy 和 Type coercion。
4. 最后读 `let` / `const` / `var`。

---

## 16. 生成前自检清单

| 检查项 | 是否完成 |
|---|---|
| 是否包含文档目录 | 是 |
| 是否包含完整目录结构 | 是 |
| 是否包含运行清单 | 是 |
| 目录树、运行清单、正文代码块、最终文件清单是否一致 | 是 |
| 每个真实 `js` 代码块上方是否写了对应文件名 | 是 |
| 是否包含每节训练内容 | 是 |
| 是否包含正确示例 | 是 |
| 是否包含错误示例 | 是 |
| 是否包含预期输出 | 是，写在文件顶部注释中 |
| 是否解释执行过程 | 是 |
| 是否包含最终小项目 | 是 |
| 是否包含 cheatsheet 文件要求 | 是 |
| 是否包含最终文件清单 | 是 |
| 是否包含官方文档阅读清单 | 是 |
| 代码注释是否全英文 | 是 |
| 代码变量名是否全英文 | 是 |
| 代码块是否没有中文字符 | 是 |
