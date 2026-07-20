# Node.js 第 4 章：TypeScript 后端工程化、分层架构、配置、错误模型与 API Contract

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
  - [9.1 TypeScript 在后端解决什么问题，不解决什么问题](#section-9-1)
  - [9.2 Type checker、emitted JavaScript、Node runtime 的三层边界](#section-9-2)
  - [9.3 Node native type stripping 与 full TypeScript support](#section-9-3)
  - [9.4 `tsc --noEmit`、`tsx`、`node` 的职责区别](#section-9-4)
  - [9.5 Node 后端 tsconfig：`target`、`module`、`moduleResolution`、`types`、`strict`](#section-9-5)
  - [9.6 `NodeNext`：package.json `type`、扩展名与运行时加载](#section-9-6)
  - [9.7 `import type`、type erasure 与 runtime import 错误](#section-9-7)
  - [9.8 `app.ts` / `server.ts` 分离：可测试性与监听生命周期](#section-9-8)
  - [9.9 分层架构：route、controller、service、repository、schema、types](#section-9-9)
  - [9.10 DTO / domain model / storage model / response DTO 的边界](#section-9-10)
  - [9.11 request DTO 与 Zod schema：unknown input 到 typed data](#section-9-11)
  - [9.12 typed service layer：业务规则、结果类型与异常边界](#section-9-12)
  - [9.13 repository contract：内存实现与未来数据库替换边界](#section-9-13)
  - [9.14 Error model：domain error、HttpError、error middleware 映射](#section-9-14)
  - [9.15 配置模型：集中解析 `process.env`、默认值、secret boundary](#section-9-15)
  - [9.16 request id middleware：请求链路关联与日志上下文](#section-9-16)
  - [9.17 structured logging：JSON log、level、message、context、error](#section-9-17)
  - [9.18 API contract：OpenAPI、DTO、shared types 与 runtime validation 的关系](#section-9-18)
  - [9.19 Integration tests：app import、Supertest、Node test runner、repository reset](#section-9-19)
  - [9.20 Chapter integration: typed-api-starter](#section-9-20)
- [10. API 与规则索引](#10-api-与规则索引)
- [11. 常见错误对照表](#11-常见错误对照表)
- [12. 调试与验证方法](#12-调试与验证方法)
- [13. 分项练习说明](#13-分项练习说明)
- [14. 最终迷你项目](#14-最终迷你项目)
  - [14.1 项目定位](#141-项目定位)
  - [14.2 目录责任](#142-目录责任)
  - [14.3 完整项目代码](#143-完整项目代码)
  - [14.4 请求成功路径](#144-请求成功路径)
  - [14.5 请求失败路径](#145-请求失败路径)
  - [14.6 配置、日志与 request id](#146-配置日志与-request-id)
  - [14.7 OpenAPI contract](#147-openapi-contract)
  - [14.8 测试覆盖](#148-测试覆盖)
- [15. 知识迁移与真实项目场景](#15-知识迁移与真实项目场景)
- [16. 本章复盘任务](#16-本章复盘任务)
- [17. 最终心智模型](#17-最终心智模型)
- [18. 官方资料](#18-官方资料)

## 本章代码定位索引

| 学习目标 | 文件或片段 | 可观察证据 |
| --- | --- | --- |
| 区分 TypeScript 配置、检查与 Node 运行 | `practices/04-typescript-backend-engineering/01-tsconfig/tsconfig-nodenext-baseline.json` | `module` 与 `moduleResolution` 同为 `NodeNext`，`noEmit` 让 `tsc` 只检查不输出 |
| 理解 package 边界对模块格式的影响 | `practices/04-typescript-backend-engineering/01-tsconfig/module-format-boundary.ts` | 输出同时描述 `package.type`、source syntax、emitted import 与 runtime rule |
| 观察 type-only import 的运行时边界 | `practices/04-typescript-backend-engineering/01-tsconfig/type-only-import-boundary.ts` | `Stats` 只作为类型使用，`mkdtempSync` 作为值导入执行 |
| 观察 Node type stripping 限制 | `practices/04-typescript-backend-engineering/01-tsconfig/native-type-stripping-limits.ts` | 文件默认只执行 erasable syntax，transform-required syntax 以字符串列出 |
| 处理未知请求体 | `practices/04-typescript-backend-engineering/02-type-runtime-boundary/unknown-request-body.ts` | unsafe assertion 与 `safeParse` 分别展示静态断言和运行时验证 |
| 区分 DTO、domain、storage、response | `practices/04-typescript-backend-engineering/02-type-runtime-boundary/dto-domain-boundary.ts` | 同一 note 在不同模型中使用 `Date` 或 ISO string |
| 理解 Zod narrowing | `practices/04-typescript-backend-engineering/02-type-runtime-boundary/zod-safeparse-boundary.ts` | `result.success` 为分支边界，成功分支得到 typed data |
| 建立分层调用链 | `practices/04-typescript-backend-engineering/03-layered-architecture/route-controller-service-repository.ts` | route-like request 进入 controller，再进入 service 与 repository |
| 防止 service 接收 Express 对象 | `practices/04-typescript-backend-engineering/03-layered-architecture/controller-service-boundary.ts` | `wrongServiceBoundary` 展示错误边界，正确 service 接收 command |
| 保持 repository 可替换 | `practices/04-typescript-backend-engineering/03-layered-architecture/repository-contract.ts` | `NotesRepository` interface 隔离内存实现 |
| 映射 domain error 与 HTTP error | `practices/04-typescript-backend-engineering/04-errors-config-logging/domain-error-vs-http-error.ts` | `NOTE_NOT_FOUND` 被映射为 public `404` response 信息 |
| 集中解析配置 | `practices/04-typescript-backend-engineering/04-errors-config-logging/env-parse-config.ts` | `PORT`、`NODE_ENV`、`LOG_LEVEL` 由 Zod 统一解析 |
| 结构化日志 | `practices/04-typescript-backend-engineering/04-errors-config-logging/structured-logger.ts` | JSON log 包含 `level`、`message`、`requestId`、`context`、`error` |
| 请求链路关联 | `practices/04-typescript-backend-engineering/04-errors-config-logging/request-id-middleware.ts` | middleware 写入 `response.locals.requestId` 并设置响应头 |
| 描述 HTTP API contract | `practices/04-typescript-backend-engineering/05-api-contract/openapi-minimal-contract.yaml` | `paths`、`requestBody`、`responses`、`schemas` 描述 Notes API |
| 连接 OpenAPI shape 与 TS DTO | `practices/04-typescript-backend-engineering/05-api-contract/contract-response-types.ts` | TypeScript response union 表达 OpenAPI-shaped response |
| 组合最终项目 | `mini-projects/typed-api-starter/src/app.ts` 与 `mini-projects/typed-api-starter/src/server.ts` | app 只组合 middleware/route/error，server 拥有 `listen` 生命周期 |
| 验证 HTTP 行为 | `mini-projects/typed-api-starter/tests/notes.integration.test.ts` | Node test runner 导入 app，Supertest 发起 `/notes` 请求并断言响应 |

## 0. 章前定位

第 4 章接在 Chapter 03 的 Express Notes API 之后。Chapter 03 已经解决“请求如何进入 Express、middleware 如何传递、Zod 如何验证 `req.body`、Supertest 如何测试 app”。本章不重新讲 HTTP 基础，而是把那个 runnable API 升级成 TypeScript 后端工程模型：编译器检查、运行时执行、模块边界、分层架构、配置解析、错误模型、日志上下文、API contract 和集成测试各自负责不同问题。

本章的核心判断是：TypeScript 后端工程化不是“把 `.js` 改成 `.ts`”，而是把外部输入、内部业务、运行时资源、HTTP 表达、工具链命令分层，让每一层的责任可以被观察、验证和替换。

## 1. 学习目标

学完本章，你应该能解释并实践：

- `tsc --noEmit`、`tsx`、`node` 分别在检查、转换、执行中的职责。
- Node native type stripping 为什么不是完整 TypeScript 编译，也为什么不会读取 `tsconfig.json` 做类型检查。
- `module: "NodeNext"` 与 `moduleResolution: "NodeNext"` 如何配合 Node 的 ESM/CJS 与 nearest `package.json#type`。
- 为什么后端服务层不应该接收 Express `Request` 或 `Response`。
- 为什么 Zod 验证 runtime unknown input，`z.infer` 只把验证结果连接到 TypeScript 类型系统。
- 如何把 domain error 映射为 `HttpError`，再由 error middleware 输出稳定 public error response。
- 如何集中解析 `process.env`、生成 request id、输出 JSON log。
- 为什么 OpenAPI 是 API description，不是 TypeScript 类型，也不是 runtime validator。

## 2. 前置知识

你需要已经理解：

- Chapter 01 的 process lifecycle、`process.env`、命令执行和 runtime boundary。
- Chapter 02 的 CommonJS、ESM、`package.json#type`、`exports`、`imports`、资源生命周期。
- Chapter 03 的 Express app/router/middleware/error pipeline、`req.body` trust boundary、Zod、app/server split、Supertest。

本章只在必要位置连接这些知识，不从头重讲。

## 3. 环境与运行基线

本章使用 TypeScript、Express 5、Zod、Node built-in test runner 和 Supertest。练习与最终项目采用 NodeNext ESM 风格：source `.ts` 中的相对 import 使用 runtime 可解析的 `.js` specifier，`package.json` 设置 `"type": "module"`，`tsc --noEmit` 只检查类型。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">D:\node.js\practices\04-typescript-backend-engineering\01-tsconfig\tsconfig-nodenext-baseline.json</span>
  </div>

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "types": ["node"],
    "verbatimModuleSyntax": true,
    "rewriteRelativeImportExtensions": false
  }
}
```
</div>

逐行解释：`target` 决定 TypeScript 可以保留到输出层的 JavaScript 语言目标；`module` 决定 TypeScript 如何理解每个文件的 module format；`moduleResolution` 决定 TypeScript 如何模拟 Node 的 resolution；`strict` 打开类型检查约束；`noEmit` 让检查阶段不产生 JavaScript；`types` 限定 Node 类型入口；`verbatimModuleSyntax` 让 type-only 与 value import 的边界更接近运行时；`rewriteRelativeImportExtensions` 在本章保持关闭，因为最终项目使用 `.js` runtime specifier，而不是把 `.ts` specifier 重写成 `.js`。

## 4. 第一性原理

后端 TypeScript 的第一性原理有三条：

1. 外部输入永远先是 runtime value，不是 TypeScript type。HTTP body、params、query、headers、env 都来自进程外部，必须验证。
2. TypeScript type-system 只在检查阶段证明“代码中声明的关系是否一致”，不会在 Node runtime 自动产生 validation。
3. Node runtime 执行 JavaScript 模块、读取 package metadata、处理 socket 和 process resource；它不等于 TypeScript compiler。

这三条会贯穿每个 9.x 小节。

## 5. 技术边界模型

| 边界 | 负责什么 | 不负责什么 |
| --- | --- | --- |
| TypeScript type-system | 静态检查 DTO、domain、repository、service result 的类型关系 | 验证 HTTP body、env、数据库记录、网络输入 |
| emitted JavaScript / noEmit | 决定是否输出 JS、是否保留 import、是否转换语法 | 不启动服务器，不处理请求 |
| Node runtime | 加载模块、执行 JS、读取 `process.env`、运行 test runner | 不按照 `tsconfig.json` 做类型检查 |
| package/module resolution | 通过 extension、nearest `package.json#type`、`exports`、`imports` 解析模块 | 不理解业务 DTO |
| Express convention | 组织 middleware、router、controller、error middleware | 不替业务层做 domain rule |
| runtime validation | 把 unknown input 缩窄成 typed data | 不替 OpenAPI 发请求，不替 TypeScript 执行 |
| API contract | 描述 HTTP surface、schema、response | 不自动验证 runtime value |

## 6. 底层机制模型

一次 `POST /notes` 在本章项目中的机制链如下：

1. Node 进程加载 `src/server.ts`，`tsx` 提供 full TypeScript execution support。
2. `server.ts` 导入 `app.ts`，`app.ts` 组合 request id、JSON parser、notes router、not-found、error middleware。
3. HTTP request 到达 Express app，middleware 按注册顺序执行。
4. `validateRequest("body", createNoteSchema)` 把 `request.body` 作为 unknown runtime value 交给 Zod。
5. 成功时，validated data 放入 `response.locals.validated.body`；失败时，抛出 `HttpError`。
6. controller 从 locals 取 typed DTO，调用 service。
7. service 执行业务规则，调用 repository interface。
8. repository 内存保存 domain object，controller 映射 response DTO。
9. `sendResponse` 输出 `{ "ok": true, "data": ... }`。
10. `requestIdMiddleware` 在 `finish` 事件输出 JSON log。

## 7. 核心术语

| 术语 | 所属层 | 本章含义 |
| --- | --- | --- |
| Type checker | TypeScript tooling | 检查类型关系，不执行 HTTP 请求 |
| emitted JavaScript | TypeScript emit boundary | TypeScript 语法被移除或转换后的 JS；本章通过 `noEmit` 主要观察“不输出”边界 |
| Node runtime | Node platform | 执行 JS、加载模块、运行 process 和 test runner |
| DTO | API boundary | request/response shape，不等于 domain model |
| domain model | business layer | service 中表达业务对象与规则 |
| storage model | repository boundary | 当前是 in-memory 记录，未来可替换为 persistent storage |
| HttpError | HTTP adapter boundary | 把 public HTTP status/code/message/details 交给 error middleware |
| request id | observability boundary | 单个请求链路的 correlation value |
| OpenAPI | API contract | HTTP API 描述格式，不是 validator |

## 8. 本章实践路线

路线从最底层边界开始，逐步组合：

1. `01-tsconfig`：先证明 TypeScript checker、Node runtime、module format 和 type-only import 的边界。
2. `02-type-runtime-boundary`：把 unknown request body、DTO/domain/storage/response、Zod narrowing 分开。
3. `03-layered-architecture`：建立 route/controller/service/repository contract。
4. `04-errors-config-logging`：加入 domain error、env config、structured logger、request id。
5. `05-api-contract`：用 OpenAPI 描述 HTTP surface，并连接 TS response DTO。
6. `typed-api-starter`：把这些边界组合成一个小型 Express 5 API。

## 9. 核心教学

<a id="section-9-1"></a>
### 9.1 TypeScript 在后端解决什么问题，不解决什么问题

**结论：** TypeScript 在后端主要解决“代码内部类型关系是否一致”，不解决“进程外部输入是否可信”。`CreateNoteInput` 可以让 service 调用更稳定，但不能证明 HTTP client 真的发来了这个 shape。

**本节解决的问题：** Chapter 03 中 `req.body` 已经是 trust boundary。本章要避免把 `request.body as CreateNoteInput` 当成验证。TypeScript assertion 只改变 checker 看法，不改变 runtime value。

**技术意义：** 一旦把外部输入误当作 typed data，service layer 就会接收错误值，错误会从 validation boundary 滑入 business boundary，后续错误信息也更难稳定映射。

**概念解释：** TypeScript type-system 检查 source code 中的声明、函数参数、返回值、union narrowing；Node runtime 只看到 JavaScript value。`unknown` 是承认“我还没有验证这个 runtime value”的类型。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** `unknown`、type alias、interface 属于 type-system；HTTP JSON body 属于 Node/Express runtime；Zod 属于 runtime validation；OpenAPI 只描述 contract。

**底层机制：** `POST /notes` 创建的是 JavaScript object。checker 不会读取 socket，也不会检查 request body。只有 validator 成功后，`result.data` 才能作为 typed command 进入 service。

**API / 语法规则：** 使用 `unknown` 接住外部输入；使用 `schema.safeParse(value)` 验证；成功分支使用 `result.data`；不要用裸 assertion 替代 validation。

**示例代码与逐行解释：** `practices/04-typescript-backend-engineering/02-type-runtime-boundary/unknown-request-body.ts` 中 `unsafeReadTitle` 展示 assertion 只改变 checker 视角；`validateCreateNote` 展示 `safeParse` 才读取 runtime value 并产生 success/failure 分支。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: TypeScript is not runtime validation</span>
  </div>

```ts
type CreateNoteInput = {
  title: string;
};

function readTitle(input: CreateNoteInput): string {
  return input.title.trim();
}

const rawBody: unknown = { title: 123 };
const unsafeInput = rawBody as CreateNoteInput;

console.log(readTitle(unsafeInput));
```
</div>

逐行看机制：`rawBody` 的 runtime value 仍然是普通 object；`as CreateNoteInput` 只让 checker 暂时相信它；`readTitle` 内部调用的是 JavaScript string method；当 `title` 实际是 number 时，Node runtime 不会参考 TypeScript type alias，而是按真实 value 抛错。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: runtime error after unsafe assertion</span>
  </div>

```text
TypeError: input.title.trim is not a function
```
</div>

**运行方式：** 在 practice package 中运行 `npm run typecheck` 检查类型关系，运行 `npm run run:all` 观察 validation branch 输出。

**预期输出：** valid body 进入 `safeInput`，invalid body 进入 `validationError`。

**执行过程：** request body 先是 `unknown`，schema 读取属性和值，Zod 生成 success 或 issues，成功 data 才传入下一层。

**resource/lifecycle changes：** 没有新 socket 或 server lifecycle；只有短生命周期 JavaScript object 与 error object。

**why the output/type error/runtime error happens：** assertion 不检查空字符串；Zod `min(1)` 会在 runtime 发现空字符串并产生 issue。

**contrast：** 类型声明是 compile-time contract；Zod schema 是 runtime gate。

**common mistake and violated rule：** 常见错误是把 `as CreateNoteInput` 当作 validation，违反“外部输入必须在 runtime 验证”的规则。

**real-project relationship：** 线上 API 的错误请求、旧客户端、手写 curl 都可能发送错误 shape；只有 runtime validation 能挡住。

**current learning-path relationship：** 这是 Chapter 03 `req.body` trust boundary 的 TypeScript 版本。

**final memory model：** TypeScript 让内部调用更可靠；Zod 让外部输入先过门。

**机制证据链：** Trigger: `POST /notes` 或 `validateCreateNote(invalidBody)`；JS values: plain object 与 Zod result；TS relation checked: `CreateNoteInput`；emitted/noEmit boundary: `tsc --noEmit` 不输出 JS；Node runtime: 执行 validator；runtime validation: `safeParse`；result: invalid branch；violated rule: assertion is not validation；recognition: service 接收 Express/raw body 时就是同类问题。

<a id="section-9-2"></a>
### 9.2 Type checker、emitted JavaScript、Node runtime 的三层边界

**结论：** Type checker、emitted JavaScript、Node runtime 是三层不同系统：checker 证明类型关系，emit 决定输出 JS，Node 执行 JS 和加载模块。

**本节解决的问题：** 后端 TS 初学者常把 `tsconfig.json`、`node`、`tsx` 混成一个工具。结果是“类型检查通过”被误解成“运行时一定能加载模块”。

**技术意义：** 工程化 API 必须同时让 checker 通过、runtime import 可解析、HTTP 行为可测试。任何一层失败都不是另外一层自动能解决的。

**概念解释：** `tsc --noEmit` 会构建 TypeScript program 并检查类型；`tsx` 负责让 TypeScript source 能在 Node 进程中运行；`node` 负责执行 JavaScript semantics、module loader、process、test runner。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** `type`、interface 属于 type-system；relative import specifier 最终属于 Node resolution；Express request pipeline 属于 framework convention；OpenAPI contract 不参与 checker 或 Node loader。

**底层机制：** `tsc` 读取 source graph 与 declaration files；`tsx` 在运行前处理 TS source；Node ESM loader 根据 URL/specifier/package metadata 加载模块。

**API / 语法规则：** `tsc --noEmit` 不写输出；Node ESM relative import 需要显式 extension；`module: "NodeNext"` 让 checker 模拟 Node module behavior。

**示例代码与逐行解释：** `practices/04-typescript-backend-engineering/01-tsconfig/module-format-boundary.ts` 把 source file、nearest package type、emitted import specifier、runtime rule 放在同一个 evidence object 中，便于对照三层边界。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: type erasure boundary</span>
  </div>

```ts
type RuntimeNote = {
  title: string;
};

const note: RuntimeNote = {
  title: "Runtime value"
};

console.log(note.title);
```
</div>

逐行看机制：`RuntimeNote` 只给 checker 建立 object shape；`const note` 才是真正进入 Node runtime 的 JavaScript value；执行时 stdout 只来自 `console.log`，不会输出任何 type alias 信息。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/package.json</span>
  </div>

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "node --import tsx --test tests/notes.integration.test.ts"
  }
}
```
</div>

这里的两行 script 对应两层系统：`typecheck` 只问 TypeScript program 是否一致；`test` 启动 Node process，经过 `tsx` 支持后实际 import app、发起 Supertest request、检查 response。

**运行方式：** 先运行 `npm run typecheck`，再运行该文件；这两个动作分别观察 checker 和 runtime。

**预期输出：** 输出包含 `source=`、`package.type=`、`emitted.import=` 与 `runtime.rule=`。

**执行过程：** checker 接收 TS source；runner 执行文件；Node 创建字符串、object、function 调用并写 stdout。

**resource/lifecycle changes：** 没有 HTTP server；只有 Node process、module record 和 stdout write。

**why the output/type error/runtime error happens：** `noEmit` 阶段不会执行 `console.log`，runtime 阶段才会产生 stdout。

**contrast：** 类型错误是 checker 结果；`ERR_MODULE_NOT_FOUND` 是 Node loader 结果；HTTP `400` 是 Express response 结果。

**common mistake and violated rule：** 常见错误是认为 `tsc` 通过就代表 Node ESM 能解析 extensionless import，违反“checker 与 runtime loader 不同”的规则。

**real-project relationship：** CI 需要 typecheck，启动命令需要 runtime execution，API tests 需要 HTTP behavior。

**current learning-path relationship：** Chapter 02 的 module system 在本章变成 TypeScript NodeNext 配置问题。

**final memory model：** 先问“哪一层失败”：checker、emit/runner、还是 Node/Express runtime。

**机制证据链：** Trigger: `npm run typecheck` 或 `tsx module-format-boundary.ts`；JS values: evidence object；TS relation checked: object fields match `ModuleBoundaryEvidence`；emitted/noEmit boundary: `noEmit` stops JS output；Node runtime/package resolution: runner loads ESM under package type; result: stdout evidence；violated rule: treating checker as loader；recognition: build passes but `node dist/server.js` fails to import。

<a id="section-9-3"></a>
### 9.3 Node native type stripping 与 full TypeScript support

**结论：** Node native TypeScript support 是 lightweight type stripping：移除 erasable TypeScript syntax，不做 type checking，不读取 `tsconfig.json`。完整 TS 支持仍通常依赖 `tsx` 或其他 runner/transpiler。

**本节解决的问题：** 现代 Node 已能直接处理部分 `.ts`，但这不等于“Node 成了 TypeScript compiler”。本章需要避免把 native type stripping 用错到后端应用启动路径。

**技术意义：** 后端项目需要严格 typecheck、NodeNext resolution、Zod validation 和 integration tests；只靠 type stripping 无法覆盖这些工程约束。

**概念解释：** erasable syntax 是可以被删除且不改变 JS runtime 语义的类型注解。`enum`、parameter property、runtime namespace 等需要生成 JavaScript，因此不属于 lightweight stripping。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** type stripping 是 Node runtime 的 source handling；`tsconfig.json` 是 TypeScript tooling；Express/Zod/OpenAPI 不由 Node type stripping 自动处理。

**底层机制：** Node 将 inline types 替换为空白以保持行列稳定；遇到需要 transform 的 syntax 会报 unsupported syntax；checker 不参与。

**API / 语法规则：** 对 build scripts 可使用 erasable TS；对 full backend app 使用 `tsx` 运行、`tsc --noEmit` 检查。

**示例代码与逐行解释：** `native-type-stripping-limits.ts` 的 `normalizeTitle` 使用 erasable type annotation；`transformRequiredSyntaxExamples` 把需要 transform 的 syntax 放入字符串，避免默认运行失败。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/04-typescript-backend-engineering/01-tsconfig/native-type-stripping-limits.ts</span>
  </div>

```ts
type NoteInput = {
  title: string;
  body?: string;
};

function normalizeTitle(input: NoteInput): string {
  return input.title.trim().toLowerCase();
}

const erasableSyntaxResult = normalizeTitle({ title: " Native Type Stripping " });

const transformRequiredSyntaxExamples = [
  'enum NoteState { Draft = "draft" }',
  "class User { constructor(public name: string) {} }",
  "namespace RuntimeBox { export const value = 1; }"
];

console.log({ erasableSyntaxResult });
console.log({ transformRequiredSyntaxExamples });
console.log("node.typeStripping=removes erasable syntax only");
console.log("node.typeChecking=false");
```
</div>

逐行看机制：`NoteInput` 与 `: string` 都是 erasable syntax；`normalizeTitle` 执行时只接收 object 并调用 string methods；数组中的 `enum`、parameter property、namespace 被故意放进 string，说明它们需要 transform，不适合作为 lightweight stripping 的默认运行路径。

**运行方式：** 可以用 `tsx` 运行；在支持 type stripping 的 Node 版本中，也可以观察只含 erasable syntax 的 `.ts` 被执行。

**预期输出：** `erasableSyntaxResult` 变为 normalized title，并输出 `node.typeChecking=false`。

**执行过程：** Node/runner 读取 source，删除或转换类型层内容，执行 JS object 与 function 调用。

**resource/lifecycle changes：** 只有单个 process 与 stdout；无 server。

**why the output/type error/runtime error happens：** inline type annotation 对 JS 值没有影响，所以 title trimming 正常；需要生成代码的 syntax 无法靠删除实现。

**contrast：** `type NoteInput = ...` 可删除；`enum NoteState` 需要生成 object-like runtime value。

**common mistake and violated rule：** 常见错误是用 native type stripping 运行含 parameter property 的 app，违反“type stripping only removes erasable syntax”的规则。

**real-project relationship：** 项目脚本可轻量执行 TS；生产 app 或测试通常仍应有 explicit runner 与 typecheck。

**current learning-path relationship：** Chapter 01 的 Node runtime 边界在这里扩展到 `.ts` source handling。

**final memory model：** Native type stripping 是“删除类型”，不是“编译 TypeScript 项目”。

**机制证据链：** Trigger: `node native-type-stripping-limits.ts` 或 `tsx native-type-stripping-limits.ts`；JS values: note input object、array of syntax strings；TS relation checked: only when `tsc --noEmit` runs；emitted/noEmit boundary: type stripping does not use TS emit; Node runtime: removes erasable syntax；result: normalized title；violated rule: using transform-required TS；recognition: error mentions unsupported TypeScript syntax。

<a id="section-9-4"></a>
### 9.4 `tsc --noEmit`、`tsx`、`node` 的职责区别

**结论：** `tsc --noEmit` 是检查命令，`tsx` 是 TypeScript execution runner，`node` 是 JavaScript runtime。后端项目通常需要把它们都放进 workflow，而不是互相替代。

**本节解决的问题：** 如果只跑 `tsx src/server.ts`，代码可能能启动但类型错误未被 CI 拦住；如果只跑 `tsc --noEmit`，代码没有被实际请求验证。

**技术意义：** 严肃 API 的最低验证组合是 typecheck 加 integration test。前者证明代码关系，后者证明 runtime request/response 行为。

**概念解释：** `tsx` 让 `.ts` 可以在 Node 中运行，适合 dev/test；`node --import tsx --test` 使用 Node test runner 执行 TS tests；`node` 自身负责 process、module loader、HTTP server。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** `tsc` 是 tooling behavior；`tsx` 是 execution tooling；Node runtime 执行 Express app；Zod validation 与 HTTP response 只在 runtime test 中可观察。

**底层机制：** `npm run typecheck` 调用 `tsc`；`npm test` 调用 Node test runner，并通过 `--import tsx` 注册 TS execution support。

**API / 语法规则：** 本章最终项目使用 `typecheck`、`test`、`dev`、`start` 四类 scripts；`private: true` 防止学习项目被误发布。

**示例代码与逐行解释：** `mini-projects/typed-api-starter/package.json` 中 `typecheck` 与 `test` 分离；`test` 不替代 `typecheck`，因为测试路径不一定覆盖所有类型关系。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/package.json</span>
  </div>

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "start": "tsx src/server.ts",
    "typecheck": "tsc --noEmit",
    "test": "node --import tsx --test tests/notes.integration.test.ts"
  }
}
```
</div>

逐行看机制：`dev` 与 `start` 是 execution path；`typecheck` 是 static checking path；`test` 是 Node runtime path，`--import tsx` 让 test runner 能加载 TypeScript test 和 app source。四者组合后，才能分别覆盖编辑反馈、启动入口、类型关系和 HTTP 行为。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run typecheck
npm test
```
</div>

两条命令的观察点不同：第一条没有 HTTP request；第二条会 import Express app 并通过 Supertest 构造 request/response。把第二条当成第一条，会漏掉未执行路径上的类型错误。

**运行方式：** 先 `npm run typecheck`，再 `npm test`。

**预期输出：** typecheck 无输出或只输出成功退出码；test 输出 Node test runner 的 test report。

**执行过程：** npm 查找 script，启动子进程，`tsc` 或 `node` 读取项目文件，退出码反馈给 shell。

**resource/lifecycle changes：** `npm test` 会创建 test process 和 Supertest request lifecycle，但不绑定公网端口。

**why the output/type error/runtime error happens：** type error 来自 checker；HTTP assertion failure 来自 Supertest/Node test runner。

**contrast：** `tsx src/server.ts` 证明启动路径；`node --import tsx --test` 证明 test files；`tsc --noEmit` 证明全项目类型。

**common mistake and violated rule：** 常见错误是把 `tsx` 当成 typecheck，违反“execution runner does not replace static checking”的规则。

**real-project relationship：** 本地开发可能只跑 `dev`，提交前至少跑 typecheck 与 tests。

**current learning-path relationship：** Chapter 03 的 Supertest 在本章获得 TypeScript execution support。

**final memory model：** `tsc` 看关系，`tsx` 帮运行，`node` 真执行。

**机制证据链：** Trigger: `npm run typecheck` then `npm test`；JS values: npm script args、test callbacks、HTTP response objects；TS relation checked: project program；emitted/noEmit boundary: no JS output in typecheck；Node runtime: test runner executes app import；Express transition: request enters middleware/router；result: typecheck exit and test assertions；violated rule: runner treated as checker；recognition: app starts but CI typecheck fails。

<a id="section-9-5"></a>
### 9.5 Node 后端 tsconfig：`target`、`module`、`moduleResolution`、`types`、`strict`

**结论：** Node 后端 `tsconfig.json` 的核心不是“越多越好”，而是让 checker 的世界与 Node runtime 的 module world 对齐。

**本节解决的问题：** 错误的 `moduleResolution` 会让 TypeScript 接受 Node runtime 不会解析的 import；关闭 `strict` 会让外部输入和业务结果的边界变松。

**技术意义：** 一个小 API 也需要稳定 baseline：`target` 对齐 runtime，`module`/`moduleResolution` 对齐 NodeNext，`types` 选择 Node declarations，`strict` 提升错误早发现，`noEmit` 支持检查型 workflow。

**概念解释：** `target` 是 JS language target；`module` 是 module emit/checking mode；`moduleResolution` 是 specifier resolution strategy；`types` 是全局类型入口；`strict` 是一组类型检查开关。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** `tsconfig.json` 是 tooling config；它影响 checker 和 emit，不是 Express runtime config；Node native type stripping 不读取它完成 typecheck。

**底层机制：** `tsc` 读取 config，建立 program，查找 `.d.ts` 与 source graph，根据 NodeNext 判断每个文件的 module format 与 import specifier 合法性。

**API / 语法规则：** `module: "NodeNext"` 与 `moduleResolution: "NodeNext"` 应成对出现；不要把 `moduleResolution: "bundler"` 当成 Node runtime resolution。

**示例代码：** 本章基线见 3 节的 `tsconfig-nodenext-baseline.json` code window。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/tsconfig.json</span>
  </div>

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "types": ["node"]
  }
}
```
</div>

逐行看机制：`target` 约束可用 JavaScript 语言级别；`module` 与 `moduleResolution` 一起让 checker 按 Node package/module 规则工作；`strict` 让 `ServiceResult` 这类 union 必须先 narrowing；`noEmit` 表示本项目把 `tsc` 用作检查器，而不是把它当启动器。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: bundler resolution is not the Node backend baseline</span>
  </div>

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```
</div>

这个对照片段适合前端 bundler 假设，不适合作为本章 Node API baseline。它可能让 checker 接受 bundler 会处理的 specifier，但实际 `node` 启动时仍按 Node loader 规则解析。

**逐行解释：** `module` 与 `moduleResolution` 同步表达“以 Node 原生 module 规则学习”；`types: ["node"]` 让 `process`、`node:test`、`node:crypto` 等 Node declarations 进入 checker；`strict` 让 service result union 必须被分支处理。

**运行方式：** `npm run typecheck`。

**预期输出：** checker 接受显式 `.js` specifier、Node globals 和 strict service result narrowing。

**执行过程：** TypeScript 读取 config，加载 include files，解析 imports，检查 types，返回退出码。

**resource/lifecycle changes：** 没有 server；只有 TypeScript compiler process 与 filesystem reads。

**why the output/type error/runtime error happens：** 如果缺少 Node types，`process` 或 `node:test` 类型会缺失；如果 module strategy 不匹配，import resolution diagnostics 会出现。

**contrast：** `bundler` 适合 bundler 假设，不代表 Node loader 能在 runtime 解析同样 specifier。

**common mistake and violated rule：** 常见错误是从前端项目复制 `moduleResolution: "bundler"` 到 Node API，违反“TypeScript checker must model target runtime”的规则。

**real-project relationship：** 后端 library/app 的 import 规则、test runner 类型、process env 类型都从这里开始稳定。

**current learning-path relationship：** Chapter 02 package/module 知识在这里成为 checker 配置。

**final memory model：** `tsconfig` 是 checker 的地图；地图必须画的是 Node 的地形。

**机制证据链：** Trigger: `npm run typecheck`；JS values: none executed；TS relation checked: imports, Node globals, strict unions；emitted/noEmit boundary: no output written；Node/package resolution: modeled by NodeNext; result: diagnostics or clean exit；violated rule: bundler strategy used for Node runtime；recognition: TS accepts import that Node later rejects。

<a id="section-9-6"></a>
### 9.6 `NodeNext`：package.json `type`、扩展名与运行时加载

**结论：** `NodeNext` 让 TypeScript 跟随 Node 的 dual module world：`.mts` 类似 `.mjs`，`.cts` 类似 `.cjs`，普通 `.ts`/`.js` 受 nearest `package.json#type` 影响。

**本节解决的问题：** ESM/CJS 在 TS 项目里最常见的失败不是语法不会写，而是 checker 与 Node runtime 对同一个文件的 module format 判断不同。

**技术意义：** 后端项目的 import path 是 runtime contract。`src/app.ts` 中写 `./modules/notes/notes.routes.js` 是为了让输出或 runner 与 Node ESM loader 一致。

**概念解释：** `package.json#type` 是 package metadata；Node loader 读取它决定 `.js` 的 ESM/CJS；TypeScript NodeNext 也读取相同边界来判断 `.ts` 的 module behavior。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** import/export syntax 属于 module syntax；extension 与 `type` 属于 Node package resolution；Express/Zod 不参与 module loading。

**底层机制：** Node ESM loader 以 URL 解析相对 specifier，relative specifier 需要显式 file extension；bare specifier 走 package resolution 与 `exports`。

**API / 语法规则：** ESM relative import 写 runtime extension；package private learning project 设置 `"type": "module"` 与 `"private": true`。

**示例代码与逐行解释：** `module-format-boundary.ts` 输出 `package.type=module` 与 `emitted.import=./notes.service.js`，强调 source TS 的 import 字符串必须考虑 runtime。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/04-typescript-backend-engineering/01-tsconfig/module-format-boundary.ts</span>
  </div>

```ts
type ModuleFormat = "esm" | "commonjs";

type ModuleBoundaryEvidence = {
  nearestPackageType: "module" | "commonjs";
  sourceFile: string;
  sourceSyntax: ModuleFormat;
  emittedImportSpecifier: string;
  nodeRuntimeRule: string;
};

function explainNodeNextBoundary(evidence: ModuleBoundaryEvidence): string {
  return [
    `source=${evidence.sourceFile}`,
    `package.type=${evidence.nearestPackageType}`,
    `source.syntax=${evidence.sourceSyntax}`,
    `emitted.import=${evidence.emittedImportSpecifier}`,
    `runtime.rule=${evidence.nodeRuntimeRule}`
  ].join(" | ");
}

const esmEvidence: ModuleBoundaryEvidence = {
  nearestPackageType: "module",
  sourceFile: "src/app.ts",
  sourceSyntax: "esm",
  emittedImportSpecifier: "./notes.service.js",
  nodeRuntimeRule: "Node ESM resolves the explicit .js specifier after TypeScript checking."
};

console.log(explainNodeNextBoundary(esmEvidence));
```
</div>

逐行看机制：`nearestPackageType` 模拟 nearest `package.json#type`；`emittedImportSpecifier` 明确写成 `.js`，因为运行时 loader 不读取 TypeScript 类型关系；`explainNodeNextBoundary` 把 checker 决策和 Node runtime rule 放进同一条可观察输出。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/package.json</span>
  </div>

```json
{
  "type": "module",
  "private": true
}
```
</div>

这两行建立 package boundary：普通 `.ts` source 在 NodeNext checker 中按 ESM 处理；学习项目不会被误发布；source 中的 relative import 应按 ESM runtime 规则显式写扩展名。

**运行方式：** `tsx 01-tsconfig/module-format-boundary.ts`。

**预期输出：** 一条 ESM boundary，一条 CommonJS boundary，显示不同 runtime rule。

**执行过程：** runner 加载 file，Node module system 处理 import，函数拼接 evidence string 并写 stdout。

**resource/lifecycle changes：** 生成 module record 和 stdout write；无网络资源。

**why the output/type error/runtime error happens：** explicit `.js` specifier 在 ESM runtime 中可解析；extensionless relative import 在 Node ESM 中违反 mandatory extension rule。

**contrast：** CommonJS historically often hides extensions through resolution；Node ESM 不自动补 extension。

**common mistake and violated rule：** 常见错误是 `import "./notes.service"`，违反 Node ESM relative specifier 必须完整的规则。

**real-project relationship：** 生产启动失败的 `ERR_MODULE_NOT_FOUND` 很多来自 extension/package type 不一致。

**current learning-path relationship：** Chapter 02 的 ESM/CJS 在本章与 TypeScript `NodeNext` 合并。

**final memory model：** `NodeNext` 不是新模块系统；它是 TypeScript 向 Node 原生模块规则对齐。

**机制证据链：** Trigger: import `./modules/notes/notes.routes.js`；JS values: module specifier string and package metadata；TS relation checked: resolver accepts specifier；emitted/noEmit boundary: `noEmit` checks only；Node runtime/package resolution: ESM loader resolves URL；result: module loaded or resolution error；violated rule: missing extension；recognition: works in bundler but fails in Node。

<a id="section-9-7"></a>
### 9.7 `import type`、type erasure 与 runtime import 错误

**结论：** `import type` 告诉 TypeScript 和 lightweight type stripping：这个 import 只属于类型层，不应该成为 runtime value import。

**本节解决的问题：** 如果把只存在于 `.d.ts` 或类型层的名称当作 value import，Node runtime 会尝试加载并读取 runtime export，最终报错。

**技术意义：** 后端模块边界更严格：类型 import 应该消失，值 import 必须存在。错误的 value import 会在启动时破坏整个 API。

**概念解释：** TypeScript type erasure 会在输出阶段删除类型信息；`import type` 是语法层标记，用于保持 runtime import graph 干净。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** `import type` 属于 syntax 与 type-system；被 erasure 后不进入 emitted JS；Node runtime 只处理 value imports。

**底层机制：** checker 使用 imported type；emit 或 stripping 删除 type-only import；Node 不会看到被删除的 import，也不会寻找该 runtime export。

**API / 语法规则：** 类型专用导入写 `import type { Request } from "express"`；同一 import 中也可写 `import { value, type TypeName } from "module"`。

**示例代码与逐行解释：** `type-only-import-boundary.ts` 中 `Stats` 使用 `import type`；`mkdtempSync` 使用 value import，因为它在 runtime 创建临时目录。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/04-typescript-backend-engineering/01-tsconfig/type-only-import-boundary.ts</span>
  </div>

```ts
import { mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import type { Stats } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

type FileReport = {
  path: string;
  size: number;
  isFile: boolean;
};

function toFileReport(path: string, stats: Stats): FileReport {
  return {
    path,
    size: stats.size,
    isFile: stats.isFile()
  };
}

const temporaryDirectory = mkdtempSync(join(tmpdir(), "type-only-import-"));
const filePath = join(temporaryDirectory, "note.txt");

writeFileSync(filePath, "type-only import boundary\n", "utf8");

const report = toFileReport(filePath, statSync(filePath));
const wrongRuntimeImportExample = 'import { Stats } from "node:fs";';

console.log(report);
console.log(`wrong.example=${wrongRuntimeImportExample}`);

rmSync(temporaryDirectory, { recursive: true, force: true });
```
</div>

逐行看机制：`mkdtempSync`、`statSync`、`writeFileSync` 是 runtime functions，必须保留为 value imports；`Stats` 只约束参数类型，必须用 `import type`；最后的 cleanup 证明 value import 确实参与了文件系统资源生命周期。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: value import of a type-only name</span>
  </div>

```text
SyntaxError: The requested module 'node:fs' does not provide an export named 'Stats'
```
</div>

这个错误不是类型错误，而是 Node ESM runtime export lookup 失败。识别方式是报错发生在 import evaluation 阶段，通常还没有进入业务函数。

**运行方式：** `tsx 01-tsconfig/type-only-import-boundary.ts`。

**预期输出：** 文件报告与错误示例字符串；不会尝试从 `node:fs` runtime export `Stats`。

**执行过程：** Node 执行 fs value imports，创建临时文件，`Stats` 只参与 checker，最后清理临时目录。

**resource/lifecycle changes：** 创建并删除临时目录；这是 value import 参与 runtime 的可观察资源变化。

**why the output/type error/runtime error happens：** `Stats` 是 type-only declaration，不是 runtime export；value import 会让 Node 查找不存在的 runtime binding。

**contrast：** `import { statSync }` 必须保留；`import type { Stats }` 必须被删除。

**common mistake and violated rule：** 常见错误是从 `express` value-import `Request`，违反“types should not become runtime imports”的规则。

**real-project relationship：** app 启动时报 `does not provide an export named ...` 时，优先检查 type-only import。

**current learning-path relationship：** Chapter 02 import/export 语法在本章加入 TypeScript erasure 维度。

**final memory model：** 如果名字只给 checker 看，用 `import type`；如果 Node 要调用它，才做 value import。

**机制证据链：** Trigger: module import evaluation；JS values: `mkdtempSync` function and file path strings；TS relation checked: `Stats` parameter type；emitted/noEmit boundary: type-only import erased；Node runtime/package resolution: loads `node:fs` for values only；result: file report；violated rule: importing type as value；recognition: runtime export error for names that are interfaces/types。

<a id="section-9-8"></a>
### 9.8 `app.ts` / `server.ts` 分离：可测试性与监听生命周期

**结论：** `app.ts` 只创建 Express app 和 middleware graph；`server.ts` 才拥有 `listen`、port、signal、server close lifecycle。

**本节解决的问题：** 如果 test import app 时自动 `listen`，测试会绑定端口、产生资源泄漏、让并行测试不稳定。

**技术意义：** app/server split 让 Supertest 能直接对 app 发请求，不需要真实 network port；server lifecycle 仍由 production/dev entry point 管理。

**概念解释：** Express app 是 request handler；`app.listen` 返回 Node HTTP server，拥有 socket 和 close lifecycle。二者职责不同。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** `app.ts` 是 Express convention；`server.ts` 是 Node runtime resource owner；tests import app 是 tooling/testing behavior。

**底层机制：** Supertest 接收 app handler，构造 request/response simulation；不需要占用 `PORT`。真实启动时 `server.ts` 调用 `listen` 创建 server handle。

**API / 语法规则：** `export const app = express()`；`app.listen(config.PORT, callback)` 只在 server entry point。

**示例代码与逐行解释：** `mini-projects/typed-api-starter/src/app.ts` 组合 middleware；`src/server.ts` 解析 config 并调用 `listen`，signal handler 负责 close。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/app.ts</span>
  </div>

```ts
import express from "express";
import { notesRouter } from "./modules/notes/notes.routes.js";
import { errorMiddleware } from "./shared/errors/error-middleware.js";
import { notFoundMiddleware } from "./shared/middleware/not-found.js";
import { requestIdMiddleware } from "./shared/middleware/request-id.js";

export const app = express();

app.disable("x-powered-by");
app.use(requestIdMiddleware);
app.use(express.json({ limit: "32kb" }));
app.use("/notes", notesRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
```
</div>

逐行看机制：`app` 是 Express request handler graph；middleware 注册顺序就是 request 的流动顺序；这里没有 `listen`，所以 test import 不会创建 socket。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/server.ts</span>
  </div>

```ts
import { app } from "./app.js";
import { config } from "./config/env.js";
import { logger } from "./shared/logging/logger.js";

const server = app.listen(config.PORT, () => {
  logger.info("server started", {
    port: config.PORT,
    nodeEnv: config.NODE_ENV
  });
});

function closeServer(signal: NodeJS.Signals): void {
  logger.info("server shutdown requested", { signal });

  server.close((error) => {
    if (error) {
      logger.error("server shutdown failed", { signal }, error);
      process.exitCode = 1;
      return;
    }

    logger.info("server stopped", { signal });
  });
}

process.once("SIGINT", closeServer);
process.once("SIGTERM", closeServer);
```
</div>

逐行看机制：`server` 是 Node HTTP server handle；`config.PORT` 是 runtime config value；signal handler 只属于 process lifecycle，不属于 app composition。测试导入 `app.ts` 不会执行这个文件。

**运行方式：** tests import `app`；dev 命令运行 `tsx watch src/server.ts`。

**预期输出：** tests 不打印 `server started`；dev 启动时 logger 输出 `server started`。

**执行过程：** import app 创建 middleware stack；test request 进入 stack；server entry point 才创建 listening handle。

**resource/lifecycle changes：** app import 无 socket；server listen 创建 socket；close 释放 server handle。

**why the output/type error/runtime error happens：** Supertest 直接调用 app handler；如果 import 时 listen，测试进程可能不会退出。

**contrast：** app 是 pure composition；server 是 process resource owner。

**common mistake and violated rule：** 常见错误是在 `app.ts` 中 `app.listen`，违反“testable app should not own listening lifecycle”的规则。

**real-project relationship：** 集成测试、serverless adapter、worker process 都受益于 app/server split。

**current learning-path relationship：** Chapter 03 已见 app/server split，本章用 TypeScript 与 config/logging 补齐边界。

**final memory model：** import app 不开端口，运行 server 才开端口。

**机制证据链：** Trigger: `import { app }` in test or `tsx src/server.ts`；JS values: Express app, Node server object；TS relation checked: exported app type and server callback；emitted/noEmit boundary: typecheck separate；Node runtime: `listen` creates handle only in server；Express transition: app middleware stack handles Supertest request；result: assertions or startup log；violated rule: listening during import；recognition: tests hang or port conflict。

<a id="section-9-9"></a>
### 9.9 分层架构：route、controller、service、repository、schema、types

**结论：** 本章分层不是为了文件多，而是让 HTTP adaptation、validation、business rules、data access contract、types 各自有单一责任。

**本节解决的问题：** Chapter 03 可以在 router 中直接写较多逻辑；本章要把 API 扩展到可测试、可替换、可维护的 backend structure。

**技术意义：** 当 controller 不写业务规则、service 不知道 Express、repository 不知道 HTTP，后续替换 storage 或扩展 API 时改动更局部。

**概念解释：** route 定义 HTTP path/method；schema 定义 runtime validation；controller 适配 request/response；service 执行业务；repository 提供 storage contract；types 连接静态模型。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** 分层是 architecture；route/controller 是 Express convention；schema 是 runtime validation；types 是 type-system；repository 是 storage boundary。

**底层机制：** Express match route 后依次运行 validators 和 controller；controller 调 service；service await repository promise；controller 发送 response。

**API / 语法规则：** `Router()` 定义 route；`RequestHandler` 定义 controller signature；repository 用 interface/type 表达 contract。

**示例代码与逐行解释：** `route-controller-service-repository.ts` 从 `routeRequest` 开始，展示 controller 判断 HTTP input，service 处理 title rule，repository 保存内存数组。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { createNote, deleteNote, getNote, listNotes, updateNote } from "./notes.controller.js";
import { createNoteSchema, noteIdParamsSchema, updateNoteSchema } from "./notes.schema.js";

export const notesRouter = Router();

notesRouter.get("/", listNotes);
notesRouter.post("/", validateRequest("body", createNoteSchema), createNote);
notesRouter.get("/:id", validateRequest("params", noteIdParamsSchema), getNote);
notesRouter.patch("/:id", validateRequest("params", noteIdParamsSchema), validateRequest("body", updateNoteSchema), updateNote);
notesRouter.delete("/:id", validateRequest("params", noteIdParamsSchema), deleteNote);
```
</div>

逐行看机制：route 只声明 method/path 和 middleware 顺序；`validateRequest` 先把 raw request target 转成 validated data；controller 只在 validation 成功后被调用。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.controller.ts</span>
  </div>

```ts
export const createNote: RequestHandler = async (_request, response) => {
  const input = getValidated<CreateNoteInput>(response, "body");
  const result = await notesService.createNote(input);

  if (!result.ok) {
    throw mapDomainErrorToHttpError(result.error);
  }

  sendResponse(response, 201, toNoteResponseDto(result.data));
};
```
</div>

这里的 controller 只适配 HTTP：从 `response.locals` 取 validated body，调用 service，根据 `ServiceResult` 选择 throw 或发送 response。它不直接读 repository，也不重新实现 schema 规则。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.service.ts</span>
  </div>

```ts
async createNote(input: CreateNoteInput): Promise<ServiceResult<Note>> {
  const note = await repository.create({
    title: input.title,
    body: input.body ?? ""
  });

  return { ok: true, data: note };
}
```
</div>

service 接收已经验证过的 typed command；它知道业务默认值，但不知道 Express `Request` 或 `Response`。这让业务层可以用 fake repository 单独测试。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.repository.ts</span>
  </div>

```ts
export class MemoryNotesRepository implements NotesRepository {
  private readonly notes = new Map<string, Note>();

  async create(record: CreateNoteRecord): Promise<Note> {
    const now = new Date();
    const note: Note = {
      id: randomUUID(),
      title: record.title,
      body: record.body,
      createdAt: now,
      updatedAt: now
    };

    this.notes.set(note.id, note);
    return note;
  }
}
```
</div>

repository 只管理 storage value：`Map` 是当前实现细节，`NotesRepository` 是上层依赖的 contract。以后替换数据库时，service 的调用形状不应该改变。

**运行方式：** `tsx 03-layered-architecture/route-controller-service-repository.ts`。

**预期输出：** 一个 HTTP-like success response 和 repository list。

**执行过程：** request-like object 进入 controller，controller 产生 command，service 调 repository，repository mutation 后返回 note。

**resource/lifecycle changes：** 内存数组新增 note；没有数据库连接。

**why the output/type error/runtime error happens：** title 是 string 时进入 service；非 string 时 controller 直接返回 HTTP-like error。

**contrast：** router 中混合所有逻辑短期快，长期导致业务和 HTTP 无法独立测试。

**common mistake and violated rule：** 常见错误是 service 接收 `Request`，违反“service should not depend on Express framework object”的规则。

**real-project relationship：** 真实项目中 repository 可以替换 storage，controller tests 与 service tests 可以分开。

**current learning-path relationship：** Chapter 03 router pipeline 在本章拆成更明确的层。

**final memory model：** route 定路，controller 翻译，service 决策，repository 存取，schema 守门，types 约束。

**机制证据链：** Trigger: `POST /notes` route match；JS values: Request, validated DTO, command, note object；TS relation checked: controller/service/repository signatures；emitted/noEmit boundary: typecheck no output；Node runtime: executes async calls；Express transition: router to middleware to controller；runtime validation: schema before controller；result: success response；violated rule: service sees `Request`；recognition: business function imports `express`。

<a id="section-9-10"></a>
### 9.10 DTO / domain model / storage model / response DTO 的边界

**结论：** DTO、domain model、storage model、response DTO 不应默认共用一个 type；它们服务于不同边界。

**本节解决的问题：** 如果 request body、domain object、memory record、public response 使用同一结构，内部字段变化会泄漏到 API 或验证层。

**技术意义：** 分模型能防止 password、internal state、Date object、storage-specific field 意外出现在 response。

**概念解释：** request DTO 面向 client input；domain model 面向业务规则；storage model 面向 repository 保存形态；response DTO 面向 public API output。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** DTO 是 API contract 边界；domain model 是 service 边界；storage model 是 repository 边界；response DTO 与 OpenAPI response schema 对齐。

**底层机制：** request body 先被 Zod 解析成 input DTO；service 构造 domain note；repository 可保存另一种 shape；controller 映射 response DTO。

**API / 语法规则：** 不把 `Date` 直接作为 JSON contract；response DTO 使用 ISO string；request DTO 不携带 server-generated id。

**示例代码与逐行解释：** `dto-domain-boundary.ts` 中 `toDomainNote` 生成 `Date`；`toStoredNote` 转为 ISO string；`toResponseDto` 输出 public shape。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/04-typescript-backend-engineering/02-type-runtime-boundary/dto-domain-boundary.ts</span>
  </div>

```ts
type CreateNoteRequestDto = {
  title: string;
  body?: string;
};

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

type StoredNote = {
  id: string;
  title: string;
  body: string;
  createdAtIso: string;
  updatedAtIso: string;
};

type NoteResponseDto = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

function toDomainNote(id: string, input: CreateNoteRequestDto, now: Date): Note {
  return {
    id,
    title: input.title.trim(),
    body: input.body?.trim() ?? "",
    createdAt: now,
    updatedAt: now
  };
}

function toStoredNote(note: Note): StoredNote {
  return {
    id: note.id,
    title: note.title,
    body: note.body,
    createdAtIso: note.createdAt.toISOString(),
    updatedAtIso: note.updatedAt.toISOString()
  };
}

function toResponseDto(storedNote: StoredNote): NoteResponseDto {
  return {
    id: storedNote.id,
    title: storedNote.title,
    body: storedNote.body,
    createdAt: storedNote.createdAtIso,
    updatedAt: storedNote.updatedAtIso
  };
}
```
</div>

逐行看机制：request DTO 是外部输入 shape；domain model 用 `Date` 表达进程内部时间语义；storage model 转成 ISO string 便于持久化；response DTO 只暴露 public contract。类型相似不代表层边界可以合并。

**运行方式：** `tsx 02-type-runtime-boundary/dto-domain-boundary.ts`。

**预期输出：** `created`、`stored`、`response` 三个对象 shape 不同。

**执行过程：** function pipeline 依次创建 domain object、storage record、response DTO。

**resource/lifecycle changes：** 创建多个 object reference；没有外部 resource。

**why the output/type error/runtime error happens：** `Date` 在 domain 中便于比较，JSON response 需要 string。

**contrast：** 单一 `Note` type 简单，但会把边界耦合在一起。

**common mistake and violated rule：** 常见错误是把 repository record 直接 `res.json`，违反“storage model is not public API”的规则。

**real-project relationship：** 当未来 storage 变成 persistent store 时，API response 不应被 storage column names 牵着走。

**current learning-path relationship：** Chapter 03 的 response shape 在本章成为明确 response DTO。

**final memory model：** 一个概念可以有多个模型；模型跟边界走，不跟名字走。

**机制证据链：** Trigger: `POST /notes` creates a note；JS values: request DTO, domain note, stored note, response DTO；TS relation checked: mapper input/output types；emitted/noEmit boundary: checkers only；Node runtime: JSON serialization of response DTO；Express transition: controller sends response；API contract: OpenAPI describes response DTO；result: ISO strings in response；violated rule: leaking storage shape；recognition: public response contains internal field。

<a id="section-9-11"></a>
### 9.11 request DTO 与 Zod schema：unknown input 到 typed data

**结论：** request DTO 的可靠来源不是手写 type，而是 runtime schema 成功解析后的 `z.infer` 类型。

**本节解决的问题：** 手写 `type CreateNoteInput` 与 Zod schema 容易漂移；schema 增减字段后 type 未同步，会制造隐蔽 bug。

**技术意义：** 用 `z.infer<typeof createNoteSchema>` 把 runtime validation 与 type-system 输出连接起来，减少重复声明。

**概念解释：** `safeParse` 返回 discriminated union；`success: true` 分支中 `data` 已经被 Zod 验证和转换，checker 可以把它视为 inferred type。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** Zod schema 是 runtime validation；`z.infer` 是 TypeScript type extraction；OpenAPI 仍需另行维护或生成，不自动验证请求。

**底层机制：** schema 遍历 unknown value 的属性和值，生成 success/failure；TypeScript narrowing 根据 `result.success` 判断 union branch。

**API / 语法规则：** `z.object({...})` 定义 shape；`schema.safeParse(value)` 不抛异常；`z.infer<typeof schema>` 推导类型。

**示例代码与逐行解释：** `zod-safeparse-boundary.ts` 中 `patchNoteSchema` 使用 `refine` 要求至少一个字段；成功分支赋值给 `PatchNoteInput`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/04-typescript-backend-engineering/02-type-runtime-boundary/zod-safeparse-boundary.ts</span>
  </div>

```ts
import { z } from "zod";

const patchNoteSchema = z.object({
  title: z.string().trim().min(1).optional(),
  body: z.string().trim().optional()
}).refine((value) => value.title !== undefined || value.body !== undefined, {
  message: "At least one field is required"
});

type PatchNoteInput = z.infer<typeof patchNoteSchema>;

function describePatchInput(rawInput: unknown): string {
  const result = patchNoteSchema.safeParse(rawInput);

  if (!result.success) {
    return `invalid:${result.error.issues[0]?.message ?? "Unknown validation error"}`;
  }

  const patchInput: PatchNoteInput = result.data;
  return `valid:title=${patchInput.title ?? "unchanged"} body=${patchInput.body ?? "unchanged"}`;
}

console.log(describePatchInput({ title: "Updated" }));
console.log(describePatchInput({}));
```
</div>

逐行看机制：`rawInput` 是 `unknown`；`safeParse` 读取真实 value；失败分支返回 issue message；成功分支中的 `result.data` 同时是 runtime-cleaned object 与 `PatchNoteInput`。`z.infer` 只是从 schema 推导静态类型，不替代 `safeParse`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/shared/validation/validate-request.ts</span>
  </div>

```ts
export function validateRequest<TOutput>(target: RequestTarget, schema: ZodType<TOutput>): RequestHandler {
  return (request, response, next) => {
    const result = schema.safeParse(request[target]);

    if (!result.success) {
      next(new HttpError(400, "VALIDATION_ERROR", "Invalid request", result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }))));
      return;
    }

    const locals = response.locals as ValidatedLocals;
    locals.validated ??= {};
    locals.validated[target] = result.data;
    next();
  };
}
```
</div>

最终项目把同一机制放进 Express middleware：失败时进入 error middleware；成功时把 typed output 存入 `response.locals`，后续 controller 不再读取 raw body。

**运行方式：** `tsx 02-type-runtime-boundary/zod-safeparse-boundary.ts`。

**预期输出：** 有 title 的 patch 为 valid；空 object 触发 refine message。

**执行过程：** Zod 检查 optional 字段，再执行 refine，最后返回 success 或 error issues。

**resource/lifecycle changes：** 只创建 validation result 与 issues array。

**why the output/type error/runtime error happens：** 空 object 满足 optional 字段类型，但违反 refine 的业务输入规则。

**contrast：** TypeScript optional property 不能表达“至少一个字段存在”的 runtime condition；Zod refine 可以。

**common mistake and violated rule：** 常见错误是只用 type 表达 request DTO，违反“external input must pass runtime validation”的规则。

**real-project relationship：** PATCH endpoint 最容易出现“类型可选但业务不允许空 patch”的问题。

**current learning-path relationship：** Chapter 03 已用 Zod，本章把 Zod 输出正式接入 controller/service type flow。

**final memory model：** Schema 守 runtime 门，`z.infer` 把守门结果交给 checker。

**机制证据链：** Trigger: `PATCH /notes/:id` body validation；JS values: raw body, Zod result, issues；TS relation checked: `UpdateNoteInput`; emitted/noEmit boundary: `z.infer` erased；Node runtime: executes validator；Express transition: validation middleware before controller；runtime validation: refine branch；result: typed data or `VALIDATION_ERROR`; violated rule: type-only DTO used as validator；recognition: invalid JSON shape reaches service。

<a id="section-9-12"></a>
### 9.12 typed service layer：业务规则、结果类型与异常边界

**结论：** Service layer 应接收 typed command，返回 typed result，把业务错误表达为 domain error，而不是直接写 HTTP response。

**本节解决的问题：** 如果 service 抛 `HttpError` 或读取 `Request`，业务规则被 HTTP framework 绑定，未来无法复用。

**技术意义：** `ServiceResult<T>` 让 controller 必须处理 success/error union；业务错误不会被遗漏，也不会把内部错误 message 直接泄漏给 client。

**概念解释：** domain error 是业务层语言，例如 `NOTE_NOT_FOUND`；HTTP status 是 adapter 层语言，例如 `404`。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** service type 属于 type-system 与 architecture；controller 映射 HTTP；error middleware 输出 API contract。

**底层机制：** controller 调 service，service await repository；返回 union 后，controller 通过 `if (!result.ok)` narrow 到 error branch。

**API / 语法规则：** 使用 discriminated union：`{ ok: true; data } | { ok: false; error }`。

**示例代码与逐行解释：** `notes.service.ts` 中 `getNote` 根据 repository result 返回 success 或 `notFound(id)`；`notes.controller.ts` 中 `mapDomainErrorToHttpError` 才决定 `404`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.service.ts</span>
  </div>

```ts
function notFound(id: string): ServiceResult<never> {
  return {
    ok: false,
    error: {
      code: "NOTE_NOT_FOUND",
      message: `Note ${id} was not found`
    }
  };
}

async getNote(id: string): Promise<ServiceResult<Note>> {
  const note = await repository.findById(id);
  return note ? { ok: true, data: note } : notFound(id);
}
```
</div>

逐行看机制：service 用 discriminated union 表达业务结果；`ok: false` 是 typed branch，不是 HTTP response；`NOTE_NOT_FOUND` 是 domain code，直到 controller 才映射到 `404`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.controller.ts</span>
  </div>

```ts
function mapDomainErrorToHttpError(error: DomainError): HttpError {
  if (error.code === "NOTE_NOT_FOUND") {
    return new HttpError(404, error.code, "Note was not found");
  }

  return new HttpError(500, "INTERNAL_ERROR", "Unexpected service error");
}
```
</div>

这段映射把 domain error 变成 transport error。这样 service 可以被 CLI、job、HTTP controller 复用，而不会把 HTTP status code 写入业务层。

**运行方式：** integration test 请求不存在的 note，期望 `404` 与 `NOTE_NOT_FOUND`。

**预期输出：** service error 被 public HTTP error 映射，不暴露 repository internals。

**执行过程：** repository 返回 `undefined`；service 产生 domain error；controller 转成 `HttpError`；error middleware 发送 response。

**resource/lifecycle changes：** 只读取内存 map；无 storage external handle。

**why the output/type error/runtime error happens：** union narrowing 要求先判断 `ok`，否则 checker 不允许直接读取 `data`。

**contrast：** Throwing unknown error 适合 unexpected failure；domain not found 是 expected business result。

**common mistake and violated rule：** 常见错误是 service 直接 `response.status(404)`，违反“service does not own HTTP adapter”的规则。

**real-project relationship：** 相同 service 可被 HTTP、CLI、worker 调用，只要外层 adapter 映射错误。

**current learning-path relationship：** Chapter 03 error middleware 在本章获得 domain-to-HTTP mapping 前置层。

**final memory model：** Service 说业务发生了什么；controller 决定 HTTP 怎么表达。

**机制证据链：** Trigger: `GET /notes/:id`；JS values: id string, repository map result, service union；TS relation checked: `ServiceResult<Note>` narrowing；emitted/noEmit boundary: union erased at runtime；Node runtime: async promise resolution；Express transition: controller to error middleware；error boundary: domain error mapped to `HttpError`; result: `404` response；violated rule: service imports Express；recognition: business tests require mock Response。

<a id="section-9-13"></a>
### 9.13 repository contract：内存实现与未来数据库替换边界

**结论：** Repository contract 让 service 依赖“能做什么”，而不是依赖“当前怎么存”。本章只使用 in-memory repository，不引入 persistent storage。

**本节解决的问题：** 如果 service 直接操作 storage implementation，未来替换 storage 会改动业务层。

**技术意义：** 通过 `NotesRepository` interface，service 可以在测试、内存实现、未来 storage adapter 之间复用。

**概念解释：** repository 是 storage boundary。它可以是 Map、file、database adapter，但 service 不应该知道底层细节。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** repository contract 属于 type-system 与 architecture；当前 implementation 是 runtime in-memory Map；不属于 API contract。

**底层机制：** `MemoryNotesRepository` 持有 `Map<string, Note>`；`create` mutation 写入 map；`list` 返回 values copy；`reset` 支持测试隔离。

**API / 语法规则：** contract 暴露 `list`、`findById`、`create`、`update`、`delete`、`reset`；service 依赖 interface。

**示例代码与逐行解释：** `repository-contract.ts` 中 `NotesRepository` 是 contract，`MemoryNotesRepository` 是实现，`demoRepositoryContract` 只用 interface 类型。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.types.ts</span>
  </div>

```ts
export type NotesRepository = {
  list(): Promise<Note[]>;
  findById(id: string): Promise<Note | undefined>;
  create(record: CreateNoteRecord): Promise<Note>;
  update(id: string, patch: UpdateNoteRecord): Promise<Note | undefined>;
  delete(id: string): Promise<boolean>;
  reset(): void;
};
```
</div>

逐行看机制：repository contract 实际放在 `notes.types.ts`，不是 repository implementation 文件。service 只需要这个 method shape，不需要知道 storage 是 `Map`、SQL table 还是远程 API。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.repository.ts</span>
  </div>

```ts
export class MemoryNotesRepository implements NotesRepository {
  private readonly notes = new Map<string, Note>();

  async findById(id: string): Promise<Note | undefined> {
    return this.notes.get(id);
  }

  async delete(id: string): Promise<boolean> {
    return this.notes.delete(id);
  }

  reset(): void {
    this.notes.clear();
  }
}
```
</div>

实现类用 `implements NotesRepository` 接受 checker 约束。`reset` 是学习项目和 integration test 的便利边界；真实数据库项目通常会换成 transaction、fixture 或 isolated test database。

**运行方式：** `tsx 03-layered-architecture/repository-contract.ts`。

**预期输出：** list 返回内存创建的 note。

**执行过程：** create 生成 id，写入 Map，list 复制 values。

**resource/lifecycle changes：** Map 内部状态变化；无外部连接。

**why the output/type error/runtime error happens：** service 只要求 contract 方法存在；implementation 可以替换，只要满足 signature。

**contrast：** 内存 map 快速、可测试；未来 storage adapter 需要处理连接、serialization、失败重试，但不在本章范围。

**common mistake and violated rule：** 常见错误是在 controller 里直接访问 repository，绕过 service 业务规则。

**real-project relationship：** 真项目中 repository contract 是从 in-memory 练习走向 persistent adapter 的第一步。

**current learning-path relationship：** 本章只建立替换边界，不提前进入 storage 技术。

**final memory model：** Repository 是“存取能力接口”，不是“某个具体存储产品”。

**机制证据链：** Trigger: service calls `repository.update(id, patch)`；JS values: Map, id, patch, note object；TS relation checked: implementation satisfies `NotesRepository`；emitted/noEmit boundary: interface erased；Node runtime: Map mutation；result: updated note or undefined；violated rule: controller bypasses service；recognition: HTTP layer imports storage implementation directly。

<a id="section-9-14"></a>
### 9.14 Error model：domain error、HttpError、error middleware 映射

**结论：** 本章错误模型分三层：domain error 表达业务失败，`HttpError` 表达 public HTTP failure，error middleware 统一发送 JSON error response 与 safe log。

**本节解决的问题：** 没有统一错误模型时，API 会出现多种错误 shape，内部 message 可能泄漏，测试也难以断言。

**技术意义：** 稳定 error response shape 是 API contract 的一部分；它让 client、test、日志都能基于同一错误代码工作。

**概念解释：** `DomainError` 不知道 status code；`HttpError` 带 status/code/message/details；error middleware 是 Express error pipeline 的最后 public adapter。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** domain error 属于 service；`HttpError` 属于 HTTP adapter；error middleware 属于 Express convention；response shape 属于 API contract。

**底层机制：** Controller throw `HttpError` 或 validation middleware `next(HttpError)`；Express error middleware 接收 4 参数 handler；response 未发送时输出 JSON。

**API / 语法规则：** Express error middleware signature 是 `(error, request, response, next)`；public error response 使用 `{ ok: false, error: { code, message, details } }`。

**示例代码与逐行解释：** `domain-error-vs-http-error.ts` 演示 `NOTE_NOT_FOUND` 到 `HttpError(404, ...)`；最终项目 `error-middleware.ts` 负责输出统一 shape。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/04-typescript-backend-engineering/04-errors-config-logging/domain-error-vs-http-error.ts</span>
  </div>

```ts
function mapDomainErrorToHttpError(error: DomainError): HttpError {
  if (error.code === "NOTE_NOT_FOUND") {
    return new HttpError(404, error.code, "Note was not found");
  }

  return new HttpError(400, error.code, "Invalid note input");
}

const result = getNote("missing");

if (!result.ok) {
  const httpError = mapDomainErrorToHttpError(result.error);
  console.log({ statusCode: httpError.statusCode, code: httpError.code, message: httpError.message });
}
```
</div>

逐行看机制：domain result 先经过 `ok` narrowing；只有失败分支才进入 HTTP mapping；stdout 里出现的是 public error shape，不是 repository 内部细节。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/shared/errors/http-error.ts</span>
  </div>

```ts
export class HttpError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details: ErrorDetail[];

  constructor(statusCode: number, code: string, message: string, details: ErrorDetail[] = []) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}
```
</div>

`HttpError` 是 transport-level error object。它带 status code 和 public code，但仍是 JavaScript `Error`，所以可以被 Express error middleware 捕获。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/shared/errors/error-middleware.ts</span>
  </div>

```ts
export const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  const publicError = toPublicError(error);
  const requestId = typeof response.locals.requestId === "string" ? response.locals.requestId : undefined;

  logger.error("request failed", {
    requestId,
    method: request.method,
    path: request.originalUrl,
    statusCode: publicError.statusCode,
    code: publicError.code
  }, error);

  response.status(publicError.statusCode).json({
    ok: false,
    error: {
      code: publicError.code,
      message: publicError.message,
      details: publicError.details
    }
  });
};
```
</div>

error middleware 是 Express pipeline 的最后统一出口：它保留 request context 写日志，同时只把 public error fields 返回给 client。

**运行方式：** 请求不存在 note 或 invalid body。

**预期输出：** response `ok` 为 false，`error.code` 为稳定字符串。

**执行过程：** service/controller/validator 产生错误，Express 跳转 error middleware，logger 记录 safe context，response 输出 public error。

**resource/lifecycle changes：** response status/body 被设置；request lifecycle 结束。

**why the output/type error/runtime error happens：** Express 识别 error middleware 并按 error pipeline 传递，而不是继续普通 route handler。

**contrast：** Unexpected error 输出 `INTERNAL_ERROR`；expected domain error 输出具体 public code。

**common mistake and violated rule：** 常见错误是 `catch (error) { res.json(error) }`，违反“do not leak internal error details”的规则。

**real-project relationship：** API client 依赖 error code，不应该解析内部 stack 或 repository message。

**current learning-path relationship：** Chapter 03 error middleware 在本章加入 typed domain mapping。

**final memory model：** Domain error 讲业务，HttpError 讲 HTTP，middleware 讲 public JSON。

**机制证据链：** Trigger: missing note lookup；JS values: domain error, HttpError, response object；TS relation checked: `DomainErrorCode` union and `HttpError` class；emitted/noEmit boundary: types erased；Node runtime: throw/next propagation；Express transition: normal middleware to error middleware；logging/error boundary: safe structured log；result: `404` JSON；violated rule: leaking raw error；recognition: response body contains stack/message from internals。

<a id="section-9-15"></a>
### 9.15 配置模型：集中解析 `process.env`、默认值、secret boundary

**结论：** `process.env` 是 runtime external input，必须集中解析、验证、默认化；不要在业务代码里散落读取环境变量。

**本节解决的问题：** 分散读取 env 会导致端口、日志级别、运行模式在不同文件中有不同 fallback，测试也难以稳定。

**技术意义：** `src/config/env.ts` 是 process boundary adapter：它把 string/undefined 的 env world 转成 typed config。

**概念解释：** Node `process.env` 的值来自进程环境，通常是 string 或 undefined；Zod `z.coerce.number()` 能把 `PORT` 从 string 转成 number 并校验范围。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** `process.env` 属于 Node runtime；Zod parse 属于 runtime validation；`AppConfig` 属于 type-system；secrets 不应进入 logs。

**底层机制：** `parseEnv` 读取 raw env object，schema 解析 `NODE_ENV`、`PORT`、`LOG_LEVEL`，失败时阻止启动。

**API / 语法规则：** 只在 config module parse env；导出 typed `config`；不要记录 secret values。

**示例代码与逐行解释：** `env-parse-config.ts` 用 sample env 展示 parse；最终项目 `src/config/env.ts` 在 server entry point 使用。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/config/env.ts</span>
  </div>

```ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info")
});

export type AppConfig = z.infer<typeof envSchema>;

export function parseEnv(rawEnv: NodeJS.ProcessEnv = process.env): AppConfig {
  const result = envSchema.safeParse(rawEnv);

  if (!result.success) {
    throw new Error("Invalid environment configuration");
  }

  return result.data;
}

export const config = parseEnv();
```
</div>

逐行看机制：`process.env` 的 value 类型本质上是 string/undefined；`z.coerce.number()` 把 `PORT` 转成 number 并检查范围；`AppConfig` 从 schema 推导，避免手写配置类型与 runtime parser 分叉。

**运行方式：** `tsx 04-errors-config-logging/env-parse-config.ts` 或启动 `src/server.ts`。

**预期输出：** sample config 中 `PORT` 是 number，`NODE_ENV` 与 `LOG_LEVEL` 是受限 string union。

**执行过程：** Node process 提供 env，Zod coerce/check，返回 typed object。

**resource/lifecycle changes：** 读取 process memory；无外部 file/resource。

**why the output/type error/runtime error happens：** 未 parse 的 `PORT` 是 string；parse 后才是 safe number。

**contrast：** `Number(process.env.PORT || 3000)` 缺少范围和错误信息；schema 集中表达规则。

**common mistake and violated rule：** 常见错误是在 logger 中输出 entire env，违反 secret boundary。

**real-project relationship：** 启动失败应早于接收请求；配置错误不应该变成半运行状态。

**current learning-path relationship：** Chapter 01 的 process/env 在本章成为 typed config module。

**final memory model：** env 是外部输入，进入 app 前先 parse。

**机制证据链：** Trigger: import `config` in `server.ts`；JS values: `process.env`, parse result；TS relation checked: `AppConfig`; emitted/noEmit boundary: schema remains runtime, type erased；Node runtime: reads process env；runtime validation: Zod coerce and enum；logging boundary: no secret output；result: config object or startup error；violated rule: scattered raw env reads；recognition: `process.env` access appears in controllers/services。

<a id="section-9-16"></a>
### 9.16 request id middleware：请求链路关联与日志上下文

**结论：** request id middleware 在每个请求开始时读取或生成 correlation id，并把它放入 `response.locals` 与 response header。

**本节解决的问题：** 没有 request id 时，多条日志无法可靠关联到同一次 HTTP 请求。

**技术意义：** request id 是最小 observability primitive：即使没有外部 tracing，也能把 request completed、request failed、client header 串起来。

**概念解释：** `response.locals` 是 Express request lifecycle 内的 per-response storage；它不是全局变量，不会在并发请求之间共享。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** request id 属于 Express middleware 与 logging context；生成 id 用 Node `crypto`; response header 是 API behavior。

**底层机制：** middleware 读取 `x-request-id`，否则 `randomUUID()`；写入 `response.locals.requestId`；`finish` 事件记录完成日志。

**API / 语法规则：** middleware signature `(request, response, next)`；必须调用 `next()`；不要用全局 mutable variable 保存当前 request id。

**示例代码与逐行解释：** `request-id-middleware.ts` 练习文件展示最小读写；最终项目 `src/shared/middleware/request-id.ts` 还在 `finish` 上记录 duration。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/shared/middleware/request-id.ts</span>
  </div>

```ts
export const requestIdMiddleware: RequestHandler = (request, response, next) => {
  const startedAt = performance.now();
  const incomingRequestId = request.header("x-request-id");
  const requestId = incomingRequestId && incomingRequestId.trim().length > 0
    ? incomingRequestId
    : randomUUID();

  response.locals.requestId = requestId;
  response.setHeader("x-request-id", requestId);

  response.once("finish", () => {
    logger.info("request completed", {
      requestId,
      method: request.method,
      path: request.originalUrl,
      statusCode: response.statusCode,
      durationMs: Math.round(performance.now() - startedAt)
    });
  });

  next();
};
```
</div>

逐行看机制：middleware 在请求进入时决定 request id；写入 `response.locals` 供后续 error/logging 使用；写入 header 供 client 关联；`finish` 事件代表 response 已结束，此时记录 status 和耗时更准确。

**运行方式：** Supertest 设置 `x-request-id` 请求 unknown route。

**预期输出：** response header 保留相同 request id；日志 context 使用同一值。

**执行过程：** request 进入 middleware，locals/header 被设置，后续 middleware/controller 可读取，response finish 后 log。

**resource/lifecycle changes：** 每个 response locals 生命周期随请求结束释放；`finish` listener 在完成时执行。

**why the output/type error/runtime error happens：** `response.locals` 与当前 response 绑定，所以并发请求不会覆盖彼此 id。

**contrast：** 全局 `currentRequestId` 会被并发请求覆盖。

**common mistake and violated rule：** 常见错误是把 request id 放全局变量，违反“request context must be request-scoped”的规则。

**real-project relationship：** 生产排查时，client 报一个 request id，比搜索时间范围更可靠。

**current learning-path relationship：** Chapter 03 middleware 顺序在本章获得 logging context 用途。

**final memory model：** request id 跟请求走，不跟进程全局走。

**机制证据链：** Trigger: any HTTP request；JS values: header string, generated UUID, response locals；TS relation checked: middleware handler type；emitted/noEmit boundary: types erased；Node runtime: `randomUUID` and `finish` event；Express transition: middleware before route；logging boundary: request id in context；result: header and JSON log；violated rule: global request id；recognition: concurrent logs show mismatched ids。

<a id="section-9-17"></a>
### 9.17 structured logging：JSON log、level、message、context、error

**结论：** structured logging 把日志变成 JSON object：`level`、`message`、`requestId`、`context`、`error` 各自有稳定位置。

**本节解决的问题：** 自由文本日志对机器检索不友好，也容易把 secrets 或 raw error 泄漏出去。

**技术意义：** 即使用内部小 logger，也要建立安全 serialization 与 consistent field names，为后续生产日志工具保留迁移边界。

**概念解释：** log entry 是 runtime object；JSON.stringify 后写入 stdout。error serialization 只取 public-safe fields，不输出 secrets。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** logging 是 runtime behavior；logger type 限制 level/context shape；error middleware 决定何时写 error log。

**底层机制：** logger 接收 level/message/context/error，序列化 error，写 stdout。tests 可以替换 sink，避免噪声。

**API / 语法规则：** 本章不引入 Pino；使用内部 `logger.info`、`logger.error`。

**示例代码与逐行解释：** `structured-logger.ts` 练习展示 `serializeError` 与 JSON output；最终项目 `logger.ts` 增加 `setLoggerSink` 支持测试。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/shared/logging/logger.ts</span>
  </div>

```ts
function writeLog(level: LogLevel, message: string, context: LogContext = {}, error?: unknown): void {
  sink(JSON.stringify({
    level,
    message,
    requestId: context.requestId,
    context,
    error: serializeError(error)
  }));
}

export const logger = {
  info(message: string, context?: LogContext): void {
    writeLog("info", message, context);
  },
  error(message: string, context?: LogContext, error?: unknown): void {
    writeLog("error", message, context, error);
  }
};

export function setLoggerSink(nextSink: LoggerSink): void {
  sink = nextSink;
}
```
</div>

逐行看机制：logger 统一把 log 写成 JSON line；`requestId` 保持在顶层便于搜索；`serializeError` 防止把不可序列化 Error 直接丢给 JSON；`setLoggerSink` 让 integration test 可以关闭 stdout 噪声。

**运行方式：** `tsx 04-errors-config-logging/structured-logger.ts`。

**预期输出：** 每行是一个 JSON string，包含 `level`、`message`、`requestId`、`context`。

**执行过程：** 函数创建 entry object，序列化 error，再 stdout write。

**resource/lifecycle changes：** stdout write 是 process I/O；无文件写入。

**why the output/type error/runtime error happens：** JSON field 固定后，日志系统能按 `requestId` 或 `code` 过滤。

**contrast：** `console.log("failed", error)` 输出不稳定，难以索引，也可能包含 stack。

**common mistake and violated rule：** 常见错误是记录 entire request body 或 env，违反 secret/data minimization boundary。

**real-project relationship：** 日志是故障证据，不应该依赖人类阅读长字符串。

**current learning-path relationship：** Chapter 01 stdout 在本章成为 backend logging interface。

**final memory model：** Log 是 data，不是随手拼接的句子。

**机制证据链：** Trigger: request finish or error middleware；JS values: context object, Error object, log entry；TS relation checked: `LogLevel` union；emitted/noEmit boundary: type union erased；Node runtime: stdout write；Express transition: finish/error path；logging boundary: safe serialization；result: JSON log；violated rule: logging secrets/raw request；recognition: logs contain tokens or multiline stack in public sink。

<a id="section-9-18"></a>
### 9.18 API contract：OpenAPI、DTO、shared types 与 runtime validation 的关系

**结论：** OpenAPI 描述 HTTP API surface；DTO 表达 TypeScript shape；Zod 执行 runtime validation。三者相关，但不能互相替代。

**本节解决的问题：** 常见误解是“有 OpenAPI 就自动验证”或“有 TypeScript type 就等于 API contract”。本章要求把它们分别定位。

**技术意义：** API contract 让 client、测试、文档对齐；runtime validation 让服务端防御未知输入；TypeScript type 让内部代码稳定。

**概念解释：** OpenAPI file 描述 paths、operations、requestBody、responses、schemas；它本身只是文档/规范数据，除非接入 validator，否则不会拦截请求。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** OpenAPI 是 API contract；Zod 是 runtime validation；TS DTO 是 type-system；Express controller 负责把 runtime data 发送成 contract shape。

**底层机制：** Controller 返回 response DTO；OpenAPI 描述该 JSON shape；tests 断言实际 response 与 contract expectation 一致。

**API / 语法规则：** `openapi`, `info`, `paths`, `components.schemas` 是 OpenAPI document structure；本章不做 codegen。

**示例代码与逐行解释：** `openapi-minimal-contract.yaml` 定义 `/notes`；`contract-response-types.ts` 用 `ApiSuccess<T>` 与 `ApiError` 表达相同 response family。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/openapi/openapi.yaml</span>
  </div>

```yaml
paths:
  /notes:
    post:
      summary: Create a note
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateNoteRequest"
      responses:
        "201":
          description: Note was created
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/NoteSuccess"
        "400":
          description: Request body was invalid
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
```
</div>

逐行看机制：OpenAPI 是外部 contract 描述，说明 request/response shape；它不自动检查 Express runtime。真正 runtime gate 仍是 Zod schema 与 middleware。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/04-typescript-backend-engineering/05-api-contract/contract-response-types.ts</span>
  </div>

```ts
type ApiSuccess<TData> = {
  ok: true;
  data: TData;
};

type ApiError = {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown[];
  };
};

type NoteApiResponse = ApiSuccess<NoteResponseDto> | ApiError;

function sendOpenApiShapedResponse(note: NoteResponseDto): NoteApiResponse {
  return {
    ok: true,
    data: note
  };
}
```
</div>

TS response union 让 controller 的 return shape 更稳定，但 client 仍只能相信实际 HTTP response。contract、type 和 runtime validation 是三条互相校验的线，不是同一个系统。

**运行方式：** 阅读 OpenAPI 文件，对照 integration tests 中的 response assertions。

**预期输出：** `/notes` response 使用 `{ ok: true, data }`；错误使用 `{ ok: false, error }`。

**执行过程：** OpenAPI 不参与 request execution；Express/Zod/controller 执行，tests 比对 runtime output。

**resource/lifecycle changes：** OpenAPI 文件是 static contract artifact；runtime request 仍由 app 处理。

**why the output/type error/runtime error happens：** 如果 controller 输出字段与 OpenAPI 不一致，typecheck 未必发现；integration test 或 contract review 才能发现。

**contrast：** Zod schema 可以验证 body；OpenAPI schema 描述 body；TypeScript type 描述代码中 body。

**common mistake and violated rule：** 常见错误是把 OpenAPI 当 runtime validator，违反“description is not execution”的规则。

**real-project relationship：** 多端协作时，OpenAPI 是外部沟通 contract；server still validates.

**current learning-path relationship：** Chapter 03 的 API response 在本章形成文档化 contract。

**final memory model：** OpenAPI 说“应该是什么”，Zod 查“现在是什么”，TypeScript 管“代码认为是什么”。

**机制证据链：** Trigger: client reads OpenAPI or test sends request；JS values: response DTO object；TS relation checked: `ApiSuccess<NoteResponseDto>`；emitted/noEmit boundary: OpenAPI file not emitted JS；Node runtime: Express sends JSON；runtime validation: Zod checks input；API contract: YAML describes output；result: response shape；violated rule: treating contract as validator；recognition: invalid body passes despite OpenAPI schema。

<a id="section-9-19"></a>
### 9.19 Integration tests：app import、Supertest、Node test runner、repository reset

**结论：** Integration tests 应 import app、不绑定端口、用 Supertest 发 HTTP request，并在每个 test 前 reset in-memory repository。

**本节解决的问题：** 没有 reset 会让测试顺序互相污染；绑定端口会造成端口冲突和慢测试。

**技术意义：** 集成测试证明 Express middleware、validation、controller、service、repository、error middleware 的完整 runtime chain，而不仅是 type relationship。

**概念解释：** Node test runner 提供 `describe`、`it`、`beforeEach`；Supertest 把 Express app 当作 handler 发请求；repository reset 清空内存状态。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** test runner 是 tooling/runtime；Supertest 是 HTTP test adapter；repository reset 是 test isolation；assertions 连接 API contract。

**底层机制：** `node --import tsx --test` 加载 TS tests；test callback 发请求；Express pipeline 执行；assert 检查 response。

**API / 语法规则：** 使用 `node:test` 与 `node:assert/strict`；不引入 Vitest。

**示例代码与逐行解释：** `tests/notes.integration.test.ts` 在 `beforeEach` 调 `notesRepository.reset()`，并通过 `setLoggerSink` 降低测试日志噪声。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/tests/notes.integration.test.ts</span>
  </div>

```ts
beforeEach(() => {
  notesRepository.reset();
  setLoggerSink(() => undefined);
});

afterEach(() => {
  resetLoggerSink();
});

it("creates and reads a note", async () => {
  const created = await request(app)
    .post("/notes")
    .send({ title: "Typed API", body: "Layered Express project" })
    .expect(201);

  assert.equal(created.body.ok, true);
  assert.equal(created.body.data.title, "Typed API");
  assert.match(created.header["x-request-id"], /.+/);

  const fetched = await request(app)
    .get(`/notes/${created.body.data.id}`)
    .expect(200);

  assert.equal(fetched.body.data.id, created.body.data.id);
});
```
</div>

逐行看机制：`beforeEach` 清空 repository，让测试之间不共享 mutable state；`setLoggerSink` 替换 stdout sink；Supertest 对 `app` 发请求而不是占用端口；assert 同时检查 response body 与 request id header。

**运行方式：** `npm test`。

**预期输出：** Node test runner 报告所有 cases 通过。

**执行过程：** 每个 test 创建新 request，Supertest 调 app，assert 检查 status/body/header。

**resource/lifecycle changes：** repository map 被 reset；没有长期监听端口；response lifecycle 每次结束。

**why the output/type error/runtime error happens：** app/server split 让 app 可被导入测试；reset 保证创建/删除 tests 不互相影响。

**contrast：** E2E 启动真实 server 更接近部署，但本章需要快速验证 Express app chain。

**common mistake and violated rule：** 常见错误是测试前不 reset repository，违反“tests must not depend on execution order”的规则。

**real-project relationship：** 真实 API 至少需要覆盖 create/list/get/update/delete/validation/not-found。

**current learning-path relationship：** Chapter 03 Supertest 在本章覆盖更多 typed layers。

**final memory model：** Integration test 是从 HTTP request 到 response 的最小可执行证据链。

**机制证据链：** Trigger: `npm test`；JS values: test callbacks, app handler, repository map, response body；TS relation checked: test imports and app types；emitted/noEmit boundary: `tsx` runs TS, separate typecheck catches full program；Node runtime: node:test executes; Express transition: middleware/router/controller；runtime validation: Zod cases；result: assertions；violated rule: shared state not reset；recognition: tests pass alone but fail in suite。

<a id="section-9-20"></a>
### 9.20 Chapter integration: typed-api-starter

**结论：** `typed-api-starter` 是本章边界模型的整合，不是跳过前面 9.1–9.19 的 scaffold。

**本节解决的问题：** 单个练习文件能证明局部机制；最终项目证明这些机制能在同一个 Express API 中协作。

**技术意义：** 小项目包含 strict TS、NodeNext、Express 5、Zod、service result、repository contract、error middleware、env parsing、request id、JSON logger、OpenAPI 和 integration tests。

**概念解释：** 项目路径按 boundary 划分：`src/modules/notes` 是 domain module，`src/shared` 是跨模块 infrastructure，`openapi` 是 API contract，`tests` 是 runtime evidence。

**边界：syntax, TypeScript type-system behavior, emitted JavaScript, Node runtime behavior, module/package resolution, Express framework convention, runtime validation, tooling behavior, API contract：** 所有边界在项目中都有对应文件；不引入 storage、auth、Redis、Docker、NestJS、Fastify 或 deployment。

**底层机制：** 请求从 app 进入 request id、JSON parser、router、validator、controller、service、repository，再经过 response helper 或 error middleware 完成。

**API / 语法规则：** Endpoints: `GET /notes`、`POST /notes`、`GET /notes/:id`、`PATCH /notes/:id`、`DELETE /notes/:id`；success/error response shape 固定。

**示例代码：** 最终项目使用以下命令观察完整边界。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
cd mini-projects/typed-api-starter
npm run typecheck
npm test
npm run dev
```
</div>

逐行看机制：`typecheck` 覆盖 checker；`test` 覆盖 app import、middleware、route、controller、service、repository、error response；`dev` 进入 `server.ts`，因此才会创建 listening server handle。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm install
npm run typecheck
npm test
```
</div>

**逐行解释：** 第一行安装 `package.json` 中声明的 runtime/dev dependencies；第二行只检查 TypeScript，不启动 app；第三行用 Node test runner 与 Supertest 执行 HTTP integration tests。

**运行方式：** 在 `mini-projects/typed-api-starter` 目录运行上述命令。

**预期输出：** install 生成 dependency tree；typecheck clean exit；tests 断言 Notes API 行为。

**执行过程：** npm 运行 scripts，TypeScript 检查 source graph，Node test runner 通过 `--import tsx` 加载 TS tests。

**resource/lifecycle changes：** install 创建 dependency files；tests 修改 in-memory repository；不会创建 persistent storage。

**why the output/type error/runtime error happens：** 如果 import specifier、schema、service result 或 response shape 破坏，typecheck 或 tests 会暴露。

**contrast：** 本项目是 backend engineering starter，不是 production architecture template。

**common mistake and violated rule：** 常见错误是为了“完整”加入 database/auth/deployment，违反本章只学习 TS backend engineering boundary 的范围。

**real-project relationship：** 真实项目会继续添加 storage、auth、deployment，但应保留本章边界。

**current learning-path relationship：** 它从 Chapter 03 的 Notes API 演进而来，为后续章节留下替换点。

**final memory model：** 最终项目是边界拼装图：每个文件都应该回答“我属于哪一层”。

**机制证据链：** Trigger: `npm test` hitting `/notes`；JS values: validated DTO, service union, Note object, response DTO；TS relation checked: controller/service/repository contracts；emitted/noEmit boundary: typecheck separate from runtime; Node runtime/package resolution: NodeNext ESM with `.js` specifiers; Express transition: app to router to error middleware；runtime validation: Zod body/params；config/logging/error/API contract: env parsed in server, request id log, OpenAPI shape；result: HTTP assertions；violated rule: adding out-of-scope infrastructure；recognition: starter imports database/auth framework before chapter requires it。

## 10. API 与规则索引

| API / 规则 | 层 | 本章用法 |
| --- | --- | --- |
| `tsc --noEmit` | TypeScript tooling | 只检查类型，不输出 JS |
| `node --import tsx --test` | Node test runner + runner hook | 执行 TS integration tests |
| `module: "NodeNext"` | TypeScript module behavior | 对齐 Node ESM/CJS |
| `moduleResolution: "NodeNext"` | TypeScript resolver | 模拟 Node resolution，不等于 bundler |
| `import type` | TypeScript syntax / emit boundary | 避免类型名成为 runtime value import |
| `process.env` | Node runtime | 外部配置输入，集中解析 |
| `express.Router()` | Express convention | 定义 route，不写业务规则 |
| `RequestHandler` | Express type | 标注 middleware/controller signature |
| `z.object().safeParse()` | runtime validation | unknown 到 typed data |
| `node:test` | Node testing | `describe`、`it`、`beforeEach` |
| `node:assert/strict` | Node testing | 对 response 做严格断言 |
| OpenAPI `paths` | API contract | 描述 HTTP routes 与 responses |

## 11. 常见错误对照表

| 错误 | 违反规则 | 结果 | 修正 |
| --- | --- | --- | --- |
| 用 `as CreateNoteInput` 处理 `request.body` | assertion 不是 validation | 错误 runtime value 进入 service | 用 Zod `safeParse` |
| service 接收 Express `Request` | service 不依赖 framework object | service 难以独立测试 | controller 转成 command |
| Node ESM import 省略 extension | relative specifier must be explicit | runtime resolution error | 使用 `.js` runtime specifier |
| 把 OpenAPI 当 validator | description is not execution | invalid input 未被拦截 | OpenAPI 描述，Zod 验证 |
| 在 `app.ts` 中 `listen` | app import 不拥有 socket lifecycle | tests hang 或 port conflict | `server.ts` 负责 listen |
| 日志输出 entire env | secret boundary 被破坏 | secret 泄漏 | 只记录安全 context |
| 不 reset in-memory repository | tests 不应依赖顺序 | test suite 不稳定 | `beforeEach` reset |

## 12. 调试与验证方法

先定位失败层：

1. TypeScript diagnostic：看 `tsconfig`、import specifier、union narrowing、type-only import。
2. Runtime module error：看 nearest `package.json#type`、extension、value import。
3. HTTP validation error：看 Zod schema、middleware 顺序、`response.locals.validated`。
4. Domain error mapping：看 service result、controller mapping、`HttpError`。
5. Test isolation failure：看 repository reset、logger sink、app/server split。

调试时不要先改架构。先问：触发命令或 HTTP request 是什么？创建了哪些 JS values？checker 检查了什么关系？Node loader 或 Express pipeline 走到哪一层？失败属于 validation、module resolution、error mapping 还是 assertion？

## 13. 分项练习说明

`01-tsconfig` 练 checker/runtime/module 边界；`02-type-runtime-boundary` 练 unknown input 与 DTO/domain/storage/response；`03-layered-architecture` 练 HTTP adapter 到 repository contract；`04-errors-config-logging` 练错误、配置、日志和 request id；`05-api-contract` 练 OpenAPI 与 TypeScript response DTO 的关系。

做练习时不要只看输出。每个文件都要能说出：起点命令是什么、JS runtime 创建了什么、TypeScript 检查了什么、Node 或 Express 哪一层参与、结果为什么发生、错误形式违反了哪条规则。

## 14. 最终迷你项目

最终迷你项目把本章机制整合在 `mini-projects/typed-api-starter`，它不替代前面的分节教学。

### 14.1 项目定位

这是一个 Express 5 + TypeScript strict + Zod 的 typed API starter。它只使用 in-memory repository，不包含 persistent storage、auth、Redis、Docker、NestJS、Fastify 或 deployment。

### 14.2 目录责任

| 路径 | 责任 |
| --- | --- |
| `src/app.ts` | 组合 Express middleware、routes、not-found、error middleware |
| `src/server.ts` | 解析 config，启动 listen lifecycle，处理 shutdown signal |
| `src/config/env.ts` | 集中解析 `process.env` |
| `src/modules/notes/notes.routes.ts` | 定义 HTTP method/path 与 validation middleware |
| `src/modules/notes/notes.controller.ts` | HTTP adapter，读取 validated data，发送 response |
| `src/modules/notes/notes.service.ts` | business rules 与 service result |
| `src/modules/notes/notes.repository.ts` | in-memory repository implementation |
| `src/modules/notes/notes.schema.ts` | Zod runtime validation schemas |
| `src/modules/notes/notes.types.ts` | domain、DTO、repository、service result types |
| `src/shared/errors/*` | public HTTP error model 与 centralized error response |
| `src/shared/middleware/*` | request id 与 not-found middleware |
| `src/shared/logging/logger.ts` | structured JSON logger |
| `openapi/openapi.yaml` | HTTP API contract |
| `tests/notes.integration.test.ts` | Node test runner + Supertest integration tests |

### 14.3 完整项目代码

下面是 `typed-api-starter` 的完整核心代码。这里把文件放在同一节，是为了让你能从 package boundary、TypeScript checker、Express runtime、Zod validation、error/logging middleware、OpenAPI contract、integration tests 一次性追踪完整链路。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/package.json</span>
  </div>

```json
{
  "name": "typed-api-starter",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "start": "tsx src/server.ts",
    "typecheck": "tsc --noEmit",
    "test": "node --import tsx --test tests/notes.integration.test.ts"
  },
  "dependencies": {
    "express": "5.2.1",
    "zod": "4.4.3"
  },
  "devDependencies": {
    "@types/express": "5.0.6",
    "@types/node": "26.1.1",
    "@types/supertest": "7.2.1",
    "supertest": "7.2.2",
    "tsx": "4.23.1",
    "typescript": "7.0.2"
  },
  "engines": {
    "node": ">=22"
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/tsconfig.json</span>
  </div>

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "types": ["node"],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "tests/**/*.ts"]
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/app.ts</span>
  </div>

```ts
import express from "express";
import { notesRouter } from "./modules/notes/notes.routes.js";
import { errorMiddleware } from "./shared/errors/error-middleware.js";
import { notFoundMiddleware } from "./shared/middleware/not-found.js";
import { requestIdMiddleware } from "./shared/middleware/request-id.js";

export const app = express();

app.disable("x-powered-by");
app.use(requestIdMiddleware);
app.use(express.json({ limit: "32kb" }));
app.use("/notes", notesRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/server.ts</span>
  </div>

```ts
import { app } from "./app.js";
import { config } from "./config/env.js";
import { logger } from "./shared/logging/logger.js";

const server = app.listen(config.PORT, () => {
  logger.info("server started", {
    port: config.PORT,
    nodeEnv: config.NODE_ENV
  });
});

function closeServer(signal: NodeJS.Signals): void {
  logger.info("server shutdown requested", { signal });

  server.close((error) => {
    if (error) {
      logger.error("server shutdown failed", { signal }, error);
      process.exitCode = 1;
      return;
    }

    logger.info("server stopped", { signal });
  });
}

process.once("SIGINT", closeServer);
process.once("SIGTERM", closeServer);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/config/env.ts</span>
  </div>

```ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info")
});

export type AppConfig = z.infer<typeof envSchema>;

export function parseEnv(rawEnv: NodeJS.ProcessEnv = process.env): AppConfig {
  const result = envSchema.safeParse(rawEnv);

  if (!result.success) {
    throw new Error("Invalid environment configuration");
  }

  return result.data;
}

export const config = parseEnv();
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { createNote, deleteNote, getNote, listNotes, updateNote } from "./notes.controller.js";
import { createNoteSchema, noteIdParamsSchema, updateNoteSchema } from "./notes.schema.js";

export const notesRouter = Router();

notesRouter.get("/", listNotes);
notesRouter.post("/", validateRequest("body", createNoteSchema), createNote);
notesRouter.get("/:id", validateRequest("params", noteIdParamsSchema), getNote);
notesRouter.patch("/:id", validateRequest("params", noteIdParamsSchema), validateRequest("body", updateNoteSchema), updateNote);
notesRouter.delete("/:id", validateRequest("params", noteIdParamsSchema), deleteNote);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { HttpError } from "../../shared/errors/http-error.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import { getValidated } from "../../shared/validation/validate-request.js";
import { notesService } from "./notes.service.js";
import type {
  CreateNoteInput,
  DomainError,
  Note,
  NoteIdParams,
  NoteResponseDto,
  UpdateNoteInput
} from "./notes.types.js";

function toNoteResponseDto(note: Note): NoteResponseDto {
  return {
    id: note.id,
    title: note.title,
    body: note.body,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString()
  };
}

function mapDomainErrorToHttpError(error: DomainError): HttpError {
  if (error.code === "NOTE_NOT_FOUND") {
    return new HttpError(404, error.code, "Note was not found");
  }

  return new HttpError(500, "INTERNAL_ERROR", "Unexpected service error");
}

export const listNotes: RequestHandler = async (_request, response) => {
  const result = await notesService.listNotes();

  if (!result.ok) {
    throw mapDomainErrorToHttpError(result.error);
  }

  sendResponse(response, 200, result.data.map(toNoteResponseDto));
};

export const createNote: RequestHandler = async (_request, response) => {
  const input = getValidated<CreateNoteInput>(response, "body");
  const result = await notesService.createNote(input);

  if (!result.ok) {
    throw mapDomainErrorToHttpError(result.error);
  }

  sendResponse(response, 201, toNoteResponseDto(result.data));
};

export const getNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NoteIdParams>(response, "params");
  const result = await notesService.getNote(params.id);

  if (!result.ok) {
    throw mapDomainErrorToHttpError(result.error);
  }

  sendResponse(response, 200, toNoteResponseDto(result.data));
};

export const updateNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NoteIdParams>(response, "params");
  const input = getValidated<UpdateNoteInput>(response, "body");
  const result = await notesService.updateNote(params.id, input);

  if (!result.ok) {
    throw mapDomainErrorToHttpError(result.error);
  }

  sendResponse(response, 200, toNoteResponseDto(result.data));
};

export const deleteNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NoteIdParams>(response, "params");
  const result = await notesService.deleteNote(params.id);

  if (!result.ok) {
    throw mapDomainErrorToHttpError(result.error);
  }

  sendResponse(response, 200, result.data);
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.service.ts</span>
  </div>

```ts
import { notesRepository } from "./notes.repository.js";
import type {
  CreateNoteInput,
  Note,
  NotesRepository,
  ServiceResult,
  UpdateNoteInput
} from "./notes.types.js";

function notFound(id: string): ServiceResult<never> {
  return {
    ok: false,
    error: {
      code: "NOTE_NOT_FOUND",
      message: `Note ${id} was not found`
    }
  };
}

export function createNotesService(repository: NotesRepository) {
  return {
    async listNotes(): Promise<ServiceResult<Note[]>> {
      return { ok: true, data: await repository.list() };
    },

    async createNote(input: CreateNoteInput): Promise<ServiceResult<Note>> {
      const note = await repository.create({
        title: input.title,
        body: input.body ?? ""
      });

      return { ok: true, data: note };
    },

    async getNote(id: string): Promise<ServiceResult<Note>> {
      const note = await repository.findById(id);
      return note ? { ok: true, data: note } : notFound(id);
    },

    async updateNote(id: string, input: UpdateNoteInput): Promise<ServiceResult<Note>> {
      const note = await repository.update(id, input);
      return note ? { ok: true, data: note } : notFound(id);
    },

    async deleteNote(id: string): Promise<ServiceResult<{ id: string }>> {
      const deleted = await repository.delete(id);
      return deleted ? { ok: true, data: { id } } : notFound(id);
    }
  };
}

export const notesService = createNotesService(notesRepository);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.repository.ts</span>
  </div>

```ts
import { randomUUID } from "node:crypto";
import type { CreateNoteRecord, Note, NotesRepository, UpdateNoteRecord } from "./notes.types.js";

export class MemoryNotesRepository implements NotesRepository {
  private readonly notes = new Map<string, Note>();

  async list(): Promise<Note[]> {
    return [...this.notes.values()];
  }

  async findById(id: string): Promise<Note | undefined> {
    return this.notes.get(id);
  }

  async create(record: CreateNoteRecord): Promise<Note> {
    const now = new Date();
    const note: Note = {
      id: randomUUID(),
      title: record.title,
      body: record.body,
      createdAt: now,
      updatedAt: now
    };

    this.notes.set(note.id, note);
    return note;
  }

  async update(id: string, patch: UpdateNoteRecord): Promise<Note | undefined> {
    const current = this.notes.get(id);

    if (!current) {
      return undefined;
    }

    const updated: Note = {
      ...current,
      ...patch,
      updatedAt: new Date()
    };

    this.notes.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.notes.delete(id);
  }

  reset(): void {
    this.notes.clear();
  }
}

export const notesRepository = new MemoryNotesRepository();
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.schema.ts</span>
  </div>

```ts
import { z } from "zod";

export const noteIdParamsSchema = z.object({
  id: z.string().trim().min(1)
});

export const createNoteSchema = z.object({
  title: z.string().trim().min(1),
  body: z.string().trim().optional()
});

export const updateNoteSchema = z.object({
  title: z.string().trim().min(1).optional(),
  body: z.string().trim().optional()
}).refine((value) => value.title !== undefined || value.body !== undefined, {
  message: "At least one field is required"
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/modules/notes/notes.types.ts</span>
  </div>

```ts
import type { z } from "zod";
import type { createNoteSchema, noteIdParamsSchema, updateNoteSchema } from "./notes.schema.js";

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

export type StoredNote = {
  id: string;
  title: string;
  body: string;
  createdAtIso: string;
  updatedAtIso: string;
};

export type NoteResponseDto = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
export type NoteIdParams = z.infer<typeof noteIdParamsSchema>;

export type CreateNoteRecord = {
  title: string;
  body: string;
};

export type UpdateNoteRecord = {
  title?: string;
  body?: string;
};

export type NotesRepository = {
  list(): Promise<Note[]>;
  findById(id: string): Promise<Note | undefined>;
  create(record: CreateNoteRecord): Promise<Note>;
  update(id: string, patch: UpdateNoteRecord): Promise<Note | undefined>;
  delete(id: string): Promise<boolean>;
  reset(): void;
};

export type DomainErrorCode = "NOTE_NOT_FOUND";

export type DomainError = {
  code: DomainErrorCode;
  message: string;
};

export type ServiceResult<TData> =
  | { ok: true; data: TData }
  | { ok: false; error: DomainError };
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/shared/errors/http-error.ts</span>
  </div>

```ts
export type ErrorDetail = Record<string, unknown>;

export class HttpError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details: ErrorDetail[];

  constructor(statusCode: number, code: string, message: string, details: ErrorDetail[] = []) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/shared/errors/error-middleware.ts</span>
  </div>

```ts
import type { ErrorRequestHandler } from "express";
import { HttpError, isHttpError } from "./http-error.js";
import { logger } from "../logging/logger.js";

type BodyParserError = SyntaxError & {
  status?: number;
  type?: string;
};

function isBodyParserError(error: unknown): error is BodyParserError {
  return error instanceof SyntaxError
    && typeof (error as BodyParserError).status === "number"
    && (error as BodyParserError).type === "entity.parse.failed";
}

function toPublicError(error: unknown): HttpError {
  if (isHttpError(error)) {
    return error;
  }

  if (isBodyParserError(error)) {
    return new HttpError(400, "INVALID_JSON", "Invalid JSON body");
  }

  return new HttpError(500, "INTERNAL_ERROR", "Internal server error");
}

export const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  const publicError = toPublicError(error);
  const requestId = typeof response.locals.requestId === "string" ? response.locals.requestId : undefined;

  logger.error("request failed", {
    requestId,
    method: request.method,
    path: request.originalUrl,
    statusCode: publicError.statusCode,
    code: publicError.code
  }, error);

  response.status(publicError.statusCode).json({
    ok: false,
    error: {
      code: publicError.code,
      message: publicError.message,
      details: publicError.details
    }
  });
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/shared/middleware/request-id.ts</span>
  </div>

```ts
import { randomUUID } from "node:crypto";
import { performance } from "node:perf_hooks";
import type { RequestHandler } from "express";
import { logger } from "../logging/logger.js";

export const requestIdMiddleware: RequestHandler = (request, response, next) => {
  const startedAt = performance.now();
  const incomingRequestId = request.header("x-request-id");
  const requestId = incomingRequestId && incomingRequestId.trim().length > 0
    ? incomingRequestId
    : randomUUID();

  response.locals.requestId = requestId;
  response.setHeader("x-request-id", requestId);

  response.once("finish", () => {
    logger.info("request completed", {
      requestId,
      method: request.method,
      path: request.originalUrl,
      statusCode: response.statusCode,
      durationMs: Math.round(performance.now() - startedAt)
    });
  });

  next();
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/shared/middleware/not-found.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { HttpError } from "../errors/http-error.js";

export const notFoundMiddleware: RequestHandler = (request, _response, next) => {
  next(new HttpError(404, "ROUTE_NOT_FOUND", `Route ${request.method} ${request.originalUrl} was not found`));
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/shared/validation/validate-request.ts</span>
  </div>

```ts
import type { RequestHandler, Response } from "express";
import type { ZodType } from "zod";
import { HttpError } from "../errors/http-error.js";

type RequestTarget = "body" | "params" | "query";

type ValidatedLocals = {
  validated?: Partial<Record<RequestTarget, unknown>>;
};

export function validateRequest<TOutput>(target: RequestTarget, schema: ZodType<TOutput>): RequestHandler {
  return (request, response, next) => {
    const result = schema.safeParse(request[target]);

    if (!result.success) {
      next(new HttpError(400, "VALIDATION_ERROR", "Invalid request", result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }))));
      return;
    }

    const locals = response.locals as ValidatedLocals;
    locals.validated ??= {};
    locals.validated[target] = result.data;
    next();
  };
}

export function getValidated<TOutput>(response: Response, target: RequestTarget): TOutput {
  const locals = response.locals as ValidatedLocals;
  const value = locals.validated?.[target];

  if (value === undefined) {
    throw new HttpError(500, "VALIDATION_STATE_ERROR", "Validated request data was not found");
  }

  return value as TOutput;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/shared/logging/logger.ts</span>
  </div>

```ts
export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogContext = Record<string, unknown> & {
  requestId?: string;
};

type LoggerSink = (line: string) => void;

type SerializedError = {
  name: string;
  message: string;
  code?: string;
  statusCode?: number;
};

const defaultSink: LoggerSink = (line) => {
  process.stdout.write(`${line}\n`);
};

let sink: LoggerSink = defaultSink;

function serializeError(error: unknown): SerializedError | undefined {
  if (error === undefined) {
    return undefined;
  }

  if (error instanceof Error) {
    const maybeCode = "code" in error && typeof error.code === "string" ? error.code : undefined;
    const maybeStatusCode = "statusCode" in error && typeof error.statusCode === "number" ? error.statusCode : undefined;

    return {
      name: error.name,
      message: error.message,
      code: maybeCode,
      statusCode: maybeStatusCode
    };
  }

  return {
    name: "UnknownError",
    message: "Non-error value was thrown"
  };
}

function writeLog(level: LogLevel, message: string, context: LogContext = {}, error?: unknown): void {
  sink(JSON.stringify({
    level,
    message,
    requestId: context.requestId,
    context,
    error: serializeError(error)
  }));
}

export const logger = {
  debug(message: string, context?: LogContext): void {
    writeLog("debug", message, context);
  },
  info(message: string, context?: LogContext): void {
    writeLog("info", message, context);
  },
  warn(message: string, context?: LogContext): void {
    writeLog("warn", message, context);
  },
  error(message: string, context?: LogContext, error?: unknown): void {
    writeLog("error", message, context, error);
  }
};

export function setLoggerSink(nextSink: LoggerSink): void {
  sink = nextSink;
}

export function resetLoggerSink(): void {
  sink = defaultSink;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/src/shared/responses/send-response.ts</span>
  </div>

```ts
import type { Response } from "express";

export type ApiSuccess<TData> = {
  ok: true;
  data: TData;
};

export function sendResponse<TData>(response: Response, statusCode: number, data: TData): void {
  response.status(statusCode).json({
    ok: true,
    data
  } satisfies ApiSuccess<TData>);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/openapi/openapi.yaml</span>
  </div>

```yaml
openapi: 3.1.0
info:
  title: Typed API Starter Notes API
  version: 1.0.0
servers:
  - url: http://127.0.0.1:3000
paths:
  /notes:
    get:
      summary: List notes
      responses:
        "200":
          description: Notes were returned
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/NoteListSuccess"
    post:
      summary: Create a note
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateNoteRequest"
      responses:
        "201":
          description: Note was created
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/NoteSuccess"
        "400":
          description: Request body was invalid
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  /notes/{id}:
    get:
      summary: Get a note
      parameters:
        - $ref: "#/components/parameters/NoteId"
      responses:
        "200":
          description: Note was returned
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/NoteSuccess"
        "404":
          description: Note was not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
    patch:
      summary: Update a note
      parameters:
        - $ref: "#/components/parameters/NoteId"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UpdateNoteRequest"
      responses:
        "200":
          description: Note was updated
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/NoteSuccess"
        "400":
          description: Request body was invalid
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
        "404":
          description: Note was not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
    delete:
      summary: Delete a note
      parameters:
        - $ref: "#/components/parameters/NoteId"
      responses:
        "200":
          description: Note was deleted
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/DeleteNoteSuccess"
        "404":
          description: Note was not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
components:
  parameters:
    NoteId:
      name: id
      in: path
      required: true
      schema:
        type: string
        minLength: 1
  schemas:
    CreateNoteRequest:
      type: object
      required:
        - title
      properties:
        title:
          type: string
          minLength: 1
        body:
          type: string
    UpdateNoteRequest:
      type: object
      minProperties: 1
      properties:
        title:
          type: string
          minLength: 1
        body:
          type: string
    Note:
      type: object
      required:
        - id
        - title
        - body
        - createdAt
        - updatedAt
      properties:
        id:
          type: string
        title:
          type: string
        body:
          type: string
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
    NoteSuccess:
      type: object
      required:
        - ok
        - data
      properties:
        ok:
          type: boolean
          const: true
        data:
          $ref: "#/components/schemas/Note"
    NoteListSuccess:
      type: object
      required:
        - ok
        - data
      properties:
        ok:
          type: boolean
          const: true
        data:
          type: array
          items:
            $ref: "#/components/schemas/Note"
    DeleteNoteSuccess:
      type: object
      required:
        - ok
        - data
      properties:
        ok:
          type: boolean
          const: true
        data:
          type: object
          required:
            - id
          properties:
            id:
              type: string
    ErrorResponse:
      type: object
      required:
        - ok
        - error
      properties:
        ok:
          type: boolean
          const: false
        error:
          type: object
          required:
            - code
            - message
            - details
          properties:
            code:
              type: string
            message:
              type: string
            details:
              type: array
              items:
                type: object
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/typed-api-starter/tests/notes.integration.test.ts</span>
  </div>

```ts
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import request from "supertest";
import { app } from "../src/app.js";
import { notesRepository } from "../src/modules/notes/notes.repository.js";
import { resetLoggerSink, setLoggerSink } from "../src/shared/logging/logger.js";

beforeEach(() => {
  notesRepository.reset();
  setLoggerSink(() => undefined);
});

afterEach(() => {
  resetLoggerSink();
});

describe("notes API", () => {
  it("lists notes from an empty repository", async () => {
    const response = await request(app)
      .get("/notes")
      .expect(200);

    assert.equal(response.body.ok, true);
    assert.deepEqual(response.body.data, []);
  });

  it("creates and reads a note", async () => {
    const created = await request(app)
      .post("/notes")
      .send({ title: "Typed API", body: "Layered Express project" })
      .expect(201);

    assert.equal(created.body.ok, true);
    assert.equal(created.body.data.title, "Typed API");
    assert.equal(created.body.data.body, "Layered Express project");
    assert.match(created.header["x-request-id"], /.+/);

    const fetched = await request(app)
      .get(`/notes/${created.body.data.id}`)
      .expect(200);

    assert.equal(fetched.body.ok, true);
    assert.equal(fetched.body.data.id, created.body.data.id);
  });

  it("updates a note", async () => {
    const created = await request(app)
      .post("/notes")
      .send({ title: "Before" })
      .expect(201);

    const updated = await request(app)
      .patch(`/notes/${created.body.data.id}`)
      .send({ title: "After" })
      .expect(200);

    assert.equal(updated.body.ok, true);
    assert.equal(updated.body.data.title, "After");
  });

  it("deletes a note", async () => {
    const created = await request(app)
      .post("/notes")
      .send({ title: "Delete me" })
      .expect(201);

    const deleted = await request(app)
      .delete(`/notes/${created.body.data.id}`)
      .expect(200);

    assert.equal(deleted.body.ok, true);
    assert.equal(deleted.body.data.id, created.body.data.id);

    const missing = await request(app)
      .get(`/notes/${created.body.data.id}`)
      .expect(404);

    assert.equal(missing.body.ok, false);
    assert.equal(missing.body.error.code, "NOTE_NOT_FOUND");
  });

  it("returns validation errors for invalid input", async () => {
    const response = await request(app)
      .post("/notes")
      .send({ title: "" })
      .expect(400);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "VALIDATION_ERROR");
    assert.ok(Array.isArray(response.body.error.details));
  });

  it("returns a structured not found response for unknown routes", async () => {
    const response = await request(app)
      .get("/missing")
      .set("x-request-id", "req_test_123")
      .expect(404);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "ROUTE_NOT_FOUND");
    assert.equal(response.header["x-request-id"], "req_test_123");
  });
});
```
</div>

文件责任看法：`package.json` 与 `tsconfig.json` 定义 package/module/checker 边界；`app.ts` 只组合 request pipeline；`server.ts` 才拥有 listen lifecycle；notes 模块把 route、controller、service、repository、schema、types 分开；shared 目录提供 cross-cutting middleware、errors、logging、response helpers；OpenAPI 描述外部 contract；integration test 观察真实 HTTP 行为。

值流动看法：raw HTTP body 先经过 JSON parser，再经过 Zod schema；成功后的 typed data 放入 `response.locals.validated`；controller 读取 typed input，调用 service；service 只返回 domain result；controller 映射 response DTO；`sendResponse` 输出 `{ ok: true, data }`；error middleware 输出 `{ ok: false, error }`。

TypeScript 检查看法：`tsc --noEmit` 检查 NodeNext import、`import type`、Zod inferred input、repository contract、service result union、Express handler signatures。runtime-only 行为包括 socket listen、request id header、JSON parse、Zod `safeParse`、Map mutation、logger stdout、Supertest request。这个结构主要防止五类错误：把 assertion 当 validation、在 service 中依赖 Express、让 repository 泄漏 HTTP 语义、在 app import 时监听端口、把 OpenAPI 当 runtime validator。

### 14.4 请求成功路径

`POST /notes`：request id middleware 设置 id；JSON parser 读取 body；route 匹配；Zod 验证 body；controller 读取 typed input；service 创建 note；repository 写入 Map；controller 映射 response DTO；`sendResponse` 输出 success shape；finish log 记录完成。

### 14.5 请求失败路径

invalid body：Zod issues 进入 `HttpError(400, "VALIDATION_ERROR", ...)`；missing note：service 返回 `NOTE_NOT_FOUND`，controller 映射 `404`；unknown route：not-found middleware 产生 `ROUTE_NOT_FOUND`；unexpected error：error middleware 输出 `INTERNAL_ERROR`。

### 14.6 配置、日志与 request id

`server.ts` 是唯一启动入口。它导入 `config`，因此 env parse failure 会在 listen 前发生。request id 通过 header 或 `randomUUID()` 进入 locals 与 response header，logger 输出 JSON line。

### 14.7 OpenAPI contract

`openapi/openapi.yaml` 描述 `/notes` 和 `/notes/{id}` 的 request/response shape。它帮助学习 contract，但项目仍依赖 Zod 做 runtime validation，依赖 tests 观察实际 HTTP response。

### 14.8 测试覆盖

测试覆盖 empty list、create/get、update、delete、validation error、unknown route 与 request id header。每个 test 前 reset repository，避免执行顺序污染。

## 15. 知识迁移与真实项目场景

迁移到更大项目时，优先保留本章边界：

- 新模块仍按 route/controller/service/repository/schema/types 组织。
- 新外部输入仍从 unknown 开始，用 runtime validation 变成 typed data。
- 新 storage adapter 先满足 repository contract，不让 controller 直接访问 storage。
- 新 error code 先定义 domain error，再映射 public `HttpError`。
- 新 logs 继续使用 request id，不输出 secrets。
- 新 API surface 更新 OpenAPI，并用 integration tests 验证实际 response。

未来章节可以添加 persistent storage、auth、deployment 或 observability，但它们应插入这些边界，而不是覆盖这些边界。

## 16. 本章复盘任务

你应该能不用看代码回答：

1. 为什么 `tsc --noEmit` 不证明 HTTP request 会成功？
2. 为什么 Node native type stripping 不等于 full TypeScript support？
3. `module: "NodeNext"` 与 nearest `package.json#type` 如何共同影响 `.ts` 文件？
4. 为什么 service 不接收 Express `Request`？
5. `request DTO`、`domain model`、`storage model`、`response DTO` 各自为什么存在？
6. OpenAPI、Zod、TypeScript type 分别解决什么问题？
7. request id 为什么要放在 request-scoped context，而不是全局变量？
8. integration test 为什么 import app 而不是 server？

## 17. 最终心智模型

本章可以压缩成一句话：TypeScript 后端工程化是在 Node runtime、TypeScript checker、Express pipeline、runtime validation、API contract 之间建立明确边界。

更具体地说：

- TypeScript 负责内部静态关系，不负责外部输入真实性。
- Node 负责执行与加载，不负责完整 TS 编译或读取 `tsconfig.json` 做 typecheck。
- Express 负责请求管线，不负责业务层设计。
- Zod 负责 runtime validation，不替 OpenAPI 做文档，也不替 TypeScript 做所有类型设计。
- OpenAPI 负责描述 API，不负责执行验证。
- 分层架构负责让每个责任有稳定位置。

## 18. 官方资料

- Node.js API: Modules: TypeScript — https://nodejs.org/api/typescript.html
- Node.js API: Modules: Packages — https://nodejs.org/api/packages.html
- Node.js API: ECMAScript Modules — https://nodejs.org/api/esm.html
- Node.js API: CommonJS Modules — https://nodejs.org/api/modules.html
- Node.js API: Process — https://nodejs.org/api/process.html
- Node.js API: Test runner — https://nodejs.org/api/test.html
- Node.js API: Assert — https://nodejs.org/api/assert.html
- TypeScript Handbook: Modules Reference — https://www.typescriptlang.org/docs/handbook/modules/reference.html
- TypeScript TSConfig Reference — https://www.typescriptlang.org/tsconfig/
- TypeScript Handbook: Narrowing — https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- TypeScript Handbook: Generics — https://www.typescriptlang.org/docs/handbook/2/generics.html
- TypeScript Handbook: Utility Types — https://www.typescriptlang.org/docs/handbook/utility-types.html
- Express 5.x API Reference — https://expressjs.com/en/5x/api/
- Express Using middleware — https://expressjs.com/en/guide/using-middleware/
- Express Error handling — https://expressjs.com/en/guide/error-handling/
- Zod Basic usage — https://zod.dev/basics
- Zod API — https://zod.dev/api
- npm package.json — https://docs.npmjs.com/cli/v11/configuring-npm/package-json/
- npm install — https://docs.npmjs.com/cli/v11/commands/npm-install/
- npm run — https://docs.npmjs.com/cli/v11/commands/npm-run/
- npm scripts — https://docs.npmjs.com/cli/v11/using-npm/scripts/
- npm ci — https://docs.npmjs.com/cli/v11/commands/npm-ci/
- OpenAPI Specification — https://spec.openapis.org/oas/latest.html
- OpenAPI Learn — https://learn.openapis.org/specification/
