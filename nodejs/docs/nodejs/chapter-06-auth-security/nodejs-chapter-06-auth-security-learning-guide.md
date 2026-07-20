# Node.js 第 6 章：认证、授权、Cookie Session 与 API 安全边界

<style>
.macos-code-window {
  overflow: hidden;
  border: 1px solid #30363d;
  border-radius: 12px;
  background: #0d1117;
  margin: 16px 0;
}

.macos-code-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0 12px;
  background: #161b22;
  border-bottom: 1px solid #30363d;
}

.macos-code-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  display: inline-block;
  flex: 0 0 auto;
}

.macos-code-dot-red {
  background: #ff5f57;
}

.macos-code-dot-yellow {
  background: #ffbd2e;
}

.macos-code-dot-green {
  background: #28c840;
}

.macos-code-title {
  margin-left: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  color: #c9d1d9;
}

.macos-code-titlebar + pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  background: transparent;
  border-radius: 0 0 12px 12px;
}

.macos-code-titlebar + pre code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
}
</style>

## 目录

- [本章代码定位索引](#本章代码定位索引)
- [0. 章前定位](#0-章前定位)
- [1. 学习目标](#1-学习目标)
- [2. 前置知识](#2-前置知识)
- [3. 环境与运行基线](#3-环境与运行基线)
- [4. 第一性原理](#4-第一性原理)
- [5. 技术边界模型](#5-技术边界模型)
- [6. 底层机制模型](#6-底层机制模型)
- [7. 核心术语](#7-核心术语)
- [8. 本章实践路线](#8-本章实践路线)
- [9. 核心教学](#9-核心教学)
  - [9.1 Authentication、authorization、session、token 的边界](#section-9-1)
  - [9.2 Password 不是普通字符串：secret、verifier、hash、salt、cost factor](#section-9-2)
  - [9.3 Argon2id password hashing with Node.js crypto](#section-9-3)
  - [9.4 Password hash format、verify、upgrade boundary](#section-9-4)
  - [9.5 Registration flow：validate input、hash password、persist user](#section-9-5)
  - [9.6 Login flow：generic error、verify password、create session](#section-9-6)
  - [9.7 Session token：opaque random token 与 token hash](#section-9-7)
  - [9.8 Cookie session boundary：Set-Cookie、HttpOnly、Secure、SameSite、Path、Max-Age](#section-9-8)
  - [9.9 `__Host-` cookie prefix 与 host-only session cookie](#section-9-9)
  - [9.10 Session persistence：sessions table、expiresAt、revokedAt](#section-9-10)
  - [9.11 Logout：server-side revocation 与 clearing cookie](#section-9-11)
  - [9.12 Authentication middleware：cookie → token hash → database session → auth context](#section-9-12)
  - [9.13 Authorization：owner-based resource access](#section-9-13)
  - [9.14 Role-based authorization：USER / ADMIN contrast](#section-9-14)
  - [9.15 CSRF threat model for cookie-based auth](#section-9-15)
  - [9.16 Session-bound CSRF token for state-changing requests](#section-9-16)
  - [9.17 CORS credentials：allowed origin、credentials、wildcard mistake](#section-9-17)
  - [9.18 Security headers with Helmet](#section-9-18)
  - [9.19 Login rate limiting and enumeration-resistant errors](#section-9-19)
  - [9.20 JWT boundary：signed claims are not a session store](#section-9-20)
  - [9.21 Chapter integration: secure-notes-auth-api](#section-9-21)
- [10. API 与规则索引](#10-api-与规则索引)
- [11. 常见错误对照表](#11-常见错误对照表)
- [12. 调试与验证方法](#12-调试与验证方法)
- [13. 分项练习说明](#13-分项练习说明)
- [14. 最终迷你项目](#14-最终迷你项目)
  - [14.1 项目目标](#141-项目目标)
  - [14.2 项目边界](#142-项目边界)
  - [14.3 API 路由设计](#143-api-路由设计)
  - [14.4 运行与测试命令](#144-运行与测试命令)
  - [14.5 完整项目代码](#145-完整项目代码)
- [15. 知识迁移与真实项目场景](#15-知识迁移与真实项目场景)
- [16. 本章复盘任务](#16-本章复盘任务)
- [17. 最终心智模型](#17-最终心智模型)
- [18. 官方资料](#18-官方资料)

## 本章代码定位索引

| 学习目标 | 文件或片段 | 可观察证据 |
| --- | --- | --- |
| 密码策略 | `practices\06-auth-security\01-passwords\password-policy.ts` | 短密码返回 rejected reasons |
| Argon2id 密码哈希 | `mini-projects\secure-notes-auth-api\src\shared\auth\password-hashing.ts` | 数据库存储 `secure-notes$argon2id$...` verifier |
| Session token hash | `mini-projects\secure-notes-auth-api\src\shared\auth\session-token.ts` | Cookie 持有 token，数据库持有 token hash |
| Cookie 属性 | `mini-projects\secure-notes-auth-api\src\shared\cookies\session-cookie.ts` | `HttpOnly`、`SameSite=Lax`、`Path=/`、`maxAge` |
| Error middleware | `mini-projects\secure-notes-auth-api\src\shared\errors\error-middleware.ts` | `headersSent` 后调用 `next(error)` |
| Admin role contrast | `mini-projects\secure-notes-auth-api\src\modules\users\users.admin.ts` | `GET /admin/users` 只允许 `ADMIN` |
| Nested note collection | `mini-projects\secure-notes-auth-api\src\modules\notes\notebook-notes.routes.ts` | `GET/POST /notebooks/:notebookId/notes` |
| Top-level note resource | `mini-projects\secure-notes-auth-api\src\modules\notes\notes.routes.ts` | `GET/PATCH/DELETE /notes/:noteId` |
| CSRF 防护 | `mini-projects\secure-notes-auth-api\src\shared\auth\csrf.ts` | mutation 缺少 `x-csrf-token` 返回 403 |
| Credentialed CORS | `mini-projects\secure-notes-auth-api\src\shared\middleware\cors.ts` | allowlist origin 得到 credential headers |
| Protected-resource tests | `mini-projects\secure-notes-auth-api\tests\protected-notes.integration.test.ts` | owner、CSRF、admin role、top-level note 被覆盖 |

## 0. 章前定位

这一章接在 PostgreSQL 与 Prisma 持久化之后。前一章已经能把 notebook 和 note 存入数据库；本章开始回答“谁能创建、读取、修改、删除这些资源”。认证与授权不是 UI 功能，而是请求进入 Node.js HTTP 服务器后，跨越 Express middleware、Cookie、Node crypto、Prisma relation 和业务 owner 规则的一组边界。

本章不实现 Redis、OAuth provider、WebAuthn、MFA、邮箱验证、密码重置邮件流程、文件上传、Docker、部署、NestJS、Fastify、Passport、Auth.js，也不把 JWT 作为主 session 机制。这些主题会改变系统边界，适合在后续章节单独学习。

## 1. 学习目标

- 区分 authentication、authorization、session 和 token。
- 使用 Node.js crypto 生成 Argon2id password verifier。
- 设计 opaque database-backed cookie session。
- 理解 Cookie 属性、`__Host-` 前缀、CSRF、credentialed CORS、Helmet 和 rate limit 的分工。
- 实现 owner-based authorization 与 USER / ADMIN role contrast。
- 能解释 Express error middleware 在 `headersSent` 后为什么必须委托 `next(error)`。
- 能在 Windows PowerShell 与 macOS / Linux shell 中运行本章命令。

## 2. 前置知识

你需要已经理解 Express 5 middleware、router、controller、service、repository 分层，Prisma schema 与 relation，Zod runtime validation，TypeScript `NodeNext`，HTTP headers，以及上一章的 persistent notes API。

## 3. 环境与运行基线

项目使用 Node.js 26、npm 11、Express 5、Prisma 7、Zod、TypeScript strict mode 和 Node built-in test runner。环境变量保存在 mini-project 内部的 `.env.example` 模板中。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\.env.example</span>
  </div>

```txt
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secure_notes_auth_api?schema=public"
PORT=3001
NODE_ENV=development
CORS_ALLOWED_ORIGINS="http://localhost:5173"
SESSION_COOKIE_NAME="secure_notes_session"
COOKIE_SECURE=false
SESSION_TTL_SECONDS=28800
```
</div>

macOS / Linux：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal: macOS / Linux</span>
  </div>

```bash
cd mini-projects/secure-notes-auth-api
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run typecheck
NODE_ENV=test npm test
```
</div>

Windows PowerShell：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal: Windows PowerShell</span>
  </div>

```bash
cd mini-projects/secure-notes-auth-api
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run typecheck
$env:NODE_ENV = "test"; npm test
```
</div>

## 4. 第一性原理

认证系统的第一性原理是：外部输入不可信，密码不可恢复，登录状态必须可撤销，资源访问必须基于服务端事实判断。Cookie 只是浏览器携带 token 的载体；token 只是查 session row 的句柄；session row 才是服务端判断登录状态的事实来源。

安全边界不能靠一个 package 名字证明。密码安全依赖 memory-hard verifier；session 安全依赖随机 token、hash 存储、过期和撤销；CSRF 防护依赖浏览器行为与服务端 token 检查；授权依赖数据库资源 owner 与 role。

## 5. 技术边界模型

| 边界 | 负责层 | 本章实现 |
| --- | --- | --- |
| Password verifier | Node 平台 API + 数据库 | `node:crypto` Argon2id + `User.passwordHash` |
| Session token | Node 平台 API + Cookie + Prisma | `randomBytes`、`sha256`、`Session.tokenHash` |
| Cookie 属性 | HTTP + 浏览器 | `response.cookie` 写 `Set-Cookie` |
| CSRF | 浏览器行为 + 服务端状态 | session-bound CSRF token hash |
| CORS | 浏览器响应暴露规则 | allowlist + credentials |
| Owner 授权 | 业务规则 + 数据库 row | `ownerId` 与 `auth.userId` 对比 |
| Role 授权 | 业务能力分组 | `USER` / `ADMIN` |
| Error flow | Express middleware | `headersSent` 后 `next(error)` |

## 6. 底层机制模型

创建 note 的完整链路是：浏览器发送 HTTP request，Cookie 自动带 session token；Express 解析 JSON body；认证中间件计算 token hash 并查询 session；CSRF 中间件校验 `x-csrf-token`；service 读取 notebook row 并检查 owner；repository 调用 Prisma 写入 note；response helper 返回统一 JSON。

错误链路同样重要。Express error middleware 必须有四个参数。当响应头已经发送时，自定义 handler 不能再安全地写 JSON，只能调用 `next(error)` 把控制权交给 Express 默认错误处理流程。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\errors\error-middleware.ts</span>
  </div>

```ts
export const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }
};
```
</div>

## 7. 核心术语

- secret：用户知道、服务端用于验证的秘密，例如 password。
- verifier：服务端保存的不可逆验证材料，例如 Argon2id password hash。
- salt：每个 password verifier 的随机输入，防止相同密码产生相同 hash。
- cost factor：Argon2id 的 memory、passes、parallelism 等计算成本参数。
- opaque token：客户端不能解读，只能交回服务端验证的随机 token。
- session row：服务端记录登录状态、过期、撤销和 CSRF token hash 的数据库行。
- owner authorization：按资源所有者判断访问权限。
- role authorization：按身份角色判断功能权限。

## 8. 本章实践路线

先完成 password 与 session 的小练习，再阅读 middleware 与 Web security 练习，最后运行 mini project。推荐顺序是 password policy、Argon2id verifier、session token hash、cookie options、authentication middleware、CSRF、credentialed CORS、Helmet、rate limit、JWT boundary、final API integration。

## 9. 核心教学

<a id="section-9-1"></a>
### 9.1 Authentication、authorization、session、token 的边界

**结论**：Authentication 只回答“请求是谁发的”；authorization 才回答“这个身份能否访问这个资源”；session 是服务端保存的登录状态；token 是浏览器携带的随机句柄。

**机制解释**：请求进入 Express 后，`authenticateSession` 从 `Cookie` header 取出 token，Node.js 在当前请求调用栈中计算 token hash，Prisma 用这个 hash 查询 `Session` row。只有 session 未过期、未撤销时，middleware 才把 `AuthContext` 放到 `response.locals`。后续 owner 或 role 检查再决定能否访问 notebook、note 或 admin API。TypeScript 能检查 `AuthContext` 的字段形状，但不能证明 cookie 来自可信用户；这个证明来自数据库 session row。

机制证据链：HTTP request → `Cookie` header → `hashSessionToken` → Prisma `Session` lookup → `response.locals.auth` → owner / role authorization → JSON response。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: auth boundary</span>
  </div>

```ts
const auth = { userId: "user_1", role: "USER" };
const notebook = { ownerId: "user_2" };

console.log({
  authenticated: Boolean(auth.userId),
  authorized: auth.userId === notebook.ownerId
});
```
</div>

<a id="section-9-2"></a>
### 9.2 Password 不是普通字符串：secret、verifier、hash、salt、cost factor

**结论**：password 是用户秘密，服务端应保存 verifier，不保存明文，也不保存可逆密文。

**机制解释**：注册时，HTTP body 里的 password 是不可信字符串。Zod 先做运行时长度和格式校验，然后 Node.js `crypto.argon2` 用 password、随机 salt 和 cost 参数生成 verifier。数据库保存的是 verifier 字符串。登录时用候选 password 和 verifier 里的参数重新计算并比较。TypeScript 只能检查 `password` 是 string，不能证明它符合安全策略，也不能证明它没有出现在泄露列表；这些是运行时安全边界。

机制证据链：request body password → Zod runtime validation → random salt → Argon2id verifier → `User.passwordHash` → login candidate verification。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices\06-auth-security\01-passwords\password-policy.ts</span>
  </div>

```ts
if (normalized.length < MINIMUM_LENGTH) {
  reasons.push("Password must contain at least 15 characters.");
}
```
</div>

<a id="section-9-3"></a>
### 9.3 Argon2id password hashing with Node.js crypto

**结论**：本章使用 Node.js `node:crypto` 的 Argon2id 能力，不额外引入 password-hashing package。

**机制解释**：`crypto.argon2` 在当前 Node.js 版本中是 callback API，项目用 `promisify(argon2)` 把它包成 Promise 风格。service 层 `await hashPassword(...)` 时，JavaScript 调用进入 Node 平台 crypto API，Argon2id 根据 memory、passes、parallelism、tagLength 和 salt 计算结果。TypeScript 能检查参数对象字段，但不能替代运行时 API 对参数和 buffer 的校验。

机制证据链：registration service → `hashPassword` → `argon2Async("argon2id", parameters)` → Buffer tag → base64url verifier string。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\password-hashing.ts</span>
  </div>

```ts
const argon2Async = promisify(argon2) as unknown as (
  algorithm: "argon2id",
  parameters: Argon2Parameters
) => Promise<Buffer>;
```
</div>

<a id="section-9-4"></a>
### 9.4 Password hash format、verify、upgrade boundary

**结论**：hash format 是未来升级的边界，不能只保存裸 hash。

**机制解释**：verifier 字符串保存 namespace、algorithm、version、memory、passes、parallelism、tagLength、salt 和 hash。登录时先 parse metadata，再用同一组参数计算候选 tag。参数升级时，`shouldUpgradePasswordHash` 可以判断旧 verifier 是否需要在下一次成功登录后升级。TypeScript 能检查 parse 结果的对象类型，但错误格式仍然必须由运行时分支处理。

机制证据链：stored verifier string → split metadata → Node.js Buffer decode → Argon2id candidate tag → `timingSafeEqual` → boolean result。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: password hash format</span>
  </div>

```ts
const storedHash = "secure-notes$argon2id$v=1$m=65536$t=3$p=4$l=32$s=...$h=...";
const [namespace, algorithm, version] = storedHash.split("$");

console.log({ namespace, algorithm, version });
```
</div>

<a id="section-9-5"></a>
### 9.5 Registration flow：validate input、hash password、persist user

**结论**：registration 是输入校验、密码 verifier 生成、user row 创建和初始 session 创建的组合流程。

**机制解释**：Express route 收到 JSON body 后，`validateRequest` 用 Zod schema 替换已解析 body。controller 调用 service，service 生成 password hash，再通过 repository 写 `User`。写入成功后创建 opaque session 并设置 cookie。响应只返回 public user，不返回 password hash 或 token hash。

机制证据链：`POST /auth/register` → Express JSON parser → Zod parse → Argon2id verifier → Prisma `user.create` → session row → `Set-Cookie`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\auth\auth.controller.ts</span>
  </div>

```ts
setSessionCookie(response, result.sessionToken);
sendResponse(response, 201, { user: result.user });
```
</div>

<a id="section-9-6"></a>
### 9.6 Login flow：generic error、verify password、create session

**结论**：login 必须把“邮箱不存在”和“密码错误”映射成同一种公开错误，避免账号枚举。

**机制解释**：service 先按 email 查询用户。如果用户不存在，直接抛出通用凭证错误；如果用户存在，再用候选 password 验证 verifier。两个失败路径对客户端暴露同一个 code 和 message。成功后创建新 session row，cookie 中只给浏览器 opaque token。TypeScript 不能证明 email 是否存在，也不能证明密码正确；这些都由数据库和 password verifier 决定。

机制证据链：`POST /auth/login` → email lookup → `verifyPassword` → generic failure or session creation → response cookie。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\auth\auth.service.ts</span>
  </div>

```ts
const invalidCredentials = new HttpError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
```
</div>

<a id="section-9-7"></a>
### 9.7 Session token：opaque random token 与 token hash

**结论**：opaque session token 的明文只给浏览器；数据库只保存 token hash。

**机制解释**：Node.js `randomBytes(32)` 生成高熵随机 bytes，转成 base64url 后作为 cookie token。服务端保存 `sha256(token)`。请求回来时，再对 cookie token 做相同 hash 并查询 session row。这样数据库泄露不能直接变成登录态。TypeScript 只能检查函数返回 string，不能证明随机性；随机性来自 Node crypto API。

机制证据链：crypto random bytes → base64url token → cookie → sha256 token hash → `Session.tokenHash`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\session-token.ts</span>
  </div>

```ts
export function createSessionToken(): string {
  return randomBytes(32).toString("base64url");
}
```
</div>

<a id="section-9-8"></a>
### 9.8 Cookie session boundary：Set-Cookie、HttpOnly、Secure、SameSite、Path、Max-Age

**结论**：Cookie 是浏览器自动保存和自动发送的 HTTP 状态机制，必须用属性收窄 session token 的暴露面。

**机制解释**：Express `response.cookie` 写 `Set-Cookie` header。`HttpOnly` 阻止浏览器脚本读取 token，`Secure` 要求 HTTPS，`SameSite=Lax` 降低部分跨站自动发送风险，`Path=/` 固定路径范围，`maxAge` 控制浏览器端保存时间。浏览器之后按 Cookie 规则自动把 token 放进请求头。

机制证据链：login response → `Set-Cookie` attributes → browser cookie jar → later `Cookie` header → session lookup。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\cookies\session-cookie.ts</span>
  </div>

```ts
response.cookie(config.SESSION_COOKIE_NAME, token, {
  httpOnly: true,
  secure: config.COOKIE_SECURE,
  sameSite: "lax",
  path: "/",
  maxAge: config.SESSION_TTL_SECONDS * 1000
});
```
</div>

<a id="section-9-9"></a>
### 9.9 `__Host-` cookie prefix 与 host-only session cookie

**结论**：`__Host-` 前缀让浏览器强制 host-only cookie 约束，但它需要 HTTPS 和正确属性。

**机制解释**：符合前缀规则的 cookie 必须设置 `Secure`，必须 `Path=/`，且不能设置 `Domain`。本地 HTTP 开发环境通常不能启用 `Secure`，所以示例 `.env.example` 默认使用普通开发 cookie name；生产 HTTPS 环境可以切换为 `__Host-secure_notes_session` 并设置 `COOKIE_SECURE=true`。

机制证据链：cookie name prefix → browser validates attributes → invalid cookie rejected → host-only session boundary。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\.env.example</span>
  </div>

```txt
SESSION_COOKIE_NAME="secure_notes_session"
COOKIE_SECURE=false
```
</div>

<a id="section-9-10"></a>
### 9.10 Session persistence：sessions table、expiresAt、revokedAt

**结论**：session table 是服务端登录状态的事实来源。

**机制解释**：`Session` row 记录 `userId`、`tokenHash`、`csrfTokenHash`、`expiresAt` 和 `revokedAt`。认证时，cookie token 自己不证明身份；只有 token hash 匹配一个未过期、未撤销的 row，才算通过。Prisma relation 把 session 和 user 连接起来，TypeScript 能检查查询结果字段，但过期和撤销必须在运行时判断。

机制证据链：token hash → Prisma unique lookup → user relation → expiry check → revocation check → auth context。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\prisma\schema.prisma</span>
  </div>

```txt
model Session {
  tokenHash     String    @unique @db.VarChar(96)
  csrfTokenHash String?   @db.VarChar(96)
  expiresAt     DateTime
  revokedAt     DateTime?
}
```
</div>

<a id="section-9-11"></a>
### 9.11 Logout：server-side revocation 与 clearing cookie

**结论**：logout 的安全动作是服务端撤销 session；清 cookie 只是浏览器端清理。

**机制解释**：logout route 先通过 session 认证和 CSRF 验证，然后 service 把当前 session row 的 `revokedAt` 设置成当前时间。`clearSessionCookie` 让浏览器删除 cookie。即使旧 token 被再次发送，认证中间件也会因为 row 已撤销而拒绝。

机制证据链：`POST /auth/logout` → auth context session id → Prisma update `revokedAt` → clear cookie → later request rejected。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\auth\auth.repository.ts</span>
  </div>

```ts
await prisma.session.update({
  where: { id: sessionId },
  data: { revokedAt: new Date() }
});
```
</div>

<a id="section-9-12"></a>
### 9.12 Authentication middleware：cookie → token hash → database session → auth context

**结论**：认证中间件必须从 HTTP cookie 走到数据库 session row，不能把 cookie token 当 user id。

**机制解释**：middleware 从 `request.headers.cookie` 解析 session cookie，计算 token hash，查询 Prisma `session.findUnique` 并 include user。失败时抛 `AUTH_REQUIRED`；成功时把 `AuthContext` 放入 `response.locals`，这是 Express 单次请求生命周期内的局部状态。

机制证据链：Express middleware → cookie parser → Node crypto hash → Prisma lookup → response locals → next middleware。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\authenticate-session.ts</span>
  </div>

```ts
if (!session || session.revokedAt || session.expiresAt.getTime() <= Date.now()) {
  throw new HttpError(401, "Authentication is required.", "AUTH_REQUIRED");
}
```
</div>

<a id="section-9-13"></a>
### 9.13 Authorization：owner-based resource access

**结论**：owner authorization 检查资源行上的 owner 与当前用户是否匹配。

**机制解释**：notebook 和 note 都有 owner。service 读取资源 row 后，比较 `auth.userId` 与 `ownerId`。如果不匹配，返回 403。这个检查不能只靠 route 参数，因为攻击者可以猜 UUID；必须加载实际资源行。TypeScript 能约束 `ownerId` 是 string，但不能证明当前用户拥有该资源。

机制证据链：authenticated request → resource row lookup → `ownerId` compare → allow or `FORBIDDEN_OWNER`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\authorize-owner.ts</span>
  </div>

```ts
if (auth.userId !== ownerId) {
  throw new HttpError(403, "You do not own this resource.", "FORBIDDEN_OWNER");
}
```
</div>

<a id="section-9-14"></a>
### 9.14 Role-based authorization：USER / ADMIN contrast

**结论**：role authorization 适合控制粗粒度能力，例如 admin API；它不能替代 owner check。

**机制解释**：`authorizeRole("ADMIN")` 读取 `response.locals.auth.role` 并与允许角色集合比较。本章 admin 对比端点是 `GET /admin/users`，它只有 `ADMIN` 可访问。USER 可以拥有自己的 notes，但不能列出所有 public users。

机制证据链：session auth → role in auth context → allowed role set → `GET /admin/users` allowed or `FORBIDDEN_ROLE`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\authorize-role.ts</span>
  </div>

```ts
if (!allowedRoles.includes(auth.role)) {
  throw new HttpError(403, "This action requires a different role.", "FORBIDDEN_ROLE");
}
```
</div>

<a id="section-9-15"></a>
### 9.15 CSRF threat model for cookie-based auth

**结论**：CSRF 的核心风险是浏览器会自动携带 cookie，而攻击页面不需要读取 cookie。

**机制解释**：如果 mutation 只检查 session cookie，跨站页面可以诱导浏览器发送带 cookie 的请求。CORS 不等于 CSRF 防护，因为普通表单类请求历史上就能跨站发送。服务端必须给状态改变请求增加独立请求意图证据。

机制证据链：cross-site trigger → browser attaches cookie → server sees session → missing CSRF token → reject mutation。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: unsafe method gate</span>
  </div>

```ts
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
const requiresCsrf = !SAFE_METHODS.has(request.method);
```
</div>

<a id="section-9-16"></a>
### 9.16 Session-bound CSRF token for state-changing requests

**结论**：CSRF token 应绑定到当前 session，并且服务端只保存 token hash。

**机制解释**：`GET /auth/csrf` 为当前 session 生成随机 token，数据库 `Session.csrfTokenHash` 保存它的 hash。POST、PATCH、DELETE 请求必须带 `x-csrf-token`。中间件重新计算 hash 并比较，失败则返回 403。

机制证据链：authenticated session → generated CSRF token → stored CSRF hash → mutation header → hash compare → allow or reject。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\csrf.ts</span>
  </div>

```ts
await prisma.session.update({
  where: { id: sessionId },
  data: { csrfTokenHash: hashCsrfToken(token) }
});
```
</div>

<a id="section-9-17"></a>
### 9.17 CORS credentials：allowed origin、credentials、wildcard mistake

**结论**：credentialed CORS 必须回显具体 allowed origin，不能用 wildcard。

**机制解释**：浏览器带 credential 的跨源请求需要服务端返回 `Access-Control-Allow-Credentials: true`，并且 `Access-Control-Allow-Origin` 必须是具体 origin。项目用 allowlist 判断 `Origin`。CORS 只控制浏览器是否把响应暴露给前端，不替代认证、授权或 CSRF。

机制证据链：request `Origin` → allowlist → response CORS headers → browser exposes or blocks response。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\middleware\cors.ts</span>
  </div>

```ts
callback(null, allowedOrigins.has(origin) ? origin : false);
```
</div>

<a id="section-9-18"></a>
### 9.18 Security headers with Helmet

**结论**：Helmet 是 HTTP 安全头中间件，不是完整安全模型。

**机制解释**：Express app 在 routes 之前挂载 `securityHeaders`。请求进入应用后先经过 Helmet，响应会带上默认安全 headers。它降低浏览器层风险，但不检查 password、session、owner、CSRF 或数据库行。

机制证据链：Express app middleware order → Helmet writes headers → route handler writes JSON → browser applies header policy。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\middleware\security-headers.ts</span>
  </div>

```ts
import helmet from "helmet";

export const securityHeaders = helmet();
```
</div>

<a id="section-9-19"></a>
### 9.19 Login rate limiting and enumeration-resistant errors

**结论**：rate limit 负责减速，generic login error 负责降低枚举信号。

**机制解释**：`loginRateLimit` 挂在 `POST /auth/login` 上，限制同一窗口内失败尝试速度。service 层把未知邮箱和错误密码映射为同一个 public error。二者协作，但都不能替代强密码 verifier 和 session 安全。

机制证据链：repeated login requests → rate limiter counter → generic service error → response without account-existence signal。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\middleware\rate-limit.ts</span>
  </div>

```ts
export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8"
});
```
</div>

<a id="section-9-20"></a>
### 9.20 JWT boundary：signed claims are not a session store

**结论**：JWT 是 signed claims 容器，不自动等于可撤销 session store。

**机制解释**：JWT 可以让服务端验证签名、issuer、audience 和 expiry 后读取 claims，但如果不查服务器状态，logout 后立即撤销会更困难。opaque session 把有效性放在服务器 session row，撤销和过期都由数据库决定。本章只把 JWT 作为边界认识，不作为主 session 机制。

机制证据链：self-contained claims → signature and expiry validation → no row lookup → revocation needs another design。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices\06-auth-security\05-jwt-boundary\jwt-not-session-store.ts</span>
  </div>

```ts
return {
  canRevokeImmediately: false,
  reason: "A self-contained token remains valid until expiry unless another revocation system exists."
};
```
</div>

<a id="section-9-21"></a>
### 9.21 Chapter integration: secure-notes-auth-api

**结论**：最终项目把 password verifier、opaque session、cookie、CSRF、CORS、Helmet、rate limit、owner authorization 和 role authorization 串成一条可测试链。

**机制解释**：注册和登录产生 session；`GET /auth/csrf` 产生 session-bound CSRF token；nested collection endpoint 创建 note；top-level `GET /notes/:noteId`、`PATCH /notes/:noteId`、`DELETE /notes/:noteId` 按 note owner 授权；`GET /admin/users` 按 ADMIN role 授权。

机制证据链：test request → Express middleware stack → service authorization → Prisma row → asserted status and response shape。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\tests\protected-notes.integration.test.ts</span>
  </div>

```ts
await alice.agent.get("/notes/" + noteResponse.body.data.id).expect(200);
await alice.agent.get("/admin/users").expect(403);
await admin.agent.get("/admin/users").expect(200);
```
</div>

## 10. API 与规则索引

| API / 规则 | 所在层 | 本章规则 |
| --- | --- | --- |
| `crypto.argon2` | Node 平台 API | 用 Argon2id 生成 password verifier |
| `randomBytes(32)` | Node 平台 API | 生成 opaque session token 和 CSRF token |
| `response.cookie` | Express response API | 写 session cookie 属性 |
| Express error middleware | Express middleware | 四参数签名，`headersSent` 后委托 `next(error)` |
| `Set-Cookie` | HTTP / 浏览器 | 用 `HttpOnly`、`Secure`、`SameSite`、`Path`、`Max-Age` 收窄边界 |
| Credentialed CORS | 浏览器 / HTTP | 不能使用 wildcard origin |
| Prisma relation | ORM / 数据库 | session、notebook、note 都关联 user |
| Zod schema | runtime validation | 校验外部 HTTP 输入，不替代 TypeScript |

## 11. 常见错误对照表

| 错误理解 | 违反的规则 | 正确判断 |
| --- | --- | --- |
| 登录成功后可以访问所有 note | 认证不等于授权 | 还要检查 note owner |
| Cookie 设置 `HttpOnly` 就不需要 CSRF | `HttpOnly` 只防脚本读取 | mutation 仍要 CSRF token |
| CORS allowlist 等于 API 认证 | CORS 是浏览器响应暴露规则 | API 仍要 session 与授权 |
| 数据库存 session token 明文 | 数据库泄露会直接变登录态 | 只存 token hash |
| 自定义 error handler 在 `headersSent` 后直接 return | Express 错误流被吞掉 | 调用 `next(error)` |
| JWT 天然替代 session store | signed claims 不是可撤销状态 | 需要额外撤销机制或 opaque session |

## 12. 调试与验证方法

调试时按链路定位：先看 login 是否返回 `Set-Cookie`，再看后续请求是否带 `Cookie`，然后检查 session row、`expiresAt`、`revokedAt`、CSRF token hash、ownerId 和 role。

macOS / Linux：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal: macOS / Linux</span>
  </div>

```bash
cd mini-projects/secure-notes-auth-api
npm run typecheck
NODE_ENV=test npm test
```
</div>

Windows PowerShell：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal: Windows PowerShell</span>
  </div>

```bash
cd mini-projects/secure-notes-auth-api
npm run typecheck
$env:NODE_ENV = "test"; npm test
```
</div>

## 13. 分项练习说明

- `01-passwords`：观察 password policy、Argon2id verifier、verify 和 hash format。
- `02-sessions`：观察 session token 生成、hash 存储、cookie options 和过期判断。
- `03-auth-middleware`：观察 auth context、owner authorization 和 role authorization。
- `04-web-security`：观察 CSRF、credentialed CORS、Helmet 和 login rate limit。
- `05-jwt-boundary`：观察 signed claims 与 session store 的边界。

## 14. 最终迷你项目

这个项目用于整合本章机制，不替代前面逐节学习。它把 password verifier、opaque session、cookie、CSRF、CORS、Helmet、rate limit、owner authorization 和 role authorization 放进同一个 Express API。

### 14.1 项目目标

实现 Secure Notes Auth API：注册、登录、登出、当前用户、CSRF token、owned notebooks、nested note collection、top-level note resources、admin user listing。

### 14.2 项目边界

项目使用 PostgreSQL-backed Prisma session table，不使用 Redis；使用 opaque cookie session，不使用 JWT 作为主 session 机制；不实现外部身份提供者、WebAuthn、MFA、邮件工作流、文件上传或部署脚本。

### 14.3 API 路由设计

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `GET /auth/csrf`
- `GET /notebooks`
- `POST /notebooks`
- `GET /notebooks/:notebookId`
- `PATCH /notebooks/:notebookId`
- `DELETE /notebooks/:notebookId`
- `GET /notebooks/:notebookId/notes`
- `POST /notebooks/:notebookId/notes`
- `GET /notes/:noteId`
- `PATCH /notes/:noteId`
- `DELETE /notes/:noteId`
- `GET /admin/users`

### 14.4 运行与测试命令

macOS / Linux：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal: macOS / Linux</span>
  </div>

```bash
cd mini-projects/secure-notes-auth-api
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run typecheck
NODE_ENV=test npm test
```
</div>

Windows PowerShell：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal: Windows PowerShell</span>
  </div>

```bash
cd mini-projects/secure-notes-auth-api
Copy-Item .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run typecheck
$env:NODE_ENV = "test"; npm test
```
</div>

### 14.5 完整项目代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\package.json</span>
  </div>

```json
{
  "name": "secure-notes-auth-api",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "start": "tsx src/server.ts",
    "typecheck": "tsc --noEmit",
    "prisma:generate": "prisma generate",
    "prisma:migrate:dev": "prisma migrate dev",
    "prisma:migrate:deploy": "prisma migrate deploy",
    "prisma:migrate:reset": "prisma migrate reset",
    "seed": "tsx prisma/seed.ts",
    "test": "node --import tsx --test tests/auth.integration.test.ts tests/protected-notes.integration.test.ts"
  },
  "dependencies": {
    "@prisma/adapter-pg": "^7.8.0",
    "@prisma/client": "^7.8.0",
    "cors": "^2.8.6",
    "express": "^5.2.1",
    "express-rate-limit": "^8.6.0",
    "helmet": "^8.3.0",
    "pg": "^8.22.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.6",
    "@types/node": "^26.1.1",
    "@types/pg": "^8.20.0",
    "@types/supertest": "^7.2.1",
    "dotenv": "^17.4.2",
    "prisma": "^7.8.0",
    "supertest": "^7.2.2",
    "tsx": "^4.23.1",
    "typescript": "^7.0.2"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "engines": {
    "node": ">=26"
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\tsconfig.json</span>
  </div>

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src", "prisma", "tests"]
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\.env.example</span>
  </div>

```txt
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secure_notes_auth_api?schema=public"
PORT=3001
NODE_ENV=development
CORS_ALLOWED_ORIGINS="http://localhost:5173"
SESSION_COOKIE_NAME="secure_notes_session"
COOKIE_SECURE=false
SESSION_TTL_SECONDS=28800
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\prisma.config.ts</span>
  </div>

```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts"
  },
  datasource: {
    url: env("DATABASE_URL")
  }
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\prisma\schema.prisma</span>
  </div>

```txt
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

enum Role {
  USER
  ADMIN
}

enum NoteStatus {
  DRAFT
  ACTIVE
  ARCHIVED
}

model User {
  id           String     @id @default(uuid()) @db.Uuid
  email        String     @unique @db.VarChar(320)
  passwordHash String     @db.Text
  role         Role       @default(USER)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  sessions     Session[]
  notebooks    Notebook[]
  notes        Note[]
}

model Session {
  id            String    @id @default(uuid()) @db.Uuid
  userId        String    @db.Uuid
  tokenHash     String    @unique @db.VarChar(96)
  csrfTokenHash String?   @db.VarChar(96)
  userAgent     String?   @db.VarChar(512)
  ipHash        String?   @db.VarChar(96)
  createdAt     DateTime  @default(now())
  expiresAt     DateTime
  revokedAt     DateTime?
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([expiresAt])
}

model Notebook {
  id        String   @id @default(uuid()) @db.Uuid
  ownerId   String   @db.Uuid
  name      String   @db.VarChar(120)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  owner     User     @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  notes     Note[]

  @@index([ownerId])
  @@unique([ownerId, name])
}

model Note {
  id         String     @id @default(uuid()) @db.Uuid
  ownerId    String     @db.Uuid
  notebookId String     @db.Uuid
  title      String     @db.VarChar(160)
  body       String     @default("")
  status     NoteStatus @default(ACTIVE)
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
  owner      User       @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  notebook   Notebook   @relation(fields: [notebookId], references: [id], onDelete: Cascade)

  @@index([ownerId])
  @@index([notebookId])
  @@index([status, createdAt])
  @@unique([notebookId, title])
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\prisma\seed.ts</span>
  </div>

```ts
import { prisma } from "../src/db/prisma.js";
import { hashPassword } from "../src/shared/auth/password-hashing.js";

async function main() {
  const adminPasswordHash = await hashPassword("admin-passphrase-2026");
  const userPasswordHash = await hashPassword("user-passphrase-2026");

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { passwordHash: adminPasswordHash, role: "ADMIN" },
    create: {
      email: "admin@example.com",
      passwordHash: adminPasswordHash,
      role: "ADMIN"
    }
  });

  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: { passwordHash: userPasswordHash, role: "USER" },
    create: {
      email: "user@example.com",
      passwordHash: userPasswordHash,
      role: "USER"
    }
  });
}

await main();
await prisma.$disconnect();
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\app.ts</span>
  </div>

```ts
import express from "express";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { notebooksRoutes } from "./modules/notebooks/notebooks.routes.js";
import { notebookNotesRoutes } from "./modules/notes/notebook-notes.routes.js";
import { notesRoutes } from "./modules/notes/notes.routes.js";
import { listPublicUsersForAdmin } from "./modules/users/users.admin.js";
import { authenticateSession } from "./shared/auth/authenticate-session.js";
import { authorizeRole } from "./shared/auth/authorize-role.js";
import { corsMiddleware } from "./shared/middleware/cors.js";
import { notFound } from "./shared/middleware/not-found.js";
import { requestId } from "./shared/middleware/request-id.js";
import { securityHeaders } from "./shared/middleware/security-headers.js";
import { sendResponse } from "./shared/responses/send-response.js";
import { errorMiddleware } from "./shared/errors/error-middleware.js";

export const app = express();

app.use(requestId);
app.use(securityHeaders);
app.use(corsMiddleware);
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_request, response) => {
  sendResponse(response, 200, { status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/notebooks", notebooksRoutes);
app.use("/notebooks/:notebookId/notes", notebookNotesRoutes);
app.use("/notes", notesRoutes);

app.get("/admin/users", authenticateSession, authorizeRole("ADMIN"), async (_request, response, next) => {
  try {
    const users = await listPublicUsersForAdmin();
    sendResponse(response, 200, { users });
  } catch (error) {
    next(error);
  }
});

app.use(notFound);
app.use(errorMiddleware);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\server.ts</span>
  </div>

```ts
import { app } from "./app.js";
import { config } from "./config/env.js";
import { disconnectPrisma } from "./db/prisma.js";
import { logger } from "./shared/logging/logger.js";

const server = app.listen(config.PORT, () => {
  logger.info({ port: config.PORT }, "Secure notes auth API started");
});

async function shutdown(signal: string): Promise<void> {
  logger.info({ signal }, "Shutting down secure notes auth API");
  server.close(async () => {
    await disconnectPrisma();
    process.exit(0);
  });
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\README.md</span>
  </div>

```txt
# Secure Notes Auth API

This mini project demonstrates password-based authentication, opaque database-backed sessions, cookie boundaries, CSRF checks, credentialed CORS, Helmet, login rate limiting, owner authorization, and a small USER versus ADMIN role contrast.

## Setup

1. Copy .env.example to .env.
2. Create the PostgreSQL database in DATABASE_URL.
3. Run npm install.
4. Run npm run prisma:generate.
5. Run npm run prisma:migrate:dev.
6. Run npm run seed.
7. Run npm run dev.

## Test

Use a separate PostgreSQL test database and then run npm test.

The integration tests expect DATABASE_URL to point at a disposable test database.

macOS / Linux:

```bash
NODE_ENV=test npm test
```

Windows PowerShell:

```powershell
$env:NODE_ENV = "test"; npm test
```
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\openapi\openapi.yaml</span>
  </div>

```txt
openapi: 3.1.0
info:
  title: Secure Notes Auth API
  version: 1.0.0
servers:
  - url: http://localhost:3001
paths:
  /auth/register:
    post:
      summary: Register a user and set an opaque session cookie.
      responses:
        "201":
          description: User registered.
  /auth/login:
    post:
      summary: Log in with generic failure behavior.
      responses:
        "200":
          description: User logged in.
  /auth/csrf:
    get:
      summary: Issue a session-bound CSRF token.
      responses:
        "200":
          description: CSRF token issued.
  /notebooks:
    get:
      summary: List notebooks owned by the authenticated user.
      responses:
        "200":
          description: Notebook list.
    post:
      summary: Create a notebook with CSRF protection.
      responses:
        "201":
          description: Notebook created.
  /notebooks/{notebookId}/notes:
    get:
      summary: List notes inside an owned notebook.
      responses:
        "200":
          description: Note list.
    post:
      summary: Create a note inside an owned notebook.
      responses:
        "201":
          description: Note created.
  /notes/{noteId}:
    get:
      summary: Read one owned note by id.
      responses:
        "200":
          description: Note returned.
    patch:
      summary: Update one owned note by id with CSRF protection.
      responses:
        "200":
          description: Note updated.
    delete:
      summary: Delete one owned note by id with CSRF protection.
      responses:
        "200":
          description: Note deleted.
  /admin/users:
    get:
      summary: List public users for an ADMIN user.
      responses:
        "200":
          description: Public user list.
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\config\env.ts</span>
  </div>

```ts
import { z } from "zod";

const booleanFromString = z.union([z.boolean(), z.string()]).transform((value) => {
  if (typeof value === "boolean") {
    return value;
  }

  return value.toLowerCase() === "true";
});

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().int().positive().default(3001),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  CORS_ALLOWED_ORIGINS: z.string().default("http://localhost:5173"),
  SESSION_COOKIE_NAME: z.string().min(1).default("secure_notes_session"),
  COOKIE_SECURE: booleanFromString.default(false),
  SESSION_TTL_SECONDS: z.coerce.number().int().positive().default(60 * 60 * 8)
});

export const config = envSchema.parse(process.env);

export const allowedCorsOrigins = config.CORS_ALLOWED_ORIGINS
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\db\prisma-errors.ts</span>
  </div>

```ts
import { Prisma } from "../generated/prisma/client.js";
import { HttpError } from "../shared/errors/http-error.js";

export function mapPrismaError(error: unknown, conflictCode = "RESOURCE_CONFLICT"): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      throw new HttpError(409, "Resource already exists.", conflictCode);
    }

    if (error.code === "P2025") {
      throw new HttpError(404, "Resource was not found.", "RESOURCE_NOT_FOUND");
    }

    if (error.code === "P2003") {
      throw new HttpError(400, "Related resource does not exist.", "RELATION_NOT_FOUND");
    }
  }

  throw error;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\db\prisma.ts</span>
  </div>

```ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { config } from "../config/env.js";

const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL
});

export const prisma = new PrismaClient({ adapter });

export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\auth\auth.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { clearSessionCookie, setSessionCookie } from "../../shared/cookies/session-cookie.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { issueCsrfTokenForSession } from "../../shared/auth/csrf.js";
import * as authService from "./auth.service.js";

export const register: RequestHandler = async (request, response, next) => {
  try {
    const result = await authService.register(request.body, {
      userAgent: request.header("user-agent") ?? undefined,
      ip: request.ip
    });
    setSessionCookie(response, result.sessionToken);
    sendResponse(response, 201, { user: result.user });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (request, response, next) => {
  try {
    const result = await authService.login(request.body, {
      userAgent: request.header("user-agent") ?? undefined,
      ip: request.ip
    });
    setSessionCookie(response, result.sessionToken);
    sendResponse(response, 200, { user: result.user });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    await authService.logout(auth.sessionId);
    clearSessionCookie(response);
    sendResponse(response, 200, { loggedOut: true });
  } catch (error) {
    next(error);
  }
};

export const me: RequestHandler = (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, {
      user: {
        id: auth.userId,
        email: auth.email,
        role: auth.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const csrf: RequestHandler = async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    const csrfToken = await issueCsrfTokenForSession(auth.sessionId);
    sendResponse(response, 200, { csrfToken });
  } catch (error) {
    next(error);
  }
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\auth\auth.repository.ts</span>
  </div>

```ts
import { prisma } from "../../db/prisma.js";
import { createSessionExpiration } from "../../shared/auth/session-token.js";

export async function createSession(input: {
  userId: string;
  tokenHash: string;
  userAgent?: string;
  ipHash?: string;
}) {
  return prisma.session.create({
    data: {
      userId: input.userId,
      tokenHash: input.tokenHash,
      userAgent: input.userAgent,
      ipHash: input.ipHash,
      expiresAt: createSessionExpiration()
    }
  });
}

export async function revokeSession(sessionId: string): Promise<void> {
  await prisma.session.update({
    where: { id: sessionId },
    data: { revokedAt: new Date() }
  });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\auth\auth.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { authenticateSession } from "../../shared/auth/authenticate-session.js";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { loginRateLimit } from "../../shared/middleware/rate-limit.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import * as controller from "./auth.controller.js";

export const authRoutes = Router();

authRoutes.post("/register", validateRequest({ body: registerSchema }), controller.register);
authRoutes.post("/login", loginRateLimit, validateRequest({ body: loginSchema }), controller.login);
authRoutes.post("/logout", authenticateSession, requireCsrfToken, controller.logout);
authRoutes.get("/me", authenticateSession, controller.me);
authRoutes.get("/csrf", authenticateSession, controller.csrf);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\auth\auth.schema.ts</span>
  </div>

```ts
import { z } from "zod";

const email = z.string().trim().toLowerCase().email().max(320);
const password = z.string().min(15).max(128);

export const registerSchema = z.object({
  email,
  password
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1).max(128)
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\auth\auth.service.ts</span>
  </div>

```ts
import { createHash } from "node:crypto";
import { mapPrismaError } from "../../db/prisma-errors.js";
import { HttpError } from "../../shared/errors/http-error.js";
import { hashPassword, verifyPassword } from "../../shared/auth/password-hashing.js";
import { createSessionToken, hashSessionToken } from "../../shared/auth/session-token.js";
import { createSession, revokeSession } from "./auth.repository.js";
import { createUser, findUserByEmail, toPublicUser } from "../users/users.repository.js";
import type { AuthResult, LoginInput, RegisterInput } from "./auth.types.js";

const invalidCredentials = new HttpError(401, "Invalid email or password.", "INVALID_CREDENTIALS");

export async function register(input: RegisterInput, metadata: { userAgent?: string; ip?: string }): Promise<AuthResult> {
  const passwordHash = await hashPassword(input.password);

  try {
    const user = await createUser({
      email: input.email,
      passwordHash
    });
    const sessionToken = createSessionToken();
    await createSession({
      userId: user.id,
      tokenHash: hashSessionToken(sessionToken),
      userAgent: metadata.userAgent,
      ipHash: metadata.ip ? hashIp(metadata.ip) : undefined
    });

    return {
      user: toPublicUser(user),
      sessionToken
    };
  } catch (error) {
    mapPrismaError(error, "EMAIL_ALREADY_REGISTERED");
  }
}

export async function login(input: LoginInput, metadata: { userAgent?: string; ip?: string }): Promise<AuthResult> {
  const user = await findUserByEmail(input.email);
  if (!user) {
    throw invalidCredentials;
  }

  const verified = await verifyPassword(input.password, user.passwordHash);
  if (!verified) {
    throw invalidCredentials;
  }

  const sessionToken = createSessionToken();
  await createSession({
    userId: user.id,
    tokenHash: hashSessionToken(sessionToken),
    userAgent: metadata.userAgent,
    ipHash: metadata.ip ? hashIp(metadata.ip) : undefined
  });

  return {
    user: toPublicUser(user),
    sessionToken
  };
}

export async function logout(sessionId: string): Promise<void> {
  await revokeSession(sessionId);
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip, "utf8").digest("base64url");
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\auth\auth.types.ts</span>
  </div>

```ts
import type { PublicUser } from "../users/users.types.js";

export type RegisterInput = {
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthResult = {
  user: PublicUser;
  sessionToken: string;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notebooks\notebooks.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./notebooks.service.js";

export const list: RequestHandler = async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.list(auth));
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 201, await service.create(auth, request.body));
  } catch (error) {
    next(error);
  }
};

export const get: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.get(auth, routeParam(request.params.notebookId)));
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.update(auth, routeParam(request.params.notebookId), request.body));
  } catch (error) {
    next(error);
  }
};

export const remove: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    await service.remove(auth, routeParam(request.params.notebookId));
    sendResponse(response, 200, { deleted: true });
  } catch (error) {
    next(error);
  }
};

function routeParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notebooks\notebooks.repository.ts</span>
  </div>

```ts
import { prisma } from "../../db/prisma.js";
import type { NotebookDto, NotebookRecord } from "./notebooks.types.js";

export function toNotebookDto(notebook: NotebookRecord): NotebookDto {
  return {
    id: notebook.id,
    name: notebook.name,
    createdAt: notebook.createdAt.toISOString(),
    updatedAt: notebook.updatedAt.toISOString()
  };
}

export async function listNotebooks(ownerId: string): Promise<NotebookRecord[]> {
  return prisma.notebook.findMany({
    where: { ownerId },
    orderBy: { createdAt: "desc" }
  });
}

export async function findNotebookById(id: string): Promise<NotebookRecord | null> {
  return prisma.notebook.findUnique({ where: { id } });
}

export async function createNotebook(input: { ownerId: string; name: string }): Promise<NotebookRecord> {
  return prisma.notebook.create({ data: input });
}

export async function updateNotebook(id: string, input: { name: string }): Promise<NotebookRecord> {
  return prisma.notebook.update({
    where: { id },
    data: input
  });
}

export async function deleteNotebook(id: string): Promise<void> {
  await prisma.notebook.delete({ where: { id } });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notebooks\notebooks.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { authenticateSession } from "../../shared/auth/authenticate-session.js";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { createNotebookSchema, notebookParamsSchema, updateNotebookSchema } from "./notebooks.schema.js";
import * as controller from "./notebooks.controller.js";

export const notebooksRoutes = Router();

notebooksRoutes.use(authenticateSession);
notebooksRoutes.get("/", controller.list);
notebooksRoutes.post("/", requireCsrfToken, validateRequest({ body: createNotebookSchema }), controller.create);
notebooksRoutes.get("/:notebookId", validateRequest({ params: notebookParamsSchema }), controller.get);
notebooksRoutes.patch("/:notebookId", requireCsrfToken, validateRequest({ params: notebookParamsSchema, body: updateNotebookSchema }), controller.update);
notebooksRoutes.delete("/:notebookId", requireCsrfToken, validateRequest({ params: notebookParamsSchema }), controller.remove);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notebooks\notebooks.schema.ts</span>
  </div>

```ts
import { z } from "zod";

export const notebookParamsSchema = z.object({
  notebookId: z.string().uuid()
});

export const createNotebookSchema = z.object({
  name: z.string().trim().min(1).max(120)
});

export const updateNotebookSchema = createNotebookSchema;
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notebooks\notebooks.service.ts</span>
  </div>

```ts
import type { AuthContext } from "../../shared/auth/auth-context.js";
import { assertOwner } from "../../shared/auth/authorize-owner.js";
import { HttpError } from "../../shared/errors/http-error.js";
import { mapPrismaError } from "../../db/prisma-errors.js";
import * as repository from "./notebooks.repository.js";

export async function list(auth: AuthContext) {
  const notebooks = await repository.listNotebooks(auth.userId);
  return notebooks.map(repository.toNotebookDto);
}

export async function create(auth: AuthContext, input: { name: string }) {
  try {
    const notebook = await repository.createNotebook({ ownerId: auth.userId, name: input.name });
    return repository.toNotebookDto(notebook);
  } catch (error) {
    mapPrismaError(error, "NOTEBOOK_NAME_CONFLICT");
  }
}

export async function get(auth: AuthContext, notebookId: string) {
  const notebook = await getOwnedNotebook(auth, notebookId);
  return repository.toNotebookDto(notebook);
}

export async function update(auth: AuthContext, notebookId: string, input: { name: string }) {
  await getOwnedNotebook(auth, notebookId);

  try {
    const notebook = await repository.updateNotebook(notebookId, input);
    return repository.toNotebookDto(notebook);
  } catch (error) {
    mapPrismaError(error, "NOTEBOOK_NAME_CONFLICT");
  }
}

export async function remove(auth: AuthContext, notebookId: string): Promise<void> {
  await getOwnedNotebook(auth, notebookId);
  await repository.deleteNotebook(notebookId);
}

async function getOwnedNotebook(auth: AuthContext, notebookId: string) {
  const notebook = await repository.findNotebookById(notebookId);
  if (!notebook) {
    throw new HttpError(404, "Notebook was not found.", "NOTEBOOK_NOT_FOUND");
  }

  assertOwner(auth, notebook.ownerId);
  return notebook;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notebooks\notebooks.types.ts</span>
  </div>

```ts
export type NotebookDto = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type NotebookRecord = {
  id: string;
  ownerId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notes\notebook-notes.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { authenticateSession } from "../../shared/auth/authenticate-session.js";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { createNoteSchema, listNotesQuerySchema, notebookOnlyParamsSchema } from "./notes.schema.js";
import * as controller from "./notes.controller.js";

export const notebookNotesRoutes = Router({ mergeParams: true });

notebookNotesRoutes.use(authenticateSession);
notebookNotesRoutes.get("/", validateRequest({ params: notebookOnlyParamsSchema, query: listNotesQuerySchema }), controller.list);
notebookNotesRoutes.post("/", requireCsrfToken, validateRequest({ params: notebookOnlyParamsSchema, body: createNoteSchema }), controller.create);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notes\notes.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./notes.service.js";

export const list: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.list(auth, {
      notebookId: routeParam(request.params.notebookId),
      status: request.query.status as never,
      limit: Number(request.query.limit),
      offset: Number(request.query.offset)
    }));
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 201, await service.create(auth, routeParam(request.params.notebookId), request.body));
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.getById(auth, routeParam(request.params.noteId)));
  } catch (error) {
    next(error);
  }
};

export const updateById: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.updateById(auth, routeParam(request.params.noteId), request.body));
  } catch (error) {
    next(error);
  }
};

export const removeById: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    await service.removeById(auth, routeParam(request.params.noteId));
    sendResponse(response, 200, { deleted: true });
  } catch (error) {
    next(error);
  }
};

function routeParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notes\notes.repository.ts</span>
  </div>

```ts
import { prisma } from "../../db/prisma.js";
import type { NoteDto, NoteRecord, NoteStatus } from "./notes.types.js";

export function toNoteDto(note: NoteRecord): NoteDto {
  return {
    id: note.id,
    notebookId: note.notebookId,
    title: note.title,
    body: note.body,
    status: note.status,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString()
  };
}

export async function listNotes(input: {
  ownerId: string;
  notebookId: string;
  status?: NoteStatus;
  limit: number;
  offset: number;
}): Promise<NoteRecord[]> {
  return prisma.note.findMany({
    where: {
      ownerId: input.ownerId,
      notebookId: input.notebookId,
      status: input.status
    },
    orderBy: { createdAt: "desc" },
    take: input.limit,
    skip: input.offset
  });
}

export async function findNoteById(id: string): Promise<NoteRecord | null> {
  return prisma.note.findUnique({ where: { id } });
}

export async function createNote(input: {
  ownerId: string;
  notebookId: string;
  title: string;
  body: string;
  status: NoteStatus;
}): Promise<NoteRecord> {
  return prisma.note.create({ data: input });
}

export async function updateNote(id: string, input: Partial<Pick<NoteRecord, "title" | "body" | "status">>): Promise<NoteRecord> {
  return prisma.note.update({
    where: { id },
    data: input
  });
}

export async function deleteNote(id: string): Promise<void> {
  await prisma.note.delete({ where: { id } });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notes\notes.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { authenticateSession } from "../../shared/auth/authenticate-session.js";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { noteIdParamsSchema, updateNoteSchema } from "./notes.schema.js";
import * as controller from "./notes.controller.js";

export const notesRoutes = Router();

notesRoutes.use(authenticateSession);
notesRoutes.get("/:noteId", validateRequest({ params: noteIdParamsSchema }), controller.getById);
notesRoutes.patch("/:noteId", requireCsrfToken, validateRequest({ params: noteIdParamsSchema, body: updateNoteSchema }), controller.updateById);
notesRoutes.delete("/:noteId", requireCsrfToken, validateRequest({ params: noteIdParamsSchema }), controller.removeById);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notes\notes.schema.ts</span>
  </div>

```ts
import { z } from "zod";

export const noteStatusSchema = z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]);

export const noteParamsSchema = z.object({
  notebookId: z.string().uuid(),
  noteId: z.string().uuid()
});

export const noteIdParamsSchema = z.object({
  noteId: z.string().uuid()
});

export const notebookOnlyParamsSchema = z.object({
  notebookId: z.string().uuid()
});

export const listNotesQuerySchema = z.object({
  status: noteStatusSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0)
});

export const createNoteSchema = z.object({
  title: z.string().trim().min(1).max(160),
  body: z.string().max(10000).default(""),
  status: noteStatusSchema.default("ACTIVE")
});

export const updateNoteSchema = createNoteSchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: "At least one field is required."
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notes\notes.service.ts</span>
  </div>

```ts
import type { AuthContext } from "../../shared/auth/auth-context.js";
import { assertOwner } from "../../shared/auth/authorize-owner.js";
import { HttpError } from "../../shared/errors/http-error.js";
import { mapPrismaError } from "../../db/prisma-errors.js";
import { findNotebookById } from "../notebooks/notebooks.repository.js";
import * as repository from "./notes.repository.js";
import type { NoteStatus } from "./notes.types.js";

export async function list(auth: AuthContext, input: { notebookId: string; status?: NoteStatus; limit: number; offset: number }) {
  await assertNotebookOwner(auth, input.notebookId);
  const notes = await repository.listNotes({
    ownerId: auth.userId,
    notebookId: input.notebookId,
    status: input.status,
    limit: input.limit,
    offset: input.offset
  });
  return notes.map(repository.toNoteDto);
}

export async function create(auth: AuthContext, notebookId: string, input: { title: string; body: string; status: NoteStatus }) {
  await assertNotebookOwner(auth, notebookId);

  try {
    const note = await repository.createNote({
      ownerId: auth.userId,
      notebookId,
      title: input.title,
      body: input.body,
      status: input.status
    });
    return repository.toNoteDto(note);
  } catch (error) {
    mapPrismaError(error, "NOTE_TITLE_CONFLICT");
  }
}

export async function getById(auth: AuthContext, noteId: string) {
  const note = await getOwnedNoteById(auth, noteId);
  return repository.toNoteDto(note);
}

export async function updateById(auth: AuthContext, noteId: string, input: Partial<{ title: string; body: string; status: NoteStatus }>) {
  await getOwnedNoteById(auth, noteId);

  try {
    const note = await repository.updateNote(noteId, input);
    return repository.toNoteDto(note);
  } catch (error) {
    mapPrismaError(error, "NOTE_TITLE_CONFLICT");
  }
}

export async function removeById(auth: AuthContext, noteId: string): Promise<void> {
  await getOwnedNoteById(auth, noteId);
  await repository.deleteNote(noteId);
}

async function assertNotebookOwner(auth: AuthContext, notebookId: string): Promise<void> {
  const notebook = await findNotebookById(notebookId);
  if (!notebook) {
    throw new HttpError(404, "Notebook was not found.", "NOTEBOOK_NOT_FOUND");
  }

  assertOwner(auth, notebook.ownerId);
}

async function getOwnedNoteById(auth: AuthContext, noteId: string) {
  const note = await repository.findNoteById(noteId);
  if (!note) {
    throw new HttpError(404, "Note was not found.", "NOTE_NOT_FOUND");
  }

  assertOwner(auth, note.ownerId);
  return note;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\notes\notes.types.ts</span>
  </div>

```ts
export type NoteStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type NoteDto = {
  id: string;
  notebookId: string;
  title: string;
  body: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
};

export type NoteRecord = {
  id: string;
  ownerId: string;
  notebookId: string;
  title: string;
  body: string;
  status: NoteStatus;
  createdAt: Date;
  updatedAt: Date;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\users\users.admin.ts</span>
  </div>

```ts
import { prisma } from "../../db/prisma.js";
import type { PublicUser } from "./users.types.js";
import { toPublicUser } from "./users.repository.js";

export async function listPublicUsersForAdmin(): Promise<PublicUser[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  return users.map(toPublicUser);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\users\users.repository.ts</span>
  </div>

```ts
import { prisma } from "../../db/prisma.js";
import type { PublicUser, Role, UserRecord } from "./users.types.js";

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString()
  };
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  return user ? toUserRecord(user) : null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const user = await prisma.user.findUnique({ where: { id } });
  return user ? toUserRecord(user) : null;
}

export async function createUser(input: { email: string; passwordHash: string; role?: Role }): Promise<UserRecord> {
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash: input.passwordHash,
      role: input.role ?? "USER"
    }
  });

  return toUserRecord(user);
}

function toUserRecord(user: { id: string; email: string; passwordHash: string; role: Role; createdAt: Date }): UserRecord {
  return {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    role: user.role,
    createdAt: user.createdAt
  };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\modules\users\users.types.ts</span>
  </div>

```ts
export type Role = "USER" | "ADMIN";

export type PublicUser = {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
};

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: Date;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\auth-context.ts</span>
  </div>

```ts
import type { Response } from "express";
import { HttpError } from "../errors/http-error.js";

export type Role = "USER" | "ADMIN";

export type AuthContext = {
  userId: string;
  email: string;
  role: Role;
  sessionId: string;
};

export function attachAuthContext(response: Response, auth: AuthContext): void {
  response.locals.auth = auth;
}

export function requireAuthContext(response: Response): AuthContext {
  const auth = response.locals.auth as AuthContext | undefined;

  if (!auth) {
    throw new HttpError(401, "Authentication is required.", "AUTH_REQUIRED");
  }

  return auth;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\authenticate-session.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { config } from "../../config/env.js";
import { prisma } from "../../db/prisma.js";
import { HttpError } from "../errors/http-error.js";
import { parseCookieHeader } from "../cookies/cookie-parser.js";
import { attachAuthContext } from "./auth-context.js";
import { hashSessionToken } from "./session-token.js";

export const authenticateSession: RequestHandler = async (request, response, next) => {
  try {
    const cookies = parseCookieHeader(request.headers.cookie);
    const token = cookies.get(config.SESSION_COOKIE_NAME);

    if (!token) {
      throw new HttpError(401, "Authentication is required.", "AUTH_REQUIRED");
    }

    const tokenHash = hashSessionToken(token);
    const session = await prisma.session.findUnique({
      where: { tokenHash },
      include: { user: true }
    });

    if (!session || session.revokedAt || session.expiresAt.getTime() <= Date.now()) {
      throw new HttpError(401, "Authentication is required.", "AUTH_REQUIRED");
    }

    attachAuthContext(response, {
      userId: session.userId,
      email: session.user.email,
      role: session.user.role,
      sessionId: session.id
    });

    next();
  } catch (error) {
    next(error);
  }
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\authorize-owner.ts</span>
  </div>

```ts
import type { AuthContext } from "./auth-context.js";
import { HttpError } from "../errors/http-error.js";

export function assertOwner(auth: AuthContext, ownerId: string): void {
  if (auth.userId !== ownerId) {
    throw new HttpError(403, "You do not own this resource.", "FORBIDDEN_OWNER");
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\authorize-role.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import type { Role } from "./auth-context.js";
import { requireAuthContext } from "./auth-context.js";
import { HttpError } from "../errors/http-error.js";

export function authorizeRole(...allowedRoles: Role[]): RequestHandler {
  return (_request, response, next) => {
    try {
      const auth = requireAuthContext(response);
      if (!allowedRoles.includes(auth.role)) {
        throw new HttpError(403, "This action requires a different role.", "FORBIDDEN_ROLE");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\csrf.ts</span>
  </div>

```ts
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import type { RequestHandler } from "express";
import { prisma } from "../../db/prisma.js";
import { HttpError } from "../errors/http-error.js";
import { requireAuthContext } from "./auth-context.js";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export function createCsrfToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashCsrfToken(token: string): string {
  return createHash("sha256").update("csrf:" + token, "utf8").digest("base64url");
}

export async function issueCsrfTokenForSession(sessionId: string): Promise<string> {
  const token = createCsrfToken();
  await prisma.session.update({
    where: { id: sessionId },
    data: { csrfTokenHash: hashCsrfToken(token) }
  });
  return token;
}

export const requireCsrfToken: RequestHandler = async (request, response, next) => {
  try {
    if (SAFE_METHODS.has(request.method)) {
      next();
      return;
    }

    const auth = requireAuthContext(response);
    const token = request.header("x-csrf-token");
    if (!token) {
      throw new HttpError(403, "CSRF token is required.", "CSRF_REQUIRED");
    }

    const session = await prisma.session.findUnique({
      where: { id: auth.sessionId },
      select: { csrfTokenHash: true }
    });

    if (!session?.csrfTokenHash || !isHashMatch(hashCsrfToken(token), session.csrfTokenHash)) {
      throw new HttpError(403, "CSRF token is invalid.", "CSRF_INVALID");
    }

    next();
  } catch (error) {
    next(error);
  }
};

function isHashMatch(candidateHash: string, expectedHash: string): boolean {
  const candidate = Buffer.from(candidateHash, "base64url");
  const expected = Buffer.from(expectedHash, "base64url");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\password-hashing.ts</span>
  </div>

```ts
import { argon2, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

type Argon2Parameters = {
  message: Buffer;
  nonce: Buffer;
  parallelism: number;
  memory: number;
  passes: number;
  tagLength: number;
};

type ParsedPasswordHash = {
  memory: number;
  passes: number;
  parallelism: number;
  tagLength: number;
  nonce: Buffer;
  tag: Buffer;
};

const CURRENT_PARAMETERS = {
  memory: 65536,
  passes: 3,
  parallelism: 4,
  tagLength: 32
};

const argon2Async = promisify(argon2) as unknown as (
  algorithm: "argon2id",
  parameters: Argon2Parameters
) => Promise<Buffer>;

export async function hashPassword(password: string): Promise<string> {
  const nonce = randomBytes(16);
  const tag = await argon2Async("argon2id", {
    message: Buffer.from(password, "utf8"),
    nonce,
    ...CURRENT_PARAMETERS
  });

  return [
    "secure-notes",
    "argon2id",
    "v=1",
    "m=" + CURRENT_PARAMETERS.memory,
    "t=" + CURRENT_PARAMETERS.passes,
    "p=" + CURRENT_PARAMETERS.parallelism,
    "l=" + CURRENT_PARAMETERS.tagLength,
    "s=" + nonce.toString("base64url"),
    "h=" + tag.toString("base64url")
  ].join("$");
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const parsed = parsePasswordHash(storedHash);
    const candidateTag = await argon2Async("argon2id", {
      message: Buffer.from(password, "utf8"),
      nonce: parsed.nonce,
      memory: parsed.memory,
      passes: parsed.passes,
      parallelism: parsed.parallelism,
      tagLength: parsed.tagLength
    });

    return candidateTag.length === parsed.tag.length && timingSafeEqual(candidateTag, parsed.tag);
  } catch {
    return false;
  }
}

export function shouldUpgradePasswordHash(storedHash: string): boolean {
  const parsed = parsePasswordHash(storedHash);
  return parsed.memory !== CURRENT_PARAMETERS.memory
    || parsed.passes !== CURRENT_PARAMETERS.passes
    || parsed.parallelism !== CURRENT_PARAMETERS.parallelism
    || parsed.tagLength !== CURRENT_PARAMETERS.tagLength;
}

function parsePasswordHash(storedHash: string): ParsedPasswordHash {
  const parts = storedHash.split("$");
  if (parts.length !== 9 || parts[0] !== "secure-notes" || parts[1] !== "argon2id") {
    throw new Error("Unsupported password hash format.");
  }

  const values = new Map(parts.slice(2).map((part) => part.split("=", 2) as [string, string]));

  return {
    memory: Number(values.get("m")),
    passes: Number(values.get("t")),
    parallelism: Number(values.get("p")),
    tagLength: Number(values.get("l")),
    nonce: Buffer.from(values.get("s") ?? "", "base64url"),
    tag: Buffer.from(values.get("h") ?? "", "base64url")
  };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\auth\session-token.ts</span>
  </div>

```ts
import { createHash, randomBytes } from "node:crypto";
import { config } from "../../config/env.js";

export function createSessionToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("base64url");
}

export function createSessionExpiration(now = new Date()): Date {
  return new Date(now.getTime() + config.SESSION_TTL_SECONDS * 1000);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\cookies\cookie-parser.ts</span>
  </div>

```ts
export function parseCookieHeader(cookieHeader: string | undefined): Map<string, string> {
  const cookies = new Map<string, string>();

  if (!cookieHeader) {
    return cookies;
  }

  for (const part of cookieHeader.split(";")) {
    const [rawName, ...rawValue] = part.trim().split("=");
    if (!rawName) {
      continue;
    }

    cookies.set(decodeURIComponent(rawName), decodeURIComponent(rawValue.join("=")));
  }

  return cookies;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\cookies\session-cookie.ts</span>
  </div>

```ts
import type { Response } from "express";
import { config } from "../../config/env.js";

export function setSessionCookie(response: Response, token: string): void {
  response.cookie(config.SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: config.COOKIE_SECURE,
    sameSite: "lax",
    path: "/",
    maxAge: config.SESSION_TTL_SECONDS * 1000
  });
}

export function clearSessionCookie(response: Response): void {
  response.clearCookie(config.SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: config.COOKIE_SECURE,
    sameSite: "lax",
    path: "/"
  });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\errors\error-middleware.ts</span>
  </div>

```ts
import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { HttpError } from "./http-error.js";
import { logger } from "../logging/logger.js";

export const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      ok: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Request validation failed.",
        details: error.issues
      },
      requestId: response.locals.requestId
    });
    return;
  }

  if (error instanceof HttpError) {
    response.status(error.statusCode).json({
      ok: false,
      error: {
        code: error.code,
        message: error.message,
        details: []
      },
      requestId: response.locals.requestId
    });
    return;
  }

  logger.error({ requestId: response.locals.requestId, error }, "Unhandled request error");
  response.status(500).json({
    ok: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error.",
      details: []
    },
    requestId: response.locals.requestId
  });
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\errors\http-error.ts</span>
  </div>

```ts
export class HttpError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(statusCode: number, message: string, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\logging\logger.ts</span>
  </div>

```ts
type LogPayload = Record<string, unknown>;

function write(level: "info" | "error", payload: LogPayload, message: string): void {
  const entry = {
    level,
    message,
    ...payload
  };

  if (level === "error") {
    console.error(JSON.stringify(entry));
    return;
  }

  console.log(JSON.stringify(entry));
}

export const logger = {
  info(payload: LogPayload, message: string) {
    write("info", payload, message);
  },
  error(payload: LogPayload, message: string) {
    write("error", payload, message);
  }
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\middleware\cors.ts</span>
  </div>

```ts
import cors from "cors";
import { allowedCorsOrigins } from "../../config/env.js";

const allowedOrigins = new Set(allowedCorsOrigins);

export const corsMiddleware = cors({
  credentials: true,
  origin(origin, callback) {
    if (!origin) {
      callback(null, false);
      return;
    }

    callback(null, allowedOrigins.has(origin) ? origin : false);
  }
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\middleware\not-found.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { HttpError } from "../errors/http-error.js";

export const notFound: RequestHandler = (request, _response, next) => {
  next(new HttpError(404, "Route " + request.method + " " + request.path + " was not found.", "ROUTE_NOT_FOUND"));
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\middleware\rate-limit.ts</span>
  </div>

```ts
import rateLimit from "express-rate-limit";

export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    ok: false,
    error: {
      code: "LOGIN_RATE_LIMITED",
      message: "Too many login attempts. Try again later."
    }
  }
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\middleware\request-id.ts</span>
  </div>

```ts
import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

export const requestId: RequestHandler = (_request, response, next) => {
  response.locals.requestId = randomUUID();
  next();
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\middleware\security-headers.ts</span>
  </div>

```ts
import helmet from "helmet";

export const securityHeaders = helmet();
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\responses\send-response.ts</span>
  </div>

```ts
import type { Response } from "express";

export function sendResponse<T>(response: Response, statusCode: number, data: T): void {
  response.status(statusCode).json({
    ok: true,
    data,
    requestId: response.locals.requestId
  });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\src\shared\validation\validate-request.ts</span>
  </div>

```ts
import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodType } from "zod";

type RequestSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export function validateRequest(schemas: RequestSchemas): RequestHandler {
  return (request: Request, _response: Response, next: NextFunction) => {
    if (schemas.body) {
      request.body = schemas.body.parse(request.body);
    }

    if (schemas.params) {
      request.params = schemas.params.parse(request.params) as Request["params"];
    }

    if (schemas.query) {
      request.query = schemas.query.parse(request.query) as Request["query"];
    }

    next();
  };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\tests\auth.integration.test.ts</span>
  </div>

```ts
import assert from "node:assert/strict";
import { after, beforeEach, describe, it } from "node:test";
import request from "supertest";

process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??= "postgresql://postgres:postgres@localhost:5432/secure_notes_auth_api_test?schema=public";
process.env.CORS_ALLOWED_ORIGINS ??= "http://localhost:5173";
process.env.SESSION_COOKIE_NAME ??= "secure_notes_session";
process.env.COOKIE_SECURE ??= "false";

const { app } = await import("../src/app.js");
const { prisma } = await import("../src/db/prisma.js");
const { resetTestDatabase } = await import("./helpers/database.js");

describe("auth session api", () => {
  beforeEach(async () => {
    await resetTestDatabase();
  });

  after(async () => {
    await prisma.$disconnect();
  });

  it("registers a user, stores an Argon2id verifier, and sets a session cookie", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ email: "alice@example.com", password: "alice-passphrase-2026" })
      .expect(201);

    assert.equal(response.body.ok, true);
    assert.equal(response.body.data.user.email, "alice@example.com");
    assert.match(response.headers["set-cookie"][0], /HttpOnly/);

    const stored = await prisma.user.findUnique({ where: { email: "alice@example.com" } });
    assert.ok(stored);
    assert.notEqual(stored.passwordHash, "alice-passphrase-2026");
    assert.match(stored.passwordHash, /^secure-notes\$argon2id\$/);
  });

  it("uses a generic login failure for unknown email and wrong password", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "alice@example.com", password: "alice-passphrase-2026" })
      .expect(201);

    const missing = await request(app)
      .post("/auth/login")
      .send({ email: "missing@example.com", password: "alice-passphrase-2026" })
      .expect(401);

    const wrong = await request(app)
      .post("/auth/login")
      .send({ email: "alice@example.com", password: "wrong-passphrase-2026" })
      .expect(401);

    assert.equal(missing.body.error.code, "INVALID_CREDENTIALS");
    assert.equal(wrong.body.error.code, "INVALID_CREDENTIALS");
    assert.equal(missing.body.error.message, wrong.body.error.message);
  });

  it("issues a session-bound CSRF token and revokes the session on logout", async () => {
    const agent = request.agent(app);

    await agent
      .post("/auth/register")
      .send({ email: "alice@example.com", password: "alice-passphrase-2026" })
      .expect(201);

    await agent.get("/auth/me").expect(200);

    const csrfResponse = await agent.get("/auth/csrf").expect(200);
    const csrfToken = csrfResponse.body.data.csrfToken;

    await agent.post("/auth/logout").set("x-csrf-token", csrfToken).expect(200);
    await agent.get("/auth/me").expect(401);
  });

  it("emits credentialed CORS headers only for the allowlist", async () => {
    const response = await request(app)
      .get("/auth/me")
      .set("Origin", "http://localhost:5173")
      .expect(401);

    assert.equal(response.headers["access-control-allow-origin"], "http://localhost:5173");
    assert.equal(response.headers["access-control-allow-credentials"], "true");
  });
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\tests\helpers\database.ts</span>
  </div>

```ts
import { prisma } from "../../src/db/prisma.js";

export async function resetTestDatabase() {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Refusing to reset database outside NODE_ENV=test");
  }

  await prisma.$transaction([
    prisma.note.deleteMany(),
    prisma.notebook.deleteMany(),
    prisma.session.deleteMany(),
    prisma.user.deleteMany()
  ]);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects\secure-notes-auth-api\tests\protected-notes.integration.test.ts</span>
  </div>

```ts
import assert from "node:assert/strict";
import { after, beforeEach, describe, it } from "node:test";
import request from "supertest";

process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??= "postgresql://postgres:postgres@localhost:5432/secure_notes_auth_api_test?schema=public";
process.env.CORS_ALLOWED_ORIGINS ??= "http://localhost:5173";
process.env.SESSION_COOKIE_NAME ??= "secure_notes_session";
process.env.COOKIE_SECURE ??= "false";

const { app } = await import("../src/app.js");
const { prisma } = await import("../src/db/prisma.js");
const { resetTestDatabase } = await import("./helpers/database.js");
const { hashPassword } = await import("../src/shared/auth/password-hashing.js");

async function createAuthenticatedAgent(email: string, role: "USER" | "ADMIN" = "USER") {
  await prisma.user.create({
    data: {
      email,
      role,
      passwordHash: await hashPassword("shared-passphrase-2026")
    }
  });

  const agent = request.agent(app);
  await agent
    .post("/auth/login")
    .send({ email, password: "shared-passphrase-2026" })
    .expect(200);

  const csrfResponse = await agent.get("/auth/csrf").expect(200);
  return {
    agent,
    csrfToken: csrfResponse.body.data.csrfToken
  };
}

describe("protected notes and role authorization", () => {
  beforeEach(async () => {
    await resetTestDatabase();
  });

  after(async () => {
    await prisma.$disconnect();
  });

  it("rejects protected writes without CSRF and accepts writes with the session token", async () => {
    const alice = await createAuthenticatedAgent("alice@example.com");

    await alice.agent.post("/notebooks").send({ name: "Work" }).expect(403);

    const notebookResponse = await alice.agent
      .post("/notebooks")
      .set("x-csrf-token", alice.csrfToken)
      .send({ name: "Work" })
      .expect(201);

    const noteResponse = await alice.agent
      .post("/notebooks/" + notebookResponse.body.data.id + "/notes")
      .set("x-csrf-token", alice.csrfToken)
      .send({ title: "Boundary", body: "Owned note", status: "ACTIVE" })
      .expect(201);

    assert.equal(noteResponse.body.data.title, "Boundary");

    const topLevelResponse = await alice.agent
      .get("/notes/" + noteResponse.body.data.id)
      .expect(200);

    assert.equal(topLevelResponse.body.data.id, noteResponse.body.data.id);
  });

  it("rejects cross-user notebook access at the owner boundary", async () => {
    const alice = await createAuthenticatedAgent("alice@example.com");
    const bob = await createAuthenticatedAgent("bob@example.com");

    const notebookResponse = await alice.agent
      .post("/notebooks")
      .set("x-csrf-token", alice.csrfToken)
      .send({ name: "Private" })
      .expect(201);

    await bob.agent.get("/notebooks/" + notebookResponse.body.data.id).expect(403);
  });

  it("contrasts USER and ADMIN role authorization", async () => {
    const alice = await createAuthenticatedAgent("alice@example.com", "USER");
    const admin = await createAuthenticatedAgent("admin@example.com", "ADMIN");

    await alice.agent.get("/admin/users").expect(403);

    const adminResponse = await admin.agent.get("/admin/users").expect(200);
    assert.ok(Array.isArray(adminResponse.body.data.users));
  });
});
```
</div>

## 15. 知识迁移与真实项目场景

真实项目会把这些边界扩展到更复杂的基础设施：Redis 可以降低 session lookup 延迟，OAuth provider 可以改变 identity proof 来源，反向代理会影响 secure cookie 和 client IP，邮件流程会引入一次性 token，生产运行环境会改变 `COOKIE_SECURE` 与 proxy trust 判断。本章先保留单体 Express + Prisma 版本，是为了把机制学清楚。

从 Chapter 05 迁移到本章时，最重要的变化是资源从“全局数据”变成“有 owner 的数据”。`Notebook.name` 从全局唯一变为按 owner 唯一；note 不再只属于 notebook，也属于 user；错误处理不仅映射数据库约束，还要映射认证失败、授权失败和 CSRF 失败。

## 16. 本章复盘任务

1. 画出 `POST /auth/login` 从 request body 到 `Set-Cookie` 的链路。
2. 解释为什么数据库只保存 session token hash。
3. 对比 owner authorization 和 role authorization。
4. 解释为什么 `GET /notes/:noteId` 不需要 notebookId 也能做 owner check。
5. 解释 Express error middleware 为什么在 `headersSent` 后必须调用 `next(error)`。
6. 写出 macOS / Linux 与 Windows PowerShell 两种测试命令。

## 17. 最终心智模型

认证系统不是一个登录函数，而是一条服务端证据链：password 生成 verifier，session token 变成数据库 hash，cookie 只是浏览器携带句柄，CSRF token 证明 mutation 意图，owner 和 role 决定资源访问，Express error middleware 保证失败路径也进入正确生命周期。

## 18. 官方资料

- Node.js crypto：https://nodejs.org/api/crypto.html
- Node.js test runner：https://nodejs.org/api/test.html
- Express 5 error handling：https://expressjs.com/en/guide/error-handling/
- Express 5 API：https://expressjs.com/en/5x/api/
- Express middleware：https://expressjs.com/en/guide/using-middleware/
- MDN Set-Cookie：https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
- MDN secure cookie configuration：https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/Cookies
- MDN CORS guide：https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
- MDN credentialed CORS wildcard error：https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSNotSupportingCredentials
- OWASP CSRF Prevention Cheat Sheet：https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
- OWASP Password Storage Cheat Sheet：https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- Prisma config reference：https://www.prisma.io/docs/orm/reference/prisma-config-reference
- Prisma schema overview：https://www.prisma.io/docs/orm/prisma-schema/overview
- Prisma Client CRUD：https://www.prisma.io/docs/orm/prisma-client/queries/crud
- Prisma relations：https://www.prisma.io/docs/orm/prisma-schema/data-model/relations
- Prisma Migrate development and production：https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production
- npm scripts：https://docs.npmjs.com/cli/v11/using-npm/scripts/
- npm run：https://docs.npmjs.com/cli/v11/commands/npm-run/
