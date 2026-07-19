# `package.json` scripts 阅读练习

## 脚本映射

| Script | 实际 CLI | Owner | 输入 | 输出 |
| --- | --- | --- | --- | --- |
| `dev` | `next dev` | Next.js tooling | source files、config、env | development server |
| `build` | `next build` | Next.js tooling | source graph、route graph、config、env | `.next` production output |
| `start` | `next start` | Next.js production server | 已存在的 `.next` | HTTP server |
| `lint` | `eslint .` | ESLint tooling | source/config | diagnostics |
| `typecheck` | `tsc --noEmit` | TypeScript compiler | `.ts`、`.tsx`、`.d.ts`、`tsconfig.json` | diagnostics，不输出 JavaScript |

## 练习问题

1. 删除 `build` script 后，framework 仍然存在，但团队失去统一的 package-manager command。
2. `next build` 成功不代表 `eslint .` 成功。
3. `tsc --noEmit` 不启动 server，也不会验证真实 HTTP request。
4. `next start` 之前没有 `.next` production output 时，应先构建而不是把错误归因于 React。
