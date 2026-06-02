# JavaScript 第 9 章“类”cheatsheet v1

> 用途：这是第 9 章的快速复习表，不是学习指导文件。先按 `javascript-chapter-09-classes-learning-guide-zh-v1.md` 做练习，再用本文件复盘。

---

## 1. 一句话结论

```txt
JavaScript class is syntax over constructor functions, prototype objects, and prototype chains.
```

不要把 `class` 学成 Java 式模板。JavaScript 的类仍然是运行时对象关系。

---

## 2. class 表层语法 vs 底层机制

| 表层语法 | 底层机制 |
|---|---|
| `class Product {}` | 创建一个名为 `Product` 的构造函数值 |
| `constructor(...) {}` | `new Product(...)` 时执行的初始化函数 |
| `method() {}` | 添加到 `Product.prototype.method` |
| `static from() {}` | 添加到 `Product.from` |
| `field = value` | 每个实例创建自己的公有字段 |
| `#field = value` | 每个实例创建私有槽位，不是普通属性 |
| `extends Base` | 建立实例侧和构造器侧两条原型链 |
| `super(...)` | 调用父类构造函数 |
| `super.method()` | 从父类原型取方法，用当前 `this` 调用 |

---

## 3. new 的四步机制

```txt
new Product("p1", "Keyboard")

1. Create a new empty object.
2. Set newObject.[[Prototype]] to Product.prototype.
3. Call Product with this bound to newObject.
4. Return newObject unless constructor returns another object.
```

类构造器不能不加 `new` 普通调用。

```js
class Product {}

try {
  Product();
} catch (error) {
  console.log(error.constructor.name);
}
```

---

## 4. 构造函数、原型、实例关系图

```txt
Product -------------- prototype --------------> Product.prototype
  ^                                                  |
  |                                                  | constructor
  |                                                  v
  <--------------------------------------------------

keyboard = new Product()
  own properties:
    id
    title
    priceCents
  [[Prototype]] ---------------------------------> Product.prototype
```

关键判断：

```js
Object.getPrototypeOf(keyboard) === Product.prototype;
keyboard instanceof Product;
Product.prototype.constructor === Product;
```

---

## 5. instance method vs static method

| 项 | 实例方法（instance method） | 静态方法（static method） |
|---|---|---|
| 定义 | `method() {}` | `static method() {}` |
| 位置 | `ClassName.prototype` | `ClassName` 构造函数对象 |
| 调用 | `instance.method()` | `ClassName.method()` |
| 典型用途 | 操作某个实例状态 | 工厂方法、工具方法、缓存、类级配置 |
| 是否能通过实例访问 | 能 | 不能 |

```js
class Money {
  static fromDollars(dollars) {
    return new Money(Math.round(dollars * 100));
  }

  constructor(cents) {
    this.cents = cents;
  }
}

const price = Money.fromDollars(12.99);
console.log(price.cents);
```

---

## 6. this 规则

```txt
object.method()
  this -> object

const method = object.method;
method()
  this -> undefined in class strict mode

object.method.bind(object)
  returns a new function with fixed this
```

错误核心：方法本身不携带 `this`，调用表达式决定 `this`。

---

## 7. public field vs private field

| 项 | public field | private field |
|---|---|---|
| 写法 | `name = value` | `#name = value` |
| 访问 | `object.name` | `this.#name` inside class only |
| 是否普通属性 | 是 | 否 |
| 是否可枚举 | 公有字段是实例属性 | 私有字段不参与普通属性枚举 |
| 外部访问 | 可以 | 语法错误 |
| 字符串访问 | `object["name"]` | `object["#name"]` 只是普通字符串属性 |

```js
class Account {
  #balanceCents = 0;

  deposit(cents) {
    this.#balanceCents += cents;
  }

  get balanceCents() {
    return this.#balanceCents;
  }
}
```

---

## 8. getter / setter

| 访问器 | 调用语法 | 参数 | 返回值 |
|---|---|---|---|
| getter | `object.property` | 0 个 | 属性读取结果 |
| setter | `object.property = value` | 1 个 | 返回值被忽略 |

```js
class CartLine {
  constructor(unitPriceCents, quantity) {
    this.unitPriceCents = unitPriceCents;
    this.quantity = quantity;
  }

  get totalCents() {
    return this.unitPriceCents * this.quantity;
  }
}
```

记住：getter 不是 `line.totalCents()`，而是 `line.totalCents`。

---

## 9. extends 建立两条原型链

```js
class Product {}
class DigitalProduct extends Product {}
```

运行时关系：

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

验证：

```js
Object.getPrototypeOf(DigitalProduct.prototype) === Product.prototype;
Object.getPrototypeOf(DigitalProduct) === Product;
```

---

## 10. super 速查

| 写法 | 位置 | 含义 |
|---|---|---|
| `super(...)` | 子类 constructor | 调用父类构造函数 |
| `super.method(...)` | 子类方法 | 调用父类原型上的方法 |
| `super.staticMethod(...)` | 子类静态方法 | 调用父类构造器上的静态方法 |

关键规则：

```txt
In a derived constructor, call super() before using this.
```

`super.method()` 中的 `this` 仍然是当前子类实例。

---

## 11. instanceof 判断模型

```txt
object instanceof Constructor
```

真实判断：

```txt
Is Constructor.prototype anywhere in object.[[Prototype]] chain?
```

不是判断：

```txt
object.constructor === Constructor
```

所以重写 `prototype` 后丢失 `constructor`，不一定影响 `instanceof`。

---

## 12. 自定义 Error 类模板

```js
class ValidationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "ValidationError";
    this.code = code;
  }
}
```

用途：

```txt
1. Preserve Error behavior.
2. Add domain identity.
3. Support instanceof checks.
4. Carry structured context such as code.
```

---

## 13. 修改原型的风险

可以做：

```js
Product.prototype.getLabel = function getLabel() {
  return this.title;
};
```

谨慎做：

```js
Array.prototype.firstItem = function firstItem() {
  return this[0];
};
```

原因：

```txt
Changing a built-in prototype affects every object inheriting that prototype.
```

优先写工具函数：

```js
function firstItem(items) {
  return items[0];
}
```

---

## 14. 什么时候用 class

适合用 class：

```txt
1. There is stable instance state.
2. Multiple instances share behavior.
3. Constructor should enforce invariants.
4. Methods operate on internal state.
5. Runtime identity with instanceof is useful.
6. You need to subclass Error or another base class.
```

不一定用 class：

```txt
1. API response records.
2. React props.
3. Plain configuration objects.
4. One-off data containers.
5. Data mainly serialized with JSON.
```

---

## 15. 常见错误速查表

| 错误 | 正确模型 |
|---|---|
| `class` 是 Java 式模板 | `class` 是原型机制的语法层 |
| 方法在每个实例上 | class 方法默认在 prototype 上 |
| `new` 只是调用函数 | `new` 创建对象、连原型、绑 `this`、执行构造器 |
| `instanceof` 查 `constructor` | `instanceof` 查原型链 |
| class 可声明前使用 | class 声明有暂时性死区 |
| 提取方法后 `this` 仍在 | 方法值不携带 `this` |
| 静态方法能通过实例调用 | 静态方法属于类本身 |
| 子类 constructor 可先用 `this` | 必须先 `super()` |
| `super.method()` 的 `this` 是父类实例 | `this` 仍然是当前实例 |
| `#field` 是普通属性 | 私有字段不是普通属性 |
| 修改内置原型无副作用 | 会影响所有实例和第三方代码 |
| 继承越多越好 | 组合通常更灵活 |

---

## 16. 最终记忆模型

```txt
class Product {}

means:
  Product is a constructor function.
  Product.prototype stores instance methods.
  new Product() creates an object linked to Product.prototype.

class DigitalProduct extends Product {}

means:
  DigitalProduct.prototype -> Product.prototype
  DigitalProduct -> Product

instance state lives on instances.
instance methods live on prototypes.
static members live on constructors.
private fields live in private slots.
```
