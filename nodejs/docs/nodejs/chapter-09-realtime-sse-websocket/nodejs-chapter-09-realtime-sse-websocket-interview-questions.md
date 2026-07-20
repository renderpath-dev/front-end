# Node.js 第 9 章面试题：Realtime API、SSE、WebSocket 与 Pub/Sub

## 1. Polling、SSE、WebSocket 的根本区别是什么？

Polling 是重复短请求，SSE 是服务器到客户端的长 HTTP response，WebSocket 是 upgrade 后的双向长连接。选择时先看方向性、连接寿命、浏览器 API 和安全边界。

## 2. SSE 为什么不是普通 JSON response？

SSE 的响应保持打开，媒体类型是 `text/event-stream`，服务器按事件片段写入数据并用空行分隔。普通 JSON response 通常一次性结束。

## 3. EventSource 的 `Last-Event-ID` 解决什么问题？

它给服务器一个重连恢复点。服务器仍要按当前 session 和 owner 过滤 durable event log，不能信任客户端 id 本身。

## 4. SSE 用 Cookie 认证时要注意什么？

EventSource 不能像 fetch 一样任意设置自定义 header。跨站时要显式设计 Cookie SameSite、CORS origin、credentials 和服务端 session 验证。

## 5. WebSocket handshake 和 HTTP upgrade 的关系是什么？

WebSocket 从 HTTP 请求开始，满足 Upgrade 条件后服务器切换协议。Node HTTP server 的 `upgrade` event 是这个边界。

## 6. 为什么 Express route 不直接处理 WebSocket upgrade？

Express 处理 request/response middleware 链；upgrade 是 HTTP server socket 级事件，需要在 Node server 上监听。

## 7. `ws` 的 `noServer` 模式解决什么问题？

`ws` 不创建自己的 HTTP server，而是让应用先在现有 HTTP server 上完成 path、Origin、auth，再调用 `handleUpgrade`。

## 8. Cookie-authenticated WebSocket 为什么要检查 Origin？

浏览器可能从第三方页面发起带 Cookie 的 WebSocket 连接。Origin allowlist 能降低 cross-site WebSocket hijacking 风险。

## 9. TypeScript 为什么不能替代 WebSocket message validation？

TypeScript 类型在编译期工作，远端 message 是运行时输入。必须 JSON parse 并用 Zod 等 runtime schema 验证。

## 10. 连接注册表应该保存什么？

connection id、user id、session id、socket、subscribed note ids、alive state，并在 close/terminate 时清理。

## 11. room subscription 的授权边界在哪里？

加入 room 前，服务器必须查询资源并确认 owner。room name、note id 或客户端消息都不是授权证明。

## 12. WebSocket heartbeat 的机制是什么？

服务器定期 ping，把连接标记为 not alive；客户端 pong 后恢复 alive；下一轮仍未恢复则 terminate。

## 13. backpressure 在 WebSocket 中如何表现？

慢客户端读取不足时，待发送数据堆积，`bufferedAmount` 增大。服务端需要阈值策略，避免无限发送。

## 14. close code 应该怎么用？

协议或 payload 错误使用稳定 close code 和安全 reason，不返回 stack trace、数据库错误或 Redis 细节。

## 15. 为什么需要 durable event log？

客户端断线期间会错过 live fan-out。PostgreSQL event log 提供可查询、可授权的 replay source。

## 16. Redis Pub/Sub 的 at-most-once 边界是什么？

消息只发给当前在线订阅者，订阅者离线或断开时不会自动补发。

## 17. replay 与 live delivery 如何配合？

连接建立时按 `Last-Event-ID` 从 PostgreSQL replay 历史；连接在线后通过 Redis Pub/Sub 和本地 registry live fan-out。

## 18. 优雅关闭 realtime server 的顺序是什么？

停止 upgrade、关闭 HTTP server、通知/关闭 SSE、关闭 WebSocket、退订 Redis、关闭 Redis client、断开 Prisma。

## 19. `realtime-notes-api` 的核心架构是什么？

REST mutation 产生 durable event，PostgreSQL 保存事件，Redis 通知在线实例，SSE/WebSocket registry 把事件发送给当前连接。
