# React 第 24 章：Data Fetching、Cancellation、Race Condition 与 Cache Boundary

<style>
.macos-code-window {
  overflow: hidden;
  margin: 16px 0;
  border: 1px solid #30363d;
  border-radius: 12px;
  background: #0d1117;
}

.macos-code-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0 12px;
  border-bottom: 1px solid #30363d;
  background: #161b22;
}

.macos-code-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  flex: 0 0 auto;
  border-radius: 999px;
}

.macos-code-dot-red { background: #ff5f57; }
.macos-code-dot-yellow { background: #ffbd2e; }
.macos-code-dot-green { background: #28c840; }

.macos-code-title {
  margin-left: 8px;
  color: #c9d1d9;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
}

.macos-code-titlebar + pre {
  overflow-x: auto;
  margin: 0;
  padding: 16px;
  border-radius: 0 0 12px 12px;
  background: transparent;
}

.macos-code-titlebar + pre code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
}
</style>

## 目录

- [本章机制地图](#本章机制地图)
- [0. 本章工程问题与边界](#0-本章工程问题与边界)
- [1. 本章解决的问题](#1-本章解决的问题)
- [2. 前置概念](#2-前置概念)
- [3. 学习目标](#3-学习目标)
- [4. 机制依赖图](#4-机制依赖图)
- [5. 核心术语表](#5-核心术语表)
- [6. 底层心智模型](#6-底层心智模型)
- [7. 推荐目录结构](#7-推荐目录结构)
- [8. 示例运行方式](#8-示例运行方式)
- [9. 分节教学与练习](#9-分节教学与练习)
  - [9.1 Data fetching boundary：外部系统同步，不是 render-time calculation](#section-9-1)
  - [9.2 Fetch API boundary：request、response、ok、status、headers 与 body parsing](#section-9-2)
  - [9.3 Response parsing boundary：unknown JSON、runtime validation 与 TypeScript limits](#section-9-3)
  - [9.4 Request lifecycle state：idle、pending、success、empty、error 与 refetching](#section-9-4)
  - [9.5 Effect fetching and cleanup：dependency ownership 与 cleanup mirror](#section-9-5)
  - [9.6 Race conditions：stale response、latest request wins 与 request identity](#section-9-6)
  - [9.7 AbortController and AbortSignal：abort fetch 与 AbortError boundary](#section-9-7)
  - [9.8 Timeout and combined cancellation：timeout、user cancel、route/filter change](#section-9-8)
  - [9.9 Custom data hook：提取 request process 但不隐藏 ownership](#section-9-9)
  - [9.10 Query/filter-driven requests：URL/search params、cache key 与 resource identity](#section-9-10)
  - [9.11 Cache boundary：cache key、cache entry、dedupe、stale data 与 refetch](#section-9-11)
  - [9.12 Invalidation boundary：mutation result、server authority 与 refetch strategy](#section-9-12)
  - [9.13 Pagination and load more：cursor identity、append vs replace 与 duplicate guard](#section-9-13)
  - [9.14 Optimistic update and rollback：pending UI 与 confirmed server data](#section-9-14)
  - [9.15 Loading、empty、partial 与 error UI：accessible async states](#section-9-15)
  - [9.16 Suspense、use 与 framework data fetching boundary：只做边界阅读，不伪造 runtime](#section-9-16)
  - [9.17 Testing async data flows：fake fetch、abort、race、reducer 与 visible UI evidence](#section-9-17)
  - [9.18 SellerHub data fetching mapping：catalog、orders、dashboard、settings 与 notes](#section-9-18)
  - [9.19 Final mini project：SellerHub Data Fetching Boundary Lab](#section-9-19)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [项目目标](#项目目标)
  - [为什么适合本章](#为什么适合本章)
  - [最终小项目结构](#最终小项目结构)
  - [文件职责](#文件职责)
  - [完整代码入口](#完整代码入口)
  - [运行方式](#运行方式)
  - [预期输出或交互结果](#预期输出或交互结果)
  - [核心执行流程](#核心执行流程)
  - [常见错误](#常见错误)
  - [可选扩展](#可选扩展)
- [13. 额外速查表](#13-额外速查表)
- [14. 工程迁移与代码审查要点](#14-工程迁移与代码审查要点)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章机制地图

| Mechanism | Owner / Boundary | Runtime Layer | Project Scenario | Source Reading Path |
| --- | --- | --- | --- | --- |
| Effect synchronization | React effect setup and cleanup | React framework + JavaScript closure | committed query 变化后重新同步 catalog request | `src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/09-custom-hook/use-sellerhub-resource.ts` |
| Fetch response boundary | Browser Fetch API and Response object | browser platform API | 先检查 `response.ok`，再解析 body | `src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/02-fetch-api/http-response-model.ts` |
| Runtime payload validation | Parser owns unknown JSON narrowing | JavaScript runtime + TypeScript boundary | malformed orders payload 不进入订单 UI | `src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/03-response-parsing/order-payload-parser.ts` |
| Request lifecycle reducer | Feature owns request process state | React state + reducer transition | pending、success、empty、error、refetching 不混成 scattered booleans | `src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/04-request-lifecycle/request-state-reducer.ts` |
| Race guard | Request id owns UI commit permission | JavaScript identity + React state commit | older catalog response 不能覆盖 newer response | `src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/06-race-conditions/request-sequence-guard.ts` |
| Abort signal | AbortController owns client cancellation signal | browser platform API | filter change 或 user cancel aborts current fetch | `src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/07-abort-controller/abortable-fetch-model.ts` |
| Resource cache key | Resource identity owns cache entry | JavaScript Map + URLSearchParams | sellerId、query、channel、sort、cursor 组成 catalog cache key | `src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/10-query-driven-requests/resource-key-model.ts` |
| In-flight dedupe | Cache entry owns shared Promise | JavaScript Promise + Map identity | same catalog key reuses one in-flight request | `src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/11-cache-boundary/simple-resource-cache.ts` |
| Optimistic rollback | Pending item owns user intent until confirmation | React state + mutation result | order note pending、confirmed、rollback 分离 | `src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/14-optimistic-rollback/optimistic-note-model.ts` |

## 0. 本章工程问题与边界

本章把 client-side data fetching 作为“React UI 与外部系统同步”的问题来学，而不是背一个 `useEffect(() => fetch(...), [])` 模板。一个真实请求至少跨过五个边界：React render snapshot、Effect setup/cleanup、Browser Fetch API、HTTP Response、JSON/domain parsing。任何一层混淆，都会导致 loading 状态混乱、HTTP 404 被当作成功、旧响应覆盖新查询、abort 被误认为服务器取消、或者 TypeScript assertion 掩盖 runtime payload 错误。

本章明确区分这些边界：

- data fetching 同步外部系统，普通 render 只返回 UI 描述；
- `fetch` resolve 不等于 HTTP 成功，`response.ok` 和 `status` 必须参与判断；
- HTTP success 与 business/domain success 不同；
- JSON parse 成功不等于 domain payload 有效；
- TypeScript 类型标注不会在 runtime 验证网络返回值；
- AbortController 能 abort client fetch 和 body consumption，但不能保证服务器收到请求后停止工作；
- stale response guard 只阻止 UI commit，不取消 network request；
- request lifecycle state 不是 confirmed server data 本身；
- cache key 表示 resource identity，不表示 component identity；
- optimistic UI 是 pending user intent，不是 server-confirmed data；
- 本章不安装 server-state libraries，不创建 backend，不伪造 production cache，不迁移 router mode，不创建 SSR。

## 1. 本章解决的问题

完成本章后，你应该能解释一次 catalog search 从 query string 到 request key、from fetch to response、from unknown JSON to parsed domain data、from lifecycle reducer to visible UI 的全过程。你还应该能判断重试、abort、timeout、refetch、pagination、optimistic rollback 和 cache invalidation 是不同机制，而不是“多几个 boolean state”。

## 2. 前置概念

- React render snapshot：当前 render 的变量不会被异步回调原地更新。
- Effect dependencies：Effect 使用的 reactive values 必须进入 dependency list。
- TypeScript narrowing：`unknown` 必须经 runtime check 后才能进入 domain type。
- Browser Fetch API：request、response、headers、body parsing 是 browser platform boundary。
- URLSearchParams：query/filter 的 resource identity 可以被序列化。
- Reducer transition：复杂 lifecycle 用 discriminated union 比 scattered booleans 更可审查。

## 3. 学习目标

1. 把 request lifecycle 建模为 idle、pending、success、empty、error、refetching。
2. 区分 network error、HTTP error、parse error、domain error、AbortError 与 TimeoutError。
3. 编写 runtime parser，不把 `as Type` 当作 validation。
4. 使用 request id 或 sequence guard 防止 stale response commit。
5. 使用 AbortController 做 client cancellation，同时保留 server authority 边界。
6. 从 sellerId、query、filter、sort、cursor 和 entity id 推导 cache key。
7. 理解 dedupe、stale data、refetch、invalidation 与 optimistic rollback 的边界。
8. 用 reducer、parser、cache key、race guard、fake fetch 和 visible UI tests 验证 async data flows。

## 4. 机制依赖图

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| React render snapshot | Effect request setup | 异步回调读取的是某次 render closure，不是 mutable live variable | 旧 query 的 response 可能写入新 UI |
| Fetch resolves Response | HTTP error classification | 404/500 不会自动变成 rejected Promise | UI 把 HTTP error body 当作成功数据 |
| `unknown` JSON | Runtime parser | TypeScript assertion 不验证 network payload | malformed payload 进入 domain rendering |
| Request lifecycle union | Accessible async UI | UI branch 必须来自可审查状态 | spinner、error、empty、retry 互相覆盖 |
| Request identity | Latest request wins | overlapping requests 需要 commit permission | older response 覆盖 newer response |
| AbortSignal | Timeout/user/filter cancellation | cancellation 是 client request signal | 把 timeout 错当成 HTTP status |
| Resource key | Cache entry and dedupe | cache 必须按 resource identity 共享 | component name key 导致错读和过期 |
| Mutation boundary | Invalidation and optimistic rollback | server authority 决定 confirmed data | pending UI 被误当作服务器事实 |

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| External system | React 控制之外的 network/API/cache/browser process | React framework boundary | Effect 的意义是同步外部系统 |
| Response | Fetch resolve 后得到的 HTTP response object | browser platform API | `ok`、`status`、`headers` 和 body parsing 都在这里 |
| Runtime validation | 对 unknown payload 做 JavaScript runtime check | JavaScript runtime + TypeScript boundary | 防止 `as Order[]` 掩盖坏数据 |
| Request identity | 区分每次请求的 id 或 sequence number | JavaScript value identity | 控制 stale response 是否能 commit |
| AbortSignal | 传给 fetch 的 cancellation signal | browser platform API | abort client request，不证明 server stopped |
| Cache key | resource identity 的稳定字符串 | JavaScript data model | 决定 cache entry 和 dedupe boundary |
| Optimistic item | 等待服务器确认的 pending UI item | React state | 必须能 confirm 或 rollback |

## 6. 底层心智模型

一次数据请求不是“拿到数据然后 setState”。它是一条边界链：

1. render snapshot 产生本次 criteria，例如 `query = "lamp"`；
2. event 或 effect 决定是否启动 request process；
3. JavaScript 创建 request id、AbortController、resource key；
4. browser Fetch API 处理 network request 并返回 Response 或 network failure；
5. response branch 检查 HTTP status，再解析 body；
6. parser 把 unknown runtime value 缩窄为 domain value；
7. reducer 根据 request id 和结果执行 lifecycle transition；
8. UI 根据 lifecycle state 渲染 loading、empty、success、error、retry 或 refetching；
9. cache 和 mutation 只处理 client snapshot，不替代 server authority。

## 7. 推荐目录结构

### 当前项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">当前项目结构</span>
  </div>

```txt
D:/vite_ts/
  README.md
  src/
    App.tsx
    site/data/learning-manifest.ts
    learning/react/
```
</div>

### 本章文档结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">本章文档结构</span>
  </div>

```txt
docs/react/chapter-24-data-fetching-cancellation-race-cache-boundary/
  react-chapter-24-learning-guide.md
```
</div>

### 概念示例结构

这些 snippet 只解释机制，不表示要创建这些文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets:
  Snippet: effect request boundary
  Snippet: response parser
  Snippet: latest request guard
  Snippet: cache key boundary
  Snippet: optimistic rollback
```
</div>

### 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/
  chapter-24-practice-root.tsx
  02-fetch-api/http-response-model.ts
  03-response-parsing/order-payload-parser.ts
  04-request-lifecycle/request-state-reducer.ts
  06-race-conditions/request-sequence-guard.ts
  07-abort-controller/abortable-fetch-model.ts
  10-query-driven-requests/resource-key-model.ts
  11-cache-boundary/simple-resource-cache.ts
  sellerhub-data-fetching-boundary-lab/
```
</div>

## 8. 示例运行方式

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run dev
```
</div>

开发服务器启动后，进入 `/react/chapter-24`。本章 practice 是 Vite client-side lab，不创建 backend，也不连接真实外部 API。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Data fetching boundary：外部系统同步，不是 render-time calculation

**结论：**

Data fetching 是与 external system 同步。React render 只能根据当前 snapshot 返回 UI description，不能把普通 client component render 变成 request owner。请求应该由 event、Effect 或 custom hook process 启动，并把 lifecycle state 明确交回 React。

**机制证据链：**

触发动作是 query commit；JavaScript 创建 criteria object、request id 和 fetch call；React 保存当前 render snapshot，并在 effect setup 中读取该 snapshot；TypeScript 只检查 criteria 类型，不验证远端返回；结果 UI 来自 reducer transition。错误边界是 render 中直接启动 request，因为 render 必须保持可重复、可中断、无外部副作用。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: request boundary</span>
  </div>

```tsx
function CatalogSearch({ query }: { query: string }) {
  const [status, setStatus] = useState('idle')

  function runSearch() {
    setStatus('pending')
    void fetch(`/api/catalog?q=${encodeURIComponent(query)}`)
  }

  return <button onClick={runSearch}>{status}</button>
}
```
</div>

**逐行解释：**

第 1 行 component 读取当前 render 的 `query`；第 2 行 status 是 React state cell；第 4 行 event handler 成为 request owner；第 5 行先提交 lifecycle transition；第 6 行 fetch 属于 browser platform boundary；第 9 行 UI 只显示当前 status snapshot。

**执行过程与值变化：**

用户点击 button 时，handler closure 读取本次 render 的 `query`。`setStatus('pending')` 不会修改当前函数中的 status binding，而是安排下一次 render。fetch call 进入浏览器外部系统；真正的成功、失败、解析和 commit 还需要后续边界。

**错误边界与修正：**

错误写法是在 component body 中调用 `fetch(url)`，违反 render purity。修正方式是把 request 放入 event、Effect 或 custom hook，并把 loading/error/success 交给 reducer，而不是让 request 成为 render-time calculation。

<a id="section-9-2"></a>

### 9.2 Fetch API boundary：request、response、ok、status、headers 与 body parsing

**结论：**

Fetch API 的 rejected Promise 主要表示 network/request failure；HTTP 404/500 通常仍 resolve 为 Response。`response.ok`、`status`、`headers` 和 body parsing 必须被显式建模。

**机制证据链：**

触发动作是 `fetch(url)`；JavaScript 得到一个 Promise；browser 创建 request 并最终 resolve Response；React 不知道 HTTP status，只有你的 handler/reducer 知道；TypeScript 也不会把 404 变成类型错误。错误规则是把 resolved fetch 当作 domain success。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/02-fetch-api/http-response-model.ts</span>
  </div>

```ts
export function classifyHttpResponseStatus(response: Response, data: unknown) {
  if (response.ok) {
    return { type: 'success', data, status: response.status }
  }

  return { type: 'http-error', status: response.status }
}
```
</div>

**逐行解释：**

第 1 行把 Response 和 parsed body 分开传入；第 2 行读取 browser Response 的 ok getter；第 3 行只有 ok 时才创建 success result；第 6 行把非 ok Response 转成 HTTP error result，而不是抛成 network error。

**执行过程与值变化：**

Response object 拥有 status、statusText、headers 和 body stream。读取 `response.json()` 会消费 body；消费完成后，domain parser 才能判断 unknown body 是否满足业务结构。

**错误边界与修正：**

错误代码是 `const data = await fetch(url).then((r) => r.json())` 后直接 render。它违反 HTTP response boundary。修正是先 `if (!response.ok)`，再 parse body，并把 HTTP error、parse error、domain error 分开。

<a id="section-9-3"></a>

### 9.3 Response parsing boundary：unknown JSON、runtime validation 与 TypeScript limits

**结论：**

`await response.json()` 的结果在 runtime 是 unknown value。`as Order[]` 只改变 TypeScript 对源码的理解，不会检查真实 payload。domain UI 只能消费 parser 验证后的值。

**机制证据链：**

触发动作是 body parsing；JavaScript 得到 object、array、string 或其他 runtime value；React UI 如果直接 map，就可能在 render 阶段崩溃；TypeScript assertion 被擦除，不会生成 runtime validator。错误规则是把 compile-time type 当作 network contract。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/03-response-parsing/order-payload-parser.ts</span>
  </div>

```ts
export function parseOrdersPayload(input: unknown) {
  if (!isRecord(input) || !Array.isArray(input.rows)) {
    return { type: 'invalid', issue: 'Payload rows must be an array' }
  }

  return { type: 'valid', orders: input.rows }
}
```
</div>

**逐行解释：**

第 1 行强制从 unknown 开始；第 2 行先检查 object 和 rows array；第 3 行返回 invalid branch，UI 可以显示 parse error；第 6 行只有通过边界检查后才返回 valid branch。

**执行过程与值变化：**

`input` 进入 parser 前没有 domain type。每个 runtime check 都缩小可安全读取的属性范围。React component 读取 `result.type` 分支后，才知道可以访问 `orders`。

**错误边界与修正：**

错误代码是 `const orders = await response.json() as Order[]`。它违反 unknown payload boundary。修正是 parser 返回 discriminated union，让 UI 先处理 invalid branch。

<a id="section-9-4"></a>

### 9.4 Request lifecycle state：idle、pending、success、empty、error 与 refetching

**结论：**

Request lifecycle 应该用一个 union state 表示，而不是 `isLoading`、`hasError`、`data`、`isRefetching` 四处散落。union 能阻止 impossible states，例如同时 loading 和 success 且没有 request id。

**机制证据链：**

触发动作是 request action；JavaScript 创建 action object；React reducer 根据当前 state 和 action 产生 next state；TypeScript 通过 discriminated union 让每个 branch 拥有对应字段；UI 读取 `state.status` 决定 branch。错误规则是让多个 boolean 分别拥有同一个 lifecycle 的不同部分。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/04-request-lifecycle/request-state-reducer.ts</span>
  </div>

```ts
type RequestState<TData> =
  | { status: 'idle'; data: null }
  | { status: 'pending'; requestId: string; data: null }
  | { status: 'success'; requestId: string; data: TData }
  | { status: 'error'; requestId: string; error: Error }
```
</div>

**逐行解释：**

第 1 行让 state 与 data type 保持 generic；第 2 行 idle 没有 data；第 3 行 pending 必须有 request id；第 4 行 success 才有 data；第 5 行 error 才有 error object。

**执行过程与值变化：**

`start` action 从 idle 进入 pending；`resolve` action 只有 request id 匹配时进入 success；`reject` 进入 error 并保留 last successful data；`start` from success 进入 refetching。

**错误边界与修正：**

错误写法是同时维护 `isLoading` 和 `data`，导致 `isLoading=true` 且 `data=null` 和 `data` stale 的语义不清。修正是把状态转移集中到 reducer。

<a id="section-9-5"></a>

### 9.5 Effect fetching and cleanup：dependency ownership 与 cleanup mirror

**结论：**

Effect fetch 用来同步 committed criteria 与外部 request。setup 启动当前 criteria 的 request，cleanup 负责取消或忽略上一轮 request。dependency list 描述 Effect 读取的 reactive values。

**机制证据链：**

触发动作是 commit 后 dependencies 变化；React 先运行旧 cleanup，再运行新 setup；JavaScript closure 保存旧 criteria；AbortController 或 ignore flag 阻止旧 request 写入 UI；TypeScript 只检查函数和 signal 类型。错误规则是遗漏 dependency 或直接把 Effect callback 写成 async function。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: effect cleanup boundary</span>
  </div>

```tsx
useEffect(() => {
  let ignore = false

  async function load() {
    const response = await fetch(url)
    if (!ignore) setStatus(response.ok ? 'success' : 'error')
  }

  void load()
  return () => {
    ignore = true
  }
}, [url])
```
</div>

**逐行解释：**

第 1 行 Effect setup 读取 `url`；第 2 行创建本次 setup 独有的 guard；第 4 行把 async process 放入内部函数；第 5 行 fetch 外部系统；第 6 行只有当前 setup 未 cleanup 才 commit；第 10 行 cleanup 改变 closure 中的 guard；第 13 行 dependency list 声明 url ownership。

**执行过程与值变化：**

url 从 A 变成 B 时，React 先调用 A 的 cleanup，使 A closure 的 `ignore` 变为 true；再运行 B setup。A response 晚到时读到 true，不会 setStatus。

**错误边界与修正：**

错误一是 `useEffect(async () => {})`，因为 Effect callback 应返回 cleanup 或 undefined，不应返回 Promise。错误二是 dependency list 漏掉 url，会让旧 url request 继续代表新 UI。修正是内部 async function 加完整 dependencies。

<a id="section-9-6"></a>

### 9.6 Race conditions：stale response、latest request wins 与 request identity

**结论：**

Race condition 发生在多个 request overlap 且 response 完成顺序与启动顺序不同。latest request wins 不是靠网络速度，而是靠 request identity 决定谁有 UI commit 权限。

**机制证据链：**

触发动作是快速输入 filter；JavaScript 连续创建 request id 1 和 2；React 当前 UI 代表 id 2；id 1 response 晚到时，如果没有 guard，就会 setState 覆盖 id 2 的结果；TypeScript 不能判断哪个 Promise 更晚 resolve。错误规则是 response 完成就无条件 commit。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/06-race-conditions/request-sequence-guard.ts</span>
  </div>

```ts
const requestId = guard.startRequest()
const result = await fetchCatalog(query)

if (guard.isLatest(requestId)) {
  setProducts(result)
}
```
</div>

**逐行解释：**

第 1 行分配本次 request identity；第 2 行异步等待 browser/network；第 4 行比较 identity 与 latest id；第 5 行只有 latest request 才能 commit products。

**执行过程与值变化：**

request 1 查询 `l`，request 2 查询 `lamp`。latest id 变为 2。request 2 先成功，commit `lamp` 结果；request 1 晚到，`isLatest(1)` 为 false，所以被忽略。

**错误边界与修正：**

错误写法是每个 Promise `.then(setProducts)`。它违反 UI commit boundary。修正是 request id comparison。注意：ignore stale response 不取消 request，它只阻止结果写入 UI。

<a id="section-9-7"></a>

### 9.7 AbortController and AbortSignal：abort fetch 与 AbortError boundary

**结论：**

AbortController 创建一个一次性 signal。把 signal 传给 fetch 后，cleanup 或 user cancel 可以 abort client request。AbortError 应该被单独分类，不应当渲染成普通 network error。

**机制证据链：**

触发动作是 route/filter change 或 cancel button；JavaScript 调用 `controller.abort()`；browser signal 变为 aborted 并让 fetch reject；React catch branch 进入 abort transition；TypeScript 只能确认 signal 参数类型。错误规则是复用已 aborted signal 或把 AbortError 当成 server failure。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: abortable fetch</span>
  </div>

```ts
const controller = new AbortController()

try {
  const response = await fetch(url, { signal: controller.signal })
  return response
} catch (error) {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return null
  }
  throw error
}
```
</div>

**逐行解释：**

第 1 行每次 request 创建新 controller；第 4 行把 signal 交给 fetch；第 6 行捕获 reject；第 7 行通过 name 区分 AbortError；第 8 行 abort 不作为用户可见失败；第 10 行其他错误继续抛出。

**执行过程与值变化：**

abort 前 signal.aborted 是 false；调用 abort 后变为 true。fetch reject 的 error 进入 catch branch。React state 应回到 previous success、idle 或 aborted branch，而不是显示红色错误。

**错误边界与修正：**

错误写法是把一个 controller 放在 module scope 中复用。signal 一旦 aborted 就不能重新变回 active。修正是每次 request 创建新 controller，并在 cleanup 中 abort 当前 controller。

<a id="section-9-8"></a>

### 9.8 Timeout and combined cancellation：timeout、user cancel、route/filter change

**结论：**

Timeout 是 user experience boundary，不是 HTTP status。它通常通过 AbortSignal 或手动 timer 转化为 client cancellation。timeout、user cancel、route change、filter change 可以共享 cancellation model，但含义不同。

**机制证据链：**

触发动作是时间耗尽或用户取消；JavaScript timer 或 signal any 触发 abort；browser fetch reject；React request state 根据 reason 分支；TypeScript 不知道 runtime 支持 `AbortSignal.timeout` 的环境差异。错误规则是把 timeout 当作 response.status。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: timeout boundary</span>
  </div>

```ts
const controller = new AbortController()
const timeoutId = window.setTimeout(() => controller.abort(), 5000)

try {
  await fetch(url, { signal: controller.signal })
} finally {
  window.clearTimeout(timeoutId)
}
```
</div>

**逐行解释：**

第 1 行创建 request controller；第 2 行用 browser timer 表达 timeout boundary；第 5 行 fetch 读取同一个 signal；第 7 行无论成功失败都清理 timer，避免后续误 abort。

**执行过程与值变化：**

如果 5 秒内 response 未完成，timer callback 调用 abort。state branch 可显示 timeout retry；如果 response 先完成，finally 清理 timer，timeout 不再触发。

**错误边界与修正：**

错误写法是 `if (response.status === 'timeout')`。HTTP status 是 number，timeout 是 client-side cancellation reason。修正是错误分类中保留 `reason: 'timeout'`。

<a id="section-9-9"></a>

### 9.9 Custom data hook：提取 request process 但不隐藏 ownership

**结论：**

Custom hook 的价值是隔离 request process：state reducer、request id、abort cleanup、fetcher injection 和 refetch。它不应该过早变成万能 `useFetch`，把 parser、cache key 和 feature ownership 全隐藏。

**机制证据链：**

触发动作是 criteria/resourceKey 变化；JavaScript hook closure 创建 controller 和 request id；React 按 hook call position 保存 reducer state；TypeScript 检查 generic data type，但 fetcher 仍然可能返回坏 payload；错误规则是让 hook 隐藏每个 resource 的 domain parser。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/09-custom-hook/use-sellerhub-resource.ts</span>
  </div>

```ts
const resource = useSellerHubResource({
  criteria,
  fetcher,
  isEmpty,
  resourceKey,
})
```
</div>

**逐行解释：**

第 1 行调用 hook 建立稳定 hook call position；第 2 行 criteria 是 request input owner；第 3 行 fetcher 通过 dependency injection 避免真实 network test；第 4 行 empty 规则归 feature；第 5 行 resourceKey 归 cache identity。

**执行过程与值变化：**

resourceKey 变化时 hook cleanup abort 旧 controller，再创建新 request id。成功后 reducer commit；失败后分类 error；refetch 复用同一 criteria 和 resource key。

**错误边界与修正：**

错误写法是 `useFetch(url)` 返回 `any` data，所有 parsing、empty、cache、retry 都在 hook 内部猜。修正是让 feature 显式传入 criteria、fetcher、isEmpty 和 resourceKey。

<a id="section-9-10"></a>

### 9.10 Query/filter-driven requests：URL/search params、cache key 与 resource identity

**结论：**

Query/filter driven request 的关键不是 input 框字符，而是 committed resource identity。local draft input、URL/search params、resource key 和 network request criteria 是不同值。

**机制证据链：**

触发动作是用户提交 filter；JavaScript 从 draft 生成 committed criteria；URLSearchParams 序列化 shareable state；React render 读取 committed criteria；TypeScript 检查 channel/sort union，但不保证 URL string 有效。错误规则是 cache key 漏掉 filter 或 cursor。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/10-query-driven-requests/resource-key-model.ts</span>
  </div>

```ts
const key = buildCatalogResourceKey({
  channel: 'retail',
  cursor: 'page-2',
  query: 'lamp',
  sellerId: 'seller-42',
  sort: 'revenue',
})
```
</div>

**逐行解释：**

第 1 行调用 key builder；第 2 行 channel 影响资源集合；第 3 行 cursor 影响 page identity；第 4 行 query 影响 filter；第 5 行 sellerId 区分 tenant/resource owner；第 6 行 sort 影响排序结果。

**执行过程与值变化：**

draft `la` 不一定启动 request；提交后变成 committed query `lamp`，URL/search params 和 cache key 才更新。相同 key 可以复用 cache，不同 key 必须分开。

**错误边界与修正：**

错误写法是 cache key 只写 `catalog`。不同 seller、query、channel 会共享同一 entry。修正是把真实 resource identity 全部编码进 key。

<a id="section-9-11"></a>

### 9.11 Cache boundary：cache key、cache entry、dedupe、stale data 与 refetch

**结论：**

Client cache 是 resource snapshot boundary，不是 production server authority。cache key 找到 cache entry；in-flight entry 可以 dedupe 同一个 Promise；stale data 可以先展示，再 refetch。

**机制证据链：**

触发动作是读取 resource key；JavaScript Map 查找 entry；React UI 根据 success/error/in-flight/stale branch 渲染；TypeScript 泛型只描述 entry data type，不验证 key 语义。错误规则是用 component name 当 cache key。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/11-cache-boundary/simple-resource-cache.ts</span>
  </div>

```ts
const promise = cache.getOrCreateInFlight(key, () => fetchProducts())
const samePromise = cache.getOrCreateInFlight(key, () => fetchProducts())

if (promise === samePromise) {
  console.log('deduped')
}
```
</div>

**逐行解释：**

第 1 行创建或读取 key 对应的 in-flight Promise；第 2 行同 key 再次读取；第 4 行 reference equality 证明两个 consumer 共享一个 request；第 5 行 dedupe 只表示 client Promise 共享。

**执行过程与值变化：**

Map 从 empty 变成 `{ key -> in-flight }`。resolve 后 entry 变成 success data。refetch 可以保留 last success，同时创建新的 in-flight entry。

**错误边界与修正：**

错误写法是 `key = 'CatalogPanel'`。component identity 不是 resource identity。修正是 key 包含 sellerId、query、filter、sort、cursor 或 entity id。

<a id="section-9-12"></a>

### 9.12 Invalidation boundary：mutation result、server authority 与 refetch strategy

**结论：**

Mutation 可能改变 server resource。client snapshot 在 mutation 后变 stale，需要根据 affected resources 做 targeted invalidation 和 refetch，而不是把所有 state 清空。

**机制证据链：**

触发动作是 save note mutation；JavaScript 收到 mutation result；React optimistic state 等待 confirm 或 rollback；cache 根据 affected keys invalidates；TypeScript 不知道服务器是否实际写入成功。错误规则是把 local patch 当作 server authority。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: targeted invalidation</span>
  </div>

```ts
const invalidatedKeys = cache.invalidateWhere((key) =>
  key.startsWith('orders?') || key.startsWith('order-detail?'),
)

void refetchKeys(invalidatedKeys)
```
</div>

**逐行解释：**

第 1 行根据 key predicate 选择 affected resources；第 2 行 orders list 和 order detail 是 mutation 相关资源；第 5 行只 refetch affected keys。

**执行过程与值变化：**

save note 成功后，相关 cache entry 从 success 变为 missing/stale；UI 可保留 last successful data，同时显示 refetching。server response 才能确认最终值。

**错误边界与修正：**

错误写法是 mutation 成功后 `cache.clear()`。它丢失无关资源并造成全站 loading。修正是 targeted invalidation。

<a id="section-9-13"></a>

### 9.13 Pagination and load more：cursor identity、append vs replace 与 duplicate guard

**结论：**

Pagination 不是普通 list concat。cursor/page identity、initial loading、loading next page、empty first page、end of list、duplicate row 都要分开建模。

**机制证据链：**

触发动作是 load more；JavaScript 使用 current cursor 创建 next request key；React state 保留已有 rows；response page append 时通过 id 去重；TypeScript 只知道 row 有 id，不知道后端是否重复返回。错误规则是无条件 concat。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/13-pagination-load-more/pagination-model.ts</span>
  </div>

```ts
const seenIds = new Set(state.rows.map((row) => row.id))
const uniqueRows = page.rows.filter((row) => !seenIds.has(row.id))

return {
  rows: [...state.rows, ...uniqueRows],
  cursor: page.nextCursor,
}
```
</div>

**逐行解释：**

第 1 行从 current state 建立已有 entity id set；第 2 行过滤新 page 中重复 id；第 5 行 append unique rows；第 6 行把 next cursor 写入 pagination state。

**执行过程与值变化：**

第一页已有 product-101；第二页返回 product-101 和 product-102。duplicate guard 只 append product-102，避免 UI 重复。

**错误边界与修正：**

错误写法是 `setRows([...rows, ...page.rows])`。它违反 entity identity boundary。修正是 id-based merge。

<a id="section-9-14"></a>

### 9.14 Optimistic update and rollback：pending UI 与 confirmed server data

**结论：**

Optimistic update 代表 pending user intent。它可以改善交互反馈，但必须保留 temporary id、pending status、confirm 和 rollback path。confirmed server data 只能来自 server result。

**机制证据链：**

触发动作是 submit note；JavaScript 创建 temporary id 和 pending note；React state 立即显示 pending item；mutation resolve 后替换为 confirmed item，reject 后 rollback；TypeScript union 区分 pending/confirmed，但不证明服务器接受。错误规则是直接修改 confirmed cache。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/14-optimistic-rollback/optimistic-note-model.ts</span>
  </div>

```ts
const pendingNotes = createOptimisticNote(notes, message, temporaryId)
const confirmedNotes = confirmOptimisticNote(pendingNotes, temporaryId, serverNote)
const rolledBackNotes = rollbackOptimisticNote(pendingNotes, temporaryId)
```
</div>

**逐行解释：**

第 1 行追加 pending item；第 2 行 server success 后替换 temporary item；第 3 行 server failure 后删除 temporary item。

**执行过程与值变化：**

notes 从 confirmed list 变成 confirmed + pending。success 后 pending id 被 real id 替换；failure 后 pending item 移除，UI 显示错误或 retry。

**错误边界与修正：**

错误写法是把 pending note 直接写成 confirmed。它违反 server authority。修正是明确 `kind: 'pending' | 'confirmed'`。

<a id="section-9-15"></a>

### 9.15 Loading、empty、partial 与 error UI：accessible async states

**结论：**

Async UI 不能只有 spinner。initial loading、refetching with previous data、empty result、partial data、network error、HTTP error、parse error、domain error、AbortError 和 retry 都应有清晰 branch。

**机制证据链：**

触发动作是 lifecycle transition；React render 读取 `state.status`；DOM 输出 role status 或 alert；screen reader 根据 live region 感知变化；TypeScript 根据 discriminated union 约束 branch 字段。错误规则是一个 loading boolean 管所有状态。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/sellerhub-data-fetching-boundary-lab/async-status-region.tsx</span>
  </div>

```tsx
if (state.status === 'error') {
  return <p role="alert">{state.error.message}</p>
}

return <p role="status">{state.status}</p>
```
</div>

**逐行解释：**

第 1 行根据 union discriminator 进入 error branch；第 2 行错误用 alert；第 5 行非错误状态用 status，适合 loading/refetching 等更新。

**执行过程与值变化：**

pending 渲染 status；parse error 渲染 alert；refetching 可以继续显示 previous data 并用 status 说明刷新中。

**错误边界与修正：**

错误写法是只显示 spinner，没有文本、没有 retry、没有 previous data branch。修正是按 lifecycle branch 渲染可访问状态。

<a id="section-9-16"></a>

### 9.16 Suspense、use 与 framework data fetching boundary：只做边界阅读，不伪造 runtime

**结论：**

Suspense 是 pending UI boundary，不等于完整 request lifecycle model。`use` 可以在支持边界读取 Promise 或 Context，但本章 Vite client lab 不伪造 framework data loading、Server Components 或 SSR。

**机制证据链：**

触发动作是 component 读取 suspended resource；React 捕获 suspension 并显示 fallback；JavaScript Promise resolve 后 React retry render；TypeScript 只检查 value type；错误规则是自己在 render 中创建 Promise cache 并声称等价于 framework data fetching。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: boundary-only Suspense reading</span>
  </div>

```tsx
<Suspense fallback={<p>Loading product...</p>}>
  <ProductPanel />
</Suspense>
```
</div>

**逐行解释：**

第 1 行 Suspense boundary 包住可能 suspend 的 subtree；第 2 行 fallback 只描述 pending UI；第 3 行 ProductPanel 的数据来源仍取决于 framework/cache boundary。

**执行过程与值变化：**

fallback 出现说明 subtree pending，不说明 HTTP status、parse result、cache invalidation 或 optimistic rollback。那些仍需要 request lifecycle model 或 framework data layer。

**错误边界与修正：**

错误写法是在普通 component render 中创建 fake cache 并宣称替代 React Router loader、Next.js data fetching 或 server cache。修正是在本章只作为边界阅读，并在真实 framework 中遵守对应 runtime。

<a id="section-9-17"></a>

### 9.17 Testing async data flows：fake fetch、abort、race、reducer 与 visible UI evidence

**结论：**

Async data tests 应优先测试 pure reducer、parser、cache key、race guard、abort model，再用 fake fetch injection 和 role/text assertion 测 visible UI。不要靠真实 network 或随意 sleep。

**机制证据链：**

触发动作是 test 调用 pure function 或 render component；JavaScript fake fetch 返回 deterministic Promise；React Testing Library 观察 DOM role/text；TypeScript 编译测试源码；错误规则是测试 implementation class name 或等待任意毫秒。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: deterministic async test boundary</span>
  </div>

```tsx
render(<SellerHubDataFetchingBoundaryLab />)

expect(screen.getByRole('heading', {
  name: 'SellerHub Data Fetching Boundary Lab',
})).toBeInTheDocument()
expect(screen.getAllByRole('status').length).toBeGreaterThan(0)
```
</div>

**逐行解释：**

第 1 行 render public component；第 3 行通过 accessible heading 查找，而不是 class；第 6 行验证 visible async status region 存在。

**执行过程与值变化：**

测试环境不访问真实 network。fake client 由 local Promise 模拟可控 response。纯函数测试覆盖 parser、reducer、cache、pagination、optimistic model。

**错误边界与修正：**

错误写法是 `await new Promise((r) => setTimeout(r, 1000))`。它不证明状态正确，只让测试变慢且 flaky。修正是 deterministic Promise、fake timers、role assertions。

<a id="section-9-18"></a>

### 9.18 SellerHub data fetching mapping：catalog、orders、dashboard、settings 与 notes

**结论：**

SellerHub 的 data fetching review 应按 scenario 审查 owner、resource key、parser、lifecycle、cache、mutation 和 test evidence，而不是只问“有没有 fetch”。

**机制证据链：**

触发动作来自 catalog filter、orders retry、dashboard refresh 或 note mutation；JavaScript 创建不同 criteria 和 key；React 使用不同 lifecycle branch；TypeScript 约束 domain types；错误规则是所有请求共享同一个 state 或 key。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: SellerHub request map</span>
  </div>

```ts
const requestMap = {
  catalog: 'sellerId + query + channel + sort + cursor',
  orders: 'sellerId + status + cursor',
  dashboard: 'sellerId + metricRange',
  noteMutation: 'orderId + temporaryId',
}
```
</div>

**逐行解释：**

第 2 行 catalog key 必须包含 filter 和 pagination；第 3 行 orders key 包含 status/cursor；第 4 行 dashboard key 包含 metric range；第 5 行 mutation key 包含 entity 和 temporary id。

**执行过程与值变化：**

catalog search aborts old query；orders retry reuses criteria；dashboard refresh keeps stale metrics while refetching；settings save invalidates affected keys；note mutation creates pending item then confirm/rollback。

**错误边界与修正：**

错误写法是一个 `sellerData` state 装所有页面数据。它违反 resource ownership。修正是按 scenario 记录 request owner、key、parser、lifecycle 和 tests。

<a id="section-9-19"></a>

### 9.19 Final mini project：SellerHub Data Fetching Boundary Lab

**结论：**

最终小项目只用于整合本章机制，不替代前面的分节教学。它把 demo API client、catalog resource key、orders lifecycle、abortable search、race guard、cache dedupe、pagination、optimistic rollback、async status 和 review table 放在一个 Vite client page 中。

**机制证据链：**

触发动作来自输入、button click 或 initial effect；JavaScript 创建 local deterministic Promise、AbortController、request id 和 cache key；React 用 state/reducer/hook 保存 lifecycle；TypeScript 检查 component props 和 model types；错误规则是把 demo Promise 说成真实 backend 或 production cache。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/sellerhub-data-fetching-boundary-lab/sellerhub-data-fetching-boundary-lab.tsx</span>
  </div>

```tsx
export function SellerHubDataFetchingBoundaryLab() {
  return (
    <section aria-labelledby="sellerhub-lab-title">
      <h2 id="sellerhub-lab-title">SellerHub Data Fetching Boundary Lab</h2>
      <CatalogQueryResourcePanel />
      <OrdersRequestLifecyclePanel />
      <AbortableCatalogSearchPanel />
    </section>
  )
}
```
</div>

**逐行解释：**

第 1 行导出 practice page 的 final lab；第 3 行建立可访问 section；第 4 行提供页面 heading；第 5 行 catalog query 练 key 和 parser；第 6 行 orders lifecycle 练 reducer；第 7 行 abortable search 练 AbortController。

**执行过程与值变化：**

进入 `/react/chapter-24` 后，root page render 所有 panels。Catalog panel 启动 demo request；status 从 pending 到 success；搜索变化会产生新 resource key。其他按钮触发 race、dedupe、pagination 和 optimistic rollback。

**错误边界与修正：**

错误写法是把 demo client 写成“真实服务器”。修正是在 UI 和文档中明确它是 deterministic local teaching data，不代表 backend、database、production cache 或 server authority。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| `useEffect(setup, dependencies)` | React framework | commit 后同步外部系统，并在 dependency 变化前运行 cleanup | 直接传 async function 或遗漏 dependency |
| `fetch(input, init)` | browser platform API | 发起 request，resolve Response 或 reject network/abort failure | 以为 HTTP 500 会自动 reject |
| `Response.ok` | browser platform API | status 是否在 success range | 不检查 ok 就 parse/render |
| `Response.json()` | browser platform API | 消费 body stream 并 parse JSON | 以为 parse 后就是 domain type |
| `AbortController` | browser platform API | 创建 cancellation signal | 复用已 aborted signal |
| `AbortSignal` | browser platform API | 传递 abort 状态给 fetch | 声称一定停止 server work |
| `URLSearchParams` | browser platform API | 序列化 query/filter state | cache key 漏掉 filter/cursor |
| Discriminated union | TypeScript type system | 用 `status` 或 `type` 收窄 branch | scattered booleans 产生 impossible state |
| `Promise` injection | JavaScript runtime | 用 fake fetch 让 tests deterministic | 测试真实网络或 arbitrary sleep |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| Fetch directly during render | React runtime | render must stay pure | move request into event/effect/custom hook | repeated requests during render or Strict Mode |
| Treat HTTP 404 as rejected fetch | browser API | fetch resolves Response for HTTP errors | inspect `response.ok` and `status` | error branch never appears for 404 |
| Use `as Order[]` for JSON | TypeScript boundary | assertion does not validate runtime data | parse unknown payload | UI crashes on malformed payload |
| Use multiple booleans for lifecycle | state model | one lifecycle has one owner | reducer union | impossible loading/error/success combinations |
| Ignore stale response without naming it | race boundary | only latest request may commit | request id guard | old filter result overwrites new filter result |
| Reuse AbortSignal | browser API | signal is one-use after abort | new controller per request | next request aborts immediately |
| Cache by component name | cache boundary | key must represent resource identity | key by seller/query/filter/cursor | different resources show same data |
| Treat optimistic item as confirmed | server authority | server owns confirmed data | pending kind plus confirm/rollback | failed mutation leaves fake saved item |
| Spinner-only loading | accessibility | status must be perceivable and specific | role status/alert and retry UI | screen reader has no useful update |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。它是 Vite client lab，用 deterministic local Promise 模拟教学数据；它不创建 backend、database、production cache、SSR、server authority 或 framework data loading runtime。

### 项目目标

构建 `SellerHub Data Fetching Boundary Lab`：在 `/react/chapter-24` 展示 catalog query resource、catalog key/codec、orders lifecycle、abortable search、race condition、cache dedupe、pagination、optimistic note、async status region 和 review table。

### 为什么适合本章

SellerHub 有多个真实前端数据场景：catalog search 需要 query/filter key，orders list 需要 lifecycle 和 retry，dashboard refresh 需要 stale data，note mutation 需要 optimistic rollback。它们覆盖本章全部边界，但不需要引入真实后端。

### 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
sellerhub-data-fetching-boundary-lab/
  sellerhub-data-fetching-boundary-lab.tsx
  sellerhub-data-fetching-data.ts
  sellerhub-demo-api-client.ts
  catalog-query-resource-panel.tsx
  catalog-resource-codec.ts
  orders-request-lifecycle-panel.tsx
  orders-resource-reducer.ts
  abortable-catalog-search-panel.tsx
  race-condition-demo-panel.tsx
  cache-key-dedupe-panel.tsx
  pagination-load-more-lab.tsx
  optimistic-note-mutation-panel.tsx
  async-status-region.tsx
  data-fetching-review-table.tsx
```
</div>

### 文件职责

| File | Responsibility |
| --- | --- |
| `sellerhub-demo-api-client.ts` | deterministic local Promise client with AbortSignal support |
| `catalog-resource-codec.ts` | runtime boundary for unknown catalog payload |
| `catalog-query-resource-panel.tsx` | committed query, resource key, hook state, codec display |
| `orders-request-lifecycle-panel.tsx` | request reducer transitions for orders |
| `abortable-catalog-search-panel.tsx` | fresh controller per search and user cancel |
| `race-condition-demo-panel.tsx` | latest request wins commit model |
| `cache-key-dedupe-panel.tsx` | in-flight dedupe by cache key |
| `pagination-load-more-lab.tsx` | cursor append and duplicate guard |
| `optimistic-note-mutation-panel.tsx` | pending, confirm, rollback |
| `async-status-region.tsx` | role status / alert boundary |
| `data-fetching-review-table.tsx` | scenario-to-evidence review map |

### 完整代码入口

完整代码由本章 source root 中的 practice files 提供。学习时先从 `chapter-24-practice-root.tsx` 看页面组合，再进入各机制文件。

### 运行方式

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run dev
```
</div>

### 预期输出或交互结果

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
/react/chapter-24 shows SellerHub Data Fetching Boundary Lab
Catalog request status changes from pending to success
Race demo commits the latest response
Cache dedupe reports one request factory call
Pagination appends unique products
Optimistic note can be pending, confirmed, or rolled back
```
</div>

### 核心执行流程

1. page render 建立 chapter root；
2. catalog panel 根据 query 创建 resource key；
3. hook 启动 request、创建 AbortController、进入 pending；
4. demo API Promise resolve，parser/empty rule 进入 success；
5. race、cache、pagination、optimistic panels 用 button 暴露各自机制；
6. review table 把 scenario 映射到 owner、boundary 和 evidence。

### 常见错误

- 把 demo API 当作 backend：它只是 deterministic local teaching data。
- 把 cache Map 当作 production cache：它只演示 key、entry 和 in-flight dedupe。
- 把 stale response ignore 当成 network cancellation：它只阻止 UI commit。
- 把 AbortController 当成 server cancellation guarantee：它只发送 client abort signal。
- 把 Suspense fallback 当成 request lifecycle model：fallback 不表达 HTTP、parse、domain、retry 或 invalidation。

### 可选扩展

- 为 catalog codec 增加 malformed payload UI branch。
- 为 orders retry 添加 HTTP error、parse error 和 network error buttons。
- 用 MemoryRouter 把 route params 与 resource key 连接起来。
- 加入 dashboard stale-while-revalidate panel，但仍保持 local deterministic teaching data。

## 13. 额外速查表

| Concept | One-sentence summary |
| --- | --- |
| Fetch boundary | network request 和 HTTP response 不是 domain data |
| Parser boundary | unknown JSON 必须 runtime validate |
| Lifecycle state | 一个 request process 应由一个 union owner 表示 |
| Race guard | response 完成不等于拥有 commit permission |
| Abort | abort client fetch，不保证 server stopped |
| Cache key | key 表示 resource identity |
| Optimistic rollback | pending intent 必须能 confirm 或 rollback |

| Similar Concepts | Difference |
| --- | --- |
| network error vs HTTP error | network error reject；HTTP error usually resolves Response with non-ok status |
| abort vs stale ignore | abort cancels client fetch path；ignore only blocks UI commit |
| empty vs error | empty 是成功但无 rows；error 是 request/parse/domain failure |
| refetching vs pending | refetching 可保留 previous success；pending 通常没有 data |
| optimistic vs confirmed | optimistic 是 pending UI；confirmed 来自 server result |

最小模板：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: request lifecycle branch</span>
  </div>

```ts
switch (state.status) {
  case 'pending':
    return 'Loading'
  case 'success':
    return 'Ready'
  case 'error':
    return state.error.message
  default:
    return 'Idle'
}
```
</div>

## 14. 工程迁移与代码审查要点

- Request owner review：谁拥有 criteria、request id、AbortController 和 lifecycle state？
- Response parsing review：是否先处理 HTTP status，再把 unknown JSON 交给 parser？
- Error classification review：network、HTTP、parse、domain、abort、timeout 是否分开？
- Abort and cleanup review：cleanup 是否 mirror setup？是否复用 aborted signal？
- Race condition review：old response 是否有机会覆盖 current criteria？
- Cache key review：key 是否包含 sellerId、filter、sort、cursor、entity id？
- Dedupe review：in-flight Promise 是否只按 same resource key 共享？
- Refetch and invalidation review：mutation 后是否 targeted invalidation，而不是 global clear？
- Pagination review：append 是否按 id 去重？initial loading 和 loading next page 是否分开？
- Optimistic rollback review：pending item 是否有 temporary id、confirm path 和 rollback path？
- Async UI accessibility review：loading、refetching、empty、error、retry 是否可见且可访问？
- Test evidence review：pure model tests 与 visible UI tests 是否覆盖关键边界？
- Server authority review：client state 是否被误写成 confirmed server truth？
- Future library adoption boundary review：引入 server-state library 前，是否已经理解 key、parser、lifecycle、invalidation 和 mutation boundary？

## 15. 如何转换成个人笔记

建议把本章笔记整理成四张图：第一张画 request lifecycle union，第二张画 request id race timeline，第三张画 cache key 到 cache entry 的 Map，第四张画 optimistic pending item 到 confirm/rollback 的 mutation flow。每张图都写出 owner、runtime layer、TypeScript 能检查什么、不能检查什么。

## 16. 必须能回答的问题

1. 为什么 `fetch` resolve 不等于 HTTP success？
2. 为什么 `response.json() as Order[]` 不是 runtime validation？
3. idle、pending、success、empty、error、refetching 分别表示什么？
4. Effect cleanup 的旧 closure 如何阻止旧 request commit？
5. AbortController 和 stale response guard 的区别是什么？
6. 为什么 cache key 必须来自 resource identity？
7. Mutation 后为什么需要 invalidation？
8. Optimistic item 为什么不能当作 confirmed server data？
9. Suspense fallback 为什么不能替代 request lifecycle state？
10. Async data tests 为什么应优先 fake fetch 和 role assertions？

## 17. 最终记忆模型

Data fetching 是一条边界链：render snapshot 产生 criteria，effect/event/hook 启动 request，Fetch API 返回 Response，runtime parser 验证 unknown payload，reducer 记录 lifecycle，race guard 决定 commit permission，AbortSignal 处理 client cancellation，cache key 表示 resource identity，mutation/invalidation/optimistic rollback 尊重 server authority。

## 18. 官方文档阅读清单

1. React `useEffect`：重点读 external system synchronization、setup/cleanup、dependencies、fetching data with Effects、race condition ignore pattern、manual effect fetching downsides、custom Hook extraction。
2. React `Suspense`：重点读 fallback/pending UI boundary，不把 fallback 当作完整 request lifecycle。
3. React `use`：只作为 supported boundary reading，不在本 Vite client lab 中伪造 framework data runtime。
4. React `useOptimistic`：只作为 optimistic UI boundary reading，本章实际练习使用本地 pending/confirm/rollback model。
5. MDN Fetch API、Response、Headers：重点读 request/response、HTTP status、headers、body parsing。
6. MDN AbortController、AbortSignal、DOMException：重点读 abort signal、AbortError、TimeoutError 边界。
7. React Router Race Conditions 与 Network Concurrency Management：重点读 router/fetcher 对 stale response 和 concurrency 的边界处理；本章不迁移到 framework/data router mode。
