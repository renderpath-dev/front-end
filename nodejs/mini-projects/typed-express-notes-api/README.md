# Typed Express Notes API

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

这是第 3 章的最终迷你项目：一个使用 Express 5、TypeScript 和 Zod 构建的内存型 Notes API。

## 运行要求

- Node.js 22 或更高版本
- npm

## 安装与运行

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">PowerShell</span>
  </div>

```powershell
npm install
npm run typecheck
npm test
npm run dev
```

</div>

服务默认监听 `http://127.0.0.1:3200`。可以通过 `PORT` 环境变量修改端口。

## API

| 方法 | 路径 | 成功状态码 | 说明 |
| --- | --- | ---: | --- |
| `GET` | `/notes` | `200` | 列出全部笔记 |
| `POST` | `/notes` | `201` | 创建笔记 |
| `GET` | `/notes/:id` | `200` | 获取单个笔记 |
| `PATCH` | `/notes/:id` | `200` | 更新笔记 |
| `DELETE` | `/notes/:id` | `204` | 删除笔记 |

创建请求体：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">JSON</span>
  </div>

```json
{
  "title": "Learn Express middleware",
  "content": "Order controls which handler runs next."
}
```

</div>

成功响应使用 `{ "ok": true, "data": ... }`，错误响应使用 `{ "ok": false, "error": { "code", "message", "details" } }`。`DELETE` 成功时遵守 `204 No Content` 语义，不返回响应体。

## 设计边界

- 数据只保存在进程内存中；重启后会丢失。
- Zod 在 HTTP 边界验证 `params` 和 `body`。
- repository 隔离存储操作，但不引入数据库或 ORM。
- `src/app.ts` 负责组装应用，`src/server.ts` 负责监听端口，测试可直接导入 `app`。
