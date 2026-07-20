# Node.js 第 3 章：HTTP、Express 与后端 API 基础

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

- [本章代码定位索引](#本章代码定位索引)
- [0. 章前定位](#0-章前定位)
- [1. 学习目标](#1-学习目标)
- [2. 前置知识](#2-前置知识)
- [3. 环境与运行基线](#3-环境与运行基线)
- [4. 第一性原理](#4-第一性原理)
- [5. 技术边界模型](#5-技术边界模型)
- [6. 底层机制模型](#6-底层机制模型)
- [7. 核心术语](#7-核心术语)
- [8. 本章实践路线](#8-本章实践路线)
- [9. 核心教学](#9-核心教学)
  - [9.1 HTTP 是什么：method、URL、headers、body、status 的边界](#section-9-1)
  - [9.2 Node 原生 HTTP server：`http.createServer()` 和 `'request'` event](#section-9-2)
  - [9.3 `IncomingMessage`：method、url、headers、body stream](#section-9-3)
  - [9.4 `ServerResponse`：status、headers、write、end](#section-9-4)
  - [9.5 手写 routing：method + pathname + query](#section-9-5)
  - [9.6 response body 与 Content-Type](#section-9-6)
  - [9.7 status code decision model：200、201、204、400、401、403、404、409、422、500](#section-9-7)
  - [9.8 Express 是什么：routing and middleware framework，不是 runtime](#section-9-8)
  - [9.9 Express route method、route path、route params、query](#section-9-9)
  - [9.10 Express Router 与模块化路由边界](#section-9-10)
  - [9.11 middleware 执行顺序：ordered request-response pipeline](#section-9-11)
  - [9.12 `next()`、short-circuit、hanging request](#section-9-12)
  - [9.13 `express.json()`：body parsing、limit、content type、untrusted `req.body`](#section-9-13)
  - [9.14 TypeScript 为什么不能验证 HTTP body](#section-9-14)
  - [9.15 runtime validation：unknown input 到 trusted data](#section-9-15)
  - [9.16 unified success response](#section-9-16)
  - [9.17 unified error response and typed HTTP error](#section-9-17)
  - [9.18 Express error middleware：四参数签名、注册位置、headersSent](#section-9-18)
  - [9.19 Express 5 async handler error behavior](#section-9-19)
  - [9.20 REST API design for Notes CRUD](#section-9-20)
  - [9.21 Chapter integration: typed-express-notes-api](#section-9-21)
- [10. API 与规则索引](#10-api-与规则索引)
- [11. 常见错误对照表](#11-常见错误对照表)
- [12. 调试与验证方法](#12-调试与验证方法)
- [13. 分项练习说明](#13-分项练习说明)
- [14. 最终迷你项目](#14-最终迷你项目)
  - [14.1 项目目标与边界](#141-项目目标与边界)
  - [14.2 项目结构与职责](#142-项目结构与职责)
  - [14.3 完整项目代码](#143-完整项目代码)
  - [14.4 运行、测试与生命周期](#144-运行测试与生命周期)
  - [14.5 失败路径与可扩展方向](#145-失败路径与可扩展方向)
- [15. 知识迁移与真实项目场景](#15-知识迁移与真实项目场景)
- [16. 本章复盘任务](#16-本章复盘任务)
- [17. 最终心智模型](#17-最终心智模型)
- [18. 官方资料](#18-官方资料)

## 本章代码定位索引

| 学习目标 | 文件或片段 | 可观察证据 |
| --- | --- | --- |
| 观察原生请求和 JSON 响应 | `practices/03-http-express/01-native-http/native-json-server.js` | `GET /` 返回 method 和 header 信息，`POST /echo` 消费请求体 |
| 理解无框架路由 | `practices/03-http-express/01-native-http/native-routing-server.js` | method、pathname、query 共同决定 200、404 或 405 |
| 观察响应流和背压 | `practices/03-http-express/01-native-http/native-stream-response.js` | `/stream` 分块输出，`write()` 返回 `false` 时等待 `drain` |
| 使用 Express endpoint 与 Router | `practices/03-http-express/02-express-basics/express-routing.ts` | `/notes` Router 读取 query、params 和 body |
| 追踪 middleware 顺序 | `practices/03-http-express/02-express-basics/middleware-order.ts` | 日志顺序区分继续、短路和挂起 |
| 建立同步错误链 | `practices/03-http-express/02-express-basics/error-middleware.ts` | `HttpError` 经四参数 middleware 转成 JSON |
| 建立 Express 5 异步错误链 | `practices/03-http-express/02-express-basics/async-handler-error.ts` | rejected Promise 自动进入 error middleware |
| 建立状态码决策表 | `practices/03-http-express/03-api-design/status-code-model.ts` | 业务结果映射到 200、201、204、400、401、403、404、409、422、500 |
| 统一公开错误结构 | `practices/03-http-express/03-api-design/unified-error-response.ts` | 客户端 DTO 与内部日志信息分离 |
| 验证外部输入 | `practices/03-http-express/03-api-design/request-validation.ts` | Zod `safeParse()` 返回 discriminated union |
| 集成 Notes CRUD | `mini-projects/typed-express-notes-api/src/app.ts` | parser、Router、not-found、error middleware 按顺序组装 |
| 验证 API 行为 | `mini-projects/typed-express-notes-api/tests/notes-api.test.ts` | Supertest 驱动 create/list/get/update/delete 与错误路径 |

## 0. 章前定位

前两章建立了 Node 进程、事件循环、模块、Buffer、Stream、URL 与 EventEmitter 的基础。本章不重复这些主题，而是把它们连接成一个可观察的 HTTP 服务：套接字收到字节，Node HTTP parser 生成消息对象，应用读取请求并写出响应。

学习路径从 `node:http` 开始，再进入 Express 5。这样做能避免把 `req`、`res`、middleware 或 Router 当成魔法，也能明确 Express 仍运行在 Node 上，并最终依赖 Node 的 HTTP server 和流机制。

本章只处理无数据库、无认证的内存型 Notes API。持久化、身份、部署、代理、安全加固与分布式架构属于后续边界。

## 1. 学习目标

完成本章后，你应能：

1. 用 HTTP message 边界解释 method、URL、headers、body 和 status。
2. 用 `http.createServer()` 构造原生 JSON server，并说明 `'request'` event。
3. 把请求体识别为 `IncomingMessage` 上的 readable stream。
4. 正确结束 `ServerResponse`，并识别 `write()` 背压信号。
5. 不依赖框架完成 method、pathname 与 query 路由。
6. 解释 Express app、Router、route 与 middleware 的分工和顺序。
7. 区分 TypeScript 静态检查和 Zod 运行时验证。
8. 设计一致的成功/错误 DTO、状态码模型与错误 middleware。
9. 完成并测试一个 typed Express Notes CRUD API。

## 2. 前置知识

- 第 1 章：进程生命周期、事件循环、阻塞与非阻塞、Node runtime 边界。
- 第 2 章：Stream、Buffer、URL、EventEmitter、ESM 与 `package.json`。
- JavaScript：对象、数组、Promise、`async`/`await`、异常和 class。
- TypeScript：type、union、generic、`unknown`、narrowing。

若 `for await...of` 消费 readable stream、ESM 中的 `.js` 相对导入扩展名，或 discriminated union 仍不熟悉，应先回看相关前置章节。

## 3. 环境与运行基线

本章以 Express 5 为框架边界；Express 5 要求 Node.js 18 或更高版本。示例项目声明 Node.js 22 或更高版本，并采用 ESM、TypeScript `NodeNext`、Express 5.2.1、Zod 4.4.3 与 Node 内置 test runner。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
node --version
npm --version
```
</div>

`package.json` 是严格 JSON，不能写注释或尾逗号。`dependencies` 是运行项目所需包，`devDependencies` 是类型、runner 和测试辅助工具。`npm run <name>` 执行 `scripts` 中对应命令。

## 4. 第一性原理

HTTP 服务的最小闭环不是“调用一个框架函数”，而是：

1. 进程监听一个地址和端口。
2. 客户端建立连接并发送 HTTP request message。
3. Node 把解析后的 request 暴露为 `IncomingMessage`。
4. 应用根据 method、URL、headers 和 body 计算结果。
5. 应用通过 `ServerResponse` 写 status、headers 和 body。
6. `end()` 标记响应消息完成；连接随后按协议状态复用或关闭。

Express 改善的是步骤 4 的组织方式：route 匹配、middleware 组合、body parser 和错误传递。它不替代 Node runtime、操作系统网络资源或 HTTP 协议。

## 5. 技术边界模型

| 边界 | 本章中的职责 | 不负责什么 |
| --- | --- | --- |
| JavaScript 语法 | 函数、对象、Promise、class、`try`/`throw` | 不打开端口，不解析 HTTP |
| Node runtime | 执行 JS、调度回调、维持进程和事件循环 | 不自动设计 REST 资源 |
| Node platform API | `node:http`、Stream、Buffer、URL、process | 不提供 Express Router |
| HTTP 协议 | request/response message、method、status、headers、body | 不定义 TypeScript 类型 |
| Express convention | route、Router、middleware、error pipeline | 不是新的 JS runtime |
| TypeScript type system | 编译前检查已声明的类型关系 | 不检查网络字节是否合法 |
| Zod runtime validation | 检查进程运行时收到的未知值 | 不替代授权或数据库约束 |
| npm tooling | 安装依赖、运行 scripts、锁定依赖树 | 不参与每个请求的执行 |
| 项目结构 | 分配 app、server、route、repository 职责 | 不改变底层 HTTP 语义 |

## 6. 底层机制模型

一次 `POST /notes` 的主路径如下：

`TCP bytes → Node HTTP parser → IncomingMessage → express.json() → req.body → Zod safeParse() → route handler → repository → response DTO → ServerResponse → TCP bytes`

关键生命周期变化：

- `listen()` 让活动 server handle 保持进程存活。
- request body 数据分块到达，`IncomingMessage` 处于 readable lifecycle。
- `express.json()` 只在匹配的 Content-Type 下消费 body，并受 `limit` 约束。
- Zod 成功分支产生经过检查的数据；失败分支产生 issues。
- route handler 只能发送一次正常响应；headers 发出后不能再改 status 或 headers。
- Express 5 把 async handler 的 throw/rejection 转成 `next(error)`。
- error middleware 产生公开错误 DTO；未知内部异常的细节只进入服务端日志。

## 7. 核心术语

| 术语 | 精确定义 |
| --- | --- |
| endpoint | HTTP method 与 route path 的组合，例如 `GET /notes` |
| request body | request message 中 headers 后的可选载荷 |
| `IncomingMessage` | Node 对入站 HTTP 消息的对象表示，同时是 readable stream |
| `ServerResponse` | Node 对服务端出站响应的对象表示 |
| route parameter | route path 中命名的动态片段，Express 放入 `req.params` |
| query string | URL `?` 后的键值序列，不属于 route path |
| middleware | 按注册顺序接收 `req`、`res`、`next` 的函数 |
| short-circuit | middleware 直接结束响应，不再交给后续普通 middleware |
| hanging request | 既未结束响应，也未调用 `next()` 的请求 |
| runtime validation | 进程运行时对未知外部值执行的结构与约束检查 |
| DTO | API 边界上对响应数据形状的显式约定 |
| repository | 封装数据访问的对象；本章实现仅使用进程内 Map |

## 8. 本章实践路线

1. 先运行三个原生 HTTP 文件，观察 request、response、URL 和 stream。
2. 再运行 Express routing、middleware 和 error 文件，对比手写分派与框架 pipeline。
3. 用状态码、错误 DTO 和 Zod 验证练习建立 API 边界。
4. 最后组装 Notes CRUD，使用测试从 HTTP 边界验证结果。

每一步都应记录：触发请求、读取的 JS 值、涉及的 Node/Express API、HTTP 边界、生命周期变化、最终 response，以及错误案例违反的规则。

## 9. 核心教学

<a id="section-9-1"></a>
### 9.1 HTTP 是什么：method、URL、headers、body、status 的边界

**结论**

HTTP 是请求—响应消息协议。method、target URL、headers 和可选 body 属于请求；status、headers 和可选 body 属于响应。服务端业务代码必须在这些边界之间完成输入解释和输出编码。

**本节解决的问题与技术意义**

它解决“一个 API 请求到底携带了什么、服务端应返回什么”的问题。准确区分 message 字段后，才能判断数据应放在 path、query、header 还是 body，并避免把 status code 当成业务装饰。

**概念、边界与底层机制**

JavaScript 只提供读取对象属性的语法；Node platform API 把已解析的 HTTP message 暴露成对象；HTTP 规定字段语义；Express 再把常见字段映射为 `req.params`、`req.query` 和 `req.body`。TypeScript 可以描述这些属性的预期形状，但网络发送者不受类型声明约束。

**API / 语法规则**

- `GET /notes?search=http`：method 是 `GET`，pathname 是 `/notes`，query 是 `search=http`。
- `Content-Type` 描述当前 message body 的媒体类型。
- 响应 status 表示请求结果类别，JSON body 承载结构化结果。
- `GET` 通常读取资源；`POST` 通常创建或提交处理；`PATCH` 表示局部修改；`DELETE` 删除资源。

**执行过程、对照与错误识别**

客户端触发 `POST /notes` 后，服务器读取 method、target、headers，再消费 body。若把筛选条件错误放入 route parameter，接口组合性下降；若声明 JSON 却发送坏 JSON，解析阶段应失败而不是进入业务逻辑。真实项目中可从 method/path、Content-Type、status 和响应 DTO 四组证据定位边界错误。

**机制证据链**

`POST /notes` → JS 读取 `request.method` 与 URL/body 值 → Node `IncomingMessage` 承载消息 → HTTP request line、headers、body 形成输入边界 → Express parser/Router 依次处理 → TypeScript 只检查声明 → Zod 检查运行时对象 → 返回 `201` 或结构化 `4xx`。错误案例若把未验证 body 当成 Note，违反“外部值先验证”的规则；常见信号是属性访问异常或脏数据进入存储。

**项目与学习路径关系 / 记忆模型**

Notes API 的每个 endpoint 都是 method + path，不是一个函数名。记住：HTTP message 是边界，Node 把边界变成对象，应用把对象变成结果。

<a id="section-9-2"></a>
### 9.2 Node 原生 HTTP server：`http.createServer()` 和 `'request'` event

**结论**

`http.createServer(requestListener)` 返回 `http.Server`；传入的 listener 会注册到 server 的 `'request'` event。每收到一个已解析的 HTTP 请求，就以 `(request, response)` 调用 listener。

**本节解决的问题与技术意义**

它解释 server 从哪里来，以及 Express 最终依赖什么。理解 event 连接可区分“构造 server”“开始监听”“处理一次请求”三个时刻。

**概念、边界与底层机制**

函数调用是 JS 语法；`http.createServer()` 是 Node platform API；活动 server handle 属于运行时资源。`createServer()` 本身不打开端口，`listen()` 才请求操作系统绑定地址。请求到达后，Node HTTP parser 产生 `IncomingMessage` 和 `ServerResponse`，再发出 `'request'` event。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: createServer request event equivalence</span>
  </div>

```js
const server = http.createServer();

server.on("request", (request, response) => {
  response.end("OK");
});

server.listen(3000, "127.0.0.1");
```
</div>

**逐行解释、运行与预期**

第一行只构造 server；`on()` 订阅事件；listener 结束每次响应；`listen()` 才建立长期活动资源。访问端口后预期得到 `200` 和 `OK`。忘记 listener 不一定阻止监听，但请求不会得到应用级响应；端口冲突会在 server 上产生 `'error'`。

**机制证据链**

`node native-json-server.js` → 创建 `server` JS 对象 → `node:http` 构造 `http.Server` → `listen()` 绑定 socket → request bytes 被解析 → `'request'` listener 获得两个消息对象 → 无 Express transition → TypeScript/Zod 不参与 → `response.end()` 完成消息。若没有 `end()`，违反“一次请求必须完成响应”的规则；真实项目表现为客户端持续 pending。

**项目与学习路径关系 / 记忆模型**

`practices/03-http-express/01-native-http/native-json-server.js` 展示完整闭环。记住：`createServer` 构造事件源，`listen` 占有端口，`request` event 驱动一次处理。

<a id="section-9-3"></a>
### 9.3 `IncomingMessage`：method、url、headers、body stream

**结论**

服务端收到的 `request` 是 `http.IncomingMessage`。`method`、`url` 和 `headers` 是解析后的元数据；body 不会自动成为对象，而是通过这个 readable stream 分块到达。

**本节解决的问题与技术意义**

它解决“为什么原生 Node 没有 `req.body`”以及“大 body 为什么不能假定一次到齐”。这也是理解 Express body parser 的前提。

**概念、边界与底层机制**

`IncomingMessage` 继承 `stream.Readable`。socket 可被 keep-alive 复用，而每个 HTTP message 有独立对象。chunk 通常是 Buffer；把多个 chunk 收集后才能按字符编码解码，再按 JSON 语法解析。收集整个 body 会占用与 body 大小相关的内存，因此真实服务必须设置大小上限。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: consume request body</span>
  </div>

```js
const chunks = [];

for await (const chunk of request) {
  chunks.push(chunk);
}

const text = Buffer.concat(chunks).toString("utf8");
const input = JSON.parse(text);
```
</div>

**逐行解释、执行过程与资源变化**

数组持有已到达 Buffer；`for await` 等待 readable 产生 chunk，直到结束；`Buffer.concat` 分配连续 Buffer；`toString` 产生 JS string；`JSON.parse` 再产生 JS value。坏 JSON 会在最后一步抛 `SyntaxError`，而不是在网络读取阶段。

**机制证据链**

`POST /echo` → 读取 `method/url/headers` 并累积 Buffer → Node `IncomingMessage` readable API → HTTP body bytes 跨入进程 → 无 Express transition → TypeScript 最多把解析结果声明为某类型但不能证明内容 → 若要信任字段仍需 Zod → 成功 echo 或 `400 INVALID_JSON`。忽略 chunk 或重复消费违反 stream 单向消费模型；真实信号是空 body、解析失败或请求内存异常增长。

**项目与学习路径关系 / 记忆模型**

该机制连接第 2 章 Stream/Buffer。记住：headers 已被解析，body 仍是一条流；解析和验证是两个后续步骤。

<a id="section-9-4"></a>
### 9.4 `ServerResponse`：status、headers、write、end

**结论**

`ServerResponse` 负责响应 status、headers 和 body。`write()` 可多次发送 body chunk，返回 `false` 表示用户态缓冲出现背压；`end()` 必须在每个响应上调用以标记消息完成。

**本节解决的问题与技术意义**

它解决 pending 请求、`ERR_HTTP_HEADERS_SENT` 和无界写入问题。响应不是任意对象返回值，而是一个有状态的 writable message lifecycle。

**概念、边界与底层机制**

`writeHead()` 设置并发送 status/headers；第一次 `write()` 也可能隐式发送 headers。headers 发出后再改 status 或 header 会违反状态顺序。`write()` 的布尔值连接 Node writable backpressure：`false` 时应等待 `'drain'`，而不是继续无限写入。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/03-http-express/01-native-http/native-stream-response.js</span>
  </div>

```js
async function writeChunk(response, chunk) {
  const canContinue = response.write(chunk);

  if (!canContinue) {
    await once(response, "drain");
  }
}
```
</div>

**运行、预期与错误对照**

运行文件并请求 `/stream`，客户端会逐步看到三个 chunk 和 `complete`。若先 `write()` 再 `setHeader()`，常见错误是 `ERR_HTTP_HEADERS_SENT`；若遗漏 `end()`，客户端不知道 message 已完成；若持续忽略 `false`，内存缓冲可能增长。

**机制证据链**

`GET /stream` → JS 产生多个 string chunk → Node `ServerResponse.write/end` → HTTP response headers/body/chunked framing → 无 Express transition → TypeScript 可检查参数类型但不保证网络可写 → 无输入验证 → 客户端依次收到 chunk。错误案例违反 header-before-body、finish-each-response 或 backpressure 规则；真实诊断看 `headersSent`、`writableEnded`、pending 请求和内存曲线。

**项目与学习路径关系 / 记忆模型**

这直接复用第 2 章 writable stream。记住：先定元数据，再写载荷，遇到背压等 `drain`，最后 `end`。

<a id="section-9-5"></a>
### 9.5 手写 routing：method + pathname + query

**结论**

原生 routing 是条件分派：先解析 URL，再用 method 与 pathname 匹配 endpoint；query 用于可选筛选，不应混入 pathname 比较。

**本节解决的问题与技术意义**

它展示 Express Router 替你组织了什么，也让 404 和 405 的区别可见：路径不存在是 404；已知资源路径不支持当前 method 是 405，并可返回 `Allow`。

**概念、边界与底层机制**

服务端 `request.url` 通常是 origin-form，例如 `/notes?search=http`，需要提供 base 才能传给 WHATWG `URL`。`URL.pathname` 不含 query，`URLSearchParams` 负责 query。正则可提取动态路径片段，但随着路由数量增长，手写分支会迅速复杂。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/03-http-express/01-native-http/native-routing-server.js</span>
  </div>

```js
const origin = `http://${request.headers.host ?? "127.0.0.1"}`;
const url = new URL(request.url ?? "/", origin);

if (url.pathname === "/notes" && request.method === "GET") {
  const search = url.searchParams.get("search");
}
```
</div>

**逐行解释与执行过程**

第一行提供解析相对 request target 所需的 base；第二行创建 URL 对象；条件把 route method 和 route path 组合；最后一行单独读取 query。Host 是外部输入，不应拿这个构造出的 URL 做未经校验的安全决策或重定向。

**机制证据链**

`GET /notes?search=http` → JS 创建 `URL` 和 `URLSearchParams` → Node 使用 WHATWG URL platform API → HTTP target 被拆为 pathname/query → 手写 `if` 完成路由，无 Express → TypeScript 不参与 JS 文件 → query 若影响领域规则仍需验证 → 返回筛选列表。若直接比较 `request.url === "/notes"`，违反“query 不属于 route path”的解析规则；真实表现是加 query 后路由突然 404。

**项目与学习路径关系 / 记忆模型**

练习把第 2 章 URL 应用于服务端。记住：endpoint = method + pathname；query 是 endpoint 的可选输入。

<a id="section-9-6"></a>
### 9.6 response body 与 Content-Type

**结论**

body 是字节载荷，`Content-Type` 告诉接收方如何解释它。发送 JSON 时应序列化值并声明 `application/json; charset=utf-8`。

**本节解决的问题与技术意义**

它解决“为什么明明返回 JSON 字符串，客户端却按普通文本或错误编码处理”的问题，并建立表示层的显式契约。

**概念、边界与底层机制**

`JSON.stringify()` 是 JavaScript 序列化；`Buffer.byteLength()` 计算 UTF-8 字节长度；`Content-Type` 是 HTTP representation header。字符数不一定等于字节数，所以手动 `Content-Length` 时不能直接用 string `.length`。若不设置长度，Node 可使用 chunked transfer framing。

**API / 语法规则**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: JSON response boundary</span>
  </div>

```js
const body = JSON.stringify({ ok: true });

response.writeHead(200, {
  "Content-Type": "application/json; charset=utf-8",
  "Content-Length": Buffer.byteLength(body)
});
response.end(body);
```
</div>

**机制证据链**

`GET /` → JS object 被 stringify 为 string → Node 计算 Buffer byte length 并写 response → HTTP status/headers/body 出站 → Express 未参与 → TypeScript 不证明序列化结果符合业务 DTO → 无输入验证 → 客户端按 JSON 解码。若长度使用字符数，违反“Content-Length 是 octet 数”的规则；含多字节字符时可能截断或导致协议解析异常。

**项目与学习路径关系 / 记忆模型**

Express `res.json()` 封装了常见 JSON 响应步骤，但协议边界不变。记住：值先编码成字节，Content-Type 再声明字节的解释方式。

<a id="section-9-7"></a>
### 9.7 status code decision model：200、201、204、400、401、403、404、409、422、500

**结论**

状态码应表达 HTTP 层面的处理结果，而不是随意映射内部异常。先判断成功/客户端错误/服务端错误，再选择更具体语义。

**本节解决的问题与技术意义**

稳定状态码让客户端决定是否读取数据、修正输入、重新认证或报告服务端故障。它也使测试能验证协议契约，而不依赖中文错误消息。

| 状态码 | 本章决策条件 | body |
| ---: | --- | --- |
| `200` | 读取或更新成功 | 返回结果 |
| `201` | `POST` 成功创建资源 | 返回新资源 |
| `204` | 删除成功且无需表示 | 不返回 body |
| `400` | message/JSON 语法无法解析 | 返回解析错误 |
| `401` | 缺少或无效认证 | 本章只讲语义，不实现认证 |
| `403` | 身份已知但无权限 | 本章只讲语义，不实现授权 |
| `404` | route 或资源不存在 | 返回稳定错误 code |
| `409` | 与当前资源状态冲突 | 返回冲突原因 |
| `422` | message 可解析，但字段不满足 schema | 返回 validation details |
| `500` | 未预期服务端故障 | 返回安全公开消息 |

**关键对照**

`400` 对应“连可供领域验证的输入都没形成”，例如坏 JSON；`422` 对应 JSON 已形成 JS value，但字段不合约束。`401` 是需要认证，`403` 是已知身份没有权限。不要为了隐藏资源存在性而机械套用；安全策略应在认证章节统一设计。

**机制证据链**

请求 → JS 得到解析结果/验证结果/仓储结果 → Node/Express 设置 `response.statusCode` → HTTP status line 出站 → Router 或 error middleware 选择分支 → TypeScript 可限制内部 outcome union，但不能知道远端输入 → Zod 区分合法/非法字段 → 客户端得到具体 `2xx/4xx/5xx`。若所有错误都回 `200`，违反 status 表达处理结果的协议语义；真实表现是监控和客户端必须解析 body 才知道失败。

**项目与学习路径关系 / 记忆模型**

`status-code-model.ts` 把 outcome 显式映射到 status。记住：语法坏用 400，语义字段坏用 422，资源无用 404，未知服务器故障用 500。

<a id="section-9-8"></a>
### 9.8 Express 是什么：routing and middleware framework，不是 runtime

**结论**

Express 是运行在 Node.js 上的 routing and middleware web framework。它组织 handler，不提供新的 JavaScript runtime，也不绕过 `node:http`。

**本节解决的问题与技术意义**

它解决“Express 是否替代 Node”的误解。边界清楚后，遇到 socket、stream、header 或 process 问题时不会只在 Router 层寻找原因。

**概念、边界与底层机制**

`express()` 创建 callable application；route 和 middleware 被登记到有序栈；`app.listen()` 最终建立 Node HTTP server 并监听端口。`req` 和 `res` 扩展 Node request/response 对象。Express 5 的当前 API 要求 Node 18+，本章不使用 Express 4 的旧 path-pattern 假设。

**API / 语法规则与对照**

原生 Node 需要手写 method/path 条件、body parser 和错误分派；Express 提供 `app.get`、`Router`、`express.json` 与 error middleware 约定。框架减少重复组织代码，但 status、Content-Type、request stream 和 response completion 仍受 HTTP/Node 约束。

**机制证据链**

`npm run express:routing` → JS 调用 `express()` 得到 app → Express 内部使用 Node HTTP 能力 → `listen()` 形成 HTTP server boundary → request 经过 registered layer stack → Router 匹配后 handler 写 response → TypeScript 通过 `@types/express` 检查调用形状但不验证输入 → 必要时 Zod 检查 → 客户端获得 response。把 Express 当 runtime 会违反分层认知；真实信号是无法解释底层 `EADDRINUSE`、stream 或 header 错误。

**项目与学习路径关系 / 记忆模型**

Express 位于 Node HTTP 之上、业务 handler 之下。记住：Node 拥有运行时和 server，Express 拥有有序分派约定。

<a id="section-9-9"></a>
### 9.9 Express route method、route path、route params、query

**结论**

Express endpoint 由 route method 与 route path 共同定义。命名 path segment 写入 `req.params`，`?` 后的 query 写入 `req.query`，query string 不属于 route path。

**本节解决的问题与技术意义**

它让资源定位、筛选和动作语义各归其位：`GET /notes/:noteId` 定位单个资源，`GET /notes?search=http` 筛选集合，`POST /notes` 创建资源。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/03-http-express/02-express-basics/express-routing.ts</span>
  </div>

```ts
notesRouter.get("/:noteId", (request, response) => {
  response.status(200).json({
    note: {
      id: request.params.noteId,
      title: "Route parameters are strings"
    }
  });
});
```
</div>

**逐行解释、执行过程与边界**

`get` 限定 HTTP method；`/:noteId` 声明动态 segment；匹配后 Express 生成 params 对象；handler 读取 string 并写 JSON。TypeScript 类型只说明 `noteId` 被视为 string，不保证它是 UUID。当前 Express 5 使用当前 `path-to-regexp` 行为，应使用明确参数语法，避免复制旧 Express 4 的字符串 pattern 教程。

**机制证据链**

`GET /notes/abc?view=full` → JS 读取 `req.params.noteId` 和 `req.query.view` → Node request 提供原始 method/URL → HTTP target 包含 path/query → Express route layer 匹配并填充对象 → TS 检查属性使用，不检查值格式 → Zod 可验证 UUID/query → handler 返回或 validation middleware 产生 422。误把 query 写入 route path 违反 Express route 边界；真实表现是相同 path 加 query 后匹配认知混乱。

**项目与学习路径关系 / 记忆模型**

Notes 项目对 `:id` 执行 Zod UUID 验证。记住：method 选动作，path 选资源，params 选具体成员，query 调整集合视图。

<a id="section-9-10"></a>
### 9.10 Express Router 与模块化路由边界

**结论**

`express.Router()` 创建可挂载的独立路由栈。app 负责跨资源组装，Router 负责一个资源边界内的 endpoints 和局部 middleware。

**本节解决的问题与技术意义**

它避免所有 route 堆在 `app.ts`，同时不引入超出本章的分层架构。模块化的目标是清楚的 URL/middleware ownership，而不是制造文件数量。

**概念、边界与底层机制**

Router 可像 app 一样注册 `get/post/patch/delete/use`。`app.use("/notes", notesRouter)` 建立 mount boundary；Router 内的 `"/"` 对应最终 `/notes`，`"/:id"` 对应 `/notes/:id`。请求进入 mount 后依次扫描 Router stack，匹配 method/path 的 layer 才执行。

**API / 语法规则**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: Router mount boundary</span>
  </div>

```ts
const notesRouter = Router();

notesRouter.get("/", listNotes);
notesRouter.get("/:id", getNote);

app.use("/notes", notesRouter);
```
</div>

**机制证据链**

`GET /notes/id` → JS app 与 Router 已持有 layer 列表 → Node request 进入 Express callback → HTTP method/path 是匹配输入 → app mount layer 转交 notes Router → Router route layer 转交 handler → TS 检查 handler 签名但不证明 params → validation middleware 可先缩窄输入 → response 返回。若 error/not-found middleware 挂在 Router 前面，违反“具体 route 先于兜底”的顺序；真实表现为所有请求提前 404。

**项目与学习路径关系 / 记忆模型**

`notes.routes.ts` 拥有 Notes endpoints，`app.ts` 只负责组装。记住：app 是入口 composition root，Router 是资源级 pipeline。

<a id="section-9-11"></a>
### 9.11 middleware 执行顺序：ordered request-response pipeline

**结论**

Express middleware 按注册顺序组成 pipeline。每个匹配 layer 获得同一组 request/response 对象，并选择结束响应、调用 `next()`，或把 error 交给错误链。

**本节解决的问题与技术意义**

顺序决定 parser 是否先于 route、route 是否先于 not-found、error handler 是否能接住错误。很多 Express bug 不是函数内容错，而是 layer 放错位置。

**概念、边界与底层机制**

Express 不会并行运行同一请求的普通 middleware stack。`next()` 将控制权交给下一个匹配 layer；当前函数返回并不等于自动继续。对象可被前层扩充，例如 parser 写入 `req.body`，validation 写入 `res.locals.validated`。

**执行过程与资源变化**

`express.json → notesRouter → notFound → errorMiddleware` 是项目顺序。成功 route 发送响应后不调用 `next()`；未匹配 Router 的请求继续到 not-found；`next(error)` 跳过普通 middleware，寻找四参数 error middleware。

**机制证据链**

`POST /notes` → parser 读取 body 并创建 JS object → Node request stream 被消费 → HTTP Content-Type 决定 parser 是否工作 → Express 从 parser layer 进入 validation/route layer → TS 只检查 middleware 调用类型 → Zod 在 route 前产生可信数据 → route 返回 201。若 Router 注册在 parser 前，违反“消费者依赖必须先建立”的顺序；真实信号是 `req.body` 为 `undefined` 或仍未解析。

**项目与学习路径关系 / 记忆模型**

`middleware-order.ts` 用日志显示顺序。记住：Express 应用不是目录树，而是按注册顺序执行的有条件函数链。

<a id="section-9-12"></a>
### 9.12 `next()`、short-circuit、hanging request

**结论**

普通 middleware 必须二选一：结束 request-response cycle，或调用 `next()`。直接响应是合法 short-circuit；既不响应又不 `next()` 会让请求挂起。

**本节解决的问题与技术意义**

它解释客户端为何一直 pending，以及为什么 `return` 本身不控制 Express pipeline。控制权移动由 `next` 或 response lifecycle 决定。

**API / 语法规则**

- `next()`：继续下一个普通匹配 layer。
- `next(error)`：进入错误处理分支。
- `next("route")`：跳过当前 route 剩余 handlers，属于特殊 Express 约定。
- `res.status(...).json(...)`：结束响应，通常不再调用 `next()`。

**对照与常见错误**

鉴权拒绝并返回 403 是 short-circuit；日志 middleware 记录后 `next()` 是继续；空 handler 既不写响应也不 `next()` 是挂起。发送响应后再 `next()` 可能让后续代码二次发送，触发 headers-sent 问题。

**机制证据链**

`GET /complete` → JS middleware 写日志 → Node request/response 对象保持同一 identity → HTTP response 尚未结束 → Express `next()` 移动 stack cursor → TS 不证明每条控制流都响应 → 无验证 → route `json()` 完成。`GET /hang` 中 cursor 不移动、response 不结束，违反 middleware 终止规则；真实识别方法是客户端 pending、日志停在某 layer 且 `headersSent` 为 false。

**项目与学习路径关系 / 记忆模型**

`middleware-order.ts` 并列展示 complete、short-circuit、hang。记住：`next` 移动控制权，response method 结束消息，普通 `return` 只结束 JS 函数。

<a id="section-9-13"></a>
### 9.13 `express.json()`：body parsing、limit、content type、untrusted `req.body`

**结论**

`express.json()` 是内置 middleware：只对匹配的 Content-Type 消费请求 body，把 JSON 解析结果放入 `req.body`，并可用 `limit` 限制载荷大小。解析成功不等于数据可信。

**本节解决的问题与技术意义**

它把原生 stream consumption 封装成可复用层，同时明确 body parser 不是 validation、authorization 或完整安全方案。

**概念、边界与底层机制**

parser 在 route 前运行，读取 `IncomingMessage` body stream，处理编码/压缩选项、累计字节、执行 JSON parse。`limit: "32kb"` 控制解析器接受的最大 body，降低单请求内存风险，但不替代 rate limit、timeout 或代理配置。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/app.ts</span>
  </div>

```ts
app.use(express.json({ limit: "32kb" }));
app.use("/notes", notesRouter);
```
</div>

**机制证据链**

带 `application/json` 的 `POST /notes` → parser 累积 bytes 并创建 JS value → Node `IncomingMessage` readable 被消费 → Content-Type/body 是 HTTP 输入边界 → Express parser 调用下一个 layer → TS 中 `req.body` 的声明不会约束远端 → Zod 必须验证 → 合法值进入 route；坏 JSON 进入 400 error path。若把 parser 放在 route 后或 Content-Type 错，违反 parser matching/order 条件；真实表现为 body 未定义或未解析。

**项目与学习路径关系 / 记忆模型**

官方文档明确把 `req.body` 视为 user-controlled input。记住：parser 把 bytes 变成 value；validator 才把 unknown value 变成可信数据。

<a id="section-9-14"></a>
### 9.14 TypeScript 为什么不能验证 HTTP body

**结论**

TypeScript 类型在编译阶段被擦除，网络客户端不会读取你的 type。给 `req.body` 写泛型或断言只改变编译器视角，不会检查运行时对象。

**本节解决的问题与技术意义**

它阻止最危险的类型错觉：代码能通过 `tsc`，并不意味着外部 JSON 具有 `title: string`。HTTP 是信任边界，必须用运行时代码验证。

**概念、边界与底层机制**

TypeScript type system 检查源码中的关系；发射/执行的是 JavaScript。`as CreateNoteInput` 不生成 `typeof`、长度或 UUID 检查。Express 类型定义描述 API surface，却无法控制任意客户端发送的 bytes。最诚实的入口类型是 `unknown`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: assertion is not validation</span>
  </div>

```ts
const unsafeInput = request.body as CreateNoteInput;
const input: unknown = request.body;
const result = createNoteSchema.safeParse(input);
```
</div>

**对照与错误**

类型断言版本和运行时验证版本都可能通过 `tsc`；区别只会在执行阶段出现。若直接调用 `unsafeInput.title.trim()`，真实项目中的信号是线上 `TypeError` 出现在看似类型安全的 handler。

**机制证据链**

攻击者发送 `{ "title": 42 }` → JSON parser 创建 number 属性 → Node/Express 完成解析 → HTTP body 已跨信任边界 → assertion 在运行时什么也不做 → `tsc` 仍可能通过 → Zod 才会拒绝 → 返回 422。错误版本违反“静态声明不能证明外部值”的规则。

**项目与学习路径关系 / 记忆模型**

这连接 TypeScript 和 Node runtime 边界。记住：TypeScript 保护你写的代码关系，validator 检查别人送进进程的值。

<a id="section-9-15"></a>
### 9.15 runtime validation：unknown input 到 trusted data

**结论**

runtime validation 在 HTTP 边界接收 `unknown`，用 schema 检查结构和约束，并只把成功分支的 parsed data 交给业务代码。Zod `safeParse()` 返回可判别的 success/failure 结果，不抛异常。

**本节解决的问题与技术意义**

它将输入错误从深层 `TypeError` 提前为稳定的 422 DTO，也让 domain/repository 不必反复防御 title 类型和长度。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/03-http-express/03-api-design/request-validation.ts</span>
  </div>

```ts
const input: unknown = request.body;
const result = createNoteSchema.safeParse(input);

if (!result.success) {
  response.status(422).json({
    ok: false,
    error: {
      code: "VALIDATION_ERROR",
      message: "Request validation failed.",
      details: result.error.issues
    }
  });
  return;
}

const validInput = result.data;
```
</div>

**逐行解释与边界**

入口显式标为 unknown；schema 同时存在于运行时；`safeParse` 运行检查；`success` 字段帮助 TypeScript narrowing；失败分支读取 issues，成功分支读取 schema output。Zod 推导静态类型，但静态推导和运行时检查仍是两个机制。

**机制证据链**

非法 `POST` → JS unknown value 进入 schema → Node 已完成 body stream → HTTP 输入现在是 parsed value → Express validation layer 暂停 route 转交 → TS 根据 `success` 缩窄 union → Zod 检查 title/content → error middleware/handler 返回 422。若绕过 success 分支读取 input，违反“只使用 parsed output”的规则；真实项目表现为 validation 存在但业务仍使用原始 `req.body`。

**项目与学习路径关系 / 记忆模型**

项目把 parsed data 放入 `res.locals.validated`。记住：unknown in，checked data out；失败留在边界，成功才进入领域逻辑。

<a id="section-9-16"></a>
### 9.16 unified success response

**结论**

除无 body 的 `204` 外，成功响应统一为 `{ ok: true, data: ... }`。统一 envelope 稳定顶层判断，`data` 内仍保留 endpoint 特定形状。

**本节解决的问题与技术意义**

它避免有的 endpoint 返回裸数组、有的返回 `{ result }`、有的返回 `{ success }`。客户端可先判断 `ok`，再按 endpoint DTO 读取 data。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/shared/send-response.ts</span>
  </div>

```ts
export function sendResponse<T>(
  response: Response,
  statusCode: number,
  data: T
): Response<SuccessResponse<T>> {
  return response.status(statusCode).json({
    ok: true,
    data
  });
}
```
</div>

**底层机制与规则**

generic `T` 保留调用点数据类型；Express `status().json()` 设置 status、Content-Type 并序列化 envelope。TypeScript 检查内部构造，但 response 到达客户端后仍只是 bytes。`204` 按协议语义不发送 body，因此 delete route 直接 `status(204).end()`。

**机制证据链**

成功 GET → repository 返回 Note[] JS value → Node response 最终写出 JSON → HTTP status/body 出站 → Express `json()` 完成响应 → TS generic 检查 data 形状的传播 → 无新验证 → 客户端得到 `{ok:true,data}`。若对 204 调 `json()`，违反 no-content 语义；真实表现是 body 被丢弃或客户端契约混乱。

**项目与学习路径关系 / 记忆模型**

helper 统一协议外壳，不承担业务映射。记住：status 表达结果类别，envelope 表达可预测形状，data 表达 endpoint 内容。

<a id="section-9-17"></a>
### 9.17 unified error response and typed HTTP error

**结论**

错误响应统一为 `{ ok: false, error: { code, message, details } }`。`HttpError` 把预期 HTTP 失败携带到集中 error middleware；未知异常对客户端使用安全消息，内部细节只记录在服务端。

**本节解决的问题与技术意义**

它分离内部 error object 和公开 DTO，防止 stack、路径、凭据或依赖细节泄露，同时给客户端稳定机器码。

**概念、边界与底层机制**

`throw new HttpError(404, ...)` 是 JS exception；Express error pipeline 是框架约定；status/code/message 是 HTTP/API contract。自定义 class 不自动发送响应，必须由 error middleware 映射。`details` 对 validation 可包含字段问题，对其他错误可为 `null`。

**API / 语法规则**

预期错误使用稳定 code，例如 `NOTE_NOT_FOUND`；未知错误记录原始 object 后返回 `INTERNAL_ERROR`。不要把 `error.stack`、数据库错误、token 或本机路径放进 client body。

**机制证据链**

查找不存在 id → repository 返回 `null` → route 创建 `HttpError` → Node response 尚未发 headers → HTTP 失败尚未编码 → Express 捕获 throw 并进入 error layer → TS 检查 class 字段但不决定公开安全性 → params 已经 Zod 验证 → middleware 返回 404 DTO。若直接 `res.json(error)`，违反内部/公开信息边界；真实信号是响应出现 stack、SQL、绝对路径或 secret。

**项目与学习路径关系 / 记忆模型**

`http-error.ts` 是传递载体，`error-middleware.ts` 是唯一公开映射点。记住：内部异常用于诊断，公开错误用于协议。

<a id="section-9-18"></a>
### 9.18 Express error middleware：四参数签名、注册位置、headersSent

**结论**

Express error middleware 必须保留四参数 `(err, req, res, next)`，并在普通 middleware 与 routes 之后注册。若 `res.headersSent` 已为 true，应 `next(err)` 委托给默认错误处理器。

**本节解决的问题与技术意义**

它保证同步 `next(error)`、Express 5 async rejection 和 not-found error 都汇入一个响应出口，同时避免已开始响应后再次写 headers。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/shared/error-middleware.ts</span>
  </div>

```ts
export const errorMiddleware: ErrorRequestHandler = (
  error,
  _request,
  response,
  next
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  response.status(500).json({
    ok: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "Internal server error.",
      details: null
    }
  });
};
```
</div>

**逐行解释与执行过程**

四参数让 Express 识别函数类型；`headersSent` 检查 response 状态；委托避免自定义 handler 二次写入；未发送时才构建 DTO。即使不使用 `_request`，也不能删除参数使函数退化为普通 middleware。

**机制证据链**

route `throw` → JS error value 被创建 → Node response 状态可由 `headersSent` 观察 → HTTP headers 未发时仍可选择 status → Express 跳过普通 layer 到四参数 layer → TS `ErrorRequestHandler` 检查签名 → validation error 可携带 details → 返回 4xx/5xx。错误 handler 放在 routes 前违反注册顺序；真实表现为错误绕过自定义 DTO 或落入默认 HTML/连接关闭行为。

**项目与学习路径关系 / 记忆模型**

记住：四参数是识别标志，最后注册是捕获范围，`headersSent` 是能否安全改写响应的边界。

<a id="section-9-19"></a>
### 9.19 Express 5 async handler error behavior

**结论**

Express 5 会对返回 Promise 的 route handler/middleware 自动处理 throw 或 rejection，并调用 `next(value)`。普通 async route 不再需要仅为转发错误而写 `try/catch(next)` wrapper。

**本节解决的问题与技术意义**

它消除旧教程中的常见样板，并标记 Express 4/5 的版本边界。业务若能恢复仍可 catch；只是为了交给错误 middleware 时让 rejection 自然传播。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/03-http-express/02-express-basics/async-handler-error.ts</span>
  </div>

```ts
app.get("/async-failure", async (_request, _response) => {
  await loadRemoteNote();
});
```
</div>

**执行过程、对照与资源变化**

handler 调用 async function 并返回 Promise；await 的 Promise rejection 恢复 JS continuation 并使 handler Promise rejected；Express 5 观察该 Promise，自动推进 error stack。若 response 已部分写出后才 reject，error middleware 必须按 headers-sent 规则委托。

**机制证据链**

`GET /async-failure` → JS 创建 handler Promise/Error → Node event loop 调度 Promise continuation → HTTP response 仍未完成 → Express 5 观察 rejection 并等效 `next(error)` → TS 检查 Promise 返回类型但不阻止运行时 reject → 无验证 → error middleware 返回 500。复制 Express 4 风格 wrapper 后又手动重复 `next` 可能违反“错误只传递一次”；真实信号是 handler 重复执行错误流程或 headers-sent 日志。

**项目与学习路径关系 / 记忆模型**

Notes repository 方法返回 Promise，route 直接 await 并 throw `HttpError`。记住版本边界：Express 5 async rejection 自动进 error pipeline。

<a id="section-9-20"></a>
### 9.20 REST API design for Notes CRUD

**结论**

REST 设计先识别资源集合 `/notes` 和成员 `/notes/:id`，再用 HTTP method 表达 CRUD。URL 使用名词，成功 status 与操作结果一致。

**本节解决的问题与技术意义**

它避免 `/createNote`、`/getAllNotes` 等 RPC 式路径膨胀，并让 method、idempotency 预期、status 和 body 形成可测试契约。

| Endpoint | 行为 | 成功结果 |
| --- | --- | --- |
| `GET /notes` | list | `200` + notes |
| `POST /notes` | create | `201` + note |
| `GET /notes/:id` | read one | `200` + note |
| `PATCH /notes/:id` | partial update | `200` + note |
| `DELETE /notes/:id` | delete | `204` |

**边界与底层机制**

Router 只负责 HTTP adapter；Zod 负责 params/body boundary；repository 负责 Map 操作；response helper 负责 DTO。内存 repository 意味着数据与进程同寿命，重启丢失，这不是数据库替代品。

**机制证据链**

`PATCH /notes/:id` → params/body JS values → Node request message → HTTP method/path/body 定义操作 → Express Router 依次运行两个 validators 和 async handler → TS 推导 `UpdateNoteInput` 但不验证 wire data → Zod 保证 UUID 且至少一个字段 → repository 更新 Map → 200 或 404。若 PATCH 允许空对象，违反“更新必须包含变更”的领域输入规则；真实表现为无意义更新时间变化或假成功。

**项目与学习路径关系 / 记忆模型**

本章只实现 resource boundary，不引入 database/auth。记住：collection path + member path，method 表达动作，status 表达结果。

<a id="section-9-21"></a>
### 9.21 Chapter integration: typed-express-notes-api

**结论**

最终项目把原生 HTTP 心智模型映射到 Express 结构：`server.ts` 拥有 listen lifecycle，`app.ts` 组装 pipeline，Router 选择 endpoint，Zod 建立信任边界，repository 管理进程内状态，error middleware 统一失败出口。

**本节解决的问题与技术意义**

它验证各机制能否协作，而不是把代码全部塞进一个文件。每个边界都有单一、可测试的职责，但不引入超出章节的架构层。

**完整请求执行过程**

`POST /notes` 的 JSON bytes 进入 Node server；Express JSON parser 消费 request stream；validation middleware 对 unknown body 执行 Zod；成功数据存入 `res.locals.validated`；async route 调 repository；Map 增加 Note；`sendResponse` 写 201 JSON。任一步 throw/reject 会跳到最后的 error middleware。

**资源与生命周期**

server handle 使进程存活；每次 request/response 有独立 message lifecycle；Map 与进程同寿命；测试直接导入 app，不调用 listen，因此 Supertest 管理临时 server boundary，测试结束不会遗留长期监听端口。

**机制证据链**

`npm test` 发起 Supertest request → JS 创建 input、Note、DTO → Node HTTP server/message APIs 被 Supertest/Express 使用 → HTTP method/path/headers/body/status 可观察 → parser → Router → validator → handler → error/not-found transition → TS 编译检查内部连接 → Zod 检查 params/body → assertions 观察 2xx/4xx。若 `app.ts` 自己 listen，违反 app/server lifecycle 分离；真实测试表现为端口占用、进程不退出或难以并行。

**对照、常见错误与最终记忆模型**

单文件版本也能运行，但 parser、route、storage、error 的 ownership 混杂，测试难隔离。当前结构仍是学习项目，不是生产架构。记住整章主线：bytes → message → parser → validator → route → repository → DTO → message。

## 10. API 与规则索引

| API / 规则 | 层级 | 核心语义 |
| --- | --- | --- |
| `http.createServer(listener)` | Node platform | 创建 `http.Server`，listener 连接 `'request'` event |
| `server.listen(port, host)` | Node platform / OS | 绑定地址并产生活动 server handle |
| `IncomingMessage` | Node platform / Stream | request 元数据 + readable body |
| `response.writeHead()` | Node HTTP | 设置 status 与 headers |
| `response.write()` | Node HTTP / Stream | 写 body chunk；`false` 表示背压 |
| `response.end()` | Node HTTP | 标记响应完成，每次响应必须调用 |
| `new URL(target, base)` | Web-standard Node API | 分离 pathname 与 search params |
| `express()` | Express | 创建 application |
| `Router()` | Express | 创建可挂载的 route/middleware stack |
| `app.use()` / `router.use()` | Express | 按注册顺序挂载 middleware |
| `app.METHOD()` / `router.METHOD()` | Express | 注册 method + path endpoint |
| `next()` | Express | 继续普通 pipeline |
| `next(error)` | Express | 进入 error pipeline |
| `express.json({ limit })` | Express | 按 Content-Type 解析 JSON body |
| `safeParse(unknown)` | Zod | 返回 success/failure union |
| `response.status().json()` | Express / HTTP | 设置 status、JSON Content-Type 并结束响应 |
| `res.headersSent` | Node/Express state | 判断 headers 是否已提交 |

## 11. 常见错误对照表

| 现象 | 违反的规则 | 正确方向 |
| --- | --- | --- |
| 客户端一直 pending | middleware 未响应也未 `next()`，或原生响应未 `end()` | 逐层检查控制流与 `writableEnded` |
| `ERR_HTTP_HEADERS_SENT` | headers/body 已开始后再次发送 | 单一响应出口；error handler 检查 `headersSent` |
| `req.body` 是 `undefined` | parser 顺序或 Content-Type 不匹配 | parser 放在 Router 前并发送正确 Content-Type |
| `title.trim is not a function` | 把 user-controlled body 当成已验证类型 | 从 `unknown` 开始并使用 schema output |
| query 加入后原生 route 404 | 直接比较完整 `request.url` | 用 `URL.pathname` 匹配，单独读 query |
| 所有错误都是 `500` | 未区分客户端输入、资源状态与服务故障 | 建立 outcome-to-status 模型 |
| 所有响应都是 `200` | 把失败只编码进 body | 同时使用正确 HTTP status 和错误 DTO |
| 自定义 error middleware 不执行 | 不是四参数或注册过早 | 保留四参数并最后注册 |
| async error 未按预期处理 | 混用 Express 4 教程或未返回/await Promise | 明确 Express 5，并让 handler Promise 可观察 |
| 测试进程不退出 | 被测 app 在 import 时监听端口 | 分离 `app.ts` 与 `server.ts` |
| 内存持续增长 | 无 body limit 或忽略 response 背压 | 限制输入，`write(false)` 后等 `drain` |

## 12. 调试与验证方法

**先按边界定位**

1. 连接层：端口是否监听，是否出现 `EADDRINUSE`。
2. HTTP 层：method、path、Content-Type、status 是否正确。
3. parser 层：body 是否被消费、大小与 JSON 是否有效。
4. validation 层：issues 对应哪个 path。
5. route 层：哪个 middleware 最后打印日志，是否调用 `next()`。
6. response 层：`headersSent`、`writableEnded` 是否符合预期。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
curl -i http://127.0.0.1:3200/notes
curl -i -X POST http://127.0.0.1:3200/notes -H "Content-Type: application/json" -d "{\"title\":\"HTTP\",\"content\":\"Trace the boundary.\"}"
```
</div>

`-i` 让 status line 和 headers 可见。调试时不要只看 body；错误 status、Content-Type 或空响应同样是协议证据。对 hanging request，在每个 middleware 入口和 `next()` 前后临时记录短标签，比盲目增加 timeout 更有效。

## 13. 分项练习说明

### 13.1 原生 HTTP

- `native-json-server.js`：对比 request metadata、body stream、JSON parse 与 JSON response。
- `native-routing-server.js`：分别触发 200、404、405，确认 query 不参与 pathname 匹配。
- `native-stream-response.js`：使用能显示流式输出的客户端，观察 chunk 时间间隔与最终结束。

### 13.2 Express 基础

- `express-routing.ts`：分别访问集合、成员和创建 endpoint，观察 params/query/body 来源。
- `middleware-order.ts`：对比 `/complete`、`/short-circuit`、`/hang` 的日志和客户端状态。
- `error-middleware.ts`：用 `known` 和未知 id 对比普通链与 error chain。
- `async-handler-error.ts`：确认无需手写 forwarding wrapper 即可进入 Express 5 error middleware。

### 13.3 API 设计

- `status-code-model.ts`：为每个状态写一个具体请求场景，并解释 400/422、401/403。
- `unified-error-response.ts`：检查公开 DTO 不含 stack 或内部凭据。
- `request-validation.ts`：分别发送合法 body、空 title、错误类型和坏 JSON，记录 parser 与 validator 的不同失败点。

## 14. 最终迷你项目

### 14.1 项目目标与边界

`typed-express-notes-api` 用一个内存型 Notes 资源整合本章机制。目标不是模拟完整生产系统，而是让 HTTP、Express 5、TypeScript、Zod、错误链和测试在同一执行路径中可观察。

项目包含 Notes CRUD、统一成功/错误结构、body/params 验证、Express 5 async error flow、内存 repository 和 API tests。它不包含持久化、身份、缓存、容器或部署。Map 中的数据随进程退出而消失。

### 14.2 项目结构与职责

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api</span>
  </div>

```txt
typed-express-notes-api/
├── package.json
├── tsconfig.json
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── notes/
│   │   ├── notes.types.ts
│   │   ├── notes.schema.ts
│   │   ├── notes.repository.ts
│   │   └── notes.routes.ts
│   └── shared/
│       ├── http-error.ts
│       ├── send-response.ts
│       ├── validate-request.ts
│       ├── not-found.ts
│       └── error-middleware.ts
├── tests/
│   └── notes-api.test.ts
└── README.md
```
</div>

`app.ts` 是 composition root；`server.ts` 拥有端口生命周期；`notes.routes.ts` 是 HTTP adapter；schema 建立信任边界；repository 隔离进程内状态；shared 文件统一 cross-route HTTP 规则；测试从外部 request/response 观察行为。

### 14.3 完整项目代码

以下代码构成可运行项目。相对导入使用 `.js` 扩展名，因为 TypeScript `NodeNext` 按 Node ESM 运行时规则解析最终 specifier。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/package.json</span>
  </div>

```json
{
  "name": "typed-express-notes-api",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "start": "tsx src/server.ts",
    "typecheck": "tsc --noEmit",
    "test": "tsx --test tests/**/*.test.ts"
  },
  "engines": {
    "node": ">=22.0.0"
  },
  "dependencies": {
    "express": "5.2.1",
    "zod": "4.4.3"
  },
  "devDependencies": {
    "@types/express": "5.0.6",
    "@types/node": "26.1.0",
    "@types/supertest": "7.2.0",
    "supertest": "7.2.2",
    "tsx": "4.22.5",
    "typescript": "5.9.3"
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/tsconfig.json</span>
  </div>

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "noEmit": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "src/**/*.ts",
    "tests/**/*.ts"
  ]
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/notes/notes.types.ts</span>
  </div>

```ts
export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ErrorDetail = {
  path: string;
  message: string;
};

export type SuccessResponse<T> = {
  ok: true;
  data: T;
};

export type ErrorResponse = {
  ok: false;
  error: {
    code: string;
    message: string;
    details: unknown;
  };
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/notes/notes.schema.ts</span>
  </div>

```ts
import { z } from "zod";

export const noteIdParamsSchema = z.object({
  id: z.uuid()
});

export const createNoteSchema = z.object({
  title: z.string().trim().min(1).max(120),
  content: z.string().trim().max(5000)
});

export const updateNoteSchema = createNoteSchema
  .partial()
  .refine((value) => value.title !== undefined || value.content !== undefined, {
    message: "At least one field must be provided."
  });

export type NoteIdParams = z.infer<typeof noteIdParamsSchema>;
export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
```
</div>

schema 同时承担运行时检查和静态类型推导；route 只使用 `safeParse` 成功分支产生的数据。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/notes/notes.repository.ts</span>
  </div>

```ts
import { randomUUID } from "node:crypto";
import type {
  CreateNoteInput,
  UpdateNoteInput
} from "./notes.schema.js";
import type { Note } from "./notes.types.js";

class NotesRepository {
  readonly #notes = new Map<string, Note>();

  async list(): Promise<Note[]> {
    return [...this.#notes.values()];
  }

  async findById(id: string): Promise<Note | null> {
    return this.#notes.get(id) ?? null;
  }

  async create(input: CreateNoteInput): Promise<Note> {
    const timestamp = new Date().toISOString();
    const note: Note = {
      id: randomUUID(),
      title: input.title,
      content: input.content,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    this.#notes.set(note.id, note);
    return note;
  }

  async update(id: string, input: UpdateNoteInput): Promise<Note | null> {
    const current = this.#notes.get(id);

    if (!current) {
      return null;
    }

    const updated: Note = {
      ...current,
      ...input,
      updatedAt: new Date().toISOString()
    };

    this.#notes.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.#notes.delete(id);
  }

  reset(): void {
    this.#notes.clear();
  }
}

export const notesRepository = new NotesRepository();
```
</div>

repository 的 async 接口让 route 具备未来 I/O 形状，但当前 Map 操作仍在进程内同步完成；这不是持久化保证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/shared/http-error.ts</span>
  </div>

```ts
export class HttpError extends Error {
  constructor(
    readonly statusCode: number,
    readonly code: string,
    message: string,
    readonly details: unknown = null
  ) {
    super(message);
    this.name = "HttpError";
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/shared/send-response.ts</span>
  </div>

```ts
import type { Response } from "express";
import type { SuccessResponse } from "../notes/notes.types.js";

export function sendResponse<T>(
  response: Response,
  statusCode: number,
  data: T
): Response<SuccessResponse<T>> {
  return response.status(statusCode).json({
    ok: true,
    data
  });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/shared/validate-request.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import type { ErrorDetail } from "../notes/notes.types.js";
import { HttpError } from "./http-error.js";

export type ValidationTarget = "body" | "params" | "query";

export const validateRequest = (
  schema: ZodType,
  target: ValidationTarget
): RequestHandler => {
  return (request, response, next) => {
    const input: unknown = request[target];
    const result = schema.safeParse(input);

    if (!result.success) {
      const details: ErrorDetail[] = result.error.issues.map((issue) => ({
        path: [target, ...issue.path].join("."),
        message: issue.message
      }));

      next(
        new HttpError(
          422,
          "VALIDATION_ERROR",
          "Request validation failed.",
          details
        )
      );
      return;
    }

    response.locals.validated ??= {};
    response.locals.validated[target] = result.data;
    next();
  };
};
```
</div>

validation middleware 不修改 `req.params` 或 `req.query`，而是把 schema output 放入 `res.locals.validated`，让原始输入与可信输入可区分。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/shared/not-found.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { HttpError } from "./http-error.js";

export const notFound: RequestHandler = (request, _response, next) => {
  next(
    new HttpError(
      404,
      "ROUTE_NOT_FOUND",
      `Route ${request.method} ${request.originalUrl} was not found.`
    )
  );
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/shared/error-middleware.ts</span>
  </div>

```ts
import type { ErrorRequestHandler } from "express";
import type { ErrorResponse } from "../notes/notes.types.js";
import { HttpError } from "./http-error.js";

function isJsonParseError(error: unknown): boolean {
  return (
    error instanceof SyntaxError &&
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === 400
  );
}

export const errorMiddleware: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  next
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  let statusCode = 500;
  let code = "INTERNAL_ERROR";
  let message = "Internal server error.";
  let details: unknown = null;

  if (error instanceof HttpError) {
    statusCode = error.statusCode;
    code = error.code;
    message = error.message;
    details = error.details;
  } else if (isJsonParseError(error)) {
    statusCode = 400;
    code = "INVALID_JSON";
    message = "Request body must contain valid JSON.";
  } else {
    console.error(error);
  }

  const body: ErrorResponse = {
    ok: false,
    error: { code, message, details }
  };

  response.status(statusCode).json(body);
};
```
</div>

未知 error 只记录在服务端；公开 body 不回传 stack。JSON 语法失败和 schema 失败分别映射到 400 与 422。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/notes/notes.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import {
  createNoteSchema,
  noteIdParamsSchema,
  updateNoteSchema,
  type CreateNoteInput,
  type NoteIdParams,
  type UpdateNoteInput
} from "./notes.schema.js";
import { notesRepository } from "./notes.repository.js";
import { HttpError } from "../shared/http-error.js";
import { sendResponse } from "../shared/send-response.js";
import { validateRequest } from "../shared/validate-request.js";

export const notesRouter = Router();

notesRouter.get("/", async (_request, response) => {
  const notes = await notesRepository.list();
  return sendResponse(response, 200, { notes });
});

notesRouter.post(
  "/",
  validateRequest(createNoteSchema, "body"),
  async (_request, response) => {
    const input = response.locals.validated.body as CreateNoteInput;
    const note = await notesRepository.create(input);
    return sendResponse(response, 201, { note });
  }
);

notesRouter.get(
  "/:id",
  validateRequest(noteIdParamsSchema, "params"),
  async (_request, response) => {
    const { id } = response.locals.validated.params as NoteIdParams;
    const note = await notesRepository.findById(id);

    if (!note) {
      throw new HttpError(404, "NOTE_NOT_FOUND", "Note not found.");
    }

    return sendResponse(response, 200, { note });
  }
);

notesRouter.patch(
  "/:id",
  validateRequest(noteIdParamsSchema, "params"),
  validateRequest(updateNoteSchema, "body"),
  async (_request, response) => {
    const { id } = response.locals.validated.params as NoteIdParams;
    const input = response.locals.validated.body as UpdateNoteInput;
    const note = await notesRepository.update(id, input);

    if (!note) {
      throw new HttpError(404, "NOTE_NOT_FOUND", "Note not found.");
    }

    return sendResponse(response, 200, { note });
  }
);

notesRouter.delete(
  "/:id",
  validateRequest(noteIdParamsSchema, "params"),
  async (_request, response) => {
    const { id } = response.locals.validated.params as NoteIdParams;
    const deleted = await notesRepository.delete(id);

    if (!deleted) {
      throw new HttpError(404, "NOTE_NOT_FOUND", "Note not found.");
    }

    response.status(204).end();
  }
);
```
</div>

Router 展示三条控制流：验证失败调用 `next(HttpError)`，资源不存在从 async handler throw，成功则写入一次响应。Express 5 把 async throw 自动转交 error middleware。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/app.ts</span>
  </div>

```ts
import express from "express";
import { notesRouter } from "./notes/notes.routes.js";
import { errorMiddleware } from "./shared/error-middleware.js";
import { notFound } from "./shared/not-found.js";

export const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));
app.use("/notes", notesRouter);
app.use(notFound);
app.use(errorMiddleware);
```
</div>

组装顺序就是请求可走的顺序：parser → resource Router → unmatched route → error mapper。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/src/server.ts</span>
  </div>

```ts
import { app } from "./app.js";

const port = Number.parseInt(process.env.PORT ?? "3200", 10);

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`Typed notes API listening on http://127.0.0.1:${port}`);
});

server.on("error", (error) => {
  console.error("Server startup failed.", error);
  process.exitCode = 1;
});
```
</div>

只有启动入口调用 `listen()`。设置 `process.exitCode` 允许当前栈和必要清理自然结束；本章不展开完整 graceful shutdown。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-express-notes-api/tests/notes-api.test.ts</span>
  </div>

```ts
import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import request from "supertest";
import { app } from "../src/app.js";
import { notesRepository } from "../src/notes/notes.repository.js";

describe("typed notes API", () => {
  beforeEach(() => {
    notesRepository.reset();
  });

  it("creates and lists a note", async () => {
    const createResponse = await request(app)
      .post("/notes")
      .send({ title: "HTTP boundaries", content: "Validate at runtime." })
      .expect(201);

    assert.equal(createResponse.body.ok, true);
    assert.equal(createResponse.body.data.note.title, "HTTP boundaries");

    const listResponse = await request(app).get("/notes").expect(200);

    assert.equal(listResponse.body.ok, true);
    assert.equal(listResponse.body.data.notes.length, 1);
  });

  it("gets and updates a note by id", async () => {
    const createResponse = await request(app)
      .post("/notes")
      .send({ title: "Initial title", content: "Initial content" })
      .expect(201);
    const noteId = createResponse.body.data.note.id as string;

    const getResponse = await request(app)
      .get(`/notes/${noteId}`)
      .expect(200);
    assert.equal(getResponse.body.data.note.id, noteId);

    const updateResponse = await request(app)
      .patch(`/notes/${noteId}`)
      .send({ title: "Updated title" })
      .expect(200);
    assert.equal(updateResponse.body.data.note.title, "Updated title");
  });

  it("deletes a note and then reports it as missing", async () => {
    const createResponse = await request(app)
      .post("/notes")
      .send({ title: "Disposable", content: "Delete this note." })
      .expect(201);
    const noteId = createResponse.body.data.note.id as string;

    await request(app).delete(`/notes/${noteId}`).expect(204);

    const missingResponse = await request(app)
      .get(`/notes/${noteId}`)
      .expect(404);
    assert.deepEqual(missingResponse.body, {
      ok: false,
      error: {
        code: "NOTE_NOT_FOUND",
        message: "Note not found.",
        details: null
      }
    });
  });

  it("returns structured validation details", async () => {
    const response = await request(app)
      .post("/notes")
      .send({ title: "", content: "Invalid title" })
      .expect(422);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "VALIDATION_ERROR");
    assert.equal(response.body.error.details[0].path, "body.title");
  });

  it("rejects malformed ids before repository lookup", async () => {
    const response = await request(app).get("/notes/not-a-uuid").expect(422);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "VALIDATION_ERROR");
    assert.equal(response.body.error.details[0].path, "params.id");
  });

  it("returns a unified response for malformed JSON", async () => {
    const response = await request(app)
      .post("/notes")
      .set("Content-Type", "application/json")
      .send('{"title":')
      .expect(400);

    assert.deepEqual(response.body, {
      ok: false,
      error: {
        code: "INVALID_JSON",
        message: "Request body must contain valid JSON.",
        details: null
      }
    });
  });

  it("returns a unified response for unknown routes", async () => {
    const response = await request(app).get("/unknown").expect(404);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "ROUTE_NOT_FOUND");
  });
});
```
</div>

测试在每个 case 前清空 repository，避免顺序依赖；它们断言 HTTP status 与 DTO，而不只断言内部函数返回值。

### 14.4 运行、测试与生命周期

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
cd mini-projects/typed-express-notes-api
npm install
npm run typecheck
npm test
npm run dev
```
</div>

`typecheck` 观察静态连接；`test` 观察真实 HTTP adapter 行为；`dev` 启动长期 server handle。开发服务器启动后，可用 `curl -i` 依次创建、读取、更新和删除 Note。进程重启后列表为空，这是内存 repository 的明确生命周期。

`npm install` 按 `package.json` 和 lockfile 解析依赖树；命名 runtime packages 属于 `dependencies`，TypeScript、types、tsx 与 Supertest 属于 `devDependencies`。`private: true` 防止把学习项目误发布到 npm registry。

### 14.5 失败路径与可扩展方向

主要失败路径：

- 坏 JSON 在 parser 阶段成为 `400 INVALID_JSON`。
- 合法 JSON 但 schema 不符成为 `422 VALIDATION_ERROR`。
- UUID 合法但资源不存在成为 `404 NOTE_NOT_FOUND`。
- path 未匹配成为 `404 ROUTE_NOT_FOUND`。
- 未知 exception 记录在服务端并公开为 `500 INTERNAL_ERROR`。
- 已发送 headers 后的 error 委托默认 handler，避免再次写响应。

可在后续章节扩展 repository 持久化、认证/授权、分页、并发冲突、日志与 graceful shutdown；这些扩展必须保持当前 HTTP 输入验证和错误公开边界，而不是绕过它们。

## 15. 知识迁移与真实项目场景

**迁移到数据库时**

替换 repository 实现，不应让 route 直接拼 SQL。数据库 unique violation 可映射为 409，连接故障保留为内部 500；Zod HTTP schema 不替代数据库约束。

**迁移到认证时**

认证 middleware 应在受保护 Router 前运行：缺失/无效凭据通常是 401，已认证但无权限通常是 403。不要把 token 或验证细节写入公开 error details。

**迁移到文件或流式响应时**

仍应尊重 response backpressure、headers-first 和 end/cleanup lifecycle。Express `res` 没有取消 Node writable 语义。

**迁移到代理或部署环境时**

host、protocol、client IP 和 body limit 可能受反向代理影响，必须按部署文档校准。当前 localhost 示例不能直接当作完整生产安全配置。

## 16. 本章复盘任务

1. 不看代码画出原生 `POST /echo` 从 bytes 到 JSON response 的链。
2. 说明 `createServer()`、`listen()` 和 `'request'` event 的时间关系。
3. 写出 request body 解析、runtime validation、domain use 三个不同阶段。
4. 用一个例子分别解释 400/422 与 401/403。
5. 说明为什么 middleware 的 `return` 不等于 `next()`。
6. 解释 Express 5 async rejection 如何到达四参数 error middleware。
7. 从 `POST /notes` 追踪 `res.locals.validated.body` 的来源。
8. 修改 update schema 使只含未知字段的对象失败，并补充测试。
9. 为 list endpoint 设计 query schema，但不引入分页实现。
10. 说明 app/server 分离为何能避免测试监听端口。

## 17. 最终心智模型

把后端 API 记成四层连续边界：

1. **协议边界**：HTTP method、URL、headers、body 进入，status、headers、body 离开。
2. **平台边界**：Node 把 bytes 转为 `IncomingMessage`，把响应写入 `ServerResponse`，并管理 stream/server lifecycle。
3. **框架边界**：Express 按注册顺序执行 parser、middleware、Router、not-found 与 error handler。
4. **信任边界**：TypeScript 只检查源码关系；Zod 在运行时把 unknown input 转成 checked data。

最终主链是：

`request bytes → IncomingMessage → JSON parser → Zod validator → Router handler → repository → response DTO → ServerResponse`

遇到 bug 时，从链上寻找“值在哪里产生、谁拥有资源、哪个 layer 转交控制权、response 是否已开始、哪条规则被违反”，而不是只在报错行附近猜测。

## 18. 官方资料

### Node.js

- [HTTP](https://nodejs.org/docs/latest-v26.x/api/http.html)
- [Stream](https://nodejs.org/docs/latest-v26.x/api/stream.html)
- [URL](https://nodejs.org/docs/latest-v26.x/api/url.html)
- [Errors](https://nodejs.org/docs/latest-v26.x/api/errors.html)
- [Process](https://nodejs.org/docs/latest-v26.x/api/process.html)

### Express 5

- [5.x API Reference](https://expressjs.com/en/5x/api.html)
- [Routing](https://expressjs.com/en/guide/routing.html)
- [Using middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Error handling](https://expressjs.com/en/guide/error-handling.html)
- [Express object: `express.json()` and `Router`](https://expressjs.com/en/5x/api/express/)
- [Request](https://expressjs.com/en/5x/api/request.html)
- [Response](https://expressjs.com/en/5x/api/response.html)

### Validation、npm、HTTP 与 TypeScript

- [Zod Basic usage](https://zod.dev/basics)
- [Zod Defining schemas](https://zod.dev/api)
- [npm `package.json`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)
- [npm install](https://docs.npmjs.com/cli/v11/commands/npm-install)
- [npm Scripts](https://docs.npmjs.com/cli/v11/using-npm/scripts/)
- [npm run](https://docs.npmjs.com/cli/v11/commands/npm-run/)
- [MDN HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)
- [MDN HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [MDN Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type)
- [TypeScript Modules Reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html)
- [TypeScript `moduleResolution`](https://www.typescriptlang.org/tsconfig/moduleResolution.html)
