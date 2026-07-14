# React 第 15 章：Production Frontend Architecture、Design System 与 Engineering Governance

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
  - [9.1 Production architecture：从组件项目到工程系统](#section-9-1)
  - [9.2 Design tokens 与 primitive UI component](#section-9-2)
  - [9.3 Compound component 与 accessibility contract](#section-9-3)
  - [9.4 Feature module public API 与 dependency direction](#section-9-4)
  - [9.5 Shared module、business module 与 architecture cycle](#section-9-5)
  - [9.6 API contract：DTO、domain model、view model 与 adapter](#section-9-6)
  - [9.7 Error normalization 与 generated client boundary model](#section-9-7)
  - [9.8 Feature flags、RBAC UI 与 release strategy](#section-9-8)
  - [9.9 Internationalization、message catalog 与 locale formatting](#section-9-9)
  - [9.10 Observability：error reporting、route context 与 release metadata](#section-9-10)
  - [9.11 Web Vitals、route cost 与 performance budget](#section-9-11)
  - [9.12 Security boundary：XSS、safe link、token、CSP 与 sensitive logging](#section-9-12)
  - [9.13 Migration strategy：inventory、risk、compat layer 与 rollback](#section-9-13)
  - [9.14 ADR、code review standard 与 engineering governance](#section-9-14)
  - [9.15 SellerHub production architecture project mapping](#section-9-15)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 为什么适合本章](#122-为什么适合本章)
  - [12.3 最终小项目结构](#123-最终小项目结构)
  - [12.4 文件职责](#124-文件职责)
  - [12.5 完整代码与工程文档](#125-完整代码与工程文档)
  - [12.6 核心执行流程](#126-核心执行流程)
  - [12.7 运行方式与预期结果](#127-运行方式与预期结果)
  - [12.8 常见错误与可选扩展](#128-常见错误与可选扩展)
- [13. 额外速查表](#13-额外速查表)
- [14. 工程迁移与代码审查要点](#14-工程迁移与代码审查要点)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章机制地图

这张表只保留能帮助理解机制的工程路径；它不是文件盘点，也不记录文件状态。

| Mechanism | Owner / Boundary | Runtime Layer | Project Scenario | Source Reading Path |
| --- | --- | --- | --- | --- |
| Architecture map | The app separates product features, shared infrastructure, and governance artifacts. | Frontend architecture boundary | SellerHub production kit shows where code should live. | `src/learning/react/chapter-15-production-frontend-architecture/01-production-architecture-map/production-architecture-map.tsx` |
| Design token and primitive UI | Shared UI owns visual contracts without importing feature logic. | Design system layer | Buttons, tabs, and tokens stay reusable across features. | `src/learning/react/chapter-15-production-frontend-architecture/02-design-tokens-primitive-ui/design-token-primitive-boundary.tsx` |
| API adapter | The boundary converts external DTOs into internal view models. | Client API contract layer | SellerHub features do not render raw transport data. | `src/learning/react/chapter-15-production-frontend-architecture/06-api-contract-adapter/api-contract-adapter-panel.tsx` |
| Governance evidence | Architecture decisions and review checklists record why a boundary exists. | Team process and code review layer | Migration plans and ADRs make production changes auditable. | `src/learning/react/chapter-15-production-frontend-architecture/14-adr-review-governance/governance-evidence-panel.tsx` |

## 0. 本章工程问题与边界

本章解决的工程问题是：当 React 项目从练习走向团队协作时，文件夹不是装饰，边界、依赖方向、API adapter、design system、feature flags、i18n、observability、security 和 governance 都会影响可维护性。

本章不新增真实后端、认证系统、监控平台或企业级框架。边界是用当前 learning app 展示 production-style frontend architecture 的可审查模型。

## 1. 本章解决的问题

一个能运行的 React 页面仍可能存在 deep import、shared 业务污染、DTO 泄漏、flag 永久化、权限误判、不可定位的错误、没有持续预算的性能退化和无法回滚的迁移。本章解决的不是“目录如何命名”，而是：

1. 谁拥有一个决策，谁可以依赖谁。
2. 外部数据何时从不可信 DTO 变成内部 model。
3. 组件 API、design tokens、accessibility semantics 如何形成稳定 contract。
4. release、security、performance、observability 和 migration 如何留下可审查证据。
5. 如何把 SellerHub 的工程能力写成可验证项目产出，而不是只列技术栈。

## 2. 前置概念

- 已理解 props、state、event、render snapshot 和 component composition。
- 已理解 Effects 只同步外部系统，普通计算不应塞入 Effect。
- 已理解 reducer、Context、custom hook 与 state owner。
- 已理解 async lifecycle、runtime validation、routing、memoization 与 code splitting。
- 已使用 lint、typecheck、test、build 四类质量门禁。
- 已理解 Server / Client、hydration、Actions 与 migration boundary。
- 已理解 ES module 的 `import` / `export`，并能区分 TypeScript type 与 runtime value。

## 3. 学习目标

完成本章后，你应该能够：

1. 用 owner、input、output、dependency direction 与 gate 描述 production architecture。
2. 设计 token、primitive、compound component 与 accessibility contract。
3. 通过 feature public API 阻止 deep import，并识别 shared-to-feature cycle。
4. 把 unknown response 转成 validated DTO、domain model 和 view model。
5. 统一 error、flag、permission、locale、metric 与 security finding 的 object shape。
6. 解释 TypeScript 能阻止哪些静态错误，以及它无法代替哪些 runtime/security checks。
7. 编写含 context、decision、alternatives、consequences 的 ADR。
8. 制定有 inventory、compatibility layer、quality gate 与 rollback 的 migration。
9. 用可运行 dashboard 展示 SellerHub 的架构证据。

## 4. 机制依赖图

这些依赖不是阅读顺序清单，而是本章概念成立的前置关系。

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| Dependency direction | Feature module public API | 先约束谁能 import 谁，public API 才有意义。 | feature 之间会互相穿透内部文件。 |
| Design token | Primitive component | primitive UI 应消费 token，而不是散落 magic values。 | 视觉规则无法统一修改。 |
| External DTO | Internal view model | 先在 adapter 收窄外部契约，feature 才能稳定渲染。 | 后端字段变化会扩散到所有组件。 |
| Risk category | Governance evidence | 生产架构决策需要记录取舍和验证。 | 迁移后没人知道边界为什么存在。 |

## 5. 核心术语表

| Term | Layer | 本章含义 |
| --- | --- | --- |
| Production architecture | architecture governance | owner、dependency、contract、gate 和 change process 的组合 |
| Design token | design system | 跨组件复用的命名设计决策，不是任意 CSS 常量 |
| Primitive component | React / design system | 封装基础交互、样式和 accessibility defaults 的低层组件 |
| Compound component | React component API | 多个协作子部件共享一个行为与语义 owner |
| Public API | ES module graph | feature 对外支持的 export 集合 |
| DTO | API contract | 网络边界的数据传输 shape |
| Domain model | JavaScript runtime | 前端业务逻辑使用的内部对象 |
| View model | React boundary | 直接服务 UI render 的展示对象 |
| Runtime validation | JavaScript runtime | 对 unknown 外部值执行真实检查 |
| Feature flag | release governance | 带 owner、targeting、cleanup 的发布决策，不只是 boolean |
| RBAC UI guard | UI boundary | 控制可见性，不替代 server authorization |
| Message catalog | i18n | message key 到 locale text 的映射 |
| Error event | observability | 带 release、route、feature 和隐私约束的结构化对象 |
| Performance budget | delivery gate | route-level cost 的持续阈值 |
| ADR | documentation governance | 记录 context、decision、alternatives 与 consequences |
| Strangler migration | migration | 用 compatibility boundary 逐步替换旧实现 |

## 6. 底层心智模型

生产级前端可以看成五条同时运行的链：

1. **Module chain**：app 组合 feature；feature 依赖 shared；shared 不反向认识 feature。
2. **Data chain**：unknown network value → runtime validation → DTO → adapter → domain model → view model → React JSX。
3. **UI chain**：token → primitive → compound component → feature component → page / route。
4. **Feedback chain**：runtime event → normalized error / metric → release context → dashboard / alert → engineering decision。
5. **Change chain**：requirement → ADR → implementation → review gate → release flag → measurement → cleanup or rollback。

React 负责按 props/state 计算并提交 UI；JavaScript runtime 创建对象、调用 adapter 和 evaluator；browser 提供 DOM、URL、Intl、Performance 等平台行为；TypeScript 在构建前检查 shape 与调用关系但会擦除类型；Vite 建立 module graph 和 bundle；lint、test、build 与 review 共同构成工程门禁。任何一层都不能单独保证 production quality。

## 7. 推荐目录结构

### 当前项目结构

以下是本章依赖的当前真实项目边界。`src/App.tsx` 只负责 lazy mount，不承载本章机制。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">当前项目结构</span>
  </div>

```txt
D:/vite_ts/
  AGENTS.MD
  README.md
  package.json
  tsconfig.app.json
  eslint.config.js
  vite.config.ts
  src/
    App.tsx
    learning/
      react/
  docs/
    react/
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
    chapter-15-production-frontend-architecture/
      react-chapter-15-learning-guide.md
```
</div>

### 真实练习结构

每个核心主题有独立目录。文件名表达 learning goal；adapter 与 CSS 位于章节根，不伪装成核心机制。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">真实练习结构</span>
  </div>

```txt
src/learning/react/chapter-15-production-frontend-architecture/
  01-production-architecture-map/
    production-architecture-map.tsx
  02-design-tokens-primitive-ui/
    design-token-primitive-boundary.tsx
  03-compound-accessibility-contract/
    accessible-compound-tabs.tsx
  04-feature-module-public-api/
    catalog-feature-public-api.ts
    feature-public-api-boundary.tsx
  05-shared-feature-boundary/
    dependency-direction-audit.tsx
  06-api-contract-adapter/
    api-contract-adapter-panel.tsx
  07-error-normalization-client-boundary/
    error-normalization-panel.tsx
  08-feature-flags-rbac-release/
    feature-flag-permission-panel.tsx
  09-i18n-locale-formatting/
    locale-formatting-panel.tsx
  10-observability-error-reporting/
    observability-event-panel.tsx
  11-performance-budget-web-vitals/
    performance-budget-panel.tsx
  12-security-boundary-checks/
    security-boundary-panel.tsx
  13-migration-strategy/
    migration-strategy-panel.tsx
  14-adr-review-governance/
    governance-evidence-panel.tsx
  15-sellerhub-production-map/
    sellerhub-production-map.tsx
  chapter-15-practice-root.tsx
  chapter-15-practice.css
```
</div>

### 概念示例结构

下面这些名称只用于错误对比，不代表需要创建文件，也不用于交付验证记录。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets:
  Snippet: deep feature import
  Snippet: DTO rendered directly
  Snippet: UI permission mistaken for authorization
  Snippet: sensitive error report
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
src/learning/react/chapter-15-production-frontend-architecture/
  sellerhub-production-architecture-kit/
    design-system/
      tokens.ts
      primitive-button.tsx
      compound-tabs.tsx
    features/
      catalog/
        catalog-public-api.ts
      orders/
        orders-public-api.ts
    shared/
      api/
        sellerhub-api-contract.ts
        sellerhub-api-adapter.ts
      flags/
        feature-flags.ts
      i18n/
        messages.ts
        formatters.ts
      observability/
        error-reporter.ts
      performance/
        performance-budget.ts
      security/
        security-boundaries.ts
    governance/
      architecture-decision-record.md
      code-review-checklist.md
      migration-plan.md
    sellerhub-production-dashboard.tsx
    sellerhub-production-architecture-kit.tsx
```
</div>

这个结构不创建 package workspace。`design-system`、`features` 与 `shared` 是当前 Vite app 内的学习边界；真实 monorepo 只有在多 app、独立发布、独立 ownership 等成本成立后才值得引入。

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

打开 Vite 输出的本地地址，再访问 `/react/chapter-15`。质量门禁使用：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```
</div>

`dev` 证明页面可交互，`lint` 检查静态规则，`typecheck` 检查 TypeScript program，`test` 验证行为，`build` 验证 production bundle。四者不是同一个 gate。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Production architecture：从组件项目到工程系统

**结论：**

Production architecture 不是目录数量，而是每个重要边界都有明确 owner、accepted input、published output、dependency rule 和 evidence gate。

**本节解决的问题：**

当 catalog、orders、design system、API 和 release 同时变化时，只按组件树思考无法回答“谁负责、谁能依赖谁、变更由什么证据放行”。本节把这些问题建模为 `ArchitectureBoundary` objects。

**技术意义与新概念：**

`owner` 让责任可追踪；`input` / `output` 让 contract 可描述；`gate` 把“应该注意”变成可执行检查。React component 只是这些 contract 的消费者和可视化层，不是 architecture 本身。

**边界：**

JavaScript runtime 创建 `architectureBoundaries` array 并由 `map()` 生成 React elements；React 用 `boundary.name` 作为 sibling key 并提交列表；TypeScript 检查每个 object 包含五个 string fields；Vite 跟踪 module import graph；CI / review gate 负责 TypeScript 无法证明的 ownership、security 和 release evidence。本节没有新的 React runtime API，重点是工程边界、文件组织和可维护性机制。

**工程规则与固定结构：**

`ArchitectureBoundary` 固定字段为 `name`、`owner`、`input`、`output`、`gate`。这不是业界强制标准，而是本练习的可审查 schema；真实团队可扩展 `risk`、`maintainers`、`runbook` 和 `serviceLevelObjective`。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/01-production-architecture-map/production-architecture-map.tsx</span>
  </div>

```tsx
type ArchitectureBoundary = {
  name: string
  owner: string
  input: string
  output: string
  gate: string
}

const architectureBoundaries: ArchitectureBoundary[] = [
  {
    name: 'Design system',
    owner: 'UI platform',
    input: 'tokens and accessibility contracts',
    output: 'primitive and compound components',
    gate: 'component API review',
  },
  {
    name: 'Feature module',
    owner: 'product squad',
    input: 'domain models and user intent',
    output: 'public feature API',
    gate: 'dependency direction check',
  },
  {
    name: 'API contract',
    owner: 'frontend and backend',
    input: 'unknown network response',
    output: 'validated domain model',
    gate: 'runtime validation and contract test',
  },
  {
    name: 'Release',
    owner: 'delivery team',
    input: 'build artifact and evidence',
    output: 'approved deployment candidate',
    gate: 'lint, typecheck, test, build, and review',
  },
]

export function ProductionArchitectureMap() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.1 Production architecture</p>
      <h2>Boundaries turn components into an engineering system</h2>
      <p>
        Each boundary names an owner, accepted input, published output, and evidence gate.
      </p>
      <div className="chapter15-grid">
        {architectureBoundaries.map((boundary) => (
          <article className="chapter15-card" key={boundary.name}>
            <h3>{boundary.name}</h3>
            <dl className="chapter15-definition-list">
              <div>
                <dt>Owner</dt>
                <dd>{boundary.owner}</dd>
              </div>
              <div>
                <dt>Input</dt>
                <dd>{boundary.input}</dd>
              </div>
              <div>
                <dt>Output</dt>
                <dd>{boundary.output}</dd>
              </div>
              <div>
                <dt>Gate</dt>
                <dd>{boundary.gate}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**逐行解释与执行过程：**

类型先限定 boundary object shape；array 明确四个 owner；component render 时 `map()` 为每个 object 创建一个 `<article>` description list；React 在同一 sibling scope 使用稳定 `name` 匹配 element identity；commit 后 browser 建立对应 DOM。页面不会执行 gate，它只把 gate model 可视化，因此“显示 quality gate”不能伪装成“已经执行 quality gate”。

**机制证据链与变量变化：**

触发动作是 Vite 加载章节 module 并由 React 调用 `ProductionArchitectureMap`。JavaScript 读取同一个 module-scope array reference，每次 render 只创建新的 React element objects，不修改 boundary objects；React 当前 render snapshot 消费这些 objects；TypeScript 只检查 object fields 与 JSX 使用，不验证 `owner` 是否真实存在；实际 CI command 和 peer review 才验证 gate。若把 architecture 等同目录，会缺少 owner/output/gate，真实项目中的信号是“文件很多，但 API change 找不到责任人，release 也没有阻断条件”。

**为什么得到这个结果与对比：**

UI 显示四张 card，是因为 array 有四个元素且每个元素生成一个 sibling。对比只画 `components/`、`hooks/`、`utils/` 的技术目录，它无法表达 product ownership 和 allowed dependency。目录是存储位置，boundary 是 change contract。

**常见错误为什么错：**

只写“采用 feature-based architecture”违反可验证性规则，因为没有公开 export、依赖方向或 gate。识别方法是询问：一个 breaking API change 由谁发现，哪条 import 被禁止，哪个 command 或 reviewer 能阻止发布？回答不了就仍是架构口号。

**与 SellerHub 和学习主线的关系：**

SellerHub 的 catalog、orders、checkout、shared UI、API contract 与 release 各自需要 owner。本节把前 14 章的组件、数据、route、test 与 migration 能力放进同一 governance map。

**最终记忆模型：**

Production architecture = boundary ownership + dependency direction + published contract + executable evidence gate。

<a id="section-9-2"></a>

### 9.2 Design tokens 与 primitive UI component

**结论：**

Design token 保存命名设计决策；primitive component 把 token、基础 interaction 和可覆盖范围组合成稳定 component API。Design System 还需要 composition rules、accessibility contract、documentation 与 versioning，所以它不等于“公共组件目录”。

**本节解决的问题：**

如果每个业务 button 自己选择颜色、圆角和 padding，视觉变更会散落在 feature 中；如果 primitive 又直接请求 catalog API，它就被业务污染。本节把 design decision 和 caller intent 分开。

**技术意义与新概念：**

`as const` 保留 token literal types；`ButtonHTMLAttributes<HTMLButtonElement>` 保留原生 button props；`emphasis` 是 design-system intent，不是 catalog-specific action。本节没有新的 React runtime API，重点是 props contract 和 token ownership。

**边界与工程规则：**

JavaScript runtime 创建一个 frozen-by-convention token object，但 `as const` 只读是 TypeScript 约束，不会调用 `Object.freeze()`；React 将 merged `style` object 转交 React DOM；browser 应用 CSS properties 并执行 button semantics；TypeScript 合并 native props 与 custom prop。primitive 可以接受 `onClick`，但不应知道 checkout request、permission 或 route。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/02-design-tokens-primitive-ui/design-token-primitive-boundary.tsx</span>
  </div>

```tsx
import type { ButtonHTMLAttributes, CSSProperties } from 'react'

const designTokens = {
  color: {
    action: '#0f766e',
    actionHover: '#115e59',
    surface: '#ffffff',
    text: '#16302f',
  },
  radius: {
    control: 6,
  },
  space: {
    controlInline: 14,
    controlBlock: 9,
  },
} as const

type PrimitiveActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  emphasis?: 'primary' | 'quiet'
}

function PrimitiveAction({
  emphasis = 'primary',
  style,
  type = 'button',
  ...buttonProps
}: PrimitiveActionProps) {
  const tokenStyle: CSSProperties = {
    padding: `${designTokens.space.controlBlock}px ${designTokens.space.controlInline}px`,
    border: `1px solid ${designTokens.color.action}`,
    borderRadius: designTokens.radius.control,
    color: emphasis === 'primary' ? designTokens.color.surface : designTokens.color.action,
    backgroundColor:
      emphasis === 'primary' ? designTokens.color.action : designTokens.color.surface,
    font: 'inherit',
    fontWeight: 700,
  }

  return <button {...buttonProps} style={{ ...tokenStyle, ...style }} type={type} />
}

export function DesignTokenPrimitiveBoundary() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.2 Design tokens and primitive UI</p>
      <h2>Tokens carry decisions; primitives carry interaction contracts</h2>
      <p>
        The caller chooses intent and behavior while the primitive owns control-level
        styling defaults.
      </p>
      <div className="chapter15-actions">
        <PrimitiveAction>Publish catalog</PrimitiveAction>
        <PrimitiveAction emphasis="quiet">Save draft</PrimitiveAction>
      </div>
      <p className="chapter15-note">
        Token value: {designTokens.color.action}; hover reference:{' '}
        {designTokens.color.actionHover}
      </p>
    </section>
  )
}
```
</div>

**逐行解释与执行过程：**

`import type` 不产生 runtime import binding；token object 保存 primitive values；intersection type 把 native button contract 与 `emphasis` 合并；destructuring 提供 default；`tokenStyle` 从 tokens 派生；最后 spread native props，再用 merged style 提交 DOM。caller 的 `style` 位于后面，因此可覆盖 token defaults，这是当前 contract 的显式选择。

**机制证据链与变量变化：**

触发动作是 render 两次 `PrimitiveAction`。JavaScript 为每次 call 创建不同 props object 和 `tokenStyle` object；两者读取同一个 `designTokens` reference；React 把 props 转成两个 button elements；TypeScript 阻止无效 `emphasis` literal 并检查 DOM event props，但 runtime 不保留 union type。若 caller 传入业务 request 到 primitive 内部，规则被破坏的信号是 design-system module 开始 import `features/catalog` 或 API client。

**为什么得到这个结果与对比：**

第一个 button 使用默认 `primary`，第二个由 `quiet` 分支选择 surface background。对比每个 feature 复制 hex values，token change 无法集中；对比把所有 CSS 都允许自由覆盖，primitive contract 又失去一致性。生产 Design System 必须明确哪些属性可覆盖、哪些是 invariant。

**常见错误为什么错：**

误以为 `as const` 会冻结 runtime object 违反 TypeScript type-erasure 边界。可通过 `Object.isFrozen(designTokens) === false` 识别；若需要 runtime immutability，必须单独冻结或限制 module exposure。

**与 SellerHub 和学习主线的关系：**

SellerHub product grid、checkout 和 seller actions 可以共享 primitive button，但各自业务 intent 留在 feature component。本节承接 props、composition、accessibility 与 compiler purity。

**最终记忆模型：**

Token 命名决策，primitive 执行低层 contract，feature 提供业务 intent；依赖方向只能从 feature 指向 design system。

<a id="section-9-3"></a>

### 9.3 Compound component 与 accessibility contract

**结论：**

Compound component 的价值不是把 JSX 拆成多个名字，而是让一个 owner 协调 active state、ARIA relationships、focus movement 和 child content。

**本节解决的问题：**

如果每个 feature 自己拼 tabs，很容易只实现 click，却遗漏 `role="tablist"`、`aria-selected`、`aria-controls`、roving `tabIndex` 和 Arrow key focus。

**技术意义与新概念：**

本节引入 roving tab stop、manual activation、`useRef` 保存 DOM node references，以及 WAI-ARIA tabs pattern。固定 roles 是 `tablist`、`tab`、`tabpanel`；固定关系是 tab `aria-controls` panel，panel `aria-labelledby` tab。

**边界与 API 规则：**

Browser 产生 `KeyboardEvent` 并执行 focus；React event handler 更新 `activeTabId` state cell；ref object 在 renders 之间保持 identity，`ref.current` array 不参与 render output；TypeScript 检查 `TabId` union 和 `KeyboardEvent<HTMLButtonElement>`，不验证实际 accessibility tree。`ArrowRight`、`ArrowLeft`、`Home`、`End` 由 handler 处理并 `preventDefault()`；其他 key 保留 browser default。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/03-compound-accessibility-contract/accessible-compound-tabs.tsx</span>
  </div>

```tsx
import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

type TabId = 'contract' | 'keyboard' | 'ownership'

type TabDefinition = {
  id: TabId
  label: string
  content: string
}

const tabDefinitions: TabDefinition[] = [
  {
    id: 'contract',
    label: 'Contract',
    content: 'The compound component owns roles, ids, and selected state.',
  },
  {
    id: 'keyboard',
    label: 'Keyboard',
    content: 'Arrow keys move focus and activate the next tab.',
  },
  {
    id: 'ownership',
    label: 'Ownership',
    content: 'Consumers provide content without rebuilding accessibility wiring.',
  },
]

export function AccessibleCompoundTabs() {
  const [activeTabId, setActiveTabId] = useState<TabId>('contract')
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeTab = tabDefinitions.find((tab) => tab.id === activeTabId)!

  function activateTab(index: number): void {
    const nextTab = tabDefinitions[index]
    setActiveTabId(nextTab.id)
    tabRefs.current[index]?.focus()
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    let nextIndex = index

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabDefinitions.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabDefinitions.length) % tabDefinitions.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabDefinitions.length - 1
    } else {
      return
    }

    event.preventDefault()
    activateTab(nextIndex)
  }

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.3 Compound component accessibility</p>
      <h2>One owner coordinates tab semantics and focus behavior</h2>
      <div aria-label="Accessibility contract topics" className="chapter15-tabs" role="tablist">
        {tabDefinitions.map((tab, index) => (
          <button
            aria-controls={`chapter15-panel-${tab.id}`}
            aria-selected={tab.id === activeTabId}
            className="chapter15-tab"
            id={`chapter15-tab-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            role="tab"
            tabIndex={tab.id === activeTabId ? 0 : -1}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`chapter15-tab-${activeTab.id}`}
        className="chapter15-tab-panel"
        id={`chapter15-panel-${activeTab.id}`}
        role="tabpanel"
        tabIndex={0}
      >
        {activeTab.content}
      </div>
    </section>
  )
}
```
</div>

**逐行解释与执行过程：**

`TabId` 限制 valid active state；state cell 保存当前 selection；ref object 保存 button nodes；`find()` 从 snapshot 派生 active definition；keyboard handler 计算 index，阻止 handled key 的 default，再更新 state 并调用 DOM `focus()`；JSX 为每个 tab 建立稳定 id relationship。

**机制证据链与引用变化：**

用户在第二个 tab 按 `ArrowRight`；browser 创建 keyboard event；当前 render closure 收到 `index = 1`，计算 `nextIndex = 2`；`setActiveTabId('ownership')` 排队 state update；同一个 `tabRefs` object 的 `current[2]` 指向第三个 button，browser 立即移动 focus；下一次 render snapshot 的 `activeTabId` 变为 `'ownership'`，React commit 更新 `aria-selected`、`tabIndex` 与 panel content。TypeScript 不会操作 focus，也不会证明 ids 唯一；重复 id 或错误 ARIA relationship 仍需 accessibility test 和 review。

**为什么得到这个结果与对比：**

focus 与 selected state 都移动，是因为本练习采用 automatic activation。若 panel 加载有明显 latency，应采用 manual activation：Arrow keys 只移动 focus，Space / Enter 再改变 selection。

**常见错误为什么错：**

只在 CSS 上切换 active class 违反 semantic contract；screen reader 不知道 selection，keyboard 用户也可能困在多个 `tabIndex={0}` 上。识别方法是不用鼠标完成 tabs 操作，并检查 accessibility tree 中 roles 与 relationships。

**与 SellerHub 和学习主线的关系：**

SellerHub architecture dashboard 用 tabs 切换 architecture、operations 与 governance。它承接 state snapshot、refs、events、component composition 和 testing 的 accessibility-first queries。

**最终记忆模型：**

Compound component 是共享行为 owner：state 决定 selection，refs 执行 focus，ARIA attributes 把 DOM nodes 连接成 platform accessibility contract。

<a id="section-9-4"></a>

### 9.4 Feature module public API 与 dependency direction

**结论：**

Feature public API 是被支持的 import surface。消费者依赖 capability，不应 deep import feature 内部 data、component 或 helper。

**本节解决的问题：**

当 catalog 内部文件重命名时，deep imports 会把内部实现变成全项目 contract。本节用 `catalogFeaturePublicApi` 集中发布 `listVisibleProducts()` 和 `getProductRoute()`。

**技术意义、新概念与边界：**

ES module 的 `export` 决定 symbol 是否可被 import，但“public API 文件”是团队 architecture convention；TypeScript 检查函数参数和返回值；JavaScript runtime 创建 module singleton object；React 只消费返回的 product array；Vite 从静态 imports 建立 module graph。TypeScript 不会自动禁止同目录外 deep import，需要 lint rule、package exports、review 或 architecture test。本节没有新的 React runtime API，重点是 module contract。

**固定导出名与签名：**

本练习固定导出 `catalogFeaturePublicApi`，其签名为 `listVisibleProducts(): CatalogProduct[]` 和 `getProductRoute(productId: string): string`。`encodeURIComponent()` 属于 JavaScript platform API，用于 path segment value，不等于完整 URL authorization。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/04-feature-module-public-api/catalog-feature-public-api.ts</span>
  </div>

```ts
export type CatalogProduct = {
  id: string
  name: string
  active: boolean
}

const catalogProducts: CatalogProduct[] = [
  { id: 'product-101', name: 'Desk Lamp', active: true },
  { id: 'product-102', name: 'Archive Shelf', active: false },
]

export const catalogFeaturePublicApi = {
  listVisibleProducts(): CatalogProduct[] {
    return catalogProducts.filter((product) => product.active)
  },
  getProductRoute(productId: string): string {
    return `/catalog/${encodeURIComponent(productId)}`
  },
}
```
</div>

Public API value 和 product type 位于普通 `.ts` module，Fast Refresh 不会把 non-component export 与 React component 混在同一 module。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/04-feature-module-public-api/feature-public-api-boundary.tsx</span>
  </div>

```tsx
import { catalogFeaturePublicApi } from './catalog-feature-public-api'

export function FeaturePublicApiBoundary() {
  const visibleProducts = catalogFeaturePublicApi.listVisibleProducts()

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.4 Feature public API</p>
      <h2>Consumers import capabilities instead of internal files</h2>
      <ul className="chapter15-list">
        {visibleProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <code>{catalogFeaturePublicApi.getProductRoute(product.id)}</code>
          </li>
        ))}
      </ul>
      <p className="chapter15-note">
        Published exports: {Object.keys(catalogFeaturePublicApi).join(', ')}
      </p>
    </section>
  )
}
```
</div>

**逐行解释、执行过程与变化：**

Public API module evaluation 创建 `catalogProducts` array 与 API object；panel module 只 import 这个 supported value 并导出 component；render 调用公开 method，`filter()` 创建新的 array 但复用 product object references；React 为 active product 创建 list item；route method 把 id 编码后返回 string。array reference 每次调用变化，product references 不变；这里没有 state update。

**机制证据链：**

App 需要 catalog list → import public API → runtime 调用 `filter()` → React snapshot 消费 returned array → TypeScript 确认 product fields 和 route argument → build graph 记录 consumer 到 public module 的 edge。错误形式是 consumer import `features/catalog/internal/catalogProducts`，它绕过 supported surface；识别信号是 feature 内部重构引发跨项目 import 修改。

**为什么得到结果、错误与对比：**

只显示 `Desk Lamp`，因为 `filter()` 对 `active` 为 true 的 object 保留 reference。对比 default export 一个巨大 feature object，小而命名的 public methods 更容易审查。常见错误是用 barrel file 无限制 re-export 所有内部 symbols，这虽然叫 `index.ts`，仍没有缩小 API。

**与 SellerHub 和学习主线的关系：**

SellerHub 的 App shell 只需 catalog route 和 view models，不应知道 catalog request cache 或 private components。本节把 modules、props、routing 与 migration surface 连接起来。

**最终记忆模型：**

Public API 是允许依赖的窄门；文件夹存在不等于 boundary 存在。

<a id="section-9-5"></a>

### 9.5 Shared module、business module 与 architecture cycle

**结论：**

`shared` 只能保存跨业务稳定、低语义的能力；一旦 shared import feature，就形成方向反转，并可能通过 feature 再回到 shared 形成 cycle。

**本节解决的问题：**

“大家都能用”不是放进 shared 的充分条件。业务订单状态 formatter 若只服务 orders，就应留在 orders；否则 shared 会成为所有 feature 的隐式耦合中心。

**技术意义、新概念与边界：**

本节把 module graph edge 建模为 `fromLayer → toLayer`，允许 `app → feature/shared`、`feature → feature/shared`，阻止 `shared → feature/app`。这是一套本章 rule，不是 JavaScript 语法规则。Vite 和 browser 可以执行部分循环依赖，但 initialization order 与 undefined bindings 会让行为脆弱；TypeScript 能解析 graph，不会按本规则自动拒绝。本节没有新的 React runtime API。

**固定结构与工程规则：**

`ModuleLayer` 固定为 `'app' | 'feature' | 'shared'`；`DependencyEdge` 固定字段为 `from`、`fromLayer`、`to`、`toLayer`；`isAllowedDependency(edge): boolean` 是可自动化的 policy seam。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/05-shared-feature-boundary/dependency-direction-audit.tsx</span>
  </div>

```tsx
type ModuleLayer = 'app' | 'feature' | 'shared'

type DependencyEdge = {
  from: string
  fromLayer: ModuleLayer
  to: string
  toLayer: ModuleLayer
}

const dependencyEdges: DependencyEdge[] = [
  {
    from: 'catalog-page',
    fromLayer: 'feature',
    to: 'currency-formatter',
    toLayer: 'shared',
  },
  {
    from: 'shared-button',
    fromLayer: 'shared',
    to: 'checkout-feature',
    toLayer: 'feature',
  },
  {
    from: 'application-shell',
    fromLayer: 'app',
    to: 'orders-feature',
    toLayer: 'feature',
  },
]

function isAllowedDependency(edge: DependencyEdge): boolean {
  if (edge.fromLayer === 'shared') {
    return edge.toLayer === 'shared'
  }

  if (edge.fromLayer === 'feature') {
    return edge.toLayer !== 'app'
  }

  return true
}

export function DependencyDirectionAudit() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.5 Shared and feature boundary</p>
      <h2>Dependency direction is a graph rule, not a folder preference</h2>
      <div className="chapter15-table" role="table" aria-label="Dependency direction audit">
        {dependencyEdges.map((edge) => {
          const allowed = isAllowedDependency(edge)

          return (
            <div className="chapter15-table-row" key={`${edge.from}-${edge.to}`} role="row">
              <code role="cell">{edge.from}</code>
              <span role="cell">imports</span>
              <code role="cell">{edge.to}</code>
              <strong className={allowed ? 'chapter15-pass' : 'chapter15-fail'} role="cell">
                {allowed ? 'allowed' : 'blocked'}
              </strong>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```
</div>

**逐行解释、执行过程与引用变化：**

union type 限制 layer labels；array 记录三条 edge；pure evaluator 根据 source layer 决策；render 为每条 edge 计算 local `allowed` boolean 并映射为 class 与 text。没有修改 graph array，也没有 React state；每次 render 只创建 booleans 和 element objects。

**机制证据链：**

触发动作是 architecture review 提交一条 `shared-button → checkout-feature` edge；JavaScript evaluator 读取 `fromLayer = 'shared'` 和 `toLayer = 'feature'`，返回 false；React 显示 blocked；TypeScript 只能确认 layer literal 有效，不能判断业务归属是否标对；CI 必须从真实 imports 构建 edges 才能自动阻断。错误风险是 shared 被 checkout 语义污染；识别信号是一个 shared change 需要同时理解多个 feature。

**为什么得到结果、对比与错误：**

第二条 edge 被阻止，因为 shared branch 只允许指向 shared。对比“所有公共 helper 都放 shared”，正确问题应是：它是否足够稳定、无业务 owner、能被至少两个 feature 以相同语义使用？常见错误是为了消除 cycle 把所有代码继续上移到 shared，这只隐藏 coupling。

**与 SellerHub 和学习主线的关系：**

SellerHub formatters、API primitives 可 shared；checkout decision、order status transitions 属于 feature。此规则承接 Context scope、route ownership、test boundaries 和 code splitting。

**最终记忆模型：**

Shared 是依赖图底层，不是杂物间；低层知道高层就是 architecture smell。

<a id="section-9-6"></a>

### 9.6 API contract：DTO、domain model、view model 与 adapter

**结论：**

Network response 从 browser / server 边界进入前端时是 `unknown`；runtime guard 建立 DTO trust，adapter 再把 transport naming 转成 domain naming，最后 formatter 产生 UI-specific view model。

**本节解决的问题：**

直接让 component 读取 `price_cents`、`published_at` 会把 backend naming、date parsing 和 locale formatting 扩散到 UI。后端字段一变，全站 components 一起破坏。

**技术意义、新概念与边界：**

DTO 描述 transport；domain model 保存前端业务语义；view model 保存可 render strings。TypeScript guard 的 return type predicate `value is ProductDto` 同时提供 runtime boolean 和 compile-time narrowing。`Intl` 与 `Date` 是 JavaScript/browser platform behavior；React 只消费 view model。

**固定签名与规则：**

固定 pipeline 为 `isProductDto(unknown) → toProductDomainModel(ProductDto) → toProductViewModel(ProductDomainModel)`。Guard 必须执行真实 property checks；声明 `const response: ProductDto = await ...` 只是在编译器里断言，不会校验 JSON。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/06-api-contract-adapter/api-contract-adapter-panel.tsx</span>
  </div>

```tsx
type ProductDto = {
  product_id: string
  display_name: string
  price_cents: number
  published_at: string
}

type ProductDomainModel = {
  id: string
  name: string
  priceInCents: number
  publishedAt: Date
}

type ProductViewModel = {
  id: string
  title: string
  priceLabel: string
  publishedLabel: string
}

const productResponse: unknown = {
  product_id: 'product-301',
  display_name: 'Task Chair',
  price_cents: 12900,
  published_at: '2026-06-20T09:00:00.000Z',
}

function isProductDto(value: unknown): value is ProductDto {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.product_id === 'string' &&
    typeof candidate.display_name === 'string' &&
    typeof candidate.price_cents === 'number' &&
    typeof candidate.published_at === 'string'
  )
}

function toProductDomainModel(dto: ProductDto): ProductDomainModel {
  return {
    id: dto.product_id,
    name: dto.display_name,
    priceInCents: dto.price_cents,
    publishedAt: new Date(dto.published_at),
  }
}

function toProductViewModel(product: ProductDomainModel): ProductViewModel {
  return {
    id: product.id,
    title: product.name,
    priceLabel: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(product.priceInCents / 100),
    publishedLabel: new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(product.publishedAt),
  }
}

export function ApiContractAdapterPanel() {
  if (!isProductDto(productResponse)) {
    return (
      <section className="chapter15-panel">
        <h2>API contract rejected</h2>
      </section>
    )
  }

  const domainModel = toProductDomainModel(productResponse)
  const viewModel = toProductViewModel(domainModel)

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.6 API contract adapter</p>
      <h2>Unknown response to DTO to domain model to view model</h2>
      <article className="chapter15-card">
        <h3>{viewModel.title}</h3>
        <p>{viewModel.priceLabel}</p>
        <p>Published {viewModel.publishedLabel}</p>
        <code>{viewModel.id}</code>
      </article>
    </section>
  )
}
```
</div>

**逐行解释、执行过程与对象变化：**

`productResponse` 保持 unknown；guard 先排除 null 和 primitive，再读取 candidate properties；narrowing 后 adapter 创建新的 camelCase domain object，其中 date string 变成 `Date` object；view adapter 再创建只含 render strings 的 object；React snapshot 只读取 `viewModel`。

**机制证据链：**

API response 到达 → JavaScript guard 检查 concrete properties → TypeScript 在 true branch 缩窄 binding → domain adapter 创建新 object/reference → locale formatters 创建 strings → React render card。TypeScript types emitted 后消失，恶意或破损 JSON 仍只能由 runtime guard 阻止。若 UI 直接读取 DTO，错误风险是 backend rename 导致多个 components 同时 undefined；识别信号是 JSX 出现 snake_case network fields。

**为什么得到结果、对比与错误：**

页面显示 `$129.00` 和格式化日期，因为 cents 除以 100，UTC `Date` 交给固定 locale formatter。对比 `as ProductDto`，它没有任何 runtime branch。当前 guard 仍是最小模型：真实项目还要验证 date validity、numeric ranges 和 contract version。

**与 SellerHub 和学习主线的关系：**

SellerHub catalog DTO 可随 backend contract 演化，而 product card 继续消费稳定 view model。本节承接第 9 章 runtime validation、第 13 章 serialization boundary 和第 14 章 migration gate。

**最终记忆模型：**

Unknown 先验证，DTO 再适配，domain model 做业务，view model 服务 React。

<a id="section-9-7"></a>

### 9.7 Error normalization 与 generated client boundary model

**结论：**

Generated client 可以自动化 request/response types，却不能替 UI 决定 retry、message、privacy 和 telemetry shape。所有 thrown values 应在 boundary 归一化为一个 UI-facing error contract。

**本节解决的问题：**

若每个 page 分别判断 HTTP error、`TypeError` 和任意 thrown value，loading/error UI 与 retry policy 会不一致。

**技术意义、新概念与边界：**

`unknown` 是 catch boundary 的正确起点；type guard 识别 generated client error；`instanceof TypeError` 识别 network-like failure；normalizer 返回 `NormalizedClientError`。OpenAPI generator 属于 tooling，本章只模拟其 output shape，不安装 generator。本节没有新的 React runtime API。

**固定签名与规则：**

`normalizeClientError(error: unknown): NormalizedClientError` 固定输出 `code`、`message`、`retryable` 和 optional `status`。UI 不读取 generated client private fields。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/07-error-normalization-client-boundary/error-normalization-panel.tsx</span>
  </div>

```tsx
type NormalizedClientError = {
  code: string
  message: string
  retryable: boolean
  status?: number
}

type GeneratedClientError = {
  status: number
  body?: {
    code?: string
    message?: string
  }
}

const sampleErrors: unknown[] = [
  {
    status: 409,
    body: {
      code: 'PRODUCT_CONFLICT',
      message: 'Product was updated by another session.',
    },
  },
  new TypeError('Failed to fetch'),
  'unexpected failure',
]

function isGeneratedClientError(error: unknown): error is GeneratedClientError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number'
  )
}

function normalizeClientError(error: unknown): NormalizedClientError {
  if (isGeneratedClientError(error)) {
    return {
      code: error.body?.code ?? 'HTTP_ERROR',
      message: error.body?.message ?? `Request failed with status ${error.status}.`,
      retryable: error.status >= 500,
      status: error.status,
    }
  }

  if (error instanceof TypeError) {
    return {
      code: 'NETWORK_ERROR',
      message: 'The network request could not be completed.',
      retryable: true,
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected client error occurred.',
    retryable: false,
  }
}

export function ErrorNormalizationPanel() {
  const normalizedErrors = sampleErrors.map(normalizeClientError)

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.7 Error normalization</p>
      <h2>Generated client errors become one UI-facing contract</h2>
      <div className="chapter15-grid">
        {normalizedErrors.map((error) => (
          <article className="chapter15-card" key={`${error.code}-${error.status ?? 'none'}`}>
            <h3>{error.code}</h3>
            <p>{error.message}</p>
            <span>{error.retryable ? 'Retry available' : 'Manual resolution required'}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**逐行解释、执行过程与对象变化：**

sample array 保存三种 runtime values；guard 只读取 object-like status；normalizer 每次创建新 normalized object；`map()` 创建新 array；React 只依赖统一 fields，不关心原始 error prototype 或 body shape。

**机制证据链：**

Request rejects → catch value 进入 `unknown` → guard 分支读取 status/body 或 `instanceof` → normalizer 创建 stable object → React error card 消费 object → TypeScript 检查所有 branches 返回相同 shape。若直接 `catch (error: GeneratedClientError)`，类型声明不会改变 thrown runtime value；识别信号是 production error UI 出现 `undefined` message 或每页 retry policy 不同。

**为什么得到结果、对比与错误：**

409 conflict 不 retry，network error 可 retry，string fallback 不 retry，这是明确 policy。对比把 raw `error.message` 直接显示，任意 object 或敏感 backend detail 可能泄漏。normalizer 需要与 observability reporter 分工：一个服务 UI，另一个服务诊断。

**与 SellerHub 和学习主线的关系：**

SellerHub product conflict、orders outage 与 unknown failure 可进入同一 error branch，继承第 5 章 UI states 和第 9 章 async lifecycle。

**最终记忆模型：**

Generated type 自动化 transport；normalizer 定义 product-facing failure semantics。

<a id="section-9-8"></a>

### 9.8 Feature flags、RBAC UI 与 release strategy

**结论：**

Capability visibility 是 flag decision 与 permission decision 的交集；flag 必须有 owner 和 cleanup date；UI guard 永远不是 server authorization。

**本节解决的问题：**

单一 boolean 无法回答谁负责、何时移除、哪些角色可见、失败时怎样 rollout。把 permission 只做前端隐藏还会制造安全错觉。

**技术意义、新概念与边界：**

React state 保存当前练习的 flag 和 role snapshot；JavaScript evaluator 读取 immutable inputs 并返回 decision object；TypeScript union 限制 role / permission strings；server 仍必须校验 mutation permission。真实 flag provider 可能使用 targeting context 和 percentage rollout，本章不安装 SDK。

**固定签名与工程规则：**

`ReleaseFlag` 固定字段 `key`、`enabled`、`owner`、`cleanupDate`；`evaluateCapability(flag, permissions, requiredPermission)` 返回 `visible` 与 `reason`。Flag release 完成后必须 cleanup，不能永久保留双分支。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/08-feature-flags-rbac-release/feature-flag-permission-panel.tsx</span>
  </div>

```tsx
import { useState } from 'react'

type Role = 'viewer' | 'seller-admin'
type Permission = 'checkout:preview' | 'checkout:publish'

type ReleaseFlag = {
  key: 'checkout-v2'
  enabled: boolean
  owner: string
  cleanupDate: string
}

type CapabilityDecision = {
  visible: boolean
  reason: string
}

const permissionsByRole: Record<Role, Permission[]> = {
  viewer: ['checkout:preview'],
  'seller-admin': ['checkout:preview', 'checkout:publish'],
}

function evaluateCapability(
  flag: ReleaseFlag,
  permissions: Permission[],
  requiredPermission: Permission,
): CapabilityDecision {
  if (!flag.enabled) {
    return { visible: false, reason: 'Release flag is disabled.' }
  }

  if (!permissions.includes(requiredPermission)) {
    return { visible: false, reason: 'UI permission is missing.' }
  }

  return { visible: true, reason: 'Flag and UI permission allow this capability.' }
}

export function FeatureFlagPermissionPanel() {
  const [flagEnabled, setFlagEnabled] = useState(true)
  const [role, setRole] = useState<Role>('viewer')
  const releaseFlag: ReleaseFlag = {
    key: 'checkout-v2',
    enabled: flagEnabled,
    owner: 'checkout-team',
    cleanupDate: '2026-09-30',
  }
  const decision = evaluateCapability(
    releaseFlag,
    permissionsByRole[role],
    'checkout:publish',
  )

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.8 Feature flags, RBAC UI, and release</p>
      <h2>Visibility requires both release intent and UI permission</h2>
      <div className="chapter15-actions">
        <label className="chapter15-control">
          <input
            checked={flagEnabled}
            onChange={(event) => setFlagEnabled(event.currentTarget.checked)}
            type="checkbox"
          />
          Enable checkout-v2
        </label>
        <label className="chapter15-control">
          Role
          <select onChange={(event) => setRole(event.currentTarget.value as Role)} value={role}>
            <option value="viewer">viewer</option>
            <option value="seller-admin">seller-admin</option>
          </select>
        </label>
      </div>
      <p className={decision.visible ? 'chapter15-pass' : 'chapter15-warn'}>
        {decision.visible ? 'Publish capability visible' : 'Publish capability hidden'}:{' '}
        {decision.reason}
      </p>
      <p className="chapter15-note">
        This UI guard improves experience. The server must still authorize the mutation.
      </p>
    </section>
  )
}
```
</div>

**逐行解释、执行过程与 state 变化：**

role-to-permission record 是 module data；pure evaluator 先判 flag 再判 permission；checkbox handler 从 browser `checked` 读取 boolean，select handler读取 string；setter 分别更新两个 state cells；新 render 创建新的 `releaseFlag` 与 `decision` objects。

**机制证据链：**

用户选择 `seller-admin` → browser change event → handler closure 排队 role update → React 新 snapshot 读取 admin permissions → evaluator 看到 flag true 且包含 `checkout:publish` → UI 显示 capability。TypeScript 检查 role cast 后的 union，但 cast 本身不验证任意 DOM string；server 也看不到这次 UI decision。若把 hidden button 当授权，攻击者仍可直接调用 API；识别信号是 backend endpoint 没有独立 permission check。

**为什么得到结果、对比与错误：**

viewer 即使 flag on 也看不到 publish，admin 只有在 flag on 时可见。对比只写 `flag && <Button />`，它没有 RBAC、reason、owner、cleanup。常见错误是上线后不删除 flag，导致测试矩阵长期倍增。

**与 SellerHub 和学习主线的关系：**

SellerHub checkout-v2 rollout、seller analytics preview 和 destructive seller actions 都需要 release 与 permission 两种 owner。本节承接 conditional rendering、state、routing guard 和 testing matrix。

**最终记忆模型：**

Flag 决定“是否发布”，permission 决定“UI 是否提供能力”，server authorization 决定“操作是否允许”。

<a id="section-9-9"></a>

### 9.9 Internationalization、message catalog 与 locale formatting

**结论：**

i18n 不只是替换 strings。Message catalog 负责语义文本，`Intl` formatter 负责 currency、number、date 的 locale-sensitive 表示，route/SEO、fallback 和 test matrix 还属于更外层 framework concern。

**本节解决的问题：**

手写 `$`、逗号和 `MM/DD/YYYY` 会把 locale 规则散落在 JSX；只翻译 label 而不格式化数字，页面仍然不是 locale-correct。

**技术意义、新概念与边界：**

`Locale` union 让当前支持范围显式；message catalog 是 app data；`Intl.NumberFormat` 和 `Intl.DateTimeFormat` 是 JavaScript internationalization platform APIs；React state 只保存 selected locale。TypeScript 检查 catalog keys 完整，不保证译文正确或 locale data 在所有 runtime 一致。

**固定签名与规则：**

`formatRevenue(locale, amountInCents)` 接收最小货币单位；`formatOrderDate(locale, date)` 固定 UTC 以保证练习结果稳定。真实系统必须明确 currency 与 amount 的关系，不能仅凭 locale 猜币种；本例这样做只是可见演示。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/09-i18n-locale-formatting/locale-formatting-panel.tsx</span>
  </div>

```tsx
import { useState } from 'react'

type Locale = 'en-US' | 'en-GB'

type MessageKey = 'revenue' | 'lastOrder'

const messageCatalog: Record<Locale, Record<MessageKey, string>> = {
  'en-US': {
    revenue: 'Revenue',
    lastOrder: 'Last order',
  },
  'en-GB': {
    revenue: 'Turnover',
    lastOrder: 'Latest order',
  },
}

function formatRevenue(locale: Locale, amountInCents: number): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale === 'en-US' ? 'USD' : 'GBP',
  }).format(amountInCents / 100)
}

function formatOrderDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(date)
}

export function LocaleFormattingPanel() {
  const [locale, setLocale] = useState<Locale>('en-US')
  const messages = messageCatalog[locale]

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.9 Internationalization and locale</p>
      <h2>Messages and locale-sensitive values have different owners</h2>
      <label className="chapter15-control">
        Locale
        <select
          onChange={(event) => setLocale(event.currentTarget.value as Locale)}
          value={locale}
        >
          <option value="en-US">en-US</option>
          <option value="en-GB">en-GB</option>
        </select>
      </label>
      <div className="chapter15-grid">
        <article className="chapter15-card">
          <h3>{messages.revenue}</h3>
          <p>{formatRevenue(locale, 286450)}</p>
        </article>
        <article className="chapter15-card">
          <h3>{messages.lastOrder}</h3>
          <p>{formatOrderDate(locale, new Date('2026-06-24T10:00:00.000Z'))}</p>
        </article>
      </div>
    </section>
  )
}
```
</div>

**逐行解释、执行过程与 state 变化：**

Nested `Record` 要求两个 locales 都有两个 keys；formatters 每次调用创建 formatter object 并返回 string；select 更新 locale state cell；下一次 render 用 locale 读取不同 message object reference，并用同一个 numeric/date source values 产生不同 display strings。

**机制证据链：**

用户切换 `en-GB` → browser change event 提供 string → React 更新 locale snapshot → catalog lookup 选择 UK messages → `Intl` 进行 locale negotiation 并格式化 GBP/date → React commit 新 text nodes。TypeScript 不检查译文语义，也不能保证 unknown locale cast 安全；真实 app 应从 validated supported locale list 选择。错误信号是 JSX 中遍布 `toFixed(2)`、拼接货币符号和 hard-coded date slices。

**为什么得到结果、对比与错误：**

source amount 仍为 `286450` cents，只有 output string 变化。对比把 formatted string 存 state，会产生 duplicated derived state；locale 切换后旧 strings 可能不更新。

**与 SellerHub 和学习主线的关系：**

Catalog price、order date、stock count 和 status label 都需要统一 locale owner。本节承接 derived data、controlled select、Context boundary 与 server/client formatting consistency。

**最终记忆模型：**

Message key 表达语义，locale 决定文案与格式，raw numeric/date values 保持业务 source of truth。

<a id="section-9-10"></a>

### 9.10 Observability：error reporting、route context 与 release metadata

**结论：**

Observability event 应回答“哪个 release、哪个 route、哪个 feature、什么 error”，同时遵守 privacy boundary。`console.log(error)` 既不可关联，也可能泄漏敏感数据。

**本节解决的问题：**

相同错误在 `/catalog` 和 `/seller/orders` 可能由不同 owner 处理；没有 release metadata 就无法判断 regression 从哪个版本开始。

**技术意义、新概念与边界：**

`createErrorEvent()` 是 pure normalization boundary；event handler 是允许创建 timestamp 和更新 state 的位置；React state 保存最近三个 mock events；browser clock 提供 `Date.now()` 与 ISO timestamp；真实 SDK、source maps、session replay 属于外部 observability system，本章不接入。

**固定 object shape 与规则：**

`FrontendErrorEvent` 固定含 `eventId`、`code`、`message`、`occurredAt`、`route`、`feature`、`release`、`sessionId`。实际系统应 hash / pseudonymize session references，并禁止 token、password、payment data 和 direct PII。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/10-observability-error-reporting/observability-event-panel.tsx</span>
  </div>

```tsx
import { useState } from 'react'

type ErrorContext = {
  route: string
  feature: string
  release: string
  sessionId: string
}

type FrontendErrorEvent = ErrorContext & {
  eventId: string
  code: string
  message: string
  occurredAt: string
}

function createErrorEvent(error: unknown, context: ErrorContext): FrontendErrorEvent {
  const knownError = error instanceof Error ? error : new Error('Unknown client error')

  return {
    ...context,
    eventId: `event-${Date.now()}`,
    code: knownError.name.toUpperCase(),
    message: knownError.message,
    occurredAt: new Date().toISOString(),
  }
}

export function ObservabilityEventPanel() {
  const [events, setEvents] = useState<FrontendErrorEvent[]>([])

  function reportCatalogError(): void {
    const nextEvent = createErrorEvent(new Error('Catalog preview unavailable.'), {
      route: '/catalog',
      feature: 'catalog-preview',
      release: 'learning-2026.06',
      sessionId: 'session-anonymous',
    })

    setEvents((currentEvents) => [nextEvent, ...currentEvents].slice(0, 3))
  }

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.10 Observability and error reporting</p>
      <h2>An error event needs operational context, not raw console output</h2>
      <button className="chapter15-button" onClick={reportCatalogError} type="button">
        Report mock error
      </button>
      {events.length === 0 ? (
        <p className="chapter15-note">No mock events have been reported.</p>
      ) : (
        <ul className="chapter15-list">
          {events.map((event) => (
            <li key={event.eventId}>
              <strong>{event.code}</strong>
              <span>{event.message}</span>
              <code>
                {event.release} | {event.route} | {event.feature}
              </code>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
```
</div>

**逐行解释、执行过程与引用变化：**

intersection type 合并 error 和 context fields；normalizer 把 arbitrary value 变成 `Error`；button event 创建 event object；functional state update 读取 React 提供的 latest array，创建 `[nextEvent, ...currentEvents]` 新 array 并 slice；旧 array 和 event objects 不被修改。

**机制证据链：**

用户点击 report → React 调用当前 handler closure → JavaScript 创建 Error、context、event 与 timestamp → setter queue 使用 latest state 产生最多三个 events → React 新 snapshot map events → UI 显示 release/route/feature。TypeScript 只保证 fields 存在，不能判断 message 是否含 secret；privacy review 和 redaction 必须另做。错误信号是只有 stack trace、无法按 release 聚合，或日志中出现 access token。

**为什么得到结果、对比与错误：**

列表 newest-first 且最多三条，因为 functional updater prepend 后 slice。对比 render 时直接 `createErrorEvent()`，timestamp 和 event id 会在每次 render 变化，违反 pure render。

**与 SellerHub 和学习主线的关系：**

SellerHub orders failure 需要 route、feature 和 release context 才能分派 owner。本节承接 event/effect boundary、async error、route state、Profiler evidence 和 testing。

**最终记忆模型：**

Error 是发生的事情；observability event 是带 context、version 和 privacy policy 的诊断 contract。

<a id="section-9-11"></a>

### 9.11 Web Vitals、route cost 与 performance budget

**结论：**

Performance budget 是每条 route 的持续 release gate，不是上线前一次 Lighthouse screenshot。Field metrics、lab metrics 与 bundle cost 必须分开解释。

**本节解决的问题：**

一次 memoization 优化不能阻止未来 bundle、LCP、INP、CLS 回退；团队需要把阈值和 route sample 转成 repeatable decision。

**技术意义、新概念与边界：**

当前 Core Web Vitals 是 LCP、INP、CLS；web.dev 建议在 mobile / desktop 分段的第 75 百分位评估。本练习只用静态 samples 演示 evaluator，不宣称真实采集；真实 browser 可通过 Performance APIs 或 `web-vitals` library 采样，CI 可检查 bundle size，二者不能互相替代。

**固定 object shape 与规则：**

`RoutePerformanceSample` 含 route、JavaScript KB、LCP ms、INP ms、CLS；`evaluateRouteBudget()` 返回 `pass | warn | fail` 和 violations。阈值是本项目练习 policy；除 Core Web Vitals 官方 good thresholds 外，bundle budget 必须根据 product / device / network 决定。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/11-performance-budget-web-vitals/performance-budget-panel.tsx</span>
  </div>

```tsx
type BudgetStatus = 'pass' | 'warn' | 'fail'

type RoutePerformanceSample = {
  route: string
  javascriptKb: number
  lcpMs: number
  inpMs: number
  cls: number
}

type RoutePerformanceBudget = {
  maxJavascriptKb: number
  maxLcpMs: number
  maxInpMs: number
  maxCls: number
}

type BudgetEvaluation = {
  route: string
  status: BudgetStatus
  violations: string[]
}

const routeBudget: RoutePerformanceBudget = {
  maxJavascriptKb: 180,
  maxLcpMs: 2500,
  maxInpMs: 200,
  maxCls: 0.1,
}

const routeSamples: RoutePerformanceSample[] = [
  { route: '/catalog', javascriptKb: 164, lcpMs: 2180, inpMs: 165, cls: 0.04 },
  { route: '/seller/orders', javascriptKb: 196, lcpMs: 2720, inpMs: 205, cls: 0.08 },
]

function evaluateRouteBudget(
  sample: RoutePerformanceSample,
  budget: RoutePerformanceBudget,
): BudgetEvaluation {
  const violations = [
    sample.javascriptKb > budget.maxJavascriptKb ? 'javascript' : null,
    sample.lcpMs > budget.maxLcpMs ? 'lcp' : null,
    sample.inpMs > budget.maxInpMs ? 'inp' : null,
    sample.cls > budget.maxCls ? 'cls' : null,
  ].filter((value): value is string => value !== null)

  return {
    route: sample.route,
    status: violations.length === 0 ? 'pass' : violations.length === 1 ? 'warn' : 'fail',
    violations,
  }
}

export function PerformanceBudgetPanel() {
  const evaluations = routeSamples.map((sample) => evaluateRouteBudget(sample, routeBudget))

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.11 Web Vitals and performance budget</p>
      <h2>Route cost becomes a repeatable release decision</h2>
      <div className="chapter15-grid">
        {evaluations.map((evaluation) => (
          <article className="chapter15-card" key={evaluation.route}>
            <h3>{evaluation.route}</h3>
            <strong className={`chapter15-${evaluation.status}`}>{evaluation.status}</strong>
            <p>
              {evaluation.violations.length === 0
                ? 'All sample budgets passed.'
                : `Exceeded: ${evaluation.violations.join(', ')}`}
            </p>
          </article>
        ))}
      </div>
      <p className="chapter15-note">
        These static samples demonstrate the gate model; they are not real field measurements.
      </p>
    </section>
  )
}
```
</div>

**逐行解释、执行过程与对象变化：**

Budget 与 samples 是 module constants；evaluator 为四项 comparison 创建 array，filter 生成 violations；status 由 violation count 派生；render map 创建 evaluation objects 和 cards。没有采集 browser metric，也没有 mutation。

**机制证据链：**

Release candidate 带来 route sample → JavaScript 比较 sample 与 budget numbers → violations array 记录具体 cost → React 显示 pass/warn/fail → TypeScript 检查 metric fields，但不能证明 sample 真实、单位正确或代表 P75 → CI/analytics pipeline 才能提供 provenance。错误信号是 budget dashboard 永远 green，却找不到采样来源和时间窗口。

**为什么得到结果、对比与错误：**

`/catalog` 全过所以 pass；`/seller/orders` 超 JavaScript、LCP、INP 三项所以 fail。对比只看总 bundle，route chunk 与 field responsiveness 可能仍退化；对比只看 field metric，也无法在合并前阻断 bundle regression。

**与 SellerHub 和学习主线的关系：**

Catalog image-heavy，seller orders interaction-heavy，应有不同 route evidence。本节把第 11 章 Profiler / code splitting 和第 12 章 CI gates 扩展到用户体验预算。

**最终记忆模型：**

Measure 提供事实，budget 定义可接受成本，gate 决定是否放行，owner 负责修复或批准例外。

<a id="section-9-12"></a>

### 9.12 Security boundary：XSS、safe link、token、CSP 与 sensitive logging

**结论：**

Frontend security 是 source → validation → sink 的边界设计。React 默认 text rendering 能降低 XSS 风险，但 `dangerouslySetInnerHTML`、URL、browser storage、third-party scripts 和 logging 仍需独立控制；CSP 是 defense-in-depth，不是唯一防线。

**本节解决的问题：**

“React 会转义所以安全”忽略了 raw HTML、unsafe protocols、access token storage 和 sensitive logs；“按钮被 RBAC 隐藏”也不等于 API authorization。

**技术意义、新概念与边界：**

`URL` constructor 是 browser/JavaScript platform parser；`rel="noopener noreferrer"` 限制新 browsing context；React JSX text 不等于 HTML sanitizer；TypeScript string type 不区分 trusted URL 与 untrusted input；server headers 才能真正部署 CSP，当前 Vite helper 只演示 review findings。

**固定签名与工程规则：**

`isSafeExternalUrl(string): boolean` 只允许 HTTPS；`inspectSecurityBoundary()` 返回四项 findings。真实项目还需 server-side authorization、CSRF strategy、CSP header、sanitizer、dependency review 和 third-party script inventory。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/12-security-boundary-checks/security-boundary-panel.tsx</span>
  </div>

```tsx
type SecurityFinding = {
  check: string
  status: 'pass' | 'fail'
  evidence: string
}

function isSafeExternalUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:'
  } catch {
    return false
  }
}

function inspectSecurityBoundary(input: {
  externalUrl: string
  rendersRawHtml: boolean
  storesAccessToken: boolean
  loggedFields: string[]
}): SecurityFinding[] {
  const sensitiveLogFields = new Set(['accessToken', 'password', 'sessionId'])
  const leakedFields = input.loggedFields.filter((field) => sensitiveLogFields.has(field))

  return [
    {
      check: 'Safe external URL',
      status: isSafeExternalUrl(input.externalUrl) ? 'pass' : 'fail',
      evidence: input.externalUrl,
    },
    {
      check: 'Unsafe HTML boundary',
      status: input.rendersRawHtml ? 'fail' : 'pass',
      evidence: input.rendersRawHtml ? 'Raw HTML requested' : 'React text rendering retained',
    },
    {
      check: 'Token storage boundary',
      status: input.storesAccessToken ? 'fail' : 'pass',
      evidence: input.storesAccessToken ? 'Access token in browser storage' : 'No token stored',
    },
    {
      check: 'Sensitive logging boundary',
      status: leakedFields.length === 0 ? 'pass' : 'fail',
      evidence: leakedFields.length === 0 ? 'No sensitive keys' : leakedFields.join(', '),
    },
  ]
}

export function SecurityBoundaryPanel() {
  const findings = inspectSecurityBoundary({
    externalUrl: 'https://seller.example/catalog-policy',
    rendersRawHtml: false,
    storesAccessToken: false,
    loggedFields: ['release', 'route', 'errorCode'],
  })

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.12 Security boundaries</p>
      <h2>Security checks connect browser sinks to reviewable evidence</h2>
      <ul className="chapter15-list">
        {findings.map((finding) => (
          <li key={finding.check}>
            <strong>{finding.check}</strong>
            <span className={`chapter15-${finding.status}`}>{finding.status}</span>
            <code>{finding.evidence}</code>
          </li>
        ))}
      </ul>
      <a
        className="chapter15-link"
        href="https://example.com/security"
        rel="noopener noreferrer"
        target="_blank"
      >
        Open security policy example
      </a>
    </section>
  )
}
```
</div>

**逐行解释、执行过程与对象变化：**

URL parser 在 try block 创建 URL object；invalid input 返回 false；inspector 创建 sensitive-key Set、filter 出 leaked fields，再创建四个 finding objects；React 只显示 evidence，不执行 sanitization。External link 使用 fixed HTTPS URL 和 rel attributes。

**机制证据链：**

Security review 提供 input → JavaScript parser / boolean checks / sensitive-key Set 计算 findings → React snapshot 展示 pass/fail → browser 按 `target` 和 `rel` 打开链接 → TypeScript 只检查 strings 与 union，不判断 URL trust 或 CSP 是否部署 → server config 和 penetration/security review 才验证真正防线。错误信号是 JSX 出现 arbitrary `dangerouslySetInnerHTML`、token 写入 `localStorage` 或 reporter payload 含 credentials。

**为什么得到结果、对比与错误：**

四项都 pass，因为 URL 是 HTTPS、未请求 raw HTML、未存 token、log keys 不敏感。对比把 untrusted HTML 传给 `dangerouslySetInnerHTML`，React 会交给 browser HTML parser 执行；CSP 即使存在也不应替代 sanitization。

**与 SellerHub 和学习主线的关系：**

SellerHub product description、seller external links、auth/session 和 payment logs 都跨越 security boundary。本节连接 DOM、browser APIs、async data、observability 与 server/client responsibility。

**最终记忆模型：**

Type 不是 trust，hidden UI 不是 authorization，CSP 不是 sanitizer，日志也属于数据泄漏面。

<a id="section-9-13"></a>

### 9.13 Migration strategy：inventory、risk、compat layer 与 rollback

**结论：**

Migration 不是一次 rewrite，而是 inventory → compatibility → migration → retirement 的可回滚序列。每个 work item 需要 risk 与 rollback，不应等到失败才设计恢复路径。

**本节解决的问题：**

直接把所有 deep imports、DTO consumers 和 UI primitives 一次替换，会扩大 blast radius；没有 compatibility layer，旧新路径无法并行验证。

**技术意义、新概念与边界：**

Inventory 发现事实；risk classification 决定顺序；compat layer 暂时保持旧 contract；retirement 清理旧路径；rollback 恢复受影响 boundary。TypeScript 和 tests 能发现一部分 contract regressions，不能证明 rollout、user data 或 operational recovery。本节没有新的 React runtime API。

**固定 object shape 与规则：**

`MigrationWorkItem` 固定 `id`、`phase`、`target`、`risk`、`rollback`。本练习 phase union 固定四阶段；真实 plan 还需 owner、deadline、dependency、success metric 和 communication。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/13-migration-strategy/migration-strategy-panel.tsx</span>
  </div>

```tsx
type MigrationPhase = 'inventory' | 'compatibility' | 'migration' | 'retirement'
type MigrationRisk = 'low' | 'medium' | 'high'

type MigrationWorkItem = {
  id: string
  phase: MigrationPhase
  target: string
  risk: MigrationRisk
  rollback: string
}

const migrationWorkItems: MigrationWorkItem[] = [
  {
    id: 'migration-01',
    phase: 'inventory',
    target: 'Deep feature imports',
    risk: 'medium',
    rollback: 'Keep existing exports while inventory is reviewed.',
  },
  {
    id: 'migration-02',
    phase: 'compatibility',
    target: 'Catalog API adapter',
    risk: 'high',
    rollback: 'Route calls through the legacy mapper.',
  },
  {
    id: 'migration-03',
    phase: 'migration',
    target: 'Token-driven primitives',
    risk: 'medium',
    rollback: 'Restore component-level CSS variables.',
  },
  {
    id: 'migration-04',
    phase: 'retirement',
    target: 'Legacy shared business helpers',
    risk: 'low',
    rollback: 'Revert the deletion commit before release.',
  },
]

export function MigrationStrategyPanel() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.13 Migration strategy</p>
      <h2>Inventory, compatibility, migration, and retirement remain reversible</h2>
      <ol className="chapter15-timeline">
        {migrationWorkItems.map((workItem) => (
          <li key={workItem.id}>
            <span>{workItem.phase}</span>
            <strong>{workItem.target}</strong>
            <small>Risk: {workItem.risk}</small>
            <p>Rollback: {workItem.rollback}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
```
</div>

**逐行解释、执行过程与对象变化：**

Phase/risk unions 限制 plan vocabulary；array 按执行顺序保存 work items；component map 到 ordered list。render 不执行 migration，也不更新 items；它只可视化 reviewed plan，因此完成状态必须来自真实 change tracking。

**机制证据链：**

Architecture review 发现 deep imports → inventory item 记录 target/risk → compatibility item 保留 legacy mapper → feature-by-feature migration 经过 lint/typecheck/test/build → retirement 删除零消费者 export → failure 时按 rollback 恢复旧 mapper。TypeScript 可发现 missing exports，不能评估 user rollout 或 rollback 时效。错误信号是 PR 同时删除旧路径和迁移全部 consumers，且没有 independent revert point。

**为什么得到结果、对比与错误：**

UI 按 array order 显示四阶段，是因为 plan 将 dependency sequence 显式化。对比“重写后整体切换”，strangler pattern 保持旧新路径并行，降低一次性 blast radius，但 compatibility layer 必须有 retirement date，否则成为永久双系统。

**与 SellerHub 和学习主线的关系：**

SellerHub 可先迁移 catalog adapter，再迁 orders public API，最后退休 deep imports。本节把 Actions/Compiler migration、test gates 和 route rollout 组合为生产变更流程。

**最终记忆模型：**

先 inventory，后 compatibility，再迁移和测量，最后 retirement；任何一步都要有 rollback。

<a id="section-9-14"></a>

### 9.14 ADR、code review standard 与 engineering governance

**结论：**

Engineering governance 不是口号，而是具有 owner、required fields、status 和 blocking rule 的 artifacts。ADR 记录为何决策；review checklist 检查 change；release checklist 验证可交付证据。

**本节解决的问题：**

如果 ADR 只写结论，后来者不知道 alternatives；如果 review 只看“能运行”，state ownership、Effect necessity、accessibility、security 和 rollback 都可能漏掉。

**技术意义、新概念与边界：**

Governance objects 让 artifact schema 可视化；Markdown files 保存 durable decision history；React dashboard 只展示摘要；Git review / CI 才执行 gate。Accepted ADR 应通过新 ADR supersede，而不是静默重写历史。本节没有新的 React runtime API。

**固定 object shape 与规则：**

本练习 `GovernanceGate` 固定 `artifact`、`requiredFields`、`decisionOwner`、`status`。ADR 至少含 context、decision、alternatives、consequences；review checklist 每项必须能回答 pass/fail/evidence；release gate 需要 command result 与 rollback。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/14-adr-review-governance/governance-evidence-panel.tsx</span>
  </div>

```tsx
type GovernanceGate = {
  artifact: string
  requiredFields: string[]
  decisionOwner: string
  status: 'ready' | 'needs-evidence'
}

const governanceGates: GovernanceGate[] = [
  {
    artifact: 'Architecture decision record',
    requiredFields: ['context', 'decision', 'alternatives', 'consequences', 'follow-up'],
    decisionOwner: 'frontend architecture group',
    status: 'ready',
  },
  {
    artifact: 'Code review checklist',
    requiredFields: ['state owner', 'effect necessity', 'accessibility', 'security', 'tests'],
    decisionOwner: 'peer reviewer',
    status: 'ready',
  },
  {
    artifact: 'Release checklist',
    requiredFields: ['lint', 'typecheck', 'test', 'build', 'rollback'],
    decisionOwner: 'release owner',
    status: 'needs-evidence',
  },
]

export function GovernanceEvidencePanel() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.14 ADR, review, and governance</p>
      <h2>Governance artifacts turn decisions into executable gates</h2>
      <div className="chapter15-grid">
        {governanceGates.map((gate) => (
          <article className="chapter15-card" key={gate.artifact}>
            <h3>{gate.artifact}</h3>
            <p>Owner: {gate.decisionOwner}</p>
            <p>Fields: {gate.requiredFields.join(', ')}</p>
            <strong
              className={gate.status === 'ready' ? 'chapter15-pass' : 'chapter15-warn'}
            >
              {gate.status}
            </strong>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**逐行解释、执行过程与对象变化：**

Status union 限制展示状态；gates array 保存 required fields 和 owner；render 把 `requiredFields` join 成 text，并由 status 决定 visual evidence。这里的 `ready` 是 sample data，不代表真实 release 已通过；真实状态必须由 reviewed artifacts 和 command results产生。

**机制证据链：**

Architectural change 触发 ADR → author 记录 context/alternatives/consequences → reviewer 按 checklist 检查 module/data/security boundaries → CI 运行 commands → release owner 收集 evidence 与 rollback → status 才从 needs-evidence 变 ready。TypeScript 只检查 object shape，不会读取 Markdown quality 或 command result。错误信号是 checklist 全部勾选却没有 link、test output、metric 或 owner。

**为什么得到结果、对比与错误：**

Release gate 显示 needs-evidence，因为 sample 明确还缺 command / rollback evidence。对比 ADR 写成实现流水账，关键是“为何选择以及代价”；对比 checklist 写“注意性能”，可执行项应要求 route metric 或 bundle diff。

**与 SellerHub 和学习主线的关系：**

SellerHub feature public API 决策进入 ADR；每个 PR 检查 state/effect/API/accessibility/security；release 前跑四项 gates 并验证 rollback。

**最终记忆模型：**

ADR 保存 decision memory，review 检查 change quality，CI 提供 machine evidence，release owner 做最终风险决定。

<a id="section-9-15"></a>

### 9.15 SellerHub production architecture project mapping

**结论：**

简历上的 production claim 应映射成 concern、owner、artifact 和 measurable outcome。只写“React + TypeScript + Vite”不能证明 architecture 能力。

**本节解决的问题：**

学习项目常把功能截图当全部证据，却没有 public API、adapter、error context、performance budget、security finding、ADR 或 migration plan。

**技术意义、新概念与边界：**

`SellerHubArchitectureEvidence` 把 architecture concern 连接到 owner、evidence 和 resume outcome。React 展示 evidence catalog；真实 Git history、tests、build output、metrics 和 docs 才是证明。本节没有新的 React runtime API。

**固定 object shape 与规则：**

每条 evidence 固定 `concern`、`owner`、`evidence`、`resumeOutcome`。Resume bullet 应描述“做了什么边界决策、降低了什么风险、用什么结果证明”，不能虚构 production traffic 或外部服务。

**真实示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/15-sellerhub-production-map/sellerhub-production-map.tsx</span>
  </div>

```tsx
type SellerHubArchitectureEvidence = {
  concern: string
  owner: string
  evidence: string
  resumeOutcome: string
}

const sellerHubEvidence: SellerHubArchitectureEvidence[] = [
  {
    concern: 'Catalog UI',
    owner: 'catalog feature',
    evidence: 'public API and token-driven product components',
    resumeOutcome: 'Defined feature and design-system boundaries.',
  },
  {
    concern: 'Orders data',
    owner: 'orders feature',
    evidence: 'DTO validation, adapter, and normalized errors',
    resumeOutcome: 'Protected UI from backend contract changes.',
  },
  {
    concern: 'Release quality',
    owner: 'delivery team',
    evidence: 'flags, performance budget, review, and rollback gates',
    resumeOutcome: 'Added measurable release governance.',
  },
  {
    concern: 'Operations',
    owner: 'frontend platform',
    evidence: 'error context, privacy boundary, and security checks',
    resumeOutcome: 'Improved production diagnosis and risk review.',
  },
]

export function SellerHubProductionMap() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.15 SellerHub production mapping</p>
      <h2>Architecture claims require code, documents, and observable evidence</h2>
      <div className="chapter15-grid">
        {sellerHubEvidence.map((item) => (
          <article className="chapter15-card" key={item.concern}>
            <h3>{item.concern}</h3>
            <p>Owner: {item.owner}</p>
            <p>Evidence: {item.evidence}</p>
            <strong>{item.resumeOutcome}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**逐行解释、执行过程与引用变化：**

Type 定义四项 evidence schema；module array 保存四个 claims；render map 创建 cards，并以 concern 作为 stable sibling key。objects 不变，只有 React elements 在每次 render 重建。

**机制证据链：**

面试问题“如何组织大型 React 项目” → learner 选择 concern → 展示真实 public API / adapter / governance file → 提供 quality gate result 或 measured artifact → 解释 owner 与 tradeoff。TypeScript 只能证明 demo object shape，不能证明 resume claim 真实；必须以 repository file、test、build 和文档为证。错误信号是 bullet 只有工具列表，没有 decision、risk 或 evidence。

**为什么得到结果、对比与错误：**

四张 cards 对应 UI、data、release、operations 四类证据。对比写“使用 Sentry、LaunchDarkly、OpenAPI”，本章没有安装这些工具，因此只能说明它们在真实架构中的位置，不能声称集成结果。

**与 SellerHub 和学习主线的关系：**

本节把第 3–14 章全部能力组织成 SellerHub production narrative，但不实现完整 backend、auth、deployment 或 monitoring service。

**最终记忆模型：**

可信项目陈述 = architecture decision + concrete artifact + validation evidence + honest boundary。

## 10. API / 语法索引

| API / Syntax | Layer | 本章用途 | 不能证明什么 |
| --- | --- | --- | --- |
| `import` / `export` | JavaScript module | 建立 module graph 与 public symbols | 不自动禁止 deep import |
| `import type` / `export type` | TypeScript | 明确 type-only edge，emit 时擦除 | 不创建 runtime value |
| `as const` | TypeScript | 保留 literal / readonly type | 不执行 `Object.freeze()` |
| `Record<K, V>` | TypeScript | 要求完整 key/value mapping | 不验证外部 object |
| type predicate `value is T` | TypeScript + runtime function | true branch narrowing | 只有函数体真实检查才可信 |
| `URL` | JavaScript / browser | 解析 protocol 与 URL | HTTPS 不等于目标内容可信 |
| `encodeURIComponent()` | JavaScript | 编码 path/query value | 不执行 authorization |
| `Intl.NumberFormat` | platform API | locale-aware number / currency | 不决定业务 currency |
| `Intl.DateTimeFormat` | platform API | locale-aware date/time | 不决定 source timezone policy |
| `useState` | React | 保存 selected tab、locale、role、mock events | 不保存 server truth |
| `useRef` | React | 保存 DOM node references | 修改 `current` 不触发 render |
| ARIA tabs roles | browser accessibility | 建立 tab semantic relationship | 不代替 keyboard implementation |
| `rel="noopener noreferrer"` | HTML/browser | 限制 opener 和 referrer | 不验证 URL content |
| `dangerouslySetInnerHTML` | React DOM escape hatch | 提交 raw HTML | 不自动 sanitize |
| `PerformanceObserver` | browser platform | 订阅 performance entries | 不自动形成 product budget |
| OpenAPI description | contract tooling | client/docs/test generation source | generated type 不验证任意 runtime JSON |

## 11. 常见错误表

| Error | Violated rule | Concrete risk | How to recognize | Correction |
| --- | --- | --- | --- | --- |
| 架构等于复杂目录 | boundary 必须有 owner/contract/gate | 文件多但责任不清 | API change 找不到 owner | 写 dependency 和 decision evidence |
| shared import feature | dependency direction 反转 | cycle、业务污染 | shared 文件出现 checkout/catalog import | 下沉或留在 feature |
| deep import feature internals | public API 被绕过 | 内部重构波及全站 | import path 穿过 feature private folders | 只发布窄 public API |
| primitive 发业务请求 | design system 不应依赖 feature | UI library 被业务绑定 | button import API client | caller 传 handler |
| DTO 直接进 JSX | transport 与 view 未隔离 | backend rename 全站破坏 | JSX 出现 snake_case fields | guard + adapter + view model |
| 用 TS type 代替 runtime validation | type erasure | malformed JSON 穿过边界 | `as Dto` 紧跟 `response.json()` | 从 unknown 执行 guard |
| 每页处理 raw errors | 缺少 normalization | retry/message 不一致 | 多处检查 status/body | 单一 normalizer |
| flag 没有 owner/cleanup | temporary branch 无 lifecycle | 永久复杂度和测试矩阵 | 老 flag 无人负责 | metadata + retirement gate |
| UI permission 当安全 | client 不是 authority | API 可被直接调用 | server endpoint 无授权 | server-side authorization |
| i18n 只替换文本 | locale value 未格式化 | currency/date 错误 | JSX 手拼符号和日期 | catalog + `Intl` |
| observability 只 console | 缺 route/release context | 无法聚合 regression | log 无 owner/context | structured event |
| reporter 记录 secrets | privacy boundary 破坏 | token/PII 泄漏 | payload 包含 password/token | allowlist/redaction |
| budget 只跑一次 | gate 不持续 | regression 无阻断 | 只有上线截图 | route budget 进入 CI/monitoring |
| raw HTML 无 sanitizer | unsafe sink | XSS | arbitrary `dangerouslySetInnerHTML` | text rendering 或 reviewed sanitizer |
| token 放 `localStorage` | JS 可读 persistent storage | XSS 可窃取 session | auth code 写 access token | server-managed secure session strategy |
| migration 无 rollback | change 不可逆 | outage 恢复慢 | PR 无恢复步骤 | compatibility + independent revert |
| ADR 无 alternatives | decision context 缺失 | 重复争论 | 文档只有结论 | context/alternatives/consequences |
| review 只看能运行 | quality dimensions 缺失 | a11y/security/perf 漏检 | 无 evidence links | executable checklist |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。`SellerHub Production Architecture Kit` 将 public API、adapter、flag、i18n、observability、performance、security 与 governance artifacts 组合到一个可运行 Vite dashboard；所有数据和外部服务结果都是本地 mock，不冒充真实 production integration。

### 12.1 项目目标

1. 用 design tokens 驱动 primitive button。
2. 用 accessible compound tabs 切换 architecture、operations 与 governance。
3. 让 catalog / orders 只暴露 public API。
4. 让 unknown DTO 经过 runtime guard、adapter 和 view model。
5. 同时展示 feature flag 与 RBAC UI decision，并声明 server authority。
6. 用 message catalog 与 `Intl` 显示 locale-aware data。
7. 用 local error reporter 保存 release / route / feature context。
8. 对 `/catalog`、`/seller/orders` 执行静态 performance budget。
9. 显示 safe link、raw HTML、token storage、sensitive logging findings。
10. 完整保留 ADR、review checklist 与 migration plan。

### 12.2 为什么适合本章

它不是另一个“大组件 demo”，而是一组有方向的 modules：feature 可以依赖 shared contract / design system，shared 不依赖 feature；dashboard 只通过 public API 和 shared helpers 组合能力；governance Markdown 记录无法仅靠代码表达的 decision 与 process。

### 12.3 最终小项目结构

这里列出的 18 个文件都已真实创建，并在 12.5 展示完整内容。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
sellerhub-production-architecture-kit/
  design-system/
    tokens.ts
    primitive-button.tsx
    compound-tabs.tsx
  features/
    catalog/
      catalog-public-api.ts
    orders/
      orders-public-api.ts
  shared/
    api/
      sellerhub-api-contract.ts
      sellerhub-api-adapter.ts
    flags/
      feature-flags.ts
    i18n/
      messages.ts
      formatters.ts
    observability/
      error-reporter.ts
    performance/
      performance-budget.ts
    security/
      security-boundaries.ts
  governance/
    architecture-decision-record.md
    code-review-checklist.md
    migration-plan.md
  sellerhub-production-dashboard.tsx
  sellerhub-production-architecture-kit.tsx
```
</div>

### 12.4 文件职责

| File group | Responsibility |
| --- | --- |
| `design-system/*` | 保存 design decisions、native button contract 和 tabs accessibility behavior |
| `features/catalog/*` | 发布 catalog 支持的 map / route capability |
| `features/orders/*` | 发布 order-to-view-model capability |
| `shared/api/*` | 验证 DTO 并隔离 transport/domain/view shape |
| `shared/flags/*` | 保存 release lifecycle 与 UI capability evaluator |
| `shared/i18n/*` | 分离 message 与 locale formatting |
| `shared/observability/*` | 创建 privacy-limited local error events |
| `shared/performance/*` | 定义 route budget evaluator |
| `shared/security/*` | 把 browser sink risks 变成 findings |
| `governance/*` | 保存 decision、review 与 migration records |
| `sellerhub-production-dashboard.tsx` | 通过公开 API 组合所有 panels |
| `sellerhub-production-architecture-kit.tsx` | 导出最终项目 React entry |

### 12.5 完整代码与工程文档

**Design System：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/design-system/tokens.ts</span>
  </div>

```ts
export const sellerHubTokens = {
  color: {
    action: '#0f766e',
    actionHover: '#115e59',
    danger: '#b42318',
    surface: '#ffffff',
    surfaceMuted: '#eef9f7',
    text: '#17302f',
  },
  radius: {
    control: 6,
    panel: 8,
  },
  space: {
    controlBlock: 9,
    controlInline: 14,
    panel: 20,
  },
} as const

export type SellerHubTokenSet = typeof sellerHubTokens
```
</div>

`sellerHubTokens` 是 runtime object；`SellerHubTokenSet` 是从该 value 派生、构建后擦除的 type。Token names 表达 action/surface/control intent，consumer 不需要复制 hex 和 spacing。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/design-system/primitive-button.tsx</span>
  </div>

```tsx
import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import { sellerHubTokens } from './tokens'

type PrimitiveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: 'primary' | 'quiet' | 'danger'
}

const toneStyles: Record<NonNullable<PrimitiveButtonProps['tone']>, CSSProperties> = {
  primary: {
    borderColor: sellerHubTokens.color.action,
    color: sellerHubTokens.color.surface,
    backgroundColor: sellerHubTokens.color.action,
  },
  quiet: {
    borderColor: sellerHubTokens.color.action,
    color: sellerHubTokens.color.action,
    backgroundColor: sellerHubTokens.color.surface,
  },
  danger: {
    borderColor: sellerHubTokens.color.danger,
    color: sellerHubTokens.color.surface,
    backgroundColor: sellerHubTokens.color.danger,
  },
}

export function PrimitiveButton({
  style,
  tone = 'primary',
  type = 'button',
  ...buttonProps
}: PrimitiveButtonProps) {
  const primitiveStyle: CSSProperties = {
    minHeight: 40,
    padding: `${sellerHubTokens.space.controlBlock}px ${sellerHubTokens.space.controlInline}px`,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: sellerHubTokens.radius.control,
    font: 'inherit',
    fontWeight: 750,
    cursor: 'pointer',
    ...toneStyles[tone],
    ...style,
  }

  return <button {...buttonProps} style={primitiveStyle} type={type} />
}
```
</div>

Primitive 保留 native props，`toneStyles` 强制三个 tones 全覆盖，caller 的 style 最后 merge。它不 import catalog 或 API；点击发生后由 caller handler 决定业务。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/design-system/compound-tabs.tsx</span>
  </div>

```tsx
import { useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'

export type CompoundTabDefinition = {
  id: string
  label: string
  content: ReactNode
}

type CompoundTabsProps = {
  activeId: string
  ariaLabel: string
  onChange: (tabId: string) => void
  tabs: CompoundTabDefinition[]
}

export function CompoundTabs({
  activeId,
  ariaLabel,
  onChange,
  tabs,
}: CompoundTabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0]

  function activate(index: number): void {
    const tab = tabs[index]
    onChange(tab.id)
    tabRefs.current[index]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    }

    if (nextIndex === null) {
      return
    }

    event.preventDefault()
    activate(nextIndex)
  }

  return (
    <div>
      <div aria-label={ariaLabel} className="chapter15-tabs" role="tablist">
        {tabs.map((tab, index) => (
          <button
            aria-controls={`kit-panel-${tab.id}`}
            aria-selected={tab.id === activeTab.id}
            className="chapter15-tab"
            id={`kit-tab-${tab.id}`}
            key={tab.id}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            role="tab"
            tabIndex={tab.id === activeTab.id ? 0 : -1}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`kit-tab-${activeTab.id}`}
        className="chapter15-tab-panel"
        id={`kit-panel-${activeTab.id}`}
        role="tabpanel"
        tabIndex={0}
      >
        {activeTab.content}
      </div>
    </div>
  )
}
```
</div>

Dashboard owns `activeId` state，compound component owns keyboard/ref/ARIA contract。`tabs[0]` fallback 防止 unknown active id，但 caller 仍应提供非空 array；production API 可进一步用 non-empty tuple type 收紧。

**Feature public APIs：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/features/catalog/catalog-public-api.ts</span>
  </div>

```ts
import type { Locale } from '../../shared/i18n/messages'
import type { CatalogProductDto } from '../../shared/api/sellerhub-api-contract'
import {
  adaptCatalogProduct,
  toCatalogProductViewModel,
} from '../../shared/api/sellerhub-api-adapter'
import type { CatalogProductViewModel } from '../../shared/api/sellerhub-api-adapter'

export type { CatalogProductViewModel }

export const catalogFeatureApi = {
  mapProduct(dto: CatalogProductDto, locale: Locale): CatalogProductViewModel {
    const product = adaptCatalogProduct(dto)
    return toCatalogProductViewModel(product, locale)
  },
  productRoute(productId: string): string {
    return `/catalog/${encodeURIComponent(productId)}`
  },
}
```
</div>

Catalog public API 依赖 shared contract/adapter，方向为 feature → shared。Consumer 不需要分别 import adapter 与 formatter；type-only re-export 保留 supported type surface 且不新增 runtime binding。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/features/orders/orders-public-api.ts</span>
  </div>

```ts
import type { Locale } from '../../shared/i18n/messages'
import { formatCurrency, formatDate } from '../../shared/i18n/formatters'

export type SellerOrder = {
  id: string
  totalInCents: number
  placedAt: Date
  status: 'paid' | 'packing' | 'shipped'
}

export type SellerOrderViewModel = {
  id: string
  totalLabel: string
  placedLabel: string
  statusLabel: string
}

const statusLabels: Record<SellerOrder['status'], string> = {
  paid: 'Paid',
  packing: 'Packing',
  shipped: 'Shipped',
}

export const ordersFeatureApi = {
  toViewModel(order: SellerOrder, locale: Locale): SellerOrderViewModel {
    return {
      id: order.id,
      totalLabel: formatCurrency(locale, order.totalInCents),
      placedLabel: formatDate(locale, order.placedAt),
      statusLabel: statusLabels[order.status],
    }
  },
}
```
</div>

Orders 保留业务 status mapping，shared formatter 只处理 locale mechanics。`Record<SellerOrder['status'], string>` 让新增 status 时 typecheck 要求同步 label；runtime 仍需要先验证外部 status。

**Shared API contract 与 adapter：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/api/sellerhub-api-contract.ts</span>
  </div>

```ts
export type CatalogProductDto = {
  product_id: string
  display_name: string
  price_cents: number
  stock_count: number
}

export function isCatalogProductDto(value: unknown): value is CatalogProductDto {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.product_id === 'string' &&
    typeof candidate.display_name === 'string' &&
    typeof candidate.price_cents === 'number' &&
    Number.isInteger(candidate.price_cents) &&
    typeof candidate.stock_count === 'number' &&
    Number.isInteger(candidate.stock_count)
  )
}
```
</div>

Guard 对 unknown object 执行 property 和 integer checks；type predicate 只在返回 true 后缩窄 binding。它是本地最小 contract，不是 OpenAPI generator 或 schema validator 的伪装。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/api/sellerhub-api-adapter.ts</span>
  </div>

```ts
import type { CatalogProductDto } from './sellerhub-api-contract'
import type { Locale } from '../i18n/messages'
import { formatCurrency, formatNumber } from '../i18n/formatters'

export type CatalogProduct = {
  id: string
  name: string
  priceInCents: number
  stockCount: number
}

export type CatalogProductViewModel = {
  id: string
  title: string
  priceLabel: string
  stockLabel: string
}

export function adaptCatalogProduct(dto: CatalogProductDto): CatalogProduct {
  return {
    id: dto.product_id,
    name: dto.display_name,
    priceInCents: dto.price_cents,
    stockCount: dto.stock_count,
  }
}

export function toCatalogProductViewModel(
  product: CatalogProduct,
  locale: Locale,
): CatalogProductViewModel {
  return {
    id: product.id,
    title: product.name,
    priceLabel: formatCurrency(locale, product.priceInCents),
    stockLabel: `${formatNumber(locale, product.stockCount)} in stock`,
  }
}
```
</div>

Adapter 只依赖 sibling shared modules，不反向 import catalog feature。每次调用创建新的 domain / view references；source DTO 不被修改。

**Feature flags 与 locale：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/flags/feature-flags.ts</span>
  </div>

```ts
export type FeatureFlagKey = 'checkout-v2' | 'seller-analytics'
export type SellerPermission = 'checkout:preview' | 'checkout:publish' | 'analytics:view'

export type FeatureFlag = {
  enabled: boolean
  owner: string
  cleanupDate: string
}

export type CapabilityDecision = {
  visible: boolean
  reason: string
}

export const sellerHubFlags: Record<FeatureFlagKey, FeatureFlag> = {
  'checkout-v2': {
    enabled: true,
    owner: 'checkout-team',
    cleanupDate: '2026-09-30',
  },
  'seller-analytics': {
    enabled: false,
    owner: 'seller-platform',
    cleanupDate: '2026-08-15',
  },
}

export function evaluateCapability(input: {
  flagKey: FeatureFlagKey
  flags: Record<FeatureFlagKey, FeatureFlag>
  permissions: SellerPermission[]
  requiredPermission: SellerPermission
}): CapabilityDecision {
  if (!input.flags[input.flagKey].enabled) {
    return { visible: false, reason: 'Release flag is disabled.' }
  }

  if (!input.permissions.includes(input.requiredPermission)) {
    return { visible: false, reason: 'UI permission is missing.' }
  }

  return { visible: true, reason: 'Flag and UI permission allow the capability.' }
}
```
</div>

Flags 是静态 mock record；evaluator 是 pure function。每个 flag 带 owner / cleanup date，避免 boolean 脱离 release lifecycle。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/i18n/messages.ts</span>
  </div>

```ts
export type Locale = 'en-US' | 'en-GB'
export type MessageKey = 'catalogTitle' | 'ordersTitle' | 'releaseTitle'

export const sellerHubMessages: Record<Locale, Record<MessageKey, string>> = {
  'en-US': {
    catalogTitle: 'Catalog',
    ordersTitle: 'Seller orders',
    releaseTitle: 'Release readiness',
  },
  'en-GB': {
    catalogTitle: 'Catalogue',
    ordersTitle: 'Seller orders',
    releaseTitle: 'Release readiness',
  },
}
```
</div>

Nested Record 在 compile time 强制 locale/key completeness；翻译正确性和 fallback behavior 仍需 linguistic review 与 tests。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/i18n/formatters.ts</span>
  </div>

```ts
import type { Locale } from './messages'

export function formatCurrency(locale: Locale, amountInCents: number): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale === 'en-US' ? 'USD' : 'GBP',
  }).format(amountInCents / 100)
}

export function formatDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(date)
}

export function formatNumber(locale: Locale, value: number): string {
  return new Intl.NumberFormat(locale).format(value)
}
```
</div>

三个 functions 统一单位和 timezone policy。真实 commerce model 应把 currency 作为 domain field，而不是由 locale 推导。

**Observability、performance 与 security：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/observability/error-reporter.ts</span>
  </div>

```ts
export type ErrorReportContext = {
  route: string
  feature: string
  release: string
  sessionReference: string
}

export type FrontendErrorEvent = ErrorReportContext & {
  eventId: string
  code: string
  message: string
  occurredAt: string
}

export type ErrorReporter = {
  getEvents: () => FrontendErrorEvent[]
  report: (error: unknown, context: ErrorReportContext) => FrontendErrorEvent
}

export function createErrorReporter(): ErrorReporter {
  let events: FrontendErrorEvent[] = []

  return {
    getEvents(): FrontendErrorEvent[] {
      return [...events]
    },
    report(error: unknown, context: ErrorReportContext): FrontendErrorEvent {
      const knownError = error instanceof Error ? error : new Error('Unknown client error')
      const event: FrontendErrorEvent = {
        ...context,
        eventId: `event-${Date.now()}-${events.length + 1}`,
        code: knownError.name.toUpperCase(),
        message: knownError.message,
        occurredAt: new Date().toISOString(),
      }
      events = [event, ...events].slice(0, 5)
      return event
    },
  }
}
```
</div>

`createErrorReporter` closure 私有保存 events；`getEvents()` 返回 copy，避免 caller 修改内部 array；`report()` 替换 array reference。它是 local mock，不发送 network、不解析 source map、不进行 session replay。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/performance/performance-budget.ts</span>
  </div>

```ts
export type PerformanceBudgetStatus = 'pass' | 'warn' | 'fail'

export type RoutePerformanceSample = {
  route: string
  javascriptKb: number
  lcpMs: number
  inpMs: number
  cls: number
}

export type RoutePerformanceBudget = {
  maxJavascriptKb: number
  maxLcpMs: number
  maxInpMs: number
  maxCls: number
}

export type PerformanceBudgetResult = {
  route: string
  status: PerformanceBudgetStatus
  violations: string[]
}

export const sellerHubRouteBudget: RoutePerformanceBudget = {
  maxJavascriptKb: 180,
  maxLcpMs: 2500,
  maxInpMs: 200,
  maxCls: 0.1,
}

export function evaluatePerformanceBudget(
  sample: RoutePerformanceSample,
  budget: RoutePerformanceBudget,
): PerformanceBudgetResult {
  const violations = [
    sample.javascriptKb > budget.maxJavascriptKb ? 'javascript' : null,
    sample.lcpMs > budget.maxLcpMs ? 'lcp' : null,
    sample.inpMs > budget.maxInpMs ? 'inp' : null,
    sample.cls > budget.maxCls ? 'cls' : null,
  ].filter((value): value is string => value !== null)

  return {
    route: sample.route,
    status: violations.length === 0 ? 'pass' : violations.length === 1 ? 'warn' : 'fail',
    violations,
  }
}
```
</div>

Budget evaluator 是 pure deterministic function，适合 unit test 和 CI adapter。Static samples 不能冒充 field data。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/shared/security/security-boundaries.ts</span>
  </div>

```ts
export type SecurityFinding = {
  check: string
  status: 'pass' | 'fail'
  evidence: string
}

export function safeExternalLinkProps(urlValue: string): {
  href: string
  rel: 'noopener noreferrer'
  target: '_blank'
} | null {
  try {
    const url = new URL(urlValue)
    if (url.protocol !== 'https:') {
      return null
    }

    return {
      href: url.toString(),
      rel: 'noopener noreferrer',
      target: '_blank',
    }
  } catch {
    return null
  }
}

export function inspectSecurityBoundaries(input: {
  externalUrl: string
  rendersRawHtml: boolean
  storesAccessToken: boolean
  loggedFields: string[]
}): SecurityFinding[] {
  const sensitiveKeys = new Set(['accessToken', 'password', 'sessionId'])
  const loggedSensitiveKeys = input.loggedFields.filter((field) => sensitiveKeys.has(field))

  return [
    {
      check: 'External link',
      status: safeExternalLinkProps(input.externalUrl) === null ? 'fail' : 'pass',
      evidence: input.externalUrl,
    },
    {
      check: 'Raw HTML',
      status: input.rendersRawHtml ? 'fail' : 'pass',
      evidence: input.rendersRawHtml ? 'Unsafe HTML requested' : 'Text rendering retained',
    },
    {
      check: 'Token storage',
      status: input.storesAccessToken ? 'fail' : 'pass',
      evidence: input.storesAccessToken ? 'Browser storage used' : 'No access token stored',
    },
    {
      check: 'Sensitive logging',
      status: loggedSensitiveKeys.length === 0 ? 'pass' : 'fail',
      evidence:
        loggedSensitiveKeys.length === 0 ? 'No sensitive keys' : loggedSensitiveKeys.join(', '),
    },
  ]
}
```
</div>

`safeExternalLinkProps` 输出一组可 spread 到 `<a>` 的 fixed props；inspector 把四类 risk 转成 review findings。它不部署 CSP、不验证 server auth，也不 sanitize HTML。

**完整工程文档：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/governance/architecture-decision-record.md</span>
  </div>

```txt
# ADR-001: Feature Public APIs and Design System Boundary

## Status

Accepted

## Context

SellerHub needs catalog and orders features that can evolve without exposing internal files. Shared UI must remain free of product-specific requests and permissions.

## Decision

Each feature publishes a small public API. Product features may depend on shared contracts and design-system primitives. Shared modules must not import product features.

## Alternatives

- Keep a technical folder structure and allow deep imports.
- Place all reusable code in a global shared directory.
- Create package workspaces before module ownership is stable.

## Consequences

- Consumers have fewer supported import paths.
- Internal feature refactors do not require application-wide changes.
- Public API changes require explicit migration notes.
- Dependency direction must be checked during review.

## Follow-up

- Add import-boundary automation when the repository needs it.
- Review feature exports before each release.
- Supersede this ADR if the project later adopts package workspaces.
```
</div>

ADR 从 context 推到 decision，再保留 rejected alternatives、consequences 与 follow-up；它没有声称当前项目已经启用 monorepo。Accepted 后若方向改变，应新增 superseding ADR。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/governance/code-review-checklist.md</span>
  </div>

```txt
# SellerHub Frontend Code Review Checklist

## Component and State

- [ ] Component responsibility is narrow and named clearly.
- [ ] State owner is the lowest common owner that needs the value.
- [ ] Derived values are calculated instead of duplicated in state.
- [ ] Effects synchronize external systems and are not used for ordinary calculations.

## Boundaries

- [ ] Feature consumers import from the public API.
- [ ] Shared modules do not import business features.
- [ ] Network DTOs pass runtime validation before adaptation.
- [ ] UI permission checks are not described as server authorization.

## User Experience

- [ ] Interactive controls have accessible names and keyboard behavior.
- [ ] Loading, error, empty, success, and disabled states are explicit.
- [ ] Locale-sensitive numbers, dates, and currency use approved formatters.

## Quality and Risk

- [ ] Tests cover the changed business behavior and failure path.
- [ ] Performance evidence exists for route-cost changes.
- [ ] Logs exclude tokens, passwords, and direct session identifiers.
- [ ] Unsafe HTML and external links pass security review.
- [ ] Feature flags have an owner and cleanup date.
- [ ] Rollback steps are documented before release approval.
```
</div>

Checklist 的每项都对应前面章节机制，不能机械全勾。Review comment 应链接到 source path、test、metric、ADR 或 rollback evidence。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/governance/migration-plan.md</span>
  </div>

```txt
# SellerHub Frontend Architecture Migration Plan

## Goal

Move from cross-feature imports and direct DTO rendering to feature public APIs, adapters, and governed shared modules without a full rewrite.

## Inventory

- Record deep imports between catalog, orders, checkout, and shared modules.
- Record DTO fields consumed directly by React components.
- Record duplicate buttons, formatters, error handlers, and permission checks.
- Classify each dependency as low, medium, or high risk.

## Compatibility Layer

- Publish public APIs while existing deep imports still work.
- Add DTO-to-domain adapters beside the existing request layer.
- Wrap legacy controls with token-driven primitive components.
- Keep old routes available while new feature entry points are verified.

## Migration Sequence

1. Migrate catalog reads through runtime validation and adapters.
2. Migrate orders imports to the feature public API.
3. Replace duplicate controls with reviewed primitives.
4. Add release flags with owners and cleanup dates.
5. Remove compatibility exports only after quality gates pass.

## Quality Gates

- Lint, typecheck, tests, and production build pass.
- Route performance samples stay within the approved budget.
- Accessibility and security review findings are resolved.
- Error events include release, route, and feature context without secrets.

## Rollback

- Restore the previous feature export for the affected route.
- Disable the release flag for migrated behavior.
- Route API data through the legacy mapper.
- Revert retirement commits independently from compatibility commits.

## Completion Criteria

- No application code deep-imports feature internals.
- React components consume view models instead of raw DTOs.
- Deprecated compatibility exports have no consumers.
- The final release checklist includes migration and rollback evidence.
```
</div>

Plan 把 inventory、compatibility、sequence、gates、rollback 和 completion 连成一个 process。没有 completion criteria 的 migration 会长期停在兼容层；没有 independent rollback 的 migration 会把所有失败绑定在一次大 revert。

**Dashboard 与最终入口：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/sellerhub-production-dashboard.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { CompoundTabDefinition } from './design-system/compound-tabs'
import { CompoundTabs } from './design-system/compound-tabs'
import { PrimitiveButton } from './design-system/primitive-button'
import { catalogFeatureApi } from './features/catalog/catalog-public-api'
import { ordersFeatureApi } from './features/orders/orders-public-api'
import type { SellerOrder } from './features/orders/orders-public-api'
import { isCatalogProductDto } from './shared/api/sellerhub-api-contract'
import {
  evaluateCapability,
  sellerHubFlags,
} from './shared/flags/feature-flags'
import type { SellerPermission } from './shared/flags/feature-flags'
import { sellerHubMessages } from './shared/i18n/messages'
import type { Locale } from './shared/i18n/messages'
import { createErrorReporter } from './shared/observability/error-reporter'
import {
  evaluatePerformanceBudget,
  sellerHubRouteBudget,
} from './shared/performance/performance-budget'
import {
  inspectSecurityBoundaries,
  safeExternalLinkProps,
} from './shared/security/security-boundaries'

const productResponse: unknown = {
  product_id: 'product-901',
  display_name: 'Seller Work Desk',
  price_cents: 24900,
  stock_count: 38,
}

const sellerOrder: SellerOrder = {
  id: 'order-2048',
  totalInCents: 18450,
  placedAt: new Date('2026-06-25T08:30:00.000Z'),
  status: 'packing',
}

const routeSamples = [
  { route: '/catalog', javascriptKb: 164, lcpMs: 2180, inpMs: 165, cls: 0.04 },
  { route: '/seller/orders', javascriptKb: 196, lcpMs: 2720, inpMs: 205, cls: 0.08 },
]

export function SellerHubProductionDashboard() {
  const [activeTabId, setActiveTabId] = useState('architecture')
  const [locale, setLocale] = useState<Locale>('en-US')
  const [role, setRole] = useState<'viewer' | 'seller-admin'>('viewer')
  const [reportRevision, setReportRevision] = useState(0)
  const [errorReporter] = useState(createErrorReporter)
  const messages = sellerHubMessages[locale]
  const permissions: SellerPermission[] =
    role === 'seller-admin'
      ? ['checkout:preview', 'checkout:publish', 'analytics:view']
      : ['checkout:preview']
  const checkoutDecision = evaluateCapability({
    flagKey: 'checkout-v2',
    flags: sellerHubFlags,
    permissions,
    requiredPermission: 'checkout:publish',
  })
  const productViewModel = isCatalogProductDto(productResponse)
    ? catalogFeatureApi.mapProduct(productResponse, locale)
    : null
  const orderViewModel = ordersFeatureApi.toViewModel(sellerOrder, locale)
  const budgetResults = routeSamples.map((sample) =>
    evaluatePerformanceBudget(sample, sellerHubRouteBudget),
  )
  const securityFindings = inspectSecurityBoundaries({
    externalUrl: 'https://seller.example/policy',
    rendersRawHtml: false,
    storesAccessToken: false,
    loggedFields: ['release', 'route', 'feature', 'errorCode'],
  })
  const policyLink = safeExternalLinkProps('https://example.com/seller-policy')
  const errorEvents = errorReporter.getEvents()

  function reportMockError(): void {
    errorReporter.report(new Error('Orders summary unavailable.'), {
      route: '/seller/orders',
      feature: 'orders-summary',
      release: 'sellerhub-2026.06',
      sessionReference: 'anonymous-session',
    })
    setReportRevision((currentRevision) => currentRevision + 1)
  }

  const tabs: CompoundTabDefinition[] = [
    {
      id: 'architecture',
      label: 'Architecture',
      content: (
        <div className="chapter15-grid">
          <article className="chapter15-card">
            <h3>{messages.catalogTitle}</h3>
            {productViewModel ? (
              <>
                <strong>{productViewModel.title}</strong>
                <p>{productViewModel.priceLabel}</p>
                <p>{productViewModel.stockLabel}</p>
                <code>{catalogFeatureApi.productRoute(productViewModel.id)}</code>
              </>
            ) : (
              <p>Catalog contract rejected.</p>
            )}
          </article>
          <article className="chapter15-card">
            <h3>{messages.ordersTitle}</h3>
            <strong>{orderViewModel.id}</strong>
            <p>{orderViewModel.totalLabel}</p>
            <p>
              {orderViewModel.placedLabel} | {orderViewModel.statusLabel}
            </p>
          </article>
          <article className="chapter15-card">
            <h3>Capability boundary</h3>
            <p>{checkoutDecision.reason}</p>
            <strong className={checkoutDecision.visible ? 'chapter15-pass' : 'chapter15-warn'}>
              {checkoutDecision.visible ? 'Publish visible' : 'Publish hidden'}
            </strong>
          </article>
        </div>
      ),
    },
    {
      id: 'operations',
      label: 'Operations',
      content: (
        <div className="chapter15-grid">
          {budgetResults.map((result) => (
            <article className="chapter15-card" key={result.route}>
              <h3>{result.route}</h3>
              <strong className={`chapter15-${result.status}`}>{result.status}</strong>
              <p>
                {result.violations.length === 0
                  ? 'Performance budget passed.'
                  : `Exceeded: ${result.violations.join(', ')}`}
              </p>
            </article>
          ))}
          <article className="chapter15-card" data-report-revision={reportRevision}>
            <h3>Error reports</h3>
            <p>{errorEvents.length} mock event(s)</p>
            <PrimitiveButton onClick={reportMockError}>Report mock error</PrimitiveButton>
            {errorEvents[0] ? (
              <code>
                {errorEvents[0].release} | {errorEvents[0].route} |{' '}
                {errorEvents[0].feature}
              </code>
            ) : null}
          </article>
        </div>
      ),
    },
    {
      id: 'governance',
      label: 'Governance',
      content: (
        <div className="chapter15-grid">
          <article className="chapter15-card">
            <h3>ADR-001</h3>
            <p>Feature public APIs and design-system dependency direction are accepted.</p>
          </article>
          <article className="chapter15-card">
            <h3>Migration</h3>
            <p>Inventory, compatibility, migration, retirement, and rollback are defined.</p>
          </article>
          <article className="chapter15-card">
            <h3>Review gate</h3>
            <p>State, effects, accessibility, tests, performance, and security require evidence.</p>
          </article>
          <article className="chapter15-card">
            <h3>Security findings</h3>
            <p>
              {securityFindings.filter((finding) => finding.status === 'pass').length}/
              {securityFindings.length} checks passed.
            </p>
            {policyLink ? (
              <a className="chapter15-link" {...policyLink}>
                Seller policy
              </a>
            ) : null}
          </article>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="chapter15-actions">
        <label className="chapter15-control">
          Locale
          <select
            onChange={(event) => setLocale(event.currentTarget.value as Locale)}
            value={locale}
          >
            <option value="en-US">en-US</option>
            <option value="en-GB">en-GB</option>
          </select>
        </label>
        <label className="chapter15-control">
          Role
          <select
            onChange={(event) =>
              setRole(event.currentTarget.value as 'viewer' | 'seller-admin')
            }
            value={role}
          >
            <option value="viewer">viewer</option>
            <option value="seller-admin">seller-admin</option>
          </select>
        </label>
        <PrimitiveButton tone="quiet">{messages.releaseTitle}</PrimitiveButton>
      </div>
      <CompoundTabs
        activeId={activeTabId}
        ariaLabel="SellerHub production architecture"
        onChange={setActiveTabId}
        tabs={tabs}
      />
      <p className="chapter15-note">
        UI permission is not server authorization. Metrics and reports are local mock evidence.
      </p>
    </div>
  )
}
```
</div>

Dashboard 的 import graph 是本章架构证据：它依赖 design system、feature public APIs 和 shared capabilities；shared modules 不 import dashboard 或 feature。四个 state cells 分别拥有 tab、locale、role 和 local reporter revision；所有 view models、permission decision、budget results 与 findings 都是当前 render 的 derived values。

点击 report 时，closure 内 reporter 更新 private events array，再通过 `setReportRevision` 请求 React 产生新 snapshot；下一次 render 调用 `getEvents()` 获得 copy 并显示最新 event。直接修改 reporter closure 不会自动通知 React，所以 revision state 是明确的 render signal。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-15-production-frontend-architecture/sellerhub-production-architecture-kit/sellerhub-production-architecture-kit.tsx</span>
  </div>

```tsx
import { SellerHubProductionDashboard } from './sellerhub-production-dashboard'

export function SellerHubProductionArchitectureKit() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">Final project</p>
      <h2>SellerHub Production Architecture Kit</h2>
      <p>
        This local dashboard integrates public APIs, adapters, release controls,
        observability, performance, security, and governance without external services.
      </p>
      <SellerHubProductionDashboard />
    </section>
  )
}
```
</div>

最终入口只负责 composition，不复制 business logic。章节 adapter 再导入这个入口，与前 15 个 panels 一起挂载。

### 12.6 核心执行流程

1. Vite 从 `src/App.tsx` 的 lazy import 建立 Chapter 15 chunk，并加载 chapter adapter。
2. Adapter import 15 个 core panels 和 `SellerHubProductionArchitectureKit`。
3. Dashboard 首次 render 创建四个 React state cells；`createErrorReporter` 只在 state initialization 时执行。
4. Unknown product response 经过 `isCatalogProductDto`；true branch 进入 catalog public API。
5. Catalog API 创建 domain model 和 locale-specific view model；orders public API 独立创建 order view model。
6. Flag evaluator 读取 current role permissions 和 release flag，产生 UI-only capability decision。
7. Budget / security pure functions从 static samples 产生 result objects。
8. Compound tabs 将 current `activeTabId` 映射为一个 visible panel，并维护 focus / ARIA contract。
9. Locale 或 role change 更新对应 state cell；下一次 render 重新派生 messages、view models 和 decisions。
10. Mock error report 更新 closure private array，再用 revision state 通知 React render。

**Runtime、类型与工具链边界：**

- JavaScript runtime 真正创建 DTO、domain、view、decision、event、metric 和 finding objects。
- React 只管理 dashboard state snapshots、event handlers 和 UI commit。
- Browser 提供 event、focus、URL、Intl、Date 与 DOM accessibility tree。
- TypeScript 检查 import / export、object shape、union 与 function signatures；types 在 runtime 擦除。
- Vite 解析 ESM graph 并产生 bundle；它不会自动判断业务 layer direction。
- ESLint、typecheck、tests、build 和 peer review 提供不同证据；当前 helper 不能冒充 CI provider。

### 12.7 运行方式与预期结果

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

访问 `/react/chapter-15` 后，应看到 15 个 core panels 和最终 dashboard。Dashboard 中：

- `en-US` / `en-GB` 改变 catalog spelling、currency 和 date。
- `viewer` 隐藏 publish capability，`seller-admin` 显示它。
- Arrow keys 可在 tabs 间移动 focus 和 selection。
- Report button 增加 local mock error count，并显示 release/route/feature。
- `/catalog` performance sample 为 pass，`/seller/orders` 为 fail。
- Security panel 显示四项本地 findings；页面明确说明这不是 server authorization 或真实监控。

### 12.8 常见错误与可选扩展

**常见错误：**

- Dashboard deep import feature internals：应改为 public API。
- Shared adapter import catalog feature type：即使是 type-only edge，也违反本章 shared → feature direction；view model type 应留在 shared adapter 或由 public API re-export。
- Reporter closure 变了但 UI 不更新：非 React value 的 mutation 不会触发 render，需要显式 state signal 或外部 store integration。
- 把 static metrics 当 field data：必须保留 provenance、window、percentile 和 device segment。
- 用 `as Locale` 接受任意 URL value：应先以 supported locale list 做 runtime validation。
- 只隐藏 button：server mutation 仍需 authorization。

**可选扩展：**

1. 为 dependency evaluator、DTO guard、budget evaluator 和 security helper 增加 Vitest tests。
2. 用现有 test stack 为 compound tabs 增加 role / keyboard behavior tests。
3. 为 route samples 添加 source、capturedAt、deviceClass 和 percentile fields。
4. 增加 ADR supersedes relationship 和 release exception expiry。
5. 在未来真实 SellerHub repo 中评估 import-boundary lint、OpenAPI generator、observability SDK 和 i18n library；当前章不安装。

## 13. 额外速查表

**一句话总结：**

生产级 React 架构通过明确 module/data/UI/security/operations/change boundaries，让每次变更都有 owner、contract、evidence 和 rollback。

### 常用边界速查

| Concern | Input | Owner | Output | Gate |
| --- | --- | --- | --- | --- |
| Design system | tokens + a11y rules | UI platform | primitive / compound API | component review |
| Feature | domain data + intent | product squad | public API | dependency check |
| API | unknown response | data boundary | domain/view model | runtime validation |
| Release | flag + evidence | release owner | enabled capability | cleanup / rollback |
| Observability | runtime event | platform | contextual event | privacy review |
| Performance | route samples | route owner | budget result | CI / monitoring |
| Security | source + sink | security owners | findings / controls | server + client review |
| Migration | inventory + risk | change owner | staged rollout | quality + rollback |

### 相似概念对比

| Concept A | Concept B | Key difference |
| --- | --- | --- |
| Component library | Design System | 后者还包含 tokens、rules、a11y、docs、versioning |
| Feature public API | Barrel export all | 前者缩小 supported surface，后者可能暴露全部 internals |
| DTO | Domain model | transport shape 与 internal business semantics |
| Domain model | View model | business values 与 render-ready strings |
| Feature flag | Permission | release decision 与 user capability |
| UI guard | Authorization | user experience 与 server security |
| Error object | Error event | failure value 与带 operational context 的 report |
| Metric | Budget | observed fact 与 acceptable threshold |
| ADR | Implementation note | decision rationale 与 coding detail |
| Migration | Rewrite | staged compatibility/rollback 与一次性替换 |

### 错误类型速查

| Signal | Likely boundary failure |
| --- | --- |
| Internal file rename changes many features | missing public API |
| Shared helper imports checkout type | dependency inversion |
| JSX reads `price_cents` | DTO leakage |
| Production log cannot identify release | observability context missing |
| Hidden button but API succeeds | authorization missing |
| Flag older than cleanup date | release debt |
| Performance dashboard has no source | unverifiable metric |
| Migration PR cannot be independently reverted | rollback boundary missing |

### 最小模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: boundary record</span>
  </div>

```ts
type BoundaryRecord<Input, Output> = {
  owner: string
  adapt: (input: Input) => Output
  evidence: string[]
  rollback: string
}
```
</div>

这个 template 只用于笔记，不是需要创建的真实文件。它提醒你任何 boundary 都要连接 owner、transformation、evidence 和 rollback。

## 14. 工程迁移与代码审查要点

### Code review questions

- feature 是否只暴露 public API，而不是被其他模块 import 内部文件？
- shared 层是否真的与业务无关，还是偷偷依赖 feature？
- API adapter、error normalization、observability 和 security 边界是否可测试？

### Migration checks

- 先画依赖方向，再移动文件；不要只按文件夹名字重排。
- 把 raw DTO 渲染迁移为 adapter 输出的 view model。
- 为高风险边界补 ADR、review checklist 和迁移计划。

### Production risk signals

- 改一个 DTO 影响十几个组件，说明 adapter 缺失。
- shared 反向 import feature，说明层级边界破裂。
- 线上错误无法定位，检查 observability event 和 normalized error。

## 15. 如何转换成个人笔记

1. 为每个 boundary 画 `owner → input → transformation → output → consumer → gate`。
2. 从真实 source import graph 选一条 edge，解释为什么方向允许或阻止。
3. 用同一 API response 手写 DTO、domain、view model 三列对照。
4. 为一个 flag 记录 owner、targeting、test matrix、cleanup 和 rollback。
5. 用一次真实 PR 模拟 ADR / review checklist / release evidence。
6. 把“我用了某工具”改写成“我解决了哪个 boundary 风险，并用什么 artifact 证明”。

## 16. 必须能回答的问题

1. 为什么 production architecture 不等于复杂目录？
2. Design System 比普通 component library 多了哪些 contract？
3. Primitive、business、feature、page、layout、data components 的 owners 有何不同？
4. Public API 如何降低 refactor blast radius？Barrel export 为什么不一定是 public API？
5. Shared 反向 import feature 会造成什么图结构问题？
6. DTO、domain model、view model 分别服务哪个边界？
7. TypeScript 为什么不能验证 `response.json()`？
8. Generated client 与 runtime validation / error normalization 如何分工？
9. Feature flag 为什么必须有 owner 和 cleanup plan？
10. UI RBAC 为什么不是真正 authorization？
11. Message catalog 和 `Intl` formatter 为什么要分离？
12. Error report 为什么需要 route、feature、release 与 privacy policy？
13. Field Web Vitals、lab metrics、bundle budget 有何区别？
14. React 默认 text rendering 能防什么，不能防什么？
15. 为什么 access token 不应被前端随意持久化到 `localStorage`？
16. Strangler migration 为什么需要 compatibility layer 与 retirement？
17. ADR 为什么必须记录 alternatives 和 consequences？
18. Code review 如何验证 state owner、Effect necessity、a11y、test、performance 和 security？
19. SellerHub 的哪些文件能证明 production architecture，而不是只有页面截图？

## 17. 最终记忆模型

从组件项目到 production system，不是继续增加 abstraction，而是把变化放进清晰边界：

- **UI**：tokens → primitives → compounds → features → pages。
- **Modules**：app → feature → shared，禁止 shared 反向依赖业务。
- **Data**：unknown → runtime validation → DTO → domain → view model。
- **Release**：flag + permission + server authorization + cleanup。
- **Operations**：structured error / metric + route + release + privacy。
- **Quality**：lint + typecheck + test + build + review + measured evidence。
- **Change**：inventory + ADR + compatibility + migration + rollback + retirement。

React 负责根据 current inputs 计算 UI；TypeScript 在 compile time 检查 relationships；JavaScript 和 browser 在 runtime 执行真实对象与平台行为；architecture governance 决定这些 layers 如何长期协作。

## 18. 官方文档阅读清单

### 主要依据

1. [React: Thinking in React](https://react.dev/learn/thinking-in-react)：component decomposition、state ownership 与 data flow。
2. [React: Keeping Components Pure](https://react.dev/learn/keeping-components-pure)：pure render、read-only inputs 与 render boundary。
3. [React: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)：component API、props object 与 composition。
4. [React DOM common components](https://react.dev/reference/react-dom/components/common)：ARIA props、DOM props 与 `dangerouslySetInnerHTML` security boundary。
5. [TypeScript Handbook: Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html)：ES module scope、imports、exports 与 type-only imports。
6. [TypeScript Modules Reference](https://www.typescriptlang.org/docs/handbook/modules/reference)：module resolution 与 type erasure details。
7. [WAI-ARIA APG: Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)：roles、states、relationships 与 keyboard behavior。
8. [MDN: Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)：locale negotiation 与 internationalization constructors。
9. [MDN: Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)：date formatting API。
10. [MDN: PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)：browser performance entry subscription。
11. [web.dev: Web Vitals](https://web.dev/articles/vitals)：current Core Web Vitals、thresholds 与 field/lab distinction。
12. [web.dev: Performance Budgets 101](https://web.dev/articles/performance-budgets-101)：budget types 与 build-process gate。
13. [MDN: `rel="noopener"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener)：new browsing context isolation。
14. [MDN: Content Security Policy implementation](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP)：CSP 与 third-party resource control。
15. [OWASP: Cross Site Scripting Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)：safe sinks、encoding、sanitization 与 framework escape hatches。
16. [OWASP: HTML5 Security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)：local storage、tabnabbing 与 browser security。
17. [OWASP: Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)：structured logging 与 sensitive fields exclusion。
18. [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)：language-agnostic API descriptions、client generation、documentation 与 testing。
19. [OpenFeature: Evaluation Context](https://openfeature.dev/specification/sections/evaluation-context/)：flag targeting context、merging 与 PII considerations。
20. [AWS Prescriptive Guidance: ADR process](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html)：ADR context、decision、consequences、status 与 superseding process。
21. [Vite: Building for Production](https://vite.dev/guide/build)：production build entry、bundle 与 browser target boundary。

### 本地辅助资料与时效说明

- `docs/roadmap/react-mastery-roadmap-zh.md` Phase 12：本章主题和能力矩阵的本地路线依据。
- `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf`：参考 React Maintenance 与 domain-oriented project structure；它不覆盖本章全部 governance 主题。
- `references/books/react/full-stack-react-projects.pdf`：仅辅助观察旧式 full-stack project/security/deployment organization，不作为现代 React 或 production architecture 默认写法。
- 第 11–14 章学习指导：复用 performance evidence、quality gates、server/client boundary、React 19 migration 的本地学习上下文。

本章未安装或验证 Storybook、OpenAPI generator、Sentry、Datadog、LaunchDarkly、i18next、monorepo tooling 或真实 CI provider；这些内容只作为未来生产工具位置说明，不构成本地集成结果。
