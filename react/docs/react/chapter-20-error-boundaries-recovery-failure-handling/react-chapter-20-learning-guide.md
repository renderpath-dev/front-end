# React 第 20 章：Error Boundaries、Recovery UI 与 Failure Handling

<style>
.macos-code-window {
  margin: 1rem 0;
  overflow: hidden;
  border: 1px solid #d0d7de;
  border-radius: 12px;
  background: #0d1117;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.16);
}

.macos-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid #30363d;
  background: #161b22;
}

.macos-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
}

.macos-dot-red { background: #ff5f57; }
.macos-dot-yellow { background: #ffbd2e; }
.macos-dot-green { background: #28c840; }

.macos-title {
  margin-left: 6px;
  color: #c9d1d9;
  font-size: 0.82rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
}

.macos-code-window pre {
  margin: 0;
  border-radius: 0;
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
  - [9.1 Failure boundary 定位：为什么不是普通 try/catch](#section-9-1)
  - [9.2 Error Boundary class：getDerivedStateFromError 与 componentDidCatch](#section-9-2)
  - [9.3 Render-time error propagation：children 抛错如何冒泡到最近 boundary](#section-9-3)
  - [9.4 Error Boundary 不捕获什么：event、async、SSR 与 boundary 自己的错误](#section-9-4)
  - [9.5 Fallback UI：错误信息、用户信任与最小可恢复界面](#section-9-5)
  - [9.6 Reset 与 retry：state reset、reset key 与恢复路径](#section-9-6)
  - [9.7 Suspense fallback vs Error Boundary fallback：loading 和 failure 的边界](#section-9-7)
  - [9.8 Lazy import failure：chunk loading error、Suspense 与 Error Boundary 组合](#section-9-8)
  - [9.9 Route-level boundary：页面失败隔离与局部恢复](#section-9-9)
  - [9.10 Widget-level boundary：第三方组件、图表、插件与局部崩溃隔离](#section-9-10)
  - [9.11 Logging boundary：componentStack、owner stack 与 production reporting](#section-9-11)
  - [9.12 Testing failure UI：throwing components、console noise 与 role-based assertions](#section-9-12)
  - [9.13 SellerHub failure mapping：catalog、orders、dashboard、plugin 的 recovery strategy](#section-9-13)
  - [9.14 最终小项目：SellerHub Recovery Boundary Lab](#section-9-14)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
- [13. 额外速查表](#13-额外速查表)
- [14. 工程迁移与代码审查要点](#14-工程迁移与代码审查要点)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章机制地图

| Mechanism | Owner / Boundary | Runtime Layer | Project Scenario | Source Reading Path |
| --- | --- | --- | --- | --- |
| Render-time throw | Nearest Error Boundary ancestor | React render phase | Catalog card crashes while formatting malformed listing data | `02-error-boundary-class/error-boundary.tsx` |
| Boundary fallback state | Error Boundary class instance | React render and update path | Replace only a failed widget with a recovery card | `sellerhub-recovery-boundary-lab/sellerhub-error-boundary.tsx` |
| Event handler failure | Event owner component | Browser event callback | Orders retry button validates before dispatching request state | `04-not-caught-boundaries/not-caught-boundaries-panel.tsx` |
| Async request failure | Request state owner | Promise callback and component state | Orders panel shows retry UI for failed request state | `sellerhub-recovery-boundary-lab/orders-retry-panel.tsx` |
| Suspense pending state | Suspense boundary | React suspended render | Lazy preview shows loading fallback while module is pending | `07-suspense-vs-error/suspense-vs-error-boundary-panel.tsx` |
| Lazy import rejection | Error Boundary around Suspense | React lazy module loading | Route chunk fails and shows error fallback, not loading fallback | `08-lazy-import-failure/lazy-import-failure-panel.tsx` |
| Logging side effect | `componentDidCatch` callback | React error lifecycle | Capture component stack for a local diagnostic preview | `11-logging-boundary/error-logging-boundary-panel.tsx` |
| SellerHub recovery strategy | Route, widget, plugin, or request owner | Client Vite runtime | Map catalog, orders, dashboard, plugin, and route failures | `13-sellerhub-failure-map/sellerhub-failure-map.tsx` |

## 0. 本章工程问题与边界

本章解决的是“React 客户端 UI 已经进入运行状态后，某个组件渲染失败时，如何把失败限制在可恢复区域内”的问题。

普通 `try/catch` 能捕获当前同步调用栈里的异常；但 JSX 返回的是元素描述，父组件返回 `<Child />` 时，通常并没有立即调用 `Child`。React 后续在 render phase 调用子组件，子组件抛出的 render-time error 会沿 React 组件树向上冒泡，而不是回到父组件函数里的普通 `try/catch`。

Error Boundary 捕获的是子树 render、lifecycle、constructor 过程中的错误，并用 boundary 自己的 state 切换到 fallback UI。它不是通用异常系统：event handler、`setTimeout`、`requestAnimationFrame`、Promise callback、请求失败、SSR 运行时错误、boundary 自身 render 错误，都需要对应 owner 处理。

Suspense fallback 代表“还在等待”，Error Boundary fallback 代表“已经失败”。把 loading 和 failure 混成一个 UI，会让用户不知道是网络慢、chunk 还没到，还是组件已经崩溃。

Logging 不是 recovery。`componentDidCatch` 可以记录 `error` 和 `componentStack`，开发环境也可以阅读 owner stack 诊断信息，但用户恢复路径仍然应由 fallback UI、reset、retry、导航或局部替换来完成。

当前练习是 Vite client runtime lab，不创建 SSR server，不接入真实 monitoring SDK，不发送生产错误报告，也不声称 Error Boundaries 能捕获 event handler 或任意 async callback 错误。

## 1. 本章解决的问题

- 为什么父组件里包一层 `try/catch` 不能捕获子组件 render error。
- 为什么 React Error Boundary 仍然以 class component lifecycle 表达。
- 如何用 `getDerivedStateFromError` 选择 fallback UI。
- 如何用 `componentDidCatch` 记录 `componentStack`。
- 如何设计不泄露 stack trace 的用户恢复界面。
- 如何区分 render crash、event failure、async request failure、Suspense pending、lazy import rejection。
- 如何为 route、widget、plugin、request owner 选择不同边界粒度。
- 如何测试 fallback 和 retry，而不是测试内部 class name。

## 2. 前置概念

你需要已经理解：

- JavaScript `throw` 和同步调用栈。
- React component 返回 JSX 元素描述。
- React render phase 和 commit phase 的区别。
- State update 会触发组件重新 render。
- Promise pending / fulfilled / rejected 三种状态。
- Suspense 用 fallback 表示 pending UI。
- Testing Library 的 role/text 查询方式。

## 3. 学习目标

学完本章后，你应该能：

1. 判断一个错误是否属于 Error Boundary 可捕获范围。
2. 写出一个可复用的 class Error Boundary。
3. 解释 `getDerivedStateFromError` 和 `componentDidCatch` 的不同职责。
4. 设计带 reset 和 retry 的 fallback UI。
5. 把 route-level boundary 和 widget-level boundary 放在合理位置。
6. 区分 logging evidence 和 user recovery。
7. 为 SellerHub 的 catalog、orders、dashboard、plugin 选择边界策略。
8. 编写测试验证 render crash fallback 和恢复行为。

## 4. 机制依赖图

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| JSX is element description | Parent try/catch limitation | Parent returns description before React renders children | Mistakenly believes parent try/catch catches child render |
| React render phase | Render-time throw propagation | React owns descendant component calls | Places boundary below the crashing component |
| Boundary state | Fallback UI | Error recovery is a render branch | Logs error but still crashes visible UI |
| Event callback owner | Event failure handling | Event errors are outside render recovery | Claims Error Boundary caught a click handler error |
| Request lifecycle state | Async failure recovery | Promise rejection is not render throw by default | Hides request errors behind wrong fallback |
| Suspense pending | Error Boundary failure | Pending and failed are separate thrown values | Shows loading UI for rejected lazy import |
| Granularity tradeoff | Route/widget/plugin boundary | Recovery depends on blast radius | One bad chart crashes the whole app or too many fallbacks hide systemic failure |
| Role-based tests | Failure UI evidence | Tests should match user-visible recovery | Tests pass while actual fallback is inaccessible |

## 5. 核心术语表

| Term | Meaning |
| --- | --- |
| JavaScript throw | 抛出异常，控制权沿当前调用栈寻找 handler。 |
| React render phase | React 调用组件并计算下一版 UI tree 的阶段。 |
| Error Boundary | class component，捕获子树 render/lifecycle/constructor 错误并渲染 fallback。 |
| `getDerivedStateFromError` | static lifecycle，用错误切换 boundary state。 |
| `componentDidCatch` | instance lifecycle，用于记录 error 和 component stack。 |
| `componentStack` | React 提供的组件栈，描述错误发生在组件树中的位置。 |
| `captureOwnerStack` | React development diagnostic API，用于读取 owner stack，不是生产恢复机制。 |
| Fallback UI | 用户看到的替代界面，应提供安全信息和恢复动作。 |
| Reset key | 外部 key 变化时重置 boundary fallback 的模式。 |
| Suspense fallback | pending UI，不是 error UI。 |
| Lazy import rejection | dynamic import Promise rejected，应该进入 Error Boundary。 |
| Route-level boundary | 保护页面段，保留 app shell 和导航。 |
| Widget-level boundary | 保护卡片、图表、插件等局部 UI。 |

## 6. 底层心智模型

把 React failure handling 想成三个层次：

1. JavaScript 层：`throw` 沿当前调用栈寻找 `catch`。
2. React render 层：React 正在调用组件，子树 render error 沿组件树寻找最近 Error Boundary。
3. 产品恢复层：fallback UI、retry、reset、navigation、request state 决定用户怎么继续完成任务。

Error Boundary 只解决第二层的一类问题。它不能代替事件处理、请求状态、表单校验、后端错误、监控平台或 SSR framework boundary。

## 7. 推荐目录结构

本章练习按机制分段，最终 lab 放在独立 SellerHub 目录中。推荐结构用于理解边界职责，不作为教学主体。

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">chapter-20-source-shape.txt</span></div>

```text
chapter-20-error-boundaries-recovery-failure-handling/
  chapter-20-practice-root.tsx
  chapter-20-practice.css
  02-error-boundary-class/error-boundary.tsx
  sellerhub-recovery-boundary-lab/sellerhub-recovery-boundary-lab.tsx
  sellerhub-recovery-boundary-lab/sellerhub-error-boundary.tsx
  __tests__/sellerhub-error-boundary.test.tsx
```

</div>

逐行机制：

1. 第 1 行是本章 source root，route 会加载这里的 practice root。
2. 第 2-3 行是页面入口与样式，不改变全局架构。
3. 第 4 行是可复用 class Error Boundary。
4. 第 5-6 行是最终 lab 和 SellerHub 风格 boundary wrapper。
5. 第 7 行代表测试放在本章内部，验证用户可见行为。

## 8. 示例运行方式

启动本地 Vite：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">terminal</span></div>

```bash
npm run dev
```

</div>

打开 `/react/chapter-20`。页面中的 crash 按钮只触发被 boundary 包住的 render-time error；event 与 async 示例用本地 state 表达失败，不声称 Error Boundary 捕获它们。

## 9. 分节教学与练习

<a id="section-9-1"></a>
### 9.1 Failure boundary 定位：为什么不是普通 try/catch

错误写法：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">WrongTryCatchBoundary.tsx</span></div>

```tsx
function Parent() {
  try {
    return <RiskyChild />
  } catch (error) {
    return <Fallback error={error} />
  }
}
```

</div>

逐行机制：

1. 第 1 行定义父组件，父组件只是当前 render owner。
2. 第 2 行的 `try` 只覆盖父组件同步执行过程。
3. 第 3 行创建 `<RiskyChild />` 元素描述，通常没有调用 `RiskyChild`。
4. 第 4-5 行只会捕获父组件自己同步抛出的错误。
5. 如果 `RiskyChild` 后续在 React render phase 抛错，这个 `catch` 不是 React 的 recovery boundary。

正确写法：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">CorrectBoundaryOwner.tsx</span></div>

```tsx
function Parent() {
  return (
    <ErrorBoundary boundaryName="Risky child boundary">
      <RiskyChild />
    </ErrorBoundary>
  )
}
```

</div>

逐行机制：

1. 第 1 行仍然是普通函数组件。
2. 第 3 行把 boundary 放在 risky child 的祖先位置。
3. 第 4 行的 child 如果 render 抛错，会沿 React tree 找到第 3 行的 boundary。
4. 第 5 行结束 boundary 子树，定义了 failure blast radius。

练习面板：`FailureBoundaryPanel` 展示错误 owner 和正确 boundary owner 的差异。

<a id="section-9-2"></a>
### 9.2 Error Boundary class：getDerivedStateFromError 与 componentDidCatch

最小可复用 boundary：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">ErrorBoundary.tsx</span></div>

```tsx
class ErrorBoundary extends Component<Props, State> {
  state = { error: null }

  static getDerivedStateFromError(error: unknown) {
    return { error: toError(error) }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }
}
```

</div>

逐行机制：

1. 第 1 行必须是 class component，因为 React Error Boundary API 由 class lifecycle 表达。
2. 第 2 行保存 boundary 是否已经进入 fallback。
3. 第 4 行是 static lifecycle，不能读取 instance props 或 state。
4. 第 5 行把未知 thrown value 规范成 `Error` 并写入 state。
5. 第 8 行在 React 已经捕获错误后运行，适合 logging side effect。
6. 第 9 行把 error 和 `componentStack` 交给外部 `onError`，不直接决定 UI。

fallback prop 形态：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">FallbackRender.tsx</span></div>

```tsx
<ErrorBoundary
  boundaryName="Orders boundary"
  fallbackRender={({ resetErrorBoundary }) => (
    <button onClick={resetErrorBoundary}>Try again</button>
  )}
  onError={logRenderFailure}
>
  <OrdersPanel />
</ErrorBoundary>
```

</div>

逐行机制：

1. 第 1 行创建 boundary 实例。
2. 第 2 行给日志和 fallback 一个稳定边界名。
3. 第 3-5 行把 fallback UI 作为函数注入，便于复用。
4. 第 4 行 reset 只清 boundary state；外部仍需清理失败原因。
5. 第 6 行连接 logging side effect。
6. 第 8 行是受保护子树。

React 目前没有内置 function component 等价 API；在函数组件项目中保留一个小型 class boundary 是可接受的。

<a id="section-9-3"></a>
### 9.3 Render-time error propagation：children 抛错如何冒泡到最近 boundary

嵌套边界例子：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">NearestBoundary.tsx</span></div>

```tsx
<ErrorBoundary boundaryName="Outer route boundary">
  <StableHeader />
  <ErrorBoundary boundaryName="Inner widget boundary">
    <CrashingChart />
  </ErrorBoundary>
</ErrorBoundary>
```

</div>

逐行机制：

1. 第 1 行保护整段 route。
2. 第 2 行 header 是 outer boundary 内的稳定 sibling。
3. 第 3 行给 chart 一个更近的 widget boundary。
4. 第 4 行 chart render 抛错时，最近 boundary 是第 3 行。
5. 第 5 行结束 widget blast radius；outer route boundary 不需要接管这个局部错误。

执行过程：

1. React 调用 `CrashingChart`。
2. `CrashingChart` 在 render phase 抛错。
3. React 向上查找最近 Error Boundary。
4. Inner boundary state 变成 error。
5. Inner boundary render fallback；外层 sibling 继续显示。

<a id="section-9-4"></a>
### 9.4 Error Boundary 不捕获什么：event、async、SSR 与 boundary 自己的错误

event handler 应由 event owner 处理：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">EventOwner.tsx</span></div>

```tsx
function handleClick() {
  try {
    submitOrder()
  } catch (error) {
    setEventError(toMessage(error))
  }
}
```

</div>

逐行机制：

1. 第 1 行是 browser event callback，不是 React render phase。
2. 第 2 行 `try` 覆盖当前点击处理调用栈。
3. 第 3 行可能同步抛出表单或校验错误。
4. 第 4-5 行把错误转成 event owner 的 state。
5. Error Boundary 不参与这个点击错误的捕获。

async request 应由 request lifecycle state 处理：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">RequestOwner.tsx</span></div>

```tsx
async function loadOrders() {
  setStatus('pending')
  try {
    const orders = await fetchOrders()
    setState({ status: 'success', orders })
  } catch {
    setStatus('failed')
  }
}
```

</div>

逐行机制：

1. 第 1 行定义 request owner 的 async action。
2. 第 2 行先进入 pending UI。
3. 第 3-5 行请求成功后进入 success state。
4. 第 6-7 行请求失败后进入 failed state。
5. 这个 Promise rejection 不会自动变成 Error Boundary fallback。

`setTimeout`、`requestAnimationFrame`、SSR runtime error、boundary 自己 render 抛出的错误，也不属于该 boundary 的子树 render recovery。boundary 自己失败时，需要更上层 boundary 接管。

<a id="section-9-5"></a>
### 9.5 Fallback UI：错误信息、用户信任与最小可恢复界面

错误 fallback：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">UnsafeFallback.tsx</span></div>

```tsx
function UnsafeFallback({ error }: { error: Error }) {
  return <pre>{error.stack}</pre>
}
```

</div>

逐行机制：

1. 第 1 行接收 raw error。
2. 第 2 行把 stack trace 直接显示给用户。
3. 这可能暴露内部路径、组件名、业务上下文，也没有提供恢复动作。

安全 fallback：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">RecoveryFallback.tsx</span></div>

```tsx
function RecoveryFallback({ resetErrorBoundary }: Props) {
  return (
    <section role="alert">
      <h3>This section stopped rendering.</h3>
      <button onClick={resetErrorBoundary}>Try again</button>
    </section>
  )
}
```

</div>

逐行机制：

1. 第 1 行只接收 recovery action，不需要把 raw stack 暴露给用户。
2. 第 3 行用 `role="alert"` 表达重要失败状态。
3. 第 4 行用安全语言说明局部区域失败。
4. 第 5 行提供 reset action。
5. 第 7 行结束 fallback 结构，周围 shell 仍可继续显示。

<a id="section-9-6"></a>
### 9.6 Reset 与 retry：state reset、reset key 与恢复路径

reset 与 retry 的关键区别：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">ResetRetry.tsx</span></div>

```tsx
function recoverWidget() {
  setBadInput(null)
  setRetryVersion((version) => version + 1)
}

<ErrorBoundary onReset={recoverWidget} resetKeys={[retryVersion]}>
  <RiskyWidget input={badInput} />
</ErrorBoundary>
```

</div>

逐行机制：

1. 第 1 行定义恢复动作。
2. 第 2 行先移除导致 render crash 的输入。
3. 第 3 行改变 retry version，给外部状态一个新引用。
4. 第 6 行 reset 会调用恢复动作。
5. 第 6 行 `resetKeys` 支持外部 key 变化后重置 fallback。
6. 第 7 行如果仍然收到坏输入，reset 后会再次 crash。

不要把 retry 简化成刷新页面。局部 retry 应该保留 app shell、保留其它稳定 widget，并只重试失败 owner。

<a id="section-9-7"></a>
### 9.7 Suspense fallback vs Error Boundary fallback：loading 和 failure 的边界

正确组合：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">SuspenseErrorComposition.tsx</span></div>

```tsx
<ErrorBoundary boundaryName="Lazy route boundary">
  <Suspense fallback={<p role="status">Loading route...</p>}>
    <LazyRoute />
  </Suspense>
</ErrorBoundary>
```

</div>

逐行机制：

1. 第 1 行 error boundary 处理 rejected import 或 render throw。
2. 第 2 行 Suspense 处理 pending import 或 suspended read。
3. 第 2 行 fallback 是 loading 状态，应使用 status 语义。
4. 第 3 行 lazy route pending 时进入 Suspense fallback。
5. 第 3 行 lazy route rejected 时进入 Error Boundary fallback。

错误观念：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">WrongUseTryCatch.tsx</span></div>

```tsx
try {
  const value = use(resource)
  return <View value={value} />
} catch {
  return <Fallback />
}
```

</div>

逐行机制：

1. 第 1 行试图用普通 `try/catch` 接管 boundary 协议。
2. 第 2 行 `use` 读取 Promise 或 context 时应交给 Suspense / Error Boundary。
3. 第 3 行 fulfilled value 才进入正常 view。
4. 第 4-5 行把 boundary 协议误当普通异常处理，会破坏 pending 与 failure 的区分。

<a id="section-9-8"></a>
### 9.8 Lazy import failure：chunk loading error、Suspense 与 Error Boundary 组合

lazy import 有两个不同结果：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">LazyImportFailure.tsx</span></div>

```tsx
const LazyCatalogRoute = lazy(() => import('./CatalogRoute'))

<ErrorBoundary boundaryName="Catalog route chunk boundary">
  <Suspense fallback={<p role="status">Loading catalog...</p>}>
    <LazyCatalogRoute />
  </Suspense>
</ErrorBoundary>
```

</div>

逐行机制：

1. 第 1 行 dynamic import 返回 Promise。
2. Promise pending 时，第 4 行 Suspense fallback 显示 loading UI。
3. Promise fulfilled 时，第 5 行渲染 loaded route。
4. Promise rejected 时，React 把 rejected reason 抛给最近 Error Boundary。
5. 第 3 行 boundary 显示 chunk failure fallback，而不是继续显示 loading。

Vite client runtime 下的 chunk failure 通常是浏览器请求模块失败、缓存版本不一致或网络失败。恢复动作可以是重新加载 route、刷新 chunk 或提示用户重试，但不能把 rejected import 伪装成 pending。

<a id="section-9-9"></a>
### 9.9 Route-level boundary：页面失败隔离与局部恢复

route boundary 模式：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">RouteBoundary.tsx</span></div>

```tsx
function RouteSegment({ locationKey }: Props) {
  return (
    <ErrorBoundary resetKeys={[locationKey]} boundaryName="Route segment">
      <RouteBody />
    </ErrorBoundary>
  )
}
```

</div>

逐行机制：

1. 第 1 行 route segment 接收当前位置 key。
2. 第 3 行 boundary 只保护 route body，不包住全局 app shell。
3. 第 3 行 `resetKeys` 让导航到新位置时可以重置旧 fallback。
4. 第 4 行 route body 失败时，导航仍在 boundary 外可用。
5. 第 5 行结束 route failure blast radius。

一个 app-level boundary 太粗，会把整个应用替换成 fallback；太多小 boundary 又可能掩盖系统性失败。route-level boundary 适合页面级失败隔离，widget-level boundary 适合局部 third-party 或高风险渲染。

<a id="section-9-10"></a>
### 9.10 Widget-level boundary：第三方组件、图表、插件与局部崩溃隔离

widget boundary 模式：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">WidgetBoundary.tsx</span></div>

```tsx
<DashboardShell>
  <KpiCard />
  <ErrorBoundary boundaryName="Chart widget">
    <ThirdPartyChart />
  </ErrorBoundary>
</DashboardShell>
```

</div>

逐行机制：

1. 第 1 行 dashboard shell 仍然是稳定上下文。
2. 第 2 行 KPI card 不属于 chart failure blast radius。
3. 第 3 行只把 risky chart 放入 widget boundary。
4. 第 4 行 third-party chart render crash 时，仅替换该 chart。
5. 第 6 行 shell 继续显示其它 dashboard 内容。

粒度判断：

- chart、plugin、optional card：优先 widget boundary。
- table row：只有单行高风险且可独立恢复时才考虑 row boundary。
- dashboard shell：只有 shell 自己可能失败时才需要更上层 boundary。

<a id="section-9-11"></a>
### 9.11 Logging boundary：componentStack、owner stack 与 production reporting

logging callback：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">LoggingBoundary.tsx</span></div>

```tsx
function logRenderFailure(error: Error, info: ErrorInfo) {
  queueLocalDiagnostic({
    message: error.message,
    componentStack: info.componentStack,
  })
}
```

</div>

逐行机制：

1. 第 1 行只处理 render failure diagnostic。
2. 第 2 行把日志写入本地队列或外部 adapter。
3. 第 3 行记录安全 message，不包含用户隐私字段。
4. 第 4 行记录 React component stack，用于定位组件树。
5. 第 6 行结束 logging；fallback UI 不应由日志系统决定。

development owner stack：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">OwnerStackDiagnostic.ts</span></div>

```ts
if (import.meta.env.DEV) {
  readDevelopmentOwnerStack()
}
```

</div>

逐行机制：

1. 第 1 行把 owner stack 读取限制在 development。
2. 第 2 行代表诊断读取，不是用户恢复路径。
3. production reporting 需要 source map、去重、关联 ID、隐私过滤和 SDK adapter；本章不接入真实 SDK。

错误 logging 是把 raw user record、token、cookie、payment detail 放入 error payload。正确 logging 只保留必要诊断信息，并让 fallback UI 单独负责用户沟通。

<a id="section-9-12"></a>
### 9.12 Testing failure UI：throwing components、console noise 与 role-based assertions

测试 render crash fallback：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">error-boundary.test.tsx</span></div>

```tsx
const restoreConsole = vi.spyOn(console, 'error').mockImplementation(() => undefined)

try {
  render(<BoundaryHarness />)
  expect(screen.getByRole('alert')).toHaveTextContent('stopped rendering')
} finally {
  restoreConsole.mockRestore()
}
```

</div>

逐行机制：

1. 第 1 行只在当前测试里屏蔽 React 预期 error noise。
2. 第 3 行用 `try` 确保后续一定 restore。
3. 第 4 行渲染会触发 child render crash。
4. 第 5 行按用户可见 role 和文本断言 fallback。
5. 第 6-8 行恢复 console spy，避免污染其它测试。

测试 retry：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">retry-boundary.test.tsx</span></div>

```tsx
const user = userEvent.setup()

await user.click(screen.getByRole('button', { name: /retry/i }))

expect(screen.queryByRole('alert')).not.toBeInTheDocument()
```

</div>

逐行机制：

1. 第 1 行创建真实交互风格的 user instance。
2. 第 3 行按按钮可访问名称点击 retry。
3. 第 5 行断言 fallback 离开 DOM。
4. 测试不依赖 class name，也不声称生产监控已经发送。

<a id="section-9-13"></a>
### 9.13 SellerHub failure mapping：catalog、orders、dashboard、plugin 的 recovery strategy

SellerHub 边界决策表：

| Scenario | Boundary | Reason | Recovery |
| --- | --- | --- | --- |
| Catalog card render crash | Widget boundary | 只有一个 listing card 失败 | 替换该 card，清理坏数据后 reset |
| Orders fetch failure | Request owner | Promise rejection 属于请求生命周期 | 显示 retry UI，不用 Error Boundary 冒充捕获 |
| Dashboard chart plugin crash | Widget boundary | third-party chart 风险高但局部可替换 | fallback card 保留 dashboard |
| Permission panel crash | Route section boundary | 权限 UI 影响页面段 | 保留导航，允许离开或重试 |
| Lazy route chunk failure | Error Boundary around Suspense | rejected import 是 error，不是 pending | 显示 chunk failure recovery |
| Notification toast failure | Optional widget boundary | toast 不应影响主任务 | 丢弃或替换 toast |
| Settings form validation | Form state owner | 这是业务校验，不是 render crash | 字段级错误信息 |
| Audit log widget failure | Widget boundary | 可选审计区失败不阻塞主 dashboard | 局部 fallback |
| Route shell failure | Parent app boundary | shell 自己失败，route boundary 太低 | 显示更上层 fallback |

伪 ADR：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">boundary-decision.md</span></div>

```md
Decision: Place widget boundaries around optional SellerHub cards.
Reason: A widget crash should not remove navigation or sibling metrics.
Consequence: Each widget fallback needs its own reset action.
```

</div>

逐行机制：

1. 第 1 行记录边界放置决策。
2. 第 2 行说明 blast radius 选择依据。
3. 第 3 行明确工程代价：每个 fallback 都要有恢复路径。

<a id="section-9-14"></a>
### 9.14 最终小项目：SellerHub Recovery Boundary Lab

最终 lab 组合：

<div class="macos-code-window">
<div class="macos-titlebar"><span class="macos-dot macos-dot-red"></span><span class="macos-dot macos-dot-yellow"></span><span class="macos-dot macos-dot-green"></span><span class="macos-title">SellerHubRecoveryBoundaryLab.tsx</span></div>

```tsx
export function SellerHubRecoveryBoundaryLab() {
  return (
    <section>
      <CatalogCrashLab />
      <OrdersRetryPanel />
      <DashboardWidgetBoundary />
      <PluginIsolationPanel />
      <SuspenseErrorCompositionPanel />
      <ErrorLogPreview />
      <RecoveryDecisionTable />
    </section>
  )
}
```

</div>

逐行机制：

1. 第 1 行导出最终 lab root，供 Chapter 20 practice page 使用。
2. 第 4 行 catalog 展示 render crash 和 widget recovery。
3. 第 5 行 orders 展示 async failure owner 和 retry UI。
4. 第 6 行 dashboard 展示 chart widget boundary。
5. 第 7 行 plugin 展示 optional extension isolation。
6. 第 8 行展示 Suspense pending 与 Error Boundary failure 组合。
7. 第 9 行展示 local diagnostic preview，不接真实 SDK。
8. 第 10 行把边界决策转成表格，便于代码审查。

该 lab 明确限制：

- 它是 client-side Vite React lab。
- 它不配置真实 monitoring SDK。
- 它不发送真实 production error report。
- 它不创建 SSR server。
- 它不声称 Error Boundaries 捕获 event handler errors。
- 它不声称 Error Boundaries 捕获任意 async callback errors。
- 它不把 raw stack trace 暴露到用户 fallback UI。

## 10. API / 语法索引

| API / Syntax | Role | Notes |
| --- | --- | --- |
| `throw new Error()` | 产生 render-time failure 或普通 JS failure | 是否被 boundary 捕获取决于抛出位置。 |
| `static getDerivedStateFromError` | 选择 fallback state | 必须是 class static method。 |
| `componentDidCatch` | logging side effect | 接收 `error` 和 `info.componentStack`。 |
| `fallbackRender` | 注入 fallback UI | 本项目自定义 prop，不是 React 内置 prop。 |
| `resetKeys` | 外部 reset signal | 只有在 fallback 状态后 key 变化才应触发 reset。 |
| `Suspense fallback` | pending UI | 不处理 rejected import。 |
| `lazy` | dynamic import component | Promise pending 走 Suspense，rejected 走 Error Boundary。 |
| `role="alert"` | 失败状态可访问语义 | 用于重要 fallback。 |
| `role="status"` | pending 状态可访问语义 | 用于 loading fallback。 |

## 11. 常见错误表

| Mistake | Violated Rule | Correct Fix |
| --- | --- | --- |
| 用父组件 `try/catch` 包 JSX 子组件 | JSX 不是 child render call | 在 child 祖先位置放 Error Boundary。 |
| 认为 Error Boundary 捕获 click handler | Event callback 不在 render recovery 内 | 在 event owner 里 `try/catch` 并写入 state。 |
| 认为 Error Boundary 捕获 Promise rejection | Async callback 不自动进入 render throw | 用 request lifecycle state，必要时显式把状态转成 render branch。 |
| loading 和 error 共用同一个 fallback | Suspense pending 与 error failure 语义不同 | Suspense fallback 和 Error Boundary fallback 分开。 |
| fallback 显示 `error.stack` | 用户 UI 暴露内部诊断信息 | 显示安全消息，把 stack 放 logging path。 |
| reset 后马上再次 crash | 没有清除 crash cause | reset boundary state 前后同步清理失败输入。 |
| 一个 app-level boundary 包全部 | blast radius 太大 | 按 route、widget、plugin 放更细边界。 |
| 每个小元素都包 boundary | 过度隔离隐藏系统性失败 | 只给可独立恢复的风险区域放 boundary。 |
| 测试 class name | 测试实现细节 | 用 role、label、text 和 userEvent。 |

## 12. 最终小项目

### 12.1 项目目标

SellerHub Recovery Boundary Lab 把本章机制放进一个可运行页面：catalog render crash、orders async retry、dashboard widget crash、plugin crash、lazy/Suspense composition、logging preview、decision table。

### 12.2 适用场景

这个 lab 适合学习“局部失败不应该拖垮整个工作台”。它不是监控平台、SSR framework、生产错误上报系统或后端故障演示。

### 12.3 页面结构

页面由 Chapter 20 practice root 加载，机制面板先解释单点概念，最终 lab 把这些概念组合成 SellerHub 工作台。

### 12.4 Reusable boundary

`SellerHubErrorBoundary` 包装通用 `ErrorBoundary`，统一 fallback 标题、reset button、boundary name 和 `onError` 接口。

### 12.5 Catalog crash lab

Catalog 按钮触发 render-time crash，nearest widget boundary 显示 fallback。点击 recover 后，owner 清理 crash state，原 card 恢复。

### 12.6 Orders retry panel

Orders 故障由 request state 表达。它展示 retry UI，但不声称 Error Boundary 捕获了 Promise rejection。

### 12.7 Dashboard widget boundary

Dashboard chart 模拟 third-party widget render crash，只替换 chart card，不移除整个 dashboard。

### 12.8 Plugin isolation panel

Plugin slot 是 optional extension boundary。失败插件可以被禁用或替换，不阻断主流程。

### 12.9 Suspense composition

Suspense fallback 表示 lazy preview pending；Error Boundary fallback 表示 lazy preview rejected 或 render throw。

### 12.10 Error log preview

Local preview 展示 `componentDidCatch` 收到的安全诊断摘要，不发送真实报告。

### 12.11 Recovery decision table

Decision table 把 failure scenario 映射到 boundary owner 和 recovery action，训练代码审查判断。

### 12.12 测试目标

测试覆盖 render crash fallback、reset/retry、catalog recover、orders retry、最终 lab major sections。测试不依赖实现 class name，不断言真实 production monitoring。

## 13. 额外速查表

| Failure Source | Boundary Owner | User UI | Test Strategy |
| --- | --- | --- | --- |
| Child render throw | Error Boundary | `role="alert"` fallback | Render throwing component and assert fallback |
| Event handler throw | Event owner | Inline error or toast | Click button and assert state-driven message |
| Fetch rejection | Request owner | Pending/error/success state | Mock request owner or state transition |
| Lazy pending | Suspense | `role="status"` loading | Assert loading or loaded content |
| Lazy rejection | Error Boundary | Chunk failure fallback | Simulate rejected lazy import |
| Chart plugin crash | Widget boundary | Fallback card | Crash widget and assert sibling remains |
| Route body crash | Route boundary | Route fallback with navigation | Assert shell remains visible |
| Production report | Monitoring adapter | Not user recovery UI | Unit test adapter separately if present |

## 14. 工程迁移与代码审查要点

- Boundary placement review：boundary 必须在 risky child 的祖先位置，不能放在 child 内部。
- Fallback UI review：用户 fallback 不显示 raw stack，不包含敏感字段，有明确 next action。
- Retry/reset review：reset 必须清理 crash cause；只清 boundary state 不够。
- Logging review：`componentDidCatch` 记录安全 diagnostic，不把 logging 变成 recovery decision。
- Event/async review：event handler 与 async request 有自己的 state owner，不用 Error Boundary 冒充捕获。
- Suspense/error composition review：pending fallback 和 error fallback 必须分离。
- Route-level recovery review：route body failure 不应移除 app shell 和导航。
- Widget/plugin isolation review：optional plugin、chart、card 失败应局部替换。
- Test evidence review：测试用 role/text/userEvent，console spy 必须局部 restore。
- Production reporting boundary review：如果以后接入 SDK，应放在 adapter 层，处理 source map、dedupe、correlation id、privacy filter。

## 15. 如何转换成个人笔记

建议把笔记拆成四组：

1. “捕获范围”：render/lifecycle/constructor vs event/async/SSR。
2. “class boundary API”：`getDerivedStateFromError`、`componentDidCatch`、fallback render。
3. “恢复 UX”：fallback、reset、retry、navigation、request state。
4. “工程放置”：app、route、panel、widget、plugin、row 的边界粒度。

每组都要写一个反例：父组件 `try/catch`、event error 冒充 boundary、Promise rejection 冒充 boundary、loading fallback 冒充 error fallback。

## 16. 必须能回答的问题

1. 为什么父组件 `try/catch` 不能捕获 child render error？
2. `getDerivedStateFromError` 和 `componentDidCatch` 的职责差异是什么？
3. Error Boundary 捕获哪些错误，不捕获哪些错误？
4. event handler error 应该放在哪里处理？
5. Promise rejection 为什么通常属于 request state owner？
6. Suspense fallback 和 Error Boundary fallback 有什么语义差异？
7. lazy import Promise rejected 后进入哪里？
8. fallback UI 为什么不应该显示 raw stack trace？
9. reset 为什么必须同时清理 crash cause？
10. route-level boundary 和 widget-level boundary 应该怎么选择？
11. logging boundary 为什么不是 production monitoring 本身？
12. 测试 Error Boundary fallback 时为什么要局部恢复 `console.error` spy？

## 17. 最终记忆模型

Error Boundary 不是“React 版 try/catch”。它是 React render tree 上的 failure isolation boundary：

- child render 抛错 → 最近 ancestor Error Boundary 接管；
- boundary state 改变 → fallback UI 替换失败子树；
- `componentDidCatch` → 记录诊断；
- reset/retry → owner 清理失败原因并重试；
- event/async/request/server → 各自 owner 处理，不冒充 boundary 捕获；
- Suspense pending 和 Error failure 必须分开；
- SellerHub 迁移时按 blast radius 放 route、widget、plugin、request owner。

## 18. 官方文档阅读清单

- React `Component` reference：阅读 `static getDerivedStateFromError`、`componentDidCatch` 和 catching rendering errors with an Error Boundary。
- React `lazy` reference：阅读 lazy import Promise pending / rejected 的处理。
- React `Suspense` reference：阅读 fallback 触发条件和 Suspense 的边界。
- React eslint `error-boundaries` rule：阅读为什么 `try/catch` 不能捕获 child render error。
- React `captureOwnerStack` reference：阅读 development-only owner stack 和 component stack 的区别。
- Testing Library About Queries：优先使用 role、label、text 查询。
- Testing Library user-event intro：用真实交互方式触发 retry。
- Vitest mocking docs：测试中 mock console 后必须 restore。
