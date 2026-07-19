# Chapter 1：Next.js 执行边界报告

这个项目用最小可运行示例区分构建过程、服务器运行时、请求处理和浏览器运行时。重点不是页面设计，而是能够解释每一段代码何时执行、在哪里执行，以及哪些值会进入浏览器。

## 哪些内容运行在服务器

- `app/layout.tsx`、`app/page.tsx` 和 `app/boundary-report/page.tsx` 默认都是 Server Component。
- `app/page.tsx` 调用 `connection()`，因此页面中的服务器时间戳和环境变量状态在请求处理期间生成。
- `app/boundary-report/page.tsx` 没有使用请求时 API，因而可以在 `next build` 阶段预渲染。
- `lib/serverEnv.ts` 使用 `server-only` 标记，并且只返回环境变量是否已配置，不返回秘密值。

Server Component 不等于一定在每次请求时执行。没有动态 API 的页面可能在构建时执行并生成静态输出；使用 `connection()`、`cookies()` 或 `headers()` 等请求时 API 会让相关渲染推迟到请求阶段。

## 哪些内容运行在浏览器

- `components/HydrationClock.tsx` 和 `components/ClientStoragePanel.tsx` 使用 `"use client"` 建立 Client Component 边界。
- React state、effect、事件处理器和 `localStorage` 操作属于浏览器侧交互逻辑。
- Client Component 的初始 HTML 仍可能由服务器预渲染，但 effect 和事件处理器只会在浏览器加载客户端 JavaScript 并完成 hydration 后运行。

## Route Handler 请求期间发生什么

`app/api/runtime-check/route.ts` 导出 `GET`，并明确使用 `nodejs` runtime。每次访问 `/api/runtime-check` 时，它都会在 Node.js 服务器运行时创建 JSON 响应，其中包含：

- 当前 runtime 标识；
- `window` 和 `document` 是否存在；
- 当前 `NODE_ENV`；
- 服务器秘密变量是否已配置；
- 请求处理时生成的 ISO 时间戳。

响应不会包含 `CHAPTER_ONE_SERVER_SECRET` 的值。

## hydration 期间创建什么

`HydrationClock` 的初始状态不包含时间戳。浏览器完成 hydration 后，`useEffect` 安排状态更新并创建 ISO 时间戳。因此：

- 服务器生成的初始 HTML 不包含该浏览器时间戳；
- 时间戳不是构建值，也不是服务器请求值；
- 禁用客户端 JavaScript 时，该值不会出现。

## 环境变量暴露规则

| 变量 | 边界 | 是否适合保存秘密 |
| --- | --- | --- |
| `CHAPTER_ONE_SERVER_SECRET` | 仅服务器 | 是，但真实值应放在未提交的本地环境文件或部署平台配置中 |
| `NEXT_PUBLIC_CHAPTER_ONE_LABEL` | 浏览器公开 | 否，它会在 `next build` 时内联到客户端 bundle |

`NEXT_PUBLIC_` 不是“允许客户端安全读取秘密”的开关，而是“把值公开给浏览器”的明确标记。任何密码、token、私钥或服务器凭据都不能使用这个前缀。

## 对比开发与生产

| 检查项 | `pnpm dev` | `pnpm build` 后运行 `pnpm start` |
| --- | --- | --- |
| 编译 | 按需编译，文件变化后重新处理 | 先生成固定的优化产物，再由生产服务器读取 |
| 静态页面 | 开发服务器按开发模式处理 | 符合条件的路由在构建阶段预渲染 |
| 动态页面 | 请求到达时运行 | 请求到达生产服务器时运行 |
| 错误信息 | 面向开发者，信息更详细 | 面向生产运行，输出和错误展示可能不同 |
| 环境变量 | 使用开发环境加载顺序 | 公共变量在构建时固化；服务器变量由构建或运行阶段读取 |

建议依次执行：

```bash
pnpm dev
pnpm build
pnpm start
```

对比首页服务器时间戳、hydration 时间戳、`/boundary-report` 的静态输出，以及 `/api/runtime-check` 每次请求生成的时间戳。

## 项目文件与执行边界映射

| 文件 | 执行边界 | 主要时机 |
| --- | --- | --- |
| `app/layout.tsx` | Server Component | 随路由在构建时或请求时渲染 |
| `app/page.tsx` | Server Component | 因 `connection()` 在请求时渲染 |
| `app/boundary-report/page.tsx` | Server Component | 可在构建时预渲染 |
| `app/api/runtime-check/route.ts` | Node.js Route Handler | 每次 `GET` 请求 |
| `app/globals.css` | 浏览器样式资源 | 构建处理后由浏览器加载 |
| `components/HydrationClock.tsx` | Client Component | 浏览器 hydration 后创建时间戳 |
| `components/ClientStoragePanel.tsx` | Client Component | 浏览器事件处理期间访问 `localStorage` |
| `lib/serverEnv.ts` | 仅服务器模块 | 被 Server Component 或 Route Handler 调用时 |
| `lib/boundaryFacts.ts` | 可序列化 TypeScript 数据 | 当前由 Server Component 在构建或请求渲染中读取 |
| `.env.example` | 环境变量模板 | 不作为真实秘密配置加载 |
| `README.md` | 项目文档 | 不执行 |
| `AGENTS.md` | Agent 项目规则 | 开发工具读取，不进入浏览器 bundle |
| `docs/execution-boundary-report.md` | 学习文档 | 不执行 |
| `package.json` | 工具配置 | package manager 和 Next.js CLI 读取 |
| `next.config.ts` | 构建和服务器配置 | `next dev`、`next build` 或 `next start` 启动时 |
| `tsconfig.json` | TypeScript 工具配置 | 类型检查和构建期间 |
| `eslint.config.mjs` | ESLint 配置 | 运行 lint 时 |
| `postcss.config.mjs` | CSS 构建配置 | CSS 构建期间 |

## 错误记录

### 在 `app/page.tsx` 中读取 `localStorage`

`app/page.tsx` 默认是 Server Component，而 Node.js 服务器没有 `localStorage`。应把访问移动到使用 `"use client"` 的小型 Client Component，并在 effect 或事件处理器中执行。

### 使用 `NEXT_PUBLIC_` 保存秘密

带有 `NEXT_PUBLIC_` 前缀的值会进入公开的客户端 bundle。应删除该前缀，并且只从服务器代码读取秘密变量。

### 认为 TypeScript 会让服务器拥有 `window`

TypeScript 的 DOM 类型只影响静态检查，不会在 Node.js 运行时创建 `window`。类型存在不代表运行时对象存在。

### 认为开发输出等于生产输出

开发服务器使用按需编译和开发诊断；生产流程先构建优化产物，再由 `next start` 提供服务。静态预渲染、错误展示、公共环境变量固化和性能特征都可能不同。
