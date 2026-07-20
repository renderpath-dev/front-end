# Node.js 第 7 章 Redis、缓存、限流与后台任务速查

## 核心判断

| 问题 | 正确边界 |
| --- | --- |
| 数据是否可以丢失后重建 | 可以放 Redis cache |
| 数据是否是业务事实 | 放 PostgreSQL |
| 请求是否可能长时间运行 | 返回 `202 Accepted` 并入队 |
| 多进程是否需要共享计数 | 用 Redis，不用进程内变量 |
| Worker 是否会重试 | handler 必须幂等 |

## 常用命令

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
redis-cli GET cache:user:user_123:notebooks:v1
redis-cli TTL cache:user:user_123:notebooks:v1
redis-cli INCR rate:user:user_123:exports:1780000000
```
</div>

## 常用代码边界

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: cache-aside rule</span>
  </div>

```ts
const cached = await redis.get(key);
if (cached) return JSON.parse(cached);
const value = await repository.load();
await redis.set(key, JSON.stringify(value), { EX: 60 });
return value;
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: fixed-window rule</span>
  </div>

```ts
const count = await redis.incr(key);
if (count === 1) await redis.expire(key, 60);
if (count > limit) throw new HttpError(429, "Too many requests.", "RATE_LIMITED");
```
</div>

## 任务边界

HTTP 只负责接受工作、写状态行、入队并返回状态 URL。Worker 负责可重试执行。状态 API 负责把 durable row 暴露给用户。
