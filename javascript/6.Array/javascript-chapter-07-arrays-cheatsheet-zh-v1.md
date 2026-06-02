# JavaScript 第 7 章“数组”Cheatsheet v1

> 用途：这是第 7 章完成训练后的快速复习表，不替代学习指导文件。  
> 规则：正文中文；代码名和代码注释不使用中文字符。

---

## 1. 核心 API 总览

| API / 语法 | 所属对象 | 方法签名 / 形式 | 参数 | 返回值 | 是否修改原数组 | 常见坑 |
|---|---|---|---|---|---|---|
| `[]` | 语法 | `[a, b]` | 元素列表 | 新数组 | 否 | 最推荐的普通数组创建方式。 |
| `new Array()` | `Array` | `new Array(length)` / `new Array(...items)` | 长度或元素 | 新数组 | 否 | 单数字参数是长度，不是元素。 |
| `Array.of()` | `Array` | `Array.of(...items)` | 元素 | 新数组 | 否 | `Array.of(3)` 得到 `[3]`。 |
| `Array.from()` | `Array` | `Array.from(items, mapFn?, thisArg?)` | 可迭代或类数组对象 | 新数组 | 否 | 适合把 `NodeList`、字符串、Set 转真数组。 |
| `Array.isArray()` | `Array` | `Array.isArray(value)` | 任意值 | `boolean` | 否 | 比 `instanceof Array` 更可靠。 |
| `length` | 数组实例 | `array.length` | 无 | `number` | 赋值会修改 | 不一定等于真实元素个数。 |
| `push()` | `Array.prototype` | `array.push(...items)` | 新元素 | 新长度 | 是 | 不打平数组参数。 |
| `pop()` | `Array.prototype` | `array.pop()` | 无 | 元素或 `undefined` | 是 | 空数组返回 `undefined`。 |
| `unshift()` | `Array.prototype` | `array.unshift(...items)` | 新元素 | 新长度 | 是 | 一次传多个参数与多次调用顺序不同。 |
| `shift()` | `Array.prototype` | `array.shift()` | 无 | 元素或 `undefined` | 是 | 会移动后续元素。 |
| `delete` | 操作符 | `delete array[index]` | 索引属性 | `boolean` | 是 | 制造空槽，不改 `length`。 |
| `slice()` | `Array.prototype` | `array.slice(start?, end?)` | 起止索引 | 新数组 | 否 | 不包含 `end`。 |
| `splice()` | `Array.prototype` | `array.splice(start, deleteCount?, ...items)` | 起点、删除数、新元素 | 被删除元素数组 | 是 | 和 `slice()` 名字像，但副作用完全不同。 |
| `toSpliced()` | `Array.prototype` | `array.toSpliced(start, deleteCount?, ...items)` | 起点、删除数、新元素 | 新数组 | 否 | `splice()` 的非破坏性版本。 |
| `fill()` | `Array.prototype` | `array.fill(value, start?, end?)` | 填充值、范围 | 原数组 | 是 | 填对象会共享引用。 |
| `copyWithin()` | `Array.prototype` | `array.copyWithin(target, start, end?)` | 目标、来源范围 | 原数组 | 是 | 在同一数组内部复制。 |
| `concat()` | `Array.prototype` | `array.concat(...values)` | 数组或值 | 新数组 | 否 | 打平一层数组参数。 |
| `map()` | `Array.prototype` | `array.map(callbackFn, thisArg?)` | callback | 新数组 | 否 | 返回等长数组，跳过空槽。 |
| `filter()` | `Array.prototype` | `array.filter(callbackFn, thisArg?)` | callback | 新数组 | 否 | 只保留 callback 返回 truthy 的元素。 |
| `forEach()` | `Array.prototype` | `array.forEach(callbackFn, thisArg?)` | callback | `undefined` | 否 | 不返回新数组。 |
| `reduce()` | `Array.prototype` | `array.reduce(callbackFn, initialValue?)` | callback、初始值 | 累计结果 | 否 | 空数组通常必须传初始值。 |
| `find()` | `Array.prototype` | `array.find(callbackFn, thisArg?)` | callback | 元素或 `undefined` | 否 | 找第一个匹配值。 |
| `findIndex()` | `Array.prototype` | `array.findIndex(callbackFn, thisArg?)` | callback | 索引或 `-1` | 否 | 找不到是 `-1`。 |
| `includes()` | `Array.prototype` | `array.includes(value, fromIndex?)` | 查找值、起点 | `boolean` | 否 | 可以检测 `NaN`。 |
| `indexOf()` | `Array.prototype` | `array.indexOf(value, fromIndex?)` | 查找值、起点 | 索引或 `-1` | 否 | 不能可靠检测 `NaN`。 |
| `some()` | `Array.prototype` | `array.some(callbackFn, thisArg?)` | callback | `boolean` | 否 | 一个满足就 true。 |
| `every()` | `Array.prototype` | `array.every(callbackFn, thisArg?)` | callback | `boolean` | 否 | 空数组返回 true。 |
| `sort()` | `Array.prototype` | `array.sort(compareFn?)` | 比较函数 | 原数组 | 是 | 默认按字符串排序。 |
| `toSorted()` | `Array.prototype` | `array.toSorted(compareFn?)` | 比较函数 | 新数组 | 否 | React state 更安全。 |
| `reverse()` | `Array.prototype` | `array.reverse()` | 无 | 原数组 | 是 | 原地反转。 |
| `toReversed()` | `Array.prototype` | `array.toReversed()` | 无 | 新数组 | 否 | 非破坏性反转。 |
| `flat()` | `Array.prototype` | `array.flat(depth?)` | 深度 | 新数组 | 否 | 默认打平一层。 |
| `flatMap()` | `Array.prototype` | `array.flatMap(callbackFn, thisArg?)` | callback | 新数组 | 否 | `map()` 后打平一层。 |
| `join()` | `Array.prototype` | `array.join(separator?)` | 分隔符 | 字符串 | 否 | `null` 和 `undefined` 会变成空字符串。 |
| `entries()` | `Array.prototype` | `array.entries()` | 无 | iterator | 否 | 产生 `[index, value]`。 |
| `keys()` | `Array.prototype` | `array.keys()` | 无 | iterator | 否 | 产生索引。 |
| `values()` | `Array.prototype` | `array.values()` | 无 | iterator | 否 | 产生值。 |
| `at()` | `Array.prototype` | `array.at(index)` | 索引 | 元素或 `undefined` | 否 | 支持负索引。 |
| `with()` | `Array.prototype` | `array.with(index, value)` | 索引和值 | 新数组 | 否 | 非破坏性替换单个位置。 |

---

## 2. 同名 / 相似方法对照

| 方法 | 易混方法 | 核心区别 |
|---|---|---|
| `slice()` | `splice()` | `slice()` 返回切片新数组；`splice()` 原地插入/删除/替换。 |
| `sort()` | `toSorted()` | `sort()` 修改原数组；`toSorted()` 返回新数组。 |
| `reverse()` | `toReversed()` | `reverse()` 修改原数组；`toReversed()` 返回新数组。 |
| `splice()` | `toSpliced()` | `splice()` 修改原数组；`toSpliced()` 返回新数组。 |
| `indexOf()` | `includes()` | `indexOf()` 返回索引或 `-1`；`includes()` 返回布尔值并可检测 `NaN`。 |
| `find()` | `filter()` | `find()` 返回第一个元素；`filter()` 返回所有匹配元素组成的新数组。 |
| `some()` | `every()` | `some()` 检查是否至少一个满足；`every()` 检查是否全部满足。 |
| `map()` | `forEach()` | `map()` 返回新数组；`forEach()` 返回 `undefined`。 |
| `Array.of()` | `new Array()` | `Array.of(3)` 是 `[3]`；`new Array(3)` 是长度为 3 的空槽数组。 |
| `Array.from()` | spread syntax | `Array.from()` 支持类数组对象；展开语法要求可迭代对象。 |

---

## 3. 参数签名速查

```txt
Array.from(items, mapFn?, thisArg?)
Array.of(...items)
Array.isArray(value)
array.push(...items)
array.unshift(...items)
array.splice(start, deleteCount?, ...items)
array.slice(start?, end?)
array.fill(value, start?, end?)
array.copyWithin(target, start, end?)
array.map(callbackFn, thisArg?)
array.filter(callbackFn, thisArg?)
array.forEach(callbackFn, thisArg?)
array.reduce(callbackFn, initialValue?)
array.find(callbackFn, thisArg?)
array.findIndex(callbackFn, thisArg?)
array.includes(searchElement, fromIndex?)
array.indexOf(searchElement, fromIndex?)
array.sort(compareFn?)
array.toSorted(compareFn?)
array.flat(depth?)
array.flatMap(callbackFn, thisArg?)
array.join(separator?)
array.at(index)
array.with(index, value)
```

---

## 4. callback function 参数顺序

| 方法 | callback 参数 |
|---|---|
| `map()` | `(element, index, array)` |
| `filter()` | `(element, index, array)` |
| `forEach()` | `(element, index, array)` |
| `find()` | `(element, index, array)` |
| `findIndex()` | `(element, index, array)` |
| `some()` | `(element, index, array)` |
| `every()` | `(element, index, array)` |
| `reduce()` | `(accumulator, currentValue, currentIndex, array)` |
| `sort()` | `(firstElement, secondElement)` |

---

## 5. 会修改原数组的方法

```txt
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
fill()
copyWithin()
```

记忆句：这些方法适合局部临时数组；处理 React state 时要格外小心。

---

## 6. 返回新数组或新结果的方法

```txt
map()
filter()
slice()
concat()
toSorted()
toReversed()
toSpliced()
with()
flat()
flatMap()
Array.from()
Array.of()
```

这些方法更适合不可变更新（immutable update）。

---

## 7. 不返回新数组的方法

```txt
forEach() -> undefined
push() -> new length
unshift() -> new length
pop() -> removed element
shift() -> removed element
reduce() -> accumulated result
find() -> element or undefined
findIndex() -> index or -1
some() -> boolean
every() -> boolean
includes() -> boolean
join() -> string
```

最常见坑：把 `forEach()` 的返回值赋给变量。

---

## 8. 稀疏数组判断速查

```js
const values = [];
values[0] = 'a';
values[2] = 'c';

console.log(values[1]);
console.log(1 in values);
console.log(Object.keys(values));
```

输出模型：

```txt
undefined
false
[ '0', '2' ]
```

记忆句：空槽不是值为 `undefined`，而是索引属性不存在。

---

## 9. 遍历方式对比

| 遍历方式 | 是否拿到值 | 是否拿到索引 | 稀疏数组行为 | 常见用途 |
|---|---|---|---|---|
| `for...of` | 是 | 否 | 空槽读成 `undefined` | 简单遍历值。 |
| `array.entries()` | 是 | 是 | 空槽读成 `undefined` | 同时需要索引和值。 |
| `forEach()` | 是 | 是 | 跳过空槽 | 对存在元素执行副作用。 |
| classic `for` | 自己决定 | 自己决定 | 自己决定 | 性能敏感或需要精确控制。 |
| `for...in` | 否，拿到键 | 键是字符串 | 枚举属性 | 不推荐遍历数组值。 |

---

## 10. 类数组对象速查

```txt
array-like object:
  has length
  has numeric indexes
  does not necessarily have Array.prototype methods
```

转换方式：

```js
const realArray = Array.from(arrayLikeValue);
```

判断方式：

```js
Array.isArray(value)
```

---

## 11. 字符串作为数组读取

```js
const code = 'ABC';

console.log(code[0]);
console.log(code.length);
console.log(Array.from(code));
```

注意：

```txt
string[index] can read a character.
string[index] = value cannot mutate the string.
```

---

## 12. 常见 IDE / 运行时警告

| 现象 | 类型 | 原因 |
|---|---|---|
| `arrayLike.map is not a function` | 运行时错误 | 类数组对象不是真数组。 |
| `Reduce of empty array with no initial value` | 运行时错误 | 空数组 `reduce()` 没有初始值。 |
| `sort()` 后原数组顺序变了 | 逻辑错误 | `sort()` 原地修改。 |
| `new Array(3).map(...)` 没有输出 | 逻辑错误 | 空槽被 `map()` 跳过。 |
| `forEach()` 返回 `undefined` | 逻辑错误 | `forEach()` 用于副作用，不用于生成数组。 |
| `delete arr[i]` 后 length 没变 | 机制误解 | `delete` 删除属性，不移动元素。 |

---

## 13. 最终记忆模型

```txt
Array is a special object with indexed properties and a length invariant.

Before using an array method, ask:

1. Does it mutate the original array?
2. What does it return?
3. Does it use a callback function?
4. What are callback parameters?
5. What happens with holes?
6. What happens with an empty array?
```

---

## 14. 官方文档链接

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
- [Array.prototype.sort() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [Array.prototype.toSorted() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
- [for...in - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
- [in operator - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)
