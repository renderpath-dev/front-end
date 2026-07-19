# Next.js 学习指导标准

## 目录

- 核心输出原则
- 完整章节结构
- 核心分节结构
- Next.js 分层模型
- 机制证据链
- 请求与导航链路
- Router 边界
- 文件约定
- Server 与 Client 边界
- 数据获取边界
- 缓存与重新验证边界
- Streaming 与错误边界
- Route Handlers 与 Server Actions
- TypeScript 边界
- Tooling 与部署边界
- 文件结构与代码窗口
- 最终小项目与速查表
- 本章机制复盘与边界审计
- 本章调试实验与验证路径
- 主题覆盖范围
- 交付规则

## 核心输出原则

- 写教学型学习指导，不写摘要、API 清单、snippet 合集或只有目录的项目模板。
- 面向从基础认真学习现代 frontend 和 full-stack JavaScript 的学习者。
- 先解释机制，再给代码、目录、表格和结论。
- 解释概念解决的问题、存在原因、所有权层级、实际执行过程、结果原因、错误规则和真实项目识别信号。
- 不假设学习者已经理解 module graph、render tree、RSC、hydration、HTTP caching、runtime、type erasure 或 deployment topology。
- 不把 Next.js 当作“React 加一个 router”。Next.js 还拥有 file conventions、server execution、RSC orchestration、data/cache model、build output 和 deployment contracts。
- 不使用最终小项目替代 `9.x` 的逐节教学。

当篇幅有限时，按以下顺序保留内容：

1. 核心概念解释。
2. 底层机制和 runtime boundary。
3. 请求、render、RSC、HTML、bundle、hydration 和 navigation 链路。
4. 逐行解释与 concrete values。
5. 错误原因、违反规则和识别方法。
6. 真实项目与部署影响。

## 完整章节结构

除非用户明确要求较小文档，每个完整章节必须使用以下顺序：

1. `# Next.js 第 N 章：具体章节名称`
2. 自包含 `<style>`，包含完整 macOS code-window 样式。
3. `## 目录`
4. `## 本章代码定位索引`，当章节包含真实练习文件或最终小项目文件时必需。
5. `## 0. 文件定位`
6. `## 1. 本章解决的问题`
7. `## 2. 前置概念`
8. `## 3. 学习目标`
9. `## 4. 推荐学习顺序`
10. `## 5. 核心术语表`
11. `## 6. 底层心智模型`
12. `## 7. 推荐目录结构`
13. `## 8. 示例运行方式`
14. `## 9. 分节教学与练习`
15. `## 10. API / 语法索引`
16. `## 11. 常见错误表`
17. `## 12. 最终小项目`
18. `## 13. 额外速查表`
19. `## 14. 本章机制复盘与边界审计`
20. `## 15. 本章调试实验与验证路径`
21. `## 16. 必须能回答的问题`
22. `## 17. 最终记忆模型`
23. `## 18. 官方文档阅读清单`

H1 必须同时包含技术名、章节号和具体名称。新章节的目录名、文件名、H1、目录、代码定位索引和 code-window path 必须使用一致的章节身份。

## 目录与稳定锚点

- `## 目录` 位于 H1 和 `<style>` 后、`## 0. 文件定位` 前。
- 列出实际存在的每个 `## 0` 到 `## 18`。
- 展开 `## 9` 下从 `9.1` 到最后一个核心小节的全部条目。
- 展开 `## 12` 下的重要三级标题，包括项目目标、结构、完整代码、运行方式、预期结果、执行流程和常见错误。
- 不把 `结论`、`技术意义`、`执行过程` 等 bold labels 放入目录。
- 每个核心小节使用稳定 target `#section-9-1`、`#section-9-2`，依此类推。
- 在对应 heading 前放置唯一的 `<a id="section-9-1"></a>`，anchor 与 heading 之间最多一个空行。
- 不依赖包含中文、句点、斜线、引号或冒号的自动 slug。
- 不为迎合 slug 而改变有意义的 heading 文本。

## 本章代码定位索引

当章节有真实 practice files 或 final mini-project files 时，索引必须映射：

| 字段 | 要求 |
| --- | --- |
| 学习目标 | 当前章节的具体机制 |
| 对应文件 / 片段 | 精确真实路径，或明确 `Snippet:` / `Template:` label |
| 类型 | 真实练习文件、概念 snippet 或模板 |
| 所在章节 | 精确 `9.x` 或 `12.x` |

索引中的真实路径必须与目录结构、code-window title、完整代码和本地文件一致。概念片段不得伪装成文件。

## 核心分节结构

在 `## 9. 分节教学与练习` 内用 `### 9.x` 作为核心概念 heading，不堆叠大量 H4。

每个核心 `9.x` 小节必须使用这些 bold labels：

- `结论`
- `本节解决的问题`
- `技术意义`
- `概念解释`
- `边界：语法、JavaScript 运行时、React 运行时、Next.js 框架约定、Server runtime、Browser runtime、Web API、TypeScript 类型系统与工具链`
- `底层机制`
- `API / 语法规则`
- `固定文件名 / 固定方法名 / 参数签名`
- `文件结构`
- `示例代码`
- `逐行解释`
- `运行方式`
- `预期输出`
- `执行过程`
- `变量与引用变化`
- `为什么会得到这个结果`
- `对比情况`
- `常见错误为什么错`
- `与真实项目的关系`
- `与当前学习路径的关系`
- `最终记忆模型`

没有新 API、固定文件名、browser path 或 client bundle 时，明确写“本节没有该阶段/接口”，并解释原因。不要用空标签或 generic filler 占位。

## 禁止 label-only filling

标签只是写作骨架，不是质量证据。每个标签下的内容必须绑定当前小节的：

- URL、route segment 和 special file。
- module import path 和 server/client boundary。
- concrete props、params、searchParams、Promise、FormData、Request、Response、cookie、header 或 cache key。
- 实际 RSC、HTML、JavaScript bundle、hydration 或 streaming 行为。
- 实际 TypeScript relationship 和 runtime blind spot。
- 实际 output、error、stale UI、hydration mismatch、cache miss 或 deployment difference。

如果一段机制说明可以原样复制到另一个 Next.js、React 或 TypeScript 章节，它过于泛化，必须重写。

以下句子不能独立充当机制解释：

- “Next.js 会渲染页面。”
- “React 会 hydration。”
- “TypeScript 会检查类型。”
- “这样性能更好。”
- “这样更适合生产环境。”

必须继续说明 owner、input、intermediate representation、runtime、cache entry、response、bundle 和 observed result。

## Next.js 分层模型

每个重要术语至少标注一个主层级，必要时标注多个相邻层级：

| Layer | 典型内容 | 不要混淆 |
| --- | --- | --- |
| Syntax | `async`、`await`、directives 的语法位置 | 语法本身不等于 runtime behavior |
| JavaScript runtime | function calls、Promise、closures、objects、module evaluation | 不等于 React scheduling |
| React runtime | component render、Suspense、hydration、state、Server Components protocol | 不等于 Next.js file convention |
| Next.js convention | route segments、special files、Route Handlers、metadata、config | 不等于 Web standard |
| Server runtime | Node.js/Edge capabilities、process env、server-only I/O | 不等于 browser runtime |
| Browser runtime | DOM、events、history、storage、hydrated interactivity | 不等于 Server Component execution |
| Web API | `Request`、`Response`、`URL`、`Headers`、cookies semantics | 不等于 `NextRequest` extensions |
| TypeScript | static relationships、generated types、diagnostics | 不提供 runtime validation |
| Tooling | compiler、Turbopack/Webpack、ESLint/Biome、test runner | 不等于 deployed runtime |
| Deployment | Functions、regions、CDN、durable cache、self-hosting | 不等于 framework contract |

## 机制证据链

每个核心 `9.x` 至少包含一条可验证的机制证据链，覆盖：

1. 触发动作：URL request、`<Link>` navigation、form submit、Server Action call、Route Handler call、build、dev refresh、cache hit/miss 或 user event。
2. 涉及的 route segment、special file、directive 或 module boundary。
3. server-side execution path。
4. browser-side execution path；若没有，明确说明。
5. RSC Payload、HTML、client bundle、hydration、streaming 或 navigation behavior。
6. concrete values：objects、promises、requests、responses、props、params、searchParams、cookies、headers、FormData、cache entries。
7. TypeScript 检查的 relationship，以及运行时无法验证的内容。
8. observed output、error 或 cache/deployment behavior。
9. 错误形式违反的精确规则。
10. 在真实项目中识别同类问题的 signal。

证据链可使用编号步骤或紧凑表格，但必须从 trigger 追踪到 result。

## 请求与导航链路

根据当前概念，解释以下完整链路中的适用阶段：

1. Browser 发出 document request，或 client router 发起 navigation。
2. Deployment routing 和 Proxy 在适用时处理 request。
3. Next.js 按 folder route segments 匹配 route。
4. Layout/page/template/loading/error/not-found/route 的 convention 决定 entry points。
5. Server runtime evaluate server module graph，读取 request-time data 或 cached data。
6. React 生成 Server Component output，Next.js 组织 RSC Payload。
7. Initial load 可生成 HTML 并按 Suspense boundary streaming。
8. Browser 显示 HTML，下载 client references 对应的 JavaScript。
9. React 使用 RSC Payload reconcile tree，并 hydration Client Components。
10. 后续 navigation 获取/使用 RSC data 和 client router cache，而不是机械重复完整 document load。
11. Mutation 后根据具体 API 更新、过期或重新验证 cache。

不要强制每个场景经过所有阶段：

- Route Handler 返回 Web `Response`，不参与 page layout 和 client-side page navigation。
- 纯 Server Component module 不进入 client bundle。
- 只有 Client Components hydration。
- 静态 shell、dynamic holes 和 request-time rendering 取决于当前 cache model 和 Suspense boundaries。

## Router 边界

### App Router

- 基于 `app/` 或 `src/app/`。
- 使用 nested layouts、Server Components、special files、Route Handlers 和当前 App Router data/cache model。
- `page`、`layout` 等是 Next.js entry-point conventions，不是 React API。

### Pages Router

- 基于 `pages/` 或 `src/pages/`。
- 使用 `_app`、`_document`、API Routes 和 Pages Router data-fetching APIs。
- 仍受支持，但不能把 App Router 的 RSC、Route Handlers 或 special files 直接套入。

### 比较或迁移

- 每个例子明确 Router。
- 解释旧 API 的责任如何映射到新结构，不只给文件重命名。
- 对 Vite/React migration，解释 client-only SPA assumptions 如何变化，包括 routing ownership、server module graph、environment variables 和 deployment output。

## 文件约定

只教学当前主题需要的 conventions，并核对项目版本：

| Convention | 必须解释的机制 |
| --- | --- |
| `page.tsx` | route public entry、props、server/client status |
| `layout.tsx` | nested persistence、children slot、root requirements |
| `template.tsx` | remount/reset behavior，与 layout 对比 |
| `loading.tsx` | segment-level loading UI 和 implicit Suspense boundary |
| `error.tsx` | error boundary scope、client requirement、reset path |
| `not-found.tsx` | `notFound()` 与 segment/global behavior |
| `route.ts` | HTTP methods、Web Request/Response、route conflict |
| `proxy.ts` | request interception、matcher、runtime/version limits |
| metadata files | server generation、SEO output、file precedence |
| route segment config | version-specific runtime/render/cache controls |

固定文件名、export name、default/named export、参数签名和 colocating conflict 必须逐项说明。

## Server 与 Client 边界

### 必须区分

- Server Component module graph。
- Client module graph。
- React render tree。
- RSC Payload。
- prerendered/streamed HTML。
- client JavaScript bundle。
- hydration。
- later client navigation。

### `"use client"`

- 把它解释为 module dependency graph boundary。
- 说明被 client-marked module 的 transitive imports 可能进入 client bundle。
- 不把视觉 render tree 中传入的 Server Component children 错判为 client module。
- 说明 browser APIs、state、effects 和 event handlers 为什么需要 client execution。
- 说明 server-to-client props 的 serialization contract。

### `"use server"`

- 把它解释为 Server Function boundary。
- 不称为 Server Component marker。
- 说明 network call、async execution、argument serialization、runtime validation、authentication 和 authorization。
- 把所有 Server Action input 当作不可信 client input。

### Environment poisoning

- 识别 server-only secrets 被 client imports 引入的风险。
- 解释 `NEXT_PUBLIC_` 变量与 server-only variables 的 bundle exposure。
- 当项目使用时，说明 `server-only` / `client-only` guards。

## 数据获取边界

分别教学：

- Server Component 中直接访问 database 或 filesystem。
- Server Component 中调用 `fetch`。
- Route Handler 中处理 HTTP request。
- Client Component 中通过 browser/network library fetching。
- Server Action 中 mutation，不把它作为普通 read-fetching API。

对每一种说明：

- code 在何处执行。
- input 和 output 是什么 concrete values。
- 是否进入 client bundle。
- 是否受 request memoization 影响。
- 是否持久缓存，以及由哪个 cache model 决定。
- authentication/authorization 在哪里执行。
- browser 是否看到 secret 或完整 response。

## 缓存与重新验证边界

不得把下列概念合并成一个“cache”：

- React render/request memoization。
- Next.js data or function cache。
- full route/static shell output。
- client router cache。
- browser HTTP cache。
- CDN/edge cache。
- Vercel durable cache。
- self-hosted in-memory or filesystem cache。

### Cache Components

先检查 `next.config.*` 是否启用 `cacheComponents`。启用时：

- 核对 `"use cache"` 的适用位置。
- 解释 data-level 与 UI-level caching。
- 解释 `cacheLife`、`cacheTag`、runtime data 和 static shell。
- 解释 PPR/static shell 与 Suspense streaming 的关系。
- 不把 previous model 的 default cache behavior 混入。

未启用时：

- 读取 `Caching (Previous Model)` 对应的 installed-version docs。
- 不用 Cache Components 的规则解释旧模型。
- 说明迁移内容，而不是同时展示两套无标签 defaults。

### Revalidation

逐个说明 API 的：

- 可调用位置。
- path/tag/cache entry target。
- immediate expiration 或 stale-while-revalidate behavior。
- Server Action 与 Route Handler 限制。
- user-observed timing。
- Vercel 和 self-hosting persistence differences。

## Streaming 与错误边界

- 解释 Suspense 的 React ownership 和 Next.js route integration。
- 区分 explicit `<Suspense>` 与 `loading.tsx` 的 segment scope。
- 追踪 static shell、fallback、dynamic content 和 streamed chunks。
- 解释 initial request 与 later navigation 的差异。
- `error.tsx`、`global-error.tsx`、`not-found.tsx` 和 thrown error/notFound 的 scope 必须版本核对。
- hydration mismatch 必须说明 server HTML 与 first client render 不一致的具体值来源。

## Route Handlers 与 Server Actions

### Route Handlers

- 从 `route.ts` 和 exported HTTP method 开始。
- 使用 Web `Request` / `Response` 作为基础，按需增加 `NextRequest` / `NextResponse`。
- 解释 URL、headers、body、cookies、status、response body 和 supported methods。
- 说明 `route.ts` 与同一 segment 的 `page.tsx` 冲突。
- 说明 caching default，并在 Cache Components 下单独核对。

### Server Actions

- 从 form submission、`action` / `formAction` 或 explicit call 追踪到 server function。
- 说明 serialized arguments、FormData、Promise result、pending state、revalidation 和 redirect。
- 说明 input validation、authentication、authorization 和 error exposure。
- optimistic UI 只在当前章节相关且 React/Next.js docs 已核对时加入。

## TypeScript 边界

每个 TypeScript 章节必须区分：

- TypeScript syntax。
- static type relationship。
- generated Next.js types。
- emitted JavaScript 与 type erasure。
- JavaScript runtime values。
- runtime validation。
- IDE、`next typegen`、`tsc`、`next build` 和 bundler diagnostics。

特别核对：

- `params` 和 `searchParams` 的 Promise signatures。
- `PageProps`、`LayoutProps`、`RouteContext` 等 generated helpers。
- typed routes 和 `next.config.ts` typing。
- `next-env.d.ts` 是否由框架管理。
- Turbopack 是否负责 type checking。

TypeScript 接受某个 shape 不证明 network body、FormData、cookie、environment variable 或 database result 在 runtime 具有该 shape。

## Tooling 与部署边界

### Tooling

- 读取现有 scripts 后再给命令。
- 明确 `next dev`、`next build`、`next start`、lint、type-check 和 test 各自验证什么。
- 核对 Turbopack 与 Webpack 的当前默认和 opt-in flags。
- 不声称 bundler 完成 type checking，除非官方文档和实测证明。
- 核对 `next lint` 是否存在；Next.js 16 不应沿用已移除命令。
- 不引入项目没有的 ESLint、Biome、Vitest、Jest、Cypress 或 Playwright。

### Deployment

分别解释：

- framework build output。
- Node.js 或 Edge runtime。
- Vercel Functions 和 regions。
- CDN 和 cache persistence。
- streaming support。
- ISR behavior。
- environment variable injection。
- self-hosted process、reverse proxy、cache handler 和 multi-instance implications。

不把 local `next start` 验证当作 Vercel deployment validation，也不把 Vercel preview success 当作 self-hosting proof。

## 文件结构类型

完整章节按需明确区分：

- `当前项目结构`：仓库中当前真实存在的文件。
- `本章文档结构`：guide 和相关文档的位置。
- `概念示例结构`：只用于解释的 `Snippet:` / `Template:`，无需创建。
- `真实练习结构`：本次实际创建或已验证存在的 practice files。
- `最终小项目结构`：最终整合练习中真实存在或明确要求创建的文件。

Next.js 文件名常由 framework convention 固定，因此学习目标主要通过 route segment directory、feature directory 和 supporting module name 表达。不要为了“描述性文件名”重命名 `page.tsx`、`layout.tsx` 或 `route.ts`。

## 真实文件与 Snippet

- title bar 使用真实 path 时，该 path 必须出现在最近的真实 structure block，并在本地存在。
- 概念对比、错误例子、未创建模板使用 `Snippet:` 或 `Template:`。
- 不把 snippet 当作真实交付文件。
- 不将缺失文件写成“已创建”“已更新”或“真实练习文件”。
- 真实 path 必须在 code location index、structure、title bar、complete code 和 final response inventory 中一致。

## 代码示例

每个 non-trivial example 必须包含：

- 正确示例。
- 预期 UI、output、HTTP response、compiler result 或 build result。
- 逐行解释。
- server 和 browser execution process。
- concrete values、Promise、Request、Response、props、cache entries 或 references 的变化。
- meaningful contrasting case。
- incorrect example 和 raw error/warning，若可安全复现。
- 违反的精确规则。
- 修正方式。
- 在真实项目中识别同类错误的方法。

代码、命令、raw output、raw errors 和 comments 保持 English-only。

## macOS code-window

所有 source code、terminal commands、output 和 error examples 使用：

1. HTML title bar。
2. red/yellow/green dots。
3. real path、`Snippet:`、`Template:`、`Terminal`、`Output` 或 `Error` title。
4. 紧随其后的 normal Markdown fenced code block。

不要把 source code 放进 raw `<pre><code>`。完整章节的 opening `<style>` 必须定义：

- `.macos-code-window`
- `.macos-code-titlebar`
- `.macos-code-dot`
- `.macos-code-dot-red`
- `.macos-code-dot-yellow`
- `.macos-code-dot-green`
- `.macos-code-title`
- `.macos-code-titlebar + pre`
- `.macos-code-titlebar + pre code`

## 最终小项目

开头用自然句明确：最终小项目只整合本章机制，不替代前面的分节教学。

必须包含：

- 项目目标。
- 为什么适合本章。
- 真实最终结构。
- 每个文件职责。
- 完整代码。
- 运行命令。
- 预期 UI、HTTP behavior 或 output。
- request/render/data/cache execution flow。
- 常见错误。
- 与本章机制直接相关的扩展。

任何 project concept 都必须先在对应 `9.x` 中独立讲清楚。项目代码不得压倒浅薄的核心教学。

## 额外速查表

完整章节必须包含：

- 一句话概念总结。
- Router / runtime / bundle boundary table。
- 常用 API 和 file convention table。
- 相似概念对比。
- error type table。
- cache/revalidation table，若相关。
- real project usage table。
- minimal templates。

## 本章机制复盘与边界审计

Section 14 只复盘当前章节已经教学的机制，不承担交付清单职责。必须按章节相关性包含：

- chapter-specific mechanism chain。
- `owner / phase / runtime / output` audit table。
- server graph 与 client graph 对比。
- build time 与 request time 对比。
- browser bundle audit。
- environment variable exposure audit。
- real files 存在时的 per-file boundary explanation。
- 每个重要 boundary decision 的可复核 evidence。

文件路径只用于解释执行边界、module graph 或 value flow，不得组织成“本次创建/更新文件”清单。只有实际执行过验证时才使用 `PASS` 或 `FAIL`；未执行的检查标记 `UNKNOWN`。

## 本章调试实验与验证路径

Section 15 把本章机制转化为可观察实验。必须按相关性包含：

- chapter-specific debugging experiments。
- terminal output、Browser DevTools Console、Network panel 和 build output 的观察点。
- development 与 production behavior 的对比路径。
- TypeScript checker、lint、build、server runtime、browser runtime、hydration mismatch、network/request 和 deployment/platform errors 的分类方法。
- 只属于当前章节和当前 repository 的命令。
- learner 可填写的 `PASS / FAIL / UNKNOWN` evidence table。

未执行的命令或实验必须标记 `UNKNOWN`，不得根据预期行为写成 `PASS`。

## Guide body 与 final response

- Guide body 只保留教学、机制、实验、复盘和官方来源内容。
- Final file inventory、files created/updated、commands run、validation results、limitations 和 Codex delivery checklist 只出现在 final response。
- Personal-note conversion suggestions 在相关时放入 final response，不作为完整章节的固定 section。
- `最终文件清单`、`如何转换成个人笔记` 和 `最终学习笔记转换要求` 不得作为 guide headings。

## 主题覆盖范围

该标准至少支持：

1. Next.js framework boundary 和 setup。
2. App Router routes、segments、layouts、pages、templates、route groups。
3. Dynamic routes、params、searchParams、navigation、Link、redirect、notFound。
4. Server Components、Client Components、RSC Payload、`"use client"`、serialization。
5. Server/Client data fetching。
6. Cache Components、`"use cache"`、cacheLife、cacheTag、revalidation、ISR、PPR/static shell。
7. Suspense、streaming、loading、error、not-found。
8. Route Handlers、Web APIs、cookies、headers、auth/session boundaries。
9. Server Actions、forms、mutations、validation、optimistic UI。
10. Metadata、SEO、Open Graph、sitemap、robots、structured data。
11. Image、Font、Link、Script、Form 和 built-ins。
12. CSS Modules、global CSS、Tailwind、Sass、CSS-in-JS constraints。
13. TypeScript、typed routes、route params、NextConfig、generated types、strictness。
14. create-next-app、Next CLI、Turbopack、ESLint/Biome、package managers。
15. Unit、integration、component、Route Handler、e2e testing。
16. Vercel、self-hosting、runtimes、env vars、functions、streaming、ISR。
17. Performance 和 production architecture。
18. Full-stack capstone。

## 交付规则

交付前使用 `references/output-checklist.md` 生成证据表：

| 检查项 | 结果 | 证据 |
| --- | --- | --- |
| 具体检查 | PASS / FAIL / UNKNOWN | 文件、heading、selector、命令结果或路径映射 |

`PASS` 必须有可复现证据。未执行的 lint、type-check、test、build、route smoke test、cache test 或 deployment validation 标记 `UNKNOWN`，不得写成通过。

Final file inventory、files created/updated、commands run、limitations、personal-note conversion suggestions、Delivery Gate、Codex self-check、Codex 执行说明和本次修改摘要只出现在最终回复，不进入教材正文。Guide 中的 `PASS` / `FAIL` / `UNKNOWN` 只用于有证据的章节边界审计或 learner validation template；未实际执行时保持 `UNKNOWN`。
