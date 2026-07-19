# Next.js 第 N 章：具体章节名称

生成实际章节时，必须替换 H1、所有 placeholder、示例 section titles、paths、versions 和 sources。目录名、文件名、H1、目录、代码定位索引和 code-window paths 保持一致。

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
  - [9.1 URL request、route match 与 async params](#section-9-1)
  - [9.2 第二个核心概念（生成时替换）](#section-9-2)
  - [9.3 第三个核心概念（生成时替换）](#section-9-3)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 为什么适合本章](#122-为什么适合本章)
  - [12.3 最终小项目结构](#123-最终小项目结构)
  - [12.4 文件职责](#124-文件职责)
  - [12.5 完整代码](#125-完整代码)
  - [12.6 运行方式](#126-运行方式)
  - [12.7 预期输出或交互结果](#127-预期输出或交互结果)
  - [12.8 核心执行流程](#128-核心执行流程)
  - [12.9 常见错误](#129-常见错误)
  - [12.10 可选扩展](#1210-可选扩展)
- [13. 额外速查表](#13-额外速查表)
- [14. 本章机制复盘与边界审计](#14-本章机制复盘与边界审计)
- [15. 本章调试实验与验证路径](#15-本章调试实验与验证路径)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

生成实际章节时，目录必须覆盖全部实际 `9.x`，并移除所有 placeholder。每个 `9.x` 使用 matching explicit anchor。重要 final-project headings 必须与正文一致。

## 本章代码定位索引

仅当章节包含真实 practice/final-project files 时保留本节。用本地已存在或本次 scope 内实际创建的路径替换 placeholder。

| 学习目标 | 对应文件 / 片段 | 类型 | 所在章节 |
| --- | --- | --- | --- |
| 追踪动态 route params | `Snippet: async route params` | 概念 snippet | 9.1 |
| Replace with actual project goal | `Template: verified real path required` | 模板占位 | 12.5 |

## 0. 文件定位

说明：

- guide 在学习路径和 repository 中的位置。
- 当前 Next.js、React 和 TypeScript versions。
- 当前 Router。
- 前后章节关系。
- 本章明确不覆盖的边界。
- 项目版本与线上 latest docs 是否有差异。

## 1. 本章解决的问题

用 concrete learner confusion、runtime bug、build error、cache surprise 或 deployment difference 驱动本章。不要只写“学习某 API”。

## 2. 前置概念

列出每个 prerequisite，并说明它为什么是理解当前 Next.js mechanism 的必要条件。

## 3. 学习目标

学习者完成本章后应能：

- 解释 owner 和 runtime boundary。
- 从 URL/request 追踪到 server execution、RSC/HTML、client bundle 和 browser result。
- 判断代码是否进入 client bundle。
- 解释 TypeScript 检查与 runtime validation 的差异。
- 识别错误违反的 exact rule。
- 在真实项目中定位同类 failure。

## 4. 推荐学习顺序

给出顺序，并解释为什么该顺序能减少跨 Router、跨 runtime 和跨 cache model 的混淆。

## 5. 核心术语表

| Term | 中文说明 | Primary Layer | Server / Browser | Bundle Impact | Why It Matters |
| --- | --- | --- | --- | --- | --- |
| Replace with actual term | 说明 concrete meaning | React / Next.js / Web API / TypeScript / tooling / deployment | 说明执行位置 | 说明是否进入 client bundle | 说明章节作用 |

## 6. 底层心智模型

建立本章的核心 dataflow，不用 API list 代替：

1. trigger。
2. route/file/module boundary。
3. server runtime。
4. data/cache behavior。
5. RSC/HTML/Response transport。
6. browser hydration/navigation。
7. observed result。

## 7. 推荐目录结构

只保留与当前章节有关的 structure types，不要把 conceptual snippets 当成 real files。

### 当前项目结构

下面只展示已在 repository 中验证存在的文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Current project structure</span>
  </div>

```txt
project-root/
  app/
    layout.tsx
    page.tsx
  next.config.ts
  package.json
  tsconfig.json
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
docs/
  nextjs/
    chapter-n-topic/
      nextjs-chapter-n-learning-guide.md
```
</div>

### 概念示例结构

这些 labels 只说明机制，不代表需要创建文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Conceptual snippets</span>
  </div>

```txt
Snippet: async route params
Snippet: missing await
Template: route handler
```
</div>

### 真实练习结构

生成实际 guide 时，每个 real path 必须在本地存在。固定 special filename 不能为追求描述性而重命名，学习目标通过 segment 和 supporting module names 表达。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: verified practice structure</span>
  </div>

```txt
app/
  products/
    [productId]/
      page.tsx
  _lib/
    products.ts
```
</div>

## 8. 示例运行方式

命令必须来自当前 repository 的 `package.json` 或官方 CLI docs。

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

说明 runtime、port、URL、expected route、required environment 和常见启动失败。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 URL request、route match 与 async params

本小节只示范完整写法。生成其他主题时，用当前 section 的 route、values、boundaries 和 errors 重写，不能复制这条 evidence chain 填充。

**结论：**

在已核对为 async route props 的 Next.js 版本中，dynamic segment 对应的 `params` 是 Promise。Server Component 必须先 `await params` 才能读取 `productId`；TypeScript 能检查 Promise signature，但不能确认 URL 中的 value 对应真实 product。

**本节解决的问题：**

解释 browser 请求 `/products/desk-lamp` 后，folder `[productId]`、`params` Promise、Server Component return value、RSC Payload、HTML 和 browser UI 如何连接。

**技术意义：**

把 URL matching 与 runtime data validation 分开：route matcher 负责提取 string，page 负责 await 和业务查询，业务层仍必须处理不存在或未授权的 product。

**概念解释：**

`[productId]` 是 Next.js file-system convention。`params` 是 framework 提供给 route entry 的 value；在当前版本 signature 中它通过 Promise 交付。JS `await` 取得 object，React 执行 async Server Component，Next.js 再组织 response。

**边界：语法、JavaScript 运行时、React 运行时、Next.js 框架约定、Server runtime、Browser runtime、Web API、TypeScript 类型系统与工具链：**

`await` 属于 JavaScript syntax/runtime；async Server Component 的 suspend/resume 属于 React server rendering；`[productId]` 和 page props 属于 Next.js convention；读取 product data 在 server runtime；browser 发 request 并显示 HTML/hydrated client islands；TypeScript 检查 `Promise<{ productId: string }>`，但 type 被 erase，不能验证数据库存在性。

**底层机制：**

route matcher 把 path segment `desk-lamp` 放入 params object。framework 通过 Promise 传给 page。server await 后得到 `{ productId: "desk-lamp" }`，component return React element。Server Component implementation 不进入 client bundle；rendered result 进入 RSC Payload，并可用于 initial HTML。

**API / 语法规则：**

只有在 bundled docs 与 current official docs 都确认当前版本使用 async params 时，才采用 Promise signature。Pages Router 或旧版本必须使用各自 docs，不得复制本例。

**固定文件名 / 固定方法名 / 参数签名：**

固定 entry filename 是 `page.tsx`。dynamic folder 使用 `[productId]`。示例 default export 接收 `{ params: Promise<{ productId: string }> }`。

**文件结构：**

本例是 conceptual snippet。若换成 real path，必须先在本地创建或验证对应 segment。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: async route params</span>
  </div>

```tsx
type ProductPageProps = {
  params: Promise<{ productId: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  return <h1>Product {productId}</h1>;
}
```
</div>

**逐行解释：**

`ProductPageProps` 描述 framework prop 的 static relationship；`async` 允许 component await Promise；destructuring 创建 server runtime string binding；returned JSX 描述 server-rendered output。

**运行方式：**

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

访问与真实 practice structure 匹配的 URL。

**预期输出：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
Product desk-lamp
```
</div>

**执行过程：**

1. Browser 请求 `/products/desk-lamp`。
2. Next.js 匹配 `products/[productId]/page.tsx`。
3. Server runtime 调用 async page，并提供 params Promise。
4. JavaScript await Promise，得到 object 和 string。
5. React server render 产生 Server Component output。
6. Next.js 生成 RSC Payload，并为 initial load 生成/stream HTML。
7. Browser 显示 heading；本 snippet 没有 Client Component，因此没有该 page implementation 的 client hydration。

**机制证据链：**

trigger 是 document request；file boundary 是 dynamic segment 和 `page.tsx`；server path 是 route match、await、component render；browser path 是 request、HTML display，且无 page client bundle；concrete values 是 URL string、params Promise、resolved object 和 JSX element；TypeScript 只检查 Promise/object shape；observed output 来自 resolved `productId`；省略 await 违反当前 async params contract；真实项目可从 Promise property error、incorrect undefined access 或 route page failure 识别。

**变量与引用变化：**

URL string 保持不变；framework 创建 params Promise；Promise settle 后产生 params object；destructuring 产生 `productId` string binding；React element 保存 display value。Type annotations 不存在于 runtime。

**为什么会得到这个结果：**

folder name 决定 matcher key，URL segment 决定 string value，await 决定何时可读取 object，JSX 使用该 binding，因此 UI 显示同一个 segment。

**对比情况：**

Pages Router 或旧版本可能使用不同 props/data APIs。比较时必须建立两个独立 signatures 和 request paths，不要只删除 Promise type。

**常见错误为什么错：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: missing await</span>
  </div>

```tsx
type ProductPageProps = {
  params: Promise<{ productId: string }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  return <h1>{params.productId}</h1>;
}
```
</div>

`params` 是 Promise，不是 resolved object，直接读取 `productId` 违反 Promise value 必须先 settle/await 的规则。修正为 async component 并 `await params`。若 current project version 文档声明同步 signature，则应改用该版本规则，而不是强行套本错误。

**与真实项目的关系：**

真实 product page 会把 string 送入 database lookup、authorization 和 not-found flow。route match 只证明 segment 存在，不证明 product 有效。

**与当前学习路径的关系：**

本节建立 routing、server execution 和 TypeScript/runtime boundary，为后续 data fetching、notFound、caching 和 metadata 章节提供 request identity。

**最终记忆模型：**

Folder 定义 match shape，URL 提供 runtime string，framework 提供 params contract，server await 并 render，RSC/HTML 传输 rendered result，TypeScript 只检查开发期 relationship。

<a id="section-9-2"></a>

### 9.2 第二个核心概念（生成时替换）

生成时复制 9.1 的全部 required labels，但必须用 9.2 自己的 trigger、file/module boundary、server path、browser path、RSC/HTML/bundle behavior、concrete values、TypeScript boundary、error rule 和 production signal 重写。若本节没有 browser execution、hydration 或 cache，明确说明不存在。

<a id="section-9-3"></a>

### 9.3 第三个核心概念（生成时替换）

生成时使用完整 required labels 和独立 evidence chain。继续添加 `9.4`、`9.5` 直到覆盖本章所有核心概念，并同步目录和 anchors。

## 10. API / 语法索引

| File / API / Syntax | Owner Layer | Router | Runtime | Input | Output / Effect | Common Mistake |
| --- | --- | --- | --- | --- | --- | --- |
| Replace with actual item | React / Next.js / Web API / TypeScript / tooling | App / Pages / both | server / browser / build / deployment | concrete input | concrete effect | violated rule |

## 11. 常见错误表

| Error / Symptom | Type | Exact Cause | Violated Rule | Correction | Recognition Signal |
| --- | --- | --- | --- | --- | --- |
| Replace with actual error | type / build / server / hydration / cache / deployment | 说明 concrete cause | 说明规则 | 说明修复 | 说明项目信号 |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。项目中的每个核心概念必须先在对应 `9.x` 用独立 evidence chain 讲清楚。

### 12.1 项目目标

说明可观察目标、URL/API/UI behavior 和章节机制。

### 12.2 为什么适合本章

说明每个 project requirement 对应哪个 `9.x`，避免随机组合 APIs。

### 12.3 最终小项目结构

生成实际章节时，把模板路径替换为本地真实路径并逐个验证存在。若不在 implementation scope 内，改为 `Template:` 并明确无需创建。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: final project structure</span>
  </div>

```txt
app/
  products/
    [productId]/
      page.tsx
    api/
      route.ts
  _lib/
    products.ts
```
</div>

### 12.4 文件职责

逐个说明 route entry、server-only data module、Client Component、Route Handler 和 config 的 owner 与 boundary。不要只复述 filename。

### 12.5 完整代码

每个 structure 中的 real file 都必须有 complete code。concept-only project 则使用 `Template:` title，不报告为真实交付文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: final project page</span>
  </div>

```tsx
type ProductPageProps = {
  params: Promise<{ productId: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  return <h1>Product {productId}</h1>;
}
```
</div>

### 12.6 运行方式

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

### 12.7 预期输出或交互结果

说明 URL、rendered UI、HTTP status/body、loading/error behavior 和 cache timing。只写实际可验证内容。

### 12.8 核心执行流程

从 trigger 追踪 route matching、server code、data/cache、RSC/HTML/Response、client bundle、hydration/navigation 和 deployment stages。

### 12.9 常见错误

列出 project-specific error、exact violated rule、fix 和 recognition signal。

### 12.10 可选扩展

只列与本章机制直接相关的扩展，不引入新 architecture、database、auth system 或 test framework。

## 13. 额外速查表

使用 `assets/cheatsheet-template.md`，并删除正文未解释的 rows。

## 14. 本章机制复盘与边界审计

本节只复盘本章已解释的机制。文件路径只用于追踪执行边界，不作为交付清单。

### 14.1 机制链复盘

用当前章节的 concrete chain 替换：

trigger → file/module boundary → server execution → RSC/HTML/Response → client bundle → hydration/navigation → observed output。

### 14.2 owner / phase / runtime / output 审计

| 对象 | owner | phase | runtime | output | validation signal |
| --- | --- | --- | --- | --- | --- |
| Replace with chapter object | React / Next.js / Web API / TypeScript / tooling / deployment | build / request / hydration / event | Node.js / Edge / browser / none | RSC / HTML / JS / Response / diagnostic | 具体 source、build output 或 runtime observation |

### 14.3 关键边界对比

按当前章节相关性审计：

- server graph 与 client graph。
- build time 与 request time。
- browser bundle 中进入和排除的模块。
- server-only 与 public environment variables。
- styling、CSS 或 generated assets 是否改变 execution boundary。

### 14.4 真实文件边界证据

真实文件存在时，逐个说明 import direction、module graph、runtime、output 和可复核 evidence。不要写“已创建”或“已更新”。

只有实际执行过验证时才写 `PASS` 或 `FAIL`。未执行的项目写 `UNKNOWN`。

## 15. 本章调试实验与验证路径

### 15.1 调试实验

| 实验 | 改动或触发 | 预期观察 | 错误分类 | 恢复方式 |
| --- | --- | --- | --- | --- |
| Replace with chapter experiment | 说明最小改动 | terminal / Console / Network / UI signal | type / lint / build / server / browser / hydration / network / deployment | 恢复原始边界 |

### 15.2 观察面板

| 观察位置 | 检查内容 |
| --- | --- |
| Terminal | compile、lint、type-check、build、server logs |
| Browser Console | browser runtime error、hydration mismatch |
| Network | document、RSC、API request、status、response |
| Build output | static/dynamic route、bundle 或 cache signal |

### 15.3 Development 与 production 验证路径

命令只从当前 repository 的 scripts 中选择。未执行的命令标记 `UNKNOWN`。

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
npm run dev
npm run build
npm run start
```
</div>

### 15.4 Error classification

| 类型 | 识别位置 | 本章 signal |
| --- | --- | --- |
| TypeScript checker error | IDE / type-check command | Replace with exact diagnostic pattern |
| lint error | lint command | Replace with violated rule |
| build error | production build | Replace with compile/prerender failure |
| server runtime error | server terminal / HTTP response | Replace with server-only failure |
| browser runtime error | DevTools Console | Replace with browser-only failure |
| hydration mismatch | Console / UI | Replace with first-render value mismatch |
| network/request error | Network panel | Replace with status/body/request evidence |
| deployment/platform error | platform logs | Include only when relevant and verified |

### 15.5 Learner validation table

| 检查项 | 状态 | 证据 |
| --- | --- | --- |
| Replace with actual check | UNKNOWN | 未执行前保持 UNKNOWN；执行后记录 command、output 或 observation |

## 16. 必须能回答的问题

问题必须覆盖：

- owner 是 React、Next.js、Web API、TypeScript、tooling 还是 deployment。
- server/browser 各执行什么。
- 什么进入 client bundle。
- RSC、HTML 和 hydration 如何连接。
- TypeScript 能检查什么、不能验证什么。
- caching/revalidation 在哪个 layer。
- 如何识别真实项目中的 failure。

## 17. 最终记忆模型

用短而具体的 chain 总结本章，不使用“Next.js 会自动处理一切”。

## 18. 官方文档阅读清单

按阅读顺序列出：

1. 当前安装版本 bundled docs 的精确 paths。
2. 实际打开的 Next.js official URLs。
3. 实际打开的 React、TypeScript、MDN、Vercel 或 tool official URLs。
4. 每个 source 要验证的具体 claim。
5. 无法访问或版本支持未确认的 `Verification Needed`。
