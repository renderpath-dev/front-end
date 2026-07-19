# Next.js 第 1 章面试题：定位、项目结构与执行边界

## 使用方式

先用一到两句话直接回答，再补充“执行阶段、运行环境、数据流向、失败方式”四类证据。不要只背 API 名称。

## 基础题

### 1. Next.js 与 React 的关系是什么？

React 提供组件、状态与渲染模型；Next.js 在 React 之上提供路由、服务端渲染、构建、数据获取、服务端接口和部署适配。Next.js 是框架，React 是其核心 UI 库。

### 2. Next.js 是否等同于“React 加文件路由”？

不是。文件路由只是表面能力。Next.js 还控制服务端与客户端模块图、RSC Payload、HTML 生成、缓存、Route Handler、构建产物和运行时选择。

### 3. App Router 与 Pages Router 的主要区别是什么？

App Router 使用 `app/` 和 React Server Components，页面与布局默认是 Server Component；Pages Router 使用 `pages/`、`getServerSideProps`、`getStaticProps` 等旧数据获取模型。两者都受支持，但不能把 API 和边界规则混为一谈。

### 4. `app/page.tsx` 默认在哪里执行？

它默认是 Server Component，在服务端参与渲染。若它导入 Client Component，客户端边界从带有 `"use client"` 的模块开始，而不是让整个页面自动变成客户端组件。

### 5. `"use client"` 的真实作用是什么？

它声明客户端模块图入口。该模块及其静态依赖会成为客户端 bundle 的候选内容，并允许使用状态、事件、Effect 和浏览器 API。它不是“只在浏览器渲染”的绝对保证。

### 6. 为什么 Client Component 中仍可能不能在渲染函数顶层读取 `window`？

因为 Next.js 可能在服务端预渲染 Client Component 的初始 HTML。服务端没有 `window`。浏览器 API 应在事件处理器或 `useEffect` 等浏览器执行阶段读取。

### 7. Server Component 与 Server-Side Rendering 是否是同一个概念？

不是。Server Component 描述组件模块和数据在服务端执行及传输的模型；SSR 描述为请求生成 HTML 的渲染策略。Server Component 可以参与静态生成或请求时渲染，Client Component 也可能参与初始 HTML 的服务端预渲染。

### 8. RSC Payload、HTML 与客户端 JavaScript 分别做什么？

RSC Payload 描述 Server Component 树、客户端组件占位与传递的数据；HTML 提供初始可见内容；客户端 JavaScript 加载 Client Component 并通过 hydration 建立交互。

### 9. hydration 是什么？

浏览器已有服务端生成的 HTML 后，React 使用客户端组件代码把事件处理和状态连接到现有 DOM。它不是重新下载 HTML，也不等同于首次服务端渲染。

### 10. TypeScript 能否阻止所有服务端代码使用浏览器 API？

不能。TypeScript 的 DOM 类型可能让 `localStorage` 通过静态检查，但运行到 Node.js 环境仍会失败。类型在生成 JavaScript 时被擦除，运行时边界必须由架构和执行阶段保证。

## 项目结构题

### 11. `layout.tsx` 与 `page.tsx` 的职责分别是什么？

`layout.tsx` 提供共享 UI 并在导航间保留状态；`page.tsx` 让当前路由段可访问并定义该路由页面。根布局必须输出 `<html>` 和 `<body>`。

### 12. 为什么 `app/features/example/helper.ts` 不会自动创建 URL？

App Router 使用固定文件约定。普通文件和目录只负责组织；只有路由段出现 `page.tsx` 或 `route.ts` 才会公开相应页面或接口。

### 13. `route.ts` 与 `page.tsx` 能放在同一路由段吗？

不能同时处理同一路由。`page.tsx` 定义 UI 路由，`route.ts` 定义 HTTP Route Handler；同一段同时存在会产生冲突，应拆分路径。

### 14. `next.config.ts` 会进入浏览器 bundle 吗？

正常情况下不会。它由 Next.js 在配置、构建或服务启动阶段读取。它可以影响编译和运行行为，但不能当作浏览器运行时代码使用。

### 15. `next-env.d.ts` 应该手工修改吗？

不应该。它由 Next.js 生成，用于连接 Next.js 类型。需要调整类型检查时应修改源声明或 `tsconfig.json`，并让 `next dev`、`next build` 或 `next typegen` 重新生成。

## 环境与命令题

### 16. 普通环境变量与 `NEXT_PUBLIC_` 环境变量有什么区别？

普通变量默认只在服务端可见。`NEXT_PUBLIC_` 变量会被内联进客户端 JavaScript，因此不能包含秘密，并且其值在构建后被冻结。

### 17. 为什么不能把数据库密码写成 `NEXT_PUBLIC_DATABASE_PASSWORD`？

前缀明确授权 Next.js 把值放入客户端 bundle。浏览器用户可以检查网络与源代码获得它，因此这会直接泄露凭据。

### 18. `next dev`、`next build`、`next start` 的职责是什么？

`next dev` 启动带热更新和开发诊断的开发服务器；`next build` 生成并检查生产产物；`next start` 运行已经生成的生产构建。生产行为应使用后两步验证。

### 19. 为什么 Next.js 16 项目要单独保留 lint 脚本？

因为 `next build` 不再自动运行 ESLint。构建成功只能证明生产构建成功，不能证明 lint 通过；两项必须独立执行和报告。

### 20. Vercel 是运行 Next.js 的唯一方式吗？

不是。Next.js 支持 Node.js Server、Docker、静态导出等自托管方式。Vercel 提供零配置部署、预览 URL、环境集成和平台增强，但它是部署选择，不是框架运行的必要条件。

## 场景题

### 21. 页面需要读取用户浏览器中的主题设置，应该怎样划分边界？

保持页面和数据读取为 Server Component，把主题读取封装到最小 Client Component。在该组件的 `useEffect` 或用户事件中读取 `localStorage`，并为首次服务端输出提供稳定默认值。

### 22. 服务端需要判断密钥是否配置，但不能泄露密钥，应该怎样返回？

在仅服务端模块中读取变量，只返回布尔值或安全状态文本，不返回原值；可用 `server-only` 防止模块误入客户端图，并避免在日志中打印秘密。

### 23. 开发环境正常、生产环境失败，应先比较什么？

比较实际命令、环境变量、构建日志、动态与静态渲染决策、Node.js 版本、运行时和缓存行为。先用 `next build` 与 `next start` 本地复现，不要把 `next dev` 的成功当作生产证据。

### 24. 如何证明一个交互组件没有扩大不必要的客户端 bundle？

检查 `"use client"` 所在入口、它的静态导入链和传入 props。把纯展示、服务端数据访问与大型依赖留在 Server Component，只把必须交互的叶子组件放入客户端图。

### 25. 如何向团队报告一条执行边界？

至少写明文件路径、模块类型、构建阶段、请求阶段、浏览器阶段、可用 API、输入来源、输出去向、失败表现和验证命令。结论必须能由代码位置与运行结果复核。
