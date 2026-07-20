# Node.js 第 4 章面试题：TypeScript 后端工程化

## 1. TypeScript checker 和 Node runtime 的区别是什么？

答：TypeScript checker 检查源码中的类型关系，例如 controller 是否把 `CreateNoteInput` 传给 service，service result union 是否被 narrow。Node runtime 执行 JavaScript、加载模块、读取 `process.env`、处理 HTTP 请求。checker 通过不代表 runtime request 一定合法，runtime 成功也不代表全项目类型正确。

## 2. 为什么 `tsc --noEmit` 不能替代 integration tests？

答：`tsc --noEmit` 不产生 JS，也不发 HTTP 请求。它能发现类型关系错误，但不能证明 Express middleware 顺序、Zod validation、error middleware、response shape 都按预期工作。Integration tests 用 Supertest 从 HTTP 层触发完整 runtime chain。

## 3. 为什么 `tsx` 不能替代 `tsc --noEmit`？

答：`tsx` 主要解决 TypeScript source 的 runtime execution。它可以让 `src/server.ts` 或 tests 运行，但不等于对整个项目做 TypeScript program check。实践中应同时保留 `npm run typecheck` 和 `npm test`。

## 4. Node native type stripping 的核心限制是什么？

答：它移除 erasable TypeScript syntax，不做 type checking，不读取 `tsconfig.json`，也不支持需要生成 JS 的 TypeScript syntax，例如 enum、parameter property、runtime namespace。完整后端 TS 支持通常仍需要 `tsx` 或类似工具。

## 5. `NodeNext` 为什么和 `package.json#type` 有关？

答：Node 根据 extension 和 nearest `package.json#type` 判断文件是 ESM 还是 CommonJS。TypeScript `module: "NodeNext"` 与 `moduleResolution: "NodeNext"` 会模拟这种行为，所以普通 `.ts` 文件的 module behavior 也受 package boundary 影响。

## 6. 为什么 Node ESM 的 relative import 要写显式 extension？

答：Node ESM loader 按 URL-like resolution 处理 relative specifier，不像一些 bundler 自动补 extension。TypeScript source 中写 `./notes.service.js` 是为了让 runtime specifier 与 Node ESM loader 对齐。

## 7. `import type` 解决什么问题？

答：它标记某个 import 只属于 TypeScript type-system。输出或 type stripping 后这个 import 应被删除，Node runtime 不会查找对应 value export。它能避免把 interface/type 当 runtime value import 导致启动错误。

## 8. 为什么要拆分 `app.ts` 和 `server.ts`？

答：`app.ts` 负责创建 Express app 和 middleware graph；`server.ts` 负责 `listen`、port、shutdown lifecycle。测试 import app 时不需要绑定端口，Supertest 可以直接调用 handler，避免 port conflict 和 test hang。

## 9. route、controller、service、repository 的边界分别是什么？

答：route 定义 method/path/middleware order；controller 适配 HTTP request/response；service 执行业务规则并返回 typed result；repository 提供 storage contract。service 不应该接收 Express `Request`，repository 不应该知道 HTTP status。

## 10. schema 和 types 的区别是什么？

答：schema 是 runtime validation 规则，例如 Zod object；types 是 TypeScript checker 使用的静态关系。`z.infer` 可以把 schema 验证成功后的 output 连接到 TypeScript type，但 type 本身不会验证 HTTP body。

## 11. request DTO、domain model、storage model、response DTO 为什么不能默认合并？

答：它们属于不同边界。request DTO 面向 client input，domain model 面向业务，storage model 面向保存形态，response DTO 面向 public API。合并会导致 storage 字段或内部对象直接泄漏到 API。

## 12. Zod `safeParse` 的机制意义是什么？

答：`safeParse` 接收 unknown runtime value，返回 success/failure union。成功分支的 `data` 已通过 runtime validation，checker 能在该分支把它视为 inferred type；失败分支有 issues，可映射为 `VALIDATION_ERROR`。

## 13. 为什么 service layer 应返回 typed result？

答：typed result 让 controller 必须处理 success/error branch。业务错误可用 domain code 表达，例如 `NOTE_NOT_FOUND`，再由 controller 映射为 HTTP status。这样 service 不依赖 Express，也不会直接泄漏内部错误。

## 14. domain error 和 `HttpError` 的区别是什么？

答：domain error 是业务层语言，例如 note 不存在；`HttpError` 是 HTTP adapter 语言，带 status、public code、message、details。controller 负责映射，error middleware 负责统一 response。

## 15. 为什么要集中解析 `process.env`？

答：`process.env` 是外部 runtime input，值通常是 string 或 undefined。集中用 schema 解析能统一默认值、范围、enum、错误处理，并避免业务代码散落读取 raw env。

## 16. request id middleware 为什么不能用全局变量保存当前 id？

答：Node 进程会并发处理多个请求。全局 mutable request id 会被后来的请求覆盖，导致日志串线。正确做法是把 request id 放在 `response.locals` 或等价 request-scoped context。

## 17. structured JSON logger 至少应包含哪些字段？

答：至少包含 `level`、`message`、`requestId`、`context`、`error`。错误应安全序列化，不输出 secret、raw env、完整 request body 或不必要 stack。

## 18. OpenAPI、Zod、TypeScript type 三者如何分工？

答：OpenAPI 描述 HTTP contract；Zod 验证 runtime input；TypeScript type 检查内部代码关系。OpenAPI 不自动验证请求，TypeScript type 不存在于 runtime，Zod 不自动生成完整 API 文档。

## 19. 为什么 integration test 要 reset repository？

答：本章 repository 是 in-memory Map。如果不在 `beforeEach` reset，前一个 test 创建或删除的 note 会影响后一个 test，导致测试依赖执行顺序。Reset 保证每个 test 有独立初始状态。

## 20. `typed-api-starter` 的核心设计价值是什么？

答：它把 Chapter 04 的边界集中在一个小项目中：strict TS、NodeNext、app/server split、route/controller/service/repository/schema/types、Zod validation、service result、error middleware、env parsing、request id、JSON logger、OpenAPI、Node test runner + Supertest。它保持小而完整，不引入 database、auth、Redis、Docker、NestJS、Fastify 或 deployment。
