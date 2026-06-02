# JavaScript 第 6 章“对象”学习指导文件 v1

> 定位：这是《JavaScript 权威指南》第 6 章“对象”的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建练习目录、写 `.js` 文件、运行 Node、观察输出或错误，再把每节整理成自己的正式笔记。  
> 参考范围：《JavaScript 权威指南》第 6 章 6.1 到 6.11，MDN 的 Working with objects、Object、Enumerability and ownership of properties、Inheritance and the prototype chain、Object initializer、Spread syntax、get、set、JSON。  
> 语言规则：正文统一中文；必要技术术语保留英文括号。  
> 代码规则：代码、变量名、函数名、类名、文件名、目录名、代码注释不使用中文字符。

---

## 官方文档对应关系

| 本文件主题 | 官方文档 |
|---|---|
| 对象基础、对象属性、对象创建、对象访问 | [MDN Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects) |
| `Object` 静态方法和原型方法 | [MDN Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) |
| 自有属性、继承属性、可枚举性、属性所有权 | [MDN Enumerability and ownership of properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties) |
| 原型链、继承属性、属性查找 | [MDN Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain) |
| 对象字面量、属性简写、计算属性名、getter、setter | [MDN Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) |
| 对象展开和浅拷贝 | [MDN Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) |
| `get` / `set` 访问器属性 | [MDN getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) / [MDN setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) |
| JSON 序列化和反序列化 | [MDN JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) |

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
11. [最终小项目](#10-最终小项目product-card-normalizer)
12. [额外 cheatsheet](#11-额外-cheatsheet)
13. [最终文件清单](#12-最终文件清单)
14. [最终学习笔记转换要求](#13-最终学习笔记转换要求)
15. [本章最终记忆模型](#14-本章最终记忆模型)
16. [官方文档阅读清单](#15-官方文档阅读清单)
17. [生成前自检清单](#16-生成前自检清单)

---

## 0. 文件定位

### 结论

第 6 章不是“对象语法”章节，而是 JavaScript 对象模型（object model）的入门核心章。

你要学会回答：

```txt
1. What is stored directly on this object?
2. What is inherited from the prototype chain?
3. What happens when a property is read?
4. What happens when a property is written?
5. Which properties are enumerable?
6. Which properties are copied, serialized, or skipped?
7. Is this operation mutating an existing object or creating a new object?
```

### 技术意义

第三章讲“值与引用”，第四章讲“表达式求值”，第五章讲“语句控制流”，第六章把这些能力合起来：对象是 JavaScript 中组织状态、配置、数据记录、模块接口、组件 props、API payload 的基础结构。

实际前端项目中，你会持续遇到对象：

- 商品数据、用户资料、订单记录。
- React 组件 props 和 state。
- API 请求体和响应体。
- 配置对象（options object）。
- 缓存表、索引表、字典对象。
- 原型链上的共享方法。
- 通过展开语法（spread syntax）创建的浅拷贝。

如果第 6 章没有学扎实，后面数组、函数、类、模块、React props、TypeScript object types 都会变成“表面能写，机制不清楚”。

---

## 1. 本章学习目标

### 结论

学完第 6 章，你必须能完整解释以下内容：

```txt
object literal
property name
property value
own property
inherited property
prototype
prototype chain
Object.create()
Object.getPrototypeOf()
property lookup
property assignment
property shadowing
delete operator
in operator
Object.hasOwn()
hasOwnProperty()
propertyIsEnumerable()
for...in
Object.keys()
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Reflect.ownKeys()
Object.assign()
object spread
JSON.stringify()
JSON.parse()
toString()
toLocaleString()
valueOf()
toJSON()
property shorthand
computed property name
symbol property name
method shorthand
getter
setter
```

### 本章不是为了背 API

本章的核心不是把 `Object.keys()`、`Object.assign()`、`delete` 这些名字背下来，而是建立这个运行模型：

```txt
object
  -> own properties
  -> prototype link
  -> inherited properties
  -> property lookup
  -> property assignment
  -> enumeration and copying
  -> serialization and conversion
```

---

## 2. 本章学习顺序

### 结论

建议按这个顺序学：

```txt
object runtime model
  -> object literal and reference
  -> new and constructor-created objects
  -> Object.create and prototype link
  -> dot access and bracket access
  -> property lookup and shadowing
  -> property assignment failure
  -> delete operator
  -> property testing
  -> property enumeration
  -> object extension and copying
  -> JSON serialization
  -> inherited object methods
  -> object literal extensions
  -> getter and setter
  -> mini project
```

### 为什么这样安排

先建立“对象是什么”，再理解“属性从哪里来”，再理解“如何读写属性”，最后理解“如何复制、枚举、序列化、扩展对象”。这个顺序和 JavaScript 运行时处理对象的顺序一致。

---

## 3. 本章核心术语表

| 中文术语 | English term | 解释 |
|---|---|---|
| 对象 | object | 一组属性的动态集合，属性名映射到属性值。 |
| 属性 | property | 对象中的一个命名成员，由属性名和属性值组成。 |
| 属性名 | property name | 字符串或符号（symbol），用于定位属性。 |
| 属性值 | property value | 与属性名关联的 JavaScript 值，或访问器方法。 |
| 自有属性 | own property | 直接存放在对象本身的属性。 |
| 继承属性 | inherited property | 从原型链上读取到的属性。 |
| 原型 | prototype | 对象内部链接到的另一个对象，用于属性继承。 |
| 原型链 | prototype chain | 对象和其连续原型构成的查找链。 |
| 属性查询 | property lookup | 读取属性时先查自有属性，再沿原型链查找。 |
| 属性遮蔽 | property shadowing | 自有属性与继承属性同名时，自有属性覆盖查询结果。 |
| 可枚举性 | enumerability | 属性是否会被某些枚举机制访问到。 |
| 可配置性 | configurability | 属性能否被删除或重新配置。 |
| 可写性 | writability | 数据属性的值能否被重新赋值。 |
| 关联数组 | associative array | 用字符串键访问值的结构；普通对象可模拟这种结构。 |
| 字典对象 | dictionary object | 用来保存键值对的对象；现代代码常优先考虑 `Map`。 |
| 浅拷贝 | shallow copy | 只复制第一层属性值，嵌套对象仍然共享引用。 |
| 序列化 | serialization | 把对象状态转换为字符串。 |
| 反序列化 | deserialization | 把字符串恢复为 JavaScript 值。 |
| 访问器属性 | accessor property | 由 getter / setter 方法控制读取和写入的属性。 |
| 数据属性 | data property | 直接保存一个值的普通属性。 |
| 计算属性名 | computed property name | 对象字面量中用表达式计算出来的属性名。 |
| 方法简写 | method shorthand | 在对象字面量中省略 `function` 和冒号的方法定义语法。 |

---

## 4. 本章底层模型

### 结论

对象可以压缩成这张运行时模型图：

```txt
object reference
  -> own property table
      key: string or symbol
      value: data value or accessor functions
      attributes: writable, enumerable, configurable
  -> prototype link
      -> another object
      -> another prototype
      -> null
```

### 读取属性的机制

```txt
read object.property
  -> if object has own property: return own property value
  -> else if prototype exists: search prototype
  -> else return undefined
```

### 写入属性的机制

```txt
write object.property = value
  -> if writable own data property exists: update it
  -> else if inherited setter exists: call setter with receiver object
  -> else if write is allowed: create own property on receiver object
  -> else fail silently in sloppy mode or throw TypeError in strict mode
```

### 枚举和复制的机制

```txt
for...in:
  enumerable string keys from own object and prototype chain

Object.keys():
  enumerable own string keys only

Object.assign() / object spread:
  enumerable own properties only

JSON.stringify():
  enumerable own string-keyed serializable properties only
```

---

## 5. 推荐目录结构

### 结论

第 6 章建议建立：

```txt
javascript/chapter-06-objects/
```

目录和文件如下，先创建这个结构，再按第 7 节逐个写代码：

```txt
javascript/
  chapter-06-objects/
    javascript-chapter-06-objects-learning-guide-zh-v1.md
    javascript-chapter-06-objects-cheatsheet-zh-v1.md
    README.md

    00-object-runtime-model/
      objectRuntimeModel.js
      objectReferenceMistake.js

    01-object-literals/
      objectLiteralEvaluation.js
      objectLiteralTrailingComma.js

    02-new-and-constructors/
      newObjectConstructor.js
      constructorWithoutNewMistake.js

    03-object-create-prototype/
      objectCreatePrototype.js
      nullPrototypeDictionary.js

    04-property-access/
      dotBracketAccess.js
      dynamicPropertyPortfolio.js
      bracketAccessMistake.js

    05-property-lookup-shadowing/
      prototypeLookupShadowing.js
      propertyAccessMistake.js

    06-property-assignment-rules/
      propertySetFailureStrict.js
      inheritedSetterAssignment.js

    07-delete-properties/
      deleteOwnProperty.js
      deleteNonConfigurableMistake.js

    08-property-testing/
      propertyTestingMethods.js
      safeHasOwnForNullPrototype.js

    09-property-enumeration/
      enumerationMethods.js
      enumerationOrder.js
      forInInheritedMistake.js

    10-extending-objects/
      objectAssignCopy.js
      objectSpreadCopy.js
      spreadShallowCopyMistake.js

    11-serialization/
      jsonSerializationBasics.js
      toJsonCustomization.js
      circularJsonMistake.js

    12-object-methods/
      objectPrototypeMethods.js
      objectConversionMistake.js

    13-object-literal-extensions/
      objectLiteralExtensions.js
      computedPropertyNameMistake.js

    14-accessor-properties/
      accessorPropertyModel.js
      accessorSetterReturnMistake.js

    15-objects-mini-project/
      miniProductNormalizer.js
      miniProductNormalizerMistakes.js
      miniProductNormalizerChecklist.md
```

---

## 6. 运行方式

### 结论

本章所有 `.js` 文件都可以直接用 Node 运行：

```bash
node 00-object-runtime-model/objectRuntimeModel.js
node 03-object-create-prototype/objectCreatePrototype.js
node 10-extending-objects/objectAssignCopy.js
node 15-objects-mini-project/miniProductNormalizer.js
```

### 完整运行清单

在 `javascript/chapter-06-objects/` 目录下运行：

```bash
node 00-object-runtime-model/objectReferenceMistake.js
node 00-object-runtime-model/objectRuntimeModel.js
node 01-object-literals/objectLiteralEvaluation.js
node 01-object-literals/objectLiteralTrailingComma.js
node 02-new-and-constructors/constructorWithoutNewMistake.js
node 02-new-and-constructors/newObjectConstructor.js
node 03-object-create-prototype/nullPrototypeDictionary.js
node 03-object-create-prototype/objectCreatePrototype.js
node 04-property-access/bracketAccessMistake.js
node 04-property-access/dotBracketAccess.js
node 04-property-access/dynamicPropertyPortfolio.js
node 05-property-lookup-shadowing/propertyAccessMistake.js
node 05-property-lookup-shadowing/prototypeLookupShadowing.js
node 06-property-assignment-rules/inheritedSetterAssignment.js
node 06-property-assignment-rules/propertySetFailureStrict.js
node 07-delete-properties/deleteNonConfigurableMistake.js
node 07-delete-properties/deleteOwnProperty.js
node 08-property-testing/propertyTestingMethods.js
node 08-property-testing/safeHasOwnForNullPrototype.js
node 09-property-enumeration/enumerationMethods.js
node 09-property-enumeration/enumerationOrder.js
node 09-property-enumeration/forInInheritedMistake.js
node 10-extending-objects/objectAssignCopy.js
node 10-extending-objects/objectSpreadCopy.js
node 10-extending-objects/spreadShallowCopyMistake.js
node 11-serialization/circularJsonMistake.js
node 11-serialization/jsonSerializationBasics.js
node 11-serialization/toJsonCustomization.js
node 12-object-methods/objectConversionMistake.js
node 12-object-methods/objectPrototypeMethods.js
node 13-object-literal-extensions/computedPropertyNameMistake.js
node 13-object-literal-extensions/objectLiteralExtensions.js
node 14-accessor-properties/accessorPropertyModel.js
node 14-accessor-properties/accessorSetterReturnMistake.js
node 15-objects-mini-project/miniProductNormalizer.js
node 15-objects-mini-project/miniProductNormalizerMistakes.js
```

### 推荐 Node 版本

建议使用现代 LTS Node。第 6 章示例使用了：

```txt
Object.hasOwn()
Object.getPrototypeOf()
Object.getOwnPropertySymbols()
Reflect.ownKeys()
object spread
optional chaining
nullish coalescing
```

这些特性在现代 Node 中可用。

### 运行时观察重点

每个文件运行时至少观察四件事：

```txt
1. printed value
2. own property or inherited property
3. mutating original object or creating new object
4. enumerable or non-enumerable behavior
```

### 严格模式说明

涉及写入失败、删除失败的文件会使用：

```js
"use strict";
```

严格模式下，某些在非严格模式中静默失败的对象操作会抛出错误。这对学习很重要，因为真实工程项目中 ES module、class、bundler 输出经常处于严格模式语义中。


## 7. 分节训练内容

下面每个训练单元都按同一条线索学习：结论 -> 技术意义 -> 底层机制 -> API / 语法规范 -> 子目录文件结构 -> 示例代码 -> 运行方式 -> 预期输出 -> 执行过程 -> 常见错误。

## 7.00：对象运行时模型：对象是属性表加原型链接

### 结论

对象不是“装字段的盒子”这么简单。JavaScript 对象由自有属性表（own property table）和原型链接（prototype link）构成，变量保存的是对象引用。

### 技术意义

这是理解引用共享、属性修改、副作用、React state 不可变更新、API 数据规范化的起点。对象赋值不会复制对象，只会复制引用。

### 底层机制

```txt
let alias = original
  -> copy the reference
  -> both names point to the same object
  -> mutation through one name is visible through the other name
```

### API / 语法规范

对象字面量 `{}` 创建对象；属性访问 `object.key` 读取属性；赋值 `object.key = value` 修改或创建属性。

### 固定属性名 / 固定方法名 / 参数签名

```txt
Object.hasOwn(object, propertyKey)
Object.getPrototypeOf(object)
propertyKey can be a string or symbol
```

### 文件结构

```txt
00-object-runtime-model/
  objectRuntimeModel.js
  objectReferenceMistake.js
```
### 示例代码

#### 文件名：`00-object-runtime-model/objectRuntimeModel.js`
```js

// Goal:
// Verify that an object stores named properties and is copied by reference.

const productRecord = {
  sku: "BK-101",
  title: "JavaScript Guide",
  stock: 8,
};

const inventoryAlias = productRecord;
inventoryAlias.stock = inventoryAlias.stock - 2;

console.log(productRecord.stock);
console.log(productRecord === inventoryAlias);
```
#### 文件名：`00-object-runtime-model/objectReferenceMistake.js`

```js
// Goal:
// Show why reference assignment is not object cloning.

const originalProduct = {
  sku: "BK-101",
  stock: 8,
};

const copiedProduct = originalProduct;
copiedProduct.stock = 0;

console.log(originalProduct.stock);
console.log(copiedProduct === originalProduct);
```

### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 00-object-runtime-model/objectRuntimeModel.js
```
### 预期输出

```txt
6
true
```
### 执行过程

`productRecord` 保存一个对象引用。`inventoryAlias = productRecord` 不是复制对象，而是把同一个对象引用放进另一个变量。`inventoryAlias.stock = inventoryAlias.stock - 2` 修改同一个对象的 `stock` 属性，所以通过 `productRecord.stock` 读取时得到 `6`。最后严格相等比较为 `true`，因为两个变量引用同一个对象。

### 和实际项目的关系

在 React 或普通前端状态管理里，直接修改对象会影响所有持有同一引用的位置。你后面学 state 更新时，必须知道为什么要创建新对象，而不是直接改旧对象。

### 常见错误

常见错误是把 `const copied = original` 当成对象拷贝。它只是引用复制。另一个错误是以为 `const` 能让对象内容不可变；`const` 只固定变量绑定，不冻结对象属性。

### 最终记忆模型

```txt
object variable stores a reference
reference assignment is not object cloning
property mutation changes the referenced object
```


## 7.01：对象字面量：每次求值都会创建新对象

### 结论

对象字面量（object literal）是表达式。每次执行到它，都会创建一个新的对象，并计算每个属性值表达式。

### 技术意义

这能解释为什么函数每次返回 `{}` 都是新引用，也能解释为什么循环里创建对象会产生多个独立记录。

### 底层机制

```txt
evaluate object literal
  -> allocate new object
  -> evaluate each property value expression
  -> define own properties
  -> return object reference
```

### API / 语法规范

对象字面量语法：`{ propertyName: expression }`。属性名可以是标识符、字符串字面量、数字字面量、计算属性名或符号。

### 固定属性名 / 固定方法名 / 参数签名

```txt
{ key: value }
{ "complex-key": value }
{ [expression]: value }
{ shorthandName }
```

### 文件结构

```txt
01-object-literals/
  objectLiteralEvaluation.js
  objectLiteralTrailingComma.js
```
### 示例代码

#### 文件名：`01-object-literals/objectLiteralEvaluation.js`
```js

// Goal:
// Verify that an object literal creates a new object each time it is evaluated.

function createCartLine(quantity) {
  return {
    productCode: "JS-BOOK",
    quantity,
    createdAt: Date.now(),
  };
}

const firstLine = createCartLine(1);
const secondLine = createCartLine(1);

console.log(firstLine === secondLine);
console.log(firstLine.productCode === secondLine.productCode);
```
#### 文件名：`01-object-literals/objectLiteralTrailingComma.js`

```js
// Goal:
// Verify that trailing commas do not add extra object properties.

const productRecord = {
  sku: "PEN-1",
  stock: 4,
};

const tagList = ["new", "sale"];

console.log(Object.keys(productRecord));
console.log(tagList.length);
console.log(tagList[2]);
```

### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 01-object-literals/objectLiteralEvaluation.js
```
### 预期输出

```txt
false
true
```
### 执行过程

`createCartLine(1)` 第一次调用时执行 `return { ... }`，创建第一个对象。第二次调用重新执行同一个对象字面量，创建第二个对象。两个对象的 `productCode` 属性值都是同一个字符串内容，所以字符串比较为 `true`；但两个对象引用不同，所以对象比较为 `false`。

### 和实际项目的关系

在组件渲染中，每次写 `{}` 都会生成新对象。后面学 React 性能和 memo 时，这个机制会直接影响 props 引用稳定性。

### 常见错误

常见错误是用 `firstLine === secondLine` 判断两个对象内容是否相等。`===` 比较对象时比较引用，不比较属性内容。

### 最终记忆模型

```txt
same literal syntax does not mean same object
each evaluation creates a fresh object
```


## 7.02：使用 new：构造函数初始化新对象

### 结论

`new` 操作符会创建一个新对象，把这个新对象绑定为构造函数调用时的 `this`，然后用构造函数初始化它。

### 技术意义

第 6 章只需要建立 `new` 的入口模型。第 9 章学类时，你会看到 `class` 语法背后仍然离不开构造函数和原型。

### 底层机制

```txt
new Constructor(args)
  -> allocate object
  -> link object prototype to Constructor.prototype
  -> call Constructor with this = new object
  -> return initialized object unless constructor returns another object
```

### API / 语法规范

构造函数本质上是普通函数，但按照约定首字母大写，并通过 `new` 调用。

### 固定属性名 / 固定方法名 / 参数签名

```txt
new Object()
new Array()
new Date()
new Constructor(arg1, arg2)
```

### 文件结构

```txt
02-new-and-constructors/
  newObjectConstructor.js
  constructorWithoutNewMistake.js
```
### 示例代码

#### 文件名：`02-new-and-constructors/newObjectConstructor.js`
```js

// Goal:
// Verify how new uses a constructor function to initialize an object.

function ProductSnapshot(sku, price) {
  this.sku = sku;
  this.price = price;
}

const snapshot = new ProductSnapshot("HD-204", 129);

console.log(snapshot.sku);
console.log(snapshot.price);
console.log(snapshot instanceof ProductSnapshot);
```
#### 文件名：`02-new-and-constructors/constructorWithoutNewMistake.js`

```js
// Goal:
// Show why a constructor function should be called with new.

"use strict";

function ProductSnapshot(sku, price) {
  this.sku = sku;
  this.price = price;
}

try {
  ProductSnapshot("HD-204", 129);
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(error.name);
}
```

### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 02-new-and-constructors/newObjectConstructor.js
```
### 预期输出

```txt
HD-204
129
true
```
### 执行过程

`ProductSnapshot` 被 `new` 调用。运行时创建新对象，并让函数体内部的 `this` 指向这个新对象。`this.sku = sku` 和 `this.price = price` 在新对象上创建自有属性。`instanceof` 返回 `true`，因为新对象的原型链连接到了 `ProductSnapshot.prototype`。

### 和实际项目的关系

现在真实项目更常用对象字面量、工厂函数、`class`，但理解 `new` 能帮助你看懂旧代码、库源码和类语法的机制。

### 常见错误

常见错误是忘记 `new` 调用构造函数。在严格模式下，普通函数调用中的 `this` 是 `undefined`，给 `this.sku` 赋值会报错。

### 最终记忆模型

```txt
new is not only a call
new creates object + links prototype + binds this
```


## 7.03：Object.create()：显式指定原型

### 结论

`Object.create(proto)` 创建一个新对象，并把新对象的原型链接到 `proto`。

### 技术意义

这是第 6 章理解原型继承最干净的入口，因为它不混入构造函数和 `class` 语法。你可以直接观察：属性不在对象本身，但可以从原型读到。

### 底层机制

```txt
const child = Object.create(parent)
read child.someKey
  -> child own property? no
  -> parent own property? yes
  -> return parent value
```

### API / 语法规范

`Object.create(prototypeObject)`；如果传入 `null`，会创建没有原型的对象。

### 固定属性名 / 固定方法名 / 参数签名

```txt
Object.create(proto)
Object.create(null)
Object.getPrototypeOf(object)
Object.hasOwn(object, propertyKey)
```

### 文件结构

```txt
03-object-create-prototype/
  objectCreatePrototype.js
  nullPrototypeDictionary.js
```
### 示例代码

#### 文件名：`03-object-create-prototype/objectCreatePrototype.js`
```js

// Goal:
// Verify that Object.create links a new object to a prototype object.

const catalogDefaults = {
  currency: "USD",
  visibility: "public",
};

const bookOffer = Object.create(catalogDefaults);
bookOffer.sku = "BK-202";
bookOffer.price = 45;

console.log(bookOffer.currency);
console.log(Object.hasOwn(bookOffer, "currency"));
console.log("currency" in bookOffer);
console.log(Object.getPrototypeOf(bookOffer) === catalogDefaults);
```
#### 文件名：`03-object-create-prototype/nullPrototypeDictionary.js`
```js

// Goal:
// Verify that a null-prototype object does not inherit Object.prototype methods.

const keywordCounts = Object.create(null);
keywordCounts.javascript = 3;
keywordCounts.object = 2;

console.log(keywordCounts.javascript);
console.log(Object.getPrototypeOf(keywordCounts) === null);
console.log(typeof keywordCounts.toString);
```
### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 03-object-create-prototype/objectCreatePrototype.js
node 03-object-create-prototype/nullPrototypeDictionary.js
```
### 预期输出

```txt
USD
false
true
true
3
true
undefined
```
### 执行过程

第一个文件中，`bookOffer` 自己只有 `sku` 和 `price`，没有 `currency`。读取 `bookOffer.currency` 时，运行时沿原型链到 `catalogDefaults` 查找，所以得到 `USD`。`Object.hasOwn(bookOffer, "currency")` 是 `false`，因为它不是自有属性。第二个文件中，`Object.create(null)` 创建的对象没有 `Object.prototype`，所以 `toString` 不存在。

### 和实际项目的关系

如果你需要安全的字符串字典，`Object.create(null)` 可以避免 `toString`、`constructor` 等继承属性冲突。不过现代项目里，用 `Map` 通常更清晰。

### 常见错误

常见错误是混淆“可以读到”和“对象自己拥有”。继承属性能被 `in` 检测到，但不是自有属性。另一个错误是对 null-prototype 对象调用 `obj.hasOwnProperty()`。

### 最终记忆模型

```txt
Object.create chooses the prototype
property lookup can read inherited values
own-property testing tells where the property lives
```


## 7.04：点访问与方括号访问：静态名字与动态名字

### 结论

点访问（dot access）要求属性名在源码里写成标识符；方括号访问（bracket access）可以用运行时表达式计算属性名。

### 技术意义

动态表单字段、API 字段映射、商品属性表、股票代码表、字典对象，都必须依赖方括号访问。点访问适合固定、合法标识符形式的属性名。

### 底层机制

```txt
object.staticName
  -> property name is literally "staticName"

object[expression]
  -> evaluate expression
  -> convert to property key
  -> read that property
```

### API / 语法规范

`.` 后面必须是标识符。`[]` 里面是表达式，结果会作为属性键。属性键可以是字符串或符号。

### 固定属性名 / 固定方法名 / 参数签名

```txt
object.name
object["name"]
object[fieldName]
object[SymbolKey]
```

### 文件结构

```txt
04-property-access/
  dotBracketAccess.js
  dynamicPropertyPortfolio.js
  bracketAccessMistake.js
```
### 示例代码

#### 文件名：`04-property-access/dotBracketAccess.js`
```js

// Goal:
// Compare dot access and bracket access for static and dynamic property names.

const productMetric = {
  sku: "KB-501",
  "stock-count": 14,
  restockDate: "2026-06-10",
};

const selectedField = "restockDate";

console.log(productMetric.sku);
console.log(productMetric["stock-count"]);
console.log(productMetric[selectedField]);
console.log(productMetric.selectedField);
```
#### 文件名：`04-property-access/dynamicPropertyPortfolio.js`
```js

// Goal:
// Use bracket access when the property name is known only at runtime.

const holdings = {};

function addShares(portfolioRecord, tickerSymbol, shareCount) {
  if (portfolioRecord[tickerSymbol] === undefined) {
    portfolioRecord[tickerSymbol] = 0;
  }

  portfolioRecord[tickerSymbol] += shareCount;
}

addShares(holdings, "AAPL", 12);
addShares(holdings, "MSFT", 5);
addShares(holdings, "AAPL", 3);

console.log(holdings.AAPL);
console.log(holdings.MSFT);
```
#### 文件名：`04-property-access/bracketAccessMistake.js`

```js
// Goal:
// Show the difference between a literal property name and a computed property name.

const fieldName = "stock";
const productRecord = {
  sku: "KB-501",
  stock: 14,
};

console.log(productRecord.fieldName);
console.log(productRecord[fieldName]);
```

### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 04-property-access/dotBracketAccess.js
node 04-property-access/dynamicPropertyPortfolio.js
```
### 预期输出

```txt
KB-501
14
2026-06-10
undefined
15
5
```
### 执行过程

`productMetric.sku` 读取字面属性名 `sku`。`productMetric["stock-count"]` 可以读取包含连字符的属性名，因为它不是标识符。`productMetric[selectedField]` 先读取变量 `selectedField` 的值 `restockDate`，再访问同名属性。`productMetric.selectedField` 访问的是名为 `selectedField` 的属性，而不是变量保存的字段名，所以结果是 `undefined`。

### 和实际项目的关系

表单组件里经常写 `formState[event.target.name] = event.target.value`，这就是方括号访问。没有这个机制，就无法用一个函数处理多个字段。

### 常见错误

常见错误是把 `object.fieldName` 当成读取变量 `fieldName` 指向的属性。正确写法是 `object[fieldName]`。

### 最终记忆模型

```txt
dot means literal property name
brackets mean evaluated property name
```


## 7.05：属性查询与遮蔽：读会走原型链，写通常落在对象自己身上

### 结论

属性读取会沿原型链查找；属性写入通常会在接收对象上创建或修改自有属性，从而遮蔽同名继承属性。

### 技术意义

这是 JavaScript 原型继承的核心。你不是复制了父对象属性，而是在读取时动态查找。

### 底层机制

```txt
read child.x
  -> child own x?
  -> parent x?
  -> return found value or undefined

write child.x = value
  -> create or update child own property when allowed
  -> parent.x usually remains unchanged
```

### API / 语法规范

属性读取使用 `.`、`[]`、可选链 `?.`。自有属性检测使用 `Object.hasOwn()`。

### 固定属性名 / 固定方法名 / 参数签名

```txt
object.property
object[propertyName]
object?.property
Object.hasOwn(object, propertyKey)
```

### 文件结构

```txt
05-property-lookup-shadowing/
  prototypeLookupShadowing.js
  propertyAccessMistake.js
```
### 示例代码

#### 文件名：`05-property-lookup-shadowing/prototypeLookupShadowing.js`
```js

// Goal:
// Verify property lookup through the prototype chain and own-property shadowing.

const productDefaults = {
  taxRate: 0.08,
  currency: "USD",
};

const checkoutLine = Object.create(productDefaults);
checkoutLine.unitPrice = 100;

console.log(checkoutLine.taxRate);
console.log(Object.hasOwn(checkoutLine, "taxRate"));

checkoutLine.taxRate = 0.1;

console.log(checkoutLine.taxRate);
console.log(productDefaults.taxRate);
console.log(Object.hasOwn(checkoutLine, "taxRate"));
```
#### 文件名：`05-property-lookup-shadowing/propertyAccessMistake.js`
```js

// Goal:
// Verify why accessing a property of undefined throws a TypeError.

const orderRecord = {
  id: "ORD-1001",
};

try {
  console.log(orderRecord.customer.name);
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(error.name);
}

console.log(orderRecord.customer?.name);
```
### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 05-property-lookup-shadowing/prototypeLookupShadowing.js
node 05-property-lookup-shadowing/propertyAccessMistake.js
```
### 预期输出

```txt
0.08
false
0.1
0.08
true
true
TypeError
undefined
```
### 执行过程

`checkoutLine.taxRate` 第一次读取时从 `productDefaults` 继承到 `0.08`。赋值 `checkoutLine.taxRate = 0.1` 不会修改 `productDefaults`，而是在 `checkoutLine` 上创建自有属性。之后读取命中自有属性，所以得到 `0.1`。错误示例中，`orderRecord.customer` 是 `undefined`，继续访问 `.name` 会抛出 `TypeError`；使用 `?.` 会在左侧为 `null` 或 `undefined` 时返回 `undefined`。

### 和实际项目的关系

这解释了为什么用原型放默认值时，实例覆盖默认值不会污染原型对象；也解释了为什么深层属性访问要做空值保护。

### 常见错误

常见错误是以为写入继承属性会改原型。另一个错误是直接写 `order.customer.name`，却没有确认 `customer` 是否存在。

### 最终记忆模型

```txt
read searches upward
write usually creates downward
own property shadows inherited property
```


## 7.06：属性赋值失败：只读、不可扩展和严格模式

### 结论

不是所有属性赋值都会成功。只读属性、只读继承属性、不可扩展对象上的新属性写入都可能失败；严格模式下失败会抛出 `TypeError`。

### 技术意义

真实项目里你会遇到被冻结的配置对象、只读库对象、DOM 对象、框架生成对象。知道写入失败规则，能区分业务错误和语言机制错误。

### 底层机制

```txt
write object.key = value
  -> writable own data property: update
  -> inherited setter: call setter
  -> allowed new property: create own property
  -> not allowed: fail or throw TypeError in strict mode
```

### API / 语法规范

本节为了观察错误，使用 `Object.defineProperty()` 创建只读属性。这个 API 主要属于第 14 章属性特性，这里只作为观察工具。

### 固定属性名 / 固定方法名 / 参数签名

```txt
Object.defineProperty(object, propertyKey, descriptor)
descriptor.value
descriptor.writable
descriptor.enumerable
descriptor.configurable
```

### 文件结构

```txt
06-property-assignment-rules/
  propertySetFailureStrict.js
  inheritedSetterAssignment.js
```
### 示例代码

#### 文件名：`06-property-assignment-rules/propertySetFailureStrict.js`
```js

// Goal:
// Verify that strict mode reports failed writes to read-only properties.

"use strict";

const lockedProduct = {};

Object.defineProperty(lockedProduct, "sku", {
  value: "LOCKED-1",
  writable: false,
  enumerable: true,
  configurable: true,
});

try {
  lockedProduct.sku = "LOCKED-2";
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(lockedProduct.sku);
}
```
#### 文件名：`06-property-assignment-rules/inheritedSetterAssignment.js`

```js
// Goal:
// Verify that assignment can call an inherited setter.

const priceRules = {
  set finalPrice(nextFinalPrice) {
    this.discountedPrice = nextFinalPrice;
  },
};

const productOffer = Object.create(priceRules);
productOffer.basePrice = 100;
productOffer.finalPrice = 80;

console.log(productOffer.discountedPrice);
console.log(Object.hasOwn(productOffer, "discountedPrice"));
```

### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 06-property-assignment-rules/propertySetFailureStrict.js
```
### 预期输出

```txt
true
LOCKED-1
```
### 执行过程

`Object.defineProperty()` 把 `lockedProduct.sku` 定义成 `writable: false`。在严格模式下执行 `lockedProduct.sku = "LOCKED-2"`，写入失败直接抛出 `TypeError`。`catch` 捕获错误后打印 `true`，最后属性值仍然是 `LOCKED-1`。

### 和实际项目的关系

后面你学不可变数据、框架状态、库对象防修改时，会看到冻结或只读对象。严格模式能让错误更早暴露，而不是静默失败。

### 常见错误

常见错误是以为赋值语句执行了就一定改变对象。对象属性特性会参与赋值规则。另一个错误是只在浏览器 console 里测试非严格模式，忽略工程环境中的严格模式行为。

### 最终记忆模型

```txt
assignment is a request
property attributes decide whether the request succeeds
```


## 7.07：delete：删除属性本身，不删除属性值

### 结论

`delete` 操作符删除的是对象的自有属性，而不是把属性值改成 `undefined`。它不会删除继承属性。

### 技术意义

这能解释为什么删除后仍然能读到同名继承属性，也能解释为什么 `delete obj.key` 和 `obj.key = undefined` 是两个完全不同的操作。

### 底层机制

```txt
delete object.key
  -> if own configurable property exists: remove property
  -> if property does not exist: true
  -> inherited property is not removed
  -> non-configurable property cannot be deleted
```

### API / 语法规范

`delete` 是操作符，不是方法。操作数通常是属性访问表达式。

### 固定属性名 / 固定方法名 / 参数签名

```txt
delete object.property
delete object[propertyName]
```

### 文件结构

```txt
07-delete-properties/
  deleteOwnProperty.js
  deleteNonConfigurableMistake.js
```
### 示例代码

#### 文件名：`07-delete-properties/deleteOwnProperty.js`
```js

// Goal:
// Verify that delete removes own properties, not inherited properties.

const defaultSettings = {
  theme: "light",
};

const accountSettings = Object.create(defaultSettings);
accountSettings.language = "en";

console.log(delete accountSettings.language);
console.log(accountSettings.language);
console.log(delete accountSettings.theme);
console.log(accountSettings.theme);
console.log(defaultSettings.theme);
```
#### 文件名：`07-delete-properties/deleteNonConfigurableMistake.js`
```js

// Goal:
// Verify that a non-configurable own property cannot be deleted in strict mode.

"use strict";

const auditEntry = {};

Object.defineProperty(auditEntry, "id", {
  value: "LOG-1",
  configurable: false,
  enumerable: true,
});

try {
  delete auditEntry.id;
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(auditEntry.id);
}
```
### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 07-delete-properties/deleteOwnProperty.js
node 07-delete-properties/deleteNonConfigurableMistake.js
```
### 预期输出

```txt
true
undefined
true
light
light
true
LOG-1
```
### 执行过程

第一个文件中，`language` 是 `accountSettings` 的自有属性，删除后读取得到 `undefined`。`theme` 是继承属性，`delete accountSettings.theme` 对 `accountSettings` 没有实际删除效果，但表达式仍返回 `true`；读取时仍从原型上得到 `light`。第二个文件中，`id` 被定义为 `configurable: false`，严格模式删除会抛出 `TypeError`。

### 和实际项目的关系

删除属性常见于清理请求参数、删除临时字段、构造安全 payload。但如果只是表示“无值”，通常应该赋值为 `null` 或让字段缺失，不能混用。

### 常见错误

常见错误是以为 `delete` 可以删除继承属性。另一个错误是把 `obj.key = undefined` 当成删除；这个属性仍然存在，`"key" in obj` 仍可能为 `true`。

### 最终记忆模型

```txt
delete removes own configurable property
undefined value is not the same as missing property
```


## 7.08：测试属性：in、Object.hasOwn、hasOwnProperty、propertyIsEnumerable

### 结论

测试属性必须区分：属性是否可读到、是否自有、是否可枚举、是否只是值为 `undefined`。

### 技术意义

这直接影响对象遍历、配置合并、API 字段检查和防御式编程。用错测试方法，会把继承属性当成数据，或者把存在但值为 `undefined` 的字段当成不存在。

### 底层机制

```txt
property in object
  -> own or inherited

Object.hasOwn(object, property)
  -> own only

object.propertyIsEnumerable(property)
  -> own and enumerable

object.property !== undefined
  -> cannot distinguish missing from undefined value
```

### API / 语法规范

推荐优先使用 `Object.hasOwn(object, key)`。它能安全处理 null-prototype 对象。

### 固定属性名 / 固定方法名 / 参数签名

```txt
propertyKey in object
Object.hasOwn(object, propertyKey)
object.hasOwnProperty(propertyKey)
object.propertyIsEnumerable(propertyKey)
```

### 文件结构

```txt
08-property-testing/
  propertyTestingMethods.js
  safeHasOwnForNullPrototype.js
```
### 示例代码

#### 文件名：`08-property-testing/propertyTestingMethods.js`
```js

// Goal:
// Compare in, Object.hasOwn, hasOwnProperty, and propertyIsEnumerable.

const baseProfile = {
  role: "reader",
};

const memberProfile = Object.create(baseProfile);
memberProfile.name = "Ada";
memberProfile.subscription = undefined;

Object.defineProperty(memberProfile, "internalId", {
  value: "M-100",
  enumerable: false,
});

console.log("role" in memberProfile);
console.log(Object.hasOwn(memberProfile, "role"));
console.log(memberProfile.hasOwnProperty("name"));
console.log(memberProfile.propertyIsEnumerable("internalId"));
console.log("subscription" in memberProfile);
console.log(memberProfile.subscription !== undefined);
```
#### 文件名：`08-property-testing/safeHasOwnForNullPrototype.js`
```js

// Goal:
// Use Object.hasOwn with objects that do not inherit hasOwnProperty.

const cleanDictionary = Object.create(null);
cleanDictionary.status = "active";

console.log(Object.hasOwn(cleanDictionary, "status"));
console.log(typeof cleanDictionary.hasOwnProperty);
```
### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 08-property-testing/propertyTestingMethods.js
node 08-property-testing/safeHasOwnForNullPrototype.js
```
### 预期输出

```txt
true
false
true
false
true
false
true
undefined
```
### 执行过程

`role in memberProfile` 是 `true`，因为 `role` 是继承属性。`Object.hasOwn(memberProfile, "role")` 是 `false`，因为它不是自有属性。`internalId` 是自有属性，但不可枚举，所以 `propertyIsEnumerable()` 返回 `false`。`subscription` 存在但值为 `undefined`，所以 `"subscription" in memberProfile` 是 `true`，但 `memberProfile.subscription !== undefined` 是 `false`。null-prototype 对象没有 `hasOwnProperty` 方法，所以应该使用 `Object.hasOwn()`。

### 和实际项目的关系

API 响应里字段存在但值为 `undefined`、`null`、空字符串，在语义上完全不同。对象属性测试是数据清洗的基础。

### 常见错误

常见错误是用 `obj.key !== undefined` 判断字段是否存在。这个写法无法区分“字段缺失”和“字段存在但值是 undefined”。另一个错误是在任意对象上直接调用 `obj.hasOwnProperty()`。

### 最终记忆模型

```txt
in asks can be found
Object.hasOwn asks stored here
propertyIsEnumerable asks will normal enumeration see it
```


## 7.09：枚举属性：遍历对象时必须知道你会拿到哪些键

### 结论

不同枚举方式拿到的属性集合不同。`for...in` 会包含可枚举继承属性；`Object.keys()` 只包含可枚举自有字符串属性；`Reflect.ownKeys()` 范围最完整。

### 技术意义

对象遍历是构建 UI 列表、转换 payload、统计字段、复制数据的常见操作。你必须知道当前方法会不会包含继承属性、不可枚举属性、符号属性。

### 底层机制

```txt
for...in
  -> enumerable string keys from own object and prototypes
Object.keys
  -> enumerable own string keys
Object.getOwnPropertyNames
  -> all own string keys
Object.getOwnPropertySymbols
  -> all own symbol keys
Reflect.ownKeys
  -> all own string and symbol keys
```

### API / 语法规范

枚举顺序：非负整数形式的字符串键先按数值升序，然后其他字符串键按添加顺序，最后符号键按添加顺序。

### 固定属性名 / 固定方法名 / 参数签名

```txt
for (const key in object)
Object.keys(object)
Object.getOwnPropertyNames(object)
Object.getOwnPropertySymbols(object)
Reflect.ownKeys(object)
```

### 文件结构

```txt
09-property-enumeration/
  enumerationMethods.js
  enumerationOrder.js
  forInInheritedMistake.js
```
### 示例代码

#### 文件名：`09-property-enumeration/enumerationMethods.js`
```js

// Goal:
// Compare for...in, Object.keys, Object.getOwnPropertyNames, Object.getOwnPropertySymbols, and Reflect.ownKeys.

const auditSymbol = Symbol("audit");
const baseRecord = {
  inheritedFlag: true,
};

const paymentRecord = Object.create(baseRecord);
paymentRecord.amount = 80;
paymentRecord.status = "paid";
paymentRecord[auditSymbol] = "A-1";

Object.defineProperty(paymentRecord, "internalNote", {
  value: "manual review",
  enumerable: false,
});

for (const key in paymentRecord) {
  console.log(`for-in:${key}`);
}

console.log(Object.keys(paymentRecord));
console.log(Object.getOwnPropertyNames(paymentRecord));
console.log(Object.getOwnPropertySymbols(paymentRecord).length);
console.log(Reflect.ownKeys(paymentRecord).length);
```
#### 文件名：`09-property-enumeration/enumerationOrder.js`
```js

// Goal:
// Observe own property enumeration order for integer-like keys, string keys, and symbol keys.

const orderRecord = {
  beta: "B",
  10: "ten",
  alpha: "A",
  2: "two",
};

const privateSymbol = Symbol("private");
orderRecord[privateSymbol] = "hidden-by-symbol";
orderRecord.gamma = "G";

console.log(Reflect.ownKeys(orderRecord).map(String));
```
#### 文件名：`09-property-enumeration/forInInheritedMistake.js`

```js
// Goal:
// Show why for...in needs an own-property guard.

const defaultRecord = {
  inheritedFlag: true,
};

const orderRecord = Object.create(defaultRecord);
orderRecord.id = "ORD-1";
orderRecord.status = "paid";

const unsafeKeys = [];
const safeKeys = [];

for (const key in orderRecord) {
  unsafeKeys.push(key);

  if (Object.hasOwn(orderRecord, key)) {
    safeKeys.push(key);
  }
}

console.log(unsafeKeys);
console.log(safeKeys);
```

### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 09-property-enumeration/enumerationMethods.js
node 09-property-enumeration/enumerationOrder.js
```
### 预期输出

```txt
for-in:amount
for-in:status
for-in:inheritedFlag
[ 'amount', 'status' ]
[ 'amount', 'status', 'internalNote' ]
1
4
[ '2', '10', 'beta', 'alpha', 'gamma', 'Symbol(private)' ]
```
### 执行过程

`for...in` 输出 `amount`、`status` 和继承的 `inheritedFlag`，因为它遍历可枚举字符串属性并包括原型链。`Object.keys()` 只返回自有、可枚举、字符串键。`Object.getOwnPropertyNames()` 额外包含不可枚举字符串属性 `internalNote`。`Object.getOwnPropertySymbols()` 返回符号键。`Reflect.ownKeys()` 返回所有自有键。枚举顺序示例中，`2` 和 `10` 先按数值排序，然后普通字符串键按添加顺序，最后符号键。

### 和实际项目的关系

如果你把 `for...in` 用在普通业务数据上，却忘记过滤自有属性，可能会把原型上的默认配置或方法也处理进去。

### 常见错误

常见错误是把 `for...in` 当成只遍历对象自己的属性。安全写法是在循环内加 `if (!Object.hasOwn(object, key)) continue;`。

### 最终记忆模型

```txt
enumeration API defines what keys you see
choose API before writing loop logic
```


## 7.10：扩展对象：Object.assign 与对象展开

### 结论

`Object.assign()` 会修改目标对象；对象展开 `{ ...source }` 会创建新对象。两者都只复制可枚举自有属性，而且都是浅拷贝。

### 技术意义

这是现代前端不可变更新、配置合并、props 透传、API payload 构造的核心。

### 底层机制

```txt
Object.assign(target, source1, source2)
  -> mutate target
  -> return target

{ ...source1, ...source2 }
  -> create new object
  -> later properties override earlier properties

both are shallow copies
```

### API / 语法规范

`Object.assign()` 是静态方法；对象展开是对象字面量语法，不是普通函数。

### 固定属性名 / 固定方法名 / 参数签名

```txt
Object.assign(target, ...sources)
{ ...source, key: value }
```

### 文件结构

```txt
10-extending-objects/
  objectAssignCopy.js
  objectSpreadCopy.js
  spreadShallowCopyMistake.js
```
### 示例代码

#### 文件名：`10-extending-objects/objectAssignCopy.js`
```js

// Goal:
// Verify that Object.assign mutates the target object and copies enumerable own properties.

const targetProduct = {
  sku: "MUG-1",
  stock: 3,
};

const pricePatch = {
  price: 15,
};

const stockPatch = {
  stock: 8,
};

const returnedProduct = Object.assign(targetProduct, pricePatch, stockPatch);

console.log(returnedProduct === targetProduct);
console.log(targetProduct.stock);
console.log(targetProduct.price);
```
#### 文件名：`10-extending-objects/objectSpreadCopy.js`
```js

// Goal:
// Verify that object spread creates a new object and later properties override earlier ones.

const defaultCard = {
  currency: "USD",
  visible: true,
  stock: 0,
};

const productCard = {
  sku: "PEN-8",
  stock: 12,
};

const visibleCard = {
  ...defaultCard,
  ...productCard,
  badge: "new",
};

console.log(visibleCard);
console.log(visibleCard === productCard);
```
#### 文件名：`10-extending-objects/spreadShallowCopyMistake.js`
```js

// Goal:
// Verify that object spread creates a shallow copy, not a deep copy.

const originalProfile = {
  name: "Nora",
  preferences: {
    theme: "dark",
  },
};

const copiedProfile = {
  ...originalProfile,
};

copiedProfile.preferences.theme = "light";

console.log(originalProfile.preferences.theme);
console.log(copiedProfile.preferences === originalProfile.preferences);
```
### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 10-extending-objects/objectAssignCopy.js
node 10-extending-objects/objectSpreadCopy.js
node 10-extending-objects/spreadShallowCopyMistake.js
```
### 预期输出

```txt
true
8
15
{ currency: 'USD', visible: true, stock: 12, sku: 'PEN-8', badge: 'new' }
false
light
true
```
### 执行过程

`Object.assign(targetProduct, pricePatch, stockPatch)` 修改 `targetProduct` 并返回同一个对象。后面的 `stockPatch.stock` 覆盖前面的 `targetProduct.stock`。对象展开文件中，`visibleCard` 是新对象，后面的 `productCard.stock` 覆盖默认 `stock`。浅拷贝错误文件中，`preferences` 是嵌套对象引用，展开只复制引用，所以修改副本的嵌套属性也影响原对象。

### 和实际项目的关系

React state 更新经常写 `{ ...state, field: nextValue }`。这只更新第一层，如果状态里有嵌套对象，需要继续展开嵌套层或使用专门工具。

### 常见错误

常见错误是把展开当成深拷贝。另一个错误是用 `Object.assign(existingState, patch)` 修改原状态，导致引用没变或产生副作用。

### 最终记忆模型

```txt
assign mutates target
spread creates outer object
both copy only one level
```


## 7.11：序列化对象：JSON 只表示数据子集

### 结论

`JSON.stringify()` 把可序列化对象转换为 JSON 文本；`JSON.parse()` 把 JSON 文本恢复为普通 JavaScript 值。JSON 不能完整表达所有 JavaScript 值。

### 技术意义

前后端通信、localStorage 缓存、配置文件、日志记录都依赖 JSON。你必须知道哪些属性会被跳过、哪些值会被转换。

### 底层机制

```txt
JSON.stringify(object)
  -> visit enumerable own string-keyed properties
  -> skip unsupported values in objects
  -> call toJSON if present

JSON.parse(text)
  -> create plain values
  -> Date stays string unless revived manually
```

### API / 语法规范

`JSON.stringify(value, replacer, space)`；`JSON.parse(text, reviver)`。本章只训练基础行为和 `toJSON()`，完整 replacer / reviver 在标准库章节继续学。

### 固定属性名 / 固定方法名 / 参数签名

```txt
JSON.stringify(value)
JSON.parse(text)
object.toJSON()
```

### 文件结构

```txt
11-serialization/
  jsonSerializationBasics.js
  toJsonCustomization.js
  circularJsonMistake.js
```
### 示例代码

#### 文件名：`11-serialization/jsonSerializationBasics.js`
```js

// Goal:
// Verify which object properties are serialized by JSON.stringify.

const transactionRecord = {
  id: "TX-9",
  amount: 99,
  status: undefined,
  approved: true,
  createdAt: new Date("2026-05-01T10:00:00Z"),
  formatter() {
    return `${this.id}:${this.amount}`;
  },
};

const serializedRecord = JSON.stringify(transactionRecord);
const restoredRecord = JSON.parse(serializedRecord);

console.log(serializedRecord);
console.log(restoredRecord.createdAt);
console.log(typeof restoredRecord.createdAt);
console.log("status" in restoredRecord);
```
#### 文件名：`11-serialization/toJsonCustomization.js`
```js

// Goal:
// Verify that JSON.stringify calls toJSON when it exists.

const invoiceRecord = {
  id: "INV-100",
  amount: 320,
  internalCost: 190,
  toJSON() {
    return {
      id: this.id,
      amount: this.amount,
    };
  },
};

console.log(JSON.stringify(invoiceRecord));
```
#### 文件名：`11-serialization/circularJsonMistake.js`

```js
// Goal:
// Verify that JSON.stringify cannot serialize circular references.

const categoryRecord = {
  name: "Books",
};

categoryRecord.self = categoryRecord;

try {
  JSON.stringify(categoryRecord);
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(error.name);
}
```

### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 11-serialization/jsonSerializationBasics.js
node 11-serialization/toJsonCustomization.js
```
### 预期输出

```txt
{"id":"TX-9","amount":99,"approved":true,"createdAt":"2026-05-01T10:00:00.000Z"}
2026-05-01T10:00:00.000Z
string
false
{"id":"INV-100","amount":320}
```
### 执行过程

`JSON.stringify(transactionRecord)` 只序列化可枚举自有属性。`status: undefined` 和 `formatter()` 函数属性不会出现在 JSON 文本中。`Date` 对象通过自己的 `toJSON()` 转为 ISO 字符串；`JSON.parse()` 不会自动恢复 Date 对象，所以 `typeof restoredRecord.createdAt` 是 `string`。第二个文件中，自定义 `toJSON()` 返回只包含公开字段的对象，`internalCost` 被排除。

### 和实际项目的关系

API payload 必须是数据，不是行为。函数、方法、原型、Symbol、undefined 都不是可靠的 JSON 数据。

### 常见错误

常见错误是认为 JSON.parse 后能恢复原对象类型。实际上 Date 会变字符串，自定义类实例会变普通对象，方法和原型信息会丢失。另一个错误是序列化循环引用，会抛出 `TypeError`。

### 最终记忆模型

```txt
JSON stores data shape
JSON does not preserve JavaScript object identity, methods, or prototype
```


## 7.12：对象方法：toString、toLocaleString、valueOf、toJSON

### 结论

大多数普通对象会从 `Object.prototype` 继承通用方法。对象可以自定义这些方法来控制字符串转换、数值转换和 JSON 输出。

### 技术意义

这能解释为什么某些对象参与 `+`、模板字符串、比较、JSON.stringify 时会出现看似自动的转换。

### 底层机制

```txt
String(object) or string context
  -> object.toString or object[Symbol.toPrimitive]

numeric context
  -> object.valueOf or object[Symbol.toPrimitive]

JSON.stringify(object)
  -> object.toJSON if it exists
```

### API / 语法规范

本章重点掌握 `toString()`、`toLocaleString()`、`valueOf()`、`toJSON()` 的角色，不需要深入 `Symbol.toPrimitive`。

### 固定属性名 / 固定方法名 / 参数签名

```txt
object.toString()
object.toLocaleString()
object.valueOf()
object.toJSON()
```

### 文件结构

```txt
12-object-methods/
  objectPrototypeMethods.js
  objectConversionMistake.js
```
### 示例代码

#### 文件名：`12-object-methods/objectPrototypeMethods.js`
```js

// Goal:
// Compare toString, toLocaleString, valueOf, and a custom conversion method.

const scorePoint = {
  x: 3,
  y: 4,
  toString() {
    return `(${this.x}, ${this.y})`;
  },
  valueOf() {
    return Math.hypot(this.x, this.y);
  },
};

console.log(String(scorePoint));
console.log(scorePoint > 4);
console.log(scorePoint + 1);
```
#### 文件名：`12-object-methods/objectConversionMistake.js`

```js
// Goal:
// Show the default string conversion of a plain object.

const plainProduct = {
  sku: "BK-1",
  title: "Guide",
};

console.log(String(plainProduct));
console.log(`${plainProduct}`);
```

### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 12-object-methods/objectPrototypeMethods.js
```
### 预期输出

```txt
(3, 4)
true
6
```
### 执行过程

`String(scorePoint)` 需要字符串表示，于是调用自定义 `toString()`，输出 `(3, 4)`。`scorePoint > 4` 是数值比较上下文，调用 `valueOf()` 得到 `5`，所以结果是 `true`。`scorePoint + 1` 也会触发原始值转换，得到 `5 + 1`，输出 `6`。

### 和实际项目的关系

当你在日志中打印对象、把对象拼进字符串、排序包含对象的列表时，转换方法会影响结果。但在业务代码中，过度依赖隐式转换会降低可读性。

### 常见错误

常见错误是期待默认 `toString()` 展示对象内容。普通对象默认通常得到 `[object Object]`，不是你想要的调试信息。

### 最终记忆模型

```txt
conversion methods define how objects act in primitive contexts
explicit conversion is clearer than hidden magic
```


## 7.13：对象字面量扩展语法：简写、计算属性名、符号、方法简写

### 结论

现代对象字面量可以写属性简写、计算属性名、符号属性名和方法简写。这些是便利语法，但背后仍然是在创建对象属性。

### 技术意义

这部分直接连接 React props、配置对象、动态字段、库扩展点。尤其是计算属性名和符号属性名，是动态对象建模的重要工具。

### 底层机制

```txt
{ sku }
  -> { sku: sku }

{ [fieldName]: value }
  -> compute property key at runtime

{ [symbolKey]: value }
  -> define symbol-keyed property

{ method() {} }
  -> define a function-valued property
```

### API / 语法规范

对象字面量扩展语法只改变写法，不改变对象仍然由属性组成的事实。

### 固定属性名 / 固定方法名 / 参数签名

```txt
{ name }
{ [expression]: value }
{ [symbol]: value }
{ methodName() { ... } }
```

### 文件结构

```txt
13-object-literal-extensions/
  objectLiteralExtensions.js
  computedPropertyNameMistake.js
```
### 示例代码

#### 文件名：`13-object-literal-extensions/objectLiteralExtensions.js`
```js

// Goal:
// Use property shorthand, computed property names, symbol keys, and method shorthand.

const sku = "BAG-22";
const stock = 7;
const dynamicField = "warehouse";
const syncSymbol = Symbol("sync");

const inventoryItem = {
  sku,
  stock,
  [dynamicField]: "west",
  [syncSymbol]: true,
  describe() {
    return `${this.sku}:${this.stock}`;
  },
};

console.log(inventoryItem.sku);
console.log(inventoryItem.warehouse);
console.log(inventoryItem.describe());
console.log(Object.getOwnPropertySymbols(inventoryItem).length);
```
#### 文件名：`13-object-literal-extensions/computedPropertyNameMistake.js`

```js
// Goal:
// Show why computed property names need square brackets.

const fieldName = "warehouse";

const wrongRecord = {
  fieldName: "east",
};

const correctRecord = {
  [fieldName]: "east",
};

console.log(wrongRecord.warehouse);
console.log(wrongRecord.fieldName);
console.log(correctRecord.warehouse);
```

### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 13-object-literal-extensions/objectLiteralExtensions.js
```
### 预期输出

```txt
BAG-22
west
BAG-22:7
1
```
### 执行过程

`sku` 和 `stock` 使用属性简写，等价于 `sku: sku` 和 `stock: stock`。`[dynamicField]` 先计算变量值 `warehouse`，再定义同名属性。`[syncSymbol]` 定义符号键属性，不会和字符串键冲突。`describe()` 是方法简写，创建一个函数属性，调用时 `this` 指向 `inventoryItem`。

### 和实际项目的关系

React 里经常会写 `{ ...props, [fieldName]: value }` 或把对象展开传给组件。计算属性名让你可以把动态字段更新写成通用逻辑。

### 常见错误

常见错误是在需要动态属性名时写 `{ dynamicField: value }`，这会创建名为 `dynamicField` 的属性，而不是变量值对应的属性。正确写法是 `{ [dynamicField]: value }`。

### 最终记忆模型

```txt
object literal extensions are syntax convenience
computed keys are runtime property names
```


## 7.14：getter / setter：属性访问背后的函数调用

### 结论

访问器属性（accessor property）没有直接保存一个普通值，而是通过 getter 和 setter 函数控制读取和写入。

### 技术意义

这能解释为什么 `obj.x` 看起来像读属性，实际可能执行函数。后面学类、DOM 对象、框架对象时，访问器属性非常常见。

### 底层机制

```txt
read object.prop
  -> if prop has getter: call getter with this = object
  -> getter return value becomes read result

write object.prop = value
  -> if prop has setter: call setter with assigned value
  -> setter return value is ignored
```

### API / 语法规范

getter 必须没有参数；setter 必须有一个参数。读取只调用 getter，写入只调用 setter。

### 固定属性名 / 固定方法名 / 参数签名

```txt
get propertyName() { ... }
set propertyName(value) { ... }
```

### 文件结构

```txt
14-accessor-properties/
  accessorPropertyModel.js
  accessorSetterReturnMistake.js
```
### 示例代码

#### 文件名：`14-accessor-properties/accessorPropertyModel.js`
```js

// Goal:
// Verify how getter and setter functions run during property reads and writes.

const productPrice = {
  basePrice: 100,
  discountRate: 0.2,
  get finalPrice() {
    return this.basePrice * (1 - this.discountRate);
  },
  set finalPrice(newFinalPrice) {
    this.discountRate = 1 - newFinalPrice / this.basePrice;
  },
};

console.log(productPrice.finalPrice);
productPrice.finalPrice = 90;
console.log(productPrice.discountRate.toFixed(2));
console.log(productPrice.finalPrice);
```
#### 文件名：`14-accessor-properties/accessorSetterReturnMistake.js`
```js

// Goal:
// Verify that a setter return value is ignored.

const shippingBox = {
  width: 10,
  height: 5,
  set area(nextArea) {
    this.width = nextArea / this.height;
    return "ignored";
  },
};

const assignmentResult = (shippingBox.area = 100);

console.log(assignmentResult);
console.log(shippingBox.width);
```
### 运行方式

```bash
# Run from javascript/chapter-06-objects
node 14-accessor-properties/accessorPropertyModel.js
node 14-accessor-properties/accessorSetterReturnMistake.js
```
### 预期输出

```txt
80
0.10
90
100
20
```
### 执行过程

读取 `productPrice.finalPrice` 时调用 getter，返回 `100 * (1 - 0.2)`，得到 `80`。执行 `productPrice.finalPrice = 90` 时调用 setter，参数 `newFinalPrice` 绑定为 `90`，setter 修改 `discountRate`。再次读取时 getter 用新折扣计算出 `90`。错误示例中，赋值表达式的结果是右侧值 `100`，setter 内部 `return "ignored"` 被忽略，`width` 被更新为 `20`。

### 和实际项目的关系

访问器适合表达派生值、验证写入、兼容旧字段名。但如果 getter 有副作用，会让代码难以调试。

### 常见错误

常见错误是以为 getter 只是普通值，不会执行函数。另一个错误是以为 setter 的返回值会成为赋值表达式的值。

### 最终记忆模型

```txt
getter turns property read into function call
setter turns property write into function call
setter return value is ignored
```


---

## 8. 本章 API / 语法完整索引

### 8.1 创建对象

| API / 语法 | 所属对象 / 语法位置 | 作用 | 返回值 | 是否修改原对象 | 注意点 |
|---|---|---|---|---|---|
| `{}` | 对象字面量 | 创建普通对象 | 新对象引用 | 否 | 每次求值创建新对象。 |
| `new Constructor()` | `new` 操作符 | 创建并初始化对象 | 新对象引用 | 否 | 会连接到 `Constructor.prototype`。 |
| `Object.create(proto)` | `Object` | 用指定原型创建对象 | 新对象引用 | 否 | `proto` 可以是 `null`。 |
| `Object.getPrototypeOf(obj)` | `Object` | 读取对象原型 | 原型对象或 `null` | 否 | 用于观察原型链。 |

### 8.2 属性访问与修改

| API / 语法 | 作用 | 参数 / 操作数 | 返回值 | 注意点 |
|---|---|---|---|---|
| `obj.key` | 点访问属性 | 固定标识符属性名 | 属性值 | 属性名不能动态计算。 |
| `obj[key]` | 方括号访问属性 | 表达式求值后的 key | 属性值 | 适合动态属性名、特殊字符属性名、符号键。 |
| `obj?.key` | 可选链读取 | 对象可能为 `null` / `undefined` | 属性值或 `undefined` | 只保护可选链左侧。 |
| `obj.key = value` | 设置属性 | 目标对象、属性名、值 | 右侧值 | 可能创建自有属性或调用 setter。 |
| `delete obj.key` | 删除属性 | 属性访问表达式 | boolean | 只删除可配置自有属性。 |

### 8.3 属性测试

| API / 语法 | 检查范围 | 包含继承属性 | 要求可枚举 | 找不到时 |
|---|---|---:|---:|---|
| `key in obj` | 自有 + 继承 | 是 | 否 | `false` |
| `Object.hasOwn(obj, key)` | 自有 | 否 | 否 | `false` |
| `obj.hasOwnProperty(key)` | 自有 | 否 | 否 | `false`，但 null-prototype 对象没有此方法 |
| `obj.propertyIsEnumerable(key)` | 自有 + 可枚举 | 否 | 是 | `false` |
| `obj.key !== undefined` | 值检查 | 可读到即可 | 否 | 无法区分缺失和存在但值为 `undefined` |

### 8.4 属性枚举

| API / 语法 | 自有属性 | 继承属性 | 可枚举 | 不可枚举 | 字符串键 | 符号键 |
|---|---:|---:|---:|---:|---:|---:|
| `for...in` | 是 | 是 | 是 | 否 | 是 | 否 |
| `Object.keys(obj)` | 是 | 否 | 是 | 否 | 是 | 否 |
| `Object.getOwnPropertyNames(obj)` | 是 | 否 | 是 | 是 | 是 | 否 |
| `Object.getOwnPropertySymbols(obj)` | 是 | 否 | 是 | 是 | 否 | 是 |
| `Reflect.ownKeys(obj)` | 是 | 否 | 是 | 是 | 是 | 是 |
| `JSON.stringify(obj)` | 是 | 否 | 是 | 否 | 是 | 否 |

### 8.5 复制、扩展、序列化

| API / 语法 | 作用 | 返回值 | 是否修改原对象 | 是否深拷贝 | 注意点 |
|---|---|---|---:|---:|---|
| `Object.assign(target, ...sources)` | 来源对象属性复制到目标对象 | `target` | 是 | 否 | 后面的来源覆盖前面的同名属性。 |
| `{ ...source }` | 在对象字面量中展开属性 | 新对象 | 否 | 否 | 只展开自有可枚举属性。 |
| `JSON.stringify(value)` | 转 JSON 文本 | string | 否 | 不适用 | 跳过函数、`undefined`、符号键。 |
| `JSON.parse(text)` | 解析 JSON 文本 | JavaScript 值 | 否 | 不适用 | 不恢复 Date / class instance / method / prototype。 |

### 8.6 对象转换方法

| 方法 | 所属位置 | 触发场景 | 返回值要求 | 注意点 |
|---|---|---|---|---|
| `toString()` | 对象或原型 | 字符串上下文 | string | 普通对象默认值信息很少。 |
| `toLocaleString()` | 对象或原型 | 本地化字符串上下文 | string | 默认通常调用 `toString()`。 |
| `valueOf()` | 对象或原型 | 数值或原始值上下文 | primitive | 默认普通对象不提供有用数值。 |
| `toJSON()` | 对象自身或原型 | `JSON.stringify()` | 可序列化值 | 不在 `Object.prototype` 上，但 `JSON.stringify()` 会寻找它。 |

### 8.7 对象字面量扩展

| 语法 | 含义 | 等价思路 | 注意点 |
|---|---|---|---|
| `{ sku }` | 属性简写 | `{ sku: sku }` | 变量名成为属性名。 |
| `{ [field]: value }` | 计算属性名 | 先计算 `field` | 不加 `[]` 就是普通属性名。 |
| `{ [symbolKey]: value }` | 符号键属性 | 使用 symbol 作为属性名 | 不会和字符串键冲突。 |
| `{ method() {} }` | 方法简写 | `{ method: function() {} }` | 调用时 `this` 由调用方式决定。 |
| `{ get x() {} }` | getter | 读 `x` 时调用函数 | getter 无参数。 |
| `{ set x(value) {} }` | setter | 写 `x` 时调用函数 | setter 返回值被忽略。 |

---

## 9. 本章常见错误总表

| 错误 | 错误原因 | 正确理解 | 判断方式 |
|---|---|---|---|
| `const copy = original` 后修改 `copy`，以为不影响 `original` | 复制的是引用 | 要创建新对象才是拷贝外层 | `copy === original` |
| 用 `obj.key` 读取变量 `key` 指向的字段 | 点访问不计算变量 | 动态字段用 `obj[key]` | 打印 `obj.key` 和 `obj[key]` 对比 |
| 以为继承属性是对象自己的属性 | 属性查询会走原型链 | 用 `Object.hasOwn()` 区分 | `key in obj` 与 `Object.hasOwn()` 对比 |
| 以为写继承属性会改原型 | 普通赋值通常创建自有属性 | 写入发生在接收对象上 | 赋值后检查原型对象 |
| 用 `obj.key !== undefined` 判断属性存在 | 存在但值为 `undefined` 时误判 | 用 `key in obj` 或 `Object.hasOwn()` | 创建值为 `undefined` 的属性测试 |
| 用 `for...in` 处理业务数据却不筛自有属性 | `for...in` 会枚举继承可枚举属性 | 循环内用 `Object.hasOwn()` 过滤 | 给原型加属性观察输出 |
| 把对象展开当成深拷贝 | 展开只复制第一层属性 | 嵌套对象仍共享引用 | 修改嵌套属性观察原对象 |
| 用 `Object.assign(state, patch)` 更新状态 | 修改了原对象 | 用 `{ ...state, ...patch }` 创建新对象 | 比较引用是否改变 |
| 以为 `delete obj.key` 等于 `obj.key = undefined` | 前者删除属性，后者保留属性 | 用 `in` 判断 | 删除前后比较 `key in obj` |
| JSON 序列化后期待保留方法和原型 | JSON 只保存数据子集 | 方法、原型、Date 类型信息会丢失 | `typeof parsed.method` |
| 对 null-prototype 对象调用 `hasOwnProperty` | 它没有继承 `Object.prototype` | 使用 `Object.hasOwn()` | `typeof obj.hasOwnProperty` |
| 以为 setter 的返回值是赋值表达式结果 | setter 返回值被忽略 | 赋值表达式结果是右侧值 | 保存赋值表达式结果观察 |

---

## 10. 最终小项目：Product Card Normalizer

### 项目目标

构建一个“商品卡片规范化器”：

```txt
raw product records
  -> normalized product objects
  -> null-prototype index table
  -> inherited defaults and computed availability
  -> JSON-safe public output
```

这个小项目不是完整商城，而是训练第 6 章对象机制：

- 用 `Object.create()` 继承默认配置。
- 用 `Object.assign()` 设置自有属性。
- 用符号属性保存内部元数据。
- 用 `Object.create(null)` 建立安全索引表。
- 用 getter 计算派生值。
- 用 `toJSON()` 控制公开输出。
- 用 `Object.keys()` 枚举自有业务键。
- 用 `JSON.stringify()` 输出可传输数据。

### 使用到的本章知识点

| 知识点 | 在项目中的作用 |
|---|---|
| 对象引用 | 每个商品卡片都是对象引用。 |
| 自有属性 | `sku`、`title`、`price`、`stock` 是具体商品自己的属性。 |
| 继承属性 | `currency`、`visible`、`isAvailable`、`toJSON()` 从默认原型继承。 |
| `Object.create()` | 创建继承默认卡片行为的商品对象。 |
| `Object.create(null)` | 创建不受 `Object.prototype` 干扰的索引表。 |
| `Object.assign()` | 把规范化后的字段写入商品对象。 |
| 符号属性 | 保存内部来源信息，避免与业务字段冲突。 |
| getter | 用 `isAvailable` 动态计算是否可售。 |
| `Object.keys()` | 枚举商品索引中的自有 SKU。 |
| `toJSON()` | 控制 JSON 输出字段。 |
| `JSON.stringify()` | 生成可传输的 JSON 文本。 |

### 推荐文件结构

```txt
15-objects-mini-project/
  miniProductNormalizer.js
  miniProductNormalizerMistakes.js
  miniProductNormalizerChecklist.md
```

### 主文件代码

#### 文件名：`15-objects-mini-project/miniProductNormalizer.js`
```js

// Goal:
// Build normalized product cards from raw records by using object operations.

const defaultProductCard = {
  currency: "USD",
  visible: true,
  stock: 0,
  tags: [],
  get isAvailable() {
    return this.visible && this.stock > 0;
  },
  toJSON() {
    return {
      sku: this.sku,
      title: this.title,
      price: this.price,
      currency: this.currency,
      stock: this.stock,
      available: this.isAvailable,
      tags: this.tags,
    };
  },
};

const internalMetaKey = Symbol("internalMeta");

function normalizeProduct(rawProduct) {
  const normalizedProduct = Object.create(defaultProductCard);

  Object.assign(normalizedProduct, {
    sku: rawProduct.sku,
    title: rawProduct.title ?? "Untitled product",
    price: Number(rawProduct.price),
    stock: Number(rawProduct.stock ?? 0),
    tags: [...(rawProduct.tags ?? [])],
  });

  normalizedProduct[internalMetaKey] = {
    source: rawProduct.source ?? "manual",
  };

  return normalizedProduct;
}

function buildProductIndex(rawProducts) {
  const productIndex = Object.create(null);

  for (const rawProduct of rawProducts) {
    const normalizedProduct = normalizeProduct(rawProduct);
    productIndex[normalizedProduct.sku] = normalizedProduct;
  }

  return productIndex;
}

function listSerializableCards(productIndex) {
  return Object.keys(productIndex).map((sku) => productIndex[sku]);
}

const rawProducts = [
  { sku: "BK-1", title: "JS Object Guide", price: "39", stock: "4", tags: ["book"] },
  { sku: "HD-2", title: "Keyboard", price: 79, source: "import" },
];

const productIndex = buildProductIndex(rawProducts);
const cards = listSerializableCards(productIndex);

console.log(productIndex["BK-1"].isAvailable);
console.log(Object.hasOwn(productIndex, "BK-1"));
console.log(Object.getPrototypeOf(productIndex["BK-1"]) === defaultProductCard);
console.log(JSON.stringify(cards));
```


### 对比 / 错误文件代码

#### 文件名：`15-objects-mini-project/miniProductNormalizerMistakes.js`
```js

// Goal:
// Show common object mistakes from the mini project.

const productIndex = {};
productIndex["toString"] = {
  sku: "toString",
  title: "Unsafe key",
};

console.log(typeof productIndex.toString);

const defaultCard = {
  tags: [],
};

const firstCard = {
  ...defaultCard,
  sku: "A",
};

const secondCard = {
  ...defaultCard,
  sku: "B",
};

firstCard.tags.push("sale");

console.log(secondCard.tags.length);
```


### 运行方式

```bash
node 15-objects-mini-project/miniProductNormalizer.js
node 15-objects-mini-project/miniProductNormalizerMistakes.js
```

### 预期输出

```txt
true
true
true
[{"sku":"BK-1","title":"JS Object Guide","price":39,"currency":"USD","stock":4,"available":true,"tags":["book"]},{"sku":"HD-2","title":"Keyboard","price":79,"currency":"USD","stock":0,"available":false,"tags":[]}]
object
1
```

### 完整执行过程

1. `defaultProductCard` 是默认原型对象，保存默认字段、getter 和 `toJSON()`。
2. `internalMetaKey` 是符号键，用于保存内部来源信息。
3. `normalizeProduct(rawProduct)` 创建一个继承 `defaultProductCard` 的新对象。
4. `Object.assign()` 把规范化后的 `sku`、`title`、`price`、`stock`、`tags` 写成商品对象的自有属性。
5. `tags: [...(rawProduct.tags ?? [])]` 创建数组浅拷贝，避免直接共享输入数组引用。
6. `normalizedProduct[internalMetaKey]` 创建符号属性，避免和普通业务字段冲突。
7. `buildProductIndex()` 用 `Object.create(null)` 创建纯字典对象，避免 `toString` 这类继承键冲突。
8. `productIndex[normalizedProduct.sku] = normalizedProduct` 用动态属性名建立索引。
9. `listSerializableCards()` 用 `Object.keys()` 只遍历索引对象自己的 SKU。
10. `productIndex["BK-1"].isAvailable` 读取继承 getter，运行时用当前对象的 `visible` 和 `stock` 计算结果。
11. `JSON.stringify(cards)` 对每个商品对象调用继承来的 `toJSON()`，输出公开字段。

### API 角色表

| API / 语法 | 在小项目中的角色 |
|---|---|
| `Object.create(defaultProductCard)` | 创建继承默认行为的商品对象。 |
| `Object.create(null)` | 创建安全索引表。 |
| `Object.assign()` | 把规范化字段写入对象。 |
| `[]` 方括号访问 | 用 SKU 作为动态属性名。 |
| `Symbol()` | 创建内部元数据键。 |
| getter `isAvailable` | 计算商品可售状态。 |
| `toJSON()` | 控制序列化输出。 |
| `Object.keys()` | 枚举索引表自有键。 |
| `JSON.stringify()` | 生成传输用 JSON。 |

### 常见错误

`miniProductNormalizerMistakes.js` 演示两个错误：

1. 用 `{}` 当字典时，`toString` 这种名字会和继承属性发生语义冲突。虽然可以覆盖，但会让对象行为混乱。安全字典用 `Object.create(null)` 或 `Map`。
2. 展开 `defaultCard` 时，`tags` 数组引用被共享。`firstCard.tags.push("sale")` 后，`secondCard.tags.length` 也变成 `1`。这说明对象展开不是深拷贝。

### 可扩展任务

1. 给 `normalizeProduct()` 增加价格非法校验。
2. 增加 `category` 字段，并用计算属性名建立分类索引。
3. 增加 `toLocaleString()`，输出本地化价格文本。
4. 尝试把 `Object.create(null)` 索引改成 `Map`，比较 `Map.has()` 和 `Object.hasOwn()` 的区别。
5. 增加一个循环引用字段，观察 `JSON.stringify()` 的错误。

### 和真实项目 / 简历项目的关系

这个小项目像真实电商项目中的“数据适配层”：后端给你的数据不一定干净，前端需要把它规范化成 UI 可直接使用的结构。这里练的是对象机制，不是 UI。以后你做 React + TS 商城项目时，可以把这类逻辑放进 `services/`、`adapters/`、`models/` 或 `utils/`。

### 最终记忆模型

```txt
raw object from outside
  -> normalize own properties
  -> inherit shared defaults and methods
  -> index by dynamic key
  -> expose JSON-safe public shape
```

---

## 11. 额外 cheatsheet

### 结论

本章必须额外生成一个 cheatsheet 文件：

```txt
javascript/chapter-06-objects/javascript-chapter-06-objects-cheatsheet-zh-v1.md
```

cheatsheet 用于学完之后快速复习，不替代本指导文件。

### cheatsheet 必须包含

```txt
1. 对象创建方式速查
2. 属性访问方式速查
3. 属性测试 API 对比
4. 枚举 API 对比
5. 复制和扩展 API 对比
6. JSON 序列化规则
7. 对象转换方法
8. getter / setter 规则
9. 常见坑
10. MDN / 官方文档链接
```

---

## 12. 最终文件清单

### 结论

第 6 章最终应该至少包含以下文件：

```txt
javascript/chapter-06-objects/
  javascript-chapter-06-objects-learning-guide-zh-v1.md
  javascript-chapter-06-objects-cheatsheet-zh-v1.md
  README.md

  00-object-runtime-model/
    objectRuntimeModel.js
    objectReferenceMistake.js

  01-object-literals/
    objectLiteralEvaluation.js
    objectLiteralTrailingComma.js

  02-new-and-constructors/
    newObjectConstructor.js
    constructorWithoutNewMistake.js

  03-object-create-prototype/
    objectCreatePrototype.js
    nullPrototypeDictionary.js

  04-property-access/
    dotBracketAccess.js
    dynamicPropertyPortfolio.js
    bracketAccessMistake.js

  05-property-lookup-shadowing/
    prototypeLookupShadowing.js
    propertyAccessMistake.js

  06-property-assignment-rules/
    propertySetFailureStrict.js
    inheritedSetterAssignment.js

  07-delete-properties/
    deleteOwnProperty.js
    deleteNonConfigurableMistake.js

  08-property-testing/
    propertyTestingMethods.js
    safeHasOwnForNullPrototype.js

  09-property-enumeration/
    enumerationMethods.js
    enumerationOrder.js
    forInInheritedMistake.js

  10-extending-objects/
    objectAssignCopy.js
    objectSpreadCopy.js
    spreadShallowCopyMistake.js

  11-serialization/
    jsonSerializationBasics.js
    toJsonCustomization.js
    circularJsonMistake.js

  12-object-methods/
    objectPrototypeMethods.js
    objectConversionMistake.js

  13-object-literal-extensions/
    objectLiteralExtensions.js
    computedPropertyNameMistake.js

  14-accessor-properties/
    accessorPropertyModel.js
    accessorSetterReturnMistake.js

  15-objects-mini-project/
    miniProductNormalizer.js
    miniProductNormalizerMistakes.js
    miniProductNormalizerChecklist.md
```

### 必跑文件清单

```bash
node 00-object-runtime-model/objectRuntimeModel.js
node 01-object-literals/objectLiteralEvaluation.js
node 03-object-create-prototype/objectCreatePrototype.js
node 04-property-access/dotBracketAccess.js
node 05-property-lookup-shadowing/prototypeLookupShadowing.js
node 08-property-testing/propertyTestingMethods.js
node 09-property-enumeration/enumerationMethods.js
node 10-extending-objects/objectAssignCopy.js
node 10-extending-objects/spreadShallowCopyMistake.js
node 11-serialization/jsonSerializationBasics.js
node 14-accessor-properties/accessorPropertyModel.js
node 15-objects-mini-project/miniProductNormalizer.js
```

---

## 13. 最终学习笔记转换要求

### 结论

把这份指导文件转换成正式笔记时，不要照抄代码。你的正式笔记应该能解释每种对象操作背后的运行时机制。

### 笔记结构建议

```txt
1. 对象的运行时模型
2. 自有属性和继承属性
3. 原型链查询机制
4. 属性读取和属性写入区别
5. 点访问和方括号访问区别
6. delete 与 undefined 的区别
7. in / Object.hasOwn / propertyIsEnumerable 对比
8. for...in / Object.keys / Reflect.ownKeys 对比
9. Object.assign / spread / shallow copy
10. JSON.stringify / JSON.parse / toJSON
11. toString / valueOf / toLocaleString
12. 对象字面量扩展语法
13. getter / setter
14. 最终小项目复盘
```

### 每个知识点必须回答的问题

```txt
1. 这个操作会不会创建新对象？
2. 这个操作会不会修改原对象？
3. 这个操作看自有属性还是继承属性？
4. 这个操作看可枚举属性还是所有属性？
5. 这个操作会不会调用 getter / setter？
6. 这个操作会不会丢失原型或方法？
```

---

## 14. 本章最终记忆模型

### 结论

第 6 章最后要记住这一句话：

```txt
JavaScript object = own property table + prototype link + dynamic property operations.
```

### 分层记忆

```txt
Layer 1: storage
  object stores own properties.

Layer 2: inheritance
  object reads missing properties from prototype chain.

Layer 3: mutation
  assignment usually writes to the receiver object.

Layer 4: membership
  in checks own plus inherited; Object.hasOwn checks own only.

Layer 5: enumeration
  different APIs expose different sets of keys.

Layer 6: copying
  assign and spread copy enumerable own properties shallowly.

Layer 7: serialization
  JSON stores data, not behavior or prototype.

Layer 8: accessors
  property read or write can execute functions.
```

### 和后续章节的关系

```txt
第 7 章数组：
  arrays are special objects with numeric-like property names and length behavior.

第 8 章函数：
  functions are callable objects with properties and prototypes.

第 9 章类：
  class syntax is a structured way to build prototype-based objects.

第 10 章模块：
  modules export object-like APIs and named bindings.

React：
  props and state are object shapes; spread and shallow copy matter.

TypeScript：
  object types describe object shapes at compile time, but prototypes and JSON are runtime concerns.
```

---

## 15. 官方文档阅读清单

### MDN 必读

| 主题 | 文档 |
|---|---|
| 对象基础 | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects |
| Object 总览 | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object |
| 可枚举性与所有权 | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties |
| 原型链与继承 | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain |
| 对象初始化器 | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer |
| 展开语法 | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax |
| Object.assign | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign |
| Object.keys | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys |
| Object.entries | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries |
| getter | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get |
| setter | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set |
| JSON.stringify | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify |
| JSON.parse | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse |

### 阅读顺序

```txt
Working with objects
  -> Enumerability and ownership
  -> Inheritance and prototype chain
  -> Object initializer
  -> Object.assign and spread syntax
  -> getter and setter
  -> JSON.stringify and JSON.parse
```

---

## 16. 生成前自检清单

### 结构自检

```txt
[x] 有文件定位。
[x] 有学习目标。
[x] 有学习顺序。
[x] 有核心术语表。
[x] 有底层模型。
[x] 有推荐目录结构。
[x] 有运行方式。
[x] 有分节训练内容。
[x] 有 API / 语法完整索引。
[x] 有常见错误总表。
[x] 有最终小项目。
[x] 有额外 cheatsheet。
[x] 有最终文件清单。
[x] 有最终学习笔记转换要求。
[x] 有最终记忆模型。
[x] 有官方文档阅读清单。
```

### 内容自检

```txt
[x] 覆盖 6.1 对象简介。
[x] 覆盖 6.2 创建对象。
[x] 覆盖 6.3 查询和设置属性。
[x] 覆盖 6.4 删除属性。
[x] 覆盖 6.5 测试属性。
[x] 覆盖 6.6 枚举属性。
[x] 覆盖 6.7 扩展对象。
[x] 覆盖 6.8 序列化对象。
[x] 覆盖 6.9 对象方法。
[x] 覆盖 6.10 对象字面量扩展语法。
[x] 覆盖 6.11 小结。
[x] 区分自有属性和继承属性。
[x] 区分点访问和方括号访问。
[x] 区分 delete 和 undefined。
[x] 区分 Object.assign 和对象展开。
[x] 区分浅拷贝和深拷贝。
[x] 区分 JSON 文本和 JavaScript 对象。
[x] 区分 getter / setter 和普通数据属性。
```

### 代码自检

```txt
[x] 代码注释使用英文。
[x] 代码变量名使用英文。
[x] 代码块中没有中文注释。
[x] 示例可用 Node 运行。
[x] 故意错误示例明确说明错误类型。
[x] 小项目包含主文件、错误文件、检查清单。
```
