# App Router 文件映射练习

## 练习目标

看到一个新的 App Router 项目时，先判断文件是否属于路由约定、普通模块、工具配置或静态资源，而不是先猜它会不会进入浏览器。

## 文件映射

| 路径 | 所有者 | 是否创建 URL | 主要执行边界 |
| --- | --- | --- | --- |
| `app/layout.tsx` | Next.js 文件约定 + React 组件 | 否 | Server Component，包裹子路由 |
| `app/page.tsx` | Next.js 文件约定 + React 组件 | 是，公开 `/` | 默认在服务器执行 |
| `app/boundary-report/page.tsx` | Next.js 文件约定 + React 组件 | 是，公开 `/boundary-report` | 默认在服务器执行 |
| `app/api/runtime-check/route.ts` | Next.js Route Handler 约定 | 是，公开 HTTP endpoint | Node.js server runtime |
| `components/HydrationClock.tsx` | React Client Component | 否 | 初始预渲染后在浏览器 hydration |
| `lib/serverEnv.ts` | 普通 TypeScript module | 否 | 只允许 server module graph |
| `public/example.svg` | Next.js 静态资源目录约定 | 通过 `/example.svg` 访问 | 构建/部署后由静态资源服务返回 |

## 判断步骤

1. 先定位 `app/` 或 `src/app/`，确认当前使用 App Router。
2. 把文件夹理解为 route segment 候选，而不是立即理解为公开 URL。
3. 查找 `page.tsx` 或 `route.ts`；只有出现公开入口文件，segment 才能形成可访问路由。
4. 再沿 import 方向判断 module graph：没有 `"use client"` 的页面默认属于 server graph。
5. 最后判断浏览器拿到的是 HTML、RSC Payload、Client Component JavaScript、静态资源还是 Web `Response`。

## 自检

- 空文件夹 `app/reports/` 不会单独公开 `/reports`。
- `app/reports/page.tsx` 会公开 `/reports`。
- `app/reports/route.ts` 会公开 HTTP handler，但不能与同一 segment 的 `page.tsx` 共存。
- 放在 `app/reports/helpers.ts` 的普通模块不会因为位于 `app/` 内就自动成为 route。
