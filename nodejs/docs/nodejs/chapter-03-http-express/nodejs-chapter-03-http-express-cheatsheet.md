# Node.js 第 3 章速查表：HTTP、Express 与后端 API

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

.macos-code-dot-red { background: #ff5f57; }
.macos-code-dot-yellow { background: #ffbd2e; }
.macos-code-dot-green { background: #28c840; }

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

## HTTP 请求与响应模型

| 请求 | 响应 |
| --- | --- |
| method：动作语义 | status：处理结果 |
| URL：资源定位 + query | headers：响应元数据 |
| headers：请求元数据 | body：可选表示 |
| body：可选输入载荷 | `end()`：消息完成 |

`endpoint = method + route path`。query string 不属于 route path。

## Node 原生 HTTP API

| API / 属性 | 用途 | 关键规则 |
| --- | --- | --- |
| `http.createServer(listener)` | 创建 `http.Server` | listener 注册到 `'request'` event |
| `server.listen()` | 绑定地址和端口 | 活动 server handle 保持进程存活 |
| `request.method` | HTTP method | 可能为 `undefined`，按输入边界处理 |
| `request.url` | request target | 用 `new URL(target, base)` 解析 |
| `request.headers` | 请求 headers | 外部输入，不应盲目信任 Host |
| `IncomingMessage` | readable body stream | body chunk 需消费并限制大小 |
| `response.writeHead()` | status + headers | body 开始后不能再改 headers |
| `response.write()` | 写 body chunk | 返回 `false` 时等待 `drain` |
| `response.end()` | 结束 response | 每个响应都必须完成 |

## Express app、Router 与 middleware

| 概念 | 速记 |
| --- | --- |
| `express()` | application / composition root |
| `Router()` | 可挂载的资源级 route stack |
| `app.use(path?, middleware)` | 按注册顺序挂载 |
| `router.get(path, ...handlers)` | method + path endpoint |
| `req.params` | route parameter strings |
| `req.query` | parsed query object |
| `next()` | 继续普通 pipeline |
| `next(error)` | 跳到 error pipeline |
| `res.status().json()` | 设置 status、发送 JSON、结束响应 |

推荐组装顺序：

`express.json → resource Router → not-found → error middleware`

middleware 必须结束响应或调用 `next()`；两者都不做会让请求挂起。

## `express.json()` 与信任边界

- 按匹配的 Content-Type 解析 body。
- 用 `limit` 限制累计载荷。
- JSON parse 只把 bytes 变成 JS value。
- `req.body` 由客户端控制，解析后仍不可信。
- TypeScript assertion 不产生运行时检查。
- Zod schema output 才是业务代码应使用的数据。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: runtime validation boundary</span>
  </div>

```ts
const input: unknown = request.body;
const result = createNoteSchema.safeParse(input);

if (!result.success) {
  next(new HttpError(422, "VALIDATION_ERROR", "Invalid request."));
  return;
}

const validInput = result.data;
```
</div>

## 状态码决策表

| 状态码 | 使用条件 |
| ---: | --- |
| `200` | 读取或更新成功 |
| `201` | 资源创建成功 |
| `204` | 操作成功且无 response body |
| `400` | HTTP/JSON message 无法解析 |
| `401` | 缺少或无效认证 |
| `403` | 已认证但无权限 |
| `404` | route 或资源不存在 |
| `409` | 当前资源状态冲突 |
| `422` | message 可解析，但字段不符合 schema |
| `500` | 未预期服务端故障 |

对照：坏 JSON 用 `400`，JSON 字段无效用 `422`；需要认证用 `401`，已知身份无权限用 `403`。

## Notes REST CRUD

| Method | Path | 成功状态 | 行为 |
| --- | --- | ---: | --- |
| `GET` | `/notes` | `200` | list |
| `POST` | `/notes` | `201` | create |
| `GET` | `/notes/:id` | `200` | read one |
| `PATCH` | `/notes/:id` | `200` | partial update |
| `DELETE` | `/notes/:id` | `204` | delete |

## 统一响应

成功：`{ ok: true, data: ... }`

错误：`{ ok: false, error: { code, message, details } }`

`204` 不返回 envelope。公开错误不包含 stack、绝对路径、凭据或依赖内部信息。

## Error middleware

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: Express error middleware</span>
  </div>

```ts
const errorMiddleware: ErrorRequestHandler = (
  error,
  _request,
  response,
  next
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  response.status(500).json({
    ok: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "Internal server error.",
      details: null
    }
  });
};
```
</div>

- 必须保留四参数。
- 在普通 middleware 和 routes 后注册。
- headers 已发送时委托默认 handler。
- Express 5 自动把 async handler rejection/throw 传入 error pipeline。

## 常见错误

| 现象 | 原因 |
| --- | --- |
| request pending | 未响应且未 `next()`，或未 `end()` |
| `ERR_HTTP_HEADERS_SENT` | 一次请求二次发送，或 body 后改 header |
| `req.body` 未定义 | parser 顺序或 Content-Type 不匹配 |
| 看似类型安全却 `TypeError` | 用 assertion 代替 runtime validation |
| query 导致原生 route 404 | 直接比较完整 `request.url` |
| custom error handler 未执行 | 缺四参数或注册过早 |
| test process 不退出 | import app 时就调用 `listen()` |

## 官方资料

- [Node.js HTTP](https://nodejs.org/docs/latest-v26.x/api/http.html)
- [Node.js Stream](https://nodejs.org/docs/latest-v26.x/api/stream.html)
- [Node.js URL](https://nodejs.org/docs/latest-v26.x/api/url.html)
- [Express 5 API](https://expressjs.com/en/5x/api.html)
- [Express Routing](https://expressjs.com/en/guide/routing.html)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Zod Basic usage](https://zod.dev/basics)
- [MDN HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
