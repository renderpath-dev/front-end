# JavaScript 第 9 章“类”学习指导文件 v1

> 定位：这是《JavaScript 权威指南》第 9 章“类”的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建练习目录、写 `.js` 文件、运行 Node、观察输出或错误，再把每节整理成自己的正式笔记。  
> 参考范围：《JavaScript 权威指南》第 9 章 9.1 到 9.6，MDN 的 Using classes、Classes、Inheritance and the prototype chain、class declaration、constructor、extends、super、static、Public class fields、Private elements、get、set。  
> 语言规则：正文统一中文；必要技术术语保留英文括号。  
> 代码规则：代码、变量名、函数名、类名、文件名、目录名、代码注释不使用中文字符。

---

## 官方文档对应关系

| 本文件主题 | 官方文档 |
|---|---|
| class 基础语法、类声明、类表达式、类体严格模式 | [Classes - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) |
| class 的使用方式、声明、表达式、字段、私有元素、继承 | [Using classes - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) |
| 原型链、属性查找、构造函数和原型对象关系 | [Inheritance and the prototype chain - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain) |
| `constructor` 方法与派生类构造规则 | [constructor - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) |
| `extends` 建立子类继承关系 | [extends - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) |
| `super()` 与 `super.method()` | [super - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) |
| 静态方法和静态字段 | [static - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) |
| 公有字段 | [Public class fields - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields) |
| 私有字段、私有方法、私有品牌检查 | [Private elements - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements) |
| getter / setter 访问器 | [get - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) / [set - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) |

---

## 目录

1. [官方文档对应关系](#官方文档对应关系)
2. [文件定位](#0-文件定位)
2. [本章学习目标](#1-本章学习目标)
3. [本章学习顺序](#2-本章学习顺序)
4. [本章核心术语表](#3-本章核心术语表)
5. [本章底层模型](#4-本章底层模型)
6. [推荐目录结构](#5-推荐目录结构)
7. [运行方式](#6-运行方式)
8. [分节训练内容](#7-分节训练内容)
9. [本章 API / 语法完整索引](#8-本章-api--语法完整索引)
10. [本章常见错误总表](#9-本章常见错误总表)
11. [最终小项目](#10-最终小项目shopping-cart-domain-model)
12. [额外 cheatsheet](#11-额外-cheatsheet)
13. [最终文件清单](#12-最终文件清单)
14. [最终学习笔记转换要求](#13-最终学习笔记转换要求)
15. [本章最终记忆模型](#14-本章最终记忆模型)
16. [官方文档阅读清单](#15-官方文档阅读清单)
17. [生成前自检清单](#16-生成前自检清单)

---

## 0. 文件定位

### 结论

第 9 章不是“JavaScript 也有 class 了”这么简单。第 9 章真正要解决的是：

```txt
JavaScript 如何把一组对象组织成一个类型层级，
如何让多个对象共享方法，
如何通过原型链实现继承，
以及 class 语法如何把这些底层机制包装成更接近传统面向对象语言的写法。
```

你学习这一章时必须始终同时看两层：

```txt
surface syntax:
  class Product { constructor() {} method() {} }

runtime mechanism:
  Product is a constructor function.
  Product.prototype stores shared instance methods.
  Each instance has [[Prototype]] linked to Product.prototype.
  extends creates two linked prototype chains.
```

### 技术意义

现代前端开发里，类虽然不像函数和对象字面量那样处处出现，但它仍然非常重要：

```txt
custom Error class
React class component in legacy code
Node EventEmitter subclass
DOM built-in classes
Web API constructors
SDK client classes
model classes in domain logic
TypeScript class and interface relation
prototype debugging
```

如果你只会写 `class`，但不知道它背后仍然是构造函数（constructor function）、原型对象（prototype object）和实例（instance）之间的关系，那么你会在这些地方卡住：

```txt
1. Why is a class value also a function?
2. Why do methods appear on Product.prototype instead of each instance?
3. Why does extracting a method lose this?
4. Why must super() run before this in a derived constructor?
5. Why does instanceof walk the prototype chain?
6. Why are private fields not normal properties?
7. Why is adding methods to built-in prototypes risky?
```

---

## 1. 本章学习目标

学完第 9 章，你必须能完整解释这些内容：

```txt
class
prototype
instance
constructor function
factory function
new expression
new.target
prototype property
[[Prototype]] internal link
Object.create()
Object.getPrototypeOf()
Object.setPrototypeOf()
isPrototypeOf()
constructor property
instanceof
class declaration
class expression
class body
constructor method
prototype method
static method
static field
public field
private field
private method
getter
setter
computed method name
extends
super()
super.method()
subclass
method overriding
built-in subclass
custom Error subclass
monkey patching
```

### 本章不是为了背 OOP 术语

本章的重点不是背“封装、继承、多态”三个词，而是把下面这条链路讲清楚：

```txt
source code
  -> class declaration creates a constructor function
  -> methods are installed on the prototype object
  -> new creates an instance object
  -> instance [[Prototype]] points to Constructor.prototype
  -> property lookup walks from instance to prototype chain
  -> extends connects both instance-side and constructor-side chains
```

---

## 2. 本章学习顺序

### 结论

建议按这个顺序学习：

```txt
class runtime model
  -> class and prototype
  -> constructor function and new
  -> constructor property and instanceof
  -> class declaration and class expression
  -> constructor method and instance state
  -> prototype methods and this
  -> static members
  -> getters, setters, and computed method names
  -> public fields and private fields
  -> extends and super
  -> subclass prototype chains
  -> built-in subclass and custom Error
  -> adding methods to existing classes
  -> final mini project
```

### 为什么这个顺序合理

不能一上来只看 `class Product {}`。这样会造成一个严重误解：以为 JavaScript 的类和 Java / C++ 的类是同一类东西。

正确顺序是：

```txt
先看没有 class 的原型类。
再看构造函数如何配合 new。
再看 class 语法只是更规范的写法。
最后看 extends 如何同时连接两条原型链。
```

---

## 3. 本章核心术语表

| 术语 | 技术含义 | 本章要观察的代码位置 |
|---|---|---|
| 类（class） | 一组共享同一原型对象的实例对象 | `Object.getPrototypeOf(instance)` |
| 实例（instance） | 由构造函数或工厂函数创建出的对象 | `new Product()` 的返回值 |
| 原型对象（prototype object） | 存放共享方法的对象 | `Product.prototype` |
| 内部原型链接（[[Prototype]]） | 对象指向其原型对象的内部链接 | `Object.getPrototypeOf(product)` |
| 构造函数（constructor function） | 通过 `new` 初始化新对象的函数 | `function Product(...) {}` |
| `prototype` 属性 | 函数对象上的属性，用来指定 `new` 创建实例的原型 | `Product.prototype` |
| `constructor` 属性 | 默认原型对象上反向指向构造函数的属性 | `Product.prototype.constructor` |
| `new` 表达式（new expression） | 创建对象、连接原型、绑定 `this`、执行构造函数 | `new Product()` |
| `new.target` | 判断函数是否通过 `new` 被调用 | `new.target === Product` |
| `instanceof` | 检查右侧构造函数的 `prototype` 是否在左侧对象的原型链上 | `product instanceof Product` |
| 类声明（class declaration） | 创建类绑定的声明语法 | `class Product {}` |
| 类表达式（class expression） | 产生类值的表达式 | `const Product = class {}` |
| 实例方法（instance method） | 通过实例调用、通常依赖 `this` 的方法 | `product.getLabel()` |
| 静态方法（static method） | 存在于类本身上的方法，不存在于实例上 | `Product.from()` |
| 公有字段（public field） | 每个实例自己的字段 | `title = "Untitled"` |
| 私有字段（private field） | 使用 `#` 声明的硬私有成员，不是普通属性 | `#balanceCents` |
| 访问器（accessor） | getter / setter，属性访问背后调用函数 | `get total()` / `set total(value)` |
| 子类（subclass） | 通过 `extends` 继承父类的类 | `class DigitalProduct extends Product {}` |
| `super()` | 在派生类构造函数中调用父类构造函数 | `super(id, title)` |
| `super.method()` | 从父类原型上调用方法，并把当前 `this` 传入 | `super.getLabel()` |
| 方法重写（method overriding） | 子类定义同名方法覆盖父类方法查找结果 | `DigitalProduct.prototype.getLabel` |

---

## 4. 本章底层模型

### 结论

JavaScript 的类本质上仍然是原型机制（prototype mechanism）。

```txt
Class syntax is a convenient syntax layer.
Prototype inheritance is the runtime object model.
```

### 运行时对象关系

```txt
class Product {}

creates:

Product
  type: function object
  own property: prototype -> Product.prototype

Product.prototype
  type: object
  own property: constructor -> Product
  own methods: getLabel, updatePrice, ...

product = new Product()
  type: object
  own properties: id, title, priceCents
  [[Prototype]] -> Product.prototype
```

### 属性查找机制

当你写：

```txt
product.getLabel();
```

解释器的查找顺序是：

```txt
1. Look for getLabel on product itself.
2. If not found, follow product.[[Prototype]] to Product.prototype.
3. If found, call that function as a method.
4. During method call, this is bound to product.
```

### `extends` 的两条链

`extends` 会建立两条关系：

```txt
instance-side chain:
  digitalProduct
    -> DigitalProduct.prototype
    -> Product.prototype
    -> Object.prototype
    -> null

constructor-side chain:
  DigitalProduct
    -> Product
    -> Function.prototype
    -> Object.prototype
    -> null
```

这就是为什么：

```txt
1. digitalProduct can call Product.prototype methods.
2. DigitalProduct can inherit Product static methods.
```

### 类语法的几个关键差异

和普通函数构造器相比，`class` 有几个重要运行时规则：

```txt
1. Class constructor cannot be called without new.
2. Class body runs in strict mode.
3. Methods defined in class body are non-enumerable.
4. Class declarations are block-scoped and have temporal dead zone behavior.
5. Derived class constructor must call super() before accessing this.
6. Private fields are not properties and cannot be accessed through bracket notation.
```

---

## 5. 推荐目录结构

### 结论

第 9 章建议放在：

```txt
javascript/chapter-09-classes/
```

本次只需要把目录写在指导文件中，不需要单独 zip。

```txt
javascript/chapter-09-classes/
  javascript-chapter-09-classes-learning-guide-zh-v1.md
  javascript-chapter-09-classes-cheatsheet-zh-v1.md

  00-class-runtime-model/
    prototypeClassFactory.js
    constructorPrototypeLink.js
    classSyntaxIsPrototypeSyntax.js

  01-class-and-prototype/
    objectCreateClass.js
    sharedPrototypeMethod.js
    ownStateVsSharedMethod.js

  02-constructor-and-new/
    constructorFunctionDemo.js
    newTargetGuard.js
    classCannotBeCalled.js

  03-constructor-property-instanceof/
    constructorPropertyDemo.js
    brokenConstructorProperty.js
    instanceofPrototypeChain.js

  04-class-declaration-expression/
    classDeclarationDemo.js
    classExpressionDemo.js
    classTemporalDeadZone.js

  05-constructor-instance-state/
    instanceStateDemo.js
    defaultConstructorDemo.js
    constructorReturnMistake.js

  06-prototype-methods-this/
    prototypeMethodThis.js
    detachedMethodMistake.js
    arrowMethodTradeoff.js

  07-static-members/
    staticFactoryMethod.js
    staticFieldCache.js
    staticOnInstanceMistake.js

  08-accessors-computed-methods/
    getterSetterDemo.js
    computedMethodName.js
    accessorValidationMistake.js

  09-public-private-fields/
    publicFieldDemo.js
    privateFieldDemo.js
    privateBrandCheck.js

  10-extends-super/
    basicSubclassDemo.js
    superConstructorOrder.js
    superMethodCall.js

  11-subclass-prototype-chain/
    inheritanceChainInspection.js
    staticInheritanceDemo.js
    methodOverrideDemo.js

  12-built-in-and-error-subclasses/
    customErrorSubclass.js
    arraySubclassDemo.js
    errorNameMistake.js

  13-extending-existing-classes/
    addMethodToOwnClass.js
    builtInPrototypeRisk.js
    safeUtilityInstead.js

  14-class-design-boundaries/
    classVsFactoryFunction.js
    privateStateTradeoff.js
    compositionOverInheritance.js

  15-mini-project-shopping-cart-domain-model/
    productModel.js
    cartModel.js
    discountPolicy.js
    shoppingCartDemo.js
    shoppingCartMistakes.js
    shoppingCartQuantityMistake.js
    shoppingCartChecklist.md
```

---

## 6. 运行方式

### 结论

本章练习可以直接用 Node 运行。建议项目根目录使用普通 `.js` 文件。

```bash
node 00-class-runtime-model/prototypeClassFactory.js
node 00-class-runtime-model/constructorPrototypeLink.js
node 00-class-runtime-model/classSyntaxIsPrototypeSyntax.js
node 01-class-and-prototype/objectCreateClass.js
node 01-class-and-prototype/sharedPrototypeMethod.js
node 01-class-and-prototype/ownStateVsSharedMethod.js
node 02-constructor-and-new/constructorFunctionDemo.js
node 02-constructor-and-new/newTargetGuard.js
node 02-constructor-and-new/classCannotBeCalled.js
node 03-constructor-property-instanceof/constructorPropertyDemo.js
node 03-constructor-property-instanceof/brokenConstructorProperty.js
node 03-constructor-property-instanceof/instanceofPrototypeChain.js
node 04-class-declaration-expression/classDeclarationDemo.js
node 04-class-declaration-expression/classExpressionDemo.js
node 04-class-declaration-expression/classTemporalDeadZone.js
node 05-constructor-instance-state/instanceStateDemo.js
node 05-constructor-instance-state/defaultConstructorDemo.js
node 05-constructor-instance-state/constructorReturnMistake.js
node 06-prototype-methods-this/prototypeMethodThis.js
node 06-prototype-methods-this/detachedMethodMistake.js
node 06-prototype-methods-this/arrowMethodTradeoff.js
node 07-static-members/staticFactoryMethod.js
node 07-static-members/staticFieldCache.js
node 07-static-members/staticOnInstanceMistake.js
node 08-accessors-computed-methods/getterSetterDemo.js
node 08-accessors-computed-methods/computedMethodName.js
node 08-accessors-computed-methods/accessorValidationMistake.js
node 09-public-private-fields/publicFieldDemo.js
node 09-public-private-fields/privateFieldDemo.js
node 09-public-private-fields/privateBrandCheck.js
node 10-extends-super/basicSubclassDemo.js
node 10-extends-super/superConstructorOrder.js
node 10-extends-super/superMethodCall.js
node 11-subclass-prototype-chain/inheritanceChainInspection.js
node 11-subclass-prototype-chain/staticInheritanceDemo.js
node 11-subclass-prototype-chain/methodOverrideDemo.js
node 12-built-in-and-error-subclasses/customErrorSubclass.js
node 12-built-in-and-error-subclasses/arraySubclassDemo.js
node 12-built-in-and-error-subclasses/errorNameMistake.js
node 13-extending-existing-classes/addMethodToOwnClass.js
node 13-extending-existing-classes/builtInPrototypeRisk.js
node 13-extending-existing-classes/safeUtilityInstead.js
node 14-class-design-boundaries/classVsFactoryFunction.js
node 14-class-design-boundaries/privateStateTradeoff.js
node 14-class-design-boundaries/compositionOverInheritance.js
node 15-mini-project-shopping-cart-domain-model/shoppingCartDemo.js
node 15-mini-project-shopping-cart-domain-model/shoppingCartMistakes.js
node 15-mini-project-shopping-cart-domain-model/shoppingCartQuantityMistake.js
```

### 运行时观察重点

每个文件运行时观察四件事：

```txt
1. Which object owns the data?
2. Which object owns the method?
3. What does this point to when the method runs?
4. Which prototype chain is used during property lookup?
```

---

## 7. 分节训练内容

## 00：类的运行时模型

### 结论

JavaScript 的类不是编译期模板，而是运行时对象关系：构造函数、原型对象、实例对象共同组成“类”。

### 技术意义

这解释了为什么多个实例共享同一个方法，却各自保存自己的状态。

### 底层机制

```txt
instance own properties:
  per-object state

prototype methods:
  shared behavior

constructor function:
  initialization entry point
```

### API / 语法规范

```txt
Object.create(proto)
Object.getPrototypeOf(object)
Constructor.prototype
new Constructor(...arguments)
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
Object.create(proto)
proto:
  The object that should become the new object's [[Prototype]].

Object.getPrototypeOf(object)
object:
  The object whose prototype should be returned.

Function.prototype property:
  Exists on ordinary functions.
  Used by new to set the created instance's [[Prototype]].
```

### 文件结构

```txt
00-class-runtime-model/
  prototypeClassFactory.js
  constructorPrototypeLink.js
  classSyntaxIsPrototypeSyntax.js
```

`prototypeClassFactory.js`
```js
// Goal:
// Build a class-like object model without class syntax.

// Expected output:
// true
// 1..5
// true

const rangeMethods = {
  includes(value) {
    return this.from <= value && value <= this.to;
  },
  toString() {
    return `${this.from}..${this.to}`;
  },
};

function createRange(from, to) {
  const range = Object.create(rangeMethods);
  range.from = from;
  range.to = to;
  return range;
}

const firstRange = createRange(1, 5);
const secondRange = createRange(10, 20);

console.log(firstRange.includes(3));
console.log(firstRange.toString());
console.log(Object.getPrototypeOf(firstRange) === Object.getPrototypeOf(secondRange));
```


`constructorPrototypeLink.js`

```js
// Goal:
// Verify how new links an instance to Constructor.prototype.

// Expected output:
// true
// true
// true
// Keyboard

function Product(title) {
  this.title = title;
}

Product.prototype.getLabel = function getLabel() {
  return this.title;
};

const keyboard = new Product("Keyboard");

console.log(Object.getPrototypeOf(keyboard) === Product.prototype);
console.log(Product.prototype.constructor === Product);
console.log(keyboard.constructor === Product);
console.log(keyboard.getLabel());
```

`classSyntaxIsPrototypeSyntax.js`

```js
// Goal:
// Compare class syntax with the prototype object it creates.

// Expected output:
// function
// false
// true
// Keyboard

class Product {
  constructor(title) {
    this.title = title;
  }

  getLabel() {
    return this.title;
  }
}

const keyboard = new Product("Keyboard");

console.log(typeof Product);
console.log(Object.hasOwn(keyboard, "getLabel"));
console.log(Object.getPrototypeOf(keyboard) === Product.prototype);
console.log(Product.prototype.getLabel.call(keyboard));
```

### 运行方式

```bash
node 00-class-runtime-model/prototypeClassFactory.js
```

### 预期输出

```txt
true
1..5
true
```

### 执行过程

```txt
1. rangeMethods 是共享方法对象。
2. createRange(1, 5) 创建一个新对象。
3. Object.create(rangeMethods) 把新对象的 [[Prototype]] 指向 rangeMethods。
4. from 和 to 被写到实例自己身上。
5. firstRange.includes(3) 先在 firstRange 自身找 includes，找不到。
6. 查找继续沿 [[Prototype]] 到 rangeMethods，找到 includes。
7. 作为方法调用时，this 绑定到 firstRange。
8. secondRange 也继承同一个 rangeMethods，所以两个对象共享行为但不共享 from/to 状态。
```

### 和实际项目的关系

React、Node 和 Web API 中大量对象都依赖同样的思想：实例保存自己的状态，原型保存共享方法。

### 常见错误

```txt
错误：类就是 class 关键字。
正确：类是共享原型的一组对象，class 只是创建这种关系的语法。
```

### 最终记忆模型

```txt
Class in JavaScript = shared prototype + initialized instances.
```

---

## 01：类和原型

### 结论

JavaScript 中“属于同一个类”的核心判断不是是否来自同一份源码模板，而是是否从同一个原型对象继承行为。

### 技术意义

对象自己的属性保存状态，原型对象上的属性保存共享方法。这样可以避免每个实例重复创建相同函数。

### 底层机制

```txt
Object property lookup:
  own property first
  prototype property second
  next prototype after that
```

### API / 语法规范

```txt
prototypeObject.isPrototypeOf(object)
Object.hasOwn(object, propertyKey)
propertyKey in object
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
prototypeObject.isPrototypeOf(object)
object:
  The object whose prototype chain is checked.
return:
  true if prototypeObject exists anywhere in object's prototype chain.

Object.hasOwn(object, propertyKey)
return:
  true only if propertyKey is an own property.

propertyKey in object
return:
  true if propertyKey exists as an own or inherited property.
```

### 文件结构

```txt
01-class-and-prototype/
  objectCreateClass.js
  sharedPrototypeMethod.js
  ownStateVsSharedMethod.js
```

`ownStateVsSharedMethod.js`
```js
// Goal:
// Separate per-instance state from shared prototype methods.

// Expected output:
// true
// false
// true
// true

const productMethods = {
  getLabel() {
    return `${this.title}: ${this.priceCents}`;
  },
};

function createProduct(title, priceCents) {
  const product = Object.create(productMethods);
  product.title = title;
  product.priceCents = priceCents;
  return product;
}

const keyboard = createProduct("Keyboard", 9900);
const mouse = createProduct("Mouse", 2500);

console.log(Object.hasOwn(keyboard, "title"));
console.log(Object.hasOwn(keyboard, "getLabel"));
console.log("getLabel" in keyboard);
console.log(keyboard.getLabel === mouse.getLabel);
```


`objectCreateClass.js`

```js
// Goal:
// Build related objects by sharing a prototype object.

// Expected output:
// active: pro
// true
// true

const subscriptionMethods = {
  describe() {
    return `${this.status}: ${this.planName}`;
  },
};

function createSubscription(planName, status) {
  const subscription = Object.create(subscriptionMethods);
  subscription.planName = planName;
  subscription.status = status;
  return subscription;
}

const proSubscription = createSubscription("pro", "active");
const teamSubscription = createSubscription("team", "active");

console.log(proSubscription.describe());
console.log(Object.getPrototypeOf(proSubscription) === subscriptionMethods);
console.log(proSubscription.describe === teamSubscription.describe);
```

`sharedPrototypeMethod.js`

```js
// Goal:
// Verify that many instances can share one prototype method.

// Expected output:
// true
// Ada Lovelace
// Grace Hopper

const memberMethods = {
  getDisplayName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

function createMember(firstName, lastName) {
  const member = Object.create(memberMethods);
  member.firstName = firstName;
  member.lastName = lastName;
  return member;
}

const firstMember = createMember("Ada", "Lovelace");
const secondMember = createMember("Grace", "Hopper");

console.log(firstMember.getDisplayName === secondMember.getDisplayName);
console.log(firstMember.getDisplayName());
console.log(secondMember.getDisplayName());
```

### 运行方式

```bash
node 01-class-and-prototype/ownStateVsSharedMethod.js
```

### 预期输出

```txt
true
false
true
true
```

### 执行过程

```txt
1. title 是 keyboard 自己的属性，所以 Object.hasOwn(keyboard, "title") 是 true。
2. getLabel 不在 keyboard 自己身上，所以 Object.hasOwn(keyboard, "getLabel") 是 false。
3. getLabel 在 keyboard 的原型对象 productMethods 上，所以 "getLabel" in keyboard 是 true。
4. keyboard 和 mouse 继承同一个 getLabel 函数，所以两个方法引用相等。
```

### 和实际项目的关系

实例状态和共享方法分离后，代码更节省内存，也更容易统一修改行为。

### 常见错误

```txt
错误：in 只检查对象自己的属性。
正确：in 会检查自有属性和继承属性。
```

### 最终记忆模型

```txt
Own properties store state. Prototype properties store shared behavior.
```

---

## 02：构造函数和 new

### 结论

构造函数（constructor function）是配合 `new` 使用的初始化函数。`new` 负责创建对象、连接原型、绑定 `this`，构造函数负责写入初始状态。

### 技术意义

这解释了为什么构造函数通常首字母大写，也解释了为什么忘记 `new` 会产生完全不同的运行时行为。

### 底层机制

执行：

```txt
new Product("p1", "Keyboard")
```

运行时近似做了这些事：

```txt
1. Create a new empty object.
2. Link its [[Prototype]] to Product.prototype.
3. Call Product with this bound to the new object.
4. Return the new object unless the constructor explicitly returns another object.
```

### API / 语法规范

```txt
new Constructor(argument1, argument2)
new.target
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
new.target:
  Available inside functions and class constructors.
  If the function was called with new, it refers to the constructor target.
  If not called with new, it is undefined.
```

### 文件结构

```txt
02-constructor-and-new/
  constructorFunctionDemo.js
  newTargetGuard.js
  classCannotBeCalled.js
```

`constructorFunctionDemo.js`
```js
// Goal:
// Show how a constructor function initializes instance state.

// Expected output:
// Keyboard
// true
// true

function Product(id, title) {
  this.id = id;
  this.title = title;
}

Product.prototype.getLabel = function getLabel() {
  return this.title;
};

const keyboard = new Product("p1", "Keyboard");

console.log(keyboard.getLabel());
console.log(Object.getPrototypeOf(keyboard) === Product.prototype);
console.log(keyboard instanceof Product);
```

`newTargetGuard.js`
```js
// Goal:
// Use new.target to support calling a constructor with or without new.

// Expected output:
// Keyboard
// Mouse

function Product(id, title) {
  if (new.target === undefined) {
    return new Product(id, title);
  }

  this.id = id;
  this.title = title;
}

const keyboard = new Product("p1", "Keyboard");
const mouse = Product("p2", "Mouse");

console.log(keyboard.title);
console.log(mouse.title);
```

`classCannotBeCalled.js`
```js
// Goal:
// Verify that class constructors cannot be called without new.

// Expected output:
// TypeError

class Product {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

try {
  Product("p1", "Keyboard");
} catch (error) {
  console.log(error.constructor.name);
}
```

### 运行方式

```bash
node 02-constructor-and-new/constructorFunctionDemo.js
node 02-constructor-and-new/newTargetGuard.js
node 02-constructor-and-new/classCannotBeCalled.js
```

### 预期输出

```txt
Keyboard
true
true

Keyboard
Mouse

TypeError
```

### 执行过程

```txt
1. Product.prototype.getLabel 是共享方法。
2. new Product(...) 创建新对象，并把它的 [[Prototype]] 设为 Product.prototype。
3. 构造函数体内的 this 指向新对象。
4. this.id 和 this.title 写入实例自己的属性。
5. class Product 创建的类构造器不能被普通调用，所以 Product(...) 抛出 TypeError。
```

### 和实际项目的关系

老项目、很多库源码和部分 polyfill 仍然使用构造函数模式。理解它才能真正看懂 `class` 的底层。

### 常见错误

```txt
错误：new 只是调用函数。
正确：new 是对象创建、原型链接、this 绑定、构造函数执行的组合操作。
```

### 最终记忆模型

```txt
new connects an instance to Constructor.prototype and runs initialization with this.
```

---

## 03：constructor 属性和 instanceof

### 结论

默认情况下，普通函数的 `prototype` 对象有一个不可枚举的 `constructor` 属性，反向指向该函数。`instanceof` 则通过原型链判断对象是否属于某个构造函数标识的类。

### 技术意义

这解释了为什么很多对象看起来能访问 `obj.constructor`，也解释了为什么重写 `Constructor.prototype` 时容易把 `constructor` 弄丢。

### 底层机制

```txt
Product.prototype.constructor === Product
product.constructor is found through the prototype chain
product instanceof Product checks whether Product.prototype is in product's prototype chain
```

### API / 语法规范

```txt
object instanceof Constructor
Object.defineProperty(object, propertyKey, descriptor)
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
constructor:
  Default property on ordinary function prototype objects.
  Points back to the function.

Object.defineProperty(object, propertyKey, descriptor)
descriptor.value:
  The value to define.
descriptor.enumerable:
  Whether the property appears in enumeration.
descriptor.writable:
  Whether assignment can change it.
descriptor.configurable:
  Whether it can be deleted or reconfigured.
```

### 文件结构

```txt
03-constructor-property-instanceof/
  constructorPropertyDemo.js
  brokenConstructorProperty.js
  instanceofPrototypeChain.js
```

`brokenConstructorProperty.js`
```js
// Goal:
// Show how replacing a prototype object can lose the constructor link.

// Expected output:
// false
// true
// true

function Product(title) {
  this.title = title;
}

Product.prototype = {
  getLabel() {
    return this.title;
  },
};

const keyboard = new Product("Keyboard");

console.log(keyboard.constructor === Product);
console.log(keyboard.constructor === Object);

Object.defineProperty(Product.prototype, "constructor", {
  value: Product,
  enumerable: false,
  writable: true,
  configurable: true,
});

console.log(keyboard.constructor === Product);
```

`instanceofPrototypeChain.js`
```js
// Goal:
// Verify that instanceof checks the prototype chain.

// Expected output:
// true
// true
// true

function Product(title) {
  this.title = title;
}

const keyboard = new Product("Keyboard");

console.log(keyboard instanceof Product);
console.log(Product.prototype.isPrototypeOf(keyboard));
console.log(Object.prototype.isPrototypeOf(keyboard));
```


`constructorPropertyDemo.js`

```js
// Goal:
// Inspect the default constructor property on a prototype object.

// Expected output:
// true
// true
// false

function Product(title) {
  this.title = title;
}

const keyboard = new Product("Keyboard");

console.log(Product.prototype.constructor === Product);
console.log(keyboard.constructor === Product);
console.log(Object.prototype.propertyIsEnumerable.call(Product.prototype, "constructor"));
```

### 运行方式

```bash
node 03-constructor-property-instanceof/brokenConstructorProperty.js
node 03-constructor-property-instanceof/instanceofPrototypeChain.js
```

### 预期输出

```txt
false
true
true

true
true
true
```

### 执行过程

```txt
1. Product.prototype = {...} 用一个新对象替换了默认原型对象。
2. 新对象没有 constructor 属性。
3. keyboard.constructor 沿原型链继续找到 Object.prototype.constructor。
4. 所以第一次判断 keyboard.constructor === Product 是 false。
5. Object.defineProperty 手动把 constructor 加回 Product.prototype。
6. instanceof 不依赖 constructor 属性本身，而是检查 Product.prototype 是否在对象原型链上。
```

### 和实际项目的关系

调试对象类型时，你会经常看到 `constructor` 和 `instanceof`。必须知道它们不是同一套判断机制。

### 常见错误

```txt
错误：instanceof 检查 obj.constructor。
正确：instanceof 检查 Constructor.prototype 是否在 obj 的原型链上。
```

### 最终记忆模型

```txt
constructor is inherited metadata. instanceof is prototype-chain testing.
```

---

## 04：class 声明和 class 表达式

### 结论

`class` 是创建构造函数和原型方法的一种声明/表达式语法。类本身是值，可以赋给变量，也可以作为表达式返回。

### 技术意义

这解释了为什么类可以被导入导出、传递、赋值，也解释了为什么类声明有块级作用域和暂时性死区（temporal dead zone）。

### 底层机制

```txt
class Product {}

creates a binding named Product.
The value stored in Product is a constructor function.
Methods in the class body are installed on Product.prototype.
```

### API / 语法规范

```txt
class ClassName { ... }
const ClassName = class { ... };
const ClassName = class InternalName { ... };
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
class body:
  constructor method
  instance methods
  static methods
  fields
  accessors

class declaration:
  block-scoped binding
  cannot be used before initialization
```

### 文件结构

```txt
04-class-declaration-expression/
  classDeclarationDemo.js
  classExpressionDemo.js
  classTemporalDeadZone.js
```

`classDeclarationDemo.js`
```js
// Goal:
// Show that a class declaration creates a constructor function.

// Expected output:
// function
// true
// Keyboard

class Product {
  constructor(title) {
    this.title = title;
  }

  getLabel() {
    return this.title;
  }
}

const keyboard = new Product("Keyboard");

console.log(typeof Product);
console.log(Object.hasOwn(keyboard, "getLabel") === false);
console.log(keyboard.getLabel());
```

`classExpressionDemo.js`
```js
// Goal:
// Use a class expression as a value.

// Expected output:
// DigitalProduct
// true

const Product = class DigitalProduct {
  constructor(title) {
    this.title = title;
  }

  getKind() {
    return DigitalProduct.name;
  }
};

const download = new Product("Ebook");

console.log(download.getKind());
console.log(typeof Product === "function");
```

`classTemporalDeadZone.js`
```js
// Goal:
// Show that class declarations cannot be used before initialization.

// Expected output:
// ReferenceError
// Widget

try {
  console.log(Widget.name);
} catch (error) {
  console.log(error.constructor.name);
}

class Widget {}

console.log(Widget.name);
```

### 运行方式

```bash
node 04-class-declaration-expression/classDeclarationDemo.js
node 04-class-declaration-expression/classExpressionDemo.js
node 04-class-declaration-expression/classTemporalDeadZone.js
```

### 预期输出

```txt
function
true
Keyboard

DigitalProduct
true

ReferenceError
Widget
```

### 执行过程

```txt
1. class Product 创建名为 Product 的绑定。
2. Product 的值是一个函数对象，所以 typeof Product 是 "function"。
3. getLabel 被安装到 Product.prototype 上，不是实例自有属性。
4. class 表达式可以赋给变量 Product。
5. 命名类表达式的内部名 DigitalProduct 只能在类体内部可靠使用。
6. class 声明不会像 function declaration 那样允许提前调用，访问时处于暂时性死区。
```

### 和实际项目的关系

模块中经常写 `export default class ProductService {}` 或 `const Client = class {}`。你要知道这仍然是在导出一个函数值。

### 常见错误

```txt
错误：class 声明会像函数声明一样完全提升。
正确：class 绑定存在暂时性死区，不能在声明前使用。
```

### 最终记忆模型

```txt
class creates a constructor-function value with prototype methods.
```

---

## 05：constructor 和实例状态

### 结论

`constructor` 方法负责初始化实例自己的状态。方法应该放在原型上，状态应该放在实例上。

### 技术意义

这能帮你区分：哪些数据每个对象不同，哪些行为应该共享。

### 底层机制

```txt
constructor runs once per new instance.
Each this.property assignment creates or updates an own property.
Prototype methods are created once when the class is evaluated.
```

### API / 语法规范

```txt
class Product {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
constructor(...arguments)
return:
  Usually omitted.
  Returning a primitive is ignored.
  Returning an object from a base constructor can replace the created instance.
```

### 文件结构

```txt
05-constructor-instance-state/
  instanceStateDemo.js
  defaultConstructorDemo.js
  constructorReturnMistake.js
```

`instanceStateDemo.js`
```js
// Goal:
// Store different state on different instances.

// Expected output:
// Keyboard
// Mouse
// false
// true

class Product {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }

  getLabel() {
    return this.title;
  }
}

const keyboard = new Product("p1", "Keyboard");
const mouse = new Product("p2", "Mouse");

console.log(keyboard.getLabel());
console.log(mouse.getLabel());
console.log(keyboard.title === mouse.title);
console.log(keyboard.getLabel === mouse.getLabel);
```

`constructorReturnMistake.js`
```js
// Goal:
// Show why returning a different object from a base constructor is confusing.

// Expected output:
// Replacement
// false

class Product {
  constructor(title) {
    this.title = title;
    return { title: "Replacement" };
  }
}

const item = new Product("Keyboard");

console.log(item.title);
console.log(item instanceof Product);
```


`defaultConstructorDemo.js`

```js
// Goal:
// Verify what happens when a class has no explicit constructor.

// Expected output:
// true
// true
// function

class EmptyProduct {}

const item = new EmptyProduct();

console.log(item instanceof EmptyProduct);
console.log(Object.getPrototypeOf(item) === EmptyProduct.prototype);
console.log(typeof EmptyProduct.prototype.constructor);
```

### 运行方式

```bash
node 05-constructor-instance-state/instanceStateDemo.js
node 05-constructor-instance-state/constructorReturnMistake.js
```

### 预期输出

```txt
Keyboard
Mouse
false
true

Replacement
false
```

### 执行过程

```txt
1. 每次 new Product 都会执行 constructor。
2. this.id 和 this.title 写入当前实例。
3. keyboard 和 mouse 的 title 不同，因为它们是各自的自有属性。
4. getLabel 存在于 Product.prototype 上，所以两个实例共享同一个函数。
5. constructor 显式返回对象时，new 表达式返回该对象，导致结果不再是 Product 实例。
```

### 和实际项目的关系

构造函数里应该做清晰的状态初始化，避免返回替代对象。这种写法会让调试、继承和 `instanceof` 都变得混乱。

### 常见错误

```txt
错误：constructor 适合返回一个新对象来替换 this。
正确：constructor 通常不写 return，只初始化 this。
```

### 最终记忆模型

```txt
constructor initializes instance state; prototype methods define shared behavior.
```

---

## 06：原型方法和 this

### 结论

类体中的普通方法会放在原型上。方法内部的 `this` 不是由方法定义位置决定，而是由调用方式决定。

### 技术意义

这解释了为什么 `const method = object.method; method()` 会丢失 `this`，也是 React 旧类组件、DOM listener、callback 代码中常见错误的根源。

### 底层机制

```txt
object.method()
  this -> object

const method = object.method;
method()
  this -> undefined in class strict mode
```

### API / 语法规范

```txt
methodName(parameters) { ... }
this.property
function.prototype.bind(thisArg)
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
func.bind(thisArg, ...boundArguments)
thisArg:
  The value used as this when the bound function is called.
return:
  A new bound function.
```

### 文件结构

```txt
06-prototype-methods-this/
  prototypeMethodThis.js
  detachedMethodMistake.js
  arrowMethodTradeoff.js
```

`detachedMethodMistake.js`
```js
// Goal:
// Verify that extracting a class method loses its receiver.

// Expected output:
// 1
// TypeError
// 2

class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count += 1;
    return this.count;
  }
}

const counter = new Counter();
console.log(counter.increment());

const detachedIncrement = counter.increment;

try {
  detachedIncrement();
} catch (error) {
  console.log(error.constructor.name);
}

const boundIncrement = counter.increment.bind(counter);
console.log(boundIncrement());
```

`arrowMethodTradeoff.js`
```js
// Goal:
// Compare a prototype method with an arrow function stored on each instance.

// Expected output:
// false
// true
// 1

class Counter {
  constructor() {
    this.count = 0;
    this.increment = () => {
      this.count += 1;
      return this.count;
    };
  }
}

const firstCounter = new Counter();
const secondCounter = new Counter();

console.log(firstCounter.increment === secondCounter.increment);
console.log(Object.hasOwn(firstCounter, "increment"));

const detachedIncrement = firstCounter.increment;
console.log(detachedIncrement());
```


`prototypeMethodThis.js`

```js
// Goal:
// Verify that class methods live on the prototype and use call-site this.

// Expected output:
// Keyboard: 9900
// false
// true

class Product {
  constructor(title, priceCents) {
    this.title = title;
    this.priceCents = priceCents;
  }

  getLabel() {
    return `${this.title}: ${this.priceCents}`;
  }
}

const keyboard = new Product("Keyboard", 9900);

console.log(keyboard.getLabel());
console.log(Object.hasOwn(keyboard, "getLabel"));
console.log(Object.getPrototypeOf(keyboard).getLabel === Product.prototype.getLabel);
```

### 运行方式

```bash
node 06-prototype-methods-this/detachedMethodMistake.js
node 06-prototype-methods-this/arrowMethodTradeoff.js
```

### 预期输出

```txt
1
TypeError
2

false
true
1
```

### 执行过程

```txt
1. counter.increment() 是方法调用，this 绑定到 counter。
2. detachedIncrement 保存的是函数本身，不再保存接收者对象。
3. detachedIncrement() 是普通函数调用；类方法处于严格模式，this 是 undefined。
4. 访问 undefined.count 抛出 TypeError。
5. bind(counter) 返回一个永久绑定 this 的新函数。
6. 箭头函数字段保存在每个实例自己身上，所以不会丢失 constructor 中的 this，但每个实例都会创建一份函数。
```

### 和实际项目的关系

事件处理、回调函数、旧 React 类组件都可能遇到这个问题。你要能看出错误不是“类坏了”，而是“调用方式改变了 this”。

### 常见错误

```txt
错误：方法里的 this 永远指向定义这个方法的类实例。
正确：普通方法的 this 由调用表达式决定。
```

### 最终记忆模型

```txt
Methods do not carry this. Calls bind this.
```

---

## 07：静态成员

### 结论

静态成员（static member）属于类本身，不属于实例。实例不能直接访问静态方法或静态字段。

### 技术意义

静态方法常用于工厂函数、解析函数、缓存、工具方法。它们描述“这个类整体的能力”，不是“某个实例的行为”。

### 底层机制

```txt
class Money {
  static fromDollars() {}
}

Money.fromDollars exists on Money.
Money.prototype.fromDollars does not exist.
new Money().fromDollars does not exist.
```

### API / 语法规范

```txt
static methodName(parameters) { ... }
static fieldName = value;
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
static:
  Defines a method or field on the class constructor itself.
  Not copied to each instance.
```

### 文件结构

```txt
07-static-members/
  staticFactoryMethod.js
  staticFieldCache.js
  staticOnInstanceMistake.js
```

`staticFactoryMethod.js`
```js
// Goal:
// Use a static factory method to create instances from another unit.

// Expected output:
// 1299
// true
// undefined

class Money {
  constructor(cents) {
    this.cents = cents;
  }

  static fromDollars(dollars) {
    return new Money(Math.round(dollars * 100));
  }

  format() {
    return `$${(this.cents / 100).toFixed(2)}`;
  }
}

const price = Money.fromDollars(12.99);

console.log(price.cents);
console.log(price instanceof Money);
console.log(typeof price.fromDollars);
```

`staticOnInstanceMistake.js`
```js
// Goal:
// Show that static methods are not instance methods.

// Expected output:
// function
// undefined
// TypeError

class Product {
  static fromRecord(record) {
    return new Product(record.title);
  }

  constructor(title) {
    this.title = title;
  }
}

const keyboard = new Product("Keyboard");

console.log(typeof Product.fromRecord);
console.log(typeof keyboard.fromRecord);

try {
  keyboard.fromRecord({ title: "Mouse" });
} catch (error) {
  console.log(error.constructor.name);
}
```


`staticFieldCache.js`

```js
// Goal:
// Store class-level data in a static field.

// Expected output:
// 1
// Keyboard
// true

class ProductRegistry {
  static cache = new Map();

  static add(product) {
    this.cache.set(product.id, product);
  }

  static get(id) {
    return this.cache.get(id);
  }
}

ProductRegistry.add({ id: "p1", title: "Keyboard" });

console.log(ProductRegistry.cache.size);
console.log(ProductRegistry.get("p1").title);
console.log(Object.hasOwn(ProductRegistry, "cache"));
```

### 运行方式

```bash
node 07-static-members/staticFactoryMethod.js
node 07-static-members/staticOnInstanceMistake.js
```

### 预期输出

```txt
1299
true
undefined

function
undefined
TypeError
```

### 执行过程

```txt
1. static fromDollars 被定义在 Money 构造函数对象上。
2. Money.fromDollars(12.99) 返回 new Money(1299)。
3. price 是 Money 实例，但它的原型是 Money.prototype，不是 Money。
4. 所以 price.fromDollars 是 undefined。
```

### 和实际项目的关系

`Date.now()`、`Array.from()`、`Object.create()` 都是“类/构造器上的方法”，不是实例方法。静态方法的思维和这些标准库 API 一致。

### 常见错误

```txt
错误：static 方法可以通过实例调用。
正确：static 方法通过类名调用。
```

### 最终记忆模型

```txt
Static members live on the constructor, not on the prototype or instance.
```

---

## 08：访问器和计算方法名

### 结论

类中可以定义 getter、setter 和计算方法名。getter / setter 让属性访问语法触发函数调用；计算方法名允许用表达式决定方法名。

### 技术意义

访问器适合暴露派生值或做赋值验证。计算方法名适合实现协议，例如 `Symbol.iterator`。

### 底层机制

```txt
cart.total
  -> calls getter function

cart.quantity = 2
  -> calls setter function

[methodKey]() {}
  -> method name is computed when class is evaluated
```

### API / 语法规范

```txt
get propertyName() { ... }
set propertyName(value) { ... }
[expression](parameters) { ... }
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
getter:
  Takes no parameters.
  Must return a value unless intentionally returning undefined.

setter:
  Takes exactly one parameter.
  Return value is ignored.

computed method name:
  The expression inside [] is evaluated to a property key.
```

### 文件结构

```txt
08-accessors-computed-methods/
  getterSetterDemo.js
  computedMethodName.js
  accessorValidationMistake.js
```

`getterSetterDemo.js`
```js
// Goal:
// Use getters and setters to expose validated state.

// Expected output:
// 25
// 3
// RangeError

class CartLine {
  constructor(unitPriceCents, quantity) {
    this.unitPriceCents = unitPriceCents;
    this.quantity = quantity;
  }

  get totalCents() {
    return this.unitPriceCents * this.quantity;
  }

  set quantity(value) {
    if (!Number.isInteger(value) || value < 1) {
      throw new RangeError("Quantity must be a positive integer");
    }

    this._quantity = value;
  }

  get quantity() {
    return this._quantity;
  }
}

const line = new CartLine(5, 5);
console.log(line.totalCents);

line.quantity = 3;
console.log(line.quantity);

try {
  line.quantity = 0;
} catch (error) {
  console.log(error.constructor.name);
}
```

`computedMethodName.js`
```js
// Goal:
// Define a class method with a computed symbol key.

// Expected output:
// p1
// p2

class ProductCollection {
  constructor(products) {
    this.products = products;
  }

  *[Symbol.iterator]() {
    for (const product of this.products) {
      yield product.id;
    }
  }
}

const collection = new ProductCollection([{ id: "p1" }, { id: "p2" }]);

for (const id of collection) {
  console.log(id);
}
```


`accessorValidationMistake.js`

```js
// Goal:
// Verify that a setter can reject invalid assignment.

// Expected output:
// RangeError
// false

class CartLine {
  set quantity(value) {
    if (!Number.isInteger(value) || value < 1) {
      throw new RangeError("Quantity must be a positive integer");
    }

    this._quantity = value;
  }

  get quantity() {
    return this._quantity;
  }
}

const line = new CartLine();

try {
  line.quantity = -1;
} catch (error) {
  console.log(error.constructor.name);
}

console.log(Object.hasOwn(line, "quantity"));
```

### 运行方式

```bash
node 08-accessors-computed-methods/getterSetterDemo.js
node 08-accessors-computed-methods/computedMethodName.js
```

### 预期输出

```txt
25
3
RangeError

p1
p2
```

### 执行过程

```txt
1. constructor 中写 this.quantity = quantity 不是直接创建普通属性，而是调用 setter。
2. setter 验证 value 合法后，把真实数据存到 _quantity。
3. line.totalCents 看起来像读属性，实际上调用 get totalCents()。
4. [Symbol.iterator] 使用符号作为方法名，使实例可以被 for...of 消费。
```

### 和实际项目的关系

getter 常用于计算属性，setter 常用于保护对象状态。`Symbol.iterator` 这种协议方法会在后面的迭代器与生成器章节继续深入。

### 常见错误

```txt
错误：getter 是普通方法，调用时要写 cart.totalCents()。
正确：getter 使用属性访问语法 cart.totalCents。
```

### 最终记忆模型

```txt
Accessors make property syntax execute methods.
```

---

## 09：公有字段和私有字段

### 结论

公有字段（public field）是实例自有属性。私有字段（private field）使用 `#` 声明，是硬私有成员，不是普通对象属性。

### 技术意义

私有字段可以防止外部代码绕过类的方法直接修改内部状态。它不是 `_name` 这种命名约定，而是语言级访问限制。

### 底层机制

```txt
public field:
  created on each instance
  accessible as object.field

private field:
  declared in class body
  accessible only inside that class body
  not accessible through object["#field"]
```

### API / 语法规范

```txt
fieldName = initialValue;
#privateFieldName = initialValue;
#privateMethodName() { ... }
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
#name:
  Private name.
  Must be declared before use.
  Only accessible inside the declaring class body.

#name in object:
  Brand check syntax.
  Returns true if object has that private field brand.
```

### 文件结构

```txt
09-public-private-fields/
  publicFieldDemo.js
  privateFieldDemo.js
  privateBrandCheck.js
```

`privateFieldDemo.js`
```js
// Goal:
// Verify that private fields are not normal properties.

// Expected output:
// 500
// undefined
// SyntaxError

class BankAccount {
  #balanceCents = 0;

  deposit(cents) {
    if (!Number.isInteger(cents) || cents <= 0) {
      throw new RangeError("Deposit must be positive cents");
    }

    this.#balanceCents += cents;
  }

  get balanceCents() {
    return this.#balanceCents;
  }
}

const account = new BankAccount();
account.deposit(500);

console.log(account.balanceCents);
console.log(account["#balanceCents"]);

try {
  eval("account.#balanceCents");
} catch (error) {
  console.log(error.constructor.name);
}
```

`privateBrandCheck.js`
```js
// Goal:
// Use private field brand checking.

// Expected output:
// true
// false

class SessionToken {
  #value;

  constructor(value) {
    this.#value = value;
  }

  static isSessionToken(value) {
    return #value in value;
  }
}

const token = new SessionToken("abc");
const fakeToken = { value: "abc" };

console.log(SessionToken.isSessionToken(token));
console.log(SessionToken.isSessionToken(fakeToken));
```


`publicFieldDemo.js`

```js
// Goal:
// Verify that public fields are own properties created per instance.

// Expected output:
// draft
// true
// false

class ProductDraft {
  status = "draft";
  tags = [];

  constructor(title) {
    this.title = title;
  }
}

const firstDraft = new ProductDraft("Keyboard");
const secondDraft = new ProductDraft("Mouse");

firstDraft.tags.push("sale");

console.log(firstDraft.status);
console.log(Object.hasOwn(firstDraft, "status"));
console.log(firstDraft.tags === secondDraft.tags);
```

### 运行方式

```bash
node 09-public-private-fields/privateFieldDemo.js
node 09-public-private-fields/privateBrandCheck.js
```

### 预期输出

```txt
500
undefined
SyntaxError

true
false
```

### 执行过程

```txt
1. #balanceCents 在类体中声明。
2. deposit 方法可以访问 this.#balanceCents，因为它在同一个类体内。
3. account.balanceCents 调用 getter，返回私有字段值。
4. account["#balanceCents"] 查找的是普通字符串属性，不是私有字段。
5. eval("account.#balanceCents") 解析私有字段访问语法，但外部作用域无权访问，所以抛出 SyntaxError。
6. #value in value 是私有品牌检查，只能写在声明该私有字段的类体中。
```

### 和实际项目的关系

SDK、状态管理器、缓存对象和领域模型可以用私有字段保护内部不变量（invariant）。但过度使用私有字段也会降低测试和调试灵活性。

### 常见错误

```txt
错误：#field 只是一个特殊命名的普通属性。
正确：#field 是私有字段，不在普通属性命名空间里。
```

### 最终记忆模型

```txt
Private fields are language-level private slots, not string-keyed properties.
```

---

## 10：extends 和 super

### 结论

`extends` 创建子类，`super()` 调用父类构造函数，`super.method()` 调用父类原型上的方法。派生类构造函数必须先调用 `super()`，才能访问 `this`。

### 技术意义

这解释了为什么子类既能复用父类初始化逻辑，又能添加自己的状态和方法。

### 底层机制

```txt
class DigitalProduct extends Product {}

sets:
  Object.getPrototypeOf(DigitalProduct.prototype) === Product.prototype
  Object.getPrototypeOf(DigitalProduct) === Product
```

### API / 语法规范

```txt
class Subclass extends Superclass { ... }
super(arguments)
super.method(arguments)
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
extends Superclass:
  Superclass must be a constructor or null.

super(...arguments):
  Calls the superclass constructor.
  Required before this in derived class constructors.

super.method(...arguments):
  Looks up method on superclass prototype and calls it with current this.
```

### 文件结构

```txt
10-extends-super/
  basicSubclassDemo.js
  superConstructorOrder.js
  superMethodCall.js
```

`basicSubclassDemo.js`
```js
// Goal:
// Create a subclass that extends a base class.

// Expected output:
// Ebook
// application/pdf
// true
// true

class Product {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }

  getLabel() {
    return this.title;
  }
}

class DigitalProduct extends Product {
  constructor(id, title, fileType) {
    super(id, title);
    this.fileType = fileType;
  }

  getFileType() {
    return this.fileType;
  }
}

const ebook = new DigitalProduct("p1", "Ebook", "application/pdf");

console.log(ebook.getLabel());
console.log(ebook.getFileType());
console.log(ebook instanceof DigitalProduct);
console.log(ebook instanceof Product);
```

`superConstructorOrder.js`
```js
// Goal:
// Verify that this cannot be used before super() in a derived constructor.

// Expected output:
// ReferenceError

class Product {
  constructor(title) {
    this.title = title;
  }
}

class DigitalProduct extends Product {
  constructor(title) {
    try {
      this.fileType = "application/pdf";
    } catch (error) {
      console.log(error.constructor.name);
    }

    super(title);
  }
}

new DigitalProduct("Ebook");
```

`superMethodCall.js`
```js
// Goal:
// Call an overridden superclass method with super.method().

// Expected output:
// Ebook [application/pdf]

class Product {
  constructor(title) {
    this.title = title;
  }

  getLabel() {
    return this.title;
  }
}

class DigitalProduct extends Product {
  constructor(title, fileType) {
    super(title);
    this.fileType = fileType;
  }

  getLabel() {
    return `${super.getLabel()} [${this.fileType}]`;
  }
}

const ebook = new DigitalProduct("Ebook", "application/pdf");
console.log(ebook.getLabel());
```

### 运行方式

```bash
node 10-extends-super/basicSubclassDemo.js
node 10-extends-super/superConstructorOrder.js
node 10-extends-super/superMethodCall.js
```

### 预期输出

```txt
Ebook
application/pdf
true
true

ReferenceError

Ebook [application/pdf]
```

### 执行过程

```txt
1. DigitalProduct extends Product 建立继承关系。
2. new DigitalProduct(...) 创建子类实例。
3. 派生类 constructor 先调用 super(id, title)。
4. Product constructor 初始化 id 和 title。
5. super() 返回后，子类 constructor 才能访问 this 并添加 fileType。
6. getLabel 查找时先找到 DigitalProduct.prototype.getLabel。
7. super.getLabel() 从 Product.prototype 取方法，并用当前 this 调用。
```

### 和实际项目的关系

自定义错误类、Node EventEmitter 子类、SDK 基类和领域模型层级都会用到 `extends` / `super`。

### 常见错误

```txt
错误：super.method() 中的 this 指向父类实例。
正确：super.method() 调用父类方法，但 this 仍然是当前子类实例。
```

### 最终记忆模型

```txt
extends links prototypes. super reuses superclass construction or methods.
```

---

## 11：子类原型链

### 结论

子类继承不是只把父类方法复制过来，而是建立原型链。实例侧原型链负责实例方法继承，构造器侧原型链负责静态成员继承。

### 技术意义

这能解释为什么子类实例能调用父类实例方法，也能解释为什么子类构造器能访问父类静态方法。

### 底层机制

```txt
Object.getPrototypeOf(DigitalProduct.prototype) === Product.prototype
Object.getPrototypeOf(DigitalProduct) === Product
```

### API / 语法规范

```txt
Object.getPrototypeOf(object)
Object.setPrototypeOf(object, prototype)
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
Object.getPrototypeOf(object)
return:
  The object's [[Prototype]].

Object.setPrototypeOf(object, prototype)
warning:
  Can hurt performance; do not use casually in application code.
```

### 文件结构

```txt
11-subclass-prototype-chain/
  inheritanceChainInspection.js
  staticInheritanceDemo.js
  methodOverrideDemo.js
```

`inheritanceChainInspection.js`
```js
// Goal:
// Inspect both prototype chains created by extends.

// Expected output:
// true
// true
// true
// true

class Product {}
class DigitalProduct extends Product {}

const ebook = new DigitalProduct();

console.log(Object.getPrototypeOf(ebook) === DigitalProduct.prototype);
console.log(Object.getPrototypeOf(DigitalProduct.prototype) === Product.prototype);
console.log(Object.getPrototypeOf(DigitalProduct) === Product);
console.log(ebook instanceof Product);
```

`staticInheritanceDemo.js`
```js
// Goal:
// Verify that subclasses inherit static methods through constructor-side chain.

// Expected output:
// DigitalProduct
// true

class Product {
  static getTypeName() {
    return this.name;
  }
}

class DigitalProduct extends Product {}

console.log(DigitalProduct.getTypeName());
console.log(Object.getPrototypeOf(DigitalProduct) === Product);
```


`methodOverrideDemo.js`

```js
// Goal:
// Override a superclass method in a subclass.

// Expected output:
// Product: Keyboard
// Digital: Ebook
// true

class Product {
  constructor(title) {
    this.title = title;
  }

  getLabel() {
    return `Product: ${this.title}`;
  }
}

class DigitalProduct extends Product {
  getLabel() {
    return `Digital: ${this.title}`;
  }
}

const keyboard = new Product("Keyboard");
const ebook = new DigitalProduct("Ebook");

console.log(keyboard.getLabel());
console.log(ebook.getLabel());
console.log(Object.getPrototypeOf(DigitalProduct.prototype) === Product.prototype);
```

### 运行方式

```bash
node 11-subclass-prototype-chain/inheritanceChainInspection.js
node 11-subclass-prototype-chain/staticInheritanceDemo.js
```

### 预期输出

```txt
true
true
true
true

DigitalProduct
true
```

### 执行过程

```txt
1. ebook 的直接原型是 DigitalProduct.prototype。
2. DigitalProduct.prototype 的原型是 Product.prototype。
3. DigitalProduct 构造器对象的原型是 Product 构造器对象。
4. 因为 Product.prototype 在 ebook 的原型链上，所以 ebook instanceof Product 是 true。
5. DigitalProduct.getTypeName 沿构造器侧原型链找到 Product.getTypeName。
6. 静态方法中的 this 是调用者 DigitalProduct，因此 this.name 是 "DigitalProduct"。
```

### 和实际项目的关系

调试继承问题时，不要只看类声明，要直接看 `Object.getPrototypeOf()`。这会让你清楚到底是哪条链在工作。

### 常见错误

```txt
错误：extends 会把父类方法复制到子类。
正确：extends 建立原型链，方法通过查找得到。
```

### 最终记忆模型

```txt
Subclassing is prototype linking, not method copying.
```

---

## 12：内置类子类和自定义 Error

### 结论

JavaScript 可以继承内置类。实际项目最常见、最有价值的是自定义 `Error` 子类。

### 技术意义

自定义错误类可以让错误处理逻辑通过 `instanceof` 区分错误类型，并携带额外上下文。

### 底层机制

```txt
class ValidationError extends Error
  -> instances inherit Error behavior
  -> custom properties store domain-specific information
```

### API / 语法规范

```txt
class CustomError extends Error {
  constructor(message, extra) {
    super(message);
    this.name = "CustomError";
    this.extra = extra;
  }
}
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
Error(message, options)
message:
  Human-readable error message.
options.cause:
  Optional underlying cause.

error.name:
  Error class name label.
error.message:
  Message string.
error.stack:
  Stack trace in common JS environments.
error.cause:
  Underlying cause if provided.
```

### 文件结构

```txt
12-built-in-and-error-subclasses/
  customErrorSubclass.js
  arraySubclassDemo.js
  errorNameMistake.js
```

`customErrorSubclass.js`
```js
// Goal:
// Create a custom Error subclass with extra context.

// Expected output:
// ValidationError
// INVALID_PRICE
// true

class ValidationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "ValidationError";
    this.code = code;
  }
}

function validatePrice(priceCents) {
  if (!Number.isInteger(priceCents) || priceCents < 0) {
    throw new ValidationError("Price must be non-negative cents", "INVALID_PRICE");
  }
}

try {
  validatePrice(-1);
} catch (error) {
  console.log(error.name);
  console.log(error.code);
  console.log(error instanceof ValidationError);
}
```

`arraySubclassDemo.js`
```js
// Goal:
// Extend Array and add a domain-specific method.

// Expected output:
// 3
// true
// 600

class CartLineList extends Array {
  totalCents() {
    return this.reduce((sum, line) => sum + line.priceCents * line.quantity, 0);
  }
}

const lines = new CartLineList(
  { priceCents: 100, quantity: 2 },
  { priceCents: 200, quantity: 2 },
);

console.log(lines.length);
console.log(lines instanceof Array);
console.log(lines.totalCents());
```

`errorNameMistake.js`
```js
// Goal:
// Show why setting error.name is useful for custom errors.

// Expected output:
// Error
// PaymentError

class PaymentErrorWithoutName extends Error {}

class PaymentError extends Error {
  constructor(message) {
    super(message);
    this.name = "PaymentError";
  }
}

console.log(new PaymentErrorWithoutName("Failed").name);
console.log(new PaymentError("Failed").name);
```

### 运行方式

```bash
node 12-built-in-and-error-subclasses/customErrorSubclass.js
node 12-built-in-and-error-subclasses/arraySubclassDemo.js
node 12-built-in-and-error-subclasses/errorNameMistake.js
```

### 预期输出

```txt
ValidationError
INVALID_PRICE
true

3
true
600

Error
PaymentError
```

### 执行过程

```txt
1. ValidationError extends Error 继承 Error 的 message、stack 等行为。
2. super(message) 初始化 Error 内部状态。
3. this.name 和 this.code 添加自定义错误信息。
4. catch 中可以通过 instanceof ValidationError 分支处理。
5. Array 子类可以继承数组行为，但实际项目中要谨慎，因为内置类子类化可能引入复杂边界。
```

### 和实际项目的关系

Node 后端、前端表单验证、API client、数据解析层都适合用自定义错误类表达失败原因。

### 常见错误

```txt
错误：自定义 Error 子类不需要调用 super(message)。
正确：派生类 constructor 必须先调用 super()，Error 子类也一样。
```

### 最终记忆模型

```txt
Custom Error subclasses give runtime errors domain identity.
```

---

## 13：为已有类添加方法

### 结论

JavaScript 允许向已有类的原型添加方法，但修改内置原型风险很高。优先写工具函数或包装类。

### 技术意义

你需要能读懂老代码里的 prototype 扩展，同时知道为什么现代项目一般不随意扩展内置对象。

### 底层机制

```txt
Constructor.prototype.newMethod = function () {}

All existing and future instances that inherit from Constructor.prototype can see newMethod.
```

### API / 语法规范

```txt
Constructor.prototype.methodName = function (...) { ... };
Object.defineProperty(Constructor.prototype, key, descriptor)
```

### 固定属性名 / 固定方法名 / 参数签名

```txt
Object.defineProperty(Constructor.prototype, key, descriptor)
recommended descriptor for prototype method:
  enumerable: false
  writable: true
  configurable: true
```

### 文件结构

```txt
13-extending-existing-classes/
  addMethodToOwnClass.js
  builtInPrototypeRisk.js
  safeUtilityInstead.js
```

`addMethodToOwnClass.js`
```js
// Goal:
// Add a method to an existing custom class prototype.

// Expected output:
// Keyboard: 9900

class Product {
  constructor(title, priceCents) {
    this.title = title;
    this.priceCents = priceCents;
  }
}

Object.defineProperty(Product.prototype, "getLabel", {
  value() {
    return `${this.title}: ${this.priceCents}`;
  },
  enumerable: false,
  writable: true,
  configurable: true,
});

const keyboard = new Product("Keyboard", 9900);
console.log(keyboard.getLabel());
```

`builtInPrototypeRisk.js`
```js
// Goal:
// Demonstrate why changing built-in prototypes can affect all arrays.

// Expected output:
// function
// Keyboard

if (!Array.prototype.firstItem) {
  Object.defineProperty(Array.prototype, "firstItem", {
    value() {
      return this[0];
    },
    enumerable: false,
    writable: true,
    configurable: true,
  });
}

const products = ["Keyboard", "Mouse"];

console.log(typeof [].firstItem);
console.log(products.firstItem());
```

`safeUtilityInstead.js`
```js
// Goal:
// Prefer a utility function instead of modifying Array.prototype.

// Expected output:
// Keyboard
// undefined

function firstItem(items) {
  return items[0];
}

console.log(firstItem(["Keyboard", "Mouse"]));
console.log(firstItem([]));
```

### 运行方式

```bash
node 13-extending-existing-classes/addMethodToOwnClass.js
node 13-extending-existing-classes/builtInPrototypeRisk.js
node 13-extending-existing-classes/safeUtilityInstead.js
```

### 预期输出

```txt
Keyboard: 9900

function
Keyboard

Keyboard
undefined
```

### 执行过程

```txt
1. Product.prototype 被添加 getLabel。
2. 所有继承 Product.prototype 的实例都能访问 getLabel。
3. 修改 Array.prototype 会影响当前运行环境中的所有数组。
4. 工具函数 firstItem 不污染全局内置原型，行为更可控。
```

### 和实际项目的关系

框架和库代码可能会扩展原型，但业务项目里随意修改内置原型会造成命名冲突、枚举污染和调试困难。

### 常见错误

```txt
错误：给 Array.prototype 加方法只是影响当前数组。
正确：它影响所有数组实例。
```

### 最终记忆模型

```txt
Prototype extension changes behavior for all objects inheriting that prototype.
```

---

## 14：类设计边界

### 结论

不是所有对象模型都应该用类。类适合有稳定实例状态、共享行为、不变量和清晰构造过程的场景。普通对象、工厂函数和组合（composition）经常更简单。

### 技术意义

你后面做项目时需要判断：这个东西是一个“有行为的领域对象”，还是只是一个普通数据结构。

### 底层机制

```txt
Use class when:
  instances share behavior
  constructor enforces invariants
  methods operate on internal state
  subclassing or instanceof has real value

Use plain object when:
  data is just transferred or rendered
  no behavior is needed
  JSON serialization is the main purpose
```

### API / 语法规范

```txt
class DomainModel { ... }
function createDomainModel(...) { ... }
const plainRecord = { ... };
```

### 固定属性名 / 固定方法名 / 参数签名

这一节没有新的固定 API，重点是设计判断。

### 文件结构

```txt
14-class-design-boundaries/
  classVsFactoryFunction.js
  privateStateTradeoff.js
  compositionOverInheritance.js
```

`classVsFactoryFunction.js`
```js
// Goal:
// Compare a class with a factory function for the same behavior.

// Expected output:
// Keyboard: 9900
// Mouse: 2500
// true

class ProductClass {
  constructor(title, priceCents) {
    this.title = title;
    this.priceCents = priceCents;
  }

  getLabel() {
    return `${this.title}: ${this.priceCents}`;
  }
}

function createProductRecord(title, priceCents) {
  return {
    title,
    priceCents,
    getLabel() {
      return `${this.title}: ${this.priceCents}`;
    },
  };
}

const keyboard = new ProductClass("Keyboard", 9900);
const mouse = createProductRecord("Mouse", 2500);

console.log(keyboard.getLabel());
console.log(mouse.getLabel());
console.log(keyboard instanceof ProductClass);
```

`compositionOverInheritance.js`
```js
// Goal:
// Prefer composition when behavior can be injected instead of inherited.

// Expected output:
// Keyboard: $99.00

class PriceFormatter {
  format(cents) {
    return `$${(cents / 100).toFixed(2)}`;
  }
}

class ProductPresenter {
  constructor(formatter) {
    this.formatter = formatter;
  }

  present(product) {
    return `${product.title}: ${this.formatter.format(product.priceCents)}`;
  }
}

const presenter = new ProductPresenter(new PriceFormatter());
console.log(presenter.present({ title: "Keyboard", priceCents: 9900 }));
```


`privateStateTradeoff.js`

```js
// Goal:
// Compare private state with ordinary public properties.

// Expected output:
// 1
// 0
// undefined

class Counter {
  #count = 0;

  increment() {
    this.#count += 1;
    return this.#count;
  }

  get count() {
    return this.#count;
  }
}

const counter = new Counter();

console.log(counter.increment());
console.log(Object.keys(counter).length);
console.log(counter["#count"]);
```

### 运行方式

```bash
node 14-class-design-boundaries/classVsFactoryFunction.js
node 14-class-design-boundaries/compositionOverInheritance.js
```

### 预期输出

```txt
Keyboard: 9900
Mouse: 2500
true

Keyboard: $99.00
```

### 执行过程

```txt
1. ProductClass 把方法放在原型上。
2. createProductRecord 每次创建对象时都创建一个 getLabel 函数。
3. 类有 instanceof 身份判断，普通对象没有这种构造器身份。
4. ProductPresenter 没有继承 PriceFormatter，而是接收 formatter 对象并调用它。
5. 组合降低了继承层级复杂度。
```

### 和实际项目的关系

React props、API response、数据库记录通常更适合普通对象；错误、解析器、SDK client、状态机、复杂领域对象可以考虑类。

### 常见错误

```txt
错误：只要有数据和方法就必须用 class。
正确：class 是一种组织状态和共享行为的工具，不是默认答案。
```

### 最终记忆模型

```txt
Use class for behavior-rich identity objects; use plain objects for data records.
```

---

## 8. 本章 API / 语法完整索引

### class 声明

```txt
class ClassName {
  constructor(parameters) {}
  methodName(parameters) {}
}
```

| 项 | 说明 |
|---|---|
| 所属机制 | 类语法（class syntax） |
| 创建结果 | 构造函数对象 + prototype 方法 |
| 是否可普通调用 | 不可以，必须用 `new` |
| 方法位置 | `ClassName.prototype` |
| 方法可枚举性 | class 方法默认不可枚举 |
| 运行模式 | 类体内部严格模式 |

### class 表达式

```txt
const ClassName = class OptionalInternalName { ... };
```

| 项 | 说明 |
|---|---|
| 所属机制 | 表达式产生类值 |
| 返回值 | 构造函数对象 |
| 常见用途 | 赋值、传参、默认导出、动态类创建 |

### constructor

```txt
constructor(...arguments) { ... }
```

| 项 | 说明 |
|---|---|
| 所属对象 | 类体中的特殊方法 |
| 作用 | 初始化实例状态 |
| 是否在 prototype 上叫 constructor | 类声明会创建实际构造函数，不是普通实例方法 |
| 派生类规则 | 访问 `this` 前必须调用 `super()` |

### `new`

```txt
new Constructor(...arguments)
```

| 项 | 说明 |
|---|---|
| 作用 | 创建实例、连接原型、绑定 `this`、执行构造函数 |
| 返回值 | 新实例，除非构造函数显式返回对象 |
| 常见错误 | 忘记 `new` 调用旧式构造函数 |

### `new.target`

```txt
new.target
```

| 项 | 说明 |
|---|---|
| 所属位置 | 函数或构造函数内部 |
| `new` 调用时 | 指向构造目标 |
| 普通调用时 | `undefined` |
| class 构造器 | class 不能普通调用，但仍可读取 `new.target` |

### `prototype`

```txt
Constructor.prototype
```

| 项 | 说明 |
|---|---|
| 所属对象 | 普通函数对象 / class 构造函数对象 |
| 作用 | `new` 创建实例时用作实例的 `[[Prototype]]` |
| 常见误解 | 不是所有对象都有 `prototype` 属性 |

### `Object.getPrototypeOf()`

```txt
Object.getPrototypeOf(object)
```

| 项 | 说明 |
|---|---|
| 参数 | `object`，要读取原型的对象 |
| 返回值 | 对象的内部原型链接指向的对象，或 `null` |
| 是否修改对象 | 否 |

### `Object.create()`

```txt
Object.create(proto)
Object.create(proto, propertiesObject)
```

| 项 | 说明 |
|---|---|
| 参数 `proto` | 新对象的原型 |
| 返回值 | 新对象 |
| 是否调用构造函数 | 否 |

### `instanceof`

```txt
object instanceof Constructor
```

| 项 | 说明 |
|---|---|
| 左操作数 | 要检查的对象 |
| 右操作数 | 构造函数 |
| 判断机制 | 检查 `Constructor.prototype` 是否在对象原型链上 |
| 返回值 | boolean |

### `isPrototypeOf()`

```txt
prototypeObject.isPrototypeOf(object)
```

| 项 | 说明 |
|---|---|
| 所属对象 | 任意可作为原型的对象 |
| 参数 | 被检查对象 |
| 返回值 | 如果 `prototypeObject` 在参数对象原型链中，返回 true |

### `extends`

```txt
class Subclass extends Superclass { ... }
```

| 项 | 说明 |
|---|---|
| 作用 | 创建子类继承关系 |
| 实例侧链 | `Subclass.prototype -> Superclass.prototype` |
| 构造器侧链 | `Subclass -> Superclass` |
| 常见错误 | 以为复制父类方法 |

### `super()`

```txt
super(...arguments)
```

| 项 | 说明 |
|---|---|
| 所属位置 | 派生类 constructor 内部 |
| 作用 | 调用父类构造函数 |
| 规则 | 访问 `this` 之前必须调用 |

### `super.method()`

```txt
super.methodName(...arguments)
```

| 项 | 说明 |
|---|---|
| 所属位置 | class 方法内部 |
| 作用 | 从父类原型或父类构造器上查找方法 |
| `this` | 仍然是当前调用的子类实例或子类构造器 |

### `static`

```txt
static methodName(parameters) { ... }
static fieldName = value;
```

| 项 | 说明 |
|---|---|
| 位置 | 类本身，即构造函数对象 |
| 是否在实例上 | 否 |
| 常见用途 | 工厂方法、缓存、工具方法、类级配置 |

### getter / setter

```txt
get propertyName() { ... }
set propertyName(value) { ... }
```

| 项 | getter | setter |
|---|---|---|
| 调用语法 | `object.property` | `object.property = value` |
| 参数 | 0 个 | 1 个 |
| 返回值 | 属性读取结果 | 返回值被忽略 |
| 常见用途 | 派生值 | 验证和规范化赋值 |

### 私有字段

```txt
#fieldName = value;
#methodName() { ... }
#fieldName in object
```

| 项 | 说明 |
|---|---|
| 可见范围 | 声明它的类体内部 |
| 是否普通属性 | 否 |
| 外部访问 | 语法错误 |
| 字符串访问 | `object["#field"]` 不等于访问私有字段 |

---

## 9. 本章常见错误总表

| 错误 | 错误原因 | 正确模型 |
|---|---|---|
| 把 `class` 当成 Java 式类模板 | JavaScript 运行时仍然是对象和原型链 | `class` 是创建构造函数和原型方法的语法层 |
| 以为方法复制到每个实例 | class 方法默认在原型上 | 实例共享 `Constructor.prototype.method` |
| 忘记 `new` 调用构造函数 | 普通函数调用不会自动创建实例 | 构造函数要用 `new`；class 不允许普通调用 |
| 以为 `instanceof` 查 `constructor` | `constructor` 只是继承属性 | `instanceof` 查原型链 |
| 重写 `prototype` 后丢失 `constructor` | 新对象没有默认 `constructor` 属性 | 用 `Object.defineProperty` 补回不可枚举 constructor |
| 提取方法后 `this` 丢失 | 函数值不携带接收者 | 用 `object.method()`、`bind()` 或实例字段箭头函数 |
| 通过实例调用静态方法 | 静态方法在构造器对象上 | 用 `ClassName.staticMethod()` |
| 在子类 constructor 里先用 `this` | 派生类必须先初始化父类部分 | 先 `super(...)`，再访问 `this` |
| 以为 `super.method()` 的 `this` 是父类实例 | `super` 只改变查找起点 | `this` 仍然是当前实例 |
| 以为 `#field` 是普通属性 | 私有字段不在普通属性系统中 | 只能在类体内部用 `this.#field` |
| 随意修改内置原型 | 会影响所有实例和第三方代码 | 优先写工具函数或包装类 |
| 过度使用继承 | 继承层级会增加耦合 | 能组合就优先组合 |

---

## 10. 最终小项目：Shopping Cart Domain Model

### 结论

最终小项目用类建模一个购物车领域模型，训练第 9 章的核心机制：构造函数、实例状态、原型方法、静态工厂、getter、私有字段、继承、`super`、自定义错误和 `toJSON()`。

### 项目目标

实现这些文件：

```txt
15-mini-project-shopping-cart-domain-model/
  productModel.js
  cartModel.js
  discountPolicy.js
  shoppingCartDemo.js
  shoppingCartMistakes.js
  shoppingCartQuantityMistake.js
  shoppingCartChecklist.md
```

`productModel.js`
```js
// Goal:
// Define product classes with shared behavior and subclass-specific behavior.

class Product {
  constructor(id, title, priceCents) {
    if (!Number.isInteger(priceCents) || priceCents < 0) {
      throw new RangeError("priceCents must be non-negative cents");
    }

    this.id = id;
    this.title = title;
    this.priceCents = priceCents;
  }

  get label() {
    return `${this.title}: ${this.priceCents}`;
  }

  toJSON() {
    return {
      type: "physical",
      id: this.id,
      title: this.title,
      priceCents: this.priceCents,
    };
  }
}

class DigitalProduct extends Product {
  constructor(id, title, priceCents, fileType) {
    super(id, title, priceCents);
    this.fileType = fileType;
  }

  get label() {
    return `${super.label} [${this.fileType}]`;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      type: "digital",
      fileType: this.fileType,
    };
  }
}

module.exports = {
  Product,
  DigitalProduct,
};
```

`discountPolicy.js`
```js
// Goal:
// Define discount policy classes.

class DiscountPolicy {
  apply(subtotalCents) {
    return subtotalCents;
  }
}

class PercentageDiscountPolicy extends DiscountPolicy {
  constructor(percent) {
    super();

    if (percent < 0 || percent > 100) {
      throw new RangeError("percent must be between 0 and 100");
    }

    this.percent = percent;
  }

  apply(subtotalCents) {
    return Math.round(subtotalCents * (1 - this.percent / 100));
  }
}

module.exports = {
  DiscountPolicy,
  PercentageDiscountPolicy,
};
```

`cartModel.js`
```js
// Goal:
// Define a shopping cart class with private state.

const { Product, DigitalProduct } = require("./productModel");
const { DiscountPolicy } = require("./discountPolicy");

class CartError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "CartError";
    this.code = code;
  }
}

class ShoppingCart {
  #lines = [];
  #discountPolicy;

  constructor(discountPolicy = new DiscountPolicy()) {
    this.#discountPolicy = discountPolicy;
  }

  static fromRecords(records, discountPolicy) {
    const cart = new ShoppingCart(discountPolicy);

    for (const record of records) {
      const product = record.type === "digital"
        ? new DigitalProduct(record.id, record.title, record.priceCents, record.fileType)
        : new Product(record.id, record.title, record.priceCents);

      cart.addProduct(product, record.quantity);
    }

    return cart;
  }

  addProduct(product, quantity = 1) {
    if (!(product instanceof Product)) {
      throw new CartError("Expected a Product instance", "INVALID_PRODUCT");
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new CartError("Quantity must be a positive integer", "INVALID_QUANTITY");
    }

    this.#lines.push({ product, quantity });
  }

  get subtotalCents() {
    return this.#lines.reduce(
      (sum, line) => sum + line.product.priceCents * line.quantity,
      0,
    );
  }

  get totalCents() {
    return this.#discountPolicy.apply(this.subtotalCents);
  }

  get size() {
    return this.#lines.length;
  }

  toJSON() {
    return {
      subtotalCents: this.subtotalCents,
      totalCents: this.totalCents,
      lines: this.#lines.map((line) => ({
        product: line.product.toJSON(),
        quantity: line.quantity,
      })),
    };
  }
}

module.exports = {
  ShoppingCart,
  CartError,
};
```

`shoppingCartDemo.js`
```js
// Goal:
// Run the shopping cart domain model.

// Expected output:
// 2
// 12400
// 11160
// Ebook: 2500 [application/pdf]
// true

const { DigitalProduct, Product } = require("./productModel");
const { PercentageDiscountPolicy } = require("./discountPolicy");
const { ShoppingCart } = require("./cartModel");

const cart = new ShoppingCart(new PercentageDiscountPolicy(10));
const keyboard = new Product("p1", "Keyboard", 9900);
const ebook = new DigitalProduct("p2", "Ebook", 2500, "application/pdf");

cart.addProduct(keyboard, 1);
cart.addProduct(ebook, 1);

console.log(cart.size);
console.log(cart.subtotalCents);
console.log(cart.totalCents);
console.log(ebook.label);
console.log(JSON.stringify(cart).includes("digital"));
```

`shoppingCartMistakes.js`

```js
// Goal:
// Verify expected domain errors.

// Expected output:
// CartError
// INVALID_QUANTITY
// CartError
// INVALID_PRODUCT

const { Product } = require("./productModel");
const { ShoppingCart } = require("./cartModel");

const cart = new ShoppingCart();
const keyboard = new Product("p1", "Keyboard", 9900);

try {
  cart.addProduct(keyboard, 0);
} catch (error) {
  console.log(error.name);
  console.log(error.code);
}

try {
  cart.addProduct({ id: "fake", title: "Fake", priceCents: 100 }, 1);
} catch (error) {
  console.log(error.name);
  console.log(error.code);
}
```

### 注意一个细节

修订说明：`shoppingCartMistakes.js` 已经直接覆盖 `INVALID_QUANTITY` 和 `INVALID_PRODUCT` 两个错误分支；下面仍保留独立文件 `shoppingCartQuantityMistake.js`，用于单独观察数量错误。

`shoppingCartMistakes.js` 第二个错误仍然会先命中 `INVALID_PRODUCT`，因为 `addProduct()` 先检查 product，再检查 quantity。你可以修改调用，传入真实 `Product` 后再传 `0`，观察错误变成 `INVALID_QUANTITY`。

`shoppingCartQuantityMistake.js`

```js
// Goal:
// Verify invalid quantity after passing a valid product.

// Expected output:
// CartError
// INVALID_QUANTITY

const { Product } = require("./productModel");
const { ShoppingCart } = require("./cartModel");

const cart = new ShoppingCart();
const keyboard = new Product("p1", "Keyboard", 9900);

try {
  cart.addProduct(keyboard, 0);
} catch (error) {
  console.log(error.name);
  console.log(error.code);
}
```

### 运行方式

```bash
node 15-mini-project-shopping-cart-domain-model/shoppingCartDemo.js
node 15-mini-project-shopping-cart-domain-model/shoppingCartMistakes.js
node 15-mini-project-shopping-cart-domain-model/shoppingCartQuantityMistake.js
```

### 小项目必须解释的问题

```txt
1. Product 和 DigitalProduct 的实例状态分别在哪里？
2. Product.prototype 上有哪些方法或访问器？
3. DigitalProduct.prototype 如何连接到 Product.prototype？
4. super.label 为什么能复用父类 getter？
5. ShoppingCart 的 #lines 为什么不能从外部访问？
6. subtotalCents 和 totalCents 为什么适合用 getter？
7. ShoppingCart.fromRecords 为什么适合做 static method？
8. CartError 为什么要继承 Error？
9. JSON.stringify(cart) 为什么会调用 toJSON()？
10. 这个模型里哪些地方用继承，哪些地方用组合？
```

---

## 11. 额外 cheatsheet

本章 cheatsheet 单独放在：

```txt
javascript/chapter-09-classes/javascript-chapter-09-classes-cheatsheet-zh-v1.md
```

cheatsheet 应该只用于复习，不替代本指导文件。它必须包含：

```txt
1. class 语法和原型机制对照表
2. new 的四步机制
3. instance / prototype / constructor 关系图
4. instance method vs static method
5. public field vs private field
6. extends / super 规则
7. instanceof 判断模型
8. 常见错误速查表
9. 什么时候用 class，什么时候不用 class
```

---

## 12. 最终文件清单

```txt
javascript/chapter-09-classes/
  javascript-chapter-09-classes-learning-guide-zh-v1.md
  javascript-chapter-09-classes-cheatsheet-zh-v1.md

  00-class-runtime-model/
    prototypeClassFactory.js
    constructorPrototypeLink.js
    classSyntaxIsPrototypeSyntax.js

  01-class-and-prototype/
    objectCreateClass.js
    sharedPrototypeMethod.js
    ownStateVsSharedMethod.js

  02-constructor-and-new/
    constructorFunctionDemo.js
    newTargetGuard.js
    classCannotBeCalled.js

  03-constructor-property-instanceof/
    constructorPropertyDemo.js
    brokenConstructorProperty.js
    instanceofPrototypeChain.js

  04-class-declaration-expression/
    classDeclarationDemo.js
    classExpressionDemo.js
    classTemporalDeadZone.js

  05-constructor-instance-state/
    instanceStateDemo.js
    defaultConstructorDemo.js
    constructorReturnMistake.js

  06-prototype-methods-this/
    prototypeMethodThis.js
    detachedMethodMistake.js
    arrowMethodTradeoff.js

  07-static-members/
    staticFactoryMethod.js
    staticFieldCache.js
    staticOnInstanceMistake.js

  08-accessors-computed-methods/
    getterSetterDemo.js
    computedMethodName.js
    accessorValidationMistake.js

  09-public-private-fields/
    publicFieldDemo.js
    privateFieldDemo.js
    privateBrandCheck.js

  10-extends-super/
    basicSubclassDemo.js
    superConstructorOrder.js
    superMethodCall.js

  11-subclass-prototype-chain/
    inheritanceChainInspection.js
    staticInheritanceDemo.js
    methodOverrideDemo.js

  12-built-in-and-error-subclasses/
    customErrorSubclass.js
    arraySubclassDemo.js
    errorNameMistake.js

  13-extending-existing-classes/
    addMethodToOwnClass.js
    builtInPrototypeRisk.js
    safeUtilityInstead.js

  14-class-design-boundaries/
    classVsFactoryFunction.js
    privateStateTradeoff.js
    compositionOverInheritance.js

  15-mini-project-shopping-cart-domain-model/
    productModel.js
    cartModel.js
    discountPolicy.js
    shoppingCartDemo.js
    shoppingCartMistakes.js
    shoppingCartQuantityMistake.js
    shoppingCartChecklist.md
```

---

## 13. 最终学习笔记转换要求

完成练习后，把本章整理成正式笔记时，不要按“语法点”平铺。建议按下面结构写：

```txt
1. JavaScript class 的本质
2. 实例、构造函数、原型对象三者关系
3. new 的执行机制
4. class 语法到底帮你生成了什么
5. 方法为什么在 prototype 上
6. this 和方法调用的关系
7. static 成员属于哪里
8. 私有字段为什么不是普通属性
9. extends 创建了哪两条原型链
10. super() 和 super.method() 的区别
11. instanceof 的真实判断机制
12. 为什么不随意修改内置原型
13. 什么时候用 class，什么时候用普通对象或工厂函数
14. 本章小项目复盘
```

每一节都必须包含：

```txt
结论
技术意义
底层机制
代码例子
运行输出
常见错误
项目判断标准
```

---

## 14. 本章最终记忆模型

```txt
JavaScript class is not a Java-style template.

A class is a runtime relationship among:
  constructor function
  prototype object
  instance objects

new does four things:
  create object
  link prototype
  bind this
  run constructor

class syntax does not remove prototypes.
It standardizes and clarifies prototype-based programming.

extends creates two prototype chains:
  instance-side inheritance
  constructor-side inheritance

super() calls the superclass constructor.
super.method() calls a superclass method with current this.

private fields are not normal properties.
static members live on the class constructor.
instance methods live on the prototype.
instance state lives on each object.
```

---

## 15. 官方文档阅读清单

优先读这些 MDN 页面：

- [Using classes - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes)
- [Classes - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Inheritance and the prototype chain - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)
- [class declaration - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class)
- [constructor - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)
- [extends - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)
- [super - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)
- [static - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)
- [Public class fields - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields)
- [Private elements - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements)
- [get - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
- [set - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)

阅读顺序建议：

```txt
Inheritance and prototype chain
  -> Using classes
  -> Classes
  -> constructor
  -> extends
  -> super
  -> static
  -> Public class fields
  -> Private elements
```

---

## 16. 生成前自检清单

这份第 9 章指导文件已经包含：

```txt
[x] 文件定位
[x] 本章学习目标
[x] 本章学习顺序
[x] 本章核心术语表
[x] 本章底层模型
[x] 推荐目录结构
[x] 运行方式
[x] 分节训练内容
[x] API / 语法完整索引
[x] 常见错误总表
[x] 最终小项目
[x] 额外 cheatsheet 说明
[x] 最终文件清单
[x] 最终学习笔记转换要求
[x] 本章最终记忆模型
[x] 官方文档阅读清单
[x] 代码注释不使用中文字符
[x] 目录放在指导文件内部
```
