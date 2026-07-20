# Node.js 第 8 章速查：文件上传与安全下载

## 上传链路

| 步骤 | 机制 | 关键文件 |
| --- | --- | --- |
| boundary 检查 | `multipart/form-data; boundary=...` | `src/uploads/multipart-parser.ts` |
| parser 限制 | `fileSize/files/fields/parts` | `src/uploads/upload-limits.ts` |
| 临时文件 | `pipeline(file, transform, writeStream)` | `src/uploads/multipart-parser.ts` |
| 字节哈希 | `crypto.createHash("sha256")` | `src/uploads/multipart-parser.ts` |
| 类型校验 | extension + `file-type` magic number | `src/uploads/file-validation.ts` |
| 存储键 | server-generated key | `src/storage/storage-key.ts` |
| metadata | Prisma `Attachment` row | `src/modules/attachments/attachments.repository.ts` |

## 安全规则

- 不信任 `filename`，只把它保存为 metadata。
- 不信任 declared `Content-Type`，只把它作为客户端声明记录。
- 不把上传目录放进 public static route。
- 不在 owner 授权之前打开下载 stream。
- 不声称 PostgreSQL transaction 可以覆盖 filesystem object copy。

## 常用命令

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
cd mini-projects/notes-attachments-api
npm install
npm run prisma:generate
npm run typecheck
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```txt
Set-Location mini-projects\notes-attachments-api
npm install
npm run prisma:generate
npm run typecheck
```
</div>

## Header 速查

| Header | 用途 |
| --- | --- |
| `Content-Type` | 下载时返回检测后的 MIME type |
| `Content-Length` | 下载对象大小 |
| `Content-Disposition` | 让浏览器按 attachment 处理并给出 filename |
| `ETag` | 基于 `sha256` 的缓存/一致性标识 |
| `X-Content-Type-Options` | 使用 `nosniff` 降低 MIME sniffing 风险 |

## 官方资料

- [Node.js Stream](https://nodejs.org/api/stream.html)
- [Node.js File system](https://nodejs.org/api/fs.html)
- [Node.js Path](https://nodejs.org/api/path.html)
- [Node.js Crypto](https://nodejs.org/api/crypto.html)
- [Node.js Buffer](https://nodejs.org/api/buffer.html)
- [Node.js process](https://nodejs.org/api/process.html)
- [Node.js Test Runner](https://nodejs.org/api/test.html)
- [Node.js Assert](https://nodejs.org/api/assert.html)
- [MDN FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [MDN Using FormData](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects)
- [MDN Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type)
- [MDN POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST)
- [MDN MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types)
- [MDN Content-Disposition](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Disposition)
- [MDN X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Content-Type-Options)
- [Busboy README](https://github.com/mscdex/busboy)
- [file-type README](https://github.com/sindresorhus/file-type)
- [Express 5 API](https://expressjs.com/en/5x/api/)
