# Node.js 第 4 章速查：TypeScript 后端工程化

## 一句话模型

TypeScript 后端工程化 = 用 TypeScript 检查内部类型关系，用 Node 执行运行时行为，用 Zod 验证外部输入，用 Express 组织请求管线，用 OpenAPI 描述 HTTP contract。

## Type checker / emitted JavaScript / Node runtime

| 层 | 做什么 | 不做什么 |
| --- | --- | --- |
| Type checker | 检查函数参数、返回值、union narrowing、import 类型关系 | 不执行请求，不验证 HTTP body，不启动 server |
| emitted JavaScript / noEmit | 决定是否输出 JS、删除 type-only 内容、保留 runtime import | 不处理 socket，不跑 middleware |
| Node runtime | 加载模块、执行 JS、读取 `process.env`、运行 test runner | 不按 `tsconfig.json` 做类型检查 |

## Node type stripping vs full TS support

| 模式 | 适合 | 限制 |
| --- | --- | --- |
| Node native type stripping | 只含 erasable syntax 的轻量 `.ts` 文件 | 不 type-check，不读取 `tsconfig.json`，不支持需要生成 JS 的 TS syntax |
| `tsx` / runner | 后端 dev、test、script execution | 运行不等于全项目 typecheck |
| `tsc --noEmit` | CI 或本地类型检查 | 不执行 runtime behavior |

## tsconfig NodeNext quick reference

| option | 推荐值 | 作用 |
| --- | --- | --- |
| `target` | `ES2022` 或按 Node 版本选择 | JS 语言目标 |
| `module` | `NodeNext` | 按 Node ESM/CJS 规则理解 module |
| `moduleResolution` | `NodeNext` | 模拟 Node-style resolution |
| `strict` | `true` | 强化类型检查 |
| `noEmit` | `true` | 只检查不输出 |
| `types` | `["node"]` | 引入 Node declarations |
| `verbatimModuleSyntax` | `true` | 明确 type-only 与 value import 边界 |

## `import type` quick reference

| 写法 | 含义 |
| --- | --- |
| `import type { Request } from "express"` | 只给 checker 使用，runtime 不导入 |
| `import { Router } from "express"` | runtime 需要值，必须保留 |
| `import { value, type ValueType } from "./module.js"` | 同一模块中区分 value 与 type |

常见错误：把 interface/type 当 value import，导致 Node runtime 查找不存在的 export。

## Layer responsibility

| Layer | Owns | Should not own |
| --- | --- | --- |
| route | method/path/middleware order | business rules |
| schema | runtime validation | HTTP response sending |
| controller | HTTP request/response mapping | storage details |
| service | business rules and result type | Express `Request` / `Response` |
| repository | storage contract and implementation | HTTP status |
| types | static relationships | runtime validation |

## DTO / domain / storage / response boundary

| Model | Boundary | Example |
| --- | --- | --- |
| request DTO | client input | `CreateNoteInput` |
| domain model | service business object | `Note` with `Date` |
| storage model | repository persistence shape | ISO fields or storage-specific record |
| response DTO | public API output | `NoteResponseDto` |

## Validation quick reference

- Treat `request.body`, `request.params`, `request.query`, and `process.env` as external runtime input.
- Use `safeParse` for recoverable validation branches.
- Use `z.infer<typeof schema>` to connect validated output to TypeScript.
- Do not replace runtime validation with `as SomeType`.

## Error model quick reference

| Error kind | Owner | Public output |
| --- | --- | --- |
| domain error | service | mapped by controller |
| `HttpError` | HTTP adapter | consumed by error middleware |
| unknown error | error middleware | `INTERNAL_ERROR` |
| validation error | validation middleware | `VALIDATION_ERROR` |

Stable response shape:

- success: `{ "ok": true, "data": ... }`
- error: `{ "ok": false, "error": { "code": "...", "message": "...", "details": [] } }`

## Config parsing checklist

- Parse `process.env` once in `src/config/env.ts`.
- Validate `NODE_ENV`, `PORT`, `LOG_LEVEL`.
- Coerce `PORT` to number and check range.
- Do not log secrets or entire env objects.
- Import typed config from the entry point that owns runtime startup.

## Structured logging checklist

- Use JSON log lines.
- Keep stable fields: `level`, `message`, `requestId`, `context`, `error`.
- Serialize errors safely.
- Attach request id through request-scoped context.
- Do not store request id in global mutable state.

## OpenAPI contract quick reference

OpenAPI describes HTTP API structure: `paths`, operations, `requestBody`, `responses`, and schemas. It does not validate runtime requests unless a validator is wired into the app. It is not TypeScript itself.

## Integration testing checklist

- Import `app`, not `server`.
- Use Supertest to send requests.
- Use Node test runner: `node:test`.
- Use `node:assert/strict`.
- Reset in-memory repository in `beforeEach`.
- Test both success and error response shapes.

## Common mistakes

| Mistake | Why wrong | Fix |
| --- | --- | --- |
| `request.body as CreateNoteInput` | assertion does not validate runtime value | Zod `safeParse` |
| service imports `express` | business layer depends on HTTP framework | pass typed command |
| extensionless ESM import | Node ESM needs explicit relative extension | use `.js` specifier in TS source |
| `moduleResolution: "bundler"` for Node app | bundler assumptions differ from Node runtime | use `NodeNext` |
| OpenAPI treated as validator | contract description is not execution | validate with Zod |
| `app.ts` calls `listen` | tests import app and bind port accidentally | keep `listen` in `server.ts` |

## Official docs

- Node.js Modules: TypeScript — https://nodejs.org/api/typescript.html
- Node.js Packages — https://nodejs.org/api/packages.html
- Node.js ECMAScript Modules — https://nodejs.org/api/esm.html
- Node.js CommonJS Modules — https://nodejs.org/api/modules.html
- Node.js Process — https://nodejs.org/api/process.html
- Node.js Test runner — https://nodejs.org/api/test.html
- TypeScript Modules Reference — https://www.typescriptlang.org/docs/handbook/modules/reference.html
- TypeScript TSConfig Reference — https://www.typescriptlang.org/tsconfig/
- Express 5.x API — https://expressjs.com/en/5x/api/
- Express middleware — https://expressjs.com/en/guide/using-middleware/
- Express error handling — https://expressjs.com/en/guide/error-handling/
- Zod — https://zod.dev/
- npm package.json — https://docs.npmjs.com/cli/v11/configuring-npm/package-json/
- OpenAPI Specification — https://spec.openapis.org/oas/latest.html
