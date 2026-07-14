# React 第 25 章：Deployment Observability、Runtime Error、Performance Evidence 与 Release Gate

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
  - [9.1 Release readiness boundary：evidence before deployment confidence](#section-9-1)
  - [9.2 Build artifact evidence：dist、hashed assets、chunk names、base path 与 static preview](#section-9-2)
  - [9.3 Runtime config evidence：env mode、public config、build id、version 与 feature flags](#section-9-3)
  - [9.4 Runtime error boundary：window error、unhandledrejection、Error Boundary logging 与 fallback](#section-9-4)
  - [9.5 Error classification：render、chunk、request、parse 与 user action failures](#section-9-5)
  - [9.6 Source map boundary：stack mapping、privacy、upload 与 release id](#section-9-6)
  - [9.7 Performance API marks and measures：user timing、navigation timing 与 route timing](#section-9-7)
  - [9.8 React Profiler boundary：render duration、commit、actualDuration 与 overhead](#section-9-8)
  - [9.9 Web Vitals boundary：LCP、INP、CLS、lab vs field data 与 release thresholds](#section-9-9)
  - [9.10 Bundle and chunk review：route chunks、waterfall、lazy boundary 与 asset size evidence](#section-9-10)
  - [9.11 Async and data-flow observability：request lifecycle、retry、abort、stale response 与 cache evidence](#section-9-11)
  - [9.12 Accessibility release evidence：role/name tests、keyboard path、focus、dialog 与 live regions](#section-9-12)
  - [9.13 Security and privacy boundary：public env、telemetry payload、PII、CSP 与 dependency review](#section-9-13)
  - [9.14 Smoke tests and release gates：lint、typecheck、tests、build、preview 与 manual checks](#section-9-14)
  - [9.15 Rollback and feature flag boundary：disable、revert、fallback 与 blast radius](#section-9-15)
  - [9.16 Incident triage boundary：symptom、scope、reproduction、evidence、mitigation 与 notes](#section-9-16)
  - [9.17 SellerHub release readiness mapping：catalog、orders、dashboard、settings、auth 与 deployment](#section-9-17)
  - [9.18 Final mini project：SellerHub Release Evidence Lab](#section-9-18)
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
| Release readiness evidence | Release owner and gate reviewer | tooling / process boundary | 判断一个前端版本是否可以继续发布 | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/01-release-readiness/release-readiness-boundary-panel.tsx` |
| Build artifact evidence | Vite build artifact | tooling / static artifact | 检查 `dist`、hashed assets、route chunks 与 `base` | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/02-build-artifact/build-artifact-model.ts` |
| Runtime config snapshot | Client runtime config owner | Vite env / browser runtime | 记录 `buildId`、`appVersion`、public flags，拒绝 public secrets | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/03-runtime-config/runtime-config-model.ts` |
| Runtime diagnostics | Browser global error boundary and React Error Boundary | browser platform / React framework | 区分 `error`、`unhandledrejection`、`componentDidCatch` | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/04-runtime-errors/runtime-error-model.ts` |
| Failure classification | Triage owner | application model | 把 render、chunk、request、parse、abort、timeout 映射到恢复 owner | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/05-error-classification/error-classifier.ts` |
| Source map release boundary | Release diagnostics owner | build artifact / privacy boundary | 记录 release id 与 source map privacy，不上传 | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/06-source-map/source-map-release-model.ts` |
| Performance marks and measures | Browser Performance API boundary | browser platform API | 用 deterministic route timing 解释 `performance.mark` / `performance.measure` | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/07-performance-api/performance-measure-model.ts` |
| React Profiler render metric | React render diagnostic boundary | React framework runtime | 解释 `actualDuration`、`baseDuration`、`commitTime` 与 overhead | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/08-react-profiler/react-render-metric-model.ts` |
| Core Web Vitals threshold | Field-performance evidence boundary | browser/user-experience metric | 把 LCP、INP、CLS 分成 teaching model、lab evidence、field evidence | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/09-web-vitals/web-vitals-threshold-model.ts` |
| Bundle and chunk review | Route chunk owner | Vite/Rolldown artifact boundary | 判断 route chunk 是否过大或缺少 owner | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/10-bundle-chunk-review/chunk-review-model.ts` |
| Async observability | Request owner | application runtime / browser request boundary | 记录 request id、resource key、status，隐藏 payload | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/11-async-observability/request-observability-model.ts` |
| Accessibility release evidence | UI owner and tester | DOM / accessibility tree boundary | 用 role/name、keyboard、focus、live region 形成 release evidence | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/12-accessibility-release/accessibility-release-evidence-panel.tsx` |
| Security and privacy review | Frontend release reviewer | client boundary / privacy boundary | 清理 telemetry payload，识别 public env 与 PII 风险 | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/13-security-privacy/telemetry-payload-model.ts` |
| Release gate evaluation | Release gate owner | tooling / process model | `PASS` 才能通过，`UNKNOWN` 和 `FAIL` 都阻断 | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/14-release-gates/release-gate-model.ts` |
| Feature flag rollback | Operational owner | runtime config / operations boundary | flag 必须有 fallback、disable path 与 blast-radius review | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/15-rollback-feature-flag/feature-flag-model.ts` |
| Incident triage record | Triage owner | operations boundary | 用 symptom、scope、version、route、evidence、mitigation 组织事故材料 | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/16-incident-triage/incident-triage-model.ts` |
| SellerHub release map | Feature/release owner | integration boundary | 将 catalog、orders、dashboard、settings、auth 等场景映射到 release evidence | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/17-sellerhub-release-map/sellerhub-release-readiness-map.tsx` |
| SellerHub Release Evidence Lab | Chapter 25 practice owner | Vite client runtime | 在 `/react/chapter-25` 展示本地 deterministic release evidence lab | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/sellerhub-release-evidence-lab/sellerhub-release-evidence-lab.tsx` |

## 0. 本章工程问题与边界

本章把“发布准备”定义成一个 evidence boundary：前端版本是否可发布，不能由“我本地点过一次”决定，而要由 build artifact、runtime config、runtime error、performance evidence、accessibility evidence、privacy review、release gate、rollback plan 与 incident triage record 共同支撑。

本章必须区分这些边界：

- `npm run build` 证明当前源码能生成静态 artifact，但不证明真实生产 host、CDN cache、HTML rewrite、browser cache、field performance 全部正确。
- `vite preview` 是本地静态预览，用来检查 build output 是否能在本机被静态 server 服务；它不是 production server。
- Runtime error logging 负责记录 developer diagnostic；它不是 user recovery。用户恢复需要 fallback UI、retry、reload、disable flag 或 rollback。
- Error Boundary fallback 负责 render-time failure isolation；它不是 monitoring SDK，也不能捕获所有 event handler、async callback、server-side 或 boundary 自身错误。
- Source map 是诊断 artifact。它能帮助把 minified stack 关联到 release source context，但如果公开或上传策略错误，可能暴露源码上下文。
- Performance marks 是 local runtime evidence；Web Vitals 是用户体验指标，真实 field data 要来自真实用户环境或受控 RUM 系统。本章不伪造 RUM，也不安装 `web-vitals`。
- Feature flag 能降低 blast radius，但不能替代 lint、typecheck、test、build、preview smoke 与 manual review。
- Rollback 是 operational control，不是 React catch block。

本章不创建生产部署、不创建监控服务、不发送真实 telemetry、不上传 source maps、不创建 backend、不创建 SSR、不迁移到 Next.js，也不把本地 measurement 说成 production truth。

## 1. 本章解决的问题

学习者完成前 24 章后，已经见过组件、state、routing、performance、error boundary、accessibility、Vite build、SPA deployment boundary、data fetching 和 cache boundary。第 25 章解决的是另一个问题：当这些能力被组合成一个版本时，怎样判断它具备发布准备度。

本章解决 12 个具体混淆：

1. 为什么“本地能跑”不等于 release ready。
2. 为什么 build-time、local preview、runtime、field telemetry 和 production host 是不同 evidence boundary。
3. 为什么 `vite preview` 只能证明本地静态预览，不是生产承载能力。
4. 为什么 release metadata 必须包含 build id、version、environment、route、feature flags。
5. 为什么 runtime errors、unhandled promise rejections、Error Boundary failures、chunk loading failures 和 request failures 要分类。
6. 为什么 source maps 是诊断 artifact，且有 privacy/upload boundary。
7. 为什么 Performance API marks/measures 适合记录局部 runtime timing，但不能替代 field metrics。
8. 为什么 Core Web Vitals 要按 lab 与 field 分开读。
9. 为什么 React Profiler 是 render diagnostic，不是默认生产 logger。
10. 为什么 smoke tests、accessibility checks、data tests、build checks 和 release gates 要组合成可审查流程。
11. 为什么 rollback 是运营边界，不是组件错误处理。
12. 怎样把 SellerHub 的 catalog、orders、dashboard、settings、auth 场景映射到 release evidence。

## 2. 前置概念

| Concept | Why It Is Required |
| --- | --- |
| Vite build and preview | 需要理解 `dist`、static preview、base path 与 hashed assets 的边界。 |
| React Error Boundary | 需要区分 render-time fallback、`componentDidCatch` diagnostic 与浏览器 global errors。 |
| React Profiler | 需要理解 `actualDuration`、`baseDuration`、`commitTime` 是 React render evidence。 |
| Browser Performance API | 需要理解 mark、measure、navigation timing 与 resource timing 都来自 browser timeline。 |
| Core Web Vitals | 需要理解 LCP、INP、CLS 是用户体验指标，而且 field data 不等于一次 local run。 |
| Chapter 21 accessibility evidence | 需要把 role/name、keyboard、focus、live region 作为 release evidence。 |
| Chapter 24 async data boundary | 需要把 request id、resource key、abort、stale response、cache hit/miss 与 release diagnostics 连接起来。 |
| TypeScript discriminated unions | 需要用 `PASS` / `FAIL` / `UNKNOWN`、failure kind、feature flag decision 等 model 表达不可能状态。 |

## 3. 学习目标

完成本章后，你应该能：

- 解释 release readiness 为什么是 evidence boundary。
- 设计 build artifact summary，并说明 `vite preview` 不是 production server。
- 设计 client runtime config snapshot，并识别 public `VITE_` config 中的 secret 风险。
- 规范化 `window error`、`unhandledrejection` 与 Error Boundary log event。
- 把 render、chunk、network、HTTP、parse、abort、timeout、user action 与 unknown failures 分类。
- 说明 source map 的 release id、privacy、upload boundary，而不把 source map 当作 error prevention。
- 用 Performance API 思路命名 mark 与 measure，解释 local timing 与 field telemetry 的差异。
- 用 React Profiler event 判断 render cost，但不把它当作默认生产监控。
- 用 LCP、INP、CLS threshold 建模 lab evidence 与 field evidence 的差异。
- 审查 route chunks、lazy boundary、chunk ownership 和 asset size。
- 设计 request diagnostic，不泄露 payload、PII、tokens 或 cookies。
- 用 `PASS` / `FAIL` / `UNKNOWN` 实现 release gate，其中 `UNKNOWN` 不能当作 `PASS`。
- 设计 feature flag disable path 与 rollback record。
- 写出 incident triage record 的最小证据集合。
- 在 SellerHub 场景中把 release evidence 映射到 route、component、request、chunk、flag 与 triage owner。

## 4. 机制依赖图

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| Build artifact | Local preview | preview 服务的是 build output；没有 artifact，就没有 preview evidence。 | 把 dev server 正常误认为 production bundle 正常。 |
| Runtime config | Release metadata | `buildId`、`version`、`mode` 和 feature flags 是后续 error/performance/rollback 的关联 key。 | Error log 无法定位到具体 release。 |
| Runtime error source | Error classification | 先知道错误来自 render、global window、promise、request 或 chunk，才能选择 recovery owner。 | 所有错误都显示一个 fallback，triage 无法推进。 |
| Source map boundary | Stack trace diagnosis | source map 帮助读 minified stack，但它不是错误恢复，也有 privacy risk。 | 错误地公开 source maps 或假设 source map 能防止 crash。 |
| Performance marks | Web Vitals boundary | local marks 是开发者定义的 timeline point；Web Vitals 是用户体验指标。 | 把一次 local timing 当成 field performance。 |
| React Profiler event | Render performance review | `actualDuration` / `baseDuration` 只描述 React render cost，不描述 network 或 backend。 | 把 request 慢误判为 React render 慢。 |
| Async request evidence | Release gate | 请求 status、resource key、cache hit/miss 是 preview smoke 与 triage evidence 的输入。 | Release gate 只看 build 成功，忽略运行时数据路径。 |
| Accessibility evidence | Manual release review | 自动测试不能证明完整 accessibility；keyboard 和 focus path 需要单独确认。 | 发布后出现可键盘访问失败或 screen reader 语义缺失。 |
| Privacy review | Telemetry model | 先知道哪些值不能离开 client，才能设计 diagnostic payload。 | Error log 或 request log 泄露 token、email、cookie。 |
| Feature flag | Rollback | flag 有 disable path 与 fallback 时，rollback 才能降低 blast radius。 | Flag 打开后无法快速关闭，rollback 只能重新发版。 |
| Incident triage | Post-release notes | triage record 把 symptom、scope、version、route、evidence、mitigation 固定下来。 | 事后只剩猜测，无法形成可复盘材料。 |

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| Build artifact | 由 production build 生成的静态输出，例如 `dist`、hashed JS/CSS、assets。 | tooling / static artifact | 是部署输入，不等于生产运行结果。 |
| Local preview | 本地静态 server 服务 build output 的检查方式。 | tooling boundary | 能发现 artifact 和 base path 问题，但不是 production host。 |
| Release metadata | `buildId`、`appVersion`、`environment`、route、feature flag 等 release identity。 | process / runtime config | 把 error、performance、rollback 与具体版本关联起来。 |
| Runtime config | client runtime 能读取的 public config snapshot。 | Vite env / browser runtime | `VITE_` 值会进入 client bundle，不能放 secrets。 |
| Runtime error | 浏览器或 React runtime 中发生的错误事件。 | browser / React runtime | 需要分类、sanitize、correlate。 |
| Error Boundary failure | 子树 render 抛错后由最近 Error Boundary 捕获的 failure。 | React framework | 提供 fallback 与 `componentStack` diagnostic，但不是全局 catch。 |
| Source map | 把 minified code position 映射回 source context 的 artifact。 | build artifact / diagnostic | 有 release id 与 privacy/upload boundary。 |
| Performance mark | 浏览器 performance timeline 中命名 timestamp marker。 | browser platform API | 用于记录 route transition、interaction、feature timing 等 local evidence。 |
| Performance measure | 两个 mark 或 timestamp 之间的 duration。 | browser platform API | 用于比较 deterministic route timing 或 lab measurement。 |
| React Profiler event | `<Profiler>` `onRender` 产生的 render timing event。 | React framework | `actualDuration` / `baseDuration` 判断 render cost 与 memoization signal。 |
| Core Web Vitals | LCP、INP、CLS 三个用户体验指标。 | user-experience metric | 真实 release gate 通常需要 field percentile evidence。 |
| Release gate | 发布前必须满足的检查集合。 | process model | `UNKNOWN` 不能当作 `PASS`。 |
| Rollback | 将影响面降回安全状态的运营动作。 | operations boundary | 不是 React error handler。 |
| Incident triage | 整理 symptom、scope、version、evidence、mitigation 的诊断过程。 | operations boundary | 防止用猜测替代证据。 |

## 6. 底层心智模型

一个前端 release 可以看成四层证据链：

1. **Build layer**：source code 经 TypeScript、Vite 和 bundler 生成 artifact。这里关心 syntax/type/build 是否通过、`dist` 是否存在、asset URL 是否被 `base` 正确改写、lazy route chunk 是否有 owner。
2. **Local runtime layer**：artifact 被本地 preview 或 dev server 加载，浏览器执行 JS，React render UI，Performance API 记录 timing，Error Boundary 捕获 render failure。这里关心本地 smoke、runtime config、request diagnostics、fallback UI。
3. **Field boundary**：真实用户设备、网络、浏览器、CDN、cache、host、third-party scripts 共同决定 field behavior。Web Vitals field data 和 production monitoring 属于这一层，本章只讲边界，不伪造数据。
4. **Operational layer**：release gate、feature flag、rollback、incident triage 和 post-release notes 把技术证据转成发布决策。这里关心谁负责、何时阻断、如何恢复、怎样复盘。

TypeScript 在这里的作用是约束 evidence model 的形状，例如 `ReleaseGateStatus = 'PASS' | 'FAIL' | 'UNKNOWN'`。它不能在 runtime 自动证明 production host 正常，也不能自动阻止 secret 被写进 public config。React 的作用是提供 UI runtime 和诊断边界，例如 Error Boundary 与 Profiler；它也不能替代 browser Performance API、Vite build artifact review 或 operational rollback。

## 7. 推荐目录结构

### 当前项目结构

当前项目是 Vite + React + TypeScript 学习项目，实践入口由 `src/site/data/learning-manifest.ts` 统一挂载。

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
  package.json
  src/
    App.tsx
    site/
      data/
        learning-manifest.ts
    learning/
      react/
        chapter-25-deployment-observability-runtime-error-performance-release-gate/
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
docs/
  react/
    chapter-25-deployment-observability-runtime-error-performance-release-gate/
      react-chapter-25-learning-guide.md
```
</div>

### 机制阅读路径

这里是学习路径索引，不是交付状态表。阅读时先看 model，再看 panel，最后看 final lab。

| Topic | Source Reading Path |
| --- | --- |
| Build artifact model | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/02-build-artifact/build-artifact-model.ts` |
| Runtime config model | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/03-runtime-config/runtime-config-model.ts` |
| Runtime error model | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/04-runtime-errors/runtime-error-model.ts` |
| Error classifier | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/05-error-classification/error-classifier.ts` |
| Performance measure model | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/07-performance-api/performance-measure-model.ts` |
| React render metric model | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/08-react-profiler/react-render-metric-model.ts` |
| Web Vitals threshold model | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/09-web-vitals/web-vitals-threshold-model.ts` |
| Final lab root | `src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/sellerhub-release-evidence-lab/sellerhub-release-evidence-lab.tsx` |

### 概念示例结构

下面的 snippet 名称只用于解释机制，不表示要创建这些文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets:
  Snippet: manual confidence only
  Snippet: public secret config
  Snippet: raw diagnostic leak
  Snippet: local metric as field data
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
src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/
  chapter-25-practice-root.tsx
  chapter-25-practice.css
  sellerhub-release-evidence-lab/
    sellerhub-release-evidence-lab.tsx
    sellerhub-release-evidence-data.ts
    release-metadata-card.tsx
    runtime-error-simulator.tsx
    error-boundary-log-preview.tsx
    performance-mark-lab.tsx
    react-profiler-sample-panel.tsx
    web-vitals-threshold-card.tsx
    bundle-chunk-review-card.tsx
    async-observability-card.tsx
    accessibility-release-check-card.tsx
    security-privacy-review-card.tsx
    release-gate-checklist.tsx
    rollback-decision-panel.tsx
    incident-triage-card.tsx
    release-readiness-review-table.tsx
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
npm install
npm run dev
```
</div>

打开 Vite 输出的本地地址后进入：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
/react/chapter-25
```
</div>

如果要检查 build artifact 的本地静态预览，可以在 build 后运行 preview。注意 preview 是本地检查，不是生产 server。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run build
npm run preview
```
</div>

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Release readiness boundary：evidence before deployment confidence

**结论：**

Release readiness 是 evidence model，不是主观 confidence。一个版本要进入发布流程，至少要记录 build-time evidence、runtime evidence、manual smoke evidence、field-boundary plan、rollback evidence 和 incident triage path。

**本节解决的问题：**

错误的发布判断通常是“我本地打开过，所以可以发布”。这违反了 owner boundary：本地开发者只验证了当前机器、当前 mode、当前 route 的一小段行为，不能代表 build artifact、production host、cache、runtime config、field performance 或 rollback path。

**机制证据链：**

触发动作是 release owner 准备发版；JavaScript model 创建一个 `checks` array；TypeScript 限制每个 check 的 status 只能是 `PASS`、`FAIL`、`UNKNOWN`；release gate evaluator 读取所有 check；只要存在 `FAIL` 或 `UNKNOWN`，`ready` 就是 `false`。这个结果不是 React render 产生的，而是发布流程 model 产生的。React 只负责把 model 展示给用户。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: release readiness decision</span>
  </div>

```ts
type ReleaseGateStatus = 'PASS' | 'FAIL' | 'UNKNOWN'

type ReleaseCheck = {
  name: string
  status: ReleaseGateStatus
}

function isReleaseReady(checks: ReleaseCheck[]): boolean {
  return checks.every((check) => check.status === 'PASS')
}

const manualConfidenceOnly = true
const correctedChecks: ReleaseCheck[] = [
  { name: 'build', status: 'PASS' },
  { name: 'preview smoke', status: 'UNKNOWN' },
]
```
</div>

**逐行解释：**

第 1 行把 status 限制成三个显式状态；第 3-6 行定义 release check 的 shape；第 8-10 行说明 release readiness 必须来自 array 中每个 check 的状态；第 12 行是错误边界，只有 boolean confidence，没有 evidence owner；第 13-16 行是修正形式，preview smoke 未验证时必须保留 `UNKNOWN`。

**执行过程：**

当 `isReleaseReady(correctedChecks)` 执行时，runtime 遍历两个对象。第一个对象 status 是 `PASS`，第二个对象 status 是 `UNKNOWN`，`every` 返回 `false`。TypeScript 不会运行检查，它只在编译期防止写出无效 status，例如 `'DONE'`。

**错误边界与修正：**

错误形式是 `const manualConfidenceOnly = true`，它没有 build output、route smoke、runtime config、rollback path 的 evidence。修正形式是把每一项检查建模成 `ReleaseCheck`，让 `UNKNOWN` 保持阻断状态。

**如何识别同类问题：**

如果发布讨论中只有“我试过了”“应该没问题”，却没有 command output、route smoke、runtime config、rollback owner 或 incident note，那么它仍是 confidence，不是 readiness。

<a id="section-9-2"></a>

### 9.2 Build artifact evidence：dist、hashed assets、chunk names、base path 与 static preview

**结论：**

Vite build artifact 是部署输入；`vite preview` 是本地静态预览。build 成功不能证明 production host 正常，preview 正常也不能证明 CDN cache、HTML rewrite、security headers 或 real user traffic 正常。

**机制证据链：**

触发动作是 `vite build`；Vite 以 `index.html` 为入口生成 `dist`；hashed assets 让浏览器 cache 可以区分版本；route chunks 体现 lazy boundary；`base` 影响 asset URL；preview server 只读取本地 `dist`。TypeScript 对这些 artifact 不做运行时验证，所以本章用 build artifact model 把 evidence 固定下来。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/02-build-artifact/build-artifact-model.ts</span>
  </div>

```ts
type BuildServingMode = 'build-output' | 'local-preview' | 'production-host'

type BuildAsset = {
  fileName: string
  hashed: boolean
  kind: 'entry' | 'route-chunk' | 'style' | 'asset'
  route?: string
  sizeKb: number
}

const wrongServingMode = 'local-preview'
const previewIsProduction = false
```
</div>

**逐行解释：**

第 1 行把 artifact、preview、production host 分成三个状态；第 3-9 行记录每个 asset 的 file name、hash、类型、route owner 与 size；第 11 行代表常见错误：把 local preview 当作 release host；第 12 行是修正边界，preview 永远不能等于 production。

**执行过程：**

当 build artifact summary 被计算时，runtime 会过滤 `kind === 'route-chunk'` 的 assets，检查是否有 hashed file，检查 `basePath` 是否明确。React 页面只展示 summary；真正的 evidence owner 是 artifact review。

**错误边界与修正：**

错误边界是“`npm run preview` 能打开，所以 production deploy 已通过”。修正形式是记录 `mode: 'local-preview'`，再单独保留 production host review、HTML cache policy、static host rewrite 和 base path review。

**如何识别同类问题：**

如果 release note 只写 build 成功，却没有 `dist`、hash、route chunk、base path、preview smoke 和 production host boundary，那么 build evidence 还不完整。

<a id="section-9-3"></a>

### 9.3 Runtime config evidence：env mode、public config、build id、version 与 feature flags

**结论：**

Vite client runtime 只能安全读取 public config。`VITE_` variables 会进入 client bundle，不能存 token、password、cookie、private key 或 server secret。

**机制证据链：**

触发动作是 app 启动读取 `import.meta.env`；Vite 在 build 时替换 env constants；JavaScript runtime 读取已经进入 bundle 的 public value；React component 用这些值展示 release metadata；TypeScript 可以限制 snapshot shape，但不能判断某个 string 是否真的是 secret，所以 model 需要 key/value pattern review。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: runtime config snapshot</span>
  </div>

```ts
const wrongPublicConfig = {
  VITE_API_TOKEN: 'sk-secret',
}

const correctedPublicConfig = {
  VITE_APP_VERSION: '25.0.0-lab',
  VITE_RELEASE_ID: 'sellerhub-2026.07.14T0800Z',
  VITE_RELEASE_CHANNEL: 'learning-preview',
}
```
</div>

**逐行解释：**

第 1-3 行是错误形式：key 和 value 都暴露 secret 风险；第 5-9 行是修正形式，只保留可公开的 version、release id 和 channel。真正的 server secrets 应该留在 backend、serverless 或受保护的 platform config 中，而不是进入 client bundle。

**执行过程：**

runtime config model 遍历 public config entries。key 匹配 `token`、`secret`、`password` 等词时生成 issue；value 看起来像 bearer token、private key 或 API key 时也生成 issue。React 只显示 issue count，不读取真实 secret。

**错误边界与修正：**

错误边界是把 `VITE_` 当作 secret storage。修正方式是只把非敏感 release metadata 放入 client config，把 secret-dependent operation 移到 server boundary。

**如何识别同类问题：**

看到 `VITE_API_TOKEN`、`VITE_SECRET`、`VITE_PASSWORD` 或 client code 中的 bearer token，就要立即停下做 public config review。

<a id="section-9-4"></a>

### 9.4 Runtime error boundary：window error、unhandledrejection、Error Boundary logging 与 fallback

**结论：**

`window` 的 `error` event、`unhandledrejection` event 和 React Error Boundary 的 `componentDidCatch` 不是同一个机制。它们都能产生 diagnostic evidence，但用户恢复要靠 fallback、retry、reload、disable flag 或 rollback。

**机制证据链：**

同步 script error 触发 `error` event；没有 handler 的 rejected Promise 触发 `unhandledrejection`；render subtree 抛错时 React 找最近 Error Boundary 并调用 lifecycle。JavaScript error object 可能包含 stack、message、name；React Error Boundary 额外提供 `componentStack`；TypeScript 只能把 normalizer input typed 成 `unknown`，不能保证 thrown value 一定是 `Error`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: runtime diagnostic normalization</span>
  </div>

```ts
type RuntimeDiagnosticSource =
  | 'window-error'
  | 'unhandled-rejection'
  | 'error-boundary'

type RuntimeDiagnosticEvent = {
  source: RuntimeDiagnosticSource
  message: string
  correlationId: string
  componentStack?: string
}

const wrongUiMessage = 'TypeError: token=abc seller@example.com'
const correctedUiMessage = 'Something went wrong. The diagnostic was recorded.'
```
</div>

**逐行解释：**

第 1-4 行把来源固定成三个可区分的 diagnostic source；第 6-11 行记录 source、sanitized message、correlation id 和可选 component stack；第 13 行是错误形式，把 raw stack 或 sensitive query 直接显示给用户；第 14 行是修正形式，用户看到安全 fallback，开发者诊断进入 sanitized event。

**执行过程：**

normalizer 收到 `unknown` error 后先判断是否是 `Error`，再读取 message/name/stack。随后 sanitizer 删除 email、bearer token、query secret。React 渲染 fallback 时读取的是 user-facing message，不是 raw diagnostic。

**错误边界与修正：**

错误边界是“记录错误等于恢复用户”。修正方式是把 logging boundary 与 recovery boundary 分开：diagnostic 记录给开发者，fallback/retry 给用户。

**如何识别同类问题：**

如果 UI 中出现 stack trace、token、email、source URL query，说明 diagnostic boundary 泄露到了 user boundary。

<a id="section-9-5"></a>

### 9.5 Error classification：render、chunk、request、parse 与 user action failures

**结论：**

错误分类决定恢复 owner。render error 由 Error Boundary 隔离；chunk loading error 可能需要 reload 或 fallback；network/HTTP/parse error 归 request owner；abort/timeout 是 request lifecycle；user action error 要回到 event handler 和 UI affordance。

**机制证据链：**

触发动作可能来自 render、dynamic import、fetch、JSON parse、AbortController、timeout 或 event handler。JavaScript runtime 只给你 message、name、status 或 source；classifier 把这些 signals 映射成 discriminated kind；React 组件根据 kind 展示不同 fallback；TypeScript 保证 `kind` 只能是已知 union。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/05-error-classification/error-classifier.ts</span>
  </div>

```ts
type RuntimeFailureKind =
  | 'render'
  | 'chunk'
  | 'network'
  | 'http'
  | 'parse'
  | 'abort'
  | 'timeout'
  | 'user-action'
  | 'unknown'

const wrongKind = 'failed'
const correctedKind: RuntimeFailureKind = 'chunk'
```
</div>

**逐行解释：**

第 1-10 行定义恢复策略需要的分类空间；第 12 行是错误形式，它把所有失败压成一个模糊词；第 13 行是修正形式，`chunk` 表明需要检查 route asset、dynamic import、HTML cache 与 reload path。

**执行过程：**

classifier 先检查 render source，再检查 chunk loading message，再检查 abort/timeout name，再根据 HTTP status、parse message 和 network message 分支。分支顺序很重要：`AbortError` 不应该被当作 unknown network failure。

**错误边界与修正：**

错误边界是只返回 `Something failed`。修正方式是返回 `{ kind, recoveryOwner, triageSignal }`，让 UI 与 triage 读取同一个 classification object。

**如何识别同类问题：**

如果 bug report 里只有“页面坏了”，但没有 kind、route、status、request id、component stack 或 asset URL，就需要先补分类证据。

<a id="section-9-6"></a>

### 9.6 Source map boundary：stack mapping、privacy、upload 与 release id

**结论：**

Source map 能把 minified stack 映射回 source context，但它不防止错误，也不自动安全。source map 要和 release id 关联，并明确 private upload、public asset 或 disabled boundary。

**机制证据链：**

触发动作是 runtime error 产生 minified stack；diagnostic system 读取 release id；如果存在对应 source map，stack position 可以映射到 source context；如果 source map 被公开，用户也可能访问 source context；TypeScript 只能记录 exposure mode，不能执行上传安全策略。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: source map release record</span>
  </div>

```ts
type SourceMapExposure = 'disabled' | 'private-upload-only' | 'public-asset'

const wrongExposure: SourceMapExposure = 'public-asset'
const correctedExposure: SourceMapExposure = 'private-upload-only'
const uploadPerformed = false
```
</div>

**逐行解释：**

第 1 行列出三个 source map exposure mode；第 3 行是高风险边界，public source map 可能暴露 source context；第 4 行是更安全的 future integration 边界；第 5 行强调本章只记录 upload readiness，不执行 upload。

**执行过程：**

source map model 读取 `releaseId`、`mapFileCount`、`uploadTarget` 和 `exposure`。只有 private upload target 存在、map file count 大于 0、release id 非空时，`uploadReady` 才为 true；但 `uploadPerformed` 固定为 false，因为本章不做真实上传。

**错误边界与修正：**

错误边界是“source map 越公开越方便”。修正方式是把 source maps 当作受控 diagnostic artifact，先做 privacy review，再决定是否在生产上传到私有监控系统。

**如何识别同类问题：**

如果部署输出把 `.map` 文件公开给所有用户，却没有 source exposure review，就不能把它当作安全的 observability evidence。

<a id="section-9-7"></a>

### 9.7 Performance API marks and measures：user timing、navigation timing 与 route timing

**结论：**

`performance.mark` 创建命名 timestamp；`performance.measure` 在两个 mark 或 timestamp 之间创建 duration。它们适合记录 local route timing、interaction timing 或 feature timing，但不是 field analytics。

**机制证据链：**

触发动作是 route transition 或 user interaction；browser performance timeline 保存 mark；measure 读取 start/end mark 的 startTime 计算 duration；PerformanceObserver 可以观察新 entries；TypeScript 只能约束 mark record shape，不能保证浏览器环境、field sampling 或 network 代表真实用户。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: route timing measure</span>
  </div>

```ts
const startMark = {
  name: 'release-25:/react/chapter-25:route-start',
  startTime: 100,
}

const endMark = {
  name: 'release-25:/react/chapter-25:route-ready',
  startTime: 184,
}

const wrongTiming = Date.now()
const correctedDuration = endMark.startTime - startMark.startTime
```
</div>

**逐行解释：**

第 1-4 行记录 route start marker；第 6-9 行记录 route ready marker；第 11 行是错误形式，散落的 `Date.now()` log 没有 route、release、phase 命名；第 12 行是修正形式，duration 来自同一 route 和 release 的两个 mark。

**执行过程：**

measure model 先检查 start/end mark 是否属于同一 release 和 route，再计算 `end.startTime - start.startTime`。如果 release 或 route 不一致，应该抛出错误，因为两个不同 owner 的 mark 不能组成一个可信 measure。

**错误边界与修正：**

错误边界是把本地 `Date.now()` log 当作 performance evidence。修正方式是采用带 release id、route、phase 的 mark name，并把 local lab data 与 field telemetry 分开。

**如何识别同类问题：**

如果 timing log 没有 route、feature、release id 或 phase，就无法在 release review 中关联到具体版本和路径。

<a id="section-9-8"></a>

### 9.8 React Profiler boundary：render duration、commit、actualDuration 与 overhead

**结论：**

React `<Profiler>` 只测被包裹 React tree 的 render performance。`actualDuration` 描述本次 render cost，`baseDuration` 估算未优化情况下重渲染整棵 subtree 的成本，`commitTime` 表示 commit timestamp。Profiler 有 overhead，应该按需、局部使用。

**机制证据链：**

触发动作是被 Profiler 包裹的 subtree mount 或 update；React render phase 计算 actual/base duration；commit 后调用 `onRender`；JavaScript callback 收到 id、phase、duration 和 timing；TypeScript 可以约束 callback 参数，但不能保证这个 measurement 代表 network、layout、paint 或 field performance。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: scoped Profiler sample</span>
  </div>

```tsx
import { Profiler } from 'react'

function onRender(id: string, phase: string, actualDuration: number): void {
  const event = { id, phase, actualDuration }
  console.log(event)
}

export function SellerHubProfilerSample() {
  return (
    <Profiler id="SellerHubCatalogPanel" onRender={onRender}>
      <section>Catalog render boundary</section>
    </Profiler>
  )
}
```
</div>

**逐行解释：**

第 1 行引入 React Profiler；第 3-6 行定义 `onRender` callback，读取 Profiler id、phase 和 actual duration；第 8-14 行只包裹一个局部 SellerHub panel，而不是长期包裹整个 app；`section` 的 render 触发 commit 后，React 才调用 callback。

**执行过程：**

React render subtree，commit 结束后调用 `onRender`。callback 内部创建 event object。这个 event 可以进入 local state、console 或 diagnostic adapter，但不能默认发往生产监控；如果要 production profiling，需要专门 profiling build 和明确采样策略。

**错误边界与修正：**

错误边界是把整个 app 永久包进 Profiler 并默认发送所有 events。修正方式是只包裹需要调查的 subtree，限定采样、release id、payload 和环境。

**如何识别同类问题：**

如果慢的是 data fetch、image load、CSS layout 或 backend response，Profiler event 不会解释全部原因。它只给 React render cost evidence。

<a id="section-9-9"></a>

### 9.9 Web Vitals boundary：LCP、INP、CLS、lab vs field data 与 release thresholds

**结论：**

LCP 关注 loading experience，INP 关注 interaction responsiveness，CLS 关注 visual stability。Core Web Vitals 是用户体验指标，真实 release gate 通常要 field percentile evidence；本章只提供 deterministic teaching model。

**机制证据链：**

触发动作是真实页面加载和用户交互；browser 或 measurement library 产生 metric entries；field pipeline 按真实用户、设备、网络和 page load 聚合；release gate 通常看 75th percentile。TypeScript threshold model 只能分类一个数值，不证明它来自真实 field。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: Web Vitals threshold model</span>
  </div>

```ts
type CoreWebVitalName = 'LCP' | 'INP' | 'CLS'
type SampleBoundary = 'lab-model' | 'field'

const wrongClaim = {
  metric: 'LCP',
  sampleBoundary: 'lab-model',
  provesFieldPerformance: true,
}

const correctedClaim = {
  metric: 'LCP' as CoreWebVitalName,
  sampleBoundary: 'lab-model' as SampleBoundary,
  provesFieldPerformance: false,
}
```
</div>

**逐行解释：**

第 1 行限定 metric name；第 2 行区分 lab model 和 field；第 4-8 行是错误边界，把 local lab value 当作 field proof；第 10-14 行是修正形式，local model 只能作为教学或实验 evidence，不能证明真实用户 percentile。

**执行过程：**

threshold classifier 根据 metric name 读取阈值。LCP 小于等于 2500ms 是 good，INP 小于等于 200ms 是 good，CLS 小于等于 0.1 是 good。这个判断只说明某个输入值落在哪个区间，不说明采样来源可信。

**错误边界与修正：**

错误边界是“一次本地 LCP good，所以 production Web Vitals pass”。修正方式是记录 sample boundary，并在真实发布流程中接入 field data 或明确标记 `UNKNOWN`。

**如何识别同类问题：**

看到 Web Vitals 数字时先问：来自 lab、synthetic、field 还是 teaching data？有没有 percentile、device split、route 和 release id？

<a id="section-9-10"></a>

### 9.10 Bundle and chunk review：route chunks、waterfall、lazy boundary 与 asset size evidence

**结论：**

Bundle/chunk review 关注 artifact 结构：entry bundle、lazy route chunks、owner route、asset size、waterfall 和 base path。它是 release evidence，但不能单独证明 user-perceived performance。

**机制证据链：**

触发动作是 build 生成 JS/CSS assets；Vite/Rolldown 对 dynamic imports 生成 chunks；browser 根据 HTML、preload、dynamic import 和 cache 加载资源；review model 检查 route owner 和 size budget；TypeScript 约束 chunk row shape，但不读取真实 network waterfall。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: route chunk review row</span>
  </div>

```ts
const wrongChunkReview = {
  totalBundleKb: 900,
}

const correctedChunkReview = {
  ownerRoute: '/react/chapter-25',
  sizeKb: 42,
  url: '/assets/chapter-25-release-lab-Dm42a9.js',
}
```
</div>

**逐行解释：**

第 1-3 行是错误形式，只看 total bundle size，无法定位是哪条 route 或 lazy boundary 造成问题；第 5-9 行是修正形式，chunk row 记录 owner route、size 和 URL，能进入 route-level review。

**执行过程：**

review model 遍历 chunks。超过 budget 就添加 size issue；没有 `ownerRoute` 就添加 ownership issue；最终 status 为 `pass` 或 `review`。React table 展示的是 review result，不是 bundler 本身。

**错误边界与修正：**

错误边界是只盯总体 bundle size。修正方式是按 route chunk 拆分 evidence，并结合 lazy boundary 和 waterfall 检查。

**如何识别同类问题：**

如果某个 chunk 文件名无法关联到 route、feature 或 owner，就很难在 release review 中判断它是否合理。

<a id="section-9-11"></a>

### 9.11 Async and data-flow observability：request lifecycle、retry、abort、stale response 与 cache evidence

**结论：**

Async observability 要记录 request id、resource key、route、status、retry/abort/stale/cache evidence，但不记录完整 payload、PII、token 或 cookie。

**机制证据链：**

触发动作是 request start、resolve、reject、abort、retry 或 cache hit；JavaScript runtime 创建 diagnostic event；request owner 提供 request id 和 resource key；React UI 读取 request status 展示 loading/error/success；TypeScript 保证 event shape，但不会自动 redaction payload。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: sanitized request diagnostic</span>
  </div>

```ts
const wrongRequestLog = {
  payload: { email: 'seller@example.com', token: 'secret-token' },
}

const correctedRequestLog = {
  requestId: 'orders:release-25:001',
  resourceKey: 'sellerhub:orders?status=open',
  route: '/react/chapter-25',
  status: 'success',
  payloadSummary: 'object:2:redacted',
}
```
</div>

**逐行解释：**

第 1-3 行是错误形式，直接记录含 email 和 token 的 payload；第 5-11 行是修正形式，保留 request id、resource key、route 和 status，同时只记录 payload summary。

**执行过程：**

diagnostic adapter 收到 payload 后，如果是 object，只记录 key count 和 `redacted` 标记；如果是 array，只记录 length；如果没有 payload，记录 `none`。这样 triage 可以关联 request，却不会泄露业务数据。

**错误边界与修正：**

错误边界是“为了调试方便，把 request body 全打出来”。修正方式是将 observability data 降到 triage 所需最小字段。

**如何识别同类问题：**

看到 request log 中有完整 user profile、cart、token、cookie、address、email，就说明 payload boundary 已经越界。

<a id="section-9-12"></a>

### 9.12 Accessibility release evidence：role/name tests、keyboard path、focus、dialog 与 live regions

**结论：**

Accessibility release evidence 是多层证据：role/name queries、keyboard path、focus management、dialog behavior、live regions、manual accessibility tree review。自动测试有价值，但不能证明完整 accessibility。

**机制证据链：**

触发动作是用户通过 keyboard、screen reader 或 pointer 操作 UI；browser 构建 DOM 与 accessibility tree；React props 最终变成 DOM attributes 和 text；Testing Library role/name queries 检查可访问语义；TypeScript 不理解 screen reader output，也不能验证所有 keyboard path。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: accessibility release evidence</span>
  </div>

```ts
const wrongAccessibilityClaim = {
  automatedTestsPassed: true,
  completeAccessibilityProven: true,
}

const correctedAccessibilityEvidence = {
  roleNameChecks: 'PASS',
  keyboardSmoke: 'PASS',
  focusRestore: 'UNKNOWN',
  manualTreeReview: 'UNKNOWN',
}
```
</div>

**逐行解释：**

第 1-4 行是错误形式，把自动测试通过等同于完整 accessibility；第 6-11 行是修正形式，把 role/name、keyboard、focus restore 和 manual tree review 分成独立 evidence，其中未做的检查必须保留 `UNKNOWN`。

**执行过程：**

release gate 读取 accessibility evidence 时，只能把全部 required checks 为 `PASS` 的部分视为 ready。`UNKNOWN` 不能被自动推断为 pass，因为 keyboard path 和 focus behavior 可能没有被测试覆盖。

**错误边界与修正：**

错误边界是“测试通过，所以 a11y 完成”。修正方式是把 automated checks、keyboard smoke 和 manual review 分层。

**如何识别同类问题：**

如果 release checklist 里没有 keyboard、focus 和 live region 项，说明 accessibility release evidence 还不完整。

<a id="section-9-13"></a>

### 9.13 Security and privacy boundary：public env、telemetry payload、PII、CSP 与 dependency review

**结论：**

Frontend release 不能证明 backend security，但必须守住 client boundary：public env 不放 secret，telemetry payload 不含 PII/token/cookie，source map 不随意公开，CSP/security headers 属于 host boundary review。

**机制证据链：**

触发动作是创建 diagnostic payload；JavaScript object 可能包含 route、release id、error message、user data；sanitizer 遍历 keys，遇到 email、token、password、cookie、session、address 等敏感 key 替换为 `[redacted]`；React UI 展示 sanitized payload；TypeScript 不能证明任意 nested object 不含 PII。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: telemetry payload redaction</span>
  </div>

```ts
const wrongTelemetryPayload = {
  email: 'seller@example.com',
  route: '/react/chapter-25',
  token: 'secret-token',
}

const correctedTelemetryPayload = {
  email: '[redacted]',
  route: '/react/chapter-25',
  token: '[redacted]',
}
```
</div>

**逐行解释：**

第 1-5 行是错误 payload，包含 email 和 token；第 7-11 行是修正 payload，只保留 route，敏感字段被替换。release diagnostic 不应该需要原始 email 或 token 才能定位问题。

**执行过程：**

sanitizer 对 object entries 做 reduce。key 命中 sensitive pattern 时设置 `[redacted]`；nested object 递归处理；普通 release id、route、metric name 保留。

**错误边界与修正：**

错误边界是“diagnostic 越详细越好”。修正方式是只记录 triage 所需字段，并把 user identity 做 hash、匿名化或完全移除。

**如何识别同类问题：**

如果 telemetry payload 能还原真实用户身份、token、cookie 或完整业务对象，就不应该出现在 client diagnostic event 中。

<a id="section-9-14"></a>

### 9.14 Smoke tests and release gates：lint、typecheck、tests、build、preview 与 manual checks

**结论：**

Release gate 是检查集合，不是一个命令。`lint`、`typecheck`、unit/integration tests、build、preview smoke、route smoke、accessibility smoke、error boundary smoke 和 manual review 都可以是 gate row。`UNKNOWN` 不是 `PASS`。

**机制证据链：**

触发动作是 release reviewer 汇总 checks；JavaScript evaluator 过滤非 `PASS` checks；如果有 `FAIL`，整体 `FAIL`；如果没有 `FAIL` 但有 `UNKNOWN`，整体 `UNKNOWN`；React UI 显示 blocking checks；TypeScript union 阻止随意写 status。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: UNKNOWN is not PASS</span>
  </div>

```ts
type ReleaseGateStatus = 'PASS' | 'FAIL' | 'UNKNOWN'

const wrongGate = {
  lint: 'PASS',
  previewSmoke: 'UNKNOWN',
  ready: true,
}

const correctedGate = {
  lint: 'PASS' as ReleaseGateStatus,
  previewSmoke: 'UNKNOWN' as ReleaseGateStatus,
  ready: false,
}
```
</div>

**逐行解释：**

第 1 行限定 gate status；第 3-7 行是错误形式，把 `UNKNOWN` 当成发布可用；第 9-13 行是修正形式，`UNKNOWN` 保留阻断。ready 的值来自 evaluator，而不应该由人手写。

**执行过程：**

evaluator 先找 `FAIL`，再找 `UNKNOWN`。如果 preview smoke 没跑，整体 status 是 `UNKNOWN`，blocking checks 包含 preview smoke。这样 final release review 不会把未验证内容隐藏掉。

**错误边界与修正：**

错误边界是“没有失败就是通过”。修正方式是“三值逻辑”：通过、失败、未知。未知代表 evidence gap，不是成功。

**如何识别同类问题：**

如果 checklist 中有未执行项但最终结论是 pass，就说明 release gate 规则有漏洞。

<a id="section-9-15"></a>

### 9.15 Rollback and feature flag boundary：disable、revert、fallback 与 blast radius

**结论：**

Feature flag 可以降低 blast radius，但只有在存在 fallback、disable path、owner 和 default state review 时才有意义。Rollback 是 operational action，不是 React error handler。

**机制证据链：**

触发动作是 release reviewer 准备启用新功能；feature flag model 检查 fallback route、disable path 和 default enabled；如果缺少任一项，blast radius 是 open；React runtime 可能根据 flag render 不同 UI，但不能自己完成 operational rollback。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: feature flag release decision</span>
  </div>

```ts
const wrongFlag = {
  flagKey: 'sellerhub.releaseEvidenceLab',
  defaultEnabled: true,
}

const correctedFlag = {
  flagKey: 'sellerhub.releaseEvidenceLab',
  defaultEnabled: false,
  fallbackRoute: '/react/chapter-24',
  disablePath: 'Set flag false and redeploy config.',
}
```
</div>

**逐行解释：**

第 1-4 行是错误 flag，没有 fallback，也没有 disable path，还默认开启；第 6-11 行是修正形式，默认关闭，明确 fallback route 和 disable path。真实 rollout 可以 progressive，但第一步必须知道如何关闭。

**执行过程：**

feature flag evaluator 检查 `fallbackRoute`、`disablePath` 和 `defaultEnabled`。如果缺少 fallback 或 disable path，就返回 required actions；如果 default enabled 为 true，也要求 review first-release strategy。

**错误边界与修正：**

错误边界是“加了 flag 就安全”。修正方式是把 flag 当作 operational control，必须配合测试、fallback 和 rollback owner。

**如何识别同类问题：**

如果某个 feature flag 没有人知道怎么关、关了后用户去哪、谁负责执行，就不能说 blast radius 已受控。

<a id="section-9-16"></a>

### 9.16 Incident triage boundary：symptom、scope、reproduction、evidence、mitigation 与 notes

**结论：**

Incident triage 从证据开始，不从猜测开始。最小 record 要包含 symptom、scope、affected route、affected version、reproduction path、diagnostic evidence 和 mitigation。

**机制证据链：**

触发动作是用户或监控发现异常；triage owner 创建 record；JavaScript validator 检查 required fields；缺少 evidence 或 mitigation 就不能进入 ready state；TypeScript 只能约束 record shape，不能保证内容真实；React table 展示 record readiness。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: incident triage record</span>
  </div>

```ts
const wrongIncident = {
  symptom: 'It is broken',
}

const correctedIncident = {
  symptom: 'Dashboard metric panel shows fallback',
  scope: 'Learning lab route only',
  affectedRoute: '/react/chapter-25',
  affectedVersion: '25.0.0-lab',
  evidence: ['corr-release-25-001'],
  mitigation: 'Disable the release evidence lab flag',
}
```
</div>

**逐行解释：**

第 1-3 行是错误 report，只有模糊 symptom；第 5-12 行是修正形式，包含 route、version、scope、evidence 和 mitigation。`evidence` array 是后续复盘的连接点。

**执行过程：**

validator 遍历 required text fields，如果某个字段 trim 后为空，就加入 missing list；如果 evidence array 为空，也加入 missing list。missing list 为空时 `readyForTriage` 才是 true。

**错误边界与修正：**

错误边界是“先猜原因”。修正方式是先固定事实：哪个 route、哪个 version、什么 symptom、哪些 evidence、当前 mitigation 是什么。

**如何识别同类问题：**

如果 incident note 没有 version 或 route，就很难判断 first bad release，也无法关联 source map、build artifact 或 release gate。

<a id="section-9-17"></a>

### 9.17 SellerHub release readiness mapping：catalog、orders、dashboard、settings、auth 与 deployment

**结论：**

SellerHub release readiness 不是一张泛泛的 checklist，而是把 catalog、orders、dashboard、settings、auth、not found、chunk loading、runtime error、unhandled rejection、public env、source map、bundle、Web Vitals、feature flag、rollback 和 incident triage 都映射到具体 evidence owner。

**机制证据链：**

触发动作是 release reviewer 选择一个 SellerHub scenario；mapping table 读取 scenario、owner、evidence、test mapping 和 privacy check；React table 展示每一行；TypeScript 可以限制 row shape，但不能替代人工确认 route smoke 与 manual review。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: SellerHub readiness row</span>
  </div>

```ts
const wrongMapping = {
  scenario: 'catalog',
  evidence: 'looks fine',
}

const correctedMapping = {
  scenario: 'catalog route smoke',
  evidence: 'route heading, chunk owner, search timing, and no runtime diagnostic',
  owner: 'catalog release reviewer',
  tests: ['route smoke', 'search performance model'],
}
```
</div>

**逐行解释：**

第 1-4 行是错误 mapping，`looks fine` 不能复现也不能审查；第 6-11 行是修正 mapping，scenario、evidence、owner 和 tests 都是可追踪字段。

**执行过程：**

release map 读取 scenario rows 并渲染 table。每个 row 指向一个 evidence category：runtime diagnostic、performance evidence、privacy review、test mapping 或 rollback path。`UNKNOWN` 项保留在 release gate 中，不在 map 中隐藏。

**错误边界与修正：**

错误边界是“SellerHub 整体通过”。修正方式是按 route、feature、diagnostic、performance、privacy、flag 和 triage 分解。

**如何识别同类问题：**

如果 release review 没有 catalog/orders/dashboard/settings/auth 等场景维度，只给一个总状态，就无法定位风险。

<a id="section-9-18"></a>

### 9.18 Final mini project：SellerHub Release Evidence Lab

**结论：**

最终小项目把本章机制组合成一个本地 Vite React lab。它可以运行、点击、查看 deterministic evidence，但不部署、不上传、不发送、不伪造 production observability。

**机制证据链：**

触发动作是用户访问 `/react/chapter-25`；manifest lazy entry 加载 Chapter 25 root；React 渲染分节 panels 和 final lab；按钮只更新本地 state 或 deterministic model；Profiler sample 只采集本地 subtree render event；tests 用 role/heading 查询 major sections。TypeScript 校验组件 props 和 model shapes，但不证明生产部署。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/sellerhub-release-evidence-lab/sellerhub-release-evidence-lab.tsx</span>
  </div>

```tsx
export function SellerHubReleaseEvidenceLab() {
  return (
    <section aria-labelledby="sellerhub-release-lab-title">
      <h2 id="sellerhub-release-lab-title">SellerHub Release Evidence Lab</h2>
      <ReleaseMetadataCard />
      <RuntimeErrorSimulator />
      <ReleaseGateChecklist />
      <IncidentTriageCard />
    </section>
  )
}
```
</div>

**逐行解释：**

第 1 行声明 lab component；第 3-4 行创建可访问 section 和 heading；第 5-8 行组合 release metadata、runtime diagnostic、release gate 和 incident triage 子卡片。真实文件中还包含 performance、Profiler、Web Vitals、bundle、async、accessibility、security、rollback 和 review table。

**执行过程：**

React 调用 lab component，返回 UI description；child components 读取 deterministic data 和 pure model result；用户点击 simulator button 时，只改变 local state；没有 fetch、beacon、SDK upload 或 source map upload。

**错误边界与修正：**

错误边界是把 lab UI 包装成“production observability dashboard”。修正方式是在 hero 与 final lab 中明确它是 client-side Vite lab，并保持所有 telemetry/Web Vitals/source-map 示例为 boundary 或 deterministic teaching data。

**如何识别同类问题：**

如果本地 lab 声称“证明生产稳定”“真实 RUM 已通过”但没有真实 production source、field sampling、monitoring integration 和 privacy review，就是 fake observability。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| `vite build` | Vite tooling | 生成 production-oriented static artifact。 | 认为 build success 等于 production deployment success。 |
| `vite preview` | Vite tooling | 本地服务 `dist` 做静态预览。 | 认为它是 production server。 |
| `import.meta.env` | Vite env boundary | client code 中可读取的 build-time constants。 | 在 `VITE_` 中放 secret。 |
| `window.addEventListener('error', ...)` | Browser API | 监听同步 script/runtime error。 | 误以为它捕获 Promise rejection。 |
| `window.addEventListener('unhandledrejection', ...)` | Browser API | 监听未处理 Promise rejection。 | 直接把 reason 原样展示给用户。 |
| `static getDerivedStateFromError` | React class lifecycle | render fallback state。 | 在里面做 side effect。 |
| `componentDidCatch` | React class lifecycle | 记录 error 与 `componentStack` diagnostic。 | 当作 user recovery 本身。 |
| `performance.mark` | Browser Performance API | 创建命名 timestamp marker。 | mark name 没有 release/route/phase。 |
| `performance.measure` | Browser Performance API | 计算两个 marks/timestamps 之间的 duration。 | 混用不同 release 或 route 的 marks。 |
| `PerformanceObserver` | Browser Performance API | 观察 performance entries。 | 误认为自动形成 field RUM。 |
| `<Profiler>` | React API | 采集 React subtree render timing。 | 长期包裹整个 app 并默认上报。 |
| `actualDuration` | React Profiler event | 本次 render 花费。 | 误认为包含 network/backend time。 |
| `baseDuration` | React Profiler event | 未优化情况下 subtree render 估计成本。 | 与 bundle size 或 Web Vitals 混淆。 |
| `LCP` / `INP` / `CLS` | Web Vitals | loading、interactivity、visual stability metrics。 | 用一次 local number 证明 field performance。 |
| `sendBeacon` | Browser API boundary | 小 payload async POST，常用于 analytics boundary reading。 | 在本章中实际发送 telemetry。 |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| 把 dev server 正常当成 production ready | tooling boundary | dev server、build artifact、preview、production host 是不同边界。 | 记录 build output、preview smoke、host review。 | 只有 `npm run dev` 截图，没有 build/preview evidence。 |
| 把 `vite preview` 当成 production server | deployment boundary | preview 只服务本地 `dist`。 | 在 release gate 中标记为 local preview evidence。 | 结论写着 preview pass 等于 deploy pass。 |
| 在 `VITE_` 中放 token | security boundary | `VITE_` 值会进入 client bundle。 | 只放 public release metadata。 | public config key 包含 token/secret/password。 |
| 直接显示 raw error stack | privacy / UX boundary | diagnostic payload 与 user fallback 是不同边界。 | sanitize diagnostic，UI 显示安全 fallback。 | 用户界面出现 email、token、stack。 |
| 所有失败都叫 unknown | triage boundary | failure kind 决定 recovery owner。 | 使用 render/chunk/network/http/parse/abort/timeout 分类。 | Bug report 无 route、status、component stack、asset URL。 |
| 公开 source maps 没有 review | source map privacy | source map 可能暴露 source context。 | 使用 private upload boundary 或 disabled boundary。 | `.map` 文件直接公开在 static host。 |
| 用 `Date.now()` 散落 log 当 performance evidence | measurement boundary | mark/measure 要有 release、route、phase。 | 使用命名 marks 和 measures。 | log 无法关联 release 或 route。 |
| 用 Profiler 解释 request 慢 | React boundary | Profiler 只测 React render cost。 | 同时看 request lifecycle、resource timing、render timing。 | `actualDuration` 很低但页面仍等待数据。 |
| 用 local Web Vitals 模型证明 field pass | field boundary | field data 要来自真实用户或 synthetic/field pipeline。 | 标记 sample boundary，未知则 UNKNOWN。 | 没有 percentile、device split、route、release id。 |
| Feature flag 没有 disable path | rollback boundary | flag 必须可关闭且有 fallback。 | 记录 owner、fallback route、disable path。 | 事故时没人知道怎么关。 |
| Incident note 只有猜测 | triage boundary | triage 先记录 symptom、scope、version、route、evidence。 | 用 structured incident record。 | 找不到 first bad release 或 correlation id。 |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。它把 build artifact、runtime config、runtime diagnostics、Performance API、Profiler、Web Vitals threshold、chunk review、async evidence、accessibility evidence、security review、release gate、rollback 和 incident triage 组合成一个本地可运行 lab。

### 项目目标

构建 `SellerHub Release Evidence Lab`，让学习者在 `/react/chapter-25` 看到一个可运行的 release readiness workspace。它展示本地 deterministic evidence，并明确所有 production、RUM、source map upload、monitoring SDK 和 field telemetry 都是边界，不在本章伪造。

### 为什么适合本章

SellerHub 已经在前面章节覆盖 catalog、orders、dashboard、settings、route、request、accessibility、error boundary 和 performance 场景。第 25 章把这些功能从“能运行”提升到“能发布前审查”：每个场景都要能回答 evidence owner、failure kind、privacy boundary、release gate status 和 rollback path。

### 最终小项目结构

见第 7 节的最终小项目结构。该结构分成三层：

- chapter root：组合 17 个分节 panels 和 final lab。
- pure models：支撑测试和 UI evidence。
- final lab cards：展示 release metadata、error simulation、performance mark、Profiler sample、Web Vitals threshold、release gate、rollback 和 triage。

### 文件职责

| File | Responsibility |
| --- | --- |
| `chapter-25-practice-root.tsx` | Chapter 25 route root，组合所有 panels 与 final lab。 |
| `chapter-25-practice.css` | 本章本地视觉样式，不引入新 UI 框架。 |
| `sellerhub-release-evidence-data.ts` | 提供 deterministic teaching data。 |
| `runtime-error-simulator.tsx` | 用按钮生成本地 diagnostic object，不抛真实错误、不发送 telemetry。 |
| `performance-mark-lab.tsx` | 用 deterministic route timing model 展示 mark/measure 思路。 |
| `react-profiler-sample-panel.tsx` | 局部 `<Profiler>` sample，展示 render metric boundary。 |
| `release-gate-checklist.tsx` | 展示 `PASS` / `FAIL` / `UNKNOWN` release gate。 |
| `release-readiness-review-table.tsx` | 把 SellerHub scenario 映射到 owner、status、evidence。 |

### 完整代码入口

完整代码由本章 source root 中的 practice files 提供。学习时先看 root composition，再进入 models 和 final lab cards：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目入口</span>
  </div>

```txt
src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/chapter-25-practice-root.tsx
src/learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/sellerhub-release-evidence-lab/sellerhub-release-evidence-lab.tsx
```
</div>

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
Route: /react/chapter-25
Visible heading: Deployment Observability, Runtime Error, Performance Evidence, and Release Gate
Final lab heading: SellerHub Release Evidence Lab
No network telemetry is sent
No source maps are uploaded
```
</div>

### 核心执行流程

1. `learning-manifest.ts` 匹配 `/react/chapter-25`。
2. React lazy loads `Chapter25PracticeRoot`。
3. Root 渲染 hero、17 个 mechanism panels 和 final lab。
4. Final lab cards 读取 deterministic data 和 pure model outputs。
5. 用户点击 runtime simulator 或 performance mark lab，只更新 local state。
6. Release gate card 显示 `UNKNOWN` preview smoke，说明未知检查不能当作 pass。
7. Integration test 用 headings 验证 final lab major sections。

### 常见错误

- 把 final lab 当成 production dashboard：错误。它是本地 client-side Vite lab。
- 把 Web Vitals threshold card 当成 field RUM：错误。它是 deterministic teaching model。
- 把 Profiler sample 当成全局 production profiling：错误。它只包裹局部 subtree。
- 把 release gate 的 `UNKNOWN` 当作 pass：错误。未验证就是 evidence gap。

### 可选扩展

- 在未来真实项目中接入私有 monitoring SDK，但必须先完成 privacy review。
- 在真实 deployment pipeline 中保存 build artifact manifest、source map upload record 和 route smoke output。
- 在真实 RUM 中按 route、device、release id 聚合 LCP/INP/CLS field percentile。
- 在 CI 中增加 bundle analyzer 或 Lighthouse CI，但本章不新增这些依赖。

## 13. 额外速查表

**一句话总结：**

第 25 章的核心是：release readiness 必须由可审查证据驱动，本地 lab 只能提供教学和局部验证，不能伪造成 production observability。

| Concept | One-line Use |
| --- | --- |
| Build artifact | 检查 `dist`、hashed assets、route chunks、base path。 |
| Runtime config | 记录 build id、version、mode、public flags，拒绝 secrets。 |
| Runtime diagnostic | 规范化 error source、message、stack、componentStack、correlation id。 |
| Source map boundary | 关联 release id 与 stack mapping，同时守住 privacy/upload boundary。 |
| Performance mark | 给 route、interaction、feature 记录 named timestamp。 |
| React Profiler | 采集局部 React subtree render cost。 |
| Web Vitals | 按 LCP、INP、CLS 理解 UX metric，并区分 lab 与 field。 |
| Release gate | 只有全部 required checks 为 `PASS` 才 ready。 |
| Rollback | 用 flag disable path、fallback route 和 owner 控制影响面。 |
| Incident triage | 用 symptom、scope、route、version、evidence、mitigation 组织诊断。 |

| Similar Concepts | Difference |
| --- | --- |
| Build vs preview | Build 生成 artifact；preview 本地服务 artifact。 |
| Preview vs production host | Preview 是本地检查；production host 还涉及 CDN、cache、headers、rewrites、traffic。 |
| Error Boundary vs window error | Error Boundary 捕获 render subtree failure；window error 监听 browser global error。 |
| Profiler vs Web Vitals | Profiler 测 React render；Web Vitals 描述 user experience metrics。 |
| Lab data vs field data | Lab data 来自本地或 deterministic model；field data 来自真实用户环境。 |
| Feature flag vs rollback | Flag 是控制面；rollback 是运营动作和流程。 |

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: release gate status</span>
  </div>

```ts
type ReleaseGateStatus = 'PASS' | 'FAIL' | 'UNKNOWN'

type ReleaseGateCheck = {
  evidence: string
  name: string
  status: ReleaseGateStatus
}
```
</div>

## 14. 工程迁移与代码审查要点

Code review 时不要只问“页面能不能打开”，要问 evidence 是否足够：

- Build artifact review：是否有 `dist`、hashed assets、route chunks、base path、HTML cache policy review。
- Runtime config review：public config 是否只包含 release metadata 和 public flags；是否有 secret-like keys。
- Release metadata review：error、performance、rollback、incident records 是否都能关联到 build id 和 version。
- Error logging review：UI fallback 与 developer diagnostic 是否分开；payload 是否 sanitized；correlation id 是否存在。
- Source map review：source map 是 disabled、private upload only 还是 public asset；是否有 privacy decision。
- Performance marks review：mark name 是否包含 release、route、feature、phase；是否避免散落 `Date.now()`。
- Web Vitals review：数字来自 lab、synthetic、field 还是 teaching model；有没有 percentile 和 route dimension。
- Bundle/chunk review：route chunk 是否有 owner；chunk size 是否过预算；dynamic import failure 是否有 fallback。
- Async observability review：request id、resource key、status 是否保留；payload 是否 redacted。
- Accessibility release evidence review：role/name、keyboard、focus、dialog、live region、manual review 是否分层。
- Privacy and telemetry review：是否移除 email、token、cookie、address、raw user record。
- Smoke test review：是否覆盖 route smoke、error boundary smoke、async data smoke、preview smoke。
- Release gate review：`UNKNOWN` 是否保持阻断；是否禁止人工改 ready。
- Rollback review：flag 是否有 fallback route、disable path、owner、default state review。
- Incident triage review：是否能回答 symptom、scope、version、route、evidence、mitigation。

迁移到真实项目时，先保留本章的 pure model 思路，再把真实 monitoring、RUM、source map upload、CI artifact、host headers、CDN config 放进各自边界。不要把所有东西塞进 React component。

## 15. 如何转换成个人笔记

建议把本章整理成四张表：

1. **Evidence boundary 表**：build、runtime、field、operations 各自负责什么。
2. **Failure classification 表**：render、chunk、network、HTTP、parse、abort、timeout、unknown 各自的 recovery owner。
3. **Metric boundary 表**：Performance API、React Profiler、Core Web Vitals 的 owner、输入、输出、不能证明什么。
4. **Release gate 表**：每个 check 的 status、evidence、owner、blocking rule。

个人笔记不要写成“发布 checklist 大全”。本章重点是机制：每个 evidence 从哪里来、由谁拥有、TypeScript 检查什么、React 展示什么、browser/runtime 提供什么、哪些内容必须留在边界外。

## 16. 必须能回答的问题

1. 为什么 `vite preview` 不是 production server？
2. 为什么 `VITE_` env variables 不能放 secrets？
3. `window error`、`unhandledrejection`、Error Boundary failure 有什么区别？
4. 为什么 Error Boundary fallback 不等于 monitoring？
5. 为什么 source map 需要 release id 和 privacy boundary？
6. `performance.mark` 与 `performance.measure` 分别创建什么？
7. React Profiler 的 `actualDuration` 和 `baseDuration` 分别说明什么？
8. 为什么 Profiler 不能解释 network latency？
9. 为什么 local Web Vitals model 不能证明 field performance？
10. 为什么 chunk size 是 evidence，不是最终 performance proof？
11. 为什么 request diagnostic 要保留 request id/resource key，但隐藏 payload？
12. 为什么 accessibility tests 不能证明完整 accessibility？
13. 为什么 telemetry payload 要 redact PII 和 tokens？
14. 为什么 release gate 中 `UNKNOWN` 不能当作 `PASS`？
15. 为什么 feature flag 不能替代 tests？
16. 为什么 rollback 是 operational boundary？
17. 一个 incident triage record 最少需要哪些字段？
18. SellerHub catalog route smoke 应该映射哪些 evidence？

## 17. 最终记忆模型

发布准备不是“把代码扔出去”。它是一条证据链：

Source code 通过 tooling 生成 build artifact；artifact 被本地 preview 和生产 host 分别服务；browser runtime 产生 config、errors、performance marks、resource/navigation timing；React runtime 产生 Error Boundary fallback 和 Profiler render events；Web Vitals 属于用户体验指标，需要区分 lab 与 field；release gate 把所有 evidence 合并成 decision；feature flag 和 rollback 控制 blast radius；incident triage 把 post-release failure 重新关联到 release id、route、version 和 diagnostic evidence。

最重要的判断规则是：未验证就是 `UNKNOWN`，不是 `PASS`；本地数据就是本地数据，不是 production truth；diagnostic 是给开发者的，fallback 是给用户的；rollback 是运营控制，不是 React catch。

## 18. 官方文档阅读清单

建议按下面顺序阅读：

1. React `<Profiler>` reference：重点看 `id`、`onRender`、`actualDuration`、`baseDuration`、`commitTime`、profiling overhead 和 production profiling boundary。
2. React `Component` reference 中 Error Boundary 部分：重点看 `static getDerivedStateFromError`、`componentDidCatch`、`componentStack`、Error Boundary 不捕获的范围。
3. React Performance tracks / DevTools：作为阅读边界，理解 Profiler 和 browser performance panel 的关系。
4. MDN `Performance.mark()`：理解 named high-resolution timestamp marker。
5. MDN `Performance.measure()`：理解两个 marks/timestamps 之间的 duration。
6. MDN `PerformanceObserver`：理解观察 performance entries 的机制与 browser support boundary。
7. MDN `PerformanceNavigationTiming` 与 `PerformanceResourceTiming`：理解 navigation/resource timing 是 browser performance timeline 的一部分。
8. MDN Window `error` event 与 `unhandledrejection` event：理解同步 script error 与 unhandled Promise rejection 的区别。
9. MDN `navigator.sendBeacon()`：只作为 telemetry boundary reading，不在本章发送真实 telemetry。
10. web.dev Web Vitals 与 Core Web Vitals thresholds：重点看 LCP、INP、CLS、75th percentile、lab vs field boundary。
11. Vite Building for Production：重点看 build output、base path、load error handling。
12. Vite Deploying a Static Site：重点看 `vite preview` 是 local preview，不是 production server。
13. Vite Env Variables and Modes：重点看 `import.meta.env`、mode、`VITE_` public exposure 与 secrets warning。
14. Vite Build Options：重点看 `build.sourcemap` 的 `false`、`true`、`inline`、`hidden` 选项和 source map boundary。
