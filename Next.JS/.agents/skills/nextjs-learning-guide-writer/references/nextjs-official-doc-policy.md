# Next.js 官方文档策略

## 目的

在写任何 Next.js 学习指导前，用项目版本、本地文档和当前官方文档共同约束结论。不要把模型记忆、博客或旧书当成当前行为的证据。

## 来源优先级

按以下顺序研究：

1. 用户当前任务、最近的 `AGENTS.md` 和真实项目文件。
2. `package.json`、lockfile、`next.config.*`、`tsconfig.json`、lint/test 配置，以及真实 `app/` / `pages/` 树。
3. 当前安装包中的 `node_modules/next/dist/docs/`。它是项目锁定版本的首要 Next.js 行为参考。
4. 当前线上 `https://nextjs.org/docs`。它是最新 Next.js 行为和迁移方向的首要参考。
5. Vercel 官方文档，仅用于 Vercel 平台、部署、Functions、Routing Middleware、CDN、区域和项目配置行为。
6. `https://react.dev`，用于 React Server Components、Client Components、directives、Suspense、hydration、serialization 和 React runtime 行为。
7. TypeScript 官方文档，用于 TSX、类型系统、type erasure、module resolution、strictness 和 emitted JavaScript。
8. MDN，用于 Web `Request`、`Response`、`URL`、`Headers`、cookies、browser storage 和其他平台 API。
9. 项目实际使用的测试工具、linter、formatter、package manager、hosting adapter 的官方文档。

不要沿用 React 通用技能中“local project materials first”后直接进入泛框架文档的顺序。Next.js 必须同时核对安装版本的 bundled docs、线上 Next.js docs、React 所有权边界和部署平台边界。

## 版本对齐规则

在写作前记录：

| 项目 | 必须确认的证据 |
| --- | --- |
| Next.js | `package.json` / lockfile 中的精确版本和 bundled docs |
| React | `react`、`react-dom` 版本，以及 Next.js App Router 的 React 集成说明 |
| TypeScript | 版本、`tsconfig.json`、Next.js generated types |
| Router | `app/`、`src/app/`、`pages/` 或 `src/pages/` 的实际存在情况 |
| Cache model | `cacheComponents` 是否启用，以及当前版本对应的 caching docs |
| Runtime | 目标文件的 runtime 配置、官方支持范围和部署平台限制 |
| Tooling | 实际 scripts、Turbopack/Webpack、ESLint/Biome、test runner、package manager |
| Deployment | Vercel、自托管或其他 adapter 的真实目标 |

当线上文档版本高于项目安装版本时：

- 先写项目锁定版本能够支持的行为。
- 把线上较新行为标为“较新版本行为”或迁移提示。
- 未在 bundled docs、changelog 或项目实测中确认的内容标为 `Verification Needed`。
- 不要因为线上文档使用某 API，就断言当前项目已支持它。

## Next.js 官方文档入口

每次只读取与当前章节相关的页面，但至少从以下入口选择：

- `https://nextjs.org/docs`
- `https://nextjs.org/docs/app`
- `https://nextjs.org/docs/app/getting-started/installation`
- `https://nextjs.org/docs/app/getting-started/project-structure`
- `https://nextjs.org/docs/app/getting-started/layouts-and-pages`
- `https://nextjs.org/docs/app/getting-started/server-and-client-components`
- `https://nextjs.org/docs/app/getting-started/fetching-data`
- `https://nextjs.org/docs/app/getting-started/caching`
- `https://nextjs.org/docs/app/getting-started/revalidating`
- `https://nextjs.org/docs/app/getting-started/route-handlers`
- `https://nextjs.org/docs/app/getting-started/proxy`
- `https://nextjs.org/docs/app/getting-started/metadata-and-og-images`
- `https://nextjs.org/docs/app/getting-started/deploying`
- `https://nextjs.org/docs/app/api-reference/file-conventions`
- `https://nextjs.org/docs/app/api-reference/directives`
- `https://nextjs.org/docs/app/api-reference/config/next-config-js`
- `https://nextjs.org/docs/app/api-reference/turbopack`
- `https://nextjs.org/docs/app/api-reference/config/typescript`
- `https://nextjs.org/docs/app/api-reference/config/eslint`
- `https://nextjs.org/docs/pages`，仅在 Pages Router 或迁移内容中使用。

优先读取官方页面提供的 Markdown 版本或 bundled Markdown，以便准确搜索 API 名、版本说明和 deprecation。

## Vercel 官方文档入口

只有章节涉及 Vercel 时才读取：

- `https://vercel.com/docs/frameworks/full-stack/nextjs`
- `https://vercel.com/docs/deployments`
- `https://vercel.com/docs/functions`
- `https://vercel.com/docs/routing-middleware`
- `https://vercel.com/docs/project-configuration`

必须区分：

- Next.js framework behavior。
- Vercel managed platform behavior。
- self-hosted Next.js behavior。
- 其他平台 adapter behavior。

不要把 Vercel 的 durable cache、CDN、region、Function scaling 或 preview deployment 当成 Next.js 自托管默认能力。

## React 官方文档入口

根据章节选择：

- `https://react.dev/reference/rsc/server-components`
- `https://react.dev/reference/rsc/use-client`
- `https://react.dev/reference/rsc/use-server`
- `https://react.dev/reference/react/Suspense`
- `https://react.dev/reference/react-dom/client/hydrateRoot`

保持所有权准确：

- Server Components 是 React architecture，由 Next.js 编排和集成。
- `"use client"` 划分 module dependency graph，不等同于 render tree 中的所有视觉后代。
- `"use server"` 标记 Server Functions，不标记 Server Components。
- hydration mismatch 是 React hydration 规则被违反，不只是 Next.js routing 问题。

## TypeScript 与 MDN 入口

按需使用：

- `https://www.typescriptlang.org/docs/handbook/jsx.html`
- `https://www.typescriptlang.org/docs/handbook/2/everyday-types.html`
- `https://www.typescriptlang.org/tsconfig/moduleResolution.html`
- `https://www.typescriptlang.org/tsconfig/strict.html`
- `https://developer.mozilla.org/en-US/docs/Web/API/Request`
- `https://developer.mozilla.org/en-US/docs/Web/API/Response`
- `https://developer.mozilla.org/en-US/docs/Web/API/URL`
- `https://developer.mozilla.org/en-US/docs/Web/API/Headers`
- 与章节实际使用的 browser API 对应的 MDN 页面。

不要让 TypeScript 类型替代 runtime validation。`params`、request body、FormData、cookies、headers、environment variables、database results 和第三方 API responses 在运行时仍是不可信值或外部值。

## 版本敏感检查表

在写定论前，逐项判断是否与章节相关并验证：

- App Router 与 Pages Router 的 API 所属。
- `page`、`layout`、`template`、`loading`、`error`、`not-found`、`route`、`proxy` 和 metadata file conventions。
- `middleware` 到 `proxy` 的命名与 runtime 变化。
- `params`、`searchParams`、`cookies()`、`headers()` 的同步或异步签名。
- Server/Client module graph、RSC Payload、serialization 和 hydration。
- `fetch` request memoization 与 persistent caching 是否不同。
- Cache Components 是否启用。
- `"use cache"`、`cacheLife`、`cacheTag`、`revalidatePath`、`revalidateTag`、`updateTag` 的可用位置和效果。
- ISR、PPR/static shell、streaming 和 Suspense 的当前关系。
- Route Handler caching default 和 Cache Components 下的差异。
- Node.js runtime、Edge runtime、Proxy runtime 和 deployment runtime。
- `next dev` / `next build` 使用的 bundler，以及 Turbopack 是否执行 type checking。
- `next lint`、ESLint CLI、Biome 或其他 lint 流程的当前状态。
- generated route types、`next typegen`、`PageProps`、`LayoutProps`、`RouteContext`。
- Vercel 与 self-hosting 的 cache persistence、CDN、regions、functions 和 streaming。

## 过时资料策略

把下列内容当作高风险历史资料，除非目标章节明确讨论旧版本：

- 以 `getInitialProps` 作为默认入门路径。
- 把 Pages Router 当作唯一或默认不加说明的 router。
- 对当前 Next.js 16 项目仍无条件使用 `middleware.ts`。
- 沿用旧版 caching defaults 或把 request memoization 叫作持久缓存。
- 把旧 ISR 模型直接套到 Cache Components。
- 把同步 `params` / `searchParams` 示例当作当前签名。
- 假设 Edge runtime 支持 Node.js 全部 API。
- 假设 Vercel 和 self-hosting 具备相同缓存持久化与全球分发。
- 假设 Turbopack 会完成 TypeScript type checking。
- 在 Next.js 16 中继续把 `next lint` 写成可用命令。

在文档中说明旧规则属于哪个 router 或版本，以及当前替代规则。不要只写“已过时”而不解释迁移影响。

## 访问失败和不确定性

官方页面无法访问时：

1. 尝试对应的官方 Markdown 页面或 bundled docs。
2. 记录无法核对的 URL 和具体行为。
3. 在指南相关位置写 `Verification Needed`。
4. 在最终回复的“仍需人工核对”中重复列出。
5. 不要用博客、搜索摘要或模型记忆把 `UNKNOWN` 改成 `PASS`。

## 最终来源报告

最终回复必须分别列出：

- 本地资料：精确文件路径和版本。
- Next.js 官方文档：实际打开的 URL。
- 其他官方文档：Vercel、React、TypeScript、MDN 或具体工具的 URL。
- 未访问或未能确认的官方资料。
- 因版本差异而保留的限制。
