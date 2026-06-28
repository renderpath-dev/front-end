# React 第 12 章：Testing、Quality Gates 与 Frontend Engineering

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
  - [9.1 测试金字塔与测试边界](#91-测试金字塔与测试边界)
  - [9.2 Vitest unit test：pure function、parser 与 reducer](#92-vitest-unit-testpure-functionparser-与-reducer)
  - [9.3 Component test：render、screen 与 user-visible output](#93-component-testrenderscreen-与-user-visible-output)
  - [9.4 getByRole / getByLabelText 与 accessibility-first query](#94-getbyrole--getbylabeltext-与-accessibility-first-query)
  - [9.5 userEvent 与真实交互序列](#95-userevent-与真实交互序列)
  - [9.6 Async UI test：findBy、waitFor 与 loading/error/success](#96-async-ui-testfindbywaitfor-与-loadingerrorsuccess)
  - [9.7 Controlled form behavior test](#97-controlled-form-behavior-test)
  - [9.8 Router integration test 与 initial route](#98-router-integration-test-与-initial-route)
  - [9.9 Context provider / custom hook boundary test](#99-context-provider--custom-hook-boundary-test)
  - [9.10 MSW 与 network boundary mock](#910-msw-与-network-boundary-mock)
  - [9.11 Error boundary 与错误状态测试](#911-error-boundary-与错误状态测试)
  - [9.12 Quality gates：lint、typecheck、test、build 与 CI command model](#912-quality-gateslinttypechecktestbuild-与-ci-command-model)
  - [9.13 SellerHub testing architecture mapping](#913-sellerhub-testing-architecture-mapping)
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
| 测试金字塔与测试边界 | `src/learning/react/chapter-12-testing-quality/01-test-boundary/testing-boundary-map.tsx` | 真实练习文件 | 9.1 |
| Vitest unit test：pure function、parser 与 reducer | `src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.ts` | 真实练习文件 | 9.2 |
| Vitest unit test：pure function、parser 与 reducer behavior check | `src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.test.ts` | 真实测试文件 | 9.2 |
| Component test：render、screen 与 user-visible output | `src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.tsx` | 真实练习文件 | 9.3 |
| Component test：render、screen 与 user-visible output behavior check | `src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.behavior.test.tsx` | 真实测试文件 | 9.3 |
| getByRole / getByLabelText 与 accessibility-first query | `src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.tsx` | 真实练习文件 | 9.4 |
| getByRole / getByLabelText 与 accessibility-first query behavior check | `src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.behavior.test.tsx` | 真实测试文件 | 9.4 |
| userEvent 与真实交互序列 | `src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.tsx` | 真实练习文件 | 9.5 |
| userEvent 与真实交互序列 behavior check | `src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.behavior.test.tsx` | 真实测试文件 | 9.5 |
| Async UI test：findBy、waitFor 与 loading/error/success | `src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.tsx` | 真实练习文件 | 9.6 |
| Async UI test：findBy、waitFor 与 loading/error/success behavior check | `src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.behavior.test.tsx` | 真实测试文件 | 9.6 |
| Controlled form behavior test | `src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.tsx` | 真实练习文件 | 9.7 |
| Controlled form behavior test behavior check | `src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.behavior.test.tsx` | 真实测试文件 | 9.7 |
| Router integration test 与 initial route | `src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.tsx` | 真实练习文件 | 9.8 |
| Router integration test 与 initial route behavior check | `src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.behavior.test.tsx` | 真实测试文件 | 9.8 |
| Context provider / custom hook boundary test | `src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences-context.ts` | 真实练习文件 | 9.9 |
| Context provider / custom hook boundary test behavior check | `src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences.behavior.test.tsx` | 真实测试文件 | 9.9 |
| MSW 与 network boundary mock | `src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.tsx` | 真实练习文件 | 9.10 |
| MSW 与 network boundary mock behavior check | `src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.msw.test.tsx` | 真实测试文件 | 9.10 |
| Error boundary 与错误状态测试 | `src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.tsx` | 真实练习文件 | 9.11 |
| Error boundary 与错误状态测试 behavior check | `src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.behavior.test.tsx` | 真实测试文件 | 9.11 |
| Quality gates：lint、typecheck、test、build 与 CI command model | `src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.ts` | 真实练习文件 | 9.12 |
| Quality gates：lint、typecheck、test、build 与 CI command model behavior check | `src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.test.ts` | 真实测试文件 | 9.12 |
| SellerHub testing architecture mapping | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts` | 真实练习文件 | 9.13 |
| adapter / setup | `src/learning/react/chapter-12-testing-quality/chapter-12-practice-root.tsx` | adapter / 测试配置 | 8 |
| adapter / setup | `src/learning/react/chapter-12-testing-quality/chapter-12-practice.css` | adapter / 测试配置 | 8 |
| adapter / setup | `vitest.config.ts` | adapter / 测试配置 | 8 |
| adapter / setup | `src/test/setup.ts` | adapter / 测试配置 | 8 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-rules.ts` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-context.ts` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-provider.tsx` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-catalog-filter.tsx` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.tsx` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-panel.tsx` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-protected-route.tsx` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-workflow-routes.tsx` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.tsx` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-handlers.ts` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-server.ts` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-reducer.test.ts` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.behavior.test.tsx` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-msw.behavior.test.tsx` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-router-integration.behavior.test.tsx` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-context-hook-boundary.behavior.test.tsx` | 最终小项目真实文件 | 12.3 |
| SellerHub Tested Workflow | `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.behavior.test.tsx` | 最终小项目真实文件 | 12.3 |

## 0. 文件定位

本章位于 `D:/vite_ts` 的 React 学习路线第 12 章。学习指导文件是 `docs/react/chapter-12-testing-quality/react-chapter-12-learning-guide.md`，练习源码根目录是 `src/learning/react/chapter-12-testing-quality/`。本章明确指定主题为 Testing、Quality Gates 与 Frontend Engineering，不因 README 中旧路线缺失而改变主题。

## 1. 本章解决的问题

前 11 章已经学习了 props、state、forms、effects、reducers、context、async data、routing 和 performance。本章解决的是：如何证明这些行为在以后重构时没有坏。测试不是为了证明实现细节，而是验证用户可观察行为、业务规则、request boundary、provider/router wrapper 和质量门禁。

## 2. 前置概念

需要理解 JavaScript function/object/Promise/throw，React render/commit/state snapshot/event handler/context/router branch，TypeScript union/narrowing/type erasure，browser form/label/role/alert，以及 npm scripts 和 Vite build。

## 3. 学习目标

完成本章后，你应能区分 unit/component/integration/E2E boundary；用 Vitest 测 pure rule；用 Testing Library 和 userEvent 测 UI 行为；用 findBy/waitFor 等待异步 DOM；用 MSW mock request boundary；用 MemoryRouter 和 provider wrapper 测集成边界；用 lint/typecheck/test/build 组织质量门禁。

## 4. 推荐学习顺序

先学测试边界，再学 unit test；再进入 render/screen、accessible query、userEvent；随后学习 async UI、controlled form、router、context、MSW 和 error boundary；最后把它们收束到 quality gates 和 SellerHub mapping。

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| Unit test | 验证 pure function、parser、reducer。 | JavaScript / Vitest | 失败信号短。 |
| Component test | 验证 React component 的可见输出与交互。 | React / jsdom / RTL | 不测试 private state。 |
| Integration test | 验证 router、provider、network mock 等组合边界。 | React / Router / MSW | 适合 SellerHub workflow。 |
| E2E boundary | 真浏览器和部署边界。 | Browser / deployment | 本章只讲边界，不安装。 |
| `screen` | 面向 document 的 query 入口。 | Testing Library | 让测试按用户方式找元素。 |
| `userEvent` | 用户交互序列模拟。 | Testing Library | 比单个 fireEvent 更接近真实输入。 |
| MSW | request boundary mock。 | Network | 组件仍走 fetch。 |
| Quality gate | 自动质量检查命令。 | Tooling / CI | lint、typecheck、test、build 各管一层。 |

## 6. 底层心智模型

本章的底层模型是：先找 behavior owner，再选择最小测试层。pure rule 的 owner 是 JavaScript function；visible UI 的 owner 是 React render + DOM；route guard 的 owner 是 router context + auth provider；network state 的 owner 是 request boundary + async UI；工程质量的 owner 是 lint/typecheck/test/build pipeline。TypeScript 检查 compile-time relation，测试验证 runtime behavior，build 验证生产工具链，它们不能互相替代。

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
  AGENTS.MD
  README.md
  package.json
  package-lock.json
  vitest.config.ts
  src/
    test/setup.ts
    App.tsx
    learning/react/chapter-12-testing-quality/
  docs/react/chapter-12-testing-quality/
  references/books/react/
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
docs/react/chapter-12-testing-quality/
  react-chapter-12-learning-guide.md
```
</div>

### 真实练习结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">真实练习结构</span>
  </div>

```txt
src/learning/react/chapter-12-testing-quality/
  chapter-12-practice-root.tsx
  chapter-12-practice.css
  01-test-boundary/testing-boundary-map.tsx
  02-unit-reducer-parser/cart-quality-rules.ts
  02-unit-reducer-parser/cart-quality-rules.test.ts
  03-component-render-screen/visible-summary-panel.tsx
  03-component-render-screen/visible-summary-panel.behavior.test.tsx
  04-accessible-queries/accessible-login-form.tsx
  04-accessible-queries/accessible-login-form.behavior.test.tsx
  05-user-event-interaction/quantity-stepper.tsx
  05-user-event-interaction/quantity-stepper.behavior.test.tsx
  06-async-ui-state/async-order-status-panel.tsx
  06-async-ui-state/async-order-status-panel.behavior.test.tsx
  07-controlled-form-test/seller-filter-form.tsx
  07-controlled-form-test/seller-filter-form.behavior.test.tsx
  08-router-integration-test/seller-route-workspace.tsx
  08-router-integration-test/seller-route-workspace.behavior.test.tsx
  09-context-hook-boundary/
  10-msw-network-mock/
  11-error-boundary-test/
  12-quality-gates/
  sellerhub-tested-workflow/
```
</div>

### 概念示例结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Concept snippets:
  none for this chapter

Reason:
  Chapter 12 uses real source and test files for mechanism practice.
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
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/
  sellerhub-testing-types.ts
  sellerhub-cart-rules.ts
  sellerhub-auth-context.ts
  sellerhub-auth-provider.tsx
  sellerhub-catalog-filter.tsx
  sellerhub-login-form.tsx
  sellerhub-orders-panel.tsx
  sellerhub-protected-route.tsx
  sellerhub-workflow-routes.tsx
  sellerhub-error-boundary.tsx
  sellerhub-test-handlers.ts
  sellerhub-test-server.ts
  sellerhub-cart-reducer.test.ts
  sellerhub-login-form.behavior.test.tsx
  sellerhub-orders-msw.behavior.test.tsx
  sellerhub-router-integration.behavior.test.tsx
  sellerhub-context-hook-boundary.behavior.test.tsx
  sellerhub-error-boundary.behavior.test.tsx
```
</div>

本章按核心概念分目录，而不是长期依赖 `App.tsx`、`main.tsx`、`example.tsx` 或 `demo.tsx`。测试文件名表达被测目标，例如 `cart-quality-rules.test.ts`、`login-form.behavior.test.tsx` 和 `orders-msw.behavior.test.tsx`，便于后续 SellerHub 复习。

## 8. 示例运行方式

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

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">package.json scripts</span>
  </div>

```json
{
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc -b",
    "test": "vitest run",
    "test:watch": "vitest",
    "build": "tsc -b && vite build"
  }
}
```
</div>

`chapter-12-practice-root.tsx`、`chapter-12-practice.css`、`src/App.tsx` 和 `src/test/setup.ts` 是 adapter/setup 边界，只列入索引、结构和最终文件清单，不在正文中展开完整代码。

## 9. 分节教学与练习

### 9.1 测试金字塔与测试边界

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/01-test-boundary/testing-boundary-map.tsx` 建立一个具体测试边界。核心规则是：testing layer must match behavior owner。

**本节解决的问题：**

它解决学习者在 `test pyramid / test boundary` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `testing layer objects rendered as visible cards`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

test pyramid / test boundary

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `testing layer objects rendered as visible cards`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/01-test-boundary/testing-boundary-map.tsx</span>
  </div>

```tsx
const testingLayers = [
  {
    name: 'Unit test',
    target: 'Pure reducer, parser, and type guard rules',
    boundary: 'JavaScript values without React rendering',
  },
  {
    name: 'Component test',
    target: 'User-visible output and interaction',
    boundary: 'React render and jsdom DOM queries',
  },
  {
    name: 'Integration test',
    target: 'Router, provider, network mock, and UI states',
    boundary: 'Several frontend boundaries working together',
  },
  {
    name: 'E2E boundary',
    target: 'A real browser and real deployment surface',
    boundary: 'Documented for later work, not installed in this chapter',
  },
]

export function TestingBoundaryMap() {
  return (
    <section className="practice-panel" aria-labelledby="testing-boundary-title">
      <div className="topic-summary">
        <p className="skill-pill">Testing boundary</p>
        <h2 id="testing-boundary-title">Choose the smallest useful test layer</h2>
        <p>
          A quality gate should verify the rule at the layer that owns the behavior,
          not at the layer that happens to be easy to assert.
        </p>
      </div>

      <div className="testing-boundary-grid">
        {testingLayers.map((layer) => (
          <article className="topic-card" key={layer.name}>
            <h3>{layer.name}</h3>
            <p>{layer.target}</p>
            <span>{layer.boundary}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `testing layer objects rendered as visible cards`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `testing layer must match behavior owner` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `testing layer must match behavior owner`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

Catalog parser uses unit test; protected route uses integration test.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `testing layer objects rendered as visible cards` 追踪从 trigger 到 assertion 的证据链。

### 9.2 Vitest unit test：pure function、parser 与 reducer

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.ts` 建立一个具体测试边界。核心规则是：unit tests verify pure output and immutable transition。

**本节解决的问题：**

它解决学习者在 `describe / it / expect / assertNever` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `CartState reference, CartAction object, reducer return value`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

describe / it / expect / assertNever

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `CartState reference, CartAction object, reducer return value`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.ts</span>
  </div>

```ts
export type CartLine = {
  id: string
  name: string
  unitPrice: number
  quantity: number
}

export type CartState = {
  lines: CartLine[]
}

export type CartAction =
  | { type: 'addLine'; line: CartLine }
  | { type: 'changeQuantity'; lineId: string; quantity: number }
  | { type: 'removeLine'; lineId: string }

export function normalizeCatalogSearch(rawSearch: string): string {
  return rawSearch.trim().replace(/\s+/g, ' ').toLowerCase()
}

export function parsePositiveQuantity(rawQuantity: string): number | null {
  const quantity = Number(rawQuantity)

  if (!Number.isInteger(quantity) || quantity < 1) {
    return null
  }

  return quantity
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'addLine':
      if (state.lines.some((line) => line.id === action.line.id)) {
        return state
      }

      return { lines: [...state.lines, action.line] }

    case 'changeQuantity':
      return {
        lines: state.lines.map((line) =>
          line.id === action.lineId ? { ...line, quantity: action.quantity } : line,
        ),
      }

    case 'removeLine':
      return { lines: state.lines.filter((line) => line.id !== action.lineId) }

    default:
      return assertNever(action)
  }
}

function assertNever(action: never): never {
  throw new Error(`Unhandled cart action: ${JSON.stringify(action)}`)
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.test.ts</span>
  </div>

```ts
import { describe, expect, it } from 'vitest'
import {
  cartReducer,
  normalizeCatalogSearch,
  parsePositiveQuantity,
} from './cart-quality-rules'
import type { CartState } from './cart-quality-rules'

describe('cart quality rules', () => {
  it('normalizes catalog search input before filtering', () => {
    expect(normalizeCatalogSearch('  Desk    Lamp  ')).toBe('desk lamp')
  })

  it('parses only positive integer quantities', () => {
    expect(parsePositiveQuantity('3')).toBe(3)
    expect(parsePositiveQuantity('0')).toBeNull()
    expect(parsePositiveQuantity('2.5')).toBeNull()
    expect(parsePositiveQuantity('unknown')).toBeNull()
  })

  it('updates cart lines without mutating the previous state object', () => {
    const previousState: CartState = {
      lines: [{ id: 'lamp', name: 'Desk Lamp', unitPrice: 42, quantity: 1 }],
    }

    const nextState = cartReducer(previousState, {
      type: 'changeQuantity',
      lineId: 'lamp',
      quantity: 4,
    })

    expect(nextState).not.toBe(previousState)
    expect(nextState.lines[0]).toEqual({
      id: 'lamp',
      name: 'Desk Lamp',
      unitPrice: 42,
      quantity: 4,
    })
    expect(previousState.lines[0]?.quantity).toBe(1)
  })
})
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `CartState reference, CartAction object, reducer return value`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `unit tests verify pure output and immutable transition` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `unit tests verify pure output and immutable transition`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

Cart reducer and catalog parser are tested before UI.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `CartState reference, CartAction object, reducer return value` 追踪从 trigger 到 assertion 的证据链。

### 9.3 Component test：render、screen 与 user-visible output

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.tsx` 建立一个具体测试边界。核心规则是：component tests assert user-visible output, not internal state。

**本节解决的问题：**

它解决学习者在 `render / screen / getByRole / queryByRole` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `props object rendered to jsdom DOM`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

render / screen / getByRole / queryByRole

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `props object rendered to jsdom DOM`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.tsx</span>
  </div>

```tsx
type VisibleSummaryPanelProps = {
  productCount: number
  orderCount: number
  hasErrors: boolean
}

export function VisibleSummaryPanel({
  productCount,
  orderCount,
  hasErrors,
}: VisibleSummaryPanelProps) {
  return (
    <section className="practice-panel" aria-labelledby="visible-summary-title">
      <p className="skill-pill">Component output</p>
      <h2 id="visible-summary-title">Visible SellerHub summary</h2>
      <dl className="summary-list">
        <div>
          <dt>Visible products</dt>
          <dd>{productCount}</dd>
        </div>
        <div>
          <dt>Open orders</dt>
          <dd>{orderCount}</dd>
        </div>
      </dl>
      {hasErrors ? (
        <p role="alert">SellerHub needs attention.</p>
      ) : (
        <p>SellerHub is ready.</p>
      )}
    </section>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VisibleSummaryPanel } from './visible-summary-panel'

describe('VisibleSummaryPanel', () => {
  it('renders user-visible summary output', () => {
    render(<VisibleSummaryPanel hasErrors={false} orderCount={2} productCount={5} />)

    expect(
      screen.getByRole('heading', { name: 'Visible SellerHub summary' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Visible products')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('SellerHub is ready.')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('renders the alert branch when the summary has errors', () => {
    render(<VisibleSummaryPanel hasErrors orderCount={0} productCount={0} />)

    expect(screen.getByRole('alert')).toHaveTextContent('SellerHub needs attention.')
  })
})
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `props object rendered to jsdom DOM`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `component tests assert user-visible output, not internal state` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `component tests assert user-visible output, not internal state`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

Dashboard summary and error branch tests use visible text.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `props object rendered to jsdom DOM` 追踪从 trigger 到 assertion 的证据链。

### 9.4 getByRole / getByLabelText 与 accessibility-first query

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.tsx` 建立一个具体测试边界。核心规则是：queries should follow accessible UI structure。

**本节解决的问题：**

它解决学习者在 `role / label / accessible name / alert` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `label htmlFor/id association and button accessible name`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

role / label / accessible name / alert

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `label htmlFor/id association and button accessible name`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.tsx</span>
  </div>

```tsx
type AccessibleLoginFormProps = {
  errorMessage?: string
}

export function AccessibleLoginForm({ errorMessage }: AccessibleLoginFormProps) {
  return (
    <form className="practice-panel" aria-labelledby="accessible-login-title">
      <p className="skill-pill">Accessible query</p>
      <h2 id="accessible-login-title">Seller login</h2>

      <label className="field-label" htmlFor="seller-email">
        Email
      </label>
      <input className="text-input" id="seller-email" name="email" type="email" />

      <label className="field-label" htmlFor="seller-password">
        Password
      </label>
      <input className="text-input" id="seller-password" name="password" type="password" />

      {errorMessage ? <p role="alert">{errorMessage}</p> : null}

      <button type="submit">Sign in</button>
    </form>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AccessibleLoginForm } from './accessible-login-form'

describe('AccessibleLoginForm', () => {
  it('exposes fields and actions through accessible names', () => {
    render(<AccessibleLoginForm />)

    expect(screen.getByRole('heading', { name: 'Seller login' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeEnabled()
  })

  it('lets the test observe error feedback through an alert role', () => {
    render(<AccessibleLoginForm errorMessage="Invalid credentials" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials')
  })
})
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `label htmlFor/id association and button accessible name`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `queries should follow accessible UI structure` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `queries should follow accessible UI structure`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

Login and checkout forms must be queryable by label and role.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `label htmlFor/id association and button accessible name` 追踪从 trigger 到 assertion 的证据链。

### 9.5 userEvent 与真实交互序列

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.tsx` 建立一个具体测试边界。核心规则是：userEvent simulates interaction sequence and must be awaited。

**本节解决的问题：**

它解决学习者在 `userEvent.setup / click / clear / type` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `input draft string, event.currentTarget value, state setter`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

userEvent.setup / click / clear / type

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `input draft string, event.currentTarget value, state setter`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { ChangeEvent } from 'react'

type QuantityStepperProps = {
  initialQuantity?: number
  maxQuantity?: number
}

export function QuantityStepper({
  initialQuantity = 1,
  maxQuantity = 5,
}: QuantityStepperProps) {
  const [quantityText, setQuantityText] = useState(String(initialQuantity))
  const quantity = parseQuantityText(quantityText)

  function decreaseQuantity(): void {
    setQuantityText((currentQuantityText) =>
      String(Math.max(1, parseQuantityText(currentQuantityText) - 1)),
    )
  }

  function increaseQuantity(): void {
    setQuantityText((currentQuantityText) =>
      String(Math.min(maxQuantity, parseQuantityText(currentQuantityText) + 1)),
    )
  }

  function handleQuantityInput(event: ChangeEvent<HTMLInputElement>): void {
    const nextQuantityText = event.currentTarget.value

    if (nextQuantityText === '') {
      setQuantityText('')
      return
    }

    const nextQuantity = Number(nextQuantityText)

    if (Number.isInteger(nextQuantity) && nextQuantity > 0) {
      setQuantityText(String(Math.min(maxQuantity, nextQuantity)))
    }
  }

  return (
    <section className="practice-panel" aria-labelledby="quantity-stepper-title">
      <p className="skill-pill">user-event</p>
      <h2 id="quantity-stepper-title">Cart quantity</h2>
      <div className="quantity-control">
        <button onClick={decreaseQuantity} type="button">
          Decrease quantity
        </button>
        <label className="field-label" htmlFor="cart-quantity">
          Quantity
        </label>
        <input
          className="text-input"
          id="cart-quantity"
          inputMode="numeric"
          onChange={handleQuantityInput}
          value={quantityText}
        />
        <button onClick={increaseQuantity} type="button">
          Increase quantity
        </button>
      </div>
      <p aria-live="polite">Current quantity: {quantity}</p>
    </section>
  )
}

function parseQuantityText(quantityText: string): number {
  const quantity = Number(quantityText)
  return Number.isInteger(quantity) && quantity > 0 ? quantity : 1
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { QuantityStepper } from './quantity-stepper'

describe('QuantityStepper', () => {
  it('updates quantity through a realistic click sequence', async () => {
    const user = userEvent.setup()

    render(<QuantityStepper initialQuantity={1} maxQuantity={3} />)

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))

    expect(screen.getByLabelText('Quantity')).toHaveDisplayValue('3')
    expect(screen.getByText('Current quantity: 3')).toBeInTheDocument()
  })

  it('updates quantity through typed input', async () => {
    const user = userEvent.setup()

    render(<QuantityStepper initialQuantity={2} maxQuantity={5} />)

    const input = screen.getByLabelText('Quantity')

    await user.clear(input)
    await user.type(input, '4')

    expect(input).toHaveDisplayValue('4')
    expect(screen.getByText('Current quantity: 4')).toBeInTheDocument()
  })
})
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `input draft string, event.currentTarget value, state setter`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `userEvent simulates interaction sequence and must be awaited` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `userEvent simulates interaction sequence and must be awaited`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

Cart quantity and product quantity controls need realistic typing.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `input draft string, event.currentTarget value, state setter` 追踪从 trigger 到 assertion 的证据链。

### 9.6 Async UI test：findBy、waitFor 与 loading/error/success

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.tsx` 建立一个具体测试边界。核心规则是：async tests wait for DOM changes, not fixed sleep。

**本节解决的问题：**

它解决学习者在 `Promise / deferred / findBy / status / alert` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `pending state, deferred promise, success or error state`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

Promise / deferred / findBy / status / alert

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `pending state, deferred promise, success or error state`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.tsx</span>
  </div>

```tsx
import { useState } from 'react'

type OrderSummary = {
  id: string
  label: string
}

type AsyncOrderStatusPanelProps = {
  loadOrders: () => Promise<OrderSummary[]>
}

type OrderStatus =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; orders: OrderSummary[] }
  | { status: 'error'; message: string }

export function AsyncOrderStatusPanel({ loadOrders }: AsyncOrderStatusPanelProps) {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({ status: 'idle' })

  async function handleLoadOrders(): Promise<void> {
    setOrderStatus({ status: 'pending' })

    try {
      const orders = await loadOrders()
      setOrderStatus({ status: 'success', orders })
    } catch {
      setOrderStatus({ status: 'error', message: 'Orders could not be loaded.' })
    }
  }

  return (
    <section className="practice-panel" aria-labelledby="async-orders-title">
      <p className="skill-pill">Async UI</p>
      <h2 id="async-orders-title">Seller orders</h2>
      <button onClick={handleLoadOrders} type="button">
        Load orders
      </button>

      {orderStatus.status === 'idle' ? <p>Select load orders to start.</p> : null}
      {orderStatus.status === 'pending' ? <p role="status">Loading orders...</p> : null}
      {orderStatus.status === 'error' ? <p role="alert">{orderStatus.message}</p> : null}
      {orderStatus.status === 'success' && orderStatus.orders.length === 0 ? (
        <p>No orders found.</p>
      ) : null}
      {orderStatus.status === 'success' && orderStatus.orders.length > 0 ? (
        <ul aria-label="Loaded orders">
          {orderStatus.orders.map((order) => (
            <li key={order.id}>{order.label}</li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AsyncOrderStatusPanel } from './async-order-status-panel'

describe('AsyncOrderStatusPanel', () => {
  it('waits for loading to become success output', async () => {
    const user = userEvent.setup()
    const deferredOrders = createDeferred([{ id: 'order-1001', label: 'Order 1001' }])
    const loadOrders = vi.fn(() => deferredOrders.promise)

    render(<AsyncOrderStatusPanel loadOrders={loadOrders} />)

    await user.click(screen.getByRole('button', { name: 'Load orders' }))

    expect(screen.getByRole('status')).toHaveTextContent('Loading orders...')

    deferredOrders.resolve()

    expect(await screen.findByText('Order 1001')).toBeInTheDocument()
    expect(loadOrders).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('renders an error branch when the promise rejects', async () => {
    const user = userEvent.setup()
    const loadOrders = vi.fn(() => Promise.reject(new Error('Network failed')))

    render(<AsyncOrderStatusPanel loadOrders={loadOrders} />)

    await user.click(screen.getByRole('button', { name: 'Load orders' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Orders could not be loaded.',
    )
  })
})

function createDeferred<TValue>(value: TValue) {
  let resolvePromise!: () => void
  const promise = new Promise<TValue>((resolve) => {
    resolvePromise = () => resolve(value)
  })

  return {
    promise,
    resolve: resolvePromise,
  }
}
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `pending state, deferred promise, success or error state`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `async tests wait for DOM changes, not fixed sleep` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `async tests wait for DOM changes, not fixed sleep`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

Orders loading, empty, error, and success states use this model.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `pending state, deferred promise, success or error state` 追踪从 trigger 到 assertion 的证据链。

### 9.7 Controlled form behavior test

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.tsx` 建立一个具体测试边界。核心规则是：form tests verify user input and submitted payload。

**本节解决的问题：**

它解决学习者在 `preventDefault / selectOptions / checkbox / vi.fn` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `form values object and submit mock call`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

preventDefault / selectOptions / checkbox / vi.fn

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `form values object and submit mock call`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { FormEvent } from 'react'

type SellerFilterValues = {
  query: string
  status: 'all' | 'active' | 'archived'
  inStockOnly: boolean
}

type SellerFilterFormProps = {
  onApply: (values: SellerFilterValues) => void
}

export function SellerFilterForm({ onApply }: SellerFilterFormProps) {
  const [values, setValues] = useState<SellerFilterValues>({
    query: '',
    status: 'all',
    inStockOnly: false,
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    onApply(values)
  }

  return (
    <form className="practice-panel" onSubmit={handleSubmit}>
      <p className="skill-pill">Controlled form test</p>
      <h2>Catalog filter</h2>

      <label className="field-label" htmlFor="catalog-query">
        Search products
      </label>
      <input
        className="text-input"
        id="catalog-query"
        onChange={(event) => {
          const query = event.currentTarget.value

          setValues((currentValues) => ({
            ...currentValues,
            query,
          }))
        }}
        value={values.query}
      />

      <label className="field-label" htmlFor="catalog-status">
        Product status
      </label>
      <select
        id="catalog-status"
        onChange={(event) => {
          const status = event.currentTarget.value as SellerFilterValues['status']

          setValues((currentValues) => ({
            ...currentValues,
            status,
          }))
        }}
        value={values.status}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>

      <label className="checkbox-row">
        <input
          checked={values.inStockOnly}
          onChange={(event) => {
            const inStockOnly = event.currentTarget.checked

            setValues((currentValues) => ({
              ...currentValues,
              inStockOnly,
            }))
          }}
          type="checkbox"
        />
        In stock only
      </label>

      <button type="submit">Apply filters</button>
    </form>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SellerFilterForm } from './seller-filter-form'

describe('SellerFilterForm', () => {
  it('submits the current controlled form values', async () => {
    const user = userEvent.setup()
    const handleApply = vi.fn()

    render(<SellerFilterForm onApply={handleApply} />)

    await user.type(screen.getByLabelText('Search products'), 'lamp')
    await user.selectOptions(screen.getByLabelText('Product status'), 'active')
    await user.click(screen.getByRole('checkbox', { name: 'In stock only' }))
    await user.click(screen.getByRole('button', { name: 'Apply filters' }))

    expect(handleApply).toHaveBeenCalledWith({
      query: 'lamp',
      status: 'active',
      inStockOnly: true,
    })
  })
})
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `form values object and submit mock call`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `form tests verify user input and submitted payload` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `form tests verify user input and submitted payload`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

Catalog filter and login forms use controlled values.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `form values object and submit mock call` 追踪从 trigger 到 assertion 的证据链。

### 9.8 Router integration test 与 initial route

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.tsx` 建立一个具体测试边界。核心规则是：router tests must provide router context。

**本节解决的问题：**

它解决学习者在 `MemoryRouter / initialEntries / Navigate / useParams` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `router location, params object, redirect state`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

MemoryRouter / initialEntries / Navigate / useParams

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `router location, params object, redirect state`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.tsx</span>
  </div>

```tsx
import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router'

type SellerRouteWorkspaceProps = {
  isAuthenticated?: boolean
}

export function SellerRouteWorkspace({ isAuthenticated = false }: SellerRouteWorkspaceProps) {
  return (
    <Routes>
      <Route element={<CatalogRoute />} path="/catalog" />
      <Route element={<SellerOrderRoute />} path="/seller/orders/:orderId" />
      <Route
        element={<ProtectedOrdersRoute isAuthenticated={isAuthenticated} />}
        path="/seller/orders"
      />
      <Route element={<LoginRoute />} path="/login" />
    </Routes>
  )
}

function CatalogRoute() {
  return (
    <section>
      <h2>Catalog route</h2>
      <Link to="/seller/orders">Open seller orders</Link>
    </section>
  )
}

function SellerOrderRoute() {
  const params = useParams()

  return <h2>Order detail {params.orderId}</h2>
}

function ProtectedOrdersRoute({ isAuthenticated }: { isAuthenticated: boolean }) {
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location.pathname }} to="/login" />
  }

  return <h2>Seller orders route</h2>
}

function LoginRoute() {
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/seller/orders'

  return (
    <section>
      <h2>Login route</h2>
      <p>Redirect target: {from}</p>
    </section>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { SellerRouteWorkspace } from './seller-route-workspace'

describe('SellerRouteWorkspace', () => {
  it('renders a route using an initial location', () => {
    render(
      <MemoryRouter initialEntries={['/seller/orders/1001']}>
        <SellerRouteWorkspace isAuthenticated />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Order detail 1001' })).toBeInTheDocument()
  })

  it('renders the protected route guard with redirect context', async () => {
    render(
      <MemoryRouter initialEntries={['/seller/orders']}>
        <SellerRouteWorkspace />
      </MemoryRouter>,
    )

    expect(await screen.findByRole('heading', { name: 'Login route' })).toBeInTheDocument()
    expect(screen.getByText('Redirect target: /seller/orders')).toBeInTheDocument()
  })
})
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `router location, params object, redirect state`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `router tests must provide router context` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `router tests must provide router context`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

Protected seller routes and product params use initial route tests.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `router location, params object, redirect state` 追踪从 trigger 到 assertion 的证据链。

### 9.9 Context provider / custom hook boundary test

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences-context.ts` 建立一个具体测试边界。核心规则是：custom hooks are tested through a provider-backed component。

**本节解决的问题：**

它解决学习者在 `createContext / useContext / provider wrapper` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `context value object and real consumer component`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

createContext / useContext / provider wrapper

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `context value object and real consumer component`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences-context.ts</span>
  </div>

```ts
import { createContext, useContext } from 'react'

export type SellerPreferences = {
  currency: 'USD' | 'EUR'
  compactMode: boolean
}

export const SellerPreferencesContext = createContext<SellerPreferences | null>(null)

export function useSellerPreferences(): SellerPreferences {
  const preferences = useContext(SellerPreferencesContext)

  if (!preferences) {
    throw new Error('useSellerPreferences must be used within SellerPreferencesProvider')
  }

  return preferences
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SellerPreferenceSummary } from './seller-preference-summary'
import { SellerPreferencesProvider } from './seller-preferences-provider'

describe('SellerPreferenceSummary', () => {
  it('reads custom hook output through the provider boundary', () => {
    render(
      <SellerPreferencesProvider value={{ compactMode: true, currency: 'EUR' }}>
        <SellerPreferenceSummary />
      </SellerPreferencesProvider>,
    )

    expect(screen.getByText('Currency: EUR')).toBeInTheDocument()
    expect(screen.getByText('Compact mode: enabled')).toBeInTheDocument()
  })
})
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `context value object and real consumer component`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `custom hooks are tested through a provider-backed component` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `custom hooks are tested through a provider-backed component`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

Auth and preferences context need wrapper tests.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `context value object and real consumer component` 追踪从 trigger 到 assertion 的证据链。

### 9.10 MSW 与 network boundary mock

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.tsx` 建立一个具体测试边界。核心规则是：mock the request boundary, not component internals。

**本节解决的问题：**

它解决学习者在 `MSW / http.get / HttpResponse / server.use` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `fetch request, MSW handler, response payload, UI state`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

MSW / http.get / HttpResponse / server.use

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `fetch request, MSW handler, response payload, UI state`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import { fetchSellerOrders } from './seller-orders-api'
import type { SellerOrderRecord } from './seller-orders-api'

type NetworkOrderState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; orders: SellerOrderRecord[] }
  | { status: 'error'; message: string }

export function SellerOrdersNetworkPanel() {
  const [orderState, setOrderState] = useState<NetworkOrderState>({ status: 'idle' })

  async function handleLoadOrders(): Promise<void> {
    setOrderState({ status: 'pending' })

    try {
      const orders = await fetchSellerOrders('open')
      setOrderState({ status: 'success', orders })
    } catch {
      setOrderState({ status: 'error', message: 'Network order request failed.' })
    }
  }

  return (
    <section className="practice-panel" aria-labelledby="network-orders-title">
      <p className="skill-pill">MSW</p>
      <h2 id="network-orders-title">Network-backed seller orders</h2>
      <button onClick={handleLoadOrders} type="button">
        Load network orders
      </button>
      {orderState.status === 'idle' ? <p>No request has started.</p> : null}
      {orderState.status === 'pending' ? <p role="status">Loading network orders...</p> : null}
      {orderState.status === 'error' ? <p role="alert">{orderState.message}</p> : null}
      {orderState.status === 'success' ? (
        <ul aria-label="Network orders">
          {orderState.orders.map((order) => (
            <li key={order.id}>
              {order.customer}: ${order.total}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.msw.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { delay, http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from '../sellerhub-tested-workflow/sellerhub-test-server'
import { SellerOrdersNetworkPanel } from './seller-orders-network-panel'

describe('SellerOrdersNetworkPanel', () => {
  it('uses MSW to mock the request boundary instead of component internals', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('/api/testing/orders', async () => {
        await delay(50)
        return HttpResponse.json([{ id: 'order-2001', customer: 'Ava', total: 156 }])
      }),
    )

    render(<SellerOrdersNetworkPanel />)

    await user.click(screen.getByRole('button', { name: 'Load network orders' }))

    expect(screen.getByRole('status')).toHaveTextContent('Loading network orders...')
    expect(await screen.findByText('Ava: $156')).toBeInTheDocument()
  })
})
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `fetch request, MSW handler, response payload, UI state`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `mock the request boundary, not component internals` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `mock the request boundary, not component internals`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

Orders and product detail API tests use MSW.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `fetch request, MSW handler, response payload, UI state` 追踪从 trigger 到 assertion 的证据链。

### 9.11 Error boundary 与错误状态测试

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.tsx` 建立一个具体测试边界。核心规则是：Error Boundary catches render errors, not event or async request failures。

**本节解决的问题：**

它解决学习者在 `getDerivedStateFromError / componentDidCatch / fallback` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `render throw, boundary state, fallback alert`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

getDerivedStateFromError / componentDidCatch / fallback

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `render throw, boundary state, fallback alert`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.tsx</span>
  </div>

```tsx
import { Component } from 'react'
import type { ReactNode } from 'react'

type RenderErrorBoundaryProps = {
  children: ReactNode
}

type RenderErrorBoundaryState = {
  hasError: boolean
}

export class RenderErrorBoundary extends Component<
  RenderErrorBoundaryProps,
  RenderErrorBoundaryState
> {
  state: RenderErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): RenderErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(): void {}

  render() {
    if (this.state.hasError) {
      return <p role="alert">SellerHub section failed to render.</p>
    }

    return this.props.children
  }
}

export function CrashingSellerWidget(): ReactNode {
  throw new Error('Seller widget render failed')
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CrashingSellerWidget, RenderErrorBoundary } from './render-error-boundary'

describe('RenderErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders fallback UI for render-time errors', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <RenderErrorBoundary>
        <CrashingSellerWidget />
      </RenderErrorBoundary>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'SellerHub section failed to render.',
    )
  })
})
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `render throw, boundary state, fallback alert`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `Error Boundary catches render errors, not event or async request failures` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `Error Boundary catches render errors, not event or async request failures`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

Widget crash uses boundary; API failure uses error state.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `render throw, boundary state, fallback alert` 追踪从 trigger 到 assertion 的证据链。

### 9.12 Quality gates：lint、typecheck、test、build 与 CI command model

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.ts` 建立一个具体测试边界。核心规则是：quality gates are separate and cannot replace each other。

**本节解决的问题：**

它解决学习者在 `lint / typecheck / test / build / CI` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `command array, gate name union, assertion result`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

lint / typecheck / test / build / CI

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `command array, gate name union, assertion result`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.ts</span>
  </div>

```ts
export type QualityGateName = 'lint' | 'typecheck' | 'test' | 'build'

export type QualityGateCommand = {
  name: QualityGateName
  command: string
  verifies: string
}

export const qualityGateCommands: QualityGateCommand[] = [
  {
    name: 'lint',
    command: 'npm run lint',
    verifies: 'Static code rules and hook lint rules',
  },
  {
    name: 'typecheck',
    command: 'npm run typecheck',
    verifies: 'TypeScript compile-time relationships',
  },
  {
    name: 'test',
    command: 'npm run test',
    verifies: 'Runtime behavior and user-visible outcomes',
  },
  {
    name: 'build',
    command: 'npm run build',
    verifies: 'Production TypeScript and Vite build pipeline',
  },
]

export function summarizeQualityGate(commands: QualityGateCommand[]): string {
  return commands.map((command) => command.name).join(' -> ')
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.test.ts</span>
  </div>

```ts
import { describe, expect, it } from 'vitest'
import { qualityGateCommands, summarizeQualityGate } from './quality-gate-command-model'

describe('quality gate command model', () => {
  it('keeps lint, typecheck, test, and build as separate gates', () => {
    expect(summarizeQualityGate(qualityGateCommands)).toBe(
      'lint -> typecheck -> test -> build',
    )
  })

  it('documents the behavior verified by the test gate', () => {
    expect(qualityGateCommands.find((command) => command.name === 'test')).toMatchObject({
      command: 'npm run test',
      verifies: 'Runtime behavior and user-visible outcomes',
    })
  })
})
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `command array, gate name union, assertion result`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `quality gates are separate and cannot replace each other` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `quality gates are separate and cannot replace each other`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

SellerHub changes should run all four gates.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `command array, gate name union, assertion result` 追踪从 trigger 到 assertion 的证据链。

### 9.13 SellerHub testing architecture mapping

**结论：**

本节围绕 `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts` 建立一个具体测试边界。核心规则是：architecture maps business behavior to the smallest useful test layer。

**本节解决的问题：**

它解决学习者在 `CatalogFilterValues / LoginValues / SellerOrder / SellerAuthValue` 场景中不知道测什么、在哪里测、失败后如何定位 owner 的问题。

**技术意义：**

当这个边界清楚时，测试失败会指向 `domain type boundary shared by tests and components`，而不是把 React、browser、TypeScript 和 network 问题混在一起。

**新关键字和新概念：**

CatalogFilterValues / LoginValues / SellerOrder / SellerAuthValue

**边界：JavaScript runtime / React render-commit / Testing Library / Vitest / jsdom / MSW / TypeScript / tooling / CI / architecture convention：**

JavaScript runtime 创建函数、对象、Promise 或 handler；React 只在 component 示例中负责 render 和 commit；Testing Library 从 jsdom 查询用户可见 DOM；Vitest 执行 test callback 和 assertion；MSW 只在 request 示例中接管 network boundary；TypeScript 在 compile time 检查类型关系，但不会替代 runtime behavior test。

**底层机制：**

触发点是 test runner 执行对应 test file 或用户交互。具体值流是 `domain type boundary shared by tests and components`。测试先安排输入或 wrapper，再触发 render、event、Promise 或 request，最后用 assertion 判断可观察结果。

**API / 语法规则：**

如果本节没有新 API，重点是测试边界和质量门禁；否则 API 以本节代码中的 import 和 call signature 为准。

**固定属性名 / 固定方法名 / 参数签名：**

固定名称来自代码中的 public API、role、label、handler、route path 或 npm script；不要断言 private variable。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts</span>
  </div>

```ts
export type SellerOrder = {
  id: string
  customer: string
  status: 'open' | 'shipped'
  total: number
}

export type LoginValues = {
  email: string
  password: string
}

export type CatalogFilterValues = {
  query: string
  status: 'all' | 'active' | 'archived'
}

export type SellerAuthValue = {
  isAuthenticated: boolean
  sellerName: string | null
  signIn: (sellerName: string) => void
  signOut: () => void
}

export type CartLine = {
  id: string
  name: string
  quantity: number
}

export type CartState = {
  lines: CartLine[]
}

export type CartAction =
  | { type: 'addLine'; line: CartLine }
  | { type: 'setQuantity'; lineId: string; quantity: number }
  | { type: 'removeLine'; lineId: string }
```
</div>

**测试代码逐行解释：**

代码先导入被测目标和 testing API，再 arrange 输入或 wrapper，act 阶段通过 function call、`render`、`userEvent`、Promise resolve、MSW handler 或 router location 触发行为，assert 阶段只检查 visible output、return value、mock call 或 command model。

**执行过程：**

Vitest 加载 module，执行 test callback；React 示例由 RTL render 到 jsdom；userEvent 触发真实交互序列；async 示例等待 Promise 或 DOM mutation；MSW 示例由 handler 返回 response；assertion 失败时 Vitest 打印 expected/received 或 Testing Library DOM snapshot。

**变量、引用、state snapshot、DOM query、Promise、mock request、test assertion、provider wrapper、router location 的变化：**

本节重点跟踪 `domain type boundary shared by tests and components`。引用是否改变、state snapshot 是否更新、DOM query 何时能找到节点、Promise 何时 settle、handler 是否被 reset，都是判断测试是否可靠的证据。

**为什么测试通过或失败：**

测试通过表示 public behavior 和 `architecture maps business behavior to the smallest useful test layer` 一致；失败通常说明 owner 边界选错、wrapper 缺失、query 不符合 accessible output、Promise 未等待、handler 污染、或 TypeScript 只通过了静态关系但 runtime 行为不正确。

**对比写法：**

对比错误写法是测试 implementation detail、直接读 private state、大量使用 test id、用 sleep 等待、忘记 wrapper、mock component internals、或只跑 build。正确写法从用户行为、业务规则和 request/provider/router boundary 出发。

**常见错误违反了哪条规则：**

违反的规则是 `architecture maps business behavior to the smallest useful test layer`。识别信号是失败信息离真实 bug 很远，或者重构内部实现后测试坏了但用户行为没坏。

**如何识别类似错误：**

看失败信息：missing role/label 是 DOM semantics；unhandled request 是 MSW boundary；hook context error 是 provider/router wrapper；expected object mismatch 是 pure rule；type error 是 compile-time relation。

**与 SellerHub 的关系：**

SellerHub testing starts from business boundary, not private state.

**与当前 React 学习主线的关系：**

本节把前面章节的 props、state、forms、async data、router、context、error boundary 或 performance command model 转成可重复质量证据。

**本节最终记忆模型：**

先找 owner，再选测试层；围绕 `domain type boundary shared by tests and components` 追踪从 trigger 到 assertion 的证据链。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| `describe` / `it` / `expect` | Vitest | 定义和断言测试。 | 忘记 await async assertion。 |
| `render` | React Testing Library | 把 UI render 到 jsdom。 | 裸 render 需要 wrapper 的 component。 |
| `screen.getByRole` | Testing Library | 按 role/name 查元素。 | 用它查异步元素。 |
| `screen.queryByRole` | Testing Library | 查可选或不存在元素。 | 用 getBy 做 negative assertion。 |
| `screen.findByText` | Testing Library | 等待 DOM 稍后出现。 | 用 sleep 代替。 |
| `userEvent.setup` | Testing Library | 创建用户交互实例。 | 不 await click/type。 |
| `http.get` / `HttpResponse.json` | MSW | Mock request boundary。 | Mock component internal helper。 |
| `MemoryRouter initialEntries` | React Router | 提供 initial route。 | 忘记 router context。 |
| `getDerivedStateFromError` | React | 捕获 render error。 | 期待捕获 async request error。 |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| 测试 internal state | Strategy | 测用户可见行为。 | 改用 role/label/text。 | 重构内部实现后测试无意义失败。 |
| 默认 `getByTestId` | Accessibility | 优先 accessible query。 | 用 getByRole/getByLabelText。 | label 断了测试仍通过。 |
| async UI 立即 getBy | Timing | DOM 可能稍后 commit。 | 用 findBy/waitFor。 | CI 偶发失败。 |
| fixed sleep | Timing | 不依赖机器速度。 | 等待 DOM 或 mock call。 | 本地和 CI 时间表现不同。 |
| 忘记 Router wrapper | Router | hooks 需要 router context。 | 用 MemoryRouter。 | 报 router context 错误。 |
| 忘记 Provider wrapper | Context | consumer 需要 provider subtree。 | 用 provider wrapper。 | custom hook 抛 provider 错误。 |
| MSW handler 不 reset | Isolation | tests 不能污染。 | setup afterEach resetHandlers。 | 单跑通过，整套失败。 |
| 只跑 build | Quality gate | build 不替代 test/typecheck/lint。 | 四个 gate 都跑。 | bundle 成功但行为坏。 |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。

### 12.1 项目目标

`SellerHub Tested Workflow` 集成 pure reducer/parser unit test、controlled login form behavior test、MSW async orders test、router initial route test、protected route UI guard、provider/custom hook wrapper test、accessibility-first queries、userEvent interaction、jest-dom assertions、error boundary fallback 和 quality gate command model。它服务后续 SellerHub 学习，但不实现完整 SellerHub，不引入真实后端、Playwright、React Hook Form、Zod 或 TanStack Query。

### 12.2 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-rules.ts
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-context.ts
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-provider.tsx
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-catalog-filter.tsx
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.tsx
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-panel.tsx
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-protected-route.tsx
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-workflow-routes.tsx
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.tsx
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-handlers.ts
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-server.ts
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-reducer.test.ts
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.behavior.test.tsx
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-msw.behavior.test.tsx
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-router-integration.behavior.test.tsx
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-context-hook-boundary.behavior.test.tsx
src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.behavior.test.tsx
```
</div>

### 12.3 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts</span>
  </div>

```ts
export type SellerOrder = {
  id: string
  customer: string
  status: 'open' | 'shipped'
  total: number
}

export type LoginValues = {
  email: string
  password: string
}

export type CatalogFilterValues = {
  query: string
  status: 'all' | 'active' | 'archived'
}

export type SellerAuthValue = {
  isAuthenticated: boolean
  sellerName: string | null
  signIn: (sellerName: string) => void
  signOut: () => void
}

export type CartLine = {
  id: string
  name: string
  quantity: number
}

export type CartState = {
  lines: CartLine[]
}

export type CartAction =
  | { type: 'addLine'; line: CartLine }
  | { type: 'setQuantity'; lineId: string; quantity: number }
  | { type: 'removeLine'; lineId: string }
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-rules.ts</span>
  </div>

```ts
import type { CartAction, CartState } from './sellerhub-testing-types'

export function parseCatalogFilterQuery(rawQuery: string): string {
  return rawQuery.trim().replace(/\s+/g, ' ').toLowerCase()
}

export function sellerCartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'addLine':
      if (state.lines.some((line) => line.id === action.line.id)) {
        return state
      }

      return { lines: [...state.lines, action.line] }

    case 'setQuantity':
      return {
        lines: state.lines.map((line) =>
          line.id === action.lineId ? { ...line, quantity: action.quantity } : line,
        ),
      }

    case 'removeLine':
      return { lines: state.lines.filter((line) => line.id !== action.lineId) }

    default:
      return assertNever(action)
  }
}

function assertNever(action: never): never {
  throw new Error(`Unhandled seller cart action: ${JSON.stringify(action)}`)
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-context.ts</span>
  </div>

```ts
import { createContext, useContext } from 'react'
import type { SellerAuthValue } from './sellerhub-testing-types'

export const SellerAuthContext = createContext<SellerAuthValue | null>(null)

export function useSellerAuth(): SellerAuthValue {
  const auth = useContext(SellerAuthContext)

  if (!auth) {
    throw new Error('useSellerAuth must be used within SellerAuthProvider')
  }

  return auth
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-provider.tsx</span>
  </div>

```tsx
import { useMemo, useState } from 'react'
import { SellerAuthContext } from './sellerhub-auth-context'
import type { ReactNode } from 'react'
import type { SellerAuthValue } from './sellerhub-testing-types'

type SellerAuthProviderProps = {
  children: ReactNode
  initialSellerName?: string | null
}

export function SellerAuthProvider({
  children,
  initialSellerName = null,
}: SellerAuthProviderProps) {
  const [sellerName, setSellerName] = useState<string | null>(initialSellerName)

  const authValue = useMemo<SellerAuthValue>(
    () => ({
      isAuthenticated: sellerName !== null,
      sellerName,
      signIn: (nextSellerName) => setSellerName(nextSellerName),
      signOut: () => setSellerName(null),
    }),
    [sellerName],
  )

  return <SellerAuthContext value={authValue}>{children}</SellerAuthContext>
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-catalog-filter.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { CatalogFilterValues } from './sellerhub-testing-types'

type SellerHubCatalogFilterProps = {
  onApply: (values: CatalogFilterValues) => void
}

export function SellerHubCatalogFilter({ onApply }: SellerHubCatalogFilterProps) {
  const [values, setValues] = useState<CatalogFilterValues>({
    query: '',
    status: 'all',
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    onApply(values)
  }

  return (
    <form className="workflow-card" onSubmit={handleSubmit}>
      <h3>Catalog filter</h3>
      <label className="field-label" htmlFor="workflow-catalog-query">
        Search catalog
      </label>
      <input
        className="text-input"
        id="workflow-catalog-query"
        onChange={(event) => {
          const query = event.currentTarget.value

          setValues((currentValues) => ({
            ...currentValues,
            query,
          }))
        }}
        value={values.query}
      />

      <label className="field-label" htmlFor="workflow-catalog-status">
        Catalog status
      </label>
      <select
        id="workflow-catalog-status"
        onChange={(event) => {
          const status = event.currentTarget.value as CatalogFilterValues['status']

          setValues((currentValues) => ({
            ...currentValues,
            status,
          }))
        }}
        value={values.status}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>

      <button type="submit">Apply catalog filter</button>
    </form>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { LoginValues } from './sellerhub-testing-types'

type SellerHubLoginFormProps = {
  isPending?: boolean
  onSubmit: (values: LoginValues) => void
}

export function SellerHubLoginForm({ isPending = false, onSubmit }: SellerHubLoginFormProps) {
  const [values, setValues] = useState<LoginValues>({
    email: '',
    password: '',
  })
  const [validationMessage, setValidationMessage] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (!values.email.includes('@') || values.password.length < 6) {
      setValidationMessage('Enter a valid email and password.')
      return
    }

    setValidationMessage(null)
    onSubmit(values)
  }

  return (
    <form className="workflow-card" onSubmit={handleSubmit}>
      <h3>Seller login</h3>
      <label className="field-label" htmlFor="workflow-login-email">
        Email
      </label>
      <input
        className="text-input"
        id="workflow-login-email"
        onChange={(event) => {
          const email = event.currentTarget.value

          setValues((currentValues) => ({
            ...currentValues,
            email,
          }))
        }}
        type="email"
        value={values.email}
      />

      <label className="field-label" htmlFor="workflow-login-password">
        Password
      </label>
      <input
        className="text-input"
        id="workflow-login-password"
        onChange={(event) => {
          const password = event.currentTarget.value

          setValues((currentValues) => ({
            ...currentValues,
            password,
          }))
        }}
        type="password"
        value={values.password}
      />

      {validationMessage ? <p role="alert">{validationMessage}</p> : null}

      <button disabled={isPending} type="submit">
        {isPending ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-panel.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { SellerOrder } from './sellerhub-testing-types'

type OrdersState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; orders: SellerOrder[] }
  | { status: 'error'; message: string }

export function SellerHubOrdersPanel() {
  const [ordersState, setOrdersState] = useState<OrdersState>({ status: 'idle' })

  async function handleLoadOrders(): Promise<void> {
    setOrdersState({ status: 'pending' })

    try {
      const response = await fetch('/api/seller/orders')

      if (!response.ok) {
        throw new Error(`Orders request failed with status ${response.status}`)
      }

      const payload = (await response.json()) as SellerOrder[]
      setOrdersState({ status: 'success', orders: payload })
    } catch {
      setOrdersState({ status: 'error', message: 'Unable to load seller orders.' })
    }
  }

  return (
    <section className="workflow-card" aria-labelledby="workflow-orders-title">
      <h3 id="workflow-orders-title">Seller orders</h3>
      <button onClick={handleLoadOrders} type="button">
        Load seller orders
      </button>

      {ordersState.status === 'idle' ? <p>No orders loaded.</p> : null}
      {ordersState.status === 'pending' ? <p role="status">Loading seller orders...</p> : null}
      {ordersState.status === 'error' ? <p role="alert">{ordersState.message}</p> : null}
      {ordersState.status === 'success' && ordersState.orders.length === 0 ? (
        <p>No seller orders found.</p>
      ) : null}
      {ordersState.status === 'success' && ordersState.orders.length > 0 ? (
        <ul aria-label="Seller order results">
          {ordersState.orders.map((order) => (
            <li key={order.id}>
              {order.customer} {order.status} ${order.total}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-protected-route.tsx</span>
  </div>

```tsx
import { Navigate, Outlet, useLocation } from 'react-router'
import { useSellerAuth } from './sellerhub-auth-context'

export function SellerHubProtectedRoute() {
  const auth = useSellerAuth()
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate replace state={{ from: location.pathname }} to="/login" />
  }

  return <Outlet />
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-workflow-routes.tsx</span>
  </div>

```tsx
import { Link, Route, Routes, useLocation } from 'react-router'
import { SellerHubCatalogFilter } from './sellerhub-catalog-filter'
import { SellerHubLoginForm } from './sellerhub-login-form'
import { SellerHubOrdersPanel } from './sellerhub-orders-panel'
import { SellerHubProtectedRoute } from './sellerhub-protected-route'
import { useSellerAuth } from './sellerhub-auth-context'

export function SellerHubTestedWorkflowRoutes() {
  return (
    <Routes>
      <Route element={<CatalogPage />} path="/catalog" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SellerHubProtectedRoute />}>
        <Route element={<SellerHubOrdersPanel />} path="/seller/orders" />
      </Route>
    </Routes>
  )
}

function CatalogPage() {
  return (
    <section className="workflow-card">
      <h3>Catalog workspace</h3>
      <SellerHubCatalogFilter onApply={() => {}} />
      <Link to="/seller/orders">Open seller orders</Link>
    </section>
  )
}

function LoginPage() {
  const auth = useSellerAuth()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/seller/orders'

  return (
    <section className="workflow-card">
      <h3>Login required</h3>
      <p>Redirect target: {from}</p>
      <SellerHubLoginForm onSubmit={(values) => auth.signIn(values.email)} />
    </section>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.tsx</span>
  </div>

```tsx
import { Component } from 'react'
import type { ReactNode } from 'react'

type SellerHubErrorBoundaryProps = {
  children: ReactNode
}

type SellerHubErrorBoundaryState = {
  hasError: boolean
}

export class SellerHubErrorBoundary extends Component<
  SellerHubErrorBoundaryProps,
  SellerHubErrorBoundaryState
> {
  state: SellerHubErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): SellerHubErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(): void {}

  render() {
    if (this.state.hasError) {
      return <p role="alert">SellerHub workflow failed to render.</p>
    }

    return this.props.children
  }
}

export function BrokenWorkflowPanel(): ReactNode {
  throw new Error('Workflow panel render failed')
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-handlers.ts</span>
  </div>

```ts
import { delay, http, HttpResponse } from 'msw'
import type { SellerOrder } from './sellerhub-testing-types'

const sellerOrders: SellerOrder[] = [
  { id: 'order-3001', customer: 'Mina', status: 'open', total: 240 },
  { id: 'order-3002', customer: 'Noah', status: 'shipped', total: 125 },
]

export const sellerHubTestHandlers = [
  http.get('/api/seller/orders', async () => {
    await delay(50)
    return HttpResponse.json(sellerOrders)
  }),
]
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-server.ts</span>
  </div>

```ts
import { setupServer } from 'msw/node'
import { sellerHubTestHandlers } from './sellerhub-test-handlers'

export const server = setupServer(...sellerHubTestHandlers)
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-reducer.test.ts</span>
  </div>

```ts
import { describe, expect, it } from 'vitest'
import { parseCatalogFilterQuery, sellerCartReducer } from './sellerhub-cart-rules'
import type { CartState } from './sellerhub-testing-types'

describe('sellerCartReducer', () => {
  it('normalizes catalog filter query before a visible result test uses it', () => {
    expect(parseCatalogFilterQuery('  Desk   Lamp  ')).toBe('desk lamp')
  })

  it('adds and updates cart lines as pure transitions', () => {
    const initialState: CartState = { lines: [] }

    const withLine = sellerCartReducer(initialState, {
      type: 'addLine',
      line: { id: 'lamp', name: 'Desk Lamp', quantity: 1 },
    })
    const withQuantity = sellerCartReducer(withLine, {
      type: 'setQuantity',
      lineId: 'lamp',
      quantity: 3,
    })

    expect(initialState.lines).toHaveLength(0)
    expect(withLine.lines).toHaveLength(1)
    expect(withQuantity.lines[0]?.quantity).toBe(3)
  })
})
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SellerHubLoginForm } from './sellerhub-login-form'

describe('SellerHubLoginForm', () => {
  it('blocks invalid credentials with visible validation feedback', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<SellerHubLoginForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText('Email'), 'seller@example.com')
    await user.type(screen.getByLabelText('Password'), '123')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a valid email and password.',
    )
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('submits valid controlled values', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<SellerHubLoginForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText('Email'), 'seller@example.com')
    await user.type(screen.getByLabelText('Password'), 'secret1')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'seller@example.com',
      password: 'secret1',
    })
  })
})
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-msw.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { SellerHubOrdersPanel } from './sellerhub-orders-panel'
import { server } from './sellerhub-test-server'

describe('SellerHubOrdersPanel', () => {
  it('renders loading and success states through the MSW request boundary', async () => {
    const user = userEvent.setup()

    render(<SellerHubOrdersPanel />)

    await user.click(screen.getByRole('button', { name: 'Load seller orders' }))

    expect(screen.getByRole('status')).toHaveTextContent('Loading seller orders...')
    expect(await screen.findByText('Mina open $240')).toBeInTheDocument()
    expect(screen.getByText('Noah shipped $125')).toBeInTheDocument()
  })

  it('renders an error state when the mocked API returns a server error', async () => {
    const user = userEvent.setup()

    server.use(http.get('/api/seller/orders', () => HttpResponse.json(null, { status: 500 })))

    render(<SellerHubOrdersPanel />)

    await user.click(screen.getByRole('button', { name: 'Load seller orders' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to load seller orders.',
    )
  })
})
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-router-integration.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { SellerAuthProvider } from './sellerhub-auth-provider'
import { SellerHubTestedWorkflowRoutes } from './sellerhub-workflow-routes'

describe('SellerHubTestedWorkflowRoutes', () => {
  it('redirects an unauthenticated seller route to login UI', async () => {
    render(
      <SellerAuthProvider>
        <MemoryRouter initialEntries={['/seller/orders']}>
          <SellerHubTestedWorkflowRoutes />
        </MemoryRouter>
      </SellerAuthProvider>,
    )

    expect(await screen.findByRole('heading', { name: 'Login required' })).toBeInTheDocument()
    expect(screen.getByText('Redirect target: /seller/orders')).toBeInTheDocument()
  })

  it('renders the protected orders route when the provider supplies auth state', () => {
    render(
      <SellerAuthProvider initialSellerName="Mina">
        <MemoryRouter initialEntries={['/seller/orders']}>
          <SellerHubTestedWorkflowRoutes />
        </MemoryRouter>
      </SellerAuthProvider>,
    )

    expect(screen.getByRole('heading', { name: 'Seller orders' })).toBeInTheDocument()
  })
})
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-context-hook-boundary.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SellerAuthProvider } from './sellerhub-auth-provider'
import { useSellerAuth } from './sellerhub-auth-context'

describe('useSellerAuth', () => {
  it('is tested through a real component wrapper and provider boundary', () => {
    render(
      <SellerAuthProvider initialSellerName="Mina">
        <AuthProbe />
      </SellerAuthProvider>,
    )

    expect(screen.getByText('Signed in as Mina')).toBeInTheDocument()
  })
})

function AuthProbe() {
  const auth = useSellerAuth()

  return <p>{auth.sellerName ? `Signed in as ${auth.sellerName}` : 'Signed out'}</p>
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.behavior.test.tsx</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { BrokenWorkflowPanel, SellerHubErrorBoundary } from './sellerhub-error-boundary'

describe('SellerHubErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders fallback UI for render errors in a workflow section', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <SellerHubErrorBoundary>
        <BrokenWorkflowPanel />
      </SellerHubErrorBoundary>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'SellerHub workflow failed to render.',
    )
  })
})
```
</div>

### 12.4 核心执行流程

Vitest 先执行 `src/test/setup.ts`，MSW server 开始监听。unit tests 直接调用 reducer/parser；form tests render 到 jsdom 并用 userEvent 输入；orders tests 点击按钮后由 MSW 返回 mock response；router tests 用 MemoryRouter 提供 initial route；context hook tests 用 provider wrapper 渲染 probe component；error boundary tests 触发 render throw 并断言 fallback alert。

### 12.5 Runtime、类型与工具链边界

JavaScript runtime 执行 reducer、parser、Promise、mock handler 和 assertion；React 负责 render/commit、provider stack、route branch 和 error boundary state；Testing Library 负责 DOM query；Vitest 负责 runner lifecycle；jsdom 模拟 DOM 但不是完整浏览器；MSW 拦截 request boundary；TypeScript 检查 domain types 但不 runtime 验证外部 JSON；ESLint/typecheck/test/build 是独立工具链门禁。

### 12.6 验证步骤

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

## 13. 额外速查表

| Scenario | Preferred Test | Primary Evidence |
| --- | --- | --- |
| Parser / reducer | Unit test | return value and immutable reference |
| Visible component | Component test | role/text/label query |
| Form | Behavior test | userEvent input and submit payload |
| Async UI | Component/integration test | findBy and status/alert/list |
| Router | Integration test | MemoryRouter initial route |
| Context hook | Wrapper test | provider value and visible consumer |
| Network | MSW test | request handler and UI branch |
| Render crash | Error boundary test | fallback alert |

最小行为测试模板：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: behavior test pattern</span>
  </div>

```tsx
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'

it('submits visible form values', async () => {
  const user = userEvent.setup()
  render(<FormUnderTest />)

  await user.type(screen.getByLabelText('Email'), 'seller@example.com')
  await user.click(screen.getByRole('button', { name: 'Submit' }))

  expect(await screen.findByText('Saved')).toBeInTheDocument()
})
```
</div>

## 14. 最终文件清单

| File | Role | Status |
| --- | --- | --- |

| `docs/react/chapter-12-testing-quality/react-chapter-12-learning-guide.md` | 本章真实文件。 | 已创建并保留 |

| `vitest.config.ts` | 本章真实文件。 | 已创建并保留 |

| `src/test/setup.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/chapter-12-practice-root.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/chapter-12-practice.css` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/01-test-boundary/testing-boundary-map.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences-context.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/02-unit-reducer-parser/cart-quality-rules.test.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/03-component-render-screen/visible-summary-panel.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/04-accessible-queries/accessible-login-form.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/05-user-event-interaction/quantity-stepper.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/06-async-ui-state/async-order-status-panel.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/07-controlled-form-test/seller-filter-form.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/08-router-integration-test/seller-route-workspace.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/09-context-hook-boundary/seller-preferences.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/10-msw-network-mock/seller-orders-network-panel.msw.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/11-error-boundary-test/render-error-boundary.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/12-quality-gates/quality-gate-command-model.test.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-testing-types.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-rules.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-context.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-auth-provider.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-catalog-filter.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-panel.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-protected-route.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-workflow-routes.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-handlers.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-test-server.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-cart-reducer.test.ts` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-login-form.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-orders-msw.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-router-integration.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-context-hook-boundary.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |

| `src/learning/react/chapter-12-testing-quality/sellerhub-tested-workflow/sellerhub-error-boundary.behavior.test.tsx` | 本章真实文件。 | 已创建并保留 |


不需要创建这些概念 snippet：`Template: behavior test pattern` 只用于速查，不进入真实文件清单。

## 15. 如何转换成个人笔记

把笔记分成四页：测试层级和 owner 判断；RTL query 与 userEvent；async/router/context/MSW/error boundary；lint/typecheck/test/build quality gates。每页都记录一个失败信号如何定位到 owner 的例子。

## 16. 必须能回答的问题

为什么 reducer unit test 不需要 render？为什么 component test 不检查 internal state？getBy/queryBy/findBy 的时机差异是什么？为什么 userEvent 要 await？为什么 async UI 不用 sleep？为什么 router/context 需要 wrapper？MSW 和 mock internal helper 的差异是什么？Error Boundary 不能捕获哪些错误？为什么 TypeScript、test 和 build 不能互相替代？

## 17. 最终记忆模型

先找 behavior owner，再选最小测试层。JavaScript pure rule 用 unit test；React visible output 用 RTL query；真实交互用 userEvent；异步 DOM 用 findBy/waitFor；network 用 MSW；router/context 用 wrapper；render crash 用 error boundary；质量门禁用 lint、typecheck、test、build 全部跑。

## 18. 官方文档阅读清单

### 主要依据

1. React `act` API：https://react.dev/reference/react/act
2. React Responding to Events：https://react.dev/learn/responding-to-events
3. React Error Boundary reference：https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
4. React Testing Library Intro：https://testing-library.com/docs/react-testing-library/intro/
5. Testing Library Queries：https://testing-library.com/docs/queries/about/
6. Testing Library Async Methods：https://testing-library.com/docs/dom-testing-library/api-async/
7. user-event Intro：https://testing-library.com/docs/user-event/intro/
8. jest-dom：https://testing-library.com/docs/ecosystem-jest-dom/
9. Vitest Guide / Config / Environment：https://vitest.dev/guide/ ，https://vitest.dev/config/ ，https://vitest.dev/guide/environment.html
10. MSW docs / Node integration：https://mswjs.io/docs/ ，https://mswjs.io/docs/integrations/node
11. React Router testing：https://reactrouter.com/start/data/testing
12. TypeScript Narrowing / TSConfig types：https://www.typescriptlang.org/docs/handbook/2/narrowing.html ，https://www.typescriptlang.org/tsconfig/#types
13. MDN ARIA techniques：https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Techniques

### 本地辅助资料与时效说明

已读取 `references/books/react/README.md` 并确认本地 PDF 存在：`references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf` 与 `references/books/react/full-stack-react-projects.pdf`。本机当前工具未能成功抽取 PDF 正文：`pdfjs-dist` 缺少 `DOMMatrix` 绑定，Poppler wrapper 无法定位可执行文件。因此本章不把 PDF 正文当作主依据；React、Testing Library、Vitest、MSW、React Router、TypeScript 和 MDN 内容以官方文档与本地已验证源码为准。
