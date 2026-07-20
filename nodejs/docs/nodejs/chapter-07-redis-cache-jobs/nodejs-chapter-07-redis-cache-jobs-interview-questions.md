# Node.js 第 7 章 Redis、缓存、限流与后台任务面试题

## 1. Redis mental model：external in-memory data structure service

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：`createClient` creates a Redis socket client; `connect` opens the external boundary; `quit` closes it. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 2. Redis versus PostgreSQL：cache / coordination state versus source of truth

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：PostgreSQL owns durable facts; Redis owns derived values and short-lived coordination state. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 3. node-redis connection lifecycle：createClient、connect、error、quit

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：The process must subscribe to `error`, await `connect`, issue commands, and release the socket with `quit`. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 4. Redis key design：namespace、user boundary、version、query hash

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：A safe key embeds owner identity and a versioned query hash rather than raw unbounded input. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 5. Redis strings、JSON serialization、Date boundary

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：Redis stores bytes/strings; DTO dates must cross the boundary as ISO strings and be parsed at runtime. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 6. TTL and expiration：SET EX、EXPIRE、TTL、stale window

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：`SET EX` creates a value and expiration together; `TTL` observes freshness but does not prove business validity. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 7. Cache-aside read path：hit、miss、database fallback、write-back

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：A hit returns Redis data; a miss reads PostgreSQL through the repository and writes a new cache value. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 8. Cache invalidation on write：primary write first, then delete affected keys

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：The source-of-truth write must succeed before the derived cache key is deleted. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 9. Cache stampede：popular key expiration and singleflight mitigation

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：Multiple misses for one hot key should share one in-flight loader instead of hitting PostgreSQL together. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 10. Redis pipeline versus Redis transaction：network batching versus atomic command group

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：Pipeline reduces network round trips; transaction groups commands for Redis-side ordered execution. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 11. Distributed rate limiting：why in-memory limiter is not enough

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：A process-local Map cannot coordinate multiple API instances; Redis gives all instances one shared counter. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 12. Redis fixed-window limiter：INCR、expiration、429 response

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：`INCR` observes the request count; first count sets expiration; over-limit requests return `429`. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 13. Redis failure policy：cache fallback, limiter policy, queue enqueue failure

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：Cache may bypass to database; limiter may fail open or closed; queue enqueue failure must not pretend work was accepted. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 14. Background jobs：why HTTP should not wait for long work

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：HTTP accepts work and returns a status URL; Worker execution happens outside the request lifecycle. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 15. BullMQ queue model：Queue、Job、Worker、QueueEvents

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：Queue adds jobs, Worker processes jobs, QueueEvents observes completion and failure. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 16. Job payload validation：Zod and durable job status row

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：A job payload is runtime data; Zod validates it before the Worker trusts it. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 17. 202 Accepted and job status API：enqueue now, finish later

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：`POST /exports/notes` returns `202`; `GET /exports/:exportId` reads the durable status row. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 18. Retries and backoff：attempts, failed jobs, transient failures

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：Retries only make sense when the handler can safely repeat after a transient failure. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 19. Idempotent worker handlers：safe retry and duplicate delivery

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：The Worker checks the durable status row before repeating a completed side effect. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 20. Custom job IDs, deduplication, and colon separator boundary

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：A stable custom job id helps deduplicate work, but BullMQ job ids must not contain `:`. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 21. Stalled jobs and Node event loop blocking

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：CPU blocking can stop lock renewal and make a job appear stalled. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 22. Worker process lifecycle：worker.close、Redis quit、signal shutdown

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：Graceful shutdown stops accepting new work and closes Redis/queue/process resources in order. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。

## 23. Chapter integration: redis-job-notes-api

**问题**：请解释这个机制在 Node.js 后端中的触发点、Redis key 或 BullMQ job state、Prisma 边界、HTTP 响应和失败模式。

**参考要点**：The final API wires auth, CSRF, cache debug, Redis rate limiting, export queueing, and status reading. 回答必须区分 Redis 临时状态与 PostgreSQL source of truth，并说明 TypeScript 不能验证 Redis 字符串、HTTP body 或 job payload 的运行时内容。
