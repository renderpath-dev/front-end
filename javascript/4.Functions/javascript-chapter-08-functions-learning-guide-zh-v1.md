# JavaScript 第 8 章“函数”学习指导文件 v1

> 定位：这是《JavaScript 权威指南》第 8 章“函数”的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建练习目录、写 `.js` 文件、运行 Node、观察输出或错误，再把每节整理成自己的正式笔记。  
> 参考范围：《JavaScript 权威指南》第 8 章 8.1 到 8.9，MDN 的 Functions、Function declarations、Function expressions、Arrow functions、Default parameters、Rest parameters、arguments、Closures、this、call、apply、bind、Function constructor。  
> 语言规则：正文统一中文；必要技术术语保留英文括号。  
> 代码规则：代码、变量名、函数名、类名、文件名、目录名、代码注释不使用中文字符。

---

## 官方文档对应关系

| 本文件主题 | 官方文档 |
|---|---|
| 函数基础、函数声明、函数表达式、函数作用域 | [MDN Functions Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) |
| 函数声明语法与函数对象 | [MDN Function declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) |
| 函数表达式 | [MDN Function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) |
| 箭头函数、词法 this、不能作为构造函数 | [MDN Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) |
| 默认参数 | [MDN Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) |
| 剩余参数 | [MDN Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) |
| `arguments` 对象 | [MDN arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) |
| 闭包 | [MDN Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures) |
| `this` 绑定 | [MDN this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) |
| `call()` / `apply()` / `bind()` | [MDN Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) |
| `Function` 构造函数 | [MDN Function constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function) |
| JavaScript 执行模型 | [MDN JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model) |

---

## 目录

0. [官方文档对应关系](#官方文档对应关系)
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
11. [最终小项目](#10-最终小项目pricing-rule-engine)
12. [额外 cheatsheet](#11-额外-cheatsheet)
13. [最终文件清单](#12-最终文件清单)
14. [最终学习笔记转换要求](#13-最终学习笔记转换要求)
15. [本章最终记忆模型](#14-本章最终记忆模型)
16. [官方文档阅读清单](#15-官方文档阅读清单)
17. [生成前自检清单](#16-生成前自检清单)

---

## 0. 文件定位

### 结论

第 8 章不是“函数语法大全”，而是 JavaScript 执行模型（execution model）和抽象能力（abstraction capability）的核心章。

你要学会回答：

```txt
1. What is created when a function is defined?
2. What happens when a function is called?
3. How are parameters bound to arguments?
4. What is this in each invocation mode?
5. Why can a function access variables from an outer scope after that outer function has returned?
6. Why are functions also objects?
7. Why do call, apply, and bind exist?
8. Why is Function constructor different from normal function expressions?
9. What makes functional programming possible in JavaScript?
```

### 技术意义

函数是后续所有现代前端主题的共同地基：

```txt
React component
React event handler
React custom hook
Node callback
Express middleware
Promise executor
array method callback
module factory
closure-based private state
TypeScript function type
```

如果你只会写 `function` 和 `=>`，但不理解调用栈（call stack）、词法作用域（lexical scope）、闭包（closure）、`this` 绑定（this binding）、函数对象（function object），后面写 React callback、异步代码、Node middleware 和 TypeScript 函数类型时会出现大量“看起来像语法问题，其实是运行时模型问题”的错误。

---

## 1. 本章学习目标

学完第 8 章，你必须能完整解释以下内容：

```txt
function declaration
function expression
arrow function
method definition
constructor function
function call
method call
constructor call
indirect call
parameter
argument
default parameter
rest parameter
destructured parameter
arguments object
spread syntax in function calls
function as value
callback function
higher-order function
IIFE
namespace function
lexical scope
closure
private variable
function object
name property
length property
prototype property
call()
apply()
bind()
toString()
Function constructor
functional programming
pure function
map()
filter()
reduce()
memoization
```

### 本章不是为了背写法

本章的核心模型是：

```txt
function definition
  -> creates a function object
  -> stores code body
  -> stores parameter list
  -> captures lexical environment

function invocation
  -> creates an execution context
  -> binds this depending on invocation form
  -> binds parameters to arguments
  -> runs function body
  -> returns a value or undefined
```

---

## 2. 本章学习顺序

```txt
function runtime model
  -> defining functions
  -> invoking functions
  -> parameters and arguments
  -> default, rest, and destructured parameters
  -> spread syntax in calls
  -> functions as values
  -> functions as namespaces
  -> closures
  -> function object properties
  -> call, apply, and bind
  -> constructor functions
  -> Function constructor
  -> functional programming
  -> mini project
```

先学“函数定义创建什么”，再学“函数调用发生什么”。否则你会把 `this`、闭包、回调函数、`bind()` 都理解成孤立语法，实际项目里还是会乱。

---

## 3. 本章核心术语表

| 中文术语 | English term | 解释 |
|---|---|---|
| 函数 | function | 可以被调用的对象，封装一段可复用代码。 |
| 函数声明 | function declaration | 使用 `function name(...) {}` 声明函数绑定。 |
| 函数表达式 | function expression | 把函数作为表达式创建，通常赋值给变量或作为参数传递。 |
| 箭头函数 | arrow function | 使用 `=>` 的函数表达式，拥有词法 `this`，不能作为构造函数。 |
| 形参 | parameter | 函数定义中接收输入的名字。 |
| 实参 | argument | 函数调用时传入的实际值。 |
| 调用栈 | call stack | 记录当前函数调用链和返回位置的数据结构。 |
| 执行上下文 | execution context | 一次函数调用运行时的环境，包含局部绑定、`this`、返回位置。 |
| 词法作用域 | lexical scope | 由代码书写位置决定的变量可见范围。 |
| 闭包 | closure | 函数和它创建时可访问的外层词法环境的组合。 |
| 回调函数 | callback function | 作为值传给其他函数，稍后由对方调用的函数。 |
| 高阶函数 | higher-order function | 接收函数或返回函数的函数。 |
| 方法 | method | 作为对象属性保存并通过对象调用的函数。 |
| 构造函数 | constructor function | 与 `new` 一起调用，用于初始化新对象的函数。 |
| 函数对象 | function object | 函数本身也是对象，可以有属性和方法。 |
| 立即调用函数表达式 | IIFE | 定义后立刻执行的函数表达式，常用于创建局部作用域。 |
| 纯函数 | pure function | 相同输入总是返回相同输出，并且不修改外部状态的函数。 |
| 记忆化 | memoization | 用缓存保存函数计算结果，避免重复计算。 |

---

## 4. 本章底层模型

### 结论

函数定义阶段和函数调用阶段是两件不同的事。

```txt
Definition time:
  create function object
  store code body
  store formal parameters
  connect to outer lexical environment

Call time:
  create execution context
  bind this
  bind arguments to parameters
  execute statements
  return a completion value
```

### 函数对象模型

```txt
function object
  -> [[Call]] internal behavior
  -> optional [[Construct]] internal behavior
  -> name property
  -> length property
  -> prototype property for constructable functions
  -> Function.prototype methods
```

普通函数可以被调用。可构造函数还能被 `new` 调用。箭头函数只有调用能力，没有构造能力，因此不能 `new`。

### 调用模型

```txt
regular call:
  calculateTotal(10, 2)
  this is undefined in strict mode

method call:
  cart.calculateTotal()
  this is cart

constructor call:
  new Product('Keyboard')
  this is the new object

indirect call:
  fn.call(context, arg1)
  this is explicitly chosen
```

### 闭包模型

```txt
outer function call
  -> creates local variable count
  -> returns inner function
  -> outer call ends
  -> inner function still references count
  -> count remains reachable
```

闭包不是“把变量复制进函数”。闭包保留的是对词法环境的引用。这个区别会影响循环闭包、私有状态、缓存和事件处理器。

---

## 5. 推荐目录结构

> 说明：你这次明确要求“目录放在指导文件里面，不需要分开放”。所以本章不生成独立目录包，下面目录只作为你在项目中手动创建练习文件的结构。

```txt
javascript/chapter-08-functions/
  javascript-chapter-08-functions-learning-guide-zh-v1.md
  javascript-chapter-08-functions-cheatsheet-zh-v1.md
  README.md

  00-function-runtime-model/
    functionRuntimeModel.md

  01-defining-functions/
    functionDeclarationExpressionArrow.js
    functionHoistingMistake.js

  02-invoking-functions-and-this/
    methodThisBinding.js
    arrowThisMistake.js
    constructorInvocation.js

  03-parameters-and-arguments/
    argumentsObjectDemo.js

  04-default-rest-destructured-parameters/
    defaultRestParameters.js
    destructuredParameters.js

  05-spread-in-function-calls/
    spreadCallDemo.js

  06-functions-as-values/
    callbackAsValue.js
    callbackCallMistake.js

  07-functions-as-namespaces/
    iifeNamespace.js

  08-closures/
    closureCounter.js
    closureLoopMistakeVar.js
    closureLoopFixLet.js

  09-function-object-properties/
    functionObjectProperties.js

  10-call-apply-bind/
    callApplyBindDemo.js
    bindPartialApplication.js

  11-function-constructor/
    functionConstructorScope.js

  12-functional-programming/
    functionalPipeline.js
    higherOrderFunction.js
    memoizeDemo.js

  13-functions-mini-project/
    pricingRuleEngine.js
    pricingRuleEngineMistakes.js
    pricingRuleEngineChecklist.md
```

---

## 6. 运行方式

### 推荐环境

```bash
node -v
```

推荐 Node 20 或更高版本。第 8 章示例不依赖浏览器 DOM，不需要安装第三方包。

### 单个文件运行

```bash
node javascript/chapter-08-functions/01-defining-functions/functionDeclarationExpressionArrow.js
```

### 故意错误文件运行

错误示例文件的目标不是“写正确代码”，而是让你观察错误类型：

```bash
node javascript/chapter-08-functions/01-defining-functions/functionHoistingMistake.js
```

### 运行后必须记录

每个文件运行后，在自己的笔记里记录：

```txt
1. Which function was created?
2. Which function was called?
3. What were the arguments?
4. What were the parameter bindings?
5. What was this?
6. What value was returned?
7. Was any outer variable captured?
8. Was any object mutated?
```

---

## 7. 分节训练内容

下面每个训练单元都要按同一个顺序做：

```txt
read conclusion
  -> create files
  -> type code manually
  -> run with Node
  -> compare output
  -> explain execution process
  -> write one mistake case
  -> convert into final notes
```

---

## 7.00：函数运行时模型总览

### 结论

第 8 章先建立一个总模型：函数定义会创建函数对象，函数调用会创建执行上下文。后面所有 `this`、参数、闭包、`call()`、`apply()`、`bind()` 都建立在这个模型上。

### 技术意义

如果你只从语法看函数，很容易把函数声明、函数表达式、箭头函数、方法、构造函数混成一类。先写一个运行时模型文件，可以在后续每节学习时反复对照：现在是在定义函数，还是在调用函数；现在创建的是函数对象，还是执行上下文。

### 底层机制

```txt
function definition
  -> create function object
  -> store parameter list
  -> store function body
  -> capture lexical environment

function invocation
  -> create execution context
  -> bind this
  -> bind parameters to arguments
  -> execute statements
  -> return value or undefined
```

### API / 语法规范

```txt
function name(parameters) { statements }
const name = function (parameters) { statements };
const name = (parameters) => expression;
object.method(arguments)
fn.call(thisArg, ...arguments)
fn.apply(thisArg, argumentsArray)
fn.bind(thisArg, ...boundArguments)
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
functionObject.name
functionObject.length
functionObject.prototype
Function.prototype.call(thisArg, ...args)
Function.prototype.apply(thisArg, argsArray)
Function.prototype.bind(thisArg, ...boundArgs)
```

### 文件结构

```txt
00-function-runtime-model/
  functionRuntimeModel.md
```

### 示例内容

`functionRuntimeModel.md`

```md
# Function runtime model

Definition time:
- A function object is created.
- The parameter list is stored.
- The function body is stored.
- The lexical environment is connected.

Call time:
- A new execution context is created.
- The call form decides this, except for arrow functions.
- Arguments are bound to parameters by position.
- The function body runs.
- The call returns a value or undefined.

Questions for every function example:
1. Which function object was created?
2. Which call expression invoked it?
3. What was this during the call?
4. Which arguments were bound to which parameters?
5. Did the function capture an outer lexical binding?
6. What value did the call return?
```

### 运行方式

这个文件是模型笔记，不需要用 Node 运行。你在写后面每个 `.js` 文件之前，先用它检查自己是否能说清楚“定义阶段”和“调用阶段”的区别。

### 预期输出

```txt
No runtime output.
```

### 执行过程

1. `functionRuntimeModel.md` 不是程序文件，而是第 8 章的检查清单。
2. 学习每个函数示例时，先判断是否处在 definition time。
3. 真正运行函数时，再判断 call time 发生了什么。
4. 遇到 `this`、闭包或 callback 问题时，回到这张模型表定位问题。

### 和实际项目的关系

React callback、事件处理器、Node middleware、数组方法 callback 都可以套进这张模型。你能稳定回答这六个问题，后面函数相关错误会少很多。

### 常见错误

- 把函数定义和函数调用混成一件事。
- 把函数对象和函数调用返回值混成一件事。
- 只看函数写在哪里，不看函数怎么被调用。
- 以为闭包复制变量值，而不是保存词法环境引用。

### 最终记忆模型

```txt
function definition creates reusable behavior.
function invocation creates a running context.
closure connects a function to outer lexical bindings.
```

---

## 7.01：定义函数：声明、表达式、箭头函数

### 结论

函数声明（function declaration）、函数表达式（function expression）和箭头函数（arrow function）都会创建函数对象，但绑定时机、`this` 行为、是否能构造对象并不相同。

### 技术意义

这节解决“函数到底什么时候可用”的问题。你要区分函数声明的提升（hoisting）和函数表达式变量的暂时性死区或初始化时机。

### 底层机制

函数声明会在当前作用域创建函数绑定，因此可以在声明文本之前调用。函数表达式先创建函数对象，再把函数对象赋给变量；变量没有完成初始化之前不能读取。箭头函数是函数表达式的一种，语法短，但语义不是普通函数的缩写：它没有自己的 `this`、`arguments`、`super`，也不能作为构造函数。

### API / 语法规范

```txt
function name(parameterList) { statementList }
const name = function optionalName(parameterList) { statementList };
const name = (parameterList) => expression;
const name = (parameterList) => { statementList };
```

函数声明适合模块顶层公共行为；函数表达式适合把行为当作值传递；箭头函数适合短小 callback，不适合对象方法和构造函数。

### 固定属性名 / 固定方法名 / 参数签名

```txt
function functionName(...parameters) { ... }
const functionName = function optionalInternalName(...parameters) { ... };
const functionName = (...parameters) => expression;
```

### 文件结构

```txt
01-defining-functions/
  functionDeclarationExpressionArrow.js
  functionHoistingMistake.js
```
### 示例代码

`functionDeclarationExpressionArrow.js`

```js
// Goal:
// Compare function declarations, function expressions, and arrow functions.

console.log(squareDeclaration(4));

function squareDeclaration(value) {
  return value * value;
}

const squareExpression = function squareByExpression(value) {
  return value * value;
};

const squareArrow = (value) => value * value;

console.log(squareExpression(5));
console.log(squareArrow(6));
console.log(squareExpression.name);
console.log(squareArrow.name);
```

### 示例代码

`functionHoistingMistake.js`

```js
// Goal:
// Verify why function expressions are not callable before initialization.

try {
  console.log(buildLabel('A100'));
} catch (error) {
  console.log(error.name);
}

const buildLabel = function (productCode) {
  return `Product ${productCode}`;
};

console.log(buildLabel('B200'));
```
### 运行方式

```bash
node javascript/chapter-08-functions/01-defining-functions/functionDeclarationExpressionArrow.js
node javascript/chapter-08-functions/01-defining-functions/functionHoistingMistake.js
```

### 预期输出

```txt
16
25
36
squareByExpression
squareArrow
ReferenceError
Product B200
```

### 执行过程

1. `squareDeclaration(4)` 在函数声明文本之前运行，因为函数声明绑定已经创建。
2. `squareExpression` 保存一个函数对象，内部名字是 `squareByExpression`，所以 `name` 是这个内部名字。
3. `squareArrow` 从变量名推断函数名。
4. `buildLabel` 是 `const` 绑定，在初始化前读取会触发 `ReferenceError`。
5. 初始化完成后，`buildLabel('B200')` 正常调用。

### 和实际项目的关系

React 组件、工具函数、数组 callback、Node middleware 都是函数对象。你选择声明式函数还是函数表达式，不只是风格问题，也影响提升、调试名和 `this` 行为。

### 常见错误

- 把箭头函数当成普通函数的完全替代。
- 在 `const fn = function () {}` 之前调用 `fn()`。
- 以为函数表达式内部名字一定等于变量名。
- 在需要动态 `this` 的对象方法里使用箭头函数。

### 最终记忆模型

```txt
function definition creates a function object.
function declaration binding is available early.
function expression binding depends on variable initialization.
arrow function is shorter syntax with different this semantics.
```

---

## 7.02：调用函数与 this：普通调用、方法调用、构造调用

### 结论

函数怎么被调用，决定 `this` 是什么；`this` 不是由函数定义位置单独决定的，箭头函数除外。

### 技术意义

这节解决你后面最容易混的核心问题：为什么同一个函数作为对象方法能正常读属性，拆出来调用就读不到原对象。

### 底层机制

JavaScript 在调用表达式求值时先计算被调用的函数值，再根据调用形式决定 `this`。`object.method()` 会把 `object` 作为 `this`。`detachedMethod()` 只是普通函数调用，严格模式下 `this` 是 `undefined`。`new Constructor()` 会创建新对象，把新对象绑定为 `this`，再执行函数体。箭头函数不创建自己的 `this` 绑定，而是捕获外层 `this`。

### API / 语法规范

```txt
fn(arg1, arg2)
object.method(arg1, arg2)
new Constructor(arg1, arg2)
fn.call(thisArg, arg1, arg2)
```

方法调用里的“点左边对象”很重要。`this` 不是函数的固定属性，而是一次调用的运行时绑定。

### 固定属性名 / 固定方法名 / 参数签名

```txt
fn(...arguments)
object.method(...arguments)
new Constructor(...arguments)
Function.prototype.call(thisArg, ...arguments)
```

### 文件结构

```txt
02-invoking-functions-and-this/
  methodThisBinding.js
  arrowThisMistake.js
  constructorInvocation.js
```
### 示例代码

`methodThisBinding.js`

```js
// Goal:
// Verify how method invocation binds this.

"use strict";

const cartSummary = {
  owner: 'Mina',
  itemCount: 3,
  describe() {
    return `${this.owner} has ${this.itemCount} items`;
  },
};

console.log(cartSummary.describe());

const detachedDescribe = cartSummary.describe;

try {
  console.log(detachedDescribe());
} catch (error) {
  console.log(error.name);
}
```

### 示例代码

`arrowThisMistake.js`

```js
// Goal:
// Verify why an arrow function is usually wrong for an object method that needs this.

const invoiceRecord = {
  total: 120,
  describe: () => `Total is ${this.total}`,
};

console.log(invoiceRecord.describe());
```

### 示例代码

`constructorInvocation.js`

```js
// Goal:
// Verify how constructor invocation creates and initializes an object.

function ProductDraft(title, price) {
  this.title = title;
  this.price = price;
}

const keyboard = new ProductDraft('Keyboard', 89);

console.log(keyboard.title);
console.log(keyboard.price);
console.log(keyboard instanceof ProductDraft);
```
### 运行方式

```bash
node javascript/chapter-08-functions/02-invoking-functions-and-this/methodThisBinding.js
node javascript/chapter-08-functions/02-invoking-functions-and-this/arrowThisMistake.js
node javascript/chapter-08-functions/02-invoking-functions-and-this/constructorInvocation.js
```

### 预期输出

```txt
Mina has 3 items
TypeError
Total is undefined
Keyboard
89
true
```

### 执行过程

1. `cartSummary.describe()` 是方法调用，`this` 绑定到 `cartSummary`。
2. `detachedDescribe` 只保存函数对象，不保存原对象。
3. `detachedDescribe()` 是普通调用，严格模式下 `this` 是 `undefined`，读取属性触发错误。
4. `invoiceRecord.describe` 是箭头函数，`this` 来自外层作用域，不是 `invoiceRecord`。
5. `new ProductDraft(...)` 创建对象，并让构造函数中的 `this` 指向这个新对象。

### 和实际项目的关系

React class 旧写法、对象服务方法、Node handler、事件监听器都会遇到 `this`。现代 React 函数组件减少了 `this`，但你理解 `this` 后才能真正看懂旧代码、库代码和 `bind()`。

### 常见错误

- 以为 `const f = obj.method; f()` 还能自动记住 `obj`。
- 用箭头函数写需要访问对象属性的方法。
- 忘记使用 `new` 调用构造函数。
- 把 `this` 理解成“函数所属对象”，而不是“一次调用的绑定”。

### 最终记忆模型

```txt
this is call-site dependent.
method call binds this to the receiver object.
regular call does not preserve the original object.
arrow function captures lexical this.
new call binds this to a new object.
```

---

## 7.03：实参与形参：数量不检查与 arguments 对象

### 结论

JavaScript 调用函数时不检查实参数量，也不检查实参类型；形参按位置绑定，缺失形参得到 `undefined`，多余实参仍可通过 `arguments` 访问。

### 技术意义

这节解决“为什么函数定义两个参数，但传三个也不报错”的问题。

### 底层机制

每次非箭头函数调用都会创建一个类数组的 `arguments` 对象。它保存本次调用传入的所有实参。形参只是把对应位置的实参绑定到名字上。传少了，缺失位置的形参是 `undefined`。传多了，多余值不会绑定到命名形参，但仍在 `arguments` 中。现代代码优先使用剩余参数（rest parameter）而不是 `arguments`。

### API / 语法规范

```txt
function fn(a, b) { ... }
arguments.length
arguments[0]
arguments[1]
```

`arguments` 是类数组对象，不是真数组。箭头函数没有自己的 `arguments`。

### 固定属性名 / 固定方法名 / 参数签名

```txt
function fn(parameter1, parameter2) { ... }
arguments.length
arguments[index]
```

### 文件结构

```txt
03-parameters-and-arguments/
  argumentsObjectDemo.js
```
### 示例代码

`argumentsObjectDemo.js`

```js
// Goal:
// Compare named parameters and the arguments object.

function buildLineTotal(unitPrice, quantity) {
  console.log(arguments.length);
  console.log(arguments[0]);
  console.log(arguments[1]);
  return unitPrice * quantity;
}

console.log(buildLineTotal(25, 4, 'ignored label'));
```
### 运行方式

```bash
node javascript/chapter-08-functions/03-parameters-and-arguments/argumentsObjectDemo.js
```

### 预期输出

```txt
3
25
4
100
```

### 执行过程

1. 调用 `buildLineTotal(25, 4, 'ignored label')` 时传入 3 个实参。
2. `unitPrice` 绑定到 `25`，`quantity` 绑定到 `4`。
3. 第三个实参没有命名形参接收，但仍保存在 `arguments[2]`。
4. 函数返回 `25 * 4`，结果是 `100`。

### 和实际项目的关系

实际项目里，旧代码和库源码常用 `arguments` 处理可变参数。现代业务代码更推荐 `...rest`，因为它是真数组，语义更清楚。

### 常见错误

- 以为函数参数数量不匹配一定报错。
- 在箭头函数里使用 `arguments`。
- 把 `arguments` 当成真正数组直接调用数组专属方法。
- 忽略多余实参导致 API 调用方以为参数生效。

### 最终记忆模型

```txt
arguments are call-time values.
parameters are local bindings.
JavaScript does not enforce arity.
prefer rest parameters in modern code.
```

---

## 7.04：默认参数、剩余参数与解构参数

### 结论

默认参数（default parameter）、剩余参数（rest parameter）和解构参数（destructured parameter）用于把“调用边界”写清楚。

### 技术意义

这节解决真实项目里函数参数越来越多、可选参数越来越多时如何保持可读性的问题。

### 底层机制

默认参数只在对应实参是 `undefined` 或缺失时生效。剩余参数必须放在参数列表最后，它会把剩余实参收集成真数组。解构参数会在调用开始时从对象或数组中取出属性并绑定到局部名字。

### API / 语法规范

```txt
function fn(a = defaultValue) { ... }
function fn(first, ...rest) { ... }
function fn({ propertyName, otherName = defaultValue }) { ... }
```

解构参数适合配置对象（options object）或 API payload，不适合完全不受信任的数据边界；外部数据仍应先验证。

### 固定属性名 / 固定方法名 / 参数签名

```txt
function fn(parameter = defaultValue)
function fn(...restParameter)
function fn({ property, other = defaultValue })
```

### 文件结构

```txt
04-default-rest-destructured-parameters/
  defaultRestParameters.js
  destructuredParameters.js
```
### 示例代码

`defaultRestParameters.js`

```js
// Goal:
// Verify default parameters and rest parameters.

function createSearchUrl(query, page = 1, ...filters) {
  const encodedQuery = encodeURIComponent(query);
  const filterPart = filters.join(',');
  return `/search?q=${encodedQuery}&page=${page}&filters=${filterPart}`;
}

console.log(createSearchUrl('desk lamp'));
console.log(createSearchUrl('desk lamp', 2, 'sale', 'in-stock'));
console.log(createSearchUrl('desk lamp', undefined, 'new'));
```

### 示例代码

`destructuredParameters.js`

```js
// Goal:
// Verify how object destructuring works in a parameter list.

function formatOrderSummary({ orderId, customerName, total = 0 }) {
  return `${orderId}: ${customerName} owes ${total}`;
}

const orderRecord = {
  orderId: 'O-1001',
  customerName: 'Nora',
};

console.log(formatOrderSummary(orderRecord));
```
### 运行方式

```bash
node javascript/chapter-08-functions/04-default-rest-destructured-parameters/defaultRestParameters.js
node javascript/chapter-08-functions/04-default-rest-destructured-parameters/destructuredParameters.js
```

### 预期输出

```txt
/search?q=desk%20lamp&page=1&filters=
/search?q=desk%20lamp&page=2&filters=sale,in-stock
/search?q=desk%20lamp&page=1&filters=new
O-1001: Nora owes 0
```

### 执行过程

1. 第一次调用没有传 `page`，默认值 `1` 生效。
2. 第二次调用传了 `2`，默认值不生效，`filters` 收集两个字符串。
3. 第三次显式传 `undefined`，默认值仍然生效。
4. `formatOrderSummary(orderRecord)` 从对象中读取 `orderId` 和 `customerName`。
5. `total` 不存在，所以默认值 `0` 生效。

### 和实际项目的关系

React props、Node route options、工具函数配置对象都大量使用默认参数和解构参数。理解它们后，你会更容易设计清晰的函数 API。

### 常见错误

- 以为传入 `null` 会触发默认参数。不会，只有缺失或 `undefined`。
- 把剩余参数写在中间位置。
- 解构 `undefined`，导致运行时错误。
- 参数过多却不用 options object，调用方难以读懂。

### 最终记忆模型

```txt
default parameters handle missing or undefined.
rest parameters collect extra arguments into an array.
destructured parameters turn object properties into local bindings.
```

---

## 7.05：调用中的扩展语法

### 结论

函数调用里的扩展语法（spread syntax）把可迭代对象展开成一个个实参。

### 技术意义

这节解决“数组里的值如何作为多个参数传给函数”的问题。

### 底层机制

调用表达式求值时，`...iterable` 会先遍历可迭代对象，然后把产出的每个值按顺序放进实参列表。它和剩余参数方向相反：剩余参数把多个实参收集成数组；扩展语法把数组或可迭代对象展开成多个实参。

### API / 语法规范

```txt
fn(...iterable)
Math.max(...numbers)
new Constructor(...argumentsArray)
```

扩展语法要求右侧是可迭代对象。普通对象不能直接在函数调用里展开成实参。

### 固定属性名 / 固定方法名 / 参数签名

```txt
fn(...iterable)
new Constructor(...iterable)
```

### 文件结构

```txt
05-spread-in-function-calls/
  spreadCallDemo.js
```
### 示例代码

`spreadCallDemo.js`

```js
// Goal:
// Verify how spread syntax expands an array into call arguments.

function calculateDiscountedPrice(price, discountRate, taxRate) {
  const discounted = price * (1 - discountRate);
  return Number((discounted * (1 + taxRate)).toFixed(2));
}

const pricingArguments = [100, 0.15, 0.08];

console.log(calculateDiscountedPrice(...pricingArguments));
```
### 运行方式

```bash
node javascript/chapter-08-functions/05-spread-in-function-calls/spreadCallDemo.js
```

### 预期输出

```txt
91.8
```

### 执行过程

1. `pricingArguments` 是 `[100, 0.15, 0.08]`。
2. `calculateDiscountedPrice(...pricingArguments)` 展开为 `calculateDiscountedPrice(100, 0.15, 0.08)`。
3. `price` 绑定 `100`，`discountRate` 绑定 `0.15`，`taxRate` 绑定 `0.08`。
4. 折扣后是 `85`，加税后是 `91.8`。

### 和实际项目的关系

数组数据进入函数是非常常见的工程动作。测试数据、API 返回行、批量参数都可能需要用扩展语法转成函数调用。

### 常见错误

- 混淆 rest parameter 和 spread syntax。
- 对普通对象使用 `fn(...object)`。
- 展开数组时顺序和函数参数顺序不一致。
- 把扩展语法当成深拷贝机制。

### 最终记忆模型

```txt
rest collects arguments.
spread expands an iterable into arguments.
parameter order still matters.
```

---

## 7.06：函数作为值与回调函数

### 结论

函数是一等值（first-class value）：可以保存到变量、放进对象或数组、作为参数传入、作为返回值返回。

### 技术意义

这节解决 callback 的根本模型：传函数不是传“函数结果”，而是把一段行为交给另一个函数稍后调用。

### 底层机制

当你写 `applyPriceRule(100, addTenPercentTax)` 时，第二个实参是函数对象本身。当你写 `applyPriceRule(100, addTenPercentTax())` 时，第二个实参是调用结果。高阶函数就是利用这种能力把行为抽象出来。

### API / 语法规范

```txt
function higherOrderFunction(value, callback) { return callback(value); }
array.map(callback)
setTimeout(callback, delay)
```

`callback` 是普通参数名，不是特殊语法。真正特殊的是“这个参数保存的是函数对象”。

### 固定属性名 / 固定方法名 / 参数签名

```txt
function fn(value, callback)
callback(argument)
array.map(callback)
```

### 文件结构

```txt
06-functions-as-values/
  callbackAsValue.js
  callbackCallMistake.js
```
### 示例代码

`callbackAsValue.js`

```js
// Goal:
// Verify that a function can be stored, passed, and called later.

function applyPriceRule(price, rule) {
  return rule(price);
}

const addTenPercentTax = (price) => price * 1.1;
const removeTwentyPercent = (price) => price * 0.8;

console.log(applyPriceRule(100, addTenPercentTax));
console.log(applyPriceRule(100, removeTwentyPercent));
```

### 示例代码

`callbackCallMistake.js`

```js
// Goal:
// Verify the difference between passing a function and calling it immediately.

function runLater(task) {
  console.log('before');
  task();
  console.log('after');
}

function printTaskName() {
  console.log('task');
}

runLater(printTaskName);

try {
  runLater(printTaskName());
} catch (error) {
  console.log(error.name);
}
```
### 运行方式

```bash
node javascript/chapter-08-functions/06-functions-as-values/callbackAsValue.js
node javascript/chapter-08-functions/06-functions-as-values/callbackCallMistake.js
```

### 预期输出

```txt
110.00000000000001
80
before
task
after
task
before
TypeError
```

### 执行过程

1. `addTenPercentTax` 和 `removeTwentyPercent` 都是函数值。
2. `applyPriceRule` 通过 `rule(price)` 调用传入函数。
3. `runLater(printTaskName)` 传入函数引用，`runLater` 内部稍后调用。
4. `runLater(printTaskName())` 会先执行 `printTaskName()`，它返回 `undefined`。
5. `runLater` 内部尝试调用 `undefined`，触发 `TypeError`。

### 和实际项目的关系

React 的 `onClick={handleClick}`、数组的 `map(callback)`、Node 的异步 callback 都依赖“函数作为值”。你必须能区分函数引用和函数调用。

### 常见错误

- 写成 `onClick={handleClick()}` 导致渲染时立即调用。
- 把 callback 参数名误认为固定 API 属性。
- 忽略浮点数计算结果不是精确十进制。
- 传入非函数值但后续当函数调用。

### 最终记忆模型

```txt
function reference is a value.
function call produces a result.
callback means another function will call your function later.
```

---

## 7.07：函数作为命名空间与 IIFE

### 结论

IIFE 可以创建局部作用域，把内部变量藏起来，只暴露需要的 API。

### 技术意义

这节对应书上的“函数作为命名空间”。在 ES module 普及前，IIFE 是避免全局污染的重要方式；现在仍然能帮助你理解闭包和模块。

### 底层机制

函数调用会创建局部作用域。IIFE 是定义后立即调用的函数表达式，函数内部变量在外部不可见，但返回的对象可以引用内部函数。内部函数通过闭包访问私有变量。

### API / 语法规范

```txt
(() => { ... })();
(function () { ... })();
const api = (() => { return { method }; })();
```

现代项目优先使用 ES module，但 IIFE 仍然是理解闭包私有状态的经典训练。

### 固定属性名 / 固定方法名 / 参数签名

```txt
(() => { ... })()
(function () { ... })()
```

### 文件结构

```txt
07-functions-as-namespaces/
  iifeNamespace.js
```
### 示例代码

`iifeNamespace.js`

```js
// Goal:
// Verify how an IIFE creates a private local scope.

const currencyTools = (() => {
  const defaultCurrencyCode = 'USD';

  function formatAmount(amount) {
    return `${defaultCurrencyCode} ${amount.toFixed(2)}`;
  }

  return {
    formatAmount,
  };
})();

console.log(currencyTools.formatAmount(18.5));
console.log(typeof defaultCurrencyCode);
```
### 运行方式

```bash
node javascript/chapter-08-functions/07-functions-as-namespaces/iifeNamespace.js
```

### 预期输出

```txt
USD 18.50
undefined
```

### 执行过程

1. 外层箭头函数立即执行。
2. `defaultCurrencyCode` 是 IIFE 内部局部常量。
3. `formatAmount` 通过闭包访问 `defaultCurrencyCode`。
4. IIFE 返回只包含 `formatAmount` 的对象。
5. 外部无法直接访问 `defaultCurrencyCode`，所以 `typeof defaultCurrencyCode` 是 `undefined`。

### 和实际项目的关系

模块、组件、工具库都需要控制暴露边界。IIFE 是老式模块模式，ES module 是现代模块系统，但二者都服务于“不要把内部实现泄漏到外部”。

### 常见错误

- 把 IIFE 当成必须掌握的现代模块写法，而不是理解作用域的训练。
- 忘记最后的调用括号。
- 在 IIFE 外部直接访问内部局部变量。
- 返回过多内部细节，失去封装意义。

### 最终记忆模型

```txt
function call creates local scope.
IIFE creates and immediately uses that scope.
returned functions can still close over private variables.
```

---

## 7.08：闭包：词法环境与私有状态

### 结论

闭包让内部函数在外部函数返回后，仍然能访问外部函数当时创建的词法环境。

### 技术意义

这节是第 8 章最重要的内容。闭包是 callback、事件处理器、React Hook、模块私有状态、memoization 的底层基础。

### 底层机制

函数创建时会关联它所在的词法环境。只要返回的函数仍然可达，它引用的外层变量也仍然可达，不会被垃圾回收。`let` 在循环中会为每次迭代创建新绑定；`var` 是函数作用域，同一个变量被所有闭包共享。

### API / 语法规范

```txt
function outer() {
  let privateValue = 0;
  return function inner() {
    privateValue += 1;
    return privateValue;
  };
}
```

闭包保存的是绑定关系，不是简单复制一份值。

### 固定属性名 / 固定方法名 / 参数签名

```txt
function outer() { let x = value; return function inner() { return x; }; }
```

### 文件结构

```txt
08-closures/
  closureCounter.js
  closureLoopMistakeVar.js
  closureLoopFixLet.js
```
### 示例代码

`closureCounter.js`

```js
// Goal:
// Verify that a closure keeps access to an outer lexical environment.

function createVisitCounter(label) {
  let count = 0;

  return function countVisit() {
    count += 1;
    return `${label}: ${count}`;
  };
}

const homeCounter = createVisitCounter('home');
const cartCounter = createVisitCounter('cart');

console.log(homeCounter());
console.log(homeCounter());
console.log(cartCounter());
console.log(homeCounter());
```

### 示例代码

`closureLoopMistakeVar.js`

```js
// Goal:
// Verify why var creates one shared function-scoped loop variable.

const handlers = [];

for (var index = 0; index < 3; index += 1) {
  handlers.push(function readIndex() {
    return index;
  });
}

console.log(handlers[0]());
console.log(handlers[1]());
console.log(handlers[2]());
```

### 示例代码

`closureLoopFixLet.js`

```js
// Goal:
// Verify why let creates a fresh binding for each loop iteration.

const handlers = [];

for (let index = 0; index < 3; index += 1) {
  handlers.push(function readIndex() {
    return index;
  });
}

console.log(handlers[0]());
console.log(handlers[1]());
console.log(handlers[2]());
```
### 运行方式

```bash
node javascript/chapter-08-functions/08-closures/closureCounter.js
node javascript/chapter-08-functions/08-closures/closureLoopMistakeVar.js
node javascript/chapter-08-functions/08-closures/closureLoopFixLet.js
```

### 预期输出

```txt
home: 1
home: 2
cart: 1
home: 3
3
3
3
0
1
2
```

### 执行过程

1. 每次调用 `createVisitCounter` 都创建一个新的 `count` 绑定。
2. `homeCounter` 和 `cartCounter` 关闭在不同词法环境上，因此计数互不影响。
3. `var index` 只有一个函数作用域绑定，循环结束后值是 `3`，所有 handler 都读这个同一个绑定。
4. `let index` 在每次循环迭代中创建新的绑定，三个 handler 分别读 `0`、`1`、`2`。

### 和实际项目的关系

React Hook 能记住 state，事件处理器能访问创建时的变量，防抖节流函数能保存 timer id，这些都离不开闭包。

### 常见错误

- 以为闭包复制变量值，而不是引用词法环境绑定。
- 用 `var` 创建循环 callback，所有函数读到同一个最终值。
- 在闭包里长期保存大对象，造成内存无法释放。
- 把闭包神秘化；它只是函数加词法环境引用。

### 最终记忆模型

```txt
closure = function + lexical environment.
returned inner function keeps outer variables reachable.
let creates iteration bindings; var creates one shared function binding.
```

---

## 7.09：函数对象属性：name、length、prototype、toString

### 结论

函数也是对象，所以函数有属性和方法；但这些属性描述的是函数对象，不是函数调用结果。

### 技术意义

这节解决“为什么函数可以 `.name`、`.length`、`.bind()`”的问题。

### 底层机制

函数对象继承自 `Function.prototype`，因此可以调用 `call()`、`apply()`、`bind()`、`toString()` 等方法。`name` 通常用于调试显示函数名。`length` 是函数期望的形参数量，通常不计算带默认值之后的参数和剩余参数。普通可构造函数有 `prototype` 属性，用于 `new` 创建对象时设置原型。

### API / 语法规范

```txt
fn.name
fn.length
fn.prototype
fn.toString()
```

`fn.length` 不是调用时实参数量。调用时实参数量看 `arguments.length` 或 rest 参数数组长度。

### 固定属性名 / 固定方法名 / 参数签名

```txt
functionObject.name
functionObject.length
functionObject.prototype
functionObject.toString()
```

### 文件结构

```txt
09-function-object-properties/
  functionObjectProperties.js
```
### 示例代码

`functionObjectProperties.js`

```js
// Goal:
// Inspect function object properties.

function calculateShipping(weight, distance, express = false) {
  return weight * distance * (express ? 0.08 : 0.04);
}

console.log(calculateShipping.name);
console.log(calculateShipping.length);
console.log(typeof calculateShipping.prototype);
console.log(calculateShipping.toString().includes('calculateShipping'));
```
### 运行方式

```bash
node javascript/chapter-08-functions/09-function-object-properties/functionObjectProperties.js
```

### 预期输出

```txt
calculateShipping
2
object
true
```

### 执行过程

1. `calculateShipping.name` 是函数名。
2. `calculateShipping.length` 是默认参数前面的形参数量，所以是 `2`。
3. 普通函数有 `prototype` 属性，其类型是对象。
4. `toString()` 通常返回包含函数源码的字符串，因此包含函数名。

### 和实际项目的关系

调试、日志、元编程、测试工具、框架内部都会检查函数对象属性。你不必频繁手写这些属性，但要知道它们来自函数对象模型。

### 常见错误

- 把 `fn.length` 当成运行时实参数量。
- 以为箭头函数也能作为构造函数使用 `prototype`。
- 依赖 `toString()` 做业务逻辑。
- 把函数对象属性和函数返回值混在一起。

### 最终记忆模型

```txt
function is object.
name is debug identity.
length is expected parameter count.
prototype is for constructor-created instances.
```

---

## 7.10：call、apply、bind：显式控制 this 和参数

### 结论

`call()`、`apply()` 和 `bind()` 都来自 `Function.prototype`，核心作用是显式指定 `this`，区别在于参数形式和是否立即调用。

### 技术意义

这节解决“拆出来的方法如何重新绑定 this”和“为什么 bind 后不会立刻执行”的问题。

### 底层机制

`call()` 立即调用函数，参数逐个传入。`apply()` 立即调用函数，但实参用数组或类数组提供。`bind()` 不立即调用，而是返回一个新函数；这个新函数的 `this` 和前置参数已经被固定。

### API / 语法规范

```txt
fn.call(thisArg, arg1, arg2)
fn.apply(thisArg, [arg1, arg2])
const boundFn = fn.bind(thisArg, arg1)
boundFn(arg2)
```

`bind()` 常用于修复 callback 里的 `this` 丢失，也可用于局部应用（partial application）。

### 固定属性名 / 固定方法名 / 参数签名

```txt
Function.prototype.call(thisArg, ...args)
Function.prototype.apply(thisArg, argsArray)
Function.prototype.bind(thisArg, ...boundArgs)
```

### 文件结构

```txt
10-call-apply-bind/
  callApplyBindDemo.js
  bindPartialApplication.js
```
### 示例代码

`callApplyBindDemo.js`

```js
// Goal:
// Compare call, apply, and bind.

function describePurchase(prefix, suffix) {
  return `${prefix} ${this.customerName} bought ${this.itemCount} items ${suffix}`;
}

const purchaseContext = {
  customerName: 'Ari',
  itemCount: 4,
};

console.log(describePurchase.call(purchaseContext, 'Order:', '.'));
console.log(describePurchase.apply(purchaseContext, ['Order:', '!']));

const boundDescribePurchase = describePurchase.bind(purchaseContext, 'Bound:');
console.log(boundDescribePurchase('?'));
console.log(boundDescribePurchase.name);
```

### 示例代码

`bindPartialApplication.js`

```js
// Goal:
// Verify how bind can pre-fill arguments.

function buildApiPath(resourceName, resourceId, actionName) {
  return `/api/${resourceName}/${resourceId}/${actionName}`;
}

const buildProductPath = buildApiPath.bind(null, 'products');

console.log(buildProductPath('P100', 'edit'));
console.log(buildProductPath('P200', 'delete'));
```
### 运行方式

```bash
node javascript/chapter-08-functions/10-call-apply-bind/callApplyBindDemo.js
node javascript/chapter-08-functions/10-call-apply-bind/bindPartialApplication.js
```

### 预期输出

```txt
Order: Ari bought 4 items .
Order: Ari bought 4 items !
Bound: Ari bought 4 items ?
bound describePurchase
/api/products/P100/edit
/api/products/P200/delete
```

### 执行过程

1. `call` 把 `purchaseContext` 作为 `this`，并立即执行。
2. `apply` 也立即执行，但参数来自数组。
3. `bind` 返回新函数，没有立刻执行。
4. `boundDescribePurchase('?')` 才真正调用原函数。
5. `bind` 也能预先填入 `resourceName`，生成更具体的路径构造函数。

### 和实际项目的关系

事件处理器、类方法 callback、函数式工具函数都可能用到 `bind()`。即使现代 React 函数组件少写 `bind()`，理解它仍然能让你看懂旧代码和库源码。

### 常见错误

- 以为 `bind()` 会立即执行。
- 混淆 `call` 的散列参数和 `apply` 的数组参数。
- 对箭头函数使用 `call()` 期待改变 `this`。
- 多次 bind 后以为可以重新改变 this。

### 最终记忆模型

```txt
call invokes with explicit this and listed args.
apply invokes with explicit this and array args.
bind returns a new function with fixed this and optional fixed args.
```

---

## 7.11：Function 构造函数：动态编译与作用域差异

### 结论

`Function()` 构造函数可以在运行时从字符串创建函数，但它不会形成创建位置的闭包，只能访问自己的局部变量和全局作用域。

### 技术意义

这节不是鼓励使用 `Function()`，而是用它对比普通函数表达式的词法作用域。

### 底层机制

`new Function(parameterText, bodyText)` 会解析字符串并创建一个新函数对象。这个函数像顶层函数一样编译，不捕获创建位置的局部词法环境。频繁动态编译会有性能成本，也会带来安全风险。

### API / 语法规范

```txt
new Function('a', 'b', 'return a + b;')
Function('a', 'b', 'return a + b;')
```

最后一个字符串是函数体，前面的字符串是参数名。不应该把用户输入拼进函数体。

### 固定属性名 / 固定方法名 / 参数签名

```txt
new Function(functionBody)
new Function(arg1Name, functionBody)
new Function(arg1Name, arg2Name, functionBody)
```

### 文件结构

```txt
11-function-constructor/
  functionConstructorScope.js
```
### 示例代码

`functionConstructorScope.js`

```js
// Goal:
// Verify that Function constructor code uses global scope, not local closure scope.

const localTaxRate = 0.08;

function createUnsafeCalculator() {
  const localDiscountRate = 0.1;
  return new Function('price', 'return price * (1 - localDiscountRate);');
}

const unsafeCalculator = createUnsafeCalculator();

try {
  console.log(unsafeCalculator(100));
} catch (error) {
  console.log(error.name);
}

console.log(localTaxRate);
```
### 运行方式

```bash
node javascript/chapter-08-functions/11-function-constructor/functionConstructorScope.js
```

### 预期输出

```txt
ReferenceError
0.08
```

### 执行过程

1. `createUnsafeCalculator` 内部有 `localDiscountRate`。
2. `new Function(...)` 创建的函数不会捕获这个局部变量。
3. 调用 `unsafeCalculator(100)` 时，函数体查找 `localDiscountRate` 失败。
4. 因此捕获到 `ReferenceError`。
5. 外层模块作用域的 `localTaxRate` 正常存在，但它也不是这个动态函数的局部闭包。

### 和实际项目的关系

实际项目中几乎不应该用 `Function()` 处理业务逻辑。它常见于模板引擎、表达式解释器、构建工具内部。你需要知道它为什么危险。

### 常见错误

- 用 `Function()` 代替正常函数表达式。
- 以为 `Function()` 能访问创建处局部变量。
- 拼接用户输入造成代码注入风险。
- 在循环中反复创建动态函数造成性能问题。

### 最终记忆模型

```txt
Function constructor dynamically compiles code.
it does not close over local lexical scope.
normal function expressions are safer and usually preferred.
```

---

## 7.12：函数式编程：高阶函数、纯函数、memoize

### 结论

JavaScript 函数是一等值，所以可以用函数式编程（functional programming）风格组织数据转换。

### 技术意义

这节不是要求你把所有代码都写成函数式，而是训练你把“数据流”和“副作用”分开。

### 底层机制

`map()`、`filter()`、`reduce()` 接收函数值作为 callback。高阶函数可以返回新的函数。纯函数不依赖也不修改外部状态。memoization 使用闭包保存缓存，把昂贵计算的结果复用起来。

### API / 语法规范

```txt
array.filter(callback)
array.map(callback)
array.reduce(callback, initialValue)
function createSomething(config) { return function generated(value) { ... }; }
```

函数式风格的关键不是炫技，而是把每一步转换写成可测试的小函数。

### 固定属性名 / 固定方法名 / 参数签名

```txt
Array.prototype.map(callbackFn)
Array.prototype.filter(callbackFn)
Array.prototype.reduce(callbackFn, initialValue)
function higherOrder(...args) { return function (...args) { ... }; }
```

### 文件结构

```txt
12-functional-programming/
  functionalPipeline.js
  higherOrderFunction.js
  memoizeDemo.js
```
### 示例代码

`functionalPipeline.js`

```js
// Goal:
// Verify map, filter, and reduce with small pure functions.

const orderLines = [
  { sku: 'A1', quantity: 2, unitPrice: 30 },
  { sku: 'B2', quantity: 0, unitPrice: 15 },
  { sku: 'C3', quantity: 4, unitPrice: 8 },
];

const lineTotals = orderLines
  .filter((line) => line.quantity > 0)
  .map((line) => ({
    sku: line.sku,
    total: line.quantity * line.unitPrice,
  }));

const invoiceTotal = lineTotals.reduce((sum, line) => sum + line.total, 0);

console.log(lineTotals);
console.log(invoiceTotal);
```

### 示例代码

`higherOrderFunction.js`

```js
// Goal:
// Verify how a higher-order function returns another function.

function createMinimumQuantityFilter(minimumQuantity) {
  return function hasEnoughQuantity(line) {
    return line.quantity >= minimumQuantity;
  };
}

const orderLines = [
  { sku: 'A1', quantity: 1 },
  { sku: 'B2', quantity: 3 },
  { sku: 'C3', quantity: 5 },
];

const keepAtLeastThree = createMinimumQuantityFilter(3);

console.log(orderLines.filter(keepAtLeastThree));
```

### 示例代码

`memoizeDemo.js`

```js
// Goal:
// Verify a memoized function with a private closure cache.

function memoize(unaryFunction) {
  const cache = new Map();

  return function memoizedFunction(argument) {
    if (cache.has(argument)) {
      return cache.get(argument);
    }

    const value = unaryFunction(argument);
    cache.set(argument, value);
    return value;
  };
}

let calculationCount = 0;

const calculateShippingZone = memoize((postalCode) => {
  calculationCount += 1;
  return postalCode.startsWith('9') ? 'west' : 'standard';
});

console.log(calculateShippingZone('94105'));
console.log(calculateShippingZone('94105'));
console.log(calculateShippingZone('10001'));
console.log(calculationCount);
```
### 运行方式

```bash
node javascript/chapter-08-functions/12-functional-programming/functionalPipeline.js
node javascript/chapter-08-functions/12-functional-programming/higherOrderFunction.js
node javascript/chapter-08-functions/12-functional-programming/memoizeDemo.js
```

### 预期输出

```txt
[ { sku: 'A1', total: 60 }, { sku: 'C3', total: 32 } ]
92
[ { sku: 'B2', quantity: 3 }, { sku: 'C3', quantity: 5 } ]
west
west
standard
2
```

### 执行过程

1. `filter` 先移除数量为 `0` 的订单行。
2. `map` 把订单行转换成只包含 `sku` 和 `total` 的新对象。
3. `reduce` 把行总价累加成发票总价。
4. `createMinimumQuantityFilter(3)` 返回一个新函数，这个函数闭包保存 `minimumQuantity`。
5. `memoize` 内部的 `cache` 是私有变量，第二次查询同一 postal code 不再重新计算。

### 和实际项目的关系

React 中根据 state 派生 UI、Node 中转换 API payload、前端中处理表格数据都会大量用到函数式数据转换。

### 常见错误

- 为了函数式而写过度抽象代码。
- 在 `map()` callback 里修改外部状态。
- `reduce()` 没写初始值导致空数组错误。
- memoize 的 key 设计不稳定，导致缓存错误。

### 最终记忆模型

```txt
functions as values enable functional style.
higher-order functions receive or return functions.
closures can store private cache state.
keep transformations clear and side effects controlled.
```

---

## 8. 本章 API / 语法完整索引

### 8.1 函数定义语法

| 语法 | 创建什么 | 是否提升 | 是否有自己的 this | 是否有 arguments | 是否能 new | 典型用途 |
|---|---|---:|---:|---:|---:|---|
| `function name(...) {}` | 函数对象和函数绑定 | 是 | 是 | 是 | 是 | 普通工具函数、构造函数 |
| `const fn = function (...) {}` | 函数对象，再赋给变量 | 否 | 是 | 是 | 是 | callback、局部函数 |
| `const fn = (...) => ...` | 箭头函数对象 | 否 | 否 | 否 | 否 | 短 callback、词法 this |
| `{ method(...) {} }` | 对象方法 | 随对象创建 | 是 | 是 | 否 | 对象行为 |

### 8.2 调用方式索引

| 调用形式 | 示例 | this 绑定 | 返回值 |
|---|---|---|---|
| 普通调用 | `fn()` | 严格模式下 `undefined` | 函数 `return` 的值或 `undefined` |
| 方法调用 | `object.method()` | 点左边的对象 | 函数 `return` 的值或 `undefined` |
| 构造调用 | `new Constructor()` | 新创建的对象 | 新对象，除非显式返回对象 |
| 间接调用 | `fn.call(obj)` | 显式传入的 `thisArg` | 函数 `return` 的值或 `undefined` |

### 8.3 参数机制索引

| 语法 / 对象 | 所属位置 | 含义 | 返回 / 结果 | 常见坑 |
|---|---|---|---|---|
| `parameter` | 函数定义 | 接收某个位置的实参 | 局部绑定 | 不检查类型 |
| `argument` | 函数调用 | 传入函数的实际值 | 被绑定或进入 `arguments` | 多传不报错 |
| `arguments` | 非箭头函数内部 | 类数组实参对象 | object-like value | 箭头函数没有自己的 `arguments` |
| `parameter = value` | 参数列表 | 默认参数 | 缺失或 `undefined` 时使用默认值 | `null` 不触发默认值 |
| `...rest` | 参数列表最后 | 剩余参数数组 | 真数组 | 必须在最后 |
| `fn(...iterable)` | 调用表达式 | 展开可迭代对象 | 多个实参 | 不能展开普通对象作为实参 |

### 8.4 Function.prototype 方法索引

| 方法 | 签名 | 是否立即调用 | 参数形式 | 返回值 | 常见坑 |
|---|---|---:|---|---|---|
| `call()` | `fn.call(thisArg, ...args)` | 是 | 一个个实参 | 原函数返回值 | 不能改变箭头函数的词法 this |
| `apply()` | `fn.apply(thisArg, argsArray)` | 是 | 数组或类数组 | 原函数返回值 | 第二个参数必须是数组式参数集合 |
| `bind()` | `fn.bind(thisArg, ...boundArgs)` | 否 | 可预填部分参数 | 新函数 | 不会立刻执行 |
| `toString()` | `fn.toString()` | 是 | 无 | 字符串 | 不要依赖源码字符串做业务逻辑 |

### 8.5 函数对象属性索引

| 属性 | 所属对象 | 含义 | 是否可变 | 常见坑 |
|---|---|---|---:|---|
| `name` | function object | 函数名或推断名 | 通常只读 | 不应作为业务唯一标识 |
| `length` | function object | 默认参数前的形参数量 | 只读 | 不是实参数量 |
| `prototype` | constructable function | 构造调用创建实例时使用的原型对象 | 可重新赋值 | 箭头函数没有可用构造原型 |

### 8.6 Function 构造函数索引

```txt
new Function(functionBody)
new Function(arg1Name, functionBody)
new Function(arg1Name, arg2Name, functionBody)
```

| 特性 | 说明 |
|---|---|
| 创建时机 | 运行时动态解析字符串 |
| 作用域 | 不捕获创建位置局部作用域，只能访问自己的局部变量和全局作用域 |
| 性能 | 每次调用构造函数都要解析函数体 |
| 安全 | 拼接外部输入会有代码注入风险 |
| 建议 | 业务代码通常不要用 |

---

## 9. 本章常见错误总表

| 错误写法 | 错误类型 | 原因 | 正确判断方式 |
|---|---|---|---|
| `const fn = function() {}; fn` 前调用 | runtime error | `const` 绑定未初始化 | 函数声明才有可提前调用的绑定 |
| `obj.method` 拆出来直接调用 | runtime behavior error | 丢失方法调用形式，`this` 不再是原对象 | 用 `bind()` 或包装箭头函数 |
| 对需要动态 `this` 的方法使用箭头函数 | runtime behavior error | 箭头函数捕获外层 `this` | 对象方法用简写方法或普通函数 |
| 在箭头函数中使用 `arguments` | syntax / runtime context problem | 箭头函数没有自己的 `arguments` | 用剩余参数 `...args` |
| 默认参数期待 `null` 触发默认值 | logic error | 默认参数只对缺失或 `undefined` 生效 | 用 `value ?? defaultValue` 明确处理 |
| `runLater(task())` | runtime behavior error | 传入的是调用结果，不是函数引用 | 写 `runLater(task)` |
| `bind()` 后期待立即执行 | logic error | `bind()` 返回新函数 | 再调用返回的新函数 |
| 用 `Function()` 访问局部变量 | runtime error | 不形成局部闭包 | 用普通函数表达式或闭包 |
| `var` 循环中创建 callback | closure bug | 所有函数共享一个函数作用域变量 | 用 `let` 或 IIFE 创建新绑定 |
| `reduce()` 不传初始值 | runtime edge case | 空数组会抛错，首项类型可能不符合预期 | 总是传 `initialValue` |

### IDE 警告说明

```txt
1. no-unused-vars:
   练习文件中有些函数为了展示 name、length 或错误路径，可能没有被复杂复用。
   这是静态检查警告，不是 JavaScript 语法错误。

2. no-new-func:
   ESLint 常会警告 Function constructor。
   这是合理警告，因为动态编译字符串有安全和性能风险。

3. no-invalid-this:
   在模块顶层或箭头函数中使用 this，IDE 可能警告 this 不明确。
   第 8 章中 arrowThisMistake.js 是故意演示错误模型。

4. prefer-rest-params:
   现代代码推荐 rest parameter 替代 arguments。
   argumentsObjectDemo.js 是为了理解旧机制，不是推荐新代码写法。
```

---

## 10. 最终小项目：Pricing Rule Engine

### 项目目标

做一个小型价格规则引擎（pricing rule engine），训练第 8 章全部核心能力：

```txt
function as value
callback
closure private state
default parameter
rest/spread mental model
higher-order function
bind
TypeError validation
reduce functional pipeline
```

这个项目模拟真实电商系统里的“价格经过多个规则处理”：折扣、税费、最低价保护、审计日志。

### 使用到的本章知识点

| 知识点 | 在小项目中的角色 |
|---|---|
| 函数声明 | 定义规则引擎构造函数和规则函数 |
| 默认参数 | `initialRules = []`、`context = {}` |
| 函数作为值 | 把规则函数保存进 `rules` 数组 |
| callback | `reduce()` 调用每个规则函数 |
| 闭包 | `rules` 和 `auditLog` 是私有状态 |
| 高阶函数 | `createMinimumPriceRule()` 返回规则函数 |
| `bind()` | 创建绑定后的 `addNamedRule` |
| 错误处理 | 非函数规则抛出 `TypeError` |

### 推荐文件结构

```txt
13-functions-mini-project/
  pricingRuleEngine.js
  pricingRuleEngineMistakes.js
  pricingRuleEngineChecklist.md
```

### 主文件代码

`pricingRuleEngine.js`

```js
// Goal:
// Build a small pricing rule engine with functions, callbacks, closures, and bind.

function createRuleEngine(initialRules = []) {
  const rules = [...initialRules];
  const auditLog = [];

  function addRule(ruleName, ruleFunction) {
    if (typeof ruleFunction !== 'function') {
      throw new TypeError('ruleFunction must be a function');
    }

    rules.push({ ruleName, ruleFunction });
    auditLog.push(`added:${ruleName}`);
  }

  function runRules(basePrice, context = {}) {
    return rules.reduce(
      (currentPrice, ruleRecord) => {
        const nextPrice = ruleRecord.ruleFunction(currentPrice, context);
        auditLog.push(`ran:${ruleRecord.ruleName}:${nextPrice.toFixed(2)}`);
        return nextPrice;
      },
      basePrice,
    );
  }

  function getAuditLog() {
    return [...auditLog];
  }

  return {
    addRule,
    runRules,
    getAuditLog,
  };
}

function applyPercentDiscount(price, context) {
  return price * (1 - context.discountRate);
}

function applyRegionalTax(price, context) {
  return price * (1 + context.taxRate);
}

function createMinimumPriceRule(minimumPrice) {
  return function enforceMinimumPrice(price) {
    return Math.max(price, minimumPrice);
  };
}

const engine = createRuleEngine();

engine.addRule('discount', applyPercentDiscount);
engine.addRule('tax', applyRegionalTax);
engine.addRule('minimum', createMinimumPriceRule(50));

const finalPrice = engine.runRules(80, {
  discountRate: 0.25,
  taxRate: 0.1,
});

console.log(Number(finalPrice.toFixed(2)));
console.log(engine.getAuditLog());

const addNamedRule = engine.addRule.bind(engine);
addNamedRule('extra-minimum', createMinimumPriceRule(70));

console.log(Number(engine.runRules(80, {
  discountRate: 0.25,
  taxRate: 0.1,
}).toFixed(2)));
```

### 对比 / 错误文件代码

`pricingRuleEngineMistakes.js`

```js
// Goal:
// Verify common mistakes in the pricing rule engine.

function createRuleEngine(initialRules = []) {
  const rules = [...initialRules];

  function addRule(ruleName, ruleFunction) {
    if (typeof ruleFunction !== 'function') {
      throw new TypeError('ruleFunction must be a function');
    }

    rules.push({ ruleName, ruleFunction });
  }

  function runRules(basePrice, context = {}) {
    return rules.reduce(
      (currentPrice, ruleRecord) => ruleRecord.ruleFunction(currentPrice, context),
      basePrice,
    );
  }

  return {
    addRule,
    runRules,
  };
}

const engine = createRuleEngine();

try {
  engine.addRule('bad-rule', 123);
} catch (error) {
  console.log(error.name);
}

const detachedAddRule = engine.addRule;

detachedAddRule('discount', (price) => price * 0.9);

console.log(engine.runRules(100));
```

### 运行方式

```bash
node javascript/chapter-08-functions/13-functions-mini-project/pricingRuleEngine.js
node javascript/chapter-08-functions/13-functions-mini-project/pricingRuleEngineMistakes.js
```

### 预期输出

```txt
66
[ 'added:discount', 'added:tax', 'added:minimum', 'ran:discount:60.00', 'ran:tax:66.00', 'ran:minimum:66.00' ]
70
TypeError
90
```

### 完整执行过程

1. `createRuleEngine()` 调用时创建 `rules` 和 `auditLog` 两个局部变量。
2. 返回对象中的 `addRule`、`runRules`、`getAuditLog` 都是闭包，共享同一组私有变量。
3. `engine.addRule('discount', applyPercentDiscount)` 把函数对象保存进 `rules`。
4. `runRules(80, context)` 用 `reduce()` 从 `basePrice` 开始逐条运行规则。
5. 折扣规则把 `80` 变成 `60`。
6. 税费规则把 `60` 变成 `66`。
7. 最低价规则检查 `66` 和 `50`，返回 `66`。
8. `getAuditLog()` 返回 `auditLog` 的浅拷贝，避免外部直接修改内部数组。
9. `bind()` 返回新函数 `addNamedRule`；这里普通方法没有使用 `this`，所以绑定 `engine` 只是演示绑定形式。
10. 添加 `extra-minimum` 后再次运行，最终结果被最低价规则提升到 `70`。

### API 角色表

| API / 语法 | 在小项目中的角色 |
|---|---|
| `function` | 定义引擎和规则函数 |
| default parameter | 给初始规则和 context 默认值 |
| spread syntax | 复制初始规则数组 |
| closure | 保存私有 `rules` 和 `auditLog` |
| `typeof value === 'function'` | 验证规则必须是函数 |
| `Array.prototype.push()` | 添加规则和审计记录 |
| `Array.prototype.reduce()` | 串联执行规则 |
| `Function.prototype.bind()` | 创建绑定函数 |
| `TypeError` | 表示参数类型不符合规则 |

### 常见错误

- 把规则执行结果传入 `addRule`，而不是传入规则函数本身。
- 让外部直接访问 `rules` 数组，破坏封装。
- `getAuditLog()` 直接返回内部数组，导致外部可修改内部状态。
- 规则函数修改 `context`，导致后续规则结果不可预测。
- 用 `bind()` 后忘记调用返回的新函数。

### 可扩展任务

```txt
1. Add a rule priority field.
2. Add a removeRule(ruleName) method.
3. Add async rule support later after Chapter 13.
4. Add a dryRun option that returns intermediate steps.
5. Add validation for context.discountRate and context.taxRate.
```

### 和真实项目 / 简历项目的关系

这个小项目虽然小，但模型非常真实。电商、订阅系统、优惠券系统、表单校验系统、权限系统都可以被抽象成“输入经过多个规则函数处理”。这类项目能训练你把函数当成行为单元，而不是只把函数当成语法块。

### 最终记忆模型

```txt
A rule engine is functions as data.
Rules are callback functions stored in private closure state.
runRules is a functional pipeline.
createMinimumPriceRule is a higher-order function.
getAuditLog protects private state by returning a copy.
```

---

## 11. 额外 cheatsheet

本章额外 cheatsheet 文件：

```txt
javascript/chapter-08-functions/javascript-chapter-08-functions-cheatsheet-zh-v1.md
```

cheatsheet 用于学习后快速复习，不替代本指导文件。它必须包含：

```txt
1. 函数定义形式速查
2. 调用形式与 this 速查
3. 参数机制速查
4. call / apply / bind 对比
5. 函数对象属性速查
6. 闭包常见场景
7. 常见错误与判断方式
8. 官方文档链接
```

---

## 12. 最终文件清单

> 这是本章最终应该出现在你项目中的文件清单。这里再次完整列出，防止只看前面的目录时漏文件。

```txt
javascript/chapter-08-functions/
  javascript-chapter-08-functions-learning-guide-zh-v1.md
  javascript-chapter-08-functions-cheatsheet-zh-v1.md
  README.md

  00-function-runtime-model/
    functionRuntimeModel.md

  01-defining-functions/
    functionDeclarationExpressionArrow.js
    functionHoistingMistake.js

  02-invoking-functions-and-this/
    methodThisBinding.js
    arrowThisMistake.js
    constructorInvocation.js

  03-parameters-and-arguments/
    argumentsObjectDemo.js

  04-default-rest-destructured-parameters/
    defaultRestParameters.js
    destructuredParameters.js

  05-spread-in-function-calls/
    spreadCallDemo.js

  06-functions-as-values/
    callbackAsValue.js
    callbackCallMistake.js

  07-functions-as-namespaces/
    iifeNamespace.js

  08-closures/
    closureCounter.js
    closureLoopMistakeVar.js
    closureLoopFixLet.js

  09-function-object-properties/
    functionObjectProperties.js

  10-call-apply-bind/
    callApplyBindDemo.js
    bindPartialApplication.js

  11-function-constructor/
    functionConstructorScope.js

  12-functional-programming/
    functionalPipeline.js
    higherOrderFunction.js
    memoizeDemo.js

  13-functions-mini-project/
    pricingRuleEngine.js
    pricingRuleEngineMistakes.js
    pricingRuleEngineChecklist.md
```

### 本次交付说明

```txt
本次不单独生成 zip 目录包。
目录结构已经写在指导文件第 5 节和第 12 节。
你可以按目录树手动创建文件。
```

---

## 13. 最终学习笔记转换要求

完成练习后，把这份指导文件转换成你自己的正式笔记。正式笔记不要照抄示例代码，要写出你自己的执行模型。

### 每节笔记必须包含

```txt
1. 这个机制解决什么问题。
2. JavaScript 运行时创建了什么。
3. 函数调用时参数怎么绑定。
4. this 在该例子中是什么。
5. 是否创建闭包。
6. 是否修改外部状态。
7. 输出为什么是这个结果。
8. 和 React / Node / TypeScript 的关系。
9. 一个常见错误和修正方式。
```

### 第 8 章最终必须能手写解释

```txt
function declaration vs function expression vs arrow function
parameter vs argument
rest parameter vs arguments object
rest parameter vs spread syntax
function reference vs function call
regular call vs method call vs constructor call
this in normal function vs this in arrow function
closure with let vs closure with var
call vs apply vs bind
Function constructor vs normal function expression
pure function vs function with side effects
```

---

## 14. 本章最终记忆模型

```txt
Function is JavaScript behavior packaged as a value.

Definition:
  creates a function object
  stores code and parameters
  captures lexical environment

Invocation:
  creates execution context
  binds this
  binds parameters to arguments
  executes body
  returns value

Closure:
  function keeps access to outer lexical bindings

Function object:
  name
  length
  prototype
  call
  apply
  bind

Functional programming:
  pass functions
  return functions
  compose transformations
  control side effects
```

### 最终一句话

```txt
第 8 章让你从“会写函数”升级到“能解释函数对象、调用过程、this 绑定、闭包状态和函数式抽象”。
```

---

## 15. 官方文档阅读清单

| 主题 | 官方文档 |
|---|---|
| Functions 总览 | [MDN Functions Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) |
| Function reference | [MDN Functions Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) |
| Arrow functions | [MDN Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) |
| Default parameters | [MDN Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) |
| Rest parameters | [MDN Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) |
| arguments object | [MDN arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) |
| Closures | [MDN Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures) |
| this | [MDN this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) |
| bind | [MDN Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) |
| Function constructor | [MDN Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) |
| Execution model | [MDN JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model) |

---

## 16. 生成前自检清单

```txt
[x] 文件定位清楚，不是最终笔记
[x] 正文使用中文
[x] 重要术语保留 English term
[x] 代码和代码注释没有中文字符
[x] 目录结构放在指导文件内部
[x] 没有单独生成 zip 目录包
[x] 包含推荐目录结构
[x] 包含运行方式
[x] 包含分节训练内容
[x] 每节包含结论、技术意义、底层机制、API 规范、文件结构、代码、运行方式、预期输出、执行过程、项目关系、常见错误、记忆模型
[x] 包含 API / 语法完整索引
[x] 包含常见错误总表
[x] 包含最终小项目
[x] 包含额外 cheatsheet 说明
[x] 包含最终文件清单
[x] 包含最终学习笔记转换要求
[x] 包含官方文档阅读清单
```
