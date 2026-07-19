# Development 与 production 对比记录

## 环境信息

| 项目 | 记录 |
| --- | --- |
| Node.js | 待填写 |
| package manager | 待填写 |
| Next.js | 待填写 |
| React | 待填写 |
| 操作系统 | 待填写 |

## 路由对比

| Route | `pnpm dev` | `pnpm build` 分类 | `pnpm start` | 结论 |
| --- | --- | --- | --- | --- |
| `/` | 待填写 | 待填写 | 待填写 | request-time 或 build-time |
| `/boundary-report` | 待填写 | 待填写 | 待填写 | static 或 dynamic |
| `/api/runtime-check` | 待填写 | 待填写 | 待填写 | Route Handler request |

## 值的对比

| 值 | 创建位置 | development 观察 | production 观察 |
| --- | --- | --- | --- |
| server render timestamp | Server Component | 待填写 | 待填写 |
| hydration timestamp | Client Component effect | 待填写 | 待填写 |
| public label | client bundle build-time inline | 待填写 | 待填写 |
| secret status | server-only module | 待填写 | 待填写 |

## 结论模板

- 哪些行为只在 development tooling 中出现：待填写。
- 哪些值在 build 后冻结：待填写。
- 哪些值每次 request 重新生成：待填写。
- 哪些检查必须单独运行 lint/typecheck：待填写。
- 哪些结论仍需要真实 Vercel deployment：待填写。
