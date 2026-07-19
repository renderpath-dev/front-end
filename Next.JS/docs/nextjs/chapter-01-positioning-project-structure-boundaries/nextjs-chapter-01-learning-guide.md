# Next.js 第 1 章：定位、项目结构与运行边界

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
.macos-code-dot-red {
  background: #ff5f57;
}
.macos-code-dot-yellow {
  background: #ffbd2e;
}
.macos-code-dot-green {
  background: #28c840;
}
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
  display: block;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
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
  - [9.1 Next.js 到底是什么：React library、Next.js framework、Vercel platform](#section-9-1)
  - [9.2 create-next-app 创建了什么：不是复制模板那么简单](#section-9-2)
  - [9.3 App Router 项目结构：app、public、src、配置文件分别负责什么](#section-9-3)
  - [9.4 page.tsx 和 layout.tsx 的第一条运行边界](#section-9-4)
  - [9.5 Client Component 与 "use client"：交互代码如何进入 browser bundle](#section-9-5)
  - [9.6 Server-only env 与 NEXT_PUBLIC_：环境变量不是普通全局变量](#section-9-6)
  - [9.7 localStorage、window、document 为什么不能直接写在 Server Component 里](#section-9-7)
  - [9.8 next dev、next build、next start：开发、构建、生产运行不是一回事](#section-9-8)
  - [9.9 Vercel 在第 1 章应该学到什么：平台边界，不是魔法部署按钮](#section-9-9)
  - [9.10 第 1 章整合：execution boundary report 怎么写](#section-9-10)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
- [13. 额外速查表](#13-额外速查表)
- [14. 本章机制复盘与边界审计](#14-本章机制复盘与边界审计)
- [15. 本章调试实验与验证路径](#15-本章调试实验与验证路径)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 真实文件或概念示例 |
|---|---|
| 阅读 App Router 文件约定 | `practices/chapter-01-positioning-project-structure-boundaries/01-project-structure/app-router-file-map.md` |
| 阅读 `next.config.ts` | `practices/chapter-01-positioning-project-structure-boundaries/01-project-structure/next-config-reading.md` |
| 记录项目结构边界 | `practices/chapter-01-positioning-project-structure-boundaries/01-project-structure/project-structure-boundary-notes.md` |
| 服务端读取环境变量 | `practices/chapter-01-positioning-project-structure-boundaries/02-execution-boundary/server-component-env-read.tsx`、`projects/next-boundary-lab/lib/serverEnv.ts` |
| 浏览器 API 的合法位置 | `practices/chapter-01-positioning-project-structure-boundaries/02-execution-boundary/client-component-browser-api.tsx`、`projects/next-boundary-lab/components/ClientStoragePanel.tsx` |
| 识别故意错误 | `practices/chapter-01-positioning-project-structure-boundaries/02-execution-boundary/invalid-localstorage-server.tsx` |
| 区分构建时与请求时 | `practices/chapter-01-positioning-project-structure-boundaries/02-execution-boundary/build-time-vs-request-time.md` |
| 识别 browser bundle 边界 | `practices/chapter-01-positioning-project-structure-boundaries/02-execution-boundary/browser-bundle-boundary.md` |
| 对比三个 Next.js 命令 | `practices/chapter-01-positioning-project-structure-boundaries/03-commands/next-dev-build-start.md` |
| 理解 `package.json` scripts | `practices/chapter-01-positioning-project-structure-boundaries/03-commands/package-scripts.md` |
| 形成开发与生产报告 | `practices/chapter-01-positioning-project-structure-boundaries/03-commands/dev-vs-production-report.md` |
| 请求时 Server Component | `projects/next-boundary-lab/app/page.tsx` |
| 构建时可预渲染页面 | `projects/next-boundary-lab/app/boundary-report/page.tsx` |
| 浏览器 hydration 时间 | `projects/next-boundary-lab/components/HydrationClock.tsx` |
| Node.js Route Handler | `projects/next-boundary-lab/app/api/runtime-check/route.ts` |
| 完整执行边界报告 | `projects/next-boundary-lab/docs/execution-boundary-report.md` |
| 错误的公开秘密变量 | `Snippet: public-secret-mistake` |
| 浏览器 API 修正模式 | `Snippet: browser-api-effect-fix` |

## 0. 文件定位

这是本地 `Next.js + Vercel + modern tooling` 学习路径的第 1 章，对应路线图中的 Phase 1。它建立后续路由、数据获取、缓存、认证和部署章节共同依赖的第一层模型：**一个文件由谁解释、在哪个阶段执行、能访问哪些 API、最终进入哪个产物。**

本章使用两个层级：

- `practices/chapter-01-positioning-project-structure-boundaries/` 保存单点练习与错误辨析。
- `projects/next-boundary-lab/` 把这些机制整合成一个独立、可构建的 App Router 项目。

项目安装版本是 Next.js `16.2.2`，而检索时官方文档标注的最新补丁版本是 `16.2.10`。本章以本地安装文档和 `16.2.2` 可验证行为为兼容基线，同时用当前官方文档校对概念。补丁版本差异不能靠猜测替代验证。

## 1. 本章解决的问题

学习 Next.js 不能从“先在 `page.tsx` 写一个页面”直接开始。这样容易看到页面成功显示，却无法回答：

- 这个组件是在构建时、请求时还是浏览器中执行？
- 为什么同一个 `.tsx` 文件有时能读取 `process.env`，却不能读取 `localStorage`？
- 为什么 `"use client"` 会扩大客户端模块图，但不会把整个应用变成 SPA？
- 为什么 `next dev` 正常不等于生产构建正常？
- 哪一层负责路由、RSC Payload、HTML、hydration 和部署？

本章先训练边界识别，再训练代码书写。每次阅读一个文件，都要回答四个问题：

1. 谁拥有规则：JavaScript、React、Next.js、TypeScript、Web API 还是 Vercel？
2. 何时执行：构建时、请求时、hydration 后还是用户事件时？
3. 在哪里执行：Node.js、Edge runtime 还是浏览器？
4. 输出流向哪里：服务端模块图、RSC Payload、HTML、客户端 bundle、HTTP response 还是部署产物？

## 2. 前置概念

| 前置概念 | 必须理解什么 | 不清楚时会破坏什么 |
|---|---|---|
| React component | 组件是由 props、状态和渲染逻辑组成的 UI 单元 | 会把组件语义误认为 Next.js 文件约定 |
| JSX / TSX | JSX 是 JavaScript 语法扩展；TSX 还接受 TypeScript 类型检查 | 会把 JSX 误认为浏览器原生语法，或把类型误认为运行时代码 |
| JavaScript module | 每个文件有自己的作用域，通过 `import` / `export` 建立依赖图 | 无法理解 `"use client"` 为什么影响静态导入链 |
| `import` / `export` | 静态导入让构建工具分析服务端图与客户端图 | 会把“文件存在”误认为“文件一定进入浏览器” |
| Node.js runtime | 服务端 JavaScript 环境，提供 `process` 等 Node.js 能力 | 会误以为服务端存在 `window`、`document` |
| browser runtime | 浏览器 JavaScript 环境，提供 DOM 与 Web API | 会把浏览器存储误用到 Server Component |
| environment variable | 进程或构建环境提供的字符串配置 | 会泄露秘密，或误判构建后变量是否还能改变 |
| HTTP request / response | 客户端发出请求，服务端根据 URL、方法和输入返回响应 | 无法理解页面请求、Route Handler 与部署入口 |
| build step | 把源模块分析、转换、分图并生成生产产物 | 会把源代码、类型检查与最终 bundle 混为一谈 |
| `package.json` scripts | 脚本只是命令别名，实际调用安装的 CLI | 会误以为 `pnpm build` 是 pnpm 自己实现构建 |

## 3. 学习目标

完成本章后，你必须能够：

- 解释 React library、Next.js framework 与 Vercel platform 的区别。
- 解释为什么 Next.js 是 full-stack React framework。
- 阅读一个新的 App Router 项目结构。
- 解释 `app`、`public`、可选 `src`、`next.config.ts`、`package.json`、`tsconfig.json`、`next-env.d.ts`、`.env.local`。
- 解释为什么 `page.tsx` 默认是 Server Component。
- 解释 `"use client"` 改变了什么，以及没有改变什么。
- 判断哪些代码进入 browser bundle。
- 解释 `NEXT_PUBLIC_` 的公开与构建时内联语义。
- 比较 `next dev`、`next build`、`next start`。
- 解释开发行为为什么不能代表生产行为。
- 创建并运行最小 Next.js App Router 项目。
- 产出可复核的 execution boundary report。

## 4. 推荐学习顺序

1. Next.js 定位。
2. 官方项目创建方式。
3. 项目结构。
4. `app/page.tsx` 与 `app/layout.tsx`。
5. Server Component 默认行为。
6. Client Component 边界。
7. 环境变量。
8. `next dev` / `next build` / `next start`。
9. Vercel 平台关系。
10. 整合项目 `next-boundary-lab`。

顺序不能倒置。先理解边界，才能解释后续代码为什么有效；先构建生产产物，才能讨论平台如何部署该产物。

## 5. 核心术语表

| English term | 中文解释 | 层 | 解决的问题 | 常见混淆 |
|---|---|---|---|---|
| React library | 描述组件、状态与 UI 更新的库 | React runtime | 建立 UI 组合与更新模型 | 误认为 React 自带文件路由和服务器 |
| Next.js framework | 基于 React 的全栈 Web 框架 | Framework | 统一路由、渲染、构建与服务端边界 | 误认为只是 React Router |
| Vercel platform | 构建、部署和运行 Web 应用的平台 | Deployment | 提供部署、预览 URL 与基础设施集成 | 误认为 Next.js 只能运行在 Vercel |
| App Router | 使用 `app/` 与 Server Components 的路由系统 | Next.js convention | 用文件约定组织布局、页面与路由处理器 | 与 Pages Router API 混用 |
| Pages Router | 使用 `pages/` 的受支持旧路由系统 | Next.js convention | 以页面文件和旧数据获取 API 建立路由 | 误认为已被删除 |
| route segment | URL 路径中的一个文件夹层级 | Next.js convention | 用目录表达嵌套路由关系 | 认为任意目录都会公开 URL |
| `page.tsx` | 让路由段成为可访问页面的固定文件 | Next.js convention | 定义路由 UI | 认为它默认是 Client Component |
| `layout.tsx` | 包裹子页面并跨导航复用的固定文件 | Next.js convention | 提供共享 UI 与层级 | 过早加 `"use client"` |
| Server Component | 在服务端执行、实现代码不进入客户端 bundle 的组件 | React + Next.js | 服务端访问数据并减少客户端 JavaScript | 等同于“每次请求 SSR” |
| Client Component | 客户端模块图内可交互的组件 | React module boundary | 使用状态、Effect、事件和浏览器 API | 认为只在浏览器执行初始渲染 |
| `"use client"` | 声明客户端模块入口的 directive | React syntax convention | 划分服务端图与客户端图 | 认为每个子文件都要重复声明 |
| RSC Payload | Server Component 渲染产生的紧凑数据表示 | React server runtime | 描述服务端树与客户端占位关系 | 与 HTML 或客户端 bundle 混为一谈 |
| hydration | React 在既有 HTML 上连接交互 | Browser React runtime | 让预渲染 UI 具备事件和状态 | 认为它是重新生成服务端 HTML |
| browser bundle | 发送给浏览器的 JavaScript 模块产物 | Build tooling | 承载客户端组件与浏览器逻辑 | 认为所有 `.tsx` 都会进入 |
| server runtime | 在服务端执行 JavaScript 的环境 | Node.js / Edge | 处理服务端渲染与请求 | 默认等同于浏览器环境 |
| browser runtime | 页面中执行 JavaScript 的环境 | Browser | 提供 DOM、事件和存储 API | 认为服务器也拥有同名 API |
| build time | 分析、转换并生成生产产物的阶段 | Toolchain | 固化模块图、静态输出与公开变量 | 与请求时混淆 |
| request time | HTTP 请求到达后执行的阶段 | Server runtime | 使用请求相关输入生成响应 | 认为所有页面每次都执行 |
| environment variable | 由进程或平台提供的配置字符串 | Runtime / build | 把配置从源代码分离 | 认为天然私密或可动态更新 |
| `NEXT_PUBLIC_` | 允许变量值进入客户端代码的前缀 | Next.js build | 明确公开客户端配置 | 误认为只是命名风格 |
| `next dev` | Next.js 开发服务器命令 | CLI | HMR、开发诊断与快速反馈 | 当作生产验证 |
| `next build` | Next.js 生产构建命令 | CLI | 生成优化后的生产输出 | 认为 Next.js 16 会自动 lint |
| `next start` | 运行已构建生产产物的命令 | CLI | 本地启动生产服务器 | 未构建就直接运行 |
| Vercel deployment | 在 Vercel 上构建并创建可访问部署 | Platform | 生成部署 URL 和平台运行资源 | 等同于本地 `next start` |

## 6. 底层心智模型

完整链路如下：

1. 开发者编写组件、配置与固定文件名。
2. 包管理器根据 `package.json` 安装 `next`、`react`、`react-dom`。
3. `next dev` 读取 Next.js 配置并启动开发服务器。
4. 浏览器请求 `/`。
5. App Router 根据文件约定匹配 `app/page.tsx`，并由最近的 `layout.tsx` 包裹。
6. Server Components 在服务端执行，产生 RSC Payload。
7. Next.js 使用渲染结果发送初始 HTML 和 RSC Payload。
8. Client Components 对应的客户端模块图以 JavaScript 发送到浏览器。
9. React hydration 把事件处理器和状态连接到现有 DOM。
10. `next build` 分析服务端与客户端模块图，生成生产输出。
11. `next start` 读取该生产输出并提供生产服务器。
12. Vercel 可以调用同一框架的构建能力，再用平台基础设施创建部署、预览 URL 和运行资源。

必须明确每层所有者：

- React 描述 UI 组件语义、RSC 与 hydration 模型。
- Next.js 决定文件路由、渲染整合、构建和 server/client 边界的框架约定。
- Node.js 执行默认服务端 JavaScript，并提供 `process.env`。
- Browser 执行客户端 JavaScript，并提供 `window`、`document`、`localStorage`。
- TypeScript 在运行前检查类型，但类型会被擦除，不能凭空创建浏览器 API，也不能独自执行运行时隔离。
- Vercel 承载并优化部署，但不是 Next.js 本地运行的前置条件。

一个关键对比是：**Server Component 不等于“每次请求执行”，Client Component 也不等于“初始内容只在浏览器生成”。** 前者可以在构建时或请求时执行；后者可以参与初始 HTML 的预渲染，然后在浏览器 hydration。

## 7. 推荐目录结构

### 7.1 当前学习文档结构

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">docs/nextjs/chapter-01-positioning-project-structure-boundaries</span></div>

```text
docs/nextjs/chapter-01-positioning-project-structure-boundaries/
├── nextjs-chapter-01-learning-guide.md
├── nextjs-chapter-01-cheatsheet.md
├── nextjs-chapter-01-interview-questions.md
└── nextjs-chapter-01-boundary-report-template.md
```
</div>

主指南负责机制与完整代码；速查表负责复习；面试题训练口头证据链；报告模板用于新的项目审计。

### 7.2 Practice 文件结构

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">practices/chapter-01-positioning-project-structure-boundaries</span></div>

```text
practices/chapter-01-positioning-project-structure-boundaries/
├── 01-project-structure/
│   ├── app-router-file-map.md
│   ├── next-config-reading.md
│   └── project-structure-boundary-notes.md
├── 02-execution-boundary/
│   ├── server-component-env-read.tsx
│   ├── client-component-browser-api.tsx
│   ├── invalid-localstorage-server.tsx
│   ├── build-time-vs-request-time.md
│   └── browser-bundle-boundary.md
└── 03-commands/
    ├── next-dev-build-start.md
    ├── package-scripts.md
    └── dev-vs-production-report.md
```
</div>

这些文件用于隔离单个概念。`invalid-localstorage-server.tsx` 是故意保存的错误教材，不应被应用导入。

### 7.3 Mini project 文件结构

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab</span></div>

```text
projects/next-boundary-lab/
├── .env.example
├── .gitignore
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── boundary-report/
│   │   └── page.tsx
│   └── api/
│       └── runtime-check/
│           └── route.ts
├── components/
│   ├── HydrationClock.tsx
│   └── ClientStoragePanel.tsx
├── lib/
│   ├── serverEnv.ts
│   └── boundaryFacts.ts
└── docs/
    └── execution-boundary-report.md
```
</div>

`.next/`、`next-env.d.ts` 和 `*.tsbuildinfo` 是命令生成物，不作为手写教学源文件列入结构。

### 7.4 Concept snippet 结构

概念片段只解释一个规则，不伪装成真实文件。标题必须以 `Snippet:` 或 `Template:` 开头。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: boundary-classification</span></div>

```text
Owner -> Phase -> Runtime -> Available APIs -> Output
React -> render -> server or browser -> component APIs -> UI description
Next.js -> build and request -> server -> framework APIs -> HTML and RSC
Browser -> interaction -> browser -> Web APIs -> DOM updates
```
</div>

## 8. 示例运行方式

### 8.1 创建官方默认项目

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">PowerShell — create project</span></div>

```powershell
pnpm create next-app@latest next-boundary-lab
cd next-boundary-lab
```
</div>

`create-next-app` 创建目录、询问或应用选项、写入项目文件并安装依赖。它证明脚手架能够初始化项目，不证明你的业务代码能够构建。

本仓库已经把整合项目放在 `projects/next-boundary-lab/`，不要再次在该目录内嵌创建同名项目。

### 8.2 开发运行

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">PowerShell — development server</span></div>

```powershell
cd projects/next-boundary-lab
pnpm install
pnpm dev
```
</div>

`pnpm dev` 调用 `next dev`，提供 HMR 与开发错误报告。它证明开发服务器能够编译并响应，不证明生产输出有效。

### 8.3 生产构建与本地生产服务器

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">PowerShell — production checks</span></div>

```powershell
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```
</div>

- `pnpm lint` 单独执行 ESLint；Next.js 16 的 `next build` 不再自动 lint。
- `pnpm typecheck` 单独执行 TypeScript 检查。
- `pnpm build` 生成生产输出并暴露静态/动态路由决策。
- `pnpm start` 运行已经生成的 `.next` 产物，适合本地 smoke test。

### 8.4 可选 Vercel 入门命令

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">PowerShell — optional Vercel workflow</span></div>

```powershell
vercel pull
vercel dev
vercel build
```
</div>

- `vercel pull` 把远程项目设置和环境变量写入本地 `.vercel` 工作区。
- `vercel dev` 在本地模拟 Vercel 部署环境；对纯 Next.js 开发，通常先使用原生 `next dev`。
- `vercel build` 在本地或 CI 生成 Vercel Build Output，通常先执行 `vercel pull`。

本章不执行登录、关联远程项目或部署，因此这些平台命令的本地结果标记为 `UNKNOWN`。它们不能替代 `next build` 对框架本身的验证。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Next.js 到底是什么：React library、Next.js framework、Vercel platform

**结论**

React 提供 UI 组件模型；Next.js 把 React 放进一套全栈框架约定；Vercel 提供可以构建、托管和优化 Next.js 的部署平台。三者协作，但不是同一个产品层。

**本节解决的问题**

看到一个页面成功显示时，学习者常把组件、路由、服务器和部署全部归因于 React，或者把 Next.js 与 Vercel 视为绑定关系。本节建立所有权分类。

**技术意义**

所有权判断决定你应该查哪份文档、在哪一层排错。例如 `useState` 查 React，`page.tsx` 查 Next.js，Preview URL 查 Vercel。

**概念解释**

| 对比项 | React library | Next.js framework | Vercel platform |
|---|---|---|---|
| 核心职责 | 组件、props、state、render | 路由、渲染整合、构建、服务端能力 | 构建基础设施、部署、预览 URL、平台服务 |
| 典型 API 或约定 | `useState`、JSX | `app/`、`page.tsx`、`route.ts`、`next build` | `vercel`、Preview、Production deployment |
| 本地能否独立学习 | 可以，但需自行选择工具 | 可以，不要求 Vercel | 需要项目和平台上下文 |
| 是否等于路由库 | 否 | 否，路由只是能力之一 | 否 |
| 是否要求部署到 Vercel | 不适用 | 否，可自托管 | 它本身就是一个部署选择 |

**边界：语法、JavaScript 运行时、React 运行时、Next.js 框架约定、Server runtime、Browser runtime、Web API、TypeScript 类型系统与工具链**

- 语法层识别 JSX、module 和 directive。
- JavaScript runtime 执行生成后的 JavaScript。
- React runtime 解释组件与 hydration。
- Next.js 约定把文件映射为路由并切分 server/client graph。
- Server runtime 处理服务端渲染和 Route Handler。
- Browser runtime 执行客户端图。
- Web API 提供 `Request`、`Response`、DOM 和 storage。
- TypeScript 检查类型；构建工具再转换和打包。

**底层机制**

Next.js 依赖 React 渲染模型，同时在构建阶段扫描固定文件约定和静态模块依赖。部署到 Vercel 时，平台调用框架构建并把产物映射到平台运行资源；自托管时则由自己的 Node.js Server、容器或其他受支持目标运行。

**机制证据链：** `package.json` 声明三个独立包 → JSX 由 React 语义解释 → `app/page.tsx` 由 Next.js 文件约定发现 → `next build` 生成框架产物 → Vercel 或自托管环境运行该产物。

**API / 语法规则**

React 组件是函数或其他受支持组件形式；Next.js App Router 依赖 `app` 中的固定文件；Vercel CLI 是独立平台工具，不是 `next` CLI 的子命令。

**固定文件名 / 固定方法名 / 参数签名**

- React：`useState(initialState)`。
- Next.js：`app/page.tsx`、`app/layout.tsx`、`app/**/route.ts`。
- Vercel：`vercel dev`、`vercel pull`、`vercel build`。

**文件结构**

真实整合项目把 React 组件放在 `components/`，Next.js 路由约定放在 `app/`，部署平台配置不在本章创建。

**示例代码**

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: ownership-map</span></div>

```tsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button type="button" onClick={() => setCount((current) => current + 1)}>
      Count: {count}
    </button>
  );
}
```
</div>

**逐行解释**

1. `import` 从 React 包取得 Hook，证明状态语义属于 React。
2. `Counter` 是普通导出组件，并不自动成为 URL。
3. `useState(0)` 创建组件状态引用与更新函数。
4. `button` 的事件要求该组件位于 Client Component 模块图；这是 Next.js 项目中的边界要求。
5. Vercel 不参与组件语义，只可能在部署后托管其产物。

**运行方式**

该片段不能独立运行。把它放进一个顶部带 `"use client"` 的真实 Client Component，再由 `page.tsx` 导入。真实对应实现见 `projects/next-boundary-lab/components/ClientStoragePanel.tsx` 的状态与事件模式。

**预期输出**

浏览器显示 `Count: 0`；每次点击后数字加一。

**执行过程**

Next.js 构建客户端模块图 → 服务端产生初始 HTML → 浏览器下载该组件 JavaScript → React hydration 绑定 `onClick` → 点击调用 state updater → React 重新渲染该组件。

**变量与引用变化**

初次 `count` 为 `0`。点击时 updater 接收当前值并返回新数值；`setCount` 函数引用保持稳定，组件下一次 render 读取新状态。

**为什么会得到这个结果**

数值变化来自 React 状态队列，不是 Next.js 路由，也不是 Vercel 平台。Next.js 的职责是让这段交互代码进入正确客户端图。

**对比情况**

普通 React SPA 也能运行该组件，但路由、服务器和构建策略要由其他工具组合；Next.js 已提供这些框架决策。使用 React Router 只解决客户端路由的一部分，不会自动提供 Server Components、Route Handlers 和 Next.js 构建产物。

**常见错误为什么错**

“Next.js 就是 React Router”违反能力层级判断。识别方式是检查问题是否涉及服务端执行、构建输出或固定服务端文件；这些不是单一客户端路由库能解释的。

**与真实项目的关系**

真实项目应把 UI 状态问题定位到 React，把路由和执行边界问题定位到 Next.js，把远程部署问题定位到平台。

**与当前学习路径的关系**

这是后续所有章节的总分类器。没有它，缓存、认证和部署错误会被混在同一层处理。

**最终记忆模型**

`React UI semantics + Next.js framework decisions + deployment target`，三层相连但各自拥有不同规则。

<a id="section-9-2"></a>

### 9.2 create-next-app 创建了什么：不是复制模板那么简单

**结论**

`create-next-app` 不只是复制一组源文件。它根据选择生成项目配置、写入依赖和 scripts，并通过包管理器安装可执行的 Next.js、React 与工具链。

**本节解决的问题**

解释为什么新目录能立即运行 `pnpm dev`，以及 `package.json`、`next-env.d.ts`、TypeScript 配置分别来自哪里。

**技术意义**

理解初始化链后，依赖安装失败、CLI 找不到、版本不一致和生成文件缺失都能被分层定位。

**概念解释**

- `next` 包提供框架和 `next` CLI。
- `react` 提供组件运行时。
- `react-dom` 连接 React 与 DOM/服务端渲染。
- `package.json` scripts 把短命令映射到本地 CLI。
- `tsconfig.json` 配置 TypeScript checker。
- `next-env.d.ts` 由 Next.js 生成，连接框架类型，不应手改。

**边界：语法、JavaScript 运行时、React 运行时、Next.js 框架约定、Server runtime、Browser runtime、Web API、TypeScript 类型系统与工具链**

`create-next-app` 属于初始化工具链；包管理器负责解析和安装包；`next dev` 之后才建立框架 server；浏览器此时尚未参与。TypeScript 文件是输入，生成后的 JavaScript 才在 runtime 执行。

**底层机制**

`pnpm create` 下载或调用指定 create 包的可执行入口。CLI 收集选项，写入目录与配置，创建 `package.json`，再触发依赖安装。本地 script 执行时，pnpm 从项目依赖解析 `next` 二进制。

**机制证据链：** 创建命令 → 生成 `package.json` → 依赖目录包含 `next`、`react`、`react-dom` → `scripts.dev` 解析到本地 `next dev` → 开发服务器读取 `app/`。

**API / 语法规则**

官方快捷命令是 `pnpm create next-app@latest <project-name>`。官方当前安装文档要求 Node.js 至少 `20.9`。

**固定文件名 / 固定方法名 / 参数签名**

- `package.json`
- `tsconfig.json`
- `next-env.d.ts`
- `next.config.ts`
- `scripts.dev = "next dev"`
- `scripts.build = "next build"`
- `scripts.start = "next start"`

**文件结构**

默认具体文件受 CLI 选择影响，但 App Router TypeScript 项目至少会有依赖清单、配置、`app/` 与根布局/页面。本章真实项目另外显式保留 lint 与 typecheck scripts。

**示例代码**

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">PowerShell — initialize an App Router project</span></div>

```powershell
pnpm create next-app@latest next-boundary-lab
cd next-boundary-lab
pnpm dev
```
</div>

**逐行解释**

1. 第一行让 pnpm 调用当前 `create-next-app`，目标目录名作为参数传入。
2. CLI 根据交互选项或默认值创建文件并安装依赖。
3. 第二行只改变 shell 当前目录，不执行框架代码。
4. 第三行解析 `package.json` 的 `dev` script，再调用本地 `next dev`。

**运行方式**

在一个不包含同名目录的父目录运行。当前仓库已存在 `projects/next-boundary-lab/`，不要在仓库根重复执行创建命令。

**预期输出**

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Expected structure</span></div>

```text
next-boundary-lab/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── next.config.ts
├── package.json
└── tsconfig.json
```
</div>

具体样式、linter 和 `src/` 文件取决于选项；不要把示意树当作所有版本固定输出。

**执行过程**

shell 解析命令 → pnpm 获取 create package → CLI 写文件 → pnpm 安装依赖 → script 查找本地 `next` → Next.js 启动开发 server。

**变量与引用变化**

项目名从命令参数进入 CLI；选择项转化为配置与依赖集合；lockfile 固定解析出的实际版本；`next-env.d.ts` 在 Next.js 命令运行后生成。

**为什么会得到这个结果**

目录可运行是“生成文件 + 安装依赖 + script 映射”共同结果，不是复制 `page.tsx` 单独完成。

**对比情况**

只手工复制 `app/page.tsx` 而没有 `next` 依赖和 script，`pnpm dev` 无法解析框架 CLI。只全局安装 `next` 又会导致版本与项目清单脱节。

**常见错误为什么错**

手工编辑 `next-env.d.ts` 会修改生成物，下一次命令可能覆盖。识别方式是文件头的 generated 提示与 Next.js TypeScript 文档；应改 `tsconfig.json` 或自己的声明文件。

**与真实项目的关系**

CI、同事机器和部署平台都依赖 `package.json` 与 lockfile 重建相同工具链，不能依赖本机全局包。

**与当前学习路径的关系**

后续所有命令分析都以“script → 本地 CLI → 框架阶段”这条链为基础。

**最终记忆模型**

`create-next-app = project generator + dependency declaration + dependency installation + framework-ready conventions`。

<a id="section-9-3"></a>

### 9.3 App Router 项目结构：app、public、src、配置文件分别负责什么

**结论**

目录名只有在 Next.js 明确定义文件约定时才有框架含义。`app/` 建立 App Router 树，`public/` 提供静态文件，`src/` 只是可选源代码容器，配置与环境文件仍位于项目根。

**本节解决的问题**

学会从陌生项目结构判断 Router、公开 URL、配置入口与非路由组织目录。

**技术意义**

文件位置会改变框架如何发现模块。错误位置可能不产生类型错误，却会让路由不存在、环境变量不加载或配置不生效。

**概念解释**

- `app/`：App Router 根。
- `pages/`：Pages Router 根，本章不展开其数据获取 API。
- `public/`：通过根 URL 提供静态资源。
- `src/`：可选容器，可放 `app` 或 `pages`；不改变项目根配置位置。
- `next.config.ts`：构建和 server 配置入口，不是浏览器模块。
- 普通子目录：可组织 components、lib 和私有实现。

**边界：语法、JavaScript 运行时、React 运行时、Next.js 框架约定、Server runtime、Browser runtime、Web API、TypeScript 类型系统与工具链**

目录发现属于 Next.js 构建工具链；文件内 JSX 属于 React；最终匹配路由后才进入 server render；`public` 文件由 HTTP 静态资源层返回，不经过 React 组件执行；TypeScript 不决定 URL。

**底层机制**

Next.js 在构建和开发阶段扫描固定入口。嵌套文件夹表达 route segment，但只有该 segment 出现 `page.tsx` 或 `route.ts`，URL 才公开。其他 colocated 文件不会自动成为路由。

**机制证据链：** 目录名被框架扫描 → 固定文件名激活 segment → 构建路由清单 → 请求 URL 匹配清单 → 页面或 Route Handler 执行。

**API / 语法规则**

`page.tsx` 暴露 UI 路由；`route.ts` 暴露 HTTP handler；同一路由层级不要同时用二者争用相同路径。`src` 与根 `app` 不应同时作为两套 App Router 根。

**固定文件名 / 固定方法名 / 参数签名**

`app`、`pages`、`public`、`src`、`page.tsx`、`layout.tsx`、`loading.tsx`、`error.tsx`、`not-found.tsx`、`route.ts`、`next.config.ts`、`.env.local`。

**文件结构**

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: route-visibility-map</span></div>

```text
app/
├── page.tsx
├── dashboard/
│   ├── helper.ts
│   └── page.tsx
├── internal/
│   └── helper.ts
└── api/
    └── health/
        └── route.ts
```
</div>

该结构公开 `/`、`/dashboard` 和 `/api/health`；`/internal` 不公开，因为没有 `page.tsx` 或 `route.ts`。

**示例代码**

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: route-handler</span></div>

```ts
export function GET() {
  return Response.json({ status: "ok" });
}
```
</div>

**逐行解释**

1. 导出的函数名 `GET` 对应 HTTP GET 方法，这是 Next.js Route Handler 固定约定。
2. 函数没有 React JSX，因为它返回 HTTP `Response`。
3. `Response.json` 属于 Web Response API，生成 JSON response。

**运行方式**

把片段放入 `app/api/health/route.ts`，启动开发 server 后访问 `/api/health`。本章真实实现位于 `projects/next-boundary-lab/app/api/runtime-check/route.ts`。

**预期输出**

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">GET /api/health</span></div>

```json
{
  "status": "ok"
}
```
</div>

**执行过程**

构建工具发现 `route.ts` → 注册 GET handler → 请求匹配 `/api/health` → server runtime 调用 `GET` → Web API 构造 response → 浏览器接收 JSON。

**变量与引用变化**

该最小示例无可变状态。每次请求创建新的 object literal 和 `Response` 实例；它们不会在浏览器组件状态中持久化。

**为什么会得到这个结果**

URL 来自目录 segment 与 `route.ts` 固定文件名，HTTP 方法来自导出函数名，而不是文件里是否包含某个普通函数。

**对比情况**

若文件改名为 `handler.ts`，它仍可被其他 server module 导入，但不会自行公开路由。若只创建 `app/api/health/` 空目录，也不会公开 URL。

**常见错误为什么错**

把 `.env.local` 放进 `src/` 违反环境文件从项目根加载的约定。识别方式是看到应用使用 `src/app` 后机械地把所有文件都移进 `src`；配置、`public` 和环境文件仍属于项目根。

**与真实项目的关系**

大型项目常在 route segment 内 colocate 私有组件和 helper。判断公开面时看固定文件，不要把目录树所有文件都当 endpoint。

**与当前学习路径的关系**

本节是后续 layouts、dynamic routes、Route Handlers 和 metadata 的目录基础。

**最终记忆模型**

`folder expresses segment; special file activates behavior; ordinary file only organizes implementation`。

<a id="section-9-4"></a>

### 9.4 page.tsx 和 layout.tsx 的第一条运行边界

**结论**

App Router 的 `page.tsx` 与 `layout.tsx` 默认是 Server Components。`layout.tsx` 包裹子树，`page.tsx` 让 route segment 成为可访问 UI；默认执行环境不提供浏览器 DOM API。

**本节解决的问题**

解释“能在浏览器看到页面”为什么不代表页面组件实现是在浏览器执行。

**技术意义**

Server Component 可以在 server 读取数据和非公开环境变量，同时减少发送到浏览器的组件 JavaScript。错误使用浏览器 API 会在 server render 失败。

**概念解释**

根布局是整个 App Router 树的必需外壳，必须包含 `<html>` 与 `<body>`。页面是某个 URL 的 UI 入口。二者可在构建时或请求时执行；“Server”描述环境，不自动描述具体时间。

**边界：语法、JavaScript 运行时、React 运行时、Next.js 框架约定、Server runtime、Browser runtime、Web API、TypeScript 类型系统与工具链**

TSX 语法经工具链转换；Next.js 固定文件约定发现页面；React server runtime 执行组件；Node.js 提供 `process.env`；浏览器只接收 HTML、RSC 数据和需要的客户端模块，不接收 Server Component 实现。

**底层机制**

Next.js 为 App Router 构建 React Server Component 树。Server Component 执行后，RSC Payload 描述结果和客户端组件引用；Next.js 再用它生成初始 HTML。页面若调用 `connection()`，渲染等待真实请求，因此从可静态预渲染转为请求时工作。

**机制证据链：** `app/page.tsx` 无 `"use client"` → 被归入 server graph → `connection()` 声明请求时依赖 → server 创建时间和环境状态 → RSC/HTML 只传递安全结果 → 浏览器看见文本而不获得 secret。

**API / 语法规则**

组件可以是 `async function`。`connection()` 来自 `next/server`，用于等待传入请求；非公开环境变量通过 server 的 `process.env` 读取。

**固定文件名 / 固定方法名 / 参数签名**

- `app/layout.tsx`
- `app/page.tsx`
- `connection(): Promise<void>`
- `process.env.VARIABLE_NAME`

**文件结构**

真实示例使用 `projects/next-boundary-lab/app/layout.tsx`、`projects/next-boundary-lab/app/page.tsx` 和 `projects/next-boundary-lab/lib/serverEnv.ts`。

**示例代码**

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">practices/chapter-01-positioning-project-structure-boundaries/02-execution-boundary/server-component-env-read.tsx</span></div>

```tsx
type ServerEnvironmentStatus = {
  variableName: "CHAPTER_ONE_SERVER_SECRET";
  isConfigured: boolean;
};

export default function ServerEnvironmentExample() {
  const secret = process.env.CHAPTER_ONE_SERVER_SECRET;
  const status: ServerEnvironmentStatus = {
    variableName: "CHAPTER_ONE_SERVER_SECRET",
    isConfigured: Boolean(secret),
  };

  return (
    <section>
      <h2>Server environment</h2>
      <p>
        {status.variableName}: {status.isConfigured ? "configured" : "missing"}
      </p>
    </section>
  );
}
```
</div>

**逐行解释**

1. 类型只描述安全返回对象，不包含 secret 字段。
2. 组件没有 `"use client"`，放在 App Router 时默认进入 server graph。
3. `process.env` 从 server process 读取字符串或 `undefined`。
4. `Boolean(secret)` 只保留“是否存在”，丢弃真实值。
5. JSX 把安全状态渲染为文本。
6. return 中没有把 `secret` 插值，因此不会经 RSC 或 HTML 泄露。

**运行方式**

该 practice 文件用于阅读，不由根应用导入。可运行的等价机制已集成到 `projects/next-boundary-lab/app/page.tsx`；在 mini project 目录执行 `pnpm dev` 后访问 `/`。

**预期输出**

未配置变量时页面显示 `CHAPTER_ONE_SERVER_SECRET: not configured`；配置非空值后显示 `configured`，不会显示变量原值。

**执行过程**

server 开始组件 render → 查找环境变量 → 创建局部 `status` object → React 生成 server render 结果 → Next.js 写入 RSC/HTML → 浏览器显示派生状态。

**变量与引用变化**

`secret` 在一次 render 中固定为字符串或 `undefined`；`status` 是本次调用创建的新对象；渲染结束后没有客户端 state 保存这两个引用。

**为什么会得到这个结果**

环境变量存在于 server process，而组件在 server graph 中执行。返回树只引用布尔派生值，所以秘密不会随序列化边界传出。

**对比情况**

如果把 `secret` 直接放入 JSX，代码仍可能运行，但违反秘密边界；如果读取 `localStorage`，server runtime 找不到该浏览器 API，执行会失败。

**常见错误为什么错**

“页面显示在浏览器，所以 `page.tsx` 在浏览器运行”混淆结果和执行位置。识别方法是检查 `"use client"` 边界、模块依赖和构建输出，而不是看 UI 最终出现在哪里。

**与真实项目的关系**

数据库凭据、私有 token 与 server-only SDK 都应留在 server graph，只把最小安全结果传给客户端。

**与当前学习路径的关系**

这是学习数据访问、认证和 Server Actions 前最重要的安全边界。

**最终记忆模型**

`Server Component implementation stays on the server; rendered result crosses the boundary`。

<a id="section-9-5"></a>

### 9.5 Client Component 与 "use client"：交互代码如何进入 browser bundle

**结论**

`"use client"` 在模块顶部定义客户端模块图入口。该文件及其静态依赖可进入 browser bundle，从而使用 state、Effect、事件和浏览器 API；它不要求把整个页面或根布局都变成 Client Component。

**本节解决的问题**

解释交互代码如何从 Server Component 树进入浏览器，以及为什么边界应尽量靠近交互叶子。

**技术意义**

边界位置影响发送到浏览器的 JavaScript、可用 API、props 序列化和 server-only 依赖安全。

**概念解释**

directive 作用于模块边界，而不是 JSX 标签本身。Server Component 可以导入并渲染 Client Component；跨边界 props 必须可序列化。客户端组件可被预渲染出初始 HTML，再在浏览器 hydration，不等于纯客户端首次渲染。

**边界：语法、JavaScript 运行时、React 运行时、Next.js 框架约定、Server runtime、Browser runtime、Web API、TypeScript 类型系统与工具链**

directive 是模块级语法约定；构建工具从它开始建立 client graph；React server render 记录客户端引用；浏览器加载图后 hydration；TypeScript 只检查 props 和 API 类型，不决定模块是否真的只在浏览器执行。

**底层机制**

静态 `import` 构成模块图。当入口带 `"use client"`，其依赖被纳入客户端边界分析。server render 通过 RSC Payload 引用组件类型与可序列化 props，浏览器再用下载的模块实现恢复交互。

**机制证据链：** 顶部 directive → client graph 建立 →初始 state 参与预渲染 → HTML 先显示等待文本 → 浏览器下载模块 → `hydrateRoot` 连接树 → `useEffect` 调度时间更新。

**API / 语法规则**

`"use client"` 必须位于 imports 前。`useState(initialState)` 返回当前 state 与 setter。`useEffect(setup, dependencies)` 在客户端 commit 后运行 setup，并可返回 cleanup。

**固定文件名 / 固定方法名 / 参数签名**

文件名可自定义；固定的是 directive 与 Hook 调用规则：

- `"use client"`
- `useState<T>(initialState)`
- `useEffect(setup, dependencies?)`

**文件结构**

真实入口是 `projects/next-boundary-lab/components/HydrationClock.tsx`，由 server 文件 `projects/next-boundary-lab/app/page.tsx` 导入。

**示例代码**

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/components/HydrationClock.tsx</span></div>

```tsx
"use client";

import { useEffect, useState } from "react";

const publicLabel =
  process.env.NEXT_PUBLIC_CHAPTER_ONE_LABEL ?? "Public label not configured";

export function HydrationClock() {
  const [hydratedAt, setHydratedAt] = useState<string | null>(null);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setHydratedAt(new Date().toISOString());
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <section>
      <h2>Browser hydration</h2>
      <p>
        Public build label: <code>{publicLabel}</code>
      </p>
      <p>
        Hydration timestamp:{" "}
        <code>{hydratedAt ?? "Waiting for browser hydration"}</code>
      </p>
    </section>
  );
}
```
</div>

**逐行解释**

1. directive 在 imports 前声明 client entry。
2. imports 引入 React 的 Effect 与 state。
3. `publicLabel` 引用公开变量；构建工具会在 client bundle 中内联其值。
4. 初始 `hydratedAt` 是 `null`，让服务端与客户端首次 render 一致。
5. Effect 只在浏览器 commit 后运行。
6. `window.setTimeout` 明确使用浏览器对象，把更新排到后续 task。
7. setter 写入浏览器当前时间字符串。
8. cleanup 清除未执行 timer。
9. 空依赖数组表示该挂载 Effect 不因组件 state 更新重复调度。
10. JSX 先渲染稳定等待文本，更新后渲染时间。

**运行方式**

在 `projects/next-boundary-lab/` 安装依赖并执行 `pnpm dev`，访问 `/`，观察页面首次内容随后变为 ISO timestamp。

**预期输出**

初始可见文本为 `Waiting for browser hydration`；hydration 后显示类似 `2026-07-02T10:20:30.000Z` 的浏览器生成时间。

**执行过程**

构建识别 client entry → server 用初始 state 预渲染 → HTML/RSC 到达浏览器 → 客户端模块加载 → hydration 对齐初始树 → Effect 注册 timer → setter 更新 state → React commit 新文本。

**变量与引用变化**

模块级 `publicLabel` 在构建产物中固定。第一次 render 的 `hydratedAt` 为 `null`；timer callback 创建新字符串；setter 使下一次 render 读取新 state。`timerId` 只存在于 Effect closure，cleanup 捕获同一 ID。

**为什么会得到这个结果**

Effect 不在 server render 执行，因此时间由真实浏览器阶段创建；初始值一致避免 server HTML 与第一次 client render 不匹配。

**对比情况**

如果在 render 顶层直接调用 `new Date()`，server 和 browser 首次 render 可能得到不同文本并触发 hydration mismatch。如果把根 `layout.tsx` 标为 client，更多静态依赖可能进入 client graph。

**常见错误为什么错**

“只要文件有 `"use client"`，就可以在模块顶层任意读取 `window`”仍然错误，因为模块和组件可能参与 server 预渲染。识别方式是判断访问发生在 render/import 阶段，还是 Effect/事件阶段。

**与真实项目的关系**

搜索框、主题切换、local storage 与 analytics 应成为小型 client islands，数据查询和大部分布局继续留在 server graph。

**与当前学习路径的关系**

本节为表单、交互状态、hydration 错误和性能优化建立模块图基础。

**最终记忆模型**

`"use client" marks a module graph entry; hydration activates it; the smallest interactive subtree should cross the boundary`。

<a id="section-9-6"></a>

### 9.6 Server-only env 与 NEXT_PUBLIC_：环境变量不是普通全局变量

**结论**

Next.js 把 `.env*` 中的值加载进 `process.env`。无 `NEXT_PUBLIC_` 前缀的变量默认只供 server 使用；带此前缀且被客户端代码引用的值会在 `next build` 时内联进 browser JavaScript，因而是公开且构建后固定的。

**本节解决的问题**

区分“值在 server process 中存在”“值进入客户端产物”“值在部署运行时仍可变化”三件不同的事。

**技术意义**

错误分类会直接泄露数据库密码、token 或第三方密钥，也会造成同一构建产物在不同环境晋升后仍使用旧公开配置。

**概念解释**

环境变量本质上是外部配置字符串，不天然私密。私密性来自它是否只在 server graph 读取、是否被返回给客户端以及平台权限。`NEXT_PUBLIC_` 是显式公开契约，不是装饰性命名。

**边界：语法、JavaScript 运行时、React 运行时、Next.js 框架约定、Server runtime、Browser runtime、Web API、TypeScript 类型系统与工具链**

`.env` 加载属于 Next.js 工具链；server 的 `process.env` 属于 Node.js runtime；公开变量替换发生在构建阶段；browser 中没有 Node.js `process.env` 动态查询。TypeScript 通常把变量类型视为 `string | undefined`，不会判断它是不是秘密。

**底层机制**

构建器分析客户端模块中的静态环境变量引用。遇到 `process.env.NEXT_PUBLIC_CHAPTER_ONE_LABEL` 时，将构建环境值替换进产物。之后即使 server process 中同名变量改变，已生成客户端 JavaScript 也不会重新查询。

**机制证据链：** 根目录 `.env.local` → Next.js 加载至 build/server environment → server-only module 运行时读取 private value → client graph 的 `NEXT_PUBLIC_` 引用在 build 替换 → browser bundle 包含公开字面值。

**API / 语法规则**

- 服务端：`process.env.CHAPTER_ONE_SERVER_SECRET`
- 可公开：`process.env.NEXT_PUBLIC_CHAPTER_ONE_LABEL`
- `.env.local` 保留本地真实值且不提交。
- `.env.example` 只记录变量名和安全占位值。
- 即使项目使用 `src/app`，`.env*` 仍位于项目根。

**固定文件名 / 固定方法名 / 参数签名**

`.env`、`.env.local`、`.env.development`、`.env.production`、`.env.example`、`process.env.NAME`、`NEXT_PUBLIC_` 前缀。

**文件结构**

真实项目用 `projects/next-boundary-lab/.env.example` 声明两个变量，用 `projects/next-boundary-lab/lib/serverEnv.ts` 隔离 private read，用 `projects/next-boundary-lab/components/HydrationClock.tsx` 引用 public value。

**示例代码**

正确的 server-only 派生：

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: safe-server-env-status</span></div>

```ts
import "server-only";

export function isServerSecretConfigured() {
  const secret = process.env.CHAPTER_ONE_SERVER_SECRET;
  return typeof secret === "string" && secret.length > 0;
}
```
</div>

故意错误的公开秘密：

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: public-secret-mistake</span></div>

```dotenv
NEXT_PUBLIC_DATABASE_PASSWORD=do-not-use-a-real-secret
```
</div>

**逐行解释**

1. `server-only` 是保护性标记：客户端图误导入该模块时，构建会报告错误。
2. 函数从 server process 读取 private variable。
3. return 只暴露 boolean，不暴露字符串。
4. 错误片段的前缀授权构建器把该值放进客户端产物；名称中写 `PASSWORD` 不会阻止泄露。

**运行方式**

复制 `.env.example` 为本地 `.env.local` 后使用非敏感学习值，重新执行 `pnpm dev` 或 `pnpm build`。不要提交 `.env.local`，不要在输出中打印秘密。

**预期输出**

页面只显示 `configured` 或 `not configured`。Client Component 显示公开 label。源码、RSC、HTML 与 JSON response 都不应包含 server secret 原值。

**执行过程**

Next.js 加载根环境文件 → server module 在 render/request 时读取 private value → 生成 boolean → public reference 在构建客户端图时替换 → browser 运行含固定 label 的 JavaScript。

**变量与引用变化**

`secret` 是单次函数调用的局部字符串引用；boolean 派生后不再携带原值。`NEXT_PUBLIC_` 值从环境输入转为 bundle 字面量，构建完成后与运行时 environment 脱钩。

**为什么会得到这个结果**

私密变量没有跨越序列化或 response 边界；公开变量被构建器有意复制到客户端产物，所以浏览器可见。

**对比情况**

server 运行时变量可以在不同 server 环境提供不同值；已经构建进 browser bundle 的公开变量不能靠 `next start` 时改环境变量来重新写入旧 JavaScript。

**常见错误为什么错**

把 secret 改名为 `NEXT_PUBLIC_SECRET` 违反公开边界；把 `.env.local` 放进 `src/` 违反根目录加载位置；认为 `.gitignore` 等同于“不可能泄露”忽略了响应和日志路径。

**与真实项目的关系**

数据库连接、签名密钥和私有 API token 必须留在 server-only 模块。公开分析 ID、公开站点名等才适合 `NEXT_PUBLIC_`。

**与当前学习路径的关系**

这是认证、数据库、第三方 API 和部署环境章节的安全前置。

**最终记忆模型**

`private env stays in server process; NEXT_PUBLIC_ is copied into the client artifact at build time`。

<a id="section-9-7"></a>

### 9.7 localStorage、window、document 为什么不能直接写在 Server Component 里

**结论**

Server Component 的 JavaScript 运行环境没有浏览器 `Window`、DOM `Document` 或 `localStorage`。TypeScript 能识别这些类型，不代表 Node.js runtime 会创建对应对象。

**本节解决的问题**

解释“编辑器没有报错，但 server render 出现 `ReferenceError`”这一典型跨运行时失败。

**技术意义**

边界错误可能绕过静态类型检查，只在构建预渲染、请求时 render 或生产 server 中出现。必须按 runtime 分类，而不是只按文件扩展名分类。

**概念解释**

`window`、`document` 和 `localStorage` 是浏览器提供的 Web API。`localStorage` 还受 origin、安全设置和存储可用性约束。浏览器 API 应在 Client Component 的浏览器执行阶段读取，通常是 Effect 或事件处理器。

**边界：语法、JavaScript 运行时、React 运行时、Next.js 框架约定、Server runtime、Browser runtime、Web API、TypeScript 类型系统与工具链**

TypeScript `lib.dom.d.ts` 只声明类型；JavaScript runtime 决定全局对象是否存在；React render 可能在 server 执行 Client Component 初始树；Next.js module boundary 决定哪些实现发送浏览器；Web API 只由实际宿主环境提供。

**底层机制**

编译器看到 `localStorage.getItem` 时可验证方法签名，然后擦除类型并输出普通 JavaScript。server 执行到标识符查找时，global environment 中没有 `localStorage` binding，于是抛出 `ReferenceError`。

**机制证据链：** `tsconfig.lib` 包含 DOM 类型 → checker 接受标识符 → 类型被擦除 → 文件进入 server graph → Node.js 执行标识符查找 → binding 不存在 → runtime error。

**API / 语法规则**

- 读取：`window.localStorage.getItem(key)`
- 写入：`window.localStorage.setItem(key, value)`
- DOM：`window.document` 或全局 `document`
- 安全阶段：Client Component 的 `useEffect` 或 event handler。
- storage 操作仍应用 `try` / `catch` 处理不可用情况。

**固定文件名 / 固定方法名 / 参数签名**

没有固定组件文件名；固定的是浏览器 API 签名：

- `Storage.getItem(key: string): string | null`
- `Storage.setItem(key: string, value: string): void`
- `useEffect(setup, dependencies?)`

**文件结构**

故意错误位于 `practices/chapter-01-positioning-project-structure-boundaries/02-execution-boundary/invalid-localstorage-server.tsx`，正确模式位于同目录 `client-component-browser-api.tsx` 和 mini project 的 `components/ClientStoragePanel.tsx`。

**示例代码**

故意错误：

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">practices/chapter-01-positioning-project-structure-boundaries/02-execution-boundary/invalid-localstorage-server.tsx</span></div>

```tsx
export default function InvalidLocalStorageServerExample() {
  const savedValue = localStorage.getItem("chapter-one-note");

  return <p>Saved value: {savedValue ?? "none"}</p>;
}
```
</div>

修正模式：

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: browser-api-effect-fix</span></div>

```tsx
"use client";

import { useEffect, useState } from "react";

export function SavedValue() {
  const [savedValue, setSavedValue] = useState<string | null>(null);

  useEffect(() => {
    setSavedValue(window.localStorage.getItem("chapter-one-note"));
  }, []);

  return <p>Saved value: {savedValue ?? "none"}</p>;
}
```
</div>

**逐行解释**

1. 错误组件无 client directive，因此 App Router 把它放入 server graph。
2. render 立即解析 `localStorage`，server global 中不存在。
3. 修正版先声明 client entry。
4. state 初值 `null` 使 server 预渲染与 client 首次 render 稳定。
5. Effect 在浏览器 commit 后运行。
6. 此时 `window.localStorage` 来自浏览器宿主，可执行读取。
7. setter 保存字符串或 `null` 并触发重新渲染。

**运行方式**

不要把故意错误文件导入应用。运行 mini project 后，在 `/` 的输入框点击 Save 和 Load；真实组件把 storage 访问放在浏览器事件处理器并捕获异常。

**预期输出**

错误组件若进入 server render，典型结果是：

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Server runtime error</span></div>

```text
ReferenceError: localStorage is not defined
```
</div>

修正版首次显示 `none`，Effect 后显示已存值或仍为 `none`。

**执行过程**

错误路径：server render → 标识符解析失败 → 响应生成中断。正确路径：server render 稳定初值 → browser hydration → Effect 或事件 → storage API → state update → DOM 更新。

**变量与引用变化**

错误路径在 `savedValue` 完成初始化前就抛错。正确路径先保存 `null` state；浏览器读取后 setter 写入新字符串引用；组件下一次 render 使用该引用。

**为什么会得到这个结果**

API 是否存在由实际 runtime 决定，不由 TypeScript 声明或 `.tsx` 扩展名决定。

**对比情况**

`typeof window !== "undefined"` 可以避免 server 立即引用，但若它让 server/client 首次 JSX 不一致，仍可能产生 hydration 问题。Effect 或事件通常给出更清晰的阶段边界。

**常见错误为什么错**

只添加 `"use client"` 但仍在模块顶层读取 storage，可能在 server 预渲染或模块评估阶段失败。识别方法是标注访问发生的精确阶段，而不是只看 directive。

**与真实项目的关系**

用户偏好、草稿和浏览器缓存都需要同样处理；SSR 页面必须为首次 render 提供不依赖浏览器的稳定默认值。

**与当前学习路径的关系**

这是理解 hydration mismatch、第三方浏览器库和动态加载的基础。

**最终记忆模型**

`DOM types describe APIs; only the browser host creates them; access them after the browser boundary is active`。

<a id="section-9-8"></a>

### 9.8 next dev、next build、next start：开发、构建、生产运行不是一回事

**结论**

`next dev` 优化反馈速度，`next build` 生成并分析生产输出，`next start` 运行该输出。开发成功只证明开发链路，不证明生产构建、静态预渲染或生产 server 正常。

**本节解决的问题**

建立命令与生命周期的一一对应，避免用 HMR 页面可见性替代生产验证。

**技术意义**

构建阶段会执行模块分析、类型检查、预渲染和优化，可能暴露开发按需访问未触发的错误。生产 server 又有与 dev server 不同的缓存和错误表现。

**概念解释**

`package.json` scripts 是别名。`pnpm build` 解析为项目本地 `next build`。从 Next.js 16 开始，构建不再自动执行 linter，因此 lint、typecheck、build 是三个独立证据。

**边界：语法、JavaScript 运行时、React 运行时、Next.js 框架约定、Server runtime、Browser runtime、Web API、TypeScript 类型系统与工具链**

pnpm 负责 script；Next CLI 负责阶段；TypeScript plugin/checker 参与构建检查；React server renderer 可能在 build 预渲染；Node.js 运行 `next start`；浏览器只验证请求后的 client behavior。

**底层机制**

dev server 按需编译路由并维护 HMR graph。build 扫描全路由与模块图，生成 `.next`，并决定可静态预渲染和动态路由。start 读取 `.next`，不会重新执行完整构建。

**机制证据链：** script name → local Next CLI → dev graph 或 production graph → build 输出 route classification → start 读取输出 → HTTP smoke test 验证生产响应。

**API / 语法规则**

- `next dev [directory]`
- `next build [directory]`
- `next start [directory]`
- `next typegen [directory]`

本地 scripts 可包装这些命令，但不能改变它们的基本阶段。

**固定文件名 / 固定方法名 / 参数签名**

`package.json` 的 `scripts`、构建目录 `.next/`、生成类型 `next-env.d.ts` 和 `.next/types/`。

**文件结构**

命令笔记位于 `practices/chapter-01-positioning-project-structure-boundaries/03-commands/`；mini project 的 scripts 位于 `projects/next-boundary-lab/package.json`。

**示例代码**

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">PowerShell — command boundary practice</span></div>

```powershell
pnpm lint
pnpm typecheck
pnpm dev
pnpm build
pnpm start
```
</div>

**逐行解释**

1. lint 检查规则与可疑模式，不由 Next.js 16 build 代跑。
2. typecheck 显式执行 `tsc --noEmit`。
3. dev 启动开发 server，适合交互调试。
4. build 生成生产 graph 和产物。
5. start 读取 build 产物；必须在成功 build 后执行。

**运行方式**

在 `projects/next-boundary-lab/` 执行。dev 与 start 都是长运行进程，应分别启动，访问页面和 `/api/runtime-check` 后停止，不要同时争用默认端口。

**预期输出**

build 应把 `/boundary-report` 报告为可预渲染，把调用 `connection()` 的 `/` 保持为动态路径；`/api/runtime-check` 在请求时返回新时间。具体符号和日志格式随补丁版本变化，以实际输出为准。

**执行过程**

lint/typecheck 只读源文件 → dev 建立可更新 graph → build 重建生产 graph 并写 `.next` → start 启动 Node.js server → browser 请求生产路由 → server 返回生产响应。

**变量与引用变化**

dev 中模块可因 HMR 替换；build 产生稳定 chunk 和 route metadata；start 读取同一构建目录。`NEXT_PUBLIC_` 值在 build 写入客户端 chunk，start 时不重新替换。

**为什么会得到这个结果**

三个命令优化目标和输入不同。build 看到完整生产图，start 依赖已生成文件，dev 则允许按需重编译。

**对比情况**

dev 中未访问的路由可能从未完整执行；build 会尝试分析或预渲染它。一个错误的 server-side `localStorage` 可能因此在 build 才暴露。

**常见错误为什么错**

“`next build` 成功，所以 lint 通过”在 Next.js 16 中违反工具职责。识别方式是检查 build 日志和独立 `lint` script 是否实际运行。

**与真实项目的关系**

合并前至少把 lint、typecheck、build 分开记录；部署前再用 start 做关键页面与 API 的本地 production smoke test。

**与当前学习路径的关系**

后续缓存、静态生成、动态渲染和部署章节都依赖这个阶段模型。

**最终记忆模型**

`dev proves development feedback; build proves production generation; start proves local production serving; each needs separate evidence`。

<a id="section-9-9"></a>

### 9.9 Vercel 在第 1 章应该学到什么：平台边界，不是魔法部署按钮

**结论**

Vercel 能以零配置方式部署 Next.js，并提供 preview URL 和平台基础设施；但 Next.js 可自托管，本地理解框架也不依赖 Vercel。第 1 章只学习平台边界和三个本地 CLI 命令。

**本节解决的问题**

避免把“框架能否运行”“Vercel 项目是否关联”“部署是否成功”混成一个判断。

**技术意义**

分层后，本地 build 失败先查框架；平台环境变量或部署日志问题再查 Vercel；平台不可用不妨碍本地学习 server/client boundary。

**概念解释**

部署通常经历 source → build → deployment artifact → runtime → URL。Vercel 自动识别 Next.js 并增加平台优化，但这不改变 React Hook 或 App Router 固定文件的所有者。

**边界：语法、JavaScript 运行时、React 运行时、Next.js 框架约定、Server runtime、Browser runtime、Web API、TypeScript 类型系统与工具链**

Vercel CLI 属于平台工具链；它调用 framework build 并准备平台输出。远程 runtime 可以执行 server code；browser 仍下载同类 HTML/RSC/client chunks。TypeScript 与 React 规则不会因部署平台改变。

**底层机制**

`vercel pull` 建立本地项目关联并同步设置；`vercel build` 使用这些设置生成 `.vercel/output`；`vercel dev` 在本地复现平台路由和环境。实际 deployment 再把产物和配置发布到平台资源。

**机制证据链：** 远程 project settings → `vercel pull` 写本地 `.vercel` → `vercel build` 调用 framework build → Build Output 生成 → deployment 创建 URL 与 runtime resources。

**API / 语法规则**

CLI 命令通常要求安装 Vercel CLI；`pull` 和某些操作需要登录及项目关联。本章不授权远程变更，因此只解释，不执行。

**固定文件名 / 固定方法名 / 参数签名**

- `vercel dev`
- `vercel pull`
- `vercel build`
- `.vercel/`
- `.vercel/output/`

**文件结构**

本章 mini project 不创建 `.vercel/`，因为那是本地平台关联状态，不是通用教学源文件，也不应作为可移植项目代码提交。

**示例代码**

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">PowerShell — introductory Vercel commands</span></div>

```powershell
vercel pull
vercel dev
vercel build
```
</div>

**逐行解释**

1. `pull` 获取已关联项目的环境和设置，建立后续本地模拟输入。
2. `dev` 启动平台本地开发环境；普通 Next.js UI 调试通常先用更直接的 `pnpm dev`。
3. `build` 用项目设置在本地或 CI 生成 Vercel-compatible output。

**运行方式**

只有在已安装 CLI、明确允许登录并选择正确远程项目时运行。先在 mini project 用 `pnpm build` 验证框架，再进入平台验证。

**预期输出**

成功 `pull` 会创建或更新本地 `.vercel` 状态；成功 `build` 会生成 `.vercel/output`。本章未执行，实际结果为 `UNKNOWN`。

**执行过程**

CLI 解析本地关联 → 与 Vercel API 获取配置 → 本地进程建立环境 → Next.js framework build 执行 → 平台适配器生成输出。

**变量与引用变化**

远程环境变量被同步为本地平台配置；build 读取其快照；公开变量可能固化进 browser artifact；remote project ID 与本地目录关联，但不应当作业务 source。

**为什么会得到这个结果**

Vercel 负责部署输入和基础设施，Next.js 仍负责框架构建，React 仍负责组件语义。每一层读取自己的配置。

**对比情况**

`next dev` 验证 Next.js 开发 server；`vercel dev` 还模拟平台环境。`next build` 生成 Next.js production output；`vercel build` 生成平台 Build Output。二者证据范围不同。

**常见错误为什么错**

把“Vercel 部署失败”直接解释为“Next.js 不工作”忽略本地 build 证据。反过来，本地 `next build` 成功也不能证明平台账号、环境变量和 deployment 正确。

**与真实项目的关系**

团队应分别保存 framework validation 和 platform deployment evidence，尤其是 preview 与 production 环境变量差异。

**与当前学习路径的关系**

本节只建立平台位置；域名、Functions、缓存、Observability 和 CI/CD 留给部署章节。

**最终记忆模型**

`Next.js creates framework output; Vercel is one platform that builds, deploys, and runs it`。

<a id="section-9-10"></a>

### 9.10 第 1 章整合：execution boundary report 怎么写

**结论**

执行边界报告不是文件介绍，而是可复核的证据表：每个文件在哪里运行、每个值何时创建、每个变量是否跨边界、每条命令证明什么、每个错误属于哪一阶段。

**本节解决的问题**

把零散知识转化为可用于新项目、排错和 code review 的统一方法。

**技术意义**

报告迫使结论绑定文件、runtime、阶段和验证命令，避免“应该在 server”“看起来是静态”等不可验证表述。

**概念解释**

最小报告包含：

1. 文件边界：server、client、Route Handler、config、static asset。
2. 时间边界：build、request、hydration、event、deployment。
3. 值边界：创建位置、序列化方式、公开性、生命周期。
4. 错误边界：TypeScript、lint、build、server runtime、browser console、hydration。
5. 验证证据：命令、退出码、route 输出和 smoke test。

**边界：语法、JavaScript 运行时、React 运行时、Next.js 框架约定、Server runtime、Browser runtime、Web API、TypeScript 类型系统与工具链**

报告必须逐层归属，不能只写“前端”或“后端”。同一文件可经历多个阶段，例如 Client Component 先参与 server 预渲染，再在 browser hydration；报告应把实现模块图和执行时机分开。

**底层机制**

报告以静态依赖图为起点，以真实运行证据为终点。固定文件名决定入口，directive 决定 client graph，动态 API 决定渲染时机，build 输出提供 route classification，请求和浏览器测试验证 runtime。

**机制证据链：** 源文件和 imports → Next.js convention/client directive → build route output → server response → browser behavior → 分类结论与可复现命令。

**API / 语法规则**

状态值只使用 `PASS`、`FAIL`、`UNKNOWN`。没有运行的命令必须是 `UNKNOWN`；失败要区分本次变更、环境缺失和既有问题。

**固定文件名 / 固定方法名 / 参数签名**

本章报告模板：`docs/nextjs/chapter-01-positioning-project-structure-boundaries/nextjs-chapter-01-boundary-report-template.md`。项目实例：`projects/next-boundary-lab/docs/execution-boundary-report.md`。

**文件结构**

报告应与项目代码同版本保存，但不把生成目录、真实 `.env.local` 或平台私有关联文件复制进文档。

**示例代码**

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Template: boundary-report-row</span></div>

```text
File: app/page.tsx
Module graph: server
Execution phase: request
Runtime: Node.js
Input: process.env and incoming request
Output: RSC Payload and HTML
Browser bundle: implementation excluded
Validation: pnpm build and HTTP smoke test
Status: PASS | FAIL | UNKNOWN
```
</div>

**逐行解释**

1. `File` 绑定真实路径。
2. `Module graph` 描述实现属于 server 还是 client graph。
3. `Execution phase` 描述具体时机。
4. `Runtime` 指出宿主环境。
5. `Input` 说明值来源。
6. `Output` 说明跨边界形式。
7. `Browser bundle` 记录是否发送实现。
8. `Validation` 给出复现方法。
9. `Status` 防止把推测写成通过。

**运行方式**

先复制报告模板，再按源码阅读、lint/typecheck/build、production smoke test 的顺序填充。不要先写结论再寻找支持它的代码。

**预期输出**

一份读者无需作者口头补充即可复核的 Markdown：所有重要结论都有路径、阶段、runtime 和命令证据。

**执行过程**

列文件 → 标 module graph → 标时间与 runtime → 追踪值 → 执行最小验证 → 记录退出码和输出 → 分类错误 → 汇总结论与未知项。

**变量与引用变化**

报告追踪的不是只有 mutable variable，还包括值形态变化：server secret 字符串 → boolean → RSC field → browser text；public env 字符串 → build literal → client module constant。

**为什么会得到这个结果**

边界问题本质是值与代码在多个阶段之间流动。显式记录每次转换，就能定位规则被违反的位置。

**对比情况**

“这是前端文件”没有说明 build/server/browser；“测试过了”没有说明命令；“变量安全”没有说明它是否进入 bundle。结构化报告能消除这些歧义。

**常见错误为什么错**

把未执行的 Vercel 命令标 `PASS` 属于证据造假；把 TypeScript 通过当作 runtime 通过混淆 checker 与宿主；把 browser console error 归为 build error 会导致错误修复方向。

**与真实项目的关系**

报告可直接用于新成员 onboarding、架构 review、安全检查和生产问题复盘。

**与当前学习路径的关系**

本章模板会在后续数据、缓存、认证与部署章节持续增加字段，但分类骨架不变。

**最终记忆模型**

`For every file and value: owner -> phase -> runtime -> boundary crossing -> evidence -> status`。

## 10. API / 语法索引

| API、命令或约定 | 所属层 | 最小语义 | 本章位置 |
|---|---|---|---|
| `create-next-app` | 初始化工具链 | 生成项目并安装依赖 | 9.2 |
| `next dev` | Next.js CLI | 启动开发 server | 8、9.8 |
| `next build` | Next.js CLI | 生成生产输出；Next.js 16 不自动 lint | 8、9.8 |
| `next start` | Next.js CLI | 运行已有生产输出 | 8、9.8 |
| `next typegen` | Next.js CLI | 生成路由等框架类型 | 8、9.8 |
| `app/` | Next.js convention | App Router 根目录 | 7、9.3 |
| `public/` | Next.js convention | 从根 URL 提供静态资源 | 9.3 |
| `src/` | Project organization | 可选应用源码容器 | 9.3 |
| `page.tsx` | App Router convention | 公开 route segment 的 UI | 9.3、9.4 |
| `layout.tsx` | App Router convention | 包裹子路由 UI | 9.4 |
| `route.ts` | App Router convention | 定义 HTTP method handlers | 9.3、12 |
| `next.config.ts` | Next.js config | 构建与 server 配置 | 9.3、12 |
| `package.json` scripts | Package manager | 映射本地 CLI 命令 | 9.2、9.8、12 |
| `process.env` | Node.js / build | 读取环境配置 | 9.4、9.6 |
| `.env.local` | Next.js env loading | 本地环境值，位于项目根且不提交 | 9.6 |
| `NEXT_PUBLIC_` | Next.js build | 将引用值公开并在构建时内联 | 9.6 |
| `"use client"` | React module directive | 建立客户端模块图入口 | 9.5 |
| `useState` | React | 保存组件 state | 9.5、9.7 |
| `useEffect` | React | 在客户端 commit 后同步外部系统 | 9.5、9.7 |
| `localStorage` | Browser Web API | 按 origin 持久化字符串 | 9.7 |
| `window` | Browser Web API | 浏览器窗口全局对象 | 9.7 |
| `document` | Browser Web API | 当前 HTML 文档对象 | 9.7 |
| `vercel dev` | Vercel CLI | 本地模拟 Vercel 环境 | 8、9.9 |
| `vercel pull` | Vercel CLI | 同步项目设置和环境 | 8、9.9 |
| `vercel build` | Vercel CLI | 生成 Vercel Build Output | 8、9.9 |

## 11. 常见错误表

| 错误代码或假设 | 错误类型 | 违反的规则 | 修正形式 | 识别方法 |
|---|---|---|---|---|
| “Next.js 只是 React Router” | 概念/架构错误 | Next.js 还拥有 server rendering、RSC、Route Handler、构建与部署适配 | 用 React library、Next.js framework、deployment platform 三层分类 | 问题若涉及 server、build 或固定文件，就不是单一客户端路由问题 |
| “每个 `.tsx` 都在浏览器运行” | Runtime 分类错误 | 扩展名只表示语法，App Router 页面和布局默认是 Server Components | 查 `"use client"` 入口、imports 与 route build 输出 | 页面可见不等于组件实现进入 browser bundle |
| Server Component 中写 `localStorage.getItem("key")` | Server runtime error | Node.js 没有 browser storage API | 移到小型 Client Component 的 Effect 或事件处理器 | TypeScript 可通过，但 build/request 可能报 `ReferenceError` |
| `NEXT_PUBLIC_DATABASE_PASSWORD=...` | 安全与构建错误 | `NEXT_PUBLIC_` 值会进入客户端 JavaScript | 使用 server-only 变量，只返回安全派生结果 | 搜索所有 `NEXT_PUBLIC_` 名称并检查是否可公开 |
| “`next dev` 正常就代表生产正常” | 验证范围错误 | dev 与 build/start 使用不同生命周期和优化 | 单独运行 lint、typecheck、build、start smoke test | 报告是否包含 production build 的退出码 |
| “`next build` 成功，所以 ESLint 通过” | Tooling 证据错误 | Next.js 16 build 不再自动 lint | 保留并运行独立 `eslint .` script | build 日志没有 lint 命令就不能声称 lint PASS |
| 使用 `src/app` 时把 `.env.local` 放到 `src/.env.local` | 配置位置错误 | 环境文件仍从项目根加载 | 把 `.env.local` 放回 `package.json` 同级根目录 | 检查变量为 `undefined` 且文件位于 `src` |
| “TypeScript 会在运行时检查 server/client 边界” | 类型系统错误 | 类型会被擦除，runtime 由宿主提供 | 使用 framework boundary、`server-only` 与实际运行验证 | 查看输出 JavaScript，不会存在 TypeScript 类型检查器 |
| 过早给根 `layout.tsx` 加 `"use client"` | 模块图/性能错误 | client directive 把该入口的静态依赖纳入 client graph | 根布局保留 server，把交互拆到更深 Client Component | 从 directive 向下追踪 imports，观察是否包含大范围静态 UI |

错误不能只记录“怎么改”，还应记录其证据链。例如 `localStorage` 错误的完整分类是：TypeScript 可能 `PASS` → production prerender 或 server request `FAIL` → 浏览器根本还没有机会执行 → 修正后 browser event `PASS`。

## 12. 最终小项目

项目名：`next-boundary-lab`

该项目同时演示：

1. App Router 与根布局。
2. 使用 `connection()` 的请求时 Server Component timestamp。
3. hydration 后生成的浏览器 timestamp。
4. server-only 环境变量安全派生。
5. `NEXT_PUBLIC_` 公开构建值。
6. Node.js Route Handler runtime facts。
7. 事件处理器中的安全 `localStorage` 访问。
8. practice 目录中的故意错误 Server Component。
9. 构建时可预渲染的 `/boundary-report`。
10. 独立 execution boundary report。

以下是该项目所有手写文件的完整代码。生成的 `.next/`、`next-env.d.ts` 和 `*.tsbuildinfo` 不属于手写源文件。

### 12.1 根配置与文档

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/package.json</span></div>

```json
{
  "name": "next-boundary-lab",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=20.9.0"
  },
  "packageManager": "pnpm@11.7.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "16.2.2",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@types/node": "20.19.37",
    "@types/react": "19.2.14",
    "@types/react-dom": "19.2.3",
    "eslint": "9.39.4",
    "eslint-config-next": "16.2.2",
    "typescript": "5.9.3"
  }
}
```
</div>

依赖版本与当前学习仓库已安装版本对齐，使本章代码针对本地 `16.2.2` 验证；`engines` 同时记录官方最低 Node.js `20.9`。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/pnpm-workspace.yaml</span></div>

```yaml
allowBuilds:
  sharp: true
  unrs-resolver: true
```
</div>

pnpm `11.7.0` 默认要求显式批准依赖安装脚本。该 allowlist 只批准当前依赖图中已审阅的 `sharp` 与 `unrs-resolver`，避免使用允许所有脚本的永久配置。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/next.config.ts</span></div>

```ts
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
```
</div>

该配置把嵌套 mini project 明确设为 Turbopack root，避免父学习仓库的 `package-lock.json` 被错误推断为项目边界。`NextConfig` 只在 TypeScript checker 中约束对象，生成 JavaScript 后类型被擦除。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/tsconfig.json</span></div>

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```
</div>

`lib` 包含 DOM 类型，所以 checker 知道 `window`；这正好证明“类型存在”与“server runtime 对象存在”是两件事。`paths` 让 `@/` 指向 mini project 根。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/eslint.config.mjs</span></div>

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([".next/**", "out/**", "next-env.d.ts"]),
]);
```
</div>

lint 配置独立存在，因为 Next.js 16 不在 `next build` 中自动运行 ESLint。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/.gitignore</span></div>

```gitignore
node_modules/
.next/
out/
.env*
!.env.example
*.tsbuildinfo
next-env.d.ts
```
</div>

真实环境文件、安装目录和生成物不提交；`.env.example` 被显式保留。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/.env.example</span></div>

```dotenv
CHAPTER_ONE_SERVER_SECRET=replace-me
NEXT_PUBLIC_CHAPTER_ONE_LABEL=Next Boundary Lab
```
</div>

第一项只能在 server 使用；第二项明确是可公开并在 build 内联的学习 label。两项都只是占位值。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/README.md</span></div>

```md
# Next Boundary Lab

This minimal App Router project supports Chapter 1 of the local Next.js learning path.

## Boundaries demonstrated

- `app/page.tsx` is a Server Component and uses `connection()` for request-time rendering.
- `components/HydrationClock.tsx` creates a timestamp after browser hydration.
- `components/ClientStoragePanel.tsx` accesses `localStorage` only from browser event handlers.
- `lib/serverEnv.ts` reports whether a server-only variable exists without exposing its value.
- `NEXT_PUBLIC_CHAPTER_ONE_LABEL` is read inside a Client Component and becomes part of the browser bundle.
- `app/api/runtime-check/route.ts` returns request-time Node.js runtime facts.
- `app/boundary-report/page.tsx` is eligible for build-time prerendering.

## Commands

Use `pnpm install`, `pnpm dev`, `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm start`.

`pnpm-workspace.yaml` allows install scripts only for the known `sharp` and `unrs-resolver` transitive dependencies.

Copy `.env.example` to `.env.local` only for local learning. Never commit `.env.local`.
```
</div>

### 12.2 App Router 页面与 Route Handler

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/app/layout.tsx</span></div>

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Boundary Lab",
  description: "A Chapter 1 Next.js execution boundary learning project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```
</div>

根布局保持 Server Component。`children` 是 Next.js 传入的当前子路由树；根布局提供必需的 `<html>` 与 `<body>`。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/app/page.tsx</span></div>

```tsx
import Link from "next/link";
import { connection } from "next/server";
import { ClientStoragePanel } from "@/components/ClientStoragePanel";
import { HydrationClock } from "@/components/HydrationClock";
import { getServerEnvironmentStatus } from "@/lib/serverEnv";

export default async function HomePage() {
  await connection();

  const serverRenderedAt = new Date().toISOString();
  const serverEnvironment = getServerEnvironmentStatus();

  return (
    <main>
      <h1>Next Boundary Lab</h1>
      <p>
        This page is a Server Component rendered for the current request.
      </p>

      <section>
        <h2>Server runtime</h2>
        <p>
          Request timestamp: <code>{serverRenderedAt}</code>
        </p>
        <p>
          {serverEnvironment.variableName}:{" "}
          {serverEnvironment.isConfigured ? "configured" : "not configured"}
        </p>
        <p>The secret value is never returned.</p>
      </section>

      <HydrationClock />
      <ClientStoragePanel />

      <nav aria-label="Learning routes">
        <ul>
          <li>
            <Link href="/boundary-report">Boundary report</Link>
          </li>
          <li>
            <a href="/api/runtime-check">Runtime check JSON</a>
          </li>
        </ul>
      </nav>
    </main>
  );
}
```
</div>

`connection()` 让时间戳绑定当前请求；server-only helper 只返回安全状态；两个 Client Components 作为较深的交互边界嵌入页面。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/app/boundary-report/page.tsx</span></div>

```tsx
import Link from "next/link";
import { boundaryFacts, projectFileBoundaries } from "@/lib/boundaryFacts";

export default function BoundaryReportPage() {
  return (
    <main>
      <h1>Execution Boundary Report</h1>
      <p>
        This report is a Server Component with no request-time API, so it is
        eligible for build-time prerendering.
      </p>

      <section>
        <h2>Boundary facts</h2>
        {boundaryFacts.map((fact) => (
          <article key={fact.name}>
            <h3>{fact.name}</h3>
            <p>{fact.explanation}</p>
            <dl>
              <dt>Owner</dt>
              <dd>{fact.owner}</dd>
              <dt>Execution</dt>
              <dd>{fact.execution}</dd>
              <dt>Browser bundle</dt>
              <dd>{fact.browserBundle}</dd>
            </dl>
          </article>
        ))}
      </section>

      <section>
        <h2>Project files</h2>
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Boundary</th>
              <th>Timing</th>
            </tr>
          </thead>
          <tbody>
            {projectFileBoundaries.map((entry) => (
              <tr key={entry.file}>
                <td>
                  <code>{entry.file}</code>
                </td>
                <td>{entry.boundary}</td>
                <td>{entry.timing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Link href="/">Return home</Link>
    </main>
  );
}
```
</div>

该页面不读取 request-time API 或动态数据，因此具备构建时预渲染条件；最终判断由真实 `next build` 输出验证。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/app/api/runtime-check/route.ts</span></div>

```ts
import { getServerEnvironmentStatus } from "@/lib/serverEnv";

export const runtime = "nodejs";

export async function GET() {
  const serverEnvironment = getServerEnvironmentStatus();

  return Response.json({
    runtime: "nodejs",
    hasWindow: typeof window !== "undefined",
    hasDocument: typeof document !== "undefined",
    nodeEnv: process.env.NODE_ENV ?? "unknown",
    serverSecretIsConfigured: serverEnvironment.isConfigured,
    generatedAt: new Date().toISOString(),
  });
}
```
</div>

`runtime` 明确选择 Node.js。`typeof` 检查不会直接引用缺失 binding，因此能安全报告 `false`；response 只包含 secret 配置状态。

### 12.3 Client Components

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/components/HydrationClock.tsx</span></div>

```tsx
"use client";

import { useEffect, useState } from "react";

const publicLabel =
  process.env.NEXT_PUBLIC_CHAPTER_ONE_LABEL ?? "Public label not configured";

export function HydrationClock() {
  const [hydratedAt, setHydratedAt] = useState<string | null>(null);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setHydratedAt(new Date().toISOString());
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <section>
      <h2>Browser hydration</h2>
      <p>
        Public build label: <code>{publicLabel}</code>
      </p>
      <p>
        Hydration timestamp:{" "}
        <code>{hydratedAt ?? "Waiting for browser hydration"}</code>
      </p>
    </section>
  );
}
```
</div>

浏览器时间只在 Effect 中创建；公开 label 在构建时进入客户端产物。初始 `null` 使首次 server/client render 一致。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/components/ClientStoragePanel.tsx</span></div>

```tsx
"use client";

import { useState } from "react";

const storageKey = "next-boundary-lab-note";

export function ClientStoragePanel() {
  const [draft, setDraft] = useState("");
  const [storedValue, setStoredValue] = useState("Not loaded");
  const [status, setStatus] = useState("No browser storage action yet");

  function saveValue() {
    try {
      window.localStorage.setItem(storageKey, draft);
      setStoredValue(draft);
      setStatus("Saved in localStorage");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown storage error";
      setStatus(`Storage unavailable: ${message}`);
    }
  }

  function loadValue() {
    try {
      const value = window.localStorage.getItem(storageKey) ?? "";
      setDraft(value);
      setStoredValue(value || "No value stored");
      setStatus("Loaded from localStorage");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown storage error";
      setStatus(`Storage unavailable: ${message}`);
    }
  }

  return (
    <section>
      <h2>Browser-only storage</h2>
      <label htmlFor="boundary-note">Local note</label>
      <input
        id="boundary-note"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <button type="button" onClick={saveValue}>
        Save
      </button>
      <button type="button" onClick={loadValue}>
        Load
      </button>
      <p>
        Stored value: <code>{storedValue}</code>
      </p>
      <p>{status}</p>
    </section>
  );
}
```
</div>

storage 访问只发生在用户点击后的浏览器事件中。`try` / `catch` 处理浏览器禁止 storage 或其他 Web API 异常；三个 state 分别保存输入、已加载/保存值和操作状态。

### 12.4 Server 与共享数据模块

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/lib/serverEnv.ts</span></div>

```ts
import "server-only";

export type ServerEnvironmentStatus = {
  variableName: "CHAPTER_ONE_SERVER_SECRET";
  isConfigured: boolean;
  exposure: "server-only";
};

export function getServerEnvironmentStatus(): ServerEnvironmentStatus {
  const secret = process.env.CHAPTER_ONE_SERVER_SECRET;

  return {
    variableName: "CHAPTER_ONE_SERVER_SECRET",
    isConfigured: typeof secret === "string" && secret.trim().length > 0,
    exposure: "server-only",
  };
}
```
</div>

返回类型刻意没有 secret 字段。`server-only` 为误入 client graph 增加构建保护，实际安全仍依赖不记录、不返回原值。

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/lib/boundaryFacts.ts</span></div>

```ts
export type BoundaryFact = {
  name: string;
  owner: string;
  execution: string;
  browserBundle: string;
  explanation: string;
};

export type ProjectFileBoundary = {
  file: string;
  boundary: string;
  timing: string;
};

export const boundaryFacts: BoundaryFact[] = [
  {
    name: "Server Component",
    owner: "React architecture integrated by Next.js",
    execution: "Build time or request time on the server",
    browserBundle: "Component implementation is excluded",
    explanation:
      "App Router pages and layouts are Server Components by default.",
  },
  {
    name: "Client Component",
    owner: "React module boundary",
    execution: "Prerendered initially and interactive in the browser",
    browserBundle: "The client module graph is included",
    explanation:
      "The use client directive enables state, effects, event handlers, and browser APIs.",
  },
  {
    name: "Route Handler",
    owner: "Next.js file convention plus Web Response API",
    execution: "HTTP request time in the Node.js runtime",
    browserBundle: "Handler implementation is excluded",
    explanation:
      "A route.ts file handles HTTP methods outside the React page render tree.",
  },
  {
    name: "Public environment variable",
    owner: "Next.js build tooling",
    execution: "Read and inlined during next build",
    browserBundle: "The referenced value is public",
    explanation:
      "NEXT_PUBLIC_ values are frozen into browser JavaScript during the build.",
  },
];

export const projectFileBoundaries: ProjectFileBoundary[] = [
  {
    file: "app/layout.tsx",
    boundary: "Server Component",
    timing: "Build time or request time with its route",
  },
  {
    file: "app/page.tsx",
    boundary: "Server Component",
    timing: "Request time because it calls connection()",
  },
  {
    file: "app/boundary-report/page.tsx",
    boundary: "Server Component",
    timing: "Eligible for build-time prerendering",
  },
  {
    file: "app/api/runtime-check/route.ts",
    boundary: "Node.js Route Handler",
    timing: "Each GET request",
  },
  {
    file: "components/HydrationClock.tsx",
    boundary: "Client Component",
    timing: "Effect runs after browser hydration",
  },
  {
    file: "components/ClientStoragePanel.tsx",
    boundary: "Client Component",
    timing: "Browser event handlers",
  },
  {
    file: "lib/serverEnv.ts",
    boundary: "Server-only module",
    timing: "Imported during server execution",
  },
];
```
</div>

该模块只包含类型和 serializable data，没有 browser API 或 server secret，可以安全供报告页面读取。

### 12.5 项目执行边界报告

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">projects/next-boundary-lab/docs/execution-boundary-report.md</span></div>

```md
# Execution Boundary Report

## Server work

- `app/page.tsx` is a Server Component.
- `connection()` makes the home page wait for an incoming request.
- The server creates `serverRenderedAt` for each request.
- `lib/serverEnv.ts` returns only a boolean configuration status.

## Browser work

- `HydrationClock` creates its timestamp inside `useEffect`.
- `ClientStoragePanel` reads and writes `localStorage` inside event handlers.
- `NEXT_PUBLIC_CHAPTER_ONE_LABEL` is referenced from a Client Component and is public.

## Route Handler work

- `/api/runtime-check` executes in the Node.js runtime.
- It creates a new ISO timestamp for each GET request.
- It returns environment status without returning the secret.

## Build work

- `next build` compiles the server and client module graphs.
- `/boundary-report` is eligible for static prerendering.
- `/` remains dynamic because it calls `connection()`.
- The public label is inlined into browser JavaScript during the build.

## Intentional invalid example

The practice file `practices/chapter-01-positioning-project-structure-boundaries/02-execution-boundary/invalid-localstorage-server.tsx` reads `localStorage` during Server Component rendering. TypeScript can know the DOM type while the server runtime still has no browser `Window` object.

## Production comparison

Run lint and type checking separately because Next.js 16 does not run the linter during `next build`. Compare `pnpm dev` with `pnpm build` followed by `pnpm start`. A local production server validates the framework output but does not validate a Vercel deployment.
```
</div>

### 12.6 小项目执行证据链

1. `app/page.tsx` 调用 `connection()`，所以 server timestamp 属于 request time。
2. `lib/serverEnv.ts` 的 source 与 secret 留在 server graph，只输出 boolean。
3. `HydrationClock` 的初始 state 参与预渲染，Effect timestamp 属于 browser time。
4. `ClientStoragePanel` 只在 browser event 中调用 storage。
5. `app/api/runtime-check/route.ts` 每次 GET 创建新 timestamp。
6. `app/boundary-report/page.tsx` 只读取静态数组，具备 build-time prerender 条件。
7. build 输出负责确认第 1、5、6 项的最终 route classification；浏览器 smoke test 负责确认 hydration 与 storage。

## 13. 额外速查表

更适合高频复习的独立版本位于 `nextjs-chapter-01-cheatsheet.md`。本节保留最短决策表：

| 要判断的内容 | 一句话规则 |
|---|---|
| React vs Next.js vs Vercel | UI 语义 vs 框架决策 vs 部署平台 |
| server vs client | 默认 page/layout 在 server；`"use client"` 建立 client entry |
| build vs request | build 生成和固化产物；request 使用实际请求输入 |
| server runtime vs browser runtime | `process.env`/server SDK vs DOM/storage/event |
| `app` / `public` / `src` / config | 路由约定 / 静态资源 / 可选源码容器 / 项目根配置 |
| `page` / `layout` / `route` | 页面 / 共享外壳 / HTTP handler |
| private env vs `NEXT_PUBLIC_` | 留在 server vs 构建时进入 browser bundle |
| `next dev` / `build` / `start` | 开发反馈 / 生产生成 / 生产服务 |
| 最常见边界错误 | 把结果显示位置误认为代码执行位置 |

## 14. 本章机制复盘与边界审计

本节不统计交付文件，而是重新审计 Chapter 1 中代码和值跨越的边界。文件路径只用于证明 module graph、执行阶段和输出流向。

### 14.1 Chapter 1 机制链复盘

完整链路是：

`source files → package scripts → Next.js CLI → App Router match → Server Component render → RSC Payload → HTML → client bundle → hydration → production build/start → optional Vercel platform boundary`

1. 开发者编写 `app/`、`components/`、`lib/`、config 和环境变量模板。
2. `package.json` scripts 把 `pnpm dev`、`pnpm build`、`pnpm start` 映射到本地 Next.js CLI。
3. App Router 根据 URL 匹配 `page.tsx`、`layout.tsx` 或 `route.ts`。
4. Server Component module graph 在 server runtime 执行；`app/page.tsx` 调用 `connection()` 后等待真实请求。
5. React 产生 Server Component result，Next.js 组织 RSC Payload，并为 initial request 生成 HTML。
6. `"use client"` 入口及其静态依赖形成 client graph，构建器为它们生成 browser JavaScript。
7. Browser 先显示 HTML，再使用 RSC Payload 对齐组件树，并 hydration Client Components。
8. `next build` 生成 production output；`next start` 读取该产物并处理动态请求。
9. Vercel 可以在平台侧构建和部署同一框架，但平台 deployment 不是本地 Next.js 机制成立的前提。

这条链中没有“所有 `.tsx` 都发送给 browser”的阶段。Server Component implementation 留在 server graph；browser 得到的是其渲染结果、RSC data，以及 client references 对应的 JavaScript。

### 14.2 owner / phase / runtime / output 审计

| 对象 | owner | phase | runtime | output | validation signal |
|---|---|---|---|---|---|
| `package.json` scripts | package manager 与 Next.js CLI | command start | Node.js tooling process | dev server、production build 或 production server | script value 与 terminal command 一一对应 |
| `app/page.tsx` | Next.js file convention + React Server Component | request time | Node.js server | RSC result 与 initial HTML | `connection()` 位于 timestamp 之前；当前 `next build` 显示 `ƒ /` |
| `app/boundary-report/page.tsx` | Next.js file convention + React Server Component | build time when eligible | build worker | prerendered RSC/HTML output | 无 request-time API；当前 `next build` 显示 `○ /boundary-report` |
| `components/HydrationClock.tsx` | React Client Component | prerender + hydration | server prerender，之后是 browser | initial HTML、client reference、browser state update | 顶部 `"use client"`；timestamp 在 `useEffect` 中创建 |
| `components/ClientStoragePanel.tsx` | React Client Component + Web Storage API | user event | browser | storage mutation 与 React state update | `localStorage` 只出现在 click handlers 中 |
| `lib/serverEnv.ts` | server module guard + Node.js environment | server render 或 Route Handler request | Node.js server | 只包含配置状态的 object | `import "server-only"`；return object 没有 secret value |
| `app/api/runtime-check/route.ts` | Next.js Route Handler + Web Response API | request time | Node.js server | JSON `Response` | `runtime = "nodejs"`；当前 `next build` 显示 `ƒ /api/runtime-check` |
| Vercel deployment | Vercel platform | deploy | platform build/runtime | deployment artifact、Functions、URL | 本章未执行 platform deployment，状态保持 `UNKNOWN` |

### 14.3 Server graph 与 client graph 审计

| 文件 | 当前 graph | 直接证据 | Browser bundle 影响 |
|---|---|---|---|
| `app/layout.tsx` | server graph | 无 `"use client"`；root layout 是 App Router server entry | component implementation 不进入 client bundle；global CSS 作为样式产物处理 |
| `app/page.tsx` | server graph | 无 `"use client"`；调用 `connection()` 和 server env helper | page implementation 不进入 client bundle；只保留 Client Component references |
| `components/HydrationClock.tsx` | client graph | 第一条语句是 `"use client"`；使用 `useState`、`useEffect`、`window` | 模块及其 client-side transitive imports 进入 browser JavaScript |
| `components/ClientStoragePanel.tsx` | client graph | 第一条语句是 `"use client"`；包含 event handlers 和 `localStorage` | 组件代码进入 browser JavaScript，storage value 不进入 server graph |
| `lib/serverEnv.ts` | server graph | `import "server-only"`；读取 private env | 模块不能由 Client Component 导入，secret value 不进入 browser bundle |
| `lib/boundaryFacts.ts` | 当前只被 server graph 消费 | 只导出 serializable data；由 boundary report page 导入 | “可序列化”不等于自动进入 client bundle；当前没有 client import path |
| `app/api/runtime-check/route.ts` | server graph | `route.ts` + exported `GET` + `runtime = "nodejs"` | handler implementation 不进入 browser bundle，browser 只接收 JSON response |

Graph 与 render tree 不能混为一谈。`app/page.tsx` 在 render tree 中渲染两个 Client Components，不会因此变成 Client Component；反过来，Client Component 接收可序列化 props，也不会把提供 props 的 server module 拉入 client graph。

### 14.4 Build time 与 request time 审计

| 路径或值 | 创建阶段 | 原因 | 可观察证据 |
|---|---|---|---|
| `/boundary-report` HTML/RSC | build time | 页面只读取静态 serializable data | 当前 `next build` route table 显示 `○ /boundary-report` |
| `/` 的 `serverRenderedAt` | request time | `connection()` 排除其后代码的 prerender | 当前 `next build` route table 显示 `ƒ /`；刷新 request 时 timestamp 应改变 |
| `/api/runtime-check` 的 `generatedAt` | request time | 每次 GET 调用 handler 并创建新 `Date` | 连续请求返回不同 ISO timestamp |
| `hydratedAt` | hydration 后 | `useEffect` 只在 browser commit 后执行 | 初始等待文本在 client state update 后变为 timestamp |
| `NEXT_PUBLIC_CHAPTER_ONE_LABEL` | production build time | public env reference 被内联进 client artifact | 修改变量后旧 build 不变，重新 build 后 client output 改变 |

### 14.5 Environment variable exposure 审计

| 变量 | 读取位置 | 是否进入 browser | 输出形式 | 边界证据 |
|---|---|---|---|---|
| `CHAPTER_ONE_SERVER_SECRET` | `lib/serverEnv.ts` | 否 | `isConfigured: boolean` | 无 `NEXT_PUBLIC_` 前缀；server-only guard；return type 不包含 secret |
| `NEXT_PUBLIC_CHAPTER_ONE_LABEL` | `components/HydrationClock.tsx` | 是 | public label string | client module 中静态引用；构建时内联并在 build 后固定 |

`NEXT_PUBLIC_` 是公开契约，不是安全读取 secret 的方法。即使 private variable 只在 server 读取，也不能把原值放入 JSX、RSC props、JSON response 或 log；本项目只跨边界传递 boolean 状态。

### 14.6 Browser bundle 与 styling 审计

Browser bundle 包含 Client Component 实现、它们的 client-side transitive imports、React hydration 所需代码，以及被引用的 `NEXT_PUBLIC_` 字面值。Server page、root layout、Route Handler、`server-only` module 和 private env 原值保持在 server side。

CSS class name 只连接 JSX element 与构建后的样式规则，不会改变 module graph。以后即使加入 Tailwind，utility class 的生成与 CSS asset 处理也不会让 Server Component 自动变成 Client Component；决定 client boundary 的仍是 `"use client"` 和 import graph，而不是 `className` 的内容。

每个重要结论都有不同证据面：directive 与 imports 证明 graph，`connection()` 证明 request dependency，build route table 证明 static/dynamic classification，Network response 证明 Route Handler output，DevTools Console 与交互结果证明 browser runtime。

## 15. 本章调试实验与验证路径

以下实验用于验证机制，不应同时进行。每次只做一项，记录证据后立即恢复源文件；未实际执行的实验保持 `UNKNOWN`。

### 15.1 Experiment 1：移除 Client Component 的 `"use client"`

选择 `components/HydrationClock.tsx`，临时移除第一行 directive，然后运行 dev compilation 或 production build。

- **预期观察：** Next.js 发现 server graph module 使用 `useState` / `useEffect`，编译或构建失败。
- **错误分类：** Next.js module-boundary build error；TypeScript 本身可能仍认识 Hook signature。
- **Terminal：** 观察错误是否指出 Client Component requirement 和 import path。
- **恢复：** 把 `"use client"` 恢复为 imports 前的第一条语句。

这个实验说明 directive 改变的是 module graph，不是给 Hook 添加 TypeScript 类型。

### 15.2 Experiment 2：在 `app/page.tsx` 读取 `localStorage`

临时在 `await connection()` 后读取 `localStorage`，再请求 `/`。

- **预期观察：** TypeScript 可能因为 `lib.dom` declarations 而通过，但 Node.js request-time render 找不到 browser binding。
- **错误分类：** server runtime error；在当前动态首页中通常由实际 request 触发，而不是 hydration error。
- **Terminal：** 观察 server stack 和 `ReferenceError`。
- **Browser Console：** 可能只看到请求失败的结果；根因仍在 server terminal。
- **恢复：** 删除 server read，只在 Client Component 的 Effect 或 event handler 中访问。

这个对比证明 type declaration 不会在 Node.js 中创建 `Window`、`Document` 或 `Storage` object。

### 15.3 Experiment 3：比较 development 与 production

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Terminal</span></div>

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```
</div>

先运行 dev 并观察按需编译、HMR 和开发错误；停止 dev 后再运行 lint、typecheck、build、start。重点比较：

- `/` 在两种 server 中是否每次请求生成 server timestamp。
- hydration timestamp 是否只在 browser JavaScript 执行后出现。
- build route table 是否把 `/boundary-report` 标为 static、把 `/` 标为 dynamic。
- production server 是否读取固定 build output，而不是继续 HMR。
- lint 是否作为独立命令运行；Next.js 16 的 build 不替代 lint evidence。

### 15.4 Experiment 4：检查 `/api/runtime-check`

在 DevTools Network panel 打开 `/api/runtime-check`，检查 request method、status、response headers 和 JSON body。预期 shape：

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Output</span></div>

```json
{
  "runtime": "nodejs",
  "hasWindow": false,
  "hasDocument": false,
  "nodeEnv": "production",
  "serverSecretIsConfigured": false,
  "generatedAt": "2026-07-04T00:00:00.000Z"
}
```
</div>

连续发送两次 GET，`generatedAt` 应改变。response 只能包含 `serverSecretIsConfigured`，不能包含 `CHAPTER_ONE_SERVER_SECRET` 原值。此处错误应根据现象分类为 Route Handler build error、server runtime error 或 HTTP/network error，而不是 React hydration error。

### 15.5 Experiment 5：修改 public env 并解释 rebuild

在本地未提交的环境文件中改变 `NEXT_PUBLIC_CHAPTER_ONE_LABEL`：

1. dev 模式下重启 dev server，观察 label。
2. production 模式先 build，再 start，记录 label。
3. 只改变 environment 后继续运行旧 build，观察 label 不变。
4. 重新 build 并 start，确认新值进入新的 client artifact。

原因是 public reference 在 build time 内联。`CHAPTER_ONE_SERVER_SECRET` 不参加这个实验，也绝不能改成 `NEXT_PUBLIC_CHAPTER_ONE_SERVER_SECRET`。

### 15.6 Terminal、Console、Network 与 build output 观察表

| 观察位置 | 检查内容 | 适合识别的边界 |
|---|---|---|
| Terminal | compilation、lint、type-check、build、server stack | tooling、build、server runtime |
| Browser DevTools Console | browser exceptions、React hydration warning | browser runtime、hydration |
| Network panel | document/RSC/API request、status、response、timing | request、Route Handler、transport |
| Elements panel | initial DOM 与 state update 后 DOM | HTML、hydration、client render |
| Build route table | static/dynamic route classification | build time、request time |

### 15.7 Error classification

| 错误类型 | 典型出现位置 | Chapter 1 识别信号 |
|---|---|---|
| TypeScript checker error | IDE、`pnpm typecheck` | property/signature 不成立；不证明 runtime API 存在 |
| lint error | `pnpm lint` | code rule 被违反；与 build success 分开 |
| build error | `pnpm build` | module boundary、compile 或 prerender 失败 |
| server runtime error | server terminal、HTTP 500 | `localStorage is not defined`、server env/module 执行失败 |
| browser runtime error | DevTools Console | event、Effect、DOM 或 storage 操作失败 |
| hydration mismatch | DevTools Console、UI | server HTML 与 first client render 的 concrete value 不一致 |
| network/request error | Network panel | request method、status、body 或连接失败 |
| deployment/platform error | platform build/runtime logs | 只有实际部署后才能分类；未部署时为 `UNKNOWN` |

### 15.8 Learner evidence table

这张表用于手动实验记录，不代表 Codex 交付清单。实验未执行前保持 `UNKNOWN`。

| 检查项 | 状态 | 证据 |
|---|---|---|
| 移除 `"use client"` 后的 module-boundary error | UNKNOWN | 记录 command、diagnostic 和 import path |
| Server Component 中读取 `localStorage` | UNKNOWN | 记录 type-check result、server error 和 request status |
| dev server request-time timestamp | UNKNOWN | 记录两次 request 的值 |
| production build route classification | UNKNOWN | 记录 route table |
| `/api/runtime-check` runtime facts | UNKNOWN | 记录 Network response |
| public env rebuild behavior | UNKNOWN | 记录旧 build 与新 build 的 label |
| browser hydration 与 storage interaction | UNKNOWN | 记录 Console、DOM 和交互结果 |
| Vercel deployment boundary | UNKNOWN | 未部署时不得改为 `PASS` |

## 16. 必须能回答的问题

1. **Next.js 和 React 的关系是什么？**  
   React 提供组件和渲染语义；Next.js 用框架约定整合路由、server/client graph、构建与服务端能力。

2. **Next.js 和 Vercel 的关系是什么？**  
   Next.js 是可自托管的框架；Vercel 是能零配置部署并优化它的平台，不是框架运行前提。

3. **为什么 Next.js 是 full-stack React framework？**  
   因为同一项目可定义 React UI、Server Components、Route Handlers、server data access、build output 和部署适配。

4. **App Router 和 Pages Router 的第一层区别是什么？**  
   App Router 使用 `app/` 并集成 Server Components；Pages Router 使用 `pages/` 和其自身页面/数据 API。Pages Router 仍受支持。

5. **为什么 `page.tsx` 默认不是 Client Component？**  
   App Router 默认把页面和布局归入 server graph，只有 `"use client"` 入口及其依赖形成 client graph。

6. **什么代码会进入 browser bundle？**  
   从 `"use client"` 入口可达的客户端模块依赖，以及框架运行客户端交互所需代码；Server Component 实现本身不进入。

7. **`"use client"` 改变了什么？**  
   它改变模块图归属和可用 React/browser 能力；不把整个应用变 SPA，也不保证初始 render 只发生在 browser。

8. **`NEXT_PUBLIC_` 有什么含义？**  
   它授权 Next.js 在 build 时把静态引用值内联到客户端 JavaScript，因此该值公开且构建后固定。

9. **`next dev`、`next build`、`next start` 分别做什么？**  
   开发 server、生产产物生成、生产产物服务。三者证据范围不同。

10. **为什么开发环境行为不能完全代表生产环境？**  
    dev 按需编译并支持 HMR；build 会扫描生产图、预渲染和优化；start 只运行既有产物。

11. **为什么 TypeScript 知道 `window` 类型，不代表 server runtime 有 `window` 对象？**  
    DOM declaration 只让 checker 验证语法与签名；类型被擦除，Node.js 宿主不会因此创建浏览器全局对象。

如果回答中没有“模块图、执行阶段、runtime、输出边界”至少两项，说明理解仍停留在表面定义。

## 17. 最终记忆模型

总公式：

**Next.js project = React UI + file conventions + server/client graph + rendering pipeline + build output + deployment target**

读取任何文件时按以下顺序分类：

| 所有者 | 负责回答的问题 |
|---|---|
| React component semantics | 组件、state、Effect、props 如何工作？ |
| Next.js framework convention | 文件为何成为页面、布局、handler 或 config？ |
| JavaScript runtime | 生成后的语句如何执行、作用域和引用如何变化？ |
| Server runtime | 是否有 `process.env`、server data、request context？ |
| Browser runtime | 是否有 DOM、event、storage 和已 hydration 的 React？ |
| TypeScript checker | 哪些错误能在运行前发现，哪些类型会被擦除？ |
| Vercel platform | 如何提供环境、build、deployment 和 URL？ |

最终判断流程：

1. 看路径和固定文件名，确定 Next.js 入口。
2. 看 `"use client"` 与静态 imports，确定 module graph。
3. 看动态 API、Effect 和事件，确定执行时间。
4. 看宿主提供的全局对象，确定 runtime。
5. 看返回 JSX、RSC、HTML、JSON 或 bundle，确定输出边界。
6. 用 lint、typecheck、build、start 和 browser smoke test 分别验证。

## 18. 官方文档阅读清单

### Next.js

| 官方文档 | 本章用途 |
|---|---|
| [Next.js Docs](https://nextjs.org/docs) | 框架定位、当前版本与 Router 总览 |
| [App Router](https://nextjs.org/docs/app) | App Router 学习入口 |
| [Installation](https://nextjs.org/docs/app/getting-started/installation) | Node.js 最低版本、创建与 dev/build/start |
| [Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) | 顶层目录、route segment 与固定文件约定 |
| [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages) | 根布局、页面和嵌套路由 |
| [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) | RSC Payload、HTML、client directive、serializable props |
| [Environment Variables](https://nextjs.org/docs/app/guides/environment-variables) | `.env*`、server-only 与 `NEXT_PUBLIC_` build inlining |
| [next CLI](https://nextjs.org/docs/app/api-reference/cli/next) | `next dev`、`build`、`start`、`typegen` |
| [create-next-app CLI](https://nextjs.org/docs/app/api-reference/cli/create-next-app) | 项目初始化参数与默认行为 |
| [TypeScript](https://nextjs.org/docs/app/api-reference/config/typescript) | Next TypeScript plugin、生成类型与 `next-env.d.ts` |
| [next.config.ts](https://nextjs.org/docs/app/api-reference/config/next-config-js) | 框架配置加载边界 |
| [File-system conventions](https://nextjs.org/docs/app/api-reference/file-conventions) | App Router 固定文件索引 |

本地还对照了安装版本随包附带的文档：

- `node_modules/next/dist/docs/01-app/01-getting-started/01-installation.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/06-cli/next.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/06-cli/create-next-app.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/05-config/02-typescript.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/index.md`

### Vercel

| 官方文档 | 本章用途 |
|---|---|
| [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) | 零配置部署、自托管关系与平台增强 |
| [Vercel CLI](https://vercel.com/docs/cli) | 平台 CLI 总入口 |
| [vercel dev](https://vercel.com/docs/cli/dev) | 本地平台环境 |
| [vercel pull](https://vercel.com/docs/cli/pull) | 同步远程设置和环境 |
| [vercel build](https://vercel.com/docs/cli/build) | 本地/CI 平台构建输出 |
| [Deployments](https://vercel.com/docs/deployments) | Local、Preview、Production deployment 概念 |
| [Environment Variables](https://vercel.com/docs/environment-variables) | 平台环境作用域与部署输入 |

### React、TypeScript 与 MDN

| 官方文档 | 本章用途 |
|---|---|
| [React Server Components](https://react.dev/reference/rsc/server-components) | Server Component 的 React 语义 |
| [use client](https://react.dev/reference/rsc/use-client) | client module boundary 与 serializable props |
| [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot) | hydration 的浏览器机制 |
| [TypeScript JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) | TSX 检查与转换 |
| [TypeScript for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html) | 类型擦除与 JavaScript runtime 边界 |
| [MDN Window](https://developer.mozilla.org/en-US/docs/Web/API/Window) | 浏览器 Window 宿主对象 |
| [MDN Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) | DOM Document API |
| [MDN Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | storage 的 browser/origin 语义 |

### 版本与验证说明

- 当前官方在线文档在检索时显示 Latest Version `16.2.10`。
- 本地项目与 mini project 使用 `16.2.2`，因此实际构建结果以本地版本为准。
- Vercel CLI 命令未在本章执行，因为它们可能要求登录、远程项目关联和平台状态；其本地执行结果为 `UNKNOWN`。
- 文档若在未来补丁版本改变 CLI 输出、默认选项或 route 标记，应重新对照在线官方文档和本地 `node_modules/next/dist/docs/`，不要从本章旧输出推断。
