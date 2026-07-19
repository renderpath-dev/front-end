# `next dev`、`next build`、`next start`

| 命令 | 所属阶段 | 主要证明 | 不能证明 |
| --- | --- | --- | --- |
| `pnpm dev` | development tooling + development server | HMR、开发错误报告、路由能在开发模式运行 | production build 一定成功 |
| `pnpm build` | production build | 编译、Next.js type check、静态/动态 route 分类、生产产物生成 | ESLint 已运行；Next.js 16 不再自动 lint |
| `pnpm start` | production Node.js server | 已生成的 `.next` 产物能被生产服务器提供 | Vercel deployment 已验证 |

## 推荐顺序

1. 单独运行 `pnpm lint`。
2. 单独运行 `pnpm typecheck`，如果项目提供该 script。
3. 运行 `pnpm build`。
4. 构建成功后运行 `pnpm start`。
5. 用浏览器或 HTTP client 检查 page 和 Route Handler。

## 观察记录

把 build 输出中的 `○` 和 `ƒ` 记录下来：`○` 表示静态预渲染，`ƒ` 表示按需 server rendering。不要把 development server 的一次成功刷新当成 production behavior 的完整证据。
