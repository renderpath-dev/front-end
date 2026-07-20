# Node.js 第 6 章认证与 API 安全速查表

## 1. 核心边界

| 主题 | 关键判断 | 本章文件 |
| --- | --- | --- |
| Authentication | 请求是否能证明用户身份 | `src\shared\auth\authenticate-session.ts` |
| Authorization | 已认证用户是否能执行动作 | `src\shared\auth\authorize-owner.ts`、`src\shared\auth\authorize-role.ts` |
| Password verifier | 数据库只存不可逆 verifier | `src\shared\auth\password-hashing.ts` |
| Opaque session | Cookie 存 token，数据库存 token hash | `src\shared\auth\session-token.ts` |
| CSRF | mutation 需要 session-bound token | `src\shared\auth\csrf.ts` |
| Credentialed CORS | credential request 不能配 `*` origin | `src\shared\middleware\cors.ts` |
| Security headers | Helmet 设置默认安全头 | `src\shared\middleware\security-headers.ts` |
| Login rate limit | 降低在线猜测速度 | `src\shared\middleware\rate-limit.ts` |

## 2. 密码处理

- 注册时：`password` → `hashPassword` → `passwordHash`。
- 登录时：`password` + `storedHash` → `verifyPassword` → boolean。
- 不保存明文密码。
- 不保存可逆加密密码。
- hash format 要带 algorithm、version、parameters、salt、hash。
- 参数升级要靠 metadata 判断，不要盲目覆盖旧 hash。

推荐表达：

- Argon2id 是 memory-hard password hashing algorithm。
- salt 必须随机生成。
- verifier 比较应避免泄露明显时序差异。

## 3. Session 与 Cookie

Session token 处理：

1. `randomBytes(32)` 生成 token。
2. 明文 token 只进入 `Set-Cookie`。
3. 数据库只存 `sha256(token)`。
4. 请求进来时重新计算 hash。
5. session row 检查 `expiresAt` 和 `revokedAt`。

Cookie 属性：

- `HttpOnly`：前端脚本不能读取。
- `Secure`：仅 HTTPS 发送。
- `SameSite=Lax`：降低部分跨站自动发送风险。
- `Path=/`：限定路径范围。
- `__Host-`：生产 HTTPS 下可用，要求 `Secure`、`Path=/`、无 `Domain`。

## 4. CSRF

CSRF 的根因是浏览器会自动带 cookie。攻击站点不需要读 cookie，也能诱导浏览器发请求。

本章策略：

- `GET /auth/csrf` 生成 token。
- 数据库 session row 只存 CSRF token hash。
- mutation 请求必须带 `x-csrf-token`。
- 服务端重新 hash 并比较。

不要把 `SameSite` 当作唯一 CSRF 防护。

## 5. CORS

Credentialed CORS 必须满足：

- 前端请求使用 credential mode。
- 服务端返回具体 `Access-Control-Allow-Origin`。
- 服务端返回 `Access-Control-Allow-Credentials: true`。
- 不能使用 `Access-Control-Allow-Origin: *`。

CORS 不等于认证，也不等于授权。它主要是浏览器响应暴露规则。

## 6. Express 路由组合

安全路由的推荐顺序：

1. `requestId`
2. `securityHeaders`
3. `corsMiddleware`
4. `express.json`
5. public auth routes
6. protected routes with `authenticateSession`
7. mutation routes with `requireCsrfToken`
8. owner or role authorization
9. controller/service/repository
10. `notFound`
11. `errorMiddleware`

## 7. 常见错误

| 错误说法 | 正确说法 |
| --- | --- |
| 登录了就能访问所有资源 | 登录只证明身份，资源仍要授权 |
| Cookie 设置 `HttpOnly` 就不会被 CSRF | `HttpOnly` 防读取，不防自动发送 |
| CORS 可以保护 API 不被攻击 | CORS 是浏览器边界，服务端仍需认证授权 |
| JWT 天然比 session 安全 | JWT 和 session 解决不同问题，撤销边界不同 |
| 密码复杂度越复杂越安全 | 当前推荐更重视长度、阻止列表和 verifier 安全 |

## 8. 本章命令

```bash
cd mini-projects/secure-notes-auth-api
npm install
npm run prisma:generate
npm run typecheck
npm test
```

`npm test` 需要可用的 PostgreSQL 测试数据库，并且 `DATABASE_URL` 应指向可重置的测试库。
