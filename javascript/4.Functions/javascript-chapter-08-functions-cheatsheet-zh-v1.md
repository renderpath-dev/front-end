# JavaScript 第 8 章“函数”Cheatsheet v1

> 用途：这是第 8 章学完后的快速复习表，不替代学习指导文件。  
> 代码规则：代码、变量名、函数名、类名、文件名、目录名、代码注释不使用中文字符。

---

## 1. 函数定义形式速查

| 写法 | 名称 | 是否提升 | 是否有自己的 `this` | 是否有自己的 `arguments` | 是否能 `new` | 使用场景 |
|---|---|---:|---:|---:|---:|---|
| `function fn(a) {}` | function declaration | 是 | 是 | 是 | 是 | 普通函数、构造函数 |
| `const fn = function(a) {};` | function expression | 否 | 是 | 是 | 是 | callback、局部函数 |
| `const fn = (a) => a;` | arrow function | 否 | 否 | 否 | 否 | 短 callback、词法 `this` |
| `{ fn(a) {} }` | method syntax | 随对象创建 | 是 | 是 | 否 | 对象方法 |

关键记忆句：

```txt
Arrow function is not just shorter function syntax.
It has lexical this and no own arguments.
```

---

## 2. 调用形式与 this 速查

| 调用形式 | 示例 | `this` 是什么 | 常见坑 |
|---|---|---|---|
| 普通调用 | `fn()` | strict mode 下是 `undefined` | 不会自动绑定原对象 |
| 方法调用 | `object.method()` | 点左边的 `object` | 拆出来会丢失 this |
| 构造调用 | `new Constructor()` | 新对象 | 箭头函数不能 new |
| 显式调用 | `fn.call(obj)` | `obj` | 不能改变箭头函数词法 this |

---

## 3. 参数机制速查

| 机制 | 写法 | 含义 | 返回 / 结果 | 常见坑 |
|---|---|---|---|---|
| 形参 | `function fn(a, b) {}` | 函数定义里的局部名字 | 接收对应位置实参 | 不检查类型 |
| 实参 | `fn(1, 2, 3)` | 调用时传入的值 | 绑定到形参或进入 `arguments` | 多传不报错 |
| 默认参数 | `function fn(a = 1) {}` | 缺失或 `undefined` 时使用默认值 | 局部绑定有默认值 | `null` 不触发 |
| 剩余参数 | `function fn(...args) {}` | 收集剩余实参 | 真数组 | 必须在最后 |
| `arguments` | `arguments[0]` | 非箭头函数里的类数组实参对象 | 类数组对象 | 现代代码优先 rest |
| 调用扩展 | `fn(...array)` | 展开 iterable 成实参 | 多个实参 | 普通对象不能这样展开 |

---

## 4. `call()` / `apply()` / `bind()` 对比

| 方法 | 签名 | 是否立即执行 | 参数形式 | 返回值 | 记忆句 |
|---|---|---:|---|---|---|
| `call()` | `fn.call(thisArg, ...args)` | 是 | 一个个参数 | 原函数返回值 | call now with listed args |
| `apply()` | `fn.apply(thisArg, argsArray)` | 是 | 数组或类数组 | 原函数返回值 | apply now with array args |
| `bind()` | `fn.bind(thisArg, ...boundArgs)` | 否 | 可预填参数 | 新函数 | bind now, call later |

示例：

```js
function describe(prefix) {
  return `${prefix}: ${this.name}`;
}

const item = { name: 'Keyboard' };

console.log(describe.call(item, 'Product'));
console.log(describe.apply(item, ['Product']));

const boundDescribe = describe.bind(item, 'Bound product');
console.log(boundDescribe());
```

---

## 5. 函数对象属性速查

| 属性 / 方法 | 所属对象 | 含义 | 常见坑 |
|---|---|---|---|
| `fn.name` | function object | 函数名或推断名 | 不要用作业务唯一标识 |
| `fn.length` | function object | 默认参数前的形参数量 | 不是本次调用的实参数量 |
| `fn.prototype` | constructable function | `new` 创建实例时的原型对象 | 箭头函数不能作为构造函数 |
| `fn.toString()` | function object | 返回函数源码形式字符串 | 不要依赖源码字符串做业务逻辑 |

---

## 6. 闭包速查

| 场景 | 闭包保存什么 | 用途 | 常见坑 |
|---|---|---|---|
| counter factory | `count` binding | 私有计数 | 长期保存大对象会占内存 |
| callback | 外层局部变量 | 延迟执行时仍访问上下文 | 循环变量用 `var` 会共享一个绑定 |
| memoize | cache object / Map | 缓存计算结果 | key 设计错误会缓存错值 |
| module pattern | private state | 隐藏实现细节 | 暴露内部可变对象会破坏封装 |

关键记忆句：

```txt
Closure keeps access to lexical bindings, not just copied values.
```

---

## 7. Function constructor 速查

| 写法 | 含义 | 作用域 | 风险 |
|---|---|---|---|
| `new Function('a', 'b', 'return a + b;')` | 从字符串创建函数 | 全局作用域，不捕获局部变量 | 性能成本、代码注入风险 |

关键记忆句：

```txt
Function constructor does not close over local scope.
Use normal function expressions for normal code.
```

---

## 8. 函数式编程速查

| 概念 | 含义 | JavaScript 例子 | 注意点 |
|---|---|---|---|
| first-class function | 函数是值 | `const fn = () => 1` | 可传递、可返回 |
| higher-order function | 接收或返回函数 | `map(callback)` | callback 必须是函数 |
| pure function | 无外部副作用 | `(x) => x * 2` | 易测试 |
| closure state | 闭包保存状态 | `memoize(fn)` | 控制生命周期 |
| pipeline | 数据连续转换 | `filter().map().reduce()` | 每一步职责要清楚 |

---

## 9. 常见错误判断表

| 现象 | 根本原因 | 修正方式 |
|---|---|---|
| `ReferenceError` | 函数表达式变量还没初始化 | 调整调用位置或用函数声明 |
| `TypeError: task is not a function` | 传入了函数调用结果，不是函数引用 | 传 `task`，不是 `task()` |
| `this` 是 `undefined` | 方法被拆出来普通调用 | 使用 `bind()` 或包装函数 |
| 箭头方法读不到对象属性 | 箭头函数没有自己的 `this` | 使用方法简写或普通函数 |
| 所有 loop callback 输出同一个值 | `var` 共享一个绑定 | 使用 `let` |
| 默认参数没生效 | 传入的是 `null` | 使用 `value ?? defaultValue` |
| `bind()` 没输出 | `bind()` 只返回新函数 | 调用返回的新函数 |

---

## 10. 官方文档链接

| 主题 | 链接 |
|---|---|
| Functions Guide | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions |
| Functions Reference | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions |
| Arrow functions | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions |
| Default parameters | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters |
| Rest parameters | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters |
| arguments | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments |
| Closures | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures |
| this | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this |
| bind | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind |
| Function constructor | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function |
| Execution model | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model |

---

## 11. 最终记忆模型

```txt
Function definition creates a function object.
Function invocation creates an execution context.
Parameters are local bindings.
Arguments are call-time values.
this depends on invocation form.
Arrow functions capture lexical this.
Closure keeps lexical bindings alive.
Functions are objects with properties and prototype methods.
call and apply invoke immediately.
bind returns a new function.
Functional programming is possible because functions are values.
```
