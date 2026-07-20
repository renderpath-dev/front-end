# Node.js 精通路线图：从现代前端到生产级全栈后端

> 目标：这份路线图用于 `node.js learning` 项目。它不是普通学习清单，而是把官方文档能力边界、市场主流技术栈、招聘筛选要求合并成一个可执行的 Node.js 学习路径。  
> 核心判断：Node.js 不是框架，而是 JavaScript 运行时（runtime）和服务端平台。精通 Node.js 不等于会写 Express 路由，而是能理解运行时机制，并用它构建、测试、部署、排查生产级后端服务。

---

## 目录

- [0. 路线图定位](#0-路线图定位)
- [1. 最终能力目标](#1-最终能力目标)
- [2. 三个判断维度](#2-三个判断维度)
- [3. Node.js 精通分级标准](#3-nodejs-精通分级标准)
- [4. 总体学习路径](#4-总体学习路径)
- [5. Phase 1：Node.js 运行时基础](#5-phase-1nodejs-运行时基础)
- [6. Phase 2：Node.js 核心 I/O 能力](#6-phase-2nodejs-核心-io-能力)
- [7. Phase 3：HTTP、Express 与后端 API 基础](#7-phase-3httpexpress-与后端-api-基础)
- [8. Phase 4：TypeScript 后端工程化](#8-phase-4typescript-后端工程化)
- [9. Phase 5：数据库、认证、缓存与业务系统](#9-phase-5数据库认证缓存与业务系统)
- [10. Phase 6：测试、部署与生产可用性](#10-phase-6测试部署与生产可用性)
- [11. Phase 7：高级 Node.js 与性能诊断](#11-phase-7高级-nodejs-与性能诊断)
- [12. Phase 8：NestJS / Fastify / 架构升级](#12-phase-8nestjs--fastify--架构升级)
- [13. Phase 9：高级后端架构、消息系统与平台化部署](#13-phase-9高级后端架构消息系统与平台化部署)
- [14. 最终项目路线](#14-最终项目路线)
- [15. 面试验收题库](#15-面试验收题库)
- [16. 简历表达标准](#16-简历表达标准)
- [17. 每周学习节奏](#17-每周学习节奏)
- [18. 学习指导文件生成规则](#18-学习指导文件生成规则)
- [19. 资料使用顺序](#19-资料使用顺序)
- [20. 最终验收标准](#20-最终验收标准)

---

## 0. 路线图定位

这份路线图服务于一个目标：

```txt
把 Node.js 从“会用工具写接口”学到“能支撑真实全栈项目和求职面试”。
```

它默认学习者已经在系统学习：

```txt
JavaScript
TypeScript
React
现代前端工程化
```

所以 Node.js 学习不应该从“变量、函数、Promise 是什么”重新开始，而应该从这些问题开始：

```txt
JavaScript 为什么能在服务器上运行？
Node.js 和浏览器运行时有什么不同？
Node.js 为什么默认适合 I/O 密集型任务？
Express / NestJS 到底封装了 Node 的哪一层？
为什么后端输入不能只靠 TypeScript 类型保证安全？
为什么 stream、buffer、event loop、module system 会直接影响生产问题？
```

---

## 1. 最终能力目标

学完这条路线后，你应该达到：

```txt
1. 能解释 Node.js runtime 的核心组成：V8、libuv、event loop、Node core APIs、C++ bindings、OS boundary。
2. 能使用 Node.js core modules 写脚本、CLI、文件处理、stream pipeline、HTTP server。
3. 能使用 TypeScript + Express / NestJS 构建 REST API。
4. 能实现 request validation、统一错误处理、认证、权限、数据库访问、缓存、文件上传。
5. 能写单元测试、接口测试、集成测试。
6. 能用 Docker 部署服务，并处理环境变量、日志、健康检查、优雅关闭。
7. 能分析 blocked event loop、memory leak、stream backpressure、timeout、connection leak。
8. 能在简历和面试中证明你不是只会模板，而是理解 Node.js 运行时和后端工程。
```

---

## 2. 三个判断维度

### 2.1 官方文档维度

官方文档决定 Node.js 的真实能力边界。

必须覆盖：

| 官方能力区 | 需要掌握的内容 | 为什么重要 |
|---|---|---|
| Runtime | V8、libuv、event loop、process lifecycle | 决定 Node 为什么能处理并发，也决定性能问题怎么出现 |
| Core APIs | `fs`、`path`、`http`、`stream`、`buffer`、`events`、`crypto`、`net`、`url` | 不理解 core APIs，就只能依赖框架模板 |
| Module System | CommonJS、ESM、package resolution、`exports`、circular dependency | 真实项目经常遇到 CJS/ESM 冲突和包解析问题 |
| Async Model | callback、Promise、microtask、`process.nextTick`、timer、`setImmediate` | 决定异步执行顺序和错误传播 |
| Diagnostics | inspector、heap snapshot、trace、test runner、watch mode | 决定能不能排查生产问题 |
| Security | input validation、permission model、dependency risk、prototype pollution、DoS | 后端服务必须有安全边界 |

### 2.2 市场情况维度

市场需要的不是单独的 Node.js，而是完整组合：

```txt
TypeScript
Node.js
Express / NestJS / Fastify
PostgreSQL
Redis
Docker
Testing
Cloud deployment
CI/CD
Security
Observability
```

所以路线图不能只安排 Node core API，还必须安排：

```txt
数据库
认证
缓存
测试
部署
日志
健康检查
安全
性能排查
```

### 2.3 招聘需求维度

招聘不会只问：

```txt
Express 怎么写 GET 路由？
```

更常问：

```txt
middleware 执行顺序是什么？
async handler 抛错怎么处理？
为什么不能在主线程做 CPU heavy task？
stream backpressure 是什么？
怎么统一错误响应？
JWT 和 session 怎么选？
数据库连接池为什么重要？
如何写 integration test？
如何优雅关闭服务？
如何定位 memory leak？
```

所以路线图的最终目标是：

```txt
能独立交付一个生产级后端服务，并能解释每个关键设计背后的机制。
```

---

## 3. Node.js 精通分级标准

### Level 1：会用 Node.js

可以做到：

```txt
运行 Node script
使用 npm
读写文件
写简单 HTTP server
使用 Express 写几个接口
```

简历只能写：

```txt
熟悉 Node.js 基础
```

### Level 2：能做 Node.js 后端

可以做到：

```txt
使用 Express / NestJS 写 REST API
连接数据库
实现登录注册
写 middleware
做统一错误处理
写基础测试
部署一个服务
```

简历可以写：

```txt
熟练使用 Node.js / Express / TypeScript 构建 RESTful API
```

### Level 3：理解 Node.js 运行时

可以做到：

```txt
解释 event loop phases
解释 microtask、nextTick、timer、setImmediate
解释 libuv thread pool
解释 Buffer 和 Stream
解释 CommonJS / ESM resolution
解释 request / response 对象与 stream 的关系
```

简历可以写：

```txt
深入理解 Node.js runtime、异步 I/O、stream 与 module system
```

### Level 4：具备生产级 Node.js 能力

可以做到：

```txt
设计可维护后端架构
实现认证、权限、验证、错误模型
处理日志、metrics、health check
写单元测试和集成测试
使用 Docker 部署
处理 graceful shutdown
定位 memory leak 和 blocked event loop
处理 backpressure、timeout、retry、rate limit
```

简历可以写：

```txt
具备 Node.js 生产级服务设计、性能诊断和工程化实践能力
```

---

## 4. 总体学习路径

推荐顺序：

```txt
Phase 1: Node.js runtime foundations
Phase 2: Core I/O: Buffer, Stream, File System, Process, Module
Phase 3: HTTP and Express backend fundamentals
Phase 4: TypeScript backend engineering
Phase 5: Database, auth, cache, and business system
Phase 6: Testing, deployment, and production readiness
Phase 7: Advanced Node.js and diagnostics
Phase 8: NestJS / Fastify / architecture upgrade
Phase 9: Advanced backend architecture, messaging, and platform deployment
```

学习方式：

```txt
每一章：
  1. 先学机制。
  2. 再写最小可运行代码。
  3. 再写错误示例。
  4. 再整理执行过程。
  5. 再做小项目。
  6. 最后做 cheatsheet。
```

---

## 5. Phase 1：Node.js 运行时基础

### 5.1 目标

建立 Node.js 的第一性原理：

```txt
Node.js 是 runtime，不是语言、库或框架。
JavaScript 运行在 V8 上。
Node.js 通过 core APIs 让 JavaScript 访问 OS 能力。
异步 I/O 的调度依赖 libuv、event loop、OS 和 thread pool。
```

### 5.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Node.js 是什么 | 能区分 language、runtime、framework、library |
| V8 | 知道 JS 如何被解析、编译、执行；知道 JIT、bytecode、optimization、deoptimization 的基本含义 |
| libuv | 知道它负责 event loop、async I/O、thread pool、platform abstraction |
| event loop | 能解释 timer、poll、check、close callback，以及 microtask 在什么时候执行 |
| process lifecycle | 知道 Node 进程如何启动、运行、退出 |
| blocking vs non-blocking | 能解释为什么 CPU-heavy task 会阻塞主线程 |
| browser runtime vs Node runtime | 能区分 DOM API、Web API、Node core API |

### 5.3 推荐练习文件

```txt
practices/01-runtime/
  01-runtime-boundary/
    browser-vs-node-runtime.js
    node-core-api-access.js

  02-event-loop/
    timer-immediate-order.js
    promise-nexttick-order.js
    blocking-loop-server.js
    async-io-server.js

  03-process-lifecycle/
    process-argv-env.js
    process-exit-code.js
    signal-graceful-exit.js
```

### 5.4 小项目

```txt
runtime-lab-cli
```

功能：

```txt
1. 打印 Node 版本、platform、CPU、memory。
2. 接收 CLI 参数。
3. 读取环境变量。
4. 模拟 blocking task 和 async task。
5. 输出 event loop delay 观察结果。
```

### 5.5 验收标准

你必须能回答：

```txt
Node.js 为什么不是框架？
V8 负责什么？libuv 负责什么？
Node 单线程是什么意思？哪里又用了线程池？
为什么一个 while 循环能卡死整个 server？
Promise microtask 和 process.nextTick 有什么区别？
setTimeout(fn, 0) 和 setImmediate(fn) 谁先执行？
```

---

## 6. Phase 2：Node.js 核心 I/O 能力

### 6.1 目标

掌握 Node.js 最核心的 server-side 能力：

```txt
文件
二进制数据
stream
process
module
OS boundary
```

### 6.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Buffer | 知道 Buffer 是二进制数据容器，理解 encoding、allocation、slice、copy |
| Stream | 理解 Readable、Writable、Transform、Duplex、pipeline、backpressure |
| File System | 理解 callback API、promise API、sync API、file descriptor、FileHandle |
| Path | 能写跨平台路径处理 |
| Events | 理解 EventEmitter、listener、once、error event |
| Process / OS | 能处理 env、argv、stdin、stdout、signal、exit code |
| Module System | 理解 CJS、ESM、resolution、cache、circular dependency |

### 6.3 推荐练习文件

```txt
practices/02-core-io/
  01-buffer/
    buffer-allocation.js
    buffer-encoding.js
    buffer-slice-copy.js

  02-stream/
    readable-stream-demo.js
    writable-stream-demo.js
    transform-stream-demo.js
    pipeline-backpressure-demo.js

  03-file-system/
    readfile-vs-stream.js
    filehandle-demo.js
    atomic-write-demo.js

  04-events/
    eventemitter-basic.js
    eventemitter-error-mistake.js

  05-modules/
    cjs-cache-demo.cjs
    esm-live-binding-demo.mjs
    circular-dependency-cjs.cjs
    package-exports-demo/
```

### 6.4 小项目

```txt
large-file-log-processor
```

功能：

```txt
1. 使用 stream 读取大日志文件。
2. 按行解析日志。
3. 统计 status code、slow requests、error rate。
4. 输出 JSON summary。
5. 避免一次性把整个文件读入内存。
```

### 6.5 验收标准

你必须能回答：

```txt
Buffer 为什么存在？
Buffer.from、Buffer.alloc、Buffer.allocUnsafe 有什么区别？
为什么大文件不应该直接 readFile？
backpressure 是什么？
pipeline 比手动监听 data 事件安全在哪里？
EventEmitter 的 error 事件为什么特殊？
CommonJS 的 require cache 怎么工作？
ESM 的 live binding 和 CJS exports 有什么区别？
circular dependency 为什么会拿到不完整导出？
```

---

## 7. Phase 3：HTTP、Express 与后端 API 基础

### 7.1 目标

从 Node core HTTP 过渡到 Express，理解框架封装了什么。

### 7.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| HTTP server | 能不用 Express 写基础 server |
| Request / Response | 知道它们本质上是 stream 和对象 |
| Headers / Status | 能正确使用 HTTP status、content-type、cache-control |
| Routing | 理解 path、method、route params、query |
| Middleware | 理解 middleware 是函数组合和 request-response pipeline |
| Body parsing | 知道 JSON body 是 stream 解析出来的运行时数据 |
| Error middleware | 知道 Express 错误中间件的参数签名和执行条件 |
| REST API | 能设计资源、方法、状态码、错误响应 |
| Validation | 理解外部输入必须 runtime validation |

### 7.3 推荐练习文件

```txt
practices/03-http-express/
  01-native-http/
    native-json-server.js
    native-routing-server.js
    native-stream-response.js

  02-express-basics/
    express-routing.ts
    middleware-order.ts
    error-middleware.ts
    async-handler-error.ts

  03-api-design/
    status-code-model.ts
    unified-error-response.ts
    request-validation.ts
```

### 7.4 小项目

```txt
typed-express-notes-api
```

功能：

```txt
1. Notes CRUD。
2. 统一响应格式。
3. 统一错误格式。
4. request body validation。
5. route params validation。
6. async route error handling。
7. 基础测试。
```

### 7.5 验收标准

你必须能回答：

```txt
Node 原生 http server 和 Express 的关系是什么？
middleware 为什么必须调用 next？
错误中间件为什么有四个参数？
async handler 里 throw error 会发生什么？
req.body 为什么不能直接信任？
TypeScript 为什么不能验证 HTTP body？
什么时候返回 400、401、403、404、409、422、500？
如何设计统一错误响应？
```

---

## 8. Phase 4：TypeScript 后端工程化

### 8.1 目标

把 Node.js 项目从能跑升级到可维护、可测试、可扩展。

### 8.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| tsconfig for Node | 理解 `module`、`moduleResolution`、`target`、`types`、`strict` |
| ESM/CJS with TS | 能配置 NodeNext，理解编译输出和 runtime loading |
| Layered Architecture | route、controller、service、repository、domain、schema |
| DTO / Contract | 区分 request DTO、domain model、database model、response DTO |
| Error Model | 设计 typed error 和 HTTP error mapping |
| Validation | 使用 zod / valibot / joi 等进行 runtime validation |
| Config | 环境变量解析、默认值、secret handling |
| Logging | 结构化日志、request id、error log |
| API Contract | OpenAPI / shared types / client generation |

### 8.3 推荐项目结构

```txt
backend/
  src/
    app.ts
    server.ts

    config/
      env.ts

    modules/
      notes/
        notes.routes.ts
        notes.controller.ts
        notes.service.ts
        notes.repository.ts
        notes.schema.ts
        notes.types.ts

    shared/
      errors/
        http-error.ts
        error-middleware.ts

      middleware/
        request-id.ts
        not-found.ts

      validation/
        validate-request.ts

      logging/
        logger.ts

  tests/
    notes.integration.test.ts

  package.json
  tsconfig.json
```

### 8.4 小项目

```txt
typed-api-starter
```

功能：

```txt
1. TypeScript strict mode。
2. Express app/server 分离。
3. 模块化路由。
4. zod validation。
5. typed service layer。
6. unified error middleware。
7. request id。
8. integration tests。
```

### 8.5 验收标准

你必须能回答：

```txt
为什么 app.ts 和 server.ts 要分开？
route、controller、service、repository 各自负责什么？
DTO 和 domain model 为什么不能混在一起？
TypeScript 类型和 runtime validation 的边界在哪里？
NodeNext moduleResolution 解决什么问题？
如何让错误既适合日志，又适合返回给客户端？
为什么配置必须集中解析，而不是到处读 process.env？
```

---

## 9. Phase 5：数据库、认证、缓存与业务系统

### 9.1 目标

让 Node.js 从“接口练习”进入真实业务系统。

### 9.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| PostgreSQL | schema、relation、index、transaction、connection pool |
| ORM / Query Builder | Prisma / Drizzle / Kysely 任选其一，理解抽象和 SQL 的关系 |
| Redis | cache、session、rate limit、distributed lock 基础 |
| Auth | password hashing、session、JWT、cookie、CSRF、RBAC |
| File Upload | multipart、stream upload、size limit、MIME check |
| Pagination | offset pagination、cursor pagination |
| Transaction | 多表写入一致性 |
| API Security | validation、rate limit、CORS、helmet、dependency audit |

### 9.3 推荐练习文件

```txt
practices/05-business-backend/
  01-database/
    connection-pool.ts
    transaction-demo.ts
    repository-query.ts

  02-auth/
    password-hashing.ts
    session-cookie-auth.ts
    jwt-auth-flow.ts
    rbac-middleware.ts

  03-cache/
    redis-cache-aside.ts
    rate-limit-demo.ts

  04-upload/
    stream-file-upload.ts
    file-type-validation.ts
```

### 9.4 小项目

```txt
fullstack-task-platform-api
```

功能：

```txt
1. 用户注册登录。
2. httpOnly cookie session 或 JWT。
3. workspace / project / task CRUD。
4. RBAC 权限。
5. PostgreSQL 持久化。
6. Redis 缓存和 rate limit。
7. 文件附件上传。
8. API test。
```

### 9.5 验收标准

你必须能回答：

```txt
数据库连接池为什么重要？
transaction 解决什么问题？
为什么 password 不能明文保存？
JWT 和 session 的取舍是什么？
httpOnly cookie 解决什么安全问题？
CSRF 和 XSS 的关系是什么？
RBAC 怎么建模？
Redis cache aside 怎么失效？
rate limit 应该放在哪里？
文件上传为什么要限制大小和 MIME？
```

---

## 10. Phase 6：测试、部署与生产可用性

### 10.1 目标

让项目从“本地能跑”变成“生产可运行、可观察、可维护”。

### 10.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Unit Test | 使用 `node:test` 或 Vitest 测试 service、utility、validation |
| API / Integration Test | 使用 Supertest 测试 HTTP API、database、auth flow |
| Test Runner Choice | 能区分 `node:test`、Vitest、Supertest 的职责边界和适用场景 |
| Test Database | migration、seed、isolation、cleanup |
| Docker | Dockerfile、docker-compose、env、volume、network |
| CI/CD | lint、typecheck、test、build、deploy |
| Logging | structured logs、request id、error stack |
| Health Check | liveness、readiness、dependency checks |
| Graceful Shutdown | SIGTERM、server.close、db disconnect、in-flight requests |
| Config | env validation、secret management |
| Deployment | Render / Railway / Fly.io / AWS / VPS 任选一种 |

### 10.3 推荐练习文件

```txt
practices/06-production/
  01-testing/
    node-test-service.test.ts
    vitest-service.test.ts
    supertest-api.integration.test.ts
    auth-flow.supertest.test.ts
    test-database-setup.ts

  02-docker/
    Dockerfile
    docker-compose.yml

  03-runtime/
    graceful-shutdown.ts
    health-check.ts
    structured-logger.ts
```

### 10.4 小项目

```txt
production-ready-api-template
```

功能：

```txt
1. Dockerized API。
2. PostgreSQL container。
3. Redis container。
4. migration and seed。
5. `node:test` 或 Vitest unit test。
6. Supertest API integration test。
7. test pipeline。
8. health check。
9. graceful shutdown。
10. structured logs。
11. deployment docs。
```

### 10.5 验收标准

你必须能回答：

```txt
unit test、API test、integration test 的边界是什么？
`node:test`、Vitest、Supertest 分别解决什么问题？
什么时候优先使用 Node 内置 test runner？
为什么 Supertest 适合测试 Express / NestJS HTTP API？
为什么后端测试需要独立 test database？
Dockerfile 里为什么不应该直接使用 root 用户？
health check 应该检查什么？
SIGTERM 到来后服务应该怎么关闭？
为什么不能在 shutdown 时立刻 process.exit？
日志为什么要结构化？
request id 有什么作用？
```

---

## 11. Phase 7：高级 Node.js 与性能诊断

### 11.1 目标

进入“精通 Node.js”的关键区间：能处理生产问题。

### 11.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Event Loop Delay | 能检测 blocked event loop |
| Memory Leak | heap snapshot、retained object、closure leak、listener leak |
| GC | 知道 GC pause 会影响 latency |
| CPU Profiling | flamegraph、hot function、deopt |
| Worker Threads | CPU-heavy task offloading |
| Child Process | 执行外部命令、进程隔离 |
| Cluster | 多进程利用多核 |
| Backpressure | stream pipeline 和网络写入压力 |
| Timeout / Retry | 外部服务调用可靠性 |
| Observability | logs、metrics、traces、alerts |

### 11.3 推荐练习文件

```txt
practices/07-advanced-node/
  01-performance/
    blocked-event-loop-demo.js
    event-loop-delay-monitor.js
    cpu-profile-target.js

  02-memory/
    listener-leak-demo.js
    closure-retention-demo.js
    heap-snapshot-target.js

  03-concurrency/
    worker-thread-cpu-task.js
    child-process-command.js
    cluster-http-server.js

  04-reliability/
    timeout-wrapper.ts
    retry-with-backoff.ts
    circuit-breaker-basic.ts
```

### 11.4 小项目

```txt
node-diagnostics-lab
```

功能：

```txt
1. 提供多个故意有问题的 API。
2. 一个 API 阻塞 event loop。
3. 一个 API 造成 memory leak。
4. 一个 API 没有处理 stream backpressure。
5. 一个 API 外部请求没有 timeout。
6. 编写诊断文档说明如何定位和修复。
```

### 11.5 验收标准

你必须能回答：

```txt
如何判断 event loop 被阻塞？
如何定位 memory leak？
heap snapshot 里 retained size 是什么？
listener leak 为什么常见？
什么时候用 worker_threads？
child_process 和 worker_threads 的区别是什么？
Node cluster 解决什么问题？
为什么 timeout 是后端必须项？
retry 为什么不能无脑重试？
```

---

## 12. Phase 8：NestJS / Fastify / 架构升级

### 12.1 目标

把 Node.js runtime 和 Express 基础升级成更接近企业项目的框架能力。

### 12.2 学习顺序

建议先学 Express，再学 NestJS。

```txt
Express:
  低抽象，适合理解 HTTP、middleware、route、error pipeline。

NestJS:
  高抽象，适合学习 module、controller、provider、dependency injection、guard、pipe、interceptor。
```

### 12.3 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Nest Module | 组织应用边界 |
| Controller | HTTP entry point |
| Provider | service、repository、factory |
| Dependency Injection | 为什么能自动注入，生命周期是什么 |
| Pipe | validation and transformation |
| Guard | auth and authorization |
| Interceptor | response mapping、logging、cache |
| Exception Filter | 统一错误响应 |
| OpenAPI | 生成 API docs |
| Testing | module testing、e2e testing |

### 12.4 小项目

```txt
nestjs-task-platform
```

功能：

```txt
1. Auth module。
2. User module。
3. Project module。
4. Task module。
5. PostgreSQL。
6. Redis。
7. RBAC。
8. OpenAPI docs。
9. e2e tests。
10. Docker deployment。
```

### 12.5 验收标准

你必须能回答：

```txt
NestJS 和 Express 的关系是什么？
Controller 为什么不应该写业务逻辑？
Provider 的生命周期是什么？
DI 解决什么问题？
Pipe、Guard、Interceptor、Filter 的边界是什么？
NestJS 的 module 是 TypeScript module 吗？
NestJS 抽象会不会隐藏 Node runtime 问题？
```

---

## 13. Phase 9：高级后端架构、消息系统与平台化部署

### 13.1 目标

把单体 API 项目升级到更接近真实团队和生产系统的后端架构能力。

这个阶段不是为了追求复杂度，而是为了建立一个判断标准：

```txt
什么时候应该保持 modular monolith。
什么时候需要拆出 worker service。
什么时候需要 queue / message broker。
什么时候 cache 会造成一致性问题。
什么时候容器和 Kubernetes 会改变 Node.js 的运行表现。
```

### 13.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Modular Monolith | 能用清晰模块边界控制复杂度，而不是过早拆微服务 |
| Service Boundary | 能判断业务边界、数据边界、部署边界和团队边界 |
| Monolith to Service | 能把 background job、notification、file processing 等能力从主 API 中拆出 |
| Microservices | 理解 network failure、data ownership、distributed transaction、eventual consistency |
| Queue / Message Broker | 理解 job queue、event queue、RabbitMQ、Kafka、BullMQ、Redis Queue 的适用场景 |
| Background Jobs | 处理邮件、通知、导入导出、图像处理、报表生成、定时任务 |
| Cache Consistency | 理解 cache aside、write-through、write-behind、TTL、invalidation、stale data |
| API Contract | 使用 OpenAPI 描述接口，理解 versioning、backward compatibility、client generation |
| Observability | 设计 logs、metrics、traces、alerts、SLO，并能把它们和真实故障关联起来 |
| Kubernetes Basics | 理解 container、pod、service、deployment、resource limit、liveness probe、readiness probe |
| Node in Containers | 理解 CPU limit、memory limit、signal handling、event loop delay、worker_threads、cluster 的影响 |
| Reliability Patterns | timeout、retry、circuit breaker、bulkhead、rate limit、idempotency |

### 13.3 推荐练习文件

```txt
practices/09-architecture-platform/
  01-service-boundary/
    modular-monolith-boundary.md
    monolith-to-worker-plan.md

  02-queue/
    bullmq-producer.ts
    bullmq-worker.ts
    retryable-job.ts
    idempotent-job-handler.ts

  03-cache-consistency/
    cache-aside-stale-data.ts
    cache-invalidation-demo.ts
    ttl-vs-explicit-invalidation.md

  04-api-contract/
    openapi-contract.yaml
    api-versioning-notes.md
    generated-client-boundary.md

  05-observability/
    metrics-endpoint.ts
    request-trace-id.ts
    error-rate-alert-notes.md

  06-container-runtime/
    docker-memory-limit-notes.md
    kubernetes-probes.yaml
    graceful-shutdown-in-container.ts
```

### 13.4 小项目

```txt
distributed-task-platform-lab
```

功能：

```txt
1. API service 负责 HTTP 请求。
2. Worker service 负责 background jobs。
3. Redis / BullMQ 处理任务队列。
4. PostgreSQL 保存业务数据。
5. OpenAPI 描述 API contract。
6. 提供 metrics endpoint。
7. Docker Compose 模拟多服务部署。
8. health check 区分 liveness 和 readiness。
9. worker job 支持 retry、timeout、idempotency。
10. 写一份 monolith to service 拆分说明。
```

### 13.5 验收标准

你必须能回答：

```txt
什么时候不应该拆微服务？
modular monolith 和 microservices 的核心差别是什么？
queue 和 HTTP API 的边界是什么？
job queue 和 message broker 有什么区别？
background job 为什么必须考虑幂等？
cache aside 为什么会出现 stale data？
如何设计 cache invalidation？
OpenAPI 如何帮助前后端协作？
API versioning 为什么不能只靠改 URL？
logs、metrics、traces 分别解决什么问题？
Kubernetes liveness 和 readiness 有什么区别？
Node 服务在容器 CPU limit 下可能遇到什么问题？
为什么容器里的 graceful shutdown 比本地更重要？
如何从 modular monolith 平滑拆出 worker service？
```

---

## 14. 最终项目路线

### Project 1：Node Runtime Lab

目标：

```txt
证明你理解 Node.js runtime。
```

包含：

```txt
event loop demo
blocking vs non-blocking demo
process signal demo
module system demo
```

简历价值：

```txt
适合作为学习仓库，不适合作为主简历项目。
```

---

### Project 2：Large File Log Processor

目标：

```txt
证明你理解 Buffer、Stream、File System、Backpressure。
```

包含：

```txt
stream file reader
line parser
transform stream
summary writer
memory usage comparison
```

简历价值：

```txt
可以作为技术深度补充项目。
```

---

### Project 3：Typed Express API Starter

目标：

```txt
证明你能写工程化 Node.js API。
```

包含：

```txt
TypeScript
Express
zod validation
unified error handling
request id
logging
integration test
Docker
```

简历价值：

```txt
可以作为后续项目模板。
```

---

### Project 4：Fullstack Task Platform

目标：

```txt
证明你具备全栈项目交付能力。
```

技术栈：

```txt
Frontend:
  React / Next.js
  TypeScript
  TanStack Query
  Form validation

Backend:
  Node.js
  Express or NestJS
  TypeScript
  PostgreSQL
  Redis
  Auth
  RBAC
  File upload
  Tests
  Docker
```

功能：

```txt
workspace
project
task
comment
attachment
role permission
activity log
notification
search
```

简历价值：

```txt
主简历项目。
```

---

### Project 5：Node Diagnostics Lab

目标：

```txt
证明你具备生产问题诊断能力。
```

包含：

```txt
memory leak endpoint
blocked event loop endpoint
slow external dependency endpoint
stream backpressure bug
fix and diagnosis report
```

简历价值：

```txt
高级差异化项目。
```

---

---

### Project 6：Distributed Task Platform Lab

目标：

```txt
证明你理解高级后端架构、消息系统、缓存一致性、API contract 和容器化运行时问题。
```

包含：

```txt
API service
worker service
BullMQ or Redis queue
PostgreSQL
cache consistency demo
OpenAPI contract
metrics endpoint
Docker Compose multi-service deployment
liveness and readiness checks
monolith to service migration notes
```

简历价值：

```txt
高级全栈 / 后端工程差异化项目。
```

## 15. 面试验收题库

### Runtime

```txt
Node.js 为什么不是框架？
V8 和 libuv 分别负责什么？
Node.js 单线程是什么意思？
libuv thread pool 默认处理哪些任务？
event loop phases 是什么？
microtask 在 event loop 中什么时候执行？
process.nextTick 为什么危险？
setTimeout 和 setImmediate 顺序如何判断？
```

### Core APIs

```txt
Buffer 和 ArrayBuffer 的关系是什么？
Buffer.allocUnsafe 为什么不安全？
readFile 和 createReadStream 的区别是什么？
stream backpressure 是什么？
pipeline 解决什么问题？
EventEmitter 的 error event 为什么特殊？
```

### Module

```txt
CommonJS require 的缓存机制是什么？
ESM import 的 live binding 是什么？
package.json 的 type 字段影响什么？
exports 字段解决什么问题？
CJS 和 ESM 为什么互操作复杂？
circular dependency 为什么会拿到不完整值？
```

### HTTP / Express

```txt
Node http request 和 response 为什么是 stream？
Express middleware 的执行顺序是什么？
next() 不调用会发生什么？
error middleware 的签名是什么？
async route handler 抛错怎么处理？
body parser 的本质是什么？
```

### TypeScript Backend

```txt
为什么 req.body 应该先当 unknown？
DTO、domain model、database model 有什么区别？
TypeScript 类型为什么不能替代 runtime validation？
如何设计统一错误模型？
如何让 service layer 可测试？
```

### Database / Auth

```txt
connection pool 为什么重要？
transaction 解决什么问题？
session 和 JWT 怎么选？
httpOnly cookie 解决什么问题？
RBAC 怎么建模？
rate limit 应该怎么实现？
```

### Production

```txt
graceful shutdown 怎么做？
health check 应该返回什么？
如何定位 memory leak？
如何定位 blocked event loop？
如何处理 timeout 和 retry？
为什么日志要结构化？
Docker 里 Node 服务要注意什么？
```

### Architecture / Platform

```txt
什么时候应该保持 modular monolith？
什么时候需要拆出 worker service？
queue 和 HTTP API 的边界是什么？
job queue 和 message broker 有什么区别？
cache consistency 为什么困难？
如何设计 OpenAPI contract？
Kubernetes liveness 和 readiness 有什么区别？
Node 服务在容器 CPU limit 和 memory limit 下要注意什么？
```

---

## 16. 简历表达标准

### 不建议写

```txt
精通 Node.js
```

如果项目和面试不能支撑，这句话风险很高。

### 基础阶段写法

```txt
熟悉 Node.js / Express 基础，能够开发基础 REST API。
```

### 工程阶段写法

```txt
熟练使用 Node.js、Express、TypeScript 构建 RESTful API，具备统一错误处理、请求验证、认证授权、数据库访问和接口测试经验。
```

### 深入阶段写法

```txt
深入理解 Node.js runtime、event loop、异步 I/O、stream、buffer 与 CommonJS/ESM 模块系统，能够处理后端服务中的性能、内存和可靠性问题。
```

### 项目描述模板

```txt
基于 React / Next.js + Node.js / TypeScript + PostgreSQL 构建任务协作平台，后端采用分层架构设计，包含认证授权、RBAC、请求验证、统一错误处理、Redis 缓存、文件上传、接口测试、Docker 部署与健康检查。项目中针对大文件处理使用 stream pipeline，避免一次性读入内存；针对异步任务拆出 worker service 和 queue；并通过 OpenAPI、graceful shutdown、结构化日志、metrics endpoint 提升生产可维护性。
```

---

## 17. 每周学习节奏

### 每周固定节奏

```txt
Day 1:
  阅读官方文档和本地参考资料，整理核心概念。

Day 2:
  写正确示例，跑通输出。

Day 3:
  写错误示例，解释错误原因。

Day 4:
  做小练习或 mini lab。

Day 5:
  整理学习指导文件和 cheatsheet。

Day 6:
  做阶段小项目。

Day 7:
  复盘、补漏洞、做面试题。
```

### 每章输出物

每章至少输出：

```txt
1. chapter-learning-guide.md
2. practices/
3. mini-project/
4. cheatsheet.md
5. interview-questions.md
```

---

## 18. 学习指导文件生成规则

每一章指导文件必须包含：

```txt
本章解决什么问题
前置概念
学习目标
学习顺序
核心术语表
底层心智模型
推荐目录结构
运行方式
分节教学与练习
API / 语法索引
常见错误表
最终小项目
额外速查表
最终文件清单
如何转换成个人笔记
必须能回答的问题
最终记忆模型
官方文档阅读清单
```

每个非平凡代码示例必须包含：

```txt
正确示例
错误示例
逐行解释
执行过程
变量与引用变化
为什么得到这个输出
违反了什么规则
如何修正
如何识别类似错误
```

---

## 19. 资料使用顺序

推荐资料顺序：

```txt
1. Official Node.js documentation
2. MDN JavaScript documentation
3. TypeScript official documentation
4. NodeBook local chapters
5. JavaScript: The Definitive Guide
6. The Complete Node.js Guide
7. Existing project notes
```

使用原则：

```txt
官方文档负责事实正确性。
NodeBook 负责深入机制和问题意识。
本地 PDF 负责补充学习路径。
项目练习负责把知识变成能力。
```

NodeBook 适合作为深度参考，尤其适合：

```txt
runtime internals
event loop
libuv
buffer
stream
file descriptor
module loading
async patterns
networking
performance
production debugging
```

但如果 NodeBook 和官方文档冲突，以官方文档为准。

---

## 20. 最终验收标准

完成这条路线后，你应该能独立完成：

```txt
1. 写一个原生 Node HTTP server。
2. 写一个 Express / NestJS TypeScript API。
3. 写 runtime validation 和统一错误响应。
4. 写 PostgreSQL repository 和 transaction。
5. 写 auth、RBAC、Redis cache、rate limit。
6. 写大文件 stream upload/download。
7. 使用 `node:test` / Vitest / Supertest 写单元测试、API test 和 integration test。
8. 用 Docker 部署服务。
9. 处理 env config、logging、health check、graceful shutdown。
10. 定位 memory leak、blocked event loop、backpressure。
11. 设计 OpenAPI contract、metrics endpoint 和基础 observability。
12. 拆出 worker service，并用 queue / message broker 处理 background jobs。
13. 解释 cache consistency、retry、timeout、idempotency、container runtime 对 Node 服务的影响。
14. 在面试中解释 Node.js runtime、后端项目架构和平台化部署边界。
```

如果这些都能做到，你可以把 Node.js 能力定位为：

```txt
深入理解 Node.js runtime，并具备生产级后端服务设计、实现、测试、部署和诊断能力。
```

这才是“精通 Node.js”在官方文档、市场情况和招聘需求三个维度下都站得住的标准。
