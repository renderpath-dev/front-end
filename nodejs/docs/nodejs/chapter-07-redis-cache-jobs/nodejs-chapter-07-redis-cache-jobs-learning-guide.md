# Node.js 第 7 章：Redis、缓存、分布式限流、后台任务与 Worker 边界

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
  - [9.1 Redis mental model：external in-memory data structure service](#section-9-1)
  - [9.2 Redis versus PostgreSQL：cache / coordination state versus source of truth](#section-9-2)
  - [9.3 node-redis connection lifecycle：createClient、connect、error、quit](#section-9-3)
  - [9.4 Redis key design：namespace、user boundary、version、query hash](#section-9-4)
  - [9.5 Redis strings、JSON serialization、Date boundary](#section-9-5)
  - [9.6 TTL and expiration：SET EX、EXPIRE、TTL、stale window](#section-9-6)
  - [9.7 Cache-aside read path：hit、miss、database fallback、write-back](#section-9-7)
  - [9.8 Cache invalidation on write：primary write first, then delete affected keys](#section-9-8)
  - [9.9 Cache stampede：popular key expiration and singleflight mitigation](#section-9-9)
  - [9.10 Redis pipeline versus Redis transaction：network batching versus atomic command group](#section-9-10)
  - [9.11 Distributed rate limiting：why in-memory limiter is not enough](#section-9-11)
  - [9.12 Redis fixed-window limiter：INCR、expiration、429 response](#section-9-12)
  - [9.13 Redis failure policy：cache fallback, limiter policy, queue enqueue failure](#section-9-13)
  - [9.14 Background jobs：why HTTP should not wait for long work](#section-9-14)
  - [9.15 BullMQ queue model：Queue、Job、Worker、QueueEvents](#section-9-15)
  - [9.16 Job payload validation：Zod and durable job status row](#section-9-16)
  - [9.17 202 Accepted and job status API：enqueue now, finish later](#section-9-17)
  - [9.18 Retries and backoff：attempts, failed jobs, transient failures](#section-9-18)
  - [9.19 Idempotent worker handlers：safe retry and duplicate delivery](#section-9-19)
  - [9.20 Custom job IDs, deduplication, and colon separator boundary](#section-9-20)
  - [9.21 Stalled jobs and Node event loop blocking](#section-9-21)
  - [9.22 Worker process lifecycle：worker.close、Redis quit、signal shutdown](#section-9-22)
  - [9.23 Chapter integration: redis-job-notes-api](#section-9-23)
- [10. API 与规则索引](#10-api-与规则索引)
- [11. 常见错误对照表](#11-常见错误对照表)
- [12. 调试与验证方法](#12-调试与验证方法)
- [13. 分项练习说明](#13-分项练习说明)
- [14. 最终迷你项目](#14-最终迷你项目)
  - [14.1 项目目标](#141-项目目标)
  - [14.2 运行与资源边界](#142-运行与资源边界)
  - [14.3 完整项目代码](#143-完整项目代码)
  - [14.4 端到端执行链](#144-端到端执行链)
- [15. 知识迁移与真实项目场景](#15-知识迁移与真实项目场景)
- [16. 本章复盘任务](#16-本章复盘任务)
- [17. 最终心智模型](#17-最终心智模型)
- [18. 官方资料](#18-官方资料)

## 本章代码定位索引

| 学习目标 | 文件或片段 | 可观察证据 |
| --- | --- | --- |
| 建立 Redis 连接生命周期 | `practices/07-redis-cache-jobs/01-redis-client/redis-connect.ts` | `connect()` 后写入带 TTL 的字符串，`quit()` 后释放连接 |
| 设计用户边界内的缓存键 | `practices/07-redis-cache-jobs/01-redis-client/redis-key-design.ts` | 查询参数归一化后得到稳定 query hash |
| 观察 cache-aside 命中与回源 | `practices/07-redis-cache-jobs/02-cache-aside/cache-aside-read.ts` | 第一次读取 `MISS`，第二次读取 `HIT` |
| 观察 TTL stale window | `practices/07-redis-cache-jobs/02-cache-aside/ttl-stale-window.ts` | key 新鲜度可以用应用层窗口建模 |
| 观察写入后的缓存删除 | `practices/07-redis-cache-jobs/02-cache-aside/cache-invalidation-on-write.ts` | 主存储写入后旧列表键不再存在 |
| 观察 Redis 失败策略 | `practices/07-redis-cache-jobs/02-cache-aside/cache-failure-policy.ts` | cache 失败可按策略回源或抛错 |
| 理解 Redis 限流计数 | `practices/07-redis-cache-jobs/03-rate-limit/redis-fixed-window-limiter.ts` | `INCR` 与 `EXPIRE` 形成窗口内共享计数 |
| 理解 Worker 基本处理 | `practices/07-redis-cache-jobs/04-bullmq-basics/worker-process-job.ts` | Worker processor 读取 job payload 并执行 |
| 理解队列、Worker 与事件 | `practices/07-redis-cache-jobs/04-bullmq-basics/queue-events.ts` | `completed` 与 `failed` 事件可被单独观察 |
| 理解重试安全性 | `practices/07-redis-cache-jobs/05-retries-idempotency/idempotent-job-handler.ts` | 重复处理同一任务不会重复写完成结果 |
| 配置最终项目环境 | `mini-projects/redis-job-notes-api/.env.example` | PostgreSQL、Redis、cache TTL、export limiter 配置集中在项目内 |
| 整合最终 API | `mini-projects/redis-job-notes-api/src/app.ts` | 路由同时暴露 auth、notebooks、notes、cache debug 与 exports |

## 0. 章前定位

本章位于缓存与异步负载协调阶段。你已经在前面章节完成 Express 请求生命周期、TypeScript 运行时边界、PostgreSQL 持久化、认证、会话、CSRF 与 owner authorization。本章不重新讲这些基础，而是在这些边界之上加入 Redis 与 BullMQ。

核心变化是：HTTP 请求不再只访问 PostgreSQL。一次读取可能先查 Redis；一次写入必须先更新 source of truth，再删除受影响的缓存键；一次耗时导出不应该阻塞 HTTP，而是写入 PostgreSQL 状态行并把工作交给 Worker。

## 1. 学习目标

- 把 Redis 理解为外部 in-memory data structure service，而不是 Node 进程内变量。
- 区分 PostgreSQL 的 source-of-truth 职责与 Redis 的 cache / coordination state 职责。
- 使用 node-redis 建立连接、监听错误、执行命令并关闭连接。
- 使用 cache-aside、TTL、invalidation 与 singleflight 控制读取路径。
- 使用 Redis `INCR` 与 expiration 构建跨进程 fixed-window limiter。
- 使用 BullMQ 把长任务从 HTTP 请求中拆出，并用 PostgreSQL 状态行承载可查询结果。
- 解释 Worker 的重试、幂等、stalled job 与 graceful shutdown 边界。

## 2. 前置知识

你需要能读懂 Express middleware 顺序、session cookie 与 CSRF 校验、Prisma repository 查询、Zod runtime validation、HTTP status code、Node.js process signal，以及 TypeScript `NodeNext` 项目结构。

## 3. 环境与运行基线

本章实践使用 Node.js 26、npm 11、ESM、TypeScript `NodeNext`、Express 5、Prisma 7、node-redis、BullMQ、Zod、PostgreSQL 与 Redis。最终项目的环境样例文件位于 `mini-projects/redis-job-notes-api/.env.example`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
node -v
npm -v
npm view redis version
npm view bullmq version
```
</div>

## 4. 第一性原理

缓存不是第二个数据库。缓存只保存可以从 source of truth 重建的派生数据。限流计数也不是业务事实，它是短期协调状态。后台任务状态必须有 durable row，因为队列状态和 Worker 日志不能替代用户可查询的业务状态。

## 5. 技术边界模型

| 边界 | 本章职责 | 不负责的内容 |
| --- | --- | --- |
| Express | 接收 HTTP、校验 session / CSRF、返回 200 / 202 / 429 / 503 | 长时间执行导出工作 |
| PostgreSQL / Prisma | 保存用户、会话、笔记本、笔记、导出状态行 | 缓存命中路径和限流计数 |
| Redis | 保存 TTL 缓存、窗口计数、BullMQ 队列状态 | 永久保存业务事实 |
| BullMQ Queue | 接收任务并记录队列状态 | 替代业务状态 API |
| Worker | 执行可重试的后台任务 | 持有 HTTP response 对象 |

## 6. 底层机制模型

一次缓存读取会经过 Express handler、service、Redis socket、JSON parse、Zod validation、Prisma query、JSON serialization 与 Redis `SET EX`。一次限流会经过 middleware、身份键构造、Redis `INCR`、首次计数的 `EXPIRE`、HTTP header 和 429。一次后台任务会经过 HTTP 202、PostgreSQL `ExportJob` row、BullMQ `Queue.add()`、Redis queue data structure、Worker callback、Prisma 查询和状态行更新。

TypeScript 只能检查这些函数之间的静态形状；Redis 返回的字符串、HTTP body、job payload 与数据库记录仍然是运行时数据，必须解析和验证。

## 7. 核心术语

| 术语 | 本章含义 |
| --- | --- |
| cache-aside | 应用先读缓存，未命中时读数据库，再写回缓存 |
| TTL | Redis key 的存活时间 |
| invalidation | 主写入成功后删除受影响缓存键 |
| singleflight | 同一热门 key 的多个 miss 共享一个回源 Promise |
| fixed-window limiter | 在固定时间窗口内使用共享计数判断是否拒绝请求 |
| durable status row | PostgreSQL 中可被 API 查询的后台任务状态 |
| idempotent worker | 同一 job 重试或重复投递时不会重复产生副作用的 Worker |

## 8. 本章实践路线

先用 `practices/07-redis-cache-jobs` 拆开观察 Redis 命令、缓存读写、限流计数和 BullMQ 基本对象。再进入 `mini-projects/redis-job-notes-api`，把这些机制接入已有 notes API。

## 9. 核心教学

<a id="section-9-1"></a>

### 9.1 Redis mental model：external in-memory data structure service

**结论**：Redis 是一个独立运行的外部服务，Node.js 通过 socket 连接它；它不是 Node.js heap 里的 `Map`。

**本节解决的问题**：`redis-connect.ts` 中的 `createClient()` 只创建客户端对象和连接配置，真正的外部边界在 `await client.connect()`。连接成功后，`client.set()` 与 `client.get()` 不是读写 JavaScript 对象，而是把 Redis Serialization Protocol 命令发送到 Redis 进程。Redis 的 key/value 状态存在 Redis server 的内存空间里，不跟随 Node.js 进程的 heap 生命周期。

**底层机制**：重启 Node.js 只会销毁当前进程内的 `client`、Promise 和 socket handle；如果 Redis server 还在运行，`demo:connection` 这样的 key 可以继续存在直到 TTL 到期或 Redis 被清空。反过来，重启 Redis 可能丢失没有持久化保证的缓存状态，即使 Node.js 进程仍在运行也只能重新连接并重新填充缓存。这个边界解释了为什么缓存可丢弃，而不能把 Redis 当作业务事实来源。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/01-redis-client/redis-connect.ts</span>
  </div>

```ts
import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";
const client = createClient({ url: redisUrl });

client.on("error", (error) => {
  console.error("Redis client error", error);
});

await client.connect();
await client.set("demo:connection", "ready", { EX: 10 });
const value = await client.get("demo:connection");
console.log({ value });
await client.quit();
```
</div>

**逐行解释**：`redisUrl` 是连接目标，不是数据本身；`createClient` 创建可复用客户端；`error` 监听器处理 socket 或 Redis server 错误；`connect` 打开连接；`set` 写入 Redis 外部状态；`get` 从 Redis 读回字符串；`quit` 发送正常关闭意图并释放连接。

**执行过程**：Node.js 同步创建客户端对象，然后在 `connect`、`set`、`get`、`quit` 这些 await 点让事件循环等待 socket I/O 完成。Redis server 在另一个进程里接收命令并修改自己的内存数据结构。

**常见错误为什么错**：把 Redis 当作 `new Map()` 会误判生命周期和共享范围。`Map` 只在当前 Node.js 进程内可见；Redis 可以被多个 API 进程共享，也可能在 Redis 重启时丢失临时缓存。

**与真实项目的关系**：如果重启 API 后缓存仍可命中，说明状态不在 Node heap；如果 Redis 重启后所有缓存 miss，但 PostgreSQL 数据还在，说明缓存与 source of truth 的边界是正确的。

<a id="section-9-2"></a>

### 9.2 Redis versus PostgreSQL：cache / coordination state versus source of truth

**结论**：PostgreSQL 保存 durable business state；Redis 保存可以重建的 cache state、limiter state、queue state 或短期 coordination state。

**本节解决的问题**：`redis-key-design.ts` 只构造缓存 key，它不创建业务事实。`cache:user:{userId}:notebooks:v1` 这类值应该能从 PostgreSQL 的 notebooks 表重新查询出来；`rate:user:{userId}:exports:{windowStart}` 只表示当前窗口计数；BullMQ 在 Redis 中的 queue state 只表示任务调度状态；真正给用户查询的导出结果状态仍然由 PostgreSQL `ExportJob` row 承担。

**底层机制**：Redis 内存读写快，但它不是这个项目的权威记录层。丢失 cache key 的后果是下一次请求变慢并回源数据库；丢失 limiter key 的后果是当前窗口重新计数；丢失 PostgreSQL rows 的后果是用户、笔记、会话或导出状态永久缺失。业务事实和派生状态的损失等级不同，所以写入顺序、恢复策略和错误响应也必须不同。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/01-redis-client/redis-key-design.ts</span>
  </div>

```ts
import { createHash } from "node:crypto";

type NoteListQuery = {
  status?: "DRAFT" | "ACTIVE" | "ARCHIVED";
  limit: number;
  offset: number;
};

function hashQuery(query: NoteListQuery): string {
  const normalized = JSON.stringify({
    status: query.status ?? "ALL",
    limit: query.limit,
    offset: query.offset
  });
  return createHash("sha256").update(normalized).digest("hex").slice(0, 16);
}

export function noteListCacheKey(userId: string, notebookId: string, query: NoteListQuery): string {
  return `cache:user:${userId}:notebook:${notebookId}:notes:${hashQuery(query)}:v1`;
}

console.log(noteListCacheKey("user_123", "notebook_456", { status: "ACTIVE", limit: 20, offset: 0 }));
```
</div>

**逐行解释**：`hashQuery` 把查询条件稳定序列化后做短 hash，`noteListCacheKey` 把 user、notebook、query 和 version 放进同一个 key。这个 key 描述的是“某个用户某个查询的派生响应”，不是 notes 表本身。

**执行过程**：应用根据 HTTP query 构造 key，先读 Redis；如果 miss，再由 Prisma 查询 PostgreSQL。Redis 可以丢弃这个 key，因为下一次请求仍能用相同 owner/query 从数据库重建响应 DTO。

**常见错误为什么错**：把导出完成状态只放在 BullMQ job state 或 Redis key 中，会让状态查询依赖临时队列状态。正确做法是把用户可见状态写入 PostgreSQL，再让 Redis/BullMQ 承担加速和调度。

**与真实项目的关系**：判断一个值能否放进 Redis 的标准是：删掉它以后，是否能从 PostgreSQL 或其他权威系统无损重建；如果不能，它就是业务事实，不该只放 Redis。

<a id="section-9-3"></a>

### 9.3 node-redis connection lifecycle：createClient、connect、error、quit

**结论**：node-redis 客户端应该按进程复用：创建一次、连接一次或按需重连、监听错误、在 shutdown 时 `quit()`。

**本节解决的问题**：`src/redis/redis-client.ts` 把 Redis client 放在模块级变量里，是为了避免每个 request handler 都创建新 socket。每个请求创建新 client 会增加 TCP 连接、认证、握手和错误监听成本，并可能在高并发下耗尽 Redis 或操作系统连接资源。

**底层机制**：`createClient({ url })` 创建客户端对象；`client.on("error", ...)` 捕获连接和命令层错误；`connect()` 打开 socket；`isOpen` 避免重复连接；`quit()` 是正常关闭路径。node-redis 文档展示了 `createClient`、`error` listener、`connect`、命令执行和 `quit` 的生命周期；本项目把它封装成 `getRedisClient()` 与 `closeRedisClient()`，让 HTTP、cache、limiter 共用连接。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/redis/redis-client.ts</span>
  </div>

```ts
import { createClient, type RedisClientType } from "redis";
import { config } from "../config/env.js";
import { logger } from "../shared/logging/logger.js";

let redisClient: RedisClientType | undefined;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!redisClient) {
    redisClient = createClient({ url: config.REDIS_URL });
    redisClient.on("error", (error) => {
      logger.error({ error }, "Redis client error");
    });
  }

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  return redisClient;
}

export async function closeRedisClient(): Promise<void> {
  if (redisClient?.isOpen) {
    await redisClient.quit();
  }

  redisClient = undefined;
}
```
</div>

**逐行解释**：`redisClient` 是进程内单例引用；第一次调用 `getRedisClient` 时创建 client 并注册错误监听器；如果连接未打开才执行 `connect`；关闭时只在 `isOpen` 为真时调用 `quit`，随后清空模块引用。

**执行过程**：Express handler 调用 cache 或 limiter 函数时复用同一个客户端对象。进程收到 shutdown signal 后，server 停止接收请求，再关闭 queue、Redis 和 Prisma，避免悬挂 socket 阻止进程退出。

**常见错误为什么错**：在 `GET /notebooks` handler 内直接 `createClient().connect()` 会把连接生命周期绑定到请求生命周期；一旦异常路径漏掉 `quit()`，连接会泄漏。

**与真实项目的关系**：连接泄漏的识别信号包括 Redis connected clients 持续增加、Node 进程无法退出、压测后出现 socket timeout 或 Redis maxclients 错误。

<a id="section-9-4"></a>

### 9.4 Redis key design：namespace、user boundary、version、query hash

**结论**：Redis key 是跨进程共享命名空间，必须显式包含 namespace、user boundary、resource boundary、query hash 和 shape version。

**本节解决的问题**：`redis-keys.ts` 负责把业务身份和查询条件转换成安全、稳定、可删除的 key。`cache:user:{userId}:notebooks:v1` 把缓存限定在用户维度；`cache:user:{userId}:notebook:{notebookId}:notes:{queryHash}:v1` 同时限定 user、notebook 和查询条件；`:v1` 表示缓存 DTO shape。

**底层机制**：不要把原始 query string 或未校验输入直接拼进 key。原始字符串可能很长、顺序不稳定、包含分隔符或泄露敏感参数。项目用 `hashQuery` 先归一化查询，再截取 SHA-256 hash；用 `assertSafeKeyPart` 限制 key part 字符集。缺少 `userId` 的 key 会让两个用户的相同 notebook/query 共享缓存，形成跨用户数据泄露。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/redis/redis-keys.ts</span>
  </div>

```ts
import { createHash } from "node:crypto";

type NoteListQuery = {
  status?: string;
  limit: number;
  offset: number;
};

function assertSafeKeyPart(value: string, label: string): string {
  if (!/^[A-Za-z0-9_.-]+$/.test(value)) {
    throw new Error(`${label} contains unsafe Redis key characters`);
  }

  return value;
}

export function hashQuery(input: NoteListQuery): string {
  const normalized = JSON.stringify({
    status: input.status ?? "ALL",
    limit: input.limit,
    offset: input.offset
  });

  return createHash("sha256").update(normalized, "utf8").digest("hex").slice(0, 16);
}

export function userNotebooksKey(userId: string): string {
  return `cache:user:${assertSafeKeyPart(userId, "userId")}:notebooks:v1`;
}

export function userNotebookNotesKey(userId: string, notebookId: string, query: NoteListQuery): string {
  return [
    "cache",
    "user",
    assertSafeKeyPart(userId, "userId"),
    "notebook",
    assertSafeKeyPart(notebookId, "notebookId"),
    "notes",
    hashQuery(query),
    "v1"
  ].join(":");
}

export function userNotebookNotesPattern(userId: string, notebookId: string): string {
  return `cache:user:${assertSafeKeyPart(userId, "userId")}:notebook:${assertSafeKeyPart(notebookId, "notebookId")}:notes:*:v1`;
}

export function exportsRateLimitKey(identity: string, windowStartSeconds: number): string {
  return `rate:user:${assertSafeKeyPart(identity, "identity")}:exports:${windowStartSeconds}`;
}

export function exportJobLockKey(jobId: string): string {
  return `job:lock:${assertSafeKeyPart(jobId, "jobId")}`;
}

export function toBullMqJobId(exportId: string): string {
  const jobId = `export-${exportId.replaceAll("-", "")}`;
  if (jobId.includes(":")) {
    throw new Error("BullMQ custom job ids must not contain a colon");
  }

  return jobId;
}
```
</div>

**逐行解释**：`hashQuery` 控制查询条件的稳定性；`userNotebooksKey` 和 `userNotebookNotesKey` 把 owner/resource/query/version 放进 key；`userNotebookNotesPattern` 支持按 notebook 删除列表缓存；`toBullMqJobId` 把 export id 转成不含 colon 的 job id。

**执行过程**：读取路径用同一 key 查 Redis；写入路径用同一 namespace 删除受影响 key；导出限流用 `rate:user:{identity}:exports:{windowStart}` 保证所有 API 实例共享同一个计数维度。

**常见错误为什么错**：`cache:notebooks:v1` 没有 user boundary，任何登录用户都可能读到第一个写入者的列表。`cache:user:{userId}:notes:{rawQuery}` 会让等价 query 产生多个 key，也可能把不可信输入带入 Redis keyspace。

**与真实项目的关系**：缓存串号通常表现为“接口认证正确但返回别人的数据”。排查时先看 key 是否包含 owner id、resource id 和版本后缀。

<a id="section-9-5"></a>

### 9.5 Redis strings、JSON serialization、Date boundary

**结论**：Redis string 读回来是运行时字符串，不是 TypeScript DTO；JSON parse 后还需要 Zod 重新验证。

**本节解决的问题**：`redis-json-serialization.ts` 把数据库记录转成 response DTO 后再 `JSON.stringify`。这样缓存里保存的是 API response shape，而不是 Prisma model object。`Date` 对象跨 JSON 边界后会变成 ISO string；读回缓存时不能假设它仍有 `Date` 方法。

**底层机制**：Redis 不知道 TypeScript 类型、Zod schema 或 Prisma model。应用写入 Redis 前负责序列化，读取 Redis 后负责 `JSON.parse` 和 schema validation。Zod 的作用是在 cache hit 路径防止旧版本 shape、损坏 JSON 或手动写入的错误值直接进入 response。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/01-redis-client/redis-json-serialization.ts</span>
  </div>

```ts
import { z } from "zod";

const cachedNotebookSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

const recordFromDatabase = {
  id: "notebook_1",
  name: "Work",
  createdAt: new Date("2026-07-19T00:00:00.000Z"),
  updatedAt: new Date("2026-07-19T00:00:00.000Z")
};

const cachedValue = JSON.stringify({
  ...recordFromDatabase,
  createdAt: recordFromDatabase.createdAt.toISOString(),
  updatedAt: recordFromDatabase.updatedAt.toISOString()
});

const parsed = cachedNotebookSchema.parse(JSON.parse(cachedValue));
console.log(parsed);
```
</div>

**逐行解释**：`cachedNotebookSchema` 定义缓存可接受的 DTO shape；`recordFromDatabase` 模拟 Prisma 返回的 `Date`；写缓存前显式调用 `toISOString()`；读缓存后用 `cachedNotebookSchema.parse` 验证 `createdAt` 与 `updatedAt` 是 datetime string。

**执行过程**：Prisma record 在 service/repository 层变成 DTO；DTO 序列化为 Redis string；cache hit 时 Redis 返回 string；应用 parse 后再用 Zod 检查，最后才交给 controller response。

**常见错误为什么错**：直接缓存 Prisma record 会把 `Date`、relation、private fields 和数据库 shape 混进响应层。以后 schema 改动时，旧缓存值可能通过 TypeScript 编译却在运行时破坏 API contract。

**与真实项目的关系**：如果 cache hit 后出现 `value.createdAt.getTime is not a function`，通常说明你把 JSON 后的 string 当作 `Date` 使用。

<a id="section-9-6"></a>

### 9.6 TTL and expiration：SET EX、EXPIRE、TTL、stale window

**结论**：TTL 是缓存新鲜度上限，不是业务有效期；`SET EX`、`EXPIRE`、`TTL` 分别负责写入带过期、修改过期、观察剩余时间。

**本节解决的问题**：Redis `SET` 支持 `EX seconds`，可以在写值时同时设置秒级过期；`EXPIRE` 可以给已有 key 设置或调整过期；`TTL` 返回剩余秒数。`TTL = -2` 表示 key 不存在，`TTL = -1` 表示 key 存在但没有过期时间。Redis 官方示例还显示，普通 `SET` 覆盖 key 后可能清除原来的 TTL，除非使用保留 TTL 的选项。

**底层机制**：stale window 是应用层对“允许多旧”的设计，不是 Redis 自动理解业务新鲜度。Redis 只在时间到达后让 key 不再返回；应用要决定 miss 后是否回源、是否单飞、是否接受短暂旧值。覆盖 key 时如果忘记重新设置 `EX`，缓存会变成无期限 key，`TTL` 会变成 `-1`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/01-redis-client/redis-string-ttl.ts</span>
  </div>

```ts
import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL ?? "redis://localhost:6379" });
await client.connect();

const key = "cache:user:user_123:notebooks:v1";
await client.set(key, JSON.stringify([{ id: "notebook_1", name: "Work" }]), { EX: 30 });
console.log({ ttlAfterSet: await client.ttl(key) });

await client.expire(key, 5);
console.log({ ttlAfterExpire: await client.ttl(key) });

await client.quit();
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/02-cache-aside/ttl-stale-window.ts</span>
  </div>

```ts
type CacheEntry = {
  payload: string;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry>();

function setWithTtl(key: string, payload: string, ttlMs: number): void {
  cache.set(key, { payload, expiresAt: Date.now() + ttlMs });
}

function getWithStaleWindow(key: string): "FRESH" | "STALE" | "MISS" {
  const entry = cache.get(key);
  if (!entry) return "MISS";
  return entry.expiresAt > Date.now() ? "FRESH" : "STALE";
}

setWithTtl("cache:user:user_123:notebooks:v1", "[]", 1000);
console.log(getWithStaleWindow("cache:user:user_123:notebooks:v1"));
```
</div>

**逐行解释**：第一个练习用 `set(key, value, { EX: 30 })` 创建带 TTL 的缓存，再用 `ttl` 观察剩余时间；随后 `expire(key, 5)` 缩短窗口。第二个练习用 `expiresAt` 模拟 stale window，说明应用可以把 Redis TTL 与业务容忍窗口分开建模。

**执行过程**：写缓存时 Redis 记录 value 和 expire metadata；每次 `TTL` 都从 Redis server 的 keyspace metadata 读剩余时间；key 到期后读操作会得到 miss，应用再决定是否回源 PostgreSQL。

**常见错误为什么错**：先 `SET key value` 再忘记 `EXPIRE`，或覆盖缓存时不用 `EX`，都会留下无过期 key。缓存数据从此不再自动淘汰，后续写入若也漏删 key，就可能长期返回旧 DTO。

**与真实项目的关系**：排查“缓存一直不更新”时先看 `TTL key`。`-1` 指向过期策略丢失；`-2` 指向 key 已删除或从未写入；正数说明 Redis 仍认为 key 有剩余寿命。

<a id="section-9-7"></a>

### 9.7 Cache-aside read path：hit、miss、database fallback、write-back

**结论**：cache-aside 是应用代码拥有的读取模式：先读 Redis，miss 时读数据库，再把 DTO 写回 Redis。

**本节解决的问题**：Redis 不会自动知道 PostgreSQL 中有哪些 notebooks，也不会自动替你回源。`cache-aside-read.ts` 把这个责任放在 service 逻辑里：先查 cache Map，命中就直接返回；未命中才查 database Map 并写回缓存。真实项目中 Map 换成 Redis，database Map 换成 Prisma repository。

**底层机制**：cache hit 路径不会访问 PostgreSQL，因此响应快但必须信任序列化与验证边界；cache miss 路径访问 PostgreSQL，然后执行 write-back。最终 API 中 `x-cache` header 来自 controller 读取 service 返回的 `cacheStatus`，它是观察 hit/miss/bypass 的 HTTP 证据，不是 Redis 自动加的 header。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/02-cache-aside/cache-aside-read.ts</span>
  </div>

```ts
type Cache = Map<string, string>;

const cache: Cache = new Map();
const database = new Map([["user_123:notebooks", JSON.stringify([{ id: "notebook_1", name: "Work" }])]]);

async function readNotebookList(userId: string): Promise<{ source: "HIT" | "MISS"; value: unknown }> {
  const key = `cache:user:${userId}:notebooks:v1`;
  const cached = cache.get(key);
  if (cached) {
    return { source: "HIT", value: JSON.parse(cached) };
  }

  const databaseValue = database.get(`${userId}:notebooks`) ?? "[]";
  cache.set(key, databaseValue);
  return { source: "MISS", value: JSON.parse(databaseValue) };
}

console.log(await readNotebookList("user_123"));
console.log(await readNotebookList("user_123"));
```
</div>

**逐行解释**：`key` 把 user 和 notebooks 列表绑定；`cache.get` 命中时返回 `HIT`；miss 时用 `${userId}:notebooks` 查模拟数据库；`cache.set` 写回派生 JSON；第二次读取因为 key 已存在而返回 `HIT`。

**执行过程**：Express request 进入 controller，service 构造 key 并调用 Redis；hit 直接 parse DTO；miss 调用 Prisma repository；repository 返回记录后 service 转 DTO 并写入 Redis。

**常见错误为什么错**：把 cache-aside 写成“数据库先查，顺便写缓存”不会减少数据库压力，因为每次请求仍然命中 source of truth。正确的 read path 必须先尝试 cache。

**与真实项目的关系**：如果压测时 PostgreSQL 查询量没有随着 cache hit rate 上升而下降，说明读路径没有真正短路数据库查询，或 key 设计导致大量不必要 miss。

<a id="section-9-8"></a>

### 9.8 Cache invalidation on write：primary write first, then delete affected keys

**结论**：写入路径应先让 PostgreSQL 主写入成功，再删除受影响的 Redis cache keys。

**本节解决的问题**：`cache-invalidation-on-write.ts` 中 `renameNotebook` 先更新模拟 notebooks 存储，再删除 `cache:user:{userId}:notebooks:v1`。真实项目中创建、更新、删除 notebook 都会影响用户 notebook list cache；创建、更新、删除 note 会影响对应 notebook 的 note list cache，也可能影响 notebook list 中的统计或更新时间字段。

**底层机制**：如果先删缓存、后写数据库，而数据库写入失败，下一次读会 miss 并从 PostgreSQL 回源旧数据，再把旧 DTO 写回 Redis。这样错误写入虽然失败，却造成了缓存抖动和旧值再填充。primary write first 保证写入失败时缓存仍代表旧的 source-of-truth 状态；写入成功后删除缓存，让下一次读重建新 DTO。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/02-cache-aside/cache-invalidation-on-write.ts</span>
  </div>

```ts
type Notebook = { id: string; ownerId: string; name: string };

const cache = new Map<string, string>();
const notebooks = new Map<string, Notebook>();

async function renameNotebook(userId: string, notebookId: string, name: string): Promise<void> {
  notebooks.set(notebookId, { id: notebookId, ownerId: userId, name });
  cache.delete(`cache:user:${userId}:notebooks:v1`);
}

cache.set("cache:user:user_123:notebooks:v1", JSON.stringify([{ id: "notebook_1", name: "Old" }]));
await renameNotebook("user_123", "notebook_1", "New");
console.log({ cacheHasOldList: cache.has("cache:user:user_123:notebooks:v1") });
```
</div>

**逐行解释**：示例先预置旧缓存；`renameNotebook` 修改主存储；随后 `cache.delete` 删除列表缓存；最后输出 `cacheHasOldList: false` 证明旧派生值不再可读。

**执行过程**：mutation request 先通过 auth 和 CSRF；service 校验 owner；repository 调用 Prisma 写 PostgreSQL；成功后 cache invalidation 删除 notebook list 和 note list pattern；controller 返回写入后的 DTO。

**常见错误为什么错**：只更新缓存而不更新 PostgreSQL 会让 Redis 变成事实层；只写 PostgreSQL 而不删缓存会让后续 hit 继续返回旧 DTO；写前删除则会在数据库失败时制造不必要 miss。

**与真实项目的关系**：如果 PATCH 成功后立即 GET 仍返回旧值，优先检查 mutation service 是否调用了 cache invalidation，以及删除 pattern 是否覆盖了 query hash 版本的列表 key。

<a id="section-9-9"></a>

### 9.9 Cache stampede：popular key expiration and singleflight mitigation

**结论**：hot key 同时过期会让大量请求一起 miss；local singleflight 只能合并同一个 Node.js 进程内的回源。

**本节解决的问题**：`cache-stampede-singleflight.ts` 用 `inFlightLoads` Map 记录正在执行的 loader。两个并发请求读同一个 key 时，第一个创建 Promise，第二个复用该 Promise，所以示例中的 database read 只发生一次。它解决的是单进程内并发 miss，不是分布式 stampede。

**底层机制**：当热门 key 到期，所有 API 实例都会在相近时间得到 miss。如果每个 request 都回源 PostgreSQL，连接池和查询延迟会突然升高。local singleflight 的 Map 不跨进程，多个 Node 实例仍然各自发起一次回源；分布式锁或更复杂的 stale-while-revalidate 不在本章实现范围内。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/02-cache-aside/cache-stampede-singleflight.ts</span>
  </div>

```ts
const inFlightLoads = new Map<string, Promise<string>>();
let databaseReads = 0;

async function loadFromDatabase(): Promise<string> {
  databaseReads += 1;
  return JSON.stringify([{ id: "notebook_1", name: "Work" }]);
}

async function singleflight(key: string): Promise<string> {
  const existing = inFlightLoads.get(key);
  if (existing) return existing;

  const load = loadFromDatabase().finally(() => {
    inFlightLoads.delete(key);
  });
  inFlightLoads.set(key, load);
  return load;
}

await Promise.all([
  singleflight("cache:user:user_123:notebooks:v1"),
  singleflight("cache:user:user_123:notebooks:v1")
]);
console.log({ databaseReads });
```
</div>

**逐行解释**：`inFlightLoads` 保存 key 到 Promise 的映射；`existing` 存在时直接返回同一个 Promise；第一个 loader 在 `finally` 中清理 Map；`Promise.all` 模拟同进程并发 miss；输出 `databaseReads` 观察合并效果。

**执行过程**：cache miss 后 service 先检查本地 in-flight Map；没有进行中的 loader 才访问 Prisma；同进程后续请求等待同一个 Promise；Promise resolve 后所有等待者拿到同一份 DTO。

**常见错误为什么错**：声称 local singleflight 解决 distributed stampede 是错误的，因为两个 API 进程的 heap 不共享。它只能减少每个进程内部的重复回源。

**与真实项目的关系**：如果单实例压测平稳但多实例部署仍出现数据库尖峰，说明本地 singleflight 有效但没有跨进程协调，需要在后续章节引入分布式锁或刷新策略。

<a id="section-9-10"></a>

### 9.10 Redis pipeline versus Redis transaction：network batching versus atomic command group

**结论**：pipeline 主要减少网络 round trips；Redis transaction 用 `MULTI/EXEC` 对命令进行 Redis 侧顺序执行，但不等同于 PostgreSQL transaction。

**本节解决的问题**：node-redis 文档中 `multi().execAsPipeline()` 用同一个批次发送命令并收集结果；`multi().exec()` 执行 transaction。两者 API 起点都可能是 `multi()`，但语义不同：pipeline 是批量传输优化，transaction 是 Redis 命令组提交。

**底层机制**：Redis transaction 不提供关系数据库那种跨表约束、隔离级别、rollback log 或复杂查询一致性。它只保证 Redis server 以 `MULTI/EXEC` 包起来的命令组方式处理。PostgreSQL transaction 保护 durable relational state；Redis transaction 保护 Redis key 命令组。不要用 Redis transaction 替代 Prisma `$transaction`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/01-redis-client/redis-pipeline-vs-transaction.ts</span>
  </div>

```ts
import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL ?? "redis://localhost:6379" });
await client.connect();

const pipeline = client.multi();
pipeline.set("demo:pipeline:a", "1");
pipeline.set("demo:pipeline:b", "2");
await pipeline.execAsPipeline();

const transaction = client.multi();
transaction.incr("demo:transaction:counter");
transaction.expire("demo:transaction:counter", 60);
const result = await transaction.exec();

console.log({ result });
await client.quit();
```
</div>

**逐行解释**：示例第一个 `client.multi().set().set().execAsPipeline()` 关注批量发送；第二个 `client.multi().incr().expire().exec()` 把 counter 增加和 TTL 设置放进一个 Redis 命令组。

**执行过程**：Node.js 创建命令链；pipeline/transaction 在 await 时写入 socket；Redis server 执行批次并返回数组结果；Promise resolve 后 JavaScript 继续处理输出。

**常见错误为什么错**：把 `execAsPipeline` 当成原子事务会误判失败边界；把 Redis `MULTI/EXEC` 当成 PostgreSQL 事务会误判业务一致性。订单、支付、用户记录这类事实仍应由 PostgreSQL transaction 保护。

**与真实项目的关系**：如果目标是减少多次 Redis 命令的网络延迟，用 pipeline；如果目标是把 Redis counter 与 TTL 作为同一 Redis 命令组提交，用 transaction；如果目标是业务表一致性，用 PostgreSQL。

<a id="section-9-11"></a>

### 9.11 Distributed rate limiting：why in-memory limiter is not enough

**结论**：进程内计数器只限制当前 Node.js 实例；Redis 计数器可以让多个 API 实例共享同一限制。

**本节解决的问题**：`rate-limit-key-design.ts` 构造 `rate:user:{identity}:exports:{windowStart}`。如果用 `new Map()` 存计数，用户请求被负载均衡到第二个 API 实例时就绕过第一个实例的计数。Redis rate limiter 文档强调集中共享状态正是分布式限流需要 Redis 的原因。

**底层机制**：登录用户优先使用 `userId` 作为 identity，因为它稳定且直接对应业务主体；未登录或没有 auth context 的请求只能退回 IP。IP fallback 会受 NAT、代理和共享网络影响，因此适合作为降级维度，不应替代用户级限流。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/03-rate-limit/rate-limit-key-design.ts</span>
  </div>

```ts
function windowStart(epochMs: number, windowSeconds: number): number {
  return Math.floor(epochMs / (windowSeconds * 1000)) * windowSeconds;
}

export function exportRateLimitKey(identity: string, now = Date.now()): string {
  return `rate:user:${identity}:exports:${windowStart(now, 60)}`;
}

console.log(exportRateLimitKey("user_123", Date.parse("2026-07-19T00:00:30.000Z")));
```
</div>

**逐行解释**：`windowStart` 把当前时间归入固定窗口；`exportRateLimitKey` 把 identity、API 资源和窗口开始时间放进 key；同一窗口内的所有 API 实例都会命中同一个 Redis counter。

**执行过程**：request 通过 session middleware 后，limiter middleware 读取 `response.locals.auth.userId`；没有用户时读取 `request.ip`；随后用 Redis `INCR` 更新共享计数。

**常见错误为什么错**：在 Express 进程里用模块级变量限流，只对单进程有效。扩容到两个进程后，每个进程都有自己的计数，实际限制被放大。

**与真实项目的关系**：如果本地单进程限流正常，上线多实例后用户能超过限制，优先检查计数是否存放在共享外部系统，而不是每个进程的 heap。

<a id="section-9-12"></a>

### 9.12 Redis fixed-window limiter：INCR、expiration、429 response

**结论**：fixed-window limiter 用 `INCR` 得到当前窗口计数；第一次计数设置 expiration；超过限制时返回 `429`。

**本节解决的问题**：Redis `INCR` 文档把 rate limiter 描述为特殊 counter，并展示了 `INCR` 搭配 `EXPIRE` 的模式。示例中 `count === 1` 时调用 `expire`，之后 `ttl` 就是当前窗口大致剩余时间，可映射到 `x-rate-limit-reset`。

**底层机制**：不要先 `GET` 再决定是否 `INCR`。GET-before-INCR 会让并发请求同时看到旧值并都通过，计数更新晚于判断。正确路径是把请求本身先计入共享 counter，再根据返回的新 count 判断是否超限。fixed window 的边界风险是窗口切换处允许短时间 burst：上一窗口末尾和下一窗口开头各打满一次。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/03-rate-limit/redis-fixed-window-limiter.ts</span>
  </div>

```ts
import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL ?? "redis://localhost:6379" });
await client.connect();

const key = "rate:user:user_123:exports:2026-07-19T00:00";
const count = await client.incr(key);
if (count === 1) {
  await client.expire(key, 60);
}

const allowed = count <= 5;
const ttl = await client.ttl(key);
console.log({ allowed, count, ttl });
await client.quit();
```
</div>

**逐行解释**：`client.incr(key)` 原子增加计数并返回新值；`count === 1` 表示这个窗口 key 刚创建，所以设置过期；`allowed = count <= 5` 得出允许/拒绝；`ttl` 给客户端一个 reset 观察值。

**执行过程**：limiter middleware 在业务 handler 前执行；Redis counter 增加后，如果超限就 short-circuit 并交给 error middleware 返回 429；未超限才调用 `next()`。

**常见错误为什么错**：只在超限时才 `INCR` 会让正常请求不计数；先读后写会产生竞态；不给 counter 设置过期会让用户永远被旧窗口计数影响。

**与真实项目的关系**：如果 `x-rate-limit-reset` 一直为空或 Redis 中 rate key 永不过期，检查首次 `INCR` 后是否执行了 `EXPIRE`，以及 key 是否按窗口变化。

<a id="section-9-13"></a>

### 9.13 Redis failure policy：cache fallback, limiter policy, queue enqueue failure

**结论**：Redis 的不同用途需要不同 failure policy：cache 可以 fail-open 回源 PostgreSQL，limiter 要显式选择 fail-open 或 fail-closed，queue enqueue 失败不能返回 `202`。

**本节解决的问题**：`rate-limit-failure-policy.ts` 展示 limiter 的 open/closed 决策；`cache-failure-policy.ts` 展示 cache read 出错时回源数据库。缓存失败只影响性能，所以通常绕过 Redis 继续查 PostgreSQL；限流失败影响滥用控制和可用性，需要按业务风险选择；BullMQ enqueue 失败表示后台工作没有被接受，HTTP 如果返回 `202 Accepted` 就是在撒谎。

**底层机制**：同一个 Redis outage 在三个路径的含义不同。cache path 的 source of truth 仍在 PostgreSQL；limiter path 没有共享 counter 时无法判断配额；queue path 没有 Redis queue write 就没有 Worker 可处理的 job。每个路径必须把“Redis 不可用”映射成自己的 HTTP 行为和日志信号。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/03-rate-limit/rate-limit-failure-policy.ts</span>
  </div>

```ts
type LimiterDecision = {
  allowed: boolean;
  reason: "WITHIN_LIMIT" | "REDIS_UNAVAILABLE_FAIL_OPEN" | "REDIS_UNAVAILABLE_FAIL_CLOSED";
};

function decideOnRedisError(policy: "open" | "closed"): LimiterDecision {
  if (policy === "open") {
    return { allowed: true, reason: "REDIS_UNAVAILABLE_FAIL_OPEN" };
  }
  return { allowed: false, reason: "REDIS_UNAVAILABLE_FAIL_CLOSED" };
}

console.log(decideOnRedisError("open"));
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/02-cache-aside/cache-failure-policy.ts</span>
  </div>

```ts
type CachePolicy = "BYPASS_AND_USE_DATABASE" | "FAIL_REQUEST";

async function readThroughCache(policy: CachePolicy): Promise<string> {
  try {
    throw new Error("redis unavailable");
  } catch (error) {
    if (policy === "FAIL_REQUEST") {
      throw error;
    }
    return "database fallback";
  }
}

console.log(await readThroughCache("BYPASS_AND_USE_DATABASE"));
```
</div>

**逐行解释**：limiter 示例把 Redis error 映射成 `REDIS_UNAVAILABLE_FAIL_OPEN` 或 `REDIS_UNAVAILABLE_FAIL_CLOSED`；cache 示例在 catch 中按 policy 决定返回 database fallback 还是抛出错误。最终项目中 export enqueue catch 会把 status row 标记失败并返回 503。

**执行过程**：cache service 捕获 Redis read/write 错误并继续 Prisma；limiter middleware 捕获 Redis 错误后按配置继续或返回 503；export service 捕获 `queue.add` 错误后更新 PostgreSQL row 并拒绝请求。

**常见错误为什么错**：把所有 Redis 错误都吞掉会隐藏 queue enqueue 失败；把所有 Redis 错误都变成 503 又会让可回源的 cache miss 影响可用性。

**与真实项目的关系**：看日志时要区分 `cache bypass`、`rate limiter unavailable` 和 `queue unavailable`。三者都是 Redis 相关，但用户影响和恢复动作不同。

<a id="section-9-14"></a>

### 9.14 Background jobs：why HTTP should not wait for long work

**结论**：HTTP request lifecycle 应尽快完成；长时间导出工作应进入 Worker lifecycle，并用 `202 Accepted` 表达“已接受但未完成”。

**本节解决的问题**：`queue-add-job.ts` 只负责创建 `Queue` 并 `add` job。API 请求不应同步查询大量 notes、生成大结果、等待文件或远程资源后再返回。`202 Accepted` 的语义是服务端接受了处理请求，但处理结果稍后通过 status URL 查询。

**底层机制**：HTTP response 对象只在当前请求生命周期内有效；连接可能被客户端断开、代理超时或 server timeout 结束。Worker 进程没有这个 response 对象，它只拿 job payload 和外部资源连接。把长工作移出 HTTP 可以让 API 进程快速释放 request/response 资源。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/04-bullmq-basics/queue-add-job.ts</span>
  </div>

```ts
import { Queue } from "bullmq";

const queue = new Queue("notes-export", {
  connection: { host: "127.0.0.1", port: 6379 },
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 }
  }
});

const job = await queue.add("export-notes", {
  exportId: "export_123",
  ownerId: "user_123",
  format: "JSON"
});

console.log({ jobId: job.id });
await queue.close();
```
</div>

**逐行解释**：`new Queue` 指向 Redis 中的 queue state；`defaultJobOptions` 设置 attempts 和 backoff；`queue.add` 写入 job payload；返回的 `job.id` 是队列内标识；`queue.close` 释放 Queue 连接。

**执行过程**：controller 创建 PostgreSQL status row，service 调用 `queue.add`，response 返回 export id/status URL；Worker 稍后从 Redis 队列取 job 并执行导出。

**常见错误为什么错**：在 POST handler 里直接生成完整导出会让用户连接、Express response、数据库连接和 event loop 都被长工作占用；失败时用户也缺少可查询状态。

**与真实项目的关系**：任何超过普通 request latency budget 的工作，例如报表、批量导入、图片处理，都应该考虑 202 + status row + Worker。

<a id="section-9-15"></a>

### 9.15 BullMQ queue model：Queue、Job、Worker、QueueEvents

**结论**：BullMQ 的基本模型是 API process 用 `Queue` 添加 `Job`，Worker process 用 `Worker` 执行 job，`QueueEvents` 观察跨 worker 事件。

**本节解决的问题**：`queue-events.ts` 关注事件观察，`worker-process-job.ts` 关注 Worker 创建和 job processor。BullMQ 文档说明 Worker 是处理 queue 中 job 的实例，成功时 job 进入 completed，抛错时进入 failed；QueueEvents 使用 Redis streams 观察所有 worker 的事件。

**底层机制**：Redis queue state 负责调度和事件，不等同于用户可见业务状态。最终项目仍然把 `ExportJob` row 放在 PostgreSQL 中，因为 status API 需要 owner authorization、持久查询和稳定 response shape。BullMQ 负责“哪个 Worker 处理哪个 job”，PostgreSQL 负责“用户看到这个导出现在是什么状态”。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/04-bullmq-basics/queue-events.ts</span>
  </div>

```ts
import { QueueEvents } from "bullmq";

const events = new QueueEvents("notes-export", {
  connection: { host: "127.0.0.1", port: 6379 }
});

events.on("completed", ({ jobId }) => {
  console.log({ event: "completed", jobId });
});

events.on("failed", ({ jobId, failedReason }) => {
  console.log({ event: "failed", jobId, failedReason });
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/04-bullmq-basics/worker-process-job.ts</span>
  </div>

```ts
import { Worker } from "bullmq";

const worker = new Worker(
  "notes-export",
  async (job) => {
    console.log({ jobId: job.id, payload: job.data });
  },
  { connection: { host: "127.0.0.1", port: 6379 } }
);

process.on("SIGTERM", () => {
  void worker.close();
});
```
</div>

**逐行解释**：`QueueEvents` 监听 `completed` 与 `failed`，适合记录跨进程观察信号；`Worker` 绑定 queue name 和 processor callback，`job.data` 是 Worker 执行入口。

**执行过程**：API 进程调用 `Queue.add` 后返回；Redis 保存 job；Worker 进程阻塞等待 job；processor resolve 时 BullMQ 更新 completed state 并触发事件；processor throw 时进入 failed/retry 流程。

**常见错误为什么错**：只看 QueueEvents 不写 PostgreSQL status row，会让用户状态查询依赖队列内部生命周期；只写 status row 不启动 Worker，job 永远不会完成。

**与真实项目的关系**：当导出卡住时，同时检查 API 是否成功 enqueue、Worker 是否启动、QueueEvents 是否收到 failed/completed、PostgreSQL row 是否更新。

<a id="section-9-16"></a>

### 9.16 Job payload validation：Zod and durable job status row

**结论**：job payload 是从 Redis 读出的运行时数据；TypeScript 不能证明它仍符合当前代码期望，Worker 处理前必须 Zod validation。

**本节解决的问题**：`job-payload-validation.ts` 用 Zod 校验 `exportId`、`ownerId`、可选 `notebookId` 和 `format`。即使 API 端用 TypeScript 创建 payload，job 也可能来自旧版本代码、重试队列、手动插入、测试工具或损坏数据。

**底层机制**：TypeScript 类型在编译后擦除，不会随 job payload 存进 Redis。Worker 进程启动时拿到的是 JavaScript object；只有 Zod parse 能在运行时拒绝错误 shape。校验通过后，Worker 才能安全地用 `exportId` 读取 durable status row，用 `ownerId` 限定 Prisma 查询。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/04-bullmq-basics/job-payload-validation.ts</span>
  </div>

```ts
import { z } from "zod";

const exportJobSchema = z.object({
  exportId: z.string().uuid(),
  ownerId: z.string().uuid(),
  notebookId: z.string().uuid().optional(),
  format: z.enum(["JSON", "CSV"])
});

export function parseExportJob(data: unknown) {
  return exportJobSchema.parse(data);
}

console.log(parseExportJob({
  exportId: "00000000-0000-4000-8000-000000000001",
  ownerId: "00000000-0000-4000-8000-000000000002",
  format: "JSON"
}));
```
</div>

**逐行解释**：`exportJobSchema` 定义 UUID 和 enum 规则；`parseExportJob` 对 `unknown` data 调用 `.parse`；示例 payload 只有在字段 shape 正确时才输出。

**执行过程**：Worker processor 收到 BullMQ `job`；读取 `job.data`；Zod 校验；校验失败时 throw，BullMQ 把 job 计入 failed/retry；校验成功才访问 Prisma。

**常见错误为什么错**：把 `job.data as ExportNotesJobPayload` 当作验证，会绕过运行时检查。错误 payload 可能直到 Prisma 查询或业务逻辑处才爆出更难定位的异常。

**与真实项目的关系**：如果 worker log 出现 `Cannot read properties of undefined` 或 Prisma UUID 错误，先检查 job payload 是否经过 Zod 边界。

<a id="section-9-17"></a>

### 9.17 202 Accepted and job status API：enqueue now, finish later

**结论**：`POST /exports/notes` 应先创建 durable status row，再 enqueue；返回 `202` 时附带 status URL，后续 `GET /exports/:exportId` 按 owner 读 PostgreSQL。

**本节解决的问题**：controller 的 `create` 调用 service 后用 `sendResponse(response, 202, ...)` 返回 export id/status URL。这个 response 只表示工作被接受进入后台处理，不表示导出已经完成。`get` controller 读取 route param 并返回 status row。

**底层机制**：status row 必须先于 enqueue 创建，否则 Worker 可能先执行却找不到业务状态记录。status polling 读取 PostgreSQL，而不是只问 BullMQ，因为 API 要执行 owner authorization、返回业务字段、保留结果和错误信息，并在 Redis queue state 清理后仍能解释用户请求。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/exports/exports.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./exports.service.js";

export const create: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 202, await service.createExport(auth, request.body));
  } catch (error) {
    next(error);
  }
};

export const get: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.getExport(auth, routeParam(request.params.exportId)));
  } catch (error) {
    next(error);
  }
};

function routeParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
```
</div>

**逐行解释**：`create` 从 `response.locals` 读取 auth context，调用 `service.createExport`，并用 202 返回；`get` 用 `exportId` 查询当前用户可访问的 status。controller 不直接访问 BullMQ 或 Prisma，保持 HTTP 层边界清晰。

**执行过程**：auth middleware 先绑定 session 用户；CSRF 和 limiter 通过后创建 export；service 写 PostgreSQL row、设置 job id、enqueue；客户端拿 `statusUrl` 轮询；GET 路径按 owner 查 row。

**常见错误为什么错**：先 enqueue 再建 row 会引入 Worker 找不到 status 的竞态；GET status 只查 BullMQ job 会绕过 owner authorization，也可能在 job 被清理后失去历史状态。

**与真实项目的关系**：如果用户收到 202 但轮询 404，通常说明 status row 创建、owner 绑定或 enqueue 顺序存在问题。

<a id="section-9-18"></a>

### 9.18 Retries and backoff：attempts, failed jobs, transient failures

**结论**：BullMQ `attempts` 和 `backoff` 用于 transient failure；如果失败是永久输入错误，重试只会重复失败。

**本节解决的问题**：`retry-backoff.ts` 配置 `attempts: 3` 和 exponential backoff。BullMQ 文档说明 failed jobs 可以按 backoff 函数自动重试，内置策略包括 fixed 和 exponential。这里适合 Redis/PostgreSQL 临时不可用、短暂网络失败、Worker 重启等 transient failure。

**底层机制**：processor throw 后，BullMQ 把 job 放入 failed 或等待重试的状态；如果还有 attempts，按 backoff delay 重新进入 waiting。重试会再次执行 handler，所以 handler 必须能识别已完成状态、重复 payload 和部分完成副作用。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/05-retries-idempotency/retry-backoff.ts</span>
  </div>

```ts
import type { JobsOptions } from "bullmq";

export const exportJobRetryOptions: JobsOptions = {
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 1000
  },
  removeOnComplete: false,
  removeOnFail: false
};

console.log(exportJobRetryOptions);
```
</div>

**逐行解释**：`attempts: 3` 表示最多尝试三次；`backoff.type = "exponential"` 让后续尝试延迟增长；`removeOnComplete: false` 和 `removeOnFail: false` 保留队列观察信息，便于学习阶段调试。

**执行过程**：Worker throw 后 BullMQ 记录失败原因和 attemptsMade；未耗尽 attempts 时等待 backoff；再次执行同一 payload；最终成功进入 completed，耗尽后停留 failed。

**常见错误为什么错**：对 Zod payload validation error 这类永久错误重试没有意义；对不幂等 handler 开启 retry 会重复写结果、重复扣减或重复发外部请求。

**与真实项目的关系**：看到同一 job 多次失败时，先区分错误是不是 transient。网络 timeout 可以重试；无效 UUID、权限错误、缺失 owner row 通常应该快速失败并写明状态。

<a id="section-9-19"></a>

### 9.19 Idempotent worker handlers：safe retry and duplicate delivery

**结论**：幂等 Worker 在重复执行同一 job 时不会重复产生副作用；核心做法是先检查 durable status row。

**本节解决的问题**：`idempotent-job-handler.ts` 在处理前检查当前 export status，已经 `COMPLETED` 就直接返回。最终项目的 `processExportNotesJob` 也先读取 `ExportJob` row，已完成时 short-circuit。

**底层机制**：BullMQ retry、Worker crash recovery、手动 retry 或重复 enqueue 边界都可能让同一业务 export id 被再次处理。幂等性不能只依赖“队列不会重复”；它应依赖业务层的唯一 id 和 durable status。completed short-circuit 让重复执行变成读状态，而不是再写一次结果。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/05-retries-idempotency/idempotent-job-handler.ts</span>
  </div>

```ts
type ExportStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";

const statusRows = new Map<string, ExportStatus>();

async function handleExport(exportId: string): Promise<ExportStatus> {
  const current = statusRows.get(exportId);
  if (current === "COMPLETED") {
    return current;
  }

  statusRows.set(exportId, "PROCESSING");
  statusRows.set(exportId, "COMPLETED");
  return "COMPLETED";
}

console.log(await handleExport("export_123"));
console.log(await handleExport("export_123"));
```
</div>

**逐行解释**：`statusRows` 模拟 PostgreSQL status table；`handleExport` 先读当前状态；如果已完成就返回；否则写 `PROCESSING` 再写 `COMPLETED`；同一 export id 调用两次仍只得到完成状态。

**执行过程**：Worker 收到 payload；读取 `ExportJob` row；如果 completed，返回已有 result；否则标记 processing，执行导出，最后标记 completed。失败路径记录 error 并 throw 给 BullMQ。

**常见错误为什么错**：只把 job id 当作幂等保证不够。job 可能被手动 retry，也可能在移除后用相同 id 添加。业务副作用必须由业务唯一键和状态行保护。

**与真实项目的关系**：重复导出、重复扣费、重复发送通知这类问题，通常说明 Worker handler 缺少 completed short-circuit 或唯一业务状态约束。

<a id="section-9-20"></a>

### 9.20 Custom job IDs, deduplication, and colon separator boundary

**结论**：BullMQ custom job id 在同一 queue 内唯一，可用于避免重复 job；但 custom job id 不能包含 colon。

**本节解决的问题**：BullMQ job ids 文档说明 job id 用于在 Redis 中构造 key，唯一性按 queue 作用域计算；如果添加已存在 id 的 job，新 job 不会再次加入队列。文档也明确警告 custom job ids 不能包含 `:` separator，因为 BullMQ/Redis key naming 会把它解释成不同部分。

**底层机制**：`custom-job-id-boundary.ts` 把 UUID 中的 dash 去掉并加 `export-` 前缀，得到稳定且不含 colon 的 job id。稳定 id 让同一个 export row 能映射到同一个 queue job；安全字符避免破坏 BullMQ keyspace。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/05-retries-idempotency/custom-job-id-boundary.ts</span>
  </div>

```ts
export function toBullMqJobId(exportId: string): string {
  return `export-${exportId.replaceAll("-", "")}`;
}

const jobId = toBullMqJobId("00000000-0000-4000-8000-000000000001");
if (jobId.includes(":")) {
  throw new Error("BullMQ custom job ids must not contain a colon");
}

console.log({ jobId });
```
</div>

**逐行解释**：`toBullMqJobId` 使用 `replaceAll("-", "")` 消除 UUID dash；生成值前缀为 `export-`；随后显式检查 `jobId.includes(":")`，如果出现 colon 就抛错。

**执行过程**：export service 创建 status row 后用 export id 生成 BullMQ job id；`queue.add` 带上 `jobId` option；BullMQ 在 queue 范围内判断是否已有相同 id。

**常见错误为什么错**：使用 `export:{id}` 作为 job id 看起来符合 Redis key 风格，但 BullMQ custom id 禁止 colon。应使用 `export-${id}` 或类似安全分隔符。

**与真实项目的关系**：如果 enqueue 时出现 job id 相关错误或重复任务没有被抑制，检查 job id 是否稳定、是否同 queue、是否包含 colon，以及 completed/failed job 是否已被移除。

<a id="section-9-21"></a>

### 9.21 Stalled jobs and Node event loop blocking

**结论**：BullMQ active job 需要 Worker 持续通知队列自己仍在工作；阻塞 Node event loop 可能导致 lock renewal 失败并触发 stalled event。

**本节解决的问题**：BullMQ stalled docs 说明 active job 处理期间需要更新队列，防止 crashed worker 永久占有 job；如果 Worker 无法通知队列，job 会回到 waiting 或 failed，并发出 `stalled` event。`stalled-job-boundary.ts` 用 busy loop 演示 CPU blocking 如何占用主线程。

**底层机制**：Node.js 单线程执行 JavaScript。长时间同步 CPU loop 会阻止 timers、Promise continuation 和 BullMQ 内部续约逻辑及时运行。BullMQ 不是“有 stalled 状态”，而是当 active job 被自动移动时发出 stalled event；默认情况下 stalled 超过限制会永久失败。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">practices/07-redis-cache-jobs/05-retries-idempotency/stalled-job-boundary.ts</span>
  </div>

```ts
function blockEventLoop(milliseconds: number): void {
  const end = Date.now() + milliseconds;
  while (Date.now() < end) {
    Math.sqrt(Math.random());
  }
}

console.time("blocked");
blockEventLoop(50);
console.timeEnd("blocked");
```
</div>

**逐行解释**：`blockEventLoop` 用 while loop 持续占用 JavaScript 主线程；循环期间事件循环无法处理其他回调；`console.time` 只显示阻塞持续时间，真实 Worker 中这段时间会影响 lock renewal。

**执行过程**：Worker 开始处理 job 后，BullMQ 需要周期性维护 active lock；如果 processor 进行大段同步 CPU 工作，维护任务无法及时执行；队列认为 Worker 失联，job 可能被重新排队或失败。

**常见错误为什么错**：把 CPU-heavy export、压缩、加密或大 JSON 转换直接放进 Worker 主线程，会让“后台任务”仍然阻塞 Node event loop。后台不等于并行 CPU。

**与真实项目的关系**：如果 job 偶发 stalled，同时 Worker CPU 占用很高或日志长时间无输出，应把工作拆块、流式处理，或在后续章节使用 `worker_threads` / sandboxed processors。

<a id="section-9-22"></a>

### 9.22 Worker process lifecycle：worker.close、Redis quit、signal shutdown

**结论**：Worker 是独立进程入口；shutdown 时先停止 Worker 接新任务，再关闭 QueueEvents、Redis client 和 Prisma。

**本节解决的问题**：最终项目有单独的 `src/worker.ts`，不把 Worker 塞进 HTTP server。BullMQ graceful shutdown 文档说明 `worker.close()` 会把 worker 标记为 closing，不再接新 job，并等待当前 job 完成或失败。Node process signal docs 提供 `SIGINT` / `SIGTERM` 事件入口。

**底层机制**：signal handler 中的关闭顺序很重要：先 `worker.close()` 防止继续取 job；再 `queueEvents.close()` 停止事件连接；再 `closeRedisClient()` 用 `quit` 释放 node-redis socket；最后 `disconnectPrisma()` 关闭数据库连接。顺序反过来可能让 processor 仍在运行时失去 Redis 或数据库连接。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/worker.ts</span>
  </div>

```ts
import { disconnectPrisma } from "./db/prisma.js";
import { closeRedisClient } from "./redis/redis-client.js";
import { createNotesExportQueueEvents } from "./jobs/job-events.js";
import { createNotesExportWorker } from "./jobs/worker.js";
import { logger } from "./shared/logging/logger.js";

const worker = createNotesExportWorker();
const queueEvents = createNotesExportQueueEvents();

logger.info({}, "Notes export worker started");

async function shutdown(signal: string): Promise<void> {
  logger.info({ signal }, "Shutting down notes export worker");
  await worker.close();
  await queueEvents.close();
  await closeRedisClient();
  await disconnectPrisma();
  process.exit(0);
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
    <span class="macos-code-title">practices/07-redis-cache-jobs/05-retries-idempotency/worker-graceful-shutdown.ts</span>
  </div>

```ts
import type { Worker } from "bullmq";
import type { RedisClientType } from "redis";

export async function shutdownWorker(worker: Worker, redis: RedisClientType): Promise<void> {
  await worker.close();
  await redis.quit();
}
```
</div>

**逐行解释**：`createNotesExportWorker` 创建 Worker；`createNotesExportQueueEvents` 创建事件观察连接；`shutdown` 接收 signal，依次关闭 Worker、QueueEvents、Redis、Prisma；两个 `process.on` 绑定 Ctrl+C 与进程终止信号。

**执行过程**：Worker 进程启动后常驻等待 Redis queue；收到 `SIGTERM` 时进入 shutdown；`worker.close` 等当前 job 完成；外部连接释放后调用 `process.exit(0)`。

**常见错误为什么错**：直接 `process.exit(0)` 会中断当前 job，让它之后以 stalled/retry 形式出现。先关闭 Redis 也会让 Worker 还没完成时失去队列连接。

**与真实项目的关系**：部署重启后如果出现大量 stalled jobs，检查进程管理器是否给了足够 shutdown 时间，以及代码是否 await 了 `worker.close()`。

<a id="section-9-23"></a>

### 9.23 Chapter integration: redis-job-notes-api

**结论**：最终项目把本章链路连成一个完整后端：authenticated request → cache key → Redis hit/miss → PostgreSQL fallback → TTL write-back → mutation invalidation → Redis limiter → BullMQ enqueue → Worker validation → idempotent processing → PostgreSQL status update → status polling。

**本节解决的问题**：`src/app.ts` 展示 HTTP 入口组合：auth routes、notebook routes、notes routes、exports routes、cache debug routes、not-found 和 error middleware。它不是重新发明 auth，而是在 Chapter 06 的边界之上接入 Redis/BullMQ。

**底层机制**：GET list 请求先由 session middleware 建立 auth context，再由 service 构造 user-scoped cache key；cache hit 直接返回 DTO；miss 查询 Prisma 并写入 `SET EX`；mutation 先写 PostgreSQL 再删除相关 key；export POST 经过 CSRF 和 Redis limiter，创建 `ExportJob` row，enqueue BullMQ；Worker 读取 job payload、Zod 校验、幂等检查、查询 notes、更新 PostgreSQL status；客户端用 status URL polling。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/app.ts</span>
  </div>

```ts
import express from "express";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { notebooksRoutes } from "./modules/notebooks/notebooks.routes.js";
import { notebookNotesRoutes } from "./modules/notes/notebook-notes.routes.js";
import { notesRoutes } from "./modules/notes/notes.routes.js";
import { exportsRoutes } from "./modules/exports/exports.routes.js";
import { authenticateSession } from "./shared/auth/authenticate-session.js";
import { requireCsrfToken } from "./shared/auth/csrf.js";
import { requireAuthContext } from "./shared/auth/auth-context.js";
import { inspectNotebookListCache } from "./cache/notebook-cache.js";
import { clearUserCache } from "./cache/cache-invalidation.js";
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
app.use("/exports", exportsRoutes);

app.get("/cache/debug/notebooks", authenticateSession, async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await inspectNotebookListCache(auth.userId));
  } catch (error) {
    next(error);
  }
});

app.post("/cache/debug/clear", authenticateSession, requireCsrfToken, async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    await clearUserCache(auth.userId);
    sendResponse(response, 200, { cleared: true });
  } catch (error) {
    next(error);
  }
});

app.use(notFound);
app.use(errorMiddleware);
```
</div>

**逐行解释**：`app.use("/auth", authRoutes)` 保留认证入口；`/notebooks` 和 `/notes` 接入缓存 service；`/exports` 接入 limiter 和 queue service；`/cache/debug/*` 提供学习用缓存观察；最后统一进入 notFound 和 errorMiddleware。

**执行过程**：一次完整导出先经过 HTTP middleware chain，再进入 Redis limiter 和 BullMQ queue；Worker 进程异步处理；status API 读 PostgreSQL row。每一层都只拥有自己的资源：Express 拥有 request/response，Redis 拥有短期状态，BullMQ 拥有调度，PostgreSQL 拥有业务状态。

**常见错误为什么错**：把所有逻辑写进 controller 会混淆 request lifecycle、cache lifecycle 和 worker lifecycle；把 status polling 绑定到 Redis queue state 会绕过 owner authorization 和 durable row。

**与真实项目的关系**：排查这类系统要按链路定位：auth 是否建立、key 是否正确、cache 是否 hit/miss、Prisma 是否回源、invalidation 是否删除、limiter 是否计数、queue 是否入队、Worker 是否校验、status row 是否更新。

## 10. API 与规则索引

| 主题 | 关键 API / 规则 | 机制含义 |
| --- | --- | --- |
| node-redis | `createClient`, `connect`, `get`, `set`, `expire`, `ttl`, `incr`, `del`, `quit` | 每次命令跨 Redis socket，返回值是运行时数据 |
| Redis TTL | `SET key value EX seconds`, `EXPIRE`, `TTL` | TTL 控制缓存寿命，不表示业务记录过期 |
| Cache invalidation | primary write first, then delete affected keys | source of truth 成功后删除派生数据 |
| Redis limiter | `INCR` plus first-count expiration | 多进程共享计数，超限返回 429 |
| BullMQ | `Queue`, `Job`, `Worker`, `QueueEvents` | HTTP 进程入队，Worker 进程执行 |
| BullMQ retry | `attempts`, `backoff`, failed jobs | 只有幂等 handler 才适合自动重试 |
| Worker shutdown | `worker.close`, `queue.close`, Redis `quit` | 停止接新任务并释放外部连接 |

## 11. 常见错误对照表

| 错误 | 违反的规则 | 识别方式 | 修正方向 |
| --- | --- | --- | --- |
| 把缓存当作 source of truth | 缓存必须可丢弃 | Redis 清空后业务数据消失 | PostgreSQL 保存事实，Redis 保存派生值 |
| key 没有 `userId` | 缓存缺少 owner boundary | 不同用户共享同一个列表 key | key 中加入 user namespace |
| 直接缓存 `Date` 对象 | Redis string 不保存对象身份 | 读回后变成字符串或普通对象 | DTO 中使用 ISO string |
| 写入前先删缓存 | 主写入失败会污染下一次回源 | 数据库写失败但缓存已失效 | primary write first, then delete |
| 进程内 limiter | 多实例之间计数不共享 | 单实例有效，多实例失效 | Redis 共享计数 |
| HTTP 等待长任务 | request lifecycle 被长工作占用 | 请求超时或连接被中断 | 202 + status API + Worker |
| Worker 不幂等 | retry 会重复副作用 | failed 后再次执行产生重复结果 | durable status row 判定完成状态 |
| 自定义 job id 使用 colon | BullMQ job id 边界被破坏 | add job 抛出校验错误 | 使用不含 `:` 的稳定 id |

## 12. 调试与验证方法

调试本章问题时，同时观察 Redis key 与 TTL、PostgreSQL row、BullMQ job state、Node.js process lifecycle。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
redis-cli TTL cache:user:user_123:notebooks:v1
redis-cli GET cache:user:user_123:notebooks:v1
redis-cli INCR rate:user:user_123:exports:1780000000
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run prisma:generate
npm run typecheck
npm test
npm run worker
```
</div>

## 13. 分项练习说明

`01-redis-client` 练习 Redis 连接、key、TTL、JSON 与 pipeline / transaction：

- `practices/07-redis-cache-jobs/01-redis-client/redis-connect.ts`
- `practices/07-redis-cache-jobs/01-redis-client/redis-key-design.ts`
- `practices/07-redis-cache-jobs/01-redis-client/redis-string-ttl.ts`
- `practices/07-redis-cache-jobs/01-redis-client/redis-json-serialization.ts`
- `practices/07-redis-cache-jobs/01-redis-client/redis-pipeline-vs-transaction.ts`

`02-cache-aside` 练习 hit、miss、write-back、invalidation、stale window、stampede 和 failure policy：

- `practices/07-redis-cache-jobs/02-cache-aside/cache-aside-read.ts`
- `practices/07-redis-cache-jobs/02-cache-aside/cache-invalidation-on-write.ts`
- `practices/07-redis-cache-jobs/02-cache-aside/ttl-stale-window.ts`
- `practices/07-redis-cache-jobs/02-cache-aside/cache-stampede-singleflight.ts`
- `practices/07-redis-cache-jobs/02-cache-aside/cache-failure-policy.ts`

`03-rate-limit` 练习 Redis 共享计数、key design 和失败策略：

- `practices/07-redis-cache-jobs/03-rate-limit/redis-fixed-window-limiter.ts`
- `practices/07-redis-cache-jobs/03-rate-limit/rate-limit-key-design.ts`
- `practices/07-redis-cache-jobs/03-rate-limit/rate-limit-failure-policy.ts`

`04-bullmq-basics` 练习 Queue、Worker、QueueEvents 与 payload validation：

- `practices/07-redis-cache-jobs/04-bullmq-basics/queue-add-job.ts`
- `practices/07-redis-cache-jobs/04-bullmq-basics/worker-process-job.ts`
- `practices/07-redis-cache-jobs/04-bullmq-basics/job-payload-validation.ts`
- `practices/07-redis-cache-jobs/04-bullmq-basics/queue-events.ts`

`05-retries-idempotency` 练习 backoff、幂等、custom job id、stalled job 与 graceful shutdown：

- `practices/07-redis-cache-jobs/05-retries-idempotency/retry-backoff.ts`
- `practices/07-redis-cache-jobs/05-retries-idempotency/idempotent-job-handler.ts`
- `practices/07-redis-cache-jobs/05-retries-idempotency/custom-job-id-boundary.ts`
- `practices/07-redis-cache-jobs/05-retries-idempotency/stalled-job-boundary.ts`
- `practices/07-redis-cache-jobs/05-retries-idempotency/worker-graceful-shutdown.ts`

## 14. 最终迷你项目

本项目整合本章机制，但不替代前面的分项教学。它在 Chapter 06 的认证、会话、CSRF 和 owner authorization 之上加入 Redis cache-aside、Redis fixed-window limiter、BullMQ notes export job 和 PostgreSQL durable status row。

### 14.1 项目目标

- `GET /notebooks` 和 notes list 能通过 Redis 缓存减少数据库读取。
- 写入 notebook 或 note 后删除受影响缓存键。
- `POST /exports/notes` 经过 auth、CSRF、Redis limiter 和 Zod validation 后创建状态行、入队并返回 `202 Accepted`。
- Worker 独立执行导出，更新 PostgreSQL status row，并在 shutdown 时关闭 Worker、Queue、Redis 和 Prisma。

### 14.2 运行与资源边界

macOS / Linux 使用本地项目内的 `.env.example`：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
cd mini-projects/redis-job-notes-api
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run dev
```
</div>

Windows PowerShell 使用同一个本地环境样例文件：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```powershell
cd mini-projects/redis-job-notes-api
Copy-Item .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run dev
```
</div>

测试命令也要区分 shell 语法：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
NODE_ENV=test npm test
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```powershell
$env:NODE_ENV = "test"; npm test
```
</div>

Worker 在第二个终端单独启动：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run worker
```
</div>

### 14.3 完整项目代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/.env.example</span>
  </div>

```txt
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/redis_job_notes_api?schema=public"
REDIS_URL="redis://localhost:6379"
PORT=3007
NODE_ENV=development
CORS_ALLOWED_ORIGINS="http://localhost:5173"
SESSION_COOKIE_NAME="redis_job_notes_session"
COOKIE_SECURE=false
SESSION_TTL_SECONDS=28800
CACHE_TTL_SECONDS=60
EXPORT_RATE_LIMIT_MAX=5
EXPORT_RATE_LIMIT_WINDOW_SECONDS=60
RATE_LIMIT_FAILURE_POLICY=open
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/openapi/openapi.yaml</span>
  </div>

```txt
openapi: 3.1.0
info:
  title: Redis Job Notes API
  version: 1.0.0
paths:
  /auth/register:
    post:
      summary: Register a user and create a session
      responses:
        "201":
          description: User registered
  /auth/login:
    post:
      summary: Create a session
      responses:
        "200":
          description: Session created
  /notebooks:
    get:
      summary: List notebooks with cache-aside behavior
      responses:
        "200":
          description: Notebook list
    post:
      summary: Create a notebook and invalidate cache
      responses:
        "201":
          description: Notebook created
  /cache/debug/notebooks:
    get:
      summary: Inspect the current user's notebook cache key
      responses:
        "200":
          description: Cache metadata
  /cache/debug/clear:
    post:
      summary: Clear the current user's cache
      responses:
        "200":
          description: Cache cleared
  /exports/notes:
    post:
      summary: Enqueue a notes export job
      responses:
        "202":
          description: Export accepted
        "429":
          description: Export rate limit exceeded
  /exports/{exportId}:
    get:
      summary: Read an owned export status row
      parameters:
        - name: exportId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        "200":
          description: Export status
        "404":
          description: Export not found
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/package.json</span>
  </div>

```json
{
  "name": "redis-job-notes-api",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "worker": "tsx src/worker.ts",
    "start": "tsx src/server.ts",
    "typecheck": "tsc --noEmit",
    "prisma:generate": "prisma generate",
    "prisma:migrate:dev": "prisma migrate dev",
    "prisma:migrate:deploy": "prisma migrate deploy",
    "prisma:migrate:reset": "prisma migrate reset",
    "seed": "tsx prisma/seed.ts",
    "test": "node --import tsx --test tests/cache.integration.test.ts tests/rate-limit.integration.test.ts tests/jobs.integration.test.ts"
  },
  "dependencies": {
    "@prisma/adapter-pg": "^7.8.0",
    "@prisma/client": "^7.8.0",
    "bullmq": "^5.80.9",
    "cors": "^2.8.6",
    "express": "^5.2.1",
    "express-rate-limit": "^8.6.0",
    "helmet": "^8.3.0",
    "pg": "^8.22.0",
    "redis": "^6.1.0",
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/prisma/schema.prisma</span>
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

enum ExportJobStatus {
  QUEUED
  PROCESSING
  COMPLETED
  FAILED
}

enum ExportFormat {
  JSON
  CSV
}

model User {
  id           String      @id @default(uuid()) @db.Uuid
  email        String      @unique @db.VarChar(320)
  passwordHash String      @db.Text
  role         Role        @default(USER)
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
  sessions     Session[]
  notebooks    Notebook[]
  notes        Note[]
  exportJobs   ExportJob[]
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

model ExportJob {
  id                  String          @id @default(uuid()) @db.Uuid
  ownerId             String          @db.Uuid
  status              ExportJobStatus @default(QUEUED)
  format              ExportFormat
  requestedNotebookId String?         @db.Uuid
  jobId               String?         @unique @db.VarChar(160)
  resultJson          Json?
  errorMessage        String?         @db.Text
  attempts            Int             @default(0)
  createdAt           DateTime        @default(now())
  updatedAt           DateTime        @updatedAt
  completedAt         DateTime?
  owner               User            @relation(fields: [ownerId], references: [id], onDelete: Cascade)

  @@index([ownerId, status])
  @@index([ownerId, createdAt])
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/prisma/seed.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/prisma.config.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/README.md</span>
  </div>

````txt
# Redis Job Notes API

A learning mini project for Redis cache-aside reads, Redis fixed-window rate limiting, and BullMQ background exports.

## Runtime

- Node.js 26 or newer
- PostgreSQL
- Redis

## Setup

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run dev
```

Windows PowerShell setup:

```powershell
Copy-Item .env.example .env
$env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/redis_job_notes_api?schema=public"
$env:REDIS_URL = "redis://localhost:6379"
npm run dev
```

Start the worker in a second terminal:

```bash
npm run worker
```

## Boundary model

- PostgreSQL owns users, sessions, notebooks, notes, and export status rows.
- Redis owns short-lived cache keys, fixed-window counters, and BullMQ queue state.
- HTTP returns `202 Accepted` for export creation and exposes completion through `GET /exports/:exportId`.
- The worker may retry a job, so the handler checks the status row before writing the final result.
````
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/app.ts</span>
  </div>

```ts
import express from "express";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { notebooksRoutes } from "./modules/notebooks/notebooks.routes.js";
import { notebookNotesRoutes } from "./modules/notes/notebook-notes.routes.js";
import { notesRoutes } from "./modules/notes/notes.routes.js";
import { exportsRoutes } from "./modules/exports/exports.routes.js";
import { authenticateSession } from "./shared/auth/authenticate-session.js";
import { requireCsrfToken } from "./shared/auth/csrf.js";
import { requireAuthContext } from "./shared/auth/auth-context.js";
import { inspectNotebookListCache } from "./cache/notebook-cache.js";
import { clearUserCache } from "./cache/cache-invalidation.js";
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
app.use("/exports", exportsRoutes);

app.get("/cache/debug/notebooks", authenticateSession, async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await inspectNotebookListCache(auth.userId));
  } catch (error) {
    next(error);
  }
});

app.post("/cache/debug/clear", authenticateSession, requireCsrfToken, async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    await clearUserCache(auth.userId);
    sendResponse(response, 200, { cleared: true });
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/cache/cache-invalidation.ts</span>
  </div>

```ts
import { deleteNotebookListCache } from "./notebook-cache.js";
import { deleteNoteListCaches } from "./note-list-cache.js";

export async function invalidateNotebookCaches(userId: string, notebookId?: string): Promise<void> {
  await deleteNotebookListCache(userId);

  if (notebookId) {
    await deleteNoteListCaches(userId, notebookId);
  }
}

export async function clearUserCache(userId: string): Promise<void> {
  await deleteNotebookListCache(userId);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/cache/note-list-cache.ts</span>
  </div>

```ts
import { z } from "zod";
import { getRedisClient } from "../redis/redis-client.js";
import { parseCacheValue, serializeCacheValue, type CacheReadResult } from "../redis/cache-json.js";
import { cacheBypassReason, cacheTtlSeconds } from "../redis/cache-policy.js";
import { userNotebookNotesKey, userNotebookNotesPattern } from "../redis/redis-keys.js";
import type { NoteDto, NoteStatus } from "../modules/notes/notes.types.js";

type NoteListQuery = {
  status?: NoteStatus;
  limit: number;
  offset: number;
};

const noteDtoSchema = z.object({
  id: z.string(),
  notebookId: z.string(),
  title: z.string(),
  body: z.string(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

const noteListSchema = z.array(noteDtoSchema);

export async function readNoteListCache(userId: string, notebookId: string, query: NoteListQuery): Promise<CacheReadResult<NoteDto[]>> {
  const key = userNotebookNotesKey(userId, notebookId, query);
  try {
    const redis = await getRedisClient();
    return parseCacheValue(await redis.get(key), noteListSchema);
  } catch (error) {
    return { status: "BYPASS", reason: cacheBypassReason(error) };
  }
}

export async function writeNoteListCache(userId: string, notebookId: string, query: NoteListQuery, notes: NoteDto[]): Promise<void> {
  try {
    const redis = await getRedisClient();
    await redis.set(userNotebookNotesKey(userId, notebookId, query), serializeCacheValue(notes), { EX: cacheTtlSeconds() });
  } catch {
  }
}

export async function deleteNoteListCaches(userId: string, notebookId: string): Promise<void> {
  try {
    const redis = await getRedisClient();
    const keys: string[] = [];
    for await (const key of redis.scanIterator({ MATCH: userNotebookNotesPattern(userId, notebookId), COUNT: 100 })) {
      keys.push(String(key));
    }

    if (keys.length > 0) {
      await redis.del(keys);
    }
  } catch {
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/cache/notebook-cache.ts</span>
  </div>

```ts
import { z } from "zod";
import { getRedisClient } from "../redis/redis-client.js";
import { parseCacheValue, serializeCacheValue, type CacheReadResult } from "../redis/cache-json.js";
import { cacheBypassReason, cacheTtlSeconds } from "../redis/cache-policy.js";
import { userNotebooksKey } from "../redis/redis-keys.js";
import type { NotebookDto } from "../modules/notebooks/notebooks.types.js";

const notebookDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

const notebookListSchema = z.array(notebookDtoSchema);

export async function readNotebookListCache(userId: string): Promise<CacheReadResult<NotebookDto[]>> {
  const key = userNotebooksKey(userId);
  try {
    const redis = await getRedisClient();
    return parseCacheValue(await redis.get(key), notebookListSchema);
  } catch (error) {
    return { status: "BYPASS", reason: cacheBypassReason(error) };
  }
}

export async function writeNotebookListCache(userId: string, notebooks: NotebookDto[]): Promise<void> {
  try {
    const redis = await getRedisClient();
    await redis.set(userNotebooksKey(userId), serializeCacheValue(notebooks), { EX: cacheTtlSeconds() });
  } catch {
  }
}

export async function deleteNotebookListCache(userId: string): Promise<void> {
  try {
    const redis = await getRedisClient();
    await redis.del(userNotebooksKey(userId));
  } catch {
  }
}

export async function inspectNotebookListCache(userId: string): Promise<{ key: string; exists: boolean; ttl: number }> {
  const key = userNotebooksKey(userId);
  const redis = await getRedisClient();
  const ttl = await redis.ttl(key);
  return { key, exists: ttl !== -2, ttl };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/cache/singleflight.ts</span>
  </div>

```ts
const inFlightLoads = new Map<string, Promise<unknown>>();

export async function runSingleflight<T>(key: string, load: () => Promise<T>): Promise<T> {
  const existing = inFlightLoads.get(key) as Promise<T> | undefined;
  if (existing) {
    return existing;
  }

  const promise = load().finally(() => {
    inFlightLoads.delete(key);
  });

  inFlightLoads.set(key, promise);
  return promise;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/config/env.ts</span>
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
  REDIS_URL: z.string().url().default("redis://localhost:6379"),
  PORT: z.coerce.number().int().positive().default(3007),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  CORS_ALLOWED_ORIGINS: z.string().default("http://localhost:5173"),
  SESSION_COOKIE_NAME: z.string().min(1).default("redis_job_notes_session"),
  COOKIE_SECURE: booleanFromString.default(false),
  SESSION_TTL_SECONDS: z.coerce.number().int().positive().default(60 * 60 * 8),
  CACHE_TTL_SECONDS: z.coerce.number().int().positive().default(60),
  EXPORT_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
  EXPORT_RATE_LIMIT_WINDOW_SECONDS: z.coerce.number().int().positive().default(60),
  RATE_LIMIT_FAILURE_POLICY: z.enum(["open", "closed"]).default("open")
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/db/prisma-errors.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/db/prisma.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/jobs/export-notes-job.ts</span>
  </div>

```ts
import type { Job } from "bullmq";
import { prisma } from "../db/prisma.js";
import { parseExportJobPayload, type ExportNotesJobPayload } from "./job-schema.js";
import {
  findExportJobById,
  markExportCompleted,
  markExportFailed,
  markExportProcessing
} from "./job-status.repository.js";

type ExportResult = {
  format: "JSON" | "CSV";
  count: number;
  content: unknown;
};

export async function processExportNotesJob(job: Job<ExportNotesJobPayload>): Promise<ExportResult> {
  const payload = parseExportJobPayload(job.data);
  const existing = await findExportJobById(payload.exportId);

  if (!existing) {
    throw new Error("Export status row was not found");
  }

  if (existing.status === "COMPLETED") {
    return existing.resultJson as ExportResult;
  }

  const attempts = job.attemptsMade + 1;
  await markExportProcessing(payload.exportId, attempts);

  try {
    const notes = await prisma.note.findMany({
      where: {
        ownerId: payload.ownerId,
        notebookId: payload.requestedNotebookId
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        notebookId: true,
        title: true,
        body: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const rows = notes.map((note) => ({
      id: note.id,
      notebookId: note.notebookId,
      title: note.title,
      body: note.body,
      status: note.status,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString()
    }));

    const result: ExportResult = payload.format === "CSV"
      ? { format: "CSV", count: rows.length, content: toCsv(rows) }
      : { format: "JSON", count: rows.length, content: rows };

    await markExportCompleted(payload.exportId, result, attempts);
    return result;
  } catch (error) {
    await markExportFailed(payload.exportId, error instanceof Error ? error.message : "Export job failed", attempts);
    throw error;
  }
}

function toCsv(rows: Array<Record<string, string>>): string {
  const headers = ["id", "notebookId", "title", "body", "status", "createdAt", "updatedAt"];
  const body = rows.map((row) => headers.map((header) => escapeCsv(row[header] ?? "")).join(","));
  return [headers.join(","), ...body].join("\n");
}

function escapeCsv(value: string): string {
  if (!/[",\n]/.test(value)) {
    return value;
  }

  return `"${value.replaceAll('"', '""')}"`;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/jobs/job-events.ts</span>
  </div>

```ts
import { QueueEvents } from "bullmq";
import { createBullMqConnectionOptions, NOTES_EXPORT_QUEUE_NAME } from "./queue.js";
import { logger } from "../shared/logging/logger.js";

export function createNotesExportQueueEvents(): QueueEvents {
  const events = new QueueEvents(NOTES_EXPORT_QUEUE_NAME, {
    connection: createBullMqConnectionOptions()
  });

  events.on("completed", ({ jobId }) => {
    logger.info({ jobId }, "Notes export job completed");
  });

  events.on("failed", ({ jobId, failedReason }) => {
    logger.error({ jobId, failedReason }, "Notes export job failed");
  });

  return events;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/jobs/job-schema.ts</span>
  </div>

```ts
import { z } from "zod";

export const exportJobPayloadSchema = z.object({
  exportId: z.string().uuid(),
  ownerId: z.string().uuid(),
  requestedNotebookId: z.string().uuid().optional(),
  format: z.enum(["JSON", "CSV"])
});

export type ExportNotesJobPayload = z.infer<typeof exportJobPayloadSchema>;

export function parseExportJobPayload(data: unknown): ExportNotesJobPayload {
  return exportJobPayloadSchema.parse(data);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/jobs/job-status.repository.ts</span>
  </div>

```ts
import { prisma } from "../db/prisma.js";

export type ExportFormat = "JSON" | "CSV";

export type ExportJobDto = {
  id: string;
  status: string;
  format: ExportFormat;
  requestedNotebookId: string | null;
  jobId: string | null;
  result: unknown;
  errorMessage: string | null;
  attempts: number;
  statusUrl: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};

function toDto(row: {
  id: string;
  status: string;
  format: ExportFormat;
  requestedNotebookId: string | null;
  jobId: string | null;
  resultJson: unknown;
  errorMessage: string | null;
  attempts: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}): ExportJobDto {
  return {
    id: row.id,
    status: row.status,
    format: row.format,
    requestedNotebookId: row.requestedNotebookId,
    jobId: row.jobId,
    result: row.resultJson,
    errorMessage: row.errorMessage,
    attempts: row.attempts,
    statusUrl: `/exports/${row.id}`,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    completedAt: row.completedAt?.toISOString() ?? null
  };
}

export async function createQueuedExportJob(input: {
  ownerId: string;
  format: ExportFormat;
  requestedNotebookId?: string;
}): Promise<ExportJobDto> {
  const row = await prisma.exportJob.create({
    data: {
      ownerId: input.ownerId,
      format: input.format,
      requestedNotebookId: input.requestedNotebookId
    }
  });

  return toDto(row);
}

export async function setExportJobId(exportId: string, jobId: string): Promise<void> {
  await prisma.exportJob.update({
    where: { id: exportId },
    data: { jobId }
  });
}

export async function findExportJobForOwner(exportId: string, ownerId: string): Promise<ExportJobDto | null> {
  const row = await prisma.exportJob.findFirst({
    where: { id: exportId, ownerId }
  });

  return row ? toDto(row) : null;
}

export async function markExportProcessing(exportId: string, attempts: number): Promise<void> {
  await prisma.exportJob.update({
    where: { id: exportId },
    data: {
      status: "PROCESSING",
      attempts,
      errorMessage: null
    }
  });
}

export async function markExportCompleted(exportId: string, result: unknown, attempts: number): Promise<void> {
  await prisma.exportJob.update({
    where: { id: exportId },
    data: {
      status: "COMPLETED",
      resultJson: result as object,
      attempts,
      completedAt: new Date()
    }
  });
}

export async function markExportFailed(exportId: string, errorMessage: string, attempts: number): Promise<void> {
  await prisma.exportJob.update({
    where: { id: exportId },
    data: {
      status: "FAILED",
      errorMessage,
      attempts
    }
  });
}

export async function findExportJobById(exportId: string) {
  return prisma.exportJob.findUnique({ where: { id: exportId } });
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/jobs/queue.ts</span>
  </div>

```ts
import { Queue } from "bullmq";
import { config } from "../config/env.js";
import { toBullMqJobId } from "../redis/redis-keys.js";
import type { ExportNotesJobPayload } from "./job-schema.js";

export const NOTES_EXPORT_QUEUE_NAME = "notes-export";

export function createBullMqConnectionOptions() {
  const url = new URL(config.REDIS_URL);
  const db = Number.parseInt(url.pathname.replace("/", ""), 10);

  return {
    host: url.hostname || "127.0.0.1",
    port: Number.parseInt(url.port || "6379", 10),
    username: url.username || undefined,
    password: url.password || undefined,
    db: Number.isInteger(db) ? db : 0,
    maxRetriesPerRequest: null
  };
}

export const notesExportQueue = new Queue<ExportNotesJobPayload>(NOTES_EXPORT_QUEUE_NAME, {
  connection: createBullMqConnectionOptions(),
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000
    },
    removeOnComplete: false,
    removeOnFail: false
  }
});

export async function enqueueExportNotesJob(payload: ExportNotesJobPayload) {
  return notesExportQueue.add("export-notes", payload, {
    jobId: toBullMqJobId(payload.exportId)
  });
}

export async function closeExportQueue(): Promise<void> {
  await notesExportQueue.close();
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/jobs/worker.ts</span>
  </div>

```ts
import { Worker } from "bullmq";
import { processExportNotesJob } from "./export-notes-job.js";
import { createBullMqConnectionOptions, NOTES_EXPORT_QUEUE_NAME } from "./queue.js";
import type { ExportNotesJobPayload } from "./job-schema.js";

export function createNotesExportWorker(): Worker<ExportNotesJobPayload> {
  return new Worker<ExportNotesJobPayload>(
    NOTES_EXPORT_QUEUE_NAME,
    async (job) => processExportNotesJob(job),
    {
      connection: createBullMqConnectionOptions(),
      concurrency: 1
    }
  );
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/auth/auth.controller.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/auth/auth.repository.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/auth/auth.routes.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/auth/auth.schema.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/auth/auth.service.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/auth/auth.types.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/exports/exports.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./exports.service.js";

export const create: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 202, await service.createExport(auth, request.body));
  } catch (error) {
    next(error);
  }
};

export const get: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await service.getExport(auth, routeParam(request.params.exportId)));
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/exports/exports.routes.ts</span>
  </div>

```ts
import { Router } from "express";
import { authenticateSession } from "../../shared/auth/authenticate-session.js";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { exportRateLimit } from "../../rate-limit/rate-limit-middleware.js";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { createExportSchema, exportParamsSchema } from "./exports.schema.js";
import * as controller from "./exports.controller.js";

export const exportsRoutes = Router();

exportsRoutes.use(authenticateSession);
exportsRoutes.post("/", requireCsrfToken, exportRateLimit, validateRequest({ body: createExportSchema }), controller.create);
exportsRoutes.get("/:exportId", validateRequest({ params: exportParamsSchema }), controller.get);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/exports/exports.schema.ts</span>
  </div>

```ts
import { z } from "zod";

export const createExportSchema = z.object({
  notebookId: z.string().uuid().optional(),
  format: z.enum(["JSON", "CSV"]).default("JSON")
});

export const exportParamsSchema = z.object({
  exportId: z.string().uuid()
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/exports/exports.service.ts</span>
  </div>

```ts
import type { AuthContext } from "../../shared/auth/auth-context.js";
import { HttpError } from "../../shared/errors/http-error.js";
import { findNotebookById } from "../notebooks/notebooks.repository.js";
import { enqueueExportNotesJob } from "../../jobs/queue.js";
import { toBullMqJobId } from "../../redis/redis-keys.js";
import {
  createQueuedExportJob,
  findExportJobForOwner,
  markExportFailed,
  setExportJobId
} from "../../jobs/job-status.repository.js";
import type { CreateExportInput } from "./exports.types.js";

export async function createExport(auth: AuthContext, input: CreateExportInput) {
  if (input.notebookId) {
    const notebook = await findNotebookById(input.notebookId);
    if (!notebook || notebook.ownerId !== auth.userId) {
      throw new HttpError(404, "Notebook was not found.", "NOTEBOOK_NOT_FOUND");
    }
  }

  const status = await createQueuedExportJob({
    ownerId: auth.userId,
    format: input.format,
    requestedNotebookId: input.notebookId
  });

  const jobId = toBullMqJobId(status.id);
  await setExportJobId(status.id, jobId);

  try {
    await enqueueExportNotesJob({
      exportId: status.id,
      ownerId: auth.userId,
      requestedNotebookId: input.notebookId,
      format: input.format
    });
  } catch (error) {
    await markExportFailed(status.id, error instanceof Error ? error.message : "Queue enqueue failed", 0);
    throw new HttpError(503, "Export queue is unavailable.", "EXPORT_QUEUE_UNAVAILABLE");
  }

  return {
    exportId: status.id,
    status: "QUEUED",
    statusUrl: `/exports/${status.id}`,
    jobId
  };
}

export async function getExport(auth: AuthContext, exportId: string) {
  const status = await findExportJobForOwner(exportId, auth.userId);
  if (!status) {
    throw new HttpError(404, "Export was not found.", "EXPORT_NOT_FOUND");
  }

  return status;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/exports/exports.types.ts</span>
  </div>

```ts
export type CreateExportInput = {
  notebookId?: string;
  format: "JSON" | "CSV";
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notebooks/notebooks.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./notebooks.service.js";

export const list: RequestHandler = async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    const result = await service.list(auth);
    response.setHeader("x-cache", result.cacheStatus);
    sendResponse(response, 200, result.notebooks);
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notebooks/notebooks.repository.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notebooks/notebooks.routes.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notebooks/notebooks.schema.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notebooks/notebooks.service.ts</span>
  </div>

```ts
import type { AuthContext } from "../../shared/auth/auth-context.js";
import { assertOwner } from "../../shared/auth/authorize-owner.js";
import { HttpError } from "../../shared/errors/http-error.js";
import { mapPrismaError } from "../../db/prisma-errors.js";
import { invalidateNotebookCaches } from "../../cache/cache-invalidation.js";
import { readNotebookListCache, writeNotebookListCache } from "../../cache/notebook-cache.js";
import { runSingleflight } from "../../cache/singleflight.js";
import * as repository from "./notebooks.repository.js";

export async function list(auth: AuthContext) {
  const cached = await readNotebookListCache(auth.userId);
  if (cached.status === "HIT") {
    return { cacheStatus: "HIT" as const, notebooks: cached.value };
  }

  const notebooks = await runSingleflight(`notebooks:${auth.userId}`, async () => {
    const records = await repository.listNotebooks(auth.userId);
    const dtos = records.map(repository.toNotebookDto);
    await writeNotebookListCache(auth.userId, dtos);
    return dtos;
  });

  return { cacheStatus: cached.status, notebooks };
}

export async function create(auth: AuthContext, input: { name: string }) {
  try {
    const notebook = await repository.createNotebook({ ownerId: auth.userId, name: input.name });
    await invalidateNotebookCaches(auth.userId, notebook.id);
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
    await invalidateNotebookCaches(auth.userId, notebook.id);
    return repository.toNotebookDto(notebook);
  } catch (error) {
    mapPrismaError(error, "NOTEBOOK_NAME_CONFLICT");
  }
}

export async function remove(auth: AuthContext, notebookId: string): Promise<void> {
  await getOwnedNotebook(auth, notebookId);
  await repository.deleteNotebook(notebookId);
  await invalidateNotebookCaches(auth.userId, notebookId);
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notebooks/notebooks.types.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notes/notebook-notes.routes.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notes/notes.controller.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import * as service from "./notes.service.js";

export const list: RequestHandler = async (request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    const result = await service.list(auth, {
      notebookId: routeParam(request.params.notebookId),
      status: request.query.status as never,
      limit: Number(request.query.limit),
      offset: Number(request.query.offset)
    });
    response.setHeader("x-cache", result.cacheStatus);
    sendResponse(response, 200, result.notes);
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notes/notes.repository.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notes/notes.routes.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notes/notes.schema.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notes/notes.service.ts</span>
  </div>

```ts
import type { AuthContext } from "../../shared/auth/auth-context.js";
import { assertOwner } from "../../shared/auth/authorize-owner.js";
import { HttpError } from "../../shared/errors/http-error.js";
import { mapPrismaError } from "../../db/prisma-errors.js";
import { invalidateNotebookCaches } from "../../cache/cache-invalidation.js";
import { readNoteListCache, writeNoteListCache } from "../../cache/note-list-cache.js";
import { runSingleflight } from "../../cache/singleflight.js";
import { findNotebookById } from "../notebooks/notebooks.repository.js";
import * as repository from "./notes.repository.js";
import type { NoteStatus } from "./notes.types.js";

export async function list(auth: AuthContext, input: { notebookId: string; status?: NoteStatus; limit: number; offset: number }) {
  await assertNotebookOwner(auth, input.notebookId);
  const query = { status: input.status, limit: input.limit, offset: input.offset };
  const cached = await readNoteListCache(auth.userId, input.notebookId, query);
  if (cached.status === "HIT") {
    return { cacheStatus: "HIT" as const, notes: cached.value };
  }

  const notes = await runSingleflight(`notes:${auth.userId}:${input.notebookId}:${input.status ?? "ALL"}:${input.limit}:${input.offset}`, async () => {
    const records = await repository.listNotes({
      ownerId: auth.userId,
      notebookId: input.notebookId,
      status: input.status,
      limit: input.limit,
      offset: input.offset
    });
    const dtos = records.map(repository.toNoteDto);
    await writeNoteListCache(auth.userId, input.notebookId, query, dtos);
    return dtos;
  });

  return { cacheStatus: cached.status, notes };
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
    await invalidateNotebookCaches(auth.userId, notebookId);
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
  const existing = await getOwnedNoteById(auth, noteId);

  try {
    const note = await repository.updateNote(noteId, input);
    await invalidateNotebookCaches(auth.userId, existing.notebookId);
    return repository.toNoteDto(note);
  } catch (error) {
    mapPrismaError(error, "NOTE_TITLE_CONFLICT");
  }
}

export async function removeById(auth: AuthContext, noteId: string): Promise<void> {
  const existing = await getOwnedNoteById(auth, noteId);
  await repository.deleteNote(noteId);
  await invalidateNotebookCaches(auth.userId, existing.notebookId);
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/notes/notes.types.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/users/users.repository.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/modules/users/users.types.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/rate-limit/rate-limit-middleware.ts</span>
  </div>

```ts
import type { RequestHandler } from "express";
import { config } from "../config/env.js";
import { HttpError } from "../shared/errors/http-error.js";
import { consumeExportRateLimit } from "./redis-fixed-window.js";

export const exportRateLimit: RequestHandler = async (request, response, next) => {
  const auth = response.locals.auth as { userId?: string } | undefined;
  const identity = auth?.userId ?? request.ip ?? "anonymous";

  try {
    const decision = await consumeExportRateLimit(identity);
    response.setHeader("x-rate-limit-limit", String(decision.limit));
    response.setHeader("x-rate-limit-remaining", String(Math.max(decision.limit - decision.count, 0)));
    response.setHeader("x-rate-limit-reset", String(decision.resetSeconds));

    if (!decision.allowed) {
      throw new HttpError(429, "Too many export requests.", "EXPORT_RATE_LIMITED");
    }

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
      return;
    }

    if (config.RATE_LIMIT_FAILURE_POLICY === "closed") {
      next(new HttpError(503, "Rate limiter is unavailable.", "RATE_LIMIT_UNAVAILABLE"));
      return;
    }

    response.setHeader("x-rate-limit-policy", "fail-open");
    next();
  }
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/rate-limit/redis-fixed-window.ts</span>
  </div>

```ts
import { config } from "../config/env.js";
import { getRedisClient } from "../redis/redis-client.js";
import { exportsRateLimitKey } from "../redis/redis-keys.js";

export type FixedWindowDecision = {
  allowed: boolean;
  key: string;
  count: number;
  limit: number;
  ttl: number;
  resetSeconds: number;
};

export function currentWindowStartSeconds(now = Date.now(), windowSeconds = config.EXPORT_RATE_LIMIT_WINDOW_SECONDS): number {
  return Math.floor(now / (windowSeconds * 1000)) * windowSeconds;
}

export async function consumeExportRateLimit(identity: string): Promise<FixedWindowDecision> {
  const windowStart = currentWindowStartSeconds();
  const key = exportsRateLimitKey(identity, windowStart);
  const redis = await getRedisClient();
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, config.EXPORT_RATE_LIMIT_WINDOW_SECONDS);
  }

  const ttl = await redis.ttl(key);
  return {
    allowed: count <= config.EXPORT_RATE_LIMIT_MAX,
    key,
    count,
    limit: config.EXPORT_RATE_LIMIT_MAX,
    ttl,
    resetSeconds: ttl > 0 ? ttl : config.EXPORT_RATE_LIMIT_WINDOW_SECONDS
  };
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/redis/cache-json.ts</span>
  </div>

```ts
import type { ZodType } from "zod";

export type CacheReadResult<T> =
  | { status: "HIT"; value: T }
  | { status: "MISS" }
  | { status: "BYPASS"; reason: string };

export function serializeCacheValue(value: unknown): string {
  return JSON.stringify(value);
}

export function parseCacheValue<T>(raw: string | null, schema: ZodType<T>): CacheReadResult<T> {
  if (raw === null) {
    return { status: "MISS" };
  }

  try {
    return { status: "HIT", value: schema.parse(JSON.parse(raw)) };
  } catch (error) {
    return { status: "BYPASS", reason: error instanceof Error ? error.message : "cache parse error" };
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/redis/cache-policy.ts</span>
  </div>

```ts
import { config } from "../config/env.js";

export type CacheStatus = "HIT" | "MISS" | "BYPASS";

export function cacheTtlSeconds(): number {
  return config.CACHE_TTL_SECONDS;
}

export function cacheBypassReason(error: unknown): string {
  return error instanceof Error ? error.message : "redis cache unavailable";
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/redis/redis-client.ts</span>
  </div>

```ts
import { createClient, type RedisClientType } from "redis";
import { config } from "../config/env.js";
import { logger } from "../shared/logging/logger.js";

let redisClient: RedisClientType | undefined;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!redisClient) {
    redisClient = createClient({ url: config.REDIS_URL });
    redisClient.on("error", (error) => {
      logger.error({ error }, "Redis client error");
    });
  }

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  return redisClient;
}

export async function closeRedisClient(): Promise<void> {
  if (redisClient?.isOpen) {
    await redisClient.quit();
  }

  redisClient = undefined;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/redis/redis-keys.ts</span>
  </div>

```ts
import { createHash } from "node:crypto";

type NoteListQuery = {
  status?: string;
  limit: number;
  offset: number;
};

function assertSafeKeyPart(value: string, label: string): string {
  if (!/^[A-Za-z0-9_.-]+$/.test(value)) {
    throw new Error(`${label} contains unsafe Redis key characters`);
  }

  return value;
}

export function hashQuery(input: NoteListQuery): string {
  const normalized = JSON.stringify({
    status: input.status ?? "ALL",
    limit: input.limit,
    offset: input.offset
  });

  return createHash("sha256").update(normalized, "utf8").digest("hex").slice(0, 16);
}

export function userNotebooksKey(userId: string): string {
  return `cache:user:${assertSafeKeyPart(userId, "userId")}:notebooks:v1`;
}

export function userNotebookNotesKey(userId: string, notebookId: string, query: NoteListQuery): string {
  return [
    "cache",
    "user",
    assertSafeKeyPart(userId, "userId"),
    "notebook",
    assertSafeKeyPart(notebookId, "notebookId"),
    "notes",
    hashQuery(query),
    "v1"
  ].join(":");
}

export function userNotebookNotesPattern(userId: string, notebookId: string): string {
  return `cache:user:${assertSafeKeyPart(userId, "userId")}:notebook:${assertSafeKeyPart(notebookId, "notebookId")}:notes:*:v1`;
}

export function exportsRateLimitKey(identity: string, windowStartSeconds: number): string {
  return `rate:user:${assertSafeKeyPart(identity, "identity")}:exports:${windowStartSeconds}`;
}

export function exportJobLockKey(jobId: string): string {
  return `job:lock:${assertSafeKeyPart(jobId, "jobId")}`;
}

export function toBullMqJobId(exportId: string): string {
  const jobId = `export-${exportId.replaceAll("-", "")}`;
  if (jobId.includes(":")) {
    throw new Error("BullMQ custom job ids must not contain a colon");
  }

  return jobId;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/server.ts</span>
  </div>

```ts
import { app } from "./app.js";
import { config } from "./config/env.js";
import { disconnectPrisma } from "./db/prisma.js";
import { closeRedisClient } from "./redis/redis-client.js";
import { closeExportQueue } from "./jobs/queue.js";
import { logger } from "./shared/logging/logger.js";

const server = app.listen(config.PORT, () => {
  logger.info({ port: config.PORT }, "Redis job notes API started");
});

async function shutdown(signal: string): Promise<void> {
  logger.info({ signal }, "Shutting down Redis job notes API");
  server.close(async () => {
    await closeExportQueue();
    await closeRedisClient();
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/auth/auth-context.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/auth/authenticate-session.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/auth/authorize-owner.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/auth/csrf.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/auth/password-hashing.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/auth/session-token.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/cookies/cookie-parser.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/cookies/session-cookie.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/errors/error-middleware.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/errors/http-error.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/logging/logger.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/middleware/cors.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/middleware/not-found.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/middleware/rate-limit.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/middleware/request-id.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/middleware/security-headers.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/responses/send-response.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/shared/validation/validate-request.ts</span>
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/src/worker.ts</span>
  </div>

```ts
import { disconnectPrisma } from "./db/prisma.js";
import { closeRedisClient } from "./redis/redis-client.js";
import { createNotesExportQueueEvents } from "./jobs/job-events.js";
import { createNotesExportWorker } from "./jobs/worker.js";
import { logger } from "./shared/logging/logger.js";

const worker = createNotesExportWorker();
const queueEvents = createNotesExportQueueEvents();

logger.info({}, "Notes export worker started");

async function shutdown(signal: string): Promise<void> {
  logger.info({ signal }, "Shutting down notes export worker");
  await worker.close();
  await queueEvents.close();
  await closeRedisClient();
  await disconnectPrisma();
  process.exit(0);
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/tests/cache.integration.test.ts</span>
  </div>

```ts
process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??= "postgresql://postgres:postgres@localhost:5432/redis_job_notes_api_test?schema=public";
process.env.REDIS_URL ??= "redis://localhost:6379";
process.env.CORS_ALLOWED_ORIGINS ??= "http://localhost:5173";
process.env.SESSION_COOKIE_NAME ??= "redis_job_notes_session";
process.env.COOKIE_SECURE ??= "false";
process.env.CACHE_TTL_SECONDS ??= "30";
process.env.EXPORT_RATE_LIMIT_MAX ??= "2";
process.env.EXPORT_RATE_LIMIT_WINDOW_SECONDS ??= "60";
process.env.RATE_LIMIT_FAILURE_POLICY ??= "open";

import assert from "node:assert/strict";
import { after, beforeEach, describe, it } from "node:test";
import request from "supertest";

const { app } = await import("../src/app.js");
const { prisma } = await import("../src/db/prisma.js");
const { resetTestDatabase } = await import("./helpers/database.js");
const { resetTestRedis, closeTestRedis } = await import("./helpers/redis.js");
const { hashPassword } = await import("../src/shared/auth/password-hashing.js");

async function createAuthenticatedAgent(email: string) {
  await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword("shared-passphrase-2026")
    }
  });

  const agent = request.agent(app);
  await agent.post("/auth/login").send({ email, password: "shared-passphrase-2026" }).expect(200);
  const csrf = await agent.get("/auth/csrf").expect(200);
  return { agent, csrfToken: csrf.body.data.csrfToken };
}

describe("notebook cache integration", () => {
  beforeEach(async () => {
    await resetTestDatabase();
    await resetTestRedis();
  });

  after(async () => {
    await closeTestRedis();
    await prisma.$disconnect();
  });

  it("uses cache-aside and invalidates the notebook list after a write", async () => {
    const alice = await createAuthenticatedAgent("alice@example.com");

    await alice.agent.post("/notebooks").set("x-csrf-token", alice.csrfToken).send({ name: "Work" }).expect(201);

    const first = await alice.agent.get("/notebooks").expect(200);
    const second = await alice.agent.get("/notebooks").expect(200);
    assert.equal(first.headers["x-cache"], "MISS");
    assert.equal(second.headers["x-cache"], "HIT");

    await alice.agent.post("/cache/debug/clear").set("x-csrf-token", alice.csrfToken).expect(200);
    const third = await alice.agent.get("/notebooks").expect(200);
    assert.equal(third.headers["x-cache"], "MISS");
  });
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/tests/helpers/database.ts</span>
  </div>

```ts
import { prisma } from "../../src/db/prisma.js";

export async function resetTestDatabase() {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Refusing to reset database outside NODE_ENV=test");
  }

  await prisma.$transaction([
    prisma.exportJob.deleteMany(),
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
    <span class="macos-code-title">mini-projects/redis-job-notes-api/tests/helpers/redis.ts</span>
  </div>

```ts
import { closeRedisClient, getRedisClient } from "../../src/redis/redis-client.js";

export async function resetTestRedis(): Promise<void> {
  const redis = await getRedisClient();
  await redis.sendCommand(["FLUSHDB"]);
}

export async function closeTestRedis(): Promise<void> {
  await closeRedisClient();
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/tests/jobs.integration.test.ts</span>
  </div>

```ts
process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??= "postgresql://postgres:postgres@localhost:5432/redis_job_notes_api_test?schema=public";
process.env.REDIS_URL ??= "redis://localhost:6379";
process.env.CORS_ALLOWED_ORIGINS ??= "http://localhost:5173";
process.env.SESSION_COOKIE_NAME ??= "redis_job_notes_session";
process.env.COOKIE_SECURE ??= "false";
process.env.CACHE_TTL_SECONDS ??= "30";
process.env.EXPORT_RATE_LIMIT_MAX ??= "2";
process.env.EXPORT_RATE_LIMIT_WINDOW_SECONDS ??= "60";
process.env.RATE_LIMIT_FAILURE_POLICY ??= "open";

import assert from "node:assert/strict";
import { after, beforeEach, describe, it } from "node:test";
import request from "supertest";

const { app } = await import("../src/app.js");
const { prisma } = await import("../src/db/prisma.js");
const { processExportNotesJob } = await import("../src/jobs/export-notes-job.js");
const { resetTestDatabase } = await import("./helpers/database.js");
const { resetTestRedis, closeTestRedis } = await import("./helpers/redis.js");
const { hashPassword } = await import("../src/shared/auth/password-hashing.js");

async function createAuthenticatedAgent(email: string) {
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword("shared-passphrase-2026")
    }
  });

  const agent = request.agent(app);
  await agent.post("/auth/login").send({ email, password: "shared-passphrase-2026" }).expect(200);
  const csrf = await agent.get("/auth/csrf").expect(200);
  return { agent, csrfToken: csrf.body.data.csrfToken, user };
}

describe("notes export job status", () => {
  beforeEach(async () => {
    await resetTestDatabase();
    await resetTestRedis();
  });

  after(async () => {
    await closeTestRedis();
    await prisma.$disconnect();
  });

  it("creates a durable status row and lets the worker complete it idempotently", async () => {
    const alice = await createAuthenticatedAgent("alice@example.com");
    const notebook = await prisma.notebook.create({ data: { ownerId: alice.user.id, name: "Work" } });
    await prisma.note.create({
      data: {
        ownerId: alice.user.id,
        notebookId: notebook.id,
        title: "Exported",
        body: "Job payload",
        status: "ACTIVE"
      }
    });

    const response = await alice.agent
      .post("/exports/notes")
      .set("x-csrf-token", alice.csrfToken)
      .send({ notebookId: notebook.id, format: "JSON" })
      .expect(202);

    const exportId = response.body.data.exportId;
    await processExportNotesJob({
      data: {
        exportId,
        ownerId: alice.user.id,
        requestedNotebookId: notebook.id,
        format: "JSON"
      },
      attemptsMade: 0
    } as never);

    await processExportNotesJob({
      data: {
        exportId,
        ownerId: alice.user.id,
        requestedNotebookId: notebook.id,
        format: "JSON"
      },
      attemptsMade: 1
    } as never);

    const status = await alice.agent.get("/exports/" + exportId).expect(200);
    assert.equal(status.body.data.status, "COMPLETED");
    assert.equal(status.body.data.result.count, 1);
  });
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/tests/rate-limit.integration.test.ts</span>
  </div>

```ts
process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??= "postgresql://postgres:postgres@localhost:5432/redis_job_notes_api_test?schema=public";
process.env.REDIS_URL ??= "redis://localhost:6379";
process.env.CORS_ALLOWED_ORIGINS ??= "http://localhost:5173";
process.env.SESSION_COOKIE_NAME ??= "redis_job_notes_session";
process.env.COOKIE_SECURE ??= "false";
process.env.CACHE_TTL_SECONDS ??= "30";
process.env.EXPORT_RATE_LIMIT_MAX ??= "2";
process.env.EXPORT_RATE_LIMIT_WINDOW_SECONDS ??= "60";
process.env.RATE_LIMIT_FAILURE_POLICY ??= "open";

import assert from "node:assert/strict";
import { after, beforeEach, describe, it } from "node:test";
import request from "supertest";

const { app } = await import("../src/app.js");
const { prisma } = await import("../src/db/prisma.js");
const { resetTestDatabase } = await import("./helpers/database.js");
const { resetTestRedis, closeTestRedis } = await import("./helpers/redis.js");
const { hashPassword } = await import("../src/shared/auth/password-hashing.js");

async function createAuthenticatedAgent(email: string) {
  await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword("shared-passphrase-2026")
    }
  });

  const agent = request.agent(app);
  await agent.post("/auth/login").send({ email, password: "shared-passphrase-2026" }).expect(200);
  const csrf = await agent.get("/auth/csrf").expect(200);
  return { agent, csrfToken: csrf.body.data.csrfToken };
}

describe("redis fixed-window export limiter", () => {
  beforeEach(async () => {
    await resetTestDatabase();
    await resetTestRedis();
  });

  after(async () => {
    await closeTestRedis();
    await prisma.$disconnect();
  });

  it("returns 429 after the user exceeds the export window", async () => {
    const alice = await createAuthenticatedAgent("alice@example.com");

    await alice.agent.post("/exports/notes").set("x-csrf-token", alice.csrfToken).send({ format: "JSON" }).expect(202);
    await alice.agent.post("/exports/notes").set("x-csrf-token", alice.csrfToken).send({ format: "JSON" }).expect(202);
    const limited = await alice.agent.post("/exports/notes").set("x-csrf-token", alice.csrfToken).send({ format: "JSON" }).expect(429);

    assert.equal(limited.body.error.code, "EXPORT_RATE_LIMITED");
  });
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">mini-projects/redis-job-notes-api/tsconfig.json</span>
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

### 14.4 端到端执行链

用户登录后，session middleware 把 `AuthContext` 放入 `response.locals`。读取 notebook list 时，service 先构造 `cache:user:{userId}:notebooks:v1` 并读 Redis；miss 时查询 Prisma，然后写回 `SET EX`。创建或更新资源时，service 先写 PostgreSQL，再删除对应缓存键。发起导出时，CSRF middleware 先验证 session-bound token，Redis limiter 用 `rate:user:{userId}:exports:{windowStart}` 递增计数，service 创建 `ExportJob` row，然后用 BullMQ 入队。Worker 读取 payload，Zod 校验，查询 notes，写回 status row；如果失败，BullMQ retry 只安全地重复幂等 handler。

## 15. 知识迁移与真实项目场景

同样的模型可以迁移到 dashboard summary cache、profile cache、report generation、batch import、image processing 或 audit export。迁移时先问三个问题：哪些数据是事实，哪些数据是派生缓存，哪些工作不能占用 HTTP 生命周期。

## 16. 本章复盘任务

1. 画出 `GET /notebooks` 的 hit 与 miss 两条链路。
2. 说明为什么写入 notebook 后不能只更新缓存而不写 PostgreSQL。
3. 解释 Redis fixed-window limiter 在多进程 API 实例下为什么比内存变量可靠。
4. 解释 `POST /exports/notes` 为什么返回 `202 Accepted` 而不是直接返回导出内容。
5. 找出 Worker handler 中保证 retry safe 的状态行判断。
6. 说明 shutdown 时必须关闭哪些资源，以及遗漏每一项会出现什么现象。

## 17. 最终心智模型

Redis 是快速、外部、可丢弃的协调层；PostgreSQL 是慢一些但可靠的事实层；BullMQ 是把工作从 HTTP 生命周期移到 Worker 生命周期的队列层；TypeScript 是开发期形状检查，不是运行时数据证明。

## 18. 官方资料

- Redis cache-aside: https://redis.io/docs/latest/develop/use-cases/cache-aside/
- Redis cache-aside with node-redis: https://redis.io/docs/latest/develop/use-cases/cache-aside/nodejs/
- Redis expiration overview: https://redis.io/docs/latest/commands/expire/
- Redis `SET`: https://redis.io/docs/latest/commands/set/
- Redis `EXPIRE`: https://redis.io/docs/latest/commands/expire/
- Redis `TTL`: https://redis.io/docs/latest/commands/ttl/
- Redis `INCR`: https://redis.io/docs/latest/commands/incr/
- Redis `DEL`: https://redis.io/docs/latest/commands/del/
- Redis transactions: https://redis.io/docs/latest/develop/interact/transactions/
- Redis pipelining: https://redis.io/docs/latest/develop/using-commands/pipelining/
- Redis rate limiter: https://redis.io/docs/latest/develop/use-cases/rate-limiter/
- Redis rate limiter with Node.js: https://redis.io/docs/latest/develop/use-cases/rate-limiter/nodejs/
- node-redis guide: https://redis.io/docs/latest/develop/clients/nodejs/
- node-redis pipelines and transactions: https://redis.io/docs/latest/develop/clients/nodejs/transpipe/
- BullMQ queues: https://docs.bullmq.io/guide/queues
- BullMQ jobs: https://docs.bullmq.io/guide/jobs
- BullMQ job data: https://docs.bullmq.io/guide/jobs/job-data
- BullMQ job ids: https://docs.bullmq.io/guide/jobs/job-ids
- BullMQ deduplication: https://docs.bullmq.io/guide/jobs/deduplication
- BullMQ workers: https://docs.bullmq.io/guide/workers
- BullMQ events and QueueEvents: https://docs.bullmq.io/guide/events
- BullMQ retrying failing jobs: https://docs.bullmq.io/guide/retrying-failing-jobs
- BullMQ idempotent jobs: https://docs.bullmq.io/patterns/idempotent-jobs
- BullMQ stalled jobs: https://docs.bullmq.io/guide/jobs/stalled
- BullMQ graceful shutdown: https://docs.bullmq.io/guide/workers/graceful-shutdown
- npm scripts: https://docs.npmjs.com/cli/v11/using-npm/scripts/
- Node.js process signal events: https://nodejs.org/api/process.html#signal-events
- Express routing: https://expressjs.com/en/guide/routing.html
- Express error handling: https://expressjs.com/en/guide/error-handling.html
- Prisma configuration: https://www.prisma.io/docs/orm/reference/prisma-config-reference
- Zod basics: https://zod.dev/basics
- TypeScript module reference: https://www.typescriptlang.org/docs/handbook/modules/reference.html
