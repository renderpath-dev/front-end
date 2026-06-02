# JavaScript 第 7 章“数组”学习指导文件 v1

> 定位：这是《JavaScript 权威指南》第 7 章“数组”的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建练习目录、写 `.js` 文件、运行 Node、观察输出或错误，再把每节整理成自己的正式笔记。  
> 参考范围：《JavaScript 权威指南》第 7 章 7.1 到 7.11，MDN 的 Array、Indexed collections、Array length、Array.from、Array.of、Array.isArray、数组迭代和常用数组方法。  
> 语言规则：正文统一中文；必要技术术语保留英文括号。  
> 代码规则：代码、变量名、函数名、类名、文件名、目录名、代码注释不使用中文字符。

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
11. [最终小项目](#10-最终小项目invoice-line-analyzer)
12. [额外 cheatsheet](#11-额外-cheatsheet)
13. [最终文件清单](#12-最终文件清单)
14. [最终学习笔记转换要求](#13-最终学习笔记转换要求)
15. [本章最终记忆模型](#14-本章最终记忆模型)
16. [官方文档阅读清单](#15-官方文档阅读清单)
17. [生成前自检清单](#16-生成前自检清单)

---

## 0. 文件定位

### 结论

第 7 章不是“数组方法大全”，而是 JavaScript 数组运行时模型（array runtime model）的核心章。

你要学会回答：

```txt
1. What makes an array different from a normal object?
2. How does length change?
3. What is a sparse array?
4. What is the difference between a hole and undefined?
5. Which array methods mutate the original array?
6. Which array methods return a new array?
7. Which iteration forms skip holes?
8. Why is an array-like object not an array?
9. Why can strings be indexed but not mutated?
```

### 技术意义

数组是现代前端最常见的数据结构：商品列表、评论列表、搜索结果、表格数据、路由匹配结果、React 渲染列表、表单字段集合、API 返回数组，都依赖数组。

如果你只会 `map()`、`filter()`、`reduce()` 的表面写法，却不理解 `length`、空槽（hole）、原地修改（mutation）、浅拷贝（shallow copy）、迭代行为（iteration behavior），后面写 React state、TypeScript array types、Node 数据处理都会很容易出现“代码能跑，但状态错乱”的问题。

---

## 1. 本章学习目标

学完第 7 章，你必须能完整解释以下内容：

```txt
array literal
Array constructor
Array.of()
Array.from()
Array.isArray()
array index
array length
sparse array
hole
undefined element
dense array
array element read/write
push()
pop()
shift()
unshift()
delete operator on arrays
splice()
slice()
concat()
fill()
copyWithin()
for-of
entries()
keys()
values()
forEach()
map()
filter()
reduce()
find()
findIndex()
some()
every()
includes()
indexOf()
sort()
toSorted()
reverse()
toReversed()
flat()
flatMap()
join()
array-like object
strings as array-like values
```

### 本章不是为了背 API

本章的核心模型是：

```txt
array
  -> special object
  -> indexed properties
  -> length invariant
  -> dense or sparse layout
  -> iteration behavior
  -> mutating methods and non-mutating methods
```

---

## 2. 本章学习顺序

```txt
array runtime model
  -> creating arrays
  -> reading and writing elements
  -> sparse arrays
  -> length mechanism
  -> adding and removing elements
  -> iterating arrays
  -> multidimensional arrays
  -> array methods
  -> array-like objects
  -> strings as arrays
  -> mini project
```

先建立数组的对象模型，再学方法。否则你会把数组方法背成 API 表，但无法解释为什么某些方法跳过空槽、为什么 `sort()` 改了原数组、为什么 `new Array(3).map(...)` 没有运行 callback。

---

## 3. 本章核心术语表

| 中文术语 | English term | 解释 |
|---|---|---|
| 数组 | array | 以数字索引组织值的特殊对象。 |
| 数组元素 | array element | 存放在数组索引属性上的值。 |
| 数组索引 | array index | 非负整数形式的属性名，参与 `length` 机制。 |
| 长度 | length | 大于最高数组索引的整数，不一定等于真实元素个数。 |
| 稠密数组 | dense array | 从 `0` 到 `length - 1` 基本都有元素的数组。 |
| 稀疏数组 | sparse array | 某些索引属性不存在的数组。 |
| 空槽 | hole | 数组中某个索引位置没有对应属性。 |
| 显式 undefined | explicit undefined | 索引属性存在，但值是 `undefined`。 |
| 原地修改 | mutation | 方法直接改变原数组。 |
| 非破坏性方法 | non-mutating method | 方法返回新数组，不改变原数组。 |
| 回调函数 | callback function | 传给数组方法、由数组方法对元素调用的函数。 |
| 迭代器 | iterator | 按顺序产生数组元素、索引或键值对的对象。 |
| 类数组对象 | array-like object | 有 `length` 和数字索引，但不是真数组的对象。 |
| 可迭代对象 | iterable object | 实现迭代协议、可用于 `for...of` 的对象。 |
| 多维数组 | multidimensional array | 数组元素本身也是数组的嵌套结构。 |
| 浅拷贝 | shallow copy | 复制第一层元素引用，嵌套对象仍然共享引用。 |

---

## 4. 本章底层模型

### 结论

数组是特殊对象：

```txt
array object
  -> indexed properties: "0", "1", "2"
  -> non-index properties: "note", "owner"
  -> length data property
  -> Array.prototype methods
```

### length 不变式

```txt
For every array index i:
  i < array.length
```

因此：

```txt
array[5] = value
  -> highest index becomes 5
  -> length becomes at least 6

array.length = 2
  -> all elements with index >= 2 are deleted
```

### 空槽模型

```txt
const a = [];
a[0] = 'x';
a[2] = 'z';

index 0 exists
index 1 does not exist
index 2 exists
length is 3
```

读取 `a[1]` 得到 `undefined`，但这不代表索引 `1` 存在。

### 方法副作用模型

```txt
mutating methods:
  push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin

non-mutating methods:
  map, filter, slice, concat, reduce, find, some, every, includes,
  toSorted, toReversed, toSpliced, with, flat, flatMap
```

---

## 5. 推荐目录结构

```txt
javascript/chapter-07-arrays/
  javascript-chapter-07-arrays-learning-guide-zh-v1.md
  javascript-chapter-07-arrays-cheatsheet-zh-v1.md

  00-array-runtime-model/
    arrayIndexPropertyModel.js

  01-create-arrays/
    arrayCreationForms.js
    arrayConstructorMistake.js

  02-read-write-elements/
    indexReadWriteDemo.js
    nonIndexPropertyMistake.js

  03-sparse-arrays/
    sparseArrayVsUndefined.js
    deleteCreatesHoleMistake.js

  04-length-mechanism/
    arrayLengthInvariant.js
    lengthTruncationMistake.js

  05-add-remove-elements/
    stackQueueOperations.js
    unshiftOrderMistake.js

  06-iterate-arrays/
    arrayIterationComparison.js
    forInArrayMistake.js

  07-multidimensional-arrays/
    matrixTraversal.js
    sharedRowMistake.js

  08-array-methods/
    arrayMethodsTransformSearch.js
    mutatingVsNonMutatingMethods.js
    reduceInitialValueMistake.js

  09-array-like-objects/
    arrayLikeObjectDemo.js
    arrayLikeMethodMistake.js

  10-strings-as-arrays/
    stringArrayLikeDemo.js
    stringMutationMistake.js

  11-arrays-mini-project/
    invoiceLineAnalyzer.js
    invoiceLineAnalyzerMistakes.js
    invoiceLineAnalyzerChecklist.md
```

---

## 6. 运行方式

### 环境要求

```txt
Node.js 20+ recommended.
Node.js 22+ recommended if you want to run toSorted(), toSpliced(), toReversed(), and with() examples safely.
```

### 运行清单

在 `javascript/chapter-07-arrays/` 目录下运行：

```bash
node 00-array-runtime-model/arrayIndexPropertyModel.js
node 01-create-arrays/arrayCreationForms.js
node 01-create-arrays/arrayConstructorMistake.js
node 02-read-write-elements/indexReadWriteDemo.js
node 02-read-write-elements/nonIndexPropertyMistake.js
node 03-sparse-arrays/sparseArrayVsUndefined.js
node 03-sparse-arrays/deleteCreatesHoleMistake.js
node 04-length-mechanism/arrayLengthInvariant.js
node 04-length-mechanism/lengthTruncationMistake.js
node 05-add-remove-elements/stackQueueOperations.js
node 05-add-remove-elements/unshiftOrderMistake.js
node 06-iterate-arrays/arrayIterationComparison.js
node 06-iterate-arrays/forInArrayMistake.js
node 07-multidimensional-arrays/matrixTraversal.js
node 07-multidimensional-arrays/sharedRowMistake.js
node 08-array-methods/arrayMethodsTransformSearch.js
node 08-array-methods/mutatingVsNonMutatingMethods.js
node 08-array-methods/reduceInitialValueMistake.js
node 09-array-like-objects/arrayLikeObjectDemo.js
node 09-array-like-objects/arrayLikeMethodMistake.js
node 10-strings-as-arrays/stringArrayLikeDemo.js
node 10-strings-as-arrays/stringMutationMistake.js
node 11-arrays-mini-project/invoiceLineAnalyzer.js
node 11-arrays-mini-project/invoiceLineAnalyzerMistakes.js
```

---

## 7. 分节训练内容


## 00：数组运行时模型

### 结论

数组（array）不是一块神秘的连续语法区域，而是一种带有特殊 `length` 行为、特殊整数索引属性的对象。

### 技术意义

你以后写 React 列表、API 数据列表、购物车项目列表、表格数据、分页结果时，表面上处理的是数组，底层其实是在读写一批按索引组织的属性。理解这个模型后，`arr[5] = value` 为什么会改变 `length`、`arr.note = value` 为什么不改变 `length` 就很清楚。

### 底层机制

数组索引本质上是属性名，但只有符合数组索引规则的属性名才参与 `length` 机制。`shoppingList[2] = 'monitor'` 会创建索引属性 `2`，并把 `length` 调整为 `3`。`shoppingList.note = 'office order'` 只是普通对象属性，不是数组元素。

### API / 语法规范

```txt
array[index]
array.length
Object.keys(array)
index in array
```

`index in array` 测试索引属性是否存在，不测试该位置的值是否为 `undefined`。

### 文件结构

```txt
00-array-runtime-model/arrayIndexPropertyModel.js
```

### 示例代码：`00-array-runtime-model/arrayIndexPropertyModel.js`

```js
// Goal:
// Verify that array indexes are special property names and length tracks numeric indexes.

const shoppingList = [];

shoppingList[0] = 'keyboard';
shoppingList[2] = 'monitor';
shoppingList.note = 'office order';

console.log(shoppingList.length);
console.log(Object.keys(shoppingList));
console.log(shoppingList[1]);
console.log(1 in shoppingList);
console.log('note' in shoppingList);
```

### 运行方式

```bash
node 00-array-runtime-model/arrayIndexPropertyModel.js
```

### 预期输出

```txt
3
[ '0', '2', 'note' ]
undefined
false
true
```

### 执行过程

`shoppingList[0]` 和 `shoppingList[2]` 创建两个数组索引属性。索引 `1` 没有创建，所以读取结果是 `undefined`，但 `1 in shoppingList` 是 `false`。`note` 是普通属性，会出现在 `Object.keys()` 中，但不会参与数组长度计算。

### 和实际项目的关系

真实项目里经常有人把数组当对象挂元信息，例如 `list.total = 100`。这种写法可以运行，但很容易让列表数据和元数据混在一起。更清晰的结构是 `{ items: [], total: 100 }`。

### 常见错误

- 把 `arr.custom = value` 当成数组元素。
- 用 `arr[index] === undefined` 判断元素是否存在。
- 忘记数组也是对象，导致 `for...in` 把普通属性也遍历出来。

### 最终记忆模型

数组是对象，但数组索引属性会驱动 `length`；普通属性不会。

## 01：创建数组

### 结论

优先使用数组字面量（array literal）创建普通数组；只有明确需要把可迭代对象（iterable）或类数组对象（array-like object）转成真数组时，再使用 `Array.from()`。

### 技术意义

创建数组不是单纯语法选择。`[]` 最直观；`new Array(3)` 创建的是长度为 3 的稀疏数组，不是包含数字 3 的数组；`Array.of(3)` 才是创建 `[3]`；`Array.from()` 是把外部结构规范化成真实数组。

### 底层机制

`new Array(number)` 的单数字参数被解释为长度。这个设计是历史遗留，容易产生空槽（hole）。`Array.of()` 解决这个歧义。`Array.from()` 会读取传入对象的迭代协议或 `length` 与数字索引。

### API / 语法规范

```txt
[]
new Array(length)
new Array(element0, element1, ...)
Array.of(element0, element1, ...)
Array.from(arrayLikeOrIterable, mapFn?, thisArg?)
```

`Array.from()` 返回新数组；可选 `mapFn` 会在创建时转换每个元素。

### 文件结构

```txt
01-create-arrays/arrayCreationForms.js
```
```txt
01-create-arrays/arrayConstructorMistake.js
```

### 示例代码：`01-create-arrays/arrayCreationForms.js`

```js
// Goal:
// Compare literal arrays, Array constructor, Array.of, and Array.from.

const literalItems = ['mouse', 'keyboard'];
const constructorLength = new Array(3);
const constructorItems = new Array('mouse', 'keyboard');
const fromText = Array.from('web');
const ofNumber = Array.of(3);

console.log(literalItems);
console.log(constructorLength.length, Object.keys(constructorLength));
console.log(constructorItems);
console.log(fromText);
console.log(ofNumber);
```

### 示例代码：`01-create-arrays/arrayConstructorMistake.js`

```js
// Goal:
// Verify why new Array(3) does not create [3].

const expectedSingleValue = new Array(3);
const actualSingleValue = Array.of(3);

console.log(expectedSingleValue);
console.log(expectedSingleValue.length);
console.log(0 in expectedSingleValue);
console.log(actualSingleValue);
```

### 运行方式

```bash
node 01-create-arrays/arrayCreationForms.js
node 01-create-arrays/arrayConstructorMistake.js
```

### 预期输出

```txt
[ 'mouse', 'keyboard' ]
3 []
[ 'mouse', 'keyboard' ]
[ 'w', 'e', 'b' ]
[ 3 ]
[ <3 empty items> ]
3
false
[ 3 ]
```

### 执行过程

`literalItems` 直接包含两个元素。`new Array(3)` 只设置 `length`，没有创建索引 `0`、`1`、`2`。`Array.from('web')` 按字符串迭代结果生成字符数组。`Array.of(3)` 把数字 3 当成元素，不当成长度。

### 和实际项目的关系

项目中从 DOM `NodeList`、函数参数、字符串、Set、Map keys 转数组时经常用 `Array.from()`。普通静态列表仍然使用 `[]`，这也是最不容易误读的写法。

### 常见错误

- 写 `new Array(3)` 以为得到 `[3]`。
- 用 `new Array(size).map(...)` 初始化数组，结果 `map()` 跳过空槽。
- 不区分可迭代对象和类数组对象。

### 最终记忆模型

创建普通数组用 `[]`；消除单数字参数歧义用 `Array.of()`；转换外部集合用 `Array.from()`。

## 02：读写数组元素

### 结论

数组读写使用方括号属性访问；写入大于等于当前 `length` 的数组索引会自动扩展数组并可能制造稀疏区域。

### 技术意义

读写数组是后面列表渲染、表格更新、队列处理、数据清洗的基础。你要清楚：读取不存在的位置不会报错，而是返回 `undefined`；写入远处索引不会自动填充中间元素。

### 底层机制

读取 `cartItems[5]` 时，如果该索引属性不存在，属性查询返回 `undefined`。写入 `cartItems[4] = 'lamp'` 会创建索引 `4`，并把 `length` 变成 `5`。中间没有创建的索引仍然是空槽。

### API / 语法规范

```txt
array[index]
array[index] = value
array['numericString'] = value
array.nonIndexProperty = value
```

数组索引属性通常来自非负整数形式的属性名。`'2'` 会影响 `length`，`'02'` 不会按数组索引处理。

### 文件结构

```txt
02-read-write-elements/indexReadWriteDemo.js
```
```txt
02-read-write-elements/nonIndexPropertyMistake.js
```

### 示例代码：`02-read-write-elements/indexReadWriteDemo.js`

```js
// Goal:
// Verify array element read, write, overwrite, and out-of-range assignment.

const cartItems = ['book', 'pen'];

console.log(cartItems[0]);
console.log(cartItems[5]);

cartItems[1] = 'notebook';
cartItems[4] = 'lamp';

console.log(cartItems.length);
console.log(cartItems);
console.log(Object.keys(cartItems));
```

### 示例代码：`02-read-write-elements/nonIndexPropertyMistake.js`

```js
// Goal:
// Verify that non-index properties do not count as array elements.

const tasks = ['draft', 'review'];

tasks.owner = 'Mira';
tasks['2'] = 'publish';
tasks['02'] = 'ignored by length';

console.log(tasks.length);
console.log(Object.keys(tasks));
console.log(tasks.owner);
console.log(tasks['02']);
```

### 运行方式

```bash
node 02-read-write-elements/indexReadWriteDemo.js
node 02-read-write-elements/nonIndexPropertyMistake.js
```

### 预期输出

```txt
book
undefined
5
[ 'book', 'notebook', <2 empty items>, 'lamp' ]
[ '0', '1', '4' ]
3
[ '0', '1', '2', 'owner', '02' ]
Mira
ignored by length
```

### 执行过程

第一个文件中，索引 `5` 没有值，所以读取为 `undefined`。写入索引 `4` 后，最高索引是 4，`length` 必须是 5。第二个文件中，`owner` 和 `'02'` 是普通属性，只有 `'2'` 是数组索引属性，所以 `length` 是 3。

### 和实际项目的关系

实际项目中，数组通常应该保持稠密（dense）。如果你要按照 id 存数据，不要写 `items[id] = item`，因为 id 可能很大，会制造巨大长度和大量空槽。用 `Map` 或对象索引表更合适。

### 常见错误

- 用远距离索引赋值制造稀疏数组。
- 把 `'02'` 当成索引 2。
- 以为读取越界数组会抛出错误。

### 最终记忆模型

数组读取不存在的位置返回 `undefined`；数组写入远处索引会扩展 `length`，不会填充中间元素。

## 03：稀疏数组

### 结论

稀疏数组（sparse array）的核心不是某些位置值为 `undefined`，而是某些索引属性根本不存在。

### 技术意义

这一点很重要，因为不同数组方法对空槽的处理不一样。React 列表、表格行、分页数据最好不要使用稀疏数组。稀疏数组更像对象属性缺失，而不是列表中有一个明确的空值。

### 底层机制

`sparseScores[1]` 读取结果是 `undefined`，但 `1 in sparseScores` 是 `false`，说明索引 `1` 不存在。`explicitScores[1]` 的值也是 `undefined`，但 `1 in explicitScores` 是 `true`，说明这个元素明确存在。

### API / 语法规范

```txt
index in array
Object.keys(array)
delete array[index]
array.splice(start, deleteCount, ...items)
```

`delete` 删除的是属性，不会移动数组元素，也不会修改 `length`。`splice()` 才会调整位置和长度。

### 文件结构

```txt
03-sparse-arrays/sparseArrayVsUndefined.js
```
```txt
03-sparse-arrays/deleteCreatesHoleMistake.js
```

### 示例代码：`03-sparse-arrays/sparseArrayVsUndefined.js`

```js
// Goal:
// Compare a hole with an explicit undefined value.

const sparseScores = [];
sparseScores[0] = 90;
sparseScores[2] = 85;

const explicitScores = [90, undefined, 85];

console.log(sparseScores.length);
console.log(sparseScores[1]);
console.log(1 in sparseScores);
console.log(1 in explicitScores);
console.log(Object.keys(sparseScores));
console.log(Object.keys(explicitScores));
```

### 示例代码：`03-sparse-arrays/deleteCreatesHoleMistake.js`

```js
// Goal:
// Verify that delete creates a hole and does not shift later elements.

const queue = ['first', 'second', 'third'];

delete queue[1];

console.log(queue.length);
console.log(queue[1]);
console.log(1 in queue);
console.log(queue);

queue.splice(1, 1);
console.log(queue.length);
console.log(queue);
```

### 运行方式

```bash
node 03-sparse-arrays/sparseArrayVsUndefined.js
node 03-sparse-arrays/deleteCreatesHoleMistake.js
```

### 预期输出

```txt
3
undefined
false
true
[ '0', '2' ]
[ '0', '1', '2' ]
3
undefined
false
[ 'first', <1 empty item>, 'third' ]
2
[ 'first', 'third' ]
```

### 执行过程

第一个文件对比了空槽和显式 `undefined`。第二个文件中，`delete queue[1]` 只删除索引属性 `1`，`queue.length` 仍然是 3。随后 `splice(1, 1)` 删除当前位置并移动后续元素，所以数组变成两个元素。

### 和实际项目的关系

当你处理后端返回的列表时，应当把缺失值表示为 `null`、明确的占位对象或直接过滤掉，而不是制造空槽。空槽会让遍历行为变得不一致。

### 常见错误

- 以为 `delete arr[i]` 等价于删除数组元素并移动后面的元素。
- 把空槽和 `undefined` 混为一谈。
- 在稀疏数组上使用方法时没有确认该方法是否跳过空槽。

### 最终记忆模型

空槽是属性不存在；`undefined` 是属性存在但值为 `undefined`。

## 04：数组长度机制

### 结论

`length` 不是“元素个数”的绝对同义词，而是永远大于最高数组索引的无符号 32 位整数。

### 技术意义

理解 `length` 后，很多数组行为都能解释：远距离索引赋值为什么拉长数组；把 `length` 改小为什么会删除尾部元素；把 `length` 改大为什么只制造空槽，不创建真实元素。

### 底层机制

数组维护一个不变式（invariant）：任何数组索引都必须小于 `length`。给索引 `5` 赋值后，`length` 至少要变成 `6`。把 `length` 设置为 `2` 时，索引大于等于 2 的元素必须被删除。

### API / 语法规范

```txt
array.length
array.length = newLength
```

设置更小的 `length` 会删除元素；设置更大的 `length` 会增加长度但不创建实际元素。

### 文件结构

```txt
04-length-mechanism/arrayLengthInvariant.js
```
```txt
04-length-mechanism/lengthTruncationMistake.js
```

### 示例代码：`04-length-mechanism/arrayLengthInvariant.js`

```js
// Goal:
// Verify the relationship between length and the highest array index.

const inventory = ['ssd', 'ram'];

inventory[5] = 'gpu';
console.log(inventory.length);
console.log(Object.keys(inventory));

inventory.length = 2;
console.log(inventory.length);
console.log(inventory);
console.log(5 in inventory);

inventory.length = 6;
console.log(inventory.length);
console.log(Object.keys(inventory));
```

### 示例代码：`04-length-mechanism/lengthTruncationMistake.js`

```js
// Goal:
// Verify that assigning a smaller length deletes elements.

const releaseSteps = ['build', 'test', 'deploy', 'monitor'];

releaseSteps.length = 2;

console.log(releaseSteps);
console.log(releaseSteps[2]);
console.log(2 in releaseSteps);
```

### 运行方式

```bash
node 04-length-mechanism/arrayLengthInvariant.js
node 04-length-mechanism/lengthTruncationMistake.js
```

### 预期输出

```txt
6
[ '0', '1', '5' ]
2
[ 'ssd', 'ram' ]
false
6
[ '0', '1' ]
[ 'build', 'test' ]
undefined
false
```

### 执行过程

`inventory[5] = 'gpu'` 后最高索引是 5，所以 `length` 是 6。`inventory.length = 2` 删除索引 2 及以上的所有元素。再次把 `length` 改成 6 不会恢复已删除元素，也不会创建新索引。

### 和实际项目的关系

真实项目中，有时可以用 `arr.length = 0` 清空数组，但这会原地修改同一个数组对象。在 React state 中不要这样做，因为 React 需要新的数组引用来识别状态变化。

### 常见错误

- 把 `length` 当成真实元素数量。
- 用 `length = n` 截断数组时忘记这是破坏性修改。
- 把 `length` 调大后以为每个位置都有元素。

### 最终记忆模型

`length` 是最高索引边界，不是可靠的真实元素计数。

## 05：添加和删除数组元素

### 结论

尾部添加/删除用 `push()` / `pop()`；头部添加/删除用 `unshift()` / `shift()`，但头部操作需要移动元素，成本更高；中间插入删除用 `splice()`。

### 技术意义

这组方法决定你如何建模栈（stack）、队列（queue）、历史记录、任务列表和购物车行项目。核心判断是：这个操作是否原地修改数组，以及是否会移动其他元素。

### 底层机制

`push()` 在末尾添加元素并返回新长度。`pop()` 删除最后一个元素并返回它。`shift()` 删除第一个元素并让后续元素向前移动。`unshift()` 在开头插入元素并让已有元素向后移动。

### API / 语法规范

```txt
array.push(element0, element1, ...): number
array.pop(): element | undefined
array.unshift(element0, element1, ...): number
array.shift(): element | undefined
array.splice(start, deleteCount, ...items): Array
```

这些方法都会修改原数组。

### 文件结构

```txt
05-add-remove-elements/stackQueueOperations.js
```
```txt
05-add-remove-elements/unshiftOrderMistake.js
```

### 示例代码：`05-add-remove-elements/stackQueueOperations.js`

```js
// Goal:
// Compare push, pop, shift, and unshift.

const undoStack = [];

undoStack.push('type title');
undoStack.push('insert image');
console.log(undoStack.pop());
console.log(undoStack);

const printQueue = ['job-a'];
printQueue.push('job-b');
printQueue.push('job-c');
console.log(printQueue.shift());
console.log(printQueue);

printQueue.unshift('urgent-job');
console.log(printQueue);
```

### 示例代码：`05-add-remove-elements/unshiftOrderMistake.js`

```js
// Goal:
// Verify that one unshift call with multiple arguments is not the same as repeated unshift calls.

const oneCall = ['c'];
oneCall.unshift('a', 'b');

const repeatedCalls = ['c'];
repeatedCalls.unshift('a');
repeatedCalls.unshift('b');

console.log(oneCall);
console.log(repeatedCalls);
```

### 运行方式

```bash
node 05-add-remove-elements/stackQueueOperations.js
node 05-add-remove-elements/unshiftOrderMistake.js
```

### 预期输出

```txt
insert image
[ 'type title' ]
job-a
[ 'job-b', 'job-c' ]
[ 'urgent-job', 'job-b', 'job-c' ]
[ 'a', 'b', 'c' ]
[ 'b', 'a', 'c' ]
```

### 执行过程

第一个文件先用 `push()` / `pop()` 模拟撤销栈，再用 `push()` / `shift()` 模拟队列。第二个文件说明一次 `unshift('a', 'b')` 会保持参数顺序，而两次 `unshift()` 每次都插到开头，所以顺序反过来。

### 和实际项目的关系

在 UI 状态中，通常更推荐非破坏性写法，例如 `[...items, newItem]`、`items.slice(1)`、`items.filter(...)`。在普通算法或局部临时数组中，原地方法可以接受。

### 常见错误

- 在 React state 数组上直接 `push()` 然后设置同一引用。
- 以为 `unshift('a'); unshift('b')` 等价于 `unshift('a', 'b')`。
- 用 `delete` 代替 `splice()` 删除元素。

### 最终记忆模型

尾部操作便宜；头部操作会移动元素；是否修改原数组必须先确认。

## 06：迭代数组

### 结论

默认遍历数组值用 `for...of`；需要索引用 `entries()`；需要函数式处理用数组方法；不要把 `for...in` 当成数组默认遍历方式。

### 技术意义

数组遍历不是只有语法差别。`for...of`、`forEach()`、经典 `for`、`for...in` 对空槽、索引、继承属性和普通属性的处理不同。实际项目中，错误的遍历方式会让隐藏属性、空槽和顺序问题冒出来。

### 底层机制

`for...of` 使用数组迭代器，按索引顺序产生值，空槽表现为 `undefined`。`forEach()` 只对存在的元素调用 callback function，会跳过空槽。`for...in` 枚举可枚举字符串属性，包括非索引属性和继承属性，不适合作为数组值遍历。

### API / 语法规范

```txt
for (const value of array)
for (const [index, value] of array.entries())
array.forEach((value, index, array) => {})
for (let index = 0; index < array.length; index += 1)
for (const key in array)
```

### 文件结构

```txt
06-iterate-arrays/arrayIterationComparison.js
```
```txt
06-iterate-arrays/forInArrayMistake.js
```

### 示例代码：`06-iterate-arrays/arrayIterationComparison.js`

```js
// Goal:
// Compare for-of, entries, forEach, and classic for loops on a sparse array.

const readings = [];
readings[0] = 18;
readings[2] = 21;

for (const value of readings) {
  console.log('for-of', value);
}

for (const [index, value] of readings.entries()) {
  console.log('entries', index, value);
}

readings.forEach((value, index) => {
  console.log('forEach', index, value);
});

for (let index = 0; index < readings.length; index += 1) {
  if (index in readings) {
    console.log('classic', index, readings[index]);
  }
}
```

### 示例代码：`06-iterate-arrays/forInArrayMistake.js`

```js
// Goal:
// Verify why for-in is not a good default for arrays.

const lessons = ['types', 'objects'];
lessons.extra = 'metadata';

for (const key in lessons) {
  console.log(key, lessons[key]);
}

for (const lesson of lessons) {
  console.log('value', lesson);
}
```

### 运行方式

```bash
node 06-iterate-arrays/arrayIterationComparison.js
node 06-iterate-arrays/forInArrayMistake.js
```

### 预期输出

```txt
for-of 18
for-of undefined
for-of 21
entries 0 18
entries 1 undefined
entries 2 21
forEach 0 18
forEach 2 21
classic 0 18
classic 2 21
0 types
1 objects
extra metadata
value types
value objects
```

### 执行过程

稀疏数组 `readings` 的索引 1 不存在。`for...of` 和 `entries()` 仍然给出第二个位置的 `undefined`。`forEach()` 跳过空槽。经典 `for` 加 `index in readings` 后也跳过空槽。`for...in` 遍历的是键，连 `extra` 这个普通属性也出来。

### 和实际项目的关系

React 渲染列表时你常用 `items.map(...)`，它本质上是数组迭代加转换。数据清洗时，如果关心空槽和缺失项，需要先决定是保留、跳过还是转为明确的 `null`。

### 常见错误

- 用 `for...in` 遍历数组值。
- 以为 `forEach()` 和 `for...of` 对空槽行为完全一致。
- 在 `forEach()` 里使用 `return` 以为可以结束外层函数或跳出循环。

### 最终记忆模型

数组值遍历优先 `for...of`；数组索引和值一起要用 `entries()`；`for...in` 是属性枚举，不是数组值遍历。

## 07：多维数组

### 结论

JavaScript 没有专门的多维数组类型，多维数组就是数组里放数组。

### 技术意义

表格、棋盘、矩阵、日历网格、二维布局数据都会用到这个结构。关键不是语法，而是每一行必须是独立数组引用，否则修改一行会影响所有行。

### 底层机制

`salesMatrix[1][2]` 分两步求值：先读取外层数组索引 1，得到第二行数组；再读取该行数组索引 2。`new Array(3).fill([])` 会把同一个内部数组引用复制到三个位置。

### API / 语法规范

```txt
array[rowIndex][columnIndex]
Array.from({ length: rowCount }, () => Array.from({ length: columnCount }, createValue))
new Array(rowCount).fill(value)
```

如果 `fill()` 的值是对象或数组，所有位置会共享同一个引用。

### 文件结构

```txt
07-multidimensional-arrays/matrixTraversal.js
```
```txt
07-multidimensional-arrays/sharedRowMistake.js
```

### 示例代码：`07-multidimensional-arrays/matrixTraversal.js`

```js
// Goal:
// Build and traverse a two-dimensional array.

const salesMatrix = [
  [10, 12, 14],
  [8, 11, 13],
  [15, 9, 16],
];

let totalSales = 0;

for (let rowIndex = 0; rowIndex < salesMatrix.length; rowIndex += 1) {
  const row = salesMatrix[rowIndex];

  for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
    totalSales += row[columnIndex];
  }
}

console.log(totalSales);
console.log(salesMatrix[1][2]);
```

### 示例代码：`07-multidimensional-arrays/sharedRowMistake.js`

```js
// Goal:
// Verify why Array.fill with an object or array reference can create shared rows.

const sharedGrid = new Array(3).fill([]);
sharedGrid[0].push('x');

console.log(sharedGrid);
console.log(sharedGrid[0] === sharedGrid[1]);

const isolatedGrid = Array.from({ length: 3 }, () => []);
isolatedGrid[0].push('x');

console.log(isolatedGrid);
console.log(isolatedGrid[0] === isolatedGrid[1]);
```

### 运行方式

```bash
node 07-multidimensional-arrays/matrixTraversal.js
node 07-multidimensional-arrays/sharedRowMistake.js
```

### 预期输出

```txt
108
13
[ [ 'x' ], [ 'x' ], [ 'x' ] ]
true
[ [ 'x' ], [], [] ]
false
```

### 执行过程

第一个文件用嵌套循环遍历每一行和每一列。第二个文件中，`fill([])` 把同一个数组引用放进三行，所以修改 `sharedGrid[0]` 也会影响其他行。`Array.from(..., () => [])` 每次 callback 都创建新数组，因此行之间互不影响。

### 和实际项目的关系

实际项目里，初始化表格、看板列、座位图、二维坐标时，最容易踩的就是共享引用。只要内部值是对象或数组，就不要用一个对象直接 `fill()`。

### 常见错误

- 用 `new Array(3).fill([])` 初始化二维数组。
- 修改某一行后发现所有行都变了。
- 混淆行索引和列索引，导致读取错误位置。

### 最终记忆模型

二维数组是数组嵌套数组；每一行都必须是独立引用。

## 08：数组方法

### 结论

数组方法要按职责和副作用分类：转换、筛选、查找、聚合、排序、切片、原地修改、返回新数组。

### 技术意义

背方法名没有用。真实项目里关键是知道：这个方法返回什么？会不会修改原数组？callback function 的参数是什么？空数组和稀疏数组会发生什么？

### 底层机制

`map()` 创建等长新数组；`filter()` 创建满足条件的新数组；`find()` 返回第一个匹配元素或 `undefined`；`some()` / `every()` 返回布尔值；`reduce()` 把多个元素折叠为一个结果。`sort()`、`reverse()`、`splice()` 会修改原数组；`toSorted()`、`toReversed()`、`toSpliced()` 返回新数组。

### API / 语法规范

```txt
array.map(callbackFn, thisArg?)
array.filter(callbackFn, thisArg?)
array.find(callbackFn, thisArg?)
array.includes(searchElement, fromIndex?)
array.some(callbackFn, thisArg?)
array.every(callbackFn, thisArg?)
array.reduce(callbackFn, initialValue?)
array.sort(compareFn?)
array.toSorted(compareFn?)
array.splice(start, deleteCount, ...items)
array.toSpliced(start, deleteCount, ...items)
```

### 文件结构

```txt
08-array-methods/arrayMethodsTransformSearch.js
```
```txt
08-array-methods/mutatingVsNonMutatingMethods.js
```
```txt
08-array-methods/reduceInitialValueMistake.js
```

### 示例代码：`08-array-methods/arrayMethodsTransformSearch.js`

```js
// Goal:
// Compare map, filter, find, includes, some, every, and reduce.

const orders = [
  { id: 'A100', total: 80, paid: true },
  { id: 'B200', total: 120, paid: false },
  { id: 'C300', total: 220, paid: true },
];

const orderIds = orders.map((order) => order.id);
const paidOrders = orders.filter((order) => order.paid);
const expensiveOrder = orders.find((order) => order.total > 100);
const hasB200 = orderIds.includes('B200');
const hasUnpaidOrder = orders.some((order) => !order.paid);
const allHaveTotals = orders.every((order) => typeof order.total === 'number');
const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

console.log(orderIds);
console.log(paidOrders.length);
console.log(expensiveOrder.id);
console.log(hasB200);
console.log(hasUnpaidOrder);
console.log(allHaveTotals);
console.log(totalRevenue);
```

### 示例代码：`08-array-methods/mutatingVsNonMutatingMethods.js`

```js
// Goal:
// Compare methods that mutate the original array with methods that create a new array.

const originalPrices = [30, 10, 20];
const sortedCopy = originalPrices.toSorted((left, right) => left - right);

console.log(originalPrices);
console.log(sortedCopy);

const mutablePrices = [30, 10, 20];
const sortReturnValue = mutablePrices.sort((left, right) => left - right);

console.log(mutablePrices);
console.log(sortReturnValue === mutablePrices);

const splicedCopy = originalPrices.toSpliced(1, 1, 99);
console.log(originalPrices);
console.log(splicedCopy);
```

### 示例代码：`08-array-methods/reduceInitialValueMistake.js`

```js
// Goal:
// Verify why reduce should usually receive an explicit initial value.

const emptyTotals = [];

try {
  const total = emptyTotals.reduce((sum, value) => sum + value);
  console.log(total);
} catch (error) {
  console.log(error.name);
  console.log(error.message.includes('empty array'));
}

const safeTotal = emptyTotals.reduce((sum, value) => sum + value, 0);
console.log(safeTotal);
```

### 运行方式

```bash
node 08-array-methods/arrayMethodsTransformSearch.js
node 08-array-methods/mutatingVsNonMutatingMethods.js
node 08-array-methods/reduceInitialValueMistake.js
```

### 预期输出

```txt
[ 'A100', 'B200', 'C300' ]
2
B200
true
true
true
420
[ 30, 10, 20 ]
[ 10, 20, 30 ]
[ 10, 20, 30 ]
true
[ 30, 10, 20 ]
[ 30, 99, 20 ]
TypeError
true
0
```

### 执行过程

第一个文件展示常见函数式数组方法的返回值类型。第二个文件对比 `toSorted()` 和 `sort()`：前者返回新数组，后者修改原数组并返回同一个数组引用。第三个文件说明空数组上没有初始值的 `reduce()` 会抛出 `TypeError`。

### 和实际项目的关系

React 中最常见的是 `map()` 渲染列表、`filter()` 删除元素、`find()` 找详情项、`reduce()` 统计总价。状态数组优先使用非修改方法，因为新引用更利于状态更新。

### 常见错误

- 用 `forEach()` 期待返回新数组。
- 忘记 `sort()` 默认按字符串排序。
- 空数组 `reduce()` 不传初始值。
- 在 state 数组上直接 `splice()` 或 `sort()`。

### 最终记忆模型

先问返回值，再问是否修改原数组；这比背方法名重要。

## 09：类数组对象

### 结论

类数组对象（array-like object）有 `length` 和数字索引，但它不是真数组，不自动拥有数组方法。

### 技术意义

DOM 里的某些集合、老式 `arguments`、自定义结果集都可能是类数组对象。你要会把它转换为真正数组，再使用 `map()`、`filter()` 等方法。

### 底层机制

数组方法来自 `Array.prototype`。类数组对象只是普通对象，它有 `0`、`1`、`length` 这样的属性，但原型不是 `Array.prototype`，所以没有 `map()` 方法。`Array.from()` 会根据 `length` 和数字索引创建真数组。

### API / 语法规范

```txt
Array.isArray(value): boolean
Array.from(arrayLike): Array
Array.prototype.slice.call(arrayLike): Array
```

现代代码优先使用 `Array.from()`。

### 文件结构

```txt
09-array-like-objects/arrayLikeObjectDemo.js
```
```txt
09-array-like-objects/arrayLikeMethodMistake.js
```

### 示例代码：`09-array-like-objects/arrayLikeObjectDemo.js`

```js
// Goal:
// Convert an array-like object into a real array.

const fakeNodeList = {
  0: 'header',
  1: 'main',
  2: 'footer',
  length: 3,
};

console.log(Array.isArray(fakeNodeList));

const sectionList = Array.from(fakeNodeList);
console.log(Array.isArray(sectionList));
console.log(sectionList.map((section) => section.toUpperCase()));

const slicedList = Array.prototype.slice.call(fakeNodeList);
console.log(slicedList.join(' > '));
```

### 示例代码：`09-array-like-objects/arrayLikeMethodMistake.js`

```js
// Goal:
// Verify that an array-like object does not automatically inherit Array methods.

const arrayLikeResult = {
  0: 'alpha',
  1: 'beta',
  length: 2,
};

try {
  console.log(arrayLikeResult.map((value) => value.toUpperCase()));
} catch (error) {
  console.log(error.name);
}

const realResult = Array.from(arrayLikeResult);
console.log(realResult.map((value) => value.toUpperCase()));
```

### 运行方式

```bash
node 09-array-like-objects/arrayLikeObjectDemo.js
node 09-array-like-objects/arrayLikeMethodMistake.js
```

### 预期输出

```txt
false
true
[ 'HEADER', 'MAIN', 'FOOTER' ]
header > main > footer
TypeError
[ 'ALPHA', 'BETA' ]
```

### 执行过程

第一个文件中 `fakeNodeList` 有 `length` 和数字索引，但 `Array.isArray()` 是 `false`。转换后可以调用 `map()`。第二个文件直接调用 `arrayLikeResult.map()` 会抛出 `TypeError`，因为该对象没有这个方法。

### 和实际项目的关系

项目里拿到 DOM 查询结果、第三方库返回的集合、旧 API 的结果时，不要只看它能不能用索引访问。先判断它是不是真数组，再决定是否要 `Array.from()`。

### 常见错误

- 看到 `value.length` 就以为它是数组。
- 在类数组对象上直接调用 `map()`。
- 用 `instanceof Array` 判断跨 realm 数据，优先使用 `Array.isArray()`。

### 最终记忆模型

有索引和 `length` 不等于真数组；真数组才有数组原型方法。

## 10：作为数组的字符串

### 结论

字符串可以按索引读取字符，也有 `length`，但字符串是不可修改的原始值，不是真数组。

### 技术意义

前端里经常处理输入框文本、商品编码、URL 片段、搜索关键词。你可以用数组思路读取字符串，但要修改字符，必须先创建新字符串或转换成数组再拼回去。

### 底层机制

`productCode[0]` 读取字符。`label[0] = 'S'` 不会改变字符串，因为字符串是不可修改的原始值。`Array.from(string)` 会按迭代结果创建字符数组。

### API / 语法规范

```txt
string[index]
string.length
Array.from(string)
characters.join(separator)
```

读取像数组，修改不能像数组。

### 文件结构

```txt
10-strings-as-arrays/stringArrayLikeDemo.js
```
```txt
10-strings-as-arrays/stringMutationMistake.js
```

### 示例代码：`10-strings-as-arrays/stringArrayLikeDemo.js`

```js
// Goal:
// Compare string indexing with real array conversion.

const productCode = 'A1B2';

console.log(productCode[0]);
console.log(productCode.length);
console.log(Array.from(productCode));

const characters = Array.from(productCode);
characters[0] = 'Z';

console.log(characters.join(''));
console.log(productCode);
```

### 示例代码：`10-strings-as-arrays/stringMutationMistake.js`

```js
// Goal:
// Verify that string values are immutable even though characters can be read by index.

const label = 'sale';

label[0] = 'S';

console.log(label);
console.log(label[0]);
console.log(Array.from(label).map((letter) => letter.toUpperCase()).join(''));
```

### 运行方式

```bash
node 10-strings-as-arrays/stringArrayLikeDemo.js
node 10-strings-as-arrays/stringMutationMistake.js
```

### 预期输出

```txt
A
4
[ 'A', '1', 'B', '2' ]
Z1B2
A1B2
sale
s
SALE
```

### 执行过程

第一个文件把字符串转成数组后修改字符数组，原字符串保持不变。第二个文件直接写 `label[0] = 'S'`，运行后 `label` 仍然是 `sale`。

### 和实际项目的关系

处理 slug、SKU、搜索词高亮、大小写转换时，不要试图原地修改字符串。要么用字符串方法返回新字符串，要么 `Array.from()` 后处理再 `join()`。

### 常见错误

- 以为 `str[0] = 'x'` 能修改字符串。
- 混淆字符串索引读取和数组元素写入。
- 忘记字符串的 `length` 按 UTF-16 code unit 计数，复杂 Unicode 字符需要小心。

### 最终记忆模型

字符串可以索引读取，但不可原地修改。

## 8. 本章 API / 语法完整索引

| API / 语法 | 所属对象 | 签名 / 形式 | 返回值 | 是否修改原数组 | 关键注意点 |
|---|---|---|---|---|---|
| `[]` | 语法 | `[element0, element1]` | `Array` | 否 | 创建普通数组最推荐。 |
| `new Array()` | `Array` | `new Array(length)` / `new Array(...items)` | `Array` | 否 | 单数字参数表示长度。 |
| `Array.of()` | `Array` | `Array.of(...items)` | `Array` | 否 | 单数字参数也作为元素。 |
| `Array.from()` | `Array` | `Array.from(items, mapFn?, thisArg?)` | `Array` | 否 | 转换可迭代或类数组对象。 |
| `Array.isArray()` | `Array` | `Array.isArray(value)` | `boolean` | 否 | 比 `instanceof Array` 更稳。 |
| `length` | `Array instance` | `array.length` | `number` | 可写会改数组 | 小于当前值会删除尾部元素。 |
| `push()` | `Array.prototype` | `array.push(...items)` | 新长度 | 是 | 末尾添加。 |
| `pop()` | `Array.prototype` | `array.pop()` | 被删除元素或 `undefined` | 是 | 末尾删除。 |
| `unshift()` | `Array.prototype` | `array.unshift(...items)` | 新长度 | 是 | 头部添加，移动元素。 |
| `shift()` | `Array.prototype` | `array.shift()` | 被删除元素或 `undefined` | 是 | 头部删除，移动元素。 |
| `slice()` | `Array.prototype` | `array.slice(start?, end?)` | 新数组 | 否 | 结束索引不包含。 |
| `splice()` | `Array.prototype` | `array.splice(start, deleteCount?, ...items)` | 删除元素数组 | 是 | 插入、删除、替换通用方法。 |
| `toSpliced()` | `Array.prototype` | `array.toSpliced(start, deleteCount?, ...items)` | 新数组 | 否 | `splice()` 的非破坏性版本。 |
| `fill()` | `Array.prototype` | `array.fill(value, start?, end?)` | 原数组 | 是 | 对象值会共享同一引用。 |
| `copyWithin()` | `Array.prototype` | `array.copyWithin(target, start, end?)` | 原数组 | 是 | 在数组内部复制片段。 |
| `concat()` | `Array.prototype` | `array.concat(...values)` | 新数组 | 否 | 打平一层数组参数。 |
| `map()` | `Array.prototype` | `array.map(callbackFn, thisArg?)` | 新数组 | 否 | 返回等长转换结果。 |
| `filter()` | `Array.prototype` | `array.filter(callbackFn, thisArg?)` | 新数组 | 否 | 只保留返回 truthy 的元素。 |
| `forEach()` | `Array.prototype` | `array.forEach(callbackFn, thisArg?)` | `undefined` | 否 | 不返回新数组。 |
| `reduce()` | `Array.prototype` | `array.reduce(callbackFn, initialValue?)` | 累计结果 | 否 | 空数组通常必须传初始值。 |
| `find()` | `Array.prototype` | `array.find(callbackFn, thisArg?)` | 元素或 `undefined` | 否 | 返回第一个匹配元素。 |
| `findIndex()` | `Array.prototype` | `array.findIndex(callbackFn, thisArg?)` | 索引或 `-1` | 否 | 找不到返回 `-1`。 |
| `includes()` | `Array.prototype` | `array.includes(value, fromIndex?)` | `boolean` | 否 | 可检测 `NaN`。 |
| `indexOf()` | `Array.prototype` | `array.indexOf(value, fromIndex?)` | 索引或 `-1` | 否 | 使用严格相等，不适合检测 `NaN`。 |
| `some()` | `Array.prototype` | `array.some(callbackFn, thisArg?)` | `boolean` | 否 | 有一个满足即 true。 |
| `every()` | `Array.prototype` | `array.every(callbackFn, thisArg?)` | `boolean` | 否 | 全部满足才 true。 |
| `sort()` | `Array.prototype` | `array.sort(compareFn?)` | 原数组 | 是 | 默认按字符串排序。 |
| `toSorted()` | `Array.prototype` | `array.toSorted(compareFn?)` | 新数组 | 否 | `sort()` 的非破坏性版本。 |
| `reverse()` | `Array.prototype` | `array.reverse()` | 原数组 | 是 | 原地反转。 |
| `toReversed()` | `Array.prototype` | `array.toReversed()` | 新数组 | 否 | `reverse()` 的非破坏性版本。 |
| `flat()` | `Array.prototype` | `array.flat(depth?)` | 新数组 | 否 | 默认打平一层。 |
| `flatMap()` | `Array.prototype` | `array.flatMap(callbackFn, thisArg?)` | 新数组 | 否 | 等价于 `map()` 后打平一层。 |
| `join()` | `Array.prototype` | `array.join(separator?)` | `string` | 否 | 默认逗号连接。 |
| `entries()` | `Array.prototype` | `array.entries()` | iterator | 否 | 产生 `[index, value]`。 |
| `keys()` | `Array.prototype` | `array.keys()` | iterator | 否 | 产生索引。 |
| `values()` | `Array.prototype` | `array.values()` | iterator | 否 | 产生值。 |
| `at()` | `Array.prototype` | `array.at(index)` | 元素或 `undefined` | 否 | 支持负索引。 |
| `with()` | `Array.prototype` | `array.with(index, value)` | 新数组 | 否 | 非破坏性替换单个元素。 |
| `delete` | 操作符 | `delete array[index]` | `boolean` | 是 | 创建空槽，不移动元素。 |
| `in` | 操作符 | `index in array` | `boolean` | 否 | 判断索引属性是否存在。 |


## 9. 本章常见错误总表

| 错误写法 | 错误原因 | 正确模型 |
|---|---|---|
| `new Array(3).map(...)` | `new Array(3)` 创建空槽，`map()` 跳过空槽。 | 用 `Array.from({ length: 3 }, callback)`。 |
| `new Array(3)` 当成 `[3]` | 单数字参数表示长度。 | 用 `Array.of(3)`。 |
| `delete arr[i]` 删除列表元素 | `delete` 删除属性，不移动元素，不改 `length`。 | 用 `splice()` 或 `filter()`。 |
| `arr.length` 当成真实元素数量 | 稀疏数组的 `length` 可大于实际元素数。 | 用 `Object.keys(arr).length` 或保持稠密数组。 |
| `arr.forEach(...)` 赋给变量 | `forEach()` 返回 `undefined`。 | 需要新数组用 `map()` 或 `filter()`。 |
| `arr.sort()` 后继续依赖原顺序 | `sort()` 原地修改数组。 | 用 `toSorted()`。 |
| `arr.reduce(callback)` 处理可能为空的数组 | 空数组无初始值会抛 `TypeError`。 | 总是提供 `initialValue`。 |
| `for...in` 遍历数组值 | `for...in` 遍历可枚举属性名。 | 用 `for...of`、`entries()` 或数组方法。 |
| `new Array(3).fill([])` 建二维数组 | 每一行共享同一个数组引用。 | 用 `Array.from({ length: 3 }, () => [])`。 |
| 类数组对象直接 `.map()` | 它不继承 `Array.prototype`。 | 先 `Array.from(arrayLike)`。 |
| `str[0] = 'x'` 修改字符串 | 字符串不可修改。 | 创建新字符串或转数组后 `join()`。 |
| 数字数组默认 `sort()` | 默认按字符串顺序排序。 | 传 `(a, b) => a - b`。 |


## 10. 最终小项目：Invoice Line Analyzer

### 项目目标

把一组模拟发票行文本转换为结构化项目，过滤非法行，统计总价，排序找出最高金额行，并检查某个商品是否存在。

这个小项目不是为了做完整发票系统，而是训练第 7 章数组能力在真实数据清洗流程中的组合使用。

### 使用到的本章知识点

| 知识点 | 在项目中的作用 |
|---|---|
| 数组字面量 | 保存原始行文本。 |
| `filter()` | 删除空行、分离有效项和无效项。 |
| `map()` | 把文本行转换为解析结果。 |
| `split()` | 把每一行拆成字段数组。 |
| `Number()` | 把数量和价格文本转换成数值。 |
| `reduce()` | 汇总发票总价。 |
| `toSorted()` | 不修改原数组地排序。 |
| `includes()` | 检查商品名是否存在。 |
| 数组索引 | 读取排序后的最大行。 |

### 推荐文件结构

```txt
11-arrays-mini-project/
  invoiceLineAnalyzer.js
  invoiceLineAnalyzerMistakes.js
  invoiceLineAnalyzerChecklist.md
```

### 主文件代码

```js
// Goal:
// Build an invoice line analyzer using array creation, iteration, transformation, searching, and reduction.

const rawInvoiceLines = [
  'SKU-001|Keyboard|2|49.99',
  'SKU-002|Mouse|1|25.5',
  '',
  'SKU-003|Monitor|1|199.99',
  'BROKEN-LINE',
  'SKU-004|USB Cable|3|8.5',
];

function parseInvoiceLine(line, index) {
  const parts = line.split('|');

  if (parts.length !== 4) {
    return {
      ok: false,
      index,
      reason: 'Invalid field count',
      originalLine: line,
    };
  }

  const [sku, name, quantityText, priceText] = parts;
  const quantity = Number(quantityText);
  const unitPrice = Number(priceText);

  if (!sku || !name || !Number.isFinite(quantity) || !Number.isFinite(unitPrice)) {
    return {
      ok: false,
      index,
      reason: 'Invalid field value',
      originalLine: line,
    };
  }

  return {
    ok: true,
    value: {
      sku,
      name,
      quantity,
      unitPrice,
      lineTotal: quantity * unitPrice,
    },
  };
}

const parsedLines = rawInvoiceLines
  .filter((line) => line.trim().length > 0)
  .map(parseInvoiceLine);

const validItems = parsedLines
  .filter((entry) => entry.ok)
  .map((entry) => entry.value);

const invalidLines = parsedLines.filter((entry) => !entry.ok);
const invoiceTotal = validItems.reduce((sum, item) => sum + item.lineTotal, 0);
const sortedItems = validItems.toSorted((left, right) => right.lineTotal - left.lineTotal);
const itemNames = validItems.map((item) => item.name);

console.log('valid item count:', validItems.length);
console.log('invalid line count:', invalidLines.length);
console.log('invoice total:', invoiceTotal.toFixed(2));
console.log('largest line:', sortedItems[0].sku);
console.log('item names:', itemNames.join(', '));
console.log('has monitor:', itemNames.includes('Monitor'));
```

### 对比 / 错误文件代码

```js
// Goal:
// Compare common array mistakes in an invoice parser.

const rawLines = [
  'SKU-001|Keyboard|2|49.99',
  'SKU-002|Mouse|1|25.5',
];

const parsedLines = rawLines.map((line) => line.split('|'));

const mistakenNames = parsedLines.forEach((parts) => parts[1]);
console.log('forEach return value:', mistakenNames);

const sortedBySku = parsedLines.sort();
console.log('same reference:', sortedBySku === parsedLines);

const totals = [];
try {
  console.log(totals.reduce((sum, value) => sum + value));
} catch (error) {
  console.log('reduce error:', error.name);
}
```

### 运行方式

```bash
node 11-arrays-mini-project/invoiceLineAnalyzer.js
node 11-arrays-mini-project/invoiceLineAnalyzerMistakes.js
```

### 预期输出

```txt
valid item count: 4
invalid line count: 1
invoice total: 350.47
largest line: SKU-003
item names: Keyboard, Mouse, Monitor, USB Cable
has monitor: true
forEach return value: undefined
same reference: true
reduce error: TypeError
```

### 完整执行过程

1. `rawInvoiceLines` 保存原始字符串数组。
2. `.filter((line) => line.trim().length > 0)` 删除空字符串行。
3. `.map(parseInvoiceLine)` 把每一行转换成解析结果对象。
4. `parseInvoiceLine()` 内部先用 `split('|')` 得到字段数组。
5. 字段数量不是 4 时，返回 `{ ok: false, ... }`。
6. 字段数量正确时，把数量和价格转换成数字。
7. 数字有效时返回 `{ ok: true, value: ... }`。
8. `validItems` 用 `filter()` 和 `map()` 提取真正可用的项目。
9. `invalidLines` 保留错误行，方便后续显示错误报告。
10. `reduce()` 从初始值 `0` 开始累计 `lineTotal`。
11. `toSorted()` 创建按金额降序的新数组，不破坏 `validItems`。
12. `includes()` 在商品名数组里检查是否存在 `Monitor`。

### API 角色表

| API | 在小项目中的角色 |
|---|---|
| `filter()` | 选择满足条件的行或项目。 |
| `map()` | 转换数组元素结构。 |
| `split()` | 生成字段数组。 |
| `Number.isFinite()` | 验证数值字段。 |
| `reduce()` | 计算汇总值。 |
| `toSorted()` | 非破坏性排序。 |
| `includes()` | 判断列表中是否包含指定值。 |
| `join()` | 把商品名数组格式化为输出文本。 |

### 常见错误

- 用 `forEach()` 生成新数组，结果得到 `undefined`。
- 用 `sort()` 修改原数组，导致后续逻辑依赖的原顺序丢失。
- 空数组调用 `reduce()` 不传初始值，导致 `TypeError`。
- 解析失败后直接访问字段，导致后面出现 `NaN` 或错误数据。

### 可扩展任务

1. 增加重复 SKU 检查。
2. 增加折扣行和税费计算。
3. 把非法行按错误原因分组。
4. 把结果渲染为 HTML 表格。
5. 改写成 TypeScript 版本，给解析结果加判别联合（discriminated union）。

### 和真实项目 / 简历项目的关系

真实项目里，前端经常要把 CSV、Excel 导入结果、后端批量文本、订单明细、日志行、表格数据转换成结构化数据。这个小项目虽然小，但训练的是数据管道（data pipeline）的基础：过滤、转换、验证、聚合、排序和报告错误。

### 最终记忆模型

```txt
raw array
  -> filter empty values
  -> map raw item to parsed result
  -> filter valid results
  -> map result wrapper to domain item
  -> reduce for summary
  -> toSorted for ordered view
  -> includes/find/some for search checks
```


## 11. 额外 cheatsheet

本章必须额外生成并放在当前章节目录下：

```txt
javascript/chapter-07-arrays/javascript-chapter-07-arrays-cheatsheet-zh-v1.md
```

cheatsheet 不是学习指导文件的替代品。它只用于完成训练后的快速复习，重点列出：

```txt
1. 数组创建方式
2. length 机制
3. 稀疏数组判断
4. 会修改原数组的方法
5. 返回新数组的方法
6. 查找与聚合方法
7. 遍历方式对比
8. 类数组对象转换
9. 字符串作为数组读取
10. MDN 官方文档链接
```


## 12. 最终文件清单

```txt
javascript/chapter-07-arrays/
  javascript-chapter-07-arrays-learning-guide-zh-v1.md
  javascript-chapter-07-arrays-cheatsheet-zh-v1.md

  00-array-runtime-model/
    arrayIndexPropertyModel.js

  01-create-arrays/
    arrayCreationForms.js
    arrayConstructorMistake.js

  02-read-write-elements/
    indexReadWriteDemo.js
    nonIndexPropertyMistake.js

  03-sparse-arrays/
    sparseArrayVsUndefined.js
    deleteCreatesHoleMistake.js

  04-length-mechanism/
    arrayLengthInvariant.js
    lengthTruncationMistake.js

  05-add-remove-elements/
    stackQueueOperations.js
    unshiftOrderMistake.js

  06-iterate-arrays/
    arrayIterationComparison.js
    forInArrayMistake.js

  07-multidimensional-arrays/
    matrixTraversal.js
    sharedRowMistake.js

  08-array-methods/
    arrayMethodsTransformSearch.js
    mutatingVsNonMutatingMethods.js
    reduceInitialValueMistake.js

  09-array-like-objects/
    arrayLikeObjectDemo.js
    arrayLikeMethodMistake.js

  10-strings-as-arrays/
    stringArrayLikeDemo.js
    stringMutationMistake.js

  11-arrays-mini-project/
    invoiceLineAnalyzer.js
    invoiceLineAnalyzerMistakes.js
    invoiceLineAnalyzerChecklist.md
```

自检重点：

```txt
1. 主指导文件存在。
2. cheatsheet 文件存在。
3. 每个训练目录都在 chapter-07-arrays 内部。
4. 每个训练目录至少有一个可运行 .js 文件。
5. 故意错误文件以 Mistake 命名。
6. 最终小项目目录包含主文件、错误文件、检查清单。
7. 不创建 notes/ 目录。
8. 代码注释不含中文字符。
```


## 13. 最终学习笔记转换要求

完成练习后，把本指导文件转换成自己的正式笔记。正式笔记不要复制所有代码，而要提炼出以下内容：

```txt
1. 数组是对象，但数组索引属性会影响 length。
2. 空槽和 undefined 的区别。
3. length 的两个特殊行为：索引赋值扩展、缩短 length 删除元素。
4. delete、splice、filter 的删除模型区别。
5. for-of、forEach、for...in、classic for 的遍历差异。
6. map、filter、reduce、find、some、every 的返回值区别。
7. sort/splice/reverse 和 toSorted/toSpliced/toReversed 的副作用区别。
8. Array.from、Array.of、Array.isArray 的使用场景。
9. 类数组对象为什么不是数组。
10. 字符串为什么可以索引读取但不能原地修改。
```

每个重点至少保留一个你自己运行过的输出例子。不要只写“某 API 用于某功能”，要写它如何处理索引、空槽、返回值和原数组。


## 14. 本章最终记忆模型

```txt
Array is a special object.

array object
  -> indexed properties
  -> non-index properties
  -> length invariant
  -> dense or sparse layout
  -> iteration behavior
  -> methods with or without mutation

When using an array method, ask six questions:

1. What does it return?
2. Does it mutate the original array?
3. Does it skip holes?
4. Does it use a callback function?
5. What are the callback parameters?
6. What happens on an empty array?
```

一句话压缩：

```txt
数组的难点不是“存多个值”，而是索引属性、length、不存在的空槽、遍历行为和方法副作用共同组成的运行时模型。
```


## 15. 官方文档阅读清单

- [Array - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Indexed collections - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections)
- [Array: length - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
- [Array.from() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [Array.of() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of)
- [Array.isArray() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
- [Array.prototype.map() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.filter() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Array.prototype.splice() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [Array.prototype.slice() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [Array.prototype.sort() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [Array.prototype.toSorted() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
- [Array.prototype.toSpliced() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)
- [for...of - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
- [for...in - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
- [in operator - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)
- [String - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)


## 16. 生成前自检清单

```txt
[x] 文件放在 javascript/chapter-07-arrays/ 下。
[x] 没有新建 notes/。
[x] 正文是中文。
[x] 重要术语保留 English term。
[x] 代码变量名、函数名、文件名、目录名没有中文。
[x] 代码注释没有中文。
[x] 每节包含结论、技术意义、底层机制、API 规范、代码、运行方式、预期输出、执行过程、常见错误、记忆模型。
[x] API 固定方法名、参数签名、返回值、副作用已经列出。
[x] 推荐目录结构完整。
[x] 运行清单完整。
[x] 最终小项目完整。
[x] cheatsheet 单独生成。
[x] 最终文件清单完整。
[x] 官方文档链接使用 Markdown 链接。
```

