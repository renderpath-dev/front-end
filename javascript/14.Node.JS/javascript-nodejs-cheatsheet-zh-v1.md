# JavaScript Node.js Cheatsheet（第 16 章）

> 来源：`javascript-nodejs-learning-guide-zh.md`  
> 定位：这是第 16 章 Node.js 服务器端 JavaScript 的速查表，不是训练指导文件。  
> 用法：复习时先看“什么时候用”，再看“底层机制”，最后看“常见错误”。  
> 代码规则：代码命名和代码注释使用英文；代码和代码注释不使用中文字符。

---

## 0. 总结论

Node.js 不是一门新语言。Node.js 是一个 JavaScript 运行时平台（runtime platform）。

```txt
JavaScript language
  + V8 engine
  + event loop
  + Node built-in modules
  + operating system capabilities
  = Node.js runtime
```

浏览器让 JavaScript 操作页面、事件、网络和存储。Node.js 让 JavaScript 操作文件、网络、进程、线程、流和操作系统资源。

---

## 1. Node.js 和浏览器的核心区别

| 对比项 | Browser JavaScript | Node.js |
|---|---|---|
| 宿主环境 | Browser host environment | Server-side host environment |
| 全局对象 | `window`, `globalThis` | `global`, `globalThis`, `process` |
| 页面能力 | DOM, CSSOM, Events | 无 DOM |
| 文件系统 | 不能直接访问本地文件系统 | 通过 `node:fs` 访问 |
| 网络能力 | `fetch`, WebSocket, browser APIs | `node:http`, `node:net`, also `fetch` in modern Node |
| 并发模型 | Event loop + Web APIs + Workers | Event loop + libuv + worker_threads + child_process |
| 常见任务 | UI, events, rendering | server, CLI, build tools, file I/O, network I/O |

最终记忆：

```txt
Browser JavaScript controls the user interface environment.
Node.js controls the server and system environment.
```

---

## 2. 项目初始化与运行环境

### 结论

Node.js 学习第一步是确认项目边界：

```txt
Node version
module type
entry file
npm scripts
working directory
```

### `package.json` 最小模型

```json
{
  "type": "module",
  "scripts": {
    "check": "node runtimeCheck.js"
  }
}
```

### 核心命令

| 命令 | 作用 |
|---|---|
| `node file.js` | 直接执行 JS 文件 |
| `npm init -y` | 初始化 `package.json` |
| `npm run check` | 执行 `scripts.check` |
| `node --version` | 查看 Node 版本 |

### `process.version` 和 `import.meta.url`

```js
// Goal:
// Verify Node.js runtime and ESM mode.

console.log(process.version);
console.log(import.meta.url.includes('runtimeCheck.js'));
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 没有 `package.json` 就随便写 ESM | `.js` 是否按 ESM 解析取决于 `type` |
| ESM 中直接用 `__dirname` | `__dirname` 是 CommonJS 局部变量 |
| 只看文件位置，不看运行目录 | `process.cwd()` 是命令执行目录 |

---

## 3. CommonJS 和 ES Module

### 结论

Node.js 同时支持 CommonJS（CJS）和 ES Module（ESM）。学习阶段优先用 ESM，并用 `node:` 前缀导入内置模块。

### 两套模块系统对照

| 机制 | CommonJS | ES Module |
|---|---|---|
| 导入 | `require()` | `import` |
| 导出 | `module.exports` / `exports` | `export` |
| 文件后缀 | `.cjs` 或默认 CJS | `.mjs` 或 `"type": "module"` |
| 加载特点 | 运行时加载 | 静态依赖图优先 |
| 当前文件 URL | `__filename` | `import.meta.url` |
| 当前目录 | `__dirname` | 需要从 `import.meta.url` 推导 |

### `node:` 前缀

```js
// Goal:
// Import a Node.js built-in module.

import path from 'node:path';

const reportFilePath = path.join('reports', 'daily', 'summary.json');

console.log(reportFilePath);
console.log(path.extname(reportFilePath));
```

### 为什么推荐 `node:` 前缀

```txt
import path from 'node:path'
```

含义明确：

```txt
This is a Node.js built-in module.
It is not a package from npm.
It is not a local file.
```

### 常见错误

| 错误 | 原因 |
|---|---|
| `import path from './path'` | 这是本地文件导入，不是 Node 内置模块 |
| 在 `.cjs` 顶层写静态 `import` | CJS 不能直接使用静态 ESM 导入 |
| 在 ESM 中直接用 `require` | `require` 是 CJS 机制 |

---

## 4. `process` 基础

### 结论

`process` 表示当前 Node.js 进程（current Node.js process）。

### 高频属性 / 方法

| API | 返回值 | 作用 |
|---|---|---|
| `process.argv` | string array | 命令行参数 |
| `process.env` | object | 环境变量 |
| `process.cwd()` | string | 当前工作目录 |
| `process.version` | string | Node 版本 |
| `process.platform` | string | 操作系统平台 |
| `process.pid` | number | 当前进程 ID |
| `process.exitCode` | number 或 undefined | 设置进程退出码 |
| `process.execPath` | string | 当前 Node 可执行文件路径 |

### `process.argv`

```js
// Goal:
// Inspect command-line arguments.

console.log(process.argv[0]);
console.log(process.argv[1]);
console.log(process.argv.slice(2));
```

运行：

```bash
node processArgs.js --mode dev
```

`process.argv` 形状：

```txt
[
  node executable path,
  script file path,
  additional arguments...
]
```

### `process.cwd()` 不是当前文件目录

```txt
process.cwd()
  = where you run the node command

module file path
  = where the current source file is located
```

这在 CLI 工具、读取配置文件、相对路径处理里非常重要。

---

## 5. Node 默认异步模型

### 结论

Node.js 适合 I/O 密集型程序（I/O-bound programs），因为很多 I/O API 都是非阻塞（non-blocking）的。

### 执行顺序模型

```txt
synchronous code
  -> microtasks
  -> timers / I/O callbacks / other event loop phases
```

### 示例

```js
// Goal:
// Verify Node.js async order.

console.log('sync-start');

setTimeout(() => {
  console.log('timer-callback');
}, 0);

Promise.resolve().then(() => {
  console.log('promise-callback');
});

console.log('sync-end');
```

输出：

```txt
sync-start
sync-end
promise-callback
timer-callback
```

### 机制解释

| 阶段 | 发生什么 |
|---|---|
| 同步代码 | 立即执行 |
| Promise reaction | 进入微任务队列 |
| `setTimeout` callback | 进入 timer 任务阶段 |
| 调用栈清空后 | 先清空 microtask，再进入后续事件循环阶段 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `setTimeout(fn, 0)` 立即执行 | 它只是尽早安排未来任务 |
| Promise 是异步操作本身 | Promise 是未来结果对象 |
| Node 主线程会等待 I/O 完成 | 异步 I/O 完成后通过回调或 Promise 继续 |

---

## 6. Buffer 与二进制数据

### 结论

`Buffer` 是 Node.js 处理二进制字节数据的核心对象。

```txt
String
  -> encoding
  -> bytes
  -> Buffer
```

### 核心 API

| API | 作用 |
|---|---|
| `Buffer.from(string, encoding)` | 从字符串创建 Buffer |
| `Buffer.from(array)` | 从字节数组创建 Buffer |
| `Buffer.alloc(size)` | 创建指定长度并清零的 Buffer |
| `buffer.length` | 字节长度 |
| `buffer.toString(encoding)` | 按编码转回字符串 |
| `buffer.subarray(start, end)` | 创建字节视图 |
| `Buffer.concat(bufferList)` | 合并多个 Buffer |

### encoding 对照

| encoding | 含义 |
|---|---|
| `utf8` | 常用文本编码 |
| `hex` | 十六进制文本表示 |
| `base64` | Base64 文本表示 |

### 示例

```js
// Goal:
// Convert between string and binary data.

const messageBuffer = Buffer.from('Node runtime', 'utf8');

console.log(messageBuffer.length);
console.log(messageBuffer.toString('utf8'));
console.log(messageBuffer.toString('hex'));
console.log(messageBuffer.subarray(0, 4).toString('utf8'));
```

输出：

```txt
12
Node runtime
4e6f64652072756e74696d65
Node
```

### `Buffer.length` 是字节长度

不要把字符串字符数和 Buffer 字节数混为一谈：

```txt
string.length
  counts UTF-16 code units

buffer.length
  counts bytes
```

### 项目用途

| 场景 | Buffer 角色 |
|---|---|
| 文件读取 | 未指定 encoding 时常得到 Buffer |
| HTTP body | 请求体可以按 chunk 收到 Buffer |
| TCP socket | `data` 事件通常给 Buffer |
| Stream | 数据块经常是 Buffer |
| crypto | 哈希和加密常处理 Buffer |

---

## 7. EventEmitter

### 结论

`EventEmitter` 是 Node.js 的事件模型核心。很多 Node 对象通过事件通知外部状态变化。

### 核心 API

| API | 作用 |
|---|---|
| `emitter.on(eventName, listener)` | 注册可重复触发 listener |
| `emitter.once(eventName, listener)` | 注册只触发一次的 listener |
| `emitter.emit(eventName, ...args)` | 发射事件 |
| `emitter.off(eventName, listener)` | 移除 listener |
| `emitter.removeListener(eventName, listener)` | 移除 listener |
| `emitter.listenerCount(eventName)` | 查看 listener 数量 |

### 示例

```js
// Goal:
// Verify EventEmitter on, once, and emit.

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

输出：

```txt
order-created:ORD-100
order-paid-once:ORD-100
```

### `'error'` 事件非常特殊

很多 Node 对象如果发出 `'error'` 事件但没有监听器，程序可能崩溃。

```js
// Goal:
// Always register an error listener for emitter-like objects.

orderEvents.on('error', (eventError) => {
  console.error(eventError.message);
});
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 以为 `emit()` 是异步 | 普通 EventEmitter listener 通常同步调用 |
| 忘记监听 `'error'` | 可能导致进程异常退出 |
| 用 `once()` 后期待多次触发 | `once()` 只触发一次 |
| listener 里抛错没人处理 | 需要明确错误处理边界 |

---

## 8. Streams 与 Backpressure

### 结论

流（stream）用于分块处理数据；背压（backpressure）用于防止写入方被过量数据压垮。

```txt
large data
  -> chunks
  -> stream
  -> pipeline
  -> backpressure-aware transfer
```

### 流类型

| 类型 | English term | 作用 |
|---|---|---|
| 可读流 | Readable stream | 读取数据 |
| 可写流 | Writable stream | 写入数据 |
| 双工流 | Duplex stream | 既能读又能写 |
| 转换流 | Transform stream | 读入数据，转换后写出 |

### 核心 API

| API | 所属模块 | 作用 |
|---|---|---|
| `createReadStream()` | `node:fs` | 创建文件可读流 |
| `createWriteStream()` | `node:fs` | 创建文件可写流 |
| `stream.pipe(destination)` | stream instance | 把读流接到写流 |
| `pipeline()` | `node:stream/promises` | Promise 版管道连接 |
| `for await...of stream` | async iteration | 按 chunk 消费流 |

### 推荐：`pipeline()`

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

### 为什么 `pipeline()` 比手动 `pipe()` 稳

| 手动 `pipe()` | `pipeline()` |
|---|---|
| 错误处理需要自己处理 | 统一处理错误 |
| 完成时机需要监听 | 返回 Promise |
| 多段管道更难管理 | 组合更清晰 |
| 容易漏资源清理 | 更适合生产代码 |

### Backpressure 机制

```txt
Readable produces chunks.
Writable consumes chunks.
If writable cannot keep up,
readable should slow down.
```

没有背压控制时，大量数据可能堆积在内存中。

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 大文件全部 `readFile()` | 大文件优先考虑 stream |
| 以为 stream 一次给完整数据 | stream 按 chunk 给数据 |
| 忽略错误事件 | stream 可能在中途失败 |
| 不了解背压 | 写入慢时读取方必须减速 |

---

## 9. `process` 与 `os`

### 结论

`process` 描述当前 Node 进程；`os` 描述操作系统环境。

### `process` 高频项

| API | 含义 |
|---|---|
| `process.platform` | 当前平台 |
| `process.pid` | 当前进程 ID |
| `process.cwd()` | 当前工作目录 |
| `process.env` | 环境变量 |
| `process.argv` | 命令行参数 |
| `process.exitCode` | 退出码 |

### `os` 高频项

| API | 含义 |
|---|---|
| `os.cpus()` | CPU 信息数组 |
| `os.totalmem()` | 系统总内存 |
| `os.freemem()` | 系统空闲内存 |
| `os.platform()` | 操作系统平台 |
| `os.homedir()` | 用户主目录 |
| `os.tmpdir()` | 临时目录 |

### 示例

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

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `os.cpus().length` 等于 JS 自动并行核心数 | 普通 Node 主线程仍然单线程执行 JS |
| 把 `process.env` 当配置文件 | 它是环境变量入口，不是结构化配置系统 |
| 把 `process.cwd()` 当当前模块路径 | 它是命令运行目录 |

---

## 10. `fs` 与 `path`

### 结论

`fs` 操作文件系统；`path` 负责跨平台路径处理。现代代码优先使用 `node:fs/promises` 配合 `async` / `await`。

### `fs/promises` 高频 API

| API | 作用 |
|---|---|
| `readFile(path, encoding?)` | 读取文件 |
| `writeFile(path, data, encoding?)` | 写入文件 |
| `appendFile(path, data, encoding?)` | 追加文件 |
| `mkdir(path, options?)` | 创建目录 |
| `stat(path)` | 读取文件元信息 |
| `readdir(path)` | 读取目录内容 |
| `rm(path, options?)` | 删除文件或目录 |

### `path` 高频 API

| API | 作用 |
|---|---|
| `path.join(...parts)` | 拼接路径 |
| `path.resolve(...parts)` | 解析绝对路径 |
| `path.dirname(filePath)` | 取目录名 |
| `path.basename(filePath)` | 取文件名 |
| `path.extname(filePath)` | 取扩展名 |
| `path.isAbsolute(filePath)` | 判断绝对路径 |

### 示例

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

### `readFile()` 返回值

| 调用方式 | 返回值 |
|---|---|
| `readFile(filePath)` | Buffer |
| `readFile(filePath, 'utf8')` | string |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 手写 `/` 拼路径 | 用 `path.join()` |
| 忘记 `await readFile()` | 得到 Promise，不是文件内容 |
| 大文件全部 `readFile()` | 大文件优先 stream |
| 混淆相对路径基准 | 相对路径通常相对 `process.cwd()` |

---

## 11. HTTP 服务器与客户端模型

### 结论

Node.js 可以直接创建 HTTP 服务器。服务器回调每收到一个请求执行一次，负责读取 request 并写入 response。

### 核心 API

| API | 作用 |
|---|---|
| `createServer(handler)` | 创建 HTTP server |
| `request.method` | 请求方法 |
| `request.url` | 请求 URL 路径和查询 |
| `request.headers` | 请求头 |
| `response.writeHead(statusCode, headers)` | 写状态码和响应头 |
| `response.write(chunk)` | 写响应体片段 |
| `response.end(body?)` | 结束响应 |
| `server.listen(port, callback)` | 监听端口 |

### 最小服务器

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

测试：

```bash
curl http://localhost:3000/health
```

### 请求响应模型

```txt
client sends request
  -> server handler receives request object
  -> server writes response headers
  -> server writes response body
  -> server ends response
```

### 必须记住 `response.end()`

没有 `response.end()`，客户端会一直等待响应结束。

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 忘记 `response.end()` | 响应不会结束 |
| 只判断 `request.url` 不判断 method | 同一路径可有不同方法 |
| 手写 JSON 但不设 content-type | 应设置 `application/json` |
| 以为原生 `http` 就是 Express | Express 是建立在 HTTP 模型上的框架 |

---

## 12. 读取 HTTP Request Body

### 结论

Node.js 的 HTTP request 可以作为 async iterable 消费。每个 chunk 通常是 Buffer。

```js
// Goal:
// Read a request body from an async iterable request stream.

async function readRequestBody(request) {
  const dataChunks = [];

  for await (const dataChunk of request) {
    dataChunks.push(dataChunk);
  }

  return Buffer.concat(dataChunks).toString('utf8');
}
```

### 底层模型

```txt
request body
  -> arrives as chunks
  -> each chunk is Buffer
  -> collect chunks
  -> Buffer.concat()
  -> decode to string
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 以为 request body 是现成字符串 | 它是流式到达的 |
| 忘记处理大请求体限制 | 真实项目必须限制 body size |
| 忘记解析 JSON | body text 只是字符串 |
| 只监听一次 `data` | 可能收到多个 chunk |

---

## 13. 非 HTTP 网络：`node:net`

### 结论

`node:net` 创建 TCP server 和 TCP client。TCP socket 是双工流（duplex stream）。

### 核心 API

| API | 作用 |
|---|---|
| `net.createServer(connectionHandler)` | 创建 TCP server |
| `net.createConnection(options, callback)` | 创建 TCP client |
| `socket.write(data)` | 写入数据 |
| `socket.on('data', listener)` | 接收数据 |
| `socket.end()` | 结束连接 |
| `server.listen(port, callback)` | 监听端口 |

### TCP Echo Server

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

### TCP Client

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

### TCP 最关键误区

```txt
TCP is a byte stream.
One data event is not guaranteed to equal one complete message.
```

真实项目必须设计消息边界：

```txt
newline-delimited messages
fixed-length header
length-prefixed protocol
custom parser
```

---

## 14. `child_process`

### 结论

`child_process` 让 Node.js 启动其他操作系统进程。它适合调用外部命令、运行脚本、隔离任务。

### API 对照

| API | 模型 | 适合场景 | 安全性 |
|---|---|---|---|
| `spawn(command, args)` | 流式 stdout/stderr | 长输出、持续进程 | 更适合处理参数 |
| `execFile(file, args)` | 执行具体文件 | 不需要 shell 的命令 | 比 `exec` 更稳 |
| `exec(command)` | 通过 shell 执行字符串 | 简单 shell 命令 | 不可信输入危险 |
| `fork(modulePath)` | 启动 Node 子进程 | Node 进程间通信 | 用于 Node 脚本 |

### 推荐：`spawn()`

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

### 安全规则

不要这样拼接用户输入：

```js
// Goal:
// Show an unsafe command-building shape.

import { exec } from 'node:child_process';

const fileName = process.argv[2];
exec(`cat ${fileName}`);
```

更安全的形状：

```js
// Goal:
// Pass command arguments separately.

import { spawn } from 'node:child_process';

const fileName = process.argv[2];
spawn('cat', [fileName]);
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 用 `exec()` 拼不可信输入 | 可能产生 command injection |
| 忽略 stderr | 子进程错误通常从 stderr 输出 |
| 忘记监听退出码 | 退出码决定命令是否成功 |
| 子进程等于线程 | 子进程是独立进程，不是线程 |

---

## 15. `worker_threads`

### 结论

`worker_threads` 适合 CPU 密集型任务，不是普通 I/O 任务的默认选择。

### Worker 和 child process 对比

| 对比项 | Worker thread | Child process |
|---|---|---|
| 边界 | 同一进程内的线程 | 独立操作系统进程 |
| 适合 | CPU 密集型 JS 计算 | 外部命令、进程隔离 |
| 通信 | `postMessage()` / `message` | stdio / IPC |
| 资源开销 | 通常小于进程 | 通常大于线程 |
| 内存 | 可以共享部分内存模型 | 进程隔离更强 |

### 核心 API

| API | 所属位置 | 作用 |
|---|---|---|
| `new Worker(url, options)` | main thread | 创建 worker |
| `workerData` | worker thread | 接收初始数据 |
| `parentPort.postMessage()` | worker thread | 发消息给主线程 |
| `worker.on('message')` | main thread | 接收 worker 消息 |
| `worker.on('error')` | main thread | 接收 worker 错误 |

### Worker 示例

`sumWorker.js`

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

`workerMain.js`

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

输出：

```txt
5050
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 为普通文件读写开 Worker | Node 异步 I/O 已经适合这类任务 |
| 以为 Worker 能共享普通对象引用 | 消息传递不是普通引用共享 |
| 忘记监听 `error` | Worker 内部异常需要主线程处理 |
| 把 Worker 当子进程 | Worker 是线程，不是独立进程 |

---

## 16. 小项目：日志服务器整合模型

### 结论

第 16 章的小项目把 Node.js 核心能力组合成一个小型 HTTP 日志服务器。

### 路由设计

| Method | Path | 行为 |
|---|---|---|
| `GET` | `/health` | 返回 JSON 健康状态 |
| `POST` | `/log` | 读取请求体，追加到文件 |
| `GET` | `/logs` | 以 stream 返回日志文件 |
| any | other | 返回 404 JSON |

### 技术组合

| 能力 | 使用位置 |
|---|---|
| HTTP server | `createServer()` |
| async iteration | `for await...of request` |
| Buffer | `Buffer.concat(dataChunks)` |
| fs/promises | `mkdir()`, `appendFile()` |
| stream | `createReadStream().pipe(response)` |
| path | `path.join()` |
| ESM | `import` / `export` |
| error handling | `try/catch` around request handler |

### 关键函数：发送 JSON

```js
// Goal:
// Send a JSON response from a Node.js HTTP server.

export function sendJson(response, statusCode, payloadRecord) {
  response.writeHead(statusCode, { 'content-type': 'application/json' });
  response.end(JSON.stringify(payloadRecord));
}
```

### 关键函数：读取请求体

```js
// Goal:
// Read all request chunks and decode them as UTF-8 text.

async function readRequestBody(request) {
  const dataChunks = [];

  for await (const dataChunk of request) {
    dataChunks.push(dataChunk);
  }

  return Buffer.concat(dataChunks).toString('utf8');
}
```

### 关键函数：追加日志

```js
// Goal:
// Append a log record to a text file.

import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';

const dataDirectory = 'data';
const logFilePath = path.join(dataDirectory, 'events.log');

export async function appendLogRecord(logText) {
  await mkdir(dataDirectory, { recursive: true });
  await appendFile(logFilePath, `${logText}\n`, 'utf8');
}
```

### 最终项目记忆模型

```txt
request comes in
  -> route by method and url
  -> read body if needed
  -> use fs/path to persist data
  -> use stream to send large data
  -> send JSON or text response
  -> always end the response
```

---

## 17. API 选择速查

| 需求 | 优先 API / 模块 |
|---|---|
| 执行 JS 文件 | `node file.js` |
| 读取命令行参数 | `process.argv` |
| 读取环境变量 | `process.env` |
| 拼接路径 | `path.join()` |
| 读小文本文件 | `fs/promises.readFile(path, 'utf8')` |
| 写小文本文件 | `fs/promises.writeFile(path, text, 'utf8')` |
| 追加日志 | `fs/promises.appendFile()` |
| 读大文件 | `createReadStream()` |
| 写大文件 | `createWriteStream()` |
| 连接读写流 | `pipeline()` |
| 二进制数据 | `Buffer` |
| 创建事件对象 | `EventEmitter` |
| 创建 HTTP server | `node:http.createServer()` |
| 读取 HTTP body | `for await...of request` + `Buffer.concat()` |
| 创建 TCP server | `node:net.createServer()` |
| 运行外部命令 | `child_process.spawn()` |
| 执行 CPU 密集型 JS | `worker_threads.Worker` |
| 读取系统信息 | `node:os` |
| 当前进程信息 | `node:process` |

---

## 18. 同名概念对照

| 名字 | 所属场景 | 含义 |
|---|---|---|
| `process` | Node.js | 当前 Node 进程 |
| `Processor` / CPU | OS | 硬件计算资源，不是 `process` |
| `Buffer` | Node.js | 二进制字节序列 |
| `ArrayBuffer` | ECMAScript / Web | 原始二进制内存块 |
| `stream` | Node.js | 分块数据处理抽象 |
| `ReadableStream` | Web API | 浏览器标准流对象 |
| `Worker` | `worker_threads` | Node 工作线程 |
| `Worker` | Web API | 浏览器 worker |
| `EventEmitter` | Node.js | Node 事件模型 |
| `EventTarget` | Browser / Web API | 浏览器事件模型 |
| `path` | Node.js | 文件路径处理 |
| `URL` | Web / Node | URL 结构化处理，不等于文件路径 |

---

## 19. 高频错误总表

| 错误 | 正确模型 |
|---|---|
| 把 Node.js 当成一门语言 | Node.js 是 JavaScript runtime |
| 在 Node 里访问 `document` | Node 没有 DOM |
| ESM 中直接用 `__dirname` | 需要从 `import.meta.url` 推导 |
| 忘记 `await fs.promises` API | 得到 Promise，不是结果 |
| 大文件全部 `readFile()` | 大文件用 stream |
| 忘记 `response.end()` | HTTP 客户端会一直等待 |
| 以为 TCP `data` 一次就是一条完整消息 | TCP 是 byte stream |
| 以为 `EventEmitter.emit()` 总是异步 | 通常同步调用 listener |
| 忘记监听 `'error'` | 很多 Node 对象可能触发 error |
| 用 `exec()` 拼接用户输入 | 有 command injection 风险 |
| 为 I/O 滥用 Worker | Worker 主要用于 CPU 密集型任务 |
| 把 `process.cwd()` 当文件所在目录 | 它是命令执行目录 |
| 把 Buffer 长度当字符长度 | Buffer length 是字节数 |

---

## 20. 和现代前端工程的关系

Node.js 是现代前端工具链的运行底座。

| 前端场景 | Node.js 提供什么 |
|---|---|
| Vite dev server | HTTP server, file watching, module transform |
| Next.js | SSR, routing server, build process |
| npm scripts | process execution |
| ESLint / Prettier | CLI runtime |
| TypeScript compiler | Node CLI program |
| Test runner | file system, child process, worker threads |
| API mock server | HTTP server |
| Build tools | fs, path, streams, worker threads |
| Deployment scripts | process, env, child_process |

学习 Node.js 的意义不是只会写一个服务器，而是理解前端工程背后的运行平台。

---

## 21. 最终记忆模型

```txt
Node.js is JavaScript outside the browser.

It uses V8 to execute JavaScript.
It uses the event loop to schedule asynchronous work.
It exposes built-in modules for files, paths, networks, processes, streams, and threads.

Buffer handles bytes.
EventEmitter handles events.
Stream handles chunked data.
fs handles files.
path handles file paths.
http handles request and response.
net handles TCP sockets.
child_process creates OS processes.
worker_threads runs CPU-heavy JavaScript on worker threads.

Most Node.js engineering problems are about:
I/O,
streaming,
concurrency,
process boundaries,
runtime environment,
and error handling.
```

---

## 22. 本章必须能回答的问题

学完 Node.js 这一章，你至少要能回答：

```txt
1. Node.js 是语言还是运行时？
2. Node.js 和浏览器宿主环境有什么区别？
3. 为什么 Node.js 没有 DOM？
4. process 对象表示什么？
5. process.cwd() 和当前文件路径有什么区别？
6. package.json 的 type 字段影响什么？
7. node: 前缀表示什么？
8. Node.js 为什么适合 I/O 密集型程序？
9. Promise microtask 为什么早于 setTimeout callback？
10. Buffer 解决什么问题？
11. Buffer.length 为什么是字节长度？
12. EventEmitter 的 on(), once(), emit() 分别做什么？
13. 为什么 error event 很重要？
14. stream 解决什么问题？
15. backpressure 为什么存在？
16. pipeline() 比手动 pipe 稳在哪里？
17. fs/promises 为什么适合 async/await？
18. path.join() 为什么比手写路径更稳？
19. HTTP request 和 response 在 Node 里是什么对象？
20. response.end() 为什么必须调用？
21. 如何读取 HTTP request body？
22. TCP socket 为什么是 duplex stream？
23. TCP data event 为什么不等于完整消息？
24. child_process 什么时候适合用？
25. spawn() 和 exec() 的安全差异是什么？
26. worker_threads 适合 I/O 还是 CPU 密集型任务？
27. Worker 和 child process 的区别是什么？
28. Node.js 如何支撑现代前端工程工具链？
```
