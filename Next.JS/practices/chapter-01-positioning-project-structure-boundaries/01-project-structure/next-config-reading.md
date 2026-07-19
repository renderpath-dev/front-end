# `next.config.ts` 阅读练习

## 当前文件

当前学习项目和最终小项目都使用类型化的 `next.config.ts`。配置对象为空，表示本章不额外启用实验能力，也不修改默认路由、构建或输出行为。

## 边界判断

| 问题 | 结论 |
| --- | --- |
| 谁读取配置 | Next.js CLI、开发服务器和构建过程 |
| 何时读取 | `next dev`、`next build`、`next start` 启动或构建阶段 |
| 是否进入 browser bundle | 否 |
| 是否是 React API | 否，它是 Next.js framework configuration |
| TypeScript 做什么 | `NextConfig` 检查配置 key 和 value 的静态关系 |
| TypeScript 不做什么 | 不证明部署平台支持某项配置，也不验证运行时外部服务 |

## 本章关键观察

当前配置没有 `cacheComponents: true`。因此第 1 章不教学 `"use cache"`、PPR 或 Cache Components 的具体缓存模型，避免把后续缓存章节提前混入基础执行边界。

## 阅读顺序

1. 确认文件位于项目根目录，和 `package.json` 同级。
2. 确认 default export 的值满足 `NextConfig`。
3. 只解释实际存在的 key。
4. 对版本敏感的 key，先查本地 `node_modules/next/dist/docs/`，再查线上官方文档。
5. 不把 Vercel 平台配置默认等同于 Next.js 自托管配置。
