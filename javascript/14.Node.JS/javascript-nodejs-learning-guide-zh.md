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

### 文件结构

```txt
00-project-setup/
  package.json
  runtimeCheck.js
```

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

### 新关键字和新概念

#### `process`

`process` 是 Node.js 提供的全局对象，表示当前 Node 进程（current Node.js process）。它能读取命令行参数、环境变量、当前工作目录、退出码等。

#### `process.argv`

`process.argv` 是命令行参数数组。

#### `process.env`

`process.env` 是环境变量对象。

### 文件结构

```txt
01-node-runtime-basics/
  processBasics.js
```

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

### 文件结构

```txt
02-node-built-in-modules/
  package.json
  pathDemo.js
```

### `package.json`

```json
{
  "type": "module"
}
```

### `pathDemo.js`

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
node pathDemo.js
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

### 新关键字和新概念

#### I/O

I/O 是输入输出（input/output），包括读文件、写文件、网络请求、数据库访问等。

#### 阻塞

阻塞（blocking）表示当前线程停下来等待操作完成。

#### 非阻塞

非阻塞（non-blocking）表示发起操作后当前线程继续执行，结果未来通过回调或 Promise 返回。

### 文件结构

```txt
03-async-by-default/
  asyncOrderDemo.js
```

### `asyncOrderDemo.js`

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
node asyncOrderDemo.js
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

### 新关键字和新概念

#### Buffer

`Buffer` 表示固定长度的字节序列（sequence of bytes）。

#### byte

字节（byte）是二进制数据的基本单位，通常 1 byte = 8 bits。

#### encoding

编码（encoding）定义字符串和字节之间如何转换，例如 `utf8`、`hex`、`base64`。

### 文件结构

```txt
04-buffer/
  bufferEncodingDemo.js
```

### `bufferEncodingDemo.js`

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
node bufferEncodingDemo.js
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

### 新关键字和新概念

#### EventEmitter

`EventEmitter` 是 Node.js 的事件发射器类（event emitter class）。它能注册监听器（listener）并触发事件。

#### listener

监听器（listener）是事件发生时被调用的函数。

#### emit

`emit()` 的意思是发射事件（emit an event）。

### 文件结构

```txt
05-event-emitter/
  orderEventEmitterDemo.js
```

### `orderEventEmitterDemo.js`

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
node orderEventEmitterDemo.js
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

### 新关键字和新概念

#### Readable stream

可读流（readable stream）是可以读取数据的流。

#### Writable stream

可写流（writable stream）是可以写入数据的流。

#### Duplex stream

双工流（duplex stream）既可读又可写。

#### pipeline

`pipeline()` 用来把多个流连接起来，并统一处理完成和错误。

### 文件结构

```txt
06-streams/
  input.txt
  streamCopyDemo.js
```

### `input.txt`

```txt
alpha
beta
gamma
```

### `streamCopyDemo.js`

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
node streamCopyDemo.js
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

### 新关键字和新概念

#### process

当前 Node.js 进程对象。

#### os

Node.js 内置模块，提供操作系统信息。

#### exit code

退出码（exit code）表示程序退出状态。通常 `0` 表示成功，非 `0` 表示失败。

### 文件结构

```txt
07-process-os/
  systemInfoDemo.js
```

### `systemInfoDemo.js`

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
node systemInfoDemo.js
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

### 新关键字和新概念

#### fs

文件系统模块（file system module）。

#### path

路径处理模块（path module）。

#### promise-based API

基于 Promise 的 API，适合和 `async` / `await` 配合。

### 文件结构

```txt
08-fs-path/
  fileReportDemo.js
```

### `fileReportDemo.js`

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
node fileReportDemo.js
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

### 新关键字和新概念

#### HTTP server

监听端口、接收请求、返回响应的程序。

#### request

请求对象，包含 URL、方法、请求头和请求体。

#### response

响应对象，用于设置状态码、响应头和响应体。

#### port

端口（port）是网络服务在一台机器上的入口编号。

### 文件结构

```txt
09-http-server-client/
  basicHttpServer.js
```

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

### 新关键字和新概念

#### TCP

传输控制协议（Transmission Control Protocol），提供可靠的字节流连接。

#### socket

套接字（socket）表示网络连接的一端。

#### duplex stream

双工流既可以读取，也可以写入。

### 文件结构

```txt
10-net-tcp/
  tcpEchoServer.js
  tcpEchoClient.js
```

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

### 新关键字和新概念

#### child process

子进程是当前进程创建出来的另一个操作系统进程。

#### spawn

`spawn()` 启动命令，并以流的方式处理标准输出和标准错误。

#### execFile

`execFile()` 执行指定文件，适合不需要 shell 解析的命令。

#### exec

`exec()` 通过 shell 执行命令。它更方便，但处理不可信输入时更危险。

### 文件结构

```txt
11-child-process/
  spawnNodeVersionDemo.js
```

### `spawnNodeVersionDemo.js`

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
node spawnNodeVersionDemo.js
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

### 新关键字和新概念

#### Worker

`Worker` 表示一个独立执行 JavaScript 的工作线程。

#### main thread

主线程，负责启动程序和处理普通事件循环任务。

#### message passing

消息传递，主线程和工作线程通过 `postMessage()` 与 `message` 事件通信。

### 文件结构

```txt
12-worker-threads/
  workerMain.js
  sumWorker.js
```

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

### 文件结构

```txt
13-mini-node-server/
  package.json
  server.js
  storage/logStore.js
  http/sendJson.js
  data/.gitkeep
```

### `package.json`

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js"
  }
}
```

### `http/sendJson.js`

```js
// Goal:
// Send a JSON response from a Node.js HTTP server.

export function sendJson(response, statusCode, payloadRecord) {
  response.writeHead(statusCode, { 'content-type': 'application/json' });
  response.end(JSON.stringify(payloadRecord));
}
```

### `storage/logStore.js`

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

  01-node-runtime-basics/
    processBasics.js

  02-node-built-in-modules/
    package.json
    pathDemo.js

  03-async-by-default/
    asyncOrderDemo.js

  04-buffer/
    bufferEncodingDemo.js

  05-event-emitter/
    orderEventEmitterDemo.js

  06-streams/
    input.txt
    streamCopyDemo.js

  07-process-os/
    systemInfoDemo.js

  08-fs-path/
    fileReportDemo.js

  09-http-server-client/
    basicHttpServer.js

  10-net-tcp/
    tcpEchoServer.js
    tcpEchoClient.js

  11-child-process/
    spawnNodeVersionDemo.js

  12-worker-threads/
    workerMain.js
    sumWorker.js

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

