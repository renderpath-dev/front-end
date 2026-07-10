# Vue 第 11 章：Production Build、Performance Optimization 与 Deployment

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

.macos-code-dot-red {
  background: #ff5f57;
}

.macos-code-dot-yellow {
  background: #febc2e;
}

.macos-code-dot-green {
  background: #28c840;
}

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
  - [9.1 Production mental model：source、build、dist、static host、CDN、browser 与 rollback](#section-9-1)
  - [9.2 Vite production build：vite build、vue-tsc、mode、minification 与 dist output](#section-9-2)
  - [9.3 Vite preview：preview server、built files verification 与 npm run dev 的边界](#section-9-3)
  - [9.4 Env variables and modes：import.meta.env、VITE_* exposure、string parsing 与 secret boundary](#section-9-4)
  - [9.5 Base path：root deploy、subpath deploy、relative base、asset URL 与 router base](#section-9-5)
  - [9.6 Static assets：imported assets、public directory、hashed files 与 cache owner](#section-9-6)
  - [9.7 Code splitting：dynamic import、route lazy loading、async component 与 chunk graph](#section-9-7)
  - [9.8 Bundle analysis：visualizer、chunk size、dependency risk、duplicate modules 与 budget](#section-9-8)
  - [9.9 Vue performance：page load、update performance、props stability、v-once、v-memo 与 large list](#section-9-9)
  - [9.10 Web Vitals and Lighthouse：LCP、INP、CLS、lab data、field data 与 score boundary](#section-9-10)
  - [9.11 Cache policy：index.html、hashed assets、browser cache、CDN cache 与 rollback risk](#section-9-11)
  - [9.12 SPA fallback：createWebHistory、direct refresh、server fallback 与 app-level 404](#section-9-12)
  - [9.13 Nginx static hosting：root、try_files、cache headers、security headers 与 no backend proxy](#section-9-13)
  - [9.14 Docker static deployment：multi-stage build、Node builder、Nginx runtime 与 final image boundary](#section-9-14)
  - [9.15 CDN and static host deployment：dist upload、base path、cache invalidation 与 vendor boundary](#section-9-15)
  - [9.16 Runtime config boundary：build-time env、client bundle exposure、runtime config injection 与 secrets](#section-9-16)
  - [9.17 Production error handling：app.config.errorHandler、preload error、logging boundary 与 no fake monitoring](#section-9-17)
  - [9.18 Chapter integration：Chapters 06–10 的 router、Pinia、UI、API、tests 如何进入 production gate](#section-9-18)
  - [9.19 Final integration：vue-production-deployment-lab 如何形成上线前检查体系](#section-9-19)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 文件结构](#122-文件结构)
  - [12.3 核心映射](#123-核心映射)
  - [12.4 完整核心代码](#124-完整核心代码)
  - [12.5 运行方式与预期行为](#125-运行方式与预期行为)
  - [12.6 常见错误与扩展任务](#126-常见错误与扩展任务)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标                      | 对应文件 / 片段                                                                        | 类型                 | 所在章节 |
| ----------------------------- | -------------------------------------------------------------------------------------- | -------------------- | -------- |
| 建立 production build 证据链  | `src/learning/vue/chapter-11-production-deployment/production/productionBuildModel.ts` | typed model          | 9.1      |
| 解释 dist 产物                | `src/learning/vue/chapter-11-production-deployment/production/distOutputMap.ts`        | typed model          | 9.2      |
| 区分 preview 与 dev server    | `src/learning/vue/chapter-11-production-deployment/components/VitePreviewPanel.vue`    | teaching panel       | 9.3      |
| 检查公开 env 边界             | `.env.example`、`.env.production.example`、`scripts/verifyEnvExposure.mjs`             | config / script      | 9.4      |
| 配置 base path                | `vite.config.ts`、`production/basePathModel.ts`                                        | config / typed model | 9.5      |
| 区分 asset owner              | `production/assetPipelineModel.ts`                                                     | typed model          | 9.6      |
| 映射 route lazy loading       | `performance/routeLazyLoadingMap.ts`                                                   | typed model          | 9.7      |
| 生成 bundle report            | `vite.config.ts`、`scripts/analyzeBundle.mjs`                                          | config / script      | 9.8      |
| 定义性能预算                  | `performance/performanceBudget.ts`                                                     | typed model          | 9.9      |
| 解释 Lighthouse 与 Web Vitals | `performance/webVitalsModel.ts`、`performance/lighthouseAuditModel.ts`                 | typed model          | 9.10     |
| 建立 cache policy             | `production/cachePolicyModel.ts`、`deployment/cdn-cache-notes.md`                      | typed model / notes  | 9.11     |
| 验证 SPA fallback             | `nginx/vue-spa.conf`、`deployment/spa-fallback-notes.md`                               | config / notes       | 9.12     |
| 提供 Nginx static host 示例   | `nginx/vue-spa.conf`                                                                   | config               | 9.13     |
| 提供 Docker multi-stage 示例  | `Dockerfile`、`.dockerignore`                                                          | config               | 9.14     |
| 比较部署目标                  | `production/deploymentTargetModel.ts`                                                  | typed model          | 9.15     |
| 解释 runtime config 边界      | `production/runtimeConfigBoundary.ts`                                                  | typed model          | 9.16     |
| 解释 production error 边界    | `performance/preloadErrorPolicy.ts`、`components/ProductionErrorPanel.vue`             | typed model / panel  | 9.17     |
| 复用 Chapter 10 gate          | `production/deploymentChecklist.ts`                                                    | typed checklist      | 9.18     |
| 形成最终 lab                  | `production-lab/VueProductionDeploymentLab.vue`                                        | final lab            | 9.19     |

## 0. 文件定位

本章指南位于 `docs/vue/chapter-11-production-deployment/vue-chapter-11-learning-guide.md`。可运行练习与 production 模型位于 `src/learning/vue/chapter-11-production-deployment/`。根配置新增 `vite.config.ts` analyze mode、`.env.example`、`.env.production.example`、`Dockerfile`、`.dockerignore` 与 `nginx/vue-spa.conf`，全部仍在当前 `vue/` 工作区内。

本章没有创建第二个 Vue app，没有把 `/` 改成 Router-only 页面，也没有加入远程部署平台配置。Chapter 11 只把现有 Chapters 01–10 的本地学习 shell 推进到可构建、可预览、可分析、可用 Nginx/Docker 本地静态托管的 production 边界。

## 1. 本章解决的问题

前十章已经有 Router、Pinia、中后台 UI、API boundary 与测试 gate；但这些只能证明“本地开发与测试路径可运行”。上线前还必须回答：`npm run dev` 为什么不能证明可部署？`npm run build` 到底产生什么？`dist` 如何被静态服务器、Nginx、Docker image、CDN 与浏览器缓存读取？`createWebHistory()` 为什么刷新会 404？`VITE_*` 为什么不能放 secret？bundle 变大时应该看什么证据？回滚时为什么不能只替换一个文件？

Chapter 11 的核心不是“把项目发布到某个平台”，而是把 source code、type/test gates、Vite build、dist artifacts、static host、fallback、cache、browser 与 rollback 串成一条可验证的 production 证据链。

## 2. 前置概念

| 前置概念                                                | 所属层                            | 本章如何使用                                                            |
| ------------------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| `vue-tsc`                                               | TypeScript / SFC type gate        | 在 build 前确认 SFC 与 TS graph 没有静态错误                            |
| Vite dev server                                         | Tooling                           | 只负责开发期转换、HMR 与 module serving                                 |
| Vite production build                                   | Tooling                           | 读取 `vite.config.ts`、mode 与 source graph，输出 `dist`                |
| Vue Router history mode                                 | Router / browser                  | clean URL 需要 server fallback 才能 direct refresh                      |
| Pinia persistence                                       | Browser storage                   | rollback 时 localStorage 中旧 state 可能与新 bundle version 不匹配      |
| Element Plus                                            | Runtime dependency                | 需要用 bundle report 看 UI library 对 chunk 的贡献                      |
| Axios / Zod                                             | Runtime dependency                | API client 与 validator 会进入 client bundle，secret 不应在前端         |
| Vitest / Playwright                                     | Quality gates                     | Chapter 10 的测试命令成为 deployment 前置 gate                          |
| Nginx                                                   | Static server                     | 服务 `dist`、设置 fallback、cache headers 与基本安全 headers            |
| Docker multi-stage build                                | Build / runtime image             | build stage 有 source，runtime stage 只保留 static artifacts            |
| KeepAlive / Teleport / Transition                       | Vue runtime / built-in components | 作为 roadmap Phase 11 的性能与交互边界阅读项，本章不新增独立 demo       |
| virtual list / image optimization / accessibility / CSP | Browser / UX / security           | 作为 production review checklist 的边界项，本章不引入新依赖或未验证 CSP |

## 3. 学习目标

- 能解释 dev server、production build、preview server、static host、Nginx、CDN、Docker container 与 browser runtime 的边界。
- 能追踪 `source -> typecheck/test gate -> vite build -> dist -> static server -> browser cache -> rollback`。
- 能配置并解释 `VITE_PUBLIC_BASE_PATH`、`import.meta.env`、`dist/assets`、`try_files`、cache headers 与 Docker multi-stage build。
- 能识别部署前常见错误：错误 base、缺少 fallback、缓存 `index.html`、把 secrets 放进 `VITE_*`、声称未运行的 gate 已通过。

## 4. 推荐学习顺序

1. 先跑 Chapter 10 的质量 gate：`lint`、`typecheck`、`test:unit`。
2. 再学习 `npm run build` 如何读取 `vite.config.ts` 与 env mode。
3. 用 `npm run verify:dist` 查看 `dist/index.html` 与 `dist/assets`。
4. 用 `npm run preview` 验证 built files，而不是 dev server。
5. 读 Nginx fallback 与 cache policy，理解 direct refresh 404 的 server owner。
6. 再看 bundle analysis、performance budget、Web Vitals、Lighthouse 与 rollback。
7. 最后用 `VueProductionDeploymentLab.vue` 把所有检查项组成上线前 checklist。

## 5. 核心术语表

| Concept           | Layer                      | Meaning                               | Common Misunderstanding                 |
| ----------------- | -------------------------- | ------------------------------------- | --------------------------------------- |
| `npm run dev`     | Vite dev tooling           | 按需转换并服务 source modules         | 误以为 dev page 能打开就可部署          |
| `npm run build`   | Type gate + bundler        | 先 `vue-tsc`，再输出 optimized `dist` | 误以为它会部署到服务器                  |
| `dist`            | Build artifact             | 静态部署的唯一上传对象                | 误把 source files 上传到 host           |
| `base`            | Vite config                | 控制生成的 public asset URL prefix    | 误以为只影响 Router                     |
| `import.meta.env` | Build-time env replacement | 暴露给 client source 的 env namespace | 误把 `VITE_*` 当 server secret          |
| hashed asset      | Browser / CDN cache        | 内容变则文件名变，可长缓存            | 误把 `index.html` 也 immutable          |
| SPA fallback      | Static server              | 非真实文件路径回退到 `index.html`     | 误以为 Router catch-all 能修 server 404 |
| bundle report     | Build analysis artifact    | 显示 module/chunk contribution        | 误把 report 存在当性能已达标            |
| Lighthouse        | Lab audit                  | 用受控环境测页面质量信号              | 误把 lab score 当真实用户 field data    |
| rollback artifact | Release operation          | 恢复一整套匹配的 index/assets/image   | 误只回滚一个 HTML 或一个 JS file        |

## 6. 底层心智模型

Production 不是一个命令，而是多个 owner 的接力：

```txt
source code
  -> lint / typecheck / unit / e2e gate
  -> vite build mode
  -> env replacement and base path
  -> chunk graph and dist artifacts
  -> static host or Nginx
  -> browser requests index and hashed assets
  -> Router resolves clean URL after fallback
  -> cache layer keeps or revalidates files
  -> rollback restores a matching artifact set
```

Vue runtime 只在 browser 下载并执行 JS 后才接管组件、Router、Pinia 与 DOM patch。`createWebHistory()` 的 direct refresh 先命中 server；`VITE_*` 的值在 build 时进入 client bundle；bundle analysis 只解释 build artifact，不替代 Lighthouse 或 real-user Web Vitals。

## 7. 推荐目录结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-11-production-deployment</span>
  </div>

```txt
src/learning/vue/chapter-11-production-deployment/
  ProductionDeploymentChapterApp.vue
  production/
  performance/
  deployment/
  scripts/
  components/
  production-lab/
nginx/
  vue-spa.conf
Dockerfile
.dockerignore
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
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run verify:dist
npm run verify:env
npm run preview
npm run build:analyze
```

</div>

`npm run preview` 是长运行 server，验证后应停止。Docker 只在本机安装 Docker 时验证；没有运行时不能标为通过。Lighthouse 分数只有实际运行后才能记录。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Production mental model：source、build、dist、static host、CDN、browser 与 rollback

**结论：** Production 证据链从 source 开始，到 rollback artifact 结束；任何单个页面可见结果都不能覆盖整条链。

**本节解决的问题：** 学习者容易把 `npm run dev`、`npm run build`、`npm run preview` 和部署混为一谈。本节用 `productionBuildModel.ts` 把每个 owner 分开。

**技术意义：** 真实项目上线失败通常不是 Vue 组件写错，而是 build artifact、fallback、cache、base path 或 rollback owner 没定义清楚。

**概念解释：** Source code 属于 Git-free 本地工作区；type/test gate 属于 Chapter 10；Vite build 产生 `dist`；Nginx/CDN/browser 只认识 static files；rollback 恢复完整 artifact set。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** 本节覆盖全链路，但不创建 remote provider、不接入 monitoring SaaS、不声称 field data。

**Production 机制证据链：** `App.vue` 引入 Chapter 11；`npm run lint/typecheck/test:unit` 给前置 gate；`npm run build` 读取 `vite.config.ts`；mode 决定 env；`base` 改写 asset URL；Chapter 06 lazy routes 进入 chunks；`dist/index.html` 与 `dist/assets` 出现；Nginx 用 `try_files` 服务 fallback；cache headers 分开 index 与 assets；Docker build stage 有 source，runtime stage 只有 dist；rollback 恢复匹配文件。

**TypeScript / vue-tsc 编译期过程：** `productionBuildModel.ts` 的 literal unions 让 stage id、owner 与 evidence 可被 `vue-tsc` 检查；它不验证 server 是否真的部署。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** Vite build 生成 bundle；server 只服务文件；browser 执行 client bundle 后 Vue 才 mount；Router fallback 在 server 层先发生。

**API / 语法规则：** 本节核心语法是 package scripts、`defineConfig()`、static file serving 与 `try_files`。

**文件结构：** `production/productionBuildModel.ts` 是链路模型；`ProductionBuildPanel.vue` 把它渲染成时间线。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run lint && npm run typecheck && npm run test:unit && npm run build
```

</div>

**逐行解释：** `lint` 查静态模式；`typecheck` 查 SFC/TS graph；`test:unit` 执行 Chapter 10 测试；`build` 先类型检查再产出 `dist`。

**执行过程：** shell 按 `&&` 顺序执行，任一 gate exit code 非 0 即停止，避免带错误 source 进入 production artifact。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** source 通过 gate 后被 build 读取；env/base 写进 bundle URL；chunks/assets 进入 `dist`；headers/fallback 由 Nginx 配置；preview 只服务本地 `dist`；Docker runtime 只保留静态产物；rollback 恢复上一个匹配产物。

**为什么得到这个结果：** 因为 Vite build 与 static server 是不同 process；Vue runtime 无权修复还没返回 `index.html` 的 server 404。

**对比写法：** 只跑 `npm run dev` 只能证明 local dev transform，不证明 `dist`、cache、fallback 或 Docker image。

**常见错误为什么错：** 把 visible page 当 deployment proof，会漏掉 hash asset、base path、fallback 与 cache owner。

**与真实项目的关系：** 团队 release checklist 必须记录每个 owner 的证据，而不是只截图首页。

**与当前学习主线的关系：** Chapter 10 提供 gate；Chapter 11 把 gate 的结果接到 production artifact。

**最终记忆模型：** source gate -> build artifact -> static serving -> cache -> rollback。

<a id="section-9-2"></a>

### 9.2 Vite production build：vite build、vue-tsc、mode、minification 与 dist output

**结论：** `npm run build` 先执行 `vue-tsc --noEmit`，再让 Vite 读取 `index.html`、source graph、mode env 与 config，最后输出 `dist`。

**本节解决的问题：** 学习者需要知道 build 输出不是“运行 app”，而是生成可被 static host 服务的文件集合。

**技术意义：** production build 会移除开发分支、压缩输出、生成 hashed assets，并暴露真实部署会读取的 artifact。

**概念解释：** `distOutputMap.ts` 把 `index.html`、hashed JS、hashed CSS、static assets、public assets、`stats.html` 分为不同 artifact kind。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** build 只负责生成 artifact；不会设置 CDN、不会验证 route refresh、不会产生 Lighthouse field data。

**Production 机制证据链：** `package.json` 的 `build` script 调用 `vue-tsc` 和 `vite build`；Vite 使用 `vite.config.ts`；production mode 读取 `.env.production` 系列；`VITE_*` 被替换；`base` 写入 asset URL；dynamic imports 分 chunk；`dist` 出现；server 再服务这些文件。

**TypeScript / vue-tsc 编译期过程：** `vue-tsc --noEmit` 检查 `ProductionDeploymentChapterApp.vue`、models 与 imported components；没有 emit，不改变 runtime files。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** Vite 从 `index.html` 找入口，遍历 ESM imports，生成 optimized chunks；browser 后续请求这些 files。

**API / 语法规则：** `vite build` 默认以 project root 的 `index.html` 为入口，输出适合 static hosting 的 bundle。

**文件结构：** `dist/index.html` 是 entry；`dist/assets/*` 是 chunk 与 CSS；`dist/stats.html` 只在 analyze mode 后出现。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">package.json</span>
  </div>

```json
{
  "scripts": {
    "build": "vue-tsc --noEmit && vite build",
    "verify:dist": "node src/learning/vue/chapter-11-production-deployment/scripts/verifyDistFiles.mjs"
  }
}
```

</div>

**逐行解释：** `build` 先 type gate 再 bundle；`verify:dist` 不重新构建，只检查现有 build artifact。

**执行过程：** typecheck pass 后 Vite build 读取 config/env/source，写出 `dist`，verify script 检查 index 与 assets。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** build 阶段改变的是 `dist` 内容；headers、fallback、preview、Docker 与 rollback 是后续 owner。

**为什么得到这个结果：** 因为 Vite 的 production build 是 artifact generation，不是 long-running server。

**对比写法：** `vite build` 单独运行不会自动执行 `vue-tsc`；当前项目用 package script 串起来。

**常见错误为什么错：** 部署 source files 会绕过 hashed assets、minification 与 generated entry mapping。

**与真实项目的关系：** CI/本地 release gate 通常必须保留 build artifact 或至少记录 build command exit code。

**与当前学习主线的关系：** Chapter 01 的 Vite mental model 在本章进入 production build 阶段。

**最终记忆模型：** build = type gate + bundle graph + dist output。

<a id="section-9-3"></a>

### 9.3 Vite preview：preview server、built files verification 与 npm run dev 的边界

**结论：** `vite preview` 服务已构建的 `dist`，比 dev server 更接近静态部署，但仍不是真实 Nginx/CDN。

**本节解决的问题：** 学习者常在未 build 时跑 preview，或把 preview pass 当作 production host pass。

**技术意义：** preview 是验证 built files 的低成本步骤，可发现 asset URL、base path 与 entry 文件问题。

**概念解释：** `VitePreviewPanel.vue` 明确显示 preview 的输入是 `dist`，不是 source modules。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** preview 不证明 Nginx headers、Docker image 内容、CDN purge 或 route refresh under real host。

**Production 机制证据链：** 先 `npm run build` 写出 `dist`；再 `npm run preview` 读取 `dist`；browser 请求 localhost preview；Router 在 client 运行；若 route refresh 依赖 preview fallback，需要用 HTTP request 验证。

**TypeScript / vue-tsc 编译期过程：** preview 不做 typecheck；必须依赖前面的 `build` 或显式 `typecheck`。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** preview server 是静态文件 server；不会 HMR，不重新 transform source。

**API / 语法规则：** `vite preview` 应在 build 后运行；它默认使用 Vite 的 preview server。

**文件结构：** `deployment/preview-verification.md` 记录可验证步骤。

**示例代码：**

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

**逐行解释：** 第一行生成 artifact；第二行只服务 artifact。

**执行过程：** preview server 启动后浏览器请求 `index.html` 与 hashed assets；停止 preview 后不留下 deployment。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** source 不再被直接读取；browser 从 preview 读取 `dist`；Docker/cache/rollback 不参与。

**为什么得到这个结果：** preview 的定位是 local production-like smoke test，不是 production infrastructure。

**对比写法：** `npm run dev` 可在 source transform 层成功，但 `npm run preview` 会暴露 build artifact 是否存在。

**常见错误为什么错：** 未 build 直接 preview 会读不到最新 `dist` 或读到旧 artifact。

**与真实项目的关系：** 发布前应把 preview 作为本地 smoke test，但还要验证实际 server fallback。

**与当前学习主线的关系：** Chapter 10 的 build gate 后接 preview，形成更接近上线的证据。

**最终记忆模型：** preview reads dist, not source。

<a id="section-9-4"></a>

### 9.4 Env variables and modes：import.meta.env、VITE_* exposure、string parsing 与 secret boundary

**结论：** Vite 只把 `VITE_*` 暴露给 client source；这些值进入 browser bundle 后不是 secret，并且 env 值按字符串处理。

**本节解决的问题：** 学习者容易把 `.env.production` 当 server environment，或把 `VITE_ACCESS_TOKEN` 这类值放入前端。

**技术意义：** 正确 env boundary 可以避免把 backend secret 编译进 static JS。

**概念解释：** `.env.example` 和 `.env.production.example` 只放 public demo variables；`verifyEnvExposure.mjs` 扫描 secret-like VITE names。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** build-time env 进入 client bundle；backend secrets 必须留在 server/edge/backend runtime，本章不实现 backend。

**Production 机制证据链：** `vite.config.ts` 通过 `loadEnv(mode, process.cwd(), "VITE_")` 读取 public env；`base` 使用 `VITE_PUBLIC_BASE_PATH`；source 若读取 `import.meta.env.VITE_*`，值会进入 chunk；static host 不能在 build 后修改已编译值。

**TypeScript / vue-tsc 编译期过程：** `vite/client` 类型让 `import.meta.env` 可被识别；类型不会判断值是不是 secret。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** Vite 在 build 时替换 env access；browser 看到的是普通 string。

**API / 语法规则：** 只有 `VITE_` prefix 被默认暴露给 client；自定义 prefix 要显式配置，但本章不需要。

**文件结构：** `.env.example`、`.env.production.example`、`production/envModeModel.ts`、`scripts/verifyEnvExposure.mjs`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">.env.example</span>
  </div>

```env
VITE_APP_TITLE=Vue Production Deployment Lab
VITE_PUBLIC_BASE_PATH=/
VITE_DEMO_API_ORIGIN=https://api.example.com
```

</div>

**逐行解释：** title、base path、demo API origin 都是 public runtime UI/config inputs，不是 credentials。

**执行过程：** build 读取 mode 对应 env files；`VITE_PUBLIC_BASE_PATH` 进入 Vite config；source 中引用的 `VITE_*` 进入 JS bundle。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** env 在 build 时固定；preview/server/cache 只能服务已经写好的 bundle；rollback 需要恢复对应 build artifact。

**为什么得到这个结果：** 静态前端没有 server-side secret storage；所有 client bundle 都可被下载和检查。

**对比写法：** `API_SECRET=...` 不会默认暴露给 client，但如果手动写进 source 字符串仍会泄露。

**常见错误为什么错：** 把 token 放进 `VITE_*` 违反 client exposure rule；任何用户都能在 bundle/network 中看到。

**与真实项目的关系：** 前端只保存 public endpoint/base flags；真正 secret 在 backend。

**与当前学习主线的关系：** Chapter 09 的 API boundary 在这里变成 build-time exposure boundary。

**最终记忆模型：** `VITE_*` means public client input, not secret。

<a id="section-9-5"></a>

### 9.5 Base path：root deploy、subpath deploy、relative base、asset URL 与 router base

**结论：** Vite `base` 控制 build 后 asset URL prefix；部署到 subpath 时，Vite base 与 Router history base 必须一致。

**本节解决的问题：** 页面 HTML 能打开但 JS/CSS 404，通常是 base path 与部署路径不一致。

**技术意义：** base 是 production artifact 的 URL contract，不是 UI 配置。

**概念解释：** `basePathModel.ts` 对比 `/`、`/vue/`、`./`；`vite.config.ts` 从 `VITE_PUBLIC_BASE_PATH` 读取。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** base 影响 asset URL 与 Router base expectation；不自动创建 server fallback。

**Production 机制证据链：** env 给 `VITE_PUBLIC_BASE_PATH`；Vite config 设置 `base`；build 写入 `index.html` asset URLs；browser 按 URL 请求 assets；subpath host 若不匹配会 404；rollback 恢复旧 index 与旧 base mapping。

**TypeScript / vue-tsc 编译期过程：** `vite.config.ts` 的 helper 被 TS 检查，但 TS 不验证部署路径。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** Vite 在 build artifact 中写 URL；server 只按路径查文件；browser 不知道开发时 source path。

**API / 语法规则：** `base` 可设为 `/`、subpath 或 relative path；本章用 env 控制而不绑定 provider。

**文件结构：** `vite.config.ts`、`production/basePathModel.ts`、`.env.production.example`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">vite.config.ts</span>
  </div>

```ts
function resolveBasePath(mode: string): string {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return env.VITE_PUBLIC_BASE_PATH ?? "/";
}
```

</div>

**逐行解释：** `mode` 决定 env files；`loadEnv` 只读 `VITE_` prefix；缺省值为 root deploy。

**执行过程：** build 调用 config factory，解析 base，生成 asset URL。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** base 改变 `dist/index.html` 中引用 chunks/assets 的路径；cache 与 rollback 必须使用同一版本的 index 与 assets。

**为什么得到这个结果：** browser 按 HTML 中的 URL 请求资源，部署 subpath 不会自动重写 Vite 生成路径。

**对比写法：** hardcode provider path 会让本地 root deploy 与其他 static host 失配。

**常见错误为什么错：** 只改 Router path 不改 Vite base，会让页面 shell 与 assets 分属不同 URL contract。

**与真实项目的关系：** 子目录部署、反向代理 prefix、CDN path 都需要先确认 base。

**与当前学习主线的关系：** Chapter 06 `createWebHistory(import.meta.env.BASE_URL)` 在这里和 Vite base 对齐。

**最终记忆模型：** base writes asset URLs; Router base reads navigation prefix。

<a id="section-9-6"></a>

### 9.6 Static assets：imported assets、public directory、hashed files 与 cache owner

**结论：** imported assets 进入 Vite graph 并可带 hash；`public/` assets 被复制到 output root，cache policy 取决于命名与用途。

**本节解决的问题：** 学习者常不知道为什么某些文件进入 `assets/`，某些文件保持固定路径。

**技术意义：** asset owner 决定 cache header、rollback 风险与引用方式。

**概念解释：** `assetPipelineModel.ts` 把 source import、public directory、remote URL 三类 asset 分开。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** asset hashing 是 build owner；cache 是 server/CDN/browser owner；remote URL 不由 Vite 控制。

**Production 机制证据链：** source import 进入 module graph；Vite 生成 hashed file；`index.html` 或 JS 引用 URL；Nginx 给 `/assets/` long cache；browser cache 保存 hash file；rollback 必须保留 old assets。

**TypeScript / vue-tsc 编译期过程：** `vite/client` 提供 asset module types；TS 不验证文件是否有正确 Cache-Control。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** build rewrites URL；server 查文件；browser cache 按 headers 保留。

**API / 语法规则：** imported URL、CSS `url()` 与 Vue SFC template assets 会被 Vite 处理；public files 用 root public path。

**文件结构：** `production/assetPipelineModel.ts`、`nginx/vue-spa.conf` 的 `/assets/` cache rule。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: asset import</span>
  </div>

```ts
import heroImageUrl from "./hero-image.svg";

export const assetUrl = heroImageUrl;
```

</div>

**逐行解释：** import 让 asset 成为 module graph dependency；export 只是展示 build 后会变成 public URL。

**执行过程：** Vite 解析 asset import，决定 inline 或 emit file，生成 hashed URL。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** asset 从 source 进入 `dist/assets`；headers 控制长期缓存；rollback 保留匹配 hash。

**为什么得到这个结果：** hash 文件名把 content identity 放进 URL，使 long cache 可控。

**对比写法：** public stable name 若内容变化但 URL 不变，可能被 CDN/browser 保留旧内容。

**常见错误为什么错：** 对 `index.html` 与 hashed assets 使用同一 long cache 会让入口文件指向错误版本。

**与真实项目的关系：** 图片、字体、logo、manifest 都需要按 owner 选择 import 或 public。

**与当前学习主线的关系：** Chapter 08 UI assets 与 icons 的 bundle/cache 影响在本章被测量。

**最终记忆模型：** imported assets get graph and hash; public assets keep path。

<a id="section-9-7"></a>

### 9.7 Code splitting：dynamic import、route lazy loading、async component 与 chunk graph

**结论：** dynamic `import()` 创建 async boundary；Vue Router route lazy loading 把 route component 延迟到访问时加载。

**本节解决的问题：** 学习者容易把 lazy loading 当成“越多越好”，忽略 request overhead 与 fallback。

**技术意义：** 合理 chunk boundary 能降低 initial load，但过多小 chunk 会增加网络与 preload 复杂度。

**概念解释：** Chapter 06 已有 `router/lazyRoutes.ts`；本章用 `routeLazyLoadingMap.ts` 解释这些 loader 如何进入 production chunk graph。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** code splitting 是 build/browser boundary；server fallback 仍必须配置。

**Production 机制证据链：** route record 引用 loader function；Vite 检测 dynamic import；build 生成 lazy chunk；browser 首次访问 route 时请求 chunk；CDN/browser cache 按 hash 保存；deploy 后旧 index 若指向已删除 chunk 会触发 preload error。

**TypeScript / vue-tsc 编译期过程：** route component loader 类型被检查；TS 不保证 chunk 是否能从 CDN 下载。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** bundler split chunk；Router navigation resolved 后 browser 请求 chunk；server 返回 chunk file。

**API / 语法规则：** Vue Router 推荐 route component 使用 lazy loading function，不用 `defineAsyncComponent` 包 route component。

**文件结构：** `src/learning/vue/chapter-06-vue-router-permission/router/lazyRoutes.ts` 与 `performance/routeLazyLoadingMap.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/lazyRoutes.ts</span>
  </div>

```ts
export const lazyRouteComponents = {
  dashboard: () => import("../views/DashboardView.vue"),
  users: () => import("../views/UserListView.vue"),
  orders: () => import("../views/OrderListView.vue"),
} as const;
```

</div>

**逐行解释：** 每个 property 是 loader function；函数被调用前，目标 component module 不需要进入当前执行路径。

**执行过程：** navigation 匹配 route record，Router 调用 loader，browser 请求 chunk，component resolved 后 RouterView 渲染。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** source loader 变为 lazy chunk；base 影响 chunk URL；cache 可能保留 old chunk；rollback 需要匹配 index 与 chunks。

**为什么得到这个结果：** dynamic import 是 bundler 能识别的 split signal。

**对比写法：** eager import route view 会把 route component 放入 initial graph，降低延迟但增加首屏 bundle。

**常见错误为什么错：** 为每个 tiny component 单独 split 会让 request 数量增长，可能比一个合理 feature chunk 更慢。

**与真实项目的关系：** admin dashboard 通常按 route/feature split，而不是按每个按钮 split。

**与当前学习主线的关系：** Chapter 06 的 Router lazy route 在 Chapter 11 变成 performance 和 deployment concern。

**最终记忆模型：** route loader -> dynamic import -> lazy chunk -> browser request。

<a id="section-9-8"></a>

### 9.8 Bundle analysis：visualizer、chunk size、dependency risk、duplicate modules 与 budget

**结论：** Bundle report 是 build artifact 的阅读工具；它帮助定位 large modules、chunk size、dependency contribution 与 duplicate modules，但不能替代真实 performance measurement。

**本节解决的问题：** 学习者需要知道如何查看 Element Plus、icons、Zod、Axios 等依赖是否影响 production bundle。

**技术意义：** 不测量就改 import strategy 是猜测；visualizer 让优化从证据开始。

**概念解释：** `bundleAnalysisModel.ts` 定义 report signals；`bundleBudget.ts` 记录依赖风险；`build:analyze` 只在 analyze mode 加 visualizer plugin。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** report 解释 bundle graph，不证明 CDN、browser cache、Lighthouse score 或 field data。

**Production 机制证据链：** `npm run build:analyze` 调用 `vite build --mode analyze`；config 加 visualizer；build 生成 `dist/stats.html`；开发者阅读 report；若超 budget 再修改 source import。

**TypeScript / vue-tsc 编译期过程：** analyze script 仍先跑 `vue-tsc --noEmit`；visualizer plugin 类型由 Vite config 检查。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** analyzer 在 build 时读取 output bundle metadata；browser 用户不需要打开 report。

**API / 语法规则：** 本章使用 `rollup-plugin-visualizer`，并只在 `mode === "analyze"` 时启用。

**文件结构：** `vite.config.ts`、`performance/bundleAnalysisModel.ts`、`scripts/analyzeBundle.mjs`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run build:analyze
node src/learning/vue/chapter-11-production-deployment/scripts/analyzeBundle.mjs
```

</div>

**逐行解释：** 第一行生成 report；第二行只检查 `dist/stats.html` 是否存在。

**执行过程：** analyze mode build 输出 normal `dist` 和 stats report；review 后才决定是否优化 imports。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** source 不因 report 自动改变；`dist/stats.html` 是 review artifact，不应作为 runtime page。

**为什么得到这个结果：** Visualizer 读取 build output graph，而不是运行用户交互。

**对比写法：** 只看 package size 不如看当前 app 的 actual bundle graph。

**常见错误为什么错：** 没生成 report 却声称 bundle analysis passed，是把 planned check 当 actual evidence。

**与真实项目的关系：** UI library、icons、validators、chart library 等变更前后都应比较 report。

**与当前学习主线的关系：** Chapter 08 与 Chapter 09 的 runtime dependencies 在本章进入 bundle review。

**最终记忆模型：** analyze build -> stats report -> dependency decision。

<a id="section-9-9"></a>

### 9.9 Vue performance：page load、update performance、props stability、v-once、v-memo 与 large list

**结论：** Vue performance 同时包含 page load 和 update performance；bundle size、props stability、`v-once`、`v-memo` 与 large list virtualization 解决的问题不同。

**本节解决的问题：** 学习者容易把 performance 简化为 lazy loading，忽略 update path 与 DOM node 数量。

**技术意义：** Admin table、large form 与 UI library 组件树需要用不同证据判断性能瓶颈。

**概念解释：** `performanceBudget.ts` 定义本地 learning budgets；这些预算是 review trigger，不是普遍真理。Roadmap Phase 11 还列出 KeepAlive、Teleport、Transition、virtual list、image optimization、accessibility、security 与 CSP；本章把它们作为 production review boundary，不新增独立 demo，也不添加未测试 CSP。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** Vue update optimization 属于 runtime；bundle budget 属于 build artifact；Web Vitals 属于 user metric。

**Production 机制证据链：** source props/computed/list shape 决定 update work；Vite build 决定 transfer graph；browser runtime 执行 patch；Lighthouse/Web Vitals 捕获 page load/interaction signal；rollback 不优化性能，只恢复版本。

**TypeScript / vue-tsc 编译期过程：** TS 可检查 props types，但不能证明 props stable 或 list rendering cheap。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** Vite 减小 transfer graph；Vue runtime 响应式依赖触发 component update；browser layout/paint 执行真实成本。

**API / 语法规则：** `v-once` 跳过后续更新；`v-memo` 可按 dependency array 跳过 subtree update；large list 通常需要 virtualization。

**文件结构：** `performance/performanceBudget.ts`、`components/PerformanceBudgetPanel.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: stable item update</span>
  </div>

```vue
<template>
  <ListItem
    v-for="item in items"
    :key="item.id"
    :id="item.id"
    :active="item.id === activeId"
  />
</template>
```

</div>

**逐行解释：** `key` 让 patch 识别 item；`active` 在 parent 计算，只有 active 状态变化的 child 需要更新。

**执行过程：** `activeId` 变化触发 parent render；多数 child props 保持相同；Vue 可跳过无变化 child update。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** update optimization 不改变 build artifact；bundle budget 只影响 initial transfer；cache 不修复 runtime over-render。

**为什么得到这个结果：** Vue child update 由 props change 触发，不稳定 props 会扩大更新范围。

**对比写法：** 把 `activeId` 传给所有 child 会让每个 child 都看到 prop change。

**常见错误为什么错：** 对小列表滥用 memo 会增加复杂度；对万级列表不 virtualization 会让 DOM 数量成为瓶颈。

**与真实项目的关系：** Chapter 08 table 和 form 是 update performance 的典型入口。

**与当前学习主线的关系：** Chapter 02 的响应式依赖追踪在本章变成 performance evidence。

**最终记忆模型：** load cost is bundle; update cost is reactive read and DOM work。

<a id="section-9-10"></a>

### 9.10 Web Vitals and Lighthouse：LCP、INP、CLS、lab data、field data 与 score boundary

**结论：** Lighthouse 是 lab audit；Core Web Vitals 的 LCP、INP、CLS 关注真实用户体验，field data 与本地 preview audit 不是同一证据。

**本节解决的问题：** 学习者容易把本地 Lighthouse score 当成真实生产性能。

**技术意义：** 上线前可以用 Lighthouse 找明显问题，但生产质量仍需真实 URL、真实 headers、真实网络与 field data。

**概念解释：** `webVitalsModel.ts` 定义 LCP/INP/CLS；`lighthouseAuditModel.ts` 区分 local evidence 与 production evidence。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** Lighthouse lab data 不等于 Web Vitals field data；本章不伪造分数。

**Production 机制证据链：** build 生成 dist；preview/static server 提供 URL；Lighthouse 在受控 browser 中测试；Web Vitals field data 来自真实用户；cache/CDN/headers 会影响 production measurement。

**TypeScript / vue-tsc 编译期过程：** TS 不检查 LCP/INP/CLS；只能保证 model 数据类型正确。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** browser 加载资源、执行 JS、布局和响应输入；Lighthouse 模拟并记录 signals。

**API / 语法规则：** 本章只记录可运行 audit 方法，不加入 Lighthouse project dependency。

**文件结构：** `performance/webVitalsModel.ts`、`performance/lighthouseAuditModel.ts`、`components/WebVitalsPanel.vue`、`components/LighthousePanel.vue`。

**示例代码：**

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

**逐行解释：** 先生成 production-like files，再对 preview URL 做 lab audit；没有实际运行 audit 就不能记录 score。

**执行过程：** browser 请求 index/assets，计算 loading、interaction 与 layout shift signals；lab 环境固定但不代表所有用户。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** Lighthouse 从 served artifact 观察结果；rollback 后必须重新测，而不能沿用旧 score。

**为什么得到这个结果：** 性能指标依赖 device、network、server headers、cache state 与用户行为。

**对比写法：** Dev server 上的 performance 不能代表 minified production bundle，也不能代表 CDN cache behavior。

**常见错误为什么错：** 分数好不等于无性能问题；分数差也需要定位是 bundle、server、image、layout 还是 interaction。

**与真实项目的关系：** Release note 应区分 lab audit、production audit 与 field telemetry。

**与当前学习主线的关系：** Chapter 11 只建立性能测量边界，不引入真实 telemetry SDK。

**最终记忆模型：** Lighthouse is lab; Web Vitals field data comes from users。

<a id="section-9-11"></a>

### 9.11 Cache policy：index.html、hashed assets、browser cache、CDN cache 与 rollback risk

**结论：** `index.html` 应短缓存或 revalidate；hashed assets 可长缓存；rollback 必须处理 browser 和 CDN 两层缓存。

**本节解决的问题：** 学习者常把所有文件都设为 immutable，导致用户拿到旧 index 或新旧资源混用。

**技术意义：** 正确 cache policy 能让资产缓存有效，同时降低回滚白屏风险。

**概念解释：** `cachePolicyModel.ts` 把 index、hashed assets、public assets、CDN entry 与 browser entry 分开。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** cache owner 在 server/CDN/browser；Vue runtime 无法控制已经缓存的旧 entry。

**Production 机制证据链：** build 产生 hash assets；Nginx 对 `/assets/` 设置 immutable；对 `index.html` 设置 no-cache；CDN 可能另外缓存；rollback 恢复 old index/assets 并 purge/revalidate entry。

**TypeScript / vue-tsc 编译期过程：** TS 只检查 cache policy model 的 literal values；不检查 header 是否真返回。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** server 写 response headers；browser/CDN 根据 headers 缓存；JS 执行前 cache 已决定文件版本。

**API / 语法规则：** 使用 `Cache-Control` header；不要把 entry HTML 与 hashed assets 同策略。

**文件结构：** `nginx/vue-spa.conf`、`production/cachePolicyModel.ts`、`deployment/cdn-cache-notes.md`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">nginx/vue-spa.conf</span>
  </div>

```nginx
location = /index.html {
  add_header Cache-Control "no-cache, no-store, must-revalidate" always;
  try_files /index.html =404;
}

location /assets/ {
  add_header Cache-Control "public, max-age=31536000, immutable" always;
  try_files $uri =404;
}
```

</div>

**逐行解释：** entry HTML 要 revalidate；hashed assets 可长期缓存；两个 location 由 Nginx 匹配不同路径。

**执行过程：** browser 请求 index 后再请求 assets；headers 决定下次是否重新确认。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** headers 影响 browser/CDN 保留版本；rollback 必须让 entry 指回 matching assets。

**为什么得到这个结果：** hash 文件名让 assets content-addressed；index 文件名固定，不能长期不可变。

**对比写法：** 对所有文件设置 `immutable` 会让入口文件无法及时更新。

**常见错误为什么错：** 只 purge JS asset 不 purge index，或只 rollback index 不保留 old assets，都会产生混合版本。

**与真实项目的关系：** CDN purge 策略和 artifact retention 是部署方案的一部分。

**与当前学习主线的关系：** Chapter 07 的 localStorage persistence 也可能跨版本保留旧 client state。

**最终记忆模型：** index short cache, hashed assets long cache, rollback keeps matching set。

<a id="section-9-12"></a>

### 9.12 SPA fallback：createWebHistory、direct refresh、server fallback 与 app-level 404

**结论：** `createWebHistory()` clean URL direct refresh 先到 server；server fallback 返回 `index.html` 后，Vue Router 才能处理 app-level 404。

**本节解决的问题：** 学习者常以为 Router catch-all route 能修复 server 404。

**技术意义：** SPA fallback 是 static server config；app-level 404 是 client route result，两个都需要。

**概念解释：** Chapter 06 使用 `createWebHistory(import.meta.env.BASE_URL)`；Chapter 11 用 Nginx `try_files` 给 direct refresh fallback。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** fallback owner 是 server；Router owner 是 browser runtime。

**Production 机制证据链：** user 打开 `/router/dashboard`；server 查真实文件；不存在则返回 `/index.html`；browser 执行 bundle；Router 根据 current URL 匹配 route；若 route 不存在再显示 NotFound。

**TypeScript / vue-tsc 编译期过程：** Router route records 类型可检查；server fallback 配置不能被 TS 证明。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** server fallback 发生在 JS 下载前；Router resolution 发生在 JS 执行后。

**API / 语法规则：** Nginx `try_files $uri $uri/ /index.html;` 是本章具体 fallback 示例。

**文件结构：** `nginx/vue-spa.conf`、`deployment/spa-fallback-notes.md`、`scripts/verifySpaFallbackNotes.mjs`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">nginx/vue-spa.conf</span>
  </div>

```nginx
location / {
  add_header Cache-Control "no-cache" always;
  try_files $uri $uri/ /index.html;
}
```

</div>

**逐行解释：** `location /` 捕获 app paths；先尝试真实文件和目录；都不存在时返回 `index.html`。

**执行过程：** direct refresh -> Nginx fallback -> browser loads app -> Router resolves URL。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** fallback 只改变 server response selection；不改变 build artifact。

**为什么得到这个结果：** Browser refresh 是 HTTP request；Vue Router 在 server response 到达后才存在。

**对比写法：** Hash history 不需要同样 fallback，但 URL 和 SEO/UX tradeoff 不同。

**常见错误为什么错：** 只有 app-level `/:pathMatch` route 时，server 对 `/router/dashboard` 仍可能先返回 404。

**与真实项目的关系：** Nginx、object storage + CDN、static host 都有不同 rewrite/fallback syntax，但机制相同。

**与当前学习主线的关系：** Chapter 06 的 `createWebHistory()` production warning 在本章落实为 server config。

**最终记忆模型：** refresh hits server first; Router handles after index loads。

<a id="section-9-13"></a>

### 9.13 Nginx static hosting：root、try_files、cache headers、security headers 与 no backend proxy

**结论：** 本章 Nginx 只服务 Vue `dist`，设置 SPA fallback、cache headers 与基础安全 headers，不代理 API。

**本节解决的问题：** 学习者容易把 static hosting、reverse proxy、API proxy 和 backend security 混在一个配置里。

**技术意义：** 对纯 Vue SPA，Nginx 的 production 责任是静态文件与 HTTP headers。

**概念解释：** `nginx/vue-spa.conf` 是 Docker runtime 使用的真实配置；chapter folder 下 `deployment/nginx.conf` 是学习副本。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** Nginx 不运行 Vue source、不执行 TypeScript、不保存 secret、不替代 backend authorization。

**Production 机制证据链：** Docker runtime 复制 Nginx config；Nginx root 指向 static html root；requests 命中 index/assets/fallback locations；headers 决定 cache/security boundary。

**TypeScript / vue-tsc 编译期过程：** TypeScript 不解析 Nginx config；验证由 script 和 manual HTTP check 完成。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** Vite 产物被 Nginx 作为 bytes 返回；browser 执行 JS 后 Vue mount。

**API / 语法规则：** `root`、`index`、`location`、`try_files`、`add_header` 是本节关键 Nginx directives。

**文件结构：** `nginx/vue-spa.conf` 是 root config；`deployment/nginx.conf` 是 chapter-local reference。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">nginx/vue-spa.conf</span>
  </div>

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

</div>

**逐行解释：** server 监听 80；root 指向 final image 中的 static files；headers 提供基础 browser protection。

**执行过程：** Nginx 进程启动后，所有 requests 都按 location 与 filesystem lookup 处理。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** Nginx 不改 `dist`，只决定 response headers 与 fallback file。

**为什么得到这个结果：** Static server 只按文件和 directive 处理 request，不知道 Vue route records。

**对比写法：** 在本章加入 API proxy 会扩大到 backend boundary，违反 local static deployment scope。

**常见错误为什么错：** 配 strict CSP 但未测试可能阻止现有 app；本章不加未验证 CSP。

**与真实项目的关系：** 后续真实 API proxy 应单独设计 auth、CORS、timeout 与 upstream error policy。

**与当前学习主线的关系：** Chapter 09 的 API boundary 仍留在 frontend client/mock，不在 Nginx 中扩张。

**最终记忆模型：** Nginx serves dist and fallback; it is not the Vue app。

<a id="section-9-14"></a>

### 9.14 Docker static deployment：multi-stage build、Node builder、Nginx runtime 与 final image boundary

**结论：** Docker multi-stage build 让 Node stage 负责构建，Nginx runtime stage 只包含 `dist` 与 Nginx config。

**本节解决的问题：** 学习者容易把 source、node_modules、tests 或 env secrets 复制进 final image。

**技术意义：** final image boundary 清楚后，部署产物更小、更干净，也更容易回滚到上一 image tag。

**概念解释：** 根 `Dockerfile` 用 `node:26-alpine` build stage 与 `nginx:1.29-alpine` runtime stage；`.dockerignore` 排除本地生成物和 env files。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** build stage 可见 source；runtime stage 只保留 static files；Docker run 不等于 remote deployment。

**Production 机制证据链：** docker build 复制 package files；`npm ci` 安装；复制 source；`npm run build` 输出 dist；runtime stage 复制 Nginx config 与 dist；container 监听 80。

**TypeScript / vue-tsc 编译期过程：** Docker build 内的 `npm run build` 会触发 `vue-tsc --noEmit`。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** build stage 执行 Vite；runtime stage 执行 Nginx；browser 请求 container HTTP。

**API / 语法规则：** `FROM ... AS build`、`COPY --from=build`、`.dockerignore` 是本节关键语法。

**文件结构：** `Dockerfile`、`.dockerignore`、`nginx/vue-spa.conf`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Dockerfile</span>
  </div>

```dockerfile
FROM node:26-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.29-alpine AS runtime
COPY nginx/vue-spa.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

</div>

**逐行解释：** 第一 stage 安装并构建；第二 stage 只复制 config 和 dist；最终命令启动 Nginx。

**执行过程：** docker build 产生 image；docker run 后 Nginx 服务 static files。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** source 只存在 build stage；dist 进入 final image；rollback 可切回 previous image tag。

**为什么得到这个结果：** multi-stage build 允许只复制需要的 artifact 到 final stage。

**对比写法：** 单 stage Node image 运行 static server 会携带更多 build dependency 和 source context。

**常见错误为什么错：** 忘记 `.dockerignore` 会把 local artifacts 或 env files 带入 build context。

**与真实项目的关系：** 容器部署时还要有 registry、tag、health check 与 rollout policy；本章不创建 remote config。

**与当前学习主线的关系：** Chapter 11 用 Docker 演示 artifact boundary，不进入 backend/SSR。

**最终记忆模型：** builder has source; runtime has dist。

<a id="section-9-15"></a>

### 9.15 CDN and static host deployment：dist upload、base path、cache invalidation 与 vendor boundary

**结论：** 静态部署的通用动作是上传 `dist`、配置 fallback、设置 cache policy、验证 route refresh；具体 vendor syntax 不在本章绑定。

**本节解决的问题：** 学习者容易为了学习章节提前加入 provider CLI 或 remote workflow。

**技术意义：** 把 vendor boundary 留清楚，能让本地 production model 适配不同 static host。

**概念解释：** `deploymentTargetModel.ts` 比较 static hosting、Nginx、Docker + Nginx、CDN、object storage + CDN。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** 本章不创建 remote provider file；只记录不同 target 的 serving owner。

**Production 机制证据链：** `dist` 被上传；static host 服务 index/assets；CDN 可缓存；base path 必须匹配 URL；fallback rule 必须存在；purge/revalidation 支持 rollback。

**TypeScript / vue-tsc 编译期过程：** deployment target model 可被 TS 检查；remote host config 不能。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** Browser request 可能先命中 CDN，再到 origin；Vue runtime 仍只运行 client bundle。

**API / 语法规则：** 本章只使用 portable concepts：dist upload、rewrite/fallback、Cache-Control、purge/invalidation。

**文件结构：** `deployment/static-hosting-notes.md`、`deployment/cdn-cache-notes.md`、`production/deploymentTargetModel.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: static host artifact</span>
  </div>

```txt
dist/
  index.html
  assets/
    app.12345678.js
    app.12345678.css
```

</div>

**逐行解释：** host 上传的是 `dist` 内容；`index.html` 指向 hashed assets；assets 子目录可长缓存。

**执行过程：** user request -> CDN edge -> static origin -> index/assets -> browser runtime。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** source 不上传；dist 是 upload unit；CDN cache 可能保留 old content；rollback 需要 purge/revalidate。

**为什么得到这个结果：** Static host 不运行 Node build；它只服务 build 后的 files。

**对比写法：** 把 provider CLI 装进 project 会把学习章节绑到某个 remote path，本章不这样做。

**常见错误为什么错：** base path 与 host subpath 不一致会让 asset URL 请求到错误位置。

**与真实项目的关系：** 团队应把 provider-specific rule 写在 deployment docs 或 platform config 中。

**与当前学习主线的关系：** 本章完成 local production boundary，Phase 12/Nuxt 才讨论 SSR/SSG/full-stack。

**最终记忆模型：** upload dist; configure fallback/cache; keep vendor syntax separate。

<a id="section-9-16"></a>

### 9.16 Runtime config boundary：build-time env、client bundle exposure、runtime config injection 与 secrets

**结论：** Static Vue bundle 在 build 后不能读取新的 server env；如果需要部署后可变 public config，应单独注入 public runtime config，secret 仍留在 backend。

**本节解决的问题：** 学习者常以为修改服务器 `.env` 就能改变已构建前端行为。

**技术意义：** Runtime config boundary 能避免频繁 rebuild 需求与 secret 泄露误解。

**概念解释：** `runtimeConfigBoundary.ts` 区分 build-time env、runtime JSON、backend secret。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** runtime JSON 也只能放 public values；secret 必须由 server runtime 使用。

**Production 机制证据链：** source 读取 `import.meta.env` -> build 替换 -> dist 固定；若 source fetches `/runtime-config.json`，server 可替换 public config；backend secret 不进入 client request except through server response。

**TypeScript / vue-tsc 编译期过程：** TS 可定义 runtime config shape；必须用 runtime validation 检查 fetched JSON。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** build-time env 被写入 bundle；runtime JSON 由 browser 请求 server public file。

**API / 语法规则：** `import.meta.env` 是 build-time；`fetch("/runtime-config.json")` 是 runtime public fetch pattern。

**文件结构：** `production/runtimeConfigBoundary.ts`、`production-lab/RuntimeConfigPanel.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: public runtime config</span>
  </div>

```json
{
  "appTitle": "Vue Production Deployment Lab",
  "apiOrigin": "https://api.example.com",
  "basePath": "/"
}
```

</div>

**逐行解释：** 这些值可被 browser 读取；它们不能包含 password、token 或 private key。

**执行过程：** browser 在 mount 前 fetch public JSON；app 使用 validated values；server secret 从不下发。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** build-time env 固定在 chunk；runtime JSON 可单独变更但需要 cache policy；rollback 要匹配 app version。

**为什么得到这个结果：** Static files 没有 live server process 能重新读取 env。

**对比写法：** 在 Docker runtime 改 env 但不 rebuild，不会改变已经生成的 JS bundle。

**常见错误为什么错：** 把 private key 放 runtime JSON 与放 `VITE_*` 一样会暴露给 browser。

**与真实项目的关系：** Feature flags、public API origin 可走 runtime config；auth secrets 不行。

**与当前学习主线的关系：** Chapter 09 的 runtime validation 应用于 runtime config JSON。

**最终记忆模型：** build env is frozen; runtime public config is fetchable; secrets stay server-side。

<a id="section-9-17"></a>

### 9.17 Production error handling：app.config.errorHandler、preload error、logging boundary 与 no fake monitoring

**结论：** Production error handling 要明确安装、验证与上报边界；本章只建模型，不伪造 monitoring pass。

**本节解决的问题：** 学习者常复制 monitoring SDK 或 error handler 却不验证 source map、network、privacy 与 failure flow。

**技术意义：** Error handling 是 production operation，不是 UI 字符串。

**概念解释：** Vue `app.config.errorHandler` 可捕获 app-level errors；Vite `vite:preloadError` 可用于 chunk load failure response。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** 本章不安装 SaaS SDK；只说明 logging boundary 与 safe reload policy。

**Production 机制证据链：** deploy 新 build；old cached index points to missing chunk；browser dynamic import fails；Vite emits preload error; app can prompt reload; repeated failures indicate broken artifact/cache policy。

**TypeScript / vue-tsc 编译期过程：** `preloadErrorPolicy.ts` 的 message function 被检查；TS 不证明 error handler 被生产服务调用。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** preload error 发生在 browser 试图加载 chunk 时；server 可能返回 404；client policy 决定是否 reload。

**API / 语法规则：** `app.config.errorHandler` 需要在 `createApp` 后、mount 前配置；`vite:preloadError` 是 browser event。

**文件结构：** `performance/preloadErrorPolicy.ts`、`components/ProductionErrorPanel.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: error boundary hook</span>
  </div>

```ts
app.config.errorHandler = (error, instance, info) => {
  console.error(error, instance, info);
};
```

</div>

**逐行解释：** handler 接收 error、component instance 与 info；这里仅展示 hook，不声明 monitoring succeeded。

**执行过程：** Vue runtime 捕获 eligible error 后调用 handler；external reporting 需要单独安装和验证。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** preload failure 常由 cache/deploy mismatch 引发；rollback 与 cache purge 才是根因修复。

**为什么得到这个结果：** Client handler 只能响应已发生的 runtime failure，不能保证 artifact 正确。

**对比写法：** 自动 `location.reload()` 无限循环会掩盖真实 broken deployment。

**常见错误为什么错：** 声称 error tracking 已接入但没有发送、source map、privacy 与 alert evidence。

**与真实项目的关系：** 生产监控要设计 sampling、PII、source map 上传、alert routing 与 ownership。

**与当前学习主线的关系：** Chapter 10 的 failure diagnosis 思路延伸到 production runtime。

**最终记忆模型：** capture error, report deliberately, never fake observability。

<a id="section-9-18"></a>

### 9.18 Chapter integration：Chapters 06–10 的 router、Pinia、UI、API、tests 如何进入 production gate

**结论：** Chapter 11 不重写前章；它把 Router、Pinia、UI、API 与 tests 放进 production gate 顺序。

**本节解决的问题：** 学习者需要知道前章能力如何变成上线前检查，而不是复制全部解释。

**技术意义：** 每个前章 owner 都有 production 风险：Router fallback、Pinia persisted state、UI bundle、API env exposure、test gate evidence。

**概念解释：** `deploymentChecklist.ts` 复用 Chapter 10 commands；`dependencyRiskTable.ts` 标记 Chapter 08/09 dependencies；`routeLazyLoadingMap.ts` 标记 Chapter 06 lazy routes。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** 集成不改变前章 source 逻辑，只追加 Chapter 11 shell 和 production files。

**Production 机制证据链：** Chapter 06 routes -> lazy chunks and fallback; Chapter 07 state -> localStorage rollback concern; Chapter 08 UI -> bundle risk; Chapter 09 API -> env/secret boundary; Chapter 10 tests -> release gate; Chapter 11 build -> dist.

**TypeScript / vue-tsc 编译期过程：** App shell import Chapter 11 后，`vue-tsc` 检查所有 imported components and models。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** Vite bundles Chapters 01–11 into one shell; lazy Router chunks stay route-based; server fallback supports clean URL.

**API / 语法规则：** package scripts chain gates; Vue app still uses one `createApp` entry.

**文件结构：** `chapter-01-application-boundary/App.vue` imports `ProductionDeploymentChapterApp.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-01-application-boundary/App.vue</span>
  </div>

```vue
<script setup lang="ts">
import ProductionDeploymentChapterApp from "../chapter-11-production-deployment/ProductionDeploymentChapterApp.vue";
</script>

<template>
  <ProductionDeploymentChapterApp />
</template>
```

</div>

**逐行解释：** Import 注册 component binding；template 渲染 Chapter 11 section；真实文件中它位于 Chapters 01–10 后。

**执行过程：** Root app mount 后按 template 渲染所有 chapter sections；Chapter 11 不创建新 app。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** source shell 增加 Chapter 11；build graph 增加 production lab files；route lazy chunks 保持 Chapter 06 owner。

**为什么得到这个结果：** Vue SFC import composition 允许单 shell 添加新 chapter，不需要 Router-only architecture。

**对比写法：** 把 root `App.vue` 改成只含 `<RouterView />` 会破坏当前学习 shell。

**常见错误为什么错：** 重写前章源文件会混入非本章 scope，使 production chapter 难以 review。

**与真实项目的关系：** 生产优化通常先建立 gate 与 evidence，再做局部优化，不先大重构。

**与当前学习主线的关系：** 本章是 Chapters 06–10 的 production closure。

**最终记忆模型：** previous chapters become deployment inputs, not rewritten content。

<a id="section-9-19"></a>

### 9.19 Final integration：vue-production-deployment-lab 如何形成上线前检查体系

**结论：** `vue-production-deployment-lab` 是 Chapter 11 的最终小项目，用页面展示 production readiness map，但不伪造命令结果。

**本节解决的问题：** 学习者需要一个可视化入口，把 build artifact、env、base、assets、chunks、fallback、cache、Docker、CDN、checklist、rollback 统一起来。

**技术意义：** Final lab 把本章机制变成可复习、可检查、可扩展的 release checklist。

**概念解释：** `VueProductionDeploymentLab.vue` 组合 8 个 lab panels；每个 panel 读取 typed model 或明确显示 `UNKNOWN`。

**边界：source code、TypeScript type gate、Vite build pipeline、dist artifacts、static host、Nginx server、Docker image、CDN cache、browser cache、Vue Router history mode、runtime config、client bundle、backend secrets、Lighthouse lab data、Web Vitals field data、rollback artifact：** 页面展示 policy 与 expected evidence，不运行 shell commands、不部署、不生成 fake pass。

**Production 机制证据链：** models define checks; panels render checks; App shell displays lab; validation commands outside browser generate real evidence; final response reports actual command results only.

**TypeScript / vue-tsc 编译期过程：** Lab imports all panels; `vue-tsc` 检查 component imports 和 model shapes。

**Vite / Rollup or Rolldown / Browser / Server 运行时过程：** Vite bundles lab with shell; browser renders static policy data; scripts run separately in Node.

**API / 语法规则：** `<script setup>` imports panels；template composes sections；Node scripts validate artifacts outside Vue runtime。

**文件结构：** `production-lab/VueProductionDeploymentLab.vue` 与 sibling panels。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-11-production-deployment/production-lab/VueProductionDeploymentLab.vue</span>
  </div>

```vue
<script setup lang="ts">
import BuildArtifactPanel from "./BuildArtifactPanel.vue";
import ProductionReadinessPanel from "./ProductionReadinessPanel.vue";
</script>

<template>
  <section aria-labelledby="production-lab-title">
    <h2 id="production-lab-title">vue-production-deployment-lab</h2>
    <BuildArtifactPanel />
    <ProductionReadinessPanel />
  </section>
</template>
```

</div>

**逐行解释：** Script imports panels；template names the lab and renders policy/evidence summaries。

**执行过程：** Root shell renders lab; lab displays `UNKNOWN` where no command evidence exists; Node validation supplies real evidence externally。

**source、env、base、chunks、assets、dist、headers、fallback、cache、preview、Docker image、browser request 与 rollback 的变化：** Final lab does not mutate production state; it teaches how each state changes through commands/config。

**为什么得到这个结果：** Browser UI cannot honestly know whether external commands passed unless evidence is generated and read deliberately。

**对比写法：** A dashboard that hardcodes `passed` without command output violates production evidence rules。

**常见错误为什么错：** Treating a policy page as validation hides failed build, missing stats report, or missing Docker runtime。

**与真实项目的关系：** Release dashboards need data ingestion from real CI/build/deploy systems, not static success labels。

**与当前学习主线的关系：** Chapter 11 turns the local learning app into a production-boundary practice project without remote deployment。

**最终记忆模型：** lab shows policy; commands create evidence。

## 10. API / 语法索引

| API / Syntax                  | Layer                  | Input                      | Output               | Runtime Effect                | TypeScript Boundary            |
| ----------------------------- | ---------------------- | -------------------------- | -------------------- | ----------------------------- | ------------------------------ |
| `vue-tsc --noEmit`            | Type gate              | TS/SFC graph               | diagnostics          | none                          | checks types, not runtime data |
| `vite build`                  | Build pipeline         | index, config, source, env | `dist`               | none during build             | config types only              |
| `vite preview`                | Static preview         | existing `dist`            | local HTTP responses | browser loads built app       | no typecheck                   |
| `loadEnv(mode, cwd, "VITE_")` | Vite config            | mode and env files         | string map           | config-time value             | string values                  |
| `base`                        | Vite config            | public path                | asset URL prefix     | browser requests URL          | not deployment validation      |
| `import.meta.env`             | Build-time replacement | `VITE_*` values            | client constants     | browser sees strings          | no secret check                |
| `import()`                    | JavaScript / bundler   | module path                | Promise module       | async chunk request           | module type checked            |
| `createWebHistory()`          | Router / browser       | base path                  | history adapter      | clean URL navigation          | route types only               |
| `try_files`                   | Nginx                  | request URI                | file or fallback     | server response routing       | not checked by TS              |
| `Cache-Control`               | HTTP                   | response path              | cache behavior       | browser/CDN retention         | not checked by TS              |
| `COPY --from=build`           | Docker                 | previous stage artifact    | runtime image files  | container serves copied files | not checked by TS              |
| `app.config.errorHandler`     | Vue runtime            | error handler              | app-level hook       | error capture                 | handler signature checked      |

## 11. 常见错误表

| Wrong code or wrong config                | Error type or observed bug        | Violated rule                         | Why it fails                                    | Correct code or config              | Recognition method                |
| ----------------------------------------- | --------------------------------- | ------------------------------------- | ----------------------------------------------- | ----------------------------------- | --------------------------------- |
| `npm run dev` only                        | deployability unproven            | dev server is not production build    | no dist, no fallback, no cache evidence         | `npm run build`                     | no `dist/index.html` evidence     |
| `npm run preview` before build            | stale or missing preview          | preview serves existing dist          | it does not rebuild source                      | `npm run build && npm run preview`  | preview shows old content         |
| Upload source files                       | static host error                 | host should serve dist                | browser cannot run SFC/TS source as built app   | upload `dist`                       | host contains `src/`              |
| long-cache `index.html`                   | stale entry                       | entry must revalidate                 | old HTML points to old chunks                   | short cache index                   | users stay on old version         |
| no long-cache assets                      | poor caching                      | hashed assets are immutable           | repeated downloads waste transfer               | immutable `/assets/`                | network reloads same hash         |
| wrong `base`                              | asset 404                         | asset URL must match deploy path      | browser requests root path under subpath deploy | set `VITE_PUBLIC_BASE_PATH`         | JS/CSS 404                        |
| Router base omitted                       | navigation mismatch               | Router base should match deploy path  | clean URLs resolve wrong prefix                 | use `BASE_URL`                      | route links wrong                 |
| no server fallback                        | direct refresh 404                | server must serve index               | Router never runs                               | `try_files $uri $uri/ /index.html;` | `/router/dashboard` 404           |
| fallback only, no app 404                 | unknown route blank or wrong page | server fallback is not route matching | app must still resolve unknown path             | catch-all route                     | invalid app URL not handled       |
| secret in `VITE_*`                        | credential leak                   | VITE values are public                | bundle is downloadable                          | keep secret on backend              | token visible in JS               |
| expect env to change after build          | stale config                      | static bundle is fixed                | JS already contains old value                   | rebuild or runtime public config    | changing server env has no effect |
| global heavy dependency import            | large bundle                      | measure dependency contribution       | unused code may enter chunks                    | run build report                    | report shows package area         |
| too many manual chunks                    | request overhead                  | split by feature boundary             | many small files add latency                    | remove unnecessary split            | many tiny assets                  |
| Lighthouse as field proof                 | evidence mismatch                 | lab is not field                      | controlled run ignores many users               | label as lab audit                  | no real-user data                 |
| dev performance comparison                | wrong artifact                    | dev and build differ                  | HMR/source maps/dev checks distort results      | test built app                      | dev and preview differ            |
| skip typecheck/tests                      | unsafe release                    | gates precede build                   | static/runtime defects pass through             | run gate chain                      | missing command logs              |
| claim analysis without report             | fake evidence                     | report must exist                     | no artifact to review                           | `npm run build:analyze`             | no `dist/stats.html`              |
| copy `node_modules` to final image        | bloated image                     | runtime needs dist only               | final image contains build deps                 | multi-stage copy dist               | image inspection large            |
| Docker without fallback                   | refresh 404                       | Nginx config required                 | container serves static files only              | copy `vue-spa.conf`                 | `/router/login` 404               |
| missing `.dockerignore`                   | unsafe build context              | exclude local artifacts/env           | context can include secrets/build output        | add `.dockerignore`                 | docker context too large          |
| no CDN rollback plan                      | mixed cache                       | cache layers need purge/revalidate    | old index/assets mismatch                       | define rollback checklist           | users see blank page              |
| hardcoded production URL                  | inflexible deploy                 | use typed env boundary                | source edit needed per environment              | public env or runtime config        | URL differs by environment        |
| monitoring SDK untested                   | fake observability                | reporting must be verified            | errors may be dropped                           | test error flow                     | no event in dashboard             |
| remote deployment config in local chapter | scope creep                       | Chapter 11 is local boundary          | provider lock-in too early                      | keep notes generic                  | provider files appear             |
| CJK in source code block                  | documentation violation           | code examples must be English-only    | copyable code becomes inconsistent              | English code block                  | CJK scan finds match              |

## 12. 最终小项目

最终小项目 `vue-production-deployment-lab` 只整合本章机制，不替代 9.x 分节教学。

### 12.1 项目目标

项目目标是把 production build map、dist artifact map、env exposure map、base path map、asset pipeline map、code splitting map、bundle analysis map、performance budget map、Web Vitals map、Lighthouse map、cache policy map、SPA fallback map、Nginx config map、Docker image map、CDN/static host map、runtime config boundary map、production error handling map、deployment checklist 与 rollback checklist 放到一个可运行的 Chapter 11 页面中。

### 12.2 文件结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-11-production-deployment</span>
  </div>

```txt
ProductionDeploymentChapterApp.vue
production/
performance/
deployment/
scripts/
components/
production-lab/
```

</div>

### 12.3 核心映射

| Map                           | File                                  | Evidence boundary                |
| ----------------------------- | ------------------------------------- | -------------------------------- |
| production build map          | `production/productionBuildModel.ts`  | policy model                     |
| dist artifact map             | `production/distOutputMap.ts`         | checked by `verify:dist`         |
| env exposure map              | `production/envModeModel.ts`          | checked by `verify:env`          |
| base path map                 | `production/basePathModel.ts`         | build config                     |
| asset pipeline map            | `production/assetPipelineModel.ts`    | build artifact                   |
| code splitting map            | `performance/routeLazyLoadingMap.ts`  | Chapter 06 route loaders         |
| bundle analysis map           | `performance/bundleAnalysisModel.ts`  | `dist/stats.html` when generated |
| performance budget map        | `performance/performanceBudget.ts`    | learning budget                  |
| Web Vitals map                | `performance/webVitalsModel.ts`       | metric boundary                  |
| Lighthouse map                | `performance/lighthouseAuditModel.ts` | lab audit boundary               |
| cache policy map              | `production/cachePolicyModel.ts`      | Nginx/CDN/browser headers        |
| SPA fallback map              | `deployment/spa-fallback-notes.md`    | server fallback                  |
| Nginx config map              | `nginx/vue-spa.conf`                  | static server config             |
| Docker image map              | `Dockerfile`                          | multi-stage build                |
| CDN/static host map           | `production/deploymentTargetModel.ts` | provider-neutral model           |
| runtime config boundary map   | `production/runtimeConfigBoundary.ts` | public runtime config only       |
| production error handling map | `performance/preloadErrorPolicy.ts`   | client error policy              |
| deployment checklist          | `production/deploymentChecklist.ts`   | pending until commands run       |
| rollback checklist            | `production/rollbackChecklist.ts`     | release operation notes          |

### 12.4 完整核心代码

Vite config changes:

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">vite.config.ts</span>
  </div>

```ts
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv, type PluginOption } from "vite";

function resolveBasePath(mode: string): string {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return env.VITE_PUBLIC_BASE_PATH ?? "/";
}

function createAnalyzePlugins(mode: string): Array<PluginOption> {
  if (mode !== "analyze") {
    return [];
  }

  return [
    visualizer({
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
    }) as PluginOption,
  ];
}

export default defineConfig(({ mode }) => ({
  base: resolveBasePath(mode),
  plugins: [vue(), ...createAnalyzePlugins(mode)],
  build: {
    reportCompressedSize: true,
    sourcemap: mode === "analyze",
  },
}));
```

</div>

Nginx config:

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">nginx/vue-spa.conf</span>
  </div>

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;

  location = /index.html {
    add_header Cache-Control "no-cache, no-store, must-revalidate" always;
    try_files /index.html =404;
  }

  location /assets/ {
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    try_files $uri =404;
  }

  location / {
    add_header Cache-Control "no-cache" always;
    try_files $uri $uri/ /index.html;
  }
}
```

</div>

Verification script:

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-11-production-deployment/scripts/verifyDistFiles.mjs</span>
  </div>

```js
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const distDirectory = path.join(process.cwd(), "dist");
const indexPath = path.join(distDirectory, "index.html");
const assetsDirectory = path.join(distDirectory, "assets");

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

const indexExists = await pathExists(indexPath);
const assetsExists = await pathExists(assetsDirectory);

if (!indexExists || !assetsExists) {
  process.exitCode = 1;
} else {
  const assetFiles = await readdir(assetsDirectory);
  console.log(JSON.stringify({ indexExists, assetCount: assetFiles.length }));
}
```

</div>

Final lab component:

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-11-production-deployment/production-lab/VueProductionDeploymentLab.vue</span>
  </div>

```vue
<script setup lang="ts">
import BuildArtifactPanel from "./BuildArtifactPanel.vue";
import ProductionReadinessPanel from "./ProductionReadinessPanel.vue";
</script>

<template>
  <section aria-labelledby="production-lab-title">
    <h2 id="production-lab-title">vue-production-deployment-lab</h2>
    <BuildArtifactPanel />
    <ProductionReadinessPanel />
  </section>
</template>
```

</div>

### 12.5 运行方式与预期行为

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run dev
npm run build
npm run verify:dist
npm run verify:env
npm run build:analyze
```

</div>

预期行为：`/` 仍显示 Chapters 01–11 的单页学习 shell；Chapter 11 区块显示 production models、checklists 与 final lab；`verify:dist` 只在 build 后能检查真实 `dist`；`verify:env` 扫描 public env boundary；`build:analyze` 生成 `dist/stats.html`。

### 12.6 常见错误与扩展任务

常见错误集中在：未 build 就 preview、缺少 fallback、base path 错误、把 secrets 放进 client env、缓存 entry HTML、伪造 bundle/Lighthouse/Docker 通过结果。扩展任务只能在 deployment boundary 稳定后进行：真实 host 的 fallback syntax、真实 CDN purge policy、真实 monitoring SDK 与 source map 流程、以及更严格的 performance budget threshold。不要在本章生成 Chapter 12、SSR、SSG、PWA、backend 或 remote provider workflow。

## 13. 额外速查表

### 一句话结论

Vue SPA production 的主线是：先用质量 gate 证明 source graph，再用 Vite build 产生 `dist`，再让 static server 正确服务 entry、assets、fallback 和 cache，最后用 rollback plan 管理版本恢复。

### 概念速查

| Concept            | Layer                | One-line rule                                 |
| ------------------ | -------------------- | --------------------------------------------- |
| `npm run dev`      | Vite dev             | 开发期 module server，不证明部署              |
| `npm run build`    | Build gate           | typecheck 后生成 `dist`                       |
| `npm run preview`  | Local static preview | 服务 existing `dist`                          |
| `vite build`       | Bundler              | 生成 production artifact                      |
| `vite preview`     | Preview server       | 不等于 real production host                   |
| `dist`             | Artifact             | static deploy upload unit                     |
| `index.html`       | Entry                | short cache / revalidate                      |
| `assets`           | Static output        | hashed files live here                        |
| hashed asset       | Cache                | can be immutable                              |
| `base`             | URL config           | controls generated asset URLs                 |
| `import.meta.env`  | Build-time env       | replaced during build                         |
| `VITE_*`           | Public env           | exposed to client                             |
| `.env`             | Env file             | shared env source                             |
| `.env.local`       | Env file             | local override, do not commit secrets         |
| `.env.production`  | Env file             | production mode input                         |
| `mode`             | Vite command context | selects env file set                          |
| public directory   | Asset source         | copied to output root                         |
| imported asset     | Asset source         | enters graph and may get hash                 |
| dynamic import     | JS syntax            | creates async module boundary                 |
| route lazy loading | Router / bundler     | creates route chunks                          |
| chunk              | Build output         | JS/CSS file segment                           |
| manual chunk       | Build config         | advanced split control                        |
| tree-shaking       | Build optimization   | removes unused ESM branches                   |
| bundle analysis    | Build review         | reads output graph                            |
| performance budget | Review threshold     | local failure signal                          |
| LCP                | Web Vital            | loading performance                           |
| INP                | Web Vital            | interaction responsiveness                    |
| CLS                | Web Vital            | visual stability                              |
| Lighthouse         | Lab audit            | local or URL quality audit                    |
| lab data           | Measurement          | controlled environment result                 |
| field data         | Measurement          | real-user result                              |
| browser cache      | Client layer         | user agent retention                          |
| CDN cache          | Edge layer           | provider edge retention                       |
| `Cache-Control`    | HTTP header          | controls cache behavior                       |
| immutable asset    | Cache target         | hash URL can long-cache                       |
| SPA fallback       | Server rule          | returns index for app paths                   |
| `try_files`        | Nginx directive      | checks file then fallback                     |
| `createWebHistory` | Router history       | clean URLs need fallback                      |
| app-level 404      | Router route         | handles unknown route after app loads         |
| Nginx              | Static server        | serves dist and headers                       |
| Dockerfile         | Container build      | defines build/runtime stages                  |
| multi-stage build  | Docker pattern       | copies only needed artifacts                  |
| `.dockerignore`    | Docker context       | excludes local/generated files                |
| static hosting     | Deployment target    | serves `dist` files                           |
| rollback           | Release operation    | restore matching artifact set                 |
| runtime config     | Public runtime data  | fetched after build if needed                 |
| client bundle      | Browser code         | public and inspectable                        |
| backend secret     | Server data          | never belongs in static bundle                |
| preload error      | Browser event        | failed dynamic import after deploy            |
| KeepAlive          | Vue runtime          | cache component instances deliberately        |
| Teleport           | Vue runtime / DOM    | render overlay DOM outside component location |
| Transition         | Vue runtime / CSS    | coordinate enter and leave motion             |
| virtual list       | Rendering strategy   | render visible rows instead of every item     |
| image optimization | Asset strategy       | reduce bytes and layout shift                 |
| accessibility      | UX quality           | verify keyboard and semantic behavior         |
| CSP                | Security header      | only add after testing app compatibility      |

### 最小模板

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
npm run test:unit
npm run build
npm run verify:dist
```

</div>

## 14. 最终文件清单

| Path                                                                                   | Role                                            | Status  |
| -------------------------------------------------------------------------------------- | ----------------------------------------------- | ------- |
| `docs/vue/chapter-11-production-deployment/vue-chapter-11-learning-guide.md`           | 完整学习指南                                    | created |
| `src/learning/vue/chapter-11-production-deployment/ProductionDeploymentChapterApp.vue` | Chapter 11 shell entry                          | created |
| `src/learning/vue/chapter-11-production-deployment/production/*.ts`                    | production typed models and checklists          | created |
| `src/learning/vue/chapter-11-production-deployment/performance/*.ts`                   | performance typed models                        | created |
| `src/learning/vue/chapter-11-production-deployment/components/*.vue`                   | teaching panels                                 | created |
| `src/learning/vue/chapter-11-production-deployment/production-lab/*.vue`               | final lab panels                                | created |
| `src/learning/vue/chapter-11-production-deployment/deployment/*.md`                    | static hosting, CDN, fallback and preview notes | created |
| `src/learning/vue/chapter-11-production-deployment/deployment/nginx.conf`              | chapter-local Nginx reference                   | created |
| `src/learning/vue/chapter-11-production-deployment/scripts/*.mjs`                      | Node verification scripts                       | created |
| `src/learning/vue/chapter-01-application-boundary/App.vue`                             | single-page shell integration                   | updated |
| `vite.config.ts`                                                                       | base and analyze mode config                    | updated |
| `package.json`                                                                         | Chapter 11 scripts and visualizer dependency    | updated |
| `package-lock.json`                                                                    | dependency lockfile                             | updated |
| `.env.example`                                                                         | safe public env example                         | created |
| `.env.production.example`                                                              | safe production env example                     | created |
| `nginx/vue-spa.conf`                                                                   | real Nginx SPA config used by Docker            | created |
| `Dockerfile`                                                                           | local multi-stage static deployment example     | created |
| `.dockerignore`                                                                        | Docker context exclusions                       | created |

## 15. 如何转换成个人笔记

个人笔记建议保留三条主线：第一条是 `dev -> build -> preview -> static host` 的工具边界；第二条是 `index.html -> hashed assets -> cache -> rollback` 的 artifact 边界；第三条是 `createWebHistory -> server fallback -> app-level 404` 的 Router production 边界。已经熟练的文件清单可压缩，只保留失败识别方法和真实命令证据。

## 16. 必须能回答的问题

1. 为什么 `npm run dev` 不证明 production deployable？
2. `npm run build` 读取哪些文件，输出哪些 artifact？
3. `vite preview` 为什么不是 Vite dev server，也不是 production host？
4. `VITE_*` 为什么不能放 secret？
5. `base` 如何影响 asset URL 和 Router base？
6. imported assets 与 `public/` assets 的 cache owner 有什么区别？
7. dynamic import 如何产生 lazy chunk？
8. 为什么过度 code splitting 会变慢？
9. bundle visualizer 能证明什么，不能证明什么？
10. Lighthouse lab data 与 Web Vitals field data 有什么区别？
11. 为什么 `index.html` 不能 aggressive cache？
12. 为什么 hashed assets 可以 long cache？
13. `createWebHistory()` direct refresh 为什么需要 server fallback？
14. server fallback 和 app-level 404 为什么都需要？
15. Nginx `try_files` 在 Vue SPA 中解决什么？
16. Docker final image 为什么不应该包含 source 和 `node_modules`？
17. CDN rollback 为什么需要 cache awareness？
18. runtime config 为什么只能放 public values？
19. preload error 通常说明什么 deployment/cache 问题？
20. Chapter 10 的质量 gate 如何进入 Chapter 11 deployment checklist？

## 17. 最终记忆模型

```txt
source
  -> lint / typecheck / test
  -> vite build with mode and base
  -> dist/index.html and dist/assets
  -> static host or nginx
  -> fallback for clean URLs
  -> browser requests chunks and assets
  -> cache keeps index and hashed assets differently
  -> rollback restores a matching artifact set
```

## 18. 官方文档阅读清单

- [Vue Production Deployment](https://vuejs.org/guide/best-practices/production-deployment.html)
- [Vue Performance](https://vuejs.org/guide/best-practices/performance.html)
- [Vue Security](https://vuejs.org/guide/best-practices/security.html)
- [Vue Router Different History Modes](https://router.vuejs.org/guide/essentials/history-mode.html)
- [Vue Router Lazy Loading Routes](https://router.vuejs.org/guide/advanced/lazy-loading.html)
- [Vite Building for Production](https://vite.dev/guide/build)
- [Vite Deploying a Static Site](https://vite.dev/guide/static-deploy)
- [Vite Env Variables and Modes](https://vite.dev/guide/env-and-mode)
- [Vite Config Shared Options](https://vite.dev/config/shared-options.html)
- [Vite Static Asset Handling](https://vite.dev/guide/assets)
- [Vite Build Options](https://vite.dev/config/build-options)
- [Docker multi-stage builds](https://docs.docker.com/build/building/multi-stage/)
- [Nginx serving static content](https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/)
- [Chrome Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview)
- [Web Vitals](https://web.dev/articles/vitals)
- [rollup-plugin-visualizer package](https://www.npmjs.com/package/rollup-plugin-visualizer)
