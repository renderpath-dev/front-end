# React 第 16 章：SellerHub Capstone、Production Feature Delivery 与 Portfolio Evidence

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
  - [9.1 Capstone scope：从学习练习到可交付 feature slice](#section-9-1)
  - [9.2 Product requirements、user journeys 与 acceptance criteria](#section-9-2)
  - [9.3 Route architecture、URL state 与 page composition](#section-9-3)
  - [9.4 Design system primitives 与 accessible shell](#section-9-4)
  - [9.5 Mock API gateway、DTO contract 与 adapter pipeline](#section-9-5)
  - [9.6 Catalog feature：filter、sort、empty state 与 view model](#section-9-6)
  - [9.7 Product detail feature：resource lifecycle、not-found 与 error state](#section-9-7)
  - [9.8 Cart state architecture：reducer、derived totals 与 persistence boundary](#section-9-8)
  - [9.9 Checkout workflow：form validation、submit lifecycle 与 rollback note](#section-9-9)
  - [9.10 Seller orders workspace：RBAC UI、status mutation 与 optimistic result](#section-9-10)
  - [9.11 App context：locale、release metadata、observability 与 feature flags](#section-9-11)
  - [9.12 Performance、security 与 operational evidence dashboard](#section-9-12)
  - [9.13 Testing strategy：unit、component、integration 与 MSW/user-event boundary](#section-9-13)
  - [9.14 ADR、README、release checklist 与 portfolio evidence](#section-9-14)
  - [9.15 Capstone project 完整代码与工程文档](#section-9-15)
  - [9.16 SellerHub next-step roadmap：从本地 capstone 到真实全栈项目](#section-9-16)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 / 职责 | 真实路径 | 类型 | 位置 |
| --- | --- | --- | --- |
| 学习指导 | `docs/react/chapter-16-sellerhub-capstone/react-chapter-16-learning-guide.md` | 本章文档 | 0-18 |
| 学习首页入口 | `src/App.tsx` | 挂载 adapter | 0 / 8 |
| 项目路线状态 | `README.md` | 路线索引 | 0 / 14 |
| 核心机制 1 | `src/learning/react/chapter-16-sellerhub-capstone/01-capstone-scope/capstone-scope-panel.tsx` | 核心机制真实文件 | 9.1 |
| 核心机制 2 | `src/learning/react/chapter-16-sellerhub-capstone/02-product-requirements/product-requirements-panel.tsx` | 核心机制真实文件 | 9.2 |
| 核心机制 3 | `src/learning/react/chapter-16-sellerhub-capstone/03-route-url-state/route-url-state-panel.tsx` | 核心机制真实文件 | 9.3 |
| 核心机制 4 | `src/learning/react/chapter-16-sellerhub-capstone/04-design-system-shell/design-system-shell-panel.tsx` | 核心机制真实文件 | 9.4 |
| 核心机制 5 | `src/learning/react/chapter-16-sellerhub-capstone/05-api-dto-adapter/api-dto-adapter-panel.tsx` | 核心机制真实文件 | 9.5 |
| 核心机制 6 | `src/learning/react/chapter-16-sellerhub-capstone/06-catalog-feature/catalog-feature-panel.tsx` | 核心机制真实文件 | 9.6 |
| 核心机制 7 | `src/learning/react/chapter-16-sellerhub-capstone/07-product-detail-lifecycle/product-detail-lifecycle-panel.tsx` | 核心机制真实文件 | 9.7 |
| 核心机制 8 | `src/learning/react/chapter-16-sellerhub-capstone/08-cart-reducer-persistence/cart-reducer-persistence-panel.tsx` | 核心机制真实文件 | 9.8 |
| 核心机制 9 | `src/learning/react/chapter-16-sellerhub-capstone/09-checkout-workflow/checkout-workflow-panel.tsx` | 核心机制真实文件 | 9.9 |
| 核心机制 10 | `src/learning/react/chapter-16-sellerhub-capstone/10-seller-orders-rbac/seller-orders-rbac-panel.tsx` | 核心机制真实文件 | 9.10 |
| 核心机制 11 | `src/learning/react/chapter-16-sellerhub-capstone/11-app-context-observability/app-context-observability-panel.tsx` | 核心机制真实文件 | 9.11 |
| 核心机制 12 | `src/learning/react/chapter-16-sellerhub-capstone/12-performance-security-operations/performance-security-operations-panel.tsx` | 核心机制真实文件 | 9.12 |
| 核心机制 13 | `src/learning/react/chapter-16-sellerhub-capstone/13-testing-strategy/testing-strategy-panel.tsx` | 核心机制真实文件 | 9.13 |
| 核心机制 14 | `src/learning/react/chapter-16-sellerhub-capstone/14-documentation-portfolio-evidence/documentation-portfolio-evidence-panel.tsx` | 核心机制真实文件 | 9.14 |
| 核心机制 15 | `src/learning/react/chapter-16-sellerhub-capstone/15-complete-capstone-code/complete-capstone-code-panel.tsx` | 核心机制真实文件 | 9.15 |
| 核心机制 16 | `src/learning/react/chapter-16-sellerhub-capstone/16-next-step-roadmap/sellerhub-next-step-roadmap.tsx` | 核心机制真实文件 | 9.16 |
| 拥有跨 route 的 cart、locale、role、release、flags 与 reporter，并安全同步可用的 browser storage。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-app-context.tsx` | 最终项目真实源码 | 9.15 |
| 声明 Context value contract 与 provider presence guard，避免 consumers 依赖实现细节。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-app-state.ts` | 最终项目真实源码 | 9.15 |
| 把 app Context 与 BrowserRouter 组合成可挂载的 Capstone 根组件。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-capstone-app.tsx` | 最终项目真实源码 | 9.15 |
| 只通过 feature public API 组合 route branch、params 与 nested shell。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-router.tsx` | 最终项目真实源码 | 9.15 |
| 提供 navigation、locale/role controls、release summary 与 Outlet。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-shell.tsx` | 最终项目真实源码 | 9.15 |
| 把 label、control、hint/error message 组织为可访问 field contract。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/design-system/field.tsx` | 最终项目真实源码 | 9.15 |
| 封装 native button semantics、type、disabled 与 visual tone。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/design-system/primitive-button.tsx` | 最终项目真实源码 | 9.15 |
| 用 generic controlled value、ARIA relationship 与键盘移动实现 compound status selector。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/design-system/status-tabs.tsx` | 最终项目真实源码 | 9.15 |
| 集中本地 visual tokens，不导入任何 business feature。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/design-system/tokens.ts` | 最终项目真实源码 | 9.15 |
| 提供确定性的 local async boundary 与 success/not-found/conflict/service outcomes。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/api/mock-sellerhub-gateway.ts` | 最终项目真实源码 | 9.15 |
| 把 transport DTO 创建为 feature-facing view model，并集中 status translation。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/api/sellerhub-adapters.ts` | 最终项目真实源码 | 9.15 |
| 对 unknown product/order/checkout responses 执行 runtime assertion。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/api/sellerhub-dto-contract.ts` | 最终项目真实源码 | 9.15 |
| 把 unknown failure 归一化为 feature 可消费的 kind/code/message。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/errors/normalize-sellerhub-error.ts` | 最终项目真实源码 | 9.15 |
| 声明 role、flags 与 UI permission calculation，并保留 server authorization note。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/flags/feature-flags.ts` | 最终项目真实源码 | 9.15 |
| 通过 Intl 创建 locale-aware currency 与 date strings。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/i18n/formatters.ts` | 最终项目真实源码 | 9.15 |
| 保存本地 message catalog 与受支持 locale union。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/i18n/messages.ts` | 最终项目真实源码 | 9.15 |
| 保存不含敏感 payload 的 route/feature/release error events。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/observability/error-reporter.ts` | 最终项目真实源码 | 9.15 |
| 声明 route-level metric threshold 并提供 pure evaluator。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/performance/performance-budget.ts` | 最终项目真实源码 | 9.15 |
| 把 frontend finding 与仍需 server enforcement 的要求并列。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/security/security-boundaries.ts` | 最终项目真实源码 | 9.15 |
| 定义 exhaustive cart actions、pure reducer、derived totals 与 storage serialization。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/cart/cart-model.ts` | 最终项目真实源码 | 9.15 |
| 渲染 cart lines，dispatch quantity/remove actions，并导航到 checkout。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/cart/cart-panel.tsx` | 最终项目真实源码 | 9.15 |
| 暴露 cart panel 的稳定 feature surface。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/cart/cart-public-api.ts` | 最终项目真实源码 | 9.15 |
| 解析 URL criteria，并纯派生 filtered/sorted product list。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/catalog/catalog-model.ts` | 最终项目真实源码 | 9.15 |
| 连接 URL state、async DTO pipeline、empty/success branches 与 cart intent。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/catalog/catalog-page.tsx` | 最终项目真实源码 | 9.15 |
| 暴露 catalog route surface 与 criteria helpers，阻止 route deep import。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/catalog/catalog-public-api.ts` | 最终项目真实源码 | 9.15 |
| 实现 validation、pending、known conflict、success 与 confirmed clear lifecycle。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/checkout/checkout-form.tsx` | 最终项目真实源码 | 9.15 |
| 声明 controlled values 与 pure field validation。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/checkout/checkout-model.ts` | 最终项目真实源码 | 9.15 |
| 暴露 checkout page 的稳定 feature surface。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/checkout/checkout-public-api.ts` | 最终项目真实源码 | 9.15 |
| 把四份工程文档映射为 reviewer 可见 evidence cards。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/evidence/evidence-page.tsx` | 最终项目真实源码 | 9.15 |
| 暴露 evidence page 的稳定 feature surface。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/evidence/evidence-public-api.ts` | 最终项目真实源码 | 9.15 |
| 展示 route budgets、security findings、feature flags 与 normalized event context。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/operations/operations-page.tsx` | 最终项目真实源码 | 9.15 |
| 暴露 operations page 的稳定 feature surface。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/operations/operations-public-api.ts` | 最终项目真实源码 | 9.15 |
| 暴露 seller orders page 的稳定 feature surface。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/orders/orders-public-api.ts` | 最终项目真实源码 | 9.15 |
| 封装 order gateway、DTO guard 与 adapter pipeline。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/orders/orders-service.ts` | 最终项目真实源码 | 9.15 |
| 实现 filter、permission gate、optimistic projection、confirm 与 rollback。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/orders/seller-orders-page.tsx` | 最终项目真实源码 | 9.15 |
| 根据 route param 管理 loading/success/not-found/error 与 obsolete result cleanup。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/product-detail/product-detail-page.tsx` | 最终项目真实源码 | 9.15 |
| 暴露 product detail page 的稳定 feature surface。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/product-detail/product-detail-public-api.ts` | 最终项目真实源码 | 9.15 |
| 证明 reducer transitions、derived totals 与 Storage contract。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/__tests__/cart-model.test.ts` | 最终项目测试 | 9.15 |
| 通过 label/role/text 验证 field errors、known conflict 与 success。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/__tests__/checkout-form.behavior.test.tsx` | 最终项目测试 | 9.15 |
| 证明 unknown response 必须先通过 guard，错误 shape 会在 runtime 被拒绝。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/__tests__/sellerhub-api-adapter.test.ts` | 最终项目测试 | 9.15 |
| 通过 MemoryRouter 验证 navigation、URL filtering 与 operations reporting。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/__tests__/sellerhub-capstone.integration.test.tsx` | 最终项目测试 | 9.15 |
| 保存 decisions、alternatives、consequences、quality 与 rollback notes。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/docs/architecture-decision-record.md` | 最终项目工程文档 | 9.15 |
| 把能力 claim 映射到 source/test/docs，并记录 honest limitations 与升级路线。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/docs/portfolio-evidence.md` | 最终项目工程文档 | 9.15 |
| 保存 problem、users、journeys、requirements、acceptance、scope 与 mock boundary。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/docs/product-requirements.md` | 最终项目工程文档 | 9.15 |
| 保存自动 gates、manual smoke checks、operations review 与 rollback。 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/docs/release-checklist.md` | 最终项目工程文档 | 9.15 |
| 章节入口或通用样式 | `src/learning/react/chapter-16-sellerhub-capstone/chapter-16-practice-root.tsx` | adapter / shell | 0 / 7 / 14 |
| 章节入口或通用样式 | `src/learning/react/chapter-16-sellerhub-capstone/chapter-16-practice.css` | adapter / shell | 0 / 7 / 14 |
| 章节入口或通用样式 | `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/sellerhub-capstone-app.css` | adapter / shell | 0 / 7 / 14 |

## 0. 文件定位

本章学习指导位于 `docs/react/chapter-16-sellerhub-capstone/react-chapter-16-learning-guide.md`，真实练习根目录位于 `src/learning/react/chapter-16-sellerhub-capstone/`。它和前 15 章同级，不创建外层 `react/` 或 `front-end/react/`。

本章有四种不同结构，不能混为一谈：

1. **当前项目结构**：`src/App.tsx` 负责学习入口选择，Vite、TypeScript、ESLint、Vitest 继续使用根配置。
2. **本章文档结构**：本文件按照 0–18 组织学习模型、机制、错误和证据。
3. **核心机制练习结构**：16 个编号目录分别给一个可运行的证据文件，对应 9.1–9.16。
4. **最终 Capstone 结构**：`sellerhub-capstone-app/` 按 app、design-system、shared、features、tests、docs 分组。

`chapter-16-practice-root.tsx`、`chapter-16-practice.css`、`sellerhub-capstone-app.css` 和 `src/App.tsx` 是入口或通用 shell 文件，只在索引、目录结构和最终清单中定位，不用它们替代核心机制教学。

## 1. 本章解决的问题

前 15 章已经分别学习了 component、state、effect、router、async、testing 和 architecture。Capstone 的问题不是“还能学哪个 API”，而是：

- 如何从 buyer、seller、reviewer 的 user journey 拆出 feature modules；
- 如何给 URL state、local draft、async resource、cart reducer、Context 和 browser storage 选择不同 owner；
- 如何让 `unknown` mock response 经过 DTO guard、adapter 和 normalized error；
- 如何把 permission UI、feature flag、observability、performance、security 与 release evidence 放进同一交付；
- 如何用测试和工程文档证明行为，而不是用截图或简历形容词代替证据。

本章交付的是本地可运行的 frontend slice。它不包含真实 backend、auth、payment、database、monitoring SaaS 或 deployment，因此也不声称具有这些生产能力。

## 2. 前置概念

开始前应能解释：

- JSX attributes 如何成为 component props；
- `useState` snapshot、`useReducer` action 和 Context owner；
- effect 如何同步 mock async boundary，并用 cleanup 忽略过时结果；
- controlled input 的 `value` / `checked` 与 `onChange`；
- loading、error、empty、success 为什么是不同 UI branch；
- route params、search params、navigation 和 `Outlet`；
- TypeScript type 为什么在 runtime 被擦除；
- Vitest、React Testing Library、user-event、jest-dom、MSW 各自的职责；
- feature public API、DTO、view model、design-system primitive 和 ADR 的边界。

## 3. 学习目标

完成后应能：

1. 从 requirements 和 acceptance criteria 推导 route 与 feature ownership。
2. 画出 `mock response -> runtime guard -> DTO -> adapter -> view model -> component` 链路。
3. 区分 URL、component、reducer、Context、browser storage 和 server authority。
4. 实现 catalog、product detail、cart、checkout 和 seller order 主流程。
5. 用 design-system primitive 复用 semantics、focus 和 keyboard contract。
6. 用 unit、component、integration 测试覆盖不同风险。
7. 用 ADR、release checklist 和 portfolio evidence 说明决策与局限。

## 4. 推荐学习顺序

1. 先读 9.1–9.3，确定 scope、journey 和 route ownership。
2. 再读 9.4–9.7，建立 UI primitive 与 runtime data pipeline。
3. 接着读 9.8–9.11，跟踪 cart、form、mutation 和 Context 的状态变化。
4. 然后读 9.12–9.14，把代码声明连接到 gates 与工程文档。
5. 在 9.15 按 module graph 阅读完整项目。
6. 最后用 9.16 判断何时才应该增加真实 server、auth、payment 和 operations。

## 5. 核心术语表

| 术语 | 本章中的精确定义 |
| --- | --- |
| Capstone | 把已有能力按产品流程与工程边界重组的最终交付，不是 demo 合集 |
| user journey | 一个用户从意图到可观察结果的步骤链 |
| acceptance criterion | 可执行或可人工验证的完成条件 |
| feature public API | route 或其他 feature 允许导入的稳定 module surface |
| DTO guard | 对 `unknown` runtime value 做结构检查的 assertion function |
| adapter | 把 DTO 命名和值转换为 feature-facing view model 的纯函数 |
| URL state | 由 browser history 和 search params 持有的可分享状态 |
| optimistic projection | server-like result 未确认前显示的暂时 UI 值 |
| rollback | mutation 失败后恢复 confirmed state |
| normalized error | 跨 feature 使用统一 `kind`、`code`、`message` 的错误对象 |
| operational evidence | budget evaluator、security finding、error event 和 release gate 的可审查结果 |
| portfolio evidence | 可由代码、测试、文档和 gate 复核的能力声明 |

## 6. 底层心智模型

把 SellerHub 看成一条由不同 owner 组成的流水线：

`user intent -> browser URL / event -> React state transition -> mock async boundary -> runtime validation -> adapter -> render branch -> test / release evidence`

各层分工：

- **JavaScript runtime** 创建 object、array、Promise、closure，并执行 reducer、guard、adapter、formatter。
- **React framework** 调用 components，保存 state，调度 render，并在 effect 中同步外部系统。
- **React Router** 监听 browser history，把 pathname、params、search params 映射到 route branch。
- **browser platform** 提供 DOM events、history、`URLSearchParams`、`localStorage`、`Intl`。
- **TypeScript** 在 compile time 检查 props、union、action、DTO 和 event types；它不会验证网络值或授权。
- **mock API** 模拟异步信任边界，但不提供真实 HTTP、durability 或 server authorization。
- **module graph** 限制 route、feature、shared 和 design-system 的依赖方向。
- **quality gates 与 review** 发现编译器无法证明的行为、accessibility、security、performance 和 claim accuracy。

## 7. 推荐目录结构

采用 feature-based 结构，但不是为每个名词建目录。编号目录服务学习复习；`sellerhub-capstone-app/` 服务真实组合；feature 通过 public API 暴露 route surface；shared 不反向 import feature；design-system 不知道业务。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Chapter 16 File Structure</span>
  </div>

```text
├── docs
│   └── react
│       └── chapter-16-sellerhub-capstone
│           └── react-chapter-16-learning-guide.md
├── src
│   ├── learning
│   │   └── react
│   │       └── chapter-16-sellerhub-capstone
│   │           ├── 01-capstone-scope
│   │           │   └── capstone-scope-panel.tsx
│   │           ├── 02-product-requirements
│   │           │   └── product-requirements-panel.tsx
│   │           ├── 03-route-url-state
│   │           │   └── route-url-state-panel.tsx
│   │           ├── 04-design-system-shell
│   │           │   └── design-system-shell-panel.tsx
│   │           ├── 05-api-dto-adapter
│   │           │   └── api-dto-adapter-panel.tsx
│   │           ├── 06-catalog-feature
│   │           │   └── catalog-feature-panel.tsx
│   │           ├── 07-product-detail-lifecycle
│   │           │   └── product-detail-lifecycle-panel.tsx
│   │           ├── 08-cart-reducer-persistence
│   │           │   └── cart-reducer-persistence-panel.tsx
│   │           ├── 09-checkout-workflow
│   │           │   └── checkout-workflow-panel.tsx
│   │           ├── 10-seller-orders-rbac
│   │           │   └── seller-orders-rbac-panel.tsx
│   │           ├── 11-app-context-observability
│   │           │   └── app-context-observability-panel.tsx
│   │           ├── 12-performance-security-operations
│   │           │   └── performance-security-operations-panel.tsx
│   │           ├── 13-testing-strategy
│   │           │   └── testing-strategy-panel.tsx
│   │           ├── 14-documentation-portfolio-evidence
│   │           │   └── documentation-portfolio-evidence-panel.tsx
│   │           ├── 15-complete-capstone-code
│   │           │   └── complete-capstone-code-panel.tsx
│   │           ├── 16-next-step-roadmap
│   │           │   └── sellerhub-next-step-roadmap.tsx
│   │           ├── sellerhub-capstone-app
│   │           │   ├── __tests__
│   │           │   │   ├── cart-model.test.ts
│   │           │   │   ├── checkout-form.behavior.test.tsx
│   │           │   │   ├── sellerhub-api-adapter.test.ts
│   │           │   │   └── sellerhub-capstone.integration.test.tsx
│   │           │   ├── app
│   │           │   │   ├── sellerhub-app-context.tsx
│   │           │   │   ├── sellerhub-app-state.ts
│   │           │   │   ├── sellerhub-capstone-app.tsx
│   │           │   │   ├── sellerhub-router.tsx
│   │           │   │   └── sellerhub-shell.tsx
│   │           │   ├── design-system
│   │           │   │   ├── field.tsx
│   │           │   │   ├── primitive-button.tsx
│   │           │   │   ├── status-tabs.tsx
│   │           │   │   └── tokens.ts
│   │           │   ├── docs
│   │           │   │   ├── architecture-decision-record.md
│   │           │   │   ├── portfolio-evidence.md
│   │           │   │   ├── product-requirements.md
│   │           │   │   └── release-checklist.md
│   │           │   ├── features
│   │           │   │   ├── cart
│   │           │   │   │   ├── cart-model.ts
│   │           │   │   │   ├── cart-panel.tsx
│   │           │   │   │   └── cart-public-api.ts
│   │           │   │   ├── catalog
│   │           │   │   │   ├── catalog-model.ts
│   │           │   │   │   ├── catalog-page.tsx
│   │           │   │   │   └── catalog-public-api.ts
│   │           │   │   ├── checkout
│   │           │   │   │   ├── checkout-form.tsx
│   │           │   │   │   ├── checkout-model.ts
│   │           │   │   │   └── checkout-public-api.ts
│   │           │   │   ├── evidence
│   │           │   │   │   ├── evidence-page.tsx
│   │           │   │   │   └── evidence-public-api.ts
│   │           │   │   ├── operations
│   │           │   │   │   ├── operations-page.tsx
│   │           │   │   │   └── operations-public-api.ts
│   │           │   │   ├── orders
│   │           │   │   │   ├── orders-public-api.ts
│   │           │   │   │   ├── orders-service.ts
│   │           │   │   │   └── seller-orders-page.tsx
│   │           │   │   └── product-detail
│   │           │   │       ├── product-detail-page.tsx
│   │           │   │       └── product-detail-public-api.ts
│   │           │   ├── shared
│   │           │   │   ├── api
│   │           │   │   │   ├── mock-sellerhub-gateway.ts
│   │           │   │   │   ├── sellerhub-adapters.ts
│   │           │   │   │   └── sellerhub-dto-contract.ts
│   │           │   │   ├── errors
│   │           │   │   │   └── normalize-sellerhub-error.ts
│   │           │   │   ├── flags
│   │           │   │   │   └── feature-flags.ts
│   │           │   │   ├── i18n
│   │           │   │   │   ├── formatters.ts
│   │           │   │   │   └── messages.ts
│   │           │   │   ├── observability
│   │           │   │   │   └── error-reporter.ts
│   │           │   │   ├── performance
│   │           │   │   │   └── performance-budget.ts
│   │           │   │   └── security
│   │           │   │       └── security-boundaries.ts
│   │           │   └── sellerhub-capstone-app.css
│   │           ├── chapter-16-practice-root.tsx
│   │           └── chapter-16-practice.css
│   └── App.tsx
└── README.md
```
</div>

为什么不把代码放进一个 `dashboard.tsx`：那会让 URL ownership、DTO validation、cart transitions、permission、tests 和 docs 的 owner 变得不可审查。为什么也不做 monorepo：当前只有一个 Vite client，拆 package 不会产生真实独立发布边界。

## 8. 示例运行方式

先运行开发服务器，再访问 `/react/chapter-16/catalog`。内部 route 包括 catalog、product detail、cart、checkout、seller orders、operations 和 evidence。

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

交付前分别运行四个 gate。它们不是同义命令：lint 检查规则，typecheck 检查静态类型，test 检查行为，build 验证生产 bundling。

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

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Capstone scope：从学习练习到可交付 feature slice

**本节解决的问题：**

Capstone 最常见的失败是把旧 demo 顺序排列，却没有统一产品问题、完成条件和非目标。本节先固定 buyer、seller、reviewer 三类流程，并把真实 backend、auth、payment 和 SaaS 明确放在 scope 外。

**技术意义与边界：**

`capstoneBoundaries` 是普通 JavaScript array；React 只负责把它映射为 UI；TypeScript 检查 tuple shape；review 才能判断描述是否诚实。本节没有新的 React runtime API，重点是项目交付边界、文件组织和可维护性机制。

**新关键字和工程规则：**

`scope`、`non-goal`、`local mock`、`production boundary`。固定规则是每个 production-like 声明都必须同时说明 evidence 和 limitation。

**机制证据链：**

1. reviewer 触发“这是否是生产系统”的问题；
2. module 创建 Product、Runtime、Excluded 三个 boundary tuples；
3. component 用 `map()` 生成带稳定 key 的 evidence cards；
4. TypeScript 能检查 tuple 是 string pair，却不能证明项目真的没有外部服务；
5. 文件审计、dependency audit 和人工 review 防止夸大 claim。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/01-capstone-scope/capstone-scope-panel.tsx</span>
  </div>

```tsx
const capstoneBoundaries = [
  ['Product', 'Catalog, cart, checkout, seller orders, operations, and evidence'],
  ['Runtime', 'Local React client with deterministic mock gateway responses'],
  ['Excluded', 'Real auth, payments, backend persistence, and production telemetry'],
] as const

export function CapstoneScopePanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="capstone-scope-title">
      <p className="chapter16-eyebrow">9.1 Capstone scope</p>
      <h2 id="capstone-scope-title">Define the delivery boundary before coding</h2>
      <div className="chapter16-grid">
        {capstoneBoundaries.map(([label, value]) => (
          <article className="chapter16-card" key={label}>
            <h3>{label}</h3>
            <p>{value}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

模块初始化时 array reference 创建一次。每次 component render 读取同一 array，`map()` 创建新的 React element array；DOM commit 只包含三个静态 card。这里没有 state、route param 或 network value 变化，变化的是 reviewer 对 scope 的可见理解。

**对比、错误与识别：**

错误写法是标题写“production app”，正文却不列 server、auth、payment、deployment 是否存在。识别方法是逐条追问“哪个文件、哪个 test、哪个外部系统证明它”；无法定位就应改成 local model 或 future extension。

**SellerHub、主线与记忆模型：**

前 15 章提供材料，第 16 章用 scope 选择哪些材料进入同一个 product slice。记住：**Capstone 的第一项交付不是代码，而是可验证的边界。**

<a id="section-9-2"></a>

### 9.2 Product requirements、user journeys 与 acceptance criteria

**本节解决的问题：**

“做 catalog、cart、orders”仍是 feature list，不是用户流程。本节把 buyer 从搜索到 checkout、seller 从过滤到 mutation、reviewer 从 operations 到 evidence 的结果写成 acceptance criteria。

**技术意义与边界：**

requirements 属于 documentation / product boundary，不是 React state。React panel 只是让 criteria 可运行地出现在章节页面；真实约束保存在 `product-requirements.md` 并由 tests 和 review 对照。本节没有新的 React runtime API。

**新关键字和固定结构：**

`Problem Statement`、`Target Users`、`User Journeys`、`Functional Requirements`、`Non-Functional Requirements`、`Acceptance Criteria`、`Out of Scope`、`Mock Boundary` 是本项目 requirements 文档的固定 review headings。

**机制证据链：**

1. buyer 输入 catalog query；
2. requirement 把“搜索”转成“URL 必须出现 query 且结果改变”；
3. route/component/test 分别消费同一 criterion；
4. integration assertion 检查 pathname + search 与 visible product；
5. 若 criterion 只有“体验良好”，lint/typecheck/build 都无法发现它不可验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/02-product-requirements/product-requirements-panel.tsx</span>
  </div>

```tsx
const acceptanceCriteria = [
  'Catalog criteria are represented in the URL.',
  'Checkout exposes validation, pending, known error, and success states.',
  'Seller order mutation requires both role permission and a feature flag.',
  'Every release claim points to code, tests, or a review document.',
] as const

export function ProductRequirementsPanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="requirements-title">
      <p className="chapter16-eyebrow">9.2 Product requirements</p>
      <h2 id="requirements-title">Turn user journeys into observable acceptance criteria</h2>
      <ol className="chapter16-list">
        {acceptanceCriteria.map((criterion) => (
          <li key={criterion}>{criterion}</li>
        ))}
      </ol>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

`acceptanceCriteria` module constant 保留四个高风险结果。React render 创建有序列表，顺序表达评审优先级。真实执行时 search param、form state、permission result 和 test assertion 才会变化；本文件不伪造这些状态。

**对比、错误与识别：**

“用户可以下单”太宽；“有效字段提交后显示 order id，known conflict 不清空 cart”才可测试。识别方法是看一句 criterion 能否直接变成 role/label/text/URL assertion。

**SellerHub、主线与记忆模型：**

requirements 把第 6、9、10、12 章连接到一个 journey。记住：**feature name 描述区域，acceptance criterion 描述可观察完成。**

<a id="section-9-3"></a>

### 9.3 Route architecture、URL state 与 page composition

**本节解决的问题：**

catalog query、status、sort 如果只存 component state，刷新、返回和分享都会丢失。本节把 shareable criteria 放进 URL，把 route 组合限制到 feature public API。

**技术意义与边界：**

`URLSearchParams` 是 browser API；`useSearchParams` 是 React Router hook；React component 消费解析后的 plain object；TypeScript 检查 `CatalogSort` 和 `CatalogStatusFilter` union，但 runtime parser 仍要为非法字符串提供 fallback。

**新 API、签名和固定名称：**

`useSearchParams(): [URLSearchParams, SetURLSearchParams]`；固定 keys 为 `query`、`status`、`sort`。`SellerHubRouter` 只 import `*-public-api.ts`，避免 route deep import feature internals。

**机制证据链：**

1. 用户把 search input 改为 `work`；
2. handler 复制当前 `URLSearchParams` 并设置 `query`；
3. React Router navigation 更新 history location；
4. `readCatalogCriteria()` 创建 typed criteria object，React 重新派生 visible products；
5. integration test 同时断言 URL 与 UI，能发现 broken URL state；TypeScript 单独不能。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/03-route-url-state/route-url-state-panel.tsx</span>
  </div>

```tsx
import { readCatalogCriteria } from '../sellerhub-capstone-app/features/catalog/catalog-public-api'

const sampleSearch = new URLSearchParams(
  'query=desk&status=active&sort=price-desc',
)
const sampleCriteria = readCatalogCriteria(sampleSearch)

export function RouteUrlStatePanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="route-state-title">
      <p className="chapter16-eyebrow">9.3 Route and URL state</p>
      <h2 id="route-state-title">Make shareable criteria a router-owned boundary</h2>
      <dl className="chapter16-definition-list">
        <div>
          <dt>URL</dt>
          <dd>?{sampleSearch.toString()}</dd>
        </div>
        <div>
          <dt>Parsed query</dt>
          <dd>{sampleCriteria.query}</dd>
        </div>
        <div>
          <dt>Parsed status</dt>
          <dd>{sampleCriteria.status}</dd>
        </div>
        <div>
          <dt>Parsed sort</dt>
          <dd>{sampleCriteria.sort}</dd>
        </div>
      </dl>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

示例先创建 `URLSearchParams` instance，再读取 query/status/sort。原始 URL object 与解析后的 criteria object 是两个引用；parser 不修改输入。真实页面更新时，每次 navigation 都产生新的 location，React Router 让依赖 location 的 component render。

**对比、错误与识别：**

把 draft shipping address 放 URL 会泄露不应分享的输入；把 catalog filter 只放 local state 会失去可分享性。识别方法是问：“刷新、返回、复制链接后，这个值是否应保留？”

**SellerHub、主线与记忆模型：**

这是第 10 章 URL state 在真实 catalog journey 的落点。记住：**shareable criteria 属于 URL，未提交 draft 属于 component。**

<a id="section-9-4"></a>

### 9.4 Design system primitives 与 accessible shell

**本节解决的问题：**

如果每个 feature 自己写 button、field、status selector，keyboard、focus、disabled 和 error semantics 会分叉。本节用 primitive 和 status tabs 复用 contract。

**技术意义与边界：**

design-system 可以接收 generic props，但不能 import catalog、orders 等业务模块。React 保存当前 selected status；browser 负责 focus movement；WAI-ARIA roles/attributes 描述关系；TypeScript generic 保证 option value 与 `onChange` value 一致。

**新 API、固定属性与签名：**

`role="tablist"`、`role="tab"`、`role="tabpanel"`、`aria-selected`、`aria-controls`、`aria-labelledby`、`tabIndex`；键盘支持 ArrowLeft、ArrowRight、Home、End。`StatusTabs<Value extends string>` 的 `controlsId` 是关联 panel 的固定输入。

**机制证据链：**

1. keyboard user 在 active tab 上按 ArrowRight；
2. event handler 计算 next index，调用 `onChange` 并移动 DOM focus；
3. parent state 变为新 status，React 更新 `aria-selected` 和 panel content；
4. browser/assistive technology 读取 roles 与 relationships；
5. behavior test 或人工 keyboard smoke test 发现 focus contract，TypeScript 只能检查 prop/value shape。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/04-design-system-shell/design-system-shell-panel.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import { PrimitiveButton } from '../sellerhub-capstone-app/design-system/primitive-button'
import { StatusTabs } from '../sellerhub-capstone-app/design-system/status-tabs'

type PreviewStatus = 'ready' | 'review'

const previewOptions = [
  { label: 'Ready', value: 'ready' },
  { label: 'Review', value: 'review' },
] as const

export function DesignSystemShellPanel() {
  const [status, setStatus] = useState<PreviewStatus>('ready')

  return (
    <section className="chapter16-panel" aria-labelledby="design-system-title">
      <p className="chapter16-eyebrow">9.4 Design system shell</p>
      <h2 id="design-system-title">Reuse behavior and semantics through primitives</h2>
      <div className="chapter16-actions">
        <StatusTabs<PreviewStatus>
          controlsId="delivery-status-preview"
          label="Delivery status"
          onChange={setStatus}
          options={previewOptions}
          value={status}
        />
        <PrimitiveButton tone="secondary">Review {status}</PrimitiveButton>
      </div>
      <p
        aria-labelledby={`delivery-status-preview-${status}-tab`}
        id="delivery-status-preview"
        role="tabpanel"
      >
        Current delivery status: {status}
      </p>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

panel 的 `status` snapshot 初始为 `ready`。`StatusTabs` 不拥有业务状态，只通过 callback 请求 parent 更新；render 后 active button `tabIndex=0`，另一个为 `-1`。button primitive 复用 tone 和 focus style。

**对比、错误与识别：**

只有彩色 `<div>` 的 selector 没有 keyboard/role；只加 `role="tab"` 却没有 controlled panel id 也不完整。识别方法是只用键盘走一遍，并检查 active tab、focus、controlled panel 三者是否一致。

**SellerHub、主线与记忆模型：**

Catalog status 与 order status 共用 primitive，但 options 仍属于各 feature。记住：**design system 复用交互 contract，不拥有业务含义。**

<a id="section-9-5"></a>

### 9.5 Mock API gateway、DTO contract 与 adapter pipeline

**本节解决的问题：**

TypeScript annotation 不能让 runtime response 自动可信。即使 gateway 是本地 mock，它仍应模拟外部边界：先返回 `unknown`，再 guard，再 adapter。

**技术意义与边界：**

gateway 控制 async behavior；DTO 描述传输格式；assertion function 执行 runtime checks；adapter 创建 UI 所需 view model；component 不直接知道 `ACTIVE`、`priceInCents` 等 transport detail。

**新语法、签名与固定结构：**

`asserts value is ProductDto` 是 TypeScript assertion signature；`adaptProductDto(dto: ProductDto): ProductViewModel` 是纯转换。pipeline 固定为 `unknown -> assertProductDto -> ProductDto -> adaptProductDto -> ProductViewModel`。

**机制证据链：**

1. catalog effect 调用 mock gateway，Promise resolve 为 `unknown`；
2. guard 用 JavaScript `typeof`、array 和 literal checks 验证；
3. TypeScript 在 guard 返回后把变量 narrow 为 `ProductDto`；
4. adapter trim strings、映射 status、生成 inventory label；
5. unit test 用错误 price type 证明 runtime guard 会失败，防止 DTO leakage。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/05-api-dto-adapter/api-dto-adapter-panel.tsx</span>
  </div>

```tsx
import { adaptProductDto } from '../sellerhub-capstone-app/shared/api/sellerhub-adapters'
import { assertProductDto } from '../sellerhub-capstone-app/shared/api/sellerhub-dto-contract'

const unknownResponse: unknown = {
  id: 'product-evidence',
  name: ' Evidence Lamp ',
  description: ' Runtime validated product ',
  priceInCents: 5200,
  inventoryCount: 4,
  status: 'ACTIVE',
}

assertProductDto(unknownResponse)
const product = adaptProductDto(unknownResponse)

export function ApiDtoAdapterPanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="api-adapter-title">
      <p className="chapter16-eyebrow">9.5 API, DTO, and adapter</p>
      <h2 id="api-adapter-title">Validate unknown runtime data before adaptation</h2>
      <div className="chapter16-flow" aria-label="Data boundary">
        <span>unknown response</span>
        <span>DTO guard</span>
        <span>adapter</span>
        <strong>{product.name}</strong>
      </div>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

`unknownResponse` 起初只能作为 `unknown` 使用。assertion 没有创建新 object，但改变后续 TypeScript control-flow knowledge；adapter 随后创建新的 `product` reference，原 DTO 保持不变。React 最终只读取 view model。

**对比、错误与识别：**

`const response = await gateway() as ProductDto` 只消音，不验证。识别方法是搜索 `as ...Dto`、检查 gateway return type 是否直接信任 response，以及 UI 是否出现大写 transport status。

**SellerHub、主线与记忆模型：**

这是第 9 章 runtime validation 与第 15 章 adapter 的合流。记住：**TypeScript 缩小的是编译器认知，guard 检查的才是 runtime value。**

<a id="section-9-6"></a>

### 9.6 Catalog feature：filter、sort、empty state 与 view model

**本节解决的问题：**

catalog 同时处理 async resource 与 URL criteria。若把 filtered list 存入 state，会产生 source-of-truth duplication；若直接 sort response array，会修改共享输入。

**技术意义与边界：**

resource state 由 page effect 持有，criteria 由 router 持有，visible list 在 render 中由纯函数派生。JavaScript `filter()` 和复制后的 `sort()` 创建新 array；React 用 stable product id 作为 key。

**新规则与固定结构：**

`deriveCatalogProducts(products, criteria)` 不产生 side effect，不更新 state，不修改输入。empty UI 由 `visibleProducts.length === 0` 决定，不另存 `isEmpty`。

**机制证据链：**

1. URL criteria 指定 active + price ascending；
2. parser 创建 criteria，adapter 已创建 product view models；
3. pure derivation 先 filter，再复制 array，再 sort；
4. React 根据结果选择 empty 或 product grid；
5. unit/integration behavior 能发现结果错误，TypeScript 只能保证 criteria 字段和值域。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/06-catalog-feature/catalog-feature-panel.tsx</span>
  </div>

```tsx
import { deriveCatalogProducts } from '../sellerhub-capstone-app/features/catalog/catalog-public-api'
import type { ProductViewModel } from '../sellerhub-capstone-app/shared/api/sellerhub-adapters'

const products: ProductViewModel[] = [
  {
    id: 'desk',
    name: 'Seller Desk',
    description: 'Workspace',
    unitPriceInCents: 32000,
    inventoryLabel: '5 available',
    status: 'active',
  },
  {
    id: 'lamp',
    name: 'Focus Lamp',
    description: 'Task lighting',
    unitPriceInCents: 4500,
    inventoryLabel: '12 available',
    status: 'active',
  },
]

const visibleProducts = deriveCatalogProducts(products, {
  query: '',
  status: 'active',
  sort: 'price-asc',
})

export function CatalogFeaturePanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="catalog-feature-title">
      <p className="chapter16-eyebrow">9.6 Catalog feature</p>
      <h2 id="catalog-feature-title">Keep filtering and sorting pure and reviewable</h2>
      <ol className="chapter16-list">
        {visibleProducts.map((product) => (
          <li key={product.id}>
            {product.name}: {product.unitPriceInCents} cents
          </li>
        ))}
      </ol>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

`products` reference 不变；`filter()` 创建 array A，`slice()` 创建 array B，`sort()` 只修改 B。结果中 lamp 在 desk 前，因为 4500 小于 32000。没有 effect 或额外 state。

**对比、错误与识别：**

`products.sort()` 会原地修改输入；effect 中 `setVisibleProducts()` 会引入同步链。识别方法是检查 render 所需值能否由当前 props/state/URL 直接计算，以及 array mutator 是否作用在原引用。

**SellerHub、主线与记忆模型：**

这是第 5 章 list rendering、第 7 章 unnecessary effect 和第 10 章 URL state 的组合。记住：**resource 是 state，criteria 是 URL，visible list 是 derivation。**

<a id="section-9-7"></a>

### 9.7 Product detail feature：resource lifecycle、not-found 与 error state

**本节解决的问题：**

“没有产品”和“服务失败”不能都显示 generic error。route param 变化还可能让旧 Promise 在新 route 后完成。

**技术意义与边界：**

React effect 根据 `productId` 同步 mock external system；cleanup closure 把 `ignore` 改为 true；normalized error 把 404 映射为 not-found，把 5xx 映射为 service error；TypeScript discriminated union 约束 render branches。

**API、固定状态与规则：**

resource union 固定为 `loading | success | not-found | error`。effect dependency 包含 `productId` 和 stable `reportError`。render 期间不发请求。

**机制证据链：**

1. route 从 product A 变为 product B；
2. cleanup 把 A effect closure 的 `ignore` 设为 true；
3. B effect 设置 loading 并发起新 Promise；
4. response 经过 guard/adapter，只有未忽略 closure 可以 set state；
5. route behavior 与 error branch review 能发现 stale result，TypeScript 无法证明 Promise 完成顺序。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/07-product-detail-lifecycle/product-detail-lifecycle-panel.tsx</span>
  </div>

```tsx
const lifecycleStates = [
  ['loading', 'Request criteria are committed and the result is pending.'],
  ['success', 'A validated DTO has been adapted for rendering.'],
  ['not-found', 'The product ID is valid routing state but has no resource.'],
  ['error', 'A normalized service failure can be reported and retried.'],
] as const

export function ProductDetailLifecyclePanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="product-lifecycle-title">
      <p className="chapter16-eyebrow">9.7 Product detail lifecycle</p>
      <h2 id="product-lifecycle-title">Model resource states as distinct UI branches</h2>
      <div className="chapter16-grid">
        {lifecycleStates.map(([state, meaning]) => (
          <article className="chapter16-card" key={state}>
            <h3>{state}</h3>
            <p>{meaning}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

证据文件列出四个 lifecycle meanings；真实实现见 9.15 的 `product-detail-page.tsx`。每个 state 是互斥 render branch，不同时保存 `isLoading`、`error`、`product` 三个可能冲突的 booleans/values。

**对比、错误与识别：**

`if (!product) return <Error />` 混淆尚未加载、404 和 invalid DTO。识别方法是列出每个 resource outcome，检查是否有两个 outcome 会落进同一含糊 branch。

**SellerHub、主线与记忆模型：**

第 9 章 async lifecycle 在 route param 上运行。记住：**route param 是 request criteria；resource union 是已知 lifecycle；cleanup 阻止 obsolete commit。**

<a id="section-9-8"></a>

### 9.8 Cart state architecture：reducer、derived totals 与 persistence boundary

**本节解决的问题：**

cart 有 add/remove/quantity/clear 多种 transition。直接修改 line 或额外保存 total 会造成 lost update 和 stale derived state；`localStorage` 又可能在某些 runtime 不可用。

**技术意义与边界：**

reducer 是 pure JavaScript function；React `useReducer` 保存 snapshot 和 dispatch queue；summary 是 render derivation；effect 把 confirmed client snapshot 同步到 browser storage；storage 不是 server authority。

**API、action 与固定签名：**

`cartReducer(state: CartState, action: CartAction): CartState`；action types 为 `product-added`、`quantity-updated`、`product-removed`、`cart-cleared`。default 分支调用 `assertNever`，新增 action 未处理时 typecheck 失败。

**机制证据链：**

1. user dispatch `product-added`；
2. React 队列保存 action，在下一次 render 调用 reducer；
3. reducer 创建新 state/line references，summary reduce 得到 itemCount/total；
4. commit 后 effect 尝试写 storage；
5. reducer unit test 发现 mutation/total 错误，storage fake 发现 serialization contract；server 仍必须重算真实价格。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/08-cart-reducer-persistence/cart-reducer-persistence-panel.tsx</span>
  </div>

```tsx
import { useReducer } from 'react'
import { PrimitiveButton } from '../sellerhub-capstone-app/design-system/primitive-button'
import {
  cartReducer,
  deriveCartSummary,
  emptyCartState,
} from '../sellerhub-capstone-app/features/cart/cart-model'

export function CartReducerPersistencePanel() {
  const [cart, dispatch] = useReducer(cartReducer, emptyCartState)
  const summary = deriveCartSummary(cart)

  return (
    <section className="chapter16-panel" aria-labelledby="cart-reducer-title">
      <p className="chapter16-eyebrow">9.8 Cart reducer and persistence</p>
      <h2 id="cart-reducer-title">Separate transitions, derivation, and browser storage</h2>
      <p>
        Snapshot: {summary.itemCount} items, {summary.subtotalInCents} cents
      </p>
      <div className="chapter16-actions">
        <PrimitiveButton
          onClick={() =>
            dispatch({
              type: 'product-added',
              line: {
                productId: 'evidence-lamp',
                name: 'Evidence Lamp',
                unitPriceInCents: 5200,
              },
            })
          }
        >
          Dispatch product-added
        </PrimitiveButton>
        <PrimitiveButton
          onClick={() => dispatch({ type: 'cart-cleared' })}
          tone="secondary"
        >
          Clear snapshot
        </PrimitiveButton>
      </div>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

初始 `cart.lines` 是空 array。第一次 dispatch 产生新 cart object、新 lines array 和 line object；再次 add 同 product 时只替换对应 line。`deriveCartSummary` 每次从当前 snapshot 归约，不保存重复 total state。

**对比、错误与识别：**

`state.lines.push()` 破坏旧 snapshot；把 `totalInCents` 同时存在 state 会要求所有 action 同步更新两个来源。识别方法是检查 reducer 是否返回新引用，以及某字段是否能完全由其他 state 推导。

**SellerHub、主线与记忆模型：**

第 4、8 章 state 机制在 checkout 前形成共享业务模型。记住：**reducer 描述 transition，derivation 描述结果，storage 只做 best-effort persistence。**

<a id="section-9-9"></a>

### 9.9 Checkout workflow：form validation、submit lifecycle 与 rollback note

**本节解决的问题：**

field error、submit pending、known business conflict 和 unexpected exception 是不同反馈。全部塞进一个 `error` string 会失去修正路径。

**技术意义与边界：**

controlled values 属于 component state；browser submit event 先被 `preventDefault()`；validation 是 pure JavaScript；mock gateway 产生 async result；normalized error 区分 conflict；cart 只在 confirmed success 后清空，因此 failure 自然保留 rollback input。

**API、固定字段与结果：**

`CheckoutValues` 固定为 `email`、`shippingAddress`、`acceptTerms`。submit state 为 `idle | pending | error | success`。text input 使用 `value`，checkbox 使用 `checked`，两者都同步 `onChange`。

**机制证据链：**

1. user submit empty form；
2. handler 读取本次 render closure 中的 values snapshot；
3. validator 创建 errors object，存在 key 时不调用 gateway；
4. valid submit 进入 pending，known conflict 进入 error 且 cart 不变，success 才 clear cart；
5. user-event test 从 label/role/text 验证全过程，不读取 internal state。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/09-checkout-workflow/checkout-workflow-panel.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import { PrimitiveButton } from '../sellerhub-capstone-app/design-system/primitive-button'
import {
  emptyCheckoutValues,
  validateCheckoutValues,
} from '../sellerhub-capstone-app/features/checkout/checkout-model'

export function CheckoutWorkflowPanel() {
  const [validationCount, setValidationCount] = useState(0)

  return (
    <section className="chapter16-panel" aria-labelledby="checkout-workflow-title">
      <p className="chapter16-eyebrow">9.9 Checkout workflow</p>
      <h2 id="checkout-workflow-title">Treat validation and submission as separate phases</h2>
      <p>{validationCount} validation errors in the empty form snapshot.</p>
      <PrimitiveButton
        onClick={() =>
          setValidationCount(Object.keys(validateCheckoutValues(emptyCheckoutValues)).length)
        }
      >
        Validate snapshot
      </PrimitiveButton>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

证据 panel 对 empty values 执行 pure validator，得到三个 keys。真实 form 每次 keystroke 创建新 values object；submit closure 捕获该次 render 的 object；Promise pending 时 button disabled；resolve 后 result union 改变 render branch。

**对比、错误与识别：**

catch 所有错误并显示“Something went wrong”会把可修复 business conflict 当系统故障；成功前清 cart 会导致失败后丢失 intent。识别方法是列出 validation、known conflict、unexpected failure、success 各自的 owner 和 recovery。

**SellerHub、主线与记忆模型：**

这是第 6 章 forms、第 9 章 async 和第 14 章 action-like lifecycle 的组合。记住：**validate before action，pending during action，confirm before destructive local update。**

<a id="section-9-10"></a>

### 9.10 Seller orders workspace：RBAC UI、status mutation 与 optimistic result

**本节解决的问题：**

seller 希望立即看到 status 变化，但 mutation 可能失败；同时 UI permission 不能被误解为 server authorization。

**技术意义与边界：**

`canUpdateOrderStatus(role, flags)` 只决定 UI availability。component 保存 confirmed orders 与 pending id，先写 optimistic projection，再用 gateway result confirm 或用 previous reference rollback。真实 server 必须独立授权。

**固定对象与工程规则：**

role union 为 `buyer | seller | viewer`；mutation 需要 `role === 'seller' && flags.sellerOrderMutation`。feature flag 必须有 owner、test matrix 和 cleanup decision。

**机制证据链：**

1. seller 点击 `Mark shipped`；
2. handler 保存 `previousOrders` reference，并创建 status=shipped 的新 optimistic array；
3. React render 立即显示 shipped/pending；
4. gateway success 用 adapted confirmed order 替换；failure 恢复 previous array 并 report normalized event；
5. behavior/review 能发现 rollback 与 permission illusion；TypeScript 不能证明 server 已授权。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/10-seller-orders-rbac/seller-orders-rbac-panel.tsx</span>
  </div>

```tsx
import { canUpdateOrderStatus } from '../sellerhub-capstone-app/shared/flags/feature-flags'
import type { SellerHubRole } from '../sellerhub-capstone-app/shared/flags/feature-flags'

const roles: SellerHubRole[] = ['buyer', 'seller', 'viewer']
const flags = { sellerOrderMutation: true, operationsPanel: true }

export function SellerOrdersRbacPanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="seller-orders-rbac-title">
      <p className="chapter16-eyebrow">9.10 Seller orders and RBAC</p>
      <h2 id="seller-orders-rbac-title">
        Combine permission, release flag, optimistic projection, and rollback
      </h2>
      <ul className="chapter16-list">
        {roles.map((role) => (
          <li key={role}>
            {role}: {canUpdateOrderStatus(role, flags) ? 'mutation enabled' : 'read only'}
          </li>
        ))}
      </ul>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

证据文件对三个 roles 运行同一 permission function；只有 seller 得到 true。真实 mutation 中 previous 与 optimistic array 是不同引用，rollback 恢复 confirmed reference；pending id 只控制对应 order buttons。

**对比、错误与识别：**

隐藏 button 不等于授权；直接改 `order.status` 会污染 rollback snapshot。识别方法是从浏览器 devtools 假设任意请求都可伪造，并检查 mutation 前是否保存未修改的 confirmed value。

**SellerHub、主线与记忆模型：**

连接第 8 章 ownership、第 14 章 optimistic model 和第 15 章 RBAC/flag。记住：**UI gate 改善体验，server gate 才建立权限；optimistic value 是暂时投影。**

<a id="section-9-11"></a>

### 9.11 App context：locale、release metadata、observability 与 feature flags

**本节解决的问题：**

locale、role、release、flags、reporter 与 shared cart 需要跨 route；但把 catalog criteria 和 form draft 也放 Context 会扩大 rerender 与隐藏 owner。

**技术意义与边界：**

Context 提供 app-wide value；custom hook 检查 provider presence；`Intl` 属于 JavaScript/browser internationalization；reporter 是 local in-memory service；event 必须包含 route、feature、release、privacy，不能记录 form values。

**API、固定 event 与规则：**

`useContext` 读取最近 provider。`SellerHubErrorEvent` 固定包含 `route`、`feature`、`release`、`privacy`、`kind`、`code`、`occurredAt`。`privacy` 固定为 `no-sensitive-payload`。

**机制证据链：**

1. checkout normalizes conflict 并调用 `reportError('checkout', error)`；
2. app wrapper 读取 browser pathname，补 release/privacy context；
3. reporter push 一个无敏感字段的新 event；
4. error revision 触发 operations render，panel 读取 event；
5. test/review 检查 context fields，TypeScript 只能限制字段结构，不能保证 message 未含个人信息。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/11-app-context-observability/app-context-observability-panel.tsx</span>
  </div>

```tsx
import { createSellerHubErrorReporter } from '../sellerhub-capstone-app/shared/observability/error-reporter'

const reporter = createSellerHubErrorReporter()
reporter.report(
  {
    feature: 'chapter-evidence',
    privacy: 'no-sensitive-payload',
    release: '16.0.0-local',
    route: '/react/chapter-16/evidence',
  },
  {
    kind: 'service',
    code: 'CAPSTONE_EVIDENCE',
    message: 'Local evidence event',
  },
)

export function AppContextObservabilityPanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="context-observability-title">
      <p className="chapter16-eyebrow">9.11 Context and operations</p>
      <h2 id="context-observability-title">
        Share stable cross-cutting services without hiding feature state
      </h2>
      <p>{reporter.read().length} normalized event is available to the review surface.</p>
      <p>
        Locale, role, release metadata, feature flags, and the reporter belong to the app
        boundary. Catalog criteria remain in the URL.
      </p>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

证据模块创建 reporter closure，内部 `events` array 不暴露 mutation。`report()` push event，`read()` 返回 readonly view。真实 Context 用 revision state 把外部 mutable service 的变化显式连接回 React render。

**对比、错误与识别：**

只 `console.log(error)` 没有 route/release，无法聚合；记录 email/address 会违反 privacy boundary。识别方法是审查 event schema，而不是只看调用次数。

**SellerHub、主线与记忆模型：**

第 8 章 Context 在本章只承载跨 route app concerns。记住：**Context 解决可达性，不自动解决 ownership；observability event 传 context，不传敏感 payload。**

<a id="section-9-12"></a>

### 9.12 Performance、security 与 operational evidence dashboard

**本节解决的问题：**

一张 performance 表或 security checklist 只是声明；没有 route、threshold、observed value、evaluator 和 finding owner，就不能作为 delivery gate。

**技术意义与边界：**

budget evaluator 是 pure function；operations page 渲染 local evidence；security helper 记录 frontend control 与 server requirement。local observed values 不是 field telemetry，UI helper 也不替代 CSP、server validation 或 authorization。

**固定结构与规则：**

budget 包含 `route`、`metric`、`limit`、`observed`、`unit`；finding 包含 `id`、`finding`、`frontendControl`、`serverRequirement`。本章至少审查 safe external link、unsafe HTML、token storage、sensitive logging、server authorization。

**机制证据链：**

1. release review 读取 `/catalog` 和 `/seller/orders` budgets；
2. evaluator 比较 observed <= limit，创建 PASS/FAIL boolean；
3. React operations page 同时呈现 route 和 threshold；
4. reviewer 对 security finding 对照代码与 server note；
5. quality gate 可以阻止本地超标，真实 RUM/penetration test 仍不在 TypeScript 能力内。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/12-performance-security-operations/performance-security-operations-panel.tsx</span>
  </div>

```tsx
import {
  passesPerformanceBudget,
  sellerHubPerformanceBudgets,
} from '../sellerhub-capstone-app/shared/performance/performance-budget'
import { sellerHubSecurityBoundaries } from '../sellerhub-capstone-app/shared/security/security-boundaries'

export function PerformanceSecurityOperationsPanel() {
  const passedBudgets = sellerHubPerformanceBudgets.filter(
    passesPerformanceBudget,
  ).length

  return (
    <section className="chapter16-panel" aria-labelledby="operations-evidence-title">
      <p className="chapter16-eyebrow">9.12 Performance, security, and operations</p>
      <h2 id="operations-evidence-title">Replace production adjectives with thresholds</h2>
      <dl className="chapter16-definition-list">
        <div>
          <dt>Performance</dt>
          <dd>
            {passedBudgets}/{sellerHubPerformanceBudgets.length} local budgets pass
          </dd>
        </div>
        <div>
          <dt>Security</dt>
          <dd>{sellerHubSecurityBoundaries.length} trust boundaries documented</dd>
        </div>
      </dl>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

`filter(passesPerformanceBudget)` 创建 passed budget array，并用 length 生成 summary。security findings 是独立 array；二者没有写 React state，因为它们是当前 release evidence 的静态输入。

**对比、错误与识别：**

“页面很快”没有 metric；“已做 RBAC”若只有 hidden button 是 permission illusion。识别方法是要求 route、number、evaluator、owner 和 server requirement。

**SellerHub、主线与记忆模型：**

第 11、15 章的 performance/security 在最终项目中变成可访问 route。记住：**operational evidence = measurable input + evaluator + visible result + honest boundary。**

<a id="section-9-13"></a>

### 9.13 Testing strategy：unit、component、integration 与 MSW/user-event boundary

**本节解决的问题：**

只测 className 或 internal state 不能证明 journey；全部用 integration 又会让失败难定位。本节按风险选择最窄有效层。

**技术意义与边界：**

Vitest 提供 runner/assertion；Testing Library 查询 rendered DOM；user-event 模拟用户交互；jest-dom 提供语义 assertion；MemoryRouter 控制 test URL。MSW 已安装，但本章 gateway 不发 HTTP，因此不伪造 network handler。

**API 与固定测试文件：**

使用 `describe`、`it`、`expect`、`render`、`screen`、`userEvent.setup()`、`findByRole`。四个固定文件分别覆盖 adapter、cart、checkout、integration。

**机制证据链：**

1. integration test render provider + MemoryRouter + router；
2. mock gateway Promise 触发 loading 后 success；
3. user type `work`，router search params 与 visible list 更新；
4. test query 通过 label/role/text 获取 DOM 并断言 URL/behavior；
5. test 会发现 broken navigation 或 missing feedback，lint/typecheck/build 不会证明这些用户结果。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/13-testing-strategy/testing-strategy-panel.tsx</span>
  </div>

```tsx
const testLayers = [
  ['Unit', 'Adapter and cart reducer invariants'],
  ['Component', 'Checkout validation, pending, error, and success behavior'],
  ['Integration', 'Route navigation, URL filters, operations, and error reporting'],
  ['Quality gates', 'Lint, typecheck, test, and production build'],
] as const

export function TestingStrategyPanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="testing-strategy-title">
      <p className="chapter16-eyebrow">9.13 Testing strategy</p>
      <h2 id="testing-strategy-title">Test risks at the narrowest useful boundary</h2>
      <div className="chapter16-grid">
        {testLayers.map(([layer, evidence]) => (
          <article className="chapter16-card" key={layer}>
            <h3>{layer}</h3>
            <p>{evidence}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

证据 panel 把四层风险映射为可见 cards。真正 tests 在 9.15 完整展示：unit test 不 render React；checkout test 不读 hook state；integration test 用 `LocationProbe` 只观察 router public state。

**对比、错误与识别：**

`expect(component.state.status)` 测 implementation detail；固定 sleep 会造成 flake。识别方法是优先问用户看见、输入、点击、导航和得到什么，并使用 `findBy` 等待可观察结果。

**SellerHub、主线与记忆模型：**

第 12 章工具在这里围绕 capstone risks 排列。记住：**unit 证明规则，component 证明交互，integration 证明边界协作，manual review 补足平台与 claim。**

<a id="section-9-14"></a>

### 9.14 ADR、README、release checklist 与 portfolio evidence

**本节解决的问题：**

代码解释当前行为，但不自动保存当时的 alternatives、tradeoffs、rollback 或 honest limitations。工程文档必须是交付对象，而不是项目完成后的宣传稿。

**技术意义与边界：**

README 负责入口与路线；requirements 负责可验收结果；ADR 负责 decision；release checklist 负责 gate；portfolio evidence 负责 claim-to-evidence mapping。Markdown 不参与 React runtime。

**固定文件与 checklist fields：**

四个真实 docs 文件固定为 `product-requirements.md`、`architecture-decision-record.md`、`release-checklist.md`、`portfolio-evidence.md`。每项 claim 必须指向 source/test/doc，且写明 local/mock/non-production。

**机制证据链：**

1. reviewer 询问“为什么不用 global state library”；
2. ADR 给出 Context/reducer decision、rejected alternatives 和 consequences；
3. release checklist 要求四个 commands 与 manual smoke checks；
4. portfolio table 把 claim 连接到 file/test；
5. review 能发现 exaggerated resume claim；编译器和 test runner 无法判断措辞是否诚实。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/14-documentation-portfolio-evidence/documentation-portfolio-evidence-panel.tsx</span>
  </div>

```tsx
const reviewDocuments = [
  'product-requirements.md',
  'architecture-decision-record.md',
  'release-checklist.md',
  'portfolio-evidence.md',
] as const

export function DocumentationPortfolioEvidencePanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="documentation-evidence-title">
      <p className="chapter16-eyebrow">9.14 Documentation and evidence</p>
      <h2 id="documentation-evidence-title">Make decisions and verification reviewable</h2>
      <ul className="chapter16-list">
        {reviewDocuments.map((document) => (
          <li key={document}>
            <code>sellerhub-capstone-app/docs/{document}</code>
          </li>
        ))}
      </ul>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

panel 只列出真实 review packet 路径；完整文档在 9.15 逐文件展示。文档发生变化时应与 source/test 同一 review，避免 acceptance criteria 与实现漂移。

**对比、错误与识别：**

只有安装步骤的 README 不能替代 PRD/ADR；“deployed production commerce platform”与本地 mock evidence 不匹配。识别方法是逐条把 resume bullet 反向定位到可运行代码、test output 或真实 service。

**SellerHub、主线与记忆模型：**

第 15 章 governance 在这里形成可交付 review packet。记住：**文档的价值是保存 decision、gate 与 limitation，不是重复代码。**

<a id="section-9-15"></a>

### 9.15 Capstone project 完整代码与工程文档

**本节解决的问题：**

前面各节证明单个边界，本节证明它们能通过 module graph 组成一个可运行 journey，同时仍可定位 owner、测试和文档。

**技术意义与边界：**

app 层组合 route 与 Context；feature 通过 public API 暴露 page；shared 提供无 feature 反向依赖的 contract/service；design-system 提供无业务 import 的 primitive；tests 和 docs 与 source 同级成为 release evidence。

**固定执行入口与规则：**

浏览器入口是 `/react/chapter-16/catalog`。入口 adapter 和通用 CSS 已真实存在，但按章节规则不在此展开；下面完整展示所有承载核心机制的 Capstone source、test 和 `.md` 文件。

**机制证据链：**

1. buyer route 进入 catalog，URL criteria 驱动 mock request 与 derived list；
2. DTO guard/adapter 产生 view model，cart dispatch 跨 route 保存 intent；
3. checkout 或 seller mutation 产生 pending/confirmed/rollback；
4. reporter、budget、security 和 docs 把运行结果连接到 release review；
5. lint/typecheck/test/build 与 manual review 分别阻止 module、type、behavior、bundle 和 claim 风险。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/15-complete-capstone-code/complete-capstone-code-panel.tsx</span>
  </div>

```tsx
const deliverySlices = [
  'app and route composition',
  'design-system primitives',
  'runtime DTO guards and adapters',
  'catalog, detail, cart, checkout, and orders',
  'operations and portfolio evidence',
  'unit, behavior, and integration tests',
] as const

export function CompleteCapstoneCodePanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="complete-capstone-title">
      <p className="chapter16-eyebrow">9.15 Complete capstone</p>
      <h2 id="complete-capstone-title">Deliver one coherent feature system</h2>
      <ol className="chapter16-list">
        {deliverySlices.map((slice) => (
          <li key={slice}>{slice}</li>
        ))}
      </ol>
    </section>
  )
}
```
</div>

**核心文件解释：**

证据 panel 列出六个 delivery slices；下面的完整代码按 app -> design-system -> shared -> features -> tests -> docs 排列。阅读时优先追 import direction，而不是按文件长度阅读。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-app-context.tsx</span>
  </div>

```tsx
import { useCallback, useEffect, useReducer, useState } from 'react'
import type { ReactNode } from 'react'
import {
  cartReducer,
  emptyCartState,
  readCartState,
  writeCartState,
} from '../features/cart/cart-model'
import type { CartState } from '../features/cart/cart-model'
import { defaultSellerHubFeatureFlags } from '../shared/flags/feature-flags'
import type { SellerHubRole } from '../shared/flags/feature-flags'
import type { SellerHubLocale } from '../shared/i18n/messages'
import { createSellerHubErrorReporter } from '../shared/observability/error-reporter'
import { SellerHubAppStateContext } from './sellerhub-app-state'

const cartStorageKey = 'sellerhub-capstone-cart'

type SellerHubAppContextProps = {
  children: ReactNode
  initialCart?: CartState
}

function getBrowserStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : (window.localStorage ?? null)
  } catch {
    return null
  }
}

export function SellerHubAppContext({
  children,
  initialCart,
}: SellerHubAppContextProps) {
  const [browserStorage] = useState(getBrowserStorage)
  const [cart, cartDispatch] = useReducer(
    cartReducer,
    initialCart ??
      (browserStorage
        ? readCartState(browserStorage, cartStorageKey)
        : emptyCartState),
  )
  const [locale, setLocale] = useState<SellerHubLocale>('en-US')
  const [role, setRole] = useState<SellerHubRole>('seller')
  const [errorReporter] = useState(createSellerHubErrorReporter)
  const [errorRevision, setErrorRevision] = useState(0)

  useEffect(() => {
    if (browserStorage) {
      writeCartState(browserStorage, cartStorageKey, cart)
    }
  }, [browserStorage, cart])

  const reportError = useCallback(
    (feature: string, error: Parameters<typeof errorReporter.report>[1]) => {
      errorReporter.report(
        {
          feature,
          privacy: 'no-sensitive-payload',
          release: '16.0.0-local',
          route: typeof window === 'undefined' ? 'unknown' : window.location.pathname,
        },
        error,
      )
      setErrorRevision((revision) => revision + 1)
    },
    [errorReporter],
  )

  return (
    <SellerHubAppStateContext
      value={{
        cart,
        cartDispatch,
        errorReporter,
        errorRevision,
        flags: defaultSellerHubFeatureFlags,
        locale,
        release: {
          version: '16.0.0-local',
          releasedAt: '2026-06-28T09:00:00.000Z',
        },
        reportError,
        role,
        setLocale,
        setRole,
      }}
    >
      {children}
    </SellerHubAppStateContext>
  )
}
```
</div>

**文件职责与执行关系：** 拥有跨 route 的 cart、locale、role、release、flags 与 reporter，并安全同步可用的 browser storage。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-app-state.ts</span>
  </div>

```ts
import { createContext, useContext } from 'react'
import type { Dispatch } from 'react'
import type { CartAction, CartState } from '../features/cart/cart-model'
import type {
  SellerHubFeatureFlags,
  SellerHubRole,
} from '../shared/flags/feature-flags'
import type { SellerHubLocale } from '../shared/i18n/messages'
import type {
  SellerHubErrorReporter,
} from '../shared/observability/error-reporter'
import type { SellerHubError } from '../shared/errors/normalize-sellerhub-error'

export type SellerHubAppValue = {
  cart: CartState
  cartDispatch: Dispatch<CartAction>
  errorReporter: SellerHubErrorReporter
  errorRevision: number
  flags: SellerHubFeatureFlags
  locale: SellerHubLocale
  release: {
    version: string
    releasedAt: string
  }
  reportError: (feature: string, error: SellerHubError) => void
  role: SellerHubRole
  setLocale: (locale: SellerHubLocale) => void
  setRole: (role: SellerHubRole) => void
}

export const SellerHubAppStateContext = createContext<SellerHubAppValue | null>(null)

export function useSellerHubApp(): SellerHubAppValue {
  const value = useContext(SellerHubAppStateContext)

  if (!value) {
    throw new Error('useSellerHubApp must be used within SellerHubAppContext')
  }

  return value
}
```
</div>

**文件职责与执行关系：** 声明 Context value contract 与 provider presence guard，避免 consumers 依赖实现细节。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-capstone-app.tsx</span>
  </div>

```tsx
import { BrowserRouter } from 'react-router'
import { SellerHubAppContext } from './sellerhub-app-context'
import { SellerHubRouter } from './sellerhub-router'

export function SellerHubCapstoneApp() {
  return (
    <SellerHubAppContext>
      <BrowserRouter>
        <SellerHubRouter />
      </BrowserRouter>
    </SellerHubAppContext>
  )
}
```
</div>

**文件职责与执行关系：** 把 app Context 与 BrowserRouter 组合成可挂载的 Capstone 根组件。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-router.tsx</span>
  </div>

```tsx
import { Navigate, Route, Routes } from 'react-router'
import { CartPanel } from '../features/cart/cart-public-api'
import { CatalogPage } from '../features/catalog/catalog-public-api'
import { CheckoutForm } from '../features/checkout/checkout-public-api'
import { EvidencePage } from '../features/evidence/evidence-public-api'
import { OperationsPage } from '../features/operations/operations-public-api'
import { SellerOrdersPage } from '../features/orders/orders-public-api'
import { ProductDetailPage } from '../features/product-detail/product-detail-public-api'
import { SellerHubShell } from './sellerhub-shell'

export function SellerHubRouter() {
  return (
    <Routes>
      <Route element={<SellerHubShell />} path="/react/chapter-16">
        <Route index element={<Navigate replace to="catalog" />} />
        <Route element={<CatalogPage />} path="catalog" />
        <Route element={<ProductDetailPage />} path="products/:productId" />
        <Route element={<CartPanel />} path="cart" />
        <Route element={<CheckoutForm />} path="checkout" />
        <Route element={<SellerOrdersPage />} path="seller/orders" />
        <Route element={<OperationsPage />} path="operations" />
        <Route element={<EvidencePage />} path="evidence" />
        <Route element={<Navigate replace to="catalog" />} path="*" />
      </Route>
    </Routes>
  )
}
```
</div>

**文件职责与执行关系：** 只通过 feature public API 组合 route branch、params 与 nested shell。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-shell.tsx</span>
  </div>

```tsx
import { NavLink, Outlet } from 'react-router'
import { useSellerHubApp } from './sellerhub-app-state'
import { deriveCartSummary } from '../features/cart/cart-model'
import { formatReleaseDate } from '../shared/i18n/formatters'
import type { SellerHubLocale } from '../shared/i18n/messages'
import type { SellerHubRole } from '../shared/flags/feature-flags'

const navigationItems = [
  { label: 'Catalog', to: '/react/chapter-16/catalog' },
  { label: 'Cart / Checkout', to: '/react/chapter-16/cart' },
  { label: 'Seller Orders', to: '/react/chapter-16/seller/orders' },
  { label: 'Operations', to: '/react/chapter-16/operations' },
  { label: 'Evidence', to: '/react/chapter-16/evidence' },
] as const

export function SellerHubShell() {
  const {
    cart,
    locale,
    release,
    role,
    setLocale,
    setRole,
  } = useSellerHubApp()
  const cartSummary = deriveCartSummary(cart)

  return (
    <div className="sellerhub-app-shell">
      <header className="sellerhub-app-header">
        <div>
          <p className="sellerhub-eyebrow">React Chapter 16 capstone</p>
          <h1>SellerHub</h1>
          <p>
            Local frontend simulation. No real backend, authentication, payment, or
            production telemetry is connected.
          </p>
        </div>
        <div className="sellerhub-release-summary">
          <strong>{release.version}</strong>
          <span>{formatReleaseDate(release.releasedAt, locale)}</span>
          <span>{cartSummary.itemCount} cart items</span>
        </div>
      </header>

      <nav aria-label="SellerHub capstone" className="sellerhub-navigation">
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            key={item.to}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sellerhub-context-controls">
        <label>
          Locale
          <select
            onChange={(event) => setLocale(event.target.value as SellerHubLocale)}
            value={locale}
          >
            <option value="en-US">en-US</option>
            <option value="en-GB">en-GB</option>
          </select>
        </label>
        <label>
          Role
          <select
            onChange={(event) => setRole(event.target.value as SellerHubRole)}
            value={role}
          >
            <option value="seller">seller</option>
            <option value="buyer">buyer</option>
            <option value="viewer">viewer</option>
          </select>
        </label>
      </div>

      <main className="sellerhub-route-surface">
        <Outlet />
      </main>
    </div>
  )
}
```
</div>

**文件职责与执行关系：** 提供 navigation、locale/role controls、release summary 与 Outlet。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/design-system/field.tsx</span>
  </div>

```tsx
import type { ReactNode } from 'react'

type FieldProps = {
  children: ReactNode
  error?: string
  hint?: string
  htmlFor: string
  label: string
}

export function Field({ children, error, hint, htmlFor, label }: FieldProps) {
  const messageId = `${htmlFor}-message`

  return (
    <div className="sellerhub-field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {(error || hint) && (
        <p
          className={error ? 'sellerhub-field-error' : 'sellerhub-field-hint'}
          id={messageId}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  )
}
```
</div>

**文件职责与执行关系：** 把 label、control、hint/error message 组织为可访问 field contract。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/design-system/primitive-button.tsx</span>
  </div>

```tsx
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type PrimitiveButtonProps = {
  children: ReactNode
  tone?: 'primary' | 'secondary' | 'danger'
} & ButtonHTMLAttributes<HTMLButtonElement>

export function PrimitiveButton({
  children,
  className = '',
  tone = 'primary',
  type = 'button',
  ...buttonProps
}: PrimitiveButtonProps) {
  return (
    <button
      {...buttonProps}
      className={`sellerhub-button sellerhub-button-${tone} ${className}`.trim()}
      type={type}
    >
      {children}
    </button>
  )
}
```
</div>

**文件职责与执行关系：** 封装 native button semantics、type、disabled 与 visual tone。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/design-system/status-tabs.tsx</span>
  </div>

```tsx
import { useRef } from 'react'
import type { KeyboardEvent } from 'react'

export type StatusTabOption<Value extends string> = {
  label: string
  value: Value
}

type StatusTabsProps<Value extends string> = {
  controlsId: string
  label: string
  onChange: (value: Value) => void
  options: readonly StatusTabOption<Value>[]
  value: Value
}

export function StatusTabs<Value extends string>({
  controlsId,
  label,
  onChange,
  options,
  value,
}: StatusTabsProps<Value>) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return
    }

    event.preventDefault()
    const lastIndex = options.length - 1
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? lastIndex
          : event.key === 'ArrowLeft'
            ? (index - 1 + options.length) % options.length
            : (index + 1) % options.length
    const nextOption = options[nextIndex]

    if (nextOption) {
      onChange(nextOption.value)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <div aria-label={label} className="sellerhub-status-tabs" role="tablist">
      {options.map((option, index) => (
        <button
          aria-controls={controlsId}
          aria-selected={option.value === value}
          className="sellerhub-status-tab"
          id={`${controlsId}-${option.value}-tab`}
          key={option.value}
          onClick={() => onChange(option.value)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          ref={(node) => {
            tabRefs.current[index] = node
          }}
          role="tab"
          tabIndex={option.value === value ? 0 : -1}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
```
</div>

**文件职责与执行关系：** 用 generic controlled value、ARIA relationship 与键盘移动实现 compound status selector。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/design-system/tokens.ts</span>
  </div>

```ts
export const sellerHubTokens = {
  color: {
    canvas: '#f4f7f6',
    surface: '#ffffff',
    surfaceMuted: '#edf4f2',
    text: '#17312d',
    textMuted: '#526b67',
    accent: '#0b6b5f',
    accentStrong: '#074d45',
    border: '#c8d9d5',
    danger: '#a4342f',
    warning: '#8a5b00',
  },
  radius: {
    control: '6px',
    panel: '8px',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
  },
} as const
```
</div>

**文件职责与执行关系：** 集中本地 visual tokens，不导入任何 business feature。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/api/mock-sellerhub-gateway.ts</span>
  </div>

```ts
import type {
  CheckoutResultDto,
  OrderDto,
  OrderListDto,
  OrderStatusDto,
  ProductDto,
  ProductListDto,
} from './sellerhub-dto-contract'

export type CheckoutCommand = {
  email: string
  shippingAddress: string
  totalInCents: number
}

const products: ProductDto[] = [
  {
    id: 'product-lamp',
    name: 'Focus Desk Lamp',
    description: 'A compact task light for focused seller operations.',
    priceInCents: 4599,
    inventoryCount: 12,
    status: 'ACTIVE',
  },
  {
    id: 'product-shelf',
    name: 'Archive Shelf',
    description: 'A retired storage unit kept for lifecycle demonstrations.',
    priceInCents: 12900,
    inventoryCount: 0,
    status: 'ARCHIVED',
  },
  {
    id: 'product-desk',
    name: 'Seller Work Desk',
    description: 'A durable workspace for catalog and order operations.',
    priceInCents: 32900,
    inventoryCount: 5,
    status: 'ACTIVE',
  },
]

let orders: OrderDto[] = [
  {
    id: 'order-1042',
    customerName: 'Avery Stone',
    totalInCents: 4599,
    status: 'PAID',
  },
  {
    id: 'order-1043',
    customerName: 'Jordan Lee',
    totalInCents: 32900,
    status: 'PACKING',
  },
]

function wait(duration = 25): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

async function listProducts(): Promise<unknown> {
  await wait()
  const response: ProductListDto = { items: products.map((product) => ({ ...product })) }
  return response
}

async function getProduct(productId: string): Promise<unknown> {
  await wait()

  if (productId === 'service-error') {
    throw { status: 503, code: 'SERVICE_UNAVAILABLE', message: 'Catalog unavailable' }
  }

  const product = products.find((candidate) => candidate.id === productId)

  if (!product) {
    throw { status: 404, code: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
  }

  return { ...product }
}

async function submitCheckout(command: CheckoutCommand): Promise<unknown> {
  await wait()

  if (command.email.toLowerCase() === 'blocked@example.com') {
    throw { status: 409, code: 'CHECKOUT_BLOCKED', message: 'Checkout requires review' }
  }

  const response: CheckoutResultDto = {
    orderId: `order-${orders.length + 1044}`,
    acceptedAt: new Date('2026-06-28T09:00:00.000Z').toISOString(),
  }

  return response
}

async function listOrders(): Promise<unknown> {
  await wait()
  const response: OrderListDto = { items: orders.map((order) => ({ ...order })) }
  return response
}

async function updateOrderStatus(
  orderId: string,
  status: OrderStatusDto,
): Promise<unknown> {
  await wait()

  if (orderId === 'order-failure') {
    throw { status: 409, code: 'ORDER_CONFLICT', message: 'Order changed elsewhere' }
  }

  const order = orders.find((candidate) => candidate.id === orderId)

  if (!order) {
    throw { status: 404, code: 'ORDER_NOT_FOUND', message: 'Order not found' }
  }

  const updatedOrder = { ...order, status }
  orders = orders.map((candidate) => (candidate.id === orderId ? updatedOrder : candidate))
  return { ...updatedOrder }
}

export const mockSellerHubGateway = {
  getProduct,
  listOrders,
  listProducts,
  submitCheckout,
  updateOrderStatus,
}
```
</div>

**文件职责与执行关系：** 提供确定性的 local async boundary 与 success/not-found/conflict/service outcomes。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/api/sellerhub-adapters.ts</span>
  </div>

```ts
import type {
  OrderDto,
  OrderStatusDto,
  ProductDto,
  ProductStatusDto,
} from './sellerhub-dto-contract'

export type ProductStatus = 'active' | 'archived'

export type ProductViewModel = {
  id: string
  name: string
  description: string
  unitPriceInCents: number
  inventoryLabel: string
  status: ProductStatus
}

export type OrderStatus = 'paid' | 'packing' | 'shipped'

export type OrderViewModel = {
  id: string
  customerName: string
  totalInCents: number
  status: OrderStatus
}

const productStatusMap: Record<ProductStatusDto, ProductStatus> = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
}

const orderStatusMap: Record<OrderStatusDto, OrderStatus> = {
  PAID: 'paid',
  PACKING: 'packing',
  SHIPPED: 'shipped',
}

export function adaptProductDto(dto: ProductDto): ProductViewModel {
  return {
    id: dto.id,
    name: dto.name.trim(),
    description: dto.description.trim(),
    unitPriceInCents: dto.priceInCents,
    inventoryLabel:
      dto.inventoryCount === 0 ? 'Out of stock' : `${dto.inventoryCount} available`,
    status: productStatusMap[dto.status],
  }
}

export function adaptOrderDto(dto: OrderDto): OrderViewModel {
  return {
    id: dto.id,
    customerName: dto.customerName.trim(),
    totalInCents: dto.totalInCents,
    status: orderStatusMap[dto.status],
  }
}

export function toOrderStatusDto(status: OrderStatus): OrderStatusDto {
  const statusMap: Record<OrderStatus, OrderStatusDto> = {
    paid: 'PAID',
    packing: 'PACKING',
    shipped: 'SHIPPED',
  }

  return statusMap[status]
}
```
</div>

**文件职责与执行关系：** 把 transport DTO 创建为 feature-facing view model，并集中 status translation。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/api/sellerhub-dto-contract.ts</span>
  </div>

```ts
export type ProductStatusDto = 'ACTIVE' | 'ARCHIVED'

export type ProductDto = {
  id: string
  name: string
  description: string
  priceInCents: number
  inventoryCount: number
  status: ProductStatusDto
}

export type ProductListDto = {
  items: ProductDto[]
}

export type OrderStatusDto = 'PAID' | 'PACKING' | 'SHIPPED'

export type OrderDto = {
  id: string
  customerName: string
  totalInCents: number
  status: OrderStatusDto
}

export type OrderListDto = {
  items: OrderDto[]
}

export type CheckoutResultDto = {
  orderId: string
  acceptedAt: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isProductStatus(value: unknown): value is ProductStatusDto {
  return value === 'ACTIVE' || value === 'ARCHIVED'
}

function isProductDto(value: unknown): value is ProductDto {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.description === 'string' &&
    typeof value.priceInCents === 'number' &&
    typeof value.inventoryCount === 'number' &&
    isProductStatus(value.status)
  )
}

function isOrderStatus(value: unknown): value is OrderStatusDto {
  return value === 'PAID' || value === 'PACKING' || value === 'SHIPPED'
}

function isOrderDto(value: unknown): value is OrderDto {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.customerName === 'string' &&
    typeof value.totalInCents === 'number' &&
    isOrderStatus(value.status)
  )
}

export function assertProductListDto(value: unknown): asserts value is ProductListDto {
  if (!isRecord(value) || !Array.isArray(value.items) || !value.items.every(isProductDto)) {
    throw new Error('Invalid product list response')
  }
}

export function assertProductDto(value: unknown): asserts value is ProductDto {
  if (!isProductDto(value)) {
    throw new Error('Invalid product response')
  }
}

export function assertOrderListDto(value: unknown): asserts value is OrderListDto {
  if (!isRecord(value) || !Array.isArray(value.items) || !value.items.every(isOrderDto)) {
    throw new Error('Invalid order list response')
  }
}

export function assertOrderDto(value: unknown): asserts value is OrderDto {
  if (!isOrderDto(value)) {
    throw new Error('Invalid order response')
  }
}

export function assertCheckoutResultDto(value: unknown): asserts value is CheckoutResultDto {
  if (
    !isRecord(value) ||
    typeof value.orderId !== 'string' ||
    typeof value.acceptedAt !== 'string'
  ) {
    throw new Error('Invalid checkout response')
  }
}
```
</div>

**文件职责与执行关系：** 对 unknown product/order/checkout responses 执行 runtime assertion。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/errors/normalize-sellerhub-error.ts</span>
  </div>

```ts
export type SellerHubError = {
  kind: 'not-found' | 'conflict' | 'service' | 'unknown'
  code: string
  message: string
}

function isErrorRecord(value: unknown): value is {
  status?: unknown
  code?: unknown
  message?: unknown
} {
  return typeof value === 'object' && value !== null
}

export function normalizeSellerHubError(error: unknown): SellerHubError {
  if (isErrorRecord(error)) {
    const status = typeof error.status === 'number' ? error.status : undefined
    const code = typeof error.code === 'string' ? error.code : 'UNKNOWN'
    const message =
      typeof error.message === 'string' ? error.message : 'Unexpected SellerHub error'

    if (status === 404) {
      return { kind: 'not-found', code, message }
    }

    if (status === 409) {
      return { kind: 'conflict', code, message }
    }

    if (status !== undefined && status >= 500) {
      return { kind: 'service', code, message }
    }
  }

  if (error instanceof Error) {
    return { kind: 'unknown', code: 'UNKNOWN', message: error.message }
  }

  return { kind: 'unknown', code: 'UNKNOWN', message: 'Unexpected SellerHub error' }
}
```
</div>

**文件职责与执行关系：** 把 unknown failure 归一化为 feature 可消费的 kind/code/message。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/flags/feature-flags.ts</span>
  </div>

```ts
export type SellerHubRole = 'buyer' | 'seller' | 'viewer'

export type SellerHubFeatureFlags = {
  sellerOrderMutation: boolean
  operationsPanel: boolean
}

export const defaultSellerHubFeatureFlags: SellerHubFeatureFlags = {
  sellerOrderMutation: true,
  operationsPanel: true,
}

export function canUpdateOrderStatus(
  role: SellerHubRole,
  flags: SellerHubFeatureFlags,
): boolean {
  return role === 'seller' && flags.sellerOrderMutation
}
```
</div>

**文件职责与执行关系：** 声明 role、flags 与 UI permission calculation，并保留 server authorization note。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/i18n/formatters.ts</span>
  </div>

```ts
import type { SellerHubLocale } from './messages'

export function formatCurrency(
  amountInCents: number,
  locale: SellerHubLocale,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(amountInCents / 100)
}

export function formatReleaseDate(isoDate: string, locale: SellerHubLocale): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date(isoDate))
}
```
</div>

**文件职责与执行关系：** 通过 Intl 创建 locale-aware currency 与 date strings。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/i18n/messages.ts</span>
  </div>

```ts
export type SellerHubLocale = 'en-US' | 'en-GB'

type SellerHubMessages = {
  catalogTitle: string
  cartTitle: string
  checkoutTitle: string
  ordersTitle: string
}

export const sellerHubMessages: Record<SellerHubLocale, SellerHubMessages> = {
  'en-US': {
    catalogTitle: 'Product catalog',
    cartTitle: 'Shopping cart',
    checkoutTitle: 'Checkout',
    ordersTitle: 'Seller orders',
  },
  'en-GB': {
    catalogTitle: 'Product catalogue',
    cartTitle: 'Shopping basket',
    checkoutTitle: 'Checkout',
    ordersTitle: 'Seller orders',
  },
}
```
</div>

**文件职责与执行关系：** 保存本地 message catalog 与受支持 locale union。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/observability/error-reporter.ts</span>
  </div>

```ts
import type { SellerHubError } from '../errors/normalize-sellerhub-error'

export type SellerHubErrorEvent = {
  code: string
  feature: string
  kind: SellerHubError['kind']
  occurredAt: string
  privacy: 'no-sensitive-payload'
  release: string
  route: string
}

export type SellerHubErrorContext = {
  feature: string
  privacy: SellerHubErrorEvent['privacy']
  release: string
  route: string
}

export type SellerHubErrorReporter = {
  report: (
    context: SellerHubErrorContext,
    error: SellerHubError,
  ) => SellerHubErrorEvent
  read: () => readonly SellerHubErrorEvent[]
}

export function createSellerHubErrorReporter(): SellerHubErrorReporter {
  const events: SellerHubErrorEvent[] = []

  return {
    report(context, error) {
      const event = {
        code: error.code,
        feature: context.feature,
        kind: error.kind,
        occurredAt: new Date('2026-06-28T09:00:00.000Z').toISOString(),
        privacy: context.privacy,
        release: context.release,
        route: context.route,
      }
      events.push(event)
      return event
    },
    read() {
      return events
    },
  }
}
```
</div>

**文件职责与执行关系：** 保存不含敏感 payload 的 route/feature/release error events。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/performance/performance-budget.ts</span>
  </div>

```ts
export type PerformanceBudget = {
  metric: 'initial-js-kb' | 'catalog-interaction-ms' | 'route-chunk-kb'
  limit: number
  observed: number
  route: '/react/chapter-16' | '/react/chapter-16/catalog' | '/react/chapter-16/seller/orders'
  unit: 'KB' | 'ms'
}

export const sellerHubPerformanceBudgets: readonly PerformanceBudget[] = [
  {
    metric: 'initial-js-kb',
    limit: 250,
    observed: 198,
    route: '/react/chapter-16',
    unit: 'KB',
  },
  {
    metric: 'catalog-interaction-ms',
    limit: 100,
    observed: 42,
    route: '/react/chapter-16/catalog',
    unit: 'ms',
  },
  {
    metric: 'route-chunk-kb',
    limit: 80,
    observed: 64,
    route: '/react/chapter-16/seller/orders',
    unit: 'KB',
  },
]

export function passesPerformanceBudget(budget: PerformanceBudget): boolean {
  return budget.observed <= budget.limit
}
```
</div>

**文件职责与执行关系：** 声明 route-level metric threshold 并提供 pure evaluator。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/security/security-boundaries.ts</span>
  </div>

```ts
export type SecurityBoundary = {
  id: string
  frontendControl: string
  finding: 'pass' | 'review'
  serverRequirement: string
}

export const sellerHubSecurityBoundaries: readonly SecurityBoundary[] = [
  {
    id: 'safe-external-link',
    finding: 'pass',
    frontendControl: 'No untrusted external navigation is rendered in this capstone.',
    serverRequirement: 'Validate redirect destinations at the trusted request boundary.',
  },
  {
    id: 'unsafe-html',
    finding: 'pass',
    frontendControl: 'Render text through JSX and do not use dangerouslySetInnerHTML.',
    serverRequirement: 'Sanitize any future rich text before it reaches clients.',
  },
  {
    id: 'token-storage',
    finding: 'review',
    frontendControl: 'Do not store authentication tokens in localStorage.',
    serverRequirement: 'Use an approved session design with secure cookie controls.',
  },
  {
    id: 'sensitive-logging',
    finding: 'pass',
    frontendControl: 'Error events contain codes and context but no form values.',
    serverRequirement: 'Apply central redaction and retention controls.',
  },
  {
    id: 'server-authorization',
    finding: 'review',
    frontendControl: 'Hide unavailable order actions for the active role.',
    serverRequirement: 'Authorize every order mutation independently.',
  },
]
```
</div>

**文件职责与执行关系：** 把 frontend finding 与仍需 server enforcement 的要求并列。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/cart/cart-model.ts</span>
  </div>

```ts
export type CartLine = {
  productId: string
  name: string
  unitPriceInCents: number
  quantity: number
}

export type CartState = {
  lines: CartLine[]
}

export type CartAction =
  | { type: 'product-added'; line: Omit<CartLine, 'quantity'> }
  | { type: 'quantity-updated'; productId: string; quantity: number }
  | { type: 'product-removed'; productId: string }
  | { type: 'cart-cleared' }

export const emptyCartState: CartState = { lines: [] }

function assertNever(value: never): never {
  throw new Error(`Unhandled cart action: ${JSON.stringify(value)}`)
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'product-added': {
      const existingLine = state.lines.find(
        (line) => line.productId === action.line.productId,
      )

      if (existingLine) {
        return {
          lines: state.lines.map((line) =>
            line.productId === action.line.productId
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          ),
        }
      }

      return { lines: [...state.lines, { ...action.line, quantity: 1 }] }
    }
    case 'quantity-updated':
      return {
        lines: state.lines.map((line) =>
          line.productId === action.productId
            ? { ...line, quantity: Math.max(1, action.quantity) }
            : line,
        ),
      }
    case 'product-removed':
      return {
        lines: state.lines.filter((line) => line.productId !== action.productId),
      }
    case 'cart-cleared':
      return emptyCartState
    default:
      return assertNever(action)
  }
}

export function deriveCartSummary(state: CartState) {
  return state.lines.reduce(
    (summary, line) => ({
      itemCount: summary.itemCount + line.quantity,
      subtotalInCents:
        summary.subtotalInCents + line.unitPriceInCents * line.quantity,
    }),
    { itemCount: 0, subtotalInCents: 0 },
  )
}

function isCartState(value: unknown): value is CartState {
  if (typeof value !== 'object' || value === null || !('lines' in value)) {
    return false
  }

  const lines = (value as { lines: unknown }).lines
  return (
    Array.isArray(lines) &&
    lines.every(
      (line) =>
        typeof line === 'object' &&
        line !== null &&
        typeof (line as CartLine).productId === 'string' &&
        typeof (line as CartLine).name === 'string' &&
        typeof (line as CartLine).unitPriceInCents === 'number' &&
        typeof (line as CartLine).quantity === 'number',
    )
  )
}

export function readCartState(storage: Storage, key: string): CartState {
  const storedValue = storage.getItem(key)

  if (!storedValue) {
    return emptyCartState
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue)
    return isCartState(parsedValue) ? parsedValue : emptyCartState
  } catch {
    return emptyCartState
  }
}

export function writeCartState(storage: Storage, key: string, state: CartState): void {
  storage.setItem(key, JSON.stringify(state))
}
```
</div>

**文件职责与执行关系：** 定义 exhaustive cart actions、pure reducer、derived totals 与 storage serialization。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/cart/cart-panel.tsx</span>
  </div>

```tsx
import { Link } from 'react-router'
import { useSellerHubApp } from '../../app/sellerhub-app-state'
import { PrimitiveButton } from '../../design-system/primitive-button'
import { formatCurrency } from '../../shared/i18n/formatters'
import { sellerHubMessages } from '../../shared/i18n/messages'
import { deriveCartSummary } from './cart-model'

export function CartPanel() {
  const { cart, cartDispatch, locale } = useSellerHubApp()
  const summary = deriveCartSummary(cart)

  return (
    <section aria-labelledby="sellerhub-cart-title">
      <div className="sellerhub-section-heading">
        <div>
          <p className="sellerhub-eyebrow">Reducer state</p>
          <h2 id="sellerhub-cart-title">{sellerHubMessages[locale].cartTitle}</h2>
        </div>
        <p>{summary.itemCount} items</p>
      </div>

      {cart.lines.length === 0 ? (
        <div className="sellerhub-route-state">
          <h3>Your cart is empty</h3>
          <Link to="/react/chapter-16/catalog">Browse the catalog</Link>
        </div>
      ) : (
        <>
          <ul className="sellerhub-cart-list">
            {cart.lines.map((line) => (
              <li key={line.productId}>
                <div>
                  <strong>{line.name}</strong>
                  <span>{formatCurrency(line.unitPriceInCents, locale)} each</span>
                </div>
                <label>
                  Quantity
                  <input
                    aria-label={`Quantity for ${line.name}`}
                    min="1"
                    onChange={(event) =>
                      cartDispatch({
                        type: 'quantity-updated',
                        productId: line.productId,
                        quantity: Number(event.target.value),
                      })
                    }
                    type="number"
                    value={line.quantity}
                  />
                </label>
                <PrimitiveButton
                  onClick={() =>
                    cartDispatch({
                      type: 'product-removed',
                      productId: line.productId,
                    })
                  }
                  tone="danger"
                >
                  Remove
                </PrimitiveButton>
              </li>
            ))}
          </ul>
          <div className="sellerhub-cart-summary">
            <span>Subtotal</span>
            <strong>{formatCurrency(summary.subtotalInCents, locale)}</strong>
            <Link className="sellerhub-primary-link" to="/react/chapter-16/checkout">
              Continue to checkout
            </Link>
          </div>
        </>
      )}
    </section>
  )
}
```
</div>

**文件职责与执行关系：** 渲染 cart lines，dispatch quantity/remove actions，并导航到 checkout。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/cart/cart-public-api.ts</span>
  </div>

```ts
export { CartPanel } from './cart-panel'
```
</div>

**文件职责与执行关系：** 暴露 cart panel 的稳定 feature surface。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/catalog/catalog-model.ts</span>
  </div>

```ts
import type {
  ProductStatus,
  ProductViewModel,
} from '../../shared/api/sellerhub-adapters'

export type CatalogStatusFilter = 'all' | ProductStatus
export type CatalogSort = 'name' | 'price-asc' | 'price-desc'

export type CatalogCriteria = {
  query: string
  status: CatalogStatusFilter
  sort: CatalogSort
}

const statusValues: readonly CatalogStatusFilter[] = ['all', 'active', 'archived']
const sortValues: readonly CatalogSort[] = ['name', 'price-asc', 'price-desc']

export function readCatalogCriteria(searchParams: URLSearchParams): CatalogCriteria {
  const status = searchParams.get('status')
  const sort = searchParams.get('sort')

  return {
    query: searchParams.get('query')?.trim() ?? '',
    status: statusValues.includes(status as CatalogStatusFilter)
      ? (status as CatalogStatusFilter)
      : 'all',
    sort: sortValues.includes(sort as CatalogSort) ? (sort as CatalogSort) : 'name',
  }
}

export function deriveCatalogProducts(
  products: readonly ProductViewModel[],
  criteria: CatalogCriteria,
): ProductViewModel[] {
  const normalizedQuery = criteria.query.toLowerCase()

  return products
    .filter((product) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      const matchesStatus =
        criteria.status === 'all' || product.status === criteria.status

      return matchesQuery && matchesStatus
    })
    .slice()
    .sort((left, right) => {
      if (criteria.sort === 'price-asc') {
        return left.unitPriceInCents - right.unitPriceInCents
      }

      if (criteria.sort === 'price-desc') {
        return right.unitPriceInCents - left.unitPriceInCents
      }

      return left.name.localeCompare(right.name)
    })
}
```
</div>

**文件职责与执行关系：** 解析 URL criteria，并纯派生 filtered/sorted product list。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/catalog/catalog-page.tsx</span>
  </div>

```tsx
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { PrimitiveButton } from '../../design-system/primitive-button'
import { Field } from '../../design-system/field'
import { StatusTabs } from '../../design-system/status-tabs'
import {
  adaptProductDto,
} from '../../shared/api/sellerhub-adapters'
import type { ProductViewModel } from '../../shared/api/sellerhub-adapters'
import {
  assertProductListDto,
} from '../../shared/api/sellerhub-dto-contract'
import { mockSellerHubGateway } from '../../shared/api/mock-sellerhub-gateway'
import { normalizeSellerHubError } from '../../shared/errors/normalize-sellerhub-error'
import { formatCurrency } from '../../shared/i18n/formatters'
import { sellerHubMessages } from '../../shared/i18n/messages'
import { useSellerHubApp } from '../../app/sellerhub-app-state'
import {
  deriveCatalogProducts,
  readCatalogCriteria,
} from './catalog-model'
import type { CatalogSort, CatalogStatusFilter } from './catalog-model'

type CatalogResource =
  | { status: 'loading' }
  | { status: 'success'; products: ProductViewModel[] }
  | { status: 'error'; message: string }

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
] as const

export function CatalogPage() {
  const [resource, setResource] = useState<CatalogResource>({ status: 'loading' })
  const [searchParams, setSearchParams] = useSearchParams()
  const { cartDispatch, locale, reportError } = useSellerHubApp()
  const criteria = readCatalogCriteria(searchParams)

  useEffect(() => {
    let ignore = false

    async function loadCatalog() {
      try {
        const response = await mockSellerHubGateway.listProducts()
        assertProductListDto(response)

        if (!ignore) {
          setResource({
            status: 'success',
            products: response.items.map(adaptProductDto),
          })
        }
      } catch (error) {
        if (!ignore) {
          const normalizedError = normalizeSellerHubError(error)
          reportError('catalog', normalizedError)
          setResource({ status: 'error', message: normalizedError.message })
        }
      }
    }

    void loadCatalog()

    return () => {
      ignore = true
    }
  }, [reportError])

  function updateCriteria(key: 'query' | 'sort' | 'status', value: string) {
    const nextParams = new URLSearchParams(searchParams)

    if (!value || value === 'all' || (key === 'sort' && value === 'name')) {
      nextParams.delete(key)
    } else {
      nextParams.set(key, value)
    }

    setSearchParams(nextParams)
  }

  if (resource.status === 'loading') {
    return <p role="status">Loading catalog...</p>
  }

  if (resource.status === 'error') {
    return (
      <section className="sellerhub-route-state" role="alert">
        <h2>Catalog unavailable</h2>
        <p>{resource.message}</p>
      </section>
    )
  }

  const visibleProducts = deriveCatalogProducts(resource.products, criteria)

  return (
    <section aria-labelledby="sellerhub-catalog-title">
      <div className="sellerhub-section-heading">
        <div>
          <p className="sellerhub-eyebrow">Buyer workflow</p>
          <h2 id="sellerhub-catalog-title">
            {sellerHubMessages[locale].catalogTitle}
          </h2>
        </div>
        <p>{visibleProducts.length} matching products</p>
      </div>

      <div className="sellerhub-filter-bar">
        <Field htmlFor="catalog-query" label="Search products">
          <input
            id="catalog-query"
            onChange={(event) => updateCriteria('query', event.target.value)}
            placeholder="Search by name or description"
            type="search"
            value={criteria.query}
          />
        </Field>

        <Field htmlFor="catalog-sort" label="Sort products">
          <select
            id="catalog-sort"
            onChange={(event) =>
              updateCriteria('sort', event.target.value as CatalogSort)
            }
            value={criteria.sort}
          >
            <option value="name">Name</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </Field>

        <StatusTabs<CatalogStatusFilter>
          controlsId="catalog-results"
          label="Product status"
          onChange={(status) => updateCriteria('status', status)}
          options={statusOptions}
          value={criteria.status}
        />
      </div>

      {visibleProducts.length === 0 ? (
        <div className="sellerhub-route-state">
          <h3>No products match</h3>
          <p>Change the URL-backed catalog criteria and try again.</p>
        </div>
      ) : (
        <div
          aria-labelledby={`catalog-results-${criteria.status}-tab`}
          aria-live="polite"
          className="sellerhub-product-grid"
          id="catalog-results"
          role="tabpanel"
        >
          {visibleProducts.map((product) => (
            <article className="sellerhub-card" key={product.id}>
              <div className="sellerhub-card-heading">
                <h3>{product.name}</h3>
                <span className={`sellerhub-status sellerhub-status-${product.status}`}>
                  {product.status}
                </span>
              </div>
              <p>{product.description}</p>
              <strong>{formatCurrency(product.unitPriceInCents, locale)}</strong>
              <small>{product.inventoryLabel}</small>
              <div className="sellerhub-card-actions">
                <Link to={`/react/chapter-16/products/${product.id}`}>View details</Link>
                <PrimitiveButton
                  disabled={product.status === 'archived'}
                  onClick={() =>
                    cartDispatch({
                      type: 'product-added',
                      line: {
                        productId: product.id,
                        name: product.name,
                        unitPriceInCents: product.unitPriceInCents,
                      },
                    })
                  }
                >
                  Add to cart
                </PrimitiveButton>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
```
</div>

**文件职责与执行关系：** 连接 URL state、async DTO pipeline、empty/success branches 与 cart intent。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/catalog/catalog-public-api.ts</span>
  </div>

```ts
export { CatalogPage } from './catalog-page'
export {
  deriveCatalogProducts,
  readCatalogCriteria,
} from './catalog-model'
export type {
  CatalogCriteria,
  CatalogSort,
  CatalogStatusFilter,
} from './catalog-model'
```
</div>

**文件职责与执行关系：** 暴露 catalog route surface 与 criteria helpers，阻止 route deep import。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/checkout/checkout-form.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSellerHubApp } from '../../app/sellerhub-app-state'
import { Field } from '../../design-system/field'
import { PrimitiveButton } from '../../design-system/primitive-button'
import { assertCheckoutResultDto } from '../../shared/api/sellerhub-dto-contract'
import { mockSellerHubGateway } from '../../shared/api/mock-sellerhub-gateway'
import { normalizeSellerHubError } from '../../shared/errors/normalize-sellerhub-error'
import { formatCurrency } from '../../shared/i18n/formatters'
import { sellerHubMessages } from '../../shared/i18n/messages'
import { deriveCartSummary } from '../cart/cart-model'
import {
  emptyCheckoutValues,
  validateCheckoutValues,
} from './checkout-model'
import type { CheckoutErrors, CheckoutValues } from './checkout-model'

type SubmitState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'error'; message: string }
  | { status: 'success'; orderId: string }

export function CheckoutForm() {
  const [values, setValues] = useState<CheckoutValues>(emptyCheckoutValues)
  const [errors, setErrors] = useState<CheckoutErrors>({})
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' })
  const { cart, cartDispatch, locale, reportError } = useSellerHubApp()
  const summary = deriveCartSummary(cart)

  function updateField<Key extends keyof CheckoutValues>(
    field: Key,
    value: CheckoutValues[Key],
  ) {
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateCheckoutValues(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState({ status: 'error', message: 'Resolve the highlighted fields.' })
      return
    }

    setSubmitState({ status: 'pending' })

    try {
      const response = await mockSellerHubGateway.submitCheckout({
        email: values.email,
        shippingAddress: values.shippingAddress,
        totalInCents: summary.subtotalInCents,
      })
      assertCheckoutResultDto(response)
      cartDispatch({ type: 'cart-cleared' })
      setSubmitState({ status: 'success', orderId: response.orderId })
    } catch (error) {
      const normalizedError = normalizeSellerHubError(error)
      reportError('checkout', normalizedError)
      setSubmitState({ status: 'error', message: normalizedError.message })
    }
  }

  if (submitState.status === 'success') {
    return (
      <section className="sellerhub-route-state" role="status">
        <p className="sellerhub-eyebrow">Confirmed result</p>
        <h2>Order accepted</h2>
        <p>Order {submitState.orderId} is ready for the local seller workflow.</p>
      </section>
    )
  }

  return (
    <section aria-labelledby="sellerhub-checkout-title">
      <p className="sellerhub-eyebrow">Controlled form</p>
      <h2 id="sellerhub-checkout-title">
        {sellerHubMessages[locale].checkoutTitle}
      </h2>
      <p>Local demo subtotal: {formatCurrency(summary.subtotalInCents, locale)}</p>

      <form className="sellerhub-form" noValidate onSubmit={handleSubmit}>
        <Field error={errors.email} htmlFor="checkout-email" label="Email">
          <input
            aria-describedby={errors.email ? 'checkout-email-message' : undefined}
            id="checkout-email"
            onChange={(event) => updateField('email', event.target.value)}
            type="email"
            value={values.email}
          />
        </Field>

        <Field
          error={errors.shippingAddress}
          htmlFor="checkout-address"
          label="Shipping address"
        >
          <textarea
            aria-describedby={
              errors.shippingAddress ? 'checkout-address-message' : undefined
            }
            id="checkout-address"
            onChange={(event) =>
              updateField('shippingAddress', event.target.value)
            }
            rows={4}
            value={values.shippingAddress}
          />
        </Field>

        <div className="sellerhub-checkbox-field">
          <label htmlFor="checkout-terms">
            <input
              checked={values.acceptTerms}
              id="checkout-terms"
              onChange={(event) => updateField('acceptTerms', event.target.checked)}
              type="checkbox"
            />
            Accept local demo terms
          </label>
          {errors.acceptTerms && (
            <p className="sellerhub-field-error">{errors.acceptTerms}</p>
          )}
        </div>

        {submitState.status === 'error' && (
          <p className="sellerhub-submit-error" role="alert">
            {submitState.message}
          </p>
        )}

        <PrimitiveButton
          disabled={submitState.status === 'pending' || summary.itemCount === 0}
          type="submit"
        >
          {submitState.status === 'pending' ? 'Submitting...' : 'Place local order'}
        </PrimitiveButton>
      </form>
    </section>
  )
}
```
</div>

**文件职责与执行关系：** 实现 validation、pending、known conflict、success 与 confirmed clear lifecycle。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/checkout/checkout-model.ts</span>
  </div>

```ts
export type CheckoutValues = {
  email: string
  shippingAddress: string
  acceptTerms: boolean
}

export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>

export const emptyCheckoutValues: CheckoutValues = {
  email: '',
  shippingAddress: '',
  acceptTerms: false,
}

export function validateCheckoutValues(values: CheckoutValues): CheckoutErrors {
  const errors: CheckoutErrors = {}

  if (!values.email.includes('@')) {
    errors.email = 'Enter a valid email address.'
  }

  if (values.shippingAddress.trim().length < 10) {
    errors.shippingAddress = 'Enter a complete shipping address.'
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = 'Accept the local demo terms.'
  }

  return errors
}
```
</div>

**文件职责与执行关系：** 声明 controlled values 与 pure field validation。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/checkout/checkout-public-api.ts</span>
  </div>

```ts
export { CheckoutForm } from './checkout-form'
```
</div>

**文件职责与执行关系：** 暴露 checkout page 的稳定 feature surface。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/evidence/evidence-page.tsx</span>
  </div>

```tsx
const evidenceDocuments = [
  {
    path: 'docs/product-requirements.md',
    title: 'Product requirements',
    summary: 'User journeys, acceptance criteria, non-goals, and local mock boundary.',
  },
  {
    path: 'docs/architecture-decision-record.md',
    title: 'Architecture decision record',
    summary: 'Route, contract, state ownership, design-system, and dependency decisions.',
  },
  {
    path: 'docs/release-checklist.md',
    title: 'Release checklist',
    summary: 'Quality gates, manual smoke checks, accessibility, and rollback evidence.',
  },
  {
    path: 'docs/portfolio-evidence.md',
    title: 'Portfolio evidence',
    summary: 'Problem statement, tradeoffs, test evidence, and honest production limits.',
  },
] as const

export function EvidencePage() {
  return (
    <section aria-labelledby="sellerhub-evidence-title">
      <p className="sellerhub-eyebrow">Review packet</p>
      <h2 id="sellerhub-evidence-title">Portfolio evidence</h2>
      <p>
        The capstone is reviewable through code, behavior, tests, decisions, and explicit
        non-production boundaries.
      </p>
      <div className="sellerhub-evidence-grid">
        {evidenceDocuments.map((document) => (
          <article className="sellerhub-card" key={document.path}>
            <h3>{document.title}</h3>
            <p>{document.summary}</p>
            <code>{document.path}</code>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**文件职责与执行关系：** 把四份工程文档映射为 reviewer 可见 evidence cards。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/evidence/evidence-public-api.ts</span>
  </div>

```ts
export { EvidencePage } from './evidence-page'
```
</div>

**文件职责与执行关系：** 暴露 evidence page 的稳定 feature surface。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/operations/operations-page.tsx</span>
  </div>

```tsx
import { useSellerHubApp } from '../../app/sellerhub-app-state'
import { PrimitiveButton } from '../../design-system/primitive-button'
import { normalizeSellerHubError } from '../../shared/errors/normalize-sellerhub-error'
import {
  passesPerformanceBudget,
  sellerHubPerformanceBudgets,
} from '../../shared/performance/performance-budget'
import { sellerHubSecurityBoundaries } from '../../shared/security/security-boundaries'

export function OperationsPage() {
  const {
    errorReporter,
    errorRevision,
    flags,
    release,
    reportError,
  } = useSellerHubApp()
  const events = errorReporter.read()

  return (
    <section aria-labelledby="sellerhub-operations-title">
      <p className="sellerhub-eyebrow">Release evidence</p>
      <h2 id="sellerhub-operations-title">Operations and boundaries</h2>
      <p>
        Release {release.version} keeps performance, security, observability, and flags
        visible as engineering evidence.
      </p>

      <div className="sellerhub-evidence-grid">
        <article className="sellerhub-card">
          <h3>Performance budgets</h3>
          <ul>
            {sellerHubPerformanceBudgets.map((budget) => (
              <li key={budget.metric}>
                <strong>{budget.metric}</strong>
                <span>{budget.route}</span>
                <span>
                  {budget.observed}/{budget.limit} {budget.unit}
                </span>
                <span>{passesPerformanceBudget(budget) ? 'PASS' : 'FAIL'}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="sellerhub-card">
          <h3>Security boundaries</h3>
          <ul>
            {sellerHubSecurityBoundaries.map((boundary) => (
              <li key={boundary.id}>
                <strong>{boundary.id}</strong>
                <span>{boundary.finding.toUpperCase()}</span>
                <span>{boundary.frontendControl}</span>
                <small>{boundary.serverRequirement}</small>
              </li>
            ))}
          </ul>
        </article>

        <article className="sellerhub-card">
          <h3>Observability</h3>
          <p aria-live="polite">
            {events.length} normalized error events, revision {errorRevision}.
          </p>
          {events.at(-1) && (
            <dl className="sellerhub-definition-list">
              <div>
                <dt>Route</dt>
                <dd>{events.at(-1)?.route}</dd>
              </div>
              <div>
                <dt>Feature</dt>
                <dd>{events.at(-1)?.feature}</dd>
              </div>
              <div>
                <dt>Release</dt>
                <dd>{events.at(-1)?.release}</dd>
              </div>
              <div>
                <dt>Privacy</dt>
                <dd>{events.at(-1)?.privacy}</dd>
              </div>
            </dl>
          )}
          <PrimitiveButton
            onClick={() =>
              reportError(
                'operations-smoke-test',
                normalizeSellerHubError({
                  status: 503,
                  code: 'SMOKE_TEST',
                  message: 'Local smoke-test event',
                }),
              )
            }
            tone="secondary"
          >
            Report local smoke event
          </PrimitiveButton>
        </article>

        <article className="sellerhub-card">
          <h3>Feature flags</h3>
          <dl className="sellerhub-definition-list">
            <div>
              <dt>Order mutation</dt>
              <dd>{String(flags.sellerOrderMutation)}</dd>
            </div>
            <div>
              <dt>Operations panel</dt>
              <dd>{String(flags.operationsPanel)}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  )
}
```
</div>

**文件职责与执行关系：** 展示 route budgets、security findings、feature flags 与 normalized event context。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/operations/operations-public-api.ts</span>
  </div>

```ts
export { OperationsPage } from './operations-page'
```
</div>

**文件职责与执行关系：** 暴露 operations page 的稳定 feature surface。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/orders/orders-public-api.ts</span>
  </div>

```ts
export { SellerOrdersPage } from './seller-orders-page'
```
</div>

**文件职责与执行关系：** 暴露 seller orders page 的稳定 feature surface。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/orders/orders-service.ts</span>
  </div>

```ts
import {
  adaptOrderDto,
  toOrderStatusDto,
} from '../../shared/api/sellerhub-adapters'
import type {
  OrderStatus,
  OrderViewModel,
} from '../../shared/api/sellerhub-adapters'
import {
  assertOrderDto,
  assertOrderListDto,
} from '../../shared/api/sellerhub-dto-contract'
import { mockSellerHubGateway } from '../../shared/api/mock-sellerhub-gateway'

export async function loadSellerOrders(): Promise<OrderViewModel[]> {
  const response = await mockSellerHubGateway.listOrders()
  assertOrderListDto(response)
  return response.items.map(adaptOrderDto)
}

export async function changeSellerOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<OrderViewModel> {
  const response = await mockSellerHubGateway.updateOrderStatus(
    orderId,
    toOrderStatusDto(status),
  )
  assertOrderDto(response)
  return adaptOrderDto(response)
}
```
</div>

**文件职责与执行关系：** 封装 order gateway、DTO guard 与 adapter pipeline。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/orders/seller-orders-page.tsx</span>
  </div>

```tsx
import { useEffect, useState } from 'react'
import { useSellerHubApp } from '../../app/sellerhub-app-state'
import { PrimitiveButton } from '../../design-system/primitive-button'
import { StatusTabs } from '../../design-system/status-tabs'
import type {
  OrderStatus,
  OrderViewModel,
} from '../../shared/api/sellerhub-adapters'
import { canUpdateOrderStatus } from '../../shared/flags/feature-flags'
import { normalizeSellerHubError } from '../../shared/errors/normalize-sellerhub-error'
import { formatCurrency } from '../../shared/i18n/formatters'
import { sellerHubMessages } from '../../shared/i18n/messages'
import {
  changeSellerOrderStatus,
  loadSellerOrders,
} from './orders-service'

type OrderFilter = 'all' | OrderStatus

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Packing', value: 'packing' },
  { label: 'Shipped', value: 'shipped' },
] as const

export function SellerOrdersPage() {
  const [orders, setOrders] = useState<OrderViewModel[]>([])
  const [filter, setFilter] = useState<OrderFilter>('all')
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null)
  const [message, setMessage] = useState('Loading orders...')
  const { flags, locale, reportError, role } = useSellerHubApp()
  const canMutate = canUpdateOrderStatus(role, flags)

  useEffect(() => {
    let ignore = false

    loadSellerOrders()
      .then((nextOrders) => {
        if (!ignore) {
          setOrders(nextOrders)
          setMessage('')
        }
      })
      .catch((error: unknown) => {
        if (!ignore) {
          const normalizedError = normalizeSellerHubError(error)
          reportError('seller-orders', normalizedError)
          setMessage(normalizedError.message)
        }
      })

    return () => {
      ignore = true
    }
  }, [reportError])

  async function updateStatus(orderId: string, status: OrderStatus) {
    const previousOrders = orders
    setPendingOrderId(orderId)
    setMessage('Saving optimistic order status...')
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    )

    try {
      const confirmedOrder = await changeSellerOrderStatus(orderId, status)
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId ? confirmedOrder : order,
        ),
      )
      setMessage(`Order ${orderId} confirmed as ${status}.`)
    } catch (error) {
      const normalizedError = normalizeSellerHubError(error)
      setOrders(previousOrders)
      reportError('seller-order-mutation', normalizedError)
      setMessage(`Rollback: ${normalizedError.message}`)
    } finally {
      setPendingOrderId(null)
    }
  }

  const visibleOrders =
    filter === 'all' ? orders : orders.filter((order) => order.status === filter)

  return (
    <section aria-labelledby="sellerhub-orders-title">
      <div className="sellerhub-section-heading">
        <div>
          <p className="sellerhub-eyebrow">Seller workflow</p>
          <h2 id="sellerhub-orders-title">
            {sellerHubMessages[locale].ordersTitle}
          </h2>
        </div>
        <p>Role: {role}</p>
      </div>

      <StatusTabs<OrderFilter>
        controlsId="seller-order-results"
        label="Order status"
        onChange={setFilter}
        options={statusOptions}
        value={filter}
      />

      {message && <p role="status">{message}</p>}

      <div
        aria-labelledby={`seller-order-results-${filter}-tab`}
        className="sellerhub-order-list"
        id="seller-order-results"
        role="tabpanel"
      >
        {visibleOrders.map((order) => (
          <article className="sellerhub-card" key={order.id}>
            <div className="sellerhub-card-heading">
              <h3>{order.id}</h3>
              <span className="sellerhub-status">{order.status}</span>
            </div>
            <p>{order.customerName}</p>
            <strong>{formatCurrency(order.totalInCents, locale)}</strong>
            {canMutate ? (
              <div className="sellerhub-card-actions">
                <PrimitiveButton
                  disabled={pendingOrderId === order.id}
                  onClick={() => void updateStatus(order.id, 'packing')}
                  tone="secondary"
                >
                  Mark packing
                </PrimitiveButton>
                <PrimitiveButton
                  disabled={pendingOrderId === order.id}
                  onClick={() => void updateStatus(order.id, 'shipped')}
                >
                  Mark shipped
                </PrimitiveButton>
              </div>
            ) : (
              <p>Order mutation is unavailable for this role or release.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**文件职责与执行关系：** 实现 filter、permission gate、optimistic projection、confirm 与 rollback。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/product-detail/product-detail-page.tsx</span>
  </div>

```tsx
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useSellerHubApp } from '../../app/sellerhub-app-state'
import { PrimitiveButton } from '../../design-system/primitive-button'
import { adaptProductDto } from '../../shared/api/sellerhub-adapters'
import type { ProductViewModel } from '../../shared/api/sellerhub-adapters'
import { assertProductDto } from '../../shared/api/sellerhub-dto-contract'
import { mockSellerHubGateway } from '../../shared/api/mock-sellerhub-gateway'
import { normalizeSellerHubError } from '../../shared/errors/normalize-sellerhub-error'
import { formatCurrency } from '../../shared/i18n/formatters'

type ProductDetailResource =
  | { status: 'loading' }
  | { status: 'success'; product: ProductViewModel }
  | { status: 'not-found' }
  | { status: 'error'; message: string }

export function ProductDetailPage() {
  const { productId } = useParams()
  const [resource, setResource] = useState<ProductDetailResource>({ status: 'loading' })
  const { cartDispatch, locale, reportError } = useSellerHubApp()

  useEffect(() => {
    let ignore = false

    async function loadProduct() {
      if (!productId) {
        setResource({ status: 'not-found' })
        return
      }

      setResource({ status: 'loading' })

      try {
        const response = await mockSellerHubGateway.getProduct(productId)
        assertProductDto(response)

        if (!ignore) {
          setResource({ status: 'success', product: adaptProductDto(response) })
        }
      } catch (error) {
        if (!ignore) {
          const normalizedError = normalizeSellerHubError(error)

          if (normalizedError.kind === 'not-found') {
            setResource({ status: 'not-found' })
          } else {
            reportError('product-detail', normalizedError)
            setResource({ status: 'error', message: normalizedError.message })
          }
        }
      }
    }

    void loadProduct()

    return () => {
      ignore = true
    }
  }, [productId, reportError])

  if (resource.status === 'loading') {
    return <p role="status">Loading product...</p>
  }

  if (resource.status === 'not-found') {
    return (
      <section className="sellerhub-route-state">
        <h2>Product not found</h2>
        <Link to="/react/chapter-16/catalog">Return to catalog</Link>
      </section>
    )
  }

  if (resource.status === 'error') {
    return (
      <section className="sellerhub-route-state" role="alert">
        <h2>Product unavailable</h2>
        <p>{resource.message}</p>
      </section>
    )
  }

  const { product } = resource

  return (
    <article className="sellerhub-detail">
      <p className="sellerhub-eyebrow">Product lifecycle: success</p>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <dl className="sellerhub-definition-list">
        <div>
          <dt>Price</dt>
          <dd>{formatCurrency(product.unitPriceInCents, locale)}</dd>
        </div>
        <div>
          <dt>Inventory</dt>
          <dd>{product.inventoryLabel}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{product.status}</dd>
        </div>
      </dl>
      <PrimitiveButton
        disabled={product.status === 'archived'}
        onClick={() =>
          cartDispatch({
            type: 'product-added',
            line: {
              productId: product.id,
              name: product.name,
              unitPriceInCents: product.unitPriceInCents,
            },
          })
        }
      >
        Add to cart
      </PrimitiveButton>
    </article>
  )
}
```
</div>

**文件职责与执行关系：** 根据 route param 管理 loading/success/not-found/error 与 obsolete result cleanup。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/product-detail/product-detail-public-api.ts</span>
  </div>

```ts
export { ProductDetailPage } from './product-detail-page'
```
</div>

**文件职责与执行关系：** 暴露 product detail page 的稳定 feature surface。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/__tests__/cart-model.test.ts</span>
  </div>

```ts
import { describe, expect, it } from 'vitest'
import {
  cartReducer,
  deriveCartSummary,
  emptyCartState,
  readCartState,
  writeCartState,
} from '../features/cart/cart-model'

class MemoryStorage implements Storage {
  private values = new Map<string, string>()

  get length() {
    return this.values.size
  }

  clear() {
    this.values.clear()
  }

  getItem(key: string) {
    return this.values.get(key) ?? null
  }

  key(index: number) {
    return [...this.values.keys()][index] ?? null
  }

  removeItem(key: string) {
    this.values.delete(key)
  }

  setItem(key: string, value: string) {
    this.values.set(key, value)
  }
}

describe('cart model', () => {
  it('adds, updates, removes, and derives totals without mutating prior state', () => {
    const added = cartReducer(emptyCartState, {
      type: 'product-added',
      line: {
        productId: 'product-lamp',
        name: 'Focus Lamp',
        unitPriceInCents: 4599,
      },
    })
    const updated = cartReducer(added, {
      type: 'quantity-updated',
      productId: 'product-lamp',
      quantity: 3,
    })
    const removed = cartReducer(updated, {
      type: 'product-removed',
      productId: 'product-lamp',
    })

    expect(added).not.toBe(emptyCartState)
    expect(deriveCartSummary(updated)).toEqual({
      itemCount: 3,
      subtotalInCents: 13797,
    })
    expect(removed).toEqual(emptyCartState)
  })

  it('round-trips valid state through the browser storage boundary', () => {
    const storage = new MemoryStorage()
    const state = {
      lines: [
        {
          productId: 'product-desk',
          name: 'Seller Desk',
          unitPriceInCents: 32900,
          quantity: 1,
        },
      ],
    }

    writeCartState(storage, 'cart-test', state)

    expect(readCartState(storage, 'cart-test')).toEqual(state)
  })
})
```
</div>

**文件职责与执行关系：** 证明 reducer transitions、derived totals 与 Storage contract。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/__tests__/checkout-form.behavior.test.tsx</span>
  </div>

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SellerHubAppContext } from '../app/sellerhub-app-context'
import { CheckoutForm } from '../features/checkout/checkout-form'

const initialCart = {
  lines: [
    {
      productId: 'product-lamp',
      name: 'Focus Lamp',
      unitPriceInCents: 4599,
      quantity: 1,
    },
  ],
}

function renderCheckout() {
  return render(
    <SellerHubAppContext initialCart={initialCart}>
      <CheckoutForm />
    </SellerHubAppContext>,
  )
}

describe('checkout form behavior', () => {
  it('shows field validation before calling the gateway', async () => {
    const user = userEvent.setup()
    renderCheckout()

    await user.click(screen.getByRole('button', { name: 'Place local order' }))

    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    expect(screen.getByText('Enter a complete shipping address.')).toBeInTheDocument()
    expect(screen.getByText('Accept the local demo terms.')).toBeInTheDocument()
  })

  it('shows a known conflict and then accepts a valid local order', async () => {
    const user = userEvent.setup()
    renderCheckout()

    await user.type(screen.getByLabelText('Email'), 'blocked@example.com')
    await user.type(
      screen.getByLabelText('Shipping address'),
      '16 Evidence Street',
    )
    await user.click(screen.getByLabelText('Accept local demo terms'))
    await user.click(screen.getByRole('button', { name: 'Place local order' }))

    expect(await screen.findByText('Checkout requires review')).toBeInTheDocument()

    await user.clear(screen.getByLabelText('Email'))
    await user.type(screen.getByLabelText('Email'), 'buyer@example.com')
    await user.click(screen.getByRole('button', { name: 'Place local order' }))

    expect(await screen.findByRole('heading', { name: 'Order accepted' })).toBeInTheDocument()
  })
})
```
</div>

**文件职责与执行关系：** 通过 label/role/text 验证 field errors、known conflict 与 success。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/__tests__/sellerhub-api-adapter.test.ts</span>
  </div>

```ts
import { describe, expect, it } from 'vitest'
import { adaptProductDto } from '../shared/api/sellerhub-adapters'
import {
  assertProductDto,
} from '../shared/api/sellerhub-dto-contract'

describe('SellerHub API adapter boundary', () => {
  it('validates an unknown response before adapting it', () => {
    const response: unknown = {
      id: 'product-lamp',
      name: ' Focus Lamp ',
      description: ' Task lighting ',
      priceInCents: 4599,
      inventoryCount: 12,
      status: 'ACTIVE',
    }

    assertProductDto(response)

    expect(adaptProductDto(response)).toEqual({
      id: 'product-lamp',
      name: 'Focus Lamp',
      description: 'Task lighting',
      unitPriceInCents: 4599,
      inventoryLabel: '12 available',
      status: 'active',
    })
  })

  it('rejects a response that only looks typed at compile time', () => {
    const response: unknown = {
      id: 'product-lamp',
      name: 'Focus Lamp',
      priceInCents: '4599',
    }

    expect(() => assertProductDto(response)).toThrow('Invalid product response')
  })
})
```
</div>

**文件职责与执行关系：** 证明 unknown response 必须先通过 guard，错误 shape 会在 runtime 被拒绝。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/__tests__/sellerhub-capstone.integration.test.tsx</span>
  </div>

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router'
import { describe, expect, it } from 'vitest'
import { SellerHubAppContext } from '../app/sellerhub-app-context'
import { SellerHubRouter } from '../app/sellerhub-router'

function LocationProbe() {
  const location = useLocation()
  return <output data-testid="location">{`${location.pathname}${location.search}`}</output>
}

describe('SellerHub capstone integration', () => {
  it('navigates, filters with URL state, and records an operations event', async () => {
    const user = userEvent.setup()

    render(
      <SellerHubAppContext initialCart={{ lines: [] }}>
        <MemoryRouter initialEntries={['/react/chapter-16/catalog']}>
          <SellerHubRouter />
          <LocationProbe />
        </MemoryRouter>
      </SellerHubAppContext>,
    )

    expect(
      await screen.findByRole('heading', { name: 'Product catalog' }),
    ).toBeInTheDocument()

    await user.type(screen.getByLabelText('Search products'), 'work')

    expect(screen.getByText('Seller Work Desk')).toBeInTheDocument()
    expect(screen.queryByText('Focus Desk Lamp')).not.toBeInTheDocument()
    expect(screen.getByTestId('location')).toHaveTextContent(
      '/react/chapter-16/catalog?query=work',
    )

    await user.click(screen.getByRole('link', { name: 'Operations' }))
    expect(
      await screen.findByRole('heading', { name: 'Operations and boundaries' }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Report local smoke event' }),
    )
    expect(screen.getByText(/1 normalized error events/)).toBeInTheDocument()
  })
})
```
</div>

**文件职责与执行关系：** 通过 MemoryRouter 验证 navigation、URL filtering 与 operations reporting。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/docs/architecture-decision-record.md</span>
  </div>

```md
# ADR-016: SellerHub Local Capstone Architecture

## Status

Accepted for the React learning workspace.

## Context

The capstone must integrate the React learning path without adding dependencies or
pretending that a local Vite application is a production full-stack system.

## Decisions

### Declarative Client Routing

Use the installed React Router declarative APIs. `BrowserRouter` owns browser history,
`Routes` selects the matching branch, and nested routes render through `Outlet`.
Catalog search parameters remain URL state.

### Runtime Contract Boundary

The mock gateway returns `unknown`. DTO assertion functions validate runtime values.
Adapters then translate DTO naming and values into feature-facing view models.
TypeScript types alone are not treated as runtime validation.

### State Ownership

- URL: catalog query, status, and sort
- Feature component: request lifecycle and controlled form fields
- App Context: locale, role, release metadata, feature flags, reporter, and shared cart
- Reducer: cart transitions
- Derived render values: filtered products and cart totals
- Browser storage: best-effort local cart persistence only

### Design System Boundary

Reusable button, field, status tabs, and tokens live in `design-system`. Feature modules
consume primitives but primitives do not import feature code.

### Mutation Strategy

Checkout uses an action-like async event handler with explicit pending and result states.
Seller orders use an optimistic local projection, then confirm or roll back from the mock
gateway result. The capstone does not claim a server Action or transactional backend.

### Test Strategy

Pure contract and reducer logic receive unit tests. Checkout receives a component behavior
test. The routed application receives an integration test through `MemoryRouter`.

## Alternatives

- A single dashboard component was rejected because it hides ownership and dependency
  direction.
- Direct DTO rendering was rejected because TypeScript does not validate runtime values.
- A global state library was rejected because the installed React reducer and Context
  capabilities cover this local scope.
- Real backend, auth, payment, monitoring, and feature-flag services were rejected because
  they exceed the chapter boundary and would require new dependencies or infrastructure.

## Consequences

- Runtime trust boundaries are visible and testable.
- The capstone is runnable without external services.
- Browser refresh persistence is local and non-authoritative.
- Real authorization, payment, durability, and deployment remain explicit future work.

## Testing and Quality Implications

Contract guards and reducer transitions are tested as pure logic. Checkout is tested
through labels, roles, and visible feedback. Routing is tested through a user journey.
Lint, typecheck, tests, and build remain separate release gates because each detects a
different class of failure.

## Rollback and Migration Notes

The Chapter 16 app is mounted through one lazy entry. A rollback removes that mount and
the isolated Chapter 16 directory. A future real API can replace the mock gateway while
preserving DTO guards, adapters, feature public APIs, and page-facing view models.
```
</div>

**文件职责与执行关系：** 保存 decisions、alternatives、consequences、quality 与 rollback notes。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/docs/portfolio-evidence.md</span>
  </div>

```md
# SellerHub Capstone Portfolio Evidence

## What This Capstone Demonstrates

It demonstrates how requirements, routes, runtime data, state ownership, accessibility,
tests, and release evidence work together in one local React feature slice.

## Technical Scope

React 19 components, reducer and Context state, React Router URL state, runtime DTO guards,
TypeScript view models, controlled forms, mock async mutation, design-system primitives,
locale formatting, observability context, budgets, security findings, and Vitest behavior
tests.

## Product Flows

SellerHub connects a buyer catalog and checkout journey with a seller order workflow.
It also exposes operations and documentation routes so a reviewer can inspect engineering
claims instead of inferring them from screenshots.

## Architecture Evidence

| Claim | Evidence |
| --- | --- |
| Shareable catalog criteria | `features/catalog/catalog-page.tsx` and router integration test |
| Runtime-safe DTO boundary | `shared/api/sellerhub-dto-contract.ts` and adapter unit test |
| Explicit cart transitions | `features/cart/cart-model.ts` and reducer unit test |
| Controlled checkout lifecycle | `features/checkout/checkout-form.tsx` and behavior test |
| Permission-gated mutation | `features/orders/seller-orders-page.tsx` |
| Accessible reusable controls | `design-system/field.tsx` and `design-system/status-tabs.tsx` |
| Operational boundaries | `features/operations/operations-page.tsx` |
| Reviewable decisions | This document, the ADR, requirements, and release checklist |

## Testing Evidence

- Adapter unit tests prove runtime validation precedes DTO adaptation.
- Cart unit tests prove immutable transitions, totals, and the storage contract.
- Checkout behavior tests prove validation, known conflict, and success feedback.
- The integration test proves route navigation, URL filtering, and error reporting.

## Quality Gates

The delivery requires separate lint, typecheck, test, and production build results. A
green build alone does not prove lint rules, TypeScript contracts, or user behavior.

## Engineering Tradeoffs

- Declarative routing is sufficient because the mock gateway owns its own lifecycle.
- Context carries cross-route app services and cart state, while URL and feature state
  remain in their narrower owners.
- The mock gateway avoids network instability but cannot prove HTTP, backend, or database
  behavior.
- Action-like async handlers make pending and rollback explicit without claiming server
  Actions.

## Honest Limitations

This project does not include real identity, server authorization, payment processing,
durable storage, production monitoring, field performance data, deployment configuration,
or incident response. Those are documented roadmap prerequisites, not completed features.

## How This Becomes a Real Full-Stack Project

1. Define and review a real HTTP or framework contract.
2. Replace the mock gateway without bypassing DTO guards and adapters.
3. Add server-owned identity, authorization, validation, persistence, and audit events.
4. Integrate a compliant payment boundary without exposing sensitive fields to this UI.
5. Add deployment, field telemetry, alerting, and rollback automation with verified owners.

## Resume Bullet Candidates

- Built a local React and TypeScript commerce capstone with routed catalog, cart, checkout,
  seller order workflows, runtime DTO validation, and behavior tests.
- Designed feature public APIs, reducer and Context ownership, accessible primitives, and
  reviewable ADR and release evidence for a non-production SellerHub simulation.
- Verified the local project with lint, TypeScript, Vitest, and Vite build gates without
  claiming real backend, payment, authentication, deployment, or production monitoring.
```
</div>

**文件职责与执行关系：** 把能力 claim 映射到 source/test/docs，并记录 honest limitations 与升级路线。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/docs/product-requirements.md</span>
  </div>

```md
# SellerHub Capstone Product Requirements

## Problem Statement

The React learning path needs one coherent feature slice that proves product delivery,
runtime boundaries, tests, and review evidence rather than another isolated API demo.

## Product Goal

Deliver a reviewable local frontend slice that demonstrates how a buyer discovers a
product, manages a cart, submits checkout details, and how a seller reviews order status.

## Target Users

- Buyers who browse a local product catalog and prepare a checkout intent
- Sellers who review and update local order status
- Reviewers who inspect architecture, operations, tests, and portfolio evidence

## Primary User Journeys

1. A buyer opens the catalog, searches, filters, sorts, and shares the resulting URL.
2. A buyer opens a product detail route and sees loading, success, not-found, or error UI.
3. A buyer adds products to a cart, changes quantities, and sees derived totals.
4. A buyer submits controlled checkout fields and receives validation, pending, known
   error, or success feedback.
5. A seller filters orders and performs a permission-gated optimistic status update.
6. A reviewer opens operations and evidence routes to inspect release claims.

## Functional Requirements

- Route catalog, product detail, cart, checkout, seller orders, operations, and evidence.
- Keep catalog search, status, and sort in URL search parameters.
- Validate unknown mock responses and adapt DTOs before rendering.
- Support cart transitions, checkout feedback, and seller order status changes.
- Expose locale, role, feature flags, release metadata, and normalized error evidence.

## Non-Functional Requirements

- Use accessible labels, visible focus, and keyboard-operable status tabs.
- Keep feature dependencies behind public API modules.
- Keep reducers and adapters deterministic enough for narrow unit tests.
- Pass lint, typecheck, test, and production build gates.
- State local mock and non-production limitations without exaggeration.

## Acceptance Criteria

- Catalog `query`, `status`, and `sort` criteria are encoded in URL search parameters.
- Unknown mock responses are validated before adapters create view models.
- Cart updates are represented by exhaustive reducer actions.
- Cart totals are derived from cart lines and are not stored as independent state.
- Checkout blocks invalid values before invoking the mock gateway.
- `blocked@example.com` produces a known checkout conflict without clearing the cart.
- Seller order actions require the `seller` role and the release feature flag.
- Optimistic order status rolls back when the mock mutation fails.
- Operations exposes performance budgets, security boundaries, and normalized errors.
- Tests cover the adapter, reducer, checkout behavior, and an integrated route journey.

## Out of Scope

- Real authentication or server-side authorization
- Real payment collection
- Backend persistence or database access
- Production analytics, monitoring, alerting, or deployment
- Next.js migration or server rendering

## Mock Boundary

This capstone is a deterministic local frontend simulation. Mock gateway responses run in
the browser process. They are not a security boundary and do not prove production
availability, durability, or authorization.
```
</div>

**文件职责与执行关系：** 保存 problem、users、journeys、requirements、acceptance、scope 与 mock boundary。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/docs/release-checklist.md</span>
  </div>

```md
# SellerHub Capstone Release Checklist

## Automated Gates

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run build`

## Contract and State Checks

- [ ] Invalid product DTOs fail before adaptation.
- [ ] Every cart action is handled exhaustively.
- [ ] Cart totals are derived from line values.
- [ ] Checkout validation prevents invalid submission.
- [ ] Known checkout conflict preserves actionable feedback.
- [ ] Seller order failure restores the confirmed order state.

## Route Smoke Checks

- [ ] `/react/chapter-16/catalog` renders the catalog.
- [ ] Catalog controls update URL search parameters.
- [ ] A product detail link reaches a product route.
- [ ] Cart and checkout routes preserve shared cart state.
- [ ] Seller orders respect role and feature-flag boundaries.
- [ ] Operations can record a normalized local smoke event.
- [ ] Evidence lists all four review documents.

## Accessibility Checks

- [ ] Every form control has an accessible label.
- [ ] Status tabs expose tab roles and keyboard navigation.
- [ ] Pending and error feedback uses appropriate live semantics.
- [ ] Focus indicators remain visible.
- [ ] Content remains usable at a narrow viewport.

## Operational Review

- [ ] Route-level performance budgets pass their evaluator.
- [ ] Security findings cover external links, unsafe HTML, token storage, and logging.
- [ ] Observability events contain route, feature, release, and privacy context.
- [ ] Feature flags have an owner, test path, and cleanup decision.

## Honest Boundary Checks

- [ ] UI states that the gateway is local and non-production.
- [ ] No real credentials, tokens, payment fields, or personal data are present.
- [ ] Documentation does not claim server authorization or durable persistence.
- [ ] Performance values are documented local budgets, not field telemetry.

## Rollback Plan

The capstone is isolated under the Chapter 16 source root and mounted through one lazy
entry in `src/App.tsx`. Rollback removes that mount and the Chapter 16 files without
changing dependencies or earlier chapter behavior.

## Feature Flag Cleanup

Remove `sellerOrderMutation` when the rollout decision is permanent. Until then, test both
enabled and disabled behavior and keep server authorization independent from the UI flag.
```
</div>

**文件职责与执行关系：** 保存自动 gates、manual smoke checks、operations review 与 rollback。 TypeScript 在 compile time 检查其公开 contract；对应 runtime 行为仍由组件、JavaScript、browser 或 test gate 验证。

**执行过程与引用变化：**

`BrowserRouter` 提供 location，`SellerHubRouter` 选择 branch，`SellerHubAppContext` 提供 cross-route values。catalog response 从 `unknown` 变为 narrowed DTO，再变为新 view model references。cart reducer 每次返回新 snapshot。checkout values 每次输入创建新 object。orders optimistic array 与 previous confirmed array 并存到 Promise settle。reporter closure 保存 event array，revision state让 React 重新读取。

**对比、错误与识别：**

巨大单文件会让 route、contract、state、UI、test ownership 不可审查；shared import feature 会形成错误 dependency direction；route deep import internals 会绕过 public API。可用 import audit、目录审查、lint/typecheck 和 tests 联合识别。

**SellerHub、主线与记忆模型：**

这是前 15 章能力按 buyer/seller/reviewer journey 的重组，不是 API 目录。记住：**完整项目不是文件数量，而是 requirements、runtime、module、test、release 和 evidence 形成闭环。**

<a id="section-9-16"></a>

### 9.16 SellerHub next-step roadmap：从本地 capstone 到真实全栈项目

**本节解决的问题：**

“下一步接后端”仍然过于笼统。每个真实扩展都应有 prerequisite，并尽量替换现有 boundary，而不是推翻 feature UI。

**技术意义与边界：**

roadmap 是 sequencing 文档与 UI evidence，不是已实现功能。本节不安装 backend、database、auth provider、payment、monitoring、feature flag SaaS 或 monorepo tooling。

**固定升级原则：**

先有 reviewed contract，再换 gateway；先有 server identity/authorization，再提升 RBAC claim；先选 compliant payment boundary，再收集 sensitive payment intent；先有 deployment 和 field telemetry，再声明 production operations。

**机制证据链：**

1. team 批准真实 API contract；
2. 新 gateway 实现返回 `unknown`，现有 guard/adapter 继续保护 feature；
3. integration/contract tests 替换 local mock assumptions；
4. release checklist 增加 deployment/rollback/monitoring owner；
5. portfolio claim 只有在真实 evidence 存在后才升级，防止 unreviewable migration 与 exaggerated claim。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-16-sellerhub-capstone/16-next-step-roadmap/sellerhub-next-step-roadmap.tsx</span>
  </div>

```tsx
const nextSteps = [
  {
    condition: 'A real API contract and deployment environment exist.',
    step: 'Replace the mock gateway behind the existing adapter boundary.',
  },
  {
    condition: 'Server authorization and identity are available.',
    step: 'Move RBAC enforcement to the server and keep UI permission hints.',
  },
  {
    condition: 'A compliant payment flow is selected.',
    step: 'Delegate sensitive payment data to the provider boundary.',
  },
] as const

export function SellerHubNextStepRoadmap() {
  return (
    <section className="chapter16-panel" aria-labelledby="next-step-roadmap-title">
      <p className="chapter16-eyebrow">9.16 Next-step roadmap</p>
      <h2 id="next-step-roadmap-title">Sequence growth by prerequisite, not novelty</h2>
      <div className="chapter16-grid">
        {nextSteps.map((item) => (
          <article className="chapter16-card" key={item.step}>
            <h3>{item.step}</h3>
            <p>{item.condition}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码解释、执行过程与变化：**

每个 roadmap item 都把 condition 和 step 放在同一 object；React 只展示计划，不把计划伪装成 runtime capability。未来变化应发生在 gateway、server authorization 和 operations adapters，feature-facing contracts 尽量保持。

**对比、错误与识别：**

先安装一组工具再找问题会扩大架构表面。识别方法是要求每个 dependency、service 和 package 回答“哪个已验收风险要求它现在存在？”

**SellerHub、主线与记忆模型：**

本章结束 React 主线，但不结束项目演进。记住：**roadmap 的顺序由信任边界和交付证据决定，不由工具热度决定。**

## 10. API / 语法索引

| API / 语法 | 层 | 本章用途 | 不能证明的事情 |
| --- | --- | --- | --- |
| `BrowserRouter` | React Router | 使用 browser history 提供 client routing | hosting rewrite 已配置 |
| `Routes` / `Route` / `Outlet` | React Router | route matching 与 nested page composition | data 已加载或已授权 |
| `useParams` | React Router | 读取 product id | product 存在 |
| `useSearchParams` | React Router | 读取和更新 shareable criteria | search value 合法 |
| `useState` | React | 保存 form、resource、pending 等 local snapshot | server 已持久化 |
| `useReducer` | React | 管理 cart action transitions | reducer 外部 side effect 成功 |
| `useContext` | React | 读取 app-wide locale/role/flags/reporter/cart | value owner 合理 |
| `useEffect` | React | 同步 mock request 与 browser storage | effect 业务逻辑自动正确 |
| `asserts value is T` | TypeScript | guard 后缩小 unknown | guard implementation 完整 |
| discriminated union | TypeScript | exhaustiveness 与 render branch | runtime input 自动符合类型 |
| `URLSearchParams` | Browser | query string 解析和序列化 | URL state 应保存何种业务值 |
| `localStorage` | Browser | best-effort local cart persistence | durable/server-authoritative cart |
| `Intl.NumberFormat` | JavaScript platform | locale currency format | 汇率或货币业务规则 |
| `preventDefault()` | Browser event | 阻止 native form navigation | validation 或 mutation 成功 |
| `render` / `screen` | Testing Library | 从用户可见 DOM 测行为 | real browser 全部差异 |
| `userEvent.setup()` | Testing Library | 模拟输入、点击、checkbox | production traffic |

## 11. 常见错误表

| 错误 | 违反的规则 | 具体风险 | 识别与修正 |
| --- | --- | --- | --- |
| 把旧 demo 全堆一页 | journey-first delivery | 无法说明产品完成 | 从 journey 和 acceptance criteria 重组 |
| 功能多但无验收条件 | observable outcome | review 无法判定完成 | 把每项改写为可测试结果 |
| route deep import internals | feature public API | coupling 与不可控迁移 | route 只 import `*-public-api.ts` |
| URL、draft、resource 混用 | state ownership | refresh 丢失或泄露 draft | 按 shareability 与 authority 分层 |
| DTO 直接进入 UI | runtime trust boundary | schema drift 直接破坏 render | `unknown -> guard -> adapter` |
| 每个 feature 自处理 error | normalization | message/kind 不一致 | 统一 normalized error |
| reducer 直接 mutation | immutable snapshot | rollback 和 render identity 失效 | 返回新 object/array |
| 所有 form error 都当 exception | error taxonomy | 用户没有修正路径 | 区分 field/business/unexpected |
| hidden button 当 authorization | server authority | 可绕过 UI 调 mutation | server 必须独立 authorize |
| flag 无 owner/cleanup/test | release lifecycle | permanent dead branch | checklist 记录 owner 与清理条件 |
| observability 只有 console | context schema | 无法按 route/release 定位 | event 带 route/feature/release/privacy |
| budget 只有表格 | evaluator gate | 不能自动判断回归 | 用 pure evaluator 输出 PASS/FAIL |
| security 只有 checklist | code/review evidence | 风险与 owner 不可定位 | finding 同时写 frontend/server boundary |
| test 只检查 className | user behavior | implementation 改动造成脆弱测试 | role/label/text/URL assertion |
| docs 只有使用说明 | decision evidence | tradeoff 和 rollback 丢失 | PRD + ADR + release + portfolio |
| 简历夸大生产使用 | claim integrity | 无法通过深挖 | 明确 local/mock/non-production |
| 只跑 build | separate gates | lint/type/behavior 漏检 | 四个 gate 分别运行 |
| 所有代码一个文件 | module ownership | dependency 不可审查 | app/shared/features/design-system 分层 |
| design-system import feature | dependency direction | primitive 被业务污染 | primitive 只依赖通用 React/types |
| shared import feature | dependency direction | cycle 与复用失败 | feature 单向依赖 shared |
| README 没有升级路线 | honest roadmap | 读者误解完成度 | 写 prerequisite-driven next steps |

## 12. 最终小项目

### 12.1 项目名称

`SellerHub Capstone App`

### 12.2 项目目标

用一个本地 Vite client 串联 buyer catalog、product detail、cart/checkout、seller orders、operations 和 evidence。项目展示生产式边界，但明确不是生产系统。

### 12.3 为什么适合作为最终章

它要求前面章节同时工作：props 连接 component，state/reducer 表示 transition，effects 同步 async/storage，router 持有 URL，forms 表示 intent，tests 验证 behavior，architecture 限制 dependencies，docs 保存 decision 与 claim。

### 12.4 可运行流程

1. 从 `/react/chapter-16/catalog` 搜索、筛选、排序。
2. 打开 `/products/:productId` 查看 resource branches。
3. add cart，进入 cart 与 checkout。
4. 提交 invalid、known conflict 或 valid form。
5. 切换 seller role，过滤并修改 orders。
6. 在 operations 报告 local smoke event，检查 budgets/security。
7. 在 evidence 查看四份 review docs 摘要。

### 12.5 完整代码与文档位置

承载机制的最终项目文件已在 9.15 全部展示。`chapter-16-practice-root.tsx`、两份通用 CSS 和 `src/App.tsx` 只承担 mount/shell，按规则不重复展开。

### 12.6 Runtime 与 compile-time 分工

- React runtime 保存 snapshot、运行 reducer、调度 render/commit。
- JavaScript runtime 执行 guard、adapter、Promise、formatter 和 evaluator。
- browser 提供 history、DOM event、storage、Intl 和 focus。
- TypeScript compile time 检查 union、props、DTO、action、event、public API import；类型会被擦除。
- tests/review 检查 runtime contract、accessibility、permission illusion、rollback 和 claim honesty。

### 12.7 本地与生产边界

mock gateway 没有 HTTP/server/database；role selector 没有真实 identity；checkout 没有 payment；reporter 没有发送 telemetry；budget 是 local evidence；security findings 不是 penetration test；README/ADR 不等于 deployment。

## 13. 额外速查表

| 值 | owner | 更新触发 | 持久性 / authority |
| --- | --- | --- | --- |
| catalog query/status/sort | URL | `setSearchParams` navigation | 可分享，不是 server authority |
| product resource | product page | route param + mock Promise | route 生命周期 |
| cart lines | reducer + app Context | cart action | localStorage best effort |
| cart totals | render derivation | cart snapshot 改变 | 不单独持久化 |
| checkout fields | checkout component | controlled input event | local draft |
| checkout result | checkout component | async submit settle | local mock result |
| order status | orders feature | optimistic + confirm/rollback | local mock result |
| locale/role/flags/release | app Context | selector/config | local app boundary |
| error events | reporter closure + revision | normalized error | in-memory local evidence |
| budgets/findings | shared operational modules | release input change | review evidence |

## 14. 最终文件清单

**本次创建的学习指导文件：**

- `docs/react/chapter-16-sellerhub-capstone/react-chapter-16-learning-guide.md`

**本章创建并最终保留的真实练习与 Capstone 文件：**

- `src/learning/react/chapter-16-sellerhub-capstone/01-capstone-scope/capstone-scope-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/02-product-requirements/product-requirements-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/03-route-url-state/route-url-state-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/04-design-system-shell/design-system-shell-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/05-api-dto-adapter/api-dto-adapter-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/06-catalog-feature/catalog-feature-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/07-product-detail-lifecycle/product-detail-lifecycle-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/08-cart-reducer-persistence/cart-reducer-persistence-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/09-checkout-workflow/checkout-workflow-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/10-seller-orders-rbac/seller-orders-rbac-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/11-app-context-observability/app-context-observability-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/12-performance-security-operations/performance-security-operations-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/13-testing-strategy/testing-strategy-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/14-documentation-portfolio-evidence/documentation-portfolio-evidence-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/15-complete-capstone-code/complete-capstone-code-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/16-next-step-roadmap/sellerhub-next-step-roadmap.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/chapter-16-practice-root.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/chapter-16-practice.css`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/__tests__/cart-model.test.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/__tests__/checkout-form.behavior.test.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/__tests__/sellerhub-api-adapter.test.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/__tests__/sellerhub-capstone.integration.test.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-app-context.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-app-state.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-capstone-app.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-router.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/app/sellerhub-shell.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/design-system/field.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/design-system/primitive-button.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/design-system/status-tabs.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/design-system/tokens.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/docs/architecture-decision-record.md`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/docs/portfolio-evidence.md`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/docs/product-requirements.md`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/docs/release-checklist.md`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/cart/cart-model.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/cart/cart-panel.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/cart/cart-public-api.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/catalog/catalog-model.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/catalog/catalog-page.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/catalog/catalog-public-api.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/checkout/checkout-form.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/checkout/checkout-model.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/checkout/checkout-public-api.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/evidence/evidence-page.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/evidence/evidence-public-api.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/operations/operations-page.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/operations/operations-public-api.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/orders/orders-public-api.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/orders/orders-service.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/orders/seller-orders-page.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/product-detail/product-detail-page.tsx`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/features/product-detail/product-detail-public-api.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/sellerhub-capstone-app.css`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/api/mock-sellerhub-gateway.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/api/sellerhub-adapters.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/api/sellerhub-dto-contract.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/errors/normalize-sellerhub-error.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/flags/feature-flags.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/i18n/formatters.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/i18n/messages.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/observability/error-reporter.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/performance/performance-budget.ts`
- `src/learning/react/chapter-16-sellerhub-capstone/sellerhub-capstone-app/shared/security/security-boundaries.ts`

**本次最小更新的现有入口文件：**

- `README.md`
- `src/App.tsx`

**不需要创建的概念 snippet：**

- 无。本章的机制证据全部对应真实文件。

概念 snippet 不属于真实文件清单。本章没有用 snippet 代替任何核心练习或最终项目文件。

## 15. 如何转换成个人笔记

每个 user journey 建一页，固定写五项：

1. intent 从哪里开始；
2. state/URL/DTO/result 分别由谁拥有；
3. object/reference 如何变化；
4. 哪个 gate 能发现哪类失败；
5. 哪些 production capability 仍是 UNKNOWN 或 future work。

不要按 API 抄目录。把 `useReducer` 写在 cart transition 页，把 `useSearchParams` 写在 catalog shareability 页，把 `useEffect` 写在 product resource 与 storage synchronization 页。

## 16. 必须能回答的问题

1. 为什么 Capstone 不是 demo 合集？
2. 哪些 catalog values 应进入 URL，哪些 checkout values 不应进入？
3. 为什么 mock response 仍应返回 `unknown`？
4. assertion function 与 adapter 分别做什么？
5. 为什么 cart total 不存 state？
6. storage unavailable 时为什么 app 仍应运行？
7. checkout failure 为什么不能先 clear cart？
8. optimistic orders 有哪两个同时存在的版本？
9. UI permission 为什么不是 authorization？
10. design-system 为什么不能 import feature？
11. error event 为什么要带 route/feature/release/privacy？
12. local performance budget 与 field telemetry 有什么差异？
13. 哪些风险由 TypeScript 发现，哪些必须由 test/review 发现？
14. ADR、release checklist、portfolio evidence 各自回答什么问题？
15. 如何把 mock gateway 替换为真实 API 而不让 DTO 泄漏进 UI？

## 17. 最终记忆模型

SellerHub Capstone 的最短模型：

1. **Requirements 选择结果**：journey 和 acceptance criteria 定义完成。
2. **Router 选择页面**：URL 保存可分享 criteria。
3. **Runtime boundary 选择可信值**：unknown 经过 guard 和 adapter。
4. **State owner 选择变化位置**：draft、resource、reducer、Context 各自负责。
5. **Design system 选择通用 contract**：semantics 和 keyboard 不被业务复制。
6. **Mutation 选择暂时与确认**：optimistic、confirmed、rollback 明确分开。
7. **Operations 选择可审查证据**：event、budget、finding、flag 有结构。
8. **Tests 与 docs 选择可证明声明**：代码能跑还不够，claim 必须可复核。

最终一句：**生产式前端交付不是把 API 用得更多，而是让产品意图、运行时边界、模块依赖、状态变化、测试结果和工程声明彼此一致。**

## 18. 官方文档阅读清单

### React

- [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [`<input>`](https://react.dev/reference/react-dom/components/input)
- [`useOptimistic`](https://react.dev/reference/react/useOptimistic)

### React Router

- [Picking a Mode](https://reactrouter.com/start/modes)
- [Declarative Routing](https://reactrouter.com/start/declarative/routing)
- [`BrowserRouter`](https://reactrouter.com/api/declarative-routers/BrowserRouter)
- [`Routes`](https://reactrouter.com/api/components/Routes)
- [`useSearchParams`](https://reactrouter.com/api/hooks/useSearchParams)
- [`MemoryRouter`](https://reactrouter.com/api/declarative-routers/MemoryRouter)

### TypeScript、Browser 与 Accessibility

- [TypeScript Narrowing and Exhaustiveness Checking](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [MDN `URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [MDN `Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN `Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- [WAI-ARIA APG Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

### Testing

- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [user-event Introduction](https://testing-library.com/docs/user-event/intro/)
- [Vitest Getting Started](https://vitest.dev/guide/)

本地辅助资料：

- `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf`：辅助 reducer、feature structure、Vitest/RTL 与 Vite build。
- `references/books/react/full-stack-react-projects.pdf`：仅辅助理解模块化、security 与 testing 的历史背景；其中旧版 Redux、Stripe、Jest、部署写法不是本章现代默认实现。
