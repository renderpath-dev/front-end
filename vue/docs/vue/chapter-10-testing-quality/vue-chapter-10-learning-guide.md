# Vue 第 10 章：Testing、Quality Gates 与工程化检查

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

- [0. 本章机制边界](#0-本章机制边界)
- [1. 本章解决的问题](#1-本章解决的问题)
- [2. 前置概念](#2-前置概念)
- [3. 学习目标](#3-学习目标)
- [4. 核心机制证据链总览](#4-核心机制证据链总览)
- [5. 核心术语表](#5-核心术语表)
- [6. 底层心智模型](#6-底层心智模型)
- [7. 推荐目录结构](#7-推荐目录结构)
- [8. 示例运行方式](#8-示例运行方式)
- [9. 分节教学与练习](#9-分节教学与练习)
  - [9.1 Testing mental model：unit、component、integration、E2E 与 quality gates](#section-9-1)
  - [9.2 Vitest setup：test runner、jsdom、setupFiles、globals、watch/run 与 Vite transform](#section-9-2)
  - [9.3 Unit tests：utility、composable、store 的 isolated behavior](#section-9-3)
  - [9.4 Store tests：Pinia setActivePinia、fresh store instance 与 action/getter assertions](#section-9-4)
  - [9.5 Vue Test Utils mount：component instance、props、emits、slots、global plugins 与 DOM wrapper](#section-9-5)
  - [9.6 Component tests：ProductForm、PermissionButton、UserTable 的 public interface](#section-9-6)
  - [9.7 Async component testing：nextTick、flushPromises、MSW response 与 DOM update timing](#section-9-7)
  - [9.8 MSW integration：setupServer、handlers、scenarios、resetHandlers 与 API mock boundary](#section-9-8)
  - [9.9 Integration tests：route + store + API mock 如何验证跨层协作](#section-9-9)
  - [9.10 Playwright E2E：browser、page、locator、auto-waiting、trace 与 user flow](#section-9-10)
  - [9.11 E2E flows：login、permission、form submit、CRUD flow 的测试边界](#section-9-11)
  - [9.12 vue-tsc gate：SFC typecheck 为什么必须独立于 vite dev](#section-9-12)
  - [9.13 ESLint gate：static lint rules、Vue rules、TypeScript rules 与 real bugs](#section-9-13)
  - [9.14 Prettier gate：formatting、diff noise、format check 与 lint 的边界](#section-9-14)
  - [9.15 Husky and lint-staged：pre-commit automation、staged files 与 local limitation](#section-9-15)
  - [9.16 Coverage：line/branch/function coverage、threshold 与 coverage illusion](#section-9-16)
  - [9.17 CI command pipeline：lint、typecheck、unit、E2E、build 的顺序和失败含义](#section-9-17)
  - [9.18 Chapter integration：Chapters 07–09 的 store、form、table、API 如何被测试](#section-9-18)
  - [9.19 Final integration：vue-testing-quality-lab 如何形成可维护质量体系](#section-9-19)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
- [13. 额外速查表](#13-额外速查表)
- [14. 真实项目判断模型](#14-真实项目判断模型)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标                                      | 真实文件                                                          | 对应章节       |
| --------------------------------------------- | ----------------------------------------------------------------- | -------------- |
| 测试层与质量门禁模型                          | `src/learning/vue/chapter-10-testing-quality/quality/*.ts`        | 9.1、9.12–9.17 |
| Vitest、jsdom 与清理生命周期                  | `vitest.config.ts`、`vitest/setupTests.ts`                        | 9.2、9.7–9.8   |
| 测试工厂与 mount helper                       | `vitest/testFactories.ts`、`mountWithPlugins.ts`、`flushAsync.ts` | 9.3–9.7        |
| MSW fixtures、handlers 与 scenarios           | `msw/*.ts`                                                        | 9.8–9.9        |
| utility、composable、store 与 validator tests | `unit/*.test.ts`                                                  | 9.3–9.4、9.18  |
| props、emits、slots 与 interaction tests      | `component/*.test.ts`                                             | 9.5–9.7        |
| route、store 与 API mock integration          | `integration/*.integration.test.ts`                               | 9.8–9.9        |
| 真实 Chromium user flows                      | `e2e/*.spec.ts`、`playwright.config.ts`                           | 9.10–9.11      |
| ESLint、Prettier、coverage 与 scripts         | `eslint.config.js`、`.prettierrc.json`、`package.json`            | 9.12–9.17      |
| 可视化教学入口与 final lab                    | `TestingQualityChapterApp.vue`、`testing-quality-lab/*.vue`       | 9.19、12       |

表中省略的路径均相对 `src/learning/vue/chapter-10-testing-quality/`。

## 0. 本章机制边界

本章的机制边界是把前面章节的行为变成可重复失败信号。`vitest.config.ts`、`vitest/setupTests.ts` 决定 runner、jsdom、setupFiles 和 cleanup；`vitest/testFactories.ts`、`mountWithPlugins.ts`、`flushAsync.ts` 建立 test harness；`unit/*.test.ts`、`component/*.test.ts`、`integration/*.integration.test.ts`、`e2e/*.spec.ts` 分别覆盖 utility/composable/store、Vue Test Utils component、Router+Pinia+MSW integration 和 Playwright browser flow；`msw/*.ts` 保留 HTTP boundary；`eslint.config.js`、`.prettierrc.json`、`package.json`、quality model files 和 final lab 说明 lint/typecheck/unit/E2E/build gates 的职责差异。

执行 owner 是 test runner / harness，而不是生产应用本身。Vitest 在 Node/jsdom 里执行 transformed modules；Vue Test Utils `mount` 创建 component instance 和 DOM wrapper；MSW intercepts HTTP request boundary；Playwright 从应用外驱动 Chromium；`vue-tsc`、ESLint、Prettier、coverage 和 CI pipeline 产生不同类型的 quality signal。TypeScript 能检查 test helper 与 component props，但不能证明 assertion 有意义，不能等待 Vue DOM patch，也不能说明 coverage 命中的代码真的被正确验证。

跨边界的值包括 test fixture、props、emitted payload、slot content、wrapper DOM、Pinia test instance、Router location、MSW scenario、Playwright locator、trace、coverage counter、lint diagnostic、typecheck diagnostic。它纠正的误解是“测试越高级越好”或“coverage 数字等于质量”。本章不负责真实 backend persistence、production monitoring、deployment rollback 或选择 CI vendor；它只定义每层失败信号应该指向哪个 owner。

## 1. 本章解决的问题

前九章回答“应用如何运行”，本章回答“如何持续证明关键契约没有被破坏”。`npm run dev` 只说明开发服务器能转换当前请求到的模块；它不证明所有 SFC 类型正确、静态规则满足、错误分支被执行、真实浏览器流程可用或生产 bundle 可以构建。

测试能证明“给定 setup、输入与环境时，观察到的公开输出满足 assertion”；它不能证明未覆盖输入、真实后端安全、所有浏览器布局、用户体验质量或没有未知缺陷。质量门禁的价值来自多种不同证据组合，而不是某一个绿色百分比。

## 2. 前置概念

- Chapter 04：composable 把状态机制从页面抽离，因此可以直接测试输入、返回 ref 与 action。
- Chapter 05：TypeScript 类型会擦除，`vue-tsc --noEmit` 才会系统检查 SFC script 与 template 契约。
- Chapter 07：Pinia store 有容器级状态，每个测试需要 fresh Pinia 防止泄漏。
- Chapter 08：form、table、permission button 是 component public interface 的真实 test subjects。
- Chapter 09：API JSON 必须作为 `unknown` 进入 validator；MSW 只替代 transport，不替代 runtime contract validation。

## 3. 学习目标

完成本章后，应能按风险选择 unit、component、integration 或 E2E；能解释 Vitest 与 Playwright 的运行环境差异；能用 Vue Test Utils 通过 DOM、props、slots 与 emits 验证组件；能用 fresh Pinia、memory history 和 MSW 建立可清理的 integration harness；能解释 lint、format、typecheck、coverage、tests 与 build 各自证明什么。

## 4. 核心机制证据链总览

1. `unit/*.test.ts` 直接调用 utility、composable、store action 或 validator：失败应指向 pure logic、state transition 或 parser rule，而不是 DOM。
2. `setActivePinia(createPinia())` 和 `piniaStoreTest.ts` 为每个 store test 创建 fresh store instance；如果一个 case 影响另一个 case，信号指向 store root 没隔离。
3. `mountWithPlugins.ts` 用 Vue Test Utils mount component，传 props、slots、global plugins，再通过 wrapper DOM 和 emitted events 观察 public interface；测试内部 method name 是 brittle signal。
4. `flushAsync.ts` 区分 `nextTick` 和 Promise queue：DOM patch 未完成用 `nextTick`，MSW/API Promise 未 resolve 用 `flushPromises`；错用时表现为偶发断言失败。
5. `msw/*.ts` 在 HTTP boundary 拦截请求，service、client、Zod parser 仍走真实路径；直接 mock Axios 会跳过 Chapter 09 的 contract evidence。
6. `integration/*.integration.test.ts` 组合 route、store、API mock，证明跨层协作；如果失败输出不能定位 route/store/API 哪层坏了，集成范围过大。
7. `e2e/*.spec.ts` 用 Playwright `page`、`locator`、auto-waiting 和 trace 驱动 login/form/CRUD flow；它证明 browser-visible workflow，不证明真实 authentication。
8. `vue-tsc`、ESLint、Prettier、coverage 和 CI pipeline 依次产生 type、static rule、format、execution coverage、command-order signals；任意一个 signal 都不能替代其他 owner。

## 5. 核心术语表

| 术语           | 本章定义                                                               |
| -------------- | ---------------------------------------------------------------------- |
| test subject   | 被验证的函数、composable、store、component 或 user flow                |
| fixture        | 可重复的输入对象                                                       |
| mock           | 受控替代边界；本章网络 mock 由 MSW handlers 提供                       |
| mount          | 创建 Vue app context、组件实例、render effect 与 DOM wrapper           |
| assertion      | 对公开可观察结果的可执行声明                                           |
| cleanup        | reset handler、DOM、mock、timer、store/router instance，阻止跨测试泄漏 |
| quality gate   | 阻止不满足某类证据的变更继续前进的命令                                 |
| failure signal | 某一层契约不满足的证据，不等于所有层都失败                             |

## 6. 底层心智模型

质量证据链是：source contract → runner transform → environment setup → fixture/mock → action → async boundary → public output → assertion → cleanup → command exit code。Vitest 在 Node process 中执行，component test 通过 jsdom 提供 DOM 模型；Playwright 驱动真实 Chromium。`vue-tsc`、ESLint、Prettier 和 Vite build 不执行同一种检查，因此不能互相替代。

## 7. 推荐目录结构

`unit/` 聚焦单一逻辑；`component/` 聚焦 Vue public interface；`integration/` 连接 Router、Pinia 与 MSW；`e2e/` 只保留高价值 browser flows；`vitest/` 和 `msw/` 拥有共享 setup；`quality/` 把 gate、coverage 与 failure meaning 数据化；`components/` 与 `testing-quality-lab/` 只展示教学材料，不在浏览器里启动测试命令。

## 8. 示例运行方式

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Terminal</span></div>

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:coverage
npm run test:e2e
npm run build
```

</div>

`npm run dev` 后打开 `http://localhost:5173/` 并滚动到 Chapter 10。页面只展示机制、文件和命令；实际结果必须以终端命令 exit code 为准。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Testing mental model：unit、component、integration、E2E 与 quality gates

**结论：** 测试层按集成范围与运行环境分工，不按“高级程度”互相替代。

**本节解决的问题：** `testLayers.ts` 把四层的 subject、速度和 failure meaning 固定成可审查数据。

**技术意义：** 小逻辑用快反馈，跨边界用 integration，只有 browser-owned 行为才支付 E2E 成本。

**概念解释：** unit 直接调用；component mount Vue；integration 连接 route/store/network；E2E 从页面执行 user flow；quality gate 聚合不同证据。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** `testLayers.ts` 定层，`qualityGateChecklist.ts` 定命令；前者验证行为层，后者还包含 static、format 与 bundle gates。

**测试机制证据链：** 1 subject 是 `testLayers`；2 属于 unit-like policy data；3 由 Vitest 执行；4 Node；5 setup 注册 MSW 但本例不发请求；6 fixture 是四个 layer records；7 action 是读取 map；8 无 async；9 assert layer fields；10 afterEach 清 mock/DOM；11 缺层 assertion 失败；12 通过不证明真实 UI；13 TS 检查 record shape；14 runtime 检查值；15 lint/format只检查源码；16 E2E 过度；17 对 UI refactor 稳定；18 真实项目中重复或空白 test layer 是同类边界错误。

**TypeScript / vue-tsc 编译期过程：** `TestLayer` 限制 `speed` union，但不执行任何测试。

**JavaScript / Vue / Test Runner 运行时过程：** module 被 transform 后返回普通数组；runner 只在 test file 中执行 assertions。

**API / 语法规则：** 先选最小能证明目标风险的 layer，再定义 setup、action 与 public assertion。

**文件结构：** `quality/testLayers.ts`、`components/TestingPyramidPanel.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: layer-selection.ts</span></div>

```ts
const riskToLayer = {
  paginationMath: "unit",
  emittedSubmit: "component",
  routeStoreRequest: "integration",
  loginWorkflow: "e2e",
} as const;
```

</div>

**逐行解释：** key 是风险，value 是能覆盖该风险的最小层；它不是按文件大小分类。

**执行过程：** 先写可观察结果，再选择 runner/environment，最后补 cleanup。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** 范围从纯逻辑增大到真实浏览器时，setup 与 cleanup 成本增加，coverage 更宽但定位精度下降。

**为什么得到这个结果：** 集成越多，真实度提高，同时 nondeterminism 与诊断范围也扩大。

**对比写法：** 不要用 Playwright 测 pagination slice，也不要用 jsdom 声称真实 layout 正确。

**常见错误为什么错：** “所有测试都 E2E”让反馈慢且失败难定位；“只写 unit”遗漏 Router、plugin 与 browser integration。

**与真实项目的关系：** 核心业务分支多写 unit/component，关键收入或权限流程保留少量 E2E。

**与当前学习主线的关系：** 本节把 Chapters 04–09 的不同 owner 重新映射到可验证层。

**最终记忆模型：** 最小充分层 + 明确 public output + 可重复 cleanup。

<a id="section-9-2"></a>

### 9.2 Vitest setup：test runner、jsdom、setupFiles、globals、watch/run 与 Vite transform

**结论：** Vitest 复用 Vite transform，但测试运行与 dev server 是不同进程和命令。

**本节解决的问题：** `vitest.config.ts` 选择 Vue plugin、jsdom、setup file、test include 和 V8 coverage。

**技术意义：** SFC 能按项目 transform，DOM-dependent component tests 获得一致环境。

**概念解释：** `vitest run` 单次执行；`vitest` watch；jsdom 模拟 DOM API，但不提供真实 layout、paint 与浏览器 navigation process。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** Vitest owner 是 unit/component/integration；Playwright owner 是 browser E2E；`vue-tsc` 仍需独立运行。

**测试机制证据链：** 1 subject 是 Vitest config；2 属于 test infrastructure；3 Vitest；4 Node+jsdom；5 `setupTests.ts` beforeAll；6 fixtures 由各 suite 引入；7 runner 收集 `.test.ts`；8 runner 等待 returned Promise；9 assertions 产生结果；10 afterEach/afterAll；11 config/import failure 阻止 collection；12 collection 成功不证明 tests 正确；13 TS 检查 config；14 runner 检查执行；15 lint/format检查配置文本；16 E2E 不适用；17 对 test subject refactor 中等稳定；18 环境不匹配常表现为 missing DOM API。

**TypeScript / vue-tsc 编译期过程：** config 的 options 与 imports 被类型检查，但 jsdom 行为只在 runtime 出现。

**JavaScript / Vue / Test Runner 运行时过程：** Vitest 使用 Vue plugin transform SFC，创建 jsdom globals，执行 setup，再收集 suites。

**API / 语法规则：** component tests 使用 `environment: "jsdom"`；E2E `.spec.ts` 排除；不全局吞掉 console error。

**文件结构：** `vitest.config.ts`、`vitest/setupTests.ts`、`vitest/vitestEnvironmentNotes.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">vitest.config.ts</span></div>

```ts
test: {
  environment: "jsdom",
  setupFiles: [
    "./src/learning/vue/chapter-10-testing-quality/vitest/setupTests.ts",
  ],
  include: ["src/**/*.test.ts"],
  exclude: ["src/**/*.spec.ts", "node_modules/**", "dist/**"],
}
```

</div>

**逐行解释：** environment 提供 DOM；setupFiles 安装 lifecycle；include 收集 Vitest tests；exclude 隔离 Playwright。

**执行过程：** config load → plugin transform → environment → setup → collection → test → teardown。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** 本节没有业务 user action；它决定后续所有 subject 的共同执行边界和 failure source。

**为什么得到这个结果：** 同一 transform pipeline 减少测试与应用编译差异，但 jsdom 仍不是浏览器。

**对比写法：** `npm run dev` 不收集 test files；`vitest run` 也不自动完成 production build。

**常见错误为什么错：** 把 `.spec.ts` 同时交给两个 runner 会产生环境与 global API 冲突。

**与真实项目的关系：** setup 过重会拖慢每个 worker；只放跨 suite 必需的 lifecycle。

**与当前学习主线的关系：** Vue SFC transform 来自 Chapter 01 的 Vite pipeline，但测试命令拥有独立 lifecycle。

**最终记忆模型：** Vite transform 共享，runner、environment 与 proof 不共享。

<a id="section-9-3"></a>

### 9.3 Unit tests：utility、composable、store 的 isolated behavior

**结论：** 能直接调用的逻辑应先写 unit test，不应为它挂载整个页面。

**本节解决的问题：** `use-pagination.test.ts` 直接验证 Chapter 08 `useAdminPagination` 的 total、visible rows、page 与 pageSize。

**技术意义：** 失败范围收敛到 slice 规则，不被 Router、Element Plus 或 DOM 影响。

**概念解释：** 只依赖 Vue reactivity 的 composable 可以直接调用；依赖 lifecycle/provide 的 composable 才需要 host component。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** 本例是 Vitest unit；无需 mount、router、MSW 或 Playwright。

**测试机制证据链：** 1 subject `useAdminPagination`；2 unit；3 Vitest；4 jsdom process但只用 Vue reactivity；5 global setup；6 `createPaginationRows` fixture；7 修改 reactive page/pageSize；8 computed 同步，无 flush；9 assert total/visible ids；10 afterEach；11 wrong slice 产生精确 assertion diff；12 通过不证明 table rendering；13 TS 检查 row/pagination shape；14 runtime 检查 slice；15 lint/format不检查数学结果；16 E2E 过度；17 对 page UI refactor 稳定；18 真实项目中 off-by-one 与 stale pageSize 是同类 bug。

**TypeScript / vue-tsc 编译期过程：** generic `Row` 保留 row shape，无法证明 page 2 的首项是 `row-6`。

**JavaScript / Vue / Test Runner 运行时过程：** `computed` 追踪 reactive pagination；修改属性后下一次 `.value` 重新求值。

**API / 语法规则：** Arrange fixture，Act 改输入，Assert public returned refs。

**文件结构：** `unit/use-pagination.test.ts`、`vitest/testFactories.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">unit/use-pagination.test.ts</span></div>

```ts
const rows = createPaginationRows(12);
const pagination = reactive({ page: 2, pageSize: 5 });
const { total, visibleRows } = useAdminPagination(rows, pagination);

expect(total.value).toBe(12);
expect(visibleRows.value[0]?.id).toBe("row-6");
```

</div>

**逐行解释：** fixture 固定 12 行；第二页每页 5 行；computed 应返回总数 12 与第 6 行。

**执行过程：** create data → create reactive state → call composable → access computed → compare output。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** 没有 mock/mount/user DOM action，failure 几乎直接指向 subject 或 fixture。

**为什么得到这个结果：** start index 为 `(page - 1) * pageSize`。

**对比写法：** 挂载整个 Users page 再点分页会把同一数学规则与 table、router query 和 plugin setup 混在一起。

**常见错误为什么错：** 当前 composable 没有 out-of-range correction，测试不能虚构该行为；应明确“未实现”而不是写永远失败的期望。

**与真实项目的关系：** composable public return 比页面 DOM 结构更少因样式重构而变化。

**与当前学习主线的关系：** 这是 Chapter 04 composable architecture 在 Chapter 08 pagination 上的真实验证。

**最终记忆模型：** 直接调用、最少依赖、只断言返回契约。

<a id="section-9-4"></a>

### 9.4 Store tests：Pinia setActivePinia、fresh store instance 与 action/getter assertions

**结论：** 每个 store test 都要创建 fresh Pinia，避免 action 产生的状态跨 case 泄漏。

**本节解决的问题：** `auth-store.test.ts` 验证 signed-out、三种 role、permissions 与 sign-out。

**技术意义：** store singleton-like container 被隔离，case 顺序不影响结果。

**概念解释：** `setActivePinia(createPinia())` 为随后调用的 `useAuthStore()` 提供当前 container。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** 本例是 Pinia unit；不安装 app shell，也不依赖 persisted runtime plugin。

**测试机制证据链：** 1 subject `useAuthStore`/`usePermissionStore`；2 unit；3 Vitest；4 Node/jsdom；5 beforeEach fresh Pinia；6 role table fixture；7 `signInAs`/`signOut`；8 actions 同步；9 assert getters/state；10 next beforeEach replaces container；11 wrong role/permission assertion fails；12 通过不证明 backend auth；13 TS 检查 role union；14 runtime 检查 transitions；15 lint/format不检查 permissions；16 E2E 仅需关键 projection；17 对 component refactor 稳定；18 order-dependent failures 表明 store instance 泄漏。

**TypeScript / vue-tsc 编译期过程：** role union 拒绝未知字符串，但不能证明 admin permission set 正确。

**JavaScript / Vue / Test Runner 运行时过程：** Pinia 创建 reactive state；actions 更新 state，getters 在读取时反映新值。

**API / 语法规则：** fresh Pinia 必须在调用 `useStore()` 前激活。

**文件结构：** `unit/auth-store.test.ts`，subject 位于 Chapter 07 `stores/authStore.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">unit/auth-store.test.ts</span></div>

```ts
beforeEach(() => {
  setActivePinia(createPinia());
});

it("starts signed out", () => {
  const store = useAuthStore();
  expect(store.isSignedIn).toBe(false);
  expect(store.role).toBeNull();
});
```

</div>

**逐行解释：** beforeEach 替换 container；case 再创建 store；assertion 只读取 public getter。

**执行过程：** activate Pinia → instantiate store → dispatch action if needed → read getters → cleanup by replacement。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** setup 比纯 composable 多一个 container，但仍无 DOM/network；失败定位在 state/action/getter。

**为什么得到这个结果：** Pinia store identity 与 active Pinia 绑定，共用 container 就会共用 state。

**对比写法：** 在 module scope 创建一次 store 会让后面的 initial-state test 继承前面 sign-in。

**常见错误为什么错：** app shell 的 global Pinia 带 persistence plugin，unit test 引入它会增加 localStorage 与历史状态依赖。

**与真实项目的关系：** 权限规则变化时 unit diff 会指出 role/permission contract，而不是只看到页面菜单消失。

**与当前学习主线的关系：** 直接验证 Chapter 07 Pinia，不复制 store 实现。

**最终记忆模型：** fresh container → public action → public getter。

<a id="section-9-5"></a>

### 9.5 Vue Test Utils mount：component instance、props、emits、slots、global plugins 与 DOM wrapper

**结论：** `mount` 创建真实 Vue component runtime context；wrapper 是测试观察与交互接口，不是浏览器。

**本节解决的问题：** `mountWithPlugins.ts` 为需要 Pinia 和 Element Plus 的 component test 建立 fresh plugin context。

**技术意义：** required props、provide/inject、global components 与 render effect 都按 Vue 规则运行。

**概念解释：** mount 创建 app、安装 plugins、实例化 component、执行 setup、render/patch 到 jsdom，wrapper 暴露 DOM 查询、trigger、props 与 emitted。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** mount 属于 component/integration harness；真实 layout、focus fidelity 与 navigation 仍由 Playwright owner。

**测试机制证据链：** 1 subject 是 Vue component public contract；2 component；3 Vitest+VTU；4 jsdom；5 fresh Pinia/plugins；6 props/slots fixture；7 wrapper trigger/setValue；8 await trigger/nextTick；9 DOM/emitted assertion；10 unmount/DOM reset；11 missing prop/plugin 或 wrong output 失败；12 通过不证明 CSS layout；13 vue-tsc 检查 prop/event types；14 runtime test 检查 render/interaction；15 lint/format只检查源；16 E2E 对普通 prop render 过度；17 public assertions 抗内部 refactor；18 plugin missing warning 是真实项目 harness 不完整的信号。

**TypeScript / vue-tsc 编译期过程：** SFC macros 生成 prop/emit types，不能证明用户点击后真正 emit。

**JavaScript / Vue / Test Runner 运行时过程：** Vue effect 读取 props/store，生成 vnode，patch 到 jsdom；trigger 派发 event 并等待 Vue tick。

**API / 语法规则：** 用 `global.plugins` 安装依赖；slots 通过 mount options；优先 DOM 与 `emitted()`，避免 private instance state。

**文件结构：** `vitest/mountWithPlugins.ts`、`component/*.test.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">vitest/mountWithPlugins.ts</span></div>

```ts
export function mountWithPlugins(component: Component) {
  const pinia = createPinia();
  setActivePinia(pinia);
  return {
    pinia,
    wrapper: mount(component, {
      global: { plugins: [pinia, ElementPlus] },
    }),
  };
}
```

</div>

**逐行解释：** helper 每次创建 Pinia；激活后 mount 同一个 instance；Element Plus 只作为 component dependency 安装。

**执行过程：** create plugins → mount → Vue setup/render → interact → await → assert → wrapper cleanup。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** 相比 unit，多了 component instance、DOM 与 plugin lifecycle，因此 failure owner 可能是 setup 或 public behavior。

**为什么得到这个结果：** Vue component 不是纯函数；它需要 app context 和 render lifecycle。

**对比写法：** `shallowMount` 会 stub children，适合明确隔离目标，不应默认替代真实 child interaction。

**常见错误为什么错：** 直接读取 `wrapper.vm` private ref 会把测试绑定到实现细节；DOM 和 emitted 才是使用者看到的契约。

**与真实项目的关系：** plugin helper 集中重复 setup，但不能把所有全局 app state 都塞进一个共享 singleton。

**与当前学习主线的关系：** 它把 Chapter 03 component boundary 与 Chapters 07–08 plugins 接到可执行测试。

**最终记忆模型：** mount 是 Vue runtime harness；wrapper 是 public observation surface。

<a id="section-9-6"></a>

### 9.6 Component tests：ProductForm、PermissionButton、UserTable 的 public interface

**结论：** component test 应围绕 props、DOM、slots、user action 与 emits，而不是内部方法名。

**本节解决的问题：** 四个 test files 分别覆盖 form model/change、table props/toolbar/pagination、permission projection 和 tabs v-model。

**技术意义：** 组件重写内部 ref/computed 时，只要 public contract 不变，测试无需修改。

**概念解释：** `ProductForm` 的 model、`DataTablePage` 的 toolbar slot、`PermissionButton` 的 visible/disabled 和 `AdminTabs` 的 update event 都是外部可观察接口。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** Vitest+VTU 验证 Vue public interface；Element Plus 的真实 layout 与 native browser details 不在 jsdom proof 内。

**测试机制证据链：** 1 subjects 是 Chapter 08 components；2 component；3 Vitest；4 jsdom；5 Pinia/Element Plus setup；6 form/row/role fixtures；7 setValue/click/component emit；8 await wrapper action/flush；9 model、DOM、emitted；10 setup reset；11 missing output/event 失败；12 通过不证明 backend permission；13 vue-tsc 检查 prop/emit types；14 runtime 检查 interaction；15 lint/format不检查 UI result；16 E2E 仅用于关键 flow；17 public contract assertions 稳定；18 selector 或 private-state churn 表明测试边界错误。

**TypeScript / vue-tsc 编译期过程：** typed props 与 emits 拒绝错误 payload shape，但不执行 Element Plus validation。

**JavaScript / Vue / Test Runner 运行时过程：** user event 更新 model，Vue scheduler patch DOM，wrapper 收集 emitted events。

**API / 语法规则：** `await wrapper.find(...).trigger(...)`；`wrapper.emitted("event")`；slots 从 mount options 注入。

**文件结构：** `component/product-form.test.ts`、`user-table.test.ts`、`permission-button.test.ts`、`admin-tabs.test.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">component/permission-button.test.ts</span></div>

```ts
const wrapper = mountButton("admin", "disabled");
await wrapper.find("button").trigger("click");
expect(wrapper.emitted("click")).toHaveLength(1);
```

</div>

**逐行解释：** fixture 先激活 admin store；通过真实 button action 触发；只断言 public event。

**执行过程：** fresh Pinia → sign in → mount → render permission state → click → emit → assert。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** denied role 改变 fixture 后，DOM 从 enabled 变 disabled/hidden；click assertion 应保持空。

**为什么得到这个结果：** permission composable 从 active Pinia 读取 role，component 将决策投影到 DOM。

**对比写法：** 直接调用 component 内 `click()` 不会证明 button disabled 或 hidden。

**常见错误为什么错：** snapshot 只能展示 HTML 字符串，不能明确说明哪次 action 应 emit。

**与真实项目的关系：** component tests 是 design system 与业务组件变更的快速回归层。

**与当前学习主线的关系：** 直接复用 Chapter 08 组件，没有复制一个“为测试而造”的页面。

**最终记忆模型：** 输入 public contract，动作像用户，输出可观察。

<a id="section-9-7"></a>

### 9.7 Async component testing：nextTick、flushPromises、MSW response 与 DOM update timing

**结论：** `nextTick` 等 Vue patch；`flushPromises` 等已排队 Promise；它们解决不同 async boundary。

**本节解决的问题：** `flushAsync.ts` 在 API integration 后先清 Promise，再等待 Vue DOM patch。

**技术意义：** assertion 不会读取旧 DOM，也不会用任意 sleep 隐藏 race。

**概念解释：** reactive assignment 通常排入 Vue scheduler；fetch/handler 先经过 Promise；所以 API-driven DOM 常需要 Promise completion 和 tick。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** Vitest async helper 服务 component/integration；Playwright locator 自带 auto-wait，不应复制同一 flush helper。

**测试机制证据链：** 1 subject 是 async rendered state；2 component/integration；3 Vitest；4 jsdom；5 MSW setup；6 response fixture；7 mount/onMounted fetch 或 user trigger；8 `flushPromises`+`nextTick`；9 rendered success/error；10 reset handler/DOM；11 stale assertion 失败；12 timeout 不自动证明 subject bug；13 TS 只检查 Promise types；14 runtime test 检查 timing/result；15 lint/format无此 proof；16 browser-only behavior才需 E2E；17 explicit owner await 稳定；18 arbitrary timeout/flaky result 是边界未等待的信号。

**TypeScript / vue-tsc 编译期过程：** `Promise<void>` 提醒调用方可 await，不能保证调用方实际 await。

**JavaScript / Vue / Test Runner 运行时过程：** microtasks resolve fetch → state assignment queues render job → `nextTick` resolves after patch。

**API / 语法规则：** await 触发动作；未知 Promise 用 `flushPromises`；Vue state-to-DOM 用 `nextTick`。

**文件结构：** `vitest/flushAsync.ts`、`integration/route-store-api.integration.test.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">vitest/flushAsync.ts</span></div>

```ts
export async function flushAsync(): Promise<void> {
  await flushPromises();
  await nextTick();
}
```

</div>

**逐行解释：** 第一行清空 pending Promise callbacks；第二行等待这些 callback 造成的 Vue patch。

**执行过程：** action → request Promise → response parse → state write → render queue → DOM assertion。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** async boundary 增加后，failure 可能来自未等待而不是业务结果；trace timing 与最终 DOM 要分开看。

**为什么得到这个结果：** JavaScript microtask queue 与 Vue scheduler 都是异步队列。

**对比写法：** `setTimeout(1000)` 慢且不保证条件已满足；应等待拥有该变化的 API。

**常见错误为什么错：** 只调用 `nextTick` 不一定等到 fetch Promise；只 flush Promise 后也可能尚未 patch DOM。

**与真实项目的关系：** loading、success、error 与 validation feedback 都常跨这两个队列。

**与当前学习主线的关系：** 延续 Chapter 02 `nextTick`，增加 test runner 的 Promise flush。

**最终记忆模型：** Promise 完成工作，nextTick 完成 Vue DOM 提交。

<a id="section-9-8"></a>

### 9.8 MSW integration：setupServer、handlers、scenarios、resetHandlers 与 API mock boundary

**结论：** MSW 在 HTTP boundary 拦截请求，使 service 仍执行真实 request/parse 流程，而不是直接 mock Axios 方法。

**本节解决的问题：** handlers 覆盖 products、users、login、permissions 及 success/403/422/500/slow scenarios。

**技术意义：** test subject 不感知 mock implementation，仍能验证 method/path/status/body 与 Chapter 09 validators。

**概念解释：** `setupServer` 不是开启真实 TCP server；它在 Node 测试进程拦截受支持的请求。handler scenario 是 fixture policy，不应承担主要 assertion。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** MSW owner 是 Vitest integration network boundary；Chapter 09 custom adapter 保持不变，本章专用 fetch harness 允许 interception。

**测试机制证据链：** 1 subject 是 API boundary；2 integration；3 Vitest；4 Node/jsdom；5 server.listen；6 typed fixtures/scenario；7 fetch GET/POST；8 await response/json；9 status+Zod parsed output；10 resetHandlers/resetScenario/close；11 unhandled request 或 schema failure；12 mocked success 不证明 real backend；13 TS 检查 fixture source shape；14 runtime validator检查 JSON；15 lint/format不检查 status behavior；16 E2E 对 response branches通常过度；17 HTTP contract assertions 抗 client refactor；18 leaked scenario 导致 order-dependent failures。

**TypeScript / vue-tsc 编译期过程：** fixture inference 只约束本地对象；response 仍以 `unknown` 进入 Zod。

**JavaScript / Vue / Test Runner 运行时过程：** fetch 发 request → MSW matcher 选择 handler → scenario 返回 Response → test parse/validate。

**API / 语法规则：** `server.listen` once；每 case 后 `server.resetHandlers()`；suite 后 `server.close()`。

**文件结构：** `msw/msw-handlers.ts`、`msw-server.ts`、`msw-scenarios.ts`、`msw-fixtures.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">vitest/setupTests.ts</span></div>

```ts
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  resetMswScenario();
});
afterAll(() => server.close());
```

</div>

**逐行解释：** 未声明请求直接失败；case override 和 scenario 都复位；进程结束前释放 interceptor。

**执行过程：** setup server → select scenario → request → handler response → validation/assertion → reset。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** scenario 从 success 切到 forbidden 时 status assertion 改为 403；cleanup 后下个 case 必须回到 success。

**为什么得到这个结果：** network-level mock 保留 client 的 serialization、status handling 与 parsing。

**对比写法：** 到处 `vi.mock("axios")` 容易跳过 URL、headers、response parsing 和 interceptors。

**常见错误为什么错：** handler 返回看似 typed 的对象不等于 runtime contract 正确，测试仍须 Zod parse。

**与真实项目的关系：** 后端不可用或难构造错误时，可稳定验证前端 response branches。

**与当前学习主线的关系：** Chapter 09 建立 API boundary，本章在不改其 custom adapter 的前提下增加独立 MSW evidence。

**最终记忆模型：** mock transport，不 mock contract validation。

<a id="section-9-9"></a>

### 9.9 Integration tests：route + store + API mock 如何验证跨层协作

**结论：** integration test 应连接足够多的真实边界来证明协作，但仍保持 harness 小而可诊断。

**本节解决的问题：** memory router、fresh Pinia、mounted harness 与 MSW response 共同更新 rendered product rows。

**技术意义：** 能发现单个 unit test 看不到的 plugin、navigation readiness、request 与 render wiring 错误。

**概念解释：** memory history 不读写浏览器 URL；`router.push` 后 `router.isReady()` 确保 initial navigation 完成。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** route/store/API 协作由 Vitest integration owner；真实 address bar、history process 与 layout 仍属 E2E。

**测试机制证据链：** 1 subject 是 route-store-request-render chain；2 integration；3 Vitest；4 jsdom；5 fresh Pinia/router+MSW；6 product fixture；7 signIn/push/mount；8 isReady+flushAsync；9 path/role/rendered product；10 fresh instances+handler reset；11 wrong wiring/invalid response 失败；12 通过不证明 real navigation process；13 TS 检查 router/store/component contracts；14 runtime 检查协作；15 lint/format无行为 proof；16 E2E 只用于最终 user flow；17 harness 对 page layout refactor较稳定；18 cross-test route state 表明共享 Router。

**TypeScript / vue-tsc 编译期过程：** route component 和 store APIs 被检查，不能执行 navigation guard 或 response handler。

**JavaScript / Vue / Test Runner 运行时过程：** push resolves route → RouterView mounts harness → onMounted fetch → MSW response → validator → ref update → DOM patch。

**API / 语法规则：** 每 case 创建 router；先 push，再 `isReady()`，再 mount/assert。

**文件结构：** `integration/route-store-api.integration.test.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">integration/route-store-api.integration.test.ts</span></div>

```ts
await router.push("/products");
await router.isReady();
const wrapper = mount(
  { template: "<RouterView />" },
  {
    global: { plugins: [pinia, router] },
  },
);
await flushAsync();
expect(wrapper.text()).toContain("Mechanical Keyboard");
```

</div>

**逐行解释：** 完成 navigation 后挂载 outlet；等待 request 与 patch；通过用户可见文本验证 data wiring。

**执行过程：** fresh dependencies → navigation → mount → HTTP mock → runtime validation → render → assertion。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** 比 component test 多 Router 与 HTTP owners，failure 应沿 path、role、request、parse、render 顺序定位。

**为什么得到这个结果：** 每个边界单独正确不保证它们被正确安装和调用。

**对比写法：** 直接给 component 塞最终 rows 会绕过 route/store/request integration。

**常见错误为什么错：** 不等待 `router.isReady()` 时 assertion 可能发生在 initial navigation 前。

**与真实项目的关系：** 适合页面入口、权限状态与列表 API 的关键连接点。

**与当前学习主线的关系：** 把 Chapters 06、07、09 的 owner 放进最小协作 harness。

**最终记忆模型：** fresh Router + fresh Pinia + explicit mock + awaited render。

<a id="section-9-10"></a>

### 9.10 Playwright E2E：browser、page、locator、auto-waiting、trace 与 user flow

**结论：** Playwright 从应用外驱动真实 Chromium，不 import Vue component 或 store。

**本节解决的问题：** config 启动本地 Vite server，E2E files 用 role/name locator 验证真实 page workflow。

**技术意义：** 覆盖浏览器 DOM、事件、plugins、routing、CSS visibility 与完整 app shell。

**概念解释：** locator 是可重试查询；web-first assertions 自动等待条件；trace/screenshot/video 为失败提供时间线证据。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** Playwright owner 是 browser user flow；小纯函数、Zod branch 和 store getter 不应在这里测。

**测试机制证据链：** 1 subject 是 user flow；2 E2E；3 Playwright；4 Chromium；5 webServer+fresh context；6 app local fixtures；7 page click/fill；8 locator auto-wait；9 visible UI/row/menu；10 browser context teardown；11 timeout/visibility/locator failure；12 pass 不证明 backend security；13 TS 检查 test APIs；14 browser runtime检查 flow；15 lint/format检查 test source；16 E2E 必要于 browser integration；17 accessible locator 抗 CSS refactor；18 brittle class selector 与 sleep 是边界错误信号。

**TypeScript / vue-tsc 编译期过程：** Playwright types 检查 locator API；不会证明 locator 在页面存在。

**JavaScript / Vue / Test Runner 运行时过程：** runner 启动 worker/browser context，page 导航到 dev server，浏览器执行真实 Vue bundle。

**API / 语法规则：** 优先 `getByRole`/accessible name；用 web-first `expect(locator)`；不写固定 sleep。

**文件结构：** `playwright.config.ts`、`e2e/*.spec.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">e2e/login-flow.spec.ts</span></div>

```ts
await page.goto("/");
const chapter = page.locator('[aria-labelledby="chapter-08-title"]');
await chapter.getByRole("button", { name: "Sign in as admin" }).click();
await expect(chapter.getByText("Avery Admin / admin")).toBeVisible();
```

</div>

**逐行解释：** 从根页面进入；先缩小到 Chapter 08 region；按 role/name 点击并等待可见结果。

**执行过程：** webServer ready → browser navigation → Vue mount → user action → auto-wait assertion → artifacts on failure。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** 不再手动 mount/flush；browser 与 locator 管理等待，失败 trace 代替 wrapper debug。

**为什么得到这个结果：** Playwright 观察用户能访问的页面，而不是 test process 中的 component instance。

**对比写法：** `.el-button:nth-child(2)` 绑定样式结构；accessible name 表达用户意图。

**常见错误为什么错：** retry 只能重复 nondeterminism，不能修复错误 locator、共享状态或未等待条件。

**与真实项目的关系：** E2E 少而关键，通常在本地显式运行或完整 pipeline 运行。

**与当前学习主线的关系：** 验证 Chapters 01–10 仍在同一 `/` shell 中协作。

**最终记忆模型：** 从应用外，按用户语言，等待公开结果。

<a id="section-9-11"></a>

### 9.11 E2E flows：login、permission、form submit、CRUD flow 的测试边界

**结论：** E2E 只证明 UI projection 与本地 workflow，不证明真实 authentication、authorization 或 backend persistence。

**本节解决的问题：** 四个 specs 覆盖 local sign-in、operator menus、Chapter 09 form success 与 Chapter 08 delete CRUD。

**技术意义：** 关键学习路径在真实 browser 中可执行，同时不引入 backend/database。

**概念解释：** login 是 local role state；permission 是 UI visibility；form submit 走 Chapter 09 local adapter；CRUD delete 修改 Chapter 08 local collection。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** 这些是 E2E UI flows；不把 local role button 描述成安全认证，不要求真实 API。

**测试机制证据链：** 1 subject 是四个 flows；2 E2E；3 Playwright；4 Chromium；5 Vite webServer/fresh context；6 existing local data；7 click/form action；8 auto-wait；9 tag/menu/result/row absence；10 context reset；11 timeout/assertion diff；12 pass 不证明 backend authority；13 TS 只检查 test code；14 browser runtime检查 flow；15 lint/format不检查 outcome；16 这里 E2E 合理；17 role/name/scoped region较稳定；18 create form验证异常时改测已工作的 delete，不篡改旧章。

**TypeScript / vue-tsc 编译期过程：** test 和 app SFC 分别被静态检查，仍不会执行流程。

**JavaScript / Vue / Test Runner 运行时过程：** browser action 触发 Vue handler、Pinia/local collection 与 Element Plus DOM updates。

**API / 语法规则：** 每个 spec 一个用户目标；断言 visible outcome；不访问 `window.__vue__` 或 component internals。

**文件结构：** `e2e/login-flow.spec.ts`、`permission-flow.spec.ts`、`form-submit-flow.spec.ts`、`crud-flow.spec.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">e2e/crud-flow.spec.ts</span></div>

```ts
const userRow = chapter.getByRole("row").filter({ hasText: "Avery Stone" });
await userRow.getByRole("button", { name: "Delete" }).click();
await page.getByRole("button", { name: "OK" }).click();
await expect(userRow).toHaveCount(0);
```

</div>

**逐行解释：** 以 row 文本确定 record；执行 delete/confirm；最终只断言该 row 从 UI 消失。

**执行过程：** sign in admin → open Users → find row → delete → confirm → local collection update → table rerender。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** flow 使用现有 local data；浏览器 auto-wait；失败截图/视频只在失败时保留。

**为什么得到这个结果：** delete 路径是当前 Chapter 08 可工作的 CRUD happy path；create path 在真实浏览器暴露旧章 form validation 状态不同步，本章不越界改旧章。

**对比写法：** 只检查 button 存在不证明 CRUD mutation 完成。

**常见错误为什么错：** UI 隐藏 Roles 不等于服务端拒绝未授权请求；此测试只验证 projection。

**与真实项目的关系：** E2E 名称应写用户结果，而非 method 或 selector 细节。

**与当前学习主线的关系：** 复用 Chapters 08–09 runnable labs，并保留单页学习壳。

**最终记忆模型：** 关键用户动作 + 真实 browser + 明确安全边界。

<a id="section-9-12"></a>

### 9.12 vue-tsc gate：SFC typecheck 为什么必须独立于 vite dev

**结论：** Vite dev 负责按需 transform/service，不等于全项目 Vue SFC typecheck。

**本节解决的问题：** `typecheck` 与 `build` scripts 显式运行 `vue-tsc --noEmit`。

**技术意义：** template expressions、props、emits、imports 和 TS source 的 static contract 在进入后续 gates 前被检查。

**概念解释：** TypeScript 类型擦除后不进入 browser；`vue-tsc` 使用 Vue language tooling 分析 `.vue` 与 TS，`--noEmit` 只诊断。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** vue-tsc 是 compile-time gate；不能替代 runtime validators、tests 或 build bundling。

**测试机制证据链：** 1 subject 是 SFC/TS graph；2 非行为 test；3 vue-tsc；4 Node compiler process；5 tsconfig；6 source types；7 command invocation；8 compiler completion；9 diagnostics/exit code；10 tsbuild info managed by tool；11 type diagnostic；12 pass 不证明 runtime data；13 正是 TS owner；14 runtime tests另管；15 lint/format不同；16 E2E无关；17 对实现 refactor按 public types稳定；18 dev 正常但 CI typecheck失败是典型信号。

**TypeScript / vue-tsc 编译期过程：** 读取 `tsconfig.app.json`，生成 SFC virtual type context，检查但不 emit。

**JavaScript / Vue / Test Runner 运行时过程：** 不运行业务 JavaScript，也不 mount Vue。

**API / 语法规则：** `vue-tsc --noEmit` 独立 gate；build script 再运行一次确保直接 build 也有类型前置。

**文件结构：** `package.json`、`tsconfig.app.json`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">package.json</span></div>

```json
{
  "scripts": {
    "typecheck": "vue-tsc --noEmit",
    "build": "vue-tsc --noEmit && vite build"
  }
}
```

</div>

**逐行解释：** 单独 script 提供快速 static gate；build 串联类型与 bundle。

**执行过程：** parse configs → resolve modules/SFC → type diagnostics → exit zero/nonzero。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** 没有 fixture/mock/action；source graph 本身是输入，diagnostic 是 failure signal。

**为什么得到这个结果：** dev server 不需要为了显示一个页面先分析所有未请求模块。

**对比写法：** 只运行 Vite dev 或只运行 Vitest 都可能遗漏未执行路径的 type errors。

**常见错误为什么错：** 把 `vite build` 当成完整 SFC typecheck 会混淆 transform 与 type-system owner。

**与真实项目的关系：** typecheck 通常放在 expensive E2E 前，快速阻止明显 static failure。

**与当前学习主线的关系：** 这是 Chapter 05 类型边界进入工程 gate 的应用。

**最终记忆模型：** Vite 转换模块，vue-tsc 检查 SFC 类型图。

<a id="section-9-13"></a>

### 9.13 ESLint gate：static lint rules、Vue rules、TypeScript rules 与 real bugs

**结论：** ESLint 以规则分析源码模式，补充 typecheck，但不执行行为。

**本节解决的问题：** flat config 组合 JavaScript、TypeScript、Vue recommended 与 Prettier conflict disabling。

**技术意义：** 未使用模式、危险语法、Vue template 规则和 `any` 能在测试前快速失败。

**概念解释：** parser 把源码转成 AST，plugin rules 遍历节点；现有教学代码由 TypeScript 的 `noUnusedLocals` owner 处理，避免重复 rule 对合法 type usage 误报。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** ESLint owner 是 static code pattern；Prettier owner 是 formatting；tests owner 是 behavior。

**测试机制证据链：** 1 subject 是 source AST；2 static gate；3 ESLint；4 Node；5 flat config；6 file graph；7 `eslint .`；8 synchronous/async rule completion；9 diagnostics；10 no runtime state；11 rule failure；12 pass 不证明 type/runtime；13 TypeScript rules补充 compiler；14 tests另管；15 format conflicts disabled；16 E2E无关；17 stable rules降低 noise；18 rule churn/false positives表明 config boundary过严。

**TypeScript / vue-tsc 编译期过程：** compiler 处理类型关系；ESLint 使用 parser services/rules 处理代码模式，两者不是同一 gate。

**JavaScript / Vue / Test Runner 运行时过程：** ESLint 不执行 component setup 或 DOM。

**API / 语法规则：** flat config 顺序会覆盖规则；`eslint-config-prettier` 放在末尾关闭冲突 stylistic rules。

**文件结构：** `eslint.config.js`、`package.json` 的 `lint` script。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">eslint.config.js</span></div>

```js
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "vue/multi-word-component-names": "off",
    },
  },
  eslintConfigPrettier,
];
```

</div>

**逐行解释：** 三类 recommended rule 依次加入；项目 override 保留明确边界；最后关闭 formatter 冲突。

**执行过程：** discover files → parse JS/TS/Vue → run rules → print diagnostics → exit。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** source 代替 test fixture；rule diagnostic 代替 assertion，不涉及 mount 或 coverage。

**为什么得到这个结果：** AST 能发现一致的静态模式，但看不到运行时输入。

**对比写法：** 把 spacing/quotes 同时交给 ESLint 与 Prettier 会产生重复或冲突修复。

**常见错误为什么错：** 为了“严格”开启不适合现有教学代码的规则会制造 noise，掩盖真实错误。

**与真实项目的关系：** lint 应快、确定、可在 staged files 与完整 pipeline 中重复运行。

**与当前学习主线的关系：** 为 Chapters 01–10 提供统一 static quality gate，不重写旧章源码。

**最终记忆模型：** compiler 看类型，linter 看模式，formatter 看排版。

<a id="section-9-14"></a>

### 9.14 Prettier gate：formatting、diff noise、format check 与 lint 的边界

**结论：** Prettier 只统一格式；`format:check` 不修改文件，`format` 才写回。

**本节解决的问题：** `.prettierrc.json` 固定基本风格，`.prettierignore` 排除 dependencies、build、coverage 与 test artifacts。

**技术意义：** review diff 聚焦语义，而不是手工换行与引号争论。

**概念解释：** formatter 解析后重新打印；它可能让错误代码变整齐，但不会证明类型或行为正确。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** Prettier owner 是 deterministic text format；ESLint conflict rules 被关闭，behavior gates 独立。

**测试机制证据链：** 1 subject 是 formatted source text；2 format gate；3 Prettier；4 Node；5 config/ignore；6 repository files；7 check/write command；8 process completion；9 changed/unformatted list；10 no state fixture；11 nonzero check；12 pass 不证明 code works；13 TS另管；14 runtime另管；15 本节正是 format owner；16 E2E无关；17 deterministic output稳定；18 generated artifacts反复变化表示 ignore缺失。

**TypeScript / vue-tsc 编译期过程：** Prettier 不解析类型关系。

**JavaScript / Vue / Test Runner 运行时过程：** 不执行应用；只 parse/print 文件。

**API / 语法规则：** staged hook 用 `prettier --write`；完整 gate 用 `prettier . --check`。

**文件结构：** `.prettierrc.json`、`.prettierignore`、`package.json`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">.prettierignore</span></div>

```text
coverage
dist
node_modules
playwright-report
test-results
```

</div>

**逐行解释：** 每一项都是依赖或命令生成物，不属于手写 source formatting owner。

**执行过程：** resolve config → filter ignored paths → parse → compare or write → exit。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** 不存在用户行为；unformatted diff 是唯一 failure meaning。

**为什么得到这个结果：** 同一 printer 输入产生稳定输出，减少 diff noise。

**对比写法：** 格式化 `coverage/` 会浪费时间且修改生成报告。

**常见错误为什么错：** 认为 format pass 能替代 lint/typecheck，是把文本打印与语义分析混为一谈。

**与真实项目的关系：** pre-commit 只写 staged files，完整 pipeline 用 check 防止自动改工作区。

**与当前学习主线的关系：** 让所有章节 source 与 guide 的新增 diff 可审查。

**最终记忆模型：** write 用于本地修复，check 用于质量判定。

<a id="section-9-15"></a>

### 9.15 Husky and lint-staged：pre-commit automation、staged files 与 local limitation

**结论：** hook 依赖 Git repository；当前没有 `.git/`，所以只记录 lint-staged config 和 setup note，不激活 Husky。

**本节解决的问题：** 避免运行 `git init` 或生成无效 hook，同时保留未来的 staged-file policy。

**技术意义：** pre-commit 应快速，只处理待提交文件；完整 E2E 留给显式命令或完整 pipeline。

**概念解释：** Husky 管理 local Git hooks；lint-staged 根据 staged path 选择命令。没有 Git metadata 就没有 pre-commit lifecycle。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** hook 只编排 fast local checks，不扩大测试 proof，也不运行 E2E。

**测试机制证据链：** 1 subject 是 staged source；2 local workflow gate；3 hook+lint-staged；4 local process；5 Git hook setup；6 staged paths；7 commit attempt；8 commands completion；9 exit code；10 no cross-test state；11 formatter/lint failure blocks commit；12 pass 不证明 full project；13 typecheck未在 hook内；14 runtime tests未在 hook内；15 format/lint owner；16 E2E 明确过度；17 path patterns稳定；18 hook不运行常因 repo metadata缺失。

**TypeScript / vue-tsc 编译期过程：** 本 hook policy 不运行 vue-tsc；完整 `ci:local` 才包含它。

**JavaScript / Vue / Test Runner 运行时过程：** 不 mount app；只对 staged files 启动 formatter/linter processes。

**API / 语法规则：** 无 `.git/` 不执行 Husky init；不自动扩大版本控制范围。

**文件结构：** `package.json` 的 `lint-staged`、`quality/preCommitSetupNote.md`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">package.json</span></div>

```json
{
  "lint-staged": {
    "*.{ts,vue,js,mjs,cjs,json,md,css}": "prettier --write",
    "*.{ts,vue,js,mjs,cjs}": "eslint --fix"
  }
}
```

</div>

**逐行解释：** 可格式化文件先统一打印；源码文件再自动修复 lint；没有 E2E pattern。

**执行过程：** repository future setup → stage files → pre-commit → lint-staged match → commands → allow/block。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** staged paths 是输入，command exit 是 output；与 behavior test lifecycle 分离。

**为什么得到这个结果：** slow hook 会诱导绕过；快 hook 才能成为稳定反馈。

**对比写法：** pre-commit 运行完整 Chromium suite 会放大每次小提交的等待成本。

**常见错误为什么错：** 安装 Husky package 不等于 hook 已激活；repository metadata 和 hook file 都是必要条件。

**与真实项目的关系：** hook 是开发者本地第一道门，不是完整 pipeline 的替代。

**与当前学习主线的关系：** 当前工作区保持 local-only，不被测试章节偷偷初始化版本控制。

**最终记忆模型：** 无 repo 不激活；有 repo 只跑 fast staged checks。

<a id="section-9-16"></a>

### 9.16 Coverage：line/branch/function coverage、threshold 与 coverage illusion

**结论：** coverage 说明哪些代码路径被执行，不说明 assertion 是否有意义，也不等于产品正确。

**本节解决的问题：** V8 reporter 输出 text、HTML 与 JSON summary，并只聚焦 Chapter 10 source。

**技术意义：** 未执行 branch 能提示风险空白，但是否补测要结合业务风险。

**概念解释：** line、statement、function、branch 是 instrumentation counters；高百分比仍可能只有无效 assertion。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** coverage 属于 Vitest execution evidence；它不测 browser flows 的完整产品 risk，也不替代其他 gates。

**测试机制证据链：** 1 subject 是 instrumented Chapter 10 modules；2 unit/component/integration aggregate；3 Vitest+V8；4 Node/jsdom；5 coverage config；6 existing fixtures；7 execute tests；8 await suites；9 counters/report；10 report directory regenerated；11 uncovered paths不是自动 failure除非 threshold；12 high coverage不证明 assertions；13 TS另管；14 runtime execution owner；15 lint/format另管；16 E2E coverage通常成本更高；17 behavior-oriented coverage较稳定；18 percentage chasing产生低价值 tests。

**TypeScript / vue-tsc 编译期过程：** 类型检查不增加 runtime coverage。

**JavaScript / Vue / Test Runner 运行时过程：** V8 记录函数、语句与 branch 执行，runner 汇总 reporter。

**API / 语法规则：** 先看 risk 与 branch，再决定 threshold；不要把 generated report 纳入 formatting。

**文件结构：** `vitest.config.ts` 的 `coverage`、`quality/coveragePolicy.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">vitest.config.ts</span></div>

```ts
coverage: {
  provider: "v8",
  reporter: ["text", "html", "json-summary"],
  reportsDirectory: "./coverage",
}
```

</div>

**逐行解释：** V8 收集执行；三个 reporter 分别服务终端、人读报告和机器摘要。

**执行过程：** instrument → run tests → collect counters → aggregate → write reports。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** tests 不变，额外产生 counters；未覆盖不是行为 failure，threshold failure 才是 gate signal。

**为什么得到这个结果：** coverage 观察“执行过”，无法判断 assertion 是否区分正确与错误实现。

**对比写法：** 为追 100% 调用所有函数但不 assert 输出，只制造 coverage illusion。

**常见错误为什么错：** 单一百分比会掩盖关键 permission/error branch 未覆盖。

**与真实项目的关系：** 优先覆盖 money、permission、validation、retry/error 等高风险 branch。

**与当前学习主线的关系：** 本章把 Chapter 09 的错误分类与 validator 当作高价值 coverage targets。

**最终记忆模型：** coverage 找空白，assertion 定正确，风险定优先级。

<a id="section-9-17"></a>

### 9.17 CI command pipeline：lint、typecheck、unit、E2E、build 的顺序和失败含义

**结论：** 流水线从快到慢运行不同 owner 的 gates，首个失败应按其层解释。

**本节解决的问题：** `ci:local` 串联 lint → typecheck → unit/component/integration → E2E → build。

**技术意义：** 快速 static failure 不浪费 browser 时间；最终 build 证明 production bundle graph 可构建。

**概念解释：** shell `&&` 在前一命令 nonzero 时停止；这是 command orchestration，不是远程 provider config。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** pipeline 收集各 gate 的 exit code；format:check/coverage 可单独运行，本地 required chain 按 roadmap 五项执行。

**测试机制证据链：** 1 subject 是 whole project evidence；2 multi-gate；3 npm orchestration；4 local processes/browser；5 configs/deps；6 source/test fixtures；7 `npm run ci:local`；8 sequential completion；9 exit codes；10 each tool cleanup；11 first failing command；12 all pass仍不证明无缺陷；13 vue-tsc owner；14 tests/browser owners；15 lint/format owners；16 E2E 对关键 flows必要；17 stable scripts可复现；18 手工跳步导致“本机能跑”但证据缺失。

**TypeScript / vue-tsc 编译期过程：** 第二 gate 在 expensive test 前检查 SFC type graph。

**JavaScript / Vue / Test Runner 运行时过程：** Vitest、Playwright、Vite build 各自启动独立 process/runtime。

**API / 语法规则：** 失败看第一个 nonzero command，不把后续未运行报告为失败或通过。

**文件结构：** `package.json`、`quality/ciCommandMap.ts`、`components/CiPipelinePanel.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">package.json</span></div>

```json
{
  "scripts": {
    "ci:local": "npm run lint && npm run typecheck && npm run test:unit && npm run test:e2e && npm run build"
  }
}
```

</div>

**逐行解释：** 每个 `&&` 建立前置成功条件；顺序从静态快检到真实 browser，再到 bundle。

**执行过程：** lint pass → typecheck pass → Vitest pass → Playwright pass → build pass，任一步失败即停止。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** 每个子命令拥有自己的 lifecycle；pipeline 只聚合，不改变 test subject。

**为什么得到这个结果：** 不同工具观察不同 failure domain，组合后置信度高于单一 gate。

**对比写法：** 先跑 E2E 再发现 lint syntax/import error，反馈更慢。

**常见错误为什么错：** 写了 scripts 却从不实际运行，只有配置存在，没有 validation evidence。

**与真实项目的关系：** 同一 local script 可成为任何未来自动化环境的基础，但本章不添加远程配置。

**与当前学习主线的关系：** 把前九章“能运行”提升为可重复检查的工程 contract。

**最终记忆模型：** 快失败优先，真实度递增，build 收尾。

<a id="section-9-18"></a>

### 9.18 Chapter integration：Chapters 07–09 的 store、form、table、API 如何被测试

**结论：** Chapter 10 测试现有 owner，不复制业务实现，也不重写前章。

**本节解决的问题：** store tests 复用 Chapter 07，component/E2E 复用 Chapter 08，validator/error/MSW integration 连接 Chapter 09。

**技术意义：** 测试成为 architecture consumer；如果 subject 难测试，会暴露 owner coupling，而不是诱导复制代码。

**概念解释：** Chapter 04 composable 是稳定 unit target；Chapter 05 gate 是 vue-tsc；Chapter 07/08/09 分别提供 state、UI 与 API subjects。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** 每个 previous owner 在最小充分层被验证；只有 root `App.vue` 因追加 Chapter 10 被修改。

**测试机制证据链：** 1 subjects 是 previous chapter exports/UI；2 多层映射；3 Vitest/Playwright；4 Node/jsdom/browser；5 fresh dependencies；6 existing/local fixtures；7 action per layer；8 explicit await；9 public contract；10 reset state；11 failure指向 owner chain；12 pass不证明未测旧章功能；13 vue-tsc跨全图；14 runtime tests覆盖选定路径；15 lint/format全局；16 E2E只覆盖四条 flow；17不复制实现提高稳定性；18 import path/owner change会在测试与索引同时显现。

**TypeScript / vue-tsc 编译期过程：** 跨章 imports 被同一 TS graph 检查。

**JavaScript / Vue / Test Runner 运行时过程：** tests 调用真实 exported composable/store/component/validator；只有 external HTTP 由 MSW 替代。

**API / 语法规则：** 优先 import existing subject；仅当 transport 不可注入时建立 Chapter 10-only harness，不改默认 runtime。

**文件结构：** `unit/`、`component/`、`integration/`、`e2e/`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: chapter-test-map.ts</span></div>

```ts
const chapterTestMap = {
  chapter04: "composable unit",
  chapter05: "vue-tsc gate",
  chapter07: "Pinia store unit",
  chapter08: "component and E2E",
  chapter09: "validator and MSW integration",
} as const;
```

</div>

**逐行解释：** map 记录 owner 到最小充分 evidence，而不是重新定义 source。

**执行过程：** resolve existing import → construct isolated setup → trigger public behavior → assert → cleanup。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** owner 从 composable 到 API 时依赖逐步增加；测试层随风险增加，不随章节编号增加。

**为什么得到这个结果：** 可维护测试依赖稳定 public boundary，而不是复制内部算法。

**对比写法：** 在 Chapter 10 重新实现 auth store 会让测试只证明副本。

**常见错误为什么错：** 为测试方便大改前章 production source 会扩大任务边界并改变学习证据。

**与真实项目的关系：** 测试目录可作为 architecture coupling 的反馈仪表。

**与当前学习主线的关系：** 本节是 Chapters 04、05、07、08、09 的验证桥。

**最终记忆模型：** 测 owner，不测副本；替代外部边界，不替代业务 contract。

<a id="section-9-19"></a>

### 9.19 Final integration：vue-testing-quality-lab 如何形成可维护质量体系

**结论：** final lab 展示 test maps、commands、coverage 与 failure meaning，但不伪造或在浏览器执行命令。

**本节解决的问题：** `VueTestingQualityLab.vue` 汇总 unit、component、integration、E2E、coverage、commands 与 diagnosis panels。

**技术意义：** 学习页面说明“该跑什么、失败说明什么”，终端仍是唯一 validation authority。

**概念解释：** report panels 显示定义的 suite scope；command panel 来自 quality gate data；failure panel 来自 failure catalog。

**边界：unit test、component test、integration test、E2E test、Vitest runner、Vue Test Utils mount wrapper、jsdom environment、Playwright browser、MSW mock server、Pinia test instance、Vue Router test instance、vue-tsc type gate、ESLint lint gate、Prettier format gate、Husky local hook、CI pipeline：** UI 只呈现 policy；它不 spawn CLI、不读取虚假 pass status。

**测试机制证据链：** 1 subject 是 final learning composition；2 component smoke/build + external tests；3 Vue runtime and gates；4 browser for display；5 existing app plugins；6 static quality maps；7 render/scroll；8 Vue patch；9 visible panels；10 app teardown by browser；11 missing panel/build failure；12 visible panel不证明 command pass；13 vue-tsc检查 imports；14 E2E可检查标题；15 lint/format检查 source；16完整 flow另由 specs；17 data-driven panels抗文案布局refactor；18显示“Passed”却无 command evidence是严重 boundary bug。

**TypeScript / vue-tsc 编译期过程：** component imports、props 与 quality map shapes 被检查。

**JavaScript / Vue / Test Runner 运行时过程：** App render Chapter 10，panels map static arrays；没有测试 runner 被打包进页面执行。

**API / 语法规则：** command result 只在实际运行后由交付报告陈述；页面保持 checklist。

**文件结构：** `TestingQualityChapterApp.vue`、`components/*.vue`、`testing-quality-lab/*.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">TestingQualityChapterApp.vue</span></div>

```vue
<template>
  <section aria-labelledby="chapter-10-title">
    <h2 id="chapter-10-title">
      Testing, Quality Gates, and Engineering Automation
    </h2>
    <QualityGatePanel />
    <VueTestingQualityLab />
  </section>
</template>
```

</div>

**逐行解释：** section 提供可访问区域；标题标识 Chapter 10；panel 与 lab 只负责展示。

**执行过程：** root App import → chapter component setup → child render → user阅读 command/failure maps。

**test subject、setup、fixture、mock、mount、user action、async flush、assertion、cleanup、coverage、quality gate 与 failure signal 的变化：** final UI 汇总所有 maps，但真实 assertions 仍在 test files；build/lint/typecheck 从外部验证。

**为什么得到这个结果：** 把命令放进浏览器执行会混淆 application runtime 与 engineering tooling。

**对比写法：** 静态写“all tests passed”会在下一次代码变更后立刻过时。

**常见错误为什么错：** 把 coverage 百分比或 CI status 硬编码进 UI 是伪造动态 evidence。

**与真实项目的关系：** 团队 quality dashboard 也必须区分 policy、latest evidence 与 historical trend。

**与当前学习主线的关系：** Chapter 10 保持一个 `/` learning shell，并为后续 production optimization/deployment 前建立门禁。

**最终记忆模型：** 页面教 policy，命令产 evidence，exit code 定结果。

## 10. API / 语法索引

| API / command                               | Owner               | 关键规则                                                       |
| ------------------------------------------- | ------------------- | -------------------------------------------------------------- |
| `describe` / `it` / `test`                  | Vitest              | 组织 suite/case；名称描述公开结果                              |
| `expect`                                    | Vitest / Playwright | 前者同步/Promise assertions；后者 web-first locator assertions |
| `beforeEach` / `afterEach`                  | Vitest              | fresh state 与 cleanup                                         |
| `vi.fn` / `vi.mock`                         | Vitest              | function/module mock；不要替代所有 HTTP boundary               |
| `vi.useFakeTimers`                          | Vitest              | 仅测试 timer owner；结束后恢复 real timers                     |
| `mount` / `shallowMount`                    | Vue Test Utils      | 完整 mount / stub children 的隔离 mount                        |
| `wrapper.props()` / `wrapper.emitted()`     | Vue Test Utils      | 观察 component public interface                                |
| `trigger` / `setValue`                      | Vue Test Utils      | 触发 DOM interaction；应 await                                 |
| `flushPromises` / `nextTick`                | VTU / Vue           | Promise queue / Vue render queue                               |
| `createPinia` / `setActivePinia`            | Pinia               | 每 case fresh store container                                  |
| `createMemoryHistory` / `router.isReady`    | Vue Router          | isolated navigation + readiness                                |
| `setupServer` / `http.get` / `HttpResponse` | MSW                 | Node interception、handler、response                           |
| `server.listen/resetHandlers/close`         | MSW                 | suite lifecycle 与 isolation                                   |
| `page` / `locator` / `getByRole`            | Playwright          | real browser 与 user-facing locators                           |
| `vue-tsc --noEmit`                          | Vue tooling         | SFC static type gate                                           |
| `eslint .`                                  | ESLint              | static rule gate                                               |
| `prettier . --check`                        | Prettier            | formatting gate                                                |
| `vitest run --coverage`                     | Vitest/V8           | execution coverage report                                      |
| `playwright test`                           | Playwright          | Chromium E2E                                                   |

## 11. 常见错误表

下表把 wrong code、observed bug、violated rule、failure reason、correct code 和 future recognition 放在同一行。代码均为最小诊断片段。

| #   | Wrong code                                            | Error / violated rule / why                                     | Correct code                                                         | Later recognition                                 |
| --- | ----------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| 1   | `npm run dev` only                                    | Type errors may remain; dev transform is not full SFC typecheck | `npm run typecheck`                                                  | Dev page works but `vue-tsc` reports another file |
| 2   | `expect(wrapper.vm.open).toBe(true)`                  | Private implementation assertion; refactor breaks test          | `expect(wrapper.get('[role="dialog"]').isVisible()).toBe(true)`      | Tests change when private ref names change        |
| 3   | `expect(wrapper.html()).toMatchSnapshot()` only       | Snapshot has no intentional behavior assertion                  | `expect(wrapper.get("button").attributes("disabled")).toBeDefined()` | Large snapshot updates hide the contract          |
| 4   | `wrapper.get("button").trigger("click"); expect(...)` | Vue patch may not have completed                                | `await wrapper.get("button").trigger("click")`                       | Test passes when delayed or debugged              |
| 5   | `const store = useAuthStore()` in module scope        | Shared Pinia state leaks across cases                           | `beforeEach(() => setActivePinia(createPinia()))`                    | Initial-state test depends on order               |
| 6   | One Router for every case                             | Current route and guards leak                                   | Create `createRouter(...)` in each test                              | A case starts on the previous case route          |
| 7   | Missing `server.resetHandlers()`                      | Scenario override leaks                                         | Reset handlers in `afterEach`                                        | Success case receives earlier 500 response        |
| 8   | Trust handler fixture type                            | Mock can hide malformed contract                                | `schema.safeParse(await response.json())`                            | Tests pass after backend shape changes            |
| 9   | `vi.mock("axios")` everywhere                         | URL/status/serialization path is skipped                        | Use MSW at HTTP boundary                                             | Service tests never see wrong endpoint paths      |
| 10  | `router.push("/users"); mount(...)`                   | Navigation not ready                                            | `await router.push("/users"); await router.isReady()`                | RouterView is empty intermittently                |
| 11  | Assert form result immediately                        | Element Plus validation is async                                | Await user action and Promise/Vue queues                             | Validation text appears after assertion           |
| 12  | `page.locator(".el-button:nth-child(2)")`             | Brittle CSS structure locator                                   | `page.getByRole("button", { name: "Save user" })`                    | Style refactor breaks unrelated test              |
| 13  | Playwright for `sum(1, 2)`                            | Browser cost for pure logic                                     | Vitest unit test                                                     | Slow suite with no browser-owned risk             |
| 14  | jsdom screenshot proves layout                        | jsdom has no real layout engine                                 | Use browser E2E for browser behavior                                 | Dimensions/focus differ in Chromium               |
| 15  | Add retries to a race                                 | Nondeterminism remains                                          | Await the owning condition and isolate state                         | Same test fails only under load                   |
| 16  | One test mounts the full app for every rule           | Layers are not separated                                        | Unit/component/integration by owner                                  | Failures have many possible causes                |
| 17  | Run E2E in pre-commit                                 | Hook is too slow                                                | Keep E2E in explicit/full pipeline                                   | Developers bypass the hook                        |
| 18  | `coverage === correctness`                            | Execution is not assertion quality                              | Review risk, branches, and assertions                                | 100% coverage still misses wrong output           |
| 19  | Stop after tests                                      | Bundle graph may still fail                                     | `npm run build`                                                      | Dynamic import/build plugin fails later           |
| 20  | Define scripts but never run them                     | Configuration is not evidence                                   | Run `npm run ci:local`                                               | No current command output exists                  |
| 21  | ESLint quote/spacing rules plus Prettier              | Conflicting format owners                                       | Put `eslint-config-prettier` last                                    | Auto-fix oscillates                               |
| 22  | Format `coverage/` and `test-results/`                | Generated output churn                                          | Add paths to `.prettierignore`                                       | Reports create huge formatting diffs              |
| 23  | Install Husky without a repository                    | No hook lifecycle exists                                        | Add setup note; activate only after repository setup                 | `.git/` is absent and hook never runs             |
| 24  | Print `PASS` without running command                  | Claim has no evidence                                           | Report actual exit code or `UNKNOWN`                                 | Result has no timestamp/output                    |
| 25  | `it("用户可登录", ...)` in source                     | Source/test code must remain English-only                       | `it("signs in the local user", ...)`                                 | CJK scan finds test source literals               |

## 12. 最终小项目

### 12.1 项目目标与适配原因

`vue-testing-quality-lab` 的目标不是在页面里运行命令，而是把测试层、quality gates 与 failure meaning 放到一个可读入口，并由真实 test/config files 提供执行证据。它恰好覆盖 Phase 10 的 unit、store、component、integration、MSW、E2E、coverage、pre-commit policy 与 local pipeline。

### 12.2 文件结构与 testing layer map

| Map            | Files                                                                                     | Subject / proof                                        |
| -------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| unit           | `unit/use-pagination.test.ts`、`api-error-normalization.test.ts`、`zod-validator.test.ts` | slice、error kind、runtime schema                      |
| store          | `unit/auth-store.test.ts`                                                                 | state/action/getter with fresh Pinia                   |
| component      | `component/*.test.ts`                                                                     | model、props、slot、emit、permission、tabs             |
| integration    | `integration/*.integration.test.ts`                                                       | Router/Pinia/MSW/Zod cooperation                       |
| MSW            | `msw/*.ts`                                                                                | local HTTP success/error/latency scenarios             |
| E2E            | `e2e/*.spec.ts`                                                                           | login、permission、form submit、delete CRUD            |
| coverage       | `vitest.config.ts`                                                                        | V8 text/HTML/JSON summary                              |
| pre-commit     | `package.json`、`preCommitSetupNote.md`                                                   | staged format/lint policy; inactive without repository |
| local pipeline | `ci:local`                                                                                | lint → typecheck → test:unit → test:e2e → build        |
| diagnosis      | `testFailureCatalog.ts`、`FailureMeaningPanel.vue`                                        | failure → first debugging step                         |

### 12.3 核心测试 setup 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">vitest/setupTests.ts</span></div>

```ts
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "../msw/msw-server";
import { resetMswScenario } from "../msw/msw-scenarios";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
  resetMswScenario();
  document.body.innerHTML = "";
  vi.clearAllMocks();
  vi.clearAllTimers();
  vi.useRealTimers();
});

afterAll(() => {
  server.close();
});
```

</div>

### 12.4 MSW setup 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">msw/msw-server.ts</span></div>

```ts
import { setupServer } from "msw/node";
import { mswHandlers } from "./msw-handlers";

export const server = setupServer(...mswHandlers);
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">msw/msw-scenarios.ts</span></div>

```ts
export type MswScenario =
  "success" | "forbidden" | "validation" | "server" | "slow";

let activeScenario: MswScenario = "success";

export function setMswScenario(scenario: MswScenario): void {
  activeScenario = scenario;
}

export function getMswScenario(): MswScenario {
  return activeScenario;
}

export function resetMswScenario(): void {
  activeScenario = "success";
}
```

</div>

handlers 的完整真实实现位于 `msw/msw-handlers.ts`，覆盖五个 endpoint；所有 response 由 `HttpResponse` 构造，并在 setup lifecycle 中统一 reset/close。

### 12.5 一个 unit test 与一个 store test

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">unit/use-pagination.test.ts</span></div>

```ts
it("reacts to page and page-size changes", () => {
  const rows = createPaginationRows(12);
  const pagination = reactive({ page: 2, pageSize: 5 });
  const { visibleRows } = useAdminPagination(rows, pagination);

  expect(visibleRows.value[0]?.id).toBe("row-6");
  pagination.page = 1;
  pagination.pageSize = 10;
  expect(visibleRows.value).toHaveLength(10);
});
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">unit/auth-store.test.ts</span></div>

```ts
beforeEach(() => {
  setActivePinia(createPinia());
});

it("clears the active session on sign out", () => {
  const store = useAuthStore();
  store.signInAs("admin");
  store.signOut();
  expect(store.currentUser).toBeNull();
  expect(store.signInStatus).toBe("signed-out");
});
```

</div>

### 12.6 一个 component test

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">component/admin-tabs.test.ts</span></div>

```ts
const wrapper = mount(AdminTabs, {
  props: {
    modelValue: "dashboard",
    tabs: [
      { id: "dashboard", label: "Dashboard", closable: false },
      { id: "users", label: "Users", closable: true },
    ],
  },
  global: { plugins: [ElementPlus] },
});

wrapper
  .findComponent({ name: "ElTabs" })
  .vm.$emit("update:modelValue", "users");
await wrapper.vm.$nextTick();
expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["users"]);
```

</div>

### 12.7 一个 integration test

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">integration/product-api-msw.integration.test.ts</span></div>

```ts
it("returns a contract-valid product list", async () => {
  const response = await fetch("http://localhost/chapter-10-api/products");
  const body: unknown = await response.json();
  const parsed = productListResponseSchema.safeParse(body);

  expect(response.status).toBe(200);
  expect(parsed.success).toBe(true);
});
```

</div>

### 12.8 一个 E2E test

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">e2e/permission-flow.spec.ts</span></div>

```ts
test("shows only the menus allowed for an operator", async ({ page }) => {
  await page.goto("/");
  const chapter = page.locator('[aria-labelledby="chapter-08-title"]');
  await chapter.getByRole("button", { name: "Sign in as operator" }).click();
  await expect(chapter.getByRole("menuitem", { name: "Orders" })).toBeVisible();
  await expect(chapter.getByRole("menuitem", { name: "Roles" })).toHaveCount(0);
});
```

</div>

### 12.9 quality config 完整核心代码

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">vitest.config.ts</span></div>

```ts
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    setupFiles: [
      "./src/learning/vue/chapter-10-testing-quality/vitest/setupTests.ts",
    ],
    include: ["src/**/*.test.ts"],
    exclude: ["src/**/*.spec.ts", "node_modules/**", "dist/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      reportsDirectory: "./coverage",
      include: ["src/learning/vue/chapter-10-testing-quality/**/*.{ts,vue}"],
      exclude: [
        "src/learning/vue/chapter-10-testing-quality/**/*.test.ts",
        "src/learning/vue/chapter-10-testing-quality/e2e/**",
        "src/learning/vue/chapter-10-testing-quality/vitest/**",
      ],
    },
  },
});
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">playwright.config.ts</span></div>

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/learning/vue/chapter-10-testing-quality/e2e",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
```

</div>

ESLint 与 Prettier 的完整真实配置分别位于 `eslint.config.js`、`.prettierrc.json` 与 `.prettierignore`；scripts 和 lint-staged 的完整配置位于 `package.json`。

### 12.10 运行、预期行为、常见错误与扩展

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Terminal</span></div>

```bash
npm run ci:local
```

</div>

预期顺序是 lint、typecheck、15 个 Vitest files、4 个 Chromium flows、build。常见错误先按 `testFailureCatalog.ts` 判断 owner：import/config → environment/setup → action/await → assertion → cleanup。扩展任务可以增加 route query request assertion、integration error UI、coverage thresholds 与有效的 create-form regression test；不要在本章添加真实 backend、deployment 或 container configuration。

## 13. 额外速查表

| Item                                        | Compact meaning                                   |
| ------------------------------------------- | ------------------------------------------------- |
| Vitest                                      | Vite-aware unit/component/integration runner      |
| `describe`                                  | Group related cases                               |
| `it` / `test`                               | Define one observable contract                    |
| `expect`                                    | Declare expected public output                    |
| `beforeEach` / `afterEach`                  | Fresh setup / cleanup                             |
| `vi.fn`                                     | Spy or controlled function                        |
| `vi.mock`                                   | Module replacement; use sparingly                 |
| fake timers                                 | Control timer-owned behavior; restore afterward   |
| jsdom                                       | DOM model without real layout/paint               |
| Vue Test Utils                              | Official low-level Vue mounting utilities         |
| `mount` / `shallowMount`                    | Full child render / stubbed child render          |
| wrapper                                     | DOM/component observation interface               |
| props                                       | Component input contract                          |
| `emitted`                                   | Component event history                           |
| `trigger` / `setValue`                      | User-like DOM action                              |
| slots                                       | Caller-provided render content                    |
| `global.plugins` / `global.stubs`           | App context dependencies / explicit isolation     |
| `flushPromises` / `nextTick`                | Promise queue / Vue patch queue                   |
| Pinia test instance                         | Fresh store container per case                    |
| `createPinia` / `setActivePinia`            | Create and activate store context                 |
| Vue Router memory history                   | Navigation without browser URL mutation           |
| MSW                                         | HTTP boundary interception                        |
| `setupServer`                               | Node interception controller                      |
| `http.get` / `http.post`                    | Request handlers                                  |
| `HttpResponse`                              | Controlled HTTP response                          |
| `server.listen` / `resetHandlers` / `close` | MSW lifecycle                                     |
| Playwright                                  | Real browser E2E runner                           |
| `page` / `locator` / `getByRole`            | Browser page and user-facing target               |
| auto-waiting                                | Retry action/assertion until condition or timeout |
| trace                                       | Failure timeline artifact                         |
| webServer                                   | Start/reuse local app server                      |
| coverage                                    | Executed line/branch/function evidence            |
| vue-tsc                                     | Vue SFC static type gate                          |
| ESLint                                      | Static rule gate                                  |
| Prettier                                    | Deterministic format gate                         |
| Husky                                       | Local repository hook manager                     |
| lint-staged                                 | Run commands on staged files                      |
| CI                                          | Repeatable ordered gate execution                 |
| quality gate                                | Command whose failure blocks progression          |

## 14. 真实项目判断模型

| 目标 | 选择的检查层 | 不要选择 | 证明它有效 | 风险信号 / 外部 owner |
| --- | --- | --- | --- | --- |
| Pure function/composable/store behavior | Vitest unit test | 为纯逻辑 mount 整个页面 | 输入、输出、state mutation 可直接断言 | 需要 DOM/browser 时升级 component/E2E |
| Component public contract | Vue Test Utils component test | 断言 private ref 或 method 名 | props、slots、DOM、emits 覆盖用户可见接口 | Visual regression / design QA 不由 unit test 负责 |
| Router+Pinia+API collaboration | Small integration test + MSW | mock 掉 service 后声称 API contract 被测 | route/store/request/error path 都有真实边界 | 过大失败不可诊断时拆回 unit/component |
| User journey | Playwright E2E | 用 E2E 覆盖所有 edge case | locator、trace、network/mock evidence 指向真实 flow | Real backend/auth/payment 需要 dedicated environment |
| Static gates | `vue-tsc`、ESLint、Prettier | 用 dev server 可见结果代替 type/lint/format | command output 明确 fail owner | CI platform/release gate 属 Chapter 11 |
| Coverage | threshold + meaningful assertions | 把 coverage 当正确性 | uncovered critical path 可解释，assertion 有业务语义 | Mutation testing / production monitoring 属未来技术 |

## 15. 如何转换成个人笔记

每个主题只保留五行：test subject、owner layer、setup/fixture、action/await、public assertion/failure meaning。再附一条“此 pass 不证明什么”。例如 store：`useAuthStore` → unit → fresh Pinia → `signInAs` → role/permissions；不证明 backend authentication。

## 16. 必须能回答的问题

1. Vitest 与 Playwright 的 runner、environment 和 proof 有何不同？
2. Vue Test Utils mount 时，app context、component instance、render effect 与 wrapper 如何形成？
3. 为什么只依赖 reactivity 的 composable 比完整页面更稳定？
4. fresh Pinia 与 fresh Router 分别防止什么泄漏？
5. `nextTick` 与 `flushPromises` 等待哪一层？
6. MSW 相比直接 mock Axios 保留了哪些边界？
7. 为什么 MSW fixture 仍要进入 Chapter 09 validator？
8. 为什么 Vite dev、vue-tsc、lint、format、tests、coverage 与 build 不能互换？
9. coverage 能说明什么，不能说明什么？
10. 为什么 pre-commit 不运行完整 E2E？
11. 一个 test failure 证明了什么，又没有证明什么？
12. 为什么当前 workspace 没有激活 Husky？

## 17. 最终记忆模型

先问风险属于谁，再选择最小充分层：

`static shape → vue-tsc`  
`source pattern → ESLint`  
`text format → Prettier`  
`pure/reaction logic → Vitest unit`  
`Vue public interface → VTU component`  
`route/store/network cooperation → Vitest + memory Router + Pinia + MSW`  
`real user workflow → Playwright Chromium`  
`executed paths → coverage`  
`bundle graph → Vite build`

每个行为测试都沿同一条证据链：subject → setup → fixture/mock → action → await → public assertion → cleanup → failure meaning。

## 18. 官方文档阅读清单

- [Vue Testing Guide](https://vuejs.org/guide/scaling-up/testing.html)：测试类型、推荐工具、composable 与 component testing。
- [Vitest Guide](https://vitest.dev/guide/)：runner、tests、mocking、coverage、watch/run 与 Browser Mode 对比。
- [Vue Test Utils Guide](https://test-utils.vuejs.org/guide/)：mount、emits、forms、slots、async、Router 与 global options。
- [Playwright Documentation](https://playwright.dev/docs/intro)：installation、writing tests、locators、auto-wait、trace、webServer 与 automation guidance。
- [Mock Service Worker Documentation](https://mswjs.io/docs/quick-start)：Node integration、handlers 与 lifecycle。
- [ESLint Getting Started](https://eslint.org/docs/latest/use/getting-started)：flat config 与 rule execution。
- [Prettier Install](https://prettier.io/docs/install)：local install、config、check/write。
- [Husky package documentation](https://www.npmjs.com/package/husky)：local hooks 与 initialization。
- [lint-staged Documentation](https://lint-staged.js.org/)：staged file matching 与 command execution。

本章到此只建立 production 前的质量证据链；下一阶段才讨论 production build optimization、bundle analysis、deployment、containers、reverse proxy、CDN 与 SPA fallback，本章不生成这些配置。
