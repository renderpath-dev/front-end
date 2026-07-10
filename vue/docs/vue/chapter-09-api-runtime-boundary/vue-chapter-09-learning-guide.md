# Vue 第 9 章：API、Runtime Validation 与前后端边界

<style>
.macos-code-window {
  margin: 1.25rem 0;
  overflow: hidden;
  border: 1px solid #30363d;
  border-radius: 10px;
  background: #0d1117;
}

.macos-code-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 14px;
  background: #21262d;
}

.macos-code-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.macos-code-dot-red { background: #ff5f57; }
.macos-code-dot-yellow { background: #febc2e; }
.macos-code-dot-green { background: #28c840; }

.macos-code-title {
  margin-left: 6px;
  color: #c9d1d9;
  font: 600 0.82rem/1.2 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.macos-code-titlebar + pre {
  margin: 0;
  border: 0;
  border-radius: 0;
}

.macos-code-titlebar + pre code {
  display: block;
  padding: 1rem;
}
</style>

## 目录

- [0. 文件定位](#0-文件定位)
- [1. 本章解决的问题](#1-本章解决的问题)
- [2. 前置概念](#2-前置概念)
- [3. 学习目标](#3-学习目标)
- [4. 推荐学习顺序](#4-推荐学习顺序)
- [5. 核心术语表](#5-核心术语表)
- [6. 底层心智模型](#6-底层心智模型)
- [7. 推荐目录结构](#7-推荐目录结构)
- [8. 示例运行方式](#8-示例运行方式)
- [9. 分节教学与练习](#9-分节教学与练习)
  - [9.1 API boundary mental model：component、composable、service、client、transport、backend 与 validator](#section-9-1)
  - [9.2 HTTP client architecture：Axios instance、custom adapter、request config 与 single API gateway](#section-9-2)
  - [9.3 Endpoint contract：method、path、params、query、body、headers、response 与 error model](#section-9-3)
  - [9.4 Unknown response boundary：JSON、unknown、Zod parse / safeParse 与 no `as Product`](#section-9-4)
  - [9.5 Runtime validators：Zod schema、static inference、DTO/domain mapping 与 validation result](#section-9-5)
  - [9.6 Error normalization：AxiosError、HTTP status、validation issue、network、timeout、cancel 与 UI error](#section-9-6)
  - [9.7 HTTP status handling：400、401、403、404、409、422、500 的不同 UI 与 backend 含义](#section-9-7)
  - [9.8 Request interceptors：request id、metadata、demo session header、Content-Type 与 no token persistence](#section-9-8)
  - [9.9 Response interceptors：duration、raw payload preservation、transport metadata 与 service validation boundary](#section-9-9)
  - [9.10 Pagination response：query params、list envelope、pagination meta、Zod validation 与 UI state](#section-9-10)
  - [9.11 Form payload：UI form model、API payload、outgoing validation、422 error 与 submit composable](#section-9-11)
  - [9.12 Request state composable：loading、success、error、stale result protection 与 no full cache policy](#section-9-12)
  - [9.13 Request cancellation：AbortController、Axios signal、cancel button 与 canceled error normalization](#section-9-13)
  - [9.14 Timeout and retry：timeout policy、idempotency、backoff、attempt timeline 与 unsafe mutation boundary](#section-9-14)
  - [9.15 Server state ownership：component request state、Pinia client state、Router query 与 future API cache](#section-9-15)
  - [9.16 Auth token / session boundary：demo session header、401、403、cookie/token concept 与 backend authority](#section-9-16)
  - [9.17 Mock transport：Axios custom adapter、fake backend scenarios、unknown payloads 与 no MSW yet](#section-9-17)
  - [9.18 Chapter integration：Chapter 08 local CRUD 如何迁移到 API service/composable 边界](#section-9-18)
  - [9.19 Final integration：vue-api-contract-lab 如何形成可替换真实后端的 API 边界](#section-9-19)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标、适配范围与文件结构](#121-项目目标适配范围与文件结构)
  - [12.2 API 边界与状态 maps](#122-api-边界与状态-maps)
  - [12.3 核心完整代码](#123-核心完整代码)
  - [12.4 运行、预期行为、常见错误与扩展](#124-运行预期行为常见错误与扩展)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 真实文件 | 类型 | 对应章节 |
| --- | --- | --- | --- |
| 定义 request、raw response 与 result | `src/learning/vue/chapter-09-api-runtime-boundary/api/httpTypes.ts` | API contract | 9.1–9.3 |
| 统一 transport/status/validation error | `api/apiErrors.ts` | error adapter | 9.6–9.7 |
| 创建唯一 Axios gateway | `api/httpClient.ts` | client | 9.2、9.4 |
| 添加 request/response metadata | `api/requestInterceptors.ts`、`responseInterceptors.ts` | interceptor | 9.8–9.9 |
| 连接 Chapter 07 demo session | `api/apiSession.ts` | Pinia bridge | 9.16 |
| 定义 retry/timeout policy | `api/retryPolicy.ts`、`timeoutPolicy.ts` | policy | 9.13–9.14 |
| 模拟本地 transport/backend | `api/mockAxiosAdapter.ts`、`mockBackendDatabase.ts`、`mockBackendRoutes.ts`、`mockBackendScenarios.ts` | local adapter | 9.17 |
| 区分 DTO/domain/query/payload | `contracts/*.ts` | static contract | 9.3、9.5、9.10–9.11 |
| 运行 Zod response/payload validation | `validators/*.ts` | runtime validator | 9.4–9.5 |
| 集中 endpoint contract | `services/*.ts` | API service | 9.3、9.10–9.11 |
| 管理 request/server-state boundary | `composables/*.ts` | Vue request state | 9.12–9.15 |
| 展示 focused mechanisms | `components/*.vue` | teaching panel | 9.1–9.17 |
| 整合最终项目 | `api-contract-lab/VueApiContractLab.vue` | final lab | 9.19、12 |
| 保留旧章节并渲染 Chapter 09 | `src/learning/vue/chapter-01-application-boundary/App.vue` | root shell | 9.18–9.19 |

表中省略的路径均相对 `src/learning/vue/chapter-09-api-runtime-boundary/`。

## 0. 文件定位

指南位于 `docs/vue/chapter-09-api-runtime-boundary/vue-chapter-09-learning-guide.md`。可运行代码位于 `src/learning/vue/chapter-09-api-runtime-boundary/`。Chapter 09 只追加 `ApiRuntimeChapterApp` 到既有 `App.vue`；`main.ts`、Router、Pinia、Element Plus、Vue I18n 和 Chapters 01–08 保持原有 owner。

## 1. 本章解决的问题

组件内直接调用 client 会把 endpoint、loading、cancel、error 与 render 混在一起；把 `response.data` 断言成 domain type 又会让 malformed runtime data 穿过 TypeScript。Chapter 09 建立一条可追踪链：component intent → composable request state → service endpoint contract → Axios instance/interceptors → local adapter/mock backend → unknown payload → Zod schema → `ApiResult<T>` → UI。

## 2. 前置概念

- Chapter 05：`unknown`、type erasure、minimal runtime guard 与 `vue-tsc`。
- Chapter 06：Router query 与 frontend/backend permission boundary。
- Chapter 07：Pinia 只保存 global client state，不默认保存 server data。
- Chapter 08：table query、form draft、local CRUD、upload 与 operation permission。
- JavaScript：Promise、closure、object reference、`AbortController` 和 event loop timer。

## 3. 学习目标

- 能解释为什么 API raw data 必须从 `unknown` 开始。
- 能用 Zod schema 验证 response envelope、pagination meta 和 outgoing payload。
- 能把 Axios/HTTP/Zod/cancel/timeout error 归一为 UI contract。
- 能实现取消、超时、只对安全读取进行 retry，以及 stale-result protection。
- 能判断 Router、Pinia、request composable、future cache 与 backend 的 owner。

## 4. 推荐学习顺序

先沿 9.1–9.5 建立 client/transport/validator 链；再用 9.6–9.11 处理 errors、status、pagination 与 payload；随后用 9.12–9.17 处理 request state、cancel、timeout、retry、session 和 mock adapter；最后用 9.18–9.19 把 Chapter 08 local UI seam 映射到 service/composable seam。

## 5. 核心术语表

| Concept | Layer | 本章含义 | 常见误解 |
| --- | --- | --- | --- |
| API client | transport gateway | 共享 Axios config/interceptors/adapter | 任意 component 中的 `axios.get` |
| request config | endpoint input | method、url、params、data、headers、signal、timeout | 只有 URL |
| unknown boundary | TypeScript + runtime | 禁止验证前访问 payload fields | 等于 `any` |
| Zod schema | runtime validator | 执行 JavaScript 检查并返回 parsed data/issues | TypeScript interface 的另一种写法 |
| DTO | transport contract | backend wire shape | UI domain model |
| domain model | service output | validator 后供 UI 使用的稳定 shape | raw response |
| `ApiResult<T>` | service result | success/error discriminated union | raw Axios response |
| normalized error | UI error contract | kind/status/message/details/retryable | `AxiosError` 直出 |
| request state | composable state | loading/data/error for one lifecycle | full cache |
| server state | remote state | freshness/dedup/invalidation/refetch | 默认 Pinia state |

## 6. 底层心智模型

TypeScript 在 build 前检查 `ApiRequestConfig`、schema inference 和 component contracts，随后类型被擦除。运行时中 Axios request interceptor 修改 config，custom adapter 根据 method/url/scenario 调用本地 backend route，response body 仍是普通 JavaScript value。service 把该 value 作为 `unknown` 交给 Zod；只有 `safeParse().success` 分支才产生 typed domain data。composable 把结果写入 refs，组件 render effect 重新读取并 patch DOM。真实 backend 仍必须验证 payload、session 和 authorization。

## 7. 推荐目录结构

`api/` 负责 client/transport/policy；`contracts/` 只描述 static shapes；`validators/` 执行 runtime checks；`services/` 拥有 endpoint contracts；`composables/` 拥有 request lifecycle；`components/` 聚焦单机制；`api-contract-lab/` 只整合已讲机制。这个结构覆盖 roadmap 的 `http-client`、product/user service、contract、validator 与 `use-products`，并补齐取消、retry、timeout、error 和 final lab。

## 8. 示例运行方式

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Terminal</span></div>

```bash
npm run dev
npm run typecheck
npm run test:unit
npm run build
```
</div>

打开 `http://localhost:5173/` 并滚动到 Chapter 09。所有 responses 都由 local adapter 产生；浏览器不会向外部 API 发请求。`npm run dev` 只运行 development transform/server，不代替 `vue-tsc`、unit tests 或 production build。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 API boundary mental model：component、composable、service、client、transport、backend 与 validator

**结论：** component 只表达 intent 和 render；composable 管 request state；service 管 endpoint；client/interceptor/adapter 管 transport；Zod 管 runtime trust。

**本节解决的问题：** 防止一个 SFC 同时持有 URL、Axios、schema、loading、retry、error mapping 与 DOM 分支。

**技术意义：** 当 local adapter 换成真实 transport 时，component 和 domain model 不需要重写。

**概念解释：** `ProductApiPanel` 调 `useProducts.reload`；它调用 `listProducts`；service 构造 config；client/adapter 返回 unknown；schema 产生 typed result。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** 每层只拥有自己的值；Router/Pinia 提供 query/session client context，但不复制 product server data；backend authorization 不由前端替代。

**API 机制证据链：** 1 Reload click/onMounted 触发；2 `useProducts` 持有 loading/error/data；3 `listProducts` 拥有 GET `/products`；4 构造 `ApiRequestConfig`；5 request interceptor 加 request id/session；6 custom adapter 收 config；7 success scenario 返回 envelope；8 transport data 因外部边界是 unknown；9 `productListResponseSchema` 验证；10 service 映射 `PaginatedResult<Product>`；11 failure 归一 `NormalizedApiError`；12 refs 改变并 rerender；13 signal 可 cancel；14 timeout 可触发；15 GET 可按 policy retry；16 products 不进 Pinia；17 backend 仍授权；18 若 SFC import Axios/Zod 并散布状态，即识别为 boundary leak。

**TypeScript 编译期过程：** `ApiResult<T>`、typed service 和 refs 被检查；编译器不会执行 schema 或访问 backend。

**JavaScript / Axios / Zod / Vue 运行时过程：** button event 调函数，Promise chain 经过 Axios，Zod 执行 property checks，Vue ref mutation schedule component update。

**API / 语法规则：** 上层只能调用下一层公开 contract；UI 不接收 Axios response/error。

**文件结构：** `ProductApiPanel.vue` → `useProducts.ts` → `productApi.ts` → `httpClient.ts` → adapter/routes → validator。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: api-boundary-chain.ts</span></div>

```ts
const result = await listProducts(query, { signal });

if (result.ok) {
  rows.value = result.data.rows;
} else {
  error.value = result.error;
}
```
</div>

**逐行解释：** service 隐藏 transport；discriminant `ok` 收窄结果；UI state 只接 typed rows 或 normalized error。

**执行过程：** intent → composable loading → service config → interceptor → adapter/backend → unknown → schema → result → refs → render。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** GET config 携带 query/signal；headers由 interceptor补充；success 写 data，failure 写 error；所有终态结束 loading。

**为什么得到这个结果：** 网络或 adapter boundary 产生 runtime values，只有 executable validator 能建立信任。

**对比写法：** component 内 `axios.get` 让 endpoint 和 UI lifecycle 无法独立复用或统一处理。

**常见错误为什么错：** “文件少”不等于简单；职责混合会让 cancel、retry、schema 和 error 分支重复。

**与真实项目的关系：** 真实 backend 只需替换 adapter/baseURL，service/composable/component seams 可保留。

**与当前学习主线的关系：** 把 Chapter 05 unknown、Chapter 07 owner 和 Chapter 08 page orchestration 连成 API chain。

**最终记忆模型：** UI 发 intent，composable 管状态，service 管契约，client 管运输，validator 建信任。

<a id="section-9-2"></a>

### 9.2 HTTP client architecture：Axios instance、custom adapter、request config 与 single API gateway

**结论：** Chapter 09 只有一个 `axios.create` instance；所有 endpoint 通过 `requestUnknown/requestValidated`，且 adapter 不发真实请求。

**本节解决的问题：** 避免 global defaults、重复 timeout/base config 和散落的 raw Axios response。

**技术意义：** 一个 gateway 可统一 interceptors、timeout、adapter 与 error normalization。

**概念解释：** `httpClient.ts` 创建 instance；`toAxiosConfig` 把项目 contract 映射到 Axios config；service 只调用 typed helper。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** client 是 transport gateway，不拥有 UI refs、domain query source、Pinia products 或 backend policy。

**API 机制证据链：** 1 component reload；2 composable loading；3 service endpoint；4 config含method/url/params/meta；5 interceptor加headers；6 configured adapter收请求；7 route返回raw envelope；8 `response.data` unknown；9 service schema验证；10 `ApiResult` typed；11 Axios/Zod error normalized；12 component更新；13 signal传递；14 instance/per-request timeout；15 safe GET可retry；16 server data不进Pinia；17 backend授权独立；18出现多个 `axios.create` 或 component axios call 即 gateway 分裂。

**TypeScript 编译期过程：** Axios installed types 检查 adapter/config；项目 wrapper 把 raw `data` 主动声明为 `unknown`。

**JavaScript / Axios / Zod / Vue 运行时过程：** instance defaults 与 per-request config merge，request interceptors 执行，adapter Promise 返回 response，response interceptors执行。

**API / 语法规则：** `axios.create` 隔离 defaults；request config 可覆盖 instance timeout；custom adapter 必须返回 Axios response shape。

**文件结构：** `api/httpClient.ts`、`mockAxiosAdapter.ts`、`requestInterceptors.ts`、`responseInterceptors.ts`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-09-api-runtime-boundary/api/httpClient.ts</span></div>

```ts
const apiClient = axios.create({
  baseURL: "/chapter-09-api",
  timeout: defaultTimeoutConfig.timeoutMs,
  adapter: mockAxiosAdapter,
});
```
</div>

**逐行解释：** instance 固定逻辑 base path、默认 timeout 和 local adapter；它没有全局修改 Axios。

**执行过程：** helper 接项目 config → 转 Axios config → instance merge defaults → interceptors → adapter。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** client 只转发 config/unknown response；loading/render 属 composable/component。

**为什么得到这个结果：** Axios instance 是配置隔离单位，不是 domain service 或 state store。

**对比写法：** `axios.defaults` 会影响不相关 requests；每个 service 创建 instance 又重复 interceptors。

**常见错误为什么错：** baseURL 看似真实 path，但 custom adapter 接管 transport，因此不能把它描述为 remote backend。

**与真实项目的关系：** production 可提供不同 service instances，但每个 gateway 仍应有明确 owner。

**与当前学习主线的关系：** 延续 Chapter 01 single app：runtime root 一个，API gateway 也集中。

**最终记忆模型：** instance 统一运输，不统一业务。

<a id="section-9-3"></a>

### 9.3 Endpoint contract：method、path、params、query、body、headers、response 与 error model

**结论：** service function 是 endpoint contract owner；每个 function 明确 request inputs、response schema 和 returned domain type。

**本节解决的问题：** 避免 URL/string/body 分散在 SFC 与 composable，或用一个 type 同时表示 DTO、domain 和 form。

**技术意义：** backend contract 变化集中在 service/validator/mapper。

**概念解释：** `listProducts` 使用 GET+params；`createProduct` 使用 POST+body；二者分别验证 list/mutation envelope。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** service 拥有 endpoint，不拥有 Router query source或 UI draft；它接收已映射 input 并返回 result。

**API 机制证据链：** 1 list/submit event；2 `useProducts/useFormSubmit` state；3 product service选择 endpoint；4 GET params或POST body config；5 headers metadata；6 adapter route method/path；7 backend list/mutation scenario；8 response unknown；9对应 envelope schema；10 domain/pagination result；11 status/validation error normalized；12 table/form render；13 signal可传；14 timeout可覆盖；15只GET默认retry；16 result不进Pinia；17 POST仍由backend授权；18同一 URL 在多个components出现即 contract scattered。

**TypeScript 编译期过程：** `ProductListQuery`、`CreateProductPayload` 与 `ApiResult<Product>` 限制 service callers；不验证实际 JSON。

**JavaScript / Axios / Zod / Vue 运行时过程：** config body可能被Axios序列化，adapter解析为unknown，mock backend验证，response再由frontend schema独立验证。

**API / 语法规则：** query/params 位于 URL semantics；data/body 位于 mutation payload；header只放 metadata/session context。

**文件结构：** `contracts/productContract.ts`、`validators/productValidator.ts`、`services/productApi.ts`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: endpoint-config.ts</span></div>

```ts
const config: ApiRequestConfig = {
  method: "GET",
  url: "/products",
  params: query,
  meta: { endpointName: "products:list" },
};
```
</div>

**逐行解释：** method/path确定 route；params 是 list query；metadata 让 interceptor/timeline识别 endpoint。

**执行过程：** caller 构造 typed query → service config → client → route → schema → mapped result。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** list 使用 params 且无 body；mutation相反；两者共享 headers/error/result contract。

**为什么得到这个结果：** endpoint 是 method+path+input+output+error 的组合，不只是 URL。

**对比写法：** 直接发送 Chapter 08 form draft 会把 UI-only fields 和 API payload 混在一起。

**常见错误为什么错：** 一个 `Product` type 覆盖 wire/domain/form 会掩盖 snake_case、optional 和 mapping boundary。

**与真实项目的关系：** service 是 API specification change 的第一定位点。

**与当前学习主线的关系：** 把 Chapter 08 page event 映射到稳定 API seam。

**最终记忆模型：** service 拥有 endpoint，schema 拥有 response trust，component 不拥有两者。

<a id="section-9-4"></a>

### 9.4 Unknown response boundary：JSON、unknown、Zod parse / safeParse 与 no `as Product`

**结论：** raw `response.data` 必须是 `unknown`；只有 schema 成功分支可成为 DTO/domain。

**本节解决的问题：** 防止 `as Product` 产生编译器安静、运行时仍错误的 false safety。

**技术意义：** external/runtime data 必须以 executable check 穿过 trust boundary。

**概念解释：** assertion 只改变 TypeScript view；`safeParse` 真正读取 property/type/range 并返回 discriminated union。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** unknown 属 transport/service seam；validator 建立 runtime trust；TypeScript narrowing只发生在成功分支。

**API 机制证据链：** 1 validation demo或request；2 component/composable显示结果；3 service endpoint；4 config构造；5 interceptor不改data trust；6 adapter返回object；7 invalid shape scenario返回坏字段；8 data主动unknown；9 product schema safeParse；10 success返回DTO/domain；11 failure变invalid-response；12 alert/table切换；13请求仍可cancel；14可timeout；15GET错误可retry但invalid-response不应盲重试；16unknown不进Pinia；17backend也需validate；18看到 assertion 接 external data 即识别 false boundary。

**TypeScript 编译期过程：** `unknown` 禁止 field access；`safeParse` success discriminant 让 control-flow narrowing允许 `result.data`。

**JavaScript / Axios / Zod / Vue 运行时过程：** schema 函数实际遍历 object；failure issues 被formatter转成 strings；Vue computed读取result并rerender。

**API / 语法规则：** `parse` throws；`safeParse` 返回 union；异步 refinement 使用 async variant。

**文件结构：** `httpTypes.ts`、`validationResult.ts`、`UnknownResponseDemo.vue`、`ZodValidationPanel.vue`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: unknown-safe-parse.ts</span></div>

```ts
const rawValue: unknown = response.data;
const validation = productDtoSchema.safeParse(rawValue);

if (validation.success) {
  useProduct(validation.data);
}
```
</div>

**逐行解释：** 第一行保留未知；第二行执行 runtime checks；第三行用 discriminant 收窄；第四行只消费已验证 data。

**执行过程：** transport value → unknown binding → schema checks → success/data 或 failure/issues → service result。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** config不变；raw response由unknown进入validation；failure写error而非data。

**为什么得到这个结果：** TypeScript types 在 JavaScript runtime 不存在，Zod schema 是真实可执行对象。

**对比写法：** `response.data as Product` 不读取任何 property，也不会改变 object。

**常见错误为什么错：** interface 描述开发者期望，不证明服务器实际返回。

**与真实项目的关系：** HTTP、storage、postMessage 与 third-party SDK data 都需要同类 boundary。

**与当前学习主线的关系：** Chapter 05 minimal guard 在此升级为 schema、issues 和 inferred type。

**最终记忆模型：** unknown 先阻止使用，schema 再允许使用。

<a id="section-9-5"></a>

### 9.5 Runtime validators：Zod schema、static inference、DTO/domain mapping 与 validation result

**结论：** schema 验证 wire DTO，service mapper 再生成 domain model；form payload使用独立 schema。

**本节解决的问题：** 防止 backend snake_case、UI model 和 outgoing payload 被一个 type/schema强行复用。

**技术意义：** transport change不会直接污染 template；outgoing/incoming规则可独立演化。

**概念解释：** `productDtoSchema` 检查 response；`createProductPayloadSchema` 检查 outgoing data；`mapProduct` 负责DTO→domain。本章实际使用Zod；Valibot只作为另一种schema library选项比较，不安装也不混用两套runtime contract。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** validator属于service trust seam；mapper属于service；form/UI refs不直接冒充DTO。

**API 机制证据链：** 1 list/submit trigger；2 composable state；3 product service；4 typed query/payload config；5 metadata headers；6 adapter route；7 backend DTO/envelope；8 raw unknown；9 list/mutation schema；10 mapper返回Product；11 Zod failure normalized；12 table/result render；13 signal传递；14 timeout；15GET可retry；16domain rows不进Pinia；17backend独立validate；18template出现snake_case或service返回DTO说明mapping leak。

**TypeScript 编译期过程：** `z.infer` 从 schema 生成 static output；显式 contracts检查 mapper，但都不替代 runtime parse。

**JavaScript / Axios / Zod / Vue 运行时过程：** Zod strict object读取fields并拒绝wrong type/extra shape；mapper创建新domain object。

**API / 语法规则：** incoming schema、outgoing schema、error envelope schema 分开；issues formatter不向所有UI泄漏raw Zod objects。

**文件结构：** `validators/productValidator.ts`、`zodErrorFormatter.ts`、`services/productApi.ts`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: dto-domain-map.ts</span></div>

```ts
function mapProduct(dto: ProductDto): Product {
  return {
    id: dto.id,
    name: dto.product_name,
    price: dto.unit_price,
    stock: dto.stock_count,
    category: dto.category,
    status: dto.status,
  };
}
```
</div>

**逐行解释：** parameter已由schema验证；return创建新domain object；wire names在service边界终止。

**执行过程：** safeParse DTO → mapper new object → `ApiResult<Product>` → composable data ref → table。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** validator success才进入mapper；failure终止data path并进入error path。

**为什么得到这个结果：** DTO 与 domain 服务不同消费者，分离能明确变更责任。

**对比写法：** 直接让 UI 读取 `product_name` 会让 backend wire格式扩散。

**常见错误为什么错：** response schema 复用 form schema 会混淆 id/status/server-generated fields。

**与真实项目的关系：** 日期、金额、nullable字段和versioned APIs通常都需要mapper。

**与当前学习主线的关系：** 扩展 Chapter 08 form model/domain model distinction。

**最终记忆模型：** schema验wire，mapper建domain，form另有payload。

<a id="section-9-6"></a>

### 9.6 Error normalization：AxiosError、HTTP status、validation issue、network、timeout、cancel 与 UI error

**结论：** UI 只接 `NormalizedApiError`，不接 AxiosError、ZodError 或任意 throw value。

**本节解决的问题：** 防止每个 component 重复判断 `error.response`、code、status 和 issues。

**技术意义：** error UI 可按稳定 kind/severity/action渲染，transport library可替换。

**概念解释：** `normalizeApiError` 识别 cancel/timeout/network/HTTP/unknown；`normalizeValidationError` 生成 invalid-response或outgoing validation。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** normalization位于transport/service seam；presenter才把error转成UI copy；raw errors不进入component。

**API 机制证据链：** 1 scenario button；2 composable error ref；3 listProducts；4 scenario config；5 headers；6 adapter；7 backend/network/timeout scenario；8 raw error/data unknown；9 error envelope schema或Zod schema；10 failure `ApiResult`；11 normalized kind；12 Alert render；13 canceled kind；14 timeout kind；15 retryable flag只给network/timeout/server；16 error不进Pinia；17 backend authorization仍决定403；18components判断Axios internals即 normalization leak。

**TypeScript 编译期过程：** catch variable保持unknown；type guards缩小Axios/normalized error；`ApiErrorKind` union检查UI分支。

**JavaScript / Axios / Zod / Vue 运行时过程：** response rejection interceptor捕获unknown并normalize；service catch返回union；composable写error ref。

**API / 语法规则：** 401/403/404/409/422/500分开；cancel不显示failure recovery；timeout与user cancel不同。

**文件结构：** `api/apiErrors.ts`、`composables/useApiErrorPresenter.ts`、`api-contract-lab/ApiErrorPanel.vue`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: normalized-error-branch.ts</span></div>

```ts
if (!result.ok) {
  error.value = result.error;
  status.value = "error";
}
```
</div>

**逐行解释：** service result已隐藏library error；composable只存稳定contract并改变request state。

**执行过程：** throw/rejection → type guard/status mapping → normalized object → failed result → error ref → presenter/Alert。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** 不同failure sources汇入同一error shape；retryable与kind决定UI动作。

**为什么得到这个结果：** throw boundary可产生任意值，必须先分类才能稳定消费。

**对比写法：** 把 `AxiosError` 作为 prop 让UI依赖transport细节。

**常见错误为什么错：** network没有response；只读`error.response.status`会再次抛错。

**与真实项目的关系：** logging可保留internal detail，但public UI contract应最小且无secret。

**与当前学习主线的关系：** 将 Chapter 08 scattered message提升为API-wide error model。

**最终记忆模型：** raw error归一，UI error稳定。

<a id="section-9-7"></a>

### 9.7 HTTP status handling：400、401、403、404、409、422、500 的不同 UI 与 backend 含义

**结论：** status不是一类“请求失败”：400修请求，401恢复session，403说明无权，404处理缺失，409协调冲突，422映射字段，500提供恢复。

**本节解决的问题：** 防止所有非2xx只显示同一句话或全部自动retry。

**技术意义：** UI action与backend语义对齐，避免安全和数据一致性误判。

**概念解释：** `normalizeHttpStatus` 映射kind；presenter根据kind产生建议；mock scenarios逐一复现。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** status由backend/adapter response产生；frontend解释但不能改写backend authority。

**API 机制证据链：** 1 scenario select/click；2 resource error state；3 service endpoint；4 scenario config；5 metadata headers；6 adapter；7 forced 400/401/403/404/409/422/500 envelope；8 error payload unknown；9 error envelope schema；10 failed ApiResult；11 status→kind；12 Alert/table/form action；13可cancel但不改变status语义；14可timeout但没有HTTP status；15仅500 safe read可retry，401/403/422不retry；16不放Pinia；17backend决定authentication/authorization；18所有status同一branch即语义丢失。

**TypeScript 编译期过程：** status是number，kind union让 presenter 分支受检查；compiler不推断业务恢复策略。

**JavaScript / Axios / Zod / Vue 运行时过程：** adapter reject AxiosError response；normalizer parse error envelope；component render kind-specific content。

**API / 语法规则：** 404 resource与200 empty list不同；401与403不同；422与frontend validation不同。

**文件结构：** `apiErrors.ts`、`StatusCodeHandlingDemo.vue`、`ErrorNormalizationDemo.vue`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: status-policy.ts</span></div>

```ts
if (status === 401) return "unauthenticated";
if (status === 403) return "forbidden";
if (status === 422) return "validation";
if (status >= 500) return "server";
```
</div>

**逐行解释：** 每个status进入不同kind；顺序不会把401/403误归server。

**执行过程：** backend response → Axios rejection → envelope parse → status map → UI suggestion。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** request可相同，scenario/status改变error kind、retryability与render。

**为什么得到这个结果：** HTTP status携带protocol-level语义，不只是文案。

**对比写法：** 404空列表会让UI误以为query成功；401/403合并会让用户反复登录却仍无权限。

**常见错误为什么错：** retry 422只会重复发送同一invalid payload。

**与真实项目的关系：** status handling应与backend contract和product UX共同定义。

**与当前学习主线的关系：** 延续 Chapter 06 frontend route permission 与 backend authorization分离。

**最终记忆模型：** status决定恢复方向，不决定最终文案。

<a id="section-9-8"></a>

### 9.8 Request interceptors：request id、metadata、demo session header、Content-Type 与 no token persistence

**结论：** request interceptor只添加cross-cutting transport metadata；本章只加demo role/session header，不读取或持久化token。

**本节解决的问题：** 避免每个service重复request id、startedAt、Content-Type和session context。

**技术意义：** shared metadata有唯一执行点，timeline可把一次request串起来。

**概念解释：** `applyRequestMetadata`读取Chapter 07 auth store，生成request id/startedAt并修改Axios headers。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** interceptor可读Pinia session context但不拥有auth；不能验证domain payload或决定backend authorization。

**API 机制证据链：** 1 component触发；2 composable loading；3 service endpoint；4 config已有endpoint name；5 interceptor加id/time/demo role/content type；6 adapter读取headers；7 backend按scenario处理；8 response仍unknown；9 service schema；10 typed result；11 errors normalize；12 UI/timeline更新；13 signal不被interceptor吞掉；14 timeout保留；15attempt metadata可展示；16token/server data不进Pinia persistence；17backend不信任demo header；18每个service手写headers即cross-cutting duplication。

**TypeScript 编译期过程：** `InternalAxiosRequestConfig`和AxiosHeaders API被installed types检查；header value仍是runtime string。

**JavaScript / Axios / Zod / Vue 运行时过程：** interceptor在adapter前执行；Pinia getter被同步读取；config object被原位补充headers。

**API / 语法规则：** interceptor必须返回config或reject；多个request interceptors按Axios current execution order运行。

**文件结构：** `requestInterceptors.ts`、`apiSession.ts`、`mockBackendScenarios.ts`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: request-metadata.ts</span></div>

```ts
config.headers.set("X-Request-Id", requestId);
config.headers.set("X-Request-Started-At", String(Date.now()));
config.headers.set("X-Demo-Role", sessionHeaders["X-Demo-Role"]);
return config;
```
</div>

**逐行解释：** id关联timeline；time支持duration；role只演示session context；return继续pipeline。

**执行过程：** service config → interceptor LIFO chain → enriched config → adapter。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** interceptor只变headers/metadata；params/body/signal/timeout保持service意图。

**为什么得到这个结果：** interceptors适合横切transport concerns，不适合endpoint-specific schema。

**对比写法：** 从localStorage读取access token扩大本章security范围且可能暴露长期credential。

**常见错误为什么错：** frontend header可被用户修改，不能作为backend authorization proof。

**与真实项目的关系：** real session可能使用HttpOnly cookie或managed bearer token，但backend始终验证。

**与当前学习主线的关系：** 复用 Chapter 07 auth owner而不创建第二份auth state。

**最终记忆模型：** interceptor补运输上下文，不建立身份信任。

<a id="section-9-9"></a>

### 9.9 Response interceptors：duration、raw payload preservation、transport metadata 与 service validation boundary

**结论：** response interceptor只补duration/request id并normalize transport errors；domain schema留在endpoint service。

**本节解决的问题：** 防止一个global interceptor不知道endpoint却偷偷把所有data断言/转换成domain。

**技术意义：** transport metadata统一，endpoint contract仍可定位。

**概念解释：** `applyResponseMetadata`从request headers算duration并写response headers，保持`response.data`为unknown。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** response interceptor位于transport后、service validator前；它不知Product/User/Order。

**API 机制证据链：** 1 trigger；2 composable state；3 service；4 config；5 request metadata；6 adapter；7 raw response；8 interceptor保留unknown；9 service-specific schema；10 typed result；11 rejection interceptor normalize；12 UI/timeline；13cancel走rejection；14timeout走rejection；15retry看normalized error；16data不进Pinia；17backend policy独立；18global interceptor出现Product schema即endpoint boundary隐藏。

**TypeScript 编译期过程：** `AxiosResponse<unknown>`阻止interceptor消费domain fields；headers赋值受Axios types检查。

**JavaScript / Axios / Zod / Vue 运行时过程：** fulfilled interceptor FIFO执行，计算`Date.now()-startedAt`；rejected path将unknown error归一。

**API / 语法规则：** interceptor返回response继续service；throw/reject进入后续rejection handlers。

**文件结构：** `responseInterceptors.ts`、`httpClient.ts`、各`services/*Api.ts`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: response-metadata.ts</span></div>

```ts
const durationMs = Date.now() - startedAt;
headers.set("X-Duration-Ms", String(durationMs));
response.headers = headers;
return response;
```
</div>

**逐行解释：** duration来自同一request start；header保存transport metric；data未被转换；response继续service。

**执行过程：** adapter response → response interceptor → requestUnknown raw wrapper → service safeParse。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** response headers增加duration；raw body不变；validation与UI state随后发生。

**为什么得到这个结果：** global interceptor无法从URL可靠推断所有版本化domain schema。

**对比写法：** interceptor统一`response.data.data`会破坏不同envelope并隐藏contract。

**常见错误为什么错：** 在interceptor用generic type assertion仍没有runtime validation。

**与真实项目的关系：** tracing/logging适合interceptor，domain decoding适合service。

**与当前学习主线的关系：** 强化 Chapter 05 type/runtime separation。

**最终记忆模型：** response interceptor量运输，service验内容。

<a id="section-9-10"></a>

### 9.10 Pagination response：query params、list envelope、pagination meta、Zod validation 与 UI state

**结论：** page/pageSize/sort/order作为query params；backend list envelope同时返回rows和validated meta；UI不独立猜total。

**本节解决的问题：** 防止rows/meta/query三方shape不一致或negative total进入pagination。

**技术意义：** Router query可决定request query，response meta决定server-confirmed pagination。

**概念解释：** `productListResponseSchema`组合DTO array与`paginationMetaSchema`；service返回`PaginatedResult<Product>`。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** query source可来自Router/component；response meta属于server result；均不应复制到Pinia。

**API 机制证据链：** 1 pagination event/onMounted；2 useProducts state；3 listProducts；4 GET params；5 interceptor metadata；6 adapter；7 backend slice/envelope或malformed meta；8 envelope unknown；9 product list+pagination schemas；10 PaginatedResult；11 malformed becomes invalid-response；12 Table/Pagination rerender；13 reload可cancel；14timeout；15GET可retry；16rows/meta不进Pinia；17backend过滤/授权；18UI total与server meta双owner说明drift。

**TypeScript 编译期过程：** `PaginationQuery/Meta/PaginatedResult`检查field names；Zod runtime拒绝negative/invalid integers。

**JavaScript / Axios / Zod / Vue 运行时过程：** page event mutates query ref，execute发request，safeParse生成meta，computed rows/meta触发render。

**API / 语法规则：** page/pageSize positive integers；total nonnegative；sort/order为明确contract。

**文件结构：** `paginationContract.ts`、`paginationValidator.ts`、`useProducts.ts`、`PaginationResponseDemo.vue`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: pagination-schema.ts</span></div>

```ts
const paginationMetaSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
});
```
</div>

**逐行解释：** page/pageSize拒绝0与fraction；total允许0但拒绝negative。

**执行过程：** Router/local query → params → mock slice → envelope → Zod meta → composable refs → ElPagination。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** page event只改params/query；response success替换rows/meta；malformed meta保持旧data并显示error。

**为什么得到这个结果：** pagination UI需要server-confirmed total，不应从当前页rows长度推断。

**对比写法：** current rows length当total会让next page永远消失。

**常见错误为什么错：** Router query与API composable各维护page会产生back-navigation mismatch。

**与真实项目的关系：** cursor pagination也需要独立schema和meta contract。

**与当前学习主线的关系：** 连接 Chapter 08 URL-owned table query与server response。

**最终记忆模型：** URL表达意图，server meta确认结果。

<a id="section-9-11"></a>

### 9.11 Form payload：UI form model、API payload、outgoing validation、422 error 与 submit composable

**结论：** Element Plus UI validation、outgoing Zod payload validation和backend validation是三道独立gate。

**本节解决的问题：** 防止把UI draft原样发送，或因frontend passed就相信backend必定接受。

**技术意义：** payload mapping和API submit state可复用，不依赖具体dialog/form instance。

**概念解释：** `useFormSubmit`接unknown candidate，先schema safeParse，再调用`createProduct`并处理409/422。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** UI form model属于component；payload schema/composable属于API submit；backend再验证数据与权限。

**API 机制证据链：** 1 form submit event；2 useFormSubmit status/error/data；3 createProduct endpoint；4 POST body config；5 JSON/session headers；6 adapter；7 backend success/409/422；8response unknown；9mutation schema；10Product result；11client/API errors normalized；12form alert/result；13submit signal可扩展；14timeout；15POST默认不retry；16draft/result不进Pinia；17backend验证/授权；18form直接importAxios或发送UI-only fields即boundary leak。

**TypeScript 编译期过程：** `ProductFormPayload`和schema output约束submit callback；compile type不验证reactive form当前值。

**JavaScript / Axios / Zod / Vue 运行时过程：** submit handler读取reactive proxy values，Zod检查，Axios序列化body，backend独立schema再次检查。

**API / 语法规则：** UI FormInstance只管interaction；API composable不调用Element FormInstance。

**文件结构：** `formPayloadContract.ts`、`formPayloadValidator.ts`、`useFormSubmit.ts`、`FormPayloadSubmitDemo.vue`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: outgoing-validation.ts</span></div>

```ts
const validation = schema.safeParse(candidate);

if (!validation.success) {
  error.value = normalizeValidationError(validation.error, "validation");
  return;
}

await submitRequest(validation.data);
```
</div>

**逐行解释：** candidate保持unknown；failure转换UI error并停止；success只发送parsed payload。

**执行过程：** UI validate → payload map → outgoing safeParse → POST → backend validate → response validate → submit state。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** body只在outgoing validation后进入config；409/422写error；success写data。

**为什么得到这个结果：** frontend和backend观察的上下文不同，不能互相替代。

**对比写法：** 发送整个draft可能包含id/status/display-only fields。

**常见错误为什么错：** frontend rules可被绕过且不知道数据库unique/conflict状态。

**与真实项目的关系：** backend field errors应映射回FormItem，同时保留global error。

**与当前学习主线的关系：** 将 Chapter 08 local commit迁移为validated service submit。

**最终记忆模型：** UI gate改善体验，payload gate稳定contract，backend gate建立信任。

<a id="section-9-12"></a>

### 9.12 Request state composable：loading、success、error、stale result protection 与 no full cache policy

**结论：** `useApiResource`只拥有一次resource lifecycle，并用sequence防止旧response覆盖新request；它不是cache。

**本节解决的问题：** 防止components重复写loading/error/data以及race condition。

**技术意义：** service保持stateless，Vue refs和stale policy集中在composable。

**概念解释：** execute增加sequence、设loading、await result；只有current sequence可commit refs。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** composable owns request state，不负责cross-component cache、dedup、invalidation或Pinia persistence。

**API 机制证据链：** 1 reload/lifecycle；2 useApiResource owns refs；3 injected service；4 service config；5 headers；6 adapter；7 selected scenario；8 raw unknown；9 schema；10 result；11 normalized error；12 status/data/error render；13new request可abort previous；14timeout；15wrapper可retry；16remote rows不进Pinia；17backend authority；18older response覆盖newer data即缺stale protection。

**TypeScript 编译期过程：** generic `Value`连接request result与data ref；status union检查render branches。

**JavaScript / Axios / Zod / Vue 运行时过程：** closure保存sequence；Promise completion比较number；refs写入触发computed/render effects。

**API / 语法规则：** execute/reset改变sequence；stale result可返回给caller但不能commit UI state。

**文件结构：** `useApiResource.ts`、`useProducts.ts`、`useUsers.ts`、`useOrders.ts`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: stale-result-guard.ts</span></div>

```ts
executionSequence += 1;
const currentSequence = executionSequence;
const result = await request();

if (currentSequence !== executionSequence) {
  return result;
}
```
</div>

**逐行解释：** 每次execute取得token；await期间可能启动新request；旧token不再等于current，因此不写refs。

**执行过程：** A loading → B loading → B completes/commits → A completes/sees stale/skips。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** multiple configs独立；只有latest result影响data/error/status render。

**为什么得到这个结果：** Promise completion顺序不保证等于启动顺序。

**对比写法：** 单一boolean loading在concurrent requests中也需latest owner policy。

**常见错误为什么错：** 把server rows放Pinia不会自动解决stale、dedup或invalidation。

**与真实项目的关系：** full cache还需query keys、freshness、dedup、invalidation、garbage collection。

**与当前学习主线的关系：** 将 Chapter 04 async composable提升为API request state。

**最终记忆模型：** composable管一次请求生命，cache管多消费者时间。

<a id="section-9-13"></a>

### 9.13 Request cancellation：AbortController、Axios signal、cancel button 与 canceled error normalization

**结论：** current request使用一个AbortController；signal穿过service/client到adapter；cancel产生`canceled`，不等于timeout。

**本节解决的问题：** 防止unmounted/obsolete/explicitly canceled request继续浪费并覆盖UI。

**技术意义：** cancellation成为request contract的一部分，而非component内部特殊case。

**概念解释：** `useCancelableRequest`创建controller并传signal；adapter监听abort并reject `CanceledError`；normalizer输出canceled。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** component只触发cancel；composable/controller拥有signal；transport尊重signal；backend可能仍需idempotency。

**API 机制证据链：** 1 Start/Cancel clicks；2 cancel composable owns controller/result/error；3 listProducts；4 GET config含signal；5 interceptor保留signal；6 adapter监听abort；7 slow scenario尚未返回；8无raw response；9无response validation；10failed ApiResult；11CanceledError→canceled；12info Alert；13exact request canceled；14timeout timer是另一path；15canceled不retry；16controller/result不进Pinia；17backend已收到的mutation仍可能执行；18cancel button只改UI不abort transport即假取消。

**TypeScript 编译期过程：** `AbortSignal`来自DOM lib；config可选signal被service/helper检查。

**JavaScript / Axios / Zod / Vue 运行时过程：** `abort()` dispatch event；adapter listener clear timers/reject；response rejection interceptor normalize；Vue写error。

**API / 语法规则：** signal通常一次性；new request需new controller；legacy cancellation API不用于本章。

**文件结构：** `useCancelableRequest.ts`、`mockAxiosAdapter.ts`、`RequestCancellationDemo.vue`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: abort-controller.ts</span></div>

```ts
const controller = new AbortController();
const pending = listProducts(query, { signal: controller.signal });
controller.abort();
const result = await pending;
```
</div>

**逐行解释：** controller创建signal；request订阅；abort同步发通知；Promise最终返回normalized failure。

**执行过程：** start → adapter timers/listener → cancel → clear timers → reject → normalize → render。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** signal从active变aborted；没有raw/validator data；loading结束并显示canceled。

**为什么得到这个结果：** cancellation是cooperative protocol，每层必须传递并尊重signal。

**对比写法：** 只用`isCanceled=true`不会停止adapter Promise。

**常见错误为什么错：** 复用already-aborted signal会让新request立即取消。

**与真实项目的关系：** route change、typeahead和component unmount都常需取消obsolete reads。

**与当前学习主线的关系：** 连接 browser Abort API、Axios config和Vue composable lifecycle。

**最终记忆模型：** cancel是用户/owner意图，timeout是时间policy。

<a id="section-9-14"></a>

### 9.14 Timeout and retry：timeout policy、idempotency、backoff、attempt timeline 与 unsafe mutation boundary

**结论：** 每个request必须有timeout；默认只retry GET/HEAD的network/timeout/5xx，POST/PUT/PATCH/DELETE与401/403/422不自动retry。

**本节解决的问题：** 防止请求永久pending、重复创建资源或无意义重复unauthorized/invalid requests。

**技术意义：** retry从“再试一次”升级为method/error/attempt/backoff policy。

**概念解释：** adapter timeout timer产生ETIMEDOUT；normalizer标timeout retryable；`useRetryableRequest`依据`shouldRetryRequest`迭代。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** timeout是transport policy；retry是request orchestration；backend必须用idempotency strategy保护mutation。

**API 机制证据链：** 1 Retry/Timeout click；2 retry composable attempt/timeline；3 listProducts；4 GET config/timeout；5 attempt metadata；6 adapter timers；7 first network/timeout then success scenario；8success response unknown；9schema；10typed result；11failure normalized retryable；12timeline/Alert render；13cancel可终止；14timeout明确；15GET retry，unsafe method拒绝；16timeline/data不进Pinia；17backend防重复；18无method/status检查的generic retry即duplicate mutation风险。

**TypeScript 编译期过程：** `HttpMethod`和`ApiRetryConfig`限制policy input；compiler不知道operation是否业务幂等。

**JavaScript / Axios / Zod / Vue 运行时过程：** timers竞争settle；retry loop await deterministic delay；每次attempt生成新request。

**API / 语法规则：** attempt达到max停止；backoff无随机jitter以便学习；production可按policy扩展。

**文件结构：** `retryPolicy.ts`、`timeoutPolicy.ts`、`useRetryableRequest.ts`、`RetryTimeoutDemo.vue`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: safe-retry-policy.ts</span></div>

```ts
if (!isIdempotentMethod(method) && !config.allowUnsafeMethod) {
  return false;
}

return error.retryable && attempt < config.maxAttempts;
```
</div>

**逐行解释：** unsafe method默认先拒绝；safe method仍需retryable error和attempt budget。

**执行过程：** attempt → failure → policy → delay → new attempt → success/exhausted。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** 每次attempt有独立headers/id；timeline累积；只有final result提交resource state。

**为什么得到这个结果：** timeout并不说明server未处理mutation，blind retry可能重复副作用。

**对比写法：** retry 401不会创建session；retry 422不会修payload。

**常见错误为什么错：** 对POST默认retry可能创建重复orders/products。

**与真实项目的关系：** mutation retry需idempotency key与backend guarantee。

**与当前学习主线的关系：** 把 async error handling提升为protocol-aware policy。

**最终记忆模型：** timeout限制等待，retry必须尊重幂等。

<a id="section-9-15"></a>

### 9.15 Server state ownership：component request state、Pinia client state、Router query 与 future API cache

**结论：** loading/error/data先留在API composable；auth/theme在Pinia；shareable filters在Router；跨消费者server cache需要未来专门cache layer。

**本节解决的问题：** 防止“全局可见”自动变成“放Pinia”，却没有freshness、dedup或invalidation。

**技术意义：** state owner按语义而非访问位置选择。

**概念解释：** `useServerStateBoundary`列出owner；Chapter 09不安装cache library，也不在store复制products/users/orders。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** 四类state独立，render可组合它们但不需统一store。

**API 机制证据链：** 1 route/page/component event；2 composable request refs；3 service；4 query来自Router/local；5 session来自Pinia interceptor；6 adapter；7 backend state；8 unknown；9schema；10result；11error；12UI；13cancel local request；14timeout local policy；15retry local lifecycle；16products/users/orders明确不进Pinia；17backend authority；18store中出现remote rows却无cache policy即server-state confusion。

**TypeScript 编译期过程：** owner不是type-system自动推导；contracts只能帮助防止shape混淆。

**JavaScript / Axios / Zod / Vue 运行时过程：** component同时读取route/store/composable refs；Vue render effect对每个source建立依赖。

**API / 语法规则：** cache layer通常增加query key、dedup、freshness、invalidations、refetch与GC；本章不实现。

**文件结构：** `useServerStateBoundary.ts`、`ServerStateOwnershipPanel.vue`，以及Chapter 07/08 owners。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: state-owners.ts</span></div>

```ts
const owners = {
  requestStatus: "composable",
  authRole: "pinia",
  tableQuery: "router",
  remoteCache: "future-cache-layer",
} as const;
```
</div>

**逐行解释：** map只是decision model；每种值对应一个权威owner，不是要创建统一object。

**执行过程：** Router/Pinia/composable分别mutation → component render读取组合 → DOM patch。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** query构造config；Pinia贡献session header；composable接result；owners不互相复制。

**为什么得到这个结果：** remote data生命周期与client preference生命周期完全不同。

**对比写法：** Pinia array不会自动知道何时stale或何时refetch。

**常见错误为什么错：** 同时在Router、Pinia和composable存page/filter会产生同步循环。

**与真实项目的关系：** 复杂server state应采用明确cache abstraction而非ad hoc store。

**与当前学习主线的关系：** 实践 Chapter 07 已预告的server-state boundary。

**最终记忆模型：** request state不是cache，Pinia不是默认server cache。

<a id="section-9-16"></a>

### 9.16 Auth token / session boundary：demo session header、401、403、cookie/token concept 与 backend authority

**结论：** Chapter 07 auth store只生成demo session header；不保存token，不证明authentication，backend仍返回401/403。

**本节解决的问题：** 防止把frontend signed-in state或hidden button误当API security。

**技术意义：** session context可进入request pipeline，同时security boundary保持明确。

**概念解释：** `getDemoSessionHeaders`读取auth store role；interceptor附加header；mock `/session`按role/scenario返回。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** Pinia仅client projection；cookie/token/session验证与authorization属于backend。

**API 机制证据链：** 1 sign-in/check click；2 component request state；3 auth service；4 GET `/session`；5 interceptor读Pinia加demo header；6adapter；7backend success/401/403；8raw unknown；9session/error schema；10SessionInfo或failed result；11normalized auth kind；12UI；13可cancel；14timeout；15不retry401/403；16不持久化token/server data；17backend authority；18UI role改变就能访问protected API说明backend缺授权。

**TypeScript 编译期过程：** role/header types防止拼写错误；不能验证session真实性。

**JavaScript / Axios / Zod / Vue 运行时过程：** store action改变role；next request interceptor读取新getter；adapter route决定status；UI rerender。

**API / 语法规则：** 401=未认证，403=已识别但无权；本章不讨论production credential storage实现。

**文件结构：** `apiSession.ts`、`requestInterceptors.ts`、`authApi.ts`、`AuthSessionBoundaryDemo.vue`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: demo-session-header.ts</span></div>

```ts
return {
  "X-Demo-Role": authStore.role ?? "guest",
  "X-Demo-Session": authStore.isSignedIn ? "active" : "anonymous",
};
```
</div>

**逐行解释：** role/session只是演示metadata；没有secret、token或local storage。

**执行过程：** Pinia action → interceptor read → request headers → backend decision → normalized 401/403。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** auth只改headers；backend response决定result；frontend role不直接改service data。

**为什么得到这个结果：** 浏览器state和headers可被用户控制。

**对比写法：** localStorage token扩大exfiltration风险且不属于本章。

**常见错误为什么错：** hidden button只改变DOM，不能阻止手工request。

**与真实项目的关系：** real apps可用HttpOnly cookie或carefully managed bearer flow，但server验证不可省。

**与当前学习主线的关系：** 连接 Chapters 06–08 permission UI与真实API boundary。

**最终记忆模型：** frontend携带context，backend建立identity与authority。

<a id="section-9-17"></a>

### 9.17 Mock transport：Axios custom adapter、fake backend scenarios、unknown payloads 与 no MSW yet

**结论：** custom adapter模拟transport和backend scenarios，不启动server、不调用外部URL，也不把mock data当trusted response。

**本节解决的问题：** 在Chapter 09可重复练200/4xx/5xx/network/timeout/cancel/invalid shape，而不引入测试框架或backend。

**技术意义：** client/interceptor/service/composable代码与真实transport形状一致，adapter seam可替换。

**概念解释：** adapter读取method/url/params/data/signal/timeout/scenario，等待latency，调用route handler或reject AxiosError。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** adapter/backend都是local教学实现，但crossing adapter后的data仍按unknown处理。

**API 机制证据链：** 1 scenario UI；2 composable state；3 service；4 config含scenario；5 interceptorheaders；6 mock adapter；7 routes/database生成status/data；8 data unknown离开transport；9service schema；10result；11Axios/Zod error normalize；12UI/timeline；13adapter监听signal；14timer产生timeout；15scenario支持retry；16mock records不进Pinia；17fake backend仍演示authorization boundary；18service依赖mock internals即adapter不可替换。

**TypeScript 编译期过程：** installed Axios `AxiosAdapter`签名检查config/response；mock route types只保证内部实现，不自动信任boundary output。

**JavaScript / Axios / Zod / Vue 运行时过程：** timers模拟latency；AbortSignal listener竞争settle；route mutation更新module arrays；response进入Axios pipeline。

**API / 语法规则：** adapter必须resolve合法response或reject error；error status由adapter构造AxiosError。

**文件结构：** `mockAxiosAdapter.ts`、`mockBackendRoutes.ts`、`mockBackendDatabase.ts`、`mockBackendScenarios.ts`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: local-adapter.ts</span></div>

```ts
export const mockAxiosAdapter: AxiosAdapter = async (config) => {
  const response = handleMockBackend(toMockRequest(config));
  return toAxiosResponse(config, response);
};
```
</div>

**逐行解释：** adapter接Axios config；route handler产生本地raw response；adapter转回Axios shape。实际文件还处理cancel、timeout和HTTP rejection。

**执行过程：** Axios config → local timer → route match → database clone/mutation → raw response/error → interceptor。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** scenarios决定adapter path；其后仍经过同一schema/result/render chain。

**为什么得到这个结果：** adapter是Axios transport abstraction，可在不改service API的前提下替换底层。

**对比写法：** component直接读取mock arrays绕过client/interceptor/validator，失去本章目标。

**常见错误为什么错：** 将mock route return标成Product并在service跳过schema会伪造trust。

**与真实项目的关系：** 后续testing chapter可用专门network mocking与integration tests验证相同contracts。

**与当前学习主线的关系：** Chapter 08 local arrays现在被隔离为backend-side fixture而非UI owner。

**最终记忆模型：** mock transport可本地，trust boundary仍真实。

<a id="section-9-18"></a>

### 9.18 Chapter integration：Chapter 08 local CRUD 如何迁移到 API service/composable 边界

**结论：** 保留Chapter 08 UI/draft/query layering，只把local collection mutation seam替换为service+request composable；不重写dashboard。

**本节解决的问题：** 防止API接入变成全应用重构或把requests塞回form/table components。

**技术意义：** 前一章的明确owner让data source可替换。

**概念解释：** local `create/update/delete`对应product/user/order services；dialog draft仍local；Router query仍URL；Pinia仍auth/theme/permission。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** migration只增加service/request state/server result，不改变presentation owners。

**API 机制证据链：** 1 Chapter08 page event；2新API composable；3entity service；4query/payload config；5session metadata；6adapter/未来transport；7backend；8response unknown；9schema；10domain result；11normalized error；12既有table/dialog更新；13obsolete read cancel；14timeout；15safe list retry；16server rows不进Pinia；17backend authorization；18UI组件里出现endpoint string说明migration seam错误。

**TypeScript 编译期过程：** Chapter08 form/domain types与Chapter09 payload/DTO types通过explicit mapper连接。

**JavaScript / Axios / Zod / Vue 运行时过程：** submit不再直接mutate array；await service success后refresh/cache update；failure保留draft。

**API / 语法规则：** UI validation→payload mapping→outgoing validation→service；成功后再更新visible server result。

**文件结构：** Chapter 08 `forms/tables` 与 Chapter 09 `contracts/validators/services/composables` seam map。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: local-to-api-migration.ts</span></div>

```ts
const result = await createProduct(toPayload(draft));

if (result.ok) {
  closeDrawer();
  await reloadProducts();
}
```
</div>

**逐行解释：** draft先映射payload；只有validated service success才关闭；随后重新获取server-confirmed rows。

**执行过程：** Chapter08 intent/draft → Chapter09 payload/service → backend/validator → success reload或error保持draft。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** local commit被async request state替换；query/Pinia owners保持。

**为什么得到这个结果：** well-layered UI依赖use-case contract而非data source implementation。

**对比写法：** 替换整个Chapter08 dashboard会失去渐进式学习和验证seam价值。

**常见错误为什么错：** API success前先改table row会产生optimistic consistency问题且未定义rollback。

**与真实项目的关系：** 可按feature逐步迁移，不需big-bang rewrite。

**与当前学习主线的关系：** 完成roadmap从local UI state到frontend/backend contract的桥接。

**最终记忆模型：** UI owners保留，data seam替换。

<a id="section-9-19"></a>

### 9.19 Final integration：vue-api-contract-lab 如何形成可替换真实后端的 API 边界

**结论：** final lab整合typed client、Zod validation、normalized error、loading、cancel、pagination、form submit和timeline；没有remote call或global server store。

**本节解决的问题：** 验证所有分节机制能否形成完整、可替换、可调试的request pipeline。

**技术意义：** adapter是唯一fake seam；其上代码可迁移真实backend，其下mock scenarios可重复教学。

**概念解释：** Product/User/Order panels消费composables；form panel消费submit state；timeline读取interceptor/adapter events；checklist固定boundary。

**边界：Vue component、composable request state、API service、Axios client、request interceptor、response interceptor、transport adapter、mock backend、runtime validator、TypeScript type、Router URL state、Pinia client state、server state、backend authorization：** final lab只组合owners，不合并它们或提前引入cache/testing/deployment。

**API 机制证据链：** 1 panel lifecycle/buttons；2 resource/form/cancel/retry composables；3 entity services；4 typed configs；5 request metadata；6 local adapter；7 scenarios/routes；8unknown response；9endpoint schemas；10domain results；11normalized errors；12tables/forms/alerts；13cancel panel；14timeout panel；15GET retry；16no server data Pinia；17backend authority documented；18能沿timeline定位layer即具备real-project diagnosis。

**TypeScript 编译期过程：** strict `vue-tsc`检查SFC templates、generic result、service/schema mapping和Axios adapter signature。

**JavaScript / Axios / Zod / Vue 运行时过程：** single Vue app render Chapter09；panels发requests；local adapter异步返回；refs触发独立component updates。

**API / 语法规则：** 无第二app、无main plugin、无remote transport、无real token、无unsafe retry。

**文件结构：** `ApiRuntimeChapterApp.vue` → focused panels + `api-contract-lab/VueApiContractLab.vue` → composables/services/client。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-09-api-runtime-boundary/api-contract-lab/VueApiContractLab.vue</span></div>

```vue
<template>
  <section aria-labelledby="api-contract-lab-title">
    <h3 id="api-contract-lab-title">Vue API Contract Lab</h3>
    <ProductApiPanel />
    <UserApiPanel />
    <OrderApiPanel />
    <ProductFormSubmitPanel />
    <RequestTimelinePanel />
    <ApiBoundaryChecklist />
  </section>
</template>
```
</div>

**逐行解释：** semantic section建立final project边界；child panels分别拥有feature request state；lab不直接构造request。

**执行过程：** root shell → chapter entry → lab/panels → composable/service/client/adapter/schema → panel rerender。

**request config、headers、params、query、body、signal、raw response、validator result、normalized error、loading state、retry/cancel/timeout 与 UI render 的变化：** lab并列展示所有pipeline values，但每个owner仍独立。

**为什么得到这个结果：** integration component只组合public contracts，因此不会吞掉底层职责。

**对比写法：** final lab直接importAxios/Zod/mock database会绕过已建layers。

**常见错误为什么错：** final project若只展示success无法证明error/cancel/timeout/invalid shape boundary。

**与真实项目的关系：** 替换adapter/baseURL后，services/schemas/composables继续提供相同UI contract。

**与当前学习主线的关系：** 为下一章network mocking、component/integration/E2E tests保留稳定seams。

**最终记忆模型：** config进gateway，unknown出transport，schema建trust，result进Vue。

## 10. API / 语法索引

| API / Syntax | Layer | Input | Output | Runtime effect | TypeScript boundary |
| --- | --- | --- | --- | --- | --- |
| `axios.create` | client | defaults | Axios instance | 隔离config/interceptors | installed Axios types |
| `AxiosAdapter` | transport | internal config | response Promise | 替换真实transport | 不验证response body |
| request interceptor | pipeline | config | config/rejection | adapter前修改metadata | header shape only |
| response interceptor | pipeline | response/error | response/rejection | adapter后service前 | data仍unknown |
| `timeout` | transport | milliseconds | rejection | 限制等待 | number不保证runtime outcome |
| `signal` | browser/transport | AbortSignal | canceled rejection | cooperative cancellation | DOM type |
| `axios.isAxiosError` | error guard | unknown | boolean predicate | 识别Axios error | narrowing |
| `schema.parse` | validator | unknown | data/throw | runtime validation | inferred output |
| `schema.safeParse` | validator | unknown | discriminated union | runtime validation | success narrowing |
| `z.infer` | TypeScript | schema type | static type | 无runtime effect | compile only |
| `ApiResult<T>` | service | validation/request result | success/error union | stable caller contract | discriminant checked |
| `ref/shallowRef` | Vue composable | state value | reactive ref | dependency tracking | generic value |
| `computed` | Vue | reactive reads | derived ref | invalidates on source mutation | inferred return |
| `AbortController` | browser | none | controller/signal | dispatch abort | runtime object |
| `router.replace` | Router | query | navigation Promise | 更新URL | 不验证API payload |
| `storeToRefs` | Pinia | store | refs | 保持client-state reactivity | 不创建server cache |

## 11. 常见错误表

| wrong code | error type or observed bug | violated rule | why it fails | correct code | how to recognize the same mistake later |
| --- | --- | --- | --- | --- | --- |
| `axios.get("/products")` in many SFCs | duplicated endpoint/error logic | centralized client/service | 每个组件重建pipeline | call `productApi.listProducts` | endpoint string遍布components |
| `response.data as Product` | false type safety | unknown before validation | assertion不执行检查 | `productSchema.safeParse(raw)` | external data旁出现assertion |
| `interface Product` as validation | malformed runtime data | static != runtime | types已擦除 | executable Zod schema | 没有任何runtime branch |
| validate success only | unknown error envelope | validate both paths | UI读取未验证error fields | parse error envelope in normalizer | 4xx payload直接展示 |
| pass `AxiosError` to component | transport coupling | normalized UI error | UI依赖library internals | `NormalizedApiError` | props/import出现AxiosError |
| one generic `"request failed"` | lost recovery semantics | classify failure sources | network/HTTP/Zod不同 | map kind/status/details | 无法决定retry或field mapping |
| treat 401 as 403 | wrong recovery | authentication != authorization | 登录不能解决无权 | distinct kinds/actions | 所有auth errors都redirect login |
| treat 404 as empty list | incorrect success state | status != valid empty result | resource missing被隐藏 | handle 404 separately | error page显示empty table |
| retry mutation by default | duplicate side effects | idempotency first | timeout后server可能已执行 | retry GET/HEAD by default | POST自动loop |
| retry 401/403/422 | repeated permanent failure | non-retryable status | request不改变原因 | stop and guide user | attempts反复同一status |
| no timeout | permanent loading | bounded wait | stalled Promise不结束 | default/per-request timeout | spinner无终态 |
| timeout labeled canceled | wrong UX/policy | timeout != user cancel | 恢复动作不同 | normalize separate kinds | timeout显示“user canceled” |
| never abort stale request | wasted/incorrect work | cancel obsolete reads | 旧request继续执行 | pass AbortSignal | 新filter后旧请求仍active |
| older response commits last | stale overwrite | latest request wins | completion order不同 | sequence/request id guard | UI回跳旧query rows |
| remote rows in Pinia | fake cache | server-state owner | 无freshness/invalidation | request composable/future cache | store含loading+remote list无policy |
| mirror Router query in composable refs | sync race | one URL owner | back/forward产生双source | derive request query from Router | 双向watch query |
| send UI draft directly | payload leakage | map form to payload | display-only fields泄漏 | explicit mapper/schema | request body等于whole form object |
| trust Element Form rules | backend rejection/security | three validation gates | browser可绕过且无DB context | backend validates again | API无422 handling |
| save access token in localStorage | security scope expansion | no token persistence here | long-lived script-readable secret | demo session header only | storage key含token |
| add network mocking framework now | chapter scope drift | custom adapter only | 提前进入testing chapter | use local Axios adapter | 新test handlers/dependency |
| create real server | architecture scope drift | no backend in Chapter 09 | 增加runtime/deployment边界 | local route functions | server process/package出现 |
| mock returns trusted `Product` | fake boundary | raw transport is unknown | service可跳过schema | adapter returns unknown data | validator从未执行 |
| validate all domains globally in interceptor | hidden endpoint contracts | service-level schema | global layer不知道endpoint version | schema in service | response interceptor imports Product |
| `const raw: any` | disabled checking | unknown boundary | 任意访问通过 | `const raw: unknown` | raw/error/config出现`any` |
| claim dev server proves validation/build | unverified quality | separate tool phases | Vite transform不等于tests/typecheck/build | run required scripts | 报告只有`npm run dev` |

## 12. 最终小项目

最终项目只整合 9.1–9.19 已解释的边界，不替代分节教学。

### 12.1 项目目标、适配范围与文件结构

`vue-api-contract-lab` 用一个可替换 adapter 串联 typed config、interceptors、unknown response、Zod schema、domain mapping、normalized error、loading、pagination、form submit、cancel、timeout、retry 与 timeline。它不重写 Chapter 08、不建立真实server、不保存token、不实现full cache，也不进入测试或deployment范围。

结构为：`ApiRuntimeChapterApp.vue` 渲染 focused panels 与 `api-contract-lab/VueApiContractLab.vue`；lab panels只调用`composables/`；composables只调用`services/`；services组合`contracts/validators/api client`；client将transport交给`mockAxiosAdapter`。

### 12.2 API 边界与状态 maps

| map | input owner | boundary | output owner |
| --- | --- | --- | --- |
| API boundary | component intent | composable → service → client → adapter → validator | component render |
| request pipeline | typed config | request interceptor / adapter / response interceptor | raw response |
| response validation | unknown body | endpoint Zod schema + mapper | domain result |
| error normalization | unknown throw/status/issues | `apiErrors.ts` | UI error |
| status code | backend response | status→kind policy | recovery action |
| pagination | Router/local query | list envelope + meta schema | table/pagination refs |
| form payload | UI draft | mapper + outgoing schema | POST body |
| request state | service Promise | sequence/stale guard | loading/data/error refs |
| cancellation | component cancel | AbortController signal | canceled error |
| timeout | config milliseconds | adapter timeout | timeout error |
| retry | safe method + retryable error | attempt/backoff policy | final result/timeline |
| auth/session | Chapter 07 role | request interceptor demo header | backend 401/403 |
| server state | backend records | service/composable | no Pinia copy |
| Chapter 08 migration | form/table intent | API seam replaces local mutation | existing UI owner remains |

### 12.3 核心完整代码

以下窗口给出核心 contract、validator、HTTP client、mock adapter、service、composables 与 final lab 的完整代码。其余真实实现由本章代码定位索引指向。

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-09-api-runtime-boundary/api/httpTypes.ts</span></div>

```ts
import type { NormalizedApiError } from "./apiErrors";
import type { MockBackendScenario } from "./mockBackendScenarios";

export type HttpMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

export type ApiEndpointName =
  | "products:list"
  | "products:detail"
  | "products:create"
  | "products:update"
  | "products:delete"
  | "users:list"
  | "users:create"
  | "orders:list"
  | "orders:status"
  | "uploads:create"
  | "auth:session";

export type ApiRetryConfig = {
  maxAttempts: number;
  baseDelayMs: number;
  allowUnsafeMethod: boolean;
};

export type ApiTimeoutConfig = {
  timeoutMs: number;
};

export type ApiRequestMeta = {
  endpointName: ApiEndpointName;
  requestId?: string;
  startedAt?: number;
  attempt?: number;
};

export type ApiRequestConfig = {
  method: HttpMethod;
  url: string;
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeout?: number;
  retry?: ApiRetryConfig;
  meta: ApiRequestMeta;
  scenario?: MockBackendScenario;
};

export type ApiCallOptions = {
  signal?: AbortSignal;
  timeout?: number;
  scenario?: MockBackendScenario;
};

export type ApiRawResponse = {
  data: unknown;
  status: number;
  requestId: string;
  durationMs: number;
};

export type ApiValidatedResponse<Value> = {
  data: Value;
  status: number;
  requestId: string;
  durationMs: number;
};

export type ApiResult<Value> =
  | {
      ok: true;
      data: Value;
      response: ApiValidatedResponse<Value>;
    }
  | {
      ok: false;
      error: NormalizedApiError;
    };
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-09-api-runtime-boundary/validators/productValidator.ts</span></div>

```ts
import { z } from "zod";
import {
  createApiListEnvelopeSchema,
  createApiMutationEnvelopeSchema,
  createApiSuccessEnvelopeSchema,
} from "./apiEnvelopeValidator";

export const productDtoSchema = z
  .object({
    id: z.string().min(1),
    product_name: z.string().min(1),
    category: z.string().min(1),
    unit_price: z.number().nonnegative(),
    stock_count: z.number().int().nonnegative(),
    status: z.enum(["active", "draft"]),
  })
  .strict();

export const productSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    category: z.string().min(1),
    price: z.number().nonnegative(),
    stock: z.number().int().nonnegative(),
    status: z.enum(["active", "draft"]),
  })
  .strict();

export const createProductPayloadSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    category: z.string().trim().min(2).max(40),
    price: z.number().positive().max(1_000_000),
    stock: z.number().int().nonnegative().max(1_000_000),
  })
  .strict();

export const updateProductPayloadSchema = createProductPayloadSchema
  .extend({
    status: z.enum(["active", "draft"]),
  })
  .strict();

export const productListResponseSchema =
  createApiListEnvelopeSchema(productDtoSchema);

export const productDetailResponseSchema =
  createApiSuccessEnvelopeSchema(productDtoSchema);

export const productMutationResponseSchema =
  createApiMutationEnvelopeSchema(productDtoSchema);

export type ValidatedProductDto = z.infer<typeof productDtoSchema>;
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-09-api-runtime-boundary/api/httpClient.ts</span></div>

```ts
import axios, { AxiosHeaders } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { z } from "zod";
import { normalizeApiError, normalizeValidationError } from "./apiErrors";
import type {
  ApiRawResponse,
  ApiRequestConfig,
  ApiResult,
} from "./httpTypes";
import { mockAxiosAdapter } from "./mockAxiosAdapter";
import { recordTimelineEvent } from "./mockBackendScenarios";
import { installRequestInterceptors } from "./requestInterceptors";
import { installResponseInterceptors } from "./responseInterceptors";
import { defaultTimeoutConfig } from "./timeoutPolicy";

const apiClient = axios.create({
  baseURL: "/chapter-09-api",
  timeout: defaultTimeoutConfig.timeoutMs,
  adapter: mockAxiosAdapter,
});

installRequestInterceptors(apiClient);
installResponseInterceptors(apiClient);

function toAxiosConfig(
  config: ApiRequestConfig,
): AxiosRequestConfig<unknown> {
  return {
    method: config.method,
    url: config.url,
    params: config.params,
    data: config.body,
    headers: {
      ...config.headers,
      "X-Endpoint-Name": config.meta.endpointName,
      "X-Demo-Scenario": config.scenario ?? "success",
    },
    signal: config.signal,
    timeout: config.timeout,
  };
}

export async function requestUnknown(
  config: ApiRequestConfig,
): Promise<ApiRawResponse> {
  recordTimelineEvent(
    "pending",
    "request-created",
    `${config.meta.endpointName} request config created`,
  );

  const response = await apiClient.request<
    unknown,
    AxiosResponse<unknown>,
    unknown
  >(toAxiosConfig(config));
  const responseHeaders = AxiosHeaders.from(response.headers);
  const requestId =
    responseHeaders.get("X-Request-Id")?.toString() ?? "unknown";
  const durationMs = Number(
    responseHeaders.get("X-Duration-Ms") ?? 0,
  );

  return {
    data: response.data,
    status: response.status,
    requestId,
    durationMs,
  };
}

export async function requestValidated<Value>(
  schema: z.ZodType<Value>,
  config: ApiRequestConfig,
): Promise<ApiResult<Value>> {
  try {
    const rawResponse = await requestUnknown(config);
    const validation = schema.safeParse(rawResponse.data);

    if (!validation.success) {
      recordTimelineEvent(
        rawResponse.requestId,
        "validation-failed",
        config.meta.endpointName,
      );
      return {
        ok: false,
        error: normalizeValidationError(validation.error),
      };
    }

    recordTimelineEvent(
      rawResponse.requestId,
      "validation-passed",
      config.meta.endpointName,
    );
    recordTimelineEvent(
      rawResponse.requestId,
      "completed",
      config.meta.endpointName,
    );

    return {
      ok: true,
      data: validation.data,
      response: {
        data: validation.data,
        status: rawResponse.status,
        requestId: rawResponse.requestId,
        durationMs: rawResponse.durationMs,
      },
    };
  } catch (error: unknown) {
    return {
      ok: false,
      error: normalizeApiError(error),
    };
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-09-api-runtime-boundary/api/mockAxiosAdapter.ts</span></div>

```ts
import {
  AxiosError,
  AxiosHeaders,
  CanceledError,
} from "axios";
import type {
  AxiosAdapter,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { normalizeTimeout } from "./timeoutPolicy";
import {
  isMockBackendScenario,
  recordTimelineEvent,
} from "./mockBackendScenarios";
import type { MockBackendScenario } from "./mockBackendScenarios";
import { handleMockBackend } from "./mockBackendRoutes";
import type { HttpMethod } from "./httpTypes";

function readHeader(
  config: InternalAxiosRequestConfig,
  name: string,
  fallback: string,
): string {
  return config.headers.get(name)?.toString() ?? fallback;
}

function toHttpMethod(value: string | undefined): HttpMethod {
  const method = value?.toUpperCase();
  if (
    method === "HEAD" ||
    method === "POST" ||
    method === "PUT" ||
    method === "PATCH" ||
    method === "DELETE"
  ) {
    return method;
  }
  return "GET";
}

function parseBody(value: unknown): unknown {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function toQuery(value: unknown): Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return {};
  }

  return Object.fromEntries(Object.entries(value));
}

function getScenario(
  config: InternalAxiosRequestConfig,
): MockBackendScenario {
  const value = config.headers.get("X-Demo-Scenario");
  return isMockBackendScenario(value) ? value : "success";
}

function getLatency(
  scenario: MockBackendScenario,
  timeout: number,
): number {
  if (scenario === "timeout") return timeout + 200;
  if (scenario === "slow") return 1_000;
  return 120;
}

function waitForAdapter(
  config: InternalAxiosRequestConfig,
  delayMs: number,
  timeoutMs: number,
  requestId: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    let settled = false;

    const finish = (callback: () => void): void => {
      if (settled) return;
      settled = true;
      clearTimeout(delayTimer);
      clearTimeout(timeoutTimer);
      config.signal?.removeEventListener("abort", cancel);
      callback();
    };

    const cancel = (): void => {
      recordTimelineEvent(
        requestId,
        "request-canceled",
        "AbortSignal canceled the adapter",
      );
      finish(() =>
        reject(new CanceledError("Request canceled", config)),
      );
    };

    const delayTimer = setTimeout(
      () => finish(resolve),
      delayMs,
    );
    const timeoutTimer = setTimeout(() => {
      recordTimelineEvent(requestId, "timeout", `${timeoutMs}ms timeout`);
      finish(() =>
        reject(
          new AxiosError(
            `timeout of ${timeoutMs}ms exceeded`,
            AxiosError.ETIMEDOUT,
            config,
          ),
        ),
      );
    }, timeoutMs);

    if (config.signal?.aborted) {
      cancel();
      return;
    }

    config.signal?.addEventListener("abort", cancel, { once: true });
  });
}

export const mockAxiosAdapter: AxiosAdapter = async (config) => {
  const requestId = readHeader(config, "X-Request-Id", "unknown");
  const scenario = getScenario(config);
  const timeout = normalizeTimeout(config.timeout);

  recordTimelineEvent(
    requestId,
    "adapter-started",
    `${toHttpMethod(config.method)} ${config.url ?? "/"}`,
  );

  await waitForAdapter(
    config,
    getLatency(scenario, timeout),
    timeout,
    requestId,
  );

  if (scenario === "networkError") {
    throw new AxiosError(
      "Simulated network error",
      AxiosError.ERR_NETWORK,
      config,
    );
  }

  const backendResponse = handleMockBackend({
    method: toHttpMethod(config.method),
    url: config.url ?? "/",
    query: toQuery(config.params),
    body: parseBody(config.data),
    requestId,
    role: readHeader(config, "X-Demo-Role", "guest"),
    scenario,
  });

  const response: AxiosResponse<unknown> = {
    data: backendResponse.data,
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: AxiosHeaders.from({}),
    config,
  };

  if (backendResponse.status < 200 || backendResponse.status >= 300) {
    throw new AxiosError(
      backendResponse.statusText,
      backendResponse.status >= 500
        ? AxiosError.ERR_BAD_RESPONSE
        : AxiosError.ERR_BAD_REQUEST,
      config,
      undefined,
      response,
    );
  }

  return response;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-09-api-runtime-boundary/services/userApi.ts</span></div>

```ts
import { requestValidated } from "../api/httpClient";
import type { ApiCallOptions, ApiResult } from "../api/httpTypes";
import type { PaginatedResult } from "../contracts/paginationContract";
import type {
  CreateUserPayload,
  User,
  UserDto,
  UserListQuery,
} from "../contracts/userContract";
import {
  userListResponseSchema,
  userMutationResponseSchema,
} from "../validators/userValidator";

function mapUser(dto: UserDto): User {
  return {
    id: dto.id,
    name: dto.display_name,
    email: dto.email_address,
    role: dto.role,
    status: dto.status,
  };
}

export async function listUsers(
  query: UserListQuery,
  options: ApiCallOptions = {},
): Promise<ApiResult<PaginatedResult<User>>> {
  const result = await requestValidated(userListResponseSchema, {
    method: "GET",
    url: "/users",
    params: query,
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "users:list" },
  });
  if (!result.ok) return result;

  const data: PaginatedResult<User> = {
    rows: result.data.data.map(mapUser),
    meta: result.data.meta,
  };
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}

export async function createUser(
  payload: CreateUserPayload,
  options: ApiCallOptions = {},
): Promise<ApiResult<User>> {
  const result = await requestValidated(userMutationResponseSchema, {
    method: "POST",
    url: "/users",
    body: payload,
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "users:create" },
  });
  if (!result.ok) return result;

  const data = mapUser(result.data.data);
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-09-api-runtime-boundary/composables/useApiResource.ts</span></div>

```ts
import { computed, ref, shallowRef } from "vue";
import type { ApiResult } from "../api/httpTypes";
import type { NormalizedApiError } from "../api/apiErrors";

export type ApiResourceStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

export function useApiResource<Value>(
  request: () => Promise<ApiResult<Value>>,
) {
  const data = shallowRef<Value | null>(null);
  const error = shallowRef<NormalizedApiError | null>(null);
  const status = ref<ApiResourceStatus>("idle");
  let executionSequence = 0;

  const isLoading = computed(() => status.value === "loading");
  const isSuccess = computed(() => status.value === "success");
  const isError = computed(() => status.value === "error");

  async function execute(): Promise<ApiResult<Value>> {
    executionSequence += 1;
    const currentSequence = executionSequence;
    status.value = "loading";
    error.value = null;

    const result = await request();
    if (currentSequence !== executionSequence) {
      return result;
    }

    if (result.ok) {
      data.value = result.data;
      status.value = "success";
    } else {
      error.value = result.error;
      status.value = "error";
    }

    return result;
  }

  function reset(): void {
    executionSequence += 1;
    data.value = null;
    error.value = null;
    status.value = "idle";
  }

  return {
    data,
    error,
    status,
    isLoading,
    isSuccess,
    isError,
    execute,
    reset,
  };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-09-api-runtime-boundary/composables/useFormSubmit.ts</span></div>

```ts
import { computed, ref, shallowRef } from "vue";
import type { z } from "zod";
import { normalizeValidationError } from "../api/apiErrors";
import type { NormalizedApiError } from "../api/apiErrors";
import type { ApiResult } from "../api/httpTypes";

export function useFormSubmit<Payload, Result>(
  schema: z.ZodType<Payload>,
  submitRequest: (payload: Payload) => Promise<ApiResult<Result>>,
) {
  const status = ref<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const data = shallowRef<Result | null>(null);
  const error = shallowRef<NormalizedApiError | null>(null);

  const isSubmitting = computed(() => status.value === "submitting");

  async function submit(candidate: unknown): Promise<void> {
    status.value = "submitting";
    error.value = null;
    const validation = schema.safeParse(candidate);

    if (!validation.success) {
      error.value = normalizeValidationError(
        validation.error,
        "validation",
      );
      status.value = "error";
      return;
    }

    const result = await submitRequest(validation.data);
    if (result.ok) {
      data.value = result.data;
      status.value = "success";
    } else {
      error.value = result.error;
      status.value = "error";
    }
  }

  function reset(): void {
    status.value = "idle";
    data.value = null;
    error.value = null;
  }

  return {
    status,
    data,
    error,
    isSubmitting,
    submit,
    reset,
  };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-09-api-runtime-boundary/api-contract-lab/VueApiContractLab.vue</span></div>

```vue
<script setup lang="ts">
import ApiBoundaryChecklist from "./ApiBoundaryChecklist.vue";
import OrderApiPanel from "./OrderApiPanel.vue";
import ProductApiPanel from "./ProductApiPanel.vue";
import ProductFormSubmitPanel from "./ProductFormSubmitPanel.vue";
import RequestTimelinePanel from "./RequestTimelinePanel.vue";
import UserApiPanel from "./UserApiPanel.vue";
</script>

<template>
  <section class="contract-lab" aria-labelledby="api-contract-lab-title">
    <header>
      <p class="eyebrow">Final Chapter 09 Project</p>
      <h3 id="api-contract-lab-title">Vue API Contract Lab</h3>
      <p>
        Exercise one replaceable API boundary from typed request config through
        local transport, unknown response validation, normalized result, and
        composable-owned UI state.
      </p>
    </header>
    <div class="lab-grid">
      <ProductApiPanel />
      <UserApiPanel />
      <OrderApiPanel />
      <ProductFormSubmitPanel />
      <RequestTimelinePanel />
      <ApiBoundaryChecklist />
    </div>
  </section>
</template>

<style scoped>
.contract-lab {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #c4b5fd;
  border-radius: 0.85rem;
  background: #f5f3ff;
}

header p {
  max-width: 820px;
  line-height: 1.6;
}

.eyebrow {
  margin: 0;
  color: #6d28d9;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.lab-grid {
  display: grid;
  gap: 1rem;
}
</style>
```
</div>

### 12.4 运行、预期行为、常见错误与扩展

运行 `npm run dev` 后，产品、用户和订单 panels 自动通过local adapter加载。scenario selector可产生HTTP、network、timeout、invalid shape与malformed pagination；slow request可cancel；retry panel第一次network failure、第二次success；form panel区分outgoing validation、409与422；timeline刷新后显示interceptor、adapter、validation、retry/cancel/timeout事件。

优先按pipeline定位问题：无request id查request interceptor；没有adapter event查client config；raw shape错误查scenario/routes；invalid-response查schema/envelope；rows未更新查stale sequence；cancel无效查signal propagation；mutation重复查retry method policy。可选扩展仅包括新增local endpoint/scenario/schema；不要在本章加入真实server、cache library、network mocking/testing、E2E或deployment。

## 13. 额外速查表

| Concept | Layer | 最短正确解释 |
| --- | --- | --- |
| API client | transport | 集中base config、interceptors和adapter |
| Axios instance | transport | `axios.create`产生隔离gateway |
| request config | contract | method/url/params/data/headers/signal/timeout |
| baseURL | transport | 与relative URL merge，不代表已存在server |
| params | URL | query parameters |
| data | request | mutation body |
| headers | metadata | content/session/tracing context |
| timeout | transport policy | 超时后reject，不等于user cancel |
| adapter | transport seam | 自定义request执行方式 |
| request interceptor | pre-transport | adapter前修改config |
| response interceptor | post-transport | adapter后service前处理response/error |
| AxiosError | library error | 必须normalize后交UI |
| HTTP status | protocol | 指示不同failure semantics |
| 400 | request | malformed request |
| 401 | auth | unauthenticated |
| 403 | authorization | authenticated but forbidden |
| 404 | resource | requested resource absent |
| 409 | consistency | current server state conflict |
| 422 | validation | backend rejected semantic payload |
| 500 | server | service failed |
| unknown | trust boundary | 验证前不可访问fields |
| Zod schema | runtime | executable shape check |
| parse | runtime | success返回data，failure throw |
| safeParse | runtime | 返回success/data或failure/error union |
| z.infer | TypeScript | 从schema提取static type |
| DTO | transport model | backend wire shape |
| domain model | UI/service | validated and mapped stable shape |
| form model | component | interaction draft |
| payload | endpoint input | mapped and outgoing-validated body |
| response envelope | transport contract | data/meta/error/requestId wrapper |
| pagination meta | server result | page/pageSize/total/sort/order |
| ApiResult | service | typed success/failure union |
| NormalizedApiError | UI contract | kind/status/message/details/retryable |
| network error | transport | no HTTP response |
| timeout error | policy | elapsed limit reached |
| canceled error | owner intent | AbortSignal ended request |
| validation error | schema/backend | payload/response contract mismatch |
| AbortController | browser | creates signal and abort action |
| AbortSignal | browser contract | passes cancellation downstream |
| retry | orchestration | new attempt under policy |
| idempotency | protocol/domain | repeated operation has safe effect |
| request loading state | composable | one request lifecycle status |
| stale result protection | composable | old completion cannot overwrite new |
| server state | remote owner | freshness/cache/invalidation semantics |
| Pinia client state | app client | auth/theme/preferences/sidebar |
| Router query state | URL | shareable filter/page/sort intent |
| backend authorization | security | final operation decision on server |

最小安全模板是：component event调用composable；service构造config；raw response保持unknown；schema safeParse；service返回`ApiResult<T>`；composable写loading/data/error；UI不读取Axios/Zod internals。

## 14. 最终文件清单

| Path | Role | Status |
| --- | --- | --- |
| `docs/vue/chapter-09-api-runtime-boundary/vue-chapter-09-learning-guide.md` | 完整Chapter 09指南 | 已创建 |
| `src/learning/vue/chapter-09-api-runtime-boundary/ApiRuntimeChapterApp.vue` | 章节入口 | 已创建 |
| `src/learning/vue/chapter-09-api-runtime-boundary/api/` | client、interceptors、adapter、mock backend、policy | 已创建，12 files |
| `src/learning/vue/chapter-09-api-runtime-boundary/contracts/` | DTO/domain/payload/envelope/pagination contracts | 已创建，6 files |
| `src/learning/vue/chapter-09-api-runtime-boundary/validators/` | Zod schemas、results、error formatting | 已创建，8 files |
| `src/learning/vue/chapter-09-api-runtime-boundary/services/` | product/user/order/upload/auth endpoints | 已创建，5 files |
| `src/learning/vue/chapter-09-api-runtime-boundary/composables/` | resource/pagination/form/cancel/retry/error/server-state logic | 已创建，10 files |
| `src/learning/vue/chapter-09-api-runtime-boundary/components/` | focused mechanism panels | 已创建，13 files |
| `src/learning/vue/chapter-09-api-runtime-boundary/api-contract-lab/` | final project与panels | 已创建，8 files |
| `src/learning/vue/chapter-01-application-boundary/App.vue` | 保留Chapters 01–08并追加Chapter 09 | 已更新 |
| `package.json`、`package-lock.json` | Axios/Zod dependencies | 已更新 |
| `README.md` | workspace Chapter 09 status/index | 已更新 |

## 15. 如何转换成个人笔记

对每个endpoint只保留八栏：trigger、request config、interceptor changes、transport scenario、raw unknown、schema、result/error、UI state。再为每类failure写“是否有HTTP status、是否retryable、用户动作、backend责任”。不要只抄Axios/Zod API；必须能从button click追到DOM update。

## 16. 必须能回答的问题

1. 为什么component不应散布Axios/fetch调用？
2. 为什么interface和`as Product`都不是runtime validation？
3. `unknown`如何经过Zod变成domain model？
4. DTO、domain、form model和payload为何不同？
5. request config包含哪些字段，谁拥有它？
6. request/response interceptors各能做什么，不能做什么？
7. 为什么domain schema通常不隐藏在global response interceptor？
8. Axios/network/HTTP/Zod/timeout/cancel error如何归一？
9. 400、401、403、404、409、422和500分别对应什么恢复动作？
10. pagination query与response meta分别属于谁？
11. Element form validation、outgoing validation和backend validation有何区别？
12. stale result protection为何不能只靠loading boolean？
13. AbortController signal如何到达adapter？
14. timeout与user cancellation为何不同？
15. retry为什么必须尊重idempotency？
16. 为什么POST/PUT/PATCH/DELETE默认不retry？
17. server data为何不默认放Pinia？
18. full API cache还需要哪些policy？
19. frontend auth state为何不建立backend authority？
20. custom adapter为何能模拟backend但仍保留unknown boundary？

## 17. 最终记忆模型

component只发intent；composable拥有loading/data/error与cancel/stale policy；service拥有endpoint、schema和mapper；Axios instance拥有transport defaults/interceptors；adapter连接backend；raw response永远先是unknown；Zod runtime成功后才进入domain；normalized error进入UI；Router保存shareable query，Pinia保存global client state，server/cache/authorization各有独立owner。

## 18. 官方文档阅读清单

`Verification Needed`：本次访问 Axios 专用 Adapters URL 时，它重定向到了通用起步页；custom adapter 的 `adapter` request-config 语义已由当前 Axios Request Config 页面验证，`AxiosAdapter` 的函数签名已由本地安装的 `axios@1.18.1` 类型声明验证，但专用页面内容未能单独核对。

- [Axios Creating an Instance](https://axios-http.com/docs/instance)
- [Axios Request Config](https://axios-http.com/docs/req_config)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
- [Axios Error Handling](https://axios-http.com/docs/handling_errors)
- [Axios Cancellation](https://axios-http.com/docs/cancellation)
- [Axios Adapters](https://axios-http.com/docs/adapters)
- [Axios Introduction and TypeScript examples](https://axios-http.com/docs/intro)
- [Zod Basic Usage](https://zod.dev/basics)
- [Zod Defining Schemas](https://zod.dev/api)
- [Zod Error Customization](https://zod.dev/error-customization)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [MDN AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
- [Vue Composables](https://vuejs.org/guide/reusability/composables.html)
- [Vue Router Composition API](https://router.vuejs.org/guide/advanced/composition-api.html)
- [Pinia Defining a Store](https://pinia.vuejs.org/core-concepts/)
