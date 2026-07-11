# Vue 第 8 章：Admin UI、Forms 与中后台项目能力

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
  - [9.1 Admin UI mental model：UI library、project UI、business component 与 page orchestration](#section-9-1)
  - [9.2 Element Plus installation：global plugin、CSS import、ConfigProvider 与 single app boundary](#section-9-2)
  - [9.3 UI library comparison：Element Plus、Naive UI、Ant Design Vue 的选型边界](#section-9-3)
  - [9.4 Admin layout：container、sidebar、topbar、breadcrumb、tabs 与 route/menu/pinia 边界](#section-9-4)
  - [9.5 Data table page：ElTable、ElPagination、columns、selection、sorting 与 operation slots](#section-9-5)
  - [9.6 Search form state：Router query、component local state、Pinia state 的归属判断](#section-9-6)
  - [9.7 Dialog form：create/edit mode、draft clone、validation、submit commit 与 reset on close](#section-9-7)
  - [9.8 Drawer form：large form UX、drawer lifecycle、dirty state 与 reset policy](#section-9-8)
  - [9.9 Form validation：Element Plus FormInstance、FormRules、frontend validation 与 backend validation boundary](#section-9-9)
  - [9.10 Local CRUD flow：create、edit、delete、confirm、message 与 local collection owner](#section-9-10)
  - [9.11 File upload：ElUpload、browser File object、type/size check、failure、retry 与 server boundary](#section-9-11)
  - [9.12 Button permission：visible/disabled mode、permission store、operation intent 与 API authorization](#section-9-12)
  - [9.13 Role permission UI：role matrix、menu visibility、button visibility 与 backend policy](#section-9-13)
  - [9.14 Theme：Element Plus theme variables、Chapter 07 theme store 与 scoped dashboard theming](#section-9-14)
  - [9.15 i18n：Vue I18n、Element Plus locale、message keys 与 UI library locale boundary](#section-9-15)
  - [9.16 Business component layering：base UI、project wrapper、business component、page component](#section-9-16)
  - [9.17 Admin dashboard integration：login、users、roles、products、orders、upload 与 local state flow](#section-9-17)
  - [9.18 Chapter integration：Router query、Pinia stores、Element Plus forms 如何协作](#section-9-18)
  - [9.19 Final integration：vue-admin-dashboard 如何形成中后台项目骨架](#section-9-19)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标、章节适配与结构](#121-项目目标章节适配与结构)
  - [12.2 所有权与集成 maps](#122-所有权与集成-maps)
  - [12.3 核心完整代码](#123-核心完整代码)
  - [12.4 运行、预期行为与扩展边界](#124-运行预期行为与扩展边界)
- [13. 额外速查表](#13-额外速查表)
- [14. 真实项目判断模型](#14-真实项目判断模型)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 真实文件 | 所有者 |
| --- | --- | --- |
| 安装 Element Plus 与 CSS | `src/learning/vue/chapter-08-admin-ui-forms/ui/elementPlus.ts` | app plugin |
| 配置 Element Plus locale | `ui/elementPlusLocale.ts`、`theme/AdminConfigProvider.vue` | dashboard presentation |
| 配置应用消息 i18n | `i18n/adminI18n.ts`、`i18n/adminMessages.ts` | app plugin |
| 描述 admin domain | `contracts/adminUiTypes.ts` | TypeScript contract |
| 描述 table query | `contracts/tableContracts.ts` | Router adapter contract |
| 描述 form draft | `contracts/formContracts.ts` | form flow contract |
| 描述 browser upload queue | `contracts/uploadContracts.ts` | component-local runtime state |
| 提供隔离的本地数据 | `contracts/adminMockData.ts` | local UI simulation |
| 同步 table query 与 URL | `composables/useAdminTableQuery.ts` | Router query |
| 切分可见 rows | `composables/useAdminPagination.ts` | derived page state |
| 管理 dialog draft | `composables/useDialogFormState.ts` | dialog flow |
| 管理 drawer draft 与 dirty | `composables/useDrawerFormState.ts` | drawer flow |
| 管理本地 CRUD | `composables/useLocalCrudCollection.ts` | page-local collection |
| 管理本地 upload queue | `composables/useUploadQueue.ts` | component-local queue |
| 读取 Chapter 07 permission store | `composables/useButtonPermission.ts` | global client state reader |
| 包装 Element Plus form ref | `composables/useElementFormValidation.ts` | form UI adapter |
| 组合 layout | `layout/*.vue` | project UI |
| 实现业务表单 | `forms/*.vue` | business component |
| 编排业务表格页 | `tables/*.vue` | page component |
| 实现权限、theme、i18n 与 upload UI | `permissions/*.vue`、`theme/*.vue`、`upload/*.vue` | focused feature components |
| 整合最终项目 | `admin-dashboard/VueAdminDashboard.vue` | final page orchestration |
| 注册 plugins | `src/learning/vue/chapter-01-application-boundary/main.ts` | single app entry |
| 保留旧章节并渲染 Chapter 08 | `src/learning/vue/chapter-01-application-boundary/App.vue` | learning shell |

表中省略的路径均相对 `src/learning/vue/chapter-08-admin-ui-forms/`。

## 0. 本章机制边界

本章的边界是中后台页面如何把 UI library 组件、project wrapper、business component 和 page orchestration 分层。`ui/elementPlus.ts` 与 `theme/AdminConfigProvider.vue` 负责 Element Plus plugin、CSS、locale 和 config provider；`contracts/adminUiTypes.ts`、`tableContracts.ts`、`formContracts.ts`、`uploadContracts.ts` 定义表格、表单、上传和 domain shape；`useAdminTableQuery.ts` 把提交后的 table query 交给 Router query；`useDialogFormState.ts`、`useDrawerFormState.ts` 管理 draft clone、dirty 和 reset；`useLocalCrudCollection.ts`、`useUploadQueue.ts`、`useButtonPermission.ts`、`useElementFormValidation.ts` 处理 local CRUD、browser `File` queue、Pinia permission reader 和 Element Plus form ref。

执行 owner 分得很细：Element Plus 运行 `ElTable`、`ElForm`、`ElUpload`、`ElMessageBox` 等 component behavior；Vue runtime 追踪 page state、draft refs、query refs 和 render effect；Router 拥有可分享 query；Pinia Chapter 07 store 提供跨页面 theme/permission；page component 如 `UsersTablePage.vue` 才拥有 rows、dialog、submit 和 local collection use case。TypeScript 能检查 row type、form draft、table query、upload item 和 event payload，但不能替代 Element Plus runtime validation、browser `File` 的真实 MIME/size、backend business rules 或 API authorization。

跨边界的值包括 Element Plus FormInstance、FormRules、table row key、pagination query、dialog/drawer draft clone、selected rows、upload `File` object、permission intent、message/confirm result、locale message key。它纠正的误解是“UI library 组件就是业务架构”或“前端表单校验等于后端验证”。本章不建立真实 API、数据库、后端权限、全局 server cache 或部署策略；Chapter 09 负责 API/runtime validation，backend 负责最终授权和数据一致性。

## 1. 本章解决的问题

UI library 解决一致的可访问交互、样式与组件 API，但不决定业务字段、state owner、权限策略、接口契约和持久化。本章用 Element Plus 完成一次真实分层：primitive 负责 UI，wrapper 固化项目设置，business component 理解字段，page 编排 query、draft、CRUD 与反馈。

## 2. 前置概念

- Chapter 03：props、emits、slots 与组件边界。
- Chapter 04：composable 提取可复用状态机制。
- Chapter 05：SFC、literal union、DOM runtime value 与 `vue-tsc` 边界。
- Chapter 06：Router query、route permission 与 navigation。
- Chapter 07：auth、permission、theme、preferences、sidebar 的 Pinia owner。

## 3. 学习目标

完成本章后，应能独立判断 table query、form draft、upload queue、permission decision、theme 与 locale 的 owner；能使用 `ElTable`、`ElForm`、`ElDialog`、`ElDrawer`、`ElUpload` 等组件形成业务流程；并能明确指出 frontend validation、hidden button 与 browser file check 都不是 backend trust boundary。

## 4. 核心机制证据链总览

1. `elementPlus.ts` 在 single app entry 注册 Element Plus 和 CSS；`AdminConfigProvider.vue` 再把 locale/theme 限定到 dashboard 子树，避免每个业务页重复安装 plugin。
2. `AdminLayout` 只处理 container/sidebar/topbar/breadcrumb/tabs slots；collapsed state 来自 Chapter 07 Pinia，route/menu 来自 Chapter 06 Router，layout 不拥有业务 rows。
3. `DataTablePage` 包装 `ElTable` / `ElPagination` / operation slots；`UsersTablePage.vue` 提供 typed rows、columns、query handlers 和 local CRUD，因此 table wrapper 不知道 user domain。
4. `useAdminTableQuery.ts` 把 keyword/status/page/pageSize/sort/order 序列化进 Router query；draft input 可以局部，提交后的 intent 才进入 URL。
5. `useDialogFormState.ts` 与 `useDrawerFormState.ts` 在 create/edit 时 clone draft，`FormInstance.validate()` 成功后才 commit；close/reset 丢弃 draft，避免直接污染 row。
6. `useElementFormValidation.ts` 只是 Element Plus form ref adapter；backend validation、422 field mapping 和 API payload validation 留给 Chapter 09。
7. `useUploadQueue.ts` 读取 browser `File`，做 MIME/size、本地 success/failure/retry simulation；没有 endpoint，所以任何“上传成功”都只是 UI queue 状态。
8. `PermissionButton` 读取 Chapter 07 permission store 决定 visible/disabled；点击后的 operation intent 仍需要 API/back-end authorization，不能由按钮可见性证明权限。
9. `VueAdminDashboard.vue` 组合 login、users、roles、products、orders、upload、permission、theme、i18n；它的失败信号是 owner 混淆：query 被复制到 Pinia、draft 直接改 row、或 UI validation 被当 server rule。

## 5. 核心术语表

| 术语 | 本章含义 |
| --- | --- |
| UI library primitive | `ElButton`、`ElTable`、`ElForm` 等通用交互组件 |
| project UI wrapper | 固化 locale、theme、layout 与默认行为的项目层 |
| business component | 知道 user、product、order、role 字段的组件 |
| page orchestration | 组合 query、rows、draft、CRUD、message 与 permission |
| form draft | 提交前独立于 table row 的可丢弃副本 |
| Router query state | 需要刷新、后退或分享仍存在的 table 状态 |
| global client state | auth、permission、theme、sidebar 等跨页面状态 |
| server state | 来自服务端并需要缓存、失效、重取的数据；本章不实现 |
| backend authorization | 服务端对每个受保护 operation 的最终判定 |

## 6. 底层心智模型

一次表格编辑链是：Router query 产生搜索与分页状态；page 过滤本地 collection；`ElTable` 渲染 rows；点击 operation 后从 row 克隆 draft；`ElForm` 只验证当前 UI model；提交才由 page 更新 collection；Message 显示结果。任何真实请求、runtime response validation、token 或 backend authorization 都不在这条 Chapter 08 链中。

## 7. 推荐目录结构

目录按机制而非组件库 demo 分类：`contracts/` 定义数据形状，`composables/` 定义状态转移，`ui/` 与 `theme/` 适配 library，`forms/`、`tables/`、`upload/`、`permissions/` 定义业务能力，`layout/` 组合项目壳，`admin-dashboard/` 只做页面编排。该结构覆盖 roadmap 的 `admin-layout`、`data-table-page`、`search-form`、`edit-dialog`、`user-form`、`file-upload`、`permission-button`、`theme-switcher`，并补齐 drawer、i18n 与最终项目。

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
npm run typecheck
npm run test:unit
npm run build
```
</div>

浏览 `http://localhost:5173/`，滚动到 Chapter 08。选择本地角色后观察菜单、按钮、query、dialog、drawer、upload、theme 与 locale。`npm run dev` 只启动开发服务，不替代 `vue-tsc`、unit tests 或 production build。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Admin UI mental model：UI library、project UI、business component 与 page orchestration

**结论：** `ElTable` 不应知道 user CRUD；`UsersTablePage.vue` 才是 query、rows、dialog 与 CRUD 的 orchestration owner。

**本节解决的问题：** 避免把 UI library demo 当业务架构，也避免一个巨型 SFC 同时拥有所有层。

**技术意义：** owner 明确后，换 UI primitive 不会改变 domain contract，接入 API 时也只替换 collection boundary。

**概念解释：** primitive 提供 props/events；project wrapper 固化默认设置；business component 绑定字段；page 组合用例。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** 本节把 render 交给四层 UI，把 query 交给 Router，把 auth/theme 交给 Pinia，把 draft/queue 留在局部，并把 server 与 authorization 标为未实现边界。

**Admin UI 机制证据链：** 1 render owner=`UsersTablePage`+`DataTablePage`；2 state owner=query/局部 draft/Pinia；3 `ElTable` 收 `rows`；4 emits 触发 page handler；5 `AdminUser` 建模；6 `UserForm` 做前端 rules；7 rules 不证明服务端接受；8 dialog open 克隆、close 丢弃；9 keyword/page/sort 在 URL，selection 局部；10 `users:edit` 控制按钮；11 服务端仍须授权；12 `File` 来自浏览器；13 含 `fail` 文件名模拟失败；14 `admin.title` 与 Element locale 分离；15 permission/theme/sidebar stores 被读取；16 `uiUserKeyword` 被读写；17 Vite 转换、`vue-tsc` 查类型；18 若 primitive 直接写业务 collection，即识别为层级泄漏。

**TypeScript 编译期过程：** `AdminUser`、`OperationPermission` 和 typed emits 限制字段、operation 与事件参数。

**JavaScript / Vue / Element Plus 运行时过程：** Vue 将 reactive owner 的值传给 Element Plus props，Element Plus 发事件，page 执行状态转移并触发 render。

**API / 语法规则：** props 向下、events 向上；slots 注入 operation UI；composable 返回状态与动作。

**文件结构：** `contracts/` → `composables/` → focused business component → `admin-dashboard/`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: layer-contract.ts</span></div>

```ts
type LayerOwner = "ui-primitive" | "project-ui" | "business" | "page";
const tableOwner: LayerOwner = "page";
```
</div>

**逐行解释：** literal union 只允许四层；`tableOwner` 明确 query/CRUD orchestration 不属于 primitive。

**执行过程：** page 算 rows → wrapper 传 props → primitive render → event 回到 page → owner 更新 state。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** 每种值只有一个 owner，render 是这些 owner 的投影，而不是额外的状态副本。

**为什么得到这个结果：** Vue 数据流与 Element Plus API 都要求调用方提供 model；library 无法推断业务政策。

**对比写法：** 好的 page 组合 typed components；坏的写法在 `ElTableColumn` slot 中直接散布请求、校验和权限。

**常见错误为什么错：** 复制 demo 只复制表现，未建立 owner、contract、reset 与 security boundary。

**与真实项目的关系：** 后续替换数据源或 UI library 时，稳定层能限制修改范围。

**与当前学习主线的关系：** 复用 Chapter 03–07 的 component、composable、type、Router 与 Pinia 边界。

**最终记忆模型：** primitive 画 UI，business component 懂字段，page 懂用例，Router/Pinia/backend 各守自己的状态边界。

<a id="section-9-2"></a>

### 9.2 Element Plus installation：global plugin、CSS import、ConfigProvider 与 single app boundary

**结论：** 唯一 app 依次安装 Pinia、Vue I18n、Element Plus、Router，再 mount；CSS 只在 `elementPlus.ts` 导入。

**本节解决的问题：** 防止第二个 app、漏 CSS、重复 plugin root 或用 auto-import 增加本章噪音。

**技术意义：** plugin order 和 single app 保证 inject、global components、Router 与 stores 共享同一 app context。

**概念解释：** `app.use(ElementPlus)` 注册组件/服务，CSS import 进入 Vite graph，`ElConfigProvider` 在 dashboard 子树覆盖 locale。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** installation 只属于 app/runtime 与 project UI；它不接管业务 state、Router query、File、server 或授权。

**Admin UI 机制证据链：** 1 render owner仍是 components；2 app context 是 plugin owner；3 `ElConfigProvider` 收 `locale`；4 locale ref 改变 provider prop；5 `AdminLocale` 限制 key；6 form rules 后续运行；7 plugin 不验证业务；8 draft lifecycle 不受安装影响；9 query 仍由 Router；10 permission 仍由 store adapter；11 backend 未被安装；12 File 仍是 browser object；13 simulated error 不受 plugin 影响；14 `elementPlusLocale` 选 en/zhCn；15 Pinia 先安装；16 query keys 不变；17 Vite bundle CSS、`vue-tsc` 读取 global types；18 若组件无样式或 injection 分裂，检查 CSS/plugin/第二 app。

**TypeScript 编译期过程：** `element-plus/global` 让 SFC template global components 可被 `vue-tsc` 识别。

**JavaScript / Vue / Element Plus 运行时过程：** import 执行 CSS side effect，plugin 注册 global assets，provider 用 inject 向子树提供 config。

**API / 语法规则：** 一个 `createApp`；所有 `app.use` 在 `mount` 前；provider 只包需要配置的子树。

**文件结构：** `ui/elementPlus.ts`、`i18n/adminI18n.ts`、真实 `main.ts`、`theme/AdminConfigProvider.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-01-application-boundary/main.ts</span></div>

```ts
const app = createApp(App);

app.use(pinia);
app.use(adminI18n);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
```
</div>

**逐行解释：** 先创建唯一 context；依次提供 global client state、messages、UI library、navigation；最后 mount。

**执行过程：** Vite 解析 imports → modules 执行 → plugins 注册 → root component mount → Chapter 08 provider 生效。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** 安装只建立运行环境；上述业务值均保持原 owner。

**为什么得到这个结果：** Vue plugin 依附 app instance；不同 app 的 provides/global components 不共享。

**对比写法：** `createApp(AdminUiChapterApp)` 会制造第二棵 app tree，违反学习 shell 与共享 store/router 边界。

**常见错误为什么错：** 只安装 npm package 不等于注册 plugin，更不等于导入 CSS。

**与真实项目的关系：** production app 也应集中 root integrations，避免 feature 自行创建 app。

**与当前学习主线的关系：** 延续 Chapter 01 application boundary、Chapter 06 Router 和 Chapter 07 Pinia root。

**最终记忆模型：** package 是代码，plugin 是 app 注册，CSS 是 Vite side effect，provider 是子树配置。

<a id="section-9-3"></a>

### 9.3 UI library comparison：Element Plus、Naive UI、Ant Design Vue 的选型边界

**结论：** 本章只安装并深入使用 Element Plus；另外两个 library 只做 API、theme 与设计系统边界比较。

**本节解决的问题：** 避免三套 dependency、CSS、组件 contract 与交互规范同时进入一个小型学习项目。

**技术意义：** 深入一套 library 才能练到 wrapper、business component、validation、theme 和 locale，而不是只看按钮外观。

**概念解释：** library selection 是设计、团队经验、生态、可访问性、维护成本与 component contract 的系统决策。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** comparison 不改变任何 runtime owner；只有 Element Plus 进入 dependencies、Vite graph 和 render tree。

**Admin UI 机制证据链：** 1 Element Plus primitive render；2 page/Router/Pinia owners 不变；3 `ElTable` 接收 rows；4 Vue events 更新值；5 comparison 用 typed record；6 rules 来自实际 Element form；7 选 library 不提供 backend validation；8 draft lifecycle 属于 composable；9 query 属于 Router；10 button permission 属于 adapter；11 backend authorization 独立；12 File 独立；13 upload failure 本地；14 locale 使用实际 library package；15 stores 不依赖 comparison；16 `uiUserKeyword` 不变；17 Vite 只 bundle installed imports；18 若同一页面出现三套 reset/theme contract，就是选型边界失控。

**TypeScript 编译期过程：** `UiLibraryComparison` 强制记录 fit、tradeoff 与 installed，而非散乱文本。

**JavaScript / Vue / Element Plus 运行时过程：** dashboard table 只渲染 comparison data；未安装 library 没有运行时代码。

**API / 语法规则：** conceptual comparison 不得伪造 import；`installed: false` 明确当前事实。

**文件结构：** `ui/uiLibraryComparison.ts` 记录决策，`DashboardHome.vue` 展示。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-08-admin-ui-forms/ui/uiLibraryComparison.ts</span></div>

```ts
export type UiLibraryComparison = {
  library: "Element Plus" | "Naive UI" | "Ant Design Vue";
  strongestFit: string;
  tradeoff: string;
  installed: boolean;
};
```
</div>

**逐行解释：** union 限定比较对象；fit/tradeoff 迫使选型有依据；installed 区分阅读对象与 runtime dependency。

**执行过程：** static records → `ElTable` props → rows render；不会加载未安装 library。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** 只有 comparison rows 改变；所有业务机制仍基于 Element Plus。

**为什么得到这个结果：** 工程能力来自深入 contract 与 boundary，不来自 dependency 数量。

**对比写法：** 同时安装三套会扩大 bundle、CSS 冲突与认知表面，却没有增加业务用例。

**常见错误为什么错：** 把“roadmap 要理解三套”误解成“一个 lab 必须运行三套”。

**与真实项目的关系：** 团队应留下 decision record，而不是在业务代码中长期混用。

**与当前学习主线的关系：** Chapter 05 的 dependency/type boundary 在这里变成 UI platform selection。

**最终记忆模型：** 比较可以广，implementation 必须深且一致。

<a id="section-9-4"></a>

### 9.4 Admin layout：container、sidebar、topbar、breadcrumb、tabs 与 route/menu/pinia 边界

**结论：** `AdminLayout` 只排版 slots；sidebar collapsed 来自 Pinia；当前 dashboard tab 局部；Chapter 06 route/menu 仍由 Router。

**本节解决的问题：** 防止 layout 同时变成 auth、permission、route 与业务数据中心。

**技术意义：** layout 可复用，route lab 不被覆盖，嵌入式 dashboard 不接管全局 URL path。

**概念解释：** `ElContainer/Aside/Header/Main` 表达结构；menu、breadcrumb、tabs 分别是导航意图、当前位置展示和本地 workspace 切换。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** layout 是 project UI；collapsed/auth/permission 属 Pinia；active tab 局部；route path/query 属 Router；业务 draft、File、server、authorization 不进入 layout。

**Admin UI 机制证据链：** 1 `AdminLayout` render；2 collapsed=Pinia、active tab=local；3 Aside 收 width、Menu 收 active；4 select emit 改 activeId；5 `AdminTab/AdminMenuItem` 建模；6 无业务 validation；7 layout 不证明授权；8 dialog/drawer 独立；9 table query 仍在 URL；10 menu/button visibility 读角色；11 backend 仍验证 operation；12 File 不经过 layout；13 upload error 在 upload owner；14 topbar 切换 locale；15 auth/permission/sidebar/theme stores 被读；16 table query keys 不由 menu 写；17 `vue-tsc` 查 slot/emit 类型；18 layout 若直接改 order rows 即边界错误。

**TypeScript 编译期过程：** `AdminTab["id"]` 同时限制 menu index、tabs model 与 dashboard branch。

**JavaScript / Vue / Element Plus 运行时过程：** Pinia collapsed 改变 Aside width；Menu 发 select；tabs model 改变 `v-show` 分支。

**API / 语法规则：** layout 使用 named slots；Menu index 是 string，handler 再收窄到已知 tab id。

**文件结构：** `layout/AdminLayout.vue`、`AdminSidebar.vue`、`AdminTopbar.vue`、`AdminBreadcrumb.vue`、`AdminTabs.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: layout-slots.vue</span></div>

```vue
<AdminLayout>
  <template #sidebar><AdminSidebar /></template>
  <template #topbar><AdminTopbar /></template>
  <DashboardHome />
</AdminLayout>
```
</div>

**逐行解释：** wrapper 定义空间，focused components 填入内容，业务 page 不被 layout 内部硬编码。

**执行过程：** store 解析 sidebar → layout 计算 width → menu 过滤 roles → tab event 选择内容 branch。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** layout 只响应 collapsed、role、activeId、theme/locale；其余 state 由内容组件保留。

**为什么得到这个结果：** 空间结构与业务用例变化频率不同，slot 能保持依赖方向。

**对比写法：** 把所有 management pages import 到 `AdminLayout` 会让 wrapper 变成 page orchestrator。

**常见错误为什么错：** 把 active local tab 写入全局 Router path 会接管 Chapter 06 router lab；把 collapsed 写 query 又使纯偏好污染 URL。

**与真实项目的关系：** 真实 admin shell 可把 tabs 替换为 route-driven，但 owner 必须按可分享性明确选择。

**与当前学习主线的关系：** 连接 Chapter 03 slots、Chapter 06 Router 和 Chapter 07 sidebar/auth stores。

**最终记忆模型：** layout 排空间，Router 排地址，Pinia 保存跨页面偏好，page 排业务。

<a id="section-9-5"></a>

### 9.5 Data table page：ElTable、ElPagination、columns、selection、sorting 与 operation slots

**结论：** `DataTablePage` 是 project table wrapper；业务 page 提供 typed rows/columns/query handlers，selection 保持局部。

**本节解决的问题：** 分离 table presentation、business filtering、URL sorting 与 operation actions。

**技术意义：** 通用 table 不依赖 user/product/order 字段，业务 page 仍掌握排序和 CRUD。

**概念解释：** rows 是当前页投影，columns 是展示 contract，total 来自 filtered collection，operations 通过 slot 注入。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** `ElTable` 是 primitive，`DataTablePage` 是 wrapper，entity page 是 owner；selection 局部，search/page/sort 在 Router，collection 局部，本章无 server。

**Admin UI 机制证据链：** 1 wrapper render；2 rows=page derived、selection=local、query=Router；3 Table 收 data/row-key、Pagination 收 page/pageSize/total；4 sort/page emits 写 query；5 generic Row/ColumnKey 建模；6 table 无 form validation；7 visible rows 不证明 server data；8 operation 打开 cloned draft；9 sort/page URL、selection local；10 slot button查 operation permission；11 delete/update 服务端仍授权；12 File 无关；13 upload error 无关；14 locale 影响内建分页文本；15 permission/preference store 可读；16 `uiUserPage/uiUserSort` 写入；17 `vue-tsc` 检查 generic slots；18 total、rows、page 多 owner 时会出现分页漂移。

**TypeScript 编译期过程：** generic SFC 约束 `Row extends { id: string }`，column key 必须是 row key。

**JavaScript / Vue / Element Plus 运行时过程：** computed filtered rows 被 slice，Table 渲染；sort-change 生成 typed sorting，Router replace 后重新计算。

**API / 语法规则：** `row-key="id"`；custom sorting 用 `sortable="custom"` 与 `sort-change`；pagination props 保持受控。

**文件结构：** `tables/DataTablePage.vue` 被 users/products/orders pages 复用。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: table-contract.vue</span></div>

```vue
<ElTable :data="rows" row-key="id" @sort-change="sortChange">
  <ElTableColumn prop="name" label="Name" sortable="custom" />
</ElTable>
```
</div>

**逐行解释：** data 由 caller 控制；稳定 id 维持 row identity；custom event 把业务排序交还 page。

**执行过程：** query → filter/sort computed → pagination slice → props → table render → event → router.replace → 新 render。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** table props 随 query 派生；selection 不进 URL；点击 operation 才创建 draft。

**为什么得到这个结果：** Element Plus 只知道表格交互，不知道 URL、domain sort 或 CRUD owner。

**对比写法：** 让 table 内部另存 page/total 会形成双 source of truth。

**常见错误为什么错：** array index 作为 row key 会在 insert/delete/sort 后把选择和 DOM identity 对错行。

**与真实项目的关系：** 后续 server pagination 仍保留受控 props/events，只替换 rows/total source。

**与当前学习主线的关系：** 延续 typed props/emits、computed derivation 与 Router query。

**最终记忆模型：** table 显示 rows，page 解释 rows，Router保存可分享 query。

<a id="section-9-6"></a>

### 9.6 Search form state：Router query、component local state、Pinia state 的归属判断

**结论：** draft input 可局部，提交后的 keyword/status/page/pageSize/sort/order 使用 namespaced Router query；不复制到 Pinia。

**本节解决的问题：** 刷新、后退、分享链接时保持 table intent，同时避免每次按键都污染 URL。

**技术意义：** URL 成为提交后 query 的唯一 source of truth，Pinia 只保留真正跨页面的 global client state。

**概念解释：** SearchForm 的 `draft` 是编辑缓冲；submit emit 后 `useAdminTableQuery` 用 `router.replace` 写 URL。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** input draft=component，committed table query=Router，auth/theme=Pinia，rows=local simulation；server、File、backend policy 不参与。

**Admin UI 机制证据链：** 1 SearchForm/business page render；2 input local、committed query Router；3 Input/Select 收 draft models；4 submit emit 写 query；5 `TableSearchState/TableQueryState` 建模；6 空值 normalize 是前端约束；7 query 合法不证明 backend filter safe；8 opening forms 不改变 search draft；9 keyword/page/sort URL、selection local；10 permission 不控制搜索；11 protected data 仍由 backend过滤授权；12 File 无关；13 upload error 无关；14 provider locale 影响 controls；15 不写 Pinia，只可读 preferences；16 `uiUserKeyword/Page/PageSize/Sort/Order`；17 `vue-tsc` 查 query shape，Vite 不做类型检查；18刷新丢 filter 或 Pinia/query 不一致时说明 owner 选错。

**TypeScript 编译期过程：** prefix literal union 限制 query namespace，normalizer 将 Router 的 string/null/array 收窄成 domain state。

**JavaScript / Vue / Element Plus 运行时过程：** route.query reactive 改变 computed query；form watch 同步已提交值；submit 后 Router replace 不增加 history entry。

**API / 语法规则：** 合并 `route.query` 避免删除其他 lab keys；空值写 `undefined`；pageSize 与 page 必须规范化。

**文件结构：** `forms/SearchForm.vue` 与 `composables/useAdminTableQuery.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: query-update.ts</span></div>

```ts
void router.replace({
  query: {
    ...route.query,
    uiUserKeyword: search.keyword || undefined,
    uiUserPage: "1",
  },
});
```
</div>

**逐行解释：** replace 保持当前 history；merge 保留其他 keys；空 keyword 删除 key；新搜索回到第一页。

**执行过程：** 用户编辑 local draft → submit → typed event → replace query → computed query 更新 → rows 重算。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** 只有 submit 才把 draft 提升为 URL state；其他 owners 不变。

**为什么得到这个结果：** 可分享、可刷新、可回退的状态天然属于 URL；短暂输入不需要立即持久。

**对比写法：** 同一 keyword 同时放 Router 和 Pinia 会产生同步顺序、初始化与回退冲突。

**常见错误为什么错：** “多个组件要读”不是放 Pinia 的充分条件；Router 已经是全局可观察 owner。

**与真实项目的关系：** server search 也可直接用 normalized query 构造请求参数。

**与当前学习主线的关系：** 直接应用 Chapter 06 URL state 与 Chapter 07 store boundary。

**最终记忆模型：** 输入中是 draft，提交后是 URL；不要再复制一份 Pinia。

<a id="section-9-7"></a>

### 9.7 Dialog form：create/edit mode、draft clone、validation、submit commit 与 reset on close

**结论：** create 生成空 draft，edit 克隆 row；只有 validate 成功并 submit 后才 commit，close 必须丢弃 draft。

**本节解决的问题：** 防止用户在 dialog 中输入时提前改变 table row，或下次打开看到上次残留。

**技术意义：** draft 形成 transaction-like UI boundary：打开、编辑、验证、提交或回滚。

**概念解释：** `useDialogFormState` 持有 visible/mode/sourceId/draft；`EditDialog` 只组合 `ElDialog` 与 `UserForm`。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** dialog visible/draft 是局部 flow；row collection 属 page；query 属 Router；permission 属 Pinia reader；server commit 与授权仍不存在。

**Admin UI 机制证据链：** 1 EditDialog/UserForm render；2 draft=dialog flow；3 Dialog 收 visible/title、Form 收 model/rules；4 v-model 改 draft、submit emit 调 page；5 `CrudMode/UserFormModel`；6 Form rules；7 不证明 email 唯一或 backend policy；8 open clone、close/reset discard；9 table query 保持 URL、dialog state local；10 edit/create buttons查 permission；11 backend update仍授权；12 File 无关；13 upload error 无关；14 provider locale控制 dialog内建文本；15 permission store被读；16 `uiUser*` 不因 dialog 改变；17 `vue-tsc` 查 model/event；18取消后 row 已变说明使用了直接引用。

**TypeScript 编译期过程：** generic composable 分离 source record 与 draft type，并要求 clone function。

**JavaScript / Vue / Element Plus 运行时过程：** shallowRef 指向新 object；inputs mutate draft；close 替换为新 empty draft；table row 保持不变。

**API / 语法规则：** `v-model:visible` 控制 dialog，`destroy-on-close` 销毁 UI subtree，但 state reset 仍由 owner 显式完成。

**文件结构：** `useDialogFormState.ts`、`EditDialog.vue`、`UserForm.vue`、`UsersTablePage.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: dialog-open.ts</span></div>

```ts
function openEdit(id: string, source: AdminUser): void {
  mode.value = "edit";
  sourceId.value = id;
  draft.value = { ...source };
  visible.value = true;
}
```
</div>

**逐行解释：** mode 选择提交分支；id 保留更新目标；spread 创建独立 draft；最后显示 dialog。

**执行过程：** operation click → clone → dialog render → v-model mutate → validate → page commit；cancel 则 reset 不 commit。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** validation 只围绕 draft；query/queue/store 不变；commit 后 collection 改变并重绘 table。

**为什么得到这个结果：** object 是引用值；若不 clone，两个变量会指向同一 row object。

**对比写法：** `draft.value = source` 会让 cancel 失去回滚意义。

**常见错误为什么错：** 只依赖 `destroy-on-close` 不一定重置外部 composable 的 draft。

**与真实项目的关系：** API mutation 应在 commit 后发生，失败时保留 draft 并显示 server error。

**与当前学习主线的关系：** 组合 Chapter 02 reactivity、Chapter 04 composable 与 Chapter 05 contracts。

**最终记忆模型：** row 是 committed state，dialog 是 disposable draft。

<a id="section-9-8"></a>

### 9.8 Drawer form：large form UX、drawer lifecycle、dirty state 与 reset policy

**结论：** drawer 适合较长 product form；它与 dialog 一样克隆 draft，但额外显式追踪 dirty。

**本节解决的问题：** 长表单需要更多空间，同时 close 时必须清晰处理未保存修改。

**技术意义：** UI 容器可变化，draft ownership、validation 与 commit boundary 不应变化。

**概念解释：** `useDrawerFormState` 在 dialog state 之外维护 dirty；任何 field change 标记 dirty，submit/close 重置。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** Drawer 是 primitive，EditDrawer 是 business wrapper，draft/dirty 属局部，product query 属 Router，theme/permission 属 Pinia，server/authorization 不在本章。

**Admin UI 机制证据链：** 1 EditDrawer/ProductForm render；2 draft+dirty=drawer owner；3 Drawer 收 visible/title/size；4 form change emit 标 dirty；5 `ProductFormModel/CrudMode`；6 rules校验 price/stock；7 不证明库存真实；8 open clone、close reset、submit commit；9 product query URL、dirty local；10 product operation permission；11 backend仍授权；12 File 无关；13 upload error 无关；14 locale影响 controls；15 permission/theme stores；16 `uiProduct*`；17 `vue-tsc` 查 numeric model；18关闭重开仍残留或表格提前变说明 lifecycle 错。

**TypeScript 编译期过程：** product numeric fields 与 status union 限制 form/model 分支。

**JavaScript / Vue / Element Plus 运行时过程：** input events 改 draft 并 emit change；Alert 由 dirty 条件 render；close 替换 draft。

**API / 语法规则：** `ElDrawer` 的 model 控制显示；复杂 close-confirm 可使用 `before-close`，本地 lab 用明确 warning 与 cancel。

**文件结构：** `useDrawerFormState.ts`、`EditDrawer.vue`、`ProductForm.vue`、`ProductsTablePage.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: drawer-dirty.ts</span></div>

```ts
function markDirty(): void {
  dirty.value = true;
}

function close(): void {
  visible.value = false;
  resetDraft();
}
```
</div>

**逐行解释：** change 只标记 UI state；close 隐藏并通过统一 reset 清理 draft/sourceId/dirty。

**执行过程：** open → clone → field change → dirty alert → validate → commit/reset，或 close/reset。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** dirty 只影响 drawer alert；commit 才影响 product rows；URL/store/queue 不被复制。

**为什么得到这个结果：** drawer 只是空间和 lifecycle primitive，不是新的业务 state owner。

**对比写法：** 把 dirty 放 Pinia 会让一次局部编辑泄漏到其他页面与持久化。

**常见错误为什么错：** close 只改 visible 而不 reset 会复用旧 sourceId 和 draft。

**与真实项目的关系：** 生产项目可在 `before-close` 二次确认，但仍由 draft owner 决定。

**与当前学习主线的关系：** 再次验证 composable 不依赖具体 presentation container。

**最终记忆模型：** drawer 更大，不代表 owner 更全局。

<a id="section-9-9"></a>

### 9.9 Form validation：Element Plus FormInstance、FormRules、frontend validation 与 backend validation boundary

**结论：** `FormInstance.validate()` 决定当前 UI draft 能否提交；backend 必须重新验证 payload、身份、权限与业务一致性。

**本节解决的问题：** 防止调用 validate 后忽略 rejection，或把浏览器通过误称为可信数据。

**技术意义：** 用户体验 validation 与 trust validation 被明确分层。

**概念解释：** rules 关联 model prop；FormInstance 是 runtime instance ref；`useElementFormValidation` 把 validate/reset/clear 统一成 typed API。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** Form/runtime 只校验 local draft；TypeScript 只查静态用法；Router/Pinia/Element Plus 都不能替代 server validation 或 authorization。

**Admin UI 机制证据链：** 1 UserForm/ProductForm render；2 model=draft owner；3 Form 收 model/rules、FormItem 收 prop；4 input v-model mutate、submit调用 validate；5 `FormRules<T>/FormValidationState`；6 required/email/min；7 不证明唯一性、库存、权限；8 validation成功后才 dialog/drawer commit；9 query不变；10 submit入口仍受 operation permission；11 backend重验；12 browser File由 upload rules另检；13 simulated error另存；14 locale可改变 built-in labels；15 permission store只管 UI intent；16 query keys不变；17 `vue-tsc` 查规则/model类型；18 invalid form仍提交说明忽略 validate result。

**TypeScript 编译期过程：** `FormRules<UserFormModel>` 让 rule keys 与 model 字段对齐，但类型在运行时擦除。

**JavaScript / Vue / Element Plus 运行时过程：** Form 收集 field validators；validate 返回 Promise；失败进入 catch，成功才 emit submit。

**API / 语法规则：** FormItem `prop` 必须对应 model path；ref 在 mount 后才有实例；resetFields/clearValidate 语义不同。

**文件结构：** `useElementFormValidation.ts`、`UserForm.vue`、`ProductForm.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: validate-submit.ts</span></div>

```ts
const result = await validate();

if (result.valid) {
  emit("submit");
}
```
</div>

**逐行解释：** await 等待所有 field rules；只有显式检查 valid 才进入 commit path。

**执行过程：** submit event → validators → error state render 或 typed submit event → page commit。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** failed validation 只改变 FormItem error UI；rows/query/store 不变；成功后 page 才改 rows。

**为什么得到这个结果：** frontend 环境由用户控制，且无法独立判断服务端数据库与 authorization。

**对比写法：** 仅用 TypeScript interface 不会在 runtime 验证 input 或 response。

**常见错误为什么错：** `formRef.value?.validate(); emit("submit")` 会并行发出 submit，不等待失败结果。

**与真实项目的关系：** Chapter 09 将在请求边界增加 runtime payload/response 处理，backend 仍是最终信任边界。

**与当前学习主线的关系：** 连接 Chapter 05 的 type erasure 与 Vue template ref。

**最终记忆模型：** FormRules 改善 UX，不建立信任。

<a id="section-9-10"></a>

### 9.10 Local CRUD flow：create、edit、delete、confirm、message 与 local collection owner

**结论：** 本章 CRUD 只修改 page-local array；create/update/delete 通过 composable，delete 先 MessageBox confirm，结果用 Message 反馈。

**本节解决的问题：** 在无 API 情况下练完整 UI flow，同时不伪装成 persistence。

**技术意义：** 页面 contract 未来可替换成 server mutation，现有 form/table 层无需推倒。

**概念解释：** `useLocalCrudCollection` 每次替换 array 触发响应式更新，并克隆传入记录避免共享可变引用。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** collection 属 page local simulation；Message/Box 是 UI service；server state、持久化、API authorization 明确未实现。

**Admin UI 机制证据链：** 1 page/table render；2 collection=page local；3 Table收 rows、MessageBox收确认文本；4 operation event触发 create/update/delete；5 entity types与 CrudMode；6 form先验证；7 不证明 server接受；8 draft submit才 commit；9 query URL、collection local；10 buttons按 operation permission；11 backend未来再授权；12 File无关；13 upload error无关；14 messages可迁移 i18n keys；15 auth/permission store读取；16 delete不改 query keys；17 `vue-tsc` 查 item id；18刷新数据消失说明这是 local CRUD，不是 bug。

**TypeScript 编译期过程：** generic `Item extends { id: string }` 保证 update/delete 有稳定 identity。

**JavaScript / Vue / Element Plus 运行时过程：** array replacement invalidates computed rows；MessageBox Promise 决定是否进入 delete。

**API / 语法规则：** create append clone，update map by id，delete filter by id，replace clone all。

**文件结构：** `useLocalCrudCollection.ts` 与 users/products/orders pages。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: local-update.ts</span></div>

```ts
collection.value = collection.value.map((current) =>
  current.id === id ? cloneItem(item) : current,
);
```
</div>

**逐行解释：** map 创建新 array；只替换目标 id；clone 避免 caller 后续修改已提交 row。

**执行过程：** button → permission decision → optional confirm → composable mutation → computed table rows → Message。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** collection 改变后 total/visibleRows 重算；query 与 global store 不被当成数据仓库。

**为什么得到这个结果：** `shallowRef` 通过整体替换发通知，避免深层泛型 unwrap 问题。

**对比写法：** 直接在 template slot 中 splice rows 会把 presentation 与 mutation owner 混在一起。

**常见错误为什么错：** 没有 confirm 的 destructive action 容易误触；刷新后仍宣称已保存则混淆 local 与 server。

**与真实项目的关系：** 后续把 mutation adapter 替换成 API，并处理 loading/error/cache invalidation。

**与当前学习主线的关系：** 使用 Chapter 04 composable 和 Chapter 05 generic contract。

**最终记忆模型：** 本章 CRUD 是 UI transaction rehearsal，不是数据持久化。

<a id="section-9-11"></a>

### 9.11 File upload：ElUpload、browser File object、type/size check、failure、retry 与 server boundary

**结论：** `ElUpload` 只选择 browser `File`；queue 校验 MIME/size、模拟 success/failure/retry，不设置 endpoint。

**本节解决的问题：** 把 file selection、queue lifecycle、transport 与 server validation 分开。

**技术意义：** upload UI 能独立测试 status transitions，未来接 transport 时不重写展示层。

**概念解释：** `UploadFile.raw` 才是 browser File；queue item 记录 status 和 failureReason；文件名含 `fail` 产生确定性本地失败。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** ElUpload 是 picker UI，File 是 browser object，queue 是局部；本章没有 HTTP、object storage、malware scan 或 backend authorization。

**Admin UI 机制证据链：** 1 FileUploadPanel/QueueTable render；2 queue=component local；3 Upload收 auto-upload=false/on-change；4 change把 raw File加入queue；5 `UploadQueueItem/FailureReason`；6 MIME/2MB前端检查；7 不证明真实内容或服务端安全；8 无 dialog draft；9 table query不参与；10 upload button读 `uploads:manage`；11 backend未来验证身份/内容；12 File来自 browser input；13 filename `fail` 模拟 network error；14 provider locale影响 Upload内建文本；15 permission store读取，File不进Pinia；16 Router query不存File；17 DOM lib提供File类型、`vue-tsc` 查handler；18把 File 持久化或直接信任 MIME 是 boundary bug。

**TypeScript 编译期过程：** `UploadFile.raw` 被判空后收窄为 `UploadRawFile`/File；status 与 reason 都是 literal union。

**JavaScript / Vue / Element Plus 运行时过程：** 浏览器创建 File；Element Plus 包装为 UploadFile；composable 建 queue item 并整体替换 array。

**API / 语法规则：** `auto-upload=false` 禁止自动传输；accept 只是 picker hint；仍需 client check，未来还需 server check。

**文件结构：** `upload/FileUploadPanel.vue`、`UploadQueueTable.vue`、`useUploadQueue.ts`、`uploadContracts.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: upload-change.ts</span></div>

```ts
function addFile(uploadFile: UploadFile): void {
  if (uploadFile.raw) {
    uploadQueue.addFiles([uploadFile.raw]);
  }
}
```
</div>

**逐行解释：** handler 接 Element Plus wrapper；guard 确认 raw 存在；queue 接收真实 browser File。

**执行过程：** file input → UploadFile → validation → ready/failed → simulate → success/failed → retry/remove。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** 只有 queue 与 permission 决定 upload UI；File 不进入 form draft、Router 或 persisted store。

**为什么得到这个结果：** File 是浏览器 runtime object，不是可安全持久化或可信的 server payload。

**对比写法：** `action="/upload"` 会越过 Chapter 08 边界并制造未定义 backend。

**常见错误为什么错：** accept/type/size 都可被绕过，且 MIME 可能为空或伪造。

**与真实项目的关系：** production upload 还需 cancellation、progress、retry policy、signed URL、scan 与 server validation。

**与当前学习主线的关系：** 延续 Chapter 05 的 browser API boundary 和 Chapter 07 persistence allowlist。

**最终记忆模型：** picker 产生 File，queue 管 UI，server 才决定文件是否可信。

<a id="section-9-12"></a>

### 9.12 Button permission：visible/disabled mode、permission store、operation intent 与 API authorization

**结论：** `PermissionButton` 可隐藏或禁用 operation intent，但任何可见性都不是 API security。

**本节解决的问题：** 统一按钮 UX，同时避免把前端 role check 误称为授权。

**技术意义：** business page 不散布角色条件，permission mapping 集中且 typed。

**概念解释：** `useButtonPermission` 把 operation 映射为 Chapter 07 roles；wrapper 根据 mode 决定 v-if 或 disabled。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** permission decision 是 Pinia-derived UI state；backend authorization 是独立 server policy，不能由 button DOM 替代。

**Admin UI 机制证据链：** 1 PermissionButton render；2 role=Pinia global；3 Button收 disabled/type/title；4 click仅 allowed时emit；5 `OperationPermission`；6 无 payload validation；7 role check不证明 API允许；8 button只打开/提交相应 draft；9 query不参与；10 hidden/disabled明确；11 server每次操作再授权；12 File operation同样；13 upload failure独立；14 denial文案可用i18n key；15 permission/auth stores；16 Router query不存permission；17 `satisfies Record` 查映射完整；18改DOM启用按钮仍能操作说明后端缺授权。

**TypeScript 编译期过程：** `Record<OperationPermission, ReadonlyArray<DemoUserRole>>` 要求每个 operation 有映射且角色合法。

**JavaScript / Vue / Element Plus 运行时过程：** store role 改变 computed allowed，Vue patch 按 mode 删除按钮或更新 disabled。

**API / 语法规则：** hidden 减少无关操作；disabled 可解释不可用原因；两者只影响 presentation。

**文件结构：** `useButtonPermission.ts`、`PermissionButton.vue`、`ButtonPermissionMatrix.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: permission-click.ts</span></div>

```ts
function click(): void {
  if (allowed.value) {
    emit("click");
  }
}
```
</div>

**逐行解释：** wrapper 阻止 UI event；但用户仍可绕过 UI，所以 backend 必须再次判断。

**执行过程：** auth role → permission store → operation mapping → allowed → render/click → page handler。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** role 变化只改变可操作 UI；不会自动清除 URL 或修改数据。

**为什么得到这个结果：** 浏览器代码、Pinia state 和 DOM 都由用户控制。

**对比写法：** 在每个 template 写 `role === 'admin'` 会复制政策且无法证明完整覆盖。

**常见错误为什么错：** “按钮看不见”只描述当前 render，不描述可调用 endpoint。

**与真实项目的关系：** UI permission 提升体验，API authorization 建立安全。

**与当前学习主线的关系：** 复用 Chapter 06 route permission 与 Chapter 07 permission store，但扩展到 operation intent。

**最终记忆模型：** 前端决定怎么展示，后端决定能不能做。

<a id="section-9-13"></a>

### 9.13 Role permission UI：role matrix、menu visibility、button visibility 与 backend policy

**结论：** role matrix 只是本地可视化模型；menu 与 button 读取同一 Chapter 07 role owner，backend policy 仍独立。

**本节解决的问题：** 防止 menu、route、button 各维护互相矛盾的角色判断。

**技术意义：** 一个身份 owner 派生多种 UI projection，避免第二份 permission tree。

**概念解释：** `RolePermissionPanel` 展示 store；`RolesTablePage` 编辑本地 visibility draft；sidebar/button 都调用 permission store role check。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** current role 属 Pinia；role editor 是局部模拟；Router meta 属 Router；backend policy 不由本地 matrix 写入。

**Admin UI 机制证据链：** 1 role/table/menu render；2 identity=Pinia、matrix draft=local；3 Table/Menu/CheckboxGroup收 typed data；4 role login或form emit更新各自owner；5 `AdminRole/RoleFormModel`；6 checkbox只校验选择；7 不证明backend policy；8 role dialog clone/reset；9 query与matrix分开；10 buttons/menu用同role decision；11 backend重新授权；12 File只在upload；13 upload failure独立；14 labels可映射i18n；15 auth+permission stores；16 route meta/query不复制到matrix；17 `vue-tsc` 查role union；18同一role菜单和按钮矛盾说明派生源分裂。

**TypeScript 编译期过程：** role literal union 阻止任意字符串进入 mapping。

**JavaScript / Vue / Element Plus 运行时过程：** auth action 改 Pinia user，computed visible menu/tabs/buttons 同步 patch。

**API / 语法规则：** role matrix 是展示/编辑 intent；route guard 与 backend policy 分别在 Router/server 边界执行。

**文件结构：** `RolePermissionPanel.vue`、`ButtonPermissionMatrix.vue`、`RolesTablePage.vue`、`AdminSidebar.vue`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: role-projection.ts</span></div>

```ts
const visibleItems = computed(() =>
  menuItems.filter((item) => permissionStore.hasRole(item.requiredRoles)),
);
```
</div>

**逐行解释：** menu 是 store role 的派生值，不保存第二份可变 visible flag。

**执行过程：** sign in → auth store → permission check → menu/tabs/buttons rerender。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** 角色改变 permission projection；业务 drafts/query/queue 不自动持久化到 role matrix。

**为什么得到这个结果：** derived permission UI 应来自同一 identity source。

**对比写法：** 每个组件硬编码 role 会产生 policy drift。

**常见错误为什么错：** 本地编辑 matrix 后宣称服务端权限已改变，跨越了未实现边界。

**与真实项目的关系：** production role editor 应提交 backend policy 并重新获取 effective permissions。

**与当前学习主线的关系：** 综合 Chapter 06 route meta 与 Chapter 07 auth/permission stores。

**最终记忆模型：** 一个 identity owner，多种 UI projection，一个独立 backend policy。

<a id="section-9-14"></a>

### 9.14 Theme：Element Plus theme variables、Chapter 07 theme store 与 scoped dashboard theming

**结论：** Chapter 07 theme store 是 owner；`AdminConfigProvider` 把 theme class 和 Element Plus CSS variables 限制在 dashboard 子树。

**本节解决的问题：** 复用全局偏好但不让 Chapter 08 theme 污染前七章。

**技术意义：** state 与 presentation 分离，且 CSS variable override 有明确 scope。

**概念解释：** store 产生 `themeClass`；wrapper 绑定 class；scoped root 下定义 `--el-*` 与 admin variables。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** theme=Pinia global client state，CSS=project UI；不影响 query、draft、server、File 或授权。

**Admin UI 机制证据链：** 1 ConfigProvider subtree render；2 theme store owner；3 Select收 mode、wrapper收 class；4 v-model/action改mode；5 `ThemeMode`；6 无业务validation；7 theme不证明任何数据；8 draft lifecycle不变；9 query不变；10 permission不由颜色决定；11 backend无关；12 File无关；13 upload error样式随theme；14 locale同provider但不同ref；15 theme store读取；16无query key；17 `vue-tsc` 查mode union、Vite处理CSS；18其他章节变色说明scope泄漏。

**TypeScript 编译期过程：** store 的 `ThemeMode` 与 computed class 限制允许状态。

**JavaScript / Vue / Element Plus 运行时过程：** Pinia mutation 触发 class patch，CSS cascade 更新 Element Plus variables。

**API / 语法规则：** 使用 class scope 覆盖 CSS variables；不直接遍历 DOM 设置 style。

**文件结构：** `theme/ThemeSwitcher.vue`、`AdminConfigProvider.vue` 与 Chapter 07 `themeStore.ts`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: scoped-theme.css</span></div>

```css
.admin-scope.theme-dark {
  --el-bg-color: #1f2937;
  --el-text-color-primary: #f3f4f6;
}
```
</div>

**逐行解释：** 只有同时位于 admin scope 且 dark class 下的 descendants 接收 variables。

**执行过程：** select → store action → themeClass computed → class patch → CSS cascade → Element Plus render style。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** 只有 presentation 改变；业务 values 保持。

**为什么得到这个结果：** CSS custom properties 参与 cascade，适合子树 theme adapter。

**对比写法：** 在 `:root` 覆盖会影响整个学习 shell。

**常见错误为什么错：** 直接 `document.body.classList` 把 component lifecycle 与全局 DOM side effect 耦合。

**与真实项目的关系：** 可扩展为 design tokens，但仍由一个 store 和一个 adapter 管理。

**与当前学习主线的关系：** 将 Chapter 07 state 映射为 Chapter 08 UI presentation。

**最终记忆模型：** Pinia 保存偏好，class 表达状态，CSS variables 绘制主题。

<a id="section-9-15"></a>

### 9.15 i18n：Vue I18n、Element Plus locale、message keys 与 UI library locale boundary

**结论：** Vue I18n 管应用 messages；Element Plus locale 管 library 内建文本；一个 locale switch 同步两者但不能混为一个 API。

**本节解决的问题：** 防止只换 ConfigProvider locale 却期待业务文本自动翻译。

**技术意义：** app copy 与 third-party copy 有独立资源、fallback 和更新边界。

**概念解释：** `adminI18n` 安装全局 composer；`adminLocale` 选择 Element Plus package；LocaleSwitcher 同步 locale refs。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** messages 属 app i18n，component locale 属 provider；它们只影响 presentation，不改变业务、Router、server 或 authorization。

**Admin UI 机制证据链：** 1 LocaleSwitcher/Provider render；2 locale=small shared UI state；3 ConfigProvider收 locale object、Select收 key；4 update:modelValue同步refs；5 `AdminLocale`；6 validation message本章为English strings；7翻译不验证数据；8 draft lifecycle不变；9 query不变；10 permission label可用key；11 backend无关；12 File name不翻译；13 failure reason可映射key；14 `admin.title` 与 locale package两条链；15无需把locale复制进业务store；16无query key；17 `vue-tsc` 查locale key；18业务文案不变而分页文本改变说明只切了library locale。

**TypeScript 编译期过程：** `"en" | "zhCn"` 防止 provider 选择未知 locale。

**JavaScript / Vue / Element Plus 运行时过程：** watch 更新 composer locale；computed 选择 Element locale object；provider inject 更新子组件。

**API / 语法规则：** `createI18n({ legacy:false })` 配合 Composition API；`useI18n({ useScope:"global" })` 读取 global composer。

**文件结构：** `i18n/adminMessages.ts`、`adminI18n.ts`、`ui/elementPlusLocale.ts`、`theme/LocaleSwitcher.vue`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: locale-sync.ts</span></div>

```ts
watch(adminLocale, (value) => {
  locale.value = value;
});
```
</div>

**逐行解释：** project locale key 变化时同步 app composer；provider 另由 computed 选择 Element locale object。

**执行过程：** select key → shared ref → composer locale + Element locale computed → two presentation trees update。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** locale 只改变 label/内建文本；domain values、File names 与 URL keys 保持稳定。

**为什么得到这个结果：** Vue I18n 不拥有第三方组件内部 message catalogue。

**对比写法：** 只传 `zhCn` 给 ConfigProvider 不会翻译自定义标题。

**常见错误为什么错：** 用翻译后的 label 作为 status value 会让 domain contract 随语言变化。

**与真实项目的关系：** production 可 lazy-load app messages，同时保持 stable domain keys。

**与当前学习主线的关系：** 展示 TypeScript key、Vue provide/inject 与 library adapter 的组合。

**最终记忆模型：** 一个选择器，两套字典，稳定业务值。

<a id="section-9-16"></a>

### 9.16 Business component layering：base UI、project wrapper、business component、page component

**结论：** `ElForm` 是 base UI，`AdminConfigProvider/DataTablePage` 是 project wrapper，`UserForm` 是 business component，`UsersTablePage` 是 page。

**本节解决的问题：** 给“复用组件”建立可判定层级，而不是按文件大小猜测。

**技术意义：** 依赖方向从 page 指向业务与 wrapper，再指向 library；primitive 不反向 import domain。

**概念解释：** 每层知道的信息不同：library 知交互，wrapper 知项目默认，business 知字段，page 知 use case。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** 所有边界按知识和 state owner 分配，server adapter 将来位于 page/composable 外部依赖处。

**Admin UI 机制证据链：** 1 四层分别render；2 owner由用例决定；3 primitive收 wrapper/business props；4 events逐层上送；5 contracts在边界共享；6 business form rules；7 wrapper不证明backend；8 page控制draft lifecycle；9 page连接Router query；10 permission wrapper控制intent；11 server独立；12 upload business component接File；13 queue composable模拟error；14 provider/i18n在project layer；15 page读取stores；16 table composable读keys；17 SFC compiler/Vite/vue-tsc各司其职；18 low-level component import domain CRUD即反向依赖。

**TypeScript 编译期过程：** typed props/emits/generic slots 把每层允许知道的 shape 固化。

**JavaScript / Vue / Element Plus 运行时过程：** data 向下、event 向上；slot 让 page 提供 operation 而不让 wrapper知道 domain。

**API / 语法规则：** wrapper 接 generic rows；business form 接 domain model；page 调 composables。

**文件结构：** `ui/theme/layout/tables/DataTablePage`、`forms`、entity pages、dashboard。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: operation-slot.vue</span></div>

```vue
<DataTablePage :rows="rows" :columns="columns">
  <template #operations="{ row }">
    <PermissionButton permission="users:edit">Edit</PermissionButton>
  </template>
</DataTablePage>
```
</div>

**逐行解释：** wrapper 接通用 rows/columns；page slot 知道 user operation 与 permission。

**执行过程：** page 准备 contract → wrapper 映射 Element props → slot 传 row → business action 回 page。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** 值跨层传递但 owner 不随传递改变。

**为什么得到这个结果：** props 能被消费不等于 consumer 应拥有其业务生命周期。

**对比写法：** `DataTablePage` 内硬编码 `users:delete` 使它不再通用 wrapper。

**常见错误为什么错：** “所有 Element Plus 组件再包一层”会制造无语义 wrapper；只在需要项目默认或 boundary 时包装。

**与真实项目的关系：** 分层允许设计系统与业务迭代不同步而不互相污染。

**与当前学习主线的关系：** Chapter 03 component boundary 在大型 UI 中的直接落地。

**最终记忆模型：** 按知道什么分层，按谁负责生命周期定 owner。

<a id="section-9-17"></a>

### 9.17 Admin dashboard integration：login、users、roles、products、orders、upload 与 local state flow

**结论：** `VueAdminDashboard` 组合模块与 layout，不重新实现模块内部 CRUD/query/upload。

**本节解决的问题：** 把多个业务页面接成一个可运行项目，同时保持各 feature owner。

**技术意义：** integration component 只协调 active tab、role visibility 与 shell，不变成巨型 store。

**概念解释：** LoginPanel 写 auth store；visible tabs 由 role 派生；各 management component 保持 mounted 以保留 local lab state。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** dashboard 是 page orchestration；feature local state 留在 feature；auth/theme/sidebar 在 Pinia；query 在 Router；无 server。

**Admin UI 机制证据链：** 1 dashboard/layout/pages render；2 active tab local、auth global；3 Layout/Tabs/Alert收props；4 login/select events改变store/tab；5 `AdminTab/AdminRole`；6 feature forms各自验证；7仍无backend trust；8 feature负责draft；9各table使用namespaced URL keys；10 role过滤tabs/buttons；11 backend未来授权；12 upload page持File；13 local deterministic failure；14 topbar切locale；15 auth/permission/theme/sidebar stores；16 uiUser/uiProduct/uiOrder keys；17 `vue-tsc` 查整合contract；18dashboard直接修改各collection说明orchestrator过重。

**TypeScript 编译期过程：** `Record<AdminTab["id"], ReadonlyArray<AdminRole>>` 保证每个 tab 都有 role mapping。

**JavaScript / Vue / Element Plus 运行时过程：** sign-in 触发 visibleTabs computed；activeId 驱动 `v-show`；未授权 active tab 自动回 dashboard。

**API / 语法规则：** `v-show` 保留已 mounted feature state；watch 修复 role change 后无效 active tab。

**文件结构：** `admin-dashboard/*.vue` 与 `layout/*.vue`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: dashboard-branches.vue</span></div>

```vue
<DashboardHome v-show="activeId === 'dashboard'" />
<UserManagement v-show="activeId === 'users'" />
<OrderManagement v-show="activeId === 'orders'" />
```
</div>

**逐行解释：** 每个模块独立；dashboard 只选择可见 branch，不接管其内部 state。

**执行过程：** local login → shell render → menu/tab select → module render → module-specific flow。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** dashboard 组合这些 owner 的 projection，不创建统一副本。

**为什么得到这个结果：** integration layer 的职责是连接，不是吸收所有实现。

**对比写法：** 把 users/products/orders arrays 全放 dashboard 会增加耦合。

**常见错误为什么错：** 将 dashboard 替换为全局 RouterView 会破坏单页学习 shell。

**与真实项目的关系：** production 可用 route-view 替代 local tabs，但 feature boundaries 保持。

**与当前学习主线的关系：** 把前七章机制放入一个 job-oriented scenario。

**最终记忆模型：** dashboard 连接 owners，不成为唯一 owner。

<a id="section-9-18"></a>

### 9.18 Chapter integration：Router query、Pinia stores、Element Plus forms 如何协作

**结论：** Router 保存可分享 table intent，Pinia 保存跨页面 client state，Element Plus forms 管 UI validation，page 执行本地 use case。

**本节解决的问题：** 避免 Router、Pinia、form model 和 collection 彼此复制。

**技术意义：** 每次状态变化都有单向证据链，可调试、可迁移、可测试。

**概念解释：** 三个 framework/library runtime 协作，但各自不越过 owner boundary。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** 本节按 owner 串联所有边界，不合并它们。

**Admin UI 机制证据链：** 1 page+Element render；2 owner按状态类别；3 props来自query/store/draft；4 events回各owner；5 contracts串联；6 Form/Upload做前端检查；7不建立backend trust；8 composables建/弃draft；9 committed table intent URL、selection local；10 store-derived operation permission；11 backend待实现；12 File browser-owned；13 queue local error；14 i18n/provider两条locale；15 auth/permission/theme/sidebar/preference读取；16 namespaced query；17 Vite转换、vue-tsc类型；18出现watch互相同步Router/Pinia通常是复制状态。

**TypeScript 编译期过程：** 各 contract 在 adapter 边界收窄 unknown-like runtime shape，不改变 runtime values。

**JavaScript / Vue / Element Plus 运行时过程：** route/store/ref 都是 reactive sources，computed/props 汇合到 render，events 分流回 owner。

**API / 语法规则：** Router replace 合并 query；storeToRefs 保持 store state reactive；FormInstance await validation。

**文件结构：** `useAdminTableQuery.ts`、Chapter 07 stores、forms/pages/dashboard。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: owner-map.ts</span></div>

```ts
const owners = {
  tableQuery: "router",
  currentRole: "pinia",
  formDraft: "component",
  serverRows: "not-implemented",
} as const;
```
</div>

**逐行解释：** map 不是 runtime store，而是 owner decision record；每个类别只指向一个 source。

**执行过程：** URL/store/local refs 变化 → computed projections → Element props → event → 对应 owner action。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** 每次事件只修改其 owner，再由 render 汇合；没有双向同步副本。

**为什么得到这个结果：** reactive system 能组合多个 sources，不要求把它们搬进同一 store。

**对比写法：** watch Router query 写 Pinia，再 watch Pinia 写 Router 会形成循环与初始化竞争。

**常见错误为什么错：** “统一管理”若意味着复制 source，反而降低一致性。

**与真实项目的关系：** API 加入后会成为第四种 server-state owner，不应塞进 form 或 theme store。

**与当前学习主线的关系：** 这是 Chapters 03–07 的综合 ownership exercise。

**最终记忆模型：** 多个 runtime 可以协作，但一个值只能有一个权威 owner。

<a id="section-9-19"></a>

### 9.19 Final integration：vue-admin-dashboard 如何形成中后台项目骨架

**结论：** 最终项目已覆盖 login、layout、users、roles、products、orders、search/pagination/sort、CRUD、upload、permission、theme 与 i18n，同时保持 local-only 边界。

**本节解决的问题：** 验证零散 API 能否形成可扩展、可解释的 admin skeleton。

**技术意义：** 项目骨架已留出 Chapter 09 的 data adapter、Chapter 10 的 tests 与 Chapter 11 的 production boundary。

**概念解释：** skeleton 的价值是稳定 owner、contract、feature boundary 和 integration seam，不是伪造完整 backend。

**边界：UI library component、project UI wrapper、business component、page component、component local state、form draft state、Router URL state、Pinia global client state、server state、backend authorization、TypeScript、Vite tooling、browser File API、Element Plus runtime：** 所有已实现边界可从文件追踪；server/API/runtime schema/tests/deployment 明确留给后续章节。

**Admin UI 机制证据链：** 1 final dashboard render；2 owners完整分配；3 Element components收typed props；4 models/events驱动owners；5 contracts覆盖domain/query/form/upload/permission；6 frontend rules与file checks；7不声称backend trust；8 draft lifecycle完整；9 Router query与local selection分开；10 operation UI decision；11 backend authorization待实现；12 File browser-owned；13 retryable local error；14 app/library locale分开；15 Chapter07 stores复用；16 namespaced keys；17 typecheck/test/build为工具证据；18能沿事件定位owner即具备真实项目识别能力。

**TypeScript 编译期过程：** 全部 SFC 与 composable 由同一 strict `vue-tsc` project 检查，无 `any` 或 error suppression。

**JavaScript / Vue / Element Plus 运行时过程：** 单一 app 安装 plugins，root shell 顺序渲染 Chapters 01–08，dashboard 子树执行所有本地 flows。

**API / 语法规则：** 无第二 app、无根 RouterView replacement、无 remote action、无 persisted File。

**文件结构：** `AdminUiChapterApp.vue` → `VueAdminDashboard.vue` → layout/features → contracts/composables。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-08-admin-ui-forms/AdminUiChapterApp.vue</span></div>

```vue
<template>
  <section aria-labelledby="chapter-08-title">
    <h2 id="chapter-08-title">Admin UI and Business Components</h2>
    <VueAdminDashboard />
  </section>
</template>
```
</div>

**逐行解释：** chapter entry 提供学习区语义；final dashboard 是唯一整合组件；它仍只是 root shell 的一个子树。

**执行过程：** main plugins → App chapters → Chapter 08 entry → dashboard login → layout/module → local feature flows。

**UI component props、form model、validation state、table query、dialog/drawer draft、upload queue、permission decision、Pinia store、Router query 与 render 的变化：** final integration 展示所有 projection，但不把它们合并成一个巨型 object。

**为什么得到这个结果：** 稳定骨架来自清晰边界，而不是一次性写完所有后续基础设施。

**对比写法：** 立即加入 API client、schema library、E2E 与 deployment 会模糊 Chapter 08 学习目标。

**常见错误为什么错：** 把 local success message 当持久化成功，或把 UI permission 当 security，都属于越界结论。

**与真实项目的关系：** 该骨架可逐层替换 local adapters，而不改变 UI layering。

**与当前学习主线的关系：** 完成本阶段从 Vue mechanism 到常见岗位场景的第一次综合落地。

**最终记忆模型：** 先建 owner 与 seam，再接 server、tests 和 production。

## 10. API / 语法索引

| API / 语法 | 本章用途 | 运行时 owner |
| --- | --- | --- |
| `app.use(ElementPlus)` | 注册 global components/services | single Vue app |
| CSS side-effect import | 把 Element Plus 样式加入 Vite graph | app entry module graph |
| `ElConfigProvider :locale` | 配置 library 子树 locale | project UI wrapper |
| `ElContainer/Aside/Header/Main` | admin shell structure | layout |
| `ElMenu @select` | 产生 navigation/tab intent | sidebar → dashboard |
| `ElTabs v-model` | 本地 workspace tab | dashboard local state |
| `ElTable :data` | 渲染受控 rows | entity page |
| `sortable="custom"` | 把 sort intent 发回 owner | Router query adapter |
| `ElPagination` | 展示受控 page/pageSize/total | Router + derived collection |
| `ElForm :model :rules` | 绑定并校验 draft | dialog/drawer flow |
| `FormInstance.validate()` | 执行 UI validators | Element Plus form runtime |
| `ElDialog v-model` | user form lifecycle | dialog composable |
| `ElDrawer v-model` | product form lifecycle | drawer composable |
| `ElUpload :auto-upload="false"` | 只选择 browser File | upload component |
| `ElMessage/ElMessageBox` | local operation feedback/confirm | page UI |
| `createI18n` / `useI18n` | app message locale | Vue I18n composer |
| `storeToRefs` | 保持 Pinia state/getter reactive | Pinia store |
| `useRoute/useRouter` | 读写 namespaced table query | Router |
| `router.replace` | 更新 query 而不新增 history entry | Router |
| `defineModel` | typed component v-model contract | caller-owned model |
| `ReadonlyArray<T>` | 禁止 consumer 直接 mutation | TypeScript compile time |
| `satisfies Record<...>` | 检查 permission/tab mapping 完整性 | TypeScript compile time |

## 11. 常见错误表

| wrong code | error type or observed bug | violated rule | why it fails | correct code | how to recognize the same mistake later |
| --- | --- | --- | --- | --- | --- |
| `import "three-ui-libraries"` | dependency/CSS noise | one actual library | 三套 contract 同时进入 runtime | `import ElementPlus from "element-plus"` | 同一 primitive 有三套实现 |
| `<ElTable :data="rows" />` 后在 slot 散布全部 CRUD | architecture drift | component layering | demo 没有 owner/seam | `DataTablePage` + entity page | primitive import domain services |
| `<RouterView />` 取代 root shell | previous chapters disappear | preserve single page | 根组件不再渲染章节 | `<AdminUiChapterApp />` 追加到 `App.vue` | `/` 不再显示旧章节 |
| `createApp(AdminUiChapterApp)` | split app context | one Vue app | plugin/store/router 不共享 | reuse existing `createApp(App)` | 两次 `createApp` |
| `app.use(ElementPlus)` without CSS import | unstyled controls | import library CSS | JS registration 不含 CSS | `import "element-plus/dist/index.css"` | DOM 正常但样式缺失 |
| `providerLocale = appMessages` | wrong locale shape | separate locale systems | library locale 不是 app dictionary | sync key, keep two resources | 分页变了但标题未变 |
| `store.searchKeyword = input` | over-globalization | local/URL owner | 临时 draft 污染 Pinia | local draft then Router query | store 含每页临时 inputs |
| Router query mirrored in Pinia | conflicting source | one owner | back/refresh 同步竞争 | derive directly from `route.query` | 双向 watchers |
| `draft.value = row` | row mutates before submit | clone draft | 两个引用指向同一 object | `draft.value = { ...row }` | cancel 后 table 已变 |
| `visible.value = false` only | stale draft | reset on close | 外部 state 未销毁 | `close(); resetDraft()` | reopen 显示旧输入 |
| `validate(); emit("submit")` | invalid submit | await validation | Promise result 被忽略 | `if ((await validate()).valid) emit("submit")` | error UI 出现但数据仍提交 |
| `FormRules` treated as server trust | security/data bug | frontend != backend | 浏览器可绕过且无数据库上下文 | backend revalidates | API 仅依赖 client result |
| `draft = row` with immediate v-model | premature mutation | commit boundary | 输入直接写 committed state | edit clone then update by id | 未保存变化出现在列表 |
| `:row-key="index"` | wrong selection/DOM reuse | stable identity | sort/delete 改变 index | `row-key="id"` | 选中状态跑到另一行 |
| local `total` plus another query `total` | pagination drift | one derived total | 两份数字更新时机不同 | derive from filtered rows | 页码与 rows 数量不符 |
| local array called persisted CRUD | false capability | Chapter 08 local only | refresh 会恢复 fixtures | label operation as local | reload 后“保存”消失 |
| `sortable` with hidden business assumptions | inconsistent sort | page owns sort policy | library 不知道 domain/server order | custom sort event + query | UI 排序与 URL/API 不一致 |
| hidden button treated as security | authorization bypass | backend authorization | DOM/client state 可修改 | server authorizes operation | 手工请求仍成功 |
| delete action without confirm | destructive UX bug | confirm intent | 误触立即 mutation | `ElMessageBox.confirm` first | 单击不可逆操作 |
| `action="/upload"` | scope violation | no endpoint in Chapter 08 | 引入不存在的 backend | `:auto-upload="false"` | network panel出现 upload request |
| trust `file.type` and `file.size` | unsafe assumption | client check is advisory | metadata 可为空/伪造 | client UX check + future server check | 服务端无复检 |
| `status = "failed"` only | dead-end UI | retry/removal state | 用户不能恢复或清理 | store reason + retry/remove | failed row 没有 action |
| persist `File` in Pinia | serialization/lifecycle bug | File stays local | File 不是稳定 JSON state | component-local queue | storage 出现空 object |
| `const model: any = {}` | type boundary loss | no `any` | 字段和 event 均失去检查 | explicit form/domain types | typo 直到 runtime 才发现 |
| code block containing CJK source text | documentation/source mismatch | code English-only | 复制后违反项目规则 | English identifiers/comments/strings | fenced block 出现 CJK |
| `npm run dev` claimed as full validation | unproven quality | commands have distinct roles | dev transform 不等于 typecheck/build | run all required scripts | 报告没有命令输出 |

## 12. 最终小项目

### 12.1 项目目标、章节适配与结构

项目名为 `vue-admin-dashboard`。目标是在既有单页学习 shell 中完成一套可运行的 admin UI 骨架：使用一个 UI library 深入实现 layout、table、forms、local CRUD、upload、permission、theme 与 i18n。它适合 Chapter 08，因为重点是 UI engineering 与 state ownership，而不是提前实现 API、runtime schema、component/E2E tests 或 deployment。

结构从 `AdminUiChapterApp.vue` 进入 `admin-dashboard/VueAdminDashboard.vue`；dashboard 组合 `layout/` 与 feature wrappers；entity pages 使用 `tables/`、`forms/`、`permissions/`、`upload/`；所有值由 `contracts/` 建模，并由 `composables/` 管理状态转移。

### 12.2 所有权与集成 maps

| map | source | target | boundary |
| --- | --- | --- | --- |
| UI library integration | `main.ts` / `elementPlus.ts` | global Element components | no second app |
| component layering | Element primitive | wrapper → business → page | dependency points downward |
| layout | Pinia sidebar/auth/theme | `AdminLayout` slots | no business rows |
| table query ownership | Router namespaced query | computed rows/pagination | no Pinia copy |
| form draft ownership | dialog/drawer composable | business form model | clone before edit |
| dialog lifecycle | open → clone → validate → commit/reset | users collection | cancel discards |
| drawer lifecycle | open → clone → dirty → validate → commit/reset | products collection | close resets |
| validation | Element FormInstance/rules | submit gate | not backend validation |
| local CRUD | entity page collection | table rows | not persisted |
| upload queue | browser File | ready/uploading/success/failed | no endpoint |
| permission button | Chapter 07 role | hidden/disabled/click | not API authorization |
| theme | Chapter 07 theme store | scoped CSS variables | dashboard subtree only |
| i18n | locale key | app composer + Element locale | separate dictionaries |
| Router query | `uiUser*` / `uiProduct*` / `uiOrder*` | search/page/sort | preserve other keys |
| Pinia reads | auth/permission/theme/sidebar | shell and UI projection | no entity collections |
| frontend/backend | UI checks/intents | future API/server | backend remains trust owner |

### 12.3 核心完整代码

以下窗口展示项目的核心 contracts、Router query composable、draft composable、Element Plus/Vue I18n integration、permission business wrapper 与 final dashboard。其余完整实现位于本章代码定位索引中的真实文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-08-admin-ui-forms/contracts/adminUiTypes.ts</span></div>

```ts
export type AdminRole = "admin" | "manager" | "operator";

export type AdminPermission =
  | "dashboard:view"
  | "users:view"
  | "users:create"
  | "users:edit"
  | "users:delete"
  | "roles:view"
  | "roles:edit"
  | "products:view"
  | "products:create"
  | "products:edit"
  | "products:delete"
  | "orders:view"
  | "orders:status"
  | "uploads:manage";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: AdminRole;
  status: "active" | "suspended";
};

export type AdminProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "draft";
};

export type AdminOrder = {
  id: string;
  customer: string;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
};

export type AdminMenuItem = {
  id: AdminTab["id"];
  label: string;
  requiredRoles: ReadonlyArray<AdminRole>;
};

export type AdminTab = {
  id:
    | "dashboard"
    | "users"
    | "roles"
    | "products"
    | "orders"
    | "upload";
  label: string;
  closable: boolean;
};

export type CrudMode = "create" | "edit";

export type CrudStatus = "idle" | "submitting" | "success" | "failed";

export type OperationPermission =
  | "users:create"
  | "users:edit"
  | "users:delete"
  | "roles:edit"
  | "products:create"
  | "products:edit"
  | "products:delete"
  | "orders:status"
  | "uploads:manage";
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-08-admin-ui-forms/contracts/tableContracts.ts</span></div>

```ts
export type TableSearchState = {
  keyword: string;
  status: string;
};

export type TablePaginationState = {
  page: number;
  pageSize: number;
};

export type TableSortState = {
  sort: string;
  order: "ascending" | "descending" | "";
};

export type TableQueryState = {
  search: TableSearchState;
  pagination: TablePaginationState;
  sorting: TableSortState;
};

export type TableColumnKey =
  | "name"
  | "email"
  | "department"
  | "role"
  | "status"
  | "category"
  | "price"
  | "stock"
  | "customer"
  | "total"
  | "createdAt";
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-08-admin-ui-forms/composables/useAdminTableQuery.ts</span></div>

```ts
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { LocationQueryRaw, LocationQueryValue } from "vue-router";
import type {
  TableQueryState,
  TableSearchState,
  TableSortState,
} from "../contracts/tableContracts";

type QueryPrefix = "uiUser" | "uiProduct" | "uiOrder" | "uiRole";

function firstValue(
  value: LocationQueryValue | ReadonlyArray<LocationQueryValue>,
): LocationQueryValue {
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function normalizeText(
  value: LocationQueryValue | ReadonlyArray<LocationQueryValue>,
): string {
  return firstValue(value)?.trim() ?? "";
}

function normalizePositiveInteger(
  value: LocationQueryValue | ReadonlyArray<LocationQueryValue>,
  fallback: number,
): number {
  const parsed = Number.parseInt(normalizeText(value), 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeOrder(value: string): TableSortState["order"] {
  return value === "ascending" || value === "descending" ? value : "";
}

export function useAdminTableQuery(prefix: QueryPrefix) {
  const route = useRoute();
  const router = useRouter();
  const keywordKey = `${prefix}Keyword`;
  const statusKey = `${prefix}Status`;
  const pageKey = `${prefix}Page`;
  const pageSizeKey = `${prefix}PageSize`;
  const sortKey = `${prefix}Sort`;
  const orderKey = `${prefix}Order`;

  const query = computed<TableQueryState>(() => ({
    search: {
      keyword: normalizeText(route.query[keywordKey]),
      status: normalizeText(route.query[statusKey]),
    },
    pagination: {
      page: normalizePositiveInteger(route.query[pageKey], 1),
      pageSize: normalizePositiveInteger(route.query[pageSizeKey], 5),
    },
    sorting: {
      sort: normalizeText(route.query[sortKey]),
      order: normalizeOrder(normalizeText(route.query[orderKey])),
    },
  }));

  function replaceQuery(patch: LocationQueryRaw): void {
    void router.replace({
      query: {
        ...route.query,
        ...patch,
      },
    });
  }

  function setSearch(search: TableSearchState): void {
    replaceQuery({
      [keywordKey]: search.keyword || undefined,
      [statusKey]: search.status || undefined,
      [pageKey]: "1",
    });
  }

  function setPage(page: number): void {
    replaceQuery({
      [pageKey]: String(Math.max(1, page)),
    });
  }

  function setPageSize(pageSize: number): void {
    replaceQuery({
      [pageSizeKey]: String(Math.max(1, pageSize)),
      [pageKey]: "1",
    });
  }

  function setSort(sorting: TableSortState): void {
    replaceQuery({
      [sortKey]: sorting.sort || undefined,
      [orderKey]: sorting.order || undefined,
      [pageKey]: "1",
    });
  }

  function reset(): void {
    replaceQuery({
      [keywordKey]: undefined,
      [statusKey]: undefined,
      [pageKey]: undefined,
      [pageSizeKey]: undefined,
      [sortKey]: undefined,
      [orderKey]: undefined,
    });
  }

  return {
    query,
    setSearch,
    setPage,
    setPageSize,
    setSort,
    reset,
  };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-08-admin-ui-forms/contracts/formContracts.ts</span></div>

```ts
import type {
  AdminOrder,
  AdminProduct,
  AdminRole,
  AdminUser,
} from "./adminUiTypes";

export type UserFormModel = Omit<AdminUser, "id"> & {
  id: string;
};

export type ProductFormModel = Omit<AdminProduct, "id"> & {
  id: string;
};

export type RoleFormModel = {
  id: string;
  name: string;
  role: AdminRole;
  permissions: Array<string>;
};

export type OrderStatusFormModel = {
  id: AdminOrder["id"];
  status: AdminOrder["status"];
};

export type FormSubmitResult = {
  success: boolean;
  message: string;
};

export type FormValidationState = {
  valid: boolean;
  message: string;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-08-admin-ui-forms/contracts/uploadContracts.ts</span></div>

```ts
export type UploadStatus =
  | "ready"
  | "uploading"
  | "success"
  | "failed";

export type UploadFailureReason =
  | "unsupported-type"
  | "file-too-large"
  | "simulated-network-error";

export type UploadQueueItem = {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: UploadStatus;
  failureReason: UploadFailureReason | null;
};

export type LocalUploadResult = {
  success: boolean;
  reason: UploadFailureReason | null;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-08-admin-ui-forms/composables/useDialogFormState.ts</span></div>

```ts
import { ref, shallowRef } from "vue";
import type { CrudMode } from "../contracts/adminUiTypes";
import type { FormSubmitResult } from "../contracts/formContracts";

export function useDialogFormState<RecordValue, DraftValue>(
  createDraft: () => DraftValue,
  cloneDraft: (source: RecordValue | DraftValue) => DraftValue,
) {
  const visible = ref(false);
  const mode = ref<CrudMode>("create");
  const sourceId = ref<string | null>(null);
  const draft = shallowRef<DraftValue>(createDraft());

  function openCreate(): void {
    mode.value = "create";
    sourceId.value = null;
    draft.value = createDraft();
    visible.value = true;
  }

  function openEdit(id: string, source: RecordValue): void {
    mode.value = "edit";
    sourceId.value = id;
    draft.value = cloneDraft(source);
    visible.value = true;
  }

  function resetDraft(): void {
    draft.value = createDraft();
    sourceId.value = null;
  }

  function close(): void {
    visible.value = false;
    resetDraft();
  }

  function submit(
    commit: (
      value: DraftValue,
      currentMode: CrudMode,
      currentSourceId: string | null,
    ) => void,
  ): FormSubmitResult {
    commit(cloneDraft(draft.value), mode.value, sourceId.value);
    close();
    return {
      success: true,
      message: "Local draft committed",
    };
  }

  return {
    visible,
    mode,
    sourceId,
    draft,
    openCreate,
    openEdit,
    close,
    resetDraft,
    submit,
  };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-08-admin-ui-forms/ui/elementPlus.ts</span></div>

```ts
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

export { ElementPlus };
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-08-admin-ui-forms/i18n/adminI18n.ts</span></div>

```ts
import { createI18n } from "vue-i18n";
import { adminMessages } from "./adminMessages";

export const adminI18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: adminMessages,
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-08-admin-ui-forms/permissions/PermissionButton.vue</span></div>

```vue
<script setup lang="ts">
import { computed } from "vue";
import { useButtonPermission } from "../composables/useButtonPermission";
import type { OperationPermission } from "../contracts/adminUiTypes";

const props = withDefaults(
  defineProps<{
    permission: OperationPermission;
    mode?: "hidden" | "disabled";
    buttonType?: "primary" | "success" | "warning" | "danger" | "info";
  }>(),
  {
    mode: "disabled",
    buttonType: "primary",
  },
);

const emit = defineEmits<{
  click: [];
}>();

const { canOperate } = useButtonPermission();
const allowed = computed(() => canOperate(props.permission));
const visible = computed(() => props.mode !== "hidden" || allowed.value);

function click(): void {
  if (allowed.value) {
    emit("click");
  }
}
</script>

<template>
  <ElButton
    v-if="visible"
    :disabled="!allowed"
    :title="allowed ? undefined : 'UI permission denied'"
    :type="buttonType"
    @click="click"
  >
    <slot />
  </ElButton>
</template>
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/vue/chapter-08-admin-ui-forms/admin-dashboard/VueAdminDashboard.vue</span></div>

```vue
<script setup lang="ts">
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";
import { useAdminTabs } from "../composables/useAdminTabs";
import type { AdminRole, AdminTab } from "../contracts/adminUiTypes";
import AdminBreadcrumb from "../layout/AdminBreadcrumb.vue";
import AdminLayout from "../layout/AdminLayout.vue";
import AdminSidebar from "../layout/AdminSidebar.vue";
import AdminTabs from "../layout/AdminTabs.vue";
import AdminTopbar from "../layout/AdminTopbar.vue";
import AdminConfigProvider from "../theme/AdminConfigProvider.vue";
import DashboardHome from "./DashboardHome.vue";
import LoginPanel from "./LoginPanel.vue";
import OrderManagement from "./OrderManagement.vue";
import ProductManagement from "./ProductManagement.vue";
import RoleManagement from "./RoleManagement.vue";
import UploadManagement from "./UploadManagement.vue";
import UserManagement from "./UserManagement.vue";

const authStore = useAuthStore();
const permissionStore = usePermissionStore();
const { isSignedIn } = storeToRefs(authStore);
const { tabs, activeId, setActive } = useAdminTabs();

const tabRoles: Record<AdminTab["id"], ReadonlyArray<AdminRole>> = {
  dashboard: ["admin", "manager", "operator"],
  users: ["admin", "manager"],
  roles: ["admin"],
  products: ["admin", "manager"],
  orders: ["admin", "manager", "operator"],
  upload: ["admin", "manager"],
};

const visibleTabs = computed(() =>
  tabs.value.filter((tab) => permissionStore.hasRole(tabRoles[tab.id])),
);

const currentLabel = computed(
  () =>
    visibleTabs.value.find((tab) => tab.id === activeId.value)?.label ??
    "Dashboard",
);

watch(
  visibleTabs,
  (nextTabs) => {
    if (!nextTabs.some((tab) => tab.id === activeId.value)) {
      setActive("dashboard");
    }
  },
  { immediate: true },
);
</script>

<template>
  <AdminConfigProvider>
    <div class="dashboard-stack">
      <LoginPanel />
      <ElAlert
        v-if="!isSignedIn"
        title="Select a local role to enter the admin UI learning shell."
        type="warning"
        :closable="false"
        show-icon
      />
      <AdminLayout v-else>
        <template #sidebar>
          <AdminSidebar :active-id="activeId" @select="setActive" />
        </template>
        <template #topbar><AdminTopbar /></template>
        <template #breadcrumb>
          <AdminBreadcrumb :current-label="currentLabel" />
        </template>
        <template #tabs>
          <AdminTabs v-model="activeId" :tabs="visibleTabs" />
        </template>
        <DashboardHome v-show="activeId === 'dashboard'" />
        <UserManagement v-show="activeId === 'users'" />
        <RoleManagement v-show="activeId === 'roles'" />
        <ProductManagement v-show="activeId === 'products'" />
        <OrderManagement v-show="activeId === 'orders'" />
        <UploadManagement v-show="activeId === 'upload'" />
      </AdminLayout>
    </div>
  </AdminConfigProvider>
</template>

<style scoped>
.dashboard-stack {
  display: grid;
  gap: 1rem;
}
</style>
```
</div>

### 12.4 运行、预期行为与扩展边界

运行 `npm run dev` 后，在 `/` 选择 admin/manager/operator。本地角色会改变 menu、tabs 和 operation buttons；users/products/orders 的 search、page 和 sort 会写入 namespaced query；user dialog 与 product drawer 在 cancel 时丢弃 draft；upload 保持 browser-local，并可通过含 `fail` 的文件名观察失败和 retry。

常见错误应优先按 owner 排查：样式缺失查 plugin/CSS，筛选回退错误查 Router query，cancel 后 row 变化查 clone，reopen 残留查 reset，按钮状态错误查 auth/permission store，upload 卡住查 queue status。扩展任务仅限本章内部：增加更多 local rows、增加 table column、为已有 app messages 增加 key、完善 dirty close confirmation；不要在本章添加 API、schema validator、component/E2E tests 或 deployment。

## 13. 额外速查表

| 概念 | 最短正确解释 |
| --- | --- |
| Element Plus | 本章实际安装并深入使用的 Vue 3 UI library |
| ElConfigProvider | 向子树提供 Element Plus global config/locale |
| ElContainer | layout container primitive |
| ElAside | sidebar region，不拥有业务 state |
| ElHeader | topbar region |
| ElMain | feature content region |
| ElMenu | 显示 navigation/tab intent |
| ElBreadcrumb | 显示位置，不保存 route truth |
| ElTabs | 本章保存局部 dashboard tab |
| ElTable | 根据受控 rows/columns render |
| ElTableColumn | column prop/slot contract |
| ElPagination | 受控 page/pageSize/total UI |
| ElForm | 绑定 model 与 rules |
| ElFormItem | 将 prop 与 field validation 关联 |
| FormInstance | mounted Element Plus form runtime instance |
| FormRules | frontend validation rule contract |
| ElDialog | 中等表单的 overlay/lifecycle primitive |
| ElDrawer | 较长表单的侧边容器 |
| ElUpload | file picker/queue UI primitive |
| UploadFile | Element Plus 对选择文件的 wrapper |
| UploadUserFile | 手动 file list 的公开数据形状 |
| ElMessage | 非阻塞 operation feedback |
| ElMessageBox | Promise-based confirm/alert service |
| ElPopconfirm | 小型 inline destructive confirmation |
| vue-i18n | 应用 messages 的 i18n runtime |
| createI18n | 创建并配置 i18n plugin |
| useI18n | 在 component 中读取 composer |
| business component | 知道 user/product/order/role 字段 |
| project UI wrapper | 固化 library defaults 与 project boundary |
| page component | 编排 query、rows、draft、actions 与 feedback |
| Router query state | 可刷新、后退、分享的 table intent |
| form draft state | 提交前可丢弃的独立副本 |
| Pinia global client state | auth/theme/sidebar 等跨页面 client state |
| server state | 远端数据、缓存、失效与重新获取；本章未实现 |
| frontend validation | 为用户提供即时反馈的 client check |
| backend validation | 服务端对 payload 与业务规则的重新验证 |
| button permission | hidden/disabled/click 的 UI decision |
| API authorization | 服务端对 operation 的最终安全判定 |
| file type check | client UX check，不是内容可信证明 |
| upload retry | failed queue item 回到可执行 lifecycle |

## 14. 真实项目判断模型

| 设计选择 | 用在真实项目中 | 不要使用的情况 | 证据 | 后续 owner |
| --- | --- | --- | --- | --- |
| Element Plus base components | 快速建立 admin form/table/upload/dialog 基础交互 | 让 `ElTable` 直接承载业务规则或 API 调用 | wrapper props/events 清楚，业务页才知道 domain | Business component / page orchestration |
| Router query for table state | keyword/status/page/sort/order 需要分享、刷新、回退 | 未提交 draft、dialog open、临时 selection | copy URL 可恢复 table intent | Component local state |
| Dialog/drawer draft | create/edit 需要可取消、可 reset、可 validate | 直接双向绑定真实 row | cancel 不污染 row，submit 后才 commit | Chapter 09 API submit / backend validation |
| Pinia permission reader | 按钮或菜单需要跨页面 client role projection | 当作 API authorization | visible/disabled 与 store role 一致 | Backend/server route owns real authorization |
| Upload queue | 只演示 browser File、本地校验、retry UX | 声称文件已进入服务器 | queue item state 与失败重试可复现 | API/server storage chapter owns upload endpoint |
| i18n/theme | dashboard 子树需要统一 locale/theme projection | 在每个 component 内硬编码 library locale | app messages 与 Element Plus locale 同步切换 | Design system / product i18n process |

## 15. 如何转换成个人笔记

每个 feature 只保留六栏：用户意图、UI primitive、state owner、typed contract、事件链、backend boundary。然后用一条真实操作复述：例如 “edit user” 从 permission button 到 cloned draft、FormInstance、local commit 与 table rerender。不要只抄 API 名称；必须写出值何时创建、谁能修改、何时丢弃。

## 16. 必须能回答的问题

1. UI library 解决什么，又不解决什么？
2. 为什么复制 Element Plus demo 不等于 business component engineering？
3. 为什么只实际安装 Element Plus？
4. plugin、CSS import 与 ConfigProvider 分别做什么？
5. app messages 与 Element Plus locale 为什么是两套资源？
6. sidebar collapsed、active tab、Router path 与 table query 分别属于谁？
7. rows、columns、selection、pagination、sorting 与 operations 如何分层？
8. 哪些 table state 应写 URL，哪些应留在 component？
9. 为什么不把 search fields 自动放 Pinia？
10. edit dialog 为什么必须 clone row？
11. close 为什么必须 reset/discard draft？
12. drawer 与 dialog 的 UI 差异为何不改变 draft owner？
13. FormInstance validation 能证明什么，不能证明什么？
14. local CRUD 与 API CRUD 的边界在哪里？
15. browser File、UploadFile 与 queue item 的关系是什么？
16. accept、MIME、size checks 为什么不是 server validation？
17. failed upload 如何进入 retry/remove lifecycle？
18. button permission、route permission 与 API authorization 有何差别？
19. theme store 如何变成 scoped Element Plus presentation？
20. 如何识别 page orchestration 正在退化成巨型组件？

## 17. 最终记忆模型

先问 owner，再选工具：短暂输入与 selection 留在 component；dialog/drawer 使用 disposable draft；可分享 table intent 放 Router query；auth、permission、theme、preferences、sidebar 放 Pinia；browser File 留在 local queue；server data 与 authorization 留给 server boundary。Element Plus 只负责可靠 UI primitive，wrapper 固化项目设置，business component 描述字段，page 连接整个 use case。

## 18. 官方文档阅读清单

- [Element Plus Installation](https://element-plus.org/en-US/guide/installation.html)
- [Element Plus Quick Start](https://element-plus.org/en-US/guide/quickstart.html)
- [Element Plus Config Provider](https://element-plus.org/en-US/component/config-provider.html)
- [Element Plus Container](https://element-plus.org/en-US/component/container.html)
- [Element Plus Menu](https://element-plus.org/en-US/component/menu.html)
- [Element Plus Breadcrumb](https://element-plus.org/en-US/component/breadcrumb.html)
- [Element Plus Tabs](https://element-plus.org/en-US/component/tabs.html)
- [Element Plus Table](https://element-plus.org/en-US/component/table.html)
- [Element Plus Pagination](https://element-plus.org/en-US/component/pagination.html)
- [Element Plus Form](https://element-plus.org/en-US/component/form.html)
- [Element Plus Dialog](https://element-plus.org/en-US/component/dialog.html)
- [Element Plus Drawer](https://element-plus.org/en-US/component/drawer.html)
- [Element Plus Upload](https://element-plus.org/en-US/component/upload.html)
- [Element Plus Message](https://element-plus.org/en-US/component/message.html)
- [Element Plus Message Box](https://element-plus.org/en-US/component/message-box.html)
- [Element Plus Popconfirm](https://element-plus.org/en-US/component/popconfirm.html)
- [Element Plus Theming](https://element-plus.org/en-US/guide/theming.html)
- [Element Plus Internationalization](https://element-plus.org/en-US/guide/i18n.html)
- [Vue I18n Installation](https://vue-i18n.intlify.dev/guide/installation.html)
- [Vue Router Composition API](https://router.vuejs.org/guide/advanced/composition-api.html)
- [Vue Router Programmatic Navigation](https://router.vuejs.org/guide/essentials/navigation.html)
- [Pinia Defining a Store](https://pinia.vuejs.org/core-concepts/)
- [Pinia storeToRefs](https://pinia.vuejs.org/api/pinia/functions/storeToRefs.html)
- [Vue TypeScript with Composition API](https://vuejs.org/guide/typescript/composition-api.html)
