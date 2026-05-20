# JavaScript Array Methods Learning Notes

> 面向现代前端学习的数组方法笔记。重点不是背 API，而是建立一套判断模型：这个方法是否遍历、是否修改原数组、返回什么、回调函数的参数是什么。

---

## 目录

- [1. 核心心智模型](#1-核心心智模型)
- [2. 方法总览表](#2-方法总览表)
- [3. 创建数组](#3-创建数组)
- [4. 遍历与转换](#4-遍历与转换)
- [5. 筛选与查找](#5-筛选与查找)
- [6. 判断类方法](#6-判断类方法)
- [7. 归并类方法](#7-归并类方法)
- [8. 添加和删除元素](#8-添加和删除元素)
- [9. 子数组与结构修改](#9-子数组与结构修改)
- [10. 扁平化与拼接](#10-扁平化与拼接)
- [11. 搜索与包含判断](#11-搜索与包含判断)
- [12. 排序与反转](#12-排序与反转)
- [13. 填充与内部复制](#13-填充与内部复制)
- [14. 数组转字符串](#14-数组转字符串)
- [15. 稀疏数组与空槽](#15-稀疏数组与空槽)
- [16. 高频错误总结](#16-高频错误总结)
- [17. 学习优先级](#17-学习优先级)

---

## 1. 核心心智模型

数组方法学习时，先问 4 个问题：

1. **它是否遍历数组？**
2. **它是否修改原数组？**
3. **它返回什么？**
4. **如果接收回调函数，回调函数的参数是什么？**

多数数组遍历方法的回调函数参数顺序是：

```js
array.method((value, index, array) => {
  return value;
});
```

含义：

| 参数 | 含义 |
|---|---|
| `value` | 当前元素值 |
| `index` | 当前元素索引 |
| `array` | 原数组本身 |

重点规则：

```txt
参数名不决定含义，参数位置决定含义。
第一个参数是 value，第二个参数才是 index。
```

例如：

```js
const numbers = [10, 20, 30];

numbers.findIndex(index => index === 1);
```

这里的 `index` 不是索引，只是参数名。它接收的是当前元素值，所以它依次是 `10`、`20`、`30`。

如果真的要使用索引：

```js
const numbers = [10, 20, 30];

const result = numbers.findIndex((value, index) => index === 1);

console.log(result);
```

输出：

```txt
1
```

---

## 2. 方法总览表

### 2.1 不修改原数组的方法

| 方法 | 返回值 | 典型用途 |
|---|---|---|
| `map()` | 新数组 | 把每个元素转换成新值 |
| `filter()` | 新数组 | 筛选所有符合条件的元素 |
| `find()` | 元素或 `undefined` | 找第一个符合条件的元素 |
| `findIndex()` | 索引或 `-1` | 找第一个符合条件元素的索引 |
| `findLast()` | 元素或 `undefined` | 从右往左找第一个符合条件的元素 |
| `findLastIndex()` | 索引或 `-1` | 从右往左找第一个符合条件元素的索引 |
| `some()` | 布尔值 | 是否至少一个元素符合条件 |
| `every()` | 布尔值 | 是否所有元素都符合条件 |
| `reduce()` | 累计结果 | 从左到右归并为一个值 |
| `reduceRight()` | 累计结果 | 从右到左归并为一个值 |
| `slice()` | 新数组 | 截取子数组 |
| `concat()` | 新数组 | 拼接数组或值 |
| `flat()` | 新数组 | 展开嵌套数组 |
| `flatMap()` | 新数组 | 先 `map`，再展开一层 |
| `indexOf()` | 索引或 `-1` | 从左往右查找指定值 |
| `lastIndexOf()` | 索引或 `-1` | 从右往左查找指定值 |
| `includes()` | 布尔值 | 判断是否包含某个值 |
| `join()` | 字符串 | 用分隔符连接数组元素 |
| `toString()` | 字符串 | 转成逗号分隔字符串 |
| `toLocaleString()` | 字符串 | 按本地化规则转字符串 |

### 2.2 会修改原数组的方法

| 方法 | 返回值 | 典型用途 |
|---|---|---|
| `push()` | 新长度 | 末尾添加元素 |
| `pop()` | 被删除的元素 | 删除末尾元素 |
| `shift()` | 被删除的元素 | 删除开头元素 |
| `unshift()` | 新长度 | 开头添加元素 |
| `splice()` | 被删除元素组成的新数组 | 删除、插入、替换 |
| `fill()` | 修改后的原数组引用 | 用固定值填充 |
| `copyWithin()` | 修改后的原数组引用 | 数组内部复制覆盖 |
| `sort()` | 排序后的原数组引用 | 排序 |
| `reverse()` | 反转后的原数组引用 | 反转顺序 |

---

## 3. 创建数组

### 3.1 数组字面量 `[]`

最常用，最清楚。

```js
const empty = [];
const numbers = [1, 2, 3];

console.log(empty);
console.log(numbers);
```

输出：

```txt
[]
[1, 2, 3]
```

### 3.2 `new Array(length)`

创建指定长度的空槽数组。

```js
const a = new Array(3);

console.log(a);
console.log(a.length);
console.log(0 in a);
```

输出类似：

```txt
[empty x 3]
3
false
```

注意：

```txt
new Array(3) 不是 [undefined, undefined, undefined]。
它是长度为 3 的稀疏数组，里面是空槽。
```

### 3.3 `Array.of()`

把参数当成数组元素。

```js
console.log(Array.of(3));
console.log(new Array(3));
```

输出：

```txt
[3]
[empty x 3]
```

区别：

```txt
Array.of(3) 创建 [3]。
new Array(3) 创建长度为 3 的空槽数组。
```

### 3.4 `Array.from()`

把可迭代对象或类数组对象转换成真正数组，也可以用来生成固定长度数组。

```js
const chars = Array.from("hello");

console.log(chars);
```

输出：

```txt
["h", "e", "l", "l", "o"]
```

生成序列：

```js
const numbers = Array.from({ length: 5 }, (_, index) => index);

console.log(numbers);
```

输出：

```txt
[0, 1, 2, 3, 4]
```

生成固定值数组：

```js
function createFilledArray(length, value) {
  return Array.from({ length: length }, () => value);
}

const result = createFilledArray(5, 0);

console.log(result);
```

输出：

```txt
[0, 0, 0, 0, 0]
```

如果每一项需要独立对象，传工厂函数：

```js
function createArray(length, createValue) {
  return Array.from({ length: length }, (_, index) => createValue(index));
}

const rows = createArray(3, () => []);

rows[0].push(1);

console.log(rows);
```

输出：

```txt
[[1], [], []]
```

### 3.5 `Array.isArray()`

判断一个值是不是数组。

```js
console.log(Array.isArray([1, 2, 3]));
console.log(Array.isArray({ length: 3 }));
console.log(typeof [1, 2, 3]);
```

输出：

```txt
true
false
object
```

`typeof` 不能准确判断数组，因为数组本质上也是对象。

---

## 4. 遍历与转换

### 4.1 `forEach()`

用于遍历数组，执行操作。它不返回新数组。

```js
const data = [1, 2, 3, 4, 5];
let sum = 0;

data.forEach(value => {
  sum += value;
});

console.log(sum);
```

输出：

```txt
15
```

修改原数组需要手动通过索引赋值：

```js
const data = [1, 2, 3];

data.forEach((value, index, array) => {
  array[index] = value + 1;
});

console.log(data);
```

输出：

```txt
[2, 3, 4]
```

### 4.2 `map()`

把每个元素转换成新值，返回新数组，不修改原数组。

```js
const a = [1, 2, 3];

const result = a.map(x => x * x);

console.log(a);
console.log(result);
```

输出：

```txt
[1, 2, 3]
[1, 4, 9]
```

常见错误：只调用 `map()`，但不接收返回值。

```js
const a = [1, 2, 3];

a.map(x => x * x);

console.log(a);
```

输出：

```txt
[1, 2, 3]
```

原因：

```txt
map 的结果在返回值里，不在原数组里。
```

---

## 5. 筛选与查找

### 5.1 `filter()`

筛选所有符合条件的元素，返回新数组。

```js
const a = [5, 4, 3, 2, 1];

const result = a.filter(x => x < 3);

console.log(result);
console.log(a);
```

输出：

```txt
[2, 1]
[5, 4, 3, 2, 1]
```

按索引筛选：

```js
const a = [5, 4, 3, 2, 1];

const result = a.filter((value, index) => index % 2 === 0);

console.log(result);
```

输出：

```txt
[5, 3, 1]
```

注意：

```txt
第一个参数是 value。
第二个参数才是 index。
```

### 5.2 `find()`

从左往右找第一个符合条件的元素，返回元素本身。找不到返回 `undefined`。

```js
const a = [1, 2, 3, 4, 5, 10];

const result = a.find(x => x % 5 === 0);

console.log(result);
```

输出：

```txt
5
```

### 5.3 `findIndex()`

从左往右找第一个符合条件的元素，返回它的索引。找不到返回 `-1`。

```js
const a = [1, 2, 3, 4, 5];

const index = a.findIndex(x => x === 3);

console.log(index);
```

输出：

```txt
2
```

### 5.4 `findLast()`

从右往左找第一个符合条件的元素，返回元素本身。找不到返回 `undefined`。

```js
const users = [
  { id: 1, role: "admin" },
  { id: 2, role: "user" },
  { id: 3, role: "admin" }
];

const result = users.findLast(user => user.role === "admin");

console.log(result);
```

输出：

```txt
{ id: 3, role: "admin" }
```

### 5.5 `findLastIndex()`

从右往左找第一个符合条件的元素，返回它的索引。找不到返回 `-1`。

```js
const users = [
  { id: 1, role: "admin" },
  { id: 2, role: "user" },
  { id: 3, role: "admin" }
];

const index = users.findLastIndex(user => user.role === "admin");

console.log(index);
```

输出：

```txt
2
```

### 5.6 四个查找方法对比

| 方法 | 查找方向 | 找到后返回 | 找不到返回 |
|---|---|---|---|
| `find()` | 从左往右 | 元素值 | `undefined` |
| `findIndex()` | 从左往右 | 索引 | `-1` |
| `findLast()` | 从右往左 | 元素值 | `undefined` |
| `findLastIndex()` | 从右往左 | 索引 | `-1` |

---

## 6. 判断类方法

### 6.1 `some()`

至少有一个元素符合条件，就返回 `true`。

```js
const a = [1, 2, 3, 4, 5];

console.log(a.some(x => x % 2 === 0));
console.log(a.some(x => x > 10));
```

输出：

```txt
true
false
```

机制：

```txt
some 遇到第一个 true 就停止。
全部是 false 才返回 false。
```

### 6.2 `every()`

所有元素都符合条件，才返回 `true`。

```js
const a = [1, 2, 3, 4, 5];

console.log(a.every(x => x < 10));
console.log(a.every(x => x % 2 === 0));
```

输出：

```txt
true
false
```

机制：

```txt
every 遇到第一个 false 就停止。
全部是 true 才返回 true。
```

### 6.3 空数组上的 `some()` 和 `every()`

```js
const empty = [];

console.log(empty.every(x => x > 0));
console.log(empty.some(x => x > 0));
```

输出：

```txt
true
false
```

规则：

```txt
空数组 every 返回 true。
空数组 some 返回 false。
```

---

## 7. 归并类方法

### 7.1 `reduce()`

把数组归并成一个结果。

```js
const numbers = [1, 2, 3, 4];

const total = numbers.reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

console.log(total);
```

输出：

```txt
10
```

执行过程：

| 次数 | accumulator | value | return |
|---:|---:|---:|---:|
| 1 | `0` | `1` | `1` |
| 2 | `1` | `2` | `3` |
| 3 | `3` | `3` | `6` |
| 4 | `6` | `4` | `10` |

### 7.2 用 `reduce()` 统计次数

```js
const names = ["Alice", "Bob", "Alice", "Carol", "Bob", "Alice"];

const count = names.reduce((result, name) => {
  if (result[name] === undefined) {
    result[name] = 1;
  } else {
    result[name] += 1;
  }

  return result;
}, {});

console.log(count);
```

输出：

```txt
{ Alice: 3, Bob: 2, Carol: 1 }
```

为什么判断 `undefined`：

```txt
第一次遇到这个名字时，result[name] 不存在，读取结果是 undefined。
必须先初始化为 1。
否则 undefined + 1 会得到 NaN。
```

更短写法：

```js
const names = ["Alice", "Bob", "Alice", "Carol", "Bob", "Alice"];

const count = names.reduce((result, name) => {
  result[name] = (result[name] ?? 0) + 1;
  return result;
}, {});

console.log(count);
```

### 7.3 `reduceRight()`

从右往左归并。

```js
const values = ["a", "b", "c"];

const left = values.reduce((result, value) => result + value, "");
const right = values.reduceRight((result, value) => result + value, "");

console.log(left);
console.log(right);
```

输出：

```txt
abc
cba
```

---

## 8. 添加和删除元素

### 8.1 `push()`

在末尾添加元素，修改原数组，返回新长度。

```js
const a = [1, 2];

const length = a.push(3, 4);

console.log(a);
console.log(length);
```

输出：

```txt
[1, 2, 3, 4]
4
```

### 8.2 `pop()`

删除末尾元素，修改原数组，返回被删除的元素。

```js
const a = [1, 2, 3];

const removed = a.pop();

console.log(a);
console.log(removed);
```

输出：

```txt
[1, 2]
3
```

### 8.3 `shift()`

删除开头元素，修改原数组，返回被删除的元素。

```js
const a = [1, 2, 3];

const removed = a.shift();

console.log(a);
console.log(removed);
```

输出：

```txt
[2, 3]
1
```

### 8.4 `unshift()`

在开头添加元素，修改原数组，返回新长度。

```js
const a = [2, 3];

const length = a.unshift(0, 1);

console.log(a);
console.log(length);
```

输出：

```txt
[0, 1, 2, 3]
4
```

---

## 9. 子数组与结构修改

### 9.1 `slice()`

截取子数组，返回新数组，不修改原数组。

```js
const numbers = [10, 20, 30, 40, 50];

const result = numbers.slice(1, 4);

console.log(result);
console.log(numbers);
```

输出：

```txt
[20, 30, 40]
[10, 20, 30, 40, 50]
```

规则：

```txt
slice(start, end)
包含 start，不包含 end。
```

省略 `end`：

```js
const numbers = [10, 20, 30, 40, 50];

console.log(numbers.slice(2));
```

输出：

```txt
[30, 40, 50]
```

负数参数：

```js
const numbers = [10, 20, 30, 40, 50];

console.log(numbers.slice(-2));
console.log(numbers.slice(1, -1));
```

输出：

```txt
[40, 50]
[20, 30, 40]
```

复制数组：

```js
const a = [1, 2, 3];
const copy = a.slice();

console.log(copy);
console.log(copy === a);
```

输出：

```txt
[1, 2, 3]
false
```

### 9.2 `splice()`

删除、插入、替换。会修改原数组。返回被删除元素组成的新数组。

删除：

```js
const a = [10, 20, 30, 40, 50];

const removed = a.splice(1, 2);

console.log(a);
console.log(removed);
```

输出：

```txt
[10, 40, 50]
[20, 30]
```

插入：

```js
const a = [10, 40, 50];

const removed = a.splice(1, 0, 20, 30);

console.log(a);
console.log(removed);
```

输出：

```txt
[10, 20, 30, 40, 50]
[]
```

替换：

```js
const a = [10, 20, 30, 40];

const removed = a.splice(1, 2, 200, 300);

console.log(a);
console.log(removed);
```

输出：

```txt
[10, 200, 300, 40]
[20, 30]
```

关键规则：

```txt
splice() 的返回值永远是被删除的元素数组，不是修改后的数组。
```

### 9.3 `slice()` vs `splice()`

| 方法 | 是否修改原数组 | 第二个参数含义 | 返回值 |
|---|---:|---|---|
| `slice(start, end)` | 否 | 结束索引，不包含 | 截取出的新数组 |
| `splice(start, deleteCount, ...items)` | 是 | 删除数量 | 被删除元素组成的新数组 |

---

## 10. 扁平化与拼接

### 10.1 `concat()`

拼接数组或值，返回新数组，不修改原数组。

```js
const a = [1, 2];
const b = [3, 4];

const result = a.concat(b, 5);

console.log(result);
console.log(a);
```

输出：

```txt
[1, 2, 3, 4, 5]
[1, 2]
```

### 10.2 `flat()`

展开嵌套数组，返回新数组，不修改原数组。

```js
const a = [1, [2, 3], [4, [5, 6]]];

console.log(a.flat(1));
console.log(a.flat(2));
```

输出：

```txt
[1, 2, 3, 4, [5, 6]]
[1, 2, 3, 4, 5, 6]
```

注意：

```txt
flat(n) 的 n 表示展开嵌套深度，不表示数组个数。
```

真正三层嵌套：

```js
const a = [1, [2, [3, [4]]]];

console.log(a.flat(1));
console.log(a.flat(2));
console.log(a.flat(3));
```

输出：

```txt
[1, 2, [3, [4]]]
[1, 2, 3, [4]]
[1, 2, 3, 4]
```

### 10.3 `flatMap()`

先 `map()`，再 `flat(1)`。

```js
const sentences = ["hello world", "good morning"];

const words = sentences.flatMap(sentence => sentence.split(" "));

console.log(words);
```

输出：

```txt
["hello", "world", "good", "morning"]
```

---

## 11. 搜索与包含判断

### 11.1 `indexOf()`

从左往右找指定值，返回索引。找不到返回 `-1`。

```js
const a = [10, 20, 30, 20, 10];

console.log(a.indexOf(20));
console.log(a.indexOf(99));
```

输出：

```txt
1
-1
```

### 11.2 `lastIndexOf()`

从右往左找指定值，返回索引。找不到返回 `-1`。

```js
const a = [10, 20, 30, 20, 10];

console.log(a.lastIndexOf(20));
console.log(a.lastIndexOf(99));
```

输出：

```txt
3
-1
```

### 11.3 `includes()`

判断是否包含指定值，返回布尔值。

```js
const a = [10, 20, 30];

console.log(a.includes(20));
console.log(a.includes(99));
```

输出：

```txt
true
false
```

### 11.4 `includes()` 和 `indexOf()` 对 `NaN` 的区别

```js
const a = [NaN];

console.log(a.indexOf(NaN));
console.log(a.includes(NaN));
```

输出：

```txt
-1
true
```

原因：

```txt
NaN === NaN 是 false。
indexOf 找不到 NaN。
includes 可以判断 NaN。
```

### 11.5 查对象内容要用 `find()` 或 `findIndex()`

```js
const users = [{ id: 1 }, { id: 2 }];

console.log(users.indexOf({ id: 1 }));
```

输出：

```txt
-1
```

原因：对象比较的是引用，不是内容。

正确：

```js
const users = [{ id: 1 }, { id: 2 }];

const user = users.find(item => item.id === 1);
const index = users.findIndex(item => item.id === 1);

console.log(user);
console.log(index);
```

输出：

```txt
{ id: 1 }
0
```

---

## 12. 排序与反转

### 12.1 `sort()`

排序，会修改原数组，并返回原数组引用。

默认 `sort()` 是字符串排序，不是数字排序。

```js
const numbers = [1, 1999, 2];

numbers.sort();

console.log(numbers);
```

输出：

```txt
[1, 1999, 2]
```

原因：默认排序会先转字符串：

```txt
1    -> "1"
1999 -> "1999"
2    -> "2"
```

然后逐字符比较：

```txt
"1" < "1999" < "2"
```

所以 `1999` 会排在 `2` 前面。

数字升序必须写比较函数：

```js
const numbers = [1, 1999, 2];

numbers.sort((a, b) => a - b);

console.log(numbers);
```

输出：

```txt
[1, 2, 1999]
```

数字降序：

```js
const numbers = [1, 1999, 2];

numbers.sort((a, b) => b - a);

console.log(numbers);
```

输出：

```txt
[1999, 2, 1]
```

对象数组排序：

```js
const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 20 },
  { name: "Carol", age: 25 }
];

users.sort((a, b) => a.age - b.age);

console.log(users);
```

输出：

```txt
[
  { name: "Bob", age: 20 },
  { name: "Carol", age: 25 },
  { name: "Alice", age: 30 }
]
```

不想修改原数组时：

```js
const numbers = [3, 1, 2];

const sorted = numbers.slice().sort((a, b) => a - b);

console.log(numbers);
console.log(sorted);
```

输出：

```txt
[3, 1, 2]
[1, 2, 3]
```

### 12.2 `reverse()`

反转数组，会修改原数组，并返回原数组引用。

```js
const a = [1, 2, 3];

const result = a.reverse();

console.log(a);
console.log(result);
console.log(a === result);
```

输出：

```txt
[3, 2, 1]
[3, 2, 1]
true
```

不想修改原数组：

```js
const a = [1, 2, 3];

const result = a.slice().reverse();

console.log(a);
console.log(result);
```

输出：

```txt
[1, 2, 3]
[3, 2, 1]
```

---

## 13. 填充与内部复制

### 13.1 `fill()`

用固定值填充数组，会修改原数组。

```js
const a = new Array(5);

a.fill(0);

console.log(a);
```

输出：

```txt
[0, 0, 0, 0, 0]
```

指定范围：

```js
const a = [1, 2, 3, 4, 5];

a.fill(0, 1, 4);

console.log(a);
```

输出：

```txt
[1, 0, 0, 0, 5]
```

对象引用共享问题：

```js
const rows = new Array(3).fill([]);

rows[0].push(1);

console.log(rows);
```

输出：

```txt
[[1], [1], [1]]
```

正确创建独立数组：

```js
const rows = Array.from({ length: 3 }, () => []);

rows[0].push(1);

console.log(rows);
```

输出：

```txt
[[1], [], []]
```

### 13.2 `copyWithin()`

把数组内部的一段复制到另一个位置，会修改原数组。

```js
const a = [1, 2, 3, 4, 5];

a.copyWithin(0, 3);

console.log(a);
```

输出：

```txt
[4, 5, 3, 4, 5]
```

规则：

```txt
copyWithin(target, start, end)
复制 start 到 end 之前的元素，覆盖到 target 开始的位置。
```

---

## 14. 数组转字符串

### 14.1 `join()`

用分隔符连接数组元素，返回字符串。

```js
const a = [1, 2, 3];

console.log(a.join());
console.log(a.join("-"));
console.log(a.join(""));
```

输出：

```txt
1,2,3
1-2-3
123
```

`null` 和 `undefined` 会被当成空字符串：

```js
const a = [1, null, undefined, 4];

console.log(a.join("-"));
```

输出：

```txt
1---4
```

### 14.2 `toString()`

基本等价于不传参数的 `join()`。

```js
const a = [1, 2, 3];

console.log(a.toString());
console.log(a.join());
```

输出：

```txt
1,2,3
1,2,3
```

### 14.3 `toLocaleString()`

按本地化规则转字符串。初学阶段认识即可。

```js
const prices = [1234.5, 6789.01];

console.log(prices.toLocaleString());
```

不同环境输出可能不同。

---

## 15. 稀疏数组与空槽

稀疏数组不是正常开发中推荐主动使用的结构，但必须知道它的行为。

### 15.1 连续逗号会创建空槽

```js
const sparse = [1, 3, 5, , 9];

console.log(sparse);
console.log(sparse[3]);
console.log(3 in sparse);
```

输出类似：

```txt
[1, 3, 5, empty, 9]
undefined
false
```

注意：

```txt
空槽不是 undefined。
读取空槽结果是 undefined，但这个索引属性不存在。
```

### 15.2 `undefined` 元素和空槽不同

```js
const sparse = [1, , 3];
const dense = [1, undefined, 3];

console.log(1 in sparse);
console.log(1 in dense);
```

输出：

```txt
false
true
```

### 15.3 数组方法会跳过空槽

```js
const sparse = [1, , 3];

sparse.forEach((value, index) => {
  console.log(index, value);
});
```

输出：

```txt
0 1
2 3
```

`filter()` 可以清理空槽：

```js
const sparse = [1, , 3];

const dense = sparse.filter(() => true);

console.log(dense);
```

输出：

```txt
[1, 3]
```

### 15.4 正常开发中避免主动创建稀疏数组

避免：

```js
const a = [1, , 3];
```

避免：

```js
const a = [1, 2, 3];

delete a[1];
```

如果要删除数组元素，用：

```js
const a = [1, 2, 3];

const result = a.filter(value => value !== 2);

console.log(result);
```

输出：

```txt
[1, 3]
```

或者：

```js
const a = [1, 2, 3];

a.splice(1, 1);

console.log(a);
```

输出：

```txt
[1, 3]
```

---

## 16. 高频错误总结

### 16.1 忘记 `map()` 和 `filter()` 返回新数组

错误：

```js
const a = [1, 2, 3];

a.map(x => x * x);

console.log(a);
```

输出：

```txt
[1, 2, 3]
```

正确：

```js
const a = [1, 2, 3];

const result = a.map(x => x * x);

console.log(result);
```

### 16.2 箭头函数用了 `{}` 但忘记 `return`

错误：

```js
const a = [1, 2, 3, 4];

const result = a.filter(x => {
  x > 2;
});

console.log(result);
```

输出：

```txt
[]
```

正确：

```js
const a = [1, 2, 3, 4];

const result = a.filter(x => {
  return x > 2;
});

console.log(result);
```

### 16.3 把参数名当参数含义

错误理解：

```js
const a = [10, 20, 30];

const result = a.findIndex(index => index === 1);

console.log(result);
```

输出：

```txt
-1
```

原因：这里的 `index` 是当前元素值，不是索引。

正确：

```js
const a = [10, 20, 30];

const result = a.findIndex((value, index) => index === 1);

console.log(result);
```

### 16.4 混淆 `slice()` 和 `splice()`

```txt
slice 不修改原数组，返回截取的新数组。
splice 修改原数组，返回被删除元素数组。
```

### 16.5 数字数组直接使用默认 `sort()`

错误：

```js
const numbers = [1, 1999, 2];

numbers.sort();

console.log(numbers);
```

输出：

```txt
[1, 1999, 2]
```

正确：

```js
const numbers = [1, 1999, 2];

numbers.sort((a, b) => a - b);

console.log(numbers);
```

### 16.6 `reduce()` 忘记初始值

空数组会报错：

```js
const numbers = [];

const total = numbers.reduce((sum, value) => sum + value);

console.log(total);
```

稳定写法：

```js
const numbers = [];

const total = numbers.reduce((sum, value) => sum + value, 0);

console.log(total);
```

### 16.7 `fill()` 填对象导致共享引用

错误：

```js
const rows = new Array(3).fill([]);

rows[0].push(1);

console.log(rows);
```

输出：

```txt
[[1], [1], [1]]
```

正确：

```js
const rows = Array.from({ length: 3 }, () => []);

rows[0].push(1);

console.log(rows);
```

---

## 17. 学习优先级

### 第一优先级：必须熟练

```txt
map()
filter()
find()
findIndex()
some()
every()
reduce()
slice()
splice()
sort()
includes()
Array.from()
```

### 第二优先级：经常会用

```txt
forEach()
push()
pop()
shift()
unshift()
concat()
flat()
flatMap()
join()
Array.isArray()
```

### 第三优先级：认识即可

```txt
reduceRight()
copyWithin()
toLocaleString()
Array.of()
findLast()
findLastIndex()
```

---

## 最终记忆模型

```txt
我要把每个元素变成新值：map
我要筛选元素：filter
我要找第一个：find
我要找第一个的位置：findIndex
我要找最后一个：findLast
我要找最后一个的位置：findLastIndex
我要判断是否存在：some / includes
我要判断是否全部满足：every
我要累计成一个结果：reduce
我要截取一段：slice
我要删除、插入、替换：splice
我要排序：sort
我要反转：reverse
我要拼接：concat 或扩展语法
我要展开嵌套：flat / flatMap
我要生成数组：Array.from
我要判断数组：Array.isArray
```

