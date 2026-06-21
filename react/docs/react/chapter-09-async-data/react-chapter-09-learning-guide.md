# React 第 9 章：Async Data、Fetch Lifecycle 与 UI State

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

- [本章代码定位索引](#本章代码定位索引)
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
  - [9.1 Async data 与 local state 的边界](#91-async-data-与-local-state-的边界)
  - [9.2 Fetch lifecycle 与 discriminated async state](#92-fetch-lifecycle-与-discriminated-async-state)
  - [9.3 HTTP status、network error 与 JSON boundary](#93-http-statusnetwork-error-与-json-boundary)
  - [9.4 Event handler 驱动的 explicit request](#94-event-handler-驱动的-explicit-request)
  - [9.5 Effect 与 committed request criteria](#95-effect-与-committed-request-criteria)
  - [9.6 AbortController 与 obsolete result cleanup](#96-abortcontroller-与-obsolete-result-cleanup)
  - [9.7 Race condition 与 stale result](#97-race-condition-与-stale-result)
  - [9.8 unknown response 与 runtime type guard](#98-unknown-response-与-runtime-type-guard)
  - [9.9 useReducer 管理 async lifecycle](#99-usereducer-管理-async-lifecycle)
  - [9.10 Fetched source data 与 derived visible data](#910-fetched-source-data-与-derived-visible-data)
  - [9.11 Custom async hook 与独立 state](#911-custom-async-hook-与独立-state)
  - [9.12 Context delivery 与 request ownership](#912-context-delivery-与-request-ownership)
  - [9.13 SellerHub async data architecture mapping](#913-sellerhub-async-data-architecture-mapping)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 最终小项目结构](#122-最终小项目结构)
  - [12.3 文件职责](#123-文件职责)
  - [12.4 完整代码](#124-完整代码)
  - [12.5 核心执行流程](#125-核心执行流程)
  - [12.6 机制边界与常见错误](#126-机制边界与常见错误)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 对应文件 / 片段 | 类型 | 所在章节 |
| --- | --- | --- | --- |
| 本章练习入口 | `src/learning/react/chapter-09-async-data/chapter-09-practice-root.tsx` | 真实文件 | 8 |
| 本章共享样式 | `src/learning/react/chapter-09-async-data/chapter-09-practice.css` | 真实文件 | 8 |
| Async source boundary | `src/learning/react/chapter-09-async-data/01-async-data-boundary/async-data-source-boundary.tsx` | 真实练习 | 9.1 |
| Lifecycle union | `src/learning/react/chapter-09-async-data/02-async-state-union/async-lifecycle-union.tsx` | 真实练习 | 9.2 |
| HTTP / network / JSON boundary | `src/learning/react/chapter-09-async-data/03-http-error-boundary/http-response-boundary.tsx` | 真实练习 | 9.3 |
| Explicit event request | `src/learning/react/chapter-09-async-data/04-event-driven-fetch/event-driven-product-search.tsx` | 真实练习 | 9.4 |
| Criteria-driven Effect | `src/learning/react/chapter-09-async-data/05-effect-driven-fetch/effect-driven-product-query.tsx` | 真实练习 | 9.5 |
| Abort obsolete work | `src/learning/react/chapter-09-async-data/06-abort-obsolete-result/abort-obsolete-request.tsx` | 真实练习 | 9.6 |
| Race protection | `src/learning/react/chapter-09-async-data/07-race-condition/race-condition-protection.tsx` | 真实练习 | 9.7 |
| Runtime response guard | `src/learning/react/chapter-09-async-data/08-runtime-type-guard/unknown-response-guard.tsx` | 真实练习 | 9.8 |
| Async reducer | `src/learning/react/chapter-09-async-data/09-async-reducer/async-lifecycle-reducer.tsx` | 真实练习 | 9.9 |
| Derived fetched data | `src/learning/react/chapter-09-async-data/10-derived-fetched-data/derived-order-summary.tsx` | 真实练习 | 9.10 |
| Custom async hook | `src/learning/react/chapter-09-async-data/11-custom-async-hook/custom-async-resource.tsx` | 真实练习 | 9.11 |
| Context async delivery | `src/learning/react/chapter-09-async-data/12-context-async-delivery/context-async-delivery.tsx` | 真实练习 | 9.12 |
| Seller Orders Async Workspace | `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/` | 最终小项目 | 12 |

## 0. 文件定位

**学习指导文件：** `docs/react/chapter-09-async-data/react-chapter-09-learning-guide.md`

**源码根目录：** `src/learning/react/chapter-09-async-data/`

本章位于 `D:\vite_ts` 项目根目录下，与第 7、8 章同级。`src/App.tsx` 只挂载 `Chapter09PracticeRoot`，不承载 request、parser、reducer 或 Context 逻辑。

## 1. 本章解决的问题

Async data 来自 React tree 外部，具有延迟、失败、空结果、乱序到达和不可信 shape。React 不发起 HTTP、不解析 JSON、不判断 404，也不验证 response；它只保存你交给它的 state，并根据 current render snapshot 选择 UI branch。

本章建立一条完整证据链：用户操作或 committed criteria 触发 request；browser/JavaScript 创建 Promise、Response、AbortSignal 与 parsed value；runtime guard 把 `unknown` 转为 domain data；React owner 把 lifecycle transition 保存为 state；下一次 render 才进入 pending、success、empty 或 error UI。

## 2. 前置概念

- 第 4 章：event handler、state snapshot、batching 与 immutable update。
- 第 5 章：loading/error/empty/success conditional rendering 与 stable list key。
- 第 7 章：Effect、dependency、cleanup、AbortController、ignore 与 stale closure。
- 第 8 章：minimal state、reducer、Context、custom hook 与 state owner。
- JavaScript：Promise、`async`/`await`、`try`/`catch`、array methods。
- TypeScript：literal union、`unknown`、narrowing、type predicate 与 `never`。

## 3. 学习目标

完成本章后，你应该能够：

- 区分 local client state 与 external async resource state。
- 用 discriminated union 表达 idle/pending/success/empty/error。
- 区分 rejected fetch、HTTP non-2xx、JSON parse 与 invalid runtime shape。
- 判断 request 应由 event handler 还是 committed criteria Effect 触发。
- 用 AbortController 或 ignore flag 阻止 obsolete result 写入 state。
- 解释 request race 为什么会让旧结果覆盖新 criteria。
- 把 response body 作为 `unknown`，经 runtime guard 后再进入 domain state。
- 用 pure reducer 集中 async lifecycle transitions。
- 在 render 中派生 visible count/total，而不复制 fetched data。
- 提取 custom async hook，并解释每次 call 默认拥有独立 state。
- 用 Context 交付 async resource，同时保留明确 request owner。

## 4. 推荐学习顺序

1. 先区分 external resource 与 local UI state。
2. 再把 lifecycle 建模为互斥 union。
3. 拆开 network、HTTP、body parse 与 runtime validation。
4. 对比 event-driven 与 criteria-driven request。
5. 学习 abort、ignore 与 race protection。
6. 用 `unknown` guard 建立可信 domain boundary。
7. 用 reducer 集中 transition，并在 render 派生可见数据。
8. 最后提取 custom hook、定义 Context scope，并组合最终项目。

## 5. 核心术语表

| 术语 | 准确定义 | 所属层 |
| --- | --- | --- |
| async data | 来自当前 React tree 外部、延迟到达且可能失败的数据 | architecture / external system |
| request criteria | 决定请求资源的 committed input，如 category、productId、status | React state / architecture |
| Promise | 表示 pending 后最终 fulfilled 或 rejected 的 JavaScript object | JavaScript runtime |
| Response | Fetch API 对 HTTP response 的 browser object | Browser / HTTP |
| `Response.ok` | status 为 200–299 时为 true | Browser / HTTP |
| obsolete result | 已不再匹配 current criteria 的旧 request result | async architecture |
| race condition | 多个 request 的 completion order 与 start order 不同导致的竞争 | JavaScript / external system |
| runtime guard | 在 runtime 检查 `unknown` shape 并 narrowing 的 function | JavaScript / TypeScript |
| stale data | 新 request pending/error 时保留的上一份可信 data | UI state architecture |
| async state union | 用 discriminant 表达互斥 lifecycle branches | TypeScript / React state |

## 6. 底层心智模型

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Async data mental model</span></div>

```txt
trigger: user event OR committed criteria
  -> JavaScript creates request Promise and closures
  -> browser performs fetch-like work and may return Response or rejection
  -> HTTP status must be checked separately from network rejection
  -> body parsing returns an untrusted runtime value
  -> guard converts unknown into trusted domain data
  -> React owner queues lifecycle state transition
  -> next render selects pending, success, empty, or error UI
  -> cleanup aborts work or ignores obsolete completion
```
</div>

**七层边界：**

- **JavaScript runtime：** Promise state、closures、microtasks、objects、arrays、errors 与 `async`/`await`。
- **React framework：** Hook cell、update queue、render snapshot、Effect setup/cleanup、reducer、Context consumer。
- **Browser platform：** `fetch`、`Response`、`AbortController`、timer 与 DOM events。
- **HTTP protocol：** status code、headers、body 与 server response semantics。
- **TypeScript type system：** union、`unknown`、type predicate、action/context shape；emit 后擦除。
- **Tooling：** ESLint Hook rules、`tsc`、Vite TSX transform/build。
- **Architecture convention：** request owner、criteria lifetime、stale data policy、validation boundary 与 cache scope。

## 7. 推荐目录结构

采用“一个 async failure mode 一个目录”。前 12 个目录各自证明一个机制；最终项目只组合，不替代分节教学。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Chapter 09 real file structure</span></div>

```txt
src/learning/react/chapter-09-async-data/
  chapter-09-practice-root.tsx
  chapter-09-practice.css
  01-async-data-boundary/async-data-source-boundary.tsx
  02-async-state-union/async-lifecycle-union.tsx
  03-http-error-boundary/http-response-boundary.tsx
  04-event-driven-fetch/event-driven-product-search.tsx
  05-effect-driven-fetch/effect-driven-product-query.tsx
  06-abort-obsolete-result/abort-obsolete-request.tsx
  07-race-condition/race-condition-protection.tsx
  08-runtime-type-guard/unknown-response-guard.tsx
  09-async-reducer/async-lifecycle-reducer.tsx
  10-derived-fetched-data/derived-order-summary.tsx
  11-custom-async-hook/custom-async-resource.tsx
  12-context-async-delivery/context-async-delivery.tsx
  seller-orders-async-workspace/
    seller-order-types.ts
    seller-order-response-guard.ts
    seller-order-request.ts
    seller-orders-reducer.ts
    use-seller-orders-resource.ts
    seller-orders-context.ts
    seller-orders-provider.tsx
    seller-orders-toolbar.tsx
    seller-orders-list.tsx
    seller-orders-summary.tsx
    seller-orders-async-workspace.tsx
    seller-orders-async-workspace.css
```
</div>

概念错误对比只使用 `Snippet:` / `Template:`，不需要创建，也不会进入最终真实文件清单。

## 8. 示例运行方式

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Terminal</span></div>

```bash
npm run dev
```
</div>

`src/App.tsx` 已挂载 `Chapter09PracticeRoot`。在浏览器中快速切换 criteria、触发 empty/error、重复 retry，观察 current criteria、stale data 与 lifecycle branch。

## 9. 分节教学与练习

### 9.1 Async data 与 local state 的边界

**本节解决的问题：**

`localNote` 可以在当前 component 中立即编辑，而 warehouse stock 必须等待 tree 外部结果。若把两者都理解成“普通 state”，会忽略 stock 的 pending、failure 与 stale lifetime。

**技术意义：**

React state 是 UI snapshot 的容器，不是数据来源本身。Local note 的 source 是 browser input event；stock 的 source 是 async Promise。Component 必须额外保存“请求处于什么阶段”。

**新关键字和新概念：**

external source、local state、resource lifecycle、Promise settlement。本节没有新 API，重点是 async data lifecycle 和架构边界。

**七层边界：**

JavaScript 创建 Promise 和 async handler；React 保存 `localNote` 与 `stockState` Hook cells；browser timer 模拟延迟；真实 HTTP 在本练习中不存在；TypeScript 检查 union/number/error narrowing；Vite 转换 TSX；architecture 决定 stock 使用 lifecycle state。

**底层机制：**

输入 note 时，event handler 同步 queue 一个 string update。点击 Load 时，handler 先 queue pending object，再 `await` Promise；function 暂停但 component 没有暂停。Promise fulfilled 后 continuation 再 queue success object。

**API / 语法规则：**

`async function` 总返回 Promise；`await` 只暂停该 async function continuation。它不会阻塞 browser，也不会让 React 自动显示 loading。

**固定属性名 / 方法名 / 参数签名：**

`Promise<number>` 描述 fulfilled value；`setStockState` 接收完整 union member；`error: unknown` 必须 narrowing 后读取 message。

**机制证据链：**

1. Trigger 是 Load button click。
2. JavaScript 调用 `loadWarehouseStock()`，创建 pending Promise 与 timer closure。
3. React 把 `{ status: 'pending' }` 加入 `stockState` queue；`localNote` cell 不变。
4. Timer 模拟 external completion，Promise fulfilled 为 number `24`。
5. TypeScript 只检查 `Promise<number>`；真实服务 runtime value 仍需单独验证。
6. Pending render 显示 loading；fulfilled continuation queue success 后显示 quantity。
7. 若只保存 `number | null`，就无法区分 idle、pending 和 empty/unknown，UI 会产生含义混淆。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/01-async-data-boundary/async-data-source-boundary.tsx</span></div>

```tsx
import { useState } from 'react'

type StockState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; quantity: number }
  | { status: 'error'; message: string }

function loadWarehouseStock(): Promise<number> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(24), 550)
  })
}

export function AsyncDataSourceBoundary() {
  const [localNote, setLocalNote] = useState('Check receiving schedule')
  const [stockState, setStockState] = useState<StockState>({ status: 'idle' })

  async function handleLoadStock() {
    setStockState({ status: 'pending' })

    try {
      const quantity = await loadWarehouseStock()
      setStockState({ status: 'success', quantity })
    } catch (error: unknown) {
      setStockState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown stock error',
      })
    }
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Async source boundary</p>
      <h3>Separate local input from external data</h3>
      <label>
        Local note
        <input value={localNote} onChange={(event) => setLocalNote(event.currentTarget.value)} />
      </label>
      <button type="button" onClick={handleLoadStock} disabled={stockState.status === 'pending'}>
        Load warehouse stock
      </button>
      <p>
        {stockState.status === 'idle' && 'Stock has not been requested.'}
        {stockState.status === 'pending' && 'Loading stock...'}
        {stockState.status === 'success' && `Available units: ${stockState.quantity}`}
        {stockState.status === 'error' && stockState.message}
      </p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

`localNote` 只保存 input string；`stockState` 保存 external resource lifecycle。Mock function 创建 Promise；handler 先进入 pending，再将 fulfilled number 放入 success member。JSX 按 discriminant 只读取当前 member 可用字段。

**执行过程：**

Click handler 的旧 snapshot 仍是 idle，但 pending update 先触发 render。550ms 后 Promise continuation 运行，success update 产生下一份 snapshot。Browser 在等待期间仍能处理 note input。

**变量、引用与 async state 变化：**

每次 transition 创建新 state object；Promise 与 timer closure 是 JavaScript values，不存入 React state。Quantity binding 只存在于 fulfilled continuation。Local note updates 使用另一 Hook queue。

**为什么得到这个结果：**

UI 能显示 loading 是因为 handler 明确 queue pending，而不是因为 React“知道 Promise 尚未完成”。Success UI 来自第二次 state transition。

**对比写法：**

只写 `const [quantity, setQuantity] = useState<number | null>(null)` 会让 null 同时代表 never requested、pending 与 no data，无法生成准确 feedback。

**常见错误违反的规则：**

把 async value 当同步 variable，违反“外部结果有独立 lifecycle”的事实。具体 bug 是 request 等待期间 UI 仍显示旧 quantity，却没有 stale/pending 标记。

**如何识别类似错误：**

看到 remote data state 没有 status/error，或 null 被多个 UI branch 解释，说明 async boundary 未建模。

**与 SellerHub 的关系：**

Cart quantity 多为 local/client state；warehouse inventory、order list 与 auth bootstrap 来自 external source，必须有 lifecycle。

**与当前 React 学习主线的关系：**

本节把第 4 章普通 state 扩展为“state 保存 external process 的 current snapshot”，并承接第 7 章外部同步。

**本节最终记忆模型：**

React 保存 request 结果与阶段，不拥有 external source，也不替 Promise 完成工作。

### 9.2 Fetch lifecycle 与 discriminated async state

**本节解决的问题：**

`isLoading`、`hasError`、`isEmpty` 三个 booleans 可同时为 true，产生 impossible UI。本节用单个 `status` discriminant 让 lifecycle branches 互斥。

**技术意义：**

Union 将 payload 与阶段绑定：只有 success 拥有 products，只有 error 拥有 message。UI narrowing 与 transition 共享同一事实。

**新关键字和新概念：**

idle、pending、success、empty、error、discriminated union、impossible state。本节没有新 API，重点是 async data lifecycle 和架构边界。

**七层边界：**

JavaScript runtime 仍执行普通 object/string branch；React 保存一个 state object；browser timer 模拟 completion；HTTP 未参与；TypeScript narrowing 约束 payload；tooling 报告非法 member access；architecture 规定 empty 是成功但无结果。

**底层机制：**

Scenario click 创建 Promise。Pending transition 丢弃上次 payload以简化练习；fulfilled array length 决定 success/empty；rejection 进入 error。一个 render 只能看到一个 `status` string。

**API / 语法规则：**

Union members 共享 literal `status`。`state.status === 'success'` 后 TypeScript 才允许读取 `state.products`。

**固定属性名 / 方法名 / 参数签名：**

`status` 是本地 discriminant 约定；`requestProducts(scenario): Promise<string[]>` 声明 fulfilled value；`reject(new Error(...))` 进入 catch path。

**机制证据链：**

1. Trigger 是 Success/Empty/Error button。
2. JS 创建 scenario closure、pending Promise、timer 与 result array/Error。
3. React 先保存 pending member，settlement 后保存且只保存一个终态 member。
4. Mock browser timer fulfilled empty/non-empty array，或 rejected Error；真实 HTTP 还需额外检查 status。
5. TypeScript 保证 error member 有 message，但运行时 Error source 仍需 narrowing。
6. Array length 0 进入 empty；非 0 进入 success；reject 进入 error。
7. 多 booleans 会允许 loading + error 同时出现，造成 spinner 永不消失。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/02-async-state-union/async-lifecycle-union.tsx</span></div>

```tsx
import { useState } from 'react'

type Scenario = 'success' | 'empty' | 'error'

type AsyncProductsState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; products: string[] }
  | { status: 'empty' }
  | { status: 'error'; message: string }

function requestProducts(scenario: Scenario): Promise<string[]> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (scenario === 'error') {
        reject(new Error('Product service unavailable'))
        return
      }

      resolve(scenario === 'empty' ? [] : ['Desk Lamp', 'Monitor Stand'])
    }, 450)
  })
}

export function AsyncLifecycleUnion() {
  const [state, setState] = useState<AsyncProductsState>({ status: 'idle' })

  async function runScenario(scenario: Scenario) {
    setState({ status: 'pending' })

    try {
      const products = await requestProducts(scenario)
      setState(products.length === 0 ? { status: 'empty' } : { status: 'success', products })
    } catch (error: unknown) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown product error',
      })
    }
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Lifecycle union</p>
      <h3>Make UI states mutually exclusive</h3>
      <div className="practice-actions">
        <button type="button" onClick={() => runScenario('success')}>Success</button>
        <button type="button" onClick={() => runScenario('empty')}>Empty</button>
        <button type="button" onClick={() => runScenario('error')}>Error</button>
      </div>
      <p>Status: {state.status}</p>
      {state.status === 'success' && <p>{state.products.join(', ')}</p>}
      {state.status === 'error' && <p className="status-error">{state.message}</p>}
    </article>
  )
}
```
</div>

**代码逐行解释：**

`Scenario` 控制 mock outcome；`AsyncProductsState` 把 payload 限制在对应 member。Handler 先 pending，再按 Promise outcome 创建 exactly one terminal object。JSX discriminant checks同步 narrowing。

**执行过程：**

点击 Empty 后，pending snapshot 先显示；Promise fulfilled `[]`，length check queue empty member。它不是 error，因为 transport/operation 成功完成。

**变量、引用与 async state 变化：**

Promise result array 是新 reference；success state 保存该 array，empty state不需要保存第二份“isEmpty”。旧 member object 不会被 mutation。

**为什么得到这个结果：**

UI branch 直接由单个 discriminant 决定，因此 loading 与 error 不可能同时来自同一 state object。

**对比写法：**

`isLoading=true; hasError=true` 在 TypeScript 中完全合法；多个 booleans 没有表达互斥约束。

**常见错误违反的规则：**

把 empty 当 error 混淆“请求成功但 collection 为 0”与“请求未获得可信结果”。具体 bug 是 BuyerOrdersPage 无订单时显示红色错误。

**如何识别类似错误：**

如果 JSX 需要组合多个 `&&` 并手工排除 branch，或多个 setters 总连续调用，考虑 discriminated union/reducer。

**与 SellerHub 的关系：**

BuyerOrdersPage、SellerOrdersPage 与 AdminProductsPage 都需要 pending/empty/error/success 的互斥模型。

**与当前 React 学习主线的关系：**

本节复用第 5 章 conditional rendering，并应用第 8 章“让 impossible state 难以表达”。

**本节最终记忆模型：**

Async lifecycle 是一台状态机，不是一组可任意组合的 booleans。

### 9.3 HTTP status、network error 与 JSON boundary

**本节解决的问题：**

`fetch` Promise fulfilled 并不等于业务成功：404 仍产生 Response。即使 200，`response.json()` 也只解析 body，不证明 domain shape。

**技术意义：**

Network、HTTP、body parse 与 runtime validation 是四个不同 failure boundaries，必须分别判断。

**新关键字和新概念：**

`Response`、`ok`、`status`、network rejection、JSON parse、`unknown` body。

**七层边界：**

JavaScript 处理 Promise/throw/catch；React 保存 HttpState；browser 提供 Response/`json()`；HTTP 定义 200/404；TypeScript 只检查 annotation；tooling 提供 DOM types；architecture 选择 error message 与 retry policy。

**底层机制：**

练习用 `new Response` 稳定模拟 200/404，用 rejected TypeError 模拟 network failure。Await Response 后必须先查 `ok`；body 被显式赋给 `unknown`，留给 9.8 guard。

**API / 语法规则：**

真实 `fetch(input, init?)` 返回 `Promise<Response>`。它通常只在 network/request failure 时 reject；HTTP 404/500 需要 `response.ok` 或 `status` 检查。`json()` 返回另一个 Promise。

**固定属性名 / 方法名 / 参数签名：**

固定 properties 是 `response.ok`、`response.status`；固定 method 是 `response.json()`；`Response.ok` 对 200–299 为 true。

**机制证据链：**

1. Trigger 是 200、404 或 Network error button。
2. JS 创建 request Promise；network mode 创建 TypeError；HTTP modes 创建 Response object。
3. React 先 queue pending，之后保存 parsed body 或 error message。
4. 404 path Promise fulfilled，但 `Response.ok=false/status=404`；network path Promise rejected；200 body parse fulfilled object。
5. TypeScript 接受 `body: unknown`，不会证明 object 有 id/name。
6. Only 200 enters success；404 与 network 都进 error，但原因不同。
7. 只写 `await response.json()` 会把 404 error body 当正常 data。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/03-http-error-boundary/http-response-boundary.tsx</span></div>

```tsx
import { useState } from 'react'

type ResponseMode = 'success' | 'not-found' | 'network-error'

type HttpState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; body: unknown }
  | { status: 'error'; message: string }

async function requestResponse(mode: ResponseMode): Promise<Response> {
  await new Promise((resolve) => window.setTimeout(resolve, 350))

  if (mode === 'network-error') {
    throw new TypeError('Network connection failed')
  }

  if (mode === 'not-found') {
    return new Response(JSON.stringify({ message: 'Product not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ id: 'sku-301', name: 'Desk Lamp' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function HttpResponseBoundary() {
  const [state, setState] = useState<HttpState>({ status: 'idle' })

  async function handleRequest(mode: ResponseMode) {
    setState({ status: 'pending' })

    try {
      const response = await requestResponse(mode)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const body: unknown = await response.json()
      setState({ status: 'success', body })
    } catch (error: unknown) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown request error',
      })
    }
  }

  return (
    <article className="practice-card">
      <p className="practice-label">HTTP boundary</p>
      <h3>Separate rejected fetch from non-2xx status</h3>
      <div className="practice-actions">
        <button type="button" onClick={() => handleRequest('success')}>200</button>
        <button type="button" onClick={() => handleRequest('not-found')}>404</button>
        <button type="button" onClick={() => handleRequest('network-error')}>Network error</button>
      </div>
      <p>
        {state.status === 'idle' && 'Choose a response.'}
        {state.status === 'pending' && 'Waiting for response...'}
        {state.status === 'success' && JSON.stringify(state.body)}
        {state.status === 'error' && state.message}
      </p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

Mock request 明确生成三种 browser-level outcomes。Handler 不把 fulfilled Response直接等同 success，而先检查 HTTP status，再解析 body 为 untrusted value。

**执行过程：**

404 button 产生 fulfilled Response；`!response.ok` 主动 throw Error，catch queue error state。Network button 则在取得 Response 前已 reject。

**变量、引用与 async state 变化：**

Response 是 browser object；`body` 是解析后 JavaScript value；error object 由 network mock 或 status check 创建。React 不保存 Response，只保存最终 body/message。

**为什么得到这个结果：**

Fetch 的 transport Promise 表示“是否取得 response”，HTTP status 表示“server 如何回应”，两者不是同一事实。

**对比写法：**

`const products = (await response.json()) as Product[]` 同时跳过 status 与 runtime shape，静态断言不会生成 validator。

**常见错误违反的规则：**

只 catch network error 会把 404/500 当 success。具体 bug 是 ProductDetailPage 对 404 body 读取不存在的 product fields。

**如何识别类似错误：**

查找每个 `fetch`：是否检查 `ok/status`，是否处理 JSON parse，是否在进入 domain state 前验证 shape。

**与 SellerHub 的关系：**

ProductDetailPage 必须区分 404 not-found、503 error、invalid body 与正常 product；这些 UI 不应共享一个 generic failure。

**与当前 React 学习主线的关系：**

本节把第 7 章 external system boundary 扩展为 browser、HTTP、JSON 和 domain 四层。

**本节最终记忆模型：**

Promise fulfilled、Response ok、JSON parsed、domain valid 是四个连续但独立的 checkpoints。

### 9.4 Event handler 驱动的 explicit request

**本节解决的问题：**

用户可以连续编辑 draft query，但业务要求点击确认才 request。若 Effect 监听 draft，每次 keystroke 都会发请求。

**技术意义：**

Event handler 知道具体 intent 是“Search clicked”，因此 request 属于 event-specific logic；`draftQuery` 与 `submittedQuery` 分离 request criteria。

**新关键字和新概念：**

explicit request、draft criteria、submitted criteria、event-specific logic。本节没有新 API，重点是 async data lifecycle 和架构边界。

**七层边界：**

Browser 产生 input/click events；JS handler 读取 draft、创建 Promise；React 保存 draft/submitted/lifecycle；HTTP 被 mock；TypeScript 检查 criteria/result；tooling 检查 async code；architecture 让 click 成为 request trigger。

**底层机制：**

Typing 只更新 draft Hook cell。Click closure 捕获该 render 的 draft string，trim 后同时 queue submitted criteria 与 pending state，再 await search Promise。

**API / 语法规则：**

`async` event handler 可以 await；React 不等待 handler Promise，也不会从其 return value渲染 UI。必须显式 queue state。

**固定属性名 / 方法名 / 参数签名：**

DOM button 固定 prop `onClick`；input 使用 `value/onChange`；search function 为 `(query: string) => Promise<string[]>`。

**机制证据链：**

1. Search button click 触发 request，typing 不触发。
2. JS 创建 `nextQuery`、Promise、filter callback 与 result array。
3. React queue `submittedQuery` 与 pending member，保留 previous products 作为 stale display policy。
4. Mock Promise fulfilled array；真实 HTTP 尚未参与。
5. TypeScript 检查 string/array，runtime service response 仍需 guard。
6. Pending UI 来自 explicit transition；length 0 进入 empty，否则 success。
7. 把 request 放入 draft Effect 会产生 keystroke request storm 与 rate-limit risk。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/04-event-driven-fetch/event-driven-product-search.tsx</span></div>

```tsx
import { useState } from 'react'

type SearchState =
  | { status: 'idle'; products: string[] }
  | { status: 'pending'; products: string[] }
  | { status: 'success'; products: string[] }
  | { status: 'empty'; products: string[] }
  | { status: 'error'; products: string[]; message: string }

const productNames = ['Desk Lamp', 'Monitor Stand', 'Mechanical Keyboard', 'Wireless Mouse']

function searchProducts(query: string): Promise<string[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(productNames.filter((name) => name.toLowerCase().includes(query.toLowerCase())))
    }, 500)
  })
}

export function EventDrivenProductSearch() {
  const [draftQuery, setDraftQuery] = useState('desk')
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null)
  const [state, setState] = useState<SearchState>({ status: 'idle', products: [] })

  async function handleSearch() {
    const nextQuery = draftQuery.trim()
    setSubmittedQuery(nextQuery)
    setState((current) => ({ status: 'pending', products: current.products }))

    try {
      const products = await searchProducts(nextQuery)
      setState(
        products.length === 0
          ? { status: 'empty', products: [] }
          : { status: 'success', products },
      )
    } catch (error: unknown) {
      setState((current) => ({
        status: 'error',
        products: current.products,
        message: error instanceof Error ? error.message : 'Unknown search error',
      }))
    }
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Event-driven request</p>
      <h3>Search only after explicit confirmation</h3>
      <label>
        Draft query
        <input value={draftQuery} onChange={(event) => setDraftQuery(event.currentTarget.value)} />
      </label>
      <button type="button" onClick={handleSearch} disabled={state.status === 'pending'}>
        Search products
      </button>
      <p>Submitted query: {submittedQuery ?? 'none'}</p>
      <p>
        {state.status === 'pending' ? 'Searching...' : `${state.products.length} products`}
      </p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

Draft 与 submitted criteria 是不同事实；handler 在 click 时冻结本次 request criteria。Pending/error 保留 old products，表示 stale-while-refresh 的最小策略。

**执行过程：**

Typing `mouse` 只 render input；点击后 submitted 变 `mouse`、status pending；500ms 后 filter result进入 success。

**变量、引用与 async state 变化：**

`nextQuery` 是 click invocation 的 local binding；即使等待期间 draft 又变化，当前 Promise 仍使用 submitted string。Result array 是新 reference。

**为什么得到这个结果：**

Request trigger 与具体 click 绑定，Effect 不需要猜测哪个 state change 代表用户确认。

**对比写法：**

`useEffect(() => searchProducts(draftQuery), [draftQuery])` 表示“每个 committed draft 都必须同步”，语义与 explicit submit 不同。

**常见错误违反的规则：**

把 event-specific retry/search 放 Effect 会让无关 re-render/dependency change 间接触发 request。

**如何识别类似错误：**

如果 request 原因能明确说成“用户点击了 X”，优先查看该 event handler，而不是新建 `shouldFetch` boolean Effect。

**与 SellerHub 的关系：**

ProductListPage 的 explicit search、Retry button 与 manual refresh 都属于 event-driven intent。

**与当前 React 学习主线的关系：**

本节复用第 6 章 form submit 与第 7 章 event/effect distinction。

**本节最终记忆模型：**

Draft 可以频繁变化；只有 confirmed criteria 触发 explicit request。

### 9.5 Effect 与 committed request criteria

**本节解决的问题：**

当 UI 的语义是“只要 committed category 是 X，结果就必须与 X 同步”，request 应由 Effect 对 criteria 重新同步。

**技术意义：**

Effect 不响应抽象“mount”，而响应 committed render snapshot 中读取的 reactive criteria。Dependency array 必须包含 `category`。

**新关键字和新概念：**

committed criteria、reactive Effect、dependency honesty、cleanup ignore。

**七层边界：**

JS 创建 Effect closure/Promise；React commit category 后运行 setup、变化前 cleanup；browser timer模拟外部工作；HTTP 未参与；TS 检查 category map；linter检查 dependency；architecture 决定 criteria-state owner。

**底层机制：**

Select handler queue new category 和 pending。React commit 新 select value 后，先 cleanup previous Effect，把 old closure 的 `ignore=true`，再运行 new setup并请求 current category。

**API / 语法规则：**

`useEffect(setup, dependencies)` 在 commit 后运行。Setup 返回 cleanup；所有读取的 reactive values 必须出现在 dependencies。

**固定属性名 / 方法名 / 参数签名：**

固定 API `useEffect`；dependency inline array `[category]`；cleanup signature `() => void`。

**机制证据链：**

1. Category select event queue committed criteria。
2. JS 为该 render 创建 Effect closure、ignore binding 和 request Promise。
3. React commit category，cleanup old setup，再运行 new setup；state pending已由 event queue 保存。
4. Mock Promise fulfilled category array。
5. TS限制 Category keys；linter验证 closure 读取 category 与 dependency一致。
6. New completion根据 length进入 success/empty；old completion读取 own `ignore=true` 后不写 state。
7. 写 `[]` 会让 Effect 永远使用 initial category，UI criteria 与 results 分叉。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/05-effect-driven-fetch/effect-driven-product-query.tsx</span></div>

```tsx
import { useEffect, useState } from 'react'

type Category = 'lighting' | 'office' | 'audio'

type CategoryState =
  | { status: 'pending'; products: string[] }
  | { status: 'success'; products: string[] }
  | { status: 'empty'; products: string[] }
  | { status: 'error'; products: string[]; message: string }

const categoryProducts: Record<Category, string[]> = {
  lighting: ['Desk Lamp', 'Floor Lamp'],
  office: ['Monitor Stand', 'Mechanical Keyboard'],
  audio: [],
}

function loadCategoryProducts(category: Category): Promise<string[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(categoryProducts[category]), 500)
  })
}

export function EffectDrivenProductQuery() {
  const [category, setCategory] = useState<Category>('lighting')
  const [state, setState] = useState<CategoryState>({ status: 'pending', products: [] })

  useEffect(() => {
    let ignore = false

    loadCategoryProducts(category)
      .then((products) => {
        if (ignore) return
        setState(
          products.length === 0
            ? { status: 'empty', products: [] }
            : { status: 'success', products },
        )
      })
      .catch((error: unknown) => {
        if (ignore) return
        setState((current) => ({
          status: 'error',
          products: current.products,
          message: error instanceof Error ? error.message : 'Unknown category error',
        }))
      })

    return () => {
      ignore = true
    }
  }, [category])

  function handleCategoryChange(nextCategory: Category) {
    setCategory(nextCategory)
    setState((current) => ({ status: 'pending', products: current.products }))
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Effect-driven request</p>
      <h3>Synchronize results with committed criteria</h3>
      <label>
        Category
        <select
          value={category}
          onChange={(event) => handleCategoryChange(event.currentTarget.value as Category)}
        >
          <option value="lighting">Lighting</option>
          <option value="office">Office</option>
          <option value="audio">Audio</option>
        </select>
      </label>
      <p>Status: {state.status}</p>
      <p>{state.products.join(', ') || 'No products'}</p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

Module map 模拟 remote dataset；Effect 每个 setup 有独立 `ignore` binding。Handler 负责表达 category intent 和 pending，Effect 只同步 committed category。

**执行过程：**

从 lighting 切换 office：event updates queue；commit office；old cleanup 标记 ignore；new setup request office；result完成后 queue success。

**变量、引用与 async state 变化：**

每个 render 的 category binding、Effect closure 与 ignore variable 独立。Old Promise不会取消，但 old continuation 被 ignore gate阻止。

**为什么得到这个结果：**

Effect setup 与 committed criteria snapshot一一对应，cleanup关闭旧 snapshot的写入权限。

**对比写法：**

Dependency `[]` 只同步 initial lighting；省略 cleanup 则旧 lighting result可能覆盖 office。

**常见错误违反的规则：**

Effect 读取 category 却写空 dependency，违反 reactive dependency必须诚实声明。

**如何识别类似错误：**

检查 request URL/body/criteria 在 Effect 中读取的所有 props/state，并逐项对照 dependency array。

**与 SellerHub 的关系：**

ProductDetailPage 的 committed `productId`、SellerOrdersPage 的 route/filter criteria 可驱动 synchronization。

**与当前 React 学习主线的关系：**

本节直接应用第 7 章 Effect setup/cleanup/dependency 到 data lifecycle。

**本节最终记忆模型：**

Effect fetch 是“让 external result 与 committed criteria同步”，不是所有 fetch 的默认容器。

### 9.6 AbortController 与 obsolete result cleanup

**本节解决的问题：**

Ignore 可以阻止旧 result 写 state，却仍让底层工作继续。AbortController 还能向支持 signal 的 operation 请求取消。

**技术意义：**

Cleanup 同时要考虑 resource work 与 state write permission。Abort 是 browser capability；React 只负责调用 cleanup。

**新关键字和新概念：**

`AbortController`、`AbortSignal`、`abort()`、`AbortError`、obsolete work。

**七层边界：**

JS Promise 注册 abort listener；React Effect cleanup 调用 controller；browser提供 controller/signal/DOMException；真实 fetch会消费 signal；TS提供 DOM types；tooling检查 dependency；architecture决定是否 cancel 或 ignore。

**底层机制：**

每个 Effect setup 创建 controller。Channel变化前 cleanup调用 abort；mock 清除 timer并 reject AbortError。Catch识别 AbortError并不进入 error UI。

**API / 语法规则：**

`const controller = new AbortController()`；将 `controller.signal` 传给 operation；cleanup 调用 `controller.abort()`。

**固定属性名 / 方法名 / 参数签名：**

`AbortController.signal`、`abort()`、`signal.addEventListener('abort', ...)`；fetch真实用法是 `fetch(url, { signal })`。

**机制证据链：**

1. Channel event改变 committed criteria。
2. JS创建 controller、signal、Promise、timer和abort listener。
3. React保存 pending snapshot，并在下一次 setup前执行旧 cleanup。
4. Browser abort signal触发；mock Promise rejected DOMException AbortError。
5. TS检查 AbortSignal参数，runtime仍需按 error.name识别 abort。
6. Current request fulfilled进入 success；aborted old request不进入 error。
7. 只 clear timeout但异步链还有其他 completion时，旧 continuation仍可能写 state。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/06-abort-obsolete-result/abort-obsolete-request.tsx</span></div>

```tsx
import { useEffect, useState } from 'react'

type InventoryChannel = 'warehouse' | 'storefront'

type InventoryState =
  | { status: 'pending'; quantity: number | null }
  | { status: 'success'; quantity: number }
  | { status: 'error'; quantity: number | null; message: string }

function loadInventory(channel: InventoryChannel, signal: AbortSignal): Promise<number> {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(
      () => resolve(channel === 'warehouse' ? 42 : 11),
      channel === 'warehouse' ? 900 : 300,
    )

    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId)
        reject(new DOMException('Inventory request aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}

export function AbortObsoleteRequest() {
  const [channel, setChannel] = useState<InventoryChannel>('warehouse')
  const [state, setState] = useState<InventoryState>({ status: 'pending', quantity: null })

  useEffect(() => {
    const controller = new AbortController()

    loadInventory(channel, controller.signal)
      .then((quantity) => setState({ status: 'success', quantity }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState((current) => ({
          status: 'error',
          quantity: current.quantity,
          message: error instanceof Error ? error.message : 'Unknown inventory error',
        }))
      })

    return () => controller.abort()
  }, [channel])

  function handleChannelChange(nextChannel: InventoryChannel) {
    setChannel(nextChannel)
    setState((current) => ({ status: 'pending', quantity: current.quantity }))
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Abort obsolete request</p>
      <h3>Cancel work for the previous criteria</h3>
      <div className="practice-actions">
        <button type="button" onClick={() => handleChannelChange('warehouse')}>Warehouse</button>
        <button type="button" onClick={() => handleChannelChange('storefront')}>Storefront</button>
      </div>
      <p>Channel: {channel}</p>
      <p>{state.status === 'pending' ? 'Loading inventory...' : `Quantity: ${state.quantity ?? 0}`}</p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

Loader把 cancellation contract暴露为 AbortSignal。Effect拥有 controller；cleanup取消该 setup的工作。AbortError被视为预期控制流，不污染 error UI。

**执行过程：**

Warehouse request尚未完成时点击 Storefront；warehouse cleanup abort并reject；storefront新 request 300ms 后 success。

**变量、引用与 async state 变化：**

每个 setup有独立 controller/signal/Promise。Pending state保留 previous quantity，明确 stale data policy。

**为什么得到这个结果：**

旧 operation被 browser signal终止，catch又排除 AbortError，所以只有 current criteria completion有写入机会。

**对比写法：**

只在 cleanup `clearTimeout` 仅适用于这个 timer；真实 fetch还应传 signal，并可同时保留 ignore防止不可取消后续链写入。

**常见错误违反的规则：**

把 AbortError显示为失败会在正常 criteria切换时闪烁错误；不 cleanup会让 unmount/criteria change 后继续更新。

**如何识别类似错误：**

检查每个 Effect-started operation是否有对称 cleanup，以及 operation是否真正消费 signal。

**与 SellerHub 的关系：**

SellerOrders status快速切换、ProductDetail productId变化都应取消 obsolete request或至少 ignore result。

**与当前 React 学习主线的关系：**

本节深化第 7 章 async cleanup，将 ref/effect原则应用到 request resource。

**本节最终记忆模型：**

Cleanup不只是“组件卸载处理”，而是撤销上一份 criteria snapshot拥有的 external work。

### 9.7 Race condition 与 stale result

**本节解决的问题：**

Pending request耗时850ms，shipped只需250ms。快速切换时，旧 pending可能最后到达并覆盖 current shipped UI。

**技术意义：**

Request start order不保证 completion order。正确性必须由 current criteria ownership保证，不能依赖“通常先发先到”。

**新关键字和新概念：**

race condition、late completion、stale result、ignore flag。本节没有新 API，重点是 async data lifecycle 和架构边界。

**七层边界：**

JS创建两个Promise/closures；React创建两个Effect setup/cleanup epochs；browser timers乱序完成；HTTP可能同样乱序；TS无法证明时序；linter只检查dependency；architecture定义current request写权限。

**底层机制：**

每个 setup有独立 `ignore` binding。Criteria变化时old cleanup只修改old binding。Old Promise仍fulfilled，但它的then closure读取true后跳过setState。

**API / 语法规则：**

Ignore是JavaScript closure pattern，不是React API。Cleanup必须修改与该 setup completion closure共享的binding。

**固定属性名 / 方法名 / 参数签名：**

`ignore`可改名；关键是setup-local mutable binding。`loadOrders(status): Promise<string[]>` 将criteria冻结为argument。

**机制证据链：**

1. Pending后立即点击Shipped，启动两个request epochs。
2. JS创建两个Promise、两个timer、两个then closures与两个ignore bindings。
3. React cleanup pending epoch，commit shipped snapshot并运行new setup。
4. Shipped先fulfilled写success；pending后fulfilled但被old ignore阻止。
5. TS只检查status/result types，不理解哪个Promise应获写权限。
6. UI最终保持shipped result，因为只有current epoch可queue update。
7. 无ignore时850ms old result最后写入，criteria显示shipped但orders是pending。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/07-race-condition/race-condition-protection.tsx</span></div>

```tsx
import { useEffect, useState } from 'react'

type OrderStatus = 'pending' | 'shipped'

type OrdersState =
  | { status: 'pending'; orders: string[] }
  | { status: 'success'; orders: string[] }

function loadOrders(status: OrderStatus): Promise<string[]> {
  return new Promise((resolve) => {
    window.setTimeout(
      () => resolve(status === 'pending' ? ['ORD-701', 'ORD-702'] : ['ORD-703']),
      status === 'pending' ? 850 : 250,
    )
  })
}

export function RaceConditionProtection() {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('pending')
  const [state, setState] = useState<OrdersState>({ status: 'pending', orders: [] })

  useEffect(() => {
    let ignore = false

    loadOrders(orderStatus).then((orders) => {
      if (!ignore) {
        setState({ status: 'success', orders })
      }
    })

    return () => {
      ignore = true
    }
  }, [orderStatus])

  function handleStatusChange(nextStatus: OrderStatus) {
    setOrderStatus(nextStatus)
    setState((current) => ({ status: 'pending', orders: current.orders }))
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Race protection</p>
      <h3>Ignore a late result from old criteria</h3>
      <div className="practice-actions">
        <button type="button" onClick={() => handleStatusChange('pending')}>Pending</button>
        <button type="button" onClick={() => handleStatusChange('shipped')}>Shipped</button>
      </div>
      <p>Criteria: {orderStatus}</p>
      <p>{state.status === 'pending' ? 'Refreshing orders...' : state.orders.join(', ')}</p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

Different delays故意制造逆序。Effect closure capture每次render的orderStatus；cleanup只关闭对应completion。Handler保留old orders作为stale content。

**执行过程：**

Pending setup开始；Shipped click触发pending cleanup与shipped setup；shipped 250ms写入；old pending 850ms到达但不更新。

**变量、引用与 async state 变化：**

两个result arrays都真实创建。Old array未进入React state；current array成为new state reference。Criteria与data保持匹配。

**为什么得到这个结果：**

正确性来自epoch write permission，而不是Promise settlement order。

**对比写法：**

用一个component-level boolean会被new setup重新改false，无法区分epochs；必须setup-local closure或request id/controller。

**常见错误违反的规则：**

“最后完成者获胜”违反current criteria应拥有data的架构规则。

**如何识别类似错误：**

DevTools throttle网络并快速切换filters；若label与list不匹配，就是race symptom。

**与 SellerHub 的关系：**

SellerOrdersPage状态筛选和ProductDetailPage快速切换id最容易出现late result覆盖。

**与当前 React 学习主线的关系：**

本节把第7章stale closure从“读旧值”扩展为“旧async process写新UI”。

**本节最终记忆模型：**

每次request都有epoch；只有current epoch可以提交结果。

### 9.8 `unknown` response 与 runtime type guard

**本节解决的问题：**

`as Product[]`只让compiler相信，不检查runtime object。Invalid body可在render时产生`price.toFixed is not a function`。

**技术意义：**

External body应先进入`unknown` boundary，再由guard验证每个必要field，只有narrowed data才能进入trusted domain state。

**新关键字和新概念：**

`unknown`、type predicate、runtime guard、record check、domain boundary。

**七层边界：**

JS运行`typeof`/Array.isArray/every；React保存guard后的state；browser/HTTP body在mock中省略；TS根据`value is Product[]` narrowing；tooling检查unsafe access；architecture指定validation发生在state owner之前。

**底层机制：**

Guard先确认array，再对每个element检查non-null object与id/name/price primitives。False path进入error；true path让TypeScript在该branch把body narrowing为Product[]。

**API / 语法规则：**

`unknown`不可直接property access。Type predicate syntax是`value is Product[]`；runtime implementation必须真正返回boolean check。

**固定属性名 / 方法名 / 参数签名：**

`Array.isArray(value)`、`array.every(predicate)`；guard签名`(value: unknown) => value is Product[]`。

**机制证据链：**

1. Valid/Invalid button触发unknown response。
2. JS创建array/object；guard创建candidate reference并逐field检查。
3. React pending后只保存validated products或error message。
4. Mock Promise fulfilled不代表body可信；真实`response.json()`同样只完成parse。
5. TS在guard true branch narrowing；emit后predicate type消失，checks仍作为JS执行。
6. Valid进入success；invalid进入error而不是render crash。
7. Direct assertion会跳过checks，让错误延迟到深层UI。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/08-runtime-type-guard/unknown-response-guard.tsx</span></div>

```tsx
import { useState } from 'react'

type Product = {
  id: string
  name: string
  price: number
}

type GuardState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; products: Product[] }
  | { status: 'error'; message: string }

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.price === 'number'
  )
}

function isProductArray(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct)
}

function loadUnknownResponse(valid: boolean): Promise<unknown> {
  return Promise.resolve(
    valid
      ? [{ id: 'sku-801', name: 'USB-C Hub', price: 59 }]
      : [{ id: 801, title: 'Invalid product' }],
  )
}

export function UnknownResponseGuard() {
  const [state, setState] = useState<GuardState>({ status: 'idle' })

  async function handleLoad(valid: boolean) {
    setState({ status: 'pending' })
    const body = await loadUnknownResponse(valid)

    if (!isProductArray(body)) {
      setState({ status: 'error', message: 'Response did not match Product[]' })
      return
    }

    setState({ status: 'success', products: body })
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Unknown boundary</p>
      <h3>Narrow runtime data before domain use</h3>
      <div className="practice-actions">
        <button type="button" onClick={() => handleLoad(true)}>Valid response</button>
        <button type="button" onClick={() => handleLoad(false)}>Invalid response</button>
      </div>
      <p>
        {state.status === 'idle' && 'Choose a response shape.'}
        {state.status === 'pending' && 'Parsing response...'}
        {state.status === 'success' && `${state.products.length} valid product`}
        {state.status === 'error' && state.message}
      </p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

Inner guard检查单个Product；outer guard检查array和every。Only true branch将body放入success state。

**执行过程：**

Invalid Promise正常fulfilled；guard发现id不是string、name/price缺失，queue error。没有异常等到render才爆发。

**变量、引用与 async state 变化：**

`candidate`只是同一runtime object的temporary typed view；它不clone data。Validated array reference直接进入state。

**为什么得到这个结果：**

Runtime JS checks实际执行；TypeScript narrowing只是根据这些checks允许后续访问。

**对比写法：**

`const products = body as Product[]`生成零runtime checks，invalid body原样通过。

**常见错误违反的规则：**

把annotation/assertion当validator混淆compile time与runtime。

**如何识别类似错误：**

搜索`response.json() as`、generic `fetchJson<T>`直接return T而无parser，这些是trust boundary漏洞。

**与 SellerHub 的关系：**

AdminProductsPage、auth bootstrap与orders response都必须在外部boundary验证，再交给typed components。

**与当前 React 学习主线的关系：**

本节深化前几章“TypeScript类型擦除”，并为最终项目parser file建立依据。

**本节最终记忆模型：**

`unknown`阻止盲信；guard用真实JavaScript checks换取可信domain type。

### 9.9 `useReducer` 管理 async lifecycle

**本节解决的问题：**

多个handlers分别操作status/orders/error容易漏transition。Reducer集中“started/succeeded/failed如何改变state”，但不执行request。

**技术意义：**

Action描述external process发生了什么；pure reducer从current async state计算next state，保留stale orders policy。

**新关键字和新概念：**

async reducer、lifecycle action、stale-data retention、pure transition。

**七层边界：**

JS request Promise与reducer function分离；React reducer Hook保存state/queue；browser timer模拟request；HTTP未参与；TS检查action union；tooling检查Hook；architecture禁止reducer side effects。

**底层机制：**

Event handler先dispatch started，request settlement再dispatch succeeded/failed。React处理action queue时调用pure reducer；current handler snapshot不被dispatch同步修改。

**API / 语法规则：**

`useReducer(reducer, initialState)`返回state/dispatch。Reducer签名`(state, action) => nextState`，不能async、不能fetch、不能mutation。

**固定属性名 / 方法名 / 参数签名：**

Action discriminant为本地`type`；dispatch只接收`AsyncOrdersAction`；request function单独返回`Promise<string[]>`。

**机制证据链：**

1. Load/Fail button触发handler。
2. JS创建action objects、Promise、result array或Error。
3. React reducer queue依次处理started与terminal action，保存new state object。
4. Mock Promise fulfilled/rejected；真实HTTP检查应在dispatch success前完成。
5. TS绑定action type与payload，runtime仍是plain objects。
6. Started进入pending；success array length决定后续UI；failure保留old orders并加message。
7. Reducer内fetch会破坏purity，Strict Mode重复计算可能重复request。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/09-async-reducer/async-lifecycle-reducer.tsx</span></div>

```tsx
import { useReducer } from 'react'

type AsyncOrdersState =
  | { status: 'idle'; orders: string[] }
  | { status: 'pending'; orders: string[] }
  | { status: 'success'; orders: string[] }
  | { status: 'empty'; orders: string[] }
  | { status: 'error'; orders: string[]; message: string }

type AsyncOrdersAction =
  | { type: 'request_started' }
  | { type: 'request_succeeded'; orders: string[] }
  | { type: 'request_failed'; message: string }

function ordersReducer(state: AsyncOrdersState, action: AsyncOrdersAction): AsyncOrdersState {
  switch (action.type) {
    case 'request_started':
      return { status: 'pending', orders: state.orders }
    case 'request_succeeded':
      return action.orders.length === 0
        ? { status: 'empty', orders: [] }
        : { status: 'success', orders: action.orders }
    case 'request_failed':
      return { status: 'error', orders: state.orders, message: action.message }
  }
}

function requestOrders(shouldFail: boolean): Promise<string[]> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Order request failed'))
        return
      }
      resolve(['ORD-901', 'ORD-902'])
    }, 450)
  })
}

export function AsyncLifecycleReducer() {
  const [state, dispatch] = useReducer(ordersReducer, { status: 'idle', orders: [] })

  async function handleRequest(shouldFail: boolean) {
    dispatch({ type: 'request_started' })

    try {
      const orders = await requestOrders(shouldFail)
      dispatch({ type: 'request_succeeded', orders })
    } catch (error: unknown) {
      dispatch({
        type: 'request_failed',
        message: error instanceof Error ? error.message : 'Unknown order error',
      })
    }
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Async reducer</p>
      <h3>Centralize lifecycle transitions</h3>
      <div className="practice-actions">
        <button type="button" onClick={() => handleRequest(false)}>Load orders</button>
        <button type="button" onClick={() => handleRequest(true)}>Fail request</button>
      </div>
      <p>Status: {state.status}</p>
      <p>{state.orders.join(', ') || 'No retained orders'}</p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

Union定义legal states/actions；reducer只return objects。Async handler拥有request side effect，并把outcome翻译成action。

**执行过程：**

Load click dispatch pending；450ms fulfilled后dispatch success；React下一次render显示orders。Fail则dispatch error并保留previous orders。

**变量、引用与 async state 变化：**

每个action/new state都是新object。Dispatch identity稳定；旧state snapshot不mutation。Promise不存入reducer state。

**为什么得到这个结果：**

Reducer统一所有transition，因此error path不会忘记撤销pending或错误清空可信stale data。

**对比写法：**

在reducer中`await requestOrders()`既违反pure function，也让reducer无法同步返回next state。

**常见错误违反的规则：**

Reducer执行fetch/timer/localStorage违反“state transition calculation无副作用”。

**如何识别类似错误：**

Reducer应主要包含switch、calculation、map/filter/spread与return；出现Promise/browser API即越界。

**与 SellerHub 的关系：**

SellerOrders/BuyerOrders复杂lifecycle适合reducer；单个local pending flag未必需要。

**与当前 React 学习主线的关系：**

本节把第8章pure reducer用于第9章async outcomes，但request ownership仍在reducer外。

**本节最终记忆模型：**

Async handler做外部工作；action报告结果；reducer只计算UI state。

### 9.10 Fetched source data 与 derived visible data

**本节解决的问题：**

保存`orders`后再把`visibleOrders`保存为state会产生第二份source；filter或orders任一变化都要同步更新它。

**技术意义：**

Fetched orders是source data；status filter是local criteria；visible list/count/total均应在current render中派生。

**新关键字和新概念：**

fetched source data、derived visible data、client-side filter、redundant state。本节没有新 API，重点是 async data lifecycle 和架构边界。

**七层边界：**

JS执行filter/reduce；React只保存orders/filter Hook cells；browser/HTTP在load button mock之外无参与；TS检查Order shape；tooling检查array methods；architecture坚持single source。

**底层机制：**

每次component调用都从current orders与statusFilter创建new visible array和number total。Setter只更新source facts，derived bindings不拥有queue。

**API / 语法规则：**

`filter`返回new array，`reduce`返回number；普通derived calculation不需要Effect或memo作为正确性条件。

**固定属性名 / 方法名 / 参数签名：**

`Array.prototype.filter(predicate)`、`reduce(callback, initialValue)`；Order status由literal union约束。

**机制证据链：**

1. Load button或filter select触发source update。
2. JS在new render创建visible array和reduce accumulator。
3. React保存orders/filter snapshots，不保存visible list/count/total。
4. Mock fetchedOrders进入state；无新HTTP operation。
5. TS检查order.status/total，runtime data可信性应在更早guard完成。
6. UI永远由同一snapshot派生count/total。
7. Duplicate visible state会在filter变化时保留旧list，产生count/list不一致。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/10-derived-fetched-data/derived-order-summary.tsx</span></div>

```tsx
import { useState } from 'react'

type OrderStatus = 'pending' | 'shipped'

type Order = {
  id: string
  status: OrderStatus
  total: number
}

const fetchedOrders: Order[] = [
  { id: 'ORD-1001', status: 'pending', total: 129 },
  { id: 'ORD-1002', status: 'shipped', total: 84 },
  { id: 'ORD-1003', status: 'pending', total: 215 },
]

export function DerivedOrderSummary() {
  const [orders, setOrders] = useState<Order[]>([])
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all')
  const visibleOrders = orders.filter(
    (order) => statusFilter === 'all' || order.status === statusFilter,
  )
  const visibleTotal = visibleOrders.reduce((total, order) => total + order.total, 0)

  return (
    <article className="practice-card">
      <p className="practice-label">Derived fetched data</p>
      <h3>Keep filtered results out of state</h3>
      <button type="button" onClick={() => setOrders(fetchedOrders)}>Load fetched orders</button>
      <label>
        Status filter
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.currentTarget.value as 'all' | OrderStatus)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
        </select>
      </label>
      <p>{visibleOrders.length} visible orders · ${visibleTotal.toFixed(2)}</p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

Orders与filter是唯一state；visible array/total在function body计算。Module mock代表已通过validation的fetched domain data。

**执行过程：**

Load后orders reference更新并render 3条；选择pending只更新filter，new render派生2条和$344。

**变量、引用与 async state 变化：**

Filter每次返回new array，但没有持久state identity。Orders array保持source reference直到下次fetch transition。

**为什么得到这个结果：**

所有display values读取同一render的orders/filter snapshots，不需要第二次effect同步。

**对比写法：**

`useEffect(() => setVisibleOrders(orders.filter(...)), [orders, filter])`会先render stale list再额外render derived state。

**常见错误违反的规则：**

把可计算值保存state违反minimal state，具体bug是new fetch后visible list仍指向old array。

**如何识别类似错误：**

某setter只在另一个state变化后调用，且其值可由当前state计算，通常是redundant state。

**与 SellerHub 的关系：**

ProductList visible products、orders count/revenue与admin audit count都应从trusted fetched source派生。

**与当前 React 学习主线的关系：**

本节复用第8章minimal state，说明async data也不例外。

**本节最终记忆模型：**

Fetch保存可信source；render派生当前view。

### 9.11 Custom async hook 与独立 state

**本节解决的问题：**

多个components重复Effect/cleanup/lifecycle logic可提取hook，但两个call不会自动共享request、cache或state。

**技术意义：**

Custom hook复用request protocol；state identity仍属于每个caller component的Hook positions。

**新关键字和新概念：**

custom async hook、hook call identity、independent resource state、logic reuse。

**七层边界：**

JS调用普通function并创建Promise/return value；React把内部Hooks登记到caller identity；browser timer模拟resource；HTTP未参与；TS推断return union；linter识别`use`规则；architecture明确无共享cache。

**底层机制：**

两个ProductResourceCard instances各自调用`useProductResource`。相同source function执行两次，但内部state/effect cells分属A/B component identities。

**API / 语法规则：**

Custom hook名称以`use`开头；只能在function component/custom hook顶层调用。它可组合useState/useEffect。

**固定属性名 / 方法名 / 参数签名：**

`useProductResource(productId: string): ProductResourceState`是本地contract；React不提供automatic dedupe/cache。

**机制证据链：**

1. A/B cards mount各自触发committed productId Effect。
2. JS创建两个Promises、timers、ignore bindings与return state values。
3. React为A/B各保存独立Hook cells与Effect cleanup。
4. B 300ms、A 650ms分别fulfilled。
5. TS保证return union，runtime product response仍需validation。
6. B先success不改变A pending；各UI读取自身snapshot。
7. 误认为同hook共享cache会导致Header/Page重复request和不同loading状态。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/11-custom-async-hook/custom-async-resource.tsx</span></div>

```tsx
import { useEffect, useState } from 'react'

type ProductResourceState =
  | { status: 'pending' }
  | { status: 'success'; name: string }
  | { status: 'error'; message: string }

function requestProductName(productId: string): Promise<string> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(`Product ${productId}`), productId === 'A' ? 650 : 300)
  })
}

function useProductResource(productId: string): ProductResourceState {
  const [state, setState] = useState<ProductResourceState>({ status: 'pending' })

  useEffect(() => {
    let ignore = false

    requestProductName(productId)
      .then((name) => {
        if (!ignore) setState({ status: 'success', name })
      })
      .catch((error: unknown) => {
        if (!ignore) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown product error',
          })
        }
      })

    return () => {
      ignore = true
    }
  }, [productId])

  return state
}

function ProductResourceCard({ productId }: { productId: string }) {
  const state = useProductResource(productId)

  return (
    <div className="resource-box">
      <strong>Resource {productId}</strong>
      <span>{state.status === 'success' ? state.name : state.status}</span>
    </div>
  )
}

export function CustomAsyncResource() {
  return (
    <article className="practice-card">
      <p className="practice-label">Custom async hook</p>
      <h3>Reuse lifecycle logic without sharing state</h3>
      <div className="resource-grid">
        <ProductResourceCard productId="A" />
        <ProductResourceCard productId="B" />
      </div>
    </article>
  )
}
```
</div>

**代码逐行解释：**

Hook封装state/effect/cleanup并返回current union。Card只负责render。A/B复用implementation但没有common provider/cache。

**执行过程：**

Mount后两个Effects启动；B先settle并render success；A仍pending，随后独立success。

**变量、引用与 async state 变化：**

每个call有独立state object、Promise、ignore binding和cleanup。Function definition共享，runtime values不共享。

**为什么得到这个结果：**

React按caller component identity和Hook call position关联state，而不是按custom hook函数地址。

**对比写法：**

若两个call应共享同一resource，应提升owner/Context或未来使用query cache；重复hook call本身不会dedupe。

**常见错误违反的规则：**

把custom hook当shared store混淆logic reuse与state ownership。

**如何识别类似错误：**

Network panel出现同URL多次，且多个callers各有loading state，说明它们是independent resources。

**与 SellerHub 的关系：**

Product cards可独立fetch；Header badge与OrdersPage若应共享，则需要共同owner，不靠同名hook。

**与当前 React 学习主线的关系：**

本节继承第8章custom hook call identity，并加入Effect/Promise lifecycle。

**本节最终记忆模型：**

Custom async hook共享protocol，不自动共享request、state或cache。

### 9.12 Context delivery 与 request ownership

**本节解决的问题：**

Deep child需要async state与refresh，但中间layout不使用。Context可交付resource，却不能负责fetch、validation或owner decision。

**技术意义：**

Provider component仍是request owner；Context只是tree-scoped delivery channel。Custom context hook提供missing-provider guard。

**新关键字和新概念：**

async resource Context、provider boundary、consumer guard、request owner。

**七层边界：**

JS provider创建value object/async function；React保存provider state并按tree查Context；browser timer模拟request；HTTP/validation省略；TS检查nullable context；tooling检查Hooks；architecture限定provider scope。

**底层机制：**

DeliveryProvider拥有state与refresh closure。DeepOrderStatus调用useContext，从nearest provider读取current value。Refresh event仍在owner function中执行request。

**API / 语法规则：**

React 19使用`<DeliveryContext value={...}>`；`useContext`读取nearest provider；default null需要runtime guard。

**固定属性名 / 方法名 / 参数签名：**

Provider固定prop`value`；Context value contract是`{ state, refresh }`；hook名称以`use`开头。

**机制证据链：**

1. Deep button click调用Context中的refresh callback。
2. JS provider closure创建Promise/result array并在render创建new value object。
3. React owner queue pending/success，consumer读取nearest value并rerender。
4. Mock Promise fulfilled；真实request status/guard仍应在provider owner处理。
5. TS消除`null`只因runtime guard；不会验证orders body。
6. Provider state决定deep UI status。
7. Context当fetch library会隐藏owner、criteria、cleanup与cache policy。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/12-context-async-delivery/context-async-delivery.tsx</span></div>

```tsx
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type DeliveryState =
  | { status: 'idle'; orders: string[] }
  | { status: 'pending'; orders: string[] }
  | { status: 'success'; orders: string[] }
  | { status: 'error'; orders: string[]; message: string }

type DeliveryContextValue = {
  state: DeliveryState
  refresh: () => void
}

const DeliveryContext = createContext<DeliveryContextValue | null>(null)

function useDeliveryContext() {
  const value = useContext(DeliveryContext)
  if (value === null) throw new Error('useDeliveryContext must be used within DeliveryProvider')
  return value
}

function requestOrders(): Promise<string[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(['ORD-1201', 'ORD-1202']), 450)
  })
}

function DeliveryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DeliveryState>({ status: 'idle', orders: [] })

  async function refresh() {
    setState((current) => ({ status: 'pending', orders: current.orders }))

    try {
      const orders = await requestOrders()
      setState({ status: 'success', orders })
    } catch (error: unknown) {
      setState((current) => ({
        status: 'error',
        orders: current.orders,
        message: error instanceof Error ? error.message : 'Unknown delivery error',
      }))
    }
  }

  return <DeliveryContext value={{ state, refresh }}>{children}</DeliveryContext>
}

function DeepOrderStatus() {
  const { state, refresh } = useDeliveryContext()

  return (
    <div>
      <button type="button" onClick={refresh}>Refresh deep order data</button>
      <p>{state.status}: {state.orders.join(', ') || 'no orders'}</p>
    </div>
  )
}

export function ContextAsyncDelivery() {
  return (
    <article className="practice-card">
      <p className="practice-label">Context delivery</p>
      <h3>Deliver async state without hiding ownership</h3>
      <DeliveryProvider>
        <section>
          <DeepOrderStatus />
        </section>
      </DeliveryProvider>
    </article>
  )
}
```
</div>

**代码逐行解释：**

Context声明nullable boundary；guard提供明确runtime error。Provider拥有request和state；consumer只读contract并触发intent。

**执行过程：**

Click调用provider render创建的refresh；pending value传播；Promise success后new provider value使consumer读取orders。

**变量、引用与 async state 变化：**

每次provider render创建new `{ state, refresh }` reference。Context object本身module-stable；state cell属于provider identity。

**为什么得到这个结果：**

Consumer能跨层读取是因为tree中最近provider，不是因为Context成为global variable。

**对比写法：**

把Context常量当mutable store、或在provider外调用hook，都没有合法owner/update path。

**常见错误违反的规则：**

Context替代validation/request management会让deep consumers收到untrusted data并难以定位race。

**如何识别类似错误：**

Context file若同时隐藏所有URLs、cache、retry、parsing且无owner说明，职责过载。

**与 SellerHub 的关系：**

SellerOrders subtree可共享resource；ProductDetail局部data不必进入app-wide Context。

**与当前 React 学习主线的关系：**

本节把第8章Context delivery与本章async owner组合，仍保持职责分离。

**本节最终记忆模型：**

Context交付current resource；owner负责request、validation与transition。

### 9.13 SellerHub async data architecture mapping

**本节解决的问题：**

不同页面的criteria、lifetime、empty semantics与stale policy不同，不能统一成一个app-wide `isLoading`或万能Context。

**技术意义：**

先确定resource owner与runtime boundary，再选择event/Effect、reducer、hook、Context。技术工具不能替代架构判断。

**新关键字和新概念：**

resource owner、criteria lifetime、stale policy、not-found semantics、cache boundary。本节没有新 API，重点是 async data lifecycle 和架构边界。

**七层边界：**

JavaScript执行request/parser/derived calculations；React保存page/provider snapshots；browser/HTTP处理transport/status；TypeScript建模trusted domain；tooling验证Hooks/types；architecture决定scope与policy。

**底层机制：**

每个resource都要回答：谁触发、criteria是什么、哪些runtime checkpoints、谁保存lifecycle、旧result如何失效、empty/error如何显示、derived view是什么。

**API / 语法规则：**

本节没有新API；沿用前12节的event/effect、AbortSignal、guard、reducer、hook与Context contracts。

**固定属性名 / 方法名 / 参数签名：**

没有React强制的`ProductQuery`/`OrdersContext`名称；固定边界是fetch Response、Effect cleanup、Hook rules和typed transition。

**机制证据链：**

1. SellerOrders status change或Retry是trigger。
2. JS创建criteria snapshot、Promise、Response/body/parser values。
3. React owner保存pending与last trusted orders，reducer处理terminal action。
4. Browser/HTTP可能network reject、non-2xx、invalid JSON或abort。
5. TS只在guard成功后把unknown narrowing为SellerOrder[]。
6. Reducer status与orders length决定pending/stale/success/empty/error UI。
7. 若owner/cache/validation都藏进global Context，race与invalid data会跨页面扩散。

**SellerHub 场景表：**

| 页面 | Criteria / owner | Empty 与 error | Obsolete protection | Derived data |
| --- | --- | --- | --- | --- |
| ProductListPage | category/search；页面或resource hook | empty是无匹配产品 | abort/ignore旧query | visible count/sort |
| ProductDetailPage | productId；detail owner | 404是not-found，不是empty list | id change abort | price label/availability |
| BuyerOrdersPage | user/order status；page owner | empty是尚无订单 | auth/user change失效 | count/total |
| SellerOrdersPage | status criteria；provider owner | empty/error分支 | abort + ignore | visible count/revenue |
| AdminProductsPage | audit criteria；workspace owner | empty audit queue | criteria epoch | issue count |
| Auth bootstrap | session；layout owner | anonymous是合法终态 | logout/user switch失效 | permission view |
| CartPage | client cart owner | empty cart是local state | 通常无fetch race | subtotal/count |

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: SellerHub resource boundary</span></div>

```ts
type ResourceBoundary = {
  owner: string
  criteria: string[]
  trigger: 'event' | 'effect'
  stalePolicy: 'clear' | 'retain'
  delivery: 'props' | 'context'
}

const sellerOrdersBoundary: ResourceBoundary = {
  owner: 'SellerOrdersProvider',
  criteria: ['status'],
  trigger: 'effect',
  stalePolicy: 'retain',
  delivery: 'context',
}
```
</div>

**代码逐行解释：**

Worksheet显式记录owner、criteria、trigger、stale policy与delivery；它不实现request，只迫使设计者先回答边界问题。

**执行过程：**

Status event先改变criteria；committed criteria Effect启动request；old epoch cleanup；parser验证body；reducertransition；Context交付new state；summary从orders派生。

**变量、引用与 async state 变化：**

Criteria string与request version是source；Promise/Response/unknown body是transient runtime values；validated orders进入reducer state；count/revenue只在render生成。

**为什么得到这个结果：**

每层只承担自己的职责，任何failure都能定位到trigger、transport、status、parse、validation、transition或delivery。

**对比写法：**

一个`GlobalDataContext`保存products/orders/auth/cart/loading/error会让无关resource共享boolean和lifetime。

**常见错误违反的规则：**

CartPage通常是local/client state；把它强塞进async model会制造不存在的network lifecycle。反之remote orders缺少async union则遗漏真实failure。

**如何识别类似错误：**

无法回答“哪一个criteria的哪一次request拥有当前data”时，architecture还不完整。

**与 SellerHub 的关系：**

本节就是从学习练习迁移到SellerHub页面前的设计清单；后续TanStack Query会接管cache/dedupe/background refetch，但不会替代runtime validation与UI semantics。

**与当前 React 学习主线的关系：**

它汇总第3–9章：props传contract、state保存snapshot、Effect同步、reducer算transition、Context交付、hook复用logic。

**本节最终记忆模型：**

先画resource evidence chain，再选React API；不要反过来。

## 10. API / 语法索引

| API / 语法 | Layer | 关键行为 | 常见误解 |
| --- | --- | --- | --- |
| `Promise<T>` | JavaScript | pending后fulfilled T或rejected reason | Promise pending等于React loading |
| `async` / `await` | JavaScript | 暂停async continuation，不阻塞browser | React会等待handler |
| `fetch(input, init?)` | Browser | 返回`Promise<Response>` | 404会reject |
| `response.ok` | Browser / HTTP | status 200–299时true | fulfilled Response必然ok |
| `response.status` | Browser / HTTP | HTTP numeric status | network error也有Response |
| `response.json()` | Browser / JS | 读取body并parse为JS value | 自动验证domain type |
| `AbortController` | Browser | 通过signal请求取消operation | cleanup自动取消fetch |
| `useEffect` | React | commit后同步external system | 所有fetch都必须放Effect |
| `useReducer` | React | queue action并计算next async state | reducer可以执行request |
| `unknown` | TypeScript | 阻止未narrow value直接使用 | runtime会自动验证 |
| type predicate | TS + JS | runtime boolean check支持narrowing | 只有signature即可验证 |
| `Awaited<T>` | TypeScript | 模拟await递归unwrap Promise type | 改变runtime Promise |

## 11. 常见错误表

| 错误 | 具体 bug | 违反规则 | 修正 / 识别 |
| --- | --- | --- | --- |
| 多个 lifecycle booleans | loading与error同时显示 | 互斥状态应单一discriminant | async union/reducer |
| `json() as Order[]` | invalid field在render崩溃 | annotation不做runtime validation | unknown + guard/parser |
| 只catch network error | 404 body被当success | fetch fulfilled不代表HTTP success | 检查ok/status |
| Empty当error | 无订单显示故障 | empty是成功结果 | length 0独立branch |
| Effect读criteria但`[]` | label与result不匹配 | dependency不诚实 | 列出全部reactive criteria |
| 无cleanup | old result覆盖new criteria | obsolete epoch不应写state | abort或ignore |
| 只clear timer | Promise后续仍写state | cleanup未关闭completion权限 | signal + ignore |
| Reducer fetch | Strict Mode可能重复副作用 | reducer必须pure | request在handler/Effect |
| 保存visible data | count/list不同步 | derived data不应复制 | render filter/reduce |
| Retry放Effect boolean | unrelated render触发request | event intent应在handler | retry callback/version |
| 同hook当shared cache | duplicate requests/loading | logic reuse不等于shared state | common owner/query cache |
| Context当fetch library | owner/validation/race隐藏 | Context只交付value | provider明确resource contract |
| 不区分stale/pending | refresh时旧data突然消失 | stale policy未定义 | pending member保留/清空明确化 |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。

### 12.1 项目目标

**Seller Orders Async Workspace** 模拟SellerHub订单列表。它支持criteria切换、pending/success/empty/error、retry、stale orders、abort/ignore、unknown parser、typed reducer、custom hook、Context与derived summary。

### 12.2 最终小项目结构

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Seller Orders Async Workspace structure</span></div>

```txt
src/learning/react/chapter-09-async-data/seller-orders-async-workspace/
  seller-order-types.ts
  seller-order-response-guard.ts
  seller-order-request.ts
  seller-orders-reducer.ts
  use-seller-orders-resource.ts
  seller-orders-context.ts
  seller-orders-provider.tsx
  seller-orders-toolbar.tsx
  seller-orders-list.tsx
  seller-orders-summary.tsx
  seller-orders-async-workspace.tsx
  seller-orders-async-workspace.css
```
</div>

### 12.3 文件职责

| 文件 | 职责 |
| --- | --- |
| `seller-order-types.ts` | Domain、criteria、async state、action与resource contract |
| `seller-order-response-guard.ts` | 将unknown body验证为SellerOrder[] |
| `seller-order-request.ts` | 可abort的local mock request |
| `seller-orders-reducer.ts` | Pure lifecycle transitions与stale data policy |
| `use-seller-orders-resource.ts` | Criteria owner、Effect、abort/ignore、retry与parser orchestration |
| `seller-orders-context.ts` | Typed Context与consumer guard |
| `seller-orders-provider.tsx` | Resource owner/provider boundary |
| `seller-orders-toolbar.tsx` | Child criteria/retry intent |
| `seller-orders-list.tsx` | Pending/stale/success/empty/error branches |
| `seller-orders-summary.tsx` | Derived count/revenue |
| `seller-orders-async-workspace.tsx` | Composition root |
| `seller-orders-async-workspace.css` | 最终项目局部样式 |

### 12.4 完整代码

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-order-types.ts</span></div>

```ts
export type SellerOrderStatus = 'pending' | 'shipped'

export type SellerOrderCriteria =
  | 'all'
  | SellerOrderStatus
  | 'cancelled'
  | 'request-error'

export type SellerOrder = {
  id: string
  customerName: string
  status: SellerOrderStatus
  total: number
}

export type SellerOrdersState =
  | { status: 'idle'; orders: SellerOrder[] }
  | { status: 'pending'; orders: SellerOrder[] }
  | { status: 'success'; orders: SellerOrder[] }
  | { status: 'empty'; orders: SellerOrder[] }
  | { status: 'error'; orders: SellerOrder[]; message: string }

export type SellerOrdersAction =
  | { type: 'request_started' }
  | { type: 'request_succeeded'; orders: SellerOrder[] }
  | { type: 'request_failed'; message: string }

export type SellerOrdersResource = {
  criteria: SellerOrderCriteria
  state: SellerOrdersState
  setCriteria: (criteria: SellerOrderCriteria) => void
  retry: () => void
}
```
</div>

这些types把criteria、trusted domain、lifecycle与actions分开。Emit后全部擦除，runtime trust来自guard。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-order-response-guard.ts</span></div>

```ts
import type { SellerOrder, SellerOrderStatus } from './seller-order-types'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isSellerOrderStatus(value: unknown): value is SellerOrderStatus {
  return value === 'pending' || value === 'shipped'
}

function isSellerOrder(value: unknown): value is SellerOrder {
  if (!isRecord(value)) return false

  return (
    typeof value.id === 'string' &&
    typeof value.customerName === 'string' &&
    isSellerOrderStatus(value.status) &&
    typeof value.total === 'number'
  )
}

export function parseSellerOrdersResponse(value: unknown): SellerOrder[] {
  if (!isRecord(value) || !Array.isArray(value.orders) || !value.orders.every(isSellerOrder)) {
    throw new Error('Seller orders response has an invalid shape')
  }

  return value.orders
}
```
</div>

Parser逐层检查container、orders array与每个order。Throw将invalid body转换为request failure，而不是把错误推迟到UI。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-order-request.ts</span></div>

```ts
import type { SellerOrder, SellerOrderCriteria } from './seller-order-types'

const sellerOrders: SellerOrder[] = [
  { id: 'ORD-2101', customerName: 'Avery Chen', status: 'pending', total: 148 },
  { id: 'ORD-2102', customerName: 'Jordan Lee', status: 'shipped', total: 92 },
  { id: 'ORD-2103', customerName: 'Morgan Diaz', status: 'pending', total: 235 },
]

function waitForRequest(delay: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const handleAbort = () => {
      window.clearTimeout(timeoutId)
      reject(new DOMException('Seller orders request aborted', 'AbortError'))
    }

    const timeoutId = window.setTimeout(() => {
      signal.removeEventListener('abort', handleAbort)
      resolve()
    }, delay)

    signal.addEventListener('abort', handleAbort, { once: true })

    if (signal.aborted) handleAbort()
  })
}

export async function requestSellerOrders(
  criteria: SellerOrderCriteria,
  signal: AbortSignal,
): Promise<unknown> {
  const delay = criteria === 'pending' ? 850 : 400
  await waitForRequest(delay, signal)

  if (criteria === 'request-error') {
    throw new Error('Seller orders service unavailable')
  }

  if (criteria === 'cancelled') {
    return { orders: [] }
  }

  const orders =
    criteria === 'all' ? sellerOrders : sellerOrders.filter((order) => order.status === criteria)

  return { orders }
}
```
</div>

Mock returns `unknown` on purpose and consumes AbortSignal。Real fetch wrapper would check `Response.ok/status` before returningparsed unknown body。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-reducer.ts</span></div>

```ts
import type { SellerOrdersAction, SellerOrdersState } from './seller-order-types'

export const initialSellerOrdersState: SellerOrdersState = {
  status: 'pending',
  orders: [],
}

function assertNever(action: never): never {
  throw new Error(`Unhandled seller orders action: ${JSON.stringify(action)}`)
}

export function sellerOrdersReducer(
  state: SellerOrdersState,
  action: SellerOrdersAction,
): SellerOrdersState {
  switch (action.type) {
    case 'request_started':
      return { status: 'pending', orders: state.orders }
    case 'request_succeeded':
      return action.orders.length === 0
        ? { status: 'empty', orders: [] }
        : { status: 'success', orders: action.orders }
    case 'request_failed':
      return { status: 'error', orders: state.orders, message: action.message }
    default:
      return assertNever(action)
  }
}
```
</div>

Reducer保留previous orders用于pending/error stale UI；success empty由array length决定。无Promise、timer、Context或mutation。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/seller-orders-async-workspace/use-seller-orders-resource.ts</span></div>

```ts
import { useEffect, useReducer, useState } from 'react'
import { parseSellerOrdersResponse } from './seller-order-response-guard'
import { requestSellerOrders } from './seller-order-request'
import type { SellerOrderCriteria, SellerOrdersResource } from './seller-order-types'
import { initialSellerOrdersState, sellerOrdersReducer } from './seller-orders-reducer'

export function useSellerOrdersResource(): SellerOrdersResource {
  const [criteria, setCriteriaState] = useState<SellerOrderCriteria>('all')
  const [requestVersion, setRequestVersion] = useState(0)
  const [state, dispatch] = useReducer(sellerOrdersReducer, initialSellerOrdersState)

  useEffect(() => {
    const controller = new AbortController()
    let ignore = false

    requestSellerOrders(criteria, controller.signal)
      .then((body) => parseSellerOrdersResponse(body))
      .then((orders) => {
        if (!ignore) dispatch({ type: 'request_succeeded', orders })
      })
      .catch((error: unknown) => {
        if (ignore || (error instanceof DOMException && error.name === 'AbortError')) return
        dispatch({
          type: 'request_failed',
          message: error instanceof Error ? error.message : 'Unknown seller orders error',
        })
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [criteria, requestVersion])

  function setCriteria(nextCriteria: SellerOrderCriteria) {
    dispatch({ type: 'request_started' })
    setCriteriaState(nextCriteria)
  }

  function retry() {
    dispatch({ type: 'request_started' })
    setRequestVersion((current) => current + 1)
  }

  return { criteria, state, setCriteria, retry }
}
```
</div>

Hook是resource owner：criteria/retry是source state，Effect同步request，cleanup abort+ignore，parser后才dispatch success。每次hook call仍独立。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-context.ts</span></div>

```ts
import { createContext, useContext } from 'react'
import type { SellerOrdersResource } from './seller-order-types'

export const SellerOrdersContext = createContext<SellerOrdersResource | null>(null)

export function useSellerOrdersContext(): SellerOrdersResource {
  const value = useContext(SellerOrdersContext)

  if (value === null) {
    throw new Error('useSellerOrdersContext must be used within SellerOrdersProvider')
  }

  return value
}
```
</div>

Context只交付resource contract；runtime guard把missing provider转为靠近原因的error。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-provider.tsx</span></div>

```tsx
import type { ReactNode } from 'react'
import { SellerOrdersContext } from './seller-orders-context'
import { useSellerOrdersResource } from './use-seller-orders-resource'

export function SellerOrdersProvider({ children }: { children: ReactNode }) {
  const resource = useSellerOrdersResource()

  return <SellerOrdersContext value={resource}>{children}</SellerOrdersContext>
}
```
</div>

Provider调用一次resource hook并确定sharing boundary。多个consumers共享是因为同一provider，不是因为hook自动共享。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-toolbar.tsx</span></div>

```tsx
import type { SellerOrderCriteria } from './seller-order-types'
import { useSellerOrdersContext } from './seller-orders-context'

export function SellerOrdersToolbar() {
  const { criteria, retry, setCriteria, state } = useSellerOrdersContext()

  return (
    <div className="orders-toolbar">
      <label>
        Request criteria
        <select
          value={criteria}
          onChange={(event) => setCriteria(event.currentTarget.value as SellerOrderCriteria)}
        >
          <option value="all">All orders</option>
          <option value="pending">Pending orders</option>
          <option value="shipped">Shipped orders</option>
          <option value="cancelled">Empty result</option>
          <option value="request-error">Request error</option>
        </select>
      </label>
      <button type="button" onClick={retry} disabled={state.status === 'pending'}>
        Retry current criteria
      </button>
    </div>
  )
}
```
</div>

Toolbar child只表达criteria/retry intent。Pending时禁用retry避免同一button重复排队；criteria仍可快速切换以观察abort/race protection。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-list.tsx</span></div>

```tsx
import { useSellerOrdersContext } from './seller-orders-context'

export function SellerOrdersList() {
  const { state } = useSellerOrdersContext()

  if (state.status === 'pending' && state.orders.length === 0) {
    return <p className="orders-feedback">Loading seller orders...</p>
  }

  if (state.status === 'empty') {
    return <p className="orders-feedback">No orders match the current criteria.</p>
  }

  if (state.status === 'error' && state.orders.length === 0) {
    return <p className="orders-feedback status-error">{state.message}</p>
  }

  return (
    <div>
      {state.status === 'pending' && (
        <p className="orders-feedback">Refreshing while previous orders remain visible...</p>
      )}
      {state.status === 'error' && (
        <p className="orders-feedback status-error">{state.message}</p>
      )}
      <div className="orders-list">
        {state.orders.map((order) => (
          <article className="order-row" key={order.id}>
            <div>
              <strong>{order.id}</strong>
              <span>{order.customerName}</span>
            </div>
            <span className={`order-status order-status-${order.status}`}>{order.status}</span>
            <strong>${order.total.toFixed(2)}</strong>
          </article>
        ))}
      </div>
    </div>
  )
}
```
</div>

List明确区分initial pending、refresh with stale data、empty、error without data、error with stale data和success list。Stable order id作为key。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-summary.tsx</span></div>

```tsx
import { useSellerOrdersContext } from './seller-orders-context'

export function SellerOrdersSummary() {
  const { criteria, state } = useSellerOrdersContext()
  const visibleOrderCount = state.orders.length
  const visibleRevenue = state.orders.reduce((total, order) => total + order.total, 0)

  return (
    <aside className="orders-summary" aria-labelledby="orders-summary-title">
      <p className="project-eyebrow">Derived from fetched source data</p>
      <h3 id="orders-summary-title">Current result</h3>
      <dl>
        <div>
          <dt>Criteria</dt>
          <dd>{criteria}</dd>
        </div>
        <div>
          <dt>Lifecycle</dt>
          <dd>{state.status}</dd>
        </div>
        <div>
          <dt>Visible orders</dt>
          <dd>{visibleOrderCount}</dd>
        </div>
        <div>
          <dt>Visible revenue</dt>
          <dd>${visibleRevenue.toFixed(2)}</dd>
        </div>
      </dl>
    </aside>
  )
}
```
</div>

Count/revenue是current orders snapshot的derived bindings，没有setter，不会与list分叉。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-async-workspace.tsx</span></div>

```tsx
import { SellerOrdersList } from './seller-orders-list'
import { SellerOrdersProvider } from './seller-orders-provider'
import { SellerOrdersSummary } from './seller-orders-summary'
import { SellerOrdersToolbar } from './seller-orders-toolbar'
import './seller-orders-async-workspace.css'

function SellerOrdersWorkspaceContent() {
  return (
    <section className="seller-orders-workspace" aria-labelledby="seller-orders-title">
      <header className="seller-orders-header">
        <div>
          <p className="project-eyebrow">Final mini project</p>
          <h2 id="seller-orders-title">Seller Orders Async Workspace</h2>
          <p>
            Change request criteria, observe lifecycle transitions, preserve stale results,
            retry failures, and ignore obsolete requests.
          </p>
        </div>
        <SellerOrdersToolbar />
      </header>

      <div className="seller-orders-layout">
        <SellerOrdersList />
        <SellerOrdersSummary />
      </div>
    </section>
  )
}

export function SellerOrdersAsyncWorkspace() {
  return (
    <SellerOrdersProvider>
      <SellerOrdersWorkspaceContent />
    </SellerOrdersProvider>
  )
}
```
</div>

Content必须位于provider之下才能读取Context。Composition root不包含request细节。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-async-workspace.css</span></div>

```css
.seller-orders-workspace {
  margin-top: 64px;
  padding: 28px;
  border: 1px solid #b7c6cf;
  border-radius: 8px;
  background: #ffffff;
}

.seller-orders-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
  gap: 28px;
  align-items: end;
  padding-bottom: 24px;
  border-bottom: 1px solid #d7e0e5;
}

.seller-orders-header h2 {
  margin: 8px 0;
  color: #172033;
  font-size: 2rem;
}

.seller-orders-header p:last-child {
  max-width: 670px;
  margin: 0;
  color: #5f6c7b;
  line-height: 1.6;
}

.orders-toolbar {
  display: grid;
  gap: 10px;
}

.orders-toolbar label {
  display: grid;
  gap: 6px;
  color: #344054;
  font-weight: 750;
}

.orders-toolbar select {
  padding: 10px;
  color: #172033;
  border: 1px solid #8fa3b1;
  border-radius: 7px;
  background: #ffffff;
}

.seller-orders-workspace button {
  padding: 10px 13px;
  color: #ffffff;
  border: 1px solid #125d73;
  border-radius: 7px;
  background: #125d73;
  font-weight: 800;
  cursor: pointer;
}

.seller-orders-workspace button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

.seller-orders-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(250px, 0.65fr);
  gap: 22px;
  padding-top: 24px;
}

.orders-list {
  display: grid;
  gap: 10px;
}

.order-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 18px;
  padding: 17px;
  border: 1px solid #d7e0e5;
  border-radius: 8px;
}

.order-row > div {
  display: grid;
  gap: 4px;
}

.order-row span {
  color: #667085;
}

.order-status {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
}

.order-status-pending {
  color: #7a4d00;
  background: #fff1c2;
}

.order-status-shipped {
  color: #075f4d;
  background: #cef2e8;
}

.orders-feedback {
  padding: 18px;
  color: #526071;
  border: 1px dashed #8fa3b1;
  border-radius: 8px;
}

.status-error {
  color: #a33126;
}

.orders-summary {
  padding: 20px;
  border: 1px solid #b7c6cf;
  border-radius: 8px;
  background: #f4f8f9;
}

.orders-summary h3 {
  margin: 8px 0 18px;
}

.orders-summary dl {
  display: grid;
  gap: 12px;
  margin: 0;
}

.orders-summary dl div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.orders-summary dd {
  margin: 0;
  font-weight: 850;
}

@media (max-width: 820px) {
  .seller-orders-header,
  .seller-orders-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .seller-orders-workspace {
    padding: 20px;
  }

  .order-row {
    grid-template-columns: 1fr;
  }
}
```
</div>

CSS只负责layout/feedback presentation，不改变request lifecycle。Responsive rules保持窄屏不重叠。

### 12.5 核心执行流程

1. Provider调用一次`useSellerOrdersResource`，成为criteria与async state owner。
2. Initial Effect为`all`创建controller、Promise与ignore binding。
3. Mock body先作为`unknown`进入parser；guard成功后dispatch success。
4. Toolbar修改criteria时先dispatch pending，再commit criteria；Effect cleanup abort/ignore old request。
5. Reducer保留previous orders，所以refresh/error可展示stale data。
6. List按status/orders length选择UI；Summary从same orders snapshot派生count/revenue。
7. Retry increment requestVersion，同criteria也能产生new request epoch。

### 12.6 机制边界与常见错误

- Reducer中没有request、timer、abort或parser；它保持pure。
- Context不验证body、不发request，只交付resource。
- Hook每次call默认独立；本项目通过单一provider call共享。
- `requestSellerOrders`返回`unknown`，防止mock type掩盖runtime boundary。
- Abort与ignore同时存在：前者取消支持的work，后者关闭old continuation写权限。
- Count/revenue没有state setter，避免derived duplication。

## 13. 额外速查表

**一句话总结：** Async UI的正确性来自明确trigger、runtime checkpoints、current request ownership和互斥lifecycle state。

| 场景 | 优先机制 | 不应使用 |
| --- | --- | --- |
| 点击搜索/重试 | event handler | `shouldFetch` boolean Effect |
| criteria commit后必须同步 | Effect + honest deps | empty dependency |
| cancel old request | AbortController | 假设Promise自动取消 |
| operation不可取消 | ignore/request id | last completion wins |
| external body | unknown + guard/parser | direct `as Domain[]` |
| complex lifecycle | reducer | reducer内fetch |
| deep delivery | narrow Context | global loading/error Context |
| filtered count | render derivation | duplicate state |

**最小 request template：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Template: guarded fetch boundary</span></div>

```ts
export async function fetchUnknown(url: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}
```
</div>

该template只完成transport/status/body parse；caller仍必须用domain parser验证returned unknown。

## 14. 最终文件清单

| 文件路径 | 职责 | 状态 |
| --- | --- | --- |
| `docs/react/chapter-09-async-data/react-chapter-09-learning-guide.md` | 第9章学习指导 | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/chapter-09-practice-root.tsx` | 本章入口 | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/chapter-09-practice.css` | 本章共享样式 | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/01-async-data-boundary/async-data-source-boundary.tsx` | Async source boundary | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/02-async-state-union/async-lifecycle-union.tsx` | Lifecycle union | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/03-http-error-boundary/http-response-boundary.tsx` | HTTP/network/JSON boundary | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/04-event-driven-fetch/event-driven-product-search.tsx` | Event request | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/05-effect-driven-fetch/effect-driven-product-query.tsx` | Effect criteria request | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/06-abort-obsolete-result/abort-obsolete-request.tsx` | Abort cleanup | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/07-race-condition/race-condition-protection.tsx` | Race protection | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/08-runtime-type-guard/unknown-response-guard.tsx` | Runtime guard | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/09-async-reducer/async-lifecycle-reducer.tsx` | Async reducer | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/10-derived-fetched-data/derived-order-summary.tsx` | Derived fetched data | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/11-custom-async-hook/custom-async-resource.tsx` | Custom async hook | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/12-context-async-delivery/context-async-delivery.tsx` | Context delivery | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-order-types.ts` | Domain/type contracts | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-order-response-guard.ts` | Runtime parser | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-order-request.ts` | Abortable mock request | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-reducer.ts` | Pure lifecycle reducer | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/use-seller-orders-resource.ts` | Resource custom hook | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-context.ts` | Context contract/guard | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-provider.tsx` | Provider owner | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-toolbar.tsx` | Criteria/retry intent | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-list.tsx` | Lifecycle UI branches | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-summary.tsx` | Derived summary | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-async-workspace.tsx` | Final composition | 已创建并保留 |
| `src/learning/react/chapter-09-async-data/seller-orders-async-workspace/seller-orders-async-workspace.css` | Final project styles | 已创建并保留 |
| `README.md` | 第9章路线、状态与路径 | 已更新 |
| `src/App.tsx` | 挂载第9章入口 | 已更新 |

不需要创建这些概念片段：

- `Snippet: SellerHub resource boundary`
- `Template: guarded fetch boundary`

## 15. 如何转换成个人笔记

每个resource写一张证据链卡片：

1. Trigger：event还是committed criteria。
2. Runtime：Promise、Response、status、body、guard。
3. Owner：哪个component/hook/provider保存criteria与async state。
4. Obsolete policy：abort、ignore或request id。
5. UI：pending、stale、success、empty、error。
6. Derived：哪些count/filter/total不进入state。

## 16. 必须能回答的问题

1. Async data为何不等于普通local state？
2. 为什么多个booleans会产生impossible lifecycle？
3. Fetch何时reject，404为何通常不reject？
4. `response.json()`完成了什么，又没有完成什么？
5. 为什么`as Product[]`不是runtime validation？
6. Event-driven与Effect-driven request的trigger差异是什么？
7. Effect dependency为何必须包含全部request criteria？
8. Abort与ignore分别解决什么？
9. Race condition为何与Promise start order不同？
10. Reducer为何不能fetch？
11. Pending/error时是否保留stale data由谁决定？
12. Visible orders/count/revenue为何是derived data？
13. 两次custom hook call为何不自动共享request state？
14. Context为何不是data fetching/cache library？
15. SellerHub哪些页面属于async resource，CartPage为何通常不是？

## 17. 最终记忆模型

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Final async data memory model</span></div>

```txt
trigger -> request criteria -> Promise
  -> network outcome
  -> HTTP status
  -> body parse
  -> runtime validation
  -> lifecycle transition
  -> current render snapshot
  -> pending / stale / success / empty / error UI

cleanup closes the previous request epoch.
derived view data is calculated, not copied.
Context delivers state; custom hooks reuse logic; neither creates a cache automatically.
```
</div>

## 18. 官方文档阅读清单

**React 官方文档（主要依据）：**

- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)：commit、dependency、cleanup，以及fetch cancel/ignore。
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)：event logic与derived data不应误放Effect。
- [Separating Events from Effects](https://react.dev/learn/separating-events-from-effects)：event非reactive、Effect reactive。
- [`useEffect` Reference](https://react.dev/reference/react/useEffect)：manual Effect fetching与race ignore。
- [`useReducer` Reference](https://react.dev/reference/react/useReducer)：dispatch snapshot、pure reducer与Strict Mode。
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)：共享logic而非state。
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)：provider/consumer delivery boundary。

**MDN（Browser、HTTP、JavaScript）：**

- [`fetch()`](https://developer.mozilla.org/docs/Web/API/Window/fetch)：network rejection与HTTP error status区别。
- [`Response.ok`](https://developer.mozilla.org/docs/Web/API/Response/ok)：200–299 success range。
- [`Response.json()`](https://developer.mozilla.org/docs/Web/API/Response/json)：读取并parse body为JavaScript value。
- [`AbortController`](https://developer.mozilla.org/docs/Web/API/AbortController)：abort request/body/stream。
- [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)：pending/fulfilled/rejected。

**TypeScript 官方文档：**

- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)：`unknown`、discriminated union、type guard与`never`。
- [`Awaited<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)：模拟await递归unwrap Promise types。

**本地辅助资料：**

- `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf`：PDF pages 116–151 的async data、conditional rendering、impossible states、data fetching、re-fetch与explicit fetch。
- `references/books/react/full-stack-react-projects.pdf`：旧MERN view/API fetch场景，仅作历史项目映射。

本地PDF中的axios、多个boolean loading/error和较旧Effect fetch写法不是本章现代默认；若与当前React/MDN冲突，以官方文档为准。
