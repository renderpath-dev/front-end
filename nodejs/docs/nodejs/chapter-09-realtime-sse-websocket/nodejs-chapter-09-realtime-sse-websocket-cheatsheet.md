# Node.js 第 9 章速查表：Realtime API、SSE、WebSocket、Pub/Sub

## 传输选择

| 传输 | 方向 | 生命周期 | 适合场景 | 关键边界 |
|---|---|---|---|---|
| Polling | client request / server response | 短连接 | 低频状态检查 | 请求量与延迟 |
| SSE | server-to-client | 长 HTTP response | 通知、事件流、日志 | `text/event-stream`、replay、credentials |
| WebSocket | bidirectional | 长连接 | 订阅、presence、双向命令 | upgrade、message validation、heartbeat、backpressure |

## SSE headers

- `Content-Type: text/event-stream`
- `Cache-Control: no-cache`
- `Connection: keep-alive`
- 初始事件建议发送 `connection.ready`

## SSE event format

```text
id: 123
event: note.updated
data: {"noteId":"00000000-0000-4000-8000-000000000001"}

```

## EventSource reconnection

- EventSource 会自动重连。
- `Last-Event-ID` 是恢复点，不是授权证明。
- replay 必须按 authenticated owner 过滤 PostgreSQL event log。

## WebSocket upgrade

- Express route 不拥有 upgrade socket。
- Node HTTP server 监听 `upgrade`。
- `ws` 用 `WebSocketServer({ noServer: true })` 接收已验证 socket。

## WebSocket validation

- 先限制 payload size。
- 再 JSON parse。
- 再 Zod discriminated union。
- 再 owner authorization。
- 最后执行业务动作或返回 safe error。

## Connection registry

- process-local。
- 保存 connection id、user id、subscribed note ids、socket、alive state。
- close 时必须清理。

## Room subscription

- room name 不是授权证明。
- `subscribe.note` 前必须查 note owner。
- `unsubscribe.note` 只影响当前连接。

## Heartbeat

- SSE 用 heartbeat event 或 comment。
- WebSocket 用 ping/pong。
- stale connection 应 terminate 并从 registry 移除。

## Backpressure

- 发送前检查 `readyState`。
- 发送前检查 `bufferedAmount`。
- 超过阈值时 close 或降级，不做无界 queue。

## Event log

- PostgreSQL `RealtimeEvent` 是 durable source。
- `sequence` 作为 replay cursor。
- `payload` 只保存客户端可见的安全数据。

## Redis Pub/Sub

- 用于 live fan-out。
- at-most-once。
- 订阅者离线时不保留消息。
- 不替代 PostgreSQL replay。

## Graceful shutdown

1. 停止接受新的 upgrade。
2. `httpServer.close()`。
3. 通知并关闭 SSE。
4. 关闭 WebSocket。
5. 退订并关闭 Redis。
6. `prisma.$disconnect()`。

## Common mistakes

- 用 Redis Pub/Sub 当 durable log。
- WebSocket upgrade 后不做 per-message authorization。
- 忘记 Origin check。
- 忘记 heartbeat cleanup。
- 对慢客户端无限 `send`。
- 把 `Last-Event-ID` 当授权证明。

## Official docs links

- [Node.js HTTP](https://nodejs.org/api/http.html)
- [Node.js Stream](https://nodejs.org/api/stream.html)
- [Node.js Events](https://nodejs.org/api/events.html)
- [Node.js Timers](https://nodejs.org/api/timers.html)
- [Node.js Process](https://nodejs.org/api/process.html)
- [Node.js Crypto](https://nodejs.org/api/crypto.html)
- [Node.js Test runner](https://nodejs.org/api/test.html)
- [Node.js Assert](https://nodejs.org/api/assert.html)
- [MDN Server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [MDN Using server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
- [MDN EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
- [MDN EventSource withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/EventSource/withCredentials)
- [MDN WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [MDN HTTP protocol upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Protocol_upgrade_mechanism)
- [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
- [MDN Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type)
- [MDN Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control)
- [ws README](https://github.com/websockets/ws)
- [OWASP WebSocket Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/WebSocket_Security_Cheat_Sheet.html)
- [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [Redis Pub/Sub](https://redis.io/docs/latest/develop/pubsub/)
- [node-redis guide](https://redis.io/docs/latest/develop/clients/nodejs/)
- [Express 5 API](https://expressjs.com/en/5x/api/)
