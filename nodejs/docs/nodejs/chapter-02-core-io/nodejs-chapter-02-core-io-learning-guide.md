# Node.js 第 2 章：核心 I/O 能力、二进制数据、文件系统、Stream 与模块系统

<style>
.macos-code-window {
  overflow: hidden;
  border: 1px solid #30363d;
  border-radius: 12px;
  background: #0d1117;
  margin: 16px 0;
}

.macos-code-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0 12px;
  background: #161b22;
  border-bottom: 1px solid #30363d;
}

.macos-code-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  display: inline-block;
  flex: 0 0 auto;
}

.macos-code-dot-red {
  background: #ff5f57;
}

.macos-code-dot-yellow {
  background: #ffbd2e;
}

.macos-code-dot-green {
  background: #28c840;
}

.macos-code-title {
  margin-left: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  color: #c9d1d9;
}

.macos-code-titlebar + pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  background: transparent;
  border-radius: 0 0 12px 12px;
}

.macos-code-titlebar + pre code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
}
</style>

> 适用环境：本地 Node.js v26.3.0、npm 11.16.0；API 行为以 Node.js v26.4.0 文档为参考基线。
>
> 本章边界：聚焦 Buffer、Stream、File System、Path、Events、Process / OS 与模块系统。HTTP 只用于说明请求和响应也是 Stream；Express、数据库、认证、缓存、容器与后端框架留到后续章节。

## 目录

- [0. 章前定位](#chapter-position)
- [1. 学习目标](#learning-objectives)
- [2. 前置知识](#prerequisites)
- [3. 环境与运行基线](#environment-baseline)
- [4. Core I/O 第一性原理](#first-principles)
- [5. Buffer、Stream、fs、Path、Events、Module 的边界](#core-io-boundaries)
- [6. Node.js Core I/O 底层模型](#core-io-model)
- [7. 核心术语](#core-terms)
- [8. 本章实践路线](#practice-route)
- [9. 核心教学](#chapter-teaching)
  - [9.1 Buffer 是什么，为什么 Node 需要二进制数据容器](#section-9-1)
  - [9.2 encoding、Buffer.from、Buffer.alloc、Buffer.allocUnsafe](#section-9-2)
  - [9.3 Buffer slice、copy 与共享内存边界](#section-9-3)
  - [9.4 Stream 心智模型：chunk、source、destination、flow](#section-9-4)
  - [9.5 Readable 与 Writable Stream](#section-9-5)
  - [9.6 Transform 与 Duplex Stream](#section-9-6)
  - [9.7 pipeline 与 backpressure](#section-9-7)
  - [9.8 File System API 家族：callback、promise、sync](#section-9-8)
  - [9.9 file descriptor 与 FileHandle 生命周期](#section-9-9)
  - [9.10 readFile 与 Stream 的大文件边界](#section-9-10)
  - [9.11 Path 与跨平台路径处理](#section-9-11)
  - [9.12 EventEmitter 与事件驱动 I/O](#section-9-12)
  - [9.13 EventEmitter error 事件与 listener 错误](#section-9-13)
  - [9.14 process、stdin、stdout、stderr 与 CLI I/O](#section-9-14)
  - [9.15 OS 边界与运行环境观察](#section-9-15)
  - [9.16 CommonJS 加载与 require cache](#section-9-16)
  - [9.17 ESM import/export 与 live binding](#section-9-17)
  - [9.18 package.json type、main、exports 与包边界](#section-9-18)
  - [9.19 CommonJS 与 ESM 的循环依赖](#section-9-19)
  - [9.20 本章集成：large-file-log-processor](#section-9-20)
- [10. API 与规则索引](#api-index)
- [11. 常见错误对照表](#error-table)
- [12. 调试与验证方法](#debugging)
- [13. 分项练习说明](#practice-guide)
- [14. 最终迷你项目](#mini-project)
  - [14.1 项目目标与适配性](#project-goal)
  - [14.2 最终小项目结构](#project-structure)
  - [14.3 完整代码](#project-code)
  - [14.4 生成样例与运行](#project-run)
  - [14.5 预期输出](#project-output)
  - [14.6 执行、资源与 backpressure](#project-lifecycle)
  - [14.7 常见错误与生产连接](#project-errors)
- [15. 速查表使用方式](#cheatsheet)
- [16. 面试题使用方式](#interview)
- [17. 最终心智模型](#final-model)
- [18. 官方资料](#official-sources)

## 本章代码定位索引

| 学习目标 | 文件 | 可观察证据 |
| --- | --- | --- |
| 比较 Buffer 分配策略 | `practices/02-core-io/01-buffer/buffer-allocation.js` | `Buffer.from()`、`Buffer.alloc()` 与 `Buffer.allocUnsafe()` 的内容差异 |
| 观察 encoding 转换 | `practices/02-core-io/01-buffer/buffer-encoding.js` | UTF-8 字节长度、hex 表示与解码结果 |
| 区分共享视图和复制 | `practices/02-core-io/01-buffer/buffer-slice-copy.js` | 修改 view 后源 Buffer 改变，copy 保持独立 |
| 观察 Stream 类型和生命周期 | `practices/02-core-io/02-stream/readable-stream-demo.js`、`practices/02-core-io/02-stream/writable-stream-demo.js`、`practices/02-core-io/02-stream/transform-stream-demo.js` | chunk 交付、write/final 和 Transform 输出 |
| 验证 backpressure 与错误传播 | `practices/02-core-io/02-stream/pipeline-backpressure-demo.js` | `pipeline()` 完成点和上下游流控 |
| 比较整体读取与分块读取 | `practices/02-core-io/03-file-system/readfile-vs-stream.js` | 整体 Buffer 与 chunk 计数 |
| 追踪文件资源生命周期 | `practices/02-core-io/03-file-system/filehandle-demo.js`、`practices/02-core-io/03-file-system/atomic-write-demo.js` | open/read/close 与 temporary file/rename |
| 观察 EventEmitter 规则 | `practices/02-core-io/04-events/eventemitter-basic.js`、`practices/02-core-io/04-events/eventemitter-error-mistake.js` | listener 同步顺序与特殊 `'error'` 路径 |
| 比较 CommonJS 与 ESM | `practices/02-core-io/05-modules/cjs-cache-demo.cjs`、`practices/02-core-io/05-modules/esm-live-binding-demo.mjs` | require cache 对象身份与 ESM live binding 更新 |
| 识别循环依赖边界 | `practices/02-core-io/05-modules/circular-dependency-cjs.cjs` | CommonJS 部分初始化导出 |
| 验证 package 公开入口 | `practices/02-core-io/05-modules/package-exports-demo/` | `import`、`require` condition 与公开 subpath |
| 综合字节、流控和资源关闭 | `mini-projects/large-file-log-processor/` | 增量统计、临时文件、`rename()` 与 summary 输出 |

> 本章所有相对路径均以 `D:\node.js` 为根。

<a id="chapter-position"></a>
## 0. 章前定位

Chapter 01 解释了 Node.js 如何把 JavaScript、V8、libuv 和操作系统能力连接起来。本章继续回答更具体的问题：当程序面对文件、标准输入、网络数据或模块图时，字节如何表示，数据如何流动，资源如何关闭，代码边界又如何确定。

本章不把下列简化说法当作结论：

- “文件就是 string”：文件系统提供的是字节，string 需要 encoding 才能从字节解释出来。
- “Stream 只是把文件切小”：Stream 还定义 readable/writable 生命周期、缓冲、backpressure、错误和终止。
- “异步文件 API 不占资源”：等待可以离开 JavaScript 调用栈，但 descriptor、libuv 工作和内存缓冲仍有所有权。
- “ESM 只是另一种 `require()`”：两者的解析、链接、缓存、导出绑定和循环依赖行为不同。

<a id="learning-objectives"></a>
## 1. 学习目标

完成本章后，你应能：

1. 预测 Buffer 分配、编码、共享视图和复制的结果。
2. 解释 Readable、Writable、Duplex、Transform 的数据方向和终止事件。
3. 用 `pipeline()` 建立能传播错误并遵守 backpressure 的数据链。
4. 根据文件规模选择 `readFile()`、`createReadStream()` 或 `FileHandle`。
5. 追踪 open → read/write → close 生命周期，并解释原子替换的限制。
6. 写出不依赖当前操作系统分隔符的路径逻辑。
7. 正确处理 EventEmitter 的同步 listener 顺序和特殊 `'error'` 事件。
8. 区分 CommonJS cache、ESM live binding、package boundary 与 interop。

<a id="prerequisites"></a>
## 2. 前置知识

- byte 是 0–255 的数值；encoding 是“字符与字节序列的映射规则”。
- 引用值可能共享同一底层内存；创建新对象不一定复制字节。
- callback、Promise 与 `for await...of` 都是控制完成时机的方式，不代表底层资源相同。
- Chapter 01 的 event loop 结论继续成立：同步 JavaScript 和 sync I/O 会占住主线程；异步文件 API 通常把等待交给 libuv thread pool。
- 操作系统用整数 file descriptor 关联进程与打开的资源。
- 模块 specifier 的解析属于宿主；ESM 的 live binding 属于 JavaScript module 语义。

<a id="environment-baseline"></a>
## 3. 环境与运行基线

本章以 Node.js v26.x 为事实核对基线，只使用 Node 内置模块。`.cjs` 始终按 CommonJS 解析，`.mjs` 始终按 ESM 解析；`.js` 的格式需要结合最近的 `package.json`、显式 `"type"` 和当前 Node 解析规则判断。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
node --version
node practices/02-core-io/01-buffer/buffer-allocation.js
node practices/02-core-io/05-modules/cjs-cache-demo.cjs
node practices/02-core-io/05-modules/esm-live-binding-demo.mjs
```
</div>

这些命令从 `D:\node.js` 运行。输出中的绝对路径、进程信息和分块次数可能受机器、文件和运行时版本影响，应验证机制与约束，不把机器相关数值写成固定契约。

<a id="first-principles"></a>
## 4. Core I/O 第一性原理

服务器端程序不能只处理 JavaScript string 和普通 object。文件、socket、压缩数据和标准输入最终都是字节；数据可能比进程可用内存大；生产者和消费者速度可能不同；文件描述符必须关闭；跨平台路径不能靠字符串猜测；模块加载还受到文件扩展名和最近 `package.json` 的控制。

本章建立三条主线：

1. **数据表示**：字节如何进入 Buffer，encoding 如何把字节与 string 相互转换。
2. **数据流动**：Stream 如何以 chunk 推进，并用 backpressure 控制内存。
3. **资源与代码边界**：file descriptor、EventEmitter listener、process stdio 和 module record 如何创建、使用、缓存与结束。

第一性原理判断法：先确定当前问题属于字节解释、增量流动、资源生命周期还是模块解析，再寻找负责该层的 API 和可观察状态。不要用一个层的术语替代另一个层的机制。

<a id="core-io-boundaries"></a>
## 5. Buffer、Stream、fs、Path、Events、Module 的边界

| 能力 | 负责的问题 | 不负责的问题 |
| --- | --- | --- |
| Buffer | 表示固定长度字节序列，完成字节与 string 的转换 | 不定义文件读取时机或业务记录边界 |
| Stream | 管理 chunk、缓冲、backpressure、错误与终止 | 不保证一个 chunk 就是一行或一条消息 |
| File System | 打开、读取、写入、关闭和重命名文件资源 | 不替应用选择业务级原子性或数据格式 |
| Path | 按平台规则组合、解析和分解路径字符串 | 不检查路径存在、权限或是否安全 |
| Events | 按事件名同步分发 listener，表达对象状态变化 | 不自动把 listener 变成异步任务 |
| Module | 解析、加载、链接、求值、缓存并暴露导出 | 不等同于 npm 安装，也不由 TypeScript 类型决定运行时格式 |

这些能力会组合，但不能混为一层。例如 `ReadStream` 同时是 EventEmitter 和 Stream，并持有文件资源；EventEmitter 描述事件分发，Stream 约束流控，File System 与操作系统负责 descriptor 生命周期。

<a id="core-io-model"></a>
## 6. Node.js Core I/O 底层模型

一次大文件处理的完整链条是：

`path string/file URL → fs open → OS descriptor → ReadStream → Buffer chunks → Transform state → Writable internal queue → temporary file → close → rename`

模块层同时建立另一条链：

`entry file → determine CJS/ESM format → resolve specifier/package exports → create/cache module record → link dependencies → evaluate → expose exports`

两条链在应用入口汇合：模块系统决定加载哪段代码；代码创建 I/O 资源；event loop 推进回调；Stream 的 EventEmitter 事件描述状态；资源关闭后进程才可自然退出。

<a id="core-terms"></a>
## 7. 核心术语

| 术语 | 负责层 | 准确定义 | 常见误解 |
| --- | --- | --- | --- |
| Buffer | Node 平台 API / Uint8Array 子类 | 固定长度字节序列 | 等同于 string |
| encoding | 数据转换规则 | 字符与字节间的解释方式 | TypeScript 类型 |
| chunk | Stream 模型 | 一次交付的数据单元，不等于业务记录 | 一定是一整行 |
| highWaterMark | Stream 缓冲策略 | 开始施加背压的阈值，不是硬内存上限 | 达到即报错 |
| backpressure | Stream 流控 | 下游较慢时让上游暂停/减速 | 丢弃数据 |
| file descriptor | OS 资源句柄 | 进程打开文件表中的整数索引 | 文件内容本身 |
| FileHandle | Node Promise API 对象 | 包装 descriptor 与操作方法的资源对象 | 自动永远关闭 |
| atomic replace | 文件系统策略 | 同目录临时文件完成后 rename 替换 | 数据库事务 |
| EventEmitter | Node 对象模型 | 按事件名同步调用已注册 listener | 自动异步队列 |
| module record/cache | 模块系统 | 已解析、实例化或执行模块的运行时记录 | 源文件副本 |
| live binding | ESM 语言机制 | importer 读取 exporter 当前 binding | 复制当时值 |
| package scope | Node 模块系统 | 最近 `package.json` 控制的目录边界 | 整个仓库唯一设置 |

<a id="practice-route"></a>
## 8. 本章实践路线

按“字节 → 流动 → 资源 → 事件 → 模块 → 集成”推进：

1. 用 Buffer 分配、encoding 和共享视图实验建立字节所有权模型。
2. 用 Readable、Writable、Transform 和 `pipeline()` 观察 chunk、终止与 backpressure。
3. 对比 `readFile()`、ReadStream 与 FileHandle，追踪 descriptor 的打开和关闭。
4. 用 Path 规则替代字符串拼接，再观察 EventEmitter 的同步 listener 与 `'error'` 事件。
5. 对照 CommonJS cache、ESM live binding、package `exports` 和循环依赖。
6. 在 `large-file-log-processor` 中整合增量读取、记录边界、流控、临时文件与模块边界。

每项练习先写出预测，再运行文件并记录输出，最后用“负责层—资源—状态转换—可观察证据”解释结果。

<a id="chapter-teaching"></a>
## 9. 核心教学

<a id="section-9-1"></a>
### 9.1 Buffer 是什么，为什么 Node 需要二进制数据容器

**结论：** Buffer 是 Node 对固定长度 byte sequence 的表示；当前官方文档将它定义为 `Uint8Array` 的子类。文件、网络、压缩和加密首先产生字节，文本只是按 encoding 解释后的结果。

**本节解决的问题：** JavaScript string 适合字符，不适合表达“原始 0x00、0xff 与任意二进制协议字段”。Buffer 允许按 index 读取 0–255，并能直接交给大量 Node I/O API。

**边界与底层机制：** V8 管理 JavaScript 对象；Buffer 对象持有或引用底层字节存储；Node API 把 OS 读取结果包装成 Buffer chunk。TypeScript 只能描述 `Buffer` 类型，不会决定字节内容或 encoding。

**机制证据链：** `fs`/socket 产生 bytes → Node 创建 Buffer/Uint8Array 视图 → JavaScript 按索引或解码读取 → Stream/应用消费 → 引用释放后内存才可回收。

**对比与错误：** 把二进制先拼成 string 可能错误解码或制造额外复制；把 chunk 当完整业务记录会在多字节字符或换行跨 chunk 时失败。

**最终记忆模型：** Buffer 保存字节；encoding 解释字节；两者不是同一件事。

<a id="section-9-2"></a>
### 9.2 encoding、Buffer.from、Buffer.alloc、Buffer.allocUnsafe

**结论：** `Buffer.from()` 从已有值构造内容；`Buffer.alloc()` 分配并清零；`Buffer.allocUnsafe()` 分配但必须在读取或暴露前完全覆盖。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/02-core-io/01-buffer/buffer-allocation.js</span>
  </div>

```js
'use strict';

const { Buffer } = require('node:buffer');

const encoded = Buffer.from('Node', 'utf8');
const safe = Buffer.alloc(4);
const unsafe = Buffer.allocUnsafe(4);
unsafe.fill(0);

console.log(encoded);
console.log(encoded.toString('hex'));
console.log(safe);
console.log(unsafe);
```
</div>

**逐行解释与执行过程：** `Buffer.from()` 运行 UTF-8 编码并得到四个字节；`alloc(4)` 保证四个零；`allocUnsafe(4)` 的旧内存内容不可依赖，所以紧接着 `fill(0)` 建立初始化不变量。`toString('hex')` 只是另一种输出表示。

**预期输出：** 第一项表示 `4e 6f 64 65`，hex string 为 `4e6f6465`，后两项均显示四个零。unsafe 在填充前没有合法预期输出。

**规则与错误：** “unsafe”不是 API 会越界，而是未初始化数据可能包含旧字节。违反的规则是“任何读取、日志、传输前必须覆盖整个范围”。encoding 是运行时转换参数，不是 TypeScript 类型。

**真实项目关系：** 解析协议帧或复用已知长度工作区时才考虑 unsafe；普通应用优先可证明正确的 `from`/`alloc`。

**机制证据链：** string/size 触发构造 → `Buffer.from` 执行编码或 `alloc*` 请求字节存储 → Node/V8 暴露 Buffer object → 应用 fill/read/decode → 输出 bytes；TypeScript 只检查参数类型，未完整初始化 unsafe range 才是错误规则。

<a id="section-9-3"></a>
### 9.3 Buffer slice、copy 与共享内存边界

**结论：** `Buffer.prototype.slice()` 出于兼容性创建共享视图，不复制；当前官方文档建议用 `subarray()` 明确表达共享视图。要复制，使用 `Buffer.from(view)`、`buf.copy()` 或 `Uint8Array.prototype.slice.call(buf)`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/02-core-io/01-buffer/buffer-slice-copy.js</span>
  </div>

```js
'use strict';

const { Buffer } = require('node:buffer');

const source = Buffer.from('ABCDE');
const sharedView = source.subarray(1, 4);
const copied = Buffer.from(sharedView);

sharedView[0] = 'x'.charCodeAt(0);

console.log(source.toString());
console.log(sharedView.toString());
console.log(copied.toString());
```
</div>

**逐行解释：** `subarray(1, 4)` 指向 source 的 BCD 区域；`Buffer.from(sharedView)` 复制当前三个字节；修改 sharedView 第一个 byte 同时修改 source，但 copied 保持 BCD。

**预期输出：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
AxCDE
xCD
BCD
```
</div>

**机制与规则：** 三个对象中 source/sharedView 的 `.buffer` 存储重叠，copied 使用独立存储。错误是仅凭“新对象”推断“新内存”。真实项目中，小视图还可能让大 backing store 持续存活。

**机制证据链：** source Buffer → `subarray()` 创建共享 byte range → `Buffer.from()` 创建副本 → view 写入同一 backing store → source 输出改变、copy 不变；TypeScript 无法从变量名证明是否共享，诊断时比较 `.buffer`、`.byteOffset` 与修改结果。

**最终记忆模型：** view 改变观察窗口；copy 改变所有权。

<a id="section-9-4"></a>
### 9.4 Stream 心智模型：chunk、source、destination、flow

**结论：** Stream 是随时间传递数据和状态的抽象，不是“一个大数组”。source 产生 chunk，destination 消费 chunk，flow 控制何时读取和何时暂停。

**四种类型：**

- Readable：只向外提供数据，例如 `fs.createReadStream()`。
- Writable：只接收数据，例如 `fs.createWriteStream()`。
- Duplex：读写两侧相对独立，例如 socket。
- Transform：Duplex 的特例，输出由输入转换得到，例如压缩或逐行解析。

**底层机制：** Readable 维护内部读取缓冲和 flowing/paused 状态；Writable 维护待写队列；chunk 默认常是 Buffer。`highWaterMark` 是开始调节流速的阈值：byte mode 按字节、object mode 按对象计数，不是硬上限。

**机制证据链：** OS file descriptor ready → ReadStream 产生 Buffer → consumer 读取 → Writable.write() 入队 → 内部队列达到阈值时返回 false → 上游等待 drain → end/finish/close。

**错误边界：** chunk 边界由读取时机与缓冲决定，不能假定一个 chunk 对应一行 JSON、一个 UTF-8 字符或一个网络消息。

<a id="section-9-5"></a>
### 9.5 Readable 与 Writable Stream

**结论：** Readable 的消费 API 有多种，但同一个实例应选择一种风格；官方文档明确警告不要混用 `'data'`、`'readable'`、`pipe()` 与 async iterator。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/02-core-io/02-stream/readable-stream-demo.js</span>
  </div>

```js
'use strict';

const { Readable } = require('node:stream');

async function main() {
  const source = Readable.from(['alpha', 'beta', 'gamma']);

  for await (const chunk of source) {
    console.log(chunk);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```
</div>

**逐行与执行：** `Readable.from()` 把 iterable 转为 Readable；async iterator 在每个可读 chunk 到来时恢复循环；完全消费后得到 end，循环结束。异常进入 rejected Promise 并设置退出码。

**预期输出：** 按顺序输出 alpha、beta、gamma。listener/iterator 调用顺序不等于 OS 一次性返回全部内容。

**Writable 规则：** `write(chunk)` 的 boolean 返回值是流控信号；`false` 不表示写入失败，而是“暂时不要继续写”。结束输入使用 `end()`，完成事件是 `'finish'`；底层资源关闭可能另有 `'close'`。

**常见错误：** 既注册 `'data'` 又用 `for await...of`，违反“单一消费风格”规则，会产生难以推理的 mode transition。

**机制证据链：** iterable/readable resource → Readable internal buffer → async iterator 请求 chunk → loop body 消费 → end 终止；Writable 则由 `write()` 入队、false/drain 调节、`end()`/finish 完成。TypeScript 不能保证选择了唯一消费风格。

<a id="section-9-6"></a>
### 9.6 Transform 与 Duplex Stream

**结论：** Duplex 有彼此独立的 readable/writable 两侧；Transform 建立输入到输出的因果关系。Transform 的 readable 与 writable `highWaterMark` 也可不同。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/02-core-io/02-stream/transform-stream-demo.js</span>
  </div>

```js
'use strict';

const { Transform } = require('node:stream');

const upper = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString('utf8').toUpperCase());
  },
});

process.stdin.pipe(upper).pipe(process.stdout);
```
</div>

**逐行与生命周期：** stdin 是 Readable，upper 同时接收和产生 chunk，stdout 是 Writable。每次 `_transform` 必须且只能通过 callback 结束该 chunk；stdin end 后 Transform flush/finish，stdout 是否关闭由 pipe 目标语义决定。

**边界：** `chunk.toString()` 直接逐 chunk 解码可能切断跨 chunk 多字节字符；严谨文本 transform 应使用 `StringDecoder`，最终项目会采用它。

**对比：** `net.Socket` 的输出不一定由输入转换而来，所以是 Duplex；uppercase 的输出由输入确定，所以是 Transform。

**机制证据链：** stdin Buffer → `pipe()` 交给 Transform writable side → `_transform` 解码并产生 uppercase chunk → readable side 推给 stdout → callback/end/finish 结束；逐 chunk 直接解码违反跨 chunk 字符完整性前提，StringDecoder 是识别和修复证据。

<a id="section-9-7"></a>
### 9.7 pipeline 与 backpressure

**结论：** backpressure 是消费者把容量状态反馈给生产者。`pipeline()` 连接 source、transform、destination，转发错误、处理完成与清理，并自动协调内置 Stream 的背压。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/02-core-io/02-stream/pipeline-backpressure-demo.js</span>
  </div>

```js
'use strict';

const fs = require('node:fs');
const { Transform } = require('node:stream');
const { pipeline } = require('node:stream/promises');

const addPrefix = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, Buffer.concat([Buffer.from('> '), chunk]));
  },
});

async function main() {
  await pipeline(
    fs.createReadStream('input.txt'),
    addPrefix,
    fs.createWriteStream('output.txt'),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```
</div>

**执行过程：** read stream 读取 Buffer → Transform 产生新 Buffer → write stream 入队 → 下游队列到 `highWaterMark` 时 pipe 暂停上游 → `'drain'` 后恢复 → source end → transform finish → destination finish → pipeline Promise settle。

**为什么更安全：** 手写 `readable.on('data', chunk => writable.write(chunk))` 若忽略 `false` 会绕开背压；只用 `.pipe()` 又需要额外组织多段错误。`pipeline()` 在错误时销毁相关 Stream，并提供一个完成点。

**版本边界：** 当前默认 byte-mode highWaterMark 可由具体 Stream 类和版本决定，不应背诵旧教材的固定值；显式配置时仍要测量内存与吞吐。

**机制证据链：** file descriptor ready → ReadStream Buffer → Transform output → Writable queue → `write() === false` 暂停 source → drain 恢复 → finish/close 让 pipeline settle；错误通过 destroy/rejection 传播，TypeScript 不能证明运行时容量和 I/O 成功。

<a id="section-9-8"></a>
### 9.8 File System API 家族：callback、promise、sync

**结论：** `node:fs` 提供 callback、Promise 与 sync 形式。callback/Promise API 异步完成，sync API 在返回前阻塞 event loop 与后续 JavaScript。

**API 对照：**

| 形式 | 入口 | 完成方式 | 错误 |
| --- | --- | --- | --- |
| callback | `node:fs` | error-first callback | callback 的首参 |
| Promise | `node:fs/promises` | fulfill/reject | `try/catch` |
| sync | `node:fs` 的 `*Sync` | 当前调用返回 | 同步 throw |

**底层机制：** 官方文档指出除 `FSWatcher` 外，callback/Promise 文件 API 使用 libuv thread pool。它们不保证多个并发修改的完成顺序；“异步”不等于“自动串行”或“线程安全”。

**机制证据链：** JavaScript 调用 read → Node 验证路径/参数 → libuv worker 执行 OS 文件调用 → completion 回 event loop → callback 或 Promise reaction → 应用处理 bytes/error。

**常见错误：** 并发 `rename()` 与 `stat()` 后按代码书写顺序推断完成顺序；正确做法是通过 callback/await 建立因果依赖。

<a id="section-9-9"></a>
### 9.9 file descriptor 与 FileHandle 生命周期

**结论：** descriptor 是进程打开资源表中的整数；Promise API 的 FileHandle 封装 descriptor，但仍必须 close。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/02-core-io/03-file-system/filehandle-demo.js</span>
  </div>

```js
'use strict';

const { open } = require('node:fs/promises');

async function readPrefix(filePath) {
  const handle = await open(filePath, 'r');
  const target = Buffer.alloc(16);

  try {
    const { bytesRead } = await handle.read(target, 0, target.length, 0);
    return target.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
}

readPrefix('input.txt')
  .then((buffer) => console.log(buffer.toString('utf8')))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
```
</div>

**逐行与资源变化：** `open` 创建 FileHandle/descriptor；Buffer 是读入目标；`handle.read` 填充最多 16 bytes 并返回实际数量；subarray 只暴露有效范围；finally 无论成功、读取失败或 return 都关闭 handle。

**预期：** 输出前 16 bytes 解码后的文本；文件不存在时打印 error，已成功打开的 handle 仍会在 finally 关闭。

**违反规则：** 忘记 close 会逐步耗尽进程 descriptor 限额。不要依赖垃圾回收作为正常资源管理。

**机制证据链：** path/flags → `open()` → OS descriptor 与 FileHandle → `read()` 填充 Buffer → `finally` close → descriptor 释放；异常路径若绕过 close 就违反资源所有者必须终结生命周期的规则，可通过句柄计数或 `EMFILE` 识别。

<a id="section-9-10"></a>
### 9.10 readFile 与 Stream 的大文件边界

**结论：** `readFile()` 在 Promise/callback 完成时给出整个文件内容，峰值内存随文件规模增长；`createReadStream()` 分块交付，允许在固定数量级缓冲下处理。

| 选择 | 适用 | 主要代价 |
| --- | --- | --- |
| `readFile()` | 小型配置、模板、确定大小文件 | 整体 Buffer/string 驻留 |
| `createReadStream()` | 大文件、网络传输、增量解析 | 需要处理 chunk 边界与 lifecycle |
| `FileHandle.read()` | 随机访问、固定 offset、精细控制 | 必须管理 descriptor 与位置 |

**底层机制：** Stream 不保证总内存严格等于 highWaterMark，但它避免把整个输入作为单一结果长期驻留。大文件处理中，还要避免在应用层把所有 chunk 重新 push 到数组中，否则会抵消 Stream 优势。

**原子写概念：** 将完整内容写到目标同目录临时文件，关闭后 `rename()`，可避免读者看到半写文件。但这不是跨文件系统事务，也不等于断电持久性保证；权限、Windows 文件占用与 filesystem 语义仍需验证。

**机制证据链：** `readFile()` 把所有 bytes 聚合后一次 resolve；ReadStream 则 open descriptor → 多次 Buffer chunk → 增量 consumer → close。把 chunk 再全部收集会重新违反有界内存目标，RSS/heap 趋势是诊断证据。

<a id="section-9-11"></a>
### 9.11 Path 与跨平台路径处理

**结论：** 路径是平台语义，不是普通字符串拼接。`path.join()` 组合片段并规范化；`path.resolve()` 从右向左构造绝对路径；`dirname`、`basename`、`extname` 分解路径。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: cross-platform path boundary</span>
  </div>

```js
const path = require('node:path');

const reportPath = path.join('reports', '2026', 'summary.json');
const absoluteReportPath = path.resolve(process.cwd(), reportPath);

console.log(path.dirname(absoluteReportPath));
console.log(path.basename(absoluteReportPath));
console.log(path.extname(absoluteReportPath));
console.log(path.sep);
console.log(path.win32.join('logs', 'app.log'));
console.log(path.posix.join('logs', 'app.log'));
```
</div>

**执行与输出：** 当前平台的默认 path 实现决定 separator；Windows 下绝对路径和 `path.sep` 通常使用反斜杠。`path.win32`/`path.posix` 用于显式处理某种格式，不代表实际 filesystem 自动转换。

**错误：** `'reports/' + userPart` 会混入错误 separator、绝对片段或 `..`。`path.resolve()` 只做路径计算，不自动证明路径安全或存在；不可信输入仍要做目录边界验证。

**URL 边界：** ESM 的 `import.meta.url` 是 file URL，不是平台路径；需要时使用 `fileURLToPath()`/`pathToFileURL()`，不要手动删除 `file://`。

**机制证据链：** cwd/path segments 或 file URL → `path.join/resolve` 或 URL conversion → 平台规则生成 path string → fs API 再访问资源；Path 只计算不验证存在性/授权，TypeScript 也不能阻止 `..` 越界。

<a id="section-9-12"></a>
### 9.12 EventEmitter 与事件驱动 I/O

**结论：** `emit()` 会按注册顺序同步调用当前事件的 listener；listener 返回值被忽略。EventEmitter 本身不会把 listener 自动放入 event loop。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/02-core-io/04-events/eventemitter-basic.js</span>
  </div>

```js
'use strict';

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

function persistent(value) {
  console.log(`on:${value}`);
}

emitter.on('record', persistent);
emitter.once('record', (value) => console.log(`once:${value}`));
emitter.emit('record', 1);
emitter.off('record', persistent);
emitter.emit('record', 2);
```
</div>

**逐行与预期：** 第一次 emit 同步输出 `on:1`、`once:1`；once listener 随后移除；显式 off 移除 persistent；第二次 emit 无输出。

**对象/生命周期：** emitter 内部按 event name 保存 function 引用。`off` 必须拿到同一函数引用；重新写一个等价 arrow function 不是同一对象。

**与 Stream 的关系：** Node Stream 继承 EventEmitter，因此 `'data'`、`'end'`、`'finish'`、`'error'`、`'close'` 是状态通知；事件不替代 Stream 的 backpressure 规则。

**机制证据链：** `on/once` 保存 function identity → `emit('record', value)` 取得当时 listener 列表 → 按注册顺序同步调用 → once/off 更新后续列表；用新函数尝试 off 违反引用相等规则，`listeners()` 与重复输出可用于识别。

<a id="section-9-13"></a>
### 9.13 EventEmitter error 事件与 listener 错误

**结论：** EventEmitter 发出 `'error'` 且没有至少一个 error listener 时，Node 会 throw、打印 stack trace 并退出进程。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/02-core-io/04-events/eventemitter-error-mistake.js</span>
  </div>

```js
'use strict';

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.on('error', (error) => {
  console.error(`Handled: ${error.message}`);
  process.exitCode = 1;
});

emitter.emit('error', new Error('Input stream failed'));
```
</div>

**预期输出：** `Handled: Input stream failed`，进程自然以 1 结束。删除 error listener 后，违反 `'error'` 特殊事件契约，进程会因未处理 error 终止。

**listener leak warning：** 默认阈值告警表示同一 emitter/event 上 listener 数量可疑，常见原因是每个请求重复注册却未移除；它不是证明已经发生内存泄漏，也不应通过盲目提高 max listeners 掩盖。

**真实项目识别：** 查看 `MaxListenersExceededWarning` stack，确认注册所有者、移除时机和 listener 引用；Stream pipeline 应统一处理 error/close。

**机制证据链：** I/O/emitter 产生 Error → `emit('error', error)` → 有 listener 时同步处理并设置 exitCode，无 listener 时 throw/stack/process exit；TypeScript 不能证明 listener 已注册，warning stack 和 listener count 是运行时证据。

<a id="section-9-14"></a>
### 9.14 process、stdin、stdout、stderr 与 CLI I/O

**结论：** `process.stdin` 是 Readable，stdout/stderr 是 Writable；argv/env/cwd 提供启动上下文，exitCode 表示最终状态。它们把 Chapter 01 的进程生命周期应用到实际 I/O。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: stdin line counter</span>
  </div>

```js
const readline = require('node:readline');

const input = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity,
});

let count = 0;

input.on('line', () => {
  count += 1;
});

input.once('close', () => {
  process.stdout.write(`${count}\n`);
});

input.on('error', (error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
```
</div>

**执行链：** shell pipe → stdin bytes → readline 处理换行 → line event 同步更新 count → stdin end/Interface close → `process.stdout.write()`。读取错误通过 `process.stderr.write()` 单独输出，便于 shell 将数据与诊断分开重定向。

**边界与错误：** `process.env.NAME` 是 string 或 undefined；`argv` 也是外部字符串，必须解析。`process.cwd()` 是启动工作目录，不是当前模块目录。正常失败优先设置 `process.exitCode`，避免强退截断待写 stdout/stderr。

**机制证据链：** shell argv/env/pipe → process object 与 stdin Readable → readline events → stdout data 或 stderr diagnostic → stream flush → exitCode 返回父进程；TypeScript 不能验证 env/argv 内容，未解析外部 string 是边界错误。

<a id="section-9-15"></a>
### 9.15 OS 边界与运行环境观察

**结论：** `node:os` 提供宿主快照，不提供业务事实。`os.platform()`、`os.cpus()`、`os.totalmem()`、`os.freemem()` 的值随机器、容器限制和采样时刻变化。

**用途：**

- `os.platform()`：记录运行平台，解释路径和某些系统差异。
- `os.cpus()`：返回逻辑 CPU 信息数组；不代表 event loop 有同等数量线程。
- `os.totalmem()` / `os.freemem()`：系统级内存 byte 值，不等同于当前进程 heap。
- 规划并行 worker 数量时优先考虑 `os.availableParallelism()`，不要仅用 `os.cpus().length`。

**机制证据链：** JavaScript 调用 OS API → Node binding 查询宿主 → 返回数字/对象 snapshot → 应用转换单位或记录诊断。TypeScript 能检查返回类型，不能保证容器视图与物理主机一致。

**与 Chapter 01 的重叠：** Chapter 01 解释进程和退出；本节只把进程/OS 信息用于路径、标准流和 I/O 诊断，不重复事件循环基础。

<a id="section-9-16"></a>
### 9.16 CommonJS 加载与 require cache

**结论：** CommonJS 用 `require()` 同步解析、加载、执行并缓存模块。相同 resolved filename 通常返回同一 `module.exports` 对象。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/02-core-io/05-modules/cjs-cache-demo.cjs</span>
  </div>

```cjs
let loadCount = 0;
loadCount += 1;

module.exports = {
  loadCount,
  state: { requests: 0 },
};

if (require.main === module) {
  const first = require(__filename);
  const second = require(__filename);
  first.state.requests += 1;

  console.log(first === second);
  console.log(second.state.requests);
  console.log(second.loadCount);
}
```
</div>

**逐行与预期：** 主模块先执行并进入 cache；两个 require 命中同一 resolved filename，输出 true、1、1。共享 state 是缓存对象的可变属性，不是每次 require 的新实例。

**module.exports / exports：** `exports` 初始只是 `module.exports` 的 alias。`exports.name = value` 修改同一对象；`exports = newObject` 只重绑定局部变量，不改变实际导出。替换整体必须写 `module.exports = newObject`。

**边界：** cache key 基于解析文件名；不同解析结果、大小写路径或 cache 手动修改会改变结论。要重复执行逻辑，应导出函数，不应把删除 cache 当正常应用结构。

**机制证据链：** `require(specifier)` → CommonJS resolver 得到 filename → cache lookup/create unfinished module → wrapper evaluation 设置 `module.exports` → cache 返回同一对象；`exports = value` 只重绑定局部 alias，输出缺失可直接识别该规则错误。

<a id="section-9-17"></a>
### 9.17 ESM import/export 与 live binding

**结论：** ESM 在执行前解析和链接模块图；named import 是 exporter binding 的只读 live view，不是 destructuring copy。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/02-core-io/05-modules/esm-live-binding-demo.mjs</span>
  </div>

```mjs
import { count, increment } from './counter.mjs';

console.log(count);
increment();
console.log(count);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/02-core-io/05-modules/counter.mjs</span>
  </div>

```mjs
export let count = 0;

export function increment() {
  count += 1;
}
```
</div>

**执行与预期：** loader 解析相对 specifier（ESM 相对导入要求明确扩展名）→ 建立 count binding → 先评估 counter → importer 输出 0 → exporter 函数更新 binding → importer 再读得到 1。

**规则：** importer 不能给 `count` 重新赋值；可变的是 exporter 自己的 binding。TypeScript 类型不实现 live binding，它只描述静态关系。

**CJS interop 当前边界：** ESM 导入 CJS 时 default 通常对应 `module.exports`，named export 检测具有静态分析边界；CJS 可用 dynamic `import()` 加载 ESM。当前 Node 还允许 `require()` 加载完全同步、没有 top-level await 的 ESM；Node 20.17/22.0 引入该路径，20.19/22.12 后无需实验 flag，v25.4.0 文档标记不再 experimental。含 top-level await 的图会抛 `ERR_REQUIRE_ASYNC_MODULE`，应改用 `import()`。

**机制证据链：** static import → ESM URL resolution → parse/link module graph → create live bindings → evaluate exporter → importer 读取当前 binding；给 import 重新赋值违反只读 binding 规则，TLA graph 由 require 触发时则在同步性检查抛错。

<a id="section-9-18"></a>
### 9.18 package.json type、main、exports 与包边界

**结论：** 最近的 `package.json` 建立 package scope。`type` 决定 `.js` 的 module format；`main` 定义传统主入口；`exports` 定义公开入口、条件分支和封装边界，并在支持的 Node 中优先于 main。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/02-core-io/05-modules/package-exports-demo/package.json</span>
  </div>

```json
{
  "name": "package-exports-demo",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./parser": "./dist/parser.js"
  }
}
```
</div>

**逐项解释：** type 让 scope 内 `.js` 成为 ESM；`.mjs` 始终 ESM、`.cjs` 始终 CJS。main 是旧主入口。exports 的 `"."` 是包根；import/require conditions 选择入口；只有声明的 `./parser` 可被外部深层导入。

**解析链：** bare specifier → node_modules/package self-reference → package scope → exports condition → target URL/path → format determination → load/cache/evaluate。

**错误与真实项目：** 发布前加 exports 会使未公开 deep import 抛 `ERR_PACKAGE_PATH_NOT_EXPORTED`。这正是封装效果，也可能是 breaking change。Node resolution、TypeScript `NodeNext` resolution 和 bundler resolution 必须分别验证。

**机制证据链：** bare specifier → 查找 package scope → 读取 type/main/exports → 按 import/require condition 选择 target → format loader/cache/evaluate；未导出 subpath 在 resolution 阶段失败，TypeScript 或 bundler 成功不等于 Node runtime 一定成功。

<a id="section-9-19"></a>
### 9.19 CommonJS 与 ESM 的循环依赖

**结论：** CJS 遇到循环 require 时，为避免无限递归会返回尚未执行完成的 exports；ESM 先链接 live bindings，但在 binding 初始化前读取可能进入 temporal dead zone 并抛 `ReferenceError`。

**CJS 示例结构：** `circular-dependency-cjs.cjs` 加载 `circular-a.cjs`，A 加载 B，B 再 require A。B 此时只能看到 A 已经写入 `exports` 的部分状态。

**机制证据链：** main require A → cache 放入 unfinished module → A require B → B require A 命中 unfinished cache → B 观察 partial exports → B 完成 → A 完成 → main 得到最终对象。

**错误规则：** 循环中的顶层初始化顺序不再由单个文件局部阅读决定。ESM 也不会“自动修好业务循环”；live binding 解决更新可见性，不保证任意时刻都已初始化。

**修复策略：** 把共享常量/纯函数移到第三个无反向依赖模块；把需要两边都完成的动作延后到函数调用；用依赖方向图识别环，而不是依赖偶然的日志顺序。

<a id="section-9-20"></a>
### 9.20 本章集成：large-file-log-processor

**结论：** 综合项目把 Path、File System、Buffer、StringDecoder、Transform、pipeline、EventEmitter lifecycle 和原子替换放在一条可观察链中，但不替代前面 19 节。

**核心链：** argv string → `path.resolve()` → `createReadStream()`/descriptor → Buffer chunks → LineSplitter 处理跨 chunk 文本 → LogSummaryTransform 累积计数 → `createWriteStream()`/backpressure → finish/close → `rename()` 发布 summary。

**项目约束：** 不加载整个日志；不引入 HTTP、Express 或数据库；无第三方依赖；错误时删除临时文件并保留非零 exit code。

**机制证据链：** CLI path → fs descriptors → Buffer chunks → StringDecoder/remainder → line objects → summary counters → Writable temp file/backpressure → close/rename → JSON result；任一段 error 使 pipeline reject 并触发 temp cleanup。

**最终记忆模型：** 大文件处理的正确问题不是“怎样把文件读成 string”，而是“怎样限定内存、保留记录边界、传播错误并完成资源关闭”。

<a id="api-index"></a>
## 10. API 与规则索引

| API / 规则 | 返回/行为 | 关键边界 |
| --- | --- | --- |
| `Buffer.from(value[, encoding])` | 从值构造 Buffer | string 需要 encoding；Buffer input 会复制 |
| `Buffer.alloc(size)` | 零填充 Buffer | 安全默认 |
| `Buffer.allocUnsafe(size)` | 未初始化 Buffer | 使用前全覆盖 |
| `buf.subarray(start, end)` | 共享视图 | 修改影响源 |
| `Buffer.from(view)` | 复制 view bytes | 新 backing storage |
| `Readable` / `Writable` | 单向数据接口 | chunk + lifecycle |
| `Duplex` / `Transform` | 双向/转换 | 两侧缓冲可不同 |
| `readable.pipe(writable)` | 建立流控连接 | 单段错误仍需理解 |
| `pipeline(...)` | Promise/callback 完成点 | backpressure、error、destroy |
| `writable.write(chunk)` | boolean | false 后等待 drain |
| `highWaterMark` | 缓冲阈值 | byte/object/string 单位不同 |
| `fs.readFile()` | 整体 Buffer/string | 峰值内存随文件 |
| `fs.createReadStream()` | ReadStream | descriptor/open/close |
| `fs/promises.open()` | FileHandle | finally close |
| `fs.rename()` | 改名/替换 | filesystem/platform 语义 |
| `path.join()` | 组合规范化 | 不保证绝对路径 |
| `path.resolve()` | 绝对路径 | 不保证存在/安全 |
| `path.dirname/basename/extname` | 分解路径 | 平台格式 |
| `path.posix/win32` | 显式路径实现 | 与实际 OS 分离 |
| `emitter.on/once/off/emit` | listener 管理/同步调用 | function identity |
| `process.stdin/stdout/stderr` | Stream | shell/TTY 语义 |
| `process.argv/env/cwd/exitCode` | 进程上下文 | 外部输入需验证 |
| `os.platform/cpus/totalmem/freemem` | OS snapshot | 不等于进程指标 |
| `require()` / `module.exports` | CJS 加载/导出 | 同步、cache |
| `import` / `export` | ESM link/evaluate | live binding、URL resolution |
| `package.json#type` | `.js` format | 最近 package scope |
| `main` / `exports` | 包入口 | exports 优先并封装 |
| `fileURLToPath/pathToFileURL` | URL/path 转换 | 不手动裁剪 file URL |

<a id="error-table"></a>
## 11. 常见错误对照表

| 症状 | 违反的规则 | 机制原因 | 修正 |
| --- | --- | --- | --- |
| Buffer 修改“传播”到源 | 把 view 当 copy | 共享 backing store | `Buffer.from(view)` |
| unsafe Buffer 输出旧数据 | 使用前未覆盖 | 未初始化 bytes | `alloc()` 或完整 fill |
| 中文被截断/乱码 | 把 chunk 当字符边界 | UTF-8 字符跨 chunk | `StringDecoder` |
| 内存随大文件增长 | 累积全部 chunk | 应用重新整体缓冲 | 增量 Transform |
| writable queue 失控 | 忽略 `write() === false` | 下游来不及消费 | 等 `'drain'`/用 pipeline |
| FileHandle 泄漏 | 忘记 close | descriptor 保持打开 | `try/finally` |
| sync fs 卡住服务 | 主线程同步等待 | event loop 无法推进 | callback/Promise/Stream |
| Windows 路径失败 | 手拼 separator | 平台语义不同 | `node:path` |
| 进程因 emitter 退出 | 无 `'error'` listener | error 特殊处理 | 注册并传播 error |
| listener warning | 重复注册未释放 | function 引用累积 | 明确 owner/cleanup |
| `exports = value` 无效 | 误解 alias | 只重绑定局部变量 | `module.exports = value` |
| ESM 导入路径失败 | 省略相对扩展名 | URL-like ESM resolution | 写完整扩展名 |
| require ESM 报 async error | 模块图含 TLA | require 只加载同步 ESM | dynamic `import()` |
| deep import 被拒绝 | 路径未在 exports | 包封装边界 | 使用公开 subpath |
| 循环依赖值未初始化 | 顶层图形成环 | partial export/TDZ | 拆依赖或延后读取 |

<a id="debugging"></a>
## 12. 调试与验证方法

面对 Core I/O 问题时，按下面的顺序缩小范围：

1. **确认输入表示**：当前值是 string、Buffer、Uint8Array、chunk、line object 还是 module specifier。
2. **确认负责层**：区分 JavaScript 语义、Node API、Stream 状态、模块加载器与操作系统资源。
3. **确认资源所有者**：谁创建并负责关闭 descriptor、Stream、listener、temporary file 或 module record。
4. **确认生命周期终点**：读取看 `end`，写入看 `finish`，资源释放看 `close`，pipeline 看 Promise settle，模块看 link/evaluate。
5. **建立最小对照**：共享 view 对比 copy、`readFile()` 对比 ReadStream、手动 `data` 对比 `pipeline()`、CJS cache 对比 ESM live binding。

| 症状 | 优先观察 | 诊断方向 |
| --- | --- | --- |
| 乱码或 JSON 解析失败 | chunk 边界、encoding、StringDecoder remainder | 字符或记录跨 chunk |
| 内存持续增长 | 是否累积 chunk/record、`write()` 返回值 | 应用绕过 backpressure 或重新整体缓冲 |
| 进程不退出 | open handle、Stream、listener、timer | 资源没有到达 close/cleanup |
| 输出文件半截 | pipeline rejection、temporary file、rename 时机 | 目标文件过早暴露 |
| ESM/CJS 加载异常 | 扩展名、最近 `package.json`、`exports` condition | 模块格式或 package 边界判断错误 |

验证时不要只检查“有输出”。还要检查错误是否到达唯一处理点、资源是否关闭、输出是否完整，以及同一机制在反例中是否产生可解释的不同结果。

<a id="practice-guide"></a>
## 13. 分项练习说明

推荐按以下顺序完成并记录观察：

1. `01-buffer/`：比较安全分配、未初始化分配、encoding、共享 view 与独立 copy。
2. `02-stream/`：分别观察 Readable、Writable、Transform，再用 `pipeline-backpressure-demo.js` 串联错误、终止和流控。
3. `03-file-system/`：比较整体读取与增量读取，用 `try/finally` 检查 FileHandle 关闭，再分析 temporary file + `rename()` 的边界。
4. `04-events/`：记录 listener 的同步调用顺序，并把 `'error'` 事件的预期非零退出与普通事件对照。
5. `05-modules/`：分别运行 CommonJS cache、ESM live binding、循环依赖和 package `exports` consumer。

每项练习至少回答四个问题：

- 什么输入或命令触发了行为？
- 哪个 Node API 创建或读取了哪些对象与资源？
- 状态如何从 open/queued/link 变化到 finish/close/evaluated？
- 输出或错误证明了哪条规则，反例又违反了什么契约？

<a id="mini-project"></a>
## 14. 最终迷你项目

最终小项目只用于整合本章机制，不替代前面的分节教学。

<a id="project-goal"></a>
### 14.1 项目目标与适配性

`large-file-log-processor` 逐行读取 NDJSON 日志，统计 status code、慢请求、错误数和 error rate，并通过临时文件输出 JSON summary。它适合本章，因为数据规模、chunk 边界、背压、descriptor 生命周期与错误清理都能直接观察。

<a id="project-structure"></a>
### 14.2 最终小项目结构

项目由入口、两个 Transform、样例生成器和输入/输出目录组成：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/large-file-log-processor/</span>
  </div>

```txt
large-file-log-processor/
  package.json
  src/
    generate-sample-log.mjs
    line-splitter.mjs
    log-summary-transform.mjs
    index.mjs
  data/
  output/
```
</div>

| 文件 | 职责 |
| --- | --- |
| `generate-sample-log.mjs` | 用 Writable backpressure 生成确定性 NDJSON |
| `line-splitter.mjs` | 用 StringDecoder 把任意 Buffer chunk 恢复为完整行 |
| `log-summary-transform.mjs` | 解析记录并输出一次 summary JSON |
| `index.mjs` | 解析 argv/path、建立 pipeline、临时写入、rename 与错误清理 |

<a id="project-code"></a>
### 14.3 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/large-file-log-processor/package.json</span>
  </div>

```json
{
  "name": "large-file-log-processor",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "generate": "node src/generate-sample-log.mjs",
    "start": "node src/index.mjs"
  }
}
```
</div>

package scope 明确 `.js` 为 ESM；项目本身使用 `.mjs`，即使移动到其他 scope 也保持 ESM。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/large-file-log-processor/src/generate-sample-log.mjs</span>
  </div>

```mjs
import { once } from 'node:events';
import { mkdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';

const recordCount = Number.parseInt(process.argv[2] ?? '10000', 10);
const outputPath = path.resolve(process.argv[3] ?? 'data/application.ndjson');

if (!Number.isInteger(recordCount) || recordCount < 1) {
  throw new RangeError('Record count must be a positive integer');
}

await mkdir(path.dirname(outputPath), { recursive: true });

const output = createWriteStream(outputPath, { encoding: 'utf8' });
const statuses = [200, 200, 201, 404, 500];

for (let index = 0; index < recordCount; index += 1) {
  const record = {
    method: index % 3 === 0 ? 'POST' : 'GET',
    path: `/api/items/${index % 100}`,
    status: statuses[index % statuses.length],
    durationMs: (index * 37) % 1000,
  };

  const canContinue = output.write(`${JSON.stringify(record)}\n`);
  if (!canContinue) {
    await once(output, 'drain');
  }
}

output.end();
await once(output, 'finish');
console.log(`Generated ${recordCount} records at ${outputPath}`);
```
</div>

**逐行/执行：** argv 字符串先验证；mkdir 创建父目录；WriteStream 接收 NDJSON line；`write()` false 时等待 drain，避免 generator 无限快地填充内存；end 后等 finish。status 和 duration 公式让输出可复现。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/large-file-log-processor/src/line-splitter.mjs</span>
  </div>

```mjs
import { StringDecoder } from 'node:string_decoder';
import { Transform } from 'node:stream';

export class LineSplitter extends Transform {
  #decoder = new StringDecoder('utf8');
  #remainder = '';

  constructor() {
    super({ readableObjectMode: true });
  }

  _transform(chunk, encoding, callback) {
    const text = this.#remainder + this.#decoder.write(chunk);
    const lines = text.split(/\r?\n/);
    this.#remainder = lines.pop() ?? '';

    for (const line of lines) {
      if (line.length > 0) {
        this.push(line);
      }
    }

    callback();
  }

  _flush(callback) {
    const finalLine = this.#remainder + this.#decoder.end();
    if (finalLine.length > 0) {
      this.push(finalLine);
    }
    callback();
  }
}
```
</div>

**逐行/执行：** StringDecoder 保留不完整 UTF-8 bytes；remainder 保留不完整行；split 后最后一项不能立即交付；readableObjectMode 让下游 highWaterMark 按 line object 计数；flush 处理 EOF 尾部。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/large-file-log-processor/src/log-summary-transform.mjs</span>
  </div>

```mjs
import { Transform } from 'node:stream';

export class LogSummaryTransform extends Transform {
  #summary;

  constructor({ slowThresholdMs }) {
    super({ writableObjectMode: true });
    this.#summary = {
      totalRecords: 0,
      statusCodes: {},
      slowRequests: 0,
      errorRequests: 0,
      errorRate: 0,
      slowThresholdMs,
    };
  }

  _transform(line, encoding, callback) {
    try {
      const record = JSON.parse(line);
      const statusKey = String(record.status);

      this.#summary.totalRecords += 1;
      this.#summary.statusCodes[statusKey] =
        (this.#summary.statusCodes[statusKey] ?? 0) + 1;

      if (record.durationMs > this.#summary.slowThresholdMs) {
        this.#summary.slowRequests += 1;
      }

      if (record.status >= 500) {
        this.#summary.errorRequests += 1;
      }

      callback();
    } catch (error) {
      callback(new Error(`Invalid log record: ${error.message}`));
    }
  }

  _flush(callback) {
    const { totalRecords, errorRequests } = this.#summary;
    this.#summary.errorRate =
      totalRecords === 0 ? 0 : errorRequests / totalRecords;
    this.push(`${JSON.stringify(this.#summary, null, 2)}\n`);
    callback();
  }
}
```
</div>

**逐行/执行：** writable side 接受完整 line；JSON.parse 建立 record；私有 summary 只保留计数而不保留所有记录；错误通过 callback(error) 进入 pipeline；flush 计算 rate 并只输出一个 JSON chunk。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/large-file-log-processor/src/index.mjs</span>
  </div>

```mjs
import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

import { LineSplitter } from './line-splitter.mjs';
import { LogSummaryTransform } from './log-summary-transform.mjs';

const inputPath = path.resolve(process.argv[2] ?? 'data/application.ndjson');
const outputPath = path.resolve(process.argv[3] ?? 'output/summary.json');
const slowThresholdMs = Number.parseInt(process.argv[4] ?? '500', 10);

if (!Number.isInteger(slowThresholdMs) || slowThresholdMs < 0) {
  throw new RangeError('Slow threshold must be a non-negative integer');
}

await mkdir(path.dirname(outputPath), { recursive: true });
const temporaryPath = `${outputPath}.${process.pid}.tmp`;

try {
  await pipeline(
    createReadStream(inputPath),
    new LineSplitter(),
    new LogSummaryTransform({ slowThresholdMs }),
    createWriteStream(temporaryPath, { encoding: 'utf8' }),
  );

  await rename(temporaryPath, outputPath);
  console.log(`Processed ${inputPath}`);
  console.log(`Wrote ${outputPath}`);
} catch (error) {
  await rm(temporaryPath, { force: true });
  console.error(error);
  process.exitCode = 1;
}
```
</div>

**逐行/执行：** path.resolve 把 CLI 输入绑定到 cwd；mkdir 只创建输出目录；temporaryPath 位于目标旁边；pipeline 完成意味着各段成功终止；只有完成后 rename 发布 summary；catch 删除残留临时文件并自然失败。

<a id="project-run"></a>
### 14.4 生成样例与运行

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run generate -- 10000 data/application.ndjson
npm start -- data/application.ndjson output/summary.json 500
```
</div>

<a id="project-output"></a>
### 14.5 预期输出

终端输出绝对路径会因机器不同而变化。summary 的确定性内容如下：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```json
{
  "totalRecords": 10000,
  "statusCodes": {
    "200": 4000,
    "201": 2000,
    "404": 2000,
    "500": 2000
  },
  "slowRequests": 4990,
  "errorRequests": 2000,
  "errorRate": 0.2,
  "slowThresholdMs": 500
}
```
</div>

`durationMs` 均匀遍历 0–999 十次，规则是 `> 500`，所以 501–999 共 499 个值，每个出现十次。

<a id="project-lifecycle"></a>
### 14.6 执行、资源与 backpressure

- **Buffer**：ReadStream 从文件产生 Buffer chunk；StringDecoder 跨 chunk 保留不完整 UTF-8 bytes。
- **Stream**：四段 pipeline 以 byte → line object → summary bytes 转换。
- **File System**：读 descriptor 与临时写 descriptor 在 pipeline 结束/失败时销毁关闭，之后 rename。
- **Path**：输入输出基于 cwd 解析，临时文件与目标处于同一目录。
- **EventEmitter**：Stream 内部依赖 data/readable、drain、error、finish、close 等状态；pipeline 统一观察并传播。
- **backpressure**：每一段只在下游容量允许时继续；generator 还显式等待 drain。
- **内存上界**：聚合器只保留计数和状态映射，不保留 10,000 条 record。

<a id="project-errors"></a>
### 14.7 常见错误与生产连接

- JSON 行损坏：Transform callback(error) 使 pipeline reject，删除 temp，旧 summary 不被半写覆盖。
- 忘记 StringDecoder：多字节字符跨 chunk 时出现替换字符或解析失败。
- 把 lines 全部 push 到数组：重新制造 O(file size) 内存。
- 直接写目标：失败时留下截断 JSON；临时文件 + rename 缩小可见半成品窗口。
- 忽略 stream error：进程可能退出或留下 descriptor。
- 生产扩展：日志采集、ETL、备份/压缩、对象存储上传都使用同样的字节—流控—资源关闭模型；HTTP request/response 也是 Stream，但详细 HTTP 放到 Chapter 03。

<a id="cheatsheet"></a>
## 15. 速查表使用方式

`nodejs-chapter-02-core-io-cheatsheet.md` 用于复习 Buffer、encoding、Stream、backpressure、File System、Path、Events、CommonJS、ESM 和 package 边界。使用速查表时，不只记 API 名，还要能指出：

1. 当前值是字节、字符、chunk、record 还是 module binding。
2. 谁拥有 backing store、descriptor、listener 或 module record。
3. 哪个状态表示完成或失败。
4. 反例违反了哪条运行时契约。

<a id="interview"></a>
## 16. 面试题使用方式

`nodejs-chapter-02-core-io-interview-questions.md` 按主题提供问题和机制级参考答案。回答时采用“结论—负责层—生命周期—证据”四步：

1. 先给出不超过两句的结论。
2. 指出 JavaScript、Node API、Stream、模块系统或 OS 中的负责层。
3. 追踪关键对象、资源与状态转换。
4. 用本章练习或迷你项目中的可观察结果证明结论。

<a id="final-model"></a>
## 17. 最终心智模型

`输入位置 → 打开 OS 资源 → Buffer chunk → Stream flow/backpressure → Transform 状态 → Writable queue → finish/close → 发布结果`

模块代码在这条链之前经历：

`specifier → package scope/type/exports → CJS 或 ESM loader → cache/module map → link/evaluate → exports/live bindings`

遇到问题时按四问定位：

1. 当前值是字符、字节、chunk、record 还是 module binding？
2. 谁拥有底层内存、descriptor、listener 或 module record？
3. 哪个状态表示完成：end、finish、close、Promise settle 还是 module evaluated？
4. 错误是否能沿 pipeline/listener/import graph 到达唯一处理点？

转换为个人笔记时，保留负责层、触发值、资源状态、输出原因、反例、版本边界和官方链接；不要把机制链压缩成 API 名单。

<a id="official-sources"></a>
## 18. 官方资料

- [Node.js Buffer API](https://nodejs.org/api/buffer.html)
- [Node.js Stream API](https://nodejs.org/api/stream.html)
- [Node.js Learn: How To Use Streams](https://nodejs.org/learn/modules/how-to-use-streams)
- [Node.js Learn: Backpressuring in Streams](https://nodejs.org/learn/modules/backpressuring-in-streams)
- [Node.js File System API](https://nodejs.org/api/fs.html)
- [Node.js Path API](https://nodejs.org/api/path.html)
- [Node.js Events API](https://nodejs.org/api/events.html)
- [Node.js Process API](https://nodejs.org/api/process.html)
- [Node.js OS API](https://nodejs.org/api/os.html)
- [Node.js CommonJS Modules](https://nodejs.org/api/modules.html)
- [Node.js ECMAScript Modules](https://nodejs.org/api/esm.html)
- [Node.js Packages](https://nodejs.org/api/packages.html)
- [Node.js URL API](https://nodejs.org/api/url.html)
- [MDN import declaration and live bindings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [MDN export declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
