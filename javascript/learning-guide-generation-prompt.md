# JavaScript / TypeScript 学习指导文件生成规范提示词

你现在要为我的前端学习项目生成一份“可指导学习的 Markdown 文件”。

这不是普通总结，不是占位说明，不是章节简介，而是一份可以让我照着创建文件、写代码、运行代码、观察输出、理解机制、最后整理成正式学习笔记的训练型指导文件。

请严格遵守以下规范。

---

## 1. 我的学习背景

我正在系统学习现代前端开发，当前重点是 JavaScript 基础、JavaScript 标准库、浏览器 Web API、Node.js、工具链、JSX，后续再系统学习 TypeScript、React、Node 工程、Next.js 等内容。

我不是只想知道 API 怎么用，而是要理解：

- 这个概念解决什么问题
- JavaScript 运行时实际做了什么
- 语言机制、对象模型、原型链、作用域、闭包、this、模块、类型系统边界是什么
- 为什么这个代码会得到这个输出
- 换一种写法会发生什么
- 实际项目里怎么判断什么时候用它
- 常见错误为什么错

回答和文件内容必须面向一个认真学习基础、以后要做工程项目和求职项目的人。

---

## 2. 文件定位

生成的是“学习指导文件”，不是正式学习笔记。

指导文件的目标是让我按照文件一步步做练习：

1. 创建指定目录
2. 创建指定 `.js` / `.mjs` / `.html` / `.ts` / `.tsx` 文件
3. 写入示例代码
4. 运行代码
5. 对照预期输出
6. 分析执行过程
7. 整理成最终正式学习笔记

文件必须包含明确的训练步骤，不能只写概念说明。

---

## 3. 目录和文件规则

必须遵守用户指定的目录。

如果用户指定了章节目录，例如：

```txt
javascript/17.JavaScript Standard Library
```

那么文件必须放在这个章节目录下。

禁止擅自新建这些目录：

```txt
notes/
JavaScript模块/
其他未被用户要求的新目录
```

如果确实需要练习子目录，必须放在当前章节目录内部，并且在指导文件中明确列出。

示例：

```txt
javascript/17.JavaScript Standard Library/
  javascript-standard-library-learning-guide-zh-v3.md
  01-map-set/
  02-typed-array/
  03-regexp/
```

不要把章节文件散落到项目外部。

---

## 4. 文件命名规则

Markdown 文件名要清晰、稳定、可版本化。

示例：

```txt
javascript-standard-library-learning-guide-zh-v3.md
javascript-asynchronous-learning-guide-zh.md
javascript-metaprogramming-learning-guide-zh.md
typescript-chapter-09-frameworks-learning-guide-zh-v1.md
```

如果是在修订旧文件，使用新版本号：

```txt
-v2
-v3
-v4
```

不要覆盖旧文件，除非用户明确要求覆盖。

---

## 5. 语言和代码规则

正文使用中文。

重要技术术语必须写成：

```txt
中文术语（English term）
```

示例：

```txt
迭代器（iterator）
生成器（generator）
序列化（serialization）
反序列化（deserialization）
配置对象（options object）
属性存在性操作符（property existence operator）
自有属性（own property）
循环引用（circular reference）
```

代码、变量名、函数名、类名、文件名、目录名、代码注释不得出现中文字符。

代码注释必须使用英文。

正确：

```js
// Goal:
// Verify how JSON.parse reviver restores a Date value.
```

错误：

```js
// 目标：恢复日期对象
```

示例代码变量名、函数名、类名不要重复。每个示例要使用有语义的新命名，避免大量 `user`, `data`, `result`, `obj`, `fn` 这种泛名。

---

## 6. 每个章节必须包含的总体结构

每份指导文件必须包含以下结构：

```md
# 标题

## 0. 文件定位

## 1. 本章学习目标

## 2. 本章学习顺序

## 3. 本章核心术语表

## 4. 本章底层模型

## 5. 推荐目录结构

## 6. 运行方式

## 7. 分节训练内容

## 8. 本章常见错误总表

## 9. 最终学习笔记转换要求

## 10. 本章最终记忆模型

## 11. 官方文档阅读清单
```

其中“分节训练内容”是主体，必须详细。

---

## 7. 每个知识点小节的固定结构

每个知识点必须按这个结构写：

```md
## 01：知识点名称

### 结论

### 技术意义

### 底层机制

### API / 语法规范

### 固定属性名 / 固定方法名 / 参数签名

### 文件结构

### 示例代码

### 运行方式

### 预期输出

### 执行过程

### 和实际项目的关系

### 常见错误

### 最终记忆模型
```

不能只写“是什么”。必须写“怎么运行”和“为什么这样运行”。

---

## 8. API 讲解硬性规范

如果涉及任何标准库 API、Web API、Node API、React API、TypeScript 配置项，必须写清楚：

1. API 名称
2. 构造函数签名或方法签名
3. 参数含义
4. 参数是否可选
5. 返回值
6. 固定属性名
7. 固定属性值的合法范围
8. 常用方法名
9. 是否修改原对象
10. 是否返回新对象
11. 是否有运行时副作用
12. 是否有状态
13. 常见 IDE 警告
14. 常见错误写法
15. 对应官方文档链接

不能只写 API 名称。

例如，讲 `Intl.DateTimeFormat` 时不能只写：

```txt
使用 Intl.DateTimeFormat 格式化日期。
```

必须写：

```txt
new Intl.DateTimeFormat(locales, options)

locales:
例如 "en-GB", "en-US", "zh-CN"

options 常见固定属性名:
dateStyle
timeStyle
timeZone
year
month
day
hour
minute
second
weekday

dateStyle / timeStyle 合法值:
"full"
"long"
"medium"
"short"

timeZone:
IANA time zone name，例如 "Europe/London", "Asia/Shanghai"

format(date):
返回格式化后的字符串。
```

例如，讲 `JSON.stringify()` 时必须写：

```txt
JSON.stringify(value, replacer, space)

value:
要序列化的 JavaScript 值。

replacer:
函数或 string/number 数组，用来控制属性过滤或值转换。

space:
number 或 string，用来控制缩进格式。

必须覆盖:
toJSON()
replacer array
replacer function
space
circular reference
undefined/function/Symbol 处理规则
```

例如，讲 `JSON.parse()` 时必须写：

```txt
JSON.parse(text, reviver)

text:
合法 JSON 字符串。

reviver:
解析后逐个处理属性值的函数。

必须覆盖:
reviver(propertyName, propertyValue)
return propertyValue
return new Date(propertyValue)
return undefined 会删除属性
Date round trip
JSON text 和 JavaScript object 的区别
```

---

## 9. 不能漏掉固定属性名和方法名

凡是 API 有固定属性名、固定方法名、固定配置项，都必须列出来。

例如标准库章节至少要覆盖：

```txt
Map:
set()
get()
has()
delete()
clear()
entries()
keys()
values()
forEach()
size

Set:
add()
has()
delete()
clear()
entries()
keys()
values()
forEach()
size

WeakMap:
set()
get()
has()
delete()
为什么没有 size / entries()

WeakSet:
add()
has()
delete()
为什么不能遍历

ArrayBuffer:
byteLength

TypedArray:
length
byteLength
byteOffset
buffer
BYTES_PER_ELEMENT
set()
subarray()
slice()

DataView:
getUint8()
getUint16()
getInt8()
getInt16()
setUint8()
setUint16()
setInt8()
setInt16()
endianness

RegExp:
test()
exec()
source
flags
global
ignoreCase
multiline
dotAll
unicode
sticky
lastIndex
g flag
y flag
RegExp.escape()

Date:
getTime()
Date.now()
toISOString()
getFullYear()
getMonth()
getDate()
getDay()
getHours()
getMinutes()
数字构造函数 monthIndex 从 0 开始

Error:
name
message
cause
stack
Error
TypeError
RangeError
SyntaxError
custom Error subclass
super()
this.name
自定义属性

JSON:
stringify()
parse()
toJSON()
replacer
reviver
space
circular reference

Intl.NumberFormat:
style
currency
currencyDisplay
minimumFractionDigits
maximumFractionDigits
format()
resolvedOptions()

Intl.DateTimeFormat:
dateStyle
timeStyle
timeZone
year
month
day
hour
minute
second
weekday
format()
resolvedOptions()

Intl.Collator:
compare()
sensitivity
numeric
caseFirst

URL:
new URL()
href
origin
protocol
host
hostname
port
pathname
search
hash
searchParams

URLSearchParams:
get()
set()
append()
delete()
has()
entries()
keys()
values()
toString()

Console:
log()
error()
warn()
table()
time()
timeEnd()
trace()

Timer:
setTimeout()
clearTimeout()
setInterval()
clearInterval()
```

如果某一章涉及 Web API、Node API 或工具链，也必须使用同样规则列出固定属性和方法。

---

## 10. 示例代码要求

每个小节至少包含：

1. 一个正确示例
2. 一个常见错误示例
3. 一个对比示例

代码必须可以运行，除非明确说明是故意报错示例。

每个代码文件顶部都要写英文注释：

```js
// Goal:
// Explain what this file verifies.

// Expected output:
// Explain the expected output here.
```

如果是故意报错示例：

```js
// Goal:
// Verify why this incorrect usage fails.

// Expected error:
// Explain the expected error here.
```

不要在代码注释中使用中文。

---

## 11. 执行过程必须逐行解释

对关键代码不能只总结，要逐行解释。

必须说明：

- 每一行做了什么
- 当前变量保存什么值
- 对象属性是什么
- 函数参数绑定到什么值
- 返回值是什么
- 为什么进入或不进入 if
- 为什么抛出错误
- catch 捕获到的是什么对象
- 最终输出如何产生

例如讲这段：

```js
const eventRecord = JSON.parse(eventJsonText, (propertyName, propertyValue) => {
  if (propertyName === 'createdAt') {
    return new Date(propertyValue);
  }

  return propertyValue;
});
```

必须解释：

```txt
propertyName 是当前属性名。
propertyValue 是当前属性值。
propertyName === "createdAt" 时，返回 Date 对象。
其他属性必须 return propertyValue。
如果返回 undefined，该属性会被删除。
```

---

## 12. 必须区分相似概念

指导文件里遇到容易混的概念，必须主动做对比。

例如：

```txt
JSON text vs JavaScript object
property vs parameter vs argument
method vs property
in vs Object.hasOwn() vs hasOwnProperty() vs Map.has() vs instanceof
Date getMonth() vs human month number
getTime() vs Date.now() vs toISOString()
JSON.stringify replacer vs JSON.parse reviver
Map delete() vs delete operator
entries() vs keys() vs values()
ArrayBuffer byteLength vs TypedArray length
JSX vs HTML vs React component
JSX vs TSX
runtime error vs IDE warning vs TypeScript error
```

不能等用户追问才补。

---

## 13. IDE 警告必须单独说明

如果示例可能触发 IDE / TypeScript / WebStorm 警告，必须单独写一节：

```md
### IDE 警告说明
```

必须区分：

```txt
语法错误（syntax error）
运行时错误（runtime error）
类型检查错误（type checking error）
IDE 静态检查误报（inspection false positive）
标准库类型定义过旧（outdated library declaration）
```

例如：

```txt
new Error(message, { cause })
可能被某些 IDE 识别成参数数量错误。
这通常是 ErrorConstructor 类型定义没有识别 ErrorOptions。
运行时支持时，这不是 JavaScript 逻辑错误。
```

例如：

```txt
Intl.DateTimeFormat 的 dateStyle / timeStyle 被提示为 extra properties。
这可能是 IDE 的 DateTimeFormatOptions 类型库没有覆盖较新的 Intl options。
```

---

## 14. 官方文档链接规则

官方文档链接必须使用正常 Markdown 链接。

正确：

```md
- [JSON.parse() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
```

错误：

```txt
https://developer.mozilla.org/...
```

不要把 MDN 链接放进 `txt` 代码块。

优先参考：

```txt
MDN
ECMAScript specification
Node.js Official Docs
TypeScript Official Docs
React Official Docs
Vite Official Docs
Next.js Official Docs
```

涉及 Node.js 时必须参考 Node.js Official Docs。

涉及 OpenAI、框架版本、工具链版本、近期 API 时必须查最新官方文档。

---

## 15. 指导文件不是速查表

不要只列 API 清单。

每个 API 必须有：

```txt
结论
技术意义
底层机制
代码示例
执行过程
常见错误
最终记忆模型
```

速查表可以放在小节最后，但不能代替讲解。

---

## 16. 输出风格要求

回答和文件内容要稳，不要为了快而简化关键机制。

如果章节很大，优先保证质量：

```txt
结构完整
API 细节完整
示例可运行
固定属性名完整
方法名完整
执行过程完整
常见错误完整
```

不要为了快速生成而漏掉 API 的参数、固定属性名、返回值、方法名。

如果内容太大，可以分成多个版本文件，但必须明确说明每个版本覆盖范围。

---

## 17. 最终学习笔记转换要求

指导文件最后必须写明：用户完成练习后，要把内容整理成正式学习笔记。

正式笔记结构必须是：

```md
## 知识点名称

### 结论

### 技术意义

### 底层机制

### API / 语法规范

### 代码示例

### 执行过程

### 常见错误

### 最终记忆模型
```

正式笔记不是指导文件，不要保留“创建目录、运行文件”这类训练指令。

---

## 18. 生成前自检清单

生成文件前必须自检：

```txt
[ ] 文件放在用户指定章节目录下
[ ] 没有新建 notes/
[ ] 没有新建未要求的目录
[ ] 正文是中文
[ ] 重要术语有 English term
[ ] 代码变量名、函数名、类名没有中文
[ ] 代码注释没有中文
[ ] 每节有结论、技术意义、底层机制、API 规范、代码、执行过程、常见错误、记忆模型
[ ] API 的固定属性名和方法名没有漏
[ ] options object 的合法属性名写清楚
[ ] 方法签名和返回值写清楚
[ ] 常见 IDE 警告写清楚
[ ] MDN / 官方文档链接是正常 Markdown 链接
[ ] 示例代码可运行或明确标注故意报错
[ ] 没有把指导文件写成最终笔记
```

如果自检不通过，必须先修正，再交付。

---

## 19. 输出时必须说明

最终回复必须包含：

```txt
1. 文件路径
2. 文件覆盖范围
3. 与上一版相比修正了什么
4. 是否还有未覆盖内容
5. 下载链接或文件位置
```

不要只说“完成了”。

---

## 20. 质量优先原则

这条最高优先级：

```txt
不要为了快而漏掉细节。
```

如果章节涉及大量 API，必须宁可慢一点，也要把固定属性名、固定方法名、参数签名、返回值、常见错误补完整。

用户不是要模板化回答，而是要能真正指导学习和写代码的工程级学习文件。
