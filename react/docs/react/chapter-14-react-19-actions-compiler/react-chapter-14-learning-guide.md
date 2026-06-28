# React 第 14 章：React 19 Actions、use API 与 React Compiler

<style>
.macos-code-window { overflow: hidden; margin: 16px 0; border: 1px solid #30363d; border-radius: 12px; background: #0d1117; }
.macos-code-titlebar { display: flex; align-items: center; gap: 8px; min-height: 36px; padding: 0 12px; border-bottom: 1px solid #30363d; background: #161b22; }
.macos-code-dot { display: inline-block; width: 12px; height: 12px; flex: 0 0 auto; border-radius: 999px; }
.macos-code-dot-red { background: #ff5f57; }
.macos-code-dot-yellow { background: #ffbd2e; }
.macos-code-dot-green { background: #28c840; }
.macos-code-title { margin-left: 8px; color: #c9d1d9; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; }
.macos-code-titlebar + pre { overflow-x: auto; margin: 0; padding: 16px; border-radius: 0 0 12px 12px; background: transparent; }
.macos-code-titlebar + pre code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 14px; }
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
  - [9.1 React 19 Actions：mutation、pending、error、result state](#section-9-1)
  - [9.2 useActionState：Action result state 与 sequential queue](#section-9-2)
  - [9.3 useActionState vs useReducer：side effects 与 pure reducer 边界](#section-9-3)
  - [9.4 form action prop 与 progressive enhancement mental model](#section-9-4)
  - [9.5 useFormStatus：最近 form boundary 与 submit button](#section-9-5)
  - [9.6 useOptimistic：乐观 UI、rollback 与真实结果对齐](#section-9-6)
  - [9.7 use API：Promise / context、Suspense 与 cached Promise](#section-9-7)
  - [9.8 Server Functions / Server Actions framework boundary](#section-9-8)
  - [9.9 ref as prop、document metadata 与 static APIs 边界](#section-9-9)
  - [9.10 React Compiler：automatic memoization 的真实目标](#section-9-10)
  - [9.11 Compiler rules、directives 与 lints：purity / immutability / unsupported syntax](#section-9-11)
  - [9.12 Migration strategy：从手动 memo 到 compiler-friendly codebase](#section-9-12)
  - [9.13 SellerHub React 19 Actions 与 Compiler architecture mapping](#section-9-13)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 最终小项目结构](#122-最终小项目结构)
  - [12.3 完整代码](#123-完整代码)
  - [12.4 核心执行流程](#124-核心执行流程)
  - [12.5 Runtime、类型与工具链边界](#125-runtime类型与工具链边界)
  - [12.6 验证步骤](#126-验证步骤)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 对应文件 / 片段 | 类型 | 所在章节 |
| --- | --- | --- | --- |
| Action、transition、pending 与 result state | `src/learning/react/chapter-14-react-19-actions-compiler/01-action-boundary/action-transition-result.tsx` | 核心机制真实文件 | 9.1 |
| `useActionState` 与 sequential queue | `src/learning/react/chapter-14-react-19-actions-compiler/02-use-action-state-queue/sequential-action-queue.tsx` | 核心机制真实文件 | 9.2 |
| `useActionState` 与 `useReducer` 边界 | `src/learning/react/chapter-14-react-19-actions-compiler/03-action-state-vs-reducer/action-reducer-boundary.tsx` | 核心机制真实文件 | 9.3 |
| function form action 与 progressive enhancement | `src/learning/react/chapter-14-react-19-actions-compiler/04-form-action-progressive-model/form-action-progressive-boundary.tsx` | 核心机制真实文件 | 9.4 |
| `useFormStatus` 最近 form boundary | `src/learning/react/chapter-14-react-19-actions-compiler/05-use-form-status-submit-button/form-status-submit-button.tsx` | 核心机制真实文件 | 9.5 |
| `useOptimistic` rollback 与 reconciliation | `src/learning/react/chapter-14-react-19-actions-compiler/06-use-optimistic-rollback/optimistic-review-reconciliation.tsx` | 核心机制真实文件 | 9.6 |
| `use(context)` 与 cached Promise 边界 | `src/learning/react/chapter-14-react-19-actions-compiler/07-use-api-suspense-promise/use-api-resource-boundary.tsx` | 核心机制真实文件 | 9.7 |
| Server Function framework boundary | `src/learning/react/chapter-14-react-19-actions-compiler/08-server-functions-boundary/server-function-boundary-map.tsx` | 核心机制真实文件 | 9.8 |
| ref、metadata 与 static API owner | `src/learning/react/chapter-14-react-19-actions-compiler/09-ref-metadata-static-apis/react-19-platform-boundaries.tsx` | 核心机制真实文件 | 9.9 |
| React Compiler automatic memoization 目标 | `src/learning/react/chapter-14-react-19-actions-compiler/10-react-compiler-goal/compiler-optimization-model.tsx` | 核心机制真实文件 | 9.10 |
| Compiler rules、directives 与 lint evidence | `src/learning/react/chapter-14-react-19-actions-compiler/11-compiler-rules-lints/compiler-rule-evidence.tsx` | 核心机制真实文件 | 9.11 |
| React 19 / Compiler migration gates | `src/learning/react/chapter-14-react-19-actions-compiler/12-migration-strategy/react-19-migration-gates.tsx` | 核心机制真实文件 | 9.12 |
| SellerHub React 19 架构映射 | `src/learning/react/chapter-14-react-19-actions-compiler/13-sellerhub-architecture-mapping/sellerhub-react-19-boundary-map.tsx` | 核心机制真实文件 | 9.13 |
| 最终小项目 domain types | `src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-types.ts` | 最终小项目真实文件 | 12.3 |
| 最终小项目 Action model | `src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-model.ts` | 最终小项目真实文件 | 12.3 |
| 最终小项目 Action workspace | `src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-workspace.tsx` | 最终小项目真实文件 | 12.3 |
| 最终小项目 Compiler boundary map | `src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-compiler-boundary-map.tsx` | 最终小项目真实文件 | 12.3 |
| 最终小项目组合入口 | `src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-react-19-actions-lab.tsx` | 最终小项目真实文件 | 12.3 |
| 章节挂载入口 | `src/learning/react/chapter-14-react-19-actions-compiler/chapter-14-practice-root.tsx` | adapter / shell | 8 |
| 章节共享样式 | `src/learning/react/chapter-14-react-19-actions-compiler/chapter-14-practice.css` | adapter / shell | 8 |
| Vite 根挂载 | `src/App.tsx` | adapter / shell | 8 |

## 0. 文件定位

本章是 `D:/vite_ts` React + TypeScript + Vite 学习路线的第 14 章，承接第 12 章的质量门禁和第 13 章的 server/client framework boundary。学习指导文件是 `docs/react/chapter-14-react-19-actions-compiler/react-chapter-14-learning-guide.md`，真实练习根目录是 `src/learning/react/chapter-14-react-19-actions-compiler/`。

当前 lockfile 实际安装 `react@19.2.4`、`react-dom@19.2.4`、`@types/react@19.2.10` 和 `eslint-plugin-react-hooks@7.0.1`，所以客户端 `useActionState`、`useFormStatus`、`useOptimistic`、`use(context)`、function form action、ref as prop 与 document metadata 可以在当前项目讨论或运行。项目没有安装 React Compiler，也没有 React Server Components / Server Functions framework runtime；相关内容必须作为 build/framework boundary 学习，不能伪造执行结果。

## 1. 本章解决的问题

传统 mutation 常把 pending flag、try/catch、结果 state、错误 state、optimistic record 和 form reset 分散在多个 handler 中。React 19 Actions 提供一组围绕 transition、form 与 mutation result 的协调机制，但它们不会替你定义业务状态、验证外部数据或创建 server transport。

本章还解决另一个常见误解：React Compiler 是 build-time automatic memoization，不是新的 React runtime，也不是“自动修复所有 React 代码”的工具。它依赖 pure render、immutable snapshots、静态 component structure 和可分析语法；错误 state owner、mutation、unstable key、server/client 越界仍然是架构错误。

## 2. 前置概念

- 第 4 章的 state snapshot、batching 和 event handler。
- 第 6 章的 browser form submission、controlled/uncontrolled field、validation 与 pending feedback。
- 第 8 章的 pure reducer、action object、Context 和 state owner。
- 第 9 章的 async lifecycle、runtime validation、obsolete result 与 error state。
- 第 11 章的 render evidence、manual memoization、Suspense 和 lazy。
- 第 12 章的 lint、typecheck、test、build 独立质量门禁。
- 第 13 章的 Server Component、Client Component、serialization、hydration 和 framework boundary。

## 3. 学习目标

完成本章后，你应能：

1. 解释 Action 为什么是 transition 中的 mutation 工作单元，而不是 event handler 的同义词。
2. 追踪 `useActionState` 的 `previousState -> reducerAction -> result state` 与 sequential queue。
3. 区分 pure `useReducer` reducer 和允许 side effects 的 Action reducer。
4. 正确定位 `<form action>`、`useFormStatus`、`useOptimistic` 和 `use` 的 owner 与限制。
5. 判断哪些 API 能在当前 Vite client runtime 运行，哪些依赖 framework/server/build pipeline。
6. 解释 React Compiler 的自动 memoization、bailout、directives、lints 和渐进迁移策略。
7. 把 checkout、cart、review、seller order、login、ProductCard 和 dashboard resource 映射到 SellerHub owner。

## 4. 推荐学习顺序

先从 Action 与 transition 的运行语义开始，再进入 `useActionState` queue 和 `useReducer` 对比；随后学习 React DOM form action、最近 form status 和 optimistic reconciliation。理解这些 mutation 机制后，再学习 `use` 的 resource identity、Server Function transport、React 19 platform output，最后进入 Compiler static analysis、lint evidence、migration gates 和 SellerHub architecture mapping。

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| Action | 在 transition 中执行并可包含 side effect 的 mutation 工作单元。 | React runtime | 连接 pending、error、result 与 optimistic state。 |
| `useActionState` | 保存 Action 返回值、dispatcher 和 pending flag。 | React Hook | previous result 会成为下一次 Action 的输入。 |
| `useFormStatus` | 读取最近父级 form 的提交状态。 | React DOM Hook | 适合封装 submit button。 |
| `useOptimistic` | Action pending 期间派生临时 UI state。 | React Hook | 真实结果回来后必须 reconciliation 或 rollback。 |
| `use` | 读取 context 或 cached Promise resource。 | React API / Suspense | Promise pending 时触发 Suspense。 |
| Server Function | 由 framework 生成 client reference 和 server transport 的函数。 | React RSC / framework | 普通 Vite async function 不是 Server Function。 |
| React Compiler | build-time automatic memoization compiler。 | Tooling / static analysis | 不改变业务 owner，也不修复不纯代码。 |
| Compiler directive | `"use memo"` / `"use no memo"`。 | Compiler syntax boundary | 没有 compiler 时只是无运行效果的 directive literal。 |

## 6. 底层心智模型

Action 链路是：

`user intent -> event/form submission -> Action/transition scope -> payload/FormData -> Action queue -> async side effect -> returned Action result -> React state snapshot -> commit`。

Optimistic 链路在真实结果前插入临时分支：

`base state -> optimistic reducer -> pending UI -> server/client mutation result -> confirmed base state or rollback`。

Compiler 链路完全不同：

`source code -> parser/AST -> React Compiler static analysis -> purity/immutability/data-flow decision -> generated memoization or bailout -> bundler output -> React runtime`。

TypeScript 只检查 `ActionState`、payload、`FormData` 读取结果和 component props 的静态关系；它不会执行 mutation、验证 server response、保证 Promise identity，也不会证明 compiler optimization 在 runtime 生效。

## 7. 推荐目录结构

### 当前项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Current project structure</span>
  </div>

```txt
D:/vite_ts/
  AGENTS.MD
  README.md
  package.json
  package-lock.json
  tsconfig.app.json
  eslint.config.js
  docs/react/
  docs/roadmap/react-mastery-roadmap-zh.md
  references/books/react/
  src/App.tsx
  src/learning/react/
```
</div>

### 本章文档结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Chapter document structure</span>
  </div>

```txt
docs/react/chapter-14-react-19-actions-compiler/
  react-chapter-14-learning-guide.md
```
</div>

### 真实练习结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Real practice structure</span>
  </div>

```txt
src/learning/react/chapter-14-react-19-actions-compiler/
  chapter-14-practice-root.tsx
  chapter-14-practice.css
  01-action-boundary/
    action-transition-result.tsx
  02-use-action-state-queue/
    sequential-action-queue.tsx
  03-action-state-vs-reducer/
    action-reducer-boundary.tsx
  04-form-action-progressive-model/
    form-action-progressive-boundary.tsx
  05-use-form-status-submit-button/
    form-status-submit-button.tsx
  06-use-optimistic-rollback/
    optimistic-review-reconciliation.tsx
  07-use-api-suspense-promise/
    use-api-resource-boundary.tsx
  08-server-functions-boundary/
    server-function-boundary-map.tsx
  09-ref-metadata-static-apis/
    react-19-platform-boundaries.tsx
  10-react-compiler-goal/
    compiler-optimization-model.tsx
  11-compiler-rules-lints/
    compiler-rule-evidence.tsx
  12-migration-strategy/
    react-19-migration-gates.tsx
  13-sellerhub-architecture-mapping/
    sellerhub-react-19-boundary-map.tsx
  sellerhub-react-19-actions-lab/
```
</div>

这种组织让每个 `9.x` 核心机制有独立检索入口，并把最终整合项目与单概念练习分开。它没有把新 API 堆进 `App.tsx`，也没有用 `example.tsx` 或 `demo.tsx` 隐藏学习目标。

### 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Final mini project structure</span>
  </div>

```txt
src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/
  sellerhub-action-types.ts
  sellerhub-action-model.ts
  sellerhub-action-workspace.tsx
  sellerhub-compiler-boundary-map.tsx
  sellerhub-react-19-actions-lab.tsx
```
</div>

### 概念示例结构

以下名称只用于错误对比，不代表需要创建文件：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Conceptual snippets</span>
  </div>

```txt
Snippet: dispatcher outside Action scope
Snippet: useFormStatus outside parent form
Snippet: Promise created during render
Snippet: fake Server Function in Vite
Snippet: compiler cannot repair mutation
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
npm run lint
npm run typecheck
npm run test
npm run build
```
</div>

启动后访问 `/react/chapter-14`。`src/App.tsx`、`chapter-14-practice-root.tsx` 和 `chapter-14-practice.css` 只承担挂载与页面 shell，不作为本章核心机制代码展开。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 React 19 Actions：mutation、pending、error、result state

**结论：** Action 是在 transition scope 中执行的 mutation 工作单元。event handler 可以启动 Action，但 handler、Action、Promise 和最终 state commit 是四个不同阶段。

**本节解决的问题：** 传统 click handler 往往手工维护 `isSaving`、错误和结果。Action 把异步工作与 transition pending 协调起来，但业务结果仍应建模为明确 union。

**技术意义：** SellerHub checkout 保存地址时，输入框编辑必须保持 urgent；地址 mutation 可以是 non-blocking Action；已知 validation failure 应进入 result state，未知异常才交给 Error Boundary。

**新关键字和新概念：** Action、transition scope、`useTransition`、pending state、known result error、unknown thrown error。

**边界拆分：**

- Browser 产生 click 和 input event。
- JavaScript 调用 `handleSave`、创建 Promise，并在 `await` 后取得 `nextResult`。
- React `useTransition` 保存该 transition 的 pending 状态；`useState` 分别保存 address 与 Action result snapshot。
- TypeScript 检查 `CheckoutActionResult` discriminated union，但不会验证真实地址。
- 当前 Vite tooling 只编译和打包客户端 Action；没有 server mutation。

**底层机制：** `startAction(async () => ...)` 立即调用 async Action 并把同步安排的工作标记为 transition。因为当前 React 的 async context 在 `await` 后仍要求再次标记 state update，所以 `setResult` 放入内层 `startTransition`。`isPending` 从 Action 开始保持为 `true`，直到 Action 完成并最终 update commit。

**API / 语法规则：**

- `const [isPending, startTransition] = useTransition()`
- `startTransition(action)` 没有返回值。
- Transition 不能控制 text input 的 `value` 更新；输入编辑应保持普通 urgent state。
- `await` 后的 setter 当前需要额外 `startTransition` 才明确属于 transition update。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/01-action-boundary/action-transition-result.tsx</span>
  </div>

```tsx
import { startTransition, useState, useTransition } from 'react'

type CheckoutActionResult =
  | { status: 'idle'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string }

const initialResult: CheckoutActionResult = {
  status: 'idle',
  message: 'No checkout mutation has run.',
}

async function saveCheckoutAddress(address: string): Promise<CheckoutActionResult> {
  await wait(500)

  if (address.trim().length < 5) {
    return {
      status: 'error',
      message: 'Enter a complete delivery address.',
    }
  }

  return {
    status: 'success',
    message: `Saved delivery address: ${address.trim()}`,
  }
}

export function ActionTransitionResult() {
  const [address, setAddress] = useState('12 Market Street')
  const [result, setResult] = useState<CheckoutActionResult>(initialResult)
  const [isPending, startAction] = useTransition()

  function handleSave(): void {
    startAction(async () => {
      const nextResult = await saveCheckoutAddress(address)

      startTransition(() => {
        setResult(nextResult)
      })
    })
  }

  return (
    <section className="chapter14-panel" aria-labelledby="action-boundary-title">
      <p className="chapter14-kicker">9.1 Action boundary</p>
      <h2 id="action-boundary-title">Mutation, pending state, and result state</h2>
      <label className="chapter14-field">
        Delivery address
        <input
          onChange={(event) => setAddress(event.currentTarget.value)}
          value={address}
        />
      </label>
      <button className="chapter14-button" disabled={isPending} onClick={handleSave}>
        {isPending ? 'Saving address...' : 'Save address'}
      </button>
      <p className={`chapter14-result chapter14-result-${result.status}`}>
        {result.message}
      </p>
      <p className="chapter14-note">
        The click handler starts an Action. The async mutation and its result update are
        not the same operation as the click callback itself.
      </p>
    </section>
  )
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}
```
</div>

**逐行解释：** union 让 `result.status` 与 message 成为同一 snapshot；`saveCheckoutAddress` 返回业务结果而不是修改组件变量；`useTransition` 返回 pending flag 与 Action starter；click handler 只启动 Action；内层 `startTransition` 标记 `await` 后的 result update；input `onChange` 仍直接更新 urgent address state。

**执行过程：**

1. 用户编辑 input，browser event 提供 `event.currentTarget.value`，React 产生新的 address snapshot。
2. 用户点击按钮，`handleSave` 读取该次 render closure 中的 address。
3. `startAction` 启动 async Action，`isPending` 变为 `true`。
4. JavaScript 创建 Promise；500ms 后得到 `nextResult` object。
5. 内层 `startTransition` 把 `setResult(nextResult)` 标为 transition update。
6. React commit 新 result snapshot，随后该 Action 的 pending 状态结束。

**变量、引用与 snapshot 变化：** 当前 handler 的 `address` binding 不会被异步过程原地改写；`nextResult` 是新 object；`result` state cell 在 commit 后指向该 object；`isPending` 属于 transition tracking，不是业务结果的属性。

**机制证据链：** click 触发 `handleSave`；JavaScript 调用 `saveCheckoutAddress(address)` 并等待 Promise；React 记录 transition pending 和两个 state cells；TypeScript 只证明 async function 返回 union；短地址返回 `{status:'error'}`，所以 UI 选择 error class。若把 setter 放在 `await` 后且不重新标记 transition，就违反当前 async transition update 的 scope 规则；真实项目中可通过 pending 结束时机和 React transition troubleshooting 识别。

**为什么得到这个结果：** pending 文本来自 React transition 状态，成功或错误文本来自业务 result state，两者 owner 不同。Action 完成不等于业务一定成功；它可以成功返回一个已知 error result。

**对比情况：** 普通 `onClick={async () => ...}` 当然可以执行 Promise，但不会自动提供该 Action 的 transition pending。反过来，把 input `setAddress` 放进 transition 会让受控输入更新不符合 urgent input 规则。

**常见错误为什么错：** 把 Action 当成 event handler 名称会掩盖 transition scope；把 `isPending` 当所有请求的全局状态会混淆 hook instance owner；把已知 validation error 全部 `throw` 会让可恢复业务分支进入 Error Boundary。

**与 SellerHub 的关系：** checkout 地址、login submit 和 seller order mutation 都需要区分“Action 正在执行”和“Action 返回了什么业务结果”。

**与当前学习路径的关系：** 本节把第 4 章 state snapshot、第 6 章 submit feedback、第 9 章 async result 和第 11 章 transition 连接成一个 mutation 模型。

**最终记忆模型：** event 表达用户意图，Action 承载 mutation，transition 提供 pending 调度，result state 表达业务结果；四者不要合并成一个模糊 boolean。

<a id="section-9-2"></a>

### 9.2 useActionState：Action result state 与 sequential queue

**结论：** `useActionState` 保存的是 Action 的返回结果；同一 hook instance 的多次 dispatch 会排入顺序队列，后一次 `previousState` 读取前一次已经返回的 state。

**本节解决的问题：** 快速点击购物车增减按钮时，多个 async mutation 若各自捕获旧 quantity，可能产生 lost update。Action queue 用 previous result 串联每次 transition。

**技术意义：** SellerHub cart quantity 和 seller order status mutation 常要求按 intent 顺序处理。队列顺序与网络完成速度不是同一个概念。

**新关键字和新概念：** `useActionState`、`reducerAction`、`previousState`、Action payload、`dispatchAction`、sequential queue。

**边界拆分：** JavaScript 创建 payload object 和 Promise；React 保存 hook 的 result state、queue 与 pending flag；TypeScript 检查 payload/state 参数关系；browser 只产生 clicks；服务器顺序仍需由真实 API、idempotency 或 version control 保证。

**底层机制：** hook 初始 result 是 `initialQuantityState`。每次 dispatcher 把 payload 加入同一 queue。React 只在前一 Action 完成后把其返回值作为下一次 `previousState`，因此示例中 500ms 的 increase 不会被 250ms 的 decrease 越过。

**固定签名：** `const [state, dispatchAction, isPending] = useActionState(reducerAction, initialState, permalink?)`。`reducerAction(previousState, payload)` 可同步或异步返回同类型 state。程序化 dispatch 必须位于 Action / transition scope。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/02-use-action-state-queue/sequential-action-queue.tsx</span>
  </div>

```tsx
import { startTransition, useActionState, useRef } from 'react'

type QuantityActionState = {
  quantity: number
  completedActions: string[]
}

type QuantityActionPayload = {
  delta: number
  requestId: string
}

const initialQuantityState: QuantityActionState = {
  quantity: 1,
  completedActions: [],
}

async function updateQuantityAction(
  previousState: QuantityActionState,
  payload: QuantityActionPayload,
): Promise<QuantityActionState> {
  await wait(payload.delta > 0 ? 500 : 250)

  return {
    quantity: Math.max(1, previousState.quantity + payload.delta),
    completedActions: [...previousState.completedActions, payload.requestId],
  }
}

export function SequentialActionQueue() {
  const [state, dispatchAction, isPending] = useActionState(
    updateQuantityAction,
    initialQuantityState,
  )
  const nextRequestId = useRef(1)

  function queueQuantityChange(delta: number): void {
    const requestId = `quantity-${nextRequestId.current}`
    nextRequestId.current += 1

    startTransition(() => {
      dispatchAction({ delta, requestId })
    })
  }

  return (
    <section className="chapter14-panel" aria-labelledby="action-queue-title">
      <p className="chapter14-kicker">9.2 useActionState queue</p>
      <h2 id="action-queue-title">Sequential quantity mutations</h2>
      <div className="chapter14-action-row">
        <button
          className="chapter14-button"
          onClick={() => queueQuantityChange(-1)}
          type="button"
        >
          Decrease
        </button>
        <strong className="chapter14-metric">{state.quantity}</strong>
        <button
          className="chapter14-button"
          onClick={() => queueQuantityChange(1)}
          type="button"
        >
          Increase
        </button>
      </div>
      <p className="chapter14-note">
        {isPending
          ? 'The Action queue is processing in dispatch order.'
          : 'Queue multiple changes quickly to observe sequential completion.'}
      </p>
      <ol className="chapter14-compact-list">
        {state.completedActions.map((requestId) => (
          <li key={requestId}>{requestId}</li>
        ))}
      </ol>
    </section>
  )
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}
```
</div>

**逐行解释：** state 与 payload 分开建模；Action 根据 delta 模拟不同 latency；返回 object 使用 `previousState.quantity` 和新 array；ref 只生成不参与渲染的 request ID；`startTransition` 包住 dispatcher；UI 读取当前 result state 和 queue pending。

**执行过程：** 连续点击 increase、decrease 会创建 `quantity-1` 与 `quantity-2` payload。第一个 Action 先读取 quantity 1，返回 2；第二个随后读取 2，再返回 1。即使第二个模拟延迟较短，也不会先消费旧 state。

**变量、引用与 queue 变化：** `nextRequestId.current` 在 handler 中递增但不触发 render；每个 payload 是独立 object；每次返回的 `completedActions` 是新 array；React 保留 hook queue 和最后一次 committed Action result。

**机制证据链：** rapid clicks 创建两个 payload；JavaScript 创建两个 Promise；React 把 payload 放入同一 hook queue 并为第二次调用提供第一次 result；TypeScript 防止漏传 `delta` 或 `requestId`，但不验证 server 是否按序提交；UI list 按 queue 完成顺序增长。若直接调用 dispatcher 而不在 Action scope，违反 dispatcher scope 规则，开发环境会提示 async `useActionState` action 在 transition 外调用。

**为什么得到这个结果：** 顺序来自 React Action queue，不是 500ms 与 250ms timer 自然完成顺序。`previousState` 是 queue 的上一步结果，不是 dispatch 时 closure 中的 quantity。

**对比情况：** 两个独立 `fetch` 加 `setQuantity(capturedQuantity + delta)` 可能都读取同一旧 snapshot；函数式 `setState` 能解决本地累加，但不自动提供 Action result、pending 与 async mutation queue 语义。

**常见错误为什么错：** 误以为 `isPending` 是全局网络状态；把 queue 当成 server transaction；用 mutable array `push` 复用 previous state；在 render 中调用 dispatcher。

**与 SellerHub 的关系：** cart quantity、批量 seller order status 和 checkout retry 都需要识别队列 owner；真正后端仍要设计 request ID、版本号与幂等。

**与当前学习路径的关系：** 这是第 4 章 updater queue 与第 8 章 reducer transition 在异步 mutation 场景中的延伸。

**最终记忆模型：** `useActionState` 的核心不是“多一个 state Hook”，而是 `previous Action result -> queued Action -> next result` 的顺序链。

<a id="section-9-3"></a>

### 9.3 useActionState vs useReducer：side effects 与 pure reducer 边界

**结论：** `useReducer` reducer 必须 pure；`useActionState` 的 reducer Action 可以执行 side effects。两者都接收 previous state，但其调用时机、调度语义和允许行为不同。

**本节解决的问题：** “都有 previous state 和 action，能否在 reducer 里 fetch？”答案取决于 reducer owner。ordinary reducer 可能在开发模式被重复调用以检查纯度；Action reducer 为 mutation 设计，不应与 pure state transition 混用。

**技术意义：** cart draft 的加减是同步 pure transition，保存 cart 是 effectful Action。分开后，render replay 不会重复发送 mutation。

**新关键字和新概念：** pure reducer、effectful reducer Action、Strict Mode purity check、exhaustive action union。

**底层机制：** `dispatchDraft` 只把 `DraftAction` 交给 pure reducer 计算 next draft；`dispatchSave` 在 transition 中调用 async Action，React 保存它的返回结果和 pending。两个 hook cell 不共享 queue。

**固定签名：**

- `const [state, dispatch] = useReducer(reducer, initialArg)`
- `reducer(state, action) -> nextState` 必须 pure。
- `const [state, dispatchAction, isPending] = useActionState(reducerAction, initialState)`
- `reducerAction(previousState, payload) -> State | Promise<State>` 可以执行 mutation side effect。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/03-action-state-vs-reducer/action-reducer-boundary.tsx</span>
  </div>

```tsx
import { startTransition, useActionState, useReducer } from 'react'

type DraftState = {
  quantity: number
}

type DraftAction =
  | { type: 'increment' }
  | { type: 'decrement' }

type SaveState = {
  status: 'idle' | 'saved'
  savedQuantity: number
  saveCount: number
}

function draftReducer(state: DraftState, action: DraftAction): DraftState {
  switch (action.type) {
    case 'increment':
      return { quantity: state.quantity + 1 }
    case 'decrement':
      return { quantity: Math.max(1, state.quantity - 1) }
    default:
      return assertNever(action)
  }
}

async function saveQuantityAction(
  previousState: SaveState,
  quantity: number,
): Promise<SaveState> {
  await wait(450)

  return {
    status: 'saved',
    savedQuantity: quantity,
    saveCount: previousState.saveCount + 1,
  }
}

export function ActionReducerBoundary() {
  const [draft, dispatchDraft] = useReducer(draftReducer, { quantity: 1 })
  const [saveState, dispatchSave, isPending] = useActionState(saveQuantityAction, {
    status: 'idle',
    savedQuantity: 1,
    saveCount: 0,
  } satisfies SaveState)

  function saveDraft(): void {
    startTransition(() => {
      dispatchSave(draft.quantity)
    })
  }

  return (
    <section className="chapter14-panel" aria-labelledby="reducer-action-title">
      <p className="chapter14-kicker">9.3 Reducer and Action boundary</p>
      <h2 id="reducer-action-title">Pure draft transitions and effectful save Actions</h2>
      <div className="chapter14-grid">
        <article className="chapter14-card">
          <h3>useReducer</h3>
          <p>Draft quantity: {draft.quantity}</p>
          <div className="chapter14-action-row">
            <button
              className="chapter14-button"
              onClick={() => dispatchDraft({ type: 'decrement' })}
              type="button"
            >
              Decrease draft
            </button>
            <button
              className="chapter14-button"
              onClick={() => dispatchDraft({ type: 'increment' })}
              type="button"
            >
              Increase draft
            </button>
          </div>
        </article>
        <article className="chapter14-card">
          <h3>useActionState</h3>
          <p>Saved quantity: {saveState.savedQuantity}</p>
          <p>Completed saves: {saveState.saveCount}</p>
          <button
            className="chapter14-button"
            disabled={isPending}
            onClick={saveDraft}
            type="button"
          >
            {isPending ? 'Saving...' : 'Save draft'}
          </button>
        </article>
      </div>
    </section>
  )
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

function assertNever(value: never): never {
  throw new Error(`Unhandled draft action: ${JSON.stringify(value)}`)
}
```
</div>

**逐行解释：** `DraftAction` 是 exhaustive union；`draftReducer` 只做 arithmetic 并返回新 object；`saveQuantityAction` 可以等待 side effect，并从 previous result 增加 `saveCount`；组件分别保存 draft 与 save result；保存按钮把当前 draft snapshot 作为 payload。

**执行过程：** increment 只运行 pure reducer并立即产生 draft snapshot。点击 save 后，handler 读取该 render 的 quantity，Action 等待 450ms，返回新 `SaveState`，React commit saved quantity 和 count。

**变量、引用与 state 变化：** draft state object 和 save result object 属于不同 hook cell；`dispatchDraft` 不产生 Promise；`dispatchSave` 进入 Action queue；`satisfies SaveState` 只检查 initial object，不改变 emitted JavaScript。

**机制证据链：** draft click 创建 `{type:'increment'}`；React 调 pure reducer 得到新 draft object；save click 创建 number payload，Action 创建 Promise 并返回 `SaveState`；TypeScript exhaustively checks `DraftAction` and Action state shape；UI 左侧先变，右侧只在 Action commit 后变。若把 `fetch` 写进 `draftReducer`，就违反 reducer purity，Strict Mode 或 replay 可能重复 effect；代码审查中看到 reducer 内的 timer、network、DOM write 就应识别。

**为什么得到这个结果：** 两个 hook 的 owner、queue 和 contract 不同。相似的 `(previousState, action)` 形状不代表相同 runtime semantics。

**对比情况：** `useReducer` 适合可重复计算的 local transition；`useActionState` 适合需要 pending、side effect 和 returned result 的 mutation。它不是 `useReducer` 的全面替代。

**常见错误为什么错：** 在 ordinary reducer 中写 side effect；把 optimistic reducer 也写成 effectful；认为 Action reducer 在 Strict Mode 中会像 ordinary reducer 一样为 purity 检查重复执行。

**与 SellerHub 的关系：** checkout draft、cart selector 和 UI filters 应保持 pure；真正 save、submit、status mutation 才进入 Action。

**与当前学习路径的关系：** 本节重新使用第 8 章 reducer purity，并说明 React 19 为什么引入不同的 Action reducer contract。

**最终记忆模型：** ordinary reducer 描述“state 如何变”；Action reducer 描述“mutation 完成后 result state 是什么”。前者必须 pure，后者可以有 side effect。

<a id="section-9-4"></a>

### 9.4 form action prop 与 progressive enhancement mental model

**结论：** React 19 允许 `<form action={function}>`。函数接收 `FormData` 并在 Action / transition 中运行；但“JavaScript 未加载时仍可提交”的 progressive enhancement 需要 Server Function 和 framework support，普通 Vite client function 不具备该能力。

**本节解决的问题：** HTML `action="/checkout"`、React `onSubmit` 和 React function `action={submitCheckout}` 是三种不同 contract。不能因为属性名相同就认为 browser 会把 client function 自动发送到 server。

**技术意义：** function action 自动提供 FormData、Action pending 协调和成功后的 uncontrolled form reset；它适合把 form mutation 接入 `useFormStatus`、`useActionState` 与 optimistic UI。

**新关键字和新概念：** form Action prop、`FormData`、uncontrolled field reset、POST semantics、progressive enhancement、permalink。

**边界拆分：**

- Browser 原生 URL action 执行 navigation/request。
- React DOM 识别 function action，在客户端调用它并提供 `FormData`。
- Action 在 transition 中运行；unknown throw 可交给 Error Boundary。
- Server Function action 的 transport、pre-hydration replay 和 permalink 由 framework 提供。
- TypeScript 只知道 action function 接收 `FormData`，不会验证字段内容。

**底层机制：** submitter 触发表单提交后，React DOM 构造 entry list 并调用 function action。示例读取 named controls，等待模拟 mutation，然后在 transition 中提交 result state。因为当前函数是 browser module 中的普通 closure，它没有 server reference ID，也没有 generated network transport。

**固定属性名 / 签名：** `<form action={(formData: FormData) => void | Promise<void>}>`；submit button 可以用 `formAction` 覆盖父 form action。function action 使用 POST semantics；成功后 uncontrolled inputs 会 reset。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/04-form-action-progressive-model/form-action-progressive-boundary.tsx</span>
  </div>

```tsx
import { startTransition, useState } from 'react'

type SubmittedCheckout = {
  email: string
  delivery: string
}

export function FormActionProgressiveBoundary() {
  const [submittedCheckout, setSubmittedCheckout] = useState<SubmittedCheckout | null>(
    null,
  )

  async function submitCheckout(formData: FormData): Promise<void> {
    const email = readFormString(formData, 'email')
    const delivery = readFormString(formData, 'delivery')

    await wait(450)

    startTransition(() => {
      setSubmittedCheckout({ email, delivery })
    })
  }

  return (
    <section className="chapter14-panel" aria-labelledby="form-action-title">
      <p className="chapter14-kicker">9.4 Form Action</p>
      <h2 id="form-action-title">Function action and progressive enhancement boundary</h2>
      <form action={submitCheckout} className="chapter14-form">
        <label className="chapter14-field">
          Email
          <input defaultValue="buyer@example.com" name="email" type="email" />
        </label>
        <label className="chapter14-field">
          Delivery
          <select defaultValue="standard" name="delivery">
            <option value="standard">Standard</option>
            <option value="express">Express</option>
          </select>
        </label>
        <button className="chapter14-button" type="submit">
          Submit checkout model
        </button>
      </form>
      <p className="chapter14-result">
        {submittedCheckout
          ? `${submittedCheckout.email} selected ${submittedCheckout.delivery}.`
          : 'No checkout payload submitted.'}
      </p>
      <p className="chapter14-note">
        This Vite example runs a client Action. Server Function replay and no-JavaScript
        progressive enhancement require a supporting framework runtime.
      </p>
    </section>
  )
}

function readFormString(formData: FormData, fieldName: string): string {
  const value = formData.get(fieldName)
  return typeof value === 'string' ? value : ''
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}
```
</div>

**逐行解释：** `SubmittedCheckout` 是显示结果，不是 server response；action 从 `FormData.get` 得到 `FormDataEntryValue | null`，helper 把它缩窄为 string；uncontrolled fields 用 `defaultValue`；function 直接赋给 `action` 而非 `onSubmit`。

**执行过程：** browser 完成 constraint validation；React DOM 收集 `email` 与 `delivery`；function Action 开始；Promise settled 后 result object 进入 state queue；React commit summary；成功 action 结束后 uncontrolled form control 按 React form contract reset。

**变量、引用与 FormData 变化：** `formData` 是本次提交的 snapshot，不会随 DOM 后续变化；`email` 与 `delivery` 是 string copies；`submittedCheckout` 初始为 null，之后指向新 object；没有 server reference 或 request object。

**机制证据链：** submit button 触发 form；React DOM 创建 `FormData` 并调用 client function；React tracking 将 function action 视为 transition；TypeScript 迫使 helper 处理 null/File 可能性；结果 summary 来自 committed object。若声称该 closure 在 server 运行，就违反 framework boundary；关闭 JavaScript 后该 Vite function 不存在，可直接识别这种伪造。

**为什么得到这个结果：** `action` prop 的值是 function，所以 React DOM 接管，而不是 browser 把 function 序列化成 URL。progressive enhancement 只在 framework 能把 Server Function 变为可提交 endpoint/reference 时成立。

**对比情况：** `onSubmit` 提供 `SubmitEvent` 并通常需要 `preventDefault()`；URL string action 交给 browser navigation；function action 接收 FormData 并进入 React Action path。

**常见错误为什么错：** 忘记 field `name` 会让 FormData 没有该值；把 function action 与 URL action 当成同一 HTTP API；在 Vite 文件里写 `"use server"` 并宣称已有 server execution。

**与 SellerHub 的关系：** checkout 与 login form 可先在 client Action 中学习 result/pending；迁移到 Next.js 时再把真实 mutation 放入受认证的 Server Function boundary。

**与当前学习路径的关系：** 本节承接第 6 章 form submit 和第 13 章 framework boundary。

**最终记忆模型：** function form action 是 React DOM 的 Action contract；Server Function progressive enhancement 是 framework contract，二者不能互相冒充。

<a id="section-9-5"></a>

### 9.5 useFormStatus：最近 form boundary 与 submit button

**结论：** `useFormStatus()` 读取调用组件外层最近 form 的提交状态。它不会读取同一组件随后返回的 form，也不是全局 pending store。

**本节解决的问题：** submit button 常被抽成可复用组件。若把 pending prop 层层传递，会重复 wiring；`useFormStatus` 让按钮直接消费最近 form boundary。

**技术意义：** SellerHub login、checkout 和 seller order forms 可以共享 submit button，但每个按钮只能反映自己的父 form。

**新关键字和新概念：** nearest parent form、`pending`、`data`、`method`、`action`、form status context。

**底层机制：** React DOM 在 form Action pending 时为该 boundary 提供 status value。`SubmitButton` 作为 form child 读取它；form 外组件读取到 not-pending default。`data` 是当前正在提交的 FormData snapshot，而不是组件的永久 form state。

**固定签名：** `const { pending, data, method, action } = useFormStatus()`，无参数。pending 时 `data` 是 `FormData`；没有父级 active form 时 `data` 与 `action` 为 null。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/05-use-form-status-submit-button/form-status-submit-button.tsx</span>
  </div>

```tsx
import { startTransition, useState } from 'react'
import { useFormStatus } from 'react-dom'

type LoginResult = {
  email: string
  message: string
}

export function FormStatusSubmitButton() {
  const [result, setResult] = useState<LoginResult | null>(null)

  async function submitLogin(formData: FormData): Promise<void> {
    const email = readFormString(formData, 'email')
    await wait(600)

    startTransition(() => {
      setResult({
        email,
        message: email ? 'Login request accepted.' : 'Email is required.',
      })
    })
  }

  return (
    <section className="chapter14-panel" aria-labelledby="form-status-title">
      <p className="chapter14-kicker">9.5 useFormStatus</p>
      <h2 id="form-status-title">Nearest form status and submit button</h2>
      <form action={submitLogin} className="chapter14-form">
        <label className="chapter14-field">
          Seller email
          <input defaultValue="seller@example.com" name="email" type="email" />
        </label>
        <SubmitButton />
      </form>
      <p className="chapter14-result">
        {result ? `${result.email}: ${result.message}` : 'No login request submitted.'}
      </p>
    </section>
  )
}

function SubmitButton() {
  const status = useFormStatus()
  const pendingEmail = status.data?.get('email')

  return (
    <div className="chapter14-submit-status">
      <button className="chapter14-button" disabled={status.pending} type="submit">
        {status.pending ? 'Submitting login...' : 'Submit login'}
      </button>
      <span>
        {status.pending && typeof pendingEmail === 'string'
          ? `Submitting ${pendingEmail}`
          : 'The button reads its parent form status.'}
      </span>
    </div>
  )
}

function readFormString(formData: FormData, fieldName: string): string {
  const value = formData.get(fieldName)
  return typeof value === 'string' ? value : ''
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}
```
</div>

**逐行解释：** parent 保存 login result；form action 模拟 mutation；`SubmitButton` 位于 form children 中并调用 `useFormStatus`；optional chaining 处理 not-pending `data === null`；runtime guard 处理 `FormDataEntryValue`。

**执行过程：** submit 开始后，form boundary 发布 pending status；child button render 为 disabled；status data 保存正在提交的 email；Action 完成并 commit result 后，pending 回到 false。

**变量、引用与 status 变化：** `status` 每次 render 反映最近父 form；`pendingEmail` 只在 active submission 中存在；result state 与 form status 是不同 owner，result 在提交完成后仍保留。

**机制证据链：** form submit 创建 FormData；React DOM 将 active status 绑定到该 form；child `SubmitButton` 读取 boundary；TypeScript 要求在渲染 email 前缩窄为 string；所以只有该按钮在该 form pending 时禁用。若 hook 位于 form 外或与 form 同组件但不在其 child subtree，违反 nearest parent boundary 规则；表现为 `pending` 永远 false。

**为什么得到这个结果：** status 通过 React DOM form boundary 向下提供，不按函数声明位置或组件文件名查找。

**对比情况：** `isPending` from `useActionState` 属于某个 Action hook；`useFormStatus().pending` 属于最近 form submission。一个页面可以同时有多个彼此独立的 form status。

**常见错误为什么错：** 在 form 外调用；以为它能追踪任意 `fetch`；读取 `data.get()` 后直接断言 string；把 submit button 放在 portal 或不属于目标 form 的 subtree。

**与 SellerHub 的关系：** checkout submit button、login submit button 和 seller order form button 可以复用 component，但各自读取自己的 form status。

**与当前学习路径的关系：** 本节把第 6 章 pending UI 从手工 boolean 升级为 React DOM form-owned status。

**最终记忆模型：** `useFormStatus` 不是“当前页面是否忙”，而是“最近父 form 当前提交了什么”。

<a id="section-9-6"></a>

### 9.6 useOptimistic：乐观 UI、rollback 与真实结果对齐

**结论：** optimistic state 是 Action pending 期间覆盖 base state 的临时投影，不是真实 server state。Action 成功后必须用 authoritative result 更新 base；失败时 base 不变，optimistic layer 才能消失并回滚。

**本节解决的问题：** 评论提交若等待 server 才显示会显得迟钝；立即把评论永久写入 base state，又会在失败时留下假数据。

**技术意义：** `useOptimistic` 明确区分 confirmed reviews 与 pending projection，并要求 update function pure。

**新关键字和新概念：** base state、optimistic reducer、pending record、rollback、reconciliation、authoritative result。

**底层机制：** `confirmedReviews` 是 base。Action 内调用 `addOptimisticReview` 后，React 把 pending payload 应用到 pure optimistic reducer；Action settled 后，如果 base 更新为 confirmed review，UI 与真实结果对齐；如果 base 不变，临时 layer 被移除。

**固定签名：** `const [optimisticState, addOptimistic] = useOptimistic(value, reducer?)`。reducer `(currentState, optimisticPayload) => nextState` 必须 pure。optimistic setter 必须在 Action / transition 中调用。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/06-use-optimistic-rollback/optimistic-review-reconciliation.tsx</span>
  </div>

```tsx
import { startTransition, useOptimistic, useRef, useState } from 'react'

type Review = {
  id: string
  text: string
  status: 'confirmed' | 'pending'
}

type PendingReview = {
  id: string
  text: string
}

const initialReviews: Review[] = [
  {
    id: 'review-1',
    text: 'Fast delivery and clear product details.',
    status: 'confirmed',
  },
]

export function OptimisticReviewReconciliation() {
  const [confirmedReviews, setConfirmedReviews] = useState(initialReviews)
  const [feedback, setFeedback] = useState('Submit a review. Include fail to test rollback.')
  const nextReviewId = useRef(2)
  const [optimisticReviews, addOptimisticReview] = useOptimistic(
    confirmedReviews,
    (currentReviews, pendingReview: PendingReview): Review[] => [
      ...currentReviews,
      { ...pendingReview, status: 'pending' },
    ],
  )

  async function submitReview(formData: FormData): Promise<void> {
    const text = readFormString(formData, 'review').trim()
    const pendingReview = {
      id: `review-${nextReviewId.current}`,
      text,
    }
    nextReviewId.current += 1
    addOptimisticReview(pendingReview)

    await wait(650)

    if (!text || text.toLowerCase().includes('fail')) {
      startTransition(() => {
        setFeedback('The mutation failed. The optimistic review was rolled back.')
      })
      return
    }

    startTransition(() => {
      setConfirmedReviews((currentReviews) => [
        ...currentReviews,
        { ...pendingReview, status: 'confirmed' },
      ])
      setFeedback('The server result confirmed the optimistic review.')
    })
  }

  return (
    <section className="chapter14-panel" aria-labelledby="optimistic-title">
      <p className="chapter14-kicker">9.6 useOptimistic</p>
      <h2 id="optimistic-title">Optimistic review and reconciliation</h2>
      <form action={submitReview} className="chapter14-form">
        <label className="chapter14-field">
          Product review
          <input name="review" placeholder="Write a short review" />
        </label>
        <button className="chapter14-button" type="submit">
          Add review
        </button>
      </form>
      <ul className="chapter14-list">
        {optimisticReviews.map((review) => (
          <li key={review.id}>
            <strong>{review.text || 'Empty review'}</strong>
            <span>{review.status}</span>
          </li>
        ))}
      </ul>
      <p className="chapter14-note">{feedback}</p>
    </section>
  )
}

function readFormString(formData: FormData, fieldName: string): string {
  const value = formData.get(fieldName)
  return typeof value === 'string' ? value : ''
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}
```
</div>

**逐行解释：** confirmed 与 pending types 分离；ref 生成 stable local ID；optimistic reducer 创建新 array 与 pending record；form action 先投影 pending review，再等待 result；成功分支写入 confirmed base，失败分支不写 base。

**执行过程：** submit 后 pending review 立即出现；650ms 内 base 仍不含它。成功时 base 收到 confirmed record，optimistic output 与 base reconciliation；输入包含 `fail` 时 Action 返回而 base 不变，临时 record 消失。

**变量、引用与 optimistic state 变化：** `pendingReview` object 同时作为 optimistic payload 和成功 result 的基础；optimistic array 是临时 new reference；confirmed array 只有成功分支才产生新 reference；ref counter 不参与 UI。

**机制证据链：** form submit 创建 text 和 pending object；React 在 Action scope 把 payload送入 pure optimistic reducer；JavaScript Promise pending 期间 UI 读取 optimistic array；TypeScript 检查 pending/confirmed union，却不能确认 server 接受评论；失败时 base 没有变化，所以 Action settled 后 UI rollback。若在 Action 外调用 setter，会违反 optimistic scope 规则并出现 warning；若先永久修改 base，rollback 将无来源可恢复。

**为什么得到这个结果：** `useOptimistic` 不拥有 authoritative data，它从传入的 `confirmedReviews` 派生临时 view。Action 是否更新 base 决定最终 reconciliation。

**对比情况：** `useState([...reviews, pending])` 会把临时记录当真实 state；server-state cache 负责跨请求缓存、失效和重试，`useOptimistic` 不具备这些职责。

**常见错误为什么错：** optimistic reducer 做 side effect；没有 stable optimistic ID；失败时仍更新 base；把 optimistic array 当 server truth；没有区分 pending item 与 confirmed item。

**与 SellerHub 的关系：** cart quantity、product review 和 seller order status 都可以 optimistic，但支付、库存和权限结果必须以 server confirmation 为准。

**与当前学习路径的关系：** 本节把第 4 章 immutable array update、第 9 章 async lifecycle 和第 13 章 server/client result boundary 合并。

**最终记忆模型：** optimistic UI 是“等待期间的可撤销投影”；真实 result 才决定 base state。

<a id="section-9-7"></a>

### 9.7 use API：Promise / context、Suspense 与 cached Promise

**结论：** `use(resource)` 可以读取 context 或 cached Promise。`use` 不是普通 Hook：它可以在 condition/loop 中调用，但仍必须在 component 或 custom Hook 内；`use(promise)` pending 时会 suspend。

**本节解决的问题：** 看到 `use` 可以条件调用后，容易误以为所有 Hook rules 都取消了；看到 `use(Promise)` 后，又容易在 render 中每次 `fetch()` 创建新 Promise，导致反复 fallback。

**技术意义：** SellerHub dashboard 可以把 framework-created cached Promise 交给 client boundary；当前 Vite 项目没有 Suspense-compatible data source，因此只真实运行 `use(context)`，Promise 路径明确作为模型。

**新关键字和新概念：** usable resource、cached Promise identity、suspend、Suspense fallback、Error Boundary、conditional context read。

**边界拆分：**

- JavaScript Promise 只有 pending/fulfilled/rejected 状态，不知道 React Suspense。
- React `use(promise)` 在 pending 时挂起 component render，并把控制权交给最近 Suspense。
- React `use(context)` 读取最近 provider value。
- Framework/cache layer 负责复用 Promise instance；TypeScript 只检查 `Usable<T>`。
- Error Boundary 处理 rejected Promise；不能用 try/catch 包住 `use(promise)`。

**底层机制：** component render 遇到 pending cached Promise 时不能完成该 subtree，React 展示 boundary fallback；同一 Promise fulfilled 后重试 render，`use` 返回 resolved value。若每次 render 创建新 Promise，重试时又遇到新 pending identity，fallback 可能反复出现。

**固定签名：** `const value = use(resource)`。context 路径可以 conditionally call；Promise 必须 cached 并复用同一 instance。`use` 不能在 try/catch 中调用。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/07-use-api-suspense-promise/use-api-resource-boundary.tsx</span>
  </div>

```tsx
import { createContext, use, useState } from 'react'

type ThemeName = 'light' | 'contrast'

const ThemeContext = createContext<ThemeName>('light')

const promiseBoundaryRows = [
  {
    source: 'Framework-created cached Promise',
    behavior: 'use(promise) can suspend and let Suspense show its fallback.',
    currentProject: 'Mechanism model only',
  },
  {
    source: 'Promise created during client render',
    behavior: 'A new identity can suspend again on every render.',
    currentProject: 'Do not use',
  },
  {
    source: 'Context object',
    behavior: 'use(context) reads the nearest provider and may be conditional.',
    currentProject: 'Runnable below',
  },
]

export function UseApiResourceBoundary() {
  const [theme, setTheme] = useState<ThemeName>('light')
  const [showTheme, setShowTheme] = useState(true)

  return (
    <section className="chapter14-panel" aria-labelledby="use-api-title">
      <p className="chapter14-kicker">9.7 use API</p>
      <h2 id="use-api-title">Context reading and cached Promise boundary</h2>
      <ThemeContext value={theme}>
        <div className="chapter14-action-row">
          <button
            className="chapter14-button"
            onClick={() =>
              setTheme((currentTheme) =>
                currentTheme === 'light' ? 'contrast' : 'light',
              )
            }
            type="button"
          >
            Toggle theme
          </button>
          <button
            className="chapter14-button"
            onClick={() => setShowTheme((currentValue) => !currentValue)}
            type="button"
          >
            Toggle context read
          </button>
        </div>
        <ThemeReader shouldRead={showTheme} />
      </ThemeContext>
      <div className="chapter14-table" role="table" aria-label="use resource boundaries">
        {promiseBoundaryRows.map((row) => (
          <div className="chapter14-table-row" key={row.source} role="row">
            <strong role="cell">{row.source}</strong>
            <span role="cell">{row.behavior}</span>
            <span role="cell">{row.currentProject}</span>
          </div>
        ))}
      </div>
      <p className="chapter14-note">
        This Vite project does not pretend to provide a framework-cached Promise source.
      </p>
    </section>
  )
}

function ThemeReader({ shouldRead }: { shouldRead: boolean }) {
  if (!shouldRead) {
    return <p className="chapter14-result">Context reading is skipped in this branch.</p>
  }

  const theme = use(ThemeContext)
  return <p className="chapter14-result">Nearest theme context: {theme}</p>
}
```
</div>

**逐行解释：** context 默认值与 union type 明确；`promiseBoundaryRows` 只显示机制，不创建 Promise；provider 使用 React 19 context provider shorthand；`ThemeReader` 在 early return 后 conditionally 调用 `use(ThemeContext)`，这是 `use` 的明确例外。

**执行过程：** toggle theme 更新 provider state；下一次 render 产生新 context value；`ThemeReader` 若启用读取，就获得 nearest provider value。toggle read 为 false 时直接返回，不调用 `use`。

**变量、引用与 resource 变化：** theme 是 React state snapshot；context object identity 固定在 module scope；provider value 在 light/contrast 间变化；Promise 表格没有创建或执行任何 resource。

**机制证据链：** click 更新 `showTheme` 或 `theme`；React 读取同一 Context object 并定位 provider；TypeScript 确认返回 `ThemeName`；UI 显示当前 provider value。Promise 路径中，framework 必须提供 stable Promise identity，React 才能从 pending fallback 重试到 fulfilled value。若 render 中 `fetch()`，每次创建新 Promise，违反 cached identity rule；可通过 uncached Promise warning 和持续 fallback 识别。

**为什么得到这个结果：** `use(context)` 的值来自 component tree，而不是 lexical import；`use(promise)` 的结果来自 Promise state，但 React 通过 Promise identity 关联 suspension。

**对比情况：** `useContext` 必须遵守普通 Hook top-level order；`use` 可以 conditionally read，但仍不能在普通 function、event handler 或 try/catch 中随意调用。

**常见错误为什么错：** render 内创建 Promise；try/catch 包 `use(promise)`；把 Effect fetch 当 Suspense data source；认为 TypeScript 的 `Promise<Product[]>` 保证 response runtime shape。

**与 SellerHub 的关系：** future Next.js dashboard 可由 Server Component 创建/传递 framework-supported resource；当前 Vite chapter 只练习 context read 和 resource owner 判断。

**与当前学习路径的关系：** 本节承接第 8 章 Context、第 9 章 Promise lifecycle、第 11 章 Suspense 和第 13 章 server/client resource boundary。

**最终记忆模型：** `use` 读取 resource；Promise identity 决定 suspension 是否可收敛；cache owner 不属于 `use` 本身。

<a id="section-9-8"></a>

### 9.8 Server Functions / Server Actions framework boundary

**结论：** Server Function 是 framework 将 `"use server"` function 转换成 client-callable server reference 后形成的能力。传入 Action prop 或在 Action 中调用时，它是 Server Action；并非所有 Server Function 都是 Server Action。

**本节解决的问题：** 在普通 Vite function 内写 `"use server"` 不会创建 server endpoint、鉴权、serialization 或 database execution。

**技术意义：** SellerHub checkout 与 seller order mutation 将来可以迁移到 framework Server Function，但授权与输入验证必须在 server runtime 重新执行。

**新关键字和新概念：** `"use server"`、server reference、generated transport、serializable arguments/result、Server Action naming。

**边界拆分：**

- React 定义 Server Function semantics。
- RSC framework/bundler 识别 directive 并生成 server reference。
- Browser 调用 reference 时由 framework 发送 network request。
- Server runtime 执行真实 function。
- TypeScript 不提供 authorization 或 runtime validation。

**底层机制：** 构建阶段把 function implementation 留在 server graph，并把可序列化 reference 放入 client graph。调用 reference 时，framework serializes arguments，定位 server function，执行后再 serialize result。当前 Vite plugin 没有这一 transform。

**API / 语法规则：** `"use server"` 可位于 async function body 开头或 server-only module 开头；client 调用参数和返回值必须符合 framework 支持的 serialization contract。安全检查仍应在函数内部完成。

**当前 Vite 运行声明：** 本节没有在当前 Vite 项目中运行 framework-only API，重点是 React 19 API boundary 和架构机制。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/08-server-functions-boundary/server-function-boundary-map.tsx</span>
  </div>

```tsx
const serverFunctionBoundaries = [
  {
    step: 'Define',
    frameworkOwner: 'A framework transforms a function marked with "use server".',
    viteReality: 'No Server Function transform is configured.',
  },
  {
    step: 'Reference',
    frameworkOwner: 'The client receives a serializable server reference.',
    viteReality: 'A local async function remains ordinary browser JavaScript.',
  },
  {
    step: 'Invoke',
    frameworkOwner: 'The framework sends serialized arguments to the server runtime.',
    viteReality: 'No generated network request or server execution exists.',
  },
  {
    step: 'Return',
    frameworkOwner: 'The framework serializes the result back to React.',
    viteReality: 'The lab only renders this architecture map.',
  },
]

export function ServerFunctionBoundaryMap() {
  return (
    <section className="chapter14-panel" aria-labelledby="server-function-title">
      <p className="chapter14-kicker">9.8 Server Functions</p>
      <h2 id="server-function-title">Framework-owned server execution</h2>
      <div className="chapter14-grid">
        {serverFunctionBoundaries.map((boundary) => (
          <article className="chapter14-card" key={boundary.step}>
            <span className="chapter14-pill">{boundary.step}</span>
            <h3>{boundary.frameworkOwner}</h3>
            <p>{boundary.viteReality}</p>
          </article>
        ))}
      </div>
      <p className="chapter14-note">
        Server Functions are stable React features, but implementing their transport and
        bundler integration belongs to a framework. This Vite lab does not fake that runtime.
      </p>
    </section>
  )
}
```
</div>

**逐行解释：** static array 把 define、reference、invoke、return 四步拆开；每一项同时写 framework owner 与当前 Vite reality；component 只 map 成 cards，没有 directive、network 或 server import。

**执行过程：** 当前运行时仅执行 array map 和 React DOM render。真实 framework 中则是 build transform 先生成 reference，browser invocation 再触发 server request。

**变量、引用与 serialization 变化：** 本例 `serverFunctionBoundaries` 是普通 client array；真实 Server Function client value 不是 implementation closure，而是 framework reference；arguments/result 需要 serialization。

**机制证据链：** build tool 遇到 directive；framework 分离 module graph 并生成 reference；browser 调 reference；server 执行 mutation；React 接收 serialized result；TypeScript 只检查声明类型。当前 Vite 缺少第二步，所以后续步骤不存在。若 local async function 直接 import database secret 或宣称 server-only，就违反 module/runtime boundary；检查 bundle 和 network 即可识别。

**为什么得到这个结果：** directive 本身不含 transport implementation；framework 才是 reference、request routing 和 server execution 的 owner。

**对比情况：** client Action 可以在 Vite browser 中运行；Server Function Action 必须在 framework server 上运行。API route 是显式 Request/Response boundary，Server Function 是 framework-generated function call boundary。

**常见错误为什么错：** 把 `"use server"` 当 Server Component 标记；传 function、DOM node 或其他不可序列化对象；仅在 client 验证权限；把 Server Function stable feature 与其 framework bundler implementation stability混为一谈。

**与 SellerHub 的关系：** future Next.js checkout、seller order update 和 review submit 可放在 Server Function；当前项目只定义 boundary，绝不接入 database。

**与当前学习路径的关系：** 这是第 13 章 Server Component / Client Component serialization 的 mutation 方向延伸。

**最终记忆模型：** `"use server"` 是 framework 编译入口，不是 network 魔法字符串；Server Function 的本质是 server implementation + client reference + generated transport。

<a id="section-9-9"></a>

### 9.9 ref as prop、document metadata 与 static APIs 边界

**结论：** React 19 function component 可以把 `ref` 作为 prop 接收并转交 DOM node；metadata tags 可由 component 输出到 document head；`prerender` / `resume` 等 static/server APIs 则面向 framework 或 server pipeline。

**本节解决的问题：** 三组 React 19 能力都与“输出边界”有关，但 owner 不同：ref 指向 imperative DOM handle，metadata 产生 document output，static APIs 生成或恢复 server HTML stream。

**技术意义：** SellerHub search input 可以用 ref as prop 聚焦；product page metadata 属于 document output；static generation 应由 future framework 入口调用，而不是普通 ProductCard。

**新关键字和新概念：** ref as prop、DOM ref、metadata hoisting、`prerender`、`resume`、static/server rendering entrypoint。

**底层机制：** React commit 把 DOM node 写入 ref；event handler 读取 `ref.current` 并调用 browser `focus()`。React DOM 识别 `<title>` 与 `<meta>` 并放到 head。static APIs 接收完整 React tree，在 server/build environment 生成 stream，当前 client component 不调用它们。

**固定签名 / 属性：** function component props 可声明 `ref?: Ref<HTMLInputElement>`；DOM element 使用 `ref={ref}`；metadata 使用 `<title>` / `<meta>`；`prerender(reactNode, options?)` 来自 `react-dom/static`，`resume(reactNode, postponedState, options?)` 来自 server rendering entrypoint。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/09-ref-metadata-static-apis/react-19-platform-boundaries.tsx</span>
  </div>

```tsx
import { useRef } from 'react'
import type { Ref } from 'react'

type SearchInputProps = {
  label: string
  ref?: Ref<HTMLInputElement>
}

const platformBoundaries = [
  {
    feature: 'ref as prop',
    owner: 'React runtime and React DOM',
    currentProject: 'Runnable',
  },
  {
    feature: 'title and meta',
    owner: 'React DOM document output',
    currentProject: 'Runnable',
  },
  {
    feature: 'prerender and resume',
    owner: 'Framework or server build pipeline',
    currentProject: 'Mechanism model only',
  },
]

export function React19PlatformBoundaries() {
  const searchInputRef = useRef<HTMLInputElement>(null)

  function focusSearch(): void {
    searchInputRef.current?.focus()
  }

  return (
    <section className="chapter14-panel" aria-labelledby="platform-boundary-title">
      <title>React 19 Actions and Compiler Practice</title>
      <meta
        content="React 19 Actions, use API, and Compiler boundary practice."
        name="description"
      />
      <p className="chapter14-kicker">9.9 React 19 platform boundaries</p>
      <h2 id="platform-boundary-title">Ref, metadata, and static API ownership</h2>
      <SearchInput label="Seller search" ref={searchInputRef} />
      <button className="chapter14-button" onClick={focusSearch} type="button">
        Focus seller search
      </button>
      <div className="chapter14-grid">
        {platformBoundaries.map((boundary) => (
          <article className="chapter14-card" key={boundary.feature}>
            <h3>{boundary.feature}</h3>
            <p>{boundary.owner}</p>
            <span className="chapter14-pill">{boundary.currentProject}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function SearchInput({ label, ref }: SearchInputProps) {
  return (
    <label className="chapter14-field">
      {label}
      <input placeholder="Search orders" ref={ref} />
    </label>
  )
}
```
</div>

**逐行解释：** `Ref<HTMLInputElement>` 描述可接受的 ref shape；parent 创建 ref object；child destructures `ref` 并传给 input；handler 才读取 `current`；title/meta 作为 JSX 输出；static API 仅出现在 boundary data 中。

**执行过程：** render 创建 input description；commit 后 React DOM 把真实 input node 写入 ref；点击 focus 时 browser `HTMLElement.focus()` 执行；React DOM 同时维护 title/meta 的 head output。

**变量、引用与 document output 变化：** `searchInputRef` object identity 跨 render 保持；`current` 从 null 变成 DOM node；它的变化不触发 render。metadata 进入 document head，不进入 component state。static rows 不调用任何 server API。

**机制证据链：** React commit 写 ref；click handler 读取 DOM node；browser focus 改变 active element；TypeScript 确认 node 类型，却不保证 commit 前非 null。metadata JSX 由 React DOM relocation/deduplication rules处理。若 render 中读取 `ref.current`，违反 refs lint；若从 component 调 `prerender`，违反 server entrypoint owner；可从 lint 和 browser bundle import 识别。

**为什么得到这个结果：** ref 是 imperative handle，不是 UI snapshot；metadata 是 document output，不是 local state；static APIs 是 whole-document server output，不是 leaf component utility。

**对比情况：** React 18 常用 `forwardRef`；React 19 新 function component 可直接接收 ref prop，但 class refs 和 `useImperativeHandle` 仍有各自 contract。

**常见错误为什么错：** 认为 ref as prop 让 ref 变成普通 serializable data；用 metadata state 控制业务 UI；在 Vite client bundle import server static API；把 experimental `resumeAndPrerender` 当所有环境的默认能力。

**与 SellerHub 的关系：** search focus 是 DOM imperative boundary；Product detail title/description 是 document output；catalog SSG/partial prerender 应交给 future framework。

**与当前学习路径的关系：** 本节复用第 7 章 ref、第 13 章 metadata/server runtime 和本章 React 19 output changes。

**最终记忆模型：** ref 指向 committed DOM，metadata描述 document，static APIs生成 server HTML；三者都不是普通 client state。

<a id="section-9-10"></a>

### 9.10 React Compiler：automatic memoization 的真实目标

**结论：** React Compiler 是 build-time optimizer，目标是自动复用 component output 和 expensive render calculations，减少手写 `memo`、`useMemo`、`useCallback`。它不阻止 React render，也不改变 state/props/context 是 UI 输入的模型。

**本节解决的问题：** “Compiler 会自动 memoize”常被误读成“不再需要理解 render”或“所有 function 都会缓存”。Compiler 只分析 component 和 Hook，并在满足规则时生成 memoization。

**技术意义：** SellerHub ProductCard 和 OrderRow 可以成为 compiler candidates，但必须先以 Profiler 证明性能问题，并保持业务逻辑正确。

**新关键字和新概念：** automatic memoization、compiler candidate、build-time transform、bailout、generated cache slot、update performance。

**边界拆分：**

- React runtime 仍按 state/props/context 调用 component。
- Compiler 在 build 阶段分析 AST/HIR、data flow 与 mutability。
- Bundler 接收 compiler output。
- ESLint 提前暴露违反 Rules of React 的模式。
- TypeScript typecheck 与 Compiler optimization 是独立 gate。

**底层机制：** Compiler 识别 component render 中哪些 value/JSX 可以在输入未变时复用，并生成等价 memoization。若分析发现不支持或不安全的 pattern，通常跳过该 component，而不是修复语义。

**当前项目配置：** `package.json` 没有 `babel-plugin-react-compiler`，`vite.config.ts` 只有 `@vitejs/plugin-react`。所以下方 component 正常 render，但没有 compiler-generated memoization。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/10-react-compiler-goal/compiler-optimization-model.tsx</span>
  </div>

```tsx
import { useState } from 'react'

type Product = {
  id: string
  name: string
  category: string
}

const products: Product[] = [
  { id: 'product-1', name: 'Desk Lamp', category: 'Lighting' },
  { id: 'product-2', name: 'Travel Mug', category: 'Kitchen' },
  { id: 'product-3', name: 'Task Chair', category: 'Office' },
]

const compilerSetup = {
  configured: false,
  runtimeBehavior: 'The component renders normally without compiler-generated memoization.',
  buildBehavior: 'Vite transforms TSX, but no React Compiler plugin runs.',
}

export function CompilerOptimizationModel() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery),
  )

  return (
    <section className="chapter14-panel" aria-labelledby="compiler-goal-title">
      <p className="chapter14-kicker">9.10 React Compiler goal</p>
      <h2 id="compiler-goal-title">Automatic memoization without changing render semantics</h2>
      <label className="chapter14-field">
        Product filter
        <input
          onChange={(event) => setQuery(event.currentTarget.value)}
          value={query}
        />
      </label>
      <ul className="chapter14-list">
        {visibleProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <span>{product.category}</span>
          </li>
        ))}
      </ul>
      <p className="chapter14-note">{compilerSetup.runtimeBehavior}</p>
      <p className="chapter14-note">{compilerSetup.buildBehavior}</p>
    </section>
  )
}
```
</div>

**逐行解释：** products 是 module constant；query 是 render input；normalizedQuery 与 visibleProducts 在每次 render 计算；没有手写 memoization；`compilerSetup` 明确当前工具链事实。

**执行过程：** input event 更新 query state；React 调 component 生成 next JSX；filter 运行并产生新 array；React reconciliation/commit 更新 list。当前 build 不增加 cache check。

**变量、引用与 compiler candidate 变化：** `query` 每次 render 是新 binding；`visibleProducts` 每次是新 array。若 Compiler 已配置并判断依赖安全，它可以缓存 calculation/JSX；当前项目没有该 transform，不能声称复用发生。

**机制证据链：** input event 创建 string；React state cell 保存 query；render 调 `filter`；TypeScript 检查 Product fields；Vite 仅执行 TSX transform；所以 runtime 每次 query update 都重新计算。Compiler setup 缺失意味着不存在 compiler candidate result或 DevTools Memo badge。若报告“Compiler 已优化”，但依赖和 build config 中没有 compiler plugin，就是 tooling evidence 与结论冲突。

**为什么得到这个结果：** automatic memoization 是 generated output，不是 React 19 runtime 自动开启。安装 React 19 并不等于启用 Compiler。

**对比情况：** 手写 `useMemo` 明确创建 runtime Hook cache；Compiler 在 build time 自动生成等价 reuse。两者都不能保证昂贵 non-React utility 在多个 component 间共享缓存。

**常见错误为什么错：** 不 profile 就删除 manual memo；把 Compiler 当 correctness tool；认为 child 不再 render；认为 compiler 会修复 unstable key 或 state owner。

**与 SellerHub 的关系：** ProductCard、OrderRow 和 dashboard calculation 是候选；checkout mutation correctness 与 authorization 不属于 compiler。

**与当前学习路径的关系：** 本节承接第 11 章 performance evidence，并把 manual optimization 放入 build-time migration 视角。

**最终记忆模型：** Compiler 优化“正确且可分析的 render”，不定义什么是正确业务架构。

<a id="section-9-11"></a>

### 9.11 Compiler rules、directives 与 lints：purity / immutability / unsupported syntax

**结论：** Compiler 能否优化取决于可证明的数据流。`purity`、`immutability`、`refs`、`set-state-in-render`、`static-components`、`unsupported-syntax` 和 `preserve-manual-memoization` 是可优化性与正确性的证据。

**本节解决的问题：** Compiler diagnostic 不一定让整个 build 失败；很多情况下 Compiler 会跳过有问题的 component。忽略 lint 会降低 optimization coverage，也可能暴露原有 runtime bug。

**技术意义：** 当前项目没有 Compiler，但 `eslint-plugin-react-hooks@7.0.1` 的 recommended preset 已能运行 compiler-related lints，适合作为迁移前基线。

**新关键字和新概念：** Compiler bailout、lint evidence、`"use memo"`、`"use no memo"`、annotation mode、preserve manual memoization。

**底层机制：** lint 在 source level 识别已知危险 pattern；Compiler 构建更完整的数据流模型。directive 位于 module 或 function prologue，只有 Compiler 读取时才控制 opt-in/opt-out；JavaScript runtime 不会因此自动 memoize。

**固定 directive / lint name：**

- `"use memo"`：在 annotation mode 显式请求编译。
- `"use no memo"`：临时退出 compilation，用于隔离问题。
- directives 必须位于 module 或 function 的 directive prologue。
- lints 使用准确规则名，不用自造“compiler-safe”通用标签。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/11-compiler-rules-lints/compiler-rule-evidence.tsx</span>
  </div>

```tsx
type CompilerRuleEvidence = {
  lint: string
  violation: string
  safeDirection: string
}

const compilerRuleEvidence: CompilerRuleEvidence[] = [
  {
    lint: 'purity',
    violation: 'Date.now() or Math.random() during render',
    safeDirection: 'Read changing values in events or external synchronization boundaries.',
  },
  {
    lint: 'immutability',
    violation: 'Mutating props, state, or captured values',
    safeDirection: 'Create a new object or array for the next snapshot.',
  },
  {
    lint: 'refs',
    violation: 'Reading or writing ref.current during render',
    safeDirection: 'Use refs from event handlers or effects.',
  },
  {
    lint: 'set-state-in-render',
    violation: 'Unconditional state setter call during render',
    safeDirection: 'Derive the value or update it from an event.',
  },
  {
    lint: 'static-components',
    violation: 'Defining a component inside another component',
    safeDirection: 'Keep component definitions at module scope.',
  },
  {
    lint: 'unsupported-syntax',
    violation: 'Dynamic scope or eval that blocks static analysis',
    safeDirection: 'Use explicit data flow and supported syntax.',
  },
  {
    lint: 'preserve-manual-memoization',
    violation: 'Incomplete dependencies on existing manual memoization',
    safeDirection: 'Keep complete dependencies and remove memoization only with evidence.',
  },
]

export function CompilerRuleEvidencePanel() {
  return (
    <section className="chapter14-panel" aria-labelledby="compiler-lints-title">
      <p className="chapter14-kicker">9.11 Compiler rules and lints</p>
      <h2 id="compiler-lints-title">Static analysis evidence before compiler adoption</h2>
      <div className="chapter14-table" role="table" aria-label="Compiler lint evidence">
        {compilerRuleEvidence.map((rule) => (
          <div className="chapter14-table-row" key={rule.lint} role="row">
            <strong role="cell">{rule.lint}</strong>
            <span role="cell">{rule.violation}</span>
            <span role="cell">{rule.safeDirection}</span>
          </div>
        ))}
      </div>
      <p className="chapter14-note">
        The current project runs the recommended eslint-plugin-react-hooks preset, but it
        does not run React Compiler.
      </p>
    </section>
  )
}
```
</div>

**逐行解释：** type 固定 lint evidence shape；每条 row 指向具体 violation 与修复方向；component 使用 stable lint name 作为 key；最后明确 lint 与 compiler 的实际配置差异。

**执行过程：** 当前 runtime 只 map rows。执行 `npm run lint` 时，ESLint 读取 `reactHooks.configs.flat.recommended` 并运行规则；执行 `npm run build` 时，Vite 不运行 Compiler transform。

**变量、引用与 analysis 变化：** `compilerRuleEvidence` 是 stable module array；没有 compiler candidate object。lint result 来自 tooling process，不进入 React state；修复 source 后下一次 lint 才重新产生 evidence。

**机制证据链：** developer 运行 lint；ESLint parser 创建 AST；plugin rule 找到 render 中的 impure call、mutation 或 nested component；TypeScript 可能仍认为类型合法；lint 报告具体 source location；若未来启用 Compiler，对应 component 可能 bailout。若把 `"use memo"` 加到不纯 component，仍违反 purity；directive 不能覆盖 correctness rule。

**为什么得到这个结果：** 类型合法只代表 shape compatible；静态可优化还要求 render semantics、mutation flow 和 component identity满足 React rules。

**对比情况：** Compiler error 可能是 tooling bug；runtime difference 可能来自原代码依赖 memoization for correctness。调试时可临时 `"use no memo"` 隔离，但应修根因并移除 directive。

**常见错误为什么错：** 为提高 coverage 一次性关闭 lints；删除已有 memoization 但不跑 tests；在 parent render 内定义 child；用 `Date.now()` 生成 UI；将 lint PASS 等同于 Compiler 已运行。

**与 SellerHub 的关系：** ProductCard 需要 pure props -> JSX；OrderRow existing memo dependencies 必须完整；cart state update 必须 immutable；DOM ref 只在 handler/effect 使用。

**与当前学习路径的关系：** 本节连接第 7 章 refs/purity、第 11 章 memoization 和第 12 章 lint gate。

**最终记忆模型：** lint 是 compiler-readiness evidence，不是 compiler output；directive 是 compilation control，不是规则豁免。

<a id="section-9-12"></a>

### 9.12 Migration strategy：从手动 memo 到 compiler-friendly codebase

**结论：** React 19 API 与 Compiler 应渐进迁移。先固定行为和性能基线，再通过 lint/typecheck/test/build，随后按 feature boundary 引入 Action，最后在独立变更中配置 Compiler。

**本节解决的问题：** 一次性升级 API、删除 manual memoization、启用 Compiler，会让行为 regression、performance change 与 tooling problem 无法归因。

**技术意义：** migration 是 evidence management，不是语法替换。Chapter 12 gates 与 Chapter 11 Profiler 是 migration 输入。

**新关键字和新概念：** baseline、incremental adoption、annotation mode、gating、rollback plan、manual memo preservation。

**底层机制：** 每次迁移只改变一个 owner：先 client mutation contract，再 compiler build transform。quality gates 对相同 source 分别检查 rules、types、behavior、bundle；Profiler 比较 render evidence。

**API / 语法规则：** 本节没有新 runtime API，重点是职责边界和运行时机制。Compiler 官方支持目录、annotation directive 或 gating 等渐进方式，但本章不添加配置。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/12-migration-strategy/react-19-migration-gates.tsx</span>
  </div>

```tsx
import { useState } from 'react'

type MigrationGate = {
  id: string
  label: string
  evidence: string
}

const migrationGates: MigrationGate[] = [
  {
    id: 'baseline',
    label: 'Record current behavior and performance evidence',
    evidence: 'Chapter 11 Profiler and existing behavior tests',
  },
  {
    id: 'quality',
    label: 'Pass lint, typecheck, test, and build',
    evidence: 'Chapter 12 quality gates',
  },
  {
    id: 'actions',
    label: 'Adopt one Action boundary at a time',
    evidence: 'Pending, result, error, and rollback behavior',
  },
  {
    id: 'compiler',
    label: 'Enable compiler only after a separate configuration review',
    evidence: 'No compiler package is installed in this chapter',
  },
  {
    id: 'memo',
    label: 'Remove manual memoization only after profiling and tests',
    evidence: 'preserve-manual-memoization remains a migration signal',
  },
]

export function React19MigrationGates() {
  const [completedGateIds, setCompletedGateIds] = useState<string[]>([])

  function toggleGate(gateId: string): void {
    setCompletedGateIds((currentIds) =>
      currentIds.includes(gateId)
        ? currentIds.filter((currentId) => currentId !== gateId)
        : [...currentIds, gateId],
    )
  }

  return (
    <section className="chapter14-panel" aria-labelledby="migration-title">
      <p className="chapter14-kicker">9.12 Migration strategy</p>
      <h2 id="migration-title">Quality gates before API and compiler rollout</h2>
      <ul className="chapter14-checklist">
        {migrationGates.map((gate) => (
          <li key={gate.id}>
            <label>
              <input
                checked={completedGateIds.includes(gate.id)}
                onChange={() => toggleGate(gate.id)}
                type="checkbox"
              />
              <span>
                <strong>{gate.label}</strong>
                <small>{gate.evidence}</small>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <p className="chapter14-note">
        Completed gates: {completedGateIds.length} / {migrationGates.length}
      </p>
    </section>
  )
}
```
</div>

**逐行解释：** migration gate 是 typed data；completed IDs 是 UI state；functional updater 基于 current IDs 返回新 array；checkbox 只演示 checklist progress，不执行真实 install 或 config。

**执行过程：** click checkbox 创建 gate ID intent；React updater 检查 membership；filter 或 spread 产生新 array；commit 更新 checked state 与 count。没有 package install 或 build config mutation。

**变量、引用与 migration evidence 变化：** `migrationGates` 不变；`completedGateIds` 每次 toggle 是新 array；勾选状态只是学习 UI，不等于实际 gate pass，真实证据必须来自 command output。

**机制证据链：** click 触发 toggle；JavaScript 创建 next array；React state snapshot 更新 checklist；TypeScript 限制 IDs 为 string 但不验证 command；实际 migration 只有在 lint/typecheck/test/build 和 Profiler evidence存在时才成立。若不跑 gates 就删除 memoization，违反 evidence-first migration；表现为无法判断 regression 来源。

**为什么得到这个结果：** UI checklist 只记录选择，工程 gate 由独立工具执行。React state 不能替代 CI/terminal evidence。

**对比情况：** 新项目可直接配置 Compiler；已有 SellerHub 应按目录/feature渐进 rollout，并保留 opt-out 与 rollback。即使 Compiler stable，也不代表所有 legacy code 无需审计。

**常见错误为什么错：** React upgrade、Action migration、Compiler install 同一批完成；看到 lint warning 就批量 disable；先删除 memo 再 profile；只跑 build 不跑 behavior tests。

**与 SellerHub 的关系：** 先迁移 checkout 单个 Action，再 cart optimistic，再考虑 ProductCard/OrderRow compiler candidates；每步都有可回退边界。

**与当前学习路径的关系：** 第 11 章提供 performance evidence，第 12 章提供 gates，本节把它们变成 migration protocol。

**最终记忆模型：** 先证明行为，再改变机制；先小范围 Action，再独立启用 Compiler。

<a id="section-9-13"></a>

### 9.13 SellerHub React 19 Actions 与 Compiler architecture mapping

**结论：** SellerHub 不应“全站使用 Actions/Compiler”，而应按 mutation、resource、document、server 和 optimization owner 映射。

**本节解决的问题：** 新 API 很容易被当成统一架构答案。checkout、cart、review、seller order、ProductCard 与 dashboard resource 的 failure mode 不同。

**技术意义：** architecture map 先定义 current Vite owner 和 future framework boundary，避免在学习项目中提前伪造 backend 或 Compiler。

**新关键字和新概念：** scenario mapping、current owner、future boundary、interactive island、compiler candidate。

**底层机制：** static map 把场景和 owner 做成可审查数据。真正项目中，每行会对应 feature module、Action state union、server validation、test case 和 performance evidence。

**API / 语法规则：** 本节没有新 API，重点是职责边界和运行时机制。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/13-sellerhub-architecture-mapping/sellerhub-react-19-boundary-map.tsx</span>
  </div>

```tsx
const sellerHubBoundaries = [
  {
    scenario: 'Checkout submit',
    currentOwner: 'Client Action with result and pending state',
    futureBoundary: 'Framework Server Function after a separate migration',
  },
  {
    scenario: 'Cart quantity',
    currentOwner: 'Sequential Action queue plus optimistic quantity',
    futureBoundary: 'Validated server mutation and reconciliation',
  },
  {
    scenario: 'Product review',
    currentOwner: 'Optimistic append with rollback',
    futureBoundary: 'Server-confirmed review identifier and content',
  },
  {
    scenario: 'Seller order status',
    currentOwner: 'Typed Action result union',
    futureBoundary: 'Authorized server-side mutation',
  },
  {
    scenario: 'Product card',
    currentOwner: 'Pure component and immutable inputs',
    futureBoundary: 'Measured compiler candidate',
  },
  {
    scenario: 'Dashboard resource',
    currentOwner: 'Promise and Suspense boundary model',
    futureBoundary: 'Framework-cached resource passed to use',
  },
]

export function SellerHubReact19BoundaryMap() {
  return (
    <section className="chapter14-panel" aria-labelledby="sellerhub-map-title">
      <p className="chapter14-kicker">9.13 SellerHub mapping</p>
      <h2 id="sellerhub-map-title">React 19 Actions and Compiler architecture map</h2>
      <div className="chapter14-grid">
        {sellerHubBoundaries.map((boundary) => (
          <article className="chapter14-card" key={boundary.scenario}>
            <h3>{boundary.scenario}</h3>
            <p>{boundary.currentOwner}</p>
            <p>{boundary.futureBoundary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**逐行解释：** 每个 row 用 scenario 作为 stable key；current owner 只描述当前学习 runtime；future boundary 明确 server/cache/compiler 工作要在后续独立完成。

**执行过程：** module 创建 static array；component render map；React 使用 scenario key 保留 card identity；browser 只显示 architecture evidence，不执行 mutation。

**变量、引用与架构状态变化：** array 与 row object 在 module scope 保持 stable；没有 React state、Action queue 或 Promise；这正说明 architecture mapping 与 runtime implementation是不同交付物。

**机制证据链：** learner 选择一个 SellerHub scenario；map 给出 current owner 和 future boundary；TypeScript/React 当前只验证/render rows；真正 Action 或 Compiler 必须在对应 feature 中另有 evidence。若把所有 row 都标成 Server Action 或 compiler candidate，就违反 owner-specific design；代码审查中可通过“是否有 mutation、是否需要 server auth、是否有 measured render cost”识别。

**为什么得到这个结果：** API choice 由 data owner、failure mode、runtime 和 evidence决定，不由“这是 React 19 新功能”决定。

**对比情况：** checkout mutation 需要 Action result；ProductCard 首先需要 pure render；dashboard resource 需要 cached Promise owner；它们不能共享同一 abstraction。

**常见错误为什么错：** 把 `useOptimistic` 当 server cache；把 Server Function 当 auth；把 Compiler candidate 当自动性能收益；让 Action result state替代 domain state model。

**与 SellerHub 的关系：** 本节就是最终小项目的 architecture contract，覆盖 checkout、cart、review、seller order、ProductCard 和 dashboard。

**与当前学习路径的关系：** 它把第 3–13 章的 props、state、forms、async、routing、performance、testing 和 server/client boundary 聚合到第 14 章。

**最终记忆模型：** 先为每个 SellerHub 场景选 owner，再选 Action、optimistic、resource 或 Compiler；不要从 API 名字反推架构。

## 10. API / 语法索引

| API / Syntax | Layer | Signature / Meaning | Critical Boundary |
| --- | --- | --- | --- |
| `useTransition` | React runtime | `[isPending, startTransition]` | pending 属于该 transition owner。 |
| `startTransition` | React runtime | `startTransition(action)` | `await` 后 setter 当前需再次标记。 |
| `useActionState` | React runtime | `[state, dispatchAction, isPending]` | dispatcher 必须在 Action scope。 |
| `<form action={fn}>` | React DOM | `fn(formData)` | client function 不等于 Server Function。 |
| `useFormStatus` | React DOM | `{pending, data, method, action}` | 只读取最近父 form。 |
| `useOptimistic` | React runtime | `[optimisticState, addOptimistic]` | reducer pure，setter 在 Action scope。 |
| `use` | React runtime / Suspense | `use(contextOrCachedPromise)` | Promise identity 必须 stable/cached。 |
| `"use server"` | Framework directive | server function marker | 需要 RSC framework transform。 |
| ref as prop | React 19 / React DOM | `ref?: Ref<T>` | 仍是 imperative handle。 |
| `<title>` / `<meta>` | React DOM | document metadata output | 不是 client state。 |
| `prerender` / `resume` | React DOM static/server | server/build entry APIs | 普通 Vite component 不调用。 |
| `"use memo"` | React Compiler | compilation opt-in directive | 没有 Compiler 时不产生 memoization。 |
| `"use no memo"` | React Compiler | temporary opt-out directive | 用于隔离，不是永久修复。 |

## 11. 常见错误表

| Error | Violated Rule | Result | Recognition / Correction |
| --- | --- | --- | --- |
| 把 Action 当普通 event handler | Action 是 transition mutation unit | pending/result/error owner 混乱 | 分开 handler 与 Action function。 |
| 把 `useActionState` 当 `useReducer` | ordinary reducer 必须 pure | side effect 可能被 replay/重复 | mutation 放 Action，pure transition 留 reducer。 |
| Action scope 外调用 dispatcher | dispatcher 需要 transition | pending 不更新或 development error | 使用 form action 或 `startTransition`。 |
| 把 `isPending` 当全局请求状态 | pending 属于 hook/transition instance | 无关 UI 被禁用 | 为具体 mutation 建 owner。 |
| `useFormStatus` 不在父 form 内 | 最近父 form boundary | pending 永远 false | 抽出 form child submit component。 |
| optimistic base 永久写入 pending record | optimistic 不是 source of truth | 失败无法 rollback | confirmed base 与 pending projection 分离。 |
| optimistic reducer 有 side effect | optimistic reducer 必须 pure | replay 产生重复 mutation | reducer 只返回 next projection。 |
| render 中创建 Promise 再 `use` | cached Promise identity | 反复 fallback / warning | 由 framework/cache 提供 stable Promise。 |
| try/catch 包 `use(promise)` | rejected Promise 交 Error Boundary | Suspense exception 被误处理 | 使用 Error Boundary。 |
| Vite 中伪造 Server Function | 缺 framework transform/transport | 实际仍在 browser 执行 | 明确标为 mechanism model。 |
| 传不可序列化 Server Function 参数 | framework serialization contract | request 构造失败 | 使用 plain serializable values / FormData。 |
| render 中读 `ref.current` | ref 不参与 render snapshot | stale/inconsistent output | handler/effect 中读取。 |
| 把 metadata 当 client state | metadata 是 document output | owner 混乱 | JSX 输出 title/meta，业务 state另建模。 |
| 认为 Compiler 修 mutation | Compiler 只优化可分析正确代码 | bailout 或错误 runtime | 先修 purity/immutability。 |
| 盲删 manual memoization | preserve existing intent | effect/reference behavior 变化 | profile + tests 后逐个删除。 |
| 不跑 gates 就迁移 | migration 必须有 evidence | regression 难归因 | lint/typecheck/test/build 全部执行。 |
| 混淆 stable 与 experimental API | version/channel boundary | 生产假设错误 | 对照当前官方 reference 标记。 |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。

### 12.1 项目目标

`SellerHub React 19 Actions Lab` 把 checkout Action state、sequential cart queue、form status、optimistic review rollback、Promise/Suspense boundary model、Server Function note、ref/metadata/static API map、Compiler candidate/bailout 和 Chapter 12 migration gates 组织到一个 browser-only lab。它不提供 backend、真实 Server Function 或 Compiler transform。

### 12.2 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Final mini project structure</span>
  </div>

```txt
src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/
  sellerhub-action-types.ts
  sellerhub-action-model.ts
  sellerhub-action-workspace.tsx
  sellerhub-compiler-boundary-map.tsx
  sellerhub-react-19-actions-lab.tsx
```
</div>

文件职责：

- `sellerhub-action-types.ts`：Action result union、cart mutation 和 optimistic review domain types。
- `sellerhub-action-model.ts`：浏览器内模拟的 async Action model；没有真实 API。
- `sellerhub-action-workspace.tsx`：运行 `useActionState`、`useFormStatus` 与 `useOptimistic`。
- `sellerhub-compiler-boundary-map.tsx`：Compiler candidates、bailout、resource/server boundary 与 migration order。
- `sellerhub-react-19-actions-lab.tsx`：最终小项目组合入口。

### 12.3 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-types.ts</span>
  </div>

```ts
export type CheckoutActionState =
  | {
      status: 'idle'
      message: string
      sequence: number
    }
  | {
      status: 'success'
      message: string
      sequence: number
      email: string
    }
  | {
      status: 'error'
      message: string
      sequence: number
    }

export type CartLine = {
  productId: string
  productName: string
  quantity: number
}

export type CartMutation = {
  productId: string
  delta: number
  mutationId: string
}

export type CartActionState = {
  lines: CartLine[]
  completedMutationIds: string[]
  message: string
}

export type ProductReview = {
  id: string
  text: string
  status: 'pending' | 'confirmed'
}
```
</div>

`CheckoutActionState` 使用 discriminated union，让 idle/success/error 分支拥有可辨识 shape；cart state 把 confirmed lines 与 completed mutation IDs 保存在同一 Action result；review status 明确区分 pending projection 与 confirmed record。TypeScript 在 compile time 检查这些关系，runtime 没有自动 schema validation。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-model.ts</span>
  </div>

```ts
import type {
  CartActionState,
  CartMutation,
  CheckoutActionState,
  ProductReview,
} from './sellerhub-action-types'

export const initialCheckoutState: CheckoutActionState = {
  status: 'idle',
  message: 'Checkout has not been submitted.',
  sequence: 0,
}

export const initialCartState: CartActionState = {
  lines: [
    {
      productId: 'product-lamp',
      productName: 'Desk Lamp',
      quantity: 1,
    },
  ],
  completedMutationIds: [],
  message: 'No cart mutation has completed.',
}

export const initialReviews: ProductReview[] = [
  {
    id: 'review-1',
    text: 'Accurate description and fast dispatch.',
    status: 'confirmed',
  },
]

export async function submitCheckoutAction(
  previousState: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  const email = readFormString(formData, 'email').trim()
  const delivery = readFormString(formData, 'delivery')
  await wait(650)

  if (!email.includes('@')) {
    return {
      status: 'error',
      message: 'Enter a valid checkout email.',
      sequence: previousState.sequence + 1,
    }
  }

  return {
    status: 'success',
    message: `Checkout accepted with ${delivery} delivery.`,
    sequence: previousState.sequence + 1,
    email,
  }
}

export async function updateCartAction(
  previousState: CartActionState,
  mutation: CartMutation,
): Promise<CartActionState> {
  await wait(mutation.delta > 0 ? 600 : 350)

  const nextLines = previousState.lines.map((line) =>
    line.productId === mutation.productId
      ? { ...line, quantity: Math.max(1, line.quantity + mutation.delta) }
      : line,
  )

  return {
    lines: nextLines,
    completedMutationIds: [
      ...previousState.completedMutationIds,
      mutation.mutationId,
    ],
    message: `${mutation.mutationId} reconciled with the Action result.`,
  }
}

export async function confirmReview(
  reviewId: string,
  text: string,
): Promise<ProductReview | null> {
  await wait(700)

  if (!text || text.toLowerCase().includes('fail')) {
    return null
  }

  return {
    id: reviewId,
    text,
    status: 'confirmed',
  }
}

function readFormString(formData: FormData, fieldName: string): string {
  const value = formData.get(fieldName)
  return typeof value === 'string' ? value : ''
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}
```
</div>

`submitCheckoutAction` 的 previous result 负责 sequence；`updateCartAction` 从 queue 提供的 previous cart 计算 next immutable lines；`confirmReview` 返回 authoritative record 或 null。`wait` 只是 browser simulation，不代表 server request。真实 SellerHub 必须在 server 再验证 email、库存、权限和 review content。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-workspace.tsx</span>
  </div>

```tsx
import {
  startTransition,
  useActionState,
  useOptimistic,
  useRef,
  useState,
} from 'react'
import { useFormStatus } from 'react-dom'
import {
  confirmReview,
  initialCartState,
  initialCheckoutState,
  initialReviews,
  submitCheckoutAction,
  updateCartAction,
} from './sellerhub-action-model'
import type {
  CartLine,
  CartMutation,
  ProductReview,
} from './sellerhub-action-types'

export function SellerHubActionWorkspace() {
  const [checkoutState, checkoutAction, isCheckoutPending] = useActionState(
    submitCheckoutAction,
    initialCheckoutState,
  )
  const [cartState, dispatchCartAction, isCartPending] = useActionState(
    updateCartAction,
    initialCartState,
  )
  const [optimisticCart, applyOptimisticCart] = useOptimistic(
    cartState.lines,
    applyCartMutation,
  )
  const [reviews, setReviews] = useState(initialReviews)
  const [reviewMessage, setReviewMessage] = useState(
    'Submit a review. Include fail to simulate rollback.',
  )
  const [optimisticReviews, addOptimisticReview] = useOptimistic(
    reviews,
    addPendingReview,
  )
  const nextMutationId = useRef(1)
  const nextReviewId = useRef(2)

  function queueCartMutation(delta: number): void {
    const mutation: CartMutation = {
      productId: 'product-lamp',
      delta,
      mutationId: `cart-${nextMutationId.current}`,
    }
    nextMutationId.current += 1

    startTransition(() => {
      applyOptimisticCart(mutation)
      dispatchCartAction(mutation)
    })
  }

  async function submitReview(formData: FormData): Promise<void> {
    const value = formData.get('review')
    const text = typeof value === 'string' ? value.trim() : ''
    const reviewId = `review-${nextReviewId.current}`
    nextReviewId.current += 1
    addOptimisticReview({ id: reviewId, text })

    const confirmedReview = await confirmReview(reviewId, text)

    startTransition(() => {
      if (confirmedReview) {
        setReviews((currentReviews) => [...currentReviews, confirmedReview])
        setReviewMessage('The Action result confirmed the optimistic review.')
      } else {
        setReviewMessage('The Action failed and the optimistic review rolled back.')
      }
    })
  }

  return (
    <div className="chapter14-section-split">
      <article className="chapter14-card">
        <h3>Checkout Action</h3>
        <form action={checkoutAction} className="chapter14-form">
          <label className="chapter14-field">
            Checkout email
            <input defaultValue="buyer@example.com" name="email" type="email" />
          </label>
          <label className="chapter14-field">
            Delivery
            <select defaultValue="standard" name="delivery">
              <option value="standard">Standard</option>
              <option value="express">Express</option>
            </select>
          </label>
          <CheckoutSubmitButton />
        </form>
        <p className={`chapter14-result chapter14-result-${checkoutState.status}`}>
          {checkoutState.message}
        </p>
        <span className="chapter14-pill">
          Action sequence: {checkoutState.sequence}
        </span>
        <span className="chapter14-pill">
          Hook pending: {String(isCheckoutPending)}
        </span>
      </article>

      <article className="chapter14-card">
        <h3>Queued optimistic cart</h3>
        {optimisticCart.map((line) => (
          <div className="chapter14-cart-line" key={line.productId}>
            <span>{line.productName}</span>
            <strong>{line.quantity}</strong>
          </div>
        ))}
        <div className="chapter14-action-row">
          <button
            className="chapter14-button"
            onClick={() => queueCartMutation(-1)}
            type="button"
          >
            Decrease
          </button>
          <button
            className="chapter14-button"
            onClick={() => queueCartMutation(1)}
            type="button"
          >
            Increase
          </button>
        </div>
        <p className="chapter14-note">
          {isCartPending ? 'Cart Action queue is pending.' : cartState.message}
        </p>
        <small>{cartState.completedMutationIds.join(', ') || 'No completed mutations'}</small>
      </article>

      <article className="chapter14-card chapter14-card-wide">
        <h3>Optimistic product reviews</h3>
        <form action={submitReview} className="chapter14-form">
          <label className="chapter14-field">
            Review
            <input name="review" placeholder="Write a review" />
          </label>
          <button className="chapter14-button" type="submit">
            Submit review
          </button>
        </form>
        <ul className="chapter14-list">
          {optimisticReviews.map((review) => (
            <li key={review.id}>
              <strong>{review.text || 'Empty review'}</strong>
              <span>{review.status}</span>
            </li>
          ))}
        </ul>
        <p className="chapter14-note">{reviewMessage}</p>
      </article>
    </div>
  )
}

function CheckoutSubmitButton() {
  const status = useFormStatus()
  const email = status.data?.get('email')

  return (
    <button className="chapter14-button" disabled={status.pending} type="submit">
      {status.pending && typeof email === 'string'
        ? `Submitting ${email}...`
        : 'Submit checkout'}
    </button>
  )
}

function applyCartMutation(
  currentLines: CartLine[],
  mutation: CartMutation,
): CartLine[] {
  return currentLines.map((line) =>
    line.productId === mutation.productId
      ? { ...line, quantity: Math.max(1, line.quantity + mutation.delta) }
      : line,
  )
}

function addPendingReview(
  currentReviews: ProductReview[],
  review: Pick<ProductReview, 'id' | 'text'>,
): ProductReview[] {
  return [...currentReviews, { ...review, status: 'pending' }]
}
```
</div>

workspace 中 checkout dispatcher 由 form Action 自动调用；cart handler 在同一 transition 中提交 optimistic projection 与 queued Action；review form Action 先添加 pending record，再根据 authoritative result 更新 base 或 rollback。两个 optimistic reducer 都 pure，两个 ref counter 只在 event/Action 中变化。

执行时，checkout result state、cart Action queue 和 review base state 是三个独立 owner。快速 cart clicks 形成顺序 payload；UI 立即读取 optimistic quantity，Action 返回后读取 confirmed cart lines。review 输入 `fail` 时 `confirmReview` 返回 null，base reviews 不变，临时 review 在 Action settled 后消失。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-compiler-boundary-map.tsx</span>
  </div>

```tsx
const compilerBoundaryRows = [
  {
    topic: 'ProductCard',
    currentEvidence: 'Pure render and immutable product props',
    compilerMeaning: 'Candidate only; no compiler transform runs in this project',
  },
  {
    topic: 'OrderRow',
    currentEvidence: 'Keep measured manual memoization until migration tests pass',
    compilerMeaning: 'preserve-manual-memoization protects existing intent',
  },
  {
    topic: 'Dashboard resource',
    currentEvidence: 'Promise identity and Suspense boundary are modeled',
    compilerMeaning: 'Compiler does not create a cached data source',
  },
  {
    topic: 'Server Function',
    currentEvidence: 'Framework boundary is documented, not executed',
    compilerMeaning: 'Compiler does not create server transport',
  },
]

const compilerBailoutRows = [
  'Mutation of props or state',
  'Impure render values',
  'Dynamic component definitions',
  'Unsupported syntax',
  'Broken manual memoization dependencies',
]

export function SellerHubCompilerBoundaryMap() {
  return (
    <div className="chapter14-section-split">
      <article className="chapter14-card">
        <h3>Compiler candidate map</h3>
        <ul className="chapter14-list">
          {compilerBoundaryRows.map((row) => (
            <li key={row.topic}>
              <strong>{row.topic}</strong>
              <span>{row.currentEvidence}</span>
              <span>{row.compilerMeaning}</span>
            </li>
          ))}
        </ul>
      </article>
      <article className="chapter14-card">
        <h3>Bailout and lint signals</h3>
        <ul className="chapter14-list">
          {compilerBailoutRows.map((bailout) => (
            <li key={bailout}>{bailout}</li>
          ))}
        </ul>
        <p className="chapter14-note">
          Directives such as "use memo" and "use no memo" affect compiler analysis
          only when a compiler is configured.
        </p>
      </article>
      <article className="chapter14-card chapter14-card-wide">
        <h3>Migration order</h3>
        <ol className="chapter14-compact-list">
          <li>Pass Chapter 12 lint, typecheck, test, and build gates.</li>
          <li>Measure Chapter 11 render evidence before changing memoization.</li>
          <li>Adopt one Action boundary and verify pending, error, and rollback.</li>
          <li>Configure React Compiler only in a separate reviewed migration.</li>
        </ol>
      </article>
    </div>
  )
}
```
</div>

该文件把四个常见误区写成 architecture evidence：Compiler 不创建 cached data source，不创建 server transport，也不会让已有 manual memo 自动失去价值。当前 component 只是静态说明；真实 Compiler candidate 必须有 build config、compiled output 或 DevTools evidence。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-react-19-actions-lab.tsx</span>
  </div>

```tsx
import { SellerHubActionWorkspace } from './sellerhub-action-workspace'
import { SellerHubCompilerBoundaryMap } from './sellerhub-compiler-boundary-map'

export function SellerHubReact19ActionsLab() {
  return (
    <section
      className="chapter14-panel chapter14-final-project"
      aria-labelledby="sellerhub-react19-lab-title"
    >
      <p className="chapter14-kicker">Final mini project</p>
      <h2 id="sellerhub-react19-lab-title">SellerHub React 19 Actions Lab</h2>
      <p>
        This browser-only lab integrates client Actions, Action state, form status,
        optimistic reconciliation, framework boundary notes, and compiler migration
        evidence. It does not provide a backend, Server Function runtime, or Compiler
        transform.
      </p>
      <SellerHubActionWorkspace />
      <SellerHubCompilerBoundaryMap />
    </section>
  )
}
```
</div>

组合入口不拥有新的 mutation state，只组合 workspace 与 boundary map。把 state owner 留在 `SellerHubActionWorkspace`，让 architecture panel 保持 pure static output。

### 12.4 核心执行流程

1. `/react/chapter-14` lazy-load `Chapter14PracticeRoot`，最终小项目随后加载五个真实文件。
2. checkout form 调用 `checkoutAction(FormData)`；`useActionState` 保存 returned union 和 pending。
3. cart button 创建 mutation ID，在 transition 内同时投影 optimistic quantity 并 dispatch queued Action。
4. cart Action 按 previous result 顺序产生 confirmed lines，optimistic view 与 base reconciliation。
5. review form 先添加 pending review；模拟 result 为 null 时 base 不变并 rollback。
6. Compiler panel 只显示 lint、candidate 与 migration evidence，不声称执行 build transform。

### 12.5 Runtime、类型与工具链边界

- JavaScript runtime 创建 FormData values、payload objects、Promises、arrays 和 closures。
- React runtime 保存 Action result cell、queue、pending flag、optimistic layer、state snapshot 和 refs。
- React DOM 管理 form Action/status 与 metadata output。
- Browser 执行 timers、form controls、DOM focus 和 event dispatch。
- TypeScript 检查 Action state union、payload、ref 与 FormData narrowing，运行时类型会被擦除。
- ESLint 运行 Rules of React / compiler-related lints。
- Vite 负责 TSX module graph 与 build；本章没有 React Compiler plugin。
- Server Functions、cached Suspense data source 和 static rendering entrypoints 仍属于 future framework/server boundary。

### 12.6 验证步骤

运行 `npm run lint`、`npm run typecheck`、`npm run test` 和 `npm run build`。手工 smoke test 应覆盖：checkout success/error、快速 cart queue、review success/`fail` rollback、form pending button、conditional context read、ref focus，以及页面明确显示“Compiler 未配置”和“Server Function 未运行”。

## 13. 额外速查表

**一句话总结：** Actions 组织 mutation lifecycle，`use` 读取 context/cached resource，Compiler 在 build time 优化符合 React rules 的 render；三者 owner 不同。

### 常用 API

| API | 输入 | 输出 | 关键限制 |
| --- | --- | --- | --- |
| `useActionState` | reducer Action + initial state | result + dispatcher + pending | dispatcher 在 Action scope。 |
| `useFormStatus` | 无 | parent form status | 必须在 form child。 |
| `useOptimistic` | base + pure reducer | projection + optimistic dispatcher | 需要 rollback/reconciliation。 |
| `use` | context / cached Promise | context/resolved value | Promise stable；不能 try/catch。 |
| `startTransition` | Action function | 无 | `await` 后 update 当前要再次标记。 |

### 相似概念对比

| Concept A | Concept B | 核心区别 |
| --- | --- | --- |
| event handler | Action | handler 接收 intent；Action 处于 transition 并承载 mutation。 |
| `useReducer` | `useActionState` | pure local transition vs effectful Action result。 |
| `isPending` | `useFormStatus().pending` | Action hook owner vs nearest form owner。 |
| optimistic state | server state | 可撤销投影 vs authoritative data。 |
| `useContext` | `use(context)` | ordinary Hook order vs conditional `use` exception。 |
| manual memo | Compiler memo | explicit runtime Hook/cache vs build-generated optimization。 |

### 最小模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: typed Action result</span>
  </div>

```tsx
type ActionState =
  | { status: 'idle'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string }

async function submitAction(
  previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const value = formData.get('value')

  if (typeof value !== 'string' || !value.trim()) {
    return { status: 'error', message: 'Value is required.' }
  }

  return {
    status: 'success',
    message: `${previousState.status}: ${value.trim()}`,
  }
}
```
</div>

该模板只展示 Action result shape 与 FormData narrowing。要运行它，还需在 component top level 调 `useActionState` 并把 dispatcher 交给 form action。

### SellerHub 快速映射

| Scenario | React 19 Mechanism | Non-owner |
| --- | --- | --- |
| Checkout submit | `useActionState` + `useFormStatus` | Compiler 不负责 validation。 |
| Cart quantity | Action queue + `useOptimistic` | optimistic state 不是 cache。 |
| Product review | optimistic append + rollback | TypeScript 不验证 server response。 |
| Seller order | typed Action result | client Action 不提供 authorization。 |
| ProductCard | pure compiler candidate | Compiler 不修 unstable key。 |
| Dashboard | cached Promise + Suspense model | `use` 不创建 cache。 |

## 14. 最终文件清单

### 本次创建的学习指导文件

- `docs/react/chapter-14-react-19-actions-compiler/react-chapter-14-learning-guide.md`

### 本章创建的核心机制真实文件

- `src/learning/react/chapter-14-react-19-actions-compiler/01-action-boundary/action-transition-result.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/02-use-action-state-queue/sequential-action-queue.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/03-action-state-vs-reducer/action-reducer-boundary.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/04-form-action-progressive-model/form-action-progressive-boundary.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/05-use-form-status-submit-button/form-status-submit-button.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/06-use-optimistic-rollback/optimistic-review-reconciliation.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/07-use-api-suspense-promise/use-api-resource-boundary.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/08-server-functions-boundary/server-function-boundary-map.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/09-ref-metadata-static-apis/react-19-platform-boundaries.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/10-react-compiler-goal/compiler-optimization-model.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/11-compiler-rules-lints/compiler-rule-evidence.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/12-migration-strategy/react-19-migration-gates.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/13-sellerhub-architecture-mapping/sellerhub-react-19-boundary-map.tsx`

### 本章创建的最终小项目真实文件

- `src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-types.ts`
- `src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-model.ts`
- `src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-action-workspace.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-compiler-boundary-map.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/sellerhub-react-19-actions-lab/sellerhub-react-19-actions-lab.tsx`

### Adapter / shell 文件

- `src/learning/react/chapter-14-react-19-actions-compiler/chapter-14-practice-root.tsx`
- `src/learning/react/chapter-14-react-19-actions-compiler/chapter-14-practice.css`
- `src/App.tsx`
- `README.md`

### 不需要创建的概念 snippet

- `Snippet: dispatcher outside Action scope`
- `Snippet: useFormStatus outside parent form`
- `Snippet: Promise created during render`
- `Snippet: fake Server Function in Vite`
- `Snippet: compiler cannot repair mutation`
- `Template: typed Action result`

## 15. 如何转换成个人笔记

每节压缩为六行：

1. owner 是 React runtime、React DOM、framework、browser、TypeScript 还是 Compiler。
2. trigger 是 event、form submit、dispatcher、Promise settle 还是 build analysis。
3. React 保存哪个 state cell、queue、pending flag、optimistic layer、context 或 ref。
4. TypeScript 检查什么，runtime 仍需验证什么。
5. 错误违反哪条固定 rule。
6. SellerHub 中哪个 feature 使用该机制。

不要只抄 API signature；必须画出 `payload -> Action queue -> result -> commit` 或 `source -> compiler analysis -> generated optimization/bailout`。

## 16. 必须能回答的问题

1. Action 为什么不是 event handler 的新名字？
2. `useActionState` 的 `previousState` 来自哪里？多次 dispatch 为什么 sequential？
3. `useReducer` 与 `useActionState` 为什么对 side effect 有不同规则？
4. URL form action、`onSubmit` 和 function form action 有什么区别？
5. `useFormStatus` 为什么必须在 parent form child component 中调用？
6. optimistic state 失败时依靠什么 rollback？
7. `use` 为什么可以条件调用？为什么 Promise 必须 cached？
8. Server Function 为什么不能在普通 Vite module 中靠 directive 伪造？
9. ref as prop、metadata 和 static APIs 分别属于哪一层？
10. React Compiler 是否随 React 19 自动启用？
11. `"use memo"` / `"use no memo"` 在没有 Compiler 时会做什么？
12. 为什么 Compiler 不能修复 mutation、impure render、bad state owner 或 unstable key？
13. 为什么迁移前必须保留 lint/typecheck/test/build 与 Profiler evidence？
14. SellerHub checkout、cart、review、order、ProductCard 和 dashboard 各自 owner 是什么？

## 17. 最终记忆模型

React 19 mutation 主线是：用户 intent 进入 Action，Action 在 transition 中处理 payload/FormData，`useActionState` 以 previous result 串联 queue，`useFormStatus` 读取最近 form，`useOptimistic` 在 pending 期间投影可撤销 UI，最终 authoritative result 决定 reconciliation。

resource 主线是：`use(context)` 读取 tree value；`use(cachedPromise)` 读取 stable resource，pending 时交给 Suspense，rejected 时交给 Error Boundary。cache 由 framework/data source 提供。

Compiler 主线是：source code 在 build time 接受 purity、immutability、refs、static structure 与 syntax 分析；符合规则时生成 automatic memoization，不符合时 bailout。它不会改变 React render mental model，也不会创建 server、cache、authorization 或正确 architecture。

## 18. 官方文档阅读清单

建议按以下顺序阅读：

1. [React v19](https://react.dev/blog/2024/12/05/react-19)：先建立 Actions、ref as prop、metadata、styles/scripts 和 static APIs 全景。
2. [React `useActionState`](https://react.dev/reference/react/useActionState)：重点看 signature、previous state、queue、errors、reset 和 Server Function integration。
3. [React DOM `<form>`](https://react.dev/reference/react-dom/components/form)：对比 `onSubmit`、URL action、function action、FormData 和 progressive enhancement。
4. [React DOM `useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus)：重点看 nearest parent form caveat。
5. [React `useOptimistic`](https://react.dev/reference/react/useOptimistic)：重点看 pure reducer、Action scope、delete recovery 与 stale value troubleshooting。
6. [React `use`](https://react.dev/reference/react/use)：重点看 conditional call、cached Promise、Suspense、Error Boundary 与 try/catch restriction。
7. [React `startTransition`](https://react.dev/reference/react/startTransition)：重点看 async Action 与 `await` 后 update 的当前限制。
8. [React Server Functions](https://react.dev/reference/rsc/server-functions) 和 [`"use server"`](https://react.dev/reference/rsc/use-server)：区分 stable React feature 与 framework implementation。
9. [React DOM components](https://react.dev/reference/react-dom/components)、[`<meta>`](https://react.dev/reference/react-dom/components/meta)、[Static React DOM APIs](https://react.dev/reference/react-dom/static) 与 [Server React DOM APIs](https://react.dev/reference/react-dom/server)：理解 document/static/server output。
10. [React Compiler](https://react.dev/learn/react-compiler)、[Introduction](https://react.dev/learn/react-compiler/introduction) 与 [Incremental Adoption](https://react.dev/learn/react-compiler/incremental-adoption)：理解 automatic memoization 与 rollout。
11. [Compiler Directives](https://react.dev/reference/react-compiler/directives)、[`"use memo"`](https://react.dev/reference/react-compiler/directives/use-memo) 与 [`"use no memo"`](https://react.dev/reference/react-compiler/directives/use-no-memo)：理解 annotation/opt-out boundary。
12. [`eslint-plugin-react-hooks`](https://react.dev/reference/eslint-plugin-react-hooks)、[`purity`](https://react.dev/reference/eslint-plugin-react-hooks/lints/purity)、[`immutability`](https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability)、[`refs`](https://react.dev/reference/eslint-plugin-react-hooks/lints/refs)、[`static-components`](https://react.dev/reference/eslint-plugin-react-hooks/lints/static-components)、[`unsupported-syntax`](https://react.dev/reference/eslint-plugin-react-hooks/lints/unsupported-syntax) 与 [`preserve-manual-memoization`](https://react.dev/reference/eslint-plugin-react-hooks/lints/preserve-manual-memoization)：把 lint 当 migration evidence。
13. [React Compiler v1.0](https://react.dev/blog/2025/10/07/react-compiler-1)：确认 Compiler 已稳定，但仍需显式集成 build tool。
14. [Using TypeScript with React](https://react.dev/learn/typescript)、[TypeScript JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) 与 [TypeScript narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)：理解 TSX、union 和 runtime erasure。
15. [MDN submit event](https://developer.mozilla.org/en-US/docs/Web/Events/submit)、[MDN FormData event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event) 与 [MDN Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)：补齐 browser 与 JavaScript platform behavior。
16. 本地辅助资料 `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf` 第 158–159 页介绍 function form action，但未覆盖本章多数 API，不能替代官方文档。
17. 本地 `references/books/react/full-stack-react-projects.pdf` 是旧 React/full-stack 项目资料，没有当前 React 19 Actions / Compiler 教学，不应作为本章 API 依据。
