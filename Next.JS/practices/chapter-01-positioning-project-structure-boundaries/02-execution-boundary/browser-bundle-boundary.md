# Browser bundle 边界

## 核心结论

`"use client"` 划分的是 module dependency graph，不是视觉 render tree。被标记文件及其传递 imports 可能进入 browser bundle；作为 `children` 从 Server Component 传入的已渲染结果不会因为视觉嵌套而自动变成 Client Component module。

## 追踪方法

| 检查 | 问题 |
| --- | --- |
| directive | 文件顶部是否存在 `"use client"` |
| imports | 它直接或间接 import 了哪些模块 |
| props | Server Component 传入的 props 是否可序列化 |
| browser APIs | `window`、`document`、`localStorage` 是否只在浏览器路径执行 |
| secrets | client graph 是否 import 了 server-only module |
| output | browser 是否需要下载对应 JavaScript 才能交互 |

## 本章例子

- `HydrationClock.tsx` 进入 client graph，因为它使用 `useEffect` 和 `useState`。
- `ClientStoragePanel.tsx` 进入 client graph，因为事件处理器需要 `localStorage`。
- `serverEnv.ts` 使用 `server-only` guard，不允许被 Client Component import。
- `app/page.tsx` 保持 Server Component，只组合两个较深的 Client Component。

## 生产识别信号

- 根 layout 过早添加 `"use client"`，会把大量传递 imports 拉入 client graph。
- bundle 中出现数据库 SDK 或 secret-reading helper，说明 server/client import boundary 可能被破坏。
- 组件在 build 或 server render 时报 `window is not defined`，说明 browser-only path 没有被隔离。
