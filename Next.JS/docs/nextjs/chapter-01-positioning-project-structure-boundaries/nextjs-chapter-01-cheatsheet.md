# Next.js 第 1 章速查表：定位、项目结构与执行边界

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

## 一句话记忆

Next.js 是基于 React 的全栈 Web 框架。它不只运行浏览器组件，还负责构建、路由、服务端渲染、服务端接口与部署适配。

## 核心边界

| 问题 | 快速判断 |
|---|---|
| 这是 App Router 还是 Pages Router？ | `app/` 使用 App Router；`pages/` 使用 Pages Router。不要混用两套路由心智模型。 |
| 代码默认在哪里运行？ | App Router 的 `page.tsx`、`layout.tsx` 默认是 Server Component。 |
| 何时需要 `"use client"`？ | 组件需要状态、事件、Effect 或浏览器 API 时，在客户端模块图入口声明。 |
| `window`、`document`、`localStorage` 能否直接用？ | 只能在浏览器执行阶段使用；仅写进 Client Component 仍不等于可在首次渲染时安全读取。 |
| 普通环境变量能否进入客户端？ | 不能。只有 `NEXT_PUBLIC_` 前缀变量可进入客户端 bundle，而且值在构建时内联。 |
| TypeScript 类型是否在运行时存在？ | 不存在。类型检查后会被擦除，不会替你建立运行时边界。 |
| `next dev` 与 `next start` 是否相同？ | 不同。`next dev` 是开发服务器；`next start` 运行 `next build` 的生产产物。 |
| Vercel 是否是 Next.js 的必要条件？ | 不是。Next.js 可以自托管；Vercel 提供集成部署与预览环境。 |

## App Router 固定文件

| 文件 | 作用 |
|---|---|
| `app/layout.tsx` | 布局；根布局必须包含 `<html>` 和 `<body>`。 |
| `app/page.tsx` | 当前目录对应路由的页面。 |
| `app/loading.tsx` | 路由段加载界面。 |
| `app/error.tsx` | 路由段错误边界，通常是 Client Component。 |
| `app/not-found.tsx` | 未找到界面。 |
| `app/route.ts` | Route Handler，导出 `GET`、`POST` 等 HTTP 方法。 |
| `app/template.tsx` | 导航时重新创建实例的布局式 UI。 |

只有出现 `page.tsx` 或 `route.ts`，相应路由才会公开；普通目录可以只用于组织文件。

## 请求与渲染链

1. `next.config.ts` 在构建或启动配置阶段由 Node.js 读取。
2. Server Component 在服务端生成 React Server Component Payload。
3. Next.js 使用该结果生成初始 HTML。
4. 浏览器接收 HTML、RSC Payload 与客户端 JavaScript。
5. React 使用 `hydrateRoot` 为 Client Component 建立交互。
6. 事件、Effect、`window`、`document` 与 `localStorage` 在浏览器阶段工作。

## 最小服务端示例

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">app/page.tsx</span></div>

```tsx
export default function Page() {
  const secretConfigured = Boolean(process.env.INTERNAL_API_TOKEN);

  return <p>Secret configured: {String(secretConfigured)}</p>;
}
```
</div>

该文件默认是 Server Component。服务端可以读取非公开环境变量，但不应把秘密值渲染到返回内容中。

## 最小客户端示例

<div class="macos-code-window">
<div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">components/ClientCounter.tsx</span></div>

```tsx
"use client";

import { useState } from "react";

export function ClientCounter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount((current) => current + 1)}>
      Count: {count}
    </button>
  );
}
```
</div>

`"use client"` 建立客户端模块图边界。这个文件及其静态导入会被纳入客户端依赖图，因此应把边界放在最小交互子树上。

## 常用命令

| 命令 | 含义 |
|---|---|
| `pnpm dev` | 启动开发服务器，默认使用 Turbopack。 |
| `pnpm build` | 创建生产构建；Next.js 16 不会自动执行 ESLint。 |
| `pnpm start` | 运行已有生产构建。 |
| `pnpm lint` | 执行项目显式配置的 ESLint。 |
| `pnpm typecheck` | 执行 `tsc --noEmit`。 |
| `pnpm exec next typegen` | 生成路由类型，不启动开发服务器。 |

## 环境变量

| 写法 | 可见范围 | 关键限制 |
|---|---|---|
| `process.env.INTERNAL_API_TOKEN` | 服务端 | 不要返回、记录或渲染真实秘密值。 |
| `process.env.NEXT_PUBLIC_APP_MODE` | 服务端与客户端 bundle | 构建时内联；构建后晋升同一产物时不会重新读取。 |
| `.env*` | 项目根目录 | 即使使用 `src/`，环境文件仍放在项目根目录。 |
| `.env.example` | 文档化变量名 | 只能写占位值，不写真实秘密。 |

## 高频错误

| 错误 | 原因 | 修正方向 |
|---|---|---|
| 在 Server Component 读取 `localStorage` | Node.js 运行环境没有浏览器存储 API | 移到事件处理器或 `useEffect`。 |
| 在 Client Component 顶层读取 `window` | 客户端组件仍可能参与服务端预渲染 | 在浏览器执行阶段读取。 |
| 给所有组件加 `"use client"` | 扩大客户端模块图与 JavaScript 成本 | 只标记交互入口。 |
| 把秘密变量加 `NEXT_PUBLIC_` | 该值会进入浏览器可访问的 bundle | 保持服务端变量并仅返回安全派生结果。 |
| 只运行 `next build` 就声称 lint 通过 | Next.js 16 的构建不再自动运行 lint | 单独执行 `pnpm lint`。 |
| 修改 `next-env.d.ts` | 它是 Next.js 生成文件 | 修改 `tsconfig.json` 或源代码。 |
| 用 `next dev` 验证生产行为 | 开发服务器有热更新与开发检查 | 运行 `build` 后再运行 `start`。 |

## 本章真实代码位置

- `practices/chapter-01-positioning-project-structure-boundaries/`
- `projects/next-boundary-lab/`
- `docs/nextjs/chapter-01-positioning-project-structure-boundaries/`
