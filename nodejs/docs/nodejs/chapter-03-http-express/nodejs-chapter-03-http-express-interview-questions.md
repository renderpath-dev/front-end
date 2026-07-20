# Node.js 第 3 章面试题：HTTP、Express 与后端 API

## 1. `http.createServer()` 做了什么？

它创建并返回 `http.Server`。传入的 request listener 会注册到 server 的 `'request'` event。构造 server 不等于监听端口；调用 `listen()` 后才产生绑定地址的活动 server handle。每次完整 HTTP request 被解析后，listener 获得 `IncomingMessage` 和 `ServerResponse`。

## 2. 为什么说 Node HTTP request body 是 stream？

服务端 request 是 `IncomingMessage`，它继承 `stream.Readable`。headers 已经由 HTTP parser 提供为属性，但 body 可能分多个 Buffer chunk 到达。应用必须消费 stream，等待结束后才能得到完整 body；若累计整个 body，应设置大小限制以控制内存。

## 3. `ServerResponse.write()` 与 `end()` 有什么区别？

`write()` 写一个 body chunk，可调用多次；返回 `false` 表示数据在用户态缓冲，应等待 `drain`。`end()` 表示 headers 和 body 已全部发送，当前 HTTP message 完成。遗漏 `end()` 会让客户端持续等待。第一次写 body 后 headers 通常已发送，之后再改 header 可能触发 `ERR_HTTP_HEADERS_SENT`。

## 4. JSON response 为什么需要 `Content-Type`？

JSON 字符串本质仍是 bytes。`Content-Type: application/json; charset=utf-8` 告诉客户端按 JSON 和 UTF-8 解释 body。若手动设置 `Content-Length`，应使用 UTF-8 字节长度而不是 JavaScript string 字符数。

## 5. 原生 Node 如何区分 path 和 query？

服务端的 `request.url` 通常是相对 request target。用 `new URL(request.url, base)` 创建 URL，再用 `pathname` 匹配 route、用 `searchParams` 读取 query。直接把完整 `request.url` 与 `/notes` 比较会让 `/notes?search=http` 匹配失败。

## 6. 404 与 405 的区别是什么？

404 表示目标 route 或资源不存在。405 表示资源路径已知，但该 endpoint 不支持当前 HTTP method；响应可带 `Allow` header。原生 routing 需要自己判断，Express 通常也需要显式补充 method-not-allowed 策略。

## 7. Express 是 Node runtime 吗？

不是。Express 是运行在 Node 上的 routing and middleware framework。它组织 route 匹配、middleware pipeline、body parsing 与 error flow，底层仍依赖 Node HTTP server、request/response 对象、事件循环和操作系统网络资源。

## 8. Express endpoint 由什么定义？

由 HTTP method 和 route path 共同定义，例如 `GET /notes/:id`。命名 segment 写入 `req.params`，query string 写入 `req.query`。query 不属于 route path。Express 5 使用当前 `path-to-regexp` 行为，不应照搬 Express 4 的旧字符串 pattern 假设。

## 9. Express Router 解决什么问题？

Router 是可挂载的独立 route/middleware stack。它让一个资源边界拥有自己的 endpoints 和局部 middleware，app 只负责组合，例如 `app.use("/notes", notesRouter)`。这减少入口文件耦合，但不会改变 HTTP method/path 或 middleware 顺序语义。

## 10. middleware 为什么必须调用 `next()`？

只有需要继续 pipeline 时才必须调用。middleware 有两种合法完成方式：结束 response，或调用 `next()` 交给下一个匹配 layer。若两者都不做，请求会挂起；若已发送 response 后又 `next()`，后续 layer 可能二次发送。

## 11. short-circuit 和 hanging request 有什么区别？

short-circuit 是有意结束 response，例如鉴权失败返回 403，pipeline 不再继续。hanging request 是既没有 response completion，也没有 `next()`，客户端一直 pending。可通过 middleware 入口日志、`res.headersSent` 和 `res.writableEnded` 区分。

## 12. `express.json()` 做了哪些事，没有做哪些事？

它按 Content-Type 和 options 消费 request body stream，限制 body 大小并执行 JSON parse，把结果放到 `req.body`。它不验证业务字段、不做授权，也不是完整安全模型。坏 JSON 属于 parser failure；字段不符合 schema 属于 validation failure。

## 13. 为什么 `req.body as CreateNoteInput` 不安全？

TypeScript assertion 只改变编译器对表达式的看法，发射到 JavaScript 后没有运行时检查。客户端可以发送任意 JSON；`title` 可能缺失、是 number，或长度超限。入口应视为 `unknown`，用 Zod 等 runtime schema 检查，并只使用 parsed output。

## 14. Zod `parse()` 和 `safeParse()` 有什么区别？

两者都执行 runtime validation。`parse()` 失败时抛 `ZodError`；`safeParse()` 返回以 `success` 区分的 result object。middleware 中使用 `safeParse()` 可显式构建 validation details；统一异常链时也可使用 `parse()` 并集中映射 `ZodError`。

## 15. 400 与 422 如何选择？

400 适合 message 本身无法形成预期输入，例如 JSON 语法错误。422 适合 JSON 已成功解析，但字段类型、长度或业务输入约束不通过。两者的具体策略应在 API 内保持一致，并由测试固定。

## 16. 401 与 403 如何选择？

401 表示缺少或无效认证，客户端需要提供有效身份凭据；403 表示身份已知但没有执行该操作的权限。本章不实现认证或授权，只建立状态码语义边界。

## 17. Express error middleware 为什么有四个参数？

四参数 `(err, req, res, next)` 是 Express 用来识别 error middleware 的约定，即使某个参数未使用也应保留。它应在普通 middleware 和 routes 之后注册。若 `res.headersSent` 为 true，应 `next(err)` 委托默认 handler，避免二次写 headers。

## 18. Express 5 如何处理 async handler 的错误？

当 route handler 或 middleware 返回的 Promise reject，或 async function throw 时，Express 5 自动调用 `next(value)` 并进入 error pipeline。该行为是 Express 5 的版本边界；旧 Express 4 教程常见的 async forwarding wrapper 不应被机械复制。

## 19. 统一错误 DTO 有什么价值？

稳定的 `code` 便于客户端分支和日志聚合，`message` 提供安全公开说明，`details` 承载可选字段错误。内部 error object、stack、数据库消息、绝对路径或 secret 不应直接序列化给客户端。未知异常应内部记录并返回通用 500。

## 20. Notes CRUD 的 endpoint 和成功状态码是什么？

- `GET /notes` → `200`
- `POST /notes` → `201`
- `GET /notes/:id` → `200`
- `PATCH /notes/:id` → `200`
- `DELETE /notes/:id` → `204`

资源不存在通常返回 404。`204` 不返回 response body，因此不应附带统一 success envelope。

## 21. 为什么分离 `app.ts` 和 `server.ts`？

`app.ts` 只组装 Express pipeline，`server.ts` 拥有 `listen()` 和端口生命周期。测试可导入 app 并由 Supertest 管理临时 HTTP boundary，不会因 import 自动占用固定端口，也更容易让 test process 正常退出。

## 22. `typed-express-notes-api` 的完整请求链是什么？

以 `POST /notes` 为例：Node 接收 HTTP bytes → `IncomingMessage` 进入 Express → `express.json()` 消费 body → Zod middleware 验证 unknown value → parsed data 写入 `res.locals.validated` → async route 调用 in-memory repository → repository 创建 Note → success helper 发送 201 DTO。parser、validation、resource lookup 或未知异常分别进入统一 error middleware。

## 23. 内存 repository 的边界和风险是什么？

Map 与当前进程同寿命，重启后数据丢失，多进程实例之间也不共享。它适合本章观察 CRUD 和 API boundary，不是持久化方案。未来替换为数据库时，应保持 route、validation、status 和公开 error contract，数据库约束仍不能被 HTTP validation 替代。

## 24. 如何系统定位一个一直 pending 的 Express 请求？

先确认请求到达进程，再按注册顺序给 middleware 加短日志；找到最后执行的 layer，检查它是否发送 response 或调用 `next()`。同时观察 `res.headersSent` 与 `res.writableEnded`。不要先增加 timeout，因为 timeout 只掩盖 control-flow 违规。

## 官方资料

- [Node.js HTTP](https://nodejs.org/docs/latest-v26.x/api/http.html)
- [Node.js Stream](https://nodejs.org/docs/latest-v26.x/api/stream.html)
- [Express 5 API](https://expressjs.com/en/5x/api.html)
- [Express Routing](https://expressjs.com/en/guide/routing.html)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Zod Basic usage](https://zod.dev/basics)
- [MDN HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
