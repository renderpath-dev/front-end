# JavaScript 标准库 Cheatsheet v1

> 范围：对应 `javascript-standard-library-learning-guide-zh-v3-api-complete.md`。  
> 用途：完成第 11 章训练后快速复习。  
> 原则：不要只背 API 名字。每次使用标准库 API，都先判断：点号左边是谁、内部数据模型是什么、返回值是什么、是否修改原对象、缺失值如何表示。

---

## 目录

1. [总览：标准库到底在解决什么问题](#1-总览标准库到底在解决什么问题)
2. [标准库对象分类](#2-标准库对象分类)
3. [Set：唯一值集合](#3-set唯一值集合)
4. [Map：真实键值映射](#4-map真实键值映射)
5. [WeakMap / WeakSet：弱集合](#5-weakmap--weakset弱集合)
6. [ArrayBuffer / TypedArray / DataView：二进制数据](#6-arraybuffer--typedarray--dataview二进制数据)
7. [RegExp：文本模式匹配](#7-regexp文本模式匹配)
8. [Date：时间点和时间戳](#8-date时间点和时间戳)
9. [Error：结构化失败对象](#9-error结构化失败对象)
10. [JSON：序列化和解析](#10-json序列化和解析)
11. [Intl：国际化格式化](#11-intl国际化格式化)
12. [console：运行时观察工具](#12-console运行时观察工具)
13. [URL / URLSearchParams：结构化地址](#13-url--urlsearchparams结构化地址)
14. [Timer：setTimeout / setInterval](#14-timersettimeout--setinterval)
15. [小项目补充 API：Object.fromEntries / Number / Number.isFinite](#15-小项目补充-apiobjectfromentries--number--numberisfinite)
16. [同名方法最终对照表](#16-同名方法最终对照表)
17. [最终要能回答的问题](#17-最终要能回答的问题)
18. [MDN 阅读清单](#18-mdn-阅读清单)
19. [最终记忆模型](#19-最终记忆模型)

---

## 1. 总览：标准库到底在解决什么问题

### 结论

标准库不是语法糖，而是 JavaScript 已经内置好的数据结构、数据格式、文本处理、时间处理、错误处理、调试工具、URL 工具和调度工具。

| 问题 | 优先工具 |
|---|---|
| 需要唯一性 | `Set` |
| 需要键值查找 | `Map` |
| 需要对象私有元数据 | `WeakMap` |
| 需要记录对象是否处理过 | `WeakSet` |
| 需要原始字节 | `ArrayBuffer` |
| 需要把字节解释为固定数值元素 | `TypedArray` |
| 需要精确按字节偏移读写 | `DataView` |
| 需要文本模式匹配 | `RegExp` |
| 需要表示一个时间点 | `Date` |
| 需要表示失败 | `Error` |
| 需要数据交换文本 | `JSON` |
| 需要用户可见格式化 | `Intl` |
| 需要观察运行时状态 | `console` |
| 需要结构化 URL | `URL` / `URLSearchParams` |
| 需要延迟或重复执行 | `setTimeout()` / `setInterval()` |

### 学习标准库时固定问六件事

```txt
1. 这个 API 解决什么数据问题？
2. 它的内部数据模型是什么？
3. 点号左边是谁？
4. 这个名字是属性、方法、构造函数、静态方法，还是参数？
5. 它返回什么？
6. 它会不会修改已有对象？
```

---

## 2. 标准库对象分类

### 构造函数创建对象

| 写法 | 创建什么 |
|---|---|
| `new Set(iterable?)` | 唯一值集合 |
| `new Map(iterable?)` | 键值映射 |
| `new WeakMap(iterable?)` | 弱键映射 |
| `new WeakSet(iterable?)` | 弱值集合 |
| `new ArrayBuffer(byteLength)` | 原始字节存储 |
| `new DataView(buffer, byteOffset?, byteLength?)` | 二进制读写视图 |
| `new Date(value?)` | 时间点对象 |
| `new Error(message?, options?)` | 错误对象 |
| `new URL(url, base?)` | 结构化 URL 对象 |
| `new URLSearchParams(init?)` | 查询参数对象 |
| `new Intl.NumberFormat(locales?, options?)` | 数字格式化器 |
| `new Intl.DateTimeFormat(locales?, options?)` | 日期时间格式化器 |
| `new Intl.Collator(locales?, options?)` | 本地化字符串比较器 |

### 字面量创建对象

| 写法 | 创建什么 |
|---|---|
| `/pattern/flags` | `RegExp` 对象 |

### 命名空间对象

| 对象 | 典型 API |
|---|---|
| `JSON` | `JSON.stringify()`, `JSON.parse()` |
| `Intl` | `Intl.NumberFormat`, `Intl.DateTimeFormat`, `Intl.Collator` |
| `Object` | `Object.fromEntries()` |
| `Number` | `Number.isFinite()` |
| `console` | `console.log()`, `console.table()`, `console.time()` |

### 宿主环境 API

| API | 说明 |
|---|---|
| `console` | 浏览器和 Node 都常见，但属于宿主环境观察工具 |
| `URL` / `URLSearchParams` | 浏览器和 Node 都广泛支持 |
| `setTimeout()` / `setInterval()` | 宿主环境提供的调度 API |

---

## 3. Set：唯一值集合

### 技术意义

`Set` 的核心是成员关系：某个值是否存在。它不是按索引存储，不是 key-value mapping，也不会按对象结构去重。

### 数据模型

```txt
Set:
  value -> exists or not
```

对原始值，重复判断按值。对对象，重复判断按引用身份。

### API 速查

| API | 类型 | 参数 | 返回值 | 是否修改原 Set | 作用 |
|---|---|---|---|---|---|
| `new Set(iterable?)` | constructor | 可迭代对象 | `Set` | 否 | 创建集合 |
| `set.size` | property | 无 | `number` | 否 | 唯一值数量 |
| `set.add(value)` | method | `value` | 当前 `Set` | 是 | 添加值 |
| `set.has(value)` | method | `value` | `boolean` | 否 | 判断值是否存在 |
| `set.delete(value)` | method | `value` | `boolean` | 是 | 删除值，成功返回 `true` |
| `set.clear()` | method | 无 | `undefined` | 是 | 清空集合 |
| `set.values()` | method | 无 | iterator | 否 | 按插入顺序遍历值 |
| `set.keys()` | method | 无 | iterator | 否 | 与 `values()` 相同 |
| `set.entries()` | method | 无 | iterator | 否 | 每项是 `[value, value]` |
| `set.forEach(callbackFn)` | method | function | `undefined` | 否 | 遍历每个值 |

### 关键点

| 判断点 | 结论 |
|---|---|
| 是否保留顺序 | 保留第一次插入顺序 |
| 是否有索引 | 没有 |
| 是否有 `size()` | 没有，`size` 是属性 |
| 是否可以结构化去重对象 | 不可以 |
| `add()` 返回什么 | 当前 `Set`，所以可以链式调用 |
| `delete()` 找不到是否报错 | 不报错，返回 `false` |

### 常见坑

| 错误 | 正确模型 |
|---|---|
| `set.size()` | `size` 是属性：`set.size` |
| `set.entries()` 返回普通数组 | 返回 iterator，需要 `Array.from(set.entries())` |
| 两个对象内容一样就会去重 | 对象按引用身份比较 |
| `delete()` 找不到值会报错 | 不报错，返回 `false` |

### 项目用途

```txt
去重标签
去重分类
记录已访问 id
判断权限是否存在
从数组生成唯一值列表
```

---

## 4. Map：真实键值映射

### 技术意义

`Map` 的核心是：任意值都可以作为 key。普通对象的属性名主要是字符串或符号，`Map` 的 key 是真实值。

### 数据模型

```txt
Map:
  actualKeyValue -> storedValue
```

### API 速查

| API | 类型 | 参数 | 返回值 | 是否修改原 Map | 作用 |
|---|---|---|---|---|---|
| `new Map(iterable?)` | constructor | entries iterable | `Map` | 否 | 创建映射 |
| `map.size` | property | 无 | `number` | 否 | entry 数量 |
| `map.set(key, value)` | method | key, value | 当前 `Map` | 是 | 写入或覆盖 entry |
| `map.get(key)` | method | key | value 或 `undefined` | 否 | 读取值 |
| `map.has(key)` | method | key | `boolean` | 否 | 判断 key 是否存在 |
| `map.delete(key)` | method | key | `boolean` | 是 | 删除 entry |
| `map.clear()` | method | 无 | `undefined` | 是 | 清空所有 entry |
| `map.entries()` | method | 无 | iterator | 否 | 遍历 `[key, value]` |
| `map.keys()` | method | 无 | iterator | 否 | 遍历 key |
| `map.values()` | method | 无 | iterator | 否 | 遍历 value |
| `map.forEach(callbackFn)` | method | function | `undefined` | 否 | 遍历 entry |

### 缺失值判断

```txt
map.get(key) 返回 undefined，不一定表示 key 不存在。
value 本身也可能是 undefined。
判断 key 是否存在必须用 map.has(key)。
```

### 默认迭代

```txt
for...of map 等价于 for...of map.entries()
每一项是 [key, value]
```

### Map 和普通对象对比

| 对比点 | 普通对象 | `Map` |
|---|---|---|
| key 类型 | 字符串 / 符号为主 | 任意值 |
| 写入 | `object[key] = value` | `map.set(key, value)` |
| 读取 | `object[key]` | `map.get(key)` |
| 数量 | 手动统计或 `Object.keys()` | `map.size` |
| 迭代 | `Object.entries()` | 默认可迭代 |
| 对象 key | 会变成字符串属性名 | 保留对象引用身份 |

### 常见坑

| 错误 | 正确模型 |
|---|---|
| `map[key] = value` 写入 Map entry | 这只是给 Map 对象加普通属性 |
| `map.get(key) === undefined` 说明 key 不存在 | 不一定，要用 `map.has(key)` |
| `set(key, undefined)` 等于删除 | 不等于，entry 仍然存在 |
| `delete map.key` 等于 `map.delete(key)` | 不一样，前者是对象属性删除 |
| 对象 key 按内容比较 | 对象 key 按引用身份比较 |

### 项目用途

```txt
缓存接口结果
统计词频或访问次数
用对象作为元数据 key
维护运行时 registry
保存顺序稳定的键值表
```

---

## 5. WeakMap / WeakSet：弱集合

### 技术意义

`WeakMap` / `WeakSet` 用来把信息关联到对象，同时不因为这个关联阻止对象被垃圾回收。

### 数据模型

```txt
WeakMap:
  objectKey weakly -> value

WeakSet:
  objectValue weakly -> exists or not
```

### WeakMap API

| API | 参数要求 | 返回值 | 作用 |
|---|---|---|---|
| `new WeakMap(iterable?)` | entries iterable | `WeakMap` | 创建弱映射 |
| `weakMap.set(key, value)` | key 必须是对象或非注册符号 | 当前 `WeakMap` | 保存对象关联数据 |
| `weakMap.get(key)` | key 必须是对象或非注册符号 | value 或 `undefined` | 读取关联数据 |
| `weakMap.has(key)` | key 必须是对象或非注册符号 | `boolean` | 判断是否有关联 |
| `weakMap.delete(key)` | key 必须是对象或非注册符号 | `boolean` | 删除关联 |

### WeakSet API

| API | 参数要求 | 返回值 | 作用 |
|---|---|---|---|
| `new WeakSet(iterable?)` | iterable values | `WeakSet` | 创建弱集合 |
| `weakSet.add(value)` | value 必须是对象或非注册符号 | 当前 `WeakSet` | 记录对象 |
| `weakSet.has(value)` | value 必须是对象或非注册符号 | `boolean` | 判断对象是否被记录 |
| `weakSet.delete(value)` | value 必须是对象或非注册符号 | `boolean` | 删除记录 |

### 为什么不能遍历

```txt
WeakMap 没有 size。
WeakMap 没有 keys() / values() / entries()。
WeakSet 没有 size。
WeakSet 不可迭代。
```

原因：弱引用条目可能随着垃圾回收随时消失，暴露数量或遍历结果会破坏弱集合语义。

### 常见坑

| 错误 | 正确模型 |
|---|---|
| 用字符串当 WeakMap key | key 必须是对象或非注册符号 |
| 想遍历 WeakMap | WeakMap 不支持枚举 |
| 想统计 WeakSet 数量 | WeakSet 没有 `size` |
| 把 WeakMap 当普通缓存表 | 需要枚举缓存就用 `Map` |

### 项目用途

```txt
DOM 节点元数据
对象私有状态
库内部状态表
记录对象是否已处理
防止对象关联造成内存泄漏
```

---

## 6. ArrayBuffer / TypedArray / DataView：二进制数据

### 技术意义

普通数组保存 JavaScript 值。二进制 API 处理原始字节，适合文件、网络协议、图像、音频、WebAssembly、Canvas 像素等场景。

### 三层模型

```txt
ArrayBuffer owns bytes.
TypedArray interprets bytes as fixed-size numeric elements.
DataView reads and writes bytes with explicit type and byte order.
```

### ArrayBuffer

| API | 类型 | 返回值 / 含义 |
|---|---|---|
| `new ArrayBuffer(byteLength)` | constructor | 创建固定字节长度的 buffer |
| `arrayBuffer.byteLength` | property | buffer 总字节数 |

### TypedArray 常见类型

```txt
Int8Array
Uint8Array
Uint8ClampedArray
Int16Array
Uint16Array
Int32Array
Uint32Array
Float32Array
Float64Array
BigInt64Array
BigUint64Array
```

### TypedArray 固定属性 / 方法

| API | 类型 | 含义 |
|---|---|---|
| `typedArray.length` | property | 元素个数 |
| `typedArray.byteLength` | property | 当前视图覆盖的字节数 |
| `typedArray.byteOffset` | property | 当前视图从 buffer 第几个字节开始 |
| `typedArray.buffer` | property | 背后的 `ArrayBuffer` |
| `typedArray.BYTES_PER_ELEMENT` | property | 每个元素占多少字节 |
| `typedArray.set(sourceArray, offset?)` | method | 批量复制元素 |
| `typedArray.subarray(begin?, end?)` | method | 返回同一 buffer 上的新视图 |
| `typedArray.slice(begin?, end?)` | method | 复制出新 typed array |

### DataView 常用 API

| API | 参数 | 返回值 / 作用 |
|---|---|---|
| `new DataView(buffer, byteOffset?, byteLength?)` | buffer, offset, length | 创建灵活视图 |
| `getUint8(byteOffset)` | byteOffset | 读 1 字节无符号整数 |
| `getInt8(byteOffset)` | byteOffset | 读 1 字节有符号整数 |
| `getUint16(byteOffset, littleEndian?)` | offset, endian | 读 2 字节无符号整数 |
| `getInt16(byteOffset, littleEndian?)` | offset, endian | 读 2 字节有符号整数 |
| `setUint8(byteOffset, value)` | offset, value | 写 1 字节无符号整数 |
| `setInt8(byteOffset, value)` | offset, value | 写 1 字节有符号整数 |
| `setUint16(byteOffset, value, littleEndian?)` | offset, value, endian | 写 2 字节无符号整数 |
| `setInt16(byteOffset, value, littleEndian?)` | offset, value, endian | 写 2 字节有符号整数 |

### 字节序

| 参数 | 含义 |
|---|---|
| `littleEndian = false` | big-endian |
| `littleEndian = true` | little-endian |

写入和读取多字节数值时必须使用一致的字节序，否则读回值会变。

### 常见坑

| 错误 | 正确模型 |
|---|---|
| `ArrayBuffer` 可以直接按索引读写 | 必须通过 view |
| `byteLength` 和 `length` 一样 | 一个是字节数，一个是元素数 |
| `setUint16()` 写一个字节 | `Uint16` 写两个字节 |
| 写入和读取字节序不一致 | 读回数值会不同 |
| TypedArray 的 `set()` 和 Map 的 `set()` 一样 | TypedArray 的 `set()` 是批量复制元素 |

---

## 7. RegExp：文本模式匹配

### 技术意义

`RegExp` 用于按模式匹配、验证、提取、替换或切分文本。它不是普通字符串查找，而是模式匹配器。

### 创建方式

| 写法 | 场景 |
|---|---|
| `/pattern/flags` | 模式固定，优先使用 |
| `new RegExp(pattern, flags?)` | 模式来自运行时字符串 |

### 常见 flags

| flag | 含义 |
|---|---|
| `g` | 全局搜索 |
| `i` | 忽略大小写 |
| `m` | 多行模式 |
| `s` | 点号匹配换行符 |
| `u` | Unicode 感知匹配 |
| `y` | 粘连搜索 |
| `d` | 返回匹配索引 |

### API / 属性

| API | 类型 | 返回值 | 说明 |
|---|---|---|---|
| `regExp.test(text)` | method | `boolean` | 判断是否匹配 |
| `regExp.exec(text)` | method | match array 或 `null` | 返回匹配细节和捕获组 |
| `regExp.source` | property | `string` | 正则源模式文本，不含 `/.../` |
| `regExp.flags` | property | `string` | flag 字符串 |
| `regExp.global` | property | `boolean` | 是否有 `g` |
| `regExp.ignoreCase` | property | `boolean` | 是否有 `i` |
| `regExp.multiline` | property | `boolean` | 是否有 `m` |
| `regExp.dotAll` | property | `boolean` | 是否有 `s` |
| `regExp.unicode` | property | `boolean` | 是否有 `u` |
| `regExp.sticky` | property | `boolean` | 是否有 `y` |
| `regExp.lastIndex` | property | `number` | 下一次匹配开始位置，`g` / `y` 时尤其重要 |
| `RegExp.escape(text)` | static method | `string` | 转义用户输入文本 |

### `test()` 和 `exec()`

```txt
test() asks: does it match?
exec() asks: what exactly matched?
```

### 捕获组

```txt
matchResult[0] -> 整体匹配
matchResult[1] -> 第一个捕获组
matchResult[2] -> 第二个捕获组
```

### `g` + `test()` 状态陷阱

带 `g` 或 `y` 的正则对象会维护 `lastIndex`。同一个正则对象反复 `test()` 同一字符串时，结果可能交替变化。

### 常见坑

| 错误 | 正确模型 |
|---|---|
| 表单验证时无脑加 `g` | `g` 会让 `test()` 受 `lastIndex` 影响 |
| `exec()` 只返回 true/false | 返回数组或 `null` |
| `source` 包含两边斜杠 | 只包含模式文本 |
| 用户输入可以直接拼进 RegExp | 要先转义 |
| 正则只是字符串查找 | 正则是带语法和状态的模式匹配器 |

### 项目用途

```txt
表单字段验证
路由或 URL 片段提取
日志文本解析
搜索关键字匹配
字符串替换和清理
```

---

## 8. Date：时间点和时间戳

### 技术意义

`Date` 表示一个时间点，内部核心是从 Unix epoch 到该时间点的毫秒数。字符串、年月日、时区显示只是读取或格式化这个时间点的方式。

### 数据模型

```txt
Date stores one instant.
Local methods display it through local time zone rules.
UTC methods display it through UTC rules.
```

### 创建方式

| 写法 | 含义 |
|---|---|
| `new Date()` | 当前时间点 |
| `new Date(dateTimeText)` | 从字符串解析时间点 |
| `new Date(year, monthIndex, day?, hours?, minutes?, seconds?, milliseconds?)` | 按本地时区数字参数创建，月份从 0 开始 |
| `Date.now()` | 当前时间戳，毫秒 number |

### 常用方法

| API | 返回值 | 说明 |
|---|---|---|
| `date.getTime()` | `number` | 当前 Date 对象的时间戳，毫秒 |
| `date.toISOString()` | `string` | UTC ISO 字符串 |
| `date.getFullYear()` | `number` | 本地时区年份 |
| `date.getMonth()` | `number` | 本地时区月份索引，0 到 11 |
| `date.getDate()` | `number` | 本地时区每月第几天，1 到 31 |
| `date.getDay()` | `number` | 本地时区星期几，0 到 6，0 是 Sunday |
| `date.getHours()` | `number` | 本地时区小时 |
| `date.getMinutes()` | `number` | 本地时区分钟 |
| `date.getSeconds()` | `number` | 本地时区秒 |
| `date.getUTCFullYear()` | `number` | UTC 年份 |
| `date.getUTCMonth()` | `number` | UTC 月份索引 |
| `date.getUTCDate()` | `number` | UTC 每月第几天 |
| `date.setDate(day)` | `number` | 修改原 Date，并返回新时间戳 |
| `date.setUTCDate(day)` | `number` | 按 UTC 修改原 Date，并返回新时间戳 |

### 三个高频区别

| API | 返回值 | 含义 |
|---|---|---|
| `Date.now()` | number | 当前时刻的时间戳 |
| `someDate.getTime()` | number | 某个 Date 对象表示时刻的时间戳 |
| `someDate.toISOString()` | string | 某个 Date 对象表示时刻的 UTC ISO 文本 |

### 常见坑

| 错误 | 正确模型 |
|---|---|
| `Date` 内部保存日期字符串 | 内部核心是毫秒时间戳 |
| `getMonth()` 返回 1 到 12 | 返回 0 到 11 |
| `getDate()` 获取 Date 对象 | 返回这个月第几天 |
| `getTime()` 返回秒 | 返回毫秒 |
| `setDate()` 返回新 Date | 修改原对象，返回时间戳 |
| 依赖非标准日期字符串解析 | 优先使用带时区的 ISO 字符串 |

### 项目用途

```txt
保存创建时间
计算过期时间
比较两个时间点
和后端交换 ISO 时间字符串
配合 Intl 做用户界面显示
```

---

## 9. Error：结构化失败对象

### 技术意义

错误对象用于表示异常失败。`throw` 会中断正常执行路径，运行时沿调用栈寻找最近的 `catch`。

### API / 属性

| API | 说明 |
|---|---|
| `new Error(message?, options?)` | 基础错误 |
| `new TypeError(message?, options?)` | 类型不符合要求 |
| `new RangeError(message?, options?)` | 值范围不符合要求 |
| `new SyntaxError(message?, options?)` | 语法或解析失败 |
| `error.name` | 错误类型名称 |
| `error.message` | 错误说明 |
| `error.cause` | 被包装的底层错误 |
| `error.stack` | 调用栈信息，宿主环境提供 |
| `class CustomError extends Error` | 自定义错误类 |
| `super(message)` | 调用父类 Error constructor |

### Error 类型选择

| 场景 | 适合错误 |
|---|---|
| 参数类型不对 | `TypeError` |
| 数值范围不合法 | `RangeError` |
| JSON 解析失败 | `SyntaxError` |
| 业务领域失败 | 自定义 `Error` 子类 |
| 包装底层错误 | `new Error(message, { cause })` |

### 自定义错误类模型

```txt
super(message)
  -> 初始化 Error 基础状态

this.name = 'CustomError'
  -> 设置可读错误类型名称

this.fieldName = fieldName
  -> 保存业务结构化信息
```

### 常见坑

| 错误 | 正确模型 |
|---|---|
| `throw 'failed'` | 抛 `new Error('failed')` |
| 所有错误都用普通 `Error` | 可按失败类型用 `TypeError`、`RangeError` 或自定义类 |
| 包装错误时丢失原始错误 | 用 `cause` 保存底层错误 |
| 只靠 `message` 解析业务信息 | 用自定义属性保存结构化细节 |
| 以为 catch 变量名必须叫 `error` | catch 变量名可以自己起 |
| IDE 不认识 `cause` 就一定不能运行 | 区分运行时支持和静态检查 |

### 项目用途

```txt
解析配置失败
接口响应不合法
表单数据不满足规则
业务状态不允许操作
封装底层错误并向上抛出
```

---

## 10. JSON：序列化和解析

### 技术意义

JSON 是前后端数据交换最常见格式之一，但 JSON 不是 JavaScript 对象。JSON 是文本，数据模型比 JavaScript 小。

### JSON 支持的数据

```txt
object
array
string
number
boolean
null
```

### JSON 不直接支持的 JavaScript 值

```txt
undefined
function
symbol
BigInt
Map
Set
circular reference
```

### API

| API | 参数 | 返回值 | 说明 |
|---|---|---|---|
| `JSON.stringify(value)` | JS value | string 或 `undefined` | 转 JSON 文本 |
| `JSON.stringify(value, replacer)` | function / array / null | string | 过滤或转换属性 |
| `JSON.stringify(value, replacer, space)` | number / string | string | 控制缩进 |
| `JSON.parse(text)` | JSON text | JS value | 解析 JSON 字符串 |
| `JSON.parse(text, reviver)` | function | JS value | 恢复或转换解析后的值 |
| `object.toJSON()` | 无固定签名 | JS value | stringify 时可自定义序列化结果 |

### replacer / reviver / space

| 名称 | 属于哪个 API | 作用 |
|---|---|---|
| `replacer` | `JSON.stringify()` 第二个参数 | 控制哪些值输出或如何转换输出 |
| `space` | `JSON.stringify()` 第三个参数 | 控制缩进格式 |
| `reviver` | `JSON.parse()` 第二个参数 | 控制解析回 JS 值时如何转换 |

### 重要行为

| 输入 | `JSON.stringify()` 行为 |
|---|---|
| 对象属性值是 `undefined` | 该属性被忽略 |
| 对象属性值是 function | 该属性被忽略 |
| 对象属性值是 symbol | 该属性被忽略 |
| 数组元素是 `undefined` | 通常变成 `null` |
| `BigInt` | 抛 `TypeError` |
| 循环引用 | 抛 `TypeError` |
| `Date` | 通常通过 `toJSON()` 转成 ISO 字符串 |
| `Map` / `Set` | 默认不能表达为预期结构，通常需要先转换 |

### 常见坑

| 错误 | 正确模型 |
|---|---|
| JSON 和对象一样 | JSON 是 text；object 是运行时对象 |
| parse 后还是同一个对象 | parse 会创建新对象 |
| Date 会自动恢复成 Date | 通常恢复成字符串，需要 reviver |
| reviver 忘记 `return propertyValue` | 返回 `undefined` 会删除属性 |
| `space` 是对象属性 | `space` 是第三个参数 |
| `JSON.stringify(map)` 得到 Map 内容 | 普通 Map 会变成 `{}`，先转换 |

### 项目用途

```txt
接口请求体
接口响应体
localStorage 保存结构化数据
配置文件
日志输出
前后端数据交换
```

---

## 11. Intl：国际化格式化

### 技术意义

国际化不只是翻译文字，还包括数字分隔符、货币符号、日期顺序、时区、复数规则、排序规则等。用户界面显示货币、日期、百分比、本地排序时优先使用 `Intl`。

### Intl.NumberFormat

| API | 返回值 / 说明 |
|---|---|
| `new Intl.NumberFormat(locales?, options?)` | 创建数字格式化器 |
| `numberFormatter.format(number)` | 返回 string |
| `numberFormatter.resolvedOptions()` | 返回实际配置对象 |

常见 options：

| 属性 | 常见值 | 说明 |
|---|---|---|
| `style` | `'decimal'`, `'currency'`, `'percent'`, `'unit'` | 数字格式类型 |
| `currency` | `'USD'`, `'EUR'`, `'CNY'` | 货币代码 |
| `currencyDisplay` | `'symbol'`, `'code'`, `'name'`, `'narrowSymbol'` | 货币显示方式 |
| `minimumFractionDigits` | number | 最少小数位 |
| `maximumFractionDigits` | number | 最多小数位 |

### Intl.DateTimeFormat

| API | 返回值 / 说明 |
|---|---|
| `new Intl.DateTimeFormat(locales?, options?)` | 创建日期时间格式化器 |
| `dateTimeFormatter.format(date)` | 返回 string |
| `dateTimeFormatter.resolvedOptions()` | 返回实际配置对象 |

常见 options：

| 属性 | 常见值 | 说明 |
|---|---|---|
| `dateStyle` | `'full'`, `'long'`, `'medium'`, `'short'` | 日期格式详细程度 |
| `timeStyle` | `'full'`, `'long'`, `'medium'`, `'short'` | 时间格式详细程度 |
| `timeZone` | IANA time zone name | 显示时区 |
| `year` | `'numeric'`, `'2-digit'` | 年 |
| `month` | `'numeric'`, `'2-digit'`, `'long'`, `'short'`, `'narrow'` | 月 |
| `day` | `'numeric'`, `'2-digit'` | 日 |
| `hour` | `'numeric'`, `'2-digit'` | 小时 |
| `minute` | `'numeric'`, `'2-digit'` | 分钟 |
| `second` | `'numeric'`, `'2-digit'` | 秒 |
| `weekday` | `'long'`, `'short'`, `'narrow'` | 星期 |

### Intl.Collator

| API | 返回值 / 说明 |
|---|---|
| `new Intl.Collator(locales?, options?)` | 创建本地化比较器 |
| `collator.compare(leftText, rightText)` | 返回 number |
| `collator.resolvedOptions()` | 返回实际配置对象 |

常见 options：

| 属性 | 常见值 | 说明 |
|---|---|---|
| `sensitivity` | `'base'`, `'accent'`, `'case'`, `'variant'` | 是否区分重音、大小写等 |
| `numeric` | boolean | 是否按数字意义比较文本中的数字 |
| `caseFirst` | `'upper'`, `'lower'`, `'false'` | 大小写排序优先级 |

### 常见坑

| 错误 | 正确模型 |
|---|---|
| 手写货币符号 | 用 `Intl.NumberFormat` |
| 手写日期格式 | 用 `Intl.DateTimeFormat` |
| 默认 `sort()` 适合所有语言 | 本地化排序用 `Intl.Collator().compare` |
| `format()` 返回 number | 返回 string |
| console 不显示引号，所以不是 string | `console.log()` 打印字符串内容，不显示源码引号 |
| options 属性名可以随便起 | 必须用 API 规定的固定属性名 |
| `compare()` 返回排序后的数组 | 只比较两个字符串，返回 number |

### 项目用途

```txt
金额显示
日期显示
百分比显示
用户语言环境适配
本地化排序
仪表盘和报表展示
```

---

## 12. console：运行时观察工具

### 技术意义

`console` 是运行时观察工具，不是应用程序逻辑。专业调试要验证具体假设，而不是到处打印。

### API 速查

| 方法 | 是否直接打印 | 作用 |
|---|---|---|
| `console.log(...values)` | 是 | 普通输出 |
| `console.info(...values)` | 是 | 信息输出 |
| `console.warn(...values)` | 是 | 警告输出 |
| `console.error(...values)` | 是 | 错误输出 |
| `console.table(data)` | 是 | 表格展示对象或数组 |
| `console.group(label?)` | 是 | 打印分组标题，并开始分组 |
| `console.groupEnd()` | 否 | 结束当前分组 |
| `console.time(label?)` | 否 | 启动计时器 |
| `console.timeEnd(label?)` | 是 | 结束计时器并打印耗时 |
| `console.trace(...values)` | 是 | 打印调用栈 |

### 关键点

```txt
console.time(label) 不打印，只启动计时器。
console.timeEnd(label) 才打印耗时。
console.groupEnd() 不打印，只结束分组。
console.group(label) 打印分组标题。
console.table(data) 只展示，不修改数据。
```

### 常见坑

| 错误 | 正确模型 |
|---|---|
| 到处写 `console.log(everything)` | 输出要验证具体假设 |
| 依赖 console 输出作为业务逻辑 | console 只是诊断工具 |
| `time()` 会打印开始时间 | 不打印 |
| `groupEnd()` 会打印结束标记 | 不打印 |
| 用 console 代替错误处理 | 错误处理应使用返回值、异常或状态机制 |
| 浏览器和 Node console 显示完全一致 | 展示可能不同 |

### 项目用途

```txt
排查作用域
检查模块导入
观察数据流
验证异步执行顺序
查看缓存是否命中
测量某段代码耗时
```

---

## 13. URL / URLSearchParams：结构化地址

### 技术意义

URL 不是字符串拼接题。它包含协议、主机名、路径、查询参数、hash 片段。手动拼接容易破坏编码规则。

### URL 固定属性

| 属性 / 方法 | 返回值 | 说明 |
|---|---|---|
| `url.href` | string | 完整 URL |
| `url.origin` | string | 协议 + 主机 + 端口 |
| `url.protocol` | string | 协议，例如 `'https:'` |
| `url.host` | string | 主机名 + 端口 |
| `url.hostname` | string | 主机名 |
| `url.port` | string | 端口，没有则空字符串 |
| `url.pathname` | string | 路径 |
| `url.search` | string | 查询字符串，包含 `?` |
| `url.searchParams` | `URLSearchParams` | 查询参数对象 |
| `url.hash` | string | fragment，通常包含 `#` |
| `url.toString()` | string | 序列化完整 URL |

### URLSearchParams API

| 方法 | 返回值 | 说明 |
|---|---|---|
| `searchParams.get(name)` | string 或 `null` | 读取第一个同名参数 |
| `searchParams.set(name, value)` | `undefined` | 设置参数，同名旧值被替换 |
| `searchParams.append(name, value)` | `undefined` | 追加参数，允许同名多值 |
| `searchParams.delete(name)` | `undefined` | 删除同名参数 |
| `searchParams.has(name)` | `boolean` | 是否存在参数 |
| `searchParams.entries()` | iterator | 遍历 `[name, value]` |
| `searchParams.keys()` | iterator | 遍历参数名 |
| `searchParams.values()` | iterator | 遍历参数值 |
| `searchParams.toString()` | string | 生成不带 `?` 的 query string |

### `set()` vs `append()`

| API | 同名参数已存在时 |
|---|---|
| `set(name, value)` | 替换 |
| `append(name, value)` | 追加 |

### 缺失值

```txt
URLSearchParams.get(missingName) -> null
Map.get(missingKey) -> undefined
```

### `hash`

`url.hash` 表示 fragment identifier，也就是 `#` 后面的部分。它不是密码学 hash，也不是哈希表。

### 常见坑

| 错误 | 正确模型 |
|---|---|
| 手动拼接查询字符串 | 使用 `URLSearchParams` |
| `get()` 返回 number | 返回 string 或 `null` |
| `Map.get()` 和 `URLSearchParams.get()` 缺失值一样 | Map 是 `undefined`；URLSearchParams 是 `null` |
| `set()` 和 `append()` 一样 | `set()` 替换，`append()` 追加 |
| `hash` 是加密 hash | URL 中是 fragment |
| `searchParams.toString()` 包含 `?` | 不包含 `?` |
| 特殊字符不用编码 | `URLSearchParams` 会处理编码 |

### 项目用途

```txt
构造接口请求地址
读取当前页面查询参数
同步筛选条件到地址栏
生成分享链接
处理分页、排序、搜索参数
```

---

## 14. Timer：setTimeout / setInterval

### 技术意义

定时器不是“暂停当前代码”，而是“注册未来任务”。当前同步代码会继续执行。定时器到期后，回调只是变得可以被调度执行。

### API / 参数签名

| API | 参数 | 返回值 | 作用 |
|---|---|---|---|
| `setTimeout(handler, timeout?, ...arguments)` | handler, timeout | timeout id | 延迟执行一次 |
| `clearTimeout(timeoutId)` | timeout id | `undefined` | 取消尚未执行的 timeout |
| `setInterval(handler, timeout?, ...arguments)` | handler, timeout | interval id | 按间隔重复执行 |
| `clearInterval(intervalId)` | interval id | `undefined` | 取消 interval |

### 参数名说明

| 名称 | 类型 | 说明 |
|---|---|---|
| `handler` | function | 到时间后要执行的 callback |
| `timeout` | number | 最小等待时间，单位 milliseconds |
| `timeoutId` | timer id | `setTimeout()` 返回的取消凭证 |
| `intervalId` | timer id | `setInterval()` 返回的取消凭证 |

### 执行模型

```txt
当前同步代码执行
  -> 注册 timer
  -> 同步代码继续执行
  -> timer 到期
  -> 回调等待运行机会
  -> 调用栈空闲后执行回调
```

### 传函数引用，不要提前调用

正确：

```js
function sendStatusPing() {
  console.log('ping');
}

setTimeout(sendStatusPing, 1000);
```

错误：

```js
setTimeout(sendStatusPing(), 1000);
```

第二种会立刻执行函数，并把返回值传给 `setTimeout()`。

### 什么时候用箭头函数包一层

当你需要传参数或执行多行逻辑：

```js
function sendStatusPingWithTarget(targetText) {
  console.log('ping', targetText);
}

setTimeout(() => {
  sendStatusPingWithTarget('/api/health');
}, 1000);
```

### setInterval vs 递归 setTimeout

| 方式 | 调度模型 | 适合场景 |
|---|---|---|
| `setInterval(callback, delay)` | 一次注册，自动重复 | 简单固定节奏任务 |
| recursive `setTimeout()` | 每次执行后再安排下一次 | 轮询、重试、需要根据结果决定是否继续 |

### 常见坑

| 错误 | 正确模型 |
|---|---|
| `setTimeout(fn, 0)` 立刻执行 | 当前同步代码结束后才有机会执行 |
| `setTimeout()` 会暂停代码 | 不会阻塞同步代码 |
| delay 是精确执行时间 | delay 是最小调度延迟 |
| `setInterval()` 会自动停止 | 不会，必须 `clearInterval()` |
| `setTimeout(functionName(), 1000)` | 这是立刻调用，应传函数引用或箭头函数 |
| `handler` / `timeout` 是对象属性 | 它们是 API 签名里的参数名 |

### 项目用途

```txt
延迟提示
轮询
防抖节流底层实现
动画前延迟逻辑
重试调度
会话倒计时
```

---

## 15. 小项目补充 API：Object.fromEntries / Number / Number.isFinite

### Object.fromEntries()

| API | 参数 | 返回值 | 作用 |
|---|---|---|---|
| `Object.fromEntries(iterable)` | entries iterable | object | 把 `[key, value]` 条目转成普通对象 |

常见用途：

```txt
把 Map 转成普通对象后再 JSON.stringify()
把 URLSearchParams entries 转成普通对象
```

### Number()

| API | 参数 | 返回值 | 作用 |
|---|---|---|---|
| `Number(value)` | 任意值 | number | 显式数字转换 |

高风险点：

```txt
Number(null) -> 0
Number('') -> 0
Number('1299.5') -> 1299.5
Number('abc') -> NaN
```

### Number.isFinite()

| API | 参数 | 返回值 | 作用 |
|---|---|---|---|
| `Number.isFinite(value)` | 任意值 | boolean | 判断值是否是 finite number |

关键点：

```txt
Number.isFinite('1299.5') -> false
Number.isFinite(1299.5) -> true
```

它不会先做类型转换。参数必须已经是 number。

### 常见坑

| 错误 | 正确模型 |
|---|---|
| 直接 `JSON.stringify(map)` | 普通 Map 会变成 `{}`，先用 `Object.fromEntries(map)` |
| `Number.isFinite('1299.5')` 返回 true | 返回 false，因为参数不是 number |
| `Number(null)` 是 `NaN` | 结果是 `0`，所以缺失参数要先检查 `null` |
| `Object.fromEntries()` 只能接 Map | 任何 entries iterable 都可以 |

---

## 16. 同名方法最终对照表

### 结论

同名方法不能脱离点号左边理解。`set()`、`get()`、`has()`、`delete()` 到底是什么意思，必须先看它属于哪个对象。

| 名字 | 所属对象 | 作用 | 找不到 / 失败时 |
|---|---|---|---|
| `Map.get(key)` | `Map` | 读 Map value | `undefined` |
| `URLSearchParams.get(name)` | `URLSearchParams` | 读 query parameter | `null` |
| `Map.set(key, value)` | `Map` | 写 Map entry | 返回当前 Map |
| `URLSearchParams.set(name, value)` | `URLSearchParams` | 设置 query parameter | 返回 `undefined` |
| `TypedArray.set(source, offset?)` | `TypedArray` | 批量复制元素 | 返回 `undefined` |
| `Set.has(value)` | `Set` | 判断集合值存在 | `boolean` |
| `Map.has(key)` | `Map` | 判断 key 存在 | `boolean` |
| `URLSearchParams.has(name)` | `URLSearchParams` | 判断 query 参数存在 | `boolean` |
| `RegExp.test(text)` | `RegExp` | 判断文本是否匹配 | `boolean` |
| `Array.prototype.sort(compareFn)` | `Array` | 排序数组 | 返回原数组 |
| `Intl.Collator.compare(a, b)` | `Intl.Collator` | 比较两个字符串 | `number` |
| `Intl.NumberFormat.format(number)` | `Intl.NumberFormat` | 格式化数字 | `string` |
| `console.time(label)` | `console` | 启动计时器 | 不打印 |
| `console.timeEnd(label)` | `console` | 结束并打印耗时 | 打印 |
| `Map.delete(key)` | `Map` | 删除 entry | 成功 `true`，失败 `false` |
| `Set.delete(value)` | `Set` | 删除 value | 成功 `true`，失败 `false` |
| `URLSearchParams.delete(name)` | `URLSearchParams` | 删除 query 参数 | 返回 `undefined` |
| `delete object.property` | operator | 删除对象属性 | 返回 boolean |

### 最终判断规则

```txt
Same method name does not mean same API.
The object before the dot decides the meaning.
```

---

## 17. 最终要能回答的问题

学完第 11 章，你应该能回答：

```txt
1. 标准库和语法有什么区别？
2. 什么是内置对象？什么是宿主环境 API？
3. 为什么学习标准库不能只背方法名？
4. Set 和 Array 的核心区别是什么？
5. Set 为什么不能按结构去重对象？
6. Map 和普通对象的键有什么区别？
7. 为什么不能用 bracket syntax 写入 Map 条目？
8. WeakMap 为什么不能遍历？
9. WeakMap 和垃圾回收有什么关系？
10. ArrayBuffer 和 TypedArray 是什么关系？
11. DataView 为什么需要字节偏移和字节序？
12. byteLength 和 length 有什么区别？
13. RegExp 字面量和 RegExp 构造函数有什么区别？
14. 捕获组是什么？
15. 为什么带 g 的正则配合 test() 可能有状态陷阱？
16. RegExp.escape() 解决什么问题？
17. Date 内部保存的到底是什么？
18. 为什么 Date 数字月份从 0 开始容易出错？
19. 本地时间方法和 UTC 方法有什么区别？
20. 为什么应该抛 Error 对象而不是字符串？
21. TypeError 和 RangeError 分别适合什么情况？
22. Error cause 解决什么问题？
23. JSON 和 JavaScript 对象有什么关系？有什么区别？
24. JSON.stringify() 遇到 undefined、function、symbol 会怎样？
25. JSON.parse() 的 reviver 有什么用？
26. Intl.NumberFormat 为什么比字符串拼接更可靠？
27. Intl.DateTimeFormat 和时区有什么关系？
28. console.table()、console.time() 分别适合什么调试场景？
29. URL 为什么应该当作结构化数据处理？
30. URLSearchParams 为什么比手动拼接查询字符串更安全？
31. setTimeout() 为什么不是暂停当前代码？
32. setTimeout(fn, 0) 为什么不等于立即执行？
33. setInterval() 和递归 setTimeout() 的控制差异是什么？
34. 如何把第 11 章 API 组合进一个真实模块？
```

---

## 18. MDN 阅读清单

阅读 MDN 时，不要只看示例。每个页面按这个顺序检查：

```txt
1. 这个 API 属于哪个对象？
2. 它是构造函数、静态方法，还是实例方法？
3. 它会不会修改原对象？
4. 它的返回值是什么？
5. 参数有没有容易误解的地方？
6. 有没有异常情况？
7. 浏览器或 Node 支持情况如何？
```

### 对应页面

```txt
Map:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

Set:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

Typed arrays guide:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays

ArrayBuffer:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer

DataView:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView

RegExp:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

Regular expressions guide:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions

Date:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

Error:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

JSON:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON

Intl:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

console:
https://developer.mozilla.org/en-US/docs/Web/API/console

URL:
https://developer.mozilla.org/en-US/docs/Web/API/URL

URLSearchParams:
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

setTimeout():
https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
```

---

## 19. 最终记忆模型

```txt
Set:
  unique values

Map:
  actual keys to values

WeakMap:
  object metadata without preventing garbage collection

WeakSet:
  object membership without preventing garbage collection

ArrayBuffer:
  raw bytes

TypedArray:
  fixed numeric interpretation over bytes

DataView:
  precise byte-offset read and write

RegExp:
  text pattern matcher

Date:
  timestamp-backed instant object

Error:
  structured failure object

JSON:
  text format for data exchange

Intl:
  locale-aware value-to-string formatting

console:
  runtime observation tool

URL:
  structured address object

URLSearchParams:
  query parameter manager

Timer:
  host-scheduled future callback
```

最后压缩成一句话：

```txt
标准库的难点不是 API 数量，而是每个对象的内部数据模型、返回值、修改行为、缺失值表示和同名方法语义都不同。
```
