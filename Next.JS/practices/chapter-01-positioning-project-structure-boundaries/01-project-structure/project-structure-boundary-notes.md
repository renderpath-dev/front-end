# 项目结构边界笔记

## 四类结构

| 结构类型 | 示例 | 判断重点 |
| --- | --- | --- |
| 路由结构 | `app/page.tsx`、`app/api/runtime-check/route.ts` | Next.js special file 是否创建公开入口 |
| 模块结构 | `components/`、`lib/` | import 方向是否跨越 server/client boundary |
| 工具结构 | `package.json`、`tsconfig.json`、`next.config.ts` | 哪个 CLI 或 checker 读取，是否参与 runtime |
| 文档结构 | `docs/`、`README.md`、`AGENTS.md` | 为学习者或工具提供说明，不进入应用运行时 |

## `app`、`public`、`src`

- `app/` 是 App Router 的路由根目录。
- `pages/` 属于 Pages Router；本章只作边界识别，不混用它的 API。
- `public/` 保存按根 URL 提供的静态资源。
- `src/` 是可选的源码容器；使用后通常形成 `src/app/`。
- 即使使用 `src/`，`.env*`、`package.json`、`next.config.ts` 等仍放在项目根目录。

## 识别信号

- 看见固定文件名时，先查 Next.js file convention。
- 看见 `"use client"` 时，沿 imports 追踪 client module graph。
- 看见 `process.env.NEXT_PUBLIC_*` 时，检查是否会在 `next build` 期间内联。
- 看见 `window`、`document`、`localStorage` 时，确认代码只在 browser runtime 执行。
- 看见 TypeScript DOM 类型通过时，不要把它当成 server runtime 存在浏览器对象的证据。
