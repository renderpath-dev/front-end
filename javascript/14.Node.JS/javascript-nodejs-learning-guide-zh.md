# JavaScript Node.js 服务器端 JavaScript 学习指导文件

> 定位：这是《JavaScript 权威指南》第 16 章“Node 服务器端 JavaScript”的训练型学习指导文件，不是最终学习笔记。  
> 范围：第 16 章 Node.js 主线 + Node.js Official Documentation。  
> 目标：把 Node.js 学成一个运行时平台（runtime platform），不是背几个 API 名字。  
> 语言规则：正文使用中文；重要技术术语必须同时写 English term。  
> 代码规则：代码命名和代码注释使用英文；代码和代码注释不使用中文字符。  
> 链接规则：Node.js Official Documentation 链接使用普通 Markdown 链接，不放进 `txt` 代码块。

---

## 目录

1. [本文件怎么用](#1-本文件怎么用)
2. [这一章是否应该单开项目](#2-这一章是否应该单开项目)
3. [第 16 章 Node.js 的完整学习顺序](#3-第-16-章-nodejs-的完整学习顺序)
4. [本章先要建立的底层模型](#4-本章先要建立的底层模型)
5. [00：项目初始化与运行环境](#5-00项目初始化与运行环境)
6. [01：Node 编程基础](#6-01node-编程基础)
7. [02：Node 模块系统与内置模块导入](#7-02node-模块系统与内置模块导入)
8. [03：Node 默认异步模型](#8-03node-默认异步模型)
9. [04：Buffer 与二进制数据](#9-04buffer-与二进制数据)
10. [05：事件与 EventEmitter](#10-05事件与-eventemitter)
11. [06：流 Streams 与背压 Backpressure](#11-06流-streams-与背压-backpressure)
12. [07：process 与 os](#12-07process-与-os)
13. [08：文件系统 fs 与路径 path](#13-08文件系统-fs-与路径-path)
14. [09：HTTP 客户端与服务器](#14-09http-客户端与服务器)
15. [10：非 HTTP 网络 net](#15-10非-http-网络-net)
16. [11：子进程 child_process](#16-11子进程-child_process)
17. [12：工作线程 worker_threads](#17-12工作线程-worker_threads)
18. [13：小项目整合](#18-13小项目整合)
19. [最终文件清单](#19-最终文件清单)
20. [最终学习笔记转换要求](#20-最终学习笔记转换要求)
21. [本章最终要能回答的问题](#21-本章最终要能回答的问题)
22. [Node.js Official Documentation 阅读清单](#22-nodejs-official-documentation-阅读清单)

---

## 1. 本文件怎么用

### 结论

这一章不能只读 API。你要按照“创建目录、写文件、运行、观察输出、解释机制、整理笔记”的方式学习。

Node.js 的学习对象不是一个语法点，而是一个运行时平台（runtime platform）。它负责让 JavaScript 在浏览器之外运行，并提供文件系统、网络、进程、线程、流和操作系统信息等能力。

### 每节固定学习步骤

每一节都按这个顺序做：

```txt
1. Read the conclusion.
2. Learn the new terms.
3. Create the file structure.
4. Write the files.
5. Run the entry file.
6. Compare the expected output.
7. Explain the execution process.
8. Create one wrong version and observe the error.
9. Convert the section into final notes.
```

### 代码注释模板

每个 JS 文件顶部都写英文注释：

```js
// Goal:
// Verify how this Node.js example works.

// Expected output:
// Replace this block with the output from the entry file.
```

### 文件结构规则

每一节必须先写“文件结构”，再写这一节的代码块。
每个可运行代码块上方只写对应文件名，不写完整路径。
如果同一节需要多个观察代码，拆成多个职责明确的文件名，并全部写进这一节的“文件结构”。
每一节的“文件结构”和最后的“最终文件清单”必须与正文中的文件名代码块一致。
---

## 2. 这一章是否应该单开项目

### 结论

是，Node.js 建议单开一个项目。

原因不是“目录多”，而是学习对象变了：

```txt
前面章节：JavaScript language features
第 16 章：Node.js runtime platform
```

前面章节主要在学习语言本身：对象、数组、函数、模块、迭代器、异步、元编程、浏览器 API。Node.js 这一章开始进入服务器端运行时（server-side runtime）：文件、网络、进程、流、线程、系统资源。

### 建议项目名

可以单独建立：

```txt
nodejs-runtime-lab/
```

或者如果你继续放在当前 JavaScript 学习仓库里，可以用：

```txt
javascript/22.Node.js Server-side JavaScript/
```

### 技术意义

Node.js 学习最终会分成两条线：

| 方向 | 目标 |
|---|---|
| JavaScript 基础线 | 理解语言机制 |
| Node.js 工程线 | 理解服务器端运行时、文件系统、网络与进程 |

如果你以后继续学 Express、数据库、认证、日志、部署、测试、CLI 工具，这些都应该放在 Node.js 项目线里。

### 和前端学习的关系

现代前端离不开 Node.js：

| 前端场景 | Node.js 角色 |
|---|---|
| Vite / Next.js / webpack | 开发服务器与构建工具运行在 Node.js 上 |
| npm scripts | 通过 Node.js 执行项目脚本 |
| SSR / Server Components | 服务器端 JavaScript 运行环境 |
| CLI 工具 | 很多脚手架由 Node.js 编写 |
| API mock server | 本地开发接口服务 |

### 最终记忆模型

```txt
Browser JavaScript teaches UI environment.
Node.js teaches server and system environment.
```

---

## 3. 第 16 章 Node.js 的完整学习顺序

### 结论

本章按这个顺序学：

```txt
project setup
  -> Node runtime basics
  -> built-in modules
  -> async-by-default model
  -> Buffer
  -> EventEmitter
  -> Streams
  -> process and os
  -> fs and path
  -> HTTP server and client
  -> TCP server and client
  -> child_process
  -> worker_threads
  -> mini integration project
```

### 技术意义

这个顺序先建立运行环境，再进入 I/O，再进入高并发服务器，再进入进程与线程。

如果先学 HTTP 服务器，容易只记住 `createServer()`。如果先学流（streams）、事件（events）、Buffer（二进制缓冲区），HTTP 服务器就会变得更清楚：请求和响应本质上也和流有关。

---

## 4. 本章先要建立的底层模型

### 结论

Node.js 是一个基于 V8 引擎（V8 engine）的 JavaScript 运行时（JavaScript runtime），它把 JavaScript 连接到操作系统能力上。

### 关键术语

| 中文术语 | English term | 解释 |
|---|---|---|
| 运行时 | runtime | 执行 JavaScript 并提供宿主能力的环境。 |
| 宿主环境 | host environment | 为 JavaScript 提供输入输出、网络、文件等能力的环境。 |
| 事件循环 | event loop | 调度异步回调执行的机制。 |
| 非阻塞 I/O | non-blocking I/O | 发起 I/O 后不阻塞主线程等待结果。 |
| 回调 | callback | 未来某个操作完成时被调用的函数。 |
| 期约 | Promise | 表示未来完成或失败的异步结果。 |
| 缓冲区 | Buffer | Node.js 表示二进制字节数据的对象。 |
| 流 | stream | 分块处理数据的抽象接口。 |
| 背压 | backpressure | 写入方处理不过来时，读取方需要减速的机制。 |
| 进程 | process | 操作系统运行程序的实例。 |
| 子进程 | child process | 由当前进程创建的另一个进程。 |
| 工作线程 | worker thread | Node.js 中用于 CPU 密集型任务的线程。 |
| 内置模块 | built-in module | Node.js 自带的模块，例如 `node:fs`、`node:http`。 |

### 底层机制总图

```txt
JavaScript code
  -> Node.js runtime
    -> V8 engine
    -> event loop
    -> built-in modules
      -> file system
      -> network
      -> process
      -> operating system
      -> worker threads
```

### 常见错误

不要把 Node.js 理解成“浏览器里没有 DOM 的 JavaScript”。更准确的模型是：

```txt
Node.js = JavaScript language + server-side host APIs
```

---

## 5. 00：项目初始化与运行环境

### 结论

学习 Node.js 先建立明确的项目边界：Node 版本、模块类型、运行脚本、练习目录。

### 文件结构

```txt
00-project-setup/
  package.json
  runtimeCheck.js
  runtimeCheckPaths.js
  runtimeVersionProperty.js
```

### 新关键字和新概念

#### `node`

`node` 是 Node.js 的命令行程序，用来执行 JavaScript 文件。

#### `npm`

`npm` 是 Node.js 生态中最常见的包管理器（package manager），用于初始化项目、安装依赖、运行脚本。

#### `package.json`

`package.json` 是 Node.js 项目的配置文件。学习阶段最重要的是：

| 字段 | 含义 |
|---|---|
| `type` | 决定 `.js` 文件默认按 CommonJS 还是 ES Module 解析。 |
| `scripts` | 定义可运行命令。 |
| `dependencies` | 生产依赖。 |
| `devDependencies` | 开发依赖。 |

### API 参数与返回值补充

#### `node <file-path>`

这是最基础的 Node.js 命令形式：

```txt
node [options] [entry-file] [arguments]
```

| 部分 | 含义 |
|---|---|
| `node` | 启动 Node.js runtime。 |
| `options` | 传给 Node runtime 的选项。 |
| `entry-file` | 要执行的入口 `.js` / `.mjs` / `.cjs` 文件。 |
| `arguments` | 传给用户程序的参数，会进入 `process.argv`。 |

运行 `node runtimeCheck.js` 时，Node 不是“打开一个网页”，而是启动一个操作系统进程（process），把 `runtimeCheck.js` 当作入口模块加载、解析、执行。

#### `npm run <script-name>`

```txt
npm run check
```

执行过程不是 npm 自己理解 JavaScript，而是：

```txt
npm reads package.json
  -> finds scripts.check
  -> starts a shell command
  -> shell runs node runtimeCheck.js
  -> Node executes the entry module
```

`npm run` 的关键参数是脚本名（script name）。脚本名必须存在于 `package.json` 的 `scripts` 对象里，否则 npm 会报 missing script。

#### `process.version`

| 项目 | 说明 |
|---|---|
| 所属模块 | 全局 `process` 对象。 |
| 类型 | string property。 |
| 参数 | 无。它是属性，不是函数。 |
| 返回值 | 当前 Node.js 版本字符串，形如 `v20.11.1`。 |

错误写法：

```js
console.log(process.version());
```

错误原因：`process.version` 是字符串属性，不是函数。给字符串加 `()` 会触发 `TypeError`。

#### `import.meta.url`

| 项目 | 说明 |
|---|---|
| 所属层级 | ES Module metadata。 |
| 类型 | string property。 |
| 参数 | 无。 |
| 返回值 | 当前模块文件的 URL 字符串，通常以 `file://` 开头。 |

`import.meta.url` 不是 Node 独有语法，它属于 ES Module 的模块元数据（module metadata）。Node 在 ESM 环境中提供当前模块的文件 URL，所以它可以用来推导当前文件路径。


### API 对应代码补充

上一段只解释了 `process.version`、`import.meta.url` 和 `node` 命令的作用，还不够。学习时应该把它们写进同一个入口文件里，观察“模块 URL、文件路径、命令行参数、当前工作目录”分别是什么。

#### `runtimeCheckPaths.js`：把模块 URL 转成真实文件路径

```js
// Goal:
// Verify runtime version, module URL, file path, and user arguments.

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = dirname(currentFilePath);
const userArguments = process.argv.slice(2);

console.log(process.version.startsWith('v'));
console.log(import.meta.url.startsWith('file://'));
console.log(currentFilePath.endsWith('runtimeCheck.js'));
console.log(currentDirectoryPath.length > 0);
console.log(userArguments);
```

运行：

```bash
node runtimeCheck.js dev 3000
```

预期输出形态：

```txt
true
true
true
true
[ 'dev', '3000' ]
```

这段代码把四个边界分开了：

| 表达式 | 得到什么 |
|---|---|
| `process.version` | Node runtime 版本字符串。 |
| `import.meta.url` | 当前 ES Module 的 `file://` URL。 |
| `fileURLToPath(import.meta.url)` | 当前模块对应的真实文件路径。 |
| `process.argv.slice(2)` | 用户传给脚本的业务参数。 |

#### `runtimeVersionProperty.js`：错误对比代码

```js
// Goal:
// Show that process.version is a property, not a function.

console.log(typeof process.version);
console.log(process.version.startsWith('v'));

// Wrong version:
// console.log(process.version());
```

错误点不是 `process` 不能用，而是 `process.version` 的值已经是 string。string 不是函数，所以不能加 `()` 调用。


### 底层机制补充

`package.json` 里的 `"type": "module"` 不是运行时代码，它是 Node 加载模块前读取的项目配置。Node 会根据它决定 `.js` 文件按哪种模块规则解析：

| 配置 | `.js` 默认含义 |
|---|---|
| `"type": "module"` | ES Module。 |
| `"type": "commonjs"` 或缺省 | CommonJS。 |
| `.mjs` | 永远按 ES Module。 |
| `.cjs` | 永远按 CommonJS。 |

这里最重要的边界是：

```txt
package.json controls module parsing.
JavaScript source code controls runtime behavior.
```

### 常见错误补充

| 错误写法 | 错误原因 | 正确模型 |
|---|---|---|
| 在 ESM 中直接使用 `__dirname` | `__dirname` 是 CommonJS 包装函数提供的局部变量 | ESM 用 `import.meta.url` 推导路径 |
| 把 `process.version` 当函数调用 | 它是 property，不是 method | 直接读取 `process.version` |
| 忘记设置 `"type": "module"` | `.js` 可能按 CommonJS 解析 | ESM 项目显式设置 `type` |
| 在任意目录运行脚本 | `process.cwd()` 会变 | 先确认当前工作目录 |

### `package.json`

```json
{
  "type": "module",
  "scripts": {
    "check": "node runtimeCheck.js"
  }
}
```

### `runtimeCheck.js`

```js
// Goal:
// Verify the Node.js runtime version and module mode.

console.log(process.version);
console.log(import.meta.url.includes('runtimeCheck.js'));
```

### 运行方式

```bash
npm run check
```

### 预期输出

```txt
vXX.YY.ZZ
true
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `npm run check` 读取 `package.json` 的 `scripts.check`。 |
| 2 | Node 执行 `runtimeCheck.js`。 |
| 3 | `process.version` 读取当前 Node 版本。 |
| 4 | `import.meta.url` 说明当前文件按 ES Module 执行。 |

### 常见错误

错误：

```js
console.log(__dirname);
```

如果当前文件是 ES Module，`__dirname` 不是直接可用的 CommonJS 局部变量。

### 和项目开发的关系

真实项目第一步永远是确认运行环境。否则你会遇到：

```txt
CommonJS and ESM conflict
Node version mismatch
missing script command
wrong working directory
```

---

## 6. 01：Node 编程基础

### 结论

Node.js 程序从入口文件开始执行，运行在进程（process）里，并通过全局对象、内置模块和事件循环访问宿主能力。

### 文件结构

```txt
01-node-runtime-basics/
  processBasics.js
  processRuntimeContext.js
  environmentVariableString.js
```

### 新关键字和新概念

#### `process`

`process` 是 Node.js 提供的全局对象，表示当前 Node 进程（current Node.js process）。它能读取命令行参数、环境变量、当前工作目录、退出码等。

#### `process.argv`

`process.argv` 是命令行参数数组。

#### `process.env`

`process.env` 是环境变量对象。

### API 参数与返回值补充

#### `process.argv`

| 项目 | 说明 |
|---|---|
| 类型 | string array。 |
| 参数 | 无。它是属性。 |
| 返回值结构 | `[nodeExecutablePath, entryFilePath, ...userArguments]`。 |

如果运行：

```bash
node processBasics.js dev 3000
```

`process.argv` 的结构是：

```txt
index 0 -> Node executable path
index 1 -> entry file path
index 2 -> "dev"
index 3 -> "3000"
```

所以读取命令行参数时通常不要从 `0` 开始，而是使用：

```js
const userArguments = process.argv.slice(2);
```

#### `process.cwd()`

| 项目 | 说明 |
|---|---|
| 类型 | method。 |
| 参数 | 无。 |
| 返回值 | 当前 Node 进程的工作目录（current working directory）。 |

`process.cwd()` 返回的是你从哪个目录启动 Node 进程，不一定是当前 JS 文件所在目录。

```txt
project-root/
  src/
    processBasics.js
```

如果你在 `project-root` 运行：

```bash
node src/processBasics.js
```

那么 `process.cwd()` 是 `project-root`，不是 `project-root/src`。

#### `process.env`

| 项目 | 说明 |
|---|---|
| 类型 | object-like property。 |
| key | 环境变量名。 |
| value | 字符串或 `undefined`。 |

关键规则：环境变量读出来默认都是字符串。

```js
const portText = process.env.PORT ?? '3000';
const portNumber = Number(portText);
```

如果 `PORT=3000`，`process.env.PORT` 的值是字符串 `'3000'`，不是 number `3000`。

#### `globalThis`

| 项目 | 说明 |
|---|---|
| 类型 | global object reference。 |
| 参数 | 无。 |
| 返回值 | 当前宿主环境的全局对象引用。 |

在浏览器里，`globalThis` 通常指向 `window`。在 Node.js 里，`globalThis` 指向 Node 的全局对象。不要把 `window` 当作所有 JavaScript 环境都有的对象。


### API 对应代码补充

这一节不能只记 `process.argv`、`process.env`、`process.cwd()` 的名字。你要用代码验证它们分别来自哪里。

#### `processRuntimeContext.js`：读取用户参数、环境变量和当前工作目录

```js
// Goal:
// Inspect process arguments, environment variables, and current working directory.

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const entryFilePath = process.argv[1];
const userArguments = process.argv.slice(2);
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = dirname(currentFilePath);
const currentWorkingDirectory = process.cwd();

const portText = process.env.PORT ?? '3000';
const portNumber = Number(portText);

console.log(process.argv[0].length > 0);
console.log(entryFilePath.endsWith('processBasics.js'));
console.log(userArguments);
console.log(Number.isInteger(portNumber));
console.log(currentFilePath.endsWith('processBasics.js'));
console.log(currentDirectoryPath.length > 0);
console.log(currentWorkingDirectory.length > 0);
console.log(globalThis.process === process);
```

运行：

```bash
PORT=5173 node processBasics.js dev verbose
```

Windows PowerShell 可以写：

```powershell
$env:PORT=5173; node processBasics.js dev verbose
```

预期输出形态：

```txt
true
true
[ 'dev', 'verbose' ]
true
true
true
true
true
```

#### `environmentVariableString.js`：环境变量字符串陷阱

```js
// Goal:
// Verify that environment variables are strings.

const rawPortValue = process.env.PORT ?? '3000';
const wrongPortValue = rawPortValue + 1;
const correctPortValue = Number(rawPortValue) + 1;

console.log(typeof rawPortValue);
console.log(wrongPortValue);
console.log(correctPortValue);
```

如果 `PORT=3000`，输出是：

```txt
string
30001
3001
```

原因是 `process.env.PORT` 来自操作系统环境变量，Node 读出来后是 string。`+` 遇到 string 会做字符串拼接，不会自动按端口号做数学加法。


### 底层机制补充

Node 程序启动时，至少会形成三层上下文：

```txt
operating system process
  -> Node.js runtime state
    -> JavaScript module scope
```

`process` 表示当前操作系统进程在 JavaScript 里的控制对象。模块里的 `const`、`let`、`function` 不会自动挂到 `globalThis` 上，因为 ESM 有自己的模块作用域（module scope）。

### 和前端学习的关系

前端工程里你每天运行的命令本质都是 Node 进程：

```bash
npm run dev
npm run build
npm run test
```

这些命令能读取环境变量、当前目录、命令行参数。Vite、Next.js、ESLint、Prettier 这些工具都依赖同一套 Node 运行时基础。

### 常见错误补充

| 错误写法 | 错误原因 | 修正方式 |
|---|---|---|
| `process.argv[0]` 当作业务参数 | index 0 是 Node 可执行文件路径 | 用 `process.argv.slice(2)` |
| `process.env.PORT + 1` | 环境变量是字符串，`+` 可能做字符串拼接 | 先 `Number(process.env.PORT)` |
| 用 `window` 判断全局对象 | Node 没有浏览器 `window` | 用 `globalThis` 或 Node 专用 API |
| 把 `cwd` 当成当前文件目录 | `cwd` 由启动命令所在目录决定 | 当前模块路径用 `import.meta.url` |

### `processBasics.js`

```js
// Goal:
// Inspect basic process information.

console.log(process.argv[0]);
console.log(process.argv[1].endsWith('processBasics.js'));
console.log(process.cwd().length > 0);
console.log(typeof process.env.PATH === 'string');
```

### 运行方式

```bash
node processBasics.js
```

### 预期输出

```txt
/path/to/node
true
true
true
```

第一行具体路径取决于你的电脑。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | Node 创建进程并执行入口文件。 |
| 2 | `process.argv[0]` 是 Node 可执行文件路径。 |
| 3 | `process.argv[1]` 是当前脚本路径。 |
| 4 | `process.cwd()` 返回当前工作目录。 |
| 5 | `process.env` 暴露环境变量。 |

### 常见错误

不要把 `process.cwd()` 和当前文件所在目录混为一谈。

```txt
process.cwd() = where you ran node
module file path = where this file is located
```

---

## 7. 02：Node 模块系统与内置模块导入

### 结论

Node.js 同时支持 CommonJS（CJS）和 ES Module（ESM）。现代学习阶段建议优先使用 ESM，并用 `node:` 前缀导入内置模块。

### 文件结构

```txt
02-node-built-in-modules/
  package.json
  pathOperations.js
  pathMethodComparison.js
  pathStringOnly.js
  dynamicPathImport.js
```

### 新关键字和新概念

#### `node:` 前缀

`node:` 前缀表示导入 Node.js 内置模块（built-in module）。

```js
import path from 'node:path';
```

这样能明确告诉读者：`path` 来自 Node.js，不是第三方包，也不是本地文件。

#### CommonJS

CommonJS 使用 `require()` 和 `module.exports`。

#### ES Module

ES Module 使用 `import` 和 `export`。

### API 参数与返回值补充

#### `import path from 'node:path'`

| 部分 | 含义 |
|---|---|
| `import` | ES Module 静态导入语法。 |
| `path` | 当前模块作用域里的绑定名。 |
| `'node:path'` | Node 内置模块 specifier。 |

`node:` 前缀的意义是明确告诉 Node：这是内置模块（built-in module），不是 `node_modules` 里的第三方包，也不是本地文件。

#### `path.join(...paths)`

```txt
path.join(...paths: string[]): string
```

| 参数 | 含义 |
|---|---|
| `...paths` | 多个路径片段。每个片段应该是字符串。 |
| 返回值 | 按当前操作系统路径规则拼接并规范化后的路径字符串。 |

```js
path.join('reports', 'daily', 'summary.txt');
```

在 Windows 上路径分隔符可能是 `\`，在 macOS/Linux 上通常是 `/`。你不需要手写分隔符，`path.join()` 会按平台规则处理。

#### `path.resolve(...paths)`

```txt
path.resolve(...paths: string[]): string
```

`path.resolve()` 返回绝对路径（absolute path）。它会从右向左处理路径片段，直到构造出绝对路径。如果所有片段都是相对路径，它会基于 `process.cwd()` 生成绝对路径。

| 方法 | 重点 |
|---|---|
| `path.join()` | 拼接并规范化路径。 |
| `path.resolve()` | 生成绝对路径。 |
| `path.dirname(filePath)` | 取目录部分。 |
| `path.basename(filePath)` | 取文件名部分。 |
| `path.extname(filePath)` | 取扩展名部分。 |


### API 对应代码补充

这一节要通过代码区分 `path.join()`、`path.resolve()`、`path.dirname()`、`path.basename()`、`path.extname()`。它们都处理“路径字符串”，但问题不同。

#### `pathMethodComparison.js`：路径拼接、绝对路径、文件名和扩展名

```js
// Goal:
// Compare common path module methods.

import path from 'node:path';

const reportFilePath = path.join('reports', 'daily', 'summary.json');
const absoluteReportFilePath = path.resolve('reports', 'daily', 'summary.json');
const reportDirectoryPath = path.dirname(reportFilePath);
const reportFileName = path.basename(reportFilePath);
const reportFileExtension = path.extname(reportFilePath);
const parsedReportPath = path.parse(reportFilePath);

console.log(reportFilePath);
console.log(absoluteReportFilePath.endsWith(reportFilePath));
console.log(reportDirectoryPath);
console.log(reportFileName);
console.log(reportFileExtension);
console.log(parsedReportPath.name);
console.log(parsedReportPath.ext);
```

预期输出形态：

```txt
reports/daily/summary.json
true
reports/daily
summary.json
.json
summary
.json
```

Windows 上第一行和第三行可能使用反斜杠，这是 `path` 按当前平台生成路径的结果。

#### `pathStringOnly.js`：`path` 不访问磁盘

```js
// Goal:
// Show that path.join only creates a string.

import path from 'node:path';

const filePath = path.join('folder-that-may-not-exist', 'notes.txt');

console.log(filePath);
console.log(typeof filePath);
```

这段代码不会创建目录，也不会创建文件。`path` 模块只处理路径字符串；真正访问磁盘的是 `fs` 模块。

#### `dynamicPathImport.js`：动态导入内置模块

```js
// Goal:
// Import a built-in module dynamically.

const pathModule = await import('node:path');

const filePath = pathModule.default.join('reports', 'weekly', 'summary.txt');

console.log(filePath.endsWith('summary.txt'));
```

静态导入（static import）适合大多数文件顶部导入；动态导入（dynamic import）适合条件加载或延迟加载。


### 模块机制补充

ES Module 的 `import` 是静态结构（static structure）。这意味着 Node 在执行模块正文前，会先解析模块依赖图：

```txt
entry module
  -> parse import declarations
  -> resolve module specifiers
  -> load dependencies
  -> link bindings
  -> execute modules
```

所以 `import` 不能放在普通 `if` 语句内部。需要条件加载时，使用动态导入（dynamic import）：

```js
const pathModule = await import('node:path');
console.log(pathModule.default.join('reports', 'daily.txt'));
```

### CommonJS 对比补充

| 维度 | ES Module | CommonJS |
|---|---|---|
| 导入语法 | `import` | `require()` |
| 导出语法 | `export` | `module.exports` |
| 加载关系 | 静态分析优先 | 运行时调用函数加载 |
| 当前文件信息 | `import.meta.url` | `__filename`、`__dirname` |
| 默认严格模式 | 是 | CommonJS 包装函数内执行 |

### 常见错误补充

| 错误写法 | 错误原因 | 正确写法 |
|---|---|---|
| `import path from 'path'` 后分不清来源 | 旧写法可以工作，但不如 `node:` 清楚 | `import path from 'node:path'` |
| `path.join('/api', userInput)` 当 URL 拼接 | `path` 是文件系统路径工具，不是 URL 工具 | URL 使用 `URL` 或路由逻辑 |
| 在 ESM 中写 `const path = require('path')` | `require` 不是 ESM 默认局部变量 | 使用 `import path from 'node:path'` |
| 手写 `'folder/' + fileName` | 跨平台分隔符和多余斜杠容易出错 | 使用 `path.join()` |

### `package.json`

```json
{
  "type": "module"
}
```

### `pathOperations.js`

```js
// Goal:
// Import a Node.js built-in module with the node: prefix.

import path from 'node:path';

const reportFilePath = path.join('reports', 'daily', 'summary.json');
const reportFileExtension = path.extname(reportFilePath);

console.log(reportFilePath);
console.log(reportFileExtension);
```

### 运行方式

```bash
node pathOperations.js
```

### 预期输出

```txt
reports/daily/summary.json
.json
```

Windows 上路径分隔符可能显示为反斜杠，这是正常的。

### 常见错误

错误：

```js
import path from './path';
```

如果你要导入 Node.js 内置 `path` 模块，应该写：

```js
import path from 'node:path';
```

---

## 8. 03：Node 默认异步模型

### 结论

Node.js 针对 I/O 密集型程序（I/O-bound programs）设计，很多 API 默认提供异步版本，避免主线程阻塞。

### 文件结构

```txt
03-async-by-default/
  asyncExecutionOrder.js
  nodeAsyncExecutionOrder.js
  timerCancellation.js
  awaitPauseScope.js
```

### 新关键字和新概念

#### I/O

I/O 是输入输出（input/output），包括读文件、写文件、网络请求、数据库访问等。

#### 阻塞

阻塞（blocking）表示当前线程停下来等待操作完成。

#### 非阻塞

非阻塞（non-blocking）表示发起操作后当前线程继续执行，结果未来通过回调或 Promise 返回。

### API 参数与返回值补充

#### `setTimeout(callback, delay[, ...args])`

```txt
setTimeout(callback: Function, delay: number, ...args: any[]): Timeout
```

| 参数 | 含义 |
|---|---|
| `callback` | 计时结束后进入任务队列的回调函数。 |
| `delay` | 最小等待时间，单位是毫秒。不是精确执行时间。 |
| `...args` | 传给 callback 的额外参数。 |
| 返回值 | timer handle，可用于 `clearTimeout()`。 |

`delay` 表示“至少等待多久后可以执行”，不是“到点立刻抢占当前同步代码”。同步代码没有执行完，timer callback 不会执行。

#### `Promise.resolve(value).then(onFulfilled)`

| 部分 | 含义 |
|---|---|
| `Promise.resolve(value)` | 创建一个已经 fulfilled 的 Promise。 |
| `.then(onFulfilled)` | 注册 Promise reaction job。 |
| 返回值 | 一个新的 Promise。 |

`.then()` 的回调不会在当前同步栈里立即执行。它会进入微任务队列（microtask queue）。

#### `process.nextTick(callback[, ...args])`

```txt
process.nextTick(callback: Function, ...args: any[]): void
```

`process.nextTick()` 是 Node 特有机制。它的回调会在当前同步代码结束后、普通 Promise 微任务之前执行。学习阶段要知道它存在，但不要在业务代码里滥用。


### API 对应代码补充

这一节必须用代码观察同步代码、`process.nextTick()`、Promise microtask、timer callback 的顺序。

#### `nodeAsyncExecutionOrder.js`：Node 异步顺序观察

```js
// Goal:
// Compare sync code, nextTick, Promise microtask, and timer callback.

console.log('sync-start');

setTimeout(() => {
  console.log('timer-callback');
}, 0);

Promise.resolve().then(() => {
  console.log('promise-callback');
});

process.nextTick(() => {
  console.log('next-tick-callback');
});

console.log('sync-end');
```

预期输出：

```txt
sync-start
sync-end
next-tick-callback
promise-callback
timer-callback
```

执行顺序不是按代码位置简单从上到下执行所有 callback。真正过程是：

```txt
run top-level synchronous code
  -> drain process.nextTick queue
  -> drain Promise microtask queue
  -> enter timer phase later
```

#### `timerCancellation.js`：`setTimeout()` 返回值和取消 timer

```js
// Goal:
// Create and cancel a timer.

const timeoutHandle = setTimeout(() => {
  console.log('this-will-not-run');
}, 1000);

clearTimeout(timeoutHandle);

console.log('timer-cancelled');
```

预期输出：

```txt
timer-cancelled
```

这里 `setTimeout()` 的返回值不是业务结果，而是 timer handle。`clearTimeout()` 使用这个 handle 取消未来的 callback。

#### `awaitPauseScope.js`：`await` 只暂停当前 async function

```js
// Goal:
// Verify that await pauses the current async function, not the whole process.

async function runTask() {
  console.log('task-start');
  await Promise.resolve();
  console.log('task-after-await');
}

runTask();
console.log('outside-task');
```

预期输出：

```txt
task-start
outside-task
task-after-await
```

`await` 暂停的是 `runTask()` 的后半段，不是把整个 Node 进程卡住。


### 底层机制补充

当前这一节必须把三个队列分清：

```txt
synchronous call stack
  -> process.nextTick queue
  -> Promise microtask queue
  -> event loop phases, including timers and I/O callbacks
```

所以常见输出顺序是：

```txt
sync-start
sync-end
next-tick
promise
set-timeout
```

前提是这些任务在同一个顶层脚本里注册。不同 I/O 场景会涉及 event loop phase 的细节，学习基础阶段先掌握“同步先执行、微任务早于 timer callback”。

### 与浏览器异步模型的关系

浏览器和 Node 都有 JavaScript call stack、Promise microtask 和 host callback queue。差异是 Node 额外有：

| Node 特有或更重要的部分 | 作用 |
|---|---|
| `process.nextTick()` | Node 内部优先级很高的 next tick queue。 |
| libuv event loop phases | timers、poll、check、close callbacks 等阶段。 |
| thread pool | 某些文件系统、DNS、加密任务会离开主线程执行。 |

### 常见错误补充

| 错误理解 | 为什么错 | 正确理解 |
|---|---|---|
| `setTimeout(fn, 0)` 立即执行 | timer callback 也要等同步栈清空 | 它只是最小延迟为 0 的任务 |
| `await` 会阻塞整个 Node 进程 | `await` 暂停当前 async function，不阻塞事件循环 | 其他任务仍可继续被调度 |
| Promise 是多线程 | Promise 是异步结果模型，不等于线程 | 真正并行要看 Worker 或底层线程池 |
| 大量递归 `process.nextTick()` 没问题 | 会饿死 Promise 和 I/O callback | 不要滥用 nextTick |

### `asyncExecutionOrder.js`

```js
// Goal:
// Verify that asynchronous callbacks run after synchronous code.

console.log('sync-start');

setTimeout(() => {
  console.log('timer-callback');
}, 0);

Promise.resolve().then(() => {
  console.log('promise-callback');
});

console.log('sync-end');
```

### 运行方式

```bash
node asyncExecutionOrder.js
```

### 预期输出

```txt
sync-start
sync-end
promise-callback
timer-callback
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 同步代码先执行。 |
| 2 | `setTimeout()` 注册 timer callback。 |
| 3 | `Promise.then()` 注册 microtask callback。 |
| 4 | 同步代码结束后，microtask 先执行。 |
| 5 | timer callback 再执行。 |

### 常见错误

不要以为 `setTimeout(callback, 0)` 是立刻执行。它只是把回调安排到未来的任务阶段。

---

## 9. 04：Buffer 与二进制数据

### 结论

`Buffer` 是 Node.js 用来处理二进制数据（binary data）的对象。它和浏览器里的 `ArrayBuffer` 有关系，但在 Node.js I/O 中更常见。

### 文件结构

```txt
04-buffer/
  bufferEncoding.js
  bufferEncodingInspection.js
  bufferByteLength.js
  bufferConcatChunks.js
```

### 新关键字和新概念

#### Buffer

`Buffer` 表示固定长度的字节序列（sequence of bytes）。

#### byte

字节（byte）是二进制数据的基本单位，通常 1 byte = 8 bits。

#### encoding

编码（encoding）定义字符串和字节之间如何转换，例如 `utf8`、`hex`、`base64`。

### API 参数与返回值补充

#### `Buffer.from(input[, encoding])`

```txt
Buffer.from(string: string, encoding?: BufferEncoding): Buffer
Buffer.from(array: ArrayLike<number>): Buffer
Buffer.from(arrayBuffer: ArrayBuffer[, byteOffset[, length]]): Buffer
```

| 参数 | 含义 |
|---|---|
| `input` | 字符串、数字数组、ArrayBuffer 或另一个 Buffer。 |
| `encoding` | 字符串转字节时使用的编码，常见值是 `'utf8'`、`'hex'`、`'base64'`。 |
| 返回值 | Buffer 实例。 |

```js
const textBuffer = Buffer.from('Node', 'utf8');
```

这里的 `'Node'` 是字符序列，Buffer 保存的是编码后的字节序列。

#### `buffer.toString([encoding[, start[, end]]])`

```txt
buffer.toString(encoding?: BufferEncoding, start?: number, end?: number): string
```

| 参数 | 含义 |
|---|---|
| `encoding` | 按哪种编码把字节解码成字符串。默认是 `'utf8'`。 |
| `start` | 起始字节索引，包含。 |
| `end` | 结束字节索引，不包含。 |
| 返回值 | 解码后的字符串。 |

注意：`start` 和 `end` 是字节索引，不是字符索引。中文、emoji 等字符通常占多个字节。

#### `Buffer.concat(list[, totalLength])`

```txt
Buffer.concat(list: Buffer[], totalLength?: number): Buffer
```

| 参数 | 含义 |
|---|---|
| `list` | Buffer 数组。 |
| `totalLength` | 可选，总字节长度。传入后可减少一次长度计算。 |
| 返回值 | 新 Buffer，包含所有 Buffer 的字节。 |

HTTP request body、stream chunk 合并时经常使用它。


### API 对应代码补充

这一节要把 `Buffer.from()`、`buffer.toString()`、`Buffer.byteLength()`、`Buffer.concat()` 写成可运行代码。否则很容易只背“Buffer 是二进制数据”。

#### `bufferEncodingInspection.js`：字符串、字节、hex 和 base64

```js
// Goal:
// Convert text to bytes and inspect different encodings.

const messageText = 'Node runtime';
const messageBuffer = Buffer.from(messageText, 'utf8');

console.log(messageText.length);
console.log(messageBuffer.length);
console.log(messageBuffer.toString('utf8'));
console.log(messageBuffer.toString('hex'));
console.log(messageBuffer.toString('base64'));
console.log(messageBuffer.subarray(0, 4).toString('utf8'));
```

预期输出：

```txt
12
12
Node runtime
4e6f64652072756e74696d65
Tm9kZSBydW50aW1l
Node
```

#### `bufferByteLength.js`：字节长度不等于字符长度

```js
// Goal:
// Compare string length with UTF-8 byte length.

const currencyText = 'price:€';
const currencyBuffer = Buffer.from(currencyText, 'utf8');

console.log(currencyText.length);
console.log(currencyBuffer.length);
console.log(Buffer.byteLength(currencyText, 'utf8'));
console.log(currencyBuffer.toString('hex'));
```

`€` 在 UTF-8 中占多个字节，所以 string length 和 Buffer length 可能不同。

#### `bufferConcatChunks.js`：合并多个 Buffer chunk

```js
// Goal:
// Combine multiple Buffer chunks into one Buffer.

const firstChunk = Buffer.from('Node ', 'utf8');
const secondChunk = Buffer.from('stream ', 'utf8');
const thirdChunk = Buffer.from('body', 'utf8');

const combinedBuffer = Buffer.concat([firstChunk, secondChunk, thirdChunk]);

console.log(combinedBuffer.length);
console.log(combinedBuffer.toString('utf8'));
```

预期输出：

```txt
16
Node stream body
```

这个模式会在 HTTP request body 和 stream chunk 里反复出现：先收集多个 Buffer，再 `Buffer.concat()`，最后按编码转成 string。


### 底层机制补充

字符串（string）和 Buffer 的区别是：

| 类型 | 保存什么 | 主要用途 |
|---|---|---|
| string | Unicode 字符序列 | 文本处理、UI、JSON。 |
| Buffer | 原始字节序列 | 文件、网络、图片、压缩、加密、协议数据。 |

`Buffer.length` 是字节长度，不是字符数量。

```js
const text = 'é';
const textBuffer = Buffer.from(text, 'utf8');
console.log(text.length);
console.log(textBuffer.length);
```

常见输出：

```txt
1
2
```

原因是 JavaScript 字符串里的 `'é'` 按字符看是一个字符，但 UTF-8 编码后通常是 2 个字节。

### 和 ArrayBuffer 的关系

| 类型 | 主要环境 | 说明 |
|---|---|---|
| `ArrayBuffer` | JavaScript 标准库 / 浏览器 / Node | 通用二进制内存块。 |
| `Uint8Array` | JavaScript 标准库 | 按 8-bit unsigned integer 查看内存。 |
| `Buffer` | Node.js | Node 为 I/O 优化的 `Uint8Array` 子类。 |

所以 Buffer 不是“字符串的另一种写法”，而是 Node 处理字节 I/O 的核心数据结构。

### 常见错误补充

| 错误写法 | 错误原因 | 正确理解 |
|---|---|---|
| 用 `text.length` 判断上传文件大小 | 字符长度不等于字节长度 | 用 `Buffer.byteLength(text, 'utf8')` 或 Buffer 长度 |
| 随意切割 UTF-8 Buffer | 可能把一个多字节字符切断 | 文本边界要按编码处理 |
| 把 Buffer 直接当 JSON 返回 | JSON 不理解原始字节语义 | 明确转成字符串、base64 或二进制响应 |
| 使用已废弃的 `new Buffer()` | 历史 API 存在安全问题 | 使用 `Buffer.from()` 或 `Buffer.alloc()` |

### `bufferEncoding.js`

```js
// Goal:
// Convert between strings and binary data with Buffer.

const messageBuffer = Buffer.from('Node runtime', 'utf8');

console.log(messageBuffer.length);
console.log(messageBuffer.toString('utf8'));
console.log(messageBuffer.toString('hex'));
console.log(messageBuffer.subarray(0, 4).toString('utf8'));
```

### 运行方式

```bash
node bufferEncoding.js
```

### 预期输出

```txt
12
Node runtime
4e6f64652072756e74696d65
Node
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `Buffer.from()` 把字符串编码成字节。 |
| 2 | `length` 返回字节数，不是字符数。 |
| 3 | `toString('utf8')` 把字节还原成字符串。 |
| 4 | `toString('hex')` 把每个字节显示为十六进制。 |
| 5 | `subarray(0, 4)` 创建前 4 个字节的视图。 |

### 常见错误

不要把字符串长度和 Buffer 字节长度混为一谈。中文字符、emoji、特殊符号在 UTF-8 中可能占多个字节。代码示例中不要使用中文字符。

### 和项目开发的关系

Buffer 常见于：

| 场景 | 说明 |
|---|---|
| 文件读取 | 读取二进制文件或未指定编码的文件。 |
| 网络通信 | TCP socket 收到的数据通常是 Buffer。 |
| 加密哈希 | `crypto` 经常处理 Buffer。 |
| Stream | 流读取的数据块常常是 Buffer。 |

---

## 10. 05：事件与 EventEmitter

### 结论

`EventEmitter` 是 Node.js 的事件模型核心。很多 Node 对象通过事件（events）通知外部发生了什么。

### 文件结构

```txt
05-event-emitter/
  orderEvents.js
  eventEmitterLifecycle.js
  eventEmitterSyncOrder.js
  eventEmitterErrorHandling.js
```

### 新关键字和新概念

#### EventEmitter

`EventEmitter` 是 Node.js 的事件发射器类（event emitter class）。它能注册监听器（listener）并触发事件。

#### listener

监听器（listener）是事件发生时被调用的函数。

#### emit

`emit()` 的意思是发射事件（emit an event）。

### API 参数与返回值补充

#### `emitter.on(eventName, listener)`

```txt
emitter.on(eventName: string | symbol, listener: Function): EventEmitter
```

| 参数 | 含义 |
|---|---|
| `eventName` | 事件名，可以是 string 或 symbol。 |
| `listener` | 事件触发时同步调用的函数。 |
| 返回值 | 当前 emitter 本身，方便链式调用。 |

`on()` 不会执行 listener，它只是注册 listener。

#### `emitter.once(eventName, listener)`

```txt
emitter.once(eventName: string | symbol, listener: Function): EventEmitter
```

`once()` 注册一次性 listener。第一次 `emit()` 后会自动移除。

#### `emitter.emit(eventName[, ...args])`

```txt
emitter.emit(eventName: string | symbol, ...args: any[]): boolean
```

| 返回值 | 含义 |
|---|---|
| `true` | 至少有一个 listener 被调用。 |
| `false` | 没有 listener 处理这个事件。 |

`emit()` 后面的参数会原样传给 listener：

```js
orderEvents.emit('created', { orderId: 'A001' });
```

对应 listener：

```js
orderEvents.on('created', (orderRecord) => {
  console.log(orderRecord.orderId);
});
```

#### `emitter.off(eventName, listener)`

```txt
emitter.off(eventName: string | symbol, listener: Function): EventEmitter
```

移除 listener 时必须传入同一个函数引用。两个长得一样的箭头函数不是同一个函数对象。


### API 对应代码补充

这一节要用代码看清楚：`on()` 是注册，`emit()` 是同步调用，`once()` 是一次性监听，`off()` 必须传同一个函数引用。

#### `eventEmitterLifecycle.js`：`on()`、`once()`、`emit()`、`off()`

```js
// Goal:
// Verify listener registration, one-time listeners, and listener removal.

import { EventEmitter } from 'node:events';

const orderEvents = new EventEmitter();

function handleOrderCreated(orderId) {
  console.log(`created:${orderId}`);
}

orderEvents.on('created', handleOrderCreated);

orderEvents.once('paid', (orderId) => {
  console.log(`paid-once:${orderId}`);
});

console.log(orderEvents.emit('created', 'ORD-100'));
console.log(orderEvents.emit('paid', 'ORD-100'));
console.log(orderEvents.emit('paid', 'ORD-100'));

orderEvents.off('created', handleOrderCreated);

console.log(orderEvents.emit('created', 'ORD-101'));
```

预期输出：

```txt
created:ORD-100
true
paid-once:ORD-100
true
false
false
```

关键点：`emit()` 的返回值只表示有没有 listener 被调用，不表示业务成功或失败。

#### `eventEmitterSyncOrder.js`：`emit()` 默认同步执行

```js
// Goal:
// Verify that EventEmitter listeners run synchronously by default.

import { EventEmitter } from 'node:events';

const workflowEvents = new EventEmitter();

workflowEvents.on('step', () => {
  console.log('listener-running');
});

console.log('before-emit');
workflowEvents.emit('step');
console.log('after-emit');
```

预期输出：

```txt
before-emit
listener-running
after-emit
```

#### `eventEmitterErrorHandling.js`：`error` 事件处理

```js
// Goal:
// Handle an error event explicitly.

import { EventEmitter } from 'node:events';

const serviceEvents = new EventEmitter();

serviceEvents.on('error', (serviceError) => {
  console.log(serviceError.message);
});

serviceEvents.emit('error', new Error('service-failed'));
```

没有 `error` listener 时，很多 EventEmitter 发出 `error` 事件会变成未处理错误。真实项目里关键 emitter 必须显式处理错误。


### 底层机制补充

EventEmitter 的核心不是异步，而是发布-订阅式函数调用（publish-subscribe function dispatch）。

```txt
emitter stores eventName -> listeners array
emit(eventName, payload)
  -> finds listeners by eventName
  -> calls listeners synchronously in registration order
```

这意味着：

```js
orderEvents.on('created', () => {
  console.log('listener');
});

console.log('before');
orderEvents.emit('created');
console.log('after');
```

输出顺序是：

```txt
before
listener
after
```

listener 是在 `emit()` 调用栈内部同步执行的。只有 listener 内部自己使用 Promise、timer 或 I/O 时，才会出现异步行为。

### `error` 事件规则

`error` 是特殊事件。多数 EventEmitter 如果触发 `error` 事件但没有对应 listener，Node 会把它当成未处理错误，可能导致进程崩溃。

```js
orderEvents.on('error', (eventError) => {
  console.error(eventError.message);
});
```

### 常见错误补充

| 错误写法 | 错误原因 | 修正方式 |
|---|---|---|
| 以为 `emit()` 一定异步 | EventEmitter listener 默认同步执行 | 按同步调用栈理解输出顺序 |
| 忘记监听 `error` | 未处理 `error` 会造成严重问题 | 给关键 emitter 注册 `error` listener |
| 用匿名函数后再 `off()` | 无法拿到同一个函数引用 | 把 listener 保存到变量 |
| 在 listener 里做长时间 CPU 计算 | 会阻塞当前线程 | CPU 密集任务考虑 Worker |

### `orderEvents.js`

```js
// Goal:
// Verify how EventEmitter registers and emits events.

import { EventEmitter } from 'node:events';

const orderEvents = new EventEmitter();

orderEvents.on('created', (orderId) => {
  console.log(`order-created:${orderId}`);
});

orderEvents.once('paid', (orderId) => {
  console.log(`order-paid-once:${orderId}`);
});

orderEvents.emit('created', 'ORD-100');
orderEvents.emit('paid', 'ORD-100');
orderEvents.emit('paid', 'ORD-100');
```

### 运行方式

```bash
node orderEvents.js
```

### 预期输出

```txt
order-created:ORD-100
order-paid-once:ORD-100
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 创建 `EventEmitter` 实例。 |
| 2 | `on()` 注册可重复触发的监听器。 |
| 3 | `once()` 注册只触发一次的监听器。 |
| 4 | 第一次 `emit('created')` 调用 created listener。 |
| 5 | 第一次 `emit('paid')` 调用 paid listener。 |
| 6 | 第二次 `emit('paid')` 不再调用 once listener。 |

### 常见错误

不要忘记监听 `'error'` 事件。很多 Node 对象如果发出 `'error'` 事件而没有监听器，程序可能崩溃。

---

## 11. 06：流 Streams 与背压 Backpressure

### 结论

流（stream）用于分块处理数据，不需要一次性把所有数据加载到内存。背压（backpressure）用于防止写入方被过量数据压垮。

### 文件结构

```txt
06-streams/
  input.txt
  streamFileCopy.js
  streamChunkInspection.js
  streamPipelineCopy.js
  writableStreamWrite.js
```

### 新关键字和新概念

#### Readable stream

可读流（readable stream）是可以读取数据的流。

#### Writable stream

可写流（writable stream）是可以写入数据的流。

#### Duplex stream

双工流（duplex stream）既可读又可写。

#### pipeline

`pipeline()` 用来把多个流连接起来，并统一处理完成和错误。

### API 参数与返回值补充

#### `createReadStream(path[, options])`

```txt
createReadStream(path: string | Buffer | URL, options?: object | string): ReadStream
```

| 参数 | 含义 |
|---|---|
| `path` | 要读取的文件路径。 |
| `options.encoding` | 设置后读取到 string；不设置通常读取到 Buffer。 |
| `options.highWaterMark` | 内部缓冲区水位线，影响每次读取块大小。 |
| 返回值 | ReadStream，可读流（readable stream）。 |

#### `createWriteStream(path[, options])`

```txt
createWriteStream(path: string | Buffer | URL, options?: object | string): WriteStream
```

| 参数 | 含义 |
|---|---|
| `path` | 要写入的文件路径。 |
| `options.flags` | 文件打开模式，默认通常是写入并截断。 |
| `options.encoding` | 字符串写入时使用的编码。 |
| 返回值 | WriteStream，可写流（writable stream）。 |

#### `readable.pipe(writable[, options])`

```txt
readable.pipe(destination: Writable, options?: { end?: boolean }): Writable
```

| 参数 | 含义 |
|---|---|
| `destination` | 数据写入目标。 |
| `options.end` | 源流结束时是否自动结束目标流，默认是 `true`。 |
| 返回值 | 目标 writable stream。 |

`pipe()` 的核心意义是把读取端和写入端连接起来，同时处理基本背压。

#### `pipeline(source, destination, callback)` / `pipeline(...streams)`

学习阶段先记住：`pipeline()` 比手写多个 `.pipe()` 更适合真实项目，因为它会统一处理错误传播和关闭。


### API 对应代码补充

这一节不能只讲 `createReadStream()`、`createWriteStream()`、`pipe()`、`pipeline()`。你要写代码观察 chunk、复制文件和错误处理。

#### `streamChunkInspection.js`：观察 readable stream 的 chunk

```js
// Goal:
// Inspect chunks from a readable file stream.

import { createReadStream } from 'node:fs';

const readStream = createReadStream('input.txt', { encoding: 'utf8' });

readStream.on('data', (textChunk) => {
  console.log(`chunk:${JSON.stringify(textChunk)}`);
});

readStream.on('end', () => {
  console.log('read-complete');
});

readStream.on('error', (streamError) => {
  console.error(streamError.message);
});
```

注意：chunk 不等于一行。小文件可能一次读完，大文件可能拆成多个 chunk。stream 只保证按顺序给你数据块，不保证按业务语义切分。

#### `streamPipelineCopy.js`：用 `pipeline()` 复制文件

```js
// Goal:
// Copy a file with streams and pipeline.

import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

await pipeline(
  createReadStream('input.txt'),
  createWriteStream('output.txt'),
);

console.log('copy-complete');
```

#### `writableStreamWrite.js`：用 writable stream 写入多段数据

```js
// Goal:
// Write multiple chunks into a writable stream.

import { createWriteStream } from 'node:fs';

const writeStream = createWriteStream('stream-output.txt', { encoding: 'utf8' });

writeStream.write('alpha\n');
writeStream.write('beta\n');
writeStream.end('gamma\n');

writeStream.on('finish', () => {
  console.log('write-complete');
});

writeStream.on('error', (streamError) => {
  console.error(streamError.message);
});
```

`write()` 是写入 chunk，`end()` 是结束写入方向。没有 `end()`，可写流可能一直处于未完成状态。


### 底层机制补充

流解决的问题是：不要一次性把大文件、大请求体、大响应体全部加载进内存。

```txt
without stream:
  read entire file into memory
  then write entire file

with stream:
  read chunk
  write chunk
  read next chunk
  write next chunk
```

背压（backpressure）出现的原因是读得太快、写得太慢。

```txt
Readable produces chunks faster than Writable can consume.
Writable internal buffer grows.
Readable must slow down.
```

`pipe()` 会根据 writable 的返回状态控制 readable 的流动速度。你不需要手动把所有 chunk 保存到数组里。

### chunk 类型补充

| 场景 | chunk 类型 |
|---|---|
| 未设置 encoding 的文件流 | Buffer。 |
| 设置 `{ encoding: 'utf8' }` | string。 |
| HTTP request body | 通常是 Buffer。 |
| objectMode stream | 任意 JavaScript value。 |

### 常见错误补充

| 错误写法 | 错误原因 | 修正方式 |
|---|---|---|
| 大文件使用 `readFile()` 一次性读取 | 内存压力大 | 使用 `createReadStream()` |
| 手动监听 `data` 后忘记错误处理 | stream error 不会自动被 try/catch 捕获 | 注册 `error` 或使用 `pipeline()` |
| 以为 chunk 一定是一整行 | chunk 是字节块，不是语义行 | 行解析需要额外缓冲逻辑 |
| 把 `pipe()` 当成复制完成信号 | `pipe()` 返回目标流，不代表完成 | 监听 `finish` / `close` 或用 `pipeline()` |

### `input.txt`

```txt
alpha
beta
gamma
```

### `streamFileCopy.js`

```js
// Goal:
// Copy a file with streams and pipeline.

import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

await pipeline(
  createReadStream('input.txt'),
  createWriteStream('output.txt'),
);

console.log('copy-complete');
```

### 运行方式

```bash
node streamFileCopy.js
```

### 预期输出

```txt
copy-complete
```

并生成：

```txt
output.txt
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `createReadStream()` 创建可读流。 |
| 2 | `createWriteStream()` 创建可写流。 |
| 3 | `pipeline()` 把可读流的数据传入可写流。 |
| 4 | 数据按 chunk 分块移动。 |
| 5 | 完成后 Promise fulfilled，打印结果。 |

### 常见错误

不要用 `fs.readFile()` 处理所有大文件。小文件可以一次性读，大文件应该优先考虑 stream。

### 和项目开发的关系

流在这些地方非常重要：

| 场景 | 说明 |
|---|---|
| 文件上传下载 | 不要一次性占用大量内存。 |
| 日志处理 | 持续写入。 |
| HTTP 请求响应 | 请求体和响应体都可能是流。 |
| 压缩和加密 | 数据可以边读边转换。 |

---

## 12. 07：process 与 os

### 结论

`process` 描述当前 Node 进程，`os` 描述操作系统环境。

### 文件结构

```txt
07-process-os/
  processSystemInfo.js
  processOsBoundary.js
  environmentPortParsing.js
```

### 新关键字和新概念

#### process

当前 Node.js 进程对象。

#### os

Node.js 内置模块，提供操作系统信息。

#### exit code

退出码（exit code）表示程序退出状态。通常 `0` 表示成功，非 `0` 表示失败。

### API 参数与返回值补充

#### `process.cwd()`

```txt
process.cwd(): string
```

返回当前进程的工作目录。它是“命令从哪里启动”的位置，不是“当前文件在哪里”。

#### `process.platform`

```txt
process.platform: string
```

返回当前操作系统平台标识。常见值包括：

| 值 | 平台 |
|---|---|
| `'win32'` | Windows。 |
| `'darwin'` | macOS。 |
| `'linux'` | Linux。 |

#### `process.memoryUsage()`

```txt
process.memoryUsage(): object
```

常见返回字段：

| 字段 | 含义 |
|---|---|
| `rss` | Resident Set Size，进程占用的物理内存总量。 |
| `heapTotal` | V8 heap 已分配总量。 |
| `heapUsed` | V8 heap 已使用量。 |
| `external` | V8 管理之外、与 JS 对象绑定的内存。 |
| `arrayBuffers` | ArrayBuffer 和 SharedArrayBuffer 相关内存。 |

#### `os.cpus()`

```txt
os.cpus(): object[]
```

返回每个逻辑 CPU 核心的信息数组。数组长度不一定等于物理核心数量，也不应该直接当作“可以无限创建线程”的依据。

#### `os.totalmem()` / `os.freemem()`

```txt
os.totalmem(): number
os.freemem(): number
```

返回字节数（bytes）。如果要打印成 MB，需要自己换算：

```js
const megabytes = os.totalmem() / 1024 / 1024;
```


### API 对应代码补充

这一节要用代码区分“当前进程信息”和“操作系统信息”。

#### `processOsBoundary.js`：process 和 os 的边界

```js
// Goal:
// Compare current process information with operating system information.

import os from 'node:os';
import process from 'node:process';

const memoryUsage = process.memoryUsage();
const totalMemoryInMegabytes = Math.round(os.totalmem() / 1024 / 1024);
const freeMemoryInMegabytes = Math.round(os.freemem() / 1024 / 1024);

console.log(process.pid > 0);
console.log(process.platform);
console.log(process.cwd().length > 0);
console.log(os.cpus().length > 0);
console.log(totalMemoryInMegabytes > 0);
console.log(freeMemoryInMegabytes > 0);
console.log(memoryUsage.heapUsed > 0);
```

#### `environmentPortParsing.js`：安全读取环境变量

```js
// Goal:
// Parse environment variables explicitly.

import process from 'node:process';

function readPort(defaultPort) {
  const rawPortValue = process.env.PORT;

  if (rawPortValue === undefined) {
    return defaultPort;
  }

  const parsedPortValue = Number(rawPortValue);

  if (!Number.isInteger(parsedPortValue)) {
    throw new Error('PORT must be an integer');
  }

  return parsedPortValue;
}

console.log(readPort(3000));
```

这里的重点是：环境变量是外部输入，不能因为变量名叫 `PORT` 就默认它一定是合法 number。


### 底层机制补充

`process` 和 `os` 的边界：

| API | 关注对象 |
|---|---|
| `process` | 当前 Node 进程本身。 |
| `os` | 当前操作系统环境。 |

`process.memoryUsage()` 不是整个电脑内存使用情况，它只描述当前 Node 进程。`os.totalmem()` 才是操作系统层面的总内存。

### 和工程开发的关系

这些 API 常用于：

| 场景 | API |
|---|---|
| CLI 工具定位项目根目录 | `process.cwd()` |
| 根据平台选择命令 | `process.platform` |
| 读取端口和环境配置 | `process.env` |
| 排查内存泄漏 | `process.memoryUsage()` |
| 根据机器能力设置并发上限 | `os.cpus()` |

### 常见错误补充

| 错误理解 | 为什么错 | 正确理解 |
|---|---|---|
| `os.freemem()` 越大程序越快 | 空闲内存不是性能唯一指标 | 还要看 CPU、I/O、GC、算法 |
| `os.cpus().length` 等于最佳 Worker 数量 | Worker 数量还取决于任务类型和 I/O 比例 | CPU 密集任务才接近核心数思考 |
| `process.env` 值是 number/boolean | 环境变量是字符串 | 显式转换和校验 |
| `process.exit()` 随便调用 | 可能中断未完成 I/O | 优先设置 `process.exitCode` 并自然退出 |

### `processSystemInfo.js`

```js
// Goal:
// Read process and operating system information.

import os from 'node:os';
import process from 'node:process';

console.log(process.platform.length > 0);
console.log(process.pid > 0);
console.log(os.cpus().length > 0);
console.log(os.totalmem() > 0);
```

### 运行方式

```bash
node processSystemInfo.js
```

### 预期输出

```txt
true
true
true
true
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `process.platform` 读取当前平台名称。 |
| 2 | `process.pid` 读取当前进程 ID。 |
| 3 | `os.cpus()` 读取 CPU 信息数组。 |
| 4 | `os.totalmem()` 读取系统总内存字节数。 |

### 常见错误

不要把 `os.cpus().length` 直接等同于“你的程序一定会并行使用这么多核心”。普通 Node.js 主线程仍然执行 JavaScript 单线程代码。

---

## 13. 08：文件系统 fs 与路径 path

### 结论

`fs` 用于操作文件和目录，`path` 用于安全地拼接和分析路径。现代 Node.js 学习中优先使用 `node:fs/promises`。

### 文件结构

```txt
08-fs-path/
  fileReportStorage.js
  fsFileOperations.js
  pathAnalysisOnly.js
```

### 新关键字和新概念

#### fs

文件系统模块（file system module）。

#### path

路径处理模块（path module）。

#### promise-based API

基于 Promise 的 API，适合和 `async` / `await` 配合。

### API 参数与返回值补充

#### `mkdir(path[, options])`

```txt
mkdir(path: string | Buffer | URL, options?: object): Promise<string | undefined>
```

| 参数 | 含义 |
|---|---|
| `path` | 要创建的目录路径。 |
| `options.recursive` | 为 `true` 时允许递归创建多级目录。 |
| 返回值 | Promise。递归创建时可能返回第一个被创建的目录路径，也可能是 `undefined`。 |

学习阶段重点不是返回值，而是 `await mkdir(..., { recursive: true })` 可以保证目录存在。

#### `writeFile(file, data[, options])`

```txt
writeFile(file: string | Buffer | URL, data: string | Buffer, options?: object | string): Promise<void>
```

| 参数 | 含义 |
|---|---|
| `file` | 目标文件路径。 |
| `data` | 要写入的字符串或 Buffer。 |
| `options.encoding` | 字符串编码，常用 `'utf8'`。 |
| 返回值 | Promise，成功时 fulfilled 为 `undefined`。 |

`writeFile()` 默认会覆盖原文件内容。需要追加时使用 `appendFile()`。

#### `readFile(file[, options])`

```txt
readFile(file: string | Buffer | URL, options?: object | string): Promise<Buffer | string>
```

| 情况 | 返回值 |
|---|---|
| 不传 encoding | Buffer。 |
| 传 `'utf8'` | string。 |

```js
const fileBuffer = await readFile(reportFilePath);
const fileText = await readFile(reportFilePath, 'utf8');
```

#### `stat(path)`

```txt
stat(path: string | Buffer | URL): Promise<Stats>
```

`Stats` 对象常用方法：

| 方法 / 属性 | 含义 |
|---|---|
| `stats.isFile()` | 是否是普通文件。 |
| `stats.isDirectory()` | 是否是目录。 |
| `stats.size` | 文件大小，单位 bytes。 |
| `stats.mtime` | 修改时间。 |


### API 对应代码补充

这一节必须用代码区分：`path` 只处理字符串，`fs/promises` 真正访问磁盘；`readFile()` 不传 encoding 返回 Buffer，传 encoding 返回 string。

#### `fsFileOperations.js`：写入、读取、追加、检查文件

```js
// Goal:
// Write, read, append, and inspect a file.

import { appendFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const reportDirectory = 'generated-reports';
const reportFilePath = path.join(reportDirectory, 'summary.txt');

await mkdir(reportDirectory, { recursive: true });
await writeFile(reportFilePath, 'status:ok\n', 'utf8');
await appendFile(reportFilePath, 'count:3\n', 'utf8');

const reportBuffer = await readFile(reportFilePath);
const reportText = await readFile(reportFilePath, 'utf8');
const reportStats = await stat(reportFilePath);

console.log(Buffer.isBuffer(reportBuffer));
console.log(reportText.includes('status:ok'));
console.log(reportStats.isFile());
console.log(reportStats.size === reportBuffer.length);
```

预期输出：

```txt
true
true
true
true
```

#### `pathAnalysisOnly.js`：路径分析不等于文件存在

```js
// Goal:
// Show that path methods do not access the file system.

import path from 'node:path';

const reportFilePath = path.join('generated-reports', 'summary.txt');

console.log(path.dirname(reportFilePath));
console.log(path.basename(reportFilePath));
console.log(path.extname(reportFilePath));
```

这段代码只分析路径字符串，不会确认 `summary.txt` 是否真的存在。要确认文件状态，必须使用 `stat()`、`access()` 或实际读写操作。


### 底层机制补充

`fs/promises` 的方法返回 Promise，但这不表示文件读写在 JavaScript 主线程里同步执行。Node 会把很多文件系统操作交给底层系统接口或线程池处理，完成后再把结果调度回事件循环。

```txt
JavaScript calls readFile()
  -> Node starts filesystem work
  -> current async function yields at await
  -> event loop can handle other work
  -> filesystem result completes
  -> Promise reaction resumes async function
```

### path 与 fs 的边界

| 模块 | 负责什么 | 是否访问磁盘 |
|---|---|---|
| `node:path` | 处理路径字符串 | 否 |
| `node:fs` / `node:fs/promises` | 访问文件系统 | 是 |

`path.join('a', 'b')` 不会创建目录，也不会检查文件是否存在。它只是返回路径字符串。

### 常见错误补充

| 错误写法 | 错误原因 | 修正方式 |
|---|---|---|
| `writeFile('logs/app.log', text)` 前没有创建 `logs` | 父目录不存在会报 `ENOENT` | 先 `await mkdir('logs', { recursive: true })` |
| 读取文本时忘记 encoding | 得到 Buffer，不是 string | `await readFile(filePath, 'utf8')` |
| 用 `path.join()` 判断文件存在 | path 不访问磁盘 | 用 `stat()` / `access()` |
| 并发多次写同一个文件 | 可能产生顺序和覆盖问题 | 用队列、append、数据库或日志库 |

### `fileReportStorage.js`

```js
// Goal:
// Write, read, and inspect a file with fs/promises and path.

import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const reportDirectory = 'generated-reports';
const reportFilePath = path.join(reportDirectory, 'summary.txt');

await mkdir(reportDirectory, { recursive: true });
await writeFile(reportFilePath, 'status:ok\ncount:3\n', 'utf8');

const reportText = await readFile(reportFilePath, 'utf8');
const reportStats = await stat(reportFilePath);

console.log(reportText.includes('status:ok'));
console.log(reportStats.isFile());
```

### 运行方式

```bash
node fileReportStorage.js
```

### 预期输出

```txt
true
true
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `path.join()` 生成跨平台路径。 |
| 2 | `mkdir()` 创建目录。 |
| 3 | `writeFile()` 写入文本。 |
| 4 | `readFile()` 读取文本。 |
| 5 | `stat()` 读取文件元信息。 |
| 6 | `isFile()` 判断路径是否是文件。 |

### 常见错误

不要手写路径分隔符：

```js
const brokenPath = 'generated-reports/summary.txt';
```

学习阶段可以看懂，但真实跨平台项目优先使用 `path.join()`。

---

## 14. 09：HTTP 客户端与服务器

### 结论

Node.js 可以直接创建 HTTP 服务器（HTTP server），也可以作为 HTTP 客户端（HTTP client）发起请求。

### 文件结构

```txt
09-http-server-client/
  basicHttpServer.js
  httpQueryServer.js
  httpPostBodyServer.js
```

### 新关键字和新概念

#### HTTP server

监听端口、接收请求、返回响应的程序。

#### request

请求对象，包含 URL、方法、请求头和请求体。

#### response

响应对象，用于设置状态码、响应头和响应体。

#### port

端口（port）是网络服务在一台机器上的入口编号。

### API 参数与返回值补充

#### `createServer([options], requestListener)`

```txt
createServer(requestListener?: (request, response) => void): http.Server
```

| 参数 | 含义 |
|---|---|
| `requestListener` | 每次收到 HTTP 请求时调用的函数。 |
| `request` | `IncomingMessage` 对象，可读流，包含请求方法、URL、headers、body stream。 |
| `response` | `ServerResponse` 对象，可写流，用来写响应状态、headers、body。 |
| 返回值 | `http.Server` 实例。 |

`requestListener` 不是路由表，它只是“所有请求的入口函数”。你在里面用 `request.method` 和 `request.url` 做分支，才形成基础路由。

#### `server.listen(port[, hostname][, callback])`

```txt
server.listen(port: number, hostname?: string, callback?: Function): Server
```

| 参数 | 含义 |
|---|---|
| `port` | 服务器监听端口。 |
| `hostname` | 监听地址。省略时通常监听所有可用地址。 |
| `callback` | 成功开始监听后调用。 |
| 返回值 | 当前 server。 |

#### `response.writeHead(statusCode[, statusMessage][, headers])`

```txt
response.writeHead(statusCode: number, headers?: object): ServerResponse
```

| 参数 | 含义 |
|---|---|
| `statusCode` | HTTP 状态码。 |
| `headers` | 响应头对象。 |
| 返回值 | 当前 response。 |

#### `response.end([data[, encoding]][, callback])`

```txt
response.end(data?: string | Buffer, encoding?: string, callback?: Function): ServerResponse
```

`response.end()` 的意义是告诉客户端：响应体已经写完。没有调用它，请求可能一直挂起。


### API 对应代码补充

这一节不能只写 `createServer()`。HTTP 练习必须包含 method、URL、query、request body、response body，否则你后面学 Express / Next.js API Route 会把 request 当黑盒。

#### `httpQueryServer.js`：解析 URL 和 query

```js
// Goal:
// Read pathname and query parameters from a Node.js HTTP request.

import { createServer } from 'node:http';

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url, 'http://localhost:3000');

  if (request.method === 'GET' && requestUrl.pathname === '/search') {
    const keyword = requestUrl.searchParams.get('keyword') ?? '';

    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ keyword }));
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ error: 'not-found' }));
});

server.listen(3000, () => {
  console.log('server-ready:http://localhost:3000');
});
```

测试：

```bash
curl "http://localhost:3000/search?keyword=node"
```

预期输出：

```json
{"keyword":"node"}
```

#### `httpPostBodyServer.js`：读取 POST request body

```js
// Goal:
// Read a POST request body from the request stream.

import { createServer } from 'node:http';

async function readRequestBody(request) {
  const bodyChunks = [];

  for await (const bodyChunk of request) {
    bodyChunks.push(bodyChunk);
  }

  return Buffer.concat(bodyChunks).toString('utf8');
}

const server = createServer(async (request, response) => {
  if (request.method === 'POST' && request.url === '/message') {
    const requestBodyText = await readRequestBody(request);

    response.writeHead(201, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ received: requestBodyText }));
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ error: 'not-found' }));
});

server.listen(3000, () => {
  console.log('server-ready:http://localhost:3000');
});
```

测试：

```bash
curl -X POST http://localhost:3000/message -d "hello-node"
```

预期输出：

```json
{"received":"hello-node"}
```

这段代码说明：Node 原生 `http` 不会自动提供 `request.body`。请求体本质是 readable stream，需要你自己读取 chunk。


### request / response 对象模型补充

HTTP 服务器里的两个参数都是对象，不是普通字符串：

| 对象 | 本质 | 关键属性 / 方法 |
|---|---|---|
| `request` | readable stream | `method`、`url`、`headers`、异步迭代 body chunk。 |
| `response` | writable stream | `writeHead()`、`write()`、`end()`。 |

读取 request body 时不能直接写：

```js
console.log(request.body);
```

Node 核心 `http` 模块不会自动帮你解析 body。request body 是流，需要手动收集 chunk 或交给框架中间件处理。

### URL 处理补充

`request.url` 通常只包含 path 和 query，不包含完整 origin。要解析 query，可以构造完整 URL：

```js
const requestUrl = new URL(request.url, 'http://localhost:3000');
console.log(requestUrl.pathname);
console.log(requestUrl.searchParams.get('page'));
```

### 常见错误补充

| 错误写法 | 错误原因 | 修正方式 |
|---|---|---|
| 忘记 `response.end()` | 客户端不知道响应已结束 | 每条分支都必须结束响应 |
| 直接读取 `request.body` | Node 核心 http 不自动解析 body | 用 stream 收集或使用框架中间件 |
| 在写 body 后再改 header | headers 可能已经发送 | 先设置 header，再写 body |
| 把 `request.url === '/users?page=1'` 当路由判断 | query 会影响字符串匹配 | 用 `new URL()` 解析 pathname |
| 不处理 method | 同一路径可能有 GET/POST/PUT/DELETE | 同时判断 method 和 pathname |

### `basicHttpServer.js`

```js
// Goal:
// Create a small HTTP server with Node.js.

import { createServer } from 'node:http';

const server = createServer((request, response) => {
  if (request.url === '/health') {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ error: 'not-found' }));
});

server.listen(3000, () => {
  console.log('server-ready:http://localhost:3000');
});
```

### 运行方式

终端一：

```bash
node basicHttpServer.js
```

终端二：

```bash
curl http://localhost:3000/health
```

### 预期输出

服务器终端：

```txt
server-ready:http://localhost:3000
```

请求终端：

```json
{"status":"ok"}
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `createServer()` 创建服务器对象。 |
| 2 | 每次请求到达时，回调函数执行。 |
| 3 | 根据 `request.url` 判断路由。 |
| 4 | `writeHead()` 设置状态码和响应头。 |
| 5 | `end()` 结束响应并发送响应体。 |
| 6 | `listen()` 让服务器监听端口。 |

### 常见错误

不要忘记调用 `response.end()`。没有结束响应，客户端会一直等待。

### 和项目开发的关系

Express、Fastify、Next.js server 等框架都建立在 HTTP 请求响应模型之上。你不用长期手写原生 `http`，但必须懂它的底层模型。

---

## 15. 10：非 HTTP 网络 net

### 结论

`node:net` 可以创建 TCP 服务器和 TCP 客户端。TCP socket 是双工流（duplex stream）。

### 文件结构

```txt
10-net-tcp/
  tcpEchoServer.js
  tcpEchoClient.js
  tcpEchoServerWithErrors.js
  tcpEchoClientWithClose.js
  tcpMessageBoundaryClient.js
```

### 新关键字和新概念

#### TCP

传输控制协议（Transmission Control Protocol），提供可靠的字节流连接。

#### socket

套接字（socket）表示网络连接的一端。

#### duplex stream

双工流既可以读取，也可以写入。

### API 参数与返回值补充

#### `net.createServer([options], connectionListener)`

```txt
createServer(connectionListener?: (socket) => void): net.Server
```

| 参数 | 含义 |
|---|---|
| `connectionListener` | 每当有 TCP client 建立连接时调用。 |
| `socket` | `net.Socket`，双工流（duplex stream）。 |
| 返回值 | `net.Server` 实例。 |

#### `server.listen(port[, host][, callback])`

```txt
server.listen(port: number, host?: string, callback?: Function): Server
```

启动 TCP server 监听端口。

#### `net.createConnection(options[, connectListener])`

```txt
createConnection(options: object, connectListener?: Function): net.Socket
```

常用 options：

| 字段 | 含义 |
|---|---|
| `port` | 目标端口。 |
| `host` | 目标主机名或 IP，默认通常是 localhost。 |

#### `socket.write(data[, encoding][, callback])`

```txt
socket.write(data: string | Buffer, encoding?: string, callback?: Function): boolean
```

返回 boolean：

| 返回值 | 含义 |
|---|---|
| `true` | 数据已交给内部缓冲区，继续写入通常安全。 |
| `false` | 内部缓冲区压力变大，应等待 `drain` 事件。 |

#### `socket.end([data[, encoding]][, callback])`

结束写入方向。TCP 是双工连接，`end()` 表示这一端不再继续发送数据。


### API 对应代码补充

这一节必须写服务端和客户端两边。TCP 是双工流，不是 HTTP 路由。

#### `tcpEchoServerWithErrors.js`：带错误处理的 TCP echo server

```js
// Goal:
// Create a TCP echo server with socket error handling.

import net from 'node:net';

const server = net.createServer((socket) => {
  socket.write('ready\n');

  socket.on('data', (dataChunk) => {
    const messageText = dataChunk.toString('utf8').trim();
    socket.write(`echo:${messageText}\n`);
  });

  socket.on('error', (socketError) => {
    console.error(socketError.message);
  });
});

server.on('error', (serverError) => {
  console.error(serverError.message);
});

server.listen(4000, () => {
  console.log('tcp-server-ready');
});
```

#### `tcpEchoClientWithClose.js`：连接、写入、读取、结束

```js
// Goal:
// Connect to a TCP server and close after receiving an echo.

import net from 'node:net';

const client = net.createConnection({ port: 4000 }, () => {
  const canContinueWriting = client.write('hello\n');
  console.log(`write-buffer-ok:${canContinueWriting}`);
});

client.on('data', (dataChunk) => {
  const responseText = dataChunk.toString('utf8').trim();
  console.log(responseText);

  if (responseText.startsWith('echo:')) {
    client.end();
  }
});

client.on('end', () => {
  console.log('connection-ended');
});

client.on('error', (clientError) => {
  console.error(clientError.message);
});
```

这里 `client.write()` 返回 boolean。它不是服务器响应值，而是 writable stream 内部缓冲区状态。返回 `false` 时，真实项目应等待 `drain` 事件再继续大量写入。

#### `tcpMessageBoundaryClient.js`：TCP 没有天然消息边界

```js
// Goal:
// Send multiple pieces of data over one TCP socket.

import net from 'node:net';

const client = net.createConnection({ port: 4000 }, () => {
  client.write('first');
  client.write('second');
  client.write('third\n');
});

client.on('data', (dataChunk) => {
  console.log(dataChunk.toString('utf8'));
  client.end();
});
```

对方收到的 chunk 不一定按照三次 `write()` 分成三次 `data`。TCP 是 byte stream。真实协议要自己设计 `\n` 分隔、固定长度头部或其他 framing 规则。


### TCP 与 HTTP 的边界

| 层级 | 说明 |
|---|---|
| TCP | 传输层协议，提供可靠、有序的字节流。 |
| HTTP | 应用层协议，定义 method、URL、headers、body、status code。 |

HTTP 通常运行在 TCP 之上，但 Node 的 `net` 模块不会帮你解析 HTTP。你拿到的是原始字节流。

### 底层机制补充

`net.Socket` 是双工流（duplex stream）：

```txt
socket readable side  -> receive bytes from peer
socket writable side  -> send bytes to peer
```

所以一个 socket 可以同时监听 `data` 事件并调用 `write()`。

### 常见错误补充

| 错误理解 | 为什么错 | 正确理解 |
|---|---|---|
| TCP 一次 `write()` 对应对方一次 `data` | TCP 是字节流，没有消息边界 | 应用层自己定义分隔符或长度协议 |
| `socket.write()` 返回 false 也继续狂写 | 会造成缓冲区压力 | 等 `drain` 事件 |
| 用 `net` 写 HTTP 路由 | net 不解析 HTTP | HTTP 服务用 `node:http` 或框架 |
| 忘记处理 `error` | 网络错误常见 | 给 server 和 socket 都监听 `error` |

### `tcpEchoServer.js`

```js
// Goal:
// Create a TCP echo server.

import net from 'node:net';

const server = net.createServer((socket) => {
  socket.write('ready\n');

  socket.on('data', (dataChunk) => {
    socket.write(`echo:${dataChunk.toString('utf8')}`);
  });
});

server.listen(4000, () => {
  console.log('tcp-server-ready');
});
```

### `tcpEchoClient.js`

```js
// Goal:
// Connect to a TCP server and exchange messages.

import net from 'node:net';

const client = net.createConnection({ port: 4000 }, () => {
  client.write('hello\n');
});

client.on('data', (dataChunk) => {
  console.log(dataChunk.toString('utf8').trim());

  if (dataChunk.toString('utf8').includes('echo:')) {
    client.end();
  }
});
```

### 运行方式

终端一：

```bash
node tcpEchoServer.js
```

终端二：

```bash
node tcpEchoClient.js
```

### 预期输出

服务器终端：

```txt
tcp-server-ready
```

客户端终端：

```txt
ready
echo:hello
```

### 常见错误

不要把 TCP 数据当成“每次 data 事件一定对应一次完整消息”。TCP 是字节流协议，真实项目需要自己设计消息边界。

---

## 16. 11：子进程 child_process

### 结论

`child_process` 让 Node.js 启动其他程序。它适合调用外部命令、运行脚本、拆分重任务。

### 文件结构

```txt
11-child-process/
  spawnNodeVersion.js
  spawnNodeVersionFull.js
  spawnArguments.js
```

### 新关键字和新概念

#### child process

子进程是当前进程创建出来的另一个操作系统进程。

#### spawn

`spawn()` 启动命令，并以流的方式处理标准输出和标准错误。

#### execFile

`execFile()` 执行指定文件，适合不需要 shell 解析的命令。

#### exec

`exec()` 通过 shell 执行命令。它更方便，但处理不可信输入时更危险。

### API 参数与返回值补充

#### `spawn(command[, args][, options])`

```txt
spawn(command: string, args?: string[], options?: object): ChildProcess
```

| 参数 | 含义 |
|---|---|
| `command` | 要启动的可执行命令。 |
| `args` | 参数数组。每个参数独立传入，不需要自己拼接命令字符串。 |
| `options.cwd` | 子进程工作目录。 |
| `options.env` | 子进程环境变量。 |
| `options.stdio` | 标准输入、输出、错误流配置。 |
| 返回值 | `ChildProcess` 对象。 |

```js
const childProcess = spawn('node', ['--version']);
```

这里 `node` 是命令，`['--version']` 是参数数组。不要写成一个拼接字符串：

```js
spawn('node --version');
```

这会被当作可执行文件名，而不是命令加参数。

#### `childProcess.stdout.on('data', listener)`

`stdout` 是 readable stream。`data` chunk 通常是 Buffer。

```js
childProcess.stdout.on('data', (outputChunk) => {
  console.log(outputChunk.toString('utf8'));
});
```

#### `childProcess.stderr.on('data', listener)`

`stderr` 也是 readable stream，通常用于错误输出，不等于子进程一定失败。很多工具会把 warning 或进度信息写到 stderr。

#### `childProcess.on('close', listener)`

```txt
close(code: number | null, signal: string | null): void
```

| 参数 | 含义 |
|---|---|
| `code` | 子进程退出码。`0` 通常表示成功。 |
| `signal` | 如果进程被信号终止，这里会有信号名。 |


### API 对应代码补充

这一节必须写出 stdout、stderr、error、close 四个边界。否则容易误以为 `spawn()` 只是“运行命令然后返回字符串”。

#### `spawnNodeVersionFull.js`：读取 stdout 和退出码

```js
// Goal:
// Spawn a child process and read stdout, stderr, errors, and exit code.

import { spawn } from 'node:child_process';

const childProcess = spawn(process.execPath, ['--version']);

childProcess.stdout.on('data', (outputChunk) => {
  const outputText = outputChunk.toString('utf8').trim();
  console.log(outputText.startsWith('v'));
});

childProcess.stderr.on('data', (errorChunk) => {
  console.error(errorChunk.toString('utf8').trim());
});

childProcess.on('error', (spawnError) => {
  console.error(spawnError.message);
});

childProcess.on('close', (exitCode, signalName) => {
  console.log(`exit-code:${exitCode}`);
  console.log(`signal:${signalName}`);
});
```

预期输出形态：

```txt
true
exit-code:0
signal:null
```

#### `spawnArguments.js`：命令和参数必须分离

```js
// Goal:
// Pass command arguments as an array.

import { spawn } from 'node:child_process';

const childProcess = spawn(process.execPath, ['-e', 'console.log(1 + 2)']);

childProcess.stdout.on('data', (outputChunk) => {
  console.log(outputChunk.toString('utf8').trim());
});
```

预期输出：

```txt
3
```

错误模型是把整个命令拼成一个字符串交给 `spawn()`：

```js
// Wrong version:
// spawn('node --version');
```

`spawn(command, args)` 的第一个参数是可执行文件名，第二个参数才是参数数组。


### `spawn()` 与 `exec()` 对比

| API | 输入方式 | 输出方式 | 适用场景 | 风险 |
|---|---|---|---|---|
| `spawn()` | command + args array | stream | 长时间运行、大输出量命令 | 参数要正确拆分 |
| `exec()` | command string | buffered result | 简短 shell 命令 | shell injection 风险更高 |

学习阶段优先掌握 `spawn()`，因为它更贴近进程和流的底层模型。

### 底层机制补充

子进程不是 Worker。它是操作系统级别的新进程：

```txt
parent Node process
  -> child process
    -> own memory
    -> own pid
    -> own stdout/stderr/stdin
```

父子进程默认不共享 JavaScript 堆内存。它们通过 stdio、IPC、文件、网络等方式交换信息。

### 常见错误补充

| 错误写法 | 错误原因 | 修正方式 |
|---|---|---|
| `spawn('git status')` | 整个字符串被当作命令名 | `spawn('git', ['status'])` |
| 只监听 stdout | 错过 stderr 和 exit code | 同时处理 `stdout`、`stderr`、`close`、`error` |
| 用 `exec()` 拼用户输入 | shell injection 风险 | 用 `spawn(command, args)` 并校验参数 |
| 把 `close` 当作输出完成唯一来源 | 输出流也有事件 | 根据场景处理流和退出码 |

### `spawnNodeVersion.js`

```js
// Goal:
// Spawn a child process and read its output.

import { spawn } from 'node:child_process';

const childProcess = spawn(process.execPath, ['--version']);

childProcess.stdout.on('data', (dataChunk) => {
  console.log(dataChunk.toString('utf8').trim().startsWith('v'));
});

childProcess.on('close', (exitCode) => {
  console.log(`exit-code:${exitCode}`);
});
```

### 运行方式

```bash
node spawnNodeVersion.js
```

### 预期输出

```txt
true
exit-code:0
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `spawn()` 创建子进程。 |
| 2 | 子进程执行当前 Node 可执行文件。 |
| 3 | `stdout` 以流的形式输出版本号。 |
| 4 | 父进程监听 `data` 事件读取输出。 |
| 5 | 子进程退出后触发 `close` 事件。 |

### 常见错误

不要用 `exec()` 拼接不可信字符串命令。涉及用户输入时，优先使用 `spawn()` 或 `execFile()` 并分离参数。

---

## 17. 12：工作线程 worker_threads

### 结论

工作线程（worker threads）适合 CPU 密集型任务（CPU-intensive tasks），不适合普通 I/O 密集型任务。

### 文件结构

```txt
12-worker-threads/
  workerMain.js
  sumWorker.js
  workerDataSumWorker.js
  workerDataMain.js
  asyncFileReadMain.js
```

### 新关键字和新概念

#### Worker

`Worker` 表示一个独立执行 JavaScript 的工作线程。

#### main thread

主线程，负责启动程序和处理普通事件循环任务。

#### message passing

消息传递，主线程和工作线程通过 `postMessage()` 与 `message` 事件通信。

### API 参数与返回值补充

#### `new Worker(filename[, options])`

```txt
new Worker(filename: string | URL, options?: object): Worker
```

| 参数 | 含义 |
|---|---|
| `filename` | worker 入口文件路径或 URL。ESM 中常用 `new URL('./worker.js', import.meta.url)`。 |
| `options.workerData` | 启动时传给 worker 的初始数据。 |
| 返回值 | Worker 实例。 |

#### `workerData`

```txt
workerData: any
```

在 worker 文件中从 `node:worker_threads` 导入。它是主线程创建 Worker 时传入的初始数据副本。

#### `parentPort.postMessage(value)`

```txt
parentPort.postMessage(value: any): void
```

把数据从 worker 线程发送回父线程。传输使用结构化克隆（structured clone）语义；某些二进制数据也可以通过 transfer list 转移所有权。

#### `worker.on('message', listener)`

```txt
message(value: any): void
```

主线程监听 worker 发回的数据。

#### `worker.on('error', listener)`

worker 执行过程中出现未捕获异常时触发。

#### `worker.on('exit', listener)`

```txt
exit(exitCode: number): void
```

worker 停止时触发。`0` 通常表示正常退出。


### API 对应代码补充

这一节要写主线程和 worker 文件两边。只写 `new Worker()` 不够，因为 Worker 的核心是 message passing。

#### `workerDataSumWorker.js`：读取 `workerData` 并发送结果

```js
// Goal:
// Run a calculation inside a worker thread.

import { parentPort, workerData } from 'node:worker_threads';

let totalValue = 0;

for (let currentValue = 1; currentValue <= workerData.maxValue; currentValue += 1) {
  totalValue += currentValue;
}

parentPort.postMessage({
  totalValue,
  workerInput: workerData,
});
```

#### `workerDataMain.js`：创建 Worker、接收 message、处理 error 和 exit

```js
// Goal:
// Start a worker thread and handle its lifecycle events.

import { Worker } from 'node:worker_threads';

const workerInput = {
  maxValue: 100,
};

const worker = new Worker(new URL('./sumWorker.js', import.meta.url), {
  workerData: workerInput,
});

workerInput.maxValue = 1;

worker.on('message', (messageRecord) => {
  console.log(messageRecord.totalValue);
  console.log(messageRecord.workerInput.maxValue);
  console.log(workerInput.maxValue);
});

worker.on('error', (workerError) => {
  console.error(workerError.message);
});

worker.on('exit', (exitCode) => {
  console.log(`worker-exit:${exitCode}`);
});
```

预期输出形态：

```txt
5050
100
1
worker-exit:0
```

这个对比很重要：`workerData` 默认通过结构化克隆传入 Worker。主线程后面把 `workerInput.maxValue` 改成 `1`，不会修改 worker 里面已经收到的 `workerData.maxValue`。

#### `asyncFileReadMain.js`：Worker 适合 CPU 计算，不适合普通 I/O 包装

```js
// Goal:
// Keep ordinary asynchronous I/O on the main event loop.

import { readFile } from 'node:fs/promises';

const fileText = await readFile('input.txt', 'utf8');

console.log(fileText.length > 0);
```

这类普通文件读取已经是 Promise-based async I/O，不需要为了“异步”再包一层 Worker。Worker 的重点是避免 CPU 计算阻塞主线程。


### Worker 与 child process 对比

| 维度 | Worker thread | Child process |
|---|---|---|
| 边界 | 同一个进程内的线程 | 独立操作系统进程 |
| 内存 | 默认不共享 JS 对象，可共享 SharedArrayBuffer | 默认不共享内存 |
| 启动成本 | 通常低于子进程 | 通常更高 |
| 适用任务 | CPU 密集型 JS 计算 | 调用外部程序、隔离进程、运行其他命令 |

### 底层机制补充

Worker 的核心价值是让 CPU 密集型 JavaScript 计算离开主事件循环线程：

```txt
main thread
  -> handles I/O callbacks and server responsiveness
worker thread
  -> performs CPU-heavy calculation
  -> sends result back with message
```

如果把大量计算直接放在主线程，HTTP server、timer、I/O callback 都会被延迟。

### 常见错误补充

| 错误理解 | 为什么错 | 正确理解 |
|---|---|---|
| Worker 能让普通 fs/http 更快 | Node I/O 已经异步，很多 I/O 不需要 Worker | Worker 主要解决 CPU 阻塞 |
| workerData 是共享对象 | 默认是克隆，不是共享引用 | 修改 workerData 不会直接改主线程对象 |
| 忘记监听 `error` | worker 内异常需要处理 | 主线程注册 `worker.on('error')` |
| 用相对字符串路径创建 ESM Worker | cwd 变化时容易找不到文件 | 用 `new URL('./sumWorker.js', import.meta.url)` |

### `sumWorker.js`

```js
// Goal:
// Run a CPU-style calculation inside a worker thread.

import { parentPort, workerData } from 'node:worker_threads';

let totalValue = 0;

for (let currentValue = 1; currentValue <= workerData.maxValue; currentValue += 1) {
  totalValue += currentValue;
}

parentPort.postMessage({ totalValue });
```

### `workerMain.js`

```js
// Goal:
// Start a worker thread and receive its result.

import { Worker } from 'node:worker_threads';

const worker = new Worker(new URL('./sumWorker.js', import.meta.url), {
  workerData: {
    maxValue: 100,
  },
});

worker.on('message', (messageRecord) => {
  console.log(messageRecord.totalValue);
});

worker.on('error', (workerError) => {
  console.error(workerError.message);
});
```

### 运行方式

```bash
node workerMain.js
```

### 预期输出

```txt
5050
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 主线程创建 `Worker`。 |
| 2 | `workerData` 被传给工作线程。 |
| 3 | 工作线程执行计算。 |
| 4 | 工作线程通过 `parentPort.postMessage()` 发回结果。 |
| 5 | 主线程监听 `message` 事件并打印结果。 |

### 常见错误

不要为了普通文件读写或 HTTP 请求滥用 Worker。Node.js 的内置异步 I/O 已经适合这类任务。Worker 主要用于 CPU 密集型计算。

---

## 18. 13：小项目整合

### 结论

最后用一个小项目把 `fs`、`path`、`http`、`url`、`Buffer`、`process`、`stream` 组合起来。

### 文件结构

```txt
13-mini-node-server/
  package.json
  server.js
  storage/logStore.js
  http/sendJson.js
  data/.gitkeep
```

### 项目目标

实现一个小型日志服务器：

```txt
GET /health
  -> return JSON status

POST /log
  -> receive request body
  -> append to file
  -> return JSON result

GET /logs
  -> stream the log file back
```

### API 角色补充

这个小项目不是把 API 随机堆在一起，而是把 Node 的核心运行时边界串起来：

| 代码位置 | API | 角色 |
|---|---|---|
| `server.js` | `createServer()` | 创建 HTTP 请求入口。 |
| `server.js` | `request.method` / `request.url` | 判断请求方法和路径。 |
| `server.js` | `for await...of request` | 按异步迭代读取 request body stream。 |
| `server.js` | `Buffer.concat()` | 合并 body chunk。 |
| `sendJson.js` | `response.writeHead()` | 写入状态码和响应头。 |
| `sendJson.js` | `response.end()` | 结束 HTTP 响应。 |
| `logStore.js` | `mkdir()` | 确保数据目录存在。 |
| `logStore.js` | `appendFile()` | 追加写入日志。 |
| `logStore.js` | `createReadStream()` | 用流返回日志文件。 |
| `logStore.js` | `path.join()` | 构造跨平台文件路径。 |

### 函数参数补充

#### `sendJson(response, statusCode, payloadRecord)`

| 参数 | 类型意义 | 运行时角色 |
|---|---|---|
| `response` | `ServerResponse` | 当前 HTTP 响应对象。 |
| `statusCode` | number | HTTP 状态码。 |
| `payloadRecord` | object | 要序列化为 JSON 的普通对象。 |

`payloadRecord` 必须能被 `JSON.stringify()` 正常序列化。不要直接传入 stream、request、response 这种复杂对象。

#### `appendLogRecord(logText)`

| 参数 | 类型意义 | 运行时角色 |
|---|---|---|
| `logText` | string | 要写入日志文件的一行文本。 |

这个函数内部先 `mkdir()`，再 `appendFile()`。这样即使第一次运行时 `data/` 不存在，也可以正常创建。

#### `readRequestBody(request)`

| 参数 | 类型意义 | 运行时角色 |
|---|---|---|
| `request` | `IncomingMessage` | 可读流，提供 HTTP request body chunk。 |
| 返回值 | Promise<string> | 完整请求体文本。 |

`for await...of request` 的每次循环拿到一个 chunk。chunk 通常是 Buffer。`Buffer.concat(dataChunks)` 把多个 chunk 合并成完整 body。

### 完整执行过程补充

#### `GET /health` 执行过程

```txt
client sends GET /health
  -> server request listener runs
  -> method and url match health branch
  -> sendJson(response, 200, { status: 'ok' })
  -> response.end() finishes the request
```

#### `POST /log` 执行过程

```txt
client sends POST /log with body
  -> server enters POST /log branch
  -> readRequestBody(request) starts async iteration
  -> chunks are collected
  -> Buffer.concat(chunks).toString('utf8') creates text
  -> appendLogRecord(text) ensures directory and appends file
  -> sendJson(response, 201, { stored: true })
```

#### `GET /logs` 执行过程

```txt
client sends GET /logs
  -> server writes text/plain header
  -> createLogReadStream() creates readable file stream
  -> readable stream pipes chunks into HTTP response
  -> response ends when stream ends
```

### 常见错误补充

| 错误写法 | 错误原因 | 修正方式 |
|---|---|---|
| `/logs` 文件不存在时直接 stream | 第一次还没写日志会触发 `ENOENT` | 可以提前创建文件或捕获 stream error |
| `sendJson()` 后继续执行下面分支 | 可能重复写响应 | 每个响应分支后 `return` |
| `JSON.stringify(serverError)` | Error 的 message 可能不可枚举 | 返回 `serverError.message` |
| 不限制 request body 大小 | 大请求体可能占用过多内存 | 真实项目要加大小限制 |
| 把日志文本直接信任为安全内容 | 外部输入不可信 | 真实项目要校验、清洗、结构化存储 |

### 可扩展方向补充

| 方向 | 会练到的 Node 能力 |
|---|---|
| 增加 `GET /logs?limit=10` | URL parsing、query string。 |
| 增加日志 JSON 格式 | JSON serialization、runtime validation。 |
| 增加静态文件服务 | fs stream、content-type、path security。 |
| 增加日志轮转 | file stats、rename、scheduled tasks。 |
| 增加 CLI 参数设置端口 | `process.argv`、`process.env`。 |

### `package.json`

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js"
  }
}
```

### `sendJson.js`

```js
// Goal:
// Send a JSON response from a Node.js HTTP server.

export function sendJson(response, statusCode, payloadRecord) {
  response.writeHead(statusCode, { 'content-type': 'application/json' });
  response.end(JSON.stringify(payloadRecord));
}
```

### `logStore.js`

```js
// Goal:
// Append and stream log records.

import { mkdir, appendFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';

const dataDirectory = 'data';
const logFilePath = path.join(dataDirectory, 'events.log');

export async function appendLogRecord(logText) {
  await mkdir(dataDirectory, { recursive: true });
  await appendFile(logFilePath, `${logText}\n`, 'utf8');
}

export function createLogReadStream() {
  return createReadStream(logFilePath, { encoding: 'utf8' });
}
```

### `server.js`

```js
// Goal:
// Build a small Node.js HTTP server with file storage.

import { createServer } from 'node:http';
import { appendLogRecord, createLogReadStream } from './storage/logStore.js';
import { sendJson } from './http/sendJson.js';

async function readRequestBody(request) {
  const dataChunks = [];

  for await (const dataChunk of request) {
    dataChunks.push(dataChunk);
  }

  return Buffer.concat(dataChunks).toString('utf8');
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === 'GET' && request.url === '/health') {
      sendJson(response, 200, { status: 'ok' });
      return;
    }

    if (request.method === 'POST' && request.url === '/log') {
      const requestBodyText = await readRequestBody(request);
      await appendLogRecord(requestBodyText);
      sendJson(response, 201, { stored: true });
      return;
    }

    if (request.method === 'GET' && request.url === '/logs') {
      response.writeHead(200, { 'content-type': 'text/plain' });
      createLogReadStream().pipe(response);
      return;
    }

    sendJson(response, 404, { error: 'not-found' });
  } catch (serverError) {
    sendJson(response, 500, { error: serverError.message });
  }
});

server.listen(3000, () => {
  console.log('server-ready:http://localhost:3000');
});
```

### 运行方式

终端一：

```bash
npm start
```

终端二：

```bash
curl http://localhost:3000/health
curl -X POST http://localhost:3000/log -d "event:login"
curl http://localhost:3000/logs
```

### 预期输出

```json
{"status":"ok"}
```

```json
{"stored":true}
```

```txt
event:login
```

### 项目意义

这组代码连接了本章核心能力：

| 能力 | 使用位置 |
|---|---|
| HTTP server | `createServer()` |
| async iteration | `for await...of request` |
| Buffer | `Buffer.concat()` |
| fs/promises | `appendFile()` |
| stream | `createReadStream().pipe(response)` |
| path | `path.join()` |
| module | ESM import/export |

---

## 19. 最终文件清单

```txt
nodejs-runtime-lab/
  00-project-setup/
    package.json
    runtimeCheck.js
    runtimeCheckPaths.js
    runtimeVersionProperty.js

  01-node-runtime-basics/
    processBasics.js
    processRuntimeContext.js
    environmentVariableString.js

  02-node-built-in-modules/
    package.json
    pathOperations.js
    pathMethodComparison.js
    pathStringOnly.js
    dynamicPathImport.js

  03-async-by-default/
    asyncExecutionOrder.js
    nodeAsyncExecutionOrder.js
    timerCancellation.js
    awaitPauseScope.js

  04-buffer/
    bufferEncoding.js
    bufferEncodingInspection.js
    bufferByteLength.js
    bufferConcatChunks.js

  05-event-emitter/
    orderEvents.js
    eventEmitterLifecycle.js
    eventEmitterSyncOrder.js
    eventEmitterErrorHandling.js

  06-streams/
    input.txt
    streamFileCopy.js
    streamChunkInspection.js
    streamPipelineCopy.js
    writableStreamWrite.js

  07-process-os/
    processSystemInfo.js
    processOsBoundary.js
    environmentPortParsing.js

  08-fs-path/
    fileReportStorage.js
    fsFileOperations.js
    pathAnalysisOnly.js

  09-http-server-client/
    basicHttpServer.js
    httpQueryServer.js
    httpPostBodyServer.js

  10-net-tcp/
    tcpEchoServer.js
    tcpEchoClient.js
    tcpEchoServerWithErrors.js
    tcpEchoClientWithClose.js
    tcpMessageBoundaryClient.js

  11-child-process/
    spawnNodeVersion.js
    spawnNodeVersionFull.js
    spawnArguments.js

  12-worker-threads/
    workerMain.js
    sumWorker.js
    workerDataSumWorker.js
    workerDataMain.js
    asyncFileReadMain.js

  13-mini-node-server/
    package.json
    server.js
    storage/logStore.js
    http/sendJson.js
    data/.gitkeep

  nodejs-learning-notes.md
```

---

## 20. 最终学习笔记转换要求

每一节最终整理成学习笔记时，固定使用这个结构：

```txt
Conclusion
Technical meaning
Key terms
Underlying mechanism
File structure
Code example
How to run
Expected output
Execution process
Common mistakes or counterexamples
Relation to real projects
Final memory model
```

### 语言要求

正文使用中文；重要术语必须写成：

```txt
中文术语（English term）
```

例如：

```txt
事件循环（event loop）
缓冲区（Buffer）
流（stream）
背压（backpressure）
子进程（child process）
工作线程（worker thread）
```

### 代码命名要求

不要反复使用 `data`、`obj`、`test`、`foo`、`bar`。

优先使用业务含义明确的名字：

```txt
requestBodyText
reportFilePath
logReadStream
messageRecord
workerResult
```

---

## 21. 本章最终要能回答的问题

学完第 16 章，你应该能回答：

```txt
1. Node.js 是语言还是运行时？
2. Node.js 和浏览器宿主环境有什么区别？
3. process 对象表示什么？
4. process.cwd() 和当前文件路径有什么区别？
5. Node.js 为什么适合 I/O 密集型程序？
6. non-blocking I/O 是什么？
7. Buffer 和 ArrayBuffer 有什么关系？
8. Buffer.length 为什么是字节长度？
9. EventEmitter 的 on()、once()、emit() 分别做什么？
10. 为什么 error event 很重要？
11. stream 解决什么问题？
12. backpressure 为什么存在？
13. pipeline() 比手动 pipe 有什么优势？
14. fs/promises 为什么适合 async/await？
15. path.join() 为什么比手写路径更稳？
16. HTTP request 和 response 在 Node 里是什么对象？
17. response.end() 为什么必须调用？
18. TCP socket 为什么是 duplex stream？
19. child_process 什么时候适合用？
20. spawn() 和 exec() 的安全差异是什么？
21. worker_threads 适合 I/O 还是 CPU 密集型任务？
22. Worker 和 child process 的区别是什么？
23. 为什么 Node.js 学习建议单开项目？
24. Node.js 如何支撑现代前端工程工具链？
```

最终记住这个模型：

```txt
Node.js is JavaScript running outside the browser.
It connects JavaScript to files, networks, processes, streams, and operating system resources.
Most Node.js engineering problems are I/O, concurrency, streaming, and process-boundary problems.
```

---

## 22. Node.js Official Documentation 阅读清单

学习时先做本文件练习，再查官方文档补准确签名、边界行为和版本变化。

- [Node.js documentation](https://nodejs.org/api/)
- [About this documentation](https://nodejs.org/api/documentation.html)
- [ECMAScript modules](https://nodejs.org/api/esm.html)
- [Modules: CommonJS modules](https://nodejs.org/api/modules.html)
- [Process](https://nodejs.org/api/process.html)
- [OS](https://nodejs.org/api/os.html)
- [Buffer](https://nodejs.org/api/buffer.html)
- [Events](https://nodejs.org/api/events.html)
- [Stream](https://nodejs.org/api/stream.html)
- [File system](https://nodejs.org/api/fs.html)
- [Path](https://nodejs.org/api/path.html)
- [HTTP](https://nodejs.org/api/http.html)
- [Net](https://nodejs.org/api/net.html)
- [Child process](https://nodejs.org/api/child_process.html)
- [Worker threads](https://nodejs.org/api/worker_threads.html)
- [Errors](https://nodejs.org/api/errors.html)
- [Timers](https://nodejs.org/api/timers.html)
- [URL](https://nodejs.org/api/url.html)
- [String decoder](https://nodejs.org/api/string_decoder.html)

