# Node.js 第 6 章认证与 API 安全面试题

## 1. Authentication 和 Authorization 有什么区别？

Authentication 证明请求是谁发的。Authorization 判断这个身份能否执行某个动作。比如 session cookie 查到 user id 只完成认证；访问 notebook 时还要检查 `ownerId`，访问 admin route 时还要检查 role。

## 2. 为什么数据库不能保存明文密码？

数据库泄露时，明文密码会直接泄露用户凭证。正确做法是保存 password verifier：注册时用 Argon2id、随机 salt 和参数生成 verifier；登录时用候选密码重新计算并比较。

## 3. Argon2id 的 hash format 为什么要保存参数？

密码哈希参数会随硬件和安全要求升级。hash format 保存 `memory`、`passes`、`parallelism`、`tagLength` 和 version 后，系统才能判断旧 hash 是否需要升级。

## 4. Opaque session token 和 JWT 的核心差异是什么？

Opaque session token 本身不包含业务 claims，服务器通过 session store 判断有效性。JWT 是自包含 claims，验证签名和过期时间后可以得到 claims。JWT 如果没有额外撤销机制，logout 后立即失效更难。

## 5. 为什么数据库只存 session token hash？

如果数据库保存明文 token，数据库泄露后攻击者可以直接把 token 当 cookie 使用。保存 hash 后，认证时用 cookie token 重新计算 hash 查询 session row，数据库泄露不能直接变成登录态。

## 6. `HttpOnly` Cookie 能解决什么，不能解决什么？

`HttpOnly` 防止浏览器 JavaScript 读取 cookie，降低 XSS 后直接窃取 session token 的风险。它不能阻止浏览器自动带 cookie 发请求，所以不能单独解决 CSRF。

## 7. `SameSite=Lax` 是否可以替代 CSRF token？

不能。`SameSite` 是重要防线，但它依赖浏览器行为和具体请求场景。本章 mutation 使用 session-bound CSRF token，让服务器对危险方法有明确的请求意图证据。

## 8. Credentialed CORS 为什么不能使用 wildcard origin？

浏览器规范不允许 credentialed response 搭配 `Access-Control-Allow-Origin: *` 暴露给前端。服务端必须使用 allowlist，并对允许的 origin 返回具体 origin。

## 9. Helmet 在 Express 应用中解决什么问题？

Helmet 设置一组安全相关 HTTP response headers，降低默认 header 配置风险。它不替代认证、授权、CSRF、输入校验或业务逻辑。

## 10. 登录限流和账号枚举防护有什么区别？

登录限流降低攻击者在线猜密码的速度。账号枚举防护减少响应差异，避免攻击者判断邮箱是否存在。两者互补，不能互相替代。

## 11. Owner authorization 和 RBAC 有什么区别？

Owner authorization 判断资源是否属于当前用户，例如 `notebook.ownerId === auth.userId`。RBAC 判断角色是否允许访问某类能力，例如 `ADMIN` 能访问 admin route。一个系统通常同时需要两者。

## 12. 为什么认证上下文适合挂在 `response.locals`？

`response.locals` 是当前请求生命周期内的局部状态，不会跨请求共享。认证中间件把解析出的 `AuthContext` 放进去，后续 middleware 和 controller 可以读取，但不会污染全局状态。

## 13. Prisma unique constraint 在认证项目中有什么作用？

`User.email` 唯一保证同一邮箱只有一个账户；`Session.tokenHash` 唯一保证 token hash 不重复；`Notebook` 的 `@@unique([ownerId, name])` 表示 notebook 名称只在用户自己的空间内唯一。

## 14. Zod 在认证系统中负责什么？

Zod 负责 runtime input validation。TypeScript 只约束源码，不能证明 HTTP body 可信。请求进入 controller 之前需要用 Zod 校验 email、password、UUID、query 等外部输入。

## 15. 统一错误响应为什么重要？

统一错误响应让客户端处理一致，也减少内部信息泄露。认证失败、授权失败、校验失败和数据库约束失败应映射为受控的 public error code，而不是暴露堆栈或 ORM 内部错误。

## 16. 如何解释本章注册到创建 note 的完整机制链？

注册时服务端验证输入、生成 Argon2id verifier、创建 user、创建 session、设置 cookie。创建 note 时浏览器带 cookie，服务端查 session，验证 CSRF token，检查 notebook owner，然后写入 note。

## 17. 为什么本章不把 JWT 作为主认证方案？

本章目标是学习可撤销的 cookie session、安全 cookie、CSRF 和数据库 session row。JWT 是重要边界，但会引入 claims 设计、签名密钥轮换、audience/issuer、撤销策略等额外主题，所以只作为后续边界讨论。

## 18. 如果生产环境要启用 `__Host-` Cookie，需要满足什么？

Cookie 名称以 `__Host-` 开头，必须设置 `Secure`，必须 `Path=/`，并且不能设置 `Domain`。这通常要求 HTTPS 环境和正确的反向代理配置。
