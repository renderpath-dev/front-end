# JavaScript 函数学习笔记

> 这份笔记只总结 JavaScript 函数。TypeScript 函数类型、泛型函数、函数重载暂时不放进来，等 JavaScript 函数机制稳定后再继续。

## 目录

1. [函数章节总览](#1-函数章节总览)
2. [函数作为值与函数定义](#2-函数作为值与函数定义)
3. [函数声明、函数表达式、函数提升](#3-函数声明函数表达式函数提升)
4. [箭头函数](#4-箭头函数)
5. [参数系统](#5-参数系统)
6. [对象参数、数组参数、引用传递](#6-对象参数数组参数引用传递)
7. [作用域与作用域链](#7-作用域与作用域链)
8. [闭包](#8-闭包)
9. [`this`、`call()`、`apply()`、`bind()`](#9-thiscallapplybind)
10. [构造函数、`prototype`、函数对象属性](#10-构造函数prototype函数对象属性)
11. [函数错误处理](#11-函数错误处理)
12. [高阶函数与自定义 `map()`](#12-高阶函数与自定义-map)
13. [函数式编程常见模式](#13-函数式编程常见模式)
14. [memoization 与 `Map` 缓存](#14-memoization-与-map-缓存)
15. [必须修正和牢记的反例](#15-必须修正和牢记的反例)
16. [最终学习检查清单](#16-最终学习检查清单)

---

## 1. 函数章节总览

### 结论

JavaScript 的函数不是单纯的“代码块”。更准确地说：

> 函数是可以被调用的对象值。它可以被赋值、传参、返回、保存到对象或数组里，并且会和作用域、闭包、`this`、原型机制产生关系。

### 10 个 JS 文件对应主题

| 文件 | 主题 | 学习重点 |
|---|---|---|
| `01-function-values-and-definitions.js` | 函数作为值与函数定义 | 函数声明、函数表达式、命名函数表达式、递归、条件式定义函数 |
| `02-arrow-functions-and-return-rules.js` | 箭头函数 | 参数括号规则、表达式体自动返回、代码块体必须 `return`、返回对象、箭头函数 `this` |
| `03-parameters-rest-arguments-destructuring.js` | 参数系统 | 默认参数、剩余参数、`arguments`、数组解构参数、对象解构参数 |
| `04-scope-and-closures.js` | 作用域与闭包 | 作用域链、闭包、私有状态、IIFE、`var` 循环坑、`let` 循环绑定 |
| `05-this-call-apply-bind.js` | `this` 与间接调用 | 方法调用、`this` 丢失、`call()`、`apply()`、`bind()` |
| `06-constructors-prototype-function-properties.js` | 构造函数、原型、函数属性 | `new`、`prototype`、`length`、`name`、`toString()`、`Function()` |
| `07-error-handling-in-functions.js` | 函数错误处理 | `throw`、`try...catch`、`finally`、`TypeError`、`RangeError` |
| `08-higher-order-functions-and-custom-map.js` | 高阶函数与自定义 `map` | 函数作为参数、回调函数、自定义数组转换 |
| `09-functional-programming-patterns.js` | 函数式编程模式 | 高阶函数、部分应用、纯函数、非纯函数 |
| `10-memoization-and-map-cache.js` | memoization 与 `Map` | 闭包缓存、`Map` 键值对、数组 `map()` 区别 |

### 核心关系图

```txt
function value
    ↓
can be assigned / passed / returned
    ↓
higher-order function
    ↓
closure preserves outer variables
    ↓
this depends on call form for normal functions
    ↓
constructor functions connect to prototype
```

---

## 2. 函数作为值与函数定义

### 结论

函数可以像数字、字符串、对象一样被保存和传递。函数名本质上是一个变量名，它保存着函数对象的引用。

### 技术意义

这解释了为什么函数可以：

- 赋值给变量
- 放进数组
- 放进对象属性
- 作为参数传给另一个函数
- 作为返回值返回

### 代码

```js
"use strict";

function addNumber(number1, number2) {
  return number1 + number2;
}

const fn = addNumber;
const list = [addNumber];
const obj = { method: addNumber };

console.log(fn(35, 64));
console.log(list[0](37, 120));
console.log(obj.method(321, 98));
```

### 执行过程

| 表达式 | 保存的函数 | 调用参数 | 返回值 |
|---|---|---:|---:|
| `fn(35, 64)` | `addNumber` | `35`, `64` | `99` |
| `list[0](37, 120)` | `addNumber` | `37`, `120` | `157` |
| `obj.method(321, 98)` | `addNumber` | `321`, `98` | `419` |

### 机制

`addNumber` 是函数声明创建出来的函数对象。下面三行都没有复制函数体，只是复制函数对象的引用：

```js
const fn = addNumber;
const list = [addNumber];
const obj = { method: addNumber };
```

### 常见错误

错误理解：

```txt
函数只能定义后直接调用。
```

正确理解：

```txt
函数是值，可以被保存、传递、返回。
```

---

## 3. 函数声明、函数表达式、函数提升

### 结论

函数声明和函数表达式都能创建函数，但它们的初始化时机不同。

### 函数声明

```js
sayHello();

function sayHello() {
  console.log("hello");
}
```

输出：

```txt
hello
```

### 机制

函数声明会在当前作用域的创建阶段被处理。执行代码前，`sayHello` 这个名字已经绑定到了函数对象。

| 阶段 | 发生什么 |
|---|---|
| 作用域创建阶段 | 创建 `sayHello` 函数对象，并绑定函数名 |
| 代码执行阶段 | 执行 `sayHello()`，可以找到函数 |

### 函数表达式

```js
const square = function (number) {
  return number * number;
};

console.log(square(5));
```

输出：

```txt
25
```

### 机制

这段代码分两步：

| 步骤 | 发生什么 |
|---|---|
| 1 | 创建匿名函数对象 |
| 2 | 把函数对象保存到 `square` |

### 函数表达式不能提前调用

```js
square(5);

const square = function (number) {
  return number * number;
};
```

结果：

```txt
ReferenceError
```

原因：`const square` 在初始化前处于暂时性死区。

### 命名函数表达式

```js
const factorial = function fac(num) {
  return num < 2 ? 1 : num * fac(num - 1);
};

console.log(factorial(8));
```

输出：

```txt
40320
```

### 机制

| 名字 | 作用 |
|---|---|
| `factorial` | 外部变量，保存函数对象 |
| `fac` | 函数内部名字，用于递归调用自己 |

---

## 4. 箭头函数

### 结论

箭头函数适合写短函数和回调函数，但它不是普通函数的完全替代品。它没有自己的 `this`、`arguments`、`prototype`，也不能作为构造函数。

### 参数括号规则

| 参数数量 | 写法 |
|---|---|
| 0 个参数 | `() => value` |
| 1 个简单参数 | `x => value` |
| 2 个或更多参数 | `(x, y) => value` |
| 默认参数 | `(x = 1) => value` |
| 解构参数 | `({ name }) => value` |
| 剩余参数 | `(...args) => value` |

### 正确示例

```js
const subtract = (x, y) => {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new TypeError("subtract expects two numbers");
  }

  return x - y;
};

try {
  console.log(subtract(10, "5"));
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
```

输出：

```txt
TypeError
subtract expects two numbers
```

### 执行过程

调用：

```js
subtract(10, "5")
```

参数绑定：

| 形参 | 实参 | 类型 |
|---|---|---|
| `x` | `10` | `number` |
| `y` | `"5"` | `string` |

判断过程：

| 表达式 | 结果 |
|---|---|
| `typeof x !== "number"` | `false` |
| `typeof y !== "number"` | `true` |
| `false || true` | `true` |

所以执行：

```js
throw new TypeError("subtract expects two numbers");
```

`return x - y` 不会执行。

### 表达式体自动返回

```js
const square = x => x * x;

console.log(square(5));
```

输出：

```txt
25
```

等价返回效果：

```js
const square = x => {
  return x * x;
};
```

### 代码块体必须写 `return`

错误示例：

```js
const square = x => {
  x * x;
};

console.log(square(5));
```

输出：

```txt
undefined
```

原因：`{}` 是函数体代码块，不会自动返回最后一个表达式。

### 返回对象必须加括号

```js
const createUser = name => ({ name: name });

console.log(createUser("Ada"));
```

输出：

```txt
{ name: "Ada" }
```

### 常见错误

错误：

```js
const subtract = x, y => x - y;
```

原因：多个参数必须放进圆括号。

正确：

```js
const subtract = (x, y) => x - y;
```

---

## 5. 参数系统

### 结论

函数参数本身就是函数内部的局部变量。调用函数时，JavaScript 会按位置把实参绑定给形参。

### 普通参数

```js
function add(x, y) {
  return x + y;
}

console.log(add(10, 5));
```

参数绑定：

| 形参 | 实参 | 值 |
|---|---:|---:|
| `x` | `10` | `10` |
| `y` | `5` | `5` |

输出：

```txt
15
```

### 少传参数

```js
function add(x, y) {
  return x + y;
}

console.log(add(10));
```

参数绑定：

| 形参 | 值 |
|---|---|
| `x` | `10` |
| `y` | `undefined` |

结果：

```txt
NaN
```

原因：`10 + undefined` 得到 `NaN`。

### 默认参数

```js
function greet(name = "Guest") {
  return `Hello, ${name}`;
}

console.log(greet("Ada"));
console.log(greet());
console.log(greet(undefined));
console.log(greet(null));
```

输出：

```txt
Hello, Ada
Hello, Guest
Hello, Guest
Hello, null
```

规则：

| 调用 | `name` |
|---|---|
| `greet("Ada")` | `"Ada"` |
| `greet()` | `"Guest"` |
| `greet(undefined)` | `"Guest"` |
| `greet(null)` | `null` |

默认参数只在实参是 `undefined` 时生效。

### 剩余参数

```js
function sum(...numbers) {
  return numbers.reduce((total, value) => total + value, 0);
}

console.log(sum(1, 2, 3, 4));
```

调用时：

```js
sum(1, 2, 3, 4)
```

参数绑定：

| 形参 | 值 |
|---|---|
| `numbers` | `[1, 2, 3, 4]` |

`reduce()` 执行过程：

| 轮次 | `total` | `value` | 返回值 |
|---|---:|---:|---:|
| 初始 | `0` | - | - |
| 第 1 轮 | `0` | `1` | `1` |
| 第 2 轮 | `1` | `2` | `3` |
| 第 3 轮 | `3` | `3` | `6` |
| 第 4 轮 | `6` | `4` | `10` |

最终输出：

```txt
10
```

### 剩余参数必须放在最后

正确：

```js
function logUser(name, ...scores) {
  console.log(name);
  console.log(scores);
}

logUser("Ada", 90, 95, 100);
```

输出：

```txt
Ada
[90, 95, 100]
```

错误：

```js
function logUser(...scores, name) {
  return scores;
}
```

原因：剩余参数已经收集剩下所有实参，后面不能再有参数。

### `arguments`

```js
function showArguments() {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments.length);
}

showArguments("a", "b");
```

输出：

```txt
a
b
2
```

### `arguments` 和剩余参数区别

| 对比项 | `arguments` | 剩余参数 |
|---|---|---|
| 是否是真数组 | 不是 | 是 |
| 是否有数组方法 | 不方便直接用 | 可以直接用 |
| 箭头函数是否有自己的 | 没有 | 可以用 |
| 现代项目推荐 | 少用 | 推荐 |

### 数组解构参数

```js
function addVector([x1, y1], [x2, y2]) {
  return [x1 + x2, y1 + y2];
}

console.log(addVector([1, 2], [3, 4]));
```

参数绑定：

| 形参 | 实参 | 解构结果 |
|---|---|---|
| `[x1, y1]` | `[1, 2]` | `x1 = 1`, `y1 = 2` |
| `[x2, y2]` | `[3, 4]` | `x2 = 3`, `y2 = 4` |

输出：

```txt
[4, 6]
```

### 对象解构参数

```js
function printUser({ name, age }) {
  return `${name} is ${age}`;
}

console.log(printUser({ name: "John", age: 28 }));
```

参数绑定：

| 属性 | 参数变量 | 值 |
|---|---|---|
| `name` | `name` | `"John"` |
| `age` | `age` | `28` |

输出：

```txt
John is 28
```

### 防止解构 `undefined`

错误：

```js
function printUser({ name }) {
  return name;
}

printUser();
```

原因：不能从 `undefined` 解构属性。

安全写法：

```js
function printUser({ name } = {}) {
  return name;
}

console.log(printUser());
```

输出：

```txt
undefined
```

---

## 6. 对象参数、数组参数、引用传递

### 结论

函数参数是按值传递的。但对象和数组的“值”是引用，所以函数内部可以通过这个引用修改同一个对象或数组。

### 修改对象

```js
function updateCar(theObject) {
  theObject.make = "Toyota";
}

const myCar = {
  make: "Honda",
  model: "Accord",
  year: "1998"
};

console.log(myCar.make);
updateCar(myCar);
console.log(myCar.make);
```

输出：

```txt
Honda
Toyota
```

执行过程：

| 步骤 | 发生什么 |
|---|---|
| 1 | `myCar` 保存对象引用 |
| 2 | 调用 `updateCar(myCar)` |
| 3 | 形参 `theObject` 接收同一个对象引用 |
| 4 | `theObject.make = "Toyota"` 修改同一个对象 |
| 5 | `myCar.make` 也变成 `"Toyota"` |

### 修改数组

```js
function updateFirstItem(theArray) {
  theArray[0] = 30;
}

const arr = [45];

console.log(arr[0]);
updateFirstItem(arr);
console.log(arr[0]);
```

输出：

```txt
45
30
```

### 不能通过重新赋值形参替换外部变量

```js
function replaceCar(theObject) {
  theObject = { make: "Toyota" };
}

const myCar = { make: "Honda" };

replaceCar(myCar);

console.log(myCar.make);
```

输出：

```txt
Honda
```

原因：`theObject = ...` 只是让形参指向新对象，不会改变外部变量 `myCar` 保存的引用。

---

## 7. 作用域与作用域链

### 结论

作用域决定某个变量名或函数名在哪些代码位置可以被访问。JavaScript 使用词法作用域：函数访问哪个外层变量，看函数定义位置，不看调用位置。

### 嵌套函数

```js
function addSquares(a, b) {
  function square(x) {
    return x * x;
  }

  return square(a) + square(b);
}

console.log(addSquares(3, 4));
```

输出：

```txt
25
```

执行过程：

| 步骤 | 内容 |
|---|---|
| 1 | 调用 `addSquares(3, 4)` |
| 2 | `a = 3`, `b = 4` |
| 3 | 内部函数 `square` 可以在 `addSquares` 内部使用 |
| 4 | `square(3)` 返回 `9` |
| 5 | `square(4)` 返回 `16` |
| 6 | `9 + 16` 返回 `25` |

### 作用域链

```js
const globalName = "Sunny";

function getScore() {
  const num1 = 2;
  const num2 = 3;

  function add() {
    return `${globalName} scored ${num1 + num2}`;
  }

  return add();
}

console.log(getScore());
```

输出：

```txt
Sunny scored 5
```

`add()` 的查找顺序：

| 要找的名字 | 第一步 | 第二步 | 结果 |
|---|---|---|---|
| `num1` | `add` 作用域没有 | `getScore` 作用域找到 | `2` |
| `num2` | `add` 作用域没有 | `getScore` 作用域找到 | `3` |
| `globalName` | `add` 和 `getScore` 都没有 | 全局作用域找到 | `"Sunny"` |

### 作用域不是对象属性

```js
const user = {
  name: "Ada",
  say() {
    return this.name;
  }
};
```

| 写法 | 查找规则 |
|---|---|
| `name` | 按作用域链查找变量 |
| `this.name` | 先确定 `this`，再查对象属性 |
| `user.name` | 在 `user` 对象上查属性 |

---

## 8. 闭包

### 结论

闭包就是：函数对象保留了它定义时能访问的词法环境。

### 计数器闭包

```js
"use strict";

function makeCounter(start) {
  let n = start;

  return function step(delta = 1) {
    n += delta;
    return n;
  };
}

const counter = makeCounter(10);

console.log(counter());
console.log(counter(5));
console.log(counter());
```

输出：

```txt
11
16
17
```

### 执行过程

调用：

```js
const counter = makeCounter(10);
```

产生外层环境：

| 名字 | 值 |
|---|---|
| `start` | `10` |
| `n` | `10` |
| `step` | 内部函数 |

`makeCounter()` 返回 `step`，但 `step` 仍然引用着 `n`，所以 `n` 不会消失。

后续调用：

| 调用 | `delta` | 调用前 `n` | 调用后 `n` | 返回值 |
|---|---:|---:|---:|---:|
| `counter()` | `1` | `10` | `11` | `11` |
| `counter(5)` | `5` | `11` | `16` | `16` |
| `counter()` | `1` | `16` | `17` | `17` |

### 私有状态

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1500);

console.log(account.deposit(50));
console.log(account.withdraw(300));
console.log(account.getBalance());
console.log(account.balance);
```

输出：

```txt
1550
1250
1250
undefined
```

`balance` 不是对象属性，它是闭包保存的局部变量。

| 访问方式 | 结果 |
|---|---|
| `account.deposit(50)` | 可以通过闭包修改 `balance` |
| `account.getBalance()` | 可以通过闭包读取 `balance` |
| `account.balance` | 读取对象属性，属性不存在，得到 `undefined` |

### IIFE 作为命名空间

```js
const uniqueInteger = (function () {
  let counter = 0;

  return function () {
    return counter++;
  };
})();

console.log(uniqueInteger());
console.log(uniqueInteger());
console.log(uniqueInteger());
```

输出：

```txt
0
1
2
```

### 闭包循环坑

```js
const fns = [];

for (var i = 0; i < 3; i++) {
  fns.push(function () {
    return i;
  });
}

console.log(fns[0]());
console.log(fns[1]());
console.log(fns[2]());
```

输出：

```txt
3
3
3
```

原因：`var` 是函数作用域，三个函数捕获的是同一个 `i`。

正确：

```js
const fns = [];

for (let i = 0; i < 3; i++) {
  fns.push(function () {
    return i;
  });
}

console.log(fns[0]());
console.log(fns[1]());
console.log(fns[2]());
```

输出：

```txt
0
1
2
```

原因：`let` 在每轮循环创建新的绑定。

---

## 9. `this`、`call()`、`apply()`、`bind()`

### 结论

普通函数的 `this` 由调用方式决定，不由定义位置决定。`call()`、`apply()`、`bind()` 是用来手动控制普通函数 `this` 的方法。

### 方法调用

```js
"use strict";

const user = {
  name: "John",
  say() {
    return this.name;
  }
};

console.log(user.say());
```

输出：

```txt
John
```

调用形式：

```js
user.say()
```

点号左边是 `user`，所以 `this` 是 `user`。

### 函数拆出来后 `this` 丢失

```js
"use strict";

const user = {
  name: "Ada",
  say() {
    return this.name;
  }
};

const fn = user.say;

console.log(fn());
```

结果：

```txt
TypeError
```

原因：调用形式是 `fn()`，不是 `user.say()`。严格模式下普通函数直接调用时 `this` 是 `undefined`。

### `call()`

```js
function introduce(city, job) {
  return `${this.name} from ${city}, ${job}`;
}

const user1 = { name: "Alex" };

console.log(introduce.call(user1, "London", "engineer"));
```

输出：

```txt
Alex from London, engineer
```

执行绑定：

| 名字 | 值 |
|---|---|
| `this` | `user1` |
| `city` | `"London"` |
| `job` | `"engineer"` |

### `apply()`

```js
function introduce(city, job) {
  return `${this.name} from ${city}, ${job}`;
}

const user2 = { name: "Charlie" };

console.log(introduce.apply(user2, ["San Francisco", "Computer Science"]));
```

输出：

```txt
Charlie from San Francisco, Computer Science
```

`apply()` 和 `call()` 的区别：

| 方法 | 参数传法 |
|---|---|
| `call(thisArg, a, b)` | 一个一个传 |
| `apply(thisArg, [a, b])` | 放进数组传 |

### `bind()`

```js
function greet(word) {
  return `${word}, ${this.name}`;
}

const userName = { name: "Chris" };
const boundGreet = greet.bind(userName);

console.log(boundGreet("Hello"));
```

输出：

```txt
Hello, Chris
```

`bind()` 不会立即调用原函数，而是返回一个新函数。这个新函数的 `this` 被固定为 `userName`。

### 三者总表

| 写法 | 是否立即调用 | `this` | 参数传法 | 返回值 |
|---|---|---|---|---|
| `fn.call(obj, a, b)` | 是 | `obj` | 一个一个传 | 原函数返回值 |
| `fn.apply(obj, [a, b])` | 是 | `obj` | 数组传 | 原函数返回值 |
| `fn.bind(obj)` | 否 | 固定为 `obj` | 可以后续再传 | 新函数 |

### 箭头函数不能重新绑定 `this`

```js
"use strict";

const arrow = () => {
  return this;
};

const obj = { name: "Ada" };

console.log(arrow.call(obj));
```

重点：`call()`、`apply()`、`bind()` 不能改变箭头函数自己的 `this`，因为箭头函数没有自己的 `this`。

---

## 10. 构造函数、`prototype`、函数对象属性

### 结论

普通函数可以通过 `new` 作为构造函数调用。构造函数创建实例对象，实例对象的原型连接到构造函数的 `prototype` 对象。

### 构造函数

```js
"use strict";

function User(name) {
  this.name = name;
}

User.prototype.say = function () {
  return this.name;
};

const user = new User("Alex");

console.log(user.name);
console.log(user.say());
console.log(Object.getPrototypeOf(user) === User.prototype);
```

输出：

```txt
Alex
Alex
true
```

### `new User("Alex")` 的执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 创建一个新对象 |
| 2 | 新对象的原型指向 `User.prototype` |
| 3 | 用新对象作为 `this` 调用 `User` |
| 4 | 执行 `this.name = name` |
| 5 | 如果没有显式返回对象，就返回新对象 |

### 构造函数返回对象会覆盖默认返回值

```js
function User(name) {
  this.name = name;

  return { name: "Override" };
}

const user = new User("Ada");

console.log(user.name);
```

输出：

```txt
Override
```

### 构造函数返回原始值会被忽略

```js
function User(name) {
  this.name = name;

  return 123;
}

const user = new User("Ada");

console.log(user.name);
```

输出：

```txt
Ada
```

### 函数的 `length` 和 `name`

```js
function add(a, b) {
  return a + b;
}

function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(add.length);
console.log(sum.length);
console.log(add.name);
console.log(sum.name);
```

输出：

```txt
2
0
add
sum
```

说明：

| 属性 | 含义 |
|---|---|
| `length` | 声明的普通形参数量，不包括剩余参数 |
| `name` | 函数名，主要用于调试 |

### 箭头函数没有 `prototype`

```js
const Arrow = () => {};

console.log(Arrow.prototype);
```

输出：

```txt
undefined
```

### `Function()` 构造函数

```js
const addNumbers = new Function("a", "b", "return a + b;");

console.log(addNumbers(2, 3));
```

输出：

```txt
5
```

### `Function()` 不形成普通闭包

```js
function outer() {
  const secret = 42;
  const fn = new Function("return secret;");

  return fn();
}

console.log(outer());
```

结果：

```txt
ReferenceError
```

原因：`new Function()` 创建的函数不会捕获当前局部作用域，它像在全局作用域中创建函数。

---

## 11. 函数错误处理

### 结论

函数成功完成时用 `return`，函数无法正常完成时用 `throw`。调用者如果想处理失败，就用 `try...catch` 包住函数调用。

### `TypeError`

```js
function divide(x, y) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new TypeError("divide expects two numbers");
  }

  if (y === 0) {
    throw new RangeError("divisor cannot be zero");
  }

  return x / y;
}

try {
  const result = divide(2, 0);
  console.log(result);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
```

输出：

```txt
RangeError
divisor cannot be zero
```

### 执行过程

调用：

```js
divide(2, 0)
```

参数绑定：

| 形参 | 值 | 类型 |
|---|---:|---|
| `x` | `2` | `number` |
| `y` | `0` | `number` |

判断过程：

| 判断 | 结果 |
|---|---|
| `typeof x !== "number"` | `false` |
| `typeof y !== "number"` | `false` |
| `y === 0` | `true` |

所以执行：

```js
throw new RangeError("divisor cannot be zero");
```

`return x / y` 不执行。

### `try...catch` 应该包住调用，不是包住定义

错误思路：

```js
try {
  function test() {
    throw new Error("failed");
  }
} catch (error) {
  console.log(error.message);
}

test();
```

函数定义时不会执行函数体，所以 `try` 捕获不到后面的调用错误。

正确：

```js
function test() {
  throw new Error("failed");
}

try {
  test();
} catch (error) {
  console.log(error.message);
}
```

### `finally`

```js
try {
  console.log("try");
} catch (error) {
  console.log(error.message);
} finally {
  console.log("finally");
}
```

输出：

```txt
try
finally
```

`finally` 不管有没有错误都会执行。

---

## 12. 高阶函数与自定义 `map()`

### 结论

高阶函数是接收函数作为参数，或者返回函数的函数。

### 自定义 `map()`

```js
function map(f, a) {
  const result = new Array(a.length);

  for (let i = 0; i < a.length; i++) {
    result[i] = f(a[i]);
  }

  return result;
}

const numbers = [1, 2, 3, 4, 5];
const cubedNumbers = map(function (x) {
  return x * x * x;
}, numbers);

console.log(cubedNumbers);
```

输出：

```txt
[1, 8, 27, 64, 125]
```

### 执行过程

| 轮次 | `i` | `a[i]` | `f(a[i])` | `result[i]` |
|---|---:|---:|---:|---:|
| 1 | `0` | `1` | `1` | `1` |
| 2 | `1` | `2` | `8` | `8` |
| 3 | `2` | `3` | `27` | `27` |
| 4 | `3` | `4` | `64` | `64` |
| 5 | `4` | `5` | `125` | `125` |

### 自定义 `map()` 和数组 `map()` 对比

```js
const result = numbers.map(function (x) {
  return x * x * x;
});
```

| 对比项 | 自定义 `map(f, a)` | 数组 `numbers.map(callback)` |
|---|---|---|
| 调用方式 | `map(f, numbers)` | `numbers.map(f)` |
| 原数组是否修改 | 不修改 | 不修改 |
| 返回值 | 新数组 | 新数组 |
| 回调参数 | 示例只传 `value` | 默认可传 `value, index, array` |

### 函数作为参数

```js
function calculate(a, b, operation) {
  return operation(a, b);
}

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

console.log(calculate(2, 3, add));
console.log(calculate(2, 3, multiply));
```

输出：

```txt
5
6
```

---

## 13. 函数式编程常见模式

### 结论

函数式编程在这里不是一套复杂理论，而是先掌握几件事：函数作为值、高阶函数、纯函数、部分应用、组合计算。

### 高阶函数 `twice()`

```js
function twice(fn) {
  return function (value) {
    return fn(fn(value));
  };
}

function increment(x) {
  return x + 1;
}

const addTwo = twice(increment);

console.log(addTwo(10));
```

输出：

```txt
12
```

执行过程：

| 步骤 | 内容 |
|---|---|
| 1 | `twice(increment)` 返回一个新函数 |
| 2 | `addTwo` 保存这个新函数 |
| 3 | `addTwo(10)` 执行 `increment(increment(10))` |
| 4 | `increment(10)` 得到 `11` |
| 5 | `increment(11)` 得到 `12` |

### `bind()` 做部分应用

```js
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);

console.log(double(5));
```

输出：

```txt
10
```

这里 `bind(null, 2)` 固定了第一个参数 `a = 2`。

### 自定义 `partialLeft()`

```js
function partialLeft(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function list(a, b, c) {
  return [a, b, c];
}

const withFirst = partialLeft(list, "A");

console.log(withFirst("B", "C"));
```

输出：

```txt
["A", "B", "C"]
```

参数过程：

| 阶段 | 值 |
|---|---|
| `partialLeft(list, "A")` | `fn = list`, `presetArgs = ["A"]` |
| `withFirst("B", "C")` | `laterArgs = ["B", "C"]` |
| `fn(...presetArgs, ...laterArgs)` | `list("A", "B", "C")` |

### 纯函数

```js
function add(a, b) {
  return a + b;
}
```

纯函数特点：

| 条件 | 是否满足 |
|---|---|
| 相同输入得到相同输出 | 是 |
| 不修改外部变量 | 是 |
| 不修改传入对象 | 是 |
| 不依赖隐藏状态 | 是 |

### 非纯函数

```js
let total = 0;

function addToTotal(value) {
  total += value;
  return total;
}
```

它不是纯函数，因为它修改外部变量 `total`。

---

## 14. memoization 与 `Map` 缓存

### 结论

memoization 是一种缓存函数结果的技术。第一次计算后，把“参数 -> 结果”保存起来。以后同样参数再次调用时，直接返回缓存结果，不再重复计算。

### 单参数版本

```js
function memoize(fn) {
  const cache = new Map();

  return function (arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }

    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

function square(x) {
  console.log("calculate");
  return x * x;
}

const memoizedSquare = memoize(square);

console.log(memoizedSquare(5));
console.log(memoizedSquare(5));
```

输出：

```txt
calculate
25
25
```

### 第一次调用过程

| 步骤 | 内容 |
|---|---|
| 1 | `arg = 5` |
| 2 | `cache.has(5)` 是 `false` |
| 3 | 调用 `square(5)` |
| 4 | 输出 `calculate` |
| 5 | `square(5)` 返回 `25` |
| 6 | `cache.set(5, 25)` |
| 7 | 返回 `25` |

### 第二次调用过程

| 步骤 | 内容 |
|---|---|
| 1 | `arg = 5` |
| 2 | `cache.has(5)` 是 `true` |
| 3 | 直接 `return cache.get(5)` |
| 4 | 不再调用 `square(5)` |
| 5 | 不再输出 `calculate` |

### 多参数版本

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function add(a, b) {
  console.log("calculate");
  return a + b;
}

const memoizedAdd = memoize(add);

console.log(memoizedAdd(2, 3));
console.log(memoizedAdd(2, 3));
```

输出：

```txt
calculate
5
5
```

### 这里同时用到了哪些知识

| 代码 | 知识点 |
|---|---|
| `memoize(fn)` | 函数作为参数 |
| `return function (...args) {}` | 函数返回函数，剩余参数 |
| `cache` | 闭包保存外层变量 |
| `new Map()` | 键值对缓存结构 |
| `cache.has(key)` | 判断缓存是否存在 |
| `cache.get(key)` | 读取缓存 |
| `cache.set(key, result)` | 写入缓存 |
| `fn(...args)` | 展开参数调用原函数 |

### `Map` 和数组 `map()` 的区别

| 对比项 | `Map` | 数组 `map()` |
|---|---|---|
| 写法 | `new Map()` | `array.map(callback)` |
| 本质 | 数据结构 | 数组方法 |
| 作用 | 保存键值对 | 遍历数组并生成新数组 |
| 常用方法 | `set/get/has/delete` | 传入回调函数 |
| 返回值 | `Map` 对象 | 新数组 |

记忆方式：

```txt
Map 是名词：键值对数据结构。
map() 是动词：把数组映射成新数组。
```

### `JSON.stringify(args)` 版本的限制

| 情况 | 问题 |
|---|---|
| 参数里有函数 | 函数会被忽略或变成 `null` |
| 参数里有 `undefined` | 可能丢失信息 |
| 参数里有循环引用对象 | 会报错 |
| 对象属性顺序不同 | 可能得到不同 key |
| 参数是复杂对象 | 缓存语义可能不符合预期 |

---

## 15. 必须修正和牢记的反例

### 反例 1：`subtract` 类型判断写错

错误：

```js
const subtract = (x, y) => {
  if (typeof x !== "number" || y !== "number") {
    throw new TypeError("subtract expects two numbers");
  }

  return x - y;
};
```

问题：`y !== "number"` 是值比较，不是类型检查。

正确：

```js
const subtract = (x, y) => {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new TypeError("subtract expects two numbers");
  }

  return x - y;
};
```

### 反例 2：函数名和行为不一致

错误：

```js
const subtract = (x, y) => x / y;
```

`subtract` 表示减法，所以应该是：

```js
const subtract = (x, y) => x - y;
```

如果是除法，函数名应该是：

```js
const divide = (x, y) => x / y;
```

### 反例 3：对象解构写成普通参数

错误：

```js
function printUser(name, age) {
  return `${name} is ${age}`;
}

console.log(printUser({ name: "John", age: 28 }));
```

正确：

```js
function printUser({ name, age }) {
  return `${name} is ${age}`;
}

console.log(printUser({ name: "John", age: 28 }));
```

### 反例 4：`partialLeft` 忘记展开后续参数

错误：

```js
function partialLeft(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs, laterArgs);
  };
}
```

正确：

```js
function partialLeft(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}
```

### 反例 5：箭头函数对象方法误用 `this`

错误：

```js
const user = {
  name: "Ada",
  say: () => this.name
};
```

正确：

```js
const user = {
  name: "Ada",
  say() {
    return this.name;
  }
};
```

---

## 16. 最终学习检查清单

学完这组文件后，你应该能回答下面这些问题：

### 函数定义

- 函数声明和函数表达式有什么区别？
- 为什么函数声明可以提前调用？
- 为什么 `const fn = function () {}` 不能提前调用？
- 命名函数表达式里的内部函数名有什么用？

### 箭头函数

- 一个参数为什么可以省略括号？
- 两个参数为什么必须加括号？
- 表达式体为什么会自动返回？
- 代码块体为什么必须写 `return`？
- 返回对象为什么要写 `({ ... })`？
- 箭头函数为什么不适合写对象方法？

### 参数

- 形参和实参分别是什么？
- 少传参数时形参是什么值？
- 默认参数什么时候生效？
- 剩余参数为什么是真数组？
- `arguments` 为什么不是现代首选？
- 对象解构参数怎么写？

### 作用域与闭包

- 作用域解决什么问题？
- 作用域链怎么查找变量？
- 什么是词法作用域？
- 闭包为什么能保留外层变量？
- `var` 循环闭包为什么输出同一个值？
- `let` 为什么能修复循环闭包问题？

### `this`

- `this` 是作用域变量吗？
- `obj.fn()` 里的 `this` 是谁？
- `const fn = obj.fn; fn()` 为什么丢失 `this`？
- `call()` 和 `apply()` 的区别是什么？
- `bind()` 为什么不立即调用？
- 箭头函数为什么不能被 `call/apply/bind` 改 `this`？

### 构造函数和原型

- `new` 做了哪几步？
- 实例对象和构造函数的 `prototype` 有什么关系？
- 构造函数返回对象和返回原始值有什么区别？
- 函数的 `length` 和 `name` 表示什么？
- 箭头函数为什么没有 `prototype`？

### 错误处理

- `return` 和 `throw` 分别代表什么？
- 什么时候应该抛 `TypeError`？
- 什么时候应该抛 `RangeError`？
- `try...catch` 应该包住函数定义还是函数调用？
- `finally` 什么时候执行？

### 高阶函数和函数式模式

- 什么是高阶函数？
- 自定义 `map(f, a)` 每一轮怎么调用回调？
- `partialLeft()` 里的两个 `...` 分别是什么意思？
- 什么是纯函数？
- 什么是 memoization？
- `Map` 和数组 `map()` 有什么区别？

---

## 最后总结

JavaScript 函数这一章可以压缩成一句话：

> 函数是对象值；调用函数会创建执行上下文；参数会被绑定成局部变量；普通函数的 `this` 看调用方式；函数可以形成闭包保存外层变量；构造函数通过 `prototype` 给实例提供共享方法；高阶函数和 memoization 都建立在“函数可以作为值传递和返回”这个机制上。

这 10 个 JS 文件不是为了背 API，而是为了把下面这条链路打通：

```txt
function value
    -> parameter binding
    -> scope chain
    -> closure
    -> this binding
    -> prototype
    -> higher-order function
    -> memoization
```

这条链路稳定后，再进入 TypeScript 函数类型会顺很多。
