# Build time 与 request time 对比

## 先问触发条件

同一个 Server Component 概念可以在构建阶段或请求阶段执行。判断依据不是文件扩展名，而是当前 route 是否能被预渲染，以及是否读取请求时数据或调用动态 API。

| 场景 | 触发 | 值的创建时机 | 可观察信号 |
| --- | --- | --- | --- |
| 静态 boundary report | `next build` | 构建期间 | build 输出显示 `○` |
| 调用 `connection()` 的首页 | browser request | 每次请求 | build 输出显示 `ƒ` |
| Route Handler 的 `generatedAt` | HTTP `GET` | handler 收到请求后 | 连续请求返回不同 ISO timestamp |
| Client hydration timestamp | browser hydration | `useEffect` 运行后 | 初始 HTML 没有最终 timestamp |

## 关键规则

- Server Component 表示 server-side module/runtime boundary，不等于“每次请求必定执行”。
- `next build` 可以执行可静态化的 Server Component。
- 请求时 API 会让相关 rendering 推迟到 request time。
- Client Component 仍可能有预渲染 HTML，但 effects 和 event handlers 只在浏览器运行。
- TypeScript 不能根据一个 `Date` value 自动证明它来自 build time 还是 request time。
