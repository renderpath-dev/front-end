# Node.js 第 1 章：运行时基础与服务器端 JavaScript 第一性原理

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

## 目录

- [0. 章前定位](#chapter-position)
- [1. 学习目标](#learning-objectives)
- [2. 前置知识](#prerequisites)
- [3. 环境与运行基线](#environment-baseline)
- [4. 第一性原理：语言、引擎、运行时与框架](#first-principles)
- [5. 宿主环境边界](#host-boundary)
- [6. Node.js 运行时架构图](#runtime-architecture)
- [7. 核心术语](#core-terms)
- [8. 本章实践路线](#practice-route)
- [9. 核心教学](#core-teaching)
  - [9.1 Node.js 到底是什么](#9-1-nodejs-definition)
  - [9.2 Browser 与 Node.js 运行时边界](#9-2-runtime-boundary)
  - [9.3 V8：JavaScript 执行层](#9-3-v8)
  - [9.4 libuv：异步 I/O 与跨平台抽象](#9-4-libuv)
  - [9.5 事件循环第一模型](#9-5-event-loop)
  - [9.6 timer、setImmediate、Promise 与 nextTick](#9-6-scheduling)
  - [9.7 阻塞与非阻塞](#9-7-blocking)
  - [9.8 进程生命周期](#9-8-process-lifecycle)
  - [9.9 运行时观测](#9-9-observation)
  - [9.10 runtime-lab-cli 综合实验](#9-10-runtime-lab)
- [10. API 与规则索引](#api-index)
- [11. 常见错误对照表](#error-table)
- [12. 调试与验证方法](#debugging)
- [13. 分项练习说明](#practice-guide)
- [14. 最终迷你项目](#mini-project)
- [15. 速查表使用方式](#cheatsheet)
- [16. 面试题使用方式](#interview)
- [17. 最终心智模型](#final-model)
- [18. 官方资料、来源审计与自检](#sources)

## 本章代码定位索引

| 学习目标 | 文件 | 可观察证据 |
|---|---|---|
| 比较宿主全局对象 | `practices/01-runtime/01-runtime-boundary/browser-vs-node-runtime.js` | `typeof window`、`typeof document`、`typeof process` |
| 访问 Node 核心 API | `practices/01-runtime/01-runtime-boundary/node-core-api-access.js` | `process`、`os`、`fs` 的真实返回值 |
| 比较 timers 与 check | `practices/01-runtime/02-event-loop/timer-immediate-order.js` | 顶层顺序可变，I/O 回调内的阶段关系可观察 |
| 比较 nextTick 与 Promise | `practices/01-runtime/02-event-loop/promise-nexttick-order.js` | 同步、nextTick、Promise、immediate 的输出顺序 |
| 制造事件循环阻塞 | `practices/01-runtime/02-event-loop/blocking-loop-server.js` | 350 ms 忙循环使 20 ms timer 明显延迟 |
| 对照异步 I/O | `practices/01-runtime/02-event-loop/async-io-server.js` | 慢 I/O 等待期间仍可完成快速请求 |
| 读取参数与环境 | `practices/01-runtime/03-process-lifecycle/process-argv-env.js` | `argv` 位置和 `env` 默认值 |
| 设置自然退出码 | `practices/01-runtime/03-process-lifecycle/process-exit-code.js` | 标准输出完成后得到退出状态 |
| 处理终止信号 | `practices/01-runtime/03-process-lifecycle/signal-graceful-exit.js` | 信号、清理、自然退出 |
| 综合运行时实验 | `mini-projects/runtime-lab-cli/src/index.js` | 运行时快照、阻塞/异步耗时和事件循环延迟 |

> 本章所有项目相对路径均以 `D:\node.js` 为根。

<a id="chapter-position"></a>
## 0. 章前定位

本章回答的不是“怎样调用某个 Node.js API”，而是“为什么 Node.js 能运行服务器端 JavaScript，以及一次调用从 JavaScript 到操作系统再返回回调经历了什么”。后续学习模块系统、文件系统、HTTP、数据库或测试运行器时，都应回到本章的运行时边界。

本章不把下列简化说法当作结论：

- “Node.js 是后端语言”：语言是 JavaScript，Node.js 是宿主运行时。
- “Node.js 是单线程”：通常指用户 JavaScript 回调在一个事件循环线程上执行，不代表进程只有一个线程。
- “异步就是线程池”：网络 I/O、文件 I/O、微任务和用户 JavaScript 的机制不同。
- “零毫秒计时器会立即执行”：阈值到期只产生调度资格，不产生执行保证。

<a id="learning-objectives"></a>
## 1. 学习目标

完成本章后，你应能：

1. 分离 ECMAScript 语言、V8、Node 核心 API、libuv 和操作系统的职责。
2. 用具体全局对象证明 Browser 与 Node.js 是不同宿主。
3. 解释同步调用栈、nextTick 队列、V8 微任务和事件循环阶段的关系。
4. 通过可运行实验证明 CPU 阻塞如何推高计时器和请求延迟。
5. 正确读取 `process.argv`、`process.env`，并区分自然退出与强制退出。
6. 使用 `performance.now()` 和 `monitorEventLoopDelay()` 建立可验证的性能证据。
7. 明确 TypeScript 只能约束静态类型，不能改变 Node.js 运行时调度。

<a id="prerequisites"></a>
## 2. 前置知识

- 会运行 `.js` 文件，理解变量、函数、对象、数组和异常。
- 知道同步函数会在返回前占用当前调用栈。
- 了解 Promise 的基本使用，但不要求先掌握事件循环阶段。
- 能在 PowerShell 中切换目录并查看进程退出码。

<a id="environment-baseline"></a>
## 3. 环境与运行基线

本章示例使用 CommonJS，以便把模块格式差异从运行时基础中暂时隔离。迷你项目在自己的 `package.json` 中明确声明 `"type": "commonjs"`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```powershell
node --version
node practices/01-runtime/01-runtime-boundary/browser-vs-node-runtime.js
```
</div>

建议使用仍受支持且包含 `os.availableParallelism()`、`node:timers/promises` 与 `monitorEventLoopDelay()` 的现代 Node.js 版本。本章不把机器相关的版本号、PID、主机名、内存和精确延迟作为固定输出。

<a id="first-principles"></a>
## 4. 第一性原理：语言、引擎、运行时与框架

| 层级 | 回答的问题 | 本章实例 |
|---|---|---|
| JavaScript 语言 | 哪些语法和语义成立 | 对象、函数、Promise、异常 |
| JavaScript 引擎 | JavaScript 如何被解析和执行 | V8 |
| 宿主运行时 | 程序可访问哪些外部能力 | Node.js |
| 异步与系统抽象 | 如何等待 I/O 并重新调度回调 | libuv、OS |
| 框架/库 | 如何组合能力解决应用问题 | 本章不引入 |

第一性原理判断法：看到一个名字时先问“它由 ECMAScript 定义、由 V8 实现、由 Node 暴露，还是由操作系统完成？”例如 `Promise` 属于语言能力，`process.nextTick()` 属于 Node API，文件读取由 Node 绑定到 libuv/OS，而文件数据最终来自操作系统资源。

<a id="host-boundary"></a>
## 5. 宿主环境边界

Browser 和 Node.js 都可以执行 JavaScript，但不是同一个能力集合。`globalThis` 是跨宿主的标准入口；`window`、DOM 来自浏览器；`process`、`Buffer` 和 `node:*` 模块来自 Node.js。不能因为语法相同，就假设平台 API 相同。

判断一个示例能否迁移时，依次检查：

1. 是否只使用 ECMAScript 语言能力？
2. 是否依赖宿主全局对象？
3. 是否依赖权限、路径、网络或进程生命周期？
4. 是否依赖特定模块加载规则或工具注入？

<a id="runtime-architecture"></a>
## 6. Node.js 运行时架构图

一次典型异步文件读取可以压缩成下列链条：

`JavaScript 调用 → Node 核心 API → 原生绑定 → libuv 请求/线程池或 OS 异步机制 → 完成通知 → 事件循环阶段 → JavaScript 回调`

职责不能互换：

- V8 执行 JavaScript、管理堆和垃圾回收。
- Node 核心层定义 JavaScript 可见的 API 和进程语义。
- libuv 提供事件循环、handle/request 抽象、线程池与跨平台系统封装。
- 操作系统管理文件描述符、socket、时钟、信号和调度。
- 应用代码决定回调做多少工作；长 CPU 任务仍会阻塞 JavaScript 线程。

<a id="core-terms"></a>
## 7. 核心术语

| 术语 | 精确定义 |
|---|---|
| 调用栈 | 当前同步 JavaScript 执行帧的后进先出结构 |
| 回调 | 某个条件满足后由运行时重新调用的函数 |
| job / 微任务 | V8 在检查点清空的 Promise reaction 等任务 |
| nextTick 队列 | Node 特有、在当前操作后优先处理的回调队列 |
| event loop phase | libuv 循环中的一类回调处理阶段 |
| handle | 长生命周期、可保持循环存活的资源抽象，如 timer/server |
| request | 通常表示一次短生命周期操作的抽象 |
| worker pool | libuv 为部分阻塞式系统工作提供的共享线程池 |
| event-loop delay | 回调具备执行条件到 JavaScript 线程真正推进它之间的延迟信号 |
| natural exit | 循环中不再有需要保持进程存活的工作时自然结束 |

<a id="practice-route"></a>
## 8. 本章实践路线

按“边界 → 调度 → 阻塞 → 生命周期 → 观测 → 集成”顺序运行：

1. 用 `typeof` 证明宿主边界。
2. 用 `node:*` 核心模块证明 Node 能力不是 JavaScript 语法。
3. 观察 timer、immediate、nextTick 和 Promise。
4. 对比忙循环服务器与异步 I/O 服务器。
5. 观察参数、环境、退出码和信号。
6. 运行 `runtime-lab-cli`，把运行时信息、任务耗时和事件循环延迟放在一份报告中。

<a id="core-teaching"></a>
## 9. 核心教学

<a id="9-1-nodejs-definition"></a>
### 9.1 Node.js 到底是什么：从 JavaScript 语言到宿主运行时

**结论**

Node.js 是跨平台 JavaScript 运行时。它把 V8 与 Node 核心 API、原生绑定、libuv 和操作系统能力组合起来，使 JavaScript 能在浏览器之外管理文件、网络和进程。

**本节解决的问题**

避免把 Node.js 误认为语言、Web 框架或“只有 V8 的命令行工具”。

**技术意义**

只有分清层级，才能判断错误属于语法、引擎、Node API、操作系统还是应用设计。

**概念解释**

JavaScript 提供表达计算的语言规则；V8 执行这些规则；Node.js 决定宿主对象和生命周期；框架只是在运行时之上组织应用。

**边界标签**

语言：ECMAScript；引擎：V8；平台 API：Node.js；异步/系统抽象：libuv；资源所有者：OS；应用框架：本章无。

**底层机制**

Node 启动进程并初始化 V8 isolate 与事件循环；入口脚本由 V8 执行；对 `node:*` API 的调用通过 Node 原生绑定进入系统层；完成结果再变成 JavaScript 值和回调。

**API / 语法规则**

`require('node:process')` 使用 Node 内置模块命名空间；`process.version` 是 Node 宿主提供的值，不是 ECMAScript 属性。

**固定名称 / 签名**

`require(id)`、`process.version`、`process.platform`、`process.arch`。

**示例结构**

入口文件直接读取 `process`、`os`、`fs`，不引入第三方依赖。

**示例代码**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/01-runtime/01-runtime-boundary/node-core-api-access.js</span>
  </div>

```js
const fs = require('node:fs');
const os = require('node:os');
const process = require('node:process');

console.log('Node version:', process.version);
console.log('Platform:', `${process.platform}/${process.arch}`);
console.log('Available parallelism:', os.availableParallelism());
console.log('Current file exists:', fs.existsSync(__filename));
```
</div>

**逐行解释**

第一至三行从 Node 内置模块取得宿主 API；后续三行分别观察运行时、OS 并行度建议和文件系统资源。

**运行方式**

在本章目录执行 `node practices/01-runtime/01-runtime-boundary/node-core-api-access.js`。

**预期输出**

输出当前版本、平台/架构、可用并行度，以及 `Current file exists: true`；机器相关值不固定。

**执行过程**

V8 执行 `require` 调用，Node 模块加载器解析 `node:` 标识符，内置绑定读取进程/OS 信息并发起同步路径检查，结果回到 JavaScript。

**变量、资源与生命周期变化**

创建三个模块引用和若干字符串；文件检查只产生一次短操作，不创建保持事件循环存活的长期 handle，脚本自然退出。

**为什么得到这个结果**

这些名字由 Node 宿主注册，并能访问浏览器默认不暴露的本地进程和文件能力。

**对照情况**

只运行 `const total = 1 + 2` 依赖语言与引擎；访问 `node:fs` 明确跨入 Node 平台边界。

**常见错误**

把 `fs.existsSync()` 称为“JavaScript 自带函数”，或由结果推断所有 Node I/O 都是同步的。

**真实项目关系**

定位生产故障时，可据此把语法异常、运行时版本差异、权限错误和业务错误分层。

**当前路径关系**

完整证据位于 `practices/01-runtime/01-runtime-boundary/node-core-api-access.js`。

**TypeScript 边界**

`@types/node` 可描述这些 API 的静态形状，但不会创建 API，也不会改变 Node 版本、文件权限或 OS 返回值。

**精确违反的规则**

若在纯浏览器宿主直接调用 `require('node:fs')`，违反的是“宿主必须提供 Node 模块加载器和内置模块”的平台前提，不是 JavaScript 语法规则。

**机制证据链**

触发：执行入口脚本；具体对象：`process` 模块对象、`os`/`fs` 导出和 `__filename` 字符串；Node API：`os.availableParallelism()`、`fs.existsSync()`；边界：V8 执行调用，Node 绑定访问 OS；生命周期：同步读取完成后没有活跃 handle；结果原因：宿主返回真实机器值；TypeScript：只检查形状；违反规则：错误宿主缺少 Node 内置模块；项目识别：看到 `node:`、`process` 或本地资源访问就标记为 Node 边界。

**最终记忆模型**

JavaScript 是语言，V8 是执行器，Node.js 是把语言接到服务器端宿主能力上的运行时。

<a id="9-2-runtime-boundary"></a>
### 9.2 Browser 与 Node.js：相同语言，不同运行时边界

**结论**

Browser 与 Node.js 共享 JavaScript 语言核心，但提供不同全局对象、模块系统、权限模型和生命周期。

**本节解决的问题**

解释为什么浏览器代码中的 `document` 在 Node 中报错，而 Node 代码中的 `process` 在普通网页中不可用。

**技术意义**

依赖宿主能力的代码必须在设计时隔离；“能通过语法检查”不代表“能在目标运行时执行”。

**概念解释**

ECMAScript 不规定 DOM、文件系统或进程对象。宿主把额外对象放进全局环境，并决定外部资源访问能力。

**边界标签**

共享层：ECMAScript 与 `globalThis`；Browser 层：`window`、`document`；Node 层：`process`、`Buffer`、`node:*`。

**底层机制**

V8 创建语言环境后，嵌入方注册宿主对象。Chrome 注册 Web 平台绑定；Node 注册核心模块和进程相关绑定。

**API / 语法规则**

使用 `typeof undeclaredName` 不会抛出 `ReferenceError`，适合探测可选宿主全局；直接读取未声明标识符会抛错。

**固定名称 / 签名**

`typeof value`、`globalThis`、`window`、`document`、`process`。

**示例结构**

一个对象记录三种全局名字的 `typeof` 结果，再输出运行时判断。

**示例代码**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/01-runtime/01-runtime-boundary/browser-vs-node-runtime.js</span>
  </div>

```js
const runtimeObservations = {
  windowType: typeof window,
  documentType: typeof document,
  processType: typeof process,
};

console.log('Runtime observations:', runtimeObservations);
```
</div>

**逐行解释**

对象字面量保存三个探测结果；`typeof` 让缺失的宿主名返回 `"undefined"`；日志把边界变成可检查证据。

**运行方式**

执行 `node practices/01-runtime/01-runtime-boundary/browser-vs-node-runtime.js`。

**预期输出**

Node 中 `windowType` 和 `documentType` 为 `undefined`，`processType` 为 `object`。

**执行过程**

V8 解析 `typeof` 表达式；全局环境解析名字；Node 初始化过的 `process` 可解析，未注册的 Browser 全局得到 `undefined`。

**变量、资源与生命周期变化**

只创建一个普通对象和输出字符串；没有 I/O handle，日志写入完成后进程自然结束。

**为什么得到这个结果**

不是 V8 不理解 DOM 语法，而是 Node 宿主没有默认安装 DOM 对象。

**对照情况**

在浏览器开发者工具中，通常 `typeof window === 'object'` 且 `typeof process === 'undefined'`，但打包器可能注入兼容对象，必须区分真实宿主与工具注入。

**常见错误**

使用 `if (window)` 探测 Node 环境会先触发 `ReferenceError`；应使用 `typeof window !== 'undefined'`。

**真实项目关系**

同构应用、SSR、CLI 与前端共享代码时，应把纯逻辑和宿主适配层分开。

**当前路径关系**

边界探测位于 `practices/01-runtime/01-runtime-boundary/browser-vs-node-runtime.js`，Node 能力探测位于同目录的 `node-core-api-access.js`。

**TypeScript 边界**

`lib.dom.d.ts` 或 Node 类型会影响编辑器是否接受名字，但类型库的存在不能在运行时创建 `window`、DOM 或 `process`。

**精确违反的规则**

直接读取目标宿主未定义的标识符，违反的是运行时标识符解析前提；TypeScript 配置错误则可能让这一问题在编译期被错误掩盖。

**机制证据链**

触发：求值三个 `typeof`；具体值：两个 `"undefined"` 与一个 `"object"`；Node API：全局 `process`；边界：V8 名字解析查询 Node 创建的全局环境，不进入 libuv/OS；生命周期：同步输出后退出；结果原因：宿主注册集合不同；TypeScript：类型库不等于运行时对象；违反规则：直接读取缺失标识符；项目识别：检查全局名、模块前缀和工具 polyfill。

**最终记忆模型**

相同语言只保证语法语义共享，不保证宿主对象和资源权限共享。

<a id="9-3-v8"></a>
### 9.3 V8：JavaScript 执行、对象内存与微任务的边界

**结论**

V8 负责解析、编译和执行 JavaScript，管理对象堆与垃圾回收，并实现 ECMAScript Promise job；它不提供 Node 的文件、HTTP、进程或 libuv 阶段。

**本节解决的问题**

防止把所有 Node 行为都归因于 V8，或把事件循环错误描述成 V8 的完整职责。

**技术意义**

内存增长、优化/反优化、JavaScript 异常与宿主 I/O 延迟需要不同证据。

**概念解释**

V8 isolate 提供独立 JavaScript 堆和执行环境；Node 作为嵌入方向其中暴露函数，并在适当检查点让 V8 处理微任务。

**边界标签**

V8：语言执行、堆、GC、Promise jobs；Node/libuv：宿主 API、nextTick、事件循环、I/O；OS：资源完成。

**底层机制**

源码经解析生成内部表示并由解释器/优化编译器执行；对象分配在受 GC 管理的堆；Promise reaction 进入 V8 微任务队列，由嵌入方调度检查点。

**API / 语法规则**

`Promise.resolve(value).then(handler)` 注册 reaction；handler 不会在当前同步调用栈中执行。

**固定名称 / 签名**

`Promise.resolve(value)`、`promise.then(onFulfilled, onRejected)`、`process.memoryUsage()`。

**示例结构**

同步日志夹住一个 Promise reaction，以输出证明“注册”与“执行”分离。

**示例代码**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: V8 microtask boundary</span>
  </div>

```js
console.log('Synchronous start');
Promise.resolve().then(() => console.log('Promise microtask'));
console.log('Synchronous end');
```
</div>

**逐行解释**

第一行同步执行；第二行创建已兑现 Promise 并排队 reaction；第三行仍在当前调用栈执行；栈清空后的微任务检查点才调用 handler。

**运行方式**

该机制已包含在 `practices/01-runtime/02-event-loop/promise-nexttick-order.js`，运行该文件观察完整对照。

**预期输出**

`Synchronous start`、`Synchronous end` 先出现，Promise 日志之后出现；完整实践中 nextTick 日志会先于 Promise。

**执行过程**

V8 执行同步栈并创建 Promise/job；Node 完成当前操作后先处理 nextTick，再请求 V8 运行微任务检查点。

**变量、资源与生命周期变化**

创建 Promise、reaction 函数和一个微任务 job；没有 OS I/O 资源，job 执行后相关对象可被 GC 回收。

**为什么得到这个结果**

Promise 规范把 reaction 作为 job 调度，而不是在 `.then()` 调用点同步调用。

**对照情况**

普通函数 `handler()` 会立即增加当前调用栈；`setImmediate(handler)` 则进入 Node/libuv 的 check 阶段，不是 V8 微任务。

**常见错误**

把 Promise 回调称为“线程池任务”，或认为 GC 会自动释放仍被 timer/server 引用的资源。

**真实项目关系**

大量微任务可以推迟 I/O；堆对象可回收也不代表 socket、timer 等外部资源已关闭。

**当前路径关系**

调度证据位于 `practices/01-runtime/02-event-loop/promise-nexttick-order.js`；内存快照位于 `mini-projects/runtime-lab-cli/src/runtime-info.js`。

**TypeScript 边界**

TypeScript 可检查 Promise 的泛型值与 handler 返回类型；编译后仍由 V8/Node 决定 job 和检查点时机。

**精确违反的规则**

期待 `.then()` handler 在当前栈同步执行，违反 Promise reaction 必须作为 job 异步执行的语言语义。

**机制证据链**

触发：已兑现 Promise 上调用 `.then()`；具体对象：Promise、reaction 函数、微任务 job；Node API：本例无平台 I/O，完整实验含 `process.nextTick()`；边界：V8 保存 job，Node 安排检查点，libuv/OS 未参与；生命周期：栈清空后 job 执行并可回收；结果原因：job 语义；TypeScript：只检查泛型；违反规则：误期望同步 reaction；项目识别：区分微任务积压、堆增长与 I/O handle 泄漏。

**最终记忆模型**

V8 让 JavaScript 和 Promise job 能执行；Node 决定它们运行在怎样的宿主生命周期中。

<a id="9-4-libuv"></a>
### 9.4 libuv：事件驱动 I/O、handle/request 与跨平台抽象

**结论**

libuv 为 Node 提供事件循环和跨平台异步抽象。网络 I/O 通常依赖 OS 非阻塞轮询；许多文件、DNS 和用户排队工作通过共享线程池，不能笼统地说“所有异步都在线程池”。

**本节解决的问题**

建立从 Node API 到 OS 完成通知的准确链条，并区分 event loop、worker pool 与 JavaScript 线程。

**技术意义**

线程池饱和、网络等待和 JavaScript 回调阻塞的修复手段不同。

**概念解释**

handle 表示可持续活动并可能保持循环存活的资源；request 通常表示一次操作。libuv 在循环中轮询完成事件，再让 Node 调用对应 JavaScript 回调。

**边界标签**

Node JavaScript API → 原生绑定 → libuv handle/request → OS 或 worker pool → 完成队列 → JavaScript callback。

**底层机制**

socket 注册到 IOCP/epoll/kqueue 等平台机制；文件 API 在常见平台上由 worker 执行阻塞系统调用；完成事件回到循环线程后，Node 构造 JavaScript 参数并调用回调。

**API / 语法规则**

`fs.readFile(path, encoding, callback)` 只启动读取并立即返回；callback 接收 error-first 参数。

**固定名称 / 签名**

`fs.readFile(path[, options], callback)`、`http.createServer([options][, requestListener])`、`server.listen(...)`。

**示例结构**

HTTP 服务器的 `/io` 路由异步读取文件并延迟响应；`/fast` 路由在等待期间仍可响应。

**示例代码**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/01-runtime/02-event-loop/async-io-server.js</span>
  </div>

```js
if (request.url === '/io') {
  fs.readFile(__filename, 'utf8', (error, source) => {
    if (error) {
      response.writeHead(500).end('Read failed');
      return;
    }

    setTimeout(() => {
      responseOrder.push('io');
      response.end(`Read ${Buffer.byteLength(source)} bytes`);
    }, 80);
  });
  return;
}
```
</div>

**逐行解释**

路由启动异步读取后立即返回；worker/OS 完成后回调检查错误；timer 模拟额外异步等待；最终结束 response。

**运行方式**

执行 `node practices/01-runtime/02-event-loop/async-io-server.js`；脚本会自己发送 `/io` 与 `/fast` 请求并关闭。

**预期输出**

`Fast request` 通常先完成，随后 `I/O request` 完成，响应顺序数组为 `['fast', 'io']`。

**执行过程**

server handle 接收请求；文件 request 被提交；JavaScript 栈释放；事件循环可处理 `/fast`；文件和 timer 完成后 `/io` response 结束。

**变量、资源与生命周期变化**

创建 server/socket handle、文件 request、timer handle 和两个 response；请求完成后释放，`server.close()` 停止监听，循环变空后退出。

**为什么得到这个结果**

异步等待没有占住 JavaScript 调用栈，所以循环可在资源未完成时处理其他 ready 事件。

**对照情况**

把 `fs.readFile()` 换成 `fs.readFileSync()` 会让 JavaScript 线程等待系统调用完成，期间不能处理 `/fast` 回调。

**常见错误**

把回调式 API 解释成“JavaScript 回调在线程池运行”；worker 可能做底层工作，但 JavaScript 回调回到事件循环线程执行。

**真实项目关系**

观察网络延迟、线程池延迟和回调 CPU 时间，才能找到真正瓶颈。

**当前路径关系**

完整对照在 `practices/01-runtime/02-event-loop/async-io-server.js`，阻塞对照在 `blocking-loop-server.js`。

**TypeScript 边界**

TypeScript 可约束 callback 参数和错误分支；不能保证 OS 完成顺序、线程池容量或请求延迟。

**精确违反的规则**

在异步调用后立即读取“尚未由回调赋值”的结果，违反的是完成值只在 callback/PROMISE settle 后可用的生命周期前提。

**机制证据链**

触发：`/io` 请求调用 `fs.readFile()`；具体资源：server/socket handle、文件 request、callback、timer handle；Node API：`http.createServer()`、`fs.readFile()`；边界：V8 执行调用，Node 绑定提交 libuv，文件工作经 worker/OS，完成回循环；生命周期：创建、等待、ready、callback、response end、server close；结果原因：等待期间栈已释放；TypeScript：只检查签名；违反规则：完成前消费结果；项目识别：区分 callback CPU、worker pool 与网络 poll。

**最终记忆模型**

libuv 负责“等待并通知”，不会替应用执行耗时的 JavaScript 回调。

<a id="9-5-event-loop"></a>
### 9.5 事件循环第一模型：阶段、就绪条件与生命周期

**结论**

事件循环不是一个简单 FIFO 队列，而是一组阶段与队列的推进机制。回调必须同时满足“资源已就绪”和“循环到达可处理位置”。

**本节解决的问题**

解释 timer 到期、I/O 完成和 callback 真正执行之间为什么存在间隔。

**技术意义**

只有使用阶段模型，才能避免用偶然输出推导错误的全局顺序。

**概念解释**

简化阶段包括 timers、pending callbacks、idle/prepare、poll、check 和 close callbacks；Node 还在阶段回调之间处理 nextTick 与 V8 微任务。

**边界标签**

同步栈：V8；nextTick：Node；微任务：V8/Node 检查点；阶段推进：libuv；I/O ready：OS/worker。

**底层机制**

循环检查活跃资源和各阶段队列，在 poll 中等待/收集 I/O，进入 check 处理 immediate，并在回调边界执行 Node/V8 的高优先级队列。

**API / 语法规则**

`setTimeout(callback, delay)` 的 delay 是最小阈值；`setImmediate(callback)` 把 callback 放到 check 阶段。

**固定名称 / 签名**

`setTimeout(callback[, delay[, ...args]])`、`setImmediate(callback[, ...args])`。

**示例结构**

同时在顶层和 I/O 回调中调度 timeout/immediate，比较“无稳定上下文”与“明确阶段上下文”。

**示例代码**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/01-runtime/02-event-loop/timer-immediate-order.js</span>
  </div>

```js
fs.readFile(__filename, () => {
  console.log('I/O callback');

  setTimeout(() => {
    console.log('I/O timeout');
  }, 0);

  setImmediate(() => {
    console.log('I/O immediate');
  });
});
```
</div>

**逐行解释**

文件完成回调发生在 I/O 上下文；其中创建 timer 和 immediate；当前回调结束后循环更早到达 check，因此 immediate 通常先输出。

**运行方式**

多次执行 `node practices/01-runtime/02-event-loop/timer-immediate-order.js`。

**预期输出**

同步 start/end 最先；顶层 timeout 与 immediate 的相对顺序不应写成契约；I/O callback 后通常是 `I/O immediate` 再到 `I/O timeout`。

**执行过程**

顶层注册三个工作源后释放栈；循环按当前状态处理 timer/immediate/I/O；I/O 回调创建的新 immediate 在 check 阶段运行，新 timer 等可用的 timers 时机。

**变量、资源与生命周期变化**

创建 timer handle、immediate callback 和文件 request；每个一次性 callback 执行后解除活跃状态，最终自然退出。

**为什么得到这个结果**

不同 API 对应不同队列/阶段；“到期”不是“抢占当前 JavaScript”。

**对照情况**

若当前回调忙循环 500 ms，所有已就绪任务都要等它返回；阶段不会抢占 JavaScript。

**常见错误**

背诵固定总顺序，或把官方简化图当作每个 Node 版本的逐行实现保证。

**真实项目关系**

延迟任务、I/O 回调和关闭流程需要基于阶段与资源生命周期设计，不能依赖顶层竞速。

**当前路径关系**

阶段观察文件是 `practices/01-runtime/02-event-loop/timer-immediate-order.js`。

**TypeScript 边界**

TypeScript 能检查 callback 类型，不能证明 timer 与 immediate 的运行顺序。

**精确违反的规则**

把 `delay = 0` 解释成同步或精确期限，违反 timer 的“阈值后进入可调度状态”语义。

**机制证据链**

触发：注册 timer、immediate 和文件读取；具体资源：timer handle、check callback、文件 request；Node API：`setTimeout()`、`setImmediate()`、`fs.readFile()`；边界：V8 执行注册，libuv 推进阶段，worker/OS 完成文件；生命周期：registered → ready → callback → inactive；结果原因：阶段位置与当前上下文；TypeScript：无时序保证；违反规则：把阈值当期限；项目识别：记录注册上下文、ready 条件和 callback CPU 时间。

**最终记忆模型**

事件循环只在当前 JavaScript 返回后，从“已经就绪且轮到处理”的任务中继续推进。

<a id="9-6-scheduling"></a>
### 9.6 timer、setImmediate、Promise 与 process.nextTick 的调度边界

**结论**

在本章 CommonJS 上下文中，同步代码先完成，Node 的 nextTick 队列通常先于 V8 Promise 微任务，然后才继续事件循环阶段；递归 nextTick 会饿死 I/O。

**本节解决的问题**

把四种经常被统称为“异步回调”的机制分开。

**技术意义**

优先级队列使用不当会造成饥饿、尾延迟和难以复现的顺序依赖。

**概念解释**

timer/immediate 属于事件循环阶段；Promise reaction 属于 V8 微任务；nextTick 是 Node 特有队列且不属于 libuv 阶段。

**边界标签**

timer：timers；immediate：check；Promise：V8 microtask；nextTick：Node nextTick queue。

**底层机制**

当前 JavaScript 操作结束时，Node 排空 nextTick 并运行微任务检查点；之后 libuv 才能继续阶段推进。回调内部再次排队会扩展当前检查周期。

**API / 语法规则**

`process.nextTick(callback[, ...args])` 不接受 delay；应谨慎用于 API 一致性/错误异步化，而非通用任务队列。

**固定名称 / 签名**

`process.nextTick(callback[, ...args])`、`Promise.resolve(value)`、`setImmediate(callback)`、`setTimeout(callback, delay)`。

**示例结构**

同步日志、一个 Promise、有限递归 nextTick 和一个 immediate 共同构成输出序列。

**示例代码**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/01-runtime/02-event-loop/promise-nexttick-order.js</span>
  </div>

```js
Promise.resolve().then(() => {
  console.log('Promise microtask');
});

let nextTickCount = 0;

function scheduleNextTickBurst() {
  process.nextTick(() => {
    nextTickCount += 1;
    console.log(`nextTick callback ${nextTickCount}`);

    if (nextTickCount < 3) {
      scheduleNextTickBurst();
    }
  });
}

scheduleNextTickBurst();

setImmediate(() => {
  console.log('Immediate callback');
});
```
</div>

**逐行解释**

Promise 注册微任务；nextTick 注册 Node 优先回调；immediate 注册 check 回调。三者均不在注册点同步输出。

**运行方式**

执行 `node practices/01-runtime/02-event-loop/promise-nexttick-order.js`。

**预期输出**

两个同步日志先出现，三个有限递归 nextTick 日志随后出现，再是 Promise，最后是 immediate。

**执行过程**

顶层栈清空；Node 逐个处理 nextTick，递归又添加两个；队列清空后 V8 处理 Promise job；libuv 到 check 阶段调用 immediate。

**变量、资源与生命周期变化**

`nextTickCount` 从 0 变为 3；队列反复增加/减少；Promise job 和 immediate 各消费一次；没有长期资源。

**为什么得到这个结果**

队列所属层级和检查时机不同；优先级来自 Node 调度规则，不是回调注册代码的视觉顺序。

**对照情况**

ESM 顶层求值本身可能处在异步模块 job 中，具体 nextTick/Promise 观察结果可能与 CommonJS 顶层不同；不要跨上下文机械套用。

**常见错误**

无界递归 `process.nextTick()`，让 poll/check 无法推进；或用 nextTick 模拟长任务切片。

**真实项目关系**

库作者应避免用 nextTick 构造隐含优先级；业务任务通常选择更明确的队列、流控或 worker。

**当前路径关系**

完整有限递归实验位于 `practices/01-runtime/02-event-loop/promise-nexttick-order.js`。

**TypeScript 边界**

TypeScript 可检查 callback 参数，但不能阻止逻辑上的队列饥饿，也不改变 CommonJS/ESM 求值上下文。

**精确违反的规则**

无界 nextTick 违反“每个回调必须让出控制权，循环才能处理 I/O”的协作式调度前提。

**机制证据链**

触发：同一顶层操作注册三类 callback；具体任务：nextTick callbacks、Promise job、immediate callback；Node API：`process.nextTick()`、`setImmediate()`；边界：V8 保存微任务，Node 管 nextTick，libuv 管 check；生命周期：queued → drained → callback；结果原因：检查顺序；TypeScript：无公平性保证；违反规则：递归队列不让出；项目识别：查找 nextTick 递归、微任务链和 I/O 饥饿。

**最终记忆模型**

不要问“异步谁先”，要问“它进入哪个队列、检查点何时发生、当前上下文是什么”。

<a id="9-7-blocking"></a>
### 9.7 阻塞与非阻塞：等待时间不等于 JavaScript 占用时间

**结论**

CPU 忙循环会占住 JavaScript 线程并延迟所有回调；异步 I/O 可以耗费较长墙钟时间，却在等待时释放调用栈。

**本节解决的问题**

纠正“用了 callback/Promise 就一定非阻塞”和“耗时长就一定阻塞”的混淆。

**技术意义**

服务器的并发能力取决于每个回调是否快速返回，而不只是 API 表面是否异步。

**概念解释**

阻塞关注事件循环线程能否推进其他工作；耗时关注开始到完成的墙钟时间。二者是不同维度。

**边界标签**

CPU JavaScript：V8/事件循环线程；I/O 等待：OS/worker；完成 callback：重新回到事件循环线程。

**底层机制**

忙循环持续执行机器指令，libuv 无法获得控制权；异步调用提交资源请求后返回，libuv 可继续 poll 并分发其他 callback。

**API / 语法规则**

`performance.now()` 返回单调高精度时间；同步 `while` 不会自动让出；`fs.readFile()` 在 callback 前不提供结果。

**固定名称 / 签名**

`performance.now()`、`fs.readFile(path, callback)`、`setTimeout(callback, delay)`。

**示例结构**

阻塞服务器在 20 ms timer 前执行约 350 ms 忙循环，用实际延迟减去阈值得到额外阻塞。

**示例代码**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/01-runtime/02-event-loop/blocking-loop-server.js</span>
  </div>

```js
setTimeout(() => {
  const actualDelayMs = performance.now() - requestStart;
  console.log(`Timer delay: ${actualDelayMs.toFixed(1)} ms`);
  console.log(
    `Extra delay caused by blocking: ${(actualDelayMs - expectedTimerDelayMs).toFixed(1)} ms`,
  );
  server.close();
}, expectedTimerDelayMs);

blockEventLoop(350);
response.end('Blocking task complete');
```
</div>

**逐行解释**

timer 先注册并预计最早 20 ms 后运行；忙循环随后占用线程约 350 ms；response 也要等循环结束；timer 只能在控制权归还后输出。

**运行方式**

分别执行 `node practices/01-runtime/02-event-loop/blocking-loop-server.js` 和 `node practices/01-runtime/02-event-loop/async-io-server.js`。

**预期输出**

阻塞实验的 timer 延迟接近或超过 350 ms；异步实验中 fast response 在 I/O response 前完成。实际数字受机器负载影响。

**执行过程**

请求 callback 注册 timer → 忙循环占用栈 → timer 已到期但不能执行 → 循环返回 → response/timer 后续推进；异步对照则在等待时释放栈。

**变量、资源与生命周期变化**

阻塞实验的 server 和 timer handle 保持活跃，`requestStart` 到实际 callback 的差值增长；异步实验的文件 request 等待期间 server 仍处理 socket。

**为什么得到这个结果**

Node 不抢占正在执行的 JavaScript；异步系统工作与 JavaScript callback 执行分离。

**对照情况**

把 CPU 工作移到 Worker Threads 可让主事件循环继续，但需要考虑复制/共享数据、worker 生命周期和错误传播；本章只建立判断边界。

**常见错误**

在 `async function` 内写长循环并认为 `async` 关键字会自动并行；没有 `await` 到能让出的异步操作时，它仍同步阻塞。

**真实项目关系**

大 JSON、正则回溯、同步加密/压缩、模板渲染和无界循环都可能提高请求尾延迟。

**当前路径关系**

阻塞证据在 `blocking-loop-server.js`，异步对照在 `async-io-server.js`，综合量化在迷你项目。

**TypeScript 边界**

TypeScript 无法从 `async` 返回类型证明函数不阻塞；必须分析运行时路径并测量。

**精确违反的规则**

长 callback 违反 Node 事件循环的协作式公平性要求：callback 必须尽快返回，其他客户端才能获得执行机会。

**机制证据链**

触发：HTTP `/block` callback 调用忙循环；具体资源：server/socket、timer handle、同步栈；Node API：`http.createServer()`、`setTimeout()`、`performance.now()`；边界：V8 持续执行 CPU 指令，libuv/OS ready 事件等待；生命周期：timer 到期但 callback delayed，栈返回后消费；结果原因：无抢占；TypeScript：`async` 类型不代表非阻塞；违反规则：callback 不让出；项目识别：将 event-loop delay 峰值与 CPU profile/路由对应。

**最终记忆模型**

“异步”描述完成通知方式；“非阻塞”要求 JavaScript 在等待期间确实把控制权还给运行时。

<a id="9-8-process-lifecycle"></a>
### 9.8 进程生命周期：argv、env、退出码、信号与自然退出

**结论**

Node 进程从参数和环境获得启动配置，由活跃资源决定存活，并通过退出码向父进程报告结果；正常路径优先设置 `process.exitCode`，信号处理器必须主动完成清理和退出。

**本节解决的问题**

把“脚本最后一行执行完”与“进程结束”分开，并避免强制退出截断输出。

**技术意义**

CLI、HTTP 服务、容器和进程管理器都依赖稳定的启动、信号与退出契约。

**概念解释**

入口执行结束后，只要仍有被引用的 server/timer/socket，循环就继续；没有活跃工作时自然退出。信号监听器会替代部分默认行为。

**边界标签**

启动输入：shell/父进程；进程对象：Node；信号：OS → Node callback；退出状态：Node → OS/父进程。

**底层机制**

OS 创建进程并传入 argv/env；Node 初始化 `process`；libuv 监视 signal handle；应用清理资源后，循环不再活跃，Node 以 `exitCode` 结束。

**API / 语法规则**

`argv[0]` 是 executable，`argv[1]` 是入口路径；`process.env` 值为字符串或 `undefined`；注册 `SIGINT`/`SIGTERM` 后应用负责结束。

**固定名称 / 签名**

`process.argv`、`process.env`、`process.exitCode`、`process.once(eventName, listener)`、`process.kill(pid, signal)`。

**示例结构**

三个文件分别观察启动输入、自然退出码和幂等信号清理；信号文件提供 `--self-signal`，通过发出 Node `SIGINT` 事件自动验证同一个清理处理器。实际 OS 信号仍需用 Ctrl+C 在目标平台手动验证。

**示例代码**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/01-runtime/03-process-lifecycle/signal-graceful-exit.js</span>
  </div>

```js
function beginGracefulShutdown(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  clearInterval(keepAliveTimer);
  process.exitCode = 0;

  setImmediate(() => {
    console.log('Cleanup complete');
  });
}

process.once('SIGINT', beginGracefulShutdown);
process.once('SIGTERM', beginGracefulShutdown);
```
</div>

**逐行解释**

布尔标记保证清理只执行一次；清除 interval 解除长期资源；设置退出码而非强退；immediate 证明自然退出允许已排队工作完成；两个一次性 listener 接受常见终止信号。

**运行方式**

执行 `node practices/01-runtime/03-process-lifecycle/signal-graceful-exit.js --self-signal` 自动验证处理器；退出码实验执行 `node practices/01-runtime/03-process-lifecycle/process-exit-code.js failure`。去掉参数后按 Ctrl+C，才是实际 OS 信号测试。

**预期输出**

自发信号实验输出 PID、`Received SIGINT` 与 `Cleanup complete` 后结束；失败实验输出错误、清理日志并返回退出码 1。

**执行过程**

interval handle 保持进程活跃；自动模式的 timer 发出 Node 信号事件，手动模式则由 OS/Node 调用 listener；listener 清 interval、设置退出码并排队 immediate；最后一个 callback 完成后循环为空。

**变量、资源与生命周期变化**

`shuttingDown` 从 false 变 true；interval handle 从 active 变 cleared；signal listeners 一次性消费；exitCode 从默认值变 0/1。

**为什么得到这个结果**

注册信号监听器后 Node 不再执行默认终止路径；资源清理使自然退出条件最终成立。

**对照情况**

`process.exit(1)` 会立即终止，即使 stdout/stderr 或异步清理尚未完成；它只适合确实需要强制终止的路径。

**常见错误**

信号处理器只打印日志却不关闭 server/timer，导致进程永久存活；或把环境变量当成可靠数字而不解析验证。

**真实项目关系**

服务部署需要停止接收新请求、等待在途工作、关闭连接并设置有意义的退出码。

**当前路径关系**

完整文件位于 `practices/01-runtime/03-process-lifecycle/`；迷你项目还读取 `RUNTIME_LAB_LABEL`。

**TypeScript 边界**

TypeScript 会把 `process.env.NAME` 表示为 `string | undefined`，但不能验证部署系统实际传值，也不能保证信号在所有平台完全一致。

**精确违反的规则**

注册终止信号 listener 后仍期待 Node 自动退出，违反“自定义 listener 替代默认终止行为，应用必须让活跃资源清空”的生命周期规则。

**机制证据链**

触发：启动参数、环境或 OS signal；具体值/资源：argv 字符串、env 映射、interval/signal handle、exitCode；Node API：`process.argv`、`process.env`、`process.once()`；边界：OS 创建/发信号，Node 映射 callback，libuv 监视资源；生命周期：start → active → signal → cleanup → loop empty → exit；结果原因：活跃 handle 与自定义 listener；TypeScript：只约束可能缺失值；违反规则：清理后仍保留引用；项目识别：检查 server/timer/connection 与退出码。

**最终记忆模型**

进程退出不是“代码读到末尾”，而是“生命周期中的活跃工作清空，并把状态交还给父进程”。

<a id="9-9-observation"></a>
### 9.9 运行时观测：process、os、performance 与事件循环延迟

**结论**

可靠诊断需要同时观察运行时身份、进程资源、任务耗时和事件循环延迟；单个请求耗时不能证明主线程阻塞。

**本节解决的问题**

建立从“感觉程序慢”到“能区分等待、CPU 与事件循环延迟”的最小证据集。

**技术意义**

观测值决定优化方向：等待外部资源、线程池拥塞、内存压力和 callback 阻塞不是同一问题。

**概念解释**

`process` 描述当前进程，`os` 描述宿主，`performance.now()` 测量单次时长，`monitorEventLoopDelay()` 通过计时采样形成延迟直方图。

**边界标签**

进程快照：Node/V8；系统快照：OS；计时器采样：Node/libuv/OS clock；解释：应用。

**底层机制**

延迟监视器按 resolution 安排采样；JavaScript 线程被阻塞时，预期采样不能按时运行，差值进入直方图。原始直方图单位是纳秒。

**API / 语法规则**

启用后需跨过多个采样周期，运行待观察任务，再等待一次采样并禁用；比较分布而非固定数字。

**固定名称 / 签名**

`process.memoryUsage()`、`process.uptime()`、`os.availableParallelism()`、`performance.now()`、`monitorEventLoopDelay([options])`。

**示例结构**

迷你项目封装 enable → warm-up → task → settle → disable，并把纳秒转换为毫秒。

**示例代码**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/runtime-lab-cli/src/event-loop-delay.js</span>
  </div>

```js
histogram.enable();
await delay(resolutionMs * 3);
const taskResult = await runObservedTask();
await delay(resolutionMs * 3);
histogram.disable();

return {
  taskResult,
  delayMilliseconds: {
    mean: toMilliseconds(histogram.mean),
    max: toMilliseconds(histogram.max),
    percentile99: toMilliseconds(histogram.percentile(99)),
  },
};
```
</div>

**逐行解释**

先启用并预热；再运行被观察任务；结束后留出采样窗口；关闭直方图；最后把纳秒转换为毫秒。

**运行方式**

在 `mini-projects/runtime-lab-cli/` 执行 `npm.cmd run demo:both`。

**预期输出**

运行时 JSON 后出现 blocking 与 async 两组结果；阻塞组的最大延迟通常明显高于基线，异步 timer 等待不会产生同等幅度的阻塞峰值。

**执行过程**

监视器创建内部 interval-like 采样；阻塞任务占用 JavaScript；采样延后并记录差值；异步任务等待 timer 时循环仍可推进采样。

**变量、资源与生命周期变化**

创建 histogram handle 和 timer promises；直方图累积 mean/max/percentile；disable 后停止采样，Promise settle 后资源可释放。

**为什么得到这个结果**

指标测量的是循环推进延迟，不是任务业务语义；CPU 忙循环直接阻断推进，异步等待不直接阻断。

**对照情况**

外部 API 慢 2 秒但 JavaScript 栈空闲时，请求耗时很高，event-loop delay 仍可能正常。

**常见错误**

忘记纳秒转毫秒；启用后立刻读取空直方图；用单次本地数值设置生产阈值；把 `os.cpus().length` 当成推荐并行度。

**真实项目关系**

将 event-loop delay 与请求高百分位、CPU profile、GC 和外部依赖耗时按时间关联，才能建立因果证据。

**当前路径关系**

采样封装在 `mini-projects/runtime-lab-cli/src/event-loop-delay.js`，系统快照在 `runtime-info.js`。

**TypeScript 边界**

类型能防止把字段名拼错，却不能自动附加单位语义；应在名称中保留 `Bytes`、`Seconds`、`Milliseconds`。

**精确违反的规则**

把 `histogram.max` 直接当毫秒，违反该 API 直方图值以纳秒表示的单位契约。

**机制证据链**

触发：enable 监视器并运行任务；具体资源：IntervalHistogram、timer promises、memoryUsage 对象；Node API：`monitorEventLoopDelay()`、`process.memoryUsage()`；边界：V8 执行任务，Node/libuv 安排采样，OS 提供时钟；生命周期：disabled → enabled → samples → disabled；结果原因：阻塞使采样迟到；TypeScript：不能编码真实单位/阈值；违反规则：纳秒误当毫秒；项目识别：相关联而非单指标归因。

**最终记忆模型**

总耗时回答“用户等多久”，事件循环延迟回答“JavaScript 调度被拖多久”。

<a id="9-10-runtime-lab"></a>
### 9.10 runtime-lab-cli：把边界、阻塞与观测整合成可重复实验

**结论**

最终实验用一个零依赖 CLI 把启动输入、运行时快照、阻塞/异步任务和事件循环延迟连接成可重复证据链。

**本节解决的问题**

把分散概念变成可以修改参数、比较输出和解释差异的工程练习。

**技术意义**

真正掌握机制的标准不是背诵阶段，而是能设计对照实验、限定变量并解释结果。

**概念解释**

CLI 解析 `argv` 与 `env`，根据任务类型运行模拟器，用同一个观测器包围不同任务，最后自然退出或用非零退出码报告输入错误。

**边界标签**

输入：shell；编排：`index.js`；系统快照：`runtime-info.js`；任务：`task-simulator.js`；观测：`event-loop-delay.js`。

**底层机制**

CommonJS 加载四个模块；参数选择代码路径；阻塞任务同步占栈，异步任务返回 Promise；观测器在两侧采样；错误进入 catch 并设置 exitCode。

**API / 语法规则**

参数采用 `--name=value`；task 只能是 `block|async|both`；持续时间必须是正有限数；环境变量缺失时使用默认标签。

**固定名称 / 签名**

`getRuntimeInfo()`、`runBlockingTask(durationMs)`、`runAsyncTask(durationMs)`、`observeEventLoopDelay(runObservedTask[, resolutionMs])`。

**示例结构**

四个单一职责模块加一个本地 `package.json`；没有网络、数据库或第三方包。

**示例代码**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/runtime-lab-cli/src/index.js</span>
  </div>

```js
if (task === 'block' || task === 'both') {
  const observation = await observeEventLoopDelay(() =>
    runBlockingTask(blockDurationMs),
  );
  console.log('Blocking task:', observation);
}

if (task === 'async' || task === 'both') {
  const observation = await observeEventLoopDelay(() =>
    runAsyncTask(asyncDurationMs),
  );
  console.log('Async task:', observation);
}
```
</div>

**逐行解释**

两个分支使用相同观测器控制变量；差别只有 task 的内部机制；每组结果包含任务实际时长和同一单位的延迟分布。

**运行方式**

在 `mini-projects/runtime-lab-cli/` 执行 `npm.cmd start -- --task=both --block-ms=150 --async-ms=150`。

**预期输出**

先输出 label 与运行时 JSON，再输出两组 observation；blocking 的 `max` 通常接近阻塞时长，async 的 `max` 接近环境基线。

**执行过程**

入口解析输入 → 加载运行时信息 → 预热 histogram → 执行 block → 读取分布 → 新建观测运行 async → 输出 → 无活跃资源后退出。

**变量、资源与生命周期变化**

task/时长由字符串转成验证后的 number；每次实验创建并禁用一个 histogram；async timer settle；错误路径设置 exitCode 1。

**为什么得到这个结果**

实验保持观测方法一致，只改变“持续占栈”与“等待 timer promise”这一核心变量。

**对照情况**

若两个实验都只比较总耗时，它们都约 150 ms，无法证明阻塞差异；加入 event-loop delay 后才出现机制证据。

**常见错误**

把一次运行当基准；比较不同 resolution/负载；将 `max` 的偶发峰值直接解释成业务回归。

**真实项目关系**

同样的方法可替换 task 为真实解析、加密或 I/O 路径，但应保持输入规模、采样窗口和机器负载可比。

**当前路径关系**

项目根是 `mini-projects/runtime-lab-cli/`，运行说明在其 `README.md`。

**TypeScript 边界**

迁移到 TypeScript 后可用联合类型限制 task，并标注观测结果；运行时仍必须验证 argv/env，因为外部输入不会因类型声明而可信。

**精确违反的规则**

直接 `Number(rawValue)` 后不检查有限性和正数，违反“所有进程边界输入必须在运行时验证”的工程规则。

**机制证据链**

触发：CLI 参数选择 task；具体值/对象：argv/env 字符串、runtime info、histogram、task Promise；Node API：`process`、`os`、`perf_hooks`、`timers/promises`；边界：V8 执行编排，Node/libuv 管 timer/采样，OS 提供系统值；生命周期：parse → validate → observe → output → natural exit；结果原因：控制变量对照；TypeScript：外部输入仍需验证；违反规则：未验证 NaN/负数/任务名；项目识别：把实验封装成可重复的最小诊断。

**最终记忆模型**

好的运行时实验必须有明确触发、可观察资源、受控变量、生命周期终点和可被反驳的预期。

<a id="api-index"></a>
## 10. API 与规则索引

| API / 名称 | 所属层 | 本章用途 | 关键规则 |
|---|---|---|---|
| `globalThis` | ECMAScript/宿主连接 | 跨宿主全局入口 | 不保证具体宿主属性存在 |
| `Promise` | ECMAScript/V8 | 微任务对照 | reaction 不同步执行 |
| `process.nextTick()` | Node | 高优先级回调 | 不属于 libuv 阶段；可造成饥饿 |
| `setTimeout()` | Node timers | 最小延迟阈值 | 到期不等于立即执行 |
| `setImmediate()` | Node timers | check 阶段回调 | 顶层与 timeout 顺序不固定 |
| `fs.readFile()` | Node fs | 异步文件读取 | 结果只在 callback 后可用 |
| `http.createServer()` | Node http | 请求/响应实验 | 活跃 server 保持进程存活 |
| `process.argv` | Node process | CLI 输入 | 前两项不是用户参数 |
| `process.env` | Node process | 环境输入 | 字符串或 `undefined` |
| `process.exitCode` | Node process | 自然退出状态 | 优先于正常路径的强制退出 |
| `process.once()` | Node EventEmitter | 单次信号处理 | 注册后负责清理与退出 |
| `os.availableParallelism()` | Node os | 并行度建议 | 不证明 JS 多线程执行 |
| `performance.now()` | Web Performance/Node | 单调时长 | 不表示墙钟日期 |
| `monitorEventLoopDelay()` | Node perf_hooks | 循环延迟分布 | 原始单位为纳秒 |

<a id="error-table"></a>
## 11. 常见错误对照表

| 现象或错误结论 | 精确原因 | 违反的规则 | 修正 |
|---|---|---|---|
| `ReferenceError: window is not defined` | Node 未提供 Browser 全局 | 直接读取缺失标识符 | 使用宿主适配或安全 `typeof` 探测 |
| timer 明显晚于 delay | 当前栈或其他 callback 阻塞 | delay 是阈值，不是期限 | 缩短 callback、测量循环延迟 |
| I/O 长时间不推进 | nextTick/微任务无界递归 | 协作式调度必须让出 | 限制批次并进入合适阶段 |
| 日志末尾被截断 | 使用 `process.exit()` 强退 | 强退不等待异步写入 | 设置 `process.exitCode` 并自然退出 |
| 收到 SIGTERM 后不退出 | server/timer 未关闭 | 活跃 handle 保持循环存活 | 幂等关闭所有长期资源 |
| `histogram.max` 数值巨大 | 纳秒被当成毫秒 | 单位契约错误 | 除以 `1_000_000` |
| `--block-ms=abc` 行为异常 | 外部字符串未验证 | 进程边界输入不可信 | 检查有限正数 |
| 认为 `async` 函数不阻塞 | 内部仍执行同步 CPU 工作 | Promise 返回值不改变当前栈 | 分析实际让出点 |

<a id="debugging"></a>
## 12. 调试与验证方法

采用五步最小诊断：

1. 标记触发点：哪个请求、timer、signal 或 CLI 参数启动路径。
2. 列出活跃资源：server、socket、timer、request、Promise、nextTick。
3. 标记边界：当前在 V8、Node、libuv worker、OS wait 还是 callback。
4. 记录生命周期：created、queued、ready、running、closed。
5. 收集对照：相同输入下比较阻塞与异步路径，并记录 event-loop delay。

不要只凭日志视觉顺序下结论。对版本敏感的 event-loop 行为应写明 Node/libuv 版本与上下文；对机器敏感的数值应比较数量级和分布。

<a id="practice-guide"></a>
## 13. 分项练习说明

推荐顺序与检查点：

1. `browser-vs-node-runtime.js`：解释每个 `typeof` 是语言规则还是宿主结果。
2. `node-core-api-access.js`：把每个 API 归类到 Node/OS。
3. `timer-immediate-order.js`：至少运行五次，不把顶层顺序写成断言。
4. `promise-nexttick-order.js`：把递归上限从 3 调到 10，确认 immediate 仍需等待。
5. `blocking-loop-server.js`：把 350 改为 100/700，观察额外 timer delay。
6. `async-io-server.js`：说明 slow request 墙钟时间长但没有等量阻塞。
7. `process-argv-env.js`：在 PowerShell 设置环境变量并传两个参数。
8. `process-exit-code.js`：分别运行 success/failure 并检查 `$LASTEXITCODE`。
9. `signal-graceful-exit.js`：先使用模拟的 Node 信号事件，再手动按 Ctrl+C 验证实际 OS 信号路径。

<a id="mini-project"></a>
## 14. 最终迷你项目

最终项目是 `mini-projects/runtime-lab-cli/`。验收标准：

- 不依赖第三方包。
- 可以输出 Node、平台、架构、PID、并行度、系统/进程内存和 uptime。
- 可以独立运行 block、async 或 both。
- 参数非法时输出明确错误并自然返回退出码 1。
- 对两个任务使用相同延迟观测器。
- 输出字段带清晰单位，README 明确数值不固定。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```powershell
Set-Location mini-projects/runtime-lab-cli
npm.cmd run demo:both
npm.cmd start -- --task=invalid
$LASTEXITCODE
```
</div>

<a id="cheatsheet"></a>
## 15. 速查表使用方式

`nodejs-chapter-01-runtime-foundations-cheatsheet.md` 用于复习运行时分层、调度规则、常用 API、阻塞检查和退出检查。它是复习材料，不替代本指南的机制证据链。

<a id="interview"></a>
## 16. 面试题使用方式

`nodejs-chapter-01-runtime-foundations-interview-questions.md` 包含 18 道题与答案。回答时采用：

1. 一句话结论。
2. 从触发到 callback 的机制链。
3. 一个不能越过的边界。
4. 一个本章可运行文件作为证据。

<a id="final-model"></a>
## 17. 最终心智模型

把 Node.js 程序记成三条同时推进的链：

- 执行链：JavaScript 源码 → V8 调用栈 → 返回。
- 资源链：Node API → libuv/OS resource → ready → callback → close。
- 生命周期链：process start → entry → active handles/jobs → cleanup → exit code。

最终判断公式：

`可观察结果 = 语言语义 + 宿主 API + 调度上下文 + 资源生命周期 + 实际负载`

TypeScript 只在这个公式前增加静态检查，不会替换任何运行时项。

<a id="sources"></a>
## 18. 官方资料、来源审计与自检

### 官方资料

- [Node.js Introduction](https://nodejs.org/learn/getting-started/introduction-to-nodejs)
- [Differences between Node.js and the Browser](https://nodejs.org/learn/getting-started/differences-between-nodejs-and-the-browser)
- [The V8 JavaScript Engine](https://nodejs.org/learn/getting-started/the-v8-javascript-engine)
- [The Node.js Event Loop](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick)
- [Don't Block the Event Loop](https://nodejs.org/learn/asynchronous-work/dont-block-the-event-loop)
- [Node.js Process API](https://nodejs.org/api/process.html)
- [Node.js OS API](https://nodejs.org/api/os.html)
- [Node.js Performance Hooks API](https://nodejs.org/api/perf_hooks.html)
- [Node.js Timers API](https://nodejs.org/api/timers.html)
- [Node.js CLI API](https://nodejs.org/api/cli.html)
- [V8 Documentation](https://v8.dev/docs)
- [libuv Design Overview](https://docs.libuv.org/en/stable/design.html)

### 版本敏感说明

Node.js 官方事件循环文档说明：从 libuv 1.45.0（Node.js 20）开始，timer 只在 poll 之后运行，不再同时在 poll 前后运行。旧教材的阶段图可能与现代 Node 不一致。本章因此不承诺顶层 `setTimeout(..., 0)` 与 `setImmediate()` 的固定顺序。

### 本地材料

- `D:\node.js\Node.js全栈开发路线图（课程大纲）.md`：Phase 1 范围、练习与迷你项目要求。
- `D:\node.js\nodebook\chapters\01-node-arch\`：架构主题补充。
- `D:\node.js\nodebook\chapters\05-process-os\`：进程、信号、OS 与标准 I/O 补充。
- `D:\node.js\nodebook\chapters\08-runtime-platform\`：CLI 与环境配置补充。
- `D:\node.js\references\books\javascript\javascript-the-definitive-guide.pdf`：可选的 JavaScript 语言背景材料；本章未引用具体页码，也不把它作为 Node API 的事实来源。

### 写作自检

- [x] 主结构覆盖 0–18，目录位于代码定位索引之前。
- [x] 9.1–9.10 均包含结论、边界、底层机制、执行过程、对照、错误、TypeScript 边界和机制证据链。
- [x] 实践路径与磁盘文件一一对应。
- [x] Node API 与版本敏感行为优先依据官方文档。
- [x] 所有代码/命令/输出块使用 macOS 标题栏加 Markdown fenced code block。
- [x] 未使用原始 HTML 代码容器。
- [x] 源代码、标识符、注释和运行时字符串保持 English-only。
- [x] 未引入框架、数据库、构建工具或第三方依赖。
- [x] 未把所有异步 I/O 错写成线程池工作。
- [x] 未把 TypeScript 静态能力写成运行时保证。
